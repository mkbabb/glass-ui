#!/bin/bash
S=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D2/p2/D2-Bp-proto
H=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness
D=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock
mkdir -p $S/rec/plants
for spec in $PLANTS; do
  name=${spec%%:*}; what=${spec#*:}
  rm -rf $S/wt/src && cp -R $S/final/src $S/wt/src
  python3 $S/variants.py $name $S/wt > $S/rec/plants/$name.log 2>&1 || { echo "plant failed $name"; cat $S/rec/plants/$name.log; continue; }
  (cd $S/wt && git diff --no-index $S/final/src src > $S/rec/plants/$name.diff 2>/dev/null)
  node $H/build.mjs $S/wt --out $S/out --label $name --no-demo >> $S/rec/plants/$name.log 2>&1
  rm -rf $S/wt/src && cp -R $S/final/src $S/wt/src
  B=$S/out/builds/$name
  { uptime
  case $what in
    w3) (cd $H && node w3-morph.mjs --build $B --adapter $D/pass-2/adapter-floor.mjs --engine chromium --out $S/out/plants) ;;
    w3+stretch) (cd $H && node w3-morph.mjs --build $B --adapter $D/pass-2/adapter-floor.mjs --engine chromium --out $S/out/plants); (cd $D/pass-2 && node D2-Bp-probes.mjs --build $B --adapter adapter-floor.mjs --arm stretch --engine chromium) ;;
    w4) (cd $H && node w4-state.mjs --build $B --adapter $D/pass-2/adapter-floor.mjs --engine chromium --out $S/out/plants) ;;
    idle) (cd $D/pass-2 && node D2-Bp-probes.mjs --build $B --adapter adapter-floor.mjs --arm idle --engine chromium) ;;
    rotate) (cd $D/pass-2 && node D2-Bp-probes.mjs --build $B --adapter adapter-floor.mjs --arm rotate --engine chromium) ;;
  esac
  uptime; } >> $S/rec/plants/$name.log 2>&1
  echo "done $name"
done
diff -r $S/final/src $S/wt/src && echo "worktree src restored"
