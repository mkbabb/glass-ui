<!-- The unified brief from the wumos710o investigation fleet (2026-06-16). The spec fleet's single source of truth. READ-ONLY investigation product. -->

I have all the grounding I need. The investigations are confirmed against HEAD `13abb3e2`, and the existing amendment framings that need superseding are located (vaul "irreducible/booked-successor" at lines 24/78/289; value-1.0 "candidate, not assumed" at line 65; the split `^1.0.0` leg between the two amendments). Now I'll write the unified brief.

---

# BB UNIFIED BRIEF — the spec fleet's single source of truth

**Grounded at glass-ui HEAD `13abb3e2`; constellation surveyed 2026-06-16. READ-ONLY investigation product — no edits authored.**

This brief reconciles three investigations (A: expanded-constellation survey; B: value.js-N ↔ kf-K cross-tranche reconciliation; C: sci-report seven-needs re-ground + vaul options) against the existing BB tranche state, then folds the three user decisions of 2026-06-16. It is the input the BB **spec fleet** consumes; it authors no source, no dependency edits, and no wave files — it tells the spec fleet exactly which specs to write and which amendments to update.

The headline: **everything reconciles — no load-bearing cross-tranche dissonance.** value.js-N and kf-K are mutually coherent with BB's constellation-modernize band; the spine targets already match (value `^0.13.0`→`^1`, kf `^4` clean caret); the publish beats are acyclic. The brief's job is to (a) fold three new spine consumers + two new WASM leaves into the dep band, (b) promote value→1.0 from "candidate" to DECIDED and reconcile the split `^1.0.0`-leg statements, (c) make the vaul abrogation concrete (the `@vueuse-10` dual is now KILLED, not booked), and (d) place the seven Atlas needs onto waves with zero forks.

---

## SECTION 1 — THE EXPANDED-CONSTELLATION MODERNIZE ADDITIONS

The existing `BB-AMENDMENT-constellation-modernize.md §2` ledger covers the ORIGINAL set (glass-ui, fourier, slides, speedtest, sci-report, colors + the 5 leaves). This section ADDS three consumers and two leaves. These FOLD INTO that ledger — the spec fleet appends rows, it does not duplicate the original members.

### 1.1 The two new leaves — STANDALONE WASM leaves, off the JS spine

| Leaf | Registry | Source crate (on disk) | Verdict | Spine fold |
|------|----------|------------------------|---------|-----------|
| **@mkbabb/morph** 0.1.1 | `{latest:0.1.1}` | `csc411/CSC411_HW2_ProgrammingQuestion/csp-solver/wasm-morph` (Cargo `name=morph`, `publish=false`) | STANDALONE WASM LEAF (Rust-rooted, wasm-bindgen 0.2 + serde 1) | family **caret-discipline arm ONLY** — NEVER `proof:constellation-spine`'s build-tool/runtime singleton checks |
| **@mkbabb/csp-solver-wasm** 0.1.1 | `{latest:0.1.1}` | `csc411/.../csp-solver/wasm` (the published one) | STANDALONE WASM LEAF | same; **+ a publisher-provenance fence** (below) |

**The load-bearing scoping fact for the spec fleet:** both leaves carry ZERO JS-spine deps (no vue/vueuse/reka/tailwind/vite/ts). Their coherence regime is the **Rust toolchain** (wasm-bindgen, serde), which is outside BB's scope. They are published-contract leaves the way keyframes/value are — a consumer carets them — so they belong in the `@mkbabb/*` **family caret ledger** but on a DIFFERENT axis: they fold into the family caret-discipline arm of the §A4 publish beats ONLY, never the build-tool singleton checks. The spec fleet must record this as a **NEW-class (WASM-LEAF axis)** in the §2 ledger so a future agent does not try to spine-lock them.

Two recorded notes (NOT defects):
- **wasm-pack-standard shape.** The `pkg/package.json` for both lacks `exports`/`type:module`/`files`-completeness beyond `module`/`types`. This is the standard wasm-pack output and is consumable (bbnf-buddy resolves + imports both via `src/composables/wasm/{morph,csp}.ts`). Record as "wasm-pack-standard, no `exports` map" — not a spine-lock target.
- **The csp DIVERGENT-PUBLISHER fence (NEW class — the d6-lineage class, csp edition).** A SECOND on-disk publisher exists: `muster/csp-wasm` (Cargo `name=csp-wasm` v0.2.0, pkg name `csp-wasm`, restaurant-specialized — NOT the published leaf). It could publish over `@mkbabb/csp-solver-wasm` and strand bbnf-buddy. The spec fleet must record a provenance fence: **the published `@mkbabb/csp-solver-wasm` MUST originate from the csc411 `wasm` crate, never muster's `csp-wasm`.** This is the BB inv-11 "no out-of-band lineage publish" pattern applied to a WASM leaf — the names must stay distinct or the publish provenance is ambiguous.

### 1.2 The three new consumers — verdicts + modernize scope

**CONSUMER 1 — words/frontend (`floridify-frontend` 0.1.0) → SPINE CONSUMER.**
Direct `@mkbabb` deps: glass-ui `^3.0.0` (resolves 3.0.0, stale-lineage pre-prune, BEHIND-MAJOR), keyframes.js `^2.2.0` (BEHIND-MAJOR ×2), latex-paper `^0.2.1` (at-latest but republish-gate-blocked). NO direct value.js. Already on the FORWARD toolchain (vite ^8.0.13, TS ^6.0.3 — GOOD; on `@lucide/vue` v1 already, unlike playground). Modernize scope: glass-ui `^3→^4`, kf `^2→^4`, latex-paper re-lock (post-BEAT-4 gate), @lucide/vue `^1.16→^1.20`, vue-router `4→5` (breaking — migration-check, NOT a free bump), axios minor, **retire tailwind-merge** (cn() anti-pattern), re-lock the patch/minor drift. Independent product deps (not spine): @clerk/vue `v1→v2`, puppeteer `24→25` (dev), katex `^0.16→^0.17` (latex-paper-peer-pinned). **The latex-paper republish-gate (BEAT 4) is a HARD prerequisite for words' vite-8/katex re-lock — words is the SECOND dependent behind that gate (fourier is the first).**

