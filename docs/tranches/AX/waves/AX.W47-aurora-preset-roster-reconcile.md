# AX.W47 — Aurora preset-roster reconcile: the demo strip advertises the W13 mediums

**Band** convergence · AURORA/DEMO · **Severity** major · **dependsOn** AX.W00 (the π
visual-runtime close machinery) · AX.W13 (the first-class `vangogh`/`oil-pastel`/`crayon`
medium BODIES + the `AuroraMedium` union — landed; this wave is the DEMO consumer-adoption of
that surface) · AX.W10 (the atoms-door + `resolveAtoms` — landed; the medium `<select>` already
exposes van-Gogh) · **Charter** the convergence ledger row W47 (`CONVERGENCE-PLAN.md:25`) +
the §"Aurora/demo idiom" sequencing step 3 · **Audit** `convergence/D2.md` (the full
source-grounded diagnosis — USER-DEFECTS-2026-06-08 D2 "Where are the van-Gogh items?").

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on a **preset-roster-truth** witness that does NOT exist at HEAD
`002bda5`. The W13 engine ships three first-class painterly mediums — `vangogh`, `oil-pastel`,
`crayon` (the `AuroraMedium` union, `src/components/custom/aurora/constants/presets.ts:61-68`)
— but the demo's named-preset roster (`demo/stories/aurora/presets.ts`) bakes NONE of them and
NAMES none of them. The most-prominent discoverability surface (the `PresetPickerRow` strip at
the top of the aurora story) advertises no van-Gogh, no oil-pastel, no crayon. Four falsifiable
RED witnesses, each a source-true line probe the new gate inverts:

- **RED witness 1 (the headline — zero presets use the van-Gogh body; grep-falsifiable).**
  `grep -nE 'medium:\s*"vangogh"' demo/stories/aurora/presets.ts` → **ZERO matches** at HEAD.
  The W13 van-Gogh medium ships with NO hero preset. The one preset keyed `OIL_VANGOGH`
  (`presets.ts:257-293`) — whose iconic indigo/cobalt/sky/yellow/cream palette IS the
  Starry-Night ramp — bakes `medium: "oil"` (`:279`) + `strokeMode: "oil"` (`:285`), the
  PRE-W13 energy-graded oil, NOT the first-class `medium: "vangogh"` body. **Falsifiable RED:**
  *parse `PRESETS.OIL_VANGOGH.medium` — at HEAD it is `"oil"` (RED). After the wave the
  van-Gogh hero preset bakes `medium: "vangogh"` and at least one `medium: "vangogh"` site
  exists in the roster (GREEN).*

- **RED witness 2 (the string "Van Gogh" paints nowhere a user can see; grep-falsifiable).**
  `PRESET_META` (`presets.ts:491-504`) labels the `OIL_VANGOGH` slot **`"Oil Swirl"`**
  (`:499`) with `sub: "swirl flow · directional"` + `medium: "oil"`. The KEY `OIL_VANGOGH` is
  invisible to the user (only `label`/`sub` paint into the `PresetPickerRow` card —
  `PresetPickerRow.vue:127,130`). `grep -niE 'van.?gogh' demo/stories/aurora/presets.ts` →
  the only matches are the KEY + the section-comment (`:255,257,476`), NEVER a visible
  `label`/`sub`. **Falsifiable RED:** *scan every `PRESET_META[*].label` — at HEAD NONE
  contains "Van Gogh" (RED). After the wave the van-Gogh hero's `label` reads "Van Gogh"
  (GREEN).*

- **RED witness 3 (the W13 medium roster is NAMED for zero of its three first-class mediums;
  set-falsifiable).** Of the three W13 first-class painterly mediums, the visible `PRESET_META`
  roster names **none**: van-Gogh is hidden behind "Oil Swirl"; oil-pastel is baked by the
  three `CRAYON_*` slots (`:500-502`) but labeled "Pastel Sunset/Rainbow/Ocean" (the string
  "Oil Pastel" appears in no visible label — only in source comments `:296,336,429`); crayon is
  baked by ZERO presets (`grep -nE 'medium:\s*"crayon"'` → **ZERO matches** — the `CRAYON_*`
  keys all moved to `oil-pastel`, leaving the key lying about its medium). **Falsifiable RED:**
  *build the set of W13 first-class mediums {`vangogh`, `oil-pastel`, `crayon`} NAMED in any
  visible `PRESET_META.label`/`.sub` — at HEAD the set is empty (RED). After the wave all three
  are named on the strip (GREEN).*

