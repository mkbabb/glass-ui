#!/bin/zsh
# The 11.1.1 second close: per finished chunk, its branch-only titles (failing here, not in the
# 11.1.0 close's set for its project), each marked by the first close's reading of it: "first" when
# the first close had it branch-only too (all of those failed on master's tip with the same first
# error), "NEW" otherwise; and the first close's branch-only titles of that chunk that pass here.
#   zsh newvsfirst.sh
set -u; setopt null_glob; export LC_ALL=C
C=${0:A:h:h}; S=$C/suite; B=${C:h:h:h}/release-11.1.0/close/suite; F=${C:h}/suite
cd $S
for j in ch-part-a?.json co-part-a?.json ch-rel.json co-rel.json; do
  [[ -f $j ]] || continue
  P=chromium-headless-new; X=ch; [[ $j = co-* ]] && { P=coarse-touch; X=co; }
  first=$F/$X-branch-only.txt; [[ $X = co ]] && first=$F/co-branch-only-aa.txt
  n=$(python3 -I $C/scripts/summary.py fails $j | awk -F'\t' '{print $2"\t"$3}' | sort -u | comm -13 $B/$P-failed-titles.txt - )
  echo "== $j: $(echo -n "$n" | grep -c .) branch-only"
  [[ -n $n ]] && echo "$n" | while IFS= read -r l; do if grep -qxF "$l" $first 2>/dev/null; then echo "first	$l"; else echo "NEW	$l"; fi; done
done
