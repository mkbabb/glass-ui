# D3 · pass 2 · D3-C′ · prototype (the cascade ink, fail-safe)

| field | value |
|---|---|
| seat | D3 pass 2, PROTOTYPE for route C′ (REGISTRY §7.3 C′ items 1-9 and "Every route"). Builds `D3-Cp-spec.md` on the real source over `floor.patch` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked `020f6586`. Worktrees were cut at the checkout's HEAD: `a115850c` (route) and `3fbaa0e7` (base for the glance). `git diff --stat 020f6586 3fbaa0e7 -- src demo tests package.json` is empty, so both are the tasked material |
| patch | `D3-Cp-proto.patch` (this directory): `git diff` of the route worktree against HEAD+floor, 26 files, +647 / −63. `git apply --cached --check` is clean on a `a115850c` index with `floor.patch` applied |
| engines | Chromium 149 (the gate) and **Playwright WebKit 26.5** (headless, paint-only, no `backdrop-filter`, every dock row `+shim`). **Real Safari: UNMEASURED (owner's safaridriver checkbox)** in every cell of this file |
| load | 15-130 through the seat (other sessions). Every timing below carries its load. No cell timed out and no window fell under its frame minimum, so no re-run was owed |
| fences | no source edit or git write in the checkout. Writes in the checkout: this file, `D3-Cp-proto.patch`, `D3-Cp-recalc.mjs`, `D3-Cp-plants/`, `glance-D3-Cp/`, and the in-place harness changes listed in §6. Both worktrees are removed |

## 0 · In brief

1. **C′ is built and green on the shared battery wherever the floor is.** Under honest consumer claims, Chromium reads RAW, M-1, M-2m, M-4, M-5, M-7, M-8 and M-9 green in both themes. M-2's 50 red rows are all `held` cells, the floor's grasp-carrier defect (`D3-Cp-spec.md` §3.1). Playwright WebKit reads M-2 397/397 in both themes. Unclaimed, the route is the floor: W-A passes 192/192 and T per rung equals the floor's to the third decimal.
2. **The differentiator is real and large in light** (item 4). Under a claim the light content band over the c1 aurora transmits wash 0.651 / quiet 0.434 / resting 0.217 (computed α), against A′'s 0.109 / 0.073 / 0.036. In dark it is wash 0.234 / quiet 0.156 / resting 0.078, against 0.127 / 0.085 / 0.042. **C′ does not downgrade** under the critic's trigger.
3. **Every green carries a plant that reds it** (§4): eight mechanism-removal plants, each red on the witness its green lives on.
   - The dead solve reds H-7 (40/44) while M-2 stays green (164/164). M-2 is blind to it, as C-crit §3 found.
   - Removing Q-8 c dips the worsening step to 2.93 light and 3.81 dark.
   - A false claim reads 1.00, and so does pass 1's page default.
4. **One structural change from the spec.** The claim seat is an attribute, `data-glass-ground`, declared in one layered rule, not three `@utility` classes (§1.1).
   - The repo's orphan-CSS gate forbids an unlayered claim rule.
   - A specimen injection cannot add a class, but a consumer can always write an attribute.
5. **Open, and not C′'s alone to close:**
   - M-3 light wells over a thinned plate read 1.62-2.65, so Q-6 a is unbuildable under thinning, as the spec predicted. It is an owner ruling.
   - The dark perimeter gap (2.79-2.92) is the floor's.
   - A colour retune of `--background` desyncs the page claim (4.37).
   - The held-scene defect is the floor's.
   - Real Safari is UNMEASURED.

## 1 · What was built

Line references are to the route worktree (`a115850c` + `floor.patch` + `D3-Cp-proto.patch`). The patch is the source of record for the code.

### 1.1 · The claim (`tokens/glass.css`)

| piece | form |
|---|---|
| the root block (unlayered, `:root, .dark`) | the floor's bound unchanged, plus three ground-independent numbers: `--glass-ink-dir`, `--glass-reach-l` (= `--foreground-l` ± `--glass-ink-reach`), and `--glass-well-l` / `--glass-well-pole-e` (the well's pole L: the oklab mix is linear in L). Chrome rungs (`floating`, `overlay`, `chassis`, `dock`, `crown`, `sheet`, `dialog`) still read `--glass-bound` |
| the ground block (`@layer base`, `:root, .dark, [data-glass-ground]`) | one rule, the only place each of these is declared: `--glass-ground-e` (clamped to the pole; reads the lag twins), `--glass-host-e` (= the ground), `--glass-content-bound` (= `--glass-bound` here), `--glass-content-step`, and the three content rungs `--glass-veil-wash/quiet/resting` |
| the claim rule (`[data-glass-ground]`, same layer, after it) | the lag twins and their `transition` (Q-8 c), `--glass-page-e`, the dark lift `--glass-veil-lift` (derived from `--background-l`, `--card-l` and `--glass-lift-gap`: 0.415 dark, 0 light), and the content bound solved at the reach ink: `max(lift, clamp(0, dir·(E_band − g)/max(dir·(P − g), 1e-4), 1))` |
| modes | `="page"`: lo = hi = the page's encoded tone. `="field"`: the field publication mixed with the page at the ceiling. Bare: the consumer writes `--glass-ground-lo/-hi` beside it |
| registrations | `--glass-content-bound` (initial 1: a dead solve paints opaque), `--glass-ground-lo/-hi` and their lag twins (initial 0 / 1: the any-input poles), `--glass-field-lo/-hi/-ceiling` (initial 0 / 1 / 1: an absent publication licenses nothing) |
| margins | two authored tokens beside `--glass-ink-target`: `--glass-ink-reach: 0.09` (M-4's 0.08 + 0.01) and `--glass-lift-gap: 0.065` (M-6's 0.05 + 0.015) |

