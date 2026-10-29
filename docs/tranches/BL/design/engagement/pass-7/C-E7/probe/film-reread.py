#!/usr/bin/env python3
"""C-E7 film re-read (no browser): the clip film's videos decoded again with a reference that is not the first frame.
WebKit's recorded video opens on blank frames (a dark canvas before the page paints), so ce7-probe's first-frame reference
read every later frame as 9600 px² changed in both modes. Here: frames whose mean luma is page-like (> 150) only; the
reference is the per-pixel MEDIAN of those frames' strip (a transient overpaint of a few frames cannot move a median);
per frame, px² of the 24 px strip above the box (x 48..448, y 145..169: the box's painted top border is at y 171 in both
engines, read off a decoded frame) differing ≥ 40 levels from it.
  python3 -I film-reread.py <log of the probe run> <video dir>   (the log maps each video to its mode)"""
import re, subprocess, sys, os
import numpy as np
log, vdir = sys.argv[1], sys.argv[2]
X, Y, W, H = 48, 145, 400, 24
modes = re.findall(r"clip film · scroll under a keyboard engagement · (engaged|released) · \d+ decoded frames \((page@[0-9a-f]+\.webm)\)", open(log).read())
for mode, name in modes:
    p = os.path.join(vdir, name)
    if not os.path.exists(p): print(f"{mode} {name}: video absent"); continue
    full = subprocess.run(["ffmpeg", "-v", "error", "-i", p, "-pix_fmt", "gray", "-f", "rawvideo", "-"], capture_output=True).stdout
    vw, vh = 700, 500
    n = len(full) // (vw * vh); fr = np.frombuffer(full[: n * vw * vh], np.uint8).reshape(n, vh, vw)
    keep = [k for k in range(n) if fr[k].mean() > 150]
    S = fr[keep][:, Y:Y + H, X:X + W].astype(np.int16)
    ref = np.median(S, axis=0)
    area = [int((np.abs(s - ref) >= 40).sum()) for s in S]
    big = [f"{keep[i]}:{a}" for i, a in enumerate(area) if a > 100]
    print(f"{mode} {name}: {n} frames, {len(keep)} page frames · largest {max(area)} px² at frame {keep[int(np.argmax(area))]} · frames over 100 px²: {' '.join(big) or 'none'}")
