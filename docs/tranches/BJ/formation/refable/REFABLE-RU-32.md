# REFABLE RU-32 — LADDER-DERIVE (redo)

- **Unit**: RU-32 — the "sqrt-phi ladder derivation triumvirate + two challenges (shipped type/space tokens)" per the charter row
- **modelId**: `claude-fable-5` (verified-model: this adjudication ran on claude-fable-5, the system-context model ID, stamped verbatim)
- **Step-2 boundary**: ANEW completed first against primary sources only — src/styles/typography/scale.css, src/styles/tokens/sizing.css, semantic.css consumers, theme bridges, demo story, git history (971bb6e9, 490cc46e, 2c713253, 4f739afe, c6b7df0e), full-precision φ recomputation of all 13 ladder literals. The opus-era wave doc first opened 2026-07-18 07:53:32 EDT, after every independent finding was formed.
- **Opus artifact scrutinized**: `docs/tranches/BI/waves/BI.W-LADDER-DERIVE.md` (read assume-incorrect)

Counts: **3 OPUS-WRONG · 2 FABLE-NEW · 12 RATIFIED**

---

## The headline — the unit premise misidentifies the wave

The charter row for RU-32 names BI.W-LADDER-DERIVE as "the sqrt-phi ladder derivation (shipped type/space tokens)". The doc on disk is a different thing entirely: **a backdrop-filter BLUR-radius co-location PROPOSAL** (band B2, the structural follow to BI.W-GLASS-SUBTLETY) — four `--glass-blur-*-radius` primitives to be minted into the glass.css ladder table. It has nothing to do with φ or √φ, it names no type token and no space token, and it is stamped `STATUS: PROPOSAL … NOT registered … NOT implemented`, routed to the POST-tag structural window. Disk confirms: none of its four tokens exist anywhere in src/ or tests/, all four hand-literals it targets are still bare at HEAD, its born-RED test file does not exist, and its comment-only rider is still stale. **Nothing from this wave shipped in 7.0.0.** The REFABLE premise "ran on opus … and SHIPPED in 7.0.0" fails for this unit on the shipped half; the name collision on "ladder" is the likely cause.

Both ladders were therefore adjudicated: ANEW judged the √φ type/space token surface that DID ship in 7.0.0 (what the charter phrase actually names); SCRUTINY judged the blur-ladder proposal doc the unit points at.

---

## Verdict table A — the charter/declaration layer

| # | Claim | Verdict | Evidence / correction |
|---|-------|---------|----------------------|
| A1 | BI.W-LADDER-DERIVE = the √φ type/space ladder derivation | **OPUS-WRONG** | The doc is the backdrop-blur co-location proposal (rows 6/8/9/10 of the subtlety census). Zero mention of φ, √φ, type-*, or space-* anywhere in it |
| A2 | The wave's output SHIPPED in 7.0.0 | **OPUS-WRONG** | `STATUS: PROPOSAL`, "NOT registered in PLAN.md, NOT implemented", tag placement ruled POST-TAG. Disk: no `--glass-blur-backdrop-radius`/`-overlay-hidpi-`/`-immersive-`/`-sheet-edge-` token exists; light-dark.css:36 still bare `17px`; drawer/styles.css:379 still bare `blur(14px)`; placement.css:113 still `blur(calc(34px * var(--glass-level)))`; animations.css:269 still carries the inline `7px` fallback; no `tests/styles/glass-ladder-derive.test.ts`; property-regs.css:286 still reads "saturate 1.5" |
| A3 | "two challenges" (completed pair) | **OPUS-WRONG** (as a completion claim) | The doc mandates a challenge PAIR; only seat 1 ran (2026-07-17, FAULTED, five mustFix folded into the round-2 recast). The doc's last line: "Awaiting challenge seat 2." The pair was never completed |

## Verdict table B — SCRUTINY of the proposal doc's own claims (assume-incorrect)

Every checkable factual claim in the doc was probed against disk and history. The doc survived clean — it is a well-formed, honestly-labeled unimplemented proposal.

