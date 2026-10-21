#!/bin/zsh
# C-E5 (D5 pass 5, the fresh critic of the composition A+E). The critic's own worktree: HEAD + P-E5-noveil-coarse.patch
# (= F5'' + P-A5-light + E4 + E5); the other three arms are the two constants in stage.ts (the four patches differ in
# nothing else: `diff` of the patches, C-E5.md §1). The caller wraps each line in ~/.claude/guard/guarded (chain-ce5.sh);
# WebKit lines run inside ONE `guarded --exclusive webkit` acquisition. The harness's D5 lock serialises every witness.
#   zsh run-ce5.sh <fn> <args>   |   zsh run-ce5.sh phase <phase-file>
set -u
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-5/C-E5
EN=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement
H=$EN/harness
R=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p5/C-E5
W=$R/wt; O=$R/out
ST=src/composables/motion/engage/stage.ts
UE=src/composables/motion/engage/useEngage.ts
L=$D/logs; J=$D/json
mkdir -p $L $J $O
TAG=${TAG:-}
stamp() { print -- "## $(date '+%F %T') load $(sysctl -n vm.loadavg) · $*"; }
consts() { grep -E '^export const (STAGE_VEIL|POINTER_STAGE)' $W/$ST | tr '\n' ' '; }
arm() { local v=false p=coarse; [[ $1 == veil-* ]] && v=true; [[ $1 == *-every ]] && p=every
  sed -i '' -E "s/^export const STAGE_VEIL = (true|false);/export const STAGE_VEIL = $v;/; s/^export const POINTER_STAGE: \"every\" \| \"coarse\" = \"(every|coarse)\";/export const POINTER_STAGE: \"every\" | \"coarse\" = \"$p\";/" $W/$ST; }
build() { # <label> [build args]: the harness app (or --app) against the worktree as it stands
  local l=$1; shift; local log=$L/build-$l.log
  { stamp "build $l · $(consts)"; node $H/build.mjs $W --label $l --out $O "$@"; print -- "exit $?"; stamp "end build $l"; } > $log 2>&1
  print -- "build $l: $(grep -E '^exit' $log) · $(grep -o 'scene app [A-Za-z ]*[0-9a-f]\{12\}' $log | tail -1) · $(consts)"; }
builds() { # every arm: the harness app, P-E4's probe app, C-E4's probe app, my probe app
  for b in noveil-coarse veil-coarse noveil-every veil-every; do
    arm $b; build $b; build probe-$b --app $EN/pass-4/E4/probe/App.vue; build ce4-$b --app $EN/pass-4/C-E4/probe/ce4-App.vue; build ce5-$b --app $D/probe/ce5-App.vue
  done; arm noveil-coarse; print -- "worktree back on: $(consts)"; }
# plant <label> <file> <perl-expr> <must-match-after> [build args]: edit, verify, build, restore byte-identical
plant() { local l=$1 file=$2 expr=$3 want=$4; shift 4
  arm noveil-coarse; cp $W/$file $O/orig.tmp; local sha0=$(shasum < $W/$file)
  perl -0pi -e "$expr" $W/$file
  if grep -qF -- "$want" $W/$file; then print -- "plant $l: applied in $file ($(grep -nF -- "$want" $W/$file | head -1 | cut -c1-140))"; [[ -n ${NOBUILD:-} ]] || build $l "$@"; else print -- "plant $l: NOT APPLIED in $file"; fi
  [[ -n ${KEEP:-} ]] && return
  cp $O/orig.tmp $W/$file; rm $O/orig.tmp
  print -- "plant $l restored: $([[ $(shasum < $W/$file) == $sha0 ]] && echo identical || echo DIFFERS)"; }
