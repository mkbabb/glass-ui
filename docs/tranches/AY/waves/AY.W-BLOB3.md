# AY.W-BLOB3 — Blob interaction DELTA + frame-budget + consumer-#2 disposition (book demo-only + STRIP the speculative ColorResolver DI)

**Tranche** AY (glass-ui) · **Wave** W-BLOB3 · **Track** blob · **Type** interaction-capture + frame-budget verify + overfitting disposition (demo-only book + DI excision)
· **Band** A (SOTA component perfection) · **State** OPEN · **HEAD** `at-dock-convergence` (`fba6262`)
· **Depends on** W-GOD1 (the `useMetaballRenderer` <500 leaf-carve lands FIRST so this wave's DI-seam excision does not re-conflict with the carve — the H-blob F5 ordering) + W-BLOB2 (the light-cream default ships FIRST so the captured interaction DELTA shows the cream bead leaning, not a charcoal mass) + W-CARDINAL-INFRA (the AY cardinal home + `proof:live-verified-ledger --tranche=AY`, which the DELTA arm names)
· **Source risk** MEDIUM — removes a REQUIRED public prop (`colorResolver`) + the loud-throw + the inject ceremony on a PUBLISHED subpath (`@mkbabb/glass-ui/goo-blob`); a clean break (inv-4, no alias), gated by `verify-export-types` + the full `proof:blob-*` fleet staying green (the render is byte-identical — the resolver was always `defaultBlobColorResolver` at the one real consumer).

---

## Defect (file:line, source-grounded)

### D1 — the blob carries a DI-elaborate ColorResolver seam built for a consumer-#2 (value.js repatriation) that NEVER arrived; the only real consumer is the demo, which always passes the ONE default resolver (substrate-without-a-2nd-consumer; L invariant 8)

GooBlob is EXPORTED on the public subpath `@mkbabb/glass-ui/goo-blob` (`src/subpaths/goo-blob.ts`, `package.json` exports) and ships a deliberately-elaborate dependency-injection seam — the `ColorResolver` prop is **REQUIRED**, a missing resolver **throws loudly**, and the renderer re-validates it again. The seam was designed for a named consumer-#2 the AX synthesis recorded as the binding close-criterion:

> `docs/tranches/AX/research/blob-synthesis.md:79` (item 8): *"value.js DELETES its local goo-blob fork and consumes `@mkbabb/glass-ui/goo-blob`, injecting its OWN color through the ColorResolver seam (the seam was designed for exactly this)."*

That consumer never arrived. Verified at HEAD `fba6262`:

- `grep -rln 'goo-blob|metaball|GooBlob|@mkbabb/glass-ui/goo-blob' ~/Programming/value.js/src` → **NONE**. value.js has no goo-blob/metaball reference at all; there is no fork to repatriate, no `ColorResolver` injection.
- `grep -rln 'GooBlob|goo-blob' ~/Programming/speedtest/src` → **NONE**.
- `grep -rln 'GooBlob|goo-blob' ~/Programming/slides/src` → **NONE**.
- The ONLY real consumer is the demo story `demo/stories/substrates/blob.vue` (mounted at `:143` interaction hero + `:209` mood hero), and it passes **the same single resolver both times** — `:color-resolver="defaultBlobColorResolver"` (`blob.vue:20,143,210`). It NEVER injects a custom resolver. The "consumer (value.js) may inject its own" comment (`src/composables/color/index.ts:41`) describes a consumer that does not exist.

The DI ceremony built for the absent consumer, with exact sites:

1. **`src/components/custom/goo-blob/GooBlob.vue:34,42`** — `colorResolver: ColorResolver` is a REQUIRED prop (no `?`). Every consumer must pass it; the only consumer passes the default.
2. **`src/components/custom/goo-blob/GooBlob.vue:120`** — the SFC threads `colorResolver` into `useMetaballRenderer({ … colorResolver })`.
3. **`src/components/custom/goo-blob/composables/useMetaballRenderer.ts:99-109`** — `colorResolver: ColorResolver` is a REQUIRED option in `UseMetaballRendererOptions`, with a 10-line jsdoc narrating the absent value.js consumer.
4. **`src/components/custom/goo-blob/composables/useMetaballRenderer.ts:140-146`** — the loud `throw new Error("[GooBlob] a \`colorResolver\` is required…")` — a guard for a missing injection that the one real consumer never triggers.
5. **`src/components/custom/goo-blob/composables/useMetaballRenderer.ts:176-184`** — `resolveColor` calls `colorResolver(css)` through the indirection rather than the `/color` leaf directly.

This is the exact substrate-without-a-second-consumer L invariant 8 freezes: an exported, DI-elaborate primitive carried across the AX→AY boundary on one demo consumer that uses the default path. The overfitting-audit verdict (`docs/audits/overfitting-audit.md`) for a published-subpath artefact with 0 external consumers + 1 demo consumer-of-the-default is `keep-current` ONLY with a `docs/consumer-evidence/<artefact>.md` and a named ≥2-consumer roadmap — there is no such evidence doc, and the named roadmap entry (value.js) is empirically dead.

### D2 — the wired interaction (hover-flick lean + click-impulse bounce) has a structurally-correct BAND but NO captured DELTA artefact on the AY cardinal home (the cardinal-lesson gap)

The interaction is well-built and machine-banded: `tests-visual/blob-render.spec.ts:572` (the hover-flick test) reads the resting centroid (median over 4 frames), fires `hoverFlick(page, blobCanvas, 0.82, 0.5)`, re-reads the leaned centroid, and asserts the shift is INSIDE a paired floor∧ceiling BAND (`CENTROID_SHIFT_MIN` ≤ shift ≤ `CENTROID_SHIFT_MAX` — the AX.W46 D5 floor→band: a floor so the lean is LEGIBLE, a ceiling so it does not LUNGE). The click-impulse bounce is the `click(amp)` fire (`useBlobPointer.ts:186` — kicks `pulseVel` on the underdamped harmonic oscillator, the symplectic-Euler integrator at `:134-138`), with the resulting `pulse` exposed as a readonly ref (`:246`) and fired on `onBlobClick`.

But there is **no captured own-surface DELTA** of this interaction on the AY cardinal home. `proof:live-verified-ledger --tranche=AY` (the cardinal gate, minted by W-CARDINAL-INFRA) requires a fresh on-disk PNG DELTA referencing the wave's own surface (`^W-BLOB3-*.png`) at ≥2 viewport × {light,dark} + ≥5 hover frames for a motion surface; the W-BLOB3 row cannot mint `live-verified` from prose. The interaction band PASSES headless today, but a `live-verified` flip without a captured DELTA is the precise inflation `proof:live-verified-ledger` exists to block (the #1 chronic: 7 AX waves minted `live-verified` with 0 PNG).

### D3 — the frame-budget lever (the RAF-park seam) is verified by `proof:offscreen-pause`, but that gate is not named on the W-BLOB3 row, and the interaction-loop frame-cost has no captured runtime number

The single biggest blob frame-budget lever — parking the rAF when the host is offscreen / content-hidden / tab-backgrounded, and freezing it under live `prefers-reduced-motion` — lives in the shared `createCanvasLifecycle` substrate that `useMetaballRenderer.ts` composes, and is machine-asserted by `proof:offscreen-pause` (`scripts/proof-offscreen-pause.mjs:50` reads `useMetaballRenderer.ts` as a substrate consumer). The seam is correct; the W-BLOB3 row's "frame-budget" clause does not NAME the gate, so it has no enforceable artefact. There is also no captured frame-cost number for the interaction hero (the DELTA must record the measured per-frame budget, not assert "performant").

---

## Goal criterion

The blob's consumer-#2 question is settled HONESTLY: value.js never repatriated, speedtest and slides do not consume the blob, and the AX-named consumer-#2 roadmap entry is empirically dead — so the blob is **formally booked demo-only** (a showcase primitive retained with rationale + a real ≥2-consumer trigger), and the speculative ColorResolver DI ceremony built for the absent consumer is **STRIPPED** down to the one resolver path the demo actually needs (the renderer resolves color internally through the existing `/color` leaf — `cssToOklch → oklchToGammaRgb` — the exact body `defaultBlobColorResolver` always was). The wired interaction (hover-flick lean + click bounce) is **captured as a fresh on-disk DELTA** on the AY cardinal home with the paired-π centroid-shift number and the frame-budget reading, so `live-verified` is earned, not asserted. A fresh reader sees a leaner public surface (no required-and-always-default prop, no throw for a missing injection) and a falsifiable interaction artefact.

## Completion criterion

ALL FOUR hold (the HARD GATE set below); G1 + G2 are the binding consumer-#2 disposition, G3 the captured interaction DELTA, G4 the frame-budget verify:

- **(G1)** the speculative ColorResolver DI is STRIPPED — the `colorResolver` REQUIRED prop, the loud throw, and the `UseMetaballRendererOptions.colorResolver` option are GONE; the renderer resolves color through the `/color` leaf directly; the full `proof:blob-*` fleet stays GREEN (the render is byte-identical — `proof:blob-color-equivalence` confirms the resolved triple is unchanged) and `verify-export-types` is green over the trimmed `/goo-blob` subpath surface (a deletion-proof + a published-surface dts probe);
- **(G2)** the demo-only disposition is RECORDED — `docs/consumer-evidence/goo-blob.md` books the blob demo-only with the file:line consumer-grep evidence (0 external, 1 demo) + a named ≥2-consumer trigger, and the W-CLOSE1 AY overfitting audit cites it; the orphan-scan (`proof:overfitting-ay` / the W-SB1 component-orphan check) accepts the blob on the evidence doc, NOT a false `keep`;
- **(G3)** the captured interaction DELTA is machine-enforced — `proof:live-verified-ledger --tranche=AY` GREEN over the W-BLOB3 row, whose `docs/tranches/AY/audit/visual/W-BLOB3-DELTA.md` references own-surface PNGs (`^W-BLOB3-*.png`) of `/substrates/goo-blob` + `/substrates/blob-mood` at ≥2 viewports × {light,dark} + ≥5 hover-flick frames, with the paired centroid-shift number BEFORE-rest → AFTER-lean INSIDE the `CENTROID_SHIFT_MIN..MAX` band AND the resting body inside the W-BLOB2 cream `domeLumaStd` / `bodyMeanL` band;
- **(G4)** the frame-budget is verified — `npm run proof:offscreen-pause` exits 0 over the (post-strip) `useMetaballRenderer.ts` substrate-consumer seam (the rAF parks offscreen / hidden / under live PRM), and the W-BLOB3-DELTA records the measured interaction-hero per-frame budget (the runtime number, not a prose "performant").

See HARD GATE.

---

## Consumer-#2 disposition — the BIND-or-BOOK decision (settled)

The seed offers two paths: BIND a real consumer #2 (value.js / speedtest / slides) OR formally book demo-only + STRIP the DI. The decision is **BOOK demo-only + STRIP**, and the rationale is empirical, not preferential:

1. **value.js (the AX-named repatriation) is dead.** `grep` over `~/Programming/value.js/src` for goo-blob/metaball/GooBlob is empty. There is no local fork to repatriate; the "value.js injects its own resolver" premise (`color/index.ts:41`, `useMetaballRenderer.ts:99-108` jsdoc) describes a consumer that was never built. Forcing the bind would mean AUTHORING a value.js goo-blob consumer purely to justify the seam — manufacturing a consumer to keep substrate, the overfitting tail wagging the dog.
2. **speedtest + slides do not want a metaball.** Neither tree references GooBlob; both have their own visual identities (speedtest the meter/aurora, slides the constellation/fourier-field/aurora). A speculative slides "blob slide" would be a second manufactured consumer.
3. **The DI seam's only exercised path is the default.** The one real consumer (the demo) passes `defaultBlobColorResolver` at BOTH mount sites and never a custom resolver. The injection point has never been used for injection. The greenfield-correct move (gestalt, root-not-consumer, no-workaround) is to collapse the unused indirection: the renderer resolves its base color through the `/color` leaf directly — the resolver's literal body `oklchToGammaRgb(cssToOklch(css))` — and the demo loses a prop it only ever passed the default to.

The blob is **booked demo-only** (a showcase primitive, retained with rationale per the overfitting-audit `keep-current` path) with a `docs/consumer-evidence/goo-blob.md` recording the evidence + a named ≥2-consumer trigger: *if a future tranche lands a SECOND real consumer (a value.js repatriation that actually ships, a speedtest hero, a slides slide), the custom-resolver injection is the FIRST thing it needs — re-introduce the optional `colorResolver?` seam at THAT point (it is a one-line additive optional prop + a `?? defaultResolveColor` fallback), not before.* This is the "ship the seam when the second consumer arrives, not in anticipation" discipline — the inverse of the speculative-DI overfit.

---

## Edit-sites (exact)

### Arm 1 — STRIP the speculative ColorResolver DI (D1)

The strip collapses the indirection to the ONE path the demo uses; it does NOT change the resolved color value (the resolver was always `defaultBlobColorResolver`, body `oklchToGammaRgb(cssToOklch(css))`). `proof:blob-color-equivalence` is the byte-identity witness.

1. **`src/components/custom/goo-blob/composables/useMetaballRenderer.ts:99-109`** — REMOVE the `colorResolver: ColorResolver` option from `UseMetaballRendererOptions` (delete the field + its 10-line jsdoc narrating the absent value.js consumer). Remove the `import type { ColorResolver }` (`:8`) if it is no longer referenced in the file.
2. **`src/components/custom/goo-blob/composables/useMetaballRenderer.ts:128-138`** — drop `colorResolver` from the destructure.
3. **`src/components/custom/goo-blob/composables/useMetaballRenderer.ts:140-146`** — DELETE the `if (typeof colorResolver !== "function") throw …` guard (the loud-throw for a missing injection that the one real consumer never triggers).
4. **`src/components/custom/goo-blob/composables/useMetaballRenderer.ts:176-184`** — re-point `resolveColor(css)` to call the `/color` leaf directly: `import { cssToOklch, oklchToGammaRgb } from "../../../../composables/color"` and `const rgb = oklchToGammaRgb(cssToOklch(css))` (the EXACT body of the deleted `defaultBlobColorResolver` — `src/composables/color/index.ts:136-137`). The memo cache (`colorCache`, the 256-cap) STAYS — it is the per-frame resolve memo, not the DI ceremony. No parallel color math is introduced (inv J-10): the renderer consumes the SAME `/color` leaf the resolver delegated to.
5. **`src/components/custom/goo-blob/GooBlob.vue:32-59`** — REMOVE the `colorResolver: ColorResolver` REQUIRED prop from `defineProps` + its `import type { ColorResolver }` (`:3`) if unreferenced; update the SFC header jsdoc (`:21-30`) — the "Color is resolved through an INJECTED `colorResolver` seam (DEC-AT-2)… The prop is REQUIRED… A missing resolver throws" paragraph is now FICTION; rewrite it to state the blob resolves its color internally through the `/color` leaf.
6. **`src/components/custom/goo-blob/GooBlob.vue:110-120`** — drop `colorResolver` from the `useMetaballRenderer({…})` call.
7. **`demo/stories/substrates/blob.vue:20`** — REMOVE `defaultBlobColorResolver` from the `/color` import (it has no other use in the file after the next edit); **`blob.vue:143` + `blob.vue:210`** — REMOVE the `:color-resolver="defaultBlobColorResolver"` binding from both GooBlob mounts.
8. **`src/components/custom/goo-blob/README.md`** — strike any usage line that passes `:color-resolver` / narrates the "REQUIRED injected resolver" / "throws on a missing resolver" so the README matches the stripped surface (the greenfield-no-meta + no-doc↔code-lie discipline).
9. **`src/composables/color/index.ts:130-137`** — DISPOSITION of `defaultBlobColorResolver` + the `ColorResolver` type: `defaultBlobColorResolver` is now consumed by NOBODY (the renderer inlines its body). It is exported on the `/color` subpath. RETIRE it (delete the export + the const) UNLESS a fresh grep finds a real consumer (`grep -rn 'defaultBlobColorResolver|ColorResolver' src demo ~/Programming/value.js/src ~/Programming/speedtest/src ~/Programming/slides/src` — expected: only the now-removed sites + the type's own jsdoc). The `ColorResolver` TYPE is retired in lockstep IF it has no other consumer after the strip (it was the seam's type; `cssToOklch`/`oklchToGammaRgb` keep their own signatures). This is the clean break — no legacy alias, no dead export left on the published `/color` surface (the `evalFourier`-class library-orphan H-overfitting Finding 2 forbids). If `ColorResolver` IS referenced elsewhere as a general type (re-check `api/index.ts`), it stays as a general-purpose type with its jsdoc corrected to drop the dead "value.js may inject its own" claim.
10. **`src/api/index.ts`** — VERIFIED AT HEAD `fba6262`: `grep -n ColorResolver src/api/index.ts` → **0** (ColorResolver is NOT on the `/api` discovery layer today), so this edit-site is a NO-OP at the current HEAD — no api removal needed. The clause stays as a defensive re-check: if a between-now-and-execution wave adds a `ColorResolver` api seat, remove it in lockstep with edit 9; otherwise nothing to do here.

### Arm 2 — record the demo-only disposition (D1; G2)

11. **`docs/consumer-evidence/goo-blob.md`** (NEW) — the consumer-evidence doc the overfitting-audit `keep-current` verdict requires. It records: (a) the consumer grep with exact invocations and results (0 external in value.js/speedtest/slides, 1 demo `blob.vue` at `:143,209`); (b) the demo-only book with rationale (the AX-named value.js consumer empirically dead); (c) the named ≥2-consumer TRIGGER (re-introduce the optional `colorResolver?` seam when a second real consumer ships — never before); (d) the DI-strip cross-reference (this wave). The doc's cited proof grep is re-runnable (the audit re-runs it at close).
12. **`docs/tranches/AY/PROGRESS.md`** — the W-BLOB3 row carries the demo-only disposition + (on the DELTA landing) the `live-verified` status (the cardinal gate enforces the DELTA; the row cannot mint `live-verified` from prose).
13. **W-CLOSE1 cross-reference** — the W-CLOSE1 overfitting audit (`AY.md:188`, "the orphan-scan") CITES `docs/consumer-evidence/goo-blob.md` as the blob's disposition; the `proof:overfitting-ay` orphan-scan (W-CLOSE1) + the W-SB1 component-orphan check accept the blob on the evidence doc. (This wave AUTHORS the evidence doc; W-CLOSE1 CONSUMES it — no source risk to W-CLOSE1 from here.)

### Arm 3 — capture the interaction DELTA (D2; G3)

14. **`docs/tranches/AY/audit/visual/W-BLOB3-DELTA.md`** (NEW) — the captured DELTA, conforming to the AY `CAPTURE-PROTOCOL.md` (minted by W-CARDINAL-INFRA; the depth floor ≥2 viewport × {light,dark}). It references own-surface PNGs (filenames `W-BLOB3-*.png` so the deepened ledger filename-match binds — H-cardinal §3):
    - `/substrates/goo-blob` (the interaction hero) — light + dark, ≥2 viewports (375 mobile + 1280 desktop): the RESTING cream bead (the W-BLOB2 default) + ≥5 hover-flick frames showing the centroid LEAN toward a rightward pointer (the `hoverFlick(…, 0.82, 0.5)` gesture the spec drives) + a click-impulse bounce frame.
    - `/substrates/blob-mood` (the mood/palette surface — the `PI_TARGETS` blob-mood obligation) — light + dark, the resting cream default.
    - The DELTA records the paired-π numbers, making the interaction claim falsifiable: the measured `restCx` → `leanCx` centroid SHIFT INSIDE `[CENTROID_SHIFT_MIN, CENTROID_SHIFT_MAX]` (NOT prose "it leans"), and the resting body mean OKLCh L INSIDE the W-BLOB2 cream band (the interaction is over the cream bead, not the old charcoal mass).
15. **`docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json`** — add `"W-BLOB3"` (the wave's interaction is the pixels under audit; the ledger evaluates its row).

### Arm 4 — name the frame-budget gate (D3; G4)

16. **No source edit** — `proof:offscreen-pause` ALREADY reads `useMetaballRenderer.ts:50` as the BLOB substrate-consumer arm. After the DI strip (Arm 1), re-run `npm run proof:offscreen-pause` to confirm the substrate-park seam still binds (the strip touches `resolveColor`, NOT the `shouldContinue`/`armed`/wake-scheduler park machinery — the park clauses F1/F4/G1 read different lines). The W-BLOB3-DELTA records the measured interaction-hero per-frame budget read off the live π capture (the `requestAnimationFrame` cadence over the hover-flick window) as the frame-cost number.

---

## HARD GATE (evidence-backed)

The wave closes GREEN on FOUR binding conditions:

**(G1) The speculative ColorResolver DI is STRIPPED — byte-identical render (DELETION-PROOF + dts probe + RUNTIME-gate artefact).**
After Arm 1: (a) `grep -rn 'colorResolver|ColorResolver' src/components/custom/goo-blob` returns 0 (the prop, the option, the throw, the import are GONE — the deletion-witness grep, the legitimate ABSENCE-kind per SPEC.md §Hard Gates); (b) `npm run verify-export-types` is GREEN over the trimmed `@mkbabb/glass-ui/goo-blob` subpath (no dangling `ColorResolver` re-export); (c) the full `proof:blob-*` fleet exits 0 — `npm run proof:blob-color-equivalence && npm run proof:blob-render && npm run proof:blob-live-truth && npm run proof:blob-value-free && npm run proof:blob-space-gamma && npm run proof:blob-mood-resolved` — with `proof:blob-color-equivalence` the binding byte-identity witness (the resolved base-color triple is unchanged because the renderer now inlines the resolver's exact body). **Bite-check:** re-add the `colorResolver` REQUIRED prop or change `resolveColor` to a different OKLCh path → `proof:blob-color-equivalence` REDS (the triple drifts) and the deletion grep REDS.

**(G2) The demo-only disposition is RECORDED + accepted by the orphan-scan (DOCUMENT-PRESENCE + grep artefact).**
`docs/consumer-evidence/goo-blob.md` exists, books the blob demo-only with the re-runnable consumer-grep evidence (0 external in `value.js`/`speedtest`/`slides`, 1 demo consumer at `blob.vue:143,209`) + a named ≥2-consumer trigger. The W-CLOSE1 `proof:overfitting-ay` orphan-scan (and the W-SB1 component-orphan check) accepts GooBlob on the evidence doc (verdict `keep-current` with citation), NOT a false `keep`, NOT a `library-orphan` red. **Bite-check:** delete `docs/consumer-evidence/goo-blob.md` → the orphan-scan REDS GooBlob as a published-subpath `library-orphan` (0 external consumers) with no evidence defense.

**(G3) The captured interaction DELTA — machine-enforced (the cardinal lesson; RUNTIME-OBSERVATION + on-disk PNG artefact).**
`npm run proof:live-verified-ledger --tranche=AY` (the AY-pathed cardinal gate minted by W-CARDINAL-INFRA) exits 0 over the W-BLOB3 row: `docs/tranches/AY/audit/visual/W-BLOB3-DELTA.md` exists, references ≥1 own-surface PNG whose basename matches `^W-BLOB3-` (the deepened filename-match binding), covers `/substrates/goo-blob` + `/substrates/blob-mood` at ≥2 viewports × {light,dark} + ≥5 hover-flick frames, and the W-BLOB3 `PROGRESS.md` row is `live-verified` (un-mintable without the on-disk PNG DELTA — the gate self-tests this every run). The DELTA records the paired centroid SHIFT (`restCx` → `leanCx`) INSIDE the `[CENTROID_SHIFT_MIN, CENTROID_SHIFT_MAX]` band that `tests-visual/blob-render.spec.ts:572` already measures, with the resting body inside the W-BLOB2 cream `domeLumaStd`/`bodyMeanL` band — the dome-luma BAND under the interaction is the cream bead, not a charcoal mass. **Bite-check:** flip the W-BLOB3 row to `live-verified` with no on-disk `^W-BLOB3-*.png` → `proof:live-verified-ledger --tranche=AY` REDS (no DELTA) — and the gate's own self-test reds if the detector misses it.

**(G4) The frame-budget is verified (RUNTIME-gate + captured number).**
`npm run proof:offscreen-pause` exits 0 over the post-strip `useMetaballRenderer.ts` substrate-consumer seam — the rAF parks offscreen / content-hidden / tab-backgrounded and freezes under live `prefers-reduced-motion` (the F1/F4/G1 clauses the gate asserts; the strip did not disturb the park machinery). The W-BLOB3-DELTA records the measured interaction-hero per-frame budget (the rAF cadence over the hover-flick capture window) as the falsifiable frame-cost number, NOT a prose "performant." **Bite-check:** remove the `contentvisibilityautostatechange` park wiring → `proof:offscreen-pause` REDS (the loop runs while it should park).

**Why this gate, not grep-alone:** G1 pairs a DELETION-witness grep (the legitimate ABSENCE-kind) with `proof:blob-color-equivalence` (a RUNTIME byte-identity readback that the resolved triple is unchanged) + `verify-export-types` (the published-surface dts probe) — the strip is proven non-destructive, not merely "the lines are gone." G2 is a DOCUMENT-PRESENCE + re-runnable-grep artefact closing the substrate-without-2nd-consumer overfit on the evidence path the audit prescribes. G3 is the machine-enforced captured DELTA (`proof:live-verified-ledger`, not prose "capture") — the hover-flick + dome-luma BAND DELTA the seed names, born-enforceable by the cardinal gate. G4 is a RUNTIME-gate seam assertion + a captured runtime number. NONE is grep-only-for-runtime; NONE is "API exists."

---

## What this wave does NOT do (scope fence)

- It does **NOT** ship the light-cream default base or simplify the `BlobConfig` atoms — that is W-BLOB2 (which lands FIRST so the captured interaction DELTA shows the cream bead, not a charcoal mass). G3 cites the W-BLOB2 cream band as the resting state the interaction rides over.
- It does **NOT** carve `useMetaballRenderer` <500 — that is W-GOD1 (which lands FIRST so the DI-seam excision does not re-conflict with the carve; H-blob F5 ordering). The strip REMOVES lines, so it eases W-GOD1, but the carve is W-GOD1's gate.
- It does **NOT** BIND a value.js / speedtest / slides consumer — the bind is empirically dead (the disposition section); booking demo-only + stripping the DI is the settled path, recorded for the W-CLOSE1 audit.
- It does **NOT** re-run the settled 32-agent SOTA sweep (H-blob F1) nor change any shader algorithm — the interaction (hover-flick lean, click bounce, pseudopod trail) is the SHIPPED W10/W11 machinery; this wave CAPTURES it, it does not re-build it.
- It does **NOT** introduce parallel color math — the renderer consumes the SAME `/color` leaf (`cssToOklch → oklchToGammaRgb`) the deleted resolver delegated to (inv J-10).

## Named successors (on miss)

- If a SECOND real consumer ships in a future tranche (a value.js repatriation that actually lands, a speedtest hero, a slides slide), the `colorResolver?` injection is re-introduced as an ADDITIVE optional prop with a `?? defaultResolveColor` fallback at THAT point — the named ≥2-consumer trigger recorded in `docs/consumer-evidence/goo-blob.md`. This wave does not pre-build it.
- If the DI strip breaks `proof:blob-color-equivalence` (the resolved triple drifts — an unexpected difference between the inlined leaf and the old resolver), the strip is corrected ONCE to restore byte-identity; a second sub-threshold attempt fires the two-failed-lifts trigger and the wave closes with the residual recorded (the resolver re-introduced as an internal default-only helper, NOT the public DI seam).
- If the captured DELTA cannot be produced on the runner (the π workspace device-absent), the W-BLOB3 row stays `live-pending` (NOT `live-verified`) and the DELTA capture is the named successor for the orchestrator's real-device arm — the only legal status without the on-disk PNG (the `proof:live-verified-ledger` discipline; no skip-to-green).

## Cross-references

- `docs/tranches/AY/audit/hardening/H-blob.md` (F4 the missing consumer #2 + the DI-built-for-an-absent-consumer; F5 the W-GOD1 ordering; the convergence criterion item 3 — the second-consumer-or-demo-only-book).
- `docs/tranches/AY/audit/hardening/H-overfitting.md` (the substrate-without-external-consumer class; Finding 2 the `evalFourier` library-orphan precedent for a clean-break dead-export removal; the convergence criterion — ≥2 non-self consumers OR a `consumer-evidence` doc).
- `docs/tranches/AY/waves/AY.W-BLOB2.md` (the light-cream default this wave's DELTA rides over; the scope fence at its §"What this wave does NOT do" routing the second-consumer disposition HERE).
- `docs/tranches/AY/waves/AY.W-CARDINAL-INFRA.md` (the `proof:live-verified-ledger --tranche=AY` cardinal gate + the AY visual home + `CAPTURE-PROTOCOL.md` + `VISUAL-ALLOWLIST.json` this wave's G3 consumes).
- `docs/audits/overfitting-audit.md` (the `keep-current`-requires-`consumer-evidence` verdict path G2 honors).
- `tests-visual/blob-render.spec.ts:572` (the hover-flick centroid-shift BAND the DELTA captures) + `scripts/proof-offscreen-pause.mjs:50` (the frame-budget substrate-park seam G4 names).
- `src/composables/color/index.ts:43,136` (the `ColorResolver` type + `defaultBlobColorResolver` the strip retires) + `src/components/custom/goo-blob/composables/useMetaballRenderer.ts:99-184` + `src/components/custom/goo-blob/GooBlob.vue:32-120` (the DI-seam edit-sites).
