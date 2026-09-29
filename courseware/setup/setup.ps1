<#
.SYNOPSIS
  Install everything a student needs for "JavaScript & TypeScript Essentials" (Windows).

.DESCRIPTION
  Installs, if missing:
    - Git
    - Visual Studio Code (+ the course extensions)
    - Google Chrome
    - nvm-windows, then the Active LTS Node.js through it

  Node is installed **via nvm** rather than the plain MSI so students can switch
  versions later without an uninstall, and so a machine that already has a
  different Node is not disturbed.

  The script is idempotent: anything already present is reported and skipped, so
  it is safe to re-run on a half-configured machine.

.PARAMETER Check
  Report what is installed and what is missing, then exit. Changes nothing.

.PARAMETER SkipExtensions
  Install VS Code but not the course extensions.

.PARAMETER NodeVersion
  Node version to install through nvm. Default 'lts' (the Active LTS line).

.EXAMPLE
  .\setup.ps1 -Check
.EXAMPLE
  .\setup.ps1

.NOTES
  Run in an ELEVATED PowerShell 7+ prompt (winget needs it to install machine-wide).
  After it finishes, OPEN A NEW TERMINAL so PATH changes take effect.
#>
[CmdletBinding()]
param(
  [switch]$Check,
  [switch]$SkipExtensions,
  [string]$NodeVersion = 'lts'
)

$ErrorActionPreference = 'Stop'

# Deliberately NOT installing 'ms-vscode.vscode-typescript-next': that extension
# swaps VS Code's TypeScript for the NIGHTLY build. Its own marketplace page says
# it is "intended for advanced users" and that you do not need it. On a student
# machine it only creates a way for the editor's squiggles to disagree with the
# stable `tsc` the course actually runs. VS Code already ships a current TS.
$Extensions = @(
  'dbaeumer.vscode-eslint',
  'esbenp.prettier-vscode',
  'ritwickdey.liveserver'
)

function Test-Cmd([string]$Name) {
  return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Write-Status($Label, $Ok, $Detail = '') {
  $mark = if ($Ok) { '[ok]     ' } else { '[missing]' }
  $line = "$mark $Label"
  if ($Detail) { $line += "  ($Detail)" }
  Write-Host $line
}

function Get-Version([string]$Cmd, [string]$VersionArg = '--version') {
  try { (& $Cmd $VersionArg 2>$null | Select-Object -First 1) } catch { '' }
}

# --- Inventory ---------------------------------------------------------------
Write-Host ''
Write-Host 'JavaScript & TypeScript Essentials - machine setup (Windows)'
Write-Host '============================================================'
Write-Host ''

$hasWinget = Test-Cmd winget
$hasGit = Test-Cmd git
$hasCode = Test-Cmd code
$hasNvm = Test-Cmd nvm
$hasNode = Test-Cmd node
$chromePaths = @(
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe"
)
$hasChrome = $chromePaths | Where-Object { Test-Path $_ } | Select-Object -First 1

Write-Status 'winget (Windows Package Manager)' $hasWinget
Write-Status 'Git' $hasGit (Get-Version git)
Write-Status 'Visual Studio Code' $hasCode (Get-Version code)
Write-Status 'Google Chrome' ([bool]$hasChrome)
Write-Status 'nvm-windows' $hasNvm (Get-Version nvm 'version')
Write-Status 'Node.js' $hasNode (Get-Version node)
Write-Host ''

if ($Check) {
  Write-Host 'Check only - nothing was changed.'
  exit 0
}

if (-not $hasWinget) {
  Write-Error @'
winget was not found, so this script cannot install anything.

winget ships with Windows 10 1809+ and Windows 11 as "App Installer". Install it
from the Microsoft Store, then re-run this script - or follow the manual steps in
setup-student-machines.md.
'@
  exit 1
}

# Elevation check: winget machine-wide installs need it.
$isAdmin = ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()
).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
  Write-Warning 'Not running as Administrator. Some installs may prompt or fail.'
  Write-Warning 'If anything fails, re-run this script from an elevated PowerShell prompt.'
  Write-Host ''
}

function Install-WithWinget([string]$Label, [string]$Id, [bool]$AlreadyPresent) {
  if ($AlreadyPresent) {
    Write-Host "skip     $Label - already installed"
    return
  }
  Write-Host "install  $Label ..."
  winget install --id $Id --exact --silent --accept-package-agreements --accept-source-agreements
  if ($LASTEXITCODE -ne 0) {
    Write-Warning "winget reported exit code $LASTEXITCODE for $Label. Check the output above."
  }
}

# --- Install -----------------------------------------------------------------
Install-WithWinget 'Git'                 'Git.Git'                 $hasGit
Install-WithWinget 'Visual Studio Code'  'Microsoft.VisualStudioCode' $hasCode
Install-WithWinget 'Google Chrome'       'Google.Chrome'           ([bool]$hasChrome)
Install-WithWinget 'nvm-windows'         'CoreyButler.NVMforWindows' $hasNvm

# nvm was just added to PATH by its installer; this session will not see it yet.
if (-not (Test-Cmd nvm)) {
  $nvmHome = if ($env:NVM_HOME) { $env:NVM_HOME } else { "$env:APPDATA\nvm" }
  if (Test-Path (Join-Path $nvmHome 'nvm.exe')) { $env:Path = "$nvmHome;$env:Path" }
}

if (Test-Cmd nvm) {
  Write-Host ''
  Write-Host "install  Node.js ($NodeVersion) via nvm ..."
  nvm install $NodeVersion
  nvm use $NodeVersion
}
else {
  Write-Warning @'
nvm is installed but not yet on this session's PATH.

OPEN A NEW TERMINAL and run:
    nvm install lts
    nvm use lts
'@
}

# --- VS Code extensions ------------------------------------------------------
if (-not $SkipExtensions) {
  if (Test-Cmd code) {
    Write-Host ''
    Write-Host 'install  VS Code extensions ...'
    foreach ($ext in $Extensions) {
      Write-Host "         $ext"
      code --install-extension $ext --force | Out-Null
    }
  }
  else {
    Write-Warning "VS Code's 'code' command is not on PATH yet - open a new terminal and re-run with -SkipExtensions:`$false"
  }
}

# --- Done --------------------------------------------------------------------
Write-Host ''
Write-Host 'Done.'
Write-Host ''
Write-Host 'IMPORTANT: open a NEW terminal so PATH changes take effect, then verify:'
Write-Host '    git --version'
Write-Host '    node --version     # should be the Active LTS (v24.x, or v26.x from late Oct 2026)'
Write-Host '    npm --version'
Write-Host '    code --version'
Write-Host ''
Write-Host 'Then run .\setup.ps1 -Check to confirm everything is in place.'
