"""Compose film strips: frames left to right, evenly spaced in animation time,
4 px white gutters, integer upscale so small crops stay legible, <= 1200 px wide.
usage: python3 -I compose.py <frame_dir> <out_dir> <prefix> [<out_name>] [--scale N]
"""
import sys, glob, os
from PIL import Image

fr, out, prefix = sys.argv[1], sys.argv[2], sys.argv[3]
name = sys.argv[4] if len(sys.argv) > 4 and not sys.argv[4].startswith('--') else prefix
scale = int(sys.argv[sys.argv.index('--scale') + 1]) if '--scale' in sys.argv else 0
files = sorted(glob.glob(os.path.join(fr, prefix + '-[0-9][0-9].png')))
if not files:
    sys.exit('no frames for ' + prefix)
ims = [Image.open(f).convert('RGB') for f in files]
w, h = ims[0].size
gap = 4
if not scale:
    scale = max(1, min(3, (1200 - gap * (len(ims) - 1)) // (w * len(ims))))
W = len(ims) * w * scale + gap * (len(ims) - 1)
if W > 1200:  # fall back to a downscale to fit
    s = (1200 - gap * (len(ims) - 1)) / (w * len(ims))
    ims = [i.resize((max(1, int(w * s)), max(1, int(h * s))), Image.LANCZOS) for i in ims]
    w, h, scale = ims[0].size[0], ims[0].size[1], 1
    W = len(ims) * w + gap * (len(ims) - 1)
sheet = Image.new('RGB', (W, h * scale), 'white')
for k, im in enumerate(ims):
    if scale > 1:
        im = im.resize((w * scale, h * scale), Image.LANCZOS)
    sheet.paste(im, (k * (w * scale + gap), 0))
os.makedirs(out, exist_ok=True)
p = os.path.join(out, name + '.png')
sheet.save(p, optimize=True)
print(p, sheet.size, len(files), 'frames')
