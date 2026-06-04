# AT.W1b design slice — perfecting the dock system

The dock wave spec, synthesizing the six W0b dock lenses — three frontend-design
(B1 dock+icon, B2 layer+rail, B3 animation+slide) and three SOTA-research (B4
interaction+a11y, B5 orientation+overflow, B6 state-audit-adversarial) — through the
C4 reconciliation. Covers every subsystem the brief named: the dock system, the
layer system, horizontal/vertical, the slide system, the icon system, the animation
system, the rail system.

## §0 — Verdict: functionally sound, verification + a11y + motion-parity thin

No lens found a SHIPPED dock bug. The dock chassis (`GlassDock.vue`), the multi-layer
group (`DockLayerGroup.vue`/`DockLayer.vue` — the inert+pointer-events+visibility
triad), the axis-aware FLIP (`useLayerTransition.ts` 202 LOC + `useDockState.ts` 353
LOC), and the verified-correct `prefers-reduced-motion` degradation are SOTA — the one
thing every lens agreed not to touch. The gaps are (a) the verification fabric (the
booked-but-never-built binding guard; the a11y contract is asserted in prose, not
tested), (b) two AQ.W6 VT-fork quiet-wrong motion paths, and (c) accreted props +
doc-rot. The dock is **IN AT** (file-disjoint from the blob graph W2-W5; folds into the
already-open W6/W7 — no successor split, per `audit/W0b-C5`).

## §1 — The slices (all clean breaks, token-first, PRM-gated)

### W6-dock-a — `proof:strict-templates` (the keystone; B6-1/C2-6)

The W7 silent-no-op (`scroll-on-overflow`, a kebab prop the dock didn't declare,
fell through to `$attrs` test-green-but-inert) was booked for a point-spec guard. The
audit found the right altitude: **`checkUnknownProps: true` / `strictTemplates`** is
absent from all three tsconfigs. Enabling it makes `<GlassDock bogus-prop>` a RED
typecheck — closing the silent-no-op binding class for the WHOLE library, not one dock
prop. **Lands first** so the W6/W7 clean breaks are safe.
- **Gate:** `proof:strict-templates` — a known-bad fixture (`<GlassDock data-bogus
  not-a-prop>`) must fail `vue-tsc`; the incremental knob is fail-closed-ordered (C2).

### W6-dock-b — the a11y + state-machine contract test (the concrete content for the booked-abstract guard; B4)

A `vitest` + `@vue/test-utils` contract over the live dock, asserting:
- The rail is `role="tablist"` with `role="tab"` + `aria-selected` (NOT `aria-pressed`)
  + `aria-controls`→`role="tabpanel"` (DEC-AT-9: reka-ui `Tabs` adoption gives this for
  free — APG-Tabs canon, consistent with CLAUDE.md §"Tabs vs ToggleGroup": each layer
  is a distinct panel).
- The single-`tabindex=0` roving invariant; Arrow focus+activate with wrap.
- Non-empty `:focus-visible` on EVERY dock control incl `.dock-layer-tab`; a
  forced-colors ring restoration.
- The presentational root carries NO `role`/`aria-expanded` (finally GATES the AM aria
  contract — `aria-expanded` belongs on the trigger child, per CLAUDE.md §GlassDock aria
  contract).
- A focused descendant keeps the dock open (the keep-dock-open contract, generalized
  from the Slider case).
- **No-regression line:** the inert+pointer-events+visibility triad on inactive layers
  is preserved.

### W6-dock-c — the VT-fork motion-parity reconcile (the AQ.W6 quiet-wrong path; B3)

AQ.W6 forked the dock resize morph: the native View-Transition path runs `--vt-ease`
(a cubic-bezier with ~+27.5% overshoot, no settle) while the FLIP fallback runs
`--spring-snappy` (`linear()`). **An identity morph FEELS different per engine** — a
silent inconsistency. Mint **`--dock-resize-spring: var(--spring-snappy)`**; BOTH paths
consume it (the native VT path emits the `linear()` equivalent, the FLIP path the
spring). Also: `isTransitioning` must track the ACTUAL morph (a ≥2-dock rapid A→B→A
must never queue or skip-fast-forward).
- **Gate:** `proof:dock-motion-parity` — the VT timing-fn ≡ the `--dock-motion-resize`
  easing (one-grep); the concurrency test (rapid re-trigger never queues/skips).

### W7-dock-a — the overflow clean break (B5)

