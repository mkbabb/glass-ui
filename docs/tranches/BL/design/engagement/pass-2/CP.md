# D5 · pass 2 · CP: the commit-path bake-off

| field | value |
|---|---|
| seat | D5 pass 2, wave 2, **CP** (REGISTRY §P1-9.2): the trio (Switch, accordion trigger, Slider) and the Button on F5, two builds that differ only in how the commit edge is played: A's CSS phase (transitions keyed on the state) against B's Web Animations fired from the door. Four cells, plus lines of code, and a decision table. No new mechanism |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | built at `f6abfaab2`; both patches re-checked with `git apply --check` at the close HEAD `5f9482361`. `git diff v10.1.0 HEAD -- src` is empty at both, so the `src` under both builds is 10.1.0 + F5 + this seat's hunks |
| base | HEAD + `pass-2/F5.patch` (sha1 `c557d6d50fe6`) |
| patches | `pass-2/CP-css.patch` (sha1 `1668c0b53911`), `pass-2/CP-waapi.patch` (sha1 `0d26fe033a30`). Each contains F5, so each applies on its own at HEAD. Side arm, not a build of record: `CP/css-prm-over-css.patch` (§3, cell 4) |
| worktree | `.claude/worktrees/bl/D5/p2/CP/wt` (detached at HEAD, `node_modules` and `tests-visual/node_modules` symlinked), plus a read-only reference tree `wtL` holding `P-A2-light.patch`, which this seat copied four member hunks from. Both were removed with `git worktree remove --force` at the close, and nothing is left under `.claude/worktrees/bl/D5/p2/CP/` |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. WebKit browsers retire after 60 navigations (`harness/lib.mjs` NAV_CAP, the AppSSO wall, tile H3-1). Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| load | 1-minute load 5-45 across the session. Every cell line in `CP/logs/` carries its own load. Other seats ran browsers throughout (`other headless processes: chromium 2-15, webkit 0-2` in each run header) |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), **Q-5 (a): the commit is light (CK-02 arm iii)**. Both builds therefore play the same light commit: A2-light's gate × charge on the `control-engage` envelope. Arm ii is not built here |
| fences | no tracked-source edit and no git write in the main checkout; writes only under `docs/tranches/BL/design/engagement/` (this file, `CP-css.patch`, `CP-waapi.patch`, `CP/`). No browser MCP. Sibling repositories not touched |

## 0 · In brief

1. **B is not retired.** B wins one of the four cells, reduce, and only as built. The library's reduced-motion fallback (`utilities/a11y-overrides.css`: `*, *::after { transition-duration: 0s !important }`) zeroes A's commit light: rise 0.0000 on every member, every rep, both engines. B's Web Animations ignore that rule, so B keeps the light (rise 0.019-0.022 in dark). A ties the cell with a 23-line authorization block (`CP/css-prm-over-css.patch`): its rise matches B's within 0.002 in both engines. That block is the library's own pattern for this (the `transitions.css` fade rows), not a new mechanism.
2. **A wins two cells and one is a tie.**
   - **Second commit during the light (cell 1).** B's restart cuts the light to rest in one frame at the second edge: cut = 1.00 of the light's height in every B film, in both engines. At +45 ms that is a one-frame drop of 0.019-0.022 against the single commit's own 0.004-0.005 (switch and button in dark, 3/3 reps in Chromium, WebKit rep 1). A retargets: cut 0.03-0.34, no drop beyond its own decay, in every A film. A's cost is that the second commit is only partly answered: its rise is 0.25-0.6 of a lone commit's at +45 ms.
   - **Commit before hydration (cell 3).** The member's own markup and stylesheet with no script, its state attribute flipped by a DOM write. A paints a commit 0.93-1.13 × the in-app one on switch, accordion and button. B paints nothing (0.00 ×), every rep, both engines.
   - **Script press composed with the commit (cell 2): a tie.** On the Button, a 160 ms press followed by a commit passes arm iii in both builds, with the same press scale step (0.0045-0.0063) and the same light rise. A re-press 44 ms into the commit's light reads the same largest one-frame drop in both (Chromium 0.0024-0.0049 for A against 0.0024-0.0045 for B). A's few FAIL lines come from a smaller reference drop in that rep, not a larger drop.
