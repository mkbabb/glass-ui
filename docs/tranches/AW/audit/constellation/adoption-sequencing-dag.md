# adoption-sequencing-dag — the whole constellation funnels through ONE publish hinge (glass-ui 3.4.0/AW.W1); 4 of 6 consumers are HARD-BLOCKED on it, the aurora band gates on TWO supplier pin-bumps, and most adoption is a single coordinated bump-event, not a per-wave drip

This lane builds the cross-repo sequencing DAG: publish events → per-repo wave windows, every edge justified by a fact read at HEAD today. The verdict is that the program has ONE dominant node — the **3.4.0 publish (AW.W1 dock-collapse fix)** — that gates every dock-mounting consumer, and the only OTHER hard prerequisites are two glass-ui peer-pin bumps that must clear before the aurora band's CI can go green against the registry.

## Findings

### 1. Verified pins + HEAD + dirty-tree state for all 6 in-scope repos (read TODAY)

| Repo | glass-ui pin (file:line) | branch · HEAD | dirty | mounts GlassDock? | mounts Aurora? |
|---|---|---|---|---|---|
| fourier-analysis | `^3.1.0` (`web/package.json:14`) | master · `0167268` | 1 file | **YES** ×3, simple-collapse | no |
| speedtest | `^3.1.0` (`package.json:88`) | master · `bdeefcc7` | **0 (CLEAN)** | **YES** ×3, simple-collapse | **YES** |
| muster | `^3.1.0` (`frontend/package.json:19`) | master · `6be5082` | 89 files | **YES** ×1, simple-collapse | **YES** |
| words | `^3.0.0` (`frontend/package.json:19`) | master · `d11640d` | 23 files (backend/docs only) | YES ×2 but **`always-expanded`** | no |
| value.js | `file:../glass-ui` (`package.json:69`) | tranche-f-handoff · `e8cc1fb` | 6 files | **YES** (demo), simple-collapse | **YES** (demo) |
| keyframes.js | `^3.3.0` optionalDep (`package.json:89`) | tranche-g-impl · `a8b618b` | 8 files | **YES** (demo), simple-collapse | no |

CTX corrections verified at HEAD: keyframes pins **`^3.3.0`** (not `file:` as the lane brief stated — `package.json:89`, under `optionalDependencies`); speedtest is **CLEAN** (the "~157-dirty" is stale — `git status --porcelain` = 0); words pins **`^3.0.0`** as stated.

### 2. THE DOMINANT NODE — 4 of 6 consumers are HARD-BLOCKED on the 3.4.0/AW.W1 publish

Every consumer that mounts the simple two-layer collapse (default + `#collapsed` slot, `:start-collapsed`/`:collapse-delay`) eats the 3.3.0 width-morph-freeze regression and MUST land its next bump on **3.4.0**, never 3.3.0. Verified mount sites:

- **fourier** — 3 docks: `web/src/components/visualization/EditorControlsDock.vue:56` (`:start-collapsed="true"` + `#collapsed` at `:58`), `CanvasControlsDock.vue:41` (`:98`), `AnimationControls.vue:58` (`:65`). All from `@mkbabb/glass-ui/dock` (imports at `EditorControlsDock.vue:6`, `CanvasControlsDock.vue:7`, `AnimationControls.vue:8`). [from `fourier-adoption-gap.md` Finding 1; mount imports re-verified by rg today]
- **speedtest** — `src/components/Dock.vue` (`#collapsed` at `:322`, `:start-collapsed="false"`), `survey/SurveyResultDock.vue:153` (`import { GlassDock }`), `survey/SurveyWizard.vue`. [from `speedtest-adoption-gap.md` Finding 1]
- **muster** — `frontend/src/components/dock/CommandDock.vue:118-237` (`<GlassDock :start-collapsed :collapse-delay="2500">` + `#collapsed` slot at `:129-195`). [from `muster-adoption-gap.md` Finding 1]
- **value.js demo** — `demo/@/components/custom/dock/Dock.vue:93` (`:start-collapsed="isDesktop"` + `#collapsed` at `:197-203`), import at `dock/index.ts:2`. [from `valuejs-adoption-gap.md` Finding 3]
- **keyframes demo** — `demo/@/components/custom/dock/TopDock.vue:118` (`<GlassDock :collapse-delay="2500" :start-collapsed="true">`), import at `dock/index.ts:1`. [from `keyframes-motion-seam.md` Finding 12]

