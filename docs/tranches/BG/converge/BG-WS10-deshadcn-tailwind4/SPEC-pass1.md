# BG-WS10 — De-shadcn / idiomatic Tailwind v4 (deep) — SPEC-pass1

> COMPLETELY abrogate default shadcn + tailwind paint while KEEPING the reka/shadcn
> behaviour substrate. The DEEP, dedicated form of WS4's de-shadcn-sweep — DEPTH (richer
> iOS-27 control material) **and** BREADTH (close the residual census the existing gates
> structurally miss). reka = BEHAVIOUR / glass-ui = 100% of MATERIAL.

Verified against `tranche/BG` HEAD (4.2.0 family) — every residual + token below was read on disk
and every gate run, this session.

---

## 0. THE RECONCILIATION (read first — the whole-tranche tension this spec resolves)

De-shadcn is ~5 tranches deep and the SOURCE-VOCABULARY axis is already settled. The danger
is **re-litigation / double-build**, not greenfield. Two readings of the WS10 mandate exist and
this spec resolves them as ONE:

- **NARROW** (the `proof-de-shadcn.mjs` header + WS4 SPEC-pass4 §82/§128): "WS4 owns the GATE +
  the 9-violation FORM clear. WS10 owns the deep material rebuild — capsule switch, grouped-inset
  Select, controlSize tiers — WITHIN this predicate. **No double-build.**"
- **BROAD** (the convergence bar + the SEED): "census EVERY shadcn/tailwind default still leaking;
  zero default survives on **ANY** component, gate-asserted."

**RESOLUTION — WS10 is BOTH, and the no-double-build fence is honoured by EXTENSION, never
re-author** (the `proof:no-gray` NO-new-KEY precedent, the `proof:webgl-substrate-single`
extend-in-place precedent):

| Axis | Owner | Mechanism |
|---|---|---|
| `proof:de-shadcn` register + the 9 FORM-control clears + stepper teeth + `--opacity-disabled-strong`/`--icon-decoration-opacity` mints + forced-colors clear | **WS4** (precondition) | atomic register+clear, born-GREEN |
| The deep-residual VOCABULARY + STATE-ARM census (the BREADTH) | **WS10** | EXTEND the already-GREEN `proof:no-shadcn-default` 233-file walker — **no new gate id** |
| The deep iOS-27 MATERIAL (grouped-inset Select; deepen Switch/controlSize) | **WS10** | build RICHER controls WITHIN the WS4 predicate; reads existing tokens |
| Dead-token DELETES + cross-component FOLDS + the focus-ring unify | **WS10** | clean break, no alias |

**Three hard fences this spec must not trip** (the chronics each lens flagged):

1. **No 4th `proof:de-shadcn` design.** Three incompatible designs already churned (BE extend-no-shadcn,
   BF glass-cohesion-arm, BG net-new FORM gate). The BG net-new is the landed truth. WS10 mints
   **ZERO new gate id** — every tooth EXTENDS `proof:no-shadcn-default` (the registered GREEN census)
   in place.
2. **WS10 never re-clears the 9 FORM violations** (control-surfaces.css:153 opacity; Combobox/TagsInput
   focus-within). Those are WS4's atomic clear. WS10 sequences AFTER and builds on the cleared predicate.
3. **The `:`-variant lookbehind is the liquid-reveal fence** — `data-[state=…]:`/`animate-*`/`slide-*`/
   `zoom-*`/`fade-*` is glass-ui-INTENTIONAL. WS10's new state-arm arm CLASSIFIES the fill token
   (neutral vs identity); it NEVER pre-strips the grammar (a pre-strip BREAKS the fence — proven prior).

---

## 1. GESTALT GOAL

