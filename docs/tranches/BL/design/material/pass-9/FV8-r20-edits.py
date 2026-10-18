# FV8-r20-edits.py · D3 pass 9, floor v8: R-20 (i)-(iv) (REGISTRY P8-2.2), comments only, written over a worktree that
# holds floor v7 (pass-8/floor-v7.patch). Each substitution must match exactly once. Run with python3 -I, the worktree
# root as argv[1]. Line counts of every edited comment are kept, so no line below an edit moves.
import sys
W = sys.argv[1]
def sub(f, old, new):
    p = f"{W}/{f}"; s = open(p).read(); assert s.count(old) == 1, (f, old[:60])
    assert old.count("\n") == new.count("\n"), (f, "line count")
    open(p, "w").write(s.replace(old, new))

# (i) surfaces-pager.css:29-36: what floor v7 paints (veil.css `glass-plate`: one `--card` pole, srgb mix with
# transparent, no ink, no clamp; `--glass-level` registered with initial-value 1, property-regs.css:154-158).
sub("src/styles/glass/surfaces-pager.css",
    """        /* The element-level oklab TINT seam (NOT the raw
           pre-substituted `--glass-plate-floating` :root token — the gray-hole
           substitution-trap). At the `--glass-level: 0` default this is the
           no-op floor (`X, src 0%) ≡ X` — byte-identical pager pixels
           over a flat page); the pill paints the floating rung's chrome-bound veil; under `.dark` the
           tint arm LIFTS it toward luminous warm-dark, never a charcoal
           slab. `in oklab` is the glass-tint perceptual family (the in-srgb
           `--surface-tint-*` brand fence is untouched). The dock plate's element-level""",
    """        /* The pill applies `glass-plate` at the floating rung: one `--card`
           pole composed at the ELEMENT (NOT the raw pre-substituted
           `--glass-plate-floating` :root token — the gray-hole
           substitution-trap). The composition is the same in both themes,
           with no ink, clamp or oklab mix; only `--card` differs between
           them. `--glass-level` defaults to 1, so the pill paints the
           floating rung's chrome-bound veil (the in-srgb
           `--surface-tint-*` brand fence is untouched). The dock plate's element-level""")

# (ii) GlassDock.vue:467 (an HTML template comment): the bound dock/search.css composes, in that file's words.
sub("src/components/dock/GlassDock.vue",
    """                `.dock-search-field` surface reads the tint seam (dock/search.css) so
                the active field reads ≥4.5:1 over the backdrop (the no-pale-fade
                legibility floor).""",
    """                `.dock-search-field` surface reads the bound dock/search.css composes
                at the element (≥4.5:1, the bound), so the active field holds the
                no-pale-fade legibility floor over the backdrop.""")

# (iii) dock/styles/index.css:79-83: the same, for the file that imports search.css.
sub("src/components/dock/styles/index.css",
    """/* The dock-as-native-dynamic-search-bar field surface (the
   active-field tint legibility seam + the `.glass-menu-row` result rows). A net-new
   surface on a dock that authors the `#search` slot ([2026-08-12 · BK #47 W1
   SURFACE] ~~`[data-search]`~~); the pill→field morph is the dock's OWN `--dock-morph-t`
   glide (box-inviolate); CONSUMES the tint seam + the menu-row recipe, re-authors neither. */""",
    """/* The dock-as-native-dynamic-search-bar field surface (the active field,
   which holds the bound, ≥4.5:1, + the `.glass-menu-row` result rows). A net-new
   surface on a dock that authors the `#search` slot ([2026-08-12 · BK #47 W1
   SURFACE] ~~`[data-search]`~~); the pill→field morph is the dock's OWN `--dock-morph-t`
   glide (box-inviolate); CONSUMES `glass-plate` + the menu-row recipe, re-authors neither. */""")

# (iv) glass-deep.css:12-13 and :54: the history in the past tense, the current ladder by its tokens.
sub("src/styles/tokens/glass-deep.css",
    """ * deeper"; the calm ladder then moved to 10/14/16/20/22px and the LERP ran
 * 20px -> 16px. A deep overlay painted 16px where the plain overlay paints 22, and
 * thickness graded BACKWARDS with prominence. The +5px delta is what the family""",
    """ * deeper"; the calm ladder (the `--glass-blur-*-radius` rungs) then retuned and the
 * LERP ran 20px -> 16px. A deep overlay painted 16px where the plain overlay then
 * painted 22, and thickness graded BACKWARDS with prominence. The +5px delta is what the family""")
sub("src/styles/tokens/glass-deep.css",
    """       the calm ladder has since moved to 10/14/16/20/22px, so the LERP ran""",
    """       the calm ladder then retuned (the `--glass-blur-*-radius` rungs), so the LERP ran""")
print("R-20 written: surfaces-pager.css, GlassDock.vue, dock/styles/index.css, glass-deep.css (2)")

# R-21 (b), recorded as a departure from R-20's "no other sentence": three lines R-21's frozen list prints (prose-sweep.mjs
# over floor v8 = floor v7 + R-20) that this seat read false, each naming the patch's deleted veil ink / clamp as live.
# (v) feedback-tone.css:20-22: no `--glass-veil-*` token runs an oklab mix toward a tint on floor v7 (the plate is
# `color-mix(in srgb, var(--card) …, transparent)`, veil.css), and `--veil-bg` is declared nowhere in src/. What the
# rule does is :80-84: `color-mix(in oklab, var(--glass-veil, …), var(--tone) …)`.
sub("src/components/_shared/feedback/feedback-tone.css",
    """   a tinted-glass wash (the rung bg mixed a BOUNDED % toward the tone, the SAME
   `color-mix(in oklab, <rung bg>, <tint> <strength>)` seam the `--glass-veil-*`
   legibility lift and the `--veil-bg` plate already run — ZERO new compositing path) +""",
    """   a tinted-glass wash (the rung bg mixed a BOUNDED % toward the tone,
   `color-mix(in oklab, <rung bg>, <tint> <strength>)` over the rung's own published
   `--glass-veil` — one mix, ZERO new compositing path, no second plate) +""")
# (vi) a11y-fallback.css:33-35: the plate is `--card` at α with no ink (glass-subtlety.test.ts:184 asserts it).
sub("src/styles/glass/a11y-fallback.css",
    """   solid `--card` AND drops the blur to 30% of its rung — the firmer plate and the
   legibility lift are the same move, because the plate is ink over the card escape
   and the level IS the mix. The separate tint-darken this bracket used to add was a
   second writer pushing the same plate the same direction. */""",
    """   solid `--card` AND drops the blur to 30% of its rung — the firmer plate is the
   whole move, because the plate is `--card` at α and the level IS that α. The
   separate tint-darken this bracket used to add was a second writer pushing the
   same plate the same direction. */""")
# (vii) glass-fx.css:1: the patch cut "the adaptive tint-source + backdrop-luma bucket" to "the tint source", and the
# file declares no tint source on floor v7; the one chromatic source it holds is the capsule warm floor (:106-114).
sub("src/styles/tokens/glass-fx.css",
    """grain/specular/edge-light, the tint source, the decorative""",
    """grain/specular/edge-light, the capsule warm floor, the decorative""")
print("R-21 (b) written: feedback-tone.css, a11y-fallback.css, glass-fx.css")
