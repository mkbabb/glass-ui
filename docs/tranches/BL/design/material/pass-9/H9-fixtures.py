# H9-fixtures.py · D3 pass 9, H9: the scratch fixtures H9's self-test reads, written over copies of the real trees
# (H9-setup.sh `fixture`). Run with python3 -I, the trees' base as argv[1].
#   fv6fix, fv5fix, minor4fix  H8's and H7's fixtures, byte-for-byte the edits H8-setup.sh wrote (pass-8/H8-setup.sh)
#   fv8                        the floor v8 stand-in: floor v7 with R-20's four rewrites (REGISTRY P8-2.2), comments
#                              only. Scratch wording; the floor v8 seat owns the real wording and is read by the same rows
import shutil, sys
B = sys.argv[1]
def sub(f, old, new):
    p = f"{B}/{f}"; s = open(p).read(); assert s.count(old) == 1, (f, old[:50]); open(p, "w").write(s.replace(old, new))

# H8 (pass-8/H8-setup.sh fixture): floor v6 with R-17 (i)'s two rewrites and liquid-fill.css:74's.
F = "trees/fv6fix/tests/components/field/forms-seam.test.ts"
sub(F, " *   · G-F2's `bg α < 1.0` + `field L* ≤ page L* − 3` halves — both resolve\n *     `--input-on-glass`, which is #22 W-FROST's token (§9 row 2, \"both or\n *     nothing paints\"). The other half",
       " *   · G-F2's `bg α < 1.0` + `field L* ≤ page L* − 3` halves — both resolve\n *     the field well, `--control-surface-bg: var(--glass-well)`, which the\n *     check below reads. The other half")
sub(F, "the perimeter rides the 0.48 ink rung and the well is a real inset (fill α fenced on W-FROST)",
       "the perimeter rides the `--ink-perimeter` rung and the well is a real inset")
sub("trees/fv6fix/src/styles/glass/liquid-fill.css", "rung (the 14px radius that SCALES by", "rung (its radius SCALES by")
# H7 (pass-8/H8-setup.sh h7trees): fv5fix and minor4fix.
F = "h7trees/fv5fix"
sub(f"{F}/src/components/dock/README.md", "owns the plate, orientation, collapse state, overflow, and backdrop mode.", "owns the plate, orientation, collapse state, and overflow.")
sub(f"{F}/demo/stories/dock/dock-search.vue", "rides the morph; adaptive tinting\n                             keeps its text contrast at or above 4.5:1.", "rides the morph; the field reads the\n                             floating rung at the bound, which keeps its text contrast at or above 4.5:1.")
sub(f"{F}/demo/stories/substrates/glass-material.vue", "the three\n// SOTA folds (squircle, chromatic fringe, adaptive tint) ride that", "the\n// SOTA folds ride that")
sub(f"{F}/src/styles/glass/overlay-plate.css", "There is no adaptive-tint layer and no", "There is no second tint layer and no")
sub(f"{F}/demo/stories/compositions/auth-shell.vue", "cannot inherit the glass\n   backdrop bucket.", "cannot inherit the glass\n   ladder's ink.")
M = "h7trees/minor4fix"
sub(f"{M}/src/components/dock/styles/adaptive-legibility.css", "The PLATE half — the earned\n * darken off the measured backdrop luminance — is composed", "The PLATE half — the earned\n * ink (darker in dark, a thicker cream pole in light) — is composed")
sub(f"{M}/src/styles/glass/overlay-plate.css", "the veil already carries the earned\n       darken, and", "the veil already carries the earned\n       ink (darker in dark, a thicker cream pole in light), and")

# H9: the floor v8 stand-in, R-20 (i)-(iv) on floor v7.
shutil.rmtree(f"{B}/trees/fv8", ignore_errors=True); shutil.copytree(f"{B}/trees/fv7", f"{B}/trees/fv8")
V = "trees/fv8"
# (i) surfaces-pager.css:29-36: what floor v7 paints.
sub(f"{V}/src/styles/glass/surfaces-pager.css",
    """        /* The element-level oklab TINT seam (NOT the raw
           pre-substituted `--glass-plate-floating` :root token — the gray-hole
           substitution-trap). At the `--glass-level: 0` default this is the
           no-op floor (`X, src 0%) ≡ X` — byte-identical pager pixels
           over a flat page); the pill paints the floating rung's chrome-bound veil; under `.dark` the
           tint arm LIFTS it toward luminous warm-dark, never a charcoal
           slab. `in oklab` is the glass-tint perceptual family (the in-srgb
           `--surface-tint-*` brand fence is untouched). The dock plate's element-level""",
    """        /* The pill applies `glass-plate` at the floating rung: one `--card` pole
           composed at the ELEMENT (NOT the raw pre-substituted
           `--glass-plate-floating` :root token — the gray-hole substitution-trap),
           the same composition in both themes, with no ink, clamp or oklab mix.
           `--glass-level` defaults to 1. The dock plate's element-level""")
# (ii) GlassDock.vue:467: the bound dock/search.css composes, in that file's words.
sub(f"{V}/src/components/dock/GlassDock.vue",
    """                `.dock-search-field` surface reads the tint seam (dock/search.css) so
                the active field reads ≥4.5:1 over the backdrop (the no-pale-fade
                legibility floor).""",
    """                `.dock-search-field` surface reads the bound dock/search.css composes
                (≥4.5:1, the bound), so the active field holds the no-pale-fade
                legibility floor.""")
# (iii) dock/styles/index.css:79-83.
sub(f"{V}/src/components/dock/styles/index.css",
    """   active-field tint legibility seam + the `.glass-menu-row` result rows). A net-new""",
    """   active field at the bound + the `.glass-menu-row` result rows). A net-new""")
sub(f"{V}/src/components/dock/styles/index.css",
    """glide (box-inviolate); CONSUMES the tint seam + the menu-row recipe, re-authors neither. */""",
    """glide (box-inviolate); CONSUMES the bound search.css composes (≥4.5:1, the bound) + the
   menu-row recipe, re-authors neither. */""")
# (iv) glass-deep.css:12-13 and :54: history in the past tense, the current ladder by its tokens.
sub(f"{V}/src/styles/tokens/glass-deep.css",
    """ * deeper"; the calm ladder then moved to 10/14/16/20/22px and the LERP ran
 * 20px -> 16px. A deep overlay painted 16px where the plain overlay paints 22, and
 * thickness graded BACKWARDS with prominence.""",
    """ * deeper"; the calm ladder then retuned past it and the LERP ran downward. A deep
 * overlay painted thinner than the plain overlay it decorated, and thickness graded
 * BACKWARDS with prominence. The calm ladder today is the `--glass-blur-*-radius`
 * rungs of tokens/glass.css.""")
sub(f"{V}/src/styles/tokens/glass-deep.css",
    """       the calm ladder has since moved to 10/14/16/20/22px, so the LERP ran""",
    """       the calm ladder then retuned (the `--glass-blur-*-radius` rungs), so the LERP ran""")
print("fixtures written: fv6fix fv5fix minor4fix fv8")
