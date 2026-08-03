# MATERIAL W8 post-landing critic — integration / public contract

**Seat:** first fresh independent Sol x-high integration/public-contract critic after the W8 landing  
**Mode:** formation/audit only; no product, test, evidence, commit, or Claude-receipt edit  
**Verdict:** **SOURCE REPAIR PASS · PACKAGE EXPORT PASS · INTEGRATION DEFECT · EVIDENCE HOLD · FREEZE RED**

The W8 source cut fixes the shipped WebKit failure mode: with the latch absent or OFF, the existing
glass rung supplies honest blur instead of allowing a lying `@supports` arm to replace it with a
paint-dropped `url()` composite. The functional detector is fail-closed and the root export survives
the package build. Those results should be kept.

The wave is not acceptance-closed. The cut changed refraction from an automatic CSS enhancement into
an explicit application bootstrap, yet calls that change “zero API change,” says no migration or demo
edit is needed, and wires only the demo. The public `SegmentedTabs` pill paints a `.glass-lens`
indicator, but its `/tabs` entry contains neither the arm nor an installation side effect. Current
SCI receivers import `/tabs` and call no installer. They will therefore receive blur-only on Chromium
after a W8 repin even though the demo still refracts. The demo is a valid source witness; it is not
proof that the published consumer contract is integrated.

## 1. Exact audit pin

- Repository HEAD: `bb33810cb26debe77436c59df231814693b6fe65` (`master`).
- W8 source/evidence landing: `44621bb4af3a142dbdebb6a7ba6bbefa4dcbcbf7`.
- W8 close-stamp landing: `bb33810cb26debe77436c59df231814693b6fe65`.
- Pre-W8 parent / born-RED pin: `2ad97ca1b0621882486cabe7363c6ba364b03aa0`.
- The relevant W8 tracked slice is byte-identical to HEAD (`git diff --quiet HEAD -- <slice>` exited
  zero). The wider worktree is dirty with foreign A11Y, demo-shell, and candidate-2 formation work;
  no repository-clean claim is made.
- Git-tree digest of the committed W8 slice, formed from the ordered `git ls-tree -r 44621bb4`
  records for the demo installer, package/build topology, public/tab consumers, detector, CSS, visual
  gate, evidence, and owning wave: `0b45e51ce317423692e416ee4993e040d98d49582ba61d3450e75598c5898073`.

### Load-bearing SHA-256 pins

| artifact | SHA-256 |
| --- | --- |
| `package.json` | `39a2b340277f7fe8829fa26eb72891c5d60d2eafa00550a2e85575e131f063fb` |
| `scripts/lib/subpath-policy.mjs` | `a59e896b0e9503a6fd1728705878276b2d1a47c11f9256034e907b920f4f5f37` |
| `src/index.ts` | `ec908e10ed4c460d650ff42748e1e35db09b5d0bb938a7f42c3750fb2bfe3e73` |
| `src/components/tabs/SegmentedTabs.vue` | `aba129ba973763ee71ce49d5e6f6b378298e38952686dd1f22974b9fe419a6c3` |
| `src/composables/glass/index.ts` | `6a7fb10985394ce798888bb7bf65fc5be3320b9bf50ae7173ffa572696ac8eff` |
| `src/composables/glass/supportsBackdropRefract.ts` | `6e24147d7d4461b61c08bbd644f7a3284649b1373a5f91742d6595ca37ce4323` |
| `src/styles/glass-refract.css` | `24bd8523ce91cfd89fec33a45dfabda9c7c54d7743c030114a8c0025fb1ee720` |
| `demo/main.ts` | `6e738bbce8ac3a8136996e53d3204cf62932baf53387e830d80e77dd952d9be9` |
| `tests-visual/refract-lens-never-sharper.spec.ts` | `4e529b81bd14a05d77626d414ad2717e705500570b900730c89dcdf4f60e9851` |
| `docs/tranches/BJ/waves/BAND-MATERIAL.md` | `b711a52a85e1cff78f506a1f8317968d53132dff88f3d6b0f13ccaff562be834` |
| `IMPLEMENTATION-RECONCILIATION.md` | `a5ba81a40dfd9d894bdc96bee07dae1c34a072c4ff5d33bccac2bff6fdeb708f` |
| `IMPLEMENTATION-ASKS-C2.md` | `bd39d16d2d17b6c1622e752c3203b4d06541d1ef101cc7ecd03a4f1be73ad315` |

