set -u
m9/g.sh chromium 30 'node probe.mjs /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8 dock-wi8 scenarios-m9/p9-persist-fine.json --port 5444 --engine chromium --out ../rows/m9-dev --no-strip'
m9/g.sh webkit 30 'node probe.mjs /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8 dock-wi8 scenarios-m9/p9-persist-fine.json --port 5444 --engine webkit --out ../rows/m9-dev --no-strip'
