# W-DOC-FRESHEN — DELTA (the glass-blur-resting composite-override anti-idiom killed + gated)

## Freshness header

| field | value |
|---|---|
| Capture date | 2026-06-17 |
| HEAD sha (born-RED baseline) | `a045a854` |
| Gate | `proof:doc-override-idiom` (born-RED → GREEN; W1–W4 + W5 no-regression) |
| Binding evidence | the captured before/after example diff + the born-RED→GREEN gate log + the three self-test fixture reds (this wave paints ZERO pixels — no `proof:ba-gestalt`, no π) |
| Source read live | `src/styles/tokens/glass.css` `--glass-blur-resting-radius: 10px` (line 77) — the gate re-reads it, never a hardcoded number |

## §0 RE-GROUND — line drift recorded (spec authored at `f3c4170e`, HEAD `a045a854`)

The spec cited line anchors that have drifted; the mechanisms are intact. Re-grepped at HEAD:

| cite (spec) | cite (HEAD) | mechanism (unchanged) |
|---|---|---|
| `glass.css:45` (primitive) | `glass.css:77` | `--glass-blur-resting-radius: 10px;` (the consumer-tunable primitive) |
| `glass.css:76` (composite) | `glass.css:108` | `--glass-blur-resting: blur(calc(var(--glass-blur-resting-radius) * var(--glass-level))) saturate(1.05);` |
| `CLAUDE.md:649-653` | `CLAUDE.md:854-858` | the `## Consumer wiring` CSS example (`/* then override tokens locally */`) |
| `README.md:61-63` | `README.md:60-64` | the public-facing twin (`/* override tokens locally for your project */`) |

