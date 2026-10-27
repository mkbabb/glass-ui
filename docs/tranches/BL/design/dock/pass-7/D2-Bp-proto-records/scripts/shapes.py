# shapes.py: model of a coincident pair's front on the dock rung (zeta .88, response .30 s): time the front reaches
# 4 px (leaving ink < 0.9), the leaving glyph's end, the kill (painted < seam) and the arrival's glyph.
import math
z=.88; w=2*math.pi/.3; wd=w*math.sqrt(1-z*z)
def p(t):
    t/=1000; return 1-math.exp(-z*w*t)*(math.cos(wd*t)+z/math.sqrt(1-z*z)*math.sin(wd*t))
W=40; seam=10.86; S=seam+1
def run(name,q,L):
    ts={}
    for i in range(0,4000):
        t=i*0.1; f=q(t)*L
        for k,v in (('s',4),('g',24),('k',W-seam),('a',33)):
            if k not in ts and f>=v: ts[k]=t
    sp=ts.get('k',999)-ts.get('s',0); zn=ts.get('a',999)-ts.get('g',0)
    print(f"{name:28s} L={L:5.1f} start {ts.get('s',0):6.1f} glyph {ts.get('g',0):6.1f} kill {ts.get('k',0):6.1f} arr {ts.get('a',0):6.1f} | span {sp:6.1f} zone {zn:5.1f}")
T=260
for L in (51.9,63.7):
    run("q=p",lambda t:p(t),L)
    run("q=p^2",lambda t:p(t)**2,L)
    run("q=p^3",lambda t:p(t)**3,L)
    run("time-reversed spring",lambda t:1-p(max(0,T-t)),L)
    run("linear time",lambda t:min(1,t/T),L)
print("-- f' = k·omega·box·p (per frame), box 40")
for k in (1.0, 0.75, 0.5):
    acc=[0.0]; prev=[0.0]
    def mk(k):
        st={'t':0,'f':0}
        def q(t):
            while st['t']<t: st['f']+=k*w/1000*W*p(st['t'])*0.1; st['t']+=0.1
            return st['f']
        return q
    run(f"f'=k w box p, k={k}", mk(k), 1.0)
print("-- f' = k·omega·box·p^n")
for n in (1,2,3):
  for k in (1.0,0.75,0.5):
    def mk(k,n):
        st={'t':0,'f':0}
        def q(t):
            while st['t']<t: st['f']+=k*w/1000*W*p(st['t'])**n*0.1; st['t']+=0.1
            return st['f']
        return q
    run(f"n={n} k={k}", mk(k,n), 1.0)
print("-- f' = omega*(f+seed)*p^n, capped at omega*box")
for seed in (seam, S, W/4):
  for n in (0,1,2):
    def mk(seed,n):
        st={'t':0,'f':0}
        def q(t):
            while st['t']<t: st['f']+=min(w/1000*(st['f']+seed)*p(st['t'])**n, w/1000*W)*0.1; st['t']+=0.1
            return st['f']
        return q
    run(f"seed={seed:.1f} n={n}", mk(seed,n), 1.0)