- **RED witness 4 (the medium label is hand-typed twice and already drifts; source-falsifiable).**
  The human medium display name lives in TWO unsynced places — `config/options.ts:13-22`
  `mediumOptions` carries the canonical labels (`{label:"Van Gogh", value:"vangogh"}`,
  `{label:"Oil Pastel", value:"oil-pastel"}`, `{label:"Crayon", value:"crayon"}`) while
  `PRESET_META[*].medium` carries the bare `AuroraMedium` value and `PRESET_META[*].sub`
  hand-types a prose medium name (`"creamy"`, `"swirl flow"`) that has ALREADY drifted off the
  baked medium (the `OIL_VANGOGH` sub says nothing about van-Gogh; the `CRAYON_*` subs say
  "creamy" not "oil-pastel"). **Falsifiable RED:** *the medium display name is hand-typed in two
  files with no single-source; a `medium` value can change in `presets.ts` and leave its `sub`
  stale (RED — the `OIL_VANGOGH`/`CRAYON_*` subs are the live witness). After the wave the
  preset `sub`'s medium-name segment derives from the single `mediumOptions` map (GREEN).*

The wave is RED at HEAD on all four; the HardGate below drives each to GREEN. **This is the
exposure-layer transposition of the AX cardinal lesson:** W13 shipped + gated the medium body
against a gate-CONSTRUCTED `vangogh` config and live-verified it GREEN, while the demo's named
named-preset roster silently stayed on pre-W13 oil. The medium is real and reachable only by a
power-user drilling into Atoms/Advanced → medium → "Van Gogh"; nothing in the visible chrome
advertises it. Classic green-headless / not-surfaced-live gap, at the demo-content layer.

---

## Goal

The prominent `PresetPickerRow` strip advertises exactly the mediums the W13 engine ships:
the van-Gogh medium gets its eponymous hero preset (the Starry-Night palette repointed onto
`medium: "vangogh"`, named "Van Gogh"), oil-pastel is named under its true name, and the dry
crayon medium gets a visible hero — so a user scanning the most-prominent surface SEES the
W13 painterly mediums by name and clicks into atomic van-Gogh dabs, not a pre-W13 oil smear.
Content-truth, no library primitive, no token.

---

## Scope (the gestalt fix — demo-content reconciliation, no library edit, no alias)

D2's diagnosis: the fix lives WHERE THE TRUTH LIVES — the demo preset roster
(`demo/stories/aurora/presets.ts`). The engine grew a van-Gogh body; the showcase roster must
NAME and EXERCISE it. This mints no library primitive/token (the W13 medium bodies + the
`AuroraMedium` union already ship). Four cohesive content edits:

1. **Hero the van-Gogh medium on its eponymous preset (RED witnesses 1+2 — the headline).**
   `OIL_VANGOGH` already carries the iconic indigo/cobalt/sky/yellow/orange/cream Starry-Night
   palette + `flow.pattern: "swirl"` (`:280`) — it WAS always the van-Gogh showcase; only the
   medium + label are stale. Repoint its config:
   - `medium: "oil"` → `medium: "vangogh"` (`presets.ts:279`).
   - DROP `strokeMode: "oil"` (`:285`) — `StrokeMode` applies ONLY when `medium === "oil"`
     (`presets.ts:73` doc-contract); under `medium: "vangogh"` it is dead config. Clean break,
     no carry.
   - ADD `strokeOrient: "tensor"` (`:286-ish`) as an HONESTY declaration. NOTE — the uniform
     bridge ALREADY forces tensor for the painterly mediums regardless of the config field
     (`uniformBridge.ts:141-152`: "the painterly mediums FORCE the structure-tensor orientation
     regardless of the config's `strokeOrient`"), so this is NOT a render-behavior change — it
     makes the config READ TRUE (the painterly hug `resolveAtoms` already applies —
     `atoms.ts:366-367`) rather than leave the field implicitly `"flow"`. The reader sees the
     orientation the engine actually uses.
   - **Clean-break key rename `OIL_VANGOGH` → `VANGOGH`** (the `const`, the `PRESETS` map
     member `:476`, the `PRESET_META` row `:499`). No backwards-compat alias (MEMORY
     no-backwards-compat; the demo is the ONLY consumer of these keys —
     `PRESETS`/`PRESET_KEYS`/`PRESET_META`/`PresetKey` are all demo-internal, confirmed by
     grep: no external import of `OIL_VANGOGH`).
   - `PRESET_META.VANGOGH.label`: `"Oil Swirl"` → `"Van Gogh"`; `sub`: → a medium-true read
     (e.g. `"vangogh · swirl-row dabs"`, the medium segment derived per item 4).

2. **Name oil-pastel under its true name (RED witness 3).** The three `CRAYON_*` slots
   (`CRAYON_SUNSET`/`CRAYON_RAINBOW`/`CRAYON_OCEAN`) already bake `medium: "oil-pastel"`
   (`:319,360,452`) but label "Pastel". At least the warm hero (`CRAYON_SUNSET`) reads
   **"Oil Pastel Sunset"** (or the `sub` names "oil-pastel") so the new deposition body is
   named on the strip. The `CRAYON_*` keys are themselves STALE (the key says crayon, the
   content says oil-pastel — the same key-vs-content drift as `OIL_VANGOGH`); clean-break rename
   the three keys `CRAYON_*` → `OILPASTEL_*` so the key tells the truth (demo-internal keys, no
   alias). Each also drops its dead `strokeMode: "oil"` (`:325,366,458` — `medium` is
   `"oil-pastel"`, not `"oil"`, so `StrokeMode` is dead config) and gains `strokeOrient:
   "tensor"` (the honesty declaration — the bridge forces it for oil-pastel too).

3. **Add a `crayon` hero so the dry medium is visible by name (RED witness 3).** ZERO presets
   bake `medium: "crayon"` at HEAD — the third W13 first-class medium (the DRY tooth-multiply,
   no sheen) is invisible on the strip. Author ONE `CRAYON` hero preset baking `medium:
   "crayon"` + `strokeOrient: "tensor"`, with a palette + flow that READS as dry waxy crayon
   (matte, high tooth, no impasto/sheen — `impasto: 0`, modest `canvasGrain`/`paperGrain` for
   the tooth) and a label "Crayon". This satisfies the overfitting bar: it is a demo-private
   showcase entry exercising a shipped first-class medium (the same class as every other
   `PRESETS` member — a named demo preset, not a library artefact). Register it in `PRESETS` +
   `PRESET_META` (the roster auto-flows to `PRESET_KEYS` → `PresetPickerRow` →
   `usePresetThumbnails` with no further wiring).

4. **One-source the medium label (RED witness 4 — KISS, demo-internal).** The `PRESET_META`
   `sub` strings hand-type a prose medium name that drifts. Derive the medium-name SEGMENT of
   each `sub` from the single `config/options.ts` `mediumOptions` map (the canonical
   medium→label source already carrying "Van Gogh"/"Oil Pastel"/"Crayon") via a small
   demo-internal `mediumLabel(value)` lookup, so a future medium add or a preset medium-repoint
   cannot leave a `sub` stale. This is the demo-content fix for the two-place drift — it does
   NOT touch `config/options.ts` (read-only here; W38's surface and W10's medium-axis are
   untouched), it CONSUMES its map.

### Out-of-scope (explicitly NOT this wave)

- **NO library edit.** The W13 medium BODIES (`mediums.glsl.ts`/`brush.glsl.ts`/
  `aurora.frag.ts`), the `AuroraMedium`/`StrokeMode` unions (`src/.../presets.ts`), the
  `uniformBridge` medium dispatch — all W13's, all LANDED, all CONSUMED here verbatim. A need
  to touch any `src/` aurora surface is a scope-reveal → triumvirate (it means the medium body
  is wrong, which is a W13 re-open, not a demo-content wave).
- **NO configurator restyle.** The `PresetPickerRow.vue` card chrome, the `AuroraConfigDock`
  Atoms/Advanced split, the `config/*Layer.vue` — W38's / W10's. This wave edits ONLY the
  preset ROSTER (the data) + the `usePresetThumbnails` re-bake that auto-follows from the
  changed configs.
- **NO `config/options.ts` edit.** `mediumOptions` is the single-source this wave READS; it is
  W10's medium-axis surface (the medium `<select>` already correctly exposes van-Gogh). Reading
  it ≠ editing it.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `demo/stories/aurora/presets.ts` | The roster reconcile: `OIL_VANGOGH`→`VANGOGH` (`medium:"vangogh"` + `strokeOrient:"tensor"`, drop dead `strokeMode`, key + `PRESETS` + `PRESET_META` rename, `label`→"Van Gogh"); `CRAYON_*`→`OILPASTEL_*` (drop dead `strokeMode`, add `strokeOrient:"tensor"`, name oil-pastel in ≥1 label); a NEW `CRAYON` hero (`medium:"crayon"`); the `PRESET_META.sub` medium-segment derived from `mediumLabel()`. |
| `scripts/proof-aurora-preset-roster.mjs` | **NEW** — the device-free SOURCE/STRUCTURE arm: assert every W13 first-class medium {`vangogh`, `oil-pastel`, `crayon`} is BAKED by ≥1 preset (`medium:` value) AND NAMED in ≥1 visible `PRESET_META.label`/`.sub`; assert no `PRESET_META.medium` value mismatches its preset's baked `medium`; assert no preset carries a dead `strokeMode` under a non-`oil` medium; assert no `OIL_VANGOGH`/`CRAYON_*` legacy key survives (clean-break proof). |
| `package.json` | Register `proof:aurora-preset-roster` + the W00 meta-gate parity match (HARDENING §G #16). |
| `docs/tranches/AX/audit/W47-aurora-preset-roster-reconcile.json` | **NEW** — the born-RED→GREEN ledger + the paired-π BEFORE/AFTER thumbnail-strip capture. |

**OUT of bounds:** any `src/` aurora surface (the W13 medium bodies + unions + the
`uniformBridge` dispatch — CONSUMED, never edited — a needed edit is a W13 re-open →
triumvirate); `demo/stories/aurora/config/options.ts` (the `mediumOptions` single-source — READ
ONLY; W10's medium-axis); `PresetPickerRow.vue` / `AuroraConfigDock.vue` / `config/*Layer.vue` /
`AuroraAtomsPanel.vue` (the configurator chrome — W38's restyle, W10's atoms-door — this wave
changes the DATA the chrome renders, never the chrome); `usePresetThumbnails.ts` (the bake
machinery — it re-bakes the changed configs AUTOMATICALLY off `PRESETS`/`PRESET_KEYS`, no edit
needed).

---

## Disjointness (sibling waves it must NOT overlap — the dedup, restated from D2)

The convergence finding (`D2.md` §"Cross-reference") proved at the source level that NO existing
wave owns the demo preset-roster/labeling seam. It falls BETWEEN "the medium body" (W13, done)
and "the chrome structure/skin" (W10/W38), in the demo-content roster that neither claims:

- **vs W13 (vangogh/oil-pastel mediums) — file-DISJOINT, the predecessor.** W13 ships the medium
  BODY + the SRC `presets.ts` `AuroraMedium`/`StrokeMode` unions + the shader gates. Its
  FileBounds list `src/.../mediums.glsl.ts`/`brush.glsl.ts`/`aurora.frag.ts`/`uniformBridge.ts`/
  the SRC `presets.ts` + the proof scripts — they do **NOT** include
  `demo/stories/aurora/presets.ts`. W13's "vangogh preset" is a GATE-CONSTRUCTED config
  (`proof:aurora-vangogh-preset` builds it internally to exercise the SHADER body), NOT the
  demo's named `OIL_VANGOGH`. W13 is `complete` + src-shader-bounded — re-opening it to touch
  the demo roster violates its FileBounds and its complete status. **CONFIRMED:** grep over all
  AX wave docs — NONE name `demo/stories/aurora/presets`, `PRESET_META`, `OIL_VANGOGH`,
  `Oil Swirl`, or `PresetPickerRow`. W47 CONSUMES W13's medium surface; it is the demo
  consumer-adoption.
- **vs W10 (aurora options converge — atoms door) — file-DISJOINT, `complete`.** W10 owns the
  atoms-door STRUCTURE + the `AuroraConfigDock` Atoms↔Advanced split + the `config/options.ts`
  `mediumOptions` medium-axis (where van-Gogh IS exposed in the `<select>`). Its FileBounds do
  NOT list `demo/stories/aurora/presets.ts`; it is `complete`. It surfaced the medium `<select>`
  (van-Gogh present there) but never touched the named-preset roster or labels. W47 READS
  `mediumOptions` (W10's single-source) and edits ONLY the roster — the medium-`<select>`
  exposure (surfaces 2+3 in D2) stays W10's and is already GREEN.
- **vs W38 (aurora configurator glass-atoms restyle) — file-DISJOINT.** W38 is a pure VISUAL
  restyle of the three Configurator SFCs (glass-tier chip / press-spring / focus-ring) — its
  FileBounds bound it to `src/components/custom/configurator/` + its demo consumer, and its
  charter "preserves the content/layout verbatim; only the visual classes change". It restyles
  the CHROME, never the preset roster content. The W38 augment (D1, `CONVERGENCE-PLAN.md:39`)
  promotes `AuroraAtomsPanel.vue`/`config/*Layer.vue` to "modify" for the native-`<select>`→
  `LabeledSelect` idiom pass — still the CHROME, NOT `presets.ts`. Disjoint by file.
- **vs W18 (storybook IA reinvention) — no overlap.** W18 re-orgs the storybook NAVIGATION IA;
  grep over the W18 doc for `aurora preset`/`PRESET_META`/`medium` → empty. It owns the story
  TREE, not the per-story preset content. Disjoint.
- **vs W40 (demo-shell dock-nav coherence reaudit) — no overlap.** W40 owns
  `proof:design-md-current` re-run + the demo-shell NAV coherence (the BottomDock active
  affordance, D9); it carries no preset-roster ownership. Disjoint.

**Conclusion (D2 verdict, restated):** the preset-exposure/labeling seam is owned by NO existing
wave — genuinely net-new, the demo consumer-adoption of the W13 medium surface (analogous to the
speedtest `deriveAurora` consumer-adoption W13 routed to W10/W34, but in-repo demo content).

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless gate — `proof:aurora-preset-roster` (NEW, born-RED — the device-free arm).** A
SOURCE/STRUCTURE parse over `demo/stories/aurora/presets.ts` (the data is the artefact — a
source-structure assertion over a TypeScript object literal, the precept-valid form):

- **Every W13 first-class medium is BAKED.** The set of `medium:` values across `PRESETS`
  SUPERSETs {`vangogh`, `oil-pastel`, `crayon`}. **Born-RED at HEAD** (`vangogh` baked by 0
  presets, `crayon` baked by 0; only `oil-pastel` is baked).
- **Every W13 first-class medium is NAMED.** For each of {`vangogh`, `oil-pastel`, `crayon`},
  some visible `PRESET_META.label`/`.sub` contains its display name (from `mediumOptions`).
  **Born-RED at HEAD** ("Van Gogh", "Oil Pastel", "Crayon" appear in NO visible label/sub —
  only "Oil Swirl"/"Pastel"/absent).
- **No medium-value mismatch.** Each `PRESET_META[key].medium` equals the baked
  `PRESETS[key].medium` (the meta cannot lie about the body). **Born-RED at HEAD**
  (`OIL_VANGOGH` meta says `"oil"` AND the body says `"oil"` — consistent today, but the
  ASSERTION lands as a regression-guard once repointed; the gate also checks the meta `sub`
  medium-segment matches `mediumLabel(medium)`).
- **No dead `strokeMode` under a non-oil medium.** No preset carries `strokeMode` while
  `medium !== "oil"` (the W13 `StrokeMode` doc-contract — "applied only when medium===oil").
  **Born-RED at HEAD** (the three `CRAYON_*` slots carry `strokeMode:"oil"` under
  `medium:"oil-pastel"`).
- **Clean-break key proof.** No `OIL_VANGOGH` / `CRAYON_SUNSET` / `CRAYON_RAINBOW` /
  `CRAYON_OCEAN` legacy key survives in `PRESETS`/`PRESET_META` (the no-backwards-compat
  rename). **Born-RED at HEAD** (all four legacy keys live).

This is a **source-structure parse** gate (the precept-valid artefact form for demo-content —
the TypeScript object literal IS the artefact; INVALID would be "grep found a string" FOR
RUNTIME BEHAVIOUR, which this is not — the BAKED medium and the NAMED label are content facts,
not painted pixels). The RUNTIME truth (the thumbnail PAINTS atomic van-Gogh dabs) is proven by
the π-lane readback below, NOT this text gate.

**π live arm — fail-CLOSED `proof:aurora-preset-roster` runtime tier (born-RED).** A π-lane
render-readback that converts "the strip advertises the van-Gogh medium" into a measurable
assertion an unattended run gates on — the device-free arm proves the ROSTER NAMES the medium;
the π arm proves the THUMBNAIL PAINTS it. It FAILS CLOSED (no device / no WebGL2 context / bake
abort → RED, never skip-green): mount the aurora story, let `usePresetThumbnails` bake, and read
back the `VANGOGH` thumbnail data-URL:

- **Atomicity gap-fraction on the van-Gogh thumbnail.** The repointed `medium: "vangogh"`
  thumbnail carries a measurable inter-stroke canvas-gap fraction above a floor (the discrete
  atomic comma/crescent dabs the W13 body paints — NOT the old continuous best-of-9 oil coverage
  smear, which measures ZERO gap fraction). **Born-RED at HEAD** (the HEAD `OIL_VANGOGH`
  thumbnail bakes `medium:"oil"` → the oil coverage field → zero gap fraction).
- **Per-medium thumbnail distinctness.** The `VANGOGH`, oil-pastel-hero, and new `CRAYON`
  thumbnails are pairwise MEASURABLY distinct (a per-thumbnail statistic delta above a floor — a
  roster where van-Gogh ≡ oil makes the van-Gogh thumb identical to the oil-impasto thumb).
  **Born-RED at HEAD** (van-Gogh ≡ energy-graded oil ≈ the oil presets).

The π arm rides the W00 fail-closed lane (the device-free CI arm + the live π arm — the
HARDENING §G #16 dual-tier). The numeric gap-fraction is the UNATTENDED close (what the 12-hour
run asserts when no human is present); the human side-by-side below is the ENRICHMENT.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's binding close criterion).** A
live Playwright + frontend-design pass in the π workspace, rendering the aurora story's
`PresetPickerRow` strip and clicking into the van-Gogh / oil-pastel / crayon heroes:

- **The strip ADVERTISES the W13 mediums by name.** The top-of-page thumbnail strip shows a
  card labeled **"Van Gogh"**, a card naming **oil-pastel**, and a card labeled **"Crayon"** —
  a user scanning the most-prominent surface SEES the three painterly mediums by name (the D2
  defect — "Where are the van-Gogh items?" — is visibly gone).
- **The "Van Gogh" thumbnail shows ATOMIC dabs, not the old oil smear (the headline visual,
  D2 §coupling-note).** The repointed `medium: "vangogh"` thumbnail paints separable
  comma/crescent strokes with visible inter-stroke canvas gaps queued into Starry-Night swirl
  rows — side-by-side BEFORE (the HEAD "Oil Swirl" continuous oil coverage field) / AFTER (the
  atomic van-Gogh dabs). Clicking the card drives the live stage to the same atomic body.
- **The oil-pastel and crayon heroes read DISTINCT.** The oil-pastel hero reads as creamy
  smeared deposition with build-up; the crayon hero reads as dry matte tooth-multiply (no
  sheen). The two media are visibly different on their thumbnails (the W13 split is now
  exercised by named presets, not just the gate-constructed config).
- **Affordance / hierarchy / NO regression on the existing oil presets** per the AX cardinal
  gate — `OIL_IMPASTO`/`OIL_GESTURAL` (genuine `medium: "oil"`) render unchanged; only the
  mislabeled van-Gogh + the oil-pastel/crayon naming change.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a
paired-π BEFORE/AFTER + DELTA thumbnail-strip artefact under `docs/tranches/AX/audit/`, per the
W00 protocol) is the binding close criterion. The BEFORE capture pins the HEAD strip (no
"Van Gogh" card; the "Oil Swirl" thumbnail an oil smear) the reconciled roster must visibly
beat. This is the coupling note from D2: changing `OIL_VANGOGH`'s medium changes its baked
thumbnail (`usePresetThumbnails` re-bakes off `PRESETS`), so the live-verify close is the
thumbnail re-bake showing the atomic van-Gogh dabs.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the four RED witnesses against HEAD
   `002bda5` on the live demo: `grep medium:"vangogh"`/`medium:"crayon"` → 0; `OIL_VANGOGH`
   labeled "Oil Swirl" baking `medium:"oil"`; the `CRAYON_*` slots labeled "Pastel" under
   `medium:"oil-pastel"`; the two-place medium-label drift. Confirm W13's `AuroraMedium` union
   carries `vangogh`/`oil-pastel`/`crayon` first-class (the consumed surface IS landed). Capture
   the BEFORE π thumbnail-strip render (no "Van Gogh" card; the "Oil Swirl" oil-smear thumbnail)
   as the born-RED baseline in `audit/W47-aurora-preset-roster-reconcile.json`. Do NOT proceed on
   D2's word — re-prove.
2. **Author the born-RED gate.** Author NEW `scripts/proof-aurora-preset-roster.mjs` (the
   device-free SOURCE/STRUCTURE arm + the fail-closed π runtime tier); register
   `proof:aurora-preset-roster` in `package.json` + the W00 meta-gate; confirm it FAILS at HEAD.
3. **Hero the van-Gogh medium.** `OIL_VANGOGH`→`VANGOGH`: `medium:"vangogh"`, add
   `strokeOrient:"tensor"`, drop dead `strokeMode`, rename the key + `PRESETS` + `PRESET_META`
   row, `label`→"Van Gogh". Typecheck.
4. **Name oil-pastel + drop dead `strokeMode`.** `CRAYON_*`→`OILPASTEL_*` rename, name
   oil-pastel in ≥1 label, drop dead `strokeMode`, add `strokeOrient:"tensor"`. Typecheck.
5. **Add the `crayon` hero.** Author the `CRAYON` preset (`medium:"crayon"`, dry/matte palette +
   flow, `impasto:0`); register in `PRESETS` + `PRESET_META`. Typecheck.
6. **One-source the medium label.** Add the demo-internal `mediumLabel(value)` lookup off
   `config/options.ts` `mediumOptions`; derive each `PRESET_META.sub` medium-segment from it.
   Typecheck.
7. **Gate GREEN + VISUAL-TRUTH.** Confirm `proof:aurora-preset-roster` passes (device-free arm);
   run the VISUAL-TRUTH live π audit of the reconciled strip — the "Van Gogh" card paints atomic
   dabs, the oil-pastel/crayon heroes read distinct; capture the paired-π BEFORE/AFTER + DELTA
   thumbnail strip; write `audit/W47-aurora-preset-roster-reconcile.json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W47-aurora-preset-roster-reconcile.json` — the born-RED→GREEN ledger:
  the four RED witnesses (zero `medium:"vangogh"`, "Van Gogh" painting nowhere, the three W13
  mediums named for zero, the two-place label drift), the per-edit disposition (van-Gogh hero
  repoint, oil-pastel naming, the crayon hero, the single-source label), and the post-wave GREEN
  structure + π thumbnail-readback measurements.
- `scripts/proof-aurora-preset-roster.mjs` — the NEW gate (every W13 medium baked + named, no
  meta-mismatch, no dead `strokeMode`, clean-break keys; + the fail-closed π thumbnail tier).
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the `PresetPickerRow` strip
  BEFORE (no "Van Gogh" card; the "Oil Swirl" oil-smear thumbnail) vs AFTER (the "Van Gogh" card
  with atomic-dab thumbnail + the named oil-pastel + the crayon hero), and the per-medium
  thumbnail delta (van-Gogh atomic dabs vs the HEAD energy-graded oil smear).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(aurora): proof:aurora-preset-roster born-RED — every W13 medium baked + named, no dead strokeMode, clean-break keys (AX.W47)`
2. `feat(demo/aurora): hero the van-Gogh medium — OIL_VANGOGH→VANGOGH, medium:"vangogh"+strokeOrient:"tensor", label "Van Gogh" (AX.W47 D2)`
3. `feat(demo/aurora): name oil-pastel + add a crayon hero — CRAYON_*→OILPASTEL_*, new CRAYON medium:"crayon" preset (AX.W47 D2)`
4. `refactor(demo/aurora): one-source the preset medium label off mediumOptions — kill the two-place sub drift (AX.W47 D2)`
5. `chore(AX.W47): audit ledger GREEN + paired-π BEFORE/AFTER thumbnail-strip capture`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER
stage/commit/stash per the hardened agent git clause. These are the messages the orchestrator
authors.)

---

## Dependencies (dependsOn + why)

- **AX.W13 (vangogh/oil-pastel/crayon mediums) — the CONSUMED predecessor.** W13 ships the
  first-class medium bodies + the `AuroraMedium` union (`vangogh`/`oil-pastel`/`crayon`) + the
  `uniformBridge` dispatch (the painterly-tensor force). W47 is the DEMO consumer-adoption — it
  bakes + names those mediums on the showcase roster. Without W13's medium bodies a
  `medium:"vangogh"` preset would render nothing distinct; W13 is LANDED at HEAD (the union +
  the bridge confirmed by grep), so W47 consumes a settled surface.
- **AX.W10 (aurora atoms door) — the single-source `mediumOptions` provider.** W10 owns
  `config/options.ts` `mediumOptions` (the canonical medium→label map carrying
  "Van Gogh"/"Oil Pastel"/"Crayon"). W47 READS it for the one-source label fix; it does NOT
  edit it. W10 is `complete`; the read is non-colliding.
- **AX.W00 (π visual-runtime lane) — the close machinery.** The `proof:aurora-preset-roster` π
  tier rides the W00 fail-closed lane, and the thumbnail-strip VISUAL-TRUTH audit is the binding
  close criterion. W47 cannot close on the headless device-free arm alone — W00 stands up the
  lane it closes on (the atomic-van-Gogh-dabs thumbnail re-bake is the load-bearing visual
  proof).

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to)

- **no-backwards-compat / clean break (MEMORY).** The `OIL_VANGOGH`→`VANGOGH` and
  `CRAYON_*`→`OILPASTEL_*` key renames are clean breaks — NO alias, NO deprecation shim. The
  demo is the only consumer of these keys (grep-confirmed no external import); the rename is a
  one-source change.
- **presets-in-consumers (MEMORY).** This is the canonical case — the authored themed presets
  live in the DEMO (`demo/stories/aurora/presets.ts`), not the library; the library exports only
  the `AuroraMedium` shape + the neutral `DEFAULT_AURORA_CONFIG`. W47 evolves the DEMO roster to
  name the library's shipped mediums; it mints no library token/primitive.
- **no-overfitting (substrate-with-consumer; the overfitting-audit MEMORY).** The new `CRAYON`
  hero is a demo-private showcase preset exercising a SHIPPED first-class medium (the same class
  as every `PRESETS` member). It is not a library artefact; it surfaces the third W13 medium
  that otherwise paints for no named consumer. The W13 medium bodies gain their demo consumer
  here (wire-the-substrate, not substrate-without-consumer).
- **gestalt over patch (MEMORY).** The fix is the ROSTER reconciliation (repoint + rename +
  one-source), not a band-aid label edit — it makes the data tell the truth (key, medium, label,
  and `sub` all consistent), and one-sources the label so the drift class cannot re-enter.
- **π visual-runtime / gates-close-on-evidence (AX cardinal).** The device-free arm is a
  source-structure parse (valid artefact form for content); the RUNTIME truth (atomic dabs on
  the thumbnail) is proven by the fail-closed π readback + the executed VISUAL-TRUTH audit, never
  a text gate alone. This wave is the exposure-layer instance of the cardinal lesson — W13's
  green-headless medium gate did not surface the medium live on the strip; W47 closes that gap on
  the real-device thumbnail re-bake.
