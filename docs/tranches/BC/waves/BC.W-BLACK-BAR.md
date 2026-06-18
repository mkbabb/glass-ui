# BC.W-BLACK-BAR — the card/dock top-edge dark rim → a bright catch-light (the D2 root)

- **Band:** 1 · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** FIRST of Band 1 (the single highest-value token fix; `BC.W-GLASS-IDENTITY`, `BC.W-DIALOG-GLASS`, `BC.W-BUTTON-GLASS-IOS`, `BC.W-DOCK-ENGINE` all read the corrected rim — author/build this before them)
- **Owns / closes:**
  - USER-DEFECTS §A "A 'black bar' anomaly recurs (the dark rim / card-top bar)."
  - USER-DEFECTS §C "A 'wtf is this black bar' at the top of cards/pages."
  - DEFECT-LEDGER **D2** "'wtf is this black bar' at the top of cards/pages — the card border-top is a dark warm-ink rim `oklab(0.216 0.0035 0.0052 / 0.11-0.13)` reading as a hairline over light glass."
  - ORCHESTRATION §1 Band 1 box: `BC.W-BLACK-BAR — the card border-top dark-rim → catch-light (D2 root)`.

## Goal (the gestalt)
Open any card, dialog, or dock on `:5199` and the top edge reads as a **bright glassy catch-light** — a thin sliver of concentrated light along the upper rim, exactly the way a real pane of liquid glass catches the light from above — never a dark line painted across the top. The *bottom* of the surface carries a faint warm under-shadow so the plate reads as a physical object lifted off the page (light rims the top, shadow grounds the bottom — the iOS-27 thickness physics). The silhouette is still carved (you can see where the glass ends), but it is carved by a *highlight*, not by a smudge of near-black ink. The "wtf is this black bar" simply vanishes from every surface at once, because every surface reads its rim from the same corrected token source.

## Starting state (measured, file:line)
The dark bar is ONE root: every per-rung glass border is authored as warm-ink-over-transparent, and `--foreground` is the near-black warm ink (oklab L 0.216). Over a near-white cream plate the *full-perimeter* hairline reads dark, worst at the top where the white catch-light ring sits just inside it (a bright rim and a dark border at war on the same edge).

- `src/styles/tokens/glass.css:191-196` — the per-rung borders, all `color-mix(in srgb, var(--foreground) N%, transparent)`:
  ```css
  --glass-border-wash:     color-mix(in srgb, var(--foreground) 11%, transparent);
  --glass-border-quiet:    color-mix(in srgb, var(--foreground) 13%, transparent);
  --glass-border-resting:  color-mix(in srgb, var(--foreground) 16%, transparent);
  --glass-border-floating: color-mix(in srgb, var(--foreground) 19%, transparent);
  --glass-border-overlay:  color-mix(in srgb, var(--foreground) 22%, transparent);
  --glass-border-dock:     color-mix(in srgb, var(--foreground) 14%, transparent);
  ```
- `--foreground = hsl(24 10% 10%)` → **oklab L 0.216** (the near-black warm ink). So `--glass-border-resting` resolves **live-probed** at `/display/card` (2026-06-18) to `border-top-color = oklab(0.216 0.0035 0.0052 / 0.16)` — a dark hairline (glass-dock-codebase.md §1.2).
- The rim RING is already the CORRECT light catch-light: `src/styles/glass/rim.css:73` `--glass-rim-ink: hsl(0 0% 100% / 0.18)` → `--glass-material-rim: inset 0 0 0 0.75px ...` (white, 18% α). Live-probed the card box-shadow carries `oklab(0.999 ... / 0.18) 0 0 0 0.75px inset` (the white rim) **AND** the dark `border-top` (glass-dock-codebase.md §1.2). The two are at war on the same edge — the contrast of dark-border-over-white-rim IS the visible bar.
- The dock recurs from the SAME source: `src/styles/dock/shell.css:150` `border: 1.5px solid var(--glass-border-dock, var(--glass-border-resting))` → live `borderColor = srgb(0.11 0.098 0.09 / 0.14)` (glass-dock-codebase.md §2.6). One fix at the token source fixes cards AND docks.
- The dialog recurs at the floating rung: live `borderColor = oklab(0.216 ... / 0.19)` — even darker than the card (glass-dock-codebase.md §1.5).
- The edge-light token already exists and is correct: `src/styles/tokens/glass-fx.css:56` `--glass-edge-light: inset 0 0 0 0.75px hsl(0 0% 100% / 0.18)` (light), `:63` `--glass-edge-light-dark: ... 0.22` (dark).
- The SOTA model (apple-ios27.md §1.6, §1.3): the iOS-27 rim is a LIGHT catch-light on the TOP + a subtle under-shadow on the BOTTOM, never a dark full-perimeter ink hairline. The kevinbism CSS floor uses `border: 1px solid rgba(255,255,255,0.8)` (a BRIGHT rim) + `inset 0 4px 20px rgba(255,255,255,0.3)` (inset white top highlight) — "the recurring rim motif: a bright white inset highlight on the TOP edge, NOT a dark hairline. This is the D2 root."

