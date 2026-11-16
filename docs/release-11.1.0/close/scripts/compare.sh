#!/bin/zsh
# 11.1.0 close: the branch's failing-title set per project (the v11.0.0 baseline README's pipeline)
# over the full-suite chunks (ch-part-*, co-part-*, wk-proj) and its comm against the v11.0.0 sets
# in docs/release-11.0.1/baseline-v11.0.0. The release specs (ch-rel, co-rel, wk-rel) are new since
# v11.0.0, so every failure there is listed on its own. Writes suite/<project>-failed-titles.txt and
# suite/compare.txt.
#   zsh compare.sh
set -u; export LC_ALL=C
C=${0:A:h:h}; S=$C/suite; B=${C:h:h}/release-11.0.1/baseline-v11.0.0
cd $S
: > compare.txt
for pair in "chromium-headless-new:ch" "coarse-touch:co" "webkit:wk"; do
  P=${pair%%:*}; X=${pair#*:}
  if [[ $X = wk ]]; then G=(wk-proj.json); R=(wk-rel.json); else G=($X-part-a?.json); R=($X-rel.json); fi
  python3 -I $C/scripts/summary.py fails $G | awk -F'\t' '{print $2"\t"$3}' | LC_ALL=C sort -u > $P-failed-titles.txt
  { echo "== $P: reports ${G}"; echo "branch $(wc -l < $P-failed-titles.txt | tr -d ' ') failing, v11.0.0 $(wc -l < $B/$P-failed-titles.txt | tr -d ' ')";
    echo "-- branch-only:"; comm -13 $B/$P-failed-titles.txt $P-failed-titles.txt;
    echo "-- v11.0.0-only (failing there, passing here):"; comm -23 $B/$P-failed-titles.txt $P-failed-titles.txt;
    echo "-- release specs (${R}), every failure:"; [[ -f $R ]] && python3 -I $C/scripts/summary.py fails $R | awk -F'\t' '{print $2"\t"$3}' | LC_ALL=C sort -u; } >> compare.txt
done
cat compare.txt
