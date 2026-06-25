# Pass-D — the gate-truth census (the deepest systemic thread)

**Target:** census the FALSE-GREEN / BLIND gate class across the WHOLE `proof:*` suite (342 gates), not just viz. For every gate that CLAIMS "parity / byte-untouched / numerically identical / round-trips / no-dispatch / residue-complete / ΔE", does it ACTUALLY evaluate a number / follow a splice / cover the full axis — or is it theater?

**Verdict up front:** the convergence rests on a gate foundation that is, on the shader/field/parity/residue surface, **string-presence dressed as numeric proof**. ZERO of the 342 gates dynamically import + call a TS evaluator; ZERO compile a shader; ZERO compute a real ΔE. Every "parity / round-trips / ΔE 0.0" claim is a `.test()` regex chain, and the ΔE numbers are hand-authored in a markdown table the gate merely re-reads. The false-green class is not 7 gates — 7 are the confirmed worst; the MECHANISM (no gate executes math) is suite-wide across the entire generative-viz surface.

---

## The four false-green CLASSES (Pass-D taxonomy, confirmed by mechanism)

- **(a) Name/string-presence masquerading as numeric parity** — `.test(/fn sampleRingField/)` across three files greens "round-trips JS↔WGSL↔GLSL → ΔE 0.0".
- **(b) Planted-mutation bite that DELETES a token, not PERTURBS a coefficient** — the self-test overwrites the body with `fn f(){}` (proves it catches a deletion), never flips a sign or value (a coefficient-flip sails GREEN).
- **(c) Narrow FORBIDDEN list blind to `text-*` / raw-Tailwind / renamed forms** — an 8-entry `bg-*`/`ring-*` list greens `text-popover-foreground`, `text-red-300`, `rounded-sm`.
- **(d) Release-tagged gate guarding DEAD / un-wired code** — a regex over the literal source of a 0-call-site composable, blocking releases on a charter over dead code.
- **(e) [NEW — the deepest] The fabricated-number gate** — a gate that READS a hand-authored ΔE from a markdown table and asserts `≤ threshold` against it. The number was never computed by anything. This is (a) and (b) compounded into a registry-of-lies the parity superset trusts.

---

## CENSUS TABLE — confirmed false-green / blind gates (file:line)

