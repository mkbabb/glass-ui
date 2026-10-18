#!/bin/zsh
# C-E3 (D5 pass 3, fresh critic of route E). The critic's own worktree: HEAD + P-E3-veil.patch (noveil = the one
# KEYBOARD_VEIL line). Every build and browser run through the machine guard; the harness's D5 lock serializes every
# witness and probe machine-wide; WebKit stages run only from wk-ce3.sh inside ONE `guarded --exclusive webkit`.
#   zsh run-ce3.sh <stage…>
#   builds | bat-<label>-<engine>[-<E-x,E-y>] | probe-<label>-<engine>[-shots] | ce3-<label>-<engine> | cap-<label>-<engine> | unit
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/C-E3
E3=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/E3
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/C-E3/wt
O=$WT/.ce3-out
G=~/.claude/guard/guarded
ST=src/composables/motion/engage/stage.ts
UE=src/composables/motion/engage/useEngage.ts
FV=src/styles/glass/focus-veil.css
mkdir -p $D/logs $D/json $D/shots $D/glance
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
ALL=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11)
veilarm() { sed -i '' "s/^export const KEYBOARD_VEIL = .*;/export const KEYBOARD_VEIL = $1;/" $WT/$ST; grep -n '^export const KEYBOARD_VEIL' $WT/$ST; }
build() { local l=$1; shift
  { stamp "build $l start"; cd $H && $G --timeout 20 -- node build.mjs $WT --label $l --out $O "$@"; print -- "# exit $?"; stamp "build $l end"; } > $D/logs/build-$l.log 2>&1
  print -- "build $l: $(grep -E '^# exit' $D/logs/build-$l.log)"; }
# plant <label> <file> <perl-expr> <must-match-after> [build args]: edit, verify, build, restore byte-identical
plant() { local l=$1 file=$2 expr=$3 want=$4; shift 4
  cp $WT/$file $O/orig.tmp; local sha0=$(shasum < $WT/$file)
  perl -0pi -e "$expr" $WT/$file
  if grep -qF -- "$want" $WT/$file; then print -- "plant $l: applied ($(grep -nF -- "$want" $WT/$file | head -1 | cut -c1-140))"; build $l "$@"; else print -- "plant $l: NOT APPLIED"; fi
  cp $O/orig.tmp $WT/$file; rm $O/orig.tmp
  print -- "plant $l restored: $([[ $(shasum < $WT/$file) == $sha0 ]] && echo identical || echo DIFFERS)"; }
