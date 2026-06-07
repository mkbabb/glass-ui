# Tranche L — the glass-ui 3.4.0 adoption coda (the dock-collapse fix + the painterly-Aurora forward window)

> **HANDOFF ANNEX — glass-ui-authored, muster-applied.** This is a glass-ui-side draft of muster's
> next tranche (**L**, head **K**) authored inside glass-ui's own docs tree
> (`glass-ui/docs/tranches/AW/constellation/waves/muster-L-adopt.md`) during the AW constellation
> synthesis pass. The **muster maintainer** lifts it into `muster/docs/tranches/L/L.md` and applies it
> in muster's OWN repo, on a clean `master` checkout, gated on **muster's own green CI** (the full
> ladder — §Gate sketch). glass-ui never writes a muster file (inv-16). Every cite below is against
> muster HEAD `6be5082` on `master`, read 2026-06-07; re-verify line numbers at L open (the dirty tree
> is benign doc churn, but src/server are clean — see §Provenance anti-finding).

---

## § Provenance + frame correction (read first)

**muster is NOT a sudoku UI.** muster (`@mkbabb/muster-frontend`, `README.md:1`) is a **group
place-decision optimizer** — a venue/restaurant picker with a travel matrix, per-voter scoring, and a
ranked verdict. Its CSP is a **server-side Rust→WASM place-constraint solver** consumed only in
`server/src/solvers.ts` + `server/src/server.ts`; `frontend/src` has **zero** sudoku/board/cell/WASM
code (`grep csp-wasm|csp_wasm` over `frontend/src` returns 0 hits). The "sudoku (csp-solver)" framing in
the constellation lane brief conflates muster with the **separate** csp-solver FastAPI repo named only in
fourier's `ADOPTION-ASKS.md` Ask 6 — a different repo, no glass-ui frontend, **out of scope for L**. The
real muster surfaces this annex maps against are: the **verdict stage** (winner hero + ranked
candidates), the **instrument aside** (signal-weight / constraint / voter tuning), and the **command
dock**.

**Anti-finding — no reconcile wave is needed.** muster's tree is 89-files-dirty (87 `M` + 2 `??`), but
ALL of it is benign: re-compressed visual-probe PNG + axe-result JSON binaries under
`docs/tranches/F/audit/*` (a lossless re-encode pass, per the K constellation-adoption fold) + 2
untracked stray audit specs (`E/audit/W7-pass4-foundation-spec.md`,
`K/audit/constellation-adoption-2026-06-02.md`). **Zero src/server/config dirt.** This is the
historically-cited ×87 churn — leave it untouched (read-only). L opens on a clean source tree; no
reconcile-first wave.

---

## § Thesis

K closed muster's measurement-honesty residuals; the modern-web frontier exhausted at J. **L is not a
new frontier — it is the coordinated adoption of glass-ui's 3.4.0 cut**, which lands one HARD blocker
fix and a window of free visual lifts behind unchanged props.

The one load-bearing fact: muster's **CommandDock mounts the EXACT GlassDock surface that glass-ui 3.3.0
broke.** `frontend/src/components/dock/CommandDock.vue:118` mounts
`<GlassDock variant="dock" position="fixed" :start-collapsed="true" :collapse-delay="2500">` with a
`#collapsed` slot (the live verdict-at-a-glance pill, `:129-196`) AND a default slot (the expanded
action strip, `:203-236`) — the simple two-layer `#collapsed`+default collapse whose **width morph
freezes on first expand** in glass-ui 3.3.0 (AV.W9 `99a1108` rebuilt the dock, fixed the
`DockLayerGroup` layer-switch, and broke the OWN summary↔full morph). The `#collapsed` pill is "the
dock's whole reason for existing" (`CommandDock.vue:7-8`) — the collapse IS the core UX, so the
regression is squarely felt.

