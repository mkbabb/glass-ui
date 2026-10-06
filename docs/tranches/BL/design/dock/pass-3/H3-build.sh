#!/bin/bash
# H3-build.sh: the four pass-3 baseline builds from one scratch worktree (D2 pass 3, H3).
#   HEAD · HEAD+floor v1 · HEAD+floor+B′ · HEAD+floor+G
# Patches apply with `git apply` to the worktree's files only (no --index: no index, object
# or ref is written; BSD `patch` cannot delete files, which B′ and G do) and reverse after
# each build; the worktree is verified clean against its HEAD at the end (git status).
#   bash H3-build.sh <worktree> <out>
set -u
WT=$1; OUT=$2
D=$(cd "$(dirname "$0")/.." && pwd)            # docs/tranches/BL/design/dock
H=$D/harness; P2=$D/pass-2; REC=$D/pass-3/H3-records
mkdir -p "$REC"
b() { (uptime; node "$H/build.mjs" "$WT" --out "$OUT" --label "$1"; echo "build exit $?"; uptime) > "$REC/build-$1.log" 2>&1; }
ap() { (cd "$WT" && git apply "$1") >> "$REC/apply.log" 2>&1 && echo "applied $(basename "$1")" >> "$REC/apply.log"; }
rv() { (cd "$WT" && git apply -R "$1") >> "$REC/apply.log" 2>&1 && echo "reversed $(basename "$1")" >> "$REC/apply.log"; }
: > "$REC/apply.log"
b head
ap "$P2/floor.patch" && b floor
ap "$P2/D2-Bp-proto.patch" && b bp
rv "$P2/D2-Bp-proto.patch"
ap "$P2/D2-G-proto.patch" && b g
rv "$P2/D2-G-proto.patch"
rv "$P2/floor.patch"
echo "worktree status after the chain (empty = clean):" >> "$REC/apply.log"
git -C "$WT" status --porcelain --untracked-files=no >> "$REC/apply.log"
echo BUILDS-DONE >> "$REC/apply.log"
