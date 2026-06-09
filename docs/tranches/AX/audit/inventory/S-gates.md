# AX inventory — S-gates lane (gate fleet + CI health)

Read-only step-back inventory. HEAD `88a2ec5` (3.8.0 + convergence-1 W44 + convergence-2
W53-W59 DEVELOPED; the prompt's `c72d2ac` baseline is one commit stale — W45 landed at
`88a2ec5`). Probed live: `gates.mjs` manifest, `ci.yml`, and every gate this lane owns,
re-run on the fresh `dist/` (built 19:59, after HEAD 19:42 — the budget RED is real, not
stale-dist).

---

## The gate fleet at a glance

`scripts/gates.mjs` is the SINGLE manifest (AS.W2 inv-θ). 117 `proof:*` keys in
package.json; 111 `proof-*.mjs` scripts; the manifest GATES array is the source of truth
for the three aggregates (filters over it):

| Aggregate | How many | Tag |
|---|---|---|
| `proof:all` (local) | 95 gates | `--run local` |
| ci.yml | 90 (manifest-ci set) | `--run` via explicit per-step YAML + `--verify-ci` |
| release.sh | 21 gates | `--run release` |

`proof:gate-script-parity` (the bijection meta-gate) is **GREEN**: 0 new orphans, 0 new
dangling, 0 ghost cmds. The standing baselines are finite + owner-attributed:
- KNOWN_ORPHANS (5): `proof-affordance-contrast` (AW.W13), `proof-composable-return-types`
  (AW.W15), `proof-datatable-split` (AW.W14), `proof-dock-big-dock` (AW.W3b),
  `proof-glass-panel-tiers` (AW.W12) — each owed to its AW owner-wave, not AX.
- KNOWN_DANGLING (2): `proof:styling-hygiene` (AW.W20, missing `.mjs` — but a
  `proof-styling-hygiene.mjs` DOES exist + runs green, so this baseline entry is itself
  STALE and should be pruned at W27a/W33), `proof:glass-card-tiers` (AW.W12, missing).

---

## The RED census (what's actually failing at HEAD)

Six gates surface RED. Disposition by tag + ownership:

### 1. `verify-ci` (ci.yml drift) — RED · **20 gates missing** (grew from the documented 14)
`node scripts/gates.mjs --verify-ci` EXIT 1. The 20 ci-tagged manifest gates absent from
`.github/workflows/ci.yml`:

```
proof:dock-region-model        proof:aurora-painterly-statistics
proof:aurora-noise-hash-equivalence   proof:demo-radial-calm
proof:constellation-substrate-single  proof:canvas2d-substrate
proof:resolve-canvas-color     proof:text-highlight
proof:constellation-field      proof:input-invalid-aria
proof:styling-hygiene          proof:liquid-glass-material
proof:tabs-unified             proof:dock-orchestrator-single
proof:dock-hold-contract       proof:dock-wrap-content-driven
proof:slider-two-only          proof:carousel-glass-atoms
proof:deck-progress-rail       proof:squircle-language
```

The documented count was 14 (mostly π-lane); it is now **20** — every AX wave that minted
a ci-tagged gate (W23 carousel, W24 deck-progress, W45 region-model, W52 material, W53
tabs, W56 squircle, W59 slider) added its gate to the manifest but NOT to ci.yml.
**This is the structural W33/band-close debt.** The fix is NOT "add 20 `run:` lines" —
several of these (region-model, dock-orchestrator-single, dock-hold-contract,
dock-wrap-content-driven, deck-progress-rail, tabs-unified, squircle-language) carry a
fail-CLOSED π-lane RUNTIME arm that needs a browser binary CI has not been given. Per the
convergence-1 plan: this needs the **π-gate-in-CI infra decision** — give the π gates a
device-free CI arm (the SOURCE-STRUCTURE arms already run on every runner) OR re-tag the
device-requiring arms local-only. Owner: **W33 / band-close**.

### 2. `proof:no-god-module` — RED · **4 violators** (grew from 3)
`local`-tagged only (NOT ci/release). Files > 500 lines:
- `goo-blob/composables/useMetaballRenderer.ts` — **690** (W12 carry-forward → W26)
- `custom/tabs/SegmentedTabs.vue` — **683** (NEW; born of W53 tabs-unify — folded four
  components into one SFC → over the floor)
- `custom/dock/GlassDock.vue` — **534** (was 505/525; W45 region-model grew it → W26)
- `custom/constellation/constellationField.ts` — **510** (W12 carry-forward → W26)

Owner: **W26** (TS god-module state encapsulation) for useMetaballRenderer + GlassDock +
constellationField; **SegmentedTabs.vue is a NEW W53 spillover** with no current owner —
must be assigned (split the variant bodies into sub-modules, or grant a justified holdout).
W6/W25a fold this into the ci aggregate AFTER the splits land.

