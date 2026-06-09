# PROTO-adaptive-glass — RED-TEAM hardening of AX.W55 (adaptive-glass-over-light)

**Verdict: WEAK.** The spec is well-researched, six RED witnesses all source-confirm, and the
SOTA grounding (iOS-26/27 luminance-switch / local-darken / AA-clamp) is correct. But the
*mechanism* it prescribes — `@container style(--glass-backdrop: light)` re-pointing
`--glass-tint-strength` + `--glass-tint-source` — has THREE falsifiable defects that, unaddressed,
ship a wave that passes its source gate while either failing to darken the actual surface, breaking
the translucency-floor goal, or silently skipping the binding live close. This is the exact
green-source-over-broken-render class the AX cardinal lesson exists to stop.

HEAD verified at `89edffc`. All file:line probes below are live-true.

---

## What the spec gets RIGHT (confirmed, not challenged)

- **All six RED witnesses source-confirm.** `grep glass-backdrop src/` = NONE; `grep contrast-color
  src/` = NONE; `grep glass-tint-ink src/` = NONE; `tokens.css:838-839` = `--glass-tint-source:
  var(--card)` / `--glass-tint-strength: 0%` (zero-delta); `dock.css:146` = flat
  `background: var(--glass-bg-dock, var(--glass-bg-resting))` with NO oklab tint wrapper;
  `tokens.css:757` = `--dock-fg-on-aurora: var(--foreground)` (push twin); `glass.css:730-746` +
  `:749-756` = per-rung opacity clobbers; `glass.css:142` = `plus-lighter` (lightener only). The
  diagnosis is sound.
- **The dock-off-the-seam finding (witness 2) is real and is the headline.** The five `.glass-*`
  rungs (`glass.css:220,240,251,267,278`) + `.glass-material` (`:380`) DO compose
  `color-mix(in oklab, …, var(--glass-tint-source) var(--glass-tint-strength))`; the dock shell
  (`dock.css:146`), chassis (`dock.css:675` reading `--glass-bg-chassis`), `[data-held]`
  (`dock.css:767`), `:has([data-state=open])` (`dock.css:780`), and the morph-root interp
  (`dock.css:504-510`, in-srgb) do NOT. The G2 surface is genuinely off the seam.
- **The `@container style()` precedent is real** (`utilities.css:537,543`, the density cascade).
- **W36-disjoint, W52-prereq, oklab-not-srgb-family** scoping is all correct.

The diagnosis is not where this breaks. The PRESCRIBED FIX is.

---

## CHALLENGE 1 (BREAKS the mechanism) — the `@container style()` self-query trap: a rung CANNOT read a backdrop bucket set on ITS OWN ancestor and have that lift the strength the SAME rung's `background` consumes, unless the bucket token sits STRICTLY ABOVE the rung in the tree AND the rung is the descendant the block re-targets

The density precedent the spec copies (`utilities.css:537-549`) has a specific, load-bearing shape:

```css
@container style(--density: spacious) {
    .metric-pill.metric-badge--label-stacked { --metric-badge-padding-block-stacked: …; }
}
```

The QUERY (`--density: spacious`) reads from the **nearest ancestor style-container** of the
matched element. The matched element is a DESCENDANT `.metric-pill`. The host sets `--density` on a
**wrapping** element; the `.metric-pill` is inside it; the block re-sets a DIFFERENT custom prop
(`--metric-badge-padding-*`) on that inner pill. Two distinct props, ancestor-sets-A /
descendant-reads-B. **That works because the query token and the re-set token are different props on
different elements.**

W55's plan (`§Scope` fold 2, `FileBounds` glass.css row) is:

```css
@container style(--glass-backdrop: light) {
    .glass-resting { --glass-tint-strength: 24%; --glass-tint-source: var(--glass-tint-ink); }
}
```

This is structurally different and has a trap the spec never examines:

