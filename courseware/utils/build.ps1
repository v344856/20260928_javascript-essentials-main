<#
.SYNOPSIS
  Build every buildable project in the courseware. Windows twin of build.sh.

.DESCRIPTION
  Today that means the TypeScript pairs only. Everything else in the course is
  plain JavaScript or HTML and runs straight from source with no build step.
  That is deliberate, so students never debug a toolchain instead of the language.

  Each .ts file is compiled by its OWN tsc invocation. The teaching files are
  standalone scripts with no import/export, so compiling several in one program
  would put them in a shared global scope and collide on duplicate identifiers.

.PARAMETER Check
  Type-check only, emit nothing (what the validation harness does).

.PARAMETER Clean
  Remove every dist/ folder and build nothing.

.PARAMETER List
  List what would be built, then exit.

.EXAMPLE
  .\build.ps1
.EXAMPLE
  .\build.ps1 -Check
#>
[CmdletBinding()]
param(
  [switch]$Check,
  [switch]$Clean,
  [switch]$List
)

$ErrorActionPreference = 'Stop'

$Here = Split-Path -Parent $MyInvocation.MyCommand.Path
$Courseware = Split-Path -Parent $Here

function Get-RelativePath([string]$Path) {
  return $Path.Substring($Courseware.Length + 1) -replace '\\', '/'
}

# --- Discover the buildable projects ----------------------------------------
# Demos:      demos/NN_slug/index.ts
# Activities: activities/NN_slug/solution/index.ts
#             (begin/ and end/ are scaffolds full of TODOs, never built)
$projects = @()
$demosDir = Join-Path $Courseware 'demos'
$actsDir = Join-Path $Courseware 'activities'

if (Test-Path $demosDir) {
  $projects += Get-ChildItem $demosDir -Directory |
    ForEach-Object { Join-Path $_.FullName 'index.ts' } |
    Where-Object { Test-Path $_ }
}
if (Test-Path $actsDir) {
  $projects += Get-ChildItem $actsDir -Directory |
    ForEach-Object { Join-Path $_.FullName 'solution\index.ts' } |
    Where-Object { Test-Path $_ }
}
$projects = $projects | Sort-Object

if ($projects.Count -eq 0) {
  Write-Host "No TypeScript projects found under ${Courseware}: nothing to build."
  exit 0
}

if ($List) {
  Write-Host "Buildable projects ($($projects.Count)):"
  foreach ($p in $projects) { Write-Host "  $(Get-RelativePath $p)" }
  exit 0
}

if ($Clean) {
  $removed = 0
  foreach ($p in $projects) {
    $dist = Join-Path (Split-Path -Parent $p) 'dist'
    if (Test-Path $dist) {
      Remove-Item -Recurse -Force $dist
      Write-Host "removed  $(Get-RelativePath $dist)"
      $removed++
    }
  }
  Write-Host "Cleaned $removed dist folder(s)."
  exit 0
}

# --- Resolve tsc -------------------------------------------------------------
# Prefer the copy the validation harness already installs, so a build uses the
# exact compiler version the harness type-checks with. Fall back to npx.
$localTsc = Join-Path $Courseware 'validations\node_modules\typescript\bin\tsc'
$useLocal = Test-Path $localTsc
if (-not $useLocal -and -not (Get-Command npx -ErrorAction SilentlyContinue)) {
  Write-Error "Could not find tsc. Install the harness deps once: cd $Courseware\validations; npm install"
  exit 1
}

function Invoke-Tsc([string[]]$TscArgs) {
  if ($useLocal) { & node $localTsc @TscArgs 2>&1 }
  else { & npx --yes typescript @TscArgs 2>&1 }
}

$common = @(
  '--strict', '--skipLibCheck',
  '--target', 'ES2022',
  '--module', 'ESNext',
  '--moduleResolution', 'Bundler',
  '--lib', 'ES2022,DOM',
  '--moduleDetection', 'force'
)

$mode = if ($Check) { 'check' } else { 'build' }
Write-Host "Mode: $mode   Projects: $($projects.Count)"
Write-Host ''

$failed = 0
foreach ($p in $projects) {
  $name = Get-RelativePath $p

  if ($Check) {
    $out = Invoke-Tsc (@($p, '--noEmit') + $common)
  }
  else {
    $dist = Join-Path (Split-Path -Parent $p) 'dist'
    $out = Invoke-Tsc (@($p, '--outDir', $dist, '--sourceMap') + $common)
  }

  if ($LASTEXITCODE -eq 0) {
    if ($Check) {
      Write-Host "  ok     $name"
    }
    else {
      # We emit ES modules, so mark the output folder as ESM. Without this,
      # `node dist/index.js` warns about a type-less package.json and reparses.
      Set-Content -LiteralPath (Join-Path $dist 'package.json') -Value '{ "type": "module" }'
      Write-Host "  built  $name  ->  $(Get-RelativePath $dist)/index.js"
    }
  }
  else {
    Write-Host "  FAIL   $name"
    $out | ForEach-Object { Write-Host "         $_" }
    $failed++
  }
}

Write-Host ''
if ($failed -gt 0) {
  Write-Host "$failed project(s) failed."
  exit 1
}
Write-Host "All $($projects.Count) project(s) succeeded."
if (-not $Check) {
  Write-Host "Note: dist/ folders are git-ignored build output; run '.\build.ps1 -Clean' to remove them."
}
exit 0
