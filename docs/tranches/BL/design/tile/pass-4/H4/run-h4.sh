#!/bin/zsh
# H4 seat driver (D4 pass 4). One stage per call; every log's first and last line carry the wall clock and the load.
# Every build, unit run and browser run goes through the machine guard; every run that may start Playwright WebKit
# also holds the machine-wide WebKit lock (guarded --exclusive webkit). Runs are serial: one heavy run at a time.
#   run-h4.sh build-head | unit-head | build-f2 | unit-f2 | selftest <witness> <chromium|webkit|both> | baseline <head|f2>
# Worktree and bulky outputs live in scratch ($W); the logs that H4.md cites live beside this file (logs/).
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p4/h4
WT=$W/wt; O=$W/out4; B=$O/builds
HN=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness
P3=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3
L=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-4/H4/logs
G=~/.claude/guard/guarded
mkdir -p $L $O
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
log() { F=$L/$1.log; shift; stamp > $F; "$@" >> $F 2>&1; local rc=$?; echo "exit $rc · $(stamp)" >> $F; return $rc; }
# glog <name> [guard opts] -- <cmd>: the heavy queue first; if the guard has not admitted the run within 30 min (the
# machine law), the waiting guard is stopped and the run goes through --light --rss-gb 8, which the log says.
glog() {
  local name=$1; shift; local gopts=(); while [[ $1 != -- ]]; do gopts+=($1); shift; done; shift
  F=$L/$name.log; stamp > $F
  if [[ -f $L/HELD ]]; then # the heavy queue already held this seat 30 min: stay on the light path (machine law)
    echo "light path (the heavy queue held an earlier run 30 min, $(head -1 $L/HELD)) · $(stamp)" >> $F
    $G --light --rss-gb 8 $gopts -- zsh -c 'echo "admitted (light, rss 8 GB) · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec "$@"' _ "$@" >> $F 2>&1
    local rc0=$?; echo "exit $rc0 · $(stamp)" >> $F; return $rc0
  fi
  $G $gopts -- zsh -c 'echo "admitted (heavy queue) · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec "$@"' _ "$@" >> $F 2>&1 &
  local gp=$! t=0
  while kill -0 $gp 2>/dev/null && ! grep -q '^admitted' $F; do sleep 10; t=$((t+10)); [[ $t -ge 1800 ]] && break; done
  if ! grep -q '^admitted' $F && kill -0 $gp 2>/dev/null; then
    kill $gp; wait $gp 2>/dev/null
    echo "held 30 min in the heavy queue: re-launched through --light --rss-gb 8 · $(stamp)" >> $F
    [[ -f $L/HELD ]] || echo "$name at $(stamp)" > $L/HELD
    $G --light --rss-gb 8 $gopts --zsh -c 'echo "admitted (light, rss 8 GB) · $(date "+%F %T") · load $(sysctl -n vm.loadavg)"; exec "$@"' _ "$@" >> $F 2>&1
  else wait $gp; fi
  local rc=$?; echo "exit $rc · $(stamp)" >> $F; return $rc
}