1. **Every element is a style container by default** (the spec even quotes this at
   `utilities.css:531`). So `@container style(--glass-backdrop: light)` on `.glass-resting`
   evaluates against `.glass-resting`'s **own nearest ancestor** — which is whatever the consumer
   wraps it in. If the consumer sets `--glass-backdrop: light` on the SAME element that carries
   `.glass-resting` (the natural authoring instinct — "this card is over light, mark the card"),
   the query does **NOT match**: a style query never reads the queried element's own declarations,
   only its ancestors'. The bucket must be on a STRICT ancestor. The spec's witness-1 GREEN clause
   says "set on an ancestor and read via `@container style()`" — but the live-audit ritual
   (`§Cadence 1`, `§HardGate`) and the page-redesign consumption note (`§Scope CONVERGE`) say "each
   bright page background sets `--glass-backdrop: light` on its glass-card ancestor" AND elsewhere
   "on the dock's ancestor". **The spec is internally inconsistent about WHERE the token lives**,
   and the wrong choice is a silent no-op (the block parses, never matches, contrast stays < 4.5:1,
   and `proof:adaptive-glass`'s SOURCE arm — which only asserts the block EXISTS — passes GREEN
   while the render is still broken). This is the green-gate-over-broken-render class verbatim.

2. **`--glass-tint-strength` / `--glass-tint-source` are GLOBALLY inherited `:root` tokens** read by
   ALL rungs simultaneously. If the `@container` block re-sets `--glass-tint-strength` on
   `.glass-resting`, and a nested `.glass-quiet` is INSIDE that resting card but over a now-dark
   inner region, the inner rung inherits the lifted strength through the cascade and darkens when it
   should not (no per-region reset). The iOS L2 move is **local** ("darken ONLY where the text
   exists"); a single inherited `:root`-level strength token is **global-per-subtree**. The spec's
   own SOTA quote (L2, `:252`) demands locality the inherited-token mechanism cannot give. This is a
   correctness gap between the cited SOTA and the prescribed CSS.

**Falsifiable:** mount `<div style="--glass-backdrop: light"><Card class="glass-resting">` (token on
the card itself, the natural authoring) → the `@container` block does NOT match (self-query) → strength
resolves `0%` → contrast < 4.5:1 → but `proof:adaptive-glass` SOURCE arm passes (block exists). The
ONLY thing that catches this is the live π readback — which (Challenge 3) has no mounting site.

**Hardening:** the spec must (a) RATIFY the token-placement contract as STRICT-ANCESTOR-ONLY and
document it as a hard consumer contract in CLAUDE.md + every cross-ref note (the page-redesign waves
must wrap, not mark); (b) the gate's SOURCE arm must assert the `@container` block re-sets a prop on
a DESCENDANT selector distinct from the query, OR prototype the self-query behavior in a real browser
BEFORE committing the mechanism; (c) the live π readback must mount the token on an ANCESTOR and
assert the match, AND mount it on the rung's own element and assert it does NOT (the negative control
that proves the contract).

---

## CHALLENGE 2 (BREAKS the goal) — "raise the tint strength" and "stay translucent" are COUPLED axes, not independent; the ≤24% ceiling is a strength bound that does NOT bound the resulting alpha, so the surface can clear AA by going effectively opaque — the precise goal-miss the spec names but cannot detect with its gate

The rung bg is `color-mix(in srgb, var(--card) 65%, transparent)` (`tokens.css:771`) — a 65%-alpha
translucent cream. The dock is 42% (`tokens.css:746,774`). The W55 darkening is:

```
color-mix(in oklab, <65%-alpha cream>, var(--glass-tint-ink) 24%)
```

with `--glass-tint-ink: var(--foreground)` and `--foreground: hsl(24 10% 10%)` — **fully opaque**
(`tokens.css:380`). `color-mix` interpolates in **premultiplied alpha**. Mixing 24% of an OPAQUE ink
into a 65%-alpha bg yields a composite alpha of `0.65*0.76 + 1.0*0.24 = 0.734` — the surface gets
~7 alpha-points MORE opaque, and the ink it mixes toward is the darkest color in the palette. Over
the DOCK (42% base) the lift is even larger relative to base. So:

