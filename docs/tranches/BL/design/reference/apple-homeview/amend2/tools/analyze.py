"""AMEND-2 analysis: reads amend2/data/{gui,apple}/*.json.gz (and, for two reference cells, the study's
samples/*.json and the GAP seat's gap/data/*.json.gz) and writes amend2/data/summary.json.

Run: python3 -I amend2/tools/analyze.py   (from the apple-homeview directory or anywhere)
Every number in GAP.md's amend-2 rows and change log comes from this file's output.
"""
import gzip
import json
import math
import os
import glob
import csv

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))  # apple-homeview/
GUI = os.path.join(ROOT, "amend2", "data", "gui")
APL = os.path.join(ROOT, "amend2", "data", "apple")
OUT = os.path.join(ROOT, "amend2", "data", "summary.json")


def load(path):
    with gzip.open(path) as f:
        return json.load(f)


def runs(dirn, prefix):
    return sorted(glob.glob(os.path.join(dirn, prefix + "*.json.gz")))


def tag(p):
    return os.path.basename(p).replace(".json.gz", "")


def marks_of(d):
    return [(m[0], m[1]) for m in d.get("marks", [])]


def mark_t(d, name, nth=0):
    hits = [t for n, t in marks_of(d) if n == name]
    return hits[nth] if len(hits) > nth else None


def ctr(rect):
    return rect[0] + rect[2] / 2


def meta_of(d):
    m = d.get("meta", {})
    return {"load": [m.get("loadStart"), m.get("loadEnd")], "frameDt": m.get("frameDt"), "browser": m.get("browser"),
            "ENG": m.get("ENG"), "RAF": m.get("RAF"), "PLANT": m.get("PLANT")}


S = {}

# ───────────────────────── glass-ui ─────────────────────────


def worm_mid(x):
    return (ctr(x["bA"]) + ctr(x["bB"])) / 2


def g_reduced(p):
    d = load(p)
    r = d["rows"]
    out = {"meta": meta_of(d), "hops": []}
    names = [n for n, _ in marks_of(d)]
    for i, (n, t0) in enumerate(marks_of(d)):
        if not n.startswith("click"):
            continue
        t1 = marks_of(d)[i + 1][1] if i + 1 < len(names) else r[-1]["t"]
        seg = [x for x in r if t0 <= x["pn"] < t1]
        pre = [x for x in r if x["pn"] < t0][-1]
        mids = [worm_mid(pre)] + [worm_mid(x) for x in seg]
        seg = [pre] + seg
        moved = [k for k in range(1, len(mids)) if abs(mids[k] - mids[k - 1]) > 0.05]
        neck_frames = sum(1 for x in seg if float(x["nkOp"]) > 0 and x["nk"][2] > 0.5)
        str_vals = sorted(set(x["str"] for x in seg))
        out["hops"].append({
            "mark": n,
            "worm_moving_frames": len(moved),
            "first_move_ms": round(seg[moved[0]]["t"] - t0, 1) if moved else None,
            "last_move_ms": round(seg[moved[-1]]["t"] - t0, 1) if moved else None,
            "neck_visible_frames": neck_frames,
            "stretch_values": str_vals[:6],
            "cur_after": seg[-1]["cur"],
            "strip_sl_values": sorted(set(x["sl"] for x in seg))[:6],
        })
    tp = mark_t(d, "pointerOut")
    after = [x for x in r if x["t"] >= tp]
    ticks = []
    for k in range(1, len(after)):
        if after[k]["cur"] != after[k - 1]["cur"]:
            ticks.append([round(after[k]["t"] - tp), after[k - 1]["cur"], after[k]["cur"]])
    out["autoplay_after_pointer_out"] = {"window_ms": round(after[-1]["t"] - tp), "ticks": ticks}
    return out


def g_material(p):
    d = load(p)
    r = d["rows"]
    mats = sorted(set(tuple(x["mat"]) for x in r))
    rings = sorted(set(tuple(x["ring"][2:]) for x in r))
    return {"meta": meta_of(d), "frames": len(r), "distinct_material_tuples": len(mats), "material": [list(m) for m in mats],
            "distinct_ring_sizes": [list(s) for s in rings], "worm_moving_frames": sum(1 for k in range(1, len(r)) if abs(worm_mid(r[k]) - worm_mid(r[k - 1])) > 0.05),
            "strip_moving_frames": sum(1 for k in range(1, len(r)) if r[k]["sl"] != r[k - 1]["sl"])}


def pitch_of(r):
    # the strip's member pitch from layout: member 1's left minus member 0's at scrollLeft 0 is scale-affected,
    # so read the strip's resting scrollLeft values instead (the smallest non-zero rest value)
    rests = []
    for k in range(5, len(r)):
        if all(r[k - j]["sl"] == r[k]["sl"] for j in range(1, 6)) and r[k]["sl"] > 50:
            rests.append(r[k]["sl"])
    return min(rests) if rests else None


def vel_across(r, t0):
    """strip velocity (px/s) on the 3 frames before a mark and the 6 after, and the smallest |v| in the 150 ms after"""
    k = next((i for i, x in enumerate(r) if x["pn"] >= t0), None)
    if k is None or k < 4:
        return None
    v = lambda i: round((r[i]["sl"] - r[i - 1]["sl"]) / ((r[i]["t"] - r[i - 1]["t"]) / 1000), 1)
    before = [v(i) for i in range(k - 3, k)]
    after = [v(i) for i in range(k, min(len(r), k + 6))]
    win = [i for i in range(k, len(r)) if r[i]["t"] - r[k]["t"] <= 150]
    mn = min((abs(v(i)) for i in win), default=None)
    return {"before": before, "after": after, "min_abs_in_150ms": mn}


