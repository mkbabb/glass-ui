# R-glass-default — Glass-as-default + tunable glass-LEVEL variant (SOTA research)

**Lane** SOTA-RESEARCH · **Severity** research · **Consumed by** G1 (glass-first-class NET-NEW) / W52 (liquid-glass substrate) · **HEAD** 5cf2980 (3.8.0+W52)

---

## TL;DR — the SOTA answer to G1, and the trap it closes

The user's G1 reads "Glass should be FIRST-CLASS … Why is the DEFAULT not glass?" The naive transposition — *make every surface glass* — is **wrong per Apple-SOTA and per glass-ui's own discipline**, and would re-break exactly the legibility the W52 pass just fixed. The SOTA pattern (Apple iOS-26 Liquid Glass, WWDC25 §219; the SwiftUI `glassEffect` API; the shadcn-glass extensions) is a **two-layer + two-axis** model that glass-ui ALREADY 80% encodes:

1. **Glass is the default of the NAVIGATION/FUNCTIONAL layer, never the CONTENT layer.** Apple HIG is explicit: *"Don't use Liquid Glass in the content layer … glass is best reserved for the navigation layer that floats above the content."* glass-ui's `no-glass-on-glass` discipline (glass.css:1-28) already says this verbatim. So G1's "why is the default not glass" is **answered, not unanswered**, for the right surfaces — the dock, popovers, dropdowns, dialog, sheet ALL already default to glass (`glass-floating`/`glass-overlay`). The gap is (a) it is not DISCOVERABLE/documented as the deliberate default and (b) a few navigation-band surfaces that COULD be glass still default to opaque tiers.

2. **The variant axis is `translucency-level`, not glass-vs-not.** Apple ships `.regular` (default, adaptive, medium translucency) and `.clear` (high transparency, media-rich backdrops, needs a dimming layer), plus `.identity` (conditional disable → opaque). The web SOTA mirrors this with a `--glass-level` single-knob + an explicit `opaque`/`solid` escape variant. glass-ui's five-rung opacity ladder (`--glass-opacity-{wash…overlay}` = 0.30→0.95) IS this level axis — it just lacks (a) a `0`/opaque rung as a first-class named escape and (b) a single `--glass-level` multiplier that retunes the whole ladder from one override.

3. **The opaque escape already exists for a11y — promote it to a first-class design choice.** glass-ui ALREADY drops to opaque under `prefers-reduced-transparency: reduce` (glass.css:732, tokens.css:684) and under `forced-colors: active` (W36). The SOTA move is to make "solid/opaque" a NAMED, consumer-reachable variant (not only an a11y fallback), so a surface that needs solidity (a data table, a form over a busy aurora) opts out cleanly.

**Net:** G1 is NOT "add glass everywhere." It is (i) DOCUMENT glass-as-the-navigation-default as deliberate canon, (ii) audit the navigation/overlay band for surfaces that default opaque but should default glass, (iii) mint a `--glass-level` single-knob + a first-class `opaque` escape variant on the tier ladder. This is an AUGMENT to W52 (the material substrate already landed the look) plus a small NET-NEW docs/variant addition — NOT a 32-agent glass-everywhere rebuild.

---

## SOTA finding 1 — Apple Liquid Glass: the two-LAYER law (the real answer to "why not glass everywhere")

**Source — Apple HIG "Materials" + WWDC25 §219 "Meet Liquid Glass" + the conorluddy reference (the canonical AI-pointable doc):**

- Every iOS-26 interface has **two layers**: the **content layer** (the document/list/photo/media the user consumes → standard OPAQUE materials) and the **functional/navigation layer** (controls, tab bars, sidebars, toolbars, transient overlays → Liquid Glass).
- Direct HIG quote: *"Don't use Liquid Glass in the content layer. … including it in the content layer can result in unnecessary complexity and a confusing visual hierarchy."*
- *"Avoid putting glass within or on top of other glass"* — the glass-on-glass prohibition.

**This is glass-ui's existing `no-glass-on-glass` rung-band discipline, 1:1** (glass.css header, AV.W15 D5): content band → NOT glass; navigation band (`--z-controls`…`--z-dock`) → glass; overlay band (`--z-overlay`…`--z-modal`) → glass. **So the architecture is already SOTA-correct.** G1's "the default isn't glass" is true ONLY for the content layer — where it SHOULD be opaque. The implement lane must NOT regress this; the fix is discoverability + a few navigation surfaces, not the content layer.

**Recipe to consume (G1/docs):** record the two-layer law as canon in CLAUDE.md — "glass is the DEFAULT of the navigation + overlay bands (dock, popover, dropdown, dialog, sheet, tooltip all ship `glass-floating`/`glass-overlay`); the content band defaults to flat opaque tiers BY DESIGN (no-glass-on-glass). G1's 'why not glass' is answered for the functional layer and deliberately declined for the content layer."

