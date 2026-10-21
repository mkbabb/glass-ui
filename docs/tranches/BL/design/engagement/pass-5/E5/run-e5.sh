#!/bin/zsh
# D5 pass 5 · P-E5 stages. The caller wraps each call in ~/.claude/guard/guarded (Chromium: one guarded call per
# witness, probe or capture; WebKit: a phase file inside ONE `guarded --exclusive webkit` acquisition, chain-e5.sh).
#   zsh run-e5.sh <fn> <args>   |   zsh run-e5.sh phase <phase-file>
# Arms: noveil-coarse (the candidate), veil-coarse, noveil-every, veil-every: the two constants of
# src/composables/motion/engage/stage.ts (STAGE_VEIL, POINTER_STAGE), set by `arm` in the one worktree.
set -u
E5=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-5/E5
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p5/E5
W=$R/wt
O=$R/out
L=$E5/logs; J=$E5/json
mkdir -p $L $J
TAG=${TAG:-}
stamp() { print -- "## $(date '+%Y-%m-%d %H:%M:%S') load $(sysctl -n vm.loadavg) · $*" }
arm() { # <arm>: write the two constants
  local v=false p=coarse
  [[ $1 == veil-* ]] && v=true; [[ $1 == *-every ]] && p=every
  sed -i '' -E "s/^export const STAGE_VEIL = (true|false);/export const STAGE_VEIL = $v;/; s/^export const POINTER_STAGE: \"every\" \| \"coarse\" = \"(every|coarse)\";/export const POINTER_STAGE: \"every\" | \"coarse\" = \"$p\";/" $W/src/composables/motion/engage/stage.ts
  grep -nE "^export const (STAGE_VEIL|POINTER_STAGE)" $W/src/composables/motion/engage/stage.ts
}
build() { # <arm>: set the arm and bundle the harness app against it
  local log=$L/build-$1$TAG.log; stamp "build $1" | tee $log
  arm $1 >> $log
  node $H/build.mjs $W --label $1 --out $O >> $log 2>&1; print -- "exit $?" >> $log
  arm noveil-coarse >> $log; stamp "end build $1 (worktree back on noveil-coarse)" >> $log; tail -4 $log
}
buildapp() { # <arm> <prefix> <app.vue>: a probe app (another seat's, unedited) bundled against the arm
  local log=$L/build-$2-$1$TAG.log; stamp "build $2-$1 ($3)" | tee $log
  arm $1 >> $log
  node $H/build.mjs $W --label $2-$1 --out $O --app $3 >> $log 2>&1; print -- "exit $?" >> $log
  arm noveil-coarse >> $log; stamp "end build $2-$1" >> $log; tail -3 $log
}
xp() { # <probe dir rel. to engagement/> <probe> <build prefix> <arm> <engine> [args]: a probe run unedited where it lives, with --label
  local d=$1 n=$2 px=$3 b=$4 e=$5; shift 5; local log=$L/xp-$n-$b-$e$TAG.log
  stamp "start $d/$n $b $e $*" | tee $log
  ( cd $E5/../../$d && node $n.mjs --build $O/builds/$px-$b --engine $e --label $b "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $n $b $e" >> $log; grep -E "^(ce4|e4)-probe|P-E4 probe|C-E4" $log | tail -2 | cut -c1-200
}
buildplant() { # <name>: the candidate with one plant applied in the worktree, built, then the source restored byte-identical
  local log=$L/build-plant-$1$TAG.log F=$W/src/composables/motion/engage/stage.ts; stamp "build plant $1" | tee $log
  [[ $1 == activeonly ]] && F=$W/src/components/slider/styles.css
  arm noveil-coarse >> $log; cp $F $R/stage.bak; local s0=$(shasum $F | cut -c1-12)
  case $1 in
    activeonly) perl -0pi -e 's/^\.glass-slider\[data-held\] \.slider-range \{/.glass-slider:active .slider-range { \/\* PLANT activeonly \*\//m' $F ;;
    rafarm) perl -0pi -e 's/    arm\(1\);\n    h\.unwatch = /    \/\/ VARIANT rafarm: the first arm a frame later\n    requestAnimationFrame(() => arm(1));\n    h.unwatch = /' $F ;;
    nowatch) perl -0pi -e 's/    arm\(1\);\n    h\.unwatch = /    \/\/ PLANT nowatch: arm(1);\n    h.unwatch = /' $F ;;
  esac
  grep -n "PLANT" $F >> $log
  node $H/build.mjs $W --label plant-$1 --out $O >> $log 2>&1; print -- "exit $?" >> $log
  cp $R/stage.bak $F; rm $R/stage.bak; print -- "restored $(shasum $F | cut -c1-12) (was $s0)" >> $log; stamp "end build plant $1" >> $log; tail -3 $log
}
own() { # <probe> <arm> <engine>: this seat's own probe under probe/
  local n=$1 b=$2 e=$3; shift 3; local log=$L/own-$n-$b-$e$TAG.log
  stamp "start probe $n $b $e" | tee $log
  ( cd $E5/probe && node $n.mjs --build $O/builds/$b --engine $e "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end probe $n" >> $log; grep -E "PASS|FAIL" $log | cut -c1-300
}
bat() { # <arm> <engine> <witness id> [extra args…]: one witness via run.mjs
  local b=$1 e=$2 id=$3; shift 3; local log=$L/bat-$b-$e-$id$TAG.log
  stamp "start $id $b $e $*" | tee $log
  ( cd $H && node run.mjs --build $O/builds/$b --wt $W --engines $e --only $id --out $J/$b$TAG --verbose "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $id $b $e" >> $log
  grep -E "^E-[0-9]+ +(chromium|webkit) +exit|^$id .*(PASS|FAIL|UNMEASURED) " $log | tail -1 | cut -c1-200
}
one() { # <arm> <engine> <witness-file> <logtag> [args]: one witness module directly (narrowed)
  local b=$1 e=$2 w=$3 tg=$4; shift 4; local log=$L/one-$b-$e-${w%.mjs}-$tg$TAG.log
  stamp "start $w $b $e $*" | tee $log
  ( cd $H && node $w --build $O/builds/$b --wt $W --engine $e --out $J/$b$TAG-$tg "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $w $b $e" >> $log; grep -cE " PASS " $log; grep -E " FAIL " $log | cut -c1-260 | head -20
}
xprobe() { # <dir relative to engagement/> <name> <arm> <engine> <logtag> [args]: another seat's probe, run unedited where it lives
  local d=$1 n=$2 b=$3 e=$4 tg=$5; shift 5; local log=$L/xprobe-$n-$b-$e-$tg$TAG.log
  stamp "start xprobe $d/$n $b $e $*" | tee $log
  ( cd $E5/../../$d && node $n.mjs --build $O/builds/$b --engine $e "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end xprobe $n" >> $log; grep -E "REPORT|PASS|FAIL|UNMEASURED" $log | cut -c1-240 | head -40
}
cap() { # <arm> <engine> [args]: the owner-glance set (both themes, fine and coarse)
  local b=$1 e=$2; shift 2; local log=$L/cap-$b-$e$TAG.log
  stamp "start capture $b $e $*" | tee $log
  ( cd $H && node capture.mjs --build $O/builds/$b --label $b --engine $e --frames $E5/glance/frames --sheets $E5/glance "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end capture $b $e" >> $log; grep -E "ladder|verdict|FAIL" $log | cut -c1-220 | tail -12
}
if [[ ${1:-} == phase ]]; then while read -r line; do [[ -z $line || $line == \#* ]] && continue; stamp "phase line: $line"; eval "$line"; done < $2; else "$@"; fi
