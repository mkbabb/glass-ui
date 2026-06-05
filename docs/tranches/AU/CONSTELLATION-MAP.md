# Tranche AU — CONSTELLATION-MAP (the conjoint dependency map)

The single map of the multi-repo run that the dock-motion overhaul sits at the centre of.
glass-ui Tranche AU is the constellation **ROOT**: it owns the dock + animation work AND it cuts
**3.3.0**, the package every other repo consumes. This file is the binding sequencing + coordination
reference — the DAG, the publish hinge, the inv-16 write-boundaries (who writes what), and the order
of operations.

It does NOT re-derive the dock fix (that is `AU-AUGMENT.md §2`) or the wave table (`AU-AUGMENT.md
§3`). It maps the EDGES between repos. Where it cites a sibling, the line is traceable to that repo's
live tranche docs (read at author, 2026-06-05).

**Provenance.** Cross-checked against the live constellation blackboard
(`fourier-analysis/docs/constellation/tri-tranche-run/RUN-BOARD.md`), keyframes
(`keyframes.js/docs/tranches/D/`), slides (`slides/docs/tranches/F/`), and value.js
(`value.js/docs/tranches/M/`). Pins verified directly from each repo's `package.json`.

---

## §0 — The cast (five repos, one hinge)

| repo | role in this run | tranche | published / branch @ author | writes (inv-16) |
|---|---|---|---|---|
| **glass-ui** | ROOT — dock/animation owner; cuts 3.3.0 (the hinge) | **AU** (W8/W8b/W9/W10) | `3.2.0` on npm · branch `at-dock-convergence` (3.2.0-unpublished delta) | glass-ui src + `docs/tranches/AU/` |
| **keyframes.js** | READ-ONLY upstream spring engine; ALSO a downstream dock consumer (demo) | **D** (W5 gated) | `3.0.0` on npm · branch `tranche-d-impl` | keyframes src + `docs/tranches/D/`; pins glass-ui `^3.3.0` post-publish |
| **slides** | downstream — consumes 3.3.0 dock-motion fix | **F** (F.W5–W9 + the FG.W-* glass-ui-arm specs) | `0.1.0` · pins glass-ui `^3.2.0`, keyframes `^3.0.0` | slides src + `docs/tranches/F/`; pins glass-ui `^3.3.0` post-publish |
| **value.js** | downstream — the SINK (cohort-dep-free); blob `ColorResolver` + dock-fix consumer | **M** (M.W7 cohort, gated) | `0.10.0` · glass-ui demo-dep `file:../glass-ui` | value.js src + `docs/tranches/M/`; bumps glass-ui demo-dep `^3.3.0` post-publish |
| **fourier-analysis** | ORCHESTRATOR — the control-pane / RUN-BOARD host (NOT a 3.3.0 runtime consumer) | hub (`tri-tranche-run/`) | n/a — owns the blackboard | the constellation `tri-tranche-run/` docs only; edits NO sibling source (inv-16) |

**The one hinge.** Every cross-repo unblock fans out from a single artifact: **`@mkbabb/glass-ui`
`3.3.0` on npm**. The real check is `npm view @mkbabb/glass-ui version ≥ 3.3.0` — the published
package, never a sibling branch pin. This is RUN-BOARD edge **E1 [ROOT HINGE]**.

---

## §1 — The dependency DAG

The library import graph is a strict DAG sinking into value.js; the PUBLISH graph fans out of the
3.3.0 hinge. They are different graphs — keep them distinct.

### 1.1 The library import DAG (compile-time; who depends INTO whom)

```
slides ──▶ glass-ui(lib) ──▶ keyframes.js(lib) ──▶ value.js(lib)   [value.js = the SINK]
  └──────▶ keyframes.js(lib) ─────────────────────────┘
fourier-analysis ── (orchestrator; not in the runtime import graph)
```

- glass-ui consumes keyframes' **LIGHT** surface (`SpringProgress`, `springLinearStops()`,
  `springTimingFunction()`, `Timeline`, `ElementMorph`) — value.js-free. The dock driver uses
  `SpringProgress` but NO `fromString`, so ZERO value.js enters the bundle (`proof:vueuse-free-root`
  sibling discipline; `AU-AUGMENT.md §2.2`, `§6`).
- keyframes' HEAVY engine reaches value.js only via dynamic `loadAnimationEngine()` — never on the
  LIGHT path the dock drives.
- value.js is the cohort-dependency-free SINK (`value.js/docs/tranches/M/M.md:128`).

