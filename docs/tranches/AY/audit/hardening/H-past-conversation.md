# H-past-conversation — adversarial hardening: the engagement's recurring re-requests

**Lane.** Red-team the WHOLE conversation transcript
(`12963045-86c9-4e30-a230-b35ed1f4676b.jsonl`, 126 MB, 8611 string-content user
records). Hunt the user's RECURRING asks, what got RE-flagged because it wasn't
fully addressed, and cross-check the AY plan + `AUDIT-LEDGER.md` for items
**mis-marked** relative to live source.

**Verdict: GAPS-FOUND** (with a CHRONIC-MISS sub-class). The AY plan is real and
the L plan is well-formed. But the ledger that AY is BUILT ON is materially
STALE in five rows — it marks as UNADDRESSED/DEFERRED/CHRONIC work that the
source shows already landed in AX. The genuine residue is NOT re-implementation;
it is (a) **live-verification** (the cardinal lesson, recurring), (b) **consumer
adoption** (slides' bespoke copy), and (c) **two recent directives with NO
AY home**. Authoring fresh research+impl waves over already-built code is the
GESTALT failure this lane exists to catch — it re-does, it doesn't perfect.

---

## Method

Extracted every `type=="user"` record with string content
(`jq … | .message.content`), filtered the synthetic wrappers (`<command-*>`,
`<task-notification>`, tool-results, system-reminders, compact-summaries), then
keyword-counted the recurring asks and pulled the verbatim genuine prompts. The
recap mandate itself recurs: **"Recap ALL of our prompts… ensure they've been
addressed"** appears 17× and **"Delineate any chronically deferred items and
fold them"** 16× — the user RE-ISSUED the recap directive across the whole
engagement, which is itself the signal that things keep slipping.

Keyword hit counts (genuine + recapped): `constellation` 255, `fourier` 104,
`screenshot` 99, `OKLCH` 59, `WebGPU` 42, `lockstep` 31, `OKLAB` 29,
`live-verif` 26, `bespoke` 23, `in slides` 20, `oil-pastel` 18, `glass-first`
18, `springy` 17, `warp` 15, `van-Gogh` 15, `root-cause` 13, `translucen` 12,
`font-size` 9, `glass-scrubber` 8, `dock-with-slider` 7, `items lag` 3.

---

## The recurring-ask ledger (verbatim) × live-source reality

### 1. The dock items-lag — the SIGNATURE recurring complaint (verbatim)

> "The dock animation is not smooth and IOS like—the items do not properly
> fade/morph in and out—there's a noticeable lag of the inner items instantly
> transitioning insofar as, the dock will shrink first, and THEN the items will
> start shrinking a few ms later."

**Ledger says** (#5/#10): CHRONIC, "the shell-first/items-lag is the signature…
recurs across keyframes.js + AX."
**Source reality:** the single-source fix LANDED — `src/styles/dock/layers.css`
retired the second opacity authority (`--dock-motion-resize`, 3 refs documenting
the retirement) and made "the scalar IS the clock" so opacity/size agree on one
register; `proof:dock-animation-live` exists (`package.json:556`).
**The real gap is the CARDINAL LESSON, not the code.** The user's complaint is
PERCEPTUAL ("a few ms later") — it can only be discharged on a captured live
DELTA showing shell+items move on ONE clock. AY's `W-DOCK2` gate says
"`proof:dock-animation-live` shows lockstep (captured); no shell-first" — good —
but `W-DOCK1` (research) + `W-DOCK2` (impl) are framed as a from-scratch
"diagnose the desync from first principles" lane, when the diagnosis + fix
already shipped. **W-DOCK1 should be a VERIFY-OR-FALSIFY wave** (capture the live
collapse; if the lag is gone, close it; if it persists, THEN re-diagnose), not a
re-research of solved structure.

### 2. Constellation: first-class + click-warp + bespoke-copy kill (verbatim)

> "ALL items should be fixed at the root, not just in place within the slides
> repo. Constellation should be a first class glass-ui element, too. And when
> you click, it should not just display that circle expanding, but it should
> warp the anomaly or found solution dot to the nearest point to the
> cursor—add a few easter eggs of dynacism, too."

**Ledger says** (#1 PARTIAL, #2 UNADDRESSED "neither copy warps").
**Source reality:** glass-ui `Constellation` is FULLY first-class — exported on
`/constellation` subpath (`package.json:316`), API types published
(`src/api/index.ts:209-220`: `ConstellationProps`/`Field`/`Warp`),
**click-to-warp IS implemented** (`constellationField.ts`: 9 `warpOnClick`/
`warpTo`/`warpStep` refs, AX.W17 — "a click warps the focal node to the nearest
drifting node + springs it there"), and there is even a live π gate
`proof:constellation-warp-live` (`package.json`) that mounts the real component,
dispatches a synthetic warp, and reads `field.warp.{x,y}` per frame.
**So #2 is MIS-MARKED UNADDRESSED — it is largely DONE.** The genuine open item
is **consumer adoption**: slides STILL imports its own bespoke copy
(`slides/src/decks/til-briefing/deck.ts:3` `import { createConstellations }
from "./constellation"`), whose only click affordance is `ripple()`
(`constellation.ts:200`) — no warp. AY routes this correctly to L.W-ADOPT, but
AY's `W-CON1`/`W-CON2` are authored as fresh research+impl of warp+translucency
that already exist. **They should be a thin VERIFY + tune wave** (capture the
warp live; tune `--constellation-alpha` per-mode; ship easter-eggs IF absent —
verify first). The easter eggs (konami-flock / supernova / gravity-well) ARE
genuinely net-new — grep them before authoring.

### 3. Touch-target + font-size general increase — RE-flagged "did we do it?"

> "Also, for the dock and so forth, did we implement this: On both mobile and
> desktop, too, we need to increase touch target size, and font-size, generally,
> for our components. In an idiomatic and non contrivted, modern way."
> + "Further, for glass-ui, the dropdowns should have the SAME font size and
> scaling… override it."

The **"did we implement this"** phrasing is the chronic-miss tell — the user is
asking the system to AUDIT its own claim.
**Ledger says** (#4 DEFERRED, "only dock coarse-pointer floor; no library-wide
system").
**Source reality:** a library-wide system LANDED — `--ui-scale` is the master
comfortable-sizing scalar (`tokens.css:1139-1186`, 27 refs), with
`--control-floor`/`--touch-target` (WCAG-2.5.5 44px) as `max(scaled, floor)`
clamps, and a `proof:ui-scale` gate (`package.json:658`). It reaches
avatar/badge/button/combobox/command/number-field/select/tabs/toast/toggle +
dock density/overflow + glass.css.
**So #4 is PARTIAL, not DEFERRED.** The genuine gaps: (a) breadth is INCOMPLETE
(input/checkbox/switch/radio/slider not yet on `--ui-scale`); (b) AY's W-SCALE1
hard gate cites **`proof:touch-target`, a gate that DOES NOT EXIST** — the
shipped gate is `proof:ui-scale`. AY authors a phantom gate and ignores the real
one. (c) the **dropdown "SAME font size and scaling"** sub-ask (a distinct
detail, maps to AX W50/W51) is NOT separately tracked in PROMPT-CORPUS or AY.
W-SCALE should be re-scoped to FINISH `--ui-scale` breadth + axe `target-size`
capture, not to build a system that exists.

### 4. Slider zoo → glass-scrubber + spectrum — MIS-MARKED DEFERRED

**Ledger says** (#9 DEFERRED, "multiple slider variants; no consolidation").
**Source reality:** the zoo is ALREADY collapsed — `Slider.vue` ships
`standard` (default) + `spectrum` (AX.W59, the value.js gradient track with the
contained squircle thumb); `index.ts` `SliderVariants` is the two-value axis;
the transcript records the port ledger ("timeline/glass-pill/glass-cartoon/
glass-scrubber REMOVED; dock-with-slider→standard"). The user's "FULLY ROUNDED
iOS knob continuous with the track" is the standard thumb today.
**So #9 is largely DONE.** AY's `W-SLD1`/`W-SLD2` ("collapse the zoo… migrate
consumers") re-plans completed consolidation. The residue is the CONSUMER MIGRATE
verify (speedtest + slides) + a live capture of the rounded knob — a verify wave,
not a refactor.

### 5. dock-with-slider broken — RE-flagged across keyframes.js + AX

**Ledger says** (#10 CHRONIC).
**Source reality:** the contract is wired — `Slider.vue:30` `keepDockOpen: true`
default, `useDockHold` acquisition (`:85`), the `dockKeepOpen` token consumed in
`dock/morph.css:165`; the transcript notes "dock-with-slider→standard". The
known-broken edge was the `?? true` default never reaching `true`
(`Slider.vue:26` comment) — that's fixed.
**Genuine gap:** LIVE capture of the dock+slider compose (the cardinal lesson),
which AY W-DOCK3 does require. But it is paired with "the slides bottom progress
bar is a PAGE element, NOT baked into the dock" — and slides' `DeckPager.vue:5`
still describes itself as "a dot-per-slide register **for the dock**" reading
`--deck-pager-fit` from the dock. That progress-bar-off-the-dock move is a
SLIDES (L) concern, NOT a glass-ui one — W-DOCK3 conflates two repos in one gate.

---

## The cardinal-lesson recurrence (the META chronic-miss)

The single most-recurring failure in the transcript is NOT a feature — it is
**claiming done without a captured live DELTA**. Verbatim evidence:

> "**Inflated PROGRESS marks (7 waves marked live-verified with 0 captured
> DELTA).** Hardening flagged. Fixed: reconciled to `dev-landed · live-pending
> (DELTA owed)`."
> "The cardinal lesson: a wave is complete ONLY on a captured LIVE
> chrome-devtools-mcp/playwright DELTA… The hardening found this recurred INSIDE
> AX (0 PNG captures exist)."

`screenshot` appears 99× and `live-verif` 26× across the transcript — the user
keeps re-asserting it because it keeps being skipped. **Five of the AY rows above
(dock-lockstep, constellation-warp, ui-scale, slider, dock-slider) are CODE-DONE
but DELTA-OWED.** This is the through-line: AY's value is NOT re-implementing
them, it is producing the captured DELTAS that AX never did. Every one of these
waves must be re-cast as VERIFY-and-tune with a captured-PNG hard gate, or AY
repeats AX's inflation.

---

## Two recent directives with NO AY home (UNDER-SPECCED)

These are the LAST substantive prompts before AY was formed (transcript tail) and
do not appear in PROMPT-CORPUS or AY:

**a) The per-component frontend-design convergence (verbatim):**
> "Deploy another 6 frontend design agents to analyze every major glass-ui
> component used therein, alongside our dock, constellation… What gaps exist in
> glass-ui, what gaps exist in slides? We must properly converge upon a library
> optimum for glass-ui, which is used by slides for every major component that's
> BEFITTING."

AY has NO wave for a per-component gap analysis (props/API/composition, not just
"language"). `W-SB3`'s "consistent animation/design/interaction language across
every story" is a thin proxy — it audits STORYBOOK presentation, not the
component-vs-consumer FIT the user asked for. **Net-new wave needed:**
`W-CONVERGE` — a 6-agent (or 6-lane) per-major-component audit (dock,
constellation, aurora, blob, slider, card, button, dialog, configurator) of the
glass-ui↔slides gap, producing a per-component disposition (keep/extend/fix) and
the L-tranche adoption list.

**b) The colocation / sub-component-dir restructure (verbatim):**
> "We should break large components (>500 lines especially) into smaller
> sub-components when befitting… Components and composeables should be colocated
> together when befitting… Complex components should be structured into
> sub-component dirs with components, composeables, constants, skeletons,
> thereof, if needed."

AY's `W-GOD1` only carves the 4 named god-modules BY LINE COUNT to <500 with
"return-shapes byte-identical." That is the SMALL reading — the user asked for a
STRUCTURAL feature-dir colocation pattern (components+composables+constants+
skeletons co-located), which is a gestalt restructure, not a line-count split.
W-GOD1 should be widened, or a `W-COLOCATE` wave added.

**c) The localized design-idiom Tailwind directive (verbatim):**
> "Ensure that we're using idiomatic tailwind applies for style, animations,
> colors: we should have a localized area that defines all of our design
> idioms—but still leverages proper colocation."

AY's `W-CSS1` is only "CSS monolith carves + .css-aware god-module gate" — it
does not address the "localized design-idiom area + colocation" axis (the
`@apply`/`@utility`/`@theme` idiom home). Under-specced.

---

## The TOTALITY / deploy stopping-condition (the un-met top-level ask)

The final transcript prompt is unambiguous: the user expected EXECUTION +
deployment, not more planning:

> "(1) BEGIN and CONTINUE the current tranche (implementation), (2) execute with
> maximal parallelism… (3) continue indefatigably until completion IN TOTALITY,
> (4) full CI + slides.friday.institute deployment, (5) authorization to
> publish/deploy. The transcript shows only PHASE 2 (tranche-development
> planning) is complete… execution deferred."

AY/L are PLANS. The user's stopping condition is total completion + live deploy.
This is the frame against which EVERY "done" must be judged: a wave that lands
code without the captured DELTA + (for L) the live deploy is NOT done by the
user's own bar.

---

## Mis-marked AUDIT-LEDGER rows (the correction set)

| # | ledger status | source reality | correct status |
|---|---|---|---|
| 2 (warp) | UNADDRESSED | `warpOnClick`/`warpTo`/`warpStep` shipped (AX.W17); `proof:constellation-warp-live` | DONE-in-lib · DELTA-owed · NOT-consumed-by-slides |
| 4 (touch/type) | DEFERRED "only dock" | `--ui-scale`/`--control-floor`/`--touch-target` library system (27 refs); `proof:ui-scale` | PARTIAL (breadth incomplete; phantom `proof:touch-target` in AY) |
| 9 (slider zoo) | DEFERRED "no consolidation" | `standard`+`spectrum` only (AX.W59); zoo removed | DONE-in-lib · consumer-migrate-verify owed |
| 5/10 (dock lockstep / slider) | CHRONIC | `--dock-motion-resize` single-source landed; `proof:dock-animation-live` | CODE-DONE · DELTA-owed (the perceptual lag) |
| 1 (constellation first-class) | PARTIAL | exported `/constellation` + API types | DONE-in-lib · L.W-ADOPT owed |

---

## Convergence criteria (what "perfected" means for this lane)

The recurring-ask set is discharged when, for EACH re-flagged item: (1) the AY/L
plan status matches LIVE SOURCE (no stale UNADDRESSED/DEFERRED on built code);
(2) the wave is framed as VERIFY-and-tune (with a captured-PNG hard gate) where
code exists, and as net-new ONLY where source grep confirms absence (easter
eggs, ui-scale breadth, the two recent directives); (3) every "done" carries a
captured live DELTA (the cardinal lesson — no inflated marks); (4) the two
homeless recent directives (per-component convergence; colocation+idiom
restructure) have named AY waves; (5) slides consumes the lib constellation and
its bespoke copy is deleted (L.W-ADOPT). The bar: a fresh auditor re-running this
grep finds ZERO ask whose plan-status contradicts source, and ZERO "done" without
a DELTA.

## Chronic-misses (carried ≥2 passes/tranches)

- **Captured live DELTA / cardinal lesson** — recurs keyframes.js → AX → AY;
  7 AX rows were inflated (live-verified, 0 PNG). The single highest-signal miss.
- **Dock items-lag perceptual lockstep** — re-flagged across keyframes.js + AX;
  code landed, perceptual proof never captured.
- **Slides bespoke `constellation.ts`** — the root-not-in-place exemplar; lib
  component export-ready since AX.W17, still not consumed.
- **"did we do it?" touch-target/type-scale** — re-flagged with self-audit
  phrasing; system landed but breadth + the phantom-gate confusion persist.

## Fold-into routing

- Cardinal-lesson DELTA discipline → folds into the hard gate of EVERY AY impl
  wave (W-DOCK2, W-CON2, W-SCALE2, W-AUR3, W-BLOB2) + the AY close (W-CLOSE1).
- Dock perceptual lockstep capture → AY.W-DOCK1 (re-cast VERIFY) + W-DOCK2.
- Constellation warp/translucency verify + easter eggs → AY.W-CON1/W-CON2
  (re-cast VERIFY+net-new-only); consume → L.W-ADOPT.
- ui-scale breadth + phantom-gate fix → AY.W-SCALE1/W-SCALE2.
- Slider consumer-migrate verify → AY.W-SLD2.
- Per-component frontend-design convergence → NET-NEW AY.W-CONVERGE.
- Colocation + sub-component-dir + design-idiom restructure → AY.W-GOD1 widen
  or NET-NEW AY.W-COLOCATE + W-CSS1 extend.
- TOTALITY/deploy stopping-condition → the AY + L close framing (W-PUB1 + L.W5).
