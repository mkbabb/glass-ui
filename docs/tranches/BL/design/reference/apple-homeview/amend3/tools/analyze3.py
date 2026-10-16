"""AMEND-3 analysis: reads amend3/data/{gui,apple}/*.json.gz, and re-reads gap/data/pager-next-r*, the amend-2 fps
runs and the amend-2 interrupt runs, and writes amend3/data/summary3.json. Every amend-3 number in GAP.md that is
not from worm-sim.json or entrance3.json comes from here.

usage: python3 -I -B amend3/tools/analyze3.py   (from apple-homeview/)
"""
import gzip, json, os, math

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
G3 = os.path.join(ROOT, "amend3", "data", "gui")
A3 = os.path.join(ROOT, "amend3", "data", "apple")
S = {}


def L(p):
    return json.load(gzip.open(p))


def meta(d):
    m = d.get("meta", {})
    return {"load": [m.get("loadStart"), m.get("loadEnd")], "frameDt": m.get("frameDt"), "browser": m.get("browser")}


def ctr(b):
    return b[0] + b[2] / 2


def vel(r, i):
    return (r[i]["sl"] - r[i - 1]["sl"]) / ((r[i]["t"] - r[i - 1]["t"]) / 1000)


# ── 1 · CR-09 and the swallowed move, with the event log ──
def cr09(p):
    d = L(p)
    r, ms, ev = d["rows"], d["marks"], d["events"]
    out = {"meta": meta(d), "moves": []}
    for i, (n, t0) in enumerate(ms):
        t1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
        seg = [x for x in r if t0 <= x["t"] < t1]
        e = [[round(x[0] - t0, 1)] + x[1:] for x in ev if t0 <= x[0] < t1 and (x[1] in ("scrollTo", "dropped") and x[3] == 0 or x[1] in ("snapchange", "scrollend", "io") and x[2] == 0)]
        pre = [x for x in r if x["t"] < t0]
        cur_ch = []
        prev = pre[-1]["cur"] if pre else None
        for x in seg:
            if x["cur"] != prev:
                cur_ch.append([round(x["t"] - t0, 1), x["cur"], x["sl"]])
            prev = x["cur"]
        sl_vals = [x["sl"] for x in seg]
        rest = seg[-1]["sl"]
        out["moves"].append({"mark": n, "cur_before": pre[-1]["cur"] if pre else None, "sl_before": pre[-1]["sl"] if pre else None,
                             "events": e, "cur_changes": cur_ch, "sl_rest": rest, "cur_end": seg[-1]["cur"],
                             "sl_max": max(sl_vals), "sl_min": min(sl_vals), "window_ms": round(seg[-1]["t"] - t0)})
    return out


for rt in ("r1", "r2", "r3"):
    S[f"cr09:{rt}"] = cr09(os.path.join(G3, f"cr09-{rt}-1440.json.gz"))
for rt in ("r1", "r2"):
    S[f"jump-noecho:{rt}"] = cr09(os.path.join(G3, f"jump-noecho-{rt}-1440.json.gz"))


# ── 2 · a programmatic move issued in flight (P-21) ──
def flight(p, legs):
    d = L(p)
    r, ms, ev = d["rows"], d["marks"], d["events"]
    out = {"meta": meta(d)}
    for leg in legs:
        out[leg] = d.get(leg)
    res = []
    names = [n for n, _ in ms]
    for i, (n, t0) in enumerate(ms):
        if not n.startswith("inflight") and n != "next-inflight":
            continue
        k = next(j for j, x in enumerate(r) if x["t"] >= t0)
        t1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
        kend = max(j for j, x in enumerate(r) if x["t"] < t1)
        final = r[kend]["sl"]
        v = [round(vel(r, j)) for j in range(k - 3, min(kend, k + 8))]
        fl = [j for j in range(k, kend + 1) if abs(final - r[j]["sl"]) > 2]
        zeros = [round(r[j]["t"] - t0, 1) for j in fl if r[j]["sl"] == r[j - 1]["sl"]]
        flips = [round(r[j]["t"] - t0, 1) for j in fl if vel(r, j) * vel(r, j - 1) < 0]
        libcalls = [[round(x[0] - t0, 1)] + x[1:] for x in ev if t0 - 400 <= x[0] < t1 and x[1] == "scrollTo"]
        res.append({"mark": n, "sl_at_mark": r[k - 1]["sl"], "v_px_s_3_before_8_after": v, "v_before": round(vel(r, k - 1)),
                    "v_first_after": round(vel(r, k)), "zero_velocity_frames_in_flight_ms": zeros,
                    "sign_flips_in_flight_ms": flips, "landed_sl": final, "cur_end": r[kend].get("cur", r[kend].get("ctr")), "scrollTo_calls": libcalls})
    out["legs"] = res
    return out


