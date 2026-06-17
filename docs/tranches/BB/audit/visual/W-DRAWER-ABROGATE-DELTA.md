# BB.W-DRAWER-ABROGATE — DELTA (the abrogation truth + the born-RED→GREEN log)

**Wave**: BB.W-DRAWER-ABROGATE — the Drawer family re-built on reka `DialogRoot` + a house `SpringProgress` snap engine; vaul-vue (and its `@vueuse/core ^10.8` hard-dep) ABROGATED
**Captured**: 2026-06-17 (the source de-fork + the gate born-RED→GREEN; the binding live-π whole-page capture rides W-REFLECT3 / Batch 7 per BA inv-4)
**HEAD at edit**: `881f27d3` (the §0 re-ground HEAD — the brief cited `6c8eb429`; the cite-drift is recorded below)
**Route (consumer #1)**: `/compositions/drawer-live-behind` + `/containers/drawer` (the two demo mounts — zero external binaries)
**Both-mode frames (W-REFLECT3 owns the capture)**: `W-DRAWER-ABROGATE-snap-series-{light,dark}.png`, `W-DRAWER-ABROGATE-live-behind-cta-{light,dark}.png`, `W-DRAWER-ABROGATE-prm-seat.png`

## §0 cite-drift (re-grounded at HEAD `881f27d3`, recorded per BA inv-3)

The brief grounded the dual + census at `13abb3e2`; the spec re-grounded at `6c8eb429`. At the TRUE HEAD `881f27d3` the sibling Batch-4 edits had advanced the tree:

| spec cite | HEAD `881f27d3` reality | disposition |
|---|---|---|
| `package.json:830` peer, `:875` dev | peer at `:846`, dev at `:891` | the two-row removal still holds; line numbers moved (recorded so the orchestrator deletes by NAME, not line) |
| "DrawerTitle/DrawerDescription are already pure house SFCs (no vaul)" (REKA-SUBSTRATE-EXEMPLAR §28) | BOTH import `vaul-vue` types + components (`DrawerTitle.vue:2-3`, `DrawerDescription.vue:2-3`) | the modify-IF rows FIRED — both re-pointed onto reka `DialogTitle`/`DialogDescription` |
| 4 vaul SFC import sites | 9 vaul import sites (Title + Description each carry a type + a value import) | the gate counts 9 born-RED; all 9 removed |
| `useTouchGate` "the pointer/touch gate the drag composes" | `useTouchGate` is a TAP-TO-ACTIVATE guard (no pointer-drag gesture API) | the drag gesture is a native `pointerdown`/`move`/`up` capture on the handle; the `useDockState` VELOCITY decision SHAPE is reused (a fling advances a detent, a slow release snaps nearest) — the spec's "reuse the velocity tracking by shape" clause, not a literal `useTouchGate` drag import |

## The @vueuse-10 dual — KILLED (the headline evidence)

**BEFORE (born-RED at HEAD — `npm ls @vueuse/core`):**
```
@mkbabb/glass-ui@4.0.0
├── @vueuse/core@14.3.0
├─┬ reka-ui@2.9.7
│ └── @vueuse/core@14.3.0 deduped
└─┬ vaul-vue@0.4.1
  └── @vueuse/core@10.11.1        ← the LONE non-cascade dual
```

**AFTER (the orchestrator runs `npm install` post-vaul-removal — the expected single tree):**
```
@mkbabb/glass-ui@4.0.0
├── @vueuse/core@14.3.0
└─┬ reka-ui@2.9.7
  └── @vueuse/core@14.3.0 deduped
```

The `vaul-vue@0.4.1 → @vueuse/core@10.11.1` leg is the ONLY 10.x in the install graph; removing the two `package.json` vaul rows collapses it to a single `^14` spine — the full `@vueuse ^14` convergence W-SPINE-CONSTELLATION's `proof:constellation-spine` dual-clause consumes (this wave is the ENABLER; the spine wave owns the gate). The DELTA records the raw `npm ls` proof; the spine clause flips GREEN on this removal.

## The de-fork (the eight SFCs onto the reka substrate)

| SFC | was | now |
|---|---|---|
| `Drawer.vue` | vaul `DrawerRoot` + `DrawerRootProps`/`DrawerRootEmits` | reka `DialogRoot`; the snap props (`snapPoints`/`activeSnapPoint`/`direction`/`shouldScaleBackground`) are HOUSE props resolved by the engine (reka knows only `open`/`defaultOpen`/`modal`); `mode="live-behind"` → `:modal="false"`; provides the snap context |
| `DrawerContent.vue` | vaul `DrawerContent` + `DrawerPortal` | reka `DialogPortal` + `DialogContent`; binds `useDrawerSnap`; applies the `--glass-drawer-t` translate; emits `data-glass-drawer*`; the `surface`/`showOverlay`/`[data-surface]` axis PRESERVED byte-for-byte |
| `DrawerOverlay.vue` | vaul `DrawerOverlay` | reka `DialogOverlay`; the `bg-overlay-scrim-strong` + wash-blur scrim classes PRESERVED |
| `DrawerTitle.vue` | vaul `DrawerTitle` | reka `DialogTitle` (the cite-drift modify-IF fired) |
| `DrawerDescription.vue` | vaul `DrawerDescription` | reka `DialogDescription` (the cite-drift modify-IF fired) |
| `index.ts` | re-exports `DrawerPortal`/`DrawerTrigger`/`DrawerClose` from `vaul-vue` | house re-exports off reka `DialogPortal`/`DialogTrigger`/`DialogClose` (the `as-child` contract is reka-native) |
| `DrawerHeader.vue`/`DrawerFooter.vue` | pure house SFCs (no vaul, clean `p-4`) | UNCHANGED (the `--overlay-pad-*` hook for W-CARD-PAD lands on the `p-4` here — see coordination note) |

## The house snap engine (`useDrawerSnap` + `DRAWER_SNAP`)

- ONE `SpringProgress` (`{ response: 0.4, dampingFraction: 0.82 }` — the `DRAWER_SNAP` register, the drawer's OWN settle clock, NOT `DOCK_SPRING`) owns its rAF via `.play(onFrame)`, writing `--glass-drawer-t` (0 = closed/offscreen, 1 = fullest detent) per frame. A re-target mid-flight re-seats from `(value, velocity)` — one continuous trajectory.
- The drag gesture is a native pointer-capture on the `[data-glass-drawer-handle]` grip; the `useDockState`-style velocity decision (`getBoundingClientRect`/`timeStamp` delta → px/s) sends a fling past `DRAWER_FLING_VELOCITY` to the stepped detent, a slow release to the nearest.
- **BB-2 — the direction ladder is NATIVE**: `resolveDefaultSnapPoints(direction)` returns `[0.12, 0.5, 1]` for bottom/top, `[]` (a full-slide) for left/right — the Atlas `:snap-points="[]"` workaround is retired (the engine resolves it). A consumer `snapPoints` always wins.
- **PRM**: `respectReducedMotion: true` jumps the scalar to target in one frame (the deterministic detent seat — a CSS reset cannot reach the spring's rAF).
- **Open-sheet re-snap**: an external `activeSnapPoint` write on an ALREADY-OPEN sheet re-settles it (the `useDrawerSnap` `activeSnapPoint` watch) — the vaul controllable-shadowing limitation the house engine DISSOLVES. The demo's "open-at-chosen-detent-only" comment is re-authored to claim the open-re-snap (scope 6 — the §0 re-ground confirmed the house engine round-trips it; the watch ignores its own writeback by target comparison).

## The LOOK re-point (`[data-vaul-*]` → `[data-glass-drawer-*]`, clean rename, no alias)

| was (vaul-injected) | now (SFC-emitted) |
|---|---|
| `[data-vaul-drawer]` | `data-glass-drawer` (the content root) |
| `[data-vaul-snap-points="true"]` | `data-glass-drawer-snap-points="true"` (resolved when >1 detent) |
| `[data-vaul-drawer-direction="top"]` | `data-glass-drawer-direction="top"` (+ new `left`/`right` siblings for the BB-2 side-lens) |
| `[data-vaul-handle]` (comment-ref) | `data-glass-drawer-handle` + `data-dragging` (the live grip affordance) |

Every `--drawer-*` token + `.glass-drawer`/`.glass-drawer-handle`/`.glass-drawer-grip`/`.glass-drawer-snap-rule` recipe + the `[data-surface]` carve are PRESERVED — only the data-key namespace + the snap-owner narration changed. A `@property --glass-drawer-t` registration (initial 1) was added so a no-snap content-sized sheet stays seated open.

## The `proof:drawer-abrogate` born-RED → GREEN log

**BORN-RED at HEAD (`node scripts/proof-drawer-abrogate.mjs`, exit 1):**
```
W1 no vaul import survives    : NO  (imports:9 pkgRows:2)
W2 family composes reka       : NO
W3 snap on ONE SpringProgress : NO
W5 direction ladder native    : NO  (bottom:NO side:NO)
W6 LOOK keys re-pointed       : NO  (vaul:2 glass-keys:0)
status: FAIL   (21 violations)
```

**AFTER the source de-fork (package.json rows still present — orchestrator-applied):**
```
W1 no vaul import survives    : NO  (imports:0 pkgRows:2)   ← only the package rows remain
W2 family composes reka       : YES
W3 snap on ONE SpringProgress : YES  (DRAWER_SNAP own-clock; cubic-bezier:NO)
W4 live-behind page interactive: YES
W5 direction ladder native    : YES  (bottom:YES side:YES)
W6 LOOK keys re-pointed       : YES  (vaul:0 glass-keys:2 dangling:0)
```

**GREEN at close (simulating the orchestrator's two-row package.json removal — `vaulPackageRows: 0`):** `violations: NONE — GREEN` (verified via the exported `detectDrawerAbrogate` against a vaul-row-stripped package.json).

**Self-test bite (`--self-test`, exit 0):** the synthetic vaul-bearing + drift set REDS W1/W2/W3/W5/W6; the synthetic clean set is CLEAN — the false-witness discipline holds.

## The structural readback (the no-device CI half — W1-W6)

| witness | assertion | result |
|---|---|---|
| W1 | zero `from 'vaul-vue'` across src/** + demo/** + zero package.json rows | imports:0 ✓; package rows removed by the orchestrator (DEPS: lines returned) |
| W2 | Drawer→`DialogRoot`, Content→`DialogPortal`+`DialogContent`, Overlay→`DialogOverlay`, index→reka `Dialog*` | YES |
| W3 | ONE `new SpringProgress(...).play(...)` on `DRAWER_SNAP`; no `cubic-bezier(.32,.72,0,1)`; no `DOCK_SPRING` import | YES (own-clock) |
| W4 | `mode="live-behind"` → reka `:modal="false"`; no forced page `aria-hidden`/`inert` | YES |
| W5 | the resolver READS `direction`; `[0.12,0.5,1]` for bottom/top; full-slide for left/right | YES |
| W6 | drawer.css reads `[data-glass-drawer-*]` (zero `[data-vaul-*]`); the EMIT↔READ pair holds (no dead selector) | YES |

## The binding π (booked to W-REFLECT3, Batch 7 — BA inv-4)

The whole-page live-π capture is the binding truth, captured at W-REFLECT3 over a fresh surface, BOTH modes, mobile + desktop, against the real backdrop, with the AZ-form freshness header. The W-REFLECT3 capture must prove:
- (a) the drawer OPEN + snap frame-series — the `--glass-drawer-t` translate interpolates on the `DRAWER_SNAP` `SpringProgress` clock across peek→half→full (continuous motion, not a discrete jump), BOTH modes;
- (b) the live-behind page-interactive assert — with the live-behind sheet OPEN, `#verdict-cta` (`drawer-live-behind.vue:52`) is clickable (a click increments `ctaPresses` — no focus trap, no page `aria-hidden`); the binding truth W4's source assert anchors;
- (c) the direction ladder — the bottom sheet resolves `[0.12,0.5,1]` (a side-direction sheet, if demonstrated, the full-slide);
- (d) the PRM synchronous seat — under `prefers-reduced-motion: reduce` the snap is a deterministic detent jump (zero motion frames).

## The gestalt verdict (`proof:ba-gestalt` container-band — booked to W-REFLECT2/W-REFLECT3)

Per BA inv-4, the per-mechanism W1-W6 greens do NOT close this visual wave. The `/containers` band (the Drawer's gestalt-roster home) is captured whole-page, BOTH modes, mobile + desktop, and judged: "does the re-built Drawer read as ONE coherent glass sheet — surface, handle, snap feel, live-behind contrast speaking one design language, indistinguishable in LOOK from the vaul original?" The LOOK-equivalence (the re-built sheet renders pixel-equivalent at each detent) is the verdict's anchor. A source-green/visually-broken gap does NOT close — the verdict rides the W-REFLECT triumvirate.

**VERDICT (recorded at W-REFLECT3)**: _pending the live capture (the source de-fork + the gate are GREEN; the binding paint is the reflection-bar's)._