def g_interrupt(p):
    d = load(p)
    r = d["rows"]
    pitch = pitch_of(r)
    ms = marks_of(d)
    out = {"meta": meta_of(d), "pitch": pitch, "moves": []}
    for i, (n, t0) in enumerate(ms):
        t1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
        seg = [x for x in r if t0 <= x["t"] < t1]
        if not seg:
            continue
        # strip rest: last frame where sl changes
        lastmove = max([k for k in range(1, len(seg)) if seg[k]["sl"] != seg[k - 1]["sl"]], default=None)
        rest_sl = seg[-1]["sl"]
        under = round(rest_sl / pitch) if pitch else None
        cur_end = seg[-1]["cur"]
        # first frame (after the strip rests) at which cur equals the member under the snap
        t_rest = seg[lastmove]["t"] if lastmove is not None else seg[0]["t"]
        agree = [x for x in seg if x["t"] >= t_rest and x["cur"] == under]
        out["moves"].append({
            "mark": n, "window_ms": round(seg[-1]["t"] - t0), "rest_sl": rest_sl, "member_under_snap": under,
            "cur_at_window_end": cur_end,
            "strip_rest_ms": round(t_rest - t0, 1),
            "cur_agrees_ms_after_rest": round(agree[0]["t"] - t_rest, 1) if agree else None,
            "stale_ms": None if agree else round(seg[-1]["t"] - t_rest, 1),
            "worm_centre_at_end": round(worm_mid(seg[-1]), 2) if "bA" in seg[-1] else None,
            "strip_velocity_across_mark": vel_across(r, t0),
        })
    return out


def g_interrupt_lib(p):
    d = load(p)
    r = d["rows"]
    ms = marks_of(d)
    out = {"meta": meta_of(d), "marks": [[n, round(t)] for n, t in ms], "timeline": []}
    prev = None
    t0 = ms[0][1]
    for x in r:
        k = (x["sl"], x.get("ctr"))
        if prev is None or x.get("ctr") != prev[1]:
            out["timeline"].append([round(x["t"] - t0), x["sl"], x.get("ctr")])
        prev = k
    # rest values per mark window
    win = []
    for i, (n, ta) in enumerate(ms):
        tb = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
        seg = [x for x in r if ta <= x["t"] < tb]
        win.append({"mark": n, "rest_sl": seg[-1]["sl"], "ctr_end": seg[-1].get("ctr"),
                    "sl_extremes": [min(x["sl"] for x in seg), max(x["sl"] for x in seg)]})
    out["windows"] = win
    return out


def g_keyboard(p):
    d = load(p)
    r = d["rows"]
    ms = marks_of(d)
    out = {"meta": meta_of(d), "keys": []}
    for i, (n, t0) in enumerate(ms):
        t1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
        # segment by the sample's own performance.now (pn): a rAF timestamp can precede the key event by a frame
        seg = [x for x in r if t0 <= x["pn"] < t1]
        pre = [x for x in r if x["pn"] < t0]
        b = pre[-1] if pre else seg[0]
        e = seg[-1]
        wm = [worm_mid(x) for x in seg]
        mv = [k for k in range(1, len(wm)) if abs(wm[k] - wm[k - 1]) > 0.05]
        out["keys"].append({"key": n, "cur": [b["cur"], e["cur"]], "focus": [b["foc"], e["foc"]], "sl": [b["sl"], e["sl"]],
                            "worm_first_move_ms": round(seg[mv[0]]["t"] - t0, 1) if mv else None,
                            "strip_moved": any(x["sl"] != b["sl"] for x in seg)})
    return out


def g_press(p):
    d = load(p)
    r = d["rows"]
    ms = dict((n, t) for n, t in marks_of(d))
    out = {"meta": meta_of(d), "marks": {k: round(v) for k, v in ms.items()}}
    t0 = ms["down"]
    tl = []
    prev = None
    for x in r:
        k = (x["press"], x["cur"], tuple(pp[0] for pp in x["pip"]))
        if k != prev:
            tl.append([round(x["t"] - t0, 1), x["press"], x["cur"], [pp[0] for pp in x["pip"]]])
        prev = k
    out["timeline_from_down"] = tl[:40]
    pre = [x for x in r if x["t"] < t0][-1]
    out["cur_before"] = pre["cur"]
    out["cur_after"] = r[-1]["cur"]
    tu = ms["up"]
    after_up = [x for x in r if x["t"] >= tu]
    out["press_attr_after_up_frames"] = sum(1 for x in after_up if x["press"] >= 0)
    # the pressed pip's scale through the drag-off: does the press release when the pointer leaves?
    td = ms["dragOff"]
    off = [x for x in r if td + 120 <= x["t"] < tu]
    out["press_attr_while_dragged_off_frames"] = [sum(1 for x in off if x["press"] >= 0), len(off)]
    out["pip_scales_while_dragged_off"] = sorted(set(x["pip"][2][0] for x in off))[:6] if off and len(off[0]["pip"]) > 2 else None
    out["pip_scales_after_up"] = sorted(set(x["pip"][2][0] for x in after_up))[:8] if after_up and len(after_up[0]["pip"]) > 2 else None
    return out


