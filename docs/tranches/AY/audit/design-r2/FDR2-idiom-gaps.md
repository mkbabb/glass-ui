# FDR2-idiom-gaps — the glass-ui ↔ slides idiom analysis (the user C3)

FD-R2 design audit · 2026-06-10 · lane `FDR2-idiom-gaps`
Driven live: glass-ui demo `http://localhost:5199` (HEAD, 3.9.0 + AX W54/W55 working tree) · slides `http://127.0.0.1:5273` (dev serve; the served CSS bundle carries the W54 `--glass-level` recipe + W55 tint seam — verified by grep of the served `src/styles/index.css`).
Method: paired captures (11 PNGs, this dir, `FDR2-idiom-*.png`) + computed-style readbacks (`getComputedStyle` probes over both origins) + a CDP-emulated `prefers-reduced-transparency: reduce` pass. Every verdict carries a capture or a number.

## Verdict table

| # | Idiom | Where it lives | Verdict | Consumer math |
|---|-------|----------------|---------|---------------|
| 1 | Frost ladder (cool-frost fill + lifted rim + contact lift + static crest) | slides `deck.css §1` override of `--glass-bg/border/shadow-*` | **TRANSPOSE UP** as the library's flat-light-ground glass arm, expressed through the SHIPPED W55 tint seam + three new companion tokens — not as the deck's wholesale rung override | slides (shipping it today as a fork) + glass-ui's own flat-cream demo/W60 pages (the paper-glass story's slab read IS the same defect) = **2**, speedtest cream pages a third |
| 2 | Faux-window portal chrome (`--portal-*`, `.window` bar, traffic dots) | slides `SlideXray` + `SlidePipeline` ("so 7 and 8 rhyme") | **KEEP** slides-local; watch | 2 consumers in ONE repo; zero window-chrome pattern anywhere in glass-ui src/demo — below the cross-repo bar |
| 3 | CRT bezel (war-room terminal plate) | slides `SlidePipeline` `.crt` | **KEEP** | 1 consumer; correctly composed via `--portal-*`, no new global tokens |
| 4 | PresenterCard (red-spine glass-resting sign-off) | slides `til-briefing/components` | **KEEP** | brand content (names, LinkedIn, lab line) baked in; 2 sites in 1 deck = correctly factored AT the deck level, not system material |
| 5 | Nutrition-label panel (heavy top rule, hairline rows) | slides `deck.css §11` | **KEEP** — and name it exemplary | 1 consumer; composed from existing tokens with ZERO net-new custom property — the discipline the library's own one-off recipes should match |
| 6 | Eyebrow/kicker with accent dash (`::before` red bar) | slides `deck-theme.css §2 @utility eyebrow` | **TRANSPOSE** the shape (a kicker utility, dash bound to `--primary`) | demo `StoryPage.vue` eyebrow (plain mono, dash-less) + slides eyebrow = 2 surfaces speaking the same kicker register |
| 7 | `useCountup` `[data-countup]` walker | BOTH — library `motion/useCountup` (lifted AV.W3) AND a live slides twin `src/deck/useCountup.ts` | **ADOPT** (slides deletes its twin) | the lift already happened; the slides copy + its "must NOT ride upstream" comment is stale by one tranche |
| 8 | `[data-reveal]`/`--d` entrance grammar | BOTH — library `vReveal` directive; slides hand-stamps attrs + owns the CSS arm (`deck.css §7`) | **OPTIONAL adopt** (directive replaces hand-stamped attrs; CSS arm stays deck-tuned) | shared contract already converged — lowest-priority item here |
| 9 | Constellation lattice | BOTH — library `/constellation` (neutral lattice + consumer `drawOverlay` seam) AND slides' 547-line `til-briefing/constellation.ts` | **ADOPT-when-touched** — re-base the slides field onto the library substrate, anomaly/red-tether as the `drawOverlay` pass | the Tranche-F "constellation stays local" decision predates the library's `/constellation`; the substrate now exists with a seam designed for exactly this overlay |
| 10 | Deck progress rail | BOTH — library `.glass-progress-rail` recipe over `<Progress>` (HEAD; `proof:deck-progress-rail`) AND slides' hand-rolled `.deck-progress` + `--deck-progress-*` tokens (`DeckView.vue:245`) | **ADOPT** on next slides touch | the library carved this rail FOR the deck; running both is the drift class the AW gates exist to catch |
| 11 | φ type-scale math | both — library √φ rem ladder; slides φ-in-`cqi` (`--cqx` anchor, 1280cqi export invariant) | **KEEP fork** | same math, different substrate; the cqi form is load-bearing for the pixel-faithful export — a rem transposition would break it |
| 12 | Cartoon stamp shadow | library `--shadow-cartoon-*`; slides renamed `--shadow-deck-stamp-*` (7px/7px, deeper + flatter) | **KEEP fork** | deliberate de-conflict (the rename stops the deck intercepting the library's `@theme` var chain); the override-on-cascade contract remains available if the deck ever wants a library-wide retint |
| 13 | Display face | library Plus Jakarta Sans; slides Fraunces (WONK) + Newsreader | **KEEP fork; FLAG for W60** | measured: deck `displayFont: "Fraunces, Georgia, serif"`, demo `"Plus Jakarta Sans …"`. The deck is the audacious-type exemplar the suffusion brief names; whether the library wants a display-serif accent register is a user identity decision, not an auditor's |
| 14 | `@theme`+`@utility` consumer layering (`deck-theme.css`) | slides | **KEEP — the model** | this file is what "consumer of glass-ui" is supposed to look like: identity as composable utilities over the library cascade, byte-identical easing forks deleted, section-label cascade position reasoned in writing |

## 1 · The C3 headline: frost ladder vs glass ladder — TRANSPOSE, via the seam that already shipped

### What the two ladders share (measured, same-named tokens, same ground)

Both repos resolve the IDENTICAL cream ground — `--background: light-dark(hsl(48 12% 98%), hsl(24 8% 6%))`, byte-equal in both probes. Both run `backdrop-filter: blur(12px) saturate(1.05)` at resting. The deck consumes the library's `.glass-*` classes directly (PresenterCard is `class="presenter glass-resting"`). The fork is four token families, and every delta is in the probe JSON:

| Axis | glass-ui (demo, computed) | slides deck (computed) | Δ |
|------|---------------------------|------------------------|---|
| Resting fill | `oklab(0.9858 −0.0001 +0.0013 / 0.65)` — warm, 65% | `oklab(0.9774 −0.0025 −0.0040 / 0.74)` — COOL (b −0.005), 74% | the frost tone-shift is real and measurable: the deck plate sits blue-of-ground; the library plate is tonally invisible on its own card color |
| Resting rim | `color(srgb 0.11 0.098 0.09 / 0.12)` — 12% ink | same hue `/ 0.28` — 28% ink | 2.33× — the deck's "a hairline disappears as a glass edge" |
| Crest | `inset 0 0.5px 0 0 hsl(0 0% 100% / 0.25)` | `inset 0 1.5px 0 0 hsl(0 0% 100% / 0.85)` | 3× height, 3.4× alpha — the deck's static specular |
| Lift | one soft layer `0 4px 16–20px / 0.08–0.12` | 3-layer contact+diffuse stack (`0 1.5px 2px/.16`, `0 4px 8px/.14`, `0 16px 34px −12px/.26`) + crest | the "plate sitting ON the cream" read |

### Why the deck is right about flat ground — the library's own captures concede it

`FDR2-idiom-glassui-paper-glass.png`: the five tier cards in the static section read as flat slabs — no edge pop, no crest, near-zero silhouette over the flat ground. `FDR2-idiom-glassui-glass-material.png`: the SAME rungs over the aurora field read as true glass instantly. CLAUDE.md already concedes the mechanism ("the glass blur is imperceptible over a flat substrate — W60 lays the rich backgrounds"). The deck's A10 analysis is the missing half of the library's model: **on a ~98%-L ground there is no luminance headroom, so the glass read must come from TONE-SHIFT + RIM + LIFT + CREST, not from fill-vs-backdrop** — frosted glass on a white table. `FDR2-idiom-slides-cover-presenter.png` and `FDR2-idiom-slides-frost-cards.png` show the payoff: static frosted plates with a felt silhouette on the very same cream the library's slabs vanish into. W60 will fix the demo's grounds; it will not fix a consumer's white data grid, and the deck proves consumers ship flat-light grounds in practice.

### The fork cost — measured severance, live today

The deck implements frost by overriding the `--glass-bg-*` rungs WHOLESALE with fixed-alpha mixes. The served slides CSS now carries W54/W55 (`@media (prefers-reduced-transparency: reduce) { :root { --glass-level: 0; … } }`, `.glass-opaque`, the `contrast-color(var(--card))` probe, `--glass-tint-strength-aa` — all present in the bundle the dev server ships). CDP-emulated `prefers-reduced-transparency: reduce`, same instant:

- glass-ui Card: `oklab(0.9858 …)` — **no alpha channel, fully opaque** (level=0 collapses the rung recipe to solid) ✓
- slides PresenterCard: `oklab(0.9774 … / 0.74)` + `backdrop-filter: blur(0px)` — **still 74% translucent, now UNBLURRED** ✗

The deck's override severs the opacity arm of the level bracket (its fixed mix carries no `var(--glass-level)` factor) while the blur arm still works (the deck never overrode `--glass-blur-*`) — so the a11y escape lands on the worst point of the curve: a see-through plate with no frost. The deck's own §4 fallback (`backdrop-filter:none; background:var(--card)`) covers only `.card`/`.card-cartoon`, NOT the `.glass-resting` consumers it routed through the re-pointed shadow tokens (PresenterCard, the ask-callout, the capacity band). The same severance applies to W55: the deck's rungs bypass the rung-level recipe the `--glass-backdrop: light` bucket retunes, so the adaptive-legibility machinery the library just built can never reach a deck surface.

### The transposition mechanism — ONE seam, three new tokens, no new compositing

The frost recipe is mechanically the W55 tint seam already at every rung: the deck's `color-mix(in srgb, color-mix(in srgb, var(--card) 36%, var(--glass-frost)) 74%, transparent)` is "mix the rung toward a source at a strength" — exactly `color-mix(in oklab, <rung bg>, var(--glass-tint-source) var(--glass-tint-strength))` with `tint-source: hsl(206 46% 96%)` and strength ≈58–64%. W55 points the source at INK for contrast; frost points it at COOL-WHITE for material read. Same seam, complementary arms (and the near-white source is contrast-safe at high strength — the AA clamp exists for the ink darken, not this). What the seam does NOT carry is the deck's other three legs, which become the new library tokens of a `glass-frosted` register (a class or a `--glass-ground: flat` bucket beside `--glass-backdrop`, the shipped `@container style()` mechanism):

1. a **static crest rung** — the deck's `inset 0 1.5px 0 0 / 0.85` as a named `--glass-crest`; the library's pointer-tracked specular rests at 0 and never lights a static surface, which is the precise gap the deck found;
2. a **lifted rim scale** (18/28/32%);
3. a **contact-lift shadow stack** (`--glass-deck-lift`'s 3 layers).

Threaded BENEATH the rung recipe (source/strength/crest/rim/lift re-points, never a rung override), the frost variant keeps `--glass-level` multiplying the alpha — the severance closes by construction, and the deck's §1 block collapses from ~90 lines of override to a handful of token re-points. The deck keeps its identity values (presets-in-consumers); the library gains the cream-ground arm its OWN maximal-glass default needs. **Verdict: TRANSPOSE — the strongest single convergence move available to either repo.**

## 2 · Slides-local patterns — what deserves abstraction (verdicts 2–5, 14)

- **Faux-window portal chrome** (`FDR2-idiom-slides-xray-window.png`): the dark framed-browser with traffic lights + LIVE pulse is a genuinely distinctive editorial device, and the `--portal-*` rhyme between SlideXray and SlidePipeline is good internal discipline. But 2 consumers in one repo is not 2 consumer repos; glass-ui has zero window-chrome demand today. KEEP; it is the first candidate to lift the day a storybook/browser-frame showcase wants it.
- **CRT bezel** (`FDR2-idiom-slides-pipeline-crt.png`): the strongest delight moment in either repo — a thick molded bezel, scanline veil, nameplate + power LED, "WOPR · TERMINAL 01". Single-consumer theater, correctly scoped. KEEP. Its lesson generalizes without its pixels: high-impact set pieces earn their keep AS one-offs when composed from existing tokens.
- **PresenterCard** (`FDR2-idiom-slides-cover-presenter.png`, `…closer-presenter.png`): two sizing rungs over one brand block — right-sized at the deck level. KEEP. (It is also the proof body for the severance finding above, being a bare `.glass-resting` consumer.)
- **Nutrition label**: net-new layout, zero net-new tokens. KEEP, and cite as the bar for one-off recipes.
- **`deck-theme.css` itself** is the exemplary consumer artifact — identity as `@theme`/`@utility` over the library cascade, with cascade-position reasoning written down (the section-label unlayered-rule note). Any future glass-ui consumer guide should crib it.

## 3 · Library idioms the slides under-use (verdicts 7–10 + two more)

1. **`useCountup`** — slides runs a local twin of the composable the library lifted FROM it at AV.W3 (same `[data-countup]` DOM contract, same runActive/settle shape, plus engine-managed cancel the local lacks). ADOPT; delete the twin.
2. **`/constellation`** — 547 local lines where the library now ships the neutral lattice + a `drawOverlay` seam designed for exactly the deck's red-anomaly pass. ADOPT-when-touched; the deck keeps its Canvas2D plain-hex token plumbing as overlay config.
3. **`.glass-progress-rail`** — the library carved a deck-position rail (gated by `proof:deck-progress-rail`); slides still hand-rolls `.deck-progress` with a parallel `--deck-progress-*` token family. ADOPT on next touch; map the deck's track/fill/glow values onto the rail's tokens.
4. **`vReveal`** — optional; contract already shared.
5. **Glass-material moving specular** — the deck's static crest is the right resting default, but the two interactive surfaces it ships (the poster-state portal window `<a>`, the gear/dock chrome) could take the library's pointer-gleam on hover for proportionate delight. Low priority.
6. **Squircle (W56, pending)** — when it lands, the deck's `--radius-2xl` cards and the portal window are natural first consumers; noting for the W56 spread list.

## 4 · The suffusion brief, read through this lane

- **glass**: the deck's frost is the brief's "glass" suffused FURTHER than the library currently can on flat ground — item 1 imports that capability.
- **math**: shared and strong — φ ladders both sides, the cqi export invariant, the constellation/fourier fields as math-made-visible. The fourier-field is the MODEL transposition (designed in feedback-coder, lifted to `/fourier-field`, consumed back by 2 slides — `FDR2-idiom-slides-fc-fourier.png`); constellation should follow it (item 3.2).
- **large and audacious typography**: the deck's Fraunces WONK cover with "fraud" in Wolfpack red (`FDR2-idiom-slides-cover-presenter.png`) is the most distinctive single frame across both repos; the library's display register (`FDR2-idiom-glassui-typography.png`) is disciplined but tonally quieter. Verdict 13 flags the question for W60 without prescribing.
- **colorful audacious pops, within proportion**: the deck's model — ONE dominant accent (NCSU red) + ONE cool counterpoint (`--ai-blue`) with light-dark()-paired text/graphic arms — is the proportion discipline the brief asks for; the library's icon-pop ambition should adopt the paired-arm pattern (every pop carries its dark-ground lift) rather than adding hues.
- **grid**: the deck's `.dock-layer-grid`/chassis grids and the demo's ladder grids are converged enough; no action from this lane.

## Captures (this dir)

`FDR2-idiom-glassui-paper-glass.png` · `FDR2-idiom-glassui-card-tiers.png` · `FDR2-idiom-glassui-glass-material.png` · `FDR2-idiom-glassui-typography.png` · `FDR2-idiom-glassui-intro-hero.png` · `FDR2-idiom-slides-cover-presenter.png` · `FDR2-idiom-slides-frost-cards.png` · `FDR2-idiom-slides-xray-window.png` · `FDR2-idiom-slides-pipeline-crt.png` · `FDR2-idiom-slides-closer-presenter.png` · `FDR2-idiom-slides-fc-fourier.png`

Probe JSON (computed-style readbacks both origins): `FDR2-idiom-probe.json` (this dir; numbers reproduced inline above; the reduced-transparency pass is quoted verbatim in §1).