---

## SOTA finding 2 — the variant axis: `.regular` / `.clear` / opaque-`.identity` (the level knob)

**Source — SwiftUI `glassEffect` API (conorluddy reference, medium/@madebyluddy, levelup.gitconnected):**

| Apple variant | Meaning | glass-ui analogue |
|---|---|---|
| `.regular` (DEFAULT) | medium translucency, fully adaptive, works in almost all contexts | the `resting`/`floating` rungs — the canonical default |
| `.clear` | HIGH transparency, ONLY over media-rich/bold/bright content, REQUIRES a dimming layer for legibility | the `wash` rung (~0.30α) — lightest |
| `.identity` | conditional DISABLE — no effect, falls back to opaque | the `prefers-reduced-transparency`/`forced-colors` opaque path; should become a NAMED `opaque` variant |

Default is `.regular` + `.capsule` shape. `.clear`'s three gate conditions (over media-rich content; content layer tolerates a dimming layer; the content above is bold+bright) map directly to glass-ui's `data-over-content` legibility seam (glass.css:300-318) — that seam is the glass-ui mechanism for the `.clear`-needs-dimming rule.

**The single-knob pattern (web SOTA — Glassmorphism 2.0, the typeui glassmorphism skill, weblogtrips 2026):** the modern web idiom is a **single `--glass-level`/intensity variable** that scales the whole glass effect (opacity + blur in lockstep) across every component from one override, with named tiers Light(8-12px blur)/Medium(16-20px)/Heavy(24-32px). glass-ui has the per-rung tokens but NO single multiplier that retunes the whole ladder.

**Recipe to consume (G1/W52-adjacent — token-first):**
- Mint `--glass-level` as ONE `@property`-registered scalar (default 1) that the `--glass-opacity-*` ladder + the `--glass-blur-*` radii multiply through (`calc(var(--glass-opacity-resting) * var(--glass-level))` clamped) — so a consumer dials the whole system's glassiness from one override, exactly the SOTA single-knob. This is the `--glass-level token` the lane scope names.
- Add a first-class **`opaque` escape** to the tier vocabulary: a named rung (`--glass-opacity` → effectively 1.0, `backdrop-filter: none`) that a `<Card tier="opaque">`/a `.glass-opaque` class selects WITHOUT waiting for an a11y media-query. This is Apple's `.identity` made a deliberate design choice, not only a fallback. Overfitting bar: ≥2 consumers — the content-band Card + any form-over-aurora surface + the reduced-transparency path that already needs it = cleared.

---

## SOTA finding 3 — the opaque escape is HALF-built; promote it

glass-ui ALREADY drops to opaque under two a11y conditions — this is the escape mechanism, it just isn't a design-reachable VARIANT:

- `@media (prefers-reduced-transparency: reduce)` → glass.css:732 + tokens.css:684/694 map the opacity ladder to its opaque ceiling and drop the rim/grain. (SOTA-correct per the typeui skill + Glassmorphism 2.0 mandate: *"Always respect prefers-reduced-transparency; fallback to a solid, high-contrast background."*)
- `@media (forced-colors: active)` → W36 ships the full Windows-High-Contrast opaque structure-survival skin.

