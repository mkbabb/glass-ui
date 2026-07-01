# D6 — the MOTION SYSTEM from first principles

**Lens:** motion architecture · **Date:** 2026-07-01 · **HEAD:** 976dc890 · **Scope:** `src/composables/motion/` (43 leaves, ~8,884 LOC), the CSS motion registers (`glass/{reveal,liquid-enter,liquid-morph}.css`, `scroll-*.css`, `motion/morph-field.css`), the spring vocabulary + generated tokens, ~33 motion `proof-*.mjs` gates.

## Verdict

The motion system has an **elegant substrate and a bloated delivery layer**. Underneath, there are only **four honest engines** — `SpringProgress` (via `useSpring`), kf `ElementMorph`+`springTimingFunction`, `useLiquidFlex` (pure squish projection), and `createScrollReader` — and the scroll cluster is already correctly factored (one reader, N thin machines). But the *reveal/morph/press* delivery layer has metastasized: **five leaves totalling ~1,806 LOC of TypeScript plus ~1,261 LOC of CSS (`reveal`+`liquid-enter`+`liquid-morph`) all express ONE concept** — a spring-driven `ElementMorph` FLIP between two rects with a set of coupled compositor channels — differing only in *direction* (1→0 vs 0→1), *source* (self / trigger / separate element), and *channel set* (opacity / blur / color / squish / petals). Each variant carries its own public API, its own ~285–462-line file, and its own bespoke `proof-*` gate. Two of the five are **substrate-without-consumer** (`useLiquidMorph`, 462L + an **850-line** `liquid-morph.css`, is not even barrel-exported and is touched only by two demo stories; `useCelebrationBurst`, 261L, has **zero `.vue` consumer**) — textbook over-contrivance and a J-inv-10 violation. The press concept is a three-tier tower (`useSpring`→`useSpringPress`→`useLiquidPress`) exposing two public press APIs for one behavior. And the headline mandate — **liquid-weight UNIVERSAL** — is *not* architectural: `--motion-weight` is a `:root` token that ~26 specific recipes/composables must **explicitly opt into reading**; a bare interactive surface inherits a plain `--ease-standard` bezier with no weight, no bounce, no inertia. The fold is a consolidation of the morph family to ONE `useElementMorph` primitive + thin wrappers, the retirement of the two orphans, the press-tower collapse, and — the real transposition — **inverting liquid-weight from per-site opt-in to a default register every interactive surface inherits**, with a calm opt-out.

---

## The coverage map (what actually ships → the minimal set that covers it)

| Shipped behavior | Current leaf(s) | LOC | Honest substrate | Ideal home |
|---|---|---|---|---|
| Free numeric spring | `useSpring` | 177 | SpringProgress | **KEEP** (the base engine) |
| Press feedback | `useSpringPress` + `useLiquidPress` | 106+222 | useSpring | **`useLiquidPress` (bare mode)** — fold 2→1 |
| Mount entrance | `useSpringMount` | 210 | useSpring | KEEP (or a `useElementMorph` self-scale wrapper) |
| Reveal bloom from source | `useLiquidReveal` | 285 | ElementMorph+springTF | **`useElementMorph`** |
| Forward morph into target | `useDockCtaReceive` | 349 | ElementMorph+springTF | **`useElementMorph`** |
| Shared-element FLIP src≠dest | `useBloomUp` | 449 | ElementMorph+springTF | **`useElementMorph`** (+ color channel) |
| Celebration petals | `useCelebrationBurst` | 261 | springTF/SPRING_PRESETS | **`useElementMorph`** wrapper OR retire (0 consumers) |
| n-ary split/morph "framework" | `useLiquidMorph` (+850L css) | 462 | composes reveal+flex | **RETIRE** (orphan, not in barrel) |
| Drag-to-morph gesture | `useDragMorph` | 399 | Draggable+SpringProgress+flex | KEEP (composes the morph core) |
| Volume-preserving squish | `useLiquidFlex` | 242 | pure math | **KEEP** (the projection primitive) |
| Goo two-edge worm | `useGooMorph` | 460 | composes useLiquidFlex | fold into `useMorphField` (2→1) |
| Blend/weld over N bodies | `useMorphField` | 468 | composes useLiquidFlex | KEEP (the weld) |
| Scroll progress + machines | `useScrollProgress`, `useScrollTrigger`, `useScrollPin`, `useScrollChrome`, `useScrollScene` | 111+327+141+264+225 | `createScrollReader` | **KEEP** (already 1-reader/N-machine; fold `useScrollPin`→mode of `useScrollScene`) |
| View transitions | `useViewTransition` | 223 | native VT API | KEEP |
| Numeric display | `useAnimatedNumber(Map)`, `useCountup`, `useNumericTransition` | 172+62+176+129 | useSpring/kf light | KEEP (distinct concern) |
| Stagger | `useStagger`, `useStaggerReveal`, `useCharStagger` | 145+152+174 | vue-only | KEEP |
| Misc | `useTextHighlight`, `usePointerVelocityField`, `useHaptic`, `bloomUpField` | — | — | KEEP |