muster is pinned `^3.1.0` (`frontend/package.json:19`) and **installed + locked at 3.1.0**
(`node_modules/@mkbabb/glass-ui/package.json` → `3.1.0`), the pre-regression build — so **muster is NOT
broken at HEAD.** The hazard is a `^3.x` float: a stray `npm update` / lockfile regen during the 3.3.0
window resolves the caret to the broken 3.3.0 and silently freezes the dock. **muster MUST skip 3.3.0
entirely; its consume path is glass-ui 3.4.0 (the AW.W1 fix).** That one bump also delivers — behind
unchanged props/tokens, zero muster source edit — the W2 lockstep-lag fix, the W3 dock-with-slider
spring vocabulary, the W4-8 painterly-Aurora repaint, the W22-26 glass-atoms unification, and the W31
spring/ease canon. **L is the single coordinated bump event, plus the narrow consumer edits it unlocks.**

## § Binding question

Can muster bump glass-ui `^3.1.0 → ^3.4.0` (NEVER `^3.3.0`) — restoring `CommandDock.vue`'s
`#collapsed`+default width morph and inheriting W2/W3 dock-motion + W4-8 painterly Aurora + W22-26
glass-atoms + W31 spring-canon behind unchanged props/tokens — and adopt the two narrow consumer-side
levers the bump unlocks (retire the hand-rolled `.verdict-hero` specular promotion onto the W22
`.glass-material` composition; reconcile the `--spring-*`/`--ease-*`/`--duration-*` token bindings
against the W31 canon, a token-name-stability check, NOT new adoption) — while REFUTING-in-the-record the
AW surfaces muster's shape does not fit (W16 progress-rail, W17 Constellation, DockBackgroundToggle,
Configurator/ToggleChip growth) — with the (107+)-spec Playwright suite + axe 24/0 + best-practices
≥ 0.95 + accessibility ≥ 0.95 + `performance ≥ 0.90` + the eager-JS gz budget + `profile:critical-path`
held throughout, and a NEW dock-collapse e2e assertion (`:start-collapsed` → first-expand width morph)
added so the regression class can never silently re-enter?

## § Goal criterion

L succeeds when:

- **The 3 repatriated families are native.** metric-cell, metric-stack (`MetricStack`+`MetricRow`),
  and instrument-chassis (`InstrumentChassis`+`ChassisDivider`) live under `frontend/src/components/`;
  zero `@mkbabb/glass-ui/{metric-cell,metric-stack,instrument-chassis}`
  import survives in `frontend/src/`; the move landed on the current `^3.1.0` pin BEFORE the bump
  (native-first, inv-16′, `_DECISION.md:66-75`). pulse is NOT repatriated — it is a generic atom
  (loading spinner), KEEP shared in glass-ui (`_DECISION.md:39`); muster keeps importing
  `@mkbabb/glass-ui/pulse` (`CommandDock.vue:148`). (muster never consumed scrolling-text.)
- **The dock is restored on the fixed path.** glass-ui pins `^3.4.0`; `CommandDock.vue`'s
  `:start-collapsed` → first-expand width morph runs to completion (not frozen). A new e2e spec asserts
  it (see §Gate sketch — the regression is invisible to `vue-tsc`+units; only e2e catches it, per the
  glass-ui binding-verification memory).
- **The forward window lands for free.** W2 lockstep-lag (the expanded-strip opacity-vs-width desync,
  `CommandDock.vue:203-236`), W3 dock-with-slider spring vocabulary (the `:keep-dock-open` bindings,
  `SignalsLayer.vue:116` / `CommandPalette.vue:490`), and the W4-8 painterly Aurora repaint of muster's
  warm-cream field all arrive on the same bump with zero muster source change — verified, not assumed.
- **The two narrow consumer levers close.** `.verdict-hero` (the hand-rolled rim/specular block) retires
  onto the W22 `.glass-material` composition; the `--spring-*`/`--ease-*`/`--duration-*` bindings are
  audited against the W31 canon and any rename carries a one-line fix.
