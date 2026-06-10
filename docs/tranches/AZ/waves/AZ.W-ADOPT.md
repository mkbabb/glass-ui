# AZ.W-ADOPT — slides constellation RE-ARCHITECTURE: kill the 547-line bespoke engine, consume `@mkbabb/glass-ui/constellation`, re-stamped to 3.10.1

**Track:** X (cross-repo) · **Type:** refactor + gate · **Repo of effect:** slides (`/Users/mkbabb/Programming/slides`) · **Spec authored in:** glass-ui (`docs/tranches/AZ/waves/AZ.W-ADOPT.md`)
**Depends on:** the glass-ui `3.10.1` publish (LIVE — registry `latest` carries 3.11.0 today, `3.10.1` is the AY close cut already published with provenance; the constellation seams ship in the published `3.10.1` dist) **+ the slides re-pin** (the caret `^3.9.0` → the EXACT `3.10.1`). NO AZ dependency: this wave can run at Batch 0 against the already-published `3.10.1` — it waits only if the user prefers ONE slides re-pin over two.
**STATUS: SPEC**

This wave is the slides half of the cross-repo convergence arm — the re-stamp of the prior **`L.W-ADOPT`** parent spec (`/Users/mkbabb/Programming/slides/docs/tranches/L/waves/L.W-ADOPT.md`) against the on-disk reality the R3 audit + the fleet found: the pin target moved (`3.10.0` is registry-DEPRECATED, `3.10.1` is the true close cut), and the deck shrank from three constellation canvases to TWO. It kills the single most-cited bespoke surface in the engagement — the 547-line `src/decks/til-briefing/constellation.ts` god-module — and re-points the deck onto the perfected `@mkbabb/glass-ui/constellation` SFC.

It is NOT a delete-and-import: the bespoke imperative DOM-scan controller (one shared RAF across N `<canvas data-constellation>` markups) and the library declarative per-instance SFC have INCOMPATIBLE integration models, so this is a RE-ARCHITECTURE — the scanner deck-effect becomes N mounted `<Constellation>` components, the bespoke `drawAnomaly` skin is re-authored as a slides `drawOverlay`, and the deterministic `?freeze` capture the deploy pipeline depends on rides the lib's W-CON3 hook rather than the bespoke `location.search` regex.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

The fleet evidence below is from `FLEET-DIGEST.md` findings **A4L-11** (un-started) and **A4L-13** (the exact enumeration). It was re-verified live on disk while authoring this spec, but a digest compresses and the slides repo is on a moving branch (`tranche/til-briefing-M`). RE-GREP all of the following against the slides HEAD before editing — if any cite has drifted, STOP and report a scope-reveal (do not blind-edit):

1. **The pin is un-started.** `grep '"@mkbabb/glass-ui"' /Users/mkbabb/Programming/slides/package.json` → expect `"@mkbabb/glass-ui": "^3.9.0"` (verified at `package.json:27`). `cat node_modules/@mkbabb/glass-ui/package.json | grep version` → expect `3.9.0` installed.
2. **The bespoke engine exists.** `test -f /Users/mkbabb/Programming/slides/src/decks/til-briefing/constellation.ts && wc -l` → expect `547` (verified). `grep -n 'createConstellations' src/decks/til-briefing/deck.ts` → expect the import at `:3` and the `onMount` driver at `:53-56` (verified `deck.ts:3,54`).
3. **TWO canvases, not three.** `grep -rn 'data-constellation' src/decks/til-briefing/slides/` → expect EXACTLY two markup sites: `SlideIntro.vue:28` (anomaly `0.60,0.36`, label `"anomaly"`, count `70`) and `SlideCloser.vue:34` (resolved, anchor `0.52,0.62`, label `"resolved"`, count `70`). The L.W-ADOPT parent named `SlideTitle.vue` / `SlideHandoff.vue` / `SlideAsk.vue` — ALL GONE (renamed). Confirm those three files do NOT exist.
4. **The lib seam is published + resolvable at 3.10.1.** `npm view @mkbabb/glass-ui@3.10.1 'exports[./constellation]'` → expect `{ types: ./dist/constellation.d.ts, import: ./dist/constellation.js }` (verified). After the re-pin, `node -e "import('@mkbabb/glass-ui/constellation')"` must resolve against `node_modules`.
5. **The gate is not homed.** `grep no-bespoke /Users/mkbabb/Programming/slides/package.json /Users/mkbabb/Programming/slides/scripts/*` → expect ZERO hits (the gate is born-RED, homed by this wave).
6. **The slides branch is M-owned.** This wave touches NO `docs/tranches/M/**` file and NO `docs/tranches/L/**` file beyond the audit/PROGRESS artefacts this wave creates under `docs/tranches/L/`. The M tranche disposes the owed L waves (`M.md:108` "L.W-ADOPT is UNAFFECTED — both canvases survive M's manifest"); reading an M row to confirm supersession is allowed, editing one is forbidden.

