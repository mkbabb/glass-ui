# BH Coherence Re-Spec — PASS 2 RESOLVE: verify-carve-paths

**Date:** 2026-06-30 · **HEAD:** `eaf2c172` (branch `tranche/BG`; advanced from the Pass-1 `f7dd6146`) · **siblings-intact:** exit 0 (before + after). **Mode:** spec (resolution agent). **Cluster:** the two Pass-1 loose-end confirmations (§3-gap-6 carousel-worm carve path + the crit-T1 O1 T1-artifact residual).

This resolves the two PASS-2 confirmations the agglomeration flagged (COHERENCE.md §9-6 + the crit-T1 O1 artifact residual). Both are re-verified on disk at CURRENT HEAD with real find/grep — NOT taken from Pass-1 prose. **Verdict: both loose ends CLOSE. No feasibility change, no new friction class.** Convergence contribution: the last two open items in COHERENCE.md §9 (the C6 carve-path re-verify + the crit-T1 artifact residual) are settled; C6 flips to fully RESOLVED, and the T1 artifact residual is recorded as an ACCEPTED GAP (unpersisted process trace, not lost work).

---

## (a) Carousel-worm carve path — RE-VERIFIED at HEAD, paths CORRECT

**Pass-1 flag (COHERENCE.md §7 last row + §0 table + §9-6):** "`useCarouselWorm.ts` / `CarouselContent.vue` NOT at proto-T6's cited paths — PASS-2 re-verify."