**Net:** the delivery layer collapses from **5 morph leaves → 1 primitive + wrappers**, **2 press leaves → 1**, and **2 orphans retired** — a ~2,000 LOC + ~1,000 CSS LOC reduction, ~8 gates → ~2, with *no behavior loss* (every row above is preserved as a mode/wrapper).

---

## Findings (severity-ranked, file:line)

### F1 — CRITICAL · Five morph/reveal leaves are ONE concept (the over-contrivance flagship)
`useLiquidReveal` (`useLiquidReveal.ts:222`), `useDockCtaReceive`, `useBloomUp`, `useCelebrationBurst`, and `useLiquidMorph` all instantiate `new ElementMorph(...)` and drive it with a `springTimingFunction`-sampled curve over a hand-rolled `requestAnimationFrame` `step()` loop. The scaffolding is near-identical (see `useLiquidReveal.ts:240-262` `step()`): measure two rects → build `ElementMorph(a,b)` → drive `inv = 1 - eased` → `morph.apply(el, inv)` → couple `opacity`/`filter`/`color` → clear on settle → PRM snap. `useLiquidReveal` even ships an `asElement()` resolver and comments "kept byte-shape so the bloom family reads as ONE" (`useLiquidReveal.ts:72`) — an explicit admission that these are one family copy-pasted. They differ only in: **direction** (reveal 1→0, cta-receive 0→1), **endpoints** (self-inset / trigger rect / separate source rect), and **coupled channel set** (blur; +hand-off; +`--glass-ambient-hue` color; +petal spawn). All three are parameters, not distinct engines.

### F2 — CRITICAL · `useLiquidMorph` is a 462L + 850L-CSS orphan "generalized framework"
`useLiquidMorph.ts:1` bills itself "the GENERALIZED liquid framework" — an n-ary split/morph at arbitrary θ. It is **not exported from any barrel** (verified: absent from `motion/index.ts`, `core/index.ts`, `src/index.ts`, `api/index.ts`). Its only references are two demo stories (`dock/examples/Spotlight.vue`, `dock/DockExampleTile.vue`) + `AppShell.vue`. It composes `useLiquidReveal` + `useLiquidFlex` — i.e. it is a *third-order* speculative generalization over leaves that are themselves the F1 duplication. `src/styles/glass/liquid-morph.css` is **850 lines** serving it. This is ~1,312 LOC of "arbitrary angle of attack" machinery no library surface consumes — the exact "over-contrivance / speculative axes" the user's verdict names.

### F3 — MAJOR · `useCelebrationBurst` is substrate-without-consumer
`useCelebrationBurst.ts` (261L) is referenced only by `jubilance.css` and `api/types-extra.ts` — **zero `.vue`/component consumer** (verified `grep 'CelebrationBurst' --include='*.vue'` → none). It fails the ≥2-binary-consumer bar (J-inv-10) it was minted under; the wave note claims a "coupled chip-bloom-in cascade" but nothing mounts it. Either wire it to a real earned-moment surface (the speedtest personal-best / completion seal is the obvious ≥2) or retire it.

### F4 — MAJOR · Liquid-weight-UNIVERSAL is a per-site opt-in, not architecture
`--motion-weight: 0.618` lives at `:root` (`scheme-motion.css:172`) with a PRM `0` carve (`scheme-motion.css:341,360`). But weight only reaches a surface if that surface's recipe **explicitly reads** `var(--motion-weight)` — ~26 hand-enumerated sites (`useLiquidFlex`, `useLiquidPress`, `useMorphField`, `cards.css`, `glass-atom.css`, `btn.css`, `segmented-tabs.css`, `useTabIndicator`, `dockMorphContext`, …). The **default** surface transition register is `--ease-standard` (a plain cubic-bezier, `scheme-motion.css:91`) — no spring, no weight, no bounce. So a bare interactive element (a `hover:scale` utility, a `transition: transform`) carries **zero** liquid-weight. The mandate "inertia/weight/bounce on ALL motion" is architecturally *unmet*: it's an allowlist, and every new surface must remember to join it (the recurring "missed obvious issue" the verdict flags). The `--motion-weight` write-sites vs the `--ease-standard` default are two disjoint worlds.

