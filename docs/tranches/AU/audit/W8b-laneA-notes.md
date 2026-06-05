# AU.W8b Lane A (dock-CSS) — lane notes

Worktree: `/Users/mkbabb/Programming/glass-ui-w8b-a` (branch `w8b-a`, base W8 commit `6dd0d14`).
Units, serial: §1 (AU.W8b.1 visibility-fork native fold) → §3 (AU.W8b.3 dock-controls.css carve)
with §2 (AU.W8b.2 CSS nesting) applied as the control rules move → §8 (AU.W8b.8 anchor-positioning).

## Re-groundings against HEAD (W8 shifted dock.css line numbers ~+47)

W8 inserted the reka-Tabs rail + travelling-indicator block (`dock.css:657-730`), so every control
family moved down vs the AU.W8b spec citations.

| spec cite | region | HEAD line |
|---|---|---|
| §1 `.dock-layers` `:382-386` | container-morph fallback | `:382-386` (unchanged) |
| §1 crossfade contract `:424-460` | shared/inactive/active/leaving | `:424-460` (unchanged) |
| §3 `.dock-icon-button` `:730` | icon-button family | base `:777-862`; `--compact` `:808`; touch floor `:1242` |
| §3 `.dark-mode-toggle-button` `:824-881` | dark-mode toggle family | `:871-928` |
| §3 `.dock-tab-button` `:883-1040` | tab-button + tier-primary/secondary | `:930-1087` |
| §3 `.dock-select-trigger`/`.dock-dropdown-trigger` `:1042-1126` | select/dropdown trigger family | `:1089-1173` |
| §3 touch floor `@media (pointer: coarse)` `:1180-1199` | coarse-pointer floor | `:1227-1246` |

The §1 fallback regions are byte-unchanged vs HEAD; only `@supports` arms are appended.

## §1 (AU.W8b.1) — visibility-fork native fold — LANDED

- `dock.css:382` `.dock-layers` fallback (FLIP `transition: width`) byte-UNCHANGED;
  appended `@supports (interpolate-size: allow-keywords)` arm (interpolate-size on `.dock-layers`,
  `width: calc-size(auto, size)` on `.glass-dock.expanded > .dock-layers` + the active layer-item-host).
- `dock.css:424-460` 3-state crossfade fallback (shared/inactive/active/leaving) byte-UNCHANGED;
  appended `@supports (transition-behavior: allow-discrete)` arm with `transition-behavior: allow-discrete`
  on a SEPARATE declaration (NOT in the shorthand), `@starting-style { opacity:0; visibility:hidden }`
  entry anchor on the active rule.
- CORRECTION vs spec literal: the spec §1 mechanism wrote `transition-duration: var(--dock-motion-resize)`,
  but `--dock-motion-resize` is the COMPOUND `duration easing` token (`var(--duration-normal) var(--dock-resize-spring)`)
  — invalid in the `transition-duration` longhand. Split into `transition-duration: var(--duration-normal)` +
  `transition-timing-function: var(--dock-resize-spring)` so the native arm settles on the SAME timing
  source as the FLIP fallback (preserves `proof:dock-motion-parity`, which checks the token DEFINITION).
- Prepended the `:424` contract comment with the `AU.W8b-visibility-fork` marker.
- `proof:dock-opacity-lockstep` + `proof:dock-motion-parity` stay GREEN (both read the FALLBACK rules /
  the token definition, not the `@supports` arm).

## §3 (AU.W8b.3) carve + §2 (AU.W8b.2) nesting — LANDED (one diff pass)

- Created `src/styles/dock-controls.css` (same `@layer components`): the five control families moved
  VERBATIM modulo §2 &-nesting — `.dock-icon-button` (base/--compact/hover/specular/active/focus/active-paint),
  `.dark-mode-toggle-button` (sizes/hover/focus), `.dock-tab-button` (base/states/tier-primary audacious/
  tier-secondary), `.dock-select-trigger`/`.dock-dropdown-trigger` (base/states/__chevron/open-flip), and
  the `@media (pointer: coarse)` per-button `.dock-icon-button:not(--compact)` touch floor.
