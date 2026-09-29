#!/usr/bin/env bash
# Build every buildable project in the courseware.
#
# Today that means the TypeScript pairs only. Everything else in the course is
# plain JavaScript or HTML and runs straight from source with no build step.
# That is deliberate, so students never debug a toolchain instead of the language.
#
# Each .ts file is compiled by its OWN tsc invocation. The teaching files are
# standalone scripts with no import/export, so compiling several in one program
# would put them in a shared global scope and collide on duplicate identifiers.
#
# Usage:
#   ./build.sh              build (type-check + emit) every project
#   ./build.sh --check      type-check only, emit nothing (what CI/validations do)
#   ./build.sh --clean      remove every dist/ folder, build nothing
#   ./build.sh --list       list what would be built, then exit
#
# Windows: use build.ps1 instead.
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COURSEWARE="$(cd "$HERE/.." && pwd)"
TSCONFIG="$HERE/tsconfig.build.json"

MODE="build"
case "${1:-}" in
  --check) MODE="check" ;;
  --clean) MODE="clean" ;;
  --list)  MODE="list" ;;
  "")      MODE="build" ;;
  *) echo "Unknown option: $1" >&2; sed -n '2,20p' "${BASH_SOURCE[0]}" >&2; exit 2 ;;
esac

# --- Resolve tsc -------------------------------------------------------------
# Prefer the copy the validation harness already installs, so a build uses the
# exact compiler version the harness type-checks with. Fall back to npx.
resolve_tsc() {
  local local_tsc="$COURSEWARE/validations/node_modules/typescript/bin/tsc"
  if [ -f "$local_tsc" ]; then
    echo "node|$local_tsc"
    return
  fi
  if command -v npx >/dev/null 2>&1; then
    echo "npx|typescript"
    return
  fi
  echo "" # not found
}

# --- Discover the buildable projects ----------------------------------------
# Demos:      demos/NN_slug/index.ts
# Activities: activities/NN_slug/solution/index.ts
#             (begin/ and end/ are scaffolds full of TODOs, never built)
discover() {
  { find "$COURSEWARE/demos" -mindepth 2 -maxdepth 2 -name index.ts 2>/dev/null || true
    find "$COURSEWARE/activities" -mindepth 3 -maxdepth 3 -path '*/solution/index.ts' 2>/dev/null || true
  } | sort
}

mapfile -t PROJECTS < <(discover)

if [ "${#PROJECTS[@]}" -eq 0 ]; then
  echo "No TypeScript projects found under $COURSEWARE: nothing to build."
  exit 0
fi

rel() { printf '%s' "${1#"$COURSEWARE/"}"; }

if [ "$MODE" = "list" ]; then
  echo "Buildable projects (${#PROJECTS[@]}):"
  for p in "${PROJECTS[@]}"; do echo "  $(rel "$p")"; done
  exit 0
fi

if [ "$MODE" = "clean" ]; then
  removed=0
  for p in "${PROJECTS[@]}"; do
    dist="$(dirname "$p")/dist"
    if [ -d "$dist" ]; then rm -rf "$dist"; echo "removed  $(rel "$dist")"; removed=$((removed + 1)); fi
  done
  echo "Cleaned $removed dist folder(s)."
  exit 0
fi

TSC="$(resolve_tsc)"
if [ -z "$TSC" ]; then
  echo "Could not find tsc." >&2
  echo "Install the harness deps once:  cd $COURSEWARE/validations && npm install" >&2
  exit 1
fi
RUNNER="${TSC%%|*}"; TARGET="${TSC##*|}"

run_tsc() {
  if [ "$RUNNER" = "node" ]; then node "$TARGET" "$@"; else npx --yes "$TARGET" "$@"; fi
}

echo "Mode: $MODE   Projects: ${#PROJECTS[@]}"
echo

failed=0
for p in "${PROJECTS[@]}"; do
  name="$(rel "$p")"
  if [ "$MODE" = "check" ]; then
    if run_tsc "$p" --noEmit --strict --skipLibCheck \
        --target ES2022 --module ESNext --moduleResolution Bundler \
        --lib ES2022,DOM --moduleDetection force >/tmp/tscout.$$ 2>&1; then
      echo "  ok     $name"
    else
      echo "  FAIL   $name"; sed 's/^/         /' /tmp/tscout.$$; failed=$((failed + 1))
    fi
  else
    dist="$(dirname "$p")/dist"
    if run_tsc "$p" --outDir "$dist" \
        --strict --skipLibCheck --target ES2022 --module ESNext \
        --moduleResolution Bundler --lib ES2022,DOM --moduleDetection force \
        --sourceMap >/tmp/tscout.$$ 2>&1; then
      # We emit ES modules, so mark the output folder as ESM. Without this,
      # `node dist/index.js` warns about a type-less package.json and reparses.
      printf '{ "type": "module" }\n' > "$dist/package.json"
      echo "  built  $name  ->  $(rel "$dist")/index.js"
    else
      echo "  FAIL   $name"; sed 's/^/         /' /tmp/tscout.$$; failed=$((failed + 1))
    fi
  fi
done
rm -f /tmp/tscout.$$

echo
if [ "$failed" -gt 0 ]; then
  echo "$failed project(s) failed."
  exit 1
fi
echo "All ${#PROJECTS[@]} project(s) succeeded."
[ "$MODE" = "build" ] && echo "Note: dist/ folders are git-ignored build output; run './build.sh --clean' to remove them."
exit 0
