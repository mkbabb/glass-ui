# AT.W0b · Lens C4 — fold + harden the dock findings into AT wave specs

**Brief.** Synthesize the six dock lenses (B1/B2/B3 design + B4/B5/B6 research/adversarial)
into a coherent, hardened set of AT dock-wave specs. Decide which dock refinements cross the
bar (≥2 distinct consumer CONTEXTS or a real defect) and become AT waves, vs which BOOK.
Reconcile the design and research lenses — where they agree, where they conflict. Define the
dock wave(s) with one hard gate each, and propose where they slot into the AT sequence.

**Posture.** This is a C-lens (fold/harden), not a fresh audit. It builds ON B1–B6 and the
W0 L1–L6 corpus; it does NOT re-derive. Every finding below is cross-checked against ≥2 of the
B-lenses and re-verified at `file:line` against HEAD (3.2.0) where the disposition turns on it.
Disposition: authored audit/design slice. NO src/ written; NO sibling written; read-only git.
inv-16 clean (glass-ui-internal; cross-repo consumers name-forward).

---

## §0 — The synthesis verdict, up front

**The six lenses converge on one structural truth: the dock is FUNCTIONALLY sound at HEAD
(no shipped bug found by any lens) but its VERIFICATION FABRIC and its A11Y CONTRACT are thin,
and two specific quiet-wrong paths (the spring-curve engine divergence, the VT singleton race)
the AQ.W6 VT-fork left are real latent defects.** The design lenses (B1/B2/B3) want to push the
dock's *feel* to 2025 SOTA (proximity magnification, traveling rail indicator, spring
micro-feedback); the research lenses (B4/B5/B6) find the dock's *contract* is APG-wrong on the
rail, gated nowhere, and accreted on the overflow model. These are not in tension — they touch
disjoint layers (feel vs contract) and **fold into the same two AS-residual waves the AT plan
already opened (W6 correctness, W7 slipped-ships)**, plus the existing W6 dock-binding-guard
booking which all six lenses independently re-scope.