**Why an attribute, not `@utility glass-ground*`.**
- `tests/gates/orphan-css-partial.test.ts:479` exempts only the token roots (`:root`/`.dark`, custom properties only) from `@layer`, so a claim rule must be layered.
- A layered claim cannot share the unlayered root block, so the ground-dependent declarations moved into one layered rule that the roots and the claim share. Each formula is still declared once.
- The attribute needs no Tailwind on the consumer's side. It also lets the specimen page claim without an injected copy of the mechanism.
- A claim on the root element itself is a no-op: the roots' content bound is the bound.

### 1.2 · The ink

| piece | where |
|---|---|
| `@utility glass-plate` | `glass/veil.css`. It holds one α (`--glass-paint-a`) shared by the paint (`--glass-veil`) and the solve. The plate's composite tone is `--glass-host-e`. The floor is `--glass-content-bound`. The plate applies `glass-ink` |
| `@utility glass-ink` | `glass/veil.css`. It reads `--glass-ink-e` and writes `--on-glass-muted` at exactly `--glass-ink-target`, stopped at the reach. It is unregistered: a dead chain leaves the muted run on the foreground (H-7 reads ΔL 0) |
| the root `--on-glass-muted` | `on-glass-fg.css`, `dark-arm.css`. It is `oklch(var(--on-glass-muted-l) var(--on-glass-muted-c) var(--on-glass-muted-h))`, the static ink every non-plate reader keeps (the dock, dock search) |
| the field well (leaf) | `_shared/field/control.css`. It declares `--glass-paint-a` (the bound) and `--glass-ink-e` (its well pole over `--glass-host-e`) and re-points `--muted-foreground`. `Input`, `Textarea` and `NumberFieldInput` carry the `glass-ink` class: `control.css` is an SFC `<style src>` and cannot `@apply` a library utility |
| the dock | `dock/styles/dock.css`. `--glass-veil-floor: var(--glass-bound)` after `@apply glass-plate`: the dock's text reads the static inks of `.glass-dock`, not its plate's solved ink, so a held dock never sheds below the any-input bound, claim or not |
| page and ink L | `color-radius.css`, `dark-arm.css`. `--background-l` and `--foreground-l` are numbers; `--neutral-0` and `--foreground` are `oklch()` over them, and both leave the `light-dark()` fold (`light-dark.css`). Dark `--foreground` sits on a half step in G (229.5), so its oklch spelling may differ by 1/255 in one channel |
| the ladder clock | `glass/ladder.css`. The five rungs no longer transition `background-color`; only the shadow keeps a clock (spec §1.4) |

### 1.3 · The publication (`composables/glass/groundTone.ts`, `aurora/*`)

| piece | form |
|---|---|
| `glassGroundTone(color, { saturate })` | encoded Rec. 709 luma (`lo`), and the encoded tone of Y after the Filter Effects saturate matrix (`hi`). Exported on the root barrel and `/glass` |
| `publishGlassField(host)` | a module `WeakMap<HTMLElement, Map<symbol, publication>>`. The host carries the worst tones of the substrates it holds (min lo, max hi, max ceiling). An unmount recomputes from the rest. One substrate that cannot state its tones unpublishes the host (`data-glass-field="unpublished"`) with one `console.warn`. Nothing is document-global |
| `auroraGroundTones(config, saturate)` | the min luma and max saturated tone over the CPU mirror's 16 × 16 lattice (`sampleAuroraField`). It returns `null` for `source: "image"`, whose photo the mirror cannot see |
| `useAurora` | new options `groundHost` and `groundCeiling`. It publishes in `onMounted`, before the `"css"` early return, so every renderer arm publishes the same config arithmetic. It re-publishes on a deep config change and on a ceiling change with `flush: "sync"`, never per frame. With no glass stylesheet in the cascade (`--glass-saturate` unreadable) it publishes nothing |
| `Aurora.vue` | `groundHost: root.parentElement`; `groundCeiling`: 1 under `prefers-reduced-transparency`, else the clamped `opacityCeiling` |

