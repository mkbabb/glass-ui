"""Compose one strip from frames of unlike sizes: each scaled to one height, in file
order, 6 px white gutters, at most 1600 px wide.
usage: python3 -I fold-compose.py <frame_dir> <out_dir> <out_name>
"""
import sys, glob, os
from PIL import Image

fr, out, name = sys.argv[1:4]
files = sorted(glob.glob(os.path.join(fr, '*.png')))
if not files:
    sys.exit('no frames')
ims = [Image.open(f).convert('RGB') for f in files]
h = min(420, max(i.height for i in ims))
ims = [i.resize((max(1, round(i.width * h / i.height)), h), Image.LANCZOS) for i in ims]
gap = 6
w = sum(i.width for i in ims) + gap * (len(ims) - 1)
sheet = Image.new('RGB', (w, h), 'white')
x = 0
for i in ims:
    sheet.paste(i, (x, 0))
    x += i.width + gap
if w > 1600:
    sheet = sheet.resize((1600, round(h * 1600 / w)), Image.LANCZOS)
os.makedirs(out, exist_ok=True)
p = os.path.join(out, name + '.png')
sheet.save(p, optimize=True)
print(p, sheet.size, len(ims), 'frames')
