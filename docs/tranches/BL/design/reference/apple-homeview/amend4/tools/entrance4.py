"""AMEND-4: CR-03's entrance witness, fourth statement, computed in full by one tool on Apple and on glass-ui.

CRITIQUE-3 refuted the A3 statement (a CSS linear() easing sampled from the row passes E0-E4 by shape) and found
three parts no tool computed: E0 (wheel and jump agree), the no-replay clause, and the channels P-12 (capsule),
P-13 (glyph), P-14 (material) with R-04's per-channel rows. This tool computes every part from raw runs:

  E0  one wall-clocked timeline: the wheel run's and the jump run's rise and width curves, aligned at the rise
      onset, agree over 2 s: every sample of one is within 0.5 px of the other shifted by <= 25 ms (one 60 Hz page
      frame plus one 120 Hz sample; Apple schedules each channel on its 60 Hz clock, so equal-time curves differ)
  NR  never replays: on an out-and-back run, after the first entrance settles, no entrance channel moves > 0.5 px
      (or its value changes) while the group leaves and re-enters, twice.
  E1-E4  amend 3's witness() (amend3/tools/entrance3.py, loaded by executing the part above its `OUT = {` line).
  T   the timing source of the geometric channels (rise, group width), read from the Animations on the element:
      either no Animation moves the channel (it is written per frame by script; the source clause carries that
      branch), or every Animation that moves it runs on a DocumentTimeline with an easing equal, stop for stop
      (|dy| <= 1e-4, |dx| <= 1e-3), to a `--spring-<row>` token's linear() AND a duration equal to that row's
      `--spring-<row>-duration`. A pasted linear() (sampled from any row, or from a row not in the table) fails;
      so does a view()/scroll timeline.
  C   the channels (R-04, P-08, P-11, P-12, P-13, P-14): the group width (P-08), the dots (P-11), the active
      indicator's opening (P-12), the play/pause glyph (P-13) and the material (P-14) each move, in the reference
      order (rise < width onset; dots <= capsule onset; capsule < glyph; material last), and each spring channel
      matches a damped oscillator at nRMS <= 1 % (Apple: its blind row; glass-ui: the row Q-CR-1 names for it).

usage: python3 -I -B amend4/tools/entrance4.py  (from apple-homeview/) -> amend4/data/entrance4.json
"""
import gzip, json, math, os, re
import numpy as np

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
p3 = os.path.join(ROOT, "amend3/tools/entrance3.py")
ns = {"__file__": p3, "__name__": "entrance3_head"}
exec(compile(open(p3).read().split("\nOUT = {")[0], "entrance3.py(head)", "exec"), ns)
witness, fit_free, fit_row, spring_progress, ROWS, boxes_intersect = (ns[k] for k in ("witness", "fit_free", "fit_row", "spring_progress", "ROWS", "boxes_intersect"))
APPLE_ROW = ROWS["apple-rise (0.606, 0.414)"]


def load(p):
    return json.load(gzip.open(os.path.join(ROOT, p)))


def parse_linear(s):
    """CSS linear(): returns [(x, y)] with missing x filled by the spec's rules (first 0, last 1, gaps even)."""
    m = re.match(r"\s*linear\((.*)\)\s*$", s or "")
    if not m:
        return None
    pts = []
    for part in m.group(1).split(","):
        toks = part.split()
        y = float(toks[0]); xs = [float(t.rstrip("%")) / 100 for t in toks[1:]]
        if not xs:
            pts.append([y, None])
        for x in xs:
            pts.append([y, x])
    if pts[0][1] is None:
        pts[0][1] = 0.0
    if pts[-1][1] is None:
        pts[-1][1] = 1.0
    for i in range(1, len(pts)):
        if pts[i][1] is not None:
            pts[i][1] = max(pts[i][1], max(p[1] for p in pts[:i] if p[1] is not None))
    i = 0
    while i < len(pts):
        if pts[i][1] is None:
            j = i
            while pts[j][1] is None:
                j += 1
            a, b = pts[i - 1][1], pts[j][1]
            for k in range(i, j):
                pts[k][1] = a + (b - a) * (k - i + 1) / (j - i + 1)
            i = j
        i += 1
    return [(x, y) for y, x in pts]


