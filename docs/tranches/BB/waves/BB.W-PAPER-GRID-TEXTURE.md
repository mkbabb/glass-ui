# BB.W-PAPER-GRID-TEXTURE — the `--paper-grid-texture` paper-cascade peer: the math/grid line-field felt THROUGH the card, not only in the margins

**Name**: W-PAPER-GRID-TEXTURE - the card-interior geometric texture register
**Opens after**: Batch P open (the PRIMITIVES band; runs ‖ W-BORDER-PROGRESS ‖ W-PHASE-PALETTE ‖ the other P1 primitives — file-bound-disjoint per the Disjointness table; the registry single-owner rule: this wave OWNS no shared registry — it adds ONE token-peer + ONE utility + ONE Card prop, all in files no sibling primitive writes). Depends on the Batch-0 integrity floor + the Batch-1 gestalt hardening landed (every primitive's gestalt verdict rides the HARDENED `proof:ba-gestalt`).
**Agents**: 1 (a single small token+utility+prop wave — the token peer, the `.paper-grid` opt-in utility + its dark arm + a11y guards, the additive `grid` axis on Card, the demo wiring, the gate). The seam is too small to parallelize cleanly; the dark arm, the a11y guards, and the Card prop all read the ONE token the same agent mints.
**Hard gate**: `proof:paper-grid` (born-RED) — the `--paper-grid-texture` peer + `--paper-grid-texture-size` live in the paper-cascade (`scale-paper.css`), the `.paper-grid` opt-in utility paints the two-frequency grid as a card's INTERIOR ground at an ambient opacity with a scheme-aware dark arm + the PRM / `prefers-reduced-transparency` guards mirroring `paper.css`, and `<Card grid>` threads the additive axis (default OFF, byte-identical to HEAD) — PLUS the π readback (a `.paper-grid` card's interior contributes ≥ JND grid stroke-coverage where a bare card contributes 0, both modes, the static-raster no-scroll-paint discipline held) + the `proof:ba-gestalt` foundations/display verdict (BA inv-4).
**Status**: SPEC

## The charge

