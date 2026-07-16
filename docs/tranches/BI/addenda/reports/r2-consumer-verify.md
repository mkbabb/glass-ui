# R2 Consumer/Contract Adversarial Verification

Verifier posture: adversarial, default-skeptic. Repo read-only (another agent's live
uncommitted transaction). Siblings read-only. glass-ui HEAD = `e5b3a209`. glass-ui
in-tree version = `6.0.0` (npm latest = `6.0.0`). Date of run: 2026-07-16.

---

## Claim 1 [c4-styles-theme] — CONFIRMED

**Claim**: atlas ATLAS-N C4 ask `./styles/theme` is NOT exported at 6.0.0 nor staged in
the working-tree package.json exports.

Evidence:
- Published `@mkbabb/glass-ui@6.0.0` exports (npm view) — the only styles keys are
  `./styles` → `dist/styles/index.css`, `./styles/fonts` → `dist/styles/fonts.css`,
  `./styles.css`. No `./styles/theme`.
- Working-tree `package.json` exports (`/Users/mkbabb/Programming/glass-ui/package.json`)
  — same three styles keys plus `./fonts/*`. No `./styles/theme` key.
- `docs/tranches/BI/coordination/INBOUND-MARKS.md:54` — `C4 | ./styles/theme token-only
  CSS subpath | OWNED — BI.W-STRUCTURE-RESEQUENCE (the flatten export map; #21 outbound
  carries the table when stable)`. It is an OWNED-but-unbuilt ask, not shipped.

Verdict: CONFIRMED. `./styles/theme` is neither published at 6.0.0 nor staged in the
working-tree exports; it is a still-open C4 ask parked on BI.W-STRUCTURE-RESEQUENCE.

---

## Claim 2 [atlas-outbound-drop] — CONFIRMED