Evidence SHA-256: README `4551c3d9ecafb7f675106a067eaa8dc2c7f2e023cab34de393fcf02b0f2bc9e1`;
Chromium report `8cc42b59a47f9c0faada4fc1f31f7e3cb700105e28de64c38093f3cf42840139`;
WebKit report `66ff4a52be4598f60c253cd43e1fc678a54c59fe351f23ecb3a1fef368251ed1`;
discrimination JSON `c925da832aea0fcb4af89fbc4ca81479f8879ecbfc021073a2102e7a5f84b4dd`;
Chromium PNG `8076f6b563c58ae8bd22fca605d7e4e36b1ba670d46f2a3dbf9b50d33413df8e`;
WebKit PNG `74b1d011d3c678cb3492e98fb2b887172954f5e78a8e97b52654b0935bc3bf34`.

## 2. Verdict ledger

| question | verdict | exact finding |
| --- | --- | --- |
| Does W8 restore a safe WebKit floor? | **PASS** | `glass-refract.css:107-113` puts only the enhancement behind `data-glass-refract=on`; the ordinary glass rung remains outside it. The unarmed video gate measures the lens at the blur-only floor on current Playwright WebKit. |
| Is the detector fail-closed? | **PASS with proxy fence** | `supportsBackdropRefract.ts:101-110` rejects absent DOM/CSS, honest rejection, always-true shims, exceptions, missing context, and negative readback. The Canvas2D SVG-filter readback is still a proxy for backdrop composition, as the source correctly admits. |
| Does the installer survive the package build? | **PASS** | An isolated `git archive 44621bb4` build completed. `npm run build` emitted both declarations and `dist/glass-ui.js`; runtime import reported `{arm:"function",supports:"function"}`. `verify-export-types` passed: 205 targets, 483 declarations, 111 CSS files, 67 strict consumer imports. |
| Is there a public package route? | **PASS, root only** | `src/index.ts:163` re-exports the glass barrel and `package.json` exports `.`. The functions are present in `dist/glass-ui.js` and `dist/index.d.ts`. `glass` remains `INTERNAL` in `subpath-policy.mjs:102`; there is no `@mkbabb/glass-ui/glass` subpath. |
| Is explicit bootstrap a supported public integration contract? | **DEFECT** | The function is exported, but the governing wave says “zero API change,” “no MIGRATION.md row,” and “no demo edits.” No public documentation or consumer adoption makes the required call part of the supported contract. Export reach is not installation. |
| Do consumers beyond the demo receive the arm? | **DEFECT** | Only `demo/main.ts:6-13` calls it, through the source alias `@glass/composables/glass`. The built `/tabs` entry contains no latch symbol or side effect, and no audited Atlas/SCI/keyframes application source calls either function. |
| Is `sideEffects: ["*.css"]` handled honestly? | **HOLD** | It correctly prevents relying on an implicit JS module side effect, and an explicit called function will not be pruned. It also proves that no import-free automatic installation exists. The close treats that fact as a comment rationale rather than the consumer migration it creates. |
| Is “no demo edits” reconciled? | **DEFECT** | `demo/main.ts` is edited. Calling this “honored in spirit” is not a disposition. Either the no-demo/no-API clause was wrong and must be struck, or the implementation must supply a supported zero-consumer-edit install path. The former is the smaller truthful correction. |
| Does the demo prove the published contract? | **HOLD** | The demo correctly exercises source behavior and DOM-ready deferral. Its private source-alias import does not prove a package consumer can discover, import, and remember the root bootstrap; the isolated package build proves export reach separately, not adoption. |
| Does the standing visual gate bite the detector/installer? | **DEFECT** | `refract-lens-never-sharper.spec.ts:399-420` deliberately never arms. Removing the export, omitting every bootstrap, forcing the detector false, or leaving the root attr OFF preserves its GREEN result. The comment at `:403-405` claiming it catches future functional enablement is therefore false. |
| Does the gate bite a false-positive ON? | **DEFECT** | No arm forces `data-glass-refract=on` on an engine that accepts then drops the real backdrop composite. That is the failure mode capable of defeating a proxy; the current standing lock cannot see it. |
| Are installer lifecycle states covered? | **DEFECT** | There is no direct retained suite for SSR, honest rejection, always-true rejection, positive/negative/throw probe, DOM-ready calls, repeated installation, cleanup, package export, or stale pre-existing attr. `armed=true` is set before the capability result and an unsupported pre-existing `data-glass-refract=on` is not cleared. |
| Is latch-OFF dual-engine paint proved? | **PASS for current Playwright engines** | Each machine report records 2/2 passed, zero runner retry; the video gate has a planted filterless bite and measures an unarmed blur floor. This is meaningful WebKit/Chromium engine evidence. |
| Is latch discrimination proved? | **HOLD** | The JSON records Chromium true/attr ON/url computed and WebKit false/attr absent/blur computed. It supports the proxy choice, but retains no generating probe/command, browser-build identity, sampled pixels, or package-consumer path. It is a result record, not a fully reproducible instrument. |
| Is Chromium ON refraction/garnish proved? | **DEFECT** | The retained PNG shows two broadly similar frosted chips. No metric isolates displacement/specular garnish from blur, no same-phase substrate alignment is named, and the JSON proves only declaration/attr state. “Refraction active” is inferred from computed CSS, not demonstrated as an observable paint delta. |
| Is the WebKit PNG probative? | **N/A / explicitly non-probative** | It is backdrop-filter-blind and shows sharp stripes through both chips. The README admits this. It may document the instrument limitation; it cannot support blur or parity. The video gate is the relevant WebKit paint proof. |
| Is this Safari evidence? | **HOLD** | The retained run is Playwright WebKit under Playwright 1.61.1, not a pinned Safari application/browser build. It supports the WebKit mechanism and floor, but the close should say “current Playwright WebKit” unless a real Safari capture is retained. |
| Is blind-capture recovery acceptance-grade? | **HOLD** | The gate plants a strong bite and does not rerun a painted sharp verdict, but the reports omit energy distributions and capture-attempt counts. No delayed/intermittent-filter mutation proves that retrying a “sharp twin” cannot select a favorable later product paint. |
| Are comments and close prose exact? | **DEFECT** | The visual test says W8 landed at pre-W8 HEAD `2ad97ca1`; the close says the unarmed gate catches future arm enablement; the detector describes a proxy as proving backdrop paint; and §CLOSE claims zero API/migration change despite required bootstrap. |
| Are commits and model receipts compliant? | **DEFECT** | The source commit truthfully records `claude-opus-4-8`, but it ran after the prospective Sol/Luna supersession: bounded mechanical work required Luna x-high. Historical truth must remain, yet this execution cannot count as compliant. The status-stamp commit has no body recording why/evidence/routed remainder despite changing a tranche gate status. |
| Is the Claude receipt current? | **DEFECT** | `CLAUDE-SOL-IMPL-RECEIPTS.md` stops at `562db5c7`, omitting W7 and W8 source/close commits and the post-landing dirty digest; its standing Opus-outage posture is superseded prospectively. |
| Has the two-fresh-critic close law been satisfied? | **DEFECT at this seat** | PLAN requires two fresh post-landing critics before a wave counts. This document is one such critic; no completed second W8 post-landing critic was present in the audited bytes. |

