"""CRITIQUE-2 re-derivation. Reads only committed/banked raw samples under apple-homeview/ (amend2/data/**, gap/data/**)
and recomputes the numbers GAP.md (amend 2) cites, with this seat's own definitions. No browser, no network.

usage: python3 -I critique2/tools/rederive2.py   (from apple-homeview/) -> critique2/data/rederive2.json
"""
import gzip, json, os, statistics, sys

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
A2 = os.path.join(ROOT, "amend2", "data")
OUT = {}


def L(p):
    return json.load(gzip.open(os.path.join(ROOT, p)))


def ctr(b):
    return b[0] + b[2] / 2


def mid(x):
    return (ctr(x["bA"]) + ctr(x["bB"])) / 2


def marks(d):
    return [(m[0], m[1]) for m in d.get("marks", [])]


def window(rows, ms, i, key="t", pre=0):
    t0 = ms[i][1]
    t1 = ms[i + 1][1] if i + 1 < len(ms) else rows[-1][key] + 1
    return t0, [x for x in rows if t0 - pre <= x[key] < t1]


# ── 1 · goo: worm hops on the 208 px carousel, three clocks ──
def hops(path):
    d = L(path)
    r, ms = d["rows"], marks(d)
    out = []
    for i, (n, _) in enumerate(ms):
        t0, seg = window(r, ms, i, pre=25)
        start = mid(seg[0]); end = mid(seg[-1]); dist = end - start
        m = [mid(x) for x in seg]
        mv = [k for k in range(1, len(m)) if abs(m[k] - m[k - 1]) > 0.01]
        first = m[mv[0]] - m[mv[0] - 1]
        lo, hi = min(start, end), max(start, end)
        out_span = max(max(lo - ctr(x[b]), ctr(x[b]) - hi) for x in seg for b in ("bA", "bB"))
        wide = [x["t"] for x in seg if x["nk"][2] > x["ring"][2] and float(x["nkOp"]) > 0]
        # landing, two readings: midpoint within 0.5 px for good; both bodies within 0.5 px and neck hidden for good
        land_mid = next(k for k in range(len(m)) if all(abs(v - end) <= 0.5 for v in m[k:]))
        land_all = next(k for k in range(len(seg)) if all(abs(ctr(y["bA"]) - end) <= 0.5 and abs(ctr(y["bB"]) - end) <= 0.5 for y in seg[k:]))
        dts = [seg[k]["t"] - seg[k - 1]["t"] for k in range(max(1, land_mid - 3), min(len(seg), land_mid + 2))]
        out.append({"hop": n, "dist": round(dist, 2), "first_move_ms": round(seg[mv[0]]["t"] - t0, 1),
                    "first_mid_step_px": round(first, 2), "backward": first * dist < 0,
                    "neck_max_px": max(x["nk"][2] for x in seg), "ring_w": seg[0]["ring"][2],
                    "neck_wider_than_ring_first_to_last_ms": round(wide[-1] - wide[0], 1) if wide else 0,
                    "body_outside_span_px": round(out_span, 2),
                    "land_mid_ms": round(seg[land_mid]["t"] - t0, 1), "land_both_bodies_ms": round(seg[land_all]["t"] - t0, 1),
                    "frame_dt_around_land_ms": [round(v, 1) for v in dts],
                    "stretch_peak": max(float(x["str"] or 1) for x in seg)})
    return {"load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]], "frameDt": d["meta"].get("frameDt"), "hops": out}


for tag in ("fps-r1-1440", "fps-r1-1440-raf60", "fps-r1-1440-rafstall"):
    OUT["goo:" + tag] = hops(f"amend2/data/gui/{tag}.json.gz")


# ── 2 · P-27 material per frame ──
for rt in ("r1", "r2"):
    d = L(f"amend2/data/gui/material-{rt}-1440.json.gz"); r = d["rows"]
    OUT[f"material:{rt}"] = {"frames": len(r), "material_tuples": sorted(set(json.dumps(x["mat"]) for x in r)),
                             "ring_sizes": sorted(set(tuple(x["ring"][2:]) for x in r)),
                             "worm_moving_frames": sum(1 for k in range(1, len(r)) if abs(mid(r[k]) - mid(r[k - 1])) > 0.01),
                             "strip_moving_frames": sum(1 for k in range(1, len(r)) if r[k]["sl"] != r[k - 1]["sl"]),
                             "ring_opacity": sorted(set(x["rop"] for x in r)), "load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]]}


# ── 3 · P-36 reduced pager ──
for rt in ("r1", "r2"):
    d = L(f"amend2/data/gui/reduced-pager-{rt}-1440.json.gz"); r, ms = d["rows"], marks(d)
    res = {"marks": [(n, round(t)) for n, t in ms], "clicks": []}
    for i, (n, _) in enumerate(ms):
        if not n.startswith("click"):
            continue
        t0, seg = window(r, ms, i, key="pn")
        pre = [x for x in r if x["pn"] < t0][-1]
        seg = [pre] + seg
        m = [mid(x) for x in seg]
        mv = [k for k in range(1, len(m)) if abs(m[k] - m[k - 1]) > 0.01]
        res["clicks"].append({"mark": n, "moving_frames": len(mv), "first_move_ms": round(seg[mv[0]]["t"] - t0, 1) if mv else None,
                              "neck_frames": sum(1 for x in seg if float(x["nkOp"]) > 0 and x["nk"][2] > 0.5),
                              "stretch": sorted(set(x["str"] for x in seg)), "strip_sl": sorted(set(x["sl"] for x in seg)),
                              "cur": [pre["cur"], seg[-1]["cur"]]})
    tp = dict(ms)["pointerOut"]
    after = [x for x in r if x["t"] >= tp]
    res["after_pointer_out"] = {"ms": round(after[-1]["t"] - tp), "cur_changes": [round(after[k]["t"] - tp) for k in range(1, len(after)) if after[k]["cur"] != after[k - 1]["cur"]]}
    OUT[f"reduced-pager:{rt}"] = res


# ── 4 · breath at rest: pager subtree animations + demo ticks (visibility), and GAP's idle ──
d = L("amend2/data/gui/visibility-r1-1440.json.gz"); r, ms = d["rows"], marks(d)
vis = {"span_ms": round(r[-1]["t"] - r[0]["t"]), "pager_running_anims_any_frame": sorted(set(a for x in r for a in x.get("panims", []))), "windows": []}
for i, (n, _) in enumerate(ms):
    t0, seg = window(r, ms, i)
    vis["windows"].append({"mark": n, "ticks_ms": [round(seg[k]["t"] - t0) for k in range(1, len(seg)) if seg[k]["cur"] != seg[k - 1]["cur"]],
                           "car_top": [seg[0]["car"][1], seg[-1]["car"][1]]})
OUT["breath:visibility-r1"] = vis
for rt in ("r1", "r2"):
    d = L(f"gap/data/idle-{rt}-1440.json.gz"); r = d["rows"]
    keys = [k for k in ("sl", "bA", "bB", "nk", "str", "pip", "ring", "it") if k in r[0]]
    OUT[f"breath:idle-{rt}"] = {"span_ms": round(r[-1]["t"] - r[0]["t"], 1), "distinct": {k: len(set(json.dumps(x[k]) for x in r)) for k in keys},
                                "anims": sorted(set(x.get("anims") for x in r))}


# ── 5 · momentum: strip velocity across programmatic marks; CR-09 stale index ──
def vel(r, k):
    return (r[k]["sl"] - r[k - 1]["sl"]) / ((r[k]["t"] - r[k - 1]["t"]) / 1000)


for rt in ("r1", "r2"):
    d = L(f"amend2/data/gui/interrupt-{rt}-1440.json.gz"); r, ms = d["rows"], marks(d)
    res = {"load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]], "moves": []}
    for i, (n, _) in enumerate(ms):
        t0, seg = window(r, ms, i)
        k = next(j for j, x in enumerate(r) if x["pn"] >= t0)
        lastmove = max((j for j in range(1, len(seg)) if seg[j]["sl"] != seg[j - 1]["sl"]), default=0)
        t_rest = seg[lastmove]["t"]
        rest = seg[-1]["sl"]
        # member under the snap from the members' own lefts at the window end (no pitch fit): the member nearest the strip's left padding
        lefts = [it[4] for it in seg[-1]["it"]]
        under = min(range(len(lefts)), key=lambda j: abs(lefts[j] - r[0]["it"][0][4]))
        agree = next((x["t"] - t_rest for x in seg if x["t"] >= t_rest and x["cur"] == under), None)
        res["moves"].append({"mark": n, "v_before": [round(vel(r, j)) for j in range(k - 2, k)], "v_after": [round(vel(r, j)) for j in range(k, k + 4)],
                             "zero_v_frames_in_flight": sum(1 for j in range(1, lastmove + 1) if seg[j]["sl"] == seg[j - 1]["sl"]),
                             "rest_sl": rest, "member_under": under, "cur_end": seg[-1]["cur"], "rest_ms": round(t_rest - t0, 1),
                             "cur_agrees_ms_after_rest": None if agree is None else round(agree, 1),
                             "stale_for_ms": None if agree is not None else round(seg[-1]["t"] - t_rest, 1)})
    OUT[f"interrupt:{rt}"] = res


# ── 6 · M-07 press dragged off ──
for p in ("press-cancel-r1-1440", "press-cancel-r2-1440", "press-cancel-touch-r1-390"):
    d = L(f"amend2/data/gui/{p}.json.gz"); r = d["rows"]; ms = dict(marks(d))
    up = ms["up"]
    after = [x for x in r if x["t"] >= up]
    pressed = [x for x in r if x["press"] >= 0]
    OUT[f"press:{p}"] = {"press_set_ms_after_down": round(pressed[0]["t"] - ms["down"], 1) if pressed else None,
                         "press_cleared_ms_after_down": round(next((x["t"] for x in r if x["t"] > (pressed[0]["t"] if pressed else 0) and x["press"] < 0), float("nan")) - ms["down"], 1) if pressed else None,
                         "frames_after_up": len(after), "pressed_frames_after_up": sum(1 for x in after if x["press"] >= 0),
                         "pip2_scale_after_up": sorted(set(x["pip"][2][0] for x in after)),
                         "cur": [r[0]["cur"], r[-1]["cur"]]}


# ── 7 · M-06 keyboard ──
for rt in ("r1", "r2"):
    d = L(f"amend2/data/gui/keyboard-{rt}-1440.json.gz"); r, ms = d["rows"], marks(d)
    res = []
    for i, (n, _) in enumerate(ms):
        t0, seg = window(r, ms, i, key="pn")
        pre = [x for x in r if x["pn"] < t0][-1]
        m = [mid(pre)] + [mid(x) for x in seg]
        mv = next((k for k in range(1, len(m)) if abs(m[k] - m[k - 1]) > 0.01), None)
        res.append({"key": n, "cur": [pre["cur"], seg[-1]["cur"]], "foc": [pre["foc"], seg[-1]["foc"]],
                    "worm_first_ms": round(seg[mv - 1]["t"] - t0, 1) if mv else None, "sl_values": sorted(set(x["sl"] for x in seg))})
    OUT[f"keyboard:{rt}"] = res


# ── 8 · P-01 sticky law with GAP's constants (not refitted): Apple r2; glass-ui r2 + plants refitted per run ──
def law_err(pairs, H, c, dd, inset=32):
    errs, stuck, rel, clamp = [], 0, 0, 0
    for g, ct in pairs:
        gb = g[1] + g[3]; cb = ct[1] + ct[3]
        inner = min(H - inset, cb - c)
        law = max(ct[1] + dd, inner)
        errs.append(abs(gb - law))
        if ct[1] + dd > inner: clamp += 1
        elif cb - c > H - inset: stuck += 1
        else: rel += 1
    return {"max_err_px": round(max(errs), 2), "top_clamped": clamp, "stuck": stuck, "released": rel}


d = L("amend2/data/apple/sticky-r2-1440.json.gz")
pairs = [([x["aap"]["x"], x["aap"]["y"], x["aap"]["w"], x["aap"]["h"]], x["cont"]) for x in d["frames"]]
ap = law_err(pairs, d["meta"]["H"], 120, 436)
stuckY = [x["aap"]["y"] for x in d["frames"] if abs(d["meta"]["H"] - (x["aap"]["y"] + x["aap"]["h"]) - 32) <= 0.5]
ap["stuck_container_travel_px"] = None
st = [x["cont"][1] for x in d["frames"] if abs(d["meta"]["H"] - (x["aap"]["y"] + x["aap"]["h"]) - 32) <= 0.5]
ap["stuck_container_travel_px"] = round(st[0] - st[-1], 1) if st else 0
ap["frames"] = len(d["frames"]); ap["load"] = [d["meta"]["loadStart"], d["meta"]["loadEnd"]]
OUT["sticky:apple-r2"] = ap
for p in ("sticky-r2-1440", "sticky-r2-1440-plant-fixed", "sticky-r2-1440-plant-sticky"):
    d = L(f"amend2/data/gui/{p}.json.gz"); r = [x for x in d["rows"] if "ring" in x]; H = d["meta"]["H"]
    bottoms = [x["ring"][1] + x["ring"][3] for x in r]
    OUT[f"sticky:{p}"] = {"H": H, "frames": len(r), "frames_at_H_minus_32": sum(1 for b in bottoms if abs(b - (H - 32)) <= 0.5),
                          "ring_bottom_range": [round(min(bottoms), 1), round(max(bottoms), 1)],
                          "car_bottom_range": [round(min(x["car"][1] + x["car"][3] for x in r), 1), round(max(x["car"][1] + x["car"][3] for x in r), 1)],
                          "ring_minus_car_bottom_range": [round(min(b - (x["car"][1] + x["car"][3]) for b, x in zip(bottoms, r)), 1), round(max(b - (x["car"][1] + x["car"][3]) for b, x in zip(bottoms, r)), 1)]}


# ── 9 · CR-03 plants: what moves, for how long, how straight ──
for p in ("enter2-r2-1440-plant-fade", "enter2-jump2-1440-plant-fade", "enter2-r2-1440-plant-scale", "enter2-jump2-1440-plant-scale", "enter2-r2-1440", "enter2-jump2-1440"):
    d = L(f"amend2/data/gui/{p}.json.gz"); r = [x for x in d["rows"] if "ring" in x]
    op = [x["rop"] for x in r]
    ch = [k for k in range(1, len(r)) if (r[k]["rop"], r[k]["ring"][2], json.dumps(r[k]["rtf"])) != (r[k - 1]["rop"], r[k - 1]["ring"][2], json.dumps(r[k - 1]["rtf"]))]
    res = {"frames": len(r), "opacity_values": len(set(op)), "ring_w_values": len(set(x["ring"][2] for x in r)),
           "pip_values": len(set(json.dumps(x["pip"]) for x in r)), "material_values": len(set(json.dumps(x["mat"]) for x in r))}
    if ch:
        k0, k1 = ch[0] - 1, ch[-1]
        T0, T1 = r[k0]["t"], r[k1]["t"]
        res["move_ms"] = round(T1 - T0, 1)
        # opacity progress vs time line deviation
        a, b = op[k0], op[k1]
        if b != a:
            res["opacity_line_dev"] = round(max(abs((op[k] - a) / (b - a) - (r[k]["t"] - T0) / (T1 - T0)) for k in range(k0, k1 + 1)), 4)
        res["opacity_overshoot"] = round(max(op[k0:k1 + 1]) - b, 4)
    OUT[f"enter:{p}"] = res


# ── 10 · Apple: visibility pause/resume, intro clocks ──
d = L("amend2/data/apple/visibility-r1-1440.json.gz"); f = d["frames"]; ms = marks(d)
st = lambda x: "playing" if "playing" in x["galCls"] else "paused" if "paused" in x["galCls"] else "other"
flips = []
for k in range(1, len(f)):
    if st(f[k]) != st(f[k - 1]):
        pm = [m for m in ms if m[1] <= f[k]["t"]][-1]
        flips.append({"after": pm[0], "ms": round(f[k]["t"] - pm[1], 1), "to": st(f[k]), "fill_prev": f[k - 1]["aw"], "fill": f[k]["aw"], "cur": f[k]["cur"]})
rates = []
for fl in flips:
    if fl["to"] == "playing":
        t = [x for x in f if x["t"] >= next(m[1] for m in ms if m[0] == fl["after"]) + fl["ms"]][:40]
        rates.append(round((t[-1]["aw"] - t[0]["aw"]) / ((t[-1]["t"] - t[0]["t"]) / 1000), 3))
OUT["apple:visibility"] = {"flips": flips, "rate_after_resume_px_s": rates, "load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]]}


def ty(x):
    tf = x["aap"]["tf"]
    if tf.startswith("matrix("): return float(tf[7:-1].split(",")[5])
    if tf.startswith("matrix3d("): return float(tf[9:-1].split(",")[13])
    return 0.0


for p in ("intro-r1-1440", "intro-r1-1440-raf60", "intro-r1-1440-rafstall", "intro-r1-1440-webkit"):
    d = L(f"amend2/data/apple/{p}.json.gz"); f = d["frames"]
    ta = next(x["t"] for x in f if "activated" in x["cls"])
    seg = [x for x in f if x["t"] >= ta]
    ys = [ty(x) for x in seg]
    pk = min(ys)
    settle = next(k for k in range(len(ys)) if all(abs(v) <= 0.5 for v in ys[k:]))
    hide = next((x["t"] - ta for x in seg if x["intro"]["disp"] == "none" or x["intro"]["op"] == 0), None)
    OUT[f"apple:{p}"] = {"rise_peak": round(pk, 2), "peak_ms": round(seg[ys.index(pk)]["t"] - ta, 1), "settle_ms": round(seg[settle]["t"] - ta, 1),
                         "pill_peak": max(x["bgD"]["w"] for x in seg), "blob_hidden_ms": round(hide, 1) if hide else None,
                         "frameDt": d["meta"].get("frameDt"), "load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]]}


# ── 11 · CR-01 control: aria-current vs slide in wk-cells (chromium) ──
d = L("amend2/data/gui/wk-cells-r1-1440.json.gz"); r, ms = d["rows"], marks(d)
lefts0 = r[0]["it"][0][4]
def under(x):
    lf = [it[4] for it in x["it"]]
    return min(range(len(lf)), key=lambda j: abs(lf[j] - lefts0))
dis = []
cur = None
for x in r:
    bad = x["cur"] != under(x)
    if bad and cur is None: cur = x["t"]
    if not bad and cur is not None:
        dis.append([round(cur - r[0]["t"]), round(x["t"] - cur, 1)]); cur = None
if cur is not None: dis.append([round(cur - r[0]["t"]), round(r[-1]["t"] - cur, 1), "open"])
OUT["cr01:wk-cells-r1"] = {"marks": [(n, round(t - r[0]["t"])) for n, t in ms], "cur_vs_slide_disagreements_[start_ms,len_ms]": dis}


# ── 12 · deck reversal from GAP's raw deck runs ──
for rt in ("r1", "r2"):
    d = L(f"gap/data/deck-{rt}-1440.json.gz")
    OUT[f"deck:{rt}:keys"] = sorted(d["rows"][0].keys())

json.dump(OUT, open(os.path.join(ROOT, "critique2", "data", "rederive2.json"), "w"), indent=1, default=str)
print(json.dumps(OUT, indent=1, default=str)[:60000])


# ── 13 · M-08: time lag of the stall and 60 Hz runs against 120 Hz at matched progress (interpolated, so the
#         landing frame's quantisation under a 42-50 ms stall frame does not enter) ──
def traj(tag):
    d = L(f"amend2/data/gui/{tag}.json.gz"); r, ms = d["rows"], marks(d)
    out = []
    for i, (n, _) in enumerate(ms):
        t0, seg = window(r, ms, i, pre=25)
        m = [mid(x) for x in seg]; a, b = m[0], m[-1]
        out.append([(x["t"] - t0, (v - a) / (b - a)) for x, v in zip(seg, m)])
    return out


def t_at(tr, p):
    # first time the (monotone-after-launch) progress crosses p, linear interpolation between samples
    for (t1, p1), (t2, p2) in zip(tr, tr[1:]):
        if p1 < p <= p2:
            return t1 + (t2 - t1) * (p - p1) / (p2 - p1)
    return None


base = traj("fps-r1-1440")
for tag in ("fps-r1-1440-raf60", "fps-r1-1440-rafstall"):
    oth = traj(tag)
    OUT[f"m08-lag:{tag}"] = [{p: (None if t_at(b, p) is None or t_at(o, p) is None else round(t_at(o, p) - t_at(b, p), 1)) for p in (0.25, 0.5, 0.75, 0.9, 0.97, 0.99)} for b, o in zip(base, oth)]

json.dump(OUT, open(os.path.join(ROOT, "critique2", "data", "rederive2.json"), "w"), indent=1, default=str)
print(json.dumps({k: v for k, v in OUT.items() if k.startswith("m08")}, indent=1))


# ── 14 · M-03 contrast (stored ratios only), M-07 touch timing, M-02 release step ──
for p in ("apple/contrast-r1-1440", "apple/contrast-stuck-r1-1440", "gui/contrast-r1-1440"):
    d = L(f"amend2/data/{p}.json.gz"); sl = d.get("slides") or []
    keys = sorted({k for s in sl for k in s if k.startswith("c_")})
    OUT[f"contrast:{p}"] = {k: [min(s[k] for s in sl if k in s), max(s[k] for s in sl if k in s), sum(1 for s in sl if k in s and s[k] < 3)] for k in keys}
    OUT[f"contrast:{p}"]["n"] = len(sl)
d = L("amend2/data/gui/press-cancel-touch-r1-390.json.gz"); ms = dict(marks(d))
OUT["press:touch-marks"] = {k: round(v - ms["down"], 1) for k, v in ms.items()}
d = L("amend2/data/apple/sticky-r2-1440.json.gz"); f = d["frames"]; H = d["meta"]["H"]
v = []
for k in range(1, len(f)):
    dt = (f[k]["t"] - f[k - 1]["t"]) / 1000
    v.append((round(f[k]["t"] - f[0]["t"]), round((f[k]["aap"]["y"] - f[k - 1]["aap"]["y"]) / dt), round(-(f[k]["cont"][1] - f[k - 1]["cont"][1]) / dt), round(H - f[k]["aap"]["y"] - f[k]["aap"]["h"], 2)))
rel = next(k for k in range(1, len(v)) if v[k - 1][3] == 32 and v[k][3] != 32 and v[k][3] > 32)
OUT["sticky:apple-release"] = v[rel - 3: rel + 4]
json.dump(OUT, open(os.path.join(ROOT, "critique2", "data", "rederive2.json"), "w"), indent=1, default=str)
print(json.dumps({k: v for k, v in OUT.items() if k.startswith(("contrast", "press:touch", "sticky:apple-release"))}, indent=1))


# ── 15 · M-05 rewind and M-09 pause hand-off, from the study's committed CSVs ──
import csv
rows = list(csv.DictReader(open(os.path.join(ROOT, "samples", "timeline-ended.csv"))))
sl = [float(x["sl"]) for x in rows]; t = [float(x["ms"]) for x in rows]
k0 = next(k for k in range(1, len(sl)) if sl[k] < sl[k - 1]); k1 = next(k for k in range(k0, len(sl)) if sl[k] == 0)
big = max(sum(1 for i in range(7) if float(rows[k][f"w{i}"]) > 8.01) for k in range(k0, k1 + 1))
OUT["m05:rewind"] = {"from": sl[k0 - 1], "ms": round(t[k1] - t[k0 - 1], 1), "max_enlarged": big,
                     "peaks": [round(max(float(rows[k][f"w{i}"]) for k in range(k0, k1 + 1)), 2) for i in range(7)]}
rows = list(csv.DictReader(open(os.path.join(ROOT, "samples", "timeline-playpause.csv"))))
fl = [k for k in range(1, len(rows)) if rows[k]["gCls"] != rows[k - 1]["gCls"]]
def rate(a, b):
    s = [x for x in rows if a <= float(x["ms"]) <= b]
    return round((float(s[-1]["fill_w"]) - float(s[0]["fill_w"])) / ((float(s[-1]["ms"]) - float(s[0]["ms"])) / 1000), 3)
ta, tb = float(rows[fl[0]]["ms"]), float(rows[fl[1]]["ms"])
OUT["m09:playpause"] = {"flips_ms": [ta, tb], "fill_around_pause": [rows[fl[0] - 1]["fill_w"], rows[fl[0]]["fill_w"], rows[fl[0] + 1]["fill_w"]],
                        "fill_around_resume": [rows[fl[1] - 1]["fill_w"], rows[fl[1]]["fill_w"], rows[fl[1] + 1]["fill_w"]],
                        "rate_before": rate(ta - 600, ta - 10), "rate_after": rate(tb + 10, tb + 600)}
json.dump(OUT, open(os.path.join(ROOT, "critique2", "data", "rederive2.json"), "w"), indent=1, default=str)
print(json.dumps({k: v for k, v in OUT.items() if k.startswith(("m05", "m09"))}, indent=1))


# ── 16 · P-21 / P-23: the Next x3 chain (GAP's pager-next runs): velocity per frame from next3a ──
for rt in ("r1", "r2"):
    d = L(f"gap/data/pager-next-{rt}-1440.json.gz"); r = d["rows"]; ms = dict(d["marks"])
    t0 = ms["next3a"]
    tr = [(round(r[k]["t"] - t0), r[k]["sl"], round(vel(r, k))) for k in range(1, len(r)) if t0 - 10 <= r[k]["t"] <= t0 + 600]
    first = next(i for i, x in enumerate(tr) if x[1] != tr[0][1]); last = max(i for i, x in enumerate(tr) if x[1] != tr[-1][1])
    OUT[f"pager-next:{rt}"] = {"marks_ms": {k: round(v - t0) for k, v in ms.items() if k.startswith("next3")},
                               "zero_v_frames_between_first_and_last_move_ms": [x[0] for x in tr[first:last + 1] if x[2] == 0],
                               "peak_v_after_each_press": [max(x[2] for x in tr if a <= x[0] < b) for a, b in ((0, 125), (125, 250), (250, 600))],
                               "load": d["meta"].get("loadStart")}
json.dump(OUT, open(os.path.join(ROOT, "critique2", "data", "rederive2.json"), "w"), indent=1, default=str)
print(json.dumps({k: v for k, v in OUT.items() if k.startswith("pager-next")}, indent=1))
