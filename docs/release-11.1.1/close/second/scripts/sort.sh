#!/bin/zsh
# The 11.1.1 second close: a project's branch-only titles over the given reports (failing here, not
# in the 11.1.0 close's set for the project), each with its first error beside the error the same
# file and title gave on master's tip at the first close (close/suite/resolve/ch-master.json: 11.1.0's
# source under the rebuilt demo, Chromium). "same" is attributed by that reading; DIFF or absent is
# run on the red tree and the head tree.
#   zsh sort.sh <ch|co> <out-stem> <report.json>...
set -u; export LC_ALL=C
C=${0:A:h:h}; S=$C/suite; B=${C:h:h:h}/release-11.1.0/close/suite; M=${C:h}/suite/resolve/ch-master.json
X=$1; O=$2; shift 2
P=chromium-headless-new; [[ $X = co ]] && P=coarse-touch
cd $S
python3 -I $C/scripts/summary.py fails $@ | awk -F'\t' '{print $2"\t"$3}' | sort -u | comm -13 $B/$P-failed-titles.txt - > $O-branch-only.txt
python3 -I $C/scripts/errs.py $O-branch-only.txt $@ -- $M > $O-errs-vs-master.txt 2> $O-errs-count.txt
grep -v '^same' $O-errs-vs-master.txt | cut -f2,3 > $O-to-run.short.txt
echo "$O: $(wc -l < $O-branch-only.txt | tr -d ' ') branch-only; $(cat $O-errs-count.txt); to run $(wc -l < $O-to-run.short.txt | tr -d ' ')"