3. **Cost (CK-23).** Over F5, A is 15 files +202/−28 and B is 15 files +278/−37. The commit path alone (B over A) is 4 files +102/−35: the door gains `fireCommit` and a `data-state` observer (+79/−7), the Switch and the accordion trigger each gain a door call (+9 each), and engage.css loses its 25 transition lines (−20 net). Per state-bearing member: 0 lines in A, about 9 in B.
4. **Two rows the four cells do not name both favour B, and the agglomerator should weigh them.**
   - **CK-21, fail loud.** Five tokens were planted unreadable. B fails loud on 4 of 5. On three it calls `console.error` through the door's `loud()`. On the easing token, `animate()` throws a TypeError, which escapes the Button's click handler (a throw where `loud()` stays non-fatal). A is silent on all five: a `var()` that does not resolve makes the transition invalid at computed-value time, and nothing reports it. Both builds are silent on `--rung-light`.
   - **CK-09 / E-8 under PRM.** B fails `E-8 literal … PRM` on all three members: 60 and 180 ms animations run where the harness resolves every clock token to 0, because the PRM fallback zeroes `transition-duration` on its probe element. A passes, because nothing runs. This is the mirror image of cell 4, and it shows that the witness contradicts itself: E-9 asks for a light leg kept under reduce, while E-8's PRM arm calls any kept clock "minted". It is listed as a next-pass defect class (§7).
5. **The commit form fails on its own, in both builds alike.** On near-white light-theme faces the light commit stays under arm iii's 0.01 bound: switch rise 0.005-0.008 in both engines and both builds, which is A2's Q-5 finding again. The accordion's light cannot be read on the harness channel at all: its face is transparent and no ancestor paints, so `__light` composites onto white and saturates at L = 1 in both themes (E-2's accordion commit cells fail by arm in both builds; §4 CK-02). Neither failure depends on the path.

## 1 · Patches

| patch | files | +/− vs HEAD | `git apply --check` |
|---|---|---|---|
| `pass-2/CP-css.patch` | 53 | +1377/−630 | OK at `f6abfaab2` and at `5f9482361` |
| `pass-2/CP-waapi.patch` | 53 | +1446/−632 | OK at `f6abfaab2` and at `5f9482361` |
| `pass-2/CP/css-prm-over-css.patch` (side arm, applies over a CP-css tree) | 1 | +23/−0 | OK on a CP-css tree |

**Shared by both builds (identical bytes), over F5:**
- `src/styles/utilities/engage.css` (new): the `engage-pressed`, `engage-chosen`, `engage-disclosed` and `engage-held` utilities, each stamping `--rung-class`. Also the light seat's geometry (the host's `::after`, or the face's `[data-engage-light]` layer), `--rung-light`, and the forced-colours arm, which removes the seat. The utilities are imported from `utilities.css` and bound in `.published-roster`.
- Members:
  - Switch: `engage-chosen` replaces `tap-squish`, the face is marked `data-engage-face`, and it gains a `control-bit__light` layer.
  - Accordion trigger: `engage-disclosed`.
  - Button: `engage-pressed` replaces `tap-squish`; `glass-capsule-hover` and the host's `scale` transition leg are dropped; A2's gleam re-key moves the gleam onto the envelope.
  - Slider: `engage-held`. The token `--scale-engage: 1.06` is added to `scale-paper.css`.
  - These are A2-light's hunks for these four members, copied from `P-A2-light.patch` so that the commit seat exists and E-3 is informative.
- Door: the loud `--scale-engage` check, from A2.
- Tests: `Button.test.ts` and `binary-triad.test.ts` migrate with the classes; `slider.contract.test.ts` is updated for the root class. `docs/design/tunable-anim.md` gets F5's `--press-t` rename, which F5 left out: F5 alone fails `drive-tokens.test.ts` 1/1, the seat's first CSS vitest run, `logs/gates-css.log`.

**The commit path (`CP/numstat-waapi-over-css.txt`, `CP/path-delta-engage.css.diff`):**

