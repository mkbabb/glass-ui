#!/bin/bash
# H4-prose.sh: PR (harness/prose.mjs, H4-8) over the four source trees of the pass-4 baseline, in the
# throwaway worktree: head · fv2 (HEAD + pass-3/floor-v2.patch) · bp (fv2 + D2-Bp-proto.patch) ·
# g (fv2 + D2-G-proto.patch). Patches apply to the worktree's files only and reverse after; the worktree
# is verified clean at the end.   bash H4-prose.sh <worktree> <out>
set -u
WT=$1; OUT=$2
D=$(cd "$(dirname "$0")/.." && pwd); H=$D/harness; P3=$D/pass-3; REC=$D/pass-4/H4-records
mkdir -p "$REC"
pr() { (echo "== $1 · $(uptime)"; node "$H/prose.mjs" "$WT" --out "$OUT/prose-$1"; echo "exit $?") >> "$REC/base-PR.log" 2>&1; }
ap() { (cd "$WT" && git apply "$1") >> "$REC/base-PR.log" 2>&1; }
rv() { (cd "$WT" && git apply -R "$1") >> "$REC/base-PR.log" 2>&1; }
: > "$REC/base-PR.log"
pr head
ap "$P3/floor-v2.patch" && pr fv2
ap "$P3/D2-Bp-proto.patch" && pr bp
rv "$P3/D2-Bp-proto.patch"
ap "$P3/D2-G-proto.patch" && pr g
rv "$P3/D2-G-proto.patch"
rv "$P3/floor-v2.patch"
echo "worktree status after the chain (empty = clean):" >> "$REC/base-PR.log"
git -C "$WT" status --porcelain --untracked-files=no >> "$REC/base-PR.log"
