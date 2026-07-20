# BI.W-LADDER-DERIVE — every backdrop-filter blur radius rides one ladder table (PROPOSAL)

> **STATUS: PROPOSAL.** Formed at the LADDER-DERIVE triumvirate pass (BI addenda; RESEARCH → HARDEN →
> WAVE-WRITE). NOT registered in PLAN.md, NOT implemented. A challenge pair reviews this doc before the
> orchestrator registers/commits. Sources of record:
> `~/.claude/projects/-Users-mkbabb-Programming-glass-ui/bi-addenda/reports/glass-subtlety/ladder-derive-research.md`
> (RESEARCH, lineage) + `…/ladder-derive-harden.md` (HARDEN, NORMATIVE — the mechanism rulings).
>
> **TAG PLACEMENT — POST-TAG structural window (RULED).** This wave lands in the post-tag structural
> window, NOT the 7.0.0 values-only calm cut. `BI.W-GLASS-SUBTLETY` explicitly fenced this refactor out of
> its cut ("a token-plumbing refactor does not belong in a values-only immutable-major calm cut"); it is a
> zero-paint additive-token structural change with NO scheduled beneficiary (the next recalibration is
> unscheduled) and is NOT on the 7.0.0 critical path. It rides the structural window that opens after the
> 7.0.0 values-only cut ships.

Band B2 (glass taxonomy). The STRUCTURAL follow to `BI.W-GLASS-SUBTLETY`, booked by that wave's Ruling
C1-STRUCTURE + §Obligations final row. SUBTLETY fixed the VALUES (~15% pull across the census); it left the
STRUCTURE that caused the miss untouched, by design (a token-plumbing refactor does not belong in a
values-only immutable-major calm cut). This wave is that refactor, and NOTHING else: pure structural
co-location, **values change ZERO**. The proof is source-resolution byte-identity of the `var()`
substitution graph — `::backdrop` and the retina `@media` arm are NOT live-computed-style-observable in the
unit harness (the happy-dom shim does not paint), so the deterministic `var()` substitution is the honest proof, backed
by H1's on-disk evidence that `::backdrop` already resolves `:root` customs and paints.

## §Motivation — the six-miss recurrence, named

The subtlety recalibration missed sites SIX times across formation + implementation because four
backdrop-filter blur radii are hand-tracked literals OUTSIDE the ladder tokens (subtlety census rows
6/8/9/10 + the retina @media override). A value not derived from the ladder does not travel with it:

- **Row 6, the decisive recurring miss** — the high-DPI overlay override (`light-dark.css:36`, `20→17`
  this last cycle) is a no-op-on-retina every time the base moves and the override does not. Retina/mobile
  is the majority device; the headline recalibration silently failed there in prior rounds.
- Rows 8/9/10 — the native `::backdrop` reader (`scroll-tokens.css:75` + the `animations.css:269` inline
  fallback), the immersive stage scrim (`drawer/styles.css:371`), the side-sheet graded edge (the FORM 1
  `glass-graded-halo` rule, `placement.css:113` at HEAD post-GRADED-BACKDROP) — three bare paint/token
  literals a `src/styles/**` sweep never opens.

C1-STRUCTURE named the true shape: *"4 ladder primitives cascade + 4 hand-tracked literals + 1 media-query
override, all pulled ~15% by hand"* — not "one scalar." This wave collapses that to *"every backdrop-filter
blur radius is a named `--glass-blur-*` primitive in ONE table; no site paints a bare `blur(<literal>)`."*
After it lands, the next recalibration is a grep + edit of the glass.css primitives block; every consumer
`var()`-tracks. **The wave's deliverable is a one-table edit for the next recalibration.**

**Adjacent debt (merged-c2.md:73-75):** rows 8/9/10 have ZERO test coverage — "the exact un-tokenized
hand-literal class C1-STRUCTURE names as drift-prone is the LEAST pinned; only row 6 got a differential."
This wave tokenizes AND pins them. Plus a one-line rider: `property-regs.css:286` stale "saturate 1.5" prose
(deep is 1.8).