- **The inapplicable is refuted in the record.** W16 progress-rail, W17 Constellation,
  DockBackgroundToggle, Configurator/ToggleChip growth are REFUTED-by-shape (§Refute ledger), not
  silently dropped (muster's honest-gate / refute-in-the-record discipline).
- **The full ladder holds.** Re-run at HEAD post-bump (§Gate sketch), including the re-profiled
  eager-JS gz budget (the 3.4.0 Aurora chunk delta may move the number) and the unbroken
  `profile:critical-path` (the aurora-lazy allowlist must survive the bump).

## § Completion criterion

L closes when every AND-condition of the binding question is MET at HEAD, the gate matrix prints each
verdict, and the stack close-state holds `complete` (or `complete_with_misses` with each miss named) with
no regression to the K close.

## § Wave sequence

The dev/impl boundary sits between **W1 and W2-repatriate** (formulate, then authored-now-run-later; the
implementation half opens only on explicit user authorization). The IMPL waves are **publish-gated** on a
named glass-ui cut (§Sequencing edges) — EXCEPT W2-repatriate, which lands on the current `^3.1.0` pin
(native-first, gated on nothing) and must precede the W3 bump.

| Wave | Disposition | Contents |
|---|---|---|
| **W0** | DEV — adoption re-audit | Re-verify `CommandDock.vue:118-237` is still the simple two-layer collapse at L open; confirm the pin is still `^3.1.0`/installed 3.1.0 (NOT floated to 3.3.0); confirm the 89-file dirty tree is still benign doc churn with zero src/server dirt; snapshot the eager-JS gz baseline + the `profile:critical-path` allowlist pre-bump. |
| **W1** | DEV — refute + sequencing slice | Author the §Refute ledger entries (W16/W17/DockBackgroundToggle/Configurator/ToggleChip); fix the stale I-tranche staleness ledger (`docs/tranches/I/*` still describes a "gated 3.0.0 adoption" that already happened — muster is `^3.1.0` installed); confirm the standing native-drawer ASK stays OPEN (AW does not close it). |
| **W2-repatriate** | IMPL — repatriate the 3 muster-consumed compositions native | **NO GATE** (lands on the CURRENT `^3.1.0` pin — glass-ui still ships them; the native-first half of glass-ui's repatriation per `glass-ui/docs/tranches/AW/audit/repatriation/_DECISION.md:32-37,66-75`). muster gains NATIVE copies of **metric-cell**, **metric-stack** (`MetricStack`+`MetricRow`), **instrument-chassis** (`InstrumentChassis`+`ChassisDivider`) — the 3 domain-specific instrument compositions. **`pulse` is NOT repatriated** — it is a generic atom (loading spinner), KEEP shared in glass-ui (`_DECISION.md:39`); muster keeps importing `@mkbabb/glass-ui/pulse` (`CommandDock.vue:148`). (muster never consumed `scrolling-text`.) Move the SFC + scoped CSS + CVA/types out of `@mkbabb/glass-ui/<subpath>` into `frontend/src/components/<idiomatic home near the consumers>`; de-glass-ui-ify imports (`cn()` from the root barrel or a vendored helper; `useResizeObserver` → `@vueuse/core`). **Rewrite muster's consuming sites to local relative paths:** `TravelMatrix.vue:27,88` (metric-cell); `RankedVerdict.vue:40` + `WhyThisWonSheet.vue:35` (metric-stack); App-shell `variant="spine"` + `WinnerHero` ×2 + `InstrumentAside` `ChassisDivider` ×3 (instrument-chassis). The pulse site (`CommandDock.vue:148`) is NOT rewritten — it stays a library subpath import. **Sequencing:** W2-repatriate lands FIRST on the current pin → glass-ui prunes (AW.W19) → W3-bump moves to the pruned 3.4.0; the bump resolves a glass-ui that no longer ships these 3, and every consuming import already points local, so it is a clean version-only move. This wave CORRECTS this spec's earlier KEEP framing (which under the prior model did not anticipate repatriation — see §Repatriation correction). Born-RED gate (muster's full-ladder idiom): a `proof:repatriate-local` check asserting the 3 families exist under `frontend/src/components/` AND zero `@mkbabb/glass-ui/{metric-cell,metric-stack,instrument-chassis}` import survives in `frontend/src/`. |
| **W3** | IMPL — the 3.4.0 bump + dock-fix verification | **GATE 0** (glass-ui 3.4.0 published, with the AW.W19 prune landed; W2-repatriate must precede). Bump `frontend/package.json:19` `^3.1.0 → ^3.4.0`; refresh `frontend/package-lock.json`. Add the dock-collapse e2e spec (the `:start-collapsed` → first-expand width morph against `CommandDock.vue`'s shape). Re-run the full ladder. NO other muster source change (W2/W3/W4-8 glass-ui motion/aurora land behind unchanged props). |
| **W4** | IMPL — the glass-atoms `.verdict-hero` retire | **GATE 1** (glass-ui W22 `.glass-material` published). Retire the hand-rolled `.verdict-hero` block (`styles.css:374-417`) onto the unified `.glass-material` rim/specular/catch-light composition; assert hero render parity before/after. |
| **W5** | IMPL — the W31 spring-canon reconcile | **GATE 2** (glass-ui W31 animation-canon published). Audit the `--spring-snappy`/`--spring-bouncy`/`--ease-standard`/`--ease-out-expo`/`--duration-{fast,normal,medium}` bindings (`styles.css:290-299` + ~10 SFCs) against the canon; apply any rename fix. Token-name-stability check, NOT new adoption. |

### Ordering rationale

**W2-repatriate FIRST (native-first, inv-16′)** — muster's native copies of the 3 repatriated compositions
must land BEFORE glass-ui's AW.W19 removes the source, or the W3 bump resolves a dangling subpath import.
It lands on the CURRENT `^3.1.0` pin (glass-ui still ships them), gated on nothing. W3 (the 3.4.0 bump)
SECOND — the 3.3.0 regression is the only HARD hazard, the `^3.x` float-up trap is live (a stray lockfile
regen breaks the daily-driver dock), and the bump picks up the AW.W19 prune cleanly because W2-repatriate
already rewired the 3 imports local. W4/W5 are pure visual/token consolidation that ride later glass-ui
cuts (W22 + W31 likely 3.5.0+); they cannot land until those publish and carry no urgency. The W4-8
painterly-Aurora repaint needs NO muster wave — it arrives inside the W3 bump behind the unchanged
`<Aurora :config>` surface (shader-internal upgrade); muster's tuned warm-cream field re-paints for free.

### § Repatriation correction (read with §The two consumer levers)

An earlier framing of this annex treated muster as a near-no-op adopter — ONE bump + two consolidation
edits, with metric-cell/stack/instrument-chassis assumed to STAY shared in glass-ui. **The user resolved
otherwise** (`glass-ui/docs/tranches/AW/audit/repatriation/_DECISION.md:8-29`): the test is GENERIC ATOM
vs DOMAIN-SPECIFIC COMPOSITION — a domain-specific instrument composition repatriates regardless of which
app consumes it (and "Muster does not count" as a keep-justifying consumer for a composition,
`_DECISION.md:11,24`), and instrument-chassis "is not general enough" regardless of prop neutrality
(`_DECISION.md:24-29`). So muster's genuine
consumption of metric-cell/stack/instrument-chassis (the 3 compositions) does NOT keep them shared — it
means **muster ALSO gets native copies** (W2-repatriate). muster is now a TOUCHED repo (it gains native
source), not the near-no-op the prior framing implied. **pulse is NOT repatriated** — it is a generic atom
(loading spinner), KEEP shared (`_DECISION.md:39`); muster keeps importing `@mkbabb/glass-ui/pulse`
(`CommandDock.vue:148`). The KEEP families muster retains via subpath (pulse ×1, metric-badge ×6,
status-dot ×6) are generic-atom-justified (pulse) or general-app-justified elsewhere (metric-badge,
status-dot — fourier / keyframes) and stay imports, NOT
repatriations. This correction is the operative frame for the §The two consumer levers section below — the
`.verdict-hero` retire + spring-canon reconcile are STILL in scope, now alongside W2-repatriate.

## § Modern-web / AW-surface reconciliation — the REFUTE ledger

muster's honest-gate discipline ("a gate that cannot see the truth is a false-witness") demands the
inapplicable AW surfaces be **refuted in the record**, not silently dropped. Each below is
refuted-by-shape (the substrate-without-consumer invariant applied to non-recommendations):

- **W16 DeckProgress `.glass-progress-rail`** — REFUTED. muster's `<Progress>` usages (`WinnerHero.vue`
  score bar, `RankedVerdict.vue` contribution bars, `TravelMatrix.vue`, `WhyThisWonSheet.vue`) are
  **inline value gauges**, not a page-edge solve/scroll-position rail. No deck/slide-position concept
  exists. The W16 position rail is a wrong-idiom fit.
- **W17 Constellation Canvas2D backdrop** — REFUTED. muster's ambient backdrop is the WebGL `Aurora`
  (`AuroraHost.vue:54`), a deliberate never-retired choice. A Canvas2D constellation field would
  duplicate the substrate and regress atmosphere. No graph/constellation canvas surface exists in muster.
- **DockBackgroundToggle (WCAG 2.2.2)** — REFUTED (redundant). muster's `AuroraHost.vue:36,54-83` gates
  Aurora on `prefers-reduced-motion: reduce` + `IntersectionObserver` + `requestIdleCallback` — PRM users
  never mount the WebGL chunk (static fallback wash), so the WCAG-2.2.2 pause obligation is already
  satisfied by the never-animate path. The shipped 3.3.0 `useWebGLCanvas` offscreen-pause is
  belt-and-suspenders on top. A `DockBackgroundToggle` would be a new always-available stop for the
  non-PRM "just stop it" user — defensible taste, NOT a gap; out of L scope.
- **Configurator growth (W28/W29 restyle)** — REFUTED (already idiomatic). muster fills the App spine
  with ONE `<Configurator :presets="MUSTER_PRESETS">` (`App.vue:226-312`) + `ConfiguratorLayer` in the
  aside (`SignalsLayer`/`ConstraintsLayer`/`OriginsLayer`/`VoterRoster`), DEFAULT `commit-on-write`
  cloneMode (correct for its "preset = clean reset" model). The W29 aurora-configurator restyle is a
  storybook-demo wave — muster needs it to keep working through a restyle, not to grow.
- **ToggleChip** — REFUTED (already idiomatic). The voter origin-affinity chips
  (`VoterRow.vue:21,122-131` + `OriginPrefsPopover.vue:36`, `--toggle-chip-accent` per origin) are the
  canonical independent-toggles-mutating-one-surface idiom. Needs nothing from AW.
- **3.3.0 motion surfaces (`useCountup`/`useViewTransition`/`vReveal`/`data-countup`/`data-reveal`)** —
  REFUTED (pre-empted by the landed correct adoption). Zero hits in muster src. muster's verdict reveal
  is its own `useVerdictMoment` orchestrator + the J.W5 `startViewTransition` per-row VT
  (`useReRank.ts:59`, `RankedVerdict.vue` `gl-list-item`) — already on the AQ.W5 substrate. The
  hand-rolled hero count-up spring (`WinnerHero.vue`) is the one real win the K motion slice says KEEP.
  Do NOT re-roll onto `useCountup`.

## § The two consumer-CONSOLIDATION levers (in scope, alongside W2-repatriate)

These two visual/token consolidations ride later glass-ui cuts and are net-new edits ON TOP OF the
W2-repatriate native-copy move (which is the larger net-new change this corrected spec adds — see
§Repatriation correction).

1. **`.verdict-hero` → `.glass-material` retire (W4, GATE 1).** `styles.css:374-417` hand-authors a
   44-line lensing block — backdrop blur+saturate + `--glass-specular` + `--glass-highlight` + a literal
   `inset 0 -1px 0 hsl(0 0% 0% / 0.05)` hairline (`:397`, the comment admits "no named token") + a
   `::before` radial catch-light — explicitly described (`styles.css:267-271,374-383`) as "promotes the
   `--glass-specular`/`--glass-highlight` recipe from dock-only to the winner-hero surface." This is the
   exact cross-primitive rim/specular composition AW W22 `.glass-material` centralizes; muster's hero is
   the SECOND real consumer (the dock pill being the first per its own comment), proving the ≥2-consumer
   bar. When W22 publishes, retire the block onto the utility; assert hero rim+specular renders
   identically before/after.

2. **`--spring-*`/`--ease-*`/`--duration-*` canon reconcile (W5, GATE 2).** muster authors NO raw bezier
   in motion CSS — it binds everything to glass-ui tokens: `styles.css:290-299`
   `--tier-shift-glass: var(--spring-snappy)` + `--tier-shift-rise: var(--spring-bouncy)`, and
   `var(--ease-standard)`/`var(--ease-out-expo)`/`var(--duration-{fast,normal,medium})` across ~10 SFCs
   (SlugIdentityBadge, OriginsLayer, ConstraintsLayer, VoterRow, EliminatedFold, RecentRunsMenu,
   FirstRunWalk, AuroraHost, PresetRail). These are a TOKEN-NAME contract muster already depends on —
   a `var(--token, fallback)` silently falls back to the literal default if W31 renames the token. This
   is a **token-name-stability check, not new adoption**: W31 must keep these names (or carry a migration
   note); L's job is to audit + apply any rename fix. The JS-side `useVerdictMoment.ts:181,242`
   (`dampingFraction: 0.65` / `delayMs: 80` literals) are a candidate the canon COULD centralize as a JS
   preset — assess, do not force.

## § Aurora forward-compatibility (free, in the W3 bump — no muster edit)

muster runs a real tuned Aurora across **8 files** (`AuroraHost.vue`, `useAuroraConfig.ts`,
`useAuroraEffects`, `WinnerHero.vue`, `ssr-entry.ts`, `useVerdictMoment.ts`, `FirstRunWalk.vue`,
`App.vue`). `AuroraHost.vue:54` lazy-imports `@mkbabb/glass-ui/aurora` (idle+intersection gated);
`useAuroraConfig.ts:47,89` authors a 2-nucleus OKLCh palette (peach + rose) over `DEFAULT_AURORA_CONFIG`
+ `AuroraConfig` from `/api`. Because muster authors a **PARTIAL config over the default** and the AW
painterly arc is **shader-internal behind the unchanged `<Aurora :config>` surface** (W4 adds "vangogh"
to the medium union; W5 adds `huePath`; W6 is a superset atoms door with `AuroraConfig` UNCHANGED + the
DEFAULT byte-preserved; W8 is opt-in default-off), muster is **forward-compatible with the entire AW
aurora arc** — the 3.4.0+ bump re-paints muster's warm-cream field with **zero consumer edit**.

**Opt into the richness LATER (optional, post-bump).** muster's optimizer UI can carry a *richer* ambient
Aurora than speedtest's; once the W4-8 medium/huePath atoms publish, muster may opt its config into the
painterly modes. The W5/W6 **derive-color front door** is the strongest future fit: muster already
hand-derives an OKLCh palette from a single winner hue (`useAuroraConfig.ts:42-64`, the
`winnerCategoryHue` tint drift + the `lerpHsl` per-phase lerp at `:124-180`) — it is a natural
validation consumer #2+ for `deriveScene(seed, mood)`, able to REPLACE its bespoke HSL→OKLCh block with a
single brand-hue call. NOT an ask now (planned/unimplemented upstream); recorded as a future demand
signal for glass-ui's ≥2-consumer rule. (glass-ui's derive-color MUST consume value.js's
`interpolateHue`/`gamutMapOKLab`/Ottosson path — value.js owns color in the union contract — never
re-own color math; that is glass-ui's concern, noted here only as the upstream dependency.)

## § Deferred + chronically-deferred ledger (folded)

- **The native mobile drawer ASK stays OPEN.** muster's standing glass-ui ASK (a `Drawer :native`
  opt-in / `GlassNativeDrawer`, ≥2-consumer-gated on muster + speedtest) is consumed today as vaul-vue
  `<Drawer mode="live-behind">` + `<DrawerContent :show-overlay="false">`
  (`MobileInstrumentSheet.vue:53,65`, root-barrel-resident by design per `:23`). **AW does NOT close
  it** — no native-drawer wave exists in AW's W0-W33 (the W13 affordance lifts are unrelated). L inherits
  the open ASK; do not hand-roll.
