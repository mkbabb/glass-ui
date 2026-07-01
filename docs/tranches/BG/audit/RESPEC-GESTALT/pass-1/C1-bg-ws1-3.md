# C1 — BG plan critique: PHASE 0 + WS1 + WS2 + WS3

**Lens:** C1 (RESPEC-GESTALT pass-1). **Scope:** every PENDING wave in PHASE 0, WS1, WS2, WS3.
**Date:** 2026-07-01 · branch `tranche/BG` · HEAD `976dc890`. Every claim verified on disk (file:line cited).

## Verdict

WS1 is fully DONE (2.1–2.7) and does not enter this critique. The remaining three bands split cleanly by
quality:

- **WS2 (dock convergence, 4.1–4.11) is the strongest band in the plan** — a genuine, coherent
  re-architecture that composes into ONE gestalt (a single `useDockSpring` engine, a decomposed `GlassDock`,
  the dead 551L silhouette cut, two shell docks collapsed to one, and the headline in-place V↔H morph that
  *replaces* the synthetic-dual-DOM+VT-crossfade kludge with a real morph). It has granularity fat (BUSY-SINGLE
  is inseparable from MORPH-UNIFY; CAP-SCROLLS+OVERFLOW-FADE are one concern) but the architecture is right.
- **WS3 (glass standardization) fragments ONE concern — "every glass surface reads from ONE unified
  tint+blur register" — into five field-gated sub-waves (3.5/3.6/3.8/3.9)**, plus a now-empty stub (3.11) that
  double-owns `liquid-morph.css:104` with 3.5, plus a 1-token paint-only wave (3.12) that exists only because
  its dark twin already shipped asymmetrically.
- **PHASE 0's CLOSEFIX-9SITE (0.7) is the over-contrivance disease made flesh**: a paint-NEUTRAL,
  dist-BYTE-IDENTICAL dead-token retirement inflated into an 18-file, 15-gate, "9-SITES-not-6" wave with an
  intra-wave R4-before-R3 ordering flip and a *brand-new gate that probes a sibling repo* to unblock glass-ui
  retiring its own token. The mechanical work is ~3 files; the rest is gate bookkeeping.

Two systemic gaps cut across all bands: (a) **zero Fable/DesignSync routing** named anywhere in the
1387-line build-map despite 61 P-class paint waves and a binding standing directive (seed §"Frontend-design
routing"); (b) **19 paint verdicts deferred to a late "W-REFLECT3" sweep** — the headless-green/live-broken
disease this whole audit exists to cure, re-concentrated instead of decentralized.

---

## Findings (ranked by severity)

### F1 (major) — CLOSEFIX-9SITE is ceremony-inflated dead-token retirement; the sibling-probe gate inverts the foreign-tree fence

`bg-build-map.md:554-595`. The wave's own spec: *"dist `glass-ui.css` BYTE-IDENTICAL to the HEAD baseline …
the dead token was already tree-shaken."* Verified on disk: the `--glass-blur-dock` chain is **~5 sites**
(`tokens/glass.css:103,166`, `dark-arm.css:286`, `bridges.css:334`, plus the `shell.css:26` comment — and
`shell.css:29` **already** reads `--dock-surface-blur: var(--glass-blur-resting)`, so 3.6 has already orphaned
it). Retiring an already-orphaned, already-tree-shaken token is a 3-file delete. The two carves
(`ladder.css` 527→470, `shell.css` 510→459 — verified both at exactly 527/510) are real and worth doing.

But the spec wraps this in: "9 SITES not 6" (counting each *gate/test that references the frozen string* as a
"site"), the R4-before-R3 intra-wave ordering flip (`:562-568`), COHERENCE FOLDs G1/G4/G7, and — worst —
`scripts/proof-retired-token-consumers.mjs` (NEW, `:580-582`), a born-RED gate that probes **`bbnf:230`** (a
sibling repo) via `constellation.presentConsumers()`/`resolveSibling()` and stays RED until "the U1-1 B7
migration row is recorded." **glass-ui retiring its own internal token cannot be gate-blocked on a sibling's
migration cadence** — that is the foreign-tree fence (inv-26) run backwards into a coupling. A first-principles
close deletes the token, records the retirement in MIGRATION.md, and moves on; the sibling resolves the built
`dist` on its own bump (contract-v2). The `proof:retired-token-consumers` gate is speculative substrate — it
will have exactly one consumer (this token) and probes across a repo boundary the audit's own fence forbids
touching.

### F2 (major) — WS3 fragments the unified-glass-register into 5 waves where a first-principles designer authors it once

`bg-build-map.md:192-234`. WS3's stated purpose is *"owns the unified blur/cast/clip register."* But the
"unify" is scattered across **3.5 GLASS-TINT-UNIFY** (≤2 chromatic pairs + one input bias, `:205`), **3.6
GLASS-BLUR-PEER** (one 8px resting radius across dock·button·card·menu, `:198`), **3.7 GLASS-IDIOM-FACTOR**
(`--glass-plate-tinted` declared ONCE — DONE, `6ec81de`), **3.8 GLASS-CONSUMER-BAND** (fold Badge/
SelectableChip/IconChip/glass-atom onto the plate/rim pairs, `:226`), and **3.9 DOCK-LEGIBILITY-RECAL**
(re-anchor dock AA once the unified plate tint is primary, `:229`). These are five facets of ONE move:
*declare the tinted-plate + one-blur register once, migrate every consumer in the same breath.* 3.7 already
declared the register; 3.8 is literally "migrate the consumers onto it"; 3.9 is "re-anchor AA now that they
share it." Verified the consumer set is small and enumerable: `grep glass-fill-tint|glass-ambient` →
`icon-chip.css`, `glass-atom.css`, `glass-chip.css`, `Badge.vue`, `IconChip.vue`, `SelectableChip.vue`
(6 surfaces). Six surfaces is one migration, not four waves. The chromatic-pair count is already tiny
(`ladder.css` has **3** `color-mix(in oklab`). The WS1-field-gating that "justifies" the split is a sequencing
constraint (paint-verify after the field lands), not a reason for five separate authoring waves — one wave can
carry Phase-1 token-collapse + Phase-2 field-gated paint-verify.

### F3 (major) — 3.11 DEMO-STYLE-REHOME is a near-empty stub that double-owns `liquid-morph.css:104` with 3.5-M5a

`bg-build-map.md:235-240`. COHERENCE FOLD G7 P1 already stripped the wave to *"keeps only the in-place
`.liquid-pill` substitution-close (M5a)"* — the whole-file 850L rehome moved to `BG.W-SPIKE-DELETE` (12.1,
verified `liquid-morph.css` = 850L on disk). But **3.5 Phase-1 IS the M5a `.liquid-pill` substitution close**
(`:192-195`, *"raw `var(--glass-bg-floating)` → element-level `color-mix` … `liquid-morph.css:104`"*). Both
3.5-M5a and 3.11 name the identical edit at the identical line. The G7 fold claims the double-ownership was
"resolved to ONE wave" but left the residue on both. 3.11 as a standalone wave now does nothing 3.5 doesn't —
it is a granularity artifact, a row that survives because it once held the 850L rehome.

