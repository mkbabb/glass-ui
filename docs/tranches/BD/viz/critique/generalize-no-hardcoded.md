# D7 CRITIQUE — generalize / no-hardcoded-ref (RUTHLESS name-census of the whole V-expansion + 61-wave union)

**Verdict up front: D7 is DECLARED but NOT EXECUTED.** The rename promise in `VIZ-BAND-PLAN.md:30-34` is a paragraph of intentions that is contradicted, within the SAME corpus, by the actual wave names, gate names, component names, library file names, token names, descriptor literals, and demo-string literals that survive everywhere else. The reference media did NOT stay an exemplar — it is hardcoded into the names of waves that ship to disk. `proof:no-hardcoded-ref` is named ONCE (`VIZ-BAND-PLAN.md:34`) with no clause body, no scope that reaches the union canonical waves, and no born-RED status. This is a CHALLENGE-class finding, not a polish note.

---

## 0. The structural problem: the rename was asserted, never propagated

D7 (`VIZ-BAND-PLAN.md:31-33`) names exactly THREE renames:
- `W-MAPS-CARD-EXPAND` → `W-CARD-SHEET-EXPAND`
- `W-DOCK-ALBUM-STAGE` → `W-DOCK-CONTENT-FIELD`
- `W-AUR-ALBUM` → "image/protagonist-reactive" (no concrete new name given) + `--maps-*` → `--card-expand-*`

Every one of these renames is **incomplete or self-contradicting inside the planning corpus**:

| Old (overfit) name | "Renamed to" (D7 claim) | Reality in the corpus |
|---|---|---|
| `W-MAPS-CARD-EXPAND` | `W-CARD-SHEET-EXPAND` | BOTH names live: `W-CARD-SHEET-EXPAND` ×3 AND `W-MAPS-CARD-EXPAND` ×4 in `VIZ-BAND-PLAN.md` (lines 65, 87, 95) + `VIZ-DAG.md:54` (the authoritative count) STILL lists `MAPS-CARD-EXPAND` as a net-new V-wave. Coexisting dual-name = no-legacy violation. |
| `W-DOCK-ALBUM-STAGE` | `W-DOCK-CONTENT-FIELD` | THREE names now coexist: `W-DOCK-CONTENT-FIELD` ×4, `W-DOCK-ALBUM-STAGE` ×2, `W-DOCK-ALBUM-FIELD` ×1 (`VIZ-DAG.md:54` STILL lists `DOCK-ALBUM-STAGE`; the fleet2 fold + the band-plan Fleet-2 row at line 90 retain `W-DOCK-ALBUM-STAGE`). The rename forked the name instead of replacing it. |
| `W-AUR-ALBUM` | (no new name) | NEVER renamed — 5× in the V-docs AND it is a CANONICAL union wave (`UNIFIED-ROSTER.md:80`, the wave-spec file `BD.W-AUR-ALBUM.md`, the gate `proof:aur-album`, the file `albumPalette.ts`, the gestalt row `aurora-album`). D7 gives no replacement, so this rename is a no-op by construction. |
| `--maps-*` / `--maps-backdrop-dim` | `--card-expand-*` | BOTH live (`--maps-backdrop-dim` in `VIZ-BAND-PLAN.md:87,95` + `VIZ-DAG.md:38`; `--card-expand-` exists too). The rename minted a new token name and left the old one in the spec. |

**The deeper miss:** D7 scopes `proof:no-hardcoded-ref` to "**across the V-expansion**" (`VIZ-BAND-PLAN.md:34`). That phrasing EXEMPTS the 61-wave union — which is exactly where the WORST and most load-bearing offenders live (the canonical, file-backed, gate-backed waves). A name-census that does not reach `W-MAPS-CARD` / `W-DOCK-NOWPLAYING-PILL` / `W-AUR-ALBUM` is a census aimed away from the disease.

---

## 1. THE CENSUS — every hardcoded/overfit app reference in a NAME (wave/token/component/class/composable/gate/file/literal)

### TIER A — CANONICAL union waves (ship to disk; gate-backed; the load-bearing offenders)

