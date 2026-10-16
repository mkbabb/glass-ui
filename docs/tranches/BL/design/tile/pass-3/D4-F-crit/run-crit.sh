#!/bin/zsh
# D4-F pass-3 CRITIC · run-crit.sh · rebuild HEAD + floor-v2.patch + D4-F-proto.patch in the critic's own worktree and
# re-read every number the prototype scores, plus the critic's own attacks (probes/attack.mjs).
#   zsh run-crit.sh <worktree> <out root> <stage>
#   stage: build | battery | dist | shared | names | probe | plants | story | attack | all
# Same commands as ../D4-F-proto/run-proto.sh (so the instruments are the shared ones), records under this directory.
# Each log's first and last line carry the load. Labels f3c-* (critic) so no record collides with the prototype's.
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3
F=$T/D4-F-proto
S=$T/D4-F-spec
K=$T/D4-F-crit
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-2/D4-F-crit/probes/crit.mjs
WT=$1; O=$2; ST=${3:-all}; LG=$K/logs; RN=$K/runs; SH=$K/shots; mkdir -p $LG $RN $SH
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
run() { L=$LG/$1.log; shift; stamp > $L; "$@" >> $L 2>&1; echo "exit $? · $(stamp)" >> $L; }
want() { [[ $ST == all || $ST == $1 ]]; }
CSS=$WT/src/components/toggle-group/styles.css

if want build; then
  run build-lib node $H/libbuild.mjs $WT
  for f in src src-dev dist dist-dev; do
    run build-$f node $H/build.mjs $WT --label f3c-$f --out $O --flavor $f --route $S/route
  done
  sed -i '' 's/--selection-tile: flush;/--selection-tile: plated;/' $CSS
  run build-plated node $H/build.mjs $WT --label f3cp-src --out $O --flavor src --route $S/route
  sed -i '' 's/--selection-tile: plated;/--selection-tile: flush;/' $CSS
  (cd $WT && shasum src/components/toggle-group/ToggleGroupItem.vue src/components/toggle-group/styles.css src/components/fading-scroll/FadingScroll.vue) > $LG/src-at-build.sha1
fi
if want battery; then
  run battery-src node $H/run.mjs --build $O/builds/f3c-src --out $O --webkit
  mkdir -p $RN/f3c-src && cp $O/runs/f3c-src/*.json $RN/f3c-src/
fi
if want dist; then
  for e in chromium webkit; do for w in t5-one-of-n-keys t2-one-line-stadium; do
    run battery-dist-$w-$e node $H/$w.mjs --build $O/builds/f3c-dist --out $O --engine $e
  done; done
  mkdir -p $RN/f3c-dist && cp $O/runs/f3c-dist/*.json $RN/f3c-dist/
fi
if want shared; then
  run shared-crit-tone node $C --build $O/builds/f3c-src --part tone
  run shared-crit-desc node $C --build $O/builds/f3c-src-dev --part desc
  run shared-crit-x3 node $C --build $O/builds/f3c-src --part x3
  run shared-crit-x6 node $C --build $O/builds/f3c-src --part x6
  run shared-crit-late-src-dev node $C --build $O/builds/f3c-src-dev --part late
  run shared-crit-late-dist-dev node $C --build $O/builds/f3c-dist-dev --part late
  run shared-crit-late-dist node $C --build $O/builds/f3c-dist --part late
  run shared-crit-br-dist node $C --build $O/builds/f3c-dist --part br
  run shared-crit-plants node $C --build $O/builds/f3c-src --part plants
fi
if want names; then
  for f in src src-dev dist dist-dev; do
    run floor-names-$f node $T/floor-v2/probes/tile-fact.mjs --build $O/builds/f3c-$f --part names
  done
fi
if want probe; then
  run probe-src node $S/probes/f3.mjs --build $O/builds/f3c-src --shots $SH --json $RN/probe-src.json
  run probe-unmig-dist node $S/probes/f3.mjs --build $O/builds/f3c-dist --only unmig --json $RN/probe-unmig-dist.json
  run probe-p3 node $F/probes/p3.mjs --build $O/builds/f3c-src --json $RN/probe-p3.json
  run probe-p3-stack-dist-dev node $F/probes/p3.mjs --build $O/builds/f3c-dist-dev --only stack --json $RN/probe-p3-stack-dist-dev.json
  run proto-probe-src node $T/../pass-2/D4-F-proto/probe.mjs --build $O/builds/f3c-src --only q2,q3,q5,hover,ink,double,contrast --json $RN/proto-probe-src.json
fi
if want plants; then
  for pl in a s h; do for e in chromium webkit; do
    run canon-plant-$pl-$e node $H/canon.mjs --build $O/builds/f3c-src --plant $pl --engine $e
  done; done
fi
if want story; then
  run story-webkit node $F/probes/story-webkit.mjs $WT --json $RN/story-webkit.json
fi
if want attack; then
  for f in src src-dev; do
    [[ -f $O/builds/f3c-atk-$f/build.json ]] || run build-atk-$f node $H/build.mjs $WT --label f3c-atk-$f --out $O --flavor $f --route $K/attack-route
    run attack-$f node $K/probes/attack.mjs --build $O/builds/f3c-atk-$f --json $RN/attack-$f.json
  done
fi
echo "done $ST $(stamp)" >> $LG/crit.done