### F4 (moderate) — BUSY-SINGLE is inseparable from MORPH-UNIFY; CAP-SCROLLS+OVERFLOW-FADE are one concern

`bg-build-map.md:258-288`. Verified on disk: `dockMorphContext.ts` **already** uses a single
`[data-morphing]` attribute as the busy signal (`:9,140,143,185`), and `useDockState.ts` has one
`keepOpenCount`/`isHeld` (`:97-98`). Collapsing "4 busy-signals → 1 `morphing` ref" (4.2) is intrinsic to
collapsing "5 `SpringProgress` sites → ONE `useDockSpring`" (4.1) — you cannot unify the engine without
unifying the state it drives. They are one wave. Separately, **4.7 CAP-SCROLLS** ("a capped axis is ALWAYS a
scroll axis") and **4.8 OVERFLOW-FADE** ("`useFadingScroll` soft edge on the cap-scroll port") are the front
and back of a single mechanism — a capped scroll port with a faded edge. Two rows for one idiom.

### F5 (moderate) — INPLACE-MORPH (4.10) is the elegant transposition the whole tranche should aspire to — protect it

`bg-build-map.md:293-301`. Verified the current mechanism on disk: `AppShell.vue` uses a **synthetic
two-dock stage** (`:86`), a `startViewTransition` **crossfade** of the orientation swap (`:108-109,134`), and
a `#shell-dock-morph-goo` filter (`:126,546`). This exists because the platform can't interpolate a
topology change (flex-col↔flex-row + two-axis resize). The wave *deletes all three* and does a **real
in-place V↔H morph** via `useDockSpring` with a fixed-anchor `transform-origin` and analytic-velocity squish.
This is exactly the first-principles architectural transposition the user demanded — a mechanism replacement,
not a patch. It is the headline (D13) and it correctly hard-depends on UNIFY(#1)+SHELL-DOCK-DRY(#9). No change
— flagged so the merge/prune pressure elsewhere does not erode its precond chain.

### F6 (moderate) — 3.12 EYEBROW-LIGHT-POLISH is a 1-token paint-only wave born of an asymmetric prior fix

`bg-build-map.md:215-225`. The wave lifts ONE `.section-label` light-arm warm-ink token from 4.15:1 to ≥4.5
over the recessive field. Its own spec concedes *"Device-free CI cannot enforce the lift
(`proof:field-aurora-aa` F-AA-ROSTER passes the literal `{bar:4.5, born-RED}` forever) — the gate-green
binding is F-AA-LIVE `[local]` only."* It exists only because the dark twin already shipped standalone
(`b3d65eec`) — an asymmetry, not a designed pair. A real defect (below-AA eyebrow is a "missing obvious issue"
class), but it is a single token edit whose only binding proof is a live-paint verdict that WS7's
`BG.W-GATE-FIELD-AURORA` already owns (it holds the `EYEBROW_LIGHT_POLISH resolvedBy` row, `:224`). A
standalone WS3-Phase-3 wave for a one-token lift with no device-free gate is granularity.

### F7 (moderate, systemic) — 61 P-class paint waves, ZERO Fable/DesignSync routing named

`grep -c "Fable\|DesignSync" bg-build-map.md` = **0**; `grep -c "\[P\]"` = **61**. The seed's standing
directive (§"Frontend-design routing", binding 2026-07-01) mandates *"every VISUAL wave names its Fable design
arm + its DesignSync review surface."* Not one of the 61 paint waves does. Every WS3/WS2 P-wave names a
π-capture and a `proof:ba-gestalt` verdict but no Fable arm. This is a plan-wide coverage gap the amended plan
must encode, not a per-wave fix.

### F8 (minor, systemic) — 19 paint verdicts deferred to a single late "W-REFLECT3" sweep

`grep -c "W-REFLECT3\|rides W-REFLECT"` = **19**. The plan's own cardinal-lesson framing (device-free-green /
live-broken) is the disease the tranche cures — yet 19 waves land device-free-GREEN and hand their binding
paint verdict to one late capture sweep. Concentrating the paint debt into a terminal sweep re-creates the
exact "green now, broken later, discovered at the cut" failure mode. Paint should close per-wave (the 2.x WS1
waves DID close their own dual-engine paint — that is the model to hold WS2/WS3 to), not drain into WS12.

### F9 (minor) — 3.2 DOCK-CAST-RETIRE is dead-code + one PRM carve, not a wave

`bg-build-map.md:176-179`. Delete a "W3C-dead `.cartoon-cast` block" at `shape.css:208-249` + add
`--motion-weight:0` under `.glass-dock` reduce. (Note: `.cartoon-cast` is *live* in `cards.css:359` as a Card
decoration — only the `shape.css` block is dead, so the deletion must be surgical.) Two-file, byte-checkable,
paint-neutral — the same class as CLOSEFIX. It belongs folded into 3.3 GLASS-CLIP-DISCIPLINE (which already
retires the per-class `contain`/`isolation` dialects) or into CLOSEFIX's carve set, not a standalone row.

---

## Fold candidates (for the AMENDED-GESTALT-PLAN)

### FC1 — AMEND CLOSEFIX-9SITE: strip the ceremony, kill the sibling-probe gate
**kind: amend-wave.** Keep the two carves (`ladder.css`/`shell.css` under 500) and the `--glass-blur-dock`
delete — they are real and paint-neutral. **Prune** the `proof:retired-token-consumers` sibling-probe gate
entirely (F1): record the token retirement in MIGRATION.md; the sibling resolves built `dist` on its own bump
per contract-v2. **Drop** the "9-SITES-not-6" framing and the R4-before-R3 intra-wave ordering ceremony —
re-tag the two gates and regen ci.yml in one ordinary pass. The wave shrinks from an 18-file/15-gate
production to ~5 real source files + a routine ci-emit. Rename to `BG.W-DOCK-BLUR-RETIRE-CARVE` (says what it
does; the "9SITE" name is itself the ceremony). Gestalt: a dead-token retirement is a 3-line delete plus two
byte-identical carves — that is the whole wave.

### FC2 — MERGE 3.5+3.6+3.8+3.9 into ONE `BG.W-GLASS-REGISTER-UNIFY`
**kind: merge-waves.** The idiomatic transposition (F2): with 3.7's `--glass-plate-tinted` already declared
once, author the unified material in ONE wave — the tinted-plate register + one 8px resting blur + the
saturate revert + migrate all 6 fill-tint consumers (Badge/SelectableChip/IconChip/glass-atom/glass-chip +
liquid-pill) + re-anchor dock AA — as a single gestalt move with a Phase-1 token-collapse arm (device-free)
and a Phase-2 field-gated paint arm (one dual-engine close). Six surfaces + three chromatic pairs is one
migration. Keeps 3.10 GLASS-DYNAMICS distinct (it is the *read-carrier* — lensing refraction + neutral
specular hairline — a different axis, correctly separate). Fable arm: this is the tentpole visual wave of WS3
and MUST name its Fable/DesignSync surface (F7).

### FC3 — PRUNE 3.11 DEMO-STYLE-REHOME into 3.5-M5a
**kind: prune-wave.** The residual `.liquid-pill` substitution-close at `liquid-morph.css:104` is already
owned by the merged register wave's Phase-1 arm (F3). Delete the standalone row; carry a no-delete
back-pointer noting the 850L whole-file rehome lives at 12.1 (`BG.W-SPIKE-DELETE`). Zero substance lost.

### FC4 — MERGE 4.1+4.2 into `BG.W-DOCK-ENGINE-UNIFY`; MERGE 4.7+4.8 into `BG.W-DOCK-CAP-SCROLL-FADE`
**kind: merge-waves.** BUSY-SINGLE's 4-signals→1 collapse is intrinsic to the 5-SpringProgress→useDockSpring
unify — the state and the engine are one mechanism (F4; on-disk `[data-morphing]` is already the single busy
attr). And a capped scroll axis with a faded edge is one idiom, not two rows. Both merges preserve the
`proof:dock-engine` E4 D-3 protector (`:264-270`) and the `useFadingScroll` soft-edge π unchanged — nothing
downstream loses a gate.

### FC5 — FOLD 3.2 DOCK-CAST-RETIRE into 3.3 GLASS-CLIP-DISCIPLINE
**kind: merge-waves.** Surgical `shape.css:208-249` dead-block delete + `--motion-weight:0` dock-reduce carve
belongs with 3.3's per-class `contain`/`isolation` retirement (both touch the glass/dock clip+decoration
surface, both paint-neutral). One wave, one `getComputedStyle`-in-bundle close (F9). Guard: `.cartoon-cast`
stays live in `cards.css:359` — the delete is the `shape.css` block ONLY.

