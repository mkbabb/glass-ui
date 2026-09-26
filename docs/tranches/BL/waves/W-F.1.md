# W-F.1 · W-SPRING-ONE: one step-able spring, one clock, curves continuous at 100 % · 11.0.0

| field | value |
|---|---|
| seat | band-F wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `84b470aa` (`src`, `demo`, `scripts`, `tests` identical to `f3ad78d0`: `git diff --stat f3ad78d0 HEAD -- src demo scripts tests` is empty), scratch worktree, demo built there (`npm run demo:dist:build`) and served by `vite preview` on :5961 |
| ships in | 11.0.0 |
| families | F-44 (members L10-01, L10-18, R2-02-09, R2-02-16, R2-04-14, R3-01-10, R3-01-11, R5-01-09) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| roster | binds G-29 SPRING-AUTHORITY (owed to this wave, `W-A.2.md` roster row G-29) |

Machine load at the runs: 54 to 230 (other seats). Every reading below is either load-independent by construction (static, unit, seeked animation) or names its load.

## 1 · What it closes

| id | what |
|---|---|
| L10-01 | five hand-rolled damped-spring loops beside the keyframes engine, three on constants off the `springPresets` table (`REG:1028-1031`) |
| L10-18 | two copies of the idle scheduler (`useIdleReady.ts:97-110`, `useViewportReady.ts:118-133`, Safari timer 0 vs 16 ms) and a restated scroll-position read (`useScrollChrome.ts:233-238` against `scrollReader.ts:52-56`); the round-1 disposition folds them into this wave's motion-core pass (`round-1/L10.md:31`) |
| R2-02-09, R3-01-10 | every emitted `--spring-*` `linear()` stops at 97.959 % and appends a hard `1`: a tail jump of 0.56-2.68 % of travel at 3.8-9.6× the previous slope, visible on the tab indicator, the accordion, the configurator region and the deck (KFA-168) |
| R2-04-14 | the pointer-field attractor takes an unclamped dt from the aurora frame loop and diverges above ~100 ms frames |
| R2-02-16, R5-01-09 | `createCanvasLifecycle` rebases `startTime` to `performance.now() − 1000` on resume, so every canvas restarts at 1 s after a park (KFA-132) |
| R3-01-11 | the disclosure chevron rides `--ease-cartoon-punch` (not a table row) on `--spring-present-duration`; the two disclosure engines run on two rows |
| census | `#26` RT-26F (unledgered per-primitive springs, `census-register-a.md:38`), `#53` fourier `clock.ts` integrating its own spring (`census-register-b.md:43`), recap D-1 liquid-weight (`census-carries-recap.md:64`, the `spring-authority.test.ts` that does not see the loops) |
| inbound | O-60 KFA-168 (LIVE, all six tokens) and KFA-132 (LIVE by bytes) (`INBOUND-MAP.md:510,516`) |

## 2 · The defect at HEAD

**Five integrators, five dt policies.** Acceleration terms `−ω²(x − target) − 2ζωv` stepped by Euler in `src`:

| site | integrator | constants | dt policy |
|---|---|---|---|
| `src/composables/motion/morph/useLeadTrail.ts:213-215` | symplectic Euler, `SUBSTEPS` | table (`springPreset`) | `Math.min(now − lastNow, MAX_DT_MS)`, `MAX_DT_MS = 40` (`:67`, `:207`) |
| `src/composables/motion/pointer/usePointerVelocityField.ts:396-401` | symplectic Euler, one step | `damping ?? 0.85`, `attractorResponse ?? 0.32` (`:242-243`) | none: `frameLoop.ts:189-194` passes `max(0, Δt)` straight in |
| `src/components/constellation/constellationInteraction.ts:164-169` | symplectic Euler | `WARP_RESPONSE = 0.55`, `WARP_ZETA = 1.0` (`constants.ts:48-49`) | `WARP_DT_CLAMP = 0.05` (`:98`, `:155`); `WELL_DT_CLAMP = 0.05` (`constellationWell.ts:57`) |
| `src/components/blob/composables/useBlobPointer.ts:184-186` | symplectic Euler (the same file steps `SpringProgress` at `:171-172`) | `PULSE_OMEGA = 18`, `PULSE_ZETA = 0.35` (`blob/constants.ts:132,135`) | `Math.min(dtMs, 50)` (`:159`, `:164`) |
| `src/components/fourier-field/clock.ts:73-75` | symplectic Euler | table (`springPreset("world")`, `:16`) | `Math.min(Math.max(input.dt, 0), 0.05)` (`:95`) |

