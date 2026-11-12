#!/bin/bash
# Build seat A's WebKit 2287 cells, one guarded --exclusive webkit call each, in order.
W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/release-11.0.2
L=$W/docs/release-11.0.2/logs
G=~/.claude/guard/guarded
wk() { # tree port name config grep [spec]
  (cd "$1" && GLASS_UI_DEMO_PORT=$2 GLASS_UI_DEMO_URL=http://localhost:$2 PI_REPORT=$L/$3.json \
    $G --exclusive webkit --timeout 20 -- npx playwright test -c tests-visual/$4 ${6:-release-11-0-2.spec.ts} --project=webkit --workers=1 -g "$5" > $L/$3.log 2>&1
   echo "$3 exit $?" >> $L/webkit-chain.out)
}
wk $W/.cache/red-v11.0.1/tree 5342 o223-red-v11.0.1-webkit release-11-0-2.config.ts "dark ·"
wk $W 5341 o240-green-webkit release-11-0-2.config.ts "press ·"
wk $W/.cache/red-v11.0.1/tree 5342 o240-v11.0.1-webkit release-11-0-2.config.ts "press ·"
wk $W/.cache/red-v11.0.0/tree 5343 o240-red-v11.0.0-webkit release-11-0-2.config.ts "press ·"
wk $W 5341 o266-tip-webkit release-11-0-2.config.ts "O-101 · .* · (reversal|mid-expand) ·" release-10-1-2.spec.ts
wk $W 5341 o266-probe-webkit _o266-probe.config.ts "probe" _o266-probe.spec.ts
echo done >> $L/webkit-chain.out
