# BJ BAND-MATERIAL — the material/token canon (Family F: radius · blur · track · proportion)

Registry **Family F** — material/token canon (`docs/tranches/BJ/formation/REGISTRY.md:122-138`). The
census verdict: *the radius/blur/√φ token systems exist and are NOT enforceable; ladder defects explain
the reported inconsistency.* This band discharges the token-canon reformation — **one radius role-scale
canonized + reconciled**, **the blur ladder collapse + subtler + documented (or the collisions ruled
intentional)**, **the gradient-backdrop-blur experiment judged (adopt-or-retire)**, **the track-family
DRYed**, and **an aristotelian-proportion review pass** feeding follow-on fixes.

**DRAFT for the Fable two-challenge pass.** Every unsettled judgment is an `OPEN` marker, not a guess.
This band writes NO source: it names the fix flips (the token reconcile, the raw-literal repoint, the
ladder retune, the halo verdict) as coordination obligations. **Enforcement is not authored here** — the
static lint that makes these ladders lintable (`token-hygiene`, `type-hygiene`) is `BAND-GATES` W3/W4,
authored **born-RED** against the same shipped violations; this band supplies the values those gates flip
GREEN against. The BI `W-AXES-GATES` idiom: authored born-RED in `BAND-GATES`, GREEN by these waves.

## §Band framing — the systems are mature, the defects are reconciliation-shaped

The critical framing for the Fable pass (and against over-scoping): the radius + blur systems are **already
rich and mostly role-correct on disk**. `theme/radius.css` ships a full role vocabulary
(`--radius-control`/`-field`/`-card`/`-dialog`/`-panel`/`-tab`/`-badge`/`-dock` + the concentric relay
`--radius-ctx`/`-inset`/`-floor`, `radius.css:31-95`); the blur ladder was already dialed back ~30% and
the resting rung already unified to ONE 7px material (`glass.css:64-102`). So this is **not a greenfield
mint** — it is: canonize the scattered role rules into ONE precept table, reconcile the two live canon
defects, repoint the handful of raw off-ladder literals, judge the frozen experiment, DRY the tracks, and
run a proportion review. Gestalt-not-patchwork means the CANON becomes the single source; the spot sites
follow from it. Where a feedback screenshot and the disk have **drifted** (a defect the ladder already
partly cured), the wave says so and owes a **live-π re-check before it claims a born-RED defect** — never
a spec written against a stale screenshot.

Five waves:

| Wave | Name | Motion | Born-RED? |
|------|------|--------|-----------|
| 1 | `BJ.W-RADIUS-ROLE` | Canonize the role-keyed radius table; reconcile the misnomer + dead k-tokens; repoint raw radii + demo role-coherence | Yes — misnomer + dead tokens + raw literals red at HEAD |
| 2 | `BJ.W-BLUR-LADDER` | Rule the collided rungs; document or kill the 2dppx arm; one material per role | Partly — the collision/DPI facts are live; the F28 defect owes a live-π re-check |
| 3 | `BJ.W-GRADED-BACKDROP-JUDGE` | Adopt-or-retire the landed `--glass-halo-*` cohort against the codex law-1 reference | Judgment-gate, not defect-probe — the unresolved-freeze state is the RED |
| 4 | `BJ.W-TRACK-DRY` | DRY the slider/progress/scrubber shared track mechanics | Yes — three components re-spell the same track with divergent tokens |
| 5 | `BJ.W-ARISTOTLE-PROPORTION` | The A10 aristotelian-proportion review over cards/dividers/spacing | π-capture obligation, not asserts (paint-taste review) |

**Design authority (band-wide).** The iOS-27 codex (`formation/ios27/IOS27-CODEX.md`) is the material
authority: **law 1** progressive backdrop blur (waves 2/3), **law 4** radius as concentrically-nested role
grammar (wave 1), **law 11** the restraint floor (wave 5). Adaptive content tint (law 2) and specular edge
caustic (law 3) are **GREENFIELD-adjacent (Family G)** — referenced where they bound a decision, never
drafted here.

---

## Wave 1 — `BJ.W-RADIUS-ROLE` — the radius role-scale canon, reconcile, and repoint

### §Mandate

Discharges `canon:semantic-alias-points-at-wrong-surface` (`--radius-input` misnomer) +
`canon:stale-gate-rationale-over-dead-token` (`--corner-k-*` dead) (`round-1/doc-and-canon-drift.md`
findings 3-4) + **visual family 1** radius-canon-collapse (F09/F12/F15/F17/F45/F48, `VISUAL-GESTALT.md:9-16`)
+ **iOS-27 codex law 4** (radius as role grammar, concentrically nested, `IOS27-CODEX.md:26-28`). The user
order: "**Grand rounding/border-radius audit**" (F15) + "one opinionated radius scale with role-keyed
tokens (control / field / card / sheet) and an enforcement gate, not spot fixes" (`VISUAL-GESTALT.md:16`).

### §Design — the role table as canon (codex law 4), then reconcile, then repoint

