#!/usr/bin/env bash
# Install everything a student needs for "JavaScript & TypeScript Essentials".
# macOS and Linux. Windows students should use setup.ps1 instead.
#
# Installs, if missing:
#   - Git
#   - Visual Studio Code (+ the course extensions)
#   - Google Chrome
#   - nvm, then the Active LTS Node.js through it
#
# Node is installed via nvm rather than a system package so students can switch
# versions later without an uninstall, and so a machine that already has a
# different Node is not disturbed.
#
# Idempotent: anything already present is reported and skipped, so it is safe to
# re-run on a half-configured machine.
#
# Usage:
#   ./setup.sh              install what is missing
#   ./setup.sh --check      report what is installed, change nothing
#   ./setup.sh --no-ext     install VS Code but not the course extensions
set -uo pipefail

NODE_VERSION="${NODE_VERSION:---lts}"
NVM_VERSION="v0.40.1"

# Deliberately NOT installing 'ms-vscode.vscode-typescript-next': that extension
# swaps VS Code's TypeScript for the NIGHTLY build. Its own marketplace page says
# it is "intended for advanced users" and that you do not need it. On a student
# machine it only creates a way for the editor's squiggles to disagree with the
# stable `tsc` the course actually runs. VS Code already ships a current TS.
EXTENSIONS=(
  dbaeumer.vscode-eslint
  esbenp.prettier-vscode
  ritwickdey.liveserver
)

CHECK_ONLY=0
SKIP_EXT=0
case "${1:-}" in
  --check)  CHECK_ONLY=1 ;;
  --no-ext) SKIP_EXT=1 ;;
  "")       ;;
  *) echo "Unknown option: $1" >&2; sed -n '2,25p' "${BASH_SOURCE[0]}" >&2; exit 2 ;;
esac

has() { command -v "$1" >/dev/null 2>&1; }

status() { # status <label> <0|1 ok> [detail]
  if [ "$2" -eq 1 ]; then printf '[ok]      %s' "$1"; else printf '[missing] %s' "$1"; fi
  [ -n "${3:-}" ] && printf '  (%s)' "$3"
  printf '\n'
}

# --- Platform ----------------------------------------------------------------
OS="$(uname -s)"
case "$OS" in
  Darwin) PLATFORM="macos" ;;
  Linux)  PLATFORM="linux" ;;
  *) echo "Unsupported platform: $OS. On Windows use setup.ps1." >&2; exit 1 ;;
esac

# nvm is a shell function, not a binary, so `command -v nvm` never finds it.
# Source it if it is installed, then test for the function.
NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
load_nvm() {
  # shellcheck disable=SC1091
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
}
load_nvm
has_nvm() { declare -f nvm >/dev/null 2>&1; }

echo
echo "JavaScript & TypeScript Essentials - machine setup ($PLATFORM)"
echo "============================================================"
echo

nvm_ok=0; has_nvm && nvm_ok=1
git_ok=0; has git && git_ok=1
code_ok=0; has code && code_ok=1
node_ok=0; has node && node_ok=1
chrome_ok=0
if [ "$PLATFORM" = "macos" ]; then
  [ -d "/Applications/Google Chrome.app" ] && chrome_ok=1
else
  { has google-chrome || has google-chrome-stable || has chromium; } && chrome_ok=1
fi

status "Git"                $git_ok    "$(git --version 2>/dev/null || true)"
status "Visual Studio Code" $code_ok   "$(code --version 2>/dev/null | head -1 || true)"
status "Google Chrome"      $chrome_ok
status "nvm"                $nvm_ok    "$(has_nvm && nvm --version 2>/dev/null || true)"
status "Node.js"            $node_ok   "$(node --version 2>/dev/null || true)"
echo

if [ "$CHECK_ONLY" -eq 1 ]; then
  echo "Check only - nothing was changed."
  exit 0
fi

