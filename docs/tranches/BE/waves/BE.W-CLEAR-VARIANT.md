## BE.W-CLEAR-VARIANT — `surface="clear"`, the Apple-Clear maximal-translucent register with the mandatory legibility scrim

- **Band:** 2 — Liquid Glass material, Safari-first · **Severity:** major · **Status:** SPEC (tranche-dev; NOT executed) · **Deps:** EXTENDS `proof:surface-axis` (the {glass·veil·opaque} axis gains a 4th member `clear`); READS `useGlassBackdropLuminance`'s `--glass-backdrop-luma` (the scrim strength derives from the sampled luminance — the observer EXISTS, AZ.W-ADAPTIVE-AUTO). **Sequence:** lands BEFORE BE.W-DOCK-NOWPLAYING-PILL (the pill is consumer #1 of `surface="clear"`); co-sequences with BE.W-AMBIENT-TINT (both ride the ONE `useGlassBackdropLuminance` sampler — the pill seeds hue from AMBIENT + luma from CLEAR off one pass).
- **One-line goal:** Mint `--glass-opacity-clear` (~0.55-0.62 — the Apple-Clear band BELOW the dialog 0.68) as `surface="clear"`, the surface-axis 4th member, STRUCTURALLY coupled to a MANDATORY `::before` legibility scrim whose strength derives from the sampled `--glass-backdrop-luma` (it dims MORE over a bright album grid) — so a maximal-translucent glass module reads see-through AND legible regardless of the backdrop, the Apple Clear contract (a scrim-less `.glass-clear` is FORBIDDEN by construction).

---

## Goal — what ships, the iOS-27 betters-claim

The iOS-27 "Clear" material is the MAXIMALLY translucent register — the now-playing pill over the album grid, the Control-Center clear tiles (f_035/f_055/v2-f_009: the grid bleeds genuinely through, WITH a dimming-scrim so the content stays legible). At HEAD the surface axis tops out at `glass` (the resting/floating rung) — there is no register clearer than the dialog's 0.68. This wave adds the 4th member:

1. **`--glass-opacity-clear` (~0.55-0.62)** — a new rung in the Apple-Clear band, BELOW the dialog 0.68 (the clearest the library has shipped). The composed `--glass-bg-clear` rides the SAME oklab-tint-wrapped recipe (so `--glass-level` opaque escape + the W55 darken reach it).
2. **`surface="clear"`** — the surface-axis 4th member (`Surface = "glass" | "veil" | "opaque" | "clear"`), threaded through `surfaceClass` + the `[data-surface="clear"]` CSS seam, exactly as veil/opaque are.
3. **The MANDATORY legibility scrim (the load-bearing contract).** `[data-surface="clear"]` STRUCTURALLY couples a `::before` dimming scrim — `color-mix(in srgb, var(--background) N%, transparent)` (the A5-1 modal-scrim pattern at animations.css:376 / surfaces.css:95 — DISTINCT from the W55 `--glass-tint-*` plate-darken axis; this is a backdrop-DIMMING layer BEHIND the content, not a plate tint). A `.glass-clear` WITHOUT the scrim is FORBIDDEN — the scrim is in the SAME rule as the translucent plate, never a separable opt-in. The scrim strength `N` DERIVES from the sampled `--glass-backdrop-luma` (`useGlassBackdropLuminance`, AZ.W-ADAPTIVE-AUTO — the observer writes the 0..1 luma) so it dims MORE over a bright album grid and less over a dark one — the title clears 4.5:1 on its OWN composited surface regardless of bleed-through.

**The betters-claim:** Apple's Clear material dims a flat backdrop; glass-ui's Clear dims a LIVE album grid by the SAMPLED luminance (not a fixed scrim) — the legibility is dynamic, tracking the backdrop the static Apple scrim cannot. Couples CLEAR to AMBIENT (the hue) + the observer (the luminance) off ONE sampler — the highest-leverage reuse.

---

## Starting state — the exact HEAD src + the born-RED anchor (verified on disk)