**(A) Canonize the role table.** The role rules exist but are scattered across `radius.css` inline comments
with no single authoritative table and **no precept documents them** (`doc-and-canon-drift.md` finding 2:
`design-idioms.md` §3/§7 describe a dead layout). Author ONE role→token→shape table (a precept section,
the canon this band's siblings cite), keyed on the codex law-4 grammar:

| Role | Token (on disk) | Value | Shape | iOS-27 grammar (`IOS27-CODEX.md:26-28`) |
|------|-----------------|-------|-------|------------------------------------------|
| icon / single tap-target | (raw `50%` / `--radius-pill`) | circle | round | circle = single tap-target |
| control / field / mode / action | `--radius-control` = `--radius-pill` | stadium | round | stadium pill = primary action/field/mode |
| multi-line field / stepper | `--radius-field` = `--radius-2xl` (16px) | soft-rect | round | (a multi-line box is not a stadium) |
| content card / popover | `--radius-card` = `--radius-2xl` (16px) | squircle-at-large | squircle | card = content/popover container |
| dialog | `--radius-dialog` = `--radius-card` (16px) | matches card | round | (F6: dialog rounds to match the card) |
| panel / configurator | `--radius-panel` = `--radius-xl` (12px) | soft-rect | squircle | (group container, not a pill) |
| sheet / bigdock | `--radius-3xl` / `--corner-shape-sheet` | large squircle | squircle | large glass overlay |
| slider track | `--radius-pill` (tall capsule) | capsule | round | tall capsule = slider |

The **concentric nesting rule is already implemented** (the `--radius-ctx`/`-inset`/`-floor` relay,
`radius.css:80-95`; `border-radius: max(floor, ctx − inset)` at `configurator/styles.css:109-111`) — the
canon documents it as the law, it is not re-minted. The one rule the canon adds and the gate enforces: **a
card never nests inside a pill; a pill never nests in a near-rect** (the F12 "pill chips inside a
near-rectangle container" incoherence, `VISUAL-GESTALT.md:11`).

**(B) Reconcile the two live canon defects (born-RED, verified on disk):**

- **`--radius-input` misnomer.** `radius.css:35` `--radius-input: var(--radius)` (=10px). Its only consumers
  are `skeleton/Skeleton.vue:35`, `avatar/styles.css:43`, `command/styles.css:41` — **NOT the Input**, which
  reads `--radius-pill` (`_shared/field-control.css:34`). Verified: `grep -rn radius-input src/` = the three
  media consumers + the def + the manifest pin, zero Input. A consumer retuning `--radius-input` to fix input
  rounding silently reshapes skeletons/avatars. **Fix:** rename to its true role (`--radius-media` or
  `--radius-tile`) — clean break, no legacy alias (MEMORY `no_backwards_compat`); update the three consumers +
  `tokens/manifest.ts:37`.
- **`--corner-k-soft` / `--corner-k-sharp` dead.** `radius.css:118-119` mint two k-tokens with **zero
  `var()` consumers** (verified: `grep -rn 'corner-k-soft\|corner-k-sharp' src/` = the def + the self-citing
  comment only). The comment (`:112-116`) keeps them "pinned by `proof:squircle-language`" — a gate that
  **does not exist** post-abrogation (`doc-and-canon-drift.md` finding 3). **Fix:** delete both (clean break,
  no consumers); the live squircle vocab is `--corner-k-squircle` alone.

**(C) Repoint the raw off-ladder radii (these flip `BAND-GATES` W3 `token-hygiene` GREEN):**

- `sortable-list/SortableList.vue:144` `border-radius: 999px` → `var(--radius-pill)` (a drop-indicator bar).
- `tabs/styles/segmented.css:169` `0.3125rem` + `:306` `0.25rem` → the role token (`--radius-control` for the
  stadium tab, or `--radius-strip` for the column-stack track — `OPEN-1c`).

**(D) The demo role-coherence sweep (the reported F-sites).** The visible defects are demo stories reaching
for **raw Tailwind radius utilities** instead of role classes:
- **F15** `infinite-scroll.vue:74` — the Reset button wears `rounded-md` (6px, reads near-square on a
  button); role = control → a `rounded-control`/`--radius-button` class.
- **F45** `gate-pattern.vue` — role-incoherent mix (a near-rect input above a full-pill Unlock, per
  `VISUAL-GESTALT.md:15`); the two on-disk hits are `rounded-full` icon tiles (correct); the input/button
  coherence is the sweep target.
- **F17** `/data/search` — "two adjacent search inputs with different radii" (`VISUAL-GESTALT.md:12`); the
  search component has no own `border-radius` (rides `field-control` pill) — the divergence is a demo
  composition, owed a **live-π re-check** (§Acceptance).

### §Work

- The role-table precept (the canon; coordinate the `design-idioms.md` §3/§7 rewrite with `BAND-DOC-TRUTH`
  / `BAND-COLOCATION`, do not duplicate).
- `theme/radius.css` — rename `--radius-input`→`--radius-media`; delete `--corner-k-soft`/`-sharp` + the
  stale-gate comment; the three media consumers + `tokens/manifest.ts:37`.
- The four raw-literal repoints (SortableList, segmented ×2).
- The demo role-class sweep (F15 reset + the F45/F17 compositions).

### §Acceptance — born-RED

- **Misnomer RED at HEAD:** `--radius-input` (10px) consumed by Skeleton/Avatar/Command, zero Input (verified).
  GREEN when renamed to `--radius-media` and Input's pill stands alone in canon.
- **Dead-token RED at HEAD:** `--corner-k-soft`/`-sharp` zero `var()` consumers (verified). GREEN when deleted.
- **Raw-radius RED at HEAD:** `SortableList.vue:144` `999px` + `segmented.css:169/306` raw rem (verified) —
  these are the exact sites `BAND-GATES` W3 `token-hygiene` reds; GREEN when repointed (the coordination flip).
- **F15 reset RED at HEAD:** `infinite-scroll.vue:74` `rounded-md` (verified). GREEN on the control role class.
- **`OPEN-1a` disk-vs-screenshot drift (F09/F12/F17):** the configurator container is **already** `--radius-panel`
  (12px) via the concentric relay (`Configurator.vue:211`), NOT the 100%-ovoid F09 shows; tags-input is
  **already** `--radius-field` (16px) container + `--radius-control` chips (`tags-input/styles.css:8,61`). These
  read role-correct on disk. **This wave must run a live π on F09/F12/F17 before asserting any defect** — if they
  reproduce, the fix is the demo composition (route F09/F10/F11 to `BAND-STORY` `W-CONFIGURATOR-STD`, which owns
  the configurator-cramp); if they do not, record the cure and the screenshot drift. No spec against a stale png.

### §π/DELTA

Radius changes are visible: capture before/after at the four repoint sites + the F15 reset + the F09/F12/F17
live re-check (Safari + Chrome). The rename/delete (B) are var-substitution byte-identical at the media
consumers — a device-free byte-check suffices there; only (C)/(D) carry a paint delta.

### §KISS / parsimony

Net-negative token count (two dead k-tokens deleted, one misnomer renamed not aliased). The canon table
replaces scattered comments with ONE source. The gate lives in `BAND-GATES` W3 — this wave adds no runner.

### §Non-goals

- The `token-hygiene` lint itself → `BAND-GATES` W3.
- The configurator-cramp story fix (F09/F10/F11) → `BAND-STORY` `W-CONFIGURATOR-STD` (this wave supplies the
  role ruling; that wave paints the story).
- The `corner-shape` squircle policy (already coherent) — untouched beyond the two dead k-token deletes.
- Adaptive tint / edge caustic (codex laws 2-3) → Family G greenfield.

### §OPEN

- `OPEN-1a` — F09/F12/F17 disk-vs-screenshot drift: live-π re-check owed before any defect claim (above).
- `OPEN-1b` — `--radius-input` new name: `--radius-media` vs `--radius-tile` (Skeleton/Avatar/Command are
  media/tile surfaces). Fable rules the name.
- `OPEN-1c` — `segmented.css` repoint target: `--radius-control` (stadium) vs `--radius-strip` (column-stack)
  — depends on the segmented variant geometry. Fable rules.

---

## Wave 2 — `BJ.W-BLUR-LADDER` — the ladder collision ruling, the DPI arm, one material per role

### §Mandate

Discharges `canon:blur-ladder-collision-and-mode-divergence` (`doc-and-canon-drift.md` finding 6) +
`canon:unenforced-token-system` (the blur half) + **visual family 5** glass-material-heaviness
(F28/F48/F49/F50, `VISUAL-GESTALT.md:46-51`) + **iOS-27 codex law 1** (progressive blur, subtler element blur
overall). User order: "Glass blur for **ALL glass components slightly more subtle**" (F48) + "these blurs are
inconsistent — ensure this is **intentional**" (F28).

### §Design — the ladder has fewer distinct values than names; rule it, document it

The `--glass-blur-*` ladder at HEAD (verified `glass.css:86-97` + `glass-deep.css:56` + `light-dark.css:38-42`):

| Rung | Radius | Note |
|------|--------|------|
| wash | 1px | sub-perceptual |
| quiet | **7px** | ⎫ **collision** — quiet == resting |
| resting | **7px** | ⎭ the deliberately-unified "ONE 7px material" (`glass.css:79-85`) |
| floating | **11px** | ⎫ **collision** — floating == overlay |
| overlay | **11px** | ⎭ + **jumps to 17px at `@media (min-resolution: 2dppx)`** (`light-dark.css:40`) |
| deep | 16px | the animated-substrate ceiling |

So **6 rung names resolve to 4 distinct radii** (1/7/11/16), and the overlay rung diverges ~55% by device
DPI. This is the mechanism behind F28/F48 "blurs are inconsistent": named blur choices that don't visibly
differ, plus a device-dependent overlay. The ladder is also **undocumented** — no precept states the rungs or
the DPI arm as intentional (`doc-and-canon-drift.md` finding 6), so it is unauditable.

The band ruling (the two-challenge decision this wave forces):
1. **The quiet==resting collision is INTENTIONAL** — it is the shipped "one 7px material" unification
   (`glass.css:79-85`: dock + default-Card + menu-row resolve the SAME `blur(7px)`). The wave **documents it
   as the unified base material**, not a bug. `OPEN-2a`: keep 6 names at 4 values (document the intentional
   collapse) vs **rename to the 4 real rungs** (fewest-names-that-differ, the parsimony read). Draft leans
   rename-to-real-rungs — a name that never differs is dead vocabulary — but the peer-lock comments
   (`proof:glass-cal` resolved-radius lock) may want the names retained for the compose recipe. Fable rules.
2. **The floating==overlay collision + the 2dppx arm:** either (a) document the DPI arm as intentional (the
   comment's rationale: denser backing store amortizes a richer wash, `light-dark.css:29-42`) and give overlay
   a distinct base value from floating, or (b) **kill the 2dppx arm** (F48 wants subtler for ALL, not richer on
   retina; a ~55% device-dependent jump is the opposite of "consistent"). Draft leans **kill the DPI arm** —
   it directly contradicts F48's "subtler for ALL" and is the single most device-inconsistent value in the
   ladder — and collapse floating/overlay to one value or separate them by a real perceptual step. `OPEN-2b`.
3. **F48 subtler-for-ALL:** a further uniform pull. The ladder already dialed back ~30% (`glass.css:64-71`);
   F48 (post that work) still reads it heavy. This is **paint-taste** — owed a live π against the F49/F50
   reference (§π), not a blind further integer pull. `OPEN-2c`: is a further pull warranted at HEAD, or did
   the shipped dial-back already satisfy F48? The wave captures the current ladder vs F49/F50 and rules.

**(D) One material per role (the F28 select-vs-buttons arm).** F28 shows "sibling controls carrying different
materials (select vs Play/Reset)" (`VISUAL-GESTALT.md:50`). On disk: the form family (Select/Input/…) shares
`--control-surface-blur: var(--glass-blur-quiet)` (7px, `glass.css:407`); an ordinary Button cell reads
`--glass-blur-resting` (7px, `button/styles.css:50`); a **primary** Button reads `--glass-blur-deep` (16px,
`button/styles.css:43`). So an ordinary button and a select **already match at 7px** — but a *primary* button
(Play?) at 16px genuinely diverges from a select at 7px. **F28's divergence is plausibly the deep-tier primary
vs the quiet select, and may be INTENTIONAL (primary emphasis).** This arm **owes a live-π re-check** to
determine whether the F28 buttons are primary (intentional deep) or ordinary (should match, a real bug) before
any change — the exact "verify born-RED on disk" discipline.

### §Work

- The blur-ladder precept section (the rungs + the DPI arm ruling — coordinate `BAND-DOC-TRUTH`; the ladder is
  the `tunable-anim.md` stale-4px-default neighbor, `doc-and-canon-drift.md` finding 5).
- `glass.css:86-97` — the rung ruling (rename-to-real vs document; the floating/overlay separation).
- `light-dark.css:38-42` — kill or document the 2dppx overlay arm (per `OPEN-2b`).
- `drawer/styles.css:379` `backdrop-filter: blur(14px)` → the overlay/deep rung token (raw literal, flips
  `BAND-GATES` W3 `token-hygiene` GREEN — verified RED at HEAD).
- The F28 material re-check → repoint only if the divergence is unintended.

### §Acceptance — born-RED

- **Collision RED at HEAD (verified):** `glass.css:87-88` quiet==resting==7px; `:89,97` floating==overlay==11px.
  GREEN when the ladder is ruled (renamed-to-real or documented-intentional) so name↔value is 1:1 or explained.
- **DPI-arm RED at HEAD (verified):** `light-dark.css:40` overlay→17px at 2dppx (a value the base ladder never
  states). GREEN when killed or documented as intentional in the precept.
- **Raw-blur RED at HEAD (verified):** `drawer/styles.css:379` `blur(14px)`. GREEN when repointed (the
  `BAND-GATES` W3 coordination flip).
- **`OPEN-2d` F28 live re-check:** the wave MUST run a live π on `/foundations` (or the F28 story) to confirm
  the select-vs-button divergence is deep-primary (intentional) or ordinary (bug) before touching it.

### §π/DELTA

**This wave is π-heavy** (F48/F28 are paint-taste). Capture: the full ladder rendered as glass plates at each
rung (Safari + Chrome, standard + 2dppx) → the collision + DPI jump made visible; the F28 select-vs-button
sibling pair; and the F48 subtler judgment **against the F49/F50 reference stills** (`feedback/F49-*.png`,
`feedback/F50-*.png`) — the codex law-1 "subtler blur overall" target. The DELTA artefact is the before/after
ladder, not a commit claim (MEMORY `live_verify_capture`).

### §KISS / parsimony

Renaming 6 dead-value names to 4 real rungs is net-negative vocabulary. Killing the 2dppx arm removes a whole
`@media` block. The precept is the parsimony payoff: the ladder becomes auditable, so `BAND-GATES` W3 can lint
raw blur against it.

### §Non-goals

- The `backdrop-filter`-literal lint → `BAND-GATES` W3.
- The gradient/progressive backdrop blur (codex law 1's directional halo) → wave 3 (the `--glass-halo-*`
  cohort); this wave rules the FLAT rung ladder only.
- The saturate/brightness companions (`glass.css:104-153`) — untouched (radius-axis only, per the shipped
  gate's B3 invariant); any saturate revert is a separate later paint.

### §OPEN

- `OPEN-2a` — rung names: rename to 4 real rungs vs keep 6 documented-collapsed names. Fable rules.
- `OPEN-2b` — the 2dppx overlay arm: kill (draft) vs document intentional. Fable rules.
- `OPEN-2c` — F48 further pull: warranted at HEAD vs already-satisfied by the shipped dial-back (π decides).
- `OPEN-2d` — F28 buttons: primary (intentional deep) vs ordinary (bug) — live-π gated.

---

## Wave 3 — `BJ.W-GRADED-BACKDROP-JUDGE` — adopt-or-retire the gradient-backdrop-blur experiment

### §Mandate

Discharges `chronic:experiment-frozen-into-major` (the halo cohort, `round-2c/chronic-decided-draft.md:217-223`)
+ `chronic:deferral-to-invented-future-window` (the GRADED-BACKDROP "later minor/major" defer,
`:153-159`) + **iOS-27 codex law 1** (progressive blur; the OpenAI F49/F50 glow pool, the Spotlight directional
falloff, `IOS27-CODEX.md:11-14`). User order (F50): "Gradient blurring behind the element — popovers/modals
should likely have something like this; **experiment with it at least, judge effectiveness and design**."

### §Design — force the freeze decision the experiment ducked

The `--glass-halo-*` cohort (blur 20px / core 13rem / bloom 7rem, `glass.css:171-173`) + the FORM 2
box-following bloom (`dialog/placement.css:141-209`, the intersect double-ramp mask, Safari-safe, no `url()`
filter) **already landed in-tree pre-tag** (commits `24b63d01`/`189ae15c`/`71892b9e`) while its adopt-or-defer
decision is **explicitly unresolved** — against the GRADED-BACKDROP wave's own warning that an experimental
public API "cannot be frozen into the immutable major half-baked" (`chronic-decided-draft.md:217-221`). This is
an **EXPERIMENT wave with an explicit judgment gate**: the deliverable is a **recorded ADOPT or DECLINE
ruling with captured π evidence**, forced before the freeze.

The mechanism on disk is sound and matches the codex law-1 target:
- `data-backdrop="graded"` opt-in (`ModalOverlay.vue:49`, `isGraded`); two consumers named (the immersive
  Dialog + the BI.W-ENGAGE-AFFORD slider modal, `glass.css:162-164`).
- FORM 2 is the **radial-struck box-following bloom**: frost-near / sharp-far, concentric with the modal
  radius — this IS codex law 1's "radially (the OpenAI F49/F50 glow pool)" (`IOS27-CODEX.md:12`). The flat
  immersive scrim is gated OFF under graded (`drawer/styles.css:378`, the Δ0 swap).

The two outcomes the judgment gate must choose between:
- **ADOPT** — keep the cohort as 7.0.0 public surface; it is additive and matches the F49/F50 reference. The
  literal-mirror asserts in `graded-backdrop.test.ts:125-141` (the `20px`/`13rem`/`7rem`/`34px` pins) then
  **collapse into relationship checks per `BAND-GATES` W1** (that wave's KILL roster names this file,
  `BAND-GATES.md:77`) — coordinate so adopt does not leave brittle literal pins.
- **DECLINE** — **STRIP the `--glass-halo-*` cohort** (an undecided experiment must not become a 7.0.0
  public-surface commitment, `chronic-decided-draft.md:223`), and route the still-heavy flat immersive scrim to
  a **named decline-residual wave** (`BI.W-IMMERSIVE-SCRIM`, `chronic-decided-draft.md:159`) — NOT a floating
  post-tag defer (the invented-window the chronic ledger forbids).

### §Work

- The A/B capture + the recorded ruling (DesignSync + Fable paint-taste, per MEMORY
  `frontend_design_mcp_fable`).
- **If ADOPT:** the token-freeze ratification + coordinate the `graded-backdrop.test.ts` literal-collapse
  with `BAND-GATES` W1; document the cohort in the material precept.
- **If DECLINE:** strip `--glass-halo-*` (`glass.css:171-173`) + FORM 2 (`placement.css:141-209`) + the
  `isGraded` axis (`ModalOverlay.vue`) + the test; open `BI.W-IMMERSIVE-SCRIM` for the residual scrim.

### §Acceptance — the judgment gate (not a defect-probe)

- **The RED is the unresolved-freeze state itself:** the cohort is public surface (`glass.css:171-173`,
  verified) with **no ratified adopt** (`chronic:experiment-frozen-into-major`, verified in the chronic
  ledger). GREEN = a recorded ADOPT/DECLINE ruling **with the π artefact below**, landed before the 7.0.0
  freeze. A "leave it and decide later" is explicitly RED (the invented-window the ledger forbids).
- **Teeth:** if ADOPT, the `graded-backdrop.test.ts` literals must be reconciled to relationships (no brittle
  pin survives the tag); if DECLINE, `grep -rn 'glass-halo\|data-backdrop.*graded' src/` must be **empty**
  (the strip is complete, no orphan).

### §π/DELTA — the load-bearing obligation (charter-mandated)

**The π obligation IS the Spotlight/F49 reference comparison.** Capture (Safari + Chrome, over a busy/colored
page): (1) the graded halo ON — the frost-near/sharp-far box-following bloom; (2) the flat immersive scrim
(graded OFF) — the F48 uniform-heavy-blur baseline; (3) side-by-side with the **OpenAI F49/F50 reference
stills** (`feedback/F49-openai-popup-subtle-blur.png`, `feedback/F50-gradient-blur-behind.png`) and the codex's
Spotlight V3/f-0004 directional-falloff mark (`IOS27-CODEX.md:12`). The ruling cites this DELTA — the user
asked to "judge effectiveness and design," so the evidence IS the judgment.

### §KISS / parsimony

The decision is the parsimony act: either the experiment earns its public surface (kept, asserts collapsed) or
it is removed entirely (no half-baked axis frozen into the major). No masking fallback — DECLINE routes to a
real residual wave, never a silent post-tag float.

### §Non-goals

- Adaptive content tint (codex law 2) — the halo dims/blurs, it does not sample backdrop hue; that is Family G.
- The flat rung ladder retune → wave 2.
- The ENGAGE-AFFORD slider-modal consumer's own landing → `BI.W-ENGAGE-AFFORD` (this wave rules the shared
  halo surface it consumes, `BI.W-ENGAGE-AFFORD.md:397-413`).

### §OPEN

- `OPEN-3a` — **the core judgment: ADOPT vs DECLINE.** Fable + DesignSync rule on the π. The single most
  load-bearing OPEN in this band.
- `OPEN-3b` — if ADOPT: the halo defaults (20px/13rem/7rem) held vs retuned against the F49/F50 subtler target.
- `OPEN-3c` — if DECLINE: confirm `BI.W-IMMERSIVE-SCRIM` as the residual owner (vs folding the residual into
  wave 2's F48 pull).

---

## Wave 4 — `BJ.W-TRACK-DRY` — the slider/progress/scrubber shared-track dedup

### §Mandate

Discharges the **F23** track-family DRY ask (`FEEDBACK-LEDGER.md:35`: "the progressbar/slider/etc
**deduplication**: same logic, DRY them out") + `REGISTRY.md:132-134` ("F23 slider/progress DRY — the
track-family dedup is its own wave-candidate"). User order: "same logic, DRY them out."

### §Design — census first, then DRY the shared mechanic (API shape is OPEN)

**The census (verified on disk).** Three components paint a horizontal track + a value-fraction fill, each
re-spelling the same mechanic with divergent token names:

| Component | Track surface | Track-bg token | Fill child | Fill token | Shared register |
|-----------|---------------|----------------|------------|------------|-----------------|
| Slider | `.slider-track` (`Slider.vue:286-293`) | `--slider-track-bg` / `--muted-medium` | `.slider-range` | (range = the fill edge) | **`glass-liquid-fill`** (`Slider.vue:224`) |
| Progress | `.progress-rail`/`.progress-track` (`Progress.vue:100-101`) | `--progress-track` / `--progress-track-on-glass` | `.progress-value-fill` (`:149-156`) | `--progress-fill` / `--primary` | **`glass-liquid-fill`** via `.progress-liquid-fill` (`:60-61,169`) |
| Scrubber | `.continuous-track`/`.timeline-rail` (`ContinuousRail.vue:31`, `:84`) | (composes warm-glass `.timeline-rail`) | `.continuous-region-fill` | `--stitch-gradient` | — (region-stitched, own idiom) |

**Shared, verified:** all three are pill-rounded (`--radius-pill`), all three window a value-fraction fill,
and **`glass-liquid-fill` is ALREADY the shared fill register** (slider-range + progress both compose it,
`Slider.vue:224` + `Progress.vue:61,169`). **Divergent:** the track-bg token name (`--slider-track-bg` vs
`--progress-track` vs the timeline warm-glass), the track-height token (`--slider-track-height` vs
`--timeline-h`), and the **fraction driver** (reka `SliderTrack` drag vs Progress value vs Continuous
region-stitch). So the DRY target is the **track pill + track-bg + fill register** — NOT the fraction drivers,
which are legitimately per-component (interactive drag ≠ value-bound ≠ region-stitched).

**The fold:** one shared track partial (a `_shared/track.css` `@utility glass-track` / `--track-*` token
family, mirroring the existing `glass-liquid-fill` CSS-class idiom) carrying the pill radius + the track-bg +
the recessed-well tone; the three components read it and keep only their own fraction driver. This is the
`glass-liquid-fill` pattern extended one step — a proven, KISS, no-new-machinery fold.

### §Work

- Census the exact shared vs divergent surface (the table above is the seed; the wave re-proves each site).
- Author the shared track partial + `--track-*` tokens (per the `OPEN-4a` shape ruling).
- Repoint Slider / Progress / ContinuousRail track surfaces onto it; retire the three divergent track-bg
  token names onto the one register (clean break, no aliases).

### §Acceptance — born-RED

- **Divergence RED at HEAD (verified):** three components re-spell the same pill-track + track-bg mechanic
  with three token vocabularies (`--slider-track-bg` / `--progress-track` / timeline warm-glass), and only the
  fill (`glass-liquid-fill`) is shared. GREEN when the track surface is ONE partial and the three read it.
- **No-regression:** the value-follow / drag / region-stitch behavior of each is byte-behaviorally unchanged
  (the fraction drivers are untouched) — a reka-binding render canary (MEMORY `glass_ui_binding_verification`)
  plus the existing slider/progress contract bodies stay GREEN.

### §π/DELTA

The three tracks must render **pixel-identical before/after** the fold (Safari + Chrome): the DRY is a
refactor, not a restyle — the DELTA artefact proves the shared partial reproduces each track's current paint
(the honest refactor-safety capture). Any deliberate visual unification (e.g. equalizing track heights) is a
SEPARATE ruling with its own π, not smuggled into the dedup.

### §KISS / parsimony

Net-negative: three token vocabularies → one; extends the existing `glass-liquid-fill` idiom rather than
minting new machinery. Gestalt-not-patchwork: one track material, three consumers.

### §Non-goals

- The fraction drivers (reka SliderTrack / Progress value / Continuous stitch) — untouched, legitimately
  per-component.
- The timeline ground-up redesign (F16) → Family C/G (this wave only folds the shared TRACK mechanic; the
  timeline's own overfit is a separate sentence).
- The slider engage/modal-expansion variant (A01) → `BI.W-ENGAGE-AFFORD`.

### §OPEN

- `OPEN-4a` — **the API shape (charter-mandated OPEN):** a CSS `@utility glass-track` / `_shared/track.css`
  partial (draft-leaning — matches the `glass-liquid-fill` idiom, KISS, no JS) vs a `useTrackGeometry`
  composable vs a `<GlassTrack>` component. The fraction/orientation/RTL logic differs enough per component
  that a full **component** merge over-couples (drag ≠ value ≠ stitch); the draft folds the MATERIAL (CSS) and
  leaves the DRIVER (per-component). Fable rules the shape.
- `OPEN-4b` — whether ContinuousRail's warm-glass region-stitch track joins the fold or stays its own idiom
  (its stitched-gradient fill is genuinely distinct from the two liquid-fill consumers).

---

## Wave 5 — `BJ.W-ARISTOTLE-PROPORTION` — the aristotelian-proportion review pass (A10)

### §Mandate

Discharges **A10** (`FEEDBACK-LEDGER.md:77`: "**Aristotelian proportion audit** of cards/components/
affordances/hierarchy/margins/paddings/dividers/small UI; mark superfluous/duplicative/distracting elements
for removal; mark the converse — more affordance needed") + **iOS-27 codex law 11** (the restraint floor,
`IOS27-CODEX.md:52-54`) + the proportion-shaped feedback rows F03/F10/F11/F31. Design authority: the A03
aristotelian-proportion triumvirate (`FEEDBACK-LEDGER.md:70`).

### §Design — a REVIEW wave: capture, critique, mark; it feeds fixes, it does not fix

A10 is a **judgment/review** ask, not a mechanical fix — its output is a **marked defect roster** (each entry:
site, the disproportion, remove-vs-add verdict, the owning follow-on wave). Because it is **paint-taste
heavy**, its gates are **π-capture obligations, not asserts** (per the charter). The review runs the precepts
DESIGN-ITERATION loop (Fable + DesignSync) over the proportion surfaces, grounded in these verified sites:

- **F10 flat hierarchy** — group header and field labels at equal visual weight (`VISUAL-GESTALT.md:63`);
  corroborated typographically (StorySection pins every heading to the smallest rung, `text-subheading`,
  round-2b typography `story-hierarchy-flattening`). The proportion read: sections need a size ladder, not a
  caps stamp, for hierarchy.
- **F11 item-gap** — "no gap between items like this" (`FEEDBACK-LEDGER.md:23`): a gapped accordion that should
  read as ONE inset grouped list (`VISUAL-GESTALT.md:64`).
- **F31 curve-gallery void** — "why all the bottom padding" (`FEEDBACK-LEDGER.md:43`): an oversized empty
  region (the converse — proportion demanding content or collapse).
- **F03 worthless section** — "most of this is worthless" (`FEEDBACK-LEDGER.md:15`): superfluous elements
  marked for removal.
- **The Card gold+grain default** — `Card.vue` ships `metal:"gold"` + `grain:true` on every instance with zero
  overrides (Family C seed, `BAND-GATES.md:234-238`): a distracting decoration on every card, the exact A10
  "superfluous/distracting" class — mark for the Card default ruling (Family C owns the decision).
- **The double-card wrap** (F46/F01, `VISUAL-GESTALT.md:34`): a preview card inside a category card — a
  redundant nesting the proportion review marks (fix owned by `BAND-STORY` `W-PREVIEW-CARD`).
- **Dividers** — inventory the divider usage (the A10 "dividers" term); mark where a divider is superfluous
  (weight already carried by spacing) vs where one is needed.

### §Work

- The proportion capture + critique (Fable + DesignSync, the A03 triumvirate posture: critics default-assume
  the current state is wrong, `FEEDBACK-LEDGER.md:70`).
- The marked roster (site → disproportion → remove/add → owning follow-on wave), committed as the wave's
  deliverable — this is the SPEC for the follow-on fixes, the way `BAND-GATES` W1's keep-list is its own spec.

### §Acceptance — π-capture obligations, not asserts

- **Not born-RED with a code probe** — proportion is a taste judgment; there is no static assert. The
  acceptance is the **captured DELTA roster**: annotated screenshots (Safari + Chrome) at each proportion site
  above, each marked with the disproportion + verdict + owner. A roster entry with no captured evidence is
  RED (MEMORY `live_verify_capture`: a claim needs a captured artefact, not a commit message).
- The roster must reconcile against A10's two directions: **superfluous-for-removal** AND **converse-needs-more**
  — a roster that only cuts (or only adds) is incomplete.

### §π/DELTA

The wave IS a π obligation. Every marked site carries a before-capture; the follow-on fix waves carry the
after. No source changes here — so no after-DELTA in THIS wave; it produces the baseline the fixes measure
against.

### §KISS / parsimony

The review is the parsimony instrument itself: A10 exists to **remove** superfluous/duplicative/distracting
elements (fewest elements that carry the meaning). The deliverable is a roster, not new code — zero LOC, all
judgment.

### §Non-goals

- The fixes themselves — each marked entry routes to its owner: F10/F11 → `BAND-STORY`
  (`W-CONFIGURATOR-STD`/`W-WIDTH-HIERARCHY-TRUTH`); the Card gold+grain default → Family C; the double-card →
  `BAND-STORY` `W-PREVIEW-CARD`. This wave supplies the proportion CRITERIA + the marked roster, not the paint.
- The typography hierarchy ladder (the F10 SIZE cure) → the typography codemod (see §Band-level OPEN-B).
- Aurora/handmark/blob greenfields — Family G.

### §OPEN

- `OPEN-5a` — the deliverable shape: a marked roster feeding NAMED follow-on waves (draft) vs inline fixes
  where trivial. Draft keeps it review-only (paint-taste fixes belong to the story/component owners with their
  own π). Fable rules.
- `OPEN-5b` — the divider inventory scope: all dividers, or only the story/card dividers the feedback names.

---

## §Band-level obligations & OPEN roll-up

**Coordination handoffs (values authored here → gate GREEN / fix owned by siblings):**
- Raw-radius repoint (W1: SortableList 999px, segmented raw) → flips `BAND-GATES` W3 `token-hygiene` GREEN
  (that gate is born-RED against these exact sites, `BAND-GATES.md:207-209`).
- Raw-blur repoint (W2: drawer `blur(14px)`) → flips `BAND-GATES` W3 `token-hygiene` GREEN (`BAND-GATES.md:208`).
- Graded-halo verdict (W3 ADOPT) → collapse `graded-backdrop.test.ts` literals per `BAND-GATES` W1 KILL roster
  (`BAND-GATES.md:77`); (W3 DECLINE) → open `BI.W-IMMERSIVE-SCRIM` residual.
- The role-table + blur-ladder precepts (W1/W2) → coordinate the `design-idioms.md` §3/§7 + `tunable-anim.md`
  rewrites with `BAND-DOC-TRUTH` / `BAND-COLOCATION` (do not duplicate their doc-truth sweep).
- W5 proportion roster → `BAND-STORY` (F10/F11/preview-card) + Family C (Card default) + the follow-on fixes.

**`OPEN-B` — the typography-codemod ownership gap (band-level, charter-flagged).** The charter scopes this
band to the FIVE waves above and instructs re: typography "coordinate with `BAND-GATES` W4, **do not
duplicate**." But `BAND-GATES` W4 (`BAND-GATES.md:309,349-357`, OPEN-9/OPEN-10) assigns the **residual-canon
tokenization + the 251-site `text-sm`/`text-xs` codemod + the coupled default-ramp reset flip + its paint π**
to "**the Family F typography wave**" — i.e. THIS band — which the charter's five-wave scope does **not**
include. This is a genuine unassigned obligation: the ramp-reset gate (`BAND-GATES` W4) is RED until the
codemod lands, and no drafted wave owns the codemod. **Fable must rule:** is the typography codemod a SIXTH
wave of this band (`BJ.W-TYPE-CODEMOD`, not drafted here per charter scope), or does it live in `BAND-STORY`
(where the 232 demo-story sites concentrate), or in `BAND-GATES` W4 itself (all-in)? Flagged, not silently
dropped (the F14/silent-drop discipline, `FEEDBACK-LEDGER.md:6`).

**OPEN markers for the Fable two-challenge pass:**
1. `OPEN-1a` — F09/F12/F17 disk-vs-screenshot drift; live-π re-check before any defect claim. [W1, substantive]
2. `OPEN-1b` — `--radius-input` new name (`--radius-media` vs `--radius-tile`). [W1]
3. `OPEN-1c` — `segmented.css` repoint target (`--radius-control` vs `--radius-strip`). [W1]
4. `OPEN-2a` — blur rung names: rename to 4 real rungs vs 6 documented-collapsed names. [W2]
5. `OPEN-2b` — the 2dppx overlay arm: kill (draft) vs document intentional. [W2]
6. `OPEN-2c` — F48 further subtler pull: warranted vs already-satisfied (π decides). [W2]
7. `OPEN-2d` — F28 buttons: primary-intentional-deep vs ordinary-bug; live-π gated. [W2, substantive]
8. `OPEN-3a` — **the graded-backdrop ADOPT vs DECLINE ruling** (the band's most load-bearing). [W3, substantive]
9. `OPEN-3b/3c` — halo defaults if adopt / residual owner if decline. [W3]
10. `OPEN-4a` — **the track-DRY API shape** (CSS partial vs composable vs component). [W4, substantive]
11. `OPEN-4b` — ContinuousRail joins the fold vs stays its region-stitch idiom. [W4]
12. `OPEN-5a/5b` — W5 roster deliverable shape + divider inventory scope. [W5]
13. `OPEN-B` — **the typography-codemod ownership gap** (a 6th wave here vs `BAND-STORY` vs `BAND-GATES` W4).
    [band-level, substantive]

**In-scope summary:** one canonized radius role-table + 2 canon-defect reconciles + 4 raw-radius repoints
(W1); the blur-ladder ruling + the DPI-arm decision + 1 raw-blur repoint (W2); the forced graded-backdrop
adopt/decline with the F49/F50 π (W3); the track-family fold to one shared material (W4); the A10 proportion
roster feeding follow-on fixes (W5). The band makes the material ladders **auditable and role-coherent** — the
enforcement rides `BAND-GATES` W3/W4; this band supplies the canon those gates measure against.
