# BA.W-FEEDBACK-TONE — tone rides ON glass, the three feedback tone maps collapse onto ONE tinted-glass recipe

**Name**: W-FEEDBACK-TONE - the tinted-glass tone register minted once, consumed by Toast + Notification + Alert
**Opens after**: Batch 3 (W-DOCK-SECTIONS → W-DOCK-MORPH-INSITU). Runs ‖ W-SURFACE-AXIS ‖ W-MENU-GLASS ‖ W-GLASS-CAL ‖ W-PROGRESS-GRADIENT (Batch 4 — component-family-disjoint bounds per EXECUTION-DAG §5).
**Agents**: 2 parallel
**Hard gate**: `proof:glass-cohesion` extended (born-RED on the tone-clobber arm) — the cohesion gate gains variant-arm/state-class-map teeth + a render-side π final-alpha assert that every tone variant composites translucent (α < ~0.92) over a busy backdrop; plus the `proof:ba-gestalt` feedback-band verdict (BA inv-4).
**Status**: SPEC

## Goal criterion

Every feedback tone — Toast, Notification, Alert — reads as COLORED GLASS, not a saturated opaque slab: ONE tinted-glass tone recipe (`color-mix(in oklab, <glass rung bg>, var(--tone) N%)` over the floating/wash rung, the tone carried additionally on border + glyph) minted in ONE place and consumed by all three surfaces, the three independent tone maps gone. A user opening `/feedback/toast`, `/feedback/notification`, and `/feedback/alert` over a real backdrop in BOTH modes sees the tone READ across the surface as colored glass while the backdrop still shows through — the R8-12/R8-13 "not glassy at all" slabs replaced by the iOS/Material tinted-glass register.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the fleet's root-caused tone-clobber mechanism, not a blind re-diagnose (BA invariant 3 — re-opened ≠ rebuilt-blind). Before touching a byte, the impl agents re-grep each anchor below at HEAD and confirm each mechanism still holds; if a cite has drifted, the agent records the drift in PROGRESS and re-locates the mechanism — it does NOT re-invent the diagnosis. The dark floating-rung near-opacity (toast-glass F-2) is OWNED BY W-DARK-MATERIAL (Batch 1, already landed) — this wave reads the re-tuned dark rung, does not re-derive it (coordination, see Dependencies).

Grounding findings: **toast-glass F-1** (S1 — the Toast variant map paints a solid opaque token plate), **toast-glass F-3** (S1 — the Notification per-type map is an off-model parallel slab path), **toast-glass F-4** (S3 — the destructive token is the lone hsl/legacy tone; tones aren't a unified ramp), **GVC-1** (the Toast tone-clobber, glass-variant-census matrix row), **GVC-2** (the Notification tone-clobber row), **GVC-4** (the gate is definition-level — no variant-arm bite), **FD-FEEDBACK-TONE** (the design verdict: tone as a thin rim only, no tinted body — alert/toast/notification owed ONE tinted-glass seam), **FD-NOTIF-OFFMODEL** (the demo's raw-Tailwind swatch path teaches a wrong tone vocabulary). The correct model the wave converges on: **Alert** (`alert/index.ts:19-33` — every tone keeps the glass-wash plate and rides the tone on border/glyph/description, never an opaque fill; glass-variant-census names it "THE CORRECT MODEL").

Captures (the RED evidence): `audit/ground/R8-12-toasts-not-glassy.png` (the dark opaque toast pair), `audit/ground/R8-13-not-glassy-b.png` (the flat green Notification), `audit/fleet/toast-glass-tone-slabs-dark.png` (the Destructive trigger as a solid red slab), `audit/fleet/fd-feedback-alert-dark.png` (the alert tone-as-outline-only flat plate).

The mechanical root causes (each independently confirmed at HEAD this authoring):

