"""frames.py: crops the cited screencast frames into labelled contact sheets (WebP) under frames/.

usage: python3 -I frames.py <rawFramesDir> <samplesDir> <framesOutDir>
Raw frames are CDP Page.screencastFrame JPEGs named NNNN_<wallms>.jpg (film.mjs); they stay in
scratch and are never committed. Each tile is the raw frame nearest in wall time to the requested
offset (offset 0 = the anchor below); the tile label prints the requested and the actual offset.
Anchors: init/mobile = first sampled row whose #aap-highlights lost .inactive (the enter event);
autoplay = first row whose .current dot changed; playpause = the 'hover' mark.
"""
import glob, json, os, sys
from PIL import Image, ImageDraw

RAW, SAM, OUT = sys.argv[1:4]
os.makedirs(OUT, exist_ok=True)

def frames(scen):
    fs = []
    for p in sorted(glob.glob(os.path.join(RAW, scen, '*.jpg'))):
        w = float(os.path.basename(p).split('_')[1][:-4])
        fs.append((w, p))
    return fs

def rows(scen):
    S = json.load(open(os.path.join(SAM, f'{scen}.json')))
    return S, [r for r in S['rows'] if not r.get('none')]

def nearest(fs, wall):
    return min(fs, key=lambda f: abs(f[0] - wall))

def sheet(name, fs, anchor_wall, offsets, crop, cols, scale=1.0, notes=None):
    tiles = []
    for o in offsets:
        w, p = nearest(fs, anchor_wall + o)
        im = Image.open(p).convert('RGB').crop(crop)
        if scale != 1.0:
            im = im.resize((int(im.width * scale), int(im.height * scale)), Image.LANCZOS)
        lab = f'{o:+.0f} ms (frame {w - anchor_wall:+.0f})' + (f'  {notes(o)}' if notes else '')
        canvas = Image.new('RGB', (im.width, im.height + 18), (255, 255, 255))
        canvas.paste(im, (0, 18))
        ImageDraw.Draw(canvas).text((4, 3), lab, fill=(0, 0, 0))
        tiles.append(canvas)
    tw, th = tiles[0].size
    rows_n = (len(tiles) + cols - 1) // cols
    out = Image.new('RGB', (tw * cols + 2 * (cols - 1), th * rows_n + 2 * (rows_n - 1)), (200, 200, 200))
    for i, t in enumerate(tiles):
        out.paste(t, ((i % cols) * (tw + 2), (i // cols) * (th + 2)))
    path = os.path.join(OUT, f'{name}.webp')
    out.save(path, 'WEBP', quality=88, method=6)
    print(path, out.size, os.path.getsize(path))

# 1. intro at 1440 (slow scroll): dock region; the dock rests at y 812 (sticky, 32 px above the viewport bottom)
S, R = rows('init-slow')
i0 = next(i for i, r in enumerate(R) if 'inactive' not in r['aapCls'])
enter = R[i0]['wall']
fs = frames('init-slow')
offs = [-50, 0, 17, 33, 50, 83, 117, 150, 200, 250, 300, 350, 400, 450, 500, 533, 567, 600, 650, 700, 750, 800, 850, 900, 950, 1000, 1100, 1250, 1500, 2000]
sheet('intro-1440-sheet', fs, enter, offs, (430, 600, 1010, 900), 5)
sheet('intro-1440-goo-split', fs, enter, [450, 500, 517, 533, 550, 567, 583, 600, 633, 667, 700, 750], (480, 760, 960, 900), 4)

# 2. intro at 390 (mobile)
S, R = rows('mobile')
i0 = next(i for i, r in enumerate(R) if 'inactive' not in r['aapCls'])
sheet('intro-390-sheet', frames('mobile-init'), R[i0]['wall'], [0, 50, 150, 300, 450, 550, 650, 800, 1000, 1500], (0, 560, 390, 844), 5)

# 3. autoplay advance: capsule hand-off + slide motion
S, R = rows('autoplay')
k = next(i for i in range(1, len(R)) if R[i]['cur'] != R[i - 1]['cur'] and R[i - 1]['cur'] >= 0)
anchor = R[k]['wall']
fs = frames('autoplay-advance')
offs = [-200, 0, 25, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100]
sheet('advance-capsule-sheet', fs, anchor, offs, (540, 770, 900, 860), 2)
sheet('advance-gallery-sheet', fs, anchor, [-200, 0, 250, 500, 750, 1000], (0, 0, 1440, 900), 3, scale=0.3)

# 4. play/pause hover + press + toggle
S, R = rows('playpause')
m = {x['m']: x['t'] for x in S['marks']}
base = R[0]['wall'] - R[0]['t']  # wall = base + t
fs = frames('playpause')
offs = [0, 60, 120, 450, 520, 860, 900, 1600, 2300, 2400]
sheet('playpause-sheet', fs, base + m['hover'], offs, (800, 770, 900, 860), 5)
