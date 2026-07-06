# BG.W-BLOB-AFFECT-INTERACT — dual-engine PAINT JUDGE DELTA

**Wave:** BG.W-BLOB-AFFECT-INTERACT (F9.R8) · route `/substrates/blob`
**Judge:** non-authoring paint judge (did NOT build it)
**Date:** 2026-07-06
**Verdict: FAIL — the pointer-truth half PASSES end-to-end; the AFFECT half MISSES the ≥4-preset bar (the studio ships 3 preset MODES, spec requires ≥4). The doubled bar is not met.**

---

## Pipeline provenance (all captures over BUILT bytes)

- `npm run demo:dist:build` GREEN (dist-demo rebuilt this session).
- Served the BUILT bytes via `vite preview` on `:5201` (`:5200` held by a parallel-agent server — untouched, per the sibling/foreign-tree fence).
- Chrome leg: real **Chrome 149 / ANGLE Metal (Apple M5 Max)** over `?capture=/substrates/blob&mode=<m>` via `connectOverCDP` (port 9334), polled `data-capture-ready`, `page.screenshot`. Badge decoded → `ENGINE CHROME · GPU ANGLE Metal Renderer Apple M5 Max`.
- Safari leg: off-screen `/tmp/wkshot-live` WKWebView, 2880×1800 retina, polled `data-capture-ready`. Badge decoded → `ENGINE WEBKIT · GPU Apple GPU`.
- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 BEFORE and AFTER.
- `proof:blob-affect-interact --selftest` → PASS (I1 hit-test · I2 SDF-gated engage · I3 sibling-fall-through · I4 click-gate · I5 wake+PRM-seat · A1 affect axes; every planted bite RED).

### Capture set (all RESOLVE ON DISK, under this dir's `BG.W-BLOB-AFFECT-INTERACT-paint/`)

| file | engine | mode | provenance badge |
|---|---|---|---|
| `blob-chrome-light-desktop-full.png` | Chrome | light | ANGLE Metal M5 Max · LIGHT |
| `blob-chrome-dark-desktop-full.png` | Chrome | dark | ANGLE Metal M5 Max · DARK |
| `blob-safari-light-desktop-full.png` | WebKit | light | Apple GPU · LIGHT |
| `blob-safari-dark-desktop-full.png` | WebKit | dark | Apple GPU · DARK |

### Live-gesture frame series (Chrome, real Metal, light — the studio hero bead, canvas-clipped)

| file | state |
|---|---|
| `rest.png` | at rest — lit warm-cream metaball, satellite lobes merged, glass sheen (reads as a living creature) |
| `lean.png` | pointer moved to centre — silhouette visibly LEANS/attracts toward the cursor |
| `preclick.png` | pre-click steady lean |
| `click_40/110/220/380/600.png` | click at centre → body swells (caption `clicks 1`) → settles to one coherent body by 600ms, no jitter, no wrecked slab |
| `prm-rest.png` | reduced-motion → static seated bead (deltas 0.0 — deterministic seat) |

---

## What PASSES

### Pointer truth (I1–I5) — the user's PRIMARY complaint ("on-click and on-hover is AWFUL") is FIXED

- **SDF-shaped hit-test / sibling fall-through (I3/I4) — DECISIVE.** `elementFromPoint` at the studio bead:
  - centre `(586,614)` → `goo-blob-hit` (`centerIsHit: true`) — the SDF interior receives the pointer.
  - box corner `(349,377)` → `relative aspect-square … max-w-[min(78%,30rem)]` (the parent container, NOT the hit layer) — `cornerIsHit: false`. **The root square does NOT intercept a corner click; it falls through.** A corner `mouse.click` resolved the container, never the blob. This is the literal L5 ask satisfied.
  - Computed styles: `.goo-blob-wrapper { pointer-events: none }`, `.goo-blob-canvas { pointer-events: none }`, `.goo-blob-hit { pointer-events: auto; clip-path: circle(22.88%); cursor: pointer }`.
- **Pointer lean (hover response) — painted + alive.** Ambient frame-to-frame delta (mouse parked far) ≈ 0.33 mean / 0.43 max. Moving the pointer into the SDF centre → delta **3.09** (~7× ambient) within ~50ms (≤3 frames). `lean.png` shows a clear silhouette lean toward the cursor.
- **Click bounce — registered + painted, deform-then-settle no jitter.** A centre `mouse.click` incremented the visible counter (`clicks 0 → 1`), the body swelled (`click_40/110`), then settled to one coherent single body by 600ms (`click_600`). No jitter, no wrecked slab.
- **PRM deterministic seat (I5).** Under `reducedMotion: reduce` the loop parks — rest deltas 0.0 across 500ms (`prm-rest.png` is a clean seated bead, not a mid-gesture residual).
- **Wake wire (I5).** Gate-verified (`pointer.active` → `renderer.wake()`); the first hover-into-SDF produced an immediate painted response (no parked-loop lurch).

