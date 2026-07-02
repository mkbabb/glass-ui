# MOTION-crit — adversarial critique of KS-MOTION-DISNEY.md

**Critic: opus (KS-B, lane MOTION). Date: 2026-07-01. HEAD `29f280c8`.**
**Verdict: STRONG spec, two binding correctness holes. Convergence 78/100 — NOT binding-ready until
C1+C2 are resolved.** Every disk citation the spec makes was re-verified on disk and is TRUE (unlike the
KS-A pair, which carried two disk-false claims); the protected set is respected; the DAG is coherent; the
SOTA is current. The block is not sloppiness — it is one over-broad rule (F5.2's floor) that collides with
this lane's OWN press/drag engines, and an inversion-reach claim that overstates what the floor can reach in
a Tailwind-v4 codebase.

---

## Disk re-verification (all TRUE — the spec's factual base is sound)

| claim | disk | verdict |
|---|---|---|
| `DOCK_SPRING = springPreset("dock")` → {0.68,0.64} | `dock/constants.ts:85-88` + `springPresets.ts:101-104` | ✔ (spec reads R6 correctly as the derivation, never "restore {0.32,0.7}") |
| `useElementMorph` ABSENT | `grep -rl` → ∅ | ✔ |
| `asElement` private in cta | `useDockCtaReceive.ts:170` | ✔ |
| three morph leaves 285/349/449L | `wc -l` exact | ✔ |
| press tower 106/222L | exact | ✔ |
| SelectTrigger cartoon-punch chevron :138 | exact | ✔ |
| ConfiguratorLayer `transform var(--duration-fast) var(--spring-snappy)` :203 | exact (chevron at :203; note the panel's `grid-template-rows` reveal at :200 also on `--duration-fast`) | ✔ |
| AccordionTrigger `transition-transform duration-200` :35 | exact | ✔ |
| `--motion-weight:0.618` :172 · `--ease-cartoon-punch` :196 · PRM `:360/:361` | exact | ✔ |
| a11y carve `*:not([data-allow-motion])` transition-property→effects-set !important | `a11y-overrides.css:12-16` | ✔ (mechanism holds — PRM strips transform from the transition set) |
| `detectAbruptSpatial` declRe :539 · `ABRUPT_SPATIAL_PENDING` :387 | exact | ✔ |
| `--glass-ambient-*` LIVE reads in the file 10.5 deletes | `liquid-morph.css:34-36,65-66,70` | ✔ (the KS-GLASS C1 WATCH is REAL; the spec caught it — a strength) |
| `proof-motion-one-clock` books configurator-chevron clock + carries `useSpringPress` in SPRING_DEFAULTS | `:177-182`, `:136` | ✔ (17.4 correctly must drop both) |

Wave-binding: all seven ids (F5.1/F5.2/F5.3/W-SPRING-TIDY/10.5/F8.6/17.4) exist in the cursor
(`EXECUTION-PROGRESS.md:83-87,120,126`); NO self-inserted rows; preconds match; the DAG matches. ✔
Protected set: 4.10 never named; DOCK_SPRING untouched; zero value re-tune. ✔

---

## C1 — MAJOR (BINDING). F5.2's floor CSS-transitions `scale`/`transform` on the very elements whose
`scale`/`transform` the F5.1 JS press/drag engines write per-frame — re-introducing the exact bug
`useLiquidPress` exists to escape.

**The contradiction is internal to this lane.** F5.2 §3.1 mints, at zero specificity, ALWAYS-ON:

```css
:where(button, [role="button"], [role="tab"], [role="slider"], … input, select, textarea) {
    transition-property: transform, scale, translate, rotate;
    transition-timing-function: var(--motion-spatial-ease);   /* --spring-smooth, ~360ms */
    transition-duration: var(--motion-spatial-clock);
}
```

Button IS `<button>` → in the cohort. Button's press (F5.1's own press-tower collapse) writes an **inline
`scale` every rAF frame** via `useLiquidPress.pressStyle` / `useSpringPress` (`useLiquidPress.ts:29` "pressStyle
writes `scale` + the `--press-t` custom property"; `Button.vue:114` `useSpringPress()` → `:style` scale).
With an always-on `transition-property: scale` now covering that element, **every inline scale write triggers
a 360ms CSS transition toward that frame's value** → a heavily-damped CSS lag stacked on top of the JS spring
(spring-on-spring), so the crisp interruptible press turns mushy, and on release the JS snap-to-1 is dragged
out over the floor clock.

This is not a hypothetical — `useLiquidPress.ts:4-9` documents it as the reason the JS path was built:
> "A CSS transition … RESTARTS the scale [on rapid re-press] … so a rapid re-press … RESTARTS the scale …
> the CSS transition [does not honor] the first's momentum."

The JS press was created **specifically to remove a CSS transition from the scale channel.** F5.2 puts one
back — globally, always-on — on the flagship surface (every glass button), and by the same mechanism on
`[role="slider"]` (reka thumb) and the `useDragMorph` consumers (`SegmentedTabs :draggable`, `DockLayerGroup`
pull-to-switch) whose transform/translate is JS-written each frame.

**The self-challenge is blind here.** §3.1 self-challenge (2) covers ONLY specular follow ("those write custom
properties, not transform") and declares victory. The press/drag engines write `transform`/`scale` **directly**
on cohort elements — the case the challenge never asks.

**Required resolution (spec must pick one, not hand-wave):**
- (a) the floor covers a channel set DISJOINT from the JS-driver channels — but press writes `scale`, drag
  writes `translate`, morph writes `transform`, so the disjoint set is nearly empty; OR
- (b) the JS drivers set `transition: none` (or `transition-property: none`) inline on their target while
  engaged (the standard "don't transition a JS-animated property" fix) — a real edit to `useLiquidPress`/
  `useSpringPress`/`useDragMorph`, in F5.1's footprint, that the spec must NAME; OR
- (c) the floor excludes JS-driven elements structurally (`:where(...):not([data-pressing]):not([data-dragging])`
  + the drivers write the attr) — verbose but honest.

Until the spec states the reconcile, F5.2 as written ships a press/drag regression on the most-touched surface
in the library. Axes hit: **obvious-issue-blind** + **inelegant** (a floor that fights its own lane's engines).

## C2 — MAJOR (BINDING). The clobber scope is undercounted: Tailwind `transition*` UTILITY classes — not
just CSS `transition:` colon-shorthands — override the `:where()` floor, so the "alive unless opted out"
inversion reaches a far SMALLER set than the headline claims.

§3.1 self-challenge (1) frames the clobber as `transition:` **shorthands** (the CSS colon form). But in a
Tailwind-v4 codebase the dominant transform-transition vector is the utility classes `transition`,
`transition-transform`, `transition-all` — each of which sets `transition-property` **and** a default
`transition-timing-function` **and** `transition-duration` (Tailwind's 150ms ease-in-out), as a class
(specificity 0,1,0). Those WIN over the `:where()` floor (0,0,0). So:
- The Accordion chevron (`transition-transform duration-200`, AccordionTrigger:35) is **not** fixed by F5.2's
  floor at all — it keeps its flat bezier until F5.3 rewrites the utility. The spec implies the floor is the
  general fix and F5.3 the disclosure-specific one; in fact **F5.2's floor only reaches interactive surfaces
  that transform with NO `transition*` utility authored** — a much smaller cohort than "every interactive
  element."
- Every atom carrying `class="… transition"` or `transition-transform` (common across `ui/`) keeps Tailwind's
  150ms ease-in-out on its transform leg and inherits **zero** weight from the floor.

So "the inversion: alive unless opted out" (§3.1) and gestalt-bar #1 ("everything a finger drives carries
WEIGHT") are **overstated** unless the F5.2 sweep re-authors every `transition*`-utility site on an interactive
element, not merely the CSS `transition:` shorthands. That is a materially larger, and materially different,
sweep than the spec scopes. The row's Fable storybook sweep can DISCOVER these, but the spec must (i) name the
Tailwind-utility clobber explicitly in the self-challenge, and (ii) expand deliverable-3's scope from
"`transition:` shorthands" to "any `transition*` utility on a cohort element," else the executor sweeps the
wrong set and greens a still-flat storybook. Axis: **un-subtle / obvious-issue-blind** (the CSS-cascade
interaction with Tailwind is the load-bearing detail and it is under-modeled).

## C3 — MINOR→MAJOR. `.motion-calm` on the `<Card>` default (`--motion-weight: 0`) fights the shipped
`:pressable` Card press (W-PRESS-UNIFY).

§3.1 makes `<Card>` the explicit `.motion-calm` register (weight 0). But a `<Card :pressable>` (CLAUDE.md
W-PRESS-UNIFY) drives `useLiquidPress` writing `--card-press-t` and WANTS a weighted squish. With the calm
class zeroing `--motion-weight` inheriting to the subtree, the pressable card's squish cap collapses. The spec
must carve: `:pressable` cards are NOT `.motion-calm` (or the pressable variant re-lifts weight). Unstated, it
is a silent regression on a shipped opt-in. Axis: **obvious-issue-blind** (a known sibling contract unmodeled).

## C4 — MINOR. `spawn`/`SpawnConfig` in the F5.1 `MorphChannels` interface is speculative substrate.

§3.2 self-challenge (1) admits the only spawn consumer was the celebration petal, which DELETES at 10.5, then
keeps `spawn?: SpawnConfig` in the shipped interface "reserved-but-absent." A reserved optional key with no
consumer and no engine branch is exactly the J-inv-10 speculative-substrate the tranche forbids elsewhere.
DROP `spawn` from the F5.1 interface and BOOK it (the clean-break discipline the spec applies to everything
else). Keeping it is a small **contrived** blemish on an otherwise minimal API.

## C5 — MINOR. F5.2's floor structurally applies an OVERSHOOTING spring (`--spring-smooth`) to transform on
**exit-direction** changes that lack an authored `<Transition>` override — a P2 (exit-no-overshoot) risk the
spec only manually sweeps, never prevents.

§3.1 self-challenge (3) asserts "the F5.2 sweep asserts no exit inherits an overshooting arrival," but that is
a manual assertion over a structural exposure: any `v-show`/`data-[state=closed]` transform without a wrapping
`<Transition>` recipe now inherits the overshoot floor and can overshoot past gone. The census (F5.3) finds
MISSING transitions; it does not find floor-INTRODUCED exit overshoots. Name the structural guard (exits ride
`--ease-out`; the floor should not cover a closed-state transform) or state that the sweep's exit-arm is
binding and enumerate the exit surfaces at risk.

## C6 — MINOR. W-SPRING-TIDY §5 says "regen … re-tunes zero values" and "adds an emission FLAG" in one breath —
but the protected set names `regen-spring-tokens.mjs` byte-identical. Adding a per-row `emitCss:false` flag IS
a script mechanism edit. The corpus (§7) and the spec (§0.1) already flag Option A to the orchestrator — good —
but the spec should state PRECISELY whether the protected set freezes the SCRIPT bytes or the 6-core-row OUTPUT
bytes. Option A preserves the OUTPUT (the 6 core CSS pairs byte-identical, only 3 DEAD twins removed); if the
protected thing is the script text, Option A needs an explicit fence-lift. Name the interpretation; do not let
"byte-identical" and "adds a flag" sit unreconciled in §5.

## C7 — MINOR. F8.6's "non-authoring judge" is a PROCESS convention, not machine-enforced. §3.4 self-challenge
lists "the non-authoring judge requirement" as one of "two structural counters" to gameability, but the only
machine arm (`edict-verdict-present`) checks axes/telos/restraint/anti-boilerplate/capture-resolves — there is
NO author≠judge check. That is FINE (the spec's own thesis is "the judgment is Fable's, not machine"), but the
self-challenge should call it a convention, not a structural counter. Small over-claim.

---

## Precepts conformance — clean where checked

- **P1 (spring-iff-spatial):** the floor declares SPATIAL longhands only; EFFECTS legs keep their bezier. ✔
  (the correctness hole C1 is not a P1 violation — it's a JS/CSS collision within the spatial group.)
- **P4 (per-spring clock):** `--motion-spatial-clock = var(--spring-smooth-duration)`; the disclosure pair
  carries its own clock; the configurator `--duration-fast` mismatch dies at F5.3. ✔
- **P5/P6 (compositor + PRM):** the a11y carve mechanism verified on disk (strips transform from the PRM
  transition set); `--motion-weight:0` zeroes deformation. ✔ (C1 is orthogonal to PRM.)
- **P7 (one source/clock + 2 off-spine seams):** F5.1 reduces 3 loops→1; off-spine seams not collapsed; 17.4's
  `CANON_PENDING_RECONCILE` bridge for the read-only submodule drift is the correct in-repo answer. ✔
- **Clean breaks / ≥2-consumer:** all holds EXCEPT `spawn` (C4). The wrapper-parity clean-break is well-specified.
- **DOCK_SPRING / 4.10 / no-retune:** ✔ (the §0 re-read of R6 as "derivation + current value frozen, not a
  {0.32,0.7} restore" is the correct disk-true reading and should be preserved verbatim).

## Greenfield loop — genuinely run

§3.1 (4 directions, GOLDEN=(d) with rejection rationale for a/b/c), §3.2 (3 directions), §3.4 (3 directions)
each carry a real self-challenge. The loop is not ceremonial. The GAP is that the §3.1 self-challenge, though
present, is **shallow on the two cases that matter** (C1 JS-transform collision, C2 Tailwind-utility clobber) —
it interrogates specular + shorthands and stops one question short of the press/drag engines and the utility
classes. A genuine fourth self-challenge round on §3.1 would have surfaced both.

## SOTA — current and cited

M3 Expressive (2025-05), WWDC23 10158, Wave (jtrivedi), Josh Comeau `linear()` "hits a wall", NN/g overuse
warning — all real, current, and correctly attributed with live URLs. The two-tier CSS-floor/JS-refinement law
is the correct read of the Comeau finding. No stale or invented SOTA. ✔

---

## What must change before binding (ranked)

1. **C1 — reconcile F5.2's floor with F5.1's JS press/drag channels.** Pick (a)/(b)/(c); name the exact
   channel exclusion or the `transition:none`-while-engaged edit. Non-negotiable — as written it regresses
   every glass button press.
2. **C2 — expand the clobber scope to Tailwind `transition*` utilities** in the §3.1 self-challenge AND
   deliverable-3; correct the "alive unless opted out" reach claim to "alive unless a `transition*` utility or
   `.motion-calm` opts out."
3. **C3 — carve `:pressable` Card out of the `.motion-calm` default.**
4. **C4 — drop `spawn` from the shipped interface; book it.**
5. **C5 — state the structural exit-overshoot guard (or bind the sweep's exit-arm + enumerate).**
6. **C6/C7 — precision: name the protected-set-scope interpretation for the `emitCss` flag; downgrade
   "non-authoring judge" from structural to convention.**

C1 and C2 are the two that keep this below 90. Everything else is polish on a spec that is research-sound,
disk-accurate, and protected-set-clean — the strongest factual base of the KS series so far. Fix the floor's
collision with its own engines and the reach claim, and this is binding-ready.
