"""Contact sheet from a filmstrip directory (log.json + PNGs) -> <dir>.webp; labels each tile with the page-time it shows.
usage: python3 -I contact.py frames/film-f1-1440 [cols]
"""
import json, sys
from PIL import Image, ImageDraw
d = sys.argv[1].rstrip('/'); cols = int(sys.argv[2]) if len(sys.argv) > 2 else 4
L = json.load(open(d + '/log.json'))['log']
ims = [Image.open(f"{d}/{e['file']}").convert('RGB') for e in L]
w, h = ims[0].size; s = 0.5; tw, th = int(w * s), int(h * s)
rows = (len(ims) + cols - 1) // cols
sheet = Image.new('RGB', (cols * tw, rows * (th + 22)), 'white')
dr = ImageDraw.Draw(sheet)
for k, (im, e) in enumerate(zip(ims, L)):
    x, y = (k % cols) * tw, (k // cols) * (th + 22)
    sheet.paste(im.resize((tw, th)), (x, y + 22))
    dr.text((x + 6, y + 5), f"t = {e['pageT']:.0f} ms", fill='black')
sheet.save(d + '.webp', quality=82)
print(d + '.webp', sheet.size)
