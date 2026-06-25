# RESEARCH-1 — LIVE ROOT-CAUSE: the glass reads GRAY/DARK, never warm-cream luminous

**Surface:** `http://localhost:5173` · live-inspected via chrome-devtools-mcp `getComputedStyle` + actual paint screenshots, BOTH modes.
**Verdict:** CONFIRMED. The defect is **token-level chroma starvation**, not a recipe bug. The glass compose recipe (`--glass-level` AX.W54), the adaptive tint seam (W55), and the dark-material arm are all functioning *exactly as authored* — they faithfully composite the source tokens. The source tokens themselves carry **imperceptible OKLab chroma** (and, for the page, the wrong *hue*), so the warm-cream identity is invisible and every plate reads as a flat gray slab. The BA.W-NO-GRAY "plate floor C ≥ 0.0035, ~2× HEAD" is set roughly **3–5× below the perceptual warm-material threshold** — it greened the gate while leaving the surface gray.

---

## 1. The live evidence (computed values, both modes)

### Page / token resolution (LIGHT, `:root`)

| token | declared | resolved OKLab | reading |
|---|---|---|---|
| `--background` / `--neutral-0` | `hsl(40 30% 98%)` | **L 0.985 · C 0.0029 · H 84.6°** | near-achromatic, **yellow-green hue** |
| `--card` / `--popover` | `hsl(36 48% 97%)` | **L 0.980 · C 0.0062 · H 75.4°** | warm hue, but **C imperceptible at L98** |
| `--neutral-5` (muted text) | `hsl(30 22% 40%)` | L 0.526 · C 0.0433 · H 66.7° | warm OK (mid-L can carry chroma) |
| `--foreground` | `hsl(24 10% 10%)` | warm-ink (correct) | — |

### Page / token resolution (DARK, `.dark`)

| token | declared | resolved OKLab | reading |
|---|---|---|---|
| `--neutral-0` (page) | `hsl(24 9% 4%)` | L 0.146 · C 0.0028 · H 68.6° | near-black, achromatic |
| `--card` | `hsl(24 8% 16%)` | **L 0.280 · C 0.0070 · H 48.5°** | charcoal, **C near-gray** |
| `--foreground` | `hsl(30 14% 90%)` | L 0.926 · C 0.0063 · H 75.4° | warm ink OK |

### The painted surfaces (the offending elements)

| surface | computed `background-color` | OKLab | reading |
|---|---|---|---|
| **Select panel** (`/forms/select`, `.glass-floating`) | `oklab(0.942574 0.0015 0.0064 / 0.808)` | L 0.94 · **C 0.0066** | flat gray plate |
| Select menu item (`.glass-menu-row`) | `oklab(0.921619 0.0016 0.0064 / 0.52)` | L 0.92 · C 0.0066 | gray |
| glass **Card** (`/forms/select` story card, light) | `oklab(0.934369 0.0015 0.0064 / 0.664)` | L 0.93 · C 0.0066 | gray slab |
| glass **Card** (DARK) | `oklab(0.383353 0.0039 0.0061 / 0.754)` | L 0.38 · **C 0.0073** | charcoal slab |
| **toggle-chip ON** (`/forms/toggle`) | `oklab(0.842839 0.0018 0.0063)` | L 0.84 · C 0.0065 | gray |
| toggle-chip OFF | `oklab(0.919267 0.0016 0.0064)` | L 0.92 · C 0.0066 | gray |
| Select trigger / toggle button (`.control-surface`) | `color(srgb 0.9844 0.97288 0.9556 / 0.5)` | L ~0.97 · C ~0.006 | gray |

**Perceptual context:** a warm material reads as *warm* only above OKLab **C ≈ 0.012–0.020**. Every painted glass surface above sits at **C ≈ 0.006–0.007** — half to a third of threshold. The eye reads them as neutral gray. The screenshots (light + dark, captured) show exactly this: flat gray plates, no transmissive warmth, no luminous chroma.

---

## 2. The CONFIRMED mechanism (the cascade, end to end)

The glass plate paints via the AX.W54 compose recipe, faithfully:

```
--glass-bg-floating = color-mix(in srgb, var(--card) calc((1 - (1-0.80)*--glass-level)*100%), transparent)
                    = color-mix(in srgb, hsl(36 48% 97%) 80%, transparent)
```

There is **no bug in this line.** It takes `--card`'s chroma and emits it at 80% alpha. The output OKLab C (0.0066) ≈ the input `--card` C (0.0062). **The recipe cannot manufacture chroma the source token doesn't carry.**

So the root cause is upstream, at the **source color tokens**, in three independent legs:

### Leg A — `--background` / `--neutral-0` is the WRONG HUE *and* achromatic (light)
`hsl(40 30% 98%)` → OKLab **H 84.6°** (yellow-green) · **C 0.0029**. This is the *exact* yellow-green hue BA.W-NO-GRAY condemned for the `--neutral-*` ladder (it fixed the ladder hsl-48→hsl-28-34 to land H 62-72°) — but it **explicitly KEPT `--neutral-0` at hsl-40** as a "KEEP-NEUTRAL surface" (`color-radius.css:40`). Result: the page itself is a cool yellow-green near-white. Every glass surface transmits this page via `backdrop-filter` → inherits the cool cast. *The page is the backdrop the whole glass system bends; a gray page yields gray glass.*

