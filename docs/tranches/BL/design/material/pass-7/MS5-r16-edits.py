#!/usr/bin/env python3
# R-16 (i) and (iii): the comment rewrites of the minor v5, applied to the minor v4 tree. Each old string must occur once.
import sys, pathlib
W = pathlib.Path(sys.argv[1])
E = [
# ── R-16 (i) ──────────────────────────────────────────────────────────────────────────────────────────────
("src/components/dock/styles/adaptive-legibility.css",
""" * frozen-backdrop (`data-backdrop-mode="static"`) arm. The PLATE half — the earned
 * darken off the measured backdrop luminance — is composed at the element in
 * dock/dock.css and lives in `@utility glass-plate` (glass/veil.css); no token
 * re-pointed here could carry it.
""",
""" * frozen-backdrop (`data-backdrop-mode="static"`) arm. The PLATE half — the earned
 * ink off the measured backdrop luminance (darker in dark, a thicker cream pole in
 * light) — is composed at the element in dock/dock.css and lives in `@utility
 * glass-plate` (glass/veil.css); no token re-pointed here could carry it.
"""),
("src/styles/glass/overlay-plate.css",
"""       `--select-plate-alpha` solidity knob: the veil already carries the earned
       darken, and a second layer pushing the same plate the same way is the
       double-writer the material law forbids. A menu that needs more body needs a
       heavier RUNG. `prefers-reduced-transparency` reaches this plate through
       `--glass-level`, like every other. */
""",
"""       `--select-plate-alpha` solidity knob: the veil already carries the earned
       ink (darker in dark, a thicker cream pole in light), and a second layer
       pushing the same plate the same way is the double-writer the material law
       forbids. A menu that needs more body needs a heavier RUNG.
       `prefers-reduced-transparency` reaches this plate through `--glass-level`,
       like every other. */
"""),
# ── R-16 (iii): MS4 §1.2's list, the sentences ruled false in light ─────────────────────────────────────────
# ladder.css:163-164
("src/styles/glass/ladder.css",
"""    /* ── Adaptive legibility: the bright-backdrop bucket (the iOS-26/27
       "locally darken the glass over light content" move; G2) ──────────────────
""",
"""    /* ── Adaptive legibility: the bright-backdrop bucket (G2: legible ink over
       light content) ────────────────────────────────────────────────────────────
"""),
# ladder.css:165-168
("src/styles/glass/ladder.css",
"""       THE TINT AXIS IS GONE. It mixed every rung toward `--glass-veil-ink` — the warm
       near-black `--foreground` — while the veil already writes warm near-black ink at
       the rung's own alpha. Two chromatic writers, one plate, one direction: the plate
       darkened twice and neither writer could be reasoned about alone. The veil is the
""",
"""       THE TINT AXIS IS GONE. It mixed every rung toward `--glass-veil-ink` while the
       veil already writes that ink at the rung's own alpha. Two chromatic writers, one
       plate, one direction: the plate moved twice and neither writer could be reasoned
       about alone. The veil is the
"""),
# ladder.css:175-177
("src/styles/glass/ladder.css",
"""       register lifts to the full warm ink: the muted L40 tier cannot clear 4.5:1 on a
       darkened translucent plate, because darkening moves the plate TOWARD muted's own
       luminance. That is a foreground decision and it belongs here.
""",
"""       register lifts to the full warm ink. That is a foreground decision and it
       belongs here.
"""),
# ladder.css:245-247
("src/styles/glass/ladder.css",
"""       ratified): the declarative bucket above already carries AA on ALL engines (it
       darkens the translucent plate so dark text clears ~11:1 over white at the 18%
       floor — the live π readback ratifies). On a supporting engine `contrast-color()`
""",
"""       ratified): the declarative bucket above already carries AA on ALL engines (it
       lifts the ink on the plate to the full warm ink). On a supporting engine
       `contrast-color()`
"""),
# ladder.css:268
("src/styles/glass/ladder.css",
"""           one-off). Progressive enhancement only — the declarative darken is the AA floor. */
""",
"""           one-off). Progressive enhancement only — the declarative lift is the AA floor. */
"""),
# ladder.css:291-296
("src/styles/glass/ladder.css",
"""           modal over a genuinely-bright/busy backdrop flips to the dark contrast ink
           (where the plate ACTUALLY darkens to bright-bucket AA), the `--foreground`/
           `--muted-foreground` lift moving in LOCKSTEP there (the scope-6 lockstep). The
           overlay band STILL self-darkens UNCONDITIONALLY (the tint-strength clamp above,
           it floats over unknown) — only the INK flips in the bright bucket. ONE
""",
"""           modal over a genuinely-bright/busy backdrop flips to the dark contrast ink
           (where the bucket lifts the ink to its AA floor), the `--foreground`/
           `--muted-foreground` lift moving in LOCKSTEP there (the scope-6 lockstep). The
           overlay band STILL self-engages the bucket UNCONDITIONALLY (it floats over
           unknown) — only the INK flips in the bright bucket. ONE
"""),
# ladder.css:299-304
("src/styles/glass/ladder.css",
"""           LIGHT page the content tiers only carry the 4% silhouette floor (still a warm cream
           plate), so flipping the ink to the contrast-color DARK ink there is correct only
           where the plate ACTUALLY darkens to the bright-bucket AA — the unconditional flip
           would force a white-on-cream / dark-on-darkened mismatch on the calm card. The
           content tiers therefore take NO unconditional contrast-color flip; their flip lives
           in the @container bucket with the rest of the bright-condition darken. */
""",
"""           LIGHT page the content tiers paint the cream pole at the bound, so flipping the
           ink to the contrast-color DARK ink there is correct only where the bucket
           engages — the unconditional flip would force the contrast ink onto the calm
           card. The content tiers therefore take NO unconditional contrast-color flip;
           their flip lives in the @container bucket with the rest of the bright-condition
           lift. */
"""),
# deep.css:26-30
("src/styles/glass/deep.css",
""" * SAME level path (the opaque escape). The bright-bucket darken reaches the
 * deep surface by construction too: `.glass-deep` is composed WITH `.glass-floating`,
 * which is already in the `@container style(--glass-backdrop: light)` material
 * group (ladder.css) AND self-engages the overlay-band darken — the deep tier
 * inherits the legibility tint with no selector-list edit.
""",
""" * SAME level path (the opaque escape). The bright bucket reaches the deep surface
 * by construction too: `.glass-deep` is composed WITH `.glass-floating`, which is
 * already in the `@container style(--glass-backdrop: light)` material group
 * (ladder.css) AND self-engages the overlay band's bucket, and its plate earns the
 * floating rung's ink (darker in dark, a thicker cream pole in light) — the deep
 * tier inherits both with no selector-list edit.
"""),
# glass-fx.css:141-144
("src/styles/tokens/glass-fx.css",
"""       resolves EXACTLY the rung's own ink; above it the ink ramps CONTINUOUSLY toward two
       rungs deeper. Raising the knee darkens LATER — a brighter backdrop is tolerated
       before the lift. */
""",
"""       resolves EXACTLY the rung's own ink; above it the ink ramps CONTINUOUSLY toward two
       steps more (darker in dark, a thicker cream pole in light). Raising the knee earns
       ink LATER — a brighter backdrop is tolerated before the lift. */
"""),
# tokens/glass.css:207-208
("src/styles/tokens/glass.css",
"""       the rim, and a chip may carry BOTH. It rides ON TOP of the legibility composite,
       additively — the plate still darkens-over-light for AA AND carries the data hue.
""",
"""       the rim, and a chip may carry BOTH. It rides ON TOP of the legibility composite,
       additively — the plate still earns its ink for AA (darker in dark, a thicker
       cream pole in light) AND carries the data hue.
"""),
# on-glass-fg.css:15
("src/styles/tokens/on-glass-fg.css",
"""   --glass-veil-* cascade context, NOT a fork): (a) bright/darkened plate → full
""",
"""   --glass-veil-* cascade context, NOT a fork): (a) declared-bright backdrop → full
"""),
# property-regs.css:121
("src/styles/tokens/property-regs.css",
"""   DISTINCT, not a fork, of `--glass-veil-ink` (the whole-plate legibility darken): the
""",
"""   DISTINCT, not a fork, of `--glass-veil-ink` (the whole-plate legibility ink: darker
   in dark, a thicker cream pole in light): the
"""),
# surfaces-pager.css:33-35
("src/styles/glass/surfaces-pager.css",
"""           over a flat page); over a declared/sampled BRIGHT carousel image
           (`@container style(--glass-backdrop: light)`) the pill darkens-toward-ink for a
           real silhouette (the ≤24% clamp keeps it translucent); under `.dark` the
""",
"""           over a flat page); over a sampled BRIGHT carousel image the pill earns ink
           for a real silhouette (darker in dark, a thicker cream pole in light; the
           clamp's two-step ceiling keeps it translucent); under `.dark` the
"""),
# rim.css:35
("src/styles/glass/rim.css",
"""       the accent is rim decoration, not the whole-plate legibility darken. One
""",
"""       the accent is rim decoration, not the whole-plate legibility ink. One
"""),
# surface-axis.css:18
("src/styles/glass/surface-axis.css",
"""               so `--glass-level` / the bright-bucket darken retune it in lockstep
""",
"""               so `--glass-level` / the earned ink retune it in lockstep
"""),
# surface-axis.css:22
("src/styles/glass/surface-axis.css",
"""               zeroed (a solid plate has no translucent backdrop to darken-over).
""",
"""               zeroed (a solid plate has no translucent backdrop to earn ink over).
"""),
# surface-axis.css:79-80
("src/styles/glass/surface-axis.css",
"""       translucent backdrop to darken-over — the bucket-INVARIANT contract). */
""",
"""       translucent backdrop to earn ink over — the bucket-INVARIANT contract). */
"""),
# useGlassBackdropLuminance.ts:45
("src/composables/glass/useGlassBackdropLuminance.ts",
"""     * The luminance threshold above which the backdrop is `light` (engages the darken).
""",
"""     * The luminance threshold above which the backdrop is `light` (engages the bright bucket).
"""),
]
for f, old, new in E:
    p = W / f; t = p.read_text()
    n = t.count(old)
    if n != 1: sys.exit(f"MISS {f}: old string occurs {n} times:\n{old}")
    p.write_text(t.replace(old, new))
    print(f"ok {f}")
print(f"{len(E)} edits")
