# BC.W-GLASS-IDENTITY — the warm-cream partial-transparency base, restored at root (the grey-slab killed)

- **Band:** 1 · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** after `BC.W-BLACK-BAR` (the rim must be the catch-light before the plate reads clean); before `BC.W-ADAPTIVE-RECONCILE` (this restores the translucent-warm FLOOR the observer then drives ABOVE) and `BC.W-GLASS-LEGIBILITY-MEASURED` (which measures the AA bar on this floor)
- **Owns / closes:**
  - USER-DEFECTS §D "ALL glassy items must be Apple iOS-27 inspired."
  - USER-DEFECTS §D "GLASS must be partially transparent."
  - DEFECT-LEDGER **D1** "glass too dark + grey (major regression)" — the IDENTITY half (the warm-cream translucent base); the dynamic-darken half is `BC.W-ADAPTIVE-RECONCILE`.
  - The user verdict: *"Our glass primitives have been destroyed."* (ORCHESTRATION §0).
  - ORCHESTRATION §1 Band 1 box: `BC.W-GLASS-IDENTITY — partial-transparency restored, warm-cream, the grey-slab killed at root`.

## Goal (the gestalt)
Every glass surface on `:5199` — card, dock, dialog, popover, button — reads as **warm-cream liquid glass you can see through**: a translucent honey-white plate over its backdrop, the page structure bleeding softly through, never a flat opaque grey slab. At rest, over a calm light page, the glass is unmistakably *cream and translucent* (you read the warmth and the transparency at a glance); over a busy aurora it stays warm-cream and lets the field through (the darken is `BC.W-ADAPTIVE-RECONCILE`'s job, not a static heuristic that greys everything). The plate's chroma is alive — it is a warm material, never a neutral grey rectangle. This is the iOS-27 `.regular` glass identity restored to the maximal-default base the whole library inherits.

## Starting state (measured, file:line)
**The grey-slab origin is AZ.W-ADAPTIVE-AUTO** (postmortem/az.md §1): the unconditional 20%-AA darken toward the near-black warm ink poisoned the base plate. The content-tier half was walked back (BA scope-7, 4% floor) and the overlay-band half was pre-fixed (the `BC.W-AUDIT` commit `e1b4b44c`), so the SOURCE is now MOSTLY restored — but the IDENTITY must be VERIFIED-and-hardened against re-poisoning, and two residuals remain.

- **The 4% floor IS landed (verify, do not re-fix):** live-probe of a real card at `/display/card` (2026-06-18) = `bg = oklab(0.934 0.0015 0.0064 / 0.664)` — **warm-cream L 0.934, 66% α** (glass-dock-codebase.md §1.1, the headline "the grey-slab is ALREADY CLOSED at the 4% floor"). `--glass-tint-strength` resolves `4%`. The rules:
  - `src/styles/glass/ladder.css` (the content tiers `:where(.glass-card,.glass-resting,.glass-quiet,.glass-wash)` set `--glass-tint-strength: var(--glass-tint-strength-floor)` = 4%).
  - `src/styles/glass/ladder.css` (the overlay band `:where(.glass-floating,.glass-overlay)` ALSO joined the floor at the `BC.W-AUDIT` pre-fix — verified in source, the `--glass-tint-strength: var(--glass-tint-strength-floor)` line with the `BC.W-AUDIT` comment).
  - `src/styles/dock/morph.css:428-441` (the dock `:where(.glass-dock)` joined the floor — live: dock `--glass-tint-strength` = 4%).
- **The opacity ladder is the IDENTITY (warm-cream, partially transparent):** `tokens/glass.css` `--glass-opacity-{wash,quiet,resting,floating,overlay}: 0.30/0.50/0.65/0.80/0.95`, `--glass-opacity-dock: 0.42`. The `--card` plate is `hsl(36 48% 97%)` (warm cream, BA.W-NO-GRAY). These are the warm-cream partial-transparency identity — KEEP (apple-ios27.md §5 bake-table: "the calm default is the user's 'a hair too much' call — keep W-GLASS-CAL inviolate").
- **Residual 1 — cream-over-busy-aurora reads desaturated-grey on some backdrops** (glass-dock-codebase.md §1.1 (a)): a 66%-α warm-cream plate over a saturated colored field reads desaturated-grey because the field bleeds through and washes the cream. The iOS-27 answer is the DYNAMIC darken (the observer closed) — that is `BC.W-ADAPTIVE-RECONCILE`. This wave's job is to ensure the BASE (calm-page) plate is unmistakably warm + translucent and to add the gate that catches re-poisoning.
- **Residual 2 — the regression can silently return.** The grey-slab rode AZ→BA→BB UNTOUCHED for three tranches because **the gate that should have caught it is monotonic** (postmortem/az.md §2: `proof:adaptive-glass-live` asserts only `contrastRatio >= 4.5` + `deltaL >= 0.08`, both MONOTONIC in the darken direction — "a grey slab scores BETTER on every metric the gate measures than the correct warm-cream plate"). There is ZERO upper bound, ZERO warmth/chroma assertion. So a future darken re-poisoning would pass green again.

## Target spec (grounded)
This wave is **VERIFY-and-HARDEN, not re-fix** (glass-dock-codebase.md §1.1 binding instruction). Three moves:

1. **Ratify the warm-cream translucent FLOOR as the canonical identity** (token-first, no value change to the landed floor):
   - Keep `--glass-opacity-*` (0.30-0.95) + `--glass-tint-strength-floor: 4%` + `--card: hsl(36 48% 97%)` as the warm-cream identity inputs.
   - Verify (live + gate) that on a CALM-LIGHT page every glass surface resolves: **oklab-L > 0.85, oklab-chroma > 0.004 (warm, not grey), α < 0.72 (translucent)** — the bake-table identity bounds (apple-ios27.md §5; the BA.W-NO-GRAY warm-chroma floor C ≥ 0.004 for the near-white plate).
2. **Collapse the dual darken expression into ONE seam (the architectural transposition).** At HEAD the darken is expressed THREE ways that must not contradict: the unconditional content-tier `:where()` floor, the overlay-band `:where()` floor (pre-fixed), and the `@container style(--glass-backdrop: light)` bright bucket. Postmortem/az.md §4 names the fix: "collapse the unconditional `:where()` re-points + the descendant-only `@container` bucket into ONE seam, default to the translucent-warm cream floor, EARN the darken only on a real bright signal." This wave RATIFIES the floor (4% calm) and hands the EARNED-darken seam to `BC.W-ADAPTIVE-RECONCILE` (which makes the strength a continuous `calc()` off the observer). The two waves share ONE `--glass-tint-strength` axis — this one pins the FLOOR, the next drives ABOVE it.
3. **Add the BIDIRECTIONAL identity gate** (the postmortem/az.md §2 structural lesson, the disease root). The new gate is born-RED on the historical grey slab (`oklab(0.695 ...)` — the AZ dock plate) and asserts the warm-cream identity is preserved: over a CALM-LIGHT backdrop a glass surface MUST resolve `α < 0.72 AND oklab-L > 0.85 AND oklab-chroma > 0` (warm, translucent, NOT grey). This is the upper-bound the monotonic gate never had.

The KISS architecture: the IDENTITY is the opacity ladder + the warm `--card` + the 4% calm floor; the *darken* is a SINGLE earned axis (`BC.W-ADAPTIVE-RECONCILE`). No new compositing seam — the existing `color-mix(in oklab, <rung bg>, var(--glass-tint-source) var(--glass-tint-strength))` is untouched; this wave only RATIFIES its FLOOR and GATES its identity.

## Mechanism / files
- **Verify (no edit) `src/styles/tokens/glass.css`** — the `--glass-opacity-*` ladder + `--card` warm-cream value are the identity; ratify them in the gate, do not change.
- **Verify (no edit) the `--glass-tint-strength-floor: 4%`** at `tokens/glass-fx.css` + the `:where()` floor rules at `glass/ladder.css` + `dock/morph.css` (the landed pre-fix).
- **Author `scripts/proof-glass-identity.mjs`** — the BIDIRECTIONAL identity gate (born-RED on the grey slab, the postmortem/az.md §2 disease-root fix). Device-free SOURCE arm + the binding π is the live readback.
- **Author `tests-visual/glass-identity.spec.ts`** — the live calm-page identity readback (the warm-cream-translucent assertion over a calm backdrop).
- The seam: this wave OWNS the *floor* of `--glass-tint-strength`; `BC.W-ADAPTIVE-RECONCILE` OWNS the *driver* above it. ONE axis, two waves, no contradiction — the §4 collapse.

## Acceptance (gestalt + measured + gate)
1. **CAPTURED-PAINT gestalt criterion (dev-tools MCP):** a composited screenshot of `/display/card` + `/dock/overview` over a CALM light page AND `/substrates/aurora` (the dock over a busy field), BOTH modes. A human reads: warm-cream, translucent, you-can-see-through-it glass — NOT a grey slab. Lands at `docs/tranches/BC/audit/visual/W-GLASS-IDENTITY-DELTA.md`.
2. **Machine gate `proof:glass-identity`** (born-RED on the historical grey slab → GREEN; the disease-root BIDIRECTIONAL bound, `["local","ci"]` for the source-presence arm):
   - **I1 — the warm-cream identity inputs intact.** `--glass-opacity-*` ladder is the 0.30-0.95 monotone, `--card` resolves warm (oklab-chroma > 0.004 at the warm hue, BA.W-NO-GRAY); the `--glass-tint-strength-floor` is ≤ 5% (the calm floor, born-RED if a future edit lifts it back toward 20%).
   - **I2 — the calm floor is the unconditional default.** The content-tier + overlay-band `:where()` rules set `--glass-tint-strength: var(--glass-tint-strength-floor)` (NOT `-aa`); a planted `--glass-tint-strength: var(--glass-tint-strength-aa)` on an unconditional `:where()` reds (the AZ regression self-test bite — the exact line `5b72fd9b` shipped).
   - **I3 — the BIDIRECTIONAL identity bound (the π, born-RED on grey).** The binding π (below) asserts over a calm-light backdrop: glass surface α < 0.72 AND oklab-L > 0.85 AND oklab-chroma > 0 — born-RED on the `oklab(0.695 0.002 0.006 / 0.536)` grey-slab fixture (postmortem/az.md §1).
   - **I4 — no unconditional full-AA darken survives.** grep the `:where()` content/overlay/dock rules: none re-points `--glass-tint-strength` to `-aa` outside an `@container`/observer-gated block. Self-test: a synthetic unconditional `-aa` re-point reds.
   - **+ the disease-root bite:** a synthetic grey-slab token set (the AZ `oklab(0.695)` recipe) MUST fail the gate (the monotonic-gate-blind-spot closed — postmortem/az.md §8 class 1 `source-mechanism-gate-not-paint-gate`).
3. **π readback `tests-visual/glass-identity.spec.ts`** (both modes + WebKit, LOCAL real-render):
   - getComputedStyle on `/display/card`, `/dock/overview`, `/containers/dialog` over a calm light page: each glass `background-color` resolves **oklab-L > 0.85, oklab-chroma > 0.004, α < 0.72** — warm-cream, translucent (born-RED on the grey slab; this is the BIDIRECTIONAL bound the monotonic gate lacked).
   - The dock over `/substrates/aurora`: the plate reads warm-cream at REST (the darken is the observer's job, verified in `BC.W-ADAPTIVE-RECONCILE`); this wave asserts the BASE is not pre-greyed.
   - WebKit: the warm-cream base is `background` + `backdrop-filter: blur()+saturate()` (cross-engine — no `backdrop-filter: url()`); the identity MUST paint identically on Safari (apple-ios27.md §6).

## Fences / invariants (must NOT regress)
- **VERIFY-and-HARDEN, not re-fix** (glass-dock-codebase.md §1.1): the 4% floor is LANDED; do not re-touch the landed rules. The wave's real deliverable is the gate + the ratification, not a re-edit of the floor.
- **W-GLASS-CAL inviolate** (apple-ios27.md §5): the calm blur radii (`--glass-blur-*-radius`) + saturate companions are UNTOUCHED — the user's "a hair too much" call already landed; this wave does not re-juice the blur.
- **Clean break, no alias** (MEMORY): no `--glass-opacity-*-legacy`, no darken-revert alias. The grey-slab rules are gone, not aliased.
- **Presets-in-consumers:** the warm-cream `--card` + opacity ladder are the LIBRARY identity; a consumer with a divergent composited luminance (the speedtest dark-AA register) keeps that as a named preset in its own repo (BB.W-CARD-TIER-ALPHA), and a re-pin BACK to the library canonical deletes byte-equivalently.
- **The `--surface-tint-*` in-srgb family is NEVER touched** (AW.W26 fence — the glass tint is the in-oklab axis only).
- **The dual-axis disjointness:** this wave owns the OPACITY/identity + the tint FLOOR; the RIM is `BC.W-BLACK-BAR`'s, the tint DRIVER is `BC.W-ADAPTIVE-RECONCILE`'s, the AA-measure is `BC.W-GLASS-LEGIBILITY-MEASURED`'s. No overlap, no re-paint.

## Folds (deferrals discharged)
- **`az-adaptive-grey-origin`** (research/deferral/az.md §7 — "the GREY-SLAB ROOT ... the unconditional self-engage re-points `--glass-tint-strength → --glass-tint-strength-aa` UNCONDITIONALLY ... with NO read of the backdrop signal"). **DECIDED — REBUILD (the IDENTITY half):** `BC.W-GLASS-IDENTITY` restores the warm translucent base + the bidirectional gate; `BC.W-ADAPTIVE-RECONCILE` closes the observer loop (the darken-driver half). The unconditional `:where()` re-points are GONE; the floor is the default. The chronic ends here.
- **`az-suffuse-library-wide-w60`** (research/deferral/az.md §32 — "the rich per-page backgrounds that make glass POP land on the rebuilt non-grey floor"). **DECIDED — MEET (the floor half):** this wave delivers the non-grey floor the W60-class per-page backgrounds need; the breadth pass itself is Band 4/5. The floor precondition is MET here.
- The postmortem/az.md §8 failure class 1 (`source-mechanism-gate-not-paint-gate`) is the disease-root this wave's bidirectional gate closes — DECIDED, the gate is born-RED on the exact historical grey-slab pixel value.