## §1 — Goal criterion

The slides til-briefing deck consumes `@mkbabb/glass-ui/constellation` for BOTH surviving constellation surfaces (the SlideIntro cover anomaly + the SlideCloser resolved bookend) with **no behaviour delta** in the anomaly mark, the resolved-check, the dashed callout, the wandering drift, the slide-enter re-fit, the click-warp, or the deploy-capture determinism — and the 547-line bespoke `constellation.ts` god-module is GONE. The library pin is the EXACT `3.10.1` (the true AY close cut, NOT the deprecated `3.10.0`, NOT a caret that silently auto-resolves). A slides-homed `proof:no-bespoke-constellation` gate enforces the deletion + the adoption fail-closed, born-RED at HEAD.

## §2 — Completion criterion

The single hard gate (§7) verifies, on artefacts: the pin is the literal string `"3.10.1"` (a build-diff of `package.json` + `package-lock.json`, not a caret, not `3.10.0`); `constellation.ts` does not exist (a deletion proof + `git diff --stat` showing −547); `proof:no-bespoke-constellation` GREEN (the four fail-closed assertions); a captured FRAME-BUDGET DELTA proving the N-instance RAF model is within budget of the shared-RAF baseline (a numeric mean-frame-time readback on the cover slide, not an eyeball); a perceptual-diff PASS proving the `?freeze` pptx + `shoot.mjs` static captures of the TWO surviving canvases render identically before vs after the swap in BOTH modes (4 frames, not 6 — two canvases × {light, dark}); `vue-tsc --noEmit && vite build` green; `proof:deck-copy-conformance` green; and the captured DELTA registered in `L/PROGRESS.md` so the slides `proof:live-verified-ledger` passes on this row.

---

## §3 — The defect (file:line, re-stamped against slides HEAD; A4L-11/A4L-13)

### D1 — the pin is a CARET, and the parent's pin target is STALE-DEPRECATED

`slides/package.json:27` → `"@mkbabb/glass-ui": "^3.9.0"`. A caret is NOT a pin; the L.W-ADOPT parent named the target `3.10.0` (`L.W-ADOPT.md:169`). Both are wrong at HEAD: `npm view @mkbabb/glass-ui@3.10.0 deprecated` returns the stale-cut message ("Stale pre-close artifact published outside the gated release path — pin 3.10.1, the true AY close cut"). The re-pin target is the EXACT `3.10.1`. The caret would silently auto-resolve a new minor on the next `npm ci` — the surprise-resolution hazard the cross-repo dev-resolution contract-v2 exists to prevent (glass-ui CLAUDE.md invariant 30). The re-pin is the FIRST edit and is itself a hard-gate clause.

### D2 — the two constellations have INCOMPATIBLE integration models (re-architecture, not a swap)

