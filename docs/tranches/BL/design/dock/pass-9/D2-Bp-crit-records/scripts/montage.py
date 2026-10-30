# montage.py (D2 pass 9, fresh critic; reading aid, enters no row): lays several FM strips side by side, each cropped to its
# left part (the exchange slot sits beside "H") and its first N tiles, so the slot can be read by eye across runs.
#   python3 -I montage.py <out.png> <crop_frac> <max_h> <strip.png> ...
import sys
from PIL import Image, ImageDraw
out, frac, maxh, files = sys.argv[1], float(sys.argv[2]), int(sys.argv[3]), sys.argv[4:]
ims = []
for f in files:
    im = Image.open(f).convert("RGB")
    im = im.crop((0, 0, int(im.width * frac), min(im.height, maxh)))
    ims.append(im)
W = sum(i.width for i in ims) + 6 * (len(ims) - 1)
H = max(i.height for i in ims)
M = Image.new("RGB", (W, H), (40, 40, 40))
x = 0
for i in ims:
    M.paste(i, (x, 0)); x += i.width + 6
M.save(out)
print(out, M.size)
