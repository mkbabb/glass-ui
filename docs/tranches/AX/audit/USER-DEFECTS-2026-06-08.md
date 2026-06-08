# AX — live-product defect ledger (user audit, 2026-06-08)

Captured from a live monitoring pass over the dev server (`http://localhost:5173`) at
HEAD `e2c9995` (AX W00-W24 + the W04/W12/W23/W24 and W05/W13/W22 bands). These are the
visual-truth defects the headless gates did NOT catch — the cardinal-lesson surface. The
fixes are GESTALT, idiomatic, no-workaround, no-legacy transpositions (per the standing
precepts), folded into the AX wave set WITHOUT over-prescribing or duplicating existing
waves.

## D — defects (live observations)

| # | Surface | Defect | Severity | Likely owner / status |
|---|---|---|---|---|
| D1 | `/substrates/aurora` configurator | The configurator design is poor + does NOT use idiomatic glass-ui / shadcn-vue / Tailwind components. Hand-rolled chrome instead of the library's own primitives. | major | new — configurator-redesign wave (relates W38 aurora configurator) |
| D2 | `/substrates/aurora` | "Where are the van-Gogh items?" — the van-Gogh medium (W13) is not surfaced / discoverable in the configurator. | major | W13 follow / configurator-redesign |
| D3 | BouncyTabs (configurator + elsewhere) | Egregious / jarring motion. Needs to be smoother, not so abrupt. | major | new — BouncyTabs motion-smoothing (relates W05 spring vocab) |
| D4 | `/substrates/goo-blob` | Too skeuomorphic — the lighting/shading must be toned down. | major | W09/W15-16 blob lighting (regression/incomplete) |
| D5 | `/substrates/goo-blob` | The hover effect is totally broken + far too dramatic. | blocker | W16 blob interaction (regression) |
| D6 | blob demo pages | There are 3-4 blob pages (`goo-blob`, `blob-mood`, `blob-interaction`, `glass-material`?). Consolidate to ONE blob page; refine the extra items into the extant one. | major | new — blob demo consolidation (relates W18 storybook IA, W40 demo-shell) |
| D7 | `/substrates/blob-mood` | Totally broken — none of the moods work. | blocker | blob-mood wiring (library or demo) |
| D8 | `/substrates/glass-material` | Totally broken. | blocker | glass-material (library or demo) |
| D9 | dock tabs (e.g. "Dialog") | The red underline under dock items is too prominent — should be subtle / NO underline. (screenshot 15.01.32) | minor | dock control styling |
| D10 | destructive/alert surfaces in dark mode | Unreadable — low-contrast dark-red on black ("Session expired" alert). (screenshot 15.02.13) | major | dark-mode token contrast (destructive-foreground / alert) |
| D11 | dock + chassis | The specular radial corner-glow is egregious — thought fixed by W09. (screenshot 15.03.25) | major | W09 specular (regression — radial not tuned to subtle on this surface) |
| D12 | InstrumentChassis | "I thought the instrument chassis was to be removed?" — the chassis (strip/dial/control regions, engraved bezel, radial overlay) still ships. (screenshot 15.02.48) | major | confirm intent — chassis retire decision (relates W19/W20/W21 primitive prune/recategorize) |
| D13 | dock controls (H + V) | The dock controls should PERSIST on the dock. Structure the vertical + horizontal docks for better persistent elements, a better sense of proportion, and proper dividing lines. | major | new — dock persistent-controls + proportion + dividers (relates W06 dock storybook) |
| D14 | dock demo | There should be an ENTIRE section dedicated to the dock — morphing, animations, layers, variants, rail, etc. | major | new — dock showcase section (relates W06, W18 storybook IA) |
| D15 | dock on mobile | The dock on mobile should be ~1.5x bigger — bigger touch targets, bigger icons on mobile. | major | new — dock mobile sizing (relates the coarse-pointer touch floor in dock-controls.css) |

## P — process directives (this audit round)

- **DEEPLY audit with 32 agents in parallel**: the original AX plan + all 46 waves, alongside
  EVERY change made this session (the commits e2c9995 back to the AX baseline).
- **Recapitulate** all prior prompts, plans, and precepts; verify each is addressed; flag gaps.
- **Devise a path forward**: audit the changes-made + the remaining plan. NO quick solutions,
  NO workarounds — idiomatic, gestalt. Architectural transpositions for elegance, simplicity,
  and performance are necessary + desirable. NO legacy code.
- **Dispatch a triumvirate of workflows** that research, plan, prototype, and author/update the
  tranche waves. If forthcoming waves already ameliorate the above, do NOT over-prescribe or
  duplicate — augment them. Iterate until total convergence (many waves + workflows).

## Dedup anchors (existing waves that may already cover a defect)

- W06 dock storybook honest rail + css split → D13, D14 (persistent controls, dock section)
- W18 storybook IA reinvention → D6, D14 (blob consolidation, dock section)
- W19/W20/W21 primitive prune/fix/recategorize → D12 (chassis), D8 (glass-material/glass-panel)
- W38 aurora configurator + glass-atoms restyle → D1, D2 (configurator redesign)
- W40 demo-shell dock-nav coherence reaudit → D6, D9, D14
- W05 one iOS-spring vocabulary → D3 (BouncyTabs smoothing rides the spring registers)
- W09 specular tune-to-subtle → D4, D11 (specular/skeuomorphism regression)
- W15/W16 blob → D4, D5, D7 (blob lighting, hover, moods)
- W36 forced-colors + dark contrast → D10 (dark-mode readability)

The audit MUST verify each anchor: is the existing wave SUFFICIENT for the defect, does it
need AUGMENTING, or is a NET-NEW wave required? No duplicate prescriptions.
