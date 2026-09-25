# BL — the tranche plan

| field | value |
|---|---|
| seat | formation PLAN seat (run `wf_68eb18d6-b21`). Writes this file and `waves/INDEX.md`; wave specs, gates and the ledger are later seats' |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `396125cb` (the task named `f3ad78d0`; the one commit between is a cursor line). `src` is the published 10.1.0 (`package.json:3`, `npm view @mkbabb/glass-ui version` → `10.1.0`) |
| inputs, read in full | `CHARTER.md`; `FORMATION-PROGRESS.md`; `audit/REGISTRY.md` (§1 families F-01..F-85 whole; §3 remaining gaps; §6.5-§6.8; §14.7-§14.8); `audit/INBOUND.md`; `audit/INBOUND-MAP.md` (rounds 6 and 8 sections, the O-74 ruling rows); `audit/PROMPT-RECAP-SEED.md`; `ledger/CENSUS.md` and `ledger/census-{register-a,register-b,carries-recap}.md`; `BK/FINAL.md` §7; `design/structure/REGISTRY.md` (P2-0, P2-1, P2-6, P2-7); `design/dock/REGISTRY.md` (§0, §1, §5-§7); `design/tile/REGISTRY.md` (§0, §1, §5, §7); `design/material/PORTFOLIO.md` (§0, §7; D3 has no REGISTRY yet) |
| commands run here | `npm view @mkbabb/value.js version` → `4.0.0`; `plutil -p ~/Library/WebDriver/com.apple.Safari.plist` → `AllowRemoteAutomation => false`, mtime `Sep 17 18:51:49 2026`; `grep -c emphasis MIGRATION.md` → 0; `grep -c paper-aged MIGRATION.md` → 0; source reads cited inline |
| fences | no source edit, no git write, no build; the only writes are this file and `waves/INDEX.md` |

Short cites: `REG:n` is `audit/REGISTRY.md` line n; `CUR:n` is `FORMATION-PROGRESS.md`; `CEN:n` is `ledger/CENSUS.md`; `CH:n` is `CHARTER.md`; `IN:n` is `audit/INBOUND.md`; `D1:n`, `D2:n`, `D4:n` are the structure, dock and tile `REGISTRY.md`; `D3P:n` is `design/material/PORTFOLIO.md`.

## 1 · Mode and close

**Mode.** BL is the next implementation tranche. Formation (this folder) is tranche development only (CH:13). Execution starts when the owner greenlights it; every seat is Opus 5.5, declared, with no Fable seat (CH:3-5).

**What BL ships, in order.**

1. **10.2.0, a minor**, ruled by the owner (CUR:48): O-62 GLASS-VEIL-GREY (the light veil recut; the law "the plate darkens toward the ink, never lightens toward cream" is revised) and O-66 §1 GLASS-SELECT-GREY, once design loop D3 converges. The owner ruled these additive rows into the same minor: O-76 TOGGLE-PRESSED-TINT (rides if converged), O-77 LAYER-HEADER-LABEL, O-78 MENU-STACKING, O-79's two MIGRATION rows, and O-81 (4) DATA-REVEAL-COLLISION and (5) SEEDFIELD-DRAW-ORDER (IN:30-35). The publish is confirmed by the owner in-session before the tag (CUR:48). This is band 0.
2. **11.0.0, the BL major cut** (the working answer since round 2: REG:1456, R2-03-11; CUR:47). It carries every other family. Bands A to L.

**The close.** BL closes when the 11.0.0 tag is live with provenance and `FINAL.md` lands (P-4). The close wave (W-L.8) runs the checklist F-12 requires: no row inherits a status word without a HEAD measurement, the P-6 overfitting audit with an artefact, the archaeology duty, and the release run `--run release`, not `--run local`. Every family is placed below; none carries past BL. A row whose owner act has not happened at the close (OW-1, OW-3) is recorded as its wave's terminal state with the owner act named, never re-booked (CH:23).

**Rules every wave follows** (these hold for the wave-spec seats; the census names P-1 and P-2 as having no enforcement, CEN:212-213):

- **Born RED.** Each wave states its gates as executables that fail at HEAD where the defect is live, with the HEAD reading. A gate that cannot fail is not a gate (F-01, F-02). No `it.fails` latch (F-09).
- **π and DELTA.** Every visual claim ships a captured paint delta: a screenshot plus the paired π reading, before and after, on disk under the one scratch root (F-61) and cited by the wave record (P-2, F-06).
- **Engines.** Chromium cells are measured. Playwright WebKit cells are labelled Playwright WebKit. Real-Safari cells are UNMEASURED until W-A.6's step 0 passes (the owner's safaridriver checkbox, OW-3; D-4).
- **Clean breaks.** No alias, shim, dual path or masking fallback (E-1, E-2). A removed or renamed public surface gets a MIGRATION row in the same wave, and a silent binding gets an E-11 guard.
- **Three gestalt passes.** Each implemented wave records a tranche-fit pass, a wave pass and a feature pass before it closes (P-1).
- **Loop waves.** A family a design loop owns is built only from that loop's converged specification. The loop wave lands when the loop meets its convergence gate; no other wave builds that family's subject first.

## 2 · Bands

Bands are in dependency order. Band 0 comes first because the owner scheduled 10.2.0 ahead of the cut. Every cross-band edge in §5 points to an earlier band.

