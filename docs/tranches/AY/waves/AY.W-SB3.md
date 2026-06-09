# AY.W-SB3 — Storybook real machine language-consistency gate + FIX/VERIFY-route DELTAs

**Tranche** AY (glass-ui) · **Batch** 4 (storybook polish; runs after W-SB1 retire + W-SB2
restructure land their manifest edits) · **State** OPEN · **Repo** glass-ui · **Type**
gate-script (NEW `proof:story-language-consistency`) + 3 captured FIX/VERIFY DELTAs through the
shipped `proof:live-verified-ledger:ay` ledger.

This is the storybook-language polish wave. It replaces the prose hard gate W-SB3 carried in
`AY.md:170` ("a machine-checkable language assertion green") with a REAL pure-FS detector and
closes the three FIX/VERIFY routes (card toggles, glass-panel, carousel pager) on CAPTURED live
DELTAs through the cardinal ledger that already exists. Sibling to W-SB1 (per-route
KEEP/FIX/RETIRE + orphan-component-retire) and W-SB2 (scattered-dock triage + metric
co-location). It RETIRES zero source, MOVES zero route — its only source edit is one new gate
script + its registry/package lines; its only doc edits are the AY `VISUAL-ALLOWLIST.json`
addition + the three `audit/visual/W-SB3-*` DELTA captures.

Hardening basis: `docs/tranches/AY/audit/hardening/H-storybook.md` §3 F9 (the prose-only gate +
the un-mandated FIX-route DELTAs), §5 fold-routing (F9 → W-SB3), §6 convergence criteria 5
(every FIX/VERIFY route closes on a CAPTURED live DELTA) + 6 (a real machine
language-consistency assertion). Depends on `AY.W-CARDINAL-INFRA` (the
`proof:live-verified-ledger` tranche-parameter + the AY home + `VISUAL-ALLOWLIST.json` sidecar)
being landed first.

---

## Goal criterion

The storybook speaks ONE language, machine-asserted, not audited-by-eye: EVERY manifest-route
story composes the shared `StoryPage` chassis (the page shell + hero + nav) — so no route is a
hand-rolled one-off layout — and EVERY in-story motion rides the canonical `--spring-*` /
`--ease-*` token ladder rather than a hardcoded `cubic-bezier()` on a `transition` /
`transition-timing-function` (the §6 easing-doctrine register), with the single legitimate
full-bleed exception (`substrates/aurora.vue`) and the keyframe-internal-easing carve-out both
ENUMERATED, not silently tolerated. And the three routes the corpus flagged as "broken" or
"needs-verify" (card shadow/grain toggles, glass-panel post-glass-material, carousel
pager/dots) close on a CAPTURED before/after PNG DELTA through the shipped cardinal ledger — the
#1 chronic (a "fixed/verified" claim with zero pixel) cannot recur because the ledger machine-
requires the own-surface light+dark PNG pair.

## Completion criterion

The two hard gates below verify: **`proof:story-language-consistency` GREEN** (exit 0) — its
artefact lists 124 manifest-route stories scanned, of which **123 compose `<StoryPage>` and 1
(`substrates/aurora`) is the allowlisted full-bleed exception** (so `chassisViolations: 0` —
verified at HEAD: 124 routes, 123 compose StoryPage, aurora is the sole route that does not;
the 124th StoryPage composer in the tree is `StoryPage.vue` ITSELF, a non-route chassis, so the
route-scoped count is 123+1, NOT 124), 0 hardcoded-easing violations off the token ladder (the 1
keyframe-internal `gate-shake` carve-out accounted), with a self-test that flags a synthetic
no-StoryPage row AND a synthetic hardcoded-`cubic-bezier`-on-`transition` row (the RED-witness
inverse); **`proof:live-verified-ledger:ay` GREEN** (exit 0) with `card`, `glass-panel`,
`carousel` on `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` and each carrying a
`W-SB3-<route>-DELTA.md` referencing its own-surface `^W-SB3-<route>-…-light.png` +
`-dark.png` pair — so the ledger SEES the three FIX/VERIFY routes and they pass on real pixels,
not prose.

