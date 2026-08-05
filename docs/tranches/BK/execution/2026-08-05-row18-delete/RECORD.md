# BK #18 · W-DELETE — the reduction cut

**Row:** #18 W-DELETE (Φ5, the spine) · **spec of record:** TR §A row #18 → `WAVES.md:323` as amended
· **seat:** scout + implement (Opus) · **date:** 2026-08-05 · **base:** `4917a042`.

> **[2026-08-05 CURE PASS — Opus row-18 cure seat, `claude-opus-5[1m]`.]** The first adjudication
> returned **CURE-REQUIRED** with seven confirmed defects (`verdict.residue` CURE-1…CURE-7). All seven
> are applied on this text and in the tree. The outcome-changing one is **CURE-1**: the
> `animated-digit` KEEP is **STRUCK** and the component **DELETED with its relay**, on the driver's
> binding ruling — Ruling 1 (*existence ⇒ relay, never ⇒ KEEP*) cannot produce a KEEP, `GESTALT.md:17`
> records the ground as **merit** (*"trivial recipe, 92 LOC"*, ECOUTE:313) and it went unrebutted, and
> `GESTALT.md:116` closes the census route. Every figure below is re-measured at the cured tree; the
> struck text is kept in place, dated, never silently rewritten.

TR wins on divergence, and TR's own precedence chain wins inside TR's cited sources:
*this artifact → EXEC-STATE + RATIFICATION + WORKFLOWS → EXEMPLARS-CODEX · GREENFIELD-TERMINAL ·
PROCEDURAL-LEDGER · LAYOUT · ARCHAEOLOGY · GESTALT · FROST-TABS-REAUDIT · **CWT/CWT-2/CWT-3** →
**WAVES.md** Band 0-6 bodies as amended → RECONCILIATION/ECOUTE* (`TERMINAL-ROSTER.md:147`).
Two of `WAVES:323`'s clauses are decided against it by that chain; both are recorded below with
their falsifier rather than silently executed or silently dropped.

---

## §0 · THE WHOLE-REPO WALK (G-RELAY), RUN FRESH THIS SEAT

Universe **generated**, never remembered (#76's law): every `~/Programming/*/package.json` carrying
`@mkbabb/glass-ui`, intersected with the 15 named roots. Class = **cross-repo** per RATIFICATION §1.1.
Detector, verbatim:

```
grep -rn "glass-ui/<subpath>" atlas bbnf-buddy bbnf-lang keyframes.js fourier-analysis latex-paper \
  muster oscilloscope parse-that sci-report slides slides-K speedtest value.js words \
  --include='*.ts' --include='*.tsx' --include='*.vue' --include='*.js' --include='*.jsx' \
  --include='*.css' --exclude-dir=node_modules --exclude-dir=dist --exclude-dir=.git \
  --exclude-dir=build --exclude-dir=.vite --exclude-dir=coverage --exclude-dir=test-results \
  --exclude-dir=docs --exclude-dir=audit --exclude-dir=audits
```

| subject | cross-repo consumers measured this seat | TR's recorded row | verdict |
|---|---|---|---|
| `instrument-chassis` | **muster ×6** (`App.vue:31`, `useMusterApp.ts:33`, `VerdictStage.vue:11`, `InstrumentAside.vue:17`, `WinnerHero.vue:46,47`) · **speedtest ×5** (`App.vue:257`, `useRouteTransition.ts:34`, `MapView.vue:53`, `ChartsView.vue:132`, `tests/App.surveyEntry.test.ts:101`) | ✦³ DELETE CONFIRMED, proof REJECTED; muster is a PROTOTYPE whose counts never bind | **DELETED** |
| `completion-seal` | **atlas ×2** (`design/recipes/completion.ts:5`, `skin/category.ts:2`) · **sci-report ×2** (`GalleryView.vue:19`, `CategoryHomeView.vue:4`) | relay → atlas (already re-exports + wraps `resolveCompletionSeal`); sci re-points to `@mkbabb/atlas` | **DELETED** |
| `header-ribbon` | **keyframes.js ×1** (`demo/components/instrument/shell/EditorShell.vue:116`) | sole consumer ×1 ON-7.x, REQUIRED class | **DELETED** |
| `paper-backdrop` | **atlas ×1** (`platform/chrome/background/Atmosphere.vue:64`) · **speedtest ×1** (`components/survey/ThankYou.vue:99`) | relay → atlas + speedtest | **DELETED** |
| `tags-input` | **ZERO across all 15 roots** — no subpath, no code reference anywhere | ASK g5 ratified default = DELETE at #18 | **BLOCKED — routed, §3** |
| `carousel` | **words ×3** (`ImageCarousel.vue:89,90` + `vite.config.ts:217`, `^3.0.0` pin) | ✦² KEEP by OWNER WORD | not deleted |
| `animated-digit` | **fourier ×1** (`CoefficientsSpectrum.vue:19`) · **speedtest ×1** (`ResultStack.vue:173`); muster's 3 hits are explicit NON-uses (*"NOT `AnimatedDigit`"*), speedtest's other 8 are prose | verdict re-taken under §1.1 before its cut | ~~not deleted, §4~~ **[2026-08-05 CURE-1] DELETED** — relay banked → RT-18E/#76, §5 |
| `metric` | keyframes ×1 · fourier ×7 · muster ×5 · sci-report ×1 · speedtest ×6 | ✦³ LEAVES the DELETE list → #87 | not deleted |
| `deck` | **atlas ×2** real imports (`useStageDeck.ts:2`, `useDeckDetent.ts:1`); slides/slides-K carry prose only | ⊕⁴ RULED: deck LIVES → #40 | not deleted |

Every TR-recorded consumer row reproduced **exactly**. Nothing new appeared; nothing named went
missing. The ship-time re-run stays #76's — this is the cut-time walk, not the ship census.

---

## §1 · WHAT LANDED — the ~~four~~ **[2026-08-05 CURE-1] five** component deletes

Atomically per component, across `src/` · `demo/` · `package.json` exports + `typesVersions` ·
the story manifest · the contract tests · the CSS cascade · the subpath policy · the canon-doc map ·
the public-surface register.

1. **`instrument-chassis`** — `src/components/instrument-chassis/` (5 files, 261 lines),
   `tests/components/instrument-chassis.contract.test.ts`, `demo/stories/data/instrument-chassis.vue`,
   manifest row, `styles/index.css` `@import` + cascade-order entry 12, `canon-doc.mjs` README key,
   `public-surface.spec.ts` exact-subpath row.
2. **`completion-seal`** — `src/components/completion-seal/` (6 files, 654 lines),
   `demo/stories/feedback/completion-seal.vue`, manifest row, `styles/index.css` `@import` + its
   docblock, **and the four now-writer-less `@property` registrations** `--seal-draw` / `--seal-scale`
   / `--seal-glint` / `--seal-ink` in `tokens/property-regs-specular.css` (the wave's own no-orphan
   duty: this cut created their deadness, so this cut carries them out — see §5).
3. **`header-ribbon`** — `src/components/header-ribbon/` (5 files, 131 lines),
   `tests/components/header-ribbon.contract.test.ts`, `demo/stories/navigation/header-ribbon.vue`,
   manifest row, `styles/index.css` `@import`.
4. **`paper-backdrop`** — `src/components/paper-backdrop/` (3 files, 31 lines),
   `tests/components/paper-backdrop.contract.test.ts`, `public-surface.spec.ts` ×2.
   `demo/stories/foundations/paper-texture.vue` **SURVIVES, re-homed on its real subject**: the
   component was a 17-line `<div class="paper-underpaint" aria-hidden="true">` — pure indirection
   over a CSS recipe — and the foundations page is about the *recipe*, not the wrapper. The story
   now mounts the class directly, so the paper-material foundation keeps its specimen and the
   library loses only the indirection.
5. **`animated-digit`** **[2026-08-05 CURE-1 — added this pass]** — `src/components/animated-digit/`
   (3 files: `AnimatedDigit.vue` 92, `README.md`, `index.ts`),
   `tests/components/custom/animated-digit/AnimatedDigit.test.ts` (3 cases),
   `demo/stories/motion/animated-digit.vue`, the `text-motion` family-member row
   (`demo/stories/motion/text-motion.vue:17-21`), `dock-layer-contexts.ts:340`, the
   `subpath-policy.mjs` PUBLISH row, `src/index.ts:72`'s prose, the `manifest.ts:957` blurb.
   **The number-motion axis keeps its demo specimen**: `demo/stories/motion/countup.vue` mounts the
   surviving `useAnimatedNumber` recipe DIRECTLY (`:9,:20`) — the same paper-texture shape, the
   recipe survives and the 92-line indirection over it dies. `useAnimatedNumber` /
   `useAnimatedNumberMap` are UNTOUCHED and still exported (`/motion`, `public-surface.spec.ts:315`).
   Ground: `GESTALT.md:17` RULING 1 — *"trivial recipe, 92 LOC" (ECOUTE:313) — **merit** …
   **DELETE-with-relay STANDS***, corroborated by `COMPONENT-WAVES-TERMINAL-3.md:461` and
   `RECONCILIATION.md:348` (both *"ruled DELETE"*). Relay → **RT-18E/#76**.

**Export surface:** `node scripts/regen-exports.mjs --write` re-derived `package.json` from the
single-source classification — ~~**73 → 69 export keys**~~ **[2026-08-05 CURE-1] 73 → 68 export keys**
across the two writes, `DROPS: ./completion-seal, ./header-ribbon, ./instrument-chassis,
./paper-backdrop` then `DROPS: ./animated-digit`, `adds=0 targetMismatch=0 collisions=(none)`.
Post-write the read-only arm reproduces exactly: `exportKeys 68/68 jsSubpaths=62 drops=0 adds=0
targetMismatch=0 tvDrops=0 tvAdds=0 collisions=(none) · EXACT REPRODUCTION: YES · EXIT 0`.
`subpath-policy.mjs`'s PUBLISH tally corrected ~~`30 → 26`~~ **`30 → 26 → 25`** on the same edits
(a count that lies is the class this row exists to kill).

---

## §2 · WHAT LANDED — the three motion routes + Y-7

`WAVES:323`'s motion clause carries **no competing senior claim** (checked against EXEMPLARS-CODEX,
GREENFIELD-TERMINAL, PROCEDURAL-LEDGER, LAYOUT, ARCHAEOLOGY, GESTALT, FROST-TABS-REAUDIT, CWT/-2/-3
— zero hits on `motion/tempo`, `motion/reveal`, `motion/scroll`), so it executes here.
`REGISTRY.md:168` C-4 is the standing defect row (F30 · F32 · F42, *"BUILD — `W-DELETE`"*).