A sixth time policy, found by gate F1-G2's census: `src/composables/sidebar/useSidebarFollow.ts:30` (`damping ?? 0.22`) eases by a per-frame fraction with no dt at all. It is in scope.

**The engine is already analytic.** keyframes.js `SpringProgress.tickDt(dt)` delegates to a closed-form step (`evaluateAt`: underdamped, critical and overdamped cases, `node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts:3616-3631`), re-seats a target from the current `(value, velocity)` (`:3597-3602`), and carries vector lanes (`setTargets`, `:3641`). An exact solution has no step-size limit, so none of the clamps above protects it.

**The tails.** `scripts/regen-spring-tokens.mjs` emits each curve up to the settle horizon and `springLinearStops` closes it with `1` at 100 % (`scheme-spring.css:12-20`, LAW 0b at `:30-33`).

**The clock.** `createCanvasLifecycle.ts:270` `startTime = performance.now() - 1000` on `resume()`; `:248` restarts it at 0 on the reduced-motion flip.

**The chevron.** `src/styles/utilities/btn.css:83` `transition: rotate var(--spring-present-duration) var(--ease-cartoon-punch)`; `disclosure.css:95-96` animates on `--spring-present`, `ConfiguratorLayer.vue:238` transitions on `--spring-dock`.

### Readings (all commands run in the worktree at HEAD)

`node f1-static.mjs` (appendix A): **6 rows, 6 FAIL**, exit 1.

```
FAIL F1-G1 no hand-rolled integrator in src {"sites":7,"at":["src/components/blob/composables/useBlobPointer.ts:184","src/components/constellation/constellationInteraction.ts:164","src/components/constellation/constellationInteraction.ts:165","src/components/fourier-field/clock.ts:73","src/composables/motion/morph/useLeadTrail.ts:213","src/composables/motion/pointer/usePointerVelocityField.ts:396","src/composables/motion/pointer/usePointerVelocityField.ts:397"]}
FAIL F1-G2 no off-table spring constant {"sites":8,"at":["src/components/blob/constants.ts:132","src/components/blob/constants.ts:135","src/components/constellation/constants.ts:46","src/components/constellation/constants.ts:48","src/components/constellation/constants.ts:49","src/composables/motion/pointer/usePointerVelocityField.ts:242","src/composables/motion/pointer/usePointerVelocityField.ts:243","src/composables/sidebar/useSidebarFollow.ts:30"]}
FAIL F1-G3 spring tails continuous at 100% (ratio <= 1.5, six tokens) {"failing":[{"name":"press","lastStop":"0.97581@97.959%","jumpPct":2.42,"ratio":4.31},{"name":"present","lastStop":"0.9755@97.959%","jumpPct":2.45,"ratio":9.65},{"name":"dock","lastStop":"0.97317@97.959%","jumpPct":2.68,"ratio":6.72},{"name":"panel","lastStop":"1.00609@97.959%","jumpPct":-0.61,"ratio":3.88},{"name":"bloom","lastStop":"0.9944@97.959%","jumpPct":0.56,"ratio":3.76},{"name":"world","lastStop":"0.99444@97.959%","jumpPct":0.56,"ratio":6.95}]}
FAIL F1-G4 no per-integrator dt clamp {"sites":9,"at":["src/components/blob/composables/useBlobPointer.ts:159","src/components/blob/composables/useBlobPointer.ts:164","src/components/constellation/constellationInteraction.ts:98","src/components/constellation/constellationInteraction.ts:136","src/components/constellation/constellationInteraction.ts:155","src/components/constellation/constellationWell.ts:57","src/components/fourier-field/clock.ts:95","src/composables/motion/morph/useLeadTrail.ts:67","src/composables/motion/morph/useLeadTrail.ts:207"]}
FAIL F1-G5 chevron on one spring row; both disclosure engines on one row {"chevron":"transition: rotate var(--spring-present-duration) var(--ease-cartoon-punch)","disclosure":"present","configurator":"dock"}
FAIL F1-G6 one scheduleIdle, one scroll-position read {"scheduleIdle":["src/composables/dom/useIdleReady.ts:97","src/composables/dom/useViewportReady.ts:118"],"readPosition":["src/composables/motion/scroll/scrollReader.ts:52","src/composables/motion/scroll/useScrollChrome.ts:233"]}
```

