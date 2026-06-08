# gold-cta — ASK-GU-GOLD promotion + liquid-glass model lessons

**Lane** gold-cta-promotion (ASK-GU-GOLD) · **Severity** P1 design-praise · **Verdict**
**ALREADY-SATISFIED at the code level — close a docs/canon gap + harvest the design lessons for D19.**
**Surfaces** `src/styles/utilities.css` (`@utility btn-audacious-gold` + `@keyframes btn-gold-bg-sweep`), `src/components/ui/button/index.ts` (`gold-audacious` variant), `src/styles/tokens.css` §13 GOLD + §glass-specular + §shimmer-duration, `src/styles/animations.css` (`gold-shimmer-slide`, `sparkle-sweep`), `demo/stories/primitives/buttons.vue`, `scripts/proof-affordance-contrast.mjs`, `CLAUDE.md`.

## Headline — the ask is stale; the facility already shipped

ASK-GU-GOLD asks to "promote `btn-audacious-gold` from a **speedtest-side** `@utility` to a documented glass-ui ROOT facility (a Button/DockTabButton variant or canonical `@utility`)." That promotion **already happened.** The ask was written against an older state (the AV doc tracked 3.7.0; the routed-asks doc reconciled to 3.8.0 but did not re-verify this row against source).

Source-grounded proof, all at HEAD (3.8.0):

1. **The `@utility btn-audacious-gold` lives in glass-ui ROOT** — `src/styles/utilities.css:885-925` (the gold rest-tint + the hover gold sweep + the `--glass-specular` shadow swap), with its dedicated `@keyframes btn-gold-bg-sweep` at `:931-934`. It is NOT a speedtest-local copy.
2. **A Button variant composes it** — `src/components/ui/button/index.ts:35-36`, `variant="gold-audacious"` = `btn-audacious btn-audacious-gold text-foreground hover:text-white active:text-white …`. Public via `buttonVariants`/`ButtonVariants` on the root barrel.
3. **Speedtest CONSUMES the library utility — no local redefinition.** `grep '@utility btn-audacious-gold' ../speedtest/src` → **empty**. Speedtest's only references are *consumption* sites: `Dock.vue:302` binds `:class="{ 'btn-audacious-gold': surveyState?.canAdvance }"` on its `<DockTabButton>` and `Dock.vue:45,289` document it. The class string it applies resolves to the LIBRARY `@utility` shipped in `/styles`. This is inv-16-correct (speedtest is reader-only on glass-ui; it hand-rolls nothing).
4. **It is demo'd** — `demo/stories/primitives/buttons.vue:60-85` ("Gold audacious CTA" section, the `Next →` / `Submit` / `Disabled` triplet) with the AW.W13 contrast-canary note.
5. **It is gated** — `scripts/proof-affordance-contrast.mjs:67-82` asserts the `gold-audacious` variant's rest text is the warm-ink `text-foreground` (NOT `text-white`, which was sub-legible over the 8%-gold-on-cream rest substrate) and that light text is reserved for `hover:text-white`.
6. **Provenance** — landed at `a09b01a` ("feat(button,table): gold audacious CTA variant … speedtest-AN R0 prelude"); the rest-text contrast fix at AW.W13 (`374b98e`); the comment header is "AN.R0 D9".

So the gold "→ Next" CTA the user loves is **already a first-class, documented-in-demo, gated, root-barrel glass-ui facility** that speedtest consumes idiomatically. There is no speedtest-side `@utility` left to promote.

## The ONE residual gap — CLAUDE.md canon omits `gold-audacious`

`CLAUDE.md:319` lists the Button variants and **does not include `gold-audacious`**:

> Button variants: `default`, `primary-audacious`, `destructive`, `outline`, `secondary`, `accent`, `ghost`, `glass`, `glass-wash`, `ai`, `link`.