## §Design — the gestalt (co-locate every hand-literal into the one table)

The disease was cross-FILE scatter, not a bad value. The cure is CO-LOCATION, applied UNIFORMLY: promote
every backdrop-filter blur radius to a first-class `--glass-blur-*-radius` primitive in the glass.css ladder
table, and have every far-flung consumer read it via `var()`. ONE mechanism for all four rows — mint an own
co-located primitive, consume via `var()`:

- **Rows 6/9/10 (17/14/34)** match no rung; each mints its own primitive. HARDEN H2 refuted arithmetic
  derivation for row 6: the @media arm re-declares its own token (self-reference is cyclic/invalid — cannot
  self-derive), and the history (15→24, 13→20, 11→17) fits neither a constant ratio nor a constant delta, so
  any `calc()` would fabricate a relationship the history disproves. Co-location delivers the one-table edit
  without the false precision.
- **Row 8 (`::backdrop`, 7)** ALSO co-locates — it mints its OWN `--glass-blur-backdrop-radius: 7px`, NOT a
  bind to the resting rung. The value coincides with quiet/resting (all 7px today), but a value coincidence
  is NOT a binding (the wave's own Class-A discipline, below): `--top-layer-backdrop-blur` was minted at 8px
  in AQ.W5 (`4f739afe`) when quiet/resting were 10px/12px — it equalled neither rung at mint, and the 7==7
  today is a coincidental convergence, not a tracking relationship. The subtlety census gave `::backdrop` its
  OWN row with a BLANK peerage note (row 8, `BI.W-GLASS-SUBTLETY.md:114`) while resting (row 3) is explicitly
  peer-locked; the native modal scrim is an independent register (its load-bearing knob is the DIM, not the
  blur — the blur is a deliberately light, decoupled accent). Co-location removes the literal and delivers
  the one-table edit WITHOUT asserting a peerage the history disproves; a later wave may DERIVE only if
  positive on-disk evidence of peerage ever appears.

No regen script (HARDEN H3 — `var()` is one-source natively; a generator adds a second source + a build
step for zero gain, extreme parsimony forbids it). No build step. Plain CSS.

**Precedent this generalizes:** `scroll-tokens.css:74` already carries `--top-layer-enter-blur:
var(--enter-overlay-blur)` — an inline animations.css fallback promoted to a `var()` reading a named register
"so both channels source the register." Row 8's sibling `--top-layer-backdrop-blur` is the one blur token in
that block that never got the indirection; this wave applies the same move, minting its own co-located
register (`--glass-blur-backdrop-radius`) rather than binding to an existing rung.

## §Contracts — the exact rows (RE-PIN line numbers at execution)

Per PROCESS-CODEX §3 (pin-drift lesson): file + symbol citations are durable; literal line numbers are
RE-PINNED AT EXECUTION against real HEAD. Values in every row are byte-identical before/after.

### Contract 1 — row 8: co-locate the native `::backdrop` radius as its own rung
- `src/styles/tokens/glass.css` — MINT `--glass-blur-backdrop-radius: 7px` in the blur-primitives block
  (`:86-97`). The native-modal-scrim radius now lives in the same table as every other backdrop-blur rung.
- `src/styles/tokens/scroll-tokens.css` — `--top-layer-backdrop-blur: 7px` → `var(--glass-blur-backdrop-radius)`.
  (Byte-identical: the co-located rung is 7px.) NOT a bind to the resting rung — the value coincides with
  quiet/resting (all 7px today) but that is a coincidence, not a binding: `--top-layer-backdrop-blur` was
  minted at 8px in AQ.W5 (`4f739afe`) when quiet/resting were 10/12px, and the subtlety census listed
  `::backdrop` as its own row with a BLANK peerage note. The scrim is a distinct register; it gets its own
  co-located primitive, matching rows 6/9/10.
- `src/styles/animations.css:269` — `blur(var(--top-layer-backdrop-blur, 7px))` → `blur(var(--top-layer-backdrop-blur))`.
  DROP the inline `7px` fallback (the token is always defined; a stale-sibling masking fallback is the
  no-masking-fallback target — this REMOVES the literal, strictly better than the subtlety wave's hand-sync).
  Orthogonal to co-locate-vs-derive; verified CLEAN by c1 (no engine failure mode leaves this one var
  undefined while the other three resolve; an undefined source fails loud to `none`, the desired behaviour).
- **`::backdrop` var-resolution is PROVEN, not assumed** — the existing rule already reads `var(--background)`,
  `var(--top-layer-backdrop-dim)`, `var(--top-layer-backdrop-blur)` from `:root` and paints (HARDEN H1).

### Contract 2 — row 6: co-locate the retina overlay ceiling in the ladder table
- `src/styles/tokens/glass.css` — MINT `--glass-blur-overlay-hidpi-radius: 17px` in the blur-primitives block
  (`:86-97`), beside the base `--glass-blur-overlay-radius: 11px`. (The hi-DPI ceiling now lives in the SAME
  table as the base rung — the next recalibration edits both here.)
- `src/styles/tokens/light-dark.css` — the `@media (min-resolution: 2dppx)` arm:
  `--glass-blur-overlay-radius: 17px` → `var(--glass-blur-overlay-hidpi-radius)`. The @media arm becomes a
  VALUE-free mechanism; it never needs editing at the next recalibration.
- Reword the restore note (`light-dark.css:24-33`) — the value is unchanged, the SOURCE is now a co-located
  token; the "in lockstep with the base ladder" intent is satisfied structurally (both rungs in one table).

### Contract 3 — row 9: mint the immersive scrim rung (makes the phantom grep-target real)
- `src/styles/tokens/glass.css` — MINT `--glass-blur-immersive-radius: 14px` in the blur-primitives block.
  (The subtlety C1-CENSUS-GREP already greps `--glass-blur-immersive` as one of "the six ladder TOKEN NAMES",
  but that token never existed on disk — this wave gives the grep axis a real referent.)
- `src/components/drawer/styles.css:371` — `backdrop-filter: blur(14px)` → `blur(var(--glass-blur-immersive-radius))`.
  (Keep it a bare fixed blur — NO `--glass-level` wrap; the scrim is deliberately a FIXED depth, `:361-367`.
  Byte-identical.)
- Co-move the prose at `:361`/`:363` ("one FIXED 14px backdrop depth" ×2) to reference the token.

### Contract 4 — row 10: mint the side-sheet graded-edge rung (onto the landed `glass-graded-halo` home)
- `src/styles/tokens/glass.css` — MINT `--glass-blur-sheet-edge-radius: 34px` in the blur-primitives block.
- `src/components/dialog/placement.css` — the FORM 1 side-sheet per-edge rule (`placement.css:113` at HEAD,
  `:where([data-slot="dialog-content"][data-placement] > [data-slot="glass-graded-halo"])`):
  `blur(calc(34px * var(--glass-level)))` → `blur(calc(var(--glass-blur-sheet-edge-radius) * var(--glass-level)))`.
  (Level + `saturate(var(--glass-saturate-overlay))` untouched — only the radius literal moves to a token.
  Byte-identical.) **RE-PINNED onto the settled home:** `BI.W-GRADED-BACKDROP` has LANDED (commits
  `24b63d01`/`189ae15c`/`71892b9e`) and renamed the slot `dialog-graded-edge` → `glass-graded-halo`
  (`placement.css:92-93`, name-locked jointly with `BI.W-ENGAGE-AFFORD`); the 34px value is byte-stable and
  was NOT tokenized by that wave, so this co-location pins the new primitive onto the FORM 1 rule as it now
  exists.
- Co-move the prose at `:81` ("One fixed 34px backdrop sample", the FORM 1 note) to reference the token.
- **Out of THIS wave's scope:** the three `--glass-halo-*` tokens (`--glass-halo-blur: 20px`,
  `--glass-halo-core`, `--glass-halo-bloom`, glass.css:171-173) are GRADED-BACKDROP's own (the FORM 2
  box-following bloom, name-locked jointly with `BI.W-ENGAGE-AFFORD`) — NOT touched here. This wave co-locates
  only the FORM 1 34px radius.