### GAP-4 perf — unregressed

Exactly **2 live GooBlob GL contexts** on the page (studio hero 768×768 + the STAGE-1 plain bead 563×563) + the 1 shell-aurora background canvas. Within the page's "at most TWO live GooBlob contexts" budget.

### Static gestalt — both engines, both modes

The masthead + violet `Blob Studio` title (`--motion-accent`) + recessive warm-paper background (no conic banding, no oversaturation, grain calm) render correctly on Chrome (Metal) and WebKit (Apple GPU), light + dark. Dark reads as a luminous warm-dark register, not a dead charcoal void. The lit bead reads dimensional and warm-cream (bounded, non-neon).

### Affect axes in the engine (A1) — present

`constants.ts` ships `interface AffectPoint {valence, arousal}`, `MOOD_AVA` (the 5 named moods as circumplex points), and `paramsFor` (arousal→motion, valence→palette). The gate's A1 clause is GREEN.

---

## What FAILS (defectLocalization)

### The ≥4 affect preset MODES bar is NOT met — the studio ships **3** presets.

The wave pass-bar (USER-0705-FOLD §(a), verbatim): *"the blob STUDIO ships preset MODES as consumer presets — calm (byte-identical default) · serene · excited · playful … Pass-bar: **≥4 emotion presets read DISTINCT** in a blind non-authoring Fable A/B (distinguishable by motion character, not just hue)."* The gate `proof:blob-affect-interact` explicitly delegates this count to the paint bar (A1 docstring: *"the ≥4-distinct Fable A/B pass is the paint bar, not this gate"*).

**Measured (both engines):** the Configurator preset row renders exactly **3** chips — `Calm` (cream · curious), `Excited` (warm · leans in), `Shy` (cool · shies away). Confirmed by `presetButtons: 3`, `presetRegionHtml: "Calm cream · curious Excited warm · leans in Shy cool · shies away"`, and the visible preset chips at the bottom of both the Chrome and Safari captures.

- **Present:** calm, excited, shy (3).
- **Named-but-absent:** `serene`, `playful` (the spec's 3rd/4th named modes).
- **Extra/renamed:** `shy` (an in-family cool mode, not one of the 4 named).

The 3 present presets ARE well-differentiated in motion character (source: calm `attraction 0.35 / responsiveness 0 / curious`; excited `attraction 0.8 / responsiveness 0.7 / excited`; shy `attraction -0.8 / responsiveness 0.2 / sleepy`) — so the deficiency is purely the **COUNT** (3 < 4), not the distinctness of what ships. The source-integration commit `254b2191` landed the engine pointer-truth + affect axes but did NOT expand the demo consumer preset row from its pre-existing 3 to the 4 named emotion modes.

**Location:** `demo/stories/substrates/blob.vue:181-232` — `const presets: readonly ConfiguratorPreset<BlobStudioCfg>[]` (3 entries: `key:"calm"` @183, `key:"excited"` @197, `key:"shy"` @221).

---

## mustFix[]

1. **Add a 4th (and ideally the named) emotion preset MODE to the studio preset row** (`demo/stories/substrates/blob.vue:181-232`) so the studio ships **≥4** consumer presets. Land the spec-named set `calm · serene · excited · playful` (calm stays the byte-identical default). Each preset is a distinct `{attraction, clickImpulse, responsiveness, mood, seed, harmony}` bundle whose **motion character** (not just hue) is distinguishable in a blind A/B — e.g. `serene` = low arousal, gentle sway, no lean; `playful` = high arousal, bouncy, springy re-lean. `shy` may stay as a 5th, be renamed, or be re-homed — but the shipped count must be ≥4 and the named modes present.
2. Keep every axis **bounded saturated-but-non-neon** (warm-cream identity ceiling — the excited/warm seed already respects it; hold that ceiling on serene/playful).
3. Re-judge: re-run the dual-engine capture + the live-gesture frame-series (unchanged — the pointer-truth half already PASSES; only the preset-count fix is owed) + a blind ≥4-preset A/B confirming distinct motion character.

**The pointer-truth half (I1–I5), PRM seat, GAP-4 budget, and cross-engine gestalt all PASS and need no re-work — the fix is surgically the preset MODE count in the demo consumer.**