And `CLAUDE.md:321` documents `primary-audacious`'s composition but never mentions the gold sibling. The `utilities.css` line item (`CLAUDE.md:177`) names `btn-audacious` but not `btn-audacious-gold`. This is the only thing ASK-GU-GOLD genuinely leaves open: the facility shipped, but the canon (`CLAUDE.md`) was never updated to enumerate it. The fix is a one-line variant-list addition + a one-sentence composition note — NOT a new mechanism.

**Fix (docs-only, the authoring wave applies it):**
- `CLAUDE.md:319` — append `gold-audacious` to the variant list.
- `CLAUDE.md:321` — add a sentence: "`gold-audacious` extends `btn-audacious` with the `@utility btn-audacious-gold` gold-sweep hover (a translucent `--color-gold-*` linear-gradient over the paper-grain, the `--glass-specular` catch-light, and the `btn-gold-bg-sweep` shimmer — PRM-gated; rest text is warm-ink `--foreground`, hover/active flips to white over the saturated gold backplate, per the AW.W13 contrast contract)."
- `CLAUDE.md:177` — append `btn-audacious-gold` to the utilities.css inventory line.

## Token audit — what EXISTS vs needs minting

The ask flagged four token dependencies (`--color-gold*`, `--paper-clean-texture`, `--glass-specular`, `--duration-shimmer`). **All four exist; none need minting.**

| Token | Status | Location | Note |
|---|---|---|---|
| `--gold` / `--gold-light` / `--gold-dark` | EXISTS | `tokens.css:1132-1134` (oklch); `.dark` arm `:1705-1707`; `light-dark()` form `:1521-1523` | §13 "GOLD (accent family kept for consumers using it)". Already mode-adaptive. |
| `--color-gold` / `--color-gold-light` / `--color-gold-dark` | EXISTS | `tokens.css:1136-1138` | The `--color-` aliases the utility reads (`color-mix(in srgb, var(--color-gold) …)`). |
| `--paper-clean-texture` | EXISTS | `tokens.css:1126` | The SVG fractal-noise grain (opacity 0.04, saturate 0). Shared with `btn-audacious` + the glass `::after` grain. |
| `--paper-texture-size` | EXISTS | `tokens.css:974` (`200px 200px`) | The grain tile size the gold hover composes. |
| `--glass-specular` | EXISTS | `tokens.css:742` (`inset 0 1.5px 0 0 hsl(0 0% 100% / 0.45)`); `.dark` arm `:1686` (0.30) | The top-edge catch-light box-shadow the gold hover swaps in. Mode-adaptive. |
| `--duration-shimmer` | EXISTS | `tokens.css:82` (`5s`); `--duration-shimmer-fast: 3s` `:81` | The `btn-gold-bg-sweep` + `gold-shimmer` (text) animation rate. |
| `--duration-sparkle` | EXISTS | `tokens.css:86` (`600ms`) | The `btn-audacious` `::after` sparkle-sweep rate (inherited by gold). |
| `@keyframes btn-gold-bg-sweep` | EXISTS | `utilities.css:931-934` | Distinct from the text-clip `gold-shimmer-slide` (`animations.css:139`). |
| `@keyframes gold-shimmer-slide`, `sparkle-sweep` | EXISTS | `animations.css:139-149`, `:151-172` (+ PRM bracket `:166`) | |

The only naming wrinkle: there are **two parallel gold-token names** — the raw `--gold*` (`:1132`) and the `--color-gold*` aliases (`:1136`). The utility reads `--color-gold*`; the text `.gold-shimmer` (`utilities.css:333`) also reads `--color-gold*`. This is consistent (one consumed name) — NOT a gap, just noted so the authoring wave does not "fix" it into a break.

**Conclusion: zero token minting. The gold facility is fully token-backed on the canonical house pattern** (`color-mix(in srgb, var(--color-gold) N%, transparent)` for every alpha derivative — the in-srgb house decision per CLAUDE.md, applied correctly).