| | A · `CP-css.patch` | B · `CP-waapi.patch` |
|---|---|---|
| what plays the edge | `engage.css`: the seat rests `opacity: 0` over a full charge, with transitions; the committed state (`[data-state=checked|open]`, or the parity `[data-commit=b]`) swaps which leg runs on the attack and which on the release. 25 lines | `useEngage.ts` `fireCommit(host)`: it reads the attack, release, easing, `--rung-light` and `--fill-selected` on the seat, cancels any running light, and plays two `Element.animate` effects on the seat (`pseudoElement: "::after"` where there is no layer). The seat rests `opacity: 1` over an empty charge. Each token it cannot read is logged loudly through `loud()` |
| what fires it, state-bearing (Switch, accordion) | the `data-state` attribute itself (style semantics) | `commit: "state"`: a `MutationObserver` on the host's `data-state`, armed one frame after mount (P-B's arming), plus a `useEngage` call in each member (+9 lines) |
| what fires it, stateless (Button) | the door's parity flip (F5's `commit: "call"`) read by CSS | the same parity flip, then `fireCommit` |
| a second commit in flight | both legs retarget | both animations are cancelled and restarted (P-B's "one crest per element, never two summed") |
| under reduce | the library's PRM fallback zeroes the transitions | Web Animations are outside that rule; the light plays |
| Slider | no commit edge (held class); identical in both | identical |

## 2 · Cost (CK-23)

Measured with `git diff --no-index --numstat` between trees extracted from HEAD (`git archive`) with each patch applied; files in `CP/numstat-*.txt`.

| delta | files | + | − |
|---|---|---|---|
| F5, vs HEAD | 43 | 1175 | 602 |
| **A over F5** | 15 | 202 | 28 |
| **B over F5** | 15 | 278 | 37 |
| **B over A (the commit path alone)** | 4 | 102 | 35 |
| ↳ `useEngage.ts` | | 79 | 7 |
| ↳ `Switch.vue` | | 9 | 2 |
| ↳ `AccordionTrigger.vue` | | 9 | 1 |
| ↳ `engage.css` | | 5 | 25 |
| A's PRM authorization (side arm) | 1 | 23 | 0 |

The fixed cost of the path is about 75 lines in B's door against about 25 lines of CSS in A. Per state-bearing member, B adds one door call (about 9 lines including its comment) and A adds nothing. Extrapolated to A2's eight CK-02 members, B's member cost is about 6 × 9 = 54 lines (Checkbox, Radio, selectable Chip, SegmentedTabs, ToggleGroupItem, accordion trigger; the Switch is already counted). That is arithmetic from the table, not a build.

## 3 · The four cells

Probe: `CP/probe/cp.mjs`. It uses the harness's own in-page reads (`lib.mjs __film`, `__light`, `commitArms`) and adds a per-frame series of the face's light layers over its committed fill (the "layers" channel of `lightRise`). Drivers: `CP/run-cp.sh` (reps 1-3), plus the side arm `css-prm` on cell 4. Tabulator: `CP/probe/tab.mjs`. JSON: `CP/json/rep{1,2,3}/`; logs: `CP/logs/cp-rep*.log`. Chromium ran 3 reps; WebKit ran rep 1. WebKit reps 2-3 are UNMEASURED (§7 item 1), so every WebKit verdict below rests on one rep and agrees with Chromium's 3/3 in direction. A WebKit rep 0 on an earlier probe revision (`logs/cp-rep0-webkit-earlyprobe.log`) agrees cell for cell and is not counted.

Light figures are relative luminance, 0 to 1. "Rise" is how far the light climbs above its lowest earlier value; "cut" is the fall in the 40 ms after the second edge, as a share of the light's height above its committed rest at that edge (1 means it fell to rest in one go).

### Cell 1 · a second commit during the crest

The member is clicked once (the reference: its own largest one-frame drop and its rise), then clicked twice Δ ms apart, with Δ = 45 ms (inside the 60 ms attack, near the light's crest) and Δ = 100 ms. Bound, as E-10 reads D-1: the largest one-frame drop after the second edge, per nominal 16.7 ms frame, is no larger than the single commit's own + 0.002. Switch and Button below; the accordion is §3.5.

| member · theme | Δ | A (CSS) Chromium r1-r3 | B (WAAPI) Chromium r1-r3 | A WebKit r1 | B WebKit r1 |
|---|---|---|---|---|---|
| switch dark | 45 | PASS 3/3 · cut 0.12-0.18 · drop 0.0047-0.0049 vs 0.0034-0.0041 · rise2 0.010-0.013 of 0.021-0.022 | **FAIL 3/3** · cut 1.00 · drop **0.0187-0.0212** vs 0.0040-0.0049 · rise2 0.021-0.022 | PASS · cut 0.03 · drop 0.0048 vs 0.0055 · rise2 0.0078 of 0.0219 | **FAIL** · cut 1.00 · drop **0.0203** vs 0.0043 |
| button dark | 45 | PASS 3/3 · cut 0.12-0.20 · drop 0.0046-0.0056 vs 0.0041-0.0045 · rise2 0.005-0.010 of 0.018-0.022 | **FAIL 3/3** · cut 1.00 · drop **0.0203-0.0217** vs 0.0044-0.0046 | PASS · cut 0.09 · rise2 0.0049 of 0.0215 | **FAIL** · cut 1.00 · drop **0.0198** vs 0.0053 |
| button light | 45 | PASS 3/3 · cut 0.11-0.15 | **FAIL 3/3** · cut 1.00 · drop 0.0127-0.0169 vs 0.0024-0.0032 | PASS · cut −0.02 | PASS · cut 1.00 · drop 0.0109 vs 0.0108 |
| switch light | 45 | PASS 3/3 · cut −0.24-0.11 | FAIL 2/3 · cut 1.00 · drop 0.0014-0.0062 vs 0.0009 | PASS | FAIL · cut 1.00 |
| switch dark | 100 | PASS 3/3 · cut 0.22-0.27 | FAIL 1/3 · cut 1.00 · drop 0.0044-0.0072 vs 0.0040-0.0049 | PASS · cut 0.00 | PASS · cut 1.00 |
| button dark | 100 | PASS 3/3 · cut 0.20-0.34 | FAIL 2/3 · cut 1.00 · drop 0.0057-0.0068 vs 0.0044-0.0046 | PASS | PASS · cut 1.00 |

Load: Chromium reps 15-24 (rep 1) and 5-14 (reps 2-3); WebKit rep 1 13-24 (`logs/cp-rep*.log`, each line).

Reading:
- B's restart cuts the light to its committed rest at the second edge in **every** film, both engines, both Δ (cut 1.00), then plays a whole new light. At Δ = 45 ms on a visible light (dark faces, and the light-theme Button) that cut is a one-frame drop of 4-5× the light's own decay step. It reproduces 3/3 in Chromium at load 5-24 and in WebKit rep 1. That breaks D-1 (CK-20: "no one-frame discontinuity on any engagement transition"). At Δ = 100 ms the light has already decayed, the cut is smaller, and the verdict flips between reps: not a reproduced defect at 100 ms.
- A never cuts: the drop after the second edge stays within its own decay (0.0012-0.0056, every film). A's price is that the second commit is a **merge**, not a second answer: its rise after the edge is 0.25-0.6 of a lone commit's at Δ = 45 ms and 0.9-1.0 at 100 ms.
- **Verdict: A.** The standing law (D-1) is a bar B fails reproducibly and A passes. No row asks that each of two commits 45 ms apart be answered at full height. iOS's own "re-seat, never reset" interruption law (`pass-1/RW.md` §1) reads the same way.

### Cell 2 · a script press composed with the commit

The Button is the one member whose press is the door's script spring (`useLiquidPress` writes `--press-t` and an inline `scale`). (a) A 160 ms pointer press, then release; the click commits. (b) A quick click, then a re-press 42-54 ms into the commit's light, held 160 ms and released, which is a second commit. Bound (b): the largest one-frame light drop is no larger than a lone click's own in the same page + 0.002.

| | A Chromium r1-r3 | B Chromium r1-r3 | A WebKit r1 | B WebKit r1 |
|---|---|---|---|---|
| (a) arm iii · press scale step · light rise, light theme | PASS 3/3 · 0.0046-0.0051 · 0.0174-0.0180 | PASS 3/3 · 0.0046-0.0051 · 0.0174-0.0180 | PASS · 0.0063 · 0.0163 | PASS · 0.0057 · 0.0128 |
| (a) dark | PASS 3/3 · 0.0047-0.0051 · 0.0204-0.0217 | PASS 3/3 · 0.0045-0.0050 · 0.0206-0.0215 | PASS · 0.0063 · 0.0218 | PASS · 0.0061 · 0.0175 |
| (b) largest light drop vs lone click, light | PASS 3/3 · 0.0024-0.0032 vs 0.0027-0.0039 | PASS 3/3 · 0.0024-0.0031 vs 0.0024-0.0032 | FAIL · 0.0092 vs 0.0069 | PASS · 0.0088 vs 0.0095 |
| (b) dark | FAIL 1/3 · 0.0043-0.0049 vs 0.0025-0.0031 | PASS 3/3 · 0.0044-0.0045 vs 0.0043-0.0049 | FAIL · 0.0073 vs 0.0042 | PASS · 0.0078 vs 0.0072 |

Reading: the two builds read the same drop in (b), within 0.0006 in Chromium and within 0.0005 in WebKit. A's FAIL lines come from a smaller reference (a lone click's drop), not from a larger composed drop. The press scale and the commit light live on different channels in both builds (inline `scale` on the host, light on its `::after`), which is the floor's own law (CK-02's "the press and the commit cannot share the scale channel"). Neither path disturbs the other. **Verdict: tie.** P-A's original concern (a script press writing an inline `scale` over a `transform` pop, DV-3) does not arise for a light commit.

