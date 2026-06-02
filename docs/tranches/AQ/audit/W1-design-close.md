# AQ.W1 — design-slice close (dev-phase boundary)

W1 authored the three glass-ui AQ design slices (a 6-agent design workflow paired with muster J.W1). The
design is concrete + implementable, the AQ↔J coupling contracts cohere, and the design phase refined the
W0 audit. This doc closes the development half; the impl phase (W2-W8) opens only on explicit user
authorization.

## Slices authored

| Slice | Scope | Doc |
|---|---|---|
| **AQ.W1.1** | Color & theming (W2) | `design/W1.1-color-theming.md` |
| **AQ.W1.2** | Selectors, transforms & form vocabulary (W3+W4) | `design/W1.2-selectors-forms.md` |
| **AQ.W1.3** | Motion, anchor positioning & top-layer + bundle guardrail (W5+W6+W7) | `design/W1.3-motion-anchor.md` |

## Cross-repo couplings — exposed to muster J (verified coherent)

- **`useUserInvalidAria`** (AQ.W1.2 §W4.4) — the ≤8-LOC `:user-invalid` → `aria-invalid` blur-bridge
  composable. Consumed by muster J.W1.3 §2.3. The signature + blur/input/submit sync wiring is the
  binding contract.
- **`useViewTransition`** (AQ.W1.3 §W5-c) — the `startViewTransition` helper + `view-transition-class`/
  `-name` recipes on `motion-core`. Consumed by muster J.W1.2 §W5.3 (the verdict reveal). The
  instant-update + reduced-motion fallback is part of the contract.

## Load-bearing refinements the design found (refining W0)

1. **The `hsl(var(--…))` consumer bug is bigger than W0 stated.** AQ.W1.1 classified all **71** consumer
   `hsl(var(--` sites: **64 are bug-class** (12 `/α` malformed + ~52 bare double-wraps that expand to
   `hsl(hsl(...))` and never paint) and **6 are legitimate channel composites** that must NOT migrate.
   The `color-mix()` migration map is per-site; the 6 legitimate sites are explicitly excluded. This is
   the headline cross-repo correctness fix delivered to muster through the AQ publish.
2. **glass-ui's registered `@property`s are non-color** — so the `light-dark()` resolve-late inheritance
   gotcha (which only bites registered `<color>` properties) does not apply to the existing tokens;
   AQ.W2 stays compliant by keeping the new `light-dark()` color tokens unregistered.
3. **NEW deliverable — add the `/number-field` + `/switch` flat subpaths (folded into AQ.W7).** muster
   J.W1.2 found these two families have no flat per-subpath entry in glass-ui 3.0.0, so muster's
   NumberField (×3 sites) + Switch (×1) imports cannot leave the root barrel — blocking part of J's
   eager-chunk sweep. AQ.W7 now ADDS these two subpaths (a glass-ui 3.x minor, additive: new
   `package.json` exports entries + `typesVersions` + the per-subpath dist chunks, no source move). The
   `Drawer*` family stays root-barrel by the standing AN.W3 decision (prop/type-only, no heavy isolated
   chunk) — not a gap. So AQ.W7's subpath-completeness deliverable is: **+2 subpaths (`/number-field`,
   `/switch`); `/drawer` confirmed by-design root-barrel.**

## AQ.W7 scope addendum (from refinement 3)

W7 (Bundle & container-query) gains an explicit sub-item: **subpath-surface completeness** — publish the
`/number-field` + `/switch` flat subpaths so the per-subpath split is complete for muster's import-sweep
needs (J.W4). Gate: `verify-export-types` + `proof:resolution` pass for the 2 new subpaths; muster's
NumberField/Switch sites resolve to `dist/number-field.js` / `dist/switch.js`. This composes with the
existing W7 heavy-leaf carve + the barrel-vs-subpath delta doc.

## Dev|impl boundary

**W0-W1 (development) complete.** The baseline audit (W0) + the three design slices (W1) are authored
and verify; the couplings cohere; the refinements are recorded. **W2-W8 (implementation) is held** — it
opens only on explicit user authorization. Each impl wave keeps the current/hand-rolled path as the
documented feature-detected fallback (the no-alias + Newly/Limited-fallback invariants), so the
implementing publish degrades gracefully on any consumer target.

## Cross-repo perimeter (unchanged, user-domain)

AQ ships the substrate via a published glass-ui 3.x minor (additive + fallback-guarded). muster J adopts
it. AQ.W2's `color-mix` migration is the substrate fix for muster's 64 bug-class `hsl(var())` sites,
delivered through the publish.