def same_linear(a, b):
    pa, pb = parse_linear(a), parse_linear(b)
    if not pa or not pb or len(pa) != len(pb):
        return False
    return all(abs(x1 - x2) <= 1e-3 and abs(y1 - y2) <= 1e-4 for (x1, y1), (x2, y2) in zip(pa, pb))


def dur_ms(s):
    s = (s or "").strip()
    return float(s[:-2]) if s.endswith("ms") else float(s[:-1]) * 1000 if s.endswith("s") else None


def interp(ts, vs, t):
    return float(np.interp(t, ts, vs))


def onset(ts, vs, eps):
    v0 = vs[0]
    return next((ts[k] for k in range(len(vs)) if abs(vs[k] - v0) > eps), None)


# ── Apple ──
def ty(tf):
    return float(tf[7:-1].split(",")[5]) if tf.startswith("matrix(") else 0.0


def sx(tf):
    return float(tf[7:-1].split(",")[0]) if tf.startswith("matrix(") else 1.0


def tx(tf):
    return float(tf[7:-1].split(",")[4]) if tf.startswith("matrix(") else 0.0


def blur(bf):
    m = re.search(r"blur\(([\d.]+)px\)", bf or "")
    return float(m.group(1)) if m else 0.0


def apple_channels(d, t_from=None, t_to=None):
    fr = d["frames"]
    ta = next(x["t"] for x in fr if "activated" in x["cls"] and (t_from is None or x["t"] >= t_from))
    rows = [x for x in fr if x["t"] >= ta - 1 and (t_to is None or x["t"] <= t_to)]
    ts = np.array([x["t"] - ta for x in rows])
    ch = {
        "rise (P-05)": [ty(x["aap"]["tf"]) for x in rows],
        "width (P-08)": [x["bgD"]["w"] for x in rows],
        "dots x (P-11)": [tx(x["li"][0][1]) for x in rows],
        "capsule --progress-intro (P-12)": [float(x["pi"] or 0) for x in rows],
        "glyph opacity (P-13)": [x["btn"]["op"] for x in rows],
        "glyph scale (P-13)": [sx(x["btn"]["tf"]) for x in rows],
        "material blur (P-14)": [blur(x["bgD"]["bf"]) for x in rows],
        "material --alpha (P-14)": [float(x["bgD"]["alpha"] or 0) for x in rows],
    }
    return ts, ch, rows, ta


def timing_source_apple(d, rows):
    """which Animations ran on the AAP subtree during the entrance, and on which targets"""
    table = {a["id"]: a for a in d["anims"]}
    seen = sorted({i for x in rows for i in x["anims"]})
    return [{k: table[i][k] for k in ("type", "name", "easing", "duration", "delay", "target", "pseudo")} for i in seen]