### 3. `proof:no-legacy-commentary` — RED · 7 hits across 2 barrels
`local`-tagged only. `src/api/index.ts` (5 hits: AW.W16, AW.W17, AX.W17, two AX.W37) +
`src/index.ts` (2 hits: AW.W16, AX.W37). Every hit is a tranche-letter ref injected by the
W37 canvas/text-highlight re-home + the AW.W16/W17 deck/constellation barrel additions.
Owner: **W27a** (legacy gate hardening — barrel scrub, the named 3→6 barrel-ref delta the
convergence plan recorded). The audit trail belongs in CHANGELOG.md, not the barrels.

### 4. `profile:budget` — RED · **CSS over budget** (RELEASE-BLOCKING)
`local` + `ci` + **`release`**-tagged. The only RED that gates a TAG.
- `dist/styles/index.css` — raw **555070 / 548000 (101.3%)**, gzip **144852 / 140000
  (103.5%)**.
- Every JS subpath PASSES (dock +2.3% within tolerance; aurora/blob/glass-ui flat).
The CSS grew past the 140k-gzip budget from the convergence-2 CSS net (W45 dock region
model + dock-controls, W52 liquid-glass material, W53 tabs, W56 squircle tokens, W59
slider). The 3.8.0 cut lifted the budget to 140k forward-sized "for the convergence net of
the trims" — but the trims (W25b CSS carves, W19 prunes) have NOT yet landed, so the net is
positive. **This needs a rebaseline (the trims are still owed) OR the W25b carves must land
first.** Because it is release-tagged, a 3.9.0/4.0.0 cut CANNOT proceed until this is GREEN.
Owner: **W33 close** (rebaseline) gated on **W25b** (the CSS carves that bring the real
number down) — sequence W25b BEFORE the rebaseline so the budget reflects the trimmed truth,
not a lifted ceiling.

### 5. `proof:story-language` — RED · 1 hit (regression after W58 dev-complete)
`local`-tagged only. `demo/stories/navigation/dock.vue:86` — `<!-- AX.W45 — Home is a
PERSISTENT control… -->`. W58 swept 49 SFCs GREEN (dev-complete per PROGRESS.md), but the
**W45 dock.vue edit at `88a2ec5` re-introduced a tranche code** — a fresh regression, not a
W58 miss. Owner: a one-line scrub (delete the `AX.W45` ref from the comment). Routes to
**W45 follow-up** or **W27b** (legacy commentary full-tree sweep, which generalizes the gate
to demo/stories too). This is the live proof the gate WORKS — a wave edit re-armed it.

### 6. `proof:animation-coherence` — RED · constellation census (OWNER-OWED, NOT in any aggregate)
NOT in the GATES manifest (an AW.W31.a + AX.W05 orphan; `proof-animation-coherence.mjs`
exists + is registered as a package.json key but is in NO local/ci/release set). The
library survivor-sweep is **0 (GREEN)**: 5/5 `--spring-*` presets reached, 0 apple-spring
survivors, 0 hand-rolled forks. The RED is purely the **constellation census** —
`../speedtest` reads `var(--ease-apple-spring)` at 3 sites, inheriting the EXCISED glass-ui
token (degrades to instant/linear). This is the **W34 publish-gated forcing function** (the
speedtest fix greens only on the published bump). It is correctly OUT of the CI aggregate —
a cross-repo consumer debt, not a glass-ui src defect. Owner: **W34** (cross-repo).

---

## Release-gate health (3.8.0 shipped; the next-cut readiness)

