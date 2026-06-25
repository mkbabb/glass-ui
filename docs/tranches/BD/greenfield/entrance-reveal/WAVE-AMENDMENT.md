# WAVE-AMENDMENT — the ENTRANCE + REVEAL motion system

> The CONCRETE tranche amendment reconciled against the extant 116-wave union set
> (`docs/tranches/BD/union/waves/`). Reference implementation: `GOLDEN.md` (the three challenges
> FOLDED). Each amended/new wave references the GOLDEN + carries a real born-RED gate. NO duplicative
> work — the two named waves already exist and OWN this scope; this amendment SHARPENS them with the
> live-proven root-cause + the recipe-bug fixes + the token-depend-on reconcile. No new wave is needed
> for the core; ONE optional follow-on is noted.

---

## Reconcile summary (disposition by wave)

| Wave (filename) | Disposition | What changes |
|---|---|---|
| `W-LIQUID-REVEAL-FIX.md` | **AUGMENT** | Promote root-cause from "likely the ref class" to the PROVEN dual defect (α component-ref crash + β mount-race) with the live captured DELTA; add `asElement` HOIST; **demote β to ONE mechanism**; widen the resolver to `surface`/`dest`/`useBloomUp`; sharpen the gate to born-RED on α + a β-isolation arm. |
| `W-LIQUID-ENTRANCE-GENERAL.md` | **AUGMENT** | Add the `.liquid-enter` universal mount recipe (the four channels as `@keyframes`-on-mount) + the squish-on-`scale:`-LONGHAND single-authority fix (Bug A) + the in-place `.scroll-build`/`.scroll-cascade` edit (Bug B) + the `vReveal` `--d→--i` clean break + the cel cast on `--shadow-cartoon-md` + the token depend-on. The existing P7-law/`proof:liquid-weight-law` content is KEPT; this adds the entrance-recipe instance the law was missing. |
| `BD.W-MORPH-PUNCH-TOKENS` (NEW, named in the blend-morph-engine ledger row, not yet on disk) | **DEPEND-ON (do NOT re-author)** | The SOLE authority for `--motion-weight` + `--ease-cartoon-punch`. The entrance waves consume via `var(…, fallback)`. If that wave is authored by the blend-morph track first, this amendment references it; if not yet, the entrance fallbacks ship GREEN regardless. |
| `BD.W-FLIP-SPINE.md` | **CROSS-LINK** | The FLIP/source-rect runner (`useElementBloom`/`ElementMorph`) the reveal composes; the `asElement` hoist is the shared resolver both consume. No content change here — a reference so the two don't re-fork the resolver. |
| `W-STORY-PAGE-STANDARD.md` | **CROSS-LINK** | Already cites W-LIQUID-ENTRANCE-GENERAL for the sub-card entrance; the sub-cards adopt `.liquid-enter` + `--i`. No edit beyond the existing dependency. |
| `W-SCROLL-FLUIDITY.md` / `BD.W-SCROLL-MINIMIZE.md` | **CROSS-LINK** | The `.scroll-build`/`.scroll-cascade` augment is shared; the scroll-fluidity wave threads the same in-place keyframe edit (no second edit). |
| every other wave | **NO CHANGE** | Nothing pruned, nothing excised. |

**Net: 2 AUGMENT (existing) + 1 DEPEND-ON (cross-track NEW) + cross-links. ZERO new entrance wave, ZERO
prune. One OPTIONAL follow-on (the `useStagger` consolidation) is booked, not required.**

---

## AMENDMENT 1 — `W-LIQUID-REVEAL-FIX.md` (AUGMENT)

### Why augment, not replace
The wave already owns §2a of the GOLDEN (the α+β repair + the e2e gap). The current wave text hedges the
root-cause ("the LIKELY root cause … to confirm live"). The DELTA-ASSAY PROVED it live — print the
proven cause + the captured DELTA, fold the four challenge fixes, and harden the gate.

