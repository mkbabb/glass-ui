#!/bin/zsh
# Copy one project's chunk reports into the 11.0.1 worktree's baseline dir and write its sorted failing-title set.
#   zsh publish.sh <project> <tag-prefix>     e.g. chromium-headless-new ch | coarse-touch coarse | webkit wk
set -u
B=${0:A:h:h}; O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.1/docs/release-11.0.1/baseline-v11.0.0
P=$1; T=$2
mkdir -p $O/reports/$P
cp $B/reports/$T-*.json $B/reports/$T-*.log $O/reports/$P/
python3 -I $B/scripts/summary.py fails $B/reports/$T-*.json | awk -F'\t' '{print $2"\t"$3}' | LC_ALL=C sort -u > $O/$P-failed-titles.txt
python3 -I $B/scripts/summary.py all $B/reports/$T-*.json | awk -F'\t' '{print $4}' | sort | uniq -c > $O/reports/$P/status-counts.txt
echo "$P: $(wc -l < $O/$P-failed-titles.txt) failing titles; statuses:"; cat $O/reports/$P/status-counts.txt