**`src/components/ui/_shared/useSurfaceAxis.ts` — VERIFIED by reading in full.** `export type Surface = "glass" | "veil" | "opaque";` — THREE members. `surfaceClass(surface, tier)` maps veil→`veil-surface`, opaque→`glass-opaque`, glass→bare. **There is NO `clear` member** (the born-RED anchor: the 4th member is ABSENT).

**`src/styles/glass/surface-axis.css` — VERIFIED `:38-112`.** The `[data-surface="veil"]` rule (`:38`) and `[data-surface="opaque"]` rule (`:81`) are the only two decoration rules. **There is NO `[data-surface="clear"]` rule** and NO scrim coupling.

**`src/styles/tokens/glass.css:181` — VERIFIED.** `--glass-opacity-dialog: 0.68` is the CLEAREST opacity rung shipped. **`--glass-opacity-clear` is ABSENT** (grep → 0 hits).

**`src/composables/glass/useGlassBackdropLuminance.ts` — VERIFIED `:311`.** `el.style.setProperty("--glass-backdrop-luma", value.toFixed(3))` — the observer ALREADY writes the 0..1 sampled luma (its FIRST real consumer at HEAD is the discrete `--glass-backdrop` bucket). The scrim-strength derivation reads THIS existing token (no new sampler).

**`src/styles/animations.css:376-384` + `src/styles/glass/surfaces.css:95` — VERIFIED.** The A5-1 modal-scrim pattern `background-color: color-mix(in srgb, var(--background) Npct, transparent)` is the EXISTING idiom the clear scrim reuses (the dialog backdrop dim — distinct from the W55 plate tint).

**`scripts/proof-surface-axis.mjs` — VERIFIED `:17-60, :165-228`.** W1 counts `[data-surface="veil"]` + `[data-surface="opaque"]` decoration blocks (the regex `\[data-surface\s*=\s*["']veil["']\s*\]\s*\{`); W3 asserts the ELEVEN enrolled surfaces thread the axis. The gate has NO `clear` clause — CLEAR-VARIANT extends it.

**Born-RED summary:** `Surface` is a 3-member union; `--glass-opacity-clear` + the `[data-surface="clear"]` rule + the mandatory scrim are ABSENT. The π over a bright grid reads no clear register (no surface clearer than 0.68; no dynamic scrim) — RED until the build lands.

---

## Build — the mechanism on the named existing substrate

**The 4th surface-axis member + the structurally-coupled scrim + the luma-derived strength — ZERO new compositing path beyond the A5-1 scrim idiom.**

1. **`glass.css` — mint the clear rung.** Add `--glass-opacity-clear: 0.58;` (the Apple-Clear band, BELOW dialog 0.68 — with the inline rationale). Add `--glass-bg-clear` byte-isomorphic to `--glass-bg-dialog` with the clear opacity (the oklab-tint-wrapped recipe — the W55 darken + `--glass-level` escape reach it).
2. **`useSurfaceAxis.ts` — extend the union + resolver.** `Surface = "glass" | "veil" | "opaque" | "clear"`; `surfaceClass(...)` maps `clear → "${base} glass-clear"` (the `glass-clear` decoration class, the veil/opaque precedent). Re-export `Surface` from `_shared/index.ts` + `api/index.ts` (W2 publication — the additive widen).
3. **`surface-axis.css` — the `[data-surface="clear"]` rule with the MANDATORY scrim.** Add the decoration rule:
   ```css
   [data-surface="clear"], .glass-clear {
       --glass-clear-bg: color-mix(in oklab, var(--glass-bg-clear), var(--glass-tint-source) var(--glass-tint-strength));
       --glass-clear-scrim-strength: calc(var(--glass-backdrop-luma, 0.5) * 40%); /* dims MORE over a bright backdrop */
       background: var(--glass-clear-bg);
       backdrop-filter: var(--glass-blur-floating);
       -webkit-backdrop-filter: var(--glass-blur-floating);
       position: relative; /* the scrim host */
   }
   [data-surface="clear"]::before, .glass-clear::before {
       content: ""; position: absolute; inset: 0; z-index: -1;
       background-color: color-mix(in srgb, var(--background) var(--glass-clear-scrim-strength), transparent);
       border-radius: inherit; pointer-events: none;
   }
   ```
   The scrim is in the SAME rule-pair as the plate — a `.glass-clear` CANNOT exist without it (the structural coupling). The scrim BEHIND the content (`z-index: -1`) dims the bleed-through; the W55 `--glass-tint-*` axis is a SEPARATE plate-darken (the two axes stay disjoint — the scrim dims the backdrop, the tint darkens the plate).