**Gap:** there is no `surface="opaque"` / `tier="opaque"` / `.glass-opaque` a CONSUMER can pick when the design (not the user's a11y setting) wants solidity — e.g. a dense data table whose glass over a busy backdrop fails contrast. SOTA libraries (shadcn-glass-ui, glasscn-ui) ship an explicit non-glass variant alongside the glass variants for exactly this. The clean break: extend `CardTier`/the glass-class vocabulary with `opaque`, route it through the SAME `--glass-level=0` machinery the a11y brackets already use (one path, no duplicate opaque recipe).

---

## SOTA finding 4 — adaptive legibility is the SEPARATE lane (G2, not G1)

Apple's `.regular` *"continuously adapts to background content"* — shadows deepen over text, lighten over white; text gets a vibrant treatment. That ADAPTIVE-darkening behaviour is the user's **G2** ask (adaptive glass legibility over very-light materials), NOT G1. glass-ui's `data-over-content="text|solid"` seam (glass.css:300-318) is the embryo of it. **Do not fold G2 into G1** — G2 is its own SOTA-research lane (the iOS-26 dynamic-contrast / backdrop-luminance-aware darkening) per the pass-2 ledger. This lane (G1) is the default + level-variant axis ONLY; the adaptive-contrast knob is G2's.

---

## DEDUP verdict — AUGMENT W52 + a small NET-NEW glass-first-class docs/variant slice

The pass-2 ledger routes G1 → "NET-NEW glass-first-class" and names "W52 (liquid-glass) → G1 substrate." Source-checked against the waves:

- **W52** (`AX.W52-liquid-glass-material-overhaul.md`) already landed the MATERIAL LOOK (the bounded edge gleam, plus-lighter, the rim, the saturate tame, the `--glass-specular-size` knob). It is the **substrate** G1 rides — but W52's scope is explicitly the moving-specular geometry/blend + hover/easing, NOT the default-surface-selection or the level-variant axis. W52 does NOT own G1's three deliverables (the two-layer canon doc, the navigation-band default audit, the `--glass-level`+`opaque` variant). → **AUGMENT W52's docs arm with the two-layer-law canon** (it already edits CLAUDE.md for the gold promotion + easing doctrine — append the glass-as-navigation-default canon there).
- **W36** (`AX.W36-forced-colors-glass-language-skin.md`) owns the `forced-colors` opaque skin — the `opaque` escape's a11y half. G1's `opaque` VARIANT routes its consumer-reachable rung through the SAME machinery; **coordinate, don't duplicate** (W36's opaque path is the implementation the variant reuses).
- The `--glass-level` single-knob + the `opaque` tier-variant are **NET-NEW** — no existing wave mints them. They are a tokens.css + Card.vue + glass.css slice (the tier ladder × a scalar + a named opaque rung), small, token-first.

**Recommended disposition:** a **NET-NEW glass-first-class wave** (call it within the G-band) scoped to exactly: (1) the two-layer-law canon doc (fold into W52's CLAUDE.md arm OR a standalone docs block); (2) a navigation/overlay-band default audit — confirm dock/popover/dropdown/dialog/sheet/tooltip ship glass (they do); flag any functional-layer surface still opaque-by-default that should be glass; (3) mint `--glass-level` (single-knob scalar, `@property`-registered) + the first-class `opaque` tier/surface variant routing through the existing reduced-transparency opaque path. NOT a 32-agent glass-everywhere rebuild — the substrate (W52) + the discipline (no-glass-on-glass) + the a11y escape (reduced-transparency/W36) already exist; G1 is the discoverability + level-knob + opaque-variant cap on top.

**needs-user-decision flag:** the user's framing ("why is the DEFAULT not glass") implies the content layer should be glass too. SOTA + glass-ui's own discipline say NO (content stays opaque). The implement lane should surface this as a RATIFY hinge — confirm with the user that "glass-first-class" means *the navigation/overlay band's deliberate, documented glass default + a tunable level + an opaque escape*, NOT glass on content surfaces (which would regress legibility + break no-glass-on-glass). The recorded default if un-ratified: do NOT put glass on the content layer; deliver the level-knob + opaque-variant + the canon doc.

---

## Sources

- [Apple HIG — Materials / Liquid Glass](https://developer.apple.com/documentation/TechnologyOverviews/liquid-glass) + [Adopting Liquid Glass](https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass)
- [Meet Liquid Glass — WWDC25 §219](https://developer.apple.com/videos/play/wwdc2025/219/)
- [conorluddy/LiquidGlassReference (the canonical AI-pointable glassEffect API doc)](https://github.com/conorluddy/LiquidGlassReference)
- [iOS 26 Liquid Glass Swift/SwiftUI Reference (madebyluddy)](https://medium.com/@madebyluddy/overview-37b3685227aa)
- [Build a Liquid Glass Design System in SwiftUI (levelup.gitconnected)](https://levelup.gitconnected.com/build-a-liquid-glass-design-system-in-swiftui-ios-26-bfa62bcba5be)
- [The UX Strategy Behind Apple's Liquid Glass (Fountain Institute)](https://www.thefountaininstitute.com/blog/ux-strategy-liquid-glass)
- [TypeUI Glassmorphism design-skill (intensity tiers + reduced-transparency fallback)](https://www.typeui.sh/design-skills/glassmorphism)
- [Glassmorphism 2.0: Modern CSS Techniques for Depth (2026)](https://weblogtrips.com/technology/glassmorphism-2-0-css-techniques-2026/)
- [shadcn-glass-ui (glass variants alongside solid)](https://www.npmjs.com/package/@yhooi2/shadcn-glass-ui) + [glasscn-ui](https://github.com/itsjavi/glasscn-ui)
- glass-ui internal: `src/styles/glass.css:1-28` (no-glass-on-glass), `:300-318` (`data-over-content` legibility seam), `:732` + `tokens.css:684` (reduced-transparency opaque path), `tokens.css:658-662` (the opacity-rung ladder), `AX.W36` (forced-colors opaque skin), `AX.W52` (material substrate).
