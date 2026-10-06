#!/usr/bin/env bash
J=/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows
cnt(){ n=0; for r in "$@"; do n=$((n+$(grep -c '"type":"result"' $J/$r*/journal.jsonl 2>/dev/null))); done; echo $n; }
c0=$(cnt "$@"); until [ "$(cnt "$@")" -gt "$c0" ]; do sleep 30; done
for r in "$@"; do grep '"type":"result"' $J/$r*/journal.jsonl 2>/dev/null | tail -1 | grep -o '"agentId":"[^"]*"' | sed "s/^/$r /"; done
