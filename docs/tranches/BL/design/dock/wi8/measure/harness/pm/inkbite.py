#!/usr/bin/env python3
"""inkbite.py: MEASURE-8 part M, G-15's two plants against the tip, seat by seat. s8/s4read.py reads the tip's ink8 run
(@pm, current 10 %, hover 8 %) and each plant's (@pm-g15-baked at 10/8, @pm-g15-onestep at 8/8), on the plant's seven pages
(nav, rail, figure-tools, dials, canvas-tools, action-row, loose); a failure under the plant whose seat and clause do not
fail on the tip is printed. Seats read as no fill painted (rail's Regions, canvas-tools's Grid and Draw) are marked, since
their reading turns on the engine's paint of contrast-color() (S4). Usage: inkbite.py > ../logs/pm-inkbite.txt"""
import ast, os, re, subprocess
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PAGES = ("nav", "rail", "figure-tools", "dials", "canvas-tools", "action-row", "loose")
NOFILL = ("rail/", "canvas-tools/")


def read(tag, c, h):
    out = subprocess.run(["python3", os.path.join(H, "s8", "s4read.py"), "@" + tag, str(c), str(h)], capture_output=True, text=True).stdout.split("\n")
    res, eng, scheme = {}, None, None
    for l in out:
        m = re.match(r"c[\d.]+ h[\d.]+ (\w+):", l)
        if m:
            eng = m.group(1); continue
        m = re.match(r"\s+(light|dark): current words fail \d+ (\[.*?\]); marks fail \d+ (\[.*\])$", l)
        if m:
            scheme = m.group(1)
            res[(eng, scheme, "words")] = ast.literal_eval(m.group(2)); res[(eng, scheme, "marks")] = ast.literal_eval(m.group(3)); continue
        m = re.match(r"\s+other fails \d+ (\[.*?\]); hover/ground fail \d+ (\[.*?\]);", l)
        if m:
            res[(eng, scheme, "other")] = ast.literal_eval(m.group(1)); res[(eng, scheme, "hover")] = ast.literal_eval(m.group(2))
    return res


def key(s):
    head = s.split(":")[0] if ":" in s else s.rsplit(" ", 1)[0]
    name = re.sub(r"\s[\d.]+(\s.*)?$", "", s.split(": ", 1)[1]) if ": " in s else ""
    return head + "|" + name


tip = read("pm", 10, 8)
for tag, c, h in [("pm-g15-baked", 10, 8), ("pm-g15-onestep", 8, 8)]:
    pl = read(tag, c, h)
    for eng in ("chromium", "webkit"):
        new = []
        for (e, sc, cl), v in sorted(pl.items()):
            if e != eng:
                continue
            tk = {key(s) for s in tip.get((e, sc, cl), []) if s.split("/")[0] in PAGES}
            for s in v:
                if key(s) not in tk:
                    new.append(f"{sc} {cl}: {s}" + (" (a no-fill seat)" if s.startswith(NOFILL) else ""))
        firm = [x for x in new if "(a no-fill seat)" not in x]
        print(f"{tag} {eng}: {'BITES' if firm else 'does not bite'}: {len(firm)} failures the tip lacks" + (f", {len(new) - len(firm)} more on no-fill seats" if len(new) > len(firm) else "") + (": " + "; ".join(new) if new else ""))