Measured: the default aurora publishes lo 0.4117 and hi 0.7825. The spec's per-pixel read of the live field gives 0.421 and 0.785 (`D3-Cp-spec.md` §3.3). The mirror's lo errs dark, the conservative side.

Chromium (WebGPU) and Playwright WebKit (the GL arm) publish identically:
- light: lo 0.4117, content bound 0.349;
- dark: hi 0.7825, content bound 0.766.

## 2 · Toolchain (route worktree; vite cache `.vite-cp` and `dist` inside it)

| step | result | time, load |
|---|---|---|
| `vue-tsc --noEmit` | exit 0 | 16 s, 37-45; re-run after the last TS edit: exit 0 at 66 |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 0 after the library build. Before it, two `@mkbabb/glass-ui/fourier-math` self-reference errors needed a `dist` | 13 s, 39-40; re-run: exit 0 |
| library build `vite build` | exit 0. The published roster rebound deliberately: `.published-roster` gains `utility glass-ink` | 10 s, 38-48 |
| full units, final (`vitest run`) | **2318 passed**, 10 expected-fail, 1 skipped; **5 failed**: `boot-graph` ×3 (needs a root `dist-demo`, absent in any fresh worktree, as on the floor); `color-mix-endpoints` timed out at 5 s under load and **passes at `--testTimeout 120000`** (load 73); `forms-seam` G-F6, a class-list datum, then updated → 6/6 | 34 s, 67-113 |
| targeted re-run (aurora, glass, styles, field, textarea, public surface, design, orphan gate) | **41 files, 636 passed**, 5 expected-fail | load 66 |
| test datums updated (in the patch) | `public-surface.spec.ts` (three exports); `plate-register` (DESIGN.md names `glass-ink`); `textarea.contract` and `forms-seam` (the `glass-ink` class); `glass-subtlety.test.ts` (reads the root scope with claim rules dropped; content rungs derive from `--glass-content-bound`, which is `var(--glass-bound)` at the root; the plate floor reads `--glass-content-bound`; the veil reads the rung through `--glass-paint-a`). New: `tests/composables/glass/groundTone.test.ts` (6 tests: the poles, luma and saturate, two substrates and unmount, unpublished-and-loud, no cross-host leak, the aurora lattice and its image refusal) | — |
| token-graph cycle gate | green. v2's well hand-off first formed a name-level cycle (`--glass-comp-e` ↔ `--glass-host-e`). It was cured by naming: the plate computes `--glass-host-e`, and `glass-ink` reads `--glass-ink-e`. Q-10 is untouched | — |

**Bundle datum** (`scripts/verify-export-types.mjs`):
- the route unpacks to **2,911,405 B**: the floor's 2,900,958 B (FLOOR §3) + 10,447 B, and the HEAD datum 2,919,057 B − 7,652 B;
- `G-BUNDLE-RATCHET` reports a shrink against the HEAD datum and is owed a deliberate rebind at landing, as the floor's is.

**Shipped CSS**, every `.css` under `dist`, against a floor library build made the same way:
- raw: 459,749 → 464,015 B (+4,266 B);
- concatenated `gzip -9`: 160,805 → 161,841 B (+1,036 B).

## 3 · H2 under the route

Runs, both `run.mjs <wt> --label … [--demo]` (build, 108 cells, 8 live and 8 motion windows, the unshimmed probe, the retune variant), then `baseline.mjs`:
- **`cp` (claimed)**: `--query claim=honest`, 11:38-11:59, 1136 s of capture, load 49-70;
- **`cp0` (unclaimed, the fail-safe default)**: no query, 11:59-12:21, 1138 s, load 61-84.

### 3.1 · By witness, engine and theme

Each cell gives the claimed run first, then the unclaimed one after "/". `—` means the witness reads nothing there. Every WebKit column is **Playwright WebKit (+shim)**.

