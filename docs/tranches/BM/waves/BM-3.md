# BM-3: springs on curves Safari's compositor takes

| field | value |
|---|---|
| release | BM's parts minor |
| status | planned. Step 1 (the tokens) depends on nothing of another repo's; step 2 (the settle player) lands when keyframes.js's sampler does |
| rests on | choice 4 B (Q6), ratified under IN O-426; `motion-canon.md` P5 and P7 as BM-0 amended them |
| DESIGN | §4.1, §4.2; with §10.6 |
| starts from | `SPRING_PRESETS` and `scripts/regen-spring-tokens.mjs`; the fits in `study/pass-2/delivery/curves.json` (`tokenReplacement`) and D§4.2's refitted panel; the player sketches `study/pass-2/delivery/sketch/playSpring.ts` and `study/pass-6/fold/sketch/playSpring.ts` |
| page | R2 (Four Ways to Settle) and P2-scroll (Scroll Under Load), optional readings |
| gates | G-1, G-2, G-5 |
| depends on | 11.1.2's generator cure (IN O-430 item 6: every spring easing's sampled duration runs until it settles within 0.1 %); keyframes.js's sampler export (OPEN §2) for step 2 |

## What it builds

**Step 1, the tokens (rule 1).** `regen-spring-tokens.mjs` writes each `--spring-*` token as the closest single `cubic-bezier()` that leaves rest at no speed and, on every row but panel, never passes its target. A `linear()` reaches WebKit's compositor only from Safari 27.3 ([27.3] 190761783), and Home Assistant's WKWebView on iOS 26 never has it (D§4.1), so a state change that must glide while the page is busy rides a curve every supported Safari takes. Read from WebKit's source and release notes; no iPhone has timed it.

| Row | Curve | Against today's `linear()` |
|---|---|---|
| press | `cubic-bezier(0.244, 0, 0.251, 0.672)` | 1.48 % |
| present | `cubic-bezier(0.197, 0, 0.124, 0.808)` | 1.96 % |
| dock | `cubic-bezier(0.232, 0, 0.18, 0.703)` | 1.89 % |
| bloom | `cubic-bezier(0.183, 0, 0.237, 1)` | 0.95 % |
| world | `cubic-bezier(0.176, 0, 0.066, 1)` | 2.44 % |
| panel | `cubic-bezier(0.215, 0, 0.059, 1.288)`, keeping its own 4.21 % overshoot | 3.67 % |

The generator computes them; these are the study's figures, and G-1 reads the built sheet against `SPRING_PRESETS`' closed form, not against this table. Each row's `-duration` stays the spring's own clock (P4). The generator, not a hand edit, writes the tokens, as 11.1.2's cure does.

**Step 2, the settle player (rule 2).** A body that carries a speed (a release, a settle, a mark retargeted mid-glide) plays keyframes keyframes.js samples from the row's closed form, from the body's own position and speed, by `element.animate()`. A retarget samples again from where the body is. A `translate` ends within half a pixel of its rest. glass writes no sampler of its own (P7: keyframes.js computes, the browser plays). Where a site is at its cap (daraksha's reader route), the player loads on the first touch.

**Rules 3 to 5** need no new code here: a follow writes `translate` per pointer event (BM-4, BM-5), a scroll function rides a scroll timeline (BM-7), and a state set by scrolling plays as rule 1 (BM-9's scroll-chrome).

**`--ease-cartoon-punch`** (`src/styles/tokens/scheme-motion.css:163`). Its comment calls it compositor-safe in both engines, which before Safari 27.3 it is not. The comment is corrected; the curve stays as it is until the owner answers OPEN O-1.

**Nothing writes a custom property each frame** to drive motion, and one node never carries a held animation and a transition on the same property.

## Inputs folded

- **The spring's end step** (IN O-430 item 6). 11.1.2 fixes the generator so no easing's last step exceeds 0.1 %. Step 1 replaces the tokens after it, from the same generator.
- **keyframes.js today** (read on keyframes.js `origin/master` at `2a11fb1f`, 6.5.0). The pieces are there: `SpringProgress` is public (`src/animation/index.ts:37`) and steps a spring from any position and speed; `springLinearStops` and `springTimingLUT` (`:52`, `:57`) take an `initialVelocity`, on the normalized spring, as even samples or a `linear()`; `sampleNormalizedSpring` (`src/animation/physics/spring/solver/sample.ts:75`) is their shared seeded step loop; and `Draggable` (`src/animation/orchestration/drag/draggable.ts:127`) re-seats its spring from the release speed. What no export gives is keyframes from a start position, target and speed to a tolerance, with the spring's state at any time. The ask in keyframes' message is that one function, and a follow in `Draggable` that starts the spring at release. Rule 2 needs keyframes and not a `linear()` easing, which Safari's compositor takes only from 27.3.

## Bytes

CSS: −1,637 B of `linear()` tokens and +150 B of curves at every site, net −1,487 B. JS: +655 B for the player, on intent (`study/pass-10/ledger/ledger.json`). Indicative until G-4.

## Proof

- G-1 on the built token sheet: no `--spring-*` is a `linear()`, each is within 2.65 % of its closed form (panel within 3.67 %), and none but panel passes its target.
- The strip: each row's curve drawn beside its closed form and today's list.
- The player, in headless Chromium and Playwright WebKit: a release from speed lands within 0.5 px; a retarget mid-glide keeps its speed across the turn (no step in velocity between the two sampled runs); under Reduce Motion the dip or the crossfade (D§5.3).
- G-2 and G-5 over every part that rides a token.
- Optional, never blocking: R2 and P2-scroll on an iPhone with Low Power Mode off and on (D§15.2, Q7).

## Sites it serves

Every site that loads glass's tokens: atlas, value.js, daraksha, fourier, keyframes, gaggle, Home Assistant, and slides once it moves to 11. None changes anything. keyframes.js is asked for the sampler.

## Not this wave's

keyframes.js's sampler and `Draggable`'s follow (keyframes'); the generator's 0.1 % cure (11.1.2); `--ease-cartoon-punch`'s curve (the owner's, OPEN O-1).
