#!/bin/zsh
# H4-run.sh · D3 pass 4, H4: every command this seat ran, in phases. Scratch (worktree, builds, captures) lives under
# .claude/worktrees/bl/D3/p4/H4/; the records it copies out land in pass-4/H4-records/.
#   zsh H4-run.sh builds|fv2|baseline|glance|selftest|h3vsh4|census|plants
# Prerequisite (once): git worktree add --detach $B/wt HEAD; ln -s $R/node_modules $B/wt/node_modules
R=/Users/mkbabb/Programming/glass-ui
B=$R/.claude/worktrees/bl/D3/p4/H4
M=$R/docs/tranches/BL/design/material
H=$M/harness
REC=$M/pass-4/H4-records
export D3_OUT=$B/out
mkdir -p $B/logs $REC
ts() { echo "$(date +%T) load $(sysctl -n vm.loadavg)"; }
phase=$1; shift
echo "== $phase start $(ts)"
case $phase in
builds)
  node $H/build.mjs $B/wt --label head --demo
  echo "head built $(ts)"
  node $H/build.mjs $B/wt --label fields
  node $H/capture.mjs $D3_OUT/builds/fields/dist --out $D3_OUT/caps/fields --engines chromium --scenes empty
  echo "fields captured $(ts)"
  git -C $B/wt apply $M/pass-3/floor-v2.patch && git -C $B/wt diff --shortstat
  git -C $B/wt diff HEAD --binary | cmp - $M/pass-3/floor-v2.patch && echo "worktree diff is byte-identical to floor-v2.patch"
  node $H/build.mjs $B/wt --label fv2 --demo
  echo "fv2 built $(ts)"
  # The H3 witnesses as committed (5631b287), for the H3-against-H4 reading of the same captures.
  mkdir -p $B/h3ref && git -C $R archive HEAD docs/tranches/BL/design/material/harness | tar -x -C $B/h3ref
  ln -sfn $R/node_modules $B/h3ref/node_modules; cp $R/package.json $B/h3ref/package.json
  ;;
fv2)
  node $H/run.mjs $B/wt --label ${1:-fv2} --skip-build
  ;;
baseline)
  L=${1:-fv2}
  node $H/baseline.mjs $D3_OUT/caps/$L --out $REC/baseline-$L.json > $REC/baseline-$L.md
  cat $REC/baseline-$L.md
  ;;
glance)
  for e in chromium webkit; do
    node $H/glance.mjs --base $D3_OUT/builds/head/dist --route $D3_OUT/builds/fv2/dist --story-base $D3_OUT/builds/head/demo --story-route $D3_OUT/builds/fv2/demo \
      --out $M/pass-4/glance-fv2 --name fv2 --require-delta --engine $e
    echo "glance $e exit $? $(ts)"
  done
  ;;
selftest)
  node $H/selftest.mjs --fields $D3_OUT/caps/fields --only ${1:-RAW,M-1,M-1x,M-2,M-2m,M-2h,M-3,M-4,M-5,M-6,M-7,M-8,M-9,O-66,STACK,W-A,T,W-G,W-S,W-C,GLANCE}
  ;;
h3vsh4)
  # The same self-test captures read by the H3 witness (h3ref) and the H4 witness, each gate engine.
  H3=$B/h3ref/docs/tranches/BL/design/material/harness; C=$D3_OUT/selftest/caps
  row() { local label=$1 script=$2 cap=$3; shift 3
    for e in chromium webkit; do
      v3=$(node $H3/$script.mjs $C/$cap "$@" --gate $e 2>&1 | tail -1); v4=$(node $H/$script.mjs $C/$cap "$@" --gate $e 2>&1 | tail -1)
      echo "$label | $e | H3: $v3 | H4: $v4"; done; }
  row "I-2 hue plant (b), deep cells" m1x-off-paper green-M-1x-hue --q11 b --cells "light deep"
  row "I-2 cream plant (b)" m1x-off-paper green-M-1x-cream --q11 b
  row "I-2 grey content rung (b)" m1x-off-paper green-M-1x-content --q11 b
  row "I-3 retune-only plant" m6-separable-ladder green-M-6-retune
  row "I-4 unrelated warning" wc-ink-follows C-unrelated --cells "light paper"
  row "I-4 named warning" wc-ink-follows C-loud --cells "light paper"
  row "green M-1x (b)" m1x-off-paper green --q11 b
  row "green M-6" m6-separable-ladder green
  ;;
census)
  node $M/pass-4/lighting-census.mjs $B/wt
  ;;
plants)
  node $M/pass-3/FV2-plants.mjs $D3_OUT/builds/fv2/dist $B/wt --out $D3_OUT/plants "$@"
  ;;
esac
echo "== $phase end exit $? $(ts)"
