#!/bin/zsh
# P-E15 part B, resume r3 (after the 2026-11-09 23:44:45 refusal and the reboot): the seat's worktree and its .pe15out were removed at the
# first seat's close, so the builds the held stages need are made again from the same patches, one guarded call, and each src tree is read
# back against builds.log. No patch byte changes. Of record: cand15 and cand11 (builds15.sh, BTAG=-r3). For the cost attribution only:
# cand15attr and cand12attr, the same sources through probes/build-attr.mjs (harness/build.mjs with minify false, so a forced layout's
# stack names its function).
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; R=$P/pass-15/PE15-records
WT=$G/.claude/worktrees/bl/D5/p15/PE15/wt; O=$WT/.pe15out
cd $WT || exit 1
th() { { git diff --binary HEAD -- src; git ls-files -o --exclude-standard src | LC_ALL=C sort | xargs cat 2>/dev/null; } | shasum | cut -c1-12; }
BTAG=-r3 zsh $R/builds15.sh cand15 cand11 || exit $?
echo "# attribution builds · $(date '+%T') · load $(sysctl -n vm.loadavg) · cand15 src tree $(th) (expect c09e913578fb)"
node $R/probes/build-attr.mjs $WT --label cand15attr --out $O > $R/logs/build-cand15attr-r3.log 2>&1; echo "cand15attr build exit $? · src tree $(th) · $(tail -1 $R/logs/build-cand15attr-r3.log | cut -c1-110)"
git apply -R $P/pass-15/P-E15.patch && git apply $P/pass-12/P-E12.patch && echo "cand12 src tree $(th) (expect 61f7b80ac552)"
node $R/probes/build-attr.mjs $WT --label cand12attr --out $O > $R/logs/build-cand12attr-r3.log 2>&1; echo "cand12attr build exit $? · src tree $(th) · $(tail -1 $R/logs/build-cand12attr-r3.log | cut -c1-110)"
git apply -R $P/pass-12/P-E12.patch && git apply $P/pass-15/P-E15.patch && echo "worktree back at cand15: src tree $(th)"
echo "# $(date '+%F %T') r3 builds end · load $(sysctl -n vm.loadavg)"