The headline re-scope, agreed by B4 and B6 from two directions: **the booked "dock
binding-verification guard" (AT.md:168) is under-specified, and the two lenses disagree on its
SHAPE in a productive way** — B6 says elevate it to a *categorical typecheck gate*
(`checkUnknownProps`/`strictTemplates`); B4 says it must be an *a11y contract test*. C4's
reconciliation: **they are complementary, not competing — ship BOTH** (the typecheck gate
catches the kebab-prop silent-no-op class library-AND-consumer-wide; the a11y/state-machine
spec catches the binding-and-behaviour class the typechecker can't see). Together they finally
land the booked-but-vague guard as two concrete, fail-closed gates.

**Net AT delta C4 proposes:** no new headline wave; no change to AT's 9-wave shape. The dock
work folds as **named slices inside the already-opened W6 (correctness) and W7 (slipped-ships)
waves**, plus **one new W1 design file** (`design/AT.W1b-dock.md`) carrying the hardened dock
contract so the DEV/IMPL boundary has it fully specified — the same discipline the blob slices
got. All file-disjoint from the blob headline (W2–W5); parallelizable.

---

## §1 — The agreement matrix (where the six lenses converge)

The strongest signal is multi-lens convergence. Six findings are flagged INDEPENDENTLY by ≥2
lenses — those are the load-bearing ones; the single-lens findings get a harder ≥2-context bar.

| Finding | B1 | B2 | B3 | B4 | B5 | B6 | Class | C4 disposition |
|---|---|---|---|---|---|---|---|---|
| **F1 — overflow/wrap/containerName collapse** | §4 (HEADLINE) | — | — | (notes) | §2–4 (HEADLINE) | B6-4 (S2) | contract / clean break | **W7-dock-a (binding)** |
| **F2 — dock binding/verification guard under-spec'd** | §9 | §2 gate | §6 | B4-5/§7 | — | B6-1/B6-10 (S1) | gate / process | **W6-dock-a + W6-dock-b (binding)** |
| **F3 — DockGroup/`/dock-group` doc-rot** | §7 | §6 | — | — | — | B6-7 (S3) | stale doc | **W7-dock-c ι-sweep (binding)** |
| **F4 — rail ARIA wrong vocabulary** | — | §2 (D-RAIL-2) | — | B4-1 (MAJOR) | — | (notes) | a11y / clean break | **W6-dock-b a11y contract (binding)** |
| **F5 — press-scale 0.92 vs 0.96 canon** | §5 | — | (5.x) | — | — | — | correctness | **W7-dock-b (binding, with vocab)** |
| **F6 — rail focus-ring / forced-colors gap** | — | §4.5 | — | B4-2/B4-3 (MAJOR) | — | — | a11y / WCAG fail | **W6-dock-b (binding)** |
| **F7 — VT singleton race + flag lifecycle** | — | §3 (D-LAYER-2) | §4 | (notes) | — | B6-2/B6-3 (S2) | correctness / latent defect | **W6-dock-c (binding)** |
| **F8 — spring-curve engine divergence (VT≠FLIP)** | — | (§3 hints) | B3-1 (HIGH) | — | — | (notes) | correctness / quiet-wrong path | **W6-dock-c (binding)** |
| **F9 — proximity magnification** | §3 (HEADLINE) | — | KILL (5.4) | — | — | — | design / DISPUTED | **BOOK (§3 below)** |
| **F10 — traveling rail indicator** | — | §1 (HEADLINE) | — | — | — | — | design / single-lens | **W7-dock-b IF ≥2 ctx, else BOOK** |
| **F11 — glass the icon hover (not flat fill)** | §6 | — | — | — | — | — | design / single-lens | **W7-dock-b (token-only, low risk)** |
| **F12 — spring micro-feedback (press/chevron)** | — | — | B3-2 (MED) | — | — | — | design / single-lens | **W7-dock-b (token-only)** |
| **F13 — stagger the expand** | §8 | — | — | — | — | — | delight / single-lens | **BOOK** |
| **F14 — pane VT participants + directional slide** | — | §3 (D-LAYER-1) | BOOK (5.3) | — | — | — | design / thin | **BOOK** |
| **F15 — scroll-mode edge-fade (scroll-driven CSS)** | — | — | — | — | §5.2 (stretch) | — | polish / stretch | **W7-dock-a stretch (non-binding)** |
| **F16 — `interpolate-size` future FLIP-killer** | — | — | — | — | §5.4 | — | named-forward | **RECORD only** |

**The two crispest CONFLICTS** (resolved in §3) are F9 (B1 wants magnification, B3 KILLs it)
and the SHAPE of F2 (B6 typecheck vs B4 a11y-test). Both resolve cleanly.

---

## §2 — The hardened dock waves (the C4 deliverable)

C4 binds the convergent findings into **six named slices across the two AS-residual waves the
plan already opened** (W6 correctness, W7 slipped-ships), plus one W1 design file. Each slice is
file-disjoint from the blob headline (W2–W5). The slice names mirror B3/B6's `W6-dock-*` /
`W7-dock-*` lane convention so the wave numbering stays at 9.

### §2.1 — W6-dock-a (S1, BINDING) — categorical kebab-prop guard

**Source:** B6-1 (the keystone), seconded by every lens that touched the silent-no-op class
(B1 §9, B2 §2-gate, B3 §6, B4 §7).

**The move (verified at HEAD).** `grep -rn "vueCompilerOptions\|strictTemplates\|checkUnknownProps"
tsconfig*.json` returns NOTHING — confirmed (three tsconfigs: `tsconfig.json`, `tsconfig.build.json`,
`tsconfig.src.json`, none set strictness). glass-ui runs `vue-tsc --noEmit` with the DEFAULT loose
template check, which is why `scroll-on-overflow` (the W7 seed, fixed in `00bd5f9`) shipped dead.
Enable `vueCompilerOptions.checkUnknownProps` (the narrowest knob that catches the dock class),
fix the fallout, then graduate toward `strictTemplates`.

**Why this SUPERSEDES the booked demo-mount guard, not duplicates it.** The booking
(AT.md:168, L1 §W7-a) was a *point* gate: "a demo-mount/Playwright spec that every chrome dock
ACTUALLY carries `.dock-scroll-{x,y}` at runtime" — it catches the two known sites by
enumeration. `checkUnknownProps` is the *categorical* gate: the next `scroll-on-overflow`-class
typo on ANY component (dock or not, library or consumer-side via the published `.d.ts`) is a red
typecheck, for free, forever. **C4 reconciles the apparent overlap:** the demo-mount spec is NOT
abandoned — it folds into W6-dock-b's state-machine/a11y spec (which mounts the dock and asserts
real runtime DOM), but the *guard* against the silent-no-op CLASS is the typecheck, not the
enumerated mount.

**Caveat folded (B6-1, knowledge):** enabling on a 2415-module repo surfaces a backlog of
intentional loose-attr sites (`$attrs` spread, third-party components). The honest sequencing is
`checkUnknownProps` first → fix → graduate to `strictTemplates`. This is a deliberate W6
sub-slice, not a one-line flip.

**Hard gate:** `proof:strict-templates` — `npm run typecheck` runs with
`vueCompilerOptions.checkUnknownProps: true`; a fixture `<GlassDock bogus-prop>` is a RED
typecheck (fails closed). `rg "checkUnknownProps" tsconfig*.json` resolves to `true`. The
`scroll-on-overflow` class can never silently ship again, library OR consumer-side.

### §2.2 — W6-dock-b (S1/MAJOR, BINDING) — the dock contract test (a11y + state machine)

**Source:** B4 (B4-1 rail ARIA, B4-2 focus-ring, B4-3 forced-colors, B4-5 presentational-root
contract) + B6-10 (state-machine 0% coverage) + B2 (D-RAIL-2 segmented ARIA) + B1 (§9
four-state conformance). **This is where B4 and B6 converge on the SAME wave from two angles:**
B4 wants an a11y CONTRACT test; B6-10 wants a state-machine BEHAVIOUR test. They are the same
spec — a `vitest` + `@vue/test-utils` + happy-dom dock-contract test that asserts both the ARIA
contract AND the state-machine behaviour, fail-closed.

