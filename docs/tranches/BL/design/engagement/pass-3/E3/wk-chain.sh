#!/bin/zsh
# P-E3's WebKit queue: two acquisitions of the one machine-wide WebKit lock, each queued (never skipped), in sequence.
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-3/E3
G=~/.claude/guard/guarded
cd $D
for part in ab c; do
  print -- "# queue wk-batch $part $(date '+%F %T') load $(sysctl -n vm.loadavg)"
  $G --exclusive webkit --timeout 90 -- zsh wk-batch.sh $part
  print -- "# wk-batch $part exit $? $(date '+%F %T')"
done
