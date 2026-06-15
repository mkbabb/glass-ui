# W-FEEDBACK-TONE — tone rides ON glass: the three feedback tone maps collapse onto ONE tinted-glass recipe (DELTA)

**Wave**: BA.W-FEEDBACK-TONE
**Surface**: `/feedback/alert`, `/feedback/toast`, `/feedback/notification` (the R8-12/R8-13 "not glassy at all" feedback band)
**Captured**: 2026-06-12, `:5199` via `tests-visual/glass-cohesion.spec.ts` (chromium-headless-new, real-GPU Metal) + a live capture pass
**Modes**: light + dark · **Viewports**: desktop 1280×800 (the π final-alpha) + 1280×900 whole-page captures
**Baseline**: `docs/tranches/BA/audit/ground/R8-12-toasts-not-glassy.png` (the dark opaque toast pair), `ground/R8-13-not-glassy-b.png` (the flat green Notification), `audit/fleet/toast-glass-tone-slabs-dark.png` (the Destructive trigger as a solid red slab)

## The R8-12 / R8-13 mandate

> "Toasts not glassy at all" · "not glassy" (the flat green Notification)

The defect was three INDEPENDENT tone maps, two of which painted a colored SLAB occluding the backdrop (re-grounded at HEAD, §0 — every cite confirmed, line-drift recorded below):

| RC | mechanism (HEAD) |
|---|---|
| F-1 / GVC-1 | `Toast.vue:57-62` layered SOLID `bg-{destructive,success,warning,info}` opaque token plates over the `glass-floating` base — `--success`/`--warning`/`--info` are alpha-free `oklch()` colors, `--destructive` an alpha-free `hsl()`; the `blur(16px)` track survived but was INERT behind a 100%-opaque plate (→ R8-12) |
| F-3 / GVC-2 | `Notification.vue:57-62` (`notificationClasses`) painted `bg-<tone>/90` — α 0.9, ABOVE the ~0.92 translucency floor — a near-opaque slab, the SECOND independent tone map (→ R8-13b) |
| FD-NOTIF-OFFMODEL | `demo/.../notification.vue:48-53` hand-rolled a raw-Tailwind `bg-blue-500`/`bg-emerald-500`/`bg-amber-500`/`bg-red-500` swatch map — NOT the house tokens — teaching an off-token tone vocabulary (the THIRD tone map) |
| F-4 | the four tones live in two places with mixed spaces (`destructive` hsl · success/warning/info oklch), consumed as raw plates — Alert ALONE was correct in SHAPE but HARDCODED its `border-<tone>/40` rim per variant (no single feedback-tone knob) |
| GVC-4 | `proof:glass-cohesion` verified the BASE routes glass but had NO variant-arm bite + NO final-composited-alpha assert — a glass base + an opaque tone overlay passed every check (the AW.W25 "parity" green-over-broken close) |

### §0 line-drift (recorded, not re-diagnosed)

The mechanism held at every cite; only line numbers drifted across the six landed batches:
- tone token decls: spec cited `color-radius.css:246-248` / `dark-arm.css:108-110` → HEAD is `color-radius.css:273-275` / `dark-arm.css:144-146`. Same alpha-free `oklch()` tones, same `--destructive` legacy `hsl()`.
- `Toast.vue:57-62`, `Notification.vue:57-62`, `alert/index.ts:19-33`, `demo/.../notification.vue:47-53` — all matched at HEAD (line-exact).
- The shared tint seam (`cards.css:84`, `--veil-bg`) is byte-present + `glass/ladder.css:38-109` runs the identical `color-mix(in oklab, <rung bg>, var(--glass-tint-source) var(--glass-tint-strength))` — the EXACT seam the tone recipe rides.
- W-SURFACE-AXIS (Batch 4 parallel) LANDED its `[data-surface]` glass arm (`src/styles/glass/surface-axis.css`); the glass arm is the bare tier identity (no rule), so the tone tint consumes the `--glass-bg-*` rung tokens DIRECTLY — a re-point, not a fork, per the spec coordination note.

## The fix (ONE tinted-glass tone recipe, the three-map collapse)

A new `src/styles/feedback-tone.css` (`@layer components`, imported into `index.css` rung 7a, after `cards.css`) mints the register ONCE on the EXISTING tint seam — ZERO new compositing path:

```css
.feedback-tone {
    background: color-mix(in oklab, var(--feedback-tone-rung), var(--tone) var(--feedback-tone-strength));
    border-color: color-mix(in oklab, transparent, var(--tone) var(--feedback-tone-border-strength));
}
.feedback-tone-success    { --tone: var(--success); }
.feedback-tone-warning    { --tone: var(--warning); }
.feedback-tone-info       { --tone: var(--info); }
.feedback-tone-destructive{ --tone: var(--destructive); }
```

ONE knob `--feedback-tone-strength: 18%` (the bounded toast-glass §A band) tints all four tones; `--feedback-tone-rung` defaults the floating rung (Toast/Notification), re-pointed to wash on Alert. The four hues map to the HOUSE `--{success,warning,info,destructive}` tokens (presets-in-consumers — no new colors). The body ink stays `--foreground`/`--card-foreground` (the Alert discipline); the glyph carries the full-chroma `var(--tone)`. ONE color event per surface (AZ.W-SUFFUSE one-color-event idiom).

- **Toast** (`Toast.vue`): the `bg-<tone>` solid-plate variant map DELETED; `variant !== 'default'` composes `feedback-tone [&_svg]:text-(--tone)` + `feedback-tone-<name>`. `default` stays the un-toned floating glass.
- **Notification** (`Notification.vue`): the `notificationClasses` `bg-<tone>/90` slab map DELETED; `type` maps onto `toneClasses` (`error` → `feedback-tone-destructive`, the three-maps-into-one collapse); the glyph reads `.feedback-tone-glyph`.
- **Alert** (`alert/index.ts`): the per-variant `border-<tone>/40` rim re-pointed onto the shared family — each toned variant composes `feedback-tone feedback-tone-<name> [--feedback-tone-rung:var(--glass-bg-wash)]` (wash rung RETAINED). The lone divergent `text-destructive` body tint unifies onto `--card-foreground` (body-ink-stays-legible). A tone recalibration is now ONE edit (F-4 fixed).
- **Demo swatch** (`demo/.../notification.vue`): the raw-Tailwind swatches → `feedback-tone-<name> bg-(--tone)`, teaching the house vocabulary.

## The π final-alpha readback (W2 — the binding visual truth)

Every Toast variant + Notification type + the Alert wash-rung composites TRANSLUCENT over the busy backdrop (`α < 0.92`, the toast-glass §E floor). Measured live off `getComputedStyle` at `:5199`, both modes:

| rung | tone | LIGHT α | DARK α |
|---|---|---|---|
| floating (Toast/Notification) | success | 0.836 | 0.902 |
| floating | warning | 0.836 | 0.902 |
| floating | info | 0.836 | 0.902 |
| floating | destructive | 0.836 | 0.902 |
| wash (Alert) | success | 0.426 | 0.492 |
| wash | warning | 0.426 | 0.492 |
| wash | info | 0.426 | 0.492 |
| wash | destructive | 0.426 | 0.492 |

All α < 0.92 → colored GLASS, the backdrop shows through. RED at HEAD: `success` → `oklch(0.805 …)` no-alpha (α 1.0); `notif_success` → `oklab(… / 0.9)` (≥0.92 fails). The dark floating rung (α 0.902) rides W-DARK-MATERIAL's re-tuned `--glass-opacity-floating: 0.88` — it clears the floor; it is the tightest margin and is W-DARK-MATERIAL's deliverable, not a W-FEEDBACK-TONE miss (the F-2 ownership split).

`glass-cohesion.spec.ts` "feedback tone composites translucent" — **4/4 PASS** (light + dark × {chromium-headless-new, coarse-touch}).

## The gestalt verdict (inv-4 — the GESTALT bar)

`docs/tranches/BA/audit/visual/feedback-tone/{alert,toast,notification}-{light,dark}.png` — the feedback band captured WHOLE-PAGE, both modes, over its real backdrop.

**VERDICT: PASS.** The tone reads as COLORED GLASS across all three surfaces in both modes:
- Alert (light + dark): each tone is a tinted-glass plate — destructive a soft/dark red wash, warning amber, info blue, success green — with a tone-keyed rim + full-chroma glyph, body ink legible. The `default` stays neutral glass. NOT the R8 flat outline-only plate.
- Toast (dark): the info + destructive toasts read as tinted-blue / tinted-red glass plates over the dark backdrop, the backdrop visible through them — NOT the R8-12 opaque dark slabs. The only saturated-red element is the "Destructive" TRIGGER button (the CTA, correct).
- Notification: the toned strip reads as colored glass, not the R8-13b flat green slab.

The iOS/Material tinted-glass register the wave converges on is in place; the R8-12/R8-13 opaque slabs are gone.

