# OVERLAYS — WAVE-AMENDMENT: the concrete tranche reform (reconciled vs the 116-wave set)

> The CONCRETE amendment for the OVERLAY family. Reference implementation:
> `docs/tranches/BD/greenfield/overlays/GOLDEN.md` (as CORRECTED by the C1/C2/C3 folds in
> `DELTA-ASSAY.md` §2). A **COUPLE + UNIFY + DEPEND** — the warm panel + reveal floor + scrim +
> a11y + φ pad SURVIVE; the drawer's three dead couplings are the only RE-INVENT, landed as ONE
> `--stage-t` scalar. Reconciled against `docs/tranches/BD/union/waves/` (116 waves) +
> `select-forms/WAVE-AMENDMENT.md` + `motion-spring-register/WAVE-AMENDMENT.md` + `page-background/`
> — **no duplicative work, no parallel fork, no legacy.** Every wave references the GOLDEN; every
> gate is born-RED on HEAD (live-verified this pass).

---

## A. AUDIT — what already exists (reconcile FIRST, never re-author)

| concern | owning wave / seam | status on disk | overlay action |
|---|---|---|---|
| warm panel fill | `BC.W-OVERLAY-UNIFORM` (surface axis) | shipped, live-proven | DEPEND → SUPERSEDE into `@utility` (no regression) |
| warm-floating SOURCE | `W-GLASS-ABROGATE-GRAY` | LANDED | DEPEND (do not re-warm) |
| `--glass-bg-floating-tinted` widen to overlays | select-forms `WAVE-AMENDMENT` **C1** (augments ABROGATE-GRAY) | SPEC (sibling amendment) | **DEPEND + extend selector** to dialog/command |
| portal field (`.paper-field`/`--field-h`) | `BD.W-PAGE-FIELD` / `BD.W-FIELD-SCRIPT` (+ select-forms D1.1 re-emit) | SPEC | **DEPEND + widen portal-root selector** |
| reveal calm floor | `BB.W-LIQUID-REVEAL` (`glass/reveal.css`) | shipped (live `--glass-reveal-enter-scale:0.88`) | KEEP |
| reveal SPATIAL re-clock (punch) | select-forms **C2** (augments `BB.W-LIQUID-REVEAL`) | SPEC | **DEPEND** (consumer, not re-author) |
| `--ease-cartoon-punch` / `--motion-weight` | `BD.W-CARTOON-PUNCH` / `BD.W-MOTION-WEIGHT` (motion amendment) | SPEC | DEPEND (no re-mint) |
| `--glass-edge-floor` | glass-material GOLDEN | SPEC | DEPEND |
| `.dock-trigger` register | `W-DOCK-CORE` (`dock-controls/triggers.css`) | shipped | **EXTRACT base** (no fork) |
| see-through peek/half crown | `BD.W-SHEET-TRANSLUCENT` (`--glass-bg-sheet`) | **SPEC, NOT shipped** | **hard PREREQ** OR self-own via 2-segment freeze |
| `--overlay-scrim-ink` / `--radius-panel` / `--overlay-min-width`/`-max-block` | shipped tokens | live ✅ | RE-POINT |
| `shouldScaleBackground` | `Drawer.vue:45,55` | dead (grep 0 `scale(`) | **DELETE** |
| `W-DRAWER-DETENT-GLASS` (prompt's named stub) | — | **DOES NOT EXIST** in union/waves | net-new, owned by C1 below (no stub to fold) |

---

## B. NEW WAVES (net-new src — the COUPLE + UNIFY the siblings do not cover)

### B1 — NEW `BD.W-OVERLAY-STAGE-COUPLE.md` (the headline; Band B · Triage X→couple)

**depends:** `BD.W-SHEET-TRANSLUCENT` (the peek/half crown floor — hard PREREQ, see §D) ·
`BD.W-MOTION-WEIGHT` (PRM→0 zeroing) · the shipped `--glass-drawer-t`/`useDrawerSnap`/`--glass-level`/
`--spring-snappy`/`--overlay-scrim-ink` (the spine RIDES these — STANDS ALONE).
**reference:** GOLDEN §2 (as corrected by DELTA-ASSAY §2 folds C1·R2, C2·R1, C2·R, C1·R4, C1·R6, C3·R3).

**Build (RE-POINT, zero new paint path, zero new engine):**
1. `@property --stage-t` (`<number>`, `inherits:true`, `tokens/property-regs.css`). **ONE writer**
   — the snap engine writes `--stage-t` DIRECTLY; `--glass-drawer-t` is RETIRED into it or becomes
   a `calc()` read OF it (NO dual scalar — fold C1·R2). A modal flips `--stage-t` 0→1 on
   `--spring-snappy`; close-write `--stage-t:0` via `:not([data-state=open])` reset (fold C3·R7).
2. **(A) FREEZE** — RE-POINT `drawer.css:128` (`[data-glass-drawer-snap-points=true]`). A
   **TWO-SEGMENT** lerp owned by the wave (fold C3·R1, self-standing crown): transmissive descent
   `--glass-bg-overlay` α `0.95→~0.74` over t∈[0,0.85] + solidify toward a **warm-tinted** card-mix
   (`color-mix(--card, --glass-tint-source X%)`, NOT bare `--card` — fold C1·R4) over [0.85,1];
   `backdrop-filter` blur decays to 0 as it solidifies. Composed AT THE ELEMENT (the shipped
   `[data-surface=opaque]` substitution-safe path), NEVER an ancestor filter.
3. **(B) SCRIM DEEPEN** — RE-POINT the DrawerOverlay/dialog scrim: `α = clamp(0, 28% + t×44%, 72%)`
   on `--overlay-scrim-ink`.
4. **(C) PAGE RECEDE** — NEW `[data-stage-wrapper]` recipe: `scale: calc(1 - 0.05*clamp(0,t,1))`
   + `border-radius: calc(--radius-panel * clamp(0,t,1))` ONLY — **NO `filter`** (fold C2·R1).
   `shouldScaleBackground` **DELETED**; honest `stage="none|dim|scale|immersive"` enum on
   `Drawer`/`Dialog`/`Sheet`/`Command` sets `data-stage-*`. **PRM → `scale` degrades to `dim`**
   (no page transform — fold C1·R6). Marker mounted by `demo/App.vue` (named artefact — fold C3·R5).
5. **(D) BLUR ENGAGE** — `immersive` only, gated to the modal-flip 0→1 ONE-SHOT, NEVER the drawer's
   per-frame scalar (fold C2·R). Default OFF.

**born-RED gate (`tests-visual/overlays.spec.ts`, chromium+webkit, both modes, NEVER reducedMotion
on the stage arm):**
| # | assert | born-RED on HEAD (LIVE-VERIFIED this pass) |
|---|---|---|
| G3 FREEZE | drag peek→half→full; composited sheet α **≤0.8 + page bleeds at peek/half**, **→~1 + blur→0 + C≥0.02 warm (dark req) at full** | **α 0.95 + blur 20px FIXED at t={0.12,0.4,0.7,1.0}**, surface never opaque |
| G4 PAGE-SCALE | `stage=scale`: wrapper matrix scale **1→~0.95**; `shouldScaleBackground` grep 0; `#app`/wrapper moves real px | `#app transform:none scale:none`; `shouldScaleBackground` read by nothing |
| G5 SCRIM | scrim α **tracks `--stage-t`** (peek dims < full) | scrim α **0.8 FIXED** |
| G10 PRM | one static frame: no stage-anim; `stage=scale`→wrapper `transform:none`+scrim present; opaque-at-full SURVIVES warm | — (structure carve) |
| G11 x-engine | paired chromium+webkit for G3/G4; **no `backdrop-filter:url`, no per-frame re-blur** (engage one-shot-gated); **no `filter` on `[data-stage-wrapper]`**; **no `position:fixed` overlay is a descendant of the wrapper** | — |

### B2 — NEW `BD.W-OVERLAY-PANEL.md` (UNIFY the panel; Band B · Triage R · small)

**depends:** select-forms C1 (the `--glass-bg-floating-tinted` widen) — but degrades gracefully.
**reference:** GOLDEN §3 (as corrected by C2·R2).

`@utility overlay-panel` (`glass/overlay.css`) — DRY the three SFCs' class-soup: bakes the shared
geometry + the **√φ** pad ladder (`--overlay-pad-block = --overlay-pad-inline × 1.272`; KEEP the
1.272 value — it is ALREADY live inline on dialog-content — but label it "the √φ rung", fold C1·R7).
Fill = **`var(--glass-bg-floating-tinted, var(--glass-bg-overlay))`** — the SHIPPED-ladder fallback
so the panel is NEVER transparent if the C1 widen hasn't landed (fold C2·R2). Dropdown/Context/
Command compose `overlay-panel [--overlay-pad-inline:--spacing(1)]`; Popover/HoverCard bare; Tooltip
+ smaller radius; Dialog swaps tier → `glass-overlay`. Byte-stable behavior (DRY, not a regression).

**born-RED gate:** G1 warm-not-gray PAINTED (mean OKLab C≥0.02 warm, both modes) — born-RED on the
field-flat HEAD (`--field-h` unset); + a **fallback-renders-non-transparent** bite: with the C1
widen ABSENT, the panel still composites the warm `--glass-bg-overlay` ladder (NOT `transparent`).

### B3 — NEW `BD.W-OVERLAY-TRIGGER.md` (FORMALIZE the trigger; Band B · Triage R · small)

**depends:** `W-DOCK-CORE` (the `.dock-trigger` base extraction) · glass-material `--glass-edge-floor`.
**reference:** GOLDEN §5 (as corrected by the C1·R1 de-fork — THE landing refutation).

**NO parallel `.overlay-trigger` recipe.** EXTRACT the shared trigger contract from `.dock-trigger`
into ONE knob-parameterized base (`@utility trigger-anchor`: no-hover-scale + `[data-state=open]`
pressed plate + edge-floor + bloom-from-anchor, parameterized by `--trigger-gap`/`--trigger-radius`/
`--trigger-fg`/`--trigger-press-spring`). `.dock-trigger` composes it with `--dock-*`; the overlay
triggers (Popover/Dropdown/HoverCard/Tooltip/Context) compose it with overlay defaults (over the
already-congruent `btn-pill` register). ONE source, two configs — dock and overlay triggers can
never drift. The panel `transform-origin` (`--reka-popper-transform-origin`, wired) is the
pressed-trigger rect → trigger + bloom + panel read as ONE gesture.

**born-RED gate:** G8 — popover + dropdown trigger composite **byte-identical** edge/hover/
`[data-state=open]` plate (ΔE≈0); the anti-evasion bite FAILS on a second forked register (the gate
asserts ONE base, not two classes). Born-RED note: live in-demo both are ALREADY `btn-pill` — the
gate's teeth are the *can't-drift structural* assertion + the no-fork bite, not a live-divergence
bite.

### B4 — NEW `proof:overlays` (`tests-visual/overlays.spec.ts`)

The painted-pixel born-RED battery (G1–G12, §9 of GOLDEN) + the ≥6 anti-evasion bites + the
paired-engine reveal/stage frame-series + the THREE new fold-bites: (a) `filter` on
`[data-stage-wrapper]` → FAIL; (b) a `position:fixed` overlay as a wrapper descendant → FAIL;
(c) the panel composing `transparent` when the C1 widen is absent → FAIL. Cardinal rule: composited
painted pixel of the actual overlay over the actual page, REAL gesture — never `getComputedStyle`
over a hardcoded field. **NO source-green close.**

---

## C. AUGMENT (existing waves — widen in place, no fork)

### C1 — `BD.W-SHEET-TRANSLUCENT.md` — AUGMENT (reclassify + cross-link)
Reclassify from the GOLDEN's "DEPEND (shipped)" to a **hard inbound PREREQUISITE** that lands FIRST
(it is `Status: SPEC` — `--glass-bg-sheet`/`--glass-opacity-sheet` ABSENT). Add a cross-link note:
it owns the peek/half FLOOR (~0.74); STAGE-COUPLE's two-segment freeze owns the [0.85,1] solidify.
Complementary endpoints of the SAME `--glass-bg-sheet` rung — NO overlap. (If STAGE-COUPLE must
self-stand, its two-segment freeze owns the descent too — the wave names this branch explicitly.)

### C2 — select-forms `WAVE-AMENDMENT` C1 (the `--glass-bg-floating-tinted` widen) — EXTEND selector
The overlay band adds `[data-slot=dialog-content]` + the command roots to the `:where()` list the
select already widens (popover/dropdown). ONE shared warm floor — the overlay band does NOT re-mint.
(Coordinate: this is a one-line selector extension on the SAME C1 augment, not a new wave.)

### C3 — select-forms D1.1 (the `.glass-field-portal::before` re-emit) — WIDEN portal-root selector
Add the dialog/command portal roots to the portal-field re-emit (`menu.css`). DEPEND, widen only.

---

## D. RECONCILE / PRUNE / EXCISE (vs the 116-wave set — explicit, no dup)

| target | action | rationale |
|---|---|---|
| `W-DRAWER-DETENT-GLASS` (prompt-named) | **N/A — does not exist** | absent from `union/waves/`; the drawer detent→opacity is net-new, owned by B1. No stub to fold, no content lost. |
| `BD.W-SHEET-TRANSLUCENT` | **AUGMENT (C1) — reclassify to PREREQ** | SPEC not shipped; owns the crown floor B1 depends on. Not pruned. |
| `BC.W-OVERLAY-UNIFORM` (shipped) | **DEPEND / SUPERSEDED-BY B2** | the proven panel uniformity is formalized into the `@utility`; NO behavior regression. Not pruned. |
| `BB.W-LIQUID-REVEAL` (shipped) | **KEEP + DEPEND (consumer)** | the reveal floor is fit; the punch re-clock is the select-forms C2 family-upgrade, NOT re-authored here. |
| `W-LIQUID-REVEAL-FIX` | **DEPEND** | the source-rect bloom fix the reveal rides; overlay is downstream. |
| `W-LIQUID-ENTRANCE-GENERAL` (T5 LAW) | **DEPEND / CITE** | the overlay reveal + stage settle are instances of the universal liquid-weight law. |
| select-forms C1/C2/D1 | **DEPEND + extend selectors (C2/C3 above)** | the warm-floor/reveal-clock/portal-field are SHARED; widen, never re-mint (§10 dedup). |
| `BD.W-CARTOON-PUNCH` / `BD.W-MOTION-WEIGHT` | **DEPEND** | the punch curve + weight scalar; no re-mint. |
| `W-DOCK-CORE` (`.dock-trigger`) | **EXTRACT base (B3) — coordinated** | the trigger base extraction lands ONCE; `.dock-trigger` re-points to compose it. No fork (C1·R1 fold). |
| `BD.W-CARD-SHEET-EXPAND` | **NO OVERLAP — leave** | the card→sheet bloom is a demo composite on `useElementBloom`/`useDockLink`; orthogonal to the stage couple. |
| `shouldScaleBackground` (Drawer.vue) | **EXCISE (DELETE)** | dead boolean (grep 0 `scale(`); replaced by the honest `stage=` enum. No alias (no-legacy law). |

**NET amendment:** 3 NEW waves (`BD.W-OVERLAY-STAGE-COUPLE` [headline], `BD.W-OVERLAY-PANEL`,
`BD.W-OVERLAY-TRIGGER`) + 1 NEW proof (`proof:overlays`) + 1 AUGMENT-reclassify
(`BD.W-SHEET-TRANSLUCENT`) + 2 selector EXTENSIONs on shipped/sibling seams (select-forms C1, D1.1)
+ 1 EXCISE (`shouldScaleBackground`). ZERO new component, ZERO new composable, ZERO parallel fork.
The headline STAGE-COUPLE stands alone on the shipped spine; PANEL/TRIGGER/PUNCH/CROWN ride
named siblings (no overclaim — fold C2·R2).
