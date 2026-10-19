# crit-rulings.py · D3 pass 11, the critic's re-ruling of the seats' rulings (R-21 (b) as O-103 rules it; R-26, R-30).
# Writes, from the seats' files (each read whole, each entry kept unless named here):
#   crit-fv10-rulings.json  = FV10-rulings-seat-proposed.json re-ruled, for floor v11 = floor v10 + FV10-seat-proposed.diff
#                             + crit-floor-proposed.diff (the build rows 20 and FL-12 close on, §5 of the critique)
#   crit-fv10s-reading.json = the same with grasp.css:131 dropped: the critic's reading of floor v10 + the seat delta
#                             alone (grasp.css:131's sentence false, so unread: the instrument's plant)
#   crit-ms9-rulings.json   = MS9-rulings-seat.json re-ruled, for the minor v9 + MS9-seat-proposed.diff +
#                             crit-minor-proposed.diff
#   crit-ms9s-reading.json  = the same with grasp.css:135 dropped (the plant on the minor v9 + the seat delta)
# Refuses to run if any named entry is missing. Usage: python3 -I crit-rulings.py (from pass-11/)
import json, sys
def load(f): return json.load(open(f, encoding="utf-8"))
def find(rs, at):
    m = [r for r in rs if r["at"] == at]
    if len(m) != 1: sys.exit(f"{at}: {len(m)} entries")
    return m[0]
def dump(rs, f):
    json.dump(rs, open(f, "w", encoding="utf-8"), ensure_ascii=False, indent=1); open(f, "a").write("\n")
    t = sum(r["verdict"] == "true" for r in rs); p = sum(r["verdict"] == "reported" for r in rs)
    print(f"{f}: {len(rs)} entries, {t} true, {p} reported")

IB = "src/components/dock/styles/controls/icon-button.css"
fv = load("FV10-rulings-seat-proposed.json")
# (1) the stale clauses in two carried `why` texts (FV10 §4.4): they describe lines R-28 rewrote off the list.
OLD_IB = ":95, :104 the hover fill is a translucent card-tinted fill (`--dock-icon-hover-bg`), not a second catch-light"
NEW_IB = ":95, :104 (off the list since R-28) read 'one-ink'"
OLD_SZ = ":256-257 the press darken `--dock-control-press-bg` is the one-ink selected rung"
NEW_SZ = ":256-257 (off the list since R-28) read 'The press FILL', `--dock-control-press-bg` the one-ink selected rung"
n_ib = n_sz = 0
for r in fv:
    if OLD_IB in r["why"]: r["why"] = r["why"].replace(OLD_IB, NEW_IB); n_ib += 1
    if OLD_SZ in r["why"]: r["why"] = r["why"].replace(OLD_SZ, NEW_SZ); n_sz += 1
if not n_ib or not n_sz: sys.exit(f"stale why clauses not found ({n_ib}, {n_sz})")
print(f"stale why clauses rewritten: icon-button {n_ib}, sizing {n_sz}")
# (2) icon-button.css:5, 'the iOS press DARKEN-plus-shrink' (HEAD text, byte-identical): the press's net paint is the
# one-ink selected fill plus a 0.96 brightness at full press; in dark the cream fill at 0.12 lifts the dark plate
# (Crit A-2, crit-press-dark.py), so the dark half is false, as it was at HEAD (HEAD's press stepped 7 % toward the
# cream ink). And the section it indexes is now titled FILL-plus-shrink (:118, R-28 (iii)). Reported, not the patch's.
r = find(fv, f"{IB}:5"); r["verdict"] = "reported"
r["why"] = ("'the iOS press DARKEN-plus-shrink': the header indexes the :active section, which R-28 (iii) retitled "
            "'FILL-plus-shrink' (:118); the press paints the one-ink selected fill (sizing.css:259) with a sub-perceptual "
            "brightness(1 − t·0.04) deepen (:92), and in dark the cream fill at 0.12 lifts the dark plate (Crit A-2), so "
            "'DARKEN' is false in dark. Byte-identical at HEAD, where HEAD's press (resting plate + 7 % cream) also lifted "
            "in dark: not the patch's. Landing words: 'the iOS press FILL-plus-shrink'")
# (3) shadow.css:127, :143 (HEAD text): the blob's contact band and hover grounding ride `--blob-shadow-color`, a mix
# toward `--shadow-color` = `--foreground` (shadow.css:111-112, color-radius.css:176), cream in dark, so the 'DARKER'
# contact band and the 'grounding-darken' lighten a dark ground. The patch neither wrote nor re-valued them.
for n in (127, 143):
    r = find(fv, f"src/styles/tokens/shadow.css:{n}"); r["verdict"] = "reported"
    r["why"] = (f":{n} the blob contact/grounding band rides `--blob-shadow-color` = color-mix(blob 22 %, `--shadow-color`) "
                "(:111-112), `--shadow-color: var(--foreground)` (color-radius.css:176): near-black in light (true), cream in "
                "dark, where the 'darker' band lightens the ground. Byte-identical at HEAD; the patch did not write or re-value "
                "it (the patch moved only the modal and dock casts to `--overlay-scrim-ink`). Landing docs pass")
# (4) grasp.css:131 (word 'tint'), re-ruled on its whole sentence :128-133 AS crit-floor-proposed.diff rewrites :132-133.
r = find(fv, "src/styles/glass/grasp.css:131")
r["why"] = ("the sentence :128-133 under crit-floor-proposed.diff: `@utility glass-plate` composes rest and rung as the veil's "
            "alpha (glass/veil.css:64-72); liquid-fill.css declares `--glass-veil-rest: 1` (:59) and scales "
            "`--liquid-fill-strength` by the rung (:69-71), so rung ÷ rest runs 1 → 0.6 there under the held rule (:135) and the "
            "fill sheds 40 % of its strength; the dock's tiers are both `--glass-veil-dock` = the bound (shell.css:96-98, "
            "tokens/glass.css:287), so its held rung is max(0.6·bound, bound) = bound: it keeps its α")
dump(fv, "crit-fv10-rulings.json")
dump([x for x in fv if x["at"] != "src/styles/glass/grasp.css:131"], "crit-fv10s-reading.json")

ms = load("MS9-rulings-seat.json")
r = find(ms, "src/styles/glass/grasp.css:135")
r["why"] = ("the sentence :132-137 under crit-minor-proposed.diff: glass-plate composes both names as the veil's α "
            "(veil.css:70-92); liquid-fill.css declares --glass-veil-rest: 1 (:59) and scales its mix % by the rung (:73), so "
            "the ratio runs 1 → 0.6 there; the dock's tiers are `--glass-veil-wash` collapsed and `--glass-veil-dock` expanded "
            "(shell.css:147-149), both `--glass-veil-base` = the bound in light (tokens/glass.css:51, :54, :143) and at or below "
            "0.18 in dark (dark-arm.css:276-286); the floor is the bound in light (:154) and 0 in dark (dark-arm.css:294): held, "
            "the dock keeps the bound in light and sheds 40 % in dark (rung = 0.6 × rest)")
dump(ms, "crit-ms9-rulings.json")
dump([x for x in ms if x["at"] != "src/styles/glass/grasp.css:135"], "crit-ms9s-reading.json")