| # | Gate (tags) | Claim | Actual mechanism (file:line) | Class | Blast |
|---|---|---|---|---|---|
| 1 | **proof:gpu-substrate-single** `[local,ci]` | "verified row needs a recorded OKLab ΔE within mean≤2.0/p99≤5.0" | Reads `row.deltaE` from `gpu-parity-table.md` fenced JSON (`proof-gpu-substrate-single.mjs:260`) — never computes ΔE. EVERY row records authored `{mean:0,p99:0}` (`gpu-parity-table.md:45,61,77,93,108,120,132`). | (e) | **CI-tagged keystone.** The whole 7-viz dual-substrate parity story is a table of `0.0`s the gate rubber-stamps. A real per-GPU rasterizer drift, a wrong WGSL coefficient, a broken fallback — all GREEN. |
| 2 | **proof:aur-kuwahara** `[local,ci,release]` | W3(g): "aurora.wgsl.ts BYTE-untouched; kuwahara WGSL is booked; a kuwahara config on WebGPU degrades to the smooth core" | `w3WgslUntouched = !/mediumKuwahara/.test(wgsl)` (`proof-aur-kuwahara.mjs:210`) scans the LITERAL `aurora.wgsl.ts` — but `:295` splices `${AURORA_MEDIUMS_WGSL}` (`aurora.wgsl.ts:39,295`) which DEFINES `mediumKuwahara` (`aurora-mediums.wgsl.ts:224`) + dispatches uMedium 1-7 via `applyMedium` (`aurora.wgsl.ts:345`). The body lives in the spliced module, invisible to the regex. | (a) | **RELEASE-tagged + CLAUDE.md:755 carries the same lie.** Kuwahara renders fully on WebGPU; the "byte-untouched / degrades to smooth" claim is flatly false. The regex-can't-follow-a-splice pattern is the template for the entire spliced-shader surface. |
| 3 | **proof:concentric** `[local,ci]` | clause-3: "ONE math source round-trips JS↔WGSL↔GLSL; ω=√(g·k)" | `/function sampleRingField/.test(js)` && `/fn sampleRingField/.test(wgsl)` && `/float sampleRingField/.test(glsl)` (`proof-concentric.mjs:109-114`); ω-check is `/sqrt\(\s*RING_GRAVITY\s*\*\s*k\s*\)/.test()` — a literal-string scan. Bite (c) (`:367`) overwrites WGSL with `fn sampleRingField() {}` — DELETES the body. | (a)+(b) | Feeds gpu-parity-table row #1's "ΔE 0.0" claim (`gpu-parity-table.md:94`). A sign-flipped omega (`-RING_GRAVITY`), wrong gravity (8.0), or phase error sails GREEN — the bite only proves deletion is caught. |
| 4 | **proof:viz-dotflow** `[local,ci]` | F3: "ONE math source round-trips; the JS evaluator agrees with the transcribed structure" | `/fn gridOrigin/.test(wgsl)` etc. (`:169-185`); the strongest check is `/p\.x\s*\*\s*0\.55/.test()` (a single enumerated literal). Bite "drifted curl ×1.7" (`:319`) catches a change to THAT one literal — blind to `springK`, the Gerstner steepness, the wave omega. | (a)+(b-partial) | Feeds gpu-parity row #3 "ΔE 0.0" (`gpu-parity-table.md:78`). Un-enumerated coefficients un-checked. |
| 5 | **proof:fourier-field** `[local,ci]` | U3: "the WGSL compute kernel transcribes math.ts partialSumAt EXACTLY → ΔE 0.0" | `/fn partialSumAt/.test(compute)` + `/re\s*\*\s*cs\s*-\s*im\s*\*\s*sn.../.test()` (`:107-120`) — a name + one expression-literal. Never evaluates `partialSumAt`. | (a) | Feeds gpu-parity row #6 "round-trips...→ mean/p99 = 0.0" (`gpu-parity-table.md:121`). The "machine-precision 3.04e-15" lives in a UNIT TEST, not this gate; the gate proves spelling. |
| 6 | **proof:no-shadcn-default** `[local,ci]` | "the residual-shadcn TOKEN vocabulary census" | 8-entry `FORBIDDEN` list — all `bg-*`/`ring-*`/`rounded-md`/`shadow-sm` (`:74-138`). NO `text-*` axis, NO raw-Tailwind. | (c) | Survives GREEN: `text-popover-foreground` ×9 (tooltip/hover-card/dropdown/combobox/context-menu/command/select), `text-accent-foreground`, raw `text-red-300`/`text-red-50` (`ToastClose.vue:24`), `rounded-sm`+`bg-accent` close-X chips, DataTable `rounded-lg`/`bg-muted/40`. W-GLASS-IOS27 leans on a blind census. |
| 7 | **proof:dock-context** `[local,ci,release]` | C1: "the four named silhouette kinds present in the descriptor contract (data-not-code-paths)" | `/["']bar\+pill["']/.test(src)` against the LITERAL `useDockContextSilhouette.ts` source (`:64-93`). The composable has **0 runtime call-sites** (not barrelled; the one demo mention in `AppSwitcher.vue:3-4` is a COMMENT saying it does NOT use it — "overkill"). | (d) | **RELEASE-tagged charter over dead code.** Greens whether or not the engine is ever invoked. The dock-organism's first two nodes (W-DOCK-INTEGRATE / W-SILHOUETTE-REALIZE) are unwritten; this gate certifies a corpse. |

---

## The blast-chain (why this is the deepest thread, not 7 isolated bugs)