def channel_clause(ts, ch, spring_keys, order):
    out, ons = {}, {}
    for k, v in ch.items():
        v = np.array(v, float)
        trav = float(np.max(np.abs(v - v[0])))
        o = onset(ts, v, max(1e-3, 0.002 * trav)) if trav > 1e-6 else None
        ons[k] = o
        row = {"travel": round(trav, 4), "onset_ms": None if o is None else round(float(o), 1)}
        if k in spring_keys and trav > 1e-6:
            # a channel that first moves one way and then springs (the pill's box shrinks with --scale 1.3 -> 1
            # before its width spring starts) is fitted from its turning point: the spring's own segment
            k0 = 0
            if k.startswith("width"):
                k0 = int(np.argmin(v)) if v[-1] > v[0] else int(np.argmax(v))
                row["spring_segment_from_ms"] = round(float(ts[k0]), 1)
                o2 = onset(ts[k0:], v[k0:], max(1e-3, 0.002 * trav))
                row["spring_onset_ms"] = None if o2 is None else round(float(o2), 1)
            seg_t, seg_v = ts[k0:], v[k0:]
            prog = (seg_v - seg_v[0]) / (seg_v[-1] - seg_v[0]) if abs(seg_v[-1] - seg_v[0]) > 1e-9 else None
            if prog is not None:
                ff = fit_free(seg_t, prog)
                row["free_fit"] = ff
        out[k] = row
    moved = all(out[k]["travel"] > 1e-3 for k in ch)
    fits_ok = all(out[k].get("free_fit") and out[k]["free_fit"]["nrms"] <= 0.01 for k in spring_keys)
    order_ok = True
    order_detail = []
    for a, b, strict in order:
        oa, ob = ons.get(a), ons.get(b)
        ok = oa is not None and ob is not None and (oa < ob if strict else oa <= ob + 20)
        order_detail.append([a, "<" if strict else "<=", b, ok])
        order_ok &= ok
    return {"channels": out, "all_moved": moved, "spring_fits_le_1pct": fits_ok, "order": order_detail,
            "pass": moved and fits_ok and order_ok}


SPRINGS = ["rise (P-05)", "width (P-08)", "dots x (P-11)", "capsule --progress-intro (P-12)", "material blur (P-14)"]
ORDER = [("rise (P-05)", "width (P-08)", True), ("dots x (P-11)", "capsule --progress-intro (P-12)", False),
         ("capsule --progress-intro (P-12)", "glyph opacity (P-13)", True), ("glyph opacity (P-13)", "material blur (P-14)", True),
         ("width (P-08)", "material blur (P-14)", True)]


def e0(curves_a, curves_b, span=2000.0, px=0.5, max_shift=40.0):
    """curves: {name: (ts_from_onset, values)}. For every sample of a in [0, span]: the smallest time shift
    |s| <= max_shift (0.25 ms grid) at which b(t + s) is within `px` of a(t). Reports the largest such shift over the
    run (ms; None when some sample has no shift within max_shift) and the plain max |a - b| at equal times."""
    res = {}
    for k in curves_a:
        ta, va = curves_a[k]; tb, vb = curves_b[k]
        m = [(t, v) for t, v in zip(ta, va) if 0 <= t <= span and t <= tb[-1] - max_shift]
        if not m:
            res[k] = None; continue
        shifts = np.arange(-max_shift, max_shift + 0.25, 0.25)
        worst = 0.0
        for t, v in m:
            d = np.abs(np.interp(t + shifts, tb, vb) - v)
            ok = shifts[d <= px]
            if len(ok) == 0:
                worst = None; break
            worst = max(worst, float(np.min(np.abs(ok))))
        res[k] = {"max_abs_diff_equal_time_px": round(max(abs(v - interp(tb, vb, t)) for t, v in m), 3),
                  "max_time_shift_to_0p5px_ms": None if worst is None else round(worst, 2)}
    return res


def e0_pass(r, frame_ms=25.0):
    # one 60 Hz page frame (16.7 ms: Apple schedules each channel on its page clock) plus one 120 Hz sample (8.3 ms)
    return all(v is not None and v["max_time_shift_to_0p5px_ms"] is not None and v["max_time_shift_to_0p5px_ms"] <= frame_ms for v in r.values())


OUT = {"tolerances": {"E0_px": 0.5, "NR_px": 0.5, "E1_nrms": 0.01, "C_nrms": 0.01, "linear_equal": "|dy| <= 1e-4, |dx| <= 1e-3"}}

