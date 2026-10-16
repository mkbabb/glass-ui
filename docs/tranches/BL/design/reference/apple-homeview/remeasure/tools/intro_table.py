"""Flatten an intro probe run into a per-frame channel table (CSV) keyed to the activation frame.
usage: python3 -I intro_table.py data/intro-jump-r1-1440.json  -> data/intro-jump-r1-1440.csv + summary on stdout
"""
import csv, json, re, sys

def mat(s):
    m = re.match(r'matrix\(([^)]*)\)', s or '')
    if not m:
        return [1, 0, 0, 1, 0, 0] if s in ('none', '') else None
    return [float(v) for v in m.group(1).split(',')]

def stv(st, key):
    m = re.search(key + r':\s*([-\d.]+)', st or '')
    return float(m.group(1)) if m else None

def tr3d(st):
    m = re.search(r'translate3d\(([-\d.]+)px,\s*([-\d.]+)px', st or '')
    return (float(m.group(1)), float(m.group(2))) if m else (None, None)

def alpha(c):
    m = re.match(r'rgba?\(([^)]*)\)', c)
    p = [float(x) for x in m.group(1).replace('/', ',').split(',')]
    return p[3] if len(p) > 3 else 1.0

def blur(s):
    m = re.search(r'blur\(([\d.]+)px', s or '')
    return float(m.group(1)) if m else 0.0

def rows(d):
    F = d['frames']
    ta = next((f['t'] for f in F if 'activated' in f['cls']), F[0]['t'])
    out = []
    for f in F:
        im = mat(f['intro']['tf']) or [0] * 6
        _, aapY = tr3d(f['aapSt'])
        out.append(dict(
            t=round(f['t'] - ta, 2), sy=f['sy'], aapY=aapY, aapRectY=f['aap']['y'],
            introDisp=f['intro']['disp'], introOp=f['intro']['op'], introScale=round(im[0], 5), introTx=im[4],
            introW=stv(f['intro']['st'], 'width'), introH=stv(f['intro']['st'], 'height'),
            introRectW=f['intro']['w'], introRectH=f['intro']['h'],
            dW=stv(f['bgD']['st'], 'width'), dH=stv(f['bgD']['st'], 'height'), dScale=stv(f['bgD']['st'], '--scale'),
            dOp=f['bgD']['op'], dBlur=blur(f['bgD']['bf']), dBgA=alpha(f['bgD']['bg']), dRectW=f['bgD']['w'],
            bW=stv(f['bgB']['st'], 'width'), bScale=(mat(f['bgB']['tf']) or [None])[0], bOp=f['bgB']['op'], bRectW=f['bgB']['w'], bBlur=blur(f['bgB']['bf']),
            btnOp=f['btn']['op'], btnScale=(mat(f['btn']['tf']) or [None])[0],
            li0Op=f['li'][0][0], li6Op=f['li'][6][0], liScale=(mat(f['li'][3][1]) or [None])[0],
            capW=f['lw'][0], dot1W=f['lw'][1], pi=f['pi'], ap=f['ap'], fillW=f['aw'],
            dotsX=f['lx'][0], cls=f['cls'].replace('all-access-pass', '').replace('aap-media-card-gallery', '').strip(),
        ))
    return out

if __name__ == '__main__':
    src = sys.argv[1]
    d = json.load(open(src))
    R = rows(d)
    with open(src.replace('.json', '.csv'), 'w', newline='') as fh:
        w = csv.DictWriter(fh, fieldnames=list(R[0].keys())); w.writeheader(); w.writerows(R)
    # change log: print a row whenever a rounded channel changes (compact)
    keys = ['aapY', 'introDisp', 'introOp', 'introScale', 'introW', 'introH', 'dW', 'dH', 'dScale', 'dOp', 'dBlur', 'dBgA', 'bW', 'bScale', 'bOp', 'btnOp', 'btnScale', 'li0Op', 'li6Op', 'capW', 'pi']
    print('meta', d['meta'])
    print('t', *keys, sep='\t')
    prev = None
    for r in R:
        if r['t'] < -50 or r['t'] > 2200: continue
        cur = tuple(round(r[k], 2) if isinstance(r[k], float) else r[k] for k in keys)
        if cur != prev: print(r['t'], *cur, sep='\t')
        prev = cur