1. **The Toast variant map overwrites the glass base with a 100%-opaque token plate (F-1/GVC-1).** `Toast.vue:55` composes the `glass-floating` overlay tier (the floating rung — correct), but the variant map at `Toast.vue:57-62` then layers a SOLID token background ON TOP: `bg-destructive text-destructive-foreground border-destructive` / `bg-success …` / `bg-warning …` / `bg-info …`. `--success`/`--warning`/`--info` are complete fully-OPAQUE `oklch()` colors (`tokens/color-radius.css:246-248`, dark arm `tokens/dark-arm.css:108-110`); `--destructive` is the lone `rgb()`/`hsl()` legacy tone. The π readback proves the override is total — `success` resolves `oklch(0.805 0.186 151.6)` (no alpha), `destructive` resolves `rgb(235,71,71)` (no alpha); the `backdrop-filter: blur(16px)` track is still attached but INERT (nothing behind a 100%-opaque plate to blur). This is the direct cause of R8-12 (the opaque dark toasts) and R8-13b (the flat green slab).

2. **The Notification per-type map is a SEPARATE hand-rolled slab path (F-3/GVC-2).** `Notification.vue:10` composes `glass-floating`; `Notification.vue:57-62` (`notificationClasses`) then paints `bg-success/90` / `bg-destructive/90` / `bg-warning/90` / `bg-info/90` over it. The `/90` knocks the token to 90% — STILL a flat tone slab (π: `notif_success` → `oklab(0.805 … / 0.9)`, above the ~0.92 translucency floor). The Notification has NO `variant`/`tone` type contract that routes through the glass model — it is a standalone `<div>`-list with a baked tone map, the second of three independent tone maps.

3. **The demo notification preview teaches an off-token tone vocabulary (FD-NOTIF-OFFMODEL).** `demo/stories/feedback/notification.vue:47-53` hand-rolls a raw-Tailwind `swatch` map (`bg-blue-500` / `bg-emerald-500` / `bg-amber-500` / `bg-red-500`) — NOT the house `--info`/`--success`/`--warning`/`--error` tokens — inside a flat `bg-card/60 border` table (`notification.vue:78`). The demo TEACHES a wrong, off-token tone vocabulary; this is the THIRD tone map (Toast variant · Notification type · demo swatch) the wave collapses.

4. **The cohesion gate has a tone-shaped hole (GVC-4).** `proof:glass-cohesion` IS inventory-complete and DOES enumerate Toast + Notification (both match the `GLASS_MARKER` via `glass-floating`), but its forbidden-set has no tone-arm bite: (a) `RAW_OPAQUE_SURFACE` (`proof-glass-cohesion.mjs:72-73`) matches only `background: var(--background|--card)` rule bodies — the NEUTRAL plates — never the `bg-<tone>` Tailwind utilities (which compile to `background-color: var(--success)` etc.); (b) the gate EXPLICITLY exempts Tailwind class-variant escapes (`:70-71`) — written for legitimate translucent `bg-card/40` escapes, but the OPAQUE tone slipped through the same door; (c) the Notification arm (`:239-250`) checks only tier + shadow, never the per-type tone plate's translucency; (d) NO final-composited-alpha assertion exists at all. A glass-routed base + an opaque tone overlay passes every check.

RE-GROUND command set (run all; confirm each mechanism):