| band | title | ships in | families | waves |
|---|---|---|---|---|
| 0 | The 10.x minor | 10.2.0 | F-31 (veil and control-surface split), F-24 (menu-row split), F-71 (O-76 split), F-29 (O-77 split), F-22 (O-78 and O-81 (4) split), F-63 (O-79 split), F-65 (O-81 (5) split), F-68 (10.2.0 relay split) | W-0.1 .. W-0.7 |
| A | Gates and evidence | 11.0.0 | F-01, F-02, F-03, F-04, F-05, F-06, F-07, F-08, F-09, F-10 | W-A.1 .. W-A.6 |
| B | Decisions, records and owner asks | 11.0.0 | F-11, F-13, F-14 (carry and two subject splits), F-15, F-71 (intake and reply split) | W-B.1 .. W-B.15 |
| C | Sources of record and hygiene | 11.0.0 | F-61, F-62, F-63 (remainder), F-64, F-65 (remainder) | W-C.1 .. W-C.5 |
| D | Structure (loop D1) | 11.0.0 | F-55, F-56, F-57, F-58, F-59, F-60 | W-D.1 (loop D1), W-D.2 |
| E | Surfaces, overlays and density | 11.0.0 | F-85, F-21, F-32, F-74, F-65 (detent split), F-22 (remainder), F-41, F-26, F-27, F-28, F-29 (remainder), F-30a, F-33, F-34, F-25, F-20, F-35, F-36, F-80 | W-E.1 .. W-E.13 |
| F | Motion | 11.0.0 | F-44, F-78, F-46, F-76, F-79, F-45, F-73 | W-F.1 .. W-F.7 |
| G | Engines and performance | 11.0.0 | F-47, F-49, F-50, F-48, F-51, F-52 | W-G.1 .. W-G.7 |
| H | Material (loop D3) and the perf register | 11.0.0 | F-23, F-24 (remainder), F-75, F-31 (remainder), F-14 (glass-register split), F-53 | W-H.1, W-H.2 (loop D3), W-H.3, W-H.4 |
| I | Dock (loop D2) | 11.0.0 | F-16, F-17, F-18, F-54 (dock-hallmark split), F-71 (badge-seat split), F-19, F-77, F-14 (dock-composition split) | W-I.1 (loop D2), W-I.2 .. W-I.4 |
| J | Tile (loop D4) and the engagement register | 11.0.0 | F-30b, F-54 (remainder) | W-J.1 (loop D4), W-J.2 (loop D5, to open) |
| K | Accessibility and the platform | 11.0.0 | F-81, F-37, F-38, F-39, F-40, F-42, F-43, F-82, F-83, F-84 | W-K.1 .. W-K.10 |
| L | Consumers, exports, the cut and the close | 11.0.0 | F-71 (API-ask cures split), F-70, F-67, F-69, F-72, F-66, F-68 (remainder), F-12 | W-L.1 .. W-L.8 |

Why this order:

- **A before every BUILD wave of the major.** Each later wave binds its born-RED gates into W-A.2's roster and its π captures into W-A.3's wired suite. Band 0 runs on today's harness, as the design loops' harnesses already do.
- **B early.** The decide waves rule what later waves build or strike; the ledger (W-B.1) is the route target every wave cites (F-11).
- **C before the surfaces and the material.** F-65's one inherited dark arm and F-64's fallback sweep change how every token is declared; D3's converged ladder (band H) lands on that structure. F-63's doc invariants go in early so every later wave keeps the docs true.
- **D (structure) after the gates and before the component bands**, so the component waves land in the final placement. W-D.1 is a loop wave: when band D's turn comes and D1 has not converged, bands E onward proceed, and W-D.1 lands at the next band boundary after D1 converges. Only W-D.2 waits on it.
- **E, F and G before H and I.** D3's M-7 halo witness reads F-21's containment cure (W-E.2); the dock loop builds on the one spring authority (W-F.1), the shared end-of-gesture helper (W-F.2) and the direction helper (W-F.5); a D3 route that reads a published field luma needs W-G.1 and W-G.3.
- **H before I.** D2's floor row 6 keeps `.dock-plate` as the one element that carries the veil (D3P:21); the veil itself is D3's, and the live dock's veil (C-2 row 1) is D3's M-5.
- **J after I**, and **K after H and I**: the ring register (F-39) reads F-23's ink on composites, and W-FINDABLE (F-83) covers the dock's switcher tabpanels.
- **L last**: the consumer matrix, the type surface, the unconsumed-surface census and the landing packets measure the finished artefact.

## 3 · Waves

Each wave's scope is one line here; the wave-spec seats write the gates, captures and MIGRATION rows. "Split" names the part of a family a wave holds when the family spans waves.

### Band 0 · The 10.x minor (10.2.0)

