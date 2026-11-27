#!/bin/zsh
# The 11.1.1 third close: queue8's reads with the Mac awake. Coarse-touch whole on the head tree
# (b9b96cb76's archive), WebKit's pair on the red tree and the head tree (res-wk-swr), then
# release.sh's exits gate as exits.sh splits it. Each part is one guarded call, one at a time.
# Before a part, while the lid reads closed (AppleClamshellState Yes), it waits, polling every 60 s.
# After a part, if kern.sleeptime moved since the part began, the part spanned a sleep: its log and
# report are kept as *-<HHMM>-asleep-void.*, not read, and the part runs again. A guarded REFUSED
# ends the queue (exit 3), except one naming a stale zone cache, retried once after two minutes;
# under 6 GB free ends it (exit 4). A WebKit part that waits over 60 minutes for the lock without
# starting is stopped by its PID, recorded, and the queue moves on.
#   zsh queue9.sh <part>...   part: co-<list> | res-<name> (through multi.sh)
#                             | ex-<project>-<n> (the exits gate's part n, 0 to 3, as exits.sh runs it)
set -u
C=${0:A:h:h}; S=$C/scripts; L=$C/suite; X=$C/exits; G=~/.claude/guard/guarded; WT=${C:h:h:h:h}
export ROOT=$WT/.cache/close-full/head/tree
grep_parts=("(form|glass|exit|routes|round|weight|lift|sheet) · " "(reverse|tooltip|expand|leave) · " "standing · " "(site|fade|fold|mark|press|still) · ")
mkdir -p $X $L/resolve
slept() { sysctl -n kern.sleeptime | grep -oE 'sec = [0-9]+' | head -1 | grep -oE '[0-9]+' }
lidshut() { ioreg -r -k AppleClamshellState -d 1 | grep -q '"AppleClamshellState" = Yes' }
note() { echo "$(date '+%F %T') $*" | tee -a $L/queue.txt }
state() { echo "load $(sysctl -n vm.loadavg | tr -d '{}' | xargs), zone $(tail -1 ~/.claude/guard/log/zone.log | grep -oE 'inuse=[0-9]+'), disk $(df -g /System/Volumes/Data | awk 'NR==2{print $4}')G" }
counts() { grep -E '^\s+[0-9]+ (passed|failed|skipped|flaky|did not run|interrupted)' $@ 2>/dev/null | tr -s ' ' | tr '\n' ' ' }
void() { local stamp=$1; shift; for f in $@; do [[ -e $f ]] && mv $f ${f:r}-$stamp-asleep-void.${f:e}; done }
for p in $@; do
  retried=0
  while true; do
    free=$(df -g /System/Volumes/Data | awk 'NR==2{print $4}')
    (( free < 6 )) && { note "STOP: disk ${free}G free at $p"; exit 4; }
    if lidshut; then note "$p: the lid reads closed; waiting"; while lidshut; do sleep 60; done; note "$p: the lid reads open"; fi
    ex=(); [[ $p = *wk* || $p = ex-webkit-* ]] && ex=(--exclusive webkit)
    s0=$(slept); t0=$(date +%s)
    note "$p starts (sleeptime $s0; $(state))"
    if [[ $p = ex-* ]]; then
      tag=${p#ex-}; proj=${tag%-*}; n=${tag##*-}
      glog=$X/$tag.log; files=($X/$tag.log $X/$tag.json); mark='Running [0-9]'
      cd $ROOT/tests-visual
      GLASS_UI_DEMO_OWN=1 GLASS_UI_DEMO_PORT=5352 GLASS_UI_DEMO_URL=http://localhost:5352 PI_REPORT=$X/$tag.json \
        $G $ex --timeout 60 -- npx playwright test -c release-11-1-1.config.ts --project=$proj --workers=1 -g "${grep_parts[$((n+1))]}" > $glog 2>&1 &
    else
      glog=$L/$p.guard.log; mark='multi start'
      case $p in
        res-wk-swr) files=($glog $L/resolve/wk-swr-{red,head}-a.{log,json});;
        *) files=($glog $L/$p.log $L/$p.json);;
      esac
      $G $ex --timeout 90 -- zsh $S/multi.sh $p > $glog 2>&1 &
    fi
    gp=$!; stopped=0
    while kill -0 $gp 2>/dev/null; do
      sleep 30
      if (( ${#ex} )) && ! grep -qE "$mark" $glog && (( $(date +%s) - t0 > 3600 )); then
        kill $gp; stopped=1; note "$p: waited over 60 minutes for the WebKit lock without starting; stopped by PID $gp, moving on"; break
      fi
    done
    wait $gp 2>/dev/null; rc=$?
    s1=$(slept)
    (( stopped )) && break
    if [[ $s1 != $s0 ]]; then
      stamp=$(date +%H%M); void $stamp $files
      note "$p rc=$rc spanned a sleep (sleeptime $s0 -> $s1): kept as *-$stamp-asleep-void, not read; runs again"
      continue
    fi
    ref=$(grep -m1 -E '^\[guarded\] REFUSED' $glog)
    note "$p rc=$rc $(( $(date +%s) - t0 ))s, no sleep; $(state); $(counts $glog ${files[2]})${ref:+ $ref}"
    if [[ -n $ref ]]; then
      if [[ $ref = *stale* ]] && (( ! retried )); then retried=1; note "$p: the refusal names a stale zone cache; retried once after two minutes"; sleep 120; continue; fi
      note "STOP: refused at $p"; exit 3
    fi
    break
  done
done
note "queue9 done: $*"
