#!/bin/zsh
# D4-Dp-spec/probes/unit-bites.sh · each new unit case on the sketch, then on a planted mutation of the code it pins
# (the file is restored after each). A case that still passes on its plant is vacuous.
#   zsh unit-bites.sh <worktree> <log>
WT=$1; OUT=$2; cd $WT
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
t() { timeout 600 npx vitest run --config vitest.d4.config.mts $1 -t "$2" 2>&1 | grep -E "Tests " | tr -s ' '; }
bite() { # name file perl-substitution test-file test-name
  cp $2 $WT/../bite.bak; perl -0pi -e "$3" $2
  if cmp -s $2 $WT/../bite.bak; then echo "== $1: PLANT DID NOT APPLY" >> $OUT; else echo "== $1 (planted): $(t $4 "$5")" >> $OUT; fi
  cp $WT/../bite.bak $2; echo "   restored: $(t $4 "$5")" >> $OUT; }
stamp > $OUT
bite "the guard deleted" src/components/toggle-group/ToggleGroup.vue 's/watchEffect\(\(\) => refuseUnknown\([^\n]*\n//' tests/components/ui/toggle-group/ToggleGroup.test.ts "shape stamps"
bite "data-shape not stamped" src/components/toggle-group/ToggleGroup.vue 's/\n\s*:data-shape="props.shape"//' tests/components/ui/toggle-group/ToggleGroup.test.ts "shape stamps"
bite "attrs inherited after the engine (inheritAttrs back on)" src/components/toggle-group/ToggleGroupItem.vue 's/defineOptions\(\{ name: "ToggleGroupItem", inheritAttrs: false \}\);/defineOptions({ name: "ToggleGroupItem" });/; s/v-bind="\{ \.\.\.\$attrs, \.\.\.group\?\.itemAttrs\(props\.value\) \}"/v-bind="group?.itemAttrs(props.value)"/' tests/components/ui/toggle-group/item-attrs.test.ts "engine's role"
bite "the port always a stop" src/components/fading-scroll/FadingScroll.vue 's/:tabindex="holdsStop \? undefined : 0"/tabindex="0"/' tests/components/fading-scroll.contract.test.ts "tab stop only while"
bite "the port re-read deleted" src/components/fading-scroll/FadingScroll.vue 's/watcher = new MutationObserver\(read\);/watcher = new MutationObserver(() => {});/' tests/components/fading-scroll.contract.test.ts "tab stop only while"
stamp >> $OUT
