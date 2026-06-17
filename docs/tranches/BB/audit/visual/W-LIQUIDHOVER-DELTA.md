# BB.W-LIQUIDHOVER — DELTA: the tier-root pointer-following gleam + the disco-grain pop killed

**Freshness header (AZ form)**
- Capture date: 2026-06-17
- HEAD sha (pre-wave base): `dfb67f98` (BB Batch P round 3 partial)
- Demo route(s): `/display/buttons` (glass `<Button>`) · `/dock/overview` (`.dock-icon-button`) · grain-bearing `.glass-resting`/`[data-slot="card"]`
- Viewport: desktop (`chromium-headless-new`) + mobile (`coarse-touch`), both modes
- π spec: `tests-visual/liquid-hover.spec.ts` (LIVE_VERIFIED_LOCAL_ONLY — loads `:5199`, grace-SKIPs on a Playwright-absent CI runner)

## The defect (speedtest C8 / F2 ledger T8-F5 + T8-F6)

> "hovering this speedtest button is not smooth — this sort of liquid glass that's more
> realistic is good, and should be suffused at the root within glass-ui."

The F2 retirement ledger names it precisely: **"the dead-centre static gleam +
disco-grain pop (T8-F5/F6)."** The moving-specular primitive was HALF-shipped — the CSS
`::before` recipe (`material.css`) was fully wired to PAINT (maps `--mouse-x/y` →
`--specular-x/y`, lifts intensity on `:hover`/`:active` for every interactive glass rung),
but its POSITION write was a per-consumer opt-in (hand-wired at DockIconButton + Card +
Button only). Every glass control that did NOT hand-wire the composable hovered DEAD at
the centred 50% fallback — the dead-centre static gleam.

## The fix (gestalt, no workaround)

### 1. The tier-root auto-arm — the position write is a PROPERTY OF THE TIER

- **`createSpecularWriter`** (extracted from `useSpecularTracking.ts`) — the SINGLE
  position-write core: the rAF-coalesced + cached-PRM + cleanup logic, sink-agnostic.
- **`vSpecular`** (`composables/glass/vSpecular.ts`) — the zero-wiring `ObjectDirective`
  (the `vReveal` playbook) wrapping the core, writing `--mouse-x/y` directly on the host
  `el.style`. Published on `/glass`. PRM-aware by construction.
- **`useSpecularTracking`** — re-homed onto the SAME core (the Vue `:style`-ref delivery
  for the gated Card case). ONE logic source, TWO deliveries.

**Adopters (zero call-site wiring):**

| Surface | before (HEAD) | after |
|---|---|---|
| `<Button>` glass variants | hand-wired `useSpecularTracking` + `@pointermove="onPointerMove"` (the BB.W-BUTTON-GLASS "auto-arm not landed" branch) | `v-specular="specularArmed"` (gated to glass-register variants) |
| `<DockIconButton>` | hand-wired triplet (`:style="specularStyle"` + `@pointermove`) | `v-specular` |
| `<DockTabButton>` / `<DockSelectTrigger>` / `<DockDropdownTrigger>` | NO position write (hovered dead-centre) | `v-specular` |
| `<Card specular>` | hand-wired `useSpecularTracking` (gated) | `v-specular="specularArmed"` (the gated case routes the SAME directive — no re-paste) |

### 2. The disco-grain pop killed at the COMPOSITION CLASS

The grain `::after` (`glass/ladder.css`) keeps `background-image:
var(--paper-clean-texture)` ALWAYS PRESENT (the longhand — decoded once at rest, never
toggled to `none`), and any state-driven grain engage cross-fades the `opacity` ONLY on
the new `--glass-grain-engage-duration` (120ms linear direct-write — no spring,
instant-but-smooth per the ask). A `background-image: none → image` swap (the one-frame
decode-and-pop) is structurally barred. The engage collapses to `0ms` under
`prefers-reduced-motion: reduce` (a hover grain cross-fade under reduce is still motion).