`npx vitest run tests/_bandf/f1-time.test.ts` (appendix B): **5 tests, 4 FAIL**, exit 1. The 17 ms case passes at HEAD, which shows the bound is reachable.

```
F1-G7 elapsed at park 5.000 s, first frame after a 10 s park 1.000 s      × (expected |Δ| < 0.05, got 4.0)
F1-G8 dt=17   offset 0.400 -> within bound                                 ✓
F1-G8 dt=100  offset 0.400 -> 1.605                                        ×
F1-G8 dt=250  offset 0.400 -> 12.130                                       ×
F1-G8 dt=1000 offset 0.400 -> 200.076                                      ×
```

`node f1-tail.mjs` (appendix C), Chromium, 1440×900: **4 rows, 4 FAIL**. The running transition or animation is paused and seeked to fixed fractions of its duration, so the reading does not depend on frame timing (load 76.8 → 67.5).

| surface | theme | duration | travel | step 96→98 % | step 98→100 % | ratio |
|---|---|---|---|---|---|---|
| tab indicator `translate` (`--spring-dock`), `/navigation/tabs` | light, dark | 210 ms | 244.25 px | 1.07 px | **6.42 px** | **6.02** |
| accordion `block-size` (`--spring-present`), `/containers/accordion` | light, dark | 200 ms | 89.83 px | 0.25 px | **2.17 px** | **8.69** |

Playwright WebKit: `page.goto: Page crashed` on `/navigation/tabs` (the known crash on demo routes), recorded as a crash. Real Safari: UNMEASURED (OW-3).

## 3 · The cure

1. **One stepper: the engine's.** Every hand-rolled loop becomes a `SpringProgress` (scalar) or a `SpringProgress` with vector lanes (the attractor's x/y, the warp's x/y), seated from a `springPresets` row by name through one leaf, `src/composables/motion/spring/springStepper.ts`:
   `springStepper(name: SpringPresetName, init?: { value?: number; velocity?: number; lanes?: number }): SpringProgress`. It reads `springPreset(name)` (`springPresets.ts:143`), applies `--motion-tempo` the way `sheet/detents/use.ts:210-214` already does, and returns the engine object. No `ω`, `ζ` or acceleration term appears in `src` outside `springPresets.ts`'s table. The six sites move as follows:
   - `useLeadTrail`: the lead is a `springStepper(name)`; the substep loop and `MAX_DT_MS` are deleted (`:67`, `:205-216`). W-F.3 then bounds the trail by position; this wave changes only the lead's stepper.
   - `usePointerVelocityField`: the attractor is a two-lane `springStepper(options.spring ?? "dock")`. The options `mass`, `damping` and `attractorResponse` are deleted. The nearest ruled row to today's `(0.32 s, ζ 0.85)` is `dock` `(0.30 s, ζ 0.88)` (`scheme-spring.css:42`).
   - constellation warp: a two-lane `springStepper(field.warpCfg?.spring ?? "world")` (`world` is ζ 1.0, the "must not ring" requirement at `constants.ts:46`). `WARP_RESPONSE`, `WARP_ZETA`, `WARP_DT_CLAMP` and `WELL_DT_CLAMP` are deleted. If W-B.9 retires the constellation first, its rows here close by deletion.
   - blob pulse: a `springStepper("panel")` (the one ruled rebounding row, `scheme-spring.css:43`); `PULSE_OMEGA` and `PULSE_ZETA` are deleted, with the `Math.min(dtMs, 50)` clamps.
   - fourier momentum: the `settle()` Euler loop becomes a `springStepper("world")` (the row it already names, `clock.ts:16`); the `0.05` clamp goes.
   - `useSidebarFollow`: the per-frame fraction becomes a `springStepper(options.spring ?? "world")` stepped by the frame's dt; the `damping` option is deleted.
