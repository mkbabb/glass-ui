#!/bin/bash
# D4-Dp-spec/probes/make-patch.sh · the route patch relative to HEAD + floor v2: each touched file's base is HEAD's
# copy with floor-v2.patch applied (in a scratch tree), and the diff is `git diff --no-index` (no repository write).
#   bash make-patch.sh <worktree> <scratch base dir> <out patch>
# The base dir must lie outside every git repository: inside one, `git apply` runs as a subdirectory apply and
# skips every path silently (the first cut of this patch lost floor v2 that way).
set -e
WT=$1; B=$2; P=$3
FV2=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-3/floor-v2.patch
CHANGED="src/components/toggle-group/ToggleGroup.vue src/components/toggle-group/ToggleGroupItem.vue src/components/toggle-group/styles.css src/components/toggle-group/index.ts src/index.ts src/components/fading-scroll/FadingScroll.vue MIGRATION.md tests/styles/radius-role-canon.test.ts tests/components/ui/toggle-group/ToggleGroup.test.ts tests/components/fading-scroll.contract.test.ts"
ADDED="src/components/toggle-group/shape.ts tests/components/ui/toggle-group/item-attrs.test.ts"
rm -rf "$B"; mkdir -p "$B"
for f in $CHANGED; do mkdir -p "$B/$(dirname $f)"; git -C "$WT" show HEAD:$f > "$B/$f"; done
inc=(); for f in $CHANGED; do inc+=(--include="$f"); done
(cd "$B" && git apply "${inc[@]}" "$FV2")
: > "$P"
for f in $CHANGED; do git diff --no-index --src-prefix=a/ --dst-prefix=b/ "$B/$f" "$WT/$f" | sed -e "s#a$B/#a/#g; s#b$WT/#b/#g" >> "$P" || true; done
for f in $ADDED; do (cd "$WT" && git diff --no-index --src-prefix=a/ --dst-prefix=b/ /dev/null "$f") >> "$P" || true; done
