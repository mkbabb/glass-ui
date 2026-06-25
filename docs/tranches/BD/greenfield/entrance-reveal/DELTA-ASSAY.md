# DELTA-ASSAY — the ENTRANCE + REVEAL motion system (golden-vs-current + the UNION path)

> Scope: `useLiquidReveal` (the FLIP/source-rect bloom), `useBloomUp`, the liquid-entrance general
> (squish/morph/fade), `useSpringMount`, `useStagger` · `useStaggerReveal` · `vReveal`, the mount-clock
> stagger (`.scroll-build`/`.scroll-cascade`). Reference: `GOLDEN.md` (synthesis + the three challenges
> FOLDED). Verdict: **REFINE-dominant + ONE RE-INVENT (the dead `useLiquidReveal` wiring) · ~88% converged.**
> Method: every claim live-tested on the running app (Chrome via chrome-devtools-mcp, `:5173/motion/reveal`)
> + source-read against `src/`. Survival of the fittest — KEEP what is fit, REFINE what is weak,
> RE-INVENT only what is broken. A UNION, never a fork. NO legacy.

---

## 0 — The live born-RED capture (the DELTA artefact, Chrome, HEAD)

Drove the REAL open→bloom on `/motion/reveal` (the flagship consumer). Captured frame-series of the
`.glass-reveal` surface across the 600ms open:

```
errors:           ["Uncaught TypeError: triggerEl.getBoundingClientRect is not a function"]
frameCount:       6
firstFrame:       { transform: "none", opacity: 1, filter: "blur(0px)", inlineStyle: "" }
midFrame:         { transform: "none", opacity: 1, filter: "blur(0px)", inlineStyle: "" }
lastFrame:        { transform: "none", opacity: 1, filter: "blur(0px)", inlineStyle: "" }
anyTransformNotNone: false ·  anyBlur: false ·  anyInlineStyle: false
```

The JS bloom writes **NOTHING** — the surface stays at `transform:none · opacity:1 · filter:blur(0)`
from frame 0, zero inline-style mutations. The user's "doesn't seem to work at all" is **literal**.
Artefact: `golden/delta-reveal-born-red.png`.

The v-reveal rows + Band-0 tokens, live (`getComputedStyle`):

```
vRevealRow:   { dataReveal: "fade", --d: "1", --i: "1", animationName: "reveal-fade-*" }  → opacity-only, no squish
rootTokens:   --motion-weight: (EMPTY) · --ease-cartoon-punch: (EMPTY)
              --spring-snappy: PRESENT · --spring-bouncy: PRESENT
              --shadow-cartoon: PRESENT ("3px 3px 0px 0px color-mix(in srgb, light-dark(...) 8%, transparent)")
liquidEnterClassExists: false   ← the .liquid-enter recipe is a genuine MINT, not duplicative
```

Every golden premise is live-true: the bloom is dead (α `TypeError`), the entrance flat-fades with no
squish, the Band-0 tokens are genuinely ABSENT (the `var(…, fallback)` discipline is honest), the
spring + cartoon-shadow tokens are PRESENT (reuse is honest), and `.liquid-enter` does not exist.

---

## 1 — The DELTA table (per artefact: KEEP / REFINE / RE-INVENT)

