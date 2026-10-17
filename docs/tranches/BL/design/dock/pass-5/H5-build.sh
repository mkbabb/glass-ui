#!/bin/bash
# H5-build.sh: the four pass-5 baseline trees from one worktree (D2 pass 5, H5), each built (harness/build.mjs) and
# read by F7 (harness/f7.mjs: typecheck, lib build, demo dist build, the whole unit suite) and PR (prose.mjs).
#   head · fv3 (HEAD + pass-4/floor-v3.patch) · bp (fv3 + pass-4/D2-Bp-proto.patch) · g (fv3 + pass-4/D2-G-proto.patch)
# Patches apply with `git apply` to the worktree's files only and reverse after use; the worktree is verified clean
# against its HEAD at the end. Every build and suite run is its own guarded run, one at a time.
#   bash H5-build.sh <worktree> <out> [head|fv3|bp|g]...
set -u
WT=$1; OUT=$2; shift 2
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; P4=$D/pass-4; REC=$D/pass-5/H5-records
mkdir -p "$REC" "$OUT"
G="$HOME/.claude/guard/guarded --timeout 90 --"
ap() { (cd "$WT" && git apply "$1") >> "$REC/apply.log" 2>&1 && echo "applied $(basename "$1")" >> "$REC/apply.log"; }
rv() { (cd "$WT" && git apply -R "$1") >> "$REC/apply.log" 2>&1 && echo "reversed $(basename "$1")" >> "$REC/apply.log"; }
tree() { # label: build, F7, PR on the worktree as it stands
  (uptime; $G node "$H/build.mjs" "$WT" --out "$OUT" --label "$1"; echo "build exit $?"; uptime) > "$REC/build-$1.log" 2>&1
  (uptime; $G node "$H/f7.mjs" "$WT" --out "$OUT/f7-$1"; echo "exit $?"; uptime) > "$REC/F7-$1.log" 2>&1
  mkdir -p "$REC/F7-$1"; cp "$OUT/f7-$1/runs/F7-wt/"* "$REC/F7-$1/" 2>/dev/null
  (uptime; node "$H/prose.mjs" "$WT" --out "$OUT/pr-$1"; echo "exit $?"; uptime) > "$REC/PR-$1.log" 2>&1
  mkdir -p "$REC/PR-$1"; cp "$OUT/pr-$1/runs/"*/PR.json "$REC/PR-$1/" 2>/dev/null
}
shasum -a 256 "$P4/floor-v3.patch" "$P4/D2-Bp-proto.patch" "$P4/D2-G-proto.patch" >> "$REC/apply.log"
for b in "${@:-head fv3 bp g}"; do for x in $b; do case $x in
  head) tree head ;;
  fv3) ap "$P4/floor-v3.patch" && tree fv3; rv "$P4/floor-v3.patch" ;;
  bp) ap "$P4/floor-v3.patch" && ap "$P4/D2-Bp-proto.patch" && tree bp; rv "$P4/D2-Bp-proto.patch"; rv "$P4/floor-v3.patch" ;;
  g) ap "$P4/floor-v3.patch" && ap "$P4/D2-G-proto.patch" && tree g; rv "$P4/D2-G-proto.patch"; rv "$P4/floor-v3.patch" ;;
esac; done; done
echo "worktree status after the chain (empty = clean):" >> "$REC/apply.log"
git -C "$WT" status --porcelain --untracked-files=no >> "$REC/apply.log"
echo "BUILDS-DONE $*" >> "$REC/apply.log"
