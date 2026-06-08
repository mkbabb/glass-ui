# AX.W04 — Dock overflow/wrap: content-driven reflow, card-tier shadow, tokenized radius

**Band** A · DOCK · **Severity** major · **dependsOn** AX.W01 (· AX.W00 for the π-lane close machinery)
· **Charter** AX.md §3 (the `### AX.W04` block, lines 405-446) + §4 note 23 (the dock-spring oracle) +
§2b band-A precept row · **Audit** `deep-audit-corpus.json` slice `dock-overflow-wrap` (index 3, findings
F0-F5) + `converge-digest.md` digest lines 100-102, 113-115, 212-214 (bbnf-playground / bbnf-buddy
consumer corroboration).

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED on a **content-driven-wrap** witness that does NOT exist at HEAD `eaba94f`:

- **RED witness 1 (the headline — live, device-proven).** `overflow="wrap"` is a **viewport `@media
  (min-width: 640px)` toggle**, not a content strategy. Live-proven at the audit: a 40-button wrap dock at
  an **800px** viewport renders **1861px wide** — `flex-wrap: nowrap`, `rowCount: 1`,
  `dock.right ≫ window.innerWidth`, overflowing the viewport by ~1060px. Above 640px the
  `dock.css:1154-1192` `@media` block unconditionally forces `flex-wrap: nowrap` + `max-width: none`, so the
  dock NEVER wraps on a wide viewport even when its row overflows. The falsifiable RED assertion: *mount a
  wrap dock whose intrinsic row width exceeds its `--dock-max-inline-size` cap at a ≥ 640px viewport, sample
  the computed `flex-wrap` + `rowCount` + `right ≤ innerWidth` — at HEAD `flex-wrap` resolves `nowrap`,
  `rowCount === 1`, `right > innerWidth` (RED). After the wave it resolves `wrap`, `rowCount ≥ 2`,
  `right ≤ innerWidth` (GREEN).*

- **RED witness 2 (the false gate — grep-falsifiable).** `scripts/proof-dock-layering-polish.mjs` contains
  **ZERO** references to `wrap` / `min-height` / `reflow` / `overflow` (grep = 0), yet
  `src/components/custom/dock/README.md:286` + `dock.css:926-934` CLAIM the gate asserts "a morphing (not
  snapping) wrap reflow." The gate is GREEN while the claimed behaviour is **unverified AND false** (the
  reflow is a viewport jump-cut, not a spring morph). RED: the documented contract is unbacked.

- **RED witness 3 (zero live-audited consumer — visual-load-bearing-ness).** `grep "overflow=\"wrap\"|
  dock-overflow-wrap"` over `demo/` returns **0 hits**. No story, no demo, no Playwright audit has ever run
  against the wrap path; the big-dock story (`demo/stories/navigation/dock.vue:252-273`) shows only the
  orthogonal `layout="grid"`. The wrap surface ships **entirely unaudited against live pixels** — the exact
  headless-green/visually-broken gap the AX cardinal lesson names.

The wave is RED at HEAD on all three; the HardGate below drives each to GREEN.

---

## Goal

`overflow="wrap"` becomes an **intrinsic content-driven flex reflow** — wrapping to N rows exactly when the
row exceeds an inline-size cap at ANY width — that lifts the multi-row silhouette onto the card/floating
shadow tier on one tokenized radius, with the magic-640 viewport chain deleted and a real live-audited story.

---

## Scope (the gestalt fix — no workaround, no legacy, no viewport hack)

The audit's six findings (F0-F5) are the SAME surface on the SAME `--dock-motion-resize` morph substrate;
one cohesive architectural fix:

