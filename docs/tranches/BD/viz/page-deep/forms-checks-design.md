# forms/checks — FRONTEND-DESIGN critique (Pass-E, design lens)

**Page**: `demo/stories/forms/checks.vue` · live `http://localhost:5173/forms/checks`
**Lens**: the frontend-design skill bar (distinctive · production-grade · AVOID generic-AI) applied to glass-ui's own language (DESIGN.md §L1–§L5, motion-canon, affordance-map).
**Captured**: 1440×806 light + dark, full body, computed-style probes (`_cap-forms-checks-{light,dark}.png`).

This is the **selection-controls forms page** — Checkbox · Radio · Switch, the three smallest, most-tapped atoms in the library. It must read as the canonical statement of "this is what a glass-ui *control* feels like." Today it reads as a **competent three-row spec-sheet inside ONE big glass plate**: an eyebrow banner, then three hairline-delimited `<StorySection>`s (Checkbox / RadioGroup / Switch), each a heading + a grey mechanism-caption + a wrap-row of `control + label` pairs, stacked top-to-bottom in a single 1152px `glass-resting` card. The atoms are correct and lovely in isolation; the *page* spends almost none of the library's identity. It is a notch ABOVE forms-inputs (it at least has a glass plate around the body) but fails the same five systemic frontend-design bars: card-per-section, bigger main area, aurora, dock leverage, page-level animation life.

---

## 1. The verdict up front

The page demonstrates the three control families and their states (checked · indeterminate · disabled · one-of-N radio · instant-toggle switch) honestly. But it demonstrates them as **a delimited documentation list, not a designed surface**:

- **ONE monolith card, NOT card-per-section.** Probed: the body is ONE `.rounded-card` `glass-resting` plate (1152×774, `bg oklab(0.934 … / 0.664)`, `radius 16px`, `backdrop-filter: blur(10px) saturate(1.05)`) wrapping ALL THREE sections, which are then divided internally by `.story-sections--delimited` hairlines. The user's "**each sub-section in its OWN glassy card**" is **unmet** — there is exactly ONE card and three hairline-separated rows inside it, not three glassy cards. The hairline divider is the most generic element on the page (the AI-template `<hr>` tell).
- **The main area is NOT bigger.** The card is 1152px on a 1440px viewport (~290px dead margin), and inside it the three control rows are top-left-anchored `flex flex-wrap` strips, leaving a large empty lower-right quadrant of warm-grey plate (visible in both captures — the bottom third of the card is void). The user asked for MORE screen space *deployed*; the page reserves a big plate and fills a third of it.
- **No aurora, no colorful field.** Probed: `canvas count = 0`, `body background = transparent`. The brief's "**glass demos over COLORFUL aurora backgrounds**" is unmet — the `glass-resting` card's `blur(10px) saturate(1.05)` (a real six-layer composite per §L1) sits over a **flat `oklab(~0.94)` cream wash** with nothing structured to refract. The `saturate()` channel — the "concentrated light" reading §L1 calls load-bearing — has no chroma to concentrate. In dark mode the page collapses to a near-black void with a charcoal plate; the glass reads as a tinted panel, not a lensing layer. **The lens has nothing behind it** (§L1: "surfaces are lensing layers, not blur swatches").
- **Zero dock-API leverage.** The page that should "leverage the dock APIs (contextual switching/animating)" has none. The three control families are the *ideal* contextual-switch content — a `DockStack mode="facets"` or `DockLayerGroup` that swaps the protagonist control (Checkbox → Radio → Switch) with a live crossfade is the exact capability the brief names. Instead they're a static stack.
- **Page-level animation is dead; the atoms are alive.** The atoms DO carry their affordance-map contract (Checkbox: `tap-squish` + `transition-control` + `.focus-ring`; Switch: thumb spring on `--spring-snappy`; Radio: `tap-squish`+`focus-ring`). But the PAGE never *arrives*: the `.scroll-cascade` wrapper is present yet nothing visibly builds in; the three sections don't gravity-rise; no state ever animates *into* existence on screen.

---

## 2. VISUAL HIERARCHY — the eye lands on the title, then flattens to one register

**What works.** The `Checkbox · Radio · Switch` H1 resolves to **86.1px Plus Jakarta Sans / 600** (`--type-display-mega`-class rung) — the audacious √φ ladder IS used for the hero and it lands. The eyebrow (`FORMS · SELECTION`, tinted teal) + the subpath chip is the StoryHeader cluster shape. The three section `<h2>`s resolve to a consistent 20.4px `text-subheading` / 600. The typographic *scaffolding* is correct and on-ladder.

