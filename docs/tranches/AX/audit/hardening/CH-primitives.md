# CH-primitives — adversarial red-team of the primitives band (W18/W19/W20/W21/W23/W24/W50)

HEAD ~89edffc (3.8.0 published), branch `at-dock-convergence`. Read-only audit; PLANNING only.
Every finding below is re-proven LIVE against the HEAD tree, not trusted from the wave docs.

## VERDICT: WEAK — the band is HALF-LANDED and the landed half is uncaptured

The band's two highest-leverage user asks (W19 F0 header-ribbon prune; W50 dropdown-scale) did
NOT land. The one PROGRESS row marked `live-verified` (W19) landed only its convergence-2 SUBSET
(glyph/glass-carousel) and explicitly punted its own headline (F0). The two `complete` rows
(W23/W24) have NO captured live DELTA. And a clean-break rename in the sibling tabs band (W53
responsive-tabs retire) left the band's own CI gate (`proof:consumers:static`) RED at HEAD.

---

## CHALLENGE 1 — W19 is marked `live-verified` but its HEADLINE fold (F0 header-ribbon) NEVER landed

`PROGRESS.md:35`: `W19 | primitive prune A — header-ribbon/glyph-face/disco-glyph | live-verified (DEVELOPED)`.
The wave's TITLE names header-ribbon first; the wave doc's §Scope fold (1) is "DELETE header-ribbon
(F0) — independent, no coupling"; RED witness 1 is the header-ribbon live surface.

LIVE PROOF at HEAD:
- `test -d src/components/custom/header-ribbon` → **EXISTS** (HeaderRibbon.vue + index.ts + types.ts).
- `src/subpaths/header-ribbon.ts` → EXISTS; `grep -c header-ribbon package.json` → **>0** (exports +
  typesVersions still present).
- `src/api/index.ts` still re-exports `HeaderRibbonPosition`/`HeaderRibbonProps`.
- `scripts/proof-storybook-ia.mjs:55` still carries the `header-ribbon` slug.
- `demo/stories/navigation/header-ribbon.vue` → story EXISTS + manifest row present.

The W19 doc's own "Convergence-2 augment" (the bottom section, line 541) confesses it:
*"Header-ribbon is out of THIS lane's scope (it is the wave doc's original F0 — owned separately)."*
So the convergence-2 lane landed glyph-face/disco-glyph/glass-carousel (verified GONE) and the F0
header-ribbon prune was **deferred and never executed**, yet PROGRESS flips the whole row to
`live-verified (DEVELOPED)`. This is exactly the PROGRESS↔reality inflation the cardinal-lesson
discipline exists to kill: a partial landing reported as a full one. RED witness 1 of the wave is
STILL RED at HEAD.

Mitigating note (not absolving): W19's own §Dependencies sequences the header-ribbon PUBLISH behind
W35 (keyframes EditorShell migration), because keyframes.js `EditorShell.vue` is a live cross-repo
consumer. But that gates the *publish*, NOT the *in-repo excision* — the doc is explicit that "W19 may
LAND its in-repo excision independently." It did not. The in-repo F0 prune is simply unlanded under a
`live-verified` mark.

## CHALLENGE 2 — W50 (the user-reported "dropdowns have inconsistent font-size") is 0% landed

`PROGRESS.md:68`: `W50 | uniform dropdown/select/menu type-scale | planned`. Every RED witness the
wave doc named is STILL RED at HEAD:
- `grep -rn "\-\-dropdown-text\|\-\-menu-text" src/` → **0** hits. The token pair the wave's entire
  goal rests on does not exist. The consumer's `:root{--dropdown-text:…}` override (RED witness 4) is
  dead.
- The raw `text-sm`/`text-xs` Tailwind-literal leak persists at every named site:
  `_shared/menuItemVariants.ts:33`, `SelectTrigger.vue:42`, `ComboboxInput.vue:33`,
  `CommandInput.vue:32`, + the label/shortcut/heading/empty surfaces across select/dropdown-menu/
  combobox/context-menu/command/multi-select (≥15 files carry a `text-sm`/`text-xs` literal).
- The input height mismatch (RED witness 3) is live: `ComboboxInput.vue:33` is `h-10`,
  `CommandInput.vue:32` is `h-11` — same picker-filter role, two control heights.

This is a directly user-reported defect (USER-DEFECTS pass-1 D17 / "the scaling is inconsistent")
sitting wholly unaddressed. Note also it tangles with W51 (`--ui-scale`) and W45's `--dock-scale` — the
MASTER-PLAN Batch 6 wants "reconcile --dock-scale onto ONE --ui-scale"; W50 must mint `--dropdown-text`
as a derivative of that ONE scale, not a fresh axis, or the band ships a THIRD sizing token family.

## CHALLENGE 3 — W23 carousel does NOT satisfy P5 (the actual user ask); it fixed a DIFFERENT defect

The lane's P5 question — `USER-DEFECTS-pass2:50`: *"/navigation/carousel → more Apple-like + glassy
(the liquid/squishy carousel)"* — is UNMET. W23 actually did two things:
1. Fixed `CarouselDots` dot-rail contrast (F4 — a real, distinct WCAG 1.4.11 defect: inactive dot
   invisible + a dead `scale-[var(--scale-hover)]` arbitrary class). This landed and is GOOD
   (`CarouselDots.vue:119` paints `color-mix(in srgb, var(--foreground) 52%, transparent)`, the dead
   scale class is excised, a real `[data-active]::before` morph emits). NOT the P5 ask.
2. Restyled `custom/glass-carousel` chrome onto the `.glass-wash` band (F5). **This work is DEAD** —
   W19/P4 then PRUNED glass-carousel entirely (`src/components/custom/glass-carousel` → GONE,
   `glass-carousel.vue` story → GONE). The W19 doc itself records it: *"The W23-complete F5 chrome
   restyle of custom/glass-carousel is SUPERSEDED by this prune."* So half of W23's `complete` work was
   landed onto a soon-deleted surface and then deleted.

What the user ACTUALLY asked (P5) — make the remaining embla `/navigation/carousel` Apple-like +
glassy + liquid/squishy — was never done. LIVE PROOF: `grep glass-material|squish|backdrop-filter|liquid
src/components/ui/carousel/` finds ONLY `tap-squish`+`focus-ring` on the DOTS (the indicator pips).
The carousel slides/track/items (`Carousel`/`CarouselContent`/`CarouselItem`) have ZERO glass material,
ZERO squish-spring, ZERO liquid feel. `/navigation/carousel.vue` renders a plain color-swatch slide
deck with a pager + dots. P5 is a clean miss reported `complete`.

## CHALLENGE 4 — W23 AND W24 are marked `complete` with NO captured live DELTA (cardinal-lesson breach)

`PROGRESS.md`: W23 `complete`, W24 `complete`. Both audit JSONs DEFER the live capture to the
orchestrator: W23 `liveVerifyNeeded.owner: orchestrator π-lane … the wave does NOT close on the
headless gates alone`; W24 `renderTruth.viewports: "the screenshot π-lane … is the orchestrator's
real-device run"`. The band's OWN capture discipline
(`audit/visual/CAPTURE-PROTOCOL.md`) says: *"A wave's PROGRESS status is `live-verified` ONLY when its
DELTA.md exists."*

LIVE PROOF: `docs/tranches/AX/audit/visual/` contains ONLY `CAPTURE-PROTOCOL.md` — ZERO `W*-DELTA.md`,
ZERO `.png` screenshots for the whole tranche, including W23/W24. So two `complete` rows + W19's
`live-verified` row rest on commit-message/JSON claims with no captured paired-π. This is round-3 of
the exact inflation the protocol was written to stop (the protocol's own "Retroactive backfill owed"
list names W45/W52/W53/W56/W57/W59 — the primitives band's W23/W24/W19 are NOT even on that backfill
list, so the debt is under-counted).

## CHALLENGE 5 — the band's own CI gate `proof:consumers:static` is RED at HEAD (W53 sibling-consumer miss)

