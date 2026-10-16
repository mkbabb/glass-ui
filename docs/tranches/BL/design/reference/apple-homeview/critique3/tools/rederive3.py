"""CRITIQUE-3: re-derive GAP (amend 3) numbers from the committed raw samples, with my own readers.

Reads amend3/data/{gui,apple}/*.json.gz, amend2/data/gui/fps-r1-1440*.json.gz and gap/data/*.json.gz.
Imports nothing from analyze3.py (independent readers). The M-08 clamp counterfactual loads `simulate` from
amend3/tools/worm_sim.py by executing only the part above its `OUT = {` line, with MAXDT rebound.
usage: python3 -I -B critique3/tools/rederive3.py   (from apple-homeview/) -> critique3/data/rederive3.json
"""
import gzip, json, math, os, re

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
O = {}


def L(rel):
    return json.load(gzip.open(os.path.join(ROOT, rel)))


def load(d):
    m = d["meta"]
    return [m.get("loadStart"), m.get("loadEnd")]


def ctr(b):
    return b[0] + b[2] / 2


def v_sl(r, k):
    return (r[k]["sl"] - r[k - 1]["sl"]) / ((r[k]["t"] - r[k - 1]["t"]) / 1000)


# ── P-21: a call issued into a moving strip (flight, flight-lib) ──
for sc in ("flight", "flight-lib"):
    for rt in ("r1", "r2"):
        d = L(f"amend3/data/gui/{sc}-{rt}-1440.json.gz")
        r, ms = d["rows"], d["marks"]
        legs = []
        for i, (n, t0) in enumerate(ms):
            if "inflight" not in n:
                continue
            k = next(j for j, x in enumerate(r) if x["t"] >= t0)
            t1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
            ke = max(j for j, x in enumerate(r) if x["t"] < t1)
            legs.append({"mark": n, "prev_mark": ms[i - 1][0], "sl_at_call": r[k - 1]["sl"],
                         "v_last_before": round(v_sl(r, k - 1)), "v_first_after": round(v_sl(r, k)),
                         "v_next3": [round(v_sl(r, j)) for j in range(k + 1, k + 4)], "landed_sl": r[ke]["sl"],
                         "cur_end": r[ke].get("cur", r[ke].get("ctr"))})
        O[f"P-21:{sc}:{rt}"] = {"load": load(d), "legs": legs}

# ── P-23: zero-velocity frames in the Next x 3 chain, and distance left ──
for rt in ("r1", "r2"):
    d = L(f"gap/data/pager-next-{rt}-1440.json.gz")
    r, ms = d["rows"], dict(d["marks"])
    t0 = ms["next3a"]
    final = r[-1]["sl"]
    k0 = next(j for j, x in enumerate(r) if x["t"] >= t0)
    moving_started = False
    zeros = []
    for j in range(k0 + 1, len(r)):
        if r[j]["sl"] != r[j - 1]["sl"]:
            moving_started = True
        elif moving_started and r[j]["sl"] != final:
            zeros.append([round(r[j]["t"] - t0, 1), r[j]["sl"], final - r[j]["sl"]])
    first = next(j for j in range(k0, len(r)) if r[j]["sl"] != r[k0 - 1]["sl"])
    O[f"P-23:pager-next:{rt}"] = {"load": load(d), "final_sl": final, "zero_frames_ms_sl_left": zeros,
                                  "next3a_first_motion_ms": round(r[first]["t"] - t0, 1)}
    # P-22: single Next -> first strip motion
    t1 = ms["next1"]
    k1 = next(j for j, x in enumerate(r) if x["t"] >= t1)
    f1 = next(j for j in range(k1, len(r)) if r[j]["sl"] != r[k1 - 1]["sl"])
    O[f"P-22:pager-next:{rt}"] = {"next1_first_motion_ms": round(r[f1]["t"] - t1, 1), "first_motion_frame_dt_ms": round(r[f1]["t"] - r[f1 - 1]["t"], 1)}

