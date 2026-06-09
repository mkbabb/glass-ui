# Hardening challenge — GLASS-demo-demonstration

**Lane.** Does the DEMO actually DEMONSTRATE glass cohesively — the backgrounds (paper/grid/aurora/
constellation/fourier), the glassy hero cards (Q9), the page containers (Q4/Q7) — or are the pages flat?
The W60 target. Adversarial, source-grounded, planning-only.

**HEAD.** `89edffc` (3.8.0 published + convergence W44-W61). All findings are file:line-grounded against the
working tree.

**Verdict.** WEAK — the demo does NOT yet demonstrate glass over a rich background, and the one wave row that
CLAIMS it does (W57 `live-verified`) is marked over the exact gap (Q9) it left open.

---

## glassCohesion verdict (MAXIMAL glass-first lens)

Under MAXIMAL glass-first, the demo is the single most important PROOF SURFACE: the storybook is where a
consumer SEES that glass-first works over a rich background. Today the demo FAILS that proof on its own terms.

- **2 of 128 navigable pages** demonstrate glass-over-rich-background at all: `primitives/card.vue`
  (`<Aurora>` backdrop behind the tier matrix, `:121`) and `substrates/glass-material.vue`
  (`<Aurora>` behind the `.glass-material` matrix, `:32-40`). Every other page is FLAT over the global
  `PaperBackdrop` shell (`demo/layout/AppShell.vue:76` — `<PaperBackdrop class="fixed inset-0 -z-10 bg-background" />`).
- The page chassis itself is FLAT. `demo/stories/StoryPage.vue:42-51` is `<section class="mt-8 flex flex-col gap-10">` — NO glass card, NO background reference (`grep "glass|Aurora|background|radial" StoryPage.vue` = NONE). 128 of 145 SFCs route through it, so 128 pages inherit a flat well.
- The "good demonstration" page is itself flagged BROKEN. `substrates/glass-material.vue` is exactly the page W48 ("glass-material demo reauthor — bind the shipped specular seams") must reauthor — and W48 is still `planned` (`PROGRESS.md:66`), listed as a live BLOCKER (`MASTER-PLAN.md:25,48`). So the demo's single best glass-over-rich page is the one the tranche itself says is wrong.

**The ONE-model gap.** The pages that DO show glass over a background each hand-roll their own `<Aurora :config="DEFAULT_AURORA_CONFIG" class="absolute inset-0">` inline (card.vue:121, glass-material.vue:33, search.vue, the four W57 heros). There is NO shared background path — no `<StoryHero>`, no `background` descriptor on the `Story` row (`manifest.ts:31-36` Story = `{ id, title, blurb?, component, sourceFiles? }`, no background field). Each glass-over-bg page is a divergent inline fork. The W60 spec is the correct gestalt (one `<StoryHero>` wrapper + one manifest descriptor) — but it is `planned (spec authored)`, writes no demo source, and is blocked behind four unmet predecessors. Under glass-first, the demo CONFORMS on 2 pages, DIVERGES on 126, and the unifying seam is unbuilt.

---

## dockPerfection

Out of lane (component/glass lane), but one cross-cut: the demo's `navigation/dock.vue` is among the 16 pages
rendering a rich substrate, so the dock IS demonstrated over a background. That is the right pattern — it is
the page CONTAINERS (Q4/Q7) and the HERO cards (Q9) that are flat, not the dock story. No dock-specific gap
surfaced in this lane.

---

## Challenges that FOUND a weakness (each falsifiable, source-grounded)

