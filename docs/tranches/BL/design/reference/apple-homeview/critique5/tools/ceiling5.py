"""CRITIQUE-5: an independent closed-form check of A5's ceiling (part C). dock row response 0.30 s, zeta 0.88
(springPresets.ts:84-87). A block of B ms starting one 120 Hz frame after launch; a kept clamp C turns the block's
frame into a step of C ms, so the stepped worm lags the true one by (B - C) ms after it. Smallest C whose
max post-block miss is within tol."""
import json, math, os
W0 = 2 * math.pi / 0.30; Z = 0.88; WD = W0 * math.sqrt(1 - Z * Z)
def x(t_ms, hop):
    t = max(t_ms, 0) / 1000
    return hop * (1 - math.exp(-Z * W0 * t) * (math.cos(WD * t) + Z * W0 / WD * math.sin(WD * t)))
def settle(hop, tol):
    t = 0.0; last = 0.0
    while t < 3000:
        if abs(x(t, hop) - hop) > tol: last = t
        t += 0.1
    return round(last, 1)
F = 1000 / 120
out = {}
for hop in (40, 120, 160):
    tol = max(1.0, 0.01 * hop); cell = {"tol": tol, "settle_tol": settle(hop, tol), "settle_0.5": settle(hop, 0.5)}
    for Bk in (150, 400, 1000):
        start = F
        best = None
        for C in range(5, 1001, 5):
            if C >= Bk: best = best or C; break
            lag = Bk - C
            post = [start + Bk + k * F for k in range(1, 400)]
            miss = max(abs(x(t, hop) - x(t - lag, hop)) for t in post)
            if miss <= tol: best = C; break
        cell[f"block{Bk}_smallest_clamp_pass_simtol"] = best
    out[hop] = cell
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
json.dump(out, open(os.path.join(ROOT, "critique5", "data", "ceiling5.json"), "w"), indent=1)
print(json.dumps(out, indent=1))
