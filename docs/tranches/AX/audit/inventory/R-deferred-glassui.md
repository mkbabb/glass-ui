# R-deferred-glassui — Deferred items: glass-ui INTERNAL (the FOLD ledger)

Lane R-deferred-glassui of the 32-lane AX step-back inventory (HEAD `c72d2ac` ==
`master`, 3.8.0 published). PLANNING ONLY — read-only audit, no code edits. This lane
sweeps the glass-ui tranche docs (AX charter + the prior A→AW deferred ledgers,
MIGRATION.md, the wave docs' `deferred`/`BOOK`/`needs-user-decision`/`carry-forward`
notes) and lists each deferred item + whether it should FOLD INTO AX (per the user's
zero-loss directive, §16.4) or stays deferred (BOOK) with rationale.

## Method + sources

The canonical deferred-fold ledgers across the lineage (each tranche after K maintains
one `research/R*-chronic-deferrals.md`; AS/AT/AW are the immediate AX predecessors):

- **AX/REQUIREMENTS.md §13** — the binding ~10-item DEFERRED list AX is mandated to fold.
- **AT/audit/W0-L4-deferred-chronic-ledger.md** — the most recent COMPLETE disposition
  ledger (47 rows, AT-WAVE/BOOK/KILL/USER-DOMAIN vocabulary). The canonical fold history.
- **AS/audit/W0-L4-deferred-ledger.md** — the AS ledger (the AT precursor).
- **AP/audit/BETA-deferral-legacy-inventory.md** — the older-chronic + alias-sweep lineage.
- **AW/RECAP.md** + **AW/audit/final-harden-fixlist.md** — the FOLD→AW dispositions that
  became the AX inputs.
- **MIGRATION.md** — the retired-surface + the AI-CARRY keyframes chronic close.
- **AX/coordination/CONSTELLATION.md** + the AX wave docs (W16/W23/W33/W43) — the AX-internal
  no-silent-deferral routes.

**Disposition vocabulary** (carried from AT-L4): **FOLD** = clears the ≥2-consumer bar
NOW, or is correctness/hygiene, or is the user-ruled headline → owned by an AX wave.
**BOOK** = named-forward with a CONCRETE graduation trigger (≥2-consumer convergence,
Baseline-Widely, or a sibling-arm landing); glass-ui holds the lever but the gate is unmet
at HEAD. **KILL** = terminal (no glass-ui lever or ratified dead). **USER-DOMAIN** =
cross-repo / submodule (inv-16; recorded not absorbed). "≥2 distinct consumer CONTEXTS" =
≥2 distinct repos/surfaces, NOT 2 call-sites in one demo (J inv 10 — convergence not census).

## §0 — Headline finding

**The AT-L4 fold cleared most of the multi-tranche backlog — and the survivors are
already routed into AX.** Verified at HEAD `c72d2ac`:

- The AT headline blob lift SHIPPED: `src/components/custom/goo-blob/` +
  `watercolor-dot/` exist (with the inv-K-3 injected `colorResolver` seam + the
  `/prng` single-source). The dark-ergonomics pair SHIPPED:
  `composables/dark/useGlobalDark.ts` carries `{initialValue}`,
  `composables/dark/darkModeSyncScript.ts` exists. The control-size vocabulary SHIPPED:
  `button/index.ts:77 'icon-sm': 'h-7 w-7 p-0'`. The `proof:vueuse-free-root` gate
  SHIPPED (`scripts/proof-vueuse-free-root.mjs` + `gates.mjs:168`).