| # | Claim | Verdict | Evidence |
|---|-------|---------|----------|
| B1 | Row 6 — the hi-DPI overlay override is a bare `17px` literal in the `@media (min-resolution: 2dppx)` arm | **RATIFIED** | light-dark.css:36 `--glass-blur-overlay-radius: 17px` inside the retina arm, with the 24→20→17 lockstep history at :31-32 |
| B2 | Row 8 — `::backdrop` reads `var(--top-layer-backdrop-blur)` with a masking inline `7px` fallback; the token is 7px at scroll-tokens.css | **RATIFIED** | animations.css:269 `blur(var(--top-layer-backdrop-blur, 7px))`; scroll-tokens.css:75 `--top-layer-backdrop-blur: 7px`; the rule also reads `var(--background)` + `var(--top-layer-backdrop-dim, 0.5)` in the open arm — the H1 "::backdrop resolves :root customs" evidence holds |
| B3 | Row 9 — the immersive stage scrim is a bare `blur(14px)` | **RATIFIED** | drawer/styles.css:379 (doc pins :371 — pin drift only; the doc itself mandates RE-PIN at execution). The "one FIXED 14px backdrop depth" prose sits at :365-367 as claimed |
| B4 | Row 10 — the FORM 1 side-sheet graded edge is `blur(calc(34px * var(--glass-level)))` on the `glass-graded-halo` slot | **RATIFIED** | placement.css:113, line-exact, `saturate(var(--glass-saturate-overlay))` alongside; the "One fixed 34px backdrop sample" prose at :81 |
| B5 | The c1 anti-peerage evidence — `--top-layer-backdrop-blur` minted at 8px in AQ.W5 (4f739afe) when quiet/resting were 10/12px | **RATIFIED** | 4f739afe verified: `--top-layer-backdrop-blur: 8px` minted (tokens.css:747 in the diff) while `--glass-blur-quiet-radius: 10px` / `--glass-blur-resting-radius: 12px` (tokens.css:596-597 at that commit). The 7==7 today is convergence, not peerage — the c1 ruling is sound |
| B6 | The phantom grep-target — the subtlety C1-CENSUS-GREP names `--glass-blur-immersive` among "the six ladder TOKEN NAMES" but the token never existed on disk | **RATIFIED** | BI.W-GLASS-SUBTLETY.md:307 lists it; zero hits for `--glass-blur-immersive` across src/ + tests/ |
| B7 | Test coupling — glass-subtlety.test.ts:84-87 string-matches the 17px source form and would break under Contract 2 | **RATIFIED** | Lines 84-87 exact: `declMap(read("src/styles/tokens/light-dark.css"))` → `expect(...).toBe("17px")` — a source-form assertion, exactly the coupling the wave owns |
| B8 | The regression floor — wash 1px, quiet/resting 7/7, floating/overlay 11/11, deep 16px frozen, saturate-deep 1.8 | **RATIFIED** | glass.css:86-97 (1/7/7/11/11), glass-deep.css:56 (16px, "in [14,20], STRICTLY > calm floating 11px"), glass-deep.css:64 (1.8) |
| B9 | The rider — property-regs.css:286 stale "saturate 1.5" prose vs the actual 1.8 deep | **RATIFIED** | :286 reads "depth 1 ≡ saturate 1.5 / blur 16px"; glass-deep.css:64 is 1.8. Still un-cured at HEAD (the rider rides the unexecuted wave) |

## Verdict table C — ANEW spot-check of the SHIPPED √φ type/space surface

The surface the charter phrase names. Re-derived from full-precision φ = 1.618033988749895, √φ = 1.272019649514069.

