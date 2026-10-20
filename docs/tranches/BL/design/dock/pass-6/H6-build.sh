#!/bin/bash
# H6-build.sh: the pass-6 H6 baseline builds (D2 pass 6, H6), after pass-5/FV4-build.sh.
#   fv4 = HEAD + pass-5/floor-v4.patch                       (the floor B′ is rebased on)
#   bp  = fv4 + pass-5/D2-Bp-proto.patch                     (the one live route)
#   fv3 = HEAD + pass-4/floor-v3.patch                       (L1's reference build: battery.sh reads <out>/builds/fv3)
# One worktree at HEAD; patches apply to its files and reverse after use; the worktree must read clean at the end.
# Each build is its own guarded run (no browser). PR runs on fv4 and bp after the H6-9 edit (source only).
#   bash H6-build.sh <worktree> <out>
set -u
WT=$1; OUT=$2
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; P4=$D/pass-4; P5=$D/pass-5; REC=$D/pass-6/H6-records
mkdir -p "$REC" "$OUT"
G="$HOME/.claude/guard/guarded --timeout 90 --"
FV4=$P5/floor-v4.patch; BP=$P5/D2-Bp-proto.patch; FV3=$P4/floor-v3.patch
shasum -a 256 "$FV4" "$BP" "$FV3" >> "$REC/apply.log"
git -C "$WT" rev-parse HEAD >> "$REC/apply.log"
ap() { (cd "$WT" && git apply "$1") >> "$REC/apply.log" 2>&1 && echo "applied $(basename "$1")" >> "$REC/apply.log"; }
rv() { (cd "$WT" && git apply -R "$1") >> "$REC/apply.log" 2>&1 && echo "reversed $(basename "$1")" >> "$REC/apply.log"; }
build() { (uptime; $G node "$H/build.mjs" "$WT" --out "$OUT" --label "$1"; echo "build exit $?"; uptime) > "$REC/build-$1.log" 2>&1; }
pr() { (uptime; node "$H/prose.mjs" "$WT" --out "$OUT/pr-$1"; echo "exit $?"; uptime) > "$REC/PR-$1.log" 2>&1; mkdir -p "$REC/PR-$1"; cp "$OUT/pr-$1/runs/"*/PR.json "$REC/PR-$1/" 2>/dev/null; }
case ${1+x}${STEP:-builds} in
*prose) ap "$FV4" && pr fv4 && ap "$BP" && pr bp; rv "$BP"; rv "$FV4" ;;
*) ap "$FV3" && build fv3; rv "$FV3"
   ap "$FV4" && build fv4 && ap "$BP" && build bp; rv "$BP"; rv "$FV4" ;;
esac
echo "worktree status after the chain (empty = clean):" >> "$REC/apply.log"
git -C "$WT" status --porcelain --untracked-files=no >> "$REC/apply.log"
echo "DONE ${STEP:-builds} $(date)" >> "$REC/apply.log"
