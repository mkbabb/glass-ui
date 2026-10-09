#!/bin/zsh
# D4-Dp-spec/probes/unit-plants.sh (second sitting: the nested tile block; the vitest config keeps every cache outside the checkout) · the canon unit (tests/styles/radius-role-canon.test.ts, "the tile corner is one
# declaration") on the clean sketch and on seven plants, each written into the worktree and removed after.
#   zsh unit-plants.sh <worktree> <log>
WT=$1; OUT=$2; cd $WT
SEL='.toggle-group[data-shape="cell"] .toggle-group__item'
stamp() { echo "$(date '+%F %T') · load $(sysctl -n vm.loadavg)"; }
run() { timeout 600 npx vitest run --config ../vitest.wt.config.mjs tests/styles/radius-role-canon.test.ts -t "tile corner is one" 2>&1 | grep -E "Tests |^\+  |^-  " >> $OUT; }
plant() { echo "$2" > src/components/toggle-group/zz-plant.css; echo "== plant $1: $2" >> $OUT; run; rm src/components/toggle-group/zz-plant.css; }
stamp > $OUT
echo "== clean" >> $OUT; run
plant A ":is($SEL) { border-radius: 12px; }"
plant S ".toggle-group[data-size=\"sm\"] :is($SEL) { border-radius: var(--radius-panel); }"
plant H ".toggle-group__item:has(> * + *) { border-radius: 12px; }"
plant V ".toggle-group[data-orientation=\"vertical\"] :is($SEL) { border-radius: 12px; }"
plant W ":where(.toggle-group[data-shape=cell] [data-state=on]) { border-radius: 10px; }"
plant P ".toggle-group:not([data-shape=\"pill\"]) .toggle-group__item { border-radius: 9999px; }"
cp src/components/toggle-group/styles.css $WT/../styles.bak
sed -i '' 's/border-radius: var(--radius-field) !important;/border-radius: var(--radius-field);/' src/components/toggle-group/styles.css
echo "== plant I: the tile corner without !important" >> $OUT; run
cp $WT/../styles.bak src/components/toggle-group/styles.css
echo "== clean after restore (whole suite)" >> $OUT
timeout 600 npx vitest run --config ../vitest.wt.config.mjs tests/styles/radius-role-canon.test.ts 2>&1 | grep -E "Tests " >> $OUT
stamp >> $OUT
# the group-paint gate (G-TOGGLE-WRAP, parsed): a paint on the group's own rule FAILS; a paint nested under it does not
gate() { timeout 600 npx vitest run --config ../vitest.wt.config.mjs tests/components/ui/toggle-group/ToggleGroup.test.ts -t "group paints no silhouette" 2>&1 | grep -E "Tests " >> $OUT; }
cp src/components/toggle-group/styles.css $WT/../styles.bak
sed -i '' 's/        --selection-tile: flush;/        --selection-tile: flush;\n        background: red;/' src/components/toggle-group/styles.css
echo "== gate plant G1: a background on the tile group's own rule" >> $OUT; grep -c "background: red" src/components/toggle-group/styles.css >> $OUT; gate
cp $WT/../styles.bak src/components/toggle-group/styles.css
sed -i '' 's/        --selection-tile: flush;/        --selection-tile: flush;\n        padding: 0;/' src/components/toggle-group/styles.css
echo "== gate plant G2: the tile group pads 0 (cuts the ring's reach)" >> $OUT; gate
cp $WT/../styles.bak src/components/toggle-group/styles.css
echo "== gate clean after restore" >> $OUT; gate
stamp >> $OUT
