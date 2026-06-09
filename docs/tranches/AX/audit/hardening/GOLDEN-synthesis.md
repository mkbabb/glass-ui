# GOLDEN-synthesis — the hardened AX roadmap (master synthesis of all 31 challenge lanes)

**Lane** GOLDEN-synthesis · **HEAD** ~89edffc (3.8.0 published + convergence W44-W61) ·
**Mode** read-only PLANNING (no code) · **Date** 2026-06-09 · **Verdict** WEAK

This is the single synthesis across all 31 adversarial red-team lanes. It states the gestalt
finding, the ONE chronic that subsumes the rest, the four perfection plans (glass-cohesion,
dock, capture-discipline, publish), the wave AMENDS/ADDS the current set is missing, the
re-ordering, and the convergence criteria. The orchestrator authors the hardened plan from this.

The 31 lanes returned a near-unanimous verdict: **5 WEAK-dominant, 4 DEFERRED-CHRONIC,
1 BROKEN (CHRONIC-miss-consumer), the rest WEAK.** Not ONE lane returned SOUND. The pattern is
not a scatter of defects — it is ONE structural disease with many surfaces.

---

## 0. THE GESTALT FINDING — the tranche is re-living its own founding chronic, on paper

AX exists to kill the headless-green-over-visually-broken miss (the AW blowout). **That exact
miss is recurring INSIDE AX, right now, for the THIRD-to-SIXTH time**, and the entire
enforcement apparatus the cardinal lesson demands has been DESIGNED, DOCUMENTED, and never
LANDED. The single hardest fact the synthesis rests on, confirmed by ≥9 lanes independently:

> `find docs/tranches/AX/audit -name "*.png"` → **0.** Zero captured pixels in the entire
> tranche. `ls scripts/proof-live-verified-ledger.mjs` → **No such file.** The capture
> discipline (`audit/visual/`) holds ONLY `CAPTURE-PROTOCOL.md` — the document describing what
> a capture would be. Even the two "captured" DELTAs (W01/W02) contain NO pixels — they are
> prose that says *"the captures are the orchestrator's to run."*

So at HEAD the count of waves with a genuine captured-render DELTA is **ZERO**, while
**W45/W52/W53/W56/W57/W59 + W19** carry `live-verified (DEVELOPED)` and **W15/W16/W23/W24** carry
`complete`. Every one of those marks is a commit-message claim with no artefact. And the user's
own pass-3 live audit (Q1/Q3/Q8/Q9) DIRECTLY CONTRADICTS three of them (Q3 vs W52's
"live-verified"; Q9 vs W57's; Q1 vs W45's). The headless-green-over-broken miss is not a risk —
it is the present state of the ledger.

**The deeper gestalt:** the corpus does not have a deferral PROBLEM; it has a deferral-CLOSURE
disease (CHRONIC-defer-early/late). Items close by RE-LABELLING (consumer-territory /
tooling-unreachable / BOOK-with-named-trigger / handoff-not-deferral / "live-verified (DEVELOPED)")
rather than by DOING — and the re-label peels off when the underlying need returns. Every flagship
chronic shares ONE root: **a gate or bar satisfiable by a proxy** — `live-verified` by a
section-marker grep, the ≥2-consumer bar by a demo story, the budget by a manual-unblock, the
ci.yml mirror by a hand-edit. The hardening is NOT more ledger discipline; it is making each gate
un-satisfiable by its proxy, enforced at AUTHORING time, by the actor who currently skips it.

---

## 1. THE ONE CHRONIC THAT SUBSUMES THE REST — and why every proposed fix is mis-positioned

The lanes name ~8 chronic classes. They are ALL the same disease wearing different clothes:

| Chronic class | Lanes that found it | Recurrence count | The proxy that fakes the gate |
|---|---|---|---|
| **headless-green / live-verified inflation** | CHRONIC-miss-cardinal, CH-glass-material, CH-dock, CH-blob, CH-demo-ia, CH-primitives, CH-aurora, DOCK-* (all), GLASS-* (all) | **6+** (AW → W04/W12 → W09/W05 → W45/W52/W53/W56/W57/W59 → Q3/Q9 → W19/W15/W16) | a prose DELTA / a green SOURCE gate / the `(DEVELOPED)` label |
| **clean-break rename misses consumer** | CHRONIC-miss-consumer (BROKEN), CH-primitives, CH-aurora, GLASS-ui-components, CH-misc | **6+** (AP+I bindings → AS.W7 → AW.W3 → W04 false-zero → W13-crayon → W53 Bouncy) | `tests/` out of typecheck; deletion gates scoped `["src","demo"]` only |
| **ci.yml ↔ manifest drift** | CHRONIC-miss-release, CH-close-crossrepo, CHRONIC-defer-early/late | **20 deep NOW** (P → AX, growing per band) | a hand-maintained YAML mirror; `verify-ci` RED-tolerated |
| **budget ratchet (never down)** | CHRONIC-miss-release, CH-close-crossrepo, CHRONIC-defer-early/late | **12+ rebaselines**, +87% gzip, never tightened; **breaching NOW (103.5%)** | a logbook-of-growth wearing a gate's clothing |
| **PROGRESS ↔ JSON status inflation** | every lane | recurs at **every roll-up** | the PROGRESS cell can outrun its own JSON |
| **capability-without-adoption** | CH-dock (C1/C8), DOCK-layers-rail (CHRONIC-L3), DOCK-controls-nav (C5) | W45 `#persistent` 1/N, `--dock-icon-glyph` 0/47 | the ≥2-consumer bar met on paper, demand-side skipped |
| **deferred-to-the-LAST-wave** | CHRONIC-miss-cardinal (H1), CHRONIC-defer-early (CH-4), CH-close-crossrepo, CH-misc (C8) | the close gate, the ci-fix, the budget, the demo-rot guard ALL park in W33 | the forcing function lands AFTER the inflation it should prevent |

