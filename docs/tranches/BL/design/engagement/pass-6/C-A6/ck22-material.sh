#!/bin/bash
# C-A6 CK-22: consumer elements composing a material class whose press moved from :active to [data-press]
cd ~/Programming
X="--exclude-dir=node_modules --exclude-dir=dist --exclude-dir=dist-demo --exclude-dir=.worktrees --exclude-dir=.claude --exclude-dir=docs --exclude-dir=.git --exclude-dir=bench"
echo "# $(date '+%F %T') material classes (glass-wash|quiet|resting|floating|overlay) in consumer .vue, and the lines that also carry <button / @click / role=button"
for r in atlas bbnf-buddy chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do [ -d $r ] || continue
 m=$(grep -rEn "\bglass-(wash|quiet|resting|floating|overlay)\b" $r --include='*.vue' $X 2>/dev/null | wc -l | tr -d ' ')
 n=$(grep -rEn "\bglass-(wash|quiet|resting|floating|overlay)\b" $r --include='*.vue' $X 2>/dev/null | grep -cE "<button|@click|role=\"button\"")
 echo "$r material-class-lines=$m with-button/click-on-line=$n"; done
echo "# examples"
for r in atlas chicago keyframes.js slides speedtest value.js fourier-analysis sci-report; do [ -d $r ] && grep -rEn "\bglass-(wash|quiet|resting|floating|overlay)\b" $r --include='*.vue' $X 2>/dev/null | grep -E "<button|@click|role=\"button\"" | head -3; done
