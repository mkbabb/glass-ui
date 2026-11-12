#!/bin/zsh
# 11.0.1 close: the branch's failing-title set per project (the baseline README's pipeline) over
# the full-suite chunks only (ch-rel + ch-part-*, co-rel + co-part-*, wk-proj; reports gzipped),
# and its comm against the v11.0.0 set. Writes suite/<project>-failed-titles.txt and compare.txt.
#   zsh compare.sh
set -u
C=${0:A:h:h}; S=$C/suite; B=${C:h}/baseline-v11.0.0
T=$(mktemp -d); trap 'rm -r $T' EXIT
cd $S
: > compare.txt
for pair in "chromium-headless-new:ch" "coarse-touch:co" "webkit:wk"; do
  P=${pair%%:*}; X=${pair#*:}
  if [[ $X = wk ]]; then G=(wk-proj.json.gz); else G=($X-rel.json.gz $X-part-a?.json.gz); fi
  for g in $G; do gunzip -c $g > $T/${g%.gz}; done
  python3 -I $C/scripts/summary.py fails $T/${^G%.gz} | awk -F'\t' '{print $2"\t"$3}' | LC_ALL=C sort -u > $P-failed-titles.txt
  { echo "== $P: reports ${G}"; echo "branch $(wc -l < $P-failed-titles.txt | tr -d ' ') failing, v11.0.0 $(wc -l < $B/$P-failed-titles.txt | tr -d ' ')";
    echo "-- branch-only:"; comm -13 $B/$P-failed-titles.txt $P-failed-titles.txt;
    echo "-- v11.0.0-only (failing there, passing here):"; comm -23 $B/$P-failed-titles.txt $P-failed-titles.txt; } >> compare.txt
done
cat compare.txt