# a multi-plant build: several plants, each aimed at a different cell, applied together, built once, all restored
multi() { local l=$1; shift; local files=() ; cp -R $W/src $O/src.bak
  for spec in "$@"; do local f=${spec%%|*} rest=${spec#*|}; local e=${rest%%|*} w=${rest#*|}
    perl -0pi -e "$e" $W/$f; if grep -qF -- "$w" $W/$f; then print -- "  $l: applied in $f"; else print -- "  $l: NOT APPLIED in $f ($w)"; fi; done
  build $l
  rm -rf $W/src && mv $O/src.bak $W/src
  print -- "  $l restored: $(cd $W && git diff --shortstat HEAD -- src | tr -d '\n') · $(consts)"; }
bat() { # <build> <engine> <witness id> [extra args…]: one witness via run.mjs
  local b=$1 e=$2 id=$3; shift 3; local log=$L/bat-$b-$e-$id$TAG.log
  { stamp "start $id $b $e $*"; ( cd $H && node run.mjs --build $O/builds/$b --wt ${WT_OVERRIDE:-$W} --engines $e --only $id --out $J/$b$TAG --verbose "$@" ); print -- "exit $?"; stamp "end $id $b $e"; } > $log 2>&1
  print -- "bat $b$TAG $e $id: $(grep -E '^E-[0-9]+ +(chromium|webkit) +exit|^CAP' $log | tail -1 | cut -c1-200)"; }
one() { # <build> <engine> <witness file> <logtag> [args]: a witness module directly (narrowed, or --gpu)
  local b=$1 e=$2 w=$3 tg=$4; shift 4; local log=$L/one-$b-$e-${w%.mjs}-$tg$TAG.log
  { stamp "start $w $b $e $*"; ( cd $H && node $w --build $O/builds/$b --wt ${WT_OVERRIDE:-$W} --engine $e --out $J/$b$TAG-$tg "$@" ); print -- "exit $?"; stamp "end $w $b $e"; } > $log 2>&1
  print -- "one $b $e $w $tg: $(grep -cE ' PASS ' $log) PASS lines · $(grep -cE ' FAIL ' $log) FAIL lines · $(grep -E '^exit' $log)"; }
xp() { # <dir rel. to engagement/> <probe> <build prefix> <arm> <engine> [args]: another seat's probe, unedited where it lives
  local d=$1 n=$2 px=$3 b=$4 e=$5; shift 5; local log=$L/xp-$n-$px-$b-$e$TAG.log
  { stamp "start $d/$n $px-$b $e $*"; ( cd $EN/$d && node $n.mjs --build $O/builds/$px-$b --engine $e --label $b "$@" ); print -- "exit $?"; stamp "end $n $b $e"; } > $log 2>&1
  print -- "xp $n $px-$b $e: $(grep -E '^(ce4|e4|ce5)-probe|^# .*pass|PASS|FAIL' $log | tail -1 | cut -c1-200)"; }
xb() { # <dir rel. to engagement/> <probe> <build> <engine> [args]: a probe on a build by its own name (no --label)
  local d=$1 n=$2 b=$3 e=$4; shift 4; local log=$L/xb-$n-$b-$e$TAG.log
  { stamp "start $d/$n $b $e $*"; ( cd $EN/$d && node $n.mjs --build $O/builds/$b --engine $e "$@" ); print -- "exit $?"; stamp "end $n $b $e"; } > $log 2>&1
  print -- "xb $n $b $e: $(grep -cE 'PASS' $log) PASS · $(grep -cE 'FAIL' $log) FAIL · $(grep -E '^exit' $log)"; }
cap() { # <build> <engine> [args]: the owner-glance set (both themes, fine and coarse)
  local b=$1 e=$2; shift 2; local log=$L/cap-$b-$e$TAG.log
  { stamp "start capture $b $e $*"; ( cd $H && node capture.mjs --build $O/builds/$b --label $b --engine $e --frames $D/glance/frames --sheets $D/glance "$@" ); print -- "exit $?"; stamp "end capture $b $e"; } > $log 2>&1
  print -- "cap $b$TAG $e: $(grep -E '^CAP .*(PASS|FAIL) ·|verdict' $log | tail -1 | cut -c1-200)"; }
p10() { # <engine>: E-7 static arm on a copy of the candidate src with one extra data-press writer (CK-08 plant)
  TAG=-p10 WT_OVERRIDE=$O/p10 bat noveil-coarse $1 E-7; }
gates() { cd $W || return 2
  stamp build; npm run build > $O/b.out 2>&1; print -- "exit build $?"; tail -3 $O/b.out
  stamp typecheck; npm run typecheck > $O/tc.out 2>&1; rc=$?; tail -6 $O/tc.out; print -- "exit typecheck $rc"
  stamp vitest; npx vitest run --maxWorkers=2 > $O/vt.out 2>&1; rc=$?; grep -E "Test Files|Tests |FAIL|×" $O/vt.out | tail -30; print -- "exit vitest $rc"
  stamp end; }
if [[ ${1:-} == phase ]]; then while read -r line; do [[ -z $line || $line == \#* ]] && continue; stamp "phase line: $line"; eval "$line"; done < $2; else "$@"; fi
