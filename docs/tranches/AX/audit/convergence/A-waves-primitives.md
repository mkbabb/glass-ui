# Convergence audit — A-waves-primitives (W18/W19/W20/W21/W40 vs D6/D8/D12/D14)

**Lane:** primitives-band wave coverage. **Question:** does the prune/recategorize/IA-reinvention
band (W18 storybook-IA, W19 prune-A, W20 primitive-fix, W21 recategorize, W40 demo-shell) cover the
four user defects — D6 (blob-page consolidation), D8 (glass-material broken), D12 (chassis retire),
D14 (dock section)? Read all five waves IN FULL; cross-referenced against `manifest.ts`, `src/`,
and the sibling waves W06/W28/W29/W09 the band depends on.

HEAD `f2fc614` (3.8.0 cut). The defect ledger was captured at `e2c9995` (AFTER W07 aurora-unblock +
W13 + W22 landed — material to D8 below).

---

## Verdict per defect

### D12 — InstrumentChassis retire — ANCHOR MISATTRIBUTED → owned by W28/W29, not my lane

**The ledger dedup anchor is wrong.** USER-DEFECTS line 48 maps `W19/W20/W21 primitive
prune/fix/recategorize → D12 (chassis)`. None of W19/W20/W21 retire the chassis:

- **W19** prunes header-ribbon + glyph-face + disco-glyph ONLY. It explicitly routes the
  instrument-chassis dependency to W28/W29: *"The instrument-chassis composition consumer dies with
  instrument-chassis's own W28/W29 removal — coordinate but DO NOT block on it"* (W19 Scope (2),
  FileBounds OUT-of-bounds, Disjointness vs W28/W29).
- **W20** touches dialog-native + Card + GlassPanel. Zero chassis surface.
- **W21** recategorizes configurator/drawer/metric-pill/use-token-color + the MIGRATION.md honesty
  repair. It only PORTS the `.instrument-rail` twin-line groove recipe (A-1, conditional) BEFORE W29
  prunes the source — it does not own the chassis retire.

**The actual owner is W29** (`AX.W29-repatriation-prune-orphan-prune.md`), with **W28** the
cross-repo native-receive HARD PREDECESSOR:

- W29 RED witness 1: `instrument-chassis` rides `src/index.ts:118`, `src/subpaths/instrument-chassis.ts`,
  `./instrument-chassis` package.json export, `InstrumentChassisPhase` api type,
  `src/styles/instrument-chassis.css` (`index.css:128`), demo `compositions/instrument-chassis.vue` +
  `manifest.ts:240`. `instrument-rail` rides `:119` / its subpath / `manifest.ts:241`.
- W29 Scope (A) REPATRIATE-PRUNE strikes instrument-chassis (gated behind W28's speedtest+muster
  native receive); Scope (B) ORPHAN-PRUNE strikes instrument-rail + metric-pill (no native landing,
  parallel, not muster-blocked); Scope (C) excises the dead `variant="instrument-strip"` dock mode
  (`GlassDock.vue:44` union member + `:158`/`:186` branches + `dock.css:422-481`) + the now-orphaned
  `@utility twin-line-divider`; Scope (D) drops the two `compositions` IA slugs
  (`proof-storybook-ia.mjs:75`) + reconciles the five chassis-hardcoding gates + the MIGRATION.md
  final-retired state.

So **D12 is COVERED — by W29 (strike) + W28 (cross-repo native-receive), not by my lane.** The user's
"I thought the instrument chassis was to be removed?" is correct intent; the wave set DOES remove it,
just at the BACK of the tranche behind the W28 cross-repo wall, which is why it still ships at the
ledger-capture HEAD `e2c9995` (W28/W29 are still `planned`).

