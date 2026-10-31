#!/bin/bash
# P-E11 CK-22: the consumer greps at the pass-11 HEAD. P-E10's two scripts run unchanged (one source, P-3: every pattern through
# `grep -e`; the overflow census whole-file), then the one census this patch adds: CSS `zoom` written anywhere a consumer could set it
# on a slider's ancestor (a stylesheet or style attribute `zoom:`, a Tailwind arbitrary `[zoom:`, a script `.style.zoom`).
# Sibling trees READ ONLY; value.js by grep only; nothing built or run in any sibling.
E10=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-10/E10
bash $E10/ck22-greps.sh
echo
echo "# §P9-7 item 9 (P-E10's ck22-overflow.sh, unchanged)"
bash $E10/ck22-overflow.sh
echo
cd ~/Programming
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=dist-ob11 --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage"
I="--include=*.vue --include=*.css --include=*.ts --include=*.tsx --include=*.scss --include=*.html"
echo "# ZM: CSS zoom set by a consumer (C-9 names zoom). Self-check on a pattern that must count: glass-ui's own pass-11 harness sets it"
echo "#   harness zoom writes $(grep -rEn -e '(^|[^-a-zA-Z])zoom *:|\.style\.zoom|\[zoom:' /Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs 2>/dev/null | wc -l | tr -d ' ')"
for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do
  echo "$r · ZM $(grep -rEn $I $X -e '(^|[^-a-zA-Z])zoom *:|\.style\.zoom|\[zoom:' $r 2>/dev/null | wc -l | tr -d ' ')"
  grep -rEn $I $X -e '(^|[^-a-zA-Z])zoom *:|\.style\.zoom|\[zoom:' $r 2>/dev/null | cut -c1-200 | sed 's/^/   /'
done