- **`dev.sh` standard adoption — BOOKED-not-done** (per `K/audit/constellation-adoption-2026-06-02.md:98-106`;
  muster CONFIG `SHAPE=fullstack`, `3030:5173`, `NEEDS_MONGO=0`, `require_wasm` prereq). Orthogonal to the
  glass-ui bump; L MAY land it but it is not gated on any AW publish — keep it out of the bump wave.

## § Browser-support policy (binding)

Unchanged from K — muster's evergreen-baseline policy carries forward. The 3.4.0 Aurora repaint runs on
the same WebGL2-capability-gated path muster already ships (`AuroraHost.vue` capability gate + CSS
fallback wash); no new baseline floor.

## § Inherited invariants

- **The honest-gate / refute-in-the-record discipline** (I.W3, restated each tranche): every
  inapplicable AW surface is REFUTED-by-shape in the record (§Refute ledger), never a false-witness
  deferral.
- **The ≥2-consumer-gated ASK idiom**: muster files glass-ui ASKs (the native drawer) rather than
  hand-rolling substrate-shaped surfaces.
- **Subpath-import discipline** (J.W4): muster imports from 27+ flat per-package subpaths; the sole
  root-barrel use is `Drawer*` (documented). The 3.4.0 bump changes no import shape.
- **On-cascade token overrides, never dead-local**: muster overrides glass depth tokens on
  `:root:not(.dark)` (`styles.css:104-117`), never re-declares `--spring-*`/`--shadow-cartoon-*` as
  orphans. The W22/W31 waves must keep `--glass-highlight`/`--glass-specular`/`--glass-under-shadow-*`
  and the spring/ease/duration token names as the override seam (the W5 reconcile audits this).
