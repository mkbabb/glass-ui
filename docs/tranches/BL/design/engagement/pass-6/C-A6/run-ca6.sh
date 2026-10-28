#!/bin/zsh
# C-A6 stages (D5 pass 6, the fresh critic of the candidate A+E = F5‴ + P-A6 + P-E6-noveil-coarse).
# The caller wraps each call in ~/.claude/guard/guarded (Chromium: one guarded call per line via chain-c.sh;
# WebKit: a phase file inside ONE `guarded --exclusive webkit` acquisition via chain-w.sh).
#   zsh run-ca6.sh <fn> <args>   |   zsh run-ca6.sh phase <phase-file>
set -u
C=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/C-A6
EN=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement
H=$EN/harness
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/C-A6
W=$R/wt; O=$R/out
L=$C/logs; J=$C/json
mkdir -p $L $J
TAG=${TAG:-}
if [[ ${1:-} == TAG=* ]]; then TAG=${1#TAG=}; shift; fi
stamp() { print -- "## $(date '+%Y-%m-%d %H:%M:%S') load $(sysctl -n vm.loadavg) · $*" }
build() { # <label> [app]: the harness app (or a probe app) against the worktree as it stands
  local l=$1 app=${2:-}; local log=$L/build-$l$TAG.log; stamp "build $l" > $log
  ( cd $W && git diff --binary HEAD | shasum | cut -c1-12 ) | sed 's/^/worktree diff sha1 /' >> $log
  if [[ -n $app ]]; then node $H/build.mjs $W --label $l --out $O --app $app >> $log 2>&1; else node $H/build.mjs $W --label $l --out $O >> $log 2>&1; fi
  print -- "exit $?" >> $log; stamp "end build $l" >> $log; tail -2 $log; }
bat() { # <build> <engine> <witness id> [extra]
  local b=$1 e=$2 id=$3; shift 3; local log=$L/bat-$b-$e-$id$TAG.log
  stamp "start $id $b $e $*" > $log
  ( cd $H && node run.mjs --build $O/builds/$b --wt $W --engines $e --only $id --out $J/$b$TAG --verbose "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $id $b $e" >> $log
  grep -E "(chromium|webkit) (PASS|FAIL|UNMEASURED|HARNESS)" $log | tail -1 | cut -c1-220; }
one() { # <build> <engine> <witness file> <tag> [args]
  local b=$1 e=$2 w=$3 tg=$4; shift 4; local log=$L/one-$b-$e-${w%.mjs}-$tg$TAG.log
  stamp "start $w $b $e $*" > $log
  ( cd $H && node $w --build $O/builds/$b --wt $W --engine $e --out $J/$b$TAG-$tg "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $w $b $e" >> $log; grep -E "(chromium|webkit) (PASS|FAIL|UNMEASURED|HARNESS)" $log | tail -1 | cut -c1-220; }
xp() { # <dir rel. to engagement/> <probe> <build> <engine> [args]: a seat's probe, unedited where it lives
  local d=$1 n=$2 b=$3 e=$4; shift 4; local log=$L/xp-$n-$b-$e$TAG.log
  stamp "start $d/$n $b $e $*" > $log
  ( cd $EN/$d && node $n.mjs --build $O/builds/$b --engine $e "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $n $b $e" >> $log; print -- "$n $b $e: $(grep -cE '^\s+PASS' $log) PASS · $(grep -cE '^\s+FAIL' $log) FAIL"; }
cap() { # <build> <engine>
  local b=$1 e=$2; shift 2; local log=$L/cap-$b-$e$TAG.log
  stamp "start capture $b $e $*" > $log
  ( cd $H && node capture.mjs --build $O/builds/$b --label ca6-$b --engine $e --frames $C/glance/frames --sheets $C/glance "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end capture $b $e" >> $log; tail -3 $log | cut -c1-200; }
plant() { # <name>: the candidate with one planted edit, built, source restored byte-identical
  local n=$1 F; local log=$L/build-plant-$n$TAG.log; stamp "build plant $n" > $log
  case $n in
    deaf) F=$W/src/composables/motion/engage/stage.ts ;;
    capsule) F=$W/src/components/configurator/Configurator.vue ;;
  esac
  cp $F $R/plant.bak; local s0=$(shasum $F | cut -c1-12)
  case $n in
    deaf) perl -0pi -e 's/(function heard\(\): void \{\n)/$1    return; \/\/ PLANT deaf (C-A6)\n/' $F ;;
    capsule) perl -0pi -e "s/'configurator-preset-chip glass-capsule /'configurator-preset-chip glass-capsule glass-capsule-hover /" $F ;;
  esac
  ( cd $W && git diff HEAD -- ${F#$W/} | grep -E "^[+-].*(PLANT|glass-capsule-hover)" ) >> $log
  node $H/build.mjs $W --label plant-$n --out $O >> $log 2>&1; print -- "exit $?" >> $log
  cp $R/plant.bak $F; rm $R/plant.bak; print -- "restored $(shasum $F | cut -c1-12) (was $s0)" >> $log; stamp "end build plant $n" >> $log; tail -3 $log; }
if [[ ${1:-} == phase ]]; then while read -r line; do [[ -z $line || $line == \#* ]] && continue; stamp "phase line: $line"; eval "$line"; done < $2; else "$@"; fi
