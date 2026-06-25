# WAVE-AMENDMENT — design-language-edicts → the concrete tranche amendment

> The CONCRETE wave amendment for the `design-language-edicts` item (ledger §6 row 0):
> which existing `docs/tranches/BD/union/waves/` specs to AUGMENT / UPDATE / PRUNE / EXCISE,
> and the NEW wave to author — each referencing `GOLDEN.md` (as folded by `DELTA-ASSAY.md`)
> as the reference implementation, with a real born-RED gate. Reconciled against the extant
> 116-wave union set — NO duplicative work. The DESIGN.md amendment is the UNION path of
> `DELTA-ASSAY.md §3`, with the six challenge hardenings (D1–D7) folded.

---

## 0. The reconciliation verdict (why ONE new wave, not a re-spec of an existing one)

Grep of all 116 union waves for `DESIGN.md|design.md|§L4|cartoon-punch|motion-weight|§L6|§L7`:
five waves touch design.md, but NONE amends the **precept STRUCTURE**:

- `W-ANIM-IOS27-TUNE` — re-calibrates the motion *tokens* (springs/squish), cites design.md as
  north-star but does not re-tier §L4 or add a curve.
- `W-GLASS-ABROGATE-GRAY` — re-floors the glass *material* tokens, cites design.md six-layer
  composite but touches no precept.
- `BD.W-DESIGN-LANGUAGE-CONGRUENCE` — wires paper/type/golden onto DEMO surfaces + a demo-
  congruence gate; DOWNSTREAM of the precept, amends zero DESIGN.md prose.
- `BD.W-PRECEPT-CANON` — zero-pixel doc/disposition/LESSONS-backfill layer; explicitly NOT a
  DESIGN.md precept amendment.
- `W-DOCK-CORE`/`W-NAV-DOCK-FIX`/`W-GOO-CAROUSEL-DECK` — incidental design.md mentions, no
  precept work.

So the **gap is real**: the §L4 re-tier, the `--ease-cartoon-punch` token, the cel-ink register,
the §L6 (proportion) + §L7 (cross-engine) new precepts, the φ-radius reframe — the entire
edit to `DESIGN.md`'s precept vocabulary — is owned by NO wave. The amendment is therefore:
**1 NEW wave** (owns the DESIGN.md amendment + the two-file born-RED gate + the two small build
primitives) + **2 AUGMENTs** (cite-the-precept back-refs on the design.md-touching waves) +
**1 RECONCILE note** (the carousel observer-carve, explicitly preserved) + **0 PRUNE/EXCISE**
(no wave is made redundant — the encoders stay; they gain a precept to cite).

---

## 1. NEW WAVE — `BD.W-DESIGN-PRECEPT-AMENDMENT`

**File to author:** `docs/tranches/BD/union/waves/BD.W-DESIGN-PRECEPT-AMENDMENT.md`
**Band:** 0 (FOUNDATIONS — the precept source, FIRST; every component/viz/page wave cites it
downstream). **Depends:** NONE inbound (a Band-0 precept-source wave authorable now). **Lands
BEFORE** the §L4/§L6/§L7-citing component waves re-ratify.
**Reference implementation:** `docs/tranches/BD/greenfield/design-language-edicts/GOLDEN.md`
(as folded by `DELTA-ASSAY.md §2–§3` — the D1–D7 corrections are BINDING; the raw GOLDEN
mechanisms are NOT shipped verbatim where a challenge landed).

### The ask
`DESIGN.md`'s §L precept block contradicts three of the five binding edicts at HEAD (verified):
§L4:130 ships "Weak tier — we don't ship these" (anticipation/arc/staging/secondary disclaimed)
+ §L4:127 cites the phantom `useSpringOrchestrator`; §Shadows:349-359 prose shows raw
`rgba(0,0,0,…)`; there is no proportion precept (radius is arbitrary px) and no cross-engine
precept (the Safari floor is scattered). The wave AMENDS the precept vocabulary so every edict
is a NAMED precept over LIVE substrate — KISS/DRY, no new engine beyond two small primitives,
no legacy.