### 1.2 The publish/unblock DAG (the order things ship)

```
                         ┌──────────────────────────────────────────────┐
                         │  glass-ui AU.W8 → W8b → W9 → W10              │
                         │  (stages the 3.3.0 changeset; READY-TO-PUBLISH)│
                         └───────────────────────┬──────────────────────┘
                                                 │  USER-DOMAIN publish (confirm-first)
                                                 ▼
                                   ╔═════════════════════════════╗
                                   ║  E1 [ROOT HINGE]            ║
                                   ║  glass-ui 3.3.0 ON NPM      ║
                                   ╚══════════════╤══════════════╝
                  ┌───────────────────────────────┼───────────────────────────────┐
                  ▼                                ▼                                ▼
        ┌──────────────────┐           ┌──────────────────┐           ┌──────────────────┐
        │ keyframes D.W5   │           │ slides F deploy  │           │ value.js M.W7    │
        │ pin → ^3.3.0     │           │ pin → ^3.3.0     │           │ demo-dep → ^3.3.0│
        │ dock-rename +    │           │ dock-motion fix  │           │ blob extirpation │
        │ mask removal +   │           │ lands downstream │           │ (ColorResolver)  │
        │ occlusion close  │           │ (Cloudflare      │           │ + dock-fix +     │
        │ → demo deploy    │           │  Pages deploy)   │           │ v1.0.0 cut       │
        └────────┬─────────┘           └──────────────────┘           └──────────────────┘
                 │ (reciprocal, may never fire)
                 ▼
        ┌──────────────────────────────────────────┐
        │ E1b [circle-back] keyframes leverages a   │
        │ glass-ui <Role>Dock BASE component IFF    │
        │ AU.W8 ships one AND keyframes is its #2    │
        └──────────────────────────────────────────┘

        fourier-analysis ── orchestrates all of the above; writes none of it.
        feedback-coder (S3) ── RESOLVED-FALSE: ML/NLP, consumes none; inbox hand-off only.
```

### 1.3 The cross-repo edge table

Consumer → producer. The published artifact is the gate. Gate flips BLOCKED → CLEARED when the
artifact lands on npm (the real check, not a narration).

| edge | consumer → producer | gate artifact | real check | state @ author |
|---|---|---|---|---|
| **E1** [ROOT HINGE] | keyframes D.W5 + slides-F + value.js M.W7 → **glass-ui AU.W10** | glass-ui `3.3.0` on npm | `npm view @mkbabb/glass-ui version ≥ 3.3.0` | **BLOCKED** (3.2.0 published) |
| **E1b** [circle-back] | keyframes D.W5 `<Role>Dock` BASE leverage → **glass-ui AU.W8** | a role-typed dock base component (NET-NEW; BOOK until a 2nd consumer) | base ships in glass-ui AND keyframes is its #2 | **BLOCKED** (base is BOOK; reciprocal — may never fire) |
| **E2** | slides-F deploy (Cloudflare Pages) → **E1** | depends on glass-ui `3.3.0` published | E1 CLEARED + slides CI green on `main` | **BLOCKED** (gates on E1) |
| **E-blob** | value.js M.W7 blob extirpation → **E1** | glass-ui `3.3.0` ships `/goo-blob` + `/watercolor-dot` + `ColorResolver` | the 3 subpaths on npm (LANDED in src at AU.W7) | **BLOCKED** (gates on E1) |
| **E-valuepeer** | glass-ui 3.3.0 cut → **value.js 0.11.0** | value.js `0.11.0` on npm (the peer the 3.3.0 cut bumps `^0.10.0 → ^0.11.0`) | `npm view @mkbabb/value.js version ≥ 0.11.0` before the 3.3.0 cut | **BLOCKED** (value.js 0.10.0; see §4 note) |
| **E-spring** [frozen] | slides-F `deckSpring.ts` + glass-ui dock driver → keyframes spring surface | `springLinearStops` + `springTimingFunction` (`^3.0.0`) | signatures unchanged | **FROZEN** — no keyframes publish gates anyone; any sig change = breaking |
| **E3** [conditional] | feedback-coder L → E2 | IFF L consumes the slides framework | — | **RESOLVED-FALSE** — L is ML/NLP; inbox hand-off only |

**Notes.**
- E1b does NOT gate keyframes' LOCAL renames (`ChromeDock`/`TransportDock`), mask removal,
  `dock/index.ts` deletion, or square/mobile occlusion — those gate on **E1 only** (the published
  dock-correctness surface: dock base + touch-gate B′ `f0b0ffb`, both at glass-ui HEAD). E1b gates
  ONLY the reciprocal role-typed BASE component leverage (`keyframes.js/docs/tranches/D/waves/D.W5.md`,
  Edge 1 / Edge 2 split).