**The mis-positioning that guarantees recurrence:** every institutional fix the tranche has
authored is owned by **W33 — the LAST wave** (`proof:live-verified-ledger`, the ci.yml fix, the
budget rebaseline, the demo-rot class-guard, `proof:no-orphaned-wave-claim`). A forcing function
that lands last cannot prevent the inflation that happens in Batches 1-8 — it can only POST-HOC
discover it (which the three soundness rounds + these 31 lanes already did by hand). **The whole
point of a forcing function is to bite at AUTHORING time.** Owning it at W33 structurally
RE-CREATES the manual reconcile, then hands the close wave a ledger with N inflated rows.

> **The single highest-leverage move in this entire synthesis: relocate the enforcement battery
> from W33 (last) to a W00-extension band that lands FIRST, and make it bite at commit time.**

---

## 2. BATCH -1 (NEW, FIRST) — the SOUNDNESS GATE BATTERY (was W33, now lands first)

This is the new first batch — a W00-band extension (W00 is the gate-philosophy foundation, already
`complete`; extending it is in-character). NOTHING else dispatches until these land, because they
are what makes every subsequent "live-verified" mark honest. Sourced from CHRONIC-miss-cardinal
H1-H6, CHRONIC-miss-consumer §5, CHRONIC-miss-release, CH-structural §6, CH-misc §4.

**S1 — `proof:live-verified-ledger` as a commit-time hook (CHRONIC-miss-cardinal H1/H2/H3).**
A PROGRESS cell cannot read `live-verified`/`complete` unless `audit/visual/W<NN>-DELTA.md` exists
AND references ≥1 `.png` that EXISTS on disk AND is newer than the wave's touched source. Run it
as a pre-commit / commit-msg hook on any commit whose message contains `live-verified` or edits a
PROGRESS status cell. **Kill the prose-DELTA loophole**: a section-marker grep is satisfiable by a
stub (the W01/W02 DELTAs prove it) — require a real image file, not headings.

**S2 — Retire the `(DEVELOPED)` compound label (CHRONIC-miss-cardinal H6).** It is the linguistic
vehicle of the inflation ("we developed it AND verified it" = "we developed it; live is owed").
Legal statuses: `planned` / `in-progress` / `dev-complete` / `live-pending` / `live-verified`,
where `live-verified` is GATE-DEFINED (S1), not author-asserted. Delete `(DEVELOPED)`.

**S3 — `proof:no-orphaned-wave-claim` (CHRONIC-defer-early HA#1, CHRONIC-miss-cardinal H4).**
A PROGRESS `live-verified`/`complete` row whose wave declares a born-RED witness REDs unless that
witness's `proof:*` is GREEN. Born-RED NOW on **W19** (header-ribbon resolves in `package.json` /
`api/index.ts` / 10 hits while marked `live-verified`).

**S4 — Fold `tests/` into typecheck (CHRONIC-miss-consumer H1, highest-leverage / smallest change).**
Add `tsconfig.test.json` (`include: ["tests/","src/"]`) to the `typecheck` script + CI. Born-RED
NOW on `tests/configurator-recursion.spec.ts:49` (`import { BouncyToggle }` — W53 deleted it). This
single change makes every future clean-break orphaned-test-import a RED `TS2305` at the wave that
caused it. The type system is the strongest dead-reference detector in the repo and is structurally
blind to the one tree most likely to carry a stale reference.

**S5 — `proof:consumer-staleness` (the reverse cross-repo clause; CHRONIC-miss-consumer H2).**
For each present sibling (speedtest/slides/words/fourier), grep every `@mkbabb/glass-ui[/subpath]`
import and assert each NAMED import resolves against glass-ui's CURRENT public surface. Born-RED NOW
on **8 speedtest files** importing the W53-deleted `BouncyTabs`/`UnderlineTabs`/`ResponsiveTabs` +
the retired `/responsive-tabs` subpath. `proof:consumers:static` is ALREADY RED at HEAD on these
(CH-primitives C5) — the band cannot close green over it.

**S6 — Shared `DELETION_SWEEP_ROOTS = ["src","demo","tests"]` (CHRONIC-miss-consumer H3).** Pull the
`["src","demo"]` walk-root out of `proof-tabs-unified.mjs:52` into a shared constant every future
deletion-proof gate imports — stops the copy-forward hole from propagating into the next clean-break
wave's gate.

