# Current Consumer Evidence

Documents current consumers for library-surface artefacts that earn `keep-current`. Audits cite this directory only after the proof grep still passes.

F.W1 adds a static consumer contract on top of these per-artefact notes:
`npm run proof:consumers:static` rejects non-core root imports, undeclared
subpaths, retired style paths, and `glass-ui/src` source-relative imports across
`fourier-analysis/web`, `words/frontend`, `bbnf-lang/playground`, and
`speedtest`. Build proof is recorded by `npm run proof:consumers:build`.

| Artefact | Doc | Current Consumer | Added in Tranche |
|---|---|---|---|
| `ExpandableContainer` | [expandable-container.md](expandable-container.md) | speedtest Charts/Map views | D |
| `Constellation` | [constellation.md](constellation.md) | demo StoryHero + 404 egg; slides adoption in-flight (W-ADOPT) | AZ · ≥2-consumer trigger = W-ADOPT |
| `SortableList` | [sortable-list.md](sortable-list.md) | demo aurora PaletteLayer + AuroraColorSection reorder | AZ · cleared on re-ground (2 consumers) |
| `StatusDot` | [status-dot.md](status-dot.md) | slides til-briefing SlideXray live-pulse dot | AZ · 1 ext consumer booked |
| `useGlassBackdropLuminance` | [use-glass-backdrop-luminance.md](use-glass-backdrop-luminance.md) | glass-ui source GlassDock (binary #1) + demo glass-material exerciser | AZ · path-B booked 2nd-binary trigger |
| `useTokenColor` | [use-token-color.md](use-token-color.md) | speedtest meter token colors + demo constellation/hero | AY |
| `useScrollProgress` | [use-scroll-progress.md](use-scroll-progress.md) | demo motion scroll story | D |
| `SpringSnapshot` | [spring-snapshot.md](spring-snapshot.md) | demo motion springs story | D |
| `useStaggerReveal` | [use-stagger-reveal.md](use-stagger-reveal.md) | demo motion stagger story | D |
| `useSortable` | [use-sortable.md](use-sortable.md) | glass-ui source SortableList | D |
| `UseSortableReturn` | [use-sortable-return.md](use-sortable-return.md) | glass-ui source sortable context | D |
| `isMac` | [is-mac.md](is-mac.md) | words/frontend word notes modal | D |
| `useWindowedStore` | [use-windowed-store.md](use-windowed-store.md) | words/frontend wordlist store | D |
| `buildSectionLayout` | [build-section-layout.md](build-section-layout.md) | glass-ui source useVirtualSectionWindow | D |
| `findSectionOffset` | [find-section-offset.md](find-section-offset.md) | glass-ui source useVirtualSectionWindow | D |
| `ForcedSectionWindowRange` | [forced-section-window-range.md](forced-section-window-range.md) | glass-ui source useVirtualSectionWindow | D |
| `resolveActiveSection` | [resolve-active-section.md](resolve-active-section.md) | glass-ui source useVirtualSectionWindow | D |
| `resolveSectionWindow` | [resolve-section-window.md](resolve-section-window.md) | glass-ui source useVirtualSectionWindow | D |
| `SectionLayout` | [section-layout.md](section-layout.md) | glass-ui source useVirtualSectionWindow | D |
| `SectionWindowRange` | [section-window-range.md](section-window-range.md) | glass-ui source useVirtualSectionWindow | D |
| `useAnimatedNumber` | [use-animated-number.md](use-animated-number.md) | speedtest dashboard/results | D |
| `AnimatedNumber` | [animated-number.md](animated-number.md) | speedtest animated-number surface | D |
| `UseAnimatedNumberOptions` | [use-animated-number-options.md](use-animated-number-options.md) | speedtest animated-number options | D |
| `useDarkModeSync` | [use-dark-mode-sync.md](use-dark-mode-sync.md) | speedtest meter | D |