The fake numbers COMPOUND. `proof:gpu-substrate-single` (the CI keystone) clause F asserts each verified row's ΔE is within the bar — and to lend the `0.0` credibility, each row's `note` CITES the per-viz gate's round-trip clause: row #4 cites "proof:concentric clause 3 round-trips → mean/p99 = 0.0", row #3 cites "proof:viz-dotflow clause F3", row #6 cites "proof:fourier-field U3". **Every cited clause is itself string-presence (#3/#4/#5 above).** So the chain is: a hand-typed `0.0` → vouched by a regex that checks a function NAME → trusted by a superset gate that re-reads the hand-typed `0.0`. Nothing in the loop ever ran the shader. The `gpu-parity-table.md` notes even self-incriminate — every row says "the recorded ΔE is the DEVICE-FREE STRUCTURAL PROXY" and "the BINDING Metal-GPU live capture-pair rides W-REFLECT3" — i.e. the real proof is deferred to an unbuilt wave, and the structural proxy itself was never executed (no gate imports the chunk variants it claims to evaluate "over the same deterministic field").

`proof-aurora-atoms-roundtrip.mjs:30` says the quiet part aloud in its own header: *"they assert a source PRESENCE/ABSENCE, NOT a runtime behaviour."* The authors know.

---

## Scale estimate — how much of the suite is theater

