"""Compose a film strip: frames in reading order, evenly spaced in animation time,
4 px white gutters, at most 1200 px wide. --cols N wraps into rows of N (a strip of
wide crops stays legible); --crop x,y,w,h crops every frame first.
usage: python3 -I compose.py <frame_dir> <out_dir> <prefix> <out_name> [--cols N] [--crop x,y,w,h] [--suffix -sel]
"""
import sys, glob, os
from PIL import Image

fr, out, prefix, name = sys.argv[1:5]
arg = lambda k, d=None: sys.argv[sys.argv.index(k) + 1] if k in sys.argv else d
cols = int(arg('--cols', 0))
crop = arg('--crop')
files = sorted(glob.glob(os.path.join(fr, prefix + '-[0-9][0-9].' + arg('--ext','png'))))
if not files:
    sys.exit('no frames for ' + prefix)
ims = [Image.open(f).convert('RGB') for f in files]
if crop:
    x, y, w, h = map(int, crop.split(','))
    ims = [i.crop((x, y, x + w, y + h)) for i in ims]
n = len(ims)
cols = cols or n
rows = (n + cols - 1) // cols
gap = 4
w, h = ims[0].size
s = min(3.0, (1200 - gap * (cols - 1)) / (w * cols))
tw, th = max(1, int(w * s)), max(1, int(h * s))
sheet = Image.new('RGB', (cols * tw + gap * (cols - 1), rows * th + gap * (rows - 1)), 'white')
for k, im in enumerate(ims):
    r, c = divmod(k, cols)
    sheet.paste(im.resize((tw, th), Image.LANCZOS), (c * (tw + gap), r * (th + gap)))
os.makedirs(out, exist_ok=True)
p = os.path.join(out, name + '.png')
sheet.save(p, optimize=True)
print(p, sheet.size, n, 'frames')
