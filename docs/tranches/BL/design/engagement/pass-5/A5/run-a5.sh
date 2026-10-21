#!/bin/zsh
# D5 pass 5 · P-A5 stages. The caller wraps each call in ~/.claude/guard/guarded (Chromium: one guarded call per
# witness or probe; WebKit: a phase file inside ONE `guarded --exclusive webkit` acquisition, chain.sh).
#   zsh run-a5.sh <fn> <args>   |   zsh run-a5.sh phase <phase-file>
set -u
A5=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-5/A5
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p5/A5
O=$R/out
L=$A5/logs; J=$A5/json
mkdir -p $L $J
TAG=${TAG:-}
stamp() { print -- "## $(date '+%Y-%m-%d %H:%M:%S') load $(sysctl -n vm.loadavg) · $*" }
wtof() { case $1 in geom*) print $R/wt-geom ;; *) print $R/wt ;; esac }
build() { # <label>
  local log=$L/build-$1$TAG.log; stamp "build $1" | tee $log
  node $H/build.mjs $(wtof $1) --label $1 --out $O >> $log 2>&1; print -- "exit $?" >> $log; stamp "end build $1" >> $log; tail -3 $log
}
bat() { # <label> <engine> <witness id> [extra args…]: one witness via run.mjs
  local b=$1 e=$2 id=$3; shift 3; local log=$L/bat-$b-$e-$id$TAG.log
  stamp "start $id $b $e $*" | tee $log
  ( cd $H && node run.mjs --build $O/builds/$b --wt $(wtof $b) --engines $e --only $id --out $J/$b$TAG --verbose "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $id $b $e" >> $log
  grep -E "^E-[0-9]+ +(chromium|webkit) +exit|^$id .*(PASS|FAIL|UNMEASURED) " $log | tail -1 | cut -c1-200
}
one() { # <label> <engine> <witness-file> <logtag> [args]: one witness module directly (narrowed)
  local b=$1 e=$2 w=$3 tg=$4; shift 4; local log=$L/one-$b-$e-${w%.mjs}-$tg$TAG.log
  stamp "start $w $b $e $*" | tee $log
  ( cd $H && node $w --build $O/builds/$b --wt $(wtof $b) --engine $e --out $J/$b$TAG-$tg "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end $w $b $e" >> $log; grep -cE " PASS " $log; grep -E " FAIL " $log | cut -c1-220 | head -20
}
probe() { # <name> <label> <engine> <logtag> [args]
  local n=$1 b=$2 e=$3 tg=$4; shift 4; local log=$L/probe-$n-$b-$e-$tg$TAG.log
  stamp "start probe $n $b $e $*" | tee $log
  ( cd $A5/probe && node $n.mjs --build $O/builds/$b --engine $e "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end probe $n" >> $log; grep -E "REPORT|PASS|FAIL" $log | cut -c1-260 | head -40
}
xprobe() { # <dir relative to engagement/> <name> <label> <engine> <logtag> [args]: another seat's probe, run unedited from where it lives
  local d=$1 n=$2 b=$3 e=$4 tg=$5; shift 5; local log=$L/xprobe-$n-$b-$e-$tg$TAG.log
  stamp "start xprobe $d/$n $b $e $*" | tee $log
  ( cd $A5/../../$d && node $n.mjs --build $O/builds/$b --engine $e "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end xprobe $n" >> $log; grep -E "REPORT|PASS|FAIL|UNMEASURED" $log | cut -c1-240 | head -30
}
cap() { # <label> <engine> [args]: the owner-glance set (both themes, fine and coarse)
  local b=$1 e=$2; shift 2; local log=$L/cap-$b-$e$TAG.log
  stamp "start capture $b $e $*" | tee $log
  ( cd $H && node capture.mjs --build $O/builds/$b --label $b --engine $e --frames $A5/glance/frames --sheets $A5/glance "$@" ) >> $log 2>&1
  print -- "exit $?" >> $log; stamp "end capture $b $e" >> $log; grep -E "ladder|verdict|FAIL" $log | cut -c1-220 | tail -12
}
if [[ ${1:-} == phase ]]; then while read -r line; do [[ -z $line || $line == \#* ]] && continue; stamp "phase line: $line"; eval "$line"; done < $2; else "$@"; fi
