# fadelen.py <rows-dir>... (ENGINE=chromium or webkit): every face/seat fade in the chosen scenarios, as judge7 reads it (last sample within 0.02 of
# one end to the first within 0.02 of the other) and interpolated between samples (0.98 to 0.02), to tell a change in the
# fade from the phase of the samples.
import gzip, json, sys, glob, os, re
SC = ["p3-fold-two-fine", "p3-fold-wide-fine", "p3-fold-wide-dark", "p3-fold-ctl6-c360", "p3-fold-rim-coarse",
      "p3-fold-ctl-te-parent-coarse", "p3-swap-xf-coarse", "p3-swap-xf-fine"]
def cross(v, lvl, rising):
    for a, b in zip(v, v[1:]):
        if (a[1] < lvl <= b[1]) if rising else (a[1] > lvl >= b[1]):
            return a[0] + (lvl - a[1]) / (b[1] - a[1]) * (b[0] - a[0])
for rd in sys.argv[1:]:
    for s in SC:
        for f in sorted(glob.glob(f"{rd}/{s}.wi8.{os.environ.get("ENGINE", "chromium")}.*.rows.json.gz")):
            d = json.load(gzip.open(f)); out = []
            for k in ("full", "summary", "face#0", "face#1"):
                v = [(r["t"], 0.0 if (r["el"].get(k) or {}).get("vis") == 0 else float((r["el"].get(k) or {}).get("eop", "nan"))) for r in d["rows"] if r["el"].get(k)]
                v = [x for x in v if x[1] == x[1]]
                i = 0
                while i < len(v) - 1:
                    # a run from one end (>= 0.98 or <= 0.02) to the other
                    if v[i][1] >= 0.98 or v[i][1] <= 0.02:
                        hi = v[i][1] >= 0.98
                        j = i + 1
                        while j < len(v) and (0.02 < v[j][1] < 0.98 or (v[j][1] >= 0.98) == hi and not (v[j][1] <= 0.02)):
                            if (v[j][1] >= 0.98) == hi and (v[j][1] >= 0.98 or v[j][1] <= 0.02): i = j
                            j += 1
                        if j < len(v) and ((v[j][1] <= 0.02) if hi else (v[j][1] >= 0.98)):
                            seg = v[i:j + 1]
                            a = cross(seg, 0.98, not hi) if hi else cross(seg, 0.02, True)
                            b = cross(seg, 0.02, False) if hi else cross(seg, 0.98, True)
                            out.append(f"{k} {'out' if hi else 'in'} @{v[i][0]:.0f}: sampled {v[j][0]-v[i][0]:.1f} interp {((b or 0)-(a or 0)):.1f}")
                        i = j
                    else:
                        i += 1
            print(os.path.basename(rd), s, d["meta"]["cell"]["tag"], "|", "; ".join(out))
