# A-glass-tokens — Glass-level as a clean variant/token axis (AUDIT, at source)

**Lane** AUDIT · **Severity** major · **Defect** G1 (USER-DEFECTS pass-2 §G: "Glass should be FIRST-CLASS … Why is the DEFAULT not glass?" → "abrogate the opaque default OR mint a tunable glass-LEVEL variant (incl. an explicit `opaque`/solid variant)") · **HEAD** 5cf2980 (3.8.0+W52)

**Verdict:** net-new-wave (glass-first-class / `--glass-level` + `opaque` rung) — coordinate with W52 (docs arm) + W36 (opaque a11y path). Cross-ref the sibling SOTA file `R-glass-default.md` (same conclusion, SOTA side); this file is the SOURCE-LEVEL design of the token seam.

---

## TL;DR — the level axis is 80% built; it needs ONE scalar + ONE named opaque rung

glass-ui already encodes the **glass LEVEL** as five named opacity rungs (`--glass-opacity-{wash…overlay}` = 0.30→0.95, `tokens.css:658-662`). What it is MISSING — and what the user's G1 actually asks for — is:

1. a **single `--glass-level` multiplier** that retunes the whole ladder from one consumer override (the SOTA single-knob), and
2. a **first-class `opaque` rung/variant** — a NAMED, consumer-reachable solid escape (Apple's `.identity`), routed through the SAME machinery the `prefers-reduced-transparency`/W36 opaque paths already use.

Both are tokens.css + glass.css + Card.vue slices, token-first, small, with a clean break (no aliases). The naive reading of G1 ("make every surface glass") is WRONG per Apple-SOTA and glass-ui's own `no-glass-on-glass` discipline; the right reading is **discoverability + a level knob + an opaque escape**.

---

## SOURCE audit 1 — the level axis already exists, consumed cleanly through ONE seam

The opacity ladder is consumed in exactly ONE place — the composed-background recipe in `tokens.css:746-752`:

```css
--glass-bg-wash:     color-mix(in srgb, var(--card) calc(var(--glass-opacity-wash)     * 100%), transparent);
--glass-bg-quiet:    color-mix(in srgb, var(--card) calc(var(--glass-opacity-quiet)    * 100%), transparent);
--glass-bg-resting:  color-mix(in srgb, var(--card) calc(var(--glass-opacity-resting)  * 100%), transparent);
--glass-bg-floating: color-mix(in srgb, var(--card) calc(var(--glass-opacity-floating) * 100%), transparent);
--glass-bg-overlay:  color-mix(in srgb, var(--card) calc(var(--glass-opacity-overlay)  * 100%), transparent);
```

`grep -rn "glass-opacity-" src/` confirms NO `.css`/`.vue`/`.ts` consumes `--glass-opacity-*` directly outside `tokens.css` — the only external touches are the two glass.css media brackets that OVERRIDE the ladder (`glass.css:734-738` reduced-transparency → 1; `:753-757` prefers-contrast → 0.85-1). **This is the architecturally clean seam:** the rung opacity is a single scalar token feeding ONE recipe, with a proven override path. A `--glass-level` multiplier folds in at exactly this `calc()` site with zero new fan-out.

The blur ladder is the parallel seam — five `--glass-blur-{tier}-radius` scalars (`tokens.css:669-680`) feeding `--glass-blur-{tier}` (`:688-705`). Already factored radius-first (AV.W7 split the radius out specifically so it could be retuned), so the same `--glass-level` multiplier threads the blur radii too — opacity + blur in lockstep, exactly the SOTA single-knob (R-glass-default §SOTA-2: Light 8-12px / Medium 16-20px / Heavy 24-32px are ONE intensity axis).

**Verdict:** the level axis is a token reality already; it just has no single multiplier and no opaque endpoint. The seam is sound — the work is additive, not a rebuild.

## SOURCE audit 2 — there is NO first-class opaque rung; the opaque path is a11y-only

`CardTier` (`Card.vue:18`) is `"wash" | "quiet" | "resting" | "floating" | "overlay"` — five glass rungs, NO opaque member. The ONLY routes to a solid surface today are:

- `prefers-reduced-transparency: reduce` → `glass.css:732-748` maps every `--glass-opacity-*` → 1 + `--glass-blur-* : none` + drops rim/grain. The OPAQUE recipe exists and is correct.
- `forced-colors: active` → W36 (planned) ships the full opaque structure-survival skin.
- `@supports not (backdrop-filter)` → `glass.css:762-783` falls back to `color-mix(… card …)` per rung.

So a SOLID surface is reachable ONLY when the USER's a11y setting forces it — never when the DESIGN wants it (a dense data table, a form over a busy aurora). This is the gap G1's "explicit `opaque`/solid variant" names. Apple ships `.identity` (conditional disable → opaque) as a deliberate design choice, and SOTA web kits (shadcn-glass-ui, glasscn-ui) ship a non-glass variant ALONGSIDE the glass ones. glass-ui has the opaque RECIPE (the reduced-transparency bracket) but no consumer-reachable VARIANT that selects it.

## SOURCE audit 3 — the navigation/overlay band is ALREADY glass-first-class

Source-verified the functional-layer surfaces:
- `DialogContent.vue:85` → `glass-floating` (or `glass-overlay` per modal arm)
- `PopoverContent.vue:45,60` → `glass-floating`
- `DropdownMenuContent.vue:37` → `glass-floating`
- `TooltipContent.vue:27` → `glass-floating`
- HoverCard / ContextMenu / Combobox / Toast / Notification → `glass-*` (grep-confirmed)
- `.glass-dock` shell → its own `--glass-*-dock` family (hand-rolled, dock arm owns)

**So the nav/overlay band's DEFAULT IS glass — already.** G1's "why is the DEFAULT not glass" is ANSWERED for the functional layer. It is true ONLY for the CONTENT layer (`<Card tier="resting">` is a translucent-card default, but a page substrate / data surface is opaque) — where it SHOULD be opaque per `no-glass-on-glass` (glass.css:1-28). The audit finding: **do NOT add glass to the content layer** (it would re-break the legibility W52 just fixed + violate the rung-band discipline). The real gap is (a) this default is undocumented as deliberate canon, (b) no level knob, (c) no opaque escape.

---

## The GESTALT design — the `--glass-level` + `opaque` seam (token-first, clean break)

### (1) `--glass-level` — the single intensity multiplier

Mint ONE `@property`-registered scalar (default `1`) at the head of the glass token block. Thread it through BOTH ladders at their single consumption sites:

```css
@property --glass-level { syntax: "<number>"; inherits: true; initial-value: 1; }

:root {
    --glass-level: 1; /* the master glassiness knob — 0 = solid, 1 = canonical, >1 = clearer */

    /* opacity: a HIGHER level = MORE translucent = LESS card-mix. Invert the
       multiplier so level→0 drives the mix→100% (solid) and level→1 keeps the
       rung's authored α. clamp keeps it in [authored, 1]. */
    --glass-bg-wash: color-mix(in srgb,
        var(--card) clamp(0%, calc((1 - (1 - var(--glass-opacity-wash)) * var(--glass-level)) * 100%), 100%),
        transparent);
    /* …quiet/resting/floating/overlay identically… */

    /* blur: the radius scales with level so opacity + diffusion move in lockstep. */
    --glass-blur-resting: blur(calc(var(--glass-blur-resting-radius) * var(--glass-level))) saturate(1.05);
    /* …etc… */
}
```

At `--glass-level: 1` the mix is byte-identical to today (`1 - (1-α)*1 = α`); at `0` every rung resolves to `--card` solid + `blur(0)` — the SAME opaque endpoint the reduced-transparency bracket already produces, now reachable by DESIGN. A consumer dials whole-system glassiness from one line: `:root { --glass-level: 1.3; }` (clearer) or `0.5` (more solid). This is Apple's `.regular`/`.clear` continuum as a scalar and the web SOTA single-knob (R-glass-default §SOTA-2), authored at the seam that already exists.

**Clean-break note:** the reduced-transparency + prefers-contrast brackets should be REWRITTEN to set `--glass-level` (→0 and →~0.2 respectively) instead of clobbering each `--glass-opacity-*` rung individually (glass.css:734-757). ONE override line replaces ten — and the brackets then ride the same single path the design knob does (no duplicate opaque recipe). This is the gestalt collapse, not a patch.

### (2) the `opaque` first-class rung — a named escape

Extend the tier vocabulary with `opaque` as a SIXTH named rung that is `--glass-level: 0` scoped to the surface (not a separate recipe):

- **Token:** `.glass-opaque { --glass-level: 0; }` in glass.css's material group — it reuses the SAME `--glass-bg-*`/`--glass-blur-*` recipe, resolving to solid `--card` + no blur + (optionally) drop the rim/grain like the a11y bracket does. ONE rule, zero duplicate recipe.
- **Card.vue:** widen `CardTier` → `"wash" | "quiet" | "resting" | "floating" | "overlay" | "opaque"` and the template's `glass-${tier}` already emits `glass-opaque` — no template change beyond the type + a glass.css rule. (Alternatively keep tier as the 5 glass rungs and add `surface="opaque"` to the `CardSurface` axis — a DESIGN CALL; see needs-user-decision below. The tier-rung route is simpler — one axis, one `glass-${x}` emit.)
- **Overfitting bar:** ≥2 consumers — the content-band Card (data table) + a form-over-aurora surface + the reduced-transparency path that already needs the opaque endpoint = cleared.

### (3) the two-layer-law canon doc

Record in CLAUDE.md (fold into W52's existing CLAUDE.md arm — it already edits it for the gold-CTA + easing doctrine): "glass is the DELIBERATE DEFAULT of the navigation + overlay bands (dock, popover, dropdown, dialog, sheet, tooltip all ship `glass-floating`/`glass-overlay`); the content band defaults to flat/opaque tiers BY DESIGN (`no-glass-on-glass`). G1's 'why not glass' is answered for the functional layer and deliberately declined for the content layer. `--glass-level` is the master glassiness knob (0=solid…1=canonical…>1=clearer); `tier="opaque"`/`.glass-opaque` is the named solid escape (Apple's `.identity`)."

---

## DEDUP — net-new-wave, coordinating W52 + W36

| Wave | Owns | Relation to G1 |
|---|---|---|
| **W52** (liquid-glass material overhaul) | the specular geometry/blend/saturate + hover/easing + gold-CTA + the CLAUDE.md doctrine arm | the SUBSTRATE G1 rides — but W52's scope is the moving-specular MATERIAL, NOT the level-variant axis or the opaque escape. AUGMENT W52's docs arm with the two-layer-law canon; the `--glass-level`/`opaque` tokens are OUT of W52. |
| **W36** (forced-colors glass skin) | the `forced-colors: active` opaque structure-survival skin | the opaque ESCAPE's a11y half. G1's `opaque` rung routes through the SAME machinery; COORDINATE — the new `--glass-level:0` path should subsume the reduced-transparency bracket's per-rung clobber, and W36 reads it. Do NOT duplicate. |
| existing dock/aurora/blob waves | — | irrelevant; they hand-roll their own glass families. |

No existing wave mints `--glass-level` or the `opaque` rung. The pass-2 ledger (§G G1) explicitly routes G1 → "NET-NEW glass-first-class" and the orchestrator meta-audit (`A-tranche-wave-audit.md` §4) lists "**glass-first-class** (G1)" as a NET-NEW the audit proves un-owned. PROGRESS.md has no W53+ / glass-first-class wave at HEAD. → **net-new wave** (G-band), scoped to: (1) `--glass-level` scalar + the two-ladder rewrite + the bracket collapse; (2) the `opaque` first-class rung; (3) the two-layer canon doc (folded into W52's CLAUDE.md arm). Small, token-first, clean-break.

**Sequencing:** AFTER W52 (the material must be stable before the level axis multiplies its blur/opacity); coordinate the bracket-collapse with W36 (forced-colors) so there is ONE opaque path. The squircle wave (G3) is orthogonal (radius axis, not level).

## needs-user-decision (the RATIFY hinge — fold into the implement lane)

1. **Content-layer glass.** G1's framing ("why is the DEFAULT not glass") implies content surfaces should be glass too. SOTA + `no-glass-on-glass` say NO. **Recorded default if un-ratified:** do NOT glass the content layer; deliver the level knob + opaque variant + canon doc. (Same hinge R-glass-default §needs-user-decision flags.)
2. **Opaque axis placement** — `tier="opaque"` (a sixth tier rung, simplest — one `glass-${x}` emit) VS `surface="opaque"` (a third `CardSurface` register, orthogonal to tier). The tier-rung route is the cleaner single-axis design; surface-register is more orthogonally honest (opaque is not "more glass," it is "no glass"). Implement lane picks one — recorded default: **tier rung** (`opaque` is the level-0 endpoint of the SAME axis, so it belongs on the tier ladder).

---

## Sources (internal source-audit)

- `src/styles/tokens.css:658-662` (opacity ladder), `:669-705` (blur radius + composed blur ladder), `:746-752` (the single `--glass-bg-*` consumption site).
- `src/styles/glass.css:1-28` (no-glass-on-glass band discipline), `:732-748` (reduced-transparency opaque bracket), `:751-759` (prefers-contrast bracket), `:762-783` (no-backdrop-filter fallback).
- `src/components/ui/card/Card.vue:18` (CardTier), `:28` (CardSurface), `:44` (CardSpecular), `:136` (`glass-${tier}` emit).
- `DialogContent.vue:85` / `PopoverContent.vue:45` / `DropdownMenuContent.vue:37` / `TooltipContent.vue:27` (nav/overlay band already glass-floating).
- `docs/tranches/AX/audit/convergence2/R-glass-default.md` (the SOTA-side sibling — Apple `.regular`/`.clear`/`.identity`, the single-knob, the opaque-escape promotion).
- `docs/tranches/AX/audit/convergence2/A-tranche-wave-audit.md` §4 (glass-first-class = NET-NEW, un-owned).
- `docs/tranches/AX/waves/AX.W52-liquid-glass-material-overhaul.md` (substrate scope — does NOT own the level axis), `AX.W36-forced-colors-glass-language-skin.md` (opaque a11y path).
