# BJ Band — the doc-truth sweep (registry family J)

**verified-model: claude-fable-5** (read verbatim from this seat's system context; this run,
2026-07-18). **UNION provenance:** REFABLE RU-03 redo — the opus-begat draft rewritten in place
per the THRICE protocol (ANEW → SCRUTINY → UNION). Fresh evidence authoritative; every retained
opus row re-proven at HEAD `485891a2`; verdict sidecar at
`../formation/refable/REFABLE-RU-03-DOC-TRUTH.md`.

**Status:** UNION (supersedes the 2026-07-17 opus draft; the two-challenge amendments FINDING-1
and FINDING-4 are carried forward intact)
**Registry family:** J (doc-truth sweep) · REGISTRY.md:178-186
**Verdict (lead):** "prose drifted from landed reality in named places; one truth-up wave
clears it."
**Mode:** TRANCHE DEVELOPMENT. The wave edits prose and code-comments only — no runtime/paint
surface is touched (the byte-diff guard below). The enumerated target list IS the spec: every
row is `file:line → the false statement → the corrected statement`, verified live at HEAD
`485891a2` (v7.0.0 tagged and published; the draft's "untagged v6.0.0-61" header was stale).

One wave (Wave 2 ceded):

- **BJ.W-DOC-TRUTHUP** — the enumerated truth-up sweep: a SWEEP-NOW roster (unconditional,
  lands as one tight commit series grouped by class) + a TRIGGERED roster (seven
  conditional/coupled targets that land with their triggering waves).

**Wave 2 (`BJ.W-IDIOMS-COLOCATION-REWRITE`) is CEDED to `BAND-COLOCATION`** (adjudicated,
CHALLENGE-1-MECH FINDING-1; ratified by this redo). The `design-idioms.md` §3 home-map + §7
doctrine rewrite lands co-located with the `_shared/` carve moves — single owner
`BAND-COLOCATION` Wave 1 Precept F. Family J touches no `design-idioms.md` line.

**File-ownership split:** `design-idioms.md` §3/§7 → COLOCATION W1 Precept F exclusively.
`docs/precepts/**` is a SUBMODULE (gitlink at b0f6134) — **never edited from this repo**; every
dual-home target edits the canonical `docs/design/` copy only and the divergence rides the
RF-2 route-6 submodule outbound. Family J does not construct the Q060 sibling outbound (family
B); it truth-ups the false in-repo statements only.

---

## BJ.W-DOC-TRUTHUP — the enumerated truth-up sweep

### Mission

Correct every stale-prose / stale-comment site where the text contradicts landed disk reality,
as enumerated by the corrected formation corpus (the REFABLE sidecars RF-2/RF-4/RU-07/RU-11/
RU-12/RU-13/RU-17a/RU-17b/RU-21/RU-23/RU-24/RU-27/RU-33 + this redo's own finds). The list is
closed AS OF the RU-03 union; the two-critic challenge pass (A08/J11) may extend it with
pinned evidence, never silently.

### SWEEP-NOW roster

Class A — spring/motion constant mirrors:

| # | file:line | the false statement (live at HEAD) | the corrected statement | source of truth | provenance |
| --- | --- | --- | --- | --- | --- |
| T1 | `src/styles/tokens/scheme-spring.css:31` | dock mirror row `(0.68s, ζ=0.64) — the WEIGHTY iOS-27 gooey morph (collapse/expand + V↔H + fission), slow inertial mass` | `dock: (0.30s, ζ=0.82) — a brisk liquid morph for the dock and its coordinated contents`; drop the retired "V↔H + fission" facilities from the row | `springPresets.ts:95-99` (0.3 / 0.82 / "brisk liquid morph"); settle clock `--spring-dock-settle: 0.19s` (:143) | RATIFIED (draft T1); RU-17a r1 · RU-27 K4 · RU-33 FN4 concur |
| T2 | `src/styles/tokens/scheme-spring.css:27-32` | the mirror lists 6 rows; the emitted `transient` register (:101, :145, :152) is absent | add `transient: (0.62s, ζ=0.90) — a centered materialize bloom for brief surfaces such as Toast` | `springPresets.ts:109-113` | RATIFIED (draft T2) |
| T9 | `docs/design/tunable-anim.md:60-65` | the spring table is stale in ALL SIX rows: smooth `0.5, 0.86` · snappy `0.42, 0.78` · bouncy `0.5, 0.55` · gentle `0.7, 1.0` · dock `0.68, 0.64 (BD.W-ANIM-IOS27-TUNE …)` · press `0.15, 0.86`; row 77 claims `--spring-dock-duration 0.66s` | on-disk truth: smooth (0.58, 0.80) · snappy (0.48, 0.74) · bouncy (0.60, 0.60) · gentle (0.82, 1.00) · dock (0.30, 0.82) · press (0.20, 0.80); duration = the `--spring-dock-settle: 0.19s` × `--motion-tempo` chain; drop the BD wave-id token | `springPresets.ts:66-113`; `scheme-spring.css:143-152` | FABLE-NEW (full-table extension of RF-2 F2 [dock] + RU-33 r6 [smooth/press]; snappy/bouncy/gentle found this seat) |
| T5 | `docs/design/tunable-anim.md:121` | `reveal blur ǀ --glass-reveal-blur ǀ 4px ǀ [0,8px]` — a single 4px default | the per-register model: overlay 6px / menu 2px / tooltip 0px / transient 8px (`--enter-*-blur`), range [0,8px]; the 4px in `animations.css:167` is a defensive fallback, not a default | `src/styles/tokens/motion-registers.css:57/64/71/80` via `src/styles/glass/reveal.css:62-126` | RATIFIED substance; **OPUS-WRONG target path corrected** — the draft aimed at `docs/precepts/tunable-anim.md` (a submodule; unwritable from this repo). The precepts copy carries the same stale row; it rides the RF-2 route-6 outbound |
| T10 | `docs/canon/motion-system.md:16` | `--spring-smooth` "(ζ=0.86)" | ζ=0.80 (0.86 is `useSpring`'s bare default — a different primitive; name the distinction) | `springPresets.ts:67-69`; scheme-spring.css:27 | FABLE-NEW (RU-33 r6) |
| T11 | `docs/design/motion-canon.md:204, 262, 264` | `DRAWER_SNAP (0.5, 0.74)`; cites `proof-no-layout-animation.mjs` + `proof-animation-coherence.mjs` as live gates | `(0.32, 0.8)`; drop the two dead proof-script references (neither exists under `scripts/`; the battery was abrogated) | `drawer/constants.ts:11`; `ls scripts/` | FABLE-NEW (RF-2 F3/F4) |

Class B — the dock comment web (RU-27 R3 + RU-12 RT14, all re-proven this seat):

| # | file:line | the false statement (live at HEAD) | the corrected statement | source of truth | provenance |
| --- | --- | --- | --- | --- | --- |
| T12 | `src/components/dock/styles/shell.css:118-146` vs `:157-166` | a three-generation containment palimpsest: the upper block argues paint containment is retained directly above the block declaring `contain: layout style` (NO paint); `:163-164` carries a mangled sentence ("When retires `--dock-morph-t`," — subject lost) | collapse to ONE truthful block describing the shipped state: `contain: layout style`, no paint clip, the aperture-deletion record | `shell.css:166` declaration | FABLE-NEW (RU-27 N2/R3) |
| T13 | `src/components/dock/composables/useDockSearch.ts:115` | `armSearch` JSDoc "(composes `onClickCollapsed` + `keepOpen`)" | "(composes `expand()` + `keepOpen()`)" — the H5 reroute landed at :247-256 of the same file | `useDockSearch.ts:247-256` | FABLE-NEW (RU-27 N1/R3) |
| T14 | `src/components/dock/composables/useDockShellProps.ts:117` | `collapseDelay` JSDoc "default 2000" | default 3600 | same file `:219` (`?? 3600`); `useDockState.ts:92` | FABLE-NEW (RU-27 salvage RT2; re-proven this seat) |
| T15 | `src/composables/motion/core/index.ts:49` + `src/styles/tokens/scheme-motion.css:131-135` | both cite `useDockOrientationMorph` as a live consumer (it is definition-absent — comment mentions only, in 4 files) | truth the consumer evidence to the live set (tabs-indicator squish et al.); the dock/ mentions ride the REDUCTION/GF-DOCK knob decision | `grep -rln useDockOrientationMorph src/` = comment sites only, no definition | FABLE-NEW (RU-27 R3) |
| T16 | `src/components/dock/styles/index.css:110-114` | the `@property --dock-t` comment claims un-inherited registration "scopes the per-frame restyle to the single plate element" and "SPRING-UNIFY makes it the sole driver + deletes the scalar zoo" (future-tense about a landed wave; the shipped mechanism is the alias + root `--dock-morph-t` writes) | state shipped truth only: per-frame writes land on the root `--dock-morph-t` (inherits: true); the plate ALIASES `--dock-t` (dock.css:89); the sole-driver re-point is GF-DOCK's open decision | RU-27 S2/A4 (re-proven); `dock.css:89` | FABLE-NEW (RU-27 R3) |
| T18 | `src/components/dock/styles/overflow.css:65-66` | "`overflow-x: auto` spec-forces the computed cross axis to a clip" | the computed coercion is visible→**auto**, not clip (the padded ring-room rationale survives; the mechanism claim is corrected) | Δ-F27-1 (DOSSIER-F11-F20 item 6, disk-re-proven); CSS Overflow §computed-value coercion | FABLE-NEW (dossier routing item; RU14-CRIT2-A re-proved live) |
| T19 | `src/components/dock/index.ts:84` | "The words `SearchBar` + its 7 search composables retire onto this register" | SearchBar KEEPS — value.js consumes it live ×3 (BrowsePane:195, PalettesPane:149, AdminPane); only `FuzzySearch.vue` (demo-story-only) deletes; reword to the split truth | RU-12 A14 import greps; FABLE-DAG-REDUCTION :236-238/:449-452 concur | FABLE-NEW (RU-12 RT14) |

Class C — procedural/booked residue (the lowercase-booked class, RU-17a L1-N4):

| # | file:line | the false statement (live at HEAD) | the corrected statement | source of truth | provenance |
| --- | --- | --- | --- | --- | --- |
| T4 | `src/components/aurora/composables/uniformBridge.ts:76-79` | "The WGSL primary renders the smooth core for every painterly id (1-7) — a kuwahara config on WebGPU degrades to the smooth core … (the booked successor ports the painterly bodies)" | the WGSL primary ports real bodies for pastel(1)/watercolor(2)/crayon(4)/metal(8/9) and routes oil(3)/vangogh(5)/oil-pastel(6)/kuwahara(7) to `mediumKuwahara` — a real painterly read, NEVER a silent smooth degrade; the booking language dies (the port landed). **FORWARD NOTE (RU-07 RT3): this truth-NOW text re-stales as GF-AURORA W1/W2/W4 land real bodies — those waves own the re-truth at each landing** | `aurora-mediums.wgsl.ts:380-402` (`applyMedium`); `aurora.wgsl.ts:13-17` header | RATIFIED (draft T4) + the RU-07 forward-note amendment |
| T20 | `src/styles/tokens/glass.css:287` | "wiring the resting sheet plate onto this 0.74 register is a booked BE follow" — a live standing book with NO owner (BE dissolved; zero PLAN/ASK/band carrier) | strike the sentence, or rewrite to the owner the lead's chronic-enrollment ruling assigns (RU-17a r3). Default at execution: strike | RU-17a L1-N4 (re-proven live this seat) | FABLE-NEW |
| T21 | `src/composables/glass/webgl/shaders/flow.wgsl.ts:3-5` + `flow.glsl.ts:31-33` | flow.wgsl books "paper-grid is the FIRST WGSL curl consumer" and cites `research/viz/paper-grid.md` (path ABSENT; paper-grid deleted at BI.W-VIZ-DELETIONS); flow.glsl books consumers "#2/#3 … B5 paper-grid-breathe + the flow-field viz" (dead/never-landed) | truth both headers to the live consumer set (aurora `warpMode:"curl"` is the real consumer; `docs/consumer-evidence/curl-fbm.md` refreshed to match) | `find src demo -iname "*paper-grid*"` = 0 components; `research/viz/paper-grid.md` ABSENT | FABLE-NEW (this seat — two members of the booked class beyond the RU-17a census) |

Class D — canon/root docs:

| # | file:line | the false statement (live at HEAD) | the corrected statement | source of truth | provenance |
| --- | --- | --- | --- | --- | --- |
| T22 | `docs/canon/glass-system.md:80-83` | surface axis "minted once (`surface-axis.css` + `_shared/useSurfaceAxis.ts`)"; carrier list names GlassPanel + Sheet | the live mechanism is `_shared/resolveSurfaceClass.ts`; GlassPanel retired (BI.W-GLASS-DEDUP), Sheet folded (BI.W-DIALOG-PLACEMENT) — drop both from the carrier list | grep: no `useSurfaceAxis` in src/ | FABLE-NEW (RF-2 F5) |
| T23 | `docs/canon/dependencies.md` + `deps-currency.md` | both peer tables list 10 peers — the bare `embla-carousel ^8.0` row is missing; `dependencies.md:28` prose still names Sheet | add the bare `embla-carousel` row (11 peers, matching package.json:545); drop the Sheet mention | `package.json:545-546` | FABLE-NEW (RF-2 F6) |
| T24 | `CONTRIBUTING.md:29, 39-48` | describes `npm run proof:all` + a changesets release flow (`.changeset/config.json`, `npx changeset`, Version Packages PR) | the real flow: no changesets (`.changeset/` absent, no devDep), no proof:all; releases ride the v* tag-push → release.yml gated provenance publish | `ls .changeset` = absent; `package.json` scripts | FABLE-NEW (RF-2 F7) |
| T25 | `README.md:72` + `scripts/lib/canon-doc.mjs:40` | structure.md called "the generated … machine-truth source; never hand-maintained" / "GENERATED" | no generator exists in `scripts/`; drop the GENERATED claim (or an infra row restores a generator — default: truth the claim) | `ls scripts/` | FABLE-NEW (RF-2 F8) |
| T26 | `scripts/lib/subpath-policy.mjs:49/62/68/70/99/104` | class-count comments "PUBLISH (23) / INTERNAL (17) / INTERNAL (2) / PUBLISH (33) / PUBLISH (3) / INTERNAL (2)" | re-derive programmatically at edit time (HEAD totals: 52 PUBLISH / 14 INTERNAL vs the comments' 59/21; RF-2's per-group recount: 21/31/13/1) | node recount this seat; RF-2 F9 | FABLE-NEW (RF-2 F9); **SOLE OWNER — `BAND-GATES` W1's stale-comment row cedes its subpath-policy member here (APOTHEOSIS MECH-01)** |
| T27 | `DESIGN.md:1144, 1323` (+ the RF-2 F13 sweep set) | present-tense claims about deleted demo files ("lives at `demo/stories/compositions/dock-with-slider.vue`"; `primitives/configurator.vue` as a live consumer) | past-tense/retire framing; both paths verified ABSENT | `ls` both paths = absent | FABLE-NEW (RF-2 F13) |
| T28 | `docs/design/affordance-map.md:79-81, 89` | style-home column cites `dock-controls/{icon-button,triggers,dark-mode-toggle}.css` + `toggle/index.ts` | live paths: `dock/styles/controls/{icon-button,tab-button,touch-floor,triggers}.css`; `dark-mode-toggle/dark-mode-toggle.css`; no `toggle/` family — switch/toggle-group | `ls src/components/dock/styles/controls/`; `find` | FABLE-NEW (RF-2 F14; precepts copy rides the route-6 outbound) |
| T29 | `src/composables/motion/scroll/useScrollScene.ts:11` | "resolve to `undefined` at the installed `@mkbabb/keyframes.js@4.3.0`" | installed is `^6.0.0`; re-verify the WHY clause against 6.0.0 while editing (the lazy-chunk rationale may hold — cite the current version either way) | `package.json:541` | FABLE-NEW (RU-21 N2 — "target 8") |
| T30 | `MIGRATION.md:148` | "The 7.0 package line **requires** `@mkbabb/value.js@^4.0.0`" while `peerDependenciesMeta` marks it optional | move the word (doc-side: "optional peer; required for /color //css consumers") — the flag-flip half is OUT of this band (publish lane); README §peers already states it correctly | `package.json:568-570` | FABLE-NEW (RU-21 R7) |
| T33 | `src/components/timeline/README.md:14-21` | §Exports documents `ContinuousTimeline`/`ContinuousRail`/`ContinuousMarkers`/`ScrubberTimeline`/`SegmentedTimeline` as exports | `index.ts` exports `GlassTimeline` + types ONLY; truth the section now — REDUCTION W5's stub supersedes on arrival | `timeline/index.ts:1-2` | FABLE-NEW (RU-13-F11-F20 routing; RU14-CRIT1/2 concur it was un-routed) |

Class E — tranche/coordination records (house style per OPEN-7: dated `[CORRECTION …]` markers
on shipped/dated records; in-place on working rosters):

| # | file:line | the false statement (live at HEAD) | the corrected statement | source of truth | provenance |
| --- | --- | --- | --- | --- | --- |
| T3 | `src/components/dialog/placement.css:93` | "(name-locked jointly with BI.W-ENGAGE-AFFORD)" — the lone post-scrub `BI.W-` token in src/ (grep re-proven: exactly 1 hit) | drop the wave-id token; keep the name-lock rationale | greenfield-no-meta edict; global-zero at 2d1584a5, regression by 189ae15c | RATIFIED (draft T3) |
| T7 | `docs/tranches/BI/coordination/asks-and-consumes.md:50` (row 15) | "cell/stack/badge SHARED-KEEP" + the wrapper offer over "`<MetricBadge>` (`@mkbabb/glass-ui/metric-badge`)" | badge is folded into `/metric` at 7.0.0 (compose `Metric`); reframe = **capability-keep**, never "badge kept SHARED"; census truth: the metric family spans **4 repos / ~11 files** (fourier-analysis ×6 the largest) and `/metric` has ZERO adopters — the re-point asks are the only migration vehicle | `grep MetricBadge src` = 0; MIGRATION.md; RU-23 W3/N1 | RATIFIED (draft T7) + the RU-23 RT-2 extension |
| T8 | `asks-and-consumes.md:49` (row 14) + `:94` | "migrate … onto the Tooltip preset. IconTooltip is a **Tooltip PRESET**" | compose the canonical Tooltip family (Provider/Trigger/Content) — `TooltipProps` carries NO `preset` | `Tooltip.vue:4-11`; MIGRATION.md:33 | RATIFIED (draft T8) |
| T8b | `docs/tranches/BI/waves/BI.W-SPEEDTEST-ONLY-PAIR.md:27, 37-38` | `<Tooltip preset="icon">` / "→ the Tooltip preset" | same correction as T8 | as T8 | RATIFIED (draft T8b) |
| T35 | `asks-and-consumes.md:17-26` (§pin-guard) + `:41` (row 6) + `:45` (row 10 status) | the pin-guard section + row 6 still read as a live 2026-07-12 HARD pre-publish blocker (7.0.0 shipped; Q060 superseded the roster); row 10 still "file when BI.W-metric-move lands" (landed at 490cc46e) | stamp SUPERSEDED-BY-Q060 (dated marker) on §pin-guard + row 6; flip the row-10 status word (OPEN-2 resolved: fold here — T7/T8 already edit this file; the ask-construction stays family B) | RU-33 L2 r1 (re-proven); `q060-glass7-live.md` on disk | FABLE-NEW (RU-33 r-batch; OPEN-2 resolution) |
| T36 | `docs/tranches/BI/waves/BI.W-LADDER-DERIVE.md` (tail, final line) | "Awaiting challenge seat 2" | dated reconcile with the 2a6d1d41 two-consecutive-clean record | RF-4 row 28; RU-17a r7 (both re-proven; tail live this seat) | FABLE-NEW (RF-4 r8) |
| T37 | `docs/tranches/BI/waves/BI.W-GLASS-SUBTLETY.md:512, 569-570, 744` | BLUR-MUTE "is not built … nothing to retire" | executed-then-removed: 3c2f6e79 built `--glass-blur-btn-radius` (07-13, its own DELTA filed); 490cc46e deleted the cohort (07-16). Dated correction; "never built" erases an executed, paint-judged wave | git history; `W-BLUR-MUTE-DELTA.md` on disk | FABLE-NEW (RU-24 r6) |
| T38 | `docs/tranches/BI/waves/BI.W-GRADED-BACKDROP.md:70-82, 407` | §Provenance asserts the OS reference blur is "uniform-radius, never progressive falloff" | reconcile with amended codex law 1 + the RU-15 measurement: the reference ramp is attested progressive (form (a)); the in-surface gradient stays a DECLARED BEST-iOS divergence, not a uniform-radius equivalence claim | IOS27-CODEX law 1 (amended); RU-24 W2 | FABLE-NEW (RU-24 r7) |
| T39 | `docs/tranches/BJ/formation/ASSEMBLY-CROSSWALK.md:5` | "the eight band specs" | nine (`ls docs/tranches/BJ/waves/` = 9 BAND files) | disk count this seat | FABLE-NEW (RU-17b r7) |
| T41 | `docs/tranches/BJ/formation/round-2c/chronic-decided-draft.md` + its adjudication echoes | the RF-4 F8 line-drift set: aurora dispatch `:448`→`:422-432`; useDockSearch `:184`→`:187`; useDragMorph snap `:325`→`:329`; `glass-deep.css`→`styles/glass/deep.css` + `styles/tokens/glass-deep.css`; the gesture-frame-recorder evidence must cite the BG record (the disk path died 07-14) — strike the §7 row's dead recorder path | RF-4 F8 ("verified on current disk") | FABLE-NEW (RF-4 r8) |

### TRIGGERED roster (conditional/coupled — lands with the trigger, never before)

| # | target | trigger | provenance |
| --- | --- | --- | --- |
| T6 | `src/styles/theme/radius.css:112-119` — the `--corner-k-soft/-sharp` rationale citing the abrogated `proof:squircle-language` (the comment was rewritten once and STILL cites the absent gate — RU-17b 4.7) | `BAND-MATERIAL` W1: if W1 DELETES the dead pair (recommended), T6 is a no-op; T6 fires only on decline | RATIFIED (draft T6 / OPEN-1 / ADJUDICATION-1 r9) |
| T17 | `src/components/dock/constants.ts:17-19` — "mirrors `--dock-morph-max-stretch` (density.css)" framing of a dead token pair (zero importers / zero var() readers) | GF-DOCK ∪ REDUCTION: wired-or-deleted WITH the design (RU-27 R1); truth-up only if the pair survives | FABLE-NEW (RU-27) |
| T31 | `CHANGELOG.md:87` — the 7.0.0 Slider "real 44px root hit region" bullet is FALSE at the tag (wiring dropped at 490cc46e) → appended dated `[CORRECTION]` bullet per the frozen-ledger mechanism; fold the peer-line optionality note (keyframes/value also optional) into the same bullet | the BAND-A11Y-routed Slider coarse-floor fix (RU-33 r1) — either direction (fix-then-true or correct-the-claim) | FABLE-NEW (RU-33 r2/r7) |
| T32 | `src/components/slider/Slider.vue:376, 391-399` + `src/styles/utilities/a11y-overrides.css:111` ("the six sub-44 form atoms compose this ONE shared utility" — actual consumers: 1 demo story) + `:162` | same trigger as T31; re-point all three comment layers to whatever ships | FABLE-NEW (RU-33 FN3) |
| T34 | `src/composables/glass/index.ts:30` + `useSpecularPointer.ts:18` — "the hover/button waves consume this leaf" is FALSE at HEAD: sole importer is the barrel; the live gleam source is `createSpecularWriter`/`useSpecularTracking` via `v-specular` (verified this seat) | the REDUCTION A05 conditional roster ruling on `useSpecularPointer` (RU-11 §6) — **the roster rows now EXIST at `BAND-REDUCTION` W3 (A05-SPECULAR; APOTHEOSIS MECH-03/D-03)**: delete moots; keep → truth the two comments | FABLE-NEW (RU-11 Am14 + this seat's mechanism pin) |
| T40 | `docs/tranches/BJ/formation/CHRONIC-ADJUDICATION.md:5` — "lands in the BJ DECIDED-rows wave (family I)" names a wave no charter carries (RF-5 OW-3) | the lead's FLIP-1 ruling (RU-13-A01): if the DECIDED-rows wave IS chartered, the phrase becomes true; else correct to "formation-terminal via CHRONIC-ADJUDICATION" | FABLE-NEW (RF-5 R-5) |
| T42 | `src/styles/tokens/glass.css:112-116` ("the values here ARE the bake … 1.05/1.18/1.2") + `:146-149` ("gentle ~1.18/1.2 … 1.4-1.5 over-juices") vs the shipped values `:124-127` (1.4/1.4/1.6/1.6) — a values-vs-prose contradiction in ONE file | **`BAND-MATERIAL` W2's saturate-identity RULING (a named W2 deliverable per APOTHEOSIS D-04 — ruling-only, no repaint; the bare "RU-24 r8 MATERIAL W2/W3 seam" had no carrier: W2 disclaimed saturate, W3 judges the halo only):** whichever side is ruled the identity, the band lands THAT text (naming b8aa7033 if the values win) | FABLE-NEW (RU-24 r8) |
| T43 | the dock keyboard-model comments | ADJUDICATION-1 ruling 4: only if GF-DOCK lands ratify-nav-links does family J truth the misleading comments | RATIFIED (standing ruling, carried) |

### Out (explicit non-goals — named, never silently dropped)

- `design-idioms.md` §3/§7 → `BAND-COLOCATION` W1 Precept F (FINDING-1, kept).
- `docs/precepts/**` (submodule, pinned b0f6134) — NEVER edited from this repo. The three
  diverged docs (design-idioms, motion-canon, tunable-anim) ride the RF-2 route-6 single-home
  outbound decision; this band edits `docs/design/` + `docs/canon/` only.
- `src/composables/index.ts` false header (nonexistent `sortable/` sub-tree) — dies with the
  dead-barrel purge, `BAND-COLOCATION` W1 owns it.
- `src/components/PROCEDURAL-SUITE.md` LiquidGrid row — routed to `BAND-REDUCTION` W3 scope
  (RU-13 FLIP-2, cheapest cure); joins this roster only if the lead re-routes.
- `scripts/regen-spring-tokens.mjs` REPAIR (BLOCK_START_MARKER dead — zero "§2" hits in
  scheme-spring.css at HEAD, verified) — an EXECUTABLE change, out of the comment-only fence;
  **`BAND-GATES` W1 owns the repair-or-retire (APOTHEOSIS D-10 — the "RU-33 r5 infra row" had
  no carrier in any band)**. This wave adds the hand-truth + a one-line
  `keep in sync with springPresets.ts` pin (OPEN-3 RESOLVED: the generator exists for curves,
  is broken, and never emitted the prose mirror).
- The `peerDependenciesMeta` flag flip (if T30 is ruled flag-side) — publish lane / Q060.
- `MIGRATION.md:886/949/1083` "no consumer import" clauses — family B (needs the sibling roster).
- The corrected Q060 outbound construction/sending — family B (T7's census extension feeds it).
- The Slider coarse-floor FIX itself — BAND-A11Y (RU-33 r1); J holds the doc arms (T31/T32).
- `package.json` 7.0.0 dating — ADJUDICATED RETIRED (user CUT-NOW; REGISTRY.md:16-18). Kept.

### Acceptance (born-RED per target, gates-abrogation compliant)

Every SWEEP-NOW target is born-RED: the stale string is live at HEAD `485891a2` (each re-proven
by this redo). The battery is ONE one-time RED→GREEN differential script (grep per stale string
+ source-of-truth cross-check), run before and after the sweep — NOT ~40 standing gates (the
~40-60 invariant collapse is user-mandated; family J contributes zero standing gates).

Representative probes (the full set enumerated 1:1 with the roster at execution):

| gate | born-RED probe (fails today) | GREEN condition |
| --- | --- | --- |
| G-T1 | `grep -n '0.68s, ζ=0.64' src/styles/tokens/scheme-spring.css` → :31 | 0 hits; dock row equals springPresets |
| G-T2 | mirror rows (6) < emitted `--spring-*` curves (7) | row-count == 7; transient present |
| G-T3 | `grep -rn 'BI\.W-' src/` → exactly 1 (placement.css:93; re-proven) | 0 hits in src/ |
| G-T4 | `grep -n 'renders the smooth core for every painterly id' …uniformBridge.ts` → hit | 0 hits; comment states the applyMedium routing + forward note |
| G-T5 | `grep -n -- '--glass-reveal-blur.*4px' docs/design/tunable-anim.md` → :121 (**re-aimed off the submodule copy**) | the per-register model stated |
| G-T7 | `grep -n 'badge SHARED-KEEP' …asks-and-consumes.md` → :50 | capability-keep reframe + the 4-repo census stated |
| G-T9 | `grep -n '0.68, 0.64' docs/design/tunable-anim.md` → :64 (+ per-row greps) | all six rows equal springPresets |
| G-T21 | `grep -n 'paper-grid' src/composables/glass/webgl/shaders/flow.*.ts` → hits | headers cite live consumers only |
| G-booked | `git grep -in "booked" src/` → **8** hits (re-censused, APOTHEOSIS MECH-07): the 4 roster targets (glass.css:287, uniformBridge:78, flow×2) + 4 residuals ADJUDICATED — `GlassDock.vue:20` OWNED (names the live `docs/consumer-evidence/use-glass-backdrop-luminance.md`, on disk), `radius.css:88` OWNED (standards-gated Baseline deferral, its own text disclaims masking-fallback), `GlassTimeline.vue:139/:173` ride REDUCTION W5's six-variant redesign | 0 UN-OWNED booking markers in src/ — T4/T20/T21 cure the roster four; the two OWNED markers are the probe's stated allowlist; the Timeline pair expires with W5 (the differential must not false-RED on it before W5 lands) |

**The no-op guard (π/DELTA: none owed).** No visual/runtime surface is touched. Proof, per
commit: (a) the diff over `src/**` touches only comment lines (no selector, declaration, token
value, or executable statement); (b) `npm run build` dist output byte-identical for CSS/JS
(comments stripped by the minifier — any dist delta is a fence breach); (c) vue-tsc + the vitest
battery unchanged. `.md`/docs targets carry (a) trivially.

### KISS / no re-drift

- T1/T2/T9: the prose mirrors are hand-maintained while the curves are generated — the exact
  re-drift vector paid down three times now. Each corrected mirror gains the one-line sync pin;
  the generator REPAIR (and any prose-emission hook) is the infra row's, not this wave's.
- Fewest lines: no reflow, no re-wording beyond the corrected clause, no new sections.
- Dated `[CORRECTION]` markers on shipped/dated records (CHANGELOG, MIGRATION, the BI wave
  docs); in-place edits on working rosters and src comments (OPEN-7 resolved).
- The roster is closed as of this union; the wave's two-critic challenge pass may extend it
  only with pinned evidence.

### Dependencies

MATERIAL W1 (T6) · GF-DOCK ∪ REDUCTION knob ruling (T17) · BAND-A11Y Slider fix (T31/T32) ·
REDUCTION A05 roster (T34) · the lead FLIP-1 ruling (T40) · the RU-24 r8 saturate judgment via
MATERIAL W2/W3 (T42) · GF-DOCK keyboard closure (T43) · GF-AURORA W1/W2/W4 re-truth T4's
forward note at each landing · family B consumes T7/T35's census extensions for the Q060
outbound.

---

## BJ.W-IDIOMS-COLOCATION-REWRITE — CEDED to BAND-COLOCATION Wave 1 Precept F

**Retired from family J** (adjudicated, CHALLENGE-1-MECH FINDING-1; ratified by this redo).
The `design-idioms.md` §3 home-map + §7 doctrine rewrite lands co-located with the `_shared/`
carve moves; `BAND-COLOCATION` W1 Precept F is the single owner and carries the former OPEN-4
(§3 `animate.css` home) / OPEN-5 (§5/§9/§12 `CLAUDE.md` refs) / OPEN-6 (§9 deliberate-keep).
Family J touches no `design-idioms.md` line.

---

## OPEN markers

- **OPEN-1 (T6) — RULED, kept:** conditional on MATERIAL W1 declining the corner-k delete
  (ADJUDICATION-1 ruling 9).
- **OPEN-2 — RESOLVED this union:** the row-10 status word folds into T35 (parsimony: T7/T8/T35
  already edit the same roster file); the ask construction stays family B.
- **OPEN-3 — RESOLVED this union:** `regen-spring-tokens.mjs` exists, is BROKEN
  (BLOCK_START_MARKER no longer matches scheme-spring.css — zero "§2" hits at HEAD), and never
  emitted the prose mirror. The repair-or-retire is `BAND-GATES` W1's rider (APOTHEOSIS D-10);
  this wave lands hand-truth + the sync pin.
- **OPEN-4/5/6 — CEDED** with Wave 2 (unchanged).
- **OPEN-7 — RESOLVED:** house style confirmed by the shipped corrections mechanism (RU-33
  ratified it): dated inline `[CORRECTION]` on shipped/dated records; in-place on working docs.

---

## APOTHEOSIS amendments (RU-04 third judge, 2026-07-18)

Applied per `../formation/refable/REFABLE-RU-04-JUDGE.md`; the capstone is `APOTHEOSIS.md`.

- **MECH-01 (BLOCKER):** T26 stamped SOLE OWNER of the `subpath-policy.mjs` comment cures —
  `BAND-GATES` W1's stale-comment row cedes its member here (same-line double-edit killed).
- **MECH-07:** the G-booked census re-pinned 4 → **8**; the four residual markers adjudicated
  (GlassDock:20 OWNED / radius.css:88 OWNED / Timeline :139+:173 ride REDUCTION W5) so the
  differential neither false-REDs at close nor mis-states its day-one arithmetic.
- **D-10:** the `regen-spring-tokens.mjs` repair re-routed off the phantom "RU-33 r5 infra row"
  onto `BAND-GATES` W1 (repair-or-explicit-retire rider); the Out bullet and OPEN-3 updated.
- **D-04:** T42's trigger re-aimed at MATERIAL W2's saturate-identity RULING (now a named W2
  deliverable) — the trigger no longer points at a disclaimed seam.
- **MECH-03/D-03 (T34):** the trigger's referent now exists — the A05 roster rows landed at
  REDUCTION W3.