## How the gold CTA models the D19 liquid-glass identity

This is the load-bearing half of the lane: the gold CTA is the **reference implementation of a tasteful glassy specular/shimmer done right** — it shows exactly what the D19 material overhaul should converge ON, and (by contrast with the D11/D19 defects) what to avoid. Five transferable lessons:

### L1 — Specular as a thin EDGE catch-light, never a diffuse central bloom

The gold hover swaps in `--glass-specular` (`inset 0 1.5px 0 0 hsl(0 0% 100% / 0.45)`) — a **1.5px inset top-edge highlight**, a sharp specular *rim*, not a radial fill. This is the antithesis of the D19 defect (the "large diffuse central radial bloom" that washes the speedtest card muddy). The lesson for the material overhaul: **the legible-glass specular is a perimeter/edge phenomenon** (the `--glass-edge-light` rim at `glass.css:330-350` + the `--glass-specular` top catch-light), NOT a `radial-gradient(circle at center …)` filling the plate. The moving `.glass-material::before` (`glass.css:118-123`) is already on the warm-cream low-alpha discipline at rest=0; D19's job is to ensure NO surface re-introduces a center-anchored diffuse radial. The gold CTA never does — it is the model.

### L2 — Effect fires on HOVER only; rest is restrained glass

`btn-audacious-gold` rest = a **faint 8%/5% gold tint over the glass substrate** (`utilities.css:887-894`) — "warm glass without announcing the hover state." All the drama (the sweep, the specular swap, the gold ring) lives in `&:hover:not(:disabled)` (`:900-918`). The `btn-audacious` parent is identical: at rest it "reads as a restrained glass surface" (`utilities.css:756-758`), disco accents fire on hover only. This is the correct hover register the user wants for D19's "specular HOVER fixed (egregious)" + "button HOVER smoothed": **the resting surface is quiet glass; the specular/shimmer is a hover-gated celebration, never resting chrome.** The D11 finding's "always-on `[data-phase]` corner-halo `::before`" (`dock-controls.css:329`) is the anti-pattern — an always-on glow the gold CTA explicitly avoids by hover-gating.

### L3 — Overlay blend-mode as a LENS, not a paint

The gold hover composes the sweep gradient over `--paper-clean-texture` with `background-blend-mode: overlay, normal` (`utilities.css:911`) — the same "lens metaphor" the `btn-audacious` primary radial uses: overlay "concentrates the gold on bright grain facets and recedes on dark ones" (`utilities.css:898-899`). This is how to make a shimmer read as *light catching a textured glass surface* rather than a flat color wash. **D19 caveat (Safari):** `background-blend-mode: overlay` is well-supported in Safari, but `mix-blend-mode: screen` (used by the moving specular `::before` at `glass.css:134`) has documented Safari quirks under stacking/isolation — the gold CTA sidesteps this by using `background-blend-mode` (compositing within the element's own background layers, isolation-safe) rather than `mix-blend-mode` (compositing against the backdrop). **The material overhaul should prefer `background-blend-mode` over `mix-blend-mode` wherever the effect is intra-element** — the gold CTA is the Safari-safe pattern to mirror.

### L4 — PRM-gated animation; static fallback always legible

The `btn-gold-bg-sweep` infinite shimmer is wrapped in `@media (prefers-reduced-motion: no-preference)` (`utilities.css:920-924`); under PRM-reduce the **static gold tint + specular still show** (the hover `background-image`/`box-shadow` are outside the PRM bracket). The sparkle `::after` follows the same convention (`utilities.css:844-848`). This is the canonical motion discipline D19's "animations need tuning" should adopt library-wide: **motion is the enhancement; the static material read is always complete and legible without it.**

### L5 — Contrast contract baked into the variant + gated

The `gold-audacious` variant reserves `text-white` for hover/active (where the gold backplate darkens enough to clear AA) and uses warm-ink `--foreground` at rest (`button/index.ts:30-36`), with `proof-affordance-contrast.mjs:67-82` enforcing it. The lesson: **a material effect must not be authored in isolation from its legibility contract** — the D19 overhaul's every surface needs the same "does the text still clear AA over this material at every state?" gate. The muddy-card defect is partly a legibility failure (a diffuse bloom lifting the whole plate's lightness toward the text); the gold CTA's discipline (tint stays low at rest, white only where the backplate is dark) is the template.