2. **One dt policy: the clock's.** A closed-form step is exact at any dt, so the round-2 clause "one dt clamp with substeps above h_max" (`REG:1046`) is met by construction and no stability clamp is kept anywhere. Each stepper takes the true frame dt from its loop. The only time policy left is the clock's: hidden time is not elapsed time.
3. **The canvas clock resumes where it stopped.** `createCanvasLifecycle` keeps `elapsedAtSuspend` when the loop parks and seats `startTime = performance.now() − elapsedAtSuspend × 1000` on resume (`:270`). The reduced-motion flip (`:248`) does the same. A canvas that was parked for 10 s paints the next frame at the time it stopped.
4. **Curves continuous at 100 %.** `scripts/regen-spring-tokens.mjs` divides every sampled stop by the curve's value at the horizon, `y'(s) = y(s) / y(T)`, and emits the last stop at `1 100%`. The clock (`--spring-<name>-settle`) is unchanged, so LAW 0b's curve/clock parity holds (`scheme-spring.css:30-33`). For the one overshooting row (`panel`, `y(T) = 1.00609`) the division lands the settle exactly at 1 instead of stepping down 0.61 %. The regenerated CSS is committed; `springTokenMirror.test.ts` (G-18) keeps the generator a fixed point on it.
5. **The chevron reads one row.** `btn.css:83` becomes `transition: rotate var(--spring-present-duration) var(--spring-present)`. `--ease-cartoon-punch` stays an EFFECTS token for the canvas reveal bloom (`createCanvasLifecycle.ts:122`, `visibility.ts:245`) and leaves the rotation. `SelectTrigger.vue:68` and `ConfiguratorLayer.vue:162` docblocks that describe the punch on the caret are rewritten to the row.
6. **Both disclosure engines on one row.** `ConfiguratorLayer.vue:238` moves from `--spring-dock` to `--spring-present`, the row Accordion and Collapsible use (`disclosure.css:95-96`). Merging the two engines into one is W-F.2's (the re-target rule); this wave only makes them read one row.
7. **L10-18.** `scheduleIdle` moves to one helper in `src/composables/dom/scheduleAfterPaint.ts` that both `useIdleReady` and `useViewportReady` call with their own timeout; the two Safari fallbacks become one (`setTimeout(fire, 16)`: the later of the two, so the composition never shares the observer's paint frame). `scrollReader.ts` exports its `readPosition` and `useScrollChrome` imports it; the restated `readPos` (`:233-238`) is deleted.
8. **G-29 binds.** `tests/styles/spring-authority.test.ts` gains the clock fence the roster names: F1-G1, F1-G2, F1-G4 and F1-G6 as its assertions over `src`, with the planted bite `src/components/blob/composables/useBlobPointer.ts` restored to its HEAD Euler line (the bite reddens G1 and G2 on their own text).

## 4 · Files it touches

`src/composables/motion/spring/springStepper.ts` (new), `springPresets.ts` (no row change), `src/composables/motion/morph/useLeadTrail.ts`, `src/composables/motion/pointer/usePointerVelocityField.ts`, `src/components/aurora/composables/frameLoop.ts` (passes dt unchanged; its comment updated), `src/components/constellation/{constellationInteraction.ts,constellationWell.ts,constants.ts,constellationTypes.ts,index.ts}`, `src/components/blob/{constants.ts,composables/useBlobPointer.ts}`, `src/components/fourier-field/clock.ts`, `src/composables/sidebar/useSidebarFollow.ts`, `src/composables/glass/webgl/createCanvasLifecycle.ts`, `scripts/regen-spring-tokens.mjs`, `src/styles/tokens/scheme-spring.css` (regenerated), `src/styles/utilities/btn.css`, `src/components/configurator/ConfiguratorLayer.vue`, `src/components/select/SelectTrigger.vue` (docblock), `src/composables/dom/{scheduleAfterPaint.ts,useIdleReady.ts,useViewportReady.ts}`, `src/composables/motion/scroll/{scrollReader.ts,useScrollChrome.ts}`, `tests/styles/spring-authority.test.ts`. New: `tests/motion/spring-one.test.ts` (appendix B), `tests-visual/wired/spring-tails.spec.ts` (appendix C), and the band-F probe library `tests-visual/fixtures/band-f/lib.mjs` (its text is `W-F.2.md` appendix D). This wave is the library's one lander: every band-F wired spec imports it, and W-F.2, W-F.6 and W-F.7 wait on this wave (PLAN §5 notes). `MIGRATION.md` (§7).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| F1-G1 · no hand-rolled integrator | appendix A row G1 (`/-\s*(\w*omega\w*)\s*\*\s*\1\b/i` over `src`, tests excluded) | 0 sites | **7 sites in 5 files** |
| F1-G2 · no off-table spring constant | appendix A row G2 | 0 sites | **8 sites** |
| F1-G3 · tails continuous at 100 % | appendix A row G3 over `scheme-spring.css` | last-segment slope ≤ 1.5× the previous on all six tokens | **ratios 3.76-9.65; jumps 0.56-2.68 %** |
| F1-G4 · no per-integrator dt clamp | appendix A row G4 | 0 sites | **9 sites** |
| F1-G5 · chevron and disclosures on one row | appendix A row G5 | the rotation's curve and clock name the same `--spring-*` row; the configurator region reads the disclosure's row | **`--ease-cartoon-punch` on `--spring-present-duration`; `present` vs `dock`** |
| F1-G6 · L10-18 | appendix A row G6 | one `scheduleIdle`, one scroll-position read | **2 and 2** |
| F1-G7 · the canvas clock continues | appendix B, `npx vitest run tests/motion/spring-one.test.ts -t F1-G7` | first frame after a 10 s park within 50 ms of the elapsed time at the park | **5.000 s → 1.000 s** |
| F1-G8 · the attractor is bounded at any dt | appendix B `-t F1-G8`, dt 17/100/250/1000 ms | `\|offset after\| ≤ 1.05 × \|offset before\|` on every dt | **17 ms passes; 100 → 1.605, 250 → 12.130, 1000 → 200.076** |
| F1-G9 · the tail in paint | appendix C, Chromium and Playwright WebKit, light and dark | step 98→100 % ≤ 1.5× step 96→98 % on the tab indicator and the accordion | **6.02 and 8.69 (Chromium); WebKit page crash** |

Can each fail and pass? Every row fails at HEAD. G8's 17 ms case passes at HEAD. G3's bound is met by construction once the stops are divided by `y(T)` (the last segment then continues the previous slope). G9 is deterministic (a paused, seeked animation). The planted bite for G9 (W-A.3 twin): a style tag that sets the tab indicator's timing to the HEAD `--spring-dock` string; it must redden G9 on its ratio.

## 6 · π and DELTA obligations

- **Tail (G9):** `/navigation/tabs` (the first pill strip, 0 → 3) and `/containers/accordion`, 1440×900 and 390×844, light and dark. Paired capture at `<F1-base>` and at the wave: a frame strip of the last 12 % of the glide, seeked at 88, 90 … 100 % of the duration (seven stills per cell), with appendix C's JSON beside each. HEAD shows the indicator standing 6.4 px short at 98 % and landing in one step; the wave shows it closing at the previous slope.
- **Canvas clock (G7):** the shell aurora on `/forms/slider` (R5-01-09's surface): two frames 300 ms after each of two bfcache parks, compared by mean absolute difference on a field-only crop. HEAD: the two post-park frames differ by 0.145 (R5-01's reading, `captures/R5-01/clock_forms_slider.json`) against 0.25-0.27 for every other pair; the wave's pair differs like any other pair. Chromium GPU arm; WebKit cell recorded as WebKit; Safari UNMEASURED.
- **Attractor (G8)** has no paint claim: the aurora cursor reads the field through a canvas, which this wave's gates do not read (R2-04-14 took no paint for the same reason). The unit gate is the claim.
- **Engines:** Chromium measured. Playwright WebKit crashed on the demo routes (recorded). Real Safari UNMEASURED (OW-3).

## 7 · MIGRATION rows

| removed | replacement |
|---|---|
| `UsePointerVelocityFieldOptions.mass`, `.damping`, `.attractorResponse` | `spring?: SpringPresetName` (default `"dock"`) |
| `WARP_RESPONSE`, `WARP_ZETA` (exported from `@mkbabb/glass-ui/constellation`, `constellation/index.ts:24-25`) | none; the warp reads `ConstellationWarpConfig.spring` |
| `ConstellationWarpConfig.response`, `.zeta` | `ConstellationWarpConfig.spring?: SpringPresetName` (default `"world"`) |
| `SidebarFollowOptions.damping` | `spring?: SpringPresetName` (default `"world"`) |
| the `--spring-*` `linear()` token values | regenerated; same names, the last stop is `1 100%`. A consumer that pinned a token string gets the new curve |

No alias, no deprecated re-export. A consumer passing a removed option under `strictTemplates` fails to type-check; one passing it at runtime is ignored, which G-39/G-40 (W-A.2) witness for the Vue props.

## 8 · Dependencies

PLAN §5, the one record of edges (G9 joins the wired set). No loop wave: F-44 is owned by no design loop. If the constellation is already off `useCanvas2D` (W-B.9), this wave cures what is left.

## 9 · Ledger rows it closes

F-44 (all eight members); census `#26` RT-26F and `#53`'s clock clause; recap D-1's "one liquid weight" row (the dock and pager clauses of D-1 stay with W-I.1 and W-E.12/W-F.3); inbound KFA-168 and KFA-132. G-29 SPRING-AUTHORITY moves from owed to bound.