**Claim**: No dated old→new subpath delta outbound (ask #21) nor dock contract note
(#22b/c) exists anywhere under any `.../coordination/` dir newer than 2026-07-12.

Evidence:
- The only atlas OUTBOUND in BI is
  `docs/tranches/BI/coordination/atlas-outbound-2026-07-12-decision-0.md` (content-dated
  2026-07-12). Its `#21` section says the old→new subpath table is *OWED when
  BI.W-STRUCTURE-RESEQUENCE (B9) stabilizes* — "Until it lands, the map is IN FLUX; a
  premature table would strand your re-point sweep." No table delivered.
- Its `#22` section: `(a)` confirmed; `(b) PEEK/tri-state detent` and `(c) dismiss model`
  are OWED when `BI.W-DOCK-SPINE` lands. No contract note delivered.
- `INBOUND-MARKS.md:302-303` and the outbound-ledger rows (368-378) reaffirm #21 and
  #22b/c as OWED-at-wave-close, not produced.
- Every coordination file whose *name* dates after 2026-07-12 is a value.js INBOUND, not
  an atlas outbound: `valuejs-inbox-2026-07-13-{bi-dist-breakage,colands-preview,
  u-w-lib-invariant,u-w-visual}.md`, `valuejs-inbox-2026-07-15-v-formation.md`.
- Full grep of `docs/tranches/*/coordination/` for `old→new` / `subpath table` /
  `export-map delta` / `PEEK detent` / `dock contract note`: the only BI hit is the
  2026-07-12 outbound (which promises, not delivers). No newer outbound.

Verdict: CONFIRMED. Both #21 (subpath delta table) and #22b/c (dock contract note) remain
promised-not-delivered; nothing dated after 2026-07-12 supplies either.

---

## Claim 3 [p127-peer-hazard] — CONFIRMED (with corrections)

**Claim**: Working-tree package.json stages peer `@mkbabb/value.js ^4.0.0` and
`@mkbabb/keyframes.js ^6.0.0` while npm-published latest are value 3.1.0 / keyframes
5.3.x — publishing before the producers cut would strand consumers.

Evidence:
- Working-tree `package.json` peerDependencies: `@mkbabb/value.js: ^4.0.0`,
  `@mkbabb/keyframes.js: ^6.0.0`.
- npm latest: `@mkbabb/value.js` = `3.1.0`; `@mkbabb/keyframes.js` = `5.3.5` (dist-tag
  latest). Both peer ranges are UNSATISFIABLE against the published registry.
- Producers in-tree/unpublished: `~/Programming/value.js` package.json = `4.0.0`;
  `~/Programming/keyframes.js` = `6.0.0`. Both majors exist only locally.
- Corroboration: value.js `docs/tranches/V/FINAL.md` records "P127 saw value 4.0.0 as
  `E404`" — value 4.0.0 is confirmed absent from npm.
- value.js V is near-cut (FINAL.md present, `coordination/CONSTELLATION.md` names the
  value/keyframes/glass cut order) but NOT yet published.

Corrections to the claim as worded:
1. The in-tree version field is `6.0.0`, not `7.0.0`; npm latest is already `6.0.0`. The
   hazard attaches to the NEXT publish carrying these bumped peers, whatever its number.
   (Published 6.0.0's own peers are the older `value ^3.1.0` / `keyframes ^5.2.0` — the
   bump to ^4.0.0/^6.0.0 is staged in the uncommitted tree, not yet on npm.)
2. Both producer peers are marked `optional: true` in `peerDependenciesMeta`, so `npm
   install` will not hard-fail — but any consumer actually using value/keyframes features
   gets an unmet-peer against an unresolvable range. The strand is real for feature-users.
3. Internal mismatch: devDependencies still pin the PUBLISHED producers (`@mkbabb/value.js
   ^3.1.0`, `@mkbabb/keyframes.js 5.3.4`), so glass-ui builds against 3.1.0/5.3.4 while
   declaring peer need of 4.0.0/6.0.0 — the peer bump is aspirational/ahead of the build.

Verdict: CONFIRMED. Peer ranges point at producer majors absent from npm; publishing the
staged tree before value 4 / keyframes 6 cut would strand consumers. Corrected on version
number (6.0.0 in-tree, not 7.0.0) and on the optional-peer / dev-dep-lag nuances.

---

## Claim 4 [v-bundle-in-flight] — CONFIRMED: all four items ALREADY IMPLEMENTED in the working tree

The bundle is the value.js V "producer bundle" (V FINAL.md names "P019 paired `1/√φ`",
"P122 line-box gap G", "P047", W29 Blob). Per-item, against the glass-ui working tree
(these are the codex agent's live edits — see git status flags):

- **P019 — type pair 1/√φ kicker/headline** → ALREADY IMPLEMENTED. `M`
  `src/styles/typography/scale.css:129` defines
  `--type-proportional-ratio: 0.7861513777574233; /* 1/√φ */` with
  `--type-proportional-headline-size` (= `--type-display-2`) and
  `--type-proportional-kicker-size = headline * ratio`. `M`
  `src/styles/typography/semantic.css:22-28` exposes `@utility text-proportional-headline`
  / `text-proportional-kicker`. Full pair present.

- **P122 — InstrumentChassis stage/inspector/action contract, typed proportion
  golden/preview-dominant, --instrument-title-gap** → ALREADY IMPLEMENTED. NEW untracked
  file `src/components/instrument-chassis/types.ts` defines
  `InstrumentChassisProportion = "golden" | "preview-dominant"`,
  `InstrumentChassisBoundary = "stage-inspector" | "inspector-action"`,
  `InstrumentChassisReserve = "none" | "stage" | "inspector" | "both"`. `M`
  `styles.css:11` defines `--instrument-title-gap`; `.instrument-stage`,
  `.instrument-inspector`, `.instrument-action`, and
  `[data-proportion="golden"|"preview-dominant"]` selectors present.

- **P047 — blob settled-frame measurement seam + bodyRadius sole control** → settled-frame
  seam ALREADY IMPLEMENTED; bodyRadius present (one of several geometry knobs, NOT literally
  sole). `M` `src/components/blob/composables/useMetaballRenderer.ts:60` exports
  `interface BlobSettledFrame` + `resolveBlobSettledFrame()`; handle exposes
  `settled: Readonly<Ref<boolean>>` and `settledFrame: Readonly<Ref<BlobSettledFrame|null>>`.
  README documents the seam under BI.W-BLOB-SEAMS. `bodyRadius` exists (`types.ts:125`,
  default `0.22`) but `BlobGeometry` also carries canvasSize/satelliteCount/satelliteRadius/
  orbitRadius/eccentricity, so "sole control" is not literally true at the config level.

- **P051 — WatercolorDot face-only, no tag=button** → ALREADY CONFORMANT. `M`
  `src/components/watercolor-dot/WatercolorDot.vue:130` root is `<span aria-hidden="true">`
  (a swatch face). No `<button>`, no `tag="button"`, no reka `<Primitive>`/`as=`. Only
  hover listeners, no interactive element.

git-status confirmation these are the codex agent's uncommitted transaction: `M`
scale.css/semantic.css/utilities.css, `M` blob/* (incl. useMetaballRenderer.ts), `M`
instrument-chassis/{InstrumentChassis.vue,styles.css,index.ts}, `??` (new) instrument-
chassis/types.ts, `M` watercolor-dot/WatercolorDot.vue.

Verdict: CONFIRMED — the working tree already implements the entire bundle (P047 partial
only on the "sole control" phrasing). The addenda MUST NOT re-specify or duplicate any of
these four; they are done in-tree by the active codex agent.

---

## Claim 5 [stale-consumers] — CORRECTED (2 of 5 pins are fabricated)

**Claim**: muster pins glass-ui ^3.1.0, slides 3.13.0, speedtest ^4.0.1, words ^3.0.0,
bbnf-buddy ^3.9.0; speedtest/muster still import `@mkbabb/glass-ui/api`.

Evidence (each from the sibling's package.json):
- **muster** — REFUTED. `~/Programming/muster/package.json` is a monorepo root with ONE
  dependency: `zod ^4.4.3`. No `@mkbabb/glass-ui` at any range, no `src/` dir, no
  `glass-ui/api` import anywhere. The "^3.1.0 + imports /api" assertion is fabricated.
- **slides** — CONFIRMED. `@mkbabb/glass-ui: 3.13.0` (exact pin).
- **speedtest** — CONFIRMED. `@mkbabb/glass-ui: ^4.0.1`; imports `@mkbabb/glass-ui/api`
  at `src/features/speedtest/ui/PhaseTimeline.vue:52`
  (`import type { TimelineSegment } from "@mkbabb/glass-ui/api"`).
- **words** — REFUTED. `~/Programming/words/package.json` deps = `embla-carousel ^8.6.0`,
  `embla-carousel-vue ^8.6.0`. No `@mkbabb/glass-ui` anywhere. The "^3.0.0" pin is
  fabricated.
- **bbnf-buddy** — CONFIRMED. `@mkbabb/glass-ui: ^3.9.0`.

`./api`-drop contract note: the working-tree exports have NO `./api` key (grep empty), and
`MIGRATION.md:152-164` states `./api` is the ONLY dropped key, fold-deleted (185/199
symbols re-homed). So speedtest's `/api` import WOULD break at 6.0.0 — but speedtest pins
`^4.0.1` (resolves `>=4.0.1 <5.0.0`), so it stays on the 4.x line where `/api` still ships;
it is a latent break only if speedtest bumps into 5.x/6.x. muster imports nothing.

Verdict: CORRECTED. slides/speedtest/bbnf-buddy pins and the speedtest `/api` import are
CONFIRMED; muster (^3.1.0 + /api) and words (^3.0.0) are REFUTED — neither depends on
glass-ui at all.

---

## Claim 6 [deck-helper-silent] — CONFIRMED (removal + no fresh outbound), corrected on impact

**Claim**: 6.0.0 removed installDeckSpring/deckEase/DECK_SPRING (helpers the atlas #24
outbound described as shipped) with no fresh outbound to atlas.

Evidence:
- Removal: commit `101dd196` (`refactor(deck): retire the inert motion facility`, dated
  2026-07-15 13:48) — "remove installDeckSpring, deckEase, and DECK_SPRING from the deck
  subpath; delete the lazy useDeckSpring implementation without an alias." Diff deletes
  `src/components/deck/composables/useDeckSpring.ts` (65 lines) and the barrel re-exports.
  Grep of `src/` and `dist/` for the three symbols: EMPTY. They are gone.
- "#24 outbound described them as shipped": TRUE. The 2026-07-12 outbound
  (`atlas-outbound-2026-07-12-decision-0.md:30`), under "#24 — the /deck headless core
  (VERIFIED on disk)", lists `installDeckSpring / deckEase / DECK_SPRING` as shipped
  contract facts.
- "no fresh outbound to atlas": TRUE. The only atlas outbound is still the 2026-07-12 file
  (mtime + content date both 07-12), which PREDATES the 07-15 removal. No coordination
  outbound corrects it. The removal is documented only in `MIGRATION.md:108` (the commit's
  own "will be called out in the 6.0.0 migration map" promise).
- Impact check: atlas does NOT import any of the three. Grep of `~/Programming/atlas`
  (present) for `installDeckSpring|deckEase|DECK_SPRING`: EMPTY. The commit message
  independently states they "had no live Glass or tracked external reader."

Verdict: CONFIRMED — the three symbols the 07-12 outbound listed as shipped were removed
three days later (07-15) with no corrective coordination outbound, only a MIGRATION.md
line. Corrected on severity: atlas never imported them, so the "silence" is a coordination-
hygiene gap, not a live consumer break.

---

## Cross-cutting notes for the addenda author

- The addenda must NOT re-specify P019/P122/P047/P051 — all four are done in the codex
  agent's uncommitted tree (Claim 4).
- The `./styles/theme` C4 ask and the #21 subpath-delta / #22b/c dock-contract outbounds
  are genuinely OWED and unbuilt (Claims 1, 2) — legitimate addenda targets.
- The peer-bump hazard (Claim 3) is the sharpest cut risk: do not tag/publish the staged
  tree until value 4 / keyframes 6 are on npm, or the strand is live for feature-users.
- Consumer roster in the addenda should drop muster and words as glass-ui consumers
  (Claim 5) — they are not. Real glass-ui consumers here: slides (3.13.0), speedtest
  (^4.0.1, imports /api), bbnf-buddy (^3.9.0).
- The deck-helper removal (Claim 6) needs a one-line atlas outbound at most, since atlas
  never consumed the symbols; MIGRATION.md already covers the consumer-facing map.
