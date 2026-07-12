# BI.W-DOCK-ESCAPE — the top-layer popover escape (fans / satellites / menus / search)

Band B3 (dock greenfield). Design: D-DOCK PASS-1 §2.3 (the ESCAPE arm = DOCK-C), PASS-4B ruling 2 (the JS
one-shot ships as THE positioning path; native CSS anchor positioning BANKED), ruling 4 (railProjection
retires). Lands ON the W-DOCK-SPINE three-layer box (L2 = the top layer).

## §Mandate

Discharges: **UF-C2** ("The rail implementation is broken and needs to be re-designed from first principles"
— ss-03: fanned chips overlap the dock body, misaligned geometry). Registry: FAM-3 (rail geometry overlap);
the `railProjection.ts` φ²-crossing math re-invented 3× (BC→BE→BG).

## §Design

The rail/fan defect is a downstream compensation for the triple-identity clip box (PASS-1 §0): chips overlap
because they escape a clipping ancestor via the hand-rolled `.glass-dock-frame` `display:contents` sibling +
`railProjection.ts` ring math. The idiomatic fix is the **top layer** (PASS-1 §2.3): satellite fans, the
facet strip, dock-anchored menus, and the search surface render as **`popover`** elements. The top layer is
exempt from ancestor `overflow`/`clip`/`contain`/`transform`/`filter` **BY SPEC** — "chips overlap the dock
body" / "fan clips at the port end" become impossible, and `popovertarget` gives light-dismiss, focus
management, Escape, `aria-expanded` natively (retiring bespoke guard code).

**Placement = the JS one-shot, THE path (PASS-4B ruling 2 — decided, not dual).** A single transform-safe
`getBoundingClientRect` on open/resize positions the popover — **byte-identical on both engines**. Native CSS
anchor positioning is **BANKED** (re-trigger: WebKit resolves `anchor()` correctly through transformed
chains). The SAF-1 landmine (arms-a PROVED: Safari 26 mis-resolves `anchor()` when the anchor chain carries a
transform — the −208px dock-centering case) is fenced by construction: no native-anchor arm, no dual path,
and the W-DOCK-SPINE transform-free centering keeps the chain clean. This is NOT a masking fallback — it is a
one-shot placement of an already-working top-layer surface, the one place the design tolerates JS positioning
because the primary (the popover) is fully functional without it (a11y, top layer, light-dismiss all native).

**Hover-intent for hover-opened fans** is honest JS (~15 lines of dwell; `interestfor` is Chromium-142-only,
never load-bearing). The light-dismiss × hover-close interop (sweep-past no-open / leave-closes / focus-stays
/ Esc) is wired; if `popover=auto` fights the hover model, fall to `popover=manual` + explicit close (G5
CLOSED on Safari 26 + Chrome + the degrade arm).

**railProjection RETIRES (PASS-4B ruling 4).** An anchored flex strip needs no φ-tier ring math; the pass-1
"compress→scroll yield" dissolves with it. The fan is a plain anchored flex strip in the popover.

## §Work

- Mint the fan/satellite/menu surfaces as `popover` elements anchored to their trigger; a `CSS.supports`-free
  JS one-shot (`getBoundingClientRect` on open + a resize listener) sets `position: fixed; top/left`. NO
  `anchor-name`/`position-anchor`/`@position-try` CSS arm (banked).
- `DockStack.vue` dual modes (13.3K) → the popover fan (facet strip + satellite fan as anchored flex).
- `composables/railProjection.ts` (157L) — DEFINITION-ABSENT (retire; the disposition terminalizes in
  W-DOCK-RETIRES per ruling 4, wired here as the fan's replacement).
- `GlassDock.vue:342-504` — the `.glass-dock-frame`/`.dock-hairline-slot` `display:contents` escape +
  `#rail` slot machinery retire (nothing to escape from once the fan is top-layer); the retire terminalizes
  in W-DOCK-RETIRES.
- `composables/useDockSearch.ts` (285L) — re-host the search content on a popover surface (KEEP the
  `/search`-pipeline logic; move the mount to L2).
- The hover-intent dwell (~15L) + the light-dismiss/hover-close interop matrix.
- `demo/stories/dock/rail.vue` — rebuild the fan on the anchored popover (the reference ESCAPE demo).

## §Acceptance

Gate: **`proof:dock-escape`** (NEW, born-RED at HEAD — `railProjection.ts` + the `.glass-dock-frame` escape
are live on disk; the fan is a clipped in-box sibling, no popover).
- E1 **top-layer-fan** (BORN-RED): the fan/satellite/menu surfaces are `popover` elements; ZERO
  `.glass-dock-frame`/`railProjection` in `src/` → GREEN when the fan is top-layer.
- E2 **single-placement-path**: exactly ONE placement mechanism (the JS one-shot); ZERO `anchor-name`/
  `position-anchor`/`@position-try` in the dock CSS (the banked native arm is absent — no dual path).
- E3 **transform-safe**: the placement reads `getBoundingClientRect` (works through the transform-free
  centered dock); the SAF-1 fence is asserted (no native `anchor()` read).
- Self-test bites: a synthetic re-added native `anchor-name` arm REDs E2; a synthetic re-minted
  `railProjection` export REDs E1.

## §π/DELTA

- **Chips paint OVER the dock body** (UF-C2 killed): the 6-chip fan renders past every former clip line, on
  a fixed-bottom dock, **Safari 26 + Chrome**, both modes.
- **Viewport-edge behavior**: shrink the viewport → the JS one-shot re-places the popover fully in-viewport
  (no clip, no off-screen chip); focus returns on Escape.
- DELTA: `docs/tranches/BI/audit/visual/W-DOCK-ESCAPE-DELTA.md`. Rides W-DOCK-DEVICE + the `proof:ba-gestalt`
  navigation verdict.

## §Obligations

- **Visible-Safari.app** native Escape focus-return-to-invoker (wk2/WKWebView cannot drive clicks/keys) →
  carried by W-DOCK-DEVICE.
- Re-verify the hover-close × light-dismiss interop on real Safari 26 (the `popover=auto` vs `manual`
  decision holds on the visible engine).

## §Dispositions

None terminalized here (railProjection + `.glass-dock-frame` retires terminalize in W-DOCK-RETIRES per
ruling 4; this wave WIRES their replacement so the retire is a clean delete, not a dangling reference).