## Target spec (grounded)
The fix is **directional, token-first, and at ONE source** (`tokens/glass.css:191-196` + the rim composite in `rim.css`). Pin the geometry to a two-stop box-shadow pair that carries the glass-thickness physics: **bright catch-light TOP, faint warm under-shadow BOTTOM**, plus a near-invisible perimeter hairline so the silhouette still carves.

Approach (apple-ios27.md §1.6 option (b) — the SOTA directional rim; glass-dock-codebase.md §1.2 fix (b)):

1. **Retire the warm-ink top border.** Drop the load-bearing dark-rim role of `--glass-border-*`. The perimeter `border:` keeps only a **near-invisible** warm hairline (cut the alpha so it can never read as a bar): re-author each rung at **≤4% α** (the apple-ios27.md §5 bake-table target "top ≤4%"). The warm hue stays `--foreground` (the warm-not-tinted identity, BA.W-NO-GRAY); only the *presence* drops below the read-threshold. This perimeter carve is the whisper that defines the edge; it is no longer the silhouette device.
   - `--glass-border-wash: color-mix(in srgb, var(--foreground) 4%, transparent);`
   - `--glass-border-quiet: ... 4%`  ·  `--glass-border-resting: ... 4%`  ·  `--glass-border-floating: ... 5%`  ·  `--glass-border-overlay: ... 5%`  ·  `--glass-border-dock: ... 4%`
   - (The monotone +1% on the two heaviest rungs preserves a faint tier-presence ordering without crossing the read-threshold; numbers are the apple-ios27.md §5 "top ≤4%" target, bounded at +1% headroom for the overlay/floating rungs.)

2. **Mint the directional rim register** in `tokens/glass-fx.css` beside `--glass-edge-light` (the catch-light is the top, the under-shadow is the bottom — the real glass-thickness physics):
   - `--glass-rim-top: inset 0 1px 0 hsl(0 0% 100% / 0.30);` — the **bright catch-light** on the top edge (the kevinbism `inset 0 1px white` motif; 30% α is the apple-ios27.md §1.3 community value `rgba(255,255,255,0.3)`).
   - `--glass-rim-bottom: inset 0 -1px 0 color-mix(in srgb, var(--foreground) 6%, transparent);` — the **faint warm under-shadow** grounding the plate (the warm-ink that used to ring the whole perimeter, now only the bottom, at a whisper 6%).
   - The dark arm (`tokens/dark-arm.css`) lifts the top catch-light to **0.40** (mirroring the existing `--glass-edge-light-dark` 0.22 → the dark plate needs a brighter rim to read; dark glass "glows where light passes", dark-arm.css:221) and keeps the bottom under-shadow at 6% (the shadow grounds in both modes).

3. **Compose the directional rim onto the material atom** (`src/styles/glass/rim.css` — the `--glass-material-rim` site). The current `--glass-material-rim` is the omnidirectional white ring; replace its role with the directional pair, keeping the existing accent-compose seam (`--glass-accent` mixes onto the top catch-light ink, BB.W-GLASS-ACCENT — the no-op floor at 0% strength holds byte-identical). The composite box-shadow on a glass surface becomes:
   ```
   box-shadow: var(--glass-rim-top), var(--glass-rim-bottom), <outer depth shadow>;
   ```
   so the SAME surfaces that read `--glass-edge-light` today (the `.glass-material` / ladder rungs / Card / dock-icon-button cohort enumerated rim.css:60-90) inherit the directional rim with ZERO per-surface edit (the substitution-over-redeclaration discipline).