### Leg B — `--card` chroma is below perceptual threshold (light)
`--card = hsl(36 48% 97%)` → C 0.0062 at L 0.98. The W-NO-GRAY comment (`color-radius.css:60-72`) acknowledges the plate is gamut-bound at L98 and sets the floor at **"composited C ≥ 0.0035, ~2× HEAD."** That floor is **~3–5× too low** to read as warm material. The plate is technically "2× warmer than gray" and still looks gray. The fix the canon applied (decouple `--card` from `--neutral-0`) was directionally right but **under-shot the chroma**, and is capped by the L98 lightness (you cannot carry visible warm chroma at L0.98 without lifting it — sRGB gamut bounds C at high L).

### Leg C — dark `--card` is charcoal-gray (dark)
`hsl(24 8% 16%)` → L 0.28 · **C 0.0070**. The W-DARK-MATERIAL arm lifted the *lightness* (L10→L16) for elevation but left the **saturation at 8%** → OKLab C 0.0070, near-gray. The dark glass tint seam (`--glass-tint-strength-aa: 12%`) lifts the plate toward `--foreground` ink, but ink is itself low-chroma (C 0.0063), so the lift adds no warmth. The "luminous transmissive dark material" the canon describes is, in paint, a flat charcoal slab.

### Why the adaptive seam does NOT save it
At the Select panel, `--glass-backdrop` resolved to `light` (the `@container style()` bucket fired) — but `--glass-tint-strength` resolved to the **floor (4%)** because `--glass-backdrop-luma = 0` (the static page has no sampled luma; the observer is dock-only). So the panel gets the 4% floor tint, not the 20% AA darken. Even at full AA the tint source is `--glass-tint-ink` = `--foreground` (low-chroma warm-ink), so darkening adds *luminance* contrast, never *chroma*. **The adaptive seam fixes legibility-over-bright, not warmth.** It is orthogonal to this defect.

### Why text isn't readable (the user's complaint)
`--muted-foreground` = `--neutral-5` L0.526 over a glass plate that composites toward L0.92–0.94 gives ~3:1 — and on the dark charcoal plate (L0.38) the dark `--muted-foreground` (`hsl(34 14% 62%)` L~0.62) over L0.38 is a weak ~2.5:1. The on-glass-fg family (`--on-glass-muted`) exists but the *plate is so low-contrast and gray* that any muted ink on it is mushy. Fixing the plate warmth + luminance separation fixes readability as a side effect.

---

## 3. The precise files + lines to change (for the fix wave)

| leg | file:line | current | direction |
|---|---|---|---|
| A | `src/styles/tokens/color-radius.css:40` | `--neutral-0: hsl(40 30% 98%)` | warm the page hue to the H62-72° family (e.g. `hsl(34 …)`) — the page is the backdrop everything transmits. Lift saturation as gamut allows at L98 (small but real). |
| B | `src/styles/tokens/color-radius.css:72` | `--card: hsl(36 48% 97%)` | lift the warm chroma materially (drop L a touch and raise sat) so the plate clears perceptual warm threshold (target composited OKLab **C ≥ 0.012–0.016**, not 0.0035). |
| C | `src/styles/tokens/dark-arm.css:74` | `--card: hsl(24 8% 16%)` | lift saturation (8% → higher) for a *warm luminous* dark plate, not charcoal; pair with the transmissive `saturate()/brightness()` companions already in the dark blur arm. |
| — | `proof:no-gray` | "plate floor C ≥ 0.0035" | **raise the floor** to a perceptual warm bar (≈0.012 light plate / ≈0.010 dark plate). The current floor is what let gray green the gate. |

**Fences to honor (no legacy, gestalt):**
- The lift is **chroma + small-L** at the source token — it flows through the *entire* existing compose recipe, tint seam, and dark arm with ZERO recipe edits (token-first, the W-NO-GRAY discipline). No new compositing path.
- `--card` must stay decoupled from `--neutral-0` (the W-NO-GRAY plate-decouple is correct; only the magnitude is wrong).
- The `in srgb` surface-tint family fence (AW.W26) is untouched — this is the source-color axis, not the tint-mix space.
- AA contrast must be re-ratified after any L move (the canon's "±0.01 of HEAD" bar — but the warm lift is mostly chroma, so L can largely hold).
- iOS-27 reference: the glass is **transmissive** — for warmth to *read* via transmission, the **backdrop (the page) must itself be warm-cream**, not yellow-green near-white. Leg A is the keystone; B/C make the plates carry their own warmth where the backdrop is flat.

---

## 4. One-line root cause

> The glass compose recipe, adaptive tint seam, and dark arm all work correctly — but the **source tokens they composite (`--neutral-0`/`--background`, light `--card`, dark `--card`) carry OKLab chroma of only ~0.003–0.007 (with the page additionally at the wrong yellow-green H 84.6°)**, which is 3–5× below the perceptual warm-material threshold, so every glass plate composites to a flat gray slab in both modes. The BA.W-NO-GRAY "plate floor C ≥ 0.0035" greened the gate while staying visibly gray. Fix is token-first: warm the page hue + raise the plate chroma materially + lift the dark plate saturation + raise the `proof:no-gray` floor to a perceptual bar.