| # | Overfit artefact | Kind | Source | Generalized? |
|---|---|---|---|---|
| A1 | `W-MAPS-CARD` | wave name | `UNIFIED-ROSTER.md:95`, `BD.W-MAPS-CARD.md` | NO — "Maps" in the wave NAME |
| A2 | `proof:maps-card` | gate name | `BD.W-MAPS-CARD.md:43` | NO |
| A3 | `maps-card.vue` | committed demo FILE | `BD.W-MAPS-CARD.md:25,61` | NO |
| A4 | `<MapsListRow>` / `MapsListRow.vue` | committed demo COMPONENT + file | `BD.W-MAPS-CARD.md:37,92` | NO |
| A5 | `<DisclosureHeader>`/`MapsDisclosureHeader.vue` | committed demo COMPONENT + file | `BD.W-MAPS-CARD.md:35,92` | NO (file name) |
| A6 | `maps-card` | gestalt-roster ROW id | `BD.W-MAPS-CARD.md:72` | NO |
| A7 | "Work / Home / Walmart" chip labels | demo STRING literals BAKED into the build | `BD.W-MAPS-CARD.md:13,29,79` | NO — a real-brand (Walmart) literal in a shipped demo |
| A8 | `W-DOCK-NOWPLAYING-PILL` | wave name | `UNIFIED-ROSTER.md:101`, `BD.W-DOCK-NOWPLAYING-PILL.md` | NO — "now-playing" = a music-player concept |
| A9 | `proof:nowplaying-pill` | gate name | `BD.W-DOCK-NOWPLAYING-PILL.md:29` | NO |
| A10 | `<DockNowPlaying>` / `DockNowPlaying.vue` | **LIBRARY** component + file (on `/dock` + root barrel!) | `BD.W-DOCK-NOWPLAYING-PILL.md:22` | NO — this is the single worst one: an APP-NAMED component in the published library surface |
| A11 | `nowplaying-pill` | gestalt-roster ROW id | `BD.W-DOCK-NOWPLAYING-PILL.md:53` | NO |
| A12 | `dock-nowplaying.vue` | demo file (the dock π surface across CONSTELLATION/SUBDOCK/LINK-API) | `BD.W-DOCK-CONSTELLATION.md:44`, `BD.W-DOCK-SUBDOCK.md:44` | NO |
| A13 | `W-AUR-ALBUM` | wave name | `UNIFIED-ROSTER.md:80`, `BD.W-AUR-ALBUM.md` | NO |
| A14 | `proof:aur-album` | gate name | `BD.W-AUR-ALBUM.md:27` | NO |
| A15 | `deriveAuroraPalette` + `albumPalette.ts` | **LIBRARY** composable + file (on `/aurora`!) | `BD.W-AUR-ALBUM.md:17` | PARTIAL — `deriveAuroraPalette(source)` IS generalized (takes image/url/canvas), but the FILE is `albumPalette.ts` and the wave/gate carry "album" |
| A16 | `aurora-album` | gestalt-roster ROW id | `BD.W-AUR-ALBUM.md:54` | NO |
| A17 | `useAuroraProtagonist(mediaRef)` | demo composable + the `mediaRef` param NAME | `BD.W-AUR-ALBUM.md:22` | PARTIAL — "protagonist" is generic ✓, but `mediaRef` leaks "media" |

### TIER B — the DOCK STEADY-STATE hardcoded to a music player (the D9 contradiction)

The dock is supposed to be a GENERALIZED CENTRAL HUB (D9). Instead its resting silhouette, its split signature, and its π surfaces are hardcoded to a now-playing/album/media player:

| # | Overfit artefact | Kind | Source | The D9 violation |
|---|---|---|---|---|
| B1 | `[home·now-playing·search]` three-island steady-state | the dock's DEFAULT resting silhouette | `BD.W-DOCK-CONSTELLATION.md:1,7` | The dock's STEADY STATE is hardcoded to a music player's island layout. A generalized hub's resting silhouette is `[N generic islands]`, content-agnostic. |
| B2 | `silhouette('media')` / `setSilhouette('media')` literal | descriptor STATE id | `BD.W-DOCK-LINK-API.md:61`, `BD.W-DOCK-CONSTELLATION.md:21` | The silhouette state machine carries a literal `media` state — a hardcoded surface type, the exact thing D9 forbids ("no surface-type hardcoded in the dock"). |
| B3 | `DOCK_SPLIT_SIGNATURES.media` (`media`=lateral signature) | a NAMED split signature | `BD.W-DOCK-SUBDOCK.md:15`, `BD.W-DOCK-CONSTELLATION.md:21` | The fission orchestrator hardcodes a `media` signature. A generalized split signature is geometric (`lateral`/`vertical`/`n-ary`), not content-named. |
| B4 | `dock-constellation` / `dock-subdock` gestalt rows whose verdict is "the now-playing dock at REST" / "the media control goo-splits" | gestalt-roster ROW ids + verdicts | `BD.W-DOCK-CONSTELLATION.md:52`, `BD.W-DOCK-SUBDOCK.md:52` | The dock-hub gestalt VERDICT is judged against a music player, not against "an arbitrary surface hub." |
| B5 | `--dock-constellation-*` / `--dock-subdock-*` tokens | dock geometry tokens | `BD.W-DOCK-CONSTELLATION.md:58`, `BD.W-DOCK-SUBDOCK.md:58` | `constellation`/`subdock` are OK (generic spatial terms ✓) — these are NOT overfit. Listed to show the fence-line: the geometry tokens generalized correctly; the SEMANTIC names (now-playing/media) did not. |