4. **The dock + dialog inherit by construction** — `shell.css:150` reads `--glass-border-dock` (now ≤4%) and `box-shadow: var(--glass-edge-light), ...` (shell.css:154) re-points to the directional pair; the dialog floating rung reads the corrected `--glass-border-floating` + the rim pair. No per-surface edit (glass-dock-codebase.md §2.6: "Fixed by the §1.2 rim→catch-light fix at the token source").

This is the gestalt transposition (not a patch): the rim STOPS being a dark perimeter ink and BECOMES the iOS-27 light-on-top / shadow-on-bottom thickness model, expressed once at the token source, inherited everywhere.

## Mechanism / files
- **Edit `src/styles/tokens/glass.css:191-196`** — re-author the six `--glass-border-*` rungs to ≤4-5% α (clean break, no alias; the old 11-22% values are deleted, not aliased).
- **Edit `src/styles/tokens/glass-fx.css`** (beside `--glass-edge-light:56`) — mint `--glass-rim-top` + `--glass-rim-bottom` (light arm).
- **Edit `src/styles/tokens/dark-arm.css`** (beside the `--glass-edge-light: var(--glass-edge-light-dark):339` re-point) — the dark arm of `--glass-rim-top` (0.40) + `--glass-rim-bottom` (6%). Plain per-mode pair idiom (MEMORY: light-dark() inset-shadow trap — inset fragments inside `light-dark()` compute the whole box-shadow to `none`; per-mode arms ONLY).
- **Edit `src/styles/glass/rim.css:73-90`** — compose `--glass-material-rim` from the directional pair (keep the `--glass-accent` accent-compose onto the top ink; the 0% no-op floor stays byte-identical).
- **Edit `src/styles/dock/shell.css:154`** — re-point the dock `box-shadow` edge-light leg to the directional pair (the border:150 already reads the corrected token).
- The ONE source: the rim register lives at `tokens/glass-fx.css` (mint) + `tokens/glass.css` (the perimeter alpha cut). Every consumer reads through `--glass-material-rim` / `--glass-edge-light` (no per-surface paint).

## Acceptance (gestalt + measured + gate)
1. **CAPTURED-PAINT gestalt criterion (dev-tools MCP):** a before/after composited screenshot of `/display/card`, `/containers/dialog`, `/dock/overview`, BOTH modes, at ≥2 viewports. A human reads: the top edge is a bright glassy sliver, NOT a dark bar; the bottom carries a faint shadow lift; no surface shows the "black bar." The capture lands at `docs/tranches/BC/audit/visual/W-BLACK-BAR-DELTA.md` (Live-verify = captured delta via the dev-tools MCP, never a commit claim).
2. **Machine gate `proof:black-bar`** (born-RED on HEAD → GREEN at the fix; device-free SOURCE arm `["local","ci","release"]`):
   - **B1 — perimeter alpha bounded.** Every `--glass-border-*` rung in `tokens/glass.css` resolves a `color-mix(... var(--foreground) N%, transparent)` with **N ≤ 5** (born-RED on the 11-22% HEAD values). The synthetic self-test bite: a planted `--glass-border-resting: ... 16%` reds.
   - **B2 — the directional rim minted + load-bearing.** `--glass-rim-top` (a `hsl(0 0% 100% / ...)`-bearing top inset) AND `--glass-rim-bottom` (a `--foreground`-bearing bottom inset) exist in `glass-fx.css`, AND `--glass-material-rim` (rim.css) composes BOTH (the top catch-light + the bottom under-shadow). Born-RED: HEAD has only the omnidirectional `--glass-edge-light`.
   - **B3 — no dark full-perimeter ink survives.** No glass-surface rule writes `border-*-color` or a load-bearing `box-shadow` reading `--foreground` at >5% α on the TOP edge (the anti-evasion respell bite — a re-pasted `inset 0 1px 0 color-mix(in srgb, var(--foreground) 16%, ...)` on a top inset reds; the bottom under-shadow at ≤6% is the sanctioned exception, scoped to the `0 -1px` bottom inset).
   - **B4 — dark-arm pair present + plain per-mode (no light-dark()).** `dark-arm.css` re-declares `--glass-rim-top`/`--glass-rim-bottom` as plain values (the gate flags a `light-dark()` wrapping an inset fragment — the MEMORY trap), top α ≥ 0.30.
   - **B5 — the dock + dialog read the corrected source.** `shell.css` `--glass-border-dock` reference resolves ≤4%, and the dock box-shadow reads the directional pair (not a dock-local dark rim re-paste).
   - **+ a self-test bite per clause** (a planted dark-top-rim, a missing bottom under-shadow, a light-dark()-wrapped inset, a >5% perimeter alpha — each MUST flag).
