#!/bin/bash
# C-A11 CK-22 consumer census, written afresh (every pattern through grep -e). Sibling trees READ ONLY; value.js by grep only.
# Prints one summary line per repo, then the hit lines of the two censuses this pass names (CSS zoom; a consumer writing a
# `--spring-*` row token, the tokens the travel reads), then the overflow ancestor site of C-2.
cd ~/Programming
X=(--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=dist-ob11 --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage --exclude-dir=.lighthouseci '--exclude-dir=.vite*')
I=(--include=*.vue --include=*.css --include=*.ts --include=*.tsx --include=*.scss --include=*.html --include=*.js)
c() { grep -rEn "${I[@]}" "${X[@]}" -e "$2" "$1" 2>/dev/null | wc -l | tr -d ' '; }
echo "# $(date '+%F %T') C-A11 census · glass-ui HEAD $(git -C glass-ui rev-parse --short HEAD) (lighthouse dumps and .vite* dep caches excluded)"
echo "# self-check: the candidate's own tree (worktree) --stage-room writes $(grep -rEn -e '--stage-room' /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p11/C-A11/wt/src 2>/dev/null | wc -l | tr -d ' '), currentCSSZoom $(grep -rEn -e 'currentCSSZoom' /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p11/C-A11/wt/src 2>/dev/null | wc -l | tr -d ' ')"
for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do
  echo "$r @$(git -C $r rev-parse --short HEAD 2>/dev/null) · Slider $(c $r '<Slider\b') (tags $(c $r '^\s*<Slider\b')) · NumberField $(c $r '<NumberField\b') · tap-squish $(c $r 'tap-squish') · interactive-item $(c $r 'interactive-item') · data-held $(c $r 'data-held') · --veil-x/y $(c $r '--veil-[xy]') · loupe/lens/stage names $(c $r 'glass-loupe|--lens-|--held-scale-|--stage-(room|w|reach)|data-engage-lens') · anchor-name $(c $r 'anchor-name') · CSS zoom $(c $r '(^|[^-a-zA-Z_.])zoom *: *[0-9.]|\.style\.zoom|\[zoom:') · --spring-* written $(c $r '--spring-[a-z]+(-settle|-duration)? *:')"
done
echo "## CSS zoom hits"; for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do grep -rEn "${I[@]}" "${X[@]}" -e '(^|[^-a-zA-Z_.])zoom *: *[0-9.]|\.style\.zoom|\[zoom:' $r 2>/dev/null | cut -c1-150; done
echo "## --spring-* token writes"; for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do grep -rEn "${I[@]}" "${X[@]}" -e '--spring-[a-z]+(-settle|-duration)? *:' $r 2>/dev/null | cut -c1-150; done
echo "## C-2's overflow ancestor: speedtest DashboardMapControls.vue lines 94-97 and 134"; sed -n '94,97p;134p' speedtest/src/components/dashboard/DashboardMapControls.vue | cut -c1-140
