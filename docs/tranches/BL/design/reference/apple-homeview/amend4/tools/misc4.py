"""AMEND-4: the remaining CRITIQUE-3 cells, from committed samples and the amend-4 runs.

M-05 sweep order (CRITIQUE-3 §2, M-05 amend): on a multi-dot move, each intermediate dot is first reached on a LATER
frame than the one before it, in the move's direction. Apple: a dot is reached when its width first exceeds 8.5 px
(samples/timeline-ended.csv, the 6 -> 0 rewind; samples/timeline-dotclick.csv, the 0 -> 3 click). glass-ui: a dot is
reached when the worm's painted span (bodies, plus the neck while its opacity > 0, clipped to the ring) first covers
its centre (amend2/data/gui/fps-r1-1440, the +3 and -4 hops on the 208 px worm carousel).
Length continuity on Apple (the reference for the worm-length clause): the largest one-frame change of any dot's
width, and of the enlarged dots' summed excess, during the same moves.
P-21a: amend4/data/gui/jump4-r*-1440, an unguarded strip.scrollTo({left: 4*pitch, smooth}) from rest at 0: where it
lands, aria-current at scrollend and one frame later, and the library's own scrollTo calls during the move.
usage: python3 -I -B amend4/tools/misc4.py  (from apple-homeview/) -> amend4/data/misc4.json
"""
import csv, gzip, json, os

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
OUT = {}


def apple_csv(name):
    rows = list(csv.DictReader(open(os.path.join(ROOT, "samples", name))))
    return [{"ms": float(r["ms"]), "sl": float(r["sl"]), "w": [float(r[f"w{i}"]) for i in range(7)]} for r in rows]


