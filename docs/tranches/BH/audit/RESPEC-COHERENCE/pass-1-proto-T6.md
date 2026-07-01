# BH Coherence Re-Spec — PASS 1 · Prototype T6 — CORRECTED-APPROACH SPEC (C6/C7 [LOW])

**Mode:** `spec` (corrected-approach). No worktree implement spike — every fix here is a bounded plan-text edit under `docs/tranches/BH/PLAN.md` + `docs/tranches/BG/execution/bh-interleave-map.md`; PASS 1 RECORDS, the fold APPLIES. Write-fence honoured: this report is the ONLY file written.

**Issue.** C6 (stale-target one-sided references) + C7 (god-module census drift) — both LOW-severity but ACTIVELY MISDIRECTING: a resumed BH execution reading the current plan text would re-push already-landed floors, re-run no-op carves, mis-count the export surface, and over-classify subpaths at re-baseline. This spec consolidates all six correction targets the prompt names into ONE corrected-approach spec: (1) B1-W2 `^1.2.0`→landed `^1.0.0`/canonical `^1.1.1`; (2) the B1-W3 "all met" note vs the re-graded live defect; (3) WS6 "+2 siri"→"+1 `/siri-island`"; (4) B2.4a LANDED (stale-by-success); (5) the fission-bridge/property-regs/api-index.ts exempt-unrecorded orphans; (6) re-baseline the 16/8/12/3 god-module split to the 18-file disk census.

**feasibility verdict: FEASIBLE — the fix HOLDS.** Every correction is a plan-text amendment against a state I verified on disk THIS pass; none is a feasibility spike, none touches src/demo/scripts/CLAUDE.md, none reopens the band-DAG (which is structurally sound — Appendix of `pass-1-spec.md`). The verifying checks are all device-free greps + one already-RED gate whose expected post-fold behaviour is unchanged (the plan text does not gate; it directs).

---

## §0 On-disk verification (HEAD `f7dd6146`, this pass)

siblings-intact exit 0 (before + after). Every claim below was re-derived fresh at HEAD — NOT inherited from the baseline spec.

| Claim | Verification | Result |
|---|---|---|
| value.js floor on disk | `package.json:1080` deps `@mkbabb/value.js: "^1.0.0"`; `:1118` peerDeps `"^1.0.0"` | **`^1.0.0`** in BOTH — NOT `^1.2.0` (plan text is wrong) |
| value.js npm-latest / canonical CUT floor | `proof-peer-conformance.mjs:161` comment: "a `^1.2.0` peer would re-narrow below registry-latest **1.1.1**"; `PINNED_LATEST["@mkbabb/value.js"] = "1.2.0"` (`:41`) is the admits-latest snapshot, NOT the floor | registry-latest **`1.1.1`**; `^1.2.0` would RED `proof:peer-conformance` |
| B1-W3 kf floor state | `package.json:1078` peer `@mkbabb/keyframes.js: "^5.0.0"`; `useDragMorph.ts` ships `snap:` (kf 5.1.0 API) | kf consume NOT met at `^5.0.0` — the C1 live defect; the "all met" note contradicts it |
| siri-island publish-class | `bg-build-map.md:395-397` (BG.W-SIRI-ISLAND) Files: `src/subpaths/siri-island.ts` + `api/index.ts` | `/siri-island` is a **PUBLISHED subpath** AND bumps `/api` |
| siri-waveform publish-class | `bg-build-map.md:401-404` (BG.W-SIRI-WAVEFORM) Files: NO `src/subpaths/*`, NO `api/index.ts` | `siri-waveform` is **INTERNAL** (a viz siri-island composes) — NOT a published subpath |
| B2.4a carves landed | `useCarouselWorm.ts` 267L · `usePagerWorm.ts` 142L · `useBloomUp.ts` 449L all exist; `CarouselContent.vue` 375L · `PagerDots.vue` 433L | all 5 files **<500 — LANDED**; re-running the carves = no-op |
| `proof:no-god-module` at HEAD | `node scripts/proof-no-god-module.mjs` → **FAIL**, 2 violations (`ladder.css` 527, `shell.css` 510), 16 grandfathered | RED at HEAD; ladder+shell are the un-ratcheted BG-owned re-growths |
| fission-bridge/property-regs/api-index ratchet | `RATCHET_BASELINES` (`proof-no-god-module.mjs:154/147/172`): `fission-bridge.css: 552` · `property-regs.css: 566` (disk 548) · `api/index.ts: 505` — ALL grandfathered | GATE-recorded; the **PLANS** carry no exemption verdict → plan-orphan, not gate-orphan |
| disk census total | `find src -type f \( -name '*.ts' -o -name '*.vue' -o -name '*.css' \) | wc -l >500` | **18 files** (11 .ts + 2 .vue + 5 .css); 16 ratcheted + 2 violations |
| BG P5 already records the two CSS partials | `BG/audit/RESPEC/pass-1-proto-P5.md:88` (fission-bridge IRREDUCIBLE) + `:90` (property-regs IRREDUCIBLE ≤566) | BG's P5 proto DOES verdict them — but `bh-interleave-map.md §5` + `PLAN.md §4/§6` do NOT |

