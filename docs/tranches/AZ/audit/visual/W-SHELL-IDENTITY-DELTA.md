# AZ.W-SHELL-IDENTITY — the Foundations-ℱ becomes the single Foundations entry: the Compass dup drops, the DockSeparator demarcates, the glyph is optically centered, the hover pill gains its glass register · DELTA

<!-- surface-paths: demo/layout/SidebarDock.vue, demo/layout/dock-nav.css, scripts/proof-shell-identity.mjs, tests-visual/shell-identity.spec.ts -->
<!-- surface-hash: 250c0d68c7d576689b7a984dc328219a2cd55cf5f3ceca93320b1e226b4569c6 -->
<!-- AZ.W-GATES (D6) content-hash freshness model: fresh IFF the four surface-paths'
     bytes are byte-identical to capture time (sha256 of the "\n"-joined bytes,
     computed via proof-live-verified-ledger.mjs::surfaceHash). Stamped at the
     own-surface capture against the current AZ-tree bytes — the home-region rest +
     hover PNGs were shot on :5199 with the wave's source edits in place. -->

The two MEASURED R3 defects in the demo shell's home control are closed: the duplicated
Compass is GONE (the script-ℱ IS the single Foundations affordance, demarcated by a
`<DockSeparator>`, sized slightly larger), the ℱ ink-mass sits optically centered inside
the ±0.5px band, and the home control carries the first-class dock-control glass hover
pill (not a bare transparent circle).

## §0 re-ground — the cites shifted; the offset was RE-MEASURED

The SidebarDock template moved a lot under the Batch-2 dock waves. The §3 cites at
authoring (`SidebarDock.vue:98-148`) now read at `:149-204` (the `#persistent` ℱ region
at `:149-173`, the primary-category `DockIconButton` loop at `:176-204`). The Foundations
`icon: Compass` cite holds (`manifest.ts:109`); the home redirect holds (`router.ts:15`
→ `firstStoryPath()`).

**The optical offset was re-measured at HEAD (the §0 mandate).** The authoring-time
seed was `-2.38/-3.25`; the live re-measure over the 40×40 home rect at dpr=4 (the C8
probe scale, the un-transformed glyph at the 2rem brand size) reads the ink-mass at
**dx=+2.63px / dy=+3.75px** of the geometric center (the WONK-1 italic slant + the
script-F intrinsic asymmetry lean the ink DOWN-RIGHT). The nudge re-derives from the
fresh measurement — `transform: translate(-2.63px, -3.75px)` — re-seating the ink at
**dx≈-0.13 / dy≈0**, inside the ±0.5px band. (The first HEAD probe read a transient
`-3.5/-4` against a stale HMR frame; the trustworthy baseline is the transform-removed
measurement, agreed by both headless renderers.)

## The four moves

1. **Drop the duplicate Compass; ℱ becomes the Foundations entry (D1).** `primaryCategories`
   now filters `!c.reference && c.id !== "foundations"` (`SidebarDock.vue`), so the
   Foundations category no longer renders its own Compass `DockIconButton`. The ℱ wordmark
   `RouterLink to="/"` (→ `/foundations/intro`) is the single Foundations affordance. The
   rail cycle (`railContextIds`) keeps Foundations reachable (it spans every non-reference
   category) so the `<DockRail>` end-icon still advances through it.

2. **Demarcate with a `<DockSeparator>` + size the ℱ slightly larger (D1).** A
   `<DockSeparator />` sits below the home control in the `#persistent` region (the
   home-top divider idiom). The ℱ glyph is `font-size: 2rem` (up from 1.875rem) —
   slightly larger than the 1rem/h-4 category glyphs, the brand anchor.

3. **Optically center the ℱ (D2).** `.demo-sidebar-home > span { transform: translate(-2.63px, -3.75px) }`
   in `dock-nav.css`, keyed to the live-measured offset (above).

4. **Glass hover pill (D3).** The ℱ `RouterLink` renders AS a `<DockIconButton as-child>`,
   so it composes the first-class dock-control glass hover register WHOLESALE — no
   hand-rolled hover bg. It is now `class="dock-icon-button glass-specular-track
   demo-sidebar-home focus-ring tap-squish"`.