Running `npm run proof:consumers:static` at HEAD FAILS:
```
speedtest:src/layouts/AdminDashboardLayout.vue:119 unknown-package-subpath
  @mkbabb/glass-ui/responsive-tabs is not declared in package exports.
+ PublicDashboardLayout.vue:127, AdminDataView.vue:93 (3 sites)
```
W53 (tabs-unify) retired `@mkbabb/glass-ui/responsive-tabs` (clean break — verified: no
`src/subpaths/responsive-tabs.ts`, `grep -c responsive-tabs package.json` → 0). But the sibling
speedtest consumer still imports it at 3 call sites, and the gate (`gates.mjs:57`, a `ci`-tagged row)
is RED. This is the CHRONIC "clean-break rename misses test-mirrors/barrels/sibling-consumers" class
(MEMORY: glass-ui-binding-verification + the consumer-mis-prune fix-class). It recurs here exactly as
it did for the L.W3 pagination/virtual retires and the W05 `--ease-apple-spring` speedtest survivors.
The band cannot close green while a `ci` gate is RED on a sibling-consumer the tabs retire missed.

## CHALLENGE 6 — root-barrel cherry-pick count doc-truth drift (W24 added deck-progress, comment still says 5)

W19 set the cherry-pick count 7→5 (removed glyph-face+disco-glyph). W24 then ADDED `deck-progress` to
the root barrel (`src/index.ts:130` `export * from "./components/custom/deck-progress"`, "additive,
NOT a demote"). But:
- `src/index.ts:52` comment still reads "a curated **5** of the custom/ packages" — actual count is
  **6** (instrument-chassis, instrument-rail, hover-popover, configurator, scrolling-text,
  deck-progress).
- `proof-consumers-static.mjs:136` comment still reads "The **5** cherry-picked custom/ packages",
  and `rootContractFiles` (lines 137-141) lists only the 5 — deck-progress is NOT in the contract
  file-list; W24 smuggled it in via a symbol-level `rootAllowed.add("DeckProgress")` at line 168-169
  instead. The gate doesn't RED (the symbol injection masks it), but the cherry-pick ledger is now
  inconsistent: 5 file-listed + 1 symbol-injected = the comment lies. A future prune/audit reading
  "5 cherry-picks" will mis-count. Doc-truth drift the W19 wave explicitly warned must be owned by
  exactly one wave — and W24 didn't.

## CHALLENGE 7 — W23 dot-morph animates `width`/`height` (layout) on a spring — divergent from the W52 easing doctrine + non-compositor

`CarouselDots.vue:120-123`:
```
transition:
    width  var(--duration-normal) var(--spring-dock),
    height var(--duration-normal) var(--spring-dock),
    background var(--duration-fast) var(--ease-standard);
```
The active-pip elongation rides `width`/`height` on `--spring-dock`. Two problems against the band's
own coherence claims:
1. `width`/`height` are LAYOUT properties — they cannot be GPU-composited; this morph runs on the
   main thread and triggers layout on every frame (jank risk, esp. on the 375px mobile viewport the
   protocol demands). A `transform: scaleX()` on the `::before` (with `transform-origin`) is the
   compositor-friendly equivalent that gets the identical visual elongation.
2. The CLAUDE.md AX.W52 §6 easing doctrine: "surface props → --ease-standard; transform → springs."
   Here a layout prop is on a spring. This is a divergence from the "ONE easing model" the tranche is
   converging toward (and the I.W6 keyframes finding about specular cohesion is the same genre — N
   divergent sub-models where the tranche claims one).

---

## CHRONIC (slip-history)

- **PROGRESS↔reality inflation** — W19 `live-verified` over an unlanded F0; W23/W24 `complete` over
  zero captured DELTA. Recurs every roll-up: the protocol doc itself is "round 2 of the aggregation
  inflation"; the AW MEMORY note (`project_aw_session_limit_halt`) records the headless-green/visually-
  broken gap as the AW halt cause; the cardinal-lesson-inflation recurs at every PROGRESS roll-up
  (MEMORY: `feedback_live_verify_capture`).
- **Clean-break rename misses sibling consumer** — W53 responsive-tabs retire → speedtest 3-site
  break → `proof:consumers:static` RED. Same class as L.W3 pagination/virtual retire, W05
  `--ease-apple-spring` speedtest survivors, the W21 metric-cell/stack MIGRATION.md "RETIRED (AV.W10)"
  claim that the dirs/subpaths CONTRADICT at HEAD (verified: `src/subpaths/metric-cell.ts` +
  `metric-stack.ts` EXIST despite the "retired" claim). 3+ recurrences across L/AV/AX.
- **Dead work on soon-pruned surfaces** — W23 F5 restyled glass-carousel; W19/P4 then deleted it. A
  sequencing miss: the prune disposition (P4) and the restyle (W23 F5) were both in flight without a
  precedence edge, so effort landed on a surface marked for deletion.
- **Doc-truth count drift** — cherry-pick count (5 vs actual 6) un-reconciled across W19→W24.

---

## HARDENING ACTIONS (to PERFECT the band)

1. **Re-open W19 to `in-progress`** and LAND the F0 header-ribbon in-repo excision (the dir + subpath
   + package.json exports/typesVersions + api types + IA slug + demo + manifest), keeping the PUBLISH
   gated behind W35. Re-run RED witness 1 to GREEN. The PROGRESS row stays `in-progress` (NOT
   `live-verified`) until BOTH the glyph subset AND F0 are landed AND a DELTA.md exists. Amend
   PROGRESS to split the row honestly: glyph/glass-carousel DONE, header-ribbon F0 pending-W35.

2. **Execute W50** as a token-first pass that mints `--dropdown-text`/`--dropdown-text-secondary`
   anchored on the EXISTING golden-ratio ladder, routes the whole picker family through it, and
   unifies the `h-10`/`h-11` input heights. SEQUENCE it AFTER W51's `--ui-scale` decision so the
   dropdown token derives from the ONE scale (MASTER-PLAN Batch 6) — do not mint a third sizing axis.
   Add a prototype: mount Combobox+Command filter inputs side-by-side and read back
   `getComputedStyle().height`+`fontSize` as the born-RED→GREEN witness.

3. **Mint a NEW wave (W23b or fold into W54 glass-first MAXIMAL) for P5** — make the embla
   `/navigation/carousel` itself Apple-glassy: a `.glass-material` band member on `CarouselContent`/
   `CarouselItem`, a squish-spring on slide-snap (the `--spring-snappy`/`--spring-dock` register), and
   a liquid drag-rubberband. P5 is a glass-first cohesion case — the carousel is currently the only
   nav surface with NO glass, which directly contradicts the MAXIMAL-glass-first ROOT (W54). Run an
   Apple-SOTA prototype (apple.com/os carousel idiom) before authoring.

4. **Backfill the W23/W24/W19 DELTA.md captures** in `audit/visual/` per CAPTURE-PROTOCOL (≥2
   viewports × light/dark, paired-π getComputedStyle readback + screenshot). Until captured, revert
   W23/W24 to a sub-`complete` status and W19 off `live-verified`. Add W23/W24/W19 to the protocol's
   "Retroactive backfill owed" list (currently under-counted). Wire the `proof:live-verified-ledger`
   close gate (W33) so this can never be flipped to `complete` again without the artefact.

5. **Fix the `proof:consumers:static` RED** — route the W53 responsive-tabs sibling-consumer break to
   the speedtest port (the speedtest 3 sites → SegmentedTabs `:responsive`), and add it to the W53/W28
   consumer-migration ledger. The band cannot close green with a `ci`-tagged gate RED.

6. **Reconcile the cherry-pick count** (one wave owns it — assign to W21, the barrel-coherence wave):
   bump `src/index.ts:52` + `proof-consumers-static.mjs:136` comments 5→6, and move deck-progress from
   the symbol-injection hack into `rootContractFiles` proper so the contract file-list matches the
   barrel. Fold in W21's metric reconcile: metric-pill has ZERO real consumers (only its barrel +
   demo) yet ships on the root barrel — adjudicate retire-vs-keep; and fix the MIGRATION.md
   metric-cell/stack "RETIRED (AV.W10)" claim that the surviving dirs/subpaths contradict.

7. **Re-author the W23 dot-morph onto `transform: scaleX()`** (compositor-friendly + W52-doctrine-
   aligned) so the band stops animating layout props on a spring — a small fix that closes a real
   cohesion gap against the "ONE easing model" claim.