1. **Content-driven intrinsic flex-wrap (F0 — blocker root).** Re-express wrap as an over-cap reflow, not a
   viewport MQ. Make `.dock-overflow-wrap .dock-layer--full { flex-wrap: wrap }` **ALWAYS-ON** and cap the
   dock inline-size at `min(max-content, var(--dock-max-inline-size, <viewport-gutter>))` so flex wraps to N
   rows exactly when the intrinsic row exceeds the cap — at ANY viewport width — and collapses to one row
   when it fits. **DELETE the `@media (min-width: 640px)` snap-back block** (`dock.css:1154-1192`) **and the
   `--dock-overflow-bp` token** (`tokens.css:872-879`) entirely. The pill↔rounded-card radius swap keys off
   **whether the layout is multi-row** (a `:has()`/wrapped-state or container-size query), NOT a viewport MQ.
   This is the inherited mobile-responsive debt (origin `078dd79`, a mobile-only breakpoint hack) that the
   AT.W7 "clean break" (`8e4cb9f`) renamed (`.dock-wrap`→`.dock-overflow-wrap`) + tokenized (the 640 literal
   → `--dock-overflow-bp`) but **preserved wholesale** — a headless-green refactor that left the semantic
   defect intact. Excise it; do not patch the breakpoint.

2. **Card-tier elevation morph (F1 — the "properly SHADOWED" fix).** A wrapped multi-row card carries the
   IDENTICAL flat thin-pill `--shadow-dock` glow as a 40px pill (A/B screenshot vs `--glass-shadow-floating`
   is decisive). Lift the wrapped **and** the big-dock `shape=card` silhouette to the card/floating shadow
   tier: route its box-shadow through the floating-tier stack (`--glass-material-rim`,
   `--glass-under-shadow-vivid`, `--glass-shadow-floating`) when the dock is a finite-radius multi-row/card
   surface — expressed as a **`--shadow-dock-wrap`** token **on the `:root` cascade** (consumer-overridable,
   never a dead local — per the cartoon-shadow override contract). The shadow transitions on the **same
   `--dock-motion-resize` spring** the radius already glides on (box-shadow is already in the
   `:not(.vertical)` transition list), so the pill→card morph lifts elevation in lockstep with the corner
   morph — ONE register.

3. **One finite-radius token (F4 — minor, DRY).** The wrap shell hardcodes `border-radius: var(--radius-2xl)`
   (`dock.css:913`, 16px) while the sibling big-dock card path uses the density-scaled `--dock-card-radius`
   (`dock.css:405`, 24px via `--radius-dock-card`) — two parallel finite-radius treatments for the SAME
   "finite, not-a-stadium" silhouette, 16px-vs-24px with no rationale. **Unify on `--dock-card-radius`** (the
   wrap card and the grid/card dock are the same finite silhouette; density-aware, one source). The
   collapsed/snap-back pill returns to `--radius-pill` (already the morph target). Kill the bare literal.

4. **Strike-or-prove the false gate (F3 — major, doc-rot).** Once finding 1's content-driven wrap lands, the
   reflow is **intrinsic flex (no JS min-height morph)** — so the canonical resolution is **(b) STRIKE** the
   wrap-reflow line from `README.md:286` + the `dock.css:926-934` comment rather than claim a JS morph that no
   longer exists. (Path (a) — add a real `min-height`-over-≥3-frames detector — is the fallback ONLY if a
   spring morph is retained; it is not, so (b) is the gestalt choice. Do not leave a green gate asserting
   nothing.)

5. **Horizontal-only, fail-loud on vertical (F5 — minor).** Wrap silently no-ops on a vertical rail (the
   recipe is `.dock-layer--full`-scoped; a `.vertical` rail has no `.dock-layer--full`, so the class lands but
   no rule binds), yet `dock.css:342-346` CLAIMs vertical opt-in support. **KISS choice: make wrap explicitly
   horizontal-only** — `GlassDock.vue` does NOT emit `.dock-overflow-wrap` for vertical orientation (a guarded
   `'dock-overflow-wrap': overflow === 'wrap' && orientation !== 'vertical'`), and **strike the false
   vertical-wrap claim** from the `dock.css` comment. Vertical rails already grow-to-fit + clamp (their
   natural overflow story); do not leave a documented opt-in that silently does nothing.

