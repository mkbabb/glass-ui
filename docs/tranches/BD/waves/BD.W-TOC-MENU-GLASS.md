# BD.W-TOC-MENU-GLASS

## 1 · Band + goal

**Band 4 — Demo PAGES first-half modernization (zero src paint).** Re-point the last un-modernized navigation page onto the shipped glass/menu register.

**Goal:** Re-point `navigation/toc-tracking.vue`'s ToC sidebar + scroll-document chrome onto the shipped glass register — retire the dead `.themed-card` orphan class (clean break) onto the `.glass-quiet`/`.glass-resting` tier container, the raw `bg-primary/10`/`hover:bg-muted/50` ToC button rows onto `.glass-menu-row` (the hover-lift glass-quiet plate) + the "selected reads as glass" register for the active state, and the raw `text-sm`/`text-xs` ToC text onto the on-glass foreground rung (`--on-glass-muted`). Zero src paint — `.glass-menu-row` + `.glass-quiet` + `--on-glass-muted` all SHIP; this is a demo-consumer re-point.

---

## 2 · Starting state — the exact on-disk reality (verified by reading)

All citations read at HEAD on branch `master`. `demo/stories/navigation/toc-tracking.vue`:

### The `.themed-card` orphan (verified DEAD)
`:125` + `:160` — the ToC `<nav>` + the scroll-document `<div>` both carry `class="themed-card …"`. `grep -rn "\.themed-card" demo/ src/` (excluding `class=` usages) = **ZERO backing rule** — `.themed-card` is an ORPHAN class with no CSS definition anywhere; it NEVER paints. It is the ONLY `themed-card` consumer storybook-wide (`grep -rln themed-card demo/` = this one file). A dead class masquerading as a card register.

### The raw ToC button rows (`:128-153`)
```html
<button :data-toc-id="root.id" :data-scroll-target="root.id"
    :class="[
        'w-full text-left px-3 py-1.5 rounded-md text-sm transition-fast',
        activeRootId === root.id || activeId === root.id
            ? 'bg-primary/10 text-primary font-medium'
            : 'hover:bg-muted/50 text-muted-foreground',
    ]">
    {{ root.title }}
</button>
```
The root + child ToC buttons (`:128-139` roots, `:140-153` children) carry:
- a PERSISTENT-SELECTED fill `bg-primary/10 text-primary font-medium` (the active state) — a flat brand-primary wash, NOT the "selected reads as glass" register;
- a hover fill `hover:bg-muted/50` (root) / `hover:bg-muted/40` (child) — a flat muted wash, NOT the glass-quiet hover-lift plate;
- the muted text `text-muted-foreground` / `text-muted-foreground/80` — the page-muted register (calibrated against the canvas, NOT the on-glass composited fill);
- `text-sm` (root) / `text-xs` (child), `rounded-md`, `transition-fast`.

### The scroll-document text (`:160-188`)
`:160` the document `<div class="themed-card …">`; `:167` `<h3 class="text-lg font-semibold">`; `:170` `<p class="text-sm text-muted-foreground">`; `:181` `<h4 class="text-sm font-medium">`; `:184` `<p class="text-xs text-muted-foreground">`. Raw `text-lg`/`text-sm`/`text-xs` + `text-muted-foreground` (the page-muted, not on-glass).