## 10 · Gestalt passes (P-1)

- **Tranche fit:** after this wave every spring in the library is the engine's closed-form spring, named by a table row; W-F.2's re-seats, W-F.3's trail and W-I.1's dock all step the same object.
- **Wave:** F1-G1..G9 green in one run.
- **Feature:** on `/navigation/tabs` and `/containers/accordion` the glide lands without a last-frame step, captured; the aurora resumes where it stopped after a tab switch.

## Appendix A · `f1-static.mjs` (the rows land as assertions in `tests/styles/spring-authority.test.ts`)

```js
// W-F.1 born-RED static gates. Run from the repo root: node f1-static.mjs
import fs from 'node:fs';
import path from 'node:path';
const out = []; const row = (id, pass, reading) => { out.push({ id, pass }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
const walk = (d, acc = []) => { for (const e of fs.readdirSync(d)) { const p = path.join(d, e); if (fs.statSync(p).isDirectory()) walk(p, acc); else if (/\.(ts|vue|css|mjs)$/.test(e) && !/\.test\./.test(e)) acc.push(p); } return acc; };
const SRC = walk('src'); const read = (p) => fs.readFileSync(p, 'utf8');
const grepSrc = (re) => SRC.flatMap((p) => read(p).split('\n').map((l, i) => [p, i + 1, l]).filter(([, , l]) => re.test(l)).map(([p, n]) => `${p}:${n}`));
// G1 — no damped-oscillator acceleration term outside the engine (keyframes.js SpringProgress is the leaf)
const g1 = grepSrc(/-\s*(\w*omega\w*)\s*\*\s*\1\b/i);
row('F1-G1 no hand-rolled integrator in src', g1.length === 0, { sites: g1.length, at: g1 });
// G2 — no spring constant off the springPresets table
const g2 = grepSrc(/\b(PULSE_OMEGA|PULSE_ZETA|WARP_RESPONSE|WARP_ZETA)\b\s*=|attractorResponse \?\? \d|damping \?\? 0\.\d/);
row('F1-G2 no off-table spring constant', g2.length === 0, { sites: g2.length, at: g2 });
// G3 — every emitted --spring-* linear() is continuous at 100%: last-segment slope <= 1.5x the previous
const css = read('src/styles/tokens/scheme-spring.css');
const bad = [];
for (const name of ['press', 'present', 'dock', 'panel', 'bloom', 'world']) {
  const m = css.match(new RegExp(`--spring-${name}:\\s*linear\\(([^)]*)\\)`));
  if (!m) { bad.push({ name, error: 'absent' }); continue; }
  const parts = m[1].split(',').map((s) => s.trim());
  const pts = parts.map((s, i) => { const [y, x] = s.split(/\s+/); return [x ? parseFloat(x) : i === 0 ? 0 : 100, parseFloat(y)]; });
  const n = pts.length; const [x2, y2] = pts[n - 1], [x1, y1] = pts[n - 2], [x0, y0] = pts[n - 3];
  const sl = (y2 - y1) / (x2 - x1), sp = (y1 - y0) / (x1 - x0), ratio = Math.abs(sl) / Math.abs(sp || 1e-9);
  const r = { name, lastStop: `${y1}@${x1}%`, jumpPct: +((y2 - y1) * 100).toFixed(2), ratio: +ratio.toFixed(2) };
  if (ratio > 1.5) bad.push(r);
}
row('F1-G3 spring tails continuous at 100% (ratio <= 1.5, six tokens)', bad.length === 0, { failing: bad });
// G4 — no per-integrator dt policy: the stepper takes the clock's dt (analytic), no local clamp constants
const g4 = grepSrc(/\bMAX_DT_MS\b|\bWARP_DT_CLAMP\b|Math\.min\(dtMs, 50\)|Math\.min\(Math\.max\(input\.dt, 0\), 0\.05\)/);
row('F1-G4 no per-integrator dt clamp', g4.length === 0, { sites: g4.length, at: g4 });
// G5 — the chevron reads one spring row (curve and clock from the same row), and both disclosure engines read one row
const btn = read('src/styles/utilities/btn.css');
const chev = btn.match(/transition:\s*rotate\s+var\(--spring-([a-z]+)-duration\)\s+var\(--(spring|ease)-([a-z-]+)\)/);
const chevOk = !!chev && chev[2] === 'spring' && chev[1] === chev[3];
const disc = read('src/components/_shared/disclosure/disclosure.css').match(/animation-timing-function:\s*var\(--spring-([a-z]+)\)/);
const cfg = read('src/components/configurator/ConfiguratorLayer.vue').match(/transition:\s*grid-template-rows\s+var\(--spring-[a-z]+-duration\)\s+var\(--spring-([a-z]+)\)/);
const discRow = disc?.[1], cfgRow = cfg?.[1];
row('F1-G5 chevron on one spring row; both disclosure engines on one row', chevOk && !!discRow && (cfg === null || cfgRow === discRow), { chevron: chev?.[0], disclosure: discRow, configurator: cfgRow ?? 'absent' });
// G6 — L10-18: one idle scheduler, one scroll-position reader
const g6a = grepSrc(/function scheduleIdle\b/); const g6b = grepSrc(/function (readPos|readPosition)\b/);
row('F1-G6 one scheduleIdle, one scroll-position read', g6a.length === 1 && g6b.length === 1, { scheduleIdle: g6a, readPosition: g6b });
const f = out.filter((r) => !r.pass).length; console.log(`${out.length} rows, ${f} FAIL`); process.exitCode = f ? 1 : 0;
```

