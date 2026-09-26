#!/bin/bash
S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p2/D2-Bp-proto
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock
B=$S/out/builds/bp11; A=$D/pass-2/adapter-floor.mjs
cd $H && (uptime; node selftest.mjs --only W3 --engine chromium --faults overhang,adapterclip --out $S/out/selftest-w3; echo "selftest exit $?"; uptime) > $S/rec11/selftest-w3-faces.log 2>&1
echo step1 >> $S/rec11/chain.done
for i in 1 2; do (uptime; node w3-morph.mjs --build $B --adapter $A --engine all --out $S/out/w3-rerun$i; echo "exit $?"; uptime) > $S/rec11/w3-light-rerun$i.log 2>&1; done
echo step2 >> $S/rec11/chain.done
(uptime; DOCK_HARNESS_THEME=dark node run.mjs --build $B --adapter $A --out $S/out/full11-dark --safari; echo "exit $?"; uptime) > $S/rec11/run-bp11-dark.log 2>&1
echo step3 >> $S/rec11/chain.done
cd $D/pass-2 && (uptime; node D2-Bp-probes.mjs --build $B --adapter adapter-floor.mjs --arm proto --engine all --out $S/rec11/probes-bp11.json; uptime) > $S/rec11/probes-bp11.log 2>&1
echo step4 >> $S/rec11/chain.done
mkdir -p $S/rec11/plants
cp -R $S/wt/src $S/final11-src
for spec in bp-rect:rotlead bp-pop:pop bp-nomo-track:stretch; do
  name=${spec%%:*}; arm=${spec#*:}
  rm -rf $S/wt/src && cp -R $S/final11-src $S/wt/src
  python3 $S/variants.py $name $S/wt > $S/rec11/plants/$name.log 2>&1
  (cd $S/wt && git diff --no-index $S/final11-src src > $S/rec11/plants/$name.diff 2>/dev/null)
  (cd $H && node build.mjs $S/wt --out $S/out --label p11-$name --no-demo) >> $S/rec11/plants/$name.log 2>&1
  rm -rf $S/wt/src && cp -R $S/final11-src $S/wt/src
  (uptime; cd $D/pass-2 && node D2-Bp-probes.mjs --build $S/out/builds/p11-$name --adapter adapter-floor.mjs --arm $arm --engine all; if [ $name = bp-nomo-track ]; then cd $H && node w3-morph.mjs --build $S/out/builds/p11-$name --adapter $A --engine chromium --out $S/out/plants11; fi; uptime) >> $S/rec11/plants/$name.log 2>&1
done
diff -r $S/final11-src $S/wt/src > /dev/null && echo "src restored" >> $S/rec11/chain.done
echo step5 >> $S/rec11/chain.done
cd $D/pass-2 && (uptime; node D2-Bp-filmstrip.mjs --build $B --adapter adapter-floor.mjs --out $S/rec11/film; uptime) > $S/rec11/filmstrip.log 2>&1
echo ALLDONE >> $S/rec11/chain.done
