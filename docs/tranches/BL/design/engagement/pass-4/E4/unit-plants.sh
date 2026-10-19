#!/bin/zsh
# P-E4: each pass-4 cure removed in turn, engage-stage.test.ts run, the source restored byte-identical.
# Then the four arms (KEYBOARD_VEIL × POINTER_STAGE) each run the file clean. vitest through the guard, --maxWorkers=2.
WT=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D5/p4/E4/wt
S=$WT/src/composables/motion/engage/stage.ts
U=$WT/src/composables/motion/engage/useEngage.ts
G=~/.claude/guard/guarded
cd $WT
run() { $G --light --timeout 10 -- npx vitest run --maxWorkers=2 tests/composables/motion/engage-stage.test.ts 2>&1 | grep -E "^ +(×|✓)|Tests  " ; }
cp $S $WT/../.e4-stage.bak.$$; cp $U $WT/../.e4-use.bak.$$
plant() { print -- "## plant: $1"; run; cp $WT/../.e4-stage.bak.$$ $S; cp $WT/../.e4-use.bak.$$ $U; cmp -s $WT/../.e4-stage.bak.$$ $S && cmp -s $WT/../.e4-use.bak.$$ $U && print -- "restored byte-identical"; }
sed -i '' 's|    if (h.own\[0\]) host.style.setProperty("position-anchor", h.own\[0\], h.own\[1\]);|    if (false) host.style.setProperty("position-anchor", h.own[0], h.own[1]);|' $S; plant "anchor-lost (the consumer's anchor is not written back)"
sed -i '' 's|    host.addEventListener("wheel", onWheel, { passive: false });||' $S; plant "wheel-chain (no wheel forwarding on a promoted host)"
sed -i '' 's|                POINTER_STAGE === "every" \|\||                true \|\||' $U; plant "promote-every-pointer (the pointer arm ignored)"
sed -i '' 's|    setVeil(withVeil \&\& h.footprint !== null);|    setVeil(withVeil);|' $S; plant "veil-in-place (an in-place hold raises the veil)"
for kv in true false; do for ps in every coarse; do
  sed -i '' "s/^export const KEYBOARD_VEIL = .*;/export const KEYBOARD_VEIL = $kv;/; s/^export const POINTER_STAGE: \"every\" | \"coarse\" = .*;/export const POINTER_STAGE: \"every\" | \"coarse\" = \"$ps\";/" $S
  print -- "## arm KEYBOARD_VEIL=$kv POINTER_STAGE=$ps: $(grep -c "^export const KEYBOARD_VEIL = $kv;" $S)$(grep -c "= \"$ps\";" $S)"; run | tail -1
done; done
cp $WT/../.e4-stage.bak.$$ $S; rm -f $WT/../.e4-stage.bak.$$ $WT/../.e4-use.bak.$$
print -- "final restore: $(grep -n '^export const KEYBOARD_VEIL\|^export const POINTER_STAGE' $S | tr '\n' ' ')"
