# MS7-rulings.py · D3 pass 9, the minor split v7: R-21 (b)'s rulings, written from this seat's reading of every line
# prose-sweep.mjs prints over the minor v7 (MS7-records/sweep-minor7.log, each line read with its context and, where the
# claim names a mechanism, against the minor v7 tree's own source). Each ruled line gets `{ at, says, why }`; `says` is
# the line's text as printed, so prose-sweep.mjs --rulings FAILs the ruling as stale the moment the line moves or changes.
#
# Three kinds of reading (MINOR-SPLIT-v7.md §4):
#   true      the line is true of the minor v7 tree. The minor KEEPS the clamp, the observer, the luma term, the bucket
#             and the dark ink, and recuts the light veil to the `--card` pole at the solved bound, so a line is read
#             against that tree, not against the floor's.
#   REPORTED  the line is false on the minor v7 and was already false at HEAD; the minor's patch did not write it and
#             changes no mechanism it names. It is ruled "true as to the patch" (the floor seat's dock.css:15 reading,
#             FLOOR-V8.md §1.2) and reported for the landing docs pass. Each such `why` starts with "REPORTED".
#   FALSE     the line is false on the minor v7 because of the minor (its light law), or sits in a sentence the minor's
#             patch rewrote. It gets NO ruling here, so prose-sweep FAILs it as unread on the minor v7; the proposed
#             comment-only rewrite is MS7-r21b-proposed.diff, and --proposed rules the rewritten text.
#   python3 -I MS7-rulings.py <sweep.log> <out.json> [--proposed]
import json, re, sys

