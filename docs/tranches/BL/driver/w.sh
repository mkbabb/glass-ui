#!/usr/bin/env bash
# one line per new journal event; one STALL line per run whose newest seat transcript is >12 min quiet
J=/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows
S=$(mktemp -d)
for r in "$@"; do d=$(ls -d $J/$r* 2>/dev/null); wc -l < $d/journal.jsonl 2>/dev/null | tr -d ' ' > $S/$r.seen || echo 0 > $S/$r.seen; done
while true; do
  for r in "$@"; do
    d=$(ls -d $J/$r* 2>/dev/null) || continue; n=$(wc -l < $d/journal.jsonl | tr -d ' '); s=$(cat $S/$r.seen)
    if [ "$n" -gt "$s" ]; then
      tail -n $((n-s)) $d/journal.jsonl | while read -r l; do t=$(echo "$l" | grep -o '"type":"[a-z]*"' | head -1 | cut -d'"' -f4); lb=$(echo "$l" | grep -o '"label":"[^"]*"' | head -1 | cut -d'"' -f4); a=$(echo "$l" | grep -o '"agentId":"[^"]*"' | head -1 | cut -d'"' -f4); echo "$r: $t $lb $a"; done
      echo $n > $S/$r.seen
    fi
    f=$(ls -t $d/agent-*.jsonl 2>/dev/null | head -1); [ -z "$f" ] && continue
    age=$(( $(date +%s) - $(stat -f %m "$f") ))
    if [ $age -gt 720 ] && [ ! -f $S/$r.stall ]; then echo "$r: STALL ${age}s $(basename $f)"; touch $S/$r.stall; fi
    [ $age -le 720 ] && rm -f $S/$r.stall
  done
  sleep 20
done