## HG1 — the duplicated Compass is GONE; ℱ is the demarcated, larger Foundations entry

Captured AFTER: `W-SHELL-IDENTITY-home-after.png` (dpr=2) + `W-SHELL-IDENTITY-home-rest.png`
(the π G-CLOSE capture). The home region reads ℱ (larger) → hairline `<DockSeparator>` →
the category glyphs (Droplet=Substrates, FormInput=Forms, Shapes=Display). NO Compass
home dup.

Live DOM readback (S5b): `hasHomeF: true`, `foundationsCategoryButtonCount: 0`,
`persistentHasSeparator: true`, `homeHasDockClass: true`. The visible category nav now
starts at "Substrates" (Foundations is no longer a redundant nav row).

## HG2 — the ℱ ink-mass is OPTICALLY centered (the measured band)

| state | dx | dy | within ±0.5px |
|---|---|---|---|
| BEFORE (un-transformed, dpr=4) | +2.63px | +3.75px | NO (the down-right ink lean) |
| AFTER (`translate(-2.63px, -3.75px)`, dpr=4 rest) | -0.13px | 0px | **YES** |

The π arm (`tests-visual/shell-identity.spec.ts`, S5a) re-runs the C8 ink-scan over the
home rect at dpr=4 and asserts `|dx| ≤ 0.5 AND |dy| ≤ 0.5`. A present-but-WRONG nudge
passes the device-free S2 (a transform exists) but REDs S5a (the band) — the binding
bite the structural check cannot give.

## HG3 — the home control carries a glass hover pill

A hover-state readback on the home `RouterLink` (now a `.dock-icon-button`):

| prop | REST | HOVER |
|---|---|---|
| `background-color` | `rgba(0, 0, 0, 0)` (transparent) | `color(srgb 0.9824 0.98144 0.9776 / 0.65)` — the `--dock-control-hover-bg` glass tier |
| `scale` | `1` | `1.1` (`--scale-hover-dock`) |
| `::before` specular | opacity 0 | opacity 0.1 (the travelling catch-light) |

Captured: `W-SHELL-IDENTITY-home-hover.png` (the glass pill + specular gleam lifting
behind the ℱ) vs `W-SHELL-IDENTITY-home-rest.png`. The BEFORE (C8-hover-pill-probe.mjs)
was a bare transparent circle (`rgba(0,0,0,0)` / `boxShadow: none`).

## HG4 — `proof:shell-identity` born-RED → GREEN

```
proof:shell-identity — the demo-shell home-region identity gate (AZ.W-SHELL-IDENTITY, S1–S4)
  5/5 pass
    ✓ no-redundant-foundations
    ✓ optical-center-transform-present — translate(-2.63px, -3.75px)
    ✓ home-control-glass-register — <DockIconButton as-child>
    ✓ home-separator — <DockSeparator> in the #persistent region
    ✓ pi-readback-spec-exists
```

Born-RED proof (the pre-edit shape: foundations in the loop, a bare `rounded-full`
RouterLink, no transform, no home separator): S1/S2/S3 RED, the gate exits non-zero.

## Gates

- `proof:shell-identity` — 5/5 GREEN (device-free S1–S4 SidebarDock/dock-nav src-scan).
- `tests-visual/shell-identity.spec.ts` — 3/3 GREEN (S5a band, S5b DOM/hover, G-CLOSE
  capture; LIVE_VERIFIED_LOCAL_ONLY, ledger-backstopped).
- `npm run typecheck` — GREEN.
- Adjacent fleet: `proof:dock-unify` GREEN (F4 shell-docks STRICT — the home control
  stays the `#persistent` anchor, scope-fence respected); `proof:register-ios` GREEN
  (the negative-red predicate holds — the ℱ is static `--viz-fourier` ink, not on an
  interactive register).

## Scope-fence honored

DEMO-shell fix only — the library `DockIconButton` + `DockSeparator` + the dock-control
glass hover register (W-REGISTER-IOS) are CONSUMED, not edited. No library-source change.
The hover register is W-REGISTER-IOS's domain (consumed, not redefined); the home-region
separator is the SAME demarcation W-DOCK-NORMALIZE's census reads (asserted once, not
double-added).
