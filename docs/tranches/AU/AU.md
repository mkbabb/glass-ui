# Tranche AU — complete AT in totality + drive the 3.3.0 publish (the constellation root)

AU is glass-ui's post-AT tranche. It is **not a fresh successor over a clean AT
close** — it is the execution of AT's authored-but-unrun mass (the blob/WebGL/color
headline W2–W5, the AS-residual correctness fold, the slipped Fraunces ship, the
dock-design gestalt) PLUS the deferred-lineage whose triggers have since fired, folded
into ordered waves that land the slides-F-blocking + 3.3.0-publish items FIRST and ship
the **3.3.0** publish that unblocks the tri-tranche constellation.

This file is the glass-ui-native formalization of the begotten CHARTER authored under
`fourier-analysis/docs/constellation/tri-tranche-run/glass-ui-next/` (inv-16: fourier
owns `docs/constellation/`; that CHARTER edited no glass-ui source). AU.W0 transcribes it
here as the binding tranche and re-grounds every fact against glass-ui HEAD `8e4cb9f`.

**Plan basis** — `CHARTER.md` §1–§7 + the four sibling audits
(`audit/{at-state,deferred-lineage,deferred-ledger,precept-prompt-recap,slides-coupling}.md`)
+ the eleven per-wave specs (`waves/AU.W0..AU.W10.md`), all under the fourier hub. The W0b
SOTA reads (`AT/audit/W0b-{A,B,C}{1..6}`) + the C-synthesis are inherited WHOLE — no
re-audit of the SOTA is owed. The design slices land at AU.W1 (`design/`); the close at
`FINAL.md`.

**Format** — mirrors AT (`AU.md` + `PROGRESS.md` + `design/` + `FINAL.md`). DEV waves
(W0 formalize, W1 design) write no `src`; IMPL waves (W2–W10) are authored now as binding
specs and were greenlit for execution by the S2 KICKOFF (the standard tranche-start prompt
+ the coordination addendum). The publish leg (W10) is USER-DOMAIN, confirm-first.

---

## §1 — Thesis

**Complete AT in totality.** AT was authored as a 10-wave plan across three braided
headlines and executed exactly ONE slice — the dock convergence (three commits,
`e906448`/`f0b0ffb`/`8e4cb9f`). The blob/aurora/WebGL/color transposition (W2–W5), the
AS-residual correctness fold (W6 non-dock), the slipped Fraunces ship (W7), and the close
(W8) never left the spec. AU executes that authored-but-unrun mass, folds the deferred
lineage whose triggers have since fired, lands the slides-F-blocking + 3.3.0-publish
priority items first, and ships the 3.3.0 publish.

AU is built on the user's standing directive — **architectural transposition for elegance,
simplicity, performance is necessary + desirable; no workarounds, no legacy.** The three
AT transpositions carry IN FULL:

1. **ONE `useWebGLCanvas` substrate** — aurora + goo-blob share it; the zero-consumer
   `frostShader.ts` orphan is DELETED (present at HEAD,
   `src/composables/glass/webgl/frostShader.ts`). The off-screen-pause gate is PRESENT,
   not missing — aurora already composes `useIntersectionPause`; the substrate WIRES that
   existing gate. Only `webglcontextrestored` is genuinely absent and is absorbed
   strictly-additively. The substrate must NOT bake aurora's quad/attrs/DPR — a consumer-#2
   usability assert co-gates it (W0b-C6 must-fix #4), or the extraction is a disguised copy.
2. **The injected `ColorResolver` seam** — replaces the demo's DOM-coupled 1×1-canvas
   `cssColorToRgb` probe; THROWS by name (`defaultBlobColorResolver`) on a no-resolver
   mount (the loud failure, not a silent gray default).
3. **The OKLCh shader transposition** — the W5 shader-quality wave on the W4 GAMMA shader,
   carrying the DEC-AT-7 color-space seam (§6).

The two non-dock correctness debts (`peerDependenciesMeta`, the DataTable `@vueuse` root
leak) are CHRONIC — RED at HEAD, survived AS → AT — and are AU's first non-headline wave.
NO item is re-litigated; UNBUILT specs fold forward as-authored.

---

## §2 — Re-ground (the post-AT landed state, HEAD `8e4cb9f`)

HEAD `8e4cb9f`, branch `at-dock-convergence`, version **3.2.0** (the published npm
baseline at tag `v3.2.0`; `8e4cb9f` is `v3.2.0` + 7 commits, of which 3 are dock IMPL and
4 are AT-doc/master — the version was NOT bumped, so HEAD is the unpublished 3.2.0 delta
that AU's publish promotes to 3.3.0). `master` is `a09c2b6`; `at-dock-convergence` is
`master` + the three dock commits, fast-forwardable (`git merge-base --is-ancestor master
at-dock-convergence` = true).

### What AT landed — FACT, re-verified at HEAD (not inherited from the campaign record)

| Commit | Slice | What landed (FACT) | DONE-AT-HEAD |
|---|---|---|---|
| `e906448` | AT.W6-dock-c | VT/FLIP timing-parity — `--dock-resize-spring` (`tokens.css §20`); both the FLIP path (`dock.css --dock-motion-resize`) and native-VT path (`view-transition.css`) consume it; `morphGeneration` concurrency guard; `proof:dock-motion-parity` + `GlassDock.motion-parity.test.ts` | DONE |
| `f0b0ffb` | AT.W6-dock-**b′** (touch-gate) | the keyframes-filed double-tap field defect REPRODUCED then fixed (dropped the activating-touch `preventDefault`/`stopPropagation`; rides native tap→click); `GlassDock.touch-gate.test.ts` (behavioural) | DONE |
| `8e4cb9f` | AT.W7-dock-a/b/c | overflow clean break (`overflow?: "grow"\|"wrap"\|"scroll"`, `wrap` boolean DELETED, `.dock-wrap`→`.dock-overflow-wrap`, `640px`→`--dock-overflow-bp`); token-only design refinements (press `0.92`→`var(--scale-press)`=0.96, glass icon-hover, `--dock-press-spring`); `proof:doc-consistency` ι doc-rot gate | DONE |

These three are SHIPPED; AU inherits them, does NOT re-litigate them, and **re-verifies
them on AU's OWN green CI at the W10 close (inv-27 — they landed on PR #1, not a
tranche-gated close)**.

### The slot-ID collision — re-lettered (a real defect in the AT record)

The AT PLAN assigned `W6-dock-b` = *the a11y + state-machine contract test*
(`AT/design/AT.W1b-dock.md`). The COMMIT `f0b0ffb` re-used `W6-dock-b` = *the touch-gate B′
behavioural test*. Two distinct deliverables, one slot ID. **AU re-letters under its own
numbering:**

- The **touch-gate B′** is recorded SHIPPED under its true identity (`f0b0ffb`, this
  tranche calls it **AT.W6-dock-b′** in citations).
- The **un-shipped a11y + state-machine contract test** — the deliverable the PLAN's
  `W6-dock-b` always owed and never shipped — is assigned a **fresh AU ID: AU.W8** (the
  dock-design headline). It is NOT silently dropped because its slot "looks taken."

`W6-dock-b` appears in this tranche ONLY as this historical-citation re-letter note — never
as a live AU deliverable.

### The keystone never landed

`proof:strict-templates` (the AT `W6-dock-a` keystone, specified to "land FIRST so the
clean breaks typecheck-fail") did not land — no `checkUnknownProps`/`strictTemplates` in
ANY tsconfig at HEAD. The W6/W7 clean breaks shipped UNGUARDED by the very gate designed to
protect them. AU corrects the ordering: `proof:strict-templates` lands FIRST within AU.W3,
library-wide, then re-verifies the landed breaks under it.

### Everything else — verified ABSENT at HEAD

No `/goo-blob`, no `/watercolor-dot`, no `useWebGLCanvas` substrate, no `/color` leaf;
`frostShader.ts` still PRESENT; `package.json:559 "optionalPeerDependencies"` still the
dead non-standard field (and NO `peerDependenciesMeta`); `DataTable.vue:3 useElementSize`
still leaking `@vueuse/core` through the source root barrel; `typography.css`/`fonts.css`
carry ZERO Fraunces `@font-face` (the `tokens.css:43 --font-stack-display:"Fraunces"` token
is dangling — WONK/SOFT axes silently inert); `supportsPostTask` (`platformSupport.ts:23`)
has 0 public-predicate callers. All verified by direct file read at W0 (PROGRESS §HEAD-facts).

### USER-DOMAIN boundary

The submodule is in-flight (` M docs/precepts`) — forbidden to touch (inv-16′). AU
re-grounds against this HEAD and never stages `docs/precepts`. Every `git add` names
explicit paths.

---

## §3 — The wave table (the path forward)

Folds AT's unbuilt waves + the deferred lineage + the slides-F priority items into ordered
waves. The slides-F-blocking + 3.3.0-publish items land FIRST. Each wave names a falsifiable
HARD gate. W0 (formalize) + W1 (design) are DEV; W2–W10 are IMPL (greenlit by the S2
KICKOFF).

| Wave | Headline | Type | HARD gate (falsifiable) |
|---|---|---|---|
| **AU.W0** | Formalize the CHARTER into `tranches/AU/`; re-ground against `8e4cb9f`; re-letter the slot-ID collision; decompose the "3 a11y asks" bundle (#29) against speedtest's lane-b3 audit; bind zero-deferral at open (P-Inv 28) | DEV | `proof:au-w0-reground` — `AU.md`+`PROGRESS.md` exist; the 3 dock SHAs ancestor-reachable; zero bundle labels survive as live deliverables; every folded item tagged; the collision re-lettered |
| **AU.W1** | Design slices — re-issue AT.W1's blob-primitives / dock / color-gates design as-authored against HEAD (no re-audit) | DEV | `proof:au-w1-design` — the three design files exist; each cites its AT.W1 origin + HEAD delta; every W1c gate registered born-RED in `gates.mjs` |
| **AU.W2** | **Dock opacity-lockstep fold [slides-F P0 HEADLINE].** Swap `.dock-layer{,-item-host}` opacity `--dock-motion-fast`→`--dock-motion-resize`; extend the base-rule `visibility` delay; preserve the active-rule immediate show | IMPL | `proof:dock-opacity-lockstep` — a playwright timing probe (NOT a screenshot): items + container settle ≤1 frame; reddens on a re-injected desync |
| **AU.W3** | **The keystone + correctness fold [3.3.0-publish-blocking].** `proof:strict-templates` FIRST (`checkUnknownProps:true` library-wide), then re-verify the clean breaks; `peerDependenciesMeta` + `proof:peer-optional`; DataTable `useElementSize`→in-house `useResizeObserver` + `proof:vueuse-free-root`; `supportsPostTask` WIRE-or-DROP; keyframes peer-matrix `proof:package` axis; the decomposed a11y sites (§5) | IMPL | `proof:strict-templates` green + `<GlassDock bogus-prop>` RED; `proof:peer-optional` green; `proof:vueuse-free-root` green; both born-RED gates redden on inject |
| **AU.W4** | **Fraunces `@font-face` ship + `proof:font-axes` [slipped].** Mirror the Plus-Jakarta self-host pattern; ship the opsz+SOFT+WONK woff2; retire the dangling display token's inert axes | IMPL | `proof:font-axes`: every axis `typography.css` references is carried by a shipped `@font-face` |
| **AU.W5** | **`/color` runtime-JS leaf** (DEC-AT-7) — hoist `oklchToLinear` + author `oklchToGammaRgb`, both value.js-backed; CSS token tier STAYS native (guarded) | IMPL | `proof:color-acyclic` + `proof:single-color-core` green; the published graph is a DAG |
| **AU.W6** | **`useWebGLCanvas` substrate + aurora refactor** (DEC-AT-1) — extract; refactor aurora; DELETE `frostShader.ts`; absorb `webglcontextrestored`; carry aurora's `useIntersectionPause` gate | IMPL | `proof:webgl-substrate-single` (pixel AND scheduling parity) + consumer-#2 usability assert; `proof:frostShader-deleted` (file-absence + import-graph, NOT name-grep) |
| **AU.W7** | **The blob trio [user-ruled headline].** `/watercolor-dot` + `/goo-blob` on the substrate + the `ColorResolver` seam + demo story #2 + the W5 shader-quality stage (DEC-AT-7 LINEAR half) | IMPL | `proof:blob-value-free` (two-tier) + `proof:no-value-default` (throws `defaultBlobColorResolver`) + `proof:webgl-golden` + the 8-assertion CPU-equivalence (1e-6, witness `#3a7bd5`) + `proof:blob-space-gamma` |
| **AU.W8** | **The AU dock-design headline.** reka-ui `Tabs` rail + the travelling rail-indicator + the dock a11y/state contract test (the re-lettered original `W6-dock-b`) + spring-fidelity unification + the `<Role>Dock` docs vocabulary + base renames; ONE atomic edit | IMPL | `proof:dock-a11y-contract` (tablist/tab/aria-selected, roving tabindex, focus-visible, keep-open) + `proof:dock-vocabulary` |
| **AU.W9** | **Control-pane + dark-ergonomics + lean folds + slides-supply.** A-1 divider opt-in + A-2 label ladder; `useGlobalDark({initialValue})` + `darkModeSyncScript()`; Drawer `:native` (FOLD-IF); size-vocabulary (FOLD-IF); the publish-gated slides-supply (`showClose`, `/deck` lift, Card/Badge, `useCountup`+`v-reveal`) | IMPL | `proof:au-w9-consumers` — each folded item names ≥2 consumers; A-2 visually verified |
| **AU.W10** | **Close** — overfitting audit (PROPS); the gates matrix; `AU.FINAL` + the `inv-AT-color` close; the 3.3.0 changeset; drive to READY-TO-PUBLISH | IMPL (LAST) | `proof:au-final` — full matrix green over a clean tree; overfitting audit zero orphans; `gates:verify-ci` green; `FINAL.md` cites a green run id per wave; the changeset staged + NOT auto-published |

**Cross-repo (inv-16) — name-forward only.** value.js K.W3 (delete the demo blob impls,
import the published `/goo-blob` + `/watercolor-dot`, supply its own `ColorResolver`) is
BLOCKED until AU publishes 3.3.0. No glass-ui write is owed — the publish is the unlock.

---

## §4 — The folded disposition ledger (71 items, 1:1 with `audit/deferred-ledger.md`)

Every glass-ui deferral the lineage carries (#1–63) + the 8 standing asks, each tagged with
its AU disposition. **Zero un-dispositioned punts (P-Inv 28 — zero-deferral at open.)**
Vocabulary: **FOLD-Wn** (executes in AU at the named wave) · **BOOK** (named-forward, a
concrete trigger, glass-ui holds the lever) · **KILL** (terminal) · **OUT** (cross-repo /
submodule; glass-ui writes only glass-ui).

### §4.1 — The AT-unrun headline + correctness + slipped-ship (#1–10)

| # | Item | Disposition |
|---|---|---|
| 1 | goo-blob primitive (`/goo-blob` + `useMetaballRenderer` + GLSL + OKLCh) | **FOLD-W7** (the user-ruled headline; GAMMA lift, injected `ColorResolver`) |
| 2 | watercolor-dot primitive (`/watercolor-dot` + `useWatercolorBlob` + SVG filter + `prng` leaf) | **FOLD-W7** |
| 3 | `useWebGLCanvas` substrate (`frostShader.ts` deleted; restore+pause absorbed) | **FOLD-W6** |
| 4 | `/color` runtime-JS leaf (`oklchToLinear` + `oklchToGammaRgb`, value.js-backed) | **FOLD-W5** |
| 5 | The shader-quality wave (fwidth AA · Quilez smin · rotated FBM · OKLCh linear-flip + `linearToSrgb()` · exact Ottosson matrices · hue-preserving gamut) | **FOLD-W7** |
| 6 | DataTable vueuse root-barrel leak (CHRONIC, RED@HEAD) | **FOLD-W3** (`useElementSize`→in-house `useResizeObserver` + `proof:vueuse-free-root`) |
| 7 | `supportsPostTask` thin witness (0 callers) | **FOLD-W3** (WIRE-or-DROP) |
| 8 | `peerDependenciesMeta` undefined + dead `optionalPeerDependencies` (CHRONIC, RED@HEAD) | **FOLD-W3** (fix field shape + DELETE the dead field + `proof:peer-optional`) |
| 9 | `proof:strict-templates` (the silent-no-op closer) | **FOLD-W3** (the KEYSTONE — lands FIRST WITHIN W3, library-wide) |
| 10 | Fraunces `@font-face` (opsz+SOFT+WONK woff2) + `proof:font-axes` | **FOLD-W4** (the ONE slipped SHIP; ≥2 = words + value.js) |

### §4.2 — The AU dock-design successor (#11–16)

| # | Item | Disposition |
|---|---|---|
| 11 | rail traveling-indicator + APG-tabs ARIA (reka-ui Tabs) | **FOLD-W8** (the atomic structural pass; per-button bg RETIRED) |
| 12 | spring-fidelity unification + micro-feedback + `will-change` | **FOLD-W8** (NOTE: `--scale-press-dock` 0.92→0.96 is DONE-AT-HEAD `8e4cb9f`; ships to slides via the W10 publish, NOT AU.W8 work) |
| 13 | `useDockMagnify` (proximity magnification) | **BOOK** (0 firm consumers; trigger: ≥2 dock consumers ask) |
| 14 | stagger the expand | **BOOK** (0 consumer; trigger: its own ≥2) |
| 15 | pane VT participants + directional slide (`DockLayerGroup`) | **BOOK** (trigger: a 2nd consumer + visual proof) |
| 16 | `overflow:"clip"` member + typed dock `tier?` prop | **BOOK** (0 consumers; trigger: ≥2) |

### §4.3 — The W-ASK control-size + 1-consumer backlog (#17–29)

| # | Item | Disposition |
|---|---|---|
| 17 | Button `size="icon-sm"` | **FOLD-W9** (ONE size-vocabulary pass with #20; FOLD-IF the wave opens, else BOOK) |
| 18 | `DockSelectTrigger clampLabel` | **BOOK** (1 consumer; trigger: a 2nd clamp consumer) |
| 19 | `TooltipContent variant="mono"` | **BOOK** (1 consumer) |
| 20 | `Select size` | **FOLD-W9** (pairs with #17; the only clean ≥2 for the W-ASKS) |
| 21 | `useGlobalDark({ initialValue })` | **FOLD-W9** (pairs with #22) |
| 22 | FOUC parse-time `darkModeSyncScript()` primitive | **FOLD-W9** (≥2: speedtest + words `light-dark()`) |
| 23 | GlassDock `overflow` vs `wrap` contract clarification | **KILL (DONE)** (clean break SHIPPED `8e4cb9f`, `rg .dock-wrap = 0`) |
| 24 | MetricBadge icon slot | **BOOK** (1 consumer) |
| 25 | LabeledField for/id binding (a11y) | **FOLD-W3** (DECOMPOSED at W0 §5 → B3-1, a concrete failing site) |
| 26 | `useRAFLoop` demandPark | **BOOK** (1 consumer) |
| 27 | `--spring-crisp` token (ζ≈0.80) | **BOOK** (0 witnessed ≥2) |
| 28 | CompletionSeal / GoldHeadline / CheckDraw | **BOOK** (component stays demo-gated until a 2nd consumer) |
| 29 | "3 a11y asks" (DDR-AS-RC-2 bundle) | **DECOMPOSED at W0 §5** → three named GU-routed sites, all **FOLD-W3** (zero bundle label survives as a live deliverable) |

### §4.4 — The fourier control-pane asks (#30–31)

| # | Item | Disposition |
|---|---|---|
| 30 | A-1 `ConfiguratorLayer`/`ConfiguratorRow` inter-row divider-rule opt-in | **FOLD-W9** (precondition: `index.css` budget rebase, named) |
| 31 | A-2 `ConfiguratorLayer` `label`/`sub` → the typography ladder at root | **FOLD-W9** (restyles every pane title → paired-π visual verification) |

### §4.5 — The chronic convergence-watches (#32–36)

| # | Item | Disposition |
|---|---|---|
| 32 | Drawer `:native` / `GlassNativeDrawer` / `/native-drawer` | **FOLD-W9** (the strongest non-headline ≥2 — muster + speedtest, both FIRM; FOLD-IF scope admits, else BOOK) |
| 33 | inline-edit primitive | **BOOK** (3 divergent consumers; promote on contract-convergence) |
| 34 | dock panel-host variant | **BOOK** (1 consumer) |
| 35 | LabeledSlider numeric-readout | **BOOK** (2-divergent; trigger: a 3rd OR the 2 converge) |
| 36 | shadcn parity (calendar / date-picker / pagination) | **KILL (REJECT)** (0 consumers; building parity on spec is the overfitting class) |

### §4.6 — The platform-Baseline-gated pilots + CSS levers (#37–46)

| # | Item | Disposition |
|---|---|---|
| 37 | G3 cross-document VT (`@view-transition{navigation:auto}` + directional vocab) | **BOOK (split)** (library half ships on ≥2 opt-in consumers) |
| 38 | G5 `@scope` + `:state()` (retire `:deep()`) | **BOOK (paid-diff-only)** |
| 39 | G6 CSS `@function` | **BOOK** (Limited/Chromium-only) |
| 40 | G8 `interestfor` action-previews | **BOOK** (Limited/experimental) |
| 41 | `text-box-trim` | **FOLD-W4-IF** (FOLD into #10's Fraunces touch IFF the SFC touch pays the diff; else BOOK) |
| 42 | `interpolate-size` / `calc-size(auto)` | **BOOK (paid-diff-only)** |
| 43 | relative-color `oklch(from …)` | **BOOK (paid-diff-only)** |
| 44 | GlassDialogNative pilot | **BOOK** (trigger: Baseline Widely) |
| 45 | HoverPopover `:native` opt-in | **BOOK** (graduates with G8) |
| 46 | G7 `GlassNativeSelect` | **BOOK (demo-gated)** |

### §4.7 — The terminal KILLs (#47–55 — do not re-mint)

| # | Item | Disposition |
|---|---|---|
| 47 | P5 OUTER-ONLY inner-rounding | **KILL** (user RULED 2026-06-04; outer-only canonical; NEVER re-book) |
| 48 | DDR dock dark rung + fg-on-aurora | **KILL (shipped AS.W5)** |
| 49 | DDR AnimatedDigit | **KILL (already public)** |
| 50 | DDR ContinuousTimeline marker-opt-out | **KILL (shipped)** |
| 51 | DockIconButton 44px coarse floor (S-2) | **KILL (shipped AS.W5, `dock.css:1170-1185`)** |
| 52 | value.js VAL-9 (`spring()→LinearStop[]` emitter) | **KILL** (keyframes owns the emitter; no glass-ui lever) |
| 53 | P7 Mascot / monogram-pose | **KILL** (constellation DEC-3) |
| 54 | shared in-shader OKLab path | **KILL** (aurora bakes per-nucleus, blob perturbs per-pixel — correctly different shaders; the shared primitive is the `/color` leaf #4) |
| 55 | OffscreenCanvas+Worker / WebGPU aurora | **KILL (pre-refuted)** (SOTA-confirmed wrong for small bg canvases) |

### §4.8 — OUT (USER-DOMAIN — inv-16 name-forwards; #56–63)

| # | Item | Disposition |
|---|---|---|
| 56 | value.js VAL-1 / `deriveAurora` ≥2 kill-gate | **OUT** (value.js; producer SHIPPED AS.W7) |
| 57 | value.js K.W3 blob consumer rewrite + `ColorResolver` supply | **OUT** (value.js; UNBLOCKS on AU.W10's publish) |
| 58 | value.js K.W2.5 `development`-key strip | **OUT** (value.js's arm) |
| 59 | `docs/precepts` submodule pin re-sync + the π visual-evidence precept pin | **OUT** (precepts repo / user; in-flight, forbidden to touch — inv-16′) |
| 60 | bbnf-lang/playground dist-alias fossil | **OUT** (playground maintainer) |
| 61 | deploy-standardization Asks 1-7 + inv-22-color | **OUT** (each repo's maintainer; glass-ui not a listed arm) |
| 62 | cascade lockfile cohort (`cascade-gui`) | **OUT (opportunistic)** (folds when AU touches the lockfile — W3 peer-field reshape or the W10 publish) |
| 63 | M-CI / M-DEPLOY / M-MEASURE spine | **OUT** (glass-ui's only leg — the 3.2.0 CI-publish — DISCHARGED) |

### §4.9 — The standing asks (precept-prompt-recap §2), reconciled

| Ask | Disposition |
|---|---|
| ASK-1 dock-vt-name | **KILL (SHIPPED 3.1.1)** (`GlassDock.vue:144`; KILL the W6 console-filter bridge as born-legacy) |
| ASK-2 VAL-9 codegen | **KILL** (#52) |
| ASK-3 a11y LabeledField (`inert`) | SHIPPED 3.1.1; the DDR for/id binding (#25) is **FOLD-W3** (decomposed W0 §5) |
| ASK-4 asideSide (A-3) | **KILL (SHIPPED 3.2.0)** (`Configurator.vue:85`) |
| ASK-5 P5 inner-rounding | **KILL** (#47; user-ruled phantom — NEVER re-book) |
| ASK-6 VT-parity dock spring | **DONE-AT-HEAD** (`e906448`; re-verify on AU's OWN green CI at W10) |
| ASK-7 `<Role>Dock` vocabulary + dock-docs | **FOLD-W8** (the docs-convention half + `useDock*` renames + `DockTabButton` retire; the `<Role>Dock` COMPONENT is BOOK — slides binds `GlassDock`+`DockIconButton`+`#collapsed`; the named candidate 2nd consumer is keyframes D.W5) |
| ASK-8 touch-gate double-tap | **DONE-AT-HEAD** (`f0b0ffb`); the a11y/state contract test (the collided slot) is **FOLD-W8** under a fresh AU ID |

**Disposition completeness: 63/63 numbered rows + 8 standing asks = 71 total, all
dispositioned. Zero un-dispositioned punts (P-Inv 28).**

---

## §5 — The a11y bundle DECOMPOSE (#29 / #25 — zero bundle labels survive)

The "3 a11y asks" (DDR-AS-RC-2) is a LABEL, not an auditable spec. W0 decomposes it against
speedtest's `docs/audits/2026-06-02-AT-DEEP-AUDIT/lane-b3-forms-a11y.md` (the binding input)
into named, file:line-cited WCAG sites. The three GU-routed sites each have a CONCRETE
failing target → **FOLD-W3**; the speedtest-consumer-ownable findings (B3-2/B3-3/B3-4) are
OUT (inv-16 name-forward, speedtest's own AT fold). After this section the bundle label is
NEVER a live deliverable.

| Site | Source (file:line) | WCAG | Disposition |
|---|---|---|---|
| **B3-1** LabeledField has no `for`/id — every survey field is an orphaned control | glass-ui `LabeledField.vue:4,11` (`<label>` no `for`), `LabeledInput.vue` (no shared id); speedtest `SurveyField.vue:22` consumes it | `forms` "associate `<label>` with its input using `for`/`id`"; WCAG 1.3.1/4.1.2 | **FOLD-W3** — `LabeledField` mints a `useId()` (it ALREADY imports `useId` for `errorId`), threads it to `<label :for>` AND exposes it as a slot-prop `:control-id` so the slotted control binds `:id`; the four wrappers auto-wire it (no consumer-side hand-rolled `for` — that would re-introduce the `df014fb2` rung-collision) |
| **B3-5a** ExpandableContainer icon-only `<button title>` ≠ accessible name | glass-ui `ExpandableContainer.vue:4-11,21-28` (`<button title="Fullscreen">`/`title="Exit fullscreen"`, `Maximize2`/`Minimize2`, no `aria-label`) | axe `button-name`, WCAG 4.1.2 | **FOLD-W3** — add `aria-label` (default "Fullscreen"/"Exit fullscreen", overridable via prop) on both buttons |
| **B3-5b** ResponsiveTabs mobile `<SelectTrigger>` no accessible name | glass-ui `ResponsiveTabs.vue:138-142` (`<SelectTrigger>` carries only `<SelectValue/>`, no `aria-label`) | axe control-name, WCAG 4.1.2 | **FOLD-W3** — add an `aria-label` prop threaded onto the mobile `SelectTrigger` (sensible default from the active option) |

**The 4th GU-adjacent a11y root (the `.input-pill` `:user-invalid` style rung, B3-6,
AS.md:155):** a STYLE rung, not part of the "3 a11y asks" bundle — verified at AU.W3 (if a
`:user-invalid` rung is absent from `.input-pill`, FOLD it as the W3 a11y companion; if
present, KILL-as-shipped). The consumer-side aria-sync wiring (B3-2/B3-3/B3-4/B3-6) is
speedtest's arm (OUT, inv-16).

---

## §6 — DEC-AT-7 (the load-bearing color-space seam, carried verbatim)

The single most important contract AU inherits, the one design decision an AU executor
cannot rediscover from the code:

**Color space is GAMMA at the blob's faithful lift (AU.W7's lift stage), LINEAR at the
shader-quality flip (AU.W7's quality stage) with the mandatory `linearToSrgb()` OETF.** The
W4-GAMMA lift paints gamma sRGB (HSV needed no OETF); the W5-LINEAR quality stage flips
`uBaseColor` to linear AND adds the `linearToSrgb()` output stage. Left implicit, the blob
ships visibly too-dark (linear default, no OETF) AND the perceptual-uniformity claim voids.

The `/color` leaf (AU.W5) exports BOTH `oklchToLinear` (aurora's bake) AND `oklchToGammaRgb`
(the blob's gamma exit) — "one core" binds the MATH SOURCE (value.js), NOT the return space.
Forcing one return space re-introduces the darkening defect. A CLOSED design question (inv-AT-color)
— AU EXECUTES the leaf; it does NOT re-decide the answer. Each wave's gate asserts THAT
wave's declared space (`proof:blob-space-gamma` for the lift; the 8-assertion CPU-equivalence
with `linearToSrgb()` present for the quality stage).

---

## §7 — Invariants (HARD gates, not sentiments)

- **inv P1 — no legacy.** Every clean break carries NO alias. `frostShader.ts` DELETED
  (`proof:frostShader-deleted` = file-absence + import-graph, NOT a name-grep, which is
  born-GREEN at HEAD); the 1×1-canvas probe DELETED (replaced by the throwing `ColorResolver`);
  the dead `optionalPeerDependencies` field DELETED; the dead `ValueJs` UMD global DELETED;
  `DockTabButton` RETIRED. A grep for any retired symbol outside its deletion commit = 0.
- **inv P2 — architectural transposition desirable.** Each of the three transpositions (§1)
  is net-deletion-or-neutral at its core, proved by before/after LOC + a ≥2-consumer assert.
  NO workaround substitutes; the substrate must not bake consumer-#1's choices.
- **inv P3 — substrate with consumer; wire before retire.** The ≥2-DISTINCT-consumer-CONTEXT
  bar (J-inv-10: convergence, not census) gates every new public surface. The blob ships on
  value.js + the demo story — muster's blob interest is design-SURVEY, NOT a firm 2nd.
  `supportsPostTask` is WIRE-or-DROP. The overfitting audit tallies PROPS.
- **inv-27 — green-means-green (the binding inv).** Every "done" cites glass-ui's OWN green
  CI run id covering every job. AU cannot inherit "the dock is done" from the campaign record
  — it RE-VERIFIES the three landed dock commits on a tranche-gated close. No wave closes on a
  campaign-record or a narration.
- **inv-θ — green-means-green for the GATE FLEET.** Every new gate AU defines
  (`proof:dock-opacity-lockstep`, `proof:strict-templates`, `proof:peer-optional`,
  `proof:vueuse-free-root`, `proof:supportsPostTask-wired`, `proof:font-axes`,
  `proof:color-acyclic`, `proof:single-color-core`, `proof:webgl-substrate-single`,
  `proof:webgl-golden`, `proof:frostShader-deleted`, `proof:blob-value-free`,
  `proof:no-value-default`, `proof:blob-color-equivalence`, `proof:blob-space-gamma`,
  `proof:dock-a11y-contract`, `proof:dock-vocabulary`, `proof:au-w9-consumers`, plus the DEV
  meta-gates `au-w0-reground`/`au-w1-design`/`au-final`) is registered in `gates.mjs` with its
  `{local,ci,release,sibling}` tag, NOT hand-listed in ci.yml. `git status` clean after
  `proof:all`; `gates:verify-ci` fails closed on drift.
- **inv P6 — fail-closed-green gates.** No forbidden form ("API exists"; "grep found a source
  string for runtime behaviour"; "consumer wired later"; a silent `console.warn` + return in
  library code). The two-tier idiom is house: a SOURCE-graph gate beneath a DIST-floor gate.
  Each born-RED gate reddens on a deliberate inject; greens only after the born-green fix lands
  BEFORE the gate.
- **inv-AT-color — SETTLED, not re-litigated.** ONE runtime-JS color source (value.js, via the
  `/color` leaf); the CSS token tier STAYS native (guarded); the GLSL tier mirrors value.js on
  the GPU; the published graph is a DAG. "One core" binds the MATH SOURCE, not the return space.
  AU EXECUTES the leaf; it does not re-decide the answer.
- **inv-ε — resolve by instrument.** AT's touch-gate proved the lesson: a behavioural mounted-
  dock test, not a prose a11y assertion. AU's dock a11y contract (AU.W8) is a behavioural vitest.
- **The `<Role>Dock` precept.** ONE role vocabulary (`ChromeDock`/`TransportDock`/`CanvasDock`/
  `ToolDock`) documented ONCE in glass-ui's dock README + ONE canonical `useDock*` name per
  folded composable. glass-ui owns the docs-convention half + the base renames
  (`useTouchGate→useDockTouchGate` co-located + aliased; `DockTabButton` retire, 0 consumers —
  deletion surface `src/components/custom/dock/DockTabButton.vue`, its export at `dock/index.ts:5`,
  the `dock.css:877`/`:947` comment refs). A role-typed base COMPONENT is BOOK until a 2nd
  consumer (keyframes D.W5 the named candidate). slides binds the same base, no role-typed
  component.

**USER-DOMAIN boundaries (inv-16 / inv-16′):** the dirty `docs/precepts` submodule is NOT
touched in-flight. The 3.3.0 publish leg (`changeset version` → tag → `release.yml` /
`npm publish`) is confirm-first; agents/sub-drivers NEVER run an irreversible release step (the
boundary is irreversibility).

---

## §8 — The no-legacy ledger (the retirements W0 RECORDS, the later waves OWE)

W0 writes no code but records the no-alias deletions (P1) with their owning waves:

- `frostShader.ts` DELETE → **AU.W6** (`src/composables/glass/webgl/frostShader.ts`).
- the demo 1×1-canvas `cssColorToRgb` probe DELETE → **AU.W7** (replaced by the throwing
  injected `ColorResolver`).
- the dead `optionalPeerDependencies` field DELETE → **AU.W3** (`package.json:559`).
- the dead `ValueJs` UMD global + `libraryGlobals` wiring DELETE → **AU.W4** (`vite.config.ts:49`
  `output.globals` + `vite.library.ts:134` `libraryGlobals`, dead under ES-only output; paid-diff).
- `DockTabButton` RETIRE → **AU.W8** (component `src/components/custom/dock/DockTabButton.vue`,
  export `src/components/custom/dock/index.ts:5`, + the `dock.css:877`/`:947` comment refs).
- the per-button dock rail background RETIRE → **AU.W8** (replaced by the travelling indicator).
- the hand-rolled rail ARIA REPLACE-by-reka-ui → **AU.W8** (not aliased).
- the ASK-1 W6 console-filter bridge KILL → **AU.W8** (born-legacy; VT-name collision is
  structurally impossible since 3.1.1).

Each is named with its deletion wave so no later wave "discovers" it and keeps it.

---

## §9 — KILL / BOOK (carried, not folded — triggers named)

**KILL (do NOT resurrect):** P5 inner-rounding (#47, user-ruled outer-only), the 4 shipped-DDR
rows (#48–51), VAL-9 (#52), P7 (#53), the shared in-shader OKLab path (#54), OffscreenCanvas+
Worker / WebGPU aurora (#55), shadcn-parity (#36, REJECT), the overflow/wrap clarification (#23,
DONE).

**BOOK (carried, trigger named):** dock magnification (#13, `useDockMagnify`, 0 firm consumers),
expand-stagger (#14), pane-VT directional slide (#15), `overflow:"clip"` member + typed dock
`tier?` prop (#16), the 1-consumer W-ASKS (#18/#19/#24/#26), `--spring-crisp` (#27),
CompletionSeal/GoldHeadline/CheckDraw (#28), inline-edit (#33), dock panel-host (#34),
LabeledSlider numeric-readout (#35), the CSS levers (#37–43), the platform-Baseline-gated pilots
(#40, #44–46), the role-typed `<Role>Dock` base COMPONENT (until keyframes D.W5 is its 2nd
consumer). Per `audit/deferred-ledger.md §10`.

---

## §10 — The slides-F coupling + inv-16 attestation

The S2 session runs BOTH AU and slides-F. slides writes ZERO glass-ui (inv-16); AU is the
SUPPLY side of slides-F's `FG.W-*` demand. The coupling (`audit/slides-coupling.md`) sets AU's
wave ordering: AU.W2 (P0 dock opacity-lockstep) → AU.W3 (the keystone + correctness fold,
publish-blocking) → AU.W4 (Fraunces) → AU.W5–W7 (the `/color` leaf → substrate → blob headline)
→ AU.W8 (dock-design) → AU.W9 (control-pane + dark + the publish-gated slides-supply:
`showClose`/`/deck`/Card-Badge/`useCountup`) → AU.W10 (close + 3.3.0 publish). `FG.W-motion`
(`useCountup` + `v-reveal`) is AT-disjoint — schedulable in any AU wave.

**The 3.3.0 publish is the constellation ROOT dependency** — value.js K.W3 + slides' four
publish-gated consumptions both unlock on it. AU drives TO the publish; AU.W10 stages the 3.3.0
changeset and drives to the green-CI close. The outward publish leg is USER-DOMAIN, confirm-first.

This tranche is glass-ui-internal — every cross-repo item is NAME-FORWARD; glass-ui writes only
glass-ui. AU executes on glass-ui's own clean checkout (`at-dock-convergence`), gated on
glass-ui's own green CI (inv-27); the 3.3.0 publish leg is user-domain, confirm-first.
