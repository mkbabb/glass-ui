# REFABLE RU-31 — the Q-wave challenge/confirm/adjudication ring (redo)

- **Unit**: RU-31 QWAVES — the BI-addenda Q-wave ring (Q003/Q031/Q032/Q041/Q042/Q050/P114, incl. DRAWER_SNAP), retrospectively adjudicated against the shipped 7.0.0 surface.
- **Original edict**: the addenda challenge/confirm ring — each Q-wave's confirm layer certified a shipped state (values, colocations, carves, contracts, ledger rows); verify the certification against disk at HEAD.
- **modelId**: `claude-fable-5` (verified-model: this adjudication ran on claude-fable-5; the ring's confirm/adjudication seats ran on opus under Fable declarations in the BI era — the fork-seat Q031/Q032/Q042 census work was TRUE Fable and its confirms carried more trust going in; that trust priced correctly, see below).
- **ANEW scope**: HEAD `454f6d64` (v7.0.0-66) — `src/components/{drawer,card,header-ribbon,dock,aurora,blob,dialog,easing}/`, `src/composables/motion/` (all 7 buckets), `src/composables/dom/useClipboard.ts`, `demo/composables/virtual/`, `demo/stories/display/card.vue`, `tests/` (scroll-chrome, dock vertical-collapse, header-ribbon contract, public-surface), `dist/` token scan, and git history (commit bodies `2d804ce6`, `b1e9be45`, `4e8c6387`, `596b922e`, `2a5ed71a`, `25296c67`, `0554d141`, `2d1584a5`, `1560d6e4`, `189ae15c` — history, not wave docs).
- **Step-2 boundary moment**: ANEW closed on primary sources only — src, demo, tests, dist, git. The opus-era layer (`docs/tranches/BI/addenda/{PLAN,REGISTRY,DISPOSITIONS,JUDGMENT-ROSTER,Q051-ASK,VERIFICATION}.md`, `reports/r6-confirm.md`, `wave-matrix-p063-p133.md`, `FORMATION/waves/BI.W-P114.md`) was opened only after — 2026-07-18, this session. Q041's subject (DEMETA-SCRUB) was not recoverable from git alone and was resolved only at this boundary; its disk verification ran post-read against the docs' own pins.
- **Union**: sidecar only. No src/, band, or shipped-wave edits; corrections route as PROPOSED rows below.
- **Fences honored**: sibling repos untouched, no browser; paint-only claims LIVE-DEFERRED (they already ride the BJ carry: Q003 native batch, P114 native matrix, DOCK-LADDER captures).

## ANEW — the shipped surface judged blind

1. **DRAWER_SNAP** — `drawer/constants.ts:11` ships `{response: 0.32, dampingFraction: 0.8}`, the judgment-g ratified pair (`25296c67` records the {0.50,0.74}→{0.32,0.80} rider). `useDrawerSnap.ts:222-225` co-scales the READ by `--motion-tempo` and leaves the register byte-fenced, exactly as the confirm comment states; one house `SpringProgress` owns the settle (`styles.css` header claim holds in code).
2. **Q031 virtual carve** — `src/composables/virtual/` absent; `demo/composables/virtual/` holds the three modules; the barrel exports exactly the two consumed names; `useWindowedStore` 0 refs tree-wide; dist grep carries zero virtual code.
3. **Q032 motion hardening/colocation** — 7 buckets on disk (`core/morph/number/pointer/reveal/scroll/spring`), selection pair in `morph/`; `asElement` a single engine-free copy (`core/asElement.ts`), re-exported onto `/motion` via `useElementMorph.ts:81`, absent from `/motion-core` (`core/index.ts` 0 matches); `useScrollChrome` one-formula ramp with the no-double-inversion comment, warn-once on the fragment-root dead-write, `asElement` guard; the ramp-direction regression suite exists with the DOWN 0→1 / UP 1→0 case and the re-anchor-on-flip case; `resolveTriggerPx` element-guards the v-if/v-for marker; `useStaggerReveal` PRM delay=0; GlassDock roots at the `.glass-dock` div and the single-root invariant is pinned (`GlassDock.vertical-collapse.test.ts:38-44`); `useLiquidFlex` default 1.14 with no stale 1.08 in its doc; the springPresets t90 fence prose present.
4. **Q042 carves** — `blobSimulation.ts` the single simulation owner; `useMetaballRenderer`/options off the `/blob` barrel with `BlobSettledFrame` kept from its true owner; `createAuroraGLSetup` extracted (`glSetup.ts`); `atoms-fields.ts` the cycle-free leaf, no sibling imports `./atoms`; the Aurora `isolation: isolate` block carries the honest experiment-pending comment (hypothesis chain + owed real-instrument proof + revert criteria) at HEAD.
5. **Q050 subject** — the condense is live: `CardHeader.vue:29,35-36` detents 24-down/12-up, `shrink` prop → `card-header--shrink`, `card-scroll.css` wired at `styles/index.css:193`, barrel export `card/index.ts:9`. ANEW also found `demo/stories/display/card.vue:119` mounting `<CardHeader shrink>` in a scroll host — flagged blind as a contradiction of the ledger-commit caveat (adjudicated below).
6. **P114 contract** — persistent-only shipped exactly: 38-line SFC; props `{placement?, ariaLabel?, class}` + `#items`; `role=toolbar`, `data-placement`; `mode`/`anchorLabel` zero refs in src; type pins `not.toHaveProperty("mode"|"anchorLabel")` (`header-ribbon.contract.test.ts:20-21`); 6 executed cases (4 `it` + `it.each` ×2); `docs/consumer-evidence/header-ribbon.md` present. The adjacent clipboard door also holds: `copyToClipboard` 0 refs, `writeClipboard`+`CopyResult` union shipped, EasingPicker consumes the owner, public-surface pin at `tests/public-surface.spec.ts:105`.
7. **ANEW frictions carried to the verdict table**: the two motion-canon docs carry three stale spring literals against the shipped registers; the Q050 caveat contradiction; one wave token in shipped source CSS.

## SCRUTINY — the opus layer, read assume-incorrect

The layer largely survives adversarial reading. The load-bearing certifications (Q031/Q032/Q042 slice contents in `2d804ce6`, the Q050 ledger rows, the P114 re-spec, the Q041 scope from REGISTRY B-3) all verify on disk at HEAD. The record is notably honest where it hurts: P059's native-paint claim is held unbacked rather than laundered; V-A95 stays ACTIVE RED with the Playwright clean-negative framed as a non-closure; the Q050 challenge itself caught and repaired a SHA misattribution (P059 deletion cite `2d804ce6`→`490cc46e`); the ledger's V7 truth-up retires its own earlier caveat by name. The fork-seat trust differential priced correctly — zero defects found in the Q031/Q032/Q042 certified content — while both defects found sit in the opus ring around it (the ledger caveat, the commit-body line count). `r6-confirm.md`'s disk pins were transient formation-time reads (277-line plan, 44-file motion census) and are historical, not wrong. The Q003 "no publish while RED" fence was superseded by the user's CUT-NOW publish order — a user override on the record, not a ring defect.

## Verdict table

### OPUS-WRONG (2)

| # | Claim | Correction |
|---|---|---|
| W1 | Q050 ledger commit `b1e9be45` body + first-draft row: "caveat recorded that no demo story consumes it" (the CardHeader condense) | False at write time: `demo/stories/display/card.vue:119` mounted `<CardHeader shrink>` in a scroll host at `490cc46e` (10:49), ~8h before the ledger commit (18:45). CURED IN-LEDGER — the V7 truth-up (`DISPOSITIONS.md` D1 row) retires the caveat with a paint observation (124.63→68.84px). Recorded as a confirm-at-write-time failure; no action owed. |
| W2 | P114 cut commit `4e8c6387` body: "HeaderRibbon.vue 151 → 34 lines" | The file at that very commit is 38 lines (`git show 4e8c6387:…| wc -l`). Trivial, but a certified literal wrong at its own boundary — the unchecked-literal class the DRAWER_SNAP discipline exists to kill. No action owed. |

### FABLE-NEW (3)

| # | Finding | ROUTING (PROPOSED) |
|---|---|---|
| F1 | Motion-canon dual-book with stale spring literals. `docs/design/motion-canon.md:204` DRAWER_SNAP `(0.5, 0.74)` — the pre-rider value superseded at `25296c67`; `docs/precepts/motion-canon.md:199` DRAWER_SNAP `(0.4, 0.82)` — matches no value ever shipped; precepts DOCK_SPRING `(0.32, 0.7)` — stale vs the shipped `(0.30, ζ0.82)` (`springPresets.ts:95-97`). Both files claim to be "The ONE binding principle-set". The ring reconciled source + the SU3 allowlist but never the canon docs. | BJ defect row (docs-truth): reconcile every `(response, ζ)` literal in both canon docs to `springPresets.ts` + `drawer/constants.ts`, and collapse the dual book to one binding authority (demote the other to lineage or delete — no second book). |
| F2 | Post-scrub meta re-leak. `src/components/dialog/placement.css:93` carries "name-locked jointly with BI.W-ENGAGE-AFFORD" — entered at `189ae15c` (07-17 11:14), ~4.5h AFTER the Q041 demeta zero (`2d1584a5`, 06:50). Q041's "global zero" held at its own boundary; the greenfield-no-meta law has no regression exposure (the gate ruling forbids a standing grep), so the class recurs silently. dist scans clean at HEAD. | BJ defect row: one-line comment scrub at `placement.css:93` + a close-boundary demeta re-sweep as a release-checklist line (a look at the boundary, not a standing gate — gate-ruling-conformant). |
| F3 | Q051 roster blanks unreconciled at HEAD. 7.0.0 is tagged; rows 2/3/4/9/10 self-ratified by user order and rows 1/11-16 carry into BJ (recorded at `BJ/formation/REGISTRY.md:25`, `BJ/PLAN.md:26`) — but `JUDGMENT-ROSTER.md` and `Q051-ASK.md` still present 16 live `DECISION: ____` blanks under "fill each blank and the roster closes". A future reader of the BI addenda sees an open user gate that is closed. | BJ design-debt row (docs-truth): stamp the roster/ask rows terminal — 2/3/4/9/10 RATIFIED-AT-TAG, 1/11-16 CARRIED-TO-BJ — with the BJ registry pointer. |

### RATIFIED (8)

| # | Certification | Disk truth at HEAD |
|---|---|---|
| R1 | DRAWER_SNAP `{0.32, 0.80}` ratified-live; register byte-fenced; tempo scales the read | `drawer/constants.ts:11` exact; `useDrawerSnap.ts:224-225`; one `SpringProgress` owns the settle |
| R2 | Q031 virtual→demo carve (5 claims) | all verify: src absent, demo 3 modules, 2-export barrel, `useWindowedStore` 0 refs, dist clean |
| R3 | Q032 colocation — 7 buckets, terminal assignments, no bucket barrels/forwarders | buckets + selection-pair-in-morph + `useIntersectionPause`→core all as ratified |
| R4 | Q032 hardening — asElement consolidation, scroll-chrome ramp root-fix + warn-once, trigger/PRM/detach guards, dock single-root + pin, doc truths | every mechanism verified in source + tests (see ANEW §3) |
| R5 | Q042 — blobSimulation owner, renderer de-export, GL setup extraction, atoms-fields cycle removal, V-A95 comment truth-up | all verify; the Aurora comment is experiment-pending phrased with revert criteria |
| R6 | Q050 ledger current state (spot-checked rows: D1 condense FOLD + V7 truth-up, C-5 clean-breaks, P044/P059 truth-ups, SHA-repair) | all verify; P059 native-paint honestly unbacked → rides the BJ carry |
| R7 | Q041 demeta scrub per the B-3 corrected channel (105 d.ts + 4 shader strings + drawer constants + demo comments) | landed `2d1584a5`+`1560d6e4`, ancestors of HEAD; dist zero wave tokens; zero residue at its boundary (F2 is a later re-leak, not a scrub failure) |
| R8 | Q003 record-honesty — ACTIVE RED held, Playwright clean-negative not credited as closure, no masking cover minted | PLAN measured-truth update + Aurora comment + the known-defect carry into BJ; the publish-while-RED is the user's CUT-NOW order, on the record |

## LIVE-DEFER (paint-only, already carried)

P114 left/right wide/narrow native matrix · Q003 native batch remainder (material-hierarchy, Aurora parity P046, Blob P047, InstrumentChassis P122, judgment captures b/d/f, DOCK-LADDER traces) · V-A95 in-app cure confirmation. All are booked BJ inputs; nothing new to open.

## Bottom line

The ring certified true. Every load-bearing confirm — the DRAWER_SNAP pair, the Q031/Q032/Q042 slice contents, the P114 persistent-only contract, the Q050 ledger rows, the Q041 scrub at its boundary — verifies on disk at 7.0.0 HEAD, and the record is honest about what it did not close. The two OPUS-WRONG findings are confirm-precision failures (one self-cured in-ledger, one trivial), not shipped-surface defects. The three FABLE-NEW rows are all docs-truth/no-meta hygiene the ring never owned: the stale-literal dual canon book, one post-scrub meta re-leak, and the unreconciled Q051 roster blanks.
