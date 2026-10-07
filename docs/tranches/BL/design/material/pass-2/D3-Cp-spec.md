# D3 · pass 2 · D3-C′ · spec (the cascade ink, fail-safe)

| field | value |
|---|---|
| seat | D3 pass 2, RESEARCH+SPEC for route C′ (REGISTRY §7.3 C′ items 1-9 and "Every route") |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | tasked `020f6586`; the checkout read `b98b8934`. `git diff --stat 020f6586 HEAD -- src` is empty. Worktree cut at `020f6586` + `pass-2/floor.patch` (applied clean) |
| engines | Chromium 149 and **Playwright WebKit 26.5** (headless, paint-only, no `backdrop-filter`, dock rows `+shim`). **Real Safari: UNMEASURED (owner's safaridriver checkbox)** in every cell |
| instruments | the H2 harness unchanged (`capture.mjs --inject`, the witnesses, `baseline.mjs`); probes: `D3-Cp-probe.css` (this directory, the mechanism as an injection), and the scratch probes `p1-tones.mjs`, `p2-check.mjs`, `p3-inertia.mjs`, `p4-recalc.mjs`, `p5-alpha.mjs` under `scratchpad/D3/p2/D3-Cp-spec/probes/` |
| build under test | the floor run's own specimen build (`scratchpad/D3/p2/floor/out/builds/floor/dist`, built 19:54 from the floor's first source state; the final patch changed only the field-well blur and three comments, FLOOR §3). Every C′ reading is that build plus the injected mechanism |
| load | 33-72 throughout (other sessions). The floor run this seat read was captured by the FLOOR seat at load 332-505 |
| fences | no source edit in the checkout, no git write there. Writes: this file and `D3-Cp-probe.css`. The worktree is removed |
| not read | the other routes' pass-2 files (REGISTRY §7.4) |

## 0 · In brief

1. **The mechanism is one number chain, not a colour chain.** C′ declares a ground as two tones (`--glass-ground-lo`, `--glass-ground-hi`, registered `<number>`, fail-safe 0 / 1). It solves the content α and a per-surface ink with the FL-5 formula, re-parameterized. The chain has no relative-colour syntax, no generator and no `color-mix()` nesting, and is hand-written (item 8). Inside a claim, the bound's ink becomes the *reach* ink (`--foreground` L ± 0.09) and its ground becomes the claimed tone; FL-5 is the same formula at ground 0/1 with the static ink. The probe stylesheet is 4,007 B raw / 1,290 B gzip.
2. **The tone model is conservative by construction in both themes.** Light uses the encoded luma: by Jensen on the convex EOTF it is a lower bound on any composite's Y. Dark uses lin⁻¹(Y(saturate(ground))): the encoded mix with a neutral layer is concave in Y, so it is an upper bound. Clamping the solve's ground to the pole (light `min(lo, P)`, dark `max(hi, P)`) makes every nested plate's model conservative too. **So C′ needs no plate→plate hand-off at all** (item 7). It has one leaf hand-off, plate → field well, under a name no plate reads (`--glass-host-e`). The token-graph cycle gate, replicated over the floor's 1,075 declarations plus the C′ chain (1,090), finds **0 cycles**, so Q-10 does not touch C′ (item 9).
3. **The fail-safe default is the floor, measured on the full H2 run** (item 1). Chromium light and dark M-2 fail only on the floor's `held` cells (the grasp carrier frosts the held plate's own text: wash-held fg 1.52-1.95 on every ground, theme and engine; a floor/harness defect, not C′'s) and on light dock-held muted-tab 4.46. Both themes clear every H-10 hostile cell, 37/37 at R 1 and R 3, **including the teleported Popover over the declared region (muted 4.83 light, 4.84 dark)**.
4. **The differentiator exists (item 4).** Painted T = 1 − α under a claim, against A′/floor (T 0.109 / 0.073 / 0.036 wash / quiet / resting light; 0.127 / 0.085 / 0.042 dark):

   | ground (claimed) | Chromium light wash / quiet / resting | Chromium dark wash / quiet / resting |
   |---|---|---|
   | aurora c1 | **0.664 / 0.439 / 0.221** | 0.233 / 0.158 / 0.080 |
   | aurora c0.5 | **0.998 / 0.670 / 0.331** | 0.584 / 0.383 / 0.203 |
   | paper | ≈1 / 0.686 / 0.343 (ill-conditioned: pole ≈ paper) | 0.596 / 0.395 / 0.191 |
   | black | 0.376 / 0.251 / 0.125 | 0.589 / 0.389 / 0.193 |

   Playwright WebKit matches within 0.004. Chrome stays at the any-input bound under every claim (floating 0.891 / 0.875; Q-3 a). So **C′ does not downgrade under the critic's trigger**. Its gain is large in light over the field and modest in dark over c1.