**The contract surface (verified at HEAD):**
- **Rail ARIA (F4).** `DockLayerGroup.vue:96` is `<nav>`, `:109` is `:aria-pressed`, `.dock-layer-tab`
  carries no focus-visible rule. **B4 and B2 AGREE on the diagnosis** (the rail is panel
  navigation built with toggle semantics — violating glass-ui's own §"Tabs vs ToggleGroup")
  but **DISAGREE on the target role** — resolved in §3.2.
- **Focus-ring (F6).** Verified: `grep "dock-layer-tab.*focus" dock.css` = 0; the shared
  focus-visible group (`dock.css:32-35`) lists the four primary controls but OMITS
  `.dock-layer-tab` — a keyboard user on the rail gets no focus indicator (WCAG 2.4.7 fail).
  And the forced-colors outline restoration (`utilities.css:1032-1040`) covers
  `.focus-ring`/`.glass-btn`/`.interactive-item`/`.input-pill` but NONE of the dock controls —
  so every dock control's focus ring vanishes under Windows High Contrast (a second 2.4.7 fail
  only visible in HCM). Both are one comma-group addition each.
- **State machine (B6-10).** Verified: 3 dock test files, all structural; `grep "useDockState"
  __tests__/` = 0 — the hover→collapse timer, the `keepOpen`/`release` ref-count, the click-away
  listener, the teleport-escape (`isTeleportedTarget` — the fourier-regression root cause), the
  `alwaysExpanded` watch, the grace period have **0% behavioural coverage**. This is the REAL
  binding-verification gate (B6-10's framing): it catches the fourier-class silent no-op
  (`inject("dockKeepOpen")` shipped dead because no test exercised the dock-held path through a
  real slider descendant) that the typecheck (W6-dock-a) cannot.
- **Presentational-root contract (B4-5).** The AM forms-a11y aria contract ("no `aria-expanded`
  on the role-free root; it belongs on the trigger child") is prose in CLAUDE.md, gated nowhere,
  and ships no exemplar. The test pins it; the demo story ships the canonical disclosure trigger.

**Hard gate (binding, the booked guard finally lands):** a `vitest`+happy-dom dock-contract spec
(`DockLayerGroup.a11y.test.ts` + `useDockState.behaviour.test.ts`) asserting, fail-closed:
(1) the rail emits the corrected role + `aria-current`/`aria-selected` (NOT `aria-pressed`) +
`aria-controls` matching each pane (per §3.2's resolved role); (2) `.dock-layer-tab` and every
dock control resolves a non-empty `:focus-visible` rule (structural snapshot of the selector
group); (3) the dock ROOT carries NO `role` and NO `aria-expanded` (the AM contract, finally
gated); (4) the state machine: `collapsed→hover→collapsed` with fake-timers, `keepOpen()`
suppresses the timer, `release()` re-arms with the grace period, click-away collapses even with
`keepOpenCount>0`, `isTeleportedTarget` returns the dock-held branch for a
`[data-glass-dock-owner=<id>]` target (the fourier root cause), a focused descendant keeps the
dock open (the focus-keep regression guard, B4 §8). `useDockState` behavioural coverage > 0%.

### §2.3 — W6-dock-c (S2, BINDING) — VT-fork reconcile (singleton race + spring divergence + flag lifecycle)

**Source:** B6-2 (singleton race), B6-3 (flag lifecycle dead on VT path), B3-1 (spring-curve
divergence — the HIGH-severity quiet-wrong path). **This is the cluster of REAL latent defects
the AQ.W6 VT-fork left** — all three are "the design intent silently did not land," the exact
class AT.W6 exists to fold ("the R4/R6 quiet-wrong paths," AT.md:150).

**The three defects (verified at HEAD):**
- **F8 spring divergence (B3-1, HIGH).** Verified: `--vt-ease: var(--ease-apple-spring)`
  (`tokens.css:1240`) = cubic-bezier `(0.175,0.885,0.32,1.275)` (`:176`); the
  `::view-transition-group(.gl-dock-layer)` recipe (`view-transition.css:53-55`) consumes
  `--vt-ease`; but the FLIP path animates `width`/`height` with `--dock-motion-resize` =
  `--spring-snappy` (the real iOS `linear()` spring, `:159`). **Two different curves** — the
  cubic-bezier overshoots `~+27.5%` terminally and late, the `linear()` spring micro-overshoots
  `+6.8%` and settles by ~44%. So the dock's identity morph FEELS DIFFERENT on VT-engines
  (Chromium+Safari) vs FLIP-engines (Firefox) — directly contradicting the AQ.W6 design doc's
  own stated mapping (`AQ/design/W1.3-motion-anchor.md:580-581`). The fix is surgical and
  dock-LOCAL: mint `--dock-resize-spring: var(--spring-snappy)`, point BOTH `--dock-motion-resize`
  and a dock-scoped `::view-transition-group(.gl-dock-layer)` `animation-timing-function` at it.
  **Do NOT global-re-point `--vt-ease`** (other VT consumers + the J.W5 re-rank read it — a
  cross-consumer blast). One shared curve token, one home.
- **F7a singleton race (B6-2, S2).** The View Transitions API is a per-DOCUMENT singleton; a
  second `startViewTransition` while one is active SKIPS the first (MDN/Chrome confirmed). A
  page routinely mounts MULTIPLE docks (the demo alone: CategoryRail + StoryPager +
  dock-with-slider's 3-4 docks; bbnf-buddy: 4 docks simultaneously). Overlapping swaps mutually
  skip — one dock's width-morph fast-forwards to its end-state (a visible jump). The FLIP
  fallback has no such coupling (each element pins its own size). B6's recommended gestalt:
  **degrade the dock to the FLIP path; keep the VT fork for `gl-list-item` only** — the dock's
  win from VT is marginal (it crossfades two PRE-STACKED grid layers, which FLIP already does via
  opacity), and the FLIP does the per-element size animation perfectly with no singleton race.
- **F7b flag lifecycle (B6-3, S2).** `markTransitioning()`/`isTransitioning` (the click-away
  suppression window) is keyed off the root's CSS `transitionend` + a `longestTransitionMs(root)`
  timer — but width was removed from the root transition (J.W3.A), so on the VT path the
  suppression window is sized to the SHORTER padding/shadow transition and can CLEAR while the VT
  morph is still mid-flight (a click-away in that gap mis-collapses). The VT path is **untested in
  CI** (happy-dom has no `startViewTransition`, so every existing dock test runs the FLIP
  fallback). If B6-2's "degrade to FLIP" lands, this self-resolves (the flag stays FLIP-keyed as
  designed); otherwise route `isTransitioning` off the VT `finished` promise.

**The reconciliation B3 vs B6 on the VT fork.** B3 (§4) explicitly DECLINES to rip out the VT
path ("the box-size morph via VT is genuinely nice"); B6-2 RECOMMENDS degrading the dock to FLIP
entirely. **C4 resolves toward B6-2's degrade** for the correctness wins (it kills BOTH the
singleton race AND the flag-lifecycle bug AND collapses the spring divergence to one path), with
B3's caveat honored: the VT substrate is NOT removed from glass-ui — it stays for `gl-list-item`
(where it earns its keep on heterogeneous-DOM crossfade) and remains available to single-dock
contexts. The decision is a W6 IMPL call gated on a concurrency test; W1 specs both options.

**Hard gate (binding):** (1) `proof:dock-motion-parity` — a CSS-assert that the dock's resize
timing function and `--dock-motion-resize`'s easing resolve to the SAME `--dock-resize-spring`
token; fails closed if they diverge again (the AQ.W6 regression class). (2) a ≥2-dock
concurrency test (stub `startViewTransition` in happy-dom): overlapping swaps both reach their
end-size (no skip fast-forward) — asserting the fork is NOT taken for the dock (or is serialized).
(3) `isTransitioning` tracks the actual morph window (asserted across the stubbed `finished`).
Visual line-item (π protocol): VT-path and FLIP-path morph captured side-by-side, confirm
identical settle.

### §2.4 — W7-dock-a (S2, BINDING) — the overflow-model clean break

**Source:** B5 (the full SOTA + collapsed-prop spec — HEADLINE), B6-4 (the consumer-reach
numbers + the hardened "delete, not collapse" rationale), B1 (§4 — the designer's read siding
with W7's "retire wrap" over L4's softer "additive, zero-risk"). **Three lenses agree the L4
framing under-reads the contradiction.**

**The accretion (verified at HEAD).** `wrap?: boolean` (`GlassDock.vue:18`), `overflow?: "grow"|"scroll"`
(`:70`), `containerName?: string` (`:83`) all coexist. `containerStyle` (`:101-105`) bundles
`overflow: "visible"` INTO the container-name path — so **`containerName` is a smuggled 4th
overflow value** (the act of naming a container is also the act of lifting the clip), B5's
subtlest catch that L4 missed. And `wrap` carries 4-5 coupled behaviours (flex-wrap + `--radius-2xl`
+ viewport-clamp + separator-hide + a `@media(640px)` desktop REVERSAL that undoes them) — the
viewport-coupling a container query exists to kill.

**The consumer-reach numbers (the clean-break justification, verified):** `wrap` on a `<GlassDock>`
= **ZERO** bindings anywhere (demo grep = 0, confirmed; the only constellation reference is a STALE
comment in `bbnf-buddy/DockAnimationTimeline.vue:140`). `containerName` = **ONE** context
(`metric-pill.vue:86`). `overflow="scroll"` = 2 (`CategoryRail`, `AuroraConfigDock`). So `wrap` is
**substrate-without-consumer** (L invariant 8) — B6-4's harder read prevails: **DELETE `wrap`
outright, do not "collapse into an enum"** (there is no consumer to migrate; the clean break costs
0 SFC lines). `containerName` survives at the thin edge but is a genuinely different mechanism (a
CQ subject) — keep it, but STRIP the clip-lift side-effect.

**The B5 vs B6 reconciliation on the enum shape.** B5 proposes `overflow: "grow"|"scroll"|"wrap"|"clip"`
+ a renamed pure `container` (with `wrap` and `clip` as honest enum completions). B6-4 proposes
`overflow: "grow"|"scroll"` ONLY (the live pair) + keep `containerName` (renamed-or-not) with a
mutual-exclusion dev-warn — because `wrap` has zero consumers, minting `overflow:"wrap"` would be
re-introducing the same substrate-without-consumer under a new name. **C4 resolves toward B6-4's
tighter shape with one B5 refinement:** the enum is `overflow: "grow" | "scroll"` (the 2 live
values); `wrap` and its CSS (~60 LOC incl. the `@media(640px)` reversal) are DELETED, not
re-minted; `containerName`'s clip side-effect is stripped (the clip-lift becomes the documented
behaviour of the default `grow` mode, so `metric-pill` migrates with zero behaviour change); a
dev-warn fires on the now-incoherent `containerName` + `overflow="scroll"` combination (the inline
`overflow:visible` would silently kill the scroll cap). B5's `"clip"` member is BOOKED (it's the
honest completion of the set but has no consumer today — minting it now is the same overfit trap
as `"wrap"`). This keeps the surface at exactly the live consumer reach: clean break, no
re-minted speculative substrate.

