# Round-3a — live paint verification (fable browser seat, Chrome DevTools MCP, live WebGPU)

Lens: Live paint verification (Chrome DevTools MCP, live WebGPU) of the 5 carried BJ defect claims — screenshots + computed-style readbacks, every capture saved under docs/tranches/BJ/formation/round-3-live/

## Summary

Five carried claims driven live at localhost:5199. ONE is a real shipped defect: CHIP-CSS ORPHAN is confirmed — glass-chip.css is imported nowhere, so a selectable chip toggled aria-pressed=true paints ZERO accent feedback (invisible selection), the ::after flood is absent, and the remove button is unstyled; .glass-capsule saves the base lozenge from looking broken, which is why it slipped. The other four clear or drift-explain: F02 foundations cards are NOT blank white/beige slabs but the intended identity-fallback tiles (dark slab + section name; /display proves richer tiles render where authored). F06 shows NO white flash (root bg min-channel never exceeds 9/255) — only a one-time ~186ms cold-nav stall (lazy import) settling to a minor ~32-52ms warm hitch. V-A95 does NOT reproduce a black slab across three reverse-drag variants on the live WebGPU (apple/metal-3) renderer, and the sweep residual is healthy — and critically, the black-ish state I first saw was SELF-INFLICTED: my getContext('webgl2') probe stole the canvas context and faked a 'WebGPU unavailable' fallback, a caution that the original V-A95 claim may itself be a context-steal artifact. DOCK MATERIAL confirms the suite-rot architecture (root .glass-dock transparent, material on the .dock-plate child) but the tray paints visibly and correctly across all 14 docks — architecture, not a paint bug.

## Findings

### chip-css-orphan — major

**Claim**: glass-chip.css is orphaned (imported nowhere): Chip composes 'glass-chip glass-capsule' but only glass-capsule ships, so all chip-specific styling is dead — selectable ON gives no accent paint, the ::after flood is absent, the remove button is unstyled.

**Evidence**: Static: grep of src/ + demo/ for glass-chip.css finds 0 imports; glass.css @imports glass-capsule.css but NOT glass-chip.css. Live /forms/chip readback: chip background-image=none; --chip-flood-t="" EMPTY (the @property registered in glass-chip.css is absent => file not in bundle); ::after content=none. Selectable chip clicked to data-state=on/aria-pressed=true: backgroundColor/borderColor/color ALL identical to off-state (glass-capsule base, not accent-band/edge/ink), ::after content=none. Remove button: display=block (not inline-grid), 10x23px (not the 1.25rem square), border-radius=0. Captures: 01-chip-orphan-forms-chip.png, 02-chip-selectable-ON-no-accent-flood.png, 01-chip-orphan-readback.json

**Proposed disposition**: CONFIRMED-DEFECT. Import glass-chip.css in glass.css immediately after glass-capsule.css (same @layer components), or fold its rules into the capsule/atom partials. Clean break, no alias. Then re-verify the selectable ON accent flood + remove-button geometry paint.

### F02-blank-cards — note

**Claim**: The /foundations section-landing preview cards render as blank white/beige slabs.

**Evidence**: Live /foundations: immediate + after-2.5s + after-scroll screenshots show all 12 cards render the identity-fallback tile — a DARK translucent slab (color srgb 0.207 0.165 0.133 / 0.68) with the section name text (Intro/Colors/Typography/...), class 'section-preview-card-tile section-preview-card-identity', innerKids=0. Not white/beige, not empty. No console errors. /display comparison proves the ladder works: buttons/card render rich authored tiles (real Button, glass-floating card) while surface/badge/atoms fall to identity — identity is the deliberate lowest rung. Captures: 03-foundations-immediate.png, 04-foundations-after-2.5s.png, 05-display-tile-ladder-mixed.png

**Proposed disposition**: DRIFT-EXPLAINED / CLEARED — not a paint defect. Foundations ships no authored .tile.vue for any story, so every preview falls through to the intended identity rung. Optional design note (not a bug): author foundations tiles if richer previews are wanted.

### F06-transition-flash — minor

**Claim**: Navigating dock routes (/dock -> /dock/rail -> /dock/overview) shows a white flash / frozen frame / slow commit.

**Evidence**: rAF luminance sampler on documentElement+body backgroundColor during client-side router nav. White-flash detector (min RGB channel; 255=white): root peaks at 9/255 and body at 0/255 across EVERY transition — never brightens, no white flash. Frozen-frame detector (max inter-frame gap): cold first nav to a dock story = 186ms (one-time lazy-chunk import + component/GL mount); warm navs settle to 32-52ms (2-3 dropped frames). No console errors. Captures: 06-dock-transition-sampler.json, 06a-dock-landing.png, 06b-dock-rail.png

**Proposed disposition**: White-flash CLEARED (never reproduced). The 'slow commit' is a one-time cold-nav lazy-import cost + minor warm hitch. Optional: prefetch sibling dock-story chunks / warm the GL context to erase the ~186ms first-nav stall. No transition-paint fix needed.

### V-A95-aurora-black-slab — note

**Claim**: Two successive reverse drags on the aurora stage produce a broad black slab; and the aurora-sweep residual may be absent.

**Evidence**: On the LIVE WebGPU renderer (clean load: no banner, navigator.gpu present, requestAdapter()=ADAPTER_OK, banner 'WebGPU · apple · metal-3'), three reverse-drag variants (single R->L, mid-drag reverse, two rapid successive reverse drags) each RESHAPED the warm painterly field visibly (magenta/coral blooms migrating) with NO black slab and the renderer stayed live. Sweep residual = healthy (surface responds every time). CRITICAL confound: my first probe called canvas.getContext('webgl2'), which stole the single-context canvas and produced a FALSE red 'WebGPU context unavailable' banner + static non-interactive fallback (07b/07c/07d) — the only black-ish state seen, and it was self-inflicted. Captures: 08a-aurora-LIVE-webgpu-baseline.png, 08b/08c/08d-aurora-LIVE-reverse-drag*.png, 07-08-aurora-va95-notes.json

**Proposed disposition**: CLEARED / NOT REPRODUCED on live WebGPU. Retire or heavily-caveat the V-A95 black-slab claim as a likely context-steal / instrumentation artifact; if retained, re-repro with real CDP pointer input and NEVER call getContext on the live aurora canvas (the live-pi context-steal trap).

### dock-material-suite-rot — note

**Claim**: The dock material paints on a child layer, not the .glass-dock root (suite-rot); verify the tray still paints.

**Evidence**: Live /dock/overview readback of all 14 .glass-dock instances: root .glass-dock is transparent (backgroundColor rgba(0,0,0,0), backgroundImage none, backdropFilter none, ::before/::after content none). The material is uniformly carried by the .dock-plate child (position:absolute; inset:0): backgroundColor color(srgb 0.35 0.30 0.25 / 0.56) + backdrop-filter blur(7px) saturate(1.3) brightness(1.14). Every dock has directChildren [dock-plate, dock-controls]. Screenshot confirms trays paint visibly (collapsed pill, expanded home/search/bell/gear tray, media-transport pill). One of 14 (a paused/static variant) has an opaque plate with backdrop:none. Captures: 09a-dock-overview-trays.png, 09-dock-material-readback.json

**Proposed disposition**: Suite-rot architecture CONFIRMED (root shell + .dock-plate carrier) but DRIFT-EXPLAINED — the material is alive and the trays render correctly, so this is intentional layering indirection, not a paint defect. Only actionable if the intent is that the .glass-dock class should self-paint (a design decision, not a bug).