Edge justification: AW.md §0 D-1 (`AW.md:36`) + §1 (`AW.md:72`) name this exact path as broken in 3.3.0; the fix is AW.W1 → 3.4.0 (`AW.md:142`, §4 E1 `AW.md:214-218`).

### 3. words is NOT W1-gated — its two GlassDock mounts are `always-expanded` (no collapse path)

`words/frontend/src/components/custom/wordlist/views/WordListView.vue:22` and `:109` both mount `<GlassDock always-expanded>` (import at `:235` from `@mkbabb/glass-ui/dock`). `always-expanded` means the dock never collapses, so the simple-collapse width-morph regression has no surface to break. words can bump to 3.3.0 OR 3.4.0 safely; its 23 dirty files are all `backend/` + `docs/` (verified `git status --porcelain` — zero frontend-dock files). words is the ONE dock-mounting consumer NOT in the W1 hard-block set. (Honest negative: words has no Aurora/blob/Configurator/Constellation surface either — `words-tranche-idiom` confirms its AW value is the glass-atoms passive lift only.)

### 4. THE TWO SUPPLIER-EDGE PIN BUMPS — both gate the aurora band's registry-green, both verified at HEAD

glass-ui's peer pins are STALE against both upstreams' npm-latest:

- **value.js edge (gates AW.W5):** glass-ui pins `@mkbabb/value.js: "^0.10.0"` (`package.json:616` peer, `:647` dev). npm latest = **0.11.0** (verified `npm view`). `^0.10.0` does NOT admit 0.11.0. AW.W5's GLSL OKLCh hue-arc gate (`proof:aurora-oklch-interp`) must reference value.js's `interpolateHue`/`HueInterpolationMethod`/`mixColorsN` (`value.js/src/units/color/dispatch.ts:219,234,277`) — these ship only in the 0.11.0 line per `valuejs-aurora-color-seam.md` Finding 6. EDGE: glass-ui must bump the value.js peer to admit the `interpolateHue`-carrying version BEFORE AW.W5's gate can be CI-green against the registry (locally green via the `file:` symlink masks this). [from `valuejs-aurora-color-seam.md` Findings 3,6 + Wave-forming "Peer-pin fix"]
- **keyframes edge (ship-safe, independent):** glass-ui pins `@mkbabb/keyframes.js: "^2.2.0 || ^3.0.0"` (`package.json:615` peer, `:646` dev). npm latest = **4.0.0** (verified). The pin EXCLUDES 4.0.0. BUT glass-ui's consumed SpringProgress surface is untouched by the 4.0.0 `tick→tickDt` break, so this is a pure pin-widen (`^…|| ^4.0.0`) with zero source change — independent of every dock wave, landable any time. NOT a keyframes-side wave (keyframes 4.0.0 already ships the stable surface; AW needs nothing FROM keyframes). [from `keyframes-motion-seam.md` Findings 6,7,9 + Wave-forming "widen the keyframes peer pin"]

### 5. The aurora band (W4-8) is the SECOND consume window — only 3 consumers, opens on a LATER cut than 3.4.0

Aurora-mounting consumers (verified by rg today): **speedtest** (`src/App.vue`, `src/config/auroraConfig.ts`), **muster** (`frontend/src/App.vue`, `composables/useVerdictMoment.ts`, `useAuroraConfig.ts`), **value.js demo** (`demo/color-picker/App.vue:209-214`, `panes/AuroraPane.vue`). NOT fourier (paper substrate — would fight content, `fourier-adoption-gap.md` Anti-finding 3), NOT words, NOT keyframes demo. The painterly arc is shader-internal behind the same `<Aurora :config>` surface, so it re-paints existing fields with no consumer edit — but the W5 derive-color FRONT DOOR (`deriveScene`/`deriveAuroraConfig`) is a NEW API a consumer must call, and it lands on whatever cut ships W5/W6 (AW band B), strictly AFTER 3.4.0. [from speedtest/muster/valuejs adoption-gaps + `AW.md:146-147`]

