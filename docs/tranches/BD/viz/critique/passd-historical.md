# Pass-D HISTORICAL — the SUBSTANCE-bar re-open (does the BUILD/DECISION HOLD at the CODE level?)

**Lane** BD viz / critique / passd-historical · **2026-06-22** · branch `prototype/liquid-dock` · WRITE-only, zero `src/` edits.
**Charter:** NOT "is it folded into a row" (the P-pass + `historical-hardening.md` did that) — but **does the actual BUILD/DECISION the row points at HOLD when you trace the code/gate at HEAD?** Recency-weighted, hardest first. Every finding is `file:line`.

---

## 0. One-line verdict

The census is row-complete (the P-pass closed the drops; the viz band is now in `UNIFIED-ROSTER`/`EXECUTION-DAG`, `union/waves/W-FOLD-LEDGER.md` now exists — both PARTIAL-remediated since `historical-hardening.md`). **But the SUBSTANCE bar fails in the same systemic place the dock does: a cluster of the HIGHEST-recency (BB/BC-fresh) "BUILT/DECIDED" claims are rows over a FALSE-GREEN gate or a doc-over-code lie — the build the row certifies is not the build at HEAD.** Five concrete, current, code-level instances below.

---

## 1. HARDEST — `proof:aur-kuwahara` W3 is a LIVE false-green, and CLAUDE.md:755 + the census carry the lie (BB/BC-fresh)

The PASSD-FOLD flagged it; I confirm it is CURRENT and worse — the contradicting build already SHIPPED at BC:
- `scripts/proof-aur-kuwahara.mjs:210` — `facts.w3WgslUntouched = !/mediumKuwahara|fn\s+\w*[Kk]uwahara/.test(wgsl)` where `wgsl = read(aurora.wgsl.ts)` (`:45`). It scans the LITERAL file.
- `aurora.wgsl.ts:39` `import { AURORA_MEDIUMS_WGSL }`; `:295` `${AURORA_MEDIUMS_WGSL}` SPLICES it; `:340-342` is the live `uMedium` painterly dispatch.
- `aurora-mediums.wgsl.ts:224` `fn mediumKuwahara(...)`; `:305` dispatches `kuwahara(7)` in WGSL.

So the gate asserts "aurora.wgsl byte-untouched, no kuwahara WGSL body, degrades to smooth" — while the **assembled** shader DEFINES + DISPATCHES kuwahara. The regex cannot follow the splice → greens a false claim. **CLAUDE.md:755** repeats it verbatim ("`aurora.wgsl.ts` is BYTE-UNTOUCHED ... a kuwahara config on WebGPU degrades to the smooth core"). The BB.W-AUR-KUWAHARA "WGSL untouched" booking was already vapor when BC.W-VIZ-AURORA T4 landed the WGSL `uMedium 1-7` dispatch. **This is a row-over-stale-claim the census never re-validated** — `W-GATE-TRUTH-AUDIT` (PASSD-FOLD) must red the assembled shader, not the file, AND fix the prose.

## 2. The "parity proven" story is SPELLING suite-wide — and the numeric net (W-WAVE-FIELD-HARNESS) is UNBUILT

- `proof:concentric` C3 header (`:8,:19`) claims "ROUND-TRIP — the analytic radial-Fourier evaluator (sampleRingField)"; the body (`:109-116`) is `/function sampleRingField/.test(js)`, `/fn sampleRingField/.test(wgsl)`, `/sqrt(RING_GRAVITY*k)/.test(...)` — function-NAME + formula-SHAPE presence per backend. It never EVALS `sampleRingField(r,t)` JS-vs-shader. A sign-flipped ω / `RING_GRAVITY=8` perturbation does NOT red it.
- `proof:fourier-field` U3 (`:18` "ONE math source round-trips") is `/createGpuSubstrate/.test()` + `/setupWGPU/.test()` — pure presence.
- **`scripts/proof-wave-field*.mjs` does NOT EXIST** — the `waveFieldMath.ts` NUMERIC harness the census D71 BUILDs (and that W-DOT-UNIFY/W-DOT-IMAGE are sequenced to lean on) is vapor at HEAD. The "parity proven" claims are theater until it ships with a COEFFICIENT-FLIP bite.

## 3. The border-progress value.js `//CONSUME` is DISCHARGED in the README but NOT in code — doc-over-code lie

`border-progress/README.md:37-38` claims the `// CONSUME(value.js 0.13.0 oklchSpectrum):` interim "is DISCHARGED — the walk re-points ... onto the published helper." Trace it: `spectrum-walk.ts:22` imports `{ mixColors, OKLCHColor, sampleColorRamp }` — value.js 0.13.0 (installed) exports NO `oklchSpectrum`; the walk hand-locates a shorter-hue segment + runs generic `sampleColorRamp`/`mixColors` (`:44-46,:75`). The named published helper the README claims it discharged ONTO **does not exist**. The CONSUME is still an interim (a generic-ramp re-roll), mislabeled "discharged." The census D35-C3 BOOKED-republish-gated is the right disposition; the README's discharge claim is the rows-over-dead-code class on the doc side.

