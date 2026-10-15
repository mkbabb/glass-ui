"""model.py: the dock intro choreography re-simulated from apple.com's shipped source.

Source (main.built.js, read 2026-10-15): module "+kLl" (AllAccessPass base: playIntroAnimation),
module "ym6t" (MediaCardGalleryControl: bubble springs + dot springs), module "oDN9" (SpringLayer:
semi-implicit Euler, mass 1, fixed dt = 1/60 s, accumulator capped at 1/30 s per rAF, render state
interpolated between the last two steps, rest when |x - target| < 0.001 and |v| < 0.001;
{duration d, bounce b} maps to k = (2*pi/d)^2, c = (1 - b)*4*pi/d).

Schedule (anim.addTween durations, seconds, all started at the enter event t = 0):
  t=0      snap: intro{scale 1.3, x -15, w 30, h 80, opacity 0}; aap.y 180;
           bubble_i.x = 0.5*vw - 0.5*bounds_i.w - bounds_i.x ; bubble_i.--alpha 0;
           bg0{w 40, h 36, --scale 1.3}; bg1{w 80, h 36, --scale 0}; dots x 36 ; --progress-intro 0
  0.020    .activated added (CSS opacity 0->1 on elements and backgrounds), intro opacity 1, intro.scale -> 0.8
  0.030    aap.y -> 0
  0.050    intro.x -> -28, intro.w -> 56
  0.150    intro.h -> 56
  0.300    bg0.--scale -> 1
  0.500    bubble0.x -> 0 ; bg0.w -> bounds0.w
  0.520    intro element hidden (opacity 0, display none)
  0.540    bubble1.x -> 0 ; bg1.--scale -> 1
  0.700    bg0.h -> bounds0.h ; bg1.w -> bounds1.w ; bg1.h -> bounds1.h
  0.740+0.02*i  dot_i.x -> 0  (i = 0..6); at i = 0 also --progress-intro -> 1
  1.000    bubble0/1 --alpha -> 1
CSS (overview.built.css): dot items opacity 0->1 100ms ease-in delay 740ms, scale .5->1 instant;
play button opacity 0->1 100ms ease-in delay 940ms, transform scale(.5)->1 200ms ease-out delay 940ms.

usage: python3 -I model.py <bounds.json|-> <out.json>
  bounds.json: {"vw":1440, "b0":[x,y,w,h], "b1":[x,y,w,h]}  (rest rects of the two bubbles)
"""
import json, math, sys

DT = 1 / 60

def kc(d, b):
    return (2 * math.pi / d) ** 2, (1 - b) * 4 * math.pi / d

class Spring:
    def __init__(self, k, c, x):
        self.k, self.c, self.x, self.v, self.target = k, c, x, 0.0, x
    def step(self):
        if abs(self.x - self.target) < 1e-3 and abs(self.v) < 1e-3:
            self.x, self.v = self.target, 0.0
            return
        self.v += (-self.k * (self.x - self.target) - self.c * self.v) * DT
        self.x += self.v * DT

def simulate(vw, b0, b1, T=2.0):
    S = {
        'intro.x': Spring(100, 8, -15), 'intro.w': Spring(100, 8, 30), 'intro.h': Spring(100, 8, 80),
        'intro.scale': Spring(*kc(.5, 0), 1.3), 'aap.y': Spring(100, 8, 180),
        'b0.x': Spring(100, 20, .5 * vw - .5 * b0[2] - b0[0]), 'b0.alpha': Spring(100, 20, 0),
        'b1.x': Spring(100, 20, .5 * vw - .5 * b1[2] - b1[0]), 'b1.alpha': Spring(100, 20, 0),
        'bg0.w': Spring(100, 10, 40), 'bg0.h': Spring(100, 10, 36), 'bg0.scale': Spring(*kc(.3, 0), 1.3),
        'bg1.w': Spring(100, 10, 80), 'bg1.h': Spring(100, 10, 36), 'bg1.scale': Spring(*kc(.65, 0), 0),
        'pIntro': Spring(200, 20, 0),
    }
    for i in range(7):
        S[f'dot{i}.x'] = Spring(200, 20, 36)
    sched = [(0.020, [('intro.scale', .8)]), (0.030, [('aap.y', 0)]), (0.050, [('intro.x', -28), ('intro.w', 56)]),
             (0.150, [('intro.h', 56)]), (0.300, [('bg0.scale', 1)]), (0.500, [('b0.x', 0), ('bg0.w', b0[2])]),
             (0.540, [('b1.x', 0), ('bg1.scale', 1)]), (0.700, [('bg0.h', b0[3]), ('bg1.w', b1[2]), ('bg1.h', b1[3])]),
             (1.000, [('b0.alpha', 1), ('b1.alpha', 1)])]
    sched += [(0.740 + 0.02 * i, [(f'dot{i}.x', 0)] + ([('pIntro', 1)] if i == 0 else [])) for i in range(7)]
    sched.sort()
    rows, si = [], 0
    n = int(T / DT) + 1
    for f in range(n):
        t = f * DT
        while si < len(sched) and sched[si][0] <= t + 1e-9:
            for k, v in sched[si][1]:
                S[k].target = v
            si += 1
        for s in S.values():
            s.step()
        r = {'t': round(t * 1000, 2)}
        r.update({k: round(s.x, 4) for k, s in S.items()})
        rows.append(r)
    return rows

def metrics(rows, key, target, start_ms):
    xs = [(r['t'], r[key]) for r in rows if r['t'] >= start_ms]
    x0 = xs[0][1]
    span = target - x0
    peak = max(xs, key=lambda p: (p[1] - target) * (1 if span > 0 else -1))
    over = (peak[1] - target) / span * 100 if span else 0
    settle = None
    for i in range(len(xs)):
        if all(abs(x - target) <= 0.5 for _, x in xs[i:]):
            settle = xs[i][0] - start_ms
            break
    return {'key': key, 'from': x0, 'to': target, 'overshoot_pct': round(over, 2), 'peak_ms': round(peak[0] - start_ms, 1), 'settle_0p5px_ms': settle}

if __name__ == '__main__':
    src, out = sys.argv[1], sys.argv[2]
    B = json.load(open(src)) if src != '-' else {'vw': 1440, 'b0': [0, 0, 400, 56], 'b1': [0, 0, 56, 56]}
    rows = simulate(B['vw'], B['b0'], B['b1'])
    m = [metrics(rows, 'aap.y', 0, 30), metrics(rows, 'bg0.w', B['b0'][2], 500), metrics(rows, 'bg1.w', B['b1'][2], 700),
         metrics(rows, 'bg0.h', B['b0'][3], 700), metrics(rows, 'intro.w', 56, 50), metrics(rows, 'intro.h', 56, 150),
         metrics(rows, 'b0.x', 0, 500), metrics(rows, 'b1.x', 0, 540), metrics(rows, 'dot0.x', 0, 740)]
    json.dump({'bounds': B, 'metrics': m, 'rows': rows}, open(out, 'w'))
    for x in m:
        print(x)
