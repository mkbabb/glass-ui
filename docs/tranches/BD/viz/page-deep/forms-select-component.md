# Pass-E COMPONENT DEEP AUDIT — forms/select

**Page:** `forms/select` · **Import:** `@mkbabb/glass-ui/select`
**Demo:** `demo/stories/forms/select.vue`
**Real src:** `src/components/ui/select/{Select,SelectTrigger,SelectContent,SelectItem,SelectLabel,SelectSeparator,SelectScroll*}.vue` + `_shared/menuItemVariants.ts` + `_shared/useSurfaceAxis.ts` + `styles/{menu,select}.css` + `styles/glass/{ladder,reveal}.css`

The Select family is a reka-ui compound wrapper: 10 SFCs forwarding `SelectRoot`/`SelectTrigger`/`SelectContent`/`SelectViewport`/`SelectItem` over the house glass material. No procedural viz. The component is well-built — the substantive findings are an animation-doctrine desync on the chevron, a missing four-state contract on the trigger PRESS/specular, and a documentation/label concern. Most of the user's ask (per-section glassy card, bigger main card, dock APIs, aurora backdrop) is DEMO scope, not this component.

---

## 1 · ANIMATION affordance — HIGH, with two doctrine gaps

**Present + correct:**
- **Listbox entrance** `SelectContent` composes `.glass-reveal` (BB.W-LIQUID-REVEAL) — the iOS-27 bloom-from-anchor: SPATIAL scale on `--spring-snappy` + its own `--spring-snappy-duration` clock, EFFECTS opacity/`filter` blur-settle on `--ease-out`, `transform-origin` at `--reka-popper-transform-origin`. Coupled three-channel, compositor-only, PRM-carved. This is exemplary — the panel coalesces from the trigger edge.
- **Row hover** `.glass-menu-row` (BA.W-MENU-GLASS) — element-level glass-quiet oklab tint on hover/focus/`data-highlighted`/open, a PRM-gated `translateY(--menu-row-lift)` lift on `--spring-smooth`, 44px touch floor. Four input modes (pointer/keyboard/reka-highlight/sub-open) reach ONE register. Strong.
- **Trigger surface** `.tap-squish` + `transition-control` (surface-only bezier `--ease-standard`) + the `focus-ring`.

**GAP-1 (MODIFY) — the chevron transform rides a FIXED BEZIER, violating motion-canon P1.** `SelectTrigger.vue` chevron: `transition-transform duration-200 ease-standard [&[data-state=open]]:rotate-180`. Per `motion-canon.md` P1 (spatial-channel-iff-spring), a `rotate` is a SPATIAL transform and must ride a `--spring-*` token, not the bezier `--ease-standard` (which is the EFFECTS register). The 180° flip reads as a flat mechanical sweep, not a liquid settle. The `.glass-reveal` panel blooms on the snappy spring while its own chevron rotates on a dead 200ms bezier — a visible desync at the same gesture. **Fold onto a `--spring-snappy` rotation** (the same clock the panel blooms on) so the two read as ONE coherent open.

**GAP-2 (AUGMENT) — the trigger has NO PRESS/specular four-state contract.** Per Design Axis 2 every interactive atom bundles the four-state contract. The trigger has hover (`transition-control`), focus (`focus-ring`), disabled (`disabled:opacity-disabled`), and a CSS `.tap-squish` `:active` scale — but NOT the lit-glass press register the sibling Button got (BB.W-BUTTON-GLASS: `useSpringPress` + `--glass-btn-press-t` coupled specular/brightness). A glass picker trigger is a glass control; it should carry the same interruptible coupled spring-press + pointer-following gleam (W-LIQUIDHOVER `vSpecular` tier-root auto-arm) the glass Button tier carries. Currently the trigger is the only always-on glass control NOT on the specular tier.

**No dead/janky animation found** — `transition-control` is the post-BC de-lagged surface clock (`--duration-control`, the §F "super laggy" fix already landed). The scroll-up/down buttons are static chevrons (correct — they are hold-to-scroll affordances, not animated).

---

## 2 · PROCEDURAL VIZ — N/A

No aurora/blob/fourier. The demo's `--viz-fourier`/`--viz-chebyshev`/`--viz-legendre` dot tints on SelectItems are STATIC token reads (`--select-dot-color`), not a viz. The GPU/Safari procedural bar does not apply. (The "glass demos over colorful aurora" ask is the DEMO-page's job — fold the Select sections onto `<DockStage>`/`<Aurora>` per the user ask, NOT a component change.)

---

## 3 · PERFORMANCE — compositor-clean

- **Compositor-only:** the reveal animates `scale`/`opacity`/`filter` (longhands, no `transform:` stacking context); the row lift is `translate`; the chevron is `rotate`. ZERO layout property animates — `proof:no-layout-animation` holds.
- **No offscreen-pause needed** (no rAF — the component is event/state-driven, not a frame loop).
- **No layout thrash:** the BA.W-EMISSION precompiled `[data-slot="select-content"]` max-height bound ships in `dist/glass-ui.css` (the dead arbitrary-bracket class that never painted is fixed) — a 16-item dropdown bounds inside the viewport with inner scroll, no overflow reflow. The BC.W-DROPDOWN-FIX `scrollbar-gutter: stable` pairing (consumer-side) prevents the trigger twitch.
- The portal (`SelectPortal` → body) is correct — the listbox escapes the scroll-clip.