- **Fraunces `@font-face` (AT-WAVE #7) was INVERTED, not dropped.** AT planned to SHIP the
  Fraunces face (≥2: words + value.js). AX.W22 (font register reconciliation) instead
  EXCISED Fraunces entirely (`grep Fraunces src/ = 0`) because the cross-constellation audit
  found words A.W5 self-supplies + value.js self-supplies → Fraunces is
  substrate-without-consumer in glass-ui. This is a DECISION REVERSAL backed by the
  W22 §4-note-17 "Fraunces cross-constellation contradiction" finding — recorded as a
  resolved divergence, NOT a silent drop. (presets-in-consumers memory: the brand register
  is glass-ui identity = Plus Jakarta + Fira Code; the consumers carry their own display face.)
- **The DataTable vueuse root-barrel re-export (AT-WAVE #3) is still present**
  (`src/index.ts:88 export * from "./components/ui/data-table"`) BUT the real AT debt —
  the MISSING `proof:vueuse-free-root` gate — SHIPPED. The leak is build-split-mitigated;
  the gate gap was the actual value and it closed. Whether the gate proves the root truly
  vueuse-free at HEAD is a W33-close verify (see §3 carry-row).
- The chronic BOOK set (inline-edit, dock panel-host, GlassNativeSelect, `@function`,
  `text-box-trim`, relative-color `oklch(from`, `calc-size`) is UNCHANGED at HEAD — all
  still gated, all correctly BOOK (verified absent / prose-only).

**The AX-internal deferred-CLOSE machinery is built but un-executed.** AX.W33 plans the
`proof:carry-closure.mjs` gate (the bbnf BD-G7-form: every AX deferred item closed-in-a-wave
OR `{receiver, close-gate}`-tagged) — born-RED (`scripts/proof-carry-closure.mjs` ABSENT at
HEAD). W33 is `planned`. So the FOLD-everything mandate has a TERMINAL gate authored but the
gate has not yet run; the actual close (FINAL.md) is not reached.

---

## §1 — REQUIREMENTS §13 deferred list → AX wave map (the binding fold)

The 9 §13 items AX is MANDATED to fold, each routed to its AX wave + HEAD status:

| §13 item | Routed wave | Status at HEAD | Disposition |
|---|---|---|---|
| W19 orphan-prune / speedtest repatriation (muster-blocked) | W28 (native-first receive) + W29 (prune) | `planned` | **FOLD — un-executed.** The chronic muster-block / dirty-sibling wall. Chassis-retire (D12, pass-3 CONFIRMED "remove") rides W29. |
| band-G W29 (Aurora-Configurator restyle) | W38 | `planned` | **FOLD — un-executed.** + pass-1 D1 (non-idiomatic chrome) + pass-3 "faster/springy". |
| band-G W30 (Carousel redesign) | W23 (folds AW.W30 chrome) | `live-verified` | **FOLDED.** W23 carousel-indicator landed + absorbed the never-run AW.W30 restyle. P5 (Apple-glassy) augment NOT shipped → carry. |
| band-G W32 (Lighthouse) | W39 | `planned` | **FOLD — un-executed.** |
| W33 close (gate-fleet registration, README sweep, FINAL) | W33 | `planned` (gate born-RED) | **FOLD — un-executed.** The terminal carry-closure gate is the close mechanism for THIS WHOLE LANE. |
| aurora/blob/dock README research deficit (§2/§3/§4) | W16 (blob README in-wave), W33 (band READMEs) | W16 `complete`; W33 `planned` | **PARTIAL.** W16 executed the blob README in-wave (no defer-to-next-tranche). Aurora + dock + constellation research-READMEs ride W33 — un-executed. |
| W24 `card-lift` `@utility` non-emit (TW-v4 content-scan) | W24 / W27a (var-in-arbitrary guard) | W24 `complete`; W27a `planned` | **PARTIAL.** Root-caused, not inline-patched. The var-in-arbitrary CLASS sweep is W27a. |
| Consumer adoptions (value.js/words/muster/fourier dirty-blocked; speedtest E2+R0) | W34 (idiom ledger) + W35 (prune-migration DAG) | `planned` | **FOLD — un-executed.** Cross-repo; glass-ui authors annexes, siblings execute (inv-16). |
| slides H W2-W11 (real visual-refinement; never run) | W30/W31/W32 | `planned` | **FOLD — un-executed.** Separate repo (slides @ deck/feedback-coder), leg-2 of the end-state. |
| headless-green/visually-broken GAP (gate-philosophy wave) | W00 π lane | `complete` | **FOLDED + LANDED.** The structural antidote; every visual wave closes on a live audit. The single fully-discharged §13 item. |

**§13 fold verdict.** Of the 10 §13 items: 1 fully discharged (W00 π lane), 1 folded
(W30→W23), 2 partial (READMEs, card-lift), 6 routed-but-un-executed (W28/W29, W38, W39,
W33, W34/W35, W30-W32 slides). NONE dropped — every item has a named AX receiver wave. The
fold is COMPLETE at the routing level; the EXECUTION is the open work (the autonomous DRIVE).

---

## §2 — AT-L4 ledger (47 rows) → HEAD reconciliation

The AT ledger is the canonical fold-or-watch history. HEAD-verified disposition:

### SHIPPED (AT-WAVE items that landed in AU/AV/AW/AX)

| AT# | Item | HEAD evidence | Note |
|---|---|---|---|
| 1 | goo-blob primitive + D1 OKLCh GLSL | `custom/goo-blob/` ships (subpath `/goo-blob`) | inv-K-3 injected colorResolver seam; `proof:no-value-default` |
| 2 | watercolor-dot primitive | `custom/watercolor-dot/` ships (subpath `/watercolor-dot`) | `prng.ts` single-source (AV.W14) |
| 4 | `supportsPostTask` wire-or-drop | `utils/index.ts:9` exports it | wired/retained |
| 9 | `useGlobalDark({initialValue})` | `composables/dark/useGlobalDark.ts` | speedtest dark-PRIMARY pair |
| 10 | FOUC `darkModeSyncScript()` | `composables/dark/darkModeSyncScript.ts` | pairs with #9 |
| 12 | Button `size="icon-sm"` | `button/index.ts:77` | the control-size vocabulary |

### INVERTED / DECISION-REVERSED (recorded, not dropped)

| AT# | Item | AT plan | AX reality | Rationale |
|---|---|---|---|---|
| 7 | Fraunces `@font-face` | AT-WAVE: SHIP the face (≥2 words+value.js) | **W22 EXCISED Fraunces** (`grep=0`) | Cross-constellation audit (W22 §4-note-17): words + value.js SELF-SUPPLY → substrate-without-consumer. presets-in-consumers: the brand register stays Plus Jakarta + Fira Code. |

### STILL-OPEN AT-WAVE (the correctness carry)

| AT# | Item | HEAD state | Disposition |
|---|---|---|---|
| 3 | DataTable vueuse root-barrel re-export | `src/index.ts:88` STILL re-exports `data-table`; BUT `proof:vueuse-free-root` gate SHIPPED | **PARTIAL-FOLD.** The real debt (missing gate) closed. Carry: a W33-close verify that the shipped gate actually proves the root vueuse-free with the `data-table` line present (the gate may pass because DataTable's `useElementSize` was swapped to in-house `useResizeObserver`, OR the gate scope excludes it). VERIFY at W33; if the leak is live the gate is mis-scoped. |
| 8 | Drawer `:native` / `GlassNativeDrawer` / `/native-drawer` subpath | `grep GlassNativeDrawer src/ = 0` (ABSENT) | **BOOK→still-open.** AT leaned AT-WAVE (≥2 firm: muster + speedtest mobile sheets, retires the vaul-vue re-snap bug). NOT built at HEAD. No AX wave currently owns it → **a GAP: this firm-≥2 correctness-retiring item has no AX receiver.** Should FOLD (route to a primitive wave, e.g. W20/W21 or a net-new). The vaul-vue upstream limitation (E1) stays TERMINAL-documented separately. |

### BOOK (unchanged at HEAD — correctly gated)

All verified ABSENT or prose-only at HEAD; the trigger is unmet:

- #13 `DockSelectTrigger clampLabel` (1 consumer value.js) — BOOK.
- #14 `TooltipContent variant="mono"` (1 consumer) — BOOK.
- #15 `Select size` (1 consumer; pairs with #12 if a size-vocabulary wave opens) — BOOK.
- #16 `--spring-crisp` token (0 witnessed ≥2; `grep spring-crisp = 0`) — BOOK default-not-ship.
- #19 MetricBadge icon slot (1 consumer speedtest) — BOOK.
- #22 LabeledField for/id a11y (needs speedtest's specific failing site) — BOOK.
- #25 `useRAFLoop` demandPark (1 consumer speedtest; routed asks list per INVENTORY-INDEX) — BOOK.
- #26 `/styles` critical/deferred split (font split shipped; broader cut un-named) — BOOK scope-verify.
- #27 G3 cross-document VT `navigation:auto` (consumer-owned app-shell; library half ships) — BOOK split.
- #28 G5 `@scope`+`:state()` (paid-diff-only; 5 `:deep(` sites) — BOOK.
- #29 G6 CSS `@function` (`grep = 0`; Chromium-only authoring-DRY) — BOOK.
- #30 G8 `interestfor` action-previews (Limited) — BOOK.
- #31 `text-box-trim` (`grep = 0`; 0 consumers; the Fraunces companion — now moot since Fraunces excised) — BOOK.
- #32 `interpolate-size` / `calc-size(auto)` (`grep = 0`; 0fr↔1fr hack kept) — BOOK paid-diff-only.
- #33 relative-color `oklch(from …)` (PROSE-ONLY at `tokens.css:831`, `glass.css:217` — "browsers don't gamut-map yet"; 0 live use) — BOOK paid-diff-only.
- #34 GlassDialogNative pilot (`dialog-native/` EXISTS, demo-gated, 0 barrel — clean, no leak) — BOOK Baseline-Widely.
- #35 HoverPopover `:native` opt-in — BOOK Baseline-Widely.
- #36 G7 `GlassNativeSelect` (`grep = 0` ABSENT; muster declined → no ≥2) — BOOK demo-gated-only.
- #37 inline-edit primitive (`custom/inline-edit/` ABSENT; 3 divergent shapes) — BOOK convergence-gated (depth 5; legitimate divergence not neglect).
- #38 dock panel-host variant (1 consumer bbnf-buddy; the `DockLayerGroup` vertical-overflow ergonomics gap, AP-W2 watched) — BOOK (≥2 tall-vertical consumers).
- #39 LabeledSlider numeric-readout (2 divergent) — BOOK (3rd consumer or convergence).

### KILL (terminal — exit the ledger)

#5 P5 outer-only rounding (user-ruled), #17 dock dark rung (shipped AS.W5), #18
AnimatedDigit (shipped public), #21 ContinuousTimeline marker opt-out (shipped),
#24 DockIconButton 44px coarse floor (shipped `dock.css`), #40 shadcn parity
calendar/date-picker/pagination (0 consumers — REJECT), #42 value.js VAL-9 (keyframes
owns the emitter), #43 P7 mascot (constellation DEC-3). **All confirmed terminal; do not
re-mint.** Note: the AX dock band (W45 region-model + `--dock-scale`) re-touches the coarse
floor at a higher abstraction — that is a NEW model, not a re-mint of the killed #24 row.

### USER-DOMAIN (inv-16 name-forwards — recorded not absorbed)

#41 value.js VAL-1 / `deriveAurora` ≥2 kill-gate (glass-ui producer ships; value.js wires
the 2nd live consumer at its own K.W4), #44 `docs/precepts` submodule pin re-sync (HELD —
forbidden to touch while dirty; the AX W33 ι-sweep re-syncs past `63240e6`), #45
bbnf-lang/playground dist-alias fossil, #46 value.js K.W2.5 `development`-key strip, #47
M-CI/M-DEPLOY/M-MEASURE spine. **All cross-repo; glass-ui has no lever or only its own
discharged leg.**

