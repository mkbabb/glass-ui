# PT-5 — New-token substitution/dead-knob discipline + a single catching gate

**Pass:** 1 · **Mode:** corrected-approach spec · **Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `4c761b64`
**Targets:** C3 [MOD-HIGH] — friction class **K** (substitution-vs-inheritance / dead-knob), 3rd–4th recurrence, **no single catching gate**, rides 8+ new-token waves.
**Author:** prototype agent (spec) · **Scope:** READ-MOSTLY; findings + amendment only (no src/demo/scripts/CLAUDE.md edits)
**Feasibility:** the fix HOLDS — the discipline is already proven correct in-codebase per-token; the gap is that each new token re-derives it from scratch and the class has no library-wide enforcer. The amendment is a plan-write + one new device-free gate, no feasibility blocker.

---

## 0. Why this class keeps biting (the anatomy the build-map never states)

Class K is not one bug, it is two failure modes over a shared substrate (CSS custom-property substitution semantics). Both have shipped in this repo:

**Failure mode 1 — the dead-knob (a derived token frozen at `:root`).** A custom property `--A` substitutes its `var()` refs *at its declaring element*. If a DERIVED token reads a knob token only at `:root`, a descendant override of the knob never re-flows into the derived value:

```css
:root { --dock-scale: calc(var(--ui-scale) * var(--dock-local-scale, 1)); }   /* frozen here */
@media (pointer: coarse) {
  .glass-dock[data-density] { --dock-local-scale: 0.78; }                       /* descendant override */
  /* WITHOUT re-declaring --dock-scale here, the geometry cascade reads the :root-frozen --dock-scale → knob is DEAD */
}
```
Fix (shipped, `proof:ui-scale` witness `dock-coarse-redeclares-scale`, R5-1): **re-declare the derived token on the scope where the knob is overridden**, the formula byte-identical.

**Failure mode 2 — the pre-substituted derived peer (a `color-mix`/composite baked at `:root`).** A surface that reads a `:root`-composed derived token (`--glass-bg-dock`) does NOT pick up a per-scope re-point of the *input* the composite folded in (`--glass-tint-source`/`--glass-tint-strength`), because the `@container style()` bucket re-points the input on the descendant while the bucket-reached darken was meant to land in the inner mix. `--glass-bg-dock` bit this at AZ; `--glass-bg-{tier}` was the same shape at BB.W-CARD-TIER-ALPHA. Fix (shipped, `dock/shell.css:146-158`): **compose the recipe AT THE ELEMENT** (read the raw rung + re-apply the input), or re-declare the composed token on the scope (`proof:card-tier-alpha` T5/T6 records the seam).

**The recurrence ledger (the class never had a single home):**