### Cell 3 · a commit before hydration

The member's rendered markup is cloned beside it in the same page. The clone carries the library's classes and stylesheet and has no script attached: no Vue instance, no door. After two frames its state attribute is set to the released value and then, filmed, to the committed one by a plain DOM write (`data-state` for switch and accordion, the parity `data-commit` for the Button). The reference is the same member committed in the app, in the same page. Verdict: PAINTS if the clone's rise is ≥ 0.5 × the in-app rise, SILENT if < 0.2 ×.

| member | A Chromium r1-r3 (both themes) | B Chromium r1-r3 | A WebKit r1 | B WebKit r1 |
|---|---|---|---|---|
| switch | PAINTS 6/6 · 0.98-1.02 × | SILENT 6/6 · 0.00 × | PAINTS 2/2 · 1.00-1.01 × | SILENT 2/2 · 0.00 × |
| accordion | PAINTS 6/6 · 0.98-1.13 × (§3.5: read as change, not as brightening) | SILENT 6/6 · 0.00 × | dark PAINTS 0.93 ×; light SILENT 0.07 × | SILENT 2/2 |
| button (parity) | PAINTS 6/6 · 0.96-1.06 × | SILENT 6/6 · 0.00 × | PAINTS 2/2 · 0.98-1.00 × | SILENT 2/2 |