def apple_sweep(rows, a, b):
    # the move's frames: from the first frame the strip leaves a's offset until it rests at b's
    k0 = next(k for k in range(1, len(rows)) if rows[k]["sl"] != rows[k - 1]["sl"]) - 1
    k1 = next(k for k in range(len(rows) - 1, k0, -1) if rows[k]["sl"] != rows[k - 1]["sl"]) + 1
    step = -1 if b < a else 1
    inter = list(range(a + step, b, step))
    first = {}
    for i in inter:
        first[i] = next((rows[k]["ms"] for k in range(k0, k1 + 1) if rows[k]["w"][i] > 8.5), None)
    seq = [first[i] for i in inter]
    ordered = all(x is not None for x in seq) and all(seq[j] < seq[j + 1] for j in range(len(seq) - 1))
    dw = max(max(abs(rows[k]["w"][i] - rows[k - 1]["w"][i]) for i in range(7)) for k in range(k0 + 1, k1 + 1))
    ex = [sum(max(0, w - 8) for w in rows[k]["w"]) for k in range(k0, k1 + 1)]
    dex = max(abs(ex[j] - ex[j - 1]) for j in range(1, len(ex)))
    gaps = [rows[k]["ms"] - rows[k - 1]["ms"] for k in range(k0 + 1, k1 + 1)]
    return {"move_ms": [rows[k0]["ms"], rows[k1]["ms"]], "intermediate_dots": inter,
            "first_reached_ms": {str(i): first[i] for i in inter}, "strictly_ordered": ordered,
            "largest_one_frame_dot_width_change_px": round(dw, 3), "largest_one_frame_excess_sum_change_px": round(dex, 3),
            "median_frame_ms": sorted(gaps)[len(gaps) // 2]}


OUT["M-05:apple-rewind (timeline-ended.csv)"] = apple_sweep(apple_csv("timeline-ended.csv"), 6, 0)
dc = apple_csv("timeline-dotclick.csv")
try:
    OUT["M-05:apple-dotclick (timeline-dotclick.csv)"] = apple_sweep(dc, 0, 3)
except StopIteration:
    OUT["M-05:apple-dotclick (timeline-dotclick.csv)"] = "no move in file"

# glass-ui: the worm carousel's +3 and -4 hops
d = json.load(gzip.open(os.path.join(ROOT, "amend2/data/gui/fps-r1-1440.json.gz")))
r, marks = d["rows"], d["marks"]
rest = r[0]
pitch = 40.0
c0 = rest["bA"][0] + rest["bA"][2] / 2  # dot 0's centre at rest (cur 0)
centre = lambda i: c0 + pitch * i
gl = {"load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]], "dot0_centre_px": c0, "pitch_px": pitch}
for mi, (name, tm) in enumerate(marks):
    t1 = marks[mi + 1][1] if mi + 1 < len(marks) else r[-1]["t"] + 1
    rr = [x for x in r if tm <= x["t"] < t1]
    a = rr[0]["cur"] if rr[0]["cur"] >= 0 else None
    b = int(name.replace("click", ""))
    prev = [x for x in r if x["t"] < tm][-1]
    a = prev["cur"]
    if abs(b - a) < 2:
        continue
    ring = rr[0]["ring"]; rl, rh = ring[0], ring[0] + ring[2]
    step = -1 if b < a else 1
    inter = list(range(a + step, b, step))
    first = {}
    for i in inter:
        ci = centre(i)
        for x in rr:
            spans = [(x["bA"][0], x["bA"][0] + x["bA"][2]), (x["bB"][0], x["bB"][0] + x["bB"][2])]
            if float(x.get("nkOp") or 0) > 0 and x["nk"][2] > 0:
                spans.append((x["nk"][0], x["nk"][0] + x["nk"][2]))
            lo = max(rl, min(s[0] for s in spans)); hi = min(rh, max(s[1] for s in spans))
            if lo <= ci <= hi:
                first[i] = round(x["t"] - tm, 1); break
        else:
            first[i] = None
    seq = [first[i] for i in inter]
    gl[f"{name} ({a} -> {b})"] = {"intermediate_dots": inter, "first_covered_ms_after_click": {str(i): first[i] for i in inter},
                                  "strictly_ordered": all(x is not None for x in seq) and all(seq[j] < seq[j + 1] for j in range(len(seq) - 1))}
OUT["M-05:glass-ui fps-r1-1440"] = gl

# P-21a: the unguarded jump
for rt in ("r1", "r2"):
    f = os.path.join(ROOT, f"amend4/data/gui/jump4-{rt}-1440.json.gz")
    if not os.path.exists(f):
        continue
    d = json.load(gzip.open(f))
    r, marks, ev = d["rows"], d["marks"], d["events"]
    pitch_guess = None
    legs = []
    to4 = [m for m in marks if m[0] == "to4"]
    for li, (_, tm) in enumerate(to4):
        t1 = tm + 2400
        rr = [x for x in r if tm - 20 <= x["t"] < t1]
        e = [x for x in ev if tm - 1 <= x[0] < t1]
        probe = next(x for x in e if x[1] == "scrollTo" and x[2] == "probe")
        libs = [[round(x[0] - tm, 1), x[4], x[6]] for x in e if x[1] == "scrollTo" and x[2] == "lib"]
        se = next((x for x in e if x[1] == "scrollend"), None)
        kse = next((k for k, x in enumerate(rr) if se and x["t"] >= se[0]), None)
        legs.append({"start_sl": rr[0]["sl"], "target_px": probe[4], "end_sl": rr[-1]["sl"], "cur_end": rr[-1]["cur"],
                     "scrollend_ms": round(se[0] - tm, 1) if se else None, "scrollend_sl": se[3] if se else None,
                     "cur_at_scrollend_and_next_frame": [rr[kse]["cur"], rr[min(kse + 1, len(rr) - 1)]["cur"]] if kse is not None else None,
                     "library_scrollTo_calls_ms_target_sl": libs,
                     "snapchanges": [[round(x[0] - tm, 1), x[3], x[4]] for x in e if x[1] == "snapchange"],
                     "pass": abs(rr[-1]["sl"] - probe[4]) <= 1 and rr[-1]["cur"] == 4})
    OUT[f"P-21a:jump4-{rt}"] = {"load": [d["meta"]["loadStart"], d["meta"]["loadEnd"]], "frameDt": d["meta"].get("frameDt"), "legs": legs}

json.dump(OUT, open(os.path.join(ROOT, "amend4", "data", "misc4.json"), "w"), indent=1)
print(json.dumps(OUT, indent=1))
