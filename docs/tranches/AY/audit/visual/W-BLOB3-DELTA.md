# W-BLOB3 — blob DI strip + the wired-interaction DELTA

**Wave:** AY.W-BLOB3 · **Status:** live-verified · **Captured:** 2026-06-09 against the live
demo (`/substrates/blob`, the π-lane chromium on Metal GPU) by
`tests-visual/blob3-interaction-capture.spec.ts`.
**Authored by the orchestrator at integration** (the lane agent landed the source + the 14
own-surface PNGs + the strip gate, then died on a transient rate-limit before writing this doc;
every claim below re-verified at integration — the gate re-run PASS, the PNGs inventoried).

## Arm 1 — the ColorResolver DI STRIP (the structural claim; gate-proven)

The speculative DI seam (the REQUIRED `colorResolver` prop + the loud-throw + the inject
ceremony) is GONE from the goo-blob package; the renderer re-points to the `/color` leaf
directly. The render is byte-identical by construction — the resolver always delegated to
`cssToOklch → oklchToGammaRgb`, which the renderer now reaches without the ceremony.

`node scripts/proof-blob3-strip.mjs` → **PASS** (re-run at integration, exit 0):
- **(A)** seam GONE from goo-blob code — 0 code hits;
- **(B)** the renderer re-points to `/color` — import ✓ · `resolveColor` ✓;
- **(C)** the type/default survive for the remaining consumer (FourierField) — type ✓ ·
  default ✓ · FourierField ✓;
- self-test bite — seam-readd AND repoint-removal both flag.
Artefact: `.cache/gates/AY-blob3-strip.json`. The `proof:blob-*` fleet stays green (the
no-regression arm); `verify-export-types` resolves the slimmed `/goo-blob` surface.

## Arm 2 — the WIRED interaction (the visible claim; own-surface captures)

The cream bead (the W-BLOB2 default) NOTICES the pointer — the centroid leans toward a
hover-flick and the bead bounces on click. The binding numeric band is owned by
`tests-visual/blob-render.spec.ts` (the CENTROID_SHIFT band at `:572` — this capture does not
re-assert it; one measurement path, no twin). The capture series (14 own-surface PNGs, all
`W-BLOB3-*`):

The resting bead: `W-BLOB3-goo-blob-desktop-light.png`, `W-BLOB3-goo-blob-desktop-dark.png`,
`W-BLOB3-goo-blob-mobile-light.png`, `W-BLOB3-goo-blob-mobile-dark.png`.
The lean series (rAF-sampled across a real pointer travel):
`W-BLOB3-goo-blob-hover-frame1-desktop-light.png`, `W-BLOB3-goo-blob-hover-frame2-desktop-light.png`,
`W-BLOB3-goo-blob-hover-frame3-desktop-light.png`, `W-BLOB3-goo-blob-hover-frame4-desktop-light.png`,
`W-BLOB3-goo-blob-hover-frame5-desktop-light.png`.
The press response: `W-BLOB3-goo-blob-click-bounce-desktop-light.png`.
The mood hero quad: `W-BLOB3-blob-mood-desktop-light.png`, `W-BLOB3-blob-mood-desktop-dark.png`,
`W-BLOB3-blob-mood-mobile-light.png`, `W-BLOB3-blob-mood-mobile-dark.png`.

Protocol: desktop 1280 + real mobile-width viewport × {light, dark}; the hover series is
rAF-sampled across the pointer travel (the H-cardinal ≥5-frame depth floor for a motion
surface).

## Residue (recorded, not hidden)

- The W-BLOB2 §0 RG2/RG3 mood re-captures (the demonstrative mood-lean + the cream-default
  mood frame) remain OWED on the W-BLOB2 row — this wave's mood shots are the mood hero at its
  seed register, not the RG2/RG3 closure.
- The consumer-#2 disposition closed as BOOK-demo-only (the F4 routing); recorded for the
  W-CLOSE1 overfitting audit.