### C1 — W57 is marked `live-verified (DEVELOPED)` but never demonstrated the GLASS card; it closed over the exact Q9 gap that reopened in pass-3. CARDINAL-LESSON RECURRENCE.
`PROGRESS.md:75` marks W57 `live-verified (DEVELOPED)`. But:
- The hero content card is NOT glass. `foundations/intro.vue:30-37` wraps the hero body in
  `class="paper-grain-overlay relative isolate overflow-hidden rounded-card px-8 py-20"` — a `rounded-card` +
  paper grain, NOT a `.glass-card` / `<Card tier>`. The `<Aurora>` is a `-z-10` child BEHIND it. So the hero
  shows Aurora-drift behind an OPAQUE paper card — the literal opposite of Q9 ("the hero CARD itself should be
  GLASSY over the full-page background — to DEMONSTRATE the glass").
- The W57 π live arm asserts only legibility, never glassiness. `W57-demo-radial-calm.json` piLiveArm:
  *"the four heros show a live Aurora painterly drift … behind LEGIBLE content (display titles + prose clear
  AA …)"* — it asserts the content is READABLE over the wash, NOT that the content card is GLASS. The check
  was written to pass on a paper card.
- No DELTA artefact exists. `docs/tranches/AX/audit/W57-DELTA.md` does not exist; `audit/visual/` holds only a
  `CAPTURE-PROTOCOL.md` and ZERO screenshots tranche-wide (`find docs/tranches/AX -name "*.png"` = 0). The
  protocol itself names W57 on the retroactive-backfill-owed list (`CAPTURE-PROTOCOL.md:`"Retroactive backfill
  owed … W57 … marked live-verified but lack a DELTA.md"`).

This is the cardinal lesson recurring INSIDE the convergence band: W57 stamped `live-verified` from a SOURCE
gate + a legibility-only π note, over a hero that is demonstrably NOT a glass card — which is precisely why
the user re-filed Q9 in pass-3 after W57 "shipped." The W60 spec acknowledges this (RED witness 5,
`W60:88-97`) but does not fix W57's inflated status.

### C2 — Q8 (gate-pattern locks you out) is a real demo BLOCKER and is UN-OWNED. No wave fixes it.
`compositions/gate-pattern.vue:23` `const open = ref(true)` + the `<Dialog v-model:open="open">` with
`@escape-key-down.prevent @interact-outside.prevent @pointer-down-outside.prevent` and `:show-close="false"`
(`:66-73`). The instant a user navigates to `/compositions/gate-pattern`, a non-dismissable modal mounts open
and refuses esc / scrim / close — exactly the user's pass-3 Q8 ("literally GATES you from the page on click —
locks you out", `USER-DEFECTS pass3:33`). The ONLY exit is typing the literal key `"wolfpack"` (`:30`), which
the page never reveals except in a blurb buried behind the modal. MASTER-PLAN lists Q8 in Batch 2
(`:25`) and calls it an "un-owned-shipped blocker" (`:48`) — but `grep "gate-pattern|Q8" waves/*.md` returns
NO wave doc. There is no W## that owns the fix. A named blocker with no owner is the chronic un-owned-shipped
class. (W60 mentions Q8 "should leverage glass cards" in passing but its FileBounds never touch
gate-pattern.vue's lock logic.)

### C3 — FourierField is fully built but wired into ZERO demo pages. The "each hero UNIQUE (aurora/constellation/fourier)" promise has fourier entirely ABSENT.
`src/components/custom/fourier-field/FourierField.vue` is a real 353-line shipped primitive (a Canvas2D
epicycle field, sibling to Aurora/GooBlob, with a `hero` preset per its own docstring). It exports via
`/fourier-field` subpath. Yet `grep -rln "FourierField" demo/` = NONE — it appears in NO demo page, NO hero,
NO substrate story, and is absent from `manifest.ts` (no fourier story row). The user's pass-3 directive was
explicit: *"each hero a UNIQUE one — aurora OR constellation OR fourier-field"* (`pass3:17`) and *"pull the
W43 fourier SOTA research UP — execute it NOW"* (`pass3:38`). W43 is still `planned` (`PROGRESS.md:61`). So
the third of the three unique hero substrates the user named is not demonstrated anywhere — the demo cannot
show "each hero a unique one" because fourier is missing from the demo entirely.

### C4 — The GRID background (half of Q4's "PAPER + GRID") has no substrate at all.
W60 RED witness 3 (`W60:65-74`) is true at HEAD and I re-confirmed it: `grep -rln "story-bg-grid" demo/ src/`
= NONE. `grep "grid" src/styles/*.css` hits only layout grids (`dock-layer-grid`, `display:grid`), never a
decorative ruled/blueprint grid. Q4 names "PAPER + GRID backgrounds" for `/primitives/buttons`; paper exists
(`paper-grain-overlay`), grid does not. So even on the pages the user named explicitly, half the requested
background vocabulary cannot be declared because the substrate is unbuilt.

### C5 — W60 (the lane's whole target) is `planned` and blocked behind FOUR unmet predecessors. The page-redesign is far from landing.
`W60:4` dependsOn W54 (`planned`), W18 (`planned`), W40 (`planned`), W57 (`live-verified` but DELTA-less +
Q9-incomplete), W43 (`planned`). Of the five, four are not done and the fifth is inflated. `StoryHero.vue`
does not exist (`grep -rln StoryHero demo/` = NONE). The container layer — the single seam that would make
glass-over-rich the UNIVERSAL page read — has zero source written. The lane's promise ("does any page SHOW
glass over a rich background well") is answered NO for 126/128 pages, and the wave that fixes it is at the
bottom of a deep dependency stack (Batch 4, blocked on the entire glass ROOT W54).

### C6 — buttons.vue (the user's NAMED Q4 example) is a bare flat `<StoryPage>` well.
`primitives/buttons.vue:32` opens `<StoryPage>` with no `<StoryHero>`, no `<Card>`, no Aurora/grid/paper
background reference (`grep "Aurora|background|paper" buttons.vue` = NONE). The user named this exact page
in Q4 ("Pages like /primitives/buttons should be STRUCTURED within a GLASS CONTAINER + leverage PAPER + GRID
backgrounds"). At HEAD it is the flat well the user complained about, unchanged.

---

## CHRONIC deferrals / misses (with slip-history)

### Chronic-1 — "live-verified" without a captured DELTA. RECURS at least 3 tranche-rounds.
- AW band: MEMORY records "headless-green/visually-broken gap" as the reason AW halted and AX was formed.
- AX convergence round 1: W09 + W05 were marked `complete` on headless-green while their own JSONs said
  `live-pending` — the 2 cardinal re-opens (`PROGRESS.md:182-186`).
- AX convergence round 2 (pass-3, this round): W45/W52/W53/W56/W57/W59 all marked `live-verified` with NO
  DELTA.md — the `CAPTURE-PROTOCOL.md` "Retroactive backfill owed" list. ZERO screenshots exist tranche-wide.
The capture discipline was AUTHORED (`CAPTURE-PROTOCOL.md`, the `proof:live-verified-ledger` close gate is
born-RED) but never EXECUTED — the artefact debt is named and deferred to W33, the final wave. For the demo
lane specifically: NO page-redesign / glass-over-bg DELTA has ever been captured.

### Chronic-2 — un-owned-shipped BLOCKERS named-but-not-assigned.
Q8 (gate-pattern lock-out), W46 (blob), W48 (glass-material) are all called "live BLOCKERS un-owned-shipped"
(`MASTER-PLAN.md:48`). W46/W48 at least got wave rows (both `planned`); Q8 got NO wave. This is the same
"substrate-without-consumer / blocker-without-owner" slip — a real user-facing break enumerated in the ledger
but never homed to a wave that touches the breaking file. Q8 has now survived pass-2 AND pass-3 unowned.

### Chronic-3 — the third hero substrate (fourier) deferred wave-over-wave.
W43 (fourier first-class) was authored, the SOTA research was preserved across a "stopped foundational-spec
lane" (git `0b4bf79`), pulled UP by user directive (`pass3:38`) — and is STILL `planned`. The fourier hero
the user asked for in P7/W57 and Q9 has been deferred through W43→W57→W60 without the component ever reaching
a demo page, despite the component being fully built. The pull-up directive ("execute NOW, not mid-tranche")
has not been honored.

---

## Hardening actions (gestalt — PLANNING, no code)

### H1 — Revert W57 to `live-pending` and re-scope its Q9 close. (the cardinal-lesson correction)
W57's `live-verified` is inflated: the hero is a `rounded-card`, not glass, and the π arm never checked
glassiness. Either (a) revert W57 → `live-pending` in PROGRESS until a DELTA.md captures the hero AND that
hero is a glass card, or (b) formally hand the glass-card-hero obligation to W60 (which it already owns via
RED witness 5) and DOWNGRADE W57's claim to "radial-reauthor + pulse-calm only" (drop the "glassy hero" scope
from its title). The current title "aurora/constellation heros" over-claims — W57 added Aurora WASHES behind
opaque paper cards, not glassy heros. Pick one; do not leave `live-verified` standing over the open Q9.

### H2 — MINT a Q8-gate-pattern fix wave (or fold into a named owner) BEFORE the page-redesign.
Q8 is a hard demo lock-out with no owner. Add a thin wave (or fold into W60's per-page wrap): default
`gate-pattern.vue` `open` to `false` with an explicit "Open the gate" trigger, OR surface the key inline, OR
render the gate as a contained glass-card demo region rather than a full-screen non-dismissable modal that
hijacks the whole storybook. It must land BEFORE W60 wraps pages (W60 cannot wrap a page you can't reach).
This is a blocker; it should not wait for Batch 5.

### H3 — Run a fourier-hero PROTOTYPE now and wire FourierField into ≥1 demo page (execute the W43 pull-up).
The component is built. Add a `substrates/fourier-field.vue` story row + designate ONE hero (per W60: a
math/graphics hero — `compositions/math-paper` or a new fourier showcase) to declare `background: "fourier"`.
This satisfies the user's "execute the W43 SOTA NOW" directive, proves the third unique substrate exists in
the demo, and de-risks W60's RED witness 5 (each hero unique) — which currently cannot pass because fourier
is absent from the demo. Prototype: mount FourierField behind a glass card, capture a paired-π DELTA, confirm
ONE Canvas2D context + the offscreen-freeze inherited from `useCanvas2D`.

### H4 — Build the `.story-bg-grid` substrate as the W60 step-3 PROTOTYPE, decoupled from the full wrap.
The grid is the only missing background substrate and is independent of the W54 glass-first ROOT dependency.
Author `.story-bg-grid` (token-driven `linear-gradient` blueprint, light/dark adaptive, PRM-static) + a
`substrates/grid.vue` story FIRST, so the paper/grid/aurora/constellation/fourier set is COMPLETE and
demonstrable before the heavy container-wrap lands. This unblocks a Q4 ("buttons over PAPER + GRID") partial
demonstration without waiting for the full W54→W60 chain.

### H5 — Add a glass-card-hero π assertion to the W60 (and re-verified W57) gate.
The W57 π arm's "legible content" check is too weak — it passed on a paper card. The W60 `proof:page-container`
π live arm MUST assert `getComputedStyle(heroCard).backdropFilter !== "none"` AND the background substrate is
visible THROUGH the card (a pixel-sample behind-vs-through delta), not merely that text is AA-legible. Encode
the Q9 read as a falsifiable π assertion so a paper-card hero RES the gate. Capture the screenshot DELTA into
`audit/visual/` per CAPTURE-PROTOCOL — the demo lane's first glass-over-rich evidence artefact.

### H6 — Author a "demo glass-coverage" census gate (the cohesion ledger).
Today 2/128 pages show glass-over-rich. Mint a source census: every navigable page either (a) composes
`<StoryHero>` with a declared `background`, or (b) is on a documented exempt allowlist (a token-tour /
swatch page where a rich bg would compete). This makes the glass-first DEMO coverage a binary, gated number
— the same discipline the overfitting audit applies to src/. It converts "are the pages flat?" from a live
eyeball into a falsifiable count that W60 must drive to 100%.
