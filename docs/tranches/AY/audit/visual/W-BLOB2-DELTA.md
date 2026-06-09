# AY.W-BLOB2 — the light warm-cream default base + config-atom simplification · live DELTA

This wave closes the chronic README↔reality lie (CHRONIC across AX.W15 + AX.W46): a bare
`<GooBlob :config="BLOB_CONFIG_DEFAULTS">` rendered a **dark coffee-bean**, not the
"warm-cream living bead" every doc claimed. The default composed two near-black tokens —
`paletteStops: []` (the body fell back to the mounted near-black `color`) + `rimColor:
"var(--foreground)"` (near-black warm-ink) — so the body painted charcoal with a near-black
rim. The "warm-cream" identity was a thin specular/rim sheen on a dark body; it never made
the body read cream. This wave ships the light warm-cream OKLCh default base so the default
PAINTS the cream bead, and folds the ~50-knob `BlobConfig` to an 8-atom set.

**Captured 2026-06-09** against the AY line (`at-dock-convergence`, 3.9.0 ancestor) on the
live demo (`npm run dev`, `/substrates/blob`) via Playwright on the real Metal GPU backend
(`--use-gl=angle --use-angle=metal`). The body-L numbers are the π readback the
`proof:blob-warm-default` gate measures (the central-body-box mean OKLCh-L over the
modal-non-background interior).

---

## VERDICT — PASS (the cream bead the docs promised, both modes; the gates ratify)

**The default now paints a light, warm, coherent gel bead.** The resting body mean OKLCh-L
crosses the warm-cream floor (`WARM_BEAD_L_MIN = 0.62`) in BOTH light and dark mode, while
the `blob-render.spec.ts` containment/variance/silhouette/field bands all still hold (the
cream body is still a LIT dome, not a flat pale slab). The 8-atom config surface clears the
≤12 ceiling with the three derived-but-unread fields deleted.

### The paired-π readback (the falsifiable warmth number, not prose)

| surface | BEFORE (charcoal default) | AFTER (cream default) |
|---|---|---|
| body mean OKLCh-L, light mode | ≈ 0.53 (the AX W46 calm reference plate; the live near-black `var(--primary)` body lower) | **0.814** |
| body mean OKLCh-L, dark mode | ≈ 0.53 (same near-black `--foreground` rim on a near-black body) | **0.775** |
| `proof:blob-warm-default` (both schemes) | FAIL (born-RED — `scene not found` then body-L < 0.62) | **PASS (2/2)** |

The cream base is a FIXED light OKLCh ramp (`color.paletteStops`), not a token that flips
with the theme — so it reads light in BOTH schemes (0.814 light / 0.775 dark, both clearing
the 0.62 floor with margin). The BEFORE charcoal reference is the AX W46 capture
`docs/tranches/AX/audit/visual/W46/blob-default-AFTER-calm.png` (a brown/charcoal amorphous
mass with a pseudopod off the right edge).

### The cream-base derivation (the SOTA-is-the-default move)

The default `color.paletteStops` is derived ONCE through the SHARED `/color` producer (inv
J-10, no parallel ramp):

```
deriveBlobPalette({ L: 0.78, C: 0.05, h: 78 },
                  { stopCount: 3, harmony: "analogous",
                    lightnessSpread: 0.18, hueSpread: 24, chromaBump: 0.03 })
  .map(oklchStopToHex)
  → ["#b5947f", "#d4b27d", "#dad6b1"]   // ramp mean OKLCh L≈0.78
```

The anchor was tuned DOWN from an initial 0.86 against the LIVE readback: a too-light body
(L≈0.87) collapsed the `blob-render.spec.ts` centre-vs-corner gradient (16.8, below the 25
field-floor) — the cream body read as a flat slab against the light cream backdrop. The
FLOOR (0.62) is the contract and was NOT lowered; the BODY moved (the named-successor
clause). At anchor 0.78 the body reads cream (0.814/0.775 ≥ 0.62) AND a real field (gradient
cleared, `proof:blob-render` 3/3).