**Hard gate (binding):** `rg "\.dock-wrap\b" src/ = 0` AND `rg "wrap[?:]" GlassDock.vue = 0` (the
prop + class + CSS gone); `overflow` is the sole overflow prop (`"grow"|"scroll"`); `containerStyle`
sets ONLY `container-type`/`container-name` (`rg "overflow.*visible" GlassDock.vue` in containerStyle
= 0); a unit asserts `containerName` + `overflow="scroll"` warns in dev; `rg "@media \(min-width"
dock.css` returns 0 hits in any wrap path (the 640px viewport coupling deleted); the
`useLayerTransition` `dim`-parametrization + `useDockState` are UNTOUCHED (B5 G7 — the axis core
is the good part); `MIGRATION.md` carries the `wrap` retirement + (if renamed) the `containerName`
row; the `scroll-overflow.test.ts` stays green. **No silent kebab regression** — now enforced
categorically by W6-dock-a.

**Stretch (F15, non-binding):** the `@supports (animation-timeline: scroll())`-gated scroll-driven
edge-fade on `overflow="scroll"` (B5 §5.2) — net-new polish, dependency-free, graceful no-op on
Safari. Flag as a W7-dock-a stretch; do not block the wave on it.

### §2.5 — W7-dock-b (correctness + design polish, BINDING for the correctness items)

