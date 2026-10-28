#!/bin/bash
# C-E6 CK-22: consumer greps at the pass HEAD over the sibling consumers (read only; nothing built or run there).
cd /Users/mkbabb/Programming
PAT='engage-commit-light|--rung-light|data-engage-face|data-engage-light|glass-capsule-hover|useDockHold|control-bit__light|configurator-preset-chip|\.glass-[a-z-]+[^{]*:active|glass-specular-track[^{]*:active|dialog-close[^{]*:active|sortable[^{]*:active|tap-squish|interactive-item|<Aurora[^>]*@pointermove|setCursor\(|glass-focus-veil|glass-loupe'
echo "# $(date '+%F %T') pattern: $PAT"
for d in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js sci-report fourier-analysis; do
  [ -d "$d" ] || { echo "== $d: absent"; continue; }
  r=$(grep -rnE "$PAT" "$d" --include='*.vue' --include='*.ts' --include='*.css' --include='*.js' --include='*.tsx' --include='*.scss' 2>/dev/null | grep -vE "node_modules|/dist/|/\.vite|/build/|/out/|/\.claude/|/coverage/|\.min\.js|/vendor/|docs/tranches")
  echo "== $d: $(printf '%s' "$r" | grep -c .) hits"; printf '%s\n' "$r" | cut -c1-260 | head -25
done
