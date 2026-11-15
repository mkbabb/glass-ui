#!/bin/zsh
# 11.0.2 close: the branch's failing-title set per project (the v11.0.0 baseline README's
# pipeline, ../../release-11.0.1/close/scripts/summary.py) over the full-suite chunks (ch-rel +
# ch-part-*, co-rel + co-part-*, wk-proj; reports gzipped once the run is done), and its comm
# against the 11.0.1 close's branch set. Writes suite/<project>-failed-titles.txt and compare.txt.
#   zsh compare.sh
set -u
C=${0:A:h:h}; S=$C/suite; B=${C:h:h}/release-11.0.1/close/suite; SUM=${C:h:h}/release-11.0.1/close/scripts/summary.py
T=$(mktemp -d); trap 'rm -r $T' EXIT
cd $S
: > compare.txt
for pair in "chromium-headless-new:ch" "coarse-touch:co" "webkit:wk"; do
  P=${pair%%:*}; X=${pair#*:}
  if [[ $X = wk ]]; then G=(wk-proj.json); else G=($X-rel.json); for p in $X-part-a?.json.gz; do G+=(${p%.gz}); done; fi
  for g in $G; do if [[ -f $g ]]; then cp $g $T/$g; else gunzip -c $g.gz > $T/$g; fi; done
  python3 -I $SUM fails $T/${^G} | awk -F'\t' '{print $2"\t"$3}' | LC_ALL=C sort -u > $P-failed-titles.txt
  { echo "== $P: reports ${G}"; echo "branch $(wc -l < $P-failed-titles.txt | tr -d ' ') failing, 11.0.1 close $(wc -l < $B/$P-failed-titles.txt | tr -d ' ')";
    echo "-- branch-only:"; comm -13 $B/$P-failed-titles.txt $P-failed-titles.txt;
    echo "-- 11.0.1-only (failing there, passing here):"; comm -23 $B/$P-failed-titles.txt $P-failed-titles.txt; } >> compare.txt
done
cat compare.txt