---

## §1 — The verified defects (file:line, source-grounded at HEAD `at-dock-convergence`)

### D-F9a — the W-SB3 hard gate is PROSE ("an audit passes"), not a machine assertion

`AY.md:170` states W-SB3's gate as "a machine-checkable language assertion green" but no such
gate exists. `proof:story-language` (`scripts/proof-story-language.mjs`) is the only
language-adjacent storybook gate and it does the OPPOSITE job — it strips internal META-language
(tranche codes, WCAG citations, impl-notes) from story prose (`proof-story-language.mjs:40-50`).
It asserts NOTHING about whether stories compose the shared chassis or ride the canonical motion
tokens. The "consistent animation/design/interaction language across EVERY story" directive
(corpus, `AY.md:59`) has zero binding evidence. Per `TRANCHE-AND-WAVE-SPEC.md §"Hard gate"`, a
grep-only / "an audit passes" gate is INSUFFICIENT for the convergence signal.

### D-F9b — the chassis-composition consistency is real but un-asserted

Ground-truth scan at HEAD:

- `demo/stories/**` carries **142** `.vue` files; **124** compose `<StoryPage>`
  (`grep -rl '<StoryPage' demo/stories` = 124), **18** do not (142 − 124 = 18 — verified at HEAD
  by `comm -23` of the file set vs the StoryPage-composer set).
- The manifest (`demo/stories/manifest.ts`) carries **124** `s(...)` route rows
  (`grep -cE '^\s*s\(' manifest.ts` = 124), 1:1 with the 124 route SFC FILES (the
  `proof:no-orphan-demo-route` route↔file set-equality, PASS). The 124 route FILES are NOT the
  same set as the 124 StoryPage COMPOSERS — they differ by exactly one swap: `substrates/aurora.vue`
  is a route that does NOT compose StoryPage, and `StoryPage.vue` (the chassis SFC itself, which
  trivially contains its own `<StoryPage` tag) is a composer that is NOT a route. So of the 124
  routes, **123 compose StoryPage** and 1 (`substrates/aurora`) is the full-bleed exception.
- The **18 non-StoryPage SFCs** decompose as **5 + 12 + 1** (verified at HEAD):
  - the **5 demo chassis primitives** (NOT `StoryPage.vue` — it composes its own tag):
    `StorySection.vue`, `ShowcaseFrame.vue`, `StoryHero.vue`, `ToneSwatch.vue`, `TokenLadder.vue`;
  - the **12 aurora helper sub-SFCs** under `demo/stories/aurora/**` (`AuroraStage`,
    `AuroraConfigDock`, `AuroraAtomsPanel`, `NucleiOverlay`, `OklchStopRow`, `PresetPickerRow`,
    `aurora/config/{Composition,Flow,Medium,Nuclei,Palette,Texture}Layer.vue`) — NONE are manifest
    route SFCs; they are composed INTO `substrates/aurora.vue`. The category-scoped walk
    (`proof-no-orphan-demo-route.mjs`) already excludes helper dirs the same way, and the
    manifest-derived route-path list this gate scans (§4 A) never reaches them.
  - the **1 route** `substrates/aurora.vue` (the full-bleed exception, below).
- **Exactly ONE manifest-route SFC does NOT compose `<StoryPage>`**: `substrates/aurora.vue`
  (the route `s("substrates", "aurora", …)`, `manifest.ts:138`). It is a full-bleed playground
  page (`substrates/aurora.vue:1-25` — its own `Configurator`/`AuroraStage`/`AuroraConfigDock`
  shell, no page chrome). This is the SINGLE legitimate exception and the gate ENUMERATES it.