### Concrete edits
1. **Replace the "likely root cause" section** with the PROVEN dual defect (cite `DELTA-ASSAY.md §0`):
   - **α — component-ref crash.** `reveal.vue:84` `<Button ref="triggerRef">` → reka `Primitive`
     ComponentPublicInstance (Button does not `defineExpose` `$el`). `useLiquidReveal.ts:167`
     `triggerEl.getBoundingClientRect()` throws synchronously. Live: `TypeError`, surface
     `transform:none·opacity:1·filter:blur(0)` across all sampled frames, 0 inline-style mutations. The
     self-scale fallback (`:165-175`) is UNREACHABLE (the instance is truthy, not null).
   - **β — mount-race (THEORETICAL, not reproduced — Challenge 1 R3).** Demote the cure to **ONE**
     mechanism: `revealWhenReady()` = `watch(surface, run, { flush: "post" })` one-shot (fires the instant
     `surface` binds; deterministic). DROP the `nextTick`+double-rAF belt.
2. **The fix (cite GOLDEN §2a):**
   - HOIST `asElement` → `src/composables/motion/asElement.ts` (8 lines, verbatim from
     `useDockCtaReceive.ts:170-177`); `useDockCtaReceive` deletes its copy + imports the shared one (ONE
     authority — DRY).
   - Widen `useLiquidReveal`'s `trigger` + `surface` (and `useBloomUp`'s `source`/`dest`/`field`) to
     `Ref<HTMLElement | ComponentPublicInstance | null>`; resolve every rect read through `asElement` (the
     unreachable self-scale fallback becomes reachable for a genuinely-null ref). **No-backwards-compat
     break: the public ref type widens** (call it out; the demo's `HTMLElement` refs still type-check).
   - Add `revealWhenReady()`; the demo re-points its bare `requestAnimationFrame(() => reveal())` → it.
   - Add the `useLiquidFlex` `--motion-weight`-scaled squish on the FLIP travel axis (cap 1.08, PRM-off);
     the 3 existing channels + compositor-only + PRM-snap floors KEPT byte-for-byte.

### The gate (born-RED on HEAD) — `tests-visual/liquid-reveal.spec.ts` (Playwright, paired-engine)
- **R-α (RED on HEAD):** drive the real "Bloom from here" click; assert ZERO `pageerror` (HEAD throws the
  `TypeError`) AND `.glass-reveal` computed `transform !== "none"` for ≥1 mid-flight frame (HEAD is
  `none` all frames) AND `filter` transits `blur(N)→blur(0)` AND settles `{transform:none, opacity:1,
  filter:blur(0px)}`.
- **R-β (RED on a mount-delayed build):** mount with `surface` deliberately delayed one tick; assert the
  bloom still fires once it binds (guards the cure the GOLDEN's §7a left untested).
- **R-PRM:** under `prefers-reduced-motion: reduce` the bloom SNAPS (no transform/blur frames, opacity 1).
- **Paired engine:** Chromium + WebKit, both modes — the capture is the DELTA artefact, NOT a
  commit-message claim (the [[Live-verify capture]] law). The `@supports(animation-timing-function:
  linear(0,1))` cubic floor is asserted present (Challenge 2 R3 — `linear()` < Safari 17.2).

**What reds on HEAD:** R-α (the `TypeError` + the dead surface — live-confirmed), R-β (no mount-safe arm).

---

## AMENDMENT 2 — `W-LIQUID-ENTRANCE-GENERAL.md` (AUGMENT)

### Why augment, not replace
The wave codifies the P7 universal-liquid-weight LAW + `proof:liquid-weight-law` + the `liquid-weight`
gestalt lens — that content is FIT and STAYS. What it lacks is the **entrance RECIPE instance** the law
points at: the universal `.liquid-enter` mount grammar + the squish channel. Add it as the recipe the law
governs, with the two recipe-bug fixes the challenges caught.

### Concrete edits
1. **MINT `.liquid-enter`** (`src/styles/glass/liquid-enter.css`, cite GOLDEN §1/§2b) — `.glass-reveal`'s
   four channels (SPATIAL bloom + SQUISH + fade + decongest) as a mount `@keyframes` (fires for a
   `v-if`-born-at-open surface a CSS transition cannot). Two registers:
   - **BASE** (the GREEN-now floor): a 2-stop squish-grow on `--spring-snappy`. **BUG-A FIX (load-bearing,
     live-proven):** the squish rides the **`scale:` LONGHAND** carrying the reciprocal (`scale: 1.06
     0.945 → 1 1`, vol-preserving, product 1.002), the rise rides the **`translate:` LONGHAND** — **NO
     `transform:` shorthand** (a keyframe `transform:scale()` clobbers a base centering
     `transform:translate(-50%,-50%)` AND double-scales with a separate `scale:` longhand → born at 78%
     area; both live-proven, `DELTA-ASSAY §2 Bug A`). The 0.88 grace comes from the translate-rise + blur +
     fade, NOT an isotropic shrink. When a JS clock is present, `--stretch` is paired reciprocally on the
     SAME `scale:` longhand (`useLiquidFlex` — the ONE squish engine).
   - **CEL** (`.is-cel`, opt-in, Band-0 upgrade): the 3-stop `gl-cel-slam` — the punch lives in explicit
     STOPS (GOLDEN §7e), `--motion-weight`-scaled, `var(--ease-cartoon-punch, var(--spring-bouncy))` floor.
     Same `scale:`/`translate:` longhand discipline (NO `transform:` shorthand). The PRM arm (fade-only,
     the `scroll-choreography.css:111` precedent) + the `@supports(animation-timing-function: linear(0,1))`
     cubic-bezier floor (Challenge 2 R3).
2. **AUGMENT `.scroll-build`/`.scroll-cascade` IN PLACE** (cite GOLDEN §2b + `DELTA-ASSAY §2 Bug B`) — EDIT
   `gl-page-build`/`gl-cascade-build` keyframes to add the `scale:`-longhand reciprocal-squish leg + the
   `var(--ease-cartoon-punch,…)` curve on an opt-in `.scroll-build-cel`/`-cel` modifier. **Do NOT
   re-target `.scroll-build > *` with a new `animation:`** (it already carries `gl-page-build`
   `:88` — a second shorthand clobbers, not augments; `/display/buttons` mounts a live `.scroll-build`).
   The mount-clock floor + `view()`-enhancement structure UNCHANGED.
3. **REFINE `vReveal` `--d → --i`** (clean break, cite Challenge 2 R2) — `vReveal.ts:22` writes `--d`; the
   recipe + `.scroll-build` key `--i`. Re-key the directive output to `--i`; update the demo's scoped CSS
   (`reveal.vue:112` reads `--d`); NO `--d` alias (no-backwards-compat). The demo's scoped
   `reveal-fade`/`reveal-rise` keyframes RETIRE → `.liquid-enter` + `--i`. The flat fade dies.
4. **REFINE the stagger 1/φ overlap** — `useStagger` + `useStaggerReveal`'s IO fallback default to
   `delay ≈ settle × (1/φ)` keyed off **the register's own duration**
   (`var(--lq-enter-duration, var(--spring-snappy-duration))`, Challenge 1 R5), so the overlap holds on the
   cel/bouncy clock. The `NATIVE_VIEW_TIMELINE` single-writer law KEPT.
5. **The cel cast on `--shadow-cartoon-md`** (cite Challenge 3 R3 + design.md §Cartoon-shadows) — a child
   caster layer carrying the LAYERED `--shadow-cartoon-md` (8-12%, the proper 1940s punch — NOT the bare
   6-8% whisper), its TRANSFORM on a `+6ms·--motion-weight`-late clock (the box-shadow static-painted,
   never animated — the WebKit hole + the design.md `::after`-transform-not-box-shadow law). Capped to
   HERO/headline surfaces (Challenge 2 R4 perf cap — ≤ small N per viewport; no global `.is-cel`).
6. **Token DEPEND-ON (NO re-mint)** — `--motion-weight` / `--ease-cartoon-punch` consumed via
   `var(…, fallback)`; authored ONCE by `BD.W-MORPH-PUNCH-TOKENS` (the blend-morph-engine ledger's NEW
   token wave). The entrance recipe ships GREEN on the bouncy/snappy floor before that wave lands.

### The gate (born-RED) — extend `proof:liquid-weight-law` + a paint-arm π readback
The existing `proof:liquid-weight-law` L1-L6 STAYS. Add the entrance-recipe arm (cite GOLDEN §7b/§7c):
- **E1 (born-RED — the squish fired):** a fresh-mounted `.liquid-enter` (and a `.scroll-build` row)
  samples computed `scale`/`transform` mid-flight; assert `scale ≠ 1` for ≥1 frame (RED on a flat
  entrance) AND the X·Y product of the `scale:` longhand ≈ 1 (vol-preserving — RED on the §2b
  double-scale-as-published, area 0.776) AND `scale` overshoots past 1 then settles AND `filter` transits
  `blur(N)→blur(0)`.
- **E2 (born-RED — centering survives, Bug A):** a CENTERED `.liquid-enter` surface
  (`transform: translate(-50%,-50%)`) keeps its centering across the entrance (RED if a `transform:`
  shorthand keyframe clobbers it — the centering jumps to the corner).
- **E3 (born-RED — no clobber, Bug B):** `.scroll-build > *` retains its `gl-page-build` build (RED if a
  second `animation` shorthand destroyed it).
- **E4 (born-RED — the `--i` reconcile):** a `v-reveal="3"` row resolves
  `getComputedStyle().getPropertyValue('--i') === '3'` (RED on HEAD — `vReveal` writes `--d`).
- **E5 (cel, post-Band-0):** the `gl-cel-slam` born-wide-flat (`sx<0.94 && sy>1.02`) + punch-stretch-up
  (`sx>1.045`) + the cast's painted ink at peak is a luminance-delta ABOVE the resting card shadow on a
  REAL `.glass-card` parent (Challenge 1 R2 / Challenge 3 R3 — measured on glass, not a mock).
- **E-PRM:** under reduce, `scale`/`transform`/`filter` stay none, opacity-only.
- **Paired engine (Chromium + WebKit, both modes):** the HOST `filter: blur()` decongest over a real
  `.glass-floating` backdrop plate asserts NO edge-halo / plate re-sample in WebKit (Challenge 2 R3 /
  Challenge 1 R4); the `@supports(linear())` cubic floor present.

**What reds on HEAD:** E4 (`--d` not `--i` — live-confirmed), E1/E2/E3 (the `.liquid-enter` recipe is
ABSENT — live-confirmed `liquidEnterClassExists:false`; the scroll keyframes carry no squish).

---

## OPTIONAL FOLLOW-ON (booked, NOT required for close)

`useStagger` + `useStaggerReveal` consolidation into one `useStagger(gate:'none'|'io'|'time')` — a DRY
refactor of two FIT composables. The GOLDEN explicitly rules this a follow-on, not a precondition (both
work; the 1/φ default is the shared win). Not a blocker; book under a future motion-DRY wave.

---

## No-duplicative-work ledger (vs the 116-wave set)

- **NO new entrance wave** — the two named waves OWN the scope; this amendment sharpens them.
- **NO re-mint of the punch tokens** — `BD.W-MORPH-PUNCH-TOKENS` is the single authority (the
  blend-morph-engine row already caught the phantom-`BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH` problem; the
  entrance recipe depends-on, never re-authors).
- **NO second resolver** — `asElement` is hoisted ONCE; `useDockCtaReceive` + the reveal family + the
  FLIP spine (`BD.W-FLIP-SPINE`) all import it.
- **NO second squish engine** — `useLiquidFlex` is the ONE engine (the W-LIQUID fence).
- **NO scroll re-fork** — the `.scroll-build`/`.scroll-cascade` augment is IN-PLACE; the
  `view()`-enhancement + mount-clock floor structure is byte-untouched.
- **NOTHING pruned or excised.**
