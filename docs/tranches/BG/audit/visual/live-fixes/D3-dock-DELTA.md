# D3-dock — LIVE-DEFECT HUNT DELTA

**Hunter:** D3-dock ("Dock issues"). **Worktree:** `.claude/worktrees/wf_1eeccb0b-617-3` (reset to
real `tranche/BG` HEAD `472bd89b` — the worktree had seeded STALE at the BD merge-base `998136bb`,
122 commits behind, missing the candidate cd9ce46 + the protocol docs; the stale-worktree-trap reset
was step 0). **Ports:** dev/preview 5203, Chrome debug 9343. **Routes surveyed:** `/dock/overview`,
`/dock/layers`, `/dock/rail` (=Vertical Dock) + the app-shell shell docks, both modes.

---

## VERDICT SUMMARY

| Candidate | Status | Action |
|---|---|---|
| **D3-A — collapse-morph "balloon" flicker** | **REPRODUCED + FIXED** | one-token CSS fix + gate update |
| cd9ce46 dock-blur demotion (9px→8px, lost 2% brightness) | NOT a live defect (phantom) | no fix — confirms re-spec Pass 1 |
| Standing cluster: persistent controls / iOS hover register / dynamic darkening | NOT live-broken at HEAD | no fix — already-closed |
| WS2 dock convergence (rows 4.x) | architecture, unbuilt | left for WS2 (defects[]) |

`reproduced = true` (D3-A is a real, reproducible, user-visible live defect — the "dock issues" report).

---

## D3-A — THE DOCK COLLAPSE BALLOONS THEN SNAPS (the "morph hover flicker")  ★ HIGH

### Reproduced (live, real Chrome over CDP, ANGLE Metal Renderer Apple M5 Max)

Drove the reliable `[data-testid="dock-capture"]` collapsible dock on `/dock/overview` (live, non-capture
route so the morph animates): hover-expand → pointer-leave → instrument the dock's
`getBoundingClientRect().width` + `class`/`data-morphing` through the collapse via a MutationObserver +
rAF sampler.

**BEFORE (pre-fix) — reproducible across teleport AND natural leave, every run:**
```
width: 496 (expanded) → [collapse fires, .collapsed+data-morphing set] → 123 → 259 → 306 → 411 → 460 → 496
       → (HOLDS ~494-496 for ~250-300ms) → 59 (snap when data-morphing clears)
```
The dock starts collapsing (496→~100), then REVERSES back to the full 496 expanded footprint, holds there
~250ms, then SNAPS to the true collapsed 59 — a ~440px width reversal mid-collapse. The dock visibly
balloons-then-snaps every time it collapses. Throughout, the root carries `.collapsed` + `data-morphing`
(it is NOT a state-machine double-fire — `useDockState` is correct; the BUG is in the size render).

Before frame: `/tmp/respec-fixes/D3-dock/morph-bounce-light-natural.png` (dock near-full-width mid-collapse).

### Root cause (confirmed in src/)

`BD.W-DOCK-CORE` re-expressed the dock size morph as a ratio-free convex blend
(`--dock-live = collapsed + (expanded−collapsed)·clamp(0, <scalar>, 1)`, `src/styles/dock/layers.css`).
The blend scalar was wired to the RAW morph PROGRESS `--dock-morph-t` (the `SpringProgress` ALWAYS runs
0→1 per episode — `dockMorphContext.ts` `reset(0); target=1`, both directions). But `--dock-morph-t` is
direction-AGNOSTIC, so `collapsed + Δ·t` plays **collapsed→expanded for BOTH directions**:
- **expand** (collapsed→expanded): correct — ends at expanded, resting=expanded, no snap.
- **collapse** (should be expanded→collapsed): WRONG — animates collapsed→expanded (balloons UP to 496),
  settles at t=1=expanded, then SNAPS to the resting collapsed (59) when `[data-morphing]` clears.

The library ALREADY derives the correct DIRECTIONAL scalar `--dock-expand-t` (`src/styles/dock/morph.css`
lines 56-62: expand `var(--dock-morph-t)`, collapse `calc(1 − var(--dock-morph-t))` — expanded-ness
0=collapsed/1=expanded). The dock CHROME (bg/border/blur — morph.css) AND the child stagger (layers.css
`--dock-expand-t` reads) were ALREADY on the directional scalar and morph correctly. Only the SIZE blend
was left reading the raw `--dock-morph-t` — a single-token oversight in the BD rewrite.

### Fix (clean break, token-first, compositor-only)

**`src/styles/dock/layers.css`** — the `--dock-live` blend reads `--dock-expand-t` (the directional
scalar the chrome + children already use), NOT the raw `--dock-morph-t`:
```css
/* before */  clamp(0, var(--dock-morph-t, 1), 1)
/* after  */  clamp(0, var(--dock-expand-t, 1), 1)
```
This aligns SIZE with the chrome + children. **Expand is byte-identical** (`.expanded[data-morphing]`
derives `--dock-expand-t == var(--dock-morph-t)`); ONLY `.collapsed[data-morphing]` (`1−t`) changes, so
the collapse now shrinks monotonically expanded→collapsed with no reversal. Compositor-only (drives
`scale` via `--dock-size-scale`, no layout property animates — `proof:no-layout-animation` LOCKED).