def hop_metrics(seg, t0):
    mids = [worm_mid(x) for x in seg]
    mv = [k for k in range(1, len(mids)) if abs(mids[k] - mids[k - 1]) > 0.05]
    if not mv:
        return None
    start, end = mids[0], mids[-1]
    dist = end - start
    # land: first time the midpoint is within 0.5 px of the end and stays
    land = None
    for k in range(len(mids)):
        if all(abs(m - end) <= 0.5 for m in mids[k:]):
            land = k
            break
    strs = [float(x["str"] or 1) for x in seg]
    # backward first step: the first moving frame's displacement sign against the hop's direction
    first_step = mids[mv[0]] - mids[mv[0] - 1]
    neck_w = max(x["nk"][2] for x in seg)
    wide = [x["t"] for x in seg if x["nk"][2] > x["ring"][2] and float(x["nkOp"]) > 0]
    neck_wider_than_ring_ms = round(wide[-1] - wide[0] + 8.3, 1) if wide else 0.0
    # W-F.3 G3's quantity: the worst body centre outside [origin, lead] on any frame
    lo, hi = min(start, end) - 0.0, max(start, end) + 0.0
    worst = 0.0
    for x in seg:
        for b in (x["bA"], x["bB"]):
            c = ctr(b)
            worst = max(worst, lo - c, c - hi)
    # progress at fixed times (ms after the mark), for the cross-clock comparison
    prog = {}
    for ms_ in (25, 50, 100, 150, 200, 250, 300):
        tt = t0 + ms_
        cand = [k for k in range(len(seg)) if seg[k]["t"] <= tt]
        if cand and dist:
            prog[ms_] = round((mids[cand[-1]] - start) / dist, 3)
    return {"dist_px": round(dist, 2), "first_move_ms": round(seg[mv[0]]["t"] - t0, 1), "land_ms": round(seg[land]["t"] - t0, 1) if land is not None else None,
            "stretch_peak": round(max(strs), 3), "first_step_px": round(first_step, 2), "first_step_backward": (first_step * dist) < 0,
            "neck_max_px": neck_w, "neck_wider_than_ring_ms": neck_wider_than_ring_ms, "ring_w": seg[0]["ring"][2], "body_worst_outside_origin_lead_px": round(worst, 2), "progress_at_ms": prog}


def g_fps(p):
    d = load(p)
    r = d["rows"]
    ms = marks_of(d)
    out = {"meta": meta_of(d), "hops": []}
    for i, (n, t0) in enumerate(ms):
        t1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
        seg = [x for x in r if t0 - 20 <= x["t"] < t1]
        out["hops"].append({"mark": n, **(hop_metrics(seg, t0) or {})})
    return out


def g_visibility(p):
    d = load(p)
    r = d["rows"]
    ms = marks_of(d)
    out = {"meta": meta_of(d), "windows": []}
    for i, (n, t0) in enumerate(ms):
        t1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
        seg = [x for x in r if t0 <= x["t"] < t1]
        ticks = [round(seg[k]["t"] - t0) for k in range(1, len(seg)) if seg[k]["cur"] != seg[k - 1]["cur"]]
        out["windows"].append({"mark": n, "ms": round(seg[-1]["t"] - t0), "car_top": [seg[0]["car"][1], seg[-1]["car"][1]], "cur_ticks_ms": ticks,
                               "time_driven_pager_anims": sorted(set(a for x in seg for a in x.get("panims", [])))})
    return out