4. **The luma derivation.** `--glass-clear-scrim-strength` reads `--glass-backdrop-luma` (the observer's existing write at useGlassBackdropLuminance.ts:311) — over a bright grid (luma→1) the scrim strengthens toward ~40%; over a dark grid (luma→0) it relaxes toward ~0% (the dark backdrop needs no dim). The fallback `0.5` is the safe mid-scrim when no observer is wired.

**Compositor-only / Safari-safe / PRM notes:** the scrim is a STATIC `::before` background-color (a paint property, no layout, no animation) — `proof:no-layout-animation` GREEN by construction. The `color-mix(in oklab) + backdrop-filter` plate inherits the `-webkit-backdrop-filter` prefix pass (Safari paints the clear frost — the see-through register is the cross-engine FLOOR, not a `url()` filter). PRM: no animation is introduced; the luma observer ALREADY collapses to a single mount-sample under PRM (the substrate-PRM mirror at useGlassBackdropLuminance.ts:360) — the scrim is computed once and holds.

---

## Gate — proof:clear-variant (NEW, CV1-CV4), born-RED → GREEN

**A NEW device-free source gate — `proof:clear-variant`, `['local','ci']`.** Born-RED by construction (`--glass-opacity-clear` + the `clear` member + the scrim ABSENT; `proof-clear-variant.mjs` absent). It EXTENDS the surface-axis family but is its own gate (the manifest folds CLEAR into proof:nowplaying-pill's scrim contract AND a standalone proof:clear-variant CV1-CV4).

- **CV1 — the clear rung is minted in the Apple-Clear band.** `--glass-opacity-clear` exists and `α < --glass-opacity-dialog` (0.68 — strictly clearer than the modal) AND `α > 0.45` (still a plate, not a ghost). RED at HEAD.
- **CV2 — `clear` is the 4th surface-axis member, published.** `Surface` union carries `clear`, `surfaceClass` maps it to `glass-clear`, AND `Surface` is published from `api/index.ts`. RED at HEAD (3-member union).
- **CV3 — the MANDATORY scrim is STRUCTURALLY coupled.** The `[data-surface="clear"]`/`.glass-clear` rule has a `::before` scrim reading `color-mix(in srgb, var(--background) … , transparent)` IN THE SAME seam, AND the scrim strength reads `--glass-backdrop-luma` (the luma-derived dim). A `.glass-clear` block with NO `::before` scrim reds. RED at HEAD (no rule).
- **CV4 — the scrim is DISTINCT from the W55 tint axis.** The clear scrim NEVER writes `--glass-tint-source`/`--glass-tint-strength` (the two legibility axes stay disjoint — the scrim dims the BACKDROP via `--background`, the W55 tint darkens the PLATE via `--glass-tint-ink`). RED if the scrim re-uses the tint cohort.
- **The self-test bite (the born-RED defect that MUST red):** a `.glass-clear` WITHOUT the `::before` scrim → CV3 RED ("the Apple Clear contract — a scrim-less clear surface is forbidden"); an OPAQUE clear (`--glass-opacity-clear ≥ 0.68`) → CV1 RED; a clear scrim writing `--glass-tint-source` → CV4 RED.

**Extend-vs-new:** NEW gate `proof:clear-variant` (the scrim contract + the 4th member). `proof:surface-axis` W1/W3 stay GREEN by construction (the W1 anti-fork bite counts veil/opaque blocks — `clear` is a SANCTIONED new member in the SAME shared seam, not a fork; the W3 ELEVEN-surface count is unchanged — clear is a new VALUE, not a new enrolled surface). A coordination one-liner extends proof:surface-axis's W1 to recognize `clear` as a sanctioned 4th member (so the anti-evasion no-second-axis bite does not false-red the new member).

---

## π — the binding paint readback

**`tests-visual/clear-variant.spec.ts` (NEW, Chromium + WebKit, LOCAL real-render).** VISUAL wave → a `proof:ba-gestalt` glass-band verdict + a captured DELTA, both modes × desktop+mobile. NO source-green close; "rides W-REFLECT3" FORBIDDEN (G8).

- **The binding double-ended readback (busy-bright AND dark):** mount a `surface="clear"` pill over (a) a BRIGHT album grid and (b) a DARK album grid at `:5199`. getImageData BEHIND the pill (the backdrop reads THROUGH the clear plate — sub-0.62 composited α) AND over the pill's title text. Assert: (a) the title clears 4.5:1 on its composited surface in BOTH the bright AND dark cases (the dynamic scrim does its job — the scrim is STRONGER over bright, the title legible regardless); (b) the backdrop's structure reads through (the clear register, not a slab). BEFORE: no clear register exists (the clearest is dialog 0.68 with no scrim).
- **The luma-derived scrim proof:** capture the SAME pill over a bright vs dark grid and assert the scrim strength (the composited dim) is HIGHER over bright — the dynamic legibility that betters Apple's fixed scrim.
- **Both modes + Safari (where liquid):** the WebKit project asserts the clear frost + the scrim paint (the see-through clear is the cross-engine floor — no `url()`, Safari paints it).
- **The captured DELTA** at `docs/tranches/BE/audit/visual/W-CLEAR-VARIANT-DELTA.md` — the clear pill over bright + dark grids, the scrim dynamically dimming, the title legible in both, both modes. **G7-revokable** via surface-hash freshness on `glass.css`/`surface-axis.css`/`useSurfaceAxis.ts`.

---

## Jubilance — the sited delights

- **FLOOR — the maximally-translucent clear read.** The album grid bleeds genuinely through the clear pill (the iOS-27 cue), the clearest register the library ships — sited at the now-playing pill.
- **FLOOR — the dynamic legibility.** The scrim STRENGTHENS over a bright grid and relaxes over a dark one (the title always reads) — the delight is that the legibility is alive, tracking the backdrop, not a fixed dim. The betters-over-Apple sited cue.
- **No OPT-IN motion jubilance** — clear is a MATERIAL register (the motion is the pill's own; this wave is the see-through plate + the scrim).

---

## Fences — what stays byte-untouched / warm-cream identity / no-legacy

1. **The three existing surface members are byte-untouched** — `glass`/`veil`/`opaque` rules + the resolver mappings unchanged; `clear` is an ADDITIVE 4th member (no veil/opaque break). `cartoon` stays a Card-local superset (not a `{glass·veil·opaque·clear}` member).
2. **The W55 tint axis + the scrim axis stay DISJOINT** — the clear scrim dims the BACKDROP (`--background`), the W55 tint darkens the PLATE (`--glass-tint-ink`); CV4 enforces the separation (the A5-1 modal-scrim is NOT the W55 darken).
3. **The warm-cream identity holds** — the clear plate is the warm-cream `--card` at a low alpha; the scrim is the neutral `--background` dim (the A5-1 idiom — never a hue). No ppmycota/cool token.
4. **The observer is READ, never re-implemented** — the scrim strength reads `--glass-backdrop-luma` (useGlassBackdropLuminance's existing write); NO new sampler, NO second getImageData pass (CLEAR + AMBIENT share the ONE sampler).
5. **Clean break, no alias** — `clear` is a NEW value (no retirement); a consumer who wants a non-scrim'd clear is FORBIDDEN (the Apple Clear contract is structural — the scrim is not opt-out; a consumer who wants NO dim uses `surface="glass"`). Presets-in-consumers: a consumer retunes `--glass-opacity-clear` / the scrim ceiling via `:root`.
6. **The ladder + dialog/sheet rungs are byte-untouched** — `--glass-opacity-{wash..overlay,dialog}` frozen; clear is a NEW off-ladder rung (the dock/dialog/sheet precedent).

**Risk:** the scrim ceiling (~40%) may over-dim a low-contrast title or under-dim over a saturated grid — the π double-ended (bright AND dark) is the calibration; the ceiling is the dial, recorded in the DELTA. If the luma observer is not wired on a given surface, the `0.5` fallback gives a safe mid-scrim (the title still reads, just not dynamically tuned).