```
sed -n '55,65p'  src/components/ui/toast/Toast.vue                 # the variant tone map (F-1)
sed -n '57,62p'  src/components/ui/notification/Notification.vue   # notificationClasses slab map (F-3)
sed -n '13,34p'  src/components/ui/alert/index.ts                  # the CORRECT MODEL (tone on border/glyph)
sed -n '47,53p'  demo/stories/feedback/notification.vue            # the raw-Tailwind swatch map (off-model)
sed -n '70,73p'  scripts/proof-glass-cohesion.mjs                  # the class-variant-escape exemption hole
sed -n '239,250p' scripts/proof-glass-cohesion.mjs                # the Notification tier/shadow-only arm
grep -n 'success\|warning\|info' src/styles/tokens/dark-arm.css    # the tone tokens are alpha-free (dark arm)
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | F-1 / GVC-1 [S1] | `src/components/ui/toast/Toast.vue:57-62` | variant map layers `bg-{destructive,success,warning,info}` solid opaque token plates over the `glass-floating` base — the blur track survives but is inert |
| 2 | F-3 / GVC-2 [S1] | `src/components/ui/notification/Notification.vue:57-62` (`notificationClasses`) | the `bg-<tone>/90` per-type map is a SECOND hand-rolled opaque-ish slab path off the Toast seam; no `variant`/`tone` contract |
| 3 | FD-NOTIF-OFFMODEL [S2] | `demo/stories/feedback/notification.vue:47-53` (the `swatch` map) + `:78` (`bg-card/60` table) | the demo preview uses raw `bg-emerald-500`/`bg-amber-500`/`bg-blue-500`/`bg-red-500`, not the house `--{success,warning,info,error}` tokens — teaches an off-token tone vocabulary |
| 4 | F-4 [S3] | `src/styles/tokens/color-radius.css:246-248`; `src/styles/tokens/dark-arm.css:108-110` | the tones are declared in two places with mixed spaces (`destructive` hsl/rgb · success/warning/info oklch), consumed as raw solid plates — no single feedback-tone glass-tint knob (the substitution-vs-re-declaration anti-pattern) |
| 5 | GVC-4 [gate blind-spot] | `scripts/proof-glass-cohesion.mjs:70-73` (the class-variant exemption + neutral-only `RAW_OPAQUE_SURFACE`), `:239-250` (the Notification tier/shadow-only arm) | the gate is DEFINITION-LEVEL — it verifies the BASE routes through a glass tier but never detects a variant ARM clobbering it, and asserts no final-composited-alpha |
| 6 | the correct model (convergence target) | `src/components/ui/alert/index.ts:19-33` | every Alert tone keeps `bg-(--glass-bg-wash) [backdrop-filter:var(--glass-blur-wash)]` and rides the tone on `border-<tone>/40` + `[&>svg]:text-<tone>` — glass plate preserved, tone semantic on rim+glyph+description |

## Scope

1. **Mint the ONE shared tinted-glass tone recipe.** Add a `--feedback-tone-*` token family + a `.feedback-tone-<name>` register (or a single parametric `@utility feedback-tone` keyed off a `--tone` var) to a feedback-tone partial (`src/styles/feedback-tone.css`, created; imported into `src/styles/index.css` in cascade order). The recipe is `background: color-mix(in oklab, <glass rung bg>, var(--tone) var(--feedback-tone-strength))` over the floating rung (the Toast/Notification register) PLUS a tone-keyed `border-color` + the glyph `color: var(--tone)` — the EXACT seam the `--glass-tint-source`/`--glass-tint-strength` legibility lift and `--veil-bg` mix already run (cards.css:84), ZERO new compositing path. ONE bounded `--feedback-tone-strength` knob (≈12–22%, the bounded mix % from toast-glass §A) tints all four tones at once; the four tone hues map to `--success`/`--warning`/`--info`/`--destructive` (the house tokens, NOT new colors — presets-in-consumers). The result reads as a COLORED GLASS, not a colored slab — the one-color-event idiom (AZ.W-SUFFUSE) applied: ONE tone event per surface (tinted glass wash + full-chroma glyph + tinted rim), never a full-bleed fill.

2. **Toast consumes the recipe; the variant tone map dies.** `Toast.vue:57-62`'s `bg-<tone> text-<tone>-foreground border-<tone>` solid-plate map is DELETED (clean break, no alias — BA inv-7). The `:data-variant="variant"` attr (already on the root, `Toast.vue:47`) drives the `.feedback-tone-<name>` register (or the variant resolves the `--tone` var consumed by the parametric utility). The `glass-floating` base + the tone-as-tint compose; the body text stays `--foreground`/`--card-foreground` for legibility (the Alert discipline — body never tone-tinted), the tone carries on the glyph + tinted rim. The `default` variant is unchanged (the un-toned floating glass).

3. **Notification gains the tone contract on the SAME seam; the parallel slab map dies.** `Notification.vue:57-62`'s `notificationClasses` `bg-<tone>/90` map is DELETED. The Notification `type` (`success`/`error`/`warning`/`info`) maps to the SAME `.feedback-tone-<name>` register Toast consumes (`error` → the destructive tone) — one source, the three-maps-into-one collapse (toast-glass §B; substitution-over-re-declaration). The glass-floating base + the tinted-glass tone compose; the glyph + rim carry the semantic. The `text-<tone>-foreground` colors retire onto the body-ink-stays-legible discipline.

4. **Alert reconciles onto the SAME tone token family (it is already correct in SHAPE).** Alert is the convergence model and stays on `glass-wash` + tone-on-rim/glyph — but it currently hardcodes `border-<tone>/40` per-variant (`alert/index.ts:29-33`). Re-point Alert's tone-on-rim to read the SAME `--feedback-tone-*` token family the shared recipe mints (so a tone calibration is ONE edit, not 3+ — F-4's "no single knob" fixed). Alert's wash rung is RETAINED (a content panel rides wash, not floating — the register difference is correct); only the tone SOURCE unifies, not the rung.

5. **The demo notification swatches re-point to house tokens.** `demo/stories/feedback/notification.vue:47-53`'s raw-Tailwind `swatch` map (`bg-emerald-500` etc.) re-points to the house `--success`/`--warning`/`--info`/`--destructive` tokens (or consumes the `.feedback-tone-*` chip register), so the demo TEACHES the house tone vocabulary, not an off-token one (FD-NOTIF-OFFMODEL). The flat `bg-card/60` table plate is a SEPARATE X-2 hand-rolled-plate concern owned by W-STAGE/W-DEMO-AFFORDANCES (Batch 6) — this wave touches ONLY the swatch colors, not the table chassis (coordination note, see File Bounds).

6. **Close the gate hole — extend `proof:glass-cohesion` with variant-arm teeth + a render-side final-alpha assert.** (a) Add a SOURCE arm that scans the Toast variant map + the Notification type map (and any future feedback tone-class map) and FAILS on an opaque `bg-<tone>` / `bg-<tone>/N` (N≥90) utility on a `glass-floating`/`glass-wash` base — the class-variant exemption (`:70-71`) is narrowed so an OPAQUE tone class no longer rides through the legitimate-translucent door. (b) Add the render-side π arm (extend `tests-visual/glass-cohesion.spec.ts`) that constructs every Toast variant AND every Notification type over a busy backdrop and asserts the FINAL composited `background-color` is translucent (α < ~0.92) — the toast-glass §E final-composited-alpha teeth. Born-RED on the pre-fix tree (the opaque tone slabs red both arms).

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if the shared tinted-glass tone recipe cannot be minted on the EXISTING `--glass-tint`/`color-mix` seam without forking a NEW compositing path (a parallel tone-blur recipe off the ladder) — that is a scope-reveal; triumvirate (research the seam reuse + plan-augment the bound + redress), do NOT fork a second axis. The toast-glass lane is explicit: "zero new compositing path."
- **W-SURFACE-AXIS coordination scope-reveal**: W-SURFACE-AXIS (Batch 4, parallel) mints the shared `surface` decoration axis (glass·veil·opaque). This wave's tone tint rides ON the glass surface arm — if W-SURFACE-AXIS's mixin shape BLOCKS the tone consumer (the tone tint cannot compose with the surface mixin without a fork), that is the declared seam scope-reveal (EXECUTION-DAG §5) → triumvirate, NOT a license to fork a tone axis. If concurrent and the mixin is not yet landed, the tone recipe consumes the `--glass-bg-*` rung tokens DIRECTLY (the same tokens the surface mixin will route) so adoption is a re-point, not a rewrite.
- **Hard-gate failures not local-edit-recoverable**: if the π final-alpha readback shows a tone variant STILL composites opaque after the recipe lands (a cascade-win the `bg-<tone>` deletion did not remove, or the `color-mix` resolving to an opaque result at the chosen strength) — that is a register-design miss; triumvirate, do not loop on the strength value.
- **Diagnostic loop halt**: if the gestalt feedback-band verdict (BA inv-4) FAILS on the third capture iteration (the tone reads as glass per-mechanism but the BAND still reads wrong as a page), halt and triumvirate — the X-1 void-backdrop staging (owned by W-STAGE, Batch 6) may be the true blocker, not the tone recipe, and the verdict cannot be greened by tone edits alone.

## File Bounds

| File | Access |
|---|---|
| `src/styles/feedback-tone.css` | create (the shared tinted-glass tone recipe — the `--feedback-tone-*` family + the `.feedback-tone-<name>` register / parametric utility) |
| `src/styles/index.css` | modify-carve (one `@import "./feedback-tone.css"` line in cascade order) |
| `src/components/ui/toast/Toast.vue` | modify (delete the `bg-<tone>` variant map :57-62; consume the tinted-glass register via `:data-variant`) |
| `src/components/ui/notification/Notification.vue` | modify (delete `notificationClasses` :57-62; map `type` onto the shared register; gain the tone contract) |
| `src/components/ui/alert/index.ts` | modify (re-point the per-variant `border-<tone>/40` rim onto the shared `--feedback-tone-*` token family; wash rung retained) |
| `demo/stories/feedback/notification.vue` | modify-carve (the `swatch` map :47-53 → house tone tokens ONLY; NOT the table chassis) |
| `scripts/proof-glass-cohesion.mjs` | modify (add the variant-arm tone-clobber source arm; narrow the class-variant exemption to translucent-only) |
| `tests-visual/glass-cohesion.spec.ts` | modify (add the render-side final-alpha π assert over a busy backdrop for every Toast variant + Notification type) |
| `package.json` | modify (only if a new gate key is split out; the recommendation is to EXTEND `proof:glass-cohesion` in place — no new key) |
| `CLAUDE.md` | modify (record the tinted-glass tone register in the feedback-band section + the cohesion-gate teeth extension) |

**Do NOT touch:**
- `demo/stories/feedback/notification.vue`'s flat `bg-card/60` TABLE chassis (`:78`) — the X-2 hand-rolled-plate retirement is owned by **W-STAGE / W-DEMO-AFFORDANCES** (Batch 6); this wave touches the swatch COLORS only.
- The dark floating-rung α/blur recipe (`src/styles/glass/ladder.css`, `src/styles/tokens/dark-arm.css` glass-rung tuning) — the dark near-opacity (F-2) and the dark elevation ladder are **W-DARK-MATERIAL** (Batch 1, already landed); this wave READS the re-tuned rung, never re-tunes it.
- The shared `surface` decoration mixin/prop file — **W-SURFACE-AXIS** (Batch 4, parallel) is the sole writer; this wave CONSUMES the glass surface arm, never edits the mixin (EXECUTION-DAG §5 declared seam).
- The `menuItemVariants` CVA + dropdown/context-menu styles — **W-MENU-GLASS** (Batch 4, parallel).
- The glass blur primitives + `btn.css` + `toggle-chip` + the disco retirement — **W-GLASS-CAL** (Batch 4, parallel).
- `progress/*` — **W-PROGRESS-GRADIENT** (Batch 4, parallel).
- The standing fences: the GL shader internals (aurora.frag / metaball.frag — fence-locked except W-GOO-REDRESS's named seam); ppmycota purple (never enters library tokens — the tone family is the house `--success`/`--warning`/`--info`/`--destructive`, not the demo violet); the slides repo `docs/tranches/M/` (foreign — never edited).

### Disjointness

Two parallel agent units, NO shared `modify`/`modify-carve` path: unit `.1` (the component recompose) writes `feedback-tone.css` (create) + `index.css` + `Toast.vue` + `Notification.vue` + `alert/index.ts` + `demo/.../notification.vue`; unit `.2` (the gate teeth) writes `proof-glass-cohesion.mjs` + `glass-cohesion.spec.ts` + `package.json` (if split). `CLAUDE.md` is written by `.1` at integration (single-writer; `.2`'s gate-extension prose is handed to `.1` as a literal block per the AZ literal-markdown-block idiom). Across Batch 4: W-SURFACE-AXIS / W-MENU-GLASS / W-GLASS-CAL / W-PROGRESS-GRADIENT write component-family-disjoint bounds (EXECUTION-DAG §5) — none touch `toast/`, `notification/`, `alert/`, `feedback-tone.css`, or the cohesion gate. No two parallel waves write the same path.

## Agent Units

### BA.W-FEEDBACK-TONE.1 the tinted-glass tone register + the three-map collapse

- Goal: ONE shared tinted-glass tone recipe is minted and consumed by Toast, Notification, and Alert; the three independent tone maps are gone and every tone composites as colored glass.
- Mechanism: create `feedback-tone.css` (the `color-mix(in oklab, <glass rung bg>, var(--tone) var(--feedback-tone-strength))` recipe + tone-keyed rim/glyph, on the EXISTING tint seam — no new compositing path); import it in cascade order; delete the `Toast.vue:57-62` solid-plate variant map and the `Notification.vue:57-62` `notificationClasses` slab map, routing both through the shared register via `:data-variant`/`type`; re-point `alert/index.ts:29-33`'s per-variant rim onto the shared `--feedback-tone-*` token family (wash rung retained); re-point the demo `notification.vue:47-53` swatch colors to house tokens.
- Files: `src/styles/feedback-tone.css` (create), `src/styles/index.css`, `src/components/ui/toast/Toast.vue`, `src/components/ui/notification/Notification.vue`, `src/components/ui/alert/index.ts`, `demo/stories/feedback/notification.vue`, `CLAUDE.md`.
- Sub-gate: the gate's source + π tone arms (W1 + W2 below) — the Toast variant map and the Notification type map carry NO opaque `bg-<tone>` utility, all three surfaces reference the shared `--feedback-tone-*` family, AND the π readback measures every Toast variant + Notification type at α < ~0.92 over a busy backdrop.

### BA.W-FEEDBACK-TONE.2 the cohesion-gate variant-arm teeth

- Goal: `proof:glass-cohesion` reds on an opaque tone-class clobber the way it already reds on an opaque BASE, and the render-side π arm asserts the final composited alpha of every feedback tone.
- Mechanism: add a SOURCE arm to `proof-glass-cohesion.mjs` that scans the Toast variant map + Notification type map for an opaque `bg-<tone>`/`bg-<tone>/N` (N≥90) utility on a glass-routed base and FAILS on it; narrow the class-variant exemption (`:70-71`) so the escape covers translucent (`bg-card/40`-class) ONLY, not an opaque tone. Add the render-side π arm to `glass-cohesion.spec.ts` constructing every Toast variant + Notification type over a busy backdrop and asserting the final `background-color` resolves α < ~0.92. Both born-RED on the pre-fix tree.
- Files: `scripts/proof-glass-cohesion.mjs`, `tests-visual/glass-cohesion.spec.ts`, `package.json` (only if a key is split — recommend extend-in-place).
- Sub-gate: the gate's W3 witness — the source arm is born-RED at HEAD (the `bg-<tone>` opaque utilities red it) and GREEN at close; the π arm measures every tone α < ~0.92 (born-RED: the opaque slabs measure ≥0.9/no-alpha).

## Hard Gate

`proof:glass-cohesion` extended (born-RED at HEAD on the tone arms, driven GREEN by the wave) — the device-free SOURCE half (the comment-strip + pure-detector house pattern, mirroring the existing gate) + the render-side π half, each red at HEAD pre-wave:

1. **W1 — the tone is a tint, not a plate (SOURCE).** The Toast variant map and the Notification type map carry NO opaque `bg-<tone>` / `bg-<tone>/N` (N≥90) utility on the glass base; all four tones route through the shared `.feedback-tone-*`/`--feedback-tone-*` register, and all three surfaces (Toast, Notification, Alert) reference the SAME `--feedback-tone-*` token family (the three-map collapse, source-asserted). **Bite-tightening (anti-evasion)**: the assert is POSITIVE — the tone register's resolved `background` references the `color-mix(… <glass rung bg> …)` seam AND no surface re-declares a parallel `bg-<tone>` opaque map; it does NOT merely grep for the absence of one literal token (a `bg-success` renamed to a `bg-emerald-500` raw-Tailwind escape, or a `/95` near-opaque alpha, must STILL fail). RED at HEAD: `Toast.vue:57-62` + `Notification.vue:57-62` carry the opaque/`/90` maps.

2. **W2 — the final composited alpha is translucent (π).** A live capture constructs EVERY Toast variant (`default`/`success`/`warning`/`info`/`destructive`) AND every Notification type (`success`/`error`/`warning`/`info`) over a busy backdrop and reads the resolved `background-color`; each composites translucent (α < ~0.92 — the toast-glass §E floor), in BOTH modes. This is the binding visual truth — a glass-routed base + a (newly-introduced) opaque tone overlay must fail here. **Anti-evasion**: the π half is a POSITIVE final-alpha measure on the COMPILED color, NOT a source-class check — it catches the format evasion (`oklch()`/`rgb()` no-alpha serialization), the alpha-knob evasion (`/0.95` near-opaque still ≥0.92), and the raw-Tailwind-escape evasion (`bg-emerald-500` compiles to an opaque color). RED at HEAD: `success` → `oklch(0.805 0.186 151.6)` (no alpha), `destructive` → `rgb(235,71,71)` (no alpha), `notif_success` → `oklab(… / 0.9)` (≥0.92 fails).

3. **W3 — the gate has teeth (the gate self-test).** The extended `proof-glass-cohesion.mjs` source arm is born-RED on the pre-fix tree (the `bg-<tone>` opaque utilities red it) and GREEN at close; the narrowed class-variant exemption still GREENS a legitimate translucent `bg-card/40` escape (the exemption is narrowed, not removed — the synthetic-fixture self-test demonstrates the bite distinguishes opaque-tone from translucent-escape). The π arm's tone-variant exercise is added to `glass-cohesion.spec.ts` (the existing Drawer/Slider/Notification-DEFAULT π is preserved). RED at HEAD: `grep` for a tone-arm assert in `proof-glass-cohesion.mjs` returns 0; the spec exercises no tone variant.

4. **The `proof:ba-gestalt` feedback-band verdict (BA inv-4 — the GESTALT bar).** Per-mechanism greens do NOT close this visual wave. The feedback band (`/feedback/alert`, `/feedback/toast`, `/feedback/notification`) is captured WHOLE-PAGE, BOTH modes, over its real backdrop, judged as a gestalt ("does the tone read as colored glass on a page that looks right?") and recorded with the capture per the `proof:ba-gestalt` roster (minted at W-GESTALT-GATE, binding at W-REFLECT2). **The π + gestalt halves are the binding visual truth — if the source half passes but the live feedback band still shows a tinted-but-wrong or opaque-reading surface, the wave does NOT close** (the AZ source-green/visually-broken gap, the P-1 close-class, is exactly what this bar forbids). Captured to `docs/tranches/BA/audit/visual/W-FEEDBACK-TONE-DELTA.md` with before/after frames against the `ground/R8-12-toasts-not-glassy.png` + `ground/R8-13-not-glassy-b.png` baselines.

W1 + W3-source are the device-free CI half; W2 (π final-alpha) + W4 (gestalt) are the binding visual truth. All must hold for a clean close. (The dark floating-rung legibility floor that W2's dark capture rides is W-DARK-MATERIAL's deliverable — if the dark tone reads translucent-but-too-heavy, the verdict notes it as a W-DARK-MATERIAL coordination item, not a W-FEEDBACK-TONE miss.)

## Format And Lint Cadence

`npm run typecheck` after the Toast/Notification/Alert edits; `npm run build` to confirm `feedback-tone.css` compiles into the `/styles` bundle; `node scripts/proof-glass-cohesion.mjs` born-RED before the source edits (proof it fails at HEAD on the new tone arm), GREEN at close; `npm run proof:gate-script-parity` after any package.json change; the `glass-cohesion.spec.ts` π run on `:5199` both modes; `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-FEEDBACK-TONE-DELTA.md` — before/after `/feedback/{alert,toast,notification}` whole-page frames (both modes) + the paired π readback (every Toast variant + Notification type final-alpha) + the gestalt verdict per `proof:ba-gestalt`.
- The `proof:glass-cohesion` JSON artefact (born-RED log on the tone arm + GREEN-at-close log).
- The `glass-cohesion.spec.ts` π output (the tone-variant final-alpha table, both modes).

## Commit Plan

- impl commit: `fix(feedback): tinted-glass tone register — Toast/Notification/Alert collapse onto ONE color-mix recipe, the three tone maps die (BA.W-FEEDBACK-TONE)` — names the recipe + the three-map collapse in the body.
- gate commit: `test(glass): proof:glass-cohesion variant-arm tone teeth + π final-alpha assert (born-RED→GREEN)`.
- doc/status commit: the CLAUDE.md tinted-glass-tone record + the DELTA doc + PROGRESS row.

## Dependencies

- **Depends on**: W-DARK-MATERIAL (Batch 1, already landed) — the dark floating-rung α/blur the tone tint composites over is W-DARK-MATERIAL's re-tuned register; this wave READS it. If the dark rung were still the flat α-0.88 of the R8 state, the dark tone capture (W2) would read translucent-but-heavy — that floor is W-DARK-MATERIAL's, not this wave's (the F-2 ownership split). W-SURFACE-AXIS (Batch 4, parallel) mints the shared `surface` glass arm the tone tint rides on — consumed, not edited (declared seam, EXECUTION-DAG §5); if concurrent, the tone recipe reads the `--glass-bg-*` rung tokens directly so adoption is a re-point.
- **Blocks**: W-REFLECT2 (Batch 7) checks the feedback-band gestalt verdict landed; W-STAGE / W-DEMO-AFFORDANCES (Batch 6) stage the feedback pages over a real backdrop (the X-1 void fix) so the tinted glass has something to read THROUGH — this wave's tone recipe is the prerequisite material for that staging to demonstrate glass.

## Archaeology

Prior attempt: AW.W25 introduced "semantic-tone parity" — it correctly routed Alert's tones onto the glass-wash-plus-tone-on-rim model (the CORRECT shape this wave converges on) but left the Toast variant map and the Notification type map as OPAQUE token plates (`Toast.vue:57-62` carries the AW.W25 comment naming "semantic-tone parity" directly above the solid-plate map). The new guardrail: this wave's gate asserts the FINAL-COMPOSITED-ALPHA of every tone variant (the W2 π) + a variant-arm SOURCE bite (W1) — the AW.W25 close proved the tokens were CONSUMED but never that the composited plate was TRANSLUCENT, so the opaque-tone slabs shipped under a green "parity" claim. The gestalt bar (inv-4) is the second guardrail: the band is judged whole-page, not per-token.