### §Adjacent-debt RIDER (comment-only, fenced from the four contracts — HARDEN H4)
- `src/styles/tokens/property-regs.css:286` — the `--glass-depth` @property doc "depth 1 ≡ saturate 1.5 /
  blur 16px" → "saturate 1.8 / blur 16px". `--glass-saturate-deep` is 1.8 (`glass-deep.css:64`); the blur
  16px half is already correct. One line, zero paint, booked here with no other owning wave. NOT a Contract.

### Out of scope (verified, so a challenge does not re-flag them)
- Rows 2-5 (`--glass-blur-{wash,quiet,resting,floating,overlay}-radius`, glass.css) — already ladder
  primitives that cascade. Untouched (the derivation TARGET, not a mover).
- Row 7 deep (`--glass-blur-deep-radius: 16px`, glass-deep.css) — already a tokenized primitive, under the
  emphatic C1-DEEP freeze. Moving it reopens the freeze for zero gain. Untouched.
- `filter:` own-pixel motion blurs (`--enter-*-blur`, `--glass-reveal-blur`, `--lq-enter-blur`,
  `--dock-reveal-blur`, `segmented.css:197`) — a DIFFERENT family (surface-own-pixel decongestion, not
  backdrop plate blur), the same exclusion the subtlety census draws. Untouched.