- **The close-state stack** holds `complete` from K; L must hold it without regression.

## § Cross-repo perimeter (the publish gates)

Lift J's GATE-notation. L's IMPL waves are gated on a named glass-ui publish — except W2-repatriate, which
lands on the current `^3.1.0` pin (native-first, gated on nothing) and must precede W3:

- **GATE 0 — glass-ui 3.4.0 published (AW.W1 dock fix + AW.W19 repatriation-prune).** Gates W3 (the bump +
  dock-fix verification). W2-repatriate (the native-copy move) must ALSO have landed before W3 — the 3.4.0
  cut no longer ships metric-cell/stack/instrument-chassis (AW.W19 pruned them; pulse STAYS — generic atom),
  so a W3 bump before
  W2-repatriate would resolve dangling subpath imports. This is the ONLY hard-blocker gate; until 3.4.0
  publishes muster holds `^3.1.0` (installed 3.1.0, pre-regression) and MUST NOT float to 3.3.0. muster is
  a NAMED downstream beneficiary of AW.W1 (`CommandDock.vue`'s `#collapsed`+default shape is a canonical
  fixture of the simple-collapse path the AW.W1 gate samples). The W2/W3 dock-motion + W4-8 Aurora arrive
  in this same bump.
- **GATE 1 — glass-ui W22 `.glass-material` published** (likely 3.5.0+). Gates W4 (the `.verdict-hero`
  retire).