**Action:** correct the ledger anchor `W19/W20/W21 → D12` to **`W28/W29 → D12`**. No new wave.
Optionally W18 should record the chassis rows as ALREADY-DROPPED-BY-W29 when it frames the surviving
`compositions` set (W18 Scope-6 already encodes this "frame the surviving set, never delete a prune
wave's row" contract — instrument-chassis/-rail are among the rows W28/W29 own).

### D8 — `/substrates/glass-material` totally broken — COVERAGE GAP (the substrate STORY is decoupled by nobody)

`glass-material` is a real shipped grammar (`src/styles/glass.css` `.glass-material` group +
`glass-refract.css` + `glass-specular-track.css`) with a dedicated demo story
`demo/stories/substrates/glass-material.vue` (`manifest.ts:101`). It is DISTINCT from `glass-panel`
(`manifest.ts:99`) — the ledger anchor conflates them (`W19/W20/W21 → D8 (glass-material/glass-panel)`).

Coverage today:
- **W09 (complete)** owns the `.glass-material::before` specular recipe tune-to-subtle — the over-glow
  half of the brokenness (couples to D11). It does NOT own the story's render legibility.
- **W20** RETIRES `glass-panel` and re-points the `glass-panel`/`paper-glass`/`use-glass-renderer`
  demo stories ONTO `<Card surface="glass">` / `.glass-material` OVER A STATIC BACKDROP (W20 Scope F2
  + 2c). W20's static-backdrop decouple is scoped to those three stories + `card.vue` — **NOT to
  `substrates/glass-material.vue` itself.**
- **W18** reframes Substrates as render-backgrounds but is moves/renames-ONLY (FileBounds: "NO
  component-internal edits").

The gap: `substrates/glass-material.vue:12,33-36` STAGES the whole matrix over `<Aurora :config=
"DEFAULT_AURORA_CONFIG" class="fixed inset-0 -z-10">` (`import { Aurora } from
"../../../src/subpaths/aurora"`). This is the EXACT transitive-breakage class W20 names for the card
story (W20 RED-witness 2: "stages over the W07-broken Aurora that renders BLACK/broken live ... so even
the legible tier-alpha steps don't read"). Aurora is now fixed (W07 complete) — but the ledger captured
D8 at `e2c9995` AFTER aurora was fixed, so D8 is NOT purely the Aurora-black transitive break: it is
either the W09 specular blowout (D11-coupled) reading as "broken," a `glass-refract`/`@supports`
render fault on the live engine, or a story-staging fault — and **no wave OWNS verifying the
`substrates/glass-material.vue` story PAINTS correctly live.** W20 fixes the card/panel stories'
legibility but explicitly excludes the glass-material substrate story; W18 won't touch its internals.

**Action:** AUGMENT **W20** (the primitive-fix wave that already owns the glass-material retire-target
+ the static-backdrop decouple idiom + `proof:glass-material-unified` coordination with W09). Extend
W20's F2 surviving-substrate-story scope to INCLUDE `substrates/glass-material.vue`: apply the SAME
static-backdrop decouple (or confirm it reads over the now-fixed Aurora) + a π-lane live render
assertion that the five rungs + the four `@supports`-gated SOTA folds (refract/squircle/chromatic/
adaptive-tint) PAINT and are not collapsed/black/over-glowed. This is the natural home — W20 already
defines the `.glass-material` retire-target legibility contract; adding the one substrate story it left
out is an augment, not a net-new wave. Cross-link to W09 (specular magnitude) so the two don't
double-tune. (If the orchestrator prefers, the live-render assertion can ride W18's MANDATORY
π-lane Substrates-renders-aurora/blob/constellation/glass-material live-background audit — W18 HardGate
already names glass-material as a live-background it must verify; but the FIX, if one is needed beyond
the decouple, belongs to W20/W09, not the moves-only W18.)

### D6 — blob-page consolidation (3-4 → 1) — PARTIAL; W18 reframes but does NOT consolidate

The blob family at HEAD is THREE substrate rows — `goo-blob` (`manifest.ts:96`), `blob-interaction`
(`:97`), `blob-mood` (`:98`) — plus `glass-material` (`:101`, a separate non-blob substrate the ledger
parenthetically wonders about). D6 asks: *"Consolidate to ONE blob page; refine the extra items into
the extant one."*

- **W18** (the ledger anchor for D6) reframes Substrates canonically as render-backgrounds and
  ENUMERATES the blob trio as SEPARATE surviving members: *"aurora · goo-blob · blob-interaction ·
  blob-mood · constellation · fourier-field · glass-material"* (W18 Scope-4). It also explicitly
  declares aurora + the blob trio "CORRECTLY filed ... STAY in Substrates ... the §6.2 'misfiled?'
  suspicion is STALE." So **W18 KEEPS the three blob pages — it does NOT consolidate them to one.**
- **W40** rebuilds the nav shell on the W18 tree; it navigates whatever W18 frames — no consolidation
  authority.

So D6 is **NOT covered** by my lane as written — W18 reframes the category but preserves three blob
rows; the user wants ONE. This is a real divergence between the user ask and the W18 plan.

**Action:** AUGMENT **W18** (the IA-reinvention wave that owns the Substrates category framing). Add a
D6 fold to W18 Scope-4: consolidate `goo-blob` + `blob-interaction` + `blob-mood` into ONE `goo-blob`
substrate story with the interaction + mood content as SECTIONS (parallels W18's own `tools`-dissolve
+ `primitives`-split discipline, and W06's "Slider in dock as a SECTION inside the single dock home" +
AV.W10's bouncy-tabs→tabs / slider-variants→one-slider section-folds — the established house pattern).
This drops two `substrates/*` rows + their IA slugs (`proof-storybook-ia.mjs`) and re-greens
`proof:no-orphan-demo-route`. The blob LIBRARY behaviour (lighting D4, hover D5, moods D7) is owned by
W15/W16 — W18's fold is the demo-IA consolidation ONLY, not a library fix. NOTE: W18 currently asserts
the blob trio "STAY ... correctly filed"; this fold REVISES that to "stay in Substrates but as ONE
consolidated page," which the wave must ratify (it is a category-shape RATIFY-BEFORE-IMPL W18 already
has machinery for).

### D14 — entire dock SECTION (morphing/animations/layers/variants/rail) — COVERED (W06+W18+W40)

D14 asks for an entire dedicated dock section. This is substantially covered across the band:
- **W06** (the dock STORY HOME) consolidates the scattered dock stories
  (`navigation/dock` + `dock-layers` + `rail` + the `dock-with-slider` keepDockOpen proof + the
  W04 `overflow="wrap"` section) into ONE `navigation/dock` home with honest type-narrowed rail +
  hoisted polish — the morphing/layers/variants/rail content.
- **W18** Scope-5 frames that consolidated set into a FIRST-CLASS `dock` IA category (gathering the
  three cross-category dock surfaces + DockBackgroundToggle + the wrap demo). W18 explicitly
  COORDINATES with W06 (W06 owns the story HOME, W18 owns the CATEGORY that frames it).
- **W40** rebuilds the demo nav SHELL on the AX-rebuilt dock — the dock's own dogfood surface.

So D14's "ENTIRE section dedicated to the dock" IS the W06 home + W18 first-class category + W40 shell.
**COVERED — no new wave; the band already names D14 as W06's content + W18's category.** D13 (persistent
controls + proportion + dividers) is the adjacent dock-DESIGN ask and is W06's domain, not my lane's
recategorize concern.

---

## Summary

| Defect | Ledger anchor (my lane) | Reality | Verdict |
|---|---|---|---|
| D12 chassis retire | W19/W20/W21 | **W29 strike + W28 native-receive** — none of my waves touch the chassis | anchor MISATTRIBUTED → correct to W28/W29; audit-note |
| D8 glass-material broken | W19/W20/W21 (glass-material/glass-panel) | W20 retires glass-PANEL + re-points onto glass-material; W09 tunes specular; **no wave verifies the `substrates/glass-material.vue` STORY paints live** (Aurora-staging + post-fix residue) | AUGMENT W20 (extend F2 substrate-story decouple/live-assert to glass-material.vue; cross-link W09) |
| D6 blob consolidation | W18 (+W40) | W18 reframes Substrates but KEEPS 3 blob rows ("correctly filed, STAY") — does NOT consolidate to one | AUGMENT W18 (fold goo-blob+interaction+mood → one page w/ sections; revise the "stay separate" assertion) |
| D14 dock section | W18 (+W06/W40) | W06 consolidates dock stories → one home; W18 frames first-class `dock` category; W40 dogfoods shell | COVERED — no new wave |

**Net:** my lane's waves are internally coherent and cover D14; but two ledger anchors need correction
and two augments are warranted — both FOLD INTO existing waves (W20, W18), NO net-new wave required.
The single highest-value correction is the **D12 anchor misattribution** (W28/W29 own it, not
W19/W20/W21) — without it, the convergence pass would dispatch a chassis-retire fix into the wrong
band and collide with W29's already-authored strike.