**What fails.** After the title the page is **three identical-weight sections** — three 20.4px headings, three grey captions, three wrap-rows. There is no focal control, no protagonist, no "look here." All three families read at the same scale, so the eye gets no reward for the Switch (the most kinetic of the three, the one worth staging large) over the bare Checkbox. The frontend-design bar demands a hierarchy: ONE control family staged large and central as the protagonist (the Switch, animated, at ~1.5–2× scale), the other two as a tighter supporting matrix.

**The ladder is used at page chrome but never inside the body.** DESIGN.md's "TYPOGRAPHY-forward / kinetically typographic" identity stops at the H1. A selection page is the perfect place to let a `text-display-mega`/`-audacious` poster anchor the protagonist — a giant ghosted state word ("ON" / "OFF" cross-fading behind the focal Switch at poster scale; a live-counting "3 / 7 selected" tally in the mega rung behind a checkbox group). The interior is 100% body-and-caption — the flat register the frontend-design skill flags as the generic-template tell.

**Move**: stage ONE control family (the Switch) as the protagonist at poster scale with a live state word behind it; demote Checkbox + Radio to a tight 2-up supporting matrix.

---

## 3. STAGING / GLASS FIDELITY — the right card, the wrong (missing) backdrop

The single big `glass-resting` card is **the correct primitive** — and it's a genuine six-layer composite (probed `blur(10px) saturate(1.05)`, a real rim `oklab(… / 0.04)`, the radius-16 card). That's a real upgrade over forms-inputs (which had no body card at all). But it commits the §L1 anti-pattern *over-reach in tier and under-spend in backdrop*:

- The §L1 **tier-selection rule** says "reach for the LOWEST tier that meets the legibility floor." Wrapping the whole body in `glass-resting` (a frosted *plate*) is the over-reach the rule names — and worse, it has nothing to refract, so the frost just dulls the cream. The lower `wash`/`veil` tier — "permeable veil over a kinetic backdrop" (§L1 tier table) — is the right tier for a card whose JOB is to let a backdrop read through.
- **No aurora** means the `saturate(1.05)` channel is inert. The directive — **"glass demos over COLORFUL aurora backgrounds"** — is the fix. Run a vivid multi-nuclei aurora preset behind the card (offscreen-paused by construction via `useIntersectionPause` + `content-visibility`, one GL context per route, budget-safe) so the glass actually *lenses* warm-to-cool nuclei. THIS is what makes a control surface read as Apple-grade vs. a div with a border.
- **Dark mode**: the charcoal plate is the W-DARK-MATERIAL register working (the violet `--primary` on the checked controls is the chromatic dark-primary, correct), but the missing aurora leaves it a black void. The dark register is meant to be a *luminous transmissive material* (§L1 / W-DARK-MATERIAL) — it needs the backdrop to glow through.

