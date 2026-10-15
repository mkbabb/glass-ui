#!/bin/bash
# D4-F pass-3 prototype · unit-plants.sh · each route unit case fails on its own planted mutation and passes restored.
# The spec's five plants (D4-F-spec/probes/unit-plants.sh), unchanged, plus the prototype's two: the stacked-row name, and
# the strong-observer helper made a pass-through (tests/utils/strongObservers.ts; happy-dom holds an observer's closure by
# WeakRef), which must fail the three late-content cases deterministically, run plain and under --expose-gc.
#   bash unit-plants.sh <worktree>     (HEAD + floor v2 + D4-F-proto.patch; node_modules linked; vitest.wt.config.ts)
WT=$1; cd $WT
I=src/components/toggle-group/ToggleGroupItem.vue; C=src/components/toggle-group/styles.css; P=src/components/fading-scroll/FadingScroll.vue; U=tests/utils/strongObservers.ts
SAVE=$(mktemp -d "$WT/.plantsave.XXXX"); cp $I $C $P $U $SAVE/
restore() { cp $SAVE/ToggleGroupItem.vue $I; cp $SAVE/styles.css $C; cp $SAVE/FadingScroll.vue $P; cp $SAVE/strongObservers.ts $U; }
run() { echo "== plant $1 · $(date +%T) load $(sysctl -n vm.loadavg)"; node node_modules/vitest/vitest.mjs run --config vitest.wt.config.ts tests/components/ui/toggle-group/ToggleGroup.test.ts tests/components/fading-scroll.contract.test.ts 2>&1 | grep -E '×|FAIL|Tests  |Failed Tests'; }
sub() { python3 -I -c 'import sys; p,o,n=sys.argv[1:4]; s=open(p).read(); assert o in s, "plant anchor missing: "+o; open(p,"w").write(s.replace(o,n,1))' "$@"; }
run clean
sub $I '<span v-if="$slots.meta" class="toggle-group__meta"><slot name="meta" /></span>' '<slot name="meta" />'; run no-meta-row; restore
sub $I '        v-bind="bound"
' ''; sub $I '        @click="group?.select(entry)"' '        v-bind="bound"
        @click="group?.select(entry)"'; sub $I '    ...attrs,
    tabindex: group?.tabindex(entry) ?? 0,
    ...group?.itemAttrs(props.value),' '    tabindex: group?.tabindex(entry) ?? 0,
    ...group?.itemAttrs(props.value),
    ...attrs,'; run consumer-attrs-last; restore
sub $C '    .toggle-group__media {
        display: flex;' '    .toggle-group__item:has(> .toggle-group__media) {
        border-radius: var(--radius-field);
    }

    .toggle-group__media {
        display: flex;'; run second-spelling; restore
sub $P ':tabindex="holdsFocusable ? undefined : 0"' 'tabindex="0"'; run port-always-a-stop; restore
sub $P ':not([disabled], [tabindex="-1"])' ':not([disabled])'; run parked-counts-as-a-stop; restore
sub $I 'if (b.querySelector("br") || past || textRows(b) > 1)' 'if (b.querySelector("br") || past)'; run stacked-rows-unnamed; restore
sub $U '    globalThis.WeakRef = StrongRef as unknown as WeakRefConstructor;' ''; run weak-helper; NODE_OPTIONS=--expose-gc run weak-helper-gc; restore
run restored
rm -rf "$SAVE"