### The mechanism (DESIGN.md edits — DELTA-ASSAY §3, D1–D7 folded)
1. **Philosophy** — "Four → Five principles"; add the proportion + iOS-27-canon pillar (GOLDEN §2a).
2. **§L preamble** — "Five → Seven precepts"; name the IOS27-REFERENCE.md T1–T17 measured floor (§2b).
3. **§L2** — name the cartoon curve's home as a **CSS `--ease-*` token, not a spring/`MOTION_CURVES`
   row** (D1).
4. **§Easing** — add `--ease-cartoon-punch` as a raw `linear()` with a **negative anticipation
   leg + a MONOTONE-after-peak tail** (D1+D2): e.g. `linear(0, -0.012, -0.038 33%, 0 42%, 0.62,
   0.93, 1.12, 1.22 66%, 1.12, 1.06, 1.025, 1.008, 1.001, 1)` — first stops < 0, peak 1.22, NO
   sub-1.0 reversal after the peak. Explicitly "no JS twin; not a `MOTION_CURVES` row" (the curve
   table is the closed `"spring"|"bezier"` union — `curves.ts:35`).
5. **§L4** — REPLACE the strong/medium/weak body (DESIGN.md:109-138) with the two-tier
   **Universal / Scene-orchestrated** model under *Liquid-Weight-Universal*; `--motion-weight`
   driver-scoped; every Disney principle cites a live primitive; DELETE the disclaimer + the
   `useSpringOrchestrator` phantom citation (GOLDEN §2e).
6. **§Shadows → cel-INK register** (D3+D4): warm-tinted via the shared `--shadow-color`≡
   `--foreground` ramp (opaque INK, not glass — dark-mode cream `hsl(30 14% 90%)`, light-mode
   ink `hsl(24 10% 10%)`; this is design-CORRECT for a 1940s cel line, NOT the gray-glass
   defect); the carrier is `<Card surface="cartoon">` + the `cartoon-surface` `@utility`
   (`cards.css:178`), NOT the retired `<CartoonCard>`/`.glass-cartoon`; the MOVING cast is a
   **named build-owed ink-caster pseudo** (a `::after` on `cartoon-surface` painting the offset
   planes once, `transform`-animated by `--motion-weight`, compositor-only, never animated
   `box-shadow`); **retire** the orphaned raw `--shadow-cartoon-color{,-soft}` primitives
   (`shadow.css:88-89`, no consumer — NO LEGACY).
7. **NEW §L6 — Aristotelian Proportion**, framed **"φ-FAMILY-anchored, optically tuned"** (D5):
   type √φ (the proven exemplar); radius = small √φ-region rungs + the documented optical
   anchors `--radius-xl: 12` / `--radius-2xl: 16` (carve, like the 1px hairline); the
   **concentric rule** (`r_inner = r_outer − gap`) is the enforceable law; correct `--radius` to
   the live `0.625rem`; DELETE the false √φ-ladder derivation column.
8. **NEW §L7 — The Cross-Engine Floor** (D6): the CORRECTED sRGB mechanism — "WebKit renders
   SVG-filter compositing in sRGB *regardless of* `color-interpolation-filters` (cite
   `WatercolorDot.vue:150` + the goo-filter README bug-136418); declare `sRGB` so Chrome/FF match
   Safari's forced-sRGB neck" (acknowledge the `WatercolorDot.vue:176` decorative `linearRGB`
   exception); the SPLIT `backdrop-filter:url()` rule — **forbidden** as the goo-MERGE mechanism
   (WebKit bug 245510), **sanctioned `@supports`-gated** for the `glass-refract` refraction
   enhancement IFF it ships an un-gated blur floor (so `useGlassRenderer.ts:203` /
   `glass-refract.css:106` stay conformant, not born-legacy); the paint-cost fence; the
   measurable metaball-waist metric; the paired-engine π acceptance bar.