**Source:** B1 (§5 press-scale, §6 glass-hover), B3 (B3-2 spring micro-feedback), B2 (§1 rail
indicator — conditional). This slice carries the **unconditionally-good token-first refinements**
that ride the W7 control-size-vocabulary slice the plan already opened (AT.md:151,172).

- **F5 press-scale canon (B1 §5, BINDING — correctness).** Verified intent: `--scale-press-dock:
  0.92` vs the library canon `--scale-press: 0.96`/`--scale-press-btn: 0.97`, with NO documented
  reason — the dock presses 4-5% harder than every Button beside it. **B1's recommended (A):**
  retune to `0.96` (or alias `--scale-press`); clean break, system-consistent press weight. This
  folds into the W7 control-size-vocab slice (which already touches dock+Button+Select sizing).
  Gate: `rg 'scale-press-dock' tokens.css` resolves to `0.96`/`var(--scale-press)` OR carries a
  documented `/* reason: … */`; the dock-contract test (W6-dock-b) PINS the press constant so a
  future drift back to 0.92 fails closed.
- **F11 glass the icon hover (B1 §6, BINDING — token-only).** The chassis is glass; the icon
  buttons are flat (`background: transparent` → flat `--muted` fill on hover). The library OWNS
  the Liquid-Glass affordance vocabulary (`--glass-highlight`, `--glass-specular`,
  `--border-hairline`) and already applies it via `data-tier="secondary"` — proving the recipe
  composes. Retune the hover from the flat `--muted` fill to the quiet-glass recipe. **Token-only,
  no new tokens** — unconditionally good, cheap, low-risk. Gate: the hover recipe references
  `--glass-highlight`/`--card`, not flat `--muted`; `rg` the diff for `--dock-` token ADDITIONS =
  0; a paired-π `baseline|close/` capture confirms hover + active remain DISTINCT (B1 §6.2's
  active-legibility line-item — the one thing only a visual confirmation settles).
- **F12 spring micro-feedback (B3-2, BINDING — token-only).** The hover-scale/press-scale/chevron-
  rotate transition on `--dock-motion-fast` (cubic-bezier); re-point the `scale`/`rotate`
  components only onto `--dock-motion-press: var(--duration-fast) var(--spring-snappy)` — the curve
  ALREADY exists. **Critical guard (B3 §5.7):** discrete-feedback ONLY (scale/rotate); NEVER the
  surface-tier fades (`[data-held]`, `:has([data-state=open])`) — those are intentionally fast
  Béziers (a held-cursor cue, not a state change; spring overshoot would read as a glitch). Gate:
  the named controls' `scale`/`rotate` transitions use `--dock-motion-press`; the `[data-held]`
  fade still uses `--duration-fast var(--ease-standard)` (no blanket-spring).
