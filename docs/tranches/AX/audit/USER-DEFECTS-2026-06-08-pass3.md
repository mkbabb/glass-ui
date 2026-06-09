# AX — live-product defect ledger, PASS 3 (user audit 2026-06-08 ~19:46)

A third live pass after the dock band (W45) + W52-W59 landed. Per the user directive:
DEDUPED against pass-1/pass-2 — RE-NOTED items are marked `[RE-NOTED → bump precedence]`
with their prior id; NEW items get a pass-3 id. NO duplicate entries. The HEADLINE shift:
**glass-first-class as the ROOT default** ("the default for all items is their glass
variants — fix at the root") — this bumps G1/W54 to TOP precedence.

## RE-NOTED (precedence bumped — already in the tranche)

| Prior | Pass-3 restatement | Bump |
|---|---|---|
| G1 / W54 (glass-first-class) | **"The default for ALL items is their glass variants — fix at the ROOT."** GLASS FIRST for buttons + items EVERYWHERE, and in the dock (the keyframes dock is the model for selected elements). | **TOP precedence — foundational, blocks the page-redesign waves** |
| P1 (use-token-color) | "What is the purpose of /composables/use-token-color — replace it in the VERTICAL DOCK with just a darkmode toggle." | bump P1 |
| D16 / W49 (math-paper × latex-paper) | "/compositions/math-paper should leverage REAL katex + latex-paper — its SEARCH, VIRTUALIZATION/WINDOWING system." (extends: surface latex-paper's search + virtualization, not just MathBlock) | bump + extend W49 |
| D12 / W28-W29 (chassis retire) | "/compositions/instrument-chassis should be REMOVED, yes." (CONFIRMED — the needs-user-decision is resolved: REMOVE) | confirm + bump |
| P7 / W57 (aurora/constellation heros) | "/foundations/intro + other HERO items should have aurora OR constellation OR fourier-field — each hero a UNIQUE one — in the TRUE background of the WHOLE page; the hero item GLASSY to demonstrate the glass card." | bump + extend W57 |
| DK / W45 (dock persistent) | "Only SOME docks have persistent nav elements — ALL should leverage the SAME root component: home button on the LEFT, navs, dividing lines." (extends W45 — unify every dock onto one root + the nav pattern) | bump + extend W45 |
| D1 / W38 (configurator) | "The configurator/settings should animate much FASTER, smoother, SPRINGY." | bump + extend W38 |
| W43 (fourier-field) | "The fourier-field SOTA research should be executed NOW, not mid-tranche — pull that section up + execute the SOTA research NOW." | **PULL UP — execute the W43 SOTA research immediately** |

## NEW (pass-3)

| # | Ask | Severity |
|---|---|---|
| Q1 | Dock: the SHRUNKEN (collapsed) item is not the proper SIZE in the demo (the collapsed pill mis-sized). | major (dock — W45 follow) |
| Q2 | Aurora PREVIEWS have a noticeable BLACK BAR in the top preview (the preset thumbnails). | major (aurora — W47/usePresetThumbnails) |
| Q3 | The HOVER effect for the dock + buttons is NOT noticeable — only on CLICK is it visible. The hover state must read on hover, not just active. | major (W52 hover + DK2 — still wrong) |
| Q4 | Pages like /primitives/buttons should be STRUCTURED within a GLASS CONTAINER + leverage PAPER + GRID backgrounds. | major (page redesign) |
| Q5 | /motion/transitions should be UNIONED with /foundations/motion — deduplicate (one motion page). | major (demo IA dedup) |
| Q6 | "None of these items work" (a motion/transitions section) — broken; AND to demonstrate glass we need an INTERESTING/involved BACKGROUND — paper, constellation, fourier, aurora (different types) to display against. | major (broken + background) |
| Q7 | ALL pages re-designed with proper CONTAINERS + design HIERARCHY (like /primitives/badge, /primitives/label) — contain items in GLASS CARDS. | **major — the page-redesign umbrella (blocked on G1 glass-first)** |
| Q8 | /compositions/gate-pattern literally GATES you from the page on click (broken — it locks you out). Should leverage glass cards. | blocker (broken) |
| Q9 | Hero items: the hero CARD itself should be GLASSY (a glass card) over the full-page aurora/constellation/fourier background — to DEMONSTRATE the glass. | major (with P7/W57) |

## Process directives

- **Pull the W43 fourier-field SOTA research UP — execute it NOW** (not mid-tranche).
- Deploy a 32-agent inventory workflow for the above (deduped, re-noted bumps precedence).
- The cadence constraint: ONE big workflow at a time (concurrent 32-agent workflows trip the
  transient server throttle — learned repeatedly). The running 32-lane inventory (wrm47ht3x)
  must settle before / be folded with this pass-3 inventory.

## Dedup anchors + the new umbrella

- **G1/W54 glass-first-class is now the FOUNDATIONAL ROOT wave** — Q3/Q4/Q7/Q9 + "glass first
  everywhere + dock" all depend on it. It must land before the page-redesign waves.
- A NET-NEW **page-redesign / demo-IA-hierarchy** wave (Q4/Q7/Q9 + P8/P10) — every story page
  in a glass card with paper/grid/aurora/constellation/fourier backgrounds + proper hierarchy.
  Likely subsumes/extends W18 + W40 + W57 + W58.
- A NET-NEW **dock-unify-root** extension of W45 (Q1/DK + "all docks same root, home-left, navs,
  dividers").
- The W43 fourier-field — research pulled up NOW; the field becomes a first-class hero background
  (with aurora + constellation, per-hero unique).
- Q5/Q6 motion-page union + Q8 gate-pattern fix + Q2 aurora-preview-black-bar → demo/primitive fixes.
