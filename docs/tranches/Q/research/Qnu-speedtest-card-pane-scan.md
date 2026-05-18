# Qν (nu) — speedtest Card-variant scan + pane-equivalent pattern audit

**Scope**: speedtest (`/Users/mkbabb/Programming/speedtest`) consumer-side audit for `<Card variant="pane">` survivors and hand-rolled pane-equivalent patterns. Inherits Qα (the value.js 11-site `variant="pane"` silent-swallow finding), Qι (the bbnf-buddy 7-site fold-in: 6× `variant="pane" flush` + 1× `variant="default|cartoon"`), and Qλ's "cleanest consumer in fleet" verdict on speedtest. The question is narrower: did Qλ's broad sweep miss a pane-class consumption inside speedtest?

**Charter quote**: "value.js's card pane variants are critical, and should see usage in speedtest, no? Ensure. The pane variant should properly be folded back in, or an idiomatic solution derived."

---

## Section 1 — Every `<Card>` use-site in speedtest

`grep -rn '<Card' /Users/mkbabb/Programming/speedtest/src/` returns 13 sites. Each is reproduced with the exact prop signature at HEAD (`master`).

| # | File:line | Prop signature (verbatim) | Tier resolution |
|---|-----------|---------------------------|-----------------|
| 1 | `src/components/speedtest/SpeedtestResults.vue:23` | `<Card tier="quiet" as="section" class="results-card meter-card" :data-complete=… :data-engine-state=…>` | `quiet` |
| 2 | `src/components/admin/AdminSessionsTable.vue:98` | `<Card class="overflow-hidden">` | default `resting` |
| 3 | `src/components/dashboard/charts/MetricGaugeCards.vue:3` | `<Card v-for="card in cards" :key="card.key" class="metric-card p-4" :style="{ '--metric-color': card.color }">` | default `resting` |
| 4 | `src/components/survey/SurveyReview.vue:3` | `<Card v-for="step in reviewSteps" :key="step.id" tier="wash" :grain="false" class="p-6">` | `wash` |
| 5 | `src/components/survey/SurveyWizard.vue:17` | `<Card tier="resting" as="section" class="survey-wizard-card flex min-h-0 w-full max-w-lg flex-1 flex-col overflow-hidden">` | `resting` (explicit) |
| 6 | `src/components/survey/ThankYou.vue:2` | `<Card tier="floating" as="section" class="thank-you-card mx-auto w-full max-w-lg overflow-y-auto overscroll-contain">` | `floating` |
| 7 | `src/views/AdminLoginView.vue:4` | `<Card tier="floating" class="w-full max-w-sm p-6 text-center">` | `floating` |
| 8 | `src/views/AdminOverviewView.vue:10` | `<Card class="p-4">` (date-range strip) | default `resting` |
| 9 | `src/views/AdminOverviewView.vue:33` | `<Card class="p-4">` (30-day trend) | default `resting` |
| 10 | `src/views/AdminOverviewView.vue:41` | `<Card class="overflow-hidden">` (recent tests preview) | default `resting` |
| 11 | `src/views/ChartsView.vue:17` | `<Card class="h-full p-4">` (TimeSeriesChart wrap) | default `resting` |
| 12 | `src/views/ChartsView.vue:28` | `<Card class="h-full p-4">` (DistributionChart wrap) | default `resting` |
| 13 | `src/__tests__/SurveyWizard.audacious.test.ts:173` | comment-only reference (`// be a glass card. The wrap is now <Card tier="floating">`) | n/a (test commentary) |

Tier distribution: 1× `wash`, 1× `quiet`, 2× `resting` (explicit), 2× `floating`, 7× default-resting, 1× test commentary. Every site uses the v0.8.0 `tier` API canonically. Zero `variant=` props are present on any `<Card>` element across the codebase — confirmed by `grep -rn 'variant=' src/ | grep -v -E '(button|toggle|select|alert|…)'`, which returns Button/Toggle/Pulse/Progress/Slider sites only.

