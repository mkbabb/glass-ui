<!-- surface-paths: demo/stories/substrates/blob.vue, src/components/custom/goo-blob/types.ts, src/components/custom/goo-blob/GooBlob.vue, src/styles/tokens/shadow.css -->
<!-- surface-hash: 8d47ddaecc8a58165d43f7950741faae1c2a6cb89a407066916e24a408a87f55 -->

# AZ.W-BLOB-STUDIO — the studio refinement DELTA

The blob STUDIO (the Configurator-driven hero on `/substrates/blob`) is refined into a
large-hero tuning instrument with a satellite-geometry layer, a rounder metaball bridge,
a grounded gel-dome shadow, a louder-lean register, and a primary→secondary→tertiary
configurator hierarchy. The folded uBackdrop refraction (§3.7) closed CONDITIONS-UNMET —
the enamel state stands (see §3.7 below).

## Own-surface captures

| facet | light | dark |
|---|---|---|
| stage hero (the §3.1 large-centered bead + §3.4 grounded shadow) | `W-BLOB-STUDIO-stage-light.png` | `W-BLOB-STUDIO-stage-dark.png` |
| configurator hierarchy (the §3.6 weighted preset row + dividers + layer order) | `W-BLOB-STUDIO-configurator-light.png` | `W-BLOB-STUDIO-configurator-dark.png` |
| merge bridge / satellite separation (§3.2 + §3.3, orbit dialed to max) | `W-BLOB-STUDIO-merge-bridge-light.png` | `W-BLOB-STUDIO-merge-bridge-dark.png` |
| grounded shadow (§3.4 two-rung contact band) | `W-BLOB-STUDIO-shadow-light.png` | `W-BLOB-STUDIO-shadow-dark.png` |

Frame-budget arm: `W-BLOB-STUDIO-gperf.json` (the re-run 4×-throttle G-PERF record).

## Paired-π readback (the falsifiable numbers, measured live on `/substrates/blob`)

| metric | light | dark | floor / meaning |
|---|---|---|---|
| stage-fill ratio (bead bbox height / stage height) | 1.246 | 1.246 | ≥ 0.55 — the C6-5 ~0.30 undersized read fixed; the bead (+ overflowing necking satellites) paints LARGER than the stage (a large hero) |
| centre offset (\|cx_bead − cx_stage_col\|/stage_col_w) | 0.023 | 0.023 | ≤ 0.14 — centered within the stage column (was pushed left by the controls aside) |
| satellite-separation peak components (orbit dialed to max, satellite-sized floor) | 5 | 7 | ≥ 2 — dialing orbitRadius UP SEPARATES satellites into orbiting droplets (the C6-7 live cause→effect) |
| grounded-shadow drop-shadow rungs | 2 | 2 | ≥ 2 — the two-rung grounded gel-dome composite (ambient + contact) |

## §3.1 — Stage-fill hero (D1)

The studio GooBlob wrapper re-based from a fixed `w-64 max-w-[80%]` (256px, ~30% of the
`h-[min(70vh,560px)]` stage, pushed left) to a stage-proportional `h-[min(78%,30rem)]
max-w-[88%]` square, centered. The bead now fills the stage as a LARGE centered creature
(the canvas overflows to ~696px for the necking satellites; the visible wrapper is ~435px,
~78% of the stage height). Centre offset 0.023 (centered against the controls aside).

## §3.2 — Merge bridge (D2, the C6-6 seam-crease fix)

The LIBRARY default merge variant re-bases `quadratic` → `circular` (`types.ts` membrane
default) — IQ's circular smin lays a true quarter-circle fillet where the quadratic
creased (the rounder menisci the C6-6 defect named). The `smoothK` blend-band stays at the
CALIBRATED 0.05 on the library default — DELIBERATELY: a louder smoothK on the default bead
inflates the whole-canvas lean centroid past the existing `proof:blob-render` calm-lean
ceiling (0.10) when an orbiting satellite necks in on the leaned side (measured 0.103 at
smoothK 0.09). The LOUDER bridge is a STUDIO axis: the studio seeds a modestly louder
smoothK (0.06, lean ≈ 0.099, clear of the ceiling) in `STUDIO_GEO_BASE` AND surfaces
smoothK as a LIVE knob (0.02–0.16) so a tuning session dials the bridge much wider to WATCH
the gooey neck. The studio knob bounds only the resting/auto-flick default, not the user's
dial. Both surfaced as studio knobs (the Geometry/Satellites layer).

## §3.3 — Satellite geometry layer (D3 + the C6-7 GAP)

A "Geometry / Satellites" `ConfiguratorLayer` exposes `satelliteCount` (0–`MAX_SATS`=4),
`orbitRadius`, `satelliteRadius`, `eccentricity` as LIVE knobs threaded onto the
`BlobGeometry` atoms (plus the §3.2 merge knobs). Dialing `orbitRadius` past the body
radius SEPARATES the satellites — the live cause→effect (peak 5–7 connected components at
max orbit). No new substrate; the layer consumes the existing atoms.

## §3.4 — Grounded shadow (D4)

The blob shadow moves from a single soft `drop-shadow(var(--blob-shadow))` to a TWO-RUNG
grounded gel-dome composite: a soft AMBIENT cast (`--blob-shadow-ambient`) PLUS a tight,
low-offset, darker CONTACT band (`--blob-shadow-contact`, near-zero blur, ~2× strength)
hugging the silhouette base. Two chained `drop-shadow()` filters — each follows the
irregular metaball silhouette (a `box-shadow` would stamp a rectangle, missing the necking
satellites). Token-first (a consumer retints via `--blob-shadow-contact-*`),
adaptive-by-construction under `.dark` (the `--shadow-color`/`--foreground` base
re-resolves). The PRM bracket carries the same grounded composite (only the transition is
cut).