### F5 — MODERATE · The press concept is a 3-tier tower with two public faces
`useSpring` → `useSpringPress` (adds press/release/handlers) → `useLiquidPress` (adds squish + `--press-t` + weight-cap). Button consumes `useSpringPress` directly (per `proof:button-glass` B2), Card consumes `useLiquidPress` (`Card.vue`), dock is "the booked third" (`useLiquidPress.ts:38`). Two public press APIs for one behavior; `useSpringPress` exists as a separate export mainly to satisfy a gate assertion, not a design need. `useLiquidPress` with a `squish: false` bare mode covers Button too.

### F6 — MODERATE · Gate ceremony: ~33 motion `proof-*.mjs` for a system that should be one engine
`proof-liquid-reveal`, `proof-liquid-morph`, `proof-bloom-up`, `proof-celebration-burst`, `proof-dockmorph-cta`, `proof-drag-morph`, `proof-press-unify`, plus **seven** `proof-motion-*` (`-composables-consumer`, `-demo`, `-one-clock`, `-presets`, `-suite`, `-value-free`, `motion2`) and **three** `proof-spring-*`. Each F1/F2 leaf minted its own gate. Consolidating the leaves collapses ~8 of these into 1–2 (a `proof-element-morph` covering the unified primitive's compositor-only + PRM + channel-split contract). `proof-spring-crisp` guards a `--spring-crisp` that was DECIDED-not-minted (a no-op-decision gate) — pure ceremony.

### F7 — MINOR · `useScrollPin` has a single consumer; fold as a mode
`createScrollReader` → {trigger, chrome, scene, pin, tracker} is the *good* pattern (one reader, N thin machines — the model the morph family should copy). But `useScrollPin` (141L) has only one consumer file; it is a special case of `useScrollScene`'s phased-stage. A `pin` mode on `useScrollScene` removes a public leaf without behavior loss.

---

## FOLD CANDIDATES (for the BG/BH plan)

### FC1 — NEW WAVE · `W-ELEMENT-MORPH-UNIFY` (the morph-family collapse) — **the headline fold**
Mint ONE primitive `useElementMorph(surface, { from, to, direction, channels, preset, origin, respectReducedMotion })`:
- **from/to**: rect providers (`Ref<El|Component>` resolved via the shipped `asElement`, a literal `DOMRect`, or `'self-inset'`). Covers self-scale (reveal no-trigger), trigger→settled (reveal), self→target (cta-receive), source→dest (bloomUp).
- **direction**: `'in' (1→0)` | `'out' (0→1)` | `'flip' (a↔b in place)`. Covers reveal (in), cta-receive (out), bloomUp (in from foreign source).
- **channels**: a declarative set `{ opacity?, blur?, color?, squish?, spawn? }` each a coupled compositor lane sampled off the ONE spring clock. Covers reveal (opacity+blur), bloomUp (+`--glass-ambient-hue` color), celebration (`spawn` petals via `useLiquidFlex`).
- **GESTALT approach:** this is the *scrollReader→N-machine* pattern transposed onto morph — ONE `step()` rAF, ONE `ElementMorph`, ONE PRM snap, ONE compositor-only invariant, sampled from `SPRING_PRESETS`. `useLiquidReveal`/`useDockCtaReceive`/`useBloomUp` become ~15-line named wrappers (byte-identical public API, clean-break internals — no legacy alias). Kills the F1 copy-paste + the `asElement` "kept byte-shape so it reads as ONE" comment (`useLiquidReveal.ts:72`) by making it *actually* one. **Visual wave** → Fable design arm reviews the reveal/cta/bloom surfaces via DesignSync (the bloom frame-series is a gestalt judgement). Collapses `proof-liquid-reveal`/`-bloom-up`/`-dockmorph-cta`/`-celebration-burst` into one `proof-element-morph`.

### FC2 — PRUNE WAVE · `W-LIQUID-MORPH-RETIRE` (retire the orphan framework)
Delete `useLiquidMorph.ts` (462L) + `liquid-morph.css` (850L) — clean break, no alias (F2). Re-point its two demo stories (`Spotlight`, `DockExampleTile`) onto the FC1 `useElementMorph` primitive (they need the reveal + squish it already composes, nothing more). Retire `proof-liquid-morph.mjs`. **Rationale to record:** "arbitrary-θ n-ary morph" was a speculative generalization with no library consumer; the real dock V↔H morph is `dockMorphContext` (unchanged), and any future n-ary case rides `useElementMorph` at its own ≥2-consumer trigger. This is the single largest LOC reclaim in the motion domain.

### FC3 — AMEND WAVE · `W-CELEBRATE-WIRE-OR-RETIRE` (kill the substrate-without-consumer)
Either (a) wire `useCelebrationBurst` to the two earned-moment surfaces the design language names (the `<CompletionSeal>` glint + a speedtest personal-best HUD — the ≥2 bar) and record them in `docs/consumer-evidence/`, OR (b) retire it and fold its petal-spawn into FC1's `spawn` channel (a celebration is `useElementMorph` with N petal children on the bouncy row). Prefer (b) — it removes a leaf AND a gate (`proof-celebration-burst`) and proves the FC1 primitive covers the emphatic case. **Visual wave** → Fable arm.

### FC4 — NEW WAVE · `W-LIQUID-WEIGHT-DEFAULT` (the liquid-weight architectural inversion) — **the transposition**
Invert F4 from opt-in to default. Concretely:
- Mint a **default interactive-transition register** `--transition-liquid-spatial` = a spring-derived `linear()` curve on the per-spring clock (generated by `regen-spring-tokens.mjs`, so it stays drift-proof), scoped to the SPATIAL property group (`transform`/`scale`/`translate`/`rotate`) — the spatial/effects split (`P1`) is preserved: EFFECTS legs (color/opacity/shadow) keep `--ease-standard` bezier.
- Apply it at the **base atom/utility layer** (`utilities/base.css` / the interactive-atom `@utility`) so EVERY interactive surface inherits weight on its spatial legs *by default*, reading `--motion-weight` in the same recipe.
- Provide the **calm opt-out** as a token/utility (`.motion-calm { --motion-weight: 0 }` or `--transition-liquid-spatial: var(--ease-standard)`) — the `<Card>` calm register (`scheme-motion.css:93`) becomes an explicit opt-out, not the accidental default.
- **PRM + compositor-only fall out for free:** the existing `--motion-weight: 0` PRM carve (`scheme-motion.css:360`) and `proof:no-layout-animation` already cover the whole spatial group, so the inversion is *safe by construction*.
- **GESTALT approach:** "liquid-weight universal" stops being a per-surface checklist and becomes a property of the design system's transition vocabulary — a new surface is liquid-by-default and must *ask* to be calm. This is the inversion the mandate implies and the architecture currently contradicts. **Visual wave** → Fable arm sweeps the full storybook for surfaces that suddenly (correctly) gain weight, flags any that should opt out. Amends `proof:motion-canon`/`proof:no-layout-animation` to assert the default register is spring-derived.

### FC5 — MERGE WAVE · `W-PRESS-COLLAPSE` (2 press leaves → 1)
Fold `useSpringPress` into `useLiquidPress` with a `squish: false` / bare mode (F5); Button consumes `useLiquidPress({ squish: false, pressVar: '--glass-btn-press-t' })` — same feel, one public face. Remove the `proof:button-glass` B2 assertion's dependency on a *separate* `useSpringPress` export (assert direct composition of the unified leaf instead). Retire `proof-press-unify` into a single `proof-press` clause on `useLiquidPress`. Clean break, no alias.

### FC6 — MERGE WAVE · `W-SCROLL-PIN-FOLD` + `W-GOO-WELD-FOLD` (leaf-count discipline)
(a) Fold `useScrollPin` (1 consumer, F7) into `useScrollScene` as a `mode: 'pin'` — one public scroll-scene leaf. (b) Fold `useGooMorph` into `useMorphField` (goo is the two-edge case of the weld; both compose `useLiquidFlex`) — one public weld leaf with a `edges: 2` case. Both are pure leaf-count/gate reductions with zero behavior loss; record the ≥2-consumer evidence on the surviving leaf.

### FC7 — PLAN-DOC-EDIT · Record the motion coverage map + the "one-engine-N-forms" precept
Add the coverage-map table above to `docs/precepts/` (or the motion-canon doc) as the standing enumeration: FOUR substrates (SpringProgress, ElementMorph, useLiquidFlex, createScrollReader) + N thin delivery wrappers, and the rule that a new motion behavior is a *wrapper/mode/channel* on an existing substrate unless it clears its own ≥2-consumer bar as a genuinely new substrate. This is the machine-readable answer to "N locally-correct patches vs ONE designed system" for the next tranche — it stops the morph family from re-metastasizing.

---

## What is already GOOD (do not touch)
- `SPRING_PRESETS` single-source (`springPresets.ts:75`) → both CSS `linear()` tokens and JS curves derive from ONE table. Drift-proof by construction. Exemplary.
- The scroll cluster (`createScrollReader` → trigger/chrome/scene/tracker) is the correct one-reader/N-machine pattern — the model FC1 copies.
- `useLiquidFlex` as a pure caller-driven squish *projection* (no rAF/spring/element) — the right primitive shape; it's the *consumers* that proliferate, not it.
- The spatial/effects duration-clock split + per-spring `--spring-<name>-duration` — keep; FC4 builds on it.
