#!/bin/zsh
# P-E3's one queue: the gates, the four builds, the Chromium stages, then the WebKit parts (each one guarded
# --exclusive webkit acquisition, queued, never skipped). One heavy run at a time: strictly sequential.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/E3
G=~/.claude/guard/guarded
cd $D
{
  zsh run-e3.sh $@
} 2>&1 | tee -a $D/logs/chain.txt
