#!/bin/sh
# pass 2 fold, round 3. Builds: .f3 (the fold-3 build), .f3p2 (pass2/prototype.patch as fold 2 left it: the bites),
# .f3plant (fold 3 without the forced-colors box-border stand-down). One heavy run of this seat at a time.
cd /Users/mkbabb/Programming/glass-ui
G=~/.claude/guard/guarded
R=docs/tranches/BL/design/dock-cluster/pass2-fold-3
W=.claude/worktrees/bl/cluster/pass2-fold-3
L=$R/logs
fr() { $G --timeout 20 -- node $R/tools/forced.mjs --site $W/$1/site --out $R --tag $2 > $L/chromium-$2-forced.log 2>&1; echo "rc=$?" >> $L/chromium-$2-forced.log; }
c3() { e=$1; t=$2; s=$3; shift 3; if [ $e = webkit ]; then X="--exclusive webkit"; else X=""; fi; $G $X --timeout ${TO:-40} -- node $R/tools/f3.mjs --engine $e --site $W/$s/site --out $R --tag $t "$@" > $L/$e-$t.log 2>&1; echo "rc=$?" >> $L/$e-$t.log; }
f2() { e=$1; t=$2; shift 2; if [ $e = webkit ]; then X="--exclusive webkit"; else X=""; fi; $G $X --timeout ${TO:-45} -- node $R/tools/probe-f2.mjs --engine $e --site $W/.f3/site --out $R --tag $t "$@" > $L/$e-$t.log 2>&1; echo "rc=$?" >> $L/$e-$t.log; }
# stage 1 (done first, 17:13-17:17): forced colors (Chromium), the build and both bites
[ -n "$SKIP_FORCED" ] || { fr .f3 f3; fr .f3p2 p2; fr .f3plant plant; }
# stage 2: Chromium, the hold cells on the fold-3 build, the keyboard-menu bite on the pass-2 build, the regressions
c3 chromium f3 .f3 --parts overlay,touch,kbmenu2
c3 chromium p2kb .f3p2 --parts kbmenu2 --comps after,after-sitedock
f2 chromium f3reg --parts clickhold,trigger,a11y --shots 0
# stage 3: WebKit (the webkit lock is machine-wide): a smoke of the 11.0.0 control first (did challenge 3's goto crash survive the reboot?)
TO=15 c3 webkit wksmoke .f3 --parts touch --comps before --ws 1440
c3 webkit f3 .f3 --parts overlay,touch,kbmenu2
c3 webkit p2kb .f3p2 --parts kbmenu2 --comps after,after-sitedock
f2 webkit f3reg --parts clickhold,trigger,a11y --shots 0
echo DONE > $L/run-f3.done