| witness | Chromium light | Chromium dark | Playwright WebKit light | Playwright WebKit dark |
|---|---|---|---|---|
| RAW | PASS 22 / PASS 22 | PASS 22 / PASS 22 | PASS 22 / PASS 22 | PASS 22 / PASS 22 |
| M-1 | PASS 11 / PASS 11 | — | PASS 11 / PASS 11 | — |
| M-2 | FAIL 26/397 / FAIL 26/397 (held only) | FAIL 24/397 / FAIL 24/397 (held only) | PASS 397 / PASS 397 | PASS 397 / PASS 397 |
| M-2m | PASS 148 / PASS 148 | PASS 148 / PASS 148 | PASS 148 / PASS 148 | PASS 148 / PASS 148 |
| M-3 | FAIL 34/177 / FAIL 12/177 | FAIL 93/177 / FAIL 91/177 | FAIL 33/177 / FAIL 2/177 | FAIL 91/177 / FAIL 86/177 |
| M-4 (H-7) | PASS 77 / PASS 77 | PASS 77 / PASS 77 | PASS 77 / PASS 77 | PASS 77 / PASS 77 |
| M-5 | PASS 10 / PASS 10 | PASS 10 / PASS 10 | PASS 10 / PASS 10 | PASS 10 / PASS 10 |
| M-6 | FAIL 4/4 / FAIL 4/4 (Q-1 a) | FAIL 2/26 / FAIL 3/26 | FAIL 4/4 / FAIL 4/4 | FAIL 2/26 / FAIL 3/26 |
| M-7 | PASS 4 / PASS 4 | PASS 4 / PASS 4 | PASS 4 / PASS 4 | PASS 4 / PASS 4 |
| M-8 | PASS 4 / PASS 4 | PASS 4 / PASS 4 | PASS 4 / PASS 4 | FAIL 1/4 / FAIL 1/4 |
| M-9 | PASS 10 / PASS 10 | PASS 8 / PASS 8 | PASS 10 / PASS 10 | PASS 8 / PASS 8 |
| W-A | FAIL 1/96 / PASS 96 | FAIL 1/96 / PASS 96 | FAIL 1/96 / PASS 96 | FAIL 1/96 / PASS 96 |
| W-C (C's own) | FAIL 24/160 / FAIL 34/160 | FAIL 48/160 / FAIL 58/160 | FAIL 15/160 / FAIL 19/160 | FAIL 38/160 / FAIL 47/160 |
| W-G | FAIL 4/20 / FAIL 12/20 | FAIL 8/20 / FAIL 16/20 | FAIL 12/20 / FAIL 16/20 | FAIL 14/20 / FAIL 20/20 |
| T | reported | reported | reported | reported |

Whole-run verdicts, Chromium gate, as `run.mjs` printed them:
- **claimed**: RAW PASS 44 · M-1 PASS 11 · M-2 FAIL 50/794 · M-2m PASS 296 · M-3 FAIL 127/354 · M-4 PASS 154 · M-5 PASS 20 · M-6 FAIL 6/30 · M-7 PASS 8 · M-8 PASS 8 · M-9 PASS 18 · W-A FAIL 2/192 · W-C FAIL 72/320 · W-G FAIL 12/40 · T reported;
- **unclaimed**: the same, except M-3 FAIL 103/354 · M-6 FAIL 7/30 · W-A PASS 192 · W-C FAIL 92/320 · W-G FAIL 28/40.

W-B, W-D, W-E and W-F belong to banked or retired families and read as at H2 (W-B 12/16, W-D 5/9, W-F 70/160 in both runs).

### 3.2 · What each red is

- **M-2, all 50 rows in both runs, Chromium only: the `held` scene.**
  - The grasp carrier frosts the held plate's own text: `wash-held` fg 1.27-1.91, muted 1.14-1.38, well placeholder 1.13-1.28, on black, white and c1, both themes.
  - Light `dock-held` muted-tab reads 4.46 over black.
  - Both are the floor's (`D3-Cp-spec.md` §3.1, FLOOR smoke). Playwright WebKit paints no `backdrop-filter`, so its held rows pass.
  - Every ladder, dialog and hostile row is green in both runs.
- **M-3 light, claimed: the wells on thinned content plates.** Their perimeter (Q-6 a's fixed `--ink-perimeter`) reads 1.62-2.65:
  - wash and quiet over c1, c0.5, black, stripes and checker;
  - unclaimed, the same rows read 3.09-3.15 (FLOOR).
  - This is the spec's predicted break: **Q-6 a is unbuildable under thinning**. The cure is the v2 well perimeter solved against its host (Q-6 b), an owner ruling. It was not built, because the pass-2 default (a) holds until the owner rules (REGISTRY §5).
  - The unclaimed light rows (12) are held cells only.
- **M-3 dark, both runs: the floor's dark perimeter gap**, 2.79-2.92 on every ground (Q-6 / A′ item 3).
- **M-6.** Light adjacency (0.003-0.004) is Q-1 a, by construction. Dark: claimed page separation is green (wash `#1c1713`, ΔE 0.064, ΔL +0.064; the margin over 0.05 is 0.014, against pass 1's 0.001). The red rows are chrome adjacency (resting→floating 0.008, floating→overlay 0.007), which is the floor's.
- **M-8, Playwright WebKit dark stripes:** floating bleed 1.26, the floor's (no blur in that engine).
- **W-A, claimed only: leg 4's content row.** The thinnest content rung sits below `--glass-bound` because the claim thinned it. That is C′'s mechanism read by A′'s witness. Unclaimed it is green, 192/192. Its painted α (0.605 light) pairs a black cell and a white cell that carry different claims (lo 0 and lo 1), so it is a cross-claim figure, not a rung.
- **W-C** (C's pass-1 witness, muted p05 ∈ [4.5, 5.5]).
  - C′ solves against the worst claimed tone, so over a kinder pixel of the same ground the ratio runs above 5.5 by design, and the chrome and dock keep the static ink (6.21-6.45 over paper).
  - **The retune leg shows one C′ defect.** Claimed light paper wash muted reads 4.37. `RETUNE_CSS` re-points `--background` as a colour, and the page claim reads `--background-l`, which the retune leaves stale.
  - Dark retune wells (4.03-4.35) are red in both runs: the floor's `--card` colour retune against `--card-l`.
- **W-G** (D3-G's witness) improves under the claim (Chromium light 4/20 against 12/20 unclaimed) because thinner content carries the field's hue. It is not C′'s witness.

### 3.3 · H-10, the portal cell and the hostile band

Both runs, every hostile cell, Chromium: 0 red rows outside `held`.
- **The teleported Popover over the declared region** reads muted 4.83 in light. In dark the cell's lowest muted run is the dialog rung at 4.80.
- Playwright WebKit light reads popover muted 4.62.
- Under the honest claim, the hostile scene claims the worst of what the page paints under `<main>` (its band and its declared region): light lo 0 and dark hi 1, the any-input tones at the reach ink. Its content reads wash fg 6.75 light and 6.64 dark.

### 3.4 · M-2m (H-11), the claim's motion

Under the claim, both engines, all windows: 37/37 inks ≥ 4.5 in every frame. The worst Chromium reading is 4.78 light and 4.74 dark (well placeholders), in 117-158 step frames per window. Playwright WebKit (11-15 step frames) is worst at resting muted 4.59.

Q-8 c is the reason, not luck. The `lagonly` plant (§4), which lets a worsening tone arrive on the spring, reds the 0.5 → 1 step 16-36 ms after it (2.93 light, 3.81 dark).

## 4 · Obligations (REGISTRY §7.3 C′ 1-9, "Every route") and their plants

Plants: `D3-Cp-plants/*.css` and `D3-Cp-plants/run.sh`, Chromium, `--query claim=honest` unless named. Each witness reads only its plant's captured cells (`--cells`), so a missing cell cannot red it. Run 12:21-12:31, load 17-78.

| # | obligation | status | evidence | plant → result |
|---|---|---|---|---|
| 1 | fail-safe default in the spec, re-measured on H2, portal cell included | **MET** | unclaimed run: W-A 192/192; T equals the floor's (§5); hostile 0 red outside held; Popover 4.83 light | `rootpage` (`<html>` claims the page, pass 1's default): M-2 **FAIL 86/444**, wash muted to 1.00. `fieldfalse` (the hostile scene claims the field and hides its band): M-2 **FAIL 19/148**, wash fg 1.00 light c0.5, muted 1.57 dark c0.5 |
| 2 | the dead solve fails loud: H-7 green, and its removal reds M-2 or H-7 | **MET** | H-7 (M-4 every plate) 154/154 in both runs | `deadsolve` (`--glass-comp-y: nonsense` on every plate): M-4 **FAIL 40/44**, muted = fg `#1c1917`, ΔL_OK 0.000. M-2 **PASS 164**: blind, as C-crit §3 found |
| 3 | publication per scope; two substrates; unmount; `useAurora` arms; publish the bound | **MET in unit and in two arms; partly by construction** | per-host `WeakMap`, never global; the unit test covers two substrates, the unmount recompute, unpublished-and-loud and no cross-host leak; Chromium WebGPU and Playwright WebKit GL publish identically; lattice min/max, not the mean | `unpublished` (the publication pinned to the any-input tones): claimed light c1 wash T_c1 **0.723 → 0.438**, dark **0.379 → 0.319**. The `"css"` arm publishes by construction (before the early return), **not measured in paint**. No two-Aurora specimen cell exists in the harness |
| 4 | the differentiator: T per rung over declared library grounds against A′ | **MET, large in light, modest in dark** | §5 | the unclaimed run is the plant: T returns to the floor's (0.110 / 0.075 / 0.035 light) |
| 5 | light chrome over the field (Q-3 a); the dark 0.001 wash margin | **MET** | chrome T 0.110 light, 0.125 dark under every claim (= A′); dark claimed wash ΔL +0.064, margin 0.014 | `nolift` (`--glass-lift-gap: 0`): M-6 dark **FAIL 3/26**, wash `#0b0a08`, ΔE 0.002, ΔL −0.000 (below the page) |
| 6 | Q-8 asymmetric inertia, H-11 green | **MET** | M-2m 296/296 claimed, both engines | `lagonly`: M-2m **FAIL 10/296**, the 0.5 → 1 step: light wash muted 2.93 at 16 ms, dark 3.81 at 36 ms |
| 7 | hand-off coverage, no grandparent read | **MET for plates and wells; one reader class unmeasured** | no plate→plate hand-off (the pole clamp); one leaf (wells). Claimed well placeholders 4.74-5.23 | `noleaf` (the well solves as its host): M-2 **FAIL 7/222**, light well placeholder 4.13. Every `glass-plate` composer solves its ink, which covers by construction `[data-surface=veil]` (`surface-axis.css`), the pager chassis, `.glass-capsule` hosts and the dock search. Readers that re-point to `--on-glass-muted-strong` (`.glass-capsule`, `.feedback-tone`) keep the static strong ink, and no H2 scene reads them under a claim: **UNMEASURED** |
| 8 | the chain hand-written or generated in repo; CSS growth; recalc; Safari | **MET, Safari UNMEASURED** | hand-written, no generator; CSS +4,266 B raw / +1,036 B gzip; recalc §5.2 | — |
| 9 | `backdropMode: "live"` renamed or removed; token-graph gate under Q-10 | **MET** | `glass \| opaque` on the floor; the cycle gate is green after the §2 rename | — |
| every | floor rows built; both engines under H2; WebKit dock `+shim`; a plant per green; prose sweep; Safari | **MET except Safari** | the floor applied first; both runs captured both engines; prose swept in every touched file (`glass.css` §8 header and both blocks, `veil.css`, `ladder.css` clock and re-point, `control.css`, `dock.css`, `on-glass-fg.css`, `dark-arm.css`, `color-radius.css`, `light-dark.css` fold note, `DESIGN.md` plate register, which still claimed a luminance clamp, `useAurora.ts`) | `DESIGN.md`'s tier table (opacities 30-95%, blur 1-24 px) predates the floor and is not C′'s; left as residue for the landing prose sweep |

## 5 · Transmission (H-12)

### 5.1 · T per rung, computed α under each claimed ground

Chromium computed values, probe `probes/q1.mjs`. Playwright WebKit computed the same α to the sixth decimal on the field cells. T = 1 − α.

| claimed ground | light wash / quiet / resting | dark wash / quiet / resting |
|---|---|---|
| **A′ / unclaimed (the floor)** | 0.109 / 0.073 / 0.036 | 0.127 / 0.085 / 0.042 |
| aurora c1 | **0.651 / 0.434 / 0.217** | 0.234 / 0.156 / 0.078 |
| aurora c0.5 | 1.000 / 0.667 / 0.333 | 0.585 / 0.390 / 0.195 |
| paper | 1.000 / 0.667 / 0.333 | 0.585 / 0.390 / 0.195 (the lift) |
| black | 0.376 / 0.250 / 0.125 | 0.585 / 0.390 / 0.195 |
| white | 1.000 / 0.667 / 0.333 | 0.173 / 0.115 / 0.058 |
| stripes | 0.571 / 0.381 / 0.190 | 0.218 / 0.145 / 0.073 |
| red `#761617` | 0.453 / 0.302 / 0.151 | 0.585 / 0.390 / 0.195 |
| any claim: chrome (floating, dock, popover) / overlay / dialog | 0.109 / 0.073 / 0 | 0.127 / 0.085 / 0 |

Painted T_c1 (the slope over the c1 aurora, `t-transmission.mjs`; saturate lifts it above 1 − α, as at HEAD):

| run | Chromium light wash / quiet / resting | Chromium dark | Playwright WebKit light | Playwright WebKit dark |
|---|---|---|---|---|
| claimed | 0.723 / 0.495 / 0.258 | 0.379 / 0.255 / 0.122 | 0.673 / 0.450 / 0.214 | 0.352 / 0.237 / 0.116 |
| unclaimed | 0.121 / 0.082 / 0.039 | 0.144 / 0.097 / 0.047 | 0.111 / 0.075 / 0.034 | 0.127 / 0.085 / 0.043 |

Two quirks:
- In light the content band thins to α 0 over paper, white and c0.5. The glass then shows only its edge, shadow and blur: the well-conditioned answer to "the ground is as bright as the pole".
- In dark, quiet and resting step above the chrome floating rung under a c1 claim (resting 0.922 against floating 0.873), because both content and chrome step by thirds from different bounds.

### 5.2 · Recalc (`D3-Cp-recalc.mjs`: 300 forced recalcs, each stepping `<main>`'s claimed tone; 116 elements)

| build | Chromium ms per step (mean; CDP `RecalcStyleDuration`) light / dark | Playwright WebKit ms per step (mean) light / dark | load |
|---|---|---|---|
| floor | 0.452 / 0.456 (0.449 / 0.455) | 6.81 / 7.03; repeat 10.00 / 12.96 | 15-34 |
| route, unclaimed | 0.517 / 0.571 (0.514 / 0.568): **×1.14 / ×1.25** | 11.95 / 10.30; repeat 15.51 / 15.89 | 15-38 |
| route, claimed | 0.896 / 1.146 (0.889 / 1.140): **×2.0 / ×2.5** | 14.89 / 14.67 | 26 |

Playwright WebKit's timer is millisecond-granular and its two floor runs differ by up to 1.8×, so its ratio is about 1.2-2.2× and not sharper than that. A claim recalcs only on a publication change and through its lag spring, never per frame at rest (M-5: no custom-property write in any live window, both engines, both runs).

## 6 · The owner glance (H-13) and what it shows

`glance-D3-Cp/` holds small copies: the crops as PNG, the story pairs as JPEG at 1100 px, and the readings JSON. The base is HEAD `3fbaa0e7` (specimens and demo); the route is `cp`.
- **H-13 as defined** (paper; dock, Dialog, floating; the glass-material story; both themes): GLANCE PASS in both engines, 8 pairs each.
  - Crop deltas: dock 42.6%, Dialog 70.1-76.5%, floating 55.8-64.7%.
  - Story: 28.7% Chromium, 26.6% Playwright WebKit.
  - These pairs show the floor's look. The chrome does not move under a claim, and the demo claims nothing, because the library never claims.
- **The claimed content over c1** (`--ground aurora --ids wash,quiet,resting --route-query claim=honest`): GLANCE PASS, 6 pairs.

| theme | rung | HEAD composite (C) · muted p05 | C′ claimed composite (C) · muted p05 |
|---|---|---|---|
| light | wash | `#f3411a` (0.220) · 1.74 | `#ff8266` (0.158) · 5.53, ink `#3f2a15` |
| light | quiet | `#ea4818` (0.206) · 1.64 | `#ffad92` (0.104) · 5.09 |
| light | resting | `#e25912` (0.185) · 1.57 | `#fed6c1` (0.053) · 4.91 |
| dark | wash | `#e73d18` (0.212) · 2.15 | `#653020` (0.081) · 6.30 |
| dark | quiet | `#de4315` (0.199) · 2.27 | `#552f21` (0.061) · 5.78 |
| dark | resting | `#d5520e` (0.178) · 2.33 | `#452f20` (0.041) · 5.25 |

Gestalt, read against D-1..D-3 and O-62/O-87, by eye from `glance-chromium-{light,dark}-aurora-wash-base-vs-cp-claimed.png`:
- **Light.** The claimed wash reads as salmon glass carrying the field: legible, not grey, and the plain answer to O-62. The cost is a darker solved muted ink (`#3f2a15` against fg `#1c1917`, ΔL_OK about 0.09, M-4's floor plus 0.01), which tightens the hierarchy on the thinnest rung.
- **Dark.** The claimed wash reads as a brown plate over the red field: Q-4 a's known cost (A-crit §5). Dark gains transmission but not hue.
- **Unchanged from the floor.** The rest of the route (chrome, dock, Dialog, the story) is the floor's look, and it adds no lighting layer (O-87 holds).
- **Engagement.** M-9 is green under the claim in both themes (active ΔE 0.051-0.096, focus veil ΔL −0.070 light). D-1: thinning travels on the spring and thickening is immediate.

## 7 · Deviations from `D3-Cp-spec.md`, stated

1. **The claim seat** is `data-glass-ground` (`""`, `"page"`, `"field"`) in one `@layer base` rule, not `@utility glass-ground`, `glass-ground-page` and `glass-ground-field` (§1.1).
2. **Q-6 stays at the pass-2 default (a).** The spec's v2 perimeter solve (Q-6 b) is not built. M-3 light reds on thinned wells are reported, not worked around.
3. **The dock's held floor stays at the any-input bound**, because its text keeps the static ink. The spec's stated FL-7 deviation (chrome may shed to the claimed bound) holds only for the ladder's chrome plates, which solve their own ink.
4. **`--glass-well-tone` is a number** (0.08, was 8%) so the well's L can be derived. The colour mix multiplies it by 100%.
5. **The ink input is named `--glass-ink-e`**, and the plate's composite `--glass-host-e`, to keep the token graph acyclic by name (§2).
6. **No `glassGroundTones` plural.** A consumer takes min lo and max hi itself, as the specimen page does.

## 8 · Open, for the critic and the agglomeration

1. **Q-6 (owner).** Thinned plates break the fixed perimeter ink on their wells: light 1.62-2.65, against the floor's 3.09-3.15. Option (b) solves the well's perimeter α against its host (about 0.78 over c1 light, 1 : 2 : 9.7 locally).
2. **The colour-retune hazard.** The page claim reads `--background-l`. A consumer that retunes `--background` as a colour, as `RETUNE_CSS` does, makes the claim wrong in the unsafe direction: claimed light wash muted 4.37. The contract has to be "retune the number", stated in MIGRATION (§9). There is no CSS path from a colour to a number.
3. **The held scene** (the floor's grasp carrier frosts the held text) masks FL-7's reading for every route, C′ included.
4. **The dark perimeter arm** (2.79-2.92) is the floor's and A′'s (item 3).
5. **The `"css"` renderer arm and a two-Aurora page** are unit-tested and correct by construction, but **not measured in paint**. No H2 scene reads `.glass-capsule` or `.feedback-tone` muted text under a claim.
6. **Static mirror against the live field.** The publication is the t = 0 CPU mirror. M-2m held through 3 s of motion and both steps, worst 4.74. PF-11's 100 s drift (C-crit §5) was not re-run.
7. **The story** demonstrates nothing of C′, because the demo claims nothing. Whether the glass-material story should show a claimed region is the agglomeration's to decide.
8. **Real Safari: UNMEASURED (owner's safaridriver checkbox)**, every cell. That includes the `@property` lag transition and the `color-mix` / `oklch(var())` chain at recalc.

## 9 · MIGRATION.md rows (for the landing wave; not in the patch)

- _`--muted-foreground` inside a glass plate is solved per plate_ (`@utility glass-ink`). A consumer value set on a plate is overridden. Tune `--glass-ink-target`, `--glass-ink-reach` or the claim.
- _`--on-glass-muted` inside a plate is that plate's solved ink._ The root value stays the static ink. Its chroma and hue moved to `--on-glass-muted-c` / `-h`.
- _`--background` and `--foreground` derive from `--background-l` / `--foreground-l`_ and left the `light-dark()` fold. A retune sets the number. A colour written to `--background` desyncs `data-glass-ground="page"`.
- _`--glass-well-tone` is a number_ (0.08), no longer a percentage.
- _The ladder rungs no longer transition `background-color`._
- _New, additive:_
  - `data-glass-ground` (`""`, `"page"`, `"field"`) and `--glass-ground-lo/-hi`;
  - `data-glass-field` and `--glass-field-lo/-hi/-ceiling` (written by `<Aurora>` on its parent);
  - `glassGroundTone()`, `publishGlassField()`, `readGlassSaturate()`, `auroraGroundTones()`;
  - `useAurora({ groundHost, groundCeiling })`;
  - `@utility glass-ink`;
  - `--glass-ink-reach`, `--glass-lift-gap`.
- Consumers (E-6), all UNMEASURED here because the siblings are read-only:
  - value.js claims its page from its `--saved-bg-*` stops through `glassGroundTone`;
  - keyframes claims `data-glass-ground="field"` above its `HeroAurora`;
  - fourier claims plot containers with their card tone;
  - chicago claims its static `.ground` stops and nothing over photos.

## 10 · Reproduce

```sh
S=<scratch>; H=docs/tranches/BL/design/material/harness; P=docs/tranches/BL/design/material/pass-2
git worktree add --detach $S/wt HEAD && ln -s $PWD/node_modules $S/wt/node_modules
git -C $S/wt apply $PWD/$P/floor.patch && git -C $S/wt apply $PWD/$P/D3-Cp-proto.patch
export D3_OUT=$S/out
node $H/run.mjs $S/wt --label cp --demo --query claim=honest      # claimed (1136 s capture at load 49-70)
node $H/run.mjs $S/wt --label cp0                                 # unclaimed = the fail-safe default
node $H/baseline.mjs $D3_OUT/caps/cp; node $H/baseline.mjs $D3_OUT/caps/cp0
sh $P/D3-Cp-plants/run.sh $D3_OUT/builds/cp/dist                  # the eight plants
node $H/glance.mjs --base <head dist> --route $D3_OUT/builds/cp/dist --out <dir> --name cp \
    --story-base <head demo> --story-route $D3_OUT/builds/cp/demo --require-delta [--engine webkit]
node $H/glance.mjs --base <head dist> --route $D3_OUT/builds/cp/dist --out <dir> --name cp-claimed \
    --ground aurora --ids wash,quiet,resting --route-query claim=honest --require-delta
node $P/D3-Cp-recalc.mjs <dist> [--engine webkit] [--query claim=honest]
```

**Harness changes landed in place** (additive; a run without the new flags reads as before):
- `capture.mjs` and `run.mjs`: `--query`;
- `specimens.mjs`: the `claim=` consumer switch, which imports `glassGroundTone` only when the worktree's library has it;
- `glance.mjs`: `--ground`, `--ids`, `--route-query`;
- `HARNESS.md`: a paragraph describing them.
