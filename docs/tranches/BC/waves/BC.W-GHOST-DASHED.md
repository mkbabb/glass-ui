# BC.W-GHOST-DASHED — the ONE ghost/empty-slot dashed register + rounded-everywhere-it-should-be
- **Band:** 5 · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** AFTER BC.W-GLASS-IDENTITY + BC.W-BLACK-BAR (the rounded-corner sweep + the ghost plate read against the rebuilt material). BESIDE BC.W-PADDING-CANON (both are card-detail passes; ghost-plate padding rides the φ ladder). BESIDE BC.W-SEPARATOR-FIX (the separator page has a ghost/rounded witness). The ghost register is CONSUMED by `/compositions/empty-states` + the 6 ad-hoc placeholder sites.
- **Owns / closes:**
  - USER-DEFECTS §C: *"Ghost items must have a DASHED outline."*
  - USER-DEFECTS §C: *"Items not rounded (multiple: a separator-page element, the home screen, the aurora configurator)."* / *"`/foundations/radii` 'items not rounded' witness."*
  - USER-DEFECTS §E: *"The aurora configurator is not rounded."* / §G: *"Home-screen elements not rounded (multiple)."*
  - ORCHESTRATION §1 Band 5 box: `BC.W-GHOST-DASHED — ghost items dashed outline; rounded everywhere it should be`.
  - route-census: `/foundations/radii` ("items not rounded" witness), `/compositions/empty-states` (ghost items → dashed).

## Goal (the gestalt)
A developer sees ONE consistent ghost treatment everywhere a slot is empty / a thing is a placeholder / an affordance is "add something here": a dashed-outline plate, consistently rounded, calm-muted, that reads unmistakably as "this is a placeholder, not a filled surface." There is no longer a page where one empty-slot is `rounded-md border-dashed` and another is `rounded-2xl border-dashed` and a third is `rounded-card` over `bg-card/50` — they all read as the SAME ghost register. And across the whole demo, anything that SHOULD be rounded IS rounded (the iOS-concentric-corner bar): no square-cornered card, no square-cornered configurator panel, no square home-screen tile, no square element on the separator/radii pages. The corners read as the deliberate, soft, Apple register the user means by "rounded everywhere it should be."

## Starting state (measured, file:line)
**The ghost/placeholder is forked 6 ways** (grep `border-dashed` in `demo/stories/` → **6 SFCs**, each inconsistent in radius AND host):
- `display/section.vue:59`: `rounded-md border border-dashed border-border px-3 py-2 text-mono-caption text-muted-foreground` (no host bg).
- `containers/context-menu.vue:56`: `rounded-2xl border border-dashed border-border bg-card/50` (different radius, `bg-card/50` host).
- `data/timeline-segmented.vue:183`: `rounded-md border border-dashed border-border bg-background p-4`.
- `data/timeline.vue:102`: `rounded-md border border-dashed border-border bg-background p-4`.
- `data/timeline-continuous.vue:211`: `phase-detail-idle rounded-md border border-dashed border-border bg-background p-4`.
- `data/search.vue:451`: `rounded-card border border-dashed border-border bg-card p-6`.
Three radii (`rounded-md`/`rounded-2xl`/`rounded-card`), three hosts (`bg-background`/`bg-card`/`bg-card/50`/none), three pads — NO single ghost register. The user reads this incoherence directly.

**The empty-states ghost CTAs** — `compositions/empty-states.vue:142`: the `first-run` + `complete` states carry `ctaVariant: "ghost"` (`empty-states.vue:79,89`); the cards themselves carry a `border-2 border-foreground/10` SOLID border (`empty-states.vue:125-128`), NOT a dashed ghost plate. An empty-state IS the canonical "ghost item" the user means — its placeholder framing should read dashed.

**The WatercolorDot `ghost` precedent** — `WatercolorDot.vue:25-33,175-182`: the library ALREADY has a `variant="ghost"` register (the seeded-blob SILHOUETTE as a stroke, NOT a CSS dashed rectangle — `blob.vue:700` says it explicitly). This is a DIFFERENT ghost (a blob outline, the empty-palette-slot affordance) — the fence is binding (the dashed register is for RECTANGULAR placeholder plates; the watercolor ghost is for the blob-silhouette slot — two distinct registers, recorded).