| wave | families | scope |
|---|---|---|
| **W-0.1** (loop D3) | F-31 split (the light veil token and the two control-surface composites), F-24 split (the menu row's one grey channel) | From D3's converged spec: the light veil a light frost at every level, cured at the token (`--glass-veil-ink`, `tokens/glass.css:34`, and the per-level α rungs; dark keeps its veil); the filled SelectTrigger and Input on one field surface (O-66 §1, O-66a: `.control-surface` two image layers vs `.field-control` one `background-color`); the selected or highlighted menu row carried by accent ink or ring, never the veil-ink plate (`_shared/menu/menu.css:10`). Only the parts of D3's answer that are minor-lawful (token values, no removed surface) ship here; the rest is W-H.1 and W-H.2 |
| **W-0.2** | F-71 split (O-76) | A published per-item `--toggle-tint` read by the pressed background, border and ink through `color-mix`; unset reads today's neutral pressed state. Rides only if W-0.1 has converged (CUR:48) |
| **W-0.3** | F-29 split (O-77, the label-slot two-slot case, R9-02-16) | ConfiguratorLayer's name keeps its width up to a cap and the sub-label yields first (both are `truncate` in one track at `configurator/ConfiguratorLayer.vue:152,155`) |
| **W-0.4** | F-22 split (the menu z leg, O-78; the attribute namespace, O-81 (4)) | The menu content takes `z-popover` through `overlayContentAttrs` role `menu` (one site; `menu/DropdownMenuContent.vue` sets none); `data-reveal` (written at `_shared/overlay/content.ts:39,63`, read by `styles/glass/reveal.css`, `overlay-plate.css`, `transitions.css`, `tokens/motion-registers.css`, `deck/styles/reveal.css`, `vReveal.ts`, `toast/Toast.vue`, `select/SelectContent.vue`, `deck/styles/capture.css`) moves to a library-namespaced attribute, with its MIGRATION line. Carries the obligation to replace the fixed 30 ms wait in `tests/components/menu/contract.test.ts` "restores focus on execute" with a wait on the focus event (CUR:44) |
| **W-0.5** | F-63 split (O-79) | MIGRATION.md: the 7.0.0 paper line (`--paper-aged-texture` and `frequency="aged"` retired; successor `--paper-grain-tooth` with optional `--paper-grain-relief`; no successor for the SVG-noise look, by owner ruling) and the Button `variant` → `emphasis` + `tone` table, one row per v6 variant (default, outline, secondary, accent, ghost, glass, ai, link, solid), each judged in paint. 0 hits for either at HEAD (measured here) |
| **W-0.6** | F-65 split (O-81 (5)) | `constellation/constellationField.ts:69` draws `z` from its own derived stream, restoring the 3.13.0 main draw order (a, x, y, r, dim per node); a gate pins the first N draws of a seeded layout |
| **W-0.7** | F-68 split (the 10.2.0 relay leg) | The 10.2.0 cut: CHANGELOG, the ratchet datum in content bytes, the owner's in-session publish confirmation, the tag through `release.yml`, and the relay to every glass consumer (they pin 10.1.0 exact by owner ruling, CUR:47-48), with the measured per-consumer trap census offered as a seat |

### Band A · Gates and evidence

| wave | families | scope |
|---|---|---|
| **W-A.1** | F-05 | Repair `tests-visual/`: inside a typecheck, one route manifest where absence fails, one OKLab `_support/color.ts`, the WebKit project matching `*.webkit.spec.ts`, one scratch root for output (REG:219-226) |
| **W-A.2** | F-01, F-02, F-03, F-06, F-09 | W-REGISTER-COLLAPSE: one tracked roster of 40-60 invariants (E-8), each bound to an executable with a recorded bite on the shipped detector; the literal pins at `tests/gates/gate-register.test.ts:172-174` go; detectors state their defect class as spelling sets (F-02); synthetic fixtures under `tests/_support/` (F-03); the #10 sink's in-tree pointers struck, invariant `grep -rE "#10\b.*(owed|OWED|π)|π battery" src tests` empty (F-06); the 10 `it.fails` latches (CEN:299) retire, each subject a born-RED in its family's wave (F-09: `comment-ratio:209` → W-C.2, `radius-role-canon:458` → W-E.8, `engage-ladder:134` → W-J.2, `g-dock-lattice:925` → W-I.1, `gl-excise:112` → W-G.1, `story-preview-card:487,556` → W-E.10, `layout-canon:371,390,403` → W-E.9); roster lines for E-5 and E-9 (CEN:207-209). The R2-05 draft roster exists only in a workflow return (REG §6.8) and is re-derived |
| **W-A.3** | F-04 | W-VISUAL-CI: a small wired set in CI, one spec per invariant family, both engines where D-4 applies; the tag gate reads the wired set; capture tools move to `scripts/` or go |
| **W-A.4** | F-08 | One GPU-backed leg (a mac runner, or a local `--use-angle=metal` release leg) for aurora, blob and fourier, with a chroma floor; both capture-death signatures move there (`Protocol error (Page.captureScreenshot)` and "blob coverage 0.000", run 35810620398), with no retry policy |
| **W-A.5** | F-10 | W-PAYLOAD-INVARIANT: one CI invariant on the gzip of root, aurora, blob, dock and the recursive styles draw; surface exactness over every subpath; the exact-equality ratchet literal goes |
| **W-A.6** | F-07 | W-SAFARI-BAND. Step 0 is the owner row plus a machine check: `AllowRemoteAutomation` must read true (false at this seat, mtime 2026-09-17 18:51:49). Then the owed-cell roster re-derived at HEAD, R2-01's 34-cell battery, the simulator arm for iOS cells, and the device-Metal arm retired. Until step 0 passes, every wave's Safari cells stay UNMEASURED |

### Band B · Decisions, records and owner asks

F-13's mechanism is a chronic that waits on a ruling nobody was seated to make and rides closes OPEN or BLOCKED (REG:312-320). The plan gives each of its rows, and each subject decide row of F-14, a wave of its own, the charter's form for a disease row (CH:23); the LEDGER seat records each row's close count. Each decide wave names its ruler (owner or seat), records a terminal BUILD, FOLD or RETIRE with rationale, and, for a BUILD, names the wave that builds it.

| wave | families | scope |
|---|---|---|
| **W-B.1** | F-11 | The BL `LEDGER.md` from the census at HEAD: every route points to a BL row that exists; each dropped item re-enters in its subject family. This is the formation LEDGER seat's act |
| **W-B.2** | F-71 split (intake and reply) | W-MAIL-INTAKE: a BL inbox dir; every letter rowed; the reply letter answering O-53..O-68, O-74 and C-2 with each row's disposition and landing version (CUR:41), plus O-75..O-81; the ANSWER rows (O-56 G-3 animation half and G-4, O-57 R-2, O-53 R-2, O-80's re-measure, N-10b the amiga scene); O-74's CURED@HEAD claims confirmed or refuted by measurement (A2-VA-L2-6 withdrawn by E-1) |
| **W-B.3** | F-14 split (the carry and D-3) | W-RECAP-CARRY: every owner ask mapped to a BL family or a DECLINE that quotes the owner; the recap detector bound; D-3's "eight laws" get one text of record under `docs/canon/`, or a ruling that an existing canon document answers them, and the design loops' standing-law lists cite it (GAP-C1, CEN:257-259) |
| **W-B.4** | F-15 | Owner glances, one capture per row: the progress rim in the dock edge (N-7, O-55 R-2) against AY B.5, read from D2's pass-2 capture; the cartoon under-stamp; one aurora per category and "header text 2× smaller" (R2-06-08); O-74 §4 the destructive confirm and §9 the slider's 24 px coarse target against the 44 px hit floor (INBOUND-MAP round 8) (OW-7) |
| **W-B.5** | F-13 split (C-4) | V-A95, the aurora reverse drag: RETIRE with a re-trigger on a real-pointer reproduction, or confirm |
| **W-B.6** | F-13 split (#51: C-5, C-6, C-7) | HandMark: the dark band window set on the token ground (C-5); the light-arm chroma floor 0.08 that the sRGB ceiling 0.06847 at L 0.86, h 270 cannot meet (C-6, a spec defect); π-SCROLL keep or kill, owner-reserved with no default (C-7, OW-4) |
| **W-B.7** | F-13 split (#44) | The tags field, deleted at `a8a6f66b` with 0 consumers: build behind W-E.6 or retire |
| **W-B.8** | F-13 split (#28 RT-28D, RT-28E) | DotRing's export (three internal users, in no barrel) and RT-28D's consumer-triggered item |
| **W-B.9** | F-13 split (#45) | The constellation: BUILD in the VizStudio contract (then W-G.1 takes its engine, off `useCanvas2D`) or RETIRE; 0 `./constellation` consumers across siblings |
| **W-B.10** | F-13 split (#46) | GF-TIMELINE: the Σwidth denominator (OW-6) and `useAnisotropicExtent` |
| **W-B.11** | F-13 split (#78 OWED-1) | The design canon re-author: the salvaged emitter reads retired tokens; rule the re-author against F-63's derivation (W-C.3) |
| **W-B.12** | F-13 split (GAP-B2b) | The shadcn IDIOM-CLEARED column: draw it and route its rows by mechanism (F-64, F-58, F-66), or retire it because those families' invariants cover it |
| **W-B.13** | F-13 split (C-1, C-3) | The npm Trusted Publisher (OW-1, an owner act on npmjs.com), then deletion of the `NPM_TOKEN` secret after the first OIDC publish (OW-2) and the paired `release.yml:65-66` `env:` edit. Rotation is waived (CH:9) |
| **W-B.14** | F-14 split (R2-06-03) | The source-derived colour registers (album-art palette, colour card, protagonist, seed morph, dock hue tracking): BUILD only if a consumer names one (E-5), otherwise RETIRE with an owner quote (OW-9) |
| **W-B.15** | F-14 split (R3-01-16) | Scroll glide (BDU R11, R56): the main scroller and the dock run are native; decide a facility or RETIRE with an owner quote |

### Band C · Sources of record and hygiene

| wave | families | scope |
|---|---|---|
| **W-C.1** | F-61 | One scratch root; executable tooling lives in `scripts/` or `tests-visual/`, never `docs/`; the frozen record scripts retire with an invariant against new ones (4,252 media files under `docs/`, CEN #63) |
| **W-C.2** | F-62 | W-DEMETA-II: tranche ids, dated brackets and tombstones out of `src` (279 lines in 121 files), dist types, `DISSOLVE_DIALECTS`' prose and MIGRATION, and `release.yml:13`; one E-10 invariant over src, dist types and MIGRATION; the comment-ratio latch becomes a born-RED growth invariant |
| **W-C.3** | F-63 remainder | W-DOC-TRUTH: two invariants (symbol and subpath existence; token existence) over README, DESIGN, canon, component READMEs and JSDoc; the consumer-evidence docs' dead cites; the `docs/precepts` copy of `affordance-map.md` (C-17) retired or relayed to precepts (a sibling tree, P-7) |
| **W-C.4** | F-64 | W-TOKEN-HYGIENE: the 300 literal `var(--x, <literal>)` fallbacks (CEN #20), phantom and dead tokens, duplicates, the shadcn-default `--radius` ladder, dead selectors (`.input-pill`), the demo's undefined `--ring`; the detector is E-2's enforcement beside W-G.1 (CEN:206) |
| **W-C.5** | F-65 remainder | One source per quantity: W-DARK-ONE-ARM (every dark value on an inherited arm, colours through `light-dark()`, non-colour values through an inherited property; the root scheme has one authority; a stated stance toward UA forced dark); TS tables generate CSS; one colour-resolution leaf; one randomness source (typewriter 20, constellation 2, aurora 1 `Math.random` onto the seeded PRNG). The seed draw order is W-0.6 and the detent ladder W-E.3 |

### Band D · Structure (loop D1)

| wave | families | scope |
|---|---|---|
| **W-D.1** (loop D1) | F-55, F-56, F-57, F-58, F-59 | W-COLOCATION from D1's converged route: the whole move ledger in one sweep over `src` and `scripts`, the N-1 edict recursively (sub-components, composables, skeletons, constants and styles with their owner; only module-level composables in `composables/`; long dirs broken into encapsulated modules); one symbol one door; the value SCCs from 2 to 0 (REG:1324); the placement seal lands as a gate (N-1's enforcement, CEN:215) |
| **W-D.2** | F-60 | W-PERIPHERY on the shape W-D.1 fixes: the test tree mirrors `src`, scripts, duplicated workflows, root config (9 `vite*.ts`, 4 tsconfigs), gate constants derived from the export graph, not path literals |

### Band E · Surfaces, overlays and density

| wave | families | scope |
|---|---|---|
| **W-E.1** | F-85 | W-SAFE-EDGE: one root token per edge from `env(safe-area-inset-*)`; the Sheet, the Toaster and ExpandableContainer's host pad by `max(own gap, token)`; popper `collisionPadding` per side through the content seam; the deck's locals read the tokens; the demo shell's re-derivation (`demo/shell/dock-nav.css:29-34`) goes; the dock placement is documented with the tokens |
| **W-E.2** | F-21 | W-SURFACE-GEOMETRY: the surface rung declares no position or radius (the Sheet computes `position: fixed`); the seat's width transition leaves the control's own list; the Select slide owned by `reveal.css`; a state fill writes the plate token; one PRM table; the containment row (a clip applies only while its purpose holds, a clipping flex or grid item declares its minimum, the open state rests at `scale: none; filter: none`, a yielding header yields a whole line) |
| **W-E.3** | F-32, F-74, F-65 split (W-DETENT-FLOOR) | The Sheet: a dock-reach inset on each edge the dock occupies; rung-relative halo stops; the detent ladder resolved (floored and deduplicated) at rest and in motion, with the live viewport span and the body's `touch-action`; the sliding arm bleeds or stretches from its anchored edge on all four sides |
| **W-E.4** | F-22 remainder | The overlay layer contract on the content seam: a host-relative z rung (the tooltip above its hosts), the edge clearance read from W-E.1's tokens, membership in the dismissal stack (a consumed Escape is `preventDefault`ed), the host (portal `to` resolved from the trigger; `--z-fullscreen` seated or deleted), the outside `inert` while a modal layer is open, and a block ceiling on every popper role with the Dialog capped and scrolling by default |
| **W-E.5** | F-41 | W-TOAST: one viewport owner per page; an unbounded queue behind a visible window, never a splice of a live toast; one announce channel per event (polite by default, assertive for an error tone; the deck stage and PagerDots stated once); named items; placement below `sm` (UIA-F-51, O-59's one BLOCKING row) |
| **W-E.6** | F-26, F-27, F-28 | W-CHIP: every composite that reads a per-instance input is declared on its reading class; `cn()` resolves shorthand over longhands (`cn("px-2 p-4") === "p-4"`) and the `*Variants` builders are swept; the chip row's X-G1, X-G2, X-G3, X-G5, X-G8 (X-G4's italic clause is stale, REG:611) |
| **W-E.7** | F-29 remainder | W-DENSITY-DECIDE, then one sweep: the density ruling (corners transpose with pads, or pads derive from corners, or gaps only) with a named ruler and paired captures; the row budget; the label-slot rule for every collection control; one coarse-pointer type model (O-74 erratum E-2); compact dock seats in the coarse hit-slop (A2-KE-L2-6); segmented labels on `--control-text`. D2 reads this model for O-81 (3) |
| **W-E.8** | F-30a | Re-seat the 21 off-role 12 px readers across 14 routes; a role invariant replaces the latch at `radius-role-canon.test.ts:458` |
| **W-E.9** | F-33 | W-CEL-CONTAINER: container queries on cels and the studio envelope; the nested-family seam; the configurator envelope (C-13c, R11); SegmentedTabs folds on its own inline size, on by default, with a collapse mode; LabeledField container-keyed; the three `layout-canon` latches become born-REDs |
| **W-E.10** | F-34, F-25, F-20 | The demo: preview specimens and a size ladder (10 of 80 cards at HEAD), the configurator expression, the opaque-frame sweep and the compositions prune (#18); the preview stills authored in OKLCH off the field palette (F-25); the shell chrome at the phone cell and the short-viewport arm (F-20) |
| **W-E.11** | F-35 | One font path with `unicode-range`, preloaded, and a display ruling (`swap` with advance-width calibration, or `optional` with the no-shift claims struck) |
| **W-E.12** | F-36 | The pager worm reads a registered `@property <length>` or a measured dot; a browser gate bounds the neck by the hop |
| **W-E.13** | F-80 | W-PRINT: the deck's page geometry on a named page and its `html`/`body`/`#app` rules gated on a deck; one library print arm (light scheme and ink, substrate canvases hidden, glass flattened, open overlays hidden or a modal printed alone by decision) |

### Band F · Motion

| wave | families | scope |
|---|---|---|
| **W-F.1** | F-44 | W-SPRING-ONE: one step-able integrator fed from `springPresets`; one dt clamp with substeps; every emitted `linear()` continuous at 100 %; one canvas clock whose resume continues; the disclosure chevron and both disclosure engines on one spring row each |
| **W-F.2** | F-78 | W-INTERRUPT: the reveal register on one engine that re-targets; the disclosure re-targets its size; the indicator deform reads the painted position; one end-of-gesture helper (`pointercancel`, `lostpointercapture`, window `blur`, `visibilitychange`, `pagehide`, a move with `buttons === 0`) that springs back and never commits; the dock's click-away and `release()` rows; every detent release seats a spring at `(t, release velocity)`. D2's loop builds on this helper and keeps these rows as its born-REDs |
| **W-F.3** | F-46 | Offsets and releases from position: scroll chrome `t` from `scrollTop`; a windowed velocity that decays with the age of its last sample and reads 0 at rest (carousel lag, detent fling); the worm's trail between origin and lead |
| **W-F.4** | F-76 | W-EXTENT-OWNED: the moving box owns every layout contribution it changes (the Collapsible body wrapper, the toast stack's spring offsets inside W-E.5's store, the typewriter reserve holding the cursor, HandMark's per-fragment frames, the FadingScroll port) |
| **W-F.5** | F-79 | W-DIRECTION: one resolved direction per axis site; magnitudes with a separate sign; one logical-offset helper; key tables and swipes through the direction; `dir` to every reka root or one ConfigProvider seam; mirrored glyphs; the carousel snaps on `inline`; the Sheet's start and end sides as an owner API question |
| **W-F.6** | F-45 | Compositor-only idle life, paused off-screen (music-staff: 120 layouts/s at idle); gate: idle layouts/s = 0 |
| **W-F.7** | F-73 | W-THEME-SWAP: the default flip is atomic (`no-transition` on by default, the toggle icon exempt), or one view-transition cross-fade |

### Band G · Engines and performance

| wave | families | scope |
|---|---|---|
| **W-G.1** | F-47 | W-ONE-ENGINE: the per-dab stroke cascade in WGSL (ids 3, 5, 6, 7 stop collapsing to one Kuwahara body), then the WebGL2 arms deleted (aurora's 11 GLSL modules, the blob's three WebGL2 files; 236 `webgl2` lines in 40 files, CEN #54); the constellation's engine per W-B.9; the raster ground; device limits (request the adapter's `maxTextureDimension2D`, clamp, re-arm); the substrate publishes its field luma. Closes the `gl-excise.test.ts:112` latch subject |
| **W-G.2** | F-49 | One `lost` subscription per device fanned out to a Set; a route-cycle DOM-count test (born RED at about 135 nodes per step); the O-54 answer rides it |
| **W-G.3** | F-50 remainder | W-LUMA-EVENTED and W-AURORA-CLOCK: no synchronous GPU readback on the main thread (KFA-23 = KFA-74), no loop without a resolved source, a drift clock at 30 Hz or less at rest. The blob's settle seam is W-G.5's |
| **W-G.4** | F-48 split (aurora) | W-AURORA-GREENFIELD from its spec of record (#49 GF-AURORA), the VizStudio contract riding it; a disease row, its own wave, capture heavy |
| **W-G.5** | F-48 split (blob), F-50 split (the blob's quiescence seam) | W-BLOB-GREENFIELD from its spec of record (#50: the W1 GLSL excise, the seven W2-W6 cells, C-11, C-12); a mood pin does not veto settle (value.js's quiescence ask); the O-56 G-3 look |
| **W-G.6** | F-51 | One mount-path pass: forced recalc per spring, the raster ground, `cn()` memoized, async pipelines, a membership index where SortableList and ToggleGroup scan per item |
| **W-G.7** | F-52 | A shader-free aurora derive subpath for O-53 (`deriveAurora`, `paletteToCssGradient`, `resolveRenderMode`; `./aurora` re-exports it) against value.js's 12,288 B first-paint budget; CSS split per subpath |

### Band H · Material (loop D3) and the perf register

| wave | families | scope |
|---|---|---|
| **W-H.1** (loop D3) | F-23, F-24 remainder, F-75 | W-INK-COMPOSITE from D3's converged spec: ink rungs derived against the painted composite (text, perimeter and ring), one rendered-contrast invariant with a ring leg and a `::selection` register; the dock's ink keeps its register (M-4); state, value and emphasis separate in D, DK, PRT, PCM and PRM (the Command cursor ring, a PCM ink arm, a capsule hover that survives PRM, a slider value mark in both variants including spectrum, O-61 R-2); the PRT arm recedes the field (F-75); the live dock legible with no DOM readback (M-5, C-2 row 1) |
| **W-H.2** (loop D3) | F-31 remainder | W-FROST-II from D3's converged spec: the transmissive well; one frost detector over the rungs and both modes with a nested-lens arm (no backdrop-root former, `mask-image` included, between a lens and its backdrop); the blur rungs composed at the reading element; the F48 blur ladder with paired π (OW-8); the dock press `filter` (#7) and the sheet halo lens (RT-39G) |
| **W-H.3** | F-14 split (R2-06-02) | W-GLASS-REGISTER-DECIDE against D3's converged ladder: the CLEAR variant, IconChip, GlassControl disc, Maps-card composite and expand, the coverage law, a control track, iOS-27 control deltas, deep glass on heroes, dashed ghost, #24 RT-24C/D, #71 RT-71A; each BUILT here with a born-RED e2e or RETIRED with an owner quote (OW-9) |
| **W-H.4** | F-53 | W-PERF: count gates (render passes or Metal encoders per frame per route, R2-09's tables as baseline); the boot shell measured on a network-throttled FCP; the low-power glass register decided against a capability signal and, if BUILD, built on W-H.2's rungs; the dev-server leg retires (REG:1262) |

### Band I · Dock (loop D2)

| wave | families | scope |
|---|---|---|
| **W-I.1** (loop D2) | F-16, F-17, F-18, F-54 split (the dock hallmarks, #67), F-71 split (O-67 R-3, the badge seat) | The dock from D2's converged spec: the plate a stadium at every rest (Q-1, the cut cap), the scroll port apart from the paint layer (O-63), one continuous extent for the first expand, content changes and the layer swap on fractional endpoints (O-64 R-1..R-5), the one collapsed form (O-65), side, vertical and canvas edges whole with a gutter and a reserved badge seat (O-67), the opt-in scroll-compact state and the progress rim as an opt-in plate seat (O-55, N-7, the rim reading in CUR:43), the retired facilities ruled (Q-9), `data-dock-state`, the 10 % safe-inset token deleted, the O-81 (1)-(3) rows, the O-64 R-6 probe, O-66 §2's witness scope in the three consumer docks; the dock hallmarks (dock-to-card squish, magnetic overpull, stagger) and OWED-3; the three R-7 captures supplied or ruled unneeded (OW-5, #90). Closes the `g-dock-lattice.test.ts:925` latch subject |
| **W-I.2** | F-19 | One marker-based member query shared by the dock run, its snap targets, the carousel and the deck; separators and foreign nodes are never members; the run defers Home and End to an inner composite; the toolbar carries the consumer's name |
| **W-I.3** | F-77 | W-HOVER-GUARD: every paint-bearing `:hover` rung inside `@media (hover: hover)` (22 unguarded at `95068476`), a static invariant in place of the G7 row; on `(hover: none)` a touch `pointerdown` pins the dock and a press-origin `focusin` does not enter hover |
| **W-I.4** | F-14 split (R2-06-01) | W-DOCK-COMPOSE-DECIDE on the converged dock: link verbs, dock-as-hub, the three-island constellation, stadium pill, ghost satellite, goo-spacing, the one-organism sequence, the search-terminus bloom; each BUILT here with a born-RED e2e or RETIRED with an owner quote |

### Band J · Tile (loop D4) and the engagement register

| wave | families | scope |
|---|---|---|
| **W-J.1** (loop D4) | F-30b | The selectable multi-line tile from D4's converged route (D′, F or G): which primitive owns it, its corner by content class (Q-1), its selected register and commit, its keys (Q-4), Chip `shape="cell"` per Q-8; a role invariant; the consumer drops `rounded-pill` in its addendum (O-58, N-9) |
| **W-J.2** (loop D5, to open) | F-54 remainder (the engaged rung, GAP-2) | The engagement register component-wide (D-2): T1 GROW and the slider exemplar (#27), the rungless component census (#77, `engage-ladder.test.ts:134`), `data-engaged`'s two writers. The registry's FOLD needs a component-wide design home (REG:1274); no loop owns it today, so formation opens D5 (§6) |

### Band K · Accessibility and the platform

| wave | families | scope |
|---|---|---|
| **W-K.1** | F-81 | W-ROOT-RELATIVE: the editable test reads the composed target; `activeWithin(node)` at the nine `document.activeElement` reads; a trap walker that descends open shadow roots (upstreamed to reka); tokens on `:root, :host`. R6-01-05 may take an owner ruling that shadow mounts are unsupported (then a documented limit in W-C.3's docs) |
| **W-K.2** | F-37 | W-COMMAND: the inline Command takes a non-modal listbox root (no `useHideOthers`, focus guards, DismissableLayer or inline flex column); the dialog palette owns focus; born RED in the consumer fixture |
| **W-K.3** | F-38 | W-FOCUS-LIFECYCLE: focus moves on the logical open and close (the handoff after the trap detaches, a reopen in the exit window, a double-click on a menu trigger, a bfcache restore) |
| **W-K.4** | F-39 | One ring register: the dock trio, the six `--focus-ring-shadow` readers and SegmentedTabs read the house outline; the forced-colours ring in `CanvasText` outside the `Highlight` state edge; the state edge an outline, not a seat border; `GrayText` for disabled |
| **W-K.5** | F-40 | One current-row channel: options take their focus model from the listbox (the 12 tab stops at Card, C-9; the pin inverts); the row's `:hover` keeps its lift and drops the fill |
| **W-K.6** | F-42 | One a11y sweep: the naming seams; one keystroke predicate (repeat, IME ownership, the modifier set) at the dock search, the shortcut registry, the overlay dismissal and the deck; destinations are links; count 0 is a state; the Label-for Slider; content parts drop the trigger `aria-labelledby` when named |
| **W-K.7** | F-43 | W-ARRIVAL: one owner per arrival (route push, popstate, pane swap, mount entrance); the router resolves before `startViewTransition` and reports a skipped transition; the indicator seats its first placement in layout space and observes the selected button; scroll restore and hash on arrival; HandMark draws once per mount |
| **W-K.8** | F-82 | W-FORM-PARTICIPATION: one participation seam per control (reset through the model, validity and disabledness read into `data-state` and ARIA, the proxy written synchronously, the NumberField commit on the editor) |
| **W-K.9** | F-83 | W-FINDABLE: every closed or not-current surface `hidden="until-found"` (disclosures, ConfiguratorLayer, carousel and deck members, the switcher's tabpanels), `beforematch` through the owner's model |
| **W-K.10** | F-84 | W-TEXT-ONCE: one DOM text copy per phrase (typewriter, tooltip); `user-select: none` only on controls and a lifted drag row |

### Band L · Consumers, exports, the cut and the close

| wave | families | scope |
|---|---|---|
| **W-L.1** | F-71 split (the API-ask cures) | Each API ask CURED, ANSWERED or DECLINED under E-5: O-65 P-1's remainder (measured against 10.1.0's `layout="detached"`, CUR:39), O-65 P-2 the edge drawer under a content surface, the CardHeader `#actions` seat (A2-VA-L3-2), the Slider spectrum fill hook (O-61 R-2), the DarkModeToggle menu-item form (O-61 R-3, N-11c), the canvas-anchored overlay's virtual anchor (#76), the SelectTrigger inline arm (R9-02-15), and O-74 §5 slug identity, §7 the page-gutter token and §13 a `./search` subpath |
| **W-L.2** | F-70 | The type surface and bindings (E-11): typed native fallthrough (O-57 R-1); a runtime witness per forwarded reka channel (18 of 37 unwitnessed); a declaration gate against `Record<string, any>` (Chip); the carousel model's inbound half; the state vocabulary; one `update:open` per close; attributes land on the element that carries the role; `form` and `name`; the `strictTemplates` consumer fixture; `checkUnknownEvents` |
| **W-L.3** | F-67 | W-PEER-TRUTH: `verify:package` replaced by a consumer matrix in `ci.yml` (npm and pnpm, optional peers absent, the README CSS recipe through `@tailwindcss/vite`, `./styles.css`, SSR that hydrates on a cold process over fine, coarse, no-preference and reduce); the `--text-sm`/`--text-xs: initial` theme reset; DEV guards that ship; setup-time client reads behind mount |
| **W-L.4** | F-69 | W-DRAG-MORPH-SETTLE: the first press on the active pill no longer throws the indicator (633.95 px in scaena's fork); the fork's fix upstreamed with a born-RED e2e, so scaena drops its vendored 8.0.3 at its repin |
| **W-L.5** | F-72 | The value.js boundary: the lock bump to value.js 4.1.0 or later plus a born-RED that `opaqueCssColor("oklch()")` throws `GlassColorError`. value.js is 4.0.0 on npm (measured here); the wave's first act is the publish ask relayed to value.js, since its tree is read-only to glass seats |
| **W-L.6** | F-66 | The P-6 census before the cut: per-symbol wire-or-delete of the published surface with no consumer (94 of 321 value exports, `.glass-top-layer`, `useLiquidReveal`, aurora `source: "image"`, `./blob-config`) |
| **W-L.7** | F-68 remainder | W-LANDING: 11.0.0; per-consumer migration packets from each consumer's import graph, naming the silent no-op bindings; the live relay; each consumer's repin is its own addendum (E-6); chicago's three temporary overrides named for retirement |
| **W-L.8** | F-12 | The 11.0.0 cut and the close: the close checklist (no inherited status word, P-6 with an artefact, the archaeology duty), `--run release`, the ratchet datum, the owner's in-session confirmation, the tag, and `FINAL.md` |

## 4 · Loop waves

A loop wave cites its loop and its convergence gate. It lands when the gate is met, and no wave builds its subject first. The charter's gate applies to every loop: zero enumerated open gaps, survival of a fresh adversarial audit by seats that did not author the winning spec, two consecutive clean passes, and at least three full passes (CH:82, CH:86).

| wave | loop | state at this seat | the loop's own gate |
|---|---|---|---|
| W-D.1 | D1 structure (`design/structure/`) | pass 3A closed at `b602a59b` (floor P3-F1..F9 built; B and G cross-judged RED both ways); pass 3B running as `wf_ef54b3e6-509` (CUR:65) | the frozen checklist S-01..S-13, B-01..B-13 and G-01..G-12, items closed divided by items listed, each closed by a committed, replayable measurement, re-opened by no fresh critic, over two consecutive passes (D1:976-1036) |
| W-0.1, W-H.1, W-H.2 | D3 material (`design/material/`) | pass 1 in progress: A and B research banked (`7147e4cc`, `9e263caa`), resumed with pools of 1 (CUR:59); no REGISTRY yet | the shared battery M-1..M-8 green in both themes over paper, the aurora at ceilings 1 and 0.5 and the hostile grounds, plus the converged family's own witness (D3P:631-670), with the O-66 §1 witness measured in paint (CUR:34). W-0.1 takes the minor-lawful part of the one convergence; W-H.1 and W-H.2 take the rest |
| W-I.1 | D2 dock (`design/dock/`) | pass 1 closed at `dac7d50c` (B′ ADVANCE 58 %, D2-G minted); pass 2 running as `wf_7d9571b8-23e` (CUR:64) | the §7.5 checklist: the five problems under the hardened H2 harness in both engines, floor rows 1-7, the route's §7.3 items and the gestalt read, with the carried D2 obligations (CUR:32-38, 43) as witnesses (D2:397-399) |
| W-J.1 | D4 tile (`design/tile/`) | pass 1 closed at `04929544` (D′ ADVANCE 55 %, D4-F and D4-G minted); pass 2 running as `wf_fa0d8421-43e`, which also rules the family-B critic split on measurements (CUR:49, 64) | the §7.5 checklist: T-1..T-8 under H2 in both engines, X-1..X-7, floor items 1-5, the route's §7.3 items and the gestalt read (D4:413-422) |
| W-J.2 | D5 engagement register (to open) | no portfolio | the charter's gate; its battery starts from `engage-ladder.test.ts:134`'s census and D4's T-6 |

Owner rulings the loops have asked for (D2 Q-1..Q-11, D4 Q-1..Q-12, D1 P3-R1..R9) enter the loops as they arrive; each loop builds on its stated default until then (D2:291, D4:272).

## 5 · The DAG

Each wave with the waves it depends on. A loop wave also depends on its loop's gate (§4).

| wave | depends on |
|---|---|
| W-0.1 | D3 gate |
| W-0.2 | W-0.1 |
| W-0.3 | — |
| W-0.4 | — |
| W-0.5 | — |
| W-0.6 | — |
| W-0.7 | W-0.1, W-0.2, W-0.3, W-0.4, W-0.5, W-0.6 |
| W-A.1 | W-0.7 |
| W-A.2 | W-A.1 |
| W-A.3 | W-A.1, W-A.2 |
| W-A.4 | W-A.3 |
| W-A.5 | W-A.2 |
| W-A.6 | W-A.1, OW-3 (owner) |
| W-B.1 | — (formation) |
| W-B.2 | W-B.1 |
| W-B.3 | W-B.1 |
| W-B.4 | W-B.1, W-A.1 |
| W-B.5 .. W-B.12, W-B.14, W-B.15 | W-B.1 |
| W-B.13 | W-B.1, OW-1 (owner) |
| W-C.1 | W-A.1 |
| W-C.2 | W-A.2 |
| W-C.3 | W-A.2, W-0.5, W-B.11 |
| W-C.4 | W-A.2 |
| W-C.5 | W-C.4, W-0.6 |
| W-D.1 | D1 gate, W-A.2, W-C.2 |
| W-D.2 | W-D.1 |
| W-E.1 | W-A.3 |
| W-E.2 | W-A.3, W-C.4 |
| W-E.3 | W-E.1, W-E.2, W-C.5 |
| W-E.4 | W-0.4, W-E.1 |
| W-E.5 | W-E.1, W-E.4 |
| W-E.6 | W-A.3, W-B.7 |
| W-E.7 | W-0.3, W-A.3 |
| W-E.8 | W-A.2 |
| W-E.9 | W-A.3, W-E.7 |
| W-E.10 | W-E.9 |
| W-E.11 | W-A.3 |
| W-E.12 | W-A.3 |
| W-E.13 | W-E.4 |
| W-F.1 | W-A.3 |
| W-F.2 | W-F.1, W-E.3 |
| W-F.3 | W-F.1, W-E.12 |
| W-F.4 | W-F.2, W-E.5 |
| W-F.5 | W-F.3, W-E.3 |
| W-F.6 | W-A.3 |
| W-F.7 | W-A.3 |
| W-G.1 | W-A.4, W-B.9 |
| W-G.2 | W-A.3 |
| W-G.3 | W-G.1 |
| W-G.4 | W-G.1, W-B.5 |
| W-G.5 | W-G.1 |
| W-G.6 | W-G.1 |
| W-G.7 | W-G.1, W-A.5 |
| W-H.1 | D3 gate, W-0.1, W-C.5, W-E.2, W-G.3 |
| W-H.2 | D3 gate, W-0.1, W-C.5, W-E.2 |
| W-H.3 | W-H.1, W-H.2 |
| W-H.4 | W-H.2, W-A.4 |
| W-I.1 | D2 gate, W-F.1, W-F.2, W-F.5, W-H.1, W-E.7 |
| W-I.2 | W-I.1 |
| W-I.3 | W-I.1 |
| W-I.4 | W-I.1 |
| W-J.1 | D4 gate, W-E.6, W-E.8, W-H.1 |
| W-J.2 | D5 gate, W-I.1, W-J.1 |
| W-K.1 | W-A.3 |
| W-K.2 | W-E.4 |
| W-K.3 | W-F.2, W-E.4 |
| W-K.4 | W-H.1, W-I.1 |
| W-K.5 | W-E.4 |
| W-K.6 | W-K.1, W-E.4 |
| W-K.7 | W-F.2, W-F.4 |
| W-K.8 | W-A.3 |
| W-K.9 | W-F.2, W-F.4, W-I.1 |
| W-K.10 | W-F.4 |
| W-L.1 | W-B.2, W-E.4, W-K.6, W-H.1 |
| W-L.2 | W-K.8 |
| W-L.3 | W-A.5, W-G.7 |
| W-L.4 | W-F.2 |
| W-L.5 | — (re-trigger: value.js 4.1.0 or later on npm) |
| W-L.6 | every wave of bands C to K |
| W-L.7 | W-L.1, W-L.2, W-L.3, W-L.4, W-L.5, W-L.6 |
| W-L.8 | W-L.7 |

Notes on edges:

- W-D.1 has no dependants except W-D.2. Waves of bands E to K that land before it are moved by its ledger; D1's routes derive their move lists from the graph (G) or a pinned module set (B), so a later tree is re-planned, not hand-merged.
- W-H.1's edge to W-G.3 holds whichever route D3 converges on: a route that reads a published field luma needs the evented sampler, and a route that deletes the live channel (D3-A) deletes W-G.3's consumer, not its idle-loop cure.
- W-G.4 depends on W-B.5 because V-A95 is a rider on #49.

## 6 · Formation gaps this plan names

- **D5 has no portfolio.** F-54's component-wide half (the engaged rung) needs a design home (REG:1274); no loop owns it. Formation opens D5 with a round-0 portfolio, or the owner rules the rung into D4's or D2's scope. Until then W-J.2 cannot be specified past its born-RED.
- **D3 has no REGISTRY.** Its pass 1 is paused mid-research (CUR:59). W-0.1 is the priority on the next free seat (CUR:48), and the 10.2.0 date follows D3's convergence.
- **The R2-05 roster** exists only in a workflow return (REG §6.8); W-A.2 re-derives it.
- **O-65 P-1 and P-2** were to be measured at HEAD before any wave was written (CUR:39). The census predates O-65, so W-L.1's spec seat measures both first; P-1 against 10.1.0's `layout="detached"`.

## 7 · Ledger rows each band closes

Row ids: `#n` BK register rows (census seats a and b), `C-n` BK FINAL §7 carries, `E-`, `D-`, `P-`, `N-` prompt-recap rows, `OW-n` owner items (CEN §4), `O-n` inbound rows. A row whose items span bands is closed by the band that holds its remainder (CEN §2); the LEDGER seat writes each row's terminal disposition.

| band | rows closed |
|---|---|
| 0 | O-62, O-66 §1, O-66a, O-76, O-77, O-78, O-79 (1)(2), O-81 (4)(5); N-13's light-grey half; CUR obligations: the O-66 §1 witness (D3), O-76's fold, the menu-contract sleep, the 10.2.0 and all-on-10.1 rulings |
| A | #6, #10 (sink retired), #31, #41, #46 (Safari cells), #53, #65, #85, #87, #88; the latch form of #17, #23, #27, #58, #59, #77; C-10, C-16; D-4; E-8, E-5 and E-9 (enforcement); P-2, P-3; OW-3 |
| B | #28 (RT-28D/E), #44, #45, #46 (Σwidth), #51, #64 (idiom column), #78 (OWED-1), #24 and #71 (their carry); C-1, C-3, C-4, C-5, C-6, C-7; ANSWERED C-18, N-4, N-5, N-10a; DECLINE C-2, C-14, C-15; N-2, N-3, N-10b, N-10c, N-8e, D-3; OW-1, OW-2, OW-4, OW-6, OW-7, OW-9; O-74 §4, §9 and the CURED@HEAD confirmations; the reply letter (CUR:41); O-53 R-2, O-54, O-56 G-3 (animation) and G-4, O-57 R-2, O-80 (answers) |
| C | #7 (its F-63 cite), #17, #20, #26, #55 (residue), #61, #63, #64 (declaration column), #86 (F-65 item); C-17; E-2 (its fallback half), E-4, E-10 |
| D | #21, #62; E-1, N-1 |
| E | #18, #23, #34, #39, #43, #52, #56, #58, #59, #84, #86 (F-21 item), #89 (residue); C-8, C-13c; N-11a; O-61 R-1; O-74 E-2 (the one coarse type model) and its F-29, F-22, F-85 rows; UIA-F-51 |
| F | #3, #26 (F-44, F-46 items), #32 (retarget), #73; D-1; KFA-115, KFA-132, KFA-168 |
| G | #45 (build, if ruled), #49, #50, #54, #60 (quiescence and one-context arms); C-11, C-12, C-13a, C-13b; E-2 (the engine half); N-8c; O-53 R-1, O-54, O-56 G-3 (look); KFA-23, KFA-74, KFA-133 |
| H | #7 (GAP-1), #10 (dark α), #24, #25, #33, #38, #39 (RT-39G), #60, #69, #71 (RT-71A), #80, #82, #83 (perimeter); N-13; O-61 R-2 (the value mark); C-2 row 1; OW-8 |
| I | #31 (RT-31B), #47, #48, #67, #90; N-7, N-8a, N-8b (producer half), N-12, N-14, N-15; O-55, O-56 G-1 and G-2 (producer), O-63, O-64, O-65 R-1, O-66 §2, O-67, O-81 (1)-(3); C-2 rows 2 and 3; OW-5; CUR obligations for D2 (CUR:32-38, 43) |
| J | #27, #77, #84 (two-line items); D-2; N-9; O-58 |
| K | #29, #32 (captures), #81, #83 (FC rows); C-9; N-8d; the #31 items routed to F-42 and F-23 |
| L | #8, #66, #76, #21 (`./blob-config`); E-6, E-7, E-11, N-6; N-8b (consumer half); N-11b, N-11c; O-57 R-1, O-65 P-1 and P-2, O-67 R-3's API half, O-74 §5, §7, §13; O-36 (F-72); P-4, P-6 |

The census's STANDING-LAW rows that are enforced at HEAD (E-12, E-13, P-5, P-7, P-8) carry no wave; their gates stay in W-A.2's roster. E-3 and P-1 are held by the wave rules in §1.
