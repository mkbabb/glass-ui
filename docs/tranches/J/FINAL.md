# J — FINAL

**Tranche**: J — Gestalt Refinement + Vocabulary Convergence + Audit-Precept Hardening.
**Opened**: 2026-05-06 (planning baseline `118824d` on sibling branch; consolidated onto master at `5baceb5`).
**Closed**: 2026-05-06.
**Authority**: J closes clean — 18/18 user findings addressed; 12/12 J invariants satisfied; strengthened 6-agent post-close audit returned and findings absorbed.

## Thesis

The substrate was converged (post-I) but the audit lanes underspecified what visual-shipping means. R6 found 13 of 18 user findings missed by I.W7's close ceremony — concentrated in π (8) / δ (7) / β (2) / γ (1). J hardened the audit pattern AND cleared the 18 user findings via three architectural transpositions, while absorbing a v0.8.0 token-cleanup miss the dilation sweep had left on the floor.

## Wave-by-wave commit chain

| Wave | Commit | Title |
|---|---|---|
| W0 | `d8239f2` | reconciliation + strengthened 6-agent audit precept |
| W1 | `c6b7df0` | vocab.γ — token + utility preconditions + cssVar composable |
| W2 | `e563d7a` | vocab.α+β — overlay convergence + interactive reach-in |
| W3 | `deba31d` | dock cornerstone + DockPopover→HoverPopover + overflow + blur |
| W4 | `499326a` | Configurator primitive + aurora chrome refit + metaballs configurator + speedtest preset |
| W5 | `3a4371d` | Slider variants + NumberField pill + drag-keep-open + StoryChassis defer |
| W6 | `76525e1` | Badge size axis + FuzzySearch rewrite + clearCache + Carousel pager substrate |
| W7 | `<this commit>` | close ceremony + strengthened 6-agent audit + absorbs |

## Substrate convergence stats

- **Tokens shipped (W1)**: 25 new tokens (light + 6 dark mirrors): `--space-phi-{5,6}`, `--surface-tint-{4..25}` (9-rung family), `--overlay-scrim{,-strong,-subtle}`, `--duration-sparkle`, `--{success,warning,info}-foreground`, `--radius-tooltip`, `--muted-{soft,medium}`.
- **`@theme` bridges (W1)**: 21 (each new token surfaces as a Tailwind v4 utility).
- **`@utility` blocks (W1)**: 2 (`sheet-animate` for sheet/drawer slide-out grammar; `overlay-scrim` shorthand).
- **Composables (W1)**: `cssVar()` for WAAPI consumers needing literal CSS-property values.
- **Drift rows eliminated (W2)**: 23 files in Lane A (overlay convergence) + 28 in Lane B (interactive reach-in). 9 sites consume `popover-animate slide-in-from-side`; 5 modal scrims use `bg-overlay-scrim*`; 16 CVAs consume `.focus-ring`; 13 sites consume `--surface-tint-N`; 4 sites consume `--muted-medium`; 3 cubic-beziers → `--ease-apple-spring`. **v0.8.0 token-cleanup miss absorbed**: 27+9 stale `--glass-{bg,blur,border,shadow}-{subtle,default,medium,elevated}` references migrated to wash/quiet/resting/floating ladder.
- **Public surface added**: 2 of 3 named (`<Configurator>` family in W4, `<CarouselPager>` family in W6); `<StoryChassis>` deferred per substrate-without-consumer guard.

## Architectural transpositions

1. **DockPopover → HoverPopover** (W3.B): `<DockPopover>` retired (256 LOC); `<HoverPopover>` (v0.7.0) gains `keepDockOpen` extension prop. Per W0 amendment §F item 3, the canonical hover-driven primitive is HoverPopover (not Popover). Click-anchored popovers don't hold the dock open, so `keepDockOpen` belongs only on the hover-driven primitive. Plus retired the `.dock-popover` substrate + `pop-up-*`/`pop-down-*` keyframes (~70 LOC), `--dock-motion-popover-*` aliases, `DockPopoverRegistration` interface + `registerPopover` / `closeOtherPopovers` from `dockContext` (HoverCard's pointer-leave timer handles cluster transit natively).

