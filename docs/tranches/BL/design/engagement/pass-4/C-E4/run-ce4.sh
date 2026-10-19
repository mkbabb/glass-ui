#!/bin/zsh
# C-E4 (D5 pass 4, the fresh critic of route E). The critic's own worktree: HEAD + P-E4-noveil-coarse.patch; the other
# three arms are the two constants in stage.ts (the four patches differ in nothing else: `diff` of the patches, C-E4.md §1).
# Every build and browser run through the machine guard; the harness's D5 lock serialises every witness and probe;
# WebKit stages run only from `wk-inner`, called inside ONE `guarded --exclusive webkit` admission. Strictly sequential.
#   zsh run-ce4.sh <stage…>
#   builds | plants | chromium | wk-inner | reread-<engine> | unit | greps
set -u
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4/C-E4
E4=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-4/E4
A3=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/A3
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/C-E4/wt
O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/C-E4/out
ST=src/composables/motion/engage/stage.ts
UE=src/composables/motion/engage/useEngage.ts
G=~/.claude/guard/guarded
TAG=${TAG:-}
mkdir -p $D/logs $D/json $D/glance/frames $D/shots $O
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
ALL=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11 E-12)
STAGE=(E-1 E-3 E-4 E-7 E-8 E-9 E-10 E-11 E-12)
ARMDEP=(E-3 E-4 E-10 E-11 E-12)
consts() { grep -E '^export const (KEYBOARD_VEIL|POINTER_STAGE)' $WT/$ST | tr '\n' ' '; }
arm() { local kv=true; [[ ${1%%-*} == noveil ]] && kv=false; local ps=${1#*-}
  sed -i '' "s/^export const KEYBOARD_VEIL = .*;/export const KEYBOARD_VEIL = $kv;/; s/^export const POINTER_STAGE: \"every\" | \"coarse\" = .*;/export const POINTER_STAGE: \"every\" | \"coarse\" = \"$ps\";/" $WT/$ST; }
build() { local l=$1; shift
  { stamp "build $l start · $(consts)"; cd $H && $G --timeout 20 -- node build.mjs $WT --label $l --out $O "$@"; print -- "# exit $?"; stamp "build $l end"; } > $D/logs/build-$l.log 2>&1
  print -- "build $l: $(grep -E '^# exit' $D/logs/build-$l.log) · $(grep -o 'scene app [A-Za-z ]*[0-9a-f]\{12\}' $D/logs/build-$l.log | tail -1) · $(consts)"; }
# plant <label> <file> <perl-expr> <must-match-after> [build args]: edit, verify, build, restore byte-identical
plant() { local l=$1 file=$2 expr=$3 want=$4; shift 4
  cp $WT/$file $O/orig.tmp; local sha0=$(shasum < $WT/$file)
  perl -0pi -e "$expr" $WT/$file
  if grep -qF -- "$want" $WT/$file; then print -- "plant $l: applied ($(grep -nF -- "$want" $WT/$file | head -1 | cut -c1-140))"; build $l "$@"; else print -- "plant $l: NOT APPLIED"; fi
  cp $O/orig.tmp $WT/$file; rm $O/orig.tmp
  print -- "plant $l restored: $([[ $(shasum < $WT/$file) == $sha0 ]] && echo identical || echo DIFFERS)"; }
GW=""
bat() { # <label> <engine> <ids…>
  local l=$1 eng=$2; shift 2
  for id in "$@"; do
    local log=$D/logs/$l${TAG}-$eng-$id.log
    { stamp "start $id $l $eng"; cd $H && ${=GW} node run.mjs --build $O/builds/$l --wt $WT --engines $eng --only $id --out $D/json/$l${TAG} --verbose; print -- "# exit $?"; stamp "end $id $l $eng"; } > $log 2>&1
    print -- "bat $l${TAG} $eng $id: $(grep -E '^E-[0-9]+ +(chromium|webkit) +exit' $log | tail -1 | cut -c1-200)"
  done
}
e4probe() { # <build label> <arm label> <engine>
  local b=$1 l=$2 eng=$3; local log=$D/logs/e4probe-$b${TAG}-$eng.log
  { stamp "e4-probe $b ($l) $eng start"; cd $E4/probe && ${=GW} node e4-probe.mjs --build $O/builds/$b --engine $eng --label $l; print -- "# exit $?"; stamp "probe end"; } > $log 2>&1
  print -- "e4-probe $b${TAG} $eng: $(grep '^e4-probe' $log | tail -1)"
}
ce4probe() { # <label> <engine>
  local l=$1 eng=$2; local log=$D/logs/ce4probe-$l${TAG}-$eng.log
  { stamp "ce4-probe $l $eng start"; cd $D/probe && ${=GW} node ce4-probe.mjs --build $O/builds/ce4-$l --engine $eng --label $l; print -- "# exit $?"; stamp "probe end"; } > $log 2>&1
  print -- "ce4-probe $l${TAG} $eng: $(grep '^ce4-probe' $log | tail -1)"
}
a3probe() { # <label> <engine>
  local l=$1 eng=$2; local log=$D/logs/a3probe-$l-$eng.log
  { stamp "a3-probe ck13,ck21 $l $eng start"; cd $A3/probe && ${=GW} node a3-probe.mjs --build $O/builds/$l --engine $eng --only ck13,ck21 --label $l; print -- "# exit $?"; stamp "probe end"; } > $log 2>&1
  print -- "a3-probe $l $eng: $(grep -iE '^a3-probe|pass, .* fail' $log | tail -1 | cut -c1-200)"
}
cap() { # <label> <engine>
  local l=$1 eng=$2; local log=$D/logs/cap-$l-$eng.log
  { stamp "capture $l $eng start"; cd $H && ${=GW} node capture.mjs --build $O/builds/$l --label $l --frames $D/glance/frames --sheets $D/glance --engine $eng; print -- "# exit $?"; stamp "capture end"; } > $log 2>&1
  print -- "cap $l $eng: $(grep -E '^CAP .*(PASS|FAIL) ·' $log | tail -1 | cut -c1-200)"
}
battery() { # <engine>: the scoring reads, in order
  local eng=$1
  bat noveil-coarse $eng $ALL
  bat veil-coarse $eng $STAGE
  bat veil-every $eng $ARMDEP
  bat noveil-every $eng $ARMDEP
  # the plants each CK row's pass rule names, on the real build (CK-04, CK-20, CK-22)
  bat p-anchor $eng E-10
  for p in p-char p-script p-tabhand p-mod; do bat $p $eng E-3; done
  for p in pl-anchorlost pl-wheelchain; do bat $p $eng E-12; done
  for l in noveil-coarse veil-coarse veil-every noveil-every; do e4probe probe-$l $l $eng; done
  e4probe probe-pl-arm noveil-coarse $eng
  for l in noveil-coarse veil-coarse veil-every noveil-every; do ce4probe $l $eng; done
  a3probe noveil-coarse $eng
  cap noveil-coarse $eng; cap veil-coarse $eng
}
for s in "$@"; do
  case $s in
    builds)
      for l in ${=ARMS:-veil-coarse veil-every noveil-every noveil-coarse}; do
        arm $l; [[ -n ${CE4ONLY:-} ]] || { build $l; build probe-$l --app $E4/probe/App.vue; }; build ce4-$l --app $D/probe/ce4-App.vue
      done
      print -- "default arm restored: $(consts)" ;;
    plants)
      # on the default build (noveil-coarse). CK-20: a shared anchor (C-E3's p-anchor). CK-04: the four its rule names.
      # CK-22: the two P-E4 cures removed (the write-back; the wheel listener). Q-3's arm ignored (a fine hold promotes).
      plant p-anchor $ST 's/const anchor = `--engage-footprint-\$\{page\}-\$\{\+\+anchors\}`;/const anchor = "--engage-footprint"; void page; void anchors;/' 'const anchor = "--engage-footprint";'
      plant p-char $UE 's/\} else if \(keys\.has\(k\)\) keyed\.value = true;/} else if (keys.has(k) || k.length === 1) keyed.value = true;/' 'keys.has(k) || k.length === 1'
      plant p-script $UE 's/keyed\.value = !pointed && keysDown\.has\("Tab"\);/keyed.value = !pointed;/' 'keyed.value = !pointed;'
      plant p-tabhand $UE 's/const isHeld = computed\(\(\) => hand\.value \|\| scrubbing\.value\);/const isHeld = computed(() => hand.value || scrubbing.value || keyed.value);/' 'scrubbing.value || keyed.value);'
      plant p-mod $UE 's/\} else if \(keys\.has\(k\)\) keyed\.value = true;/} else if (keys.has(k) || ["Shift", "Meta", "Control", "Alt"].includes(k)) keyed.value = true;/' '["Shift", "Meta", "Control", "Alt"].includes(k)'
      plant pl-anchorlost $ST 's/    if \(h\.own\[0\]\) host\.style\.setProperty\("position-anchor", h\.own\[0\], h\.own\[1\]\);/    if (false) host.style.setProperty("position-anchor", h.own[0], h.own[1]);/' 'if (false) host.style.setProperty("position-anchor"'
      plant pl-wheelchain $ST 's/    host\.addEventListener\("wheel", onWheel, \{ passive: false \}\);/    void onWheel; \/\/ ce4 plant/' 'void onWheel; // ce4 plant'
      plant probe-pl-arm $UE 's/POINTER_STAGE === "every" \|\|/true ||/' 'true ||' --app $E4/probe/App.vue
      print -- "worktree vs HEAD after plants: $(cd $WT && git diff --shortstat HEAD) · $(consts)" ;;
    chromium) GW="$G --timeout 90 --"; battery chromium ;;
    wk-inner)
      GW=""; print -- "admitted $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission.log
      battery webkit
      print -- "released $(date '+%F %T') load $(sysctl -n vm.loadavg)" | tee -a $D/logs/wk-admission.log ;;
    reread-chromium)
      # CK-05's bimodal slider carry (P-E4 §0 item 6): two more E-4 reads per arm
      GW="$G --timeout 90 --"
      for r in r2 r3; do for l in noveil-coarse veil-coarse veil-every noveil-every; do TAG=-$r bat $l chromium E-4; done; done ;;
    unit)
      T=tests/composables/motion/engage-stage.test.ts
      { cd $WT && stamp "unit engage-stage + focus-veil + slider · $(consts)"; $G --light --timeout 15 -- npx vitest run $T tests/composables/motion/focus-veil.test.ts --maxWorkers=2 2>&1 | grep -E '×|Test Files|Tests ' | tail -20; stamp "typecheck"; $G --light --timeout 20 -- npm run typecheck 2>&1 | tail -3; print -- "# typecheck exit $?"; } > $D/logs/unit.log 2>&1
      print -- "unit: $(grep -E 'Tests |typecheck exit' $D/logs/unit.log | tr '\n' ' ')" ;;
    greps)
      bash $E4/ck22-greps.sh > $D/logs/ck22-greps.txt 2>&1; print -- "greps: $(wc -l < $D/logs/ck22-greps.txt) lines" ;;
  esac
done
print -- "# run-ce4 $* done $(date '+%F %T')"
