#!/bin/zsh
# BG.W-COMPOSITED-GESTALT-GATE re-judge2 — Safari/WebKit leg via off-screen WKWebView.
# System WebKit.framework/Metal, no TCC. Poll data-capture-ready then snapshot. NON-AUTHORING.
set -e
OUT="/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/visual/BG.W-COMPOSITED-GESTALT-GATE-rejudge2"
BIN="/tmp/wkshot-live"

# slug|route pairs (mirror the Chrome set)
routes=(
  "dock-overview|/dock/overview"
  "dock-layers|/dock/layers"
  "dock-rail|/dock/rail"
  "substrates-blob|/substrates/blob"
  "substrates-aurora|/substrates/aurora"
  "feedback-toast|/feedback/toast"
  "feedback-notification|/feedback/notification"
  "display-buttons|/display/buttons"
  "motion-curve-gallery|/motion/curve-gallery"
  "motion-springs|/motion/springs"
  "substrates-fourier-field|/substrates/fourier-field"
  "substrates-glass-material|/substrates/glass-material"
  "navigation-tabs|/navigation/tabs"
  "foundations-intro|/foundations/intro"
)

for pair in "${routes[@]}"; do
  slug="${pair%%|*}"
  route="${pair##*|}"
  for mode in light dark; do
    out="$OUT/${slug}-safari-${mode}-desktop-full.png"
    url="http://localhost:5200/?capture=${route}&mode=${mode}"
    if "$BIN" "$url" "$out" "$mode" 20000 >/dev/null 2>&1; then
      sz=$(stat -f%z "$out" 2>/dev/null || echo 0)
      echo "safari ${slug} ${mode} OK  bytes=${sz}"
    else
      echo "safari ${slug} ${mode} FAIL"
    fi
  done
done
echo "DONE safari"