**One correction to the baseline spec's own numbers (record it):** the baseline `pass-1-spec.md` C7 Drift-3 says fission-bridge/property-regs are ">500 gate-IRREDUCIBLE cascade-partials with NO exemption verdict **in either plan**." Half-right: they carry a verdict in BG's `pass-1-proto-P5.md` (:88/:90) but NOT in the authoritative interleave/plan docs BH executes from (`bh-interleave-map.md §5`, `PLAN.md §4/§6`). The amend target is the EXECUTABLE plan, and it must POINT at P5's existing verdict, not re-derive one. `api/index.ts:505` is genuinely NEW (re-grew — no exemption verdict anywhere, and it will VANISH when B2.2 fold-deletes `src/api/`; that is the disposition to record).

---

## §1 The corrected approach — six amendments, both sides of the seam

Ordered by the prompt. Each names the EXACT file+line to amend on BOTH `docs/tranches/BH/PLAN.md` AND (where the interleave-map mirrors it) `docs/tranches/BG/execution/bh-interleave-map.md`, the corrected text, and the verifying check.

### A1 — B1-W2 value-destraddle: `→^1.2.0` is stale-target; canonical floor is `^1.1.1` (landed `^1.0.0`)

**The drift.** Both docs direct W2 to bump value.js `^0.13.0||^1.0.0` → **`^1.2.0`**. On disk the wave already LANDED as `^1.0.0` (deps `:1080` + peerDeps `:1118`), and the amended BG dropped `^1.2.0` as MOOT — `proof-peer-conformance.mjs:161` proves a `^1.2.0` peer "would re-narrow below registry-latest 1.1.1" → a RED gate. A verbatim re-read of the current plan text re-pushes `^1.2.0` and reds the peer gate.

- **PLAN.md:62** — `W2-value-destraddle`. Replace `^0.13.0 || ^1.0.0` → `^1.2.0` (keyframes 5.1.0 transitively deps value `^1.2.0`)` with: `LANDED — the de-straddle shipped as \`^1.0.0\` (deps \`package.json:1080\` + peerDeps \`:1118\`), which admits registry-latest \`1.1.1\` and passes \`proof:peer-conformance\` (the \`^1.2.0\` form was dropped as MOOT — it would re-narrow below registry-latest 1.1.1 and RED the gate; BG §2.C2). The single-\`^1.x\` retirement of the pre-1.0 leg is discharged.`
- **bh-interleave-map.md:28** — the W2 row. Replace the File-bounds cell `\`package.json:1058,1096\` value \`^0.13.0||^1.0.0\`→\`^1.2.0\`` with `\`package.json:1080,1118\` value \`^0.13.0||^1.0.0\`→\`^1.0.0\` (LANDED; admits registry-latest 1.1.1; \`^1.2.0\` MOOT — would RED peer-conformance)`.
- **Also fix the line-number drift** in both docs: `1058/1096` → the current `1080/1118` (the deps/peerDeps positions shifted since the 4.2.0 snapshot).

**Verifying check.** `grep -n '1\.2\.0' docs/tranches/BH/PLAN.md docs/tranches/BG/execution/bh-interleave-map.md` returns ZERO value.js `^1.2.0` bump directives (the `1.2.0` that survives is only the PINNED_LATEST admits-snapshot narrative, if referenced). `grep -n '1058\|1096' <both docs>` returns 0 (line-numbers re-baselined). Cross-check: the corrected floor `^1.0.0`/latest-`1.1.1` matches `proof-peer-conformance.mjs:161` verbatim.