- The "bounded translucency floor (≤18-24% — let content through)" claim conflates a **strength
  bound** with an **alpha/opacity bound**. They are not the same axis. 24% strength toward an opaque
  near-black raises BOTH the darkness AND the alpha. The "let as much content through as possible"
  iOS L1 goal (`:243`) is about alpha-translucency; the strength knob does not isolate it.
- The spec's OWN goal-miss tell (`§HardGate`: "the goal-miss tell is a surface that clears AA by
  going opaque") is exactly what an opaque-ink tint at 24% trends toward — and the SOURCE gate
  cannot see it (it asserts `strength ≤ 24%`, not `resulting alpha ≤ some floor`). Only the live
  readback catches it, and it has no mounting site (Challenge 3).
- **The alpha problem makes the AA-vs-translucency tension WORSE than the spec admits.** Witness 5
  correctly notes the only darkener is the oklab tint. But to clear 4.5:1 over pure white with a
  65%-alpha (or 42%-dock-alpha) base, the ink-mix may need to push the resulting alpha well past the
  glass-identity floor — i.e. 24% may not clear AA over the brightest backdrop WITHOUT going opaque,
  which the spec itself flags as a Class-2 triumvirate trigger (`§3a`). The spec treats this as a
  rare edge; the alpha math suggests it is the COMMON case for the dock (42% base is very
  see-through; darkening a very-see-through surface to AA over white requires a LOT of ink).

**Falsifiable:** prototype `color-mix(in oklab, color-mix(in srgb, hsl(24 8% 96%) 42%, transparent),
hsl(24 10% 10%) 24%)` composited over `#ffffff`, measure the contrast of `hsl(24 10% 10%)` text
against the resolved plate AND the resolved plate's alpha. Prediction: either the contrast does NOT
clear 4.5:1 at 24% over the 42% dock base (so the ceiling must rise, breaking translucency), or it
clears it only by the alpha climbing past the glass-identity floor. Either branch is a goal-miss the
source gate passes.

**Hardening:** (a) prototype the actual oklab-over-transparent alpha math for BOTH the 65% rung base
AND the 42% dock base over `#ffffff` BEFORE landing — this is a one-hour CSS prototype that
de-risks the whole wave; (b) the gate must bound the RESOLVED ALPHA (a `--glass-translucency-floor`
token, e.g. resulting alpha ≤ 0.80) as a FIRST-CLASS assertion alongside the AA floor, not just the
strength %; (c) consider an ink source that is itself ALPHA-BOUNDED (`color-mix(in srgb,
var(--foreground) X%, transparent)` as the `--glass-tint-ink`) so darkening-toward-ink does not drag
alpha to opacity — the darkening and the translucency become decoupleable knobs. This is the gestalt
fix the spec's flat-24%-ceiling misses.

---

## CHALLENGE 3 (CHRONIC — the cardinal-lesson recurrence) — the binding live close has NO mounting site in the demo; "the dock over light is now legible" cannot be live-verified because nothing mounts a dock or card over a light backdrop anywhere in `demo/`

The spec makes the live π contrast-readback over a synthetic-white backdrop the NON-NEGOTIABLE close
criterion (`§HardGate VISUAL-TRUTH`, `§Cadence 1`, `§PreceptAlignment π-lane`). But:

- `grep -rln "glass-backdrop\|over-light\|white.*backdrop" demo/` = **NONE**. No demo story mounts a
  `.glass-dock` or `.glass-card` over a near-white / synthetic-white / bright-bleed surface.
- The dock stories (`demo/stories/navigation/dock.vue`, `dock-layers.vue`, `dock-with-slider.vue`)
  mount over the standard dark/aurora demo chrome — the case where the glass already reads.