## §3.5 — Interaction loudness register (D5)

A studio-only `responsiveness` knob (0..1, Interaction layer) scales the pointer-lean
strength (0.10 → 0.45) AND the velocity-squash magnitude (stretch 0.5 → 2.0) UP from the
calm default toward a pronounced register, so a fast flick reads a visible taffy-pull. It
is a SURFACED knob, NOT a library default re-base — the SHIPPED `pointerStrength` 0.10 /
`stretch` 0.5 are unchanged (the AX.W46 calibrated-calm stays the page/library default).
Restraint counter: ONE surfaced axis, no parallel uncoupling path.

## §3.6 — Configurator design hierarchy (D6 + C6-10/F3-M11)

The studio Configurator now carries a clear primary→secondary→tertiary hierarchy:
- `dividers` enabled on all three layers (the per-section hairline).
- The PRIMARY preset row weighted via the `#presets` slot override — a larger
  `font-semibold` label + the preset `sub` descriptor visible inline, the active chip a
  glass-tier pill (the glass-first selected register) — NOT the plain default `text-xs`
  chips.
- The layer ORDER reads top-down by importance: PRIMARY Interaction → SECONDARY Mood +
  palette → TERTIARY Geometry / Satellites.

(The W-HIERARCHY vocabulary is applied INLINE here; the blob studio is a named W-HIERARCHY
inheritor — flagged for ratification at Batch 4 if W-HIERARCHY lands its shared vocabulary
later.)

## §3.7 — The folded W-BLOB-GLASS refraction — CONDITIONS-UNMET (enamel stands)

The booked uBackdrop Snell refraction was NOT shipped. The G-PERF condition HOLDS (the
enamel frame floor: rest/hover/click p50 ≈ 8.3ms / ~0% over 16.7ms at 4× throttle — see
`W-BLOB-STUDIO-gperf.json`, an M5-Max-class box), but the **REFRACTION-READS π bite is
unsatisfiable on `/substrates/blob`**:

1. The studio bead sits over a FLAT `bg-card/40` cream surface — a Snell refraction of a
   uniform backdrop produces ZERO visible displacement by physics (no high-contrast feature
   to bend through the dome edge).
2. There is NO aurora behind THIS page (`C6-11`), so the only zero-extra-pass refraction
   source (the aurora-FBO handshake) is absent.
3. Sourcing a high-contrast backdrop otherwise needs either a DOM-pixel-read API that does
   NOT exist in WebGL core (the documented `backdrop-filter` read limitation — recorded in
   CLAUDE.md §W55) or a SECOND render pipeline (the `AY.W-BLOB-GLASS §4` scope-fence
   forbids it, and `§3a` fires the triumvirate scope-reveal if the refraction needs more
   than one sampler + one tap + the bevel profile).

Per the user's explicit conditional ("ships ONLY if both conditions hold; never a degraded
ship"), §3.7 closes CONDITIONS-UNMET and the enamel state stands. The metaball SHADER +
the renderer are byte-UNCHANGED (no `uBackdrop` sampler, no `refract()` tap, no squircle
`uBevel` — the `proof:blob-studio` IDENTITY-PRESERVED bite witnesses this). The greenlight
evaporated on the absent refraction source, not a perf/browser failure.

## Born-RED → GREEN

Verified born-RED against `a3dff36b` (the commit before any of this wave's work):
`smoothK: 0.05` + `merge: "quadratic"` (the un-rebased crease), no `--blob-shadow-contact`
token, a single-rung `drop-shadow`, and (in blob.vue) no satellite layer / no dividers / no
`#presets` override / no `responsiveness` knob — the `proof:blob-studio-config`
source-witness REDs on every bite. The `proof:blob-studio` π gate reds the stage-fill,
satellite-separation, and grounded-shadow bites at HEAD.

## Adjacent-fleet verification

- `proof:blob-studio` GREEN (2/2 π specs, all 5 bites + §3.7 IDENTITY-PRESERVED).
- `proof:blob-studio-config` GREEN (the device-free source-witness).
- `proof:blob-render` GREEN — the IDENTITY-PRESERVED bite: the lean-centroid stays under
  the 0.10 ceiling (the studio bead is the gated page bead; the 0.06 studio smoothK keeps
  the lean ≈ 0.099), the containment/silhouette/field witnesses hold.
- `proof:blob-page` GREEN — the W-BLOB-PAGE sibling: the circular merge did not break the
  SATELLITES-SEPARATE silhouette CV.
- `proof:blob-warm-default` GREEN — the cream body still reads ≥ 0.62 OKLCh-L (the merge
  re-base + grounded shadow did not regress the warm-cream identity).
- `proof:blob-tempo-suppression` + `proof:blob-interaction-prm` GREEN (the §7 shader-split
  gates).
- `npm run typecheck` GREEN.

PRE-EXISTING (NOT this wave): `proof:blob-smin-normalized` is RED at HEAD — its `RENDERER`
source-read path points at `useMetaballRenderer.ts` for the `uSmoothK * POS_SCALE` upload
assertion, but the AY shader-split carved that upload into `uploadBlobUniforms.ts`. The
gate was already RED at `a3dff36b` (the upload line is correct in `uploadBlobUniforms.ts`;
the gate's path is stale). This is the `B1-blob-shader-split-repoint` W-GATES owes — not a
regression of this wave.