6. **Vertical-dock max-height/overflow contract (digest-fold — new sub-gap, hist:bbnf-lang).** A vertical
   `GlassDock` is `height:auto` with **NO max-height contract** today, forcing bbnf-buddy `ToolsLayer` to
   hand-anchor max-height to the viewport. Ship the contract — a `--dock-max-block-size`-driven max-height +
   internal overflow-scroll on the vertical column body — so consumers don't re-derive it. (This is the
   vertical-axis companion to the horizontal cap; `--dock-max-block-size` already exists at `dock.css:58` as
   the consumer-set hook — wire the rule.)

7. **A real `overflow="wrap"` story + live audit (F2 — the close criterion).** Add a `overflow="wrap"`
   section to `demo/stories/navigation/dock.vue` (a horizontal dock with ~12-14 controls inside a
   `max-w-[28rem]` host so wrap engages on-screen at desktop too, plus the collapsed↔expanded wrap morph).
   The wave CLOSES on a frontend-design + Playwright VISUAL audit (row spacing, card grounding, corner
   masking, dark mode) — NOT the headless gate.

### CONVERGE folds (consumer-grounded — the charter CORRECTION)

- **"ZERO consumer at HEAD" is FALSE (hist:bbnf-lang, digest 113-115).** bbnf-playground
  `ControlsBar.vue:33` is a LIVE consumer: `<GlassDock :collapse-delay="2000" :start-collapsed="true"
  :fit-content="true" :wrap="true">`. The `:wrap` boolean is the **PRE-RENAME API** the AT.W7 clean break
  renamed to `overflow="wrap"` — so the rename is a **binding-verification-class break** (stale prop silently
  no-ops; vue-tsc + units miss it). **Fold:** a prop-migration NOTE (re-point bbnf-playground
  `:wrap`→`overflow="wrap"`; verify `:fit-content`/`:start-collapsed`/`:collapse-delay` survive the W01-W06
  rebuild) routed through the **W03/W00 binding-verification e2e sweep**. The bbnf-playground re-point ITSELF
  is a cross-repo edit → **routes to W34** (this wave authors the note, not the sibling edit).
