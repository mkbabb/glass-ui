#!/bin/zsh
# C-E6 stages (D5 pass 6, the fresh critic of A+E). The caller wraps each call in ~/.claude/guard/guarded
# (Chromium: one guarded call per line; WebKit: a phase file inside ONE `guarded --exclusive webkit` acquisition).
#   zsh run-ce6.sh <fn> <args>   |   zsh run-ce6.sh phase <phase-file>
# Arms: noveil-coarse (the candidate), veil-coarse, noveil-every, veil-every: stage.ts's two constants, set by `arm`.
set -u
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/C-E6
EN=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement
H=$EN/harness
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/C-E6
W=$R/wt
O=$R/out
L=$C/logs; J=$C/json
mkdir -p $L $J
TAG=${TAG:-}
if [[ ${1:-} == TAG=* ]]; then TAG=${1#TAG=}; shift; fi
stamp() { print -- "## $(date '+%Y-%m-%d %H:%M:%S') load $(sysctl -n vm.loadavg) · $*" }
arm() { local v=false p=coarse
  [[ $1 == veil-* ]] && v=true; [[ $1 == *-every ]] && p=every
  sed -i '' -E "s/^export const STAGE_VEIL = (true|false);/export const STAGE_VEIL = $v;/; s/^export const POINTER_STAGE: \"every\" \| \"coarse\" = \"(every|coarse)\";/export const POINTER_STAGE: \"every\" | \"coarse\" = \"$p\";/" $W/src/composables/motion/engage/stage.ts
  grep -nE "^export const (STAGE_VEIL|POINTER_STAGE)" $W/src/composables/motion/engage/stage.ts; }
build() { # <arm> [label] [app]
  local b=$1 l=${2:-$1} app=${3:-}; local log=$L/build-$l$TAG.log; stamp "build $l" | tee $log
  arm $b >> $log
  if [[ -n $app ]]; then node $H/build.mjs $W --label $l --out $O --app $app >> $log 2>&1; else node $H/build.mjs $W --label $l --out $O >> $log 2>&1; fi
  print -- "exit $?" >> $log; arm noveil-coarse >> $log; print -- "src tree sha after restore: $(cd $W && find src -type f | sort | xargs shasum | shasum | cut -c1-12)" >> $log; stamp "end build $l" >> $log; tail -4 $log; }
buildplant() { # the candidate with five critic plants (one per row), built; source restored byte-identical
  local log=$L/build-plant-x$TAG.log; stamp "build plant-x" | tee $log
  arm noveil-coarse >> $log
  local s0=$(cd $W && find src -type f | sort | xargs shasum | shasum | cut -c1-12)
  mkdir -p $R/bak && for f in components/configurator/Configurator.vue composables/motion/engage/useEngage.ts styles/utilities/engage.css composables/motion/engage/stage.ts components/switch/Switch.vue; do mkdir -p $R/bak/$(dirname $f); cp $W/src/$f $R/bak/$f; done
  # P1 (CK-11/14/27): the preset chip composes the capsule lift and snap again
  perl -pi -e "s/'configurator-preset-chip glass-capsule shadow-cartoon/'configurator-preset-chip glass-capsule glass-capsule-hover shadow-cartoon/" $W/src/components/configurator/Configurator.vue
  # P2 (CK-21): the clock read is silent
  perl -pi -e 's/(for \(const t of ENGAGE_CLOCKS\) if \(!supports\("transition-duration", cs.getPropertyValue\(t\).trim\(\)\)\)) loud\(t, h\);/$1 void t; \/\/ PLANT P2 silent clocks/' $W/src/composables/motion/engage/useEngage.ts
  # P3 (CK-02 PRM): the reduce block that makes the pop an instant state change is gone
  perl -0pi -e 's/    \@media \(prefers-reduced-motion: reduce\) \{\n        :where\(\.engage-chosen, \.engage-pressed, \.engage-disclosed\) \{\n            transform: none;\n        \}\n    \}\n/    \/* PLANT P3 no PRM pop rule *\/\n/' $W/src/styles/utilities/engage.css
  # P4 (CK-20): the stage's place read is deaf
  perl -0pi -e 's/(function heard\(\): void \{\n)/$1    return; \/\/ PLANT P4 deaf\n/' $W/src/composables/motion/engage/stage.ts
  # P5 (CK-01): the Switch's class deleted
  perl -pi -e "s/'switch control-bit engage-chosen'/'switch control-bit'/" $W/src/components/switch/Switch.vue
  (cd $W && git diff --stat -- src/components/configurator/Configurator.vue src/composables/motion/engage/useEngage.ts src/styles/utilities/engage.css src/composables/motion/engage/stage.ts src/components/switch/Switch.vue) >> $log
  (cd $W && grep -n "PLANT\|glass-capsule-hover shadow\|'switch control-bit'" src/components/configurator/Configurator.vue src/composables/motion/engage/useEngage.ts src/styles/utilities/engage.css src/composables/motion/engage/stage.ts src/components/switch/Switch.vue) >> $log
  node $H/build.mjs $W --label plant-x --out $O >> $log 2>&1; print -- "exit $?" >> $log
  for f in components/configurator/Configurator.vue composables/motion/engage/useEngage.ts styles/utilities/engage.css composables/motion/engage/stage.ts components/switch/Switch.vue; do cp $R/bak/$f $W/src/$f; done; rm -rf $R/bak
  print -- "restored $(cd $W && find src -type f | sort | xargs shasum | shasum | cut -c1-12) (was $s0)" >> $log; stamp "end build plant-x" >> $log; tail -3 $log; }
buildplanty() { # plant Y (CK-02 PRM, the control for plant P3): the global reduce fallback's transition kill removed, engage.css kept
  local log=$L/build-plant-y$TAG.log F=$W/src/styles/utilities/a11y-overrides.css; stamp "build plant-y" | tee $log
  arm noveil-coarse >> $log; local s0=$(cd $W && find src -type f | sort | xargs shasum | shasum | cut -c1-12); cp $F $R/a11y.bak
  perl -pi -e 's/^(\s*)transition-duration: 0s !important;/$1\/* PLANT Y no PRM transition kill *\//' $F
  grep -n "PLANT Y" $F >> $log
  node $H/build.mjs $W --label plant-y --out $O >> $log 2>&1; print -- "exit $?" >> $log
  cp $R/a11y.bak $F; rm $R/a11y.bak; print -- "restored $(cd $W && find src -type f | sort | xargs shasum | shasum | cut -c1-12) (was $s0)" >> $log; stamp "end build plant-y" >> $log; tail -3 $log; }
buildplantz() { # plant Z (CK-02 PRM, both legs): the global reduce transition kill AND engage.css's reduce transform rule removed
  local log=$L/build-plant-z$TAG.log F=$W/src/styles/utilities/a11y-overrides.css G=$W/src/styles/utilities/engage.css; stamp "build plant-z" | tee $log
  arm noveil-coarse >> $log; local s0=$(cd $W && find src -type f | sort | xargs shasum | shasum | cut -c1-12); cp $F $R/a11y.bak; cp $G $R/engage.bak
  perl -pi -e 's/^(\s*)transition-duration: 0s !important;/$1\/* PLANT Z no PRM transition kill *\//' $F
  perl -0pi -e 's/    \@media \(prefers-reduced-motion: reduce\) \{\n        :where\(\.engage-chosen, \.engage-pressed, \.engage-disclosed\) \{\n            transform: none;\n        \}\n    \}\n/    \/* PLANT Z no PRM pop rule *\/\n/' $G
  grep -n "PLANT Z" $F $G >> $log
  node $H/build.mjs $W --label plant-z --out $O >> $log 2>&1; print -- "exit $?" >> $log
  cp $R/a11y.bak $F; cp $R/engage.bak $G; rm $R/a11y.bak $R/engage.bak; print -- "restored $(cd $W && find src -type f | sort | xargs shasum | shasum | cut -c1-12) (was $s0)" >> $log; stamp "end build plant-z" >> $log; tail -4 $log; }
bat() { # <build> <engine> <witness id> [extra]
  local b=$1 e=$2 id=$3; shift 3; local log=$L/bat-$b-$e-$id$TAG.log
  stamp "start $id $b $e $*" | tee $log
  ( cd $H && node run.mjs --build $O/builds/$b --wt $W --engines $e --only $id --out $J/$b$TAG --verbose "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $id $b $e" >> $log
  grep -E "^E-[0-9]+ +(chromium|webkit) +exit|· [0-9]+ pass" $log | tail -1 | cut -c1-220; }
one() { # <build> <engine> <witness file> <tag> [args]
  local b=$1 e=$2 w=$3 tg=$4; shift 4; local log=$L/one-$b-$e-${w%.mjs}-$tg$TAG.log
  stamp "start $w $b $e $*" | tee $log
  ( cd $H && node $w --build $O/builds/$b --wt $W --engine $e --out $J/$b$TAG-$tg "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $w $b $e" >> $log; print -- "$(grep -cE ' PASS ' $log) PASS · $(grep -cE ' FAIL' $log) FAIL"; grep -E " FAIL" $log | cut -c1-240 | head -12; }
xp() { # <dir rel. to engagement/> <probe> <build> <engine> [args]
  local d=$1 n=$2 b=$3 e=$4; shift 4; local log=$L/xp-$n-$b-$e$TAG.log
  stamp "start $d/$n $b $e $*" | tee $log
  ( cd $EN/$d && node $n.mjs --build $O/builds/$b --engine $e "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $n $b $e" >> $log; print -- "$(grep -cE '^\s+PASS| PASS ' $log) PASS · $(grep -cE '^\s+FAIL| FAIL' $log) FAIL"; grep -E "FAIL" $log | cut -c1-240 | head -12; }
cap() { # <build> <engine>
  local b=$1 e=$2; shift 2; local log=$L/cap-$b-$e$TAG.log
  stamp "start capture $b $e $*" | tee $log
  ( cd $H && node capture.mjs --build $O/builds/$b --label ce6-$b --engine $e --frames $C/glance/frames --sheets $C/glance "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end capture $b $e" >> $log; grep -E "ladder|verdict|FAIL" $log | cut -c1-220 | tail -8; }
if [[ ${1:-} == phase ]]; then while read -r line; do [[ -z $line || $line == \#* ]] && continue; stamp "phase line: $line"; eval "$line"; done < $2; else "$@"; fi
