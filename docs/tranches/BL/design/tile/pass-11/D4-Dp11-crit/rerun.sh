#!/bin/zsh
# D4 pass 11 · CRITIC · re-runs after the chain (a new file; run-crit11.sh is not edited):
#   t6-chromium  T-6 on dp10-src in Chromium, twice. The chain's T-6 read 63/88 whole (pass 10: 64/88); the one flipped
#                cell is a LIBRARY-arm specimen keyboard-commit cell ("the input committed nothing"), read at load 41.54.
#                Migrated 33/33 either way. Re-run twice at the load of the day to see whether it reproduces.
#   sweep-webkit CRIT11-GEOM's pass-10 sweep on a10-src in Playwright WebKit with `--deadline 4800`. The chain's run hit the
#                harness's own 1800 s verdict watchdog (lib.mjs:792, `--deadline`, default 1800): the first scroll and
#                the pseudo reads lengthen the sweep past pass 10's 28 min. No engine hung; the watchdog fired on time.
#   <name>-webkit any other webkit attack read that hit the same watchdog, by name (see the case list).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p11/crit11; O=$W/out; B=$O/builds
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile; HN=$T/harness; C=$T/pass-11/D4-Dp11-crit; L=$C/logs; P11=$C/probes
G=~/.claude/guard/guarded; export TILE_HARNESS_OUT=$O
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
ilog() { local F=$L/$1.log; shift; echo "$(stamp) · harness H9" > $F; "$@" >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F; }
case $1 in
  t6-chromium)
    for i in 1 2; do F=$L/rerun-T-6-chromium-$i.log; echo "$(stamp)" > $F
      $G --rss-gb 8 --timeout 30 -- node $HN/t6-engagement.mjs --build $B/dp10-src --out $O/rerun-t6-$i --engine chromium >> $F 2>&1; echo "exit $? · $(stamp)" >> $F; done ;;
  sweep-webkit)
    echo "$(stamp)" > $L/rerun-webkit-hold.log
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 sweep-webkit-inner >> $L/rerun-webkit-hold.log 2>&1
    echo "exit $? · $(stamp)" >> $L/rerun-webkit-hold.log ;;
  sweep-webkit-inner)
    ilog rerun-crit11-geom-a10-src-webkit node $P11/crit11-geom.mjs --build $B/a10-src --out $O/rerun --engine webkit --deadline 4800 ;;
  extra-webkit) # $2..: names of inner reads to re-run with a long deadline, inside one hold
    shift; echo "$(stamp)" > $L/rerun-extra-webkit-hold.log
    $G --rss-gb 8 --exclusive webkit --timeout 90 -- zsh -c 'echo "admitted · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec zsh "$@"' _ $0 extra-webkit-inner "$@" >> $L/rerun-extra-webkit-hold.log 2>&1
    echo "exit $? · $(stamp)" >> $L/rerun-extra-webkit-hold.log ;;
  extra-webkit-inner)
    shift; for n in "$@"; do case $n in
      c1-a11) ilog rerun-crit11-c1-a11-src-webkit node $P11/crit11-c1.mjs --build $B/a11-src --out $O/rerun-a11c --engine webkit --scenes c1rtl-migrated,c1sm-migrated,c1lg-migrated,c1rich-migrated,c1multi-migrated --deadline 4800 ;;
      c1-a10) ilog rerun-crit11-c1-a10-src-webkit node $P11/crit11-c1.mjs --build $B/a10-src --out $O/rerun --engine webkit --deadline 4800 ;;
      attack) ilog rerun-crit11-geom-attack-a11-src-webkit node $P11/crit11-geom.mjs --build $B/a11-src --out $O/rerun-a11 --engine webkit --attack --deadline 4800 ;;
      media) ilog rerun-crit11-geom-media-a11-src-webkit node $P11/crit11-geom.mjs --build $B/a11-src --out $O/rerun-a11m --engine webkit --media --deadline 4800 ;;
    esac; done ;;
  *) echo "t6-chromium | sweep-webkit | extra-webkit <c1-a11|c1-a10|attack|media>..."; exit 2 ;;
esac