### 6. AW's OWN publish bands — the DAG's publish-event sequence

AW.md does not name per-band version cuts beyond E1=3.4.0 (`AW.md:214`). The charter sequences W1 (dock, opens FIRST, AT-disjoint) → W2-W3 (dock motion) as band A; band B aurora (W5 BEFORE W4); band C blob; bands D-G; W33 close (LAST). The ONE confirmed publish hinge is **3.4.0 = AW.W1 + the convergence primitives** (`AW.md:214-218`: "AW lands the dock-collapse regression fix + the convergence primitives, then cuts 3.4.0"). The aurora/blob/glass-atoms/band-G waves ship on later cuts (3.4.x/3.5.0 — version numbers are USER-DOMAIN, not fixed in AW.md). The publish leg is confirm-first; agents never run the irreversible release step (`AW.md:218,342`).

### 7. The convergence primitives (W16 DeckProgress, W17 Constellation) ride the 3.4.0 cut — their 2nd consumer is slides H (out of scope here), NOT any in-scope repo

Verified honest negatives across the in-scope constellation: NO in-scope consumer mounts DeckProgress/Constellation/useCanvas2D today (speedtest grep ZERO — `speedtest-adoption-gap.md` Finding 7; muster Progress is inline gauges — `muster-adoption-gap.md` Anti-finding "W16/W17 not muster fits"; words/value.js/keyframes none). fourier hand-rolls the `useCanvas2D` SUBSTRATE twice (`useCanvasSetup.ts:16-46` + `ConvergencePlot.vue:80-95`) — a real ≥2-consumer substrate fit, but for the SUBSTRATE not the Constellation component (`fourier-adoption-gap.md` Finding 2). So W16/W17 ship in 3.4.0 but their in-scope adoption is fourier's optional `useCanvas2D` migration (no hard edge) — the binding 2nd-consumer is slides H, handled in tranche H.

## Wave-forming input

### The master sequencing DAG — publish events → per-repo wave windows

```
                                 ┌─────────────────────────────────────────────┐
  SUPPLIER PINS (glass-ui side)  │  E0a: glass-ui bump value.js peer ^0.10→     │
  ── landable NOW, pre-publish ──│        admit 0.11.0  (gates AW.W5 CI-green)  │──┐
                                 │  E0b: glass-ui widen keyframes peer admit    │  │ (E0a hard-precedes W5)
                                 │        4.0.0 (ship-safe, independent)        │  │ (E0b independent)
                                 └─────────────────────────────────────────────┘  │
                                                                                   ▼
   ┌──────────────────────── E1: glass-ui 3.4.0 PUBLISH (AW.W1 dock fix + W16/W17 convergence) ────────────────────────┐
   │   UNBLOCKS the 5 hard-blocked dock consumers' bump — ONE coordinated bump-event each, NOT a per-wave drip          │
   │   ┌── fourier: ^3.1→^3.4 ; un-fixme 2 a11y e2e ; align lucide peer (independent)                                   │
   │   ┌── speedtest: ^3.1→^3.4 ; + DockBackgroundToggle wiring + delete useAuroraPolicy.ts (substrate shipped 3.3.0)   │
   │   ┌── muster: ^3.1→^3.4 (picks up W1+W2+W3 in one hop, zero code change — props/tokens unchanged)                  │
   │   ┌── value.js demo: file: tracks HEAD (no registry bump needed; W1 fix flows on next glass-ui build:watch)        │
   │   └── keyframes demo: ^3.3→^3.4 (keyframes' OWN tranche-G item; fixes its broken TopDock collapse)                 │
   │   words: NOT in this gate (always-expanded dock) — can bump ^3.0→^3.4 any time, no W1 dependency                   │
   └───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                                                   │
                                                            E1 hard-precedes E2 ───┤ (3.4.0 < later cut)
                                                                                   ▼
   ┌──────────── E2: glass-ui 3.4.x/3.5 PUBLISH (AW band B aurora: W5 derive-door + W4 painterly + W6-8) ──────────────┐
   │   needs E0a (value.js pin) ALREADY landed.  UNBLOCKS the aurora consume window (3 consumers):                       │
   │   ┌── speedtest: rewrite src/config/auroraConfig.ts → single deriveAurora call; opt-in strokeAmount/impasto/       │
   │   │              granulation/flow (all =0 today); discharges in-repo carry DDR-AS-RC-2 (auroraConfig.ts:71-73)     │
   │   ┌── muster: replace useAuroraConfig.ts 2-stop palette + lerpHsl with one brand-hue derive call                   │
   │   └── value.js demo: color-picker/App.vue:209-214 static clone → deriveAuroraConfig(cssColorOpaque) ;              │
   │                      rebind AuroraPane.vue stub (:sections=[] → live AuroraConfig axes)                            │
   └───────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
                                                                                   │
                                                                                   ▼
   ┌──── E3: later cut(s) — band C blob (W9-11) → value.js goo-blob fork convergence (parity-gated, multi-release) ;    │
   │      bands D-G glass-atoms/restyle/Lighthouse → PASSIVE lifts on the E1 bump (no per-repo adoption wave) ─────────┘
```