- `tests-visual/` (the W00 workspace) has aurora/blob specs but no glass-legibility spec.

So the live close has two failure modes, both chronic in this tranche's history (MEMORY:
`feedback_live_verify_capture`, `project_aw_session_limit_halt` — "headless-green/visually-broken
gap"):

1. The implementer **synthesizes an ad-hoc mounting page** at audit time (a one-off `#ffffff` sibling
   behind a dock), measures it, captures a DELTA, and the page is thrown away — so the legibility
   contract is never re-checkable, never a regression lock, and the next tranche's "glass over light"
   regression is invisible until the user reports it AGAIN (G2 has now been reported across pass-2
   AND pass-3 — it is already a recurrence).
2. The live close is quietly **deferred to "source gate green"** under session-limit pressure (the
   AW pattern) and the wave closes `complete` on a render no one looked at over the actual G2 case.

**Falsifiable:** the spec's `§Cadence 1` says "mount a `.glass-dock` + a `.glass-card` over a VERY
LIGHT backdrop … on the live demo at localhost:5173" — there is no such page to navigate to. The
ritual cannot be executed against an existing surface; it requires authoring one, which the FileBounds
does not list as a deliverable (no `demo/stories/.../adaptive-glass-over-light.vue` row).

**Hardening:** ADD to FileBounds a permanent demo mounting site —
`demo/stories/foundations/glass-over-light.vue` (or fold into the W60 page-redesign as the
canonical light-backdrop proof page) that mounts the dock + a card + a representative rung over (a)
flat `#ffffff`, (b) a bright-aurora bleed, with a toggle for `--glass-backdrop: light` on the
ANCESTOR (the Challenge-1 contract) — so the BEFORE/AFTER is a LIVE, navigable, regression-locked
surface, not an audit-time throwaway. The `tests-visual/adaptive-glass.spec.ts` then points at THIS
page, making the contrast readback a permanent gate, not a one-shot capture. Without this, the wave's
own binding close criterion is unreachable and the G2 recurrence stays live.

---

## CHALLENGE 4 (WEAK) — `contrast-color()` returns black-or-white ONLY; it cannot pick glass-ui's warm-ink `--foreground` (hsl 24 10% 10%), so the `@supports` foreground flip imports a NON-house color and silently diverges from the warm-cream identity the spec swears to keep

The research (`R-ios27:97-98`) and CSS spec both confirm: `contrast-color(<color>)` returns the
**higher-contrast of black/white** per WCAG — pure `#000` or `#fff`. glass-ui's foreground is
`hsl(24 10% 10%)` (warm near-black) and dark-mode `hsl(48 10% 90%)` (warm near-white) — deliberately
NOT pure black/white (the warm-ink house identity, CLAUDE.md surface-tint precept). So:

- `@supports (color: contrast-color(white))` flipping `--dock-fg-on-aurora` to `contrast-color(...)`
  paints **pure black or pure white text**, not the warm ink — a visible identity divergence on
  exactly the supporting engines (Chrome 147+/Safari 26+) the spec targets as the "refinement."
- The spec calls this "ONE reconciled path, not a third foreground fork" (`§Scope fold 4`) — but a
  black/white `contrast-color()` IS a divergent color from the warm-ink declarative path, so the
  enhancement and the floor paint DIFFERENT colors. That is not one path; it is a fork that only
  shows on new browsers (the worst kind — invisible in CI, visible to users on current Chrome).
- CSS `contrast-color()` does NOT (yet, per the cited Una Kravets "beyond black & white" article)
  let you constrain the output to a custom palette pair in shipping browsers — the multi-color form
  is proposal-stage. So the spec's implied "pick warm-ink-light-or-warm-ink-dark per backdrop" is
  not what `contrast-color()` does today.

