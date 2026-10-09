# D3 · pass 3 · C″ · spec (floor v2 + a consumer claim + the claim's licence)

| field | value |
|---|---|
| seat | D3 pass 3, SPEC for route C″ (`REGISTRY.md` P2-6.1, P2-6.2 step 4). Answers C′'s open rows (P2-1.2) with probes on HEAD+floor v2, and states how every P2-6.3 row (24 core + FL-1..FL-16 + C-1..C-8) will be met |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree `.claude/worktrees/bl/D3/p3/Cpp-spec/wt` cut at the checkout's HEAD `d7b50a7f` (removed at the end). The task named `8059b373`; `git diff --stat 8059b373 d7b50a7f -- src demo tests package.json scripts` is empty. `floor-v2.patch` applied clean. `D3-Cp-proto.patch` does **not** apply on floor v2 (`veil.css`, `dark-arm.css`, `glass.css`, `glass-subtlety.test.ts` reject), so the probe re-expresses the licence as an injection (`D3-Cpp-probe.css`) |
| engines | Chromium 149 (gate) and **Playwright WebKit 26.5** (paint-only, no `backdrop-filter`, dock rows `+shim`). Playwright WebKit is not Safari. **Every real-Safari cell: UNMEASURED (owner's safaridriver checkbox)** |
| load | 37.8 to 686 (1-min average) through the seat, from other seats. The load is beside every run in §2. Every reading below is a static frame or a computed value, with no timing cell. The `reach` row reproduces C′'s pass-2 reading at load 508-651 (3.13 against 3.18), and the computed α of every variant matches the painted T to 0.002, so no reading depends on load |
| fences | no tracked-source edit or git write in the checkout. Writes: this file, `D3-Cpp-probe.css`, `D3-Cpp-probe.sh`, `D3-Cpp-computed.mjs`, `Cpp-records/`. Builds and captures under `.claude/worktrees/bl/D3/p3/Cpp-spec/out` |
| owner rulings | none have arrived (`FORMATION-PROGRESS.md:178`). The P2-5 pass-3 defaults are built: Q-1 (a) with (c) reported, Q-3 (a), Q-4 (a), Q-6 (a) with (b) as a reported arm, Q-7 (a)+(b), Q-8 (c), Q-9 (a), Q-11 (a), Q-12 (a), Q-13 (a) |

Short citations: `Cp-spec`, `Cp-proto`, `Cp-crit` are the pass-2 C′ files; `FV2` is `FLOOR-V2.md`; `H3` is `H3.md`; `rec/` is `Cpp-records/`.

---

## 0 · In brief

1. **C″ solves the claim with FL-5's own formula and FL-5's own ink.** The claim moves only the ground term of the bound. The ink stays the static muted ink, the pass-3 default under Q-12 (a). A claim whose tones are the any-input poles then computes `--glass-bound` exactly, in both engines and both themes (computed 0.8910 / 0.8731; §2.1). C-2 holds by identity. Every claimed plate's worst composite is the floor's worst composite over black, so every ink the floor holds, the `-strong` run and the capsule included, holds under every claim (C-1). Measured on HEAD+floor v2 under the claim: 0 of 820 gated M-2 rows read under 4.5. The reds are 60 cells this probe did not capture. The light claimed c1 wash reads muted 4.84 and `-strong` 6.30, where C′'s licence gives 2.69 and 3.54 (§2.2).
2. **The per-plate ink solve is struck.** At the static-ink licence it is the identity. Every other form of it is the Q-12 lever, which is the owner's, and both measured forms break a row. The reach-ink licence (C′) reds `-strong` at 3.13 over black and C-2 at 0.624. The `-strong`-ink licence reds the static muted at 3.56 and C-2 at 0.769. With the solve go `glass-ink`, `--glass-host-e`, the well's leaf hand-off, `--glass-ink-reach`, the `--foreground-l` split and the `--on-glass-muted-c/-h` split: about half of C′'s +647 lines.
3. **C-7 reads FAIL at spec time, and no form of C″ that keeps C-2 can pass it.** The claimed light c1 wash paints T_c1 **0.211** against floor v2's **0.121**: ×**1.74** in Chromium, ×1.77 in Playwright WebKit, where the row asks for ×2. The ratio is P/(P − g) = 0.9736 / 0.5619 = **1.733** and does not depend on the ink, so C′'s ×6 was ink lever, not ground knowledge. Measured on floor v2: reach licence 0.713, strong 0.441, static 0.211 (§2.3). Two times needs a claimed light tone g ≥ P/2 = 0.487, and the default aurora's c1 is 0.4117. **By P2-6.3 row C-7, C″ downgrades to BANK, and the solve (the claim, the resolver, the publication) is banked as a component.** The prototype seat confirms C-7 on the full H3 battery before it builds anything else (§6). The rest of this spec is the route as it would be built, so the bank holds a specified component.
4. **Every other C′ gap closes by construction or by probe.**
   - Q-6 (a) holds on thinned wells: light claimed c1 perimeter 3.08-3.14, against C′'s reach licence at 1.62-1.85 measured on the same build.
   - The out-of-scope field claim is inert (it paints the bound, computed 0.8910) and stamped by the resolver.
   - Colour retunes are followed: the page tone is read from the computed colour, never a stale number. A stale page tone is a measured silent desync, dark wash 0.024 from a retuned page (§2.4).
   - The demo claims one region.
5. **Rows a seat cannot close, built at their default and reported:** M-6 (Q-1), M-1x and the O-62 gestalt (Q-11), and every Safari cell. Floor v2's own open rows (M-4 dark capsule +0.067, M-9 dark veil +0.006, O-66 G2/G3, the inherited O-87 shadow stack) are C″'s too. C″ inherits them unchanged (FV2 §9).

## 1 · The mechanism

Line numbers are in `d7b50a7f` + `floor-v2.patch`.

### 1.1 · The licence: FL-5 with the ground as a parameter (`src/styles/tokens/glass.css:237-293`)

- **One formula, declared once.** The `:root, .dark` block (`glass.css:252-287`) moves the ground-dependent half into one `@layer base` rule on `:root, .dark, [data-glass-ground]`. The orphan-CSS gate (`tests/gates/orphan-css-partial.test.ts:479`) needs a claim rule to be layered (Cp-proto §1.1).
  - `--glass-ground-e` = `(1 − b)·min(lo′, --glass-pole-e) + b·max(hi′, --glass-pole-e)`, where `b = --glass-bound-ground` (`dark-arm.css:276`) and `lo′`, `hi′` are the lag-clamped tones (§1.4).
  - `--glass-content-bound` (registered `<number>`, inherits, initial 1) = `max(--glass-veil-lift, clamp(0, dir·(--glass-need-e − g)/max(dir·(--glass-pole-e − g), 1e-4), 1))`, with `dir = 1 − 2b`.
  - `--glass-need-e` is FL-5's (`glass.css:258-263`), at FL-5's ink `--on-glass-muted-l`. No second ink and no second `need`.
- **`--glass-bound` reads the same rule at the poles.** It stays declared on `:root, .dark` only, as `var(--glass-content-bound)`. There the tones are the registered initials (0 / 1), so it is FL-5's number. A claim never re-declares it, so it inherits the root's computed number unchanged. Chrome, W-A and H-4 read it as today. Measured: under every claim `--glass-bound` reads 0.8910 / 0.8731 (`rec/computed.log`).
- **The content rungs** (`glass.css:276-278`) read the content bound: `wash = cb`, `quiet = cb + (1 − cb)/3`, `resting = cb + 2(1 − cb)/3`. Chrome rungs (`:279-286`: floating, overlay, chassis, dock, crown, sheet, dialog) keep `--glass-bound` (Q-3 a).
- **The dark lift** `--glass-veil-lift` (light 0) is derived, not a literal. It is the least α whose composite clears the claimed page by `--glass-lift-gap` (0.065: M-6's 0.05 plus 0.015) in L: `E_t = E((L_p + gap)³)`, `lift = clamp(0, (E_t − p_e)/(P − p_e), 1)`, with `p_e = --glass-page-hi` (§1.2) and `L_p = cbrt(EOTF(p_e))`. On the floor v2 page and pole it is the 0.415 Cp-proto §1.1 derived.
- **What the identity buys.** Light (dark is symmetric with `hi`): every claimed pixel `px ≥ lo`, so a plate's composite tone is `≥ α·P + (1 − α)·lo = need_e`. Its luminance is never below the floor's worst composite, by Jensen on the convex EOTF (Cp-spec §0 item 2). That holds for any nesting depth, because a plate over a plate composites over a tone ≥ `need_e`, and so does a well: its pole (L 0.919 light, 0.283 dark) sits on the safe side of `need_e`. **No hand-off of any kind is needed.**

### 1.2 · The claim seat and its resolver (new `src/composables/glass/groundClaim.ts`; `groundTone.ts` from `D3-Cp-proto.patch:305-435` kept)

The claim is an attribute, `data-glass-ground`, in the one layered rule above, plus numbers. One library function writes all of it, so the knowledge it states is checked where it is written:

```ts
claimGlassGround(el: HTMLElement, source: "field" | "page" | readonly string[]): () => void   // returns the release
useGlassGround(target: MaybeRefOrGetter<HTMLElement | null>, source)                          // the Vue wrapper
```

| source | tones | stamp `data-glass-ground-state` (`GROUND_STATE_ATTR`, H3-7) |
|---|---|---|
| `"field"` | CSS: `lo = c·min(--glass-field-lo, page-lo) + (1 − c)·page-lo`, `hi` likewise with max (Cp-spec §1.1), all registered with the any-input initials. A publication out of scope leaves the initials, so the claim computes `--glass-bound`, inert by identity | `published` when the computed `--glass-field-live` on `el` is 1. Otherwise `unpublished`, plus one `console.warn` per claim |
| `"page"` | the resolver reads `getComputedStyle(el).getPropertyValue("--background")` and writes `--glass-page-lo/-hi` through `glassGroundTone`. The CSS rule maps `lo = hi = page` | `live` |
| colour list | `glassGroundTone` per stop, worst kept (min lo, max hi), written as `--glass-ground-lo/-hi` | `live` |

- **Every claim gets the page tone.** The field mix and the dark lift read it. `--background` is not split into a number: the resolver reads the colour, so a colour retune is followed (C-4).
- **When it re-runs.** On claim. On a `glass-field` event the publisher dispatches on `document` (publish, unpublish, dispose). And on one shared `MutationObserver` over `<html>`'s `class`/`style` and `<head>`'s child list (a theme switch, a retune stylesheet). It never runs per frame and reads no pixels, so M-5 and H-3 are unaffected. Writes go through `style.setProperty` only when a value changes.
- **Coherence, refused loud (C-4).** On each run the resolver checks the numbers the licence reads against the colours the page paints:
  - the computed `--card` against `oklch(var(--card-l) …)`;
  - the signed hierarchy, `--on-glass-muted-l` against the computed `--foreground`'s L (light: muted − fg ≥ 0.08; dark: fg − muted ≥ 0.08).

  A miss stamps `desync`, resets the claim's tones to the any-input poles (the floor), and warns once. It names the number to retune (`--card-l`, `--on-glass-muted-l`). A colour retune of `--background` needs no refusal: it is followed.
- **The release** removes the attribute, the inline tones and the stamp.
- **A hand-written attribute** with no resolver carries no tones, so it computes `--glass-bound`. It is inert and is not API. The JSDoc and DESIGN.md say so.

### 1.3 · The publication (`src/components/aurora/*`), as C′ built it (`D3-Cp-proto.patch:56-250`), with two changes

- `publishGlassField(host)` (the per-host `WeakMap`, worst tones, unmount recompute) writes `--glass-field-lo/-hi/-ceiling`. It also writes the registered `--glass-field-live: 1`, which replaces the `data-glass-field` attribute (E-1: one contract, a number a claim can read through the cascade, not an attribute that reads true on a host out of the claim's scope; Cp-crit §4.2). On every change it dispatches `glass-field` on `document`.
- `useAurora` (`useAurora.ts:165`) gains `groundHost` and `groundCeiling`. It publishes in `onMounted` (`:297`) before the `"css"` early return, re-publishes on a config or ceiling change with `flush: "sync"`, and disposes in `onBeforeUnmount` (`:394`). `Aurora.vue` passes `groundHost: root.parentElement` and `groundCeiling` = 1 under reduced transparency, else the clamped `opacityCeiling` (`Aurora.vue:90-93, 125`). `auroraGroundTones(config, saturate)` takes the min luma and max saturated tone over `sampleAuroraField`'s lattice (`auroraFallbackGround.ts:166, 227-260`) and returns `null` for `source: "image"`.

### 1.4 · Q-8 (c): thicken at once, thin on the spring

As C′ built and measured it (Cp-proto §3.4: M-2m 296/296; the `lagonly` plant 2.93 / 3.81).
- Registered lag twins `--glass-ground-lo-lag` and `-hi-lag` on `[data-glass-ground]`, with `transition: … var(--spring-panel-duration) var(--spring-panel)`.
- The solve reads `lo′ = min(lo, lo-lag)` and `hi′ = max(hi, hi-lag)`.
- The ladder's `transition: background-color` leaves the five rungs (`glass/ladder.css:65, 91, 107, 128, 144`); the shadow keeps its clock. D-1 holds: thinning travels with weight, and a worsening ground thickens in the same frame.

### 1.5 · The held floor (`src/styles/glass/veil.css:65`)

`--glass-veil-floor: var(--glass-content-bound)`, which equals `--glass-bound` unclaimed. A held plate under a claim sheds no lower than the claimed licence. That licence is legible for every static ink (§1.1), so the floor needs no chrome exception. C′'s dock pin (Cp-proto §1.2) is struck, because the dock's static ink is covered by the same identity. FL-7's `max(0.6 × rest, floor)` (`grasp.css:135`) is unchanged.

### 1.6 · Q-6 (b), the reported arm

It is built as a probe injection only, for the report, not shipped. The well's perimeter α is solved against its host's worst composite tone, which under the static licence is `need_e` on every thinned plate (Cp-spec v2 formula, with `--glass-host-e := --glass-need-e`). It ships only if the owner rules (b), or if M-3 reds under (a). Under (a) M-3 is green on every claimed row (§2.2), so the arm has nothing to cure.

### 1.7 · The demo's claimed region (C-8, H3-10)

`demo/stories/substrates/glass-material.vue:121-147`, the first section ("unified material"): its `ShowcaseFrame` gets a template ref and `useGlassGround(frame, "field")`. The story's Aurora teleports to `<body>` (`demo/chassis/hero/StoryHero.vue:111-119`), so its publication host is `body` and the claim is in scope. The frame paints no fill at `tier="field"`; the prototype confirms that in the glance (an interposed fill there would be the §5 risk 1 class).

### 1.8 · What C″ does not touch

FL-1..FL-16 as built. The chrome α (Q-3 a). The Dialog room (FL-8). W-A and H-4 (they read `--glass-bound`). The blur ladder 6/10/12/16/18. Every lighting token (no layer added; O-87).

## 2 · Probes on HEAD+floor v2 (records under `rec/`)

### 2.1 · The licence, computed (`D3-Cpp-computed.mjs`, 22:11:58-22:13:08, load 37.8 → 41.9; `rec/computed.log`, `computed.json`)

Ladder under `?claim=honest`. Stands (black, white) carry a bare claim with no tones, because floor v2 has no tone function: that is the any-input claim C-2 names. Aurora is a field claim with the c1 publication literal (`+pub`, lo 0.4117, hi 0.7825) or without it (`nopub`). Paper is a page claim (light 0.9822 / dark 0.0400). Chromium and Playwright WebKit read identically to four decimals.

| licence ink | theme | any-input claim (black, white) | field c1 `+pub` | field `nopub` | page | `--glass-bound` |
|---|---|---|---|---|---|---|
| **static (C″)** | light | **0.8910** | 0.8111 | **0.8910** | 0.0000 | 0.8910 |
| static (C″) | dark | **0.8731** | 0.8277 | **0.8731** | 0.4150 (the lift) | 0.8731 |
| `-strong` (L 0.4096) | light | 0.7686 | 0.5991 | — | 0.0000 | 0.8910 |
| reach (L 0.3061, C′) | light | 0.6243 | 0.3489 | — | 0.0000 | 0.8910 |

Chrome (floating, overlay, popover, capsule) reads the bound under every claim.

### 2.2 · Paint (`D3-Cpp-probe.sh`; Chromium gate, Playwright WebKit information; `rec/probe-run.log`, `rec/{cpp,cpp0,reach,strong}/`)

| capture | time | load at start → end |
|---|---|---|
| `cpp` (static licence, claimed), 20 cells | 22:13:30-22:16:24 (173.8 s) | 42.0 → 87.4 |
| `cpp0` (same build, unclaimed), 20 cells | 22:16:24-22:19:26 (181.9 s) | 87.4 → 262.1 |
| `reach` (Chromium light), 3 cells | 22:19:26-22:20:15 | 262.1 → 508.1 |
| `strong` (Chromium light), 3 cells | 22:20:15-22:21:15 | 508.1 → 651.5 |

Every witness's verdict line counts the cells this probe did not capture (dialog, aurora50, checker, stripes) as FAIL rows. The rows below exclude them: `cpp` M-2 60 of 820 are all MISSING, as are M-3 60 of 316.

| reading (Chromium unless labelled) | C″ claimed (`cpp`) | unclaimed (`cpp0`) | reach licence | strong licence |
|---|---|---|---|---|
| M-2 rows under 4.5 | **0** (both engines) | 0 | 7 | 4 |
| light c1 wash: muted / `-strong` | **4.84 / 6.30** | 5.39 / 7.04 | **2.69 / 3.54** | 3.67 / — |
| light black wash: muted / `-strong` | 4.83 / 6.32 | 4.83 / 6.32 | 2.36 / **3.13** | 3.56 / ≥ 4.5 |
| `claim` scene (H3-6), light min muted / `-strong` | 5.33 / 7.19 (Playwright WebKit 5.07 / 6.25) | — | — | — |
| M-3 light c1 perimeter | **3.08-3.14**, all 16 ≥ 3.0 | 3.10-3.14 | **1.85**-3.14 (4/16 under) | — |
| M-3 light black perimeter | 3.10-3.11 | 3.10-3.11 | **1.62**-3.10 | — |
| M-4 (non-missing reds) | 8 rows: the dark capsule (fg `#e9e6e2`, muted `#d5d0c8`), every dark cell, both engines, floor v2's own row | the same 8 | — | — |
| M-6 dark paper (page claim) | content adjacency 0.031 / 0.029; chrome 0.008 / 0.007 ✗; signed leg green (wash ΔE 0.064, ΔL +0.064) | wash→quiet 0.007 ✗, quiet→resting 0.004 ✗ | — | — |
| M-6 light paper | adjacency 0.003-0.004 (Q-1 a: struck) | 0.001-0.004 | — | — |

The reach and strong rows reproduce Cp-crit §4.1 on floor v2 (3.13 against its 3.18 over black). The static licence leaves no ink row under the target on any claimed ground.

### 2.3 · Transmission (`t-transmission.mjs` on the same captures; `rec/*/t-transmission.log`)

| | light wash T / T_c1 | light quiet | light resting | dark wash T / T_c1 |
|---|---|---|---|---|
| floor v2, unclaimed (`cpp0`) | 0.110 / **0.121** | 0.075 / 0.082 | 0.035 / 0.039 | 0.125 / 0.144 |
| **C″ claimed (`cpp`)** | 0.110 / **0.211** | 0.075 / 0.140 | 0.035 / 0.071 | 0.125 / 0.202 |
| strong licence | 0.231 / 0.441 | 0.153 / 0.295 | 0.078 / 0.153 | — |
| reach licence (C′) | 0.376 / 0.713 | 0.251 / 0.484 | 0.125 / 0.249 | — |
| Playwright WebKit: floor / C″ | 0.110 / 0.109 → 0.193 | — | — | 0.127 → 0.174 |

T (black/white) equals the floor's under C″, because a stand claim with no tones is the any-input claim.

- **C-7:** ×1.74 Chromium (0.211 / 0.121), ×1.77 Playwright WebKit, dark ×1.40.
- **Analytic:** T_claim / T_floor = (P − need)/(P − g) ÷ (P − need)/P = P/(P − g) = 1.733 at g 0.4117. The same ratio holds for the strong (1.74) and reach (1.73) licences, each against a floor solved at the same ink.
- **Decomposition of C′'s pass-2 differentiator** (0.121 → 0.713): ground knowledge alone takes it to 0.211, and the ink lever does the rest.

### 2.4 · The colour-retune hazard (`rec/retune-bg*.log`; 22:23:14-22:23:49, load 598 → 654)

Floor v2 + the static licence with the page tone as a stale literal (paper's), with H3-8's `retune-bg` injected, Chromium.
- **Text:** every run ≥ 4.5 (light min wash muted 5.57; dark 7.21).
- **Dark M-6 against the retuned page `#1c1f26`:** wash ΔE **0.024** ✗, quiet 0.038 ✗. The lift was solved against the stale page tone.

A page tone held as a number desyncs silently, so the resolver reads the colour (§1.2).

## 3 · Every row, how it will be met, and its H3 witness

A row passes only green in Chromium in both themes with a plant that reds it (P2-6.3). "Inherits" means floor v2's reading stands unchanged, because C″ changes nothing that row reads.

### 3.1 · C″ route rows

| row | how C″ meets it | witness | plant that must red it | spec-time reading |
|---|---|---|---|---|
| **C-1** every ink solved, or the licence at the lightest | the licence at FL-5's ink, the lightest muted register any plate carries; the composite identity (§1.1) covers fg, muted, `-strong`, the capsule and wells at any depth | M-2 with the H3-2 `-strong` run and capsule, H3-6 claim cell, under `claim=honest` | `reach` and `strong` injections (`D3-Cpp-probe.sh`): `-strong` 3.13, muted 3.56 | **green on the probed cells**, 0 M-2 rows under (§2.2) |
| **C-2** any-input tones paint `--glass-bound` | the same formula at the same ink: identity | W-A leg 4 on stand cells under `claim=honest` (H3); the computed probe | `strong` licence: 0.7686 ≠ 0.8910 | **green**, 0.8910 / 0.8731 both engines (§2.1) |
| **C-3** dead publication stamped, stamp true | out of scope is inert by identity (§2.1 `nopub` 0.8910). The resolver reads `--glass-field-live` through the cascade and stamps `unpublished` plus one warn; `fieldgone` re-stamps on the dispose event | W-S (H3-7) on fieldout / fieldtwo / fieldgone, claimed and `noclaim` | the resolver's stamp removed: W-S can stay green (no paint change), so the plant reads the console count and the attribute directly. Shared with H3's `--fx-stamp` fixture, a second plant: a `published` stamp written unconditionally (W-S 12/16 red per H3 §2.1) | unbuilt |
| **C-4** colour retunes followed or refused loud | `--background`: followed (the resolver reads the colour). `--foreground`, `--card`: refused loud (`desync`, warn, claim to the floor) | W-C leg 2 (H3-8) under `claim=honest`; leg 1 band [4.5, ∞) at the worst claimed tone | §2.4's stale page tone (dark wash 0.024 from the page) and the resolver's coherence check removed | the hazard measured; the cure unbuilt |
| **C-5** Q-6's ruling built | (a) holds: light claimed wells 3.08-3.14. (b) built as a reported probe arm (§1.6) | M-3 | `reach` licence: 1.62-1.85 | **(a) green on the probed cells** |
| **C-6** two-Aurora cell and unmount, in paint | the per-host worst-tones publication: `fieldtwo` holds both on `#app` (worst lo of c1 and c0.5); the unmount recomputes, re-stamps and returns to the bound | W-S and M-2 on fieldtwo / fieldgone | a publication that keeps the last writer (not the worst) | unbuilt |
| **C-7** claimed light c1 wash T_c1 ≥ 2 × floor v2's | not met by any form that keeps C-2 (§2.3) | T on the full battery | — | **FAIL, ×1.74 (Chromium)**: the route banks if the prototype confirms |
| **C-8** the demo's claimed region | §1.7 | GLANCE `--story-claim` (H3-10) | the story claims nothing: FAIL 2 pairs (H3 §2.1) | unbuilt |

### 3.2 · Core rows (24)

| # | row | how met | reading now |
|---|---|---|---|
| 1 | RAW | inherits | floor v2 PASS 48 |
| 2 | M-1 | the page claim thins light content to α 0, which paints paper | to measure in the prototype; analytic: composite = paper |
| 3 | M-1x | REPORTED under Q-11 (a). Over the deep canvas a claim is a stand of `#193b59`. That buys colour through transmission, which M-1x's colour clause counts (H3 §5.2) | REPORTED |
| 4 | M-2 (R1/R3, `-strong`, held, H-10, H3-6) | C-1's identity. Held: §1.5. H-10 honest claim: the hostile band is claimed, so it computes the bound | 0 rows under on the probed cells |
| 5 | M-2m incl. 100 s drift | §1.4 (Q-8 c). The drift window reads the t = 0 mirror tones against the live field (§5 risk 3) | unbuilt; C′ 60 s worst 4.74 |
| 6 | M-3 | C-5 | green on the probed cells |
| 7 | M-4 signed | inherits floor v2's dark capsule row (+0.067). The cure is the floor's (FV2 §9: a dark `--on-glass-muted-strong` at least 0.08 under fg, for example L 0.835); no C″ mechanism touches it | 8 red rows, the floor's |
| 8 | M-5 | no per-frame writer; the resolver runs on events only | unbuilt; C′ 20/20 |
| 9 | M-6 | Q-1 (a): light struck, dark chrome adjacency 0.007-0.008 open (the floor's); the signed leg green via the derived lift. (c) reported | open on Q-1 |
| 10 | M-7 | inherits | floor v2 PASS 8 |
| 11 | M-8 | inherits (chrome unchanged) | floor v2 PASS 8 |
| 12 | M-9 dark veil | inherits floor v2 (+0.006, FL-6's scrim, D5 shares) | open, the floor's |
| 13 | T | §2.3 | reported |
| 14 | held release window | §1.5. The carriers paint the claimed veil (FL-14) | unbuilt; floor v2 green |
| 15-16 | O-66 G2, G3 | inherit (no claim in the o66 scenes) | open, the floor's |
| 17 | W-C | C-4, band [4.5, ∞) | unbuilt |
| 18 | both engines under H3, `+shim` | the prototype's run | — |
| 19 | a plant per green | §3.1 and §3.3 | — |
| 20 | prose sweep | every touched file: `glass.css` §8 header ("None ships here" becomes the claim's licence), `veil.css:46-63`, `ladder.css` clock, `grasp.css:122`, `useAurora.ts`, `Aurora.vue`, DESIGN.md's plate register **and its stale tier table** (`DESIGN.md:517`, Cp-crit FL-12) | — |
| 21 | FL-13 | consumer addenda stated per theme (§4) | text only |
| 22 | O-87 | no layer added; the inherited `--shadow-modal` stack and dock glow are W-0.11's | inherits FV2 §6 |
| 23 | gestalt (D-1..D-3, O-62) | the claimed c1 light wash reads more of the field than the floor (T_c1 0.211) and far less than C′'s salmon (0.723); the frames decide whether that reads as glass | owner glance |
| 24 | STACK | inherits (`isolation: isolate`, FL-14) | floor v2 PASS 24 |

### 3.3 · Floor rows

FL-1..FL-16 stand as built in `floor-v2.patch` (FV2 §1), with FV2 §5's plants. C″ changes only these:
- **FL-4:** a surface thinner than the bound is now licensed by a resolver-checked claim. Plant: a bare claim with tones and no resolver stays at the bound (§2.1 stands).
- **FL-5:** one formula, now parameterized. Plant: FV2's `plant-bound`.
- **FL-7:** the held floor reads the content bound. Plant: `plant-heldfloor` under a claim.

## 4 · MIGRATION rows (C″ is 11.0.0 or W-H material: it adds names and changes paint inside claims)

- _Glass may paint thinner than `--glass-bound` inside a claimed ground._ `claimGlassGround(el, "field" | "page" | colours)` (or `useGlassGround`) states what is painted under `el`'s glass. Content rungs inside it solve the bound against that ground; chrome does not move. A claim the library cannot verify paints the bound and says so (`data-glass-ground-state`, one console warning).
- _New, additive:_
  - `claimGlassGround`, `useGlassGround`, `glassGroundTone`, `publishGlassField`, `readGlassSaturate`, `auroraGroundTones`;
  - `useAurora({ groundHost, groundCeiling })`;
  - `data-glass-ground`, `data-glass-ground-state`;
  - `--glass-ground-lo/-hi`, `--glass-page-lo/-hi`, `--glass-content-bound`, `--glass-field-lo/-hi/-ceiling/-live`, `--glass-lift-gap`.
- _The ladder rungs no longer transition `background-color`._ The α moves on the claim's spring or the grasp register's lerp.
- _A held plate's floor is the claimed bound_ (`--glass-veil-floor: var(--glass-content-bound)`), equal to `--glass-bound` outside a claim.
- _Writing `--card` or `--foreground` as a colour inside a claimed page is refused_: the claim stands down to the bound and warns. Retune `--card-l` or `--on-glass-muted-l`. A colour retune of `--background` is followed.
- **Not** in C″ (struck from C′, so no rows): `--muted-foreground` is not solved per plate; `--on-glass-muted` keeps its root value; `--background` and `--foreground` keep their colour form and their `light-dark()` fold; `--glass-well-tone` is unchanged; there is no `@utility glass-ink`.
- Consumers (E-6), UNMEASURED because the siblings are read-only:
  - keyframes claims `"field"` on the `HeroAurora` host's content;
  - value.js claims its page through its `--saved-bg-*` stops (a colour list);
  - fourier claims plot containers with their card colour;
  - chicago claims its static `.ground` stops and nothing over photos.

## 5 · Risks

1. **Interposed paint.** A claim states everything painted between the substrate and its glass. Library paint inside a page claim holds by margin when it is at least as light as the band (L 0.898 light): `--secondary` reads muted 5.33 (§2.2). `--accent` (`hsl(33 30% 82%)`, about L 0.87) under an α-0 plate would read about 4.4 by arithmetic, and no witness cell holds it. The contract text names it; a library fill darker than the band under a page claim is the consumer's to declare.
2. **C-7 is structural.** The gain over c1 is fixed at P/(P − g). Only a brighter claimed tone (c0.5: computed T 0.387, ×3.5) or the owner's Q-12 lever, applied to the floor as well, changes what C″ is for. The banked component's worth is Q-11 (c) (chrome thinning only where a claim knows the ground) and kinder fields, not the default aurora.
3. **The t = 0 mirror against the live field (PF-11).** The 100 s drift window (H3-12) is the witness. Margin: 4.84 against 4.5 on the claimed c1 wash.
4. **The resolver's observer.** A retune applied by a path it does not watch (a constructed stylesheet via `adoptedStyleSheets`) is not seen. Watching `document.adoptedStyleSheets` has no event, so the risk is stated, not cured.
5. **A light page claim paints content at α 0.** The plate is then its edge, shadow and blur only. Whether that reads as glass under O-62 and O-87 is the glance's (core 23).
6. **Recalc.** No per-plate chain remains, so it should sit near the floor's ×1.0-1.25, not C′'s ×2.0-2.5. Unmeasured: `D3-Cp-recalc.mjs` owed in the prototype.
7. **Real Safari: UNMEASURED (owner's safaridriver checkbox)**: the `@property` lag transition, the layered claim rule, and the resolver's computed-style reads.

## 6 · Order for the prototype seat

1. Apply floor v2. Build §1.1 and §1.2 with a `"field"` publication. Run T over c1, black and white under `claim=honest` and unclaimed. **If C-7 reads under ×2 (spec time: ×1.74), report C″ as BANK** and bank the component: the claim, the resolver and the publication, with §2's readings. The agglomeration rules it.
2. Otherwise, or if the agglomeration asks for the full record, build the remainder and run the full H3 battery plus `claim=honest` and the `noclaim` variant, the §3 plants, `D3-Cp-recalc.mjs`, and GLANCE with `--story-claim`.

## 7 · Reproduce

```sh
B=.claude/worktrees/bl/D3/p3/Cpp-spec; H=docs/tranches/BL/design/material/harness; P=docs/tranches/BL/design/material/pass-3
git worktree add --detach $B/wt HEAD && ln -s $PWD/node_modules $B/wt/node_modules
git -C $B/wt apply $PWD/$P/floor-v2.patch
export D3_OUT=$PWD/$B/out
node $H/build.mjs $B/wt --label fv2
node $P/D3-Cpp-computed.mjs $D3_OUT/builds/fv2/dist --out $P/Cpp-records/computed.json
sh $P/D3-Cpp-probe.sh $D3_OUT/builds/fv2/dist
# §2.4: D3-Cpp-probe.css + the c1 literal + RETUNES["retune-bg"], ladder over paper, Chromium, claim=honest; then m2 and m6
git worktree remove --force $B/wt
```