### FC6 — FOLD 3.12 EYEBROW-LIGHT-POLISH into WS7 `BG.W-GATE-FIELD-AURORA`
**kind: amend-wave.** The one-token light-eyebrow lift has no device-free gate (its own spec) and its
`resolvedBy` already lives in WS7's field-aurora gate (F6). Fold the token edit into that wave as the
symmetric light-arm of the dark fix, closing the asymmetry in one place rather than a dangling WS3-Phase-3
row. Keep the F-AA-LIVE `[local]` paint binding — just don't spend a wave on it.

### FC7 — PLAN-DOC-EDIT: encode Fable/DesignSync routing on every P-wave
**kind: plan-doc-edit.** Per the binding standing directive, amend the build-map so each of the 61 P-class
waves names (a) its Fable design arm and (b) its DesignSync review surface (F7). For WS2/WS3 in scope: the
merged GLASS-REGISTER-UNIFY, GLASS-DYNAMICS, CLIP-DISCIPLINE, SAFARI-BLUR, all dock-paint waves
(FISSION-WIRE, CAP-SCROLL-FADE, SHELL-DOCK-DRY, INPLACE-MORPH) are card-based gestalt-review candidates and
must sync incrementally to the claude.ai/design project.

### FC8 — PLAN-DOC-EDIT: pull the 19 W-REFLECT3 paint verdicts back to per-wave close
**kind: plan-doc-edit / defer-honest.** Hold WS2/WS3 P-waves to the WS1 standard (2.x closed their own
dual-engine paint). Where a wave genuinely cannot close paint before a downstream field lands, name that
dependency explicitly as a *defer-honest* with the exact proving wave — not a blanket drain into the WS12
W-REFLECT3 sweep (F8). The late sweep should catch cross-page gestalt, not carry 19 per-wave binding verdicts.

