#!/bin/bash
# H5-f7-rerun.sh (entry 2): F7 again on the trees whose F7 ran before f7.mjs moved the typecheck after the builds
# (head: TS2307 on the self-import with no dist/; fv3: typecheck read head's dist/). Waits for H5-all.sh.
#   bash H5-f7-rerun.sh <worktree> [head] [fv3]
set -u
WT=$1; shift; P=$(cd "$(dirname "$0")" && pwd); D=$P/..; H=$D/harness; P4=$D/pass-4; REC=$P/H5-records; OUT=$WT/.h5out
until [ -f "$REC/all-done.txt" ]; do sleep 60; done
G="$HOME/.claude/guard/guarded --timeout 90 --"
for b in "$@"; do
  [ $b = fv3 ] && (cd "$WT" && git apply "$P4/floor-v3.patch") && echo "applied floor-v3.patch (f7 rerun)" >> "$REC/apply.log"
  rm -rf "$WT/dist" "$WT/dist-demo"
  (uptime; $G node "$H/f7.mjs" "$WT" --out "$OUT/f7r-$b"; echo "exit $?"; uptime) > "$REC/F7-$b.log" 2>&1
  rm -rf "$REC/F7-$b"; mkdir -p "$REC/F7-$b"; cp "$OUT/f7r-$b/runs/F7-wt/"* "$REC/F7-$b/" 2>/dev/null
  [ $b = fv3 ] && (cd "$WT" && git apply -R "$P4/floor-v3.patch") && echo "reversed floor-v3.patch (f7 rerun)" >> "$REC/apply.log"
done
git -C "$WT" status --porcelain --untracked-files=no >> "$REC/apply.log"
echo "F7-RERUN-DONE $(date)" >> "$REC/f7-rerun-done.txt"
