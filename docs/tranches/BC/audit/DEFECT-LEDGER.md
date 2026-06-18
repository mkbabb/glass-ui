# BC.W-AUDIT — the live-grounded DEFECT LEDGER (every reported visual defect, root-caused)

All 79 user screenshots saved at docs/tranches/BC/audit/screenshots/user-*.png (2026-06-16 → 06-18).

| # | defect (user words) | root cause (live-grounded) | BC home |
|---|---|---|---|
| D1 | glass too dark + grey (major regression) | the dock/overlay band darken 20%-AA ink-ward UNCONDITIONALLY; the luminance observer is decorative (writes --glass-backdrop-luma that nothing reads). Pre-fixed (e1b4b44c, 4% floor); real fix = close the observer loop. | Band 1 — BC.W-ADAPTIVE-RECONCILE |
| D2 | "wtf is this black bar" at the top of cards/pages | the card border-top is a dark warm-ink rim `oklab(0.216 0.0035 0.0052 / 0.11-0.13)` reading as a hairline over light glass | Band 1 — BC.W-DOCK-EDGE / the rim→catch-light rebuild |
| D3 | dock animations entirely broken, not smooth; /dock/overview blurry + a mess | the shell docks carry `transition: all` (transitions EVERY property incl. backdrop-filter + layout → jank/blur during morph); no will-change/compositor promotion | Band 2 — BC.W-DOCK-ENGINE (compositor-only transitions) |
| D4 | navigation/tabs NOT liquid glass at all, not to spec | the tab register paints flat (the SegmentedTabs material is not the iOS liquid-glass plate); the dark-rim D2 also shows | Band 2/4 — BC.W-VISUAL-RECONCILE + the tab material |
| D5 | the liquid morph turns white/invisible; on Safari it rapidly FLASHES; none of the morphing works on Safari | (a) the box-size V↔H morph goes white (BB.W-DOCK-MORPH-FAMILY); (b) Safari: `WebGL: context lost` + the morph re-render churn = the flash; the morph is not compositor-stable cross-engine | Band 2 — BC.W-LIQUID-MORPH (arbitrary-shape, never white, Safari-stable) + Band 3 WebGL-context-mgmt |
| D6 | /compositions/hero has the same content as the homepage + the three bugged views; hero items that redirect should have ICONS + better design HIERARCHY | the hero pages use a repetitive hero-card pattern; no per-category icons; weak hierarchy. NORTH-STAR: herostudios.tv — audacious oversized geometric-sans display, light/high-contrast, generous whitespace, motion-forward, minimal color. glass-ui owns the √φ display ladder (peaks 352px) but never applies it audaciously to the heroes. | Band 1.5 — BC.W-HERO-AUDACIOUS (new) |
| D7 | Safari: liquid morphing fully broken | `WebGL: context lost` on WebKit — the WebGL viz (aurora/blob/constellation) die; cross-engine context management absent | Band 3 — BC.W-VIZ-LIVE (Safari/WebKit context lifecycle) |

## Design north-star — herostudios.tv (BC.W-HERO-AUDACIOUS)
Audacious oversized BOLD geometric-sans display heads; white/light high-contrast ground; minimal restrained color (motion carries the energy, not color blocks); asymmetric grid + substantial whitespace; inline motion as the focal point; "professional yet playful, craft-focused." glass-ui already has the type SYSTEM (the √φ text-display-* ladder to 352px, Plus Jakarta Sans/Fraunces) — BC must APPLY it: distinct audacious hero pages, per-category icons, real hierarchy, motion-forward — not the repeated grey-card grid.

## The cross-repo coordination (speedtest fleet, confirmed 2026-06-18)
The dist CSS-comment "Unterminated string" bug is ROOT-FIXED by the fleet: `vite.style-assets.ts` anchored its @import folds on `indexOf("@source")` (matched the word in comment prose) → now anchored on the line-start at-rule + the split-url() + the Drawer→subpath API move. Sequence: rebuild glass-ui → consumer-verify → publish 4.0.1 (npm auth confirmed, 1009 tests green) → speedtest consumes ^4.0.1 (value 0.13 + keyframes 4.3, peer-aligned). BC.W-DIST-COMMENT-FIX coordinates: glass-ui's source comment + a balance-guard gate land in-repo so the fleet's fix and ours converge; the 4.0.1 cut is the cross-repo unblock that precedes the BC 4.x cut.

## CATASTROPHIC — the procedural viz are ALL DEAD (live-probed 2026-06-18, chromium :5199)
Every one of the 5 procedural viz renders **meanLum 0 (pure BLACK)** — NONE paints:
| viz | route | mean luminance | error |
|---|---|---|---|
| aurora | /substrates/aurora | **0 (black)** | none (substrate not arming/painting) |
| goo-blob | /substrates/blob | **0 (black)** | `[useWebGPUCanvas] no GPU adapter` (PAGEERROR) |
| constellation | /substrates/constellation | **0 (black)** | none (not arming) |
| dot-flow-field | /substrates/dot-flow-field | **0 (black)** | `[useWebGPUCanvas] no GPU adapter` (PAGEERROR) |
| concentric | /substrates/concentric | **0 (black)** | `[useWebGPUCanvas] no GPU adapter` (PAGEERROR) |

ROOT (two):
- **D8 — the WebGPU substrate ERRORS instead of falling back.** The WebGPU-first viz (blob/dot-flow-field/concentric) throw `no GPU adapter` on an adapter-less host and render NOTHING — `useGpuSubstrate`'s "graceful WebGL2 fallback" is a LIE; the picker does not catch the absent-adapter case + degrade. This is the audit's "dormant always-fall-to-WebGL2" finding, but WORSE: it does not fall back, it crashes the canvas. The structural-proxy ΔE-0.0 "parity" hid that the WGSL path produces ZERO pixels on a real (non-WebGPU) host — which is most hosts.
- **D9 — aurora + constellation paint black with no error** (the WebGL2 viz that DON'T error still don't paint) — the substrate is not arming/painting on the route (the demand-gate / offscreen-pause / the swraster fall / a sync-arm-before-async bug parks them at black). The aurora hero pages are black voids (screenshot 23.57.17).

BC home: Band 3 — BC.W-VIZ-RESURRECT (not "modernize" — RESURRECT every viz to actually paint on a real host) + BC.W-WGSL-FALLBACK (the WebGPU→WebGL2→Canvas2D graceful degrade that the picker promised but never delivered; born-RED a live meanLum>0 assert per viz on an adapter-less host).
