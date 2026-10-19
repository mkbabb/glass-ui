# crit-fv10-rulings.py · D3 pass-10 critic: the rulings for floor v9 + crit-fv10-proposed.diff (PROPOSED, for the
# agglomeration). Built from the seat's FV9-rulings.json: the 7 lines the delta takes off the list are dropped
# (icon-button.css:95, :104, :118-120; sizing.css:256-257), dark-arm.css:216 is re-ruled `reported` (R-26: it is the
# second line of :215's sentence, whose false clause the patch did not write), overlay-plate.css:271 is re-ruled on its
# whole sentence (:270-274). Every other entry is the seat's, unchanged.
import json, sys
src, out = sys.argv[1], sys.argv[2]
rs = json.load(open(src))
DROP = {f"src/components/dock/styles/controls/icon-button.css:{n}" for n in (95, 104, 118, 119, 120)} | {f"src/styles/tokens/sizing.css:{n}" for n in (256, 257)}
keep = []
for r in rs:
    if r["at"] in DROP: continue
    if r["at"] == "src/styles/tokens/dark-arm.css:216":
        r = {**r, "verdict": "reported", "why": "R-26, the sentence of :214-217: its clause 'clamps L UP to its 0.34 ceiling' (:215) is false (dark `--foreground` hsl(30 14% 90%), :86, so `clamp(0.28, l, 0.34)` brings a high L DOWN); this line's own clause (the maroon re-paste is retired) is history and holds. Byte-identical at HEAD; the patch did not write it"}
    if r["at"] == "src/styles/glass/overlay-plate.css:271":
        r = {**r, "why": "the sentence :270-274 under crit-fv10-proposed.diff: the listbox plate is two flat layers, the overlay veil (`--glass-veil-tier: var(--glass-veil-overlay)`, :278) and the capsule warm floor (:290-296), both read the one recipe; no second tint layer and no solidity knob is declared; the overlay rung is `--glass-bound` + 1 step (tokens/glass.css:284), a step above the bound; a second layer pushing the same plate is the double-writer the law forbids"}
    keep.append(r)
json.dump(keep, open(out, "w"), indent=1, ensure_ascii=False)
print(f"{len(keep)} rulings ({sum(r['verdict']=='true' for r in keep)} true, {sum(r['verdict']=='reported' for r in keep)} reported) from {len(rs)}")
