"""Contact sheet of the worm stills (frames/worm-frames-r1-*.png) labelled with page ms.
usage: python3 -I contact.py"""
import gzip, json, os
from PIL import Image, ImageDraw
HERE = os.path.dirname(os.path.abspath(__file__)); FR = os.path.join(HERE, '..', 'frames'); DA = os.path.join(HERE, '..', 'data')
shots = dict(json.load(gzip.open(os.path.join(DA, 'worm-frames-r1-1440.json.gz')))['shots'])
tiles = []
for k in range(6):
    im = Image.open(os.path.join(FR, f'worm-frames-r1-{k}.png')).convert('RGB')
    lab = 'rest' if k == 0 else f'+{shots[k]} ms (screenshot start)'
    c = Image.new('RGB', (im.width, im.height + 18), 'white'); c.paste(im, (0, 18))
    ImageDraw.Draw(c).text((4, 3), lab, fill='black'); tiles.append(c)
w = max(t.width for t in tiles); sheet = Image.new('RGB', (w, sum(t.height for t in tiles)), 'white')
y = 0
for t in tiles:
    sheet.paste(t, (0, y)); y += t.height
sheet.save(os.path.join(FR, 'worm-hop-1to5-sheet.webp'), quality=90)
for k in range(6):
    os.remove(os.path.join(FR, f'worm-frames-r1-{k}.png'))
print('ok', sheet.size)
