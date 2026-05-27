# AM.W0.1 — Token contrast + packaging evidence

Closes AM.W0 hard gates 2 (packaging) + 3 (token AA). Gaps 15 (blocking) + 1 (major) from `GLASS-UI-gap-matrix.md`.

## Gap 1 — `--muted-foreground` WCAG 2.1 AA darken

`--muted-foreground` aliases the `--neutral-5` rung in both cascades. Muted text most often sits on the `--muted` surface (`--neutral-1`), so that pairing is the worst case; the page surface (`--neutral-0`) is the secondary pairing. Both must clear the AA body-text floor of 4.5:1.

Ratios computed by converting each HSL token to sRGB, linearizing per channel (`c<=0.03928 ? c/12.92 : ((c+0.055)/1.055)^2.4`), taking relative luminance `L = 0.2126·R + 0.7152·G + 0.0722·B`, and `ratio = (L_light+0.05)/(L_dark+0.05)`.

### Light cascade (`tokens.css:375`)

| State | `--neutral-5` | vs `--neutral-0` (L98 page) | vs `--neutral-1` (L95 muted) | AA 4.5:1 |
|---|---|---|---|---|
| **Before** | `hsl(48 6% 45%)` | 4.316:1 | **4.051:1** | FAIL |
| **After** | `hsl(48 6% 40%)` | 5.229:1 | 4.907:1 | PASS |

The before/worst-case figure of 4.051:1 (vs the L95 muted surface) is the ≈4.05:1 the audit flagged. Darkening L45 → L40 lifts the worst case to 4.907:1 — clears 4.5:1 with margin while staying perceptually muted.

### Dark cascade (`tokens.css:1267`)

| State | `--neutral-5` | vs `--neutral-0` (L6 page) | vs `--neutral-1` (L11 muted) | vs `--card` (L10) | AA 4.5:1 |
|---|---|---|---|---|---|
| **Before** | `hsl(48 5% 60%)` | 6.960:1 | 6.198:1 | 6.365:1 | PASS |
| **After** | `hsl(48 5% 62%)` | 7.392:1 | 6.582:1 | 6.760:1 | PASS |

The dark companion already cleared AA before the edit; it is mirrored LIGHTER (L60 → L62) to keep perceptual symmetry with the light-rung darkening and add a small headroom margin. Both pairings clear comfortably.

## Gap 15 — `tw-animate-css` peer declaration

The library `@apply`s `animate-in` / `fade-out-0` / `zoom-out-95` (`src/styles/utilities.css`) and ~11 components consume the `data-[state=closed]:fade-out-0` grammar. A fresh Tailwind-v4 consumer that omits `tw-animate-css` gets an unknown-utility build error. It was declared under `devDependencies` only.

### `package.json` diff

```diff
   "peerDependencies": {
     ...
     "reka-ui": "^2.0",
     "tailwindcss": "^4.0",
+    "tw-animate-css": "^1.2.5",
     "vaul-vue": "^0.4",
     "vue": "^3.5"
   },
+  "optionalPeerDependencies": {
+    "tw-animate-css": "^1.2.5"
+  },
   "devDependencies": {
     ...
     "tw-animate-css": "^1.2.5",   // KEPT — the library's own build needs it
     ...
   }
```

- `peerDependencies` now declares the contract (the library emits the utilities).
- `optionalPeerDependencies` mirrors the hint so package managers surface the requirement without a hard install gate on Button-only consumers.
- `devDependencies` entry KEPT — the library's own build consumes it.
- `version` field UNCHANGED (`2.0.0`).

## Verification

- `npm run typecheck` → exit 0 (CSS/JSON edits; type surface unaffected).
- `package.json` validated as well-formed JSON; `version` confirmed `2.0.0`.
- `npm run build` deliberately NOT run here (orchestrator runs it once at integration; the 8 GB/≈6.7 GB-RSS build would thrash the machine).
