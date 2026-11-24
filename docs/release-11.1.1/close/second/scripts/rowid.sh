#!/bin/zsh
# The 11.1.1 second close: row ids in src comments. (1) every line `git diff v11.1.0 HEAD -- src`
# adds, searched for this release's ids and the record vocabulary; (2) every line of src at HEAD
# and at v11.1.0 searched for ids, then compared by text (path and line content, not line number),
# so an id HEAD carries that v11.1.0 did not shows on its own.
#   zsh rowid.sh <outdir>
set -u; export LC_ALL=C
WT=${0:A:h:h:h:h:h:h}; O=${1:A}; mkdir -p $O; cd $WT
IDS='\bO-[0-9]{1,3}\b|\bLT-[0-9]+|\bK[1-4]b?\b|\bRU-[0-9]+|\b[Rr]ow [0-9]+\b|\b[Rr]ound [0-9]+\b|\b[Ff]ix [0-9]+\b|\b11\.1\.[0-9]\b|\bGL-[0-9]+|\bLF-[0-9]+|\b[A-Z]{1,3}-[0-9]{1,3}\b|20[0-9]{2}-[0-9]{2}-[0-9]{2}|\b(tranche|critique|critic|orchestrator|witness|ruling|owner|scope|probe|film|plant|gate|seat)\b|π|\b(atlas|hassio|gregg|value\.js|fourier|daraksha)\b|\bseat (row|[0-9])'
git diff v11.1.0 HEAD -- src | grep -E '^\+' | grep -vE '^\+\+\+ ' > $O/src-added.txt
grep -nE "$IDS" $O/src-added.txt > $O/src-added-id-grep.txt
for ref in HEAD v11.1.0; do
  git grep -InE "$IDS" $ref -- src | sed "s/^$ref://" | sed -E 's/^([^:]+):[0-9]+:/\1:/' | sort -u > $O/src-id-lines.$ref.txt
done
comm -23 $O/src-id-lines.HEAD.txt $O/src-id-lines.v11.1.0.txt > $O/src-id-lines.head-only.txt
echo "added lines $(wc -l < $O/src-added.txt | tr -d ' '); id hits in added lines $(wc -l < $O/src-added-id-grep.txt | tr -d ' '); id lines HEAD $(wc -l < $O/src-id-lines.HEAD.txt | tr -d ' ') v11.1.0 $(wc -l < $O/src-id-lines.v11.1.0.txt | tr -d ' ') head-only $(wc -l < $O/src-id-lines.head-only.txt | tr -d ' ')"
