#!/bin/bash
# C-E12 CK-22: my own consumer census at the pass-12 HEAD, every pattern through `grep -e`, written independently of P-E12's and the
# pass-11 critics' scripts. Sibling trees READ ONLY (grep and `git rev-parse` only); value.js by grep only. Scoped per named repo, no
# whole-volume walk. Output to stdout only.
cd /Users/mkbabb/Programming || exit 1
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=coverage --exclude-dir=.lighthouseci --exclude-dir=.vite --exclude-dir=.output --exclude-dir=build"
I="--include=*.vue --include=*.ts --include=*.tsx --include=*.css --include=*.scss --include=*.html"
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report"
echo "# C-E12 ck22 · $(date '+%F %T') · glass-ui HEAD $(git -C glass-ui rev-parse --short HEAD)"
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p12/C-E12/wt
c() { grep -rEn $I $X -e "$2" "$1" 2>/dev/null | grep -v -e '\.vite-' | wc -l | tr -d ' '; }
echo "# self-check on the candidate's own src (the patterns must find the library's own sites)"
for p in '--spring-dock *:' '--spring-[a-z]+-settle *:' '--space-section *:' 'shape-margin' '--stage-reach' '--scale-engage *:' '<Slider[ >/]|<Slider$' 'translate: *-50% -50%'; do echo "  src '$p' $(grep -rEn -e "$p" $WT/src 2>/dev/null | wc -l | tr -d ' ')"; done
echo
printf "%-17s %-10s %6s %6s %6s %6s %6s %6s %6s %6s %6s\n" repo HEAD Slider NumFld dock: settle: sect: shapem stage* sceng: zoom
for r in $R; do
  [ -d "$r" ] || { echo "$r absent"; continue; }
  printf "%-17s %-10s %6s %6s %6s %6s %6s %6s %6s %6s %6s\n" $r "$(git -C $r rev-parse --short HEAD 2>/dev/null)" \
    "$(c $r '<Slider[ >/]|<Slider$')" "$(c $r '<NumberField[ >/]|<NumberField$')" "$(c $r '--spring-dock *:')" "$(c $r '--spring-[a-z]+-settle *:')" \
    "$(c $r '--space-section *:')" "$(c $r 'shape-margin')" "$(c $r '--stage-(reach|room|w)')" "$(c $r '--scale-engage *:')" "$(c $r '(^|[^-a-zA-Z])zoom *:|\.style\.zoom')"
done
echo
echo "# every hit of the token-write patterns, each (a consumer value the candidate's one read would meet)"
for r in $R; do for p in '--spring-dock *:' '--spring-[a-z]+-settle *:' '--space-section *:' 'shape-margin' '--scale-engage *:'; do grep -rEn $I $X -e "$p" $r 2>/dev/null | grep -v -e '\.vite-' | cut -c1-170 | sed "s/^/  [$p] /"; done; done
echo
echo "# CSS zoom hits, each"
for r in $R; do grep -rEn $I $X -e '(^|[^-a-zA-Z])zoom *:|\.style\.zoom' $r 2>/dev/null | cut -c1-170 | sed "s/^/  /"; done
echo
echo "# a Slider or NumberField in the same file as a glass-ui Dialog or Sheet (the centred plate: translate -50% -50%), each file"
for r in $R; do grep -rlE $I $X -e '<Slider[ >/]|<Slider$|<NumberField[ >/]' $r 2>/dev/null | while read -r fl; do grep -qE -e '<DialogContent|<SheetContent' "$fl" && echo "  $fl"; done; done
echo
echo "# a Slider or NumberField in the same file as a rotate/skew transform (a card transform the glide does not carry), each file"
for r in $R; do grep -rlE $I $X -e '<Slider[ >/]|<Slider$|<NumberField[ >/]' $r 2>/dev/null | while read -r fl; do grep -qE -e 'rotate\(|rotate:|skew' "$fl" && echo "  $fl"; done; done
echo
echo "# the overflow site (speedtest): the Slider and its overflow ancestor"
grep -n -e '<Slider' -e 'overflow-hidden' -e '<Card' speedtest/src/components/dashboard/DashboardMapControls.vue 2>/dev/null | cut -c1-160
echo "# end $(date '+%F %T')"