- keyframes' LIBRARY legs are GATE-FREE (`proof:boundary` — the lib is glass-ui/value-free). Only its
  DEMO/dock legs (D.W5) gate on E1.
- E-spring is FROZEN: keyframes consumes nothing of glass-ui's at the LIBRARY level. The edge runs the
  OTHER way at the demo level (D.W5 consumes the published 3.3.0 dock). No keyframes publish blocks
  anyone in this run.

---

## §2 — The publish hinge (E1) — mechanics

The 3.3.0 publish is the single irreversible leg that fans the run out. It is **USER-DOMAIN**
(confirm-first): agents stage to READY-TO-PUBLISH (CI green, changeset staged); the user finalizes
the SemVer tier + runs `changeset version` → tag → `release.yml` (glass-ui's CI is fully green for
gated provenance publish — push the `v*` tag, `release.yml` does the rest).

**What AU.W10 stages (the precondition for the hinge):**

1. The full gate matrix green (`gates:verify-ci`; the AU.W8/W8b/W9/W10 gates added at their wave —
   see `AU-AUGMENT.md §6.1`).
2. The 3.3.0 changeset staged, **NOT auto-published** (`proof:au-final`).
3. The value.js peer bump in the manifest: `@mkbabb/value.js` peer + devDep `^0.10.0 → ^0.11.0`
   (see §4 — this is a precondition the value.js side surfaces; the cut ships against value.js
   `0.11.0`, not the stale `0.10.0`).

**What the hinge unblocks (in dependency order — RUN-BOARD §3 PUBLISH LEDGER):**

1. **glass-ui 3.3.0 → npm** — owner glass-ui (S2). The ROOT publish.
2. **keyframes demo deploy** — owner keyframes (S1). Gated on (1). D.W5 bumps `file:../glass-ui →
   ^3.3.0`, CI green, demo (gh-pages) deploys.
3. **slides-F deploy** — owner slides (S2). Gated on (1). Pin bump `^3.2.0 → ^3.3.0`, the dock-motion
   fix lands downstream, Cloudflare Pages deploy.
4. **value.js M.W7 + v1.0.0** — owner value.js. Gated on (1). Bumps glass-ui demo-dep `→ ^3.3.0`,
   extirpates the two bespoke blob facilities onto `/goo-blob` + `/watercolor-dot`, cuts v1.0.0.

Each downstream owner CIRCLES BACK to gate-free waves or HEARTBEAT-POLLS `npm view` until E1 clears —
no idle, no branch-pin shortcut against an unpublished base (inv-16′: pin the PUBLISHED package, never
`file:../glass-ui` against a dirty in-flight tree).

---

## §3 — The inv-16 write-boundaries (who writes what)

inv-16 is the spine of the whole run: **each session writes ONLY its own repo's source + its own
tranche docs.** No session writes a sibling's source. The cross-repo edges are PUBLISHED-SURFACE
edges (npm artifacts), never branch pins or direct edits.

| session / repo | writes | reads (consumes) | NEVER writes |
|---|---|---|---|
| **glass-ui (AU)** | glass-ui `src/` + `docs/tranches/AU/` | keyframes published LIGHT surface (`^3.0.0`); value.js published (`^0.11.0`) | keyframes, slides, value.js, fourier source |
| **keyframes.js (D)** | keyframes `src/` + `docs/tranches/D/` | glass-ui published `^3.3.0` dock (D.W5, post-E1) | glass-ui, slides, value.js source |
| **slides (F)** | slides `src/` + `docs/tranches/F/` | glass-ui published `^3.3.0`; keyframes published `^3.0.0` | glass-ui, keyframes, value.js source |
| **value.js (M)** | value.js `src/` + `docs/tranches/M/` | glass-ui published `^3.3.0` (demo) | glass-ui, keyframes, slides source |
| **fourier-analysis** (orchestrator) | `tri-tranche-run/` blackboard docs ONLY | all sibling tranche docs (read-only) | EVERY sibling's source (it is the hub; it edits none) |

**Three boundary facts that govern this run:**