- box-shadow blur (`--blob-shadow-blur`, `--blob-shadow-contact-blur`, shadow.css) — not backdrop-filter.
- `--top-layer-enter-blur` (scroll-tokens.css:74) — already derived (`var(--enter-overlay-blur)`); its
  inline `4px` fallbacks at `animations.css:223,253` are a motion-register `filter:` family, out of this
  backdrop ladder. Not carried (noted so a challenge sees the deliberate boundary).

## §Census discipline — the reword grammar, EXTENDED (two new classes this cycle)

Inherits the subtlety census grammar: PRESENT-TENSE reference (REPLACE the value), TRAJECTORY/HISTORY record
(APPEND the pull), DERIVED/INTERPOLATED (RECOMPUTE), token-name second-axis grep (catch pre-stale prose).
This wave changes SOURCE FORM, not values, so the reword sweep here re-points prose from a literal to a token
name where the prose names the source. The two NEW classes, learned this cycle:

**Class A — RANGE-STRING.** A prose value expressed as a RANGE or band, where a structural change may touch
one endpoint but not the band boundary. RULE: check each endpoint INDEPENDENTLY against the disk truth; an
endpoint that is a moved/re-sourced value updates, a fixed band boundary holds. Live instances:
- `glass.css:90-93` "the 8–15px budget band" / "15px is the band ceiling" — the base overlay (11) sits inside;
  the band boundary (15) is a fixed budget, UNCHANGED. This wave adds a co-located `hidpi 17` — note that 17
  is the SEPARATE amortised-hi-DPI ceiling, NOT a violation of the 15px standard-density budget band (the
  band governs standard density; the hi-DPI restore is explicitly above it, `light-dark.css:24-28`).