- **bbnf-buddy is direct field confirmation of F0/F4 (digest 212-214).** `BottomDock.vue:169-204` works
  around the broken wrap with hand-rolled horizontal-scroll + a `mask-image` edge-fade (rationale: wrapping
  "pushed the dock tall enough to cover a large chunk of the canvas") and `LeftToolsDock` overrides the
  corner with a bare `--radius-2xl`. The scroll/mask + `--radius-2xl` workaround DELETIONS **route to W34**
  (the consumer re-adopts once wrap is correctly stylized). bbnf's abandonment of `DockLayerGroup` for the
  vertical overflow fight is the live witness routed to **W02** (sibling) — NOT this wave.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/dock.css` | The wrap recipe (`:904-950`): always-on `flex-wrap`, `min(max-content, …)` cap, `--dock-card-radius` unify; **DELETE** the `@media (min-width: 640px)` snap-back (`:1154-1192`); add the `--shadow-dock-wrap` card-tier morph; the vertical max-block-size rule; strike the F3 + F5 false-claim comments (`:342-346`, `:926-934`). |
| `src/styles/tokens.css` | **DELETE** `--dock-overflow-bp` (`:872-879`); ADD the `--shadow-dock-wrap` token (the floating-tier-stack composite, on `:root`). |
| `src/components/custom/dock/GlassDock.vue` | The class-emit guard (`:423`): `'dock-overflow-wrap': overflow === 'wrap' && orientation !== 'vertical'`; the JSDoc `overflow="wrap"` description (`:97-100`) re-written to "content-driven over-cap reflow" + drop the `--dock-overflow-bp` mention. |
| `src/components/custom/dock/README.md` | STRIKE the `proof:dock-layering-polish` wrap-reflow claim line (`:286`) + the `:105` wrap-reflow prose. |
| `scripts/proof-dock-layering-polish.mjs` | Remove the dead wrap-reflow assertion surface IF any narrative cross-ref exists (the script has 0 wrap refs today — this is a no-op confirm unless the strike requires a comment tidy). |
| `demo/stories/navigation/dock.vue` | ADD the `overflow="wrap"` section (~12-14 controls in a `max-w-[28rem]` host + collapse↔expand wrap morph). |
| `scripts/proof-dock-wrap-content-driven.mjs` | **NEW** — the born-RED π-lane wrap-reflow detector (this wave's gate). |
| `package.json` | ADD the `proof:dock-wrap-content-driven` script entry (+ the meta-gate parity match W00 enforces). |
| `docs/tranches/AX/audit/W04-dock-overflow-wrap.json` | **NEW** — the wave's audit artefact (born-RED→GREEN evidence). |

**OUT of bounds:** `src/styles/theme.css` (`--radius-2xl`/`--radius-dock-card` definitions are shared — this
wave CONSUMES `--dock-card-radius`, never redefines a radius token); the dock morph driver
(`useLayerTransition`, the VT removal) — that is W01; `useDockHold` / Slider — W03; the `dock.css`→partials
split — W06; the `--ease-apple-spring` excision — W05.

---

## Disjointness (sibling waves it must NOT overlap)

The dock band (W01-W06) all mutate `dock.css` and/or `GlassDock.vue` — **they cannot run concurrently**
(digest line 353). The dispatch contract:

- **vs W01 (single-scalar morph — `useLayerTransition` rewrite + dock.css morph rules + GlassDock.vue VT
  removal).** W04 **dependsOn W01** and runs AFTER it lands, so the wrap radius/shadow morphs inherit the
  corrected single-scalar `--dock-motion-resize` spring (no re-bounce). W04 touches the WRAP recipe rows of
  `dock.css`; W01 touches the MORPH-driver rows. Sequential, not concurrent — W04 rebases onto the settled
  W01 model.
- **vs W03 (keepDockOpen — `Slider.vue` + new `dock/composables/useDockHold.ts`).** Disjoint by file: W03 is
  `Slider.vue` + `useDockHold.ts`; W04 never touches either. Both edit `GlassDock.vue` — W03 the hold-state
  wiring, W04 the wrap class-emit guard (`:423`) + JSDoc. Coordinate the two `GlassDock.vue` hunks (different
  template/script regions) so they land in dependency order (W03 also dependsOn W01).
- **vs W05 (spring vocabulary — `tokens.css`/`theme.css` spring tokens + 4 SFC consumers).** Both edit
  `tokens.css`. W05 touches the `--spring-*` / `--ease-apple-spring` rows; W04 touches the `--dock-overflow-bp`
  (delete) + `--shadow-dock-wrap` (add) rows. Disjoint token cohorts — coordinate the `tokens.css` hunks.
- **vs W06 (dock.css → `src/styles/dock/` partials split + storybook consolidation).** W06 **dependsOn
  W01 + W04** and lands **LAST** in the dock band (corrected from the charter's backwards "BEFORE the churn
  settles" — see digest 354-355). W06 carves the FINAL `dock.css` model into partials AFTER W04's wrap
  rewrite settles; if W04 ran after W06, the split would mis-shelve the wrap rules. W06 also owns the dock
  STORY consolidation — W04 ADDS the `overflow="wrap"` section to `navigation/dock.vue`; W06 then folds it
  into the single dock home. W04 authors the section; W06 re-homes it. No story-file collision (W04 appends a
  section, W06 relocates the file).
- **vs W34 (cross-repo consumer adoption).** W04 authors the bbnf-playground prop-migration NOTE + the
  bbnf-buddy workaround-deletion NOTE; the actual sibling-repo edits execute in W34. W04 writes NO sibling
  source.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤1 agent — the surface is one cohesive CSS+SFC fold).** Lands the content-driven flex-wrap +
  `min(max-content, …)` cap + the `@media`/`--dock-overflow-bp` deletion, the `--shadow-dock-wrap` card-tier
  morph token, the `--dock-card-radius` unify, the F3/F5 strike, the vertical max-block-size contract, the
  `GlassDock.vue` horizontal-only guard, and the `demo/stories/navigation/dock.vue` wrap section. Lint +
  typecheck at every interval.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the live RED witnesses against the patched tree at
  ≥ 3 viewports (375×667, 1280×800, 1440×900): asserts the 40-btn dock @800px now wraps (`flex-wrap: wrap`,
  `rowCount ≥ 2`, `right ≤ innerWidth`); A/B-screenshots the multi-row card shadow vs `--glass-shadow-floating`
  to confirm grounding; confirms the radius is `--dock-card-radius` (24px) not `--radius-2xl` (16px); confirms
  the vertical rail does NOT emit `.dock-overflow-wrap`; greps `demo/` for the new `overflow="wrap"` site;
  re-checks that `--dock-overflow-bp` is gone from the whole tree. ADVERSARIAL twist: tries to make the new
  gate pass on a dock that does NOT actually wrap (a cap > content width) and confirms it goes RED.
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors `scripts/proof-dock-wrap-content-driven.mjs` (the
  π-lane content-driven-wrap detector — born-RED at HEAD, GREEN after) + the `package.json` entry + the W00
  meta-gate parity match. Confirms the gate FAILS at `eaba94f` and PASSES on the patched tree.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 3.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN.** `proof:dock-wrap-content-driven` (NEW, π-lane, fail-CLOSED, in
the W00 visual-runtime workspace, DEFAULT engine):

- Mounts a horizontal `overflow="wrap"` dock whose intrinsic row width **exceeds** its `--dock-max-inline-size`
  cap, at a **≥ 640px** viewport. Asserts: computed `flex-wrap === "wrap"`, `rowCount ≥ 2`, and the dock's
  `right ≤ window.innerWidth` (does NOT overflow the viewport). **Born-RED at HEAD** (HEAD wraps only below
  640px → at 800px it is `nowrap`/`rowCount:1`/`right > innerWidth`).
- Asserts `getComputedStyle(dock).getPropertyValue("--dock-overflow-bp") === ""` (the token is GONE) and a
  source-deletion proof that `@media (min-width: 640px)` no longer governs the wrap recipe.
- Asserts the multi-row card `border-radius` resolves to `--dock-card-radius` (24px), NOT `--radius-2xl` (16px).
- Asserts the multi-row card `box-shadow` resolves through the `--shadow-dock-wrap` floating-tier stack (a
  non-`--shadow-dock` value when wrapped), and that it transitions on `--dock-motion-resize` (the property is
  in the transition list).
- Asserts a **vertical** dock with `overflow="wrap"` carries NO `.dock-overflow-wrap` class (horizontal-only).
- **Strike-proof for the false gate:** `grep "wrap reflow|morphing.*wrap"` over `README.md` +
  `dock.css` = 0 (the doc-rot line is struck), AND `proof:dock-layering-polish` no longer narrates an
  unbacked wrap claim.

This is a **runtime-observation** gate (the precept-valid artefact form per SPEC.md §Hard Gates), NOT a
grep-for-source-string-as-runtime-behaviour gate — the source-deletion greps are deletion-PROOFS (a valid
form), not runtime claims.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on the new `demo/stories/navigation/dock.vue` `overflow="wrap"` section at **≥ 3
viewports** (375×667 / 1280×800 / 1440×900) in **light AND dark**:
- **Reflow correctness:** the dock wraps to multiple rows when content exceeds the cap at a WIDE viewport
  (the 800px-overflow defect is visually gone); collapses to one row when it fits.
- **Card grounding:** the multi-row card reads as an ELEVATED floating surface (the floating-tier shadow
  grounds it) — side-by-side it is NOT the flat thin-pill plate.
- **Corner masking + row spacing:** the finite `--dock-card-radius` corners clip cleanly; row gaps are even;
  the collapsed↔expanded wrap morph lifts radius + shadow in lockstep on one spring (reads as one continuous
  motion, no jump-cut).
- **Affordance / hierarchy / spacing / padding / NO visual occlusion** per the AX cardinal gate.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`) is the binding close criterion.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the three RED witnesses against HEAD `eaba94f`
   on the live demo (the 800px-overflow, the zero-wrap-story grep, the false-gate grep) and record them in
   `audit/W04-dock-overflow-wrap.json` as the born-RED baseline. Do NOT proceed on the audit's word — re-prove.