The rim is re-anchored off `var(--foreground)` (near-black, which would ring a hard dark
band on the light body — its body↔foreground L gap ≈0.66 sits OUTSIDE the shader's 0.22
min-contrast guard) to a warm MID-TONE `#8c694e` = `oklch(0.55 0.06 60)`. On the cream body
(L≈0.81) the rim L=0.55 sits 0.26 away (> the 0.22 guard band), so it stays a contrasting
curve-DEFINER drawing the silhouette without a dark ring.

---

## The captured own-surface PNGs

The default-identity surface (`/substrates/blob`, the interaction hero = the bare cream
default), ≥2 viewports × {light, dark}:

- `W-BLOB2-goo-blob-desktop-light.png` — 1280, light: the warm-cream gel bead.
- `W-BLOB2-goo-blob-desktop-dark.png` — 1280, dark: the cream bead holds light against the
  dark backdrop (the fixed light OKLCh base).
- `W-BLOB2-goo-blob-mobile-light.png` — 375, light.
- `W-BLOB2-goo-blob-mobile-dark.png` — 375, dark.

The mood/palette motion surface (the mood hero — the centroid-lean on hover), ≥5 frames:

- `W-BLOB2-blob-mood-hover-frame{1..5}-desktop-light.png` — the seed-derived lit bead
  leaning toward the pointer across five rAF-sampled hover frames (the centroid lean is the
  deliberate "the creature notices you" register; the mood hero drives `color.paletteStops`
  live off the seed UI, so it is the vivid colored register the docs ALSO promise — distinct
  from the resting cream default).

---

## The config-atom simplification (D2 — the aurora "simplify to atoms" mirror)

The flat 46-field `BlobConfig` (verified at HEAD) is folded to EIGHT cohesive atoms —
`geometry · satellites · membrane · color · surface · interaction · quality · tempo` — the
length/weight/duration knobs behind the atom they belong to (J §6.3 "the variant IS the
bundle"). The three derived-but-unread fields (`orbitSpeedScale`, `wobbleScale`, `mergeRate`)
are DELETED from the config surface — they were config-level identity no-ops (read only off
`MoodParams`, never off the config; no consumer ever set them off 1.0). They legitimately
survive on `MoodParams` (the mood-param twin `proof:blob-mood-resolved` witnesses). Gated by
`proof:blob-config-atoms` (8 ≤ 12 ceiling + the deletion-witness + the defaults round-trip).

---

## Gate ledger (all GREEN on the real device + source)

| Gate | Arms | Result |
|---|---|---|
| `proof:blob-warm-default` (G1) | body-L ≥ 0.62, light + dark | **PASS 2/2** (0.814 / 0.775) |
| `proof:blob-config-atoms` (G2) | 8 atoms ≤ 12, deleted-fields-gone, round-trip | **PASS** |
| `proof:blob-render` (G3) | containment + dome-variance + silhouette + field-gradient | **PASS 3/3** |
| `proof:blob-live-truth` (G3) | render band + manual-mood latch + π readback | **PASS 4/0** |
| `proof:blob-integration` (G3) | WCAG-2.2.2 pause-park + context-bound + README | **PASS 3/3** |
| `proof:blob-interaction-prm` (G3) | PRM no-op + frame-rate-indep + no-orphan | **PASS** |
| `proof:blob-mood-resolved` (G3) | no unread mood sub-orphan + demo drives every mood | **PASS** |
| `proof:blob-color-equivalence` / `-smin-normalized` / `-space-gamma` (G3) | the ColorResolver/smin/OETF leaves | **PASS** |

The stale π-route (`PI_TARGETS.blob` → `substrates/goo-blob`, the AX IA-consolidation
rename → `substrates/blob`) was repaired (RESEARCH.md §5.1 flagged it for this wave); the
same consolidation repointed the four mood/interaction-story gate fixtures off their gone
`blob-mood.vue`/`blob-interaction.vue`/`blob-interaction`/`blob-mood` routes onto the ONE
`substrates/blob` page.