### A2 — B1-W3 "all met" note contradicts the re-graded LIVE kf defect (C1's low-severity echo)

**The drift.** Both docs' W3 note says "the 3 CONSUME interims carry ZERO upstream asks — all met at the pinned 5.1.0/1.2.0." The amended BG (§2.C1) RE-GRADED the kf consume to a LIVE broken-gesture defect: `package.json:1078` peer is `^5.0.0`, but `DragOptions.snap` first ships kf 5.1.0, so a `^5.0.0` consumer's drag never snaps — the floor is NOT met. Two sides disagree on whether the kf consume is discharged; a verbatim re-read certifies "all met" while the peer floor is broken.

- **PLAN.md:63** — W3's parenthetical. Replace `(The 3 CONSUME interims carry ZERO upstream asks — all met at the pinned 5.1.0/1.2.0; border-progress already discharged.)` with: `(border-progress already discharged. The kf \`DragOptions.snap\` interim is met only at the kf **peer FLOOR** — the \`snap:\` API first ships kf 5.1.0, so \`useDragMorph\`'s snap binding is dead on any \`^5.0.0\` consumer. The peer-floor bump \`^5.0.0→^5.1.0\` is the C1 obligation, owned by B2.1-swap [T1/C1]; NOT "all met at ^5.0.0". value.js is discharged at \`^1.0.0\` (§A1).)`
- **bh-interleave-map.md:29** — the W3 row note. Replace `the 3 CONSUME interims carry ZERO upstream asks.` with `border-progress + value.js discharged; the kf \`DragOptions.snap\` consume is met only at the **kf 5.1.0 peer FLOOR** — the \`^5.0.0\` peer at \`package.json:1078\` leaves the snap binding dead (C1 — the peer-floor bump lands at B2.1-swap).`

**Verifying check.** `grep -n 'all met' docs/tranches/BH/PLAN.md docs/tranches/BG/execution/bh-interleave-map.md` → 0. Both W3 notes now cross-reference the C1 peer-floor obligation (not a contradiction). NOTE: this is the LOW-severity TEXT echo of C1 — the load-bearing C1 gate/bump amendment is T1's; A2 only removes the CONTRADICTING "all met" prose so the two sides agree post-fold (the seed's "BOTH sides must agree" rule). A2 does NOT re-specify the bump (T1 owns it) — it POINTS at T1's owner to avoid double-authoring.

### A3 — WS6 "+2 siri subpaths" → "+1 `/siri-island` (siri-waveform INTERNAL); /api rises above 203"

**The drift.** Both docs say WS6 adds "+2 siri subpaths." The amended BG froze `siri-waveform` = INTERNAL: `bg-build-map.md:401-404` (BG.W-SIRI-WAVEFORM) lists NO `src/subpaths/*` and NO `api/index.ts` in its Files, while `:395-397` (BG.W-SIRI-ISLAND) lists BOTH `src/subpaths/siri-island.ts` AND `api/index.ts`. So the real delta is **+1 published subpath (`/siri-island`)**, and `/siri-island` additively bumps `/api` ABOVE 203 (its own Files include `api/index.ts`). The "+2" over-counts the published surface by one INTERNAL leaf — which at the post-WS12 re-baseline over-classifies one dir (caught fail-closed, but costs a re-run cycle, §5-residual).

- **PLAN.md:68** — B2.1-swap. Replace `captures WS6's +2 siri subpaths + WS5's viz deletes/renames` with `captures WS6's **+1 published subpath \`/siri-island\`** (\`siri-waveform\` is INTERNAL per \`bg-build-map.md:401\` — no \`src/subpaths/\` entry; it is a viz \`/siri-island\` composes) + \`/siri-island\`'s **additive bump to \`/api\` above 203** + WS5's viz deletes/renames`.
- **PLAN.md:116** (§5-1 residual) — replace `WS6 +2 siri` with `WS6 +1 \`/siri-island\` (siri-waveform INTERNAL; /api rises above 203)`.
- **bh-interleave-map.md:40** — the B2.1-swap row note `captures WS6 +2 siri, WS5 viz deletes/renames`. Replace with `captures WS6 **+1 \`/siri-island\`** (siri-waveform INTERNAL — \`bg-build-map.md:401\`), \`/siri-island\`'s additive /api-above-203 bump, WS5 viz deletes/renames`.
- **bh-interleave-map.md:168** (§5 re-baseline) — replace `WS6's +2 siri subpaths` with `WS6's +1 published \`/siri-island\` subpath (siri-waveform INTERNAL)`.
- **bh-interleave-map.md:112** (§2.3 re-baseline procedure) — replace `classify the BG-added dirs (WS6 siri, ...)` with `classify the BG-added dirs (WS6 \`/siri-island\` PUBLISH + \`siri-waveform\` INTERNAL, WS5 viz deletes/renames)`.