2. **Author the born-RED gate.** `scripts/proof-dock-wrap-content-driven.mjs` + `package.json` entry; confirm
   it FAILS at HEAD.
3. **Content-driven flex-wrap + cap.** `dock.css` always-on `flex-wrap` + `min(max-content, …)` cap; DELETE
   the `@media (min-width:640px)` block + `--dock-overflow-bp` (tokens.css); the `:has()`/container-size
   pill↔card radius key. Lint + typecheck.
4. **Card-tier shadow morph + radius unify.** ADD `--shadow-dock-wrap` (tokens.css `:root`); route the
   wrapped/card silhouette through the floating-tier stack on `--dock-motion-resize`; unify the wrap radius on
   `--dock-card-radius`.
5. **Horizontal-only guard + vertical max-height contract.** `GlassDock.vue` class-emit guard
   (`overflow === 'wrap' && orientation !== 'vertical'`); the `--dock-max-block-size` vertical contract rule;
   strike the F5 false vertical comment.
6. **Strike the false gate (F3).** Remove the wrap-reflow claim from `README.md:286` + `dock.css:926-934`.
7. **Author the live story.** ADD the `overflow="wrap"` section to `demo/stories/navigation/dock.vue`.
8. **Gate GREEN.** Confirm `proof:dock-wrap-content-driven` passes; run the VISUAL-TRUTH live audit; capture
   the paired-π BEFORE/AFTER + DELTA evidence; write `audit/W04-dock-overflow-wrap.json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W04-dock-overflow-wrap.json` — the born-RED→GREEN ledger: the three RED witnesses
  (live 800px-overflow geometry, the false-gate grep=0, the zero-story grep=0), the per-finding (F0-F5)
  disposition, and the post-wave GREEN measurements.
