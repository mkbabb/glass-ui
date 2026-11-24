#!/usr/bin/env bash
# make-images.sh <out-dir>
# Eight 2880x1800 test pictures for the heavy carousel page, as WebP: a different plasma
# field per slide (photographic texture that compresses poorly, so each costs a real
# decode), with a large slide number drawn on it. Needs ImageMagick (magick) and cwebp.
# Skips files that already exist. Nothing here comes from another repository.
set -euo pipefail
OUT="$1"
mkdir -p "$OUT"
for i in 1 2 3 4 5 6 7 8; do
    f="$OUT/slide-$i.webp"
    [ -f "$f" ] && continue
    png="$OUT/.slide-$i.png"
    magick -seed "$((i * 97))" -size 2880x1800 "plasma:hsl($((i * 40)),60%,60%)-hsl($((i * 40 + 120)),60%,40%)" \
        -font /System/Library/Fonts/Supplemental/Arial.ttf -gravity center -pointsize 640 -fill 'rgba(255,255,255,0.55)' -annotate +0+0 "$i" "$png"
    cwebp -quiet -q 82 "$png" -o "$f"
    rm -f "$png"
done
ls -l "$OUT"