Every glass-ui control is 100% glass-ui identity material — warm, weighty, liquid, iOS-27 — with
ZERO default shadcn/tailwind paint surviving on ANY component, while the reka/shadcn behaviour +
a11y (focus-mgmt, ARIA, state-machines, portal, roving-tabindex, collision) stay byte-untouched.
The material is token-first idiomatic Tailwind v4 (`@theme`/`@utility`/`@variant`, the token cascade,
no raw arbitrary defaults). A gate-asserted census proves no default ring/shadow/radius/color/
variant/timing/opacity leak on the full 233-file ui/ tree, locked born-RED→GREEN, real-paint-verified
in BOTH modes AND Chrome AND Safari.

---

## 2. MECHANISM (concrete, idiomatic)

### 2.1 The census EXTENSION (BREADTH — the gate that closes the blind spots)

The existing `proof:no-shadcn-default` (registered `gates.mjs:1587`, `["local","ci"]`, GREEN) is a
hand-curated FORBIDDEN-vocabulary census that caught only the tokens the BC band reskinned. Its three
structural blind spots (all live at HEAD, verified):

- **RC-1 — the FORBIDDEN list is incomplete-by-construction.** It catches `rounded-md` but not
  `rounded-sm`/`rounded-lg`; `#hex` but not `hsl()`/`oklch()`/`rgb()`; nothing for bare `text-sm`/`text-xs`,
  `transition-colors`, `duration-200/300`, `disabled:opacity-N`, raw `bg-white`.
- **RC-4 — the `:`-lookbehind defers EVERY state arm to glass-cohesion, which is bg-OPACITY-only.**
  So a cold-neutral `hover:bg-muted` / `data-[state=on]:bg-accent` / `hover:bg-white/10` sails through
  BOTH gates. The seam between them is unguarded.

WS10 EXTENDS the SAME gate (DRY — reuse the 233-file walker, no fork, no new id) with:

**(a) The deep-VOCABULARY denylist arms** — each forbidden token carries its replacement target + a
self-test bite:

| forbidden | live HEAD sites | → replacement |
|---|---|---|
| `rounded-sm` / `rounded-lg` / `rounded-xl` (off the radius-alias allowlist) | alert:11, dialog:244, sheet:135, data-table ×3 | `rounded-{card,control,dialog,input,pill}` semantic alias |
| bare `text-sm` / `text-xs` (the fixed-px tailwind default, ≠ the `text-small` ladder bridge) | ~21 .vue + CVA bases | `text-small` (ladder) or `text-control-sm` per surface role |
| `transition-colors` / `duration-200` / `duration-300` / `ease-in-out` (raw timing) | ~15 sites | `transition-control` / `--ease-standard` / `--duration-*` / a spring (liquid-weight law) |
| `disabled:opacity-N` / `peer-disabled:opacity-N` SFC literal | stepper:25 ×2, Label:32, icon `opacity-50` ×3 | `--opacity-disabled` / `--opacity-disabled-strong` / `--icon-decoration-opacity` |
| raw color-fn in arbitrary bracket: `[hsl(…)]` / `[oklch(…)]` / `[rgb(…)]` | badge:36 `dark:bg-[hsl(0_70%_45%)]` | a `--destructive`-derived dark token |
| raw `bg-white` / `bg-black` (not even a token) | notification:25 `hover:bg-white/10` | `bg-foreground/N` / a glass register |

**(b) The STATE-ARM-NEUTRAL classifier** (closes RC-4, the headline new tooth). Scan
`hover:`/`focus:`/`active:`/`data-[state=…]:`/`dark:`-prefixed `bg-`/`text-` fills, classify the FILL
TOKEN, and RED a NEUTRAL state fill while SPARING the identity/tone arms:

- **NEUTRAL → RED:** `{muted, secondary, white, black}` and `accent` (cold shadcn neutrals).
- **IDENTITY/TONE → SPARE:** `{primary, destructive, success, warning, info, foreground, the glass-* tiers}`
  — the Switch `data-[state=checked]:bg-primary` warm-violet signature, the badge `bg-destructive`,
  the feedback tones. iOS-27 law: **tint is SEMANTIC, applied to the CTA/active register only**;
  a neutral state fill is decoration masquerading as a control.
