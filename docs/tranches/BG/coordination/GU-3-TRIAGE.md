# GU-3 — BG-side TRIAGE disposition (response to the atlas L-DOCK offer)

Triages `GU-3-dock-consume.md` (the atlas OFFER, source-of-record `atlas/docs/tranches/L/glass-ui-asks/GU-DOCK.md` @ ec6cdd7). Authored BG-side 2026-06-28 on `tranche/BG` (552cc9e7, LOCKED). Additive — reopens no BG wave; records the disposition the build phase + the joint BG/BH 5.0.0 cut honor. Coordinates with the **BH** restructure tranche (the joint 5.0.0 owner).

## ASK A — StatusDot custom-variant forced-colors ON-signal opt-in → ACCEPTED (4.4.0-line, behind GU-1)

Disposition: **accept as a net-new a11y delta, queued with GU-1 on the 4.4.0-line** (after the parked 4.3.0 publishes). It is line-disjoint from every BG wave (`a11y-fallback.css:134-166`), so it is a clean additive cut, not a BG-wave reopen. The shape: a `signal` prop / `data-signal="on"` attribute on `StatusDot` that, for `variant="custom"` ONLY, maps `active → Highlight` inside `@media (forced-colors: active)`, superseding the `custom → Canvas` default for the opted-in dot. NEG-control preserved: a `custom` dot without the opt-in still resolves `Canvas`. The "PRM-kill" half is correctly dropped (the pulse is already `motion-safe:animate-ping`). The atlas retires its `Dock.vue:973-979` `:deep` override onto the prop at its next bump. **Queued in the GU-1/4.4.0-line ledger; not a 4.2.0/5.0.0-line item.**

## ASK B — the `--ring` rename fallout → CORRECT the premise + ship the break at 5.0.0 with a pinned MIGRATION row (NO 4.x alias)

This is the **highest-value record** — a real cross-repo consumer-truth WS10 could not see. WS10 `BG.W-DESHADCN-TOKEN-REPLACE` renames `--ring → --focus-ring-color`, deletes the alias, on a **"EXACTLY ONE consumer"** premise (`SPEC-pass2:187`) that counts only glass-ui-INTERNAL readers. The atlas carries **12 bare `var(--ring)` sites (no fallback) across 11 files** that resolve to nothing the instant the un-aliased rename lands (census in `GU-3-dock-consume.md` §ASK-B). This is the **inv-11 registry-consumer-probe** discipline live: the import-graph census is consumer-truth #1; the constellation/registry consumer is #2, invisible to the first — a published-but-off-mainline consumer forces a NAMED migration line, never a silent break.

**Disposition (Option 2 — hold the clean break, NO alias; honors the no-legacy-aliases identity):**
1. **Correct WS10's "one consumer" premise** at build time — the `--ring` rename has 12 external (atlas) bare consumers + 8 fallback-degrading sites, not one. Record this in the WS10 build notes (the premise is wrong, the rename is still correct — it just owes a migration line).
2. **The break ships at the joint BG/BH 5.0.0 major** (BH §2-#4: BG+BH cut once as 5.0.0). A token rename is a legitimate MAJOR break — no 4.x transition alias (the user's "no legacy aliases" rule holds; a major version is the sanctioned break point).
3. **Fold the `--ring → --focus-ring-color` re-point into BH's B7 by-name-ask roster** — the THIRD consumer migration beside `muster→/aurora` and `speedtest→/timeline` (BH `PLAN.md:106`). The 5.0.0 `MIGRATION.md` (BH B4e) records the rename + the pinned landing commit; the atlas re-points all 12 bare sites ATOMIC with the 5.0.0 cut, fallback-first off its pinned commit. **→ ACTION for the BH agent: add the atlas `--ring` re-point as a B7 row.**

## Q1–Q4 — CONFIRMED (BG build-time invariants)

- **Q1 (anchor consumer-bless) — CONFIRMED.** No per-orientation `side`/placement prop is owed. WS2 INPLACE-MORPH ships a local `t≥0.5` `boundOrientation` (composes `useDockSpring`), no `side` prop; the documented consumer left-margin override (`atlas Dock.vue:613-628`) is the blessed pattern.
- **Q2 (persistent-foot) — CONFIRMED.** A new bottom band distinct from `#persistent` is out-of-WS2-scope; the `cap⟹scroll` model (`SPEC-pass3:189, :202`) is the sanctioned interim. Drop the "TOP iOS-Now-Playing" framing.
- **Q3 (leg-b class-name survival) — CONFIRMED, as a WS2 BUILD INVARIANT.** WS2 DECOMPOSE relocates the full/summary/search panes into `DockMorphRegion.vue` but MUST preserve the `.dock-layer--full` class name (the atlas `:deep(.dock-layer--full)` matches by class and survives a relocation, breaking only on a RENAME). **→ The WS2 build must not rename `.dock-layer--full`** (or must expose a documented stable layout hook). Flagged for the build phase.
- **Q4 (token-name survival) — CONFIRMED.** `--dock-selected-accent` / `--dock-control-floor` / `--dock-touch-target` survive WS2/WS3/WS10 under the same names (they repaint the dock button, never rename these tokens). The coupled atlas consume (drop `overflow="scroll"` when CAP-SCROLLS publishes — WS2 retires the union member) is noted; it is a consume, not an ask.

## NOTE — j0-glass-expand-reparent — CONFIRMED out-of-scope

The `?fig=` enlarge single-`renderSlot` + `settle` emit is un-owned by BG (grep-empty across WS2/4/5/7/8/10). **Confirmed: no successor BG wave silently adopts a `?fig=` reparent before it is treated as a fresh root cut.** No edit owed now; owed on a further republish.

## Cross-tranche coordination summary

| Item | Disposition | Lands | Owner |
|---|---|---|---|
| ASK A (StatusDot opt-in) | ACCEPT | 4.4.0-line, behind GU-1 | a future a11y cut (with GU-1) |
| ASK B (`--ring` re-point) | premise corrected; break at 5.0.0, pinned MIGRATION row, NO alias | joint BG/BH 5.0.0 | **BH B7** (add the atlas row) + WS10 build note |
| Q1/Q2/Q4 | CONFIRMED | BG build (no edit) | — |
| Q3 (`.dock-layer--full`) | CONFIRMED as WS2 build invariant | BG WS2 build | WS2 build phase |
| NOTE (`?fig=`) | CONFIRMED out-of-scope | — | — |

Every consume pins the exact BG/5.0.0 landing COMMIT at consume-time (not a version number) — the BG-build-fenced discipline (nothing is published on `tranche/BG` yet).