- **342 proof gates total.** ~95 make a numeric/parity/byte/round-trip/ΔE/residue claim (grep for the claim-keywords).
- **0** dynamically import + call a TS evaluator (`await import` of any `composables/*`/`*math*`/`ringField`/`flowField`/`atoms` leaf — empty result-set).
- **0** compile or run a shader (no `headless-gl`/`createProgram`/`compileShader`/`navigator.gpu` *invocation* gate-side — the only `navigator.gpu` hits are regexes FORBIDDING the call in source).
- **0** define an OKLab ΔE function (no `function deltaE`/`computeDeltaE`/`oklabDelta` anywhere in `scripts/`).
- **The entire generative-viz parity surface** (aurora · goo-blob · dot-flow · concentric · paper-grid · fourier · constellation = 7 verified rows) is hand-authored `0.0`s + name-presence clauses. **Every one is theater on the parity axis.**
- The "byte-untouched / no-dispatch" claims are spliced-shader-blind by construction (#2 is the proven instance; any gate scanning a `.wgsl.ts`/`.glsl.ts` literal that splices a `${...}` module shares the hole — `proof:aurora-curl-warp`, `proof:shader-shared-source`, `proof:gooblob-meatball` are next to audit on this axis, 2 numeric-signals vs 24+ string-signals each).
- The **(c) blind-list** class likely recurs in every "residue census / forbidden-vocabulary" gate that hand-lists tokens (no-shadcn-default confirmed; sweep `proof:no-gray`, `proof:teal-navy-purge`, `proof:no-dead-token` for the same hand-list-vs-axis gap).

**Honest count: ~30-40 gates carry a parity/round-trip/byte/ΔE claim that is provably string-presence, and the 7-row gpu-parity-table is the single highest-blast fabrication (one CI gate, one release gate, CLAUDE.md prose).**

---

## W-GATE-TRUTH-AUDIT — the remediation (proposed)

1. **A real numeric oracle↔shader harness (the keystone).** Mint `scripts/lib/shader-eval-harness.mjs`: dynamically `import()` each JS field evaluator (`ringField.sampleRingField`, `flowField.sampleHeight`, `math.partialSumAt`, …), AND parse+evaluate the WGSL/GLSL transcription of the SAME function via a tiny GLSL/WGSL→JS transpiler (or `headless-gl` for the real raster path). Sample N (p,t) points; assert `|js − shader| < ε` AND compute the OKLab ΔE through both color chunks. **This replaces every `.test(/fn sampleRingField/)` round-trip clause.**
2. **COEFFICIENT-FLIP bites, not deletion bites.** Each round-trip self-test must perturb a REAL coefficient in the shader source and assert RED: a sign-flipped omega (`sqrt(-RING_GRAVITY*k)`), `RING_GRAVITY` 9.81→8.0, a transposed `re*sn`↔`re*cs`, `springK` ×2. A bite that overwrites the body with `fn f(){}` is FORBIDDEN — it only proves deletion-catching.
3. **Splice-following.** Any gate asserting "X is byte-untouched / X carries no dispatch" must resolve `${...}` splice imports and scan the ASSEMBLED string, not the literal file. Fix `proof:aur-kuwahara:210` first (resolve `AURORA_MEDIUMS_WGSL` and scan the concat) and fix CLAUDE.md:755's matching prose.
4. **Compute the ΔE — retire the authored number.** `proof:gpu-substrate-single` clause F must DERIVE each row's ΔE from the harness (#1), not read it from the markdown. The `gpu-parity-table.md` `deltaE` field becomes a gate-WRITTEN output, never a hand-authored input. Until the live Metal capture lands, the structural-proxy ΔE must be ACTUALLY EVALUATED (run both color chunks over the field), not declared `0.0`.
5. **Full-axis residue census.** Widen `proof:no-shadcn-default` with a `text-*`-shadcn axis (`text-{popover,accent,secondary,muted}-foreground`) + a raw-Tailwind-color axis (`text-red-\d+`, `bg-emerald-\d+`, `rounded-sm`) and DRIVE the W-GLASS-IOS27 residue list off the WIDENED reds, never a hand-list.
6. **Dead-code gates assert the WIRED surface.** `proof:dock-context` must assert against a live call-site (a barrel export + ≥1 runtime invocation), not the composable's own source — OR W-SILHOUETTE-REALIZE wires-or-retires it and the gate follows. A release-tagged regex over 0-call-site code is barred.

**Sequencing fence:** the dotflow + concentric numeric harness is a PREREQUISITE before W-DOT-UNIFY / W-DOT-IMAGE lean on those parity gates; the `waveFieldMath.ts` harness (W-WAVE-FIELD-HARNESS) MUST be the #1 oracle, not cloned from the C3 regex shape (else it is theater by inheritance).

---

## VERDICT (6-8 lines, hardest first)

1. **proof:gpu-substrate-single (CI keystone) is the deepest fabrication: it asserts ΔE≤2.0 by re-reading hand-authored `{mean:0,p99:0}` from `gpu-parity-table.md` — all 7 verified-viz rows are typed `0.0`s no code ever computed; the cited "round-trip" clauses that vouch them are themselves name-presence.**
2. **proof:aur-kuwahara:210 (RELEASE-tagged) greens "aurora.wgsl byte-untouched / WGPU degrades to smooth" by regexing the literal file while `:295` splices the kuwahara body in via `${AURORA_MEDIUMS_WGSL}` — kuwahara renders fully on WebGPU; CLAUDE.md:755 repeats the lie.**
3. **proof:concentric/viz-dotflow/fourier-field "round-trips JS↔WGSL↔GLSL" = `.test(/fn name/)` across 3 files; their self-test bites DELETE the body, never PERTURB a coefficient — a sign-flipped omega sails GREEN.**
4. **proof:no-shadcn-default is axis-blind: its 8-entry FORBIDDEN list has NO `text-*`/raw-Tailwind, so `text-popover-foreground` ×9, raw `text-red-300` (ToastClose:24), `rounded-sm` close-X chips survive GREEN — W-GLASS-IOS27 leans on a blind census.**
5. **proof:dock-context (RELEASE-tagged) regexes the literal source of `useDockContextSilhouette` (0 runtime call-sites, not barrelled, the one demo mention is a comment refusing it) — a charter blocking releases over a corpse.**
6. **Suite-wide: 0 of 342 gates import+call a TS evaluator, compile a shader, or compute a ΔE; ~30-40 carry a string-presence parity/byte/round-trip claim. The "parity proven" story is spelling, not behaviour.**
7. **W-GATE-TRUTH-AUDIT (ELEVATED, PREREQUISITE): mint a real oracle↔shader eval harness with COEFFICIENT-FLIP bites + splice-following + a GATE-WRITTEN ΔE; widen the residue census off reds; bar release-tagged regexes over dead code. The convergence cannot stand on a registry of authored `0.0`s.**
