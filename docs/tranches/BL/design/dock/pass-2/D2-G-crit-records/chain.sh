#!/bin/zsh
# D2-G critic chain (serialized; one browser seat). Builds: crit (floor+G), floor (floor only), nomo (G minus the MutationObserver trigger).
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness
P=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-2; R=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/pass-2/D2-G-crit-records; S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p2/D2-G-crit; B=$S/out/builds
cd $H
for i in 1 2; do (uptime; node w3-morph.mjs --build $B/crit --adapter $P/adapter-G.mjs --engine all --out $S/out/w3-rerun$i; echo "exit $?"; uptime) > $R/w3-rerun$i.log 2>&1; done
for i in 1 2; do (uptime; node w1-corner.mjs --build $B/crit --adapter $P/adapter-G.mjs --engine webkit --cells '^vmorph' --out $S/out/w1v-rerun$i; echo "exit $?"; uptime) > $R/w1-vmorph-rerun$i.log 2>&1; done
(uptime; node w7-edge.mjs --build $B/crit --adapter $P/D2-G-crit-plant-nocaps.mjs --engine all --out $S/out/w7-nocaps; echo "exit $?"; uptime) > $R/plant-nocaps-w7.log 2>&1
(uptime; node w3-morph.mjs --build $B/nomo --adapter $P/adapter-G.mjs --engine all --cells '^(lead|ticking|content)' --out $S/out/w3-nomo; echo "exit $?"; uptime) > $R/plant-nomo-w3.log 2>&1
cd $P
(uptime; node D2-G-crit-probes.mjs --build $B/crit --adapter adapter-G.mjs --arm vagree --engine all --reps 4 --out $R/crit-vagree.json; uptime) > $R/crit-vagree.log 2>&1
(uptime; node D2-G-crit-probes.mjs --build $B/crit --adapter adapter-G.mjs --arm stall --engine all --reps 2 --out $R/crit-stall-G.json; uptime) > $R/crit-stall-G.log 2>&1
(uptime; node D2-G-crit-probes.mjs --build $B/floor --adapter adapter-floor.mjs --arm stall --engine all --reps 2 --out $R/crit-stall-floor.json; uptime) > $R/crit-stall-floor.log 2>&1
(uptime; node D2-Bp-crit-probes.mjs --build $B/crit --adapter adapter-G.mjs --arm blank,lattice,infanim,popdetail --engine all --out $R/bpcrit-arms-G.json; uptime) > $R/bpcrit-arms-G.log 2>&1
(uptime; node D2-Bp-crit-probes.mjs --build $B/floor --adapter adapter-floor.mjs --arm blank,lattice --engine all --out $R/bpcrit-arms-floor.json; uptime) > $R/bpcrit-arms-floor.log 2>&1
(uptime; node D2-Bp-crit-probes.mjs --build $B/crit --adapter adapter-G.mjs --arm film --engine chromium,webkit --film $R/film --out $R/film.json; uptime) > $R/film.log 2>&1
echo ALLDONE > $R/chain.done
