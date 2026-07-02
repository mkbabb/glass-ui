# KS-CONSTELLATION — the ecosystem keystone (binding spec)

**Series:** KS-C (structure + world) · **Date:** 2026-07-01 · **HEAD:** `f6fa1767` (tranche/BG)
**Waves bound (frozen ids):** `BH.B6+B7-asks` (F8) · `BH.B2-export-reshape` (F6, consumer side) ·
`BH.B4e-cut-authoring` (F8) · `19.1 BG.W-CUT` (F8, the consumer-facing half). Plus the demo-showcase
alignment asks (SHOWCASE-class relay rows — content of B7, not new waves).
**Research composed:** `research/CONSTELLATION-sota.md` (the read-only sibling survey — every claim
file:line-cited) + in-lane corpus re-grounding (the corpus report failed; re-done here — every pin below
disk-verified 2026-07-01) + `docs/tranches/BH/PLAN.md` §4/§7 + `docs/tranches/BH/coordination/
asks-and-consumes.md` + `docs/tranches/BH/research/proto/P3.3-SIBLING-CONSUMER-ROSTER.md` +
`RULINGS-PASS2.md` incl. §CORRECTIONS (binding).
**Fences (ABSOLUTE):** spec only — zero src/demo/scripts edits. Every sibling under `~/Programming/` is
READ-ONLY; every sibling change below is a BY-NAME ASK, never an edit (inv-26, literal — the 2026-06-20
park incident is the standing lesson). The wave SET is frozen; wants → §7 fold-candidate notes.
The SYNTHESIS-PASS1 §4 protected set holds (the foreign-tree fence + `--run full` union at the cut +
the disposition ledger are IN it).

---

## §0 · The constellation at HEAD (disk-verified pins — the corpus re-ground)

| # | repo | glass-ui pin | placement | kf pin | value pin | 5.0.0 exposure |
|---|------|--------------|-----------|--------|-----------|----------------|
| 1 | **value.js** `1.2.0` | `file:../glass-ui` | devDep (demo) | `file:../keyframes.js` | — | **UNPROTECTED** — demo breaks at dist rebuild |
| 2 | **sci-report/atlas** `1.0.0` | `>=4.2.0` | **peer** | `^5` | `^1.2.0` | **UNPROTECTED** — auto-resolves 5.0.0 on re-install |
| 3 | **speedtest** | `^4.0.1` | dependency | `^4.3.0` STALE | `^0.13.0` STALE | pinned; the AW.W7 R-CONSUME debtor |
| 4 | **keyframes.js** `5.1.0` | `~4.0.0` | optionalDep (demo) | — | `^1.2.0` | tilde-locked <4.1; demo-only |
| 5 | **fourier-analysis** (web/) | `^4.0.0` | dependency | `^4.3.0` | `^0.13.0` | pinned; zero at-risk imports |
| 6 | **muster** (frontend/) | `^3.1.0` | dependency | — | — | pre-4.0 floor; live `/api` consumer |
| 7 | **bbnf-buddy** | `^3.9.0` | dependency | `^2.1.1` | `^0.10.0` | pre-4.0 floor; `--glass-blur-dock` live |
| 8 | **slides** (pair: til-briefing + feedback-coder) | `3.13.0` EXACT | dependency | `^3.0.0` | — | pre-4.0 floor; zero at-risk |
| 9 | **words** | `^3.0.0` + vendored d6 fork | dep + vendored | — | — | disposition note only (inv-11; not consumption) |

**The pre-4.0-floored four:** muster (`^3.1.0`) · bbnf-buddy (`^3.9.0`) · slides (`3.13.0`) · words
(`^3.0.0`, vendored-fork disposition). Their bump crosses the 4.0.0 major AND every 4.x minor AND 5.0.0
in one hop — which makes B4e's blockquote-collapse into proper `## 4.x.0` sections **load-bearing
migration path**, not archaeology (§4.3).

---

## §1 · The hallmark delineated

**The constellation is ONE ecosystem with a reciprocal-showcase flywheel.** glass-ui COMPOSES the two
engines — value.js (color/easing math: `wcagContrastRatio`, `interpolateHue`, `CSSCubicBezier`,
OKLCh primitives; 9 import sites) and keyframes.js (spring/morph physics: `springTimingFunction`,
`SpringProgress`, `ElementMorph`, `Draggable.snap`, `flip`; 25 sites) — and the world COMPOSES glass-ui
(838 raw sibling import lines: speedtest 202, words 139, fourier-analysis 126, sci-report 101, muster 93,
value.js 89, slides 17). The flywheel closes because **the engines' own demos consume glass-ui BACK**:
value.js's color-picker hero drives a live `<Aurora>` + `<GooBlob>` off the picked OKLCh palette
(`value.js/demo/color-picker/App.vue:104-116,217-290`); keyframes.js's demo chrome is glass-ui dock +
keyboard + dark (`keyframes.js/demo/CLAUDE.md:36,86,101`). A stranger recognizes the ecosystem by this
loop: the math engine's demo is painted by the design system built on the math engine.

