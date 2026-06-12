# BA fleet lane — demo-affordances (R8-13a + R8-17)

Audit-only. Live-probed :5199 (dev already up), DARK mode forced (`document.documentElement.classList.add('dark')`).
Captures banked beside this report.

---

## R8-13a — the full-width flat "Fire a toast" pill

**User's words:** "why is this button so large and uninteresting" (`ground/R8-13-button-large-uninteresting.png`).

### Live readback (DARK, :5199/feedback/toaster)
- The "Fire a toast" `<Button>` renders **1036×40px = exactly the full parent width** (`fullWidth: true`).
- Parent: `<div class="flex flex-col gap-4">` (a COLUMN flex, `display: flex`, width 1036px).
- `variant="default"` → glass register; computed bg `oklab(0.498 … / 0.504)` — a ~50%-α translucent gray slab.
- Class chain: `btn-pill tap-squish focus-ring whitespace-nowrap …` (the standard CVA Button — NOT the broken glass-btn case below).

### Root cause (MECHANICAL)
`demo/stories/feedback/toaster.vue:30` — a single trigger `<Button>` is a direct child of the `flex flex-col gap-4` wrapper (`:28`). A `<Button>` is `inline-flex`, but as a FLEX ITEM in a column flex its **cross-axis size is governed by the parent's default `align-items: stretch`**, so it stretches to the FULL container width. There is no `w-full` class — the stretch is the column-flex default. Layered on top: `variant="default"` (the W54 glass register) paints a flat translucent gray over the near-black `<ShowcaseFrame>` plate → the "large and uninteresting" read is (full-width stretch) × (flat glass-over-dark).

### Survey — every single-trigger Button stretching full-width in a column-flex
Sites where a SOLE/leading `<Button>` sits as a direct child of `flex flex-col` (stretches to full width):
| site | file:line | variant | note |
|---|---|---|---|
| Fire a toast (R8-13a) | `demo/stories/feedback/toaster.vue:30` | `default` (glass) | the captured defect |
| Toggle theme | `demo/stories/composables/use-global-dark.vue:24` | `default` (glass) | same stretch |
| Toggle theme | `demo/stories/composables/use-dark-mode-sync.vue:30` | `default` | same stretch |

Counter-evidence (the CORRECT idiom already in the codebase): every MULTI-button story wraps its triggers in a `flex items-center gap-X` ROW (`use-timer.vue:31`, `use-interval.vue:27`, `use-raf-loop.vue:44`, `use-animated-number.vue:30`, `use-clipboard.vue:39`), so the buttons size to content and do not stretch. The defect is specifically the LONE trigger dropped straight into a column wrapper.

### Design diagnosis + gestalt remedy DIRECTION
A demo TRIGGER is an action affordance, not a full-bleed CTA — it should be a content-sized real Button at proper scale, never a viewport-wide slab. The gestalt fix is to stop letting the column-flex stretch govern trigger width: a lone trigger sits on its own content-width axis (the same `flex items-center` row register the multi-button stories already use, or an equivalent self-start register), so a single trigger reads identically to one in a button row. Concurrently, a demo TRIGGER's register should be a deliberate, interesting variant (a real glassy/solid/audacious Button that reads as a control) rather than the bare `variant="default"` glass-over-dark slab — pick a trigger register that POPs on the showcase plate (this ties into R8-11/R8-12's glass-on-dark legibility cluster: glass `default` over a near-black frame has no edge). One demo-trigger convention, applied across the story set.

---

## R8-17 — the broken plot "Play" control

**User's words:** "What even is this play button" (`ground/R8-17-play-button.png` — an amorphous white blob + clipped triangle + 'Play' text colliding).

### Root cause (MECHANICAL — file:line)
`demo/stories/motion/curve-gallery.vue:184-191` — a HAND-ROLLED play button:
```html
<button type="button" class="btn-pill glass-btn rounded-pill px-4 py-2 text-sm font-medium" @click="playAll">
  ▶ Play family
</button>
```
Live readback (`:5199/motion/curve-gallery`, Quad family, DARK): the button renders **40×40px** (`cap-play-family-btn.png` — the exact R8-17 blob: `▶` clipped at top, "Play" on line 2, "family" → the "mi" sliver clipped at bottom).

