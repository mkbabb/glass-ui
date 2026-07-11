# BI.W-PROMOTE-CONTEXT — the buried DI-context PROMOTE (dockContext → composables/context/)

> **Wave id:** `BI.W-PROMOTE-CONTEXT` · **band:** S3 (RECURSIVE COLOCATION) · **class:** `H` (device-free) ·
> **gate:** `proof:import-boundaries` (G4 DI-context arm) · **preconds:** BI.W-FLATTEN-MOVE. The commissioned
> carry (a) PROMOTE-context; a MEASURED per-route WIN.

## §0 — Verdict

The atomization special-case the standard exists to catch: a DI context provided by ONE component but read by ≥2
FOREIGN families is a buried-primitive — it PROMOTES to the shared DI-contract home. `dockContext.ts` is the live
witness (read by 5 non-dock families). The promote is proven: typecheck 0, build 0, `/dock` byte-stable, ZERO new
backward edges, **−327gz on EACH of 5 foreign routes** (−122gz net on the dock route). "Performance above all"
satisfied on the runtime axis.

## §1 — The DI-promotion criterion, codified

*A `createStrictContext`/`createOptionalContext` module promotes to `composables/context/` IFF ≥2 NON-OWNING
feature-dirs import its MODULE PATH.* Over all 8 DI-context sites exactly ONE qualifies (`dockContext` = 5); the
7 others STAY (the count decides — this is a placement FUNCTION of family count, not a one-way ratchet).

## §2 — The moves

1. **`dockContext.ts` → `composables/context/dockContext.ts`** — carrying its `InjectionKey` + helper + domain
   types (`DockOrientation`/`DockLayout`) + inlined `DOCK_CONTEXT_LABEL`, SFC-FREE. The promote FORCES the
   context's OWN domain types into the shared dir (a backward `shared → component` type import would violate the
   4-node DAG).
2. **`useDockHold.ts` → promote WITH `dockContext`** — a buried PRIMITIVE reached by `ui/slider` (a cross-family
   guts reach); it rides the same promote so `Slider.vue → dock/composables` guts resolves. (This closes part of
   the G4 cross-component-GUTS residual that BI.W-GUTS-RESIDUAL enumerates.)

## §3 — Binding criteria (born-RED → GREEN)

- Born-RED: `proof:import-boundaries` reds the ≥2-foreign-family reach into `dockContext.ts` guts (a
  `components → other-component GUTS` RED, escalated to the DI sub-ruling `≥2 components → same buried DI-context
  guts → promote`).
- GREEN: `dockContext` lives at `composables/context/`; the 5 foreign families import the shared path; ZERO
  backward `shared → components` edge introduced; typecheck 0; build 0; `/dock` byte-stable; the per-route −327gz
  delta measured. Self-test 11/11 incl. the DI bite.

## §4 — Fences

- The promote carries the context's OWN domain types into `composables/context/` (the DAG forbids a backward
  type import) — SFC-free.
- The 7 non-qualifying DI-context sites STAY (the count decides; no over-promotion).
- ZERO paint change (a location move; `/dock` byte-stable).

## §5 — Cross-refs

§1.3 T3 (DI-promotion criterion); §1.5 (FOLD↔PROMOTE symmetry, PROMOTE-context); §2.4 (composables/context/ the
DI-contract home); Appendix A1″ (the proven promote); §6 G4.