**The not-rounded witnesses** (USER-DEFECTS §C/§E/§G — live-probe in BC to root-cause each):
- `/foundations/radii` — the "items not rounded" witness page itself (route-census flags it; the radii specimen squares must demo correctly).
- the home screen (`/foundations/intro`) — multiple un-rounded tiles (the category index grid, `intro.vue:76-114`).
- the aurora configurator — `not rounded` (USER-DEFECTS §E; the `<Configurator>` shell on `/substrates/aurora` reads square-cornered; root-cause: a missing `rounded-panel`/`overflow-hidden` clip at the configurator container-root — the BA.W-CONFIG-CHASSIS owns section rounding at the container clip, but the aurora shell may bypass it).
- a separator-page element (`/display/separator` — the raw `rounded-card border bg-card` divs, BC.W-SEPARATOR-FIX's surface).

The semantic radii are well-defined (`theme/radius.css:31-51`): `--radius-card`→2xl(16px), `--radius-panel`→xl(12px), `--radius-button`→`--radius`(10px), `--radius-badge`/`--radius-dock`→pill, `--radius-md`→6px. So the FIX is consumption-consistency, not a new token.

## Target spec (grounded)
TWO concerns, ONE register each:

**1. The ONE ghost/empty-slot register** (`@utility ghost-slot` in `src/styles/utilities.css` OR a demo-private `<GhostSlot>` chassis primitive — decide by the ≥2-consumer + demo-vs-library rule). Since the ghost plate is a STATIC visual pattern (not an interactive element — design-axis 2: static patterns are CSS classes), mint it as `@utility ghost-slot`:
```
@utility ghost-slot {
  border: 1px dashed color-mix(in srgb, var(--foreground) 22%, transparent); /* the warm-ink dashed hairline, NOT a hard border-border */
  border-radius: var(--radius-card);   /* THE single ghost radius — 16px, consistent everywhere */
  background: color-mix(in oklab, var(--glass-bg-wash), transparent 40%); /* a faint glass-wash ghost, reads "empty" not "filled" — NOT bg-card */
  color: var(--muted-foreground);
}
```
The 6 ad-hoc `border-dashed` sites COLLAPSE onto `.ghost-slot` (ONE radius `--radius-card`, ONE host the faint wash, ONE muted ink). A site needing a tighter radius (a small inline ghost) uses a `--radius` rung explicitly, but the DEFAULT ghost is `--radius-card` (the rounded-everywhere bar applied to the ghost itself). The dashed hairline is the warm-ink at 22% (the BA.W-NO-GRAY warm identity, NOT a grey `border-border`). The empty-states `first-run`/`complete` cards (the canonical ghost items) read the ghost-slot register (a dashed plate, dashed because the state is empty/placeholder).

**2. The rounded-everywhere sweep** — every surface that SHOULD be rounded reads a semantic radius token, NOT a square corner:
- The aurora configurator gets the `rounded-panel` + `overflow-hidden` container clip (the BA.W-CONFIG-CHASSIS section-rounding-at-the-clip idiom — if the aurora shell bypasses it, re-route it through `<Configurator>`'s rounded root; BC.W-CONFIG-RIGHT coordinates the configurator placement, this owns its corner).
- The home-screen category tiles (`intro.vue:76-114`) get `rounded-card` (BC.W-COMPOSITIONS-HERO owns intro's hero collapse, this owns the tile corners — coordinated).
- `/foundations/radii` is verified to demo every semantic radius correctly (the witness page).
- The separator-page raw divs become `<Card>` (rounded by construction) — BC.W-SEPARATOR-FIX's re-author, this wave's rounded-everywhere clause verifies the result.
- The sweep is GESTALT: a grep for `rounded-none` / un-rounded `border ... bg-{card,background}` plates that should be cards, each routed onto a semantic radius (the gate's positive arm).

The fence: the `WatercolorDot variant="ghost"` (the blob-silhouette stroke) is a DISTINCT register — the dashed-rectangle ghost-slot is for RECTANGULAR placeholders, the watercolor ghost is for the blob-shaped empty-palette slot. Both are "ghost," neither forks the other (recorded in the register docstring).

## Mechanism / files
- **MINT** `@utility ghost-slot` in `src/styles/utilities.css` (the single dashed-placeholder register: warm-ink 22% dashed hairline + `--radius-card` + faint glass-wash host + muted ink). Tailwind-first (`@utility`, reads existing tokens — no raw bracket setter).
- **COLLAPSE the 6 ad-hoc sites** onto `.ghost-slot` (`section.vue:59`, `context-menu.vue:56`, `timeline.vue:102`, `timeline-segmented.vue:183`, `timeline-continuous.vue:211`, `search.vue:451`). Each loses its bespoke `rounded-X border border-dashed border-border bg-Y` for `class="ghost-slot p-…"` (the pad rides the φ ladder where it's a card, BC.W-PADDING-CANON coordinated).
- **RE-FRAME the empty-states ghost cards** — the `first-run`/`complete` ghost states read `.ghost-slot` framing (dashed, because empty); the FILLED states (search/onboarding/error/offline with real CTAs) keep the solid card. (Coordinates with BC.W-PADDING-CANON on `empty-states.vue` — that owns the hand-rolled pad retire, this owns the ghost framing.)
- **ROUND the witnesses** — the aurora configurator (`rounded-panel` clip), home tiles (`rounded-card`), separator divs (→ `<Card>`); each routed through a semantic radius token, no square corner.
- **NO new radius token** — the semantic radii (`theme/radius.css`) are byte-untouched; this is consumption-consistency.
- **EXTEND the demo-design / suffuse census gate** OR mint `proof:ghost-dashed` (device-free) — the rounded-everywhere + one-ghost-register asserts.

## Acceptance (gestalt + measured + gate)
1. **Captured-paint gestalt (dev-tools MCP, both modes):** a screenshot tour of the 6 ex-placeholder sites + empty-states shows ONE consistent dashed-ghost register (same `--radius-card` corner, same warm dashed hairline, same faint-wash host — reads unmistakably "placeholder"). A tour of the aurora configurator + home tiles + separator page shows rounded corners everywhere (no square plate). A human confirms "ghost items are dashed + consistent; everything that should be rounded is rounded."
2. **Machine gate `proof:ghost-dashed`** (device-free, born-RED on the pre-fix tree → GREEN at close):
   - G1 — `@utility ghost-slot` EXISTS in `utilities.css` with the dashed border + `--radius-card` + the warm-ink-not-grey dashed color (a `border-border` hard-grey dashed REDs; the warm `color-mix(... --foreground ...)` is required).
   - G2 — ZERO ad-hoc `border border-dashed border-border` placeholder survives in the enrolled demo set (the 6 sites collapsed; grep exit 1). A bespoke `rounded-{md,2xl} border-dashed` REDs.
   - G3 — the empty-states ghost states (`first-run`/`complete`) read `.ghost-slot`; the filled states keep the solid card (the ghost-iff-empty discipline).
   - G4 — the rounded-everywhere positive arm: the aurora configurator root resolves a semantic radius (not square); the home tiles resolve `--radius-card`; the radii page demos every semantic radius. A surviving square-cornered `border ... bg-card` plate that should be a card REDs (the enrolled witness set).
   - G5 — the WatercolorDot-ghost fence: `.ghost-slot` is NOT applied to the blob-silhouette slot (the two ghost registers stay distinct; a `.ghost-slot` on a `<WatercolorDot>` REDs).
   - + a self-test bite: a synthetic re-added `rounded-2xl border border-dashed border-border` REDs G2; a synthetic grey-`border-border` dashed in `ghost-slot` REDs G1.
3. **π readback `tests-visual/ghost-dashed.spec.ts`** (both modes, chromium): the ghost-slot resolves `border-style: dashed` + `border-radius` == `--radius-card` + a warm (chroma>0) dashed color + a translucent host (α<1); the rounded witnesses resolve a non-zero `border-radius` matching their semantic token. Live-verify = a captured delta via the dev-tools MCP, never a commit claim.

## Fences / invariants (must NOT regress)
- **Clean break, NO alias** (MEMORY no-backwards-compat): the 6 ad-hoc placeholder recipes are RETIRED onto `.ghost-slot`, not aliased.
- **ONE ghost register** — `.ghost-slot` is the SINGLE dashed-rectangle placeholder; the `WatercolorDot variant="ghost"` blob-silhouette is the DISTINCT blob-slot register (the fence is binding both ways — neither forks the other; recorded in the docstring).
- **Warm-not-grey** (BA.W-NO-GRAY, `proof:no-gray` stays GREEN): the dashed hairline is the warm-ink at 22%, NEVER a grey `border-border` — the ghost must read warm-material, not grey.
- **Semantic radii byte-untouched** (`theme/radius.css`): this is consumption-consistency, not a radius retune; `--radius-card`/`--radius-panel`/etc. values stay.
- **Coordinate, don't collide** — BC.W-PADDING-CANON owns empty-states' hand-rolled pad retire (this owns the ghost framing); BC.W-SEPARATOR-FIX owns the separator page re-author (this verifies the rounded result); BC.W-CONFIG-RIGHT owns the aurora configurator placement (this owns its corner); BC.W-COMPOSITIONS-HERO owns intro's hero (this owns the tile corners). Disjoint edits.
- **The ghost-slot is GLASS-adjacent, not opaque** — its faint glass-wash host reads through (the rebuilt W55 material), never a flat grey `bg-card` slab (the D1 regression cannot re-enter through the ghost plate).

## Folds (deferrals discharged)
- route-census ghost/rounded witnesses (`/foundations/radii`, `/compositions/empty-states`, the 6 dashed forks) — **BUILT here:** the ONE `.ghost-slot` register + the rounded-everywhere sweep. DECIDED.
- `WatercolorDot variant="ghost"` (BA.W-EMISSION's blob-silhouette ghost) — **DECIDED-fenced:** it is the DISTINCT blob-slot register, NOT folded into `.ghost-slot`; the fence recorded. No re-fork.
- USER-DEFECTS §C/§E/§G "items not rounded" (the home/aurora-config/separator witnesses) — **DECIDED-rounded:** each routed onto a semantic radius, the square corners gone. The cross-wave coordination (CONFIG-RIGHT/SEPARATOR-FIX/COMPOSITIONS-HERO own their surfaces; this owns the corner verdict) is recorded.
- No prior-tranche `deferral/*.md` book names a ghost-dashed register (this is a fresh BC live-walk ask); the closest is the BA.W-CONFIG-CHASSIS section-rounding-at-the-clip idiom — **CONSUMED here** (the aurora configurator clip rounding applies it).