---

## §3 — Carry-rows: deferred items that MUST fold into AX but lack a clean receiver

The GAPS — items the sweep surfaces that need a wave assignment or a verify:

1. **AT-#8 GlassNativeDrawer (≥2 firm, correctness-retiring) has NO AX receiver wave.**
   muster (`MobileInstrumentSheet`) + speedtest mobile sheet both firm, both gated on
   glass-ui shipping it; it retires a real vaul-vue `activeSnapPoint` re-snap bug. AT leaned
   AT-WAVE but it never built. No AX wave owns it at HEAD. **Recommendation: FOLD — route to
   W20/W21 (the primitive-fix/recategorize band) or mint a thin native-drawer wave.** This is
   the single strongest orphaned-FOLD item in the lane (cleanest real ≥2 of any non-shipped item).

2. **AT-#3 DataTable vueuse-free-root verify (W33 close).** The `data-table` root re-export
   is present + the gate shipped; W33 must VERIFY the gate actually proves the root
   vueuse-free with that line, else the gate is mis-scoped (a green-over-leak). A cardinal-lesson
   candidate at the gate level.

3. **The §13 READMEs (aurora + dock + constellation research-backed).** W16 did the blob
   README in-wave; the other three ride W33 (un-executed). §2.9/§3.5/§4.4 in R-prompts flag
   "no research-backed READMEs exist." FOLD — W33 / band-close, but verify aurora+dock get a
   real research-README, not a stub (the canonical-readme-shape precept).

