<!-- surface-paths: src/components/custom/icon-chip/IconChip.vue, src/components/custom/icon-chip/index.ts, src/components/custom/icon-chip/types.ts, src/styles/icon-chip.css, src/styles/index.css, src/subpaths/icon-chip.ts, src/index.ts, src/api/index.ts, src/components/custom/metric-cell/MetricCell.vue, demo/stories/foundations/icons.vue, demo/stories/compositions/empty-states.vue, demo/stories/compositions/auth-shell.vue, scripts/proof-icon-chip.mjs, scripts/proof-suffuse.mjs, scripts/gates.mjs, package.json, tests-visual/icon-chip.spec.ts -->
<!-- surface-hash: c659a3f5e6808405a7e224787f1aa9c8dd4a6eeb356869cf35caed20202be782 -->
<!-- AZ.W-GATES content-hash freshness model: fresh IFF the 17 surface-paths' bytes are
     byte-identical to capture time (sha256 of the concatenated bytes). Captured own-surface
     at :5199 against the live demo cascade (the demo imports ../src/styles/index.css, so the
     `.icon-chip` recipe + the `--section-color-N` ramp + the duotone/bloom/reveal axes all
     resolve), both the chromium-headless-new (1280×800) + coarse-touch (390×844) projects,
     BOTH modes. -->

# BA.W-ICON-CHIP — DELTA (the binding π readback, captured own-surface, BOTH modes)

**Wave**: BA.W-ICON-CHIP — the `<IconChip>` section-color pop primitive (the `color-mix` backplate recipe + the chip≤glyph ratio + the duotone/bloom/reveal axes; the four inline `:style` chip pastes collapse onto it).
**Captured**: tranche/BA HEAD, against the live demo at `:5199` `/foundations/icons` + `/compositions/empty-states`.
**Gate**: `proof:icon-chip` (born-RED at HEAD — the `icon-chip/` dir did not exist, `grep IconChip src` = 0 → GREEN 6/6 witnesses). **π**: `tests-visual/icon-chip.spec.ts` (12 passed — 2 projects × 2 modes × 2 viewports + the empty-states grid + the duotone-fill arm).
**Freshness**: this DELTA reflects the HEAD source at capture; the frames + the paired π readback are the binding truth, not a commit-message claim (the cardinal-lesson discipline).

## The defect (HEAD, pre-wave — POP-1/POP-2/POP-3)

The section-color icon-chip register — the brand's ONE color event per surface — was a hand-rolled inline `:style` paste copy-pasted across FOUR surfaces with NO owning primitive:

- `demo/stories/foundations/icons.vue:148` — the canonical 48px/22px Pops reference (`color-mix(in srgb, var(--section-color-${pop.section}) 25%, transparent)`).
- `demo/stories/compositions/empty-states.vue:134` — the applied twin at 56px/24px + a dead `hue-rotate(var(--hue-shift,0deg))` (always 0) + a `--muted` fallback.
- `demo/stories/compositions/auth-shell.vue:99` — the trust-badge twin at 32px/16px.
- `src/components/custom/metric-cell/MetricCell.vue:142` — the leading-glyph tint (`:style="iconColor ? { color: iconColor } : undefined"`) — the chip recipe MINUS the plate.

A new surface that wanted a pop had to re-paste the recipe and re-derive the chip≤glyph proportion by hand. The register was FLAT-STATIC (no hover-bloom, no duotone, no entrance reveal); `vReveal` shipped but the pop showcase never consumed it; `--tier-featured` was minted with a dual arm but DEAD.

## §0 drift recorded (re-grep at HEAD)