| Artefact | State on HEAD (source-verified) | Disposition | Why |
|---|---|---|---|
| **`useLiquidReveal`** | DEAD: `<Button ref="triggerRef">` → component instance; `useLiquidReveal.ts:167` `triggerEl.getBoundingClientRect()` throws synchronously before a frame arms. The self-scale fallback (`:165-175`) is UNREACHABLE (the instance is truthy, not null). | **RE-INVENT the wiring (engine fix), KEEP the mechanism** | The `ElementMorph`+`springTimingFunction` FLIP-inversion + 3 channels + PRM-snap are byte-correct; only the ref-resolution + arm-timing are broken. The cure is a resolver + a mount-safe arm, not a rewrite. |
| **`useBloomUp`** | Same latent α class on `source`/`dest`/`field` refs (it `getBoundingClientRect`s all three at `:303,:371,:303`). The 4th color channel + the no-mount-flash auto-prime (`flush:"pre"`) are FIT. | **REFINE** | Same `asElement` resolver; the color channel + prime + ambient-strength clamp untouched. |
| **`.glass-reveal`** (`glass/reveal.css`) | FIT as the reka closed→open overlay floor; `scale:`/`translate:` LONGHANDS, the per-mode PRM arm, the side-slide variants — all correct. Scale-only (no squish). | **KEEP** | It is correct for portals (the `data-state` transition needs a state-change a `v-if`-born-at-open surface lacks). The `.liquid-enter` recipe extends its 4-channel substrate, does not replace it. |
| **`.liquid-enter`** | ABSENT (live-confirmed: class does not exist in any stylesheet). | **MINT** | The universal mount recipe — `.glass-reveal`'s 4 channels as `@keyframes`-on-mount (fires for a `v-if`-born surface a CSS transition cannot). NEW, not duplicative. |
| **`.scroll-build` / `.scroll-cascade`** (`scroll-choreography.css`) | FIT: mount-clock `gl-page-build` (Safari-15-safe `@keyframes`) + `view()`-gated `gl-cascade-build` enhancement + the PRM reduce arm at `:111`. Fade+translateY, NO squish. | **AUGMENT IN PLACE** | EDIT `gl-page-build`/`gl-cascade-build` to add the squish leg (on the `scale:` longhand) + an opt-in `-cel` curve. **Do NOT re-target `.scroll-build > *` with a new `animation:`** (Challenge 3 R2 — that clobbers, not augments). |
| **`useStagger`** | FIT: single-timer cascade, rigid `80ms` flat delay (`--motion-stagger-default`), PRM `flushAll`. | **REFINE** | Default the delay to the 1/φ overlap (`delay ≈ settle × 0.618`). Mechanism untouched. |
| **`useStaggerReveal`** | FIT: the `NATIVE_VIEW_TIMELINE` single-writer dual-path (no double-run); IO fallback `staggerMs * idx` rigid. | **REFINE** | The IO fallback cascade adopts the 1/φ overlap; the single-writer law is KEPT verbatim. |
| **`vReveal`** | FIT as a dependency-free DOM-hook writer — BUT writes `--d` (`vReveal.ts:22`), live-confirmed. The recipe + `.scroll-build` key `--i`. | **REFINE (clean break)** | Re-key `vReveal` output `--d → --i` (one writer/one reader); the demo's scoped CSS re-points; NO `--d` alias (no-backwards-compat). The scoped `reveal-fade`/`reveal-rise` fork RETIRES → `.liquid-enter`. |
| **`useSpringMount`** | FIT: the 0→1 position spring + drag-dismiss; not a fade, not broken. | **KEEP** | The sheet/dialog mount-position kernel. Composes BELOW the entrance grammar (it owns translate-position; the recipe owns scale/fade/blur). |
| **`asElement`** | PRESENT but PRIVATE in `useDockCtaReceive.ts:170-177` (8 lines, byte-verified). | **HOIST** | To `motion/asElement.ts` — ONE authority for the whole bloom family (DRY); `useDockCtaReceive` deletes its copy + imports. |
| **`--motion-weight` / `--ease-cartoon-punch`** | ABSENT on `:root` (live). | **DEPEND-ON** | `var(…, fallback)`-gated, GREEN before the token wave lands. **Authored ONCE by `BD.W-MORPH-PUNCH-TOKENS`** (the blend-morph-engine ledger's NEW token wave) — NOT re-minted here (see §4). |
| **`--shadow-cartoon` family** | PRESENT (`shadow.css` / `dark-arm.css`); bare `--shadow-cartoon` is a single 3px stamp at 6-8%; `--shadow-cartoon-md`/`-lg` are LAYERED at 8-12%. | **REUSE — the cel cast rides `--shadow-cartoon-md`** | Challenge 3 R3: the bare token is a WHISPER for a moving cel cast; the layered `-md` is the proper 1940s-technicolor punch. |

---

## 2 — The two LOAD-BEARING recipe bugs (live-proven; the amendment MUST fix them)

The GOLDEN's architecture survives, but its §2b/§2c **code blocks** carry two bugs the three challenges
caught and I re-proved live. These are recipe-level, fixable without re-planning — but they are
born-into the amendment, so the gate must guard them.

### Bug A — the §2b BASE recipe double-scales (Challenge 2 R1 / Challenge 3 R1) — LIVE-PROVEN

The published §2b base keyframe sets, in the SAME 0% stop, BOTH `scale: 0.88` (longhand) AND
`transform: scale(1.06, 0.945)` (shorthand). These **compose** (CSS Transforms L2). Live test:

```
scale:0.88 × transform:scale(1.06,0.945)  →  computedTransform: matrix(1.06,0,0,0.945,...), scale: 0.88
  →  net rect: 93.28 × 83.16  →  area product 0.7757   (NOT ≈1 — born at 78% area, isotropically shrunk)
```

So the published base is born a plain shrink-in, the exact flat-zoom the design kills. **§7b gate point 2
(X·Y product ≈ 1) FAILS on the base recipe as written.** And worse — a keyframe `transform: scale()`
**REPLACES** a base centering `transform: translate(-50%,-50%)` (it does not compose with a base transform
of the same property): live-proven that `scale:` longhand + base `transform: translate` COEXIST
(`matrix(1,0,0,1,-50,-50)` preserved, still centered), whereas a keyframe `transform: scale()` clobbers
centering. **The squish leg must ride the `scale:` LONGHAND, never a second `transform:`** — the §4
cross-engine law the GOLDEN's own §2b code violated.

**The resolution (single transform authority, vol-preserving, centering-safe):** the base recipe drives
**ONE `scale:` longhand** that carries the squish reciprocal, and the **0.88 grace is the squish-then-
settle itself**, NOT a separate isotropic multiplier (folding 0.88 in keeps the 0.776-area shrink —
live-proven: `0.88²·1.06·0.945 = 0.776`). The pure-CSS floor is born `scale: 1.06 0.945` (vol-preserving,
product 1.002) and settles to `1 1`; the **bloom-from-small grace** comes from a coupled `translate:` rise
(the FLIP/rise leg) + the blur decongest + the fade, NOT an isotropic shrink. When a JS clock is present
(`useLiquidFlex`), `--stretch` is written live and the recipe pairs it reciprocally on the SAME `scale:`
longhand. The cel register's `gl-cel-slam` is rewritten identically: its `translateY(...) scale(...)`
splits into a `translate:` longhand + a `scale:` longhand — **NO `transform:` shorthand anywhere in
either keyframe.**

### Bug B — `.scroll-build > *` is CLOBBERED, not AUGMENTED (Challenge 3 R2) — source-verified

`.scroll-build > *` ALREADY carries `animation: gl-page-build …` (`scroll-choreography.css:88`). The §2b
code block binds a SECOND `animation: gl-liquid-enter …` to the same selector. Two `animation` shorthands
on one selector do NOT compose — last-declared wins, so one keyframe is silently destroyed.
`/display/buttons` mounts a real `.scroll-build`/`.scroll-cascade` wrapper, so this lands on a live page.

**The resolution:** honor the AUGMENT prose. EDIT `gl-page-build`/`gl-cascade-build` **in place** to add
the reciprocal-squish leg (on the `scale:` longhand, per Bug A) + the `var(--ease-cartoon-punch,…)` curve
on an opt-in `.scroll-build-cel` modifier. Bind `.liquid-enter` (the genuinely-new class) to
`gl-liquid-enter` ALONE; leave the two scroll selectors out of that rule entirely. The mount-clock floor +
`view()`-enhancement structure stays UNCHANGED — that is what "AUGMENT, not re-fork" means.

---

## 3 — The other folded challenge findings (each a gate clause, not prose)

- **β (the mount-race) is THEORETICAL, not reproduced (Challenge 1 R3).** Live, the surface was bound at
  the first rAF. **Demote the β cure to ONE mechanism** — a `watch(surface, run, { flush: "post" })`
  one-shot (it fires the instant `surface` binds, deterministic; no `nextTick`+double-rAF belt). The α
  fix (the resolver) is the load-bearing repair. The e2e adds a β arm that deliberately delays the mount
  one tick so whatever cure ships is actually guarded (the GOLDEN's §7a only exercised α).
- **The cast is UNVERIFIED on real glass + a WHISPER (Challenge 1 R2 / Challenge 3 R3).** The spike
  verified the cast on an OPAQUE `#fffaf0` card; the real `.glass-card`/`.glass-floating` is translucent +
  `backdrop-filter`-plated, and a `z-index:-1` child with a zero-spread 6-8% offset may be near-invisible.
  **Resolution:** the cel cast rides the LAYERED `--shadow-cartoon-md` (8-12%, the proper punch), and the
  cast is rendered as a SIBLING-behind / child caster whose painted ink is asserted **non-background on a
  real glass parent** (a luminance-delta readback), not `castOpacity` on a mock. Keep the static-paint
  discipline (the child's *transform* moves, the `box-shadow` never animates — the design.md §Cartoon-
  shadows `::after`-transform-not-box-shadow law).
- **The Safari π is UNCAPTURED (all three challenges; the GOLDEN's own §0 law).** "Safari-safe by
  construction" is NOT the bar. Two specific WebKit risks: (a) the HOST `filter: blur()` co-tenant with a
  resting `backdrop-filter` plate (a per-frame re-raster on a backdrop-filtered box — the WebKit reblur
  hole) — measure the decongest window over a real `.glass-floating` in WebKit; (b) `linear()` < Safari
  17.2 unparses → the `animation` timing falls to `ease`, killing the overshoot — add an
  `@supports (animation-timing-function: linear(0,1))` cubic-bezier floor. **The gate is RED-provable on
  HEAD but only GREEN-callable with the paired Chromium+WebKit capture.**
- **The spike's springs were TRUNCATED (Challenge 1 R1).** The spike inlined the 21-stop `--spring-snappy`;
  the shipped token is 48-stop (peak values match — `1.03150@18.367%` / bouncy `1.09341@16.327%` —
  confirmed live, only the settle tail differs). The §7e punch-in-the-STOPS finding stands (the peak is
  preserved), but the spike must `@import` or inline the real 48-stop curve + re-run `__probe()` before
  "verbatim" is honest, and the BASE (non-cel) recipe must be added to the spike (it only built `.is-cel`).
- **`useStagger`/`useStaggerReveal` STAY two composables (GOLDEN §2e).** Both are fit; the 1/φ overlap is
  the shared default. A merge is an OPTIONAL follow-on, NOT a precondition (DRY does not demand merging two
  working composables on a deadline).
- **The 1/φ overlap keys off the REGISTER's own duration (Challenge 1 R5).** `--lq-enter-step` reads
  `var(--lq-enter-duration, var(--spring-snappy-duration))` set per-register, so the "overlap at 62%"
  holds on the cel/bouncy clock too — not hardcoded to the snappy duration.
- **High-radius/pill squish reads as an ellipse-corner (Challenge 2 R5).** Cap the reciprocal further on
  `rounded-pill` (≤ 1.03, not the 1.08 gel cap) or drive the squish via a non-rounded wrapper. A gate
  frame on a `rounded-pill .liquid-enter` asserts the corner-radius read.

---

## 4 — The UNION path (deft integration — precisely how to evolve current → golden)

ONE entrance grammar (four coupled channels on one spring clock), THREE orchestration registers
(MOUNT / SCROLL / TRIGGER), ONE squish engine (`useLiquidFlex`), ONE spring family (`SPRING_PRESETS`),
ONE resolver (hoisted `asElement`), ONE governor (`--motion-weight`).

1. **HOIST `asElement`** → `src/composables/motion/asElement.ts` (8 lines, lifted verbatim);
   `useDockCtaReceive` deletes its private copy + imports. ONE authority for the bloom family.
2. **FIX `useLiquidReveal` (α + β):** widen `trigger`/`surface`/`dest` to
   `Ref<HTMLElement | ComponentPublicInstance | null>`; resolve through `asElement`; the unreachable
   self-scale fallback becomes reachable. Add `revealWhenReady()` = a `watch(surface, run, {flush:"post"})`
   one-shot (β, demoted to ONE mechanism). The demo re-points its bare rAF → `revealWhenReady()`. Add the
   `useLiquidFlex` `--motion-weight`-scaled squish on the FLIP travel axis. `useBloomUp` gets the SAME
   `asElement` on its three refs.
3. **MINT `.liquid-enter`** (`src/styles/glass/liquid-enter.css`): `.glass-reveal`'s 4 channels as a mount
   `@keyframes` — base (2-stop squish-grow on `--spring-snappy`, the GREEN-now floor) + `.is-cel` (3-stop
   `gl-cel-slam`, the punch in explicit STOPS). **ALL squish on the `scale:` longhand + rise on `translate:`
   — NO `transform:` shorthand** (Bug A). The PRM arm (fade-only) + the `@supports (linear())` cubic floor.
4. **AUGMENT `.scroll-build`/`.scroll-cascade` IN PLACE** — edit `gl-page-build`/`gl-cascade-build` to add
   the `scale:`-longhand squish leg + the `-cel` curve modifier; **never re-target the selectors with a new
   `animation:`** (Bug B).
5. **REFINE the stagger family:** `useStagger` + `useStaggerReveal` IO-fallback default to the 1/φ overlap
   keyed off the register's own duration; the `NATIVE_VIEW_TIMELINE` single-writer law KEPT.
6. **REFINE `vReveal` `--d → --i`** (clean break, no alias); the demo's scoped `reveal-fade`/`reveal-rise`
   keyframes RETIRE → `.liquid-enter` + `--i`. The flat fade dies.
7. **The cel cast** rides `--shadow-cartoon-md` (layered punch) on a child caster (transform moves, the
   box-shadow is static), opt-in `.is-cel`, capped to hero/headline surfaces (Challenge 2 R4 perf cap).

**Token dependency — NO re-mint.** `--motion-weight` / `--ease-cartoon-punch` are authored ONCE by the
NEW `BD.W-MORPH-PUNCH-TOKENS` (named in the blend-morph-engine ledger row, not yet on disk — the SAME
phantom-token problem that row already caught). The entrance-reveal waves **depend-on** it via
`var(…, fallback)` and are GREEN before it lands. This is the load-bearing no-duplicative-work reconcile:
the entrance system does NOT mint its own punch tokens.

**Mints:** `motion/asElement.ts`, `glass/liquid-enter.css`, `revealWhenReady()`, the cel child caster,
`tests-visual/liquid-reveal.spec.ts`. **No new spring family, no second squish engine, no JS scroll
runtime, no parallel fork.**

---

## 5 — Convergence

**~88%.** The architecture is FIT and live-verified (one grammar / three registers / hoisted resolver /
the cross-engine-floor-not-fallback inversion). The dead bloom (α) is the ONE genuine RE-INVENT (of the
wiring, not the mechanism); everything else REFINES or AUGMENTS shipped primitives. The remaining ~12% is
BUILD-TIME: (a) re-author the recipe code with the `scale:`-longhand single-authority squish (Bug A) +
the in-place scroll-keyframe edit (Bug B); (b) the `--d→--i` clean break + demo re-point; (c) the cast on
`--shadow-cartoon-md` proven on real glass; (d) the demoted-to-one-mechanism β + its e2e arm; (e) the
paired Chromium+WebKit capture + the `@supports(linear())` floor; (f) the token depend-on wired to
`BD.W-MORPH-PUNCH-TOKENS`. All are gated, born-RED, and user-gated to execute.