- **GATE 2 — glass-ui W31 animation-canon published** (likely 3.5.0+). Gates W5 (the spring-token
  reconcile).

The `@source` CSS-wiring fix is **NOT a muster concern — anti-finding.** muster is the ONE constellation
repo with the binding `@source "../node_modules/@mkbabb/glass-ui/dist"` content-scan correct
(`styles.css:12`, the reference implementation per the css-wiring-conformance digest); the other 5 repos
lack it and silently drop glass-ui-only CVA utilities. muster carries no `@source` wave, no stale
two-import (single `/styles` import at `styles.css:3`, AN.W1 honored), no dead-local cartoon override.

## § Is L a coda or a full tranche?

**A coda WITH ONE structural move.** muster's modern-web frontier closed at J; K closed the measurement
residuals. L's consumer-backed levers are: the W2-repatriate native-copy move (the 3 repatriated compositions
— the one genuinely-structural change, forced by the user's repatriation policy), ONE bump (the dock-fix
hazard), TWO consolidation edits (`.verdict-hero` retire, spring-token reconcile), and a refute ledger.
There is no new product shape, no new frontier — the bump + consolidations are coordinated adoption of
glass-ui's 3.4.0+ cuts, and the repatriation is a forced source-ownership move (muster owns its bespoke
metric/chassis compositions now; pulse stays a library import). Size L to its real levers; do not manufacture aurora/blob adoption
demand (muster needs neither beyond the free repaint).

