# W-H.1 · W-INK-COMPOSITE: ink on the painted composite, state separated in every cell, the PRT arm recedes, the live dock (loop D3) · 11.0.0

| field | value |
|---|---|
| seat | band-H wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `80ebfd72` in a scratch worktree (the task named `f3ad78d0`; every commit since is under `docs/`). `git diff --stat v10.1.0 HEAD -- src` prints nothing, so every reading below measures the published 10.1.0 bytes |
| kind | LOOP WAVE, owned by design loop D3 (`design/material/`). It lands only from D3's converged specification and never before D3 meets its gate |
| ships in | 11.0.0 |
| families | F-23 (whole), F-24 (remainder after W-0.1's menu-row split), F-75 (whole) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| instruments | the D3 battery `docs/tranches/BL/design/material/harness/` (`$H` below; W-C.1 moves tooling out of `docs/`, and the path follows it) and the band-H paint probe (appendix A), which lands as `scripts/probes/band-H/` with `npm run probe:band-H` |
| engines | Chromium 149.0.7827.55 is the gate engine. Playwright WebKit 26.5 rows are recorded and labelled "Playwright WebKit (paint-only: headless paints no `backdrop-filter`, and `GlassDock` crashes it)". Real-Safari cells are UNMEASURED (owner's safaridriver checkbox, OW-3) |

## 1 · What it closes

| id | what | source |
|---|---|---|
| F-23 members | L08-07 (muted fails AA on 86/92 routes light, 24/92 dark), L08-08 (dark muted on the live field on every dock story), L08-09 (glass-tier captions 1.75-2.58), L08-24 (demo status badges outside the tone law), L03b-05 (light modal plates: title 1.73, Cancel 1.54), L03b-12 (ink over saturated specimen fields), L03a-11 (the five-rung ladder reads as one plate; the specimen copy claims α 0.30-0.95) | `audit/REGISTRY.md:526-542` |
| F-23 rounds 2-8 | R2-01-07 (`contrast-color()` resolves the dock's muted ink to pure black or white), R2-08-11 (dark ink on the composite, 105 failures on 16/46 routes), R3-02-04 (the non-text half: `--ink-perimeter` calibrated to 3.0:1 on tokens; Dialog Close 1.79), R8-02-04 (the selection register: 0 `::selection` rules) | `REGISTRY.md:530-541` |
| F-24 members (remainder) | L03a-09 (the veil decoration gone in dark), L03a-14 (the dark shadow ladder), L03b-06 (hero fields ignore dark), R2-08-02 (selection carried only by the veil plate), R3-02-02 (the Command cursor is fill-only), R3-02-11 (PCM moves no ink), R3-02-12 (the capsule hover under PRM), R3-02-13 (the Slider value is a hue step), O-61 R-2 (the spectrum range is transparent, so an enabled timeline reads disabled) | `REGISTRY.md:544-563` |
| F-75 | R2-08-01 (the PRT block writes `--aurora-ceiling-a11y: 1`), R3-02-06 (muted falls on 36 of 41 routes under PRT; the ring loses its last pixels at 3:1) | `REGISTRY.md:952-962` |
| inbound, F-23 | UIA-V-114, UIA-KF-075, UIA-V-329, UIA-V-568, UIA-KF-170; UIA-F-27's 3.2:1 ink half | `audit/INBOUND-MAP.md:309,312,356,362,446,279` |
| inbound, F-24 | UIA-F-78, UIA-F-125, UIA-KF-236, UIA-KF-240, UIA-V-392, UIA-V-613, UIA-F-127, UIA-V-350, UIA-F-131, UIA-V-666, UIA-KF-286, UIA-F-90, UIA-KF-042, UIA-KF-106, UIA-F-135, UIA-V-594, UIA-KF-226, UIA-F-143, UIA-F-144; O-66 §1's menu item in dark and under PRT/PCM (the light row is W-0.1's) | `INBOUND-MAP.md:159-456,624` |
| C-2 row 1 | the live dock's near-clear veil (/0.14 in dark with text reading through); chicago's `max(<token>, 0.62)` floor is its consumer override | `INBOUND-MAP.md:550`; `ledger/CENSUS.md` |
| ledger | #10's five dark-α ink and fill measurements (routed to F-23, `ledger/census-register-a.md:30`); #80's remainder (dark primary and secondary render alike, `census-register-b.md:65`); #83's perimeter half (the FC rows are F-39's, W-K.4) | PLAN §7 band H |

**How the dark members close.** L03a-09 (the veil gone in dark) closes on W-H.2's M-6 row, the separable dark ladder; this wave records it as an F-24 member. L03b-06 (hero fields ignore dark) closes on G1's dark aurora rows for the stage prose and on the demo hero configs taking a dark twin (`demo/chassis/hero/aurora-hero.ts:250,333`, `StoryHero.vue:60`, `DockStage.vue:49`). L03a-14 does not reproduce as a separability defect (§2); its remainder is UIA-KF-240's direction question, closed by D3's ruling and G17.

**Not closed here.** The light veil token and the light menu row are W-0.1's. The veil's frost, the transmissive well, the inert lenses, the dark ladder (M-6) and chrome calm (M-8) are W-H.2's. The ring register's forced-colours arm is W-K.4's (F-39); it reads this wave's ink. The Slider spectrum fill hook as a public API is W-L.1's (F-71); this wave paints the value mark it needs. The one #31 item routed to F-23 is #31g (the rendered-contrast invariant), and it closes here on G1 and G2; no #31 item goes to band K.

## 2 · The defect at HEAD

- **Ink is derived against the token ground.** `--on-glass-muted: hsl(30 26% 35%)` claims "5.76:1 vs plate" (`src/styles/tokens/on-glass-fg.css:35`); the dark arm claims 7.52:1 (`tokens/dark-arm.css:301`). `--ink-perimeter: 0.48` claims 3.0:1 (`tokens/color-radius.css:147`) on token grounds. The plate paints the veil-ink mix over whatever lies behind it (`styles/glass/veil.css:57-82`), so every ratio is decided by the backdrop, not the token.
- **The dock ink is binary.** `--dock-fg-on-aurora` and `--muted-foreground` are `contrast-color(var(--card))` in every dock (`components/dock/styles/adaptive-legibility.css:71-72`); the bright bucket does the same for plates (`styles/glass/ladder.css:276-278`). `contrast-color()` returns black or white only (D3 SPECS S-3).
- **The Dialog Close ring is a hand literal**, `color-mix(in oklab, var(--foreground) 48%, transparent)` (`components/dialog/styles.css:144,243`), outside `--ink-perimeter`.
- **No selection register.** `src` has 0 `::selection` rules, so selected text paints the UA highlight under ink derived for the plate.
- **State rides one channel.** The dock's selected control is `--dock-control-active-bg: var(--glass-plate-floating)` (`styles/tokens/sizing.css:207`); the menu and Command row is `--menu-row-bg: var(--glass-plate-quiet)` (`components/_shared/menu/menu.css:10`, painted at `:46,67`); the Command cursor is `aria-activedescendant`, so the row never takes focus and never shows the ring. PCM sets only `--glass-level: 0.3` and `--glass-definition: 1` (`styles/glass/a11y-fallback.css:37-46`) and moves no ink. Under PRM the capsule hover retires its only visible channel (`styles/glass/glass-capsule.css:132-139`). The Slider range is a warm tint over the track (`components/slider/styles.css:138-142`) and the spectrum range is transparent by design (`:246-256`).
- **The PRT arm lifts the field.** `@media (prefers-reduced-transparency: reduce) { .aurora-root { --aurora-ceiling-a11y: 1 } }` (`components/aurora/Aurora.vue:338-342`), read before the consumer's ceiling at `:255`. The forced-colours arm beside it (`:347-355`) paints a solid ground instead.
- **The live dock has no signal.** Every readback of the WebGPU field returns alpha 0; the dock stamps `sample-unavailable` or `source-unavailable` and its plate stays at its thinnest veil (D3 SPECS S-13; W-G.3 §2).

Measured here. The D3 battery ran on this worktree (`node $H/run.mjs <wt> --label hH`, 68 cells and 8 live windows in 663.7 s at load 181; every witness exits 1):

| witness (this wave's) | HEAD, Chromium gate |
|---|---|
| M-2 text contrast | **FAIL 169 of 560**. Light over paper: the real Dialog fg 3.50, muted 1.32 (and Playwright WebKit 3.51 / 1.32) |
| M-3 non-text ≥ 3:1 | **FAIL 237 of 266**. The Dialog over light paper: well perimeter 1.39, ring 1.80-1.81; over light black: Close ring 1.02-1.03; dark paper Close 3.96-4.05, well perimeter 2.35 |
| M-4 dock register | **FAIL 14 of 14**: fg = muted = `#000000` in every light cell and `#ffffff` in every dark cell (ΔL_OK 0.000) |
| M-5 live dock | **FAIL 6 of 16**: the dock fed the field makes 36 `getImageData` per 9 s, readback alpha max 0.000, `sample-unavailable`; the default dock `source-unavailable` |
| W-C (ink follows) / W-E (ink ground) / W-A / W-B / W-F | FAIL 284/304, 229/360, 68/197, 20/24, 75/152 (the family witnesses; §5 G6) |

The band-H probe (appendix A) at HEAD, Chromium, prints `VERDICT head: 32 FAIL of 40 gated rows`; this wave's rows are 20 FAIL of 24:

| row | HEAD, Chromium (Playwright WebKit, recorded) |
|---|---|
| H1/SELECTION | light: selected muted on paper **3.56** (ground `#b1d5fc`), on the floating plate **3.70**; dark: **3.19**, **4.18**. 0 `::selection` rules. (WebKit light 3.56, 3.71) |
| H1/CMD-CURSOR | highlighted row vs plate **1.20** light, **1.00** dark; ring leg 1.20 / 1.00; `outline-style: none` on the `[data-highlighted]` row. (WebKit 1.20 / 1.00) |
| H1/PCM-MUTED | light, `prefers-contrast: more`: muted **5.96 / 5.70 / 5.46** on wash / resting / overlay over paper against 5.62 / 4.80 / 4.04 without it: the plate firms and the ink does not move. Dark 8.18-8.25 (passes) |
| H1/PRM-HOVER | SegmentedTabs, reduced motion: **0** pixels change on hover, both themes (the rest and hover PNGs are byte-identical: sha256 `2f9705d9ae28…` light, `30d7616b2d8a…` dark) |
| H1/EMPHASIS | primary vs secondary Button fill: light ΔE_OK **0.008** (`#ddd2c2` vs `#ded4c7`); dark 0.062 (passes the 0.05 floor, ratio 1.17) |
| H1/SLIDER-VALUE | default: fill vs track **1.30** light, **1.96** dark; spectrum: **1.00** (the range is the track), value mark 1.19 / 1.36 |
| H1/PRT-RECEDE | `prefers-reduced-transparency: reduce` (CDP-emulated): `.aurora-root` opacity **0.5 → 1**; page muted over the field **2.66 → 1.35** light, **3.75 → 1.50** dark |
| H1/DOCK-STATE | active tab vs resting tab **1.40** light (`#c6c3bc` vs `#e6e5e1`), **1.01** dark |

**One member does not reproduce as written.** L03a-14 reads "the dark shadow ladder is illegible: xs…2xl … indistinguishable". Appendix B measured the cast halo 6 px below boxes carrying `--shadow-sm` … `--shadow-2xl` on the page: dark ΔE_OK from the page 0.003 / 0.024 / 0.046 / 0.074 / 0.131, adjacent steps 0.021-0.057, wider than light's 0.012-0.046 (Chromium; Playwright WebKit agrees within 0.01). The dark rungs separate. What the capture shows instead is UIA-KF-240's reading: in dark every halo is **lighter** than the page (mean RGB +0.7, +5.0, +9.7, +16.3, +32.0 at 6 px), a glow, not a shadow. Whether a dark elevation is a glow or a lifted surface is a material decision, so it goes to D3 as an obligation (with UIA-KF-240), and this wave carries a hold line that the dark ladder stays separable (§5 G17). `sm`'s halo at 6 px is under 0.01 in both themes; that is its reach, not a dark defect.

## 3 · The cure

D3 owns the design. This wave builds D3's converged specification for the ink, the state channels and the live dock, and only the parts W-0.1 did not ship.

### 3.1 · The entry gate

D3 meets the charter's convergence criterion (`CHARTER.md:82,86`): at least three full passes, zero enumerated open gaps, a fresh adversarial audit by seats that did not author the winning spec, and two consecutive clean passes. Its battery holds on the converged prototype (PLAN §4; `design/material/PORTFOLIO.md:631-670`): M-1..M-8 green in both themes over paper, the aurora at ceilings 1 and 0.5 and the hostile grounds, plus the converged family's own witness. At this seat D3 is in pass 1: the six family specs are banked (`design/material/pass-1/SPECS.md`, commit `e5f787ab`), prototypes are running, and there is no REGISTRY. The gate is **not met**.

Three obligations go to D3 from this seat, because the battery as written does not hold them: a **PCM cell** and a **PRM cell** in M-2 and M-3 (the registry's invariant runs in D, DK, PRT, PCM and PRM, `REGISTRY.md:559`); a **selection row** in M-2 (R8-02-04); and the **dark elevation direction** (UIA-KF-240: the dark cast shadows paint as a glow, §2). The rows in §5 G7-G14 and G17 are the measure; the loop adopts them or states a stronger one.

### 3.2 · What lands, whatever route converges

These rows follow from the registry's wave shapes and from facts every D3 family inherits (SPECS S-3, S-12, S-13). They do not pre-empt the route: every family spec already carries them or leaves them open.

1. **Ink derived against the painted composite.** `--on-glass-muted`, `--on-glass-muted-strong` and `--ink-perimeter` stop being token-ground constants. Their values, or their formulas, are the converged route's (a bound in A, a solve in C, the solver output in D, a self-ground in E, the band in F). The token comments that quote ratios the paint does not reproduce (`on-glass-fg.css:35-36`, `dark-arm.css:301-302`, `color-radius.css:147`) are rewritten to cite the battery row that measures them.
2. **`contrast-color()` leaves every glass ink.** `adaptive-legibility.css:67-73` and the bright bucket's ink block at `ladder.css:254-280` are deleted. The dock reads the converged muted and fg rungs, so M-4 holds (D3 common floor row 2, `PORTFOLIO.md:234`). `Timeline.vue:642`'s accent stroke is not glass ink and stays.
3. **The Dialog Close ring routes through the perimeter rung.** `dialog/styles.css:144,243` read the ring token; no hand literal remains (S-12).
4. **One selection register.** A `::selection` background and ink per theme, derived against the plates, declared once in `src/styles/` (R8-02-04's correction, `REGISTRY.md:541`).
5. **State, value and emphasis separate in every cell.** Each is carried by a second channel that survives dark, PRT, PCM and PRM:
   - the Command and listbox cursor: the ring paints on a `[data-highlighted]` row whose listbox owns `aria-activedescendant` (the ring register itself is W-K.4's; this wave makes the row carry it);
   - the dock's selected control: `--dock-control-active-bg` stops aliasing `--glass-plate-floating` and takes an accent tint or ink the converged spec names;
   - PCM: an ink arm in `a11y-fallback.css` moves muted, perimeter and ring, not only the plate;
   - PRM: the capsule hover keeps a light rung that is not motion (`glass-capsule.css:132-139` keeps the specular catch and adds the rung the spec names);
   - the Slider: the value carries a mark ≥ 3:1 from its track at rest in both variants; the spectrum variant's thumb, or a mark, is that channel (O-61 R-2);
   - emphasis: the primary and secondary Button fills separate in both themes.
6. **The PRT arm recedes the field.** The Aurora PRT block stops writing `--aurora-ceiling-a11y: 1`. It takes the forced-colours arm's route, a solid ground under page text (`Aurora.vue:347-355`), so a user who asked for less transparency never gets more field (F-75's wave shape, `REGISTRY.md:959`). The four hero routes where the field is the subject are the owner-glance row (§6).
7. **The live dock is legible with no DOM readback** (M-5). Whichever route converges, the dock clears M-2 over the aurora in both themes with 0 `getImageData` and 0 `readPixels` on the main thread.

### 3.3 · What the converged route decides, and how it lands

The route is D3's. The landing rule is fixed here: the converged spec's "wave split" table assigns each row to W-0.1, this wave or W-H.2, and this wave builds its rows exactly as specified, with no second recipe. By route, the ink and live-dock rows this wave would carry are (from `SPECS.md` A.2, B.2, C.2, D.2, E.2, F.2):

| route | the ink this wave lands | the live channel this wave lands |
|---|---|---|
| D3-A ground pole | static inks re-derived against the bound; `--ink-perimeter` 0.52 on the chrome composite | the sampler's glass consumer deleted: the clamp at `veil.css:58-72`, the knee, `--glass-backdrop-luma` and its `@property`; `backdropMode` narrows to `"glass" \| "opaque"` |
| D3-B field signal | static inks | this wave builds the field-luma publisher and the dock's subscription (§3.5); the plate reads it through `--field-luma-lo`; `declareField(el)` published |
| D3-C cascade ink | every ink rung a relative-colour solve against `--glass-composite` (the exact `srgb-linear` form, S-4) | `--glass-ground` declared per scope; the sampler's glass consumer deleted |
| D3-D calibrated ladder | the solver's ink outputs in `tokens/glass.solved.css` | as A |
| D3-E self-grounded ink | the stroke-or-halo ground on every glyph, two-tone indicators, the FC and print arms | as A |
| D3-F yielding field | static inks against the band | the substrate's well; `backdropMode: "live"` keeps its name with the new meaning |

W-G.3's idle-loop cure stands on every route. A route that deletes the live glass channel (A, C, D, E) deletes W-G.3's glass consumer, not W-G.3's registry (PLAN §5 note).

### 3.5 · The field-luma publisher (D3-B only)

A mechanism a loop is still choosing is built by that loop's wave (PLAN §1). The publisher exists only on D3-B, so it lands here, not in band G; on routes A, C, D, E and F this section is void and its gates are struck with the route's ruling.

1. **Every field publishes its luma.** The lifecycle configures the canvas with `usage: RENDER_ATTACHMENT | TEXTURE_BINDING`. At most every 250 ms after a presented frame, it encodes one compute pass (`webgpu/shaders/luma-grid.wgsl.ts`) that reduces the current texture to a 16×16 grid of (mean OKLab L, mean alpha), copies it to a `MAP_READ` buffer and reads it with `mapAsync`: no main-thread block, no 2D canvas. `webgpu/fieldLuma.ts` holds `Map<canvas, { grid, at }>` with `subscribe(canvas, fn)`, and the canvas carries `data-field-luma` (the grid's alpha-weighted mean L, 3 decimals) for witnesses. The registry is internal.
2. **The dock subscribes.** In live mode `GlassDock` subscribes to the field under it and every `[data-backdrop-sample-state]` reads `sampled`. W-G.3 leaves live mode reading `unavailable` until this lands (W-G.3 cure 1).

## 4 · Files it touches

- `src/styles/tokens/on-glass-fg.css`, `tokens/dark-arm.css:301-303` (the ink rungs), `tokens/color-radius.css:147` (the perimeter rung), and a new `::selection` block in `src/styles/` beside the ink tokens.
- `src/styles/glass/ladder.css:182-209,254-280` (the static ink block and the bright bucket's `contrast-color()`), `src/components/dock/styles/adaptive-legibility.css:57-74`.
- `src/components/dialog/styles.css:144,243`.
- `src/styles/tokens/sizing.css:207`, `src/components/_shared/menu/menu.css:10,46,67` (dark and preference arms of the row; the light row is W-0.1's), the Command row's ring hook (`src/components/command/`), `src/styles/glass/a11y-fallback.css:37-46`, `src/styles/glass/glass-capsule.css:132-139`, `src/components/slider/styles.css:138-157,246-256`, `src/components/button/styles.css` (the emphasis fills).
- `src/components/aurora/Aurora.vue:338-342`.
- By route (§3.3): `src/styles/glass/veil.css:57-82`, `src/styles/tokens/glass-fx.css:145`, `src/styles/tokens/property-regs.css:169-172`, `src/components/dock/GlassDock.vue:118-133`, `src/composables/glass/{backdropLuminanceSample,useGlassBackdropLuminance,backdropSampleMath}.ts` (746 lines, whatever W-G.3 left of them).
- `tests/styles/contrast-computed.test.ts:28,594-643`: the token-vs-`var(--background)` gate L08-07 names is replaced by the painted battery rows (P-3); W-A.2's roster records the swap.
- `demo/chassis/hero/aurora-hero.ts:250,333`, `demo/chassis/hero/StoryHero.vue:60`, `demo/stories/dock/_frame/DockStage.vue:49` (the hero fields' dark twin, L03b-06).
- `demo/stories/substrates/glass-panel.vue:23-27` (the specimen copy that claims α 0.30-0.95, L03a-11) and `demo/stories/data/table.vue` badges (L08-24, routed through the Badge tone API).
- `scripts/probes/band-H/` (appendix A) and its npm script.

## 5 · Acceptance gates

All gates read painted pixels unless the row says "static" (P-3). Setup, in a scratch worktree carrying the candidate `src`:

```sh
export D3_OUT=.cache/evidence/W-H.1/d3out; H=docs/tranches/BL/design/material/harness
node $H/run.mjs <wt> --label h1                         # build, capture, every witness
node scripts/probes/band-H/build.mjs <wt> h1 && ENGINES=chromium,webkit node scripts/probes/band-H/measure.mjs h1
```

| id | gate | passes when | HEAD reading (run here) |
|---|---|---|---|
| G1 · M-2 | `node $H/m2-text-contrast.mjs $D3_OUT/caps/h1` | exit 0 | **exit 1**, FAIL 169 of 560 |
| G2 · M-3 | `node $H/m3-non-text.mjs $D3_OUT/caps/h1` | exit 0 (the Dialog Close ring included) | **exit 1**, FAIL 237 of 266 (Dialog light paper ring 1.80) |
| G3 · M-4 | `node $H/m4-dock-register.mjs $D3_OUT/caps/h1` | exit 0 | **exit 1**, FAIL 14 of 14 |
| G4 · M-5 | `node $H/m5-live-dock.mjs $D3_OUT/caps/h1` | exit 0: 0 readbacks and the dock legible over both ceilings, both themes | **exit 1**, FAIL 6 of 16 (36 `getImageData`, alpha 0) |
| G5 · no binary glass ink (static) | `! git grep -nE 'contrast-color\(' -- src/styles/glass src/components/dock` | exit 0 | **exit 1**: `ladder.css:276-278`, `adaptive-legibility.css:71-72` (plus comment lines) |
| G6 · the converged family's witness | the one of `$H/wa-…` to `$H/wf-…` D3 converges on, on `caps/h1`, restricted to the rows the converged split table gives this wave | exit 0 | all six exit 1 (§2) |
| G7 · selection | `measure.mjs` rows `H1/SELECTION` | selected muted ≥ 4.5 on paper and on the plate, both themes | **FAIL 4 of 4**: 3.56, 3.70, 3.19, 4.18 |
| G8 · the cursor | rows `H1/CMD-CURSOR` | the highlighted row separates from its plate ≥ 3:1 by fill or ring | **FAIL 2 of 2**: 1.20, 1.00 |
| G9 · PCM moves ink | rows `H1/PCM-MUTED` | muted ≥ 7:1 (the enhanced-contrast register, WCAG 1.4.6) on wash, resting and overlay, both themes | **FAIL 3 of 6**: light 5.96, 5.70, 5.46 (dark 8.18-8.25 pass) |
| G10 · PRM hover | rows `H1/PRM-HOVER` | ≥ 5% of the hovered item's pixels move by ΔE_OK ≥ 0.02 under reduced motion | **FAIL 2 of 2**: 0 px |
| G11 · emphasis | rows `H1/EMPHASIS` | primary vs secondary fill ΔE_OK ≥ 0.05, both themes | **FAIL 1 of 2**: light 0.008 |
| G12 · the value mark | rows `H1/SLIDER-VALUE` | fill or value mark ≥ 3:1 from the track at rest, default and spectrum, both themes | **FAIL 4 of 4**: 1.38, 1.19, 2.28, 1.36 (the best of fill and mark). The Progress cell (W-SLIDER-PROGRESS's other half; fix-2's probe, scene `progress`, value 50, rows `W-H.1/PROGRESS-VALUE`) is a hold line: fill against track 12.40 light, 8.22 dark, Chromium and Playwright WebKit alike; bite, a fill rung that drops below 3:1 |
| G13 · PRT recedes | rows `H1/PRT-RECEDE` (Chromium; the media feature is CDP-emulated) | page muted ≥ 4.5 under PRT and not below the same text without PRT | **FAIL 2 of 2**: 1.35 (2.66 without), 1.50 (3.75 without) |
| G14 · dock state | rows `H1/DOCK-STATE` (Chromium; the dock crashes Playwright WebKit) | active vs resting control ≥ 3:1, both themes | **FAIL 2 of 2**: 1.40, 1.01 |
| G15 · the Close ring is the rung (static) | `! git grep -n 'var(--foreground) 48%' -- src/components/dialog` | exit 0 | **exit 1**: `styles.css:144`, `:243` |
| G16 · no regression | M-1, M-6, M-7, M-8 at `h1` against W-0.1's landing | every row PASS there is PASS here | hold line; W-H.2 owns their cure |
| G17 · the dark elevation ladder stays separable | `node scripts/probes/band-H/shadow.mjs h1`, field `adjacentStep` | dark adjacent steps md→2xl ≥ 0.01, and every halo's direction is the one D3's converged spec states (glow or shadow) | hold line: HEAD dark steps 0.021-0.057 (appendix B). Not born RED: the separability defect does not reproduce (§2) |
| G18 · the HandMark band holds | fix-2's probe, scene `handmark`: the mark's stroke band against its plate, light and dark | ≥ 4.5:1 in both themes and both engines | hold line: 10.86 light, 6.37 dark, Chromium and Playwright WebKit (PNGs `e21c0da9c262…`, `7ddbea0d9e73…`, `23b6a9b44efe…`, `146dfd738dd9…`). Moved here from W-B.6 (B6-G4). Bite: a muted rung that drops the mark below 4.5 |
| H1-G19 · each field publishes its luma (D3-B) | on `/`, content hidden (`main, header, nav { visibility: hidden }`), the shell field canvas's `data-field-luma` is within 0.03 of the OKLab mean L of a screenshot of the canvas rect, read 1 s apart twice; the same on `/substrates/blob` for the blob canvas | both | **absent** (no `data-field-luma` key on either canvas at HEAD). Moved from W-G.1 (G1-G9) |
| H1-G20 · the dock samples (D3-B) | every `[data-backdrop-sample-state]` on `/dock/overview` reads `sampled` | all | **0 of 3** (`source-unavailable` ×2, `sample-unavailable` ×1). Moved from W-G.3 (G3-G2) |

**The gates can pass.** `FIXTURE=1 node measure.mjs` plants a stylesheet (a `::selection` pair, a ring on `[data-highlighted]`, a PCM ink rule, a hover fill, a primary fill, a visible thumb, a solid ground under PRT, an accent dock tab; appendix A). It is a gate fixture, not a design. It reads **0 FAIL of 40**, against 32 of 40 at HEAD. The battery's own planted-defect selftest covers G1-G4 and G6 (`$H/selftest.mjs`, 30 of 30 expectations, `HARNESS.md` §4).

## 6 · π and DELTA obligations

Before = the `hH`/`head` builds of `80ebfd72`; after = `h1`. Captures under `.cache/evidence/W-H.1/` (the one scratch root, W-C.1); the wave record inlines each PNG's path, sha256, command and paired π row, so a wiped scratch is re-derivable.

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| the ladder, the dock, the popover and the real Dialog over paper, aurora c1 and c0.5, black, white, checker, stripes | light, dark | Chromium; Playwright WebKit labelled (no dock) | `$H/capture.mjs` `full` and `noink` per cell, before/after | G1-G4, G6 rows |
| the Dialog over light paper (Close ring, caption) | light | Chromium, Playwright WebKit | the `dialog` scene `full`, and the `glance.mjs` pair | G2's Dialog rows (HEAD ring 1.80, muted 1.32) |
| selected text on paper and on a plate | light, dark | Chromium, Playwright WebKit | `sel-*.png` | G7 |
| the Command cursor | light, dark | Chromium, Playwright WebKit | `cmd-*.png` | G8 |
| the ladder under `prefers-contrast: more` | light, dark | Chromium, Playwright WebKit | `pcm-*-more-*.png` vs `pcm-*-none-*.png` (HEAD light: `cd337a97a0ff…` vs `5ffb55b473a3…`) | G9 |
| SegmentedTabs hover under reduced motion | light, dark | Chromium, Playwright WebKit | `prm-*-rest.png` / `prm-*-hover.png` (byte-identical at HEAD) | G10 |
| Buttons, Sliders | light, dark | Chromium, Playwright WebKit | `prm-*-rest.png`, `slider-*.png` | G11, G12 |
| page text over a recessed aurora under PRT | light, dark | Chromium | `prt-*-reduce-full.png` vs `prt-*-none-full.png` | G13 |
| the dock tabs | light, dark | Chromium | `dock-*.png` | G14 |
| the four hero routes under PRT (`/`, `/substrates/aurora`, the dock stages, `/foundations/motion`) | light, dark | Chromium | demo route captures before/after | owner glance: F-75's round-3 note says these improve under HEAD's lift; the recession must not read as a dead page |
| the field luma on `/` and `/substrates/blob` (D3-B) | light, dark | Chromium | the canvas rect screenshot beside its `data-field-luma` (π-LUMA, from W-G.1) | H1-G19 |
| the live dock over the aurora (D3-B) | light, dark | Chromium | `dock-live-*.png` beside the sample-state readout (π-DOCK-LUMA, from W-G.3) | H1-G20 |
| real Safari | both | — | UNMEASURED (OW-3) | — |

## 7 · MIGRATION rows (clean break, no alias)

| removed or changed | successor | wave |
|---|---|---|
| `--dock-fg-on-aurora` and the dock's `--muted-foreground` as `contrast-color(var(--card))` (black or white) | the converged dock ink rungs; a consumer that relied on pure black or white dock ink sets its own under E-5 | this |
| `--on-glass-muted`, `--on-glass-muted-strong`, `--ink-perimeter` values (and names, where the route replaces them: C and E remove the `--on-glass-*` table, E removes `--ink-perimeter` as an alpha) | the route's ink tokens, named in the converged spec's API table (`SPECS.md` A.2-F.2) | this |
| the Aurora PRT arm's full-presence lift | a solid ground under PRT, as under forced colours | this |
| `--dock-control-active-bg: var(--glass-plate-floating)` | the accent state channel the spec names | this |
| A, C, D, E routes: `GlassDock`'s `backdropMode: "live" \| "static"`; `--glass-backdrop-luma`, `--glass-backdrop-luma-knee` and the `@property` | A: `"glass" \| "opaque"`; C, D, E: per the spec's API table; the tokens have no successor | this |
| B route: `--glass-veil-tier` changes meaning (the pole's floor α) | none; a consumer tier override is re-read by addendum | this |

Consumer overrides retire by an addendum in each consumer's own tranche (E-6), named in W-L.7's packets: chicago's `max(<token>, 0.62)` tier floor (`chicago/src/style.css:140-141`) and its count `opacity: 0.6` once M-4 is green; keyframes' `:background-canvas` binding (`ChromeDock.vue:370`) on a route that deletes it; fourier's strong-muted hand picks; value.js's certified-ink model (`ink.ts`), which S-24 says must stay solvable or read the published composite.

## 8 · Dependencies and ledger rows

Edges: PLAN §5. Records #54b (leg (v) of #54, GM-L6: the glass-material sample tile at 1.0× DPR) as RETIRE NOT-REPRODUCED: the sampler maps its rect through the source canvas's backing ratio (`composables/glass/backdropLuminanceSample.ts:145-150`), not a fixed 1.0×, and routes A, C, D and E delete its glass consumer (§3.3); re-trigger, a sample read at 1.0× on a canvas backed above 1.0×. Closes #31g (G1, G2), UIA-F-128 (G8, the Command cursor), W-SLIDER-PROGRESS (G12: the Slider rows are RED, the Progress cell holds), the D3-B publisher rows (H1-G19, H1-G20) and F-23 (all members above), F-24's remainder, F-75; inbound UIA rows in §1 (each closes on the G row that measures its surface, recorded per row by the LEDGER seat); C-2 row 1 (G4 with G1's dock rows); O-61 R-2's value mark (G12); #10's dark-α items, #80's remainder, #83's perimeter half. Carries into W-K.4 the ring register's FC arm and into W-L.1 the spectrum fill hook API, each already a named row of those waves.

## Appendix A · the band-H paint probe (shared by W-H.1 and W-H.2)

Scratch source, reproduced so a seat can replay it after a scratch wipe. `build.mjs <worktree> <label>` is W-0.1 appendix A's `build.mjs` with the page title changed to `band-H probe`: it bundles `App.vue` against any worktree's `src` through the `@glass` alias. `measure.mjs` drives Chromium 149 (`--force-color-profile=srgb`, WebGPU flags for the aurora) and Playwright WebKit 26.5 at 1280×900, DPR 1, `reducedMotion: reduce`, and exits 1 on any FAIL row. The lens rows and the dock rows run in Chromium only. When it lands under `scripts/probes/band-H/`, the `CHECKOUT` literal becomes the repository root resolved from the script's own path.

At HEAD: `VERDICT head: 32 FAIL of 40 gated rows` (Chromium); `VERDICT headwk: 14 FAIL of 20` (Playwright WebKit). With `FIXTURE=1`: `VERDICT fixture: 0 FAIL of 40`.

`App.vue`:

```vue
<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { Input } from "@glass/components/input";
import { FadingScroll } from "@glass/components/fading-scroll";
import { Command, CommandInput, CommandList, CommandItem, CommandGroup } from "@glass/components/command";
import { SegmentedTabs } from "@glass/components/tabs";
import { Slider } from "@glass/components/slider";
import { Button } from "@glass/components/button";
import { Aurora } from "@glass/components/aurora";
import { GlassDock, DockControl } from "@glass/components/dock";
const q = new URLSearchParams(location.search);
const scene = q.get("scene") ?? "sel";
const ground = q.get("ground") ?? "paper";
const tab = ref("a"); const inp = ref("value 1000"); const s1 = ref([50]); const s2 = ref([50]);
const LEVELS = ["wash", "quiet", "resting", "floating", "overlay"];
const groundStyle = ground === "stripes" ? "background: repeating-linear-gradient(90deg,#7c3aed 0 24px,#facc15 24px 48px)" : ground === "black" ? "background:#000" : ground === "white" ? "background:#fff" : "";
if (q.get("fixture") === "1") { const st = document.createElement("style"); st.textContent = `/* PLANTED GATE FIXTURE, not a design */
::selection{background:oklch(0.45 0.12 250);color:#fff}
.dark ::selection{background:oklch(0.8 0.08 250);color:#000}
[data-highlighted]{outline:2px solid color-mix(in oklab, var(--foreground) 85%, transparent) !important;outline-offset:-2px}
@media (prefers-contrast: more){ .text-muted-foreground{color:var(--foreground) !important} }
[data-t="seg"] button:hover{background:color-mix(in oklab, var(--foreground) 14%, transparent) !important}
[data-t="btn-primary"]{background:oklch(0.55 0.15 60) !important}
[data-t="slider-default"] [data-slot="slider"], [data-t="slider-spectrum"] [data-slot="slider"]{--probe-mark:1}
[data-t^="slider-"] [role="slider"]{opacity:1 !important;background:var(--foreground) !important;width:6px !important;min-width:6px !important}
@media (prefers-reduced-transparency: reduce){ .aurora-root{opacity:.5 !important} [data-t="prt-muted"]{background:var(--background);color:var(--foreground) !important} }
.dock-tab-button[data-active], [data-t="tab-active"]{background:oklch(0.45 0.12 250) !important;color:#fff !important}
.dark .dock-tab-button[data-active], .dark [data-t="tab-active"]{background:oklch(0.85 0.08 250) !important;color:#000 !important}
[data-lens="opaque"], [data-lens="fade"]{backdrop-filter:none !important}
[data-lens-wrap="well"] input{background:color-mix(in oklab, var(--card) 80%, transparent) !important}
[data-probe-level]{backdrop-filter:blur(10px) !important}`; document.head.appendChild(st); }
onMounted(async () => { await nextTick(); await new Promise((r) => setTimeout(r, 300)); (window as any).__ready = true; });
</script>
<template>
  <main :style="groundStyle + ';min-height:100vh;padding:24px;box-sizing:border-box'">
    <template v-if="scene === 'sel'">
      <p data-t="sel-paper" class="text-muted-foreground" style="font-size:16px;width:520px">Muted caption on the page ground, selected for the probe.</p>
      <div class="glass-floating" style="width:560px;padding:20px;border-radius:24px;margin-top:24px"><p data-t="sel-plate" class="text-muted-foreground" style="font-size:16px">Muted caption on the floating plate, selected for the probe.</p></div>
    </template>
    <template v-else-if="scene === 'cmd'">
      <div class="glass-floating" style="width:420px;border-radius:20px;padding:8px">
        <Command><CommandInput placeholder="Search" data-t="cmd-input" /><CommandList><CommandGroup heading="Actions">
          <CommandItem value="one" data-t="row-1">First action</CommandItem><CommandItem value="two" data-t="row-2">Second action</CommandItem>
          <CommandItem value="three" data-t="row-3">Third action</CommandItem><CommandItem value="four" data-t="row-4">Fourth action</CommandItem>
        </CommandGroup></CommandList></Command>
      </div>
    </template>
    <template v-else-if="scene === 'ladder'">
      <div style="display:grid;grid-template-columns:repeat(5,220px);gap:16px">
        <div v-for="l in LEVELS" :key="l" :class="`glass-${l}`" :data-t="`plate-${l}`" style="padding:20px;border-radius:20px;height:140px">
          <p class="text-muted-foreground" :data-t="`muted-${l}`" style="font-size:16px;margin:0">Muted caption</p>
          <div :data-t="`well-${l}`" style="margin-top:14px"><Input v-model="inp" :aria-label="`w-${l}`" /></div>
        </div>
      </div>
    </template>
    <template v-else-if="scene === 'prm'">
      <div style="width:420px"><SegmentedTabs v-model="tab" :options="[{label:'Alpha',value:'a'},{label:'Beta',value:'b'},{label:'Gamma',value:'c'}]" aria-label="probe tabs" data-t="seg" /></div>
      <div style="margin-top:32px;display:flex;gap:16px"><Button emphasis="primary" data-t="btn-primary">Primary</Button><Button emphasis="secondary" data-t="btn-secondary">Secondary</Button></div>
    </template>
    <template v-else-if="scene === 'slider'">
      <div style="width:480px;display:grid;gap:40px;padding-top:20px">
        <div data-t="slider-default"><Slider v-model="s1" aria-label="default" /></div>
        <div data-t="slider-spectrum" style="--slider-spectrum: linear-gradient(90deg, #ef4444, #22c55e, #3b82f6)"><Slider v-model="s2" variant="spectrum" aria-label="spectrum" /></div>
      </div>
    </template>
    <template v-else-if="scene === 'prt'">
      <div style="position:fixed;inset:0"><Aurora :opacity-ceiling="0.5" data-t="aurora" style="position:absolute;inset:0" /></div>
      <p data-t="prt-muted" class="text-muted-foreground" style="position:relative;font-size:16px;width:520px;margin-top:120px">Muted page text over a recessed field (ceiling 0.5).</p>
    </template>
    <template v-else-if="scene === 'dock'">
      <div style="padding-top:40px"><GlassDock orientation="horizontal" fit-content :collapse="false" aria-label="Probe dock">
        <DockControl shape="tab" :active="true" data-t="tab-active">Photos</DockControl>
        <DockControl shape="tab" data-t="tab-rest">Lots</DockControl>
        <DockControl aria-label="Add" data-t="icon">+</DockControl>
      </GlassDock></div>
    </template>
    <template v-else-if="scene === 'shadow'">
      <div style="display:flex;gap:40px;padding:40px">
        <div v-for="k in ['sm','md','lg','xl','2xl']" :key="k" :data-shadow="k" :style="`width:140px;height:100px;border-radius:16px;background:var(--card);box-shadow:var(--shadow-${k})`"></div>
      </div>
    </template>
    <template v-else-if="scene === 'lens'">
      <div style="display:grid;grid-template-columns:repeat(3,300px);gap:24px">
        <div data-t="host-bare" style="height:120px;padding:24px"><button class="glass-capsule" data-lens="bare" style="width:200px;height:56px">Bare</button></div>
        <div data-t="host-opaque" class="glass-floating" data-surface="opaque" style="height:120px;padding:24px;border-radius:20px"><button class="glass-capsule" data-lens="opaque" style="width:200px;height:56px">Opaque host</button></div>
        <div data-t="host-plate" class="glass-floating" style="height:120px;padding:24px;border-radius:20px"><button class="glass-capsule" data-lens="plate" style="width:200px;height:56px">In plate</button></div>
        <FadingScroll data-t="host-fade" style="height:120px;padding:24px;overflow:auto"><button class="glass-capsule" data-lens="fade" style="width:200px;height:56px">In fade</button></FadingScroll>
        <div data-t="host-well" class="glass-floating" style="height:120px;padding:24px;border-radius:20px"><div data-lens-wrap="well"><Input v-model="inp" aria-label="well" /></div></div>
        <div data-t="host-level" class="glass-floating" data-probe-level style="height:120px;padding:24px;border-radius:20px;--glass-level:0.5">level 0.5</div>
      </div>
    </template>
  </main>
</template>
```

`measure.mjs <label>` (the colour maths, `png`, `px`, `mean` and the static server are W-0.1 appendix A's; the parts that differ are given in full):

```js
const r4 = (x) => +x.toFixed(4), r2 = (x) => +x.toFixed(2);
const pct = (arr, p) => { const a = [...arr].sort((m, n) => m - n); return a[Math.min(a.length - 1, Math.floor(p * a.length))]; };
const ENG = (process.env.ENGINES ?? "chromium,webkit").split(",");
async function open(bt, scene, theme, { media = {}, features = null, extra = "" } = {}) {
  const b = await bt.launch(bt === chromium ? { args: ["--force-color-profile=srgb", "--enable-unsafe-webgpu", "--ignore-gpu-blocklist", "--use-angle=metal"] } : {});
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce", ...media });
  const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => errs.push(String(e)));
  if (features && bt === chromium) { const c = await ctx.newCDPSession(page); await c.send("Emulation.setEmulatedMedia", { features }); }
  await page.goto(`${base}?scene=${scene}&theme=${theme}${extra}${process.env.FIXTURE ? "&fixture=1" : ""}`); await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 }); await page.waitForTimeout(500);
  return { b, page, errs };
}
const box = async (page, sel) => { const r = await page.locator(sel).first().boundingBox(); return r ? { x: r.x, y: r.y, w: r.width, h: r.height } : null; };
// glyph-ring contrast: full vs text-transparent capture; ink = glyph cores (coverage ≥ 0.9), ground = the 1 px ring outside coverage ≥ 0.25; p05
async function inkRatio(page, sel, shotName) {
  const r = await box(page, sel); const full = png(await page.screenshot({ path: path.join(out, shotName + "-full.png") }));
  await page.addStyleTag({ content: `${sel}, ${sel} * { -webkit-text-fill-color: transparent !important; color: transparent !important; }` }); await page.waitForTimeout(150);
  const noink = png(await page.screenshot()); await page.evaluate(() => { [...document.querySelectorAll("style")].at(-1).remove(); });
  const X0 = Math.round(r.x), Y0 = Math.round(r.y), W = Math.round(r.w), H = Math.round(r.h); const d = []; let mx = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { const v = dE(px(full, X0 + x, Y0 + y), px(noink, X0 + x, Y0 + y)); d.push(v); if (v > mx) mx = v; }
  const cov = (x, y) => (x < 0 || y < 0 || x >= W || y >= H ? 0 : d[y * W + x] / (mx || 1));
  const cores = []; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) if (cov(x, y) >= 0.9) cores.push(px(full, X0 + x, Y0 + y));
  cores.sort((a, b) => Y(a) - Y(b)); const ink = cores[Math.floor(cores.length / 2)] ?? [0, 0, 0];
  const ratios = []; for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { if (cov(x, y) >= 0.25) continue; let near = false; for (let dy = -1; dy <= 1 && !near; dy++) for (let dx = -1; dx <= 1; dx++) if (cov(x + dx, y + dy) >= 0.25) { near = true; break; } if (near) ratios.push(wcag(ink, px(noink, X0 + x, Y0 + y))); }
  return { ink: hex(ink), p05: ratios.length ? r2(pct(ratios, 0.05)) : null, n: ratios.length, coreN: cores.length };
}
// selected text: the ground is the modal colour of the box (the highlight), the ink the 4% of pixels farthest from it
async function selRatio(page, sel, shotName) {
  const r = await box(page, sel); const img = png(await page.screenshot({ path: path.join(out, shotName + ".png") })); const cnt = new Map(); const pts = [];
  for (let y = Math.round(r.y); y < r.y + r.h; y++) for (let x = Math.round(r.x); x < r.x + r.w; x++) { const p = px(img, x, y); pts.push(p); const k = p.map((v) => v >> 2).join(","); cnt.set(k, (cnt.get(k) ?? 0) + 1); }
  const top = [...cnt.entries()].sort((a, b) => b[1] - a[1])[0][0].split(",").map((v) => (+v << 2) + 2);
  const gpts = pts.filter((p) => p.every((v, i) => Math.abs(v - top[i]) <= 4)); const g = gpts.reduce((s, p) => s.map((v, i) => v + p[i] / gpts.length), [0, 0, 0]);
  pts.sort((a, b) => dE(b, g) - dE(a, g)); const core = pts.slice(0, Math.max(3, Math.round(pts.length * 0.04))); const ink = core.reduce((s, p) => s.map((v, i) => v + p[i] / core.length), [0, 0, 0]);
  return { ground: hex(g), ink: hex(ink), ratio: r2(wcag(ink, g)) };
}
// a lens is inert when removing its backdrop-filter changes no pixel of its box (p99 ΔE_OK < 0.01, 4 px inset)
async function inert(page, sel, shot) {
  const r = await box(page, sel); if (!r) return { missing: true };
  const on = png(await page.screenshot({ path: path.join(out, shot + "-on.png") }));
  const bf = await page.locator(sel).first().evaluate((el) => { const v = getComputedStyle(el).backdropFilter; el.style.setProperty("backdrop-filter", "none", "important"); el.style.setProperty("-webkit-backdrop-filter", "none", "important"); return v; });
  await page.waitForTimeout(150); const off = png(await page.screenshot({ path: path.join(out, shot + "-off.png") }));
  await page.locator(sel).first().evaluate((el) => { el.style.removeProperty("backdrop-filter"); el.style.removeProperty("-webkit-backdrop-filter"); });
  const ds = []; for (let y = Math.round(r.y) + 4; y < r.y + r.h - 4; y++) for (let x = Math.round(r.x) + 4; x < r.x + r.w - 4; x++) ds.push(dE(px(on, x, y), px(off, x, y)));
  const p99 = pct(ds, 0.99); return { backdropFilter: bf, dEp99: r4(p99), inert: bf === "none" ? null : p99 < 0.01 };
}
for (const eng of ENG) { const bt = eng === "chromium" ? chromium : webkit;
 for (const theme of ["light", "dark"]) {
  for (const which of ["paper", "plate"]) { const { b, page } = await open(bt, "sel", theme); const sel = `[data-t="sel-${which}"]`;
    await page.evaluate((s) => { const el = document.querySelector(s); const rg = document.createRange(); rg.selectNodeContents(el); const g = getSelection(); g.removeAllRanges(); g.addRange(rg); }, sel); await page.waitForTimeout(150);
    const k = await selRatio(page, sel, `sel-${eng}-${theme}-${which}`);
    const selRules = await page.evaluate(() => { let n = 0; for (const s of document.styleSheets) { try { for (const r of s.cssRules) if (String(r.cssText).includes("::selection")) n++; } catch {} } return n; });
    row({ gate: "H1/SELECTION", eng, theme, where: which, ...k, selectionRules: selRules, pass: k.ratio >= 4.5 }); await b.close(); }
  { const { b, page } = await open(bt, "cmd", theme);
    await page.locator('[data-t="cmd-input"] input, input[data-t="cmd-input"], [data-t="cmd-input"]').first().focus(); await page.keyboard.press("ArrowDown"); await page.waitForTimeout(250);
    const hi = await page.evaluate(() => [...document.querySelectorAll("[data-t^=row-]")].map((e) => ({ t: e.dataset.t, h: e.hasAttribute("data-highlighted"), outline: getComputedStyle(e).outlineStyle + " " + getComputedStyle(e).outlineWidth })));
    const hRow = hi.find((x) => x.h)?.t ?? "row-1"; const rest = hRow === "row-4" ? "row-1" : "row-4";
    const img = png(await page.screenshot({ path: path.join(out, `cmd-${eng}-${theme}.png`) }));
    const rh = await box(page, `[data-t="${hRow}"]`), rr = await box(page, `[data-t="${rest}"]`);
    const fill = mean(img, { x: rh.x + rh.w * 0.75, y: rh.y + rh.h * 0.3, w: rh.w * 0.2, h: rh.h * 0.4 }), plate = mean(img, { x: rr.x + rr.w * 0.75, y: rr.y + rr.h * 0.3, w: rr.w * 0.2, h: rr.h * 0.4 });
    const cols = []; for (let x = Math.round(rh.x + rh.w * 0.2); x < rh.x + rh.w * 0.8; x++) { let m = 1; for (let y = Math.round(rh.y) - 3; y <= rh.y + 3; y++) m = Math.max(m, wcag(px(img, x, y), plate)); cols.push(m); }
    const fillR = wcag(fill, plate), ringR = pct(cols, 0.5);
    row({ gate: "H1/CMD-CURSOR", eng, theme, highlighted: hRow, outline: hi.find((x) => x.t === hRow)?.outline, fill: hex(fill), plate: hex(plate), fillRatio: r2(fillR), ringRatio: r2(ringR), pass: Math.max(fillR, ringR) >= 3 }); await b.close(); }
  for (const pcm of [false, true]) { const { b, page } = await open(bt, "ladder", theme, pcm ? { media: { contrast: "more" } } : {});
    for (const l of ["wash", "resting", "overlay"]) { const k = await inkRatio(page, `[data-t="muted-${l}"]`, `pcm-${eng}-${theme}-${pcm ? "more" : "none"}-${l}`);
      row({ gate: pcm ? "H1/PCM-MUTED" : "H1/D-MUTED(recorded)", eng, theme, level: l, ...k, pass: pcm ? k.p05 >= 7 : null }); }
    await b.close(); }
  { const { b, page } = await open(bt, "prm", theme);
    const items = page.locator('[data-t="seg"] [role="tab"], [data-t="seg"] button'); const n = await items.count(); const tgt = items.nth(Math.min(1, n - 1)); const r = await tgt.boundingBox();
    await page.mouse.move(5, 5); await page.waitForTimeout(200); const rest = png(await page.screenshot({ path: path.join(out, `prm-${eng}-${theme}-rest.png`) }));
    await tgt.hover(); await page.waitForTimeout(400); const hov = png(await page.screenshot({ path: path.join(out, `prm-${eng}-${theme}-hover.png`) }));
    let ch = 0, tot = 0; for (let y = Math.round(r.y) - 2; y < r.y + r.height + 2; y++) for (let x = Math.round(r.x) - 2; x < r.x + r.width + 2; x++) { tot++; if (dE(px(rest, x, y), px(hov, x, y)) >= 0.02) ch++; }
    row({ gate: "H1/PRM-HOVER", eng, theme, tabs: n, changedPx: ch, changedFrac: r4(ch / tot), pass: ch / tot >= 0.05 });
    const bp = await box(page, '[data-t="btn-primary"]'), bs = await box(page, '[data-t="btn-secondary"]');
    const fp = mean(rest, { x: bp.x + bp.w * 0.82, y: bp.y + bp.h * 0.3, w: bp.w * 0.1, h: bp.h * 0.4 }), fs2 = mean(rest, { x: bs.x + bs.w * 0.82, y: bs.y + bs.h * 0.3, w: bs.w * 0.1, h: bs.h * 0.4 });
    row({ gate: "H1/EMPHASIS", eng, theme, primary: hex(fp), secondary: hex(fs2), dE: r4(dE(fp, fs2)), ratio: r2(wcag(fp, fs2)), pass: dE(fp, fs2) >= 0.05 }); await b.close(); }
  { const { b, page } = await open(bt, "slider", theme); const img = png(await page.screenshot({ path: path.join(out, `slider-${eng}-${theme}.png`) }));
    for (const v of ["default", "spectrum"]) { const root = await box(page, `[data-t="slider-${v}"] [data-slot="slider"], [data-t="slider-${v}"] > *`); const cy = root.y + root.h / 2;
      const track = mean(img, { x: root.x + root.w * 0.85, y: cy - 1, w: root.w * 0.08, h: 3 }); const fillv = mean(img, { x: root.x + root.w * 0.12, y: cy - 1, w: root.w * 0.08, h: 3 });
      const cols = []; for (let x = Math.round(root.x + root.w * 0.5 - 12); x < root.x + root.w * 0.5 + 12; x++) { const colv = []; for (let y = Math.round(root.y); y < root.y + root.h; y++) colv.push(wcag(px(img, x, y), track)); cols.push(pct(colv, 0.9)); } const mark = Math.max(...cols);
      row({ gate: "H1/SLIDER-VALUE", eng, theme, variant: v, track: hex(track), fill: hex(fillv), fillVsTrack: r2(wcag(fillv, track)), markVsTrack: r2(mark), pass: Math.max(wcag(fillv, track), mark) >= 3 }); }
    await b.close(); }
  if (eng === "chromium") { let dCell = null; for (const prt of [false, true]) { const { b, page } = await open(bt, "prt", theme, prt ? { features: [{ name: "prefers-reduced-transparency", value: "reduce" }] } : {}); await page.waitForTimeout(1200);
    const op = await page.evaluate(() => { const r = document.querySelector(".aurora-root"); return r ? getComputedStyle(r).opacity : null; });
    const matched = await page.evaluate(() => matchMedia("(prefers-reduced-transparency: reduce)").matches);
    const k = await inkRatio(page, '[data-t="prt-muted"]', `prt-${eng}-${theme}-${prt ? "reduce" : "none"}`);
    if (!prt) dCell = k.p05;
    row({ gate: prt ? "H1/PRT-RECEDE" : "H1/PRT-D(recorded)", eng, theme, mediaMatched: matched, auroraOpacity: op, ...k, pass: prt ? (k.p05 >= 4.5 && k.p05 >= dCell) : null }); await b.close(); } }
  if (eng === "chromium") { const { b, page } = await open(bt, "dock", theme);
    const img = png(await page.screenshot({ path: path.join(out, `dock-${eng}-${theme}.png`) }));
    const ra = await box(page, '[data-t="tab-active"]'), rr = await box(page, '[data-t="tab-rest"]');
    const fa = mean(img, { x: ra.x + ra.w * 0.85, y: ra.y + ra.h * 0.35, w: ra.w * 0.08, h: ra.h * 0.3 }), fr = mean(img, { x: rr.x + rr.w * 0.85, y: rr.y + rr.h * 0.35, w: rr.w * 0.08, h: rr.h * 0.3 });
    row({ gate: "H1/DOCK-STATE", eng, theme, active: hex(fa), rest: hex(fr), ratio: r2(wcag(fa, fr)), pass: wcag(fa, fr) >= 3 });
    const ib = await box(page, '[data-t="icon"]'); await page.mouse.move(ib.x + ib.w / 2, ib.y + ib.h / 2); await page.mouse.down(); await page.waitForTimeout(500);
    const pr = await page.evaluate(() => { const out = []; const host = document.querySelector('[data-t="icon"]'); for (const el of [host, ...host.querySelectorAll("*")]) { const cs = getComputedStyle(el); if (cs.backdropFilter !== "none" || cs.filter !== "none") out.push({ tag: el.tagName, cls: String(el.className).slice(0, 40), filter: cs.filter, backdrop: cs.backdropFilter }); } return out; });
    await page.mouse.up(); const both = pr.filter((x) => x.filter !== "none" && x.backdrop !== "none");
    row({ gate: "H2/PRESS-FILTER-ON-LENS(hold)", eng, theme, elements: pr, sameElement: both.length, pass: both.length === 0 }); await b.close(); }
  if (eng === "chromium") { const { b, page } = await open(bt, "lens", theme, { extra: "&ground=stripes" });
    for (const w of ["bare", "opaque", "plate", "fade"]) { const k = await inert(page, `[data-lens="${w}"]`, `lens-${theme}-${w}`); row({ gate: w === "bare" ? "H2/LENS-REFERENCE(selftest)" : "H2/LENS-INERT", eng, theme, host: w, ...k, pass: w === "bare" ? k.inert === false : k.inert !== true }); }
    const wellEl = await page.evaluate(() => { const wrap = document.querySelector('[data-lens-wrap="well"]'); for (const el of [wrap, ...wrap.querySelectorAll("*")]) { const cs = getComputedStyle(el); if (cs.backdropFilter !== "none") { el.setAttribute("data-well-lens", ""); return { tag: el.tagName, bg: cs.backgroundColor, backdrop: cs.backdropFilter }; } } return null; });
    const kw = wellEl ? await inert(page, "[data-well-lens]", `lens-${theme}-well`) : { missing: true };
    row({ gate: "H2/WELL-INERT", eng, theme, well: wellEl, ...kw, pass: kw.inert !== true });
    const lv = await page.evaluate(() => { const el = document.querySelector("[data-probe-level]"); return { level: getComputedStyle(el).getPropertyValue("--glass-level").trim(), backdrop: getComputedStyle(el).backdropFilter }; });
    const rad = parseFloat((lv.backdrop.match(/blur\(([\d.]+)px\)/) ?? [, "NaN"])[1]);
    row({ gate: "H2/BLUR-AT-ELEMENT", eng, theme, ...lv, blurPx: rad, pass: Math.abs(rad - 10) <= 0.5 });
    const capOpaque = await page.evaluate(() => getComputedStyle(document.querySelector('[data-lens="opaque"]')).backdropFilter);
    row({ gate: "H2/OPAQUE-HOST-LENS(computed)", eng, theme, backdrop: capOpaque, pass: capOpaque === "none" || /blur\(0px\)/.test(capOpaque) });
    await b.close();
    const cs = {}; for (const g of ["black", "white"]) { const o = await open(bt, "lens", theme, { extra: `&ground=${g}` }); const r = await box(o.page, '[data-lens-wrap="well"] input'); const im = png(await o.page.screenshot()); cs[g] = mean(im, { x: r.x + r.w * 0.6, y: r.y + r.h * 0.3, w: r.w * 0.3, h: r.h * 0.4 }); await o.b.close(); }
    const trans = (cs.white.reduce((s, v, i) => s + (v - cs.black[i]), 0) / 3) / 255;
    row({ gate: "H2/WELL-TRANSMITS", eng, theme, overBlack: hex(cs.black), overWhite: hex(cs.white), transmission: r4(trans), pass: trans >= 0.02 }); }
 } }
srv.close(); fs.writeFileSync(path.join(out, "rows.json"), JSON.stringify(rows, null, 1));
const g = rows.filter((r) => r.pass !== null && !String(r.gate).includes("selftest")); const f = g.filter((r) => r.pass === false).length;
console.log(`VERDICT ${label}: ${f} FAIL of ${g.length} gated rows`); process.exit(f ? 1 : 0);
```

The well's transmission is `mean(C_white − C_black)/255` over the field interior, which is 1 − α for a flat plate (the harness's painted-α identity, `HARNESS.md` §2).

## Appendix B · the elevation ladder probe (`shadow.mjs`)

Run here as `node shadow.mjs head` against the appendix A build (with the `shadow` scene): `VERDICT head: 2 FAIL of 2 gated rows`. Its `pass` field also requires `sm` ≥ 0.01, which fails in both themes on reach; G17 reads the `adjacentStep` field, not `pass`. Captures: `shadow-chromium-dark.png` (sha256 `889b11ea7186…`), `shadow-chromium-light.png` (`df5fd4c5d52d…`).

```js
// shadow.mjs <label> — the cast-shadow ladder in paint: the halo 6 px below each box against the page 60 px away
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import { createRequire } from "node:module";
const CHECKOUT = "/Users/mkbabb/Programming/glass-ui"; const require = createRequire(`${CHECKOUT}/package.json`); const { PNG } = require("pngjs");
const { chromium, webkit } = await import(`${CHECKOUT}/node_modules/playwright/index.mjs`);
const HERE = path.dirname(new URL(import.meta.url).pathname); const label = process.argv[2] ?? "head"; const dist = path.join(HERE, "builds", label, "dist"); const out = path.join(HERE, "caps", label); fs.mkdirSync(out, { recursive: true });
const srv = http.createServer((req, res) => { const p = path.join(dist, new URL(req.url, "http://x").pathname); const f = fs.existsSync(p) && fs.statSync(p).isFile() ? p : path.join(dist, "index.html"); res.writeHead(200, { "content-type": f.endsWith(".js") ? "text/javascript" : f.endsWith(".css") ? "text/css" : "text/html" }); fs.createReadStream(f).pipe(res); });
await new Promise((r) => srv.listen(0, r));
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const oklab = ([r, g, b]) => { const [R, G, B] = [lin(r), lin(g), lin(b)]; const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B), m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B), s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B); return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s]; };
const dE = (p, q) => { const [a, b] = [oklab(p), oklab(q)]; return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); };
const mean = (img, x0, y0, w, h) => { let s = [0, 0, 0], n = 0; for (let y = y0; y < y0 + h; y++) for (let x = x0; x < x0 + w; x++) { const i = (img.width * y + x) << 2; s[0] += img.data[i]; s[1] += img.data[i + 1]; s[2] += img.data[i + 2]; n++; } return s.map((v) => v / n); };
let fails = 0;
for (const [eng, bt] of [["chromium", chromium], ["webkit", webkit]]) for (const theme of ["light", "dark"]) {
  const b = await bt.launch(bt === chromium ? { args: ["--force-color-profile=srgb"] } : {}); const page = await b.newPage({ viewport: { width: 1280, height: 400 }, deviceScaleFactor: 1 });
  await page.goto(`http://127.0.0.1:${srv.address().port}/?scene=shadow&theme=${theme}${process.env.FIXTURE ? "&fixture=1" : ""}`); await page.waitForFunction(() => window.__ready); await page.waitForTimeout(300);
  const img = PNG.sync.read(await page.screenshot({ path: path.join(out, `shadow-${eng}-${theme}.png`) }));
  const boxes = await page.evaluate(() => [...document.querySelectorAll("[data-shadow]")].map((e) => { const r = e.getBoundingClientRect(); return { k: e.dataset.shadow, x: Math.round(r.left), y: Math.round(r.bottom), w: Math.round(r.width) }; }));
  const pageC = mean(img, 1200, 360, 40, 30); const halos = boxes.map((bx) => ({ k: bx.k, dE: +dE(mean(img, bx.x + 30, bx.y + 5, bx.w - 60, 3), pageC).toFixed(4) }));
  const adj = halos.slice(1).map((h, i) => +(h.dE - halos[i].dE).toFixed(4));
  const pass = halos.every((h) => h.dE >= 0.01) && adj.every((d) => d >= 0.002);
  if (eng === "chromium" && !pass) fails++;
  console.log(JSON.stringify({ gate: "H1/SHADOW-LADDER", eng, theme, halos, adjacentStep: adj, pass: eng === "chromium" ? pass : `${pass} (info)` })); await b.close(); }
srv.close(); console.log(`VERDICT ${label}: ${fails} FAIL of 2 gated rows`); process.exit(fails ? 1 : 0);
```