Reading: A paints whatever writes the state, before or without the door. B paints only what the door sees. This is exactly what SPECS §6 predicted and what neither pass-1 route measured.

Scope, stated so the cell is not read wider than it is:
- No user gesture can commit these members before hydration in either build. The Switch and the accordion are reka buttons whose `data-state` changes only through script, and the Button's parity is the door's to flip. So A's win is for **non-door writers**: server-rendered markup patched by another script, a progressive-enhancement layer, or a consumer writing `data-state`.
- In the app itself, B's one-frame arming and A's style semantics agree (the arming rAF fires before the first style resolution; SPECS S-9).
- WebKit's light-theme accordion SILENT for A (0.07 ×) is the saturated read of §3.5 at an in-app rise of 0.0089; it is not counted.

**Verdict: A.**

### Cell 4 · reduce

Under `prefers-reduced-motion: reduce`, verified, the target is focused, its commit key is pressed with an 80 ms dwell, and the commit is filmed. Read: the commit happened (state changed); a light leg kept (rise, and the light animations seen); no spatial leg (the target's and face's scale range < 0.002).

| member · theme | A Chromium r1-r3 | B Chromium r1-r3 | A + PRM authorization (side arm) Chromium r1-r3 | A WebKit r1 | B WebKit r1 | A + auth WebKit r1 |
|---|---|---|---|---|---|---|
| switch dark | rise **0.0000** · no animation | rise 0.0212-0.0221 · iii 3/3 | rise 0.0208-0.0221 · iii 3/3 | **0.0000** | 0.0212 · iii | 0.0216 · iii |
| button dark | **0.0000** | 0.0193-0.0216 · iii 3/3 | 0.0202-0.0216 · iii 3/3 | **0.0000** | 0.0206 · iii | 0.0217 · iii |
| button light | **0.0000** | 0.0177-0.0180 · iii 3/3 | 0.0173-0.0180 · iii 3/3 | **0.0000** | 0.0179 · iii | 0.0141 · iii |
| switch light | **0.0000** | 0.0063-0.0064 (under 0.01: the form, §0 item 5) | 0.0062-0.0064 | **0.0000** | 0.0068 | 0.0076 |
| accordion (both) | **0.0000** | 0.0055-0.0214 (unreadable channel, §3.5) | 0.0056-0.0222 | **0.0000** | 0.0089-0.0231 | 0.0089-0.0239 |

Scale range 0.0000 on target and face in every cell of every build: neither path moves geometry under reduce. Load 5-24.

Reading:
- A as built loses its commit light under reduce on every member, every rep, both engines. The cause is the library's global PRM fallback (`src/styles/utilities/a11y-overrides.css`, `@layer components`: `*, *::before, *::after { transition-duration: 0s !important }`). It zeroes every CSS transition and reaches no Web Animation. A2's claim that "it is light, so it stays under reduced motion" (`P-A2.md` §3) is refuted on the cascade: its E-9 cells read the committed state's paint, not the transient.
- B keeps the light because Web Animations sit outside that rule. That is also why B fails E-8's PRM arm (§0 item 4): it plays clocks that the library's PRM governance never authorized.
- The side arm (`CP/css-prm-over-css.patch`, +23 lines) re-authorizes A's two legs under reduce. It uses the fallback's own documented exception: `!important` class rows in `@layer components` win by specificity, as `transitions.css` does for its fades. With it, A's light matches B's within 0.002 to 0.004 (WebKit light-theme Button 0.0141 against 0.0179, one read) in both engines, scale range 0.
- **Verdict: B, as built.** With the authorization row, a tie. The row lands in BJ's hashed `PRM-AUTHORIZED-SET` (`a11y-overrides.css:36-43`), so it is a governance cost as well as 23 lines.

### 3.5 · The accordion's light is unreadable on this channel

The trigger's face is transparent and no ancestor in the scene paints a background, so `__light` composites the layers onto its white default in both themes. L then reads 1.0000 at rest, and the light commit (white on white in light, `--foreground` on white in dark) moves L *down* from saturation. The "cut" figures for the accordion in `CP/json` are therefore meaningless (thousands), and its E-2 arm iii fails in both builds and both themes for this reason alone (§4 CK-02). Its rise figures above count a change of paint, not a brightening. The CK-25 frames are the pixel read (§6). This is a harness gap (§7), the same in both builds.

## 4 · Decision table