5. **Three things the probe broke, each with a measured cure or an owner dependency.**
   - **Well placeholders inside thick or chrome plates** read 4.13-4.43 light, claimed or not. The per-plate ink follows the bright plate composite upward, and the well paints a darker pole (8% toward fg). Cure: the well is a leaf surface that solves its own ink against its host's composite (v2 in `D3-Cp-probe.css`). The v2 capture was launched; **its reading did not return inside this seat** (§6).
   - **The light well perimeter over a thinned plate** reads 1.83 (wash over c1) under Q-6 (a)'s fixed 0.52 ink. The floor reads 3.10-3.15 on the same rows. Q-6 (a) is unbuildable under thinning. v2 solves the well's perimeter α against its host (Q-6 b), about 0.78 analytically over c1 light (1 : 2 : 9.7 locally). That is an owner ruling.
   - **A claim over unclaimed interposed paint is a lie that fails.** On the H-10 band under a claim: light wash fg 2.72, muted 2.10; dark muted 4.16. Chrome is immune (dock 10.01 / 4.93). Hence the spec's central rule: **the library never claims; a substrate publishes a value, and only the consumer claims a scope.**
6. **Not measured here, owed to the prototype:** the v2 well cure in paint; Q-8 inertia (`p3-inertia.mjs` written, not run); recalc (`p4-recalc.mjs` written, not run); H-11 / M-2m on the real publication; M-9 under claims; the owner-glance pair.

## 1 · The mechanism

Line numbers are in the worktree `020f6586` + `floor.patch`.

### 1.1 · The claim (the declaration)

| what | where | form |
|---|---|---|
| `--glass-ground-lo`, `--glass-ground-hi` | `tokens/property-regs.css` (new registrations) | `<number>`, inherits, initial **0** and **1**: the any-input poles. An unclaimed scope (`:root`, every portal) solves exactly the floor. A malformed claim is invalid at computed time and inherits the parent's claim, never a kinder one |
| the tone unit | — | the encoded tone of the neutral that bounds the ground. `lo` = the darkest **luma** (Rec. 709 weights on encoded channels) of what paints under the scope's glass; `hi` = the brightest **lin⁻¹(Y(saturate(px, --glass-saturate)))**. §0 item 2 gives why each is the conservative statistic in its theme |
| `@utility glass-ground` | `glass/veil.css` after `glass-plate` (`:49-59`) | the consumer's claim seat. It re-derives the ladder block (below) on the scope. The consumer writes `--glass-ground-lo/-hi` beside it |
| `@utility glass-ground-page` | same | `lo = hi = E(--background-l³)`. It needs `--background` split like FL-3 split `--card`: `--background: oklch(var(--background-l) c h)` (`color-radius.css:58`, `dark-arm.css:56`). The harness `RETUNE_CSS` (light `--background` 0.93 under `--card` 0.98) proves a "page ≥ pole" shortcut false, so the page claim must read the real page tone |
| `@utility glass-ground-field` | same | maps a substrate publication (§1.5): `lo = c·min(field-lo, page) + (1 − c)·page`, `hi = c·max(field-hi, page) + (1 − c)·page`, with `var(--glass-field-*, <fail-safe>)` fallbacks. An absent publication paints the bound |
| `glassGroundTone(color, { saturate })` | `src/composables/glass/` (new, exported) | the TS twin a consumer uses to turn a palette stop into `{ lo, hi }` (value.js's `--saved-bg-*` ramp, chicago's gradient stops). It is the same arithmetic as the publication (one function, P-3) |

**The library never claims.** The probe measured the alternative (§3.4): auto-claiming over the substrate fails the H-10 band. Only the consumer knows what it paints between a substrate and its glass.

### 1.2 · The solve (one formula, the floor's)