## 3. Consumer and package truth

The behavior edge is concrete, not hypothetical:

1. `SegmentedTabs.vue:363-377` always adds `glass-lens` to the pill indicator.
2. The source package exposes `SegmentedTabs` on `/tabs`, while the arm is only on the root barrel.
3. An isolated build contains the arm only in `glass-ui.js`; `tabs.js` contains no
   `data-glass-refract`, `armGlassRefract`, or probe symbol.
4. Live-Q SCI imports `/tabs` in
   `dashboards/home/gallery/GalleryView.vue:20,167-194` and
   `dashboards/vft-germination/story/points/03-the-conditions/Point.vue:14,91-98`.
5. A read-only source census over SCI, Atlas, and keyframes found no `armGlassRefract` or
   `supportsBackdropRefract` call.

Thus W8 is package-correct in the narrow sense that a root consumer *can* import the installer, but
not integrated in the behavioral sense that existing consumers *do* receive it. Before W8, Chromium
entered the enhancement via CSS alone. After W8, external pill tabs silently remain on blur unless
their application bootstrap changes. That is a migration even though `.glass-lens` syntax itself is
unchanged.

`sideEffects: ["*.css"]` sharpens rather than dissolves the finding. It is correct to avoid an
unannounced module-load effect, but then an explicit installer becomes a public application contract.
The demo call is the right architectural direction; the wrong part is denying that the same contract
must reach real applications.

