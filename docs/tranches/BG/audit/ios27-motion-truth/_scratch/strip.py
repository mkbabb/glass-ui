#!/usr/bin/env python3
"""Build a cropped film-strip montage from a facility frame dir."""
import os, re, subprocess, sys, tempfile

def build(d, a, b, n, suf, crop=None):
    base = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BG/audit/ios27-motion-truth/live"
    dd = os.path.join(base, d)
    out_dir = os.path.join(base, "_strips"); os.makedirs(out_dir, exist_ok=True)
    fr = sorted(f for f in os.listdir(dd) if f.endswith(".jpg"))
    t = lambda f: int(re.search(r"t(\d+)ms", f).group(1))
    win = [f for f in fr if a <= t(f) <= b]
    if not win:
        print(f"no frames {d} {a}-{b}"); return
    idx = [round(i * (len(win) - 1) / (n - 1)) for i in range(min(n, len(win)))]
    sel = [win[i] for i in sorted(set(idx))]
    srcs = [os.path.join(dd, f) for f in sel]
    out = os.path.join(out_dir, f"{d}-{suf}.jpg")
    with tempfile.TemporaryDirectory() as tmp:
        tiles = []
        for f in srcs:
            o = os.path.join(tmp, os.path.basename(f))
            cmd = ["magick", f]
            if crop and crop.startswith("resize:"):
                cmd += ["-resize", crop.split(":", 1)[1] + "x"]
            elif crop:
                cmd += ["-crop", crop, "+repage"]
            ts = re.search(r"t(\d+)ms", f).group(1)
            cmd += ["-font", "/System/Library/Fonts/Monaco.ttf", "-fill", "yellow", "-undercolor", "black", "-pointsize", "22",
                    "-gravity", "northwest", "-annotate", "+4+4", f"t{ts}ms", o]
            subprocess.run(cmd, check=True)
            tiles.append(o)
        subprocess.run(["montage", "-font", "/System/Library/Fonts/Monaco.ttf", *tiles, "-tile", "4x",
                        "-geometry", "+2+2", "-background", "black", out], check=True)
    r = subprocess.run(["magick", "identify", "-format", "%f %wx%h", out], capture_output=True, text=True)
    print(r.stdout)

if __name__ == "__main__":
    d, a, b, n, suf = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), int(sys.argv[4]), sys.argv[5]
    crop = sys.argv[6] if len(sys.argv) > 6 else None
    build(d, a, b, n, suf, crop)
