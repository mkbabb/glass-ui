#!/bin/bash
# BG.W-DESHADCN — Safari/WebKit off-screen capture leg over the /forms band + /feedback/toast.
# System WebKit.framework (real Safari 26 engine, Metal). One route+mode per wkshot-live call.
set -u
ASSETS="/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-DESHADCN-assets"
WK="$ASSETS/wkshot-live"
ROUTES=(/forms/inputs /forms/textarea /forms/checks /forms/slider /forms/number-field /forms/select /forms/combobox /forms/multi-select /forms/toggle /forms/toggle-chip /forms/selectable-chip /forms/label /feedback/toast)
MODES=(light dark)
for mode in "${MODES[@]}"; do
  for route in "${ROUTES[@]}"; do
    slug="${route#/}"; slug="${slug//\//_}"
    out="$ASSETS/${slug}-safari-${mode}.png"
    url="http://localhost:5200/?capture=${route}&mode=${mode}"
    "$WK" "$url" "$out" "$mode" 15000 > "$ASSETS/_wk-${slug}-${mode}.log" 2>&1
    rc=$?
    if [ -f "$out" ]; then
      sz=$(stat -f%z "$out")
      echo "safari $mode $route OK rc=$rc size=$sz"
    else
      echo "safari $mode $route FAIL rc=$rc (no png)"
    fi
  done
done
echo "DONE safari"
