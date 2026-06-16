# BA → value.js adopt book (the hand-off to the value.js session)

The hand-off note for the value.js session (`~/Programming/value.js`, tranche N). This book
HANDS OFF — it edits NOTHING in the value.js tree (`value.js/docs/tranches/N/` + the value.js
repo are foreign, inv-10/inv-16; the foreign-repo fence is bidirectional — value.js writes no
glass-ui code, glass-ui writes no value.js code). The book records the cut-notes BY NAME; the
value.js session re-pins + retires its interim arms in ITS own tranche.

value.js is the constellation's pure SINK — a live 3.13.0 registry consumer whose N.W9 close
PINS the BA cut. value.js N chartered its close pin at 3.13.0 (`inv-N-6`); BA's **4.0.0** is
where its U-fixes land. value.js RE-TARGETS N.W9's pin to the BA cut and HOLDS until it ships
(the acyclic spine holds — value.js never blocks BA; the wait gates only its FINAL pin, which
closes on our publish).

## 1. The exact-pin

value.js holds 3.13.0 → re-pins EXACT to the **4.0.0** cut (not `^`). `npm install`.

## 2. The cut-notes BY NAME (the value.js-impacting breaks — the atlas register-D discipline)

value.js consumes the glass-ui surface in `PaneSegmentedControl.vue` (`@mkbabb/glass-ui/tabs`)
+ Dialog/menu/Select/Slider consumers. The 4.0.0 breaks it must re-point, BY NAME:

| break | wave | value.js re-point |
|---|---|---|
| the **tabs break** — `SegmentedTabs` `segmented`→`pill`; `ui/Tabs` leaving the public surface | W-TABS | `PaneSegmentedControl.vue` re-points the variant `segmented`→`pill` (consumes `@mkbabb/glass-ui/tabs`) |
| the **Dialog `variant`→`surface` move** | W-SURFACE-AXIS scope 3 | the value.js Dialog consumer re-points `variant="…"`→`surface="…"` |
| the **menu-row glass default flip** | W-MENU-GLASS / A-2's family | the dropdown/context-menu consumers gain the `.glass-menu-row` register by default; a consumer relying on the flat `bg-accent` highlight re-points to `accent` (the explicit escape) |
| the **Select changes** out of W-EMISSION | W-EMISSION (collision-bound/inner-scroll) + W-MENU-GLASS WO-3 | the `SelectTrigger` `size` now writes the `--dropdown-text` font-rung (the trigger+items at ONE scale); `ColorSpaceSelector.vue:17`'s trigger-only font override re-points to the prop |
| the **Slider changes** out of W-EMISSION | W-EMISSION (A-3) | the Slider `size` axis now ships REAL track geometry — a consumer relying on the silently-6px track gets the real `size` track (no rename, rendered behaviour changes) |

## 3. The interim-arm retirements (the AZ W-ADOPT precedent — they RETIRE on adopt)

value.js's INTERIM demo-side arms RETIRE at the bump (the producer-side U-fixes land at 4.0.0,
so the demo-side workarounds are superseded):

- **`breathing`→`drifting`** — the BA-VJS-2 / W-STAGE breathing rider makes the aurora `breathing`
  register HONEST (non-zero nucleiDrift/paletteDrift); the value.js demo-side `breathing` default
  reverts to `drifting`.
- **the bespoke `PaletteCardSkeleton.vue`** (`bg-foreground/[0.04]` over `bg-card` — the "too black"
  composite) — re-authored onto `<Skeleton surface="glass">` (the W-SURFACE-AXIS scope-6 register;
  the D-1 named downstream consumer — the `--skeleton-glass-bg` translucent shimmer over the
  frosted plate).
- **the trigger-only font override** (`ColorSpaceSelector.vue:17`) — re-points to the `SelectTrigger`
  font-rung prop (BA-VJS-4 / WO-3; the trigger+items at ONE scale).

## 4. THE C-1 CROSS-REPO 4.x BLOCK (recorded — the satellite-color ask waits on 4.x, NOT 4.0.0)

value.js cannot derive per-satellite colors until **BA-VJS-5 / C-1** lands. W-GOO-REDRESS took
**arm B** (book to 4.x — the GL fence stays at the metaball substrate; widening it to the
`uSatColor` per-source seam is a 4.x point-release ask, not the 4.0.0 cut). value.js's
satellite-color ask therefore WAITS on the **4.x point release**, not the 4.0.0 cut. The
acyclic spine holds: value.js never blocks BA; this is a forward dependency on a future glass-ui
point release, named here so the value.js session books it (NOT as a 4.0.0 adopt blocker).

## 5. The adopt sequence (for the value.js session, on greenlight)

1. Re-pin `@mkbabb/glass-ui` to EXACT `4.0.0`; `npm install`.
2. `PaneSegmentedControl.vue` — `segmented`→`pill`.
3. The Dialog consumer — `variant`→`surface`.
4. The dropdown/context-menu + Select/Slider consumers — re-point per §2.
5. Retire the interim arms (§3): `breathing`→`drifting`, the bespoke skeleton onto
   `<Skeleton surface="glass">`, the trigger-only font override onto the prop.
6. Land the producer-side U-fixes; `vue-tsc` + build green; close the N.W9 final pin on our publish.
7. BOOK the C-1 satellite-color ask to the glass-ui 4.x point release (§4) — NOT a 4.0.0 blocker.