## The gate teeth (W1 + W3 — born-RED → GREEN)

`proof-glass-cohesion.mjs` gains the `feedback-tone` SOURCE arm (5 checks):
- `toast-no-opaque-tone-plate` / `notification-no-opaque-tone-plate` — born-RED at HEAD (`OPAQUE_TONE_UTIL` + `RAW_TAILWIND_TONE_SLAB` matched `bg-success`/`bg-destructive/90` on the pre-fix source — witnessed: Toast slab=true, Notification slab=true), GREEN at close.
- `three-maps-collapse-onto-shared-register` — POSITIVE: Toast + Notification + Alert ALL reference the shared register (born-RED: Toast on-register=false at HEAD).
- `recipe-on-the-tint-seam` — the recipe resolves `color-mix(in oklab, var(--feedback-tone-rung), …, var(--tone) var(--feedback-tone-strength))` with NO parallel opaque map (born-RED: `feedback-tone.css` did not exist at HEAD).
- `tone-bite-distinguishes-opaque-from-translucent` — the self-test: the bite flags `bg-success` / `bg-destructive/90` / `bg-info/95` AND exempts `bg-card/40` + `bg-success/20` (the narrowed translucent-only door — W3).

`node scripts/proof-glass-cohesion.mjs` → **PASS exit 0** (43 surfaces + 5 new feedback-tone checks, all green at close).

## Anti-evasion (the W1/W2 bite-tightening, the AW.W25 guardrail)

The W2 π is a POSITIVE final-alpha measure on the COMPILED color — it catches: the format evasion (`oklch()`/`rgb()` no-alpha serialization → α 1.0 fails); the alpha-knob evasion (`/0.95` near-opaque ≥0.92 fails); the raw-Tailwind-escape evasion (`bg-emerald-500` → opaque color fails). The W1 SOURCE bite also catches a renamed raw-Tailwind tone slab (`RAW_TAILWIND_TONE_SLAB`). The AW.W25 close proved the tokens were CONSUMED but never that the composited plate was TRANSLUCENT — the W2 π + W1 bite are the second guardrail; the inv-4 gestalt is the first.

## Worktree-concurrency note (coordination — NOT a W-FEEDBACK-TONE regression)

The shared `tranche/BA` worktree carries concurrent in-flight edits from other Batch-4 parallel waves (`SegmentedTabs.vue`/`constants.ts`/`configurator` from W-TABS-shaped work; `drawer.css`/`glass/surfaces.css`/`tokens/glass.css`/`DrawerContent.vue` from W-GLASS-CAL/W-SURFACE-AXIS.2). Consequences observed, none in my File Bounds:
- `npm run typecheck`: 5 errors, ALL in `tabs`/`configurator` (`INDICATOR_RELEASE_MS`, `UseTabIndicatorParams.vertical`, `SegmentedTabsVariant`) — ZERO in toast/notification/alert/feedback. My surfaces typecheck clean.
- `glass-cohesion.spec.ts` "paint glass and flatten" (the pre-existing Drawer/Slider/Notification-DEFAULT arm): the **drawer** `--glass-level:0` flatten fails (`blur(13px)` did not flatten) — the drawer's blur recipe is owned by W-GLASS-CAL / the surface-axis drawer adoption (both modified `drawer.css` + the glass blur in the worktree, files I am forbidden to touch). My `feedback tone composites translucent` arm passes in isolation (4/4). The drawer flatten is a concurrent-wave seam for the integrator, not this wave.

## Files changed (this wave)

- `src/styles/feedback-tone.css` (create) — the shared tinted-glass tone register.
- `src/styles/index.css` — `@import "./feedback-tone.css"` rung 7a + the cascade-doc entry.
- `src/components/ui/toast/Toast.vue` — the `bg-<tone>` variant map → the shared register.
- `src/components/ui/notification/Notification.vue` — `notificationClasses` → `toneClasses` on the shared register.
- `src/components/ui/alert/index.ts` — the per-variant rim re-pointed onto the shared `--feedback-tone-*` family.
- `demo/stories/feedback/notification.vue` — the swatch colors → house tokens (swatch only; the `bg-card/60` TABLE chassis untouched — W-STAGE Batch 6).
- `scripts/proof-glass-cohesion.mjs` — the `feedback-tone` variant-arm SOURCE teeth.
- `tests-visual/glass-cohesion.spec.ts` — the render-side final-alpha π arm.
- `CLAUDE.md` — the tinted-glass tone register record + the cohesion-gate teeth extension.
