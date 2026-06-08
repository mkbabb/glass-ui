# A-glass-over-light — adaptive glass legibility over light backdrops (AUDIT, at source)

**Lane** AUDIT · **Severity** major · **Defect** G2 (USER-DEFECTS pass-2 §G: "Glass dock over
VERY LIGHT materials is unreadable — dynamically darken the glass adaptively. SOTA as of iOS 27?")
· **HEAD** 5cf2980 (3.8.0+W52) · **Cross-ref** `R-ios27-adaptive-glass.md` (the SOTA side — already
extracts the iOS-26/27 recipe + verdicts net-new), W36 (forced-colors — DISJOINT), W52 (blend fix —
adjacent, not the owner).

**Verdict:** net-new-wave (`adaptive-glass-legibility` — the G2 owner). This file is the SOURCE-LEVEL
audit: it confirms `R-ios27-adaptive-glass`'s conclusion at file:line AND surfaces ONE finding the
SOTA lane missed — **the dock surface does NOT thread the existing `--glass-tint-*` seam, so the
adaptive hook must reach `dock.css` directly, not only the five `.glass-*` rungs.**

---

## TL;DR — the seam is 70% built but the dock (the actual G2 surface) is OFF it

The adaptive-tint plumbing the SOTA lane points at (`--glass-tint-source` / `--glass-tint-strength`
+ the `color-mix(in oklab …)` composite) already exists and is consumed by the five `.glass-*`
rungs. But three source facts make G2 worse than the SOTA lane states:

1. **The DOCK background bypasses the tint seam entirely.** `dock.css:136` is a flat
   `background: var(--glass-bg-dock, var(--glass-bg-resting))` — NO `color-mix(in oklab, …,
   var(--glass-tint-source) var(--glass-tint-strength))` wrapper. The five `.glass-*` rungs
   (`glass.css:220,240,251,267,278`) DO compose it; the dock, chassis (`dock.css:575`), and the
   morphing-root chrome (`dock.css:419`) do NOT. So even after an adaptive axis lifts
   `--glass-tint-strength`, the dock — the literal G2 unreadable surface — would not darken. The
   adaptive hook MUST reach `dock.css`, not just `glass.css`.
2. **The default tint is a zero-delta no-op AND there is no backdrop probe.** `tokens.css:815-816`
   mints `--glass-tint-source: var(--card)` + `--glass-tint-strength: 0%`. Default = byte-identical
   to today; the surface stays warm-cream translucent over white. Nothing reads the backdrop and
   raises the strength — it is consumer-PUSH, not backdrop-ADAPTIVE. That is the G2 gap exactly.
3. **The shipped blend can only LIGHTEN.** `glass.css:142` (W52) composites the specular gleam with
   `mix-blend-mode: plus-lighter` — HDR-clamped, no over-white blowout (the W52 fix), but still a
   LIGHTENER. After W52 the surface is correctly NOT-washed, but it still cannot DARKEN to re-open
   contrast over bright content. W52 fixed the wrong-direction defect; it did not add a
   right-direction (darken-over-light) path.

The fix is small, token-first, clean-break: a `--glass-backdrop` bucket probe consumed via the
SHIPPED `@container style()` mechanism (`utilities.css:537,543` is the live precedent), threading
the EXISTING `--glass-tint-*` seam — but the seam must first be extended to the dock + chassis +
morph-chrome so the adaptive darken reaches the surfaces G2 actually names.

---

## SOURCE audit 1 — the adaptive-tint seam exists but is NOT universal (the dock gap)

The `color-mix(in oklab, <rung bg>, var(--glass-tint-source) var(--glass-tint-strength))` composite
is the right hook. It is applied at exactly these sites:

| Surface | File:line | Threads `--glass-tint-*`? |
|---|---|---|
| `.glass-wash` | glass.css:220 | YES |
| `.glass-quiet` | glass.css:240 | YES |
| `.glass-resting` | glass.css:251 | YES |
| `.glass-floating` | glass.css:267 | YES |
| `.glass-overlay` | glass.css:278 | YES |
| `.glass-material` | glass.css:380 | YES |
| **`.glass-dock` shell** | **dock.css:136** | **NO — flat `var(--glass-bg-dock)`** |
| **dock morph-root chrome** | **dock.css:419** | **NO — `color-mix(in srgb, …)` morph interp, no tint** |
| **dock expanded/floating tiers** | **dock.css:495,633,651,664** | **NO — flat `var(--glass-bg-*)`** |
| **`.instrument-chassis`** | **dock.css:575** | **NO — flat `var(--glass-bg-chassis)`** |

The dock composes its OWN `--glass-bg-dock` (a flat `color-mix(in srgb, var(--card) calc(0.42 *
100%), transparent)` at `tokens.css:751`) and applies it WITHOUT the oklab tint wrapper. This is the
root of G2: the surface the user reports unreadable is the ONE glass family that never reads the
adaptive seam. An adaptive wave that only touches `glass.css`'s five rungs would close the demo
cards but leave the DOCK — the headline defect — untouched.

**Gestalt fix:** thread the same `color-mix(in oklab, <bg>, var(--glass-tint-source)
var(--glass-tint-strength))` wrapper onto the dock shell bg (`dock.css:136`), the chassis
(`dock.css:575`), and the floating/expanded tiers, so ALL glass families read ONE adaptive seam.
The morph-root interp (`dock.css:419`) is trickier — it interpolates bg across the morph and must
stay `color-mix(in srgb …)` for the transition; the adaptive darken layers there as a SECOND
composite or rides the resting endpoint only (a design call for the implement lane).

## SOURCE audit 2 — `--dock-fg-on-aurora` is the HALF-built foreground twin (push, not adaptive)

`tokens.css:725-734` already mints `--dock-fg-on-aurora: var(--foreground)` — "the dock control's
foreground base … a consumer overrides it per-backdrop (e.g. a near-white over a dark aurora)." This
is the FOREGROUND half of the adaptive story, and it has the SAME defect as the tint: it is
consumer-PUSH (the consumer must know the backdrop and set the token), never backdrop-adaptive. The
SOTA recipe (`R-ios27-adaptive-glass` §CSS-translation-2) pairs the backdrop probe with native
`contrast-color()` to flip this foreground ink automatically. So the adaptive wave should reconcile
`--dock-fg-on-aurora` INTO the probe (the bright bucket re-points it toward ink; `contrast-color()`
as the `@supports`-gated native flip) — NOT add a third foreground-contrast fork.

## SOURCE audit 3 — the `@container style()` probe mechanism is shipped + proven

`utilities.css:516-543` drives the density cascade off `@container style(--density: spacious)` /
`@container style(--density: comfortable)` — the live, shipped precedent for a token-bucket cascade.
The adaptive-tint axis reuses it verbatim: a host (or a tiny opt-in `ResizeObserver`-free observer)
declares `--glass-backdrop: light` on any ancestor, and `@container style(--glass-backdrop: light)`
blocks on the rung + dock selectors lift `--glass-tint-strength` toward a bounded AA-clearing floor
and re-point `--glass-tint-source` toward warm-ink. This is the token-first, JS-free, Apple
region-darkening analog with ZERO new compositing seam — it only changes the values the EXISTING
`color-mix(in oklab …)` reads.

**Caveat (a source-level correctness note the implement lane must heed):** `@container style()`
queries a CUSTOM PROPERTY, and the standard cannot query arbitrary backdrop pixels — there is no web
API that reads what is painted behind a `backdrop-filter` element. So the probe is a DECLARATIVE
BUCKET the consumer sets ("I know this dock sits over a bright surface"), not an automatic sampler.
For an automatic path, a JS luminance probe (sample the backdrop element's computed bg or a
1×1 canvas readback of a known sibling) sets `--glass-backdrop-luma` numerically — but that is a
heavier, opt-in observer, NOT the default. The default ships the declarative bucket; the JS probe is
an optional enhancement (overfitting-bar: it needs ≥2 consumers — dock + a form-over-aurora — before
it ships, OR stays demo-private).

## SOURCE audit 4 — the a11y brackets are the Clear↔Tinted escape, but they CLOBBER per-rung

`glass.css:732-748` (`prefers-reduced-transparency: reduce`) and `:751-758` (`prefers-contrast:
more`) are the user-escape analogs to Apple's Clear↔Tinted axis (iOS-26.2; see
`R-ios27-adaptive-glass` §trajectory). They WORK, but they clobber each `--glass-opacity-*` rung
individually (5-10 lines each). The adaptive wave should reconcile a `--glass-clarity` axis so these
brackets ride the SAME single path the design knob does (this overlaps the `A-glass-tokens` G1
`--glass-level` finding — the two should share ONE master-glassiness scalar, not mint two). Note the
brackets touch OPACITY (more opaque), which is a DIFFERENT axis from the adaptive TINT (darken the
mix). Both raise legibility; the wave keeps them distinct but coordinated — opacity-up for the a11y
user-escape, tint-toward-ink for the automatic backdrop-bright case.