The math/grid line-field is a BRAND PILLAR (the engineering-paper register the demo's `<StoryHero>` blueprint grid + the `math-paper` composition speak), but it shows ONLY in page margins today — every opaque card plate paints OVER it, so on a dense surface (a dashboard, a completion certificate) the grid contributes **0.0000** (the surfaces that are MOST about the grid — the chart/data plates — never see it). The grid lives as a DEMO-PRIVATE `.story-bg-grid` recipe (`demo/stories/story-hero.css:211-225` — two crossed hairline `linear-gradient`s at `--story-grid-size` with a 4×-major rule, page-substrate only) and as the speedtest page `body::before` substrate; in BOTH cases it is a PAGE-ground layer an interior plate occludes. There is **NO card-interior geometric texture register in the library** at HEAD: the paper-cascade ships only the ORGANIC turbulence half (`--paper-clean-texture` / `--paper-aged-texture` at `scale-paper.css:80-81`, consumed by `.paper-texture` `cards.css:10-15` + `PaperBackdrop`), never a GEOMETRIC grid peer. A document-register card cannot opt its INTERIOR ground into the line-field.

This wave mints the GEOMETRIC half of the paper-cascade — a `--paper-grid-texture` peer token + a `.paper-grid` opt-in utility (the sibling of `.paper-texture`) so a document-register card carries the two-frequency graph-grid as its own interior ground, felt THROUGH the card at an ambient ~0.08, scheme-aware, compositor-cached (a static raster, no per-frame paint). The texture family then covers BOTH registers under ONE cascade: organic grain (turbulence) AND geometric grid (line-field). Instrument-register surfaces (home / dock / controls) do NOT opt in — glass is what measures, paper is what you read.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the speedtest ASK (`speedtest/docs/tranches/AW/asks/ASK-GU-PAPER-GRID-TEXTURE.md` — the authoritative WHAT/WHY/CONSUMER/ACCEPTANCE; routed by AW.WG.2, D2-§2.1 defeat-b occlusion) + the BB cross-repo amendment (`BB-AMENDMENT-crossrepo.md §A1 P1`), re-verified against BB HEAD (`f3c4170e` at this authoring) — NOT a blind re-diagnose (the §0 discipline). Before touching a byte, the impl agent re-greps each anchor below at HEAD and confirms the paper-cascade shape + the demo grid recipe still hold; if any cite has drifted (a sibling primitive moved a paper token, the blueprint grid recipe re-homed), the agent records the drift in PROGRESS and re-locates the mechanism — it does NOT re-invent the design. The speedtest ask tree is FOREIGN (the cross-repo fence): the agent READS the ask for the contract + the consumer + the acceptance, never edits the speedtest tree; speedtest consumes this primitive via a `^4.1.0` pin bump at AW.W7.

```
# 0. The token-peer is genuinely net-new (born-RED ready — ZERO at HEAD)
grep -rn "paper-grid-texture\|\.paper-grid\b" src/                       # MUST be empty — the peer + utility do not exist
grep -rn "paper-clean-texture\|paper-aged-texture\|paper-texture-size" src/styles/tokens/  # the ORGANIC cascade peers this wave mirrors

# 1. The paper-cascade shape (the peer's home + the consuming utility)
sed -n '76,82p'  src/styles/tokens/scale-paper.css                       # §12 the --paper-*-texture peers + the inline-opacity baked-at-parse note
sed -n '8,20p'   src/styles/cards.css                                    # .paper-texture (the ORGANIC consumer — .paper-grid is its sibling)
sed -n '90,93p'  src/styles/tokens/offsets-sizing.css                    # --paper-texture-size: 200px 200px (the org. size peer)

# 2. The DEMO blueprint-grid recipe (the geometric vocabulary this token re-expresses, demo→library)
sed -n '13,16p'  demo/stories/story-hero.css                             # --story-grid-size 28px + the 7%/12% line colors (the demo recipe)
sed -n '208,225p' demo/stories/story-hero.css                            # .story-bg-grid — the two crossed gradients + the 4×-major rule
grep -n "paper-grain-overlay\|paper-ink-mark\|border-l-\[3px\]" demo/stories/compositions/math-paper.vue  # the math-paper register the grid completes

# 3. The PRM / reduced-transparency / dark-arm guards this wave MIRRORS
sed -n '29,68p'  src/styles/paper.css                                    # the paper-grain-overlay @utility + the .dark soft-light arm + the two a11y media blocks
sed -n '195,205p' src/styles/tokens/dark-arm.css                         # --glass-grain-opacity dark lift (0.045) — the scheme-aware opacity precedent

# 4. The Card grain axis (the additive `grid` prop mirrors `grain`)
sed -n '83,103p' src/components/ui/card/Card.vue                         # the `grain?: boolean` prop + its default-true + the data-grain binding
grep -n "data-grain\|paper-grain-overlay\|grain" src/components/ui/card/Card.vue
sed -n '1,32p'   src/components/custom/paper-backdrop/PaperBackdrop.vue  # the `frequency` register + the texture-system extension comment

# 5. The cascade order (where .paper-grid lives + when it imports)
grep -n "@import" src/styles/index.css                                   # cards.css @ rung 158 — .paper-grid lives beside .paper-texture in cards.css
```

Captures / authority cross-references:
- `speedtest/docs/tranches/AW/asks/ASK-GU-PAPER-GRID-TEXTURE.md` (the authoritative ask — the token peer + the `.paper-grid` opt-in + the acceptance: ≥ JND on the card interior where today it is 0.0000, scheme-aware, compositor-only).
- `BB-AMENDMENT-crossrepo.md §A1 P1` (the BB charge: `--paper-grid-texture` peer so document-register cards opt their INTERIOR ground in, felt THROUGH the card ~0.08; consumers speedtest W3 cert-grid + WV1/dashboards).
- `speedtest/docs/audits/2026-06-02-AT-DEEP-AUDIT/lane-b4-css-platform.md:90` (the design root: ONE cascade covering organic grain + geometric grid; a static `repeating-linear-gradient`/baked `background-image` compositor-cached, NEVER a repaint-per-frame; a `@property`-typed transform drift if any motion is wanted, never re-animated gradient stops).
- `speedtest/docs/decisions/DDR-AW-PAPER-GLASS-REGISTER` (the register doctrine — WHICH surfaces opt in: paper-register yes, instrument-glass no).

The ONE root cause (confirmed at HEAD this authoring): **the paper-cascade ships the ORGANIC texture register (`--paper-clean-texture`/`--paper-aged-texture` + `.paper-texture`) but never the GEOMETRIC one.** The grid line-field exists only as a demo-private page-substrate layer (`.story-bg-grid`, `story-hero.css:211`) every opaque plate occludes — so the math/grid pillar is structurally invisible on the dense surfaces it was made for. The fix is a peer token in the SAME cascade + a `.paper-grid` opt-in utility (the sibling of `.paper-texture`), re-expressing the demo blueprint-grid vocabulary as a tailwind-first library primitive (NOT a raw `repeating-linear-gradient` pasted per-surface — the carved-dead-CSS no-legacy trap; the lib register, consumed).

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | no geometric peer in the paper-cascade [the headline] | `scale-paper.css:80-81` (ONLY `--paper-clean-texture`/`--paper-aged-texture`); `offsets-sizing.css:92` (`--paper-texture-size`) | the cascade ships the organic turbulence half end-to-end but no geometric grid peer — a document card cannot opt its interior into the line-field |
| 2 | the grid is demo-private + page-substrate only (occlusion) | `story-hero.css:211-225` (`.story-bg-grid`, a page-margin background); `math-paper.vue` (the register that wants the grid through the plate) | the grid lives on the page ground; every opaque card plate paints OVER it, so on a dense surface the grid contributes 0.0000 (the chart/data plates never see the pillar) |
| 3 | no card-interior texture opt-in beyond grain | `cards.css:10-15` (`.paper-texture`, organic); `Card.vue:85-87` (`grain?: boolean` → `paper-grain-overlay`, organic) | Card exposes a `grain` axis (organic turbulence) but no `grid` axis (geometric line-field) — the geometric register has no consumer-facing seam |

## Scope (the gestalt, NOT a workaround — the lib register, tailwind-first, no legacy)

1. **Mint the `--paper-grid-texture` peer in the paper-cascade** (the geometric half). Add `--paper-grid-texture` + `--paper-grid-texture-size` to `scale-paper.css §12` (beside the `--paper-clean-texture`/`--paper-aged-texture` peers — the SAME `:root` cascade context) carrying the two-frequency graph-grid: a 32px MINOR cell + a 128px MAJOR line (a 4×-major engineering-paper rule, the `.story-bg-grid` vocabulary), hairline strokes. The grid is a **static gradient image**, not an SVG turbulence — two crossed `repeating-linear-gradient`s (or one `linear-gradient`-stack `background-image` at the cell size, the `.story-bg-grid` form) so it is a one-time compositor-cached paint (NEVER a per-frame repaint — the W6 paint-path discipline; if a future drift is wanted it rides a `@property` transform on the layer, never re-animated stops). The line INK reads a `color-mix(in srgb, var(--foreground) N%, transparent)` (the demo's 7%/12% minor/major form), so it composes against the warm-ink identity and re-tints with `--foreground` in lockstep — NOT a hardcoded `hsl()` (the no-gray / token-first floor). A bounded ambient opacity knob (`--paper-grid-opacity`, default ~0.08 — the ask's "felt THROUGH the card ~0.08") tunes the through-card strength.

2. **Mint the `.paper-grid` opt-in utility** (the sibling of `.paper-texture`, in `cards.css`). A `@utility paper-grid` (the `@layer components` home `cards.css` already speaks, so it lives beside `.paper-texture` and imports at the same rung) that paints `--paper-grid-texture` as the card's INTERIOR ground at the ambient `--paper-grid-opacity`, the grid clipped to the card's `border-radius: inherit` (the `::after`/`background-image` form that does not bleed past the rounded plate). It composes ON TOP of a glass/paper tier (it is a decoration-only register, NOT a tier of its own — exactly like `.paper-texture` / `cartoon-surface` / `veil-surface`). The interior ground reads THROUGH the translucent glass plate (the grid is the card's own underlay, beneath its content), so a document card opts in via `<Card class="paper-grid">` (the ask's stated API) AND via the `<Card grid>` prop (scope 4).

3. **The scheme-aware dark arm** (the page-substrate root-fix principle: compose against the card-interior ground, not an assumed dark one). A `.dark .paper-grid` (plain-ancestor `.dark`, NOT a scoped `:global()` — the recurring Vue scoped-global-drop trap; this is a library CSS partial, but record the discipline) re-points the line ink / blend-mode so the grid is legible on the dark `--card` interior (the `--glass-grain-opacity` dark-lift to 0.045 is the precedent — a dark card interior needs a different ink weight + blend than the light cream plate). The ink stays `--foreground`-derived (the warm-cream foreground flips dark→light in the `.dark` block, so the grid ink auto-lifts off the near-black card without a parallel `--paper-grid-*-dark` token family). The blend-mode mirrors `paper.css` (light `multiply` / dark `soft-light` or the legible equivalent for a hairline grid).

4. **The additive `grid?: boolean` axis on Card** (the consumer-facing seam, mirroring `grain`). Card gains `grid?: boolean` (default **OFF** — byte-identical to HEAD; the existing render is untouched for every card that does not opt in) that composes the `.paper-grid` utility when true (the `data-grid` binding + the class, exactly the `grain` → `paper-grain-overlay` shape at `Card.vue:85-87,151`). The prop is the typed seam; `class="paper-grid"` is the raw-class escape the ask names (both reach the same utility). `grid` is ORTHOGONAL to `surface`/`tier`/`grain` (a card can carry BOTH grain and grid — the organic + geometric registers compose). Document this: the register doctrine (paper-register cards opt in; instrument-glass surfaces do NOT) is a CONSUMER choice, not a library default — the default-OFF prop honors it by construction.

5. **The PRM + reduced-transparency a11y guards** (mirror `paper.css:55-67`). `.paper-grid` honors `@media (prefers-reduced-transparency: reduce)` (the grid layer → `opacity: 0`, the same as `.paper-grain-overlay::after`) and `@media (prefers-reduced-motion: reduce)` (a no-op for a static grid by construction, but guard a future drift). The grid is a LEGIBILITY/STRUCTURE underlay, so it does not need a motion gate per se — but the transparency guard is binding (a reduced-transparency user gets a clean card interior, no texture). These ride the SAME a11y blocks `paper.css` establishes (one a11y idiom, not a parallel grid-local one).

6. **The demo consumer + the canon record.** The `math-paper.vue` composition (the gold-standard document-register page) opts its article card INTO `grid` (or a focused demo route demonstrates `<Card grid>` — the ≥1-demonstration storybook-complete floor), so the new register has a live demonstration on the demo surface (the brand pillar now reads THROUGH the document card, not only in the page margin around it). CLAUDE.md gains the paper-cascade GEOMETRIC peer under the paper/texture canon (the `.paper-grid` opt-in + the `--paper-grid-texture` peer + the register doctrine: organic grain ⊕ geometric grid, both in ONE cascade; paper-register opts in, instrument-glass does not). NO ppmycota/demo color enters the token (the line ink is `--foreground`-derived; the `--paper-grid-opacity` strength is a presets-in-consumers knob — a consumer retunes it, the library default is the calm ~0.08).

## Triumvirate Dispatch

- **The grid texture cannot be a static raster** — if the two-frequency graph-grid genuinely CANNOT be expressed as a compositor-cached `background-image`/`repeating-linear-gradient` (the W6 no-per-frame-paint discipline) — e.g. the radius-clip + the dark-arm legibility + the through-glass read demand an SVG `<filter>` that repaints — that is a scope-reveal (the static-raster acceptance is binding). Triumvirate: research whether the SVG-mask form the speedtest page-substrate uses transposes to a card interior, decide the form, redress. Do NOT ship a per-frame paint path (the carved-dead-CSS / heavy-repaint trap the ask explicitly forbids).
- **The through-glass read collapses** — if the π readback shows the grid does NOT read THROUGH a translucent glass card (it is occluded by the card's own fill, or it bleeds past the rounded radius, or the dark-arm ink dies on the near-black interior) AFTER the utility + dark arm land, that is a register-design miss owed to the card-interior compositing order, NOT a token-α loop. Triumvirate: locate the seam (is the grid layer BENEATH the content but ABOVE/BELOW the glass fill? does the `border-radius: inherit` clip hold over the tier's own `::after`?), do not loop on the opacity knob.
- **The peer token forks a second cascade** — if minting `--paper-grid-texture` reveals it cannot ride the EXISTING `--paper-*-texture` / `--paper-texture-size` cascade (a size/blend axis the organic peers do not expose), do NOT fork a parallel `--grid-*` family. Triumvirate: the geometric peer extends the ONE paper-cascade (the texture-system canonical extension the `PaperBackdrop` comment + DESIGN.md name) — a second texture cascade is the anti-pattern. Plan-augment the shared cascade's shape.
- **Diagnostic loop halt** — if the `.paper-grid` utility does not paint the resolved grid after the utility + Card-prop land and three iterations have not isolated which cascade layer wins (the `@layer components` `.paper-grid` vs an unlayered host utility — the AZ.W-DOCK-RAIL cascade-win class; or the `::after`/`background-image` stacking against the tier's own `paper-grain-overlay` `::after`), halt and triumvirate. The suspect is the two `::after` overlays (grain + grid) competing for the single pseudo-element, or the cascade-layer precedence.

## File Bounds

| File | Access |
|---|---|
| `src/styles/tokens/scale-paper.css` | modify (add the `--paper-grid-texture` + `--paper-grid-texture-size` + `--paper-grid-opacity` peers in §12, beside the organic peers) |
| `src/styles/cards.css` | modify (add the `@utility paper-grid` opt-in + the `.dark .paper-grid` arm — the sibling of `.paper-texture`) |
| `src/components/ui/card/Card.vue` | modify (add the additive `grid?: boolean` prop, default OFF + the `data-grid`/`paper-grid` class binding, mirroring `grain`) |
| `demo/stories/compositions/math-paper.vue` | modify-IF (opt the document card into `grid` — the live demonstration; OR a focused demo route if math-paper is the wrong host) |
| `scripts/proof-paper-grid.mjs` | create (the born-RED gate) |
| `package.json` | modify (register `proof:paper-grid` + add to `proof:all`/parity) |
| `scripts/gates.mjs` | modify (register the gate row in the registry) |
| `tests-visual/paper-grid.spec.ts` | create (the binding π readback) |
| `CLAUDE.md` | modify (record the geometric paper-cascade peer under the paper/texture canon) |
| `docs/tranches/BB/audit/visual/W-PAPER-GRID-TEXTURE-DELTA.md` | create (the own-surface DELTA + the paired π readback, AZ-form freshness header) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge rows) |

Do NOT touch:
- **The organic paper peers + `.paper-texture` / `paper-grain-overlay`** — they are the SIBLING register; this wave adds the GEOMETRIC peer ALONGSIDE them, it never edits the turbulence texture, its blend, or the `paper-grain-overlay` utility. The two registers compose (a card can carry both); they do not merge.
- **The demo blueprint-grid recipe (`.story-bg-grid`, `story-hero.css`)** — it stays the page-substrate margin grid (the StoryHero page-redesign chrome). This wave re-expresses its VOCABULARY as a library token; it does NOT delete or re-home the demo recipe (the demo page-ground grid and the card-interior grid are distinct surfaces — the page-margin grid is correct as a page-ground layer; the new register is the through-card half). If a future wave unifies them onto the library token that is a separate concern.
- **The `--glass-level` / `--glass-tint-*` / dark-material token seam** — W-DARK-MATERIAL (BA, landed) owns them. The `.paper-grid` dark arm reads the resolved `--foreground` / `--card`; it never re-declares a glass-ladder or dark-material token.
- **The speedtest / value.js / kf / slides foreign trees** — the cross-repo fence HOLDS (this is a PRIMITIVE-band wave, not the slides-drive). The agent READS `ASK-GU-PAPER-GRID-TEXTURE.md` for the contract; it never edits the speedtest tree. speedtest consumes via the `^4.1.0` pin bump at AW.W7 (its WG/WV1 named-YELLOW interim deletes when this ships).
- **The standing fences** — the GL shader internals (no shader here — pure CSS texture); ppmycota purple / demo color never enters the token (the line ink is `--foreground`-derived; `--paper-grid-opacity` is a presets-in-consumers knob).

## Hard Gate

`proof:paper-grid` (born-RED at HEAD, driven GREEN by the wave) — four falsifiable device-free SOURCE witnesses (the comment-strip + pure-detector house pattern, mirroring `proof-surface-axis.mjs`/`proof-suffuse.mjs`), each red at HEAD pre-wave, AND the binding π readback:

1. **W1 — the geometric peer exists in the paper-cascade.** `--paper-grid-texture` + `--paper-grid-texture-size` (+ the `--paper-grid-opacity` strength knob) are declared in `scale-paper.css` in the SAME `:root` cascade context as the organic `--paper-clean-texture`/`--paper-aged-texture` peers (the source assert: the token name resolves a two-frequency grid `background-image` form — a MINOR cell + a MAJOR rule, NOT a single uniform line; the ink is a `color-mix(… var(--foreground) …)` form, NOT a hardcoded `hsl()`). RED at HEAD: `grep paper-grid-texture src/` returns ZERO. **Bite (anti-evasion):** the ink-color assert reads the token VALUE and reds a hardcoded `hsl()`/`oklch()` line color (the no-gray / token-first floor — a `--foreground`-derived mix is required so the grid re-tints in lockstep).
2. **W2 — the `.paper-grid` opt-in utility paints the interior ground.** A `@utility paper-grid` (or `.paper-grid` class) in `cards.css` composes `--paper-grid-texture` as the interior ground at `--paper-grid-opacity`, clipped to `border-radius: inherit`, with a `.dark .paper-grid` arm re-pointing the ink/blend for the dark card interior. RED at HEAD: no such utility. **Bite:** the dark arm uses a PLAIN-ancestor `.dark .paper-grid` (NOT a scoped `:global()` — the recurring scoped-global-drop trap); the gate asserts the dark arm is present AND is a plain-ancestor selector.
3. **W3 — the a11y guards mirror `paper.css`.** `.paper-grid` honors `@media (prefers-reduced-transparency: reduce)` (opacity → 0) — the SAME a11y block `paper.css:55-67` establishes (one idiom, not a grid-local fork). RED at HEAD: no utility, no guard. Source-asserted (the media block reaches `.paper-grid`).
4. **W4 — Card threads the additive `grid` axis, default OFF.** Card carries the `grid?: boolean` prop (default `false`) composing `.paper-grid`/`data-grid` when true, mirroring the `grain` axis shape — and the default-OFF means a bare `<Card>` is byte-identical to HEAD. RED at HEAD: no `grid` prop on Card. **Bite (no-regression):** the gate asserts the prop default is OFF (a default-ON would change every existing card — the additive-not-default-changing floor); the existing `grain` axis + its default are UNTOUCHED.

5. **The π binding readback** (the cardinal-lesson DELTA, captured own-surface, BOTH modes, AZ-form freshness header): a live capture of a `<Card grid>` document card over its real backdrop with a paired π `getComputedStyle` + a grid-diff stroke-coverage readback proving (a) the `.paper-grid` card's interior contributes ≥ JND grid stroke-coverage where a bare `<Card>` (no `grid`) contributes 0.0000 (the ask's binding acceptance — the occlusion-defeat closed: the grid now reaches the card interior, not only the page margin); (b) the grid is LEGIBLE on BOTH the light cream card interior AND the dark near-black card interior (the scheme-aware dark arm holds); (c) the grid is a STATIC raster — no paint-path allocation on scroll (a CDP/`requestAnimationFrame` paint-count probe stays flat through a scroll, the compositor-cached discipline). Captured to `docs/tranches/BB/audit/visual/W-PAPER-GRID-TEXTURE-DELTA.md` with before/after frames (the bare card → the `.paper-grid` card, the brand pillar now felt THROUGH the plate), BOTH modes.

