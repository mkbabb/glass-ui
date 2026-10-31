#!/bin/bash
# C-A10 static reads (siblings read only; value.js by grep only; nothing built in any sibling). CK-22 greps: P-E10's script and C-A9's independent one, re-run; item 9 written afresh; CSS zoom sites.
G=/Users/mkbabb/Programming/glass-ui; P=$G/docs/tranches/BL/design/engagement; R=$P/pass-10/C-A10
bash $P/pass-10/E10/ck22-greps.sh > $R/logs/ck22-greps-pe10.txt 2>&1
bash $P/pass-9/C-A9/scripts/ck22-greps.sh > $R/logs/ck22-greps-ca9.txt 2>&1
cd ~/Programming
X=(--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=dist-ob11 --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage)
{ echo "# $(date '+%F %T') · glass-ui HEAD $(git -C glass-ui rev-parse --short HEAD) · speedtest $(git -C speedtest rev-parse --short HEAD)"
  echo "## every .vue with a <Slider>/<NumberField> and a clip anywhere in the file (my pattern: overflow in class or style, any clip keyword)"
  for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do
    grep -rlE --include='*.vue' "${X[@]}" -e '<(Slider|NumberField)\b' "$r" 2>/dev/null | while read -r f; do
      c=$(grep -nE -e 'overflow(-[xy])?[-:]? *(hidden|auto|scroll|clip)|\bclip-path\b|rounded-[a-z0-9]+ overflow' "$f" | cut -c1-120 | sed 's/  */ /g' | tr '\n' '|'); [ -n "$c" ] && echo "$f :: <Slider|NumberField> at $(grep -nE -e '<(Slider|NumberField)\b' "$f" | cut -d: -f1 | tr '\n' ',') :: $c"; done; done
  echo; echo "## speedtest DashboardMapControls.vue, the lines"; sed -n '97p;134p' speedtest/src/components/dashboard/DashboardMapControls.vue | cut -c1-140; } > $R/logs/ck22-item9-mine.txt 2>&1
{ echo "# $(date '+%F %T') CSS zoom in the siblings, read only · glass-ui HEAD $(git -C glass-ui rev-parse --short HEAD)"
  for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do echo "## $r"; grep -rEn --include='*.vue' --include='*.css' --include='*.ts' --include='*.scss' "${X[@]}" -e '(^|[^-a-zA-Z])zoom: *[0-9.]|\.style\.zoom|\[zoom:' "$r" 2>/dev/null | cut -c1-170 | head -12; done
  echo "## glass-ui src"; grep -rEn --include='*.vue' --include='*.css' --include='*.ts' -e '(^|[^-a-zA-Z])zoom: *[0-9.]|\.style\.zoom|currentCSSZoom' glass-ui/src 2>/dev/null | cut -c1-170 | head; } > $R/logs/ck20-zoom-sites.txt 2>&1
