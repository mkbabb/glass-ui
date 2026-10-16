#!/usr/bin/env bash
# replays-p11.sh <checkout> <seat dir> <results dir> — pass 11's two replays of the frozen chain, each from a fresh
# HEAD worktree: r1 with --twice (per-step idempotence) and a rerun that must be a no-op, then r2 plain. Until the
# driver commits the floor row, HEAD's docs floor lacks P11-F1, so each worktree takes pass-11/floor-row/P11-F1.patch
# first (the one change; docs/ is outside the code digest, and fd11 lands the floor from the worktree's docs copy).
# Each run's output, wall time and load go to <results dir>/replay-<tag>.txt. The worktrees stay for the toolchain.
set -u
C="$1"; SP="$2"; R="$3"; K="$C/docs/tranches/BL/design/structure/pass-11/B-kit"
load() { sysctl -n vm.loadavg; }
fresh() { git -C "$C" worktree add --detach "$SP/$1" HEAD > /dev/null 2>&1 && ln -s "$C/node_modules" "$SP/$1/node_modules" && git -C "$SP/$1" apply "$C/docs/tranches/BL/design/structure/pass-11/floor-row/P11-F1.patch" && echo "worktree $1 at $(git -C "$SP/$1" rev-parse --short=8 HEAD) + P11-F1.patch"; }
run() { local tag="$1" wt="$2"; shift 2; { echo "replay $tag start $(date -u +%FT%TZ) load $(load) on $wt"; node "$K/replay.mjs" --root "$SP/$wt" "$@"; echo "replay $tag rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$R/replay-$tag.txt" 2>&1; }
fresh wt2 > "$R/replay-worktrees.txt"
run r1 wt2 --twice
run r1-rerun wt2
fresh wt3 >> "$R/replay-worktrees.txt"
run r2 wt3