9. **Cross-ref housekeeping** — §L5 cross-references + the line-164 "name which tier" sentence
   gain §L6 + §L7 (GOLDEN §2h tail).

### The two small build primitives (the only `src/` paint — everything else is doc)
- **`--ease-cartoon-punch`** — a raw `--ease-*` CSS custom property in the easing token file
  (no `MOTION_CURVES` row, no JS twin).
- **The ink-caster pseudo** — a `::after` on the `cartoon-surface` `@utility` (`cards.css`) that
  paints the offset planes + a `transform`-driven moving cast scaled by `--motion-weight`,
  compositor-only, PRM → static.
- **The `--motion-weight` cascade obligation** — author each cartoon channel
  (squish/overshoot/anticipation/arc/stagger) as `calc(base * var(--motion-weight))` at its
  token home so the PRM-zero propagates; derive the dock-scoped `--dock-stagger-step`
  (`shell.css:53`) FROM a new global `--stagger-step` (one token, dock reads the global — NO
  LEGACY rename). *(This obligation is shared with the BE motion encoders — see §2.)*

### The gate — `proof:design-precept` (born-RED → GREEN; a TWO-FILE gate, D7)

**(a) `scripts/proof-design-precept.mjs` (doc-string arm, `tags: ["local","ci"]`)** — the
corrected `golden/gate.sh` greps, comment-strip-safe, exported pure detector for the bites:
- **PR1** — the §L4 disclaimer is DELETED: `"Weak tier — we don't ship these"` and `"do not
  have first-class glass-ui substrate"` ABSENT (born-RED — both at `DESIGN.md:130,132`).
- **PR2** — `--ease-cartoon-punch` exists in §Easing with a `linear()` whose **first stops are
  negative** AND **peak > 1.10** AND **no sample < 1.0 after the peak** (the monotone-after-peak
  tail, D2) AND it is NOT in `SPRING_PRESETS`/`MOTION_CURVES` (`grep "ease-cartoon-punch"
  curves.ts springPresets.ts` → ∅; the ≤10% fence intact). Born-RED (no curve at HEAD).
- **PR3** — §Shadows cartoon prose names the **cel-ink ramp** (`--shadow-color`/`--foreground`),
  NOT raw `rgba(0,0,0`; AND the orphaned `--shadow-cartoon-color`/`-soft` raw-black primitives
  are RETIRED (`grep "shadow-cartoon-color.*rgb(0 0 0" shadow.css` → ∅). Born-RED (the prose is
  raw rgba + the primitives ship at `:88-89`).
- **PR4** — `§L6 — Aristotelian Proportion` + `§L7 — The Cross-Engine Floor` exist; "Seven
  precepts"; "Five principles"; the cross-references + line-164 name §L6/§L7. Born-RED.
- **PR5 (the carrier/phantom guard, D3)** — the cartoon register names `<Card surface="cartoon">`
  / `cartoon-surface`, NOT the retired `<CartoonCard>`/`.glass-cartoon`; `useSpringOrchestrator`
  + `offset-path` appear ONLY as forward-refs (the §1 phantom-discipline carried into the doc).
- **PR6 (the §L7 mechanism-honesty guard, D6)** — §L7 does NOT contain the inverted phrase
  `"WebKit defaults to linearRGB"`; it DOES cite `WatercolorDot` + the split
  `backdrop-filter:url()` rule (forbidden-for-goo / `@supports`-gated-for-refract). Born-RED if
  the GOLDEN's inverted prose ships verbatim.

**(b) `scripts/proof-design-precept-engine.mjs` (paired-engine π arm, `tags: ["local"]`,
backstopped on CI by `proof:live-verified-ledger`)** — Playwright **Chromium AND WebKit** both
load a `--ease-cartoon-punch` surface + a goo merge surface on `:5173`:
- **PE1** — the cartoon-punch `translateY` frame-series shows a **sub-zero anticipation dip**
  before launch in BOTH engines (RED on a monotone-approach spring), and **no sub-rest reversal
  after the peak** (the D2 monotone tail).
