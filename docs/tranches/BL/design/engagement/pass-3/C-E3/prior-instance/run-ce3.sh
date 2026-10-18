#!/bin/zsh
# C-E3 (D5 pass 3, fresh critic of route E): the H3 battery, P-E3's probe and C-E3's own probe on the critic's own
# worktree (HEAD + P-E3-veil.patch; noveil = the one KEYBOARD_VEIL line), plus planted builds. Every build and browser
# run through the machine guard; WebKit stages run only from wk-ce3.sh inside ONE `guarded --exclusive webkit`.
#   zsh run-ce3.sh <stage…>
#   stages: builds                (veil is built first by hand; this builds noveil, probe-veil, probe-noveil and the plants)
#           bat-<label>-<engine>[-<E-x,E-y>]   probe-<label>-<engine>   ce3-<label>-<engine>   unit-plants
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/C-E3
E3=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/E3
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p3/C-E3/wt
O=$WT/.ce3-out
G=~/.claude/guard/guarded
ST=src/composables/motion/engage/stage.ts
UE=src/composables/motion/engage/useEngage.ts
mkdir -p $D/logs $D/json $D/shots
stamp() { print -- "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
ALL=(E-1 E-2 E-3 E-4 E-5 E-6 E-7 E-8 E-9 E-10 E-11)
veilarm() { sed -i '' "s/^export const KEYBOARD_VEIL = .*;/export const KEYBOARD_VEIL = $1;/" $WT/$ST; grep -n '^export const KEYBOARD_VEIL' $WT/$ST; }
build() { local l=$1; shift
  { stamp "build $l start"; cd $H && $G --timeout 20 -- node build.mjs $WT --label $l --out $O "$@"; print -- "# exit $?"; stamp "build $l end"; } > $D/logs/build-$l.log 2>&1
  print -- "build $l: $(grep -E '^# exit' $D/logs/build-$l.log)"; }
# plant <label> <file> <perl-expr> <must-match-after> [--app …]: edit, verify, build, restore (verified by git diff against the patch tree copy)
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
      veilarm false; build noveil; build probe-noveil --app $E3/probe/App.vue
      veilarm true; build probe-veil --app $E3/probe/App.vue
      plant p-anchor $ST 's/const anchor = `--engage-footprint-\$\{page\}-\$\{\+\+anchors\}`;/const anchor = "--engage-footprint"; void page; void anchors;/' 'const anchor = "--engage-footprint";'
      plant p-char $UE 's/\} else if \(keys\.has\(k\)\) keyed\.value = true;/} else if (keys.has(k) || k.length === 1) keyed.value = true;/' 'keys.has(k) || k.length === 1'
      plant p-script $UE 's/keyed\.value = !pointed && keysDown\.has\("Tab"\);/keyed.value = !pointed;/' 'keyed.value = !pointed;'
      plant probe-p-scrubveil $UE 's/\(\) => hand\.value \|\| \(KEYBOARD_VEIL && keyed\.value\),/() => isHeld.value || (KEYBOARD_VEIL \&\& keyed.value),/' '() => isHeld.value || (KEYBOARD_VEIL' --app $E3/probe/App.vue
      print -- "worktree src vs patch tree: $(cd $WT && git diff --stat HEAD -- src | tail -1)" ;;
    bat-*)
      parts=(${(s:-:)s#bat-}); l=$parts[1]; eng=$parts[2]
      [[ $l == p ]] && { l=$parts[1]-$parts[2]; eng=$parts[3]; }
      ids=($ALL); [[ -n ${s#bat-$l-$eng} ]] && ids=(${(s:,:)${s#bat-$l-$eng-}})
      for id in $ids; do
        log=$D/logs/$l-$eng-$id.log
        if [[ $eng == chromium ]]; then
          { stamp "start $id $l $eng"; cd $H && $G --timeout 90 -- node run.mjs --build $O/builds/$l --wt $WT --engines $eng --only $id --out $D/json/$l --verbose; print -- "# exit $?"; stamp "end $id $l $eng"; } > $log 2>&1
        else
          { stamp "start $id $l $eng (inside the webkit acquisition)"; cd $H && node run.mjs --build $O/builds/$l --wt $WT --engines $eng --only $id --out $D/json/$l --verbose; print -- "# exit $?"; stamp "end $id $l $eng"; } > $log 2>&1
        fi
        print -- "$s $id: $(grep -E '^E-[0-9]+ +(chromium|webkit) +exit' $log | tail -1 | cut -c1-200)"
      done ;;
    probe-*)
      parts=(${(s:-:)s#probe-}); eng=$parts[-1]; l=${${s#probe-}%-$eng}
      log=$D/logs/probe-$l-$eng.log; pre=(); [[ $eng == chromium ]] && pre=($G --timeout 60 --)
      { stamp "e3-probe $l $eng start"; cd $E3/probe && $pre node e3-probe.mjs --build $O/builds/probe-$l --engine $eng --label ${l/p-scrubveil/veil} ${${${eng:#webkit}:+${l:#p-*}}:+--shots $D/shots/$l}; print -- "# exit $?"; stamp "probe end"; } > $log 2>&1
      print -- "$s: $(grep '^e3-probe' $log | tail -1)" ;;
    ce3-*)
      parts=(${(s:-:)s#ce3-}); l=$parts[1]; eng=$parts[2]
      log=$D/logs/ce3-probe-$l-$eng.log; pre=(); [[ $eng == chromium ]] && pre=($G --timeout 60 --)
      { stamp "ce3-probe $l $eng start"; cd $D/probe && $pre node ce3-probe.mjs --build $O/builds/probe-$l --engine $eng --label $l; print -- "# exit $?"; stamp "probe end"; } > $log 2>&1
      print -- "$s: $(grep '^ce3-probe' $log | tail -1)" ;;
    unit-plants)
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
      print -- "restored: $(shasum < $WT/$UE)" ;;
  esac
done
print -- "# run-ce3 done $(date '+%F %T')"