---

## Waves that are RIGHT — keep as-is (with the merges above applied)

- **4.10 INPLACE-MORPH** — the elegant mechanism-replacement; the model for the tranche (F5). KEEP, protect precond chain.
- **4.3 DOCK-CUT** — deletes verified-dead 551L `useDockContextSilhouette` (0 real consumers; only a demo comment + its own test). KEEP.
- **4.4 DOCK-DECOMPOSE** — carves the verified 711L `GlassDock.vue` god-module + drains RATCHET. KEEP.
- **4.6 DOCK-PERSISTENT-CUT** — removes the persistent ℱ brand + Fourier egg (verified `SidebarDock.vue:173`); the one structural-only defect close. KEEP.
- **4.9 SHELL-DOCK-DRY** — two 498/482L shell docks → one `useShellNavDock`. KEEP.
- **3.3 CLIP-DISCIPLINE / 3.4 SAFARI-BLUR-LITERAL / 3.10 GLASS-DYNAMICS** — real DRY / real Safari-var-flat bug / distinct read-carrier axis. KEEP.
- **3.1 CARTOON-INK-GAMUT** — PAINT-PENDING, near-done, the shared gestalt floor under every WS4 verdict. KEEP.
- **4.11 STORY-MODULARIZE** — already correctly marked DEFERRABLE with the A10-SPLIT recursion caught. KEEP (deferrable).