**Verifying check.** `grep -n '+2 siri\|+2 published' <both docs>` → 0. Both docs now say "+1 `/siri-island`" and both name `siri-waveform` = INTERNAL with the `bg-build-map.md:401` citation. Cross-check: the /api-above-203 note is consistent with §A4/A5 (the 203-symbol re-home count is a 4.2.0 snapshot — record that /siri-island bumps it, do NOT hard-recount here since T2/T3 own the /api-fold).

### A4 — Mark B2.4a LANDED (stale-by-success — all 3 carves <500)

**The drift.** PLAN.md §4 (B2.4a row :71), §6 (`P5-god-module-carve-plans.md` ref :135), §9 (:158), and bh-interleave-map.md :36 describe the 3 BH carves (CarouselContent→useCarouselWorm, PagerDots→usePagerWorm, useBloomUp) as PENDING work. All three LANDED (verified: useCarouselWorm 267L, usePagerWorm 142L, useBloomUp 449L, CarouselContent 375L, PagerDots 433L — all <500). Re-running the carves is a no-op; the plan actively directs redundant work.

- **PLAN.md:71** — B2.4a row. Prepend a LANDED marker: `**W-bh-carves (B2.4a) [C] — LANDED (all 3 carves <500 on disk: \`useCarouselWorm.ts\` 267L, \`usePagerWorm.ts\` 142L, \`useBloomUp.ts\` 449L; \`CarouselContent.vue\` 375L, \`PagerDots.vue\` 433L). Re-run = no-op; the row survives for the interleave-graze record (§2 carousel×WS10) + the byte-identical render π obligation (T-worm/F8).**` — KEEP the graze note (the ui/carousel×WS10 collision is still a real coordination edge even though the carve landed) and KEEP the byte-identical render π gate (F8 — the worm must paint BETWEEN-states, not just typecheck-clean).
- **bh-interleave-map.md:36** — B2.4a row note. Prepend `LANDED (all <500);` before the `¹...collides w/ WS10...` note; keep the collision + optional-fold notes intact.
- **PLAN.md:81** (B2.4a is referenced in §4 B3? no — §4 B2.4a only). **PLAN.md §9:158** — the execution-start line names B2.4a among "concurrent bands run now"; append `(B2.4a carves already LANDED — verify-only)`.

**Fence (do NOT over-correct).** B2.4a is NOT deleted from the plan — the interleave graze (carousel arm × WS10 de-shadcn, bh-interleave-map §2:97) and the between-states worm render π (F8) are still live obligations. LANDED means "the carve moves are done"; the coordination + paint-verify survive.

**Verifying check.** `grep -n 'B2.4a\|bh-carves' docs/tranches/BH/PLAN.md docs/tranches/BG/execution/bh-interleave-map.md` — every B2.4a mention carries a LANDED marker OR is a live-obligation (graze/π) note; none directs a fresh carve. Disk cross-check: `wc -l` on the 5 files all <500.

### A5 — Record the exempt-unrecorded orphans (fission-bridge.css 552 · property-regs.css 548 · api/index.ts 505)

**The drift.** Three files >500 are GATE-grandfathered (`RATCHET_BASELINES`) but carry NO exemption verdict in the EXECUTABLE plan (`PLAN.md §4/§6`, `bh-interleave-map.md §5`):
- `fission-bridge.css` 552 (baseline 552) — an ordered `@layer`/`@property` goo-bridge cascade partial; a split reorders the cascade (IRREDUCIBLE, per BG `pass-1-proto-P5.md:88`). NEW since the P5 census snapshot.
- `property-regs.css` 548 (baseline **566** — grandfathered at a higher line, disk shrank) — an ordered `@property` registration cascade partial (IRREDUCIBLE, per P5:90). Re-grows from BG WS8/WS9 `@property` mints (`--glass-chromatic-strength` etc.).
- `api/index.ts` 505 (baseline 505) — a NEW re-growth, NOT in the 4.2.0 census. It is TRANSIENT: B2.2 fold-DELETES `src/api/` entirely, so this orphan self-resolves at B2.2 (the disposition to record).

