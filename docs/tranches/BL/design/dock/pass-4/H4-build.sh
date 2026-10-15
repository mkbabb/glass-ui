#!/bin/bash
# H4-build.sh: the four pass-4 baseline builds from one throwaway worktree (D2 pass 4, H4).
#   head · fv2 (HEAD + pass-3/floor-v2.patch) · bp (fv2 + pass-3/D2-Bp-proto.patch) · g (fv2 + pass-3/D2-G-proto.patch)
# Patches apply with `git apply` to the worktree's files only (no index, object or ref is written)
# and reverse after each build; the worktree is verified clean against its HEAD at the end.
#   bash H4-build.sh <worktree> <out>
set -u
WT=$1; OUT=$2
D=$(cd "$(dirname "$0")/.." && pwd)            # docs/tranches/BL/design/dock
H=$D/harness; P3=$D/pass-3; REC=$D/pass-4/H4-records
mkdir -p "$REC"
b() { (uptime; node "$H/build.mjs" "$WT" --out "$OUT" --label "$1"; echo "build exit $?"; uptime) > "$REC/build-$1.log" 2>&1; }
ap() { (cd "$WT" && git apply "$1") >> "$REC/apply.log" 2>&1 && echo "applied $(basename "$1")" >> "$REC/apply.log"; }
rv() { (cd "$WT" && git apply -R "$1") >> "$REC/apply.log" 2>&1 && echo "reversed $(basename "$1")" >> "$REC/apply.log"; }
: > "$REC/apply.log"
shasum -a 256 "$P3/floor-v2.patch" "$P3/D2-Bp-proto.patch" "$P3/D2-G-proto.patch" >> "$REC/apply.log"
b head
ap "$P3/floor-v2.patch" && b fv2
ap "$P3/D2-Bp-proto.patch" && b bp
rv "$P3/D2-Bp-proto.patch"
ap "$P3/D2-G-proto.patch" && b g
rv "$P3/D2-G-proto.patch"
rv "$P3/floor-v2.patch"
echo "worktree status after the chain (empty = clean):" >> "$REC/apply.log"
git -C "$WT" status --porcelain --untracked-files=no >> "$REC/apply.log"
echo BUILDS-DONE >> "$REC/apply.log"