for s in "$@"; do
  case $s in
    builds)
      mkdir -p $O
      veilarm true; build veil; build probe-veil --app $E3/probe/App.vue
      plant p-anchor $ST 's/const anchor = `--engage-footprint-\$\{page\}-\$\{\+\+anchors\}`;/const anchor = "--engage-footprint"; void page; void anchors;/' 'const anchor = "--engage-footprint";'
      plant p-char $UE 's/\} else if \(keys\.has\(k\)\) keyed\.value = true;/} else if (keys.has(k) || k.length === 1) keyed.value = true;/' 'keys.has(k) || k.length === 1'
      plant p-script $UE 's/keyed\.value = !pointed && keysDown\.has\("Tab"\);/keyed.value = !pointed;/' 'keyed.value = !pointed;'
      plant p-tabhand $UE 's/const isHeld = computed\(\(\) => hand\.value \|\| scrubbing\.value\);/const isHeld = computed(() => hand.value || scrubbing.value || keyed.value);/' 'scrubbing.value || keyed.value);'
      plant probe-p-scrubveil $UE 's/\(\) => hand\.value \|\| \(KEYBOARD_VEIL && keyed\.value\),/() => isHeld.value || (KEYBOARD_VEIL \&\& keyed.value),/' '() => isHeld.value || (KEYBOARD_VEIL' --app $E3/probe/App.vue
      veilarm false; build noveil; build probe-noveil --app $E3/probe/App.vue
      plant probe-p-vis $FV 's{opacity: 0;\n        visibility: hidden;}{opacity: 0;\n        visibility: visible; /* ce3 plant */}' 'ce3 plant' --app $E3/probe/App.vue
      veilarm true
      print -- "worktree vs HEAD: $(cd $WT && git diff --shortstat HEAD)" ;;
    builds2)
      # CK-04 plant 2: a modifier alone engages
      plant p-mod $UE 's/\} else if \(keys\.has\(k\)\) keyed\.value = true;/} else if (keys.has(k) || ["Shift", "Meta", "Control", "Alt"].includes(k)) keyed.value = true;/' '["Shift", "Meta", "Control", "Alt"].includes(k)'
      print -- "worktree vs HEAD (builds2): $(cd $WT && git diff --shortstat HEAD)" ;;
    bat-*)
      parts=(${(s:-:)s#bat-}); l=$parts[1]; eng=$parts[2]
      [[ $l == p ]] && { l=$parts[1]-$parts[2]; eng=$parts[3]; }
      rest=${s#bat-$l-$eng}; ids=($ALL); [[ -n $rest ]] && ids=(${(s:,:)${rest#-}})
      for id in $ids; do
        log=$D/logs/$l-$eng-$id.log
        if [[ $eng == chromium ]]; then
          { stamp "start $id $l $eng"; cd $H && $G --timeout 90 -- node run.mjs --build $O/builds/$l --wt $WT --engines $eng --only $id --out $D/json/$l --verbose; print -- "# exit $?"; stamp "end $id $l $eng"; } > $log 2>&1
        else
          { stamp "start $id $l $eng (inside the webkit acquisition)"; cd $H && node run.mjs --build $O/builds/$l --wt $WT --engines $eng --only $id --out $D/json/$l --verbose; print -- "# exit $?"; stamp "end $id $l $eng"; } > $log 2>&1
        fi
        print -- "$s $id: $(grep -E '^E-[0-9]+ +(chromium|webkit) +exit' $log | tail -1 | cut -c1-230)"
      done ;;
    probe-*)
      x=${s#probe-}; shots=""; [[ $x == *-shots ]] && { shots=1; x=${x%-shots}; }
      eng=${x##*-}; l=${x%-$eng}
      log=$D/logs/probe-$l-$eng${shots:+-shots}.log; pre=(); [[ $eng == chromium ]] && pre=($G --timeout 60 --)
      sa=(); [[ -n $shots ]] && sa=(--shots $D/shots/$l)
      lab=${l/p-scrubveil/veil}; lab=${lab/p-vis/noveil}
      { stamp "e3-probe $l $eng start"; cd $E3/probe && $pre node e3-probe.mjs --build $O/builds/probe-$l --engine $eng --label $lab $sa; print -- "# exit $?"; stamp "probe end"; } > $log 2>&1
      print -- "$s: $(grep '^e3-probe' $log | tail -1)" ;;
    ce3-*)
      parts=(${(s:-:)s#ce3-}); l=$parts[1]; eng=$parts[2]
      log=$D/logs/ce3-probe-$l-$eng.log; pre=(); [[ $eng == chromium ]] && pre=($G --timeout 60 --)
      { stamp "ce3-probe $l $eng start"; cd $D/probe && $pre node ce3-probe.mjs --build $O/builds/probe-$l --hbuild $O/builds/$l --engine $eng --label $l; print -- "# exit $?"; stamp "probe end"; } > $log 2>&1
      print -- "$s: $(grep '^ce3-probe' $log | tail -1)" ;;
    cap-*)
      parts=(${(s:-:)s#cap-}); l=$parts[1]; eng=$parts[2]
      log=$D/logs/cap-$l-$eng.log; pre=(); [[ $eng == chromium ]] && pre=($G --timeout 60 --)
      { stamp "capture $l $eng start"; cd $H && $pre node capture.mjs --build $O/builds/$l --label $l --engine $eng --frames $D/glance/frames --sheets $D/glance; print -- "# exit $?"; stamp "capture end"; } > $log 2>&1
      print -- "$s: $(grep -iE 'CAP .*(PASS|FAIL)|verdict|· [0-9]+ pass' $log | tail -1 | cut -c1-200)" ;;
    unit)
      T=tests/composables/motion/engage-stage.test.ts
      ut() { { cd $WT && $G --light --timeout 10 -- npx vitest run $T --maxWorkers=2 2>&1 | grep -E '✓|×|Test Files|Tests ' | tail -40; }; }
      { stamp "unit clean"; ut; } > $D/logs/unit-clean.log 2>&1; print -- "unit clean: $(grep -E 'Tests ' $D/logs/unit-clean.log | tail -1)"
      cp $WT/$UE $O/orig.tmp
      perl -0pi -e 's/const n = Math\.trunc\(dx \/ pitch\);/const n = Math.trunc(dx \/ HOLD_SLOP_PX); void pitch;/' $WT/$UE
      { stamp "unit plant pitch-is-slop $(grep -c 'dx / HOLD_SLOP_PX' $WT/$UE)"; ut; } > $D/logs/unit-plant-pitch.log 2>&1
      cp $O/orig.tmp $WT/$UE
      perl -0pi -e 's/if \(!from \|\| !\(p\.target instanceof Node\) \|\| !from\.contains\(p\.target\)\) return;/if (!from) return;/' $WT/$UE
      { stamp "unit plant arm-on-host $(grep -c 'if (!from) return;' $WT/$UE)"; ut; } > $D/logs/unit-plant-surface.log 2>&1
      cp $O/orig.tmp $WT/$UE; rm $O/orig.tmp
      print -- "unit plant pitch: $(grep -E 'Tests |×' $D/logs/unit-plant-pitch.log | head -3 | tr '\n' ' ' | cut -c1-260)"
      print -- "unit plant surface: $(grep -E 'Tests |×' $D/logs/unit-plant-surface.log | head -3 | tr '\n' ' ' | cut -c1-260)"
      print -- "restored: $(cd $WT && git diff --quiet HEAD -- $UE; git diff HEAD -- $UE | shasum)" ;;
  esac
done
print -- "# run-ce3 $* done $(date '+%F %T')"
