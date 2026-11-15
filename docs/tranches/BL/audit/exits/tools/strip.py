# strip.py <out.png> <title> <frame.jpg>...: one row of frames, each labelled with the ms
# in its file name (f<k>_<ms>.jpg), scaled to 150 px wide. Run with python3 -I.
import sys, os
from PIL import Image, ImageDraw
out, title, files = sys.argv[1], sys.argv[2], sys.argv[3:]
ims = [Image.open(f).convert("RGB") for f in files]
W = 150
ims = [im.resize((W, int(im.height * W / im.width))) for im in ims]
H = max(im.height for im in ims)
strip = Image.new("RGB", (W * len(ims) + 4 * (len(ims) + 1), H + 40), "white")
d = ImageDraw.Draw(strip)
d.text((6, 4), title, fill="black")
for k, (im, f) in enumerate(zip(ims, files)):
    x = 4 + k * (W + 4)
    strip.paste(im, (x, 22))
    ms = os.path.basename(f).split("_")[1].split(".")[0]
    d.text((x + 2, H + 25), (f"+{ms} ms" if not ms.startswith("-") else f"{ms} ms (before)"), fill="black")
strip.save(out, optimize=True)
