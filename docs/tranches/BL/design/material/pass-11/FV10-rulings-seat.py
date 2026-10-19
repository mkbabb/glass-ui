# FV10-rulings-seat.py · D3 pass 11, the floor v10 seat's R-26 / R-30 reading, written as two rulings files built from
# FV10-rulings.json (the critic's proposed rulings carried forward byte for byte; floor v10's bytes are the critic's cut):
#   FV10-rulings-seat.json           floor v10 as built: the two lines the seat reads false are left UNRULED (no verdict
#                                    can be `true` and neither is `reported`: the patch wrote both), so the sweep prints
#                                    them unread. Every other entry is the carried one, unchanged.
#   FV10-rulings-seat-proposed.json  floor v10 + FV10-seat-proposed.diff: the two lines re-ruled `true` on their new words.
# Usage: python3 -I FV10-rulings-seat.py <FV10-rulings.json> <out-seat.json> <out-seat-proposed.json>
import json, sys
src, out_seat, out_prop = sys.argv[1:4]
rs = json.load(open(src))
PR = "src/styles/tokens/property-regs.css:151"
FT = "src/components/_shared/feedback/feedback-tone.css:38"
seat = [r for r in rs if r["at"] not in (PR, FT)]
json.dump(seat, open(out_seat, "w"), indent=1, ensure_ascii=False)
prop = list(seat)
prop.append({
    "at": PR,
    "says": "above the bound (`--glass-bound`), with nothing sampled. Level scales the rung's 1 − α",
    "verdict": "true",
    "why": "the sentence :150-153 under FV10-seat-proposed.diff: every rung's α is at or above `--glass-bound` (wash, floating, chassis, dock, crown = the bound; quiet, overlay, sheet = bound + 1 step; resting = bound + 2 steps; dialog = 1; tokens/glass.css:278-290, step = (1 − bound)/3 > 0); nothing is sampled (no luma term, glass/veil.css:36, :64-72); the plate's α = 1 − (1 − rung)·level (veil.css:64-72), so level scales the rung's 1 − α, and the blur is radius × level (tokens/glass.css); 'the two never collapse — the a11y escape is level alone' (level 0 under prefers-reduced-transparency, 0.3 under prefers-contrast: more, a11y-fallback.css)",
})
prop.append({
    "at": FT,
    "says": "surface that composes a rung therefore tints ITS OWN rung: the rung's alpha at or above the",
    "verdict": "true",
    "why": "the sentence :37-39 under FV10-seat-proposed.diff: `.feedback-tone` mixes over the rung's own `--glass-veil` (:80-84), so the composed rung's α (at or above the bound, tokens/glass.css:278-290; Toast, its one shipped consumer, composes `glass-floating`, at the bound) and `--glass-level` (inside `--glass-veil`, glass/veil.css:64-72) enter the mix as its base instead of being replaced by a second plate",
})
prop.sort(key=lambda r: (r["at"].rsplit(":", 1)[0], int(r["at"].rsplit(":", 1)[1])))
json.dump(prop, open(out_prop, "w"), indent=1, ensure_ascii=False)
for name, xs in (("seat", seat), ("seat-proposed", prop)):
    print(f"{name}: {len(xs)} rulings ({sum(r['verdict'] == 'true' for r in xs)} true, {sum(r['verdict'] == 'reported' for r in xs)} reported)")