6. **The `proof:ba-gestalt` verdict** (BA inv-4 — the P-1 close-class fix). Per-mechanism W1-W4 greens do NOT close this visual wave. The owning surface (the foundations/display band — the document-paper register on the gestalt roster) is captured WHOLE-PAGE, BOTH modes, over its real backdrop, and judged as a gestalt ("does the math/grid pillar now read THROUGH the document card as a calm structural underlay — felt, not a cage?"). The verdict is recorded with the capture in the gestalt artefact; a FAIL deploys the research→wave-spec→redress triumvirate (W-REFLECT3, Batch 7). A source-green/visually-broken gap (the AZ failure class — mechanisms green, the grid still in the margin only) does NOT close.

W1-W4 are the device-free CI half (`proof:paper-grid`); the π readback (W5) + the gestalt verdict (W6) are the binding visual truth. All must hold for a clean close.

## Format And Lint Cadence

`npm run typecheck` (vue-tsc) after the Card `grid`-prop edit (the additive axis must thread cleanly with the existing `grain`/`surface`/`tier` props); `npm run build` after the `scale-paper.css` peer + the `cards.css` utility (confirm the `/styles` bundle compiles the new token + utility); `node scripts/proof-paper-grid.mjs` born-RED before the source edits (proof it fails at HEAD — `paper-grid-texture` absent), GREEN at close; `npm run proof:gate-script-parity` + `npm run proof:gate-manifest-sound` after the package.json/gates.mjs registration (the harness stays sound); the π `tests-visual/paper-grid.spec.ts` against a provisioned render server (the W-VISUAL-RUNNER lane); `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BB/audit/visual/W-PAPER-GRID-TEXTURE-DELTA.md` — the before/after frames (bare card → `.paper-grid` card, the pillar felt THROUGH the plate) + the paired π readback (the ≥ JND interior stroke-coverage vs the bare-card 0.0000, both modes, the static-raster paint-count) + the AZ-form freshness header (capture date, HEAD sha).
- The `proof:paper-grid` JSON artefact (born-RED `paper-grid-texture`-absent log → GREEN peer+utility+a11y+Card-prop log).
- The `gate-script-parity` + `gate-manifest-sound` GREEN-at-close outputs (post-registration).
- The `proof:ba-gestalt` foundations/display-band capture + recorded verdict (the W-REFLECT3 binding evidence).

