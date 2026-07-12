# BI.W-PRECUT-XR-ASKS — the pre-cut peer pin-guard + the BI crossrepo roster

Band B0 (cut-blocker; cross-repo, foreign-tree fence). Born-RED at HEAD.

## Mandate

- **FAM-17 XR-6 [P2] / FR-4 [P1]**: atlas + sci-report carry OPEN `@mkbabb/glass-ui: >=4.2.0` ranges that AUTO-RESOLVE the 5.0.0 publish on next install, creating an unsatisfiable value.js peer (they pin value `^1.2.0` vs the 5.0.0 peer floor value `^3.1.0`). "A cut-day hazard requiring pin-guard asks BEFORE any publish." NOT YET A FILED GLASS ASK.
- **FAM-1 / XR-2**: the `/api` break (2 sites: speedtest `PhaseTimeline.vue:52` `TimelineSegment`→`/timeline`; muster `useAuroraConfig.ts:47` `AuroraConfig`/`DEFAULT_AURORA_CONFIG`→`/aurora`) — already gate-covered on the BH roster; CARRIED FORWARD into the BI cut roster.
- **XR-9**: the complete BI outbound relay carry list, each ask PAIRING a subpath fix with the kf `^5.2.0` + value `^3.1.0` peer bump.
- **ATLAS-N**: the `.text-gilt`→`.gold-shimmer` still-open MIGRATION-row ask (atlas `DashboardHero.vue:310` + `Glyph.vue:181` carry a dead class).

## Design

Verified foreign pins at HEAD (read-only): `atlas/package.json` glass-ui `>=4.2.0` + value `^1.2.0`; `atlas/app/package.json` `^4.2.0` + value `^1.2.0`; `sci-report/app/package.json` `4.2.0` + value `^1.2.0`. glass-ui 5.0.0's `peerDependencies` floor is kf `^5.2.0` / value `^3.1.0`. The OPEN `>=4.2.0` range (atlas) means atlas consumes 5.0.0 WITHOUT an intentional bump — its imports resolve (present at 5.0.0) but the value `^1.2.0` peer floor breaks (and the proposed glass-panel retire, B2, then breaks it unannounced).

Per the foreign-tree fence (inv-26) glass-ui edits ZERO sibling trees — the ONLY channel is the by-name ASK. This wave:
1. **Establishes the BI crossrepo roster** (`docs/tranches/BI/coordination/asks-and-consumes.md`) adopting XR-9 as the BI outbound carry list — every row PAIRS a subpath fix with the kf `^5.2.0` + value `^3.1.0` peer bump.
2. **Files the pin-guard ask** — bound atlas + sci-report glass-ui ranges to `^5.0.0` + bump value to `^3.1.0` in LOCKSTEP; a HARD cut-day blocker filed BEFORE any 5.0.0 publish.
3. **Files the `.text-gilt`→`.gold-shimmer`** atlas MIGRATION-row ask (2 dead-class sites).
4. **Carries forward** the `/api` migration asks (speedtest/muster, already BH-gate-covered) + the value.js blob-rename carry (filed by `BI.W-BLOB-RENAME-LAND`) onto the ONE BI roster.

Content-only: glass-ui reads the siblings as version/response AUTHORITY, edits nothing. The 5.0.0 tag stays USER-GATED.

## Work

- `docs/tranches/BI/coordination/asks-and-consumes.md` (new) — the BI outbound roster: per-sibling ask rows (speedtest, muster, atlas, sci-report, value.js) each with trigger + disposition + the PAIRED peer bump, adopting XR-9.
- The PIN-GUARD rows: atlas (`package.json` + `app/package.json` `>=4.2.0`/`^4.2.0` → `^5.0.0`; value `^1.2.0` → `^3.1.0`) + sci-report (`app/package.json` `4.2.0` → `^5.0.0`; value → `^3.1.0`) — the LOCKSTEP bound, a HARD pre-publish blocker.
- The `.text-gilt`→`.gold-shimmer` row (atlas `DashboardHero.vue:310` + `Glyph.vue:181`).
- Carry-forward rows: `/api` (speedtest `TimelineSegment`→`/timeline`, muster `AuroraConfig`→`/aurora`); value.js blob 5-site (from `BI.W-BLOB-RENAME-LAND`).
- `scripts/proof-crossrepo-asks-bi.mjs` (new gate, `local`; the `:bh` precedent) — asserts the roster is WHOLE: every by-name ask carries a consumer trigger + a terminal disposition + the paired peer bump; the pin-guard rows present + born-RED until the sibling ranges bound; the content-only foreign-tree fence by construction.
- `package.json` + `gates.manifest.mjs` — register `proof:crossrepo-asks:bi`.

## Acceptance

Gate: **`proof:crossrepo-asks:bi`** (new) — GREEN when the roster is whole (BORN-RED at HEAD: the pin-guard ask is unfiled; atlas/sci-report ranges OPEN).

Clauses:
- X1 the BI roster exists; every XR-9 carry row present with trigger + disposition + paired peer bump.
- X2 the pin-guard rows (atlas + sci-report → `^5.0.0` + value `^3.1.0` lockstep) filed as HARD pre-publish blockers.
- X3 the `.text-gilt`→`.gold-shimmer` + `/api` + blob-rename carry rows present.
- X4 the content-only foreign-tree fence (inv-26) — zero sibling edits — by construction.
- Self-test bites (4): a dropped ask row REDs X1; a missing pin-guard REDs X2; an unpaired subpath-fix-without-peer-bump REDs; a sibling-edit trace REDs X4.

## π/DELTA

None — device-free relay/roster gate; zero pixel change (asks only, no sibling edit).

## Obligations

- **Cross-repo asks (foreign-tree fence, ABSOLUTE)**: the atlas/sci-report pin-guard bound + value bump, the `.text-gilt` rename, the `/api` re-point, the value.js blob 5-site — ALL are SIBLING edits the sibling repos own; glass-ui files the ask rows only.
- **HARD pre-publish blocker**: the pin-guard bound must land in the siblings (or their maintainers ACK the range-bound) BEFORE the 5.0.0 publish — else the open `>=4.2.0` auto-resolves into a value.js peer conflict. This is a cut-day gate the USER-gated tag inherits.

## Dispositions

- Discharges **XR-6/FR-4** (the unfiled pin-guard cut-day hazard) — filed, gate-locked, born-RED. Terminalizes the "atlas/sci-report open range" hazard as a HARD blocker (no re-book). `FR-5` residuals (aurora-pointer rider → D-VIZ; constellation/fourier conditional carry → B9-S5) are OTHER bands' rows — noted, not owned here.
