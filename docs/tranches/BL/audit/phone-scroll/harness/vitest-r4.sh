#!/usr/bin/env bash
# vitest-r4.sh <tree> <log>: the overlay and sheet unit suites on one tree, vitest with 2
# workers.
# Under the guard: guarded --timeout 30 -- ./vitest-r4.sh <tree> <log>
set -uo pipefail
cd "$(dirname "$0")"
HERE="$(pwd)"
# One heavy run of this seat at a time: the fourth round's runs share logs/r4/.seat.
SEAT="$(pwd)/logs/r4/.seat"
until mkdir "$SEAT" 2>/dev/null; do sleep 5; done
trap 'rmdir "$SEAT"' EXIT
cd "$1"
node node_modules/vitest/vitest.mjs run --maxWorkers=2 \
  tests/components/dialog tests/components/menu tests/components/command \
  tests/components/select tests/components/sheet tests/components/_shared/menu \
  tests/components/expandable-container.contract.test.ts tests/components/select.contract.test.ts \
  tests/components/popover.contract.test.ts tests/components/command.contract.test.ts \
  tests/components/custom/dock/GlassDock.seat-floats-portal.test.ts \
  tests/components/custom/dock/GlassDock.collapse-closes-overlays.test.ts \
  tests/components/custom/dock/GlassDock.posture.test.ts \
  tests/components/custom/dock/g-dock-seat-rule.test.ts \
  tests/components/custom/dock/dock-trigger-subpath.test.ts \
  tests/composables/useKeyboardShortcuts.test.ts > "$HERE/$2" 2>&1
echo "vitest rc=$?" >> "$HERE/$2"