- STAYED in dock.css: the motion-token `:where()` group, the shared `:focus-visible`/`:disabled`
  cross-control comma-groups, shell/density/grain/layer-crossfade contract, the `.glass-dock[data-density]`
  width-math half of the coarse-pointer floor.
- §2 nesting applied ONLY to the moved per-family clusters (`&:hover`, `&:active`, `&[data-size=…]`, etc.).
  Cross-control comma-groups (secondary-tier tab+icon group) left FLAT; `[data-density]` blocks left FLAT.
- index.css: `@import "./dock-controls.css";` directly after dock.css; cascade comment names it rung 6b.
- CLAUDE.md Structure block: added the dock-controls.css line.
- Authored `scripts/proof-dock-controls-split.mjs` (house template — comment-strip, pure exported
  `detectSplit`, byte-stable JSON artefact, exit 1). NOT registered in package.json/gates.mjs/ci.yml
  (orchestrator registers at close, manifest==ci).
- DETECTOR NOTE: a "base rule" is the selector followed by a name-boundary then `[,{]` AFTER stripping
  `:where(...)` groups — this accepts the legitimately comma-grouped `.dock-select-trigger,
  .dock-dropdown-trigger {` shared base while still rejecting state rules (`:hover`, `[data-tier]`,
  `:focus-visible`) and the `:where()` motion group.
- Specificity/byte-identity: de-sugared selector-list diff (paren-aware) = IDENTICAL, 121 selectors
  before vs 121 after. Saved to `docs/tranches/AU/audit/W8b-laneA-distdiff.txt`.

## §8 (AU.W8b.8) anchor-positioning — **BOOKED** (floating-ui ships unchanged)

Verdict: BOOK on the reka-positioner-yield ground (the single-active-popover invariant DOES hold, but
the yield invariant FAILS — this is the §3a / §8 binding BOOK condition, not local-edit-recoverable).

Verification before deciding:
- **Single-active-popover invariant — HOLDS.** reka-ui `Select`/`DropdownMenu` are modal (one open at a
  time); the dock-keep contract enforces a single active popover per dock. A shared
  `anchor-name: --gl-dock-popover` would be unambiguous.
- **Reka-positioner-yield invariant — FAILS (binding).** reka-ui's `PopperContent` (the substrate for
  BOTH `SelectContent` and `DropdownMenuContent`) positions the portaled content via `@floating-ui/vue`'s
  `useFloating`, applying an INLINE `transform: floatingStyles.transform` (a `translate(x,y)`) on the
  content element (`node_modules/reka-ui/dist/Popper/PopperContent.js:197,237-238`). There is NO
  per-content prop on `DockSelectTrigger.vue`/`DockDropdownTrigger.vue` — nor on the content components —
  to yield reka's positioner per-content. A supporting engine would run BOTH floating-ui's inline
  `transform` AND the native `anchor()` `inset` → the double-position drift the spec names as binding.
- **Additional structural mismatch:** the spec's CSS selector `[data-glass-dock-portal][data-dock-anchored]`
  applies `position-anchor`/`inset` to the PORTALED CONTENT, but the file-bounds put `data-dock-anchored`
  on the TRIGGER SFCs — separate DOM nodes (the content is teleported). An attr on the trigger cannot
  satisfy a content-node selector, so the opt-in could not be wired through the trigger SFCs alone.

Redress per §3a/§8: BOOK §8. NOT appending the `@supports (anchor-name: --x)` block to dock-controls.css;
NOT adding `data-dock-anchored` to the two trigger SFCs. floating-ui is the unconditional positioner,
unchanged. `DockSelectTrigger.vue`/`DockDropdownTrigger.vue` untouched. No `proof:components-css` impact
(no class dropped). Re-attempting §8 would require either reka-ui shipping a per-content positioner-yield
prop OR glass-ui restructuring the dock popover content to bypass `PopperContent` — both out of W8b
file-bounds.

