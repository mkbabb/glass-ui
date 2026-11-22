# pixdiff9.py <crops-m9 dir> <tagA> <tagB> <stem> [--keep 0,8,16] [--prune]: MEASURE-9 part H. Compares m9/frames9.mjs's
# crops of one travel on two trees frame by frame (<stem> = <cell>.<scheme>.<engine>): per frame the pixels whose largest
# channel difference is over 2 and over 8 levels (of 255), and the largest; a frame with any pixel over 8 is a painted
# difference. Writes <dir>/<tagB>/<stem>.vs-<tagA>.json and prints a line. --prune deletes both trees' frames not named
# by --keep (the disk rule: only frames a strip uses are saved). Run with a Python that has Pillow (python3.11).
import json, os, sys, glob
from PIL import Image, ImageChops
d, A, B, stem = sys.argv[1:5]
keep = set()
if "--keep" in sys.argv: keep = {int(x) for x in sys.argv[sys.argv.index("--keep") + 1].split(",")}
res = []
for fa in sorted(glob.glob(os.path.join(d, A, f"{stem}.f*.png"))):
    name = os.path.basename(fa); fb = os.path.join(d, B, name)
    if not os.path.exists(fb): continue
    ia, ib = Image.open(fa).convert("RGB"), Image.open(fb).convert("RGB")
    if ia.size != ib.size: res.append({"frame": name, "size": [ia.size, ib.size]}); continue
    diff = ImageChops.difference(ia, ib)
    px = list(diff.getdata())
    m = [max(p) for p in px]
    bbox = diff.point(lambda v: 255 if v > 8 else 0).getbbox()
    res.append({"frame": int(name.split(".f")[-1][:-4]), "over2": sum(v > 2 for v in m), "over8": sum(v > 8 for v in m), "max": max(m) if m else 0, "bbox8": bbox})
shown = [r for r in res if r.get("over8")]
json.dump({"a": A, "b": B, "stem": stem, "frames": res}, open(os.path.join(d, B, f"{stem}.vs-{A}.json"), "w"), indent=1)
print(f"{stem}: {B} vs {A}: {len(res)} frames compared; frames with a pixel over 8 levels: {len(shown)}" + (f" (largest {max(r['max'] for r in shown)}, most pixels {max(r['over8'] for r in shown)} in frame {max(shown, key=lambda r: r['over8'])['frame']})" if shown else ""))
if "--prune" in sys.argv:
    for t in (A, B):
        for f in glob.glob(os.path.join(d, t, f"{stem}.f*.png")):
            if int(f.split(".f")[-1][:-4]) not in keep: os.remove(f)