3. **π readback `tests-visual/black-bar.spec.ts`** (both modes + WebKit, LOCAL real-render — rides `BC.W-PAINT-GATE` / the gestalt close):
   - getComputedStyle on `/display/card`, `/containers/dialog`, `/dock/overview`: the resolved `border-top-color` α **< 0.06** (the bar is gone) AND the surface box-shadow carries a TOP inset with oklab-L **> 0.90** (the bright catch-light is present) AND a BOTTOM inset with oklab-L **< 0.40** (the under-shadow grounds it) — born-RED on HEAD's `oklab(0.216 / 0.16)` top border.
   - A **per-edge luminance scan** of the captured card crop: the top 4px band reads BRIGHTER than the interior (catch-light), the interior is uniform (no dark line crossing the top), both modes.
   - Safari/WebKit: the directional rim is a plain `box-shadow` (cross-engine — no `backdrop-filter: url()`), so the catch-light MUST paint identically on WebKit (apple-ios27.md §6: the legibility/rim lives on the cross-engine base, not the Chrome-only filter).

## Fences / invariants (must NOT regress)
- **Clean break, no alias** (MEMORY: no backwards compat): the old 11-22% `--glass-border-*` values are DELETED; no `--glass-border-*-legacy` alias. Every consumer re-resolves through the corrected token.
- **The warm-not-tinted identity holds** (BA.W-NO-GRAY): the rim ink stays `--foreground`-derived (warm), never a cool/grey rim; the perimeter hairline + the bottom under-shadow keep the warm hue, only the *alpha* drops. The `--surface-tint-*` in-srgb family is UNTOUCHED (AW.W26 fence).
- **The white rim RING was already correct** (rim.css `--glass-rim-ink` 0.18) — it is SUBSUMED into `--glass-rim-top` (the top catch-light), not removed. The accent-compose seam (`--glass-accent` onto the rim, BB.W-GLASS-ACCENT) survives byte-identical at 0% strength.
- **Light-dark() inset-shadow trap** (MEMORY): the directional rim is plain per-mode arms; NEVER an inset fragment inside `light-dark()` (which computes the whole box-shadow to `none`).
- **Presets-in-consumers:** the library default rim IS its identity; a consumer retints the rim by overriding `--glass-rim-top`/`--glass-rim-bottom` on `:root` (the override-on-the-cascade idiom, the `--shadow-cartoon-*` precedent). No consumer hue enters a library token.
- **Byte-fenced (not touched):** the GL shaders (`aurora.frag`/`metaball.frag`), the `--glass-level` opacity/blur recipe (AX.W54), the `--glass-tint-*` legibility axis (W55 — that is `BC.W-ADAPTIVE-RECONCILE`'s scope; this wave touches ONLY the rim/border, the disjoint axis). The W-GLASS-CAL blur radii are untouched.

## Folds (deferrals discharged)
- **`az-glass-border-dock-rim` / the D2 rim lineage** (research/deferral/az.md §97 — "the compounding rim defect rode the same lineage: `--glass-border-dock: color-mix(in srgb, var(--foreground) 14%, transparent)` resolves to near-black ... = the user's BC D2 'black bar at the top of cards'; BA's dark-arm edge α 0.10→0.22 worsened it"). **DECIDED — BUILD/RETIRE:** the uniform warm-ink rim is RETIRED at the token source; the directional catch-light/under-shadow replaces it. The chronic that rode AZ→BA→BB ends here.
- The directional rim is the SOTA-correct expression apple-ios27.md §1.6 names; this wave closes the gap row "rim BORDER: warm-ink 11-19% uniform → top ≤4% / bright catch-light top, faint shadow bottom — **D2 fix**" (apple-ios27.md §1.4 table). DECIDED, no re-book.
