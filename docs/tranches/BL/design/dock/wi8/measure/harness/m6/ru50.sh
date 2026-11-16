#!/usr/bin/env bash
# ru50.sh: RU-50's reading. s2's page under s2probe (writes per cap over 600 ms, span, client box, room) and the
# one-pixel sweep under both laws, on the worktree's dev server, in Chromium and WebKit 2287; then G-14's four
# fit-law sites in the three projects (m5/g14.sh, tag m6ru50).
set -u
H="$(cd "$(dirname "$0")/.." && pwd)"; L="$H/../logs"; W=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8; G=~/.claude/guard/guarded
cd "$H"
$G --timeout 20 -- m5/devsession.sh 5420 sh -c "node /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/docs/tranches/BL/design/dock/wi8/measure/harness/m6/s2probe.mjs 5420 chromium > $L/m6-ru50-s2probe.chromium.txt 2>&1; node /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/docs/tranches/BL/design/dock/wi8/measure/harness/m6/sweep.mjs 5420 ru50-room --engine chromium --law room; node /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/docs/tranches/BL/design/dock/wi8/measure/harness/m6/sweep.mjs 5420 ru50-client --engine chromium" > "$L/m6-ru50-chromium.log" 2>&1
$G --exclusive webkit --timeout 20 -- m5/devsession.sh 5420 sh -c "node /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/docs/tranches/BL/design/dock/wi8/measure/harness/m6/s2probe.mjs 5420 webkit > $L/m6-ru50-s2probe.webkit.txt 2>&1; node /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/docs/tranches/BL/design/dock/wi8/measure/harness/m6/sweep.mjs 5420 ru50-room --engine webkit --law room; node /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/docs/tranches/BL/design/dock/wi8/measure/harness/m6/sweep.mjs 5420 ru50-client --engine webkit" > "$L/m6-ru50-webkit.log" 2>&1
"$H/m5/g14.sh" "$W" m6ru50 5413 both release-10-1-5.spec.ts:723 release-10-1-5.spec.ts:1189 release-10-1-5.spec.ts:1412 release-10-1-5.spec.ts:2343
echo "== ru50 done $(date '+%H:%M:%S')" >> "$L/m6-ru50-chromium.log"