- **F10 traveling rail indicator (B2 §1, CONDITIONAL).** B2's design HEADLINE — a single shared
  `.dock-layer-rail-indicator` that SLIDES from old tab to new (the segmented-switcher signature
  affordance) replacing the per-button background fade. This is genuinely good design and
  file-adjacent to the W6-dock-b rail-ARIA rework. **But it is a SINGLE-lens design headline** (only
  B2 raised it; B1/B3/B4/B5/B6 did not). Per the no-overfitting bar it needs ≥2 distinct consumer
  contexts. The rail itself clears the bar (DockLayerGroup is consumed by demo + speedtest +
  value.js per B6 §5). The INDICATOR is a refinement of an already-≥2 surface, not new substrate —
  so it clears IF the W7 dock-design slice is wanted. **C4 disposition: fold the indicator into
  W7-dock-b IF the rail is being reworked anyway (it is, for W6-dock-b's ARIA), since landing the
  ARIA rework AND the indicator in one rail pass avoids a double-touch; else BOOK.** Gate (if
  folded): the active mark TRAVELS (one indicator, not two fades); axis-aware (vertical→Y,
  horizontal→X, keyed off the existing `dim`); PRM snaps (no travel); off the FLIP/VT box path
  (always transform — B2 §3 D-LAYER-2's interruptibility argument); the per-button `.is-active`
  background retired but the `color: --primary` recolor kept (WCAG non-color-only, §3.2).

---

## §3 — The conflicts, resolved

### §3.1 — F9 proximity magnification: B1 (HEADLINE) vs B3 (KILL)

The sharpest conflict. B1 §3 names magnification "THE thing that makes a row-of-icons read as a
dock" and proposes `useDockMagnify` as the AT dock-design headline. B3 §5.4 KILLs it: "the dock is
a control dock, not a launcher; uniform hover-scale is the correct register; adding distance-
falloff magnification would be overfit substrate with no consumer."

**C4 resolution: BOOK, siding substantially with B3, but record B1's gate-ready spec.** The
deciding axis is the no-overfitting bar, and B1 itself concedes the honest read (§3.3): "today
this is a 1-firm-consumer (the demo) feature." Magnification has **zero firm consumer contexts**
at HEAD — no dock in the constellation (demo, bbnf-buddy, speedtest, value.js) is an
app-launcher-style dock that wants neighbor-falloff magnification; they are all control/tool docks
where B3's "uniform hover-scale is the correct register" holds. Shipping it demo-led (B1's exit i)
would manufacture a consumer the same way the plan refuses to manufacture a goo-blob consumer
(DEC-AT-5 ships the demo and states the motive honestly — but goo-blob has the D1-shader +
inv-K-3-seam VALUE behind its thin breadth; magnification has only the demo). **The asymmetry:
goo-blob's thin breadth is backed by a substrate-transposition payoff; magnification's thin
breadth is backed by nothing but the demo.** So it does NOT clear the bar. BOOK it until a 2nd
app-chrome consumer converges; B1's §3.2 spec (`--dock-magnify-max`, `--dock-magnify-radius`, the
Gaussian falloff, the PRM-zeroes gate, the off-default-path byte-identity) is the ready
implementation when that consumer lands. This is the cleaner of B1's own two exits (§3.3-ii) and
the one B1 itself recommended for the core sequence.

### §3.2 — F4 rail target role: B2/B1 (`aria-current` + list) vs B4 (`aria-selected` + tablist)

B2 §2 (D-RAIL-2) and B1 argue the rail should be a Primer-style "list of buttons" with
`aria-current="true"` and NO arrow-key roving (each tab independently Tab-reachable). B4 §2 (B4-1)
argues the rail is the canonical APG Tabs case — `role="tablist"`/`role="tab"`/`aria-selected` +
`aria-controls` + roving tabindex + arrow-key navigation.

**Both cite real SOTA and both are internally consistent — the conflict is a genuine design
fork, not an error.** B2 cites Primer's SegmentedControl ("a list of buttons… `aria-current`, NOT
`aria-pressed`; arrow keys don't move selection"); B4 cites the APG Tabs pattern ("`aria-selected`,
`aria-controls`, roving tabindex, Up/Down navigation"). They differ on whether the rail is a
*segmented control* (B2) or *tabs* (B4).