### The shipped registers (verified — all SHIP, nothing to mint)
- `.glass-menu-row` (`src/styles/menu.css:34-72`): REST transparent (sits on the container's glass plate), the glass-quiet oklab-tinted `--menu-row-bg` plate materializes on `:hover`/`:focus`/`[data-highlighted]`/`[data-state="open"]`, a PRM-gated `translate 0 var(--menu-row-lift)` hover-lift on `--spring-smooth`, the 44px touch floor (`min-block-size: max(2rem, var(--touch-target))`). The canonical menu-row register (BA.W-MENU-GLASS).
- `.glass-quiet` (the 5-rung ladder tier, `glass.css`): the container the rows sit on.
- `--on-glass-muted` / `--on-glass-muted-strong` (`src/styles/tokens/on-glass-fg.css:35-36` light, `dark-arm.css:310-311` dark): the on-glass foreground rung (the muted caption over the COMPOSITED glass fill, NOT the page-muted `--neutral-5`). The calm-light content tiers already re-point `--muted-foreground → --on-glass-muted` (`ladder.css:241,298`), so a `.glass-quiet` container's descendant `text-muted-foreground` ALREADY inherits the on-glass rung — but the ToC rows hand-roll `text-muted-foreground` flat fills that bypass it.
- The "selected reads as glass" register (the dock's `--dock-control-active-bg: var(--glass-bg-floating)` — a glass tier ABOVE the hover, CLAUDE.md §W-REGISTER-IOS): the active-row tier the `bg-primary/10` brand wash should become.

---

## 3 · The build — precisely what changes (idiomatic, gestalt, zero src paint)

### Retire `.themed-card` → the glass-tier container (clean break, no alias)
Both the ToC `<nav>` (`:125`) and the scroll-document `<div>` (`:160`) drop `themed-card` and compose the glass tier: `class="glass-quiet rounded-card overflow-y-auto scrollbar-thin p-2 …"` (the `<nav>` ToC menu container) / `glass-resting rounded-card …` (the scroll document, a content panel a tier up). The dead `themed-card` is DELETED (no alias — the clean-break law; it never painted, so this is a pure correction). The `rounded-xl` stays or moves to `rounded-card` (the semantic alias).

### The ToC buttons → `.glass-menu-row` + the selected-glass register
Each ToC button (`:128`, `:140`) composes `.glass-menu-row` for the hover-lift glass-quiet plate, and the active state re-points off `bg-primary/10`:
```html
<button :data-toc-id="root.id" :data-scroll-target="root.id"
    class="glass-menu-row w-full text-left px-3 rounded-md text-small"
    :data-active="activeRootId === root.id || activeId === root.id ? '' : undefined">
    {{ root.title }}
</button>
```
- The hover state (`hover:bg-muted/50`) is RETIRED — `.glass-menu-row:hover` paints the glass-quiet `--menu-row-bg` plate + the PRM-gated lift (the canonical menu hover, replacing the flat muted wash).
- The active state (`bg-primary/10 text-primary`) re-points onto the "selected reads as glass" register: a `[data-active]` rule (page-local or a `--menu-row-active-bg: var(--glass-bg-floating)` override) paints the glass-floating tier (a tint FORWARD of the hover-quiet plate — the dock's selected-glass model), the glyph staying warm-ink `--foreground` (NEVER a saturated brand `--primary` — the W-REGISTER-IOS de-red discipline; a ToC active item is not a brand-red event).
- `text-sm`→`text-small` (root) / the child keeps its smaller rung via the chassis's mono-caption or `text-small` register; `text-muted-foreground` is DROPPED (the `.glass-quiet` container's `--on-glass-muted` re-point reaches the row, OR the row explicitly reads `text-(--on-glass-muted)` for the inactive rung). The 44px touch floor comes free with `.glass-menu-row`.

### The scroll-document text → the on-glass rung
`:170,184` `text-sm/text-xs text-muted-foreground` → the on-glass muted rung (inherited via the `.glass-resting` container's `--on-glass-muted` re-point, OR explicit `text-(--on-glass-muted)`); `:167,181` the `text-lg`/`text-sm` headings → the canonical typography rungs (`text-subheading`/`text-small` — the storybook heading register, NOT raw `text-lg`).

**The cascade-trap pre-empt (the BA.W-MENU-GLASS recorded trap).** `.glass-menu-row`'s glass arm DROPS the flat `hover:bg-muted` utilities entirely — an unlayered `hover:bg-muted/50` utility would WIN over the `@layer components` `.glass-menu-row:hover` rule (specificity + layer). So the re-point must DELETE the `hover:bg-muted/50`/`hover:bg-muted/40` classes, not leave them beside `.glass-menu-row` (else the flat wash wins and the glass plate never paints). This is the exact `menu.css:10-12` cascade discipline — recorded here so the re-point does not leave a competing flat fill.

**Fences respected:** foreign-tree (demo-private); GL-shader byte-fence (N/A); profile:budget (N/A — demo SFC); warm-cream identity (`.glass-menu-row` + the selected-glass register are warm-cream; the brand-`--primary` wash is RETIRED — the de-red discipline restores the identity); one-GL-per-route (N/A — no GL, the ToC is a CSS surface over the page wash); presets-in-consumers (the on-glass tokens are library identity); substitution-vs-inheritance (the `.glass-quiet` container re-points `--muted-foreground → --on-glass-muted` at the container, the inheriting axis reaches the rows — the canonical substitution; the `--menu-row-active-bg` override is the documented retune path). **Zero `src/` paint** — the page is `demo/stories/navigation/`.

---

## 4 · The gate — born-RED → GREEN proof design

**A focused `proof:storybook-meta` clause (M13 — the ToC menu-glass re-point)** OR a fold into M9A's flat-fill detector. Born-RED on HEAD.

**Clauses (born-RED at HEAD):**
- **M13-1 — `.themed-card` RETIRED.** Assert `toc-tracking.vue` carries ZERO `themed-card` class. RED on HEAD (2 hits, `:125,160`). GREEN at the retire.
- **M13-2 — the ToC rows compose `.glass-menu-row`.** Assert the ToC `<button>` rows carry `glass-menu-row` AND ZERO flat `bg-primary/10`/`hover:bg-muted/N` fill survives beside them (the cascade-trap fence — a flat wash would win). RED on HEAD (`bg-primary/10` + `hover:bg-muted/50`). GREEN at the re-point.
- **M13-3 — the active state is glass, not brand-red.** Assert the active-row state reads `--glass-bg-floating`/`--menu-row-active-bg` (the selected-glass register) and the active glyph is `--foreground` (NOT `text-primary`/a saturated brand hue — the W-REGISTER-IOS de-red). RED on HEAD (`text-primary`). GREEN at the re-point.
- **M13-4 — the on-glass foreground rung.** Assert the ToC text reads the on-glass rung (inherited via `.glass-quiet`'s `--on-glass-muted` re-point OR explicit `text-(--on-glass-muted)`), NOT a raw `text-muted-foreground` flat fill on a glass plate. RED on HEAD. GREEN at the re-point.

**Self-test bite (planted defect that MUST red):**
- a synthetic `toc-tracking.vue` re-adding `themed-card` MUST red M13-1;
- a synthetic re-point leaving `.glass-menu-row` BESIDE `hover:bg-muted/50` MUST red M13-2 (the cascade-trap — the flat wash competes);
- a synthetic active state using `text-primary` MUST red M13-3 (the brand-red regression);
- the good re-point MUST pass all four.

**Born-RED proof:** at HEAD, M13-1 (themed-card), M13-2 (no glass-menu-row), M13-3 (text-primary) RED. At the build, all four pass. The self-test reds the gate if a bite stops biting.

---

## 5 · Paint verification — the π readback (BC anti-disease law)

This wave PAINTS (the ToC chrome is a visible surface), so it takes a **`proof:ba-gestalt` verdict on the `shell` aggregate surface** (the navigation-chrome row in the BD-grown roster — BD.W-GESTALT-ROSTER-GROW; the ToC is shell navigation, mapped to `shell` not an invented per-pane row; the `/navigation/toc-tracking` ToC SFCs enrolled in the `shell` BD freshness record's `surface-paths`) on a fresh capture — no source-green close.

**The binding π** (both modes × desktop+mobile, on `:5199`, at `/navigation/toc-tracking`):
- **(a) the ToC rows read as glass-quiet hover-lift plates** — hover a row, assert the glass-quiet `--menu-row-bg` plate materializes + the PRM-gated `translate` lift fires (PRM → no lift). The flat `bg-muted` wash is GONE (the cascade-trap fence's binding proof — the glass plate paints, not the flat fill).
- **(b) the active row reads as the selected-glass tier** — the active ToC item reads the `--glass-bg-floating` glass tier (a tint forward of the hover-quiet), the glyph warm-ink — NOT the `bg-primary/10` brand-red wash. The de-red discipline reads.
- **(c) the on-glass text clears the floor** — the muted ToC text + document body read the on-glass muted rung (legible over the composited glass plate, ≥4.5:1 — the `--on-glass-muted` derivation), quieter than the active row's `--foreground` ink (the muted-vs-ink register holds).
- **(d) both modes** — the dark capture reads the BC dark-arm (`--on-glass-muted` brighter over the luminous-dark plate; the selected-glass tier lifts off the dark plate).

**The BC anti-disease law observed:** the device-free M13 clauses prove the SOURCE re-point; the π proves the RENDERED glass (a re-point that leaves a competing flat wash, or whose `.glass-menu-row` silently no-ops, passes the source gate but reds the capture — the cascade-trap is exactly the silent-no-op class the live π catches). No "is GREEN at this wave close; W-REFLECT re-confirms on the union tree"; the readback runs at this wave's close.

---

## 6 · Fences + risks — what must NOT break

- **The cascade-trap (load-bearing — BA.W-MENU-GLASS's recorded trap).** `.glass-menu-row`'s glass plate is an `@layer components` rule; an unlayered `hover:bg-muted/50` utility WINS over it. The re-point MUST DELETE the flat hover/active utilities, not leave them beside `.glass-menu-row` (else the flat wash paints and the glass never materializes). M13-2 guards it; the π Arm (a) is the binding proof.
- **The de-red discipline (W-REGISTER-IOS).** The active ToC state is the "selected reads as glass" tier (`--glass-bg-floating`) with a warm-ink glyph — NEVER the `bg-primary/10`/`text-primary` brand wash (a ToC active item is navigation, not a brand-red color event). M13-3 guards it.
- **`.themed-card` is a clean retire, no alias.** The orphan never painted; deleting it is a pure correction. No `themed-card`→`glass-quiet` alias survives (the no-backwards-compat law).
- **The on-glass foreground (substitution-vs-inheritance).** The `.glass-quiet`/`.glass-resting` container re-points `--muted-foreground → --on-glass-muted` at the container; the inheriting axis reaches the rows. A row hand-rolling a flat `text-muted-foreground` would bypass the on-glass rung — drop the explicit flat token (let the container's re-point reach it) OR read `text-(--on-glass-muted)` directly. Do NOT re-pin a raw `text-muted-foreground` on a glass row.
- **Warm-cream identity.** The re-point RESTORES the identity (the brand-`--primary` wash + the dead orphan are the off-identity surfaces being retired). No demo hue enters a token.
- **Risk — low-medium.** A focused single-page re-point onto shipped registers, with one load-bearing subtlety (the cascade-trap — delete the flat hover/active fills, π-verified). The active-state re-point (brand-wash → selected-glass) is the gestalt change; the rest is mechanical.