**The collapse mechanism — a class-composition contradiction.** The button composes BOTH `.btn-pill` AND `.glass-btn`:
- `.glass-btn` (`src/styles/glass/surfaces.css:46-64`) is the ICON-BUTTON primitive: `width: var(--size-icon-btn); height: var(--size-icon-btn)` (a FIXED ~40px square) + `contain: paint` (`:63`, AY.W-A11Y-PERF O-4).
- `.btn-pill` (`src/styles/glass/surfaces.css:108`) is the TEXT pill: padding-sized, no width.

`.glass-btn`'s fixed `width/height` wins, pinning the box to the 40px icon square; `.btn-pill`'s padding cannot expand it; `white-space: normal` wraps the `▶ Play family` text; `contain: paint` clips the overflow → the illegible blob. Proven live: `width: fit-content` snaps the box to its true 118px content width and the label renders cleanly; with `contain: paint` left in place under `nowrap`/`block`/default it stays pinned at 40px.

This is a **register collision**: `glass-btn` (single-icon, fixed-square) and `btn-pill` (text, content-width) are mutually exclusive and were wrongly stacked on one element.

### Survey — every play / replay affordance in the demo
| affordance | file:line | mechanism | render |
|---|---|---|---|
| ▶ Play family (R8-17) | `demo/stories/motion/curve-gallery.vue:189` | hand-rolled `.btn-pill.glass-btn` | **BROKEN — 40px blob** |
| per-card `play(row)` | `demo/stories/motion/curve-gallery.vue:194-244` | the whole `.glass-card` is the click target (no glyph) | OK but UNDISCOVERABLE (no play icon/affordance; a card that secretly fires a dot) |
| ▶ Play (named register) | `demo/stories/motion/springs.vue:170` | CVA `<Button variant="default">` | OK — 65×40px, sizes correctly |
| ▶ Play (playground) | `demo/stories/motion/springs.vue:249` | CVA `<Button variant="default">` | OK — 83×40px |
| ▶ Trace the curve | `demo/stories/motion/curve-gallery/BezierEditor.vue:231` | CVA `<Button variant="default">` | OK (CVA Button never composes `.glass-btn`, so it can't collapse) |
| Replay / Replay draw | `motion/reveal.vue:33`, `motion/underline.vue:34` | CVA `<Button variant="outline">` | OK |
| dock transport Play | `dock/overview.vue:149/437/517/544` | `<DockIconButton><Play/></DockIconButton>` (real Lucide `<Play>` in an icon-button) | OK — the CORRECT register |

**Shared cosmetic anti-pattern across ALL `▶`-prefixed play controls:** the unicode `▶` glyph (U+25B6) is pasted as a TEXT prefix instead of the Lucide `<Play>` icon component the dock transport controls (`dock/overview.vue`) already use correctly. Even where the layout survives (springs/BezierEditor), `▶` is a typographic triangle baseline-misaligned with the label, not a proper leading icon.

### Design diagnosis + gestalt remedy DIRECTION
The demo has no single play-control register — it has FOUR ad-hoc renderings of "fire this animation": a broken hand-rolled glass-btn+btn-pill, an invisible whole-card click target, CVA Buttons with a baseline-misaligned `▶` text glyph, and the proper `DockIconButton` + Lucide `<Play>`. The gestalt fix is ONE proper play-control register for the storybook: a real glassy Button (or `DockIconButton` for the compact case) with the Lucide `<Play>` icon as a leading icon (never the `▶` text glyph), at a content-driven width that can never composition-collide with the fixed-square icon-button primitive. The hand-rolled `.btn-pill.glass-btn` stack must be retired outright (it pits two contradictory size registers against each other). The per-card invisible click target should gain a discoverable play affordance (a Lucide `<Play>` overlay/leading icon) so a card reads as activatable. This is a demo-chassis convention (the storybook owns canonical primitives like `<StorySection>`/`<ShowcaseFrame>`); a `<StoryPlayButton>`-class register that wraps the real Button + `<Play>` would be the idiomatic home, consumed everywhere a demo fires a motion.

### Caller hazard worth a gate
`.glass-btn` is a fixed-square, `contain: paint` icon-button. Composing it with `.btn-pill` (or any text label) silently collapses and clips. The library has no guard against this composition; a negative-predicate proof (no element composes both `.glass-btn` and `.btn-pill`, or no text-bearing `.glass-btn`) would catch the class. This is the kind of "stale binding / silent no-op" trap the house already gates elsewhere.
