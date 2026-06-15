# BA.W-CLOSE — the overfitting audit (the `proof:ba-final` C7 read surface)

The canned overfitting audit (`docs/audits/overfitting-audit.md`) run over the BA tranche's
`src/` + `demo/` artefacts: every new component / token / seam has **≥ 2 consumers OR is
exported on a public subpath OR is a demo-private helper** (the L-inv-8 visual-load-bearing
invariant + the MEMORY overfitting-audit bar). The verdict line the gate reads:

## ORPHANS: 0

---

## The new component primitives (exported subpath OR ≥2 consumers)

| artefact | wave | home | disposition | consumers / export |
|---|---|---|---|---|
| `<FadingScroll>` | W-FADING-SCROLL | `src/components/custom/fading-scroll/` | EXPORTED + ≥2 | `./fading-scroll` subpath + 11 demo/src consumers (the 4 migrated C5/C4/… sites + the dock chip-overflow + the showcase scroll regions) |
| `<IconChip>` | W-ICON-CHIP | `src/components/custom/icon-chip/` | EXPORTED + ≥2 | `./icon-chip` subpath + 37 consumers (icons / empty-states / auth-shell + MetricCell glyph-tint reconcile; the 4 inline-paste sites collapsed onto it) |
| `<PagerDots>` | W-PAGER | `src/components/custom/pager-dots/` | EXPORTED + ≥2 | `./pager` subpath + carousel (consumer #1) + the slides DeckPager oracle (consumer #2, ≥2 by construction) |
| `<ColorSwatch>` | W-CONFIG-CHASSIS | `src/components/custom/color-swatch/` | EXPORTED | `./color-swatch` subpath (the configurator color-row register; the published surface clears the bar regardless of demo consumer count) |
| `HandMark` / `InkMark` / `BRUSHES` | W-HANDMARK | `src/components/custom/handmark/` | EXPORTED + ≥2 | `./handmark` subpath + 4 consumers (the d6 re-land; replaces the retired `/underline`) |
| `<DockSection>` (+ `DockSectionDescriptor` / `DockSectionKind`) | W-DOCK-SECTIONS | `src/components/custom/dock/DockSection.vue` | ≥2 | the BOTH shell docks (BottomDock + SidebarDock) + the `dock/*` stories (6 consumers) — the descriptor-driven tripartite chassis |
| `<DockRail>` (+ `DockRailItem`) | W-RAIL-EXTEND/W-RAIL3 (AZ) → W-SHELL-RAIL-RESEAT (BA re-seat) | `src/components/custom/dock/DockRail.vue` | ≥2 | the 2 shell docks + the `dock/rail` story (the BA re-seat re-anchored, did not mint a new primitive) |

## The new seams + tokens (≥2 consumers / token-on-the-cascade)

| artefact | wave | disposition | consumers |
|---|---|---|---|
| `useSurfaceAxis` + `surface-axis.css` (the `{glass·veil·opaque}` axis) | W-SURFACE-AXIS | ≥2 | 15 consumers (Card/GlassPanel/Dialog/Sheet/Drawer/Popover/Command/ExpandableContainer/Skeleton + the control REST tier + `.paper-ink-mark`) |
| the silver structure quad (`--silver`/`-light`/`-dark`/`-deep` + `--color-silver*` + `variant="structure"`) | W-ATLAS-RECONCILE (C-3) | ≥2 | 7 consumers — the InstrumentChassis `variant="structure"` (consumer #1) + the atlas structure surface (consumer #2, the named atlas adopt) |
| the `--configurator-{section-size,section-weight,preset-row-weight,divider}` hierarchy/divider tokens | W-CONFIG-CHASSIS / AZ.W-HIERARCHY | ON-CASCADE | the ConfiguratorLayer/Row + the blob + aurora studios inherit (the primitive mints once, every studio re-reads) |
| the `.glass-menu-row` / `.glass-menu-section` register on `menuItemVariants` | W-MENU-GLASS | ≥2 | the 13 menu SFCs (DropdownMenuItem/ContextMenuItem/Select/Combobox/Command) inherit the CVA |
| the `.feedback-tone` recipe | W-FEEDBACK-TONE | ≥2 | Toast/Notification/Alert (the 3 collapsed tone maps) |
| the `--spring-<name>-duration` per-spring clock vocabulary | W-GLASS-CAL (Unit 3) | ≥2 | the swept `src/styles` spring consumers (the ~20-site spring-clock census) |
| `.progress-sectioned-flow` single-fill register | W-PROGRESS-GRADIENT | 1-component | confined to `ProgressSectioned.vue` (NOT a shared primitive — a confined re-shape of ONE component's paint; not a substrate, so the ≥2 bar does not apply — it is the component's own internals) |
| the dark-material / no-gray token re-points (`--glass-tint-*` re-resolutions, `--primary` violet, the warm-chroma floor) | W-DARK-MATERIAL / W-NO-GRAY | TOKEN-ON-CASCADE | every glass surface inherits (token re-resolution on the existing seam — not a new symbol) |

## The demo-private helpers (no export needed — the demo-private exemption)

| artefact | wave | home | consumers |
|---|---|---|---|
| `<StoryPlayButton>` | W-DEMO-AFFORDANCES | `demo/stories/` | 3 demo consumers (curve-gallery + StepsEditor + springs) — demo-private, ≥2 |
| `DockStage.vue` (the ONE shared offscreen-paused Aurora) | W-STAGE | `demo/stories/` | 3 demo consumers (the dock overview/layers/morph-showcase stories) — demo-private, ≥2 |
| the fourier partial-sum studio (`fourier-studio.vue` + `FourierStudioStage.vue` + `StepsEditor`) | W-FOURIER-STUDIO | `demo/stories/substrates/` | demo-private story; the `StepsEditor` is the value.js-fork generalization candidate (C-3) booked to W-EASING-PRIMITIVE — demo-private until the publish trigger |
| the motion-violet (`--motion-accent`) | W-SUFFUSE2 | `demo/` (NEVER `src/styles/`) | demo-private — the ppmycota purple HARD fence (re-flagged here: it is demo-local, never a library token; `proof:suffuse2 W3` asserts no `--motion-accent` in `src/styles`) |

## The fences (no new artefact — re-flagged for the record)

- **The GL shader internals** (`aurora.frag`, `metaball.frag`) — fence-locked; BA touched the JS
  motion TABLE (aurora `breathing` drift) + the worst-case orbit smin band, never the shader.
- **`useLiquidFlex`** (AZ) — the ≥2-consumer re-export stays enrolled (useDockOrientationMorph +
  the tabs-indicator squish); BA added no orphan re-export.

## Verdict

Every BA `src/` + `demo/` artefact is exported on a public subpath, has ≥2 consumers, or is a
demo-private helper. **ORPHANS: 0.** Cross-checked by `proof:consumers:static` (exit 0) +
`proof:colocation` (the feature-dir colocation, PASS) + the published-subpath probe
(`verify-export-types`, exit 0).