**S7 — Generate the ci.yml mirror; put `verify-ci` in the RELEASE set (CHRONIC-miss-release H1/H2,
CH-close-crossrepo §2).** The 20-gate drift is structural because ci.yml is a hand-curated second
source. Either `gates.mjs --emit-ci` codegen + a `proof:gen-ci-fresh` byte-match, or collapse ci.yml
to ONE `node scripts/gates.mjs --run ci` step. Add `verify-ci` to the `release` tag so a drifted
ci.yml cannot publish. **Fix or DELETE the two MIA scripts** (`proof:styling-hygiene`,
`proof:glass-card-tiers`) — a `KNOWN_DANGLING` amnesty that survived two tranches is a fail-open in
disguise; the day someone mirrors the 20 missing gates into the YAML, `proof:styling-hygiene`
crashes CI (two bugs cancel today).

**S8 — Re-baseline every carve roster against HEAD (CH-structural §1).** Replace every stale
`eaba94f` line count in W25a/b/W26/W27a/b with a live `wc -l`. The CSS god-module roster is SIX
(add `dock-controls.css` 531 + `theme.css` 514), not four; the TS/Vue roster is FOUR (add
`SegmentedTabs.vue` 683 + `GlassDock.vue` 534 + `constellationField.ts` 510), not one. W25a's
adversarial-verify twist-ii ("a fifth file crept over 500 → halt") FIRES on the stale roster — the
band self-halts on its own staleness unless re-baselined first.

**Why -1, not 9:** every one of S1-S8 is born-RED on a real defect at HEAD. They are not close-tail
hygiene — they are the forcing functions that make Batches 0-8 honest. Owning them last (the current
plan) guarantees the inflation recurs through every wave that lands first.

---

## 3. THE GLASS-COHESION PLAN — the ROOT is a document, not a default; the model is 4-5-way forked

Eight lanes red-teamed glass cohesion (GLASS-tokens-model, GLASS-ui-components, GLASS-custom-components,
GLASS-overlays, CH-glass-material, CH-foundational, PROTO-maximal-glass, PROTO-adaptive-glass). The
unanimous verdict: **under MAXIMAL glass-first the model is NOT one model.** Source-confirmed:
`grep glass-level src/` = **0**; `grep glass-backdrop src/` = **0**; `grep contrast-color src/` = **0**.
W54 (the ROOT) + W55 (legibility) are SPEC-ONLY. The default `<Button>` is still opaque `bg-primary`.

### 3a. The forks (each a surface that will NOT respond to the `--glass-level` knob or the W55 darken)

| Fork | Surface | Why it diverges | Lane |
|---|---|---|---|
| 5-rung ladder | Card, Dialog, Sheet, all menu Content | reference model (oklab tint seam) | — |
| dock SHELL | `.glass-dock`, chassis, tiers | flat `var(--glass-bg-dock)`, OFF the oklab tint seam — W55 cannot reach the literal G2 surface | GLASS-tokens C2/C3, GLASS-custom C1 |
| `.input-pill` | Input/Textarea/NumberField | `blur(1px)` — does not read as glass; opacity is fixed `--surface-tint-15` | GLASS-ui C5 |
| TagsInput | form atom | left on `bg-background` while its siblings migrated to `.input-pill` (sibling-miss) | GLASS-ui C8 |
| SegmentedTabs | the W53 flagship | `background: var(--muted-medium)` + indicator `var(--background)` — fully opaque | GLASS-ui C3 |
| Alert | content panel | every variant `bg-card`, zero glass path | GLASS-ui C4 |
| timeline scrubber | `.glass-track/fill/thumb` | reads `--surface-tint-*`, not `--glass-bg-*` — level + tint both miss it | GLASS-custom C2 |
| DialogScrollContent | overlay | solid `bg-background` + stapled `[box-shadow:--glass-shadow-floating]` — the un-swept overlay sibling | GLASS-overlays C2 |
| Configurator chips / Expandable trigger | nested chrome | opaque `bg-card/40` / inline `[backdrop-filter:…]` | GLASS-custom C3/C6 |
| specular discipline | Card opt-IN vs dock/Button opt-OUT-impossible | the I.W6 "19 tracks bloom" — AND a SECOND model (tier `::before` hover-gleam fires on every overlay) | every glass lane |

### 3b. The TWO foundational incoherences the W54 spec does NOT resolve