def sticky_witness_pairs(pairs, inset=32, H=900, tol=0.5):
    """The CR-02 sticky law (CSS sticky, bottom inset, inside a container), per frame:
        groupBottom = max(containerTop + d, min(H - inset, containerBottom - c))
    c: the group's in-flow offset from the container's bottom (median of cb - gb over frames where the group is
    above the inset line and below its top clamp); d: the top clamp (median of gb - ct over frames where the group
    is below the inset line), or no clamp when no such frame exists. PASS needs every frame within tol, >= 10 frames
    in the stuck regime (the law picks H - inset) with >= 50 px of container travel during it, and >= 10 frames in
    the released regime (the law picks containerBottom - c). A fixed group never releases; an in-flow group is never
    stuck while its container scrolls."""
    line = H - inset
    below = [(g[1] + g[3]) - c[1] for g, c in pairs if (g[1] + g[3]) > line + 1]
    d = sorted(below)[len(below) // 2] if below else None
    above = [(c[1] + c[3]) - (g[1] + g[3]) for g, c in pairs if (g[1] + g[3]) < line - 1]
    if not above:
        return {"released_frames": 0, "pass": False, "why": "never released (group never above the inset line)"}
    cfit = sorted(above)[len(above) // 2]
    errs, stuck, released, clamped = [], [], [], []
    for g, c in pairs:
        gb = g[1] + g[3]
        cb = c[1] + c[3]
        inner = min(line, cb - cfit)
        law = max(c[1] + d, inner) if d is not None else inner
        errs.append(abs(gb - law))
        if d is not None and c[1] + d > inner:
            clamped.append(c[1])
        elif cb - cfit > line:
            stuck.append(c[1])
        else:
            released.append(c[1])
    travel = (stuck[0] - stuck[-1]) if len(stuck) > 1 else 0
    ok = max(errs) <= tol and len(stuck) >= 10 and travel >= 50 and len(released) >= 10
    return {"c_fit_px": round(cfit, 2), "d_fit_px": None if d is None else round(d, 2), "max_err_px": round(max(errs), 2),
            "top_clamped_frames": len(clamped), "stuck_frames": len(stuck), "stuck_container_travel_px": round(travel, 1),
            "released_frames": len(released), "pass": ok}


def sticky_witness(rows, inset=32, H=900, tol=0.5):
    """The CR-02 sticky witness, evaluated per frame on a scroll leg:
    phase A (the carousel's bottom edge is below H - inset - groupH): the group's bottom sits at H - inset (± tol);
    phase B (after): the group's bottom stays at the carousel's bottom minus a constant (± tol), i.e. it leaves with it.
    Both phases must hold, and phase A must have >= 10 frames (the group was stuck while the carousel scrolled)."""
    A, B = [], []
    for x in rows:
        g = x["ring"]
        gb = g[1] + g[3]
        cb = x["car"][1] + x["car"][3]
        if cb > H - inset + 0.5:
            A.append((x, abs(gb - (H - inset))))
        else:
            B.append((x, gb - cb))
    a_ok = len(A) >= 10 and max(e for _, e in A) <= tol
    if B:
        offs = [o for _, o in B]
        b_ok = (max(offs) - min(offs)) <= tol
    else:
        b_ok = False
    # also: did the carousel actually scroll during phase A?
    car_travel_A = (A[0][0]["car"][1] - A[-1][0]["car"][1]) if len(A) > 1 else 0
    return {"phaseA_frames": len(A), "phaseA_max_err_px": round(max([e for _, e in A], default=0), 2), "phaseA_carousel_travel_px": round(car_travel_A, 1),
            "phaseB_frames": len(B), "phaseB_offset_spread_px": round((max(o for _, o in B) - min(o for _, o in B)) if B else 0, 2),
            "pass": a_ok and b_ok and car_travel_A > 50}


def g_sticky(p):
    d = load(p)
    r = [x for x in d["rows"] if "ring" in x]
    out = {"meta": meta_of(d), "frames": len(r), "ring_y_range": [min(x["ring"][1] for x in r), max(x["ring"][1] for x in r)],
           "car_top_range": [min(x["car"][1] for x in r), max(x["car"][1] for x in r)], "rpos": sorted(set(x["rpos"] for x in r)),
           "witness": sticky_witness_pairs([(x["ring"], x["car"]) for x in r], inset=32, H=d["meta"]["H"])}
    # the old GAP witness (Δy <= 0.5 while <main> scrolls 0 -> 700): the group's y range over frames where the main scrolled >= 700
    ms0 = r[0]["ms"]
    leg = [x for x in r if x["ms"] - ms0 <= 700]
    out["old_witness"] = {"main_scrolled": round(r[-1]["ms"] - ms0), "ring_dy_over_first_700px": round(max(x["ring"][1] for x in leg) - min(x["ring"][1] for x in leg), 2),
                          "pass": (r[-1]["ms"] - ms0) >= 700 and (max(x["ring"][1] for x in leg) - min(x["ring"][1] for x in leg)) <= 0.5}
    return out


def channel_onsets(rows, t0, key):
    base = key(rows[0])
    for x in rows:
        if x["t"] >= t0 and key(x) != base:
            return round(x["t"] - t0, 1)
    return None


def entrance_witness(rows, t0):
    """The amended CR-03 witness, the parts a page can be measured on per frame:
    E1 a spring: at least one geometric channel of the group (rise = ring y relative to its rest, or ring width)
       passes its rest value by >= 2 % of its travel and returns (one overshoot), i.e. not a monotone tween;
    E2 not a linear ramp: on the leading channel, the largest deviation of progress from a straight line over
       the move is >= 0.08;
    E3 a staggered dot entrance: the pips' first-change times span >= 2 distinct onsets >= 15 ms apart;
    E4 the hand-off: when two shapes overlap (blob and pill), union area >= the smaller shape on every frame
       (not evaluable on glass-ui: there is no second shape; recorded as N/A, and the row fails without E1-E3).
    Returns each part and the conjunction."""
    seg = [x for x in rows if x["t"] >= t0]
    if len(seg) < 10:
        return {"pass": False, "why": "no frames"}
    # rise relative to the carousel (so page scroll is removed): ring top minus carousel top
    rel = [x["ring"][1] - x["car"][1] for x in seg]
    w = [x["ring"][2] for x in seg]  # getBoundingClientRect already includes a scale
    op = [x["rop"] for x in seg]
    res = {}
    def overshoot(v):
        a, b = v[0], v[-1]
        span = b - a
        if abs(span) < 1e-6:
            return 0.0
        past = max((vv - b) / span for vv in v)
        return round(past, 3)
    res["E1_overshoot_rel_y"] = overshoot(rel)
    res["E1_overshoot_width"] = overshoot(w)
    res["E1_overshoot_opacity"] = overshoot(op)
    E1 = max(res["E1_overshoot_rel_y"], res["E1_overshoot_width"]) >= 0.02
    # E2 on the channel that moves most (normalised): opacity if nothing geometric moves
    def lin_dev(v, ts):
        a, b = v[0], v[-1]
        if abs(b - a) < 1e-6:
            return None
        # move window: first and last frames that differ from the ends
        k0 = next((k for k in range(len(v)) if abs(v[k] - a) > 1e-3 * abs(b - a)), None)
        k1 = max((k for k in range(len(v)) if abs(v[k] - b) > 1e-3 * abs(b - a)), default=None)
        if k0 is None or k1 is None or k1 <= k0:
            return None
        T0, T1 = ts[k0 - 1] if k0 else ts[k0], ts[k1 + 1] if k1 + 1 < len(ts) else ts[k1]
        dev = 0
        for k in range(k0, k1 + 1):
            pr = (v[k] - a) / (b - a)
            lt = (ts[k] - T0) / (T1 - T0)
            dev = max(dev, abs(pr - lt))
        return round(dev, 3), round(T1 - T0, 1)
    ts = [x["t"] for x in seg]
    chans = {"rel_y": rel, "width": w, "opacity": op}
    devs = {k: lin_dev(v, ts) for k, v in chans.items()}
    res["E2_linear_deviation"] = {k: v for k, v in devs.items()}
    moving = [v for v in devs.values() if v]
    E2 = bool(moving) and max(v[0] for v in moving) >= 0.08
    # E3 stagger
    npips = len(seg[0]["pip"])
    onsets = []
    for j in range(npips):
        base = tuple(seg[0]["pip"][j])
        o = next((x["t"] - t0 for x in seg if tuple(x["pip"][j]) != base), None)
        onsets.append(None if o is None else round(o, 1))
    res["E3_pip_onsets_ms"] = onsets
    distinct = sorted(set(o for o in onsets if o is not None))
    E3 = len(distinct) >= 2 and (distinct[-1] - distinct[0]) >= 15
    res["E4_handoff"] = "N/A (one shape)"
    res["parts"] = {"E1": E1, "E2": E2, "E3": E3}
    res["pass"] = E1 and E2 and E3
    return res


def old_entrance_witness(rows, t0):
    """GAP's CR-03 witness as written: width, rise and material change over >= 1.0 s after the threshold frame
    (here: any of ring width/scale, rise, opacity or material changes, and its changes span >= 1.0 s)."""
    seg = [x for x in rows if x["t"] >= t0]
    def key(x):
        return (x["ring"][2], x["ring"][3], round(x["ring"][1] - x["car"][1], 2), x["rop"], tuple(x["rtf"]), tuple(x["mat"]))
    ch = [seg[k]["t"] for k in range(1, len(seg)) if key(seg[k]) != key(seg[k - 1])]
    span = (ch[-1] - ch[0]) if ch else 0
    return {"changing_frames": len(ch), "change_span_ms": round(span, 1), "pass_one_run": span >= 1000}


def g_enter(p):
    d = load(p)
    r = [x for x in d["rows"] if "ring" in x]
    ms = marks_of(d)
    t0 = ms[0][1]
    # threshold frame: first frame where the ring's state changed (plant), else the scroll mark
    def key(x):
        return (x["rop"], tuple(x["rtf"]), x["ring"][2], x["ring"][3])
    first = next((x["t"] for x in r if key(x) != key(r[0])), None)
    t_thr = first if first is not None else t0
    out = {"meta": meta_of(d), "frames": len(r), "first_ring_change_ms_after_mark": round(first - t0, 1) if first else None,
           "ring_size_values": sorted(set((x["ring"][2], x["ring"][3]) for x in r))[:6],
           "opacity_values_n": len(set(x["rop"] for x in r)),
           "new_witness": entrance_witness(r, t_thr), "old_witness": old_entrance_witness(r, t_thr)}
    # the opacity curve for the plant runs (to compare two speeds)
    seg = [x for x in r if x["t"] >= t_thr]
    out["curve"] = [[round(x["t"] - t_thr, 1), x["rop"], x["rtf"][1]] for x in seg[:140:7]]
    return out


def g_contrast(p):
    d = load(p)
    return {"meta": meta_of(d), "slides": d.get("slides")}


def g_launch_from_gap():
    """The launch step on the GAP seat's own hop runs (gap/data/click-r*, worm-hero-r*), recomputed here so the
    amended R-02 row rests on a file of this seat: the bodies' midpoint first step against the hop's direction."""
    out = []
    for p in sorted(glob.glob(os.path.join(ROOT, "gap", "data", "click-r*-1440.json.gz")) + sorted(glob.glob(os.path.join(ROOT, "gap", "data", "worm-hero-r*-1440.json.gz")))):
        d = load(p)
        r = d.get("rows") or d.get("frames") or []
        if not r or "bA" not in r[0]:
            # the GAP probe's field names
            pass
        out.append({"run": tag(p), "keys": sorted(r[0].keys())[:30] if r else []})
    return out


# ───────────────────────── Apple ─────────────────────────


def a_rows(d):
    return d.get("frames", [])


def a_visibility(p):
    d = load(p)
    r = a_rows(d)
    ms = marks_of(d)
    out = {"meta": meta_of(d), "marks": [[n, round(t)] for n, t in ms], "transitions": []}
    prev = None
    for x in r:
        st = "playing" if "playing" in x["galCls"] else "paused" if "paused" in x["galCls"] else "ended" if "ended" in x["galCls"] else x["galCls"][-12:]
        k = (st, x["cur"])
        if k != prev:
            # nearest preceding mark
            pm = [(n, t) for n, t in ms if t <= x["t"]]
            out["transitions"].append({"t_ms_after_mark": round(x["t"] - pm[-1][1], 1) if pm else None, "mark": pm[-1][0] if pm else None,
                                       "state": st, "cur": x["cur"], "fill_w": x["aw"], "gal_top": x["gal"][1], "sy": x["sy"]})
        prev = k
    # fill continuity at each resume: fill width on the last paused frame vs the first playing frame
    jumps = []
    for k in range(1, len(r)):
        a, b = r[k - 1], r[k]
        if "paused" in a["galCls"] and "playing" in b["galCls"] and a["cur"] == b["cur"]:
            nxt = r[k:k + 30]
            rate = (nxt[-1]["aw"] - nxt[0]["aw"]) / ((nxt[-1]["t"] - nxt[0]["t"]) / 1000) if len(nxt) > 2 and nxt[-1]["aw"] is not None else None
            jumps.append({"paused_fill": a["aw"], "first_playing_fill": b["aw"], "rate_px_s_next_30_frames": round(rate, 3) if rate else None})
    out["resume_fill"] = jumps
    # the gallery's visible fraction at each pause/play flip
    return out


def a_sticky(p):
    d = load(p)
    r = a_rows(d)
    H = d["meta"]["H"]
    out = {"meta": meta_of(d), "frames": len(r)}
    # per frame: the AAP's bottom inset from the viewport bottom, the container's bottom
    rows = []
    for x in r:
        ab = x["aap"]["y"] + x["aap"]["h"]
        cb = x["cont"][1] + x["cont"][3]
        rows.append((x["t"], x["sy"], round(H - ab, 2), round(cb - ab, 2), x["pos"], x["aap"]["y"]))
    stuck = [q for q in rows if abs(q[2] - rows[0][2]) <= 0.5]
    out["first"] = rows[0]
    out["inset_values_while_stuck"] = sorted(set(q[2] for q in stuck))[:5]
    # release: first frame the bottom inset grows (the dock leaves with the container)
    rel = next((k for k in range(len(rows)) if rows[k][2] > rows[0][2] + 0.5), None)
    if rel is not None:
        out["release"] = {"t_ms": round(rows[rel][0] - rows[0][0], 1), "sy": rows[rel][1], "container_bottom_minus_aap_bottom": rows[rel][3]}
        after = rows[rel:]
        offs = [q[3] for q in after if q[5] > -200]
        out["after_release_container_offset_range"] = [min(offs), max(offs)] if offs else None
        # per-frame aap y step vs scroll step after release (moves 1:1 with the page?)
        steps = []
        for k in range(rel + 1, min(len(rows), rel + 200)):
            dsy = rows[k][1] - rows[k - 1][1]
            dy = rows[k][5] - rows[k - 1][5]
            if dsy:
                steps.append(round(dy + dsy, 2))
        out["after_release_aap_dy_plus_dsy"] = sorted(set(steps))[:8]
        before = []
        for k in range(1, rel):
            dsy = rows[k][1] - rows[k - 1][1]
            dy = rows[k][5] - rows[k - 1][5]
            if dsy:
                before.append(round(dy, 2))
        out["while_stuck_aap_dy_on_scroll_frames"] = sorted(set(before))[:8]
    pairs = [([x["aap"]["x"], x["aap"]["y"], x["aap"]["w"], x["aap"]["h"]], x["cont"]) for x in r]
    out["sticky_witness"] = sticky_witness_pairs(pairs, inset=32, H=H)
    return out, rows


def a_keyboard(p):
    d = load(p)
    r = a_rows(d)
    ms = marks_of(d)
    out = {"meta": meta_of(d), "keys": []}
    for i, (n, t0) in enumerate(ms):
        t1 = ms[i + 1][1] if i + 1 < len(ms) else r[-1]["t"] + 1
        seg = [x for x in r if t0 <= x["t"] < t1]
        pre = [x for x in r if x["t"] < t0]
        b = pre[-1] if pre else seg[0]
        e = seg[-1]
        mv = next((x["t"] - t0 for x in seg if x["sl"] != b["sl"]), None)
        out["keys"].append({"key": n, "cur": [b["cur"], e["cur"]], "focus": [b["foc"], e["foc"]], "sl": [b["sl"], e["sl"]],
                            "strip_first_move_ms": round(mv, 1) if mv is not None else None, "active_end": e["act"]})
    return out


def a_press(p):
    d = load(p)
    r = a_rows(d)
    ms = dict(marks_of(d))
    out = {"meta": meta_of(d), "marks": {k: round(v) for k, v in ms.items()}}
    t0 = ms["down"]
    pre = [x for x in r if x["t"] < t0][-1]
    out["cur_before"] = pre["cur"]
    tl = []
    prev = None
    for x in r:
        k = (x["cur"], tuple(tuple(v) for v in x["lbf"][3:4]), tuple(x["lbg"][3:4]), "playing" in x["galCls"])
        if k != prev:
            tl.append([round(x["t"] - t0, 1), x["cur"], x["lbf"][3], x["lbg"][3], "playing" in x["galCls"]])
        prev = k
    out["timeline_dot3_from_down"] = tl[:30]
    up = ms["up"]
    seg = [x for x in r if up <= x["t"] < ms.get("down5", r[-1]["t"] + 1)]
    out["cur_after_dragoff_release"] = seg[-1]["cur"] if seg else None
    seg5 = [x for x in r if x["t"] >= ms.get("up5", 1e18)]
    out["cur_after_control_release"] = seg5[-1]["cur"] if seg5 else None
    return out


def a_pause_resume(p):
    d = load(p)
    r = a_rows(d)
    ms = dict(marks_of(d))
    out = {"meta": meta_of(d)}
    def fill_at(t):
        c = [x for x in r if x["t"] <= t]
        return c[-1]["aw"] if c else None
    flips = []
    for k in range(1, len(r)):
        a, b = r[k - 1], r[k]
        sa = "playing" if "playing" in a["galCls"] else "paused"
        sb = "playing" if "playing" in b["galCls"] else "paused"
        if sa != sb:
            flips.append({"t": round(b["t"]), "from": sa, "to": sb, "fill_before": a["aw"], "fill_after": b["aw"], "cur": b["cur"]})
    out["flips"] = flips
    # rate before the pause and after the resume (px/s of the ::after width)
    def rate(t_a, t_b):
        seg = [x for x in r if t_a <= x["t"] <= t_b and x["aw"] is not None]
        if len(seg) < 3:
            return None
        return round((seg[-1]["aw"] - seg[0]["aw"]) / ((seg[-1]["t"] - seg[0]["t"]) / 1000), 3)
    if flips:
        out["rate_before_pause_px_s"] = rate(flips[0]["t"] - 600, flips[0]["t"] - 20)
        if len(flips) > 1:
            out["rate_after_resume_px_s"] = rate(flips[1]["t"] + 20, flips[1]["t"] + 1500)
            seg = [x for x in r if flips[0]["t"] <= x["t"] < flips[1]["t"]]
            out["fill_values_while_paused"] = sorted(set(x["aw"] for x in seg))[:5]
    return out


def a_contrast(p):
    d = load(p)
    return {"meta": meta_of(d), "slides": d.get("slides"), "sha16": d.get("screenshotSha256_16")}


def a_intro(p):
    d = load(p)
    r = a_rows(d)
    t0 = mark_t(d, "jump")
    act = next((x for x in r if "activated" in x["cls"]), None)
    if not act:
        return {"meta": meta_of(d), "activated": False}
    ta = act["t"]
    seg = [x for x in r if x["t"] >= ta]
    # the rise: the AAP's transform translateY (matrix f)
    def ty(x):
        tf = x["aap"]["tf"]
        if tf.startswith("matrix("):
            return float(tf[7:-1].split(",")[5])
        if tf.startswith("matrix3d("):
            return float(tf[9:-1].split(",")[13])
        return 0.0
    ys = [ty(x) for x in seg]
    pk = min(ys)
    k_pk = ys.index(pk)
    settle = None
    for k in range(len(ys)):
        if all(abs(v) <= 0.5 for v in ys[k:]):
            settle = k
            break
    pill = [x["bgD"]["w"] for x in seg]
    pill_pk = max(pill)
    hide = next((x["t"] - ta for x in seg if x["intro"]["disp"] == "none" or x["intro"]["op"] == 0), None)
    curve = {}
    for ms_ in (100, 200, 300, 400, 600, 800, 1000, 1200):
        c = [k for k in range(len(seg)) if seg[k]["t"] - ta <= ms_]
        if c:
            curve[ms_] = round(ys[c[-1]], 2)
    return {"meta": meta_of(d), "activated_ms_after_jump": round(ta - t0, 1) if t0 else None,
            "rise_start": round(ys[0], 2), "rise_peak": round(pk, 2), "rise_peak_ms": round(seg[k_pk]["t"] - ta, 1),
            "rise_settle_0p5_ms": round(seg[settle]["t"] - ta, 1) if settle is not None else None,
            "pill_width_peak": pill_pk, "blob_hidden_ms": round(hide, 1) if hide is not None else None, "rise_at_ms": curve}


# ───────────────────────── reference cells from the study's samples ─────────────────────────


def ref_rewind():
    rows = list(csv.DictReader(open(os.path.join(ROOT, "samples", "timeline-ended.csv"))))
    meta = json.load(open(os.path.join(ROOT, "samples", "ended.json")))
    ms = [float(r["ms"]) for r in rows]
    sl = [float(r["sl"]) for r in rows]
    k0 = next(k for k in range(1, len(sl)) if sl[k] < sl[k - 1])
    k1 = next(k for k in range(k0, len(sl)) if sl[k] == 0)
    peaks = {}
    for i in range(7):
        ws = [float(rows[k]["w%d" % i]) for k in range(k0, k1 + 1)]
        peaks[i] = round(max(ws), 2)
    maxbig = max(sum(1 for i in range(7) if float(rows[k]["w%d" % i]) > 8.01) for k in range(k0, k1 + 1))
    dotsum = sorted(set(rows[k]["dotsum"] for k in range(k0, k1 + 1)))
    fills = [rows[k]["fill_w"] for k in range(k0, k1 + 1)]
    return {"source": "samples/timeline-ended.csv", "load": meta.get("load"), "move_ms": round(ms[k1] - ms[k0 - 1], 1), "sl": [sl[k0 - 1], sl[k1]],
            "peak_width_per_dot_during_rewind": peaks, "max_enlarged_dots_in_any_frame": maxbig, "dotsum_values": dotsum[:4],
            "fill_values_during_rewind": sorted(set(fills))[:4], "cur_flip_ms_after_move_start": next((round(ms[k] - ms[k0 - 1], 1) for k in range(k0, k1 + 1) if rows[k]["cur"] != rows[k0 - 1]["cur"]), None)}


def ref_visibility():
    d = json.load(open(os.path.join(ROOT, "samples", "replay.json")))
    r = d["rows"]
    g = d["geom"]
    out = {"source": "samples/replay.json", "load": d.get("load"), "marks": d["marks"], "flips": []}
    prev = None
    for x in r:
        st = "playing" if "playing" in x["gCls"] else "paused" if "paused" in x["gCls"] else "other"
        if st != prev:
            pm = [m for m in d["marks"] if m["t"] <= x["t"]]
            top = g["galTop"] - x["sy"]
            vis = max(0, min(g["vh"], top + g["galH"]) - max(0, top)) / g["galH"]
            out["flips"].append({"t": x["t"], "state": st, "after_mark": pm[-1]["m"] if pm else None, "ms_after_mark": round(x["t"] - pm[-1]["t"], 1) if pm else None,
                                 "sy": x["sy"], "gallery_visible_fraction": round(vis, 3)})
        prev = st
    return out


def ref_playpause():
    rows = list(csv.DictReader(open(os.path.join(ROOT, "samples", "timeline-playpause.csv"))))
    meta = json.load(open(os.path.join(ROOT, "samples", "playpause.json")))
    out = {"source": "samples/timeline-playpause.csv", "load": meta.get("load"), "flips": []}
    for k in range(1, len(rows)):
        if rows[k]["gCls"] != rows[k - 1]["gCls"]:
            out["flips"].append({"ms": float(rows[k]["ms"]), "to": rows[k]["gCls"], "fill_prev": float(rows[k - 1]["fill_w"]), "fill": float(rows[k]["fill_w"]),
                                 "fill_next5": [float(rows[j]["fill_w"]) for j in range(k + 1, min(len(rows), k + 6))]})
    def rate(a, b):
        seg = [r for r in rows if a <= float(r["ms"]) <= b]
        return round((float(seg[-1]["fill_w"]) - float(seg[0]["fill_w"])) / ((float(seg[-1]["ms"]) - float(seg[0]["ms"])) / 1000), 3)
    f = out["flips"]
    if len(f) >= 2:
        out["rate_before_px_s"] = rate(f[0]["ms"] - 600, f[0]["ms"] - 10)
        out["rate_after_px_s"] = rate(f[1]["ms"] + 10, min(f[1]["ms"] + 600, float(rows[-1]["ms"])))
        out["paused_values"] = sorted(set(r["fill_w"] for r in rows if f[0]["ms"] <= float(r["ms"]) < f[1]["ms"]))
    return out


def main():
    g = {}
    for p in runs(GUI, "reduced-pager"):
        g[tag(p)] = g_reduced(p)
    for p in runs(GUI, "material"):
        g[tag(p)] = g_material(p)
    for p in runs(GUI, "interrupt-r"):
        g[tag(p)] = g_interrupt(p)
    for p in runs(GUI, "interrupt-lib"):
        g[tag(p)] = g_interrupt_lib(p)
    for p in runs(GUI, "keyboard"):
        g[tag(p)] = g_keyboard(p)
    for p in runs(GUI, "press-cancel"):
        g[tag(p)] = g_press(p)
    for p in runs(GUI, "fps"):
        g[tag(p)] = g_fps(p)
    for p in runs(GUI, "visibility"):
        g[tag(p)] = g_visibility(p)
    for p in runs(GUI, "sticky"):
        g[tag(p)] = g_sticky(p)
    for p in runs(GUI, "enter2"):
        g[tag(p)] = g_enter(p)
    for p in runs(GUI, "contrast"):
        g[tag(p)] = g_contrast(p)
    for p in runs(GUI, "wk-cells"):
        d = load(p)
        g[tag(p)] = {"meta": meta_of(d), "errors": d.get("errors"), "rows": len(d.get("rows", []))}
        if d.get("rows"):
            g[tag(p)].update(g_interrupt(p))
    a = {}
    for p in runs(APL, "visibility"):
        a[tag(p)] = a_visibility(p)
    for p in runs(APL, "sticky"):
        a[tag(p)], _ = a_sticky(p)
    for p in runs(APL, "keyboard"):
        a[tag(p)] = a_keyboard(p)
    for p in runs(APL, "press-cancel"):
        a[tag(p)] = a_press(p)
    for p in runs(APL, "pause-resume"):
        a[tag(p)] = a_pause_resume(p)
    for p in runs(APL, "contrast"):
        a[tag(p)] = a_contrast(p)
    for p in runs(APL, "intro"):
        try:
            a[tag(p)] = a_intro(p)
        except Exception as e:  # a crashed engine run has no frames
            a[tag(p)] = {"error": repr(e)[:200], "meta": meta_of(load(p))}
    ref = {"rewind": ref_rewind(), "visibility": ref_visibility(), "playpause": ref_playpause()}
    out = {"glass_ui": g, "apple": a, "reference_samples": ref}
    with open(OUT, "w") as f:
        json.dump(out, f, indent=1, default=str)
    print("wrote", OUT, "gui", len(g), "apple", len(a))


if __name__ == "__main__":
    main()