The 3-prop accretion (`GlassDock.vue:18/70/83`): `wrap?: boolean` (→ flex-wrap +
`overflow:visible`), `overflow?: "grow"|"scroll"`, `containerName?: string` (lifts the
`overflow:hidden` clip → `overflow:visible`). All three touch overflow, divergently.
**Collapse to ONE enum `overflow?: "grow" | "wrap" | "scroll"`** (default `"grow"`):
- `wrap` boolean DELETED — 0 consumers (`rg "wrap" demo/ = 0`); not re-minted (clean
  break, no alias — the no-legacy precept).
- `containerName`'s `overflow:visible` clip-lift STRIPPED (the container-query opt-in
  stays a separate, orthogonal concern — it should not silently change the clip).
- The `640px` magic MQ → a `--dock-overflow-bp` token.
- The axis core (`orientation`-derived `dim`, the `.dock-scroll-x/y` mapping) is
  UNTOUCHED.
- **Gate:** `rg "\.dock-wrap\b" src/ = 0`; `rg "wrap" demo/ = 0` (0-consumer confirmed);
  the `640px` MQ gone; the axis FLIP tests stay green.

### W7-dock-b — the design refinements (B1/B2/B3; token-first)

The frontend-design lenses' refinements that cross the bar (ship unconditionally —
token-only, no new surface):
- **Press canon:** `0.92`→`0.96` (match the system press scale) OR document the dock's
  intentional deeper press. One source.
- **Glass icon-hover:** `DockIconButton` hover references `--glass-highlight` (the glass
  specular token) instead of a flat `--muted` fill — coherent with the glass tier.
- **Spring micro-feedback:** a `scale`/`rotate` spring on dock-control activation ONLY —
  NEVER on the surface-tier `[data-held]` fades (those stay token-driven).
- **The sliding rail-indicator:** a single conditional `--dock-rail-indicator-*`
  travelling pill (axis-aware, PRM snaps), retiring the per-button background. B2's
  traveling indicator layers on reka-ui `Tabs` (DEC-AT-9).
- **Gate:** press scale documented/single-source; hover refs `--glass-highlight`; the
  spring is scoped to transform props (a grep guard).

### W7-dock-c — the ι doc-rot sweep (B6)

`proof:doc-consistency`: every CLAUDE.md `custom/<dir>` directory + every cited dep
resolves at HEAD. Catches the `dock-group` drift, the `@lucide/vue` reference rot, the
stale `motion-core.ts:13` `/dock-group` cite.

## §2 — The resolved design conflicts (C4)

- **Magnification** (B1 HEADLINE macOS-dock proximity-swell vs B3 KILL) → **BOOK,
  siding with B3.** 0 firm consumers; unlike goo-blob (thin breadth backed by the D1
  shader + the seam), magnification's thin breadth is backed by nothing but the demo.
  B1's `useDockMagnify` spec is ready when a 2nd app-launcher-dock consumer converges.
- **Rail role** (B2 `aria-current`+`role=list` vs B4 `aria-selected`+tablist) →
  **B4's APG-Tabs is canon** (each layer reveals a distinct panel — CLAUDE.md), resolved
  by **adopting reka-ui `TabsRoot/List/Trigger/Content`** for the rail: free roving
  tabindex + correct ARIA + matches the dock's existing reka-ui idiom (no fourth
  boilerplate copy). B2's travelling indicator layers on top. **A W1 decision point,
  ruled here.**
- **Guard shape** (B6 typecheck vs B4 a11y-test) → **complementary, ship BOTH**
  (W6-dock-a + W6-dock-b).

## §3 — The atomic dock template pass

W6-dock-a (strict-templates enforcement) lands FIRST so the clean breaks typecheck-fail
on regression. The three template-touching slices — the rail ARIA (W6-dock-b's reka-ui
Tabs adoption), the overflow-collapse (W7-dock-a), the rail-indicator (W7-dock-b) — land
as ONE atomic edit set spanning the W6/W7 boundary, to avoid a double-touch of
`GlassDock.vue` / `DockLayerGroup.vue`. The horizontal/vertical axis core, the
layer-group inert triad, and the PRM degradation are preserved verbatim across all
slices (the no-regression invariant every lens agreed on).

## §4 — BOOKed (no bar yet)

magnification (F9, `useDockMagnify` ready) · expand-stagger (F13) · pane-VT directional
slide (F14 — needs a 2nd consumer + visual proof) · `overflow:"clip"` member · typed
`tier` prop. **Record-only:** `interpolate-size` (Baseline-gated). Each carries to its
converging consumer per the binary-substrate invariant.