## Promotion design — what the authoring wave actually does

Because the facility already ships, "promotion" reduces to **canon + lesson-harvest**, not new code:

1. **Docs (the only required edit):** the three `CLAUDE.md` additions in §"The ONE residual gap" — enumerate `gold-audacious` in the variant list, document its composition, add `btn-audacious-gold` to the utilities inventory. This is what "documented glass-ui ROOT facility" literally asks for and is the one thing currently missing.

2. **Mark ASK-GU-GOLD satisfied** in `docs/tranches/AX/coordination/from-speedtest-AV-routed-asks.md` — move the row from "Open asks" to "Closed / satisfied by 3.8.0" with the note "the `@utility btn-audacious-gold` + `gold-audacious` Button variant already ship in root (a09b01a); speedtest consumes the library utility (Dock.vue:302), no local redefinition; demo'd (buttons.vue) + gated (proof-affordance-contrast). Residual: CLAUDE.md variant-list mention (folded into the liquid-glass docs leg)."

3. **NO new variant, NO `gold` shorthand alias, NO DockTabButton variant.** The ask floated "a Button/DockTabButton variant OR canonical @utility" — all already exist (`@utility btn-audacious-gold` + `gold-audacious` Button variant; the DockTabButton consumes the utility via class binding, which is the right seam — a DockTabButton `gold` variant would be redundant substrate-without-a-second-consumer per inv-8). Per the no-backwards-compat / no-redundant-alias precept, do NOT mint a parallel `gold` name. The existing names are canon.

4. **Feed L1–L5 into the D19 material-overhaul wave** as the reference pattern (the "tasteful glassy specular done right" the ask names) — specifically: edge/perimeter specular over central radial (L1), hover-gated over always-on (L2), `background-blend-mode` over `mix-blend-mode` for Safari-safe intra-element compositing (L3), PRM-gated motion with complete static fallback (L4), legibility-contract-per-state gated (L5).

## Cross-refs

- **D11** (specular radial corner-glow) — the gold CTA's `box-shadow` hover adds a `0 0 0 1px color-mix(…--color-gold 30%…)` ring + the `--glass-specular` edge light; it does NOT use the `ellipse at 30% 30%` corner radial that D11 flags as egregious on `btn-audacious`'s `&:hover` (`utilities.css:782-786`). **D11's tune of the `btn-audacious` corner radial will touch the SHARED parent that `gold-audacious` composes** — the gold variant's hover `background-image` REPLACES the parent's primary-radial layer (`utilities.css:901-910`, "replace the audacious primary-radial with a gold sweep shimmer"), so the gold CTA is already insulated from the `30% 30%` corner radial on hover. Coordinate: D11's btn-audacious radial demotion must not regress the gold variant's hover (it won't — gold overrides `background-image` wholesale on hover). Verify in the live check.
- **D19** (the material overhaul) — L1–L5 above are the model; the gold CTA is the "what good looks like" reference the overhaul converges toward.
- **Safari** — L3's `background-blend-mode` preference + the existing single-source `backdrop-filter` (no manual `-webkit-` prefix; Lightning CSS auto-prefixes, `glass.css:195-202`) + the `mask-image` Baseline-2023 fallback note (`glass.css:125-127`) are the Safari-compat patterns the gold CTA already honors.

## Exact LIVE checks for the orchestrator (no browser here)

Run against `localhost:5173`, Chrome + (ideally) a Safari pass:

