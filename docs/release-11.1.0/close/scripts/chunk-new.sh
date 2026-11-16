#!/bin/zsh
# Branch-only failures in finished chunks so far: each <tag>.json's failing titles not in the v11.0.0 set.
#   zsh chunk-new.sh
set -u; setopt null_glob; export LC_ALL=C
C=${0:A:h:h}; S=$C/suite; B=${C:h:h}/release-11.0.1/baseline-v11.0.0
cd $S
for j in ch-part-a?.json co-part-a?.json; do
  [[ -f $j ]] || continue
  P=chromium-headless-new; [[ $j = co-* ]] && P=coarse-touch
  n=$(python3 -I $C/scripts/summary.py fails $j | awk -F'\t' '{print $2"\t"$3}' | LC_ALL=C sort -u | comm -13 $B/$P-failed-titles.txt - )
  echo "== $j: $(echo -n "$n" | grep -c .) branch-only"; [[ -n $n ]] && echo "$n"
done
