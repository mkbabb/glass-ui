# BK register wave — driver rulings (2026-09-22)

The owner's register as it stood at ⊕⁸⁵ (`EXECUTION-PROGRESS.md:7270-7285`, O-20 LEDGER §Tally,
O-26 LEDGER §Register), ruled by the driver under the delegated ratification authority ("for the
owner gated and deferred items: ratify them with your best and most scrupulous judgement") and the
2026-09-22 order ("no deferring any item to another time"). The execution charter authorizes
publish. Every ruling below EXECUTES in this wave except §4's two, which need the owner's
npmjs.com web session and cannot be taken from a tool call.

Datum: master `e3587ec8` (= origin), tree clean, receipt `seats:60 … drift:0 violations:0`,
`.bundle-ratchet` 2562566, roster 289/289. The four CI reds after the O-26 pushes are all the
standing pixel-floor leg (`verify` green each run); the wave introduced no new red.

## 1 · The 10.0.0 set — BREAKING, executed at HEAD; the next cut is 10.0.0

Grounds common to all: each was ruled CURE-NEXT-MAJOR on the merits in O-20/O-26; the only reason
none executed was that a major cut is the owner's, and that authority is now delegated. The
consumer-updates ruling holds: a consumer's dependence never preserves an obsolete API; the
consumer updates via a marked addendum in ITS tranche, told by ONE outbound letter.

- **10-1 · A-3-CLASS** (O-20 LEDGER §A-3-CLASS + the O-26 scope note). Every top-level style rule
  reachable from both CSS export roots (`styles/index.css` and the `./styles.css` path) sits inside
  `@layer components` — `.css` files AND SFC `<style scoped>` blocks (the `Skeleton.vue` precedent);
  `menu.css`'s PRM block moves inside its layer; the `./styles.css` path declares the layer order;
  the slider keeps its exception ONLY as a named allowlist entry with grounds; allowlist otherwise =
  token `:root`, `@utility`/`@theme`/`@property`/`@font-face`/`@keyframes`. The cascade gate rides
  an EXISTING gate seat (no mint; `tests/gates/orphan-css-partial.test.ts` is the natural host — the
  lane measures which seat's charter fits and records it), born-RED on the measured set. The
  measured set (by file and selector) is handed to Lane R's RECORD for the consumer-readable
  manifest, which lives INSIDE `MIGRATION.md §10.0.0` (it travels with the package once MIGRATION
  joins `files`, 10-6). FR-COB-8/FR-COB-12 are measured in this lane and recorded. The datum is
  "every unlayered top-level rule", never a number.
- **10-2 · `ringsAt`** (O-20 CUT-3). Off the `./fourier-field` barrel; the function stays exported
  from `mint.ts` (the test is its external site); the tautology test struck; the two behavioural
  tests kept; the demo story NOT wired to it.
- **10-3 · `ColorResolver` + `defaultBlobColorResolver`** (O-20 CUT-4/5). Both deleted from
  `./color` in one decision. Consumers measured from this repo READ-ONLY: slides
  (`Slide01.vue`, `Slide05.vue` bind it to a `:color-resolver` prop that died at 9.0.0) and atlas
  (`src/charts/scale/ColorScale.ts` — the lane measures what it imports). ONE outbound letter,
  `docs/tranches/BK/coordination/glass-outbound-2026-09-22-consumers-10.0.0.md`, by consumer, by
  row, in the O-26 reply form; nothing written into a sibling.
- **10-4 · R-6-LIGHT (c)** (O-26 LEDGER §R-6-LIGHT). The atoms-door union narrows to the honest
  type: `light` is admitted only on arms whose medium carries `impasto > 0`, per the set Lane A
  MEASURED (`execution/2026-09-18-o26-cure/A/RECORD.md`); `light?: never` on every other arm. A
  born-RED type witness (a `// @ts-expect-error` line in the existing aurora atoms test that is
  unused-error RED today) turns GREEN.
- **10-5 · `text-caption` italic retired** (O-26 R-12 open design item). RULING: decoration versus
  notation. `text-caption` (`src/styles/typography/semantic.css`, `@utility text-caption`) drops
  `font-style: italic` — it already reads as a caption by size, leading and weight, and a
  synthesized oblique on running prose is a masking fallback for a face the library has decided
  not to ship (R-12: one axis, `italicAngle 0`). `text-math`, `text-math-body` and `fourier-f`
  KEEP italic: mathematical italic is notation, not decoration, and the R-12 doc arm already
  declares them synthesis-dependent. The README/DESIGN sentence naming four synthesis-dependent
  utilities becomes three (Lane R). MIGRATION §10.0.0 row: a consumer who wants the old caption
  paint adds `italic` beside `text-caption`.
- **10-6 · `MIGRATION.md` joins `files`** (O-26 register). RATIFIED on the ledger's own grounds:
  every "we documented it" answer is unreachable at any consumer's pin unless the manifest travels
  with the package. `package.json` `files: ["dist", "MIGRATION.md"]`; `verify:package` sees the new
  entry; the ratchet moves and is rebound by the driver on the committed tree. Additive; it rides
  the 10.0.0 cut because that is the cut.

## 2 · Register cures — non-breaking, executed

- **N-1 · the master pixel-floor CI red** (standing since 2026-08-24; blob non-flood CEILING arm
  0.997 under SwiftShader vs 0.288 on Metal). RULING: the ceiling is a renderer artefact, the floor
  is not. The blob FLOOR arm (real render GREEN, planted defect RED) stays in CI; the CEILING arm
  is GPU-gated exactly as the aurora floor is — it runs in `scripts/release.sh` on real hardware
  (already: `gate:pixel-floor:planted:flood`) and NOT on the SwiftShader runner. The lane measures
  which `pi-gate-verify.mjs` arm reds in CI from the last run's uploaded `pixel-floor-pi-reports`
  artefact (`gh run download 35399022659 -n pixel-floor-pi-reports`) before touching anything;
  the 0.7 datum NEVER loosens; the `ci.yml` comment block gains the blob-ceiling sentence in the
  aurora idiom (:54-57). Verified by a green `ci.yml` on the wave's first push.
- **N-2 · the Alert tone-glyph and WCAG 1.4.11** (C2/RECORD.md:340-350, two questions). RULING
  (a): the Alert glyph is decorative reinforcement — `alert-title`/`alert-description` carry the
  content in `text-card-foreground` — so 1.4.11 does not bind THROUGH Alert. RULING (b): the
  question is really about `--success`/`--warning` as tokens, which are read far beyond Alert. The
  lane CENSUSES every site where either token is the ONLY carrier of a state (a status dot, a
  progress fill, a badge with no text, a validity ring): if any such REQUIRED graphical object
  exists, both tokens drop L on B-7's drop-L-keep-hue recipe until ≥3.0:1 on `--card` in BOTH
  modes, LOCKSTEP across every ramp copy, with §5/§6-style contrast rows in the existing token
  test; if none exists, the census is the record and nothing moves. Paint change, non-breaking
  (B-7 precedent).
- **N-3 · `darkModeSyncScript`'s fail-closed read** (D/RECORD.md:493-501). RULING: byte identity of
  the 300 B default emission protected consumers' CSP hashes INSIDE a major; a major cut is where a
  hash lawfully moves (§8.1.0 (d) precedent for `{normalize:true}`). At 10.0.0 the read hardens: an
  inner `try` around `getItem` so a throwing accessor (privacy mode, sandboxed origin) falls to the
  `auto`/default arm instead of leaving the page unstamped. The emission stays the smallest that
  honours it; the new sha256 is measured, the old→new pair is a MIGRATION §10.0.0 row and the
  README/`./dark` docs update (Lane R from Lane T's RECORD); the existing dark-sync test's hash
  assertion moves (born-RED); the `darkModeSyncScript.ts` emission comment's struck sentence is
  bracketed, not deleted.
- **N-4 · prettier config** (cursor :7281-7284). RULING: the repo is self-contained. A repo-local
  `.prettierrc.json` IDENTICAL to the resolving `~/.prettierrc.json` (`printWidth 88, useTabs
  false, tabWidth 4`), so nothing reformats; NO sweep — the lane reports `--check`'s file count as
  a datum only.
- **N-5 · Trusted Publishing readiness** (`release.yml`). RULING: prepare the workflow so the owner's
  one web action finishes it — `npm i -g npm@latest` (OIDC trusted publishing needs npm ≥ 11.5.1)
  before the publish step; the `NODE_AUTH_TOKEN` line STAYS until the owner enables the trusted
  publisher and rotates (a missing token with no trusted publisher would break the next cut); the
  header comment gains the exact npmjs.com steps (package → Settings → Trusted publisher →
  GitHub Actions: `mkbabb/glass-ui`, workflow `release.yml`, environment blank). See §4.
- **N-6 · `./drawer`** (O-26 R-11-RIDER-2 open item). The `./sheet` row and the two `## 8.0.0`
  stage-paragraph sentences ("`stage="immersive"` on `Dialog`/`Drawer` …", "Only `Dialog` and
  `Drawer` accept") rewritten to say Drawer folded WHOLE into Sheet at `336dacf9` ("the detent is a
  size"); a fold, not a `_Deleted —` entry.
- **N-7 · the 10.0.0 records**: `MIGRATION.md §10.0.0` (every row above, the unlayered manifest,
  the hash pair, the italic row, the two export deletions with the consumer recipe),
  `CHANGELOG.md` 10.0.0 entry measured against 9.0.0's published bytes, README/DESIGN touches. The
  version bump to `10.0.0` in `package.json` is the DRIVER's act at the cut, not a lane's.

## 3 · Lanes, fences, order

Five quartet lanes on the shared tree, ≤3 seats concurrent (challengers run in SEQUENCE inside a
lane so three lanes can run at once), driver commits by pathspec at each lane's close:

| lane | rows | fence (exclusive) |
| --- | --- | --- |
| L | 10-1, 10-5 | every `src/**/*.css` EXCEPT the token files (`color-radius.css`, `light-dark.css`, ramp copies — Lane T's); every SFC `<style>` block under `src/`; `src/styles/index.css` + the `./styles.css` entry; the host gate test + its fixtures; `tests/**` witnesses for CSS |
| X | 10-2, 10-3, 10-4 | `src/composables/fourier-field/**`, `src/composables/color/**`, `src/components/aurora/composables/atoms.ts` (+ its type tests), in-house importers of the three names (measured), the outbound letter |
| C | 10-6, N-1, N-4, N-5 | `.github/workflows/*`, `package.json` (`files` only), `.prettierrc.json`, `tests-visual/**` pixel-floor scripts |
| T | N-2, N-3 | the token files above + their tests; `src/composables/dark/**` + its tests |
| R | N-6, N-7 | `MIGRATION.md`, `CHANGELOG.md`, `README.md`, `DESIGN.md`, `docs/design/**`, `docs/consumer-evidence/**` — runs LAST, reading every other lane's RECORD |

Order: L ∥ X ∥ (C → T), then R. Then the driver: ratchet rebind on the committed tree; version
bump; close battery on a fresh demo build; `scripts/release.sh 10.0.0` (the LAWFUL TAG PATH — the
aurora floor on real hardware); push; `release.yml` publishes with provenance; ⊕⁸⁶; then the
FINAL.md quartet.

## 4 · Owner-only after this wave (cannot be taken from a tool call)

1. Enable the npm Trusted Publisher for `@mkbabb/glass-ui` on npmjs.com (steps in `release.yml`).
2. Rotate the `NPM_TOKEN` secret (revoke the token pasted in-session; a trusted publisher makes
   the secret unnecessary — delete it then).

Everything else on the register is executed by this wave or recorded above as closed.
