#!/usr/bin/env bash
# The 11.1.1 close: the pixel floor's green leg (gate:pixel-floor) on a git-archive tree of a ref,
# through scripts/ab.sh, then pi-gate-verify --expect=green on its report.
#   pf-ab.sh <label> <ref> <port>
set -u
C=$(cd "$(dirname "$0")" && pwd); WT=$(cd "$C/../../.." && pwd); G=~/.claude/guard/guarded
LABEL=$1; REF=$2; PORT=$3
$G --timeout 20 -- zsh "$C/scripts/ab.sh" "$LABEL" "$REF" "$PORT" tests-visual/playwright.config.ts chromium-headless-new substrate-paints-color.spec.ts > "$C/suite/ab/$LABEL.guard.log" 2>&1
echo "$(date '+%F %T') $LABEL guard-rc=$? $(grep -m1 REFUSED "$C/suite/ab/$LABEL.guard.log")" >> "$C/suite/ab/runs.txt"
(cd "$WT/tests-visual" && node pi-gate-verify.mjs --expect=green --report="$C/suite/ab/$LABEL.json") > "$C/suite/ab/$LABEL.verify.txt" 2>&1
echo "$(date '+%F %T') $LABEL verify rc=$? $(grep -m1 'pixel-floor gate' "$C/suite/ab/$LABEL.verify.txt")" >> "$C/suite/ab/runs.txt"