### The edge list (every edge cites a verified fact)

1. **E0a → AW.W5 (HARD):** glass-ui value.js peer `^0.10.0` (`package.json:616`) excludes 0.11.0 (npm latest, verified); W5's `interpolateHue`/`mixColorsN` ship only in 0.11.0 (`valuejs-aurora-color-seam.md` F6). Bump before W5's registry CI.
2. **E0b → (none, independent):** keyframes peer `^2.2.0||^3.0.0` (`package.json:615`) excludes 4.0.0 (npm latest); ship-safe widen, no wave dependency (`keyframes-motion-seam.md` F6-7).
3. **E1 (3.4.0) → fourier/speedtest/muster/value.js-demo/keyframes-demo bump (HARD ×5):** each mounts the simple-collapse path broken in 3.3.0 (Finding 2 mount cites). NONE may land on 3.3.0.
4. **words ⊥ E1 (NO edge):** `always-expanded` docks (WordListView.vue:22,109) — regression has no surface (Finding 3).
5. **E1 < E2 (publish order):** 3.4.0 cuts W1+convergence; aurora band B ships a later cut (`AW.md:214` E1 scope is dock+convergence only).
6. **E0a precedes E2:** the value.js pin must be live for the aurora-band registry CI, AND it is the SAME pin W5 needs — land it once at E0a.
7. **E2 → 3 aurora consumers (SOFT, opt-in):** the painterly arc auto-repaints (no edge); the W5 derive FRONT DOOR is a new API call (soft adoption edge) — speedtest/muster/value.js-demo named (Finding 5).

### Sequencing notes a wave-spec writer can lift

- **The 3.4.0 bump is ONE coordinated event per consumer, not a drip.** muster/fourier/speedtest pick up W1+W2+W3 (and the passive band-D/F/G lifts) in a single pin bump with zero code change — props + token names are unchanged (`muster-adoption-gap.md` Finding 2, "single coordinated event not a per-wave drip"). Do NOT author per-wave consumer adoption waves for the motion band.
- **TWO token-name FREEZE gates ride the 3.4.0 bump** (regression fixtures for AW.W26/W31): speedtest binds `--spring-snappy`/`--ease-out`/`--duration-{slow,normal}`/`--motion-stagger-*` (`pane-slide.css`, `motion.ts`); muster binds `--spring-{snappy,bouncy}`/`--ease-{standard,out-expo}`/`--duration-{fast,normal,medium}` + `--glass-{highlight,specular,under-shadow-*}` (`styles.css:104-117,290-299`). A rename silently falls back. W31/W26 must hold these names or carry a migration note.
- **The value.js `file:` symlink consumer does NOT need a registry bump** — it tracks glass-ui HEAD via `build:watch` (contract-v2). Its W1 fix flows the moment AW.W1 lands on the glass-ui branch; the registry-bump edge applies only to the `^3.x`-pinned consumers (fourier/speedtest/muster/keyframes-demo).
- **keyframes-demo's bump is a keyframes-tranche-G item, not a glass-ui task** — surfaced here because the seam audit found the broken mount (`keyframes-motion-seam.md` E.W10/seed). The hub ADOPTION-ASKS ledger should record "keyframes demo: GlassDock consumer, 3.4.0-gated."

