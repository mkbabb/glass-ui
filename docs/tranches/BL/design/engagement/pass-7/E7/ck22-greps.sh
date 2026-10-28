#!/bin/bash
# P-E7 CK-22: consumer greps for E's consumer-visible changes of pass 7 (sibling trees READ ONLY; value.js by grep only,
# nothing built or run there). Main trees only: node_modules, dist, worktrees, .claude, docs, bench excluded.
cd ~/Programming
R="atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report"
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=dist-ob11 --exclude-dir=.worktrees --exclude-dir=worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench --exclude-dir=coverage"
I="--include=*.vue --include=*.css --include=*.ts --include=*.tsx --include=*.scss --include=*.html"
g() { grep -rEn "$1" $2 $I $X 2>/dev/null; }
echo "# $(date '+%F %T') P-E7 consumer greps · glass-ui HEAD $(git -C ~/Programming/glass-ui rev-parse --short HEAD)"
for r in $R; do echo "## $r HEAD $(git -C $r rev-parse --short HEAD 2>/dev/null)"; done
echo
echo "# E1 .glass-focus-veil (the class; its [data-engaged] reader is deleted) · E2 data-engaged written or read on a veil"
echo "# E3 .glass-loupe / .glass-loupe-mark restyles · E4 the stage's exports (flingStage, useEngageStage, STAGE_VEIL, POINTER_STAGE)"
echo "# E5 <Slider sites (the promoted control is now clipped to its place's clip) · E6 clip-path / position-visibility on a slider"
for r in $R; do
 e1=$(g "glass-focus-veil" $r | wc -l | tr -d ' ')
 e2=$(g "focus-veil[^\n]*data-engaged|data-engaged[^\n]*focus-veil" $r | wc -l | tr -d ' ')
 e3=$(g "glass-loupe" $r | wc -l | tr -d ' ')
 e4=$(g "flingStage|useEngageStage|STAGE_VEIL|POINTER_STAGE" $r | wc -l | tr -d ' ')
 e5=$(grep -rEn "<Slider\b" $r --include=*.vue $X 2>/dev/null | wc -l | tr -d ' ')
 e6=$(g "glass-slider[^{]*\{[^}]*(clip-path|position-visibility)" $r | wc -l | tr -d ' ')
 echo "$r · E1 $e1 · E2 $e2 · E3 $e3 · E4 $e4 · E5 $e5 · E6 $e6"
done
echo
echo "# the E1/E3/E4 lines, in full"
for r in $R; do g "glass-focus-veil|glass-loupe|flingStage|useEngageStage|STAGE_VEIL|POINTER_STAGE" $r; done