- **The EXACTLY-ONE allowlist:** `_shared/menuItemVariants.ts`'s `accent` variant arm
  (`hover/focus/data-[state=open]:bg-accent`) is the SANCTIONED flat-accent ESCAPE beside the `glass`
  default (which composes `.glass-menu-row`). It is the ONLY sanctioned `accent` state-arm site —
  recorded as a one-file allowlist (the census-closure precedent), so a NEW `bg-accent` state arm
  anywhere else REDS.

The classifier NEVER pre-strips the `:` grammar — it READS the prefix to decide state-arm-vs-leading,
then classifies the token after the last `:`. The liquid-reveal fence stays intact (self-test bite:
`data-[state=checked]:bg-primary` clean, `data-[state=on]:bg-accent` red, `animate-in fade-in` clean).

**(c) The EXACTLY-ONE-LIST closure widen** (BC `W-DESHADCN-census.md` precedent) — every ui/ dir is on
exactly one of {deep-residual-target | already-glass | allowlist-survivor}; the anti-smuggle arm reds a
new off-list neutral.

Born-RED on the ~20+ confirmed HEAD sites; GREEN at the WS10 close.

### 2.2 The TOKEN-REPLACE sweep (clears the census born-RED — token-first, clean break)

Reskin every residual onto an EXISTING house register (no new mechanism, no alias):

- **State-arm neutrals → glass registers.** toggle base `hover:bg-muted`/`data-[state=on]:bg-accent`
  → the glass-quiet WELL hover + the `--glass-bg-floating` selected-as-glass tier (the Switch /
  SegmentedTabs / W-REGISTER-IOS "selected reads as glass" model, the menu-row precedent the toggle's
  OWN code-comment already names). table/data-table rows → `.glass-menu-row` / `--glass-bg-quiet`
  hover-lift. notification `bg-white/10` → `hover:bg-foreground/N`.
- **Close-button 3-way fork FOLD (DRY).** DialogContent:244 (`rounded-sm opacity-70 data-[state=open]:bg-accent`),
  SheetContent:135 (`rounded-sm … data-[state=open]:bg-secondary`), DialogScrollContent:61
  (`rounded-pill hover:bg-secondary`) are three recipes for ONE control → collapse onto ONE
  `.glass-overlay-close` utility (or `buttonVariants({variant:'ghost',size:'icon'})`). Kills
  `rounded-sm`/`opacity-70`/`bg-accent`/`bg-secondary` in one move.
- **ToastAction re-roll FOLD.** ToastAction:26 re-rolls a full shadcn outline button
  (`border bg-transparent hover:bg-secondary h-[calc…] text-sm transition-colors`) → compose the
  already-reskinned `buttonVariants({variant:'outline'|'secondary',size:'sm'})` (the `.glass-capsule`
  register). Kills the neutral fill + arbitrary height + raw `text-sm`/`transition-colors`.
- **Bare radius → semantic alias.** alert `rounded-lg` → `rounded-card`/`rounded-panel`; close-buttons
  `rounded-sm` → the overlay-close register; data-table `rounded-lg` → `rounded-card`.
- **Bare text → ladder.** CardDescription/AlertDescription/DrawerDescription/notification/accordion/
  tabs-trigger/table-empty bare `text-sm`/`text-xs` → `text-small` or `text-control-sm` by surface role
  (the drop-bare-utility-onto-a-token discipline that exists per-wave, now back-swept).
- **Raw timing → §6 register.** `transition-colors` → `transition-control`; AccordionTrigger chevron
  `transition-transform duration-200` → a spring/`transition-control` (the liquid-weight UNIVERSAL LAW —
  chevrons must spring, not linear-ease).