apple = {}
for tag in ("intro-jump-r1", "intro-jump-r2", "intro-wheel-r1", "intro-wheel-r2", "intro-outback-r1"):
    d = load(f"amend4/data/apple/{tag}-1440.json.gz")
    ts, ch, rows, ta = apple_channels(d, t_to=None)
    rows3 = [x for x in rows if x["t"] - ta <= 3000]
    ts3 = ts[: len(rows3)]
    ch3 = {k: v[: len(rows3)] for k, v in ch.items()}
    # E1-E4 via amend 3's adapter, on this file
    fr = d["frames"]
    Fw = []
    for x in rows3:
        blob = x["intro"]
        b0 = [blob["x"], blob["y"], blob["w"], blob["h"]] if blob["disp"] != "none" and blob["op"] > 0 and blob["w"] > 0 else None
        p = x["bgD"]; b1 = [p["x"], p["y"], p["w"], p["h"]] if p["op"] > 0 and p["w"] > 0 else None
        bb = x["bgB"]
        Fw.append({"t": x["t"], "rise": ty(x["aap"]["tf"]), "width": p["w"], "shapes": [b0, b1],
                   "button": [bb["x"], bb["y"], bb["w"], bb["h"]], "pips": [tuple(map(str, li)) for li in x["li"]], "op": None})
    w = witness(Fw, APPLE_ROW)
    apple[tag] = {"load": [d["meta"]["loadStart"], d["meta"].get("loadEnd")], "frameDt": d["meta"].get("frameDt"),
                  "E1_E4": {"parts": w["parts"], "E1_rise_nrms": w["E1_fits"]["rise"]["row_fit"]["nrms"], "E2": w["E2_max_line_deviation"],
                            "E3_onsets": w["E3_pip_onsets_ms_per_component"], "E4": w["E4"]},
                  "T_animations_on_aap_subtree": timing_source_apple(d, rows3),
                  "C": channel_clause(ts3, ch3, SPRINGS, ORDER),
                  "_curves": {"rise": (list(ts3 - ts3[0] - w["E1_fits"]["rise"]["row_fit"]["onset_ms"]), ch3["rise (P-05)"]),
                              "width": (list(ts3 - ts3[0] - w["E1_fits"]["rise"]["row_fit"]["onset_ms"]), ch3["width (P-08)"])}}
    # T for the geometric channels: any Animation targeting the AAP itself or the backgrounds?
    geo = [a for a in apple[tag]["T_animations_on_aap_subtree"] if "all-access-pass__background" in a["target"] or a["target"].startswith("all-access-pass ")]
    apple[tag]["T_geometric"] = {"animations_moving_rise_or_width": geo, "branch": "script-driven (no Animation)" if not geo else "animation", "pass": not geo}
    if tag == "intro-outback-r1":
        ms = dict(d["marks"])
        settle = [x for x in fr if ms["outAbove"] - 200 <= x["t"] <= ms["outAbove"]][-1]
        ref = {"rise": ty(settle["aap"]["tf"]), "width": settle["bgD"]["w"], "pi": float(settle["pi"]), "blur": blur(settle["bgD"]["bf"]),
               "blob_display": settle["intro"]["disp"], "cls_activated": "activated" in settle["cls"]}
        after = [x for x in fr if x["t"] >= ms["outAbove"]]
        dev = {"rise": max(abs(ty(x["aap"]["tf"]) - ref["rise"]) for x in after),
               "width": max(abs(x["bgD"]["w"] - ref["width"]) for x in after),
               "pi": max(abs(float(x["pi"]) - ref["pi"]) for x in after),
               "blur": max(abs(blur(x["bgD"]["bf"]) - ref["blur"]) for x in after)}
        apple[tag]["NR"] = {"settled_at_out_mark": ref, "max_dev_after_out_px": {k: round(v, 4) for k, v in dev.items()},
                            "blob_ever_shown_again": any(x["intro"]["disp"] != "none" for x in after),
                            "class_ever_left_activated": any("activated" not in x["cls"] for x in after),
                            "frames": len(after), "marks_ms": {k: round(v - ms["jump"], 1) for k, v in ms.items()},
                            "pass": max(dev.values()) <= 0.5 and not any(x["intro"]["disp"] != "none" for x in after)}