## Born-RED → GREEN (proof:glass-cohesion — the `liquid-hover` arm, extend-in-place)

The orchestrator directive: EXTEND `proof:glass-cohesion` (no new gate key — the spec's
`proof:liquid-hover` charge is satisfied as the `liquid-hover` ARM of the existing
cohesion gate). Seven witnesses, all born-RED at HEAD `dfb67f98`:

| witness | HEAD state (RED) | now (GREEN) |
|---|---|---|
| W1 auto-arm-seam-minted-once-wraps-core | `vSpecular.ts` ABSENT; `createSpecularWriter` absent | minted + wraps the core |
| W1 no-forked-mouse-writer | (n/a — passes vacuously; locks single-source) | 0 forked writers |
| W2 interactive-glass-auto-arms-zero-wiring | Button `v-specular` 0 | Button + 4 dock controls + published |
| W3 handwire-retired-no-two-copies | DockIconButton `@pointermove="onPointerMove"` = 1 | 0 hand-wired triplets |
| W4 grain-pop-killed-opacity-crossfade | engage token 0; opacity crossfade 0 | token + crossfade + image-always-present |
| W4 grain-pop-self-test-bite | (self-proving) | flags the none→image fixture |
| W5 pi-readback-spec-exists | spec ABSENT | exists + auto-enrolled |

Gate run: `[liquid-hover] 7/7 pass`, all 11 cohesion arms green (45 surfaces on model,
no regression). `proof:visual-runner` PASS (the new spec auto-enrolled, orphans 0,
union==disk). `npm run typecheck` clean.

## The π binding readback (LOCAL-ONLY — booked to W-REFLECT3)

`tests-visual/liquid-hover.spec.ts` proves, on the real demo in BOTH modes:
- **(a) GLEAM TRACKS** — a pointer-move to 20% vs 80% over a glass `<Button>` reads two
  DISTINCT `--mouse-x` values (Δ > 10pp), neither pinned at the dead-centre 50%.
- **(b) DOCK CONTROL** — `.dock-icon-button` gleams pointer-following with zero wiring.
- **(c) GRAIN NO-POP** — the grain `::after` `background-image` is CONSTANT (never `none`)
  across the hover onset.
- **(d) PRM STATIC** — under reduced-motion the gleam pins static at the centred 50%.

The binding live capture (the painted before/after frames against the dead-centre
baseline) rides W-REFLECT3 (Batch 7) under the provisioned render server — the
cardinal-lesson split: this gate proves the SOURCE auto-arm; the local `--run pi` GREEN
proves the PAINT.

## The `proof:ba-gestalt` verdict

The owning surfaces (the dock + CTA band — "dock" + "glass-feedback" on the gestalt
roster) are judged WHOLE-PAGE, both modes, over their real backdrop: *does the hover read
as liquid glass — the gleam following the pointer smoothly, no static disc, no grain
flash?* The verdict is recorded at the W-REFLECT2/W-REFLECT3 close (the verdict-flipper),
not this wave. A source-green/visually-broken gap does NOT close.

## Fences held

- GL shader fence: `aurora.frag`/`metaball.frag` byte-untouched (the gleam is a `::before`
  radial-gradient + a host `--mouse-x/y` write).
- `--glass-blur-*` / `--glass-specular-intensity-*` magnitude primitives: UNTOUCHED
  (`proof:glass-cal` / `proof:glass-material-sota` stay green — this wave writes POSITION
  + grain TIMING only).
- The disco-retirement rules (BA.W-GLASS-CAL): NOT re-touched — no surviving disco-grain
  RULE was surfaced (the pop was the composition pattern, not a live rule; the §Dispatch
  expected reality confirmed). No W-DEAD-SWEEP referral needed.
- The a11y/PRM brackets (`glass-specular-track.css`, `glass/a11y-fallback.css`): read +
  confirmed-holding, never weakened. The grain engage gains a PRM `transition: none`
  bracket (the new motion the engage introduces, collapsed under reduce).