for rt in ("r1", "r2"):
    S[f"flight:{rt}"] = flight(os.path.join(G3, f"flight-{rt}-1440.json.gz"), ["legA", "legB"])
    S[f"flight-lib:{rt}"] = flight(os.path.join(G3, f"flight-lib-{rt}-1440.json.gz"), ["legC", "legC2"])


# ── 3 · hidden document: glass-ui demo autoplay ──
d = L(os.path.join(G3, "hidden-r1-1440.json.gz"))
r, ms = d["rows"], dict(d["marks"])
ch, prev = [], None
for x in r:
    if x["cur"] != prev:
        ph = "visible" if x["t"] < ms["hide"] else "hidden" if x["t"] < ms["show"] else "shown"
        ch.append([round(x["t"] - ms["visible"], 1), x["cur"], x["sl"], ph])
    prev = x["cur"]
S["gui-hidden:r1"] = {"meta": meta(d), "marks_ms": {k: round(v - ms["visible"]) for k, v in ms.items()},
                      "cur_changes_ms_from_visible": ch,
                      "advances_while_hidden": sum(1 for c in ch[1:] if c[3] == "hidden"),
                      "visibility_events": [[round(e[0] - ms["visible"]), e[2]] for e in d["events"] if e[1] == "visibility"]}


# ── 4 · Apple: hidden document ──
def a_hidden(p):
    d = L(p)
    fr, ms = d["frames"], dict(d["marks"])
    out = {"meta": meta(d), "vis_events_ms_from_hide": [[round(t - ms["hide"], 1), s] for t, s in d.get("vis", [])]}
    tl, prev = [], None
    for x in fr:
        st = "playing" if "playing" in x["galCls"] else "paused" if "paused" in x["galCls"] else x["galCls"][-14:]
        k = (st, x["cur"], x["glyph"])
        if k != prev:
            tl.append([round(x["t"] - ms["hide"], 1), st, x["cur"], x["glyph"], x["aw"], x["aPlay"]])
        prev = k
    out["transitions_ms_from_hide"] = tl
    def fill(t):
        c = [x for x in fr if x["t"] <= t]
        return (round(c[-1]["aw"], 4), c[-1]["aPlay"], c[-1]["cur"]) if c else None
    out["fill_at"] = {"hide-1": fill(ms["hide"] - 1), "hide+100": fill(ms["hide"] + 100), "hide+2500": fill(ms["hide"] + 2500),
                      "show-1": fill(ms["show"] - 1), "show+100": fill(ms["show"] + 100), "show+1000": fill(ms["show"] + 1000)}
    def rate(a, b):
        seg = [x for x in fr if a <= x["t"] <= b and x["aw"] is not None]
        if len(seg) < 3 or seg[0]["cur"] != seg[-1]["cur"]:
            return None
        return round((seg[-1]["aw"] - seg[0]["aw"]) / ((seg[-1]["t"] - seg[0]["t"]) / 1000), 3)
    out["rate_px_s"] = {"before_hide": rate(ms["hide"] - 1200, ms["hide"] - 10), "while_hidden": rate(ms["hide"] + 200, ms["show"] - 10),
                        "after_show": rate(ms["show"] + 200, ms["show"] + 1500)}
    # first frame after show and the step against the frozen width
    k = next(j for j, x in enumerate(fr) if x["t"] >= ms["show"])
    out["show_step"] = {"last_hidden_fill": fr[k - 1]["aw"], "first_shown_fill": fr[k]["aw"], "first_shown_ms": round(fr[k]["t"] - ms["show"], 1)}
    return out


for rt in ("r1", "r2"):
    S[f"apple-hidden:{rt}"] = a_hidden(os.path.join(A3, f"hidden-{rt}-1440.json.gz"))