Grep also confirms zero `:shadow="false"` / `shadow="false"` occurrences anywhere in `src/`. Exactly one `:grain="false"` exists — at site #4 (SurveyReview), paired with `tier="wash"`.

---

## Section 2 — Sites passing a `variant` prop to Card (silently broken)

**Count: 0.**

`grep -rn 'variant=' src/` cross-referenced against the Card site list returns no overlap. Every `variant=` literal in speedtest belongs to Button (`ghost`, `glass`, `accent`, `outline`, `link`), Toggle/ToggleGroupItem (`card`, `chip`), Pulse (`aura`, `dots`), Progress (`gradient`, `sectioned`, `continuous`), Slider, or stores (`?variant=` URL override for the DPI experiment).

speedtest **never inherited** the value.js `<Card variant="pane">` legacy. The c3e2216 barrel flip that propagated the stale API to value.js's 11 SFCs and bbnf-buddy's 7 SFCs did not propagate here, because speedtest's Card adoption post-dates the v0.8.0 tier rename (commit `5d914df9` — "feat(S.W4): consume glass-ui v0.8.0 — Card tier API + ScrollPane + tier-rename sweep + typography 500"). speedtest's authors wrote against the tier API from day one.

**Fleet impact from speedtest's `variant=` survivors: zero.** Current 18 sites (value.js 11 + bbnf-buddy 7) stay at 18.

---

## Section 3 — Hand-rolled pane-equivalent patterns (sites that "should be" `<Card variant="pane">`)

The pane visual identity per the charter: `tier="wash"` glass + `:shadow="false"` + no grain — a flat utility surface that does not visually compete with the cards beside it. Hand-rolled equivalents are raw `<div class="glass-wash …">` with no shadow utility.

`grep -rn 'glass-wash\|glass-quiet\|glass-resting\|glass-floating\|glass-card\|glass-pill' src/` returns 7 raw-class application sites. Three deserve pane-equivalent classification; the rest are deliberate non-card surfaces.

### 3.1 Genuine hand-rolled pane candidates

| # | File:line | Pattern | Pane-equivalent? | Rationale |
|---|-----------|---------|------------------|-----------|
| H-1 | `src/components/dashboard/SubnetAddDialog.vue:24` | `<div v-if="newSubnet.prefix" class="glass-wash rounded-lg px-3 py-2 font-mono text-small">` (CIDR preview chip inside a dialog) | **Weak** | Inline preview chip — looks like a pane-class flat surface (no shadow utility, wash tier). But this is a one-off mono-font preview inside a `<Dialog>` body, not workspace chrome. A `<Card tier="wash" :shadow="false">` would work; a pane variant would compress this to `<Card variant="pane">`. Cosmetically neutral. |
| H-2 | `src/components/dashboard/DashboardMap.vue:5` | `<div class="glass-wash max-w-sm rounded-lg p-6 text-center">` (no-API-key fallback message) | **Weak** | Static empty-state notice inside an absolutely-positioned `<div class="glass-card …">` map host. The outer `glass-card` IS the protagonist surface; the inner wash block is a nested-pane affordance — flat surface inside an elevated one. This is the textbook "no shadow because nested in another card" use case the Card `shadow` prop exists for. |
| H-3 | `src/components/dashboard/DashboardMap.vue:30` | `<div class="glass-wash rounded-full px-4 py-2 text-small text-muted-foreground">` (empty-data pill overlay) | **No** | Pill shape (`rounded-full`), not card geometry. This is `glass-pill`-class, not pane-class. The wash tier here is the right colour weight; the shape is wrong for `<Card>`. |

### 3.2 Non-pane glass-* raw classes (out of scope)