- **slides bespoke** (`src/decks/til-briefing/constellation.ts`, 547 lines — `wc -l` confirmed; >500 god-module floor) is an IMPERATIVE DOM-scanning controller. `createConstellations(root)` scans `root` for ALL `<canvas data-constellation>` elements and drives every one from a SINGLE controller + ONE shared RAF. Mounted once at the deck level (`deck.ts:53-56`, `onMount(root){ const c = createConstellations(root); return () => c.destroy() }`). TWO slides carry the canvas markup contract:
  - `SlideIntro.vue:28-29` — `<canvas class="scatter" data-constellation data-anomaly="0.60,0.36" data-anomaly-label="anomaly" data-count="70" aria-hidden="true">` (the cover anomaly)
  - `SlideCloser.vue:34-35` — `<canvas class="scatter" data-constellation data-resolved data-anomaly="0.52,0.62" data-anomaly-label="resolved" data-count="70" aria-hidden="true">` (the resolved bookend)
- **glass-ui** (`src/components/custom/constellation/Constellation.vue`, on `@mkbabb/glass-ui/constellation`) is a DECLARATIVE per-instance SFC: `<Constellation :count :seed :warp-on-click :freeze :draw-overlay />`, each instance owning its OWN canvas, RAF, and palette readback, composing the `useCanvas2D` substrate (so it inherits the offscreen / tab-hidden / reduced-motion freeze for free). The `seed` prop accepts `number | string` (`Constellation.vue:99`), so `seed="intro"` / `seed="closer"` are valid. There is **no `data-constellation` scan, no shared controller, no `anomaly` position prop, no `resolved` prop** — the anomaly placement + skin is the consumer's `drawOverlay(ctx, field, now)` pass.

The migration is therefore a MODEL CHANGE (a markup-scanner deck-effect → two mounted Vue components, each with its own `drawOverlay`), not a one-line import swap.

### D3 — the deploy pipeline depends on the bespoke `?freeze` seam (now in the lib)

The bespoke engine reads `location.search` for `export|print|freeze` and lays out a REPRODUCIBLE STATIC frame (seeded `mulberry32`, no live RAF). The deploy chain DEPENDS on it: `scripts/shoot.mjs` + `scripts/export-pptx.mjs` render each slide at `…?export…` for the screenshots + the PPTX. AY.W-CON3 grew the `?freeze` seam INTO the lib (auto-derives from `location.search` matching `export|print|freeze`, overridable by an explicit `:freeze` prop) and it ships in the published `3.10.1` (A4L-4 ADDRESSED: `freeze?: boolean` auto-derive, live-verified). This wave CONSUMES that seam; it does NOT re-port the bespoke regex.

### D4 — the anomaly skin, the drift, and the resolved-check are NOT free on adoption

The bespoke `drawAnomaly` paints a pulse ring, an inner ring, a soft halo, the core dot, a resolved-checkmark (drawn `if (this.resolved)`), and a dashed monospace callout label. The anomaly DRIFT jitter-re-targets the pinned node over ~2.6s, clamped to ±0.14 of the seeded anchor. glass-ui ships NEITHER as a prop — they are the consumer's `drawOverlay`. The seams that make the re-author possible all ship in 3.10.1: AY.W-CON1 built the auto-DRIFT target-source + `refitField` (A4L-6 ADDRESSED — without it the slide-enter re-fit + wandering regress), AY.W-CON2 the warp (A4L-5 ADDRESSED — `warpOnClick` + the exported `warpTo`/`setWarpTarget`/`warpSettled`), AY.W-CON3 the `drawOverlay` RECIPE in the README (A4L-7 ADDRESSED — a copy-pasteable skin pinned to `field.warp.{x,y}`). This wave RE-AUTHORS `drawAnomaly` + the resolved-check + the callout as a slides `drawOverlay` from that recipe — real migration work (§4), not a free swap.

### D5 — the gate does not exist; it is homed in SLIDES, not glass-ui

`grep no-bespoke slides/package.json slides/scripts/` → 0 hits. A gate asserting the SLIDES bespoke copy is gone must inspect SLIDES `src/`. This wave HOMES it at `slides/scripts/proof-no-bespoke-constellation.mjs` + registers `proof:no-bespoke-constellation` in `slides/package.json`, born-RED at HEAD (the bespoke copy + the scanner exist), GREEN at this wave's close.

