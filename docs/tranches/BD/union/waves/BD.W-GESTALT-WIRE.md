# BD.W-GESTALT-WIRE — re-point `proof:ba-gestalt` off BC onto the union tree + author the union dock-hallmark/album/Maps roster

**Band 0 (TRUTH FOUNDATION) · depends: W-FOLD-LEDGER (T0 — the no-silent-drop machine lands first; the gestalt roster's surface set is DECIDED rows, not a free-list)** — the close-oracle owner: `W-GESTALT-WIRE` re-points the SINGLE paint close-oracle off the closed BC tranche onto the BD union tree so every BD painting wave's per-wave verdict reads against the union's own roster (`EXECUTION-DAG.md:12`, `UNIFIED-ROSTER.md:21`).

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build edits `scripts/proof-ba-gestalt.mjs` (the 4 hardcoded BC paths + the G6 roster-growth scan) + AUTHORS `docs/tranches/BD/union/audit/reflect/bd-gestalt-roster.md` + the per-surface record stubs, and is user-gated. The spec is in scope now.

## The defect / the ask (Pass-D code-grounded — `EXECUTION-DAG.md:12`, the `proof:ba-gestalt` trace)

`proof:ba-gestalt` (`scripts/proof-ba-gestalt.mjs`) is the library's SINGLE close oracle for PAINT — RE-MADE a PIXEL reader at BC.W-GESTALT-FIRST (a hand-typed "PASS" over a grey/missing capture no longer greens; the pixel stats at the roster row's probe region are the operative verdict). It is `ci`-BLOCKING. Traced at HEAD it is HARDCODED to the CLOSED BC tranche:

- **The four BC paths (`:70-73`).** `REFLECT_DIR = resolve(ROOT, "docs/tranches/BC/audit/reflect")` · `ROSTER = resolve(REFLECT_DIR, "bc-gestalt-roster.md")` · `WAVES_DIR = resolve(ROOT, "docs/tranches/BC/waves")` · `TRANCHE_DIR = resolve(ROOT, "docs/tranches/BC")`. The gate reads the BC roster, scans `docs/tranches/BC/waves/*.md` + `docs/tranches/BC/**/PROGRESS*.md` for the touched-surface set (`:340-347`), and asserts every BC-touched surface is enrolled.
- **The G6 roster-growth assert is BC-scoped (`:79-…`).** G6 ("the roster MUST enroll every BC-touched surface — a surface a BC wave paints but the roster omits → RED") is mechanically derived from `docs/tranches/BC/waves/*.md`. Run UNCHANGED in BD, it asserts the BD union's surfaces against the BC roster — a category error: a BD wave painting the dock-hallmark constellation / the album-reactive pill / the Maps card has NO row in `bc-gestalt-roster.md`, so the gate either (a) greens vacuously (the BC roster is already complete for BC, no BD surface checked) or (b) the BD wave-scan finds BD surfaces the BC roster omits and REDs on the WRONG roster. Either way the close oracle is reading the wrong tranche.
- **The G8a forward-deferral regex must NARROW when the scan moves to `BD/union/waves` (Pass-D D4-close residual).** The G8a anti-disease regex (`/\brides?\s+(?:the\s+)?W-REFLECT\d/i`) flags a "rides W-REFLECT<n>" forward-deferral (a wave punting its π to a later reflect — the BB single-terminal-reflect disease). But **9 union specs legitimately carry "rides BC.W-REFLECT3"** as a BC-HISTORICAL local-π CAPTURE tag (the π was captured + verdict-self-owned at the CLOSED BC.W-REFLECT3, NOT deferred forward) — re-pointing the scan onto `BD/union/waves` would falsely RED them. The narrowing: G8a exempts a tranche-QUALIFIED historical reference (`rides BC.W-REFLECT3` / a back-reference to a CLOSED tranche's reflect) and flags ONLY a same-tranche/forward `rides W-REFLECT<n>` (the genuine deferral). This is part of this wave's re-point scope (the gate edit), not a separate wave.
- **The union surfaces are NOT in any roster.** The BD union paints surfaces NO prior tranche covered: the **dock-hallmark constellation** (the three-island stadium-pill-over-aurora, `dock/hallmark-northstar.md §1`), the **goo-split sub-dock**, the **silhouette morph**, the **liquid-tab**, the **album-reactive now-playing pill** (the plate drinks the album hue), the **Maps card** (`W-MAPS-CARD`), the V↔H **continuous teardrop morph** (`W-VH-COMPOSE`). None has a `bc-gestalt-roster.md` row. Without the re-point + the new roster, these surfaces close paint-BLIND — the exact temporally-disjoint-deferral disease the gestalt gate was built to kill.

The ask is `EXECUTION-DAG.md:12`: **re-point `proof:ba-gestalt` off BC onto the union tree** (the 4 hardcoded paths → the BD union dirs) **+ author the union dock-hallmark/album/Maps roster** (the close-oracle's surface ledger, every BD-touched surface enrolled with its probe + expect band + ground-anchor).

## The mechanism

ONE gate re-point (the 4 paths + the G6 scan) + ONE authored roster (the union surface ledger) + the per-surface record stubs.

### 1. Re-point `proof:ba-gestalt` onto the BD union tree

`scripts/proof-ba-gestalt.mjs` re-points the four hardcoded BC paths (`:70-73`) to the BD union:

- `REFLECT_DIR = resolve(ROOT, "docs/tranches/BD/union/audit/reflect")`
- `ROSTER = resolve(REFLECT_DIR, "bd-gestalt-roster.md")`
- `WAVES_DIR = resolve(ROOT, "docs/tranches/BD/union/waves")`
- `TRANCHE_DIR = resolve(ROOT, "docs/tranches/BD/union")`

The G6 roster-growth scan re-points to `docs/tranches/BD/union/waves/*.md` + `docs/tranches/BD/union/**/PROGRESS*.md` so the touched-surface set is derived from the BD union waves (not BC). The PIXEL machinery (the shared `reflect-capture-verify.mjs` leaf, the `meanChroma`/`meanL` band reader, the freshness-header `--strict-freshness` arm, the `import.meta.url` run-guard, the COLUMNS schema `[surface, routes, capture-light, capture-dark, probe, expect, verdict, ground-anchor]`) is BYTE-UNTOUCHED — only the tranche-LOCATION re-points. The de-coupling is clean: the gate's mechanism is tranche-agnostic; only its 4 path constants name a tranche.

### 2. Author `bd-gestalt-roster.md` — the union surface ledger

`docs/tranches/BD/union/audit/reflect/bd-gestalt-roster.md` is the GROWN holistic per-surface PIXEL acceptance ledger (the `bc-gestalt-roster.md` shape — the same header comment + the same COLUMNS table). It enrolls EVERY BD-union-touched surface, each owed a fresh dated LIVE-motion `:5199` capture set in BOTH modes over its real backdrop, a `probe` region + an `expect` pixel band (a `meanChroma` floor SET ABOVE the grey-slab 0.0063 + a `meanL` band SPANNING both modes), and a GESTALT verdict mechanically DERIVED from the pixels (never author-asserted prose). The carried-forward BA/BC surfaces (dock · configurators-goo · aurora · glass-feedback · shell · motion-fourier · dark-register · cross-repo · viz · tabs · controls) PLUS the NEW BD union surfaces:

| NEW union surface | the painting wave | the gestalt bar (from `dock/hallmark-northstar.md`) |
|---|---|---|
| **dock-hallmark-constellation** | `W-DOCK-INTEGRATE` / `W-DOCK-CONSTELLATION` | three DISTINCT glass bodies (wide stadium pill + 2 satellites), the recessed home `--glass-level` depth recession, deep-vs-floating material step, the whole constellation translucent over the live aurora — NOT three rounded rects in a flex row |
| **dock-goo-split-subdock** | `W-DOCK-SUBDOCK` / `W-DOCK-GOO-SPACING` | the goo-bridged sub-dock split reads as ONE liquid body splitting, the neck merges at the occluded midpoint |
| **dock-silhouette-morph** | `W-SILHOUETTE-REALIZE` | the bar/pill/split/search silhouette transitions on `--dock-silhouette-fuse-t` read as a living morph, not a hard snap |
| **dock-liquid-tab** | `W-TABS-LIQUID` | the tab indicator glides + squishes as glass, the drag-pull follows |
| **dock-nowplaying-album-pill** | `W-DOCK-NOWPLAYING-PILL` / `W-AMBIENT-TINT` | the pill plate DRINKS the album hue (a Ravel-purple album → a purple-cast plate), the title reads white over the tinted clear plate |
| **dock-vh-morph** | `W-VH-COMPOSE` | the V↔H morph reads as ONE continuous liquid teardrop melting column→row (the goo-merge at the midpoint), NOT a cross-dissolve between two static silhouettes |
| **maps-card** | `W-MAPS-CARD` | the Maps Places card reads as the iOS-27 liquid card, the glass over the live map |
| **album-aurora** | `W-AUR-ALBUM` | the album-art aurora absorbs the playlist hue + flows (the generative field reads as the reference album auroras) |

Each row carries the `probe`/`expect`/`ground-anchor` discipline: the ground-anchor is the HEAD defect the surface fixes (a grey-dock / a crossfade-facsimile / an opaque pill), so the verdict is born-RED at HEAD and flips GREEN only on a fresh capture clearing the band. The dock-hallmark rows additionally carry the FLAGSHIP overlay measure (`dock/hallmark-northstar.md`): a side-by-side overlay vs the iOS-27 reference frame at matched scale — the silhouette outline + gutter rhythm + recessed-home dim-delta + pill-translucency must MATCH within a hairline (the gestalt verdict is the overlay, not the getImageData scan alone).

### 3. The per-surface record stubs

Each enrolled surface owes a per-surface record `docs/tranches/BD/union/audit/reflect/<surface>.md` carrying the freshness header (the `--strict-freshness` arm reads it — a `live-verified` DELTA whose declared `surface-hash` drifts from its `surface-paths` REDs). The stubs are authored born-RED (anchored to the HEAD ground capture); the painting waves' π flips them GREEN at the close (the single authorized verdict-flipper per surface is its own painting wave's reflect arm, the BC.W-GESTALT-FIRST precedent).

## The gate — `proof:ba-gestalt` re-pointed (born-RED → GREEN; the union roster, the SAME pixel oracle)

`scripts/proof-ba-gestalt.mjs` (`tags: ["local","ci","release"]` — the SINGLE close oracle, ci-BLOCKING). The mechanism is byte-untouched; only the tranche paths re-point + the roster grows.

- **G-WIRE1 — the gate reads the BD union tree.** The detector (a meta-self-test bite) asserts the gate's `ROSTER`/`WAVES_DIR`/`TRANCHE_DIR`/`REFLECT_DIR` resolve under `docs/tranches/BD/union/` (NOT `docs/tranches/BC/`). A gate still reading `bc-gestalt-roster.md` REDs the re-point (the wave's own meta-assert — the close oracle cannot point at a closed tranche).
- **G-WIRE2 — every BD-union-touched surface is enrolled (the G6 roster-growth, re-pointed).** The detector scans `docs/tranches/BD/union/waves/*.md` + the union PROGRESS files for the touched-surface set and asserts each appears in `bd-gestalt-roster.md`. A BD wave painting a surface the roster omits → RED (the BB roster-never-grew gap, re-pointed). **Born-RED at HEAD** (the union surfaces are not yet enrolled — the roster is the wave's authored deliverable).
- **G-WIRE3 — the PIXEL verdict is operative (the freshness + chroma-floor teeth survive the re-point).** The detector asserts the re-pointed gate still reads the `meanChroma`/`meanL` band at each row's probe region (a hand-typed PASS over a grey-or-broken capture is not sufficient) AND the `--strict-freshness` arm reads the per-surface record's `surface-hash` (a stale capture REDs). The re-point does NOT weaken the pixel teeth (the G5-PIXEL + the freshness machinery are byte-untouched).
- **G-WIRE4 — the dock-hallmark rows carry the FLAGSHIP overlay measure.** The detector asserts the dock-hallmark/album/Maps rows carry a `ground-anchor` naming the iOS-27 reference frame + an overlay-measure declaration (the silhouette/gutter/recession match) — a dock-hallmark row that greens on the getImageData scan alone (no overlay) REDs (the merely-correct-vs-flagship trap, `dock/hallmark-northstar.md §1`).

**Self-test bites (each planted defect MUST red — sized to clear its own clause):**
- (a) a gate still resolving `docs/tranches/BC/audit/reflect/bc-gestalt-roster.md` → G-WIRE1 RED (the un-re-pointed bite).
- (b) a BD union wave painting a surface absent from `bd-gestalt-roster.md` → G-WIRE2 RED (the roster-never-grew bite).
- (c) a roster row whose probe-region pixels fall OUTSIDE the expect band typed PASS → G-WIRE3 RED (the grey-slab bite, inherited).
- (d) a dock-hallmark row with no overlay-measure declaration → G-WIRE4 RED (the merely-correct bite).

**What reds on the pre-fix tree (born-RED by construction):** G-WIRE1 (the gate reads BC), G-WIRE2 (the union surfaces are not enrolled — the roster is unauthored). GREEN only after the re-point + the authored union roster land + each painting wave flips its surface row on a fresh capture.

## The binding π — NONE owed of its own (the gate IS the π oracle)

`W-GESTALT-WIRE` is a zero-NEW-PIXEL wave: it re-points the close oracle + authors the roster, it paints no new surface (the surfaces it enrolls are painted by their OWN waves, which carry the binding captures). So it carries **NO `proof:ba-gestalt` verdict of its own** (BB inv-4 — a gate re-point + a roster authoring changes zero pixels). The roster it authors IS the π-acceptance ledger every OTHER BD painting wave's reflect arm flips; the wave's deliverable is the ORACLE, not a capture. The born-RED per-surface stubs are the anchors the painting waves flip GREEN.

## Fences

- **The PIXEL mechanism is byte-untouched — only the tranche LOCATION re-points.** The shared `reflect-capture-verify.mjs` leaf, the `meanChroma`/`meanL` band reader, the `--strict-freshness` arm, the COLUMNS schema, the `import.meta.url` run-guard are ALL byte-untouched (G-WIRE3). The wave re-points 4 path constants + the G6 scan dir — never the oracle's teeth.
- **The union roster ENROLLS every BD-touched surface — no surface closes paint-blind.** G-WIRE2 derives the surface set from the BD union waves; a BD wave painting an un-enrolled surface REDs (the temporally-disjoint-deferral disease barred). The dock-hallmark/album/Maps surfaces are the NEW enrollment the BD union forced.
- **The verdict-flipper is the surface's OWN painting wave (single-flipper-per-surface).** `W-GESTALT-WIRE` authors the born-RED roster + the per-surface stubs; it does NOT flip any verdict GREEN (the painting wave's reflect arm is the single authorized flipper — the BC.W-GESTALT-FIRST precedent; a re-point that pre-flips verdicts would re-introduce the close-class lie).
- **The dock-hallmark bar is FLAGSHIP, not merely-correct.** The dock rows carry the overlay measure vs the iOS-27 reference (G-WIRE4) — a getImageData PASS over three-rounded-rects-in-a-row is not the hallmark (`dock/hallmark-northstar.md`). The gestalt verdict is the overlay match, not the scan alone.
- **The roster fold rows are DECIDED via `W-FOLD-LEDGER`.** The surface set is not a free-list — `W-FOLD-LEDGER` (T0, the dep) decides each census row, so the roster's enrollment is the no-silent-drop machine's output, not a hand-curated list.