- **disabled:opacity-N → token.** stepper `opacity-20` → `--opacity-disabled-strong` (WS4-minted);
  Label `peer-disabled:opacity-70` + the 3 decorative-icon `opacity-50` → `--icon-decoration-opacity`
  (WS4 mints it for ComboboxInput; WS10 extends the read to all 3 icon sites — 3→1 token).
- **badge dark hsl-literal → token;** badge `secondary` slab → a warm tone/glass register.

### 2.3 The dead-token DELETES + the focus-ring UNIFY (no-legacy clean break)

- **DELETE** `--input: var(--neutral-4)` (color-radius.css:96) + `--color-input` bridge (bridges.css:82) —
  generate forbidden `border-input`/`bg-input`, ABSENT from the tree (only prose refs). Pure dead weight.
- **DELETE** the `--color-ring` bridge (bridges.css:83) — generates forbidden `ring-ring`/`outline-ring`.
- **DELETE** the phantom `var(--color-accent-opaque, …)` first-arg (control-surfaces.css:96) —
  `--color-accent-opaque` is undefined everywhere → the border ALWAYS resolves `--ring` (misleading dead fallback).
- **DELETE** `--corner-k-soft:1.7` / `--corner-k-sharp:2.4` (radius.css:91-92) — ZERO `var()` consumers
  (radius.css's own comment owes this); re-anchor `proof:squircle-language`'s token-axis clause to the
  live `--corner-k-squircle:2`.
- **FOLD the focus ring (the single highest-leverage DRY win).** `.input-pill:focus-visible`
  (control-surfaces.css:96-97) is a bespoke TWO-COLOUR recipe (`border-color: var(--ring)` +
  `box-shadow: … var(--ring) 30%`) diverging from the house `--focus-ring-shadow` register →
  `box-shadow: var(--focus-ring-shadow)`. Unifies the form-family focus ring onto the ONE register
  (the SAME register WS4's Combobox/TagsInput focus-within clears read — harmonious, not a collision),
  removes 2 of 4 `--ring` consumers. Then RENAME `--ring` → `--focus-ring-color` (the last shadcn-NAMED
  token in the cascade) — clean break, no alias.
  - **GATED sub-item:** the dark `--ring` is `hsl(48 10% 70%)` = OKLab H~95° yellow-green — the EXACT
    hue W-NO-GRAY/W-DARK-INK-WARM condemned. Warming it (toward hsl-30, the BB.W-DARK-INK-WARM precedent)
    is an idiomatic de-shadcn win but cascades library-wide through `--focus-ring-shadow`. It rides a
    `proof:no-gray`-witness gate-before-flip + a `proof:ba-gestalt` verdict. If `no-gray` reds, the warm
    flip is BOOKED, not forced (the rename + fold land regardless).

### 2.4 The idiomatic-v4 closure (the "no raw arbitrary defaults" half — SMALL, targeted)

The idiom gates (`proof:tailwind-v4-idiom`, `proof:design-idiom-localization`) are GREEN; HEAD is already
idiomatic (98 `-(--token)` utilities, full `@theme`/`@variant`/`@utility`). The genuine residual is TWO
arbitrary-wrap classes with no first-class utility form:

- **Mint `--text-control` / `--text-control-sm` `@theme` bridges** (theme/bridges.css) → `text-control` /
  `text-control-sm` utilities → retire the `text-[length:var(--control-text)]` arbitrary wraps
  (alert/toggle/button/badge bases). Extend `proof:tailwind-v4-idiom` clause-(d) completeness to bridge
  the `--control-text` family; keep GREEN.
- **Mint `@utility glass-blur-{wash,quiet,floating}`** → retire the `[backdrop-filter:var(--glass-blur-*)]`
  arbitrary-PROPERTY forms (tabs/drawer/alert/ModalOverlay) — OR compose `.control-surface`/`.glass-wash`
  where a full glass tier already carries the blur (the BE.W-GLASS-CONTROL precedent).

**SANCTIONED-KEEP (do NOT "fix"):** the 5 `[var(--x,fallback)]` comma-fallback brackets (the `(--x)`
shorthand cannot carry a fallback) and the `[--token:value]` inline custom-prop writes (controlSizeClass) —
both ARE idiomatic v4. This wave is POLISH, not a structural bar — cap the investment here.

### 2.5 The deep iOS-27 MATERIAL (DEPTH — RICHER controls within the predicate)

- **Grouped-inset Select (the ONE genuinely-unbuilt target).** SelectGroup:16 is bare `p-1 w-full`,
  SelectLabel:13 bare `py-1.5 pl-8 pr-2` — no iOS inset-grouped section backplate. EXTEND `menu.css`
  (`.glass-menu-section` mono-caption + hairline already exists) with the inset-grouped ENVELOPE: a
  `.glass-menu-group` inset section backplate — outer panel at `--radius-panel` (~32-40px), nested
  row-groups at `--radius-control` (~20px) with inset margins, the section caption composing
  `.glass-menu-section`. Reads the existing `--glass-bg-*`/`--radius-*` tokens — NO new mechanism, NO
  fork. Reference: `S-siri-frames §respond f010-f012` (the iOS inset-grouped table style).
- **Deepen Switch capsule + controlSize (NEVER re-mint).** Switch.vue already composes
  `glass-wash glass-specular-track rounded-pill` + the `--switch-*` geometry quad + `data-[state=checked]:bg-primary`
  + a `--spring-snappy` thumb-throw; `_shared/useControlSize.ts` already ships the `sm|default|lg` axis.
  WS10 DEEPENS the liquid-glass material/motion (press = scale + bounce on the `--spring-*` per-clock
  register; the touch-point illumination read) + extends controlSize rung consistency. It READS the
  `--switch-*`/`--control-*` quads, never forks a parallel recipe.
- **iOS-27 fidelity facts (the gate's structural assertions):** concentric radius (capsule = half-height
  stadium, `--radius-pill` clamp; no bare `rounded-md`); capsule-default control shape; controlSize
  tiers token-driven; semantic-tint-ONLY on active arms; the REGULAR adaptive-legibility variant
  (W55 + W-DARK-MATERIAL) is the default for text-bearing controls, CLEAR only over media-rich backdrops;
  4.5:1 floor + vibrant-text-on-glass.

### 2.6 The lock + paint bar (the close)

- The extended `proof:no-shadcn-default` (with all WS10 arms) is GREEN.
- The WS4 `proof:de-shadcn` FORM gate is GREEN (precondition; WS10 builds on it).
- **The binding π — real paint, the headless-green/visually-broken defence (shipped 3×).**
  Enroll the forms/controls surface on a BG gestalt roster with a recorded per-surface VERDICT.
  `tests-visual/de-shadcn.spec.ts` (WS4) + a `no-shadcn-default` π arm assert the reskinned
  hover/selected/close/disabled states resolve the GLASS/PAPER material (getComputedStyle oklab paint-arm),
  not a shadcn-neutral token, in BOTH modes AND Chrome AND Safari. A `@media (forced-colors:active)` arm
  asserts a non-`none` outline (any new focus-within wrapper MUST be in the a11y-overrides Highlight set
  or it ships keyboard-INVISIBLE in WHC).
- **Fold the CLAUDE.md de-shadcn CANON** (absent at HEAD — BD.W-DESHADCN-CANON never landed): the
  `reka = BEHAVIOUR / glass-ui = 100% MATERIAL` clause + the machine-lock pointer to
  `proof:no-shadcn-default` + the settled fences (legibility allowlist; `:`-lookbehind liquid-reveal
  fence; in-srgb surface-tint; `var(--shadow-sm)` token KEPT). Doc-only, the wave's coda.

---

## 3. FILES TOUCHED

**Gate / scripts**
- `scripts/proof-no-shadcn-default.mjs` — EXTEND: deep-vocab denylist arms + the state-arm-neutral
  classifier + the menuItemVariants accent allowlist + self-test bites + EXACTLY-ONE-LIST widen.
- `scripts/proof-tailwind-v4-idiom.mjs` — EXTEND clause-(d) for the new `--control-text` bridge family.
- (NO new gate id. NO touch to `scripts/proof-de-shadcn.mjs` — WS4's.)
- `tests-visual/de-shadcn.spec.ts` (WS4-authored) — WS10 adds the non-form reskin + grouped-inset π arms.

**Token cascade**
- `src/styles/tokens/color-radius.css` — DELETE `--input`; rename `--ring`→`--focus-ring-color`.
- `src/styles/theme/bridges.css` — DELETE `--color-input`, `--color-ring` bridges; MINT `--text-control`/`--text-control-sm`.
- `src/styles/theme/radius.css` — DELETE `--corner-k-soft`/`--corner-k-sharp`; re-anchor squircle vocab.
- `src/styles/tokens/dark-arm.css`, `light-dark.css` — `--ring` rename lockstep (+ the GATED warm-hue flip).

**Recipe CSS**
- `src/styles/glass/control-surfaces.css` — DELETE phantom `--color-accent-opaque`; FOLD `:focus-visible`
  onto `var(--focus-ring-shadow)`.
- `src/styles/menu.css` — ADD `.glass-menu-group` inset-grouped envelope.
- `src/styles/utilities/*.css` — MINT `@utility glass-blur-*`; ADD `.glass-overlay-close`.
- `src/styles/utilities/a11y-overrides.css` — add any new focus-within wrapper to the forced-colors Highlight set.

**ui/ SFC + CVA (paint-layer only — reka behaviour byte-untouched)**
- `toggle/index.ts` (base state-arm), `table/TableRow.vue`, `data-table/DataTable.vue`,
  `toast/ToastAction.vue`, `notification/Notification.vue`, `dialog/DialogContent.vue`,
  `dialog/DialogScrollContent.vue`, `sheet/SheetContent.vue`, `alert/index.ts`, `badge/index.ts`,
  `card/CardDescription`, `drawer/DrawerDescription`, `accordion/AccordionTrigger.vue`,
  `tabs/TabsTrigger`, `table/TableEmpty`, `number-field/NumberFieldIncrement.vue`/`Decrement.vue`,
  `label/Label.vue`, `multi-select/MultiSelect.vue`, `command/CommandInput.vue`,
  `select/SelectGroup.vue`/`SelectLabel.vue`, `switch/Switch.vue`,
  `alert`/`toggle`/`button`/`badge` CVA `text-control` bridge re-point.

**Docs**
- `CLAUDE.md` — fold the de-shadcn CANON clause.
- `docs/tranches/BG/audit/reflect/*` — the forms/controls gestalt roster row + the DELTA capture.

---

## 4. WAVE BREAKDOWN (BG.W-*)

> Precondition **W0 (WS4, not WS10):** `BG.W-DESHADCN-SWEEP` lands `proof:de-shadcn` REGISTER
> (gates.mjs + package.json + ci, atomic born-GREEN) + the 9 FORM clears + the stepper denylist teeth
> + the `--opacity-disabled-strong` / `--icon-decoration-opacity` mints + the forced-colors clear.
> **WS10 sequences strictly AFTER W0.** (The orchestrator must resolve WS4's open
> `--opacity-disabled-strong: 0.2` two-rung ruling first.)

### BG.W-DESHADCN-CENSUS — the complete census (EXTEND, never re-author)
EXTEND `proof:no-shadcn-default` with the deep-VOCABULARY arms (§2.1a) + the STATE-ARM-NEUTRAL classifier
(§2.1b) + the menuItemVariants accent allowlist + the EXACTLY-ONE-LIST closure widen. Each forbidden token
carries a replacement target + a self-test bite; the liquid-reveal `:`-fence is preserved (classify, never
pre-strip). **Born-RED** on the ~20+ HEAD residuals. NO new gate id.

### BG.W-DESHADCN-TOKEN-REPLACE — the replacement sweep (clears the census)
The §2.2 reskin + the §2.3 dead-token DELETES + the focus-ring FOLD + close-button/ToastAction folds.
State-arm neutrals → glass registers; bare radius/text/timing/opacity → tokens; dead tokens deleted;
`--ring`→`--focus-ring-color` (the warm-hue flip GATED on `proof:no-gray`). Clean break, no alias. Each
visual reskin re-earns `proof:ba-gestalt` on a FRESH capture, BOTH modes + Chrome AND Safari.

### BG.W-TAILWIND4-IDIOM — the idiom closure (SMALL, polish)
Mint `--text-control`/`--text-control-sm` bridges + `@utility glass-blur-*`; retire the 2 arbitrary-wrap
classes; extend `proof:tailwind-v4-idiom` completeness; keep GREEN. SANCTIONED-KEEP the comma-fallback +
custom-prop-write brackets. Low investment — the idiom axis is already GREEN.

### BG.W-DESHADCN-MATERIAL — the deep iOS-27 material (the DEPTH; RICHER within the predicate)
The grouped-inset Select envelope (`.glass-menu-group` in menu.css; SelectGroup/SelectLabel compose it) +
deepen Switch capsule material/motion + controlSize rung consistency (READ existing tokens, never re-mint)
+ the iOS-27 fidelity facts (§2.5). Real-paint-verified Chrome AND Safari, BOTH modes. Carve discipline:
all material lands in CSS (menu.css) — no SFC grows past 500L. NO new gate — any capsule-specular presence
assert EXTENDS an existing gate in place.

### BG.W-DESHADCN-GATE — the lock + paint + canon (the close)
Lock the extended `proof:no-shadcn-default` GREEN; confirm the WS4 `proof:de-shadcn` GREEN precondition;
enroll the forms/controls gestalt roster + run the binding π (both modes + Chrome AND Safari + the
forced-colors outline arm); fold the CLAUDE.md de-shadcn CANON. The "gate locks it born-RED→GREEN" +
real-paint half of the convergence bar.

---

## 5. ACCEPTANCE / REAL-PAINT-π BAR

1. **Source-gate GREEN:** the extended `proof:no-shadcn-default` (deep vocab + state-arm) GREEN over all
   233 ui/ files; its self-test reds each planted residual (8 state-arm bites + the deep-vocab bites);
   the EXACTLY-ONE-LIST closure passes. `proof:de-shadcn` (WS4) GREEN. `proof:tailwind-v4-idiom` GREEN
   with the new bridge family.
2. **No regression:** `proof:glass-cohesion`, `proof:no-layout-animation`, `proof:no-gray`,
   `proof:menu-glass`, `proof:control-tokens`, `proof:squircle-language` (re-anchored) stay GREEN.
3. **The binding paint (the bar — headless-green is NOT acceptance):** a FRESH per-surface capture by a
   non-authoring judge over each reskinned control's six-state matrix (rest/hover/focus/active/selected/
   disabled), in **BOTH modes AND Chrome AND Safari**, asserting the glass/paper material resolves
   (getComputedStyle oklab paint-arm) — NOT a shadcn-neutral token. The grouped-inset Select reads as the
   iOS inset-grouped reference. A `@media (forced-colors:active)` arm asserts non-`none` focus outline.
   `proof:ba-gestalt` per-band VERDICT (forms + feedback + containers + navigation) PASS on the fresh capture.
4. **reka inviolate (e2e-paint, the silent-no-op trap):** TagsInputRoot emits `data-disabled`, ToggleGroup
   emits `aria-checked`/`data-state`, the toggle `data-[state=on]` actually PAINTS the new selected register
   at runtime — proven by live capture, not a class string (vue-tsc + units MISS the stale-binding no-op).
5. **Budget:** `dist/styles/index.css` stays under gzip 140_000 (DRIFT_CEIL 0.10); any conscious rebase
   is sized + commented (the 9-prior-lift discipline). The root barrel critical-path-walk stays clean.

---

## 6. FOLDED / DEFERRED ITEMS

- **The 4 candidate-wave names RE-SCOPED, not adopted literally:** `BG.W-DESHADCN-CENSUS` →
  EXTEND-in-place (not a new census); `BG.W-DESHADCN-GATE` → MATERIAL + the lock/paint/canon close
  (not a new gate — the no-4th-design trap); `BG.W-DESHADCN-TOKEN-REPLACE` → the non-form residual sweep +
  dead-token deletes; `BG.W-TAILWIND4-IDIOM` → SHRUNK to the 2 genuine bridge mints.
- **The 9 FORM-control clears + the gate register stay WS4** (the no-double-build fence). WS10 CONSUMES
  them as a precondition.
- **The non-form per-control STATE-COVERAGE archetype matrix** (overlay/feedback/disclosure/tabular rows in
  `proof:de-shadcn`) is BOOKED, not built: the §2.1 vocabulary + state-arm census over the 233-file walker
  already satisfies "no default leak on ANY component," and minting decidable state matrices for the 32
  non-form families risks contrivance (most have no real matrix beyond rest/hover). A future wave adds the
  archetype rows IFF a real coverage gap is found.
- **The dark `--ring` warm-hue flip** is GATED on `proof:no-gray`; if it reds, the warm flip is BOOKED
  (the rename + focus-fold land regardless).
- **`--opacity-disabled` declared twice** (literals.css:61 + scale-paper.css:79) is the documented v4
  "@theme can't self-reference a tokens.css twin" pattern — KEEP, lockstep, not a bug.

---

## 7. OPEN RISKS

- **R1 — WS4 must land W0 first.** If WS10's census-extend lands its new `ci`-tagged arms born-RED before
  WS4 clears the predicate, CI breaks (self-inflicted, FORBIDDEN). The census-extend arms + the
  token-replace clears land ATOMIC born-GREEN, AFTER W0. Mitigation: the WS10 spec deps name W0 explicitly;
  the orchestrator resolves the `--opacity-disabled-strong` ruling at W0.
- **R2 — the state-arm classifier false-positive surface.** The neutral-vs-identity split + the
  one-file accent allowlist is the whole BREADTH bet. If it can't cleanly distinguish the
  menuItemVariants escape from the toggle residual, OR the `:`-fence regresses, the gate is unusable.
  → **PROTOTYPE P1.**
- **R3 — the headless-green/visually-broken trap (shipped 3×).** A removed shadcn util can leave an
  unstyled gap that every source gate greens over. The grouped-inset Select + the toggle/close reskins
  MUST fresh-capture-verify in Chrome AND Safari, both modes. → **PROTOTYPES P2, P3.**
- **R4 — the focus-ring FOLD cascades library-wide** through `--focus-ring-shadow` + the `--ring` rename +
  the dark warm-hue + the forced-colors Highlight set. A miss ships keyboard-focus-invisible in WHC or
  reds `proof:no-gray`. → **PROTOTYPE P4 (spec).**
- **R5 — Safari floor.** If the deep material reaches for `.glass-lens`/`backdrop-filter:url()` it hits
  WebKit bug 245510 — it must stay `@supports`-gated with the un-gated blur+tint as the Safari legibility
  floor; never load-bearing for legibility. The "both modes" bar is light/dark — Safari capture is an
  EXPLICIT spec fence here, not assumed.
- **R6 — carve ratchet (RATCHET_BASELINES==∅).** The deep material must land CSS-side (menu.css); any SFC
  approaching 500L carves into a colocated sub-dir as it grows.
