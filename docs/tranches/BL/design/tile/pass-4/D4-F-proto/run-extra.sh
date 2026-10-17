#!/bin/zsh
# D4-F pass-4 PROTOTYPE · the reads added after run-proto.sh's stages were already running (run-proto.sh was not edited
# while it ran): the prototype's anatomy-flip probe (Chromium ran by hand through the guard into the same log names),
# here in Playwright WebKit in one lock hold; and the :has() cost re-read twice more in Chromium (the first read sat
# at a ratio of 1.05, so two more readings give it a spread). Every log's first and last line carry the load.
#   run-extra.sh webkit | cost
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p4/D4-F-proto
O=$W/out; B=$O/builds
S=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-4/D4-F-proto; L=$S/logs
FP3=$S/../../pass-3/D4-F-proto/probes
G=~/.claude/guard/guarded
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
log() { local F=$L/$1.log; shift; stamp > $F; "$@" >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F; }
case $1 in
  webkit-inner)
    for b in f4p-src f4p-src-dev f4p-dist; do log anatomy-flip-$b-webkit node $S/probes/anatomy-flip.mjs --build $B/$b --engine webkit --out $O; done ;;
  webkit)
    stamp > $L/webkit-extra.log
    $G --light --rss-gb 8 --exclusive webkit --timeout 30 -- zsh $0 webkit-inner >> $L/webkit-extra.log 2>&1
    echo "exit $? · $(stamp)" >> $L/webkit-extra.log ;;
  cost-inner)
    for k in 2 3; do log p3-cost-$k-chromium node $FP3/p3.mjs --build $B/f4p-src --engines chromium --only cost; done ;;
  cost)
    stamp > $L/cost-extra.log
    $G --light --rss-gb 8 --timeout 20 -- zsh $0 cost-inner >> $L/cost-extra.log 2>&1
    echo "exit $? · $(stamp)" >> $L/cost-extra.log ;;
  *) echo "usage: run-extra.sh webkit | cost"; exit 2 ;;
esac