for r in ("r1", "r2"):
    a, b = apple[f"intro-wheel-{r}"]["_curves"], apple[f"intro-jump-{r}"]["_curves"]
    r0 = e0(a, b)
    apple[f"E0-{r}"] = {"wheel vs jump, aligned at each run's fitted rise onset, 0-2 s": r0, "pass (shift <= 25 ms: one 60 Hz page frame + one 120 Hz sample)": e0_pass(r0)}
for v in apple.values():
    v.pop("_curves", None)
OUT["apple"] = apple


# ── glass-ui ──
def gui_load(tag):
    p = os.path.join(ROOT, f"amend4/data/gui/{tag}.json.gz")
    return json.load(gzip.open(p)) if os.path.exists(p) else None


def gui_frames(d):
    r = d["rows"]
    ms = dict((m[0], m[1]) for m in d["marks"])
    t0 = ms.get("wheel", ms.get("jump", r[0]["t"]))
    F = []
    for x in r:
        if x["t"] < t0:
            continue
        rise = x["ring"][1] - x["car"][1]
        blob = x.get("blob")
        blob = blob if blob and blob[2] >= 0.5 and blob[3] >= 0.5 else None
        shapes = [blob, x["ring"]] if d["meta"]["PLANT"] and d["meta"]["PLANT"] != "cascade" else [x["ring"]]
        F.append({"t": x["t"], "rise": rise, "width": x["ring"][2], "shapes": shapes, "button": None,
                  "pips": [tuple(p) for p in x["pip"]], "op": x["rop"], "_x": x})
    return F, ms


def gui_T(d, F):
    table = {a["id"]: a for a in d["anims"]}
    seen = sorted({i[0] for f in F for i in f["_x"]["ranims"]})
    geo = [table[i] for i in seen if set(table[i]["props"]) & {"translate", "transform", "scale", "width"}]
    tokens = d["tokens"]
    verdicts = []
    for a in geo:
        # a CSS animation's timing function sits on its keyframes; the effect's own easing is then "linear"
        kfe = [e for e in a.get("kfEasing", []) if e and e != "linear"]
        a["easing"] = kfe[0] if (a["easing"] in (None, "linear") and kfe) else a["easing"]
        match = [n for n, tk in tokens.items() if same_linear(a["easing"], tk["easing"]) and isinstance(a["duration"], (int, float)) and abs((dur_ms(tk["duration"]) or -1) - a["duration"]) <= 0.5]
        verdicts.append({"type": a["type"], "name": a["name"], "props": a["props"], "timeline": a["timeline"],
                         "duration_ms": a["duration"], "easing_head": (a["easing"] or "")[:60],
                         "equals_token_row": match, "ok": bool(match) and a["timeline"] == "DocumentTimeline"})
    return {"animations_moving_geometry": verdicts, "branch": "script-driven (no Animation)" if not geo else "animation",
            "pass": all(v["ok"] for v in verdicts)}


def gui_channels(F):
    ts = np.array([f["t"] for f in F]); ts = ts - ts[0]
    span = lambda x: (max(x["bA"][0] + x["bA"][2], x["bB"][0] + x["bB"][2]) - min(x["bA"][0], x["bB"][0])) if x.get("bA") else 0.0
    ch = {"rise (P-05)": [f["rise"] for f in F], "width (P-08)": [f["width"] for f in F],
          "dots x (P-11)": [float((f["_x"]["pip"][0][0] or "0").split()[-1].rstrip("px") or 0) if f["_x"]["pip"][0][0] not in ("none", "") else 0.0 for f in F],
          "capsule --progress-intro (P-12)": [span(f["_x"]) for f in F],
          "glyph opacity (P-13)": [0.0 for f in F], "glyph scale (P-13)": [0.0 for f in F],
          "material blur (P-14)": [blur(f["_x"]["mat"][0]) for f in F], "material --alpha (P-14)": [0.0 for f in F]}
    return ts, ch


