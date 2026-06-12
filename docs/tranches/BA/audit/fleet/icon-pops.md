# BA fleet lane — icon-pops (the colorful-audacious-pops axis)

**Lane:** icon-pops
**Brief:** "with colorful audacious pops, like those found in our icons (how might we increase this, too? within a sense of proportion)". Study the `icons.vue` reference register; propose where MORE pops belong under the one-event-per-surface proportion rule (the page-by-page pop map); and how the ICON register itself could increase (richer chips? duotone? micro-animation?).
**Method:** read the W-SUFFUSE wave + the `proof:suffuse` ledger + the reference `icons.vue`/`empty-states.vue`; live-probed `:5199` (icons reference + forms/inputs flat read + settings) in dark (the demo's sticky register); source-level color-event census across all ~90 demo stories.
**Evidence:** `docs/tranches/BA/audit/fleet/icon-pops-evidence/` — `icons-ref-light-pops.png` (the 13-chip reference row), `empty-states-dark.png` (settings ONE-event read), `forms-inputs-dark-flat.png` (the monochrome starvation read).

---

## The reference register (the gold standard — what a "pop" IS)

`demo/stories/foundations/icons.vue:124-164` ships the canonical pop, live-confirmed via `getComputedStyle`:

- **The chip:** a `size-12` (48px) `rounded-full` circle. Backplate `color-mix(in srgb, var(--section-color-N) 25%, transparent)`; glyph `var(--section-color-N)` at full chroma, 22px, `stroke-width:1.75`.
- **The system:** ONE chip per stop, walked 1:1 across the **13-stop `--section-color-0..12` ramp** (confirmed 13 stops in `tokens/light-dark.css`). The ramp carries **dual light/dark arms** (`tokens/light-dark.css:106-118` + `dark-arm.css:72-84`) — so the chip POPS on EITHER backdrop. This is the key property: the pop is mode-robust by construction, unlike most of the demo's dark register which R8 flags as flat. Live readback at stop 0: bg `color(srgb 0.915 0.484 0.671 / 0.25)`, glyph `oklch(0.721 0.145 354)`.
- **The proportion rule (the fence):** ONE color event per surface (a chip cluster OR a field-behind-glass, never both at volume); chip ≤ icon scale; body ink never tinted. Codified as the `proof:suffuse` (d1/d2/d3) predicates over a per-surface LEDGER (`scripts/proof-suffuse.mjs:103`).
- **The applied twin:** `empty-states.vue:130-139` — the same recipe at `size-14`/`size-6` glyph, one chip per card.

**The register is STATIC.** The chip has no hover-bloom, no glyph micro-animation, no entrance reveal. The only motion on chip-bearing surfaces is the *card's* `hover:-translate-x-px` cartoon-shadow lift (`icons.vue:107`, `empty-states.vue:126`) — the chip itself never animates. This is the headroom for "how might the icon register increase."

---

## The defect: the pop is RARE, not suffused (the starvation read)

A source-level color-event census across all ~90 demo stories (grep for `section-color-`/`--chart-`/`--viz-`/`--motion-accent`/`--color-gold`/`section-label--tinted`/`iconColor` + the chip recipe):

- The **chip recipe** (`color-mix(...section-color)` circle) appears on exactly **4 surfaces**: `icons.vue`, `empty-states.vue`, `settings.vue`, `auth-shell.vue`.
- **~60 of ~90 stories carry ZERO color events** — entirely monochrome. ALL of `forms/*` (13 stories), ALL of `containers/*` (16 stories), most of `display/*` and `feedback/*`. Live: `forms/inputs` (evidence png) reads pure white-on-near-black except the destructive-red error state (a *functional* event, not a brand pop) — the section heads (Default / With label / With error / Disabled) are plain white text with no eyebrow accent, no glyph chip. The brand's color identity is INVISIBLE across the storybook's bulk.
- This is the W-SUFFUSE D4-2 finding (~104/121 routes flat) viewed through the COLOR lens: W-SUFFUSE enrolled the high-leverage subset (the motion category onto `--motion-accent` purple, settings eyebrows de-noised, metric glyphs) and explicitly NAMED the library-wide breadth to a W60-class successor. The pops axis is the under-spent half of that successor.

The user's ask — "increase this, within a sense of proportion" — is therefore NOT "add chips everywhere" (that violates the one-event rule) but: **(a)** spread the existing chip register to the surfaces that EARN an event per a deliberate page map; **(b)** make the chip register itself RICHER (it is currently a flat static circle); **(c)** abstract the copy-pasted recipe so a new pop is one component, not an inline `:style` paste.

---

## The page-by-page pop map (where MORE pops belong — within one-event proportion)

The principle: a surface earns its ONE pop where there is a NATURAL semantic axis to color (a state, a category, a metric class, a section). Surfaces that are intrinsically a flat reference (the icon GRID, the type ladder, the curve TABLE — D3-9) STAY flat; adding color there violates proportion. The map below assigns each enrolled surface its single event-vehicle:

| Category | Surface | Today | The proportioned pop (ONE event) |
|---|---|---|---|
| **Forms** | `forms/checks`, `forms/toggle`, `forms/select`, `forms/multi-select` | flat white-on-dark | a section-color glyph chip on each section EYEBROW (the section-accent register, the `.section-label--tinted` walked at ONE chroma) — the field controls stay ink (body-ink-untinted floor) |
| **Forms** | `forms/inputs` (evidence) | flat | the section-eyebrow chip register; the destructive-red error stays the functional event (one per *sub*-section is fine — they don't compete) |
| **Containers** | `containers/accordion`, `collapsible`, `tooltip`, `popover`, `sheet`, `dialog` (16 stories, ALL zero) | flat | a leading glyph-chip on each demo CARD header (the empty-states model) keyed to a stable per-demo stop — the richest under-spent category |
| **Display** | `display/badge` | flat | badge already HAS tone variants — surface the section-color tone as a documented variant axis (a pop that's also a component teaching moment) |
| **Display** | `display/status-dot`, `display/pulse` | 1 event | these ARE the thin-dot positive idiom (timeline-style) — keep as the dot register, do not chip-ify (proportion) |
| **Data** | `data/metric-cell`, `metric-stack`, `metric-badge` | `iconColor` prop exists, under-spent | wire the `--chart-*` semantic glyph tint onto every metric demo (download/upload/latency/jitter) — the prop SHIPS (`MetricCell.vue:72`), the demo under-uses it |
| **Data** | `data/table`, `data/data-table` | flat (D4-4) | the ledger/blueprint surfaces — a section-color column-header glyph chip OR keep monochrome + lean on the grid underlay (a grid page may legitimately be its ONE event the grid, not a chip) |
| **Feedback** | `feedback/toast`, `notification`, `alert`, `confirm-dialog` | flat | the notification-TONE idiom (success/warning/info/error) is the positive model — surface it as the event (a tone-tinted leading glyph), already a semantic axis |
| **Feedback** | `feedback/progress` | sectioned (broken per R8-14) | the segment colors ARE the event once the gradient is fixed — no chip needed |
| **Navigation** | `navigation/tabs`, `header-ribbon`, `carousel` | flat | a single section-accent on the active indicator (one event) |
| **Compositions** | `hero`, `auth-shell`, `empty-states`, `settings` | HAVE the event | the model — UNTOUCHED |
| **Foundations** | `icons` GRID, `typography` ladder | flat (D3-9) | STAY flat — these are reference surfaces; the Pops block is the icons page's ONE event |
| **Motion** | the `/motion` family | `--motion-accent` purple | the model — UNTOUCHED |
| **Substrates** | aurora/blob/constellation/fourier | live field | the field-behind-glass IS the one event — no chip |

The single highest-leverage spread: the **Containers category** (16 stories, 100% zero-event) — a leading glyph-chip on each demo's card header is the empty-states recipe applied, and it's the largest flat block in the storybook.

---

## How the ICON register itself could increase (the user's parenthetical: "how might we increase this, too?")

The chip is a flat static circle. Four richness directions, in proportion-safe order (each is ONE event, none stacks a second competing tint):

1. **Duotone glyph (net-new — genuine headroom).** Today every lucide glyph is a single-stroke line at full chroma. There is ZERO duotone/fill treatment anywhere in the codebase (grep confirmed). A duotone register — a low-alpha `fill` of the same `--section-color-N` under the full-chroma `stroke` (the same `color-mix 25%`-vs-full relationship the chip backplate already speaks, moved INSIDE the glyph) — gives the icon depth without a second hue. This is the iOS/Material "filled-tonal" icon move, and it composes with the existing chip (the backplate becomes the fill's quieter twin). It is the richest single uplift and stays mono-hue (proportion-safe).
2. **A chip hover-bloom (the chip is static today).** The chip never reacts — only its card lifts. A real glass hover register on the chip itself (the backplate lifting 25%→~35% mix, a soft `--section-color` glow ring, the glyph stroke firming) on the SAME `--spring-smooth`/`--ease-standard` register the buttons use. CRITICAL CONSTRAINT: R8-18 retires the `btn-audacious` disco-grain/sparkle family GLOBALLY — the bloom must be the smooth glass register, NEVER a sparkle-sweep. So this is a "smooth glow", not "more disco".
3. **An entrance reveal cascade.** W-SUFFUSE's own D5-1 flags content-entrance motion as DEAD across every story (0 `[data-reveal]` live). A chip CLUSTER (the 13-stop Pops row, the empty-states grid) is the natural stagger surface — `vReveal` with a `--d` index so the chips bloom in sequence. The library SHIPS `vReveal` for exactly this and its own showcase never uses it. This makes the pops feel ALIVE without a second color.
4. **Activate the dead gold marker.** `--tier-featured` (`oklch(0.841 0.173 84.2)`) is a MINTED-BUT-DEAD token — zero demo consumers (grep confirmed; the gold register is spent only on the `gold-audacious` CTA + the instrument-chassis upload phase). It is the natural ONE-event for a featured/premium/recommended surface (a "featured" empty-state card, a "recommended" preset). A gold chip is the one warm pop the section ramp's cool-biased stops don't cover.

---

## The abstraction gap (the user's standing "abstract this out" directive, applied to pops)

The chip recipe is a HAND-ROLLED inline `:style` pattern, copy-pasted across `icons.vue`, `empty-states.vue`, and conceptually `settings.vue`/`timeline.vue`. There is **NO library `IconChip`/`Pop` primitive** (grep: only `toggle-chip`, `metric-badge`, `status-dot` — none is the section-color icon-chip). A new surface that wants a pop must re-paste the `color-mix(in srgb, var(--section-color-${n}) 25%, transparent)` recipe and get the proportion (chip ≤ glyph) right by hand. Abstracting the pop into a tiny library `<IconChip :icon :section>` (or `:tone`) primitive — owning the recipe + the chip≤glyph ratio + the optional duotone/bloom/reveal axes from the section above — turns "add a proportioned pop" into one component, makes the one-event rule structurally easy to honor, and gives the `proof:suffuse` d2/d3 checks a single component to assert against instead of N inline pastes. This is the StackedIcons-shaped move (a cluster primitive) the library already does elsewhere, just never for the color pop.

---

## Notes / boundaries

- The one-event rule is BINDING and machine-checked: every spread proposal above assigns exactly ONE event-vehicle per surface and keeps body ink untinted. Any wave that implements this must extend the `proof:suffuse` LEDGER (`scripts/proof-suffuse.mjs:103`) to ENROLL each newly-popped surface, or the count check vacuously passes.
- The disco fence (R8-18) constrains the micro-animation direction: smooth glass bloom/reveal only, never the retired sparkle/grain family.
- This lane is design-direction-seeding (a wave spec), not implementation — per the phase fence.