| # | Wave | Token | Mode | The catcher that landed (token-LOCAL, never reusable) |
|---|---|---|---|---|
| 1 | AX.W55 | `--glass-backdrop` self-declare | 1 (style-query never self-matches) | prose note in `dock/morph.css` |
| 2 | AZ-dock-scale | `--dock-scale`/`--dock-local-scale` | 1 (frozen-at-`:root`) | `proof:ui-scale` `dock-coarse-redeclares-scale` (R5-1) |
| 3 | AZ→BB `--glass-bg-dock` / `--glass-bg-{tier}` | derived plate bg | 2 (pre-substituted peer) | `proof:card-tier-alpha` T5 (asserts the PROSE is recorded), `dock/shell.css` element-mix |
| 4 | BB-dark-arm `--surface-tint-*` | dark ink derive | 2 (per-rung literal a `--foreground` re-point can't reach) | `proof:no-gray` `dark-surface-tint-foreground-derived` |
| **5 (BG, NOW)** | `--siri-island-t`·`--glass-key-direction`·`--dock-surface-blur`·`--glass-depth`·`--glass-btn-press-t` | mixed | mixed | **NONE — this is the gap** |

Every prior fix was a token-LOCAL witness welded into a token-SPECIFIC gate (`ui-scale`, `card-tier-alpha`, `no-gray`). The class itself was never given a single home, so wave N+1 re-derives the idiom under deadline and the live-π is the only catcher — and per C1/C8 that π is **decoupled and deferred**. This spec closes both halves: write the discipline into the new-token waves, and mint the single standing gate the class never had.

---

## 1. The token archetype taxonomy (the gate's classification spine)

The repo already speaks three coherent archetypes; the gate keys off them. Establishing the taxonomy explicitly is half the fix.

**Archetype A — cascading scalar** (registered `@property`, `inherits: true`, a host writes it on an ANCESTOR, descendants read it). Live members: `--glass-level`, `--glass-depth`, `--ui-scale`, `--motion-weight`, `--glass-btn-press-t`, `--cartoon-press-t`, `--goo-t`. New BG member: **`--siri-island-t`**.
*Discipline:* MUST be registered typed (`syntax`+`inherits:true`+`initial-value`) so a malformed override CLAMPS to the initial value rather than invalidating the whole `calc()` (the fail-safe `--ui-scale` documents at `property-regs.css:356-364`); read at the consuming element via `var()`; and any DERIVED token folding the scalar in (`--dock-scale` shape) MUST be re-declared on every scope that overrides one of its knobs (failure mode 1).

**Archetype B — per-element ownership** (registered `@property`, `inherits: false`, written AND read at the SAME element). Live members: `--specular-x/y/intensity/angle`, `--flex-vel`, `--border-progress-fill`, `--tab-blob`, `--progress-crescendo`, `--cast-travel/spread`.
*Discipline:* `inherits: false` is LOAD-BEARING (the `--flex-vel` `property-regs.css:166` subtree-storm bite — an inheriting per-frame channel re-paints every descendant). Not a dead-knob class; the gate locks the `inherits:false` so a future edit can't silently flip it to inheriting.

**Archetype C — pre-substituted derived peer** (an UNREGISTERED intermediate token whose value reads other tokens, declared at `:root`, consumed downstream). Live members: `--glass-bg-dock`, `--glass-bg-{tier}`, `--glass-under-shadow-*`. New BG members: **`--dock-surface-blur`** (G4 PEER), **`--glass-key-direction`** (WS9, the calc-input the under-shadows fold in).
*Discipline:* the value MUST stay a PURE deferred `var()` chain (every `var()` resolves at point-of-use, no eager `color-mix(...)` or resolved blur literal baked at `:root` that freezes a descendant input) — OR carry a documented element-level re-compose seam (the `--glass-bg-dock` `dock/shell.css` pattern) PLUS the recorded substitution-trap comment (the `proof:card-tier-alpha` T5 precedent). The G4 `0 orphan readers` census is the negative half; the read-at-element discipline is the positive half the spec adds.

---

## 2. Per-token verdict + the exact discipline each owes

Ground-truth-verified against `src/` this pass (line numbers exact).

### 2.1 `--dock-surface-blur: var(--glass-blur-resting)` — G4 PEER (`dock/shell.css:29,159`) — Archetype C — **SAFE shape, discipline UNSTATED**
At HEAD `--dock-surface-blur` is a pure `var()` alias (`shell.css:29`); the dock reads it at `backdrop-filter: var(--dock-surface-blur)` (`shell.css:159`), and `--glass-blur-resting` is itself a deferred `blur(calc(--glass-blur-resting-radius * --glass-level))` text. So `--glass-level: 0` (the opaque escape) AND the `prefers-reduced-transparency` bracket DO reach the dock blur today — the chain defers correctly. **The risk is regression, not the current state:** a future wave that re-bakes it into a `color-mix`/resolved literal (the exact `--glass-bg-dock` mutation, OR the BG.W-SAFARI-BLUR-LITERAL literal-emit applied to the *unprefixed* arm) silently severs the `--glass-level` reach. G4's spec says "verified 0 orphan readers" but never states the read-at-element rule — so the next editor has no fence.
*Owes:* G4 records "`--dock-surface-blur` is a PURE deferred `var()` alias chain — never a `:root`-baked `color-mix`/literal; only the `-webkit` arm (BG.W-SAFARI-BLUR-LITERAL) emits a resolved literal, value-matched to the unprefixed arm." Enrolled in the new gate as Archetype-C with the `pure-var-chain` witness.

### 2.2 `--glass-key-direction` — WS9 GU-1 (`glass-fx.css` mint, lands FIRST) — Archetype C — **SAFE-IF-DEFERRED, value-only-calc fragility**
GU-1 mints a `<number>` ratio consumed by `--glass-under-shadow-{quiet,default,vivid}` as `calc(Npx * var(--glass-key-direction))` (deferred chain → safe) AND by GRAIN-REAL's azimuth AND by WS8 bevel AND WS12 A6 spine — a four-reader cross-wave input. GU-1 deliberately uses NO `@property` (the plain `--glass-key-*` convention). That keeps it dead-knob-SAFE for the cast (deferred calc) but leaves the value-only fragility: a malformed consumer override invalidates the whole `box-shadow` (falls to none) rather than clamping. This is acceptable per the plain convention, BUT it is a DECISION that must be made at MINT and recorded, not left implicit.
*Owes (ordering fix):* the GU-1 token MINT (`glass-fx.css`, lands first per the existing WS9 sequence) records: "value-only `<number>` lean, NO `@property` (matches `--glass-key-*` convention); read deferred-at-element in `calc()` so an ancestor override reaches every under-shadow/grain/bevel reader; a malformed override invalidates the calc (the documented value-only fragility — not registered because no animation/clamp need)." Enrolled Archetype-C with the `pure-var-chain` witness + the `inherits-decision-recorded` flag.
*Cross-check:* the three under-shadow tiers must stay `calc(Npx * var(--glass-key-direction)) ...` (deferred) — a future re-bake into a resolved px literal at `:root` (the AZ shape) REDs the gate.

### 2.3 `--siri-island-t` — WS6 (`property-regs.css §18` mint) — Archetype A — **registration DISCIPLINE unstated**
BG.W-GLASS-BLUR-ENGAGE mints `@property --siri-island-t`; BG.W-SIRI-ISLAND drives 4 forms off the ONE scalar (`useSiriIsland` writes it; `SiriIsland.vue` + children read it). The build-map names the file but not the registration shape, so the `inherits` decision is undefended.
*Owes:* the scalar is the island host's cascading drive — register `@property --siri-island-t { syntax:"<number>"; inherits:true; initial-value:0 }` (the `--glass-btn-press-t`/`--goo-t` precedent: the host writes, the pseudo/children read; `inherits:true` so the host-written value reaches descendant content). The √φ-ladder geometry reads it via `var()` AT the element. The descend-scrim `filter:blur()` couples to it deferred. Enrolled Archetype-A with the `cascading-scalar-typed` witness.
*Anti-trap note for the spec:* WS6's `--siri-island-t` is NOT a derived peer (it does not fold a knob into a `:root` composite), so it owes only the registration + read-at-element half, not the re-declare-on-scope half.

### 2.4 `--glass-depth` — WS8 watch — Archetype A — **ALREADY COMPLIANT, lock against regression**
Registered correctly today (`property-regs.css:350-354`, `inherits:true`, `initial-value:1`); the deep recipe LERPs on it (`tokens/glass-deep.css:75-92`); `proof:glass-depth` D1/D4 already assert the axis. WS8 edits glass tiers around it. No new discipline owed; **enroll it to lock the existing correct registration** so a WS8 tier edit can't silently bake a deep literal (the regression `proof:glass-depth` D3 already half-guards — the new gate cross-asserts the `inherits:true` survives).

### 2.5 `--glass-btn-press-t` — WS8 second reader — Archetype A — **ALREADY COMPLIANT, JS-side reader (not a CSS-substitution risk)**
Registered `inherits:true` (`property-regs.css:444-448`). BG.W-GLASS-LIQUID-TRANSITION adds a SECOND reader that reads `press.value` in the GL uniform (a JS read off the `useSpringPress` spring, `proof:glass-liquid-transition` asserts "reads `press.value` not `getComputedStyle`"). That's a different axis (JS spring-value vs CSS token), not the substitution trap. **Enroll to lock the CSS `@property` registration** (so the CSS rules that read `--glass-btn-press-t` keep their `inherits:true` cascading reach), and note the JS-read is the press-spring's own concern owned by `proof:glass-liquid-transition`.

---

## 3. The exact wave amendments

Five waves take a one-paragraph Files/Gate addition; one new Band-0.5 wave hosts the gate. No code-mechanism changes — these are discipline-record + gate-enrollment additions.

| Wave | Band | Amendment |
|---|---|---|
| **BG.W-CLOSEFIX-9SITE** (G4) | 0.5 | Add to mechanism (b): "`--dock-surface-blur` is a PURE deferred `var()` alias chain (read-at-element, `--glass-level` reaches it); never a `:root`-baked `color-mix`/literal." Enroll `--dock-surface-blur` (Archetype-C) + `--glass-depth`/`--glass-btn-press-t` (Archetype-A, lock-existing) in the new gate's manifest. (Do NOT overload G4 with the gate itself — it is already stale/overloaded per PT-2; the gate is its own wave below.) |
| **BG.W-TOKEN-DISCIPLINE-GATE** (NEW) | 0.5 | Mint `proof:token-discipline` (§4). Lands AT-OR-AFTER G4 (so `--dock-surface-blur` exists) and BEFORE WS6/WS8/WS9 (so they extend its manifest). The standing-sweep twin of `BG.W-CLOSE-SWEEP`. |
| **BG.W-GLASS-BLUR-ENGAGE** (WS6.1) | WS6 | Files note: register `@property --siri-island-t {syntax:"<number>";inherits:true;initial-value:0}` (Archetype-A, the `--glass-btn-press-t` precedent). Gate: extend `proof:token-discipline` manifest with the `--siri-island-t` row + flip its `cascading-scalar-typed` witness RED→GREEN in-diff. |
| **BG.W-SIRI-ISLAND** (WS6.2) | WS6 | Gate note: the 4-form geometry reads `--siri-island-t` AT the element via `var()` (no `:root`-frozen derived island token). `proof:siri-island` cross-asserts `proof:token-discipline` stays GREEN. |
| **WS9 GU-1 token mint** (in BG.W-PAPER-CROSSREPO-ASKS scope, lands first) | WS9 | Record the value-only/no-`@property`/deferred-calc decision (§2.2). Enroll `--glass-key-direction` (Archetype-C) + extend manifest; flip `pure-var-chain` + `inherits-decision-recorded` RED→GREEN. |
| **BG.W-PAPER-GRAIN-REAL** (WS9.1) | WS9 | Gate note: the grain azimuth reads `--glass-key-direction` AT the filter element (deferred); the under-shadow tiers stay `calc(Npx * var(--glass-key-direction))` (a re-bake to a px literal REDs `proof:token-discipline`). |
| **BG.W-GLASS-LIQUID-TRANSITION** (WS8.5) | WS8 | Gate note: the GL second-reader reads `press.value` (JS spring), NOT `getComputedStyle`; the CSS `@property --glass-btn-press-t inherits:true` is locked by `proof:token-discipline` (Archetype-A). |

**Ordering fix (the load-bearing sequencing):**
1. `proof:token-discipline` lands in Band-0.5 (after G4, before any token-minting band). The enrollment-closure arm (§4) then forces every later `@property` mint to register a manifest row, so WS6/WS8/WS9 CANNOT skip enrollment — the durable anti-recurrence.
2. WS9's GU-1 token already "lands FIRST" in the existing plan — that ordering is correct AND now load-bearing for the gate: the under-shadow re-points read it, and the gate asserts the deferred chain the moment the token exists.
3. No band-dependency inversion: Band-0.5 < WS6 < WS8 < WS9 in the existing DAG, so the gate exists before every extender.

---

## 4. The single catching gate — `proof:token-discipline`

The class never had a home; this is it. Device-free SOURCE arm (the binding RENDER truth stays the live-π under scope/coarse emulation — §5 — exactly the `proof:ui-scale` source-vs-π split). `["local","ci","release"]` (a pure device-free src-scan belongs in the full battery — the `field-accent-reconcile`/`category-card-warm` precedent G4 already invokes). File: `scripts/proof-token-discipline.mjs`. Reads CSS via `readMonolith`/`stripCss` (the `proof:ui-scale` leaf set).

### 4.1 The manifest (in-gate, explicit, but closure-guarded against drift)

A small TABLE in the gate file, one row per enrolled token: `{ token, archetype: "A"|"B"|"C", rationale, witness }`. Hand-authored rows are a drift risk (the friction-history "hand-authored map" class) — killed by the **enrollment-closure arm** below. Seed rows (each lands with its wave's RED→GREEN flip): `--glass-depth`(A), `--glass-btn-press-t`(A), `--ui-scale`(A), `--glass-level`(A), `--motion-weight`(A), `--cartoon-press-t`(A), `--goo-t`(A), the `--specular-*`/`--flex-vel`/`--border-progress-fill`/`--tab-blob` cohort (B), `--glass-bg-dock`(C), `--glass-bg-{tier}`(C), `--glass-under-shadow-*`(C), `--dock-surface-blur`(C). BG additions: `--siri-island-t`(A), `--glass-key-direction`(C).

### 4.2 The asserts (per archetype)

**Enrollment-closure (the anti-vacuity spine — the durable anti-recurrence):**
- **TD-CLOSE-A:** every `@property --…` block in `property-regs.css` resolves to a manifest row (a NEW typed-scalar mint that isn't classified REDs — so WS6/WS8 CANNOT mint `--siri-island-t` and skip enrollment). Mirrors `proof:visual-runner`'s enroll-or-excuse closure.
- **TD-CLOSE-C:** every `:root` token whose value text reads a known knob input (`--glass-level`, `--glass-tint-source`, `--glass-tint-strength`, `--glass-key-direction`, `--ui-scale`, `--dock-local-scale`) resolves to a manifest row OR a rationale'd `INERT_INPUT_ALLOWLIST` entry (a token that reads the knob but is itself only ever consumed at-element). Catches a future un-enrolled derived peer.

**Archetype A — cascading scalar:**
- **TD-A1:** the `@property` block is `inherits: true` + carries `syntax` + `initial-value` (the malformed-clamp fail-safe).
- **TD-A2 (the dead-knob witness, generalized from R5-1):** for each derived token that folds an A-scalar AND is overridden by a knob on a scope (declared in a `DERIVED_PEERS` sub-table: `{derived, knob, scopeSelector}` — seeded with `--dock-scale`/`--dock-local-scale`/`.glass-dock[data-density]`), the scope MUST re-declare the derived token (the `dock-coarse-redeclares-scale` regex, parameterized). A new derived peer that overrides a knob without the re-declare REDs.

**Archetype B — per-element:**
- **TD-B1:** `inherits: false` (locked — a flip to inheriting REDs, the subtree-storm fence).

**Archetype C — pre-substituted derived peer:**
- **TD-C1 (`pure-var-chain`):** the token's `:root` value is a PURE deferred `var()`/`calc(... var() ...)` chain — it contains NO eager `color-mix(` and NO resolved blur/px literal that would freeze a descendant input — OR the token carries an element-level re-compose seam (a downstream rule re-composing the recipe, the `dock/shell.css:154` `color-mix(in oklab, var(--glass-bg-dock,…), var(--glass-tint-source) var(--glass-tint-strength))` shape) AND the recorded substitution-trap comment (`SUBSTITUTION-VS-INHERITANCE` regex, the `proof:card-tier-alpha` T5 precedent). `--dock-surface-blur` and `--glass-under-shadow-*` take the pure-var-chain branch; `--glass-bg-dock`/`--glass-bg-{tier}` take the element-re-compose branch.
- **TD-C2 (`inherits-decision-recorded`):** for a value-only-calc token deliberately UNregistered (`--glass-key-direction`), the mint comment records the no-`@property` decision + the value-only fragility (so the convention is a DECISION, not an accident).

### 4.3 The `--self-test` arm (planted violations, run every invocation — the house pattern, 30/30 gates carry it)

Each MUST flag, exercising a synthetic copy (never the live tree):
1. an Archetype-A scalar flipped to `inherits: false` → TD-A1 reds.
2. a new derived peer overriding a knob on a scope WITHOUT the re-declare → TD-A2 reds.
3. an Archetype-B token flipped to `inherits: true` → TD-B1 reds.
4. a `--dock-surface-blur`/`--glass-bg-dock`-shape token re-baked into a `:root` `color-mix` with no element re-compose + no recorded comment → TD-C1 reds.
5. a NEW `@property --phantom-scalar` minted but un-enrolled → TD-CLOSE-A reds.
6. a new `:root` token reading `--glass-tint-strength` un-enrolled → TD-CLOSE-C reds.

### 4.4 Born-RED anchor + registration

- **Born-RED state:** anchored to the PRE-G4 tree where `--dock-surface-blur`'s read-at-element discipline is unrecorded (TD-C1 has no recorded seam/decision for it) → GREEN at `BG.W-TOKEN-DISCIPLINE-GATE`. Each later token-minting wave adds its row and flips that row's witness RED→GREEN IN-DIFF (the same-diff born-RED→GREEN the project uses everywhere). NOT anchored to a post-fix commit (the `b3d65eec~1` lesson — anchor to the PRE-fix state).
- **gates.mjs row:** `{ id:"proof:token-discipline", cmd:"proof:token-discipline", tags:["local","ci","release"], note:"…" }`, inserted in cascade order; `gates:emit-ci` regen co-runs (the R3 `emit-ci` precedent — and per C5 the BG cadence must re-emit ci.yml in the SAME diff so `gates:verify-ci` stays green).
- **Cost:** node-direct src-scan, sub-second (the `proof:ui-scale` cost class); safe for the `--run full` battery and the per-wave cadence.

---

## 5. The verifying check (structure vs render — the cardinal split)

The gate proves the STRUCTURE (the discipline is followed); it does NOT prove the knob VISIBLY reaches the render. That binding paint truth is the live-π under scope/coarse emulation — exactly the `proof:ui-scale` note: *"the painted lockstep-growth truth is proven by the live π getComputedStyle readback, never this gate alone."* Per-token render witnesses (already in the plan, this spec only names them as the gate's π backstop):
- `--siri-island-t`: `tests-visual/siri-island.spec.ts` — the 4 forms render distinct on the ONE scalar; a host `--siri-island-t` override moves all four.
- `--glass-key-direction`: `tests-visual/paper-grain.spec.ts` warm-directional-relief JND (upper-right brighter) — an ancestor `--glass-key-direction` override flips the relief azimuth.
- `--dock-surface-blur`: the existing `--glass-level:0` opaque-escape readback (`tests-visual/glass-depth.spec.ts` collapse-to-blur(0)) confirms the dock blur still reaches `--glass-level` post-G4.
- `--glass-depth`/`--glass-btn-press-t`: `tests-visual/glass-depth.spec.ts` / `button-glass.spec.ts` (already binding).

**The decoupling caveat (cross-ref C1/C8):** these π specs `ride W-REFLECT3` today, which C1 shows is the abolished-deferral contradiction. PT-1's per-wave-self-close re-home applies here unchanged — `proof:token-discipline`'s π backstops self-close at each token-minting wave, not a phantom terminal funnel. This spec does not re-litigate C1; it inherits PT-1's fix.

**The standing-sweep value (why a gate beats N witnesses):** the enrollment-closure (TD-CLOSE-A/C) is the piece no token-local gate ever had — it makes the NEXT new-token wave (BH or a future tranche) structurally unable to mint a typed scalar or a derived peer without classifying it. The class stops being a per-wave re-derivation; the 5th recurrence is also the last that needed a hand-rolled catcher.

---

## 6. Feasibility + findings

**Feasible: YES — the fix holds.** Every discipline the gate enforces is ALREADY proven correct and live in the codebase (`--glass-level`/`--glass-depth`/`--ui-scale` registrations, the `dock/shell.css` element-re-compose, the `dock-coarse-redeclares-scale` witness). The gate is a structural src-scan in the exact mould of `proof:ui-scale`/`proof:card-tier-alpha` (both shipping, both `local`/`ci`). The enrollment-closure is the `proof:visual-runner` enroll-or-excuse pattern (shipping). No new mechanism, no device dependency, sub-second cost. The amendment is a plan-write (6 waves) + one Band-0.5 gate wave. No feasibility blocker; nothing here is on the critical path beyond Band-0.5 sequencing the gate ahead of the token-minting bands.

**Verified against source this pass (not trusted from prose):**
- `--dock-surface-blur` is a SAFE pure-var alias at HEAD (`shell.css:29,159`) — the trap is regression-risk, not current breakage; the discipline is UNSTATED so the next editor has no fence.
- `--glass-depth`/`--glass-btn-press-t` are ALREADY correctly registered (`property-regs.css:350,444`, both `inherits:true`) — enroll to LOCK, no new discipline owed.
- `--glass-key-direction` (GU-1) is a value-only `<number>` with NO `@property` by deliberate convention — the deferred-calc chain is dead-knob-SAFE; the owed item is RECORDING the no-registration decision + fragility, not changing it.
- `--siri-island-t` is the only genuinely-new Archetype-A scalar owing a fresh registration discipline (the `--glass-btn-press-t` precedent applies verbatim).
- The class has FOUR prior token-LOCAL catchers (`ui-scale` R5-1, `card-tier-alpha` T5, `no-gray` dark-tint, `dock-plate-clearance` 0px-dead-knob) and ZERO library-wide enforcer — the enrollment-closure is the missing piece.

**Key findings (for agglomeration):**
1. C3 is two failure modes, not one; the gate must carry BOTH the dead-knob (TD-A2) and the pre-substituted-peer (TD-C1) arms.
2. The anti-vacuity spine is the enrollment-closure (TD-CLOSE-A/C), not the hand-authored manifest — it forces every future scalar/peer mint to self-classify.
3. The gate belongs in its OWN Band-0.5 wave (`BG.W-TOKEN-DISCIPLINE-GATE`), NOT folded into the already-stale/overloaded G4 (PT-2).
4. Of the 5 flagged tokens, only `--siri-island-t` owes a fresh registration; the other four owe RECORD-the-discipline (so the next editor has a fence) + enroll-to-lock.
5. The render truth stays the live-π under scope/coarse emulation (inherits PT-1's per-wave-self-close re-home); the gate proves structure, never render — the cardinal split.
