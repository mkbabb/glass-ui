# tile.py <out.png> <scale> <png>...   one row of captures, scaled, 8 px apart, on grey
import sys
from PIL import Image
out, S, names = sys.argv[1], int(sys.argv[2]), sys.argv[3:]
ims = [Image.open(n).convert("RGB") for n in names]
W = sum(i.width * S + 8 for i in ims); H = max(i.height for i in ims) * S
o = Image.new("RGB", (W, H), (128, 128, 128)); x = 0
for i in ims:
    o.paste(i.resize((i.width * S, i.height * S), Image.LANCZOS), (x, 0)); x += i.width * S + 8
o.save(out)