**Method:** real `find`/`grep`/`wc` over `src/` at HEAD `eaf2c172` + the authoritative `proof-no-god-module.mjs` RATCHET drain record (the carve's binding source of truth, not the plan prose).

### The paths ARE correct at HEAD — all four B2.4a carve files resolve on disk

| Carve | Source (drained) | Extracted leaf | Live `wc -l` @ HEAD | Bound |
|---|---|---|---|---|
| carousel-worm | `src/components/ui/carousel/CarouselContent.vue` | `src/components/ui/carousel/composables/useCarouselWorm.ts` | 375 · 267 | both <500 ✅ |
| pager-worm | `src/components/custom/pager-dots/PagerDots.vue` | `src/components/custom/pager-dots/composables/usePagerWorm.ts` | 433 · 142 | both <500 ✅ |
| bloom-up | `src/composables/motion/useBloomUp.ts` | `src/composables/motion/bloomUpField.ts` | 449 · 87 | both <500 ✅ |

**The authoritative carve record** is `scripts/proof-no-god-module.mjs` (the RATCHET drain comment block), which matches disk exactly:
- `:143-146` — `BH.B2.4a DRAINED CarouselContent.vue (577 → 375)` → `ui/carousel/composables/useCarouselWorm.ts` (the SFC keeps template + style + refs). Row DELETED in the same diff (monotonic drain).
- `:159-163` — `BH.B2.4a DRAINED PagerDots.vue (509 → 433)` → `pager-dots/composables/usePagerWorm.ts` + named consts into `constants.ts`. Row DELETED.
- `:168-171` — `BH.B2.4a DRAINED useBloomUp.ts (507 → 449)` → the pure field-channel leaf (`bloomUpField.ts`); the renderer stays. Row DELETED.
- `:313 / :369` — `RATCHET_BASELINES` **drained to ∅** (`Object.keys(RATCHET_BASELINES).length === 0`).

### The "NOT at proto's cited paths" claim was a TRANSCRIPTION ARTIFACT

Re-reading `pass-1-proto-T6.md` at HEAD, proto-T6 **cited these files CORRECTLY by name and count**, not at wrong paths:
- `pass-1-proto-T6.md:22` — "`useCarouselWorm.ts` 267L · `usePagerWorm.ts` 142L · `useBloomUp.ts` 449L all exist; `CarouselContent.vue` 375L · `PagerDots.vue` 433L … all 5 files <500 — LANDED."
- `pass-1-proto-T6.md:69` — "All three LANDED (verified: useCarouselWorm 267L, usePagerWorm 142L, useBloomUp 449L, CarouselContent 375L, PagerDots 433L — all <500)."

Proto-T6 cited **file names + line counts** (which all match disk), but never a directory path for `useCarouselWorm.ts`/`CarouselContent.vue`. The Pass-1 synthesis §0-table cell "`useCarouselWorm.ts`/`CarouselContent.vue` NOT at proto's cited paths" over-read a proto that had in fact confirmed them — the proto's own verifying grep succeeded. **There is no real path drift; there never was.** The corroborating research report (`pass-1-research-god-module-carve-coherence.md:83,116,125`) independently confirms the identical drain figures (`CarouselContent.vue 577→375`).

**Resolution.** COHERENCE.md §7's last row ("useCarouselWorm.ts / CarouselContent.vue — PASS-2 re-verify") flips to a CONFIRMED-LANDED row (paths correct, all <500, RATCHET drained to ∅). The §9-6 "re-verify the carousel-worm carve path" sub-item is **CLOSED**. No plan-text change to the carve targets is owed; the C6-A4 "mark B2.4a LANDED" correction (already in COHERENCE.md §2-C6) stands and needs no path amendment.

**Fence preserved (do NOT over-correct — proto-T6:75 + spec:22).** B2.4a is NOT deleted from the plan even though the carves landed. Two live obligations survive the LANDED marker:
1. The **interleave graze** — `ui/carousel` arm × BG-WS10 de-shadcn (`bh-interleave-map §2`); a real coordination edge independent of the carve.
2. The **F8 between-states worm render π** — the byte-identical render gate must exercise the worm BETWEEN states (goo-morph paint), not merely typecheck the extracted leaf (the BG §2.5 stray-prop-drop class: `centerOf/restSize/tokenPrefix/neckGap`; deferred to BG WS11/12 per COHERENCE.md §1-F8).

---

## (b) The T1 gate-spike artifact — GENUINELY ABSENT, recorded as an ACCEPTED GAP

**Pass-1 residual (crit-T1 O1 + synthesis:116):** the resolver `artifactPath` claimed `pass-1-proto-t1-kf-peer-floor-gate.md` as the C1 feasibility deliverable; that file is absent on disk.

### Confirmed genuinely absent — not embedded elsewhere

Exhaustive on-disk search at HEAD `eaf2c172`:
- `find docs/tranches/BH -iname '*proto-t1*' -o -iname '*kf-peer*' -o -iname '*peer-floor*' -o -iname '*floor-gate*'` → **ZERO hits**.
- No standalone `pass-1-proto-T1.md` (the RESPEC-COHERENCE dir carries `pass-1-proto-T2..T6.md` + `pass-1-crit-T1/T2/T5.md`; T1 has a CRITIQUE but no PROTO/spike file).
- The filename string appears in exactly **two** files, both of which are META-references that FLAG the absence, never a container of the artifact's content:
  - `pass-1-crit-T1.md:30` — "That file is absent … the resolver's process left no on-disk trace of the +137-line spike, the 7-bite run, or the apply-then-revert byte-identical proof it cites."
  - `pass-1-synthesis.md:116` — "the claimed `pass-1-proto-t1-kf-peer-floor-gate.md` is ABSENT on disk. The mechanics were re-run this pass … PASS 2 may re-persist the spike artifact if a standalone trace is wanted."

**It is NOT embedded in another pass-1 file.** The spike's process trace (the +137-line clause diff, the 7-bite self-test run, the apply-then-revert byte-identical proof) exists NOWHERE on disk as content.

### The C1 mechanics ARE verified this pass via a DIFFERENT trace (so the gap is accepted, not lost work)

The C1 feasibility verdict does NOT depend on the missing spike artifact — every load-bearing C1 anchor re-confirmed on live disk at HEAD `eaf2c172` this pass:

| C1 anchor | Live-disk evidence @ HEAD | Status |
|---|---|---|
| kf peer floor still broken `^5.0.0` | `package.json:1078` peer `"@mkbabb/keyframes.js": "^5.0.0"` (devDep :1116 `^5.1.0`) | LIVE — re-confirmed |
| the kf-5.1.0 API ships in consumer | `src/composables/motion/useDragMorph.ts:325 snap: targetsOf().map((t) => t.center)` (+ :23 the API note) | LIVE — re-confirmed |
| gate has NO kf floor-vs-API clause | `proof-peer-conformance.mjs` = value.js floor + `PINNED_LATEST` (:39-46) + `PINNED_KEYFRAMES_VALUE_DEP=^1.2.0` (:46) snapshot only; no kf-floor-≥-5.1.0-when-snap-referenced clause | absent — re-confirmed |

**Path correction (record):** `useDragMorph.ts` lives at `src/composables/motion/useDragMorph.ts` (matching COHERENCE.md §7's implicit home + the ownership tables), NOT a tabs-dir path. Pass-1 anchors sometimes wrote the bare filename `useDragMorph.ts:325` — the FULL path is `src/composables/motion/`. This is the same motion-composables home as `useBloomUp.ts`/`bloomUpField.ts` (the bloom carve, verified in (a)). No plan citation currently uses a WRONG directory for it, so this is a record-for-precision, not a correction owed.

Because the born-RED→GREEN mechanics + the alias-set census + the live defect all reproduce from this synthesis + COHERENCE.md + the live disk, **the FEASIBLE verdict for C1 is fully auditable without the spike artifact.**

### Verdict: ACCEPTED GAP

The `pass-1-proto-t1-kf-peer-floor-gate.md` artifact is an **unpersisted process trace, NOT lost work**:
- The C1 defect is LIVE and re-verified on disk (above).
- The clause OWNERSHIP is settled (MR-4: clause = BG.W-GATE-FIELD-AURORA at `bg-build-map:717-719`; bump = BH-B2.1-swap — COHERENCE.md §2-C1, do NOT soften).
- The clause is REAL, non-vacuous, born-RED on `^5.0.0`, GREEN at `^5.1.0` (COHERENCE.md §2-C1) — a distinct auditable trace from the spike.
- Re-persisting the spike file is **OPTIONAL** and NOT a develop-readiness blocker. The synthesis explicitly left it as "PASS 2 MAY re-persist … if a standalone trace is wanted" — a MAY, not a MUST. The verify pass elects NOT to re-run the spike (the C1 mechanics are already auditable via the live-disk trace + COHERENCE.md §2-C1 + the build-map clause owner), and records the absence as an accepted gap.

**No convergence penalty for the accepted gap:** the C1 RESOLUTION (the three-sided fold, COHERENCE.md §9-1) is authored independently of the spike; the missing spike file changes NOTHING about the C1 fold BH must author. crit-T1's "must be re-produced before the verdict is bankable" (O1) is DOWNGRADED to "optional re-persist" because the alternate live-disk trace this pass banks the verdict.

---

## §Cross-check: no collateral drift found this pass

While on disk, two adjacent facts re-confirmed at HEAD `eaf2c172` (guarding against the same over-read class that produced the (a) transcription artifact):
- `RATCHET_BASELINES` drained to ∅ (`proof-no-god-module.mjs:313/369`) — the BH-3 carves + all BB/BD drains held; BH's residual god-module carve ownership = ZERO (COHERENCE.md §7 verdict SOUND, unchanged).
- `useBloomUp.ts` extracted leaf is `bloomUpField.ts` (87L), not a `useBloomUp`-suffixed file — the bloom carve's leaf naming differs from the worm carves' (`useCarouselWorm`/`usePagerWorm`); recorded so a future path-verify does not over-read it as a missing leaf.

---

## §Convergence impact

| Item | Before (COHERENCE.md §9) | After this pass |
|---|---|---|
| §9-6 carousel-worm carve path re-verify | OPEN (PASS-2 re-verify) | **CLOSED** — paths correct at HEAD, RATCHET-authoritative, transcription artifact identified |
| §7 last row (useCarouselWorm/CarouselContent) | "PASS-2 re-verify" | **CONFIRMED-LANDED** (375/267, RATCHET drain :143-146) |
| crit-T1 O1 T1-artifact residual | OPEN (may re-persist) | **ACCEPTED GAP** — genuinely absent, not embedded, C1 auditable via live-disk trace |
| C6 (stale-target references) | RESOLVED-IN-DIRECTION | **fully RESOLVED** (last sub-item — carve path — closed) |

**Both loose ends close.** The remaining PASS-2 load-bearing work (C1 three-sided fold, C2 gate-arm auto-scan, C4 single-writer symmetry, C5 content-audit + hard edge) is UNAFFECTED by these two confirmations — they are the substantive resolutions, this pass clears the two verification chores that gated their bankability. No feasibility restart. No new friction class.

siblings-intact exit 0 (after).