## 4. The disposition-register `pendingResolvedBy` close-flip debt is CURRENTLY OPEN (BB/BC-fresh)

The P-pass under-folded this into the coarse D41-I1 "re-stamp 28." Traced live (`DISPOSITION-REGISTER.json`): **2 rows still carry `pendingResolvedBy`** — `styles-critical-split` carries BOTH `pendingResolvedBy:BB.W-CSS-CRITICAL` AND `resolvedBy:BC.W-CSS-CRITICAL` (a row with two truths; BB pending never cleared when BC resolved landed), and `css-relative-color → BB.W-DARK-INK-WARM` is STILL pending though W-DARK-INK-WARM SHIPPED (CLAUDE.md documents it landed). A BD re-stamp that re-dates `reStampedAt:"BD"` without auditing these flips repeats the documented BB→BC close-failure. D41-I1 must SPLIT out the pendingResolvedBy close-audit.

## 5. `proof:dock-context` is a release-gate over DEAD code (the dock-hallmark hallmark, confirmed)

`proof:dock-context.mjs:66` reads the LITERAL `useDockContextSilhouette.ts`; `:90-93` regex-match `"bar"|"bar+pill"|"split"|"search"`. The file has **ZERO call-sites** and is **NOT BARRELED** (only its own def) — confirmed. `useDockLink` is **not a file** anywhere in `src/`. So the dock organism's first two nodes (W-DOCK-INTEGRATE compose-5, W-SILHOUETTE-REALIZE) are charter over un-built/dead code, and a RELEASE-tagged gate certifies the dead def. The census AMENDs (D91/D93) it correctly — but the row's BUILD does not yet HOLD.

## 6. The enforcer the whole no-silent-drop story leans on is STILL PROSE

`union/waves/W-FOLD-LEDGER.md` (the wave-spec) now exists — but **`scripts/proof-fold-ledger.mjs` does NOT exist**. The census's headline machine-lock ("the union W-FOLD-LEDGER machine-locks this table; the gate reds on a lost disposition / phantom destination") names a gate that is not a file. The no-silent-drop guarantee is un-enforced by code.

## What HOLDS (fairness)
- The kf `//CONSUME(kf snap)` interim (`useDragMorph.ts:281`) is HONEST — names the trigger (kf republishes `DragOptions.snap` past 4.3.0), machine-ABSENT on installed 4.3.0, and the published-surface re-roll (`decayRest`+`nearestTarget`+`spring.target`) is real shipped code. The 3 cross-repo BOOKED asks (kf-oscillator/dragsnap, value.js-color) trace to honest triggers.
- The viz band is now IN the union roster (12/16 hits) + `W-FOLD-LEDGER.md` exists — the P-pass §3 phantom-roster finding is remediated at the doc level (not yet the gate level — see §6).

---

## VERDICT (6-8 lines)

Row-completeness HOLDS (P-pass + the since-fixed roster/fold-ledger-spec); the **SUBSTANCE bar does NOT** — the highest-recency "BUILT/DECIDED" claims are rows over false-green gates and doc-over-code lies. HARDEST: `proof:aur-kuwahara` W3 (`:210`) regex-scans the literal `aurora.wgsl.ts` for "no kuwahara body" while `:39/:295` SPLICE `AURORA_MEDIUMS_WGSL` which DEFINES+DISPATCHES kuwahara (`aurora-mediums.wgsl.ts:224,:305`) — a LIVE false-green, with CLAUDE.md:755 carrying the same lie, and the contradicting BC.W-VIZ-AURORA WGSL dispatch already shipped. The "parity proven" claims are SPELLING suite-wide (concentric C3 `:109-116`, fourier U3 `:18` — name/shape presence, no eval; a coefficient sign-flip passes), and the numeric net that would fix it (`proof:wave-field*.mjs`, D71's `waveFieldMath.ts`) is UNBUILT — a safety regression for the W-DOT-UNIFY/W-DOT-IMAGE waves sequenced to lean on it. The border-progress `//CONSUME(value.js oklchSpectrum)` is README-"DISCHARGED" but `spectrum-walk.ts:22` consumes generic `sampleColorRamp` (no `oklchSpectrum` exists in value.js 0.13.0) — doc-over-code. Two `pendingResolvedBy` close-flips are STILL OPEN at HEAD (`styles-critical-split` carries both truths; `css-relative-color→BB.W-DARK-INK-WARM` un-flipped though shipped) — the documented BB→BC close-failure, under-folded into the coarse D41-I1. `proof:dock-context.mjs:66` is a RELEASE gate over the 0-call-site, un-barreled `useDockContextSilhouette` (`useDockLink` not a file). And the named no-silent-drop enforcer is PROSE — `scripts/proof-fold-ledger.mjs` does not exist. FIX: W-GATE-TRUTH-AUDIT must red the ASSEMBLED shader (not the file) + fix CLAUDE.md:755; ship the numeric wave-field harness BEFORE the dot waves; reconcile the border-progress README to the generic-ramp truth; split the pendingResolvedBy close-audit out of D41-I1 and clear the 2 open flips; and MINT `proof:fold-ledger.mjs` (the enforcer cannot be prose).