## 4. Evidence grade

### PASS — what is genuinely banked

- The born-RED WebKit mechanism and its safe-floor repair are coherent.
- The unarmed screencast gate has a real planted bite and passes on current Playwright WebKit and
  Chromium.
- The detector returns ON in Chromium and OFF in WebKit in the retained discrimination result.
- The exact source builds and exposes both runtime functions from the published root entry.

### HOLD — what the current corpus may claim

- “The proxy discriminated these two tested engines.”
- “Current Playwright WebKit receives blur instead of the paint-dropped composite.”
- “A published root consumer can explicitly call `armGlassRefract()`.”

### DEFECT — claims that overrun the evidence

- “Zero API change / no migration / no demo edit.”
- “All `.glass-lens` consumers receive supported enhancement automatically.”
- “The standing gate validates the functional arm or catches a future false-positive ON.”
- “The Chromium screenshot demonstrates an observable refraction/garnish delta.”
- “The WebKit screenshot proves blur.”
- “Safari is proved” when only the Playwright WebKit engine is pinned.
- “26/26 clean” as retained machine evidence: the committed reports show one 2-test run per engine,
  and do not bank the 26-run corpus, energy distributions, or capture-attempt counts.

## 5. Smallest amendments

Keep the source repair and fail-closed proxy. Do not revert to `@supports`, add an engine skin, or fork
the glass material. The smallest truthful close is:

1. **Adjudicate the contract in the owning wave.** Strike “zero API change,” “no MIGRATION.md row,”
   and “no demo edits.” Declare `armGlassRefract()` a once-per-application public bootstrap. Keep the
   demo edit as the first witness. Because the root export already builds, no new subpath is required
   unless bundle policy independently demands one.
2. **Prove and publish the package contract.** Add a public-surface/export assertion and a built-package
   fixture that imports the root function, invokes it before mount, and proves DOM-ready plus ON/OFF
   behavior. Document the call in README/MIGRATION and route the same one-line bootstrap adoption to
   every known application before its Glass repin.
3. **Close the existing receiver gap.** At minimum, SCI's application root must adopt before the two
   pill `SegmentedTabs` receivers can claim Chromium refraction. Re-run the consumer census at the
   frozen package candidate; do not infer adoption from the demo.
4. **Split the standing proof into explicit arms.** Retain the current unarmed floor; add real
   detector+installer ON in Chromium; add forced false-positive ON in WebKit/current drop-class. The
   last arm must turn the same “never sharper” detector RED. Removing the installer/export must also
   turn an integration assertion RED.
5. **Quantify garnish.** Place blur-only and latched-ON lenses over phase-matched identical substrate,
   retain the video/screenshot frames, and report a bounded displacement/rim delta alongside the blur
   floor. If no stable observable delta exists, remove the garnish claim rather than crediting a
   computed `url()` declaration.
6. **Complete lifecycle and instrument mutations.** Cover SSR, readiness, repeat calls, exceptions,
   cleanup, stale attr removal, and delayed/intermittent backdrop paint. Retain per-attempt metrics so
   blind-instrument recovery cannot hide product intermittency.
7. **Repair governance truth without rewriting history.** Correct stale HEAD/comment claims and the
   wave status; append the actual Opus receipt as a model-law violation, never relabel it Luna. Update
   the Claude ledger with both W8 commits and the dirty digest. Run bounded redress with Luna x-high,
   then a second fresh Sol x-high critic.

## 6. Freeze ruling

**HOLD / RED — candidate 2 must not freeze W8 as DONE.**

The safe-floor source landing is worth retaining and may be called **SOURCE-GREEN**. The package
export may be called **BUILD-GREEN**. The wave remains **INTEGRATION-RED / ACCEPTANCE-RED** until the
bootstrap is an explicit supported contract, real consumers adopt it, ON and false-positive-ON arms
bite, the Chromium garnish delta is observable or the claim is withdrawn, lifecycle/instrument
mutations pass, the receipt/model status is truthful, and the required second fresh critic closes on
the amended exact bytes.

Any amendment to the normative candidate after this report changes the freeze input and requires a
fresh exact-byte check; this critic does not pre-approve later bytes.