Two grounding findings updated since authoring:
- **`proof:readme-meta-clean` is GREEN at HEAD** — W-CI-GREEN (Batch 0) already landed the dock-table sync (the spec's "one live violation" is resolved). So this wave's W5 no-regression clause reads a clean base.
- **The example is gate-free** — `grep -rln 'glass-blur-resting' scripts/` returns only the SOURCE-reading `proof-glass-cal.mjs` / `proof-dark-material.mjs` / `proof-glass-depth.mjs`; NO gate read the doc example. This wave mints the first machine check.

## The defect (precise — the anti-idiom on TWO axes)

The `## Consumer wiring` CSS example in CLAUDE.md AND the public README both taught the consumer to FIGHT the W-GLASS-CAL machinery:

```css
:root {
    --glass-opacity-resting: 0.82;
    --glass-blur-resting: blur(12px);   /* ← the anti-idiom, TWICE wrong */
}
```

1. **It overrides the COMPOSED token.** `--glass-blur-resting` is a GENERATED composite — `blur(calc(var(--glass-blur-resting-radius) * var(--glass-level))) saturate(1.05)` — that threads the `--glass-level` opacity axis (AX.W54) AND the `saturate(1.05)` luminosity companion. A consumer who writes `--glass-blur-resting: blur(12px)` DESTROYS both (the surface stops responding to `--glass-level`, loses its saturate leg). The CONSUMER-tunable knob is the `--glass-blur-resting-radius` PRIMITIVE.
2. **The value is the PRE-CAL number.** `12px` is the `proof-glass-cal.mjs` `PRE_WAVE_RADII` value BEFORE BA.W-GLASS-CAL dialed the ladder back ~15-20%. The shipped value is `10px`. A consumer copying it reverts the cal.

## The fix (before → after)

### README.md (the public-facing copy — fixed on disk by this wave)

```diff
 /* override tokens locally for your project */
 :root {
     --glass-opacity-resting: 0.82;
-    --glass-blur-resting: blur(12px);
+    /* the consumer-tunable radius primitive — the composed --glass-blur-resting
+       threads --glass-level + saturate, never override it directly */
+    --glass-blur-resting-radius: 10px;
 }
```

### CLAUDE.md (RETURNED to the orchestrator — orchestrator-owned, applied out-of-band)

The byte-identical example correction + the override-the-primitive consumer canon line. See `claudeMdEdits` in the structured result. The `--glass-opacity-resting: 0.82` line is KEPT in BOTH (it is a LEGITIMATE direct-input override — the bg recipe reads it through `--glass-level`), so the example now teaches BOTH idioms: a direct-input knob (`--glass-opacity-resting`) and a composite-feeding primitive (`--glass-blur-resting-radius`).

## The gate — `proof:doc-override-idiom` (born-RED → GREEN)

`scripts/proof-doc-override-idiom.mjs`, tagged `["local","ci"]` (a static doc read, headless-safe, no Playwright). Four falsifiable witnesses + the live-source-read discipline (the gate re-reads `glass.css`, never a hardcoded number):

- **W1** — the example overrides the `--glass-blur-resting-radius` PRIMITIVE in BOTH files; a bare `--glass-blur-resting:` direct override REDS (the anti-idiom guard).
- **W2** — the cited radius value EQUALS the live-read `glass.css` `--glass-blur-resting-radius` (`10px` at HEAD).
- **W3** — the two copies are byte-identical on the override declarations (the parity guard).
- **W4** — CLAUDE.md records the override-the-primitive consumer canon ("override the `--glass-blur-*-radius` primitive … never the composed `--glass-blur-*` directly").

### Born-RED log (HEAD `a045a854`, BEFORE any edit — both files show the anti-idiom)

```
proof:doc-override-idiom — the consumer-wiring example overrides the -radius PRIMITIVE (not the composite), byte-parity, value live-read from source
  shipped --glass-blur-resting-radius : 10px
  CLAUDE.md override decls            : --glass-opacity-resting: 0.82; · --glass-blur-resting: blur(12px);
  README.md override decls            : --glass-opacity-resting: 0.82; · --glass-blur-resting: blur(12px);
  byte-parity (W3)                    : ✓   (both wrong identically)
  consumer canon recorded (W4)        : ✗
  ✗ W1 CLAUDE.md — the example overrides the COMPOSED token (--glass-blur-resting:); …
  ✗ W1 CLAUDE.md — the example does not override the --glass-blur-resting-radius primitive
  ✗ W1 README.md — the example overrides the COMPOSED token (--glass-blur-resting:); …
  ✗ W1 README.md — the example does not override the --glass-blur-resting-radius primitive
  ✗ W4 — CLAUDE.md does not record the override-the-primitive consumer canon
  status: FAIL
```

### Transitional state (README fixed, CLAUDE.md awaiting the orchestrator edit)

```
  CLAUDE.md override decls            : --glass-opacity-resting: 0.82; · --glass-blur-resting: blur(12px);
  README.md override decls            : --glass-opacity-resting: 0.82; · --glass-blur-resting-radius: 10px;
  byte-parity (W3)                    : ✗   (README fixed, CLAUDE not yet → divergence — W3 correctly fires)
  ✗ W1 CLAUDE.md … / ✗ W3 divergence / ✗ W4 no-canon
  status: FAIL
```

### GREEN proof (README on disk + the RETURNED CLAUDE.md block + canon line)

Proven via the detector harness over the intended CLAUDE.md form (the orchestrator applies the same edit):

```
shipped: 10px
CLAUDE decls: [ '--glass-opacity-resting: 0.82;', '--glass-blur-resting-radius: 10px;' ]
README decls: [ '--glass-opacity-resting: 0.82;', '--glass-blur-resting-radius: 10px;' ]
violations: NONE — GREEN
```

## The three self-test fixture reds (each proving the gate bites)

| fixture | the planted defect | the witness that fires |
|---|---|---|
| **A — composite-override** | both files `--glass-blur-resting: blur(12px)` (the pre-wave form) | W1 (composite-override + no-primitive), ×2 files |
| **B — copy-divergence** | one file `10px`, the other `12px` (primitive form) | W2 (the `12px` copy stale) + W3 (divergence) |
| **C — stale-value** | both cite `10px`, the source moved to `9px` | W2 (both copies stale vs source), ×2 files |
| GREEN control | both override the primitive at the shipped value | NONE (PASS) |

```
A composite-override: [ 'W1 C composite-override', 'W1 C no-primitive', 'W1 R composite-override', 'W1 R no-primitive' ]
B copy-divergence:    [ 'W2 R stale 12px!=10px', 'W3 divergence' ]
C stale-value:        [ 'W2 C stale 10px!=9px', 'W2 R stale 10px!=9px' ]
GREEN control:        []
```

## Sibling-gate no-regression (W5)

| gate | status at close |
|---|---|
| `proof:readme-meta-clean` | PASS (10 surfaces scanned, 27 dock gates live — W-CI-GREEN's dock-table sync untouched) |
| `proof:glass-cal` | PASS (`resting=10` — the SOURCE recipe is READ, never edited) |
| `proof:doc-consistency` | PASS (42 custom dirs / 11 deps cited) |
| `proof:design-md-current` | PASS (0 currency violations) |
| `proof:gate-script-parity` / `proof:gate-manifest-sound` | run by the orchestrator AFTER the `package.json` + `gates.mjs` registration land (the gate row is `["local","ci"]`, headless-safe, no :5199 default — clause-4 clean) |

## What this wave did NOT touch (the fences)

- **`src/styles/tokens/glass.css`** — the SOURCE recipe is correct; this wave READS the `--glass-blur-resting-radius` value, never re-tunes it (W-GLASS-CAL's frozen bound).
- **`src/components/custom/dock/README.md`** — the dock gate-table rows are W-CI-GREEN's single-owned bound (already landed; `readme-meta-clean` GREEN).
- **`docs/precepts/design-idioms.md`** — W-PRECEPT-SYNC owns the BINDING idiom home; this wave records only the CONSUMER-facing rule in CLAUDE.md. The LIBRARY-author "why the composite is generated" idiom is booked to W-PRECEPT-SYNC (coordination, not a double-write).
- The new-viz READMEs (border-progress / concentric / dot-flow-field / spa-view) carry their tranche tags in prose; they are NOT enrolled in `proof:readme-meta-clean` and are the viz-suite waves' bound — recorded in coordinationNotes, not collided.