builds() { # $1 = label prefix (head | f2)
  node $HN/libbuild.mjs $WT || return 1
  for f in src src-dev dist dist-dev; do node $HN/build.mjs $WT --label $1-$f --out $O --flavor $f || return 1; done
  for f in src src-dev dist; do node $HN/build.mjs $WT --label $1-atk-$f --out $O --flavor $f --route $HN/attack-route || return 1; done
}
units() { # $1 = label prefix: unit.mjs's own self-test, the canon suite clean, and the canon suite with the item's stadium planted to 12px
  local T=tests/styles/radius-role-canon.test.ts
  node $HN/unit.mjs $WT --selftest --out $O
  node $HN/unit.mjs $WT --label $1-canon-clean --out $O $T
  node $HN/unit.mjs $WT --label $1-canon-plant --out $O --sub "src/components/toggle-group/styles.css|        border-radius: var(--radius-pill);|        border-radius: 12px;" $T
}
SRC_W=(T-1:t1-corner-stops T-2:t2-one-line-stadium T-3:t3-selected-separates T-4:t4-ring-whole T-5:t5-one-of-n-keys T-6:t6-engagement T-7:t7-no-consumer-paint W-A:wa-curvature-content W-B:wb-choice-card W-C:wc-selection-behaviour W-D:wd-declared-cell W-E:we-one-line CANON:canon)
ATK_W=(FACT:fact-split ATTACK:attack CORNER:corner-refusal REPORT:report-h46)
baseline() { # $1 = head | f2, $2 = chromium | webkit. Chromium: the battery minus T-8 through run.mjs (the attack set on
  # the attack build); WebKit: each witness on its own under the WebKit lock, and T-8 (it runs both engines itself).
  # Then the dist cells (T-2, T-5, W-E on dist; the attack set on the attack dist; ATTACK on the attack src-dev).
  local X=$1 e=$2 ex=()
  if [[ $e == chromium ]]; then
    glog base-$X-battery-src-chromium --timeout 240 -- node $HN/run.mjs --build $B/$X-src --attack $B/$X-atk-src --out $O --only T-1,T-2,T-3,T-4,T-5,T-6,T-7,W-A,W-B,W-C,W-D,W-E,CANON,FACT,ATTACK,CORNER,REPORT
  else
    ex=(--exclusive webkit)
    for w in $SRC_W; do glog base-$X-src-${w%%:*}-webkit $ex --timeout 120 -- node $HN/${w#*:}.mjs --build $B/$X-src --out $O --engine webkit; done
    for w in $ATK_W; do glog base-$X-src-${w%%:*}-webkit $ex --timeout 60 -- node $HN/${w#*:}.mjs --build $B/$X-atk-src --out $O --engine webkit; done
    glog base-$X-src-T-8-both $ex --timeout 60 -- node $HN/t8-both-engines.mjs --build $B/$X-src --out $O
  fi
  for w in t2-one-line-stadium t5-one-of-n-keys we-one-line; do glog base-$X-dist-$w-$e $ex --timeout 60 -- node $HN/$w.mjs --build $B/$X-dist --out $O --engine $e; done
  for w in fact-split attack corner-refusal; do glog base-$X-atkdist-$w-$e $ex --timeout 60 -- node $HN/$w.mjs --build $B/$X-atk-dist --out $O --engine $e; done
  glog base-$X-atkdev-attack-$e $ex --timeout 60 -- node $HN/attack.mjs --build $B/$X-atk-src-dev --out $O --engine $e
}

case $1 in
  build-head) log build-head $G --timeout 30 -- zsh -c "$(typeset -f builds); WT=$WT O=$O HN=$HN; builds head" ;;
  unit-head) log unit-head $G --light --timeout 30 -- zsh -c "$(typeset -f units); WT=$WT O=$O HN=$HN; units head" ;;
  build-f2) log build-f2 $G --timeout 30 -- zsh -c "cd $WT && git apply $P3/floor-v2.patch && echo \"floor v2 applied: \$(git status --porcelain -- src | wc -l) src paths, patch sha1 \$(shasum $P3/floor-v2.patch | cut -c1-8)\"; $(typeset -f builds); WT=$WT O=$O HN=$HN; builds f2" ;;
  unit-f2) log unit-f2 $G --light --timeout 30 -- zsh -c "$(typeset -f units); WT=$WT O=$O HN=$HN; units f2" ;;
  selftest) # $2 witness, $3 engine set
    ex=(); [[ $3 != chromium ]] && ex=(--exclusive webkit)
    eng=$3; [[ $3 == both ]] && eng=chromium,webkit
    glog selftest-$2-$3 $ex --timeout ${4:-120} -- node $HN/selftest.mjs --out $O/st --only $2 --engines $eng ;;
  baseline) baseline $2 $3 ;;
  *) echo "usage: see the header"; exit 2 ;;
esac