---

## §4 — The integration-model port (the re-architecture, concretely)

### 4.1 — DOM-scan controller → 2 declarative mounts

`deck.ts`'s `onMount(root)` deck-effect (`:53-56`) is DELETED along with the `import { createConstellations }` (`:3`). Each of the TWO slides mounts its own `<Constellation>`. The component composes `useCanvas2D`, so each instance owns its RAF and inherits the offscreen/hidden/reduced-motion park — there is no shared controller to tear down, and the inactive-slide park is automatic (the bespoke copy had NO offscreen park, only a PRM park). The `seed` prop (a string, hashed via the shared `mulberry32`) replaces the bespoke per-index seed — a stable per-slide seed (`"intro"` / `"closer"`) gives the reproducible field the deterministic capture needs.

### 4.2 — the FRAME-BUDGET concern (D2 consequence)

Replacing ONE shared RAF with N independent RAF loops is a measurable frame-budget change. Because each `<Constellation>` parks when its slide is inactive (the `useCanvas2D` `content-visibility` / `document.hidden` park), at most ONE constellation steps at a time on the live deck — so the budget is expected at-or-below the shared-RAF baseline, not 2×. "Expected" is not evidence. The `frame-budget.mjs` harness (§5 #11) captures the mean frame time over a fixed window on the cover slide (SlideIntro) under both the bespoke baseline (a pre-swap tag) and the adopted model, and asserts the adopted mean is within `baseline + 1.5 ms` (the one-frame-at-120Hz slack). This is the §7 frame-budget gate clause — a numeric readback, not an eyeball.

### 4.3 — `drawAnomaly` → `anomalyOverlay` (D4)

`constellationOverlay.ts` (NEW, ≤120 lines, a skin not an engine — the ONLY slides-local constellation code that survives) exports a factory:

```ts
export function anomalyOverlay(opts: {
    anchor: [number, number];   // the seeded normalized position ([0.60, 0.36] | [0.52, 0.62])
    label?: string;             // the dashed monospace callout ("anomaly" | "resolved")
    resolved?: boolean;         // draw the checkmark over the core
}): (ctx: CanvasRenderingContext2D, field: ConstellationField, now: number) => void;
```

It re-paints the bespoke `drawAnomaly` passes (pulse ring, inner ring, soft halo, core dot, the resolved checkmark, the dashed callout) reading the accent off the live `--constellation-accent` palette on the field, and pins to `field.warp.{x,y}` (the auto-drift focal AY.W-CON1 built) rather than the bespoke `nodes[0]`. Under `?freeze` the overlay receives the frozen `now`, so the pulse phase is deterministic (AY.W-CON3 guarantees the frozen frame does not advance). The resolved-check + callout are byte-for-byte the same geometry — the perceptual-diff (§7) is the proof of identical render.

### 4.4 — the neutral edge-floor question

The bespoke engine carried `--constellation-edge-floor` (the neutral-edge alpha minimum that fixed a prior light-mode visibility defect) + `--constellation-edge-anomaly-alpha` (the red-edge multiplier). The library `drawEdges` has no floor and no anomaly-edge concept. The anomaly edge tint moves INTO the `anomalyOverlay` skin (it is anomaly-domain, not field-neutral). The neutral edge-floor is verified at adopt: the §7 perceptual-diff confirms the lib's neutral edges read on cream in the captured frames; if a regression appears, the slides token override `--constellation-edge-floor` is RE-APPLIED (a deck-CSS token the lib edge alpha reads) — but ONLY if the capture shows unpainted edges, NOT speculatively (the capture is the arbiter).

---

## §5 — Edit-sites (exact, re-stamped to 3.10.1 + the TWO canvases)

| # | File | Edit |
|---|---|---|
| 1 | `slides/package.json:27` | `"@mkbabb/glass-ui": "^3.9.0"` → `"@mkbabb/glass-ui": "3.10.1"` (exact, no caret, NOT 3.10.0) |
| 2 | `slides/package-lock.json` | regenerated against the published `3.10.1` (orchestrator install — the agent edits the manifest + verifies resolution) |
| 3 | `slides/src/decks/til-briefing/constellation.ts` | **DELETE** (547 lines) |
| 4 | `slides/src/decks/til-briefing/deck.ts:3` | DELETE `import { createConstellations } from "./constellation"` |
| 5 | `slides/src/decks/til-briefing/deck.ts:51-56` | DELETE the `onMount(root){ createConstellations… }` deck-effect (the per-slide `<Constellation>` mounts replace it; keep the surrounding manifest comment block accurate) |
| 6 | `slides/src/decks/til-briefing/slides/SlideIntro.vue:28-29` | `<canvas data-constellation …>` → `<Constellation :count="70" seed="intro" :warp-on-click :draw-overlay="anomalyOverlay({ anchor: [0.60, 0.36], label: 'anomaly' })" :freeze="capture" class="scatter" aria-hidden="true" />`; import `Constellation` from `@mkbabb/glass-ui/constellation` + the shared `anomalyOverlay`/`capture` from the new skin module |
| 7 | `slides/src/decks/til-briefing/slides/SlideCloser.vue:34-35` | same swap, `:count="70" seed="closer"`, `:draw-overlay="anomalyOverlay({ anchor: [0.52, 0.62], label: 'resolved', resolved: true })"` (the resolved bookend) |
| 8 | `slides/src/decks/til-briefing/constellationOverlay.ts` | **NEW** — the re-authored `drawAnomaly`+resolved-check+callout as a `drawOverlay` factory (§4.3; the AY.W-CON3 recipe; ≤120 lines, a skin not an engine) + the `capture` derive (re-export or re-read the deck's existing `captureMode`/`?export` signal) |
| 9 | `slides/scripts/proof-no-bespoke-constellation.mjs` | **NEW** — the §6 fail-closed gate (homed HERE) |
| 10 | `slides/package.json` scripts | register `"proof:no-bespoke-constellation": "node scripts/proof-no-bespoke-constellation.mjs"` |
| 11 | `slides/scripts/frame-budget.mjs` | **NEW** — the FRAME-BUDGET DELTA harness (mean-frame-time readback on the SlideIntro cover slide; baseline tag + adopted tag) |
| 12 | `slides/docs/tranches/L/audit/befitting-component-inventory.md` | **NEW** — the §A inventory (every slides visual × keep/lift/consumed × ≥2-consumer verdict) |
| 13 | `slides/docs/tranches/L/PROGRESS.md` | register the FRAME-BUDGET numbers + the 4-frame perceptual-diff set (orchestrator-owned status write) so `proof:live-verified-ledger` passes on this row |

**Scope-fence note on the feedback-coder Fourier preset:** the L.W-ADOPT parent §3 #12 carried an edit to annotate `feedback-coder/theme.css` `--m-red: var(--viz-fourier)` as a named preset. That annotation is OPTIONAL in this wave (it is a separate deck's token doc, not on the constellation critical path); if the orchestrator declines it to keep the wave tight, record it as a named successor (the befitting inventory §A row notes "documented-preset annotation deferred — feedback-coder Fourier identity stays deck-local"). Do not let it block the constellation arm.

---

## §6 — The slides-side gate (homed HERE; the AY.W-CON3 §5 spec, copy-in-ready)

**File:** `slides/scripts/proof-no-bespoke-constellation.mjs` · **Entry:** `"proof:no-bespoke-constellation": "node scripts/proof-no-bespoke-constellation.mjs"`.

Four fail-closed assertions (exit NON-ZERO on any miss):

1. **Deletion-proof.** `src/decks/til-briefing/constellation.ts` does NOT exist (`fs.existsSync` → false).
2. **No `createConstellations` survivor.** A grep over `src/` for `createConstellations` AND `ConstellationController` AND `data-constellation` returns ZERO hits (no orphan import, no dead canvas attribute, no surviving scanner contract).
3. **Lib import resolves.** `src/decks/til-briefing/` imports `Constellation` from `@mkbabb/glass-ui/constellation` (a grep asserts the import PRESENT) AND `node -e 'import("@mkbabb/glass-ui/constellation")'` resolves against `node_modules` (the pin advanced to `3.10.1` — the substrate is real, not a phantom import).
4. **Freeze-seam consumed.** At least one slide mounts `<Constellation>` reading the `freeze` seam (an explicit `:freeze` bind OR a documented reliance on the auto-`location.search` derive — a grep + the `constellationOverlay.ts` comment assert the deploy capture path is wired), so the pptx/shoot determinism is preserved post-adopt.

**Born-RED at HEAD:** `constellation.ts` exists (assertion 1 REDs), `createConstellations` is imported in `deck.ts:3,54` (assertion 2 REDs). The gate cannot pass until this wave does the work. The gate is grep+resolve; the BEHAVIOUR proof is the §7 perceptual-diff, NOT the grep (grep-only is insufficient for a runtime feature).

---

## §7 — HARD GATE

This wave closes when ALL of the following verify on artefacts:

1. **The pin is the EXACT `3.10.1` (not a caret, not `3.10.0`).** `grep '"@mkbabb/glass-ui"' package.json` returns the literal `"@mkbabb/glass-ui": "3.10.1"` (no `^`, no `~`); `package-lock.json` resolves `@mkbabb/glass-ui` to `3.10.1`; `npm view @mkbabb/glass-ui@3.10.1 version` == `3.10.1` (published — the AY publish hinge cleared). A grep asserting the pin is NOT `3.10.0` (the deprecated cut).
2. **The bespoke engine is DELETED (deletion proof).** `test ! -f src/decks/til-briefing/constellation.ts` passes; `git diff --stat` shows `constellation.ts | 547 ------…` AND `deck.ts` loses the `createConstellations` import + the `onMount` effect.
3. **`proof:no-bespoke-constellation` GREEN.** `npm run proof:no-bespoke-constellation` exits 0 (all four §6 assertions) and exits NON-ZERO if `constellation.ts` is restored (a born-RED re-check).
4. **A captured FRAME-BUDGET DELTA (numeric, not eyeball).** `node scripts/frame-budget.mjs` reports the mean frame time on the SlideIntro cover slide for the bespoke baseline and the adopted 2-instance model; the adopted mean is within `baseline + 1.5 ms`. The two numbers + the delta are registered in `L/PROGRESS.md`.
5. **The `?freeze` deploy capture renders IDENTICALLY (perceptual-diff PASS).** A before/after `?export`/`?freeze` capture of the TWO surviving canvases (SlideIntro + SlideCloser) in BOTH light and dark (**4 frames**, not the parent's 6 — the deck has two canvases now, not three), bespoke vs lib-adopted, diffed with `pixelmatch`; the per-frame mismatch ratio is below the determinism tolerance (≤ 0.5% — the anomaly mark / resolved-check / callout / drift must be perceptually identical). The 4-frame capture set is the paired DELTA artefact registered in `L/PROGRESS.md`.
6. **`vue-tsc --noEmit && vite build` green** (the lib import resolves at build time; the two slide SFCs typecheck against the `Constellation` props + the `drawOverlay` signature).
7. **`proof:deck-copy-conformance` green** (the swap touched no copy lines, but the gate re-runs).
8. **The befitting-component inventory exists** (`docs/tranches/L/audit/befitting-component-inventory.md`) with a verdict per surface and the deck-chassis named as keep-bespoke-this-tranche with the ≥2-consumer roadmap note.
9. **The captured DELTA is registered so `proof:live-verified-ledger` passes on this row** — the frame-budget numbers + the 4-frame perceptual-diff set are in `L/PROGRESS.md`, machine-required by the slides cardinal gate (ported in L.W4), NOT a commit-message claim.

## §A — The befitting-component inventory (the convergence CLASS)

Authored at `slides/docs/tranches/L/audit/befitting-component-inventory.md`. Every slides visual surface × verdict × ≥2-consumer evidence. The binding rows (re-stamped from the L.W-ADOPT §5 table, two-canvas reality):

| Surface | State at HEAD | Verdict | Evidence / rationale |
|---|---|---|---|
| `constellation.ts` (bespoke engine) | bespoke 547-line god-module | **LIFT → consume** `@mkbabb/glass-ui/constellation` | this wave; the exemplar to KILL |
| SlideIntro/SlideCloser anomaly skin | bespoke `drawAnomaly` | **CONSUME via `drawOverlay`** | re-authored §4.3; the skin stays consumer-local (deck-domain), the ENGINE is the lib's |
| `feedback-coder` Fourier hero | consumes `@mkbabb/glass-ui/fourier-field` | **ALREADY CONSUMED** (keep) | the `--m-red: var(--viz-fourier)` re-point → DOCUMENT as a named preset (§5 #scope-fence note; deferrable) |
| `src/deck/` chassis | bespoke deck engine, "consumer #1 of /deck" in-source | **KEEP-bespoke-this-tranche** (no `/deck` publish target) | the W-DECK elephant; ≥2-consumer bar UNMET until a 2nd deck wants it — a named roadmap note, NOT a silent drop |
| `DeckGate.vue` access modal | consumes glass-ui `Dialog/Button/Input` | **ALREADY CONSUMED** (keep) | leaf consumption clears the bar |
| `StatusDot` (N sites) | consumes `@mkbabb/glass-ui/status-dot` | **ALREADY CONSUMED** (keep) | leaf widget |

The inventory's binding assertion: NO deck reimplements a befitting glass-ui visual after this wave (constellation lifted; fourier consumed); deck-local token re-points are documented presets, not silent forks.

## §8 — Scope fence + HARD BOUNDARIES (inherited, never agent-executed)

- **READ-ONLY in slides docs/tranches/M/** — the M tranche is foreign (another session owns `tranche/til-briefing-M`); read an M row to confirm supersession, never edit one.
- The glass-ui `3.10.1` publish is USER-DOMAIN — the agent re-pins ONLY after `npm view @mkbabb/glass-ui@3.10.1 version` confirms it is live (it is). The `package-lock.json` install against the published registry version is run by the orchestrator (the agent edits the manifest + verifies resolution).
- The git index, the access key `wolfpack-ledger-2026`, and the deploy push are USER-DOMAIN — the agent is read-only on git. The deploy itself is **AZ.W-DEPLOY** (the next cross-repo node), NOT this wave.
- The multi-instance scanner is NOT re-introduced as a glass-ui convenience (deck-orchestration, single consumer — per-instance Vue mounts is the correct model, NOT a substrate gap).
- The deck-chassis lift to `@mkbabb/glass-ui/deck` is INVENTORIED with a verdict here but EXECUTED elsewhere (no AZ `/deck` publish target).

## §9 — Named successors (for anything deferred)

- The feedback-coder Fourier-preset annotation (§5 scope-fence note), if declined here → recorded in the befitting inventory §A row as deck-local-documented, picked up by the feedback-coder deck's own next pass.
- The `/deck` chassis lift → the W-DECK roadmap note in the inventory; opens when a 2nd deck wants it (the ≥2-consumer bar).

## §10 — Cross-references

- Parent spec: `slides/docs/tranches/L/waves/L.W-ADOPT.md` (re-stamped here — pin `3.10.0`→`3.10.1`, three canvases → two).
- `AZ.W-DEPLOY` — the deploy that consumes the adopted, re-pinned deck (the second cross-repo hinge; H5).
- FLEET-DIGEST findings A4L-11 (un-started), A4L-13 (the exact enumeration), A4L-9/A4L-10 (the stale pin + stale edit-sites this re-stamp corrects), A4L-4/5/6/7/8 (the lib seams, all ADDRESSED + published in 3.10.1).
- glass-ui CLAUDE.md invariant 30 (cross-repo dev-resolution contract-v2 — the exact-pin rationale).
