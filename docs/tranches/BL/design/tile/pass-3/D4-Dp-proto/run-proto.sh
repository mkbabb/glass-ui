#!/bin/zsh
# D4-Dp-proto/run-proto.sh · the D′ prototype on HEAD + floor v2 + D4-Dp-proto.patch, under H3, in one sitting.
# Typecheck, unit, library build, the four scene-app flavours with the route's migrated arms, the floor's name and
# unmigrated probes, the whole battery on `src` in Chromium and Playwright WebKit, the dist-gated cells, CANON and its
# plants on the build, the shared pass-2 instruments, the corner-refusal probe, the unit plants and bites, the bundle,
# the Q-2 / Q-3 film pair and R-3's kick plant. Serialized by the harness lock; every log's first and last line
# carry the date and the 1-min / 5-min / 15-min load average.
#   zsh run-proto.sh <worktree> <out root (scratch)> <step> [step ...]
# Steps: tsc unit lib builds names battery dist canon probes plants bundle pair pop0 corner
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness
F=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/floor-v2
SP=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/D4-Dp-spec/probes
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/D4-Dp-proto
WT=$1; O=$2; shift 2; LG=$D/logs; R=$D/route
mkdir -p $LG $D/run
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
go() { L=$LG/$1.log; shift; stamp > $L; "$@" >> $L 2>&1; echo "exit $? · $(stamp)" >> $L; }
S=$WT/src/components/toggle-group/styles.css
for step in "$@"; do case $step in
  tsc) go wt-tsc-app zsh -c "cd $WT && npx vue-tsc --noEmit"
       go wt-tsc-test zsh -c "cd $WT && npx vue-tsc --noEmit -p tsconfig.test.json" ;;
  unit) go wt-vitest zsh -c "cd $WT && npx vitest run --config vitest.d4.config.mts 2>&1 | grep -E '×|FAIL|Test Files|Tests  '" ;;
  lib) go libbuild node $H/libbuild.mjs $WT ;;
  builds) for f in src src-dev dist dist-dev; do go build-dp-$f node $H/build.mjs $WT --label dp-$f --out $O --flavor $f --route $R; done ;;
  names) for f in src src-dev dist dist-dev; do go probe-names-$f node $F/probes/tile-fact.mjs --build $O/builds/dp-$f --part names; done
         go probe-unmigrated-dist node $F/probes/unmigrated.mjs --build $O/builds/dp-dist
         go probe-tile-fact-mech node $F/probes/tile-fact.mjs --build $O/builds/dp-src --part mech ;;
  battery) go battery-dp-src node $H/run.mjs --build $O/builds/dp-src --out $O --webkit
           rm -rf $D/run/dp-src; cp -R $O/runs/dp-src $D/run/dp-src ;;
  dist) for e in chromium webkit; do for w in we-one-line t5-one-of-n-keys; do
          go battery-dp-dist-$w-$e node $H/$w.mjs --build $O/builds/dp-dist --out $O --engine $e; done; done
        rm -rf $D/run/dp-dist; cp -R $O/runs/dp-dist $D/run/dp-dist ;;
  canon) for p in a s h; do for e in chromium webkit; do
           go canon-$p-$e node $H/canon.mjs --build $O/builds/dp-src --out $O/plant-$p --engine $e --plant $p; done; done ;;
  probes) for part in states hover ink a11y; do go states-$part node $SP/states.mjs --build $O/builds/dp-src --part $part; done
          go states-hover-f1 node $SP/states.mjs --build $O/builds/dp-src --part hover --sites f1-migrated
          for part in x3 x6 tone; do go crit-$part node $SP/crit.mjs --build $O/builds/dp-src --part $part; done
          for f in src dist; do go corner-refusal-$f node $SP/corner-refusal.mjs --build $O/builds/dp-$f; done ;;
  plants) go unit-plants zsh $SP/unit-plants.sh $WT $LG/unit-plants.out
          go unit-bites zsh $SP/unit-bites.sh $WT $LG/unit-bites.out ;;
  bundle) go bundle zsh $F/probes/bundle.sh $WT "HEAD+floor-v2+D′ proto" ;;
  pair) cp $S $WT/../styles.flush
        sed -i '' 's/        --selection-tile: flush;/        --selection-tile: plated;/' $S
        go build-dp-plated-src zsh -c "grep -c 'selection-tile: plated' $S; node $H/build.mjs $WT --label dp-plated-src --out $O --flavor src --route $R"
        cp $WT/../styles.flush $S; cmp -s $S $WT/../styles.flush && echo "restored flush · $(stamp)" >> $LG/build-dp-plated-src.log
        for site in preset specimen; do go film-pair-$site node $H/film.mjs --pair --arms plated=$O/builds/dp-plated-src,flush=$O/builds/dp-src --site $site --dest $D/pair/$site --scratch $O/pair-scratch/$site; done ;;
  pop0) cp $S $WT/../styles.kick
        sed -i '' 's/animation: toggle-group-commit 450ms/animation: none 450ms/' $S
        go build-dp-pop0-src zsh -c "grep -c 'animation: none 450ms' $S; node $H/build.mjs $WT --label dp-pop0-src --out $O --flavor src --route $R"
        cp $WT/../styles.kick $S; cmp -s $S $WT/../styles.kick && echo "restored kick · $(stamp)" >> $LG/build-dp-pop0-src.log
        for e in chromium webkit; do go t6-pop0-$e node $H/t6-engagement.mjs --build $O/builds/dp-pop0-src --out $O/plant-pop0 --engine $e; done
        rm -rf $D/run/plant-pop0; cp -R $O/plant-pop0/runs/dp-pop0-src $D/run/plant-pop0 2>/dev/null ;;
  corner) go corner-gap node $D/probes/corner-gap.mjs --build $O/builds/dp-src ;;
esac; echo "step $step done · $(stamp)" >> $LG/run-proto.done; done
