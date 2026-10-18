#!/usr/bin/env python3
# R-18 (i) and (iii): the comment and test-title rewrites of the minor v6, applied to the minor v5 tree.
# The list is Crit A-3's table (pass-7/D3-critique.md), fixed (R-18 (iv)), plus forms-seam.test.ts:91 (R-18 (iii)).
# Each old string must occur exactly once in its file, or nothing is written.
#   python3 -I MS6-r18-edits.py <worktree>
import sys, pathlib
W = pathlib.Path(sys.argv[1])
AL = "src/components/dock/styles/adaptive-legibility.css"
E = [
# ── A-3 · adaptive-legibility.css:24 (false in light) ──────────────────────────────────────────────────────
(AL,
"""       block reads an ANCESTOR — verified on Chrome 148), so a self-declaration cannot
       self-darken. This `:where(.glass-dock)` rule is the genuine UNCONDITIONAL
""",
"""       block reads an ANCESTOR — verified on Chrome 148), so a self-declaration cannot
       self-engage. This `:where(.glass-dock)` rule is the genuine UNCONDITIONAL
"""),
# ── A-3 · adaptive-legibility.css:28-30 and :32-34 (false in light; :32-34 is R-16 #3's twin, rewritten as #3 was) ─
(AL,
"""       over an unknown field. It re-points no plate colour and could not: the plate's
       own darken is composed AT THE ELEMENT through the veil clamp (see the rule
       body below), which is the whole dynamic half. A dark-substrate consumer opts
       out via `--glass-level` on the dock root. The muted body
       register lifts to the full warm-ink under the engaged plate (the muted L40
       tier cannot clear 4.5:1 on a translucent darkened plate — darkening moves the
       plate TOWARD muted's own luminance; the low-contrast muted register is
       inappropriate over a busy glass plate, so it resolves to the legible dark
       ink, which clears ~10:1). */
""",
"""       over an unknown field. It re-points no plate colour and could not: the plate's
       own earned ink (darker in dark, a thicker cream pole in light) is composed AT
       THE ELEMENT through the veil clamp (see the rule body below), which is the
       whole dynamic half. A dark-substrate consumer opts out via `--glass-level` on
       the dock root. The muted body register lifts to the full warm ink under the
       engaged plate: the low-contrast muted register is inappropriate over a busy
       glass plate. */
"""),
# ── A-3 · adaptive-legibility.css:59-60 (false in both modes: no bucket above, no dock-plate darken at a floor) ─────
(AL,
"""       147+/Safari 26+; progressive enhancement, NEVER the load-bearing floor). The
       declarative bucket above already carries AA on all engines (it darkens the dock
       plate so the warm-dark `--dock-fg-on-aurora` clears ~17:1 over white at the 18%
       floor). On a supporting engine `contrast-color()` REFINES the control ink,
""",
"""       147+/Safari 26+; progressive enhancement, NEVER the load-bearing floor). The
       unconditional self-engage above already carries AA on all engines: it re-points
       `--dock-fg-on-aurora` and the muted register to the full `--foreground` ink, and
       it moves no plate. On a supporting engine `contrast-color()` REFINES the control ink,
"""),
# ── A-3 · adaptive-legibility.css:70 (false in light; R-16 #5's twin) ──────────────────────────────────────
(AL,
"""           progressive enhancement only — the declarative darken is the AA floor. */""",
"""           progressive enhancement only — the declarative lift is the AA floor. */"""),
# ── A-3 · dock/styles/search.css:4, :10, :58 (false in light) ───────────────────────────────────────────────
("src/components/dock/styles/search.css",
""" * over whatever backdrop the dock floats on (≥4.5:1, the darken seam) — never the
""",
""" * over whatever backdrop the dock floats on (≥4.5:1, the plate's earned ink) — never the
"""),
("src/components/dock/styles/search.css",
""" * `:root`'s luma and does NOT darken — the pale-fade; the dock's own such token is
""",
""" * `:root`'s luma and does NOT earn ink — the pale-fade; the dock's own such token is
"""),
("src/components/dock/styles/search.css",
"""       the opaque page and collapses on a translucent darkened plate). */""",
"""       the opaque page and collapses on a translucent glass plate). */"""),
# ── A-3 · dock/styles/shell.css:130, :135 (false in light) ──────────────────────────────────────────────────
("src/components/dock/styles/shell.css",
"""        /* The dock self-darkens over light backdrops with NO consumer opt-in (a dock
           floats over arbitrary — frequently light — page content), and it does so
""",
"""        /* The dock earns its plate ink over light backdrops (darker in dark, a thicker
           cream pole in light) with NO consumer opt-in (a dock floats over arbitrary —
           frequently light — page content), and it does so
"""),
("src/components/dock/styles/shell.css",
"""           re-pointed here darkens the plate — the `--glass-plate-*` colours resolve at
""",
"""           re-pointed here moves the plate — the `--glass-plate-*` colours resolve at
"""),
# ── A-3 · dock/styles/index.css:21-23 (false in both modes: the file holds neither the clamp nor a bucket) ─────
("src/components/dock/styles/index.css",
""" *   - dock/adaptive-legibility.css — the darken-over-light self-engage (the
 *                            continuous backdrop-luma tint clamp, the warm-chromatic
 *                            dock ink, the @container light bucket, contrast-color()
 *                            refinement, the frozen-backdrop static arm). Split from
""",
""" *   - dock/adaptive-legibility.css — the dock's foreground self-engage (the
 *                            warm-chromatic dock ink, the contrast-color()
 *                            refinement, the frozen-backdrop static arm; it holds
 *                            no clamp and no bucket). Split from
"""),
# ── A-3 · tokens/property-regs.css:152, :164 (false in light) ───────────────────────────────────────────────
("src/styles/tokens/property-regs.css",
"""   Over-light legibility rides the SEPARATE `--glass-veil-*` axis: level = opacity+blur,
   tint = darken-over-light. The two coordinate but never collapse — the a11y
""",
"""   Over-light legibility rides the SEPARATE `--glass-veil-*` axis: level = opacity+blur,
   veil = the earned ink (darker in dark, a thicker cream pole in light). The two
   coordinate but never collapse — the a11y
"""),
("src/styles/tokens/property-regs.css",
"""   applying the plate earns the same continuous darken from the same arithmetic. It
""",
"""   applying the plate earns the same continuous ink (darker in dark, a thicker cream
   pole in light) from the same arithmetic. It
"""),
# ── A-3 · glass/surface-axis.css:79 (false in both modes: there is no tint axis; ladder.css:165) ───────────────
("src/styles/glass/surface-axis.css",
"""       coherently. The adaptive TINT axis is zeroed (a solid plate has no
       translucent backdrop to earn ink over — the bucket-INVARIANT contract). */
""",
"""       coherently. There is no tint axis to zero: the veil is the plate's one writer
       (glass/veil.css), and a solid plate has no translucent backdrop to earn ink
       over — the bucket-INVARIANT contract. */
"""),
# ── A-3 · glass/surfaces-pager.css:29-32 (false in both modes: the tint seam is gone) ────────────────────────
("src/styles/glass/surfaces-pager.css",
"""        /* The element-level oklab TINT seam (NOT the raw
           pre-substituted `--glass-plate-floating` :root token — the gray-hole
           substitution-trap). At the `--glass-level: 0` default this is the
           no-op floor (`X, src 0%) ≡ X` — byte-identical pager pixels
           over a flat page); over a sampled BRIGHT carousel image the pill earns ink
""",
"""        /* The plate composed at the element (NOT the raw
           pre-substituted `--glass-plate-floating` :root token — the gray-hole
           substitution-trap). Over a calm or unsampled backdrop the clamp resolves
           exactly the floating rung's own ink; over a sampled BRIGHT carousel image the pill earns ink
"""),
# ── R-18 (iii) · tests/components/field/forms-seam.test.ts:91: the rung by its token (the minor's rung is 0.54) ─────
("tests/components/field/forms-seam.test.ts",
"""    it("G-F2 · PERIMETER + RECESS — the perimeter rides the 0.48 ink rung and the well is a real inset (fill α fenced on W-FROST)", () => {""",
"""    it("G-F2 · PERIMETER + RECESS — the perimeter rides the `--ink-perimeter` rung and the well is a real inset (fill α fenced on W-FROST)", () => {"""),
]
texts = {}
for f, old, new in E:
    t = texts.setdefault(f, (W / f).read_text())
    n = t.count(old)
    if n != 1:
        sys.exit(f"MISS {f}: old string occurs {n} times: {old[:70]!r}")
    texts[f] = t.replace(old, new)
for f, t in texts.items():
    (W / f).write_text(t)
print(f"R-18: {len(E)} edits in {len(texts)} files")