---

## 4 · SAFARI compatibility — clean

- `backdrop-filter` carries the `-webkit-` pair (ladder.css injects it into the shipped CSS via the build seam — `glass-floating` is `-webkit-backdrop-filter`-safe).
- `color-mix(in oklab/srgb)`, `light-dark()`, `@property`, `linear()` spring timing — all Safari 26+ baseline (the DESIGN.md target).
- The `.glass-reveal` `transition-behavior: allow-discrete` + `overlay`/`display` transitions are Safari 18+ — the reka portal is NOT a native top-layer so the discrete-display leg degrades gracefully (the panel still fades; only the exit `display` discreteness is engine-tail).
- `contrast-color()` (if reached via the adaptive seam) is `@supports`-gated PE — never the sole legibility path. No Safari-blocking pattern.

---

## 5 · IDIOMATIC / no-legacy — two residuals

**GAP-3 (PRUNE/doc) — the `size` font-rung portal caveat is a half-working seam.** `SelectTrigger.vue`'s `size="display"|"audacious"` writes `--dropdown-text` + `--text-dropdown` on the trigger scope to scale the picker family — but the JSDoc itself admits the PORTALLED items do NOT re-resolve unless the consumer ALSO threads `--dropdown-text` on the shared Select scope (the portal escapes the trigger's inline style). This is a documented-but-leaky two-write workaround (the substitution-vs-inheritance trap, only half-closed). It is the value.js trigger-only `text-display` desync re-expressed as a consumer footgun. **Architectural transpose:** the font rung should write the family token on the `SelectRoot`/`Select` scope (where both the trigger AND the portalled content's `--reka-*` context resolve from), not the trigger leaf — so a single `size` prop scales trigger + items in lockstep with no consumer co-thread. Currently it's a partial seam the docstring apologizes for.

**GAP-4 (no-legacy / Safari note) — clean.** No dual-path, no dead code in the component itself (the dead arbitrary-bracket max-height was already pruned at BA.W-EMISSION). `menuItemVariants` glass arm correctly DROPS the flat `bg-accent` utilities (the cascade-trap pre-empt) — idiomatic.

**Import-path label (user ask):** the demo header reads `Forms · Select` (`section-label--tinted text-admin-label`) but the import path `@mkbabb/glass-ui/select` is NOT surfaced as a standardized label on the page. The user asks to STANDARDIZE the import-path label — currently inconsistent across forms pages. This is a DEMO/page concern (FOLD onto a shared StoryPage import-badge), not a component change.

---

## 6 · The glass SIX-LAYER composite — PRESENT (5.5/6)

The `SelectContent` listbox composes `glass-floating` (via `surfaceClass('glass','floating')`) which carries:
1. **backdrop blur+saturate** ✓ `backdrop-filter: var(--glass-blur-floating)` (the dialed-back 13px + saturate companion)
2. **surface tint** ✓ the W55 `--glass-tint-*` oklab seam (darkens-over-light / lifts-over-dark)
3. **edge rim** ✓ `--glass-material-rim` (= `--glass-edge-light`) in the box-shadow stack
4. **inner catch-light** ✓ the `.glass-floating::before` specular core (ladder.css §138)
5. **drop shadow** ✓ `--glass-shadow-floating` under-shadow + lift
6. **grain** — ⚠ the grain `::after` is a TIER property but the listbox is small; grain reads on large plates. Present in the tier, sub-perceptual at picker scale (acceptable).

The TRIGGER, by contrast, reads `.control-surface` (the form-control REST register) — a quieter glass, NOT the full six-layer floating tier. Correct for a resting control, but GAP-2's specular omission means the trigger misses layer 4 (catch-light) on interaction.

---

## VERDICT (5 lines)

1. **Well-built compound** — the `.glass-reveal` bloom + `.glass-menu-row` four-mode hover are exemplary iOS-27 liquid-glass; six-layer composite present on the listbox (5.5/6).
2. **GAP-1 MODIFY** — the chevron `rotate` rides a fixed `ease-standard` bezier (motion-canon P1 violation; spatial→spring); fold onto `--spring-snappy` to sync with the panel bloom. **AUGMENT** onto BD.W-BC-COMPONENT-CANON (the de-shadcn/control-canon cluster) or a new BD.W-SELECT-CHEVRON-SPRING.
3. **GAP-2 AUGMENT** — the trigger lacks the lit-glass press/specular four-state contract the glass Button got (BB.W-BUTTON-GLASS / W-LIQUIDHOVER `vSpecular`); the only always-on glass control off the specular tier. Book a BD trigger-press wave.
4. **GAP-3 PRUNE/transpose** — the `size` font-rung is a half-closed two-write portal workaround (docstring-admitted leak); transpose the family-token write onto the `Select` ROOT scope so trigger+items scale in lockstep.
5. **Demo asks (per-section glassy cards / bigger main card / aurora backdrop / standardized import-path label) are PAGE scope** — FOLD onto BD.W-FORMS-CARD-FOLD (extend it to wrap each Select section in its own `<Card>`/`<ShowcaseFrame>` over `<DockStage>`/`<Aurora>`, and add the standardized import-path StoryPage badge); zero src paint there.
