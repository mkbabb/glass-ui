#!/bin/zsh
# Regenerate route.patch (the route over HEAD + floor v3) from the seat's worktree, with no git write: each route file's
# floor-v3 base is HEAD's blob with floor-v3.patch's section for that file applied by `patch`, in a scratch dir.
#   mkpatch.sh <worktree> <out.patch>
set -e
WT=$1; OUT=$2
F3=/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/tile/pass-4/floor-v3.patch
FILES=(src/components/toggle-group/ToggleGroupItem.vue src/components/toggle-group/styles.css tests/components/ui/toggle-group/ToggleGroup.test.ts MIGRATION.md demo/stories/forms/toggle.vue)
T=$(mktemp -d "${TMPDIR:-/tmp}/d4f-mkpatch.XXXX"); trap "rm -rf $T" EXIT
: > $OUT
for f in $FILES; do
  mkdir -p $T/base/${f:h}
  git -C $WT show HEAD:$f > $T/base/$f
  python3 - "$F3" "$f" > $T/sec.patch <<'PY'
import sys, re
text = open(sys.argv[1]).read(); f = sys.argv[2]
parts = re.split(r'(?m)^(?=diff --git )', text)
print(''.join(p for p in parts if p.startswith(f'diff --git a/{f} b/{f}')), end='')
PY
  [[ -s $T/sec.patch ]] && patch -s -p1 -d $T/base < $T/sec.patch
  diff -u --label a/$f --label b/$f $T/base/$f $WT/$f >> $OUT || true
done
echo "$(grep -c '^--- a/' $OUT) files, $(grep -c '^+[^+]' $OUT) + / $(grep -c '^-[^-]' $OUT) −, sha1 $(shasum $OUT | cut -c1-8)"