## Commit Plan

- impl commit: `feat(paper): the --paper-grid-texture geometric peer + the .paper-grid card-interior register + the additive Card grid axis (BB.W-PAPER-GRID-TEXTURE)` — names the peer token (§12), the `.paper-grid` opt-in + dark arm + a11y guards (cards.css), and the default-OFF Card `grid` prop in the body.
- gate commit: `test(paper): proof:paper-grid born-RED→GREEN + the π readback + parity registration`.
- doc/status commit: the CLAUDE.md geometric-peer canon record + the DELTA doc + the BB PROGRESS rows.

## Dependencies

- **Depends on**: the Batch-0 integrity floor (the gate harness is trustworthy) + the Batch-1 gestalt hardening (the `proof:ba-gestalt` verdict this wave closes against is the HARDENED both-mode/content-verified gate, not the BA desktop-PNG-existence stub). No structural dependency on a sibling primitive — this wave adds ONE peer + ONE utility + ONE Card prop in files no sibling writes.
- **Blocks**: speedtest AW.W7 (the R-CONSUME wave — speedtest's W3 cert-grid interior + WV1/dashboards opt the document-register cards into `.paper-grid`; the WG/WV1 named-YELLOW consume-and-delete interim deletes when this ships at 4.1.0). The ≥2-consumer bar is met by speedtest W3 (cert-grid) + WV1 (dashboards) at birth (`BB-AMENDMENT-crossrepo.md §A1 P1` names both); the demo math-paper demonstration is the library's own third.

## Archaeology

No prior attempt in the library — the geometric paper-cascade peer is net-new (the organic half shipped end-to-end; the grid never had a card-interior register). The grid lived as a demo-private page-substrate recipe (`.story-bg-grid`) + the speedtest page `body::before` substrate; BOTH are page-ground layers an interior plate occludes (the D2-§2.1 occlusion defeat). The speedtest ASK was routed at AW.WG.2 (the page-substrate blend root-fix landed speedtest-side; the card-interior half is glass-ui's, this wave). The guardrail carried from AZ.W-DOCK-RAIL + the BA surface-axis class: the W2 bite asserts the dark arm is a PLAIN-ancestor `.dark .paper-grid` (the scoped-global-drop trap is the recurring class), and the W5 π readback is the binding visual truth — because the AZ failure class (a green source gate over a still-occluded render) is exactly the occlusion defeat this wave closes, the gate proves the RENDERED grid reaches the card INTERIOR (≥ JND stroke-coverage vs the bare-card 0.0000), both modes, not the token-presence alone.

## Named successors

- **speedtest AW.W7 (R-CONSUME)** — consumes `.paper-grid` on the W3 cert-grid + WV1/dashboards document cards (the cross-repo consume; the WG/WV1 interim deletes).
- The ONE conditional: if the §6 demo demonstration reveals the demo-private `.story-bg-grid` page-substrate recipe SHOULD fold onto the new `--paper-grid-texture` token (the page-margin grid and the card-interior grid sharing ONE source), that unification is a SEPARATE concern — booked, not folded here (this wave mints the card-interior register; the page-substrate re-home is a demo-chrome consolidation a later doc-sync wave owns). The library token is the single source either way; the demo's adoption of it is the successor's call.
