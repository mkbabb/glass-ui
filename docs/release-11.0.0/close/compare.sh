#!/usr/bin/env bash
# compare.sh SUITE_DIR: per project, the 11.0.0 failure titles against the banked 10.1.4 close.
# The 10.1.4 set takes its port re-run (GLASS_UI_DEMO_URL set) for the specs listed in its
# port-files.txt, and the chunk runs for every other spec, so both sides ran on their own server.
cd "$(dirname "$0")"; D=$PWD; O=${1:?suite dir}
B=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-10.1.4/.claude/close
PF=$B/port-files.txt
for proj in chromium-headless-new coarse-touch webkit; do
  a=$(ls "$O" | grep -E "^${proj}(-chunk-..)?\.json$" | sed "s#^#$O/#")
  [ -n "$a" ] && node fails.mjs $a | sort -u > cmp-$proj-1100.tsv || : > cmp-$proj-1100.tsv
  b=$(ls "$B/v1014" | grep -E "^${proj}(-chunk-..)?\.json$" | sed "s#^#$B/v1014/#")
  { node fails.mjs $b | grep -vFf <(sed 's/$/\t/' "$PF");
    [ -f "$B/v1014/port-$proj.json" ] && node fails.mjs "$B/v1014/port-$proj.json"; } | sort -u > cmp-$proj-1014.tsv
  comm -23 cmp-$proj-1100.tsv cmp-$proj-1014.tsv > only-1100-$proj.tsv
  echo "$proj: 11.0.0 fails=$(wc -l < cmp-$proj-1100.tsv) 10.1.4 fails=$(wc -l < cmp-$proj-1014.tsv) only-11.0.0=$(wc -l < only-1100-$proj.tsv)"
done