2. **Aurora + blob configurators → `<Configurator>` primitive** (W4): public primitive at `src/components/custom/configurator/` with `<ConfiguratorLayer>` + `<ConfiguratorRow>` + `useConfiguratorState<T>`. Aurora studio (W4.B) + metaballs configurator (W4.C — scope reveal: "blob" was renamed to metaballs pre-J) consume. Demo's existing `Configurator.vue` (token-editor) renamed to `PresetEditor.vue` per W0 amendment §F item 2 to free the canonical name.

3. **Story-page chassis → `<StoryChassis>`**: **DEFERRED** per W5.D substrate-without-consumer guard. Chassis-pattern count = 0 at HEAD; R3-cited primitives (`<CreamSurface>`, `<DisplayHero>`, `<FlourishDivider>`) don't exist anymore at master. Existing chassis abstraction `<StoryPage>` consumed by 78/90 stories upstream. Lane D defers; the substrate Lane D was meant to compose is gone.

## Refinements

- **W3.A — dock collapse cornerstone** (user finding 2): cornerstone bug was two coupled defects — `visibility: hidden` (binary, non-transitionable) on inactive layers, and `transition: width` against `width: auto` endpoints (CSS cannot interpolate). Composed `useLayerTransition` (canonical for `<DockLayerGroup>` inner pair) onto `<GlassDock>`'s outer collapsed↔expanded pair; the composable measures natural width before/after slot swap and animates between fixed pixel values via `--dock-motion-resize` (300ms `--spring-snappy`). Replaced `visibility: hidden` with `opacity: 0` + opacity transition. Playwright 50-frame sample confirms continuous interpolation.
- **W3.C — overflow + blur reduction** (findings 1, 3, 5a): `--glass-blur-dock-radius` 1px → 0px; `--dock-max-{inline,block}-size` tokens; overflow-scroll mask-fade; vertical-rail `scrollbar-thin` + mask-fade-y.
- **W4.B — aurora chrome refit** (findings 8, 9, 10): aurora consumes `<Configurator>`; `<BouncyToggle overflow="scroll">` prop fixes inline-grid 1fr-shrink truncation; PaletteLayer's clip absorbed via configurator scroll-fade-y; PresetPickerRow `bg-muted` → Skeleton placeholder during cold-load.
- **W4.C — metaballs configurator + speedtest preset** (findings 7, 11): metaballs story refit to full `<Configurator>` consumption with 7 layers; `auroraPresets.SPEEDTEST` 12th entry using live `../speedtest/src/config/auroraConfig.ts` source (matches R2 §D byte-for-byte); PRM/PRT gates on useMetaballs.
- **W5.A — sliderVariants CVA built from scratch** (findings 12, 14): no `sliderVariants` CVA at HEAD; built fresh with 5 variants × 3 sizes (per W0 amendment §F item 7 — the "extend existing CVA" prescription was stale).
- **W5.B — NumberField pill radius + Button-as-child** (finding 13): `rounded-md` → `rounded-input`; `<NumberFieldIncrement>` / `<NumberFieldDecrement>` compose `<Button asChild variant="ghost" size="icon">`.
- **W5.C — drag-keep-open visual feedback** (finding 4): `useDockState.isHeld` reactive; `<GlassDock data-held>`; Slider acquires/releases keep-open token across drag gesture; thumb halo intensifies. Proves the W3 dock-keep-open API surface beyond DockPopover (now a 2-consumer mature substrate).
- **W6.A — Badge size axis** (finding 15): `badgeVariants` gains `sm/md/lg` size axis; status-cell badge consumes `size="md"` for row text-sm baseline alignment. Section-tone tint recipe documented in DESIGN.md (Option B: badgeToneVariants doesn't exist in canon; the table-cell `bg-section-N/15 text-section-N border-section-N/30` triplet stands as a separate canonical recipe).
- **W6.B — FuzzySearch gestalt rewrite** (finding 16): 600 → 158 LOC (-73.7%); composes canonical `<Popover>`, `<Dialog>`, `<Button>`, `<Badge>`, `.input-bar`, `.kbd`, `.interactive-item`. Public API preserved.
- **W6.C.1 — clearCache + danger-subtle retire** (finding 17): `<Button variant="destructive" size="sm">` (4.52:1+ AA / AAA in dark, was 3.0:1 sub-AA); `danger-subtle` retired; lib export `clearSearchCache` preserved per R4 §C; consumer aliases via import.
- **W6.C.2 — CarouselPager substrate** (finding 18): `<CarouselPager>` + `<CarouselDots>` + `<GlassCarouselPager>` shipped; basic + audacious carousel pagers retire.

## User findings — 18/18 addressed

| # | Finding | Disposition |
|---|---|---|
| 1 | Dock max-w/h overflow scroll | LANDED W3.C |
| 2 | Top-dock collapse cornerstone | LANDED W3.A (cornerstone) |
| 3 | Dock blurs reduce | LANDED W3.C |
| 4 | Drag slider — dock holds | LANDED W5.C |
| 5a | Vertical rail overflows | LANDED W3.C |
| 5b | Remove dev text | RETIRED-PRE-J (already gone at HEAD) |
| 6 | DockPopover gestalt | LANDED W3.B |
| 7 | Blob configurator buildout | LANDED W4.C (as metaballs) |
| 8 | Aurora configurator scroll-wrapping | LANDED W4.B |
| 9 | Aurora configurator side clips | LANDED W4.B |
| 10 | Aurora top black bar | LANDED W4.B |
| 11 | Speedtest aurora preset | LANDED W4.C |
| 12 | Slider padding standardized | LANDED W5.A (CVA size axis) |
| 13 | NumberField rounded | LANDED W5.B |
| 14 | Slider · Glass Track refinement | LANDED W5.A (glass-pill variant) |
| 15 | Status badge alignment | LANDED W6.A |
| 16 | DATA · FUZZY SEARCH refinement | LANDED W6.B |
| 17 | clearSearchCache rename + contrast | LANDED W6.C.1 |
| 18 | Basic horizontal pager weak | LANDED W6.C.2 |

## Process hardening

- **Strengthened 6-agent close pattern landed in `docs/precepts/instructions/tranche/SPEC.md ## Close`** (W0 Lane II — submodule advanced `67c1412 → 6b8437a`):
  - π lane MUST cover ≥ 3 viewports + animation-timing samples + WCAG AA contrast probe + per-story consumption sweep.
  - β lane MUST flag visual-load-bearing-ness (not just consumer count).
- **AGENT_DISPATCH_TEMPLATE.md non-negotiable**: rendered evidence required for visual artefacts (Playwright screenshot / getComputedStyle / runtime contrast probe — not just file:line citations).
- **3 new LESSONS-LEARNED entries (2026-05-06)**: Visual-Runtime Probe Coverage Stop-Rule / Per-Story Consumption Sweep / Visual Load-Bearing-ness Bar — derived from R6 structural-failure analysis.

J is the FIRST tranche to use the strengthened pattern. Its W7 close demonstrated the pattern's value:
- π's multi-viewport probe caught the 4px mobile-viewport overflow on the story-pager dock that single-viewport probing would have missed.
- π's animation-timing probe verified continuous interpolation on dock collapse (the user-reported jerk now provably fixed).
- π's contrast probe verified the clearCache fix at 6.55:1 (was 3.0:1 sub-AA).
- β's visual-load-bearing-ness probe caught the `<CarouselPager>` runtime mount error that the static consumer-count probe would have missed.
- δ's per-story consumption sweep caught the dock.css magic-literal bypass and PresetEditor raw-recipe bypasses.

## Brittleness windows

**None opened during J**. W6.B FuzzySearch gestalt rewrite (≤200 LOC target — landed at 158 LOC) closed cleanly without breaking the design-fidelity gate; preserved public API.

## Process incidents

Two `git stash` violations during J despite LESSONS-LEARNED 2026-05-04 binding rule:
1. **W1 agent** (c6b7df0): briefly ran `git stash` to verify a pre-existing failure mode; recovered surgically via Edit tool.
2. **W4.A agent** (499326a): ran `git stash --keep-index --include-untracked` + `git stash pop` as a state-inspection probe; pop failed mid-application on parallel-lane conflict; recovered via `git checkout stash@{0} -- <files>`.

Both recovered with no data loss; net impact zero. **Pattern recurrence** suggests the dispatch-template precept needs sharper teeth — candidate reinforcement: "If you find yourself reaching for `git stash`, halt and report to orchestrator instead." Will absorb in next precept-submodule update if the pattern persists into K.

## Cross-tranche debt + named residuals

- **CLAUDE.md major refresh** — file-tree section + subpath section + Design Axes section need J-state alignment (11 drift items per γ). **Destination**: doc-only commit before next tranche.
- **README.md drift** — 7 items per γ. **Destination**: doc-only commit.
- **Bundle-budget gate re-land** — I invariant 8 enforcement (`npm run profile:budget` script + GitHub workflow + BUDGETS table). **Destination**: follow-up commit before K opens; would PASS at current numbers per ε (≈30% headroom).
- **5 demo stories raw `focus-visible:shadow-[var(--focus-ring-shadow)]`** — vocab.γ residue. **Destination**: K-tranche residue sweep.
- **3 demo `--surface-tint` bypasses** — vocab.γ residue. **Destination**: K.
- **`motion/stagger.vue:59` `transition-all` survivor** — single site. **Destination**: K residue.
- **`--{success,warning,info}-foreground` 0 consumers** — W1 substrate-without-immediate-consumer ledger. **Destination**: either wire (Notification.vue refit) in K or formally retire.
- **`cssVar()` ≥ 2 consumer bar** — 1 consumer (BouncyToggle); needs second site or formal Slider-only API doc. **Destination**: K.
- **`.overlay-scrim` @utility** — shadowed by canonical `bg-overlay-scrim` Tailwind utility (W1 @theme bridge). **Destination**: K cleanup retire.
- **Top story-pager dock 4px overflow at 375 viewport** — π P1 mobile-viewport refinement. **Destination**: K.
- **GlassCarousel audacious pager chevrons unreachable on mobile** — π P2. **Destination**: K.
- **Stress harness retire decision** — ε P2. Restore (per I.W6) or formally retire. **Destination**: K.
- **`ay-close` reappearance** — ε P2; cross-ref with v0.8.0 consolidation. **Destination**: K cleanup.
- **Audacious primary-CTA variant** — formally deferred to K per J.md cross-tranche debt section. The disco-grain + sparkle-sweep + specular-highlight composite at `dock.css:659-744` is reusable as a `Button variant="primary-audacious"` but extracting it merits its own gestalt wave with a story.
- **drag-keep-open story-fidelity gap** — no demo binds a `<Slider>` inside a `<GlassDock>` to visually demonstrate the cross-substrate coupling the W5.C contract WIRE proves at the API level. **Destination**: K story-add (post-StoryChassis if K revisits the chassis substrate).

## Authority

J closes clean. The 18 user findings raised post-I close are addressed at HEAD `<W7-close-commit>`; the v0.8.0 token-cleanup miss has been absorbed; the strengthened audit pattern is binding precept; the three architectural transpositions named in J's thesis are executed (DockPopover→HoverPopover) or executed-with-amendment (Configurator with name reclamation) or formally deferred per substrate-without-consumer guard (StoryChassis).

`npm run typecheck` green; `npm run build` green; `npm run test` 269/269; recovery-diary scrub returns zero hits in src/+demo/.

J is the gestalt-refinement tranche the audit lanes themselves needed. K opens against this baseline.
