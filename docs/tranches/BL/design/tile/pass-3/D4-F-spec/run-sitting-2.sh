#!/bin/zsh
# D4-F pass-3 spec · run-sitting-2.sh · the second sitting's whole read of HEAD + floor v2 + route.patch under H3, at
# the load the machine had on 2026-10-13 (the first sitting, sitting-1/, read the same patch at load 130-470).
# Serialized: every witness and probe takes the harness lock. Each log's first and last lines carry the load.
#   zsh run-sitting-2.sh <out root> <stage>      stage: probe | battery | dist | plants | shared | all
# Builds: f3r-{src,src-dev,dist,dist-dev} from build-chain-r2.sh (route.patch revision 2: perimeter at inset 0,
# `--selection-tile: flush`, the room-gated mark), and f3rp-src (the same source with the one value `plated`, for Q-2's pair).
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness
F=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/D4-F-spec
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-2/D4-F-crit/probes/crit.mjs
O=$1; ST=${2:-all}; LG=$F/logs; mkdir -p $LG $F/runs $F/shots
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
run() { L=$LG/$1.log; shift; stamp > $L; "$@" >> $L 2>&1; echo "exit $? · $(stamp)" >> $L; }
want() { [[ $ST == all || $ST == $1 ]]; }

if want probe; then
  run probe-src node $F/probes/f3.mjs --build $O/builds/f3r-src --shots $F/shots --json $F/runs/probe-src.json
  run probe-rest-plated node $F/probes/f3.mjs --build $O/builds/f3rp-src --only rest --json $F/runs/probe-rest-plated.json
  for f in src-dev dist dist-dev; do
    run probe-unmig-$f node $F/probes/f3.mjs --build $O/builds/f3r-$f --only unmig --json $F/runs/probe-unmig-$f.json
  done
fi
if want battery; then
  run battery-src node $H/run.mjs --build $O/builds/f3r-src --out $O --webkit
fi
if want dist; then
  for e in chromium webkit; do for w in we-one-line t5-one-of-n-keys t2-one-line-stadium; do
    run battery-dist-$w-$e node $H/$w.mjs --build $O/builds/f3r-dist --out $O --engine $e
  done; done
fi
if want plants; then
  for pl in a s h; do for e in chromium webkit; do
    run canon-plant-$pl-$e node $H/canon.mjs --build $O/builds/f3r-src --plant $pl --engine $e
  done; done
fi
if want shared; then
  run shared-crit-tone node $C --build $O/builds/f3r-src --part tone
  run shared-crit-desc node $C --build $O/builds/f3r-src-dev --part desc
  run shared-crit-x3 node $C --build $O/builds/f3r-src --part x3
  run shared-crit-x6 node $C --build $O/builds/f3r-src --part x6
  run shared-crit-late-src-dev node $C --build $O/builds/f3r-src-dev --part late
  run shared-crit-late-dist-dev node $C --build $O/builds/f3r-dist-dev --part late
  run shared-crit-br-dist node $C --build $O/builds/f3r-dist --part br
fi
if want pair; then
  run film-pair node $H/film.mjs --pair --arms flush=$O/builds/f3r-src,plated=$O/builds/f3rp-src --dest $F/glance-pair --scratch $O/film-scratch
  for s in specimen; do
    run film-pair-$s node $H/film.mjs --pair --site $s --arms flush=$O/builds/f3r-src,plated=$O/builds/f3rp-src --dest $F/glance-pair --scratch $O/film-scratch
  done
fi
if want extra; then
  # the mark's room gate re-read with the probe's revised criterion; the floor's names probe on each flavour; the
  # pass-2 prototype probe's route cells (pair, comfort, hover vs selected, media ink, double commit, contrast);
  # the shared probe's vacuity plants on the route's own carriers
  run probe-mark node $F/probes/f3.mjs --build $O/builds/f3r-src --only mark --json $F/runs/probe-mark.json
  for f in src src-dev dist dist-dev; do
    run floor-names-$f node $F/../floor-v2/probes/tile-fact.mjs --build $O/builds/f3r-$f --part names
  done
  run proto-probe-src node $F/../../pass-2/D4-F-proto/probe.mjs --build $O/builds/f3r-src --only q2,q3,q5,hover,ink,double,contrast --json $F/runs/proto-probe-src.json
  run shared-crit-plants node $C --build $O/builds/f3r-src --part plants
fi
echo "done $ST $(stamp)" >> $LG/sitting-2.done