# --- Package manager ---------------------------------------------------------
PM=""
if [ "$PLATFORM" = "macos" ]; then
  if has brew; then PM="brew"; else
    echo "Homebrew is required on macOS but was not found."
    echo "Install it from https://brew.sh, then re-run this script."
    exit 1
  fi
else
  if has apt-get; then PM="apt"
  elif has dnf; then PM="dnf"
  else
    echo "No supported Linux package manager found (apt-get or dnf)."
    echo "Install Git, VS Code and Chrome manually, then re-run - nvm and Node will still be handled."
  fi
fi

install_pkg() { # install_pkg <label> <already 0|1> <brew-cask?> <brew-name> <apt-name> <dnf-name>
  local label="$1" already="$2" cask="$3" brewname="$4" aptname="$5" dnfname="$6"
  if [ "$already" -eq 1 ]; then echo "skip     $label - already installed"; return; fi
  echo "install  $label ..."
  case "$PM" in
    brew) if [ "$cask" = "cask" ]; then brew install --cask "$brewname"; else brew install "$brewname"; fi ;;
    apt)  sudo apt-get update -qq && sudo apt-get install -y "$aptname" ;;
    dnf)  sudo dnf install -y "$dnfname" ;;
    *)    echo "         (no package manager - install $label manually)" ;;
  esac
}

install_pkg "Git" "$git_ok" "" "git" "git" "git"

# VS Code and Chrome are not in the default apt/dnf repos; on Linux point the
# student at the vendor package rather than silently adding third-party repos.
if [ "$code_ok" -eq 0 ]; then
  if [ "$PM" = "brew" ]; then
    install_pkg "Visual Studio Code" 0 cask "visual-studio-code" "" ""
  else
    echo "manual   Visual Studio Code - install from https://code.visualstudio.com/download"
  fi
fi

if [ "$chrome_ok" -eq 0 ]; then
  if [ "$PM" = "brew" ]; then
    install_pkg "Google Chrome" 0 cask "google-chrome" "" ""
  else
    echo "manual   Google Chrome - install from https://www.google.com/chrome"
  fi
fi

# --- nvm + Node --------------------------------------------------------------
if ! has_nvm; then
  echo "install  nvm ($NVM_VERSION) ..."
  curl -o- "https://raw.githubusercontent.com/nvm-sh/nvm/${NVM_VERSION}/install.sh" | bash
  load_nvm
fi

if has_nvm; then
  echo
  echo "install  Node.js ($NODE_VERSION) via nvm ..."
  # shellcheck disable=SC2086
  nvm install $NODE_VERSION
  # shellcheck disable=SC2086
  nvm alias default $NODE_VERSION >/dev/null 2>&1 || true
  # shellcheck disable=SC2086
  nvm use $NODE_VERSION
else
  echo
  echo "WARNING: nvm is installed but not loaded in this shell."
  echo "Open a NEW terminal and run:"
  echo "    nvm install --lts && nvm use --lts"
fi

# --- VS Code extensions ------------------------------------------------------
if [ "$SKIP_EXT" -eq 0 ]; then
  if has code; then
    echo
    echo "install  VS Code extensions ..."
    for ext in "${EXTENSIONS[@]}"; do
      echo "         $ext"
      code --install-extension "$ext" --force >/dev/null
    done
  else
    echo
    echo "note     VS Code's 'code' command is not on PATH."
    echo "         In VS Code: Cmd/Ctrl+Shift+P -> 'Shell Command: Install code command in PATH'"
    echo "         then re-run this script to add the extensions."
  fi
fi

# --- Done --------------------------------------------------------------------
cat <<'DONE'

Done.

IMPORTANT: open a NEW terminal so nvm and PATH changes take effect, then verify:
    git --version
    node --version     # should be the Active LTS (v24.x, or v26.x from late Oct 2026)
    npm --version
    code --version

Then run ./setup.sh --check to confirm everything is in place.
DONE