| # | Shipped value | Verdict | Evidence |
|---|--------------|---------|----------|
| C1 | The static rungs — subheading 1.272 (φ^½), heading 1.618 (φ), title 2.058 (φ^3/2) + their px comments (20.4/25.9/32.9) | **RATIFIED** | All exact to ≤0.003px at 16px root; px comments correct |
| C2 | The display clamp ceilings 1..5 — 2.618 (φ²), 3.33 (φ^5/2), 4.236 (φ³), 6.854 (φ⁴) and the floor = identity−1-step pattern | **RATIFIED** | Exact to ≤0.003px; every display-N floor equals the rung two half-steps down, ceiling equals the rung identity (display-4's ceiling excepted — see F2) |
| C3 | The audacious-tier rung labels (mega φ^9/2, hero φ^5, audacious φ^11/2) + stated peaks (177/287/352px) | **RATIFIED** | Labels are RUNG IDENTITIES, not ceilings — the comments state identity and peak as separate facts and both check out: mega ceiling 11.089rem = 177.4px = φ^5, hero ceiling 17.942rem = 287.1px ≈ φ^6, audacious ceiling 22rem = 352px, the explicit fast.com peg. The tier deliberately stretches its fluid ceiling past the identity (poster headroom); floors continue the half-step ladder exactly (φ^3.5, φ^4, φ^4.5) |
| C4 | `--type-proportional-ratio: 0.7861513777574233` = 1/√φ, and the claim that the interval "holds at the clamp floor, throughout its fluid arm, and at the ceiling" | **RATIFIED** | Exact to all 16 digits of 1/√φ. The kicker is `calc(headline × ratio)`, so the ratio holds at every viewport by construction — the claim is mathematically true, not an approximation. This quad (+ the two `@utility` readers + the demo story) is the ONE BI-era delta to scale.css (490cc46e); the ladder itself predates BI (971bb6e9, 2026-05-12) |
| C5 | `--space-phi-5: 2.618rem` (φ²) / `--space-phi-6: 4.236rem` (φ³) + `--dock-label-ratio: 0.5088` | **RATIFIED** | φ²/φ³ exact; bridged to Tailwind (`--spacing-phi-5/6`, bridges.css:283-284) + consumed by data-table styles.css:19 — the ≥2-sites-or-exported bar holds. 0.5088 = 1.272/2.5 exactly as the sizing.css comment derives |

## FABLE-NEW findings

| # | Finding | Evidence |
|---|---------|----------|
| F1 | **The upper display rungs are CHAINED from truncated 3-decimal literals, not computed from full-precision φ** — drift compounds up the ladder. `17.942 = 11.089 × 1.618` EXACTLY (φ^6 exact = 17.9443, −0.036px); `11.089` is the truncation of `6.854 × 1.618 = 11.0898` (φ^5 exact = 11.0902) | Recomputation; the products land digit-exact on the shipped literals |
| F2 | **Two literals match NO derivation — transcription slips at 971bb6e9 (2026-05-12, pre-BI)**: `5.382rem` for φ^3.5 (exact 5.3884; even the truncated chain 4.236×1.272 gives 5.388 — −0.102px, appears twice: display-4 ceiling + display-mega floor) and `8.728rem` for φ^4.5 (exact 8.7186; the chain 6.854×1.272 gives 8.718 — +0.151px, display-audacious floor). Both sub-quarter-pixel, invisible in paint; both are honest derivation defects in a ladder whose identity is its derivation | Recomputation + `git log -S`: both literals born at 971bb6e9, untouched since; NOT BI-era work — the BI cut (490cc46e) only added the proportional quad |

---

## ROUTING (PROPOSE only — no src/, band, or shipped-wave edits)

1. **Design-debt row → BJ typography/tokens band**: normalize the two slipped φ literals (`5.382` → `5.388` in display-4 ceiling + display-mega floor; `8.728` → `8.718` in display-audacious floor) and pick ONE derivation policy for the ladder (full-precision φ powers rounded once, or the documented 3-decimal chain) so the rungs are reproducible. Paint delta ≤0.16px at 16px root — values-only, zero visible change, fits any calm window.
2. **Formation-ledger correction → BJ formation**: the RU-32 charter row misnames BI.W-LADDER-DERIVE as the shipped √φ type/space wave. It is the unshipped backdrop-blur co-location proposal. Any opus-era declaration crediting LADDER-DERIVE output as shipped-in-7.0.0 should be struck; the √φ tokens that DID ship trace to 971bb6e9 (ladder) + 490cc46e (proportional quad), not to this wave.
3. **Disposition row → BJ structural band**: BI.W-LADDER-DERIVE is a live, verified-accurate, unexecuted proposal — all four target literals confirmed bare at HEAD, the rider still stale, challenge seat 2 never run. BJ should either run seat 2 and adopt it into the structural window it was ruled into, or formally retire it. Leaving it in limbo re-creates the exact hand-tracked-literal drift class it exists to close (the six-miss recurrence it documents is still open).