| cell | A · CSS phase | B · WAAPI from the door | winner | evidence |
|---|---|---|---|---|
| 1 · second commit during the crest | continuous (cut 0.03-0.34), merges the second commit (rise 0.25-0.6 ×) | cuts to rest at the edge (cut 1.00), one-frame drop 0.019-0.022 against 0.004-0.005 (D-1), 3/3 Chromium + WebKit r1 at Δ 45 | **A** | §3 cell 1 |
| 2 · script press composed with the commit | press and light on separate channels, same reads | same | **tie** | §3 cell 2 |
| 3 · commit before hydration (a non-door writer) | paints 0.93-1.13 × | silent 0.00 × | **A** | §3 cell 3 |
| 4 · reduce | light zeroed by the library's PRM fallback, 0.0000 everywhere; ties B with a 23-line authorization row | light kept (rise ≈ the in-app one); plays clocks outside the PRM governance (E-8 PRM FAIL ×3) | **B as built** (tie with A's authorization row) | §3 cell 4, §5 CK-09 |
| lines | +202/−28 over F5; 0 per state member | +278/−37; about 9 per state member; door +79/−7 | **A** | §2 |
| (not a bake-off cell) CK-21 fail loud on the commit path | silent on 5/5 planted tokens | loud on 4/5 (one is a thrown TypeError, not a `console.error`); silent on `--rung-light` | **B** | §5 CK-21 |

**B loses three of the four cells and lines of code, and wins reduce as built.** By the charter's rule ("B is RETIRED if it loses all four"), B is **not retired**. The agglomerator decides with three facts on record:
1. B's one win evaporates with A's 23-line authorization, which is the library's existing mechanism.
2. B's door is the only commit path here that fails loud. A's silent tokens are a CK-21 counterexample that A must cure on its own, for instance by having the door read and check the envelope tokens it already reads elsewhere.
3. B's restart is a D-1 defect that is B's own to cure (start from the seat's current light). That cure is a change of mechanism and was not built here.

## 5 · Per CK row, per engine

Battery: `harness/` unchanged, through `CP/run-battery.sh`, each witness narrowed to this seat's members (`--scenes`). CSS: `battery-css-r2`, both engines, worktree verified to hold `CP-css.patch` (E-7's static arm). WAAPI: `battery-waapi-r2`, Chromium complete, WebKit E-1..E-3; **WebKit E-4..E-11 on B are UNMEASURED** (§7 item 1). Those witnesses read no commit path except E-8 (CK-09), whose Chromium reading is in the table. The r1 CSS battery (before `--scale-engage` was added) is kept in `json/battery-css-r1/` and differs only on E-3, E-10 and E-11's slider cells. Cells are Chromium · WebKit; load is each run's start-to-end 1-minute load.

