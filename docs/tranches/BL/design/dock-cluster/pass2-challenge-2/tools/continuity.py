"""I8-G18 interrupt arm: the silhouette's outer ends keep their momentum through an interrupt.
For each end, frame velocity v_i = x_i - x_(i-1) (px per 8.33 ms frame) and its change dv_i = v_i - v_(i-1).
The dock spring's own largest change per frame at that state is a*dt^2 with a = w^2 |D| + 2 z w |V|
(w = 2 pi / 0.30, z = 0.88, D = distance to the settled end, V = velocity in px/s). The arm is RED when
any |dv| over the interrupt window (frames k-1 .. k+6) exceeds that bound by more than 0.5 px.
usage: continuity.py <probe json> [...]"""
import json, math, sys
W, Z, DT = 2 * math.pi / 0.30, 0.88, 1 / 120
def ends(f):
    s = f.get("shares") or []
    if not s or not all(s) or len(s) != len(f.get("memberBox") or []): return None
    return (min(x[0] for x in s), max(x[1] for x in s))
for path in sys.argv[1:]:
    d = json.load(open(path))
    for key, c in (d.get("cells", {}).get("interrupt") or {}).items():
        fr = c["frames"]; k = c["interruptFrame"]
        e = [ends(f) for f in fr]
        out = []
        for side in (0, 1):
            xs = [x[side] if x else None for x in e]
            if all(x is None for x in xs): continue  # challenge-2: an 11.0.0 control has no lens shares
            fin = next(x for x in reversed(xs) if x is not None)
            worst, at, steps = -9, None, []
            for i in range(2, len(xs)):
                if None in (xs[i], xs[i-1], xs[i-2]): continue
                v0, v1 = xs[i-1] - xs[i-2], xs[i] - xs[i-1]
                dv = v1 - v0
                b = (W * W * abs(xs[i-1] - fin) + 2 * Z * W * abs(v0) / DT) * DT * DT
                frame = fr[i].get("i", i - 1)
                if k - 1 <= frame <= k + 6:
                    steps.append(round(v1, 2))
                    if abs(dv) - b > worst: worst, at = abs(dv) - b, (frame, round(dv, 2), round(b, 2))
            out.append(f"{'LR'[side]}: v {steps} worst |dv|-bound {worst:+.2f} at {at} -> {'RED' if worst > 0.5 else 'GREEN'}")
        print(f"{path.split('/')[-1]} | {key[:44]:44} | " + " | ".join(out))