- `demo/stories/motion/tempo.vue` (169) · `motion/reveal.vue` (172) · `motion/scroll.vue` (39) +
  `motion/scroll/` (`ScrollChoreographyBody` 177 · `ScrollNativeBody` 148 · `ScrollReaderBody` 237).
- Their three manifest rows; `demo/shell/dock-layer-contexts.ts`'s **Entrance** layer group (its one
  entry was `reveal`) and the `Wand2` icon import that group alone used.

**Y-7 — `W-DELETE` owns it (`WAVES.md:322` "Owns: C-1…C-5, Y-7"), and it DISCHARGES BY SUBTRACTION.**
`BJ.W-REDUCE-DELETE` left a CSS register writer-less and left src prose citing symbols it had
deleted (ROUND-1 BJ-9). Both halves land:

- **(a) the `.scroll-pin` register.** Its named cure was *"move `useScrollPin` + its `.scroll-pin*`
  register demo-local"*. Its sole importer was `demo/stories/motion/scroll/ScrollChoreographyBody.vue:18`
  — deleted in this same cut, so "demo-local" has no destination and the honest act is the stronger
  one: `src/composables/motion/scroll/useScrollPin.ts` (127) **DELETED**, and the whole `.scroll-pin`
  block **DELETED** from `styles/scroll-choreography.css` (the `@property --pin-t` registration,
  `.scroll-pin`, `.scroll-pin-stage`, both phase recipes) with its five tokens
  (`--scroll-pin-phase-reveal-end-frac` · `-expand-end-frac` · `-squash-floor` in
  `scroll-choreography.css`; `--scroll-pin-stage-height` · `--scroll-pin-lift` in
  `tokens/scroll-tokens.css`) and the `demo/capture/capture.css` settle arm. This is the wave's own
  stated law — *never ship the CSS register writer-less* — satisfied by subtraction, not relocation.
  `grep -rn "useScrollPin\|scroll-pin\|--pin-t" src demo tests` → **0**.
- **(b) the prose rot.** Every src comment naming a symbol that wave deleted is corrected ON the text:
  `scroll-driven.css:13,21,63` and `tokens/scroll-tokens.css:15` (`useStaggerReveal`),
  `glass/liquid-enter.css:18` (`useBloomUp`), `composables/motion/core/asElement.ts:10`
  (`useScrollPin`), `composables/motion/scroll/useScrollScene.ts:75` (`--pin-t` example).
  `grep -rn "useStaggerReveal\|useBloomUp\|useTextHighlight\|useNumericTransition" src demo tests` → **0**.

**Deleted-component prose swept in the same pass** (each corrected, none struck-and-abandoned):
`src/index.ts:72` · `styles/glass/ladder.css:64` · `styles/utilities/base.css:122` ·
`styles/tokens/glass-fx.css:49,252` · `styles/tokens/glass.css:139` ·
`styles/tokens/property-regs-specular.css:2` · `components/dock/styles/shell.css:471` ·
`demo/shell/AppShell.vue:215` · `scripts/profile-bundle.mjs:470` · `styles/index.css:234` ·
`styles/draw-in.css:28`. Residual grep for the four names across `src demo tests scripts
vite.config.ts package.json` → **0**.

---

## §3 · REFUSED-IN-PART — `tags-input` (ASK g5), routed to #65's C-9 pin

