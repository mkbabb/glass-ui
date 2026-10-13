#!/bin/bash
# D4-F pass-3 spec · unit-plants.sh · each new unit case fails on its own planted mutation and passes restored.
#   bash unit-plants.sh <worktree>     (HEAD + floor v2 + route.patch; node_modules linked; vitest.wt.config.ts)
WT=$1; cd $WT
I=src/components/toggle-group/ToggleGroupItem.vue; C=src/components/toggle-group/styles.css; P=src/components/fading-scroll/FadingScroll.vue
SAVE=$(mktemp -d "$WT/.plantsave.XXXX"); cp $I $C $P $SAVE/
restore() { cp $SAVE/ToggleGroupItem.vue $I; cp $SAVE/styles.css $C; cp $SAVE/FadingScroll.vue $P; }
run() { echo "== plant $1 · $(date +%T) load $(sysctl -n vm.loadavg)"; node node_modules/vitest/vitest.mjs run --config vitest.wt.config.ts tests/components/ui/toggle-group/ToggleGroup.test.ts tests/components/fading-scroll.contract.test.ts 2>&1 | grep -E '×|Tests  |Failed Tests'; }
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
run restored
rm -rf "$SAVE"
