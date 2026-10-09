#!/bin/zsh
# D4-Dp-spec/run-p3b.sh · the second sitting (2026-10-09). route.patch now carries the H3-7 cure (the perimeter
# inside the padding box). Rebuilds the library and the flavours, then runs what the first sitting left unfinished or
# what the cure touches: T-3 (both engines), T-5 on dist (both engines), the CANON plants on a build, and the
# `plated` twin for the Q-2 film pair. Serialized by the harness lock; every log's first and last line carry the load.
#   zsh run-p3b.sh <worktree> <out root (scratch)> [step ...]
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/D4-Dp-spec
WT=$1; O=$2; shift 2; LG=$D/logs; R=$D/route
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
for step in "$@"; do case $step in
  lib) L=$LG/p3b-libbuild.log; stamp > $L; node $H/libbuild.mjs $WT >> $L 2>&1; echo "exit $? · $(stamp)" >> $L ;;
  builds) for f in src src-dev dist dist-dev; do L=$LG/p3b-build-dp-$f.log; stamp > $L
      node $H/build.mjs $WT --label dp-$f --out $O --flavor $f --route $R >> $L 2>&1; echo "exit $? · $(stamp)" >> $L; done ;;
  t3) for e in chromium webkit; do L=$LG/p3b-t3-$e.log; stamp > $L
      node $H/t3-selected-separates.mjs --build $O/builds/dp-src --out $O --engine $e >> $L 2>&1; echo "exit $? · $(stamp)" >> $L; done ;;
  t5dist) for e in chromium webkit; do L=$LG/p3b-t5-dist-$e.log; stamp > $L
      node $H/t5-one-of-n-keys.mjs --build $O/builds/dp-dist --out $O --engine $e >> $L 2>&1; echo "exit $? · $(stamp)" >> $L; done ;;
  canon) for p in none a s h; do for e in chromium webkit; do L=$LG/p3b-canon-$p-$e.log; stamp > $L
      if [ $p = none ]; then node $H/canon.mjs --build $O/builds/dp-src --out $O --engine $e >> $L 2>&1
      else node $H/canon.mjs --build $O/builds/dp-src --out $O/plant-$p --engine $e --plant $p >> $L 2>&1; fi
      echo "exit $? · $(stamp)" >> $L; done; done ;;
esac; done
echo "done $* $(stamp)" >> $LG/p3b.done
# second-sitting probes (appended): the shared pass-2 instruments and this seat's corner probe, and the Q-2 / Q-3 pair
probes() { P=$D/probes
  for part in states hover ink a11y; do L=$LG/p3b-states-$part.log; stamp > $L; node $P/states.mjs --build $O/builds/dp-src --part $part >> $L 2>&1; echo "exit $? · $(stamp)" >> $L; done
  L=$LG/p3b-states-hover-f1.log; stamp > $L; node $P/states.mjs --build $O/builds/dp-src --part hover --sites f1-migrated >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
  for f in src dist; do L=$LG/p3b-corner-refusal-$f.log; stamp > $L; node $P/corner-refusal.mjs --build $O/builds/dp-$f >> $L 2>&1; echo "exit $? · $(stamp)" >> $L; done
  L=$LG/p3b-crit-tworow.log; stamp > $L; node $P/crit.mjs --build $O/builds/dp-dist --part tworow >> $L 2>&1; echo "exit $? · $(stamp)" >> $L; }
pair() { S=$WT/src/components/toggle-group/styles.css; cp $S $WT/../styles.flush
  sed -i '' 's/        --selection-tile: flush;/        --selection-tile: plated;/' $S
  L=$LG/p3b-build-dp-plated-src.log; stamp > $L; grep -c "selection-tile: plated" $S >> $L
  node $H/build.mjs $WT --label dp-plated-src --out $O --flavor src --route $R >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
  cp $WT/../styles.flush $S; cmp -s $S $WT/../styles.flush && echo "restored flush · $(stamp)" >> $L
  for site in preset specimen; do L=$LG/p3b-film-pair-$site.log; stamp > $L
    node $H/film.mjs --pair --arms plated=$O/builds/dp-plated-src,flush=$O/builds/dp-src --site $site --dest $D/pair/$site --scratch $O/pair-scratch/$site >> $L 2>&1; echo "exit $? · $(stamp)" >> $L; done; }
for step in "$@"; do case $step in probes) probes ;; pair) pair ;; esac; done
# R-3's plant on the route's own build: the kick's animation removed (`animation: none`), the T-6 commit bar re-read
pop0() { S=$WT/src/components/toggle-group/styles.css; cp $S $WT/../styles.kick
  sed -i '' 's/animation: toggle-group-commit 450ms/animation: none 450ms/' $S
  L=$LG/p3b-build-dp-pop0-src.log; stamp > $L; grep -c "animation: none 450ms" $S >> $L
  node $H/build.mjs $WT --label dp-pop0-src --out $O --flavor src --route $R >> $L 2>&1; echo "exit $? · $(stamp)" >> $L
  cp $WT/../styles.kick $S; cmp -s $S $WT/../styles.kick && echo "restored kick · $(stamp)" >> $L
  for e in chromium webkit; do L=$LG/p3b-t6-pop0-$e.log; stamp > $L
    node $H/t6-engagement.mjs --build $O/builds/dp-pop0-src --out $O/plant-pop0 --engine $e >> $L 2>&1; echo "exit $? · $(stamp)" >> $L; done; }
for step in "$@"; do case $step in pop0) pop0 ;; esac; done