- `scripts/proof-dock-wrap-content-driven.mjs` — the new fail-CLOSED π-lane wrap-reflow detector.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): screenshots of the 40-btn dock @800px
  before (1861px nowrap overflow) vs after (multi-row, `right ≤ innerWidth`), the flat-pill-shadow vs
  floating-tier-shadow A/B, and the radius 16px→24px delta, at ≥ 3 viewports × light/dark.
- A consumer-NOTE annex (folded into the W34 coordination ledger, NOT executed here): the bbnf-playground
  `:wrap`→`overflow="wrap"` prop-migration + the bbnf-buddy `.bottom-dock` scroll/mask + `--radius-2xl`
  workaround deletions.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(dock): proof:dock-wrap-content-driven born-RED — content-driven wrap detector (AX.W04)`
2. `fix(dock): content-driven intrinsic flex-wrap — min(max-content,cap), delete the @media-640 snap-back + --dock-overflow-bp (AX.W04 F0)`
3. `feat(dock): card-tier --shadow-dock-wrap morph + --dock-card-radius unify — lift the multi-row silhouette onto the floating tier (AX.W04 F1+F4)`
4. `fix(dock): horizontal-only wrap guard + vertical max-block-size contract — strike the false vertical-wrap claim (AX.W04 F5)`
5. `docs(dock): strike the false proof:dock-layering-polish wrap-reflow claim — README + dock.css doc-rot excise (AX.W04 F3)`
6. `feat(demo): overflow="wrap" story section in navigation/dock.vue — the live-audited wrap consumer (AX.W04 F2)`
7. `chore(AX.W04): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA capture`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W01 (single-scalar morph) — HARD.** The wrap radius + the new `--shadow-dock-wrap` shadow transition
  on `--dock-motion-resize`; W04 must rebase onto the settled W01 one-clock spring so the pill→card morph
  composes with it (no re-bounce, no second clock). Sequencing W04 before W01 would morph the wrap silhouette
  on a spring W01 then rips out. (Charter §3 dependsOn AX.W01; audit `dependsOn` = "AFTER the dock one-clock
  morph fix is settled.")
- **AX.W00 (π visual-runtime lane) — the close machinery.** The fail-CLOSED π workspace is the home of the
  new `proof:dock-wrap-content-driven` gate and the binding live-audit close criterion. W04 cannot close on
  a headless gate alone; W00 stands up the lane it closes on.
- **Downstream:** **AX.W06** dependsOn W04 (the dock.css→partials split + the story consolidation carve the
  FINAL wrap model AFTER W04 settles — corrected ordering per digest 354-355). **AX.W34** receives the
  bbnf-playground + bbnf-buddy consumer-adoption NOTES this wave authors.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`078dd79`** (`fix: GlassDock wrap mode—proper multi-line responsive behavior`, Mar 2026) — the ORIGIN
  debt. The first wrap impl, authored as a mobile breakpoint hack ("Mobile: content wraps… Desktop: reverts
  to single-row pill"), NEVER as an over-cap overflow strategy. The viewport-`@media` architecture is born here.
- **`8e4cb9f`** (`feat(dock): AT.W7-dock-a/b/c — overflow clean break + token design refinements + ι doc-rot
  gate`) — the "clean break" that **preserved the defect**: it renamed `.dock-wrap`→`.dock-overflow-wrap` and
  tokenized the `640px` literal → `--dock-overflow-bp`, but kept the viewport-`@media` architecture wholesale.
  The surface changed; the semantic defect survived a clean break — the §13/§4-note cardinal-lesson pattern
  (a headless-green refactor that left the visual/semantic bug intact). The `:wrap` boolean it collapsed into
  `overflow="wrap"` is the PRE-RENAME API bbnf-playground `ControlsBar.vue:33` still ships (the
  binding-verification break).
- **AW.W3b** — minted `--dock-card-radius` for the big-dock card path but left the older wrap path on the
  bare `--radius-2xl` (the 16px-vs-24px divergence F4 calls out), AND added the `min-height
  var(--dock-motion-resize)` morph + the README/gate CLAIM of coverage the detector never backed (the F3
  doc-rot / false-contract).
- **§4 note 23 (the dock-spring ORACLE).** keyframes.js's published `(0.32,0.7)` `--spring-dock` curve
  (sampled peak ~+4.6%) is the system-dock baseline the radius/shadow morphs ride; W04's wrap morph COMPOSES
  with it via the W01 single-scalar driver — it does not re-bounce.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; the 40-btn-dock-@800px =
  1861px-wide overflow is live-proven here.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-A binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **one-path / no-legacy-code.** The viewport-`@media` wrap is inherited mobile-responsive debt; the wave
  EXCISES the magic-640 chain (`@media (min-width:640px)` + `--dock-overflow-bp`) rather than patching the
  breakpoint — ONE content-driven strategy, no parallel viewport path. Forbids leaving the renamed-but-
  preserved AT.W7 architecture (clean-break that preserved the defect is the anti-pattern). MUST NOT
  introduce a second radius treatment — `--dock-card-radius` is the single finite-radius source.
- **abrogate-before-patch.** The wrap recipe is re-derived from first principles (content-cap reflow), not
  bridged; the false `proof:dock-layering-polish` wrap claim is STRUCK, not papered over. Aligns with the §0
  "excise or fail explicitly" mandate.
- **token-first / no magic numbers / no fragile viewport chain (§0 mandate).** Every visual axis is a CSS
  custom property on the cascade: `--shadow-dock-wrap` (consumer-overridable on `:root`, never a dead local —
  per the cartoon-shadow override contract), `--dock-card-radius` (density-scaled), `--dock-max-inline-size` /
  `--dock-max-block-size` (the caps). The bare `--radius-2xl` literal and the `640px` magic number are deleted.
- **fail-explicit on library-internal violations (vs befitting-silent browser-API degradation).** Wrap on a
  vertical rail is a library-internal contract violation — made horizontal-only-explicit (the class is not
  emitted) with the false docs struck, NOT left as a silent no-op. (No browser-API degradation is involved
  here — this is purely a library-contract fix.)
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates).** The gate is a runtime-observation
  artefact (the wrap reflow measured live on a real device), NOT a "grep found a source string for runtime
  behaviour" invalid form; the source greps are deletion-PROOFS (a valid form). The wave's close is the
  executed live Playwright + frontend-design audit, never a headless proof alone — the cardinal AX precept.
- **substrate-with-consumer / visual-load-bearing-ness (Design-Axis-3; SPEC.md §π β-lane).** The wrap surface
  was a shipped substrate with ZERO live-audited consumer (the visual-load-bearing-ness bar was never met);
  this wave ADDS the live story + audit so the surface is consumer-proven, AND records the EXISTING external
  consumers (bbnf-playground `:wrap`, bbnf-buddy `BottomDock`) the charter's "ZERO consumer" premise missed.
- **binding-verification (glass-ui MEMORY — stale prop bindings silently no-op).** The AT.W7
  `:wrap`→`overflow="wrap"` rename is a binding-verification-class break the bbnf-playground consumer still
  rides; the prop-migration note routes through the W03/W00 e2e sweep so the stale binding is caught (vue-tsc
  + units miss it).
- **no-silent-deferrals.** The bbnf consumer-adoption work is NOT silently dropped — it is routed to W34 with
  a named annex (the cross-repo edits execute there; this wave authors the note). The vertical max-height
  sub-gap is ADDRESSED here (the contract ships), not deferred.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **The viewport-gutter fallback for `--dock-max-inline-size`.** When the consumer sets NO
   `--dock-max-inline-size`, the cap defaults to a viewport gutter (`min(max-content, calc(100vw -
   <gutter>))`). The gutter value (e.g. `2rem` each side) is a design choice — RATIFY-BEFORE-IMPL the default
   gutter (or whether the default is `max-content` unbounded with wrap engaging only on an explicit consumer
   cap). The KISS recommendation: default to a `calc(100vw - 2rem)` gutter so wrap engages on overflow even
   without a consumer cap, matching the audit's intent.
2. **F3 strike vs detector — confirm the STRIKE path.** The recommended resolution is **(b) STRIKE** the
   false wrap-reflow claim (the content-driven reflow is intrinsic flex, no JS min-height morph). RATIFY that
   the detector path (a) is genuinely unneeded — i.e. no spring-driven `min-height` morph is retained. The
   recommendation: STRIKE (the gestalt fix removes the JS morph entirely).
3. **The `:has()` vs container-size-query key for the pill↔card radius swap.** The multi-row detection keys
   off wrapped-state. RATIFY the mechanism: `:has()` (broad support, simpler) vs an `@container size()` query.
   Recommendation: `:has()` for the wrapped-state detection (the dock already uses container queries
   elsewhere, but `:has()` on the row count is the lighter primitive here) — DECIDE-AT-IMPL with a fallback.
4. **Vertical max-height contract default.** The `--dock-max-block-size` contract ships, but its DEFAULT
   (unbounded `height:auto` preserved vs a viewport-anchored default) is a design choice. Recommendation:
   keep `height:auto` as the default and ship `--dock-max-block-size` as the consumer opt-in + an
   internal-scroll rule (so bbnf-buddy stops hand-anchoring) — RATIFY whether a default cap is wanted.
