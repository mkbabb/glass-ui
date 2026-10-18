#!/usr/bin/env python3
# R-23: the comment-only rewrites of the minor v7, applied to the minor v6 tree. The list is Crit8 §5.2's table, fixed
# (REGISTRY P8-2.2 R-23): 11 sites in 9 files. Where floor v7 or floor v8 already rewrote the same sentence's twin, the
# minor takes that wording (P-3): liquid-fill.css (FV7 §1.2), forms-seam.test.ts:94-95 (FV7), glass-deep.css:12-14 and
# :54 (floor v8, R-20 (iv); the minor's glass-deep.css is floor v7's, Crit8 §5.2). Each old string must occur exactly
# once in its file, or nothing is written. Every edit keeps its comment's line count.
#   python3 -I MS7-r23-edits.py <worktree>
import sys, pathlib
W = pathlib.Path(sys.argv[1])
AL = "src/components/dock/styles/adaptive-legibility.css"
E = [
# ── DESIGN.md:1805 (false in both modes: the minor's perimeter rung is 0.54; P-3: the tokens hold the values) ──────
("DESIGN.md",
"""**One ink.** Every boundary and rule is `--foreground` at one of three alphas
(`--ink-seam` 0.08, `--ink-edge` 0.16, `--ink-perimeter` 0.48), composed by the reader:
""",
"""**One ink.** Every boundary and rule is `--foreground` at one of three alphas
(`--ink-seam`, `--ink-edge`, `--ink-perimeter`, in ascending order), composed by the reader:
"""),
# ── liquid-fill.css:76 (false: the minor's quiet radius is 10px), FV7 §1.2's wording ─────────────────────────────
("src/styles/glass/liquid-fill.css",
"""        /* The blur routes the `--glass-blur-quiet` rung (the 14px radius that SCALES by
""",
"""        /* The blur routes the `--glass-blur-quiet` rung (its radius SCALES by
"""),
# ── Button.test.ts:146 (false in light: R-13's register, the clamp earns ink, not a darken) ───────────────────────
("tests/components/button/Button.test.ts",
"""            // so the tier, the earned-darken clamp and `--glass-level` all survive
""",
"""            // so the tier, the earned-ink clamp and `--glass-level` all survive
"""),
# ── feedback-tint-seam.test.ts:11 (false in light, as above) ───────────────────────────────────────────────────
("tests/gates/feedback-tint-seam.test.ts",
"""// its tier ink, its earned-darken clamp, its `--glass-level` — is discarded at the last
""",
"""// its tier ink, its earned-ink clamp, its `--glass-level` — is discarded at the last
"""),
# ── adaptive-legibility.css:61-62 and :65 (false in both modes: the file declares no bucket for the dock's ink, :50-54;
#    the self-engage, :57-60, is the floor) ───────────────────────────────────────────────────────────────────────
(AL,
"""       anchored on the LIGHT BACKDROP signal (`--card`, the warm-white surface base the
       bright bucket implies) — `contrast-color(var(--card))` resolves to the legible
""",
"""       anchored on the LIGHT BACKDROP signal (`--card`, the warm-white surface base of
       the light plate) — `contrast-color(var(--card))` resolves to the legible
"""),
(AL,
"""       refinement in glass.css. The bucket is the floor; this is the native pick. */
""",
"""       refinement in glass.css. The self-engage is the floor; this is the native pick. */
"""),
# ── surfaces-pager.css:34-36 (false in both modes: there is no tint arm, ladder.css:165; :33 already says the earned
#    ink is darker in dark). :36's "`in oklab` is the glass-tint perceptual family" is the dangling half of the oklab
#    TINT seam R-18 struck at :29: the rule runs no oklab mix (its plate is glass-plate's srgb veil, glass/veil.css:87-92;
#    its two box-shadow mixes are in srgb), so the range R-23 names is rewritten whole. The ceiling arithmetic: floating
#    + 2 steps is base + 2(1 − base)/3 < 1 in light (tokens/glass.css:51-57) and 0.22 + 0.08 = 0.30 in dark
#    (dark-arm.css:276-282) ──────────────────────────────────────────────────────────────────────────────────────
("src/styles/glass/surfaces-pager.css",
"""           clamp's two-step ceiling keeps it translucent); under `.dark` the
           tint arm LIFTS it toward luminous warm-dark, never a charcoal
           slab. `in oklab` is the glass-tint perceptual family (the in-srgb
""",
"""           clamp's two-step ceiling keeps it translucent, in both themes; one
           writer, the clamp, moves the pill's ink, never a second axis, and
           the pill runs no oklab mix of its own (the in-srgb
"""),
# ── property-regs.css:154-155 (false in both modes: a11y-fallback.css:32-46 sets --glass-level: 0.3 and
#    --glass-definition: 1 and writes no veil or tint token) ──────────────────────────────────────────────────────
("src/styles/tokens/property-regs.css",
"""   coordinate but never collapse — the a11y
   Clear↔Tinted escape rides level-up here AND tint-toward-ink under
   `prefers-contrast: more`. */
""",
"""   coordinate but never collapse — the a11y
   Clear↔Tinted escape rides this knob alone: `prefers-contrast: more` sets
   `--glass-level: 0.3` (glass/a11y-fallback.css) and writes no veil token. */
"""),
# ── forms-seam.test.ts:94-95 (false: the minor's rung is 0.54), FV7's wording ───────────────────────────────────
("tests/components/field/forms-seam.test.ts",
"""        // mass of 0.075 against the ladder's 0.48.
""",
"""        // mass of 0.075, a fraction of the ladder's perimeter rung.
"""),
# ── glass-deep.css:12-14 and :54 (A-1 #4 in the minor; floor v8's R-20 (iv) wording, byte for byte) ──────────────
("src/styles/tokens/glass-deep.css",
""" * deeper"; the calm ladder then moved to 10/14/16/20/22px and the LERP ran
 * 20px -> 16px. A deep overlay painted 16px where the plain overlay paints 22, and
 * thickness graded BACKWARDS with prominence. The +5px delta is what the family
""",
""" * deeper"; the calm ladder (the `--glass-blur-*-radius` rungs) then retuned and the
 * LERP ran 20px -> 16px. A deep overlay painted 16px where the plain overlay then
 * painted 22, and thickness graded BACKWARDS with prominence. The +5px delta is what the family
"""),
("src/styles/tokens/glass-deep.css",
"""       the calm ladder has since moved to 10/14/16/20/22px, so the LERP ran
""",
"""       the calm ladder then retuned (the `--glass-blur-*-radius` rungs), so the LERP ran
"""),
]
texts = {}
for f, old, new in E:
    t = texts.setdefault(f, (W / f).read_text())
    n = t.count(old)
    if n != 1:
        print(f"REFUSED: {f}: old string occurs {n} times:\n{old}"); sys.exit(4)
    texts[f] = t.replace(old, new)
for f, t in texts.items():
    if t.count("\n") != (W / f).read_text().count("\n"):
        print(f"REFUSED: {f}: line count moved"); sys.exit(4)
for f, t in texts.items():
    (W / f).write_text(t)
print(f"R-23: {len(E)} edits in {len(texts)} files, each old string matched exactly once, line counts kept")