## § Gate sketch (lift the K gate set verbatim, ratcheted)

Re-run at HEAD post-bump, each verdict printed in the FINAL gate matrix:

- **The (107+)-spec Playwright suite** green except the two booked known-independent failures
  (`oracle.spec.ts`, `voter-roster.spec.ts`, formally booked as non-regressions).
- **NEW — a dock-collapse e2e spec.** Assert `CommandDock.vue`'s `:start-collapsed` → first-expand
  **width morph runs to completion** (not frozen at collapsed width). This is the regression class
  AW.W1 fixes; it is invisible to `vue-tsc --noEmit` + units (stale reka/morph bindings silently no-op —
  the glass-ui binding-verification memory), so ONLY an e2e width-delta assertion catches a re-entry.
  Sample muster's exact shape: `variant="dock" position="fixed" :start-collapsed :collapse-delay="2500"`
  + `#collapsed` + default slot, horizontal, fixed/bottom-center.
- **axe 24/0** across the 24-permutation matrix (3 viewports × 4 states × 2 modes).
- **Lighthouse best-practices ≥ 0.95 + accessibility ≥ 0.95 + `performance ≥ 0.90`** against the K honest
  measurement host.
- **eager-JS gz budget** (the 204800-byte gate) — **RE-PROFILE after the 3.4.0 bump**: the Aurora chunk
  size may move with the painterly shader delta. Re-run `profile:budget`; if the chunk grows past the
  gate, ratchet with evidence (the K honest-gate discipline — re-baseline, do not silence).
- **`profile:critical-path`** PASS — the eager-chunk allowlist must survive the bump (aurora carved lazy;
  the AuroraHost dynamic import + the `aurora-lazy critical-path-gate.mjs` allowlist the W3 bump MUST NOT
  break — verify the lazy carve still holds post-bump).
- **frontend `vue-tsc --noEmit` 0 + server `tsc --noEmit` 0 + frontend+server `vitest` green.**

## § Successor

L closes muster's glass-ui-3.4.0 adoption. The next muster tranche (M) opens on the next glass-ui cut
that carries a muster-relevant surface (the W5/W6 derive-color front door is the named future candidate —
muster validates it as derive-color consumer #2+), or on a new muster product frontier. The native-drawer
ASK and the W22/W31 GATE-1/GATE-2 edits carry forward if their glass-ui publishes have not landed by L
close.