**Architectural transposition**: stop using ONE opaque-ish `glass-resting` monolith. Use a `surface="veil"`/`.glass-wash` card PER section (BA.W-SURFACE-AXIS factored `surface="veil"` for exactly this), over a colorful aurora — satisfying "each sub-section in its OWN glassy card" AND "glass over the live field" AND the tier-selection discipline at once, with no occlusion (glass-cannot-sample-glass §L1 is honored: the veil cards + the aurora share the page's single monotone composition container).

---

## 4. CARD-PER-SECTION + LAYOUT — one plate, three hairline rows

The user's structural ask is explicit: **each sub-section in its OWN glassy card; the main card BIGGER.** Probed today:

| Treatment | Sections | Reads as |
|---|---|---|
| ONE `.rounded-card glass-resting` plate, internally `.story-sections--delimited` | Checkbox · RadioGroup · Switch | a label + caption + control-row, divided by hairlines, inside one frosted box |

The hairline-delimited stack is the **generic-AI list tell** the frontend-design skill warns against ("I stacked each block with a divider"). The page got *halfway* — it has a glass body card — but didn't take the architectural step to card-PER-section.

**The resolution is a `surface="veil"` glass card per family** (Checkbox card · Radio card · Switch card), arranged as a bento/asymmetric composition rather than a vertical stack: the protagonist (Switch) card large, the Checkbox + Radio cards as a 2-up supporting row. Each veil card frames its demo as a real glassy card (rim + catch-light + grain) AND admits the aurora through. The `.story-sections--delimited` hairlines disappear — the cards ARE the separation.

**Width + dead space**: the card occupies ~80% width but its content hugs the top-left, wasting the lower-right quadrant. Distribute the three families into the bento so the card's whole footprint is *used*, not reserved. "BIGGER" means the composition commands the canvas, not that a big empty plate sits on it.

---

## 5. ANIMATION AFFORDANCE — atom-alive, page-dead, state-static

Per affordance-map + motion-canon, every element should answer the pointer the same liquid way, and the page should *arrive*.

**Alive (good — better than forms-inputs):** the atoms honor their affordance-map rows — Checkbox `group tap-squish focus-ring transition-control`; Switch thumb spring `translate var(--spring-snappy-duration) var(--spring-snappy)` + `.glass-specular-track` thumb gleam; Radio `tap-squish focus-ring`. Press + focus + hover are wired AT THE ATOM. This is the four-state contract (§L3 tap-choreography, the 0.96 squish rung; §L5 focus ring) honored.

**Dead (the gap):**
- **No entrance.** `.scroll-cascade.story-sections` is present, but the three sections don't visibly *build in* — no per-section gravity-rise landing on each card (the W-HIERARCHY2 eyebrow→title→blurb cluster shipped this; it's not generalized to the body). A selection page should assemble itself, each card blooming on its own `--spring-snappy-duration` beat.
- **No demonstrated state-transition.** The most kinetic, most *teachable* moment of a selection control is the **toggle itself** — the checkbox draw-on, the switch thumb spring + track tint cross-fade, the radio dot-bloom. The page shows the controls in *static end-states* (some checked, some not). It never animates a toggle ON SCREEN. A premium selection page auto-demonstrates: a Switch that idle-toggles on a slow loop, the thumb springing, the track tinting — the §L2 "if the user's finger touched a pixel, use a spring" vocabulary made *visible* as the page's protagonist motion.
- **Indeterminate is a missed protagonist.** The `indeterminate` checkbox (probed live) is the single most distinctive state on the page (the dash glyph, the tri-state) — shown flat. The indeterminate→checked→unchecked cycle is a beautiful one-shot to stage as the focal animation.
- **No dock contextual motion.** The brief's "contextual switching/animating" — a dock that morphs/crossfades the protagonist across Checkbox→Radio→Switch — is entirely absent.

**Move**: (a) wire `.scroll-cascade` gravity-entrance to land on each veil card (per-card `--spring-snappy-duration` stagger, motion-canon); (b) make the protagonist Switch idle-demonstrate its toggle on a slow PRM-gated loop (thumb spring + track tint); (c) stage the indeterminate→checked cycle as a focal one-shot; (d) add a `DockStack mode="facets"` that contextually switches the protagonist family with a live crossfade.

---

## 6. POLISH / DISTINCTIVENESS — competent, restrained, not yet bespoke

The page avoids the worst generic-AI sins (real tokens, real components, the lovely warm-cream/charcoal plate, the audacious H1, the disciplined one-color-event). But it does not read **bespoke + premium**:

- **Repetition without rhythm.** Three left-aligned heading+caption+control-row blocks in a vertical hairline-delimited stack is a *list*, not a composition. No asymmetry, no bento, no scale contrast.
- **Mechanism-voice captions, not showcase copy.** "Standard, indeterminate, and disabled." · "One-of-N. Inline layout with labels for hit-targets." · "Immediate-effect toggle. Prefer over checkbox when the change is instant." — these are decent (the Switch one even teaches a *choice*, which is good), but they're API/usage voice. A foundational page should read as a product statement of the control material. (MEMORY: tighten superfluous language — these are short, but compress to one showcase line each stating the control's *feel*, not its mechanism.) The Radio's "Inline layout with labels for hit-targets" is pure implementation note.
- **The eyebrow blurb is over-written.** "Checkboxes, radios, and switches — the field controls stay ink; the section identity is the ONE color event." narrates the design *system's internal rule* to the reader (the one-color-event discipline is for the author, not the audience). Compress to the value: what these controls ARE.
- **Dead lower-right plate quadrant** is itself an anti-polish signal — a premium page commands its canvas.

---

## 7. SPACING / RHYTHM + COLOR SUFFUSION

**Spacing**: the *vertical* rhythm is fine and tokenized (`StorySection gap="lg"`, golden-ratio section cadence; the W-CARD-PAD sqrt-φ block-over-inline ladder inside the card). The failure is **compositional**: the content hugs the top-left of an oversized plate, so the golden-ratio discipline lives in the type/pad scale but is absent from the *layout* — no √φ relationship between the protagonist and satellite regions, no bento proportion.