**Falsifiable:** on Chrome 147+, `color: contrast-color(white)` over a light backdrop computes
`rgb(0 0 0)`, not `hsl(24 10% 10%)`. Side-by-side the `@supports` path (pure black) vs the
declarative warm-ink path (warm near-black) are visibly different hues.

**Hardening:** EITHER (a) drop `contrast-color()` from W55 entirely and carry the foreground flip on
the same declarative `@container style(--glass-backdrop: light)` bucket re-pointing
`--dock-fg-on-aurora` to the warm-ink-dark/light pair (ONE actual path, house-identity-preserving,
works on ALL engines) — `contrast-color()` buys nothing the bucket cannot do and costs the warm-ink;
OR (b) if `contrast-color()` stays, the gate + live audit must assert the flipped foreground is the
WARM ink pair, not pure black/white, which today's `contrast-color()` cannot guarantee — so (a) is the
gestalt-correct call. Recommend cutting `contrast-color()` from the wave; it is SOTA-shiny but
identity-wrong here.

---

## CHALLENGE 5 (WEAK — coordination drift) — the a11y-bracket-onto-`--glass-level` reconcile (fold 5) is double-owned by W54 AND W55 on the SAME glass.css lines, and BOTH are still `planned`, so the reconcile has no settled owner and the `--glass-clarity` placeholder is a permanent-fork risk

`glass.css:730-746` (`prefers-reduced-transparency`) + `:749-756` (`prefers-contrast`) are claimed by
BOTH wave specs:

- W54 `FileBounds` (read at `AX.W54:289`): "REWRITE the `prefers-reduced-transparency` bracket
  (`:730-746`) → `:root { --glass-level: 0 }` … REWRITE the `prefers-contrast` bracket (`:749-756`)".
- W55 `FileBounds` (`AX.W55:300`): "RECONCILE the `prefers-reduced-transparency: reduce` (`:730`) +
  `prefers-contrast: more` (`:749`) brackets onto W54's `--glass-level`".

Both rewrite the SAME two media blocks. The spec hand-waves this as "W54 OWNS the mint; W55 CONSUMES
it" with a `--glass-clarity` placeholder if W54 has not landed (`§Open-Questions 4`). But:

- Neither has landed (`grep glass-level src/` = NONE; both `planned` in PROGRESS.md:72-73). So the
  ordering is unsettled at the moment of dispatch — exactly the stale-base / double-write trap
  (MEMORY: `project_workflow_stale_worktree_trap`).
- If W55 drives first and mints a `--glass-clarity` placeholder, then W54 lands `--glass-level`, the
  "reconciled-away one-line follow" is a SECOND edit to the same two brackets by a THIRD pass — a
  three-way write to `glass.css:730-756` across W54/W55/reconcile. The "no permanent parallel fork"
  guarantee depends on a follow-up that is itself not gated or owned.
- The a11y OPACITY axis (W54's `--glass-level`) and the TINT axis (W55's `--glass-tint-*`) are
  genuinely distinct, but the bracket-COLLAPSE is a single edit to one region — assigning it to "W55
  consumes W54's scalar" while both are unlanded means whichever drives second clobbers the first's
  bracket rewrite.

**Hardening:** the bracket-collapse must be assigned to EXACTLY ONE wave (recommend W54, since it
mints `--glass-level` and the collapse is fundamentally an opacity-axis move) and W55 must touch the
brackets ONLY to ADD a tint-axis line if needed, never rewrite the opacity collapse. The
`--glass-clarity` placeholder should be STRUCK from the plan — it is a backwards-compat shim the
MEMORY no-backwards-compat precept forbids; instead hard-sequence W54 before W55 (the dependsOn
already says so) and forbid W55 from driving until `--glass-level` is live (a wave-open gate, not a
placeholder). This removes the three-way write.

---

## CHRONIC deferrals / slip history

