# BA.W-NO-GRAY — the warm-chroma floor (the LIGHT register off gray)

**Name**: W-NO-GRAY - the warm-chroma floor: the neutral ladder + glass plates + borders re-saturated onto the warm identity
**Opens after**: W-DARK-MATERIAL (Batch 1, SEQUENCED — both write the token ladder; this wave is Batch 1b: the LIGHT register's chroma, after the dark register's rebuild)
**Agents**: 1
**Hard gate**: `proof:no-gray` (born-RED) — the named warm tokens resolve OKLab chroma ≥ the floor in BOTH modes, the default Card/Button plates read warm (not achromatic) live, the AA pairs re-ratify (chroma-only moves, L preserved) — plus the π chroma readback + the `proof:ba-gestalt` verdict riding the glass surface roster.
**Status**: SPEC

## Goal criterion

"No gray" (R10-5, verbatim): the system's warm cream/ink identity actually RESOLVES —
a default Card, a default (glass) Button, the borders, the muted register all read as
warm material in both modes, because the token ladder's specified warmth survives to
the painted pixel instead of starving below the perceptual chroma floor.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

Grounding: `audit/fleet/r10-glass-no-gray.md` (the census — read it WHOLE; the
resolved-OKLab table is the defect list) + `fleet/r10-nogray-{card,buttons}-{light,dark}.png`
+ R9 (`USER-AUDIT-2026-06-12-R9.md`, the self-engage gray — OWNED by W-DARK-MATERIAL
scope 7, a BASELINE row here, not re-fixed) + R10-5 ("Use Fable more a better
designed glass system for cards, buttons, etc. **No gray.**").

**THE ROOT (one systemic defect, one family fix):** the warm-48/warm-24 neutral
ladder is SPECIFIED warm but RESOLVES achromatic — at 6–10% saturation across
L40–95, the painted chroma lands C 0.002–0.016, below the ~0.020 perceptual floor.
The hue is right; the chroma is starved. The census rows (re-grep/re-probe at HEAD;
floor C < 0.020, live both arms):

| id | token/surface | resolved C (light/dark) | verdict | consumers |
|---|---|---|---|---|
| G1 | default Card plate (the self-engage) | 0.0027 / ~0.005 | WARM-IT — **owned W-DARK-MATERIAL s7** (baseline) | every content card |
| G3 | `--neutral-2`/`--secondary` | 0.0055 / 0.0048 | WARM-IT | 10 |
| G4 | `--neutral-3`/`--accent` | 0.0085 / 0.0067 | WARM-IT | the bg-accent family |
| G5 | `--neutral-4`/`--border` | 0.0128 / 0.0092 | WARM-IT (separators stay perceptually neutral-CALM, but on the warm hue) | 22 family |
| G6 | `--neutral-5`/`--muted-foreground` | 0.0155 / 0.0117 | WARM-IT — the most-consumed gray | 57 family |
| G7 | dark `--primary` | — / 0.0055 | CHROMA-IT — **owned W-DARK-MATERIAL s4** (baseline) | filled controls |
| G8 | default/glass Button plate | 0.0018 / 0.0044 | the grayest; TWO chains — the achromatic plate AND the flat backdrop | every bare `<Button>` |
| — | warning-fg, scrim/shadow ink, the page/muted SURFACE | — | KEEP-NEUTRAL (luminance registers, legitimately calm) | — |

G8's second chain (the flat backdrop — glass with nothing to transmit) is OWNED by
W-STAGE (Batch 6, the backdrop map); this wave fixes the PLATE chain.

## The design (BINDING — Fable, R10-5)

**Three levers, ONE token-family edit, zero per-site change (token-first):**

1. **L2 — the warm-chroma FLOOR on the neutral ladder (the keystone; net-new
   register).** Re-saturate the `--neutral-*` ladder (and its semantic aliases
   `--secondary`/`--accent`/`--border`/`--muted-foreground` where they derive) so
   every WARM-IT row resolves C ≥ ~0.020 at its CURRENT L (chroma-only moves — the
   L column is the contrast contract; AA ratios are preserved to first order and
   re-ratified by the gate). The floor is declared as a documented design constant
   (the gate's assert value), not a runtime token — the ladder VALUES carry it.
2. **L1 — the warm bias in the light glass plates.** The `--glass-bg-*` mix recipe
   (`glass.css:127-138`) carries the warm identity into the painted plate (the
   light plate today mixes toward an effectively-achromatic white) — bounded: the
   plate stays the cream family, never a tinted color cast; calibrated against the
   G1/G8 live reads.
3. **L3 — the border warm re-anchor.** `--border`/`--glass-border-*` re-anchor onto
   the warmed ladder (rides L2 where derived; explicit where independent) — the
   hairline reads warm-ink, not concrete.

**The bars:** the KEEP-NEUTRAL list is untouchable (warning-fg, scrim/shadow ink,
the page/muted SURFACES — luminance registers); the `in srgb` `--surface-tint-*`
family + interpolation space are fenced (AW.W26); dark-arm values land only where
the census names a dark row (the dark REGISTER design is W-DARK-MATERIAL's — this
wave warms the dark arms of the SAME census rows in lockstep, it does not re-design
dark); no new compositing seam.

## Scope

1. L2: re-saturate the census's WARM-IT neutral-ladder rows (both arms, lockstep
   `.dark` + `light-dark()` per the §2c discipline) to the chroma floor at constant
   L; record per-token before/after OKLab in the DELTA.
2. L1: the light `--glass-bg-*` warm bias at the mix seam (bounded, calibrated
   against the live Card/Button reads).
3. L3: the border family warm re-anchor.
4. Re-ratify the AA pairs over the warmed tokens (the gate's contrast arm); the
   KEEP-NEUTRAL list asserted untouched.
5. `proof:no-gray` + `tests-visual/no-gray.spec.ts` (the chroma readback: the named
   tokens + the live default Card/Button plates resolve C ≥ floor in both modes) +
   the DELTA + the CLAUDE.md identity record (the warm-chroma floor as house canon)
   + MIGRATION NOTE rows (token-identity evolution — consumers who overrode the
   neutrals re-pin).

## Triumvirate Dispatch

- **The chroma-vs-calm tension**: if the floor makes the muted/border registers read
  TINTED (a color cast, not warm material) after two calibration passes, halt —
  the floor value itself is the suspect; triumvirate (re-derive the floor against
  the icons-reference warm reads), do not ship a cast.
- **AA regression**: any warmed pair dropping below its floor is NOT
  local-edit-recoverable by darkening (that re-grays) — triumvirate.
- **Scope-reveal**: if the glass-bg warm bias cannot land without touching the
  SHARED rung α recipe (the light/dark shared seam W-DARK-MATERIAL §Triumvirate
  fences), triumvirate — never edit the shared recipe unilaterally.

## File Bounds

| File | Access |
|---|---|
| `src/styles/tokens/color-radius.css` | modify (the neutral ladder + semantic aliases — the L2 floor) |
| `src/styles/tokens/dark-arm.css` + `src/styles/tokens/light-dark.css` | modify (the lockstep dark arms of the SAME census rows — values only, the dark design is W-DARK-MATERIAL's landed work) |
| `src/styles/tokens/glass.css` | modify (the L1 light plate warm bias at the mix seam — W-DARK-MATERIAL landed; this appends to the same file SEQUENCED, Batch 1b) |
| `scripts/proof-no-gray.mjs` + `tests-visual/no-gray.spec.ts` | create |
| `package.json` + `scripts/gates.mjs` | modify (append-own-row) |
| `CLAUDE.md` + `MIGRATION.md` | modify (the identity record + NOTE rows) |
| `docs/tranches/BA/audit/visual/W-NO-GRAY-DELTA.md` | create |

Do NOT touch: the `--surface-tint-*` family + `in srgb` space (AW.W26); the
KEEP-NEUTRAL rows; the blur radii + spring durations (W-GLASS-CAL); the self-engage
block (W-DARK-MATERIAL s7, landed — read-only); the shared rung α recipe; GL
shaders; ppmycota purple; slides M docs.

### Disjointness

One agent; Batch 1b runs ALONE (sequenced after W-DARK-MATERIAL, before Batch 2) —
the same nothing-races-the-substrate rationale as Batch 1a (DAG §2).

## Hard Gate

`proof:no-gray` (born-RED) + the π (`tests-visual/no-gray.spec.ts`):

1. **W1 — the floor holds.** π: each census WARM-IT token's RESOLVED OKLab chroma
   ≥ the floor in BOTH modes (getComputedStyle → oklab parse). RED at HEAD (the
   census table values).
2. **W2 — cards + buttons read warm.** π: the default Card plate and the default
   (glass) Button plate composite C ≥ floor in both modes over the demo's standard
   backdrop (the G1/G8 rows dead). RED at HEAD (0.0018–0.005).
3. **W3 — no cast, no contrast loss.** The KEEP-NEUTRAL rows byte-unchanged
   (grep); every re-ratified AA pair ≥ its floor (the contrast arm); the L values
   of the warmed tokens within a declared tolerance of HEAD (chroma-only moves —
   anti-evasion: a lightness rewrite masquerading as warming reds).
4. **The gestalt verdict (BA invariant 4)**: the glass/cards/buttons roster surface
   at W-REFLECT2 — "does the system read WARM, no gray?" — judged whole-page, both
   modes, with the R10-5 words as the bar.

## Named successors

If the warm floor exposes residual gray on COMPONENT-LOCAL hardcodes (a baked
`bg-card`-class plate off the token system), those route to the owning component
waves (W-PAGER already owns the counter's; the census found no other off-token
plate — re-grep at close).

## Commit Plan

- `feat(tokens)!: the warm-chroma floor — the neutral ladder + light glass plates + borders re-saturated onto the warm identity; no gray (BA.W-NO-GRAY)`
