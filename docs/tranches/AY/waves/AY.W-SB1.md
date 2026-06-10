# AY.W-SB1 — Storybook per-route KEEP/FIX/RETIRE verdict + orphan COMPONENT retire

**Tranche** AY (glass-ui) · **Band** C (storybook prune + restructure) · **Kind** impl + retire ·
**State** OPEN · **Repo** glass-ui (`/Users/mkbabb/Programming/glass-ui`) · **HEAD** `at-dock-convergence` (`fba6262`)
**Spec inputs** `audit/hardening/H-storybook.md` (the §2 per-route disposition table + the §3 F1-F9 findings),
`audit/hardening/H-overfitting.md` (Finding 3 — route-prune ≠ component-retire), `audit/hardening/H-chronic-defer.md`
(chronic F — the route-prune SPECIFICS carried AX→AY).
**Sibling waves** `AY.W-FF2.md` (OWNS the `evalFourier` dead-export delete — NOT this wave), `AY.W-CON*` (constellation
— a useTokenColor consumer this wave must not break).

---

## Goal criterion

Every `§B11` storybook route carries a RECORDED KEEP / FIX / RETIRE verdict, and the route-prune is finally
COMPONENT-deep, not route-deep. Today the prune keeps being framed as "delete a story file", so each tranche
removes a route and re-flags "IA done" while the underlying library-orphan COMPONENTS persist on the published
surface (the chronic the H lane named: "substrate-without-consumer deferred under cover of a route prune"). W-SB1
takes the component-level verdict the route prune is downstream of: `header-ribbon` (0 src + 0 external consumers,
only its own demo story) is RETIRED at the root — dir + `/header-ribbon` subpath + `package.json` exports +
`src/api/index.ts` types + the story + the manifest row, clean break, no alias; `glass-panel` (0 src-component +
0 external consumers, two demo stories) is RETIRED the same way; `useTokenColor` is KEPT (it clears the
≥2-consumer bar — speedtest's `useMeterTokenColors` imports it externally, plus two demo stories) and BOOKED with
a consumer-evidence doc so the next audit does not re-flag it. The self-acknowledged FIX-ROUTE `native-top-layer`
(`manifest.ts:188` literally says "Folds into Dialog as a `:native` opt-in (FIX-ROUTE)") is EXECUTED: its native
`<dialog>`/`commandfor` + `HoverPopover :native interestfor` probes fold into the Dialog + HoverPopover stories as
a native opt-in section, and the standalone capability-probe route retires. The already-DONE items
(disco-glyph/glyph-face excised AX.W19, useTokenColor-keep AX.W19, blob consolidated, speedtest boundary locked,
slider zoo collapsed) are CLOSED-WITH-EVIDENCE in this spec so the wave does not re-litigate settled
dispositions. Success looks like: a per-route disposition table that leaves no route as "wtf", two orphan
components GONE from the public surface with deletion-proofs, one orphan KEPT with documented evidence, the
native fold landed, and a NEW component-orphan gate that makes the route-prune-≠-component-retire confusion
impossible to relapse.

## Completion criterion

The six hard-gate clauses below all verify (the §4 checklist; G1–G5 the prune/IA half, G6 the §1.5 per-route
DESIGN-defect cohort — the broken front door, the constellation zero-paint SOURCE fix, the voice scrub, the
typewriter wrap): (G1) `proof:no-orphan-demo-route` (already
CI-wired) stays GREEN after the route deletions and the native fold — no orphan file, no dangling row; (G2) the
NEW `proof:component-orphan` gate is born-RED at the pre-edit HEAD (header-ribbon + glass-panel present with 0
non-self consumers and no evidence doc) and GREEN after the retire — every `custom/` component package + every
flat subpath + every root-barrel composable has ≥2 non-self consumers OR a `docs/consumer-evidence/<artefact>.md`,
self-proving with a synthetic always-orphan probe; (G3) deletion-proofs for `header-ribbon` and `glass-panel` —
`rg` returns only-removed across `src/ demo/ ../slides/src ../speedtest/src`, the dirs are gone, the subpath +
`package.json` exports + `typesVersions` + `api/index.ts` types are gone; (G4) `npm run build` +
`npm run verify-export-types` GREEN with the two subpaths absent (the dts publication probe passes the smaller
surface); (G5) `useTokenColor` is KEPT with `docs/consumer-evidence/use-token-color.md` authored and the
`consumer-evidence/README.md` table row added, and the native-top-layer fold is verified by the manifest row
absent + the Dialog/HoverPopover stories carrying the native section; (G6) the §1.5 design defects fixed,
RUNTIME-witnessed and born-RED at HEAD — G6a front door NAVIGATES (probed `pathChanged:false` today), G6b the
constellation hero PAINTS (0px host / 300×150 canvas today — the SOURCE fix), G6c no voice leakage (the
meta-language GREEN pass), G6d the headline does not wrap mid-word ("f / or" today). Both goal AND completion must
hold for a clean close.

---

## 1. The verified defect (file:line, against HEAD `at-dock-convergence` `fba6262`)

The W-SB rows in `AY.md §2 Band C` are one-line scope only; the §B11 corpus list they cite is materially STALE
(roughly half already actioned in AX). The REAL open defect is component-deep, not route-deep.

### 1.1 The route-prune ≠ component-retire defect (the headline — H-overfitting Finding 3)

A route prune removes a `demo/stories/<cat>/<id>.vue`; it does NOT answer whether the underlying COMPONENT clears
the substrate-with-consumer bar (L invariant 8). Three artefacts are library-orphans on the PUBLISHED surface;
the planned route prune leaves all three published-but-unused:

| # | Orphan | Published surface (file:line) | Consumers (the binding count) | Verdict |
|---|---|---|---|---|
| O1 | `header-ribbon` | `src/components/custom/header-ribbon/{index.ts,HeaderRibbon.vue,types.ts}` · `/header-ribbon` subpath (`src/subpaths/header-ribbon.ts`, `package.json:312-315` exports + `:121-122` typesVersions) · `src/api/index.ts:200-207` (`HeaderRibbonPosition`, `HeaderRibbonProps`) | `rg -l "HeaderRibbon\|header-ribbon" src/ demo/`: ONLY its own story `demo/stories/navigation/header-ribbon.vue` + `manifest.ts` + the api re-export. `rg ... ../slides/src ../speedtest/src`: 0 code hits (the only slides hit is `DESIGN-FOURIER-v2.md`, a markdown doc, not code). **0 src consumers, 0 external consumers.** NOT on the root barrel (`src/index.ts`: 0 hits). | **RETIRE** (fails ≥2-consumer bar; corpus says REMOVE; clean break) |
| O2 | `glass-panel` | `src/components/custom/glass-panel/{index.ts,GlassPanel.vue}` · `/glass-panel` subpath (`src/subpaths/glass-panel.ts`, `package.json:356-359` exports + `:91-92` typesVersions) · `src/api/index.ts:99` (`GlassPanelVariant`), `:158` (`GlassPanelProps`) | `rg -l "GlassPanel\|glass-panel" src/ demo/`: 2 demo stories (`substrates/glass-panel.vue`, `foundations/paper-glass.vue`) + the api types. **0 src-COMPONENT consumer** (the `.glass-panel` CSS lives in `GlassPanel.vue`'s own `<style>` `:105-132`, self-contained — NOT a glass.css cross-consumer). **0 external consumers.** NOT on the root barrel (`src/index.ts`: 0 hits). | **RETIRE** (a demo-only published component; 2 stories ≠ 2 binary consumers) |
| O3 | `useTokenColor` | root barrel `src/index.ts` (via `composables/dom/index.ts:45` `export * from "./useTokenColor"`) · `/dom` subpath (`package.json:488`) · `src/composables/dom/useTokenColor.ts` | `../speedtest/src/.../meter/useMeterTokenColors.ts:19` `import { useTokenColor } from "@mkbabb/glass-ui/dom"` + uses it at `:36-37` (`--meter-track-stroke`, `--meter-dial-color`) — **a genuine EXTERNAL consumer** + 2 demo stories (`substrates/constellation.vue:22,60`, `StoryHero.vue:74`). | **KEEP + BOOK** (clears the ≥2-consumer bar; AX.W19 `509aed8` deliberately kept it "constellation consumer") |

> **Adjudication of the H-overfitting vs H-storybook contradiction (read before executing).** H-overfitting
> Finding 3 lists `useTokenColor` as a "root-barrel library-orphan" with "ZERO external consumers", asserting
> speedtest's `useMeterTokenColors` is "NOT a consumer of glass-ui's `useTokenColor`". **That assertion is FALSE
> against HEAD** — `../speedtest/src/components/speedtest/composables/meter/useMeterTokenColors.ts:19` literally
> `import { useTokenColor } from "@mkbabb/glass-ui/dom"` and invokes it at `:36-37`. H-overfitting conflated the
> speedtest LOCAL wrapper-NAME (`useMeterTokenColors`) with the glass-ui import it composes. The
> `useResolveTokenColor.ts:18-22` disclaimer is about a SIBLING composable (`useResolveTokenColor`, a different
> DOM-free purpose), not about whether `useTokenColor` has consumers. H-storybook §2 is correct: KEEP. This wave
> follows the empirical grep, not the stale finding. The verdict is BOOKED with evidence (G5) so the audit
> cannot re-flag it a fourth time.

### 1.2 The native-top-layer self-acknowledged FIX-ROUTE (H-storybook F5)

`demo/stories/containers/native-top-layer.vue` is a standalone capability-probe page; its manifest blurb
(`manifest.ts:188`) explicitly says: `"… capability probe. Folds into Dialog as a ':native' opt-in (FIX-ROUTE)."`
The fold has NOT happened across the AX IA restructure (chronic). The page demos:
`GlassDialogNative` (a native `<dialog>` + `commandfor` + light-dismiss consuming the `.glass-top-layer`
`@starting-style` grammar, `native-top-layer.vue:7,80-98`) and `HoverPopover :native` (`interestfor` opt-in,
`:110`). `GlassDialogNative` is **demo-private** (`src/components/custom/dialog-native/` — NOT on the root barrel,
NOT a subpath, NOT in `package.json`/`api`; its sole consumer is this story). The fold target stories exist:
`demo/stories/containers/dialog.vue` and the HoverPopover story.

### 1.3 The already-DONE items (CLOSED-WITH-EVIDENCE — do NOT re-litigate)

Per H-storybook §2 + §6.3, these §B11 items are SETTLED at HEAD; the wave records them closed so no agent
re-actions them:

| §B11 item | Closed by | HEAD evidence |
|---|---|---|
| `disco-glyph` REMOVE | AX.W19 `509aed8` | no file, no route, no src component (excised) |
| `glyph-face` REMOVE | AX.W19 `509aed8` | no file, no route, no src component (excised) |
| `use-token-color` "stray route" | AX.W19 `509aed8` ("keep useTokenColor") | KEEP — §1.1 O3 (≥2-consumer bar met); the corpus "stray" framing is stale |
| `icon-button-token-ladder` "stray route" | n/a (never existed) | NO such route; `TokenLadder.vue` is a foundations demo chassis, no standalone route to remove |
| blob consolidation (D6) | AX.W18 | `ls demo/stories/substrates/` = single `blob.vue`; no blob-mood/blob-interaction split |
| speedtest boundary (move ownership) | AV.W17 `proof:speedtest-boundary` GREEN | the 8 speedtest-origin composables STAY-as-CORE, MOVED→speedtest = 0; SUPERSEDED, do not re-open |
| slider zoo collapse | AX.W59 `a730782` `proof:slider-two-only` | `slider/index.ts` ships exactly `standard` + `spectrum` |
| `configurator-as-primitive` | AX | the only configurator route is `compositions/configurator` (correctly a Composition); the D1 configurator-DESIGN defect is a SEPARATE aurora-configurator lane — NOT folded here |
| `evalFourier` dead export | **AY.W-FF2** (the sibling wave) | OUT OF SCOPE here — W-FF2 §2.6 owns the delete; this wave must NOT touch it |

### 1.4 Why this is an H-lane defect, not bookkeeping

If the wave is dispatched as "delete the header-ribbon route", `proof:no-orphan-demo-route` goes GREEN (the file
↔ row equality holds) and the close declares "IA done" — while the `/header-ribbon` subpath + `package.json`
export + `api` type remain published with zero consumers. That is the substrate-without-consumer-binary invariant
(L invariant 8) violated, hidden behind a green structural gate — the EXACT chronic the H-chronic-defer lane
named (§1 row F: "each tranche says 'IA done' and the specific routes survive"). The fix is a component-level
gate (G2) whose green requires the orphan to be RETIRED or EVIDENCED, not merely de-routed.

---

## 1.5 AUGMENTATION — the per-route DESIGN defects (the front door + voice + a SOURCE bug)

The W-SB1 prune above is the COMPONENT-orphan + IA-coherence half. The AY design + reality audits
(`audit/design/FD-storybook.md`, `audit/reality/RA-flow-fields.md`) surfaced a second cohort of per-route
defects on the EXACT routes this wave already touches — the front-door page, the hero composition, the
substrate prose. They route here because they are page-local FIXES (markup/scoped-CSS/copy on a single SFC),
not the systemic STAGING work (which is `AY.W-SB-STAGE`) nor the substrate-cohesion convergence (`AY.W-COHERE`).
Each carries file:line from the cited audit — none is re-derived here.

### 1.5.1 The BROKEN front door — 8 dead hash-hrefs + a stale, off-register category index (FD-storybook §7.1, §3 intro row, §9.2.13)

`demo/stories/foundations/intro.vue:55-71` — the "Categories" section renders one `<a :href="`#/${cat.slug}`">`
per category on a `createWebHistory` router. **Probed live (FD-storybook §7.1): click → URL becomes
`/foundations/intro#/primitives`, `pathChanged: false` — zero navigation.** The hash-href is wrong for a
web-history router (the router routes on the PATH, not the fragment); the cards are dead at the front door's
ONE interactive moment. THREE compounding defects on the same block:

- **Dead links (the headline).** All 8 `:href="`#/${cat.slug}`"` hrefs no-op. The fix is a `<RouterLink :to>`
  (or a `router.push` `@click`) onto the real path — the same nav the SidebarDock rail already drives
  (`SidebarDock.vue` `go(category.id)`). The `categories` array this block iterates is the audit's
  "stale IA" surface (next bullet) — reconcile it to the live manifest categories in the SAME edit.
- **Stale IA.** The index names a `Primitives` category that does NOT exist and omits the as-shipped
  `Substrates / Forms / Display / Dock / Data` categories (FD-storybook §7.1 defect 2). Re-derive the
  `categories` list from the live `manifest.ts` category set (the single source the rail + bottom dock read)
  so the front door names the real IA, not a stale hand-list. The grid is ALSO the book's one cookie-cutter
  moment — eight identical opaque boxes, no hierarchy (FD-storybook §9.2.13); the re-derive is the natural
  point to give the set a lead/rest rhythm, but the BINDING fix is live navigation + real category names.
- **Off-register opaque slabs in the glass hero (FD-storybook §3 intro row, §9.2.13).** The cards are
  `bg-card` opaque slabs (`intro.vue:62` `bg-card`) punching holes in the aurora-backed glass hero — the one
  page where the aurora actually reads, defeated by opaque category cards over it. RE-EXPRESS the category
  cards onto the glass register (a `.glass-*` rung or `<Card tier="resting/wash">` so the aurora reads
  THROUGH them — the glass-first canon the rest of the book teaches). NOTE the geometry compounds this: the
  grid ends ≈55% down the hero card leaving ~580px of empty aurora (FD-storybook §9.2.13) — that vertical
  void is the STAGING wave's concern (`W-SB-STAGE` owns the hero-card read-through + the intro page shape);
  W-SB1 fixes the LINKS + the IA + the card glass-register only. Record the hand-off so the two waves do not
  both re-flow the same grid.

### 1.5.2 Constellation zero-paint on the hero — a SOURCE defect (FD-storybook §2/§7.2, RA-flow-fields §4)

This is NOT a demo-only fix — it is a SCOPED-CSS specificity bug in the SHIPPED `Constellation.vue`, and it
makes the declared `compositions/hero` constellation backdrop paint **zero pixels** (RA-flow-fields §4:
"DEAD — renders 0 px… canvas backing stuck at the 300×150 default").

**Mechanism (read, not patched — implementation halted), with file:line:**

- `src/components/custom/constellation/Constellation.vue:581-588` — the scoped root rule
  `.constellation { position: relative; inline-size: 100%; block-size: 100% }`. Because Vue's scoped compiler
  attaches the `[data-v-…]` attribute, the rendered selector is `.constellation[data-v-…]` → specificity
  **(0,2,0)**.
- `demo/stories/story-hero.css:67-70` — `.story-hero-bg { position: absolute; inset: 0; z-index: -10 }` →
  specificity **(0,1,0)**. The chassis INTENDS to absolutely-place the substrate to fill the
  `.story-hero` container.
- The scoped `.constellation` (0,2,0) BEATS `.story-hero-bg` (0,1,0) on the `position` property → the host
  stays `position: relative; block-size: 100%`, in-flow, percentage-height against the `auto`-height
  `.story-hero` → collapses to **h=0**; the canvas never sizes past its 300×150 default
  (RA-flow-fields §4 computed-style readback: `height: 0px` inside a 943px `.story-hero`). FourierField
  "works" in the same chassis only because ITS scoped root happens to be `position: absolute; inset: 0`
  (RA-flow-fields §4 mechanism note) — the two "sibling" substrates have INCONSISTENT root-positioning
  contracts and the shared `.story-hero-bg` chassis silently depends on the difference.

**The fix is a SOURCE fix on `Constellation.vue`, made precisely (a scoped rule must not dictate host
placement).** The component's root must not impose `position: relative` + `block-size: 100%` that defeat a
consumer's `position: absolute; inset: 0` placement. Options, in preference order:

1. **Make the root layout consumer-overridable.** Drop `position: relative` + `inline-size/block-size: 100%`
   from the scoped `.constellation` root rule (lines 582-584) and let the host SIZE the component (the
   canvas already self-fills its parent via `.constellation-canvas { position: absolute; inset: 0 }` at
   `:590-595`). A `position: relative` IS needed to be the canvas's offset parent — so keep `position:
   relative` ONLY when the consumer has not set a position, or scope it so a `.story-hero-bg`-class consumer's
   `position: absolute` wins. The cleanest expression: the component root declares `position: relative` via an
   ELEMENT-level fallback the consumer's class can override (raise `.story-hero-bg`'s specificity to win, OR
   move the root positioning off the scoped rule onto a `:where()`-wrapped low-specificity rule so the
   consumer always wins). Pick ONE and record the choice in PROGRESS; the binding outcome is the π readback
   (below), not the mechanism.
2. The sibling parity: FourierField's scoped root is `position: absolute; inset: 0` — bringing Constellation's
   contract into agreement (a substrate that fills its placed parent rather than dictating its own flow) is
   the cohesion move. Confirm the FF root contract at `FourierField.vue` before mirroring it (re-grep — the
   W-GOD1 carve may have moved it).

**Coordination — this overlaps W-COHERE's E3 edit-site (`Constellation.vue`).** W-COHERE adds the
`opacityCeiling` recession PROP to `Constellation.vue` (its D3); W-SB1 fixes the scoped-CSS ROOT POSITIONING
bug. These are disjoint edits (props block vs `<style scoped>`), but BOTH touch the same SFC and BOTH run
after W-GOD1 carves it. Serialize: the positioning fix is a hard PRE-REQUISITE for W-COHERE's G-RECESSION π
readback over a constellation HERO (a 0px-tall host cannot demonstrate recession), and for W-SB-STAGE's
constellation-page staging. The recommended order is **W-SB1 (this positioning fix) → W-COHERE (recession
prop) → W-SB-STAGE (page staging)**; if W-COHERE lands first, it must NOT re-introduce the host-dictating
`position: relative` + `block-size: 100%` (the recession prop is a draw-layer alpha scale, orthogonal to the
root layout). The executing agent re-greps `Constellation.vue:581-588` against the carved tree (the
stale-worktree-trap step-0) before editing.

> **Why W-SB1 owns the SOURCE fix and not W-COHERE.** W-COHERE is the substrate-set COHESION convergence
> (accent/recession/shadow as ONE set) — its constellation edit is the recession prop, a feature add. The
> zero-paint is a SHIPPED-COMPONENT BUG that breaks one declared demo backdrop; it is a per-route FIX on the
> hero composition (the route this wave already verdicts), so it routes here. W-SB-STAGE then CONSUMES the
> now-painting constellation (it can't stage a backdrop that renders 0px). The three waves form a chain:
> W-SB1 makes it paint → W-COHERE makes it recede → W-SB-STAGE places it.

### 1.5.3 The two leaking voices — markdown literals + spec-speak in user-facing prose (FD-storybook §4, §7.7; RA-flow-fields §3-leak)

A storybook is prose + specimens; two registers leak into the USER-facing layer and cheapen it
(MEMORY `feedback_writing_style` — no spec-speak, maintain levity). Both are page-local copy fixes:

- **Markdown renders literally in manifest blurbs (FD-storybook §4.1, §7.7).** Blurbs render as plain
  interpolated text, so backticks and angle-bracket component names print VERBATIM. Confirmed sites:
  `demo/stories/manifest.ts` — the `dock/rail` blurb (`"The vertical \`GlassDock variant="rail"\`…"`,
  FD-storybook §3 dock/rail row), the `metric-cell` blurb (backticks leak into body prose, §3 metric-cell
  row), `native-top-layer` (folds away in §2.4 — its blurb retires with the row). FIX: strip the markdown
  syntax from the affected blurbs (they are plain-text strings; write the component name as prose, not
  fenced) — the simplest correct move since the blurb pipeline does NOT render markdown. (Rendering markdown
  in blurbs is a larger pipeline change deferred — strip-not-render is the W-SB1 scope.)
- **Spec-speak / π-lane runbook in PAGE prose (FD-storybook §4.2; RA-flow-fields §3-leak).** All-caps mono
  contract lines, lowercase worklog paragraphs, and tranche citations leak into user-facing copy:
  - `demo/stories/display/buttons.vue` — all-caps mono spec-speak (`"REST TEXT: VAR(--FOREGROUND)…"`,
    FD-storybook §3 buttons row).
  - `demo/stories/substrates/fourier-field.vue` — lowercase internal-notes register (`"variant is a
    configuration BUNDLE, not a recolour of one curve"`, FD-storybook §3 fourier row).
  - `demo/stories/substrates/constellation.vue` — the π-lane RUNBOOK leaks into section blurbs:
    `"The π lane resizes this surface programmatically (via __constellationRefit.resizeTo) and reads the node
    bbox + focalIndex per frame"`, `"the π egg-live spec drives it via the exposed holdWellAt/releaseWell"`
    (RA-flow-fields §3-leak; the W-CON meta-language scrub "stopped at dock.vue" — this page needs the same
    GREEN pass). The supernova egg is OUTED by its own caption (`"(DEMO-ONLY — not an engine prop)"`) —
    playfulness, not a spec annotation.
  - Tranche citations in blurbs (`"AQ.W4"`, `"(AK-W2-α)"`, `"Z.W2 / A2 §B5"`) — internal IDs in
    user-facing copy (FD-storybook §4.2).
  FIX: rewrite each cited prose block in the story register (the dock pages prove the team can write it —
  FD-storybook §4.2 — it just isn't applied evenly). Scrub the π-lane mechanics out of `constellation.vue`'s
  blurbs (the harness reads the exposed seams; the USER does not need the seam names). Drop the supernova
  spoiler label (the egg stays discoverable, un-narrated). This is the SAME meta-language-scrub the AX
  dock.vue pass did, extended to the constellation + fourier + buttons pages.

  > **Scope coordination with W-SB-STAGE / W-COHERE.** The constellation `substrates/constellation.vue` page
  > is ALSO restaged by W-SB-STAGE (the page-staging) and its substrate converged by W-COHERE. W-SB1 owns
  > ONLY the PROSE scrub on that page (the blurb copy); it does not restage the panels or touch the engine.
  > If W-SB-STAGE rewrites the page shell, it inherits the scrubbed copy (serialize W-SB1's prose scrub before
  > W-SB-STAGE's restage, or W-SB-STAGE carries the scrub forward — record which in PROGRESS).

### 1.5.4 The hero headline mid-word wrap — "f / or" (FD-storybook §3 comp/hero row, §7.5)

`demo/stories/compositions/hero.vue:91-122` — the typewriter headline is built as THREE inline siblings:
`<TypewriterText :text="headlineSeg1='A design system '">` (`:93-102`) + `<span class="fourier-f">f</span>`
(`:103-110`) + `<TypewriterText :text="headlineSeg2='or mathematicians, writers & makers.'">` (`:111-122`).
The italic ℱ-glyph `<span>` and the typed `"or…"` are SEPARATE inline elements with a wrap-opportunity between
them, so when the line wraps the break can fall AFTER the `f` span and BEFORE seg2 → **"A design system f /
or mathematician…"** wraps mid-word (FD-storybook captured `comp-hero-constellation.png`). The static fallback
(`:124-134`) renders `>f</span>or` adjacent (no wrap site mid-word there) — the defect is the ANIMATED arm
only, where seg2 begins with `"or"` as its own element.

**FIX (no-wrap the f↔or join).** Bind the `f` span and seg2's leading `"or"` into one un-breakable unit. The
clean expression: wrap the `<span class="fourier-f">f</span>` + seg2 in a `white-space: nowrap` inline group
that holds the `f` and at least the `"or"` together (an inline `<span class="whitespace-nowrap">` around the
ℱ-glyph + the seg2 TypewriterText), OR split seg2 so its first token `"or"` is part of the same nowrap unit as
the glyph and the REST of seg2 ("mathematicians, writers & makers.") flows normally (preferred — a full
`nowrap` on the long seg2 would prevent any wrap and overflow narrow viewports). Verify the static fallback
arm (`:124-134`) still reads correctly after the change (it already renders `f` + `or` adjacent; do not break
it). The binding outcome is the π readback: at the wrap-forcing width, NO line break falls between the ℱ-glyph
and `"or"` in EITHER the animated or static arm.

## 2. Objective (the verdict + the retire, gestalt — root-not-consumer, clean break)

### 2.1 RETIRE `header-ribbon` (O1, clean break)

Delete the component dir and every published seat, no alias (no-backwards-compat precept, L invariant 4):

- `src/components/custom/header-ribbon/` — delete the whole dir (`index.ts`, `HeaderRibbon.vue`, `types.ts`).
- `src/subpaths/header-ribbon.ts` — delete the subpath mirror barrel.
- `package.json` — delete the `"./header-ribbon"` export entry (`:312-315`) AND the
  `typesVersions["*"]["header-ribbon"]` entry (`:121-122`).
- `src/api/index.ts` — delete the `HeaderRibbonPosition` / `HeaderRibbonProps` type seat (`:200-207`) + its
  header comment block.
- `demo/stories/navigation/header-ribbon.vue` — delete the story.
- `demo/stories/manifest.ts` — delete the `s("navigation", "header-ribbon", …)` row.

### 2.2 RETIRE `glass-panel` (O2, clean break)

- `src/components/custom/glass-panel/` — delete the dir (`index.ts`, `GlassPanel.vue` incl. its scoped
  `.glass-panel` CSS).
- `src/subpaths/glass-panel.ts` — delete the subpath mirror barrel.
- `package.json` — delete `"./glass-panel"` export (`:356-359`) + `typesVersions["glass-panel"]` (`:91-92`).
- `src/api/index.ts` — delete the `GlassPanelVariant` (`:99`) + `GlassPanelProps` (`:158`) type seats + their
  comment blocks.
- `demo/stories/substrates/glass-panel.vue` — delete the story; `demo/stories/manifest.ts` — delete its row.
- `demo/stories/foundations/paper-glass.vue` — this story USES `<GlassPanel>` (import `:4`; mount `:200-248`;
  it ALSO declares a LOCAL `type GlassPanelVariant` alias `:22-33` for its panel-examples data). RE-EXPRESS it on
  the surviving glass surface. **Note: `glass-material` is the `.glass-material` CSS class in `glass.css` (`:61`),
  NOT a `<GlassMaterial>` component** (verified at HEAD: `grep -rln GlassMaterial src/` → 0; there is no
  `src/components/custom/glass-material/` dir and no `GlassMaterial` export). So the re-express target is a
  `<div>` carrying a `.glass-*` rung class (e.g. `.glass-floating` / `.glass-card`) + the `paper-grain-overlay`
  utility the panels already wear — NOT a component swap. The `:tier/:variant/:blur/:refraction/:chromatic-aberration`
  GlassPanel renderer props have no `.glass-*` equivalent (they drive GlassPanel's per-instance WebGL filter); the
  re-expressed demo drops the renderer-tier matrix and presents a plain 3-rung `.glass-*` paper-over-glass card row
  (the paper-grain-over-glass demo intent — that is what a foundations story should teach, not GlassPanel's private
  renderer ladder, which retires WITH the component). DELETE the local `type GlassPanelVariant` alias `:22-33` and
  re-key the panel-examples data to the chosen `.glass-*` rung names. The story stays (paper-glass is a legitimate
  foundations demo); only its GlassPanel dependency + the local GlassPanel-Variant alias are removed. (If the
  foundations IA would rather demo the renderer-tier ladder, that lesson already lives at
  `substrates/glass-material.vue` — verify before duplicating; record which in PROGRESS.)
- **Consumer-evidence reconciliation.** `docs/consumer-evidence/README.md` rows
  `createGlassFilter`/`destroyGlassFilter`/`GlassFilterState`/`GlassTier`/`useGlassRenderer`/`useSortable` etc.
  cite "glass-ui source GlassPanel" as their consumer (FIVE rows verified at HEAD:
  `createGlassFilter`, `destroyGlassFilter`, `GlassFilterState`, `GlassTier`, `useGlassRenderer` — all carry
  "glass-ui source GlassPanel" in `consumer-evidence/README.md`). After the retire, audit each — grep their
  REMAINING consumers (`rg "createGlassFilter|useGlassRenderer|GlassTier" src/ demo/`). **The likely survivor is
  `src/composables/glass/useGlassRenderer.ts` itself** (verified at HEAD: `useGlassRenderer.ts` composes
  `createGlassFilter`/`destroyGlassFilter`/`GlassFilterState`, and `GlassTier`/`useGlassRenderer` carry the
  `demo/stories/composables/use-glass-renderer.vue` story) — so the four filter-family artefacts re-point their
  evidence-doc consumer line from "GlassPanel" to "glass-ui source useGlassRenderer" (the surviving sibling
  composable), and `useGlassRenderer` itself keeps its existing evidence doc + its demo-story consumer. UPDATE
  each affected evidence-doc consumer line to the survivor; if (contrary to the HEAD evidence) NONE survives, that
  artefact becomes a NEW orphan and is caught by G2 (forward it to the same retire pass OR re-point to a live
  consumer). This reconciliation is IN SCOPE — a retire that leaves dangling consumer-evidence is an incomplete
  clean break.

### 2.3 KEEP + BOOK `useTokenColor` (O3)

No source edit. Author `docs/consumer-evidence/use-token-color.md` (the per-artefact note format the dir already
uses) documenting the speedtest external consumer (`useMeterTokenColors.ts:19,36-37`) + the constellation/hero
demo consumers, and add a row to `docs/consumer-evidence/README.md`'s table:
`| useTokenColor | use-token-color.md | speedtest meter token colors + demo constellation/hero | AY |`.
This is the `keep-current` defense the G2 gate reads — the export stays because it is documented-evidenced, not
because the audit forgot to check it.

### 2.4 FIX native-top-layer — fold into Dialog/HoverPopover (the FIX-ROUTE execution)

- `demo/stories/containers/dialog.vue` — add a native-`<dialog>` opt-in SECTION (a `<StorySection>` labelled
  e.g. "Native top-layer (`<dialog>` + `commandfor`)") that hosts the `<GlassDialogNative>` + `commandfor`
  trigger + capability-detect rows moved from `native-top-layer.vue:55-98`. `GlassDialogNative` stays
  demo-private (its import path moves into `dialog.vue`).
- `demo/stories/containers/hover-popover.vue` (the HoverPopover story; manifest row `:198`) — add the
  `HoverPopover :native interestfor` opt-in row moved from `native-top-layer.vue:102-115` (the `:native="true"`
  vs reka-default comparison).
- `demo/stories/containers/native-top-layer.vue` — DELETE the standalone story.
- `demo/stories/manifest.ts` — DELETE the `s("containers", "native-top-layer", …)` row (`:188`).
- The fold preserves the capability-probe content (it does not drop the `commandfor`/`interestfor`/`@supports`
  feature-detect — it relocates it under the primitive it augments), so no demo CAPABILITY is lost; only the
  standalone route is.

### 2.5 The NEW component-orphan gate (the institutional fix — the verdict can't relapse)

The chronic recurs because no machine asserts the component-level bar (only the route-level
`proof:no-orphan-demo-route` and the export→story `proof:storybook-complete` exist, neither of which fails on a
published-but-unconsumed component). Author `scripts/proof-component-orphan.mjs` (the
`proof-no-orphan-composable.mjs` house shape — pure exported detector, byte-stable JSON artefact via
`gate-output.mjs`, self-test, `process.exit(1)` on violation). It asserts, for each surveyed unit, ≥2 non-self
consumers OR a `docs/consumer-evidence/<artefact>.md` entry. SURVEY SET:

1. Every `src/components/custom/<pkg>/` package that is PUBLISHED (on the root barrel `src/index.ts`, OR a
   `src/subpaths/<pkg>.ts` flat subpath, OR an `src/api/index.ts` type seat) — its consumers are counted across
   `src/ demo/ ../slides/src ../speedtest/src ../fourier-analysis/web/src ../words/frontend ../bbnf-lang/playground`
   (the consumer-evidence's declared consumer repos), EXCLUDING the component's own dir + its own demo story
   (the "non-self" rule). A demo story is NOT a binary consumer (it is the demonstration, not a load-bearing
   use) — so a component whose ONLY consumer is its own story is an orphan unless evidenced.
2. Every flat subpath in `src/subpaths/*.ts` resolves to a survey-set component (no dangling subpath).
3. Every root-barrel composable export (`src/index.ts` `export *` reach into `composables/`) has ≥2 non-self
   consumers OR a consumer-evidence doc.

The allowlist is the `docs/consumer-evidence/` dir CONTENTS (drift-proof — a kept export earns its keep by
having a doc, exactly the `keep-current` mechanism the README §1 describes), NOT a hardcoded name list.
SELF-PROVING: a synthetic phantom package record with 0 consumers + no evidence doc is injected each run; if the
detector fails to flag it, the gate REDs (the bite is demonstrated every invocation, the
`proof-disposition-live` pattern).

Wire into `package.json` `proof:*` + `scripts/gates.mjs` local registry + `.github/workflows/ci.yml` (the
no-orphan-composable CI block is the model). The new gate is born-RED at the pre-edit HEAD (header-ribbon +
glass-panel are published with 0 non-self consumers and no evidence doc → 2 violations) and GREEN after the
retire.

> **Cross-wave coordination.** This gate's survey set will see the FourierField component (W-FF2 lands it with an
> api seat + 2 external slides consumers — clears the bar) and the constellation/aurora/blob substrates (W-CON*/
> W-AUR*/W-BLOB* — externally consumed). W-SB1 authors the gate; if a sibling wave's surface is mid-flight at
> W-SB1's close, that surface either already clears the bar (≥2 consumers) or is allowlisted by its own
> consumer-evidence doc. The gate does NOT hardcode the current orphan list — it computes consumers live, so it
> stays correct as sibling waves land.

### 2.6 Out of scope (named successors — H-storybook §5 routing)

- The `evalFourier` dead-export delete → **AY.W-FF2 §2.6** (do NOT touch `fourier-field/index.ts`/`math.ts`
  here).
- Scattered-dock per-site triage, metric-badge/pill co-location, carousel/deck-progress disambiguation →
  **AY.W-SB2** (the restructure/section-coherence wave).
- The cross-component animation/design LANGUAGE gate + the live-DELTA mandate for FIX/VERIFY routes →
  **AY.W-SB3**.
- The D1 configurator-DESIGN defect (hand-rolled non-idiomatic chrome) → the aurora-configurator-redesign lane,
  NOT this prune (H-storybook F7 — do not conflate).
- The full BOOK-backlog onboarding into `DISPOSITION-REGISTER.json` → **AY.W-CARRY** (H-chronic-defer §6); W-SB1
  adds only the `useTokenColor` keep-evidence, not the register reconcile.
- The systemic substrate STAGING (which pages get aurora/constellation/fourier/blob backdrops, the hero-card
  read-through / inset / lower-opacity tier, the paper-glass rebuild over a real backdrop, the dock/overview +
  rail empty-cream frames staged, the intro hero vertical void) → **AY.W-SB-STAGE** (FD-storybook §2/§6/§9.1,
  FD-substrate-pages). W-SB1 owns the front-door LINKS + IA + the category-card glass-register only; the page
  SHAPE / backdrop placement is W-SB-STAGE.
- The substrate-SET cohesion (blob mood-register/shadow, constellation recession PROP, the set-level accent +
  recession + shadow gate) → **AY.W-COHERE**. W-SB1's constellation edit is the scoped-CSS ZERO-PAINT fix
  (§1.5.2), disjoint from W-COHERE's recession prop — the two serialize on `Constellation.vue` (W-SB1 first).
- The divined EASTER EGGS (the ℱ-redraw, konami aurora, cmd+K palette, GooBlob empty-state, constellation 404,
  long-press eclipse) → **AY.W-EGG** (FD-storybook §5). The cmd+K half is an affordance gap, specced first-class
  there. W-SB1 retires/folds routes; it adds NO eggs.

---

## 3. Edit-sites (the exact write scope)

| File | Edit |
|---|---|
| `src/components/custom/header-ribbon/` | DELETE the dir (§2.1) |
| `src/components/custom/glass-panel/` | DELETE the dir (§2.2) |
| `src/subpaths/header-ribbon.ts` | DELETE |
| `src/subpaths/glass-panel.ts` | DELETE |
| `package.json` | DELETE `"./header-ribbon"` (`:312-315`) + `typesVersions["header-ribbon"]` (`:121-122`) + `"./glass-panel"` (`:356-359`) + `typesVersions["glass-panel"]` (`:91-92`); add the `proof:component-orphan` script entry |
| `src/api/index.ts` | DELETE `HeaderRibbonPosition`/`HeaderRibbonProps` (`:200-207`) + `GlassPanelVariant` (`:99`) + `GlassPanelProps` (`:158`) seats + their comment blocks |
| `demo/stories/navigation/header-ribbon.vue` | DELETE |
| `demo/stories/substrates/glass-panel.vue` | DELETE |
| `demo/stories/containers/native-top-layer.vue` | DELETE (folded — §2.4) |
| `demo/stories/manifest.ts` | DELETE 3 rows: `navigation/header-ribbon`, `substrates/glass-panel`, `containers/native-top-layer` (`:188`) |
| `demo/stories/foundations/paper-glass.vue` | RE-EXPRESS off `<GlassPanel>` (import `:4`, mount `:200-248`) onto a `.glass-*` rung `<div>` + `paper-grain-overlay`; DELETE the local `type GlassPanelVariant` alias (`:22-33`) — `.glass-material` is a CSS class, not a component (§2.2) |
| `demo/stories/containers/dialog.vue` | ADD the native-`<dialog>`/`commandfor` opt-in `<StorySection>` (§2.4) |
| `demo/stories/containers/hover-popover.vue` | ADD the `:native interestfor` opt-in row (§2.4) |
| `docs/consumer-evidence/use-token-color.md` | NEW — the `useTokenColor` keep-evidence (§2.3) |
| `docs/consumer-evidence/README.md` | ADD the `useTokenColor` table row (§2.3); RECONCILE any GlassPanel-cited rows (§2.2) |
| `scripts/proof-component-orphan.mjs` | NEW — the component-orphan gate (§2.5) |
| `scripts/gates.mjs` | ADD the `proof:component-orphan` row (local + ci registry) |
| `.github/workflows/ci.yml` | ADD a `proof:component-orphan` step (the no-orphan-composable block is the model) |
| `docs/tranches/AY/PROGRESS.md` | record the close + the per-route disposition table (§1.3) |
| **— §1.5 design-defect edit-sites —** | |
| `demo/stories/foundations/intro.vue` | FIX `:55-71` dead category index: `:href="`#/…`"` → `<RouterLink :to>`/`router.push` real-path nav; re-derive the `categories` list from the live `manifest.ts` category set (kill stale `Primitives`, add Substrates/Forms/Display/Dock/Data); RE-EXPRESS the `bg-card` opaque cards (`:62`) onto a `.glass-*`/`<Card tier>` register so the aurora reads through (§1.5.1). Vertical-void/hero-shape → W-SB-STAGE |
| `src/components/custom/constellation/Constellation.vue` | FIX `:581-588` scoped-CSS host-positioning bug: the root must NOT dictate `position: relative` + `block-size: 100%` that defeat a `.story-hero-bg` `position: absolute; inset: 0` consumer; make root layout consumer-overridable (drop/`:where()`-lower the root positioning, keep the canvas offset-parent) so the host can size it → constellation hero paints (§1.5.2). DISJOINT from W-COHERE's `opacityCeiling` prop; W-SB1 runs FIRST |
| `demo/stories/manifest.ts` | STRIP literal markdown from blurbs (`dock/rail` GlassDock backticks, `metric-cell` backticks, tranche-ID citations) — plain-text prose, not fenced (§1.5.3) |
| `demo/stories/display/buttons.vue` | REWRITE the all-caps mono spec-speak prose (`"REST TEXT: VAR(--FOREGROUND)…"`) into the story register (§1.5.3) |
| `demo/stories/substrates/fourier-field.vue` | REWRITE the lowercase worklog prose (`"variant is a configuration BUNDLE…"`) into the story register (§1.5.3) |
| `demo/stories/substrates/constellation.vue` | SCRUB the π-lane runbook from section blurbs (`__constellationRefit.resizeTo`, `holdWellAt/releaseWell`); DROP the supernova spoiler label (`"(DEMO-ONLY — not an engine prop)"`); story-register prose only — the AX dock.vue meta-scrub extended here (§1.5.3). PROSE only — page-restage is W-SB-STAGE |
| `demo/stories/compositions/hero.vue` | FIX `:91-122` the typewriter mid-word wrap: bind the `<span class="fourier-f">f</span>` (`:103-110`) + seg2's leading `"or"` (`:111-122`) into a `white-space: nowrap` inline unit so no break falls between the ℱ-glyph and `"or"`; preserve the static fallback arm (`:124-134`) (§1.5.4) |

---

## 4. Hard Gate (evidence-backed; the completion criterion)

A grep alone is INSUFFICIENT (`TRANCHE-AND-WAVE-SPEC.md §"Hard gate"`). The gate is five clauses: a still-green
route gate + a NEW born-RED→GREEN component-orphan gate + deletion-proofs + a build/dts publication proof + the
keep-evidence + native-fold verification. ALL must hold.

### Clause G1 — `proof:no-orphan-demo-route` stays GREEN (route ↔ row equality preserved)

`npm run proof:no-orphan-demo-route` → PASS after the 3 row deletions + the native fold. Already CI-wired
(`.github/workflows/ci.yml:142-143`, `scripts/gates.mjs:421`). No orphan file (the deleted stories are gone), no
dangling row (the manifest rows are deleted in lockstep). Artefact: the gate's JSON
(`GLASS_UI_NO_ORPHAN_DEMO_ROUTE_ARTIFACT`) shows `danglingRows: []`, `orphanFiles: []`, `rowCount == fileCount`.

### Clause G2 — `proof:component-orphan` authored, born-RED at HEAD, GREEN after (the institutional fix)

`scripts/proof-component-orphan.mjs` — wired into `package.json` + `gates.mjs` + `ci.yml`. **Born-RED at the
pre-edit HEAD**: the artefact lists exactly the 2 violations `header-ribbon` (published, 0 non-self consumers, no
evidence doc) + `glass-panel` (published, 0 non-self consumers, no evidence doc). **GREEN after** the retire +
the `useTokenColor` evidence doc: every published `custom/` component + flat subpath + root-barrel composable has
≥2 non-self consumers OR a `docs/consumer-evidence/<artefact>.md`. Self-proving: the synthetic always-orphan probe
REDs the gate if the detector misses it (demonstrated each run). Artefact: the gate JSON with
`violations: []` post-edit and the survey facts (surveyed-count, evidenced-count, ≥2-consumer-count). This is the
clause that makes route-prune-≠-component-retire un-relapsable.

### Clause G3 — deletion-proofs for `header-ribbon` + `glass-panel` (clean break)

```
rg "HeaderRibbon|header-ribbon" src/ demo/ ../slides/src ../speedtest/src   →   0 code hits (only-removed)
rg "GlassPanel" src/ demo/ ../slides/src ../speedtest/src                    →   0 code hits (the COMPONENT + the local paper-glass alias both gone)
rg "\bglass-panel\b" src/components/ src/subpaths/ package.json src/api/index.ts  →  0 (the COMPONENT seats; the `.glass-material` CSS class is a SEPARATE token unaffected)
test ! -d src/components/custom/header-ribbon && test ! -d src/components/custom/glass-panel   →   both absent
test ! -f src/subpaths/header-ribbon.ts && test ! -f src/subpaths/glass-panel.ts              →   both absent
rg '"./header-ribbon"|"./glass-panel"' package.json                          →   0
rg "HeaderRibbon|GlassPanelVariant|GlassPanelProps" src/api/index.ts         →   0
```

The `foundations/paper-glass.vue` re-expression is verified by `grep -c "GlassPanel" demo/stories/foundations/paper-glass.vue` → 0 (the import, the mounts, AND the local `type GlassPanelVariant` alias are all gone) with the story still present. NOTE the deletion-proof greps the COMPONENT identifier `GlassPanel` and the COMPONENT subpath/export seats; it does NOT grep the bare token `glass-material` (a live CSS class the re-express may compose) — the clean break removes the GlassPanel *component*, not the `.glass-material` *rung*.

### Clause G4 — build + dts publication probe GREEN at the smaller surface

```
npm run build                →   GREEN (no broken import from the deleted dirs/subpaths)
npm run typecheck            →   GREEN (no dangling type ref to the deleted api seats)
npm run verify-export-types  →   GREEN — the subpath dts publication probe passes WITHOUT /header-ribbon + /glass-panel; the remaining published subpaths still resolve.
```

`verify-export-types` is the binding probe — it imports every published subpath + tsc-probes; the retire shrinks
the surface and the probe must pass the smaller set (a dangling `package.json` export would fail it).

### Clause G5 — the KEEP evidence + the native fold verified

- `docs/consumer-evidence/use-token-color.md` EXISTS and names the speedtest external consumer
  (`useMeterTokenColors.ts`) + the demo consumers; `docs/consumer-evidence/README.md` carries the
  `useTokenColor` table row. (This is what G2 reads to keep the export GREEN.)
- The native fold: `grep -c "native-top-layer" demo/stories/manifest.ts` → 0 (route retired) AND
  `test ! -f demo/stories/containers/native-top-layer.vue` (the standalone SFC is gone);
  `grep -c "GlassDialogNative" demo/stories/containers/dialog.vue` → ≥1 AND
  `grep -c ":native" demo/stories/containers/hover-popover.vue` → ≥1 (the capability probes relocated under the
  primitives they augment — no demo capability lost). `proof:no-orphan-demo-route` (G1) independently asserts no
  orphan SFC remains, so the deleted `native-top-layer.vue` cannot linger as a routeless file.

### Clause G6 — the §1.5 design defects fixed, RUNTIME-witnessed (born-RED at HEAD)

A grep that the markup CHANGED is insufficient (TRANCHE-AND-WAVE-SPEC §"Hard gate" — runtime features need a
runtime witness). G6 is four sub-arms, each born-RED against the current live state. The π readbacks run on the
live demo (`:5199`, Metal-backed channel per the FD-storybook capture note — the SwiftShader headless renderer
wedges on the aurora page) and land in `audit/visual/W-SB1-DELTA.md`.

- **G6a — front door NAVIGATES (born-RED: `pathChanged: false`).** A live click on each `intro.vue` category
  card asserts `router.currentRoute.path` CHANGED to the card's real path (born-RED at HEAD — FD-storybook §7.1
  probed `pathChanged: false` on all 8). A source-witness asserts the `categories` list matches the live
  `manifest.ts` category set (no `Primitives`, all of Substrates/Forms/Display/Dock/Data present) and the card
  class carries a `.glass-*`/`tier` register (no bare `bg-card` opaque slab). Captured: an `intro` light frame
  with the aurora reading THROUGH the now-glass cards.
- **G6b — constellation hero PAINTS (born-RED: 0px host / 300×150 canvas).** A live computed-style + canvas
  readback on `/compositions/hero` asserts the `.story-hero-bg` constellation host has non-zero `block-size`
  (the 943px container's height, not 0) AND the canvas backing is sized to the host (NOT the 300×150 default),
  AND a `getImageData` sample finds painted lattice pixels behind the card. **Born-RED at HEAD:** RA-flow-fields
  §4 readback is `height: 0px`, canvas 300×150, 0px painted. Bite-check: re-impose `position: relative` +
  `block-size: 100%` on the scoped `.constellation` root → the host collapses to 0 again. (The READ-THROUGH —
  whether the painted lattice is VISIBLE past the 0.8α card — is W-SB-STAGE's concern; G6b binds only that the
  substrate is SIZED + PAINTING, the source bug this wave owns.)
- **G6c — no voice leakage (the meta-language GREEN pass).** A source-witness (the AX dock.vue meta-scrub shape)
  asserts: no literal backtick in the cited `manifest.ts` blurbs; no `__constellationRefit`/`holdWellAt`/
  `releaseWell`/π-lane runbook string in `substrates/constellation.vue` user-facing blurbs; no all-caps
  `VAR(--…)` spec-line in `display/buttons.vue` prose; no tranche-ID citation (`AQ.W4`/`AK-W2-α`/`Z.W2`) in
  user-facing copy. **Born-RED at HEAD:** each leak string is present (FD-storybook §4, RA-flow-fields §3-leak).
  This extends the existing dock.vue meta-language gate (story-language GREEN) to the constellation/fourier/
  buttons pages.
- **G6d — the headline does NOT wrap mid-word (born-RED: "f / or").** A live π readback on `/compositions/hero`
  at a wrap-forcing width asserts NO line break falls between the ℱ-glyph `<span>` and the `"or"` token in
  EITHER the animated typewriter arm OR the static fallback (the bounding-box of the `f` glyph and the first
  `"or"` characters share a line — same `getBoundingClientRect().top`). **Born-RED at HEAD:** FD-storybook
  captured `comp-hero-constellation.png` "A design system f / or mathematician". Bite-check: remove the nowrap
  binding → the break re-appears at the narrow width.

All four sub-arms GREEN (with the born-RED witness recorded for each) closes G6. The DELTA captures
(`W-SB1-*.png`, light+dark where a theme axis applies) land in `audit/visual/W-SB1-DELTA.md` per the
cardinal-lesson contract — W-SB1 changes pixels on the front door, the hero, and the substrate prose pages, so
its wave-id is allowlisted in `audit/visual/VISUAL-ALLOWLIST.json` and held to the own-surface DELTA bar.

---

## 5. Convergence + named successors

W-SB1 converges when G1–G6 all verify (G1–G5 the prune/IA half, G6 the §1.5 per-route design defects). The
systemic STAGING work (page backdrops, hero-card read-through, the paper-glass/dock/intro page shapes) is
**AY.W-SB-STAGE**; the substrate-SET cohesion is **AY.W-COHERE**; the easter eggs are **AY.W-EGG** — W-SB1's
constellation source-fix (G6b) is the PRE-REQUISITE that lets all three consume a painting constellation. The
remaining open §B11 items are named successors:
**AY.W-SB2** (scattered-dock triage + metric-badge/pill co-location + carousel/deck-progress disambiguation),
**AY.W-SB3** (the cross-component language gate + the live-DELTA mandate for FIX/VERIFY routes), **AY.W-FF2**
(the `evalFourier` delete + the FourierField land — a survey-set member of this wave's G2 gate), **AY.W-CARRY**
(the full BOOK-backlog register reconcile). The D1 configurator-DESIGN defect routes to the
aurora-configurator-redesign lane (NOT this prune). If a retire (G3) cannot complete cleanly because a
GlassPanel-cited consumer-evidence row resolves to a NEW orphan (§2.2 reconciliation surfaces a dangling
artefact), that artefact joins the retire pass OR is re-pointed to a live consumer in the SAME wave — the clean
break does not leave a dangling evidence row.