4. **W33 carry-closure gate is born-RED + un-built.** `scripts/proof-carry-closure.mjs`
   ABSENT. This gate is the MACHINE-CHECKABLE close for THIS WHOLE LANE — without it, the
   zero-loss §16.4 mandate has no terminal. FOLD (it is W33's headline deliverable); it must
   read W34's `{receiver-wave, close-gate}` ledger and return zero un-receivered AX deferred
   items.

---

## §4 — Older-lineage chronics (AP-BETA / AS-L4) — all cleared or BOOK

- **AP-F1 DockIconButton 44px coarse floor** → SHIPPED (AS `dock.css`; AT-#24 KILL-done).
- **AP-F2 motion-barrel keyframes SCC split** → SHIPPED (MIGRATION v2.0.0 carved `/motion`;
  the AI-CARRY-GLASS-UI-KEYFRAMES-EDGE 4-tranche chronic CLOSED — root barrel keyframes-free).
- **AP-C1 dts-build 8 GB heap prefix** → CLEARED at AO.W2 (out-of-band vue-tsc; build 769 MB RSS).
- **AP watched W1-W4** (MetricStack mid-drag, dock panel-host, inline-edit, LabeledSlider
  readout) → all carried into AT-L4 as BOOK #38/#37/#39 (above), still gated.
- **AP-E1..E4 terminal** (vaul-vue re-snap, `@source` Option-B canon, `"scoring"` phase,
  muster H items) → TERMINAL-documented; no AX work. (vaul-vue re-snap stays separate from
  the GlassNativeDrawer #8 ≥2-ship decision — the drawer wraps the limitation, doesn't fix it.)

The alias/legacy sweep is clean across the lineage (AP-§D: zero `@deprecated`, zero
back-compat alias, zero TODO/FIXME/HACK/XXX, zero commented-out code). The no-legacy precept
holds at HEAD — no live legacy survivor to fold.

---

## §5 — AX-internal no-silent-deferral routes (already disciplined)

The AX wave docs already practice the no-silent-deferral edict (recorded, not gaps):

- W16 executed the §13 W33-class blob README **in-wave** (not defer-to-next-tranche);
  the `useMetaballRenderer` god-module split is ROUTED to W26, the value.js fork
  repatriation to W34 — named successors, not silent punts.
- W23 folded the never-run AW.W30 carousel-chrome restyle (same write set).
- W43 fourier-field's MID-TRANCHE SOTA research is the ONE deferred-BY-DESIGN step —
  orchestrator-driven, launched in the drive window after W07/W14 settle; the consume /
  IA-seat / currency each route to W32 / W18 / W33 (NOT a punt). **Pass-3 directive PULLS
  this UP** — "execute the W43 SOTA research NOW, not mid-tranche" → the deferred-by-design
  becomes execute-now. FOLD the pull-up.
- The AX coordination CONSTELLATION.md §4 records the slides `constellation.ts` deletion as
  SEQUENCED (W30, `dependsOn W17`, publish-gated), not deferred.

---

## §6 — Synthesis + path forward (planning, not code)

**The deferred-internal lane is in good shape at the ROUTING level and open at EXECUTION.**
Every multi-tranche chronic is either shipped, killed, BOOKed with a live trigger, or routed
to a named AX wave. The AT-L4 fold (the 47-row ledger) cleared the bulk; the §13 list is
fully routed; the no-legacy sweep is clean; the AI-CARRY keyframes chronic and the
8 GB-heap chronic both CLOSED. There is no silent-drop class.

**The gestalt path forward (precedence-ordered):**

1. **Build the W33 carry-closure gate FIRST as the lane's terminal** — `proof:carry-closure.mjs`
   (born-RED → GREEN) is the machine-checkable proof that every AX deferred item is
   closed-in-a-wave or `{receiver, close-gate}`-tagged. Without it the zero-loss mandate has no
   falsifiable close. It reads W34's adoption ledger as input.
2. **Assign the ONE orphaned FOLD** — GlassNativeDrawer (AT-#8): give it an AX receiver
   (route to W20/W21 or mint a thin native-drawer wave). It is the strongest un-routed ≥2 item.
3. **Execute the routed-but-un-executed §13 receivers** in the DRIVE: W28/W29 (repatriation +
   chassis-retire CONFIRMED), W38 (configurator), W39 (lighthouse), W34/W35/W41 (cross-repo),
   W30-W32 (slides leg-2), W33 (close + the aurora/dock/constellation research READMEs).
4. **Verify-at-close the two PARTIAL folds** — the DataTable vueuse-free-root gate scope
   (is the root truly vueuse-free with the `data-table` line?) and the §2.9/§4.4 research
   READMEs are real (not stubs).
5. **Hold the BOOK set with its triggers intact** — do NOT over-fold the 1-consumer W-ASKS
   (#13/#14/#15/#19), the Baseline-gated pilots (#29/#30/#34/#35/#36), or the divergence-gated
   convergence-watches (#37/#38/#39). The overfitting bar (≥2 consumers OR exported OR
   demo-private) forbids shipping substrate-without-consumer. The ONLY fold path for the
   1-consumer W-ASKS is a coherent control-size vocabulary wave (#12 `icon-sm` shipped +
   #15 `Select size`), where ≥2 is the cross-control coherence + the exported-public-API escape.
6. **Keep the USER-DOMAIN name-forwards inv-16-clean** — #41 VAL-1, #44 precepts pin, #45-47
   are sibling-owned; glass-ui authors annexes (W34), siblings execute.

The lane closes when W33's carry-closure gate runs GREEN with zero un-receivered items —
the institutionalized "every item LANDS, RETIRES with rationale, or ARCHIVES; never deferred
to next tranche" (P-inv-28). That is the terminal this lane exists to enable.