- `glass-deep.css:45` "Apple product tiers: blur(14-20px)" — a reference RANGE (Apple's band), not a
  glass-ui rung; both endpoints hold. (The immersive 14 minted here coincides with the low endpoint — a
  coincidence, NOT a binding; do not re-source this range to the token.)

**Class B — UNIVERSAL-CLAIM.** A prose sentence that quantifies over the WHOLE ladder ("every overlay
surface", "the whole ladder", "no rung exceeds X"). RULE: a universal claim must be RE-VALIDATED (proven
still TRUE) against the post-derivation structure, not merely value-swept — a structural change can falsify
a universal even when no value moves. Live instances:
- `light-dark.css:28-29` "every overlay surface that reads `--glass-blur-overlay-radius` inherits the
  restored value automatically" — after Contract 2 the @media arm sources `--glass-blur-overlay-hidpi-radius`;
  the universal STILL holds (every overlay surface reads the same `--glass-blur-overlay-radius`, which the
  @media re-points). RE-VALIDATE: TRUE. Reword only to name the hi-DPI token as the source.
- `glass.css:118` "no rung saturate exceeds [the 1.8 deep ceiling]" — a universal bound; this wave touches no
  saturate, holds trivially. (Named so a challenge does not re-open it.)

Enumeration here is a FLOOR, not a ceiling: at implementation, a repo-wide grep across `src/styles/**` +
`src/components/**/*.css` for the four blur literals AS PROSE (`17px`, `14px`, `34px`, the `::backdrop`/
`top-layer-backdrop` mention) AND the minted token NAMES (`--glass-blur-overlay-hidpi-radius`,
`--glass-blur-backdrop-radius`, `--glass-blur-immersive-radius`, `--glass-blur-sheet-edge-radius`,
`--top-layer-backdrop-blur`) re-points any adjacent value-prose to the token source. Process rule, not a
minted gate (the no-minted-gates ruling stands).

## §Acceptance (born-RED differential; no minted gate)

Gate ruling (user, 2026-07-16 — binding, inherited from subtlety): NO minted proof/gate script, no census
tool, no CI line. Standing checks = the dev toolchain only (typecheck · library build · demo production
build · the focused unit set). A one-time RED→GREEN differential inside the wave commit replaces any
permanent gate.

- **`vue-tsc`** — no type surface changes (CSS token indirection only). Green.
- **Focused `vitest` — NEW `tests/styles/glass-ladder-derive.test.ts`, BORN-RED at HEAD → GREEN after.**
  Source-resolution (read CSS from disk, substitute `var()`/`--glass-level`, assert the resolved OUTCOME —
  the existing `glass-subtlety.test.ts` pattern), each row asserting BOTH the resolved value AND that the
  consuming site reads a token. **Honest scope of the proof:** this harness does NOT run `getComputedStyle`,
  does NOT apply `@media (min-resolution: 2dppx)`, and cannot observe `::backdrop` paint (the happy-dom
  shim does not paint). For a pure `var()` indirection the deterministic source-resolution substitution IS
  the adequate,
  honest proof — `::backdrop` and the retina `@media` arm are not live-computed-style-observable in the unit
  harness; the substitution graph is what is proven, backed by H1's on-disk evidence that `::backdrop`
  already resolves `:root` customs and paints. Each row:
  1. Row 6 — `--glass-blur-overlay-hidpi-radius` resolves 17px; light-dark.css @media reads
     `var(--glass-blur-overlay-hidpi-radius)`. RED at HEAD (no token; bare `17px`).
  2. Row 8 — `--top-layer-backdrop-blur` resolves through `var(--glass-blur-backdrop-radius)` to 7px;
     `animations.css:269` reads `blur(var(--top-layer-backdrop-blur))` with NO numeric fallback. RED at HEAD.
  3. Row 9 — `--glass-blur-immersive-radius` resolves 14px; `drawer/styles.css:371` reads
     `blur(var(--glass-blur-immersive-radius))`. RED at HEAD (bare `blur(14px)`).
  4. Row 10 — `--glass-blur-sheet-edge-radius` resolves 34px; the FORM 1 `glass-graded-halo` rule
     (`placement.css:113` at HEAD) reads `blur(calc(var(--glass-blur-sheet-edge-radius) * var(--glass-level)))`.
     RED at HEAD.
  5. Byte-identical fence — each resolved radius equals its pre-wave value (17/7/14/34).
- **Test-coupling the wave OWNS** — `glass-subtlety.test.ts:84-87` string-matches
  `--glass-blur-overlay-radius === "17px"` in light-dark.css; Contract 2 makes that source `var(…)`, so the
  assertion must move to resolve-through-indirection (or into the new file). The OUTCOME (17px on retina) is
  unchanged; only the source-form assertion follows the structure.
- **`npm run build` + demo production build** — the `:root` composites re-bake off the same primitives (the
  new tokens are read via `var()`, the `::backdrop` reads its own co-located `--glass-blur-backdrop-radius`
  rung); green by construction.
- **Regression floor** — the wash floor (1px), the deep ceiling (16px), quiet/resting/floating/overlay
  (7/7/11/11), saturate/opacity/tint/brightness/rim/specular/shadow all UNCHANGED; the dark arm reads the
  same primitives (it has no separate ::backdrop/immersive/sheet/retina arm — the four literals are
  mode-invariant single-arm values); `tests-visual/adaptive-glass.spec.ts` untouched.

Future-drift prevention is STRUCTURAL (co-location makes the census a grep of the glass.css primitives block
— there is nowhere to put a new backdrop-blur literal that the ladder table is not the natural home for),
NOT a standing CI scan. The tests pin the four KNOWN sites; the structure prevents the fifth. Stated honestly.

## §Obligations

- RE-PIN every line number against real HEAD at execution (durable = file + symbol).
- Update `glass-subtlety.test.ts:84-87` to resolve row 6 through the new indirection (the byte-identical
  outcome is preserved — the wave owns the source-form coupling, not a value change).
- **Intra-tranche sequencing — SETTLED (`BI.W-GRADED-BACKDROP` landed FIRST).** GRADED-BACKDROP has already
  landed (commits `24b63d01`/`189ae15c`/`71892b9e`): it renamed the side-sheet slot `dialog-graded-edge` →
  `glass-graded-halo`, reworked `placement.css`, and left the FORM 1 34px value byte-stable and NOT tokenized.
  Contract 4 therefore RE-PINS onto the `glass-graded-halo` home as it now exists — it co-locates the 34px
  into `--glass-blur-sheet-edge-radius` on the landed FORM 1 rule (no re-literalizing, pure synergy). The
  three `--glass-halo-*` tokens minted by that wave (the FORM 2 box-following bloom, name-locked jointly with
  `BI.W-ENGAGE-AFFORD`) are OUT of this wave's scope.
- External consumers (atlas/slides): no coordination needed — this is a source-only structural cut, resolved
  paint is byte-identical, so no consumer is shifted (adverse or otherwise). **Zero external consumer impact
  by construction** (values change ZERO). The one coordination that DID exist was the intra-tranche
  GRADED-BACKDROP ordering above; it is resolved.
- The RIDER (`property-regs.css:286` saturate 1.5→1.8) rides this commit as a labeled comment-only true-up,
  fenced from the four contracts.
- MIGRATION.md — this lands in the post-tag STRUCTURAL WINDOW (the major that opens after the 7.0.0
  values-only cut ships, NOT the 7.0.0 calm cut subtlety fenced this out of). Note for that section: "Blur
  ladder fully co-located — the high-DPI overlay ceiling (`--glass-blur-overlay-hidpi-radius`), the native
  `::backdrop` radius (`--glass-blur-backdrop-radius`), the immersive scrim (`--glass-blur-immersive-radius`),
  and the side-sheet graded edge (`--glass-blur-sheet-edge-radius`) now co-locate in the glass.css ladder
  table; every consumer `var()`-tracks. No value change (byte-identical resolved paint); no API/token-name
  removal. Four new `--glass-blur-*-radius` primitives a consumer may retune." (New public token names are
  ADDITIVE, not a break.)