**The order:** ASK g5's ratified default is *"DELETE at #18, with the G-RELAY whole-repo walk"*; TR#44
seats the same sequencing (*"the LEGACY `tags-input` DELETES at #18 … #44 authors the clean-break
SUCCESSOR"*). The walk is **run and clean** (§0: zero consumers across all 15 roots + mirrors).
The disposition is not in doubt. **The cut cannot land at this row**, and the falsifier is executable:

`tags-input` carries **two live rows in the C19 semantic roster**
(`docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/GATE-SEMANTIC-ROSTER-C19.json`) —

| C19 `activeVitest` id | `sourcePath` |
|---|---|
| `reka.tags-input.value-binding` | `tests/components/ui/reka-binding-idiom.test.ts` |
| `tags-input.ime-delimiter-guard` | `tests/components/tags-input.contract.test.ts` |

~~Deleting the component deletes both source cases, and `scripts/gate-register.mjs:492` raises
`active <id>: sourcePath missing` for each — **`violations:0` → `violations:2`**, G-GATE-BUDGET RED.~~

**[2026-08-05 CURE-2 — the figure was DOUBLE its measured value; corrected, and it now states the
detector verbatim.]** The detector at `gate-register.mjs:488-492` tests **file existence only** —
`if (!io.exists(row.sourcePath)) violations.push(...)` — and the `reka.tags-input.value-binding`
row's `sourcePath` is `tests/components/ui/reka-binding-idiom.test.ts`, a **5-case shared file**
(Button `:49` · Switch `:84` · TagsInput `:96` · Toast `:125` · Command `:152`) that **SURVIVES** the
delete. It therefore raises no violation; it only *drifts*, and it is **already drifting at HEAD**
(`drift:1` in the receipt this row calls byte-identical). Re-measured this seat with the REAL
`verifyGateRegister()` over an injected `io` reproducing the cut exactly (component gone, contract
test gone, the TagsInput case struck from the shared file; nothing written to disk) —
**`violations:0` → `violations:1`**, the detector's own bytes:

```
violations: 1
  VIOLATION active tags-input.ime-delimiter-guard: sourcePath missing — tests/components/tags-input.contract.test.ts
titleDrift: [ 'reka.tags-input.value-binding' ]
```

**The route and the reasoning survive unchanged**: `violations:1 ≠ 0` is still G-GATE-BUDGET RED, and
curing it still requires editing C19, which changes `rosterSha256` and forces the
`PINNED_ROSTER_SHA256` rebind at `gate-register.mjs:453-455`. That rebind **is** the C-9 one batched
SHA pin, and #65 — which owns §B.5 and that pin — already ruled on it this week
(`gates/ROSTER.md:53`, `execution/2026-08-04-row65/RECORD.md`): the C19 byte-cut is *"BATCHED to the
C-9 one-SHA-pin at band close … landing it solo spends the one pin and falsifies
`TERMINAL-ROSTER.md:159`/`:215` + #68's CANON receipt, all out of fence."*

So: **#18 is DISCHARGED-IN-PART on `tags-input`.** The disposition is settled, the walk is banked,
and the delete is one batched byte away. **ROUTE RT-18A → #65 (C-9 batch, band close):** strike both
C19 rows with the component, rebind the pin once, and the four files
(`src/components/tags-input/` 8 files, `tests/components/tags-input.contract.test.ts`, the
`TagsInput` case in `reka-binding-idiom.test.ts`, `src/index.ts:326` + `src/components/index.ts:34`,
`subpath-policy.mjs`'s INTERNAL row, `demo/stories/data/tags-input.vue`, the manifest row and
`dock-layer-contexts.ts:274`) fall in the same commit that spends the pin. Refusing to spend it here
is the *whole* point of a one-pin discipline; a second-best that half-deletes the component and
leaves the register RED would be exactly the laundered-verdict class BK exists to end.

---

## §4 · REFUSED, WITH GROUNDS — the six `compositions` pages and the category

`WAVES:323` orders *"the six `compositions` pages and the category"* deleted here. **CWT-2 — senior
to `WAVES.md` on TR's own precedence chain — assigns them elsewhere, by name, twice:**

- `COMPONENT-WAVES-TERMINAL-2.md:297`, verbatim: *"Demo: DELETE `feedback/confirm-dialog.vue` (265) +
  `compositions/gate-pattern.vue` (201); … **Rest of `compositions/` → W-DAG-REDUCE** (F45 says
  'likely', **not this wave's call**)."*
- `COMPONENT-WAVES-TERMINAL-2.md:1549` (the close row for F45): *"compositions-section prune →
  W-DAG-REDUCE."*
- `COMPONENT-WAVES-TERMINAL-2.md:168` (the dialog wave's collision table): *"rest of `compositions/`
  (5 stories, 962 lines) is W-DAG-REDUCE's."*

**Disk corroborates the routing:** `tests/components/dialog.confirm-preset.test.ts:7` imports
`GatePatternStory` from `demo/stories/compositions/gate-pattern.vue` — the gate-pattern story is a
live fixture of the **dialog** contract test, so its deletion belongs in the cut that rewrites that
test. `STRUCTURE-ZONES.md:1743` (R24) independently declines the `compositions/chassis.vue` route
(*"Route existence is story placement, not module structure"*, ROUTED to D5, ANALYSIS-SPEC §D5).

**ROUTES:** `compositions/gate-pattern.vue` **→ #38 W-DIALOG** (paired with
`feedback/confirm-dialog.vue`, one cut, one test rewrite) · the remaining five + the category
**→ #21 W-DAG-REDUCE**. ECOUTE F43/F44/F45's `W-DELETE` column and `REGISTRY.md:168` C-4 are the
junior tier of the same chain (*"RECONCILIATION/ECOUTE (accounting inputs)"*) and do not overturn a
named senior assignment. Nothing is dropped: the prune still happens, at the row that owns the file.

---

## §5 · NOT DELETED — the ~~four~~ **[2026-08-05 CURE-1] three** subjects struck from the list, each with its ground

| subject | ground | owner |
|---|---|---|
| `metric` | ✦³ round 2 item 8 / SL-2 — the family LEAVES the DELETE list and consolidates into ONE apotheosis; the R-1 relay becomes a MIGRATION (keyframes `SequenceTarget.vue:138` + sci-report). RATIFICATION §2 R-1's "DELETE the family" is superseded by the later owner sitting. | **#87** |
| `deck` | ⊕⁴ RULED: deck LIVES; spec of record `DECK-RELOCATION.md` PART I §3; substrate SHARED with carousel. `WAVES:323`'s "zero usage sites anywhere" is false at HEAD — atlas imports `useDeck` twice. | **#40** |
| `carousel` | ✦² OWNER WORD (THE OWNER SITTING item 5, A-2) — KEEP, superseding the arms' DELETE-with-relay. Corroborated live: words ×3 on a `^3.0.0` pin. | kept |
| ~~`animated-digit`~~ | ~~**verdict re-taken this seat under RATIFICATION §1.1**, as TR#18 requires. Cross-repo class = **2 distinct importing files** (fourier `CoefficientsSpectrum.vue:19` · speedtest `ResultStack.vue:173`), i.e. AT the ≥2 bar — the exact bar that condemned `carousel` at 1 before the owner overrode it. Ruling 1 holds (existence ⇒ relay, never ⇒ KEEP), so this is not "it has consumers therefore keep": it is that the single stated deletion ground for this subject was *below the bar*, and the re-take measures it *at* the bar. **NOT deleted at #18**; GF-FOURIER §9's routed row keeps it.~~ **[2026-08-05 CURE-1: STRUCK — the row moves to §1.5, DELETED. See below.]** | ~~not deleted~~ **DELETED** |

### §5.1 · [2026-08-05 CURE-1] `animated-digit` — the KEEP struck, the surviving ground

The re-take was a legitimate **act**; its recorded **outcome** was unsupported, on four falsifiers
the adjudication and both challengers reproduced independently on disk:

1. **The ground was never a census.** `GESTALT.md:17`, verbatim — `| animated-digit | "trivial
   recipe, 92 LOC" (ECOUTE:313) — **merit** | fourier-analysis …CoefficientsSpectrum.vue:19 +
   speedtest | **DELETE-with-relay STANDS** |`. The consumer column of that table is headed
   *"consumer found this seat ★"* — **relay evidence, expressly not disposition**. The merit ground
   stands **unrebutted**: nothing in this row's work rebutted *"trivial recipe, 92 LOC"*, and the cut
   confirms it (92 lines, whose body is `useAnimatedNumber` + a `tabular-nums` font-feature block).
2. **The census route is closed.** `GESTALT.md:116`: *"animated-digit's is 'trivial recipe' …
   **Only deck's ground ('0 usage sites anywhere') is the refuted census**."*
3. **The ≥2 bar is not §1.1's.** `RATIFICATION` §1.1 defines what a consumer *is* and names three
   classes; it carries **no ≥2 bar at all**. The bar the struck text invoked is `WAVES.md:329`'s,
   attached to **carousel** — a different subject with a different ground.
4. **The routed instruction presupposes a cut.** `DESIGN-NOW.md:326`: *"re-take that verdict under
   the ratified definition **or ship its relay before the delete**"*, owner column *"animated-digit's
   **cut wave** + ship census"*. A delete-or-relay disjunction; never a KEEP.

Under **Ruling 1** — *existence ⇒ relay, **never** ⇒ KEEP*, the rule TR#18's own cell restates — a
re-take that measures consumers cannot produce a KEEP. **DELETE-with-relay executes.** The aggravating
fact is recorded too: `GESTALT` sits in the **same** `TR:147` tier this row invoked at §4 to override
`WAVES.md` on the compositions clause. The row honored that tier when it produced a refusal and
overrode it when it produced a cut; the cure restores one rule for both.

**The delete cites the §1.1 whole-repo walk (§0, RUN FRESH this seat, 15 generated roots):** 2 real
importing files — fourier-analysis `web/src/components/shared/CoefficientsSpectrum.vue:19,99` and
speedtest `src/features/speedtest/ui/ResultStack.vue:173` (used at `:68`, `:146`). muster's 3 hits are
**explicit non-uses** (`useVerdictMoment.ts:19`, `WinnerHero.vue:16,88` — *"NOT `AnimatedDigit`"*) and
speedtest's remaining 8 are prose. **Relay → RT-18E/#76, ONE marked addendum per repo** per the
consumer-updates ruling (*consumer dependence never preserves an obsolete API; the consumer updates
via a marked addendum in ITS tranche*): both consumers inline the two-line recipe
(`useAnimatedNumber(() => value) → <span class="tabular-nums">{{ formatted }}</span>` plus the
`font-feature-settings: "ss01","tnum","lnum"` register) against the **surviving, still-exported**
`@mkbabb/glass-ui/motion` `useAnimatedNumber`. Nothing is stranded: the recipe ships, only the
92-line wrapper over it dies.

**~~Two~~ [2026-08-05 CURE-4/CURE-5] Three register findings, dispositioned differently, on purpose:**

- The four `--seal-*` `@property` registrations were made dead **by this cut** → they died **with**
  it (§1.2). A wave carries out its own dead.
- `.draw-rule` / `[data-draw-in]` (`styles/draw-in.css`) has **zero src/demo call-sites and had zero
  before this cut** — pre-existing, not this wave's creation. It is **NOT** deleted here (that is
  #19's `G-OVERFIT` +EXPORT-REACH / dead-selector sweep). What this cut *does* fix is the **false
  claim** it carried. ~~Both texts now state membership honestly and say the reach is read off the
  tree, never off the comment.~~

  **[2026-08-05 CURE-5 — the prose cure was HALF-LANDED; finished this pass.]** Only the
  `CompletionSeal` half had been struck. Three false-membership claims survived and are now struck on
  the text, each measured first (`grep -rn "draw-rule\|data-draw-in" src demo tests tests-visual` →
  **zero call-sites**, definition sites only):
  - `styles/index.css:233-234` asserted *"the demo masthead rule + HandMark are its consumers"* —
    **both false**. No demo masthead element exists anywhere (`grep -rn masthead demo` returns only
    story prose and HandMark's own text), and HandMark keeps its **own** `draw-on`
    (dashoffset/clip-path) recipe, which `draw-in.css`'s own cured text already says is NOT a member.
    Replaced with *"MEMBERSHIP TODAY IS ZERO"* + the reason.
  - `draw-in.css:29` asserted *"Membership today is ONE recipe plus the demo masthead rule"* — the
    *"plus the demo masthead rule"* half is unsupported; struck, and the surviving "ONE recipe" is
    corrected to zero (HandMark is expressly NOT a member).
  - `draw-in.css:8` asserted *"**The** masthead divider **rides** this register"* — the same claim in
    present tense; re-stated counterfactually (*"A divider that adopts this register rides …"*), so
    the LAW survives without minting a member that does not exist.

  **ROUTE RT-18B → #19:** the register itself, plus the symbols this cut newly orphaned
  — `vReveal`, `useLiquidReveal`, `useStagger`(reveal barrel), `useScrollScene`, `supportsCssTimeline`
  — enter #19's zero-internal-consumer census as measured inputs, not as assertions.

- **[2026-08-05 CURE-4] `.scroll-progress` + `[data-scroll-reveal]` (`styles/scroll-driven.css`) —
  the orphan claim FAILS on the walk; NOT carried out, and the row says why.** This cut deleted
  `demo/stories/motion/scroll/ScrollNativeBody.vue`, the repo's **sole markup writer** of both
  selectors (HEAD `:97-98`, `:115`), so the in-repo census reads zero and the adjudication flagged
  them as dead-by-this-cut. Re-run under the row's own §1.1 law — which is a **cross-repo** class,
  not a src-only census (the exact error `GESTALT.md:116` names) — the walk finds **live writers in
  both cases**:

  | register | live cross-repo writer, measured this seat |
  |---|---|
  | `.scroll-progress` | fourier-analysis `web/src/components/paper/PaperView.vue:314` — `<div ref="progressBar" class="paper-progress-bar scroll-progress" />`, documented at `:150`/`:304` as *"glass-ui's `.scroll-progress` recipe (scroll-driven.css)"* |
  | `[data-scroll-reveal]` | speedtest `src/components/survey/SurveyWizard.vue:88` — `data-scroll-reveal` on the FadingScroll host; its `:65` calls it *"glass-ui's PUBLISHED native"* register and its `:641` cascade table resolves `[data-scroll-reveal] > *` by specificity |

  So **neither register is dead** and the "a wave carries out its own dead" law does not reach them —
  the `--seal-*` quartet died because it was dead *everywhere*, which these are not. Also checked, so
  the negative is measured rather than assumed: no in-repo consumer depends on the recipes via the
  dual-path gate either — `useScrollProgress`'s one live caller (aurora `useAurora.ts:169`) passes
  `reactive: true` (always attaches), and both live `useScrollTrigger` callers (`CardHeader.vue:32`,
  `useScrollChrome.ts:187`) pass `trackProgress: false`, so `NATIVE_SCROLL_TIMELINE` gates nothing off
  for them. **What IS owed** is the in-repo *specimen*: the library now ships two recipes with no demo
  page mounting them. That is a demo-coverage debt, not a dead register — **ROUTE RT-18B → #19**
  alongside `.draw-rule`, with the walk banked here. The membership + the two consumer sites are
  recorded ON the text at `scroll-driven.css:31-46` so the next census reads them off the tree.

---

## §6 · VERIFY GATE — verbatim

**[2026-08-05 CURE PASS — the whole battery RE-RUN at the cured tree. The pre-cure block is struck
below it, not overwritten.]**

```
$ npx vue-tsc --noEmit
(no output) — REAL exit 0

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  147 passed (147)
      Tests  1087 passed | 2 expected fail (1089)
   Duration  9.04s
REAL EXIT=0

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0
  STATUS VOCABULARY (⊕²⁵): PASS · FAIL · ABSENT. `unbound` is the ABSENT count — seat names with no live executable. An unwired gate is ABSENT, never GREEN.
  DRIFT (routed to #65) reka.tags-input.value-binding — tests/components/ui/reka-binding-idiom.test.ts
    roster title: TagsInput: the active item resolves `data-[state=active]` (the `tag=` idiom is gone)
exit=0
```

The file/test deltas against the pre-cure block are **exactly** the CURE-1 delete: −1 test file
(`tests/components/custom/animated-digit/AnimatedDigit.test.ts`) and −3 cases. Receipt **byte-identical**
again — CURE-1 mints, binds and arms nothing (`animated-digit` carries **no** C19 roster row, unlike
`tags-input`; that asymmetry is why one cut lands here and the other cannot). `npm run build` +
`npm run demo:dist:build` re-ran after the cure (the `boot-graph` freshness arm demanded it, correctly,
on the first post-cure run); both artifact trees are fresh at this record.

~~PRE-CURE BLOCK (2026-08-05, superseded above):~~

```
$ npx vue-tsc --noEmit
(no output) — exit 0

$ npx vitest run tests/styles tests/components tests/gates
 Test Files  148 passed (148)
      Tests  1090 passed | 2 expected fail (1092)
   Duration  14.48s

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0
  STATUS VOCABULARY (⊕²⁵): PASS · FAIL · ABSENT. `unbound` is the ABSENT count — seat names with no live executable. An unwired gate is ABSENT, never GREEN.
  DRIFT (routed to #65) reka.tags-input.value-binding — tests/components/ui/reka-binding-idiom.test.ts
    roster title: TagsInput: the active item resolves `data-[state=active]` (the `tag=` idiom is gone)
exit=0
```

**Receipt byte-identical pre → post.** Gate seats **+0** — nothing minted, nothing bound, nothing
armed. `bound:8 · unbound:50 · violations:0`, `rosterSha256:dc05df91` unmoved — which is precisely
why §3 could not land.

**Full suite** (beyond the gate's three dirs), re-run at the cured tree: `npx vitest run` →
**206 files, 1483 passed | 2 expected fail (1485)**, REAL EXIT=0, 11.97s.
~~[pre-cure: **207 files, 1486 passed | 2 expected fail (1488)**, 19.11s]~~ The first run of `tests/gates` failed ONE arm —
`boot-graph … the dist-demo it measures is NEWER than every source it is built from` — the freshness
detector correctly demanding a rebuild after a source cut; `npm run build` + `npm run demo:dist:build`
ran and the arm is green. Both artifact trees are fresh at this record.

**Release path — G-BUNDLE-RATCHET, measured on both sides.** `node scripts/verify-export-types.mjs`
exits 1 on the ratchet. It is **PRE-EXISTING and #66-routed** (⊕²⁰(d) · ⊕²¹(1): the rebind belongs to
the close row, and the release path is deliberately RED until that named rebind). Measured this seat
rather than asserted — a pristine `git archive HEAD` tree, built and run in a scratch dir:

| tree | candidate | datum (`.bundle-ratchet`) | delta |
|---|---|---|---|
| HEAD `4917a042`, untouched | **914,999** | 903,382 | +11,617 RED |
| ~~this cut, pre-cure~~ | ~~**906,459**~~ | 903,382 | ~~+3,077 RED~~ |
| **[2026-08-05 CURE PASS] this cut, cured** | **904,417** | 903,382 | **+1,035 RED** |

Detector verbatim, both sides (`scripts/verify-export-types.mjs:742`):
`Error: G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 914999 > 903382` on the pristine
`git archive HEAD` tree built in scratch, and `… 904417 > 903382` on this tree. The HEAD figure is
now reproduced by **three independent seats** (implement · challenger B · this cure seat).

~~**This row subtracts 8,540 packed bytes** and moves the ratchet 73% of the way back to its datum.~~
**[2026-08-05 CURE-1] This row subtracts 10,582 packed bytes** (`animated-digit` adds a further
2,042 over the pre-cure cut) and moves the ratchet **91%** of the way back to its datum.
The rebind is still #66's; this row neither spends it nor hides behind it.

---

## §7 · RESIDUE — named, owned, none falsifying the cut

| id | item | owner |
|---|---|---|
| RT-18A | `tags-input` delete + its two C19 rows + the pin rebind, as one batched act | **#65** (C-9, band close) |
| RT-18B | `.draw-rule`/`[data-draw-in]` dead register + the 5 newly-orphaned motion symbols **[2026-08-05 CURE-4: + the `.scroll-progress` / `[data-scroll-reveal]` MISSING IN-REPO SPECIMEN — the registers themselves are LIVE cross-repo (fourier `PaperView.vue:314` · speedtest `SurveyWizard.vue:88`) and are NOT dead; what #19's census inherits is the demo-coverage debt, with the walk banked at §5]** | **#19** |
| RT-18C | `compositions/gate-pattern.vue` (with `feedback/confirm-dialog.vue` + the test rewrite) | **#38** |
| RT-18D | the remaining five `compositions` stories + the category + its `focal.ts` / `category-hero.ts` / `aurora-hero.ts` / `dock-layer-contexts.ts` / `intro.vue` / `rail.vue` seams | **#21** |
| RT-18E | consumer migrations for the ~~four~~ **[2026-08-05 CURE-1] five** deleted subpaths — muster ×6 + speedtest ×5 (instrument-chassis) · atlas ×2 + sci-report ×2 (completion-seal) · keyframes ×1 (header-ribbon) · atlas ×1 + speedtest ×1 (paper-backdrop) · **fourier ×1 (`CoefficientsSpectrum.vue:19,99`) + speedtest ×1 (`ResultStack.vue:173`, used `:68`/`:146`) (animated-digit — inline the 2-line recipe over the SURVIVING exported `useAnimatedNumber`)**; ONE **marked addendum** per repo IN THAT REPO'S TRANCHE (the consumer-updates ruling), census re-run fresh at ship | **#76** |
| RT-18F | the 8.0.0 breaking-surface ledger entry: ~~4~~ **[2026-08-05 CURE-1] 5** export subpaths removed (73 → ~~69~~ **68** keys) | **#66** (`R-PUBLIC-8-LEDGER`) |
| RT-18G **[2026-08-05 CURE-6]** | the **`tests-visual/`** residue naming subjects this cut deleted. The suite is UNWIRED (no `package.json` script, outside the vitest include) so none of it goes RED today — which is exactly why it must be named rather than left to rot: `completion-seal.spec.ts` (the WHOLE 200-line spec — `.completion-seal`, `.completion-seal__mark`, the 4 `@property` regs) · `phase-palette.spec.ts:45-46` (`CHASSIS_ROUTE = "/data/instrument-chassis"` · `CHASSIS_SEL = ".instrument-chassis"`, consumed at `:76`,`:94`,`:153`,`:174`,`:203`) · `css-critical.spec.ts:25`,`:109` (the critical-CSS regex still asserts `completion-seal\|scroll-pin\|instrument-`) · `motion-demo.spec.ts:173-186`,`:225-226` (navigates the deleted `/motion/scroll` route and asserts `.scroll-progress` + `[data-scroll-reveal]` attached) · `a11y-splitchars.spec.ts:37` (prose naming `animated-digit`). **The one arm CURED HERE, not routed:** `scroll-motion.spec.ts` arm (c) — see the note under this table | **#19** (with RT-18B's sweep) |
| RT-18H **[2026-08-05 CURE-7]** | the undischarged FOLD residue of the three motion-route deletes. `ECOUTE:41` **F30** (*"what even is /motion/tempo"*) dispositions *"fold into springs configurator"* owned by `W-DELETE`; `ECOUTE:42` **F32** and `ECOUTE:50` **F42** both disposition *"one scroll register"*, same owner. The DELETE is legal (`WAVES:323` outranks ECOUTE on `TR:147`'s chain and no senior doc claims the three routes — verified negative, §2) but the pages died **bare**: (a) `demo/stories/motion/springs.vue` only READS `motionTempo()` at `:107`/`:201` to display a value — there is **no tempo knob**, so the `--motion-tempo` axis (7 CSS spring readers + 4 JS engines, expressly out of scope for deletion per ASK-5) now has **zero demo affordance**; (b) the F32/F42 *"one scroll register"* shipped as **zero** scroll registers on the demo — `.scroll-progress` + `[data-scroll-reveal]` lost their only specimen here (RT-18B) and `.scroll-cascade` survives only as an incidental host class on foundations pages. Neither is a falsifier of the cut; both are the fold this row owed and did not build | **#87** (springs/configurator apotheosis) for (a) · **#19** for (b) |

**[2026-08-05 CURE-6] The one `tests-visual` arm cured in place, not routed —
`scroll-motion.spec.ts` arm (c).** The routed items above are dead-but-inert. Arm (c) was different in
kind: `test.skip(!pin, "the .scroll-pin showcase is not on this route")` guarded a readback of
`.scroll-pin-stage` / `.scroll-pin`, and this cut deleted the **entire** `.scroll-pin` register
(`@property --pin-t`, both phase recipes, all 5 tokens) plus `useScrollPin`. The guard could therefore
never again be false — the arm would have survived as a **PERMANENT SILENT PASS**, which is the
masking class (⊕²⁵: *an unwired gate is ABSENT, never GREEN*; a subject-less gate that reports PASS is
worse than one that reports ABSENT). **Deleted**, with the strike recorded on the text at
`tests-visual/scroll-motion.spec.ts:115-122` and the header clause-(c) + the `:159` capture comment
re-trued. Its subject died in this cut, so this cut carries it out — the same law applied to
`--seal-*` and `.scroll-pin` itself. Note for the record: the spec's `ROUTE` const
(`:41 = "/motion/scroll-choreography"`) names a route that **never existed in the manifest at HEAD
either** — that pre-existing rot belongs to RT-18G, not here.

**π/DELTA:** `WAVES:323` names a chromium desktop+mobile story-index capture *"before/after (route
count falls)"*. ~~Route count falls by **7** (4 component stories + 3 motion stories)~~
**[2026-08-05 CURE-3] Route count falls by 6**, and the figure now states the detector verbatim:

```
$ git show HEAD:demo/stories/manifest.ts | grep -c '            s('
88
$ grep -c '            s(' demo/stories/manifest.ts
82
```

**Δ = −6**: **3** component stories (`header-ribbon`, `instrument-chassis`, `completion-seal`) + **3**
motion stories (`tempo`, `reveal`, `scroll`). The struck "4 component stories" double-counted
`paper-backdrop`, whose story **SURVIVES re-homed** (`foundations/paper-texture.vue`) as §1.4 itself
records. **CURE-1 does not move this figure**: `animated-digit`'s story was a `<FamilyTabs>` MEMBER of
`motion/text-motion`, not a manifest route — the route survives with 2 members instead of 3. The
manifest arithmetic is machine-checked by the green `tests/demo/router.test.ts` (5/5). The capture is a
driver-browser act (the browser seat is a singleton, never co-batched) and is **OWED**, not claimed —
**it must be checked against −6, not −7, or it false-FAILs.**

**[2026-08-05 CURE-7] TR#18's CWT-3 §4 clause — dispositioned.** The TR cell names *"CWT-3 §4's
20-row ledger with `size="xs"` and `hideIndicator` deletions REFUSED on live consumers."* Both named
refusals are **HONORED BY INACTION**: those rows sit inside the per-component `§4 · §STRIKE / §ADD`
ledgers that belong to the component lanes (`COMPONENT-WAVES-TERMINAL-3.md:97`, `:242`, `:387`,
`:552`, `:761`), not to the reduction cut, and this row struck nothing from them. Recorded so the
row's coverage of its own TR cell is complete on paper, not merely in the tree.

**Diffstat:** ~~58 files changed, 45 insertions(+), 3,132 deletions(-) — net **−3,087**.~~
**[2026-08-05 CURE PASS]** see §8.

---

## §8 · [2026-08-05 CURE PASS] THE CURE LEDGER + THE CORRECTED PASTE BLOCKS

### §8.1 · The seven cures, each with its executed act

| cure | grade | act |
|---|---|---|
| **CURE-1** | HIGH, outcome-changing | `animated-digit` KEEP **STRUCK**, component **DELETED with relay** (§1.5 · §5.1). Driver ruling binding: Ruling 1 cannot produce a KEEP; the merit ground (`GESTALT.md:17`, ECOUTE:313) stands unrebutted; the census route is closed by `GESTALT.md:116`. Relay folded into RT-18E/#76 as a per-repo marked addendum |
| **CURE-2** | MED | `violations:0→2` **corrected to `violations:0→1`** (§3), re-measured with the real `verifyGateRegister()` over an injected io and quoted verbatim. Route to RT-18A/#65 + the C-9 pin reasoning survive unchanged |
| **CURE-3** | MED | π story-index DELTA **corrected −7 → −6** (§7), stated as the two `grep -c` figures (88 → 82). CURE-1 does not move it — `animated-digit` was a family MEMBER, not a route |
| **CURE-4** | MED | the two "orphaned" registers **dispositioned by a fresh §1.1 walk** (§5): both carry LIVE cross-repo writers (fourier `PaperView.vue:314` · speedtest `SurveyWizard.vue:88`), so the orphan premise FAILS — not carried out; the missing in-repo specimen routed to RT-18B/#19 and recorded on the text |
| **CURE-5** | MED-LOW | the `.draw-rule` prose cure **finished** — three surviving false-membership claims struck (`index.css:233-234`, `draw-in.css:29`, `draw-in.css:8`); `RECORD:206`'s "Both texts now state membership honestly" struck as premature |
| **CURE-6** | LOW | `tests-visual/` residue **routed** as RT-18G; the masking arm — `scroll-motion.spec.ts` arm (c)'s permanent silent skip — **DELETED**, not routed, because this cut killed its subject |
| **CURE-7** | LOW | the undischarged F30 tempo-knob + F32/F42 one-scroll-register fold **banked** as RT-18H; TR#18's CWT-3 §4 clause **dispositioned** (refusals honored by inaction) |

### §8.2 · Verify battery at the cured tree

```
$ npx vue-tsc --noEmit                                     → no output, REAL exit 0
$ npx vitest run tests/styles tests/components tests/gates  → 147 passed (147)
                                                              1087 passed | 2 expected fail (1089)
                                                              REAL EXIT=0
$ npx vitest run  (full)                                   → 206 passed (206)
                                                              1483 passed | 2 expected fail (1485)
                                                              REAL EXIT=0
$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2 unbound:50 drift:1 rosterSha256:dc05df91 violations:0
exit=0                                                     → BYTE-IDENTICAL, seats +0
$ node scripts/regen-exports.mjs        → exportKeys 68/68 … EXACT REPRODUCTION: YES · EXIT 0
$ npm run build && npm run demo:dist:build                 → exit 0, both artifact trees fresh
```

**Diffstat, cured:** `65 files changed, 91 insertions(+), 3392 deletions(-)` — net **−3,301**
(66 paths in `git status`). Edits stay **UNCOMMITTED**; the driver commits.

### §8.3 · BANKED CURSOR PASTE — Φ5 table, replace the `| 18 |` row

```
| 18 | W-DELETE | Φ5 | **LANDED-IN-PART 2026-08-05** ~~UNSTARTED~~ — **FIVE components DELETED whole** (instrument-chassis · completion-seal · header-ribbon · paper-backdrop · **animated-digit**: src + demo + exports + manifest + tests + cascade + subpath policy + canon-doc + public-surface), exports 73→**68** keys via `regen-exports --write` (`EXACT REPRODUCTION: YES`); the three motion routes DELETED (tempo · reveal · scroll + its 3 bodies + the emptied Entrance dock-layer group); **Y-7 DISCHARGED BY SUBTRACTION** — `useScrollPin` + the whole `.scroll-pin` register (incl. `@property --pin-t`, 5 tokens, the capture arm) die with their sole importer, and every src comment naming a `BJ.W-REDUCE-DELETE` casualty corrected ON the text (`useStaggerReveal`/`useBloomUp`/`useScrollPin` → 0 repo-wide); the 4 orphaned `@property --seal-*` registrations carried out with their component. **animated-digit: the KEEP was STRUCK on adjudication and the DELETE-with-relay EXECUTED** — Ruling 1 (existence ⇒ relay, never ⇒ KEEP) cannot yield a KEEP; `GESTALT.md:17` records the ground as MERIT (*"trivial recipe, 92 LOC"*, ECOUTE:313) and it went unrebutted; `GESTALT.md:116` closes the census route; `RATIFICATION` §1.1 carries no ≥2 bar (that bar is `WAVES:329`'s, attached to carousel). Its demo specimen survives in `motion/countup`, which mounts the still-exported `useAnimatedNumber` directly. **REFUSED-IN-PART, both routed with executable grounds:** (a) **tags-input → RT-18A #65** — walk clean (0 consumers/15 roots, g5 upheld) but its `tags-input.ime-delimiter-guard` C19 row makes `gate-register.mjs:492` fire **`violations:1`** (measured, not 2 — `reka.tags-input.value-binding`'s sourcePath is the SURVIVING shared `reka-binding-idiom.test.ts`, so it only drifts, as it already does at HEAD) and force the `PINNED_ROSTER_SHA256` rebind = the C-9 one pin, reserved to band close (`gates/ROSTER.md:53`); (b) **the six compositions + the category → RT-18C #38 (gate-pattern, with confirm-dialog + the `dialog.confirm-preset.test.ts:7` fixture) / RT-18D #21 (the rest)** — CWT-2:297/:1549/:168 outrank WAVES.md on TR:147's chain and assign them by name ("not this wave's call"). NOT deleted with grounds: metric →#87 · deck →#40 (WAVES' "zero usage sites" false, atlas ×2) · carousel owner-KEEP (words ×3). Two "orphaned" CSS registers RE-WALKED and CLEARED: `.scroll-progress` + `[data-scroll-reveal]` lost their sole in-repo writer here but carry LIVE cross-repo writers (fourier `PaperView.vue:314` · speedtest `SurveyWizard.vue:88`) — NOT dead, NOT carried out; only the missing demo specimen is owed →#19. Residue: RT-18B `.draw-rule` dead register + 5 orphaned motion symbols + the 2 specimen-less scroll registers →#19 (the false "≥2-consumer evidence" prose FULLY cured here — `index.css:233-234` + `draw-in.css:8`/`:29`) · RT-18E consumer migrations, now FIVE subpaths →#76 · RT-18F 5 subpaths removed →#66 `R-PUBLIC-8-LEDGER` · RT-18G the `tests-visual/` residue →#19 (and `scroll-motion.spec.ts` arm (c)'s permanent silent skip DELETED here — the masking class dies with its subject) · RT-18H the undischarged F30 tempo-knob →#87 + F32/F42 one-scroll-register →#19 · **π story-index route-count DELTA = −6** (manifest `s(` rows 88→82; 3 component + 3 motion stories; paper-texture survives re-homed) OWED to the driver browser seat — check against −6, not −7. Gate seats **+0**, receipt byte-identical `seats:60 … bound:8 … unbound:50 … violations:0`; ratchet measured on pristine `git archive HEAD` — 914,999 → **904,417** vs datum 903,382, **−10,582 packed bytes** (91% back to datum), the RED pre-existing and #66's. Adjudicated CURE-REQUIRED then **ALL SEVEN CURES APPLIED** (cure ledger at `RECORD.md` §8). Record: `execution/2026-08-05-row18-delete/RECORD.md` \| TR#18 → WAVES:323 as amended \| G-RELAY enforces the whole-repo walk (RUN FRESH this seat, 15 generated roots); deck RE-HEARD not deleted (#40); ✦² carousel KEEP by owner word · ✦³ instrument-chassis DELETE CONFIRMED · ✦³ metric leaves the DELETE list · ⊕² relay rows grown |
```

### §8.4 · BANKED TR PASTE — append to `TERMINAL-ROSTER.md` row #18's cell

```
 **LANDED-IN-PART 2026-08-05 (adjudicated CURE-REQUIRED; all seven cures applied).** **Five** components cut whole with their relays banked — `instrument-chassis` (muster ×6 · speedtest ×5 ⊘ re-verified) · `completion-seal` (atlas ×2 · sci-report ×2) · `header-ribbon` (keyframes ×1) · `paper-backdrop` (atlas ×1 · speedtest ×1) · **`animated-digit`** (fourier `CoefficientsSpectrum.vue:19,99` · speedtest `ResultStack.vue:173`); `foundations/paper-texture` SURVIVES re-homed on `.paper-underpaint`, and the number-motion specimen survives in `motion/countup` on the still-exported `useAnimatedNumber`. Exports **73 → 68** keys, regenerated from the single-source classification, `adds=0 targetMismatch=0`, policy tally corrected 30→26→25. Motion routes `tempo`/`reveal`/`scroll` (+3 bodies) DELETED — no senior claim exists on them (EXEMPLARS-CODEX/GF-TERMINAL/PROCEDURAL/LAYOUT/ARCHAEOLOGY/GESTALT/FROST/CWT-1-2-3 all silent), `REGISTRY:168` C-4 the standing row; the FOLD those rows specified (F30 tempo knob · F32/F42 one scroll register) was NOT built and is banked as **RT-18H**. **Y-7 DISCHARGED BY SUBTRACTION**: `useScrollPin`'s sole importer died in this same cut, so "move demo-local" had no destination and the register went out whole rather than shipping writer-less; the deleted-symbol prose swept to 0. **§4 compositions clause REFUSED with its falsifier**: `CWT-2:297` assigns `gate-pattern` to **#38** (paired with `confirm-dialog`; `dialog.confirm-preset.test.ts:7` mounts it as a live fixture) and *"Rest of `compositions/` → W-DAG-REDUCE … **not this wave's call**"* — CWT-2 outranks WAVES.md on this artifact's own precedence chain (`:147`), so the prune lands at **#21**, not here. **CWT-3 §4's 20-row ledger: both named refusals HONORED BY INACTION** (those rows belong to the component lanes' own §STRIKE/§ADD tables). **ASK g5 UPHELD but DISCHARGED-IN-PART**: the tags-input walk is clean (0 consumers, 15 roots) and the disposition settled, but its `tags-input.ime-delimiter-guard` C19 row makes the delete raise **`violations:1`** — measured with the real detector over an injected io, NOT 2: `reka.tags-input.value-binding`'s sourcePath is the SURVIVING 5-case shared `reka-binding-idiom.test.ts` and `gate-register.mjs:491` tests file existence only, so that row merely drifts, as it already does at HEAD — and 1 ≠ 0 still forces the C-9 pin rebind that `gates/ROSTER.md:53` reserves to band close; routed **RT-18A → #65**, one batched byte away. **animated-digit's KEEP STRUCK on adjudication and the DELETE-with-relay EXECUTED**: the re-take was a legitimate act with an unsupported outcome — `GESTALT.md:17` records the ground as **merit** (*"trivial recipe, 92 LOC"*, ECOUTE:313, **DELETE-with-relay STANDS**) with its consumer column headed *"consumer found this seat ★"* (relay evidence, not disposition); `GESTALT.md:116` scopes the refuted census to **deck alone**; `RATIFICATION` §1.1 carries **no ≥2 bar** (that bar is `WAVES:329`'s, attached to carousel); `DESIGN-NOW.md:326` is a delete-or-relay disjunction. Under Ruling 1 — *existence ⇒ relay, never ⇒ KEEP* — the re-take as executed cannot produce a KEEP. Three register findings dispositioned differently ON PURPOSE: the `--seal-*` `@property` quartet died WITH this cut (its deadness was this cut's doing); `.draw-rule`/`[data-draw-in]` — dead BEFORE it — stays for #19 with its false *"≥2-consumer evidence"* claim now FULLY cured on the text (`index.css:233-234` + `draw-in.css:8`/`:29`, all three false-membership assertions struck, membership stated as ZERO); and `.scroll-progress`/`[data-scroll-reveal]`, which this cut left specimen-less, are **NOT dead** — a fresh §1.1 walk finds live cross-repo writers (fourier `PaperView.vue:314` · speedtest `SurveyWizard.vue:88`, the latter naming the recipe *"glass-ui's PUBLISHED native"*), so only the missing in-repo specimen is owed →#19, with the membership recorded on `scroll-driven.css`. **The one masking gate killed:** `tests-visual/scroll-motion.spec.ts` arm (c) guarded a `.scroll-pin` readback behind `test.skip(!pin, …)` whose condition could never again be false once this cut deleted the register — a permanent silent PASS, DELETED rather than skipped (⊕²⁵: an unwired gate is ABSENT, never GREEN); the rest of the `tests-visual/` residue is routed as **RT-18G**. Gate seats **+0**, register receipt byte-identical (`bound:8 · unbound:50 · violations:0`); ratchet measured on a pristine `git archive HEAD` tree both sides, by three independent seats: **914,999 → 904,417** vs datum 903,382, i.e. **−10,582 packed bytes**, the RED pre-existing and #66's. **π DELTA = −6** (manifest `s(` rows 88→82), NOT −7 — the browser capture must be checked against −6. Residue: RT-18A →#65 · RT-18B →#19 · RT-18C →#38 · RT-18D →#21 · RT-18E (five subpaths) →#76 · RT-18F →#66 · RT-18G →#19 · RT-18H →#87/#19. Record: `docs/tranches/BK/execution/2026-08-05-row18-delete/RECORD.md` (cure ledger at §8).
```
