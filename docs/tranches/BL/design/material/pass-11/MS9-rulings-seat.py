"""MS9-rulings-seat.py · the minor v9 seat's own R-26 / R-30 reading, written as rulings files from the carried
MS9-rulings.json (= pass-10/MS8-rulings-proposed.json). It changes four entries and nothing else
(MINOR-SPLIT-v9.md §4.3, §4.4):
  - tests/styles/glass-subtlety.test.ts:193 — FALSE and the patch's (the sentence 'Dark: the sign law holds, the rung
    darkens what is behind it' is a `+` line of minor-split-v9.patch; the dark rung, oklch(0.17 0.03 70) at its rung α,
    lifts the dark page --neutral-0, L 0.1459 -> 0.1499 at the resting rung, MS9-hover-dark.py). Dropped: it reads unread.
  - tests/styles/glass-subtlety.test.ts:192 — true, on its own clause (the light sentence); its carried why also asserted
    the dark clause, so it takes its own why.
  - DESIGN.md:1045, :1046, :1047 — reported, not true: 'Bg darken' holds in light (the patch's foreground ink at 0.05
    over the cream plate) and not in dark over the dock's own plate on the dark page (the resting plate lifts it,
    L 0.1490 -> 0.1526, MS9-hover-dark.py); the dark hover value is HEAD's (sizing.css:206 at HEAD is
    var(--glass-plate-resting) in both themes) and the table rows are HEAD text, so the false clause is not the patch's.
The same file rules the minor v9 + MS9-seat-proposed.diff tree: there :193 and :194 carry no frozen word and leave the
list, so no entry changes (one file, P-3).
Usage: python3 -I MS9-rulings-seat.py <MS9-rulings.json> <out.json>"""
import json, sys
src, out = sys.argv[1], sys.argv[2]
rul = json.load(open(src))
DES = ("'Bg darken' (hover) holds in light and not in dark on the dark page. LIGHT: --dock-control-hover-bg is foreground "
       "ink at --fill-hover 0.05 (sizing.css:206), which darkens the cream dock plate; the patch wrote that value. DARK: the "
       "arm is --glass-plate-resting, the near-black veil ink oklch(0.17 0.03 70) at alpha 0.18 (dark-arm.css:275-281), and "
       "the dark page --neutral-0 (L 0.1459) is darker than that ink, so over the dock's own plate the hover LIFTS it, "
       "L 0.1490 -> 0.1526 (MS9-hover-dark.py; it darkens only grounds lighter than the ink, e.g. --card 0.2949 -> 0.2735). "
       "HEAD's dark hover is the same plate (HEAD sizing.css:206 var(--glass-plate-resting)) and the rows are HEAD text, so the "
       "false dark clause is not the patch's; for the landing docs pass. The carried why's 'both legs darken the dock's own "
       "plate' was the arithmetic error (R-26)")
L192 = ("the light sentence: light --glass-veil-ink is var(--card) (asserted at :195), the theme's own ground at alpha, so the "
        "plate never mixes toward a near-black ink over paper (O-62); the line's own clause is true. The dark clause that "
        "follows on :193 is read there")
outl = []; seen = set()
for r in rul:
    at = r["at"]
    if at in ("DESIGN.md:1045", "DESIGN.md:1046", "DESIGN.md:1047"):
        r = dict(r, verdict="reported", why=DES); seen.add(at)
    elif at == "tests/styles/glass-subtlety.test.ts:192":
        r = dict(r, why=L192); seen.add(at)
    elif at == "tests/styles/glass-subtlety.test.ts:193":
        seen.add(at); continue
    outl.append(r)
assert seen == {"DESIGN.md:1045", "DESIGN.md:1046", "DESIGN.md:1047", "tests/styles/glass-subtlety.test.ts:192",
                "tests/styles/glass-subtlety.test.ts:193"}, seen
json.dump(outl, open(out, "w"), indent=2, ensure_ascii=False); open(out, "a").write("\n")
print(f"{out}: {len(outl)} rulings ({sum(r['verdict']=='true' for r in outl)} true, {sum(r['verdict']=='reported' for r in outl)} reported); "
      "the minor v9 and the minor v9 + MS9-seat-proposed.diff")
