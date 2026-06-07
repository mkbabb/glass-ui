# SEQUENCING — the cross-repo AW adoption program

This is the MASTER sequencing annex for the AW constellation. It ties the six per-consumer wave specs (`waves/<repo>-<L>-adopt.md`) into one publish-event DAG. It is authored in glass-ui's OWN docs tree; the per-consumer specs are glass-ui-authored HANDOFF ANNEXES each sibling lifts into its own `docs/tranches/<L>/` (see §5 inv-16').

Every fact below is cited file:line from the six constellation digests under `docs/tranches/AW/audit/constellation/`. npm latest at audit (2026-06-07): glass-ui **3.3.0**, value.js **0.11.0**, keyframes.js **4.0.0** (`peer-matrix.md:9`).

---

## 1. Roster — the 6 active consumers

dns-speedtest is DEAD (excluded — not in the constellation). The six active consumers:

| # | Repo | glass-ui pin @ HEAD (file:line) | branch · HEAD | next tranche | dock blast radius | wave spec |
|---|---|---|---|---|---|---|
| 1 | **fourier-analysis** (web) | `^3.1.0` (`web/package.json:14`) | master · `0167268` | **L-adopt** (L collides with booked L-webmcp → webmcp slides to M; ξ′) | ×3 simple-collapse — `AnimationControls.vue:58` · `CanvasControlsDock.vue:41` · `EditorControlsDock.vue:56` (all EXPOSED) | `waves/fourier-L-adopt.md` |
| 2 | **value.js** | `file:../glass-ui` (`package.json:69`) | tranche-f-handoff · `e8cc1fb` | **N** (M is the live planning-only head) | ×1 desktop-only — demo `Dock.vue:93` (`:always-expanded="!isDesktop"` flips collapse on desktop); LIVE-BROKEN NOW via symlink | `waves/valuejs-N-adopt.md` |
| 3 | **keyframes.js** | `^3.3.0` optionalDep (`package.json:89`) | tranche-g-impl · `a8b618b` | **H** (A→G complete; the `tranche-H` git strings are April fossils) | ×1 desktop-only — demo `TopDock.vue:118`; LIVE-BROKEN NOW (on broken 3.3.0) | `waves/keyframes-H-adopt.md` |
| 4 | **speedtest** | `^3.1.0` (`package.json:88`) | master · `bdeefcc7` | **AV** (AU is plan-only; *-SEED convention) | **ZERO collapse exposure** — `Dock.vue:171` always-expanded, `SurveyResultDock.vue:32` always-expanded; but the bump floor is still 3.4.0 (live VT-via-dock consumer); CLEAN tree | `waves/speedtest-AV-adopt.md` |
| 5 | **muster** (frontend) | `^3.1.0` (`frontend/package.json:19`) | master · `6be5082` | **L** (head K) | ×1 simple-collapse — `CommandDock.vue:118` (EXPOSED; the `#collapsed` pill is core UX) | `waves/muster-L-adopt.md` |
| 6 | **words/Floridify** (frontend) | `^3.0.0` (`frontend/package.json:19`) | master · `d11640d` | **B** (head A only; needs a CI-floor wave first) | both `always-expanded` (`WordListView.vue:22,109`) → FINE; one admin manual-collapse `ThemeSelector.vue:6` EXPOSED | `waves/words-B-adopt.md` |

Pin/HEAD source: `adoption-sequencing-dag.md:9-18`. Dock exposure: `dock-regression-blast-radius.md:19-52`. Tree state: speedtest CLEAN (`adoption-sequencing-dag.md:18`); value.js + keyframes file:/3.3.0 LIVE-BROKEN (`dock-regression-blast-radius.md:26-37`).

> Wave-spec filenames carry the sibling's verified NEXT-tranche letter (the `*-tranche-idiom.md` lanes establish each): fourier **L-adopt**, value.js **N**, keyframes **H**, speedtest **AV**, muster **L**, words **B**. (Do NOT anchor on `ledger-reconcile.md`'s M/G — those are value.js's and keyframes' CURRENT heads, not their next letters.) When a sibling lifts its annex into its own repo it keeps this letter unless its head has moved again — re-verify at lift time.

---

## 2. The DAG — the publish-event milestone chain