---

## The GESTALT design (the adaptive hook, token-first, clean break)

1. **`--glass-backdrop` bucket + numeric `--glass-backdrop-luma` companion** at the head of the glass
   token block (`tokens.css` near `:804`). Default `--glass-backdrop: dark` (or unset) = today's
   zero-delta.
2. **`@container style(--glass-backdrop: light)` blocks** (the `utilities.css:537` precedent) on the
   five `.glass-*` rungs AND the dock/chassis surfaces, lifting `--glass-tint-strength` to a bounded
   AA-clearing floor (≤18-24% — `R-ios27-adaptive-glass` §CSS-3) and re-pointing
   `--glass-tint-source` to a low-luminance warm-ink (`var(--foreground)` family). ZERO new
   compositing seam — reuses the shipped `color-mix(in oklab …)`. Stay in oklab (mwg-preferred, the
   house tint space — `tokens.css:807`).
3. **Thread the tint wrapper onto the dock** (`dock.css:136`, `:575`, the floating tiers) so the
   adaptive darken reaches the G2 surface (this audit's headline gap — the SOTA lane assumed the
   seam was universal; it is NOT).
4. **Reconcile `--dock-fg-on-aurora`** into the probe + `contrast-color()` (`@supports`-gated,
   Chrome 147+/Safari 26+) for the native foreground-ink flip — one path, not a third fork.
