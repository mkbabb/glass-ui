# C-E13 · a model of P-E13's `translateFor` under a projective paint map (no browser).
#
# stage.ts `frameOf` takes two 40 px probes at the host's place NOW, inverts that secant
# map, then `translateFor` takes ONE correction step with the same map (a chord step: the
# map is not re-asked at the solution). This models one axis of a plane under
# `perspective(d) rotateX(th)` about the perspective origin: a point at plane coordinate y
# paints at Y(y) = y·cos(th)·d / (d − y·sin(th)). The host was painted at y0; a re-render
# moves it to y1 = y0 + dl in layout. The glide must land on Y(y0). The residual is the
# painted distance between where the glide's first frame lands and where the host was
# painted. CK-20's bound is 0.5 px. The model reads a point, not a bounding-box centre:
# the engine's `getBoundingClientRect` centre of a projected quad adds nonlinearity, so
# the model is the floor of the residual, not its ceiling.
# Run: python3 -I newton-residual.py
import math


def run(d, th, y0, dl):
    s, c = math.sin(math.radians(th)), math.cos(math.radians(th))
    Y = lambda y: y * c * d / (d - y * s)
    y1 = y0 + dl
    J = (Y(y1 + 40) - Y(y1)) / 40          # frameOf: the 40 px probe at the place now
    t0 = (Y(y0) - Y(y1)) / J               # inv(dx, dy)
    r = (Y(y0) - Y(y1 + t0)) / J           # one step on the probe at t0, same map
    t = t0 + r
    return Y(y1 + t) - Y(y0), Y(y1) - Y(y0)


for d, th in [(600, 25), (400, 40), (600, 45)]:
    for y0 in [-200, 0, 150]:
        for dl in [40, 120, 200, 400]:
            e, m = run(d, th, y0, dl)
            print(f"perspective {d}px rotateX {th}deg · y0 {y0} · layout move {dl} · paint move {m:.1f} · first-frame residual {e:.3f} px")