| # | File:line | Pattern | Why not pane |
|---|-----------|---------|--------------|
| N-1 | `src/components/dashboard/DashboardMap.vue:2` | `<div … class="…glass-card overflow-hidden map-container">` | `.glass-card` is the canonical card recipe — this IS a Card-equivalent at the recipe level, but it hosts a MapLibre canvas (the map needs to live in a non-Vue-managed DOM root). Migrating to `<Card>` would force `:as="div"` + manual ref forwarding for the map mount; the raw class is the right call. |
| N-2 | `src/components/dashboard/DashboardMap.vue:20` | `class="…glass-floating"` (loading overlay) | Absolute-positioned full-bleed overlay, not a card body. `glass-floating` is the right tier for a transient veil. |
| N-3 | `src/components/dashboard/charts/DistributionChart.vue:24` | `<div class="glass-floating absolute right-3 top-3 hidden rounded-lg px-3 py-2 text-small sm:block">` (box-plot summary float) | Floating annotation, not workspace chrome. `glass-floating` is the right tier; `<Card tier="floating">` would also work but the raw class is idiomatic for absolutely-positioned annotations. |
| N-4 | `src/components/survey/FlowSelector.vue:9` | Comment-only mention (`AC.W8e: collapse the 17-class glass-card recipe onto glass-ui's canonical variant="card" ToggleGroupItem`) | Archaeological — the recipe was already retired to `<ToggleGroupItem variant="card">`. |

**Hand-rolled pane count: 2 weak candidates** (H-1 + H-2). H-3 is excluded — pill geometry. The non-pane sites are deliberate non-card surfaces (map mount, overlays, floating annotations).

---

## Section 4 — Verdict: speedtest's pane consumption

- Silent-broken `<Card variant="pane">` sites: **0** (the API was never reached for in this codebase).
- Hand-rolled pane-equivalent sites (raw `glass-wash` + no shadow + rectangular geometry): **2 weak** (SubnetAddDialog CIDR-preview chip, DashboardMap no-API-key fallback notice).
- Strong-candidate pane consumption that "should be `<Card variant="pane">`" if the variant existed: **arguably H-2** (a nested wash inside an elevated card — the textbook "shadow off because nested" use case). H-1 is a stretch — it's a preview chip, not a workspace pane.

Speedtest's pane footprint is **0 to 2 sites**, depending on how generously hand-rolled patterns are matched. None of the existing 13 `<Card>` sites are mis-using a `variant=` prop. The `tier="wash" :grain="false"` site at SurveyReview is the canonical post-v0.8.0 expression of what value.js's old `variant="pane"` meant — and SurveyReview already writes it the idiomatic way.

speedtest's Card adoption path explains the absence of debt: the v0.8.0 sweep (`5d914df9`) migrated speedtest to the `tier`/`shadow`/`grain` API in one cohesive write. value.js + bbnf-buddy never got that sweep, which is why their pre-v0.8.0 `variant="pane"` calls still survive as silent props. speedtest is the **counterfactual** — it shows what the value.js + bbnf-buddy migrations look like when written from scratch against the current API.

---

## Section 5 — Recommendation strength on Q.W2 pivot

The user's pivot quote — "value.js's card pane variants are critical, and should see usage in speedtest, no? Ensure. The pane variant should properly be folded back in, or an idiomatic solution derived" — has two components. Treat them separately.

### 5.1 "Should see usage in speedtest, no?"

The empirical answer is **no, not meaningfully**. speedtest has:

- 1 site that consumes pane-class semantics via the idiomatic `<Card tier="wash" :grain="false">` (SurveyReview).
- 2 weak hand-rolled candidates that COULD compress to `<Card tier="wash" :shadow="false">` or `<Card variant="pane">` if the variant existed (DashboardMap fallback, SubnetAddDialog CIDR chip).

The user's intuition was that speedtest has more pane-class surface than the audit shows. The reality is that speedtest is **chart-and-meter heavy**, not editor-chrome heavy. value.js's pane semantics are workspace-utility-chrome semantics — selection-info strips, body editors, layer panels — and speedtest has only one editor-class surface (SurveyReview, the form-review readback). speedtest is the WRONG consumer to look for pane-saturation; it does not have the workload that motivates pane.

Therefore: speedtest's data does NOT strengthen the case for re-adding `variant="pane"` as a Card prop. The fleet impact stays at 18 sites (value.js 11 + bbnf-buddy 7); speedtest adds at most 2 cosmetic-stretch candidates, neither of which is a pre-existing user complaint.