The FL-5 block (`tokens/glass.css:251-286`) keeps its arithmetic. C′ adds a selector to the block and four declarations:

- `--glass-ground-e` = `(1 − b)·min(E(lo), --glass-pole-e) + b·max(E(hi), --glass-pole-e)`, with `b = --glass-bound-ground` (the floor's theme flag, `dark-arm.css:276`). The clamp to the pole is what removes the hand-off.
- `--glass-reach-l` = `--foreground-l + 0.09` (light) / `− 0.09` (dark). This needs `--foreground: oklch(var(--foreground-l) c h)` (`color-radius.css:59`, `dark-arm.css:86`), byte-identical as FL-3 did for `--card`. Light reach 0.3061, dark 0.8352. The 0.09 is M-4's 0.08 + 0.01.
- `--glass-content-bound` (registered `<number>`, inherits, initial 1). It is `var(--glass-bound)` on `:root, .dark`. In a claim it is `max(--glass-veil-lift, clamp(0, dir·(E_band − g_e) / max(dir·(P_e − g_e), 1e-4), 1))`, where `E_band` is the floor's `--glass-need-e` evaluated at the reach ink.
- `--glass-veil-lift`: light 0, dark 0.415 (the least α whose composite sits ≥ 0.065 ΔE_OK above the dark page: M-6's 0.05 plus 0.015, Q-4 a). The spec owes it as a derivation from `--card-l` and `--background-l`, not a literal.

The content rungs inside a claim read the floor's step rule against the content bound: `wash = cb`, `quiet = cb + (1 − cb)/3`, `resting = cb + 2(1 − cb)/3`. The chrome rungs (`floating`, `dock`, `crown`, `overlay`, `sheet`, `dialog`) re-point from `--glass-bound` to the any-input bound, and the claim does not move them (Q-3 a). The single seam in `tokens/glass.css:278-285` is: the chrome lines read `--glass-bound`, which stays FL-5's any-input number everywhere (W-A and H-4 read it unchanged), and the content lines read `--glass-content-bound`.

### 1.3 · The per-surface ink (`@utility glass-plate`, `glass/veil.css:49-59`)

Every plate composer gets the chain at the element. No selector list is involved, so the five scope kinds pass 1 missed (`[data-surface=veil]`, `.glass-capsule`, `.segmented-indicator`, `.glass-loupe`, the pager chassis) are covered by construction:

`a = 1 − (1 − --glass-veil-rung)·level`, `E_c = a·P_e + (1 − a)·g_e`, `Y_c = EOTF(E_c)`, `Y_ink` by the target 4.8, `L = cbrt(Y_ink)` clamped at the reach, `--on-glass-muted: oklch(L --on-glass-muted-c --on-glass-muted-h)`.

The plate exports `--glass-host-e: E_c` for its leaves. The existing re-point (`ladder.css:158-167`) then reads the plate's own ink. The chroma and hue of `on-glass-fg.css:35-36` and `dark-arm.css:293-294` become `-c` / `-h` number tokens. `--on-glass-muted-l` stays the floor's static ink, the input to FL-5's bound. At an unclaimed bound rung the solve reproduces the static ink exactly: the probe read the portalled Popover at `oklch(0.4811 …)` light and `oklch(0.7904 …)` dark (`p2-check.mjs`).

- **The held floor** (`glass-plate`'s `--glass-veil-floor`, `veil.css:50`) reads `--glass-content-bound`. A held claimed plate sheds to its claimed bound, and its ink re-solves from the painted rung each frame, through the registered `--glass-veil-rung` lerp (`grasp.css:207`). One deviation from FL-7 is stated: chrome inside a claim may shed to the claimed bound, not the any-input bound. Its ink still solves against the claim.
- **The field well** (`_shared/field/control.css:39-100, 192-194`) is a leaf. Its ground is `--glass-host-e` (exact, because it has no `backdrop-filter`, FL-11), its pole is `--glass-well-pole`'s L (`glass.css:156`), and its α is the bound. It sets its own `--muted-foreground` for `::placeholder` and (Q-6 b) its perimeter α in `--field-control-ink` (`:53-57`) against the host. Wells never contain plates, so the one-level hand-off cannot cycle and never reads a grandparent.

### 1.4 · Thicken at once, thin on the spring (Q-8 c)

Each claim utility also declares `--glass-ground-lo-lag: var(--glass-ground-lo)` and `-hi-lag` (registered `<number>`), with `transition: --glass-ground-lo-lag var(--spring-panel-duration) var(--spring-panel), --glass-ground-hi-lag …`. The solve reads `min(lo, lo-lag)` and `max(hi, hi-lag)`:
- a worse ground (lower lo, higher hi) wins in the same frame;
- a kinder one thins on the spring;
- the spring's overshoot is clamped by the min/max, so contrast never dips.

**The ladder's `transition: background-color` must go** (`ladder.css:65, 91, 107, 128, 144`): it would ease a thicken while the ink re-solves at once, which is exactly Q-8's dip. FL-6 moved state fills off the plate, so the plate's background moves only for material reasons now. `p3-inertia.mjs` measures both arms (the lag alone; the lag with the rung's background transition) in both engines. **It did not run inside this seat**, so the claim is by construction until the prototype reads it and H-11 / M-2m on the real publication.

### 1.5 · The publication (per scope, a value, never a claim) — item 3

| what | where |
|---|---|
| tones from the CPU mirror | `auroraFallbackGround.ts:227-300` already samples `sampleAuroraField` on the lattice that `Aurora.vue:169` computes. Add `groundTones(config, saturate) → { lo, hi }` over the same samples: luma **min** and Y-tone **max**, the bound and not a decile (`p1`: the field's per-pixel p01 0.421 vs p10 0.431 light c1, so the min costs about 0.01 tone) |
| the writer | `useAurora` (`useAurora.ts:165`) gains `groundHost?: () => Element \| null` (default `canvas.parentElement`) and `groundCeiling?: () => number` (default 1). On config, ceiling or `--glass-saturate` change, never per frame (H-3), it writes `--glass-field-lo/-hi/-ceiling` and `data-glass-field="published"` on the host. It writes `data-glass-field="unpublished"` plus one `console.warn` when it cannot, and removes its own values at `onBeforeUnmount` (`:394`) |
| one host, two substrates | a module `WeakMap<Element, Set<publication>>`: the host carries the worse tones (min lo, max hi, max ceiling) of the instances it holds, so the result stays conservative under the claim's page mix. An unmount recomputes from the rest. There is no document-global write, so the pass-1 clobber cannot recur |
| `Aurora.vue` | passes `groundHost: () => root.parentElement` (`:206-211` gains a root ref) and `groundCeiling: () => reducedTransparency ? 1 : opacityCeiling` (the a11y override at `:340`) |
| WebGL2 and `"css"` arms | publish identically: the tones are config math, independent of the renderer |

### 1.6 · What C′ does not touch

FL-1..FL-13 as built; the chrome α (Q-3 a); the dialog room (FL-8); the dock (`backdropMode` is already `glass | opaque`, `useDockShellProps.ts:27`; item 9's rename landed on the floor, and C′ adds no mode); W-A and H-4 (they read `--glass-bound`, unchanged).

## 2 · The obligations

| # | obligation | how C′ meets it | H2 witness | evidence here | mechanism-removal plant |
|---|---|---|---|---|---|
| 1 | fail-safe default, re-measured, portal cell included | `:root` lo 0 / hi 1 = the floor | M-2, M-3, M-8 on base cells; H-10 hostile | floor run (§3.1): hostile 37/37 both themes Chromium, Popover over the declared region 4.83 / 4.84 | a `:root` claim of `var(--background)` (C's old default) must red H-10 |
| 2 | the dead solve fails loud | ink unregistered: a dead chain makes `--muted-foreground` invalid, so muted inherits fg; α derives from registered numbers (initial 1: opaque) | **H-7** (M-4 every plate) | M-4 under claims 10/10 surfaces ΔL_OK ≥ 0.08 in every cell (§3.2) | `pl-deadsolve` (`--glass-comp-y: nonsense`), Chromium: **H-7 red 9/10 surfaces** (muted = fg, ΔL_OK 0.000), while **M-2 stays all-green** (0/148 under). So H-7 is the witness and M-2 alone is blind, as C-crit §3 found |
| 3 | publication per scope; two substrates; unmount; `useAurora` arms; publish the bound | §1.5 | W-C on field cells; M-2 field cells; a two-Aurora specimen cell is owed | tones §3.3 | publication removed → claimed field cells fall to the bound (T plant, §3.2 `pl-unclaimed`: α 0.891 / 0.927 / 0.964) |
| 4 | T per rung against A′ | §0 table | **T** (H-12), `--expect` | §0, §3.2 | `pl-unclaimed`: T falls to the floor's exactly (wash 0.109 light, 0.124 dark) |
| 5 | light chrome over the field (Q-3 a); the dark 0.001 wash margin | chrome at the any-input bound; dark lift 0.415 | M-6 signed, M-8 | dark paper wash 0.064 from the page, ΔL +0.064 (margin 0.014, not 0.001); light chrome over c1 T 0.108 = A′'s | lift set to 0 must red M-6 dark |
| 6 | Q-8 asymmetric inertia | §1.4 | **M-2m** (H-11) step windows | `p3-inertia.mjs` written, **not run** | remove the min/max (read the lag only) → M-2m red on the 0.5→1 step |
| 7 | hand-off coverage, no grandparent read | no plate→plate hand-off (pole clamp); one leaf hand-off to wells | M-2 on nested wells | v1 without the leaf hand-off: well-muted 4.13-4.43 light (§3.2); v2 not read | remove `--glass-host-e` → wells red (v1 *is* that plant) |
| 8 | generator in repo or chain hand-written; CSS growth; recalc; Safari | hand-written, about 4 kB raw / 1.3 kB gzip | — | recalc `p4-recalc.mjs` written, **not run**; Safari UNMEASURED | — |
| 9 | `backdropMode` and the token-graph gate | done on the floor; 0 cycles with the C′ chain | `token-graph.test.ts:42` | §0 item 2 | — |
| every | floor rows; both engines; `+shim`; prose sweep; Safari | the floor plus §1; prose of every touched file (`veil.css`, `glass.css` §8 header, `ladder.css:150-167`, `control.css` THE ONE INK, `Aurora.vue`) | all | Chromium and Playwright WebKit agree within 0.004 α and within 0.2 ratio | each row above |

## 3 · Readings

### 3.1 · The floor = C′'s default (`baseline.mjs` over the floor run's 108 cells, 4 timed out at load 332-505)

Chromium: M-2 light 27/361, dark 25/361 failing rows. Every failure is a held row (wash-held fg 1.52-1.95, muted 1.22-1.42, on black, white and c1), plus dock-held muted-tab 4.46 (light, black) and the crashed cells. M-3 light 13/162; dark 84/162, the dark perimeter gap (2.78-2.88, Q-6 / A′ item 3). M-4 1/68 per theme. M-7, M-8, M-9 PASS. M-6 light 4/4 (Q-1 a).

The held cells' text is frosted by the grasp carrier, which paints above the content. That is ground-independent and in every engine and theme. **This is a floor/harness defect owed to the agglomeration, not a route's.**

### 3.2 · Claims injected over the floor build (ladder, both themes, both engines, load 37-58)

- **M-2:** all failing rows are well placeholders in thick or chrome plates (light 4.13-4.43), plus one 4.43 resting well over unclaimed c1. Dark claims are green on every ground. Light wash fg is 6.28 over claimed black and 7.05 over c1.
- **M-4:** 10/10 surfaces in every cell.
- **M-1:** claimed paper green in both engines (ΔE ≤ 0.010).
- **M-6 dark:** page separation green; floating adjacency 0.007-0.008 (the floor's).
- **M-8:** Chromium green; Playwright WebKit dark stripes bleed 1.26 (the floor's too, no blur).
- **W-C:** out of band above on kinder-than-bound grounds (dark wash 6.39 over c1), and below on wells (4.13).
- **M-3 light:** the wash-well perimeter 1.83 over c1 (the floor 3.10-3.15).
- **Plant `pl-unclaimed`** (mechanism removed): α returns to the floor's bound in both engines (§2 row 4).
- **Plant `pl-inkstatic`** (the solved ink removed, α thin; Chromium): M-2 light c1 wash muted **2.65** (6/148 rows under), dark green. So the solved ink is load-bearing in light, and M-2 sees its removal.
- **Plant `pl-deadsolve`**: §2 row 2.

### 3.3 · Tones (`p1-tones.mjs`, 12×12 cell means of the raw field; per-pixel p01/p99 in the injection)

| | aurora c1 | aurora c0.5 | paper | black | white | stripes | red `#761617` |
|---|---|---|---|---|---|---|---|
| light lo | 0.421 | 0.699 | 0.982 | 0 | 1 | 0.333 | 0.167 |
| dark hi | 0.785 | 0.418 | 0.040 | 0 | 1 | 0.828 | 0.300 |

Constants: fg L 0.2161 / 0.9252; pole tone 0.9736 / 0.1743; band tone 0.6078 / 0.3167. The **any-input bound with the reach ink is 0.624 light / 0.828 dark**, against FL-5's 0.891 / 0.873. That is a finding for the agglomeration (Q-2 / Q-3): the solved ink alone, with no declaration, buys light chrome T 0.11 → 0.38. FL-4 forbids C′ taking it undeclared.

### 3.4 · The false claim (H-10 band under a claim on `main`, `cp-hostile`)

Light: wash fg 2.72, muted 2.10, 8/37 under. Dark: muted 4.16, 2/37 under. Dock and Popover green. The rule in §1.1 follows.

## 4 · MIGRATION.md rows (retired or changed bindings)

- _`--muted-foreground` inside a glass plate is solved per plate._ A consumer value set on or inside a plate is overridden. Tune `--glass-ink-target` or the claim instead.
- _`--on-glass-muted` is no longer a root constant._ Read inside a plate, it is that plate's solved ink. Its L input `--on-glass-muted-l` stays; the chroma and hue move to `--on-glass-muted-c` / `-h`.
- _`--background` and `--foreground` derive from `--background-l` / `--foreground-l`._ A retune sets the number (as `--card-l` since the floor).
- _New, additive:_ `--glass-ground-lo/-hi`, `glass-ground`, `glass-ground-page`, `glass-ground-field`, `glassGroundTone()`, `useAurora({ groundHost, groundCeiling })`, `data-glass-field`.
- _The ladder rungs no longer transition `background-color`._ The α moves by the claim's spring, or by the grasp register's own lerp.
- _The field well's perimeter α is solved inside a claim_ (pending Q-6). Under the default (a) it stays `--ink-perimeter`.
- Consumers (E-6):
  - value.js claims its page from `--saved-bg-*` through `glassGroundTone`; whether THE STOP clears is UNMEASURED (sibling read-only).
  - keyframes claims `glass-ground-field` on the `HeroAurora` host.
  - fourier claims plot containers as `--card`.
  - chicago claims its static `.ground` stops and nothing over photos (they stay at the bound).

## 5 · Risks

1. Any consumer `transition` shorthand on a claim element overrides the lag. Thinning then snaps (safe: no dip, no inertia).
2. The publication must land in the same frame as the field's ceiling change: a Vue `flush: "pre"` watch writing inline style. A one-frame late write on a worsening step is a dip. Only M-2m on the prototype can show it.
3. The motion drift of the live field against a static t = 0 bound (PF-11): the margin is 0.3 of ratio (target 4.8).
4. Recalc in Playwright WebKit is unknown for the per-plate chain (pass 1's colour chain was 2.1×).
5. Q-6: thinning makes every non-text indicator over a thin plate near-solid, or red.
6. The dark gain is modest: T 0.233 vs 0.127 over c1. Dark claims mostly buy the M-6 lift.
7. The held-scene defect (§3.1) masks FL-7's reading for every route.
8. Real Safari: UNMEASURED.

## 6 · Owed to the prototype seat

- Run v2 (`D3-Cp-probe.css`, launched as `c2-*` in scratch; its reading did not return here), `pl-inkstatic` and `pl-deadsolve`, `p3-inertia.mjs` and `p4-recalc.mjs`.
- Then build §1 in source, run the full H2 battery on HEAD + floor + C′ under a claimed variant (injected consumer claims per ground, honest on H-10), and run GLANCE.

## 7 · Reproduce

`git worktree add --detach <wt> 020f6586 && git -C <wt> apply pass-2/floor.patch`. Then `node harness/capture.mjs <floor dist> --out <dir> --engines chromium,webkit --themes light,dark --grounds <g> --scenes ladder --inject <D3-Cp-probe.css with .cp-claim → main.hx-page, plus the §3.3 tones>`. Then each witness with `--gate chromium,webkit`.
