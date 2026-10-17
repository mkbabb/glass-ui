#!/bin/zsh
# the H5 chain's resume after the 2026-10-17 08:15 kernel-zone stop (FORMATION-PROGRESS): chain.sh stopped while
# `webkit t6` waited for the WebKit lock; the seat worktree and its builds were removed. Harness unchanged
# (bfe1b6beddb0, 41 files, re-hashed before resume). This rebuilds the worktree's route and attack builds at the
# resume HEAD (src byte-identical to a098c264d: `git diff a098c264d HEAD -- src` empty), re-makes the stub builds,
# and runs the parts chain.sh had not reached, serially, each its own guarded call (WebKit parts their own
# --exclusive webkit hold). logs/chain.log gets each part's start and exit.
R=${0:A:h}/run-h5.sh; C=${0:A:h}/logs/chain.log
HN=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/harness; O=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p5/h5/out
st() { echo "$(date '+%F %T') $* · load $(sysctl -n vm.loadavg)" >> $C; }
step() { st "start $*"; $R "$@"; st "exit $? $*"; }
st "RESUME at $(cd /Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p5/h5/wt && git rev-parse --short HEAD) · harness $(cd $HN && node -e 'import("./lib.mjs").then(m=>console.log(m.HARNESS.hash))')"
step route dp
step build dp
step stub dp chromium
step route f
step build f
step selftest webkit t6 --only T-6
step selftest webkit w --only W-A,W-B,W-C,W-D,W-E
step selftest webkit t8 --only T-8
step webkit-reads
step unit
D=${0:A:h}
st "start xscript"; ~/.claude/guard/guarded --light --timeout 10 -- zsh -c "node $HN/transcribe.mjs --selftest --out $O; echo exit \$?; node $HN/transcribe.mjs --routes $D/routes/D4-Dp,$D/routes/D4-F --out $O; echo exit \$?; node $HN/transcribe.mjs --routes $D/../../pass-4/D4-Dp-spec/route,$D/../../pass-4/D4-F-spec/route --out $O; echo exit \$?" > $D/logs/xscript.log 2>&1; st "exit $? xscript"
st "CHAIN-DONE"