## §Dispositions

- **Contract 1 (row 8 ::backdrop): BUILD — CO-LOCATE** as `--glass-blur-backdrop-radius: 7px`; NOT a bind to
  the resting rung (value coincidence ≠ binding — c1 ruling); drop the inline `7px` fallback.
- **Contract 2 (row 6 retina): BUILD — CO-LOCATE** as `--glass-blur-overlay-hidpi-radius` (arithmetic
  derivation REFUTED: self-reference blocker + no clean invariant, HARDEN H2).
- **Contract 3 (row 9 immersive): BUILD — CO-LOCATE** as `--glass-blur-immersive-radius`; makes the phantom
  subtlety grep-target real.
- **Contract 4 (row 10 sheet-edge): BUILD — CO-LOCATE** as `--glass-blur-sheet-edge-radius` onto the landed
  `glass-graded-halo` FORM 1 home; level+saturate held.
- **Rows 2-5 / row 7 deep: OUT** — already ladder primitives (rows 2-5 cascade; deep tokenized + frozen).
- **GRADED-BACKDROP `--glass-halo-*` cohort: OUT** — that wave's own FORM 2 tokens, name-locked with
  ENGAGE-AFFORD.
- **Regen script: REJECTED** (extreme parsimony — `var()` is one-source natively, HARDEN H3).
- **property-regs saturate prose: RIDER** — carried as a labeled comment-only true-up, not a contract (HARDEN H4).
- **Tests rows 8/9/10: PINNED** — the drift-prone untested class gets a born-RED source-resolution differential.
- **Scope fence: values change ZERO** — pure structural co-location, byte-identical resolved paint, zero
  external consumer impact by construction.