The correct fix is to POINT the plan at BG's existing P5 verdict for the two CSS partials (do NOT re-derive) and record the api/index.ts transient-then-deleted disposition.

- **PLAN.md §4, B2.4a Gate line (:71)** — append after the shader-exemption clause: `The CSS cascade-partials \`fission-bridge.css\` (552) + \`property-regs.css\` (548, ratchet-baseline 566) are >500 gate-IRREDUCIBLE (ordered \`@layer\`/\`@property\` cascade partials — a split reorders the cascade; verdict recorded at \`BG/audit/RESPEC/pass-1-proto-P5.md:88/:90\`), grandfathered in \`RATCHET_BASELINES\` — NOT a BH carve target (BH carves ZERO CSS). \`api/index.ts\` (505) is a transient re-growth that self-resolves when B2.2 fold-deletes \`src/api/\`.`
- **PLAN.md §5 residual (add a new item 8)** — `8. **Exempt-unrecorded god-module orphans (now recorded).** \`fission-bridge.css\` 552 + \`property-regs.css\` 548 are >500 IRREDUCIBLE cascade-partials (P5:88/:90 verdict), ratchet-grandfathered, NOT BH carves. \`api/index.ts\` 505 is deleted by B2.2 (the /api-fold). \`ladder.css\` 527 + \`shell.css\` 510 are the 2 LIVE \`proof:no-god-module\` violations at HEAD — **BG-owned** (WS9 grain-carve + WS12-CENSUS re-CHECK); BH carves neither (§C7 split integrity).`
- **bh-interleave-map.md §5 (after :170)** — add: `**God-module exemptions (record, not a BH act):** the 5 CSS files >500 (\`liquid-morph.css\` 850, \`fission-bridge.css\` 552, \`property-regs.css\` 548, \`ladder.css\` 527, \`shell.css\` 510) are ALL BG-owned or gate-irreducible — BH carves ZERO CSS. \`ladder.css\`+\`shell.css\` are the 2 live \`proof:no-god-module\` violations (BG WS9/WS12); the other 3 are ratchet-grandfathered cascade-partials. \`api/index.ts\` 505 vanishes at B2.2.`

**Verifying check.** `grep -n 'fission-bridge\|property-regs' docs/tranches/BH/PLAN.md docs/tranches/BG/execution/bh-interleave-map.md` returns the new exemption-verdict lines citing P5:88/:90. `grep -n 'ladder.css\|shell.css' <both docs>` names them BG-owned violations, not BH carves. `node scripts/proof-no-god-module.mjs` (unchanged — the plan text does not gate) confirms the 2 violations + 16 grandfathered the plan now describes accurately.

### A6 — Re-baseline the 16/8/12/3 god-module split to the 18-file disk census

