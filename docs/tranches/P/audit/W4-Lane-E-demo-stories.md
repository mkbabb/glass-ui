# P.W4 Lane E — Demo stories for W6 promotions + W3 stub stories

## §1 Scope

Author 7 demo stories under `demo/stories/`:

- **4 stories** for the O.W6 substrate promotions — `useClipboard`, `<HeaderRibbon>`, dock-icon-button `--dock-active-*` token ladder, `@utility scale-on-hover`.
- **3 stub stories** for the P.W3 substrate promotions — `<Slider variant="glass-scrubber">`, `<ProgressiveSidebarSection>`, `<PaperBackdrop>` texture-system.

Each story composes the canonical `<StorySection>` + `<ShowcaseFrame>` + `useStoryDemo` chassis per V.W4 demo-chassis precedent.

## §2 Story shape

| Story id | Path | Feature | Chassis used |
|---|---|---|---|
| `composables/use-clipboard` | `demo/stories/composables/use-clipboard.vue` | `useClipboard()` from `src/composables/dom/useClipboard.ts` (O.W6 Lane A) | `StoryPage` + `StorySection` + `ShowcaseFrame` + `<Button>` |
| `custom/header-ribbon` | `demo/stories/custom/header-ribbon.vue` | `<HeaderRibbon>` from `src/components/custom/header-ribbon/` (O.W6 Lane A) | `StoryPage` + `StorySection` + `ShowcaseFrame` |
| `dock/icon-button-token-ladder` | `demo/stories/dock/icon-button-token-ladder.vue` | `--dock-active-{bg,color,scale,border,shadow}` cohort from `src/styles/tokens.css` (O.W6 Lane B) | `StoryPage` + `StorySection` + `ShowcaseFrame` + `<GlassDock>` + `<DockIconButton>` |
| `utilities/scale-on-hover` | `demo/stories/utilities/scale-on-hover.vue` | `@utility scale-on-hover` over `--scale-hover` from `src/styles/utilities.css` (O.W6 Lane C) | `StoryPage` + `StorySection` + `ShowcaseFrame` |
| `sliders/glass-scrubber` | `demo/stories/sliders/glass-scrubber.vue` | `<Slider variant="glass-scrubber">` from `src/components/ui/slider/` (P.W3 Lane A) | `StoryPage` + `StorySection` + `ShowcaseFrame` + `<Slider>` |
| `navigation/progressive-sidebar-section` | `demo/stories/navigation/progressive-sidebar-section.vue` | `<ProgressiveSidebarSection>` from `src/components/custom/sidebar/` (P.W3 Lane B) | `StoryPage` + `StorySection` + `ShowcaseFrame` + `<ProgressiveSidebar>` |
| `foundations/paper-backdrop-texture-system` | `demo/stories/foundations/paper-backdrop-texture-system.vue` | `<PaperBackdrop>` from `src/components/custom/paper-backdrop/` (P.W3 Lane C) | `StoryPage` + `StorySection` + `ShowcaseFrame` |

The `useStoryDemo` import was not pulled into any of the 7 stories — none require the play / reset / status state machine. The 7 demos are direct-state harnesses (refs flipped by user input or hover). This matches the V.W4 chassis precedent — `useStoryDemo` is only adopted by stories whose play handler is non-trivial (timed cascade / async reveal / cleanup-bearing). Recipe-only demos shape themselves from `<StorySection>` + `<ShowcaseFrame>` alone (e.g. `primitives/paper-backdrop.vue` precedent).

## §3 Manifest registration

`demo/stories/manifest.ts` updated:

- **Appended rows** into existing categories — `foundations` (+1 row), `navigation` (+1 row), `composables` (+1 row).
- **4 new categories** created — `custom`, `dock`, `utilities`, `sliders` — each with one row, inserted before the `compositions` category.
- **3 new lucide-vue-next icon imports** — `SlidersHorizontal`, `Anchor`, `Paintbrush`.

`import.meta.glob<{ default: Component }>("./*/*.vue")` covers the new `custom/`, `dock/`, `utilities/`, `sliders/` directories without further wiring — the lazy loader picks the SFCs up automatically.

## §4 Verification

```
$ npm run typecheck
> vue-tsc --noEmit
(clean — no diagnostics)

$ npm test
Test Files  32 passed (32)
     Tests  365 passed (365)
  Duration  2.37s
```

Both gates pass. `npm run build` deliberately not run (W4 ceiling — 3 sibling agents may be running in parallel; binding constraint).

## §5 Operational compliance

- No mutating git operations (no `git add`, `git stash`, `git commit`, `git checkout`, `git reset`, `git restore`).
- No `npm run build` mid-task.
- Validation limited to `npm run typecheck` + `npm test` per W4 Lane E binding constraints.
- Read-only git only (none invoked).

## §6 Status

**COMPLETED.**

7 stories authored + manifest registered + typecheck PASS + test PASS.
