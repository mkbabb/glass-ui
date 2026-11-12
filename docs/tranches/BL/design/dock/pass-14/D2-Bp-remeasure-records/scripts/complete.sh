#!/bin/bash
# complete.sh (D2 pass 14, RE-MEASURE seat of D2-B′, the COMPLETION after the 2026-11-09 09:16 zone refusal; REGISTRY
# §P13-7.3). Runs only what the first entry owed: (2) the C·d battery slot re-read (its first reading's cells ran to 31.83),
# (3) the cost A/B, bp13 → bp12 → fv5 alternating, 3 rounds, each started at load <= 11 (the resume clause; tighter than
# §7.3's 15). Before measuring it re-proves the same build on a fresh worktree at 392ff1e3c: patch hashes, git apply --check,
# fv5 / bp12 / bp13 builds, the scene chunks (bp13 21,473 B, bp12 21,483 B) and the boot graph (503,777 B) from the demo
# build. F7 13/13 and PR 6/6 are of record from the first entry (R/F7, R/PR) and are not re-run. fv3 is not rebuilt (L1 is
# of record). One heavy run at a time (seat.lock). Every build and browser run guarded, browser runs never --light. A guard
# refusal stops the chain (exit 5). Disk read before each build and battery (< 15 GB: stop, exit 3). Harness H8 checked at
# the start and the end. Records under R/resume/ and R/reread/; the cost JSON under R/cost/ (the 09:16 refusals moved to
# R/cost/refused-0916/).
set -u
G=/Users/mkbabb/Programming/glass-ui; B=$G/.claude/worktrees/bl/D2/p14/Bp-remeasure; WT=$B/wt; OUT=$B/out
D=$G/docs/tranches/BL/design/dock; H=$D/harness; AD=$D/pass-3/adapter-floor-v2.mjs
REC=$D/pass-14/D2-Bp-remeasure-records; RS=$REC/resume; RR=$REC/reread; GD=$HOME/.claude/guard/guarded
FV5=$D/pass-6/floor-v5.patch; P12=$D/pass-12/D2-Bp-p12.patch; P13=$D/pass-13/D2-Bp-p13.patch; FV3=$D/pass-4/floor-v3.patch
mkdir -p $RS $RR/battery $RR/digest $REC/cost
L() { echo "$(date '+%F %T') resume: $* · $(uptime | sed 's/.*load/load/')" >> $REC/chain.log; }
load1() { sysctl -n vm.loadavg | awk '{print $2}'; }
diskok() { local a; a=$(df -g /System/Volumes/Data | tail -1 | awk '{print $4}'); L "disk free ${a} GB before $1"; if [ "$a" -lt 15 ]; then L "DISK-STOP: ${a} GB free < 15 before $1"; exit 3; fi; }
waitload() { local t0=$(date +%s); while [ "$(echo "$(load1) > $1" | bc)" = 1 ]; do sleep 20; done; L "start-gate $2 at load $(load1) (bound $1, waited $(( $(date +%s) - t0 )) s)"; }
refused() { grep -q 'REFUSED' "$1" && { L "GUARD REFUSED at $2: $(grep -m1 REFUSED "$1")"; L "STOP (guard refusal)"; exit 5; }; return 0; }
mkdir -p $B; LK=$B/seat.lock; until mkdir $LK 2>/dev/null; do sleep 5; done; trap 'rmdir $LK 2>/dev/null' EXIT
L "start pid $$ (steps: ${STEPS:-prove bootproof reread cost digest hend})"
has() { case " ${STEPS:-prove bootproof reread cost digest hend} " in *" $1 "*) return 0;; esac; return 1; }