3.8.0 shipped via the release.yml OIDC provenance path (the prior 3.6.0/3.7.0 proof). The
release aggregate is **21 gates**. At HEAD, 20 are GREEN; **`profile:budget` is RED**
(CSS over budget, item #4 above) — so a tag-push at HEAD would FAIL the release gate. The
release set does NOT include the four `local`-only REDs (no-god-module, no-legacy-commentary,
story-language) nor the un-aggregated animation-coherence — those do not block a tag, but
they DO block the W33 close (a tranche cannot "ship" without W33 green, and W33 demands the
overfitting + gate-fleet-registration + FINAL).

Recent convergence-2 gates all GREEN at HEAD: `proof:tabs-unified` (W53),
`proof:squircle-language` (W56), `proof:slider-two-only` (W59),
`proof:liquid-glass-material` (W52), `proof:dock-region-model` (W45). The DEVELOPED waves'
SOURCE-STRUCTURE arms hold; their π-lane RUNTIME arms close on the orchestrator's live
device, not here.

---

## Owner-owed vs close-blocking split

| RED gate | Tag | Owner | Blocks a TAG? | Blocks W33 close? |
|---|---|---|---|---|
| `verify-ci` (20-gate drift) | meta | W33 / band-close (π-in-CI decision) | no | **YES** |
| `proof:no-god-module` (4) | local | W26 (3) + **W53-spillover SegmentedTabs unassigned** | no | **YES** |
| `proof:no-legacy-commentary` (7) | local | W27a | no | **YES** |
| `profile:budget` (CSS) | local·ci·**release** | W33 rebaseline gated on W25b carves | **YES** | **YES** |
| `proof:story-language` (1) | local | W45-followup / W27b | no | **YES** |
| `proof:animation-coherence` (census) | un-aggregated AW orphan | W34 (publish-gated) | no | no (publish-gated) |

`proof:ax-final` (the AX close aggregate gate) **does NOT exist yet** — neither in
package.json nor gates.mjs. W33 authors it; until then there is no terminal close gate.
The `proof:no-retired-survivor` gate (W21-authored per the W33 spec) also does not yet
exist. The stale KNOWN_DANGLING `proof:styling-hygiene` baseline entry should be pruned
(the script exists + runs green).

---

## Gestalt path forward (planning, not code)

The gate fleet is fundamentally SOUND — the bijection meta-gate is green, the manifest is
the single source of truth, and the fail-CLOSED π lane (W00) is the structural antidote to
the headless-green/visually-broken class. The REDs are all EXPECTED born-RED or
carry-forward debt with named owners; none is a surprise. The convergence GREW every count
~30% (and the dock band W45 + tabs W53 added fresh spillover), so the close-band work is
larger than the original 46-wave plan sized.

1. **The π-gate-in-CI infra decision is the keystone of `verify-ci`.** Do NOT bulk-add 20
   `run:` lines. Each minted gate has a device-free SOURCE-STRUCTURE arm (runs everywhere)
   and, for the visual ones, a fail-CLOSED π RUNTIME arm that needs a browser. The
   architectural move: split-tag — the SOURCE arms ci-tagged (already correct in the
   manifest), the RUNTIME arms either given a headless-Chrome CI job (the tests-visual
   workspace driving Chrome-headless-new via ANGLE/SwiftShader + Dawn, already stood up at
   W00) OR carved to a separate `pi`-tagged aggregate that runs on a device-bearing runner.
   This is a W33 decision, NOT a per-wave patch.

2. **no-god-module needs a SegmentedTabs owner assignment.** The three documented violators
   route to W26; the NEW W53 SegmentedTabs.vue (683) has no owner. The gestalt fix is the
   same as W26's encapsulation discipline: split the three variant bodies
   (segmented/pill/underline) into co-located sub-components off the shared `useTabIndicator`
   composable — the variant axis is a clean cohesion seam, not a contrivance. Assign it to
   W26 (extend its scope) or a W53-followup.

3. **profile:budget: rebaseline AFTER the trims, not before.** The budget was lifted to 140k
   forward-sizing the convergence net. The trims (W25b CSS carves: tokens.css §-seam
   partials, utilities.css component-coupled relocations, floating-panel dead-chain excise;
   W19 primitive prunes: header-ribbon/glyph-face/disco-glyph/glass-carousel CSS) bring the
   real number down. Sequence: W25b + W19 land → measure → rebaseline at the trimmed truth
   (NOT at the lifted ceiling). This is the precept-clean order — a rebaseline to a
   not-yet-trimmed number would bless the bloat.

4. **The barrel + commentary scrubs (W27a/W27b) are mechanical but must be clean breaks.**
   no-legacy-commentary (7 barrel refs) + story-language (1 demo ref) are tranche-archaeology
   the CHANGELOG owns. W27a scrubs the barrels; W27b generalizes the gate to src/+scripts/+
   demo/stories and does the one-time full-tree sweep. Per greenfield-no-meta: rewrite the
   design-WHY comments tranche-letter-free, delete the landed-at-X notes.

5. **W33 authors the missing terminal gates.** `proof:ax-final` (the aggregate),
   `proof:no-retired-survivor`, the gate-fleet-registration meta-assertion (every prior
   wave's gate registered + green), and prunes the stale KNOWN_DANGLING `proof:styling-hygiene`
   entry. The dependsOn is ENUMERATED (not "ALL") per the AW renumber-drift lesson.

6. **animation-coherence stays out of the aggregate until W34 publishes.** It is correctly
   un-tagged — a cross-repo consumer debt. The speedtest 3-site `--ease-apple-spring` fix
   greens on the published bump (W34). Do NOT fold it into the local/ci set — that would
   make every local `proof:all` run RED on a sibling-repo state glass-ui cannot edit.

The close-blocking set is five gates (verify-ci, no-god-module, no-legacy-commentary,
profile:budget, story-language); of these only profile:budget blocks a TAG. The remaining
four block the W33 close. All have named owners (W33/W25b/W26/W27a/W27b). None is a new
discovery — the gate fleet is doing exactly what it was built to do: hold the line born-RED
until the owner-wave greens it.