So the chassis-composition invariant IS true at HEAD (123 of the 124 route stories compose
StoryPage; 1 allowlisted full-bleed substrate) — but nothing asserts it, so the next un-chassis'd
one-off
route lands silently. That is the F9b gap.

### D-F9c — the canonical-motion consistency is real but un-asserted, with one carve-out

The §6 easing doctrine (CLAUDE.md, `tokens.css §2`) says: surface props →
`--ease-standard`; transform hover/press → `--spring-smooth`; enter → `--spring-bouncy` /
`--spring-snappy`; exit → `--ease-out`. The canonical tokens are
`--spring-{smooth,snappy,bouncy,gentle,dock}` (`tokens.css:191-195`) +
`--ease-{standard,out,in,apple,spring,decelerate,accelerate}` (`tokens.css:203-214`). A story
that hardcodes a raw `cubic-bezier(...)` on a `transition` / `transition-timing-function` is OFF
the doctrine (a literal magic-number curve a token override cannot re-tune).

Ground-truth scan: **exactly ONE** hardcoded `cubic-bezier()` exists across `demo/stories/**`:
`demo/stories/compositions/gate-pattern.vue:172`:
`animation: gate-shake 0.4s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;`. This is a
**`@keyframes gate-shake`-driven discrete error cue** (a wrong-key horizontal jitter,
`gate-pattern.vue:166-175`), NOT a surface/transform `transition` the easing doctrine governs —
the doctrine binds hover/press/enter/exit TRANSITIONS, not a one-shot error-feedback keyframe.
This is the SINGLE keyframe-internal carve-out the gate enumerates. The gate forbids hardcoded
easing ONLY on the `transition`/`transition-timing-function` register (the doctrine's domain);
it does NOT touch keyframe-internal easing on an `animation` shorthand.

So motion-language consistency IS true at HEAD (0 doctrine-register hardcodes; 1 enumerated
keyframe carve-out) — but un-asserted, so the next hardcoded-bezier-on-a-hover lands silently.

### D-F9d — the FIX/VERIFY routes carry NO captured DELTA (the cardinal-lesson exposure)

The corpus §B11 flagged three routes as broken/needs-verify; H-storybook §2 re-baselined them
to FIX-or-VERIFY:

| route | HEAD reality | H-storybook disposition |
|---|---|---|
| `display/card` | shadow/grain `<Switch>` toggles ARE reactive (`card.vue:62-63` refs → `:107`+ bindings); the tier matrix is staged over an Aurora backdrop (`card.vue:17-20,91-99`) to close the perception gap. | **LIKELY-FIXED — VERIFY with a live capture** (§2; the "broken" claim predates the Aurora staging). |
| `substrates/glass-panel` | live route; 5-rung GlassPanel ladder over a renderer-tier detect (`glass-panel.vue:9,17,79-90`). D8 (glass-material broken) is gated GREEN post-AX. | **KEEP — VERIFY post-glass-material overhaul; capture a live DELTA** (§2). |
| `navigation/carousel` | `<CarouselPager>` + `<CarouselDots>` (`carousel.vue:7,9,70-71,112-114`) — NO progress bar (the "broken bar" was a deck-progress mis-attribution, disambiguated in W-SB2). | **VERIFY live the pager/dots render** (§2; F7). |

None of the three carries a DELTA. H-storybook §6 criterion 5: "Every FIX/VERIFY route … closes
on a CAPTURED live DELTA screenshot, not a prose claim." `AY.md:170` mandates "captured DELTAs"
but does not WIRE them to the machine ledger — so a close could still mint "verified" from
prose. The cardinal ledger (`proof:live-verified-ledger`, parameterized by W-CARDINAL-INFRA)
EXISTS to forbid exactly that; W-SB3 must put these three routes ON its allowlist so the ledger
machine-requires the pixels.

---

## §2 — Objective

Two moves, no source-component risk, no route move (those are W-SB1/W-SB2).

1. **Author `proof:story-language-consistency`** — a NEW pure-FS detector (the
   `proof-story-language.mjs` + `proof-no-orphan-demo-route.mjs` house shape: manifest-parse +
   `fs` walk, `gate-output.mjs` artefact, `constellation.mjs` ROOT, `exit 0/1`, a self-test).
   It binds the TWO real-but-un-asserted consistency invariants (chassis composition + canonical
   motion) with their two enumerated carve-outs. This is the "real machine language-consistency
   assertion" H-storybook §6 criterion 6 demands.

2. **Close the three FIX/VERIFY routes on captured DELTAs through the SHIPPED ledger** — add
   `card`, `glass-panel`, `carousel` to `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json`
   (the W-CARDINAL-INFRA sidecar) and author one `audit/visual/W-SB3-<route>-DELTA.md` per route
   referencing its own-surface light+dark PNG pair. `proof:live-verified-ledger:ay` then
   machine-requires each pair — no new gate, the existing engine is the consumer (root-not-
   consumer: the cardinal floor is ONE engine; this wave NAMES it).

Honors the precepts: ONE new gate binding two real invariants (no parallel motion-gate fork —
the §6 doctrine source is the root, the gate reads its tokens); the FIX/VERIFY DELTAs ride the
EXISTING cardinal engine (≥2-consumer bar — W-CARDINAL-INFRA's ledger now has the AX close arm,
the AY visual waves, and this storybook close as consumers); the two carve-outs
(`substrates/aurora` full-bleed; `gate-shake` keyframe) are ENUMERATED with rationale, not
silently allowed (greenfield-no-meta: the gate's allowlist is the recorded truth, not a "we'll
ignore that one" comment). The captured DELTA is the cardinal lesson made machine-binding.

---

## §3 — Files + exact edit-sites

### glass-ui — the new language-consistency gate

| file | edit |
|---|---|
| NEW `scripts/proof-story-language-consistency.mjs` | the detector (§4 below). `import { ROOT } from "./constellation.mjs"`, `import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs"`. Manifest-derive the 124 route SFC paths (parse `demo/stories/manifest.ts` `s(category, id, …)` rows → `demo/stories/<category>/<id>.vue`, the same derivation `proof-no-orphan-demo-route.mjs` uses) — do NOT walk all 142 (the 18 chassis/helper SFCs are not routes). For each route SFC: (A) assert it contains `<StoryPage` UNLESS it is on `FULL_BLEED_ALLOWLIST = ["substrates/aurora"]`; (B) scan its `<style>`/scoped CSS for a hardcoded easing on the doctrine register — a `transition`/`transition-timing-function`/`transition-property` line (or the `transition:` shorthand) carrying a literal `cubic-bezier(` or a bare timing keyword off the token set, with the `animation`/`@keyframes` register EXCLUDED (keyframe-internal easing is the carve-out). Emit a per-violation string + a `gate-output.mjs` artefact; `process.exit(pass ? 0 : 1)`. |
| `scripts/gates.mjs` (after the `proof:story-language` block — `id` at `:397`, the block's closing `},` at `:402`) | register a new entry — see §3.1. |
| `package.json` (after the `proof:story-language` script line, `:633`) | add `"proof:story-language-consistency": "node scripts/proof-story-language-consistency.mjs",`. |

### glass-ui — the three FIX/VERIFY route DELTAs through the cardinal ledger

| file | edit |
|---|---|
| `docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json` (minted `[]` by W-CARDINAL-INFRA) | append `"card"`, `"glass-panel"`, `"carousel"` — BUT note: the ledger keys on the PROGRESS wave-id (`^W\d`), so the captures register under the WAVE row. Use the ledger's wave-keyed convention: this wave's PROGRESS row is `W-SB3`; the ledger matches `^W-SB3-` PNG basenames. The allowlist entry is the wave-id `"W-SB3"` (so the `complete`/`live-verified` row for W-SB3 is held to the DELTA bar); the three routes are captured as the THREE own-surface DELTA docs the W-SB3 row's `deltaSatisfied` resolves. (If the ledger's per-route granularity is needed, see §5 the named-successor note.) |
| NEW `docs/tranches/AY/audit/visual/W-SB3-DELTA.md` | the wave DELTA doc referencing the three routes' own-surface PNGs (light+dark each, ≥2-viewport). It references `W-SB3-card-desktop-light.png` + `W-SB3-card-desktop-dark.png`, `W-SB3-glass-panel-desktop-light.png` + `-dark.png`, `W-SB3-carousel-desktop-light.png` + `-dark.png` (the `proof-live-verified-ledger.mjs` `deltaSatisfied` resolves `^W-SB3-…-(light|dark)\.png`). Each route section narrates the VERIFY/FIX finding (card toggles flip the staged tier matrix live; glass-panel renders the 5-rung ladder cleanly post-glass-material; carousel pager+dots paint over a dark/light-safe backdrop). |
| NEW `docs/tranches/AY/audit/visual/W-SB3-{card,glass-panel,carousel}-{desktop}-{light,dark}.png` | the 6 captured PNGs (≥1024 bytes, real `\x89PNG` magic — the ledger's `isRealPng` floor). Captured via the chrome-devtools-mcp / playwright live-verify harness against the running storybook (`npm run dev` → the three routes), one screenshot per {route}×{light,dark} at the desktop viewport (the protocol floor is ≥2 viewport × {light,dark}; W-SB3 captures desktop light+dark per route as the binding pair — add a mobile pair if the route reads differently at narrow width). |

### §3.1 — `scripts/gates.mjs` registry entry (literal block the orchestrator copies in)

```js
{
    id: "proof:story-language-consistency",
    cmd: "proof:story-language-consistency",
    tags: ["local", "ci"],
    note: "AY.W-SB3 — the storybook ONE-language machine assertion. Every manifest-route story SFC composes the shared <StoryPage> chassis (the 1 full-bleed exception substrates/aurora is enumerated) AND rides the canonical --spring-*/--ease-* motion ladder — zero hardcoded cubic-bezier() on a transition/transition-timing-function (the §6 easing-doctrine register); the 1 keyframe-internal gate-shake carve-out (an @keyframes error cue, not a transition) is enumerated. Self-proving: a synthetic no-StoryPage row + a synthetic hardcoded-bezier-on-transition row are flagged every run (the RED-witness inverse). Bite: add a route SFC without <StoryPage> (off the full-bleed allowlist), or put a cubic-bezier() on a transition in any story → RED.",
},
```

---

## §4 — `proof:story-language-consistency` — the detector contract

The script asserts FOUR facts via device-free SOURCE scan; pure-FS, no browser.

- **A (route set).** Parse `demo/stories/manifest.ts` for the `s(category, id, …)` rows →
  the 124 route SFC paths `demo/stories/<category>/<id>.vue` (the
  `proof-no-orphan-demo-route.mjs` derivation). Assert each path exists (it does —
  `proof:no-orphan-demo-route` is GREEN; this is a cheap re-confirm, not the binding assert).

- **B (chassis composition).** For each route SFC NOT in
  `FULL_BLEED_ALLOWLIST = ["substrates/aurora"]`, assert the file contains a `<StoryPage`
  element open-tag. A route SFC off the allowlist with no `<StoryPage` → violation
  `"<route>: no <StoryPage> chassis (and not on the full-bleed allowlist)"`. The allowlist is a
  HARD const in the script with an inline rationale comment (the aurora playground is a full-
  bleed substrate page by design). A NEW full-bleed page must be ADDED to the allowlist with
  rationale — the gate forces the decision to be recorded, not silent.

- **C (canonical motion).** For each route SFC, scan its `<style>` block(s) for the
  doctrine-register hardcode. A line is a violation when it (i) is a `transition:` /
  `transition-timing-function:` / `transition-property:` declaration AND (ii) carries a literal
  `cubic-bezier(` OR a bare CSS timing keyword (`ease`, `ease-in`, `ease-out`, `ease-in-out`,
  `linear`, `steps(`) that is NOT a `var(--ease-*)` / `var(--spring-*)` / `var(--motion-*)`
  reference. The `animation:` shorthand and `@keyframes { … }` interiors are EXCLUDED from the
  scan (the keyframe-internal carve-out — `gate-shake` is legal). A doctrine-register hardcode →
  violation `"<route>:<line>: hardcoded easing '<match>' on a transition — ride a --spring-*/--ease-* token (§6 easing doctrine)"`.
  (Implementation note: the cleanest scan strips `@keyframes … { … }` blocks and `animation:`
  declarations first, then matches the `transition*` lines in the remainder.)

- **D (self-test — the RED-witness inverse, runs EVERY invocation).** Evaluate two synthetic
  fixtures BEFORE the real scan: (1) a synthetic route SFC body with no `<StoryPage` and not on
  the allowlist MUST produce a B-violation; (2) a synthetic `<style>` body
  `.x { transition: transform 0.3s cubic-bezier(0.4,0,0.2,1); }` MUST produce a C-violation. If
  EITHER is not flagged, the gate prints `SELF-TEST FAILED` and `process.exit(1)` — the detector
  is not load-bearing. (And a negative control: a synthetic `.y { animation: foo 1s cubic-bezier(...); }`
  must NOT flag — proving the keyframe carve-out holds.)

Bite checklist (the §HARD-GATE RED witnesses):
- add a new `demo/stories/<cat>/<id>.vue` route + manifest row WITHOUT `<StoryPage>` (and not on
  the full-bleed allowlist) → B reds.
- put `transition: transform .3s cubic-bezier(.4,0,.2,1)` in any story `<style>` → C reds.
- put `transition-timing-function: ease-in-out` (bare keyword, no var) in a story → C reds.
- comment out the B clause → the script's own self-test reds (D, the inverse witness).
- (negative) the existing `gate-pattern.vue:172` `animation: gate-shake … cubic-bezier(…)` stays
  GREEN (keyframe carve-out); the existing 123 StoryPage routes + `substrates/aurora` (allowlist)
  stay GREEN.

---

## §5 — HARD GATE (evidence-backed)

The wave closes when BOTH gates verify by RUNNING the scripts (exit code + artefact), not by
grep:

**G1 — `npm run proof:story-language-consistency` → exit 0 (GREEN)**, with a written
`gate-output.mjs` artefact whose facts show: `routeStories: 124`; `composeStoryPage: 123` +
`fullBleedAllowlisted: 1` (= `substrates/aurora`) so `chassisViolations: 0`;
`hardcodedEasingViolations: 0` with `keyframeCarveOuts: 1` (= `compositions/gate-pattern`);
`selfTest: OK` (both synthetic fixtures flagged, the negative animation control not flagged).
The bite checklist (§4) is the falsifier set: each bite, applied to the tree, must flip the gate
RED — demonstrated by a born-RED capture in the wave PROGRESS (inject one
`transition: … cubic-bezier(…)` into one story, run, observe RED + the named violation, revert).

**G2 — `npm run proof:live-verified-ledger:ay` → exit 0 (GREEN)** with the W-SB3 row on the AY
`VISUAL-ALLOWLIST.json` (`["W-SB3"]`) and `docs/tranches/AY/audit/visual/W-SB3-DELTA.md`
referencing the SIX own-surface PNGs (`W-SB3-{card,glass-panel,carousel}-desktop-{light,dark}.png`),
each a real on-disk PNG (`isRealPng`: >1024 bytes, `\x89PNG` magic), with the light+dark pair
present per the `deltaSatisfied` `^W-SB3-…-(light|dark)\.png` clause. The ledger artefact's
`liveVerified` / `violations` arrays are the evidence: `violations: []`, the W-SB3 row
satisfied. This is the cardinal-lesson close — the three FIX/VERIFY routes pass on captured
pixels, not prose. (If `proof:live-verified-ledger:ay` is not yet a `package.json` script when
this wave runs, the equivalent command is
`node scripts/proof-live-verified-ledger.mjs --tranche=AY` — W-CARDINAL-INFRA `:140` adds the
`:ay` alias.)

**The single binding condition:** `proof:story-language-consistency` is GREEN
(124 routes scanned, 123 + 1-full-bleed-allowlisted compose StoryPage, 0 doctrine-register
easing hardcodes with the 1 keyframe carve-out enumerated, self-test flags both synthetic
fixtures) AND `proof:live-verified-ledger:ay` is GREEN with the W-SB3 row backed by the six real
own-surface light+dark PNGs across the three FIX/VERIFY routes. The born-RED bite capture (a
hardcoded `cubic-bezier` on a `transition` injected → RED → reverted) is attached to the wave
PROGRESS as the falsifier proof.

---

## §6 — Named successors / out-of-scope edges

- The per-component frontend-design FIT audit (glass-ui↔slides) is **W-CONVERGE** (`AY.md:199`),
  NOT this wave — `AY.md:199` itself notes "W-SB3's story-language is a thin proxy, not the
  component-vs-consumer FIT." W-SB3 asserts INTERNAL storybook consistency (chassis + motion
  tokens); it does not adjudicate whether each component is the design optimum.
- The orphan-component retires (header-ribbon, glass-panel-the-COMPONENT) are **W-SB1** — note
  glass-panel-the-STORY is a VERIFY route here (its DELTA), but the COMPONENT's ≥2-consumer
  disposition is W-SB1's clean-break decision. If W-SB1 RETIRES the glass-panel component+route,
  W-SB3 drops `glass-panel` from its DELTA set (coordinate ordering: W-SB1 lands first; W-SB3
  captures only surviving routes). Record the coordination in PROGRESS.
- The scattered-dock triage + metric co-location + carousel/deck-progress disambiguation are
  **W-SB2** (its own `proof:dock-staging-triage` gate). W-SB3 does not touch the manifest.
- Per-route DELTA granularity (a separate ledger row per route vs the one W-SB3 row referencing
  three routes' PNGs): this wave uses the ONE-W-SB3-row form (the ledger keys on `^W\d` PROGRESS
  rows; a sub-wave-id per route is not in the ledger's parse). If a future pass wants per-route
  ledger rows, that is a `proof:live-verified-ledger` parse extension → **AY.W-CARDINAL-INFRA**'s
  named successor, not this wave.

## §7 — Cross-references

- `docs/tranches/AY/audit/hardening/H-storybook.md` §3 F9 (the prose gate + un-mandated DELTAs),
  §5 (F9 → W-SB3), §6 criteria 5+6 (the convergence bar this wave closes).
- `docs/tranches/AY/waves/AY.W-CARDINAL-INFRA.md` (the `proof:live-verified-ledger` engine + the
  AY home + `VISUAL-ALLOWLIST.json` sidecar this wave consumes; `:140` the `:ay` alias).
- `docs/tranches/AY/waves/AY.W-SB1.md` / `AY.W-SB2.md` (the sibling prune + restructure waves;
  the coordination ordering in §6).
- `scripts/proof-story-language.mjs` (the META-language sibling gate — the house shape this gate
  follows; the DISTINCT job — that one strips dev-history prose, this one asserts chassis+motion).
- `scripts/proof-no-orphan-demo-route.mjs` (the manifest-route derivation + category-scoped walk
  this gate reuses).
- `src/styles/tokens.css §2` (`:191-214` — the canonical `--spring-*`/`--ease-*` token ladder
  the C clause reads); CLAUDE.md §"Easing doctrine (AX.W52 §6)" (the doctrine the gate enforces).
- `AY.md:170` (the W-SB3 row this spec promotes from prose to a real gate).
