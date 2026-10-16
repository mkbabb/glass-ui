"""CRITIQUE-3: R-02's A3 witness against a retarget issued while the worm is moving fast.

Loads `simulate`, `ctr`, `first_change` from amend3/tools/worm_sim.py by executing only the part of that file
above its `OUT = {` line (no code copied, and worm_sim's own output file is not rewritten). Uses the measured
frame clock of gap/data/retarget-r1/r2-1440 and the hero geometry (origin 265.33 px, pitch 28) worm_sim used.

For each mode (head, chain_origin, hop_origin, chain_origin_monotone) and each retarget delay, reports:
  - A3 witness parts: body outside [chain origin, final target] (<= 0.5 px), the largest backward step of
    the midpoint and of the trailing body (<= 0.5 px)
  - what the witness does not read: the largest one-frame change of the worm's length (lead-trail span) and
    the largest one-frame FORWARD step of the trailing body at the retarget.
usage: python3 -I -B critique3/tools/retarget_midflight.py  (from apple-homeview/) -> critique3/data/retarget-midflight.json
"""
import gzip, json, os
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
src = open(os.path.join(ROOT, "amend3/tools/worm_sim.py")).read()
ns = {"__file__": os.path.join(ROOT, "amend3/tools/worm_sim.py")}
exec(compile(src.split("\nOUT = {")[0], "worm_sim.py(head)", "exec"), ns)
simulate, ctr, first_change = ns["simulate"], ns["ctr"], ns["first_change"]

OUT = {}
for rt in ("r1", "r2"):
    d = json.load(gzip.open(os.path.join(ROOT, f"gap/data/retarget-{rt}-1440.json.gz")))
    r, ms = d["rows"], dict(d["marks"])
    r = [x for x in r if x["t"] < ms["click0"]]
    times = [x["t"] for x in r]
    k2 = next(k for k, x in enumerate(r) if x["t"] > ms["click2"])
    kl = first_change(r, k2)
    origin, pitch = ctr(r[kl - 1]["bA"]), 28.0
    final = origin + 4 * pitch
    res = {"load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]]}
    for delay in (40, 80, 120, 250):
        kr = next(k for k in range(kl, len(times)) if times[k] - times[kl] >= delay)
        drives = {kl: origin + 2 * pitch, kr: final}
        row = {"retarget_ms_after_launch": round(times[kr] - times[kl], 1)}
        for mode in ("head", "chain_origin", "hop_origin", "chain_origin_monotone"):
            s = simulate(times, drives, pitch, origin, mode)
            lo = [x[2] for x in s]; hi = [x[3] for x in s]
            mid = [(a + b) / 2 for a, b in zip(lo, hi)]
            length = [b - a for a, b in zip(lo, hi)]
            v_at = (s[kr - 1][0] - s[kr - 2][0]) / ((times[kr - 1] - times[kr - 2]) / 1000)
            outside = max(max(origin - a, b - final, 0) for a, b in zip(lo, hi))
            back_mid = max([0] + [-(mid[k] - mid[k - 1]) for k in range(kl, len(s))])
            back_trail = max([0] + [-(lo[k] - lo[k - 1]) for k in range(kl, len(s))])
            fwd_trail_at_ret = max(lo[k] - lo[k - 1] for k in range(kr, kr + 3))
            dlen = max(abs(length[k] - length[k - 1]) for k in range(kr, kr + 3))
            row[mode] = {"lead_speed_at_retarget_px_s": round(v_at, 1), "length_before_px": round(length[kr - 1], 2),
                         "witness_outside_px": round(outside, 2), "witness_back_mid_px": round(back_mid, 2),
                         "witness_back_trail_px": round(back_trail, 2),
                         "witness_pass": outside <= 0.5 and back_mid <= 0.5 and back_trail <= 0.5,
                         "unread_trail_forward_step_at_retarget_px": round(fwd_trail_at_ret, 2),
                         "unread_length_change_one_frame_px": round(dlen, 2)}
        res[f"delay_{delay}"] = row
    OUT[f"retarget:{rt}"] = res
os.makedirs(os.path.join(ROOT, "critique3", "data"), exist_ok=True)
json.dump(OUT, open(os.path.join(ROOT, "critique3", "data", "retarget-midflight.json"), "w"), indent=1)
for k, v in OUT.items():
    for dk, row in v.items():
        if dk.startswith("delay"):
            print(k, dk, row["retarget_ms_after_launch"])
            for m in ("head", "chain_origin", "hop_origin", "chain_origin_monotone"):
                print("   ", m, row[m])