### TIER C — the V-expansion band-plan/DAG dual-name + token residue (no-legacy violations)

| # | Overfit artefact | Source | Status |
|---|---|---|---|
| C1 | `W-MAPS-CARD-EXPAND` (×4) coexisting with `W-CARD-SHEET-EXPAND` (×3) | `VIZ-BAND-PLAN.md:65,87,95`; `VIZ-DAG.md:54` | dual-name; old name un-purged |
| C2 | `W-DOCK-ALBUM-STAGE` (×2) + `W-DOCK-ALBUM-FIELD` (×1) coexisting with `W-DOCK-CONTENT-FIELD` (×4) | `VIZ-BAND-PLAN.md:63,90`; `VIZ-DAG.md:54` | triple-name |
| C3 | `--maps-backdrop-dim` token | `VIZ-BAND-PLAN.md:87,95`; `VIZ-DAG.md:38` | un-renamed (D7 said `→ --card-expand-*`) |
| C4 | "album-art field" / "live album-art field" prose in DAG wave descriptions | `VIZ-DAG.md:35,48` | informational-prose (TIER E-tolerable, but the wave it describes is `W-DOCK-CONTENT-FIELD` whose CONSUMED `W-AUR-ALBUM(union)` is itself overfit) |

### TIER D — EXEMPT (correctly generalized — the fence held here)

These are NOT findings; they prove the generalization CAN be done and is done in places:
- `W-DOCK-LINK-API` / `useDockLink.toSurface(controlRef, surfaceRef)` — **genuinely surface-agnostic** (takes any `Ref<HTMLElement>` + preset; the surface owns its own content). This is the D9 model done right. (`BD.W-DOCK-LINK-API.md:22`)
- `W-COLOR-PROTAGONIST` / `<AuroraProtagonist :seed>` / `W-COLOR-CARD` / `W-SEED-MORPH` — "protagonist"/"color-card"/"seed-morph" are generic design concepts ✓ (birthdaycolor.com is the exemplar, never named in an artefact).
- `--dock-constellation-*` / `--dock-subdock-*` / `W-DOCK-SUBDOCK` / `W-DOCK-CONSTELLATION` (the STADIUM-PILL geometry) — spatial/geometric terms, content-agnostic ✓.
- `useEmotionalState` / `useLavaField` / `W-DOT-IMAGE` / `W-FIELD-ENGINE` — fully generic ✓.

### TIER E — TOLERABLE (reference/analysis docs, NOT names that ship)

`media-analysis.md`, `live-audit.md`, `CONVERGENCE.md`, the `fleet2/` research docs — these are ALLOWED to name "Apple Maps / Apple Music / Your Essentials / Walmart" because they are the EXEMPLAR ANALYSIS that informs the spec. The fence (D7) is: the reference informs the spec; it must not become a NAME. The `vid-dock`/`vid-aurora` frame analyses are correct as research. The ONLY caveat: `media-analysis.md:17` carries "Work brown / Home blue / Walmart yellow" — that is fine AS analysis, but it MUST NOT flow into `maps-card.vue` as literal chip labels (A7), which the wave spec currently does (`BD.W-MAPS-CARD.md:29` names "Work / Home / Walmart" as the four built chips).

---

## 2. THE RENAME MAP (the binding remediation — every TIER A/B/C artefact)

The generalized concept is named FIRST; the exemplar is recorded ONLY in the wave's prose "the X reference informs this" line.

