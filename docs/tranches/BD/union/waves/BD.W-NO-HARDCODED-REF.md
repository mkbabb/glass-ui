# BD.W-NO-HARDCODED-REF — finish the renames (kill the dual-name coexistence) + `proof:no-hardcoded-ref` covers the UNION, born-RED on the 22 overfit refs

**Band 14 (V — dock hallmark + iOS-27 glass + generalize) · depends: NONE inbound (a GENERALIZE wave — its renames land BEFORE the union's app-named artefacts ship, so the renamed names are the only names built); sequenced so its renames precede every artefact-shipping wave (W-AUR-PROTAGONIST · W-DOCK-PROTAGONIST-PILL · W-GLASS-CARD-COMPOSITE · W-CARD-SHEET-EXPAND · the dock steady-state)** — D7.

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build executes the §2 rename map across the wave-spec corpus + the proposed `src/`/`demo/`/`scripts/` artefact-name set + the demo content strings, removes the "Walmart" trademark, re-architects the dock steady-state to consumer-supplied DATA (the TIER-B facility fix), + mints `scripts/proof-no-hardcoded-ref.mjs` born-RED on the 22. User-gated. The spec is in scope now.

## The defect / the ask

`viz/critique/generalize-no-hardcoded.md` (D7) proves D7 is **DECLARED but NOT EXECUTED** — a CHALLENGE-class finding. The rename promise (`VIZ-BAND-PLAN.md:31-34`) is contradicted within the SAME corpus by the actual wave names, gate names, component names, library file names, token names, descriptor literals, and demo-string literals that survive everywhere else. The reference media did NOT stay an exemplar — it is hardcoded into the names of artefacts that ship to disk. The census found **22 overfit artefacts in NAMES** (not prose):

**TIER A — CANONICAL union waves (ship to disk; gate-backed; the load-bearing offenders).** A1 `W-MAPS-CARD` · A2 `proof:maps-card` · A3 `maps-card.vue` · A4 `<MapsListRow>`/`MapsListRow.vue` · A5 `MapsDisclosureHeader.vue` · A6 `maps-card` gestalt-row · A7 "Work/Home/**Walmart**" chip labels (a real-brand trademark BAKED into the build) · A8 `W-DOCK-NOWPLAYING-PILL` · A9 `proof:nowplaying-pill` · A10 **`<DockNowPlaying>`/`DockNowPlaying.vue`** (the SINGLE WORST — an APP-NAMED LIBRARY component on `/dock`+root barrel) · A11 `nowplaying-pill` gestalt-row · A12 `dock-nowplaying.vue` demo file · A13 `W-AUR-ALBUM` · A14 `proof:aur-album` · A15 `albumPalette.ts` (a LIBRARY file on `/aurora`) · A16 `aurora-album` gestalt-row · A17 `useAuroraProtagonist(mediaRef)` (the `mediaRef` param name leaks "media").

**TIER B — the DOCK STEADY-STATE hardcoded to a music player (the D9 facility violation, beyond naming).** B1 `[home·now-playing·search]` three-island DEFAULT resting silhouette · B2 `silhouette('media')`/`setSilhouette('media')` descriptor STATE id · B3 `DOCK_SPLIT_SIGNATURES.media` NAMED split signature · B4 `dock-constellation`/`dock-subdock` gestalt verdicts judged against a music player · B5 (the fence-line — `--dock-constellation-*`/`--dock-subdock-*` geometry tokens are GENERIC ✓, NOT overfit).

**TIER C — the V-expansion dual-name + token residue (no-legacy violations).** C1 `W-MAPS-CARD-EXPAND` (×4) coexists with `W-CARD-SHEET-EXPAND` (×3) · C2 `W-DOCK-ALBUM-STAGE`/`-FIELD` coexists with `W-DOCK-CONTENT-FIELD` · C3 `--maps-backdrop-dim` un-renamed (D7 said `→ --card-expand-*`).

The deeper miss: D7 scopes `proof:no-hardcoded-ref` to "across the V-expansion" (`VIZ-BAND-PLAN.md:34`) — EXEMPTING the 61-wave union where the worst, file-backed, gate-backed offenders (TIER A) live. A census aimed away from the disease.

The good news (D7 §4): in MOST cases the FACILITY is already generalized and only the NAME is overfit — `deriveAuroraPalette(source)` is genuinely image-agnostic, `useDockLink.toSurface(controlRef, surfaceRef)` is genuinely surface-agnostic (D9 done right), the `<DockProtagonistPill>` mechanism (art-chip + marquee + plate-tint-to-dominant-hue) is content-agnostic. The EXCEPTION where the FACILITY itself is overfit: the **dock steady-state (TIER B)** — the music-player layout hardcoded as the dock DEFAULT.

## The mechanism

Execute the §2 rename map (the generalized concept named FIRST, the exemplar recorded ONLY in the wave's prose "the X reference informs this" line), kill the dual-name coexistence (no-legacy), re-architect the TIER-B dock steady-state to consumer-supplied DATA, remove the Walmart trademark, + mint `proof:no-hardcoded-ref` born-RED on all 22 covering the UNION.

### 1. The rename map (every TIER A/B/C artefact — the binding remediation)

**Waves:** `W-MAPS-CARD` → **`W-GLASS-CARD-COMPOSITE`** (the content-agnostic frosted-glass-card composite) · `W-MAPS-CARD-EXPAND` → **`W-CARD-SHEET-EXPAND`** (PURGE the old name) · `W-DOCK-NOWPLAYING-PILL` → **`W-DOCK-PROTAGONIST-PILL`** (the content-reactive protagonist pill) · `W-AUR-ALBUM` → **`W-AUR-PROTAGONIST`** (the image/protagonist-reactive aurora) · `W-DOCK-ALBUM-STAGE`/`-FIELD` → **`W-DOCK-CONTENT-FIELD`** (PURGE both old names).

**Gates:** `proof:maps-card` → `proof:glass-card-composite` · `proof:nowplaying-pill` → `proof:protagonist-pill` · `proof:aur-album` → `proof:aur-protagonist`.

**Library components/files (the most important — these SHIP):** `<DockNowPlaying>`/`DockNowPlaying.vue` → **`<DockProtagonistPill>`/`DockProtagonistPill.vue`** (on `/dock`+barrel) · `albumPalette.ts` → **`imagePalette.ts`** (KEEP the `deriveAuroraPalette(source)` function name — it is already generic ✓) · `useAuroraProtagonist(mediaRef)` → KEEP the composable name (generic ✓), rename the param `mediaRef` → **`protagonistRef`**.

**Demo files/components:** `maps-card.vue` → `glass-card-composite.vue` · `<MapsListRow>`/`MapsListRow.vue` → `<GlassListRow>`/`GlassListRow.vue` · `MapsDisclosureHeader.vue` → `DisclosureHeader.vue` (drop the `Maps` prefix; `<DisclosureHeader>` is already generic ✓) · `dock-nowplaying.vue` → `dock-protagonist.vue`.

**Gestalt-roster row ids:** `maps-card` → `glass-card-composite` · `nowplaying-pill` → `protagonist-pill` · `aurora-album` → `aurora-protagonist`.

**Tokens:** `--maps-backdrop-dim` → `--card-expand-backdrop-dim`.

### 2. Kill the dual-name coexistence (no-legacy — the C1/C2/C3 fix)

Every renamed artefact's OLD name is PURGED — zero `W-MAPS-CARD-EXPAND` once `W-CARD-SHEET-EXPAND` exists; zero `W-DOCK-ALBUM-STAGE`/`-FIELD` once `W-DOCK-CONTENT-FIELD` exists; zero `--maps-backdrop-dim` once `--card-expand-backdrop-dim` exists. The authoritative count lines (`VIZ-DAG.md:54` &c.) carry ONLY generalized names. This is the no-legacy law applied to the V-expansion's own names: a rename REPLACES, never forks.

### 3. The TIER-B dock steady-state → consumer-supplied DATA (the D9 facility fix, beyond naming)

The dock's resting silhouette + split signatures become DATA the consumer supplies — the `W-DOCK-LINK-API` `:silhouettes` pass-through ALREADY provides the seam. The music-player layout becomes ONE demo consumer of that data, never the library default:

- `silhouette('media')`/`setSilhouette('media')` → `silhouette('protagonist')` (or a generic island-count descriptor — the silhouette state must NOT name a surface TYPE per D9).
- `DOCK_SPLIT_SIGNATURES.media` → `DOCK_SPLIT_SIGNATURES.lateral` (a GEOMETRIC signature — the spec already implies "`media`=lateral", so name it `lateral`; the published-API + record-key blast radius is W-DOCK-LINK-API's migration, this wave names the rename).
- `[home·now-playing·search]` three-island DEFAULT silhouette → `[N generic islands]` (the dock's resting silhouette is content-agnostic; "home/search" are OK as DEMO content, "now-playing" → a generic protagonist island). The dock's resting silhouette + split signatures are CONSUMER DATA; the music-player layout is ONE demo consumer.
- `proof:dock-hub` (D9's gate) asserts ≥3 DISTINCT surface consumers AND zero hardcoded surface-type literal in `src/components/custom/dock/` (today the `media` signature + `now-playing` silhouette would red it). This wave names the facility re-architecture; W-DOCK-LINK-API's `:silhouettes` pass-through hosts the data.

### 4. Remove the Walmart trademark (the A7/NC4 fix)

The demo content strings carry NO real brand/trademark — "Work / Home / **Walmart** / Add" → "Work / Home / Studio / Add" (a generic exemplar, no registered brand). The reference-analysis docs (`media-analysis.md` &c., TIER E) MAY name the reference ("Work brown / Home blue / Walmart yellow" AS analysis); the fence (D7 §0) is binding: the reference informs the spec, it must not become a shipped NAME or a baked demo literal.

## The gate — proof:no-hardcoded-ref (born-RED on the 22 → GREEN)

`scripts/proof-no-hardcoded-ref.mjs`, `tags: ["local","ci"]` (the device-free name-census arm). The detector comment-strips first + exports a pure detector for the self-test bite. The census reaches the UNION + V-expansion (NOT "the V-expansion" only — the D7 §3 scope fix), scoped to ARTEFACT-names + shipped-demo-content, NEVER the research corpus.

- **NC1 — name-literal census (born-RED on 22).** Grep the wave-spec corpus + the proposed `src/`/`demo/`/`scripts/` file-name set + the gestalt-roster rows for the forbidden literal set `{maps, album, nowplaying, now-playing, apple-music, spotify, music-, walmart, <any registered-trademark token>}` in any WAVE NAME, GATE NAME, COMPONENT NAME, FILE NAME, CLASS NAME, TOKEN NAME, COMPOSABLE NAME, or DESCRIPTOR/SIGNATURE LITERAL. **Born-RED: the A1-A17 + B1-B4 set (22 distinct artefacts) all fire today** — until it is born-RED on the current corpus, the gate is theater (the D7 §3 floor). GREEN only after the rename map executes.
- **NC2 — no-dual-name (no-legacy).** A renamed wave's/token's OLD name MUST be ABSENT (zero `W-MAPS-CARD-EXPAND` once `W-CARD-SHEET-EXPAND` exists; zero `W-DOCK-ALBUM-STAGE`/`-FIELD` once `W-DOCK-CONTENT-FIELD` exists; zero `--maps-backdrop-dim` once `--card-expand-backdrop-dim` exists). Catches C1-C3 (the coexisting forks). A surviving old name beside its renamed form REDs (the dual-name bite — the no-legacy law).
- **NC3 — the DAG/count authority is consistent.** The authoritative net-new V-wave list (`VIZ-DAG.md:54` &c.) carries ONLY generalized names (today it carries `DOCK-ALBUM-STAGE` + `MAPS-CARD-EXPAND` — RED). A count-authority row with an old name REDs.
- **NC4 — demo-string allowlist (no trademark).** Demo CONTENT strings (chip labels, track titles) carry NO real brand/trademark (Walmart RED); generic exemplars only. The reference-analysis docs (`media-analysis.md` &c.) are EXEMPT (TIER E — the gate scopes to artefact-names + shipped-demo-content, NEVER the research corpus; a `media-analysis.md` "Walmart" stays GREEN as analysis, a `glass-card-composite.vue` "Walmart" chip label REDs).
- **NC5 — the TIER-B dock-facility fence (zero hardcoded surface-type literal in `src/components/custom/dock/`).** The dock's resting silhouette + split signatures carry NO hardcoded surface-TYPE literal (`media`/`now-playing`/`album` as a descriptor state or signature key) — a `silhouette('media')`/`DOCK_SPLIT_SIGNATURES.media` in `src/` REDs (the D9 facility fix; the geometric `lateral`/`vertical` signatures + the generic `protagonist` island stay GREEN). This is the facility fix beyond naming (`proof:dock-hub` asserts the ≥3-distinct-surface-consumer bar; this clause asserts the zero-surface-type-literal floor).
- **NC6 — self-test bite.** A planted `W-SPOTIFY-WIDGET` wave name / a `albumArt.ts` file / a `silhouette('music')` literal / a "Walmart" demo chip MUST red each respective clause.

**What reds on the pre-fix tree:** NC1 fires on 22 distinct artefacts (A1-A17 + B1-B4), NC2 fires on the C1-C3 dual-names, NC3 fires on the `VIZ-DAG.md:54` old names, NC4 fires on the Walmart literal, NC5 fires on the `media` silhouette/signature — born-RED by construction; GREEN only after the rename map + the dual-name purge + the dock-facility re-architecture + the trademark removal land.

## The binding π — (none of its own; the renamed surfaces carry their own)

This is a GENERALIZE/rename wave — it changes ZERO pixels (a rename + a dual-name purge + a descriptor-literal re-key paints no new surface). So it carries NO `proof:ba-gestalt` verdict of its own (BB inv-4 — a rename paints no new pixels; the RENAMED surfaces — the card-sheet, the protagonist pill, the protagonist aurora — carry their own gestalt verdicts in their owning waves, under their GENERALIZED names). The binding proof is the NC1-NC6 census born-RED on the 22 → GREEN at the rename, + the renamed waves' own π re-confirming their surfaces paint identically under the new names (a rename is byte-behaviour-identical — the `W-CARD-SHEET-EXPAND`/`W-AUR-PROTAGONIST`/`W-DOCK-PROTAGONIST-PILL` π read frame-identical to their pre-rename captures, the paint-equivalence the rename preserves).

## Fences

- **No-legacy / clean break (the load-bearing fence).** A rename REPLACES the old name, never forks it — zero dual-name coexistence (NC2). The old names (`W-MAPS-CARD-EXPAND`/`W-DOCK-ALBUM-STAGE`/`--maps-backdrop-dim`/`<DockNowPlaying>`/`albumPalette.ts`) are PURGED, no alias.
- **The reference informs, never names (the D7 §0 fence).** The album/Maps/now-playing reference is the EXEMPLAR ANALYSIS (recorded in the wave's prose "the X reference informs this" line + the TIER-E research docs); it must NOT become a WAVE NAME, GATE NAME, COMPONENT NAME, FILE NAME, TOKEN NAME, DESCRIPTOR LITERAL, or a baked demo content string. The research corpus (`media-analysis.md` &c.) is EXEMPT (NC4 — analysis, not a shipped name).
- **The facility-generalized fence (D7 §4).** MOST renames are MECHANICAL (the facility is already generic — `deriveAuroraPalette(source)`/`useDockLink.toSurface`/the protagonist-pill mechanism); only the NAME is overfit. The EXCEPTION is the TIER-B dock steady-state — the facility itself is overfit (the music-player layout as the dock DEFAULT), so it needs real D9 re-architecture (the `:silhouettes` pass-through hosts the consumer data) + the NC5 zero-surface-type-literal floor, not just a rename.
- **The union scope (the D7 §3 fix).** The census reaches the 61-wave union (TIER A is where the worst, file-backed, gate-backed offenders live) + the V-expansion — NOT "the V-expansion" only. A union canonical wave's app-named artefact REDs.
- **The anti-pattern this must NOT become:** a rename that FORKS the name (a dual-name coexistence — NC2 kills it), OR a census scoped to "the V-expansion" exempting the union TIER A (the D7 §3 scope error — NC1 covers the union), OR a TIER-B "rename" that leaves the `media` surface-type literal hardcoded in the dock `src/` (NC5 kills it — the facility fix, not just the name), OR a "Walmart" trademark surviving in a shipped demo (NC4 kills it).

## Disposition links

- **`viz/critique/generalize-no-hardcoded.md` (D7)** — the rename map (§2) + the properly-scoped `proof:no-hardcoded-ref` born-RED on all 22 (§3) → BUILT (the renames executed, the dual-name purged, the dock-facility re-architected, the trademark removed, the gate minted born-RED). CLOSED.
- **VIZ-FINAL-ROSTER.md §Band 14** (`W-NO-HARDCODED-REF` [D7] — finish the renames, `proof:no-hardcoded-ref` covers the UNION too, born-RED on the 22 incl. the SHIPPED `<DockNowPlaying>`/`albumPalette.ts`/`proof:maps-card`; the killed app-names `DOCK-ALBUM-STAGE`/`MAPS-CARD-EXPAND` resolve here; remove the "Walmart" trademark) → BUILT. CLOSED.
- **RESOLVES the killed app-names** `W-DOCK-ALBUM-STAGE`/`W-MAPS-CARD-EXPAND` (the dual-name forks) onto `W-DOCK-CONTENT-FIELD`/`W-CARD-SHEET-EXPAND` (the no-legacy purge).
- **RENAMES the canonical union waves** `W-MAPS-CARD`→`W-GLASS-CARD-COMPOSITE`, `W-DOCK-NOWPLAYING-PILL`→`W-DOCK-PROTAGONIST-PILL`, `W-AUR-ALBUM`→`W-AUR-PROTAGONIST` (+ their gates, library files, demo files, gestalt rows) — the artefacts ship under the GENERALIZED names.
- **SEQUENCES BEFORE** every artefact-shipping wave (`W-AUR-PROTAGONIST`/`W-DOCK-PROTAGONIST-PILL`/`W-GLASS-CARD-COMPOSITE`/`W-CARD-SHEET-EXPAND`/the dock steady-state) so the renamed names are the ONLY names built (a CROSS-PLAN edge — the renames land before the app-named artefacts ship, or those waves adopt the renamed names directly).
- **WIRES the TIER-B dock-facility fix INTO** W-DOCK-LINK-API (the `:silhouettes` pass-through hosts the consumer-supplied resting silhouette) + `proof:dock-hub` (the ≥3-distinct-surface-consumer bar + the NC5 zero-surface-type-literal floor).
