#!/usr/bin/env bash
# vitest-r2.sh <tree> <log>: the overlay and sheet unit suites on one tree, vitest with 2
# workers. Shares the lock directory logs/r2/.seat with the browser batches.
# Under the guard: guarded --timeout 30 -- ./vitest-r2.sh <tree> <log>
set -uo pipefail
cd "$(dirname "$0")"
HERE="$(pwd)"
until mkdir logs/r2/.seat 2>/dev/null; do sleep 5; done
trap 'rmdir "$HERE/logs/r2/.seat"' EXIT
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