| CK | witness | A · CSS | B · WAAPI | path-dependent? | reading |
|---|---|---|---|---|---|
| CK-01 | E-1 (scenes switch, accordion, button, slider) | 18/26 · 18/26 (load 17-22) | 18/26 · 18/26 (load 15-24) | no | the latch reads 4 of 55 adopting (this seat adopts four members; CK-01 is A2's row). Runtime per class: `disclosed (accordion)` FAILs press, Δscale 0.000 and no press-only paint (the accordion's press is its hover colour; the disclosure substrate's, not this seat's); `dragged (sortable)`, `presented (sheet) PRM`, `ambient (aurora)` as H2 §4 |
| CK-02 | E-2 (switch, accordion, button) | 23/36 · 23/36 | 23/36 · 23/36 | no: identical cell for cell | switch **light** theme: no arm on all four paths (rise under 0.01 on a 0.92 face, §0 item 5); switch dark 4/4 by arm iii. Accordion: no arm on 7 of 8 cells (§3.5). Button: 6/8 commit cells by arm iii; **programmatic** fails (no arm) in both themes and both builds, because the scene's programmatic commit is `clicks++`, which never reaches the door (the stateless edge needs an activation). Tab entry quiet 6/6 and mount committed 6/6 per engine |
| CK-03 | E-2 `mount(committed)` | PASS 6/6 · 6/6 | PASS 6/6 · 6/6 | no | B's arming frame and A's style semantics both keep the mount quiet. The async arrival has no cell (H2 §7) |
| CK-04 | E-3 (slider) | 20/22 · 20/22 | 20/22 · 20/22 | no | desk pointer-held and keyboard-focused ×1.060 (bound ×1.03), all plants PASS on a slider that now engages; **phone touch-held ×1.000** both themes (Q-3 (c): the coarse rung is E's) |
| CK-05 | E-4 (slider) | 3/3 · 3/3 | 2/3 · UNMEASURED (§7) | no (identical slider) | B's Chromium `fling carries velocity` read FAIL once (carry 0.00 px, load 14) on byte-identical slider code. Re-read twice per build (`logs/e4-reread.log`, load 9-16): A 3/3 twice (carry 5.20, 5.06 px), B 3/3 twice (carry 4.96, 4.94 px), bound ≥ 4: **NOT-REPRODUCED**. The carry sits about 1 px over its bound in both builds; the release rule is F5's |
| CK-06 | E-5 (press_switch, accordion, button) | 16/24 · 16/24 | 16/24 · UNMEASURED (§7) | no | the accordion has no press-only property, under reduce or not (8 FAIL): the disclosure substrate's press is its hover colour. Switch and Button sustain |
| CK-07 | E-6 (s6) | 4/14 · 2/12 | 4/14 · UNMEASURED (§7) | no | RED by construction; closed only by the owner's words (Q-2) |
| CK-08 | E-7 | 5/7 · 5/7 | 5/7 · UNMEASURED (§7) | **writers: no.** Both: `data-held` GlassDock.vue + door, `data-press` PagerDots.vue + door (F5's carried writers, D2's and A2's). `data-commit`: one writer, the door, in both | — |
| CK-09 | E-8 (switch, accordion, button) | 7/7 · 7/7 | **4/7** · UNMEASURED (§7) | **yes** | B fails `literal … PRM` ×3: Animation script 60 ms and 180 ms against 0 clock tokens. Under reduce E-8 resolves every token through `transition-duration`, which the PRM fallback zeroes, so any kept light reads minted (§7, a witness contradiction with E-9). Without PRM, both PASS with no minted figure: B's script durations are the envelope tokens read at runtime |
| CK-10 | E-9 (switch, accordion, button, slider) | 22/24 · 22/24 | 22/24 · UNMEASURED (§7) | no on E-9 as written; **yes on the transient** (cell 4) | E-9's light leg reads the committed state's paint, so A passes it while its commit light is zeroed. The accordion `press-light` FAILs in both (no press-only paint) |
| CK-11 | grep | `.tap-squish` and `.glass-capsule-hover` are not composed by the four members in either build; the recipes stay for their other consumers (A2's retirement) | same | no | — |
| CK-12 | read | the light rides `--engage-control-engage-{attack,release}` and `--fill-selected`; `--scale-engage: 1.06` is a `scale-paper.css` row (A2's) | same rows, read by script | no | `--scale-engage` on the ladder's engaged row is still open (C-E r11) |
| CK-13 | read | forced colours: the seat is `display: none` (shared rule). Not re-read in a browser by this seat | same rule; B's `animate()` on a `display: none` pseudo-element paints nothing | no | UNMEASURED by this seat in a browser (A2 read the same rule: `P-A2.md` CK-13) |
| CK-14 | capture | coarse frames in §6 | same | no | — |
| CK-17 | — | **UNMEASURED (owner's safaridriver checkbox)** | same | — | WebAnimations `pseudoElement` and the PRM fallback's reach both need the real-Safari cell |
| CK-20 | E-10 + cell 1 | E-10 3/3 · 3/3 (slider; the commit is not on its path) | E-10 3/3 · UNMEASURED (§7) | **yes, cell 1** | B's restart cut is a CK-20 counterexample (§3 cell 1). A's merge is not |
| CK-21 | E-11 + `probe/failloud.mjs` | E-11 PASS 2, UNMEASURED 2 (the commit plant `--scale-commit-pop` is read by no path here). Planted commit tokens: **SILENT 5/5** (switch and button, Chromium, load 5-7) | E-11 the same. Planted: **LOUD 4/5**, `--rung-light` SILENT | **yes** | §0 item 4. WebKit fail-loud: §7 |
| CK-22 | — | MIGRATION rows: the Switch and the Button no longer compose `tap-squish` / `glass-capsule-hover` (A2's rows M-…, §4 of `P-A2.md`); no consumer reads `data-commit` | B adds none beyond A's | no | — |
| CK-23 | numstat | §2 | §2 | yes | A cheaper |
| CK-25 | `capture.mjs` | §6 | §6 | frames | — |
| CK-26 | read | no lighting layer added beyond the one light seat on the face (O-87: it carries state, the commit); no `plus-lighter`, no glow | same seat | no | — |
| CK-27 | read | the side arm is a plant-free authorization; the probe's own cells carry no plant (§7) | — | — | gates that cannot fail: `probe/cp.mjs`'s verdicts are this seat's and carry no planted self-test (§7) |

Rows CK-15, CK-16, CK-18, CK-19 and CK-24 are not this seat's (they read E's stage, rest-running atoms, the velocity owners, the class scenes and Q-1). Both builds carry F5's state for them unchanged.

## 6 · CK-25 · the owner-glance set

`capture.mjs --scenes button,switch,slider,accordion` for each build, fine and coarse, light and dark, the six states (rest, pressed, held, engaged, committed, released). **Chromium: both builds captured** (css 11:31-12:16, the guard's headroom wait expiring after 30 min at 1553 processes; waapi 13:27-13:59 the same way; load 11-16). **WebKit: UNMEASURED** (§7 item 1). Sheets: `CP/glance/{css,waapi}-chromium-{fine,coarse}.png`; frames: `CP/glance/frames/` (192); index: `CP/glance/{css,waapi}-index.json`. Log: `CP/logs/capture-chromium.log`.

Read from the log, not judged: the two builds' scale readings agree within 0.004 on every frame. Button pressed ×1.028-1.033, held ×1.033, committed ×1.000-1.001. The fine slider grows ×1.060 held and engaged, and ×1.000 coarse (Q-3 (c)). The Switch and the accordion read ×1.000 in every state: their commit is light only. **The coarse Button settles at ×1.000 after release in both builds** (HEAD settled at ×1.015 in Chromium, H2 §5, C-B r13): dropping `glass-capsule-hover` cures CK-14's latch on this member. The "committed" column (90 ms after the release) is the frame where the two paths could differ; at 90 ms, with a single commit, they should not. The judgement is a seat that did not build the route's. Real Safari: UNMEASURED (owner's safaridriver checkbox).

## 7 · Open gaps and next-pass defect classes

1. **UNMEASURED, WebKit: reps 2-3 of the four cells, B's battery E-4..E-11, the fail-loud probe, and both builds' captures.** Another seat (`run-fv3.sh webkit-all`) held the machine-wide WebKit lock from about 10:04. From 12:45 the guard's `webkit` slot was held, with further `--exclusive webkit` runs queued at `--timeout 240` and `--timeout 300`. This seat's WebKit runs waited 40 min without admission and were stopped at 13:25 (`logs/battery-waapi-r2.log`, last lines). The drivers are in place (`run-cp.sh <rep> webkit`, `WITS=… run-battery.sh waapi r3 webkit`, `probe/failloud.mjs --engine webkit`, and `capture.mjs --engines webkit`) for the critic or the next pass. Note that the WAAPI battery's E-7 static arm needs a worktree holding `CP-waapi.patch`.
2. **E-4 slider fling** on B, Chromium, read FAIL once (carry 0.00 px) on slider code identical to A's. Re-read twice in each build it PASSes (4.94-5.20 px against 4): NOT-REPRODUCED. The carry's margin over its bound is about 1 px in both builds, which is F5's to widen or rule.
3. **Harness: the accordion's light is unreadable** (§3.5). `__light` falls back to white when no ancestor paints, in both themes. The scene app's dark theme does not paint a body background the probe can find. This is for the next harness seat.
4. **Harness: E-8's PRM arm contradicts E-9.** E-8 resolves clock tokens through `transition-duration` on a probe element, which the PRM fallback zeroes, so every kept light reads "minted" under reduce, A's authorized rows included. It is a next-pass defect class for the harness owner; the rows it scores (CK-09, CK-10) are unchanged.
5. **The probe's cells carry no plant.** `probe/cp.mjs` is this seat's, not a harness witness. It has no self-test, so a critic should re-derive one cell (for example, cut 1.00 on B at Δ 45) from the JSON series (`seriesL`) before relying on it.
6. **B's restart cut** is curable inside B (start the light from the seat's current value), and **A's silence** is curable inside A (a loud read of the envelope tokens by the door it already has). Neither cure is built: the charter for this seat is no new mechanism.
7. **The commit form itself** (light) fails arm iii on near-white faces in both builds (switch light, the Radio and the accordion in A2). That is Q-5's, the owner's.
8. **The Button's programmatic E-2 cell** cannot be driven by the stock scene (`clicks++` bypasses the door). This holds in both builds. P-B used a scene fork (`element.click()`); this seat kept the stock app so its cells compare with A2's.
9. **Process.** The first WebKit runs (CSS battery r1, the four cells rep 1) went through `guarded --light` without `--exclusive webkit`. The harness's own machine-wide WebKit lock serialized them, but the machine law asks for the guard's exclusive slot. Every WebKit run from chain 4 on uses `--exclusive webkit`.
10. **Real Safari**: every cell UNMEASURED (owner's safaridriver checkbox).

## 8 · Gates and close

| gate | CP-css | CP-waapi |
|---|---|---|
| `npm run build` | exit 0 (`logs/gates-css-final.log`, 09:47-09:57, load 14-19) | exit 0 (`logs/gates-waapi-final.log`, 10:06-10:41, load 16-27; most of it queued for a guard slot) |
| `npm run typecheck` (both projects) | exit 0 | exit 0 |
| `demo:dist:build` | exit 0 | exit 0 |
| `vitest run --maxWorkers=2` | **240/240 files**, 2330 passed, 10 expected fail, 1 skipped | **240/240 files**, 2330 passed, 10 expected fail, 1 skipped |

Earlier runs, kept as evidence: the first CSS `npm run build` failed on `.published-roster` (the four utilities unbound), now bound. The first CSS vitest run failed 2 files: `drive-tokens` (F5's `--press-t` rename missing from `docs/design/tunable-anim.md`; it is F5's, cured in both patches) and `slider.contract` (the new root class) (`logs/gates-css.log`).