FILE = {
 "DESIGN.md": "the published design doc's rows and prose that the minor's patch neither wrote nor makes false: the type-scale clamp() table, the dock-button and hover-state rows, the motion driver/observer rule, the cartoon cast that re-tints through --shadow-color, the tier/status tint discipline, the section-tint index rule. Read for the minor's mechanisms only; the rows are not re-measured here",
 "demo/stories/dock/dock-search.vue": "the search field's earned ink keeps its text at or above 4.5:1 (dock/styles/search.css:3-13): 'adaptive tinting' names that ink",
 "demo/stories/substrates/glass-material.vue": "the live accent axis (--glass-accent tints the rim and glint), the live sampled-luminance observer this story wires on a glass card, the earned-ink clamp, the floating ancestor's bright bucket, and a measurement note true of any plate",
 "src/components/_shared/feedback/feedback-tone.css": "the live tone register: `.feedback-tone` mixes `--tone` over `--glass-veil` in oklab (:80-84), so the rung's earned-ink clamp, tier ink and level survive inside the mix; :63 is the live gate's name (H9-1's homonym site)",
 "src/components/_shared/field/control.css": "the type rung's fluid clamp() and the engine's radius clamp: live sizing, not the veil clamp",
 "src/components/_shared/menu/menu.css": "the menu row's live accent tint (:6-14); :11 'an ink fill darkens the cream row' is the reason the accent tint replaced it; :118 the hairline ink re-tints through --foreground",
 "src/components/button/styles.css": "Button's live tone tint (§5, 'it tints, it never replaces') and the engine's radius clamp on the stadium",
 "src/components/card/styles.css": "the title rung holding its interval at the type clamp's floor: live type sizing",
 "src/components/configurator/styles.css": "the live --configurator-section-tint step, the preset tile's clamp() sizing, and the selected rung (:528: light the one-ink --fill-selected, dark --glass-plate-quiet, as :529 declares)",
 "src/components/dialog/styles.css": "the dialog's inline gutter clamp and type clamp: live layout",
 "src/components/dock/styles/adaptive-legibility.css": "the dock's foreground self-engage, the live veil clamp in @utility glass-plate reading the luma the dock's observer writes, the absent dock bucket (:50-54), the frozen-backdrop static arm (:79, :89), and the owner's quoted G2 edict (:18, a citation)",
 "src/components/dock/styles/dock.css": "the L0 plate composed through @utility glass-plate at the element so the observer's luma reaches the live clamp (:101-116); 'NO SEPARATE TINT VEIL' states an absence; :107 quotes the owner's G2 edict",
 "src/components/dock/styles/index.css": "R-18's rewrite (:21-24, no clamp and no bucket in adaptive-legibility); :82 and :85 'the tint seam' are true in the minor, which keeps the clamp (Crit8 §5.2, kept)",
 "src/components/dock/styles/search.css": "R-18's rewrites and the live field plate: glass-plate's clamp reads the luma the dock's observer writes; calm resolves the tier's own ink; past the knee it earns up to two rungs",
 "src/components/dock/styles/shape.css": "the --dock-size-scale clamp floor: live geometry",
 "src/components/dock/styles/shell.css": "R-18's rewrites (:130-146): the L0 plate's clamp reads the luma the dock's own observer writes; --glass-backdrop: light is kept for the descendant bright bucket (ladder.css); :213 and :360 the width cap and block-size clamp",
 "src/components/sheet/styles.css": "the sheet's live backdrop sampler and its z-order; :328 is history in the past tense; :504 'a clamp is not a fit' is layout",
 "src/components/tabs/styles/segmented.css": "the segmented indicator's live clamp at the bar's edge, the engine's stadium clamp, and the indicator's glass tint forward of the track",
 "src/composables/glass/useGlassBackdropLuminance.ts": "the live observer the minor keeps: it samples the field under a surface, writes --glass-backdrop-luma and the light/dark bucket, shares one route readback, and refines the declarative bucket; the luma it writes is what the veil clamp reads",
 "src/styles/glass.css": "the live --glass-fill-tinted plate axis of the chip and atom composers (tokens/glass.css:212-216), and :47 the ink-veil register's earned-ink clamp",
 "src/styles/glass/control-bit.css": "the recess's DARK arm: in dark glass/veil.css darkens a plate toward --glass-veil-ink (oklch(0.17 0.03 70), dark-arm.css:275), and the recess darkens toward black. Scoped to `.dark` by the paragraph's own head (:167)",
 "src/styles/glass/control-surfaces.css": "the live destructive/success tints, the --surface-tint-15 lift, the coarse-pointer clamp, and the form family reading the --glass-* ladder that --glass-level and the bright bucket retune",
 "src/styles/glass/deep.css": ":18 is the fill-tint axis (tokens/glass.css:201-216; Crit8 §3's reading); :26-30 the floating band's bright bucket and earned ink (ladder.css:125); :73 is R-23's site entry (history) and :75 the same history paragraph",
 "src/styles/glass/grasp.css": "the held band against the CLAMPED rest ink (--glass-veil-rest, glass/veil.css:70-85) and the slider fill's tinted mix (liquid-fill.css declares --glass-veil-rest: 1)",
 "src/styles/glass/ladder-undershadow.css": "the earned-ink clamp rides the veil's alpha, and level 0 multiplies it out: true of glass/veil.css:87-92",
 "src/styles/glass/ladder.css": "the live bright-backdrop @container bucket and its ink lift (the minor keeps it: :163-302), 'THE TINT AXIS IS GONE' with the veil as one writer and the observer-driven clamp on its alpha, the contrast-color() refinement anchored on --card, and the on-glass muted lift for tone-tinted and chip plates",
 "src/styles/glass/liquid-fill.css": "the slider fill's live --liquid-fill-tint knob and its tinted mix; it paints a mix, not a veil",
 "src/styles/glass/overlay-plate.css": "the rung composes the backdrop bucket (.glass-floating), the hint's placement clamp, and 'no adaptive-tint layer' (an absence)",
 "src/styles/glass/rim.css": "the live accent axis on the rim, the in-srgb --surface-tint-* brand fence, and the bright bucket kept in ladder.css",
 "src/styles/glass/surface-axis.css": "R-18's rewrite (:79-81, no tint axis to zero) and the minor's register (:43, darker in dark, a thicker cream pole in light); :124 the well's oklab tone-step (tokens/glass.css:195)",
 "src/styles/glass/surfaces-pager.css": "R-18 (:29-33) and R-23 (:34-36) as rewritten: the clamp resolves the floating rung's own ink over a calm backdrop and earns up to two steps over a sampled bright one, translucent in both themes (base + 2(1 − base)/3 < 1 light, 0.30 dark); :37 the --surface-tint-* brand fence",
 "src/styles/glass/surfaces.css": "the earned ink (the veil clamp: darker in dark, a thicker cream pole in light) reaches the pill through the one recipe",
 "src/styles/glass/veil.css": "the minor's own veil: the clamp on the tier's α above the knee, darker in dark and a thicker --card pole in light, one chromatic writer, the observer-driven refinement, --glass-veil-rest and -rung",
 "src/styles/tokens/color-radius.css": "live token prose: --fill-selected's menu accent tint, the --surface-tint-* and muted-tinted rungs, the constellation accent and its no-slingshot clamp, the eyebrow rung, the cream family 'never a tinted cast'",
 "src/styles/tokens/dark-arm.css": ":47 'a 0.003-luma band' is the measured page/card gap, not the luma term; :212-213 clamp() in the shadow pin; :310 'the light arm's darkening' (Crit7 ruled true: the on-glass muted rung's light arm); :312 the bright bucket's full-ink lift; the --surface-tint-* dark arm",
 "src/styles/tokens/glass-deep.css": "history in the past tense ('painted 16px where the plain overlay painted 22'); R-23 rewrote the line above it to name the ladder by its tokens",
 "src/styles/tokens/glass-fx.css": "the live --glass-backdrop bucket and --glass-backdrop-luma the observer writes, the knee (:145), 'one chromatic writer, the veil', the tab-track recess ink, chart palette tinting, the scrim that must not re-tint",
 "src/styles/tokens/glass.css": "the minor's light law (:14, the plate never darkens toward a near-black ink over paper, O-62), the per-instance fill-tint axis, the srgb-plate / oklab-tint fence, the well's oklab tone-step, the border presence 'not tinted', @property's typed clamp, and 'a bucket for it could only ever re-assert' (an absence)",
 "src/styles/tokens/light-dark.css": "the control floor's max() clamp at 44px: live",
 "src/styles/tokens/on-glass-fg.css": "the @container bright bucket and overlay band lift the ink to full (glass/ladder.css): live in the minor",
 "src/styles/tokens/property-regs.css": "the live accent axis (:114-131; :115 is H9-1's homonym site; 'TINT (whole-plate legibility)' at :124 is the label Crit8 §5.2 kept), R-23's rewrite (:154-155), R-18's (:162-171: the one clamp in @utility glass-plate reads the observer's luma), @property's typed clamps, and --motion-weight's OBSERVER subtree",
 "src/styles/tokens/scale-paper.css": "live tint knobs and inks: --control-checked-bg, the grid ink that re-tints with --foreground, --invalid-ring-tint, the metal registers 'not a tinted cast'",
 "src/styles/tokens/shadow.css": "clamp() inside the in-gamut shadow ink, the blob's tinted contact shade and its contact-darkening: live shadow prose",
 "src/styles/tokens/sizing.css": "live dock sizing prose: control-floor and type clamps, the switcher's glass tint rungs, the hairline's --surface-tint-* rung, the press DARKEN (light: the one-ink selected rung over the control; dark: the plate stepped 7%)",
 "src/styles/utilities/base.css": "the consumer's own hover/active bg-tint under reduced motion: live",
 "tests/components/button/Button.test.ts": "R-23's rewrite (:146, the earned-ink clamp survives inside the mix) and Button §5's tone describe title",
 "tests/components/field/forms-seam.test.ts": "the type rung's bounded clamp: live",
 "tests/components/ui/surface/Surface.test.ts": "history: 'RED at the first cut's bytes' (:162, the rung reading's history; :164, R-23's site entry under --glass-blur-*-radius)",
 "tests/gates/feedback-tint-seam.test.ts": "the live gate G-FEEDBACK-TINT-SEAM: its name lines (H9-1 homonym sites :1, :121), its rule that the tone tints its own plate, and R-23's rewrite (:11, the earned-ink clamp)",
 "tests/styles/contrast-computed.test.ts": "premultiplied mix arithmetic, a register asserted deleted, 'measured, not sampled', and the tinted eyebrow",
 "tests/styles/glass-subtlety.test.ts": "the minor's light law (:191-194: light paints the --card pole and never darkens toward a near-black ink over paper; dark darkens), clamp() evaluated in JS, the scrim blur's sampled pixels, and the held band against the clamped rest rung",
 "tests/styles/proportion-register.test.ts": ":143 the fluid clamp; :287-288 history (W-FROST executed the --glass-ambient deletion) and the assertion of no ambient-observer residue",
}
LINE = {
 "DESIGN.md:521": "true of the minor: @utility glass-plate reads the tier, clamps it upward by the measured backdrop luminance into --glass-veil-rest and -rung, and writes background and isolation (glass/veil.css:69-94)",
 "src/components/dock/styles/adaptive-legibility.css:7": "true: the frozen-backdrop static arm is declared at :79 and :89",
 "src/components/dock/styles/adaptive-legibility.css:18": "the owner's quoted G2 edict, a citation (Crit7, kept)",
 "src/components/dock/styles/dock.css:107": "the owner's quoted G2 edict, a citation (Crit7, kept)",
 "src/components/_shared/feedback/feedback-tone.css:20": "REPORTED, HEAD-stale (true as to the patch): the tone wash is the rule's own oklab mix over --glass-veil (:80-84), but the sentence's 'the SAME seam the --glass-veil-* legibility lift and the --veil-bg plate already run' was false at HEAD too: the veil mixes in srgb at HEAD and in the minor (glass/veil.css:87-92), and --veil-bg is declared nowhere in src/ at HEAD or in the minor. The minor edits this header at :38 only. The floor rewrote its twin (FLOOR-V8.md §1.2 (v)); for the landing docs pass",
 "src/components/_shared/feedback/feedback-tone.css:21": "REPORTED, HEAD-stale: as :20",
 "src/components/dock/styles/dock.css:16": "true as to the patch: 'one chromatic writer, no second tint layer' states the minor's plate. REPORTED: the clause after it credits the adaptive-legibility partial with re-pointing --glass-veil-*, which neither HEAD's nor the minor's adaptive-legibility.css does; pre-existing at HEAD (the floor seat's dock.css:15 reading), for the landing docs pass",
 "src/components/dock/styles/shell.css:30": "REPORTED, HEAD-stale (true as to the patch): 'the UNIFIED PLATE TINT is the PRIMARY anti-gray' with :33-34's 'plate-tint self-engage (dock/adaptive-legibility.css)' credits the partial with a plate tint it does not carry; HEAD's adaptive-legibility.css:28 already 're-points no plate colour', and the plate's ink is glass-plate's clamp (dock/dock.css). The minor edits this file at :130-146 only; for the landing docs pass",
 "src/components/dock/styles/shell.css:33": "REPORTED, HEAD-stale: as :30",
 "demo/stories/substrates/glass-material.vue:5": "REPORTED, HEAD-stale (true as to the patch): of the 'three SOTA folds', the chromatic fringe is struck (the story's own blurb at :383, 'no painted fringe at the edge'); the minor edits this file at :31, :230, :237, :383 only; for the landing docs pass",
 "demo/stories/substrates/glass-material.vue:12": "REPORTED, HEAD-stale (true as to the patch): the story sets only --glass-veil-ink on its tint plate (:404-407), never --glass-veil-rung, and the plate mix it says 'bites' in oklab is glass-plate's srgb veil (HEAD and the minor alike); for the landing docs pass",
 "demo/stories/substrates/glass-material.vue:72": "REPORTED, HEAD-stale: as :12 (the sample strengths are never written to the plate)",
 "demo/stories/substrates/glass-material.vue:73": "REPORTED, HEAD-stale: as :12",
 "src/styles/tokens/glass-fx.css:2": "REPORTED, HEAD-stale (true as to the patch): 'the adaptive tint-source' names no token at HEAD or in the minor (the file's backdrop knobs are --glass-backdrop and --glass-backdrop-luma-knee, :139-145); 'backdrop-luma bucket' is true. The minor does not edit this line; the floor rewrote its own version (FLOOR-V8.md §1.2 (vii)); for the landing docs pass",
 "src/styles/glass/control-bit.css:175": "true in its scope: the paragraph is the recess's DARK arm (:167), and in dark glass/veil.css darkens a plate by compositing --glass-veil-ink (veil.css:42-43; dark-arm.css:275)",
}
# FALSE on the minor v7 (no ruling; MS7-r21b-proposed.diff rewrites them, and --proposed rules the rewritten text):
FALSE = {
 "DESIGN.md:34": "'the dark-mode tint is denser': in the minor the light rung is the --card pole at α ≥ the solved bound (tokens/glass.css:40, :51-57; the thinnest light α measured, 0.890, REGISTRY P8-3.1 G4) and the dark rungs are the ink at 0.10-0.26 (dark-arm.css:276-283). True at HEAD (light 0.14 ink); the minor's light law makes it false",
 "src/styles/glass/surface-axis.css:21": "'the tint axis zeroed' (:21-22): there is no tint axis (glass/ladder.css:165, and this file's own :79 as R-18 rewrote it). The minor's patch rewrote :22 of this sentence and kept the claim",
}
PROPOSED = {
 "DESIGN.md:34": "the proposed rewrite (MS7-r21b-proposed.diff): light paints the --card pole at or above the solved bound α, dark paints the warm near-black ink at its own rung α, as tokens/glass.css:40, :51-57 and dark-arm.css:275-283 declare",
 "src/styles/glass/surface-axis.css:21": "the proposed rewrite (MS7-r21b-proposed.diff): 'with no tint axis to zero', as :79 states",
}
proposed = "--proposed" in sys.argv
src = open(sys.argv[1], encoding="utf-8").read().split("\n")
out, at, unruled = [], None, []
for l in src:
    m = re.match(r"^· (\S+) \[", l)
    if m: at = m.group(1); continue
    m = re.match(r"^\s+>\s+(\d+) \| (.*)$", l)
    if m and at:
        assert at.endswith(":" + m.group(1)), (at, l)
        f = at.rsplit(":", 1)[0]
        if at in FALSE:
            if proposed and at in PROPOSED: out.append({"at": at, "says": m.group(2).strip(), "why": PROPOSED[at]})
            else: unruled.append(at)
        else:
            out.append({"at": at, "says": m.group(2).strip(), "why": LINE.get(at) or FILE[f]})
        at = None
json.dump(out, open(sys.argv[2], "w", encoding="utf-8"), indent=1, ensure_ascii=False)
rep = sum(1 for x in out if x["why"].startswith("REPORTED") or "REPORTED:" in x["why"])
print(f"rulings: {len(out)} lines in {len({x['at'].rsplit(':',1)[0] for x in out})} files · {rep} of them REPORTED · left unruled (FALSE): {', '.join(unruled) or 'none'}")