if has prove; then
  (cd $D && date && shasum -a 256 -c pass-8/H8-records/harness.sha256 && shasum -a 256 pass-8/H8-records/harness.sha256) > $RS/harness-check-start.txt 2>&1
  L "harness start: $(grep -c ': OK$' $RS/harness-check-start.txt) OK"
  A=$RS/apply.log; { date; shasum -a 256 $FV3 $FV5 $P12 $P13; } > $A
  if [ ! -d $WT ]; then git -C $G worktree add --detach $WT 392ff1e3c >> $A 2>&1 || { L "worktree add FAILED"; exit 1; }; fi
  [ -e $WT/node_modules ] || ln -s $G/node_modules $WT/node_modules
  [ -d $G/tests-visual/node_modules ] && [ ! -e $WT/tests-visual/node_modules ] && ln -s $G/tests-visual/node_modules $WT/tests-visual/node_modules
  echo "HEAD $(git -C $WT rev-parse HEAD); dirty $(git -C $WT status --porcelain --untracked-files=no | wc -l | tr -d ' ')" >> $A
  ap() { (cd $WT && git apply --check "$1" && git apply "$1") >> $A 2>&1 && echo "applied $(basename $1)" >> $A || { echo "APPLY FAILED $1" >> $A; L "APPLY FAILED $1"; exit 4; }; }
  rv() { (cd $WT && git apply -R "$1") >> $A 2>&1 && echo "reversed $(basename $1)" >> $A || { echo "REVERSE FAILED $1" >> $A; exit 4; }; }
  build() { diskok "build $1"; (uptime; $GD --timeout 30 -- node $H/build.mjs $WT --out $OUT --label "$1"; echo "build exit $?"; uptime) > $RS/build-$1.log 2>&1
    refused $RS/build-$1.log "build $1"; echo "built $1: $(grep 'build exit' $RS/build-$1.log) $(date '+%T')" >> $A; L "built $1: $(grep 'build exit' $RS/build-$1.log)"; }
  ap $FV5; build fv5
  ap $P12; build bp12
  rv $P12; ap $P13
  echo "numstat p13 over base: $(cd $WT && git diff --numstat | wc -l | tr -d ' ') paths" >> $A
  build bp13
  for b in bp12 bp13; do echo "scene chunk $b: $(ls -l $OUT/builds/$b/demo/assets/useDockScene-*.js 2>/dev/null | awk '{print $5, $9}')" >> $A; done
  # NOT the instrument of record: build.mjs's demo output read the bootsize way (the first try at 11:44 read 525,445 B
  # here and stopped the chain on it; kept as a note, see the `bootproof` step for the record's instrument)
  python3 -I - "$OUT/builds/bp13/demo" > $RS/boot-graph-builddemo.txt 2>&1 <<'PY'
import re,sys,os
t=sys.argv[1]; h=open(t+'/index.html').read()
fs=sorted(set(re.findall(r'<link[^>]*rel="modulepreload"[^>]*href="([^"]+)"',h)+re.findall(r'<script[^>]*type="module"[^>]*src="([^"]+)"',h)+re.findall(r'href="([^"]+\.js)"',h)))
p=lambda f: os.path.join(t, f.lstrip('./').lstrip('/')) if not os.path.exists(t+f) else t+f
n=sum(os.path.getsize(p(f)) for f in fs); print(f"{len(fs)} files / {n} B; ceiling 503808; margin {503808-n} B"); print([(f,os.path.getsize(p(f))) for f in fs if 'useDockScene' in f])
PY
  echo "BUILDS-DONE $(date)" >> $A
fi

if has bootproof; then
  # the boot graph of record: F7 builds dist-demo in the bp13 tree, then pass-10 bootsize.py reads it (as the first entry
  # and pass 13). F7's own verdict is recorded beside (13/13 of record from the first entry)
  A=$RS/apply.log; diskok F7; waitload 20 F7; mkdir -p $RS/F7
  (uptime; $GD --timeout 60 -- node $H/f7.mjs $WT --out $OUT/f7; echo "exit $?"; uptime) > $RS/F7/F7.log 2>&1
  refused $RS/F7/F7.log F7
  F=$(find $OUT/f7 -name F7.json | head -1); [ -n "$F" ] && cp $F $RS/F7/F7.json
  python3 -I $D/pass-10/D2-Bp-proto-records/scripts/bootsize.py $WT > $RS/boot-graph.txt 2>&1
  L "F7 $(grep '^exit' $RS/F7/F7.log); boot graph: $(head -1 $RS/boot-graph.txt)"
  c13=$(grep 'scene chunk bp13' $A | awk '{print $4}'); c12=$(grep 'scene chunk bp12' $A | awk '{print $4}'); bg=$(head -1 $RS/boot-graph.txt)
  ok=1; [ "$c13" = 21473 ] || ok=0; [ "$c12" = 21483 ] || ok=0; echo "$bg" | grep -q ' 503777 B' || ok=0
  grep -q 'bb7cb08da92677aa6e4e2c753ce9f901b17f4ddb2051d2f4162ef43e97648121' $A || ok=0
  grep -q '5318a3dcefdb9ca86337b780ff35784a82291f9108953098b950905e8696cff7' $A || ok=0
  grep -q 'cba6bdc249bedaf59bae78ac75e76bc1e2b917ce4040aeb726053ddab77667fe' $A || ok=0
  grep -c 'build exit 0' $A | grep -qx 3 || ok=0
  f7=$(python3 -c "import json,sys; c=json.load(open(sys.argv[1]))['cells']; print('%d/%d' % (sum(1 for x in c if x.get('pass')), len(c)))" $RS/F7/F7.json 2>/dev/null); [ "$f7" = 13/13 ] || ok=0
  { echo "scene chunk bp13 $c13 (want 21473); bp12 $c12 (want 21483); boot graph: $bg (want 503777 B); F7 $f7 (want 13/13)"; [ $ok = 1 ] && echo SAME || echo DIFFERS; } > $RS/same.txt
  L "same build: $(tail -1 $RS/same.txt) ($(head -1 $RS/same.txt))"
  [ $ok = 1 ] || { L "STOP: the build differs; the pass becomes a build pass"; exit 4; }
