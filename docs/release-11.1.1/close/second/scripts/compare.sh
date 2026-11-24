#!/bin/zsh
# The 11.1.1 second close: the branch's failing-title set per project over the suite chunks (ch-part-*,
# co-part-*, wk-proj) and its comm against the 11.1.0 close's branch sets
# (docs/release-11.1.0/close/suite/<project>-failed-titles.txt). The release specs (ch-rel, co-rel,
# wk-rel) passed whole at the 11.1.0 close, so every failure there is listed on its own.
# Writes suite/<project>-failed-titles.txt and suite/compare.txt.
#   zsh compare.sh
set -u; export LC_ALL=C
C=${0:A:h:h}; S=$C/suite; B=${C:h:h:h}/release-11.1.0/close/suite
cd $S
: > compare.txt
for pair in "chromium-headless-new:ch" "coarse-touch:co" "webkit:wk"; do
  P=${pair%%:*}; X=${pair#*:}
  if [[ $X = wk ]]; then G=(wk-proj.json); R=(wk-rel.json); else G=($X-part-a?.json); R=($X-rel.json); fi
  python3 -I $C/scripts/summary.py fails $G | awk -F'\t' '{print $2"\t"$3}' | LC_ALL=C sort -u > $P-failed-titles.txt
  { echo "== $P: reports ${G}"; echo "branch $(wc -l < $P-failed-titles.txt | tr -d ' ') failing, 11.1.0 close $(wc -l < $B/$P-failed-titles.txt | tr -d ' ')";
    echo "-- branch-only:"; comm -13 $B/$P-failed-titles.txt $P-failed-titles.txt;
    echo "-- 11.1.0-only (failing there, passing or gone here):"; comm -23 $B/$P-failed-titles.txt $P-failed-titles.txt | wc -l;
    echo "-- release specs (${R}), every failure:"; [[ -f $R ]] && python3 -I $C/scripts/summary.py fails $R | awk -F'\t' '{print $2"\t"$3}' | LC_ALL=C sort -u; } >> compare.txt
done
cat compare.txt