## Disposition links

- **`EXECUTION-DAG.md:12`** ("re-point `proof:ba-gestalt` onto the union tree + the dock-hallmark roster") → BUILT (§1 the 4-path re-point + §2 the authored union roster; G-WIRE1-G-WIRE4). CLOSED at the spec level (the build user-gated).
- **`UNIFIED-ROSTER.md:21` folds** (`BE.W-GESTALT-ROSTER-BE` · `BD.W-GESTALT-ROSTER-GROW`) → BUILT (the union roster grows to every BD-touched surface; G-WIRE2 the roster-growth). CLOSED.
- **`dock/hallmark-northstar.md`** (the flagship dock bar) → BUILT (the dock-hallmark roster rows carry the overlay measure; G-WIRE4). CLOSED.
- **depends: `W-FOLD-LEDGER` (T0)** — the no-silent-drop machine decides the census rows the roster enrolls; the surface set is DECIDED, not a free-list. Backward.
- **PREREQUISITE FOR** EVERY BD painting wave (the close-oracle owner — each painting wave's per-wave verdict reads against this roster; `EXECUTION-DAG.md:15`) · `W-PI-AUTHOR` (T0 next — the π layer the roster's captures feed). Forward.
- **CLOSE-ORACLE OWNER (`EXECUTION-DAG.md:15`)** — "`W-GESTALT-WIRE` + `W-PI-AUTHOR` are the close-oracle owners every painting wave's per-wave verdict needs."