**C4 resolution: this is a W1 DESIGN DECISION, not a C4 mandate — but C4 names the deciding
criterion and the recommended default.** The deciding axis: does the rail reveal *distinct content
panels* (Tabs) or *toggle a shared surface* (segmented)? Per glass-ui's OWN canon (CLAUDE.md
§"Tabs vs ToggleGroup"): "Reach for `<Tabs>` for mutually-exclusive PANEL navigation — each tab
reveals a distinct content panel." The DockLayer system is **exactly that** — each rail tab
reveals a distinct `<DockLayer>` pane, exactly one active (B4's read). So **B4's APG-Tabs model is
the canon-consistent target**, AND it strictly dominates on keyboard ergonomics (one Tab-stop +
arrow roving vs N Tab-stops). **BUT** B4 itself (§10 item 1) recommends adopting reka-ui
`TabsRoot/List/Trigger/Content` rather than hand-rolling the roving model — "a hand-rolled roving
model is exactly the fourth-copy-of-boilerplate the AT WebGL transposition rejects." That is the
right gestalt and it resolves the B2-vs-B4 tension elegantly: **adopt reka-ui Tabs for the rail**
(free roving tabindex + arrow model + `aria-selected`/`aria-controls`, matching the dock's existing
reka-ui composition idiom for `DockSelectTrigger`/`DockDropdownTrigger`), which gives B4's correct
contract for free; B2's *visual* contribution (the traveling indicator, F10) layers on top of the
reka-ui Tabs as the active-mark.

**The one B2 point C4 PRESERVES against B4:** B2 §2 correctly flags that `<nav>` over-claims a
document landmark for a widget-local switcher. Whichever role wins, the `<nav>` wrapper must go
(reka-ui's `TabsList` is `role="tablist"`, not `<nav>` — so adopting reka-ui resolves this too).
**W1 decision point (binding for W6-dock-b):** reka-ui Tabs vs hand-rolled; C4 recommends reka-ui.
B4's §6 standalone-rail coarse-floor residual (a `<DockLayerGroup>` outside a `<GlassDock>` falls
to 28px, below 44px) folds into whichever path lands.

### §3.3 — The SHAPE of the binding-guard: B6 (typecheck) vs B4 (a11y test)

Resolved in §2.1/§2.2: **complementary, ship both.** B6's typecheck gate (W6-dock-a) catches the
kebab-prop silent-no-op CLASS categorically; B4's a11y/state-machine spec (W6-dock-b) catches the
binding-AND-behaviour class the typechecker can't see (the `data-tier` string-compare seam, the
`isTeleportedTarget` DI path, the ARIA contract). Neither subsumes the other. The booked-but-vague
"dock binding-verification guard" (AT.md:168) lands as these two concrete gates.

---

## §4 — What BOOKs (does not clear the bar) and why

Held out of the AT dock waves, with the converging-consumer condition that graduates each:

- **F9 magnification (B1 §3).** BOOK — 0 firm consumer contexts; no substrate-payoff behind the
  thin breadth (§3.1). Graduates at a 2nd app-launcher-dock consumer. B1's spec is ready.
- **F13 stagger the expand (B1 §8).** BOOK — B1 itself calls it "the weakest of the four design
  slices… benefits every dock but no consumer has asked." Pure delight; reuses `useStaggerReveal`
  (overfitting-clean) so it's cheap WHEN wanted, but no consumer pull today.