**Color suffusion**: **correctly restrained but inert**. The one-color-event rule (AZ.W-SUFFUSE) is honored — the IconChip + tinted eyebrow resolve the `--section-color-3` teal (probed eyebrow `oklch(0.542 0.089 222.8)`, the cool forms-band stop), the controls stay ink (light) / violet `--primary` (dark, the chromatic dark-primary — correct). That's the right *proportion*. But with the aurora absent and the cards absent, the ONE teal event is a lonely dot on a vast grey plate — the proportion reads *inert*, not *calm*. The fix is NOT more color events; it's giving the teal something to sit against (the aurora field §3 + the veil cards §4 supply the depth that makes the single teal accent read as deliberate). Optionally the protagonist control's focus/checked state could carry a `--glass-accent` teal chromatic rim (BB.W-GLASS-ACCENT, the per-instance axis) — one color event, on the focal element, the band's own hue.

---

## 8. PATH-LABEL + LANGUAGE (the user's explicit asks)

- **Path label is WRONG.** Probed: the rendered subpath chip reads **`@mkbabb/glass-ui/switch`** — but the page demonstrates **Checkbox, Radio AND Switch** (the H1 says so). The chip names only one of three families. Worse, all three components actually import via local relative paths (`../../../src/components/ui/checkbox`, `/radio-group`, `/switch`) — and Checkbox/Switch ship from the **root barrel** (`@mkbabb/glass-ui`), not a `/switch` subpath. **Standardize**: a multi-family page's chip should be the band-level canonical import — `@mkbabb/glass-ui` (root barrel, where Checkbox/RadioGroup/Switch all live) — NOT a single misleading `/switch` subpath. This is the path-label-standardization ask, live-failing on this exact page.
- **Superfluous language**: the eyebrow blurb narrates the system's internal one-color-event rule TO the reader — internal-author voice in audience copy; compress to what the controls are. The SFC top-comment (`PH3-safe (the rail is an INLINE borderLeft, not the border-l-[3px] + <IconChip> double-header SHAPE PH3 forbids)`) is internal-changelog noise that belongs in a commit, not the source header of a showcase page. The three section captions are mechanism-voice; compress each to one showcase line stating the control's *feel*.

---

## TOP DESIGN MOVES (ranked, concrete)

1. **Veil-glass card per family + a protagonist bento.** Replace the ONE `glass-resting` monolith + `.story-sections--delimited` hairlines with a `surface="veil"`/`.glass-wash` card PER family (Checkbox · Radio · Switch — BA.W-SURFACE-AXIS, §L1 permeable veil), arranged as a bento: the Switch card large as protagonist (~1.5–2×), Checkbox + Radio as a 2-up supporting row. Satisfies "each sub-section in its OWN glassy card" + "main area bigger" + "protagonist hierarchy" + the §L1 tier-selection discipline at once, with no occlusion.
2. **Colorful aurora behind the cards.** Run a vivid multi-nuclei aurora preset behind the bento (offscreen-paused, one GL context, budget-safe) so the veil glass actually lenses varied color (§L1 — the single highest-leverage fidelity fix; it turns frosted-cream plates into liquid glass). Verify dark-mode chroma survives (the W-DARK-MATERIAL luminous-transmissive register, not a black void).
3. **Demonstrate the toggle — the page's protagonist motion.** Make the focal Switch idle-toggle on a slow PRM-gated loop (thumb spring on `--spring-snappy` + track tint cross-fade, §L2 "finger-touched-a-pixel → spring"); stage the checkbox indeterminate→checked→unchecked cycle as a focal one-shot. A selection page that never animates a selection is the core miss.
4. **Leverage the dock APIs — contextual family switching.** Wire a `DockStack mode="facets"` (or `DockLayerGroup`) that crossfades the protagonist across Checkbox → Radio → Switch, so the page SHOWS the dock switching context/animating — the capability the brief names and the page lacks. Also wire `.scroll-cascade` gravity-entrance to land per-card (motion-canon, W-HIERARCHY2 generalized to the body).
5. **Fix the path label + tighten the copy.** Correct the chip from the misleading `@mkbabb/glass-ui/switch` to the band-canonical `@mkbabb/glass-ui` (where all three families ship); delete the internal-changelog SFC header comment; rewrite the eyebrow blurb to state what the controls ARE (not the system's internal one-color rule); compress each section caption to one showcase line of the control's *feel*; add a poster-rung typographic anchor behind the protagonist (a live "ON/OFF" state word or a "N selected" tally in the `--type-display-mega` rung).
