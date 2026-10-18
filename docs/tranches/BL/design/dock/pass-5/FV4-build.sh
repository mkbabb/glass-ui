#!/bin/bash
# FV4-build.sh: the floor v4 battery builds (D2 pass 5, FLOOR-V4), after H5-build.sh.
#   fv4 = HEAD + pass-5/floor-v4.patch (the worktree as the seat left it)
#   fv3 = HEAD + pass-4/floor-v3.patch (L1's reference build, harness/battery.sh reads <out>/builds/fv3)
# The worktree holds fv4 on entry. fv3 is built by reversing floor-v4.patch, applying floor-v3.patch, building,
# and restoring; the worktree must read `git diff HEAD` == floor-v4.patch's tracked half again at the end.
# Each build is its own guarded run (no browser). Logs: FV4-records/build-*.log, apply.log.
#   bash FV4-build.sh <worktree> <out>
set -u
WT=$1; OUT=$2
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; P4=$D/pass-4; P5=$D/pass-5; REC=$P5/FV4-records
mkdir -p "$REC" "$OUT"
G="$HOME/.claude/guard/guarded --timeout 90 --"
shasum -a 256 "$P5/floor-v4.patch" "$P4/floor-v3.patch" >> "$REC/apply.log"
(uptime; $G node "$H/build.mjs" "$WT" --out "$OUT" --label fv4; echo "build exit $?"; uptime) > "$REC/build-fv4.log" 2>&1
(cd "$WT" && git diff HEAD) > "$OUT/fv4-tracked.diff"
(cd "$WT" && git apply -R "$P5/floor-v4.patch" && echo "reversed floor-v4.patch" && git apply "$P4/floor-v3.patch" && echo "applied floor-v3.patch") >> "$REC/apply.log" 2>&1 || { echo "APPLY-FAILED" >> "$REC/apply.log"; exit 1; }
(uptime; $G node "$H/build.mjs" "$WT" --out "$OUT" --label fv3; echo "build exit $?"; uptime) > "$REC/build-fv3.log" 2>&1
(cd "$WT" && git apply -R "$P4/floor-v3.patch" && echo "reversed floor-v3.patch" && git apply "$P5/floor-v4.patch" && echo "applied floor-v4.patch") >> "$REC/apply.log" 2>&1 || { echo "RESTORE-FAILED" >> "$REC/apply.log"; exit 1; }
(cd "$WT" && git diff HEAD) | cmp -s - "$OUT/fv4-tracked.diff" && echo "worktree restored to fv4 (git diff HEAD identical)" >> "$REC/apply.log" || echo "WORKTREE-DIFFERS" >> "$REC/apply.log"
echo "BUILDS-DONE $(date)" >> "$REC/apply.log"