# ── 5 · Apple: the sticky release under a smooth scroll (M-02) ──
def a_sticky_smooth(p):
    d = L(p)
    fr = d["frames"]
    H = d["meta"]["H"]
    rows = [(x["t"], x["sy"], x["aap"]["y"] + x["aap"]["h"], x["cont"][1], x["cont"][1] + x["cont"][3]) for x in fr]
    # GAP's law with its constants (c 120, d 436), not refitted
    errs = [abs(gb - max(ct + 436, min(H - 32, cb - 120))) for _, _, gb, ct, cb in rows]
    stuck = [k for k, q in enumerate(rows) if abs(q[2] - (H - 32)) <= 0.5]
    out = {"meta": meta(d), "frames": len(rows), "law_max_err_px": round(max(errs), 2), "stuck_frames": len(stuck),
           "page_speed_px_s": round((rows[-1][1] - rows[0][1]) / ((rows[-1][0] - rows[0][0]) / 1000), 1)}
    if stuck:
        k0, k1 = stuck[0], stuck[-1]
        out["container_travel_while_stuck_px"] = round(rows[k1][1] - rows[k0][1], 1)
        def v(k):
            return round((rows[k][2] - rows[k - 1][2]) / ((rows[k][0] - rows[k - 1][0]) / 1000), 1)
        out["group_velocity_px_s_around_stick"] = [v(k) for k in range(max(1, k0 - 3), k0 + 4)]
        out["group_velocity_px_s_around_release"] = [v(k) for k in range(k1 - 3, min(len(rows), k1 + 5))]
        # how many frames does the group take to go from 0 to within 2 % of the page speed after the release?
        ps = out["page_speed_px_s"]
        ramp = next((j - k1 for j in range(k1 + 1, len(rows)) if abs(abs(v(j)) - ps) <= 0.02 * ps), None)
        out["frames_from_release_to_page_speed_2pct"] = ramp
        seg = [v(k) for k in range(k1 + 2, min(len(rows), k1 + 30))]
        out["mean_group_velocity_frames_2_to_30_after_release_px_s"] = round(sum(seg) / len(seg), 1)
        out["first_frame_after_release_ms_into_frame_note"] = "the release falls inside a frame, so its first moving frame carries a partial step"
    return out


for rt in ("r1", "r2"):
    S[f"apple-sticky-smooth:{rt}"] = a_sticky_smooth(os.path.join(A3, f"sticky-smooth-{rt}-1440.json.gz"))


# ── 6 · P-23: the strip's zero-velocity frames in the Next x 3 chain, with the distance left to the target ──
for rt in ("r1", "r2"):
    d = L(os.path.join(ROOT, f"gap/data/pager-next-{rt}-1440.json.gz"))
    r, ms = d["rows"], d["marks"]
    names = [m[0] for m in ms]
    # the chain: the three presses after the first single Next (gap probe marks)
    chain = [m for m in ms if m[0].startswith("next")]
    t0 = chain[1][1] if len(chain) > 3 else chain[0][1]
    kk = next(j for j, x in enumerate(r) if x["t"] >= t0)
    final = r[-1]["sl"]
    kend = next(j for j in range(len(r) - 1, 0, -1) if r[j]["sl"] != r[j - 1]["sl"])
    zeros = []
    for j in range(kk + 1, kend + 1):
        if r[j]["sl"] == r[j - 1]["sl"]:
            m3 = abs(r[min(len(r) - 1, j + 1)]["sl"] - r[max(0, j - 2)]["sl"]) / ((r[min(len(r) - 1, j + 1)]["t"] - r[max(0, j - 2)]["t"]) / 1000)
            zeros.append({"ms": round(r[j]["t"] - t0, 1), "sl": r[j]["sl"], "left_to_target_px": round(final - r[j]["sl"], 1),
                          "mean_speed_3_frames_px_s": round(m3)})
    S[f"pager-next:{rt}"] = {"meta": meta(d), "marks": [[n, round(t - t0)] for n, t in ms], "chain_start_sl": r[kk - 1]["sl"],
                             "final_sl": final, "zero_velocity_frames": zeros}


