#!/bin/bash
# regenerate route.patch (the route over HEAD + floor v2) from the worktree, with no git write
set -e
T=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3
S=/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/D4/p3/D4-F-spec
FILES="src/components/toggle-group/ToggleGroupItem.vue src/components/toggle-group/styles.css src/components/fading-scroll/FadingScroll.vue tests/components/ui/toggle-group/ToggleGroup.test.ts tests/components/fading-scroll.contract.test.ts MIGRATION.md"
rm -rf $S/base; mkdir -p $S/base/a $S/base/b
cd $S/wt
for f in $FILES; do mkdir -p $S/base/a/$(dirname $f) $S/base/b/$(dirname $f); git show HEAD:$f > $S/base/a/$f; cp $f $S/base/b/$f; done
cd $S/base/a
for f in $FILES; do GIT_CEILING_DIRECTORIES=$S/base git apply --include="$f" $T/floor-v2.patch; done
cd $S/base
for f in $FILES; do git diff --no-index --no-color a/$f b/$f || true; done | sed -e "s|^diff --git a/a/\(.*\) b/b/|diff --git a/\1 b/|" -e "s|^--- a/a/|--- a/|" -e "s|^+++ b/b/|+++ b/|" > $S/route-r2.patch
grep -c '^diff' $S/route-r2.patch