**CONSUMER 2 — bbnf-lang/playground (`@mkbabb/bbnf-playground`, private) → SPINE CONSUMER, the DEEPEST build-tool lag.**
Direct `@mkbabb`: glass-ui `^3.0.0`, kf `^2.2.0`, value.js `^0.10.0`. The lag is structural: **vite `6→8` (BEHIND-MAJOR ×2 — the worst build-tool lag in the whole constellation)**, @vitejs/plugin-vue `5→6`, TS `5→6`, vue-router `4→5`, AND the **`lucide-vue-next` 0.x → `@lucide/vue` ^1.20 rename** (it is the ONLY member still on the legacy package name — clean-break migrate per CLAUDE.md). Plus tighten the loose floors (reka `^2.0→^2.9`, tailwind `^4.1→^4.3`, vue `^3.5.0→^3.5.38`), monaco minor, value `^0.10→^0.13`/`^1`. It is the analogue of slides/fourier (TS5/Vite7 class) but one major worse on vite.

**CONSUMER 3 — bbnf-buddy (`@mkbabb/bbnf-buddy` 0.1.0, private) → SPINE CONSUMER, the DENSEST, already on the forward toolchain.**
The densest `@mkbabb` consumer — SIX family members: glass-ui `^3.9.0`, kf `^2.1.1`, value `^0.10.0`, pencil-boil `^0.3.0`, morph `^0.1.1`, csp-solver-wasm `^0.1.1`. It GENUINELY imports morph + csp (`src/composables/wasm/{morph,csp}.ts`, `src/forms/align*.ts`) — REAL WASM consumers, not phantom deps, which means **bbnf-buddy is the SOLE validator of the morph/csp caret discipline.** Already TS6 + Vite8 (like speedtest — the cleanest consumer toolchain of the new set). Modernize scope is purely the `@mkbabb` family caps: glass-ui `^3.9→^4`, kf `^2.1→^4`, value `^0.10→^0.13`/`^1`, pencil-boil `^0.3→^0.4.1` (matches glass-ui's optionalPeer floor), morph/csp stay at-latest, **retire tailwind-merge**, re-lock patches.

### 1.3 The independent-node services (NOT spine — own "latest, no legacy" tracks)

- **words/backend** — Python service (pyproject floridify, py 3.12-3.15; httpx/motor/pydantic). Its `package.json` is a near-empty stub carrying a **DEAD `radix-vue ^1.9.17`** (the pre-reka-ui name, an orphan dep on a Python service) + clsx/tailwind-merge. **NOT spine. Flag the dead radix-vue stub for deletion (NEW class — dead-stub).** Python deps own track.
- **words/notification-server** — standalone Express/TS service (express 4, mongodb 6, zod 3, TS 5.3, eslint 8). **INDEPENDENT NODE — NOT spine.** Own modernize track (TS5.3→6, eslint8→flat-9, zod3→4, express/types), unrelated to the glass-ui spine.
- **bbnf-lang/extension** (`bbnf-language-support` 1.0.5, VS Code LSP) — zero `@mkbabb` runtime deps, pure LSP tooling (esbuild ^0.25, vscode-languageclient ^9, TS ^5.8). **INDEPENDENT NODE — NOT spine.** Optional TS5.8→6 for editor coherence, not spine-locked.

### 1.4 How `proof:constellation-spine`'s enrolled-member list grows

The gate's enrolled-consumer roster gains **THREE rows**: `words/frontend`, `bbnf-lang/playground`, `bbnf-buddy` (each spine-locked to the coherent-latest build-tool/runtime singletons + the `@mkbabb` family carets). The gate gains the **WASM-LEAF caret arm** for `@mkbabb/morph` + `@mkbabb/csp-solver-wasm` (a family-caret-only check, validated through bbnf-buddy, NEVER a build-tool singleton check). The independent nodes (words/backend, words/notification-server, bbnf-lang/extension) are explicitly NOT enrolled — record them in the ledger as independent-node-services with their own tracks so a future census does not mistake the un-enrolled state for a miss.

### 1.5 NEW classes surfaced for the §2 ledger extension

The spec fleet adds these classes to the constellation-modernize §2 ledger:
- **WASM-LEAF axis** — morph + csp are a coherence axis outside the JS spine (Rust/wasm-bindgen); family-caret arm only.
- **csp-solver-wasm DIVERGENT-PUBLISHER risk** — `muster/csp-wasm` v0.2.0 provenance fence (csc411 crate is the canonical publisher).
- **vue-router 5 BEHIND-MAJOR(1)** — words/frontend + playground (+ slides if it uses it) cap at `^4.6.4`; 5.1.0 is a breaking adopt, migration-check.
- **lucide-vue-next legacy package** — playground is the only member on the old 0.x name; migrate to `@lucide/vue ^1.20` (clean break).
- **latex-paper republish-gate has TWO dependents** — fourier + words/frontend (widens BEAT 4 blast radius).
- **tailwind-merge cn()-anti-pattern legacy** — words/frontend + bbnf-buddy + playground all carry their own tailwind-merge; candidate retire across all three onto clsx + glass-ui's dedup.
- **dead radix-vue stub** — words/backend orphan, delete.

---

## SECTION 2 — value.js→1.0.0 + kf RECONCILIATION

### 2.1 How value.js→1.0.0 lands

**value.js Tranche N already names the cut at N.W9′ — the placement is NOT missing, the user's 2026-06-16 decision RATIFIES it.** N.md §3 declares the version ladder: `0.12.0` (N.W7) → `0.13.0` (N.W11+N.W11.D+N.W11′) → **`v1.0.0` at the terminal N.W9′ close**.

The concrete facts the spec fleet must thread:
- **1.0.0 is a STABILIZATION cut, NOT new surface, NOT breaking.** N.W9-prime is explicit: it is a SemVer-major (`0.12.0`→`1.0.0`) declaring the surface **stable, not new** — the surface widening was 0.13.0; 1.0.0 stabilizes it. The locus is **MANIFEST + DOCS only** — no `src/` edit, no `test/` edit beyond the version bump + a major changeset + the π evidence lane + FINAL.md. There are **no API-breaking changes in the 1.0.0 cut itself.**
- **value.js OWNS the 1.0.0 cut (foreign tree).** BB does NOT author it. BB records it as a **by-name ask** and as the **dissolve trigger**, and pre-guards its own peer.
- **The ONE gate on the 1.0.0 tag is glass-ui's BA 4.0.0 cut** (the N.W18 registry-pin target). N is explicit this is BOOK-with-trigger: "if the cut lags, v1.0.0 holds — the pin is the gate, not the work." §3 confirms "No producer blocks value.js v1.0.0." Since BA 4.0.0 is ALREADY published (MEMORY: "glass-ui 4.0.0 published"), this gate is satisfied — value's `^4.0.0` pin admits the published 4.0.0, and the later BB 4.1.0 fold-all is a caret re-pin value adopts for free.

### 2.2 What the constellation does at 1.0.0

The entire family migrates its value.js range from the pre-1.0 lockstep-per-minor regime to **`^1` broad-caret floors**, and the lockstep-per-minor obligation dissolves (a value 1.x minor becomes non-breaking by semver). The `proof:constellation-spine` gate header carries the note that the regime is pre-1.0, NOT permanent, with the 1.0.0 promotion as the dissolve trigger. This is already recorded in constellation-modernize §1 — the only change the spec fleet makes is promoting the framing from "candidate, not assumed" to DECIDED (Section 3.2 below).

### 2.3 The kf ↔ value cross-asks — folded vs open

**FOLDED:**
- The value→kf 0.12.0 inbound (VALUEJS-N2-ASKS.md — 11 consume edges: MCI-5 identity pad, `parseLinearStops`/`parseSteps`, currentColor/light-dark sentinels, `toAnimationString`, output-space emit, egress gamut, LRU memoize, path sampler, diagnostics, buffer-reuse unflatten) — kf consumes these in Band II; all SHIPPED at 0.12.0.
- The value→kf 0.13.0 grammar edge (VJ.W1 scroll grammar + VJ.W2 `sampleColorRamp` — the two K.W9/K.W10 born-RED gates) — folded into **BB-AMENDMENT-coherence-harden §1** ("value.js 0.13.0 + `sampleColorRamp` are PUBLISHED; W-BORDER-PROGRESS consumes it").
- The kf→glass-ui asks (KF-TO-GLASSUI-BB-ASKS.md): `springTimingFunction` → ✅ SATISFIED (kf ships it as a light value.js-free leaf for W-DECK's `--spring-deck`); W-EASING-PRIMITIVE boundary law → ✅ AFFIRMED (mutual). These map directly onto BB-AMENDMENT-crossrepo §A3's by-name asks (W-CROSSREPO-ASKS).
- The W-DOCK-MORPH-FAMILY → 4.1.0 polish ask (compositor-transform morph, settled-geometry reveal, PRM synchronous seat) — already a NAMED BB wave (`waves/BB.W-DOCK-MORPH-FAMILY.md` exists, confirmed on disk).

**OPEN/BOOKED:**
- **KF-OSCILLATOR → 🟡 BOOKED** — kf adds a light `Oscillator` primitive WHEN speedtest/W-EASING-PRIMITIVE consumes it. Not yet a committed BB primitive; waits on the consume. The spec fleet records it as booked-with-trigger, not a Batch wave.
- **The peer-spine `^4.0.0`-floor confirmation** — kf's ask that the peer-spine keeps `^4.0.0` so the kf re-pin carries no peer warning is satisfied BY CONSTRUCTION by W-SPINE-LATEST's kf union collapse (`^2||^3||^4`→`^4` keeps the `^4` floor). No separate work.

### 2.4 The BB-owns vs sibling-owns split

**glass-ui BB OWNS (DIRECT — the hub is not a foreign tree):**
- The spine CONSUME on glass-ui's own `package.json` (vue/vueuse/reka/tailwind/vite/ts re-lock + @types/node `^24`).
- The **value `^0.13.0` IDENTITY peer** (W-SPINE-LATEST, BEAT 3 — the keystone broken-singleton fix), the **kf `^4.0.0` clean caret** (union collapse, no `||`), dev kf→`^4.3.0`, dev value→`^0.13.0`.
- The **value `^1.0.0` born-RED assert leg** in `proof:constellation-spine`/`proof:peer-conformance` (glass-ui's pre-emptive guard — when value cuts 1.0.0, glass-ui's peer must already admit `^1` or value's 1.0.0 publish re-strands glass-ui's own consumers the day it lands).
- The T1 gate-collapse (proof-peer-conformance intersection→identity), the T1.2 motion-suite re-enumerate, the CLAUDE.md deps/alias fold, the 4.1.0 cut + the publish prerequisites, and `proof:constellation-spine` (the born-RED cross-repo gate, incl. clause-6 registry-consumer probe + the pre-1.0-lockstep header note).

**value.js Tranche N OWNS (foreign tree — BB records by-name asks only):**
- **The 1.0.0 cut ITSELF** (N.W9′ — version bump, major changeset, FINAL.md).
- value.js intra-repo: orphan `@mkbabb/keyframes.js` file:link delete, api/ TS6 unify, vitest 3→4 lockstep, v-calendar dist-tag decision, zod-4 (vee-validate-gated), the design body N.W10–N.W17.
- The 0.13.0 surface (`sampleColorRamp`/scroll-timeline) — glass-ui's W-BORDER-PROGRESS is the consumer.

**keyframes.js Tranche K OWNS (foreign tree):**
- Its own deps: `.npmrc legacy-peer-deps` delete (sequenced AFTER glass-ui's peer widen — BEAT 3, sequence-critical), kf-vue peer `>=4.2.0`→`^4.0.0` clean caret, the serializer fold, the K.W1′ re-pin onto glass-ui `~4.0.0`→`4.1.0`.
- The `Oscillator` primitive (delivered when consumed), the easing-editor donor cession (on glass-ui's publish).

BB's foreign-tree fence (§A5) holds: glass-ui edits ZERO leaf/consumer tree; W-LEAF-MODERNIZE + W-CONSUMER-MODERNIZE are content-only by-name asks (inv-26); each leaf publish stays USER-DOMAIN. slides is the ONE driven exception (W-SLIDES-DRIVE).

### 2.5 Dissonance — all reconcilable, freshness-only

No load-bearing dissonance. Five items, all resolved in this brief or booked as freshness debt:
1. **Stale peer-range narration (cardinal-lesson recurrence).** coherence-harden §1 self-flags it: the cadence docs narrate "the interim spectrum until 0.13.0 ships" but 0.13.0 + `sampleColorRamp` ARE PUBLISHED; kf's value dep cited `^0.11.2`/`^0.12.0` but is live `^0.13.0`. The TARGET is correct (constellation-modernize §1 already targets value `^0.13.0`); only the prose lags. **Freshness debt BB books — re-ground against `npm view` (the spec fleet does NOT freeze literals).**
2. **The `^1.0.0` leg split across two amendments.** RESOLVED in Section 3.2 below — promote to DECIDED, ONE reconciled statement.
3. **value N.W9′ pin (4.0.0) vs BB cut cadence (4.1.0).** ALIGNED — value adopts the published 4.0.0; the 4.1.0 BB fold-all is a later caret re-pin value's `^4.0.0` admits for free. Confirm in the spec.
4. **The kf `.npmrc legacy-peer-deps` delete is SEQUENCE-CRITICAL.** Both trees agree: BB §A4 BEAT 2 sequences the delete AFTER BEAT 3 (the hub peer widen) else kf's own install re-fails (kf 4.3.0 deps value `^0.13.0`; glass-ui's un-widened `^0.10.0||^0.11.0` → ELSPROBLEMS). **Flag the ordering as binding.**
5. **The @vueuse-10-via-vaul-vue dual — DECISION DELTA.** RESOLVED in Section 3.3 below (the dual is KILLED, not booked).

---

## SECTION 3 — THE THREE DECISIONS MADE CONCRETE

### 3.1 @mkbabb/colors — RETIRE

Zero consumers, superseded by value.js's color engine (the survey confirms no constellation web-tree deps it; the existing ledger already flags it as the RETIRE candidate at `colors/package.json`). **Amendment update:** constellation-modernize §2 + the EXECUTION-DAG promote colors from "RETIRE candidate" to **DECIDED RETIRE** — deprecate on the registry (user-domain publish), remove from the `@mkbabb/*` family caret ledger, and record the supersession line (value.js owns the color engine) so no future census re-adds it. No glass-ui source edit (glass-ui never deps colors). This is a by-name disposition, not a wave.

### 3.2 value.js → 1.0.0 — DECIDED (was "candidate")

**Amendment reconciliation (the spec fleet authors ONE statement across both amendments):**
- constellation-modernize §1's "**the cleanest architectural move — flagged as a candidate headline, NOT assumed … recorded for the user's call**" is **SUPERSEDED**. The new single statement: **value.js → 1.0.0 is DECIDED** (lands in value.js Tranche N at N.W9′, a stabilization semver-major, manifest+docs only, no breaking API). The constellation move is the **`^1` broad-caret migration**; the **lockstep-per-minor regime dissolves at the cut**; glass-ui's pre-guard is the **born-RED `^1.0.0` peer leg** in `proof:constellation-spine`/`proof:peer-conformance`.
- coherence-harden §1's "**add the `^1.0.0` leg as a born-RED assert**" is RETAINED and now reconciled WITH §1 as the same single statement (no longer two framings — the born-RED leg IS glass-ui's mechanization of the DECIDED migration).

The spec fleet edits constellation-modernize §1 to the DECIDED framing and confirms coherence-harden §1's born-RED leg points at it. **BB still does not author value's 1.0.0 cut** — it records the DECISION + the dissolve trigger + the pre-guard.

### 3.3 vaul-vue ABROGATION — the @vueuse-10 dual is now KILLED, not booked

**The decision SUPERSEDES the "irreducible/booked-successor" framing** at constellation-modernize §2 (lines 24, 78, 289 — confirmed on disk: "ONE irreducible dual", "the LONE dual-install the BB bump CANNOT clear … booked to a successor", "the IRREDUCIBLE non-cascade … persists through every beat"). Confirmed live: `vaul-vue` at `^0.4` (package.json:830 deps, :875 optionalPeer); vaul-vue@0.4.1 HARD runtime-deps `@vueuse/core ^10.8.0` (a real `dependencies` entry, not a peer) — the LONE holdout against the constellation's `@vueuse/core 14.3.0` spine. All Drawer consumers are demo-only (`drawer-live-behind.vue`, `containers/drawer.vue`, `data/search.vue`) — zero external binary consumers at HEAD, so the re-build risk is contained.

**The RECOMMENDED replacement — Option B: reka-ui `DialogRoot` + a thin house snap layer.** Compose reka-ui's `DialogRoot`/`DialogPortal`/`DialogContent`/`FocusScope` (the house headless substrate every other compound wrapper already uses — vueuse-free, already a glass-ui dep at reka `^2.9.10`) for the structural/focus/portal/scrim machinery, and add ONLY a thin glass-ui snap-translate layer driven by `SpringProgress` (the dock-morph `linear()` clock — ONE motion vocabulary, the §6 doctrine) + a pointer-drag gesture reusing the `useTouchGate`/`useDockState`-style velocity tracking the dock already has. This kills the `@vueuse/core 10.8` dual cleanly, keeps the drawer's LOOK (re-point drawer.css's `[data-vaul-*]` keys to `[data-glass-drawer-*]` emitted by the new SFCs — a clean rename, no alias), makes BB-2's direction-aware default ladder native, and reuses reka's proven open/focus/portal machinery. **Option A** (full hand-roll on `useSpring`/`SpringProgress`) is the documented FALLBACK if reka's `Dialog :modal="false"` cannot cleanly deliver the live-behind page-interactive contract. **Option C** (pin/patch vaul-vue's @vueuse to ^14) is REJECTED — it does not satisfy the abrogation decision and is the exact "legacy shim" the no-backwards-compat fence forbids.

**This is a NEW WAVE: `W-DRAWER-ABROGATE` (glass-ui DIRECT, Batch 4 ARCHITECTURE TRANSPOSITIONS — beside W-CANVAS-UNIFY as a substrate de-fork).** It coordinates with W-SPINE-LATEST/W-SPINE-CONSTELLATION (Batch C — the @vueuse `^14` spine the abrogation unblocks) and removes `vaul-vue` from package.json (deps + peerDeps + optionalPeer). **BB-2 (the direction-ladder) FOLDS INTO it as a clause** (the new engine resolves its default ladder from direction natively). Spec seed: re-build `Drawer`/`DrawerContent`/`DrawerOverlay`/`DrawerPortal`/`DrawerTrigger`/`DrawerClose`/`DrawerTitle`/`DrawerDescription` on reka `DialogRoot` + a `SpringProgress` snap layer; preserve the `mode`/`surface`/`showOverlay` props + the `[data-surface]` axis; re-point drawer.css; the direction-aware ladder (BB-2); gate `proof:drawer-abrogate` (no vaul-vue import anywhere, the snap settle on `SpringProgress`, the live-behind page-interactive, the direction ladder, the demo consumers green) + `proof:constellation-spine` confirms the @vueuse 10.8 dual is GONE.

**Amendment update:** constellation-modernize §2 CLASS-2 + §A4 line 289 ("the IRREDUCIBLE non-cascade") are SUPERSEDED — the dual is KILLED at W-DRAWER-ABROGATE, not a booked successor. The §2 ledger row for @vueuse/core moves from "ONE irreducible dual" to "**dual KILLED at W-DRAWER-ABROGATE — full @vueuse ^14 convergence.**"

---

## SECTION 4 — THE SEVEN-NEEDS PLACEMENT MAP (NO FORKS)

Re-grounded at HEAD `13abb3e2` (all Task-C HEAD cites re-confirmed this session: 12 `:not(.vertical)` gates in morph.css; `--glass-accent` net-new; no bronze; `--duration-seal` already-retired; vaul-vue `^0.4`; Drawer snap hardcoded with no direction-awareness).

| Need | HEAD state | Verdict | Wave / band | Composes with |
|---|---|---|---|---|
| **BB-1** dock-vertical-morph | box-size height morph WIRED (orchestrator + layers.css + GlassDock.vue); root-chrome interp GATED OUT (12 `:not(.vertical)` gates, morph.css:37-44 + :66-143); stale "vertical=always-expanded" comments at shell.css:276-290 | **FOLD** | sub-ask **f** of **W-DOCK-MORPH-FAMILY** (Batch P) | the existing W-DOCK-MORPH-FAMILY (owns morph.css/layers.css/dockMorphContext.ts/useLayerTransition.ts) |
| **BB-4** deck-morph | summary↔full slot transition ALREADY on `--dock-morph-t` (layers.css:143-194) | **FOLD → BB-1** | acceptance clause under BB-1 sub-ask f | — |
| **BB-3** glass-accent-seam | `--glass-accent` net-new (confirmed empty); the `--glass-tint-source` oklab seam (ladder.css:38-109) is the compose surface | **NEW** | **W-GLASS-ACCENT** (Batch L) | coordinates with W-LENSING + W-LIQUIDHOVER (shared `::before` specular) |
| **BB-5** metallic-shimmer-family | gold+silver quads LIVE (scale-paper.css:86-131); no bronze; `gold-shimmer-slide` is the keyframe; `--duration-seal` gone; disco recipes deleted (BA.W-GLASS-CAL) | **NEW** | **W-METAL-SHIMMER** (Batch L) | coordinates with W-GLASS-ACCENT (rim) + the calm-CTA doctrine (PRM=static) |
| **BB-2** drawer-direction-ladder | `snapPoints` hardcoded bottom-sheet (Drawer.vue:82), no direction-awareness | **FOLD** | clause of **W-DRAWER-ABROGATE** (Batch 4) | the new snap engine resolves the ladder from direction natively |
| **MARKS/BA cut** | HandMark + silver quad landed @4.0.0 | **Already covered** | named-consumer fold only | — |
| **Fold contract** (Atlas) | Atlas named in BB Batch 5/W-LINEAGE-PROBE | **EXTEND in place** | W-CONSUMER-MODERNIZE + W-LINEAGE-PROBE + W-REFLECT3/W-CLOSE | — |

### 4.1 BB-1 dock-vertical-morph — FOLD into W-DOCK-MORPH-FAMILY sub-ask f

The CLAUDE.md "vertical dock collapses its height" claim is HALF-TRUE — a seam split, not a contradiction. **WIRED:** the orchestrator is axis-aware (`dockMorphContext.ts:155-160` maps vertical→`block-size`; `GlassDock.vue:197-205` toggles `outerActiveLayer` full↔summary for ANY orientation; `layers.css:70-73` lands the scalar on `block-size`); `alwaysExpanded` defaults `false`. **GATED OUT (the real defect):** the `--dock-expand-t` chrome-interpolation block (the root bg/border/padding/radius interp + the child-stagger derivation) is scoped `:not(.vertical)` across 12 gates (morph.css:37-44 + :66-143), and the vertical root `transition` chrome-arms were deleted at shell.css:286-290 — so a collapsing vertical dock morphs its `block-size` but its plate bg/border/padding/radius SNAP discretely instead of interpolating on `--dock-morph-t`.

**The work is NOT "wire from scratch"** (the box-size morph + spring + PRM `pin()` precedent exist) — it is **extend the `--dock-expand-t` chrome-interpolation to the vertical axis** (un-gate the 12 `:not(.vertical)` scopes onto an orientation-aware form, OR mint a parallel `.vertical` chrome-interp block driving padding/radius/bg/border off the same scalar) so block-size/padding/radius/bg/border/child-stagger all move on ONE `DOCK_SPRING` clock (ζ≈0.86), with padding-INLINE pinned + padding-BLOCK morphing (the inverse of the horizontal pin). This is the SAME files W-DOCK-MORPH-FAMILY already owns and is re-expressing as a compositor transform + adding the synchronous PRM seat — a NEW wave would contest the registry single-owner on those files. **Spec seed (sub-ask f, DOCKMORPH-VERTICAL-CHROME):** orientation-aware the `--dock-expand-t` derivation + the chrome-interp block; delete the stale shell.css "ALWAYS-EXPANDED" comments; the §0 RE-GROUND adds the cite-drift correction (shell.css:230 → now `::after` paper-grain; the chrome-arm delete is at :286-290; morph.css:37 gate confirmed); the π adds a vertical collapse→expand frame-series + the PRM synchronous seat on the block axis.

### 4.2 BB-4 deck-morph — FOLD into BB-1 (acceptance clause)

The summary↔full slot transition is ALREADY on `--dock-morph-t` (layers.css:143-194; AX.W45 DK7 killed the second-clock CSS transition — the leaving pane fades on `calc(1-t)`, the entering pane is revealed by the clip aperture + child-stagger off the same scalar). On the vertical axis it rides BB-1's block-size spring by construction (it IS the `outerActiveLayer` full↔summary swap). **No standalone seed** — assert as an acceptance clause under BB-1 sub-ask f: "the vertical `#collapsed`↔`#default` slot transition rides the block-size spring (continuous, leaving pane on `calc(1-t)`), not a crossfade with its own clock."

### 4.3 BB-3 glass-accent-seam — NEW W-GLASS-ACCENT (Batch L)

`--glass-accent` does not exist (net-new, confirmed). NOT a fold: `--glass-tint-source` is the LEGIBILITY/darken axis (W55, points at `--glass-tint-ink`); BB-3's `--glass-accent` is a DISTINCT CHROMATIC-rim axis (a consumer hue tinting the silhouette + catch-light) — the same "distinct register, not a fork" relationship W-ON-GLASS-FG has to the adaptive-glass seam. It COORDINATES with W-LENSING (which mints `useSpecularPointer`/`--glass-specular`/`.glass-lens`) + W-LIQUIDHOVER (auto-arms the specular) because it tints the SAME `::before` catch-light those drive — folding it INTO either would overload them (it is a third disjoint axis: chromatic rim tint on the shared specular surface). **Spec seed:** mint `--glass-accent` (a complete color, default the neutral identity so a no-accent surface is byte-identical) + `--glass-accent-strength` (bounded knob, default 0%); rim composes `color-mix(in oklab, <current rim>, var(--glass-accent) var(--glass-accent-strength))`; the `::before` catch-light gains an accent-tinted variant on the same OKLab mix; per-INSTANCE. Gate `proof:glass-accent` (W1 OKLab mix on rim + `::before`, W2 neutral-fallback byte-identical at 0%, W3 ≥2 consumers — the Atlas data-hue surface + a demo specimen). **Coordinate the `::before` ownership with W-LENSING's specular mint** (read its `::before` assert; do not double-author the catch-light).

### 4.4 BB-5 metallic-shimmer-family — NEW W-METAL-SHIMMER (Batch L)

Too much net-new surface for a tokens fold: a bronze quad (net-new), a metal-PARAMETERIZED shimmer keyframe replacing the gold-only `gold-shimmer-slide`, a slow `--duration-metal`, `.metal-{gold,silver,bronze}` + border-variant + rainbow-rim utilities, PRM=static. It coordinates with W-GLASS-ACCENT (the rainbow-rim variant sits on the SAME rim surface `--glass-accent` touches — **sequence the rim ownership: W-GLASS-ACCENT mints the rim seam first, W-METAL-SHIMMER's rim variant composes it**) and the calm-CTA doctrine (BA.W-GLASS-CAL — the shimmer stays CALM, PRM=static is the §6 register). **Spec seed:** (1) bronze quad `--bronze`/`-light`/`-dark`/`-deep` + `--color-bronze*` (the EXACT cascade gold/silver speak — scale-paper raw → bridge alias → light-dark arm → dark-arm fallback; a warm-brown OKLch hue ~50-60°, chroma above the W-NO-GRAY floor as a brand METAL); (2) mint `--duration-metal: 6s` (record `--duration-seal` as already-retired, no edit); (3) mint `metal-shimmer-sweep` — a metal-PARAMETERIZED keyframe (a `--metal-shimmer-color` var the recipe binds per-metal) usable for text-clip AND border/mask; (4) `.metal-{gold,silver,bronze}` + `.metal-*-border` + `.metal-rainbow-rim`; (5) PRM = static gradient (the `.gold-shimmer` PRM-bracket model). RETIRE `gold-shimmer-slide` → re-point `.gold-shimmer` onto `metal-shimmer-sweep` with `--metal-shimmer-color: gold` (clean break, no alias). Gate `proof:metal-shimmer` (the three quads parallel, the parameterized keyframe, the PRM-static bracket, ≥2 consumers per utility).

### 4.5 BB-2 drawer-direction-ladder — FOLD into W-DRAWER-ABROGATE

`snapPoints` resolves UNCONDITIONALLY to the bottom-sheet `[0.12,0.5,1]` ladder (Drawer.vue:82), no `direction`-awareness — a left/right side-lens live-behind drawer gets the wrong ladder (the Atlas's `:snap-points="[]"` workaround). drawer.css HAS direction variants but the snap LADDER is hardcoded. The vaul abrogation RE-BUILDS the snap engine entirely, so the direction-aware default ladder is best authored AS PART OF the re-built engine (it resolves its default ladder from direction natively). **Spec seed (clause of W-DRAWER-ABROGATE):** the snap engine resolves `snapPoints` from `direction` — bottom/top → the `[0.12,0.5,1]` peek/half/full ladder; left/right (side-lens) → a full-slide (no detents) OR a side-appropriate ladder. Removes the Atlas's `:snap-points="[]"` workaround. Gate clause: "live-behind side-direction default ladder is a full-slide, not the bottom-sheet ladder." (If the abrogation defers, BB-2 becomes a standalone 1-clause wave on Drawer.vue:72-88 — but the abrogation is DECIDED, so it folds.)

### 4.6 The MARKS/BA carry — already covered, named-consumer fold only

The HandMark/underline/highlighter family is the landed BA.W-HANDMARK (4.0.0); the silver structure quad ships. The "3.14 BA reconcile" is the constellation publish cadence (BB ships at 4.1.0). The Atlas consumes the published 4.0.0 HandMark/silver surface; the only BB action is the named-consumer fold. **Spec seed:** record in the Atlas's named-consumer roadmap that it consumes the 4.0.0 HandMark + silver quad; any further morphology refinement is a by-name ask (routed through W-CROSSREPO-ASKS / the gestalt reflect), not a BB wave.

### 4.7 The always-expanded reconciliation + the Atlas-as-named-consumer roster addition

**The always-expanded reconciliation is a recorded BB-root FACT, not a library reconciliation:** `alwaysExpanded:false` is ALREADY the default. always-expanded consumers (speedtest, by contract) pass `:always-expanded="true"` explicitly and short-circuit the state machine (UNAFFECTED by BB-1). The Atlas opt-in is simply `:always-expanded="false"` on its vertical rail — no library reconciliation needed, just the BB-1 vertical-chrome wire. **The Atlas-as-named-consumer roster addition:** the Atlas (`sci-report/usf/web`) is already named in BB (W-LINEAGE-PROBE + EXECUTION-DAG Batch 5). **EXTEND in place:** W-CONSUMER-MODERNIZE adds the Atlas's `^4.1.0` bump + the fallback-branch deletes (consume-and-delete: the `:snap-points="[]"`, any dock-vertical-morph CSS shim — once consumed); W-REFLECT3's gestalt roster names the Atlas surface; W-LINEAGE-PROBE covers the lineage. No new wave.

---

## SECTION 5 — THE SPEC-FLEET WORK PLAN (batched in 3s, dependency order)

The next fleet writes these specs + amendment updates. Batched in 3s, dependency-ordered (a later batch's specs assume an earlier batch's amendment reconciliations are landed).

### BATCH 1 — the amendment reconciliations (the foundation; everything downstream cites these)

1. **constellation-modernize §1 + §2 + §A4 — the three-decisions + new-members fold.** Promote value→1.0 from "candidate" to DECIDED (§3.2) reconciled with coherence-harden §1's born-RED `^1.0.0` leg into ONE statement; promote colors to DECIDED RETIRE (§3.1); supersede the vaul "irreducible/booked-successor" framing → KILLED at W-DRAWER-ABROGATE (§3.3, the @vueuse row moves to full `^14` convergence); APPEND the three new consumers (words/frontend, bbnf-lang/playground, bbnf-buddy) + the two WASM leaves (morph, csp-solver-wasm) with the per-member verdicts (§1.2-1.4); record the seven NEW classes (§1.5); re-ground the stale 0.12.0/spectrum prose against `npm view` (do NOT freeze literals).
2. **`proof:constellation-spine` spec extension.** Grow the enrolled-member list by three consumers (§1.4); add the WASM-LEAF caret arm (family-caret-only, validated through bbnf-buddy, never a build-tool singleton check); add the born-RED value `^1.0.0` peer leg (the pre-guard); add the csp DIVERGENT-PUBLISHER provenance fence + the pre-1.0-lockstep header note pointing at the dissolve trigger; record the independent-node-services as explicitly NOT enrolled.
3. **`W-DRAWER-ABROGATE` spec (Batch 4, glass-ui DIRECT).** The full vaul de-fork (Option B: reka `DialogRoot` + a `SpringProgress` snap layer; Option A documented as fallback; Option C rejected); preserve `mode`/`surface`/`showOverlay` + the `[data-surface]` axis; re-point drawer.css `[data-vaul-*]`→`[data-glass-drawer-*]` (clean rename); **fold BB-2's direction-aware ladder as a clause**; remove `vaul-vue` from package.json (deps + peerDeps + optionalPeer); gate `proof:drawer-abrogate` + `proof:constellation-spine` dual-gone confirmation.

### BATCH 2 — the new design waves (depend on the rim-seam sequencing from Batch 1's amendments + the W-DOCK-MORPH-FAMILY owner)

4. **W-DOCK-MORPH-FAMILY sub-ask f addendum (BB-1 + BB-4).** Extend the existing wave's spec with the DOCKMORPH-VERTICAL-CHROME sub-ask (§4.1) + the BB-4 acceptance clause (§4.2); the §0 RE-GROUND cite-drift correction; the vertical-axis π. This is an EXTEND of an existing wave file, not a new wave.
5. **W-GLASS-ACCENT spec (Batch L).** Mint `--glass-accent`/`--glass-accent-strength`; the OKLab rim + `::before` accent-tint; per-instance; gate `proof:glass-accent`; **coordinate the `::before` ownership with W-LENSING** (read its specular `::before` assert first — sequence W-LENSING's mint before this composes it).
6. **W-METAL-SHIMMER spec (Batch L).** The bronze quad + `--duration-metal` + the parameterized `metal-shimmer-sweep` + the `.metal-*` utilities + the PRM-static bracket + the `gold-shimmer-slide` retirement; gate `proof:metal-shimmer`; **sequence after W-GLASS-ACCENT's rim seam** (the rainbow-rim variant composes the accent rim).

### BATCH 3 — the consumer-fold + close extensions (depend on the hub cut + the new waves being specced)

7. **W-CONSUMER-MODERNIZE spec extension.** Append the three new consumers' modernize scopes (§1.2): words/frontend (`^3→^4`, kf, latex-paper re-lock post-BEAT-4, lucide minor, vue-router 4→5, retire tailwind-merge), bbnf-lang/playground (the deepest lift — vite 6→8, TS 5→6, plugin-vue 5→6, lucide rename, vue-router 4→5, value/kf/glass-ui caps, floor-tightens), bbnf-buddy (the lightest — family caps + pencil-boil + retire tailwind-merge); the Atlas `^4.1.0` bump + fallback-branch deletes (§4.7); record the independent-node tracks (words/backend dead-radix-vue delete, words/notification-server, bbnf-lang/extension) as by-name asks, NOT spine-locked.
8. **W-LEAF-MODERNIZE / publish-beat spec extension.** Widen BEAT 4 (latex-paper republish-gate) to TWO dependents (fourier + words/frontend); record morph/csp as at-latest WASM leaves on the family-caret arm (no leaf edit, the bbnf-buddy at-latest pins validate them); confirm BEAT 2 (kf `.npmrc` delete) sequenced AFTER BEAT 3 as BINDING; record value's N.W9′ 4.0.0 pin + the 4.1.0 caret re-pin alignment.
9. **W-REFLECT3 / W-CLOSE roster + the carried-MARKS fold.** Add the Atlas + the three new consumers to the gestalt roster + the close-battery named-consumer list; record the MARKS/BA carry as a named-consumer fold (§4.6 — the Atlas consumes 4.0.0 HandMark + silver quad; further morphology is a by-name ask); confirm the value→1.0 dissolve trigger + the vaul-dual-gone are in the close-battery acceptance.

**Dependency order rationale:** Batch 1 lands the amendment reconciliations + the abrogation spec that Batch 2's BB-2 fold and Batch 3's @vueuse-convergence cite. Batch 2's W-GLASS-ACCENT must spec before W-METAL-SHIMMER (rim-seam sequencing) and both reference W-LENSING's `::before` mint. Batch 3 folds consumers + closes, depending on the hub cut cadence + the new waves existing as specs.

---

**Relevant absolute paths:** the existing BB amendments to update — `/Users/mkbabb/Programming/glass-ui/docs/tranches/BB/BB-AMENDMENT-constellation-modernize.md` (§1 value-1.0 framing line 65; §2 vaul lines 24/78/289; §2 ledger; §A4 beats), `/Users/mkbabb/Programming/glass-ui/docs/tranches/BB/BB-AMENDMENT-coherence-harden.md` (§1 born-RED `^1.0.0` leg). New-wave spec homes — `/Users/mkbabb/Programming/glass-ui/docs/tranches/BB/waves/` (W-DRAWER-ABROGATE.md NEW, W-GLASS-ACCENT.md NEW, W-METAL-SHIMMER.md NEW; W-DOCK-MORPH-FAMILY.md EXTEND, W-CONSUMER-MODERNIZE/W-LINEAGE-PROBE/W-REFLECT3 EXTEND). The EXECUTION-DAG — `/Users/mkbabb/Programming/glass-ui/docs/tranches/BB/EXECUTION-DAG.md`. New members surveyed — `/Users/mkbabb/Programming/words/frontend/package.json`, `/Users/mkbabb/Programming/bbnf-lang/playground/package.json`, `/Users/mkbabb/Programming/bbnf-buddy/package.json`; independent nodes — `/Users/mkbabb/Programming/words/backend/package.json`, `/Users/mkbabb/Programming/words/notification-server/package.json`, `/Users/mkbabb/Programming/bbnf-lang/extension/package.json`; WASM leaf source crates — `/Users/mkbabb/Programming/csc411/CSC411_HW2_ProgrammingQuestion/csp-solver/{wasm-morph,wasm}/`; divergent publisher — `/Users/mkbabb/Programming/muster/csp-wasm/`. HEAD anchors re-confirmed — morph.css (12 `:not(.vertical)` gates), `--glass-accent`/`--bronze`/`--duration-seal` all empty/net-new, `vaul-vue ^0.4` (package.json:830/:875), Drawer.vue:82 hardcoded snap, hub caps package.json:819 (kf union) / :821 (value peer).