# BI cross-repo asks + consumes (the 5.0.0 cut relay)

The foreign-tree fence (inv-26) is literal: glass-ui edits ZERO sibling files. Every break is a by-name ask; the sibling owns its own edit. This roster ADOPTS the audit's XR-9 relay carry list (`docs/tranches/BI/audit/ROUND-2B-DIGEST.md §XR-9`) as the single BI outbound roster — every row PAIRS a subpath fix with the kf `^5.2.0` + value `^3.1.0` peer bump, because the 5.0.0 `/api`-drop break is LATENT: it manifests per-consumer at their `^5` bump, and a subpath fix alone leaves an unsatisfiable value.js peer floor. The asks issue at the 5.0.0 cut; the cut stays USER-gated.

The BI cut is **5.0.0 — one major** (repairs + greenfields + the structure flatten), publish AUTHORIZED by the owner; the dated Decision-0 outbound (atlas's §6 reciprocal) + the answers to atlas asks #21-25 ride `atlas-outbound-2026-07-12-decision-0.md` beside this roster.

## The 5.0.0 export break, exactly (carried forward from the BH roster)

One dropped key — **`./api`** — and its 203 symbols re-home onto their owning subpaths. Every other published key is preserved. The two live `/api` break sites (rows 1-2) are already BH-gate-covered (`proof:crossrepo-asks:bh`) and carry FORWARD onto this BI roster unchanged. Beyond `/api` the 5.0.0 cut carries three non-`/api` vectors already on the BH roster (the `--ring`→`--focus-ring-color` rename, the `--glass-blur-dock` token-retire, the atlas `.text-gilt` MIGRATION row) plus the BI-owned pin-guard hazard (below) and the value.js `goo-blob`→`blob` demo carry (filed by `BI.W-BLOB-RENAME-LAND`).

## The peer floor — the PAIRED bump (the XR-9 lockstep)

glass-ui 5.0.0's `peerDependencies` floor is **kf `^5.2.0` / value `^3.1.0`** (`package.json:1108`/`:1110`). Every subpath-fix ask below PAIRS its import re-point with a `@mkbabb/keyframes.js → ^5.2.0` + `@mkbabb/value.js → ^3.1.0` bump in the SAME edit — a subpath fix that lands without the paired peer bump leaves the consumer on a value `^1.2.0` (or older) floor the 5.0.0 peer cannot satisfy. This pairing is the binding discipline the gate `proof:crossrepo-asks:bi` asserts on every subpath-fix row.

## The pin-guard — the cut-day HARD pre-publish blocker (XR-6 / FR-4, BI-owned)

Two siblings carry glass-ui version ranges that resolve 5.0.0 WITHOUT an intentional bump — and each pins value at `^1.2.0`, BELOW the 5.0.0 value `^3.1.0` peer floor. Unaddressed, the 5.0.0 publish auto-resolves into an unsatisfiable value.js peer (and any concurrent public-surface change — a retire, the `/api` drop — then breaks the consumer UNANNOUNCED). The pin-guard binds BOTH ranges to `^5.0.0` and bumps value to `^3.1.0` IN LOCKSTEP, filed as a HARD blocker the USER-gated 5.0.0 tag inherits: the ranges must be bound in the siblings (or their maintainers ACK the bound) BEFORE any 5.0.0 publish.

Sites verified read-only at HEAD (`2026-07-12`; glass-ui reads the siblings as version AUTHORITY, edits nothing):

| Sibling | Pin site (verified read-only) | glass-ui range at HEAD | value.js at HEAD | The pin-guard ask (LOCKSTEP) |
|---|---|---|---|---|
| **sci-report** | `sci-report/app/package.json:17` (dependencies) | `>=4.2.0` — the OPEN range; auto-resolves 5.0.0 on next install | `^1.2.0` (`:20`) | `sci-report-pin-guard-5xx-lockstep` — bind glass-ui `>=4.2.0` → `^5.0.0` AND value `^1.2.0` → `^3.1.0` in ONE edit; HARD pre-publish blocker |
| **atlas** | `atlas/package.json:101` (peerDependencies `^4.2.0`) + `:124` (devDependencies `4.2.0` exact) | `^4.2.0` + `4.2.0` — bounded `<5.0.0` today; the hazard fires the moment atlas bumps to consume 5.0.0 | `^1.2.0` (`:104` peer / `:127` dev) | `atlas-pin-guard-5xx-lockstep` — bind glass-ui `^4.2.0`/`4.2.0` → `^5.0.0` AND value `^1.2.0` → `^3.1.0` in ONE edit; HARD pre-publish blocker |

**Read-only site correction (spec-vs-HEAD).** The mandate framed "atlas + sci-report carry OPEN `>=4.2.0`". At HEAD the truly-OPEN auto-resolving range is **sci-report** (`app/package.json:17` `>=4.2.0`); **atlas** carries `^4.2.0` + `4.2.0` (both bounded `<5.0.0`), so atlas does NOT auto-resolve 5.0.0 — its hazard is the lockstep-miss on its intentional bump (glass-ui bumped, value left at `^1.2.0`). The pin-guard stands for BOTH; the AUTO-RESOLVE urgency is sci-report's. The spec's assumed `atlas/app/package.json` pin does NOT exist at HEAD — atlas's app-level exact pin lives in `atlas/package.json:124` (same file, devDeps block).

## Asks — the BI outbound roster (XR-9 adopted; PAIRED peer bump on every subpath-fix row)

Row grammar: *sibling · trigger (the consumer site / range) · the ask · disposition · the paired peer bump*. Cut-fixed rows (1-6) issue at the 5.0.0 cut. BI-proposal-gated rows (7-11) are born-RED and file when their owning wave's fold/retire lands — NOTED here for roster wholeness, owned by the named wave.

| # | Sibling | Trigger (site / range) | The ask | Disposition | Paired peer bump | Primary witness |
|---|---|---|---|---|---|---|
| 1 | **speedtest** | `src/features/speedtest/ui/PhaseTimeline.vue:52` `import type { TimelineSegment } from "@mkbabb/glass-ui/api"` | `migrate-api-to-timeline` — re-point `TimelineSegment` → `@mkbabb/glass-ui/timeline`; drop the dead `vite.config.mjs` optimizeDeps `/api` string same edit | CUT-FIXED (5.0.0); BH-gate-covered | kf `^5.2.0` + value `^3.1.0` (paired) | `proof:crossrepo-asks:bh` + this roster |
| 2 | **muster** | `frontend/src/composables/useAuroraConfig.ts:47` `import { DEFAULT_AURORA_CONFIG, type AuroraConfig } from "@mkbabb/glass-ui/api"` | `migrate-api-to-aurora` — re-point `DEFAULT_AURORA_CONFIG`/`AuroraConfig` → `@mkbabb/glass-ui/aurora` | CUT-FIXED (5.0.0); BH-gate-covered | kf `^5.2.0` + value `^3.1.0` (paired) | `proof:crossrepo-asks:bh` + this roster |
| 3 | **atlas** | `--ring` bare token (12 bare / 11 files; GU-3 ASK-B) | `migrate-ring-to-focus-ring-color` — token rename, no back-compat alias (clean break) | CUT-FIXED (5.0.0); BH-gate-covered | kf `^5.2.0` + value `^3.1.0` (paired with the range bump, row 4) | `proof:crossrepo-asks:bh` + MIGRATION.md rename ROW |
| 4 | **bbnf-buddy** | `bbnf-buddy/src/styles/preset.css:230` live `--glass-blur-dock` override | `bbnf-glass-blur-dock-retune-no-op` — drop the dead override (the retired token resolves to its composed default) | CUT-FIXED (5.0.0); BH-gate-covered | kf `^5.2.0` + value `^3.1.0` (paired) | MIGRATION.md `--glass-blur-dock` retire ROW + `proof:crossrepo-asks:bh` |
| 5 | **atlas** | `atlas/src/editorial/DashboardHero.vue:310` + `atlas/src/charts/glyph/Glyph.vue:181` dead `.text-gilt` class | `migrate-text-gilt-to-gold-shimmer` — re-point the two dead-class sites onto `.gold-shimmer` (the BB.W-METAL-SHIMMER gold text-clip register; `.text-gilt` never shipped by glass-ui) | STILL-OPEN at-cut MIGRATION row (ATLAS-N); issues at 5.0.0 | kf `^5.2.0` + value `^3.1.0` (paired with the atlas range bump) | this roster + MIGRATION.md |
| 6 | **atlas** + **sci-report** | atlas `package.json:101`/`:124` (`^4.2.0`/`4.2.0`), sci-report `app/package.json:17` (`>=4.2.0`); value `^1.2.0` both | the PIN-GUARD (`atlas-pin-guard-5xx-lockstep`, `sci-report-pin-guard-5xx-lockstep`) — bind glass-ui → `^5.0.0` AND value → `^3.1.0` in LOCKSTEP | CUT-FIXED; **HARD pre-publish blocker** (bound BEFORE any 5.0.0 publish) | value `^1.2.0` → `^3.1.0` IS the lockstep half; kf → `^5.2.0` | this roster + `proof:crossrepo-asks:bi` |
| 7 | **value.js** (demo) | 5 sites: `demo/color-picker/composables/boot/useAtmosphere.ts:36`; `demo/@/components/custom/panes/BlobPane.vue:12,13`; `demo/@/components/custom/color-picker/visual/HeroBlob.vue:71,72` — `GooBlob`/`BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS`/`BlobConfig` from `@mkbabb/glass-ui/goo-blob` | `value-blob-rename-5site` — re-point `/goo-blob` → `/blob` + `GooBlob` → `Blob` (the clean-break rename, no alias) | BI-proposal-gated; born-RED, issues when **`BI.W-BLOB-RENAME-LAND`** lands the rename; the file-linked value.js demo (NOT consumer-free) migrates on its own bump | kf `^5.2.0` + value `^3.1.0` (paired) | this roster + `proof:crossrepo-asks:bi` X3 (owning wave `BI.W-BLOB-RENAME-LAND` W5) |
| 8 | **atlas** ×3 · **sci-report** ×2 | glass-panel usage (5 sites / 2 repos) | glass-panel RETIRE → `Card`/`glass-resting` class | BI-proposal-gated; born-RED, file when **`BI.W-FOLD-GLASSPANEL`** lands | kf `^5.2.0` + value `^3.1.0` (paired) | owning wave `BI.W-FOLD-GLASSPANEL` |
| 9 | **atlas** | `atlas/src/.../EasterEgg.vue:44` hover-popover | hover-popover FOLD → hover-card keep-open axis | BI-proposal-gated; born-RED, file when **`BI.W-HOVERPOP-FOLD`** lands | kf `^5.2.0` + value `^3.1.0` (paired) | owning wave `BI.W-HOVERPOP-FOLD` |
| 10 | **speedtest** · **muster** · **sci-report** | metric-cell/metric-stack/metric-badge/instrument-chassis across 3 repos (per-site table in XR-9) | metric-family move (IF landed) — a 3-repo public surface, NOT speedtest-only | BI-proposal-gated; born-RED, file when **`BI.W-metric-move`** lands | kf `^5.2.0` + value `^3.1.0` (paired) | owning wave (metric-move) |
| 11 | **slides** · **atlas** | `/constellation` (slides `constellation.ts:14,40` + atlas `Constellation.host.vue:64,65`); `/fourier-field` (slides `Slide01.vue:10`, `Slide05.vue:23`) | viz-subpath migration (IF `/constellation` or `/fourier-field` deleted/renamed) | BI-proposal-gated; born-RED, file when the D-VIZ / B9-S5 owner lands it — the BH roster's slides-only attribution is INCOMPLETE (atlas is a 2nd `/constellation` consumer) | kf `^5.2.0` + value `^3.1.0` (paired) | D-VIZ / B9-S5 owning wave |

**Row-filter EXCLUSIONS (no BI outbound ask owed).** `/concentric`, `/dot-flow-field`, `/dot-matrix`, `/liquid-grid`, `/goo-dot-matrix` = ZERO external consumers (safe breaking export-key drops, MAJOR-cut items per FAM-13, no ask). The renamed-internal subpaths `/canvas`, `/motion-curves`, `/fourier-math` are name≠dir internal renames (key unchanged) — no ask. value.js's own producer-red register (aurora/blob/dock/glass-ladder/slider design-reds + the `mixColors` convention coupling, `valuejs-inbox-2026-07-12-u-formation.md`) is a DIFFERENT register — design-reds on the surfaces value.js CONSUMES, NOT a `/api` migration ask value.js must migrate around; correctly NOT on this export-break roster.

## The value.js co-migration (the §3 U-F77 co-land — informational, no BI action)

value.js consumes glass-ui 5.0.0 at the cut (satisfying our `^3.1.0` value peer floor — value.js ships `3.1.0`), and value.js's own U-F29/U-F30 library-correctness cut CO-LANDS under the U-F77 ordering so both `^3.1.0` peer floors (glass-ui + keyframes.js) land coherently. The `mixColors`/`sampleColorRamp`/`color2` raw-channel convention (read directly by `border-progress/composables/spectrum-walk.ts:22,58,90`, BYPASSING `toString`) is the one glass-relevant delta a value.js cut could shift with no born-RED on our surface: value.js's design loop PREFERS the invariant-PRESERVING fix (touch only `toString`/serialization — the raw channel convention held), so our spectrum-walk raw read is the safe default; IF a convention change is instead chosen it CO-LANDS with our spectrum-walk migration in the same window, never silently shipped. NO BI action owed until the value.js cut is on the table. glass-ui imports ZERO `parseCSSValue` (the U-F29 reshape is unconsumed).

## Census (live consumers — keys preserved unless noted)

- **atlas** — glass-ui `^4.2.0`/`4.2.0`, value `^1.2.0` (pin-guard row 6); `--ring` (row 3), `.text-gilt` (row 5), glass-panel (row 8), hover-popover (row 9), `/constellation` (row 11). Zero `/api`.
- **sci-report** — glass-ui `>=4.2.0` OPEN, value `^1.2.0` (pin-guard row 6 — the auto-resolve hazard); glass-panel (row 8), metric-family (row 10). Zero `/api`.
- **speedtest** — glass-ui `^4.0.1`, kf `^4.3.0`, value `^0.13.0`; `/api` (row 1, `TimelineSegment`), metric-family (row 10). The paired peer bump (rows 1/10) lifts kf → `^5.2.0` + value → `^3.1.0`.
- **muster** — glass-ui `^3.1.0`, value `^0.10.0`; `/api` (row 2, `AuroraConfig`), metric-family (row 10), instrument-chassis. The paired peer bump lifts value → `^3.1.0`.
- **bbnf-buddy** — /dock, /sortable-list, /dark, /toggle-chip, /tabs, /controls; the `--glass-blur-dock` token-retire (row 4). Zero `/api`.
- **slides** — /deck, /dock, /controls, /button, /forms, /separator, /popover, /dialog, /constellation, /fourier-field (row 11). glass-ui 3.13.0 + kf `^3.0.0` today; its migration onto the primitives is a slides-side concern.
- **value.js** (demo) — `/goo-blob` ×5 (row 7); consumes glass-ui 5.0.0 at the cut (value `^3.1.0`).

## Disposition notes (no ask)

- **`words/frontend/glass-ui/`** is a vendored d6 fork (package name `@mkbabb/glass-ui`), NOT a registry consumer — an inv-11 lineage note, not a BI row.
- The **B1c CONSUME interims** (kf `DragOptions.snap`, value.js `oklchSpectrum`, the viz `Oscillator`) are met at the pinned kf/value floors — ZERO upstream asks.

## The content-only foreign-tree fence (inv-26, by construction)

glass-ui edits ZERO sibling files. Every wave File Bound of `BI.W-PRECUT-XR-ASKS` is UNDER the glass-ui tree — no `../atlas/…`, `../sci-report/…`, `../speedtest/…`, `../muster/…`, `../value.js/…`, `../slides/…`, or `../bbnf-buddy/…` path. Each sibling resolves the built `dist/` on its own bump (contract-v2 — no glass-ui gate probes a sibling tree; the killed `proof:retired-token-consumers` sibling raw-grep ran this fence backwards and is NOT re-introduced here). The pin-guard, the `.text-gilt` rename, the `/api` re-point, and the value.js blob 5-site are ALL sibling edits the sibling repos own; glass-ui files the ask rows only. `proof:crossrepo-asks:bi` asserts the roster RECORDS the fence + covers the roster; it never probes a sibling.
