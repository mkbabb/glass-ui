#!/bin/zsh
# F5 (D5 pass 2, the floor): the H2 battery on HEAD and on HEAD + F5.patch, both engines, every stage through the guard.
#   run-f5.sh <stage...>   stages: build-head base build-f5 f5 gates
# HEAD's E-7 static arm reads the main checkout's src (HEAD's bytes, read only), since the worktree is being patched meanwhile.
# WebKit runs hold the machine-wide lock (guarded --exclusive webkit); Chromium runs do not. Battery runs pass --light:
# the heavy-slot queue held both runs 25 min at load 12 (2026-10-15 14:16-14:42); one witness process runs at a time
# under the D5 harness lock, one battery at a time per this seat (the H2 rec4 precedent for single witnesses).
#   env: ONLY=E-3,E-4 (narrow a battery stage), ENGINES=chromium, TAG=<suffix> (a second reading of a stage)
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/pass-2/F5
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p2/F5/wt
O=$WT/.f5-out
GUARD=~/.claude/guard/guarded
stamp() { echo "# $1 $(date '+%F %T') load $(sysctl -n vm.loadavg)"; }
only() { [ -n "$ONLY" ] && echo "--only $ONLY"; }
mkdir -p $D/logs $D/json
cd $H
for s in "$@"; do
  case $s in
    # the scene app against the pristine worktree (HEAD's src), before the patch is applied
    build-head) { stamp "build head start"; $GUARD --light --timeout 15 -- node build.mjs $WT --label head --out $O; stamp "build head end exit $?"; } > $D/logs/build-head.log 2>&1 ;;
    build-f5) { stamp "build f5 start"; $GUARD --light --timeout 15 -- node build.mjs $WT --label f5 --out $O; stamp "build f5 end exit $?"; } > $D/logs/build-f5.log 2>&1 ;;
    base) for e in ${=ENGINES:-chromium webkit}; do X=(); [ $e = webkit ] && X=(--exclusive webkit)
            { stamp "HEAD battery $e start"; $GUARD --light $X --timeout 90 -- node run.mjs --build $O/builds/head --wt /Users/mkbabb/Programming/glass-ui --engines $e ${=$(only)} --out $D/json/head${TAG} --verbose; stamp "HEAD battery $e end exit $?"; } > $D/logs/battery-head${TAG}-$e.log 2>&1; done ;;
    f5) for e in ${=ENGINES:-chromium webkit}; do X=(); [ $e = webkit ] && X=(--exclusive webkit)
            { stamp "F5 battery $e start"; $GUARD --light $X --timeout 90 -- node run.mjs --build $O/builds/f5 --wt $WT --engines $e ${=$(only)} --out $D/json/f5${TAG} --verbose; stamp "F5 battery $e end exit $?"; } > $D/logs/battery-f5${TAG}-$e.log 2>&1; done ;;
    # build, typecheck and the full vitest suite on HEAD + F5 (the worktree, patch applied)
    gates) { cd $WT; stamp "build start"; $GUARD --timeout 20 -- npm run build; stamp "build end exit $?";
             stamp "typecheck start"; $GUARD --light --timeout 20 -- npm run typecheck; stamp "typecheck end exit $?";
             stamp "demo:dist:build start"; $GUARD --timeout 20 -- npm run demo:dist:build; stamp "demo:dist:build end exit $?";
             stamp "vitest start"; $GUARD --timeout 45 -- npx vitest run --maxWorkers=2; stamp "vitest end exit $?"; cd $H; } > $D/logs/gates${TAG}.log 2>&1 ;;
  esac
done
echo "run-f5 done $(date '+%F %T')"