- **PE2** — the goo merged-waist alpha cross-section between the two centers stays above the
  threshold for **≥ N px** (a connected neck) in BOTH engines — RED if alpha-disconnected at any
  merge frame (the naive-ellipsoid signature, challenge2 R5) OR if the WebKit neck ΔE-diverges
  from Chromium beyond tolerance (the linearRGB-mismatch the corrected §L7 forbids).
- **PE3** — under `emulateMedia({ reducedMotion: 'reduce' })`: the cartoon-punch collapses to
  `--ease-standard` (no dip frames) and the goo does an instant topology swap (zero neck frames)
  in BOTH engines.

**Self-test bites (each planted defect MUST red):** (a) the disclaimer re-inserted → PR1 RED;
(b) the cartoon curve added to `MOTION_CURVES` / `SPRING_PRESETS` → PR2 RED (the engine-change
guard, D1); (c) a tail sample < 1.0 after the peak → PR2 RED (the springy-settle guard, D2);
(d) `<CartoonCard>` named as carrier → PR5 RED (the phantom guard, D3); (e) the "WebKit defaults
to linearRGB" prose → PR6 RED (the inverted-mechanism guard, D6); (f) a synthetic naive-ellipsoid
goo (blur too low, no neck) → PE2 RED in both engines; (g) a single-engine green submitted as
proof → the gate requires BOTH engine logs (the paired-engine bar).

