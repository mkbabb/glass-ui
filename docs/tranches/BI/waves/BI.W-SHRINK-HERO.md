# BI.W-SHRINK-HERO — the shrink-on-scroll title, the sticky containing-block fix, bidirectional

Band B6 (storybook meta-system). Born-RED at HEAD.

## Mandate

- **UF-F2** "On all pages … The title should not only fade out, but it should shrink on scroll. This should be a standard facility" — the shrink-title standard-facility mandate row.
- **UF-F9** "Pages like /forms/inputs have good scroll mechanics and animations, but should be slightly better, bi-directional, and refined." — the bidirectional refined body-scroll register. (The draw-in dividing-line calibration is B7/D-MOTION `W-DRAWIN-EXPO-REGISTER`; the section-card demarcation is W-AFFORDANCE — this wave owns the scroll choreography.)
- **FAM-14** (shrink arm): StoryHero does NOT shrink on scroll — the ScrollCard shrink lanes exist, unconsumed by it (WS4-01 / C-SCROLLSHRINK: "fades, never shrinks").
- **G7** (`story/PASS-1.md` §6): scroll policy + integrity — (a) the dual register (shrink on content pages / scroll-away on hero+viz pages, a prior explicit user decision), (b) the sticky containing-block integrity probe, (c) the bidirectionality policy.

## Design

The mechanism is BUILT + gated (`story-hero.css` `.story-hero-shrink`, `position: sticky` line 479, compositor scale+translate on native `scroll()`, `--title-collapse-scale` per BG.W-SCROLL-SHRINK-UNIFY; `proof:page-chassis` PC1 reds font-size in the shrink keyframe). This wave ENCODES the policy + fixes the integrity break — no rebuild.

**The G7-STICKY fix (born-RED at HEAD).** Pass-2 measured the shrink register's sticky persistence BROKEN — the containing block is the 126px header, so the sticky title clips instead of persisting against the scroller. Pass-3 proved the fix on BOTH engines: `display: contents` on the intermediate ancestor so the sticky containing block becomes `<main>.demo-main-scroller` + the pinned header gains an opaque/blur backing (a stuck header lifts painted, not transparent). The binding-chain probe (G7-b): on EVERY route `.story-hero-shrink` resolves real monotonic `scroll()` progress against the scroller with NO transformed/overflow/contain ancestor in the chain (the silent sticky+timeline killer — the BG re-parenting class).

**The dual register (G7-a).** Content pages carry `.story-hero-shrink` (scale-led, fade opens only past the 160px pin); hero/viz pages carry `.story-hero-scroll-away` (the prior explicit user fix — a giant title pinned over a live viz was the defect, `story-hero.css:461-470`). The literal "every page shrinks" read is WRONG — the scroll-away is a decided register. Both are native `scroll()`/`view()` → **bidirectional by construction** (scroll up reverses); no Lenis/GSAP/rAF scroll engine import (the native-first fence). Gap-engine degrade: static large sticky header + static-visible sections (honest reduced form). The per-glyph IO heading reveal is an ENTRANCE (one-shot), not a scroll animation — recorded ruling (body builds ride `view()`, bidirectional; the glyph entrance does not).

## Work

- `demo/chassis/hero/story-hero.css` — the `display: contents` intermediate-ancestor carve so the sticky containing block is the scroller; the pinned-header opaque/blur backing.
- `demo/chassis/page/StoryPage.vue` (+ `demo/chassis/hero/`) — wire the shrink register onto the hero cluster on content pages (the FAM-14/WS4-01 unconsumed-shrink fix); scroll-away on hero/viz pages by variant.
- `scripts/proof-page-chassis.mjs` — the dual-register assert (shrink vs scroll-away by page variant) + the bidirectional/native-timeline/no-scroll-lib bite + the containing-block integrity probe (real monotonic `scroll()` progress vs `.demo-main-scroller`, no transformed/overflow/contain ancestor).

## Acceptance

Gate: **`proof:page-chassis`** EXTENDED in place — GREEN at close (BORN-RED at HEAD: G7-STICKY containing-block broken; StoryHero unconsumed shrink).

Clauses (added to the existing PC1):
- PC-DUAL the shrink register on content pages AND the scroll-away register on hero/viz pages, by variant (both asserted — the "every page shrinks" single read reds).
- PC-STICKY on EVERY route `.story-hero-shrink` resolves real monotonic `scroll()` progress against `<main>.demo-main-scroller` with NO transformed/overflow/contain ancestor in the chain (born-RED on the 126px-header containing block).
- PC-BIDIR native `scroll()`/`view()` timelines only — a Lenis/GSAP/Locomotive/rAF scroll-momentum import reds.
- PC-PRM the shrink/scroll-away carve to a static large header under reduce.
- Self-test bites: a planted `transform` on an intermediate ancestor reds PC-STICKY; a planted scroll-lib import reds PC-BIDIR; a content page with the scroll-away register (or vice-versa) reds PC-DUAL.

## π/DELTA

- **The shrink frame-series** — a content page's title SHRINKS (compositor scale+translate, no reflow) into the slim sticky header, bidirectional (scroll down + scroll up reverses); a hero/viz page SCROLLS-AWAY (the field owns the viewport); PRM → static large header. Chrome + **real-Safari.app** (G7-STICKY persists both engines per pass-3), both modes. `tests-visual/page-chassis.spec.ts`.

## Obligations

- **STABLE-Safari** (SAF-1): the shrink-animation paint fidelity + the sticky persistence on real Safari.app (pass-3 covered the structural claim on both engines; the animation paint owes a stable-Safari capture).

## Dispositions

- Terminalizes **WS4-01** / **C-SCROLLSHRINK** (titles scroll-and-shrink revived). The UF-F9 draw-in dividing-line calibration is B7/D-MOTION (`W-DRAWIN-EXPO-REGISTER`); the section-card demarcation is W-AFFORDANCE — both cross-band, not owned here.