The identity is MECHANISM, not sentiment:

- **The foreign-tree fence (inv-26, LITERAL).** glass-ui edits ZERO sibling files, ever. The by-name ask
  is the only channel; the sibling is version + response AUTHORITY.
- **contract-v2 dev-resolution** (invariant 30): every consumer resolves the built `dist/`; every
  publisher runs `build:watch`. No freshness runtime gate needed.
- **The broken-singleton identity** (`proof:peer-conformance` clause 1): glass-ui's direct value.js pin
  must contain keyframes' transitive — ONE value.js instance by construction.
- **Invariant-11 (no out-of-band lineage):** every registry publish is a master-ancestor through the
  gated `release.sh`/`release.yml`; the prune census probes the REGISTRY, not just the import graph
  (the d6/atlas lesson).
- **The consume-and-delete cadence:** every shipped primitive names its consumer interim; the bump
  deletes the interim in the same commit, byte-equivalently where possible.
- **The ≥2-consumer bar is FED by the constellation** — consumer evidence files cite sibling binaries.

**Negative space:** NOT a monorepo (no changesets, no workspace lockstep); NOT version-lockstep (pins
protect, asks migrate); NOT glass-ui speccing sibling redesigns (asks suggest by name; the sibling owns
the work); NOT a synchronized flag-day (the cut never blocks on 8 repos' schedules).

---

## §2 · SOTA grounding

The primary SOTA subject IS the constellation (the survey in `research/CONSTELLATION-sota.md`). External
practice, mapped:

| SOTA practice (2026) | Verdict | Constellation form |
|---|---|---|
| npm provenance publishes (GitHub OIDC attestation) | ADOPTED | `release.yml` gated tag-fire; 4.1.0 precedent |
| Monorepo + changesets for multi-package majors | REJECT — repos are sovereign | multi-repo + by-name asks + contract-v2 file-resolution in dev |
| Vue/Nuxt-style major migration guides + codemods | ADOPT the guide, SKIP the codemod | the consumer set is CLOSED (9 known repos) — per-consumer quick-paths beat a generic codemod (§3.Q1) |
| Peer-dep singleton discipline (React/Vue ecosystem) | ADOPTED + gate-locked | `proof:peer-conformance`; atlas's peer-not-dep gate mirrors it consumer-side (`l0-glass-ui-peer-not-dep.gate.ts`) |
| Deprecation windows / back-compat aliases | REJECT | clean breaks + pins-protect + risk-ordered asks (the house law) |
| "Eating your own dog food" reference apps | ADOPTED as the flywheel | the engine demos as glass-ui showcases (§3.Q2) |

Where the constellation LEADS: the ask relay with a machine gate (`proof:crossrepo-asks:bh` — a
SOURCE-DOC AUTO-SCAN, not a hand count; NOT yet on disk — B6+B7 MINTS it, §4.1) and the
registry-consumer probe (`proof:lineage-probe`) have no common OSS equivalent; they exist because the
d6 fork stranding actually happened here.

---

## §3 · First-principles design — the greenfield loop (three contested questions)

### Q1 — the per-consumer 5.0.0 migration STORY

**Directions:** (a) ONE generic version-keyed MIGRATION table, consumers self-serve; (b) per-consumer
quick-paths inside `MIGRATION.md ## 5.0.0` + generic rows; (c) full per-consumer story only in the relay
doc, MIGRATION stays generic.

**GOLDEN: (b)+(c) split by volatility.** MIGRATION.md carries the generic rows (the 203-row table, the
rename rows) PLUS a short **Constellation quick-paths** subsection — one block per consumer naming
symbols/tokens ONLY (stable). The relay (`asks-and-consumes.md`) carries the by-name asks with sibling
file:line (volatile — it goes stale with THEIR commits, and that is fine; it is a relay, not canon).

**Self-challenge:** quick-paths in a library MIGRATION smell like consumer coupling
(presets-in-consumers). Answer: the constellation is a closed set and the cut's primary audience IS these
repos; a quick-path is an INDEX into generic rows (each line cites the row it instantiates), never
consumer-specific behavior. Second challenge: speedtest's `/api` re-point may be MOOT — its one `/api`
site (`PhaseTimeline.vue:52`) is scheduled for retirement by its own R-CONSUME BorderProgress adopt. The
ask must say so (either/or), else we ask for dead work.

**Final form — the risk-ordered story (the §4.1/§4.3 content):**

| risk order | consumer | when it breaks | ask id(s) + exact content |
|---|---|---|---|
| 1 | **value.js (demo)** | at B2.1-swap LAND (file-link; before the tag) | `valuejs-demo-blob-rename` — re-point `demo/color-picker/App.vue:115` `@mkbabb/glass-ui/goo-blob` → `/blob` (`BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS` are key-preserved symbols; one line). Issue EARLY — at swap-land, not at tag |
| 2 | **atlas** | first re-install after publish (`>=4.2.0` auto-resolves) | `migrate-ring-to-focus-ring-color` (floor row 3; 12 bare/11 files: `base.css:64,71`, `tokens.css:1050`, `EasterEgg.vue:156`, `SelectionRegion.vue:156`, `VizOptions.vue:406`, `GeoChoropleth.vue:477`, `ReadoutDrill.vue:164`, `ScrollTimeline.vue:270`) — **WIDENED in place** to carry the `GlassPanel variant→tier` section (F6.1 break; the rename is VALUE-AGNOSTIC — every `variant=` value breaks, not just `floating`; the 5 LIVE element sites: `platform/charts/HoverCard.vue:288`, `platform/chrome/AuroraVeilStage.vue:75`, `platform/chrome/GalleryMasthead.vue:67` (ONE veil — the `:58`/`:165` lines are comments, not elements), `dashboards/vft-germination/features/taxonomy/TaxonomyApparatus.vue:58`, **`views/GalleryView.vue:224` `variant="resting"`**) + the SCOPED assurance: the `Card surface/tier` axis is PRESERVED — GalleryView's `<Card surface tier>` sites (`:286-287`) do NOT break, but its GlassPanel `:224` DOES |
| 3 | **speedtest** | on its bump (`^4.0.1` pins) | `migrate-api-to-timeline` (floor row 2) — re-point `PhaseTimeline.vue:52` `/api`→`/timeline` **OR retire the file with the BorderProgress adopt, whichever lands first**; + drop the dead `vite.config.mjs:1033` optimizeDeps string; + the R-CONSUME debtor bundle in the SAME ask: bump `^4.0.1→^5.0.0` (single hop), `<BorderProgress coverage :value>` onto `.results-card` retiring PhaseTimeline (`tokens.css:775 ASK-GU-BORDERPROGRESS HELD` + the local `--border-progress-thickness` deletes), `<CompletionSeal play>` on complete/personal-best (BC.W-SPEEDTEST-ADOPT), delete the `App.vue:601,677-679` instrument-dial interim (byte-equivalent at the shipped default) + any `?aurora=css`, re-pin peers `value ^0.13.0→^1.1.1+` / `kf ^4.3.0→^5.1.0`, `--ring` reads (`SurveyStep.vue:177,180`, `tokens.css:821`) → `--focus-ring-color` |
| 4 | **muster** | on its bump (`^3.1.0`) | `migrate-api-to-aurora` (floor row 1) — re-point `useAuroraConfig.ts:47` `/api`→`/aurora` (both symbols on `/aurora`); + the joint-4.x+5.0 path pointer (§4.3): read `## 4.0.0`→`## 4.x.0`→`## 5.0.0` in order |
| 5 | **bbnf-buddy** | on its bump (`^3.9.0`) | `bbnf-glass-blur-dock-retune-no-op` (floor row 4) — drop the dead `preset.css:230` `--glass-blur-dock` override (the retired token resolves to the composed default; witness = the MIGRATION retire ROW + the `>=4` covered floor, per ruling #3 — `proof:retired-token-consumers` is KILLED, never minted); + joint path + the ancient peer floors (`kf ^2.1.1`, `value ^0.10.0`) flagged in the quick-path |
| 6 | **keyframes.js (demo)** | on its bump (`~4.0.0`) | `kf-demo-bump-5` — optionalDep `~4.0.0→^5.0.0`; zero at-risk imports; + SHOWCASE rows (Q2) |
| 7 | **fourier-analysis** | on its bump (`^4.0.0`) | census row, no break ask — `^4.0.0→^5.0.0` quick-path + stale-peer re-pin note (`value ^0.13.0`, `kf ^4.3.0`) |
| 8 | **slides pair** | on its bump (`3.13.0` exact) | census row, no break ask — zero at-risk (all keys preserved incl. `/deck`); joint path; BG-WS5 owns the viz-subpath consumer note |
| 9 | **words** | never (vendored) | disposition NOTE: `frontend/glass-ui/` is the d6 fork (inv-11), imports are not consumption; the `^3.0.0` registry pin is dormant — no ask owed |

The **covered FLOOR stays exactly 4** (rows 1-4 of the gate: muster + speedtest `/api`, atlas `--ring`,
bbnf `--glass-blur-dock`) — a floor, not a ceiling; the widened atlas content and the added non-floor
rows (value.js demo, kf demo, census) do not move the gate.

### Q2 — the demo-showcase alignment (what the engine demos SHOULD read like at 5.0.0)

**Directions:** (a) glass-ui specs full demo redesigns for the siblings — overreach, fence-adjacent;
(b) break-fix asks only, showcase left implicit; (c) **SHOWCASE-class by-name asks** — short, concrete,
non-blocking, each tied to an existing hint in THEIR repo.

**GOLDEN: (c).** Each showcase ask names components + the reciprocity rationale + the deletion it
enables. Non-blocking: NOT on the covered floor, marked `SHOWCASE` in the relay, issued with the cut
asks but never gating anything.

**Self-challenge:** is this ask theater? Mitigation: every row anchors to a live sibling artifact —
kf's `demo/DESIGN.md:24-26` already states "well-aligned with glass-ui patterns" + the open
`tab-trigger-*` upstream hint; value.js's demo already composes Aurora/GooBlob. These are pulls, not
pushes. Second challenge: suggesting components risks presets-in-consumers inversion. Answer: the asks
suggest LIBRARY primitives by name; every hue/preset stays theirs.

**Final form — the SHOWCASE ask set (relay rows, THEIR repos' work):**

- **`valuejs-demo-showcase-5`** (value.js): (i) adopt `<EasingPicker>`/`<EasingConfigurator>` on any
  easing surface — the boundary-law flywheel at its purest (curve MATH = value.js, editor COMPONENT =
  glass-ui; the picker plots value.js's own `CSSCubicBezier`/`steppedEase` twins); value.js's
  `GradientPane` is already the named consumer #2 of `/easing`. (ii) adopt `<ColorSwatch>` for the color
  inputs (the picker app IS the color-input reference case). (iii) keep the picker→`deriveAurora`/
  `deriveBlobPalette`→`<Aurora>`/`<GooBlob>` pipeline the F9 downstream witness — name it in F9 fableArm
  evidence (glass-ui-side note, zero sibling work). All hues remain value.js's.
- **`kf-demo-showcase-5`** (keyframes.js): (i) re-home the `tab-trigger-*` variants onto
  `<SegmentedTabs>` (pill = the glass material, `--spring-snappy` indicator — the demo's tabs should
  ride the register built ON kf springs); IF a genuine variant gap survives the re-home, the upstream
  hint (`demo/DESIGN.md:26`) becomes a glass-ui successor-tabs fold-candidate (§7), never a demo-local
  fork. (ii) adopt `.glass-reveal`/`useLiquidReveal` on the demo's overlays — maximal reciprocity:
  kf's demo overlays open on the bloom that composes kf's own `ElementMorph` + `springTimingFunction`.
  (iii) consider `<DockStack>` on `ChromeDock`'s scene-switcher (the macOS-stack fan, box-inviolate).
- **speedtest showcase** = its R-CONSUME bundle (BorderProgress + CompletionSeal) — already a BREAK-class
  row; no separate showcase ask.
- **atlas showcase** = already the model consumer (`--glass-accent` data-hue seam via
  `useAuroraVeil.ts:109-110` + `Glyph.vue:96,205`; `/handmark` ×3) — NO ask; cite in F2/F4/F9 fableArm
  evidence as the downstream witness (glass-ui-side notes only).

### Q3 — the green-handshake choreography at the cut

**Directions:** (a) big-bang — publish, blast all asks, hope; (b) **staged ripple, risk-ordered, with
the unprotected pair pre-notified**; (c) synchronized flag-day (cut blocks on consumer pre-acks).

**GOLDEN: (b).** (c) couples the irreversible tag to 8 repos' schedules — rejected. (a) ignores that two
consumers break BEFORE any bump choice (value.js at swap-land, atlas at re-install).

**Self-challenge:** does early ask-issuance (pre-tag) violate "asks issue at the cut after B2.2"? No —
the PLAN's timing binds the ROSTER finalization; the value.js demo row is explicitly EARLY-class because
the file-link makes the break land-coupled, not publish-coupled. Record the exception in the relay.

**Final form — the choreography (the §4.4 checklist's spine):**

1. **T-0 (post-WS12):** B2.1-swap + B2.2 land — the export surface is FINAL. The 203-row map re-derives
   against the landed dist (rises above 203 with `/siri-island`; WS5 viz deltas fold in). **Issue
   `valuejs-demo-blob-rename` NOW** (file-link break is live).
2. **T-1:** B4e authors MIGRATION `## 5.0.0` + CHANGELOG (from the final surface, never the 4.2.0
   snapshot); B7 finalizes the roster; `proof:crossrepo-asks:bh` GREEN.
3. **T-2 (19.1):** `--run ship` FULL union, siblings-absent (fresh `/tmp` worktree — NEVER touching
   `~/Programming`; `verify-siblings-intact.mjs` before AND after), real-Safari webkit pass,
   `RATCHET_BASELINES == {}`, worktree-gc under threshold → **HUMAN GATE** → tag `v5.0.0` →
   `release.yml` provenance publish.
4. **T-3 (post-publish):** the remaining asks ISSUE — atlas first (unprotected), then speedtest/kf-demo/
   fourier-analysis, then the pre-4.0 four at leisure. Each relay row gains `issuedAt`.
5. **The consume-and-delete cadence:** each sibling bump deletes its named interims in the SAME commit
   (speedtest: instrument-dial local + `?aurora=css` + PhaseTimeline + stale peers; bbnf: the
   `--glass-blur-dock` override; atlas: the `--ring` reads; muster/value.js: the `/api`//`goo-blob`
   re-points). The handshake FLIPS the relay row to `CONSUMED` with the sibling's landing commit
   recorded — content-only (glass-ui reads the sibling as response authority, edits nothing).

---

## §4 · Wave binding (perfected per-wave specs; frozen ids, preconds untouched)

All four are [H]-class doc/structure waves — **(19.1 is [P] in the plan but THIS spec owns only its
consumer-facing half, which is H-natured): NO Fable arm, NO DesignSync surface — saying so explicitly
per the no-theater rule.** One carve-out: B6+B7 carries a single non-doc deliverable — it MINTS the
`proof:crossrepo-asks:bh` gate (a `scripts/` add + a `:bh` npm arm; §4.1), which does not exist on disk
at HEAD. The foreign-tree fence is restated inside every ask (each relay row carries
the literal line "THEIR edit; glass-ui edits zero sibling files").

### 4.1 `BH.B6+B7-asks` [H] — prompts + the cross-repo ask roster

- **Deliverables:** (1) `docs/tranches/BH/coordination/asks-and-consumes.md` FINALIZED: the 4-row
  covered floor (muster `/aurora` · speedtest `/timeline` · atlas `--ring` · bbnf `--glass-blur-dock`)
  with the §3.Q1 sharpened contents — the atlas row WIDENED in place to carry `GlassPanel variant→tier`
  (the 5 LIVE element sites per §3.Q1 row 2 — value-agnostic, `views/GalleryView.vue:224` included);
  the speedtest row carrying the either/or (`re-point OR retire-with-the-adopt`) + the full
  R-CONSUME bundle; (2) **the row-4 witness RE-BASE fix** — the doc still cites the KILLED
  `proof:retired-token-consumers` as row 4's witness; per ruling #3 + row 0.7 that gate is NEVER minted:
  re-write the witness to "MIGRATION.md `--glass-blur-dock` retire ROW + the `>=4` covered floor" (a
  glass-ui doc edit, in-fence); (3) the ADDED non-floor rows: `valuejs-demo-blob-rename` (EARLY-class),
  `kf-demo-bump-5`, the two SHOWCASE rows (§3.Q2), the census rows (fourier-analysis, slides), the
  words disposition note; (4) the DISCHARGED ledger row: kf `Draggable.snap` — requested, LANDED
  (`draggable.ts:87`), consumed at BH.B1-W3 (`ba23c086`) — record satisfied; (5) the `W5-viz-disposition`
  clause (NOT `W4`) per the frozen row; (6) B6 prompts: landed (`a9f87453`, row 1.12) — this wave only
  records the dogfood evidence from the B2/B3/B5 dispatches.
- **Gate arms:** `proof:crossrepo-asks:bh` GREEN — the SOURCE-DOC AUTO-SCAN (`>=3` scan-floor, `>=4`
  covered-floor; fail-LOUD on source-doc drift), **MINTED by THIS wave** (not on disk at HEAD — a
  `scripts/` add + a `:bh` npm arm; NOT the BB-scoped `proof:crossrepo-asks`, which is vacuous for BH
  and stays untouched) + `proof:build` (the tree builds green with the doc set in place).
- **Fable/DS:** — (H wave; doc + the one `:bh` gate-mint, no Fable/DS surface). **Preconds:**
  `[C]/[WS12]` per the frozen row — the roster finalizes post-WS12 against the landed export diff.
- **Fence per ask:** every row is a by-name ask; the sibling owns its edit; zero sibling writes.

### 4.2 `BH.B2-export-reshape` [H] — the consumer side of the reshape

(The mechanism side — glob-swap, `src/subpaths/` delete, dts emit — is BH PLAN §4-B2.1's; THIS spec
binds the consumer-facing content.)

- **Deliverables:** (1) the 203-row `/api` map RE-DERIVED post-WS12 via `regen-api-migration.mjs`
  against the landed surface (rises above 203: WS6 `/siri-island` published; siri-waveform INTERNAL —
  no subpaths line; WS5 viz deletes/renames fold via the generator, never the 4.2.0 snapshot); (2) the
  3 orphan re-homes as EXPORT ADDS (`Surface`→/card, `MenuItemVariants`→/command, `ControlSize`→/forms)
  + the stale-prose fixes (`search/index.ts:5`, `api/index.ts:500`) — and, riding the same stale-prose
  clause, the **`oklchSpectrum` honesty fix**: `border-progress/README.md:37` attributes the CONSUME
  discharge to a value.js `oklchSpectrum` helper that has NEVER existed (grep value.js 1.2.0 src = 0);
  re-word to "composed from `interpolateHue('shorter')` + `/color` primitives"; (3) **the SOLE
  peer-floor writer:** kf `^5.0.0→^5.1.0` (the `Draggable.snap` pairing-debt), value.js
  `^1.0.0→^1.1.1` — **NEVER `^1.2.0`** (the floor admits 1.2.0 at resolve; the gate-LITERAL reconcile
  is BG-owned at 12.5 — do not re-litigate the T4/T2 seam); closes the WS7→WS12 `proof:peer-conformance`
  born-RED window (EXPECTED mid-window RED, by design); (4) the `goo-blob→blob` rename LINE riding the
  regen (never a hand-listed key; emits `dist/blob.js`) + its ONE MIGRATION row + the paired
  `valuejs-demo-blob-rename` EARLY ask (§3.Q3 step 1 — the only live consumer of the old path is
  value.js's demo `App.vue:115`; speedtest/atlas have zero `goo-blob` imports).
- **Gate arms:** `verify-export-types` post-build GREEN · the 203-row map arm on `public-surface.spec`
  GREEN · `proof:subpath-enumeration` re-pinned (incl. `blob`) · `diff -r dist/styles` EMPTY ·
  `proof:build` · the net-indirection LOC measure DROPS (the frozen row's note).
- **Fable/DS:** — (H wave). **Preconds:** `[WS12]` — full BG close; the FINAL `package.json` writer
  between WS9 and the cut.
- **Fence:** the value.js/kf floors are OUR `package.json`; the sibling re-pins (speedtest's stale
  `^0.13.0`/`^4.3.0`) are THEIR edits, carried as ask content only.

### 4.3 `BH.B4e-cut-authoring` [H] — MIGRATION 5.0.0 + CHANGELOG (the cut's PRIMARY consumer surface)

- **Deliverables — the exact MIGRATION shape:**
  1. Retitle `MIGRATION.md:1` `# MIGRATION—v0.9.x → v1.0 → v2.0` → `# MIGRATION` (version-agnostic).
  2. Author `## 5.0.0` with this section outline (in order):
     **(a) The break, exactly** — one paragraph: ONE dropped key (`./api`) + 203-symbol re-home
     (200 pure path-swaps, 3 orphan-adds) + 3 renames (`--ring→--focus-ring-color`, `goo-blob→blob`,
     `--glass-blur-dock` retire) + key-preserving notes (flat-barrel relocations, `src/subpaths/`
     delete — no consumer action).
     **(b) The `/api` re-home TABLE** — the 203-row (post-WS12 count) GENERATED markdown table, columns
     `symbol | kind (type/const) | new subpath | note (pure-swap / orphan-add)`; the table is the INPUT
     CONTRACT for `public-surface.spec`'s map arm (the `dependencies.md` table-form lesson) — generated
     by `regen-api-migration.mjs`, never hand-authored.
     **(c) Rename rows** — `--ring → --focus-ring-color` (pinned landing COMMIT + the fallback-first
     interim form `var(--focus-ring-color, var(--ring))` for consumers straddling); `goo-blob → blob`
     (subpath + component; symbols key-preserved); `--glass-blur-dock` RETIRED (resolves to the composed
     default; the bbnf witness row per ruling #3).
     **(d) Constellation quick-paths** — the §3.Q1 table, symbols/tokens only (file:line stays in the
     relay): one block each for atlas · speedtest · muster · bbnf-buddy · kf-demo · value.js-demo ·
     fourier-analysis · slides, each line citing the generic row it instantiates; words = the
     disposition note. The pre-4.0 four get the explicit ordered path: `## 4.0.0` → each `## 4.x.0` →
     `## 5.0.0`.
     **(e) The CONSUME-contract honesty note** — the border-progress spectrum walk is "composed from
     `interpolateHue` + `/color` primitives" (the `oklchSpectrum` fiction corrected here too; the README
     fix itself rides 4.2's stale-prose clause).
  3. Collapse the accreted 4.x blockquotes into proper `## 4.x.0` sections (clean break, not another
     append) — the BH-PLAN "16" is a carried literal a disk grep does NOT confirm (~10 blockquote-bold
     lines at HEAD, fuzzy across multi-line quotes): B4e RE-DERIVES the exact collapse-target count
     against the landed MIGRATION.md (the KS-B stale-literal lesson), never carries "16" —
     **load-bearing for the pre-4.0-floored four** (§0): their joint-4.x+5.0 hop reads these
     sections as the path.
  4. CHANGELOG: author `## 5.0.0` (export reshape · `--ring` rename · BG visual-convergence paragraph ·
     the lucide payload fix `7813a695` · the value de-straddle) AND delete the stale `## Unreleased`
     (`CHANGELOG.md:212`, mis-ordered) in the same pass; the archive split for the 267KB/163KB/97KB
     doc-slim; `proof:ay/az/ba-final` CHANGELOG targets follow the split.
- **Gate arms (the device-free witness):** MIGRATION has `## 5.0.0` + the ≥203-row table + a
  `--focus-ring-color` row + a `--glass-blur-dock` retire row + a title NOT saying `v2.0`; CHANGELOG has
  EXACTLY ONE `## 5.0.0` and ZERO `## Unreleased`; a one-paragraph append FAILS. + `proof:build`. Dual-doc
  coordination: `proof:on-glass-fg`+`proof:surface-axis` read BOTH CLAUDE.md AND MIGRATION.md — sequence
  the parse-target moves WITH B5c.
- **Fable/DS:** — (H wave; mechanical doc-authoring, per the PLAN's own note). **Preconds:** `[WS12]`.

### 4.4 `19.1 BG.W-CUT` — the consumer-facing half (checklist; the build/paint half is F8's own)

- **Pre-tag checklist (consumer-facing):** (1) B2-export-reshape + B4e + B6+B7 landed (the three
  preconds above); (2) the §3.Q3 T-0/T-1 steps done — value.js EARLY ask issued, roster GREEN;
  (3) **the dock-density WATCH resolved** (§7 note 1 — `density="audacious"/"spacious"` at speedtest
  `Dock.vue:258`/`SurveyResultDock.vue:42` vs F6.2's size-unify; atlas is SAFE — `comfortable` only +
  component-only `/dock` imports; the cut must not fire with the disposition open, else speedtest
  breaks silently and un-rostered); (4) mechanical
  CONSUMEs asserted-TRUE (peer floors landed at export-reshape, NOT re-written here — the frozen row's
  own words); (5) the siblings-absent emulation via a FRESH `/tmp` worktree ONLY +
  `verify-siblings-intact.mjs` before/after (the ABSOLUTE sibling-safety law).
- **Post-tag:** the §3.Q3 T-3/T-4 issuance + the consume-and-delete handshake stamping; the relay's
  freshness header re-verified.
- **Gate arms:** the frozen row's own (`--run ship` FULL union siblings-absent · real-Safari ·
  `RATCHET_BASELINES == {}` · worktree-gc) + `proof:crossrepo-asks:bh` still GREEN at tag time.
- **Fable/DS:** — for THIS half (the paint half rides the F8 close, owned elsewhere). **HALTS at the
  human gate** (frozen).

---

## §5 · Precepts conformance

| Check | Status |
|---|---|
| Foreign-tree fence (inv-26) | restated per ask; zero sibling writes anywhere in this spec; siblings-absent = `/tmp` worktree only |
| Clean breaks, no aliases | `--ring`, `goo-blob→blob`, `/api` drop, `--glass-blur-dock` — all alias-free; the ONE sanctioned interim is the consumer-side fallback-first `var(--focus-ring-color, var(--ring))` straddle form, recorded as THEIRS |
| Presets-in-consumers | showcase asks name library primitives only; every hue/preset stays sibling-owned; `--phase-complete-color` stays a speedtest-side set |
| ≥2-consumer bar | fed by the constellation evidence (atlas = `--glass-accent`/handmark witness; value.js = `/easing` consumer #2; speedtest = BorderProgress/chassis witness) — cited into fableArm evidence, not re-derived |
| Overhead floor / no new waves | zero new waves; all content lands inside the four frozen ids; wants → §7 |
| Gates as family arms | `proof:crossrepo-asks:bh` is the ONE roster gate (auto-scan, not hand-count; MINTED at B6+B7 — §4.1); the killed `proof:retired-token-consumers` stays dead (ruling #3) |
| No Fable-arm theater | all four waves declared H-natured, no Fable/DS arms |
| Protected set | untouched — no re-plumb of any §4 item; DOCK_SPRING/4.10 not in this lane's blast radius |

## §6 · The gestalt bar (the acceptance language)

The constellation hallmark PASSES when: **no consumer can be surprised** — every break that can fire has
a named ask with exact content BEFORE it fires (the unprotected pair pre-notified); **the migration is a
story, not a diff** — a pre-4.0 consumer can walk `## 4.0.0`→`## 5.0.0` start-to-finish without reading
glass-ui source; **the flywheel is visible** — the engine demos read as glass-ui showcases composing the
registers built on their own engines; **the ledger is honest** — discharged asks say discharged, fictions
(oklchSpectrum) are corrected, the killed gate stays killed; **the fence held** — zero sibling mutations,
verifiable by `verify-siblings-intact.mjs` and the siblings' own clean status.

## §7 · Fold-candidate notes + open questions (for the orchestrator — never self-inserted)

1. **[OPEN — pre-cut blocker-class] dock-density disposition vs F6.2 W-SIZE-UNIFY.** `audacious`/
   `spacious` are live dock rungs (`density.css:8-9,270`) consumed by **speedtest ×2 ONLY**
   (`src/components/Dock.vue:258` audacious · `src/components/survey/SurveyResultDock.vue:42` spacious).
   atlas is NOT a density-fold victim: its one GlassDock density is `comfortable`
   (`platform/chrome/Dock.vue:102`, the preserved middle rung — safe under any collapse), and its
   `/dock` imports are COMPONENT-only (DockIconButton/Separator/etc., no at-risk rung). A 3-rung `Size`
   cannot map the 4-rung dock density. RECOMMEND: dock density EXEMPT (its own `--dock-scale`
   scale-thread grammar), recorded as an F6.1/F6.2 clause — on speedtest's evidence alone. Must resolve
   BEFORE 19.1 (§4.4 checklist item 3).
2. **[FOLD-CANDIDATE] kf `tab-trigger-*` upstream hint** (`keyframes.js/demo/DESIGN.md:26`) — IF the
   SegmentedTabs re-home (§3.Q2) leaves a genuine variant gap, a successor-tranche tabs clause absorbs
   it; not a BG row.
3. **[CONTENT-SHARPEN, in-wave] atlas ask widened** to `--ring` + `GlassPanel variant→tier` in ONE row
   (§4.1) — the covered floor stays 4; flag to F6.1 that atlas is its largest external break.
4. **[CONTENT-SHARPEN, in-wave] the `/axes` alternative** — once F6.1's generated types-only `/axes`
   subpath ships, the speedtest `/timeline` ask may offer `/axes` as the runtime-free type-graph
   alternative (its stated reason for choosing `/api`); `/timeline` remains the verified default
   (`import type` erases either way).
5. **[DOC-TRUTH, rides 4.2] the `oklchSpectrum` fiction** in `border-progress/README.md:37` — corrected
   via B2.2's stale-prose clause + B4e's CONSUME note.
6. **[DISPOSITION NOTE] words** — vendored d6 fork + dormant `^3.0.0` registry pin; inv-11 lineage note
   in the relay, no ask.

---

*Spec complete. Zero sibling mutations; zero src edits; the wave set untouched. — KS-C CONSTELLATION (Fable).*

---

## REVISION (2026-07-01 — post-critique, all 4 must-fixes applied; disk re-verified read-only)

1. **[MAJOR] atlas GlassPanel roster re-cited to the 5 LIVE element lines** (§3.Q1 row 2, §4.1): the 4
   comment-line citations replaced with the real elements (`platform/charts/HoverCard.vue:288`,
   `platform/chrome/AuroraVeilStage.vue:75`, `platform/chrome/GalleryMasthead.vue:67`,
   `dashboards/…/TaxonomyApparatus.vue:58`), the GalleryMasthead `:58/:165` double-count collapsed to
   the one `:67` veil, the MISSED live break `views/GalleryView.vue:224` `variant="resting"` ADDED, the
   false "GalleryView sites do NOT break" assurance deleted (scoped to the `<Card surface tier>`
   `:286-287` sites; the GlassPanel `:224` DOES break), and the rename stated value-agnostic.
2. **[MAJOR] dock-density blocker re-scoped to speedtest ×2** (§4.4 item 3, §7 note 1): atlas recorded
   SAFE (`density="comfortable"` at `platform/chrome/Dock.vue:102`; `/dock` imports component-only) —
   the "two repos break"/"atlas /dock ×5" co-victim framing dropped; the EXEMPT recommendation stands on
   speedtest's evidence alone.
3. **[MINOR] `proof:crossrepo-asks:bh` stated as MINTED by B6+B7** (§2, §4 opener, §4.1 gate arms +
   Fable/DS line, §5): the gate does not exist on disk at HEAD — a `scripts/` add + a `:bh` npm arm,
   the one non-doc deliverable; the "[H] doc-only" framing softened accordingly.
4. **[MINOR] the "16 blockquotes" literal dropped** (§4.3 deliverable 3): B4e re-derives the exact
   collapse-target count against the landed MIGRATION.md (~10 by disk grep at HEAD; the KS-B
   stale-literal lesson).

All revision claims re-verified against the sibling trees read-only 2026-07-01 (atlas element lines,
GalleryView `:224`/`:286-287`, atlas `Dock.vue:102` comfortable, speedtest `Dock.vue:258` +
`SurveyResultDock.vue:42`). Greenfield loop, choreography, and honesty-ledger content unchanged.
— KS-C CONSTELLATION (Fable, rev 2).