## Browser-verify — DONE (Playwright MCP, Chrome 149, maximal-support engine)

Drove `npm run dev` (worktree, vite serves `src/`) → `/navigation/dock-layers` (DockLayerGroup
crossfade). The engine supports all three features (`interpolate-size`, `transition-behavior:
allow-discrete`, `anchor-name` → all `CSS.supports` true), so it exercises the native §1 arms.

§1 lockstep — CONFIRMED (computed-style read on `.dock-layer-item-host`):
- `.dock-layers` computes `interpolate-size: allow-keywords` → the native container-morph arm is ACTIVE.
- Active layer: `transition-property: opacity, visibility`, `transition-duration: 0.3s`,
  `transition-behavior: allow-discrete`, timing-fn = the `--dock-resize-spring` `linear()` → opacity AND
  visibility ride the SAME spring at the SAME duration (lockstep by construction).
- Inactive layer: `transition-behavior: allow-discrete`, `0.3s`, `visibility: hidden`, `opacity: 0` →
  animates out of the hit-test tree discretely in lockstep with the opacity crossfade.
- MID-COURSE FIX: the FIRST browser read showed the fallback active rule's `transition` SHORTHAND
  (same (0,2,0) specificity) shadowing the native arm on the active layer (`transition-behavior: normal,
  visibility 0s`). Fixed by re-asserting the discrete-transition longhands inside the `@supports` active
  arm (so source-order lets the native arm govern); re-verified GREEN. `proof:dock-opacity-lockstep` +
  `proof:dock-motion-parity` stay PASS (they read the byte-unchanged FALLBACK active rule + the token def).

No-VT-double-animate — CONFIRMED: the dock layer surfaces carry NO `view-transition-name`
(`layerViewTransitionNames: []`). The DockLayerGroup crossfade is driven purely by the CSS-transition
path (FLIP fallback / native arm), NOT `startViewTransition` / `::view-transition-group(.gl-dock-layer)`.
So the `interpolate-size` width morph + the opacity/visibility crossfade are the SOLE animators — no
double-fire. The §1 caveat (painted width diverging from a VT snapshot) does NOT arise; no triumvirate
needed.

§8 (anchor) browser check N/A — BOOKed (no anchor block landed; nothing to double-position-verify).

## Gate / build / test results (at close)

- `npm run build` GREEN; `npm run typecheck` GREEN (touched no TS).
- `proof:dock-opacity-lockstep` PASS · `proof:dock-motion-parity` PASS · `proof:components-css` PASS.
- `proof:phantom-classes`: glass-ui src/+demo/ CLEAN (PASS with the documented
  `PROOF_PHANTOM_ALLOW_PENDING=1`). The bare RED is the PRE-EXISTING cross-repo `fourier-analysis`
  pending-handoff (29 sites, all in fourier-analysis/, zero in glass-ui) — not a Lane A regression.
- `node scripts/proof-dock-controls-split.mjs` PASS (5/5 control base rules landed, 0 surviving in
  dock.css, shared contract stays).
- BITE-CHECK (proof:dock-css-split): injected a bare `.dock-icon-button { color: red; }` into dock.css
  → gate RED with `✗ dock.css still defines the base rule \`.dock-icon-button { … }\` — move the whole
  .dock-icon-button family to dock-controls.css`; reverted → PASS.
- §2 specificity: de-sugared selector-list diff IDENTICAL (121 = 121, zero added/dropped/changed) —
  `docs/tranches/AU/audit/W8b-laneA-distdiff.txt`.

## Git / main-tree hygiene

Zero working-tree-mutating git subcommands run (read-only `git -C ... worktree list / branch / log /
status` only). Zero writes to `/Users/mkbabb/Programming/glass-ui` (the main tree) — all edits inside
`/Users/mkbabb/Programming/glass-ui-w8b-a`. `docs/precepts/` untouched. The split gate is NOT registered
in package.json/gates.mjs/ci.yml (orchestrator registers at close).

