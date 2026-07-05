# GLASSUI-S-ASKS — the value.js Tranche S letter (18 items, L1..L18)

**To**: the glass-ui BG/BH inbox (`tranche/BG` live → 5.0.0). **From**: value.js Tranche S.
**Provenance**: `value.js docs/tranches/S/audit/SYNTHESIS.md §7.1` (converged spec, pass-4) +
the 2026-07-05 ratification fold (`audit/RATIFICATION-2026-07-05.md §3`: L17 Blob rename; the
L5 upgrade to joint co-rebuild + the Q7 full-presence constraint) + the `audit/seeds/SEEDS.md`
producer findings (L18 Select chevron; the L5 pointer-shaping append).
**Verified glass-ui HEAD**: `6dce9b5b` (branch `tranche/BG`, 4.2.0; stamped at dispatch
2026-07-05 — L1's three defect sites re-verified live at this HEAD, see the dispatch stamp §
below; the recon stamp `f5c3ff4b` aged out in under an hour, proving the corollary's point).
**Status**: AUTHORED, dispatch-ready — **dispatched at S ratification** (early: the L1/L2/L4
hard-gate-mapped items need the maximum producer window before S rounds 3–4; **L12 is
time-sensitive** — before BH.B4e authors the 203-row MIGRATION table). The live-agent
same-day-cure precedents: D8-1 (`1599c230`→`4b637036`) + the master-lockfile cure (`99009e2a`).

**HEAD-stamp corollary (binding on the dispatcher)**: the dispatching agent **re-stamps the
verified glass-ui HEAD at dispatch** and re-verifies L1's three defect sites against it —
`a633784f` was the pass-2 stamp; `c03ab942` the pass-3 stamp; the producer moves daily
(~10-minute commit cadence on `tranche/BG`).

**Letter discipline** (SYNTHESIS §7.1, verbatim): asks only — S touches ZERO glass-ui files;
every item cites file:line in the producer tree; items already booked producer-side (F9.R1,
relay item 8, de-shadcn, dock-shrink WS2-10) are VERIFY-AT-CUT rows, not re-asks.

---

## The asks (SYNTHESIS §7.1, transcribed verbatim; L5 amended + L17/L18 added at the 2026-07-05 ratification fold)

| L# | Ask | Severity | Ground |
|---|---|---|---|
| L1 | **WebKit aurora shader compile** — 3 GLSL defects, **verified live at HEAD `a633784f`; provenance spans `5cf8e8f0`..`BG.W-AUR-METAL-FINISH`** (pass-2 re-pin: the metal-finish work widened `structureTensorField` vec3→vec4 for the `.w` metal-gradient lane, so two of the three defects are introduced/widened by the LATER work — inspect the CURRENT tree, not the older commit): `flat` reserved-keyword local (`metal-medium.glsl.ts:103`); stale `vec3` forward decl of `structureTensorField` (`flow.glsl.ts:20`) against the `vec4` definition (`mediums.glsl.ts:43`); `vec4`→`vec3` assign (`brush.glsl.ts:330`). Every Safari user has only ever seen the CSS fallback. + a WebKit GLSL compile-smoke gate in glass-ui CI. **Dispatch-time corollary**: the dispatching agent re-stamps the verified HEAD at dispatch — `a633784f` was the pass-2 stamp; the producer moves daily (glass-ui stood at `c03ab942` when pass 3 amended this spec) | **P0** | safari-truth |
| L2 | **AuroraAtoms door**: a lightness-scheme (+`lBand`) atom threaded `resolveAtoms→deriveAurora` (the levers exist — `deriveAurora` already carries `scheme:"light"\|"dark"` + `lBand`, `color.ts:168/:174` — the door doesn't); `hueSpread` + a cross-stop chroma-variance atom. **Naming**: NOT bare `scheme` — the atoms door already speaks "scheme" for the HUE axis (`harmony` is documented as "the hue scheme", `atoms.ts:106-107`); `lightnessScheme`/`lBand` suggested so the two axes stay unambiguous — the final name is the producer's call | P1 | aurora-derive; design-blob-atmosphere G-1 |
| L3 | **`useWatercolorBlob` zombie rAF** → rebuild on the library's own `useRAFLoop` (`pauseWhenHidden` + PRM are first-class there; the animate-mode tick runs forever, invisible under PRM) | **P0** | perf-general §3b |
| L4 | **Backdrop-luma truth**: never resolve luma 0 from an unreadable WebGL canvas — hold the declarative bucket or fail explicitly (the light shell coin-flips to mud today) | **P0** | design-dock-shell P0-3 |
| L5 | **Blob first-principles co-rebuild** (UPGRADED at ratification from "redress asks" — owner Q7 ruling: "re-built from first principles, starting with a SOTA assay and archaeological survey"; grounded in the W0-8 genesis brief `docs/tranches/S/audit/blob-genesis.md`, shared ground for both repos — the producer owns the ENGINE, value.js owns the consumer contract): the standing asks carry into the rebuild — single-full-cost-GPU-surface policy (aurora↔blob backend coordination — the Safari dual-WebGL2 vector); scale-aware deformation ceiling (±35%/frame measured churn); satellites-at-rest (no-park-while-count>0 or visible-orbit rest pose) + the cross-engine satellites-missing regression; canvas DPR scaling; exported HERO preset (the demo's visible-bead ≥96px gate is conditioned on it — SEEDS w6 rider 3); arousal-scales-orbit; chord-dent verify. **Producer-visible constraint (Q7 FLIP)**: the blob is PRESENT at every viewport — the perf envelope on MOBILE GPUs is a real requirement, not a nice-to-have. **Pointer-shaping append (SEEDS, net-new)**: the GooBlob ROOT square (canvas `pointer-events:none`, root `auto`) intercepts sibling-card clicks in the corner-break composition (hit-test at (770,150) resolves to the goo-blob root over the About card) and offers a ghost copy-affordance on dead corners; no clean consumer cure (clip-path would clip the satellite overscan paint) — ask: SDF-shaped hit-testing or a root pointer-events seam. (`uSatColor[]` F9.R1 already NAMED-OWNER+CUT — verify at W8, no re-ask; GAP-1 dist-confirmed absent at 4.2.0/tranche-BG) | P0/P1 | blob-greenfield §5/§6; safari-truth P1; RATIFICATION §2.2/§3; SEEDS.md w6 |
| L6 | **Slider**: `--slider-thumb-border-w` token (default 1.5px); spectrum hover recipe (scale 1.06 + `--surface-tint-15` + `cursor:grab`); spectrum-without-bg fails loudly; Button-primary-over-wash verify (the Mix verb reads permanently disabled) | P1 | design-picker W-C; design-extract F5/F8b |
| L7 | **EasingPicker v2**: `btn-pill`×`glass-btn` co-occurrence fix (the library's own docs name this exact defect); travel-dot rest state; the loop seam landed (kf Oscillator or minimal); curve-glyph preset menu; PRM gate; MOTION_CURVES README truth. (a11y label already relay item 8) | P0(defect)/P1 | design-gradient P0-2/P2-20; motion §4 |
| L8 | **`clampLabel` on DockSelectTrigger — RE-ESCALATED as a hard ask** (named owner + cut; 7+ tranches, 4th booking; the Ad-18 workaround must not spread) | P1 | glassui-consume-map F1 |
| L9 | **Skeleton seams**: `::after` reads `--skeleton-shimmer-delay` (+duration) — custom properties inherit into pseudo-elements, the current host `animationDelay` is structurally dead; `--skeleton-shimmer-tint` token | P1 | design-browse S-10.2 |
| L10 | **Aliasing**: mask-based corner clip for composited glass surfaces (ONE primitive rule); dither in `paletteToCssGradient` + confirm shader-side dither; WatercolorDot Safari sRGB wet-edge recalibration | P1/P2 | aliasing-dithering |
| L11 | Dropdown-menu glass surface tokens (`--dropdown-menu-bg/border/shadow`, select parity) | P2 | design-browse |
| L12 | **`/styles/fonts` = the 18th specifier** — one-line addendum before BH.B4e authors the 203-row MIGRATION table (the table's own discipline demands it) | P2, time-sensitive | glassui-consume-map §2 |
| L13 | Dock: collapsed-circle WS2 residual confirm; `dock-scroll-x` overflow fails visibly; hover-morph off `--duration-panel` onto a hover-grade token | P1/P2 | design-dock-shell; motion §9 |
| L14 | `ConfiguratorRow` label API (consumers can't double-label) + crayon-register Slider variant | P2 | design-blob-atmosphere G-5 |
| L15 | Gold/admin shimmer: evaluate ONE producer primitive for the 3 demo recipes (only if it clears the ≥2-consumer bar) | P2 | god-module §2.2 |
| L16 | `backdrop-filter` `-webkit-` prefix: pick one policy across the 10 stylesheets (2 prefix, 8 don't) | P2 | safari-truth |
| L17 | **GooBlob → `Blob` rename** (owner-ratified 2026-07-05, by-name): component name, subpath (`/goo-blob` → `/blob` — the R-era GAP-2 rename table already anticipated it), types, CSS seams. Lands at the 5.0.0 cut; value.js consumes at W8 (adopt-event); the demo's consumer surface migrates by name, NO alias kept | P1 | RATIFICATION §2.2.3 |
| L18 | **Select chevron rotation is dead code** (net-new, found by the w4 prototype seed): `SelectTrigger.vue:138` `[&[data-state=open]]:rotate-180` targets an attribute reka's SelectIcon never carries — no glass-ui Select consumer has ever had a rotating caret (verified live on two consumers). Fix keys off the trigger's own state (e.g. `in-data-[state=open]:rotate-180`). Repairs every consumer including the dock view-select; the value.js demo carries a marker-commented consumer utility only until it ships (W4-1 seed rider 1) | P1 | SEEDS.md w4-title-component |

---

## Hard-gate map (SYNTHESIS §7.1, verbatim — so the dependency is explicit, not discovered at wave close)

Three letter items gate consuming-wave completion criteria: **L2 → W6-2/W6-3** (the dark L band
+ H/C atoms), **L4 → W7-3** (luma truth), **L1 → W6-5** (Safari aurora re-verify). Each
consuming criterion carries the same explicit fallback: record the producer miss at wave close
as the wave's producer-gap row + re-verify at the W8 adopt — no demo shims, no silently failed
gates (books never gates). Every other letter item is off every wave's critical path.

## Verify-at-cut rows (not re-asks — walked at value.js S.W8)

`uSatColor[]` (F9.R1, named-owner+cut) · EasingPicker a11y (relay item 8) · de-shadcn ·
dock-shrink WS2-10 · aurora-metal re-verify · U6 dock-fission · GAP-4 blob perf.

---

## Dispatch stamp — 2026-07-05, HEAD `6dce9b5b` (tranche/BG)

**L1 re-verification (the HEAD-stamp corollary, executed)**: the aurora tree MOVED
(`glass-aurora/shaders/` → `aurora/constants/shaders/`) but all three defects stand at
identical line numbers, verified live at `6dce9b5b`:
`aurora/constants/shaders/metal-medium.glsl.ts:103` (`vec3 flat = …` — reserved keyword) ·
`aurora/constants/shaders/flow.glsl.ts:20` (`vec3 structureTensorField` forward decl) vs
`aurora/constants/shaders/mediums.glsl.ts:43` (`vec4 structureTensorField` definition) ·
`aurora/constants/shaders/brush.glsl.ts:330` (`vec3 tf = structureTensorField(…)` — vec4→vec3
assign). **The letter's L1 path citations read through this stamp** — inspect the CURRENT tree.

**Producer-side recon folded at dispatch** (read-only assay of this repo, 2026-07-05):

1. **L17 REOPENS a committed ruling — flagged honestly**: your `967cd25e` reply to the R relay
   ruled "the SUBPATH renames goo-blob → blob; the SYMBOLS STAY." The owner's 2026-07-05
   ratification orders the SYMBOL rename too (verbatim: *"We're going to rename it to 'Blob' as
   well--this will need to be changed in glass-ui."*). Owner word supersedes; `BLOB_CONFIG_*`
   already speak BLOB; R14/B2.1-swap + the B4e MIGRATION row are the natural vehicles.
   **Sequencing**: must land before WS12's export-surface regen freezes the rename window;
   `MIGRATION.md` still has zero 5.0.0 content, so the L12 addendum window is also still open.
2. **L5 co-rebuild aligns with your own books**: WS5-02 already rebuilt the blob once
   (PARTIAL — rename unaddressed); `RESEARCH.md:139` ratifies WebGL2 single-pass 2D-SDF as the
   PERMANENT floor with WebGPU NOT warranted; `BG.W-VIZ-SUBSTRATE-DELETE2` books the WGPU-twin
   delete. The second-generation rebuild = collapse to the single WebGL2 SDF engine (drains the
   529-LoC `metaball.wgsl` ratchet baseline), with **F9.R1 (`W-BLOB-SATELLITE-SHADE`, PENDING)
   as the sanctioned home** for `uSatColor[]` + `bodyLightness`/`lightnessFloor` + the
   anchor-bias residual + the pointer-shaping ask. GAP-4 perf (single-canvas, IO/hidden/PRM) is
   LANDED — the rebuild must not regress it; value.js re-verifies at our W8 adopt.
3. **The genesis brief is the shared ground**: value.js S.W0-8 authors
   `docs/tranches/S/audit/blob-genesis.md` (archaeology of every implementation hitherto + SOTA
   assay + the joint contract sketch); it will be relayed into this inbox when it lands —
   nothing here gates on it.