5. **`proof:adaptive-glass`** (W00 π harness): assert the dock + rung foreground clears 4.5:1 over a
   synthetic white backdrop with `--glass-backdrop: light` active. RED-witness: remove the bucket
   block → contrast drops below 4.5:1.

---

## DEDUP — net-new-wave, NOT W36, composes-on W52, coordinates A-glass-tokens

| Wave | Relation to G2 |
|---|---|
| **W36** (forced-colors glass skin) | **DISJOINT.** `@media (forced-colors: active)` Windows-High-Contrast palette override (CanvasText borders, Highlight focus) — a BINARY palette-substitution axis, NOT a continuous luminance-probe over a light *content* backdrop. The W36 plan scopes to forced-colors and its `.dark` arm is "IRRELEVANT under WHC". Folding adaptive-tint into W36 would mis-scope it. **Confirmed disjoint** (matches `R-ios27-adaptive-glass` §DEDUP). |
| **W52** (liquid-glass material overhaul) | **PREREQUISITE substrate, NOT the owner.** W52 fixed `screen`→`plus-lighter` (`glass.css:142`), tamed the saturate (`tokens.css:698-703`), bounded the gleam. It is a LIGHTENER fix — necessary, but it adds NO backdrop probe and NO darken-over-light path. The adaptive wave composes ON W52's corrected blend + the `--glass-tint-*` seam. **dependsOn W52; sequence AFTER.** |
| **A-glass-tokens / glass-first-class (G1)** | **COORDINATE — shared master scalar.** G1 mints `--glass-level` (master glassiness 0=solid…1=canonical) + an `opaque` rung; G2's a11y-bracket reconciliation (`--glass-clarity`) should fold onto G1's `--glass-level` so there is ONE intensity scalar, not two. The TINT axis (G2) and the OPACITY/LEVEL axis (G1) stay distinct but share the bracket-collapse. |
| **R-ios27-adaptive-glass** | the SOTA-side sibling — already extracted the iOS recipe (luminance switch, local darken, 4.5:1 clamp, colored-glass luminance map) + the CSS translation (`@container style()` probe + `contrast-color()` + `color-mix(in oklab)`) + verdicted net-new. This AUDIT confirms it at source AND adds the dock-gap finding. |