**INCOHERENCE-1 (the deepest gap, GLASS-custom C5):** `glass.css:1-19` records as standing canon
*"a glass surface nested inside another glass surface is a discipline violation — compose flat tiers
inside glass (the blur stacks muddy, the rim doubles)."* The MAXIMAL hinge (R3) mandates the
OPPOSITE. W54 acknowledges the two-layer override but **does NOT amend or delete the no-glass-on-glass
canon**, and Q4/Q7/Q9 create the EXACT forbidden stack: glass page container → glass story card →
glass button → text, three glass layers over an aurora. W55's legibility carries CONTRAST, not
blur-stacking — darkening a doubly-blurred surface does not un-muddy the stacked blur. **The ONE-model
answer (GLASS-custom HA#1): the `--glass-level` scalar IS the reconciliation tool — nested glass steps
DOWN the level (outer panel level=1, inner cell level≈0.4 toward opaque), not "forbid glass." Rewrite
the canon block from "compose flat tiers inside glass" to "step down `--glass-level` inside glass."**

**INCOHERENCE-2 (the SOTA inversion, PROTO-maximal-glass §0):** iOS 27 (announced 2026-06-08, the day
before this audit) **walked AWAY from content-on-glass** — it added a user transparency SLIDER
(opaque↔clear) and reaffirmed *"text always on solid layers, never directly on glass."* W54's framing
("this is the SOTA, two-layer is superseded") is FACTUALLY INVERTED. The honest framing: glass-ui is
deliberately going MORE aggressive than current iOS, which RAISES the bar on W55. The missing
affordances this implies: (a) a **local content-floor** for nested glass (the SOTA "~30% film behind
the text" — neither W54 nor W55 ships one); (b) a **user `--glass-level` consumer control** (the iOS-27
slider analog — absent from both specs).

### 3c. The glass-cohesion hardening (the unification plan)

1. **W54 must ABSORB four folds its FileBounds currently EXCLUDE** (CH-foundational CH-1, GLASS-ui HA#2,
   the highest-leverage spec fix):
   - the **specular-default-off cohesion** (the I.W6 19-track fold — the 89edffc commit dispositions it
     INTO W54, but W54's FileBounds explicitly exclude `DockIconButton.vue`/`button/index.ts`/
     `dock-controls.css`; the fix has NO home);
   - the **divergent recipes** (SegmentedTabs/Alert/TagsInput/timeline — W54 names only Button+Card+Dialog);
   - the **no-glass-on-glass canon reconciliation** (INCOHERENCE-1);
   - the **dock-shell tint-seam re-point** (`dock.css:146` → the oklab `color-mix` the rungs use — ZERO
     new hook reaches the G2 surface).
2. **Resolve the W54 algebra (PROTO-maximal-glass CHALLENGE 2):** the `1-(1-α)*level` byte-identity claim
   is FALSE against the real seam (it orphans the named `--glass-opacity-*` tokens the a11y brackets read),
   AND the prefers-contrast collapse to a single 0.3 scalar REGRESSES the 5-point per-rung curve
   (resting 0.94 → 0.895, LESS opaque for a CONTRAST preference). Fix: make level a SEPARATE multiplier
   token (`--glass-opacity-resting-eff: calc(1-(1-var(--glass-opacity-resting))*var(--glass-level))`) —
   keep the named tokens, keep the per-rung bracket curve, drop the lossy collapse.
3. **W54 owns the a11y-bracket rewrite OUTRIGHT; strike W55 witness-4 + the `--glass-clarity` placeholder**
   (CH-foundational CH-2, PROTO-adaptive CHALLENGE 5). Both waves currently double-own `glass.css:730-757`.
   Hard-sequence W54 before W55 (wave-open gate: `grep glass-level src/` non-empty before W55 drives).
4. **W55 needs the `@container` ancestry fold + the alpha-decouple** (PROTO-adaptive CHALLENGE 1/2/3,
   CH-foundational CH-3): `@container style()` queries the ANCESTOR, not self — register `@property
   --glass-backdrop {inherits:true}` with a dark default at `:root`, RATIFY the STRICT-ANCESTOR token
   contract, and make `--glass-tint-ink` ALPHA-BOUNDED (mixing 24% opaque ink into a 65%/42% base raises
   alpha to ~0.73 — clears AA by going opaque, the goal-miss). **Cut `contrast-color()`** (returns pure
   black/white, not warm-ink — identity-wrong; the declarative bucket does it on all engines).
   **Per-rung AA calibration** (CH-glass-material C6): a single bright-bucket strength cannot clear 4.5:1
   on the wash rung (0.30) AND stay translucent on overlay (0.95).
5. **ADD the local content-floor + the user opacity control** (PROTO-maximal HA#1/HA#4): a
   `--glass-content-floor` for reading-critical content over busy backdrops (the SOTA film), and a
   `--glass-level` consumer slider/toggle in the dock (the iOS-27 move).
6. **Mint `proof:glass-one-model` / `proof:glass-cohesion`** (GLASS-tokens HA#5, GLASS-ui HA#3,
   GLASS-custom HA#6): assert every glass surface composes {oklab tint wrapper, unified rim, unified grain,
   ONE specular-armed discipline, tier-correct under-shadow} and NO backdrop-blurred surface reads
   `--surface-tint-*` or inline `[backdrop-filter:…]` off the `--glass-bg-*` recipe. This is the machine-lock
   the I.W6 bloom + the dock-off-the-seam needed and lacked.
7. **Run the NESTED-STACK busy-backdrop prototype BEFORE W54 lands** (PROTO-maximal HA#6): mount
   glass-page → glass-card → glass-button + glass-input over the brightest aurora + fourier, light AND dark,
   measure every reading-critical contrast. It either confirms the floor holds or surfaces the content-floor
   need before the page-redesign consumes a broken foundation.

---

## 4. THE DOCK-PERFECTION PLAN — 1-of-8 criteria met; structural, motion, AND adoption gaps

Five dock lanes (CH-dock, DOCK-morph, DOCK-layers-rail, DOCK-controls-nav, DOCK-variants) plus the
RESEARCH-dock-layer-anim SOTA lane. The dock has SOTA bones (one spring, FLIP, velocity-continuity,
one-clock crossfade, the W45 region-model) but DOCK-variants scores it **1 of 8 perfection criteria met**.

### 4a. The dock gap ledger (every axis falsifiable at source)

| Axis | State at HEAD | Lane |
|---|---|---|
| **W54 ROOT (the dock-glass fixes depend on it)** | unbuilt; C3/C4/C5 all route through it | CH-dock C6 |
| **glyph 1.5× mobile scale** | PRODUCT-DEAD — 47 demo glyphs carry `h-4 w-4`, each WINS over `--dock-icon-glyph` | CH-dock C1 |
| **`--dock-tile-pad` × `--dock-scale`** | unthreaded — DK4 grid centering re-breaks at 1.5× | CH-dock C2 |
| **Q3 hover** | sub-perceptual ink/card tints; a REGISTER problem, not magnitude; hover bg = `card 55%` over `card 65%` substrate = sub-1%-ΔL no-op | CH-dock C3, DOCK-controls C3/C4 |
| **four-state MOTION channel** | INCOHERENT — icon+dropdown lift on hover, select+tab do not; specular on 2 of 4 members | DOCK-controls C1/C2 |
| **selected/active = glass** | NOT met — `--surface-tint-12` flat ink wash, not the keyframes-dock glass register the user named the MODEL | CH-dock C5, DOCK-variants |
| **collapsed pill (Q1)** | mis-sized — `--dock-collapsed-summary-min-size` + `--dock-collapsed-padding` UNDEFINED, falls to full width + expanded padding; width-only, no aspect lock | DOCK-morph C4, DOCK-controls Q1 |
| **all-docks-one-root (W61)** | ~1/N adopted — FOUR divergent dock vocabularies (dock.vue / SidebarDock `is-active` / rail.vue raw `bg-foreground/10` / BottomDock raw sep); W61 unauthored→unbuilt | CH-dock C8, DOCK-variants C1 |
| **vertical three-region body** | bare `<slot/>` survived the W45 commit (CSS parity only, structural parity unbuilt) | CH-dock C7 |
| **vertical/rail collapse** | structurally IMPOSSIBLE (force-`alwaysExpanded`) — silent asymmetry | DOCK-variants C2 |
| **squircle "and the like" (R1)** | W56 ships the OPPOSITE of the user decision (panel=round, dialog/sheet=opt-in) | DOCK-variants C3, CH-glass-material C2 |
| **rail phantom indicator** | BROKEN — local `TabsList` default `indicator:true` paints a 2nd `bg-secondary/80` pill; `:indicator="false"` never passed | DOCK-layers-rail L1 |
| **rail on the morph clock** | DK7's killed 2nd clock is ALIVE for the rail highlight (`--dock-motion-resize` vs `--dock-morph-t`) | DOCK-layers-rail L2 |
| **rail-on-collapse** | the switcher rail lives inside the `:inert`/clipped `--full` pane → VANISHES on collapse, no persistent switch | DOCK-layers-rail L3 |
| **same-size swap** | hard CUT — the morph early-returns on `Δsize<0.5`, `[data-morphing]` never arms, no crossfade | DOCK-layers-rail L5 |
| **rail APG** | half-pattern — `role=tablist` with NO `role=tabpanel` panes; rail-tab activation lands focus nowhere | DOCK-layers-rail L8 |
| **two FLIP engines** | `useLayerTransition` (260L) + `dockMorphContext` (408L) — near-identical, already DRIFTED on sibling-retarget | DOCK-layers-rail L4 |
| **morph spring dead-witness** | the gate parses CSS `--spring-dock`, the morph runs JS `DOCK_SPRING` literal — a retune greens the gate | DOCK-morph C1 |
| **`isTransitioning` dead-zone** | ~370ms past visual settle — click-away ignored after the morph finishes | DOCK-morph C3 |
| **layer-swap MOTION** | non-directional dissolve where SOTA is directional/shared-element/depth; `directionTypes` is DEAD plumbing (computed, discarded); UN-OWNED by any wave | RESEARCH-dock-layer-anim R1-R7 |

### 4b. The dock hardening (ordered, serial on the shared dock files)

1. **Land W54 FIRST, then bind the dock-glass re-points as a HARD W54-successor fold** (CH-dock HA#2):
   extend Card's default-off rest-specular to dock controls + glass Button (clear 19→0 tracks), give the
   active/selected state a REAL glass register (keyframes-dock model), tune hover to a perceptible glass
   SURFACE delta (not just scale) as ONE register with the button hover. **Own the W54↔W61 specular
   hand-off explicitly** (DOCK-controls HA#4): it currently falls in the seam between the two waves — W54
   excludes the dock recipes, W61 says "do NOT touch the specular." Assign it to W61, delete the exclusion.
2. **Unify the four-state MOTION channel** (DOCK-controls HA#1): hover scale + specular state-machine as
   ONE comma-group across all four members (icon/tab/select/dropdown), mirroring the bg pair. **Size the
   gleam for the small tile** (DOCK-controls HA#3): `--glass-specular-size` is a % of the box, so a 40px
   tile's gleam is proportionally louder — mint a dock-local override so the family carries the specular on
   ALL four members WITHOUT the I.W6 bloom (the RIGHT fix: size + coherence, not turn-it-off).
3. **W45-TUNE (the binding close):** drop the 47 demo glyph size classes (C1), thread `--dock-tile-pad ×
   --dock-scale` (C2), re-point the hover bg off `card 55%` onto a glass-tier lift (the Q3 root-cause),
   mint the collapsed-floor tokens + an aspect lock (Q1). Re-mark W45 `live-pending` until the paired-π DELTA.
4. **Author + drive W61 dock-unify-root + MIGRATE every demo dock** (CH-dock HA#3, DOCK-variants C1):
   a canonical nav PATTERN (home-left `#persistent` + nav + `<DockSeparator>` dividers); migrate
   dock-layers / dock-with-slider / SidebarDock / rail.vue onto it; the `proof:dock-unify` census-arm must
   assert ZERO raw active-state classes (the SELECTED state still paints four ways).
5. **Fix the rail** (DOCK-layers-rail HA#1-#8): kill the phantom indicator (`:indicator="false"` + a
   count===1 test assertion), put the highlight on `--dock-morph-t`, resolve the rail-on-collapse dead-end,
   merge the two FLIP engines (onto the W42 substrate), fix the same-size hard cut, complete the APG panel
   contract, ratify DK9 + build the DK10 contrast, disambiguate the three-rail noun, stabilize layer order.
6. **Mint the layer-swap-SOTA wave** (RESEARCH-dock-layer-anim HA#1) — directional slide + shared-element
   + optional depth recede, EVERY axis a `calc()` off the existing `--dock-morph-t` (W01 single-clock
   PRESERVED, expressiveness restored, zero extra clocks); make `directionTypes` load-bearing OR delete it;
   name the layer swap as a W42 shared-element consumer.
7. **Harden the morph** (DOCK-morph HA#1/#3/#5): derive the CSS token + JS constant from ONE `springs.ts`
   source (kill the dead-witness), re-derive `isTransitioning` from the spring's settle estimate (collapse
   the dead-zone), add `proof:dock-spring-single-source`.
8. **Capture the binding paired-π DELTA for EVERY dock close** — the W45 JSON itself records the live arm
   as OWED; there is no `W45-DELTA.md`.

---

## 5. THE PUBLISH PLAN — CI is RED right now; the publish is gate-BLOCKED, not staged

CH-close-crossrepo + CHRONIC-miss-release: **the `gates` CI job FAILS on every push to master and
every PR** (live: `gh run list --branch master` → 3× failure). The failing gate (`profile:budget`,
RED at 103.5% gzip) is in the `release` matrix — so a `v3.9.0` tag push fails at `release.yml`. The
3.8.0 publish was MANUALLY unblocked past it (`f2fc614`). The close band treats publish as
"author the machinery, ride release.yml" — but the keystone is blocked, not staged.

**The publish hardening:**
1. **MINT a publish-readiness wave (or W33 step-0) that drives CI GREEN BEFORE the close** — the
   EIGHTH conscious budget rebaseline, sized to carry the glass-first + adaptive-glass + squircle CSS
   (W54/W55/W56 ADD more), must be the **LAST act before the 3.9.0 tag**, not Batch 8 (the MASTER-PLAN
   Batch-8 carve-before-rebaseline sequencing PREDATES the MAXIMAL-glass decision and assumes a
   shrinking close). Add `proof:budget-gate-present` so a later consolidation cannot silently delete it
   (the J→K regression). Convert `profile:budget` from a ratchet to a real budget with a DOWN-ratchet
   obligation at each prune close.
2. **RE-VERSION the entire W33 publish leg 3.8.0 → 3.9.0** — 3.8.0 already shipped; `proof:prod-validation`,
   the STAGED-NOT-PUBLISHED assert, and every "cut 3.8.0" string are wrong.
3. **Enforce master-ancestry at release** (CHRONIC-miss-release H5): `git merge-base --is-ancestor
   $SHA origin/master` — a branch-tip tag must fail. Re-merge `at-dock-convergence → master` + re-tag
   from master for 3.9.0 (master is 3 commits behind HEAD).
4. **Run a dry-cut PROTOTYPE before W33 ships** — `gates.mjs --run release` on a clean tree NOW; the
   3.8.0 evidence says a cut after a quiet period ALWAYS surfaces ≥2 drifts.
5. **Re-ground the stale cross-repo waves** (CH-close-crossrepo §4, CH-misc C1/C2): W41/W35/W34 are born-RED
   on satisfied witnesses (kf 4.1.0 / value 0.11.1 already closed the `file:`-link + E2 cap handoffs; the
   W35 dock-spring baseline is `~3.5.1`-green not `^3.4.0`-RED). A gate born-RED on a satisfied witness
   greens trivially and certifies nothing. Adjudicate the `CONSTELLATION.md` artefact-name collision (the
   W17 band-E file occupies W34's required §16-receiver path).

---

## 6. THE WAVE AMENDS / ADDS THE CURRENT SET IS MISSING (the net-new + re-diagnose set)

The current 70-wave set has SPEC-STALENESS, UN-OWNED defects, and DROPPED folds. Consolidated:

### 6a. Waves that must be RE-DIAGNOSED before they drive (born-RED on a FALSE/satisfied witness)
- **W42** — RED witness 1 FALSE (`dockMorphContext.ts` already ships `DockMorphGroup*`); ALL FOUR named
  second-consumers DELETED by W53. Re-choose a surviving consumer (card→detail / Dialog materialize / the
  dock LAYER SWAP per RESEARCH-dock-layer-anim); add a §vs-W53 disjointness clause. (CH-misc C1/C2.)
- **W38/W47** — born-RED witnesses cite `BouncyTabs` (deleted; now `SegmentedTabs variant=pill`); the
  a11y "category error" the diagnosis rests on is ALREADY FIXED (pill = `role=group`). The remaining issue
  is VISUAL only. AND **D1's MOTION half is ORPHANED** — "animate faster/springier" is unowned (W38 only
  restyles, never re-times the 200ms-ease-out reveal). (CH-aurora CHALLENGE 1/2.)
- **W43** — RED witness 4 grep trips on an existing comment; the SOTA-research-NOW directive is
  CONTRADICTED by the spec's own "deferred behind W14" structure. (CH-misc C3/C4.)
- **W56** — marked `live-verified` but ships the OPPOSITE of the USER-DECIDED R1 (panel=round). The W56b
  amend is authored and UNEXECUTED. (CH-glass-material C2, DOCK-variants C3, GLASS-overlays C4, GLASS-ui C9.)
- **W19** — `live-verified` over an unlanded F0 (header-ribbon still ships). (CH-primitives C1, S3 born-RED.)
- **W51** — the `--dock-scale` reconcile is a LIVE double-scale hazard (1.5 global × 1.5 dock = 2.25×) unless
  atomic. (CH-misc C9.)
- **The four foundational specs (W54/W55/W60/W51)** are pinned to stale `6569b7a`; re-pin to true HEAD and
  re-diagnose W54 to absorb the 89edffc disposition. (CH-foundational CH-4.)

### 6b. NET-NEW waves the current set does NOT own
- **Q8 gate-pattern de-trap (BLOCKER, UN-OWNED)** — `open=ref(true)` non-dismissable modal traps the visitor;
  NO wave owns the fix; W60 only says "leverage glass cards." Must land BEFORE W60 wraps pages. (CH-demo-ia
  CH-2, GLASS-demo H2.)
- **Q5 motion-page union (UN-OWNED)** — W18 FREEZES the duplication (`foundations/motion` + top-level `motion`)
  into the new gate. Amend W18 to dissolve it. (CH-demo-ia CH-3.)
- **Q2 aurora black-bar (mis-routed)** — routed to W47, which is contractually OUT of `usePresetThumbnails.ts`
  (the file the bar lives in). Needs its own micro-wave or a W47 FileBounds extension. (CH-aurora CHALLENGE 3.)
- **The demo-rot class-guard** — `proof:story-exercises-seams` (every substrate/composition story binds the
  tokens/composables it narrates) — folds glass-material/math-paper/blob-mood/card-story into ONE class-fix.
  Must be its OWN EARLY wave, NOT a W33 rider. (CH-misc HA#4.)
- **Three unowned god-modules** — `constellationField.ts` (510), `SegmentedTabs.vue` (683), `GlassDock.vue`
  (534) are over the bound and in NO carve wave's FileBounds. Assign each. (CH-structural §1.)
- **P5 carousel glass** — the embla `/navigation/carousel` is the ONLY nav surface with ZERO glass (W23
  fixed a DIFFERENT defect; the P5 "Apple-like + glassy + squishy" ask is a clean miss reported `complete`).
  Fold into W54 or a W23b. (CH-primitives C3.)
- **W14 EXCISE NOW** — `painterly.wgsl.ts`/`wake.wgsl.ts` are precept-banned dead scaffold shipped across 3
  tranches; the `device.lost` punt is a real freeze-to-black bug in 3.8.0. (CH-aurora CHALLENGE 4.)
- **EXECUTE W46** — the blob is STILL live-broken at HEAD; W46 is sound-plan-unexecuted; pin the derivable
  magnitudes (specStrength formula, squash `k`) BEFORE the live audit, not all-deferred. (CH-blob CH1/CH3.)
- **Fix the underline squish (W53 real bug)** — `squishOnTravel` early-returns for underline (the `--stretch`
  write never reaches the `::before`); the HandOff check #4 would FAIL live. (CH-tabs-motion CHALLENGE 1.)

### 6c. The FourierField paradox (GLASS-demo C3) — the user's "execute NOW" directive is doubly-ignored
`FourierField.vue` is a fully-built 353-line shipped primitive on its own subpath — yet wired into ZERO
demo pages, absent from `manifest.ts`. The user's third unique hero substrate cannot be demonstrated. Wire it
into ≥1 hero NOW (honor the pull-up), and build the missing `.story-bg-grid` substrate (Q4's "PAPER + GRID"
— grid does not exist).

---

## 7. THE RE-ORDERING (the hardened DAG)

The MASTER-PLAN's 10-batch DAG is sound in shape but mis-ORDERS the forcing functions (W33-last) and
predates two decisions (MAXIMAL-glass → CSS grows; the publish is already RED). The hardened order:

- **Batch -1 (NEW, FIRST) — soundness gate battery** (S1-S8 §2). Born-RED on real HEAD defects; makes
  every subsequent mark honest; bites at AUTHORING time. **Nothing else dispatches until these land.**
- **Batch 0 — re-diagnose + re-pin** (§6a): re-pin the 4 foundational specs to HEAD; re-diagnose W42/W38/
  W47/W43/W56/W19/W51 against the post-W02/post-W53/post-publish reality; amend W54 to absorb the four
  dropped folds (§3c.1); EXECUTE the W56b squircle (R1).
- **Batch 1 — the glass ROOT** (§3): W54 (with the algebra fix + the canon reconciliation + the 4 folds),
  then W55 hard-serial (with the `@container` ancestry + alpha-decouple + per-rung AA + contrast-color cut),
  the content-floor + the user opacity control. Run the NESTED-STACK prototype FIRST. W43 fourier SOTA
  pull-up ‖ W42 re-diagnosed substrate. These unblock the page-redesign.
- **Batch 2 — the live BLOCKERS**: EXECUTE W46 blob, W48 glass-material reauthor, **Q8 gate-pattern de-trap
  (the new owner)**, W44 dark-contrast, W14 EXCISE.
- **Batch 3 — the dock finish** (§4b, serial on shared dock files): W54-successor dock-glass re-points →
  W45-TUNE → W61 dock-unify-root + migrate every demo dock → the rail fixes → the layer-swap-SOTA wave →
  W06 carve+showcase. Capture a DELTA for each.
- **Batch 4 — the page-redesign umbrella** (W60 + the demo-rot guard already landed in Batch -1's spirit):
  every story in a glass card with paper/grid/aurora/constellation/fourier heros; build `.story-bg-grid`;
  wire FourierField; revert W57 to `live-pending` + re-scope its Q9 close. Blocked on W54.
- **Batch 5 — demo IA**: W18 (with the Q5 motion-union dissolved), W40, re-verify W57; the storybook-totality
  gate wired.
- **Batch 6 — aurora ‖ sizing ‖ a11y**: W38 (idiom + the D1 motion half) / W47 (+ Q2 black-bar) / W14-residue ‖
  W51→W50→reconcile onto ONE `--ui-scale` (atomic, no double-scale) ‖ W55-residue/W36.
- **Batch 7 — cross-repo + slides** (re-grounded per §5.5): W41/W35/W34 born-RED only on witnesses that hold;
  W20 flagged as the HARD blocker on the W35 prune-publish; the Tranche-K re-seed.
- **Batch 8 — encapsulation**: W25a/b → W26 (with the 3 unowned god-modules + the SegmentedTabs `<style>` carve)
  → W27a/b (scrub all 6, not 3) — BEFORE the budget rebaseline.
- **Batch 9 — close**: the publish-readiness wave (CI GREEN, the 8th budget lift, master-ancestry,
  re-version 3.9.0), then W33 → W39 lighthouse → provenance-clean master-merged 3.9.0 publish → consumer
  bumps (the S5 gate forces them) → slides deploy → prod-validate.

---

## 8. THE CONVERGENCE CRITERIA (what "PERFECTED" means — the close cannot place until ALL hold)

1. **`audit/visual/` is non-empty and every `live-verified` row has a fresh on-disk `.png` DELTA**
   (S1 GREEN). Today: 0 PNGs, ≥10 inflated marks.
2. **Every glass surface answers to ONE `--glass-level` + ONE oklab tint seam + ONE specular discipline**
   (`proof:glass-one-model` GREEN); the no-glass-on-glass canon is reconciled (step-down, not forbid); the
   nested-stack busy-backdrop prototype clears 4.5:1 on the worst case.
3. **The dock meets all 8 perfection criteria** (one root, glass selected, perceptible glass hover, four
   members one four-state, tight collapsed pill on BOTH axes, `--dock-scale` on ONE `--ui-scale`, big-dock
   squircle + R1 extension, captured DELTA) — today 1 of 8.
4. **CI is GREEN on master push** (`gates` job + `verify-ci` + `profile:budget` within a real budget);
   `proof:consumer-staleness` GREEN (the 8 speedtest files + the test-mirror fixed); the tag sits on master.
5. **No wave is `live-verified` over its own RED witness** (S3 GREEN — W19/W56/W57 reconciled).
6. **Every named pass-3 ask (Q1-Q9) has an OWNING wave that DELTA-captures its fix** — today Q8/Q5/Q2 are
   un-owned, Q3/Q9 are live-contradicted by their "verified" waves.
7. **No precept-banned dead scaffold ships** (the WGSL twins excised, `directionTypes` adopted-or-deleted,
   the `stackVtStyle` decoration resolved) and the overfitting audit runs against PRODUCTION (not demo)
   consumers.

---

## 9. THE SINGLE PARAGRAPH (for the orchestrator)

The 31 lanes converge on one truth: AX is structurally sound in PLAN and inflated in LEDGER, and the
enforcement that would make the ledger honest is parked in the LAST wave — the maximal-drift position.
The hardened roadmap inverts that: a Batch-(-1) soundness battery (capture-gate, label-retire,
orphan-claim, tests-in-typecheck, consumer-staleness, ci-codegen, roster-rebaseline) lands FIRST and
bites at commit time, so the glass-cohesion plan (W54 absorbs four dropped folds + reconciles the
no-glass-on-glass canon via level-step-down + fixes the lossy algebra; W55 fixes the `@container`
self-query + alpha-decouple + cuts contrast-color; a local content-floor + a user opacity control carry
the deliberately-more-aggressive-than-iOS-27 legibility), the dock-perfection plan (W54-successor glass
re-points + four-state motion unification + W61 unify-root + the rail fixes + the directional layer-swap,
every axis one `calc()` off the one scalar + the capture for each), and the publish plan (drive CI green
+ the 8th budget lift as the last pre-tag act + master-ancestry + re-version 3.9.0) each close on a
captured pixel a grep cannot fake. Until "live-verified" is gate-defined by a fresh capture, glass is one
model, the dock is one root, and CI is green on master, the close cannot place — and the founding chronic
stays immortal, recurring through the very tranche built to kill it.
