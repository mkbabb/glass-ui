# AX — live-product defect ledger, PASS 2 (user audit 2026-06-08 ~16:40)

A second deep live pass after the W52 liquid-glass material landed. The headline shift:
**glass should be FIRST-CLASS / the default**, the design language pivots to **squircles**,
and the **Apple-SOTA liquid/squishy** idiom is the target. Long-horizon: triumvirate waves
(SOTA research → harden → plan → author), 32-agent workflows batched 4, iterate to a
convergent optimum. NO quick fixes, gestalt transpositions, NO legacy.

## G — glass-character (first-class)

| # | Ask | Disposition |
|---|---|---|
| G1 | Glass should be FIRST-CLASS in dock/cards/etc. Why is the DEFAULT not glass? | NET-NEW — glass-first-class: make glass the default surface; abrogate the opaque default OR mint a tunable glass-LEVEL variant (incl. an explicit `opaque`/solid variant). 32-agent audit+harden of glass-character. |
| G2 | Glass dock over VERY LIGHT materials is unreadable — dynamically darken the glass adaptively. SOTA as of iOS 27? | NET-NEW — adaptive glass legibility (the iOS-26/27 dynamic-contrast / backdrop-luminance-aware darkening). SOTA research lane. |
| G3 | Pivot to SQUIRCLES for most of the design language — rounded for cards, rounded for docks, but big-docks + the like → squircles. | NET-NEW — squircle design-language pivot (superellipse radius system; where rounded vs squircle). SOTA research + token/recipe. |
| G4 | Apple-SOTA: audit apple.com/os liquid + squishy effects — mirror them. | SOTA research lane (apple.com/os; the liquid-glass + squish-spring idiom). |

## DK — dock

| # | Ask |
|---|---|
| DK1 | The shrunken icon does not appear for a while — tune animations/timings so the shrunken (collapsed) icon appears naturally with NO added delay. |
| DK2 | The hover/select state for dock icons + dropdowns is not right at all. |
| DK3 | Collapsible dock should NOT modify page flow (perhaps); the icon is missing. |
| DK4 | Big-dock icons are not aligned. |
| DK5 | Dock items should be demarcated with separators when befitting (design + affordance hierarchy). [relates W45 DockSeparator] |
| DK6 | No icon (a collapsed/layer state); the collapse animation for INTERNAL items needs refinement + proper prototyping. Dock LAYERS + switching layers should be animated + FIRST-CLASS. |
| DK7 | Dock layers is not smoothly animated — far too laggy/delayed. |
| DK8 | The rail bg's are not right + mis-aligned (2 screenshots). |
| DK9 | Differentiate the VERTICAL dock vs the RAIL for the horizontal dock (/navigation/rail). |
| DK10 | A dedicated VERTICAL dock SECTION for the dock, glass, etc. [relates D14] |

## T — tabs / toggle

| # | Ask |
|---|---|
| T1 | Default tabs → the BOUNCY (custom spring-slider) variant; offer `tabs` (underline) + `pill` variants (pill NOT the default). |
| T2 | BouncyToggle → replaced by bouncy-tabs (remove OR leverage the EXACT same animation); drop the "Bouncy" prefix; update ALL consumers. |
| T3 | /navigation/responsive-tabs → subsumed by the underline tabs; ALL within ONE component. |
| T4 | Two tab story pages flagged BROKEN. |

## P — prune / demo IA

| # | Ask |
|---|---|
| P1 | /composables/use-token-color → remove; the icon → a darkmode toggle. |
| P2 | /primitives/disco-glyph → remove. |
| P3 | /primitives/glyph-face → likely remove. |
| P4 | /navigation/glass-carousel → remove. |
| P5 | /navigation/carousel → more Apple-like + glassy (the liquid/squishy carousel). |
| P6 | /primitives/pulse — the radial bg is far too egregious. |
| P7 | Some pages/heros should leverage an AURORA (with the page's colors) or a CONSTELLATION instead of hand-rolled radials. |
| P8 | Each page should use the speedtest GRID idiom when befitting — more paper + glass-like. |
| P9 | /substrates/glass-material is broken [D8/W48 — re-confirmed]. |
| P10 | Each story page: interspersed explanatory text, NO superfluity. Most extant text is duplicative or code that must be removed. |

## Process

- Deploy SEVERAL triumvirate waves: SOTA research → hardening → planning → tranche-wave writing.
- Audit ALL pages + components.
- Workflows of 32 agents, batched 4 agents each; iterate to a convergent optimum (long horizon).
- The orchestrator owns the LIVE audit (chrome-devtools-mcp) + the magnitude tuning.

## Dedup anchors (existing waves)

- W45 (dock region-model + DockSeparator + mobile) → DK1/DK3/DK4/DK5; W06/W18 → DK10/the section.
- W52 (liquid-glass) → G1 substrate; W36 → G2 (adaptive); a NET-NEW squircle wave → G3.
- W05 (spring vocab) → DK7/the dock-layer timing + T1/T2 (the bouncy animation scheme).
- W18/W19/W21/W40 → the prunes (P1-P5) + the demo IA (P7/P8/P10).
- W47/W48 → aurora/glass-material demo (P9).
The audit MUST verify each anchor: sufficient, augment, or net-new — no duplicate prescriptions.
