#!/usr/bin/env bash
# replays-p13.sh <checkout> <seat dir> <results dir> — pass 13's two replays of the frozen chain, each from a fresh
# HEAD worktree: r1 with --twice (per-step idempotence) and a rerun that must be a no-op, then r2 plain; then the floor
# base cut by floor/rows/apply.mjs in a third fresh worktree (the cascade baseline's, the probe's and the batteries'
# floor base); then P12-G1: a fourth fresh worktree (g1) cut row by row by tools/floor-premise.mjs, each row's touched
# paths listed, the cut compared with the floor base and baseProgram() with the floor base's own program.
# Each run's output, wall time and load go to <results dir>/replay-<tag>.txt. The worktrees stay for the toolchain.
set -u
C="$1"; SP="$2"; R="$3"; K="$C/docs/tranches/BL/design/structure/pass-13/B-kit"
load() { sysctl -n vm.loadavg; }
fresh() { git -C "$C" worktree add --detach "$SP/$1" HEAD > /dev/null 2>&1 && ln -s "$C/node_modules" "$SP/$1/node_modules" && echo "worktree $1 at $(git -C "$SP/$1" rev-parse --short=8 HEAD)"; }
run() { local tag="$1" wt="$2"; shift 2; { echo "replay $tag start $(date -u +%FT%TZ) load $(load) on $wt"; node "$K/replay.mjs" --root "$SP/$wt" "$@"; echo "replay $tag rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$R/replay-$tag.txt" 2>&1; }
fresh wt > "$R/replay-worktrees.txt"
run r1 wt --twice
run r1-rerun wt
fresh wt2 >> "$R/replay-worktrees.txt"
run r2 wt2
fresh base >> "$R/replay-worktrees.txt"
{ echo "floor base start $(date -u +%FT%TZ) load $(load)"; node "$C/docs/tranches/BL/design/structure/floor/rows/apply.mjs" --root "$SP/base"; echo "floor rows rc=$?";
  node -e 'import(process.argv[1]).then((m) => { const d = m.codeDigest(process.argv[2]); console.log(`floor base code digest ${d.digest} over ${d.files} files`); })' "$K/lib/digest.mjs" "$SP/base";
  echo "floor base end $(date -u +%FT%TZ) load $(load)"; } > "$R/base-floor.txt" 2>&1
fresh g1 >> "$R/replay-worktrees.txt"
{ echo "floor premise start $(date -u +%FT%TZ) load $(load)"; node "$K/tools/floor-premise.mjs" --root "$SP/g1" --base "$SP/base" --out "$R/floor-premise.json"; echo "floor premise rc=$? end $(date -u +%FT%TZ) load $(load)"; } > "$R/floor-premise.txt" 2>&1