### Waves
| Overfit | → Generalized | Concept |
|---|---|---|
| `W-MAPS-CARD` | **`W-GLASS-CARD-COMPOSITE`** | the frosted-glass-card composite (card + filled chips + search-pill-with-avatar + floating control discs + disclosure headers + glass list-rows) — an iOS-27 glass card assembly, content-agnostic |
| `W-MAPS-CARD-EXPAND` | **`W-CARD-SHEET-EXPAND`** (already in D7 — PURGE the old name) | the compact-card→full-sheet liquid grow |
| `W-DOCK-NOWPLAYING-PILL` | **`W-DOCK-PROTAGONIST-PILL`** (or `W-DOCK-CONTENT-PILL`) | the dock's content-reactive protagonist pill — a leading art/icon-chip + marquee title + live control, plate-tints to the protagonist's dominant hue |
| `W-AUR-ALBUM` | **`W-AUR-PROTAGONIST`** | the image/protagonist-reactive aurora (the field absorbs the protagonist image's dominant hue) |
| `W-DOCK-ALBUM-STAGE` / `W-DOCK-ALBUM-FIELD` | **`W-DOCK-CONTENT-FIELD`** (already in D7 — PURGE both old names) | the dock live-tracks whatever field/content is behind it |

### Gates
| Overfit | → Generalized |
|---|---|
| `proof:maps-card` | `proof:glass-card-composite` |
| `proof:nowplaying-pill` | `proof:protagonist-pill` |
| `proof:aur-album` | `proof:aur-protagonist` |

### Library components/files/composables (the most important — these SHIP)
| Overfit | → Generalized |
|---|---|
| `<DockNowPlaying>` / `DockNowPlaying.vue` (lib, `/dock`+barrel) | **`<DockProtagonistPill>`** / `DockProtagonistPill.vue` (or `<DockContentPill>`) |
| `deriveAuroraPalette` (✓ already generic signature) | KEEP the function name (`deriveAuroraPalette(source)` is fine) but rename the FILE `albumPalette.ts` → **`imagePalette.ts`** |
| `useAuroraProtagonist(mediaRef)` | KEEP `useAuroraProtagonist` ✓ (generic) but rename the param `mediaRef` → **`protagonistRef`** |

### Demo files/components
| Overfit | → Generalized |
|---|---|
| `maps-card.vue` | `glass-card-composite.vue` |
| `<MapsListRow>` / `MapsListRow.vue` | `<GlassListRow>` / `GlassListRow.vue` |
| `MapsDisclosureHeader.vue` (`<DisclosureHeader>` already generic ✓) | `DisclosureHeader.vue` (drop the `Maps` file prefix) |
| `dock-nowplaying.vue` | `dock-protagonist.vue` |
| "Work / Home / Walmart / Add" chip labels | generic exemplar set with NO real brand — e.g. "Work / Home / Studio / Add" (no Walmart) |

### Gestalt-roster row ids
| Overfit | → Generalized |
|---|---|
| `maps-card` | `glass-card-composite` |
| `nowplaying-pill` | `protagonist-pill` |
| `aurora-album` | `aurora-protagonist` |

### Descriptor / signature literals (TIER B — the D9 fix)
| Overfit | → Generalized |
|---|---|
| `silhouette('media')` / `setSilhouette('media')` | `silhouette('protagonist')` (or a generic island-count descriptor; the silhouette state must NOT name a surface TYPE per D9) |
| `DOCK_SPLIT_SIGNATURES.media` | `DOCK_SPLIT_SIGNATURES.lateral` (a geometric signature, already implied — "`media`=lateral" — so name it `lateral`) |
| `[home·now-playing·search]` three-island steady-state | `[N generic islands]` — the dock's resting silhouette is content-agnostic; "home/search" are OK as DEMO content, "now-playing" must be a generic protagonist island |

### Tokens
| Overfit | → Generalized |
|---|---|
| `--maps-backdrop-dim` | `--card-expand-backdrop-dim` (D7 already mandates `--maps-* → --card-expand-*` — execute the purge) |

---

## 3. THE GATE — `proof:no-hardcoded-ref` (spec it properly; D7 leaves it a stub)

D7 names the gate in one phrase with no body. A real gate:

- **Scope = the WHOLE tranche, NOT "the V-expansion."** The census MUST reach the union canonical waves (TIER A is where the worst offenders live). Re-word D7's "across the V-expansion" → "across every wave/token/component/class/composable/gate/file/demo-string in the union + V-expansion."
- **NC1 — name-literal census.** Grep the wave-spec corpus + the proposed `src/`/`demo/`/`scripts/` file-name set for the forbidden literal set `{maps, album, nowplaying, now-playing, apple-music, spotify, music-, walmart, <any registered-trademark token>}` in any WAVE NAME, GATE NAME, COMPONENT NAME, FILE NAME, CLASS NAME, TOKEN NAME, COMPOSABLE NAME, or DESCRIPTOR/SIGNATURE LITERAL. Born-RED: the A1-A17 + B1-B5 set all fire today.
- **NC2 — no-dual-name (no-legacy).** A renamed wave's OLD name MUST be ABSENT (zero `W-MAPS-CARD-EXPAND` once `W-CARD-SHEET-EXPAND` exists; zero `W-DOCK-ALBUM-STAGE`/`-FIELD` once `W-DOCK-CONTENT-FIELD` exists). Catches C1-C3 (the coexisting forks).
- **NC3 — the DAG/count authority is consistent.** `VIZ-DAG.md:54`'s net-new V-wave list MUST carry only generalized names (today it carries `DOCK-ALBUM-STAGE` + `MAPS-CARD-EXPAND` — RED).
- **NC4 — demo-string allowlist.** Demo CONTENT strings (chip labels, track titles) carry NO real brand/trademark (Walmart RED); generic exemplars only. The reference-analysis docs (`media-analysis.md` &c.) are EXEMPT (TIER E) — the gate scopes to artefact-names + shipped-demo-content, never the research corpus.
- **NC5 — self-test bite.** A planted `W-SPOTIFY-WIDGET` wave name / a `albumArt.ts` file / a `silhouette('music')` literal MUST red.
- **Born-RED today** (NC1 fires on 22 distinct artefacts: A1-A17 + B1-B5). Until it is born-RED on the current corpus, the gate is theater.

---

## 4. THE FACILITY-GENERALIZED / REFERENCE-INFORMS verification

The good news, stated honestly: in MOST cases the FACILITY is already generalized and only the NAME is overfit — the rename is mechanical, the engineering is sound:
- `deriveAuroraPalette(source: image|url|canvas)` is genuinely image-agnostic; only the file/wave/gate names say "album."
- `useDockLink.toSurface(controlRef, surfaceRef)` is genuinely surface-agnostic (D9 done right).
- the `<DockProtagonistPill>` mechanism (art-chip + marquee + plate-tint-to-dominant-hue) is content-agnostic — a "now-playing" pill, a "current-document" pill, a "selected-color" pill all use the SAME facility; only the name overfits.

The EXCEPTION where the FACILITY itself (not just the name) is overfit: **the dock steady-state (TIER B).** `[home·now-playing·search]` as the dock's DEFAULT resting silhouette, `DOCK_SPLIT_SIGNATURES.media`, and `silhouette('media')` are hardcoded surface TYPES inside the dock — the precise thing D9 forbids ("no surface-type hardcoded in the dock; ≥3 distinct surface consumers prove the generality"). The fix is not just a rename: the dock's resting silhouette + split signatures must be DATA the consumer supplies (a `silhouettes` descriptor array — which `W-DOCK-LINK-API`'s `:silhouettes` pass-through ALREADY provides!), and the music-player layout becomes ONE demo consumer of that data, never the library default. `proof:dock-hub` (D9's gate) must assert ≥3 DISTINCT surface consumers and zero hardcoded surface-type literal in `src/components/custom/dock/` — today the `media` signature + `now-playing` silhouette would red it.

---

## VERDICT (5-7 lines)

D7 is **DECLARED, NOT EXECUTED** — a CHALLENGE-class gap. The rename promise (`VIZ-BAND-PLAN.md:31-34`) is contradicted within the same corpus: `W-MAPS-CARD-EXPAND` and `W-DOCK-ALBUM-STAGE` COEXIST with their "renamed" forms (`VIZ-DAG.md:54`, the authoritative count, still lists BOTH old names), `W-AUR-ALBUM` was never renamed at all, and `--maps-backdrop-dim` survives — a no-legacy dual-name violation. The census found **22 overfit artefacts in NAMES** (not prose): canonical waves (`W-MAPS-CARD`/`W-DOCK-NOWPLAYING-PILL`/`W-AUR-ALBUM`), gates (`proof:maps-card`/`proof:nowplaying-pill`/`proof:aur-album`), **LIBRARY** components/files that SHIP (`<DockNowPlaying>` on `/dock`+barrel, `albumPalette.ts` on `/aurora`), demo files (`maps-card.vue`/`<MapsListRow>`), and a real-trademark literal ("Walmart") baked into the demo. Worse, D7's own `proof:no-hardcoded-ref` is scoped to "the V-expansion" — EXEMPTING the union canonical waves where the worst offenders live. The dock band is a D9 violation beyond naming: `[home·now-playing·search]` is the dock's DEFAULT resting silhouette and `DOCK_SPLIT_SIGNATURES.media`/`silhouette('media')` hardcode surface TYPES inside the dock — the exact thing D9 forbids; the facility (not just the name) must become consumer-supplied DATA. The rename map (§2) + the properly-scoped `proof:no-hardcoded-ref` born-RED on all 22 (§3) are the binding remediation; most facilities are already generalized (the rename is mechanical) EXCEPT the dock steady-state, which needs real D9 re-architecture (the `:silhouettes` pass-through already exists to host it).
