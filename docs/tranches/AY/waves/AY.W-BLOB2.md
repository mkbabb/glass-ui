# AY.W-BLOB2 — Blob light warm-cream default base + config simplification to atoms

**Tranche** AY (glass-ui) · **Wave** W-BLOB2 · **Track** blob · **Type** default-identity impl + config-atom simplification + captured-DELTA backfill
· **Band** A (SOTA component perfection) · **State** OPEN · **HEAD** `at-dock-convergence`
· **Depends on** W-BLOB1 (the RESEARCH.md default-identity decision + the born-RED `proof:blob-warm-default` gate + the ≤12 atom-count ceiling numeral — this wave turns that gate GREEN by shipping the cream default) + W-GOD1 (the `useMetaballRenderer` <500 leaf-carve lands FIRST so this wave's `types.ts`/`drawFrame`-adjacent edits do not re-conflict — the H-blob F5 ordering) + W-CARDINAL-INFRA (the AY cardinal home `docs/tranches/AY/audit/visual/` + `proof:live-verified-ledger --tranche=AY`, which the DELTA arm names)
· **Source risk** MEDIUM — flips the default `paletteStops`/`rimColor` (a visual default-identity change) + prunes the `BlobConfig` top-level surface; both gated by a born-RED π readback + an atom-count ceiling.

---

## Defect (file:line, source-grounded)

### D1 — the canonical DEFAULT blob paints a DARK coffee-bean, NOT the "warm-cream living bead" every doc claims (the README↔reality lie; CHRONIC across AX.W15 + AX.W46)

A bare `<GooBlob :config="BLOB_CONFIG_DEFAULTS">` over the demo backdrop renders a charcoal/brown
amorphous mass — captured in the DELTA artefact `docs/tranches/AX/audit/visual/W46/blob-default-AFTER-calm.png`
(the "after-calm" default reads as an ink stain / coffee bean with a pseudopod off the right edge,
NOT a gel droplet). The colored variants in the same overview (red / blue / green) read beautifully
as lit beads; the DEFAULT (near-black) does not.

Root cause — the two near-black tokens the default composes:

1. **`src/components/custom/goo-blob/types.ts:251`** — `paletteStops: []`. The empty palette falls
   back to the single `color` base, and every demo mount passes that base as
   `color="var(--primary)"`:
   - `demo/stories/substrates/blob.vue:142` (the interaction hero `<GooBlob>` opens at `:139`) — `color="var(--primary)"`.
   - `demo/stories/substrates/blob.vue:209` (the mood hero `<GooBlob>` opens at `:206`) — `color="var(--primary)"`.
   - The README usage block (`src/components/custom/goo-blob/README.md:35`, and a second mount at
     `:354`) ALSO mounts `color="var(--primary)"` with `:config="BLOB_CONFIG_DEFAULTS"` as the canonical
     "calm, lit, ambient brand mark."
   Per CLAUDE.md, `--primary: hsl(24 10% 10%)` — a near-black warm-ink in light mode. So the default
   BODY paints near-black.

2. **`src/components/custom/goo-blob/types.ts:291`** — `rimColor: "var(--foreground)"`. `--foreground`
   is also near-black warm-ink in light mode (the warm-DARK ink the whole token ladder reads). So the
   default RIM is near-black on a near-black body.

The "warm-cream" identity the README asserts is FICTION for the as-shipped default:
   - `README.md:5` — *"OKLCh color perturbation over glass-ui's warm-cream glass identity."*
   - `README.md:45` — *"Pass `BLOB_CONFIG_DEFAULTS` for the stock lit warm-cream droplet."*
   - `README.md:66` — *"the body reads as a calm lit warm-cream bead."*

The only warm-cream surfacing is the SPECULAR/rim sheen (`metaball.frag.ts` `warmCream` OKLCh
L0.97/C0.03/h85), a thin highlight on a dark body — it does NOT make a dark body read cream.

**The live π gate itself documents the dark body.** `tests-visual/blob-render.spec.ts:112-113` reads
verbatim: *"the spread is dominated by the dark var(--primary) body falling to the cream rim"* — the
spec's `domeLumaStd` band (`:118-119`, std 9..80) and the `worstLuma` ceiling (`:130`, ≤250) measure
luma VARIANCE and PEAK, NOT the body MEAN. **A charcoal-bodied bead PASSES both** (it has variance —
dark body to cream rim — and a sub-blown peak), so the existing gate is GREEN over the very defect it
narrates. There is no current arm that measures the resting body's MEAN lightness, which is why the
dark default survived AX.W15 (the `lit:true` flip) and AX.W46 (the calm-not-skeuomorphic re-tune).

This is the precise "headless-green/visually-broken README↔reality lie" the MEMORY flags as the
AX-halt cause (H-cardinal §6, the W15 "Could NOT run a real browser" suspect-complete).

### D2 — the `BlobConfig` top-level surface is a ~50-field / 46-uniform sprawl; the aurora "simplify to atoms" mandate was never applied to blob (the asymmetry; H-blob F3)

`src/components/custom/goo-blob/types.ts:71-166` declares the `BlobConfig` interface with **46 tunable
top-level fields** (verified at HEAD `fba6262`: `sed -n '71,166p' types.ts | grep -cE '^\s+[a-zA-Z]+[?]?:'` → 46);
`src/components/custom/goo-blob/shaders/metaball.frag.ts` declares 46 `uniform`s
(`grep -c '^uniform' src/components/custom/goo-blob/shaders/metaball.frag.ts` → 46; the shader lives under
the component package's `shaders/` subdir, NOT under `composables/glass/webgl/`). The aurora track got a hard "simplify the options set to atoms" mandate
(`PROMPT-CORPUS.md:42`) and SHIPPED a ≤7-atom door (`composables/atoms.ts:89-127`, gated by
`proof:aurora-atoms-roundtrip`). The blob carries the IDENTICAL sprawl and NO simplification clause —
the plan is asymmetric for the same defect class.

The AX synthesis itself (`docs/tranches/AX/research/blob-synthesis.md §8`) flagged
`orbitSpeedScale` / `wobbleScale` as **"derived-but-unread"** — the over-parameterization smell. The
candidate derive-from-a-higher-atom / unread fields visible in `types.ts`:
`orbitSpeedScale:159`, `wobbleScale:160` (the named derived-but-unread pair), `iridSpeed:127`,
`colorNoiseFreq:112` / `colorNoiseSpeed:113`, `hueRange:109` / `satShift:110` / `brightnessShift:111`
(the color-perturbation cohort — candidates to fold under ONE `colorMotion`/perturbation atom),
`sssPower:131`, `rimPower:146`.

This is a genuine gestalt/KISS gap, not a style nit: a 50-knob public config on a single-consumer
primitive is the over-parameterization the overfitting audit forbids.

---

## Goal criterion

A bare `<GooBlob :config="BLOB_CONFIG_DEFAULTS">` (no `color` override) over the demo backdrop paints
a LIGHT, warm, coherent gel bead — the cream living bead the README has always promised — because the
default base is now a light warm-cream OKLCh stop (a default `paletteStops` / `color` base), and the
rim is re-anchored off `var(--foreground)` so it reads as a contrasting curve-defining edge on the
light body rather than near-black on near-black. AND the `BlobConfig` top-level surface is reduced to
an atom set (a measured ceiling): every derived-but-unread field is either WIRED-AND-READ or DELETED,
so no over-parameterized knob survives the overfitting audit. A fresh reader who mounts the defaults
sees the documented look; the README↔render lie is closed.

## Completion criterion

ALL FOUR hold (the HARD GATE set below):
- **(G1)** the W-BLOB1 born-RED `proof:blob-warm-default` gate (which RUNS `blob-warm-default.spec.ts`
  over `PI_TARGETS.blob` / `substrates/goo-blob`) turns GREEN — the resting body box mean OKLCh L reads
  as a LIGHT bead `≥ 0.62` (`WARM_BEAD_L_MIN`; the charcoal default measured ≈ 0.53 at HEAD) in BOTH
  light and dark mode, AND the existing `blob-render.spec.ts` calm-bead BAND still holds
  (`domeLumaStd` 9..80, `worstLuma` ≤250 — no over-bright regression);
- **(G2)** the config-atom-count ceiling gate is GREEN — `BlobConfig` top-level field count ≤ the
  declared ceiling, with the derived-but-unread set deleted (a deletion-proof);
- **(G3)** the full `proof:blob-*` fleet stays GREEN (the render is the truth; the default flip and
  the field prune did not break `proof:blob-render` / `proof:blob-live-truth` / `proof:blob-color-equivalence`
  / `proof:blob-mood-resolved`);
- **(G4)** the own-surface captured DELTA exists and is machine-enforced — `proof:live-verified-ledger
  --tranche=AY` GREEN over the W-BLOB2 row, whose `audit/visual/W-BLOB2-DELTA.md` references
  own-surface PNGs of `/substrates/goo-blob` + `/substrates/blob-mood` at ≥2 viewports × {light,dark}
  + ≥5 hover frames.

See HARD GATE.

---

## Edit-sites (exact)

### Arm 1 — the light warm-cream default base (D1)

1. **`src/components/custom/goo-blob/types.ts:251`** — replace `paletteStops: []` with a DEFAULT
   light warm-cream OKLCh ramp. Derive it deterministically from a light warm-cream anchor via the
   EXISTING `deriveBlobPalette(seed, { stopCount, harmony })` producer (`src/composables/color/index.ts:256`)
   — do NOT hand-roll a parallel ramp (inv J-10). The anchor is a LIGHT OKLCh stop in the warm-cream
   arc (the same family as the shader's `warmCream` L0.97/C0.03/h85 sheen, but as a *base body* light
   stop — e.g. an anchor near `oklch(0.86 0.04 80)`, the cream-bead body lightness the README's
   "warm-cream bead" implies; the exact L/C/h is tuned to the G1 floor, not pasted). `deriveBlobPalette`
   distributes `n=stopCount` stops `0=deep body → 1=lighter satellite` with a midpoint chroma-bump, so
   the default ramp is an in-family light cream → slightly-warmer-satellite set. The light base body is
   what makes a bare `<GooBlob>` (no `color`) paint the cream bead, since the empty-palette fallback to
   `color` no longer applies.
   - The stops are stored as the resolved CSS-color form (`oklchStopToHex`-mapped, mirroring the demo's
     `paletteStops` shape at `blob.vue:73-76`) so `BLOB_CONFIG_DEFAULTS` stays a plain serializable
     `BlobConfig` (no live producer call baked into the const). The derivation is run ONCE to mint the
     literal stops with a code comment recording the anchor + `deriveBlobPalette` options, so a future
     reader can re-derive.

2. **`src/components/custom/goo-blob/types.ts:291`** — re-anchor `rimColor`. The README narrates the
   rim as *"a foreground-aware min-contrast rim guard keeps the curved rim legible even when a
   `var(--primary)` blob in dark mode resolves a rim near the body color"* — but on a LIGHT cream body
   `rimColor: "var(--foreground)"` (near-black) now reads as a hard dark ring. Re-anchor the default
   rim to the warm-ink-CONTRAST relationship the new light body needs: keep the rim a CONTRASTING
   curve-definer against the cream body (a warm mid-tone, NOT the near-black `--foreground` ring, NOT a
   near-white invisible rim). Tune the exact `rimColor` against the G1 readback (the rim must define the
   silhouette curve on the light body without ringing a dark band — the `silhouetteCV`/`domeLumaStd`
   bands stay satisfied). If the shader's min-contrast rim guard already lifts the rim off the body
   adequately when the rim is a mid-tone, the default `rimColor` becomes a warm mid OKLCh stop; record
   the choice in a code comment citing the G1 measured ratio.

3. **`demo/stories/substrates/blob.vue:142`** + **`demo/stories/substrates/blob.vue:209`** — remove the
   `color="var(--primary)"` override on the interaction hero and the mood hero so each mounts the new
   light-cream DEFAULT (the demo is the canonical consumer; it must show the default identity, not
   override it to dark). The mood hero's `seed`/`harmony` palette UI stays (it drives `paletteStops`
   live via `deriveBlobPalette` at `blob.vue:69-76`); only the dark `color` BASE is dropped so the
   resting/idle state is the cream default. The `dotColors` array (`blob.vue:29-34`, the WatercolorDot
   swatches) keeps `var(--primary)` as a deliberate dark swatch in the static register — that is a
   color-tour swatch, not the default-identity claim, so it stays (no over-reach into the static
   register).

4. **`src/components/custom/goo-blob/README.md:35` + `:354`** — update BOTH usage-block mounts to drop
   `color="var(--primary)"` (or change it to the cream default), so the README's "calm, lit, ambient
   brand mark" examples match the shipped default. The `README.md:5,45,66` "warm-cream" prose is now
   TRUE-of-the-default — no doc edit needed there beyond confirming the claim now holds (the render
   makes it true). If any README line still implies the default is `var(--primary)`-tinted, strike it.

### Arm 2 — config simplification to atoms (D2)

5. **`src/components/custom/goo-blob/types.ts:71-166`** — reduce the `BlobConfig` top-level surface to
   an atom set. The discipline (mirroring the aurora atoms door, NOT a 1:1 copy — the blob's atoms are
   blob-shaped):
   - **DELETE the derived-but-unread fields** the AX synthesis flagged + any field a fresh trace shows
     is never read by `useMetaballRenderer` / `useBlobSatellites` / `useBlobMood` / the shader upload.
     Start from the synthesis-named pair (`orbitSpeedScale:159`, `wobbleScale:160`) — TRACE each:
     if a field is read only to multiply by `1.0` (the default, an identity no-op) and no consumer
     ever sets it off `1.0`, it is dead → delete it and fold its effect into the atom it derives from.
     The deletion is a deletion-proof (the field GONE + the render byte-identical via G3).
   - **FOLD the color-perturbation cohort** (`hueRange:109`, `satShift:110`, `brightnessShift:111`,
     `colorNoiseFreq:112`, `colorNoiseSpeed:113`) under ONE perturbation atom if they co-vary (the
     aurora `colorEnergy` precedent — one scalar over the entangled cluster), OR keep the ones a
     consumer actually tunes and delete the rest. The criterion is the overfitting bar: a field
     survives only if ≥1 real consumer sets it OR it is load-bearing for the default look.
   - The MoodParams interface (`types.ts:16-30`) and the satellite-internal state (`types.ts:41-68`)
     are NOT the public config surface — they are internal/per-mood derived state; the ceiling counts
     the `BlobConfig` PUBLIC top-level fields only (`types.ts:71-166`).
   - `BLOB_CONFIG_DEFAULTS` (`types.ts:168-343`) is updated in lockstep — every deleted field's default
     line is removed; every folded field's default moves to its atom.

6. **`scripts/proof-blob-config-atoms.mjs`** (NEW) — the atom-count ceiling gate (modeled on
   `scripts/proof-aurora-atoms-roundtrip.mjs`'s source-witness arms). It:
   - parses `src/components/custom/goo-blob/types.ts`, counts the `BlobConfig` interface's top-level
     fields, and asserts the count ≤ the declared CEILING (≤12 atoms per §2; the ceiling is set at the
     post-prune count, born-RED at the pre-prune **46** fields verified at HEAD — the gate REDS at HEAD
     before the prune lands);
   - asserts the named derived-but-unread fields are GONE (`grep` over `src/` for
     `orbitSpeedScale|wobbleScale` + any other field the prune deletes = 0 — a deletion-witness grep,
     the legitimate kind per SPEC.md §Hard Gates);
   - asserts `BLOB_CONFIG_DEFAULTS` deep-equals a valid `BlobConfig` (every remaining field has a
     default; no orphan field) — the round-trip arm;
   - writes its artefact via the shared `gate-output.mjs` (`gateArtifactPath(..., "AY-blob-config-atoms")`).
   - Wire into `package.json` as `"proof:blob-config-atoms": "node scripts/proof-blob-config-atoms.mjs"`
     AND register it in the `scripts/gates.mjs` `GATES` array (the local `proof:all` driver — a gate
     wired only into `package.json` but absent from the `GATES` registry never runs under `proof:all`;
     the existing 12 `proof:blob-*` are each in `GATES` — append the new `proof:blob-config-atoms` row
     alongside them as the 13th, `tags: ["local"]`). **SHARED-WRITE NOTE:** `scripts/gates.mjs` `GATES`
     + the `package.json` `proof:*` block are written by multiple AY waves (W-FF2 appends two fourier
     gate rows, W-GOD1 CI-promotes `proof:no-god-module`, W-CLOSE1/W-LIVE1/W-COLOCATE touch the
     registry). The edit is **append-only to the `GATES` array** (one new object literal at the tail of
     the blob cluster), never a re-order of existing rows — so the integrating orchestrator merges the
     parallel additions cleanly. W-BLOB2's append is independent of W-FF2's (distinct gate ids); no
     serialization needed beyond the append-only discipline.

### Arm 3 — turn the W-BLOB1 born-RED default-warmth gate GREEN (D1's binding ceiling)

**The default-warmth gate ALREADY EXISTS — W-BLOB1 shipped it born-RED.** Do NOT mint a parallel
`bodyMeanL` arm in `blob-render.spec.ts` (that would be a second measurement path — the overfitting the
audit forbids). The harness W-BLOB1 landed is:
- `tests-visual/blob-warm-default.spec.ts` — mounts `<GooBlob>` with `BLOB_CONFIG_DEFAULTS`, decodes the
  body via `grab(locator)` + the central-body-box `bodyMeanL(png, bg)` helper (excludes the rim/AA ring),
  and asserts `bodyMeanL >= WARM_BEAD_L_MIN` (`WARM_BEAD_L_MIN = 0.62`).
- `scripts/proof-blob-warm-default.mjs` — the fail-closed DRIVER; `package.json` carries
  `"proof:blob-warm-default"`.

This gate is **BORN-RED at HEAD** (the charcoal body box measures `≈ 0.53`, below the `0.62` floor — the
honest margin; NOT a claimed `L < 0.30`, since the central-body box necessarily catches some lit-rim/AA
cream). W-BLOB2's job is to ship the light warm-cream default base (Arm 1) so the resting body box reads
`≥ 0.62` and **`proof:blob-warm-default` turns GREEN** — the clean born-RED→GREEN transition the gate was
designed for.

7. **`tests-visual/blob-warm-default.spec.ts`** — VERIFY (no new arm needed) the existing
   `bodyMeanL >= 0.62` assert passes after Arm 1 ships the cream default; if the gate runs ONLY one
   color scheme today, EXTEND it to run under BOTH `colorScheme: "light"` AND `colorScheme: "dark"` (the
   cream body is a fixed light OKLCh base, not a token that flips — it must read light in BOTH modes).
   Do NOT lower `WARM_BEAD_L_MIN` to make the gate pass — the floor is the contract; the DEFAULT must
   meet it (if the cream base cannot clear 0.62 cleanly, that is the G1 two-failed-lifts named successor,
   NOT a floor relaxation).
8. **`tests-visual/blob-render.spec.ts`** — the EXISTING `BLOB_CONFIG_DEFAULTS` band test (`:448`) +
   the light/dark grid guard (`:619`) STAY and must still pass after the default flip: `domeLumaStd`
   (9..80), `worstLuma` (≤250), `silhouetteCV`, the four-side containment, the field gradient. The cream
   body must still be a LIT dome (variance present), not a flat pale slab — the paired floor∧ceiling:
   light-enough (the W-BLOB1 `bodyMeanL ≥ 0.62` floor) AND lit-enough∧not-over-bright (the existing
   `blob-render.spec.ts` bands). This is the no-regression arm: the warmth gate is W-BLOB1's
   `blob-warm-default.spec.ts`; this clause asserts the CONTAINMENT/variance fleet did not regress.

### Arm 4 — the captured own-surface DELTA (G4; the cardinal lesson)

9. **`docs/tranches/AY/audit/visual/W-BLOB2-DELTA.md`** (NEW) — the captured DELTA, conforming to the
   AY `CAPTURE-PROTOCOL.md` (minted by W-CARDINAL-INFRA). It references own-surface PNGs (filenames
   `W-BLOB2-*.png` so the deepened ledger filename-match binds):
   - `/substrates/goo-blob` (the default-identity surface) — light + dark, ≥2 viewports (375 mobile +
     1280 desktop), showing the BEFORE (charcoal default, the AX W46 `blob-default-AFTER-calm.png` is
     the BEFORE reference) → AFTER (cream bead).
   - `/substrates/blob-mood` (the mood/palette surface — `PI_TARGETS` blob-mood obligation) — light +
     dark, the resting cream default + ≥5 hover-flick frames showing the centroid lean (the H-cardinal
     "≥5 hover frames" depth floor for a motion surface).
   - The DELTA records the measured `bodyMeanL` BEFORE (≈0.53 charcoal body box) vs AFTER (≥0.62 cream) — the paired-π number
     that makes the warmth claim falsifiable, not prose.
10. **`docs/tranches/AY/audit/visual/VISUAL-ALLOWLIST.json`** — add `"W-BLOB2"` (the wave changed
    pixels; the ledger evaluates its row).
11. **`docs/tranches/AY/PROGRESS.md`** — the W-BLOB2 row carries the `live-verified` status ONLY when
    the DELTA lands (the gate enforces this; the wave cannot mint `live-verified` from prose).

---

## HARD GATE (evidence-backed)

The wave closes GREEN on FOUR binding conditions, the first two BORN-RED at HEAD:

**(G1) The W-BLOB1 born-RED default-warmth gate turns GREEN — the load-bearing ceiling (RUNTIME-OBSERVATION artefact).**
`npm run proof:blob-warm-default` (the gate W-BLOB1 shipped born-RED — `scripts/proof-blob-warm-default.mjs`
runs `tests-visual/blob-warm-default.spec.ts`) exits 0: the resting body box mean OKLCh L
`≥ WARM_BEAD_L_MIN` (`0.62`) over `PI_TARGETS.blob` (`/substrates/goo-blob`) in BOTH `colorScheme: light`
AND `dark`, WHILE the existing `blob-render.spec.ts` `domeLumaStd` (9..80) + `worstLuma` (≤250) +
`silhouetteCV` + four-side-containment + field-gradient bands still pass. **Born-RED→GREEN transition:**
the `var(--primary)` charcoal default's body box measures `≈ 0.53` at HEAD (below the 0.62 floor — the
gate REDS today); it GREENS only when the light-cream default base ships. This is NOT tautological with
the existing fleet (which measures variance/peak, both of which the dark default already satisfies — see
D1). **Bite-check:** revert `paletteStops` to `[]` + the demo `color="var(--primary)"` →
`proof:blob-warm-default` REDS (body box drops back below 0.62).

**(G2) The config-atom-count ceiling — born-RED deletion-proof (build/parse artefact).**
`npm run proof:blob-config-atoms` exits 0: the `BlobConfig` top-level field count ≤ the declared
CEILING (≤12 per §2; set at the post-prune count, RED at the pre-prune **46** verified fields), the
named derived-but-unread fields (`orbitSpeedScale`/`wobbleScale` + the rest the prune deletes; NOTE per
RESEARCH.md §1 OPEN-2 these two are now *read* by `proof:blob-mood-resolved` — the prune folds them into
their parent atom, deletion-proven, NOT a dead-field delete) are GONE (`grep` over `src/` = 0), and
`BLOB_CONFIG_DEFAULTS` round-trips to a valid `BlobConfig` (no orphan field). **Born-RED at HEAD:** the
gate REDS at 46 fields. **Bite-check:** re-add a deleted field → the count exceeds the ceiling OR the
deletion grep REDS.

**(G3) The full `proof:blob-*` fleet stays GREEN (the render is the truth — no regression from the
flip/prune).**
`npm run proof:blob-render && npm run proof:blob-live-truth && npm run proof:blob-color-equivalence &&
npm run proof:blob-mood-resolved && npm run proof:blob-smin-normalized && npm run proof:blob-space-gamma`
all exit 0. The default-base flip and the field prune did NOT break the contained-field render, the
ColorResolver equivalence, or the mood resolution. (G1 is the SEPARATE `proof:blob-warm-default` gate;
this clause asserts the REST of the fleet did not regress.)

**(G4) The own-surface captured DELTA — machine-enforced (the cardinal lesson).**
`npm run proof:live-verified-ledger --tranche=AY` (the AY-pathed gate minted by W-CARDINAL-INFRA) exits
0 over the W-BLOB2 row: `docs/tranches/AY/audit/visual/W-BLOB2-DELTA.md` exists, references ≥1
own-surface PNG whose filename matches `^W-BLOB2-` (the deepened filename-match binding), covers
`/substrates/goo-blob` + `/substrates/blob-mood` at ≥2 viewports × {light,dark} + ≥5 hover frames, and
the W-BLOB2 `PROGRESS.md` row is `live-verified` (un-mintable without the on-disk PNG DELTA). The DELTA
records the paired `bodyMeanL` BEFORE (≈0.53 charcoal body box) → AFTER (≥0.62 cream) — the falsifiable
warmth number, not a prose "looks cream now."

**Why this gate, not grep-alone:** G1 is a RUNTIME-OBSERVATION readback (a real-device π measurement of
the painted body's perceptual lightness) that is BORN-RED against the current charcoal default — exactly
the "new evidence-backed bar the current state would FAIL" H-blob F6 demands (the existing fleet is
already green and cannot drive a perfection wave). G2 is a born-RED deletion-proof + parse-count
(allowed hard-gate kinds; the deletion grep is the legitimate ABSENCE-witness, not grep-for-runtime).
G3 is RUNTIME gate output proving the render survived the change. G4 is the machine-enforced captured
DELTA (`proof:live-verified-ledger`, not prose "capture") closing the cardinal lesson over the blob's
own surface — the single largest open live-truth gap H-cardinal §6 names.

---

## What this wave does NOT do (scope fence)

- It does **NOT** carve `useMetaballRenderer` (the <500 leaf-carve is W-GOD1, which lands FIRST so
  this wave's `types.ts`/upload-adjacent edits do not re-conflict — the H-blob F5 ordering). G3 cites
  the carve's gates staying green as the shared invariant.
- It does **NOT** re-run the settled 32-agent SOTA sweep (H-blob F1 — the AX synthesis already
  concluded "no algorithm changes needed"). No shader algorithm changes; the default-base flip is a
  CONFIG-default change + a rim re-anchor, not a new lighting model.
- It does **NOT** land the second consumer (value.js repatriation / speedtest / slides) NOR strip the
  speculative DI seam — that is the H-blob F4 disposition, routed to **W-BLOB3** (bind a real consumer
  #2 OR formally book demo-only + strip the DI) and recorded in the AY overfitting audit (W-CLOSE1).
- It does **NOT** re-implement `deriveBlobPalette` — the default light ramp is derived through the
  EXISTING `/color` producer (inv J-10; no parallel color math).
- It does **NOT** touch the `--surface-tint-*` in-srgb family or the `--glass-*` tint axis — the blob's
  color is its own OKLCh in-shader path, disjoint from the surface-tint ladder.

## Named successor (on miss)

- If the cream BASE cannot clear G1's `WARM_BEAD_L_MIN` (`0.62`) floor without breaking the
  `domeLumaStd`/`worstLuma` band (a light body that reads flat or over-bright), the cream-base OKLCh
  anchor (the `paletteStops` lightness/chroma, Arm-1 edit) is re-tuned against the live readback ONCE —
  the FLOOR (`0.62`) is the contract and is NOT lowered (the warmth gate's truth is fixed; the body is
  what moves). A second sub-threshold lift fires the two-failed-lifts trigger and the wave closes at its
  best cream state with the residual recorded in `PROGRESS.md` (the named successor is a W-BLOB-TUNE
  follow over the base anchor, not a floor relaxation, not a bare deferral).
- If the atom prune (G2) reveals a field IS load-bearing for a real consumer (the scope-reveal
  trigger), that field stays and the ceiling is set one higher with the rationale recorded in the
  W-BLOB2 row + the W-CLOSE1 overfitting audit — never a silent ceiling bump.
- The second-consumer obligation is NOT a W-BLOB2 miss — it is W-BLOB3 by design (the F4 routing).