**What reds on HEAD (born-RED by construction):** PR1 (disclaimer at :130), PR2 (no curve), PR3
(raw rgba prose + raw-black primitives at :88-89), PR4 (no §L6/§L7, old counts), PR6 (the curve/
§L7 don't exist yet); PE1–PE3 (no curve, no paired fixture). GREEN only after the full amendment
+ the two primitives + the corrected §L7 land. `bash golden/gate.sh` already exits 1 today (8
RED) — the doc arm is the productionized form of that throwaway.

### The binding π — paired Chromium+WebKit capture
The `golden/cartoon-punch-verified.png` single-engine artifact is SUPERSEDED: the wave owes a
paired Chromium AND WebKit frame-series of the punch (the sub-zero dip + monotone settle in
both) + the goo waist (the connected neck in both) — the `feedback_live_verify_capture`
captured-DELTA discipline, satisfying §L7's own "never a single-engine green" bar.

### Fences
- **No new engine beyond the two small primitives.** The §L4 re-tier ships ZERO new engine (the
  cited composables all exist); the cartoon curve is a raw CSS token (not a `MOTION_CURVES`
  engine extension — D1); the moving cast is a pseudo on the extant `@utility` (not a forked
  component — D4). A `MOTION_CURVES` row for the cartoon curve REDs PR2 (the KISS guard).
- **The spring fence is INVIOLATE.** Overshoot ∈ [0%,10%] in `SPRING_PRESETS` untouched; the
  cartoon punch lives OUTSIDE it (a register, not a spring).
- **NO LEGACY.** The orphaned raw-black `*-color` primitives + the false √φ-ladder framing + the
  retired `<CartoonCard>` reference are all RETIRED, not aliased.
- **Driver-scoped `--motion-weight`.** The T13 carousel observer-carve survives (RECONCILE
  note §3); liquid-weight is universal on DRIVERS, not every pixel.
- **Paired-engine acceptance (the §L7 self-application).** The cross-engine precept proves
  itself with a paired-engine π, never a single-engine green.

---

## 2. AUGMENT (×2) — the design.md-touching waves gain a cite-the-precept back-ref

No mechanism change; each gains ONE sentence pointing at the new precept so the precept-source
relationship is explicit (DRY: the encoder cites the precept, never re-states it).

- **`docs/tranches/BD/union/waves/W-ANIM-IOS27-TUNE.md`** — AUGMENT its north-star line: the
  motion re-calibration is the §L2/§L4 *encoder*; cite `BD.W-DESIGN-PRECEPT-AMENDMENT` (the §L4
  Universal/Scene re-tier + the `--ease-cartoon-punch` register it tunes against). It ALSO owns
  its share of the `--motion-weight` cascade obligation (authoring its squish/overshoot channels
  as `calc(base * var(--motion-weight))` — §1 build primitive 3). The `proof:spring-ease`
  re-baseline is unchanged.
- **`docs/tranches/BD/union/waves/W-GLASS-ABROGATE-GRAY.md`** — AUGMENT its north-star line: the
  glass-material re-floor is the §3/§L1 *encoder*; cite `BD.W-DESIGN-PRECEPT-AMENDMENT` (the §L7
  cross-engine floor governs its `@supports`-gated `glass-refract` arm — the corrected
  sanctioned-with-fence rule, D6). `proof:no-gray` unchanged.

---

## 3. RECONCILE (×1) — the carousel observer-carve is PRESERVED, not contradicted

- **`docs/tranches/BD/union/waves/W-GOO-CAROUSEL-DECK.md`** (+ the carousel cadence behaviour
  the ledger row B `carousel/deck/pager-dots` tracks) — the new §L4 *Liquid-Weight-Universal*
  law is **driver-scoped**; an OBSERVER content-snap (a carousel settling under the user's
  scroll) stays calm-overdamped (T13: an over-springy carousel reads cheap). This wave is NOT
  contradicted — it is the honest observer carve the new §L4 explicitly names. NO edit owed; the
  reconciliation is recorded here so a future reader does not "fix" the carousel to be bouncy.

---

## 4. PRUNE / EXCISE — NONE

No union wave is made redundant by the amendment. The encoders
(`BE.W-ANTICIPATE-FOLLOW`, `BE.W-CELEBRATE-BURST`, `BD.W-CONCENTRIC-RADIUS`,
`W-DOCK-SCROLL-FISSION`, `BD.W-DESIGN-LANGUAGE-CONGRUENCE`, `BD.W-PRECEPT-CANON`) all stay — they
implement pieces of the edicts and now have a precept to cite. The amendment ADDS the precept
source they were missing; it removes only DESIGN.md prose-lies + orphaned tokens, none of which
is a wave.

**Citation hygiene (challenge1 R2, applied across the GOLDEN + this amendment):** every
`BD.W-*`/`BE.W-*` cite resolves to a real path. `BD.W-CONCENTRIC-RADIUS` →
`docs/tranches/BD/union/waves/BD.W-CONCENTRIC-RADIUS.md` (the top-level
`docs/tranches/BD/waves/BD.W-CONCENTRIC-RADIUS.md` does NOT exist — do not cite it).

---

## 5. THE AMENDMENT AT A GLANCE

| Action | Target | What |
|---|---|---|
| **NEW** | `BD/union/waves/BD.W-DESIGN-PRECEPT-AMENDMENT.md` | the DESIGN.md precept amendment (§L4 re-tier + cartoon-curve token + cel-ink register + §L6 φ-proportion + §L7 cross-engine) + `proof:design-precept` two-file born-RED gate + 2 small primitives (the `--ease-*` token + the ink-caster pseudo) |
| **AUGMENT** | `BD/union/waves/W-ANIM-IOS27-TUNE.md` | cite the §L2/§L4 precept; own its `--motion-weight` cascade share |
| **AUGMENT** | `BD/union/waves/W-GLASS-ABROGATE-GRAY.md` | cite the §3/§L7 precept (the `@supports`-gated glass-refract floor) |
| **RECONCILE** | `BD/union/waves/W-GOO-CAROUSEL-DECK.md` | record the driver-scoped observer-carve (no edit) |
| **PRUNE/EXCISE** | — | NONE |

Net: **+1 wave**, the union set goes 116 → 117. The new wave is Band-0 (the precept source,
FIRST), so it lands before every component/viz/page wave re-ratifies against the amended §L.