**No existing wave adds a backdrop-luminance-aware adaptive darken.** PROGRESS.md has no
adaptive-glass wave at HEAD; the pass-2 ledger §G G2 routes it explicitly to "NET-NEW — adaptive
glass legibility (the iOS-26/27 dynamic-contrast / backdrop-luminance-aware darkening)." →
**net-new wave** (G-band), scoped to: (1) `--glass-backdrop`/`--glass-backdrop-luma` probe via the
shipped `@container style()`; (2) the bright-bucket tint lift on ALL glass families INCLUDING the
dock/chassis (the source-audit gap); (3) `--dock-fg-on-aurora` + `contrast-color()` reconciliation;
(4) `--glass-clarity` coordinated with G1's `--glass-level`; (5) `proof:adaptive-glass`.
**dependsOn W52 + W00; sequence after W52; coordinate G1 (A-glass-tokens) for the shared scalar.**

**dedupeNote:** the prompt's "Cross-ref R-ios27-adaptive-glass, W36, G2" resolves: R-ios27 is the
SOTA twin (same net-new verdict — no duplication, this file is the SOURCE half); W36 is the WRONG
anchor (forced-colors, disjoint — DO NOT fold); the true home is a NET-NEW G-band wave
(`adaptive-glass-legibility`) that this audit and R-ios27 jointly specify. The SINGLE new source
finding beyond R-ios27: the dock/chassis/morph-chrome surfaces are OFF the `--glass-tint-*` seam
(`dock.css:136,419,575,495,633,651,664`), so the adaptive hook must reach `dock.css`, not only
`glass.css`'s five rungs — otherwise the exact G2 surface stays unreadable.

---

## Sources (internal source-audit)

- `src/styles/tokens.css:658-662` (opacity ladder), `:746-752` (composed `--glass-bg-*` incl. dock/chassis), `:804-816` (the `--glass-tint-source`/`--glass-tint-strength` adaptive-tint seam, default zero-delta), `:725-734` (`--dock-fg-on-aurora` foreground-push twin), `:1762-1774` (the dark-arm tint).
- `src/styles/glass.css:142` (W52 `plus-lighter` blend — lightener-only), `:220,240,251,267,278,380` (the rungs that DO thread the oklab tint), `:732-748` (`prefers-reduced-transparency` opaque bracket), `:751-758` (`prefers-contrast: more`).
- `src/styles/dock.css:136` (the dock shell bg — flat, NO tint seam — the G2 gap), `:419` (morph-root interp), `:495,575,633,651,664` (chassis + floating/expanded tiers, all OFF the tint seam).
- `src/styles/utilities.css:516-543` (the shipped `@container style(--density)` probe precedent).
- `docs/tranches/AX/audit/convergence2/R-ios27-adaptive-glass.md` (the SOTA-side sibling — iOS recipe + CSS translation + net-new verdict).
- `docs/tranches/AX/audit/convergence2/A-glass-tokens.md` (G1 `--glass-level` — the shared-scalar coordinate).
- `docs/tranches/AX/waves/AX.W36-forced-colors-glass-language-skin.md` (disjoint), `AX.W52-liquid-glass-material-overhaul.md` (prerequisite substrate).