- **G2 (glass-over-light unreadable) is ALREADY a recurrence** — reported in USER-DEFECTS pass-2 §G,
  re-noted in pass-3, and the maximal-glass-first R3 decision makes it the COMMON case at scale.
  The defect has survived AW (the `--glass-tint-*` seam was minted at AW.W23 as a consumer-push
  no-op that never auto-darkens) and is still live at AX HEAD. The adaptive half was specced but
  never built across two tranches. (slip: AW.W23 minted the seam half-built → AX.W55 still SPEC.)
- **No demo mounting site for the G2 case** (Challenge 3) — the `audit/visual/` screenshot
  discipline the MASTER-PLAN flags as "missing" (`MASTER-PLAN.md:52`) is the same gap: there is no
  captured light-backdrop DELTA anywhere, and the wave does not add a permanent one. This is the
  `feedback_live_verify_capture` chronic (live-verified without a captured DELTA artefact).
- **The `@container style()` self-query semantics** were copied from the density precedent without
  re-deriving them for the new prop-shape (Challenge 1). The density precedent itself carries a
  warning comment about a prior WRONG `@supports` wrapper (`utilities.css:535`) — the codebase has
  ALREADY been burned once on style-query subtleties; the W55 spec does not show it re-checked them
  for the glass-tint case.
- **W54↔W55 both `planned`, shared-line double-ownership** (Challenge 5) — the same shared-file
  serialization hazard the dock band hit (W45/W01/DK7 second-clock dup, per MEMORY
  `project_ax_tranche`).

---

## Hardening actions (to PERFECT W55)

1. **Prototype FIRST (one-hour de-risk, before any FileBounds edit).** In a scratch HTML page:
   (a) confirm `@container style(--glass-backdrop: light)` on a `.glass-resting` matches when the
   token is on a STRICT ANCESTOR and does NOT match when on the rung itself (Challenge 1); (b) measure
   the oklab-over-transparent composite alpha + the resolved contrast over `#ffffff` for BOTH the 65%
   rung base AND the 42% dock base at strength 12/18/24% (Challenge 2); (c) confirm
   `contrast-color(white)` computes pure black, not warm ink, on Chrome 147+ (Challenge 4). Fold the
   measured numbers into the spec BEFORE the AA-band ceiling and the ink-source are ratified.
2. **Amend the spec: STRICT-ANCESTOR token contract.** Ratify and document (CLAUDE.md + the
   page-redesign cross-ref) that `--glass-backdrop: light` MUST sit on a strict ancestor of the glass
   surface, never the surface itself; add a negative-control assertion to the live π audit.
3. **Amend the spec: decouple darkness from alpha.** Make `--glass-tint-ink` an ALPHA-BOUNDED ink
   (`color-mix(in srgb, var(--foreground) N%, transparent)`) and add a `--glass-translucency-floor`
   resolved-alpha assertion to `proof:adaptive-glass` (the gate must fail a surface that clears AA by
   going opaque — the spec's own goal-miss, made detectable).
4. **Add a permanent demo mounting site to FileBounds.** `demo/stories/foundations/glass-over-light.vue`
   (or fold into W60) with dock + card + rung over flat-white + bright-aurora, ancestor-token toggle;
   point `tests-visual/adaptive-glass.spec.ts` at it so the contrast readback is a permanent
   regression lock, not an audit-time throwaway. This closes the cardinal-lesson recurrence.
5. **Cut `contrast-color()` from the wave.** Carry the foreground flip on the same declarative
   `@container style()` bucket re-pointing `--dock-fg-on-aurora` to the warm-ink pair (one real path,
   house-identity-preserving, all-engines). `contrast-color()` is SOTA-shiny but paints pure
   black/white — identity-wrong here, and it buys nothing the bucket cannot do.
6. **Reassign the a11y-bracket collapse to W54 alone; strike the `--glass-clarity` placeholder.**
   Hard-sequence W54 before W55 (wave-open gate: `grep glass-level src/` must be non-empty before W55
   drives); W55 touches the brackets only to ADD a tint line, never to rewrite the opacity collapse.
   Removes the three-way shared-line write.