1. **keyframes is READ-ONLY upstream for the dock fix.** The spring solver, `springLinearStops`,
   `AnimationGroup`, `ElementMorph` are all consumed via the published surface; **no keyframes change
   is required** for the dock overhaul. glass-ui's `scripts/regen-spring-tokens.mjs` runs the
   keyframes solver at BUILD time to bake the `--spring-*` CSS `linear()` tokens; the new
   `--spring-dock` (`~15–30%` overshoot, ζ≈0.5) is authored by the SAME solver at glass-ui BUILD time
   — a parameter-tuning call, not a new keyframes export (`AU-AUGMENT.md §2.2`, `§2.3`).

2. **The dock-lag fix is glass-ui-owned, NOT slides-local.** slides' F arm explicitly hands the
   `dock.css`/`useLayerTransition` work to the glass-ui session and writes ZERO glass-ui this tranche
   (`slides/docs/tranches/F/COORDINATION.md` — "Hand to AT; do not edit dock.css from a slides
   session"). slides' only act is the pin bump.

3. **The constellation (Canvas2D) stays slides-local.** The D5 ask ("abstract into a glass-ui
   component") is KEEP-DEFERRED — `useCanvas2D` BOOK, single-consumer, Canvas2D ≠ the WebGL substrate
   (`AU-AUGMENT.md §4`). The visibility fixes the user reports are slides-local token work, not a
   glass-ui lift.

---

## §4 — The value.js peer-bump knot (a precondition on the cut, not a downstream)

value.js sits on BOTH sides of the 3.3.0 cut, which is easy to miss:

- **Downstream (post-publish):** value.js M.W7 consumes the published 3.3.0 to extirpate its bespoke
  blobs onto `/goo-blob` + `/watercolor-dot` + the injected `ColorResolver` (the blob primitives
  LANDED in glass-ui src at AU.W7; they ship on the 3.3.0 cut). This is edge **E-blob**, gates on E1.
- **Upstream-of-the-cut (precondition):** the 3.3.0 cut must bump its `@mkbabb/value.js` peer +
  devDep `^0.10.0 → ^0.11.0`. The `^0.10.0` range EXCLUDES 0.11.0; without the bump the cut ships
  against a stale peer (`value.js/docs/tranches/M/M.md:143-149`). This means value.js must publish
  `0.11.0` BEFORE (or concurrent with) the 3.3.0 cut for the manifest to resolve cleanly. This is
  edge **E-valuepeer**.

**Disposition for AU.** E-valuepeer is a manifest precondition AU.W10 carries as a named line in the
3.3.0 changeset; the value.js `0.11.0` publish is value.js-owned (M tranche, user-domain). If
`0.11.0` is not yet on npm at the 3.3.0 cut, AU surfaces the dependency and the user sequences the two
publishes (value.js `0.11.0` first, then glass-ui `3.3.0`). The blob-color contract is already proved
bit-identical to value.js's Ottosson CPU port (`proof:blob-color-equivalence` 8/8, `~2e-16`;
PROGRESS.md AU.W7), so the runtime edge is settled — only the SemVer-range manifest line is the knot.

---

## §5 — Order of operations (the sequence, in prose)

The run executes as one ordered spine with parallel arms. Read top to bottom; indented lines run in
parallel within their phase.

**Phase A — glass-ui drives to the cut (the ROOT, blocking everything).**
AU.W8 lands FIRST as the one atomic motion+a11y+vocab commit: the single-frame FLIP sync
(`useLayerTransition.ts:146→167`), the `--spring-dock` author + route, the keyframes `AnimationGroup`
one-rAF driver (LIGHT surface), the reka-Tabs rail, the a11y contract, the `<Role>Dock` docs
vocabulary — gated by `proof:dock-motion-single-source` + `proof:dock-a11y-contract` +
`proof:dock-vocabulary`. AU.W8b follows (modern-CSS + encapsulation/styling folds; must NOT gate the
W8 publish contract). AU.W9 folds the control-pane + dark-ergonomics + the publish-gated slides-supply
(`proof:au-w9-consumers`). AU.W10 closes: stages the 3.3.0 changeset, runs the overfitting audit,
greens the matrix, carries the value.js peer-bump line, writes `AU.FINAL` (`proof:au-final`). State
reaches READY-TO-PUBLISH. **Downstream sessions HEARTBEAT-POLL E1 throughout Phase A; they circle
back to gate-free waves, never idle.**

**Phase B — the value.js peer publish (precondition on the cut).**
value.js publishes `0.11.0` (M tranche, user-domain) so the 3.3.0 manifest's `^0.11.0` peer range
resolves. If already on npm, this phase is a no-op. (E-valuepeer.)

**Phase C — the hinge: glass-ui 3.3.0 → npm (USER-DOMAIN, confirm-first).**
The user finalizes the SemVer tier, runs `changeset version` → tag → `release.yml`. `npm view
@mkbabb/glass-ui version` flips to `3.3.0`. **E1 CLEARS.** This single event fans the run out.

**Phase D — the downstream fan-out (parallel arms, all gated on Phase C).**
- *keyframes arm (D.W5):* pin `file:../glass-ui → ^3.3.0`, CI green, then dock-rename
  (`TopDock→ChromeDock`, `AnimationMenuBar→TransportDock`, adopting the AU.W8 docs vocabulary), mask
  removal at both live sites, `dock/index.ts` deletion, square/mobile occlusion close, demo (gh-pages)
  deploy. D.W6 cuts the FINAL.
- *slides arm (F deploy):* pin `^3.2.0 → ^3.3.0`, typecheck (the overflow clean-break is a no-op
  migration — slides uses no `wrap`/`overflow` prop), test + `deck.spec.ts` e2e + the binding-verify
  sweep, then the dock-motion fix lands downstream and slides deploys to Cloudflare Pages
  (`slides.friday.institute`).
- *value.js arm (M.W7):* bump glass-ui demo-dep `→ ^3.3.0`, extirpate the two bespoke blob facilities
  onto the shipped `/goo-blob` + `/watercolor-dot` + the injected `ColorResolver`, fold the dock fix,
  cut v1.0.0.

**Phase E — reciprocal circle-back (conditional, may never fire).**
IFF AU.W8 lands a role-typed `<Role>Dock` BASE component AND keyframes becomes its 2nd consumer,
keyframes circles back to leverage it (E1b). At HEAD no such base exists — the `<Role>Dock` names are
a docs vocabulary + local-rename convention, not a shipped component; the base is BOOK until a 2nd
consumer. This edge is NAMED and watched, not scheduled.

**Out of band — fourier-analysis (orchestrator) + feedback-coder (S3).**
fourier-analysis hosts the RUN-BOARD and drives the dependency-order unblocks; it writes no sibling
source. feedback-coder (S3) is RESOLVED-FALSE for this chain (ML/NLP; consumes no UI repo) — it gets
an inbox hand-off only, never enters the publish spine.

---

## §6 — The single critical path

The longest blocking chain, the one that sets the run's wall-clock:

```
AU.W8 → AU.W8b → AU.W9 → AU.W10 (READY-TO-PUBLISH)
   → [value.js 0.11.0 publish, if not already]   (E-valuepeer precondition)
   → glass-ui 3.3.0 → npm (E1, USER-DOMAIN)       ← THE HINGE
   → { keyframes D.W5 deploy ∥ slides-F deploy ∥ value.js M.W7+v1.0.0 }
```

Everything downstream of E1 is parallel; nothing downstream can start before it. **The whole run's
throughput is set by glass-ui reaching READY-TO-PUBLISH and the user pulling the publish trigger.**
The dock-motion overhaul (AU.W8) is therefore the highest-leverage single deliverable in the
constellation — it is both the user's headline pain fix AND the gating content of the root publish.

---

## §7 — Risks to the conjoint sequencing

| risk | repo edge | mitigation |
|---|---|---|
| 3.3.0 cuts against stale value.js `^0.10.0` peer | E-valuepeer | AU.W10 carries the `^0.11.0` bump line; sequence value.js `0.11.0` BEFORE the cut (§4) |
| downstream pins a dirty branch (`file:../glass-ui`) instead of the published `^3.3.0` | E1 / inv-16′ | each downstream's first post-E1 act is the PUBLISHED-package pin move; never branch-pin against an unpublished base |
| `interpolate-size` double-animates with the VT path | glass-ui internal (W8b) | browser-test before landing; `@supports`-gate; the visibility fork stays 3-state (`AU-AUGMENT.md §6`) |
| a keyframes LIGHT-surface signature drifts and breaks the dock driver | E-spring (FROZEN) | E-spring is frozen by contract — `{response,dampingFraction}→linear()` and `(t)→pos` are stable; D.W4's `tick→advanceTo` rename touches the HEAVY boundary, NOT the LIGHT exports |
| slides dock-motion regression on the pin bump | E2 | the binding-verify sweep + `deck.spec.ts` e2e on bump (glass-ui-binding-verification precept — stale reka bindings silently no-op) |
| E1b scheduled as a blocker when it is reciprocal | E1b | E1b is NAMED, not scheduled — it may never fire; it gates ONLY the role-typed BASE leverage, not the local renames |