When W-F.2 merges the disclosure engines, G5's `disclosure.css` read moves to the merged engine's file; the row assertion (one row) is unchanged.

## Appendix B · `tests/motion/spring-one.test.ts` (run at HEAD as `tests/_bandf/f1-time.test.ts` in the worktree)

```ts
// W-F.1 born-RED: the time authority. (a) a canvas clock resumes where it stopped;
// (b) a long frame cannot make the pointer-field attractor diverge.
import { afterEach, describe, expect, it, vi } from "vitest";
import { createCanvasLifecycle } from "@glass/composables/glass/webgl/createCanvasLifecycle";
import { usePointerVelocityField } from "@glass/composables/motion/pointer/usePointerVelocityField";

describe("F1-G7 canvas clock resumes where it stopped", () => {
    afterEach(() => vi.restoreAllMocks());
    it("elapsed after a 10 s park equals elapsed at the park", () => {
        let now = 0;
        vi.spyOn(performance, "now").mockImplementation(() => now);
        const q: FrameRequestCallback[] = [];
        vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => (q.push(cb), q.length));
        vi.stubGlobal("cancelAnimationFrame", () => {});
        const seen: number[] = [];
        const canvas = document.createElement("canvas");
        const lc = createCanvasLifecycle({
            canvas,
            buildContext: () => ({ frame: (t: number) => seen.push(t), shouldContinue: () => true }),
            resize: () => {},
        } as never);
        lc.arm();
        lc.resume("manual");
        for (let i = 0; i < 300; i++) { now += 1000 / 60; q.splice(0).forEach((cb) => cb(now)); }
        const atPark = seen[seen.length - 1];
        lc.suspend("manual");
        now += 10_000;
        lc.resume("manual");
        const atResume = seen[seen.length - 1];
        console.log(`F1-G7 elapsed at park ${atPark.toFixed(3)} s, first frame after a 10 s park ${atResume.toFixed(3)} s`);
        expect(Math.abs(atResume - atPark)).toBeLessThan(0.05);
    });
});

describe("F1-G8 the attractor is bounded at any frame time", () => {
    for (const dt of [17, 100, 250, 1000]) {
        it(`one ${dt} ms step from a 0.4 offset never overshoots past the preset's peak`, () => {
            const f = usePointerVelocityField({ respectReducedMotion: false });
            f.setActive(true);
            f.setPointer(0.9, 0.5);
            for (let i = 0; i < 400; i++) f.tick(16); // engage and settle at the pointer
            f.setPointer(0.5, 0.5);
            const before = Math.abs(f.attractor.value.x - 0.5);
            f.tick(dt);
            const after = Math.abs(f.attractor.value.x - 0.5);
            console.log(`F1-G8 dt=${dt} offset ${before.toFixed(3)} -> ${after.toFixed(3)}`);
            expect(after).toBeLessThanOrEqual(before * 1.05);
            f.dispose();
        });
    }
});
```

## Appendix C · `f1-tail.mjs` (lands as `tests-visual/wired/spring-tails.spec.ts`)

The band-F probe library `lib.mjs` (`open`, `reporter`, `sleep`, `steps`, `median`, `DEMO`, `CAP`, `ENG`) is printed once, in `W-F.2.md` appendix D.

```js
// W-F.1 born-RED paint probe: every spring glide ends without a tail jump (R2-02-09, R3-01-10 in paint).
// Deterministic: the running CSS transition/animation is paused and seeked to fixed fractions of its
// duration, so the reading does not depend on frame timing or machine load.
// node f1-tail.mjs [--eng webkit]
import { open, reporter } from './lib.mjs';
const R = reporter('f1-tail');
const seek = async (page, setup, prop) => page.evaluate(async ([setup, prop]) => {
  const el = await (new Function(`return (async () => { ${setup} })()`))();
  if (!el) return { error: 'no element' };
  const a = el.getAnimations().find((x) => (x.transitionProperty || '') === prop || (x.animationName || '').length) ;
  if (!a) return { error: 'no running animation', prop };
  a.pause(); const D = a.effect.getComputedTiming().duration;
  const read = () => { const v = getComputedStyle(el).getPropertyValue(prop); const n = v.match(/-?[\d.]+/g); return n ? +n[0] : NaN; };
  const at = (f) => { a.currentTime = D * f; return read(); };
  const v0 = at(0), v96 = at(0.96), v98 = at(0.98), v100 = at(1 - 1e-6);
  a.finish();
  const travel = Math.abs(v100 - v0), s1 = Math.abs(v98 - v96), s2 = Math.abs(v100 - v98);
  return { D: +D.toFixed(1), travel: +travel.toFixed(2), step96to98: +s1.toFixed(2), step98to100: +s2.toFixed(2), ratio: +(s2 / Math.max(s1, 1e-3)).toFixed(2) };
}, [setup, prop]);
const cases = [
  ['/navigation/tabs', 'tab indicator translate', 'translate', `const ind=[...document.querySelectorAll('.segmented-indicator--js')].find(e=>e.getBoundingClientRect().width>0); const tabs=[...ind.closest('.segmented-tabs').querySelectorAll('.segmented-tab')]; tabs[0].click(); await new Promise(r=>setTimeout(r,900)); tabs[3].click(); await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))); return ind;`],
  ['/containers/accordion', 'accordion block-size', 'block-size', `const t=[...document.querySelectorAll('[data-slot=accordion-trigger], .disclosure-group-trigger')].find(e=>e.getAttribute('aria-expanded')==='false'); t.click(); await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))); const c=document.getElementById(t.getAttribute('aria-controls')); return c;`],
];
for (const theme of ['light', 'dark']) for (const [route, label, prop, setup] of cases) {
  const { browser, page } = await open(route, { theme });
  const m = await seek(page, setup, prop);
  R.row(`F1-G9 ${label} ${theme}: step 98-100% <= 1.5x step 96-98%`, !m.error && m.ratio <= 1.5, m);
  await browser.close();
}
R.done();
```

When W-F.2 moves the accordion onto the grid-rows transition, G9's accordion case reads `grid-template-rows` on the same element; the bound is unchanged.