- The three demo paste sites carry the IDENTICAL `color-mix(in srgb, var(--section-color-${…}) 25%, transparent)` recipe (confirmed). Line numbers drifted slightly: `auth-shell.vue` paste at `:97-99` (spec cited `:99-100`).
- `--tier-featured` is at `dark-arm.css:141` / `light-dark.css:156` (spec cited `:105`/`:136`) — READ-only (W-DARK-MATERIAL Batch-1 owns the arms; not re-tuned).
- The `--section-color-N` light arm primarily resolves through `color-radius.css:241+` (the spec cited `light-dark.css:126/133` — both exist). **Batch-1 RETUNED the light token values** (`--section-color-0` is now `oklch(0.552 0.192 359.8)`, a deeper rose) — so the rendered light backplate RGB differs from the pre-Batch-1 `icons-ref-light-pops.png` baseline; the RECIPE (25% srgb mix of the CURRENT token) is faithful, the token shift is Batch-1's.
- `StatusDot`/`StackedIcons` are NOT on the root barrel (spec named them as the cherry-pick "precedent"); only 4 custom packages are cherry-picked at HEAD. IconChip is ADDED to the root barrel per the spec's File Bounds + Scope 7 (vueuse-free + lightweight).
- `src/components/custom/index.ts` (in the spec's File Bounds) does NOT exist — the custom packages reach via per-package paths + `src/subpaths/` mirrors; the File Bounds entry was stale, skipped (no functional gap).

## The fix (the register minted ONCE in the primitive)

- **`src/components/custom/icon-chip/{IconChip.vue,index.ts,types.ts}`** (new, the colocation shape) — the primitive OWNS the recipe: `:section` (the `--section-color-N` ramp index, with the `--muted`/`--muted-foreground` fallback) XOR `:tone` (a complete token, the MetricCell-`iconColor` reconcile path), `:size`/`:glyphSize`/`:strokeWidth` (defaults 48/22/1.75 — the reference register), `:bare` (the no-plate register), `:duotone`/`:bloom`/`:reveal` (the three opt-in axes).
- **`src/styles/icon-chip.css`** (new) — the backplate `color-mix(in srgb, <plate> 25%, transparent)` + the full-chroma glyph + the chip≤glyph FLOOR (`max(--icon-chip-size, glyph × --icon-chip-glyph-ratio)`, ratio default 2.18 = 48/22, token-first) + the duotone `fill` under the stroke (`[data-duotone] svg`, CSS wins over lucide's baked `fill:none`) + the smooth-glass `:hover` bloom (the §6 easing doctrine, NO sparkle-sweep/btn-audacious/disco-grain — the W-GLASS-CAL disco fence) + the `vReveal`-driven entrance (`.icon-chip--reveal[data-reveal]`, PRM-gated). Mode-robust BY CONSTRUCTION — the `--section-color-N` dual arm auto-flips under `.dark` with no hardcoded dark re-declaration.
- **The interpolation space — `in srgb` (DELIBERATE, recorded).** The spec text says `in oklab`; the resolution PRESERVES `in srgb` so the pop register does not shift (the binding W7 target + the gestalt bar + the `--surface-tint-*` brand-overlay house precedent all anchor on `in srgb` — a 25% fixed-α foreground-over-transparent overlay). The triumvirate named exactly this `srgb→oklab` choice as the escalation suspect; the faithful-to-reference `in srgb` is the recorded decision, not drift.
- **The four pastes collapsed**: `icons.vue` Pops → `<IconChip :icon :section>`; `empty-states.vue` → `<IconChip :section :size=56 :glyph-size=24 :stroke-width=2>` (the dead `hue-rotate` dropped, the `--muted` fallback now in the recipe); `auth-shell.vue` → `<IconChip :size=32 :glyph-size=16>` (the floor lifts the 32px chip to ~35px = the reference proportion — the d2 enforcement working as designed); `MetricCell` → `<IconChip bare :tone=iconColor :glyph-size=iconSize>` (the value/unit ink UNTOUCHED — the d1 floor).
- **Published**: `./icon-chip` export `{types,import}` + `typesVersions` + `src/subpaths/icon-chip.ts` + `IconChip*` on `src/api/index.ts` + the root barrel. `verify-export-types` passes the `./icon-chip` probe.
- **`proof:suffuse` carve**: added the discrete `d2-chip-glyph-ratio-structural` assert (points at the component's `--icon-chip-glyph-ratio` floor, not N inline pastes) + enrolled `icons.vue`/`empty-states.vue` in the LEDGER (the d3 one-event count holds over the now-10-surface ledger against the SINGLE component).

## π readback (the binding visual truth — getComputedStyle, BOTH modes, ≥2 viewports)

| arm | assertion | result |
|---|---|---|
| (a) | the Pops stop-0 chip backplate is the TRANSLUCENT 25% section-color mix (alpha ≈ 0.25), the glyph the full-chroma section hue (NOT `--muted-foreground`) | PASS (light + dark, mobile + desktop) |
| (b) | the chip diameter ≥ the glyph (the d2 proportion holds at render) | PASS (48 ≥ 22) |
| (c) | a `.icon-chip--duotone` chip's inner svg resolves a non-`none` `fill` (the axis paints) | PASS |
| (d) | (a)+(b) hold under `.dark` (the dual-arm flip) | PASS |

**The resolved stop-0 values (the binding target match):**

- **Light** — bg `color(srgb 0.765817 0.175252 0.431083 / 0.25)` (alpha 0.25 = the 25% stop EXACT; the RGB is the Batch-1-retuned `--section-color-0`), glyph `oklch(0.552 0.192 359.8)` (= the `--section-color-0` light token), chip 48px / glyph 22px.
- **Dark** — bg `oklab(0.714143 0.146145 -0.0145688 / 0.25)` (alpha 0.25), glyph `oklch(0.721 0.145 354)` — **EXACTLY the spec's binding stop-0 target `glyph oklch(0.721 0.145 354)`** (the spec's reference was a dark-mode capture).

## Captured frames

- `W-ICON-CHIP-icons-{mobile,desktop}-{light,dark}.png` — the Pops reference row, the chip the ONE event per cell.
- `W-ICON-CHIP-empty-states-desktop-light.png` — the state-card grid chips.

## Gestalt verdict (BA inv-4)

`/foundations/icons` + `/compositions/empty-states` read as a designed whole in BOTH modes — the chip is the ONE color event on every enrolled cell (body ink untinted, chip ≤ icon scale, no rainbow), now driven by the single primitive. The pop register is byte-faithful to the reference (the dark glyph matches the spec's binding target exactly; the light RGB tracks the Batch-1 token retune). Recorded against `proof:ba-gestalt` (W-GESTALT-GATE's roster — judged there, never edited here); re-confirmed at W-REFLECT2.