- **F14 pane VT participants + directional slide (B2 §3 D-LAYER-1, B3 §5.3).** BOOK — B3 5.3
  explicitly BOOKs it ("DockLayerGroup consumers are thin; a slide + size-morph can fight; needs a
  visual proof, not a blind add"); B2 proposes it but it's single-lens design. Graduates at a 2nd
  firm DockLayerGroup consumer + a visual proof. Note: B2's `data-vt-native` redundant-crossfade
  SUPPRESSION (the latent double-animation) is worth folding into W6-dock-c IF the dock keeps the
  VT path; if B6-2's "degrade to FLIP" wins, the double-crossfade self-resolves.
- **B5 `overflow: "clip"` enum member.** BOOK — the honest completion of the set but 0 consumers;
  minting it now is the same overfit trap as re-minting `wrap` (§2.4).
- **B6-9 typed `tier?: "primary"|"secondary"` prop on DockTabButton.** BOOK — closes the `data-tier`
  string-compare seam but it's a 1-context API change; the W7 control-vocab slice MAY want it, else
  BOOK. (`strictTemplates` does NOT catch `data-*` typos — they're valid HTML attrs — so this seam
  survives W6-dock-a; it's the next-most-likely silent surface, recorded.)
- **F16 `interpolate-size` (B5 §5.4).** RECORD only (not even BOOK as an action) — Chromium-only as
  of 2025; the named-forward future FLIP-fallback replacement when it reaches Baseline. The VT fork
  already covers VT-capable engines; record, don't bake.
- **B6-8 FLIP resize-mid-transition edge.** Note-only (code comment) — edge, not shipped; if
  W6-dock-c's "degrade to FLIP" keeps the dock on FLIP, document it as a known edge.

---

## §5 — The proposed AT sequence slotting (no wave-count change)

C4's strong recommendation: **fold all dock work into the already-opened W6/W7 as named slices —
do NOT open a new numbered wave** (B3's W4.5 / B4's W6.5 alternatives inflate AT's shape; B1/B5/B6
all recommend folding into W6/W7). AT stays at 9 waves. The DEV/IMPL boundary (W1) gains the dock
design file so the contract is specified before any src lands.

| AT wave | Existing scope | + C4 dock slices | Why here |
|---|---|---|---|
| **W1** (DEV boundary) | blob design slices | **+`design/AT.W1b-dock.md`** — the hardened dock contract: §2.4 overflow collapse + §3.2 rail-role decision (reka-ui Tabs recommended) + §2.2 a11y contract + §2.3 VT-fork-vs-FLIP decision + §2.1 strictness sequencing. Cites B1–B6. | the dock collapse + rail rework + VT reconcile are bigger than one-liners; spec them at the boundary like the blob slices |
| **W6** (correctness + gate-fleet) | proof:vueuse-free-root, peer-optional, etc. | **W6-dock-a** (strictTemplates), **W6-dock-b** (a11y + state-machine contract test), **W6-dock-c** (VT-fork reconcile: spring-parity + singleton race + flag lifecycle) | all are correctness/gate fixes; W6 IS "the R4/R6 quiet-wrong paths + the dock binding-guard" — the VT divergence + the under-spec'd guard sit natively here; file-disjoint from blob W2–W5 |
| **W7** (slipped ships + contract) | Fraunces, control-size-vocab, π/ι | **W7-dock-a** (overflow clean break + scroll-fade stretch), **W7-dock-b** (press-canon + glass-hover + spring-micro-feedback + conditional rail-indicator), **W7-dock-c** (ι doc-rot: `dock-group`/`@lucide/vue`) | W7 already touches the dock (overflow) + Button/Select vocab + the ι sweep; the dock-design polish + doc-rot are file-adjacent |

**Sequencing within the waves (B2/B4/B6 agree):** W6-dock-a (strictness) lands FIRST (it's the
keystone enforcement that makes the subsequent clean breaks safe). W6-dock-b's rail-ARIA rework
and W7-dock-a's overflow collapse + W7-dock-b's rail-indicator all touch `GlassDock.vue` /
`DockLayerGroup.vue` — **land them in ONE coherent dock pass** to avoid a double-touch (B4 §10's
explicit caveat: "land W6.5's `GlassDock.vue` aria edits and W7's prop-collapse in one dock pass").
C4 honors this by co-locating: the W6 dock pass does strictness + contract test + VT reconcile;
the W7 dock pass does overflow + design-polish + doc-rot — but if the orchestrator prefers, the
template-touching slices (rail ARIA, overflow, indicator) can be a single atomic dock-template
commit spanning the W6/W7 boundary.

**No-regression line (B2 §5 + B4 §5 — both flag it):** every dock slice MUST preserve the
inert+pointer-events+visibility triad on inactive panes (`DockLayer.vue:50` `:inert` +
`dock.css:405-446` the `elementFromPoint` hit-test fix) and the verified-correct PRM degradation
(both motion paths). State it in each gate.

---

## §6 — Overfitting note (for the W8 close audit)

B6 §5's prop-level tally is the load-bearing addition to the W8 overfitting audit: **every dock
SUBCOMPONENT clears ≥2 distinct consumer contexts decisively (4 repos), but the accretion is at
the PROP level** (`wrap` = 0 contexts, `containerName` = 1). The W8 overfitting re-run must tally
PROPS, not just components — the dock proves prop-accretion hides under component-legitimacy. After
the C4 waves: `wrap` deleted (0→gone), `containerName` survives at its 1 real context with the
clip side-effect stripped (a cleaner contract, not new surface), the overflow enum is exactly the
2 live values, magnification/stagger/clip-member/typed-tier all correctly BOOKED against the bar.
No new substrate ships without ≥2 contexts; the only NEW exports are the contract-test fixtures
(demo-private) and the `--dock-resize-spring`/`--dock-motion-press` tokens (token-first, no
public-API surface). inv-16 clean: the speedtest/bbnf-buddy/fourier/value.js dock consumers are
name-forward, unchanged; the `wrap` retirement + any rename go in `MIGRATION.md`, not into
consumers.

---

## §7 — Sources

C4 is a synthesis lens; its sources are the six B-lens audits it folds (all in
`docs/tranches/AT/audit/W0b-B{1..6}-*.md`) plus the HEAD `file:line` re-verifications performed
for this fold:
- `tsconfig{,.build,.src}.json` — `checkUnknownProps`/`strictTemplates` ABSENT (B6-1 confirmed).
- `src/styles/dock.css:25-46` — shared focus-visible group; `.dock-layer-tab` ABSENT (B4-2 confirmed).
- `src/styles/tokens.css:159,176,1240` — `--spring-snappy` linear vs `--vt-ease`=`--ease-apple-spring`
  cubic-bezier (B3-1 confirmed); `src/styles/view-transition.css:53-55` — `gl-dock-layer` consumes `--vt-ease`.
- `src/components/custom/dock/DockLayerGroup.vue:96,105,109` — `<nav>` + `:aria-pressed` (B4-1/B2 confirmed).
- `src/components/custom/dock/GlassDock.vue:18,70,83,101-105,323,330` — the 3-prop accretion +
  `containerStyle` bundling `overflow:visible` (B5/B6-4 confirmed).
- `src/components/custom/dock/__tests__/` — 3 structural test files, 0 reference `useDockState`
  (B6-10's 0% behavioural coverage confirmed).
- `demo/` — 0 `wrap` bindings on `<GlassDock>` (B5/B6-4's zero-consumer confirmed).

The SOTA web citations behind each finding live in their source B-lens (B1 §12 macOS Tahoe /
Gaussian dock; B2 §8 Primer/Motion/patterns.dev; B3 §8 Comeau/MDN-VT/animations.dev; B4 §9
WAI-ARIA APG Tabs/Toolbar/Disclosure; B5 §Sources container-queries/scroll-driven/interpolate-size;
B6 §Sources Vue language-tools strictTemplates / MDN ViewTransition singleton). C4 does not
re-fetch; it relies on the B-lens citations and re-verifies the glass-ui-side `file:line` claims
the dispositions turn on.
