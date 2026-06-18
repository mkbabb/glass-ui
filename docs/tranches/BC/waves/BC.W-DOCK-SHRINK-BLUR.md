# BC.W-DOCK-SHRINK-BLUR — the shrunken dock is CRISP, not a blurry mess (gate the resting self-blur to the morph only)

- **Band:** 2 · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** After `BC.W-DOCK-ENGINE` (the buttery morph) — independent of `BC.W-LIQUID-MORPH`/`BC.W-DOCK-ARBITRARY` (a disjoint root: the resting self-blur, not the morph geometry). Pairs with `BC.W-BLACK-BAR` (the dock rim) for the "/dock/overview is a blurry mess" defect.
- **Owns / closes:**
  - USER-DEFECTS §A "When the dock is SHRUNKEN it's a **blurry mess**."
  - USER-DEFECTS §A "`/dock/overview` is TOTALLY broken, blurry, a mess." (the BLUR half — the motion half is `BC.W-DOCK-ENGINE`)
  - DEFECT-LEDGER **D3** (the blur arm) "/dock/overview blurry + a mess."
  - ORCHESTRATION §1 Band 2 box: `BC.W-DOCK-SHRINK-BLUR — the shrunken dock is not a blurry mess`.

## Goal (the gestalt)
Collapse the dock on `/dock/overview` to its small pill: it reads as a CRISP little glass pill — sharp edges, sharp glyph, the backdrop reading cleanly through its own blur. There is no muddy haze on the dock's own content, no double-blur smear. The decongest-blur that blooms IN as the dock expands (the iOS-27 materialization) is a transient that lives ONLY during the morph gesture; the moment the dock is at rest — collapsed OR expanded — its own pixels are sharp. The user's "when the dock is SHRUNKEN it's a blurry mess" is gone because the resting collapsed state no longer carries a permanent 3px self-blur stacked on top of the backdrop blur.

## Starting state (measured, file:line)
**The resting self-blur is LIVE at the collapsed endpoint (glass-dock-codebase.md §2.4).** `src/styles/dock/morph.css:79-84`:
```css
.glass-dock {
    --dock-reveal-blur: 3px;
    filter: blur(calc(var(--dock-reveal-blur) * (1 - var(--dock-expand-t, 1))));
}
```
The `filter: blur()` is on the dock's OWN pixels (the W-LIQUID-REVEAL "decongest" bloom — `morph.css:67-78` "Collapsed (`--dock-expand-t` 0) the dock content reads a faint `blur(--dock-reveal-blur)` decongest; as it expands the blur SETTLES to 0"). The intent is a TRANSIENT bloom-in (the surface decongests as it materializes). But it is keyed off `--dock-expand-t`, which at REST resolves to the class endpoint (`morph.css:49,53`: `--dock-expand-t: 1` expanded / `0` collapsed) — so:
- At `--dock-expand-t: 0` (collapsed AT REST), `filter: blur(3px * (1 - 0)) = blur(3px)` — a **PERMANENT 3px self-blur on a resting collapsed dock.**
- Live-confirmed (glass-dock-codebase.md §2.4): the SidebarDock at expand-t 1 measured `filter: blur(0px)` (correct at expansion) but `--dock-reveal-blur: 3px` is live, so a collapsed dock at expand-t 0 carries `blur(3px)`.
- **STACKED with the backdrop blur:** `tokens/glass.css:92` `--glass-blur-dock-radius: 9px` → the dock's `backdrop-filter: blur(9px)`. A small collapsed pill (~54-59px) reading a 3px CONTENT self-blur + a 9px BACKDROP blur is muddy — the "blurry mess when shrunken" (glass-dock-codebase.md §2.4).
- The PRM bracket zeros it (`morph.css:487-491`) but at rest non-PRM it is LIVE — so the common case (a user with motion enabled) sees the resting blur.

The mechanism is the `--dock-expand-t` directional scalar AND the `[data-morphing]` armed state — but the `filter` reads `--dock-expand-t` (which resolves to the rest endpoint at rest), NOT `[data-morphing]` (which clears at settle). That is the root: the decongest blur was meant to be a morph-transient (gated on `[data-morphing]`) but is keyed off a scalar that stays at its endpoint at rest.

## Target spec (grounded)
The decongest bloom is a TRANSIENT, not a resting state. Gate the self-blur to the morph gesture so the resting collapsed dock is CRISP. Two viable moves; the wave bakes **(a)** (the cleanest — the blur lives only during the gesture):