## §Two-challenge gate note

Formed under the triumvirate dispatch: RESEARCH (read-only census of the blur ladder's structure — the four
hand-literals, the self-reference blocker, the enter-blur precedent, the absent regen pipeline, the phantom
`--glass-blur-immersive` grep-target) → HARDEN (refute-default: PROVED the `::backdrop` var-resolution on
disk, REFUTED arithmetic derivation for row 6 on two grounds, REJECTED the regen script, ruled the
property-regs prose a rider, drew the test contract for the untested rows). This doc is a PROPOSAL; it is
NOT registered or implemented.

**Challenge seat 1 (2026-07-17) — FAULTED, five mustFix applied (this doc is the round-2 recast):**
c1 ruled the row-8 DERIVE a semantic overreach (the token was minted at 8px when quiet/resting were 10/12px;
the census gave `::backdrop` its own row with a BLANK peerage note; a value coincidence is not a binding).
The five mustFixes are folded in: (1) Contract 1 recast DERIVE→CO-LOCATE (mint `--glass-blur-backdrop-radius:
7px`, no bind to resting); the fallback-drop and byte-identity stay (both orthogonal, verified CLEAN).
(2) RESEARCH line 74's false "historically 8 = quiet/resting 8" corrected with a dated retro-truth marker.
(3) the "provable by computed-style comparison" overclaim reworded to source-resolution byte-identity (the
`::backdrop` + retina `@media` arm are not live-computed-observable in the unit harness). (4) the intra-tranche
sequencing with `BI.W-GRADED-BACKDROP` written as settled (it landed first; Contract 4 re-pinned onto the
`glass-graded-halo` home; "Coordinate NOTHING" corrected). (5) tag placement ruled POST-TAG structural window.
c1 confirmed CLEAN as-derived: the row-6 arithmetic refutation, the self-reference blocker, the phantom-token
claim, the minted naming, the saturate rider, the test-break claim, the `::backdrop` mechanical var-resolution,
and the fallback-drop safety.

**[CORRECTION 2026-07-20]** "Awaiting challenge seat 2" is stale: seat 2 ran and the
proposal was recorded two-consecutive-clean at `2a6d1d41` (2026-07-17, "formed
two-challenge-clean, ruled post-tag"). Nothing is awaited.
