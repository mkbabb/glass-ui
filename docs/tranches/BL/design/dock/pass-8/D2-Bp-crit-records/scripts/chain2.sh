#!/bin/bash
# chain2.sh (D2 pass 8, B′ critic): attack readings that enter no row. The display-frame slot probe on the morph scene's
# existing variants (anchor=end, wide=1, neighbour=1), first-expand and warm-expand, bp8 and bp7 alternating, three runs,
# per engine (light). Is the handoff a law of the exchange, or of the cast's one geometry? Guarded, never --light;
# Playwright WebKit under --exclusive webkit, queued, never cancelled.
set -u
G=/Users/mkbabb/Programming/glass-ui; OUT=$G/.claude/worktrees/bl/D2/p8/Bp-crit/out
D=$G/docs/tranches/BL/design/dock; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-8/D2-Bp-crit-records; S=$REC/scripts; GD=$HOME/.claude/guard/guarded; V=$REC/si-variants; mkdir -p $V
L() { echo "$(date '+%F %T') $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
for e in chromium webkit; do
  X=""; [ $e = webkit ] && X="--exclusive webkit"
  L "queue si-variants $e"
  (echo "queued $(date) $(uptime)"; $GD $X --timeout 40 -- bash -c "echo admitted \$(date) \$(uptime); for q in anchor=end wide=1 neighbour=1; do for k in 1 2 3; do for b in bp8 bp7; do node $S/slotink-crit.mjs --build $OUT/builds/\$b --adapter $AD --engine $e --runs 1 --seqs first-expand,warm-expand --query \$q --json $V/\$b-$e-\${q%%=*}-r\$k.json; done; done; done"; echo "exit $? $(date) $(uptime)") > $V/si-$e.log 2>&1
  L "end si-variants $e"
done
L "CHAIN2-DONE"
# The content-add [stub] A/B: FM's content-add cell alone, bp8 and bp7 alternating, five runs each, per engine, dark
# (the theme of this seat's red read). Is the opening-plate stub the patch's?
A=$REC/ab-content-add; mkdir -p $A
for e in chromium webkit; do
  X=""; [ $e = webkit ] && X="--exclusive webkit"
  L "queue ab-content-add $e"
  (echo "queued $(date) $(uptime)"; DOCK_HARNESS_THEME=dark $GD $X --timeout 40 -- bash -c "echo admitted \$(date) \$(uptime); for k in 1 2 3 4 5; do for b in bp8 bp7; do node $D/harness/film.mjs --build $OUT/builds/\$b --adapter $AD --out $OUT/ab-ca/$e-\$b-r\$k --engine $e --cells '^film·content-add\$' 2>&1 | grep 'film·' | sed \"s#^#\$b r\$k #\"; done; done"; echo "exit $? $(date) $(uptime)") > $A/ab-$e-dark.log 2>&1
  L "end ab-content-add $e"
done
L "CHAIN2-AB-DONE"
