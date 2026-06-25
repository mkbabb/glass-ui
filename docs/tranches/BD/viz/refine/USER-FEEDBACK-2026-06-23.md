# User feedback 2026-06-23 (the refinement triumvirates) — verbatim + dispatch assignments

The user gave screenshot-grounded feedback. Each item → a refinement triumvirate (research root-cause | SOTA target | fix-mechanism → plan/wave → prototype → judge, iterate). Engine: `docs/tranches/BD/viz/refine/refine-triumvirate.wf.js`. Paced vs the browser/quota (one or two at a time).

| # | Verbatim feedback | Triumvirate | Status |
|---|---|---|---|
| 1 | "Why is our glass so grey often? We need to completely abrogate dark gray glass." + "Our glass cards are also far too gray" + "these toggle buttons so grey... our buttons should not be gray glass" + "far too gray, dark--the text isn't readable. Our glass system needs to be further refined, researched, prototyped." (the select dropdown = a flat GRAY plate in LIGHT mode) | **glass-abrogate-gray** | **LAUNCHED** (wf_fef10ca1-973) — the dominant systemic issue |
| 2 | "/motion/deck is awful... The animation is far too fast, the dot far too small, the goo and morphing far too subtle. It should stretch and flow more slowly." | **goo-morph-refine** (slower clock + bigger dots + fatter goo + weightier flow) | QUEUED (next) — refines W-PAGER-GOO-MORPH |
| 3 | "useLiquidReveal doesn't seem to work at all." | **liquid-reveal-fix** (root-cause the broken reveal) | QUEUED |
| 4 | "/forms/select — the select animates when you click the trigger... the animation needs to be smoother and refined." | fold → **liquid-motion-refine** (with #3) OR the menu-glass build | QUEUED |
| 5 | "/forms/toggle-chip — none of these are styled congruently — should be more rounded and glassy." | fold → **glass-abrogate-gray** (#1 — it's a glass/styling congruence issue) | folded into #1 |
| 6 | "Spacing and padding items are off here — those x's should be bigger and more stylized." + "Padding is awful." | **padding-spacing-pass** (the x/close glyphs bigger+stylized; the card/control padding) | QUEUED |

## Notes
- The gray-glass (#1) is the highest-leverage + most-repeated — research/prototype per the user's explicit "researched, prototyped". Likely root causes to confirm live: the `--glass-tint-*` adaptive-darkening over-graying the plate, the `--card`/`--popover`/`--neutral-*` resolution, or the menu/popover panel bg. Both light AND dark mode.
- The goo-morph (#2): I built the worm (W-PAGER-GOO-MORPH, judged liquid) but the user finds it too fast/small/subtle — the REFINE tunes `--pager-worm-duration` (0.57s → much slower), the dot size (6px → bigger) + elongation, the goo `feGaussianBlur` stdDeviation (4 → fatter) + threshold, and the flow weight. (I had flagged the small-dot prominence risk; the user confirmed it.)
- These run in PARALLEL with the ongoing Pass-E story-page audit (do-not-deviate) — paced so the browser-heavy phases don't all collide.
