# keyframes.js → glass-ui AX — live-consumer note: the Card-specular consume-edge (kf is NOT blocked; 3.8.0 is a cosmetic upgrade)

**From:** the keyframes.js session (Tranche H close — W8 the gate-regime wave). **To:** the active
AX session. **Date:** 2026-06-08. **Nature:** a coordination message (NOT a glass-ui edit). Written
as a distinct file so it does not touch your in-progress `CONSTELLATION.md`, `AX.md`, the
`W09-specular-tune.json` audit, or the dirty `docs/precepts`.

> **REVISED (supersedes this file's first draft).** My first draft said "kf holds 3.4.0 + the
> dock-lag is a born-RED HANDOFF." That was WRONG — corrected after grounding the actual rendered
> behavior across the published line. The true picture below is BETTER for everyone: **kf is on
> ~3.5.1, fully green, and NOT blocked at its close.** The AX 3.8.0 publish is a *cosmetic* upgrade
> for kf, not a hard dependency.

## What kf actually found (grounded live across 3.4.0 / 3.5.1 / 3.7.0)

Your **AX.W09** audit already names keyframes panels in the `cardSpecularDefault:"off"` §24
three-consumer confirmation, and routes the kf verification to **W34**. Here is the grounded
consumer reality:

- kf's H.W11 stages (easing/spring/sequence/motion-path) are **`surface="glass"` `<Card>`s** (the
  user's explicit "non-cartoon glass card encapsulation" ask).
- At **3.4.0** those glass Cards paint the **visible dead-centered white bloom** (§4 note 12's
  "published-3.4.0 dead-centered white bloom") — bad.
- At **3.5.0/3.5.1** glass-ui **already KILLED that visible bloom** (the pointer-radial is dead at
  rest): the glass stages are **visually clean**. Only the inert `.glass-specular-track` *class*
  remains on the element — no rendered catch-light. **kf verified this live** (the rendered
  `::before` paints nothing; the appearance gate's bloom-half is green at 3.5.1).
- At **3.6.0/3.7.0** something re-regresses (kf's gate went 2→3). So kf **pins `~3.5.1`** (the sweet
  spot: visible bloom dead + the dock-spring retune present, capped below 3.6/3.7).

## kf's resolution — fully green on ~3.5.1, no override, no fork

- **Dock-lag (D5) CLOSES for real:** `~3.5.1` carries the dock-spring retune (`53c1b07`), so kf's
  `proof:dock-morph-settled` is **GREEN** (peak +4.5% ≤ +6%). A passing SYSTEM gate — not a HANDOFF.
- **Specular:** the glass stages are visually clean at 3.5.1. kf reconciled its OWN gate
  (`proof:no-orphan-specular`, authored at W9 before the W11 glass stages existed) to sanction the
  W11 glass stages as the expected `surface="glass"` exception — consistent with its
  `proof:stage-glass-card`. The inert `.glass-specular-track` class on those stages is **glass-ui-
  owned residue**; kf adds **no `--specular-intensity` override, no `!important`, no fork** (inv-16).

## The 3.8.0 consume-edge is COSMETIC (a nicety, not a blocker)

When the AX cut **publishes (3.8.0)** with the opt-in `specular="off"` default, kf bumps
`@mkbabb/glass-ui` and sets `specular="off"` on its glass stages — which simply **removes the inert
`.glass-specular-track` class** (already painting nothing). It is a tidy-up, not an unblock: kf is
already green and shippable on ~3.5.1. That bump remains kf's **W34 consumer-adoption leg** in your
ledger; there is no urgency and **no AX action is requested** beyond the publish you already plan.

— keyframes.js (Tranche H · W8). Reachable via `keyframes.js/docs/tranches/H/glass-ui-AX-handoff.md`
(G-1).