### 5.2 "Fold pane back in, or derive an idiomatic solution"

The idiomatic solution **already exists** and is in production at speedtest:

```vue
<Card tier="wash" :shadow="false" :grain="false">
```

This is what Qθ confirmed for the value.js WIP migration ("Every pane SFC uses `<Card tier="wash" :shadow="false" :grain="false">` — zero `variant="pane"` survivors"). It is what SurveyReview already uses (minus `:shadow="false"` — but SurveyReview is intentionally shadow-on, see commit `5d914df9` context: it sits standalone as the protagonist of its own scroll region). The three-prop composition expresses the pane identity exactly, without growing the Card API.

Folding `variant="pane"` back in as an aliased shorthand for `tier="wash" :shadow="false" :grain="false"` would:

- **Pro**: One-prop ergonomics; matches value.js's mental model; closes the silent-swallow class by giving the API the literal author-expected prop name. Could be implemented as a thin variant prop that maps to the existing tier/shadow/grain tuple, with vue-tsc catching mistypes at the consumer's typecheck step (the gate Qα recommended).
- **Con**: Multiplies the orthogonal-axis API (tier × shadow × grain is already 5 × 2 × 2 = 20 expressible combinations; adding a `variant` axis re-introduces the v0.7 → v0.8 conflict the tier rename closed). Asymmetric — pane gets a shorthand, the 19 other tuples do not. Sets precedent for additive aliases that violate the "no backwards-compat aliases" L invariant.

### 5.3 Recommendation: **WEAK-REJECT** the pivot.

speedtest's data does not strengthen "fold pane back in" — it weakens it. The codebase that the user expected to be a pane-saturation case is in fact a pane-sparse case, with one idiomatic site and at most two weak hand-roll candidates. The 18-site fleet count is bounded to value.js + bbnf-buddy and does not grow.

The idiomatic solution — `<Card tier="wash" :shadow="false" :grain="false">` — is already deployed at speedtest (SurveyReview), already migrated at value.js WIP per Qθ, and is the right destination for the 7 bbnf-buddy sites per Qι's Q.W3 plan. Adding `variant="pane"` as a shorthand alias buys ergonomics at the cost of API orthogonality and the L-invariant-16 no-aliases rule.

The defensible Q.W2 move is the **fail-explicit fix** (Qα §"Card invariant-31"): make the Card primitive emit a dev-mode warning when it receives an unknown prop like `variant`, rather than silently swallowing it. This closes the silent-swallow class without growing the API, and the 18-site fleet migrates by editing the call sites to the existing canonical three-prop expression — work already underway on the value.js WIP branch.

If the user's "should see usage in speedtest" intuition is read as a directive ("speedtest SHOULD adopt pane semantics at H-2 + H-1"), the right answer is to migrate those two sites to `<Card tier="wash" :shadow="false" :grain="false">` as part of Qλ's consumer-cosmetic close — NOT to bring `variant="pane"` back. Two-site migration in speedtest is a 4-line consumer-side change.

---

## Summary bullets

- File: `/Users/mkbabb/Programming/glass-ui/docs/tranches/Q/research/Qnu-speedtest-card-pane-scan.md`
- Direct `<Card variant=…>` sites: **0**
- Hand-rolled pane-equivalent count: **2 weak** (SubnetAddDialog:24, DashboardMap:5); 1 excluded (DashboardMap:30, pill geometry)
- Combined fleet impact: **18 sites unchanged** (value.js 11 + bbnf-buddy 7); speedtest contributes 0 silent-broken + 0–2 stretch hand-rolls
- Recommendation strength on Q.W2 pivot: **WEAK-REJECT** — speedtest is pane-sparse, not pane-saturated; the idiomatic three-prop expression (`tier="wash" :shadow="false" :grain="false"`) is already in production; the defensible fix is the Card fail-explicit warning (Qα invariant-31), not re-adding `variant="pane"` as a shorthand