**`scripts/proof-dock-engine.mjs`** (E4 `dockLiveBlend` clause) — the gate regex hardcoded the buggy
form (`--dock-live ... --dock-morph-t`); it encoded the bug. Updated to assert the directional
`--dock-expand-t` (the gate's intent — a convex blend on the JS-driven morph scalar — is preserved;
`--dock-expand-t` IS the `--dock-morph-t`-derived directional scalar). The violation message now reds
on a REVERT to the direction-agnostic raw `--dock-morph-t` (the collapse-balloon re-introduction).

### Re-verified live — defect GONE, dual-engine

**Chrome (CDP, ANGLE Metal Apple M5 Max), live interaction trace:**
```
AFTER: 496 → 491 → 468 → 459 → 443 → ... → 107 → 97 → 80 → 64 → 57 → 46 → 44  (monotonic shrink) → 59
```
Monotonic collapse, ZERO reversal. distant/balloon displacement = 0 (max-during-collapse never exceeds
the starting expanded width). 3-cycle test: cycle 2 & 3 `endSnap = 0` (perfect 496→59, no snap).
After frame: `/tmp/respec-fixes/D3-dock/after-midcollapse-light.png` (dock at w=279 mid-collapse — a
correct intermediate width, NOT ballooned to 496).

**WebKit (Playwright bundled webkit — engine corroboration that the directional calc-blend resolves):**
```
WK cycle 1: 491→446→383→287→154→99→43→59   reversals(>30px up)=0
WK cycle 2: 491→474→426→...→118→99→71→60→59  reversals=0, endSnap=0
```

**Real Safari / WKWebView (Apple GPU / Metal, off-screen WKWebView, both modes):**
`/tmp/respec-fixes/D3-dock/safari-dock-overview-{light,dark}.png` (2880×1800) — confirm the dock resting
paint is healthy in real WebKit/Metal (collapsed dock = correct home-circle, NOT ballooned; media-transport
+ shell docks read as legible warm glass). The fix touches only the in-flight morph, not the resting
endpoints, so the resting paint is unregressed.

### Residual (minor, pre-existing, NOT introduced by the fix)

First-collapse-only 15px end-snap (44→59) on a dock that starts EXPANDED and whose resting-collapsed box
was never measured: `--dock-collapsed-px` holds its seeded floor (~44) until the ResizeObserver measures
the resting collapsed render (59) AFTER the first collapse — so cycle 1 ends with a 15px snap, cycles 2+
are `endSnap=0`. Default docks (`startCollapsed: true`) measure the collapsed box at mount, so their FIRST
collapse is already clean. This is a `dockMorphMeasure.ts` seed-staleness, orthogonal to the directional
fix, far milder than the fixed 440px balloon — left untouched (chasing it risks the device-free
endpoint gates for negligible gain). Recorded for WS2 dock convergence if a fully-clean first-collapse on
a start-expanded dock is wanted.

---

## NON-DEFECTS CONFIRMED (no fix — honest negatives)

- **cd9ce46 dock-blur demotion** (the named candidate): the dock backdrop resolves `blur(8px) saturate(1.4)`
  live (was `blur(9px) saturate(1.4) brightness(1.02)`). A 1px blur reduction + a lost 2% brightness lift —
  sub-perceptual, matching re-spec Pass 1's "phantom (byte-identical, ±2% brightness)" finding. The dock
  reads as warm, legible glass over its backdrop in BOTH modes on all routes at rest. NOT a live defect.
- **Standing cluster** (persistent controls / iOS hover register / dynamic darkening): surveyed at rest on
  overview/layers/rail both modes — the dock reads as warm transmissive glass, the active item lifts as a
  glass tier, glyphs are legible warm ink, the vertical dock reads correctly over its field. No live
  legibility/register regression observed. These read as already-closed.

## Files changed
- `src/styles/dock/layers.css` — the directional `--dock-expand-t` blend fix (+ doc comment).
- `scripts/proof-dock-engine.mjs` — E4 gate updated to assert the directional form (it encoded the bug).

## Gates (worktree)
- `proof:dock-engine` PASS · `proof:dock-morph-family` PASS · `proof:dock-arbitrary` PASS
- `proof:no-layout-animation` LOCKED (0 layout-property animations) · `proof:dock-no-scale-pop` device-free arm PASS
- `npx vue-tsc --noEmit` exit 0
- `node scripts/verify-siblings-intact.mjs --quiet` exit 0 (before + after)

## Patches
- `/tmp/respec-fixes/D3-dock.patch` — src/demo scope (the CSS fix).
- `/tmp/respec-fixes/D3-dock-full.patch` — incl. the `scripts/proof-dock-engine.mjs` gate update (needed
  for the gate to pass — it encoded the buggy form).