## Anti-findings (verified FINE / already done)

1. **NO keyframes-side wave is required by AW.** keyframes 4.0.0 already ships the stable SpringProgress surface AW.W2 consumes; every API the plan names exists (`keyframes-motion-seam.md` F4-5,9). The only keyframes edge is glass-ui catching its OWN pin up (E0b).
2. **NO value.js color/harmony wave is required.** value.js owns the low-level science; AW.W5's `deriveAurora`/`deriveScene` is glass-ui aurora-DOMAIN composition over value.js's `gamutMapOKLab` — a value.js harmony API would be speculative single-consumer substrate (`valuejs-aurora-color-seam.md` F2, Wave "NONE REQUIRED"). The only value.js edge is the glass-ui peer-pin bump (E0a).
3. **No in-scope consumer is a W16 DeckProgress or W17 Constellation-COMPONENT adoption target** — the binding 2nd consumer is slides H (tranche H, out of scope). fourier's `useCanvas2D` SUBSTRATE fit is real but soft/optional (Finding 7).
4. **speedtest is CLEAN at HEAD** — the "157-dirty" precondition in the lane brief is stale (`git status` = 0). No dirty-tree blocker on its bump.
5. **words' dirty tree (23 files) is all backend/docs** — zero frontend-dock files; not a precondition blocker for its (ungated) frontend bump.
6. **Every in-scope consumer's WIRING is already correct** (4/4 binding requirements, flat-subpath discipline, on-cascade token overrides) per all six adoption-gap digests — the bump is a pin change + optional consume work, never a wiring repair.

## Summary

The constellation adoption program is a near-tree rooted at ONE dominant publish node. **E1 = glass-ui 3.4.0 (AW.W1 dock-collapse fix + W16/W17 convergence)** hard-gates 5 of 6 consumers — fourier (3 docks), speedtest (3, CLEAN tree), muster (CommandDock), value.js demo (Dock.vue:93), keyframes demo (TopDock.vue:118) all mount the simple two-layer `#collapsed`/`:start-collapsed` collapse path that 3.3.0 freezes; NONE may land on 3.3.0. **words is the lone exception** — its two docks are `always-expanded` (no collapse surface), so it is ungated. The next consume window, **E2 = the aurora band (W5 derive-door + W4 painterly)**, opens on a LATER cut for the 3 Aurora consumers (speedtest, muster, value.js demo — not fourier/words/keyframes). TWO supplier-edge pin bumps are pre-publish prerequisites, both verified stale at HEAD: glass-ui's value.js peer `^0.10.0` (`package.json:616`) excludes npm-latest 0.11.0 and MUST bump before AW.W5's CI is registry-green (it carries the `interpolateHue` W5 needs); glass-ui's keyframes peer `^2.2.0||^3.0.0` (`:615`) excludes npm-latest 4.0.0 — a ship-safe independent widen. Per-consumer the 3.4.0 bump is a SINGLE coordinated event (W1+W2+W3 + passive band-D/F/G lifts in one hop, zero code change), with two token-name FREEZE obligations (speedtest + muster bind `--spring-*`/`--ease-*`/`--duration-*` + glass-depth tokens). No keyframes-side or value.js-side code wave is warranted; the only cross-repo edges are the two glass-ui pin bumps and the per-consumer 3.4.0 pin bump.

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/constellation/adoption-sequencing-dag.md