# ── M-02: Apple sticky release under the smooth scroll ──
for rt in ("r1", "r2"):
    d = L(f"amend3/data/apple/sticky-smooth-{rt}-1440.json.gz")
    fr, H = d["frames"], d["meta"]["H"]
    gb = [x["aap"]["y"] + x["aap"]["h"] for x in fr]
    ct = [x["cont"][1] for x in fr]
    cb = [x["cont"][1] + x["cont"][3] for x in fr]
    law = [max(a + 436, min(H - 32, b - 120)) for a, b in zip(ct, cb)]
    err = max(abs(g - l) for g, l in zip(gb, law))
    stuck = [k for k, g in enumerate(gb) if abs(g - (H - 32)) <= 0.5]
    vg = lambda k: (gb[k] - gb[k - 1]) / ((fr[k]["t"] - fr[k - 1]["t"]) / 1000)
    ks, ke = stuck[0], stuck[-1]
    page = (fr[-1]["sy"] - fr[0]["sy"]) / ((fr[-1]["t"] - fr[0]["t"]) / 1000)
    O[f"M-02:sticky-smooth:{rt}"] = {"load": load(d), "frames": len(fr), "law_max_err_px": round(err, 3), "stuck_frames": len(stuck),
                                     "stuck_contiguous": ke - ks + 1 == len(stuck),
                                     "container_travel_stuck_px": round(fr[ke]["sy"] - fr[ks]["sy"], 1),
                                     "page_speed_px_s": round(page, 1),
                                     "v_around_stick": [round(vg(k), 1) for k in range(ks - 2, ks + 3)],
                                     "v_around_release": [round(vg(k), 1) for k in range(ke - 1, ke + 4)],
                                     "mean_v_frames_2_30_after_release": round(sum(vg(k) for k in range(ke + 2, ke + 30)) / 28, 1)}

# ── M-08: lag at matched progress, my reader (stall frames on the 120 Hz curve) ──
def hops(rel):
    d = L(rel)
    r, ms = d["rows"], d["marks"]
    out = []
    for i, (n, tm) in enumerate(ms):
        tm1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
        seg = [x for x in r if tm <= x["t"] < tm1]
        mid = [(ctr(x["bA"]) + ctr(x["bB"])) / 2 for x in seg]
        a, b = mid[0], mid[-1]
        out.append((n, [x["t"] - tm for x in seg], [(m - a) / (b - a) for m in mid]))
    return out, d


def lag_bins(ref, other):
    res = []
    for (n, tr, pr), (_, ts, ps) in zip(ref, other):
        kmax = max(range(len(pr)), key=lambda j: pr[j])
        def tref(p):
            for j in range(1, kmax + 1):
                if pr[j - 1] < p <= pr[j]:
                    return tr[j - 1] + (p - pr[j - 1]) / (pr[j] - pr[j - 1]) * (tr[j] - tr[j - 1])
        lags = [(p, t - tref(p)) for t, p in zip(ts, ps) if 0.1 <= p < 0.9 and tref(p) is not None]
        b = lambda lo, hi: [l for p, l in lags if lo <= p < hi]
        e, l = b(0.1, 0.3), b(0.7, 0.9)
        res.append({"hop": n, "early_mean_ms": round(sum(e) / len(e), 1) if e else None, "late_mean_ms": round(sum(l) / len(l), 1) if l else None,
                    "growth_ms": round(sum(l) / len(l) - sum(e) / len(e), 1) if e and l else None, "n_early": len(e), "n_late": len(l)})
    return res


ref, dref = hops("amend2/data/gui/fps-r1-1440.json.gz")
for var in ("rafstall", "raf60"):
    st, dst = hops(f"amend2/data/gui/fps-r1-1440-{var}.json.gz")
    dts = [b["t"] - a["t"] for a, b in zip(dst["rows"], dst["rows"][1:])]
    O[f"M-08:measured:{var}"] = {"load": load(dst), "ref_load": load(dref), "max_frame_dt_ms": round(max(dts), 1),
                                 "frames_dt_over_40": sum(1 for x in dts if x > 40), "hops": lag_bins(ref, st)}

# the counterfactual: the integrator with its clamp renamed and raised (MAXDT 60), on the measured clocks
src = open(os.path.join(ROOT, "amend3/tools/worm_sim.py")).read().split("\nOUT = {")[0]
ns = {"__file__": os.path.join(ROOT, "amend3/tools/worm_sim.py")}
exec(compile(src, "worm_sim.py(head)", "exec"), ns)
d120, dst = L("amend2/data/gui/fps-r1-1440.json.gz"), L("amend2/data/gui/fps-r1-1440-rafstall.json.gz")


def sim_hops(d, maxdt):
    ns["MAXDT"] = maxdt
    r, ms = d["rows"], d["marks"]
    out = []
    for i, (n, tm) in enumerate(ms):
        tm1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
        seg = [x for x in r if tm <= x["t"] < tm1]
        # the lead's drive lands on the first frame after the mark (the measured launch is within a frame of it)
        o = (ctr(seg[0]["bA"]) + ctr(seg[0]["bB"])) / 2
        f = (ctr(seg[-1]["bA"]) + ctr(seg[-1]["bB"])) / 2
        times = [x["t"] for x in seg]
        s = ns["simulate"](times, {1: f}, 40.0, o, "head")
        mid = [(a[2] + a[3]) / 2 for a in s]
        out.append((n, [t - tm for t in times], [(m - o) / (f - o) for m in mid]))
    return out


cf = {}
for maxdt in (40.0, 60.0, 1e9):
    cf[f"MAXDT_{int(maxdt) if maxdt < 1e8 else 'none'}"] = lag_bins(sim_hops(d120, maxdt), sim_hops(dst, maxdt))
ns["MAXDT"] = 40.0
O["M-08:simulated-clamp-counterfactual"] = cf

# ── CR-09: stale aria-current and the swallowed move (cr09 r1..r3) ──
for rt in ("r1", "r2", "r3"):
    d = L(f"amend3/data/gui/cr09-{rt}-1440.json.gz")
    r, ms = d["rows"], d["marks"]
    pitch = None
    names = [m[0] for m in ms]
    i0 = max(i for i, m in enumerate(ms) if m[0] == "to0")
    t0, t3, t1 = ms[i0][1], ms[i0 + 1][1], ms[i0 + 2][1]
    seg = [x for x in r if t0 <= x["t"] < t3]
    rest = next(x for x in reversed(seg) if True)
    # how long aria-current disagrees with the member under the strip after to0 settles
    land = next(x["t"] for k, x in enumerate(seg) if x["sl"] == 0 and all(y["sl"] == 0 for y in seg[k:]))
    stale = [x for x in r if x["t"] >= land and x["t"] < t3 and x["cur"] != 0]
    seg3 = [x for x in r if t3 <= x["t"] < t1]
    O[f"CR-09:{rt}"] = {"load": load(d), "to0_rest_ms_after_mark": round(land - t0, 1), "cur_while_at_0": sorted(set(x["cur"] for x in stale)),
                        "stale_ms_until_to3": round(t3 - land, 1), "to3_sl_max": max(x["sl"] for x in seg3),
                        "to3_sl_end": seg3[-1]["sl"], "to3_cur_end": seg3[-1]["cur"],
                        "to3_back_at_0_ms": round(next(x["t"] for k, x in enumerate(seg3) if k > 0 and x["sl"] == 0 and seg3[k - 1]["sl"] > 0) - t3, 1)
                        if any(x["sl"] > 0 for x in seg3) else None}
for rt in ("r1", "r2"):
    d = L(f"amend3/data/gui/jump-noecho-{rt}-1440.json.gz")
    r, ms = d["rows"], d["marks"]
    t0 = ms[0][1]
    seg = [x for x in r if t0 <= x["t"] < (ms[1][1] if len(ms) > 1 else 1e18)]
    end = seg[-1]["sl"]
    tl = next(x["t"] for k, x in enumerate(seg) if x["sl"] == end and all(y["sl"] == end for y in seg[k:]))
    O[f"P-21a:jump-noecho:{rt}"] = {"load": load(d), "first_mark": ms[0][0], "landed_sl": end, "landed_ms": round(tl - t0, 1), "marks": [m[0] for m in ms]}

# ── M-11: hidden document ──
d = L("amend3/data/gui/hidden-r1-1440.json.gz")
r, ms = d["rows"], dict(d["marks"])
adv, prev = [], r[0]["cur"]
for x in r:
    if x["cur"] != prev:
        adv.append([round(x["t"] - ms["visible"], 1), x["cur"], "hidden" if ms["hide"] <= x["t"] < ms["show"] else "visible"])
    prev = x["cur"]
O["M-11:gui"] = {"load": load(d), "hide_ms": round(ms["hide"] - ms["visible"]), "show_ms": round(ms["show"] - ms["visible"]), "advances": adv}
for rt in ("r1", "r2"):
    d = L(f"amend3/data/apple/hidden-{rt}-1440.json.gz")
    fr, ms = d["frames"], dict(d["marks"])
    ch = [[round(b["t"] - ms["hide"], 1), a["cur"], b["cur"]] for a, b in zip(fr, fr[1:]) if a["cur"] != b["cur"]]
    def rate(t0, t1):
        s = [x for x in fr if t0 <= x["t"] <= t1]
        return round((s[-1]["aw"] - s[0]["aw"]) / ((s[-1]["t"] - s[0]["t"]) / 1000), 3)
    k = next(j for j, x in enumerate(fr) if x["t"] >= ms["show"])
    O[f"M-11:apple:{rt}"] = {"load": load(d), "cur_changes_ms_from_hide": ch, "playing_classes": sorted(set(("playing" in x["galCls"]) for x in fr if ms["hide"] <= x["t"] < ms["show"])),
                             "rate_before": rate(ms["hide"] - 1200, ms["hide"] - 10), "rate_after": rate(ms["show"] + 200, ms["show"] + 1500),
                             "fill_across_show": [fr[k - 1]["aw"], fr[k]["aw"], fr[k + 1]["aw"]]}

# ── MATCH / EXCEED rows from gap/data ──
# P-35 / R-05: resize re-snap and worm re-seat
for rt in ("r1", "r2"):
    d = L(f"gap/data/resize-{rt}-1440.json.gz")
    r, ms = d["rows"], d["marks"]
    out = []
    for n, tm in ms:
        k = next(j for j, x in enumerate(r) if x["t"] >= tm)
        pre = r[k - 1]
        ksl = next((j for j in range(k, len(r)) if r[j]["sl"] != pre["sl"]), None)
        kw = next((j for j in range(k, len(r)) if r[j]["bA"][0] != pre["bA"][0]), None)
        later = [r[j]["sl"] for j in range(ksl, min(len(r), ksl + 60))] if ksl else []
        out.append({"mark": n, "sl_before": pre["sl"], "sl_after": r[ksl]["sl"] if ksl else None, "sl_frame_ms": round(r[ksl]["t"] - tm, 1) if ksl else None,
                    "sl_values_next_60_frames": sorted(set(later)), "worm_frame_ms": round(r[kw]["t"] - tm, 1) if kw else None,
                    "same_frame": ksl == kw, "cur": sorted(set(x["cur"] for x in r))})
    O[f"P-35/R-05:resize:{rt}"] = {"load": load(d), "resizes": out}

# P-25: member projection
for rt in ("r1", "r2"):
    d = L(f"gap/data/smooth-{rt}-1440.json.gz")
    sc = [float(it[1]) for x in d["rows"] for it in x["it"]]
    op = sorted(set(it[2] for x in d["rows"] for it in x["it"] if it[0] != "active"))
    # P-26: content lag residue on the members at rest (the last frame of each move)
    ms = d["marks"]
    res = []
    for i, (n, tm) in enumerate(ms):
        tm1 = ms[i + 1][1] if i + 1 < len(ms) else d["rows"][-1]["t"] + 1
        seg = [x for x in d["rows"] if tm <= x["t"] < tm1]
        res.append([n, seg[-1]["it"][0][3], round(seg[-1]["t"] - tm)])
    O[f"P-25/P-26:smooth:{rt}"] = {"load": load(d), "member_scale_min_max": [min(sc), max(sc)], "neighbour_opacities": op, "lag_at_end_of_each_move": res}

# P-30: pip hover / press / release
for rt in ("r1", "r2"):
    d = L(f"gap/data/hover-{rt}-1440.json.gz")
    r, ms = d["rows"], dict(d["marks"])
    j = next(i for i, p in enumerate(r[-1]["pip"]) if True) if False else None
    # the hovered pip: the one whose scale changes after hoverIn
    pre = r[next(k for k, x in enumerate(r) if x["t"] >= ms["hoverIn"]) - 1]
    def first_after(t, pred):
        return next((x for x in r if x["t"] >= t and pred(x)), None)
    hp = next(i for i in range(len(pre["pip"])) if any(x["pip"][i][0] != pre["pip"][i][0] for x in r if x["t"] > ms["hoverIn"]))
    sc = lambda x: 1.0 if x["pip"][hp][0] == "none" else float(x["pip"][hp][0])
    hov = [x for x in r if ms["hoverIn"] <= x["t"] < ms["down"]]
    full = first_after(ms["hoverIn"], lambda x: abs(sc(x) - 1.14) < 1e-4)
    first = first_after(ms["hoverIn"], lambda x: sc(x) != 1.0)
    press = [sc(x) for x in r if ms["down"] <= x["t"] < ms["up"]]
    back = first_after(ms["up"], lambda x: abs(sc(x) - 1.14) < 1e-4)
    alpha = lambda x: re.search(r"/ ([0-9.]+)\)", x["pip"][hp][1]).group(1)
    a_full = first_after(ms["hoverIn"], lambda x: alpha(x) == "0.72")
    O[f"P-30:hover:{rt}"] = {"load": load(d), "pip": hp, "alpha_reaches_0.72_ms": round(a_full["t"] - ms["hoverIn"], 1), "hover_first_change_ms": round(first["t"] - ms["hoverIn"], 1),
                             "hover_reaches_1.14_ms": round(full["t"] - ms["hoverIn"], 1), "alpha_rest_hover": [alpha(pre), alpha(hov[-1])],
                             "press_min_scale": min(press), "release_back_to_1.14_ms": round(back["t"] - ms["up"], 1) if back else None}

