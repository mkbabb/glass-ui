#!/usr/bin/env bash
# make-patches.sh <plain-tree> <cured-tree> <out-dir>: cuts the cured tree's change into three
# patches against the plain tree (release/11.1.1), each applying alone with `patch -p1`:
#   scrim.patch    the detented Sheet's scrim law (sheet/motion.ts, its one call in
#                  SheetContent.vue, sheet-motion.test.ts), which 11.1.1 can take alone;
#   detents.patch  the detents hand-off (sheet/detents/use.ts and the one `onTouchmove`
#                  line in SheetContent.vue), atlas (d), which carries atlas's condition;
#   cure.patch     everything else: the hold, the outside layer, the scrim's press.
set -euo pipefail
PLAIN="$(cd "$1"; pwd)"; CURE="$(cd "$2"; pwd)"; OUT="$(cd "$3"; pwd)"
SC=src/components/sheet/SheetContent.vue
SCRIM_FILES="src/components/sheet/motion.ts tests/components/sheet/sheet-motion.test.ts"
DETENTS_FILES="src/components/sheet/detents/use.ts"
TMP="$(mktemp -d)"; trap 'rm -rf "$TMP"' EXIT
one() { diff -uN --label "a/$1" --label "b/$1" "$2" "$3" || true; }
# SheetContent split: the scrim call alone, the touchmove line alone, and the cured file
# less both.
python3 - "$PLAIN/$SC" "$CURE/$SC" "$TMP/sc-scrim" "$TMP/sc-detents" "$TMP/sc-rest" <<'PY'
import sys
plain, cure, scrim_out, detents_out, rest_out = sys.argv[1:]
p = open(plain).read(); c = open(cure).read()
old = "scrimDetentOpacity(sheetDetents.t.value) * (sheetDetents.opacity.value ?? 1)"
new = "scrimDetentOpacity(sheetDetents.t.value, ladder.value) *\n              (sheetDetents.opacity.value ?? 1)"
anchor = "                ...leave.attrs,\n"
touch = "                ...(detented ? { onTouchmove: sheetDetents.onTouchmove } : {}),\n"
assert p.count(old) == 1 and c.count(new) == 1
assert p.count(anchor) == 1 and c.count(anchor + touch) == 1 and p.count(touch) == 0
open(scrim_out, "w").write(p.replace(old, new))
open(detents_out, "w").write(p.replace(anchor, anchor + touch))
open(rest_out, "w").write(c.replace(new, old).replace(anchor + touch, anchor))
PY
{
  for f in $SCRIM_FILES; do one "$f" "$PLAIN/$f" "$CURE/$f"; done
  one "$SC" "$PLAIN/$SC" "$TMP/sc-scrim"
} > "$OUT/scrim.patch"
{
  for f in $DETENTS_FILES; do one "$f" "$PLAIN/$f" "$CURE/$f"; done
  one "$SC" "$PLAIN/$SC" "$TMP/sc-detents"
} > "$OUT/detents.patch"
{
  for f in $(cd "$CURE" && find src tests -type f \( -name '*.ts' -o -name '*.vue' -o -name '*.css' \) | sort); do
    case " $SCRIM_FILES $DETENTS_FILES $SC " in *" $f "*) continue;; esac
    if [ ! -f "$PLAIN/$f" ] || ! cmp -s "$PLAIN/$f" "$CURE/$f"; then one "$f" "$PLAIN/$f" "$CURE/$f"; fi
  done
  one "$SC" "$PLAIN/$SC" "$TMP/sc-rest"
} > "$OUT/cure.patch"
wc -l "$OUT/scrim.patch" "$OUT/detents.patch" "$OUT/cure.patch"
