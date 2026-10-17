set -u
for l in head s-w01ref minor4-nofl14 minor4; do for w in m2-text-contrast:m2 m3-non-text:m3 m6-separable-ladder:m6 m1-no-grey:m1 stack-host:stack; do
  node harness/${w%%:*}.mjs /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D3/p6/crit/wt/.d3out/caps/$l --gate chromium --verbose > pass-6/crit-records/verbose/${w##*:}-$l-c.txt 2>&1; done; done
for w in m2-text-contrast:m2 m6-separable-ladder:m6; do node harness/${w%%:*}.mjs /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D3/p6/crit/wt/.d3out/caps/minor4-r9 --gate chromium --verbose > pass-6/crit-records/verbose/${w##*:}-minor4-r9-c.txt 2>&1; done
g() { node pass-3/MS-g7.mjs $1 pass-6/crit-records/verbose/$2 pass-6/crit-records/verbose/$3 > pass-6/crit-records/$4; echo "$4: $(tail -1 pass-6/crit-records/$4)"; }
g m2 m2-head-c.txt m2-minor4-c.txt g7-m2-c.txt
g m3 m3-head-c.txt m3-minor4-c.txt g7-m3-c.txt
g dark m6-head-c.txt m6-minor4-c.txt g6-dark-raw-c.txt
g dark m6-head-c.txt m6-minor4-r9-c.txt g6-dark-r9-c.txt
g m2 m2-s-w01ref-c.txt m2-minor4-c.txt w011g6-m2-c.txt
g m3 m3-s-w01ref-c.txt m3-minor4-c.txt w011g6-m3-c.txt
g dark m6-minor4-nofl14-c.txt m6-minor4-c.txt fl14-dark-move-c.txt
echo "M-1 minor4: $(tail -1 pass-6/crit-records/verbose/m1-minor4-c.txt) · STACK minor4: $(tail -1 pass-6/crit-records/verbose/stack-minor4-c.txt) · STACK nofl14: $(tail -1 pass-6/crit-records/verbose/stack-minor4-nofl14-c.txt)"