# P-37: dark arm material
for rt in ("r1", "r2"):
    d = L(f"gap/data/dark-{rt}-1440.json.gz")
    p = d["anatomy"]["pager"]
    O[f"P-37:dark:{rt}"] = {"bf": p["bf"], "bg": p["bg"], "shadow": p["shadow"]}

# R-08: shell dock rect while <main> scrolls
for rt in ("r1", "r2"):
    d = L(f"gap/data/dock-scroll-{rt}-834.json.gz")
    r = d["rows"]
    rects = sorted(set(tuple(x["dk"]) for x in r))
    v = [abs((b["ms"] - a["ms"]) / ((b["t"] - a["t"]) / 1000)) for a, b in zip(r, r[1:])]
    O[f"R-08:dock-scroll:{rt}"] = {"load": load(d), "dock_rects": rects, "ms_range": [min(x["ms"] for x in r), max(x["ms"] for x in r)], "peak_scroll_px_s": round(max(v))}

# P-33: overscroll at member 0
for rt in ("r1", "r2"):
    d = L(f"gap/data/overscroll-{rt}-390.json.gz")
    r = d["rows"]
    O[f"P-33:overscroll:{rt}"] = {"sl_values": sorted(set(x["sl"] for x in r)), "member0_x": sorted(set(x["it"][0][4] for x in r))}

# P-32: snap-back and advance durations after release (drag-snapback)
for rt in ("r1", "r2"):
    d = L(f"gap/data/drag-snapback-{rt}-390.json.gz")
    r, ms = d["rows"], d["marks"]
    out = []
    for i, (n, tm) in enumerate(ms):
        if not n.endswith(":up"):
            continue
        tnext = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
        seg = [x for x in r if tm <= x["t"] < tnext]
        final = seg[-1]["sl"]
        start = seg[0]["sl"]
        tend = next(x["t"] for k, x in enumerate(seg) if abs(x["sl"] - final) <= 0.5 and all(abs(y["sl"] - final) <= 0.5 for y in seg[k:]))
        out.append({"leg": n, "sl_at_up": start, "final_sl": final, "settle_ms_after_up": round(tend - tm, 1)})
    O[f"P-32:snapback:{rt}"] = {"load": load(d), "legs": out}

os.makedirs(os.path.join(ROOT, "critique3", "data"), exist_ok=True)
json.dump(O, open(os.path.join(ROOT, "critique3", "data", "rederive3.json"), "w"), indent=1)
print(json.dumps(O, indent=1))

# ── Goo verdict: bodies' span mid-hop vs rest, and when both bodies sit within 0.5 px of the target ──
d = L("amend2/data/gui/fps-r1-1440.json.gz")
r, ms = d["rows"], d["marks"]
goo = []
for i, (n, tm) in enumerate(ms):
    tm1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
    seg = [x for x in r if tm <= x["t"] < tm1]
    span = [max(x["bA"][0] + x["bA"][2], x["bB"][0] + x["bB"][2]) - min(x["bA"][0], x["bB"][0]) for x in seg]
    fa, fb = ctr(seg[-1]["bA"]), ctr(seg[-1]["bB"])
    mid_in = next(x["t"] - tm for k, x in enumerate(seg) if all(abs((ctr(y["bA"]) + ctr(y["bB"])) / 2 - (fa + fb) / 2) <= 0.5 for y in seg[k:]))
    both_in = next(x["t"] - tm for k, x in enumerate(seg) if all(abs(ctr(y["bA"]) - fa) <= 0.5 and abs(ctr(y["bB"]) - fb) <= 0.5 for y in seg[k:]))
    nk = [x["nk"][2] for x in seg if float(x["nkOp"]) > 0]
    stretch = max(float(x["str"]) for x in seg)
    goo.append({"hop": n, "rest_span_px": round(span[0], 2), "peak_span_px": round(max(span), 2), "midpoint_within_0.5_ms": round(mid_in, 1),
                "both_bodies_within_0.5_ms": round(both_in, 1), "peak_neck_px": max(nk) if nk else 0, "ring_w": seg[0]["ring"][2], "peak_stretch": stretch})
O["goo:fps-r1-1440"] = {"load": load(d), "hops": goo}
json.dump(O, open(os.path.join(ROOT, "critique3", "data", "rederive3.json"), "w"), indent=1)