**The drift.** PLAN.md:15 ("16 god-modules >500L — 3 shader strings exempt — BG owns 8 of the 12 src carves — BH owns 3") and PLAN.md:135 ("13 non-shader god-modules") are 4.2.0 snapshots. The disk census is now **18 files >500** (verified: 11 .ts + 2 .vue + 5 .css):
- 3 shader-exempt (`.ts`): metaball.wgsl.ts 529, flow-field.glsl.ts 517, metaball.frag.ts 510.
- 5 CSS cascade-partials: liquid-morph.css 850, fission-bridge.css 552, property-regs.css 548 (ratchet 566), ladder.css 527, shell.css 510 (all BG-owned or irreducible — BH carves ZERO CSS, §A5).
- 10 remaining .ts/.vue: GlassDock.vue 711, createCanvasLifecycle.ts 695, useWebGPUCanvas.ts 606, useDockFission.ts 604, useDockContextSilhouette.ts 551, useGlassBackdropLuminance.ts 534, useBlobSatellites.ts 533, SegmentedTabs.vue 512, useGooDotMatrix.ts 508, api/index.ts 505 — **ALL BG-owned or deleted-by-B2.2** (the dock/viz/substrate god-modules are WS2/WS3/WS5/WS8 write-set; api/index.ts is B2.2's fold-delete).

**The split HOLDS (C7 verdict: SOUND) — but the JUSTIFICATION drifted.** BH's 3 owned carves (CarouselContent/PagerDots/useBloomUp) are ALREADY LANDED (§A4) and were COHESION relocations (~180L/~170L worm-extractions off `proof:colocation`), NOT god-module splits — `proof:no-god-module` cannot FORCE them (they were already <500 sources whose EXTRACTED leaves stay <500). So the "BH owns 3 [god-modules]" framing was never a 500-bound obligation; it was a colocation improvement, now done. The remaining 15 files >500 are ALL BG-owned or B2.2-deleted — BH's true god-module carve ownership at HEAD is **ZERO** (its 3 landed, and it owns none of the 15 residual by the src-write-set dodge).

- **PLAN.md:15** — replace the whole §1-#2 sentence with: `2. **God-modules >500L (18 files at HEAD, re-baselined from the 4.2.0 16-file snapshot).** 3 are single cohesive shader strings (\`.wgsl/.glsl/.frag.ts\` — exempt, not split); 5 are ordered CSS cascade-partials (\`liquid-morph/fission-bridge/property-regs/ladder/shell.css\` — BG-owned or gate-irreducible; BH carves ZERO CSS). Of the remaining 10 \`.ts/.vue\`, ALL are BG's src-write-set (dock/viz/substrate god-modules — WS2/WS3/WS5/WS8) or B2.2's fold-delete (\`api/index.ts\`). **BH's 3 owned carves (CarouselContent/PagerDots/useBloomUp) ALREADY LANDED (§4 B2.4a — all <500)** and were \`proof:colocation\` cohesion relocations, not 500-bound splits. BH's residual god-module carve ownership at HEAD = **ZERO**. The 2 LIVE \`proof:no-god-module\` violations (\`ladder.css\` 527, \`shell.css\` 510) are BG-owned (WS9/WS12); 16 files are ratchet-grandfathered.`
- **PLAN.md:135** — replace `symbol-level carve plans for the 13 non-shader god-modules` with `symbol-level carve plans for the non-shader god-modules (the P5 census; re-baseline against the 18-file HEAD disk state — BG owns the 15 residual src/CSS carves, BH's 3 are LANDED)`.
- **bh-interleave-map.md** — the interleave-map does not carry the 16/8/12/3 numbers directly (its §2 dock/viz rows already say "BH carves ZERO dock/substrate" — CORRECT), so ONLY §5's new exemption paragraph (§A5) is added; no numeric re-baseline is owed on the BG side. Record this as a negative: the split integrity was always sound on the interleave-map; only PLAN.md §1 carried the stale count.

**Verifying check.** `grep -n '16 god-module\|8 of the 12\|13 non-shader\|BH owns 3' docs/tranches/BH/PLAN.md` → the stale-numeral forms are GONE (replaced by the 18-file re-baseline). Disk cross-check: `find src -type f \( -name '*.ts' -o -name '*.vue' -o -name '*.css' \) -exec wc -l {} + | awk '$1>500 && $2!="total"' | wc -l` = 18. `node scripts/proof-no-god-module.mjs` → 2 violations + 16 grandfathered (the plan now describes exactly this). The split-integrity claim ("BH carves ZERO of the 15 residual") is verified by the src-write-set dodge (PLAN §3 hard-collision table — BH touches none of the dock/viz/substrate god-modules).

---

## §2 Cross-tranche agreement matrix (the seed's "BOTH sides must agree" rule)

After the fold, every C6/C7 target agrees on both sides of the interleave seam:

| Target | BH PLAN.md | BG bh-interleave-map.md | Agree post-fold? |
|---|---|---|---|
| value.js floor (A1) | :62 → LANDED `^1.0.0`/latest `1.1.1` | :28 → same | YES — both cite peer-conformance:161 |
| B1-W3 "all met" (A2) | :63 → points at C1 peer-floor | :29 → same | YES — both say kf met only at floor, C1-owned |
| WS6 siri count (A3) | :68/:116 → +1 `/siri-island`, waveform INTERNAL | :40/:168/:112 → same | YES — both cite bg-build-map:401 |
| B2.4a landed (A4) | :71/:158 → LANDED marker | :36 → LANDED marker | YES — graze+π obligations survive both |
| exempt orphans (A5) | §4/§5 → P5:88/:90 verdict + api transient | §5 → BG-owned CSS + api vanishes | YES — both point at P5, no re-derive |
| god-module re-baseline (A6) | §1-#2 → 18-file, BH-residual-ZERO | §2/§5 → BH carves ZERO dock/viz/CSS (already correct) | YES — PLAN re-baselines, map was always sound |

**No new one-sided reference introduced.** A2 deliberately does NOT re-specify the C1 kf-peer bump/gate (T1 owns it) — it removes the CONTRADICTING "all met" prose and POINTS at T1's owner, so the two sides agree WITHOUT double-authoring the obligation (which would create a fresh one-sided-reference if T1 and T6 specified the bump differently).

---

## §3 Why the fix HOLDS (feasibility)

1. **Every amendment is a plan-text edit against a HEAD-verified state.** No src/demo/scripts/CLAUDE.md touch; the write-fence holds; the band-DAG is untouched (acyclic, B4f unique sink — `pass-1-spec.md` Appendix). A plan-text correction cannot break a build or red a gate — it directs the executor, it does not gate.
2. **The corrected values are gate-CONSISTENT.** `^1.0.0`/latest-`1.1.1` matches `proof-peer-conformance.mjs:161` verbatim (a `^1.2.0` re-push would RED it — the fix PREVENTS a red). The +1 `/siri-island` count matches `bg-build-map.md:395/401`'s Files lists (the fail-closed re-baseline classifies exactly one PUBLISH + one INTERNAL, no over-classification cycle). The 18-file census matches `node scripts/proof-no-god-module.mjs` output exactly (16 grandfathered + 2 violations).
3. **The two CSS-partial verdicts are IMPORTED, not invented.** BG's `pass-1-proto-P5.md:88/:90` already adjudicated fission-bridge + property-regs as IRREDUCIBLE — A5 points the executable plan at that verdict, so no fresh design judgement is made (feasibility risk = 0).
4. **The api/index.ts orphan self-resolves.** It is deleted by B2.2's /api-fold — recording it as "transient-then-deleted" is a disposition note, not a carve obligation (no execution work owed).
5. **No numeric conflation.** A6 keeps the reader-census=16 axis (C3) disjoint from the god-module=18 axis and the BG-append=15 axis (C3 number-collision hazard) — the three "1x" numerals stay on distinct axes.
6. **The split integrity is EMPIRICALLY sound.** BH carves ZERO of the 15 residual god-modules by construction (the PLAN §3 src-write-set dodge — BH touches none of the dock/viz/substrate/api god-modules); the 3 it "owned" are landed cohesion relocations. No double-claimed or orphaned carve target exists (C7 verdict re-confirmed).

---

## §4 Fold instructions (for the PASS-N synthesizer)

Apply §1 A1–A6 as literal plan-text edits. All targets are LOW-severity, non-blocking, mechanically-verifiable. The single ordering constraint: A2 must land AFTER (or reference) T1's C1 amendment so the "points at T1" cross-reference resolves to a real obligation-home. A1/A3/A4/A5/A6 are order-free. After the fold, run the six §1 verifying-check greps + `node scripts/proof-no-god-module.mjs` (expect unchanged 2-violation/16-grandfathered) + `node scripts/verify-siblings-intact.mjs --quiet` (exit 0).

---

## §5 Negative findings (record so PASS 2 skips)

- **fission-bridge/property-regs ARE gate-recorded** (in `RATCHET_BASELINES`) — the orphan is a PLAN-recording gap, not a gate gap. Do NOT "add a ratchet exemption" (already there); ADD a plan verdict pointing at P5.
- **api/index.ts:505 needs no carve** — B2.2 deletes it. Only a disposition note is owed.
- **The interleave-map's dock/viz rows were ALWAYS correct** ("BH carves ZERO dock/substrate") — only PLAN.md §1's aggregate count drifted. No BG-side numeric re-baseline owed beyond §A5's exemption paragraph.
- **siri-waveform INTERNAL is a BG decision on disk** (`bg-build-map.md:401` Files list) — BH only mirrors it; no BH classification call owed until the post-WS12 re-baseline (where the fail-closed gate FORCES it).
- **The split integrity (C7) is SOUND** — no double-claimed carve; the one historical double-owner (liquid-morph.css) was adjudicated by BG §2.P1. No feasibility restart.
- **value.js line numbers drifted 1058/1096 → 1080/1118** — a trivial re-baseline folded into A1; not a separate issue.

siblings-intact exit 0 (after). Only file written: this report.
