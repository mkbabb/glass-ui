#!/bin/zsh
# H11 (D5 pass 11) builds, each in its own guarded call, in the H11 worktree only (harness build.mjs, the harness's own app):
#   head       the base (HEAD; src = v10.1.0)
#   cand10     HEAD + pass-10/P-E10.patch (cb12ef64: the candidate of pass 10, the plant of record for every new cell)
#   zoomcure   cand10 + C-A10's zoomcure (pass-10/C-A10/scripts/ca10-plants.py): the lens's correction, span and side test in
#              its own zoomed CSS px. The control for the zoom cells (E-10, E-13)
#   loudcure   cand10 + C-A10's loudcure: an easing CSS.supports refuses is loud by name, no throw. The control for E-11 travel
# The tree is cut back to HEAD after the last build and its diff checked empty.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; H=$P/harness; R=$P/pass-11/H11
WT=$G/.claude/worktrees/bl/D5/p11/H11/wt; OUT=$WT/.h11out; GD=$HOME/.claude/guard/guarded
ST=src/composables/motion/engage/stage.ts
cd $WT || exit 1
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
b() { $GD --timeout 30 -- node $H/build.mjs $WT --label $1 --out $OUT > $R/logs/build-$1.log 2>&1; echo "$1 build exit $? · src tree $(th) · $(date '+%T') load $(sysctl -n vm.loadavg) · $(tail -1 $R/logs/build-$1.log | cut -c1-120)"; }
echo "# $(date '+%F %T') builds start · load $(sysctl -n vm.loadavg) · HEAD $(git rev-parse --short HEAD) · App.vue $(shasum $H/scenes/App.vue | cut -c1-12) · P-E10 $(shasum $P/pass-10/P-E10.patch | cut -c1-12)"
[[ -z "$ONLY" || "$ONLY" == *head* ]] && b head
git apply $P/pass-10/P-E10.patch || exit 2
C10=$(th); echo "candidate src tree $C10 (P-E10 recorded 7a569d9f8d25)"
[[ -z "$ONLY" || "$ONLY" == *cand10* ]] && b cand10
cp $ST $OUT/stage.cand10.ts
for pl in zoomcure loudcure; do
  [[ -n "$ONLY" && "$ONLY" != *$pl* ]] && continue
  python3 $P/pass-10/C-A10/scripts/ca10-plants.py $WT $pl && b $pl; cp $OUT/stage.cand10.ts $ST
done
echo "after plants: src tree $(th) (expect $C10)"
git apply -R $P/pass-10/P-E10.patch || exit 4
echo "at HEAD: diff lines $(git diff HEAD | wc -l | tr -d ' ') untracked src $(git ls-files -o --exclude-standard src | wc -l | tr -d ' ')"
echo "# $(date '+%F %T') builds end · load $(sysctl -n vm.loadavg)"