gui = {}
# 1440 x 500 (pass 3): at 1440 x 900 the demo's <main> scrolls only 324 px, so the hero never left the viewport and
# the earlier enter3 runs (and amend 2's enter2 runs) did not exercise an entry; they are not read here
TAGS = ["enter3-wheel-1440-h500", "enter3-jump-1440-h500", "enter3-outback-1440-h500"]
for plant in ("linear", "token", "rafspring", "replay"):
    TAGS += [f"enter3-wheel-1440-h500-plant-{plant}", f"enter3-jump-1440-h500-plant-{plant}", f"enter3-outback-1440-h500-plant-{plant}"]
for plant in ("cascade", "linear"):
    TAGS += [f"enter3-below-wheel-1440-h500-k2-plant-{plant}", f"enter3-below-jump-1440-h500-k2-plant-{plant}"]
curves = {}
for tag in TAGS:
    d = gui_load(tag)
    if d is None:
        continue
    F, ms = gui_frames(d)
    end = ms.get("out", F[-1]["t"] + 1)
    Fe = [f for f in F if f["t"] < end]
    plant = d["meta"]["PLANT"]
    rowname = "panel (0.4, 0.71)" if plant == "token" else "apple-rise (0.606, 0.414)"
    w = witness(Fe, ROWS[rowname])
    ts, ch = gui_channels(Fe)
    res = {"load": [d["meta"]["loadStart"], d["meta"].get("loadEnd")], "frameDt": d["meta"].get("frameDt"), "plantArmed": d.get("plantArmed"),
           "out_state": d.get("outState"), "out_state_2": d.get("outState2"),
           "scored_against_row": rowname,
           "E1_E4": {"parts": w["parts"], "E1_fits": {c: f["row_fit"] for c, f in w["E1_fits"].items()}, "E2": w["E2_max_line_deviation"], "E4": w["E4"]},
           "T": gui_T(d, Fe), "C": channel_clause(ts, ch, SPRINGS, ORDER), "errors": d.get("errors")}
    # onset of the rise for E0 alignment: the first frame the ring's rise departs from its first value
    rv = np.array([f["rise"] for f in Fe]); tv = np.array([f["t"] for f in Fe])
    o = onset(tv, rv, 0.05)
    curves[tag] = {"rise": (list(tv - (o if o is not None else tv[0])), list(rv - rv[-1])),
                   "width": (list(tv - (o if o is not None else tv[0])), [f["width"] for f in Fe])}
    if "outback" in tag:
        after = [f for f in F if f["t"] >= ms["out"]]
        settled = [f for f in F if f["t"] < ms["out"]][-1]
        dev = max(abs(f["rise"] - settled["rise"]) for f in after)
        devw = max(abs(f["width"] - settled["width"]) for f in after)
        res["NR"] = {"max_rise_dev_after_out_px": round(dev, 2), "max_width_dev_after_out_px": round(devw, 2), "pass": dev <= 0.5 and devw <= 0.5}
    gui[tag] = res
for base in ["enter3-%s-1440-h500"] + [f"enter3-%s-1440-h500-plant-{p}" for p in ("linear", "token")] + [f"enter3-below-%s-1440-h500-k2-plant-{p}" for p in ("cascade", "linear")]:
    a, b = curves.get(base % "wheel"), curves.get(base % "jump")
    if a and b:
        r = e0(a, b)
        gui["E0 " + base % "*"] = {"wheel vs jump, aligned at each run's rise onset, 0-2 s": r, "pass (shift <= 25 ms: one 60 Hz page frame + one 120 Hz sample)": e0_pass(r)}
OUT["gui"] = gui

os.makedirs(os.path.join(ROOT, "amend4", "data"), exist_ok=True)
json.dump(OUT, open(os.path.join(ROOT, "amend4", "data", "entrance4.json"), "w"), indent=1, default=str)
print(json.dumps(OUT, indent=1, default=str)[:20000])