fi

if has reread; then
  diskok "C·d re-read"; waitload 20 "bp13 chromium dark RE-READ"
  L "start bp13 chromium dark RE-READ (first read's cells to 31.83)"
  BUILD=bp13 ENG=chromium REC=$RR/battery THEME=dark TMIN=90 WT=$WT bash $H/battery.sh $OUT theme > $RR/chain-bp13-chromium.log 2>&1
  x=$?; for f in $RR/battery/*.log; do refused $f "C·d re-read ($(basename $f))"; done
  m=$(cat $RR/battery/bp13-dark*-chromium*.log 2>/dev/null | grep -o 'load averages: [0-9.]*' | awk '{print $3}' | sort -n | tail -1)
  L "end bp13 chromium dark RE-READ exit $x; cells max load $m"
  (cd $OUT/chromium/bp13 && find . -name 'strip-*.png' | while read -r f; do n=$(echo "$f" | sed 's#^\./##; s#/runs/FM-[^/]*/#_#; s#/#_#g'); mkdir -p $REC/filmstrips/chromium-dark-reread; cp "$f" "$REC/filmstrips/chromium-dark-reread/$n"; done)
fi

if has cost; then
  if ls $REC/cost/cost-*-r1.log >/dev/null 2>&1 && grep -q REFUSED $REC/cost/cost-bp13-chromium-r1.log 2>/dev/null; then mkdir -p $REC/cost/refused-0916; mv $REC/cost/cost-*.log $REC/cost/refused-0916/; fi
  L "start cost"
  for k in 1 2 3; do for b in bp13 bp12 fv5; do
    waitload 11 "cost $b r$k"
    (uptime; $GD --cpu-cores 0 --timeout 30 -- node $D/pass-2/D2-Bp-probes.mjs --build $OUT/builds/$b --adapter $AD --arm pcost,plead --engine chromium --out $REC/cost/cost-$b-chromium-r$k.json; echo "exit $?"; uptime) > $REC/cost/cost-$b-chromium-r$k.log 2>&1
    refused $REC/cost/cost-$b-chromium-r$k.log "cost $b r$k"
    L "end cost $b r$k: $(grep '^exit' $REC/cost/cost-$b-chromium-r$k.log)"
  done; done
  L "end cost"
fi

if has digest; then
  L "start digest (re-read alone, and the four columns with C·d's re-read)"
  C=$B/combo/battery/json; rm -rf $B/combo; mkdir -p $C/bp13-chromium
  ln -s $REC/battery/json/bp13-webkit $C/bp13-webkit
  for s in main rest; do ln -s $REC/battery/json/bp13-chromium/$s $C/bp13-chromium/$s; done
  for s in dark darkrest; do ln -s $RR/battery/json/bp13-chromium/$s $C/bp13-chromium/$s; done
  for r in "" "--ruled"; do
    tg=p14rm-cdre${r:+-ruled}
    (uptime; $GD --light --timeout 10 -- node $H/cells.mjs --build bp13=$RR --f7 bp13=$REC/F7/F7.json --pr bp13=$REC/PR/PR.json --out $RR/digest --tag $tg $r; echo "exit $?") > $RR/digest/cells-$tg.log 2>&1
    tg=p14rm-4col-cdre${r:+-ruled}
    (uptime; $GD --light --timeout 10 -- node $H/cells.mjs --build bp13=$B/combo --f7 bp13=$REC/F7/F7.json --pr bp13=$REC/PR/PR.json --out $RR/digest --tag $tg $r; echo "exit $?") > $RR/digest/cells-$tg.log 2>&1
  done
  L "end digest"
fi

if has hend; then
  (cd $D && date && shasum -a 256 -c pass-8/H8-records/harness.sha256; shasum -a 256 pass-13/D2-Bp-p13.patch pass-12/D2-Bp-p12.patch pass-6/floor-v5.patch pass-4/floor-v3.patch; uptime) > $RS/harness-check-end.txt 2>&1
  L "harness end: $(grep -c ': OK$' $RS/harness-check-end.txt) OK"
fi
L "COMPLETE-DONE"
