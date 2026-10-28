#!/bin/zsh
# D5 pass 6 · P-E6 stages. The caller wraps each call in ~/.claude/guard/guarded (Chromium: one guarded call per
# witness, probe or capture; WebKit: a phase file inside ONE `guarded --exclusive webkit` acquisition).
#   zsh run-e6.sh <fn> <args>   |   zsh run-e6.sh phase <phase-file>
# Arms: noveil-coarse (the candidate), veil-coarse, noveil-every, veil-every: the two constants of
# src/composables/motion/engage/stage.ts (STAGE_VEIL, POINTER_STAGE), set by `arm` in the one worktree.
set -u
E6=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-6/E6
EN=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement
H=$EN/harness
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p6/E6
W=$R/wt
O=$R/out
L=$E6/logs; J=$E6/json
mkdir -p $L $J
TAG=${TAG:-}
if [[ ${1:-} == TAG=* ]]; then TAG=${1#TAG=}; shift; fi
stamp() { print -- "## $(date '+%Y-%m-%d %H:%M:%S') load $(sysctl -n vm.loadavg) · $*" }
arm() { local v=false p=coarse
  [[ $1 == veil-* ]] && v=true; [[ $1 == *-every ]] && p=every
  sed -i '' -E "s/^export const STAGE_VEIL = (true|false);/export const STAGE_VEIL = $v;/; s/^export const POINTER_STAGE: \"every\" \| \"coarse\" = \"(every|coarse)\";/export const POINTER_STAGE: \"every\" | \"coarse\" = \"$p\";/" $W/src/composables/motion/engage/stage.ts
  grep -nE "^export const (STAGE_VEIL|POINTER_STAGE)" $W/src/composables/motion/engage/stage.ts; }
build() { # <arm> [label] [app]: the harness app (or a probe app) against the arm; the worktree goes back to the candidate
  local b=$1 l=${2:-$1} app=${3:-}; local log=$L/build-$l$TAG.log; stamp "build $l" | tee $log
  arm $b >> $log
  if [[ -n $app ]]; then node $H/build.mjs $W --label $l --out $O --app $app >> $log 2>&1; else node $H/build.mjs $W --label $l --out $O >> $log 2>&1; fi
  print -- "exit $?" >> $log; arm noveil-coarse >> $log; stamp "end build $l" >> $log; tail -3 $log; }
buildplant() { # <name>: the candidate with one plant in stage.ts, built, source restored byte-identical
  local log=$L/build-plant-$1$TAG.log F=$W/src/composables/motion/engage/stage.ts; stamp "build plant $1" | tee $log
  arm noveil-coarse >> $log; cp $F $R/stage.bak; local s0=$(shasum $F | cut -c1-12)
  case $1 in
    deaf) perl -0pi -e 's/(function heard\(\): void \{\n)/$1    return; \/\/ PLANT deaf\n/' $F ;;
    rafread) perl -0pi -e 's/(function hear\(\): void \{\n    frame = requestAnimationFrame\(hear\);\n)/$1    heard(); return; \/\/ PLANT rafread\n/' $F ;;
    noread) perl -0pi -e 's/    sizes = new ResizeObserver\(heard\);\n    frame = requestAnimationFrame\(hear\);\n/    \/\/ PLANT noread: no frame read at all (the control for the hand-off drop)\n/' $F ;;
  esac
  grep -n "PLANT" $F >> $log
  node $H/build.mjs $W --label plant-$1 --out $O >> $log 2>&1; print -- "exit $?" >> $log
  cp $R/stage.bak $F; rm $R/stage.bak; print -- "restored $(shasum $F | cut -c1-12) (was $s0)" >> $log; stamp "end build plant $1" >> $log; tail -3 $log; }
bat() { # <build> <engine> <witness id> [extra]: one witness via run.mjs
  local b=$1 e=$2 id=$3; shift 3; local log=$L/bat-$b-$e-$id$TAG.log
  stamp "start $id $b $e $*" | tee $log
  ( cd $H && node run.mjs --build $O/builds/$b --wt $W --engines $e --only $id --out $J/$b$TAG --verbose "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $id $b $e" >> $log
  grep -E "^E-[0-9]+ +(chromium|webkit) +exit|· [0-9]+ pass" $log | tail -1 | cut -c1-220; }
one() { # <build> <engine> <witness file> <tag> [args]: one witness module directly (narrowed)
  local b=$1 e=$2 w=$3 tg=$4; shift 4; local log=$L/one-$b-$e-${w%.mjs}-$tg$TAG.log
  stamp "start $w $b $e $*" | tee $log
  ( cd $H && node $w --build $O/builds/$b --wt $W --engine $e --out $J/$b$TAG-$tg "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $w $b $e" >> $log; print -- "$(grep -cE ' PASS ' $log) PASS · $(grep -cE ' FAIL' $log) FAIL"; grep -E " FAIL" $log | cut -c1-240 | head -12; }
xp() { # <dir rel. to engagement/> <probe> <build> <engine> [args]: another seat's probe (or mine), unedited where it lives
  local d=$1 n=$2 b=$3 e=$4; shift 4; local log=$L/xp-$n-$b-$e$TAG.log
  stamp "start $d/$n $b $e $*" | tee $log
  ( cd $EN/$d && node $n.mjs --build $O/builds/$b --engine $e "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $n $b $e" >> $log; print -- "$(grep -cE '^\s+PASS| PASS ' $log) PASS · $(grep -cE '^\s+FAIL| FAIL' $log) FAIL"; grep -E "FAIL" $log | cut -c1-240 | head -12; }
cap() { # <build> <engine>: the owner-glance set
  local b=$1 e=$2; shift 2; local log=$L/cap-$b-$e$TAG.log
  stamp "start capture $b $e $*" | tee $log
  ( cd $H && node capture.mjs --build $O/builds/$b --label e6-$b --engine $e --frames $E6/glance/frames --sheets $E6/glance "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end capture $b $e" >> $log; grep -E "ladder|verdict|FAIL" $log | cut -c1-220 | tail -8; }
if [[ ${1:-} == phase ]]; then while read -r line; do [[ -z $line || $line == \#* ]] && continue; stamp "phase line: $line"; eval "$line"; done < $2; else "$@"; fi
