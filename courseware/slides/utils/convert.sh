#!/usr/bin/env bash
#
# convert.sh: host wrapper for macOS / Linux.
#
# Builds the slide-toolchain container image (if needed) and runs it against
# the slides directory, converting md/*.md into pptx/ and pdf/ (plus a merged
# all-modules PDF).
#
# Usage:
#   ./convert.sh                 # build image + convert everything
#   ./convert.sh --no-build      # skip the image build, just convert
#   CONTAINER_ENGINE=docker ./convert.sh   # use docker instead of podman
#
# Requires podman (default) or docker on PATH.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SLIDES_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
# Mounted one level ABOVE slides/ so the decks can reference ../../diagrams/png/*.png.
# entrypoint.sh works entirely from $SLIDES_DIR, so it needs no change for this.
COURSEWARE_DIR="$(cd "$SLIDES_DIR/.." && pwd)"
IMAGE="webdev-slides:latest"
ENGINE="${CONTAINER_ENGINE:-podman}"

if ! command -v "$ENGINE" >/dev/null 2>&1; then
    echo "ERROR: '$ENGINE' not found on PATH. Install podman (or set CONTAINER_ENGINE=docker)." >&2
    exit 1
fi

if [ "${1:-}" != "--no-build" ]; then
    echo "==> Building image '$IMAGE' with $ENGINE"
    "$ENGINE" build -t "$IMAGE" "$SCRIPT_DIR"
fi

echo "==> Converting slides in: $SLIDES_DIR"
# NOTE: on an SELinux-enforcing Linux host, append ':Z' to the volume, i.e.
#   -v "$COURSEWARE_DIR":/work:Z
# On macOS/Windows podman machines (and Docker Desktop) the plain form is correct.
"$ENGINE" run --rm \
    -v "$COURSEWARE_DIR":/work \
    -e SLIDES_DIR=/work/slides \
    "$IMAGE"

echo "==> Finished. Outputs are in:"
echo "      $SLIDES_DIR/pptx"
echo "      $SLIDES_DIR/pdf"
