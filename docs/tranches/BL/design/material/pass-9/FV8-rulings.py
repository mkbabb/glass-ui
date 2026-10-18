# FV8-rulings.py · D3 pass 9, floor v8: R-21 (b)'s rulings file, written from this seat's reading of every line
# prose-sweep.mjs prints over floor v8 (FV8-records/sweep-fv8.log, read line by line with its context). Each printed
# line gets one ruling `{ at, says, why }`, where `says` is the line's own text as printed, so prose-sweep.mjs --rulings
# FAILs a ruling as stale the moment its line moves or changes. Only TRUE lines are ruled here; the three lines read
# false were rewritten in floor v8 (FV8-r20-edits.py, R-21 (b) (v)-(vii)) and print below in their rewritten form.
#   python3 -I FV8-rulings.py <sweep-fv8.log> <out.json>
import json, re, sys

# The reading, per file: every printed line of the file falls under the file's reading unless a line override names it.
FILE = {
 "demo/stories/compositions/auth-shell.vue": "the story's own muted ink, darkened from the light-mode 38% lightness over the aurora: a live demo token, not the veil",
 "demo/stories/dock/_frame/DockStage.vue": "the aurora backing store's viewport clamp and its DPR clamp: live layout and raster sizing, not the deleted veil clamp",
 "demo/stories/feedback/progress.vue": "the tinted eyebrow, a live typography register",
 "demo/stories/substrates/glass-material.vue": "the live per-instance accent axis (`--glass-accent` tints the rim and glint), declared at property-regs.css:131",
 "src/components/_shared/feedback/feedback-tone.css": "the live tone register: `.feedback-tone` mixes `--tone` over `--glass-veil` in oklab (:80-84), one tone per surface",
 "src/components/_shared/field/control.css": "the type rung's fluid clamp() and the engine's radius clamp: live sizing, not the veil clamp",
 "src/components/_shared/menu/menu.css": "the menu row's live accent tint (menu.css:6-11) and the hairline ink that re-tints through --foreground",
 "src/components/button/styles.css": "Button's live tone tint (§5, 'it tints, it never replaces') and the engine's radius clamp on the stadium",
 "src/components/card/styles.css": "the title rung holding its interval at the type clamp's floor: live type sizing",
 "src/components/configurator/styles.css": "the live `--configurator-section-tint` step and the preset tile's clamp() sizing",
 "src/components/dialog/styles.css": "the dialog's inline gutter clamp and type clamp: live layout",
 "src/components/dock/GlassDock.vue": "history: the overflow ResizeObserver that `overflow: auto` replaced, named as deleted ('three moving parts'), not the luminance observer",
 "src/components/dock/styles/controls/icon-button.css": "the live press DARKEN leg (`filter: brightness()` on --dock-press-t, :92; --dock-control-press-bg) and the card-tinted hover fill (:113)",
 "src/components/dock/styles/controls/touch-floor.css": "the 44px touch-floor max() clamp and the vertical dock's accent glyph tint: live",
 "src/components/dock/styles/dock.css": "states an absence: one chromatic writer, no second tint layer, no separate tint veil",
 "src/components/dock/styles/layer-group.css": "the switcher's live glass tints (--dock-layer-switcher-{hover,active}) and glyph tint; :160 states the --surface-tint-8 plate is gone",
 "src/components/dock/styles/shape.css": "the --dock-size-scale clamp floor: live geometry",
 "src/components/dock/styles/shell.css": "the dock's width cap and block-size clamp: live layout",
 "src/components/music-staff/styles.css": "the folio biases the veil's one pole `--card` (one plate-tint writer, floor v8's plate); :372 is the strike keyframes sampled from the press register",
 "src/components/sheet/styles.css": "the sheet's live backdrop sampler and its z-order; :320 is history in the past tense ('landed NOTHING and what painted was'); :496 'a clamp is not a fit' is layout",
 "src/components/tabs/styles/segmented.css": "the segmented indicator's live clamp at the bar's edge, the engine's stadium clamp, and the indicator's glass tint forward of the track",
 "src/styles/glass.css": "the live `--glass-fill-tinted` plate axis of the chip and atom composers (tokens/glass.css:174-186)",
 "src/styles/glass/a11y-fallback.css": "rewritten by this seat (R-21 (b) (vi)): the plate is `--card` at α; 'the separate tint-darken this bracket used to add' is history in the past tense",
 "src/styles/glass/control-bit.css": "the live recess darkening toward the black pole `oklch(0 0 0)`",
 "src/styles/glass/control-surfaces.css": "the live destructive/success tints, the `--surface-tint-15` lift and the coarse-pointer clamp",
 "src/styles/glass/deep.css": "deep.css:18 is the live fill-tint axis (tokens/glass.css:164; Crit8 §3); :69 and :71 are history (the predecessor LERPed), H8's upheld site entry and the rung reading's history",
 "src/styles/glass/grasp.css": "the slider fill's live tinted MIX (liquid-fill.css), which declares --glass-veil-rest: 1",
 "src/styles/glass/ladder.css": "the live on-glass muted lift for tone-tinted and chip plates (--on-glass-muted-strong)",
 "src/styles/glass/liquid-fill.css": "the slider fill's live `--liquid-fill-tint` knob and its tinted mix",
 "src/styles/glass/material.css": "plus-lighter's HDR clamp, and the rim's accent tint by re-pointing its ink: live",
 "src/styles/glass/overlay-plate.css": "the hint's placement clamp (live) and 'no second tint layer' (states an absence)",
 "src/styles/glass/rim.css": "the live accent axis on the rim, and the in-srgb `--surface-tint-*` brand fence",
 "src/styles/glass/surface-axis.css": "the well's live oklab tone-step (tokens/glass.css:161, `--glass-well-pole`)",
 "src/styles/glass/surfaces-pager.css": "rewritten by R-20 (i): 'no ink, clamp or oklab mix' states the absence on floor v8; :36 is the `--surface-tint-*` brand fence",
 "src/styles/glass/veil.css": "veil.css:36 states the absence ('No luma term and no clamp'); :40 names the tone-tinted feedback panel, a live consumer of `--glass-veil`",
 "src/styles/tokens/color-radius.css": "live token names and their prose: --fill-selected's menu accent tint, the --surface-tint-* and muted-tinted rungs, the constellation accent and its no-slingshot clamp, the eyebrow rung, the cream family 'never a tinted cast'",
 "src/styles/tokens/dark-arm.css": ":47 'a 0.003-luma band' is the measured page/card luminance gap, not the luma term; :215-216 are clamp() in the shadow pin; :304 the on-glass muted rung's live dark arm; :82 and :328-348 the live --surface-tint-* dark arm",
 "src/styles/tokens/glass-deep.css": "history in the past tense ('painted 16px where the plain overlay painted 22'); R-20 (iv) rewrote the line above it to name the ladder by its tokens",
 "src/styles/tokens/glass-fx.css": "the tab-track recess ink that darkens an edge, chart palette tinting, and the scrim that must not re-tint: live",
 "src/styles/tokens/glass.css": "the live plate-vs-tint fence (srgb plate, oklab tint), the well's oklab tone-step, the per-instance fill-tint axis (--glass-fill-tint, :316), the border presence 'not tinted', and the typed fail-safe clamp of @property",
 "src/styles/tokens/light-dark.css": "the control floor's max() clamp at 44px: live",
 "src/styles/tokens/property-regs.css": "the live accent axis (:114-123; ':115' is H9-1's homonym site; 'TINT (whole-plate legibility, the veil)' is a label, Crit8 §5.2), @property's typed clamp (:130, :185, :219), 'nothing sampled' (:151, an absence), and --motion-weight's OBSERVER subtree (:197)",
 "src/styles/tokens/scale-paper.css": "live tint knobs and inks: --control-checked-bg, the grid ink that re-tints with --foreground, --invalid-ring-tint, the metal registers 'not a tinted cast'",
 "src/styles/tokens/shadow.css": "clamp() inside the in-gamut shadow ink, the blob's tinted contact shade and its contact-darkening: live shadow prose",
 "src/styles/tokens/sizing.css": "live dock sizing prose: the control floor and type clamps, the switcher's glass tint rungs, the hairline's --surface-tint-* rung, the press DARKEN (--dock-control-press-bg)",
 "src/styles/utilities/base.css": "the consumer's own hover/active bg-tint under reduced motion: live",
 "tests/components/button/Button.test.ts": "Button §5's tone describe title: the live tone tint",
 "tests/components/custom/dock/GlassDock.posture.test.ts": "asserts the deletion: `backdropMode` is struck (H8's upheld site entry)",
 "tests/components/field/forms-seam.test.ts": "the type rung's bounded clamp: live",
 "tests/components/ui/surface/Surface.test.ts": "history: 'RED at the first cut's bytes' (H9 §2.4's site entry and the rung reading's history)",
 "tests/gates/feedback-tint-seam.test.ts": "the live gate G-FEEDBACK-TINT-SEAM: its name lines (H9-1 homonym sites) and its rule that the tone tints its own plate",
 "tests/styles/contrast-computed.test.ts": "premultiplied mix arithmetic, a register asserted deleted, 'measured, not sampled', and the tinted eyebrow: true",
 "tests/styles/glass-subtlety.test.ts": ":184 asserts one pole with no ink and no luma term; :96 evaluates clamp() in JS; :342 the scrim blur's sampled pixels: true",
 "tests/styles/proportion-register.test.ts": ":149 the fluid clamp; :294-295 history (W-FROST executed the deletion) and the assertion of no observer residue",
}
LINE = {
 "src/components/_shared/feedback/feedback-tone.css:20": "rewritten by this seat (R-21 (b) (v)): the tone wash is the rule's own oklab mix over `--glass-veil` (:80-84)",
 "src/components/_shared/feedback/feedback-tone.css:21": "rewritten by this seat (R-21 (b) (v)): as :20",
 "src/components/_shared/feedback/feedback-tone.css:62": "the live gate name G-FEEDBACK-TINT-SEAM (H9-1's homonym site)",
 "src/components/dock/styles/dock.css:15": "true as to the patch: 'one chromatic writer, no second tint layer' states floor v8's plate. The clause after it credits the adaptive-legibility partial with re-pointing --glass-veil-*, which neither HEAD's nor floor v8's adaptive-legibility.css does (shell.css:96-98 does); that misattribution is pre-existing at HEAD and names no mechanism the patch deleted, so it is reported for the landing docs pass, not ruled into the row",
 "src/components/dock/styles/dock.css:105": "states an absence: NO SEPARATE TINT VEIL",
 "src/components/_shared/menu/menu.css:10": "history: 'the ink fill darkened the cream row' is the reason the accent tint replaced it (past tense)",
 "demo/stories/substrates/glass-material.vue:6": "floor v8's plate: the veil's one pole, `--card`, carries any tint",
 "demo/stories/substrates/glass-material.vue:185": "a measurement note true of any plate: on a flat route a plate's blur radius and tint are both invisible",
}
# H10-2 (pass 10): the lines this seat read with a false clause the patch did not write carry verdict "reported"
# (pass-10/H10.md §3); every other ruling is verdict "true". Migrated in place by the H10 seat; no reading changed.
REPORTED = {"src/components/dock/styles/dock.css:15"}
src = open(sys.argv[1]).read().split("\n")
out, at = [], None
for l in src:
    m = re.match(r"^· (\S+) \[", l)
    if m: at = m.group(1); continue
    m = re.match(r"^\s+>\s+(\d+) \| (.*)$", l)
    if m and at:
        assert at.endswith(":" + m.group(1)), (at, l)
        f = at.rsplit(":", 1)[0]
        why = LINE.get(at) or FILE[f]
        out.append({"at": at, "says": m.group(2).strip(), "verdict": "reported" if at in REPORTED else "true", "why": why}); at = None
json.dump(out, open(sys.argv[2], "w"), indent=1, ensure_ascii=False)
print(f"rulings: {len(out)} lines in {len({x['at'].rsplit(':',1)[0] for x in out})} files · {sum(x['verdict'] == 'reported' for x in out)} reported")