# ── 7 · M-08: lag growth at matched progress (each stall frame located on the dense 120 Hz curve) ──
def hops_of(p):
    d = L(p)
    r, ms = d["rows"], d["marks"]
    out = []
    for i, (n, tm) in enumerate(ms):
        tm1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
        seg = [x for x in r if tm <= x["t"] < tm1]
        mids = [(ctr(x["bA"]) + ctr(x["bB"])) / 2 for x in seg]
        a, b = mids[0], mids[-1]
        prog = [(m - a) / (b - a) for m in mids]
        out.append((n, [x["t"] - tm for x in seg], prog))
    return out, d


ref, dref = hops_of(os.path.join(ROOT, "amend2/data/gui/fps-r1-1440.json.gz"))
for var in ("rafstall", "raf60"):
    st, dst = hops_of(os.path.join(ROOT, f"amend2/data/gui/fps-r1-1440-{var}.json.gz"))
    hops = []
    for (n, tr, pr), (_, ts, ps) in zip(ref, st):
        # the reference curve's monotone rising part (progress up to its first maximum)
        kmax = max(range(len(pr)), key=lambda j: pr[j])
        def t_ref(p):
            for j in range(1, kmax + 1):
                if pr[j - 1] < p <= pr[j]:
                    return tr[j - 1] + (p - pr[j - 1]) / (pr[j] - pr[j - 1]) * (tr[j] - tr[j - 1])
            return None
        lags = []
        for t, p in zip(ts, ps):
            if 0.1 <= p <= 0.95:  # above 0.95 the curve is flat and a sub-pixel error reads as tens of ms
                tt = t_ref(p)
                if tt is not None:
                    lags.append((round(p, 3), round(t - tt, 1)))
        if lags:
            bins = {}
            for lo_, hi_ in ((0.1, 0.3), (0.3, 0.5), (0.5, 0.7), (0.7, 0.9), (0.9, 0.95)):
                v_ = [l for p_, l in lags if lo_ <= p_ < hi_]
                bins[f"{lo_}-{hi_}"] = round(sum(v_) / len(v_), 1) if v_ else None
            early = [l for p, l in lags if p <= 0.3]
            late = [l for p, l in lags if p >= 0.8]
            hops.append({"hop": n, "frames": len(lags), "mean_lag_ms_by_progress": bins, "lag_ms_first": lags[0], "lag_ms_last": lags[-1],
                         "lag_early_mean_ms_p<=0.3": round(sum(early) / len(early), 1) if early else None,
                         "lag_late_max_ms_0.8<=p<=0.95": max(late) if late else None,
                         "lag_growth_ms": round((max(late) if late else lags[-1][1]) - (sum(early) / len(early) if early else lags[0][1]), 1)})
    S[f"m08-lag-growth:{var}"] = {"meta": meta(dst), "ref_meta": meta(dref), "hops": hops}


# ── 8 · the width-sum law against the goo: the indicator's painted extent through a hop ──
d = L(os.path.join(ROOT, "amend2/data/gui/fps-r1-1440.json.gz"))
r, ms = d["rows"], d["marks"]
ext = []
for i, (n, tm) in enumerate(ms):
    tm1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
    seg = [x for x in r if tm <= x["t"] < tm1]
    def painted(x):
        lo = min(x["bA"][0], x["bB"][0], x["nk"][0] if float(x["nkOp"]) > 0 else 1e9)
        hi = max(x["bA"][0] + x["bA"][2], x["bB"][0] + x["bB"][2], (x["nk"][0] + x["nk"][2]) if float(x["nkOp"]) > 0 else -1e9)
        ring = x["ring"]
        return min(hi, ring[0] + ring[2]) - max(lo, ring[0])  # the ring clips the neck
    e = [painted(x) for x in seg]
    bodies = [max(x["bA"][0] + x["bA"][2], x["bB"][0] + x["bB"][2]) - min(x["bA"][0], x["bB"][0]) for x in seg]
    ext.append({"hop": n, "rest_extent_px": round(e[0], 2), "peak_painted_extent_clipped_px": round(max(e), 2),
                "peak_bodies_span_px": round(max(bodies), 2), "frames_extent_above_rest_plus_0p5": sum(1 for v in e if v > e[0] + 0.5),
                "ring_w": seg[0]["ring"][2]})
S["width-sum:glass-ui-worm"] = {"meta": meta(d), "hops": ext}

json.dump(S, open(os.path.join(ROOT, "amend3", "data", "summary3.json"), "w"), indent=1)
print(json.dumps(S, indent=1)[:200])