### (a) — THE BAKE: gate `--dock-reveal-blur` to `[data-morphing]` (the transient bloom)
The decongest blur engages ONLY while the dock is actively morphing (the `[data-morphing]` state the driver sets at gesture start, clears on settle — `morph.css:32` "`[data-morphing]` armed on the root by useLayerTransition, cleared on settle"). At rest (collapsed OR expanded, no `[data-morphing]`) the self-blur is `0`:
```css
.glass-dock {
    --dock-reveal-blur: 0px;   /* resting: CRISP */
}
.glass-dock[data-morphing] {
    --dock-reveal-blur: 3px;   /* the transient decongest bloom, only mid-morph */
    filter: blur(calc(var(--dock-reveal-blur) * (1 - var(--dock-expand-t, 1))));
}
```
So during the morph the surface decongests (3px → 0 as it materializes — the iOS-27 bloom), and the moment it settles (`[data-morphing]` clears) the self-blur is gone, the dock crisp. The backdrop blur (`--glass-blur-dock-radius: 9px`) stays — that is the glass MATERIAL (blurring what's BEHIND, the correct register), untouched. Only the dock's OWN-pixel self-blur is gated.

### (b) — the fallback if the bloom must persist as a resting whisper: drop the collapsed endpoint to ≤1px
If the decongest is wanted as a faint resting texture (it is NOT, per the user's "blurry mess"), the collapsed endpoint drops to ≤1px — but this still stacks on the 9px backdrop and the user explicitly wants the shrunken dock CRISP. **(a) is the bake; (b) is recorded as the rejected alternative.**

### The crisp-at-rest contract (the binding outcome)
- **Collapsed AT REST:** `filter: blur(0)` on the dock's own pixels (the self-blur is gone). The backdrop `blur(9px)` stays (the glass material). The glyph + edges are sharp.
- **Expanded AT REST:** already `filter: blur(0)` (live-confirmed) — unchanged.
- **Mid-morph:** the 3px decongest blooms in (the transient iOS-27 materialization) — preserved as the gesture-only effect.
- **PRM:** the self-blur is zeroed in all states (the existing `morph.css:487-491` carve, preserved; under PRM there is no morph transient either).

### The numbers (the bake table)
| axis | HEAD | TARGET | source |
|---|---|---|---|
| resting collapsed self-blur | `blur(3px)` (permanent) | `blur(0)` (crisp) | glass-dock-codebase.md §2.4 |
| mid-morph decongest | `blur(3px → 0)` keyed on `--dock-expand-t` | `blur(3px → 0)` gated on `[data-morphing]` | morph.css:79-84 |
| backdrop blur | `9px` (`--glass-blur-dock-radius`) | KEEP (the glass material) | tokens/glass.css:92 |
| PRM | self-blur zeroed | KEEP zeroed | morph.css:487-491 |

## Mechanism / files
- **Edit `src/styles/dock/morph.css:79-84`** — move the `--dock-reveal-blur: 3px` + the `filter: blur(...)` rule INTO a `.glass-dock[data-morphing]` scope; the bare `.glass-dock` resting rule sets `--dock-reveal-blur: 0px` (or drops the `filter` entirely at rest). The `[data-morphing]` clears on settle (the existing driver behavior), so the resting dock is crisp by construction.
- **READ-ONLY:** `tokens/glass.css:92` `--glass-blur-dock-radius` (the backdrop blur — the glass material, untouched); the W-GLASS-CAL blur dial-back (untouched); the `--dock-expand-t` derivation (untouched — the blur is re-gated, the scalar is unchanged).
- **The PRM carve** (`morph.css:487-491`) is preserved (the self-blur is already zeroed under reduce; the re-gate composes with it — under PRM there is no `[data-morphing]` transient either).
- **The ONE source:** the self-blur is the `--dock-reveal-blur` knob, now scoped to `[data-morphing]`. No second blur path.

## Acceptance (gestalt + measured + gate)
1. **CAPTURED-PAINT gestalt criterion (dev-tools MCP):** a before/after composited screenshot of the COLLAPSED dock on `/dock/overview` (a real GPU host, BOTH modes, the collapsed pill at rest). A human reads: the collapsed pill is a CRISP glass pill — sharp glyph, sharp edges, the backdrop clean through it — NOT a muddy haze. A second capture mid-morph shows the decongest bloom IS present during the gesture (the transient preserved). The capture lands at `docs/tranches/BC/audit/visual/W-DOCK-SHRINK-BLUR-DELTA.md` (Live-verify = captured delta via the dev-tools MCP, never a commit claim).
2. **Machine gate `proof:dock-shrink-blur`** (born-RED on HEAD → GREEN at the fix; device-free SOURCE arm `["local","ci","release"]`):
   - **S1 — resting self-blur zero.** The bare `.glass-dock` rule resolves `--dock-reveal-blur: 0` (or carries no resting `filter: blur()` on its own pixels). Born-RED on HEAD's bare `.glass-dock { --dock-reveal-blur: 3px; filter: blur(...) }`. Self-test bite: a planted bare `.glass-dock { --dock-reveal-blur: 3px }` reds.
   - **S2 — the decongest is morph-gated.** The `--dock-reveal-blur: 3px` + `filter: blur(...)` decongest lives ONLY under `.glass-dock[data-morphing]` (the transient). Born-RED: HEAD keys it off `--dock-expand-t` on the bare `.glass-dock`. Self-test bite: a decongest blur on the bare `.glass-dock` (not `[data-morphing]`) reds.
   - **S3 — the backdrop blur untouched.** `--glass-blur-dock-radius: 9px` is byte-unchanged (the glass material is preserved; the wave touches ONLY the own-pixel self-blur). Self-test bite: a planted `--glass-blur-dock-radius` edit reds.
   - **S4 — the PRM carve preserved.** The PRM block (`morph.css:487-491`) still zeroes the self-blur under reduce.
   - **+ a self-test bite per clause.**
3. **π readback `tests-visual/dock-shrink-blur.spec.ts`** (both modes + WebKit, LOCAL real-GPU render — rides `BC.W-PAINT-GATE` / the gestalt close):
   - getComputedStyle on the COLLAPSED dock at rest: the resolved `filter` is `blur(0px)`/`none` on the dock's own pixels (born-RED on HEAD's `blur(3px)` at the collapsed endpoint).
   - A **sharpness readback** of the collapsed pill crop: an edge-gradient / high-frequency measure shows the collapsed glyph + edges are SHARP (above a crispness threshold), not the HEAD muddy haze — born-RED on HEAD.
   - A **mid-morph capture**: during `[data-morphing]` the self-blur IS present (the transient decongest preserved — the bloom is not regressed away).
   - Safari/WebKit: `filter: blur()` is cross-engine — the crisp-at-rest + transient-mid-morph behavior MUST paint identically on WebKit.

## Fences / invariants (must NOT regress)
- **The backdrop blur is the glass material — UNTOUCHED** (`--glass-blur-dock-radius: 9px`, W-GLASS-CAL dial-back): this wave touches ONLY the dock's OWN-pixel self-blur (`--dock-reveal-blur`), never the backdrop-filter that blurs what's behind (the glass register).
- **The decongest bloom is PRESERVED as a transient** (W-LIQUID-REVEAL): the iOS-27 materialization decongest still blooms IN during the morph gesture; it is re-gated to `[data-morphing]`, not removed. The bloom-from-source identity is intact.
- **The `--dock-expand-t` derivation is UNTOUCHED** (BB.W-DOCK-MORPH-FAMILY): the scalar is unchanged; the blur is re-scoped to the `[data-morphing]` state, the scalar still drives the chrome interps.
- **Clean break, no alias** (MEMORY: no backwards compat): the bare-`.glass-dock` resting blur is DELETED + re-scoped; no `--dock-reveal-blur-legacy`.
- **PRM preserved** (W-MOTION-CANON P6): the self-blur stays zeroed under reduce (the existing carve composes with the re-gate).
- **Byte-fenced (not touched):** the GL shaders, the `--glass-level`/`--glass-tint-*` recipes, the W-GLASS-CAL blur radii (incl. `--glass-blur-dock-radius`), the morph geometry.

## Folds (deferrals discharged)
- The "blurry mess when shrunken" (DEFECT-LEDGER D3 blur arm, USER-DEFECTS §A) is root-caused (the resting self-blur, glass-dock-codebase.md §2.4) + closed here. DECIDED, no re-book.
- This wave is the DISJOINT blur root from the motion root (`BC.W-DOCK-ENGINE`) and the geometry root (`BC.W-LIQUID-MORPH`) — the "/dock/overview is a blurry mess" defect is split across the three (motion stutter, geometry white-morph, resting self-blur), each owned by its wave. Recorded DECIDED-split.