The program is a near-tree rooted at ONE dominant node, **E1 = glass-ui 3.4.0**. Two supplier-edge pin bumps (E0a/E0b) hard-precede E1's aurora-band CI; E1 hard-gates 5 of 6 consumers; E2 (aurora band) and E3 (blob band) open LATER consume windows for the aurora/blob subset only. **E1 also carries the AW.W19 repatriation-prune** (−3 repatriated compositions + −2 orphans = −5 families); the two affected consumers (speedtest, muster) do a NATIVE-FIRST repatriate-receive move on their CURRENT pins (E1-pre) BEFORE E1 publishes the pruned cut, so their E1 bumps resolve no dangling import (inv-16′ native-first / prune-after).

```
  ┌────────────────────── PRE-PUBLISH SUPPLIER EDGES (glass-ui-side, land IN 3.4.0) ──────────────────────┐
  │  E0a  value.js peer  ^0.10.0 → ^0.10.0||^0.11.0   (package.json:616)  ── HARD-precedes AW.W5 CI-green  │──┐
  │  E0b  keyframes peer ^2.2.0||^3.0.0 → +||^4.0.0    (package.json:615)  ── ship-safe, independent        │  │
  └───────────────────────────────────────────────────────────────────────────────────────────────────────┘  │ E0a precedes E2
                                                                                                               ▼
  ┌── E1-pre : NATIVE-FIRST REPATRIATION (lands on the CURRENT pins, BEFORE E1; inv-16′) ──┐
  │  speedtest AV-R0 — native copies of metric-cell/stack/instrument-chassis                  │
  │    + rewired imports (on ^3.1.0); scrolling-text + pulse STAY library imports             │
  │  muster W2-repatriate — native copies of metric-cell/stack/instrument-chassis            │
  │    + rewired imports (on ^3.1.0); pulse STAYS a library import                            │
  │  THEN glass-ui AW.W19 prunes those 3 + 2 orphans (metric-pill, instrument-rail) IN 3.4.0  │
  └──────────────────────────────────────────────────────────────────────────────────────────┘
                                                       ▼
  ╔═══════════════════ E1 : glass-ui 3.4.0 PUBLISH ═══════════════════╗  ── AW.W1 dock fix + W2/W3 motion
  ║  (AW.W1 dock-collapse fix + W2/W3 dock motion + W16/W17           ║     + W19 repatriation-prune (−5)
  ║   convergence + the passive band-D/F/G glass-atom lifts           ║     + passive band-D/F/G lifts
  ║   + the AW.W19 repatriation-prune: −3 repatriated, −2 orphans)    ║     + the E0a/E0b peer widens
  ╠═══════════════════════════════════════════════════════════════════╣
  ║  HARD-GATES 5 of 6 (each mounts the broken simple-collapse path):  ║
  ║    ├─ fourier      ^3.1.0 → ^3.4.0   (un-fixme 2 a11y e2e)         ║
  ║    ├─ speedtest    ^3.1.0 → ^3.4.0   (AFTER R0 repatriate; clean)  ║
  ║    ├─ muster       ^3.1.0 → ^3.4.0   (AFTER W2-repatriate; TOUCHED)║
  ║    ├─ value.js     file: tracks HEAD (auto-fixes on AW.W1 build)   ║
  ║    └─ keyframes    ^3.3.0 → ^3.4.0   (fixes its broken TopDock)    ║
  ║                                                                     ║
  ║  words ⊥ E1 — NOT gated (always-expanded docks). Bumps            ║
  ║    ^3.0.0 → ^3.4.0 any time; still WANTS the dock-fixed cut for    ║
  ║    the admin ThemeSelector manual-collapse path.                   ║
  ╚═══════════════════════════════════════════════════════════════════╝
                                                       │ E1 < E2 (3.4.0 cuts dock+convergence ONLY)
                                                       ▼
  ┌──────── E2 : glass-ui 3.4.x/3.5 PUBLISH — AW band B aurora (W5 derive-door + W4 painterly + W6-8) ────────┐
  │  needs E0a ALREADY landed.  Opens the aurora-richness window — 3 consumers ONLY (SOFT, opt-in):           │
  │    ├─ speedtest      src/config/auroraConfig.ts → single deriveAurora call; opt-in stroke/impasto/flow    │
  │    ├─ muster         useAuroraConfig.ts 2-stop palette + lerpHsl → one brand-hue derive call              │
  │    └─ value.js demo  color-picker/App.vue:209-214 static clone → deriveAuroraConfig(cssColor)             │
  │  NOT fourier · NOT words · NOT keyframes (zero aurora surface — honest negatives, §4)                     │
  └────────────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                       │
                                                       ▼
  ┌──────── E3 : later cut — AW band C blob (W9 droplet + W11 mood) — 1 consumer ───────────────────────────┐
  │    └─ value.js demo  flagship blob migration: delete ~6-file local goo-blob fork →                       │
  │                      @mkbabb/glass-ui/goo-blob (supply colorResolver) ; THEN opt into W9 lit/W11 irid.    │
  │  (value.js can migrate the blob SURFACE on ANY 3.4.x — the colorResolver seam shipped in 3.3.0;           │
  │   W9/W11 lit/iridescence fold in SECOND when E3 publishes)                                                │
  └────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

Edge sources: E0a/E0b `adoption-sequencing-dag.md:36-41,95-96` + `peer-matrix.md:24,42-52`. E1 5-of-6 gate `adoption-sequencing-dag.md:20-30`, `dock-regression-blast-radius.md:56`. words ungated `adoption-sequencing-dag.md:32-34`, `dock-regression-blast-radius.md:48-52`. E1<E2 `adoption-sequencing-dag.md:99`, `aurora-blob-consumer-demand.md:80`. E2 3-consumer set `aurora-blob-consumer-demand.md:31-42,71-73`. E3 blob `aurora-blob-consumer-demand.md:43-49,73,81`.

**Headline sequencing edge:** the entire constellation funnels through E1 (glass-ui 3.4.0 / AW.W1 dock-collapse fix). 5 of 6 consumers mount the simple two-layer collapse path that 3.3.0 freezes and MUST land on 3.4.0, never `^3.3.0` (`dock-regression-blast-radius.md:56`). For the 4 NON-repatriating consumers (fourier, value.js, keyframes, words) the 3.4.0 bump is ONE coordinated event in a single pin hop, zero code change — props/tokens unchanged (`adoption-sequencing-dag.md:105`). For the 2 repatriating consumers (speedtest, muster) the bump is preceded by a native-first repatriate-receive move on the current pin (E1-pre — each owns the 3 repatriated compositions before the prune lands; scrolling-text + pulse stay library imports), then a clean version-only bump. The repatriation-prune is folded INTO the 3.4.0 cut (AW.W19), not a separate publish.

---

## 3. Pre-publish supplier edges — the TWO glass-ui peer bumps that ship IN the 3.4.0 cut

Both are glass-ui-side AW work (see `glassui-aw-corrections.md`), landed in `glass-ui/package.json` `peerDependencies` (no consumer touch). They must ship IN 3.4.0 so the publish carries corrected ranges (`peer-matrix.md:49`).

### E0a — value.js peer: `^0.10.0` → admit `^0.11.0`

`glass-ui/package.json:616` peers `@mkbabb/value.js: "^0.10.0"`. `^0.10.0` = `>=0.10.0 <0.11.0` — does NOT admit npm-latest 0.11.0 (`peer-matrix.md:24`). AW.W5's derive-color (`deriveScene`/`deriveAurora`) must CONSUME value.js's `interpolateHue` / `HueInterpolationMethod` / `mixColorsN` (`value.js/src/units/color/dispatch.ts:219,234,277`) which ship ONLY in the 0.11.0 line (`adoption-sequencing-dag.md:40`). The local `file:` symlink masks the mismatch in dev; the registry CI for AW.W5's `proof:aurora-oklch-interp` gate is RED until the peer admits 0.11.0. **HARD-precedes AW.W5** (`adoption-sequencing-dag.md:95`).

**THE dual-value.js-instance trap (sequence carefully).** keyframes.js 4.0.0 declares `@mkbabb/value.js: "^0.11.0"` as a HARD dependency, not a peer (`keyframes.js/package.json:86`, `peer-matrix.md:26`). value.js is a color-singleton seam — glass-ui's `ColorResolver` / OKLCh core consume `@mkbabb/value.js`. A consumer holding glass-ui (wanting value 0.10) + keyframes 4 (forcing value 0.11) installs TWO value.js instances → two color caches, two `Color` prototypes, the classic `instanceof` + module-singleton break (`peer-matrix.md:26`). E0a's widen to admit 0.11.0 is what lets glass-ui + every consumer resolve a SINGLE value.js once keyframes-4 lands. The widen is the precondition that DEFUSES the trap; do NOT bump the keyframes peer (E0b) without it.

### E0b — keyframes peer: `^2.2.0 || ^3.0.0` → admit `^4.0.0`

`glass-ui/package.json:615` peers `@mkbabb/keyframes.js: "^2.2.0 || ^3.0.0"` — excludes npm-latest 4.0.0 (`peer-matrix.md:24`). glass-ui's consumed `SpringProgress` surface is UNTOUCHED by the 4.0.0 `tick→tickDt` break (`adoption-sequencing-dag.md:41`, `keyframes-motion-seam.md` F6-7) — a pure pin-widen to `^2.2.0 || ^3.0.0 || ^4.0.0` with zero source change. Ship-safe and INDEPENDENT of every dock/aurora wave; landable any time but folds cleanly into 3.4.0. Verify glass-ui's spring-runtime imports (`src/composables/motion/`) still typecheck against keyframes 4's API BEFORE the widen (`peer-matrix.md:44`).

**Companion devDep rebaseline + a born-RED gate** (`peer-matrix.md:45-46`): bump `glass-ui/package.json:646-647` devDeps to the post-widen versions glass-ui actually builds against, and add `proof:peer-conformance` — reads glass-ui's own peer ranges + `npm view` latest, asserts `semver.satisfies(latest, range)`, reverts to RED if the range is re-narrowed. Plus `proof:single-value-instance` (the dual-instance lock — assert one resolved value.js across glass-ui + keyframes). Both are glass-ui-side, recorded in `glassui-aw-corrections.md`.

---

## 4. Per-consumer adoption windows

| Repo | gated-on | what lands in its wave | unblocked-NOW (version-independent, no publish) |
|---|---|---|---|
| **fourier** | **E1** | pin `^3.1.0→^3.4.0`; un-fixme 2 a11y e2e keystones (`visualization-ux.spec.ts:110,133`, `visualization-crud.spec.ts:630`); add `e2e/dock-smoke.spec.ts` | `@source "...node_modules/@mkbabb/glass-ui/dist"` content-scan directive (ABSENT — `text-destructive-foreground` verified dropping) |
| **speedtest** | **E1-pre** (AV-R0 repatriate, on current pin) + **E1** (dock-safe but bumps for W1+motion canon) + **E2** (aurora opt-in) | E1-pre: AV-R0 — native copies of metric-cell/stack/instrument-chassis + rewired imports + `check-glass-ui-boundary.mjs` `SUBPATH_OWNED` drops the 3 (on `^3.1.0`); scrolling-text + pulse stay library imports. E1: pin `^3.1.0→^3.4.0` (clean, post-repatriate) + DockBackgroundToggle wiring + delete `useAuroraPolicy.ts`. E2: `auroraConfig.ts` → single `deriveAurora`; opt-in strokeAmount/impasto/granulation/flow | `@source` directive (ABSENT; CVA utilities verified dropping); CLEAN tree — no dirty blocker |
| **muster** | **E1-pre** (W2-repatriate, on current pin) + **E1** (+ **E2** aurora opt-in) | E1-pre: W2-repatriate — native copies of metric-cell/stack/instrument-chassis + rewired imports (on `^3.1.0`); pulse stays a library import (NOT scrolling-text — muster never consumed it). E1: pin `^3.1.0→^3.4.0` (picks up W1+W2+W3 in one hop; TOUCHED — the repatriate is real source, NOT zero-code-change). E2: `useAuroraConfig.ts` 2-stop palette + lerpHsl → one brand-hue derive call | already has `@source` (only repo that does); keep `critical-path-gate.mjs` aurora-lazy contract green |
| **value.js** | **E1** (symlink auto-fix) + **E2** (aurora opt-in) + **E3** (blob) | E1: `file:` tracks HEAD — AW.W1 fix flows on next glass-ui `build:watch`, no pin edit. E3: flagship blob migration (delete ~6-file local fork → `/goo-blob`, supply `colorResolver`; re-point `BlobPane.vue:8`). E2: `App.vue:209-214` static clone → `deriveAuroraConfig` | `@source` directive (ABSENT) + drop the STALE pre-AN.W1 redundant `/styles.css` second import line |
| **keyframes** | **E1** | pin `^3.3.0→^3.4.0` (keyframes' OWN tranche-G item; fixes its live-broken `TopDock.vue:118` desktop collapse). COPY `proof-repin-safe.mjs` → `proof-glassui-repin.mjs` | `@source` directive (ABSENT); needs NOTHING aurora/blob (honest negative) |
| **words** | **NOT gated** (always-expanded) but wants dock-fixed cut | pin `^3.0.0→^3.4.0` (edit `frontend/package.json:19` AND regen ROOT lock — NOT the stale `frontend/glass-ui/` 3.1.1 vendored dir). PRE-REQ: stand up a born-RED CI floor (no CI/dead `test` stub today) | `@source` directive (ABSENT) |

**Honest negatives (first-class findings, NOT gaps — `adoption-sequencing-dag.md:34`, `aurora-blob-consumer-demand.md:51-56`):** fourier, words, keyframes carry ZERO aurora/blob and need NOTHING from band E2/E3. keyframes' natural glass-ui fit is the Configurator/spring-param seam + the `--spring-*` supplier loop, NOT an invented aurora showcase. Forcing an aurora/blob surface into any of these violates the ≥2-consumer / no-invented-demand invariant.

**Two token-name FREEZE obligations ride the 3.4.0 bump** (regression fixtures for AW.W26/W31 — `adoption-sequencing-dag.md:106`): speedtest binds `--spring-snappy` / `--ease-out` / `--duration-{slow,normal}` / `--motion-stagger-*`; muster binds `--spring-{snappy,bouncy}` / `--ease-{standard,out-expo}` / `--duration-{fast,normal,medium}` + `--glass-{highlight,specular,under-shadow-*}` (`muster styles.css:104-117,290-299`). A rename silently falls back — W31/W26 must hold these names or carry a migration note.

The `@source`/wiring fixes are VERSION-INDEPENDENT — they land now, no publish needed (`adoption-sequencing-dag.md:117` confirms wiring is otherwise already correct fleet-wide; the `@source` gap is the one cross-cutting unblocked-now repair, absent in 5/6 repos per the cross-cutting facts).

---

## 5. inv-16' — the handoff protocol

The six `waves/<repo>-<L>-adopt.md` specs are **glass-ui-authored HANDOFF ANNEXES**, NOT glass-ui execution work. The discipline:

1. **glass-ui writes the annexes, executes NONE of them.** glass-ui sessions own ONLY glass-ui (write boundary `glass-ui/**`). No glass-ui session writes a sibling repo file. The annexes live in glass-ui's own `docs/tranches/AW/constellation/waves/`, NAMED for the sibling to lift.
2. **Each sibling LIFTS its annex into its own `docs/tranches/<L>/`** and executes on a CLEAN checkout of its OWN repo, gated on its OWN green CI (inv-16'). value.js → tranche **M**; keyframes → tranche **G**; the hub repos open a tranche letter of their own choosing.
3. **Each annex is authored in the sibling's VERIFIED house idiom** (per `constellation-gate-idiom.md`) so it drops in cleanly: fourier's e2e-spec-in-`ci.yml` culture; value.js's full-ladder CI + console-clean smoke; keyframes' `proof:*` + `proof:ci-coverage` self-gate (COPY `proof-repin-safe.mjs`); speedtest's `ci:gate` + `check-glass-ui-boundary.mjs` `SUBPATH_OWNED` ledger + `proof` runner; muster's `critical-path-gate.mjs` aurora-lazy contract (and FIRST close its un-wired-Playwright gap); words' MISSING floor (stand up CI before any adoption gate is meaningful — `constellation-gate-idiom.md:30-31,47`).
4. **Each annex states at its top** that it is a glass-ui-authored handoff annex the `<repo>` maintainer applies in `<repo>`'s own repo on a clean checkout gated on `<repo>`'s own green CI, and CITES every file:line against the sibling's ACTUAL HEAD (from the digests — never invented).

glass-ui's role ends at authoring. The two `file:` siblings (value.js, keyframes demo) inherit the AW.W1 fix on a glass-ui rebuild with NO pin edit; the four registry pins (fourier/speedtest/muster/words) edit `^3.4.0` themselves in their own arms.

---

## 6. What glass-ui owes — pointer to `glassui-aw-corrections.md`

The glass-ui-side AW corrections the audit surfaced (authored in the companion `glassui-aw-corrections.md`; this section is the index):

- **AW.W19 REPATRIATION-PRUNE (load-bearing; the KEEP-flip was OVERRIDDEN).** An earlier reading flipped W19's default-DELETE of metric-cell + metric-stack to KEEP on their external speedtest/muster consumers. **The user resolved the other way** (`audit/repatriation/_DECISION.md:8-29`): the test is GENERIC ATOM vs DOMAIN-SPECIFIC COMPOSITION — a domain-specific instrument composition repatriates (speedtest and muster, the instrument/domain apps, own their bespoke compositions native); a generic atom stays shared. So W19 is re-scoped to a **repatriation-prune + orphan-prune + useBreakpoint re-instate** wave: **−3 repatriated** (metric-cell, metric-stack, instrument-chassis — the 3 domain compositions, native-first into speedtest+muster, THEN pruned from glass-ui) + **−2 orphans** (metric-pill, instrument-rail — deleted outright) + **5 keeps** (scrolling-text + pulse — generic atoms, exported primitives; metric-badge, animated-digit, status-dot — general-app-justified; all documented) + the `useBreakpoint` re-instate. The repatriation is native-first / prune-after (inv-16′): speedtest+muster carry native copies + rewired imports BEFORE glass-ui removes the source, so no consumer resolves a dangling import. The −5-family prune (3 repatriated + 2 orphans) is part of the glass-ui 3.4.0 cut; the speedtest+muster version bumps to the pruned cut land AFTER, as clean version-only moves. glass-ui-side fix in `waves/AW.W19-orphan-prune.md`.
- **AW.W0 consumer-count extension.** W0's spot-verify `rg` is structurally BLIND — it scopes glass-ui `src/` only, missing external subpath consumers (it would have missed the metric-cell/stack speedtest+muster consumers). W0 must extend its consumer count to the external constellation (cross-cutting fact 9). Under the repatriation policy the census feeds the REPATRIATE-vs-KEEP verdict (`_DECISION.md:30-46`), not a blind KEEP: it must classify each external consumer as GENERAL-app (keeps the family shared) vs instrument/domain app (speedtest/muster — forces repatriation), per `_DECISION.md:14-20`.
- **The two peer widens + `proof:peer-conformance` gate.** E0a value.js `^0.10.0`→admit `^0.11.0` + E0b keyframes `^2.2.0||^3.0.0`→admit `^4.0.0`, both IN the 3.4.0 cut, plus the born-RED `proof:peer-conformance` semver gate + `proof:single-value-instance` dual-instance lock + devDep rebaseline (`peer-matrix.md:42-47`; §3 above).
- **AW.W5 interpolateHue consume-not-own amendment.** W5's derive-color MUST CONSUME value.js (`interpolateHue`, `gamutMapOKLab`, the Ottosson path), NEVER re-own color math — value.js owns COLOR in the UNION-COORDINATION 4-repo contract (cross-cutting fact 8; `adoption-sequencing-dag.md:113`). A value.js-side harmony API would be speculative single-consumer substrate (`adoption-sequencing-dag.md:113`).
- **The value.js `useBreakpoint` re-instate decision** + D8 devDep harmonize (the keyframes devDep still split at HEAD — `ledger-reconcile.md:78-82,115-118`) + the A-1/A-2 configurator-polish fold (machined-groove divider upgrade + label→typography-ladder, fold into W22-26 atoms, NOT a new wave — `ledger-reconcile.md:100-118`).

See `glassui-aw-corrections.md` for the full glass-ui-side correction set with gate sketches and file bounds.