1. **Gold rest legibility (light mode).** Navigate to the buttons story (`demo/stories/primitives/buttons.vue` route). Confirm the `Next →` `gold-audacious` button at REST shows **dark warm-ink text** (`--foreground`), legible over the faint gold-tinted glass — NOT washed-out white. (Gate `proof-affordance-contrast` asserts the source; the live check confirms the paint.)
2. **Gold hover.** Hover the `Next →` button. Expect: a translucent gold gradient SWEEPS left-to-right (the `btn-gold-bg-sweep` shimmer, ~5s loop), the top-edge `--glass-specular` catch-light brightens, a faint gold ring appears, text flips to white over the darkened gold backplate, sparkle `✦` sweeps once. The sweep must read as a **tasteful celebration, not garish** — this is the user-loved register; confirm it matches the praise.
3. **PRM-reduce.** Emulate `prefers-reduced-motion: reduce`. Hover again: the **static gold tint + specular + ring still show**, but NO shimmer sweep and NO sparkle animation. Confirm the static read is complete and legible.
4. **Dark mode.** Toggle `.dark`. Confirm the gold tokens shift to the `.dark` arm (`tokens.css:1705-1707`, slightly lighter/warmer gold) and the rest + hover both stay legible (the `.dark --glass-specular` at 0.30 is softer).
5. **Safari intra-element compositing.** In a Safari pass, confirm the gold hover's `background-blend-mode: overlay` renders the lens effect (gold concentrated on bright grain, receding on dark) the SAME as Chrome — this validates L3's Safari-safe pattern and de-risks the D19 overhaul's blend-mode choices.
6. **D11 coordination canary.** After D11 tunes the `btn-audacious` `30% 30%` corner radial, re-hover the `gold-audacious` AND a `primary-audacious` button side by side: the gold hover must be UNCHANGED (it overrides `background-image` on hover) while `primary-audacious`'s corner glow softens. Confirms the D11 tune did not leak into the gold model.

## Verification trail

- `src/styles/utilities.css:885-925` — `@utility btn-audacious-gold` (rest gold tint + hover sweep + `--glass-specular` swap + gold ring); `:931-934` — `@keyframes btn-gold-bg-sweep`.
- `src/styles/utilities.css:759-864` — `@utility btn-audacious` (the parent: restrained-glass-at-rest, disco-on-hover; the `ellipse at 30% 30%` corner radial at `:782-786` is D11's target, REPLACED on hover by gold).
- `src/components/ui/button/index.ts:35-36` — `gold-audacious` variant; `:28-29` — `primary-audacious` parent.
- `src/styles/tokens.css:1132-1138` (gold), `:1521-1523` + `:1705-1707` (`.dark`/light-dark gold), `:742`+`:1686` (`--glass-specular`), `:1126`+`:974` (paper grain + size), `:81-86` (shimmer/sparkle durations).
- `src/styles/animations.css:139-149` (`gold-shimmer-slide`), `:151-172` (`sparkle-sweep` + PRM bracket).
- `src/styles/glass.css:118-134` — the moving specular `::before` (warm-cream low-alpha, `mix-blend-mode: screen`); `:330-350` — the `--glass-edge-light` uniform rim.
- `demo/stories/primitives/buttons.vue:60-85` — the gold CTA demo section + AW.W13 contrast canary.
- `scripts/proof-affordance-contrast.mjs:67-82` — the `gold-audacious` rest-text contrast gate.
- `../speedtest/src/components/Dock.vue:45,289,302` — speedtest CONSUMES `btn-audacious-gold` (class binding); `grep '@utility btn-audacious-gold' ../speedtest/src` → empty (no local redefinition).
- `git log`: `a09b01a` (gold variant landed in root), `374b98e` (AW.W13 rest-text contrast fix), `c007d47`/`8554e33` (the variant present at AW close).
- `CLAUDE.md:177,319,321` — the canon GAP: `gold-audacious` / `btn-audacious-gold` not enumerated.
