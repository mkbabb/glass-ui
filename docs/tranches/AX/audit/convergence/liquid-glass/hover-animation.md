# Liquid-glass overhaul (D19) — lane: hover-animation-tuning

**Scope** (a) the specular HOVER lift, (b) the general BUTTON hover smoothness, (c) the
library-wide animation timing/easing system. SOURCE diagnosis + gestalt design + the exact
LIVE checks for the orchestrator. NO browser here — every magnitude claim is source-grounded;
the orchestrator does the visual-truth pass.

HEAD = 3.8.0. Files in scope: `src/styles/glass.css`, `src/styles/utilities.css`,
`src/styles/tokens.css`, `src/styles/transitions.css`, `src/styles/animations.css`,
`src/components/ui/button/index.ts`.

---

## TL;DR — the three findings

1. **The specular HOVER is egregious because the gradient CORE alpha is too hot AND it is
   `screen`-blended.** The intensity ladder (rest 0 / hover 0.22 / active 0.32) is fine in
   isolation, but it multiplies a `radial-gradient(… hsl(40 30% 96% / 0.22) 0%, … / 0.08 22%…)`
   core under `mix-blend-mode: screen`. `screen` is a NON-LINEAR lightening blend: it can only
   add light, never darken, so even a 0.22-opacity warm-cream wash over a busy/mid backdrop reads
   as a visible central bloom — the "muddy, washed-out" tell. The fix is (i) drop the gradient
   CORE alphas, (ii) tighten the radial FALLOFF so the lens is a small specular catch-light not a
   surface-wide wash, and (iii) reconsider `screen` → a gentler compositing. The hover-intensity
   token cohort then becomes a fine-tune, not the primary lever.

2. **The button hover is "not smooth" because the color/border legs and the scale leg run on
   DIFFERENT clocks and the scale magnitude is large.** `.btn-pill` transitions
   background/border/color/shadow/transform all on `--duration-fast` (0.2s) `--ease-standard`,
   but `primary-audacious`/`gold-audacious`/`btn-interactive` add a `hover:scale-[1.08]` (the
   `--scale-hover` token = **1.08**, an 8% jump) that has NO spring channel on the button base —
   it snaps on `--ease-standard`. 1.08 is a large lift for a CTA, and a linear-ish ease on a
   scale reads as mechanical. Smooth = a SMALLER hover scale on a spring channel
   (`--spring-smooth`/`--spring-gentle`), color legs staying on the bezier.

3. **The animation TIMING system is already well-tokenized — the gap is COHERENCE, not drift.**
   Almost zero hardcoded `ms`/`cubic-bezier()` in the style sheets (the handful of hits are
   comments or vaul-vue-owned). The real issue: there is no documented rule for WHICH easing a
   given transition should use. `--ease-standard` (the cubic-bezier workhorse) carries 37 sites
   in `utilities.css`; the `--spring-*` registers are used ad-hoc. A coherent
   "surface-props → bezier, transform/enter → spring" doctrine + a couple of state-paired
   duration tokens closes it.

---

## (a) The specular HOVER — egregious diagnosis

### What paints, exactly

`glass.css:80-141` — the unified `.glass-material::before` (the `.glass-*` ladder +
`.glass-card` + `.glass-specular-track` + `.dock-icon-button` group). At HEAD:

```css
/* the catch-light layer */
background: radial-gradient(
    circle at var(--specular-x, 50%) var(--specular-y, 50%),
    hsl(40 30% 96% / 0.22) 0%,      /* CORE — warm-cream, 0.22α */
    hsl(40 30% 96% / 0.08) 22%,     /* MID  — 0.08α out to 22% */
    transparent 55%                  /* falloff to nothing at 55% */
);
opacity: var(--specular-intensity, 0);   /* rest 0 / hover 0.22 / active 0.32 */
mask-image: radial-gradient(circle …, black 0%, black 55%, transparent 75%);
mix-blend-mode: screen;
```

Intensity cohort (`tokens.css:1824-1835`): rest 0, hover 0.22, active 0.32 (dark 0.18/0.26).

### Why it reads as a bloom (root cause, source-true)

There are TWO multiplicative magnitudes and a non-linear blend stacking:

1. **The gradient CORE itself is 0.22α** (`hsl(40 30% 96% / 0.22)` at stop 0%). This is the
   per-stop alpha, present BEFORE the layer `opacity` is applied. So at hover, the effective
   peak = core-α (0.22) × layer-opacity (0.22) ≈ 0.048 of warm-cream — but it is **screened**,
   and `screen` lightens disproportionately over mid-tone backdrops. Over the busy aurora /
   the cream card the central stop lifts the whole region under the cursor toward white.

2. **The radial falls off SLOWLY** — the core stays near-full to 22%, only reaching transparent
   at 55%. On a card that is a LARGE soft disc covering roughly the central third of the plate,
   not a tight specular highlight. A real glass catch-light is a SMALL bright point that defines
   curvature (the W09 charter language: "rim/normal-driven highlight, not a flat bloom"). The
   current radius makes it a wash. THIS is the "large diffuse central radial bloom washes out the
   whole surface" the user reports verbatim.

3. **`mix-blend-mode: screen`** is the multiplier that turns a low-alpha overlay into a visible
   bloom. `screen` = `1 − (1−a)(1−b)` per channel — it ONLY brightens, and brightens MOST over
   mid-luminance backdrops (exactly the speedtest card / aurora case). The comment at
   `glass.css:152-156` already concedes "the screen blend lifts harder on dark" and softens the
   dark arm — but the LIGHT arm over a mid-tone card has the same problem and was not softened.

### The consumer escalation (why the speedtest card is worst)

`Card.vue:91-99` — `specular="full"` overrides the cohort LOCALLY to **rest 0.08 / hover 0.45 /
active 0.6**. If the speedtest card (a separate-repo consumer) passes `specular="full"` (the
"busy-backdrop" register the recipe was authored over), the bloom runs at 0.45-0.6 layer-opacity
over the 0.22-core screen gradient — a genuine blowout. Even if it passes `subtle`, the LIGHT-arm
screen problem above stands. The `full` rung is the loudest path and should be retuned DOWN or
retired (it predates the W09 subtle ladder and is an over-bright relic — see design below).

### Gestalt fix (token-first, Safari-safe, no patch)

The mechanism is correct (one moving specular, one token cohort); the MAGNITUDES + the
falloff + the blend are wrong. Four coordinated moves, all on the existing cascade:

1. **Drop the gradient CORE alphas and TIGHTEN the falloff** so the lens is a small catch-light,
   not a surface wash. Re-author the `.glass-material::before` background to something like a
   `~0.14α` core, a much earlier transparent stop (the bright region ≈ the inner 15-20%, fully
   transparent by ~40-45%), so the painted disc is a compact specular, not a third-of-the-card
   bloom. Keep `hsl(40 30% 96%)` (L<100% warm-cream — the W09 fix; do NOT regress to pure white).
   The mask radii follow the gradient down.

2. **Reconsider `screen`.** `screen` is the bloom amplifier. Options, in order of preference:
   - **`plus-lighter`** (additive, clamped) reads as a truer specular than `screen` and does NOT
     over-lift mid-tones — but check Safari support (it is supported in WebKit as `plus-lighter`
     since Safari 16, used by iOS itself for specular). **LIVE-CHECK REQUIRED.**
   - **`soft-light`** — gentler, content-aware lift; the `.dark` grain `::after` already uses it.
     Safari-safe.
   - **Keep `screen` but halve the core α** — the conservative fallback if the blends regress.

   Whatever the choice, it MUST be Safari-verified (screen/overlay/plus-lighter have WebKit
   quirks — this is the hard constraint). Recommend authoring it so a non-supporting engine
   degrades to a plain low-alpha overlay (no blend) rather than a blowout.

3. **Re-baseline the hover/active cohort to a whisper.** With a tighter+dimmer core the layer
   opacity can stay near today's 0.22/0.32, but recommend nudging hover DOWN (≈ 0.14-0.18) so
   the combined (core × opacity × blend) peak is a subtle lens. The cohort is ALREADY the
   overridable knob (`tokens.css:1824`) — this is a value edit, not a mechanism change.

4. **Retire or retune `specular="full"`.** The `full` rung (Card.vue rest 0.08 / hover 0.45 /
   active 0.6) is the W09-era "busy backdrop" relic and the loudest blowout path. Either delete
   the `full` case (clean break — `off`/`subtle` is the whole vocabulary) or retune it to no more
   than a modest step above `subtle`. The speedtest card should read `specular="subtle"` (or
   `off` for a pure data card — the §24 three-consumer default).

**Why this is gestalt not patch:** it does not add a mechanism or a prop. It re-derives the
catch-light GEOMETRY (compact, not wash), fixes the BLEND (the bloom amplifier), and keeps every
magnitude on the existing token cohort + the existing `CardSpecular` vocabulary (minus the
over-bright `full` rung). One specular owner, one token ladder, Safari-safe blend.

---

## (b) The general BUTTON hover — "not smooth"

### What runs, exactly

- `buttonVariants` base (`button/index.ts:22`): `btn-pill tap-squish focus-ring …
  active:scale-[var(--scale-press-btn)]` (press = 0.97).
- `.btn-pill` (`utilities.css:445-459`): transitions background-color, border-color, box-shadow,
  color, opacity, **transform** — ALL on `--duration-fast` (0.2s) `--ease-standard`
  (cubic-bezier(0.4,0,0.2,1)).
- `.tap-squish` (`utilities.css:206-211`): `transition: scale --duration-fast --spring-snappy`
  — so the PRESS scale springs.
- Hover scale: only `primary-audacious`/`gold-audacious` carry `hover:scale-[var(--scale-hover)]`
  (= **1.08**). The base/default/glass/etc variants have NO hover scale — they only shift
  bg/border/color. The `btn-interactive` opt-in utility (`utilities.css:1013`) adds
  `&:hover { scale: var(--scale-hover) }` on `--duration-fast --ease-standard`.

### Why it is not smooth (three source-true reasons)

1. **The hover scale snaps on a bezier, the press scale springs.** `.tap-squish` puts the PRESS
   on `--spring-snappy`, but the HOVER scale (`primary-audacious`, `btn-interactive`) rides
   `--duration-fast --ease-standard` — a plain cubic-bezier. So press feels alive and hover feels
   mechanical: the two halves of the same control speak different motion languages. The W05 charter
   ("ONE iOS-spring vocabulary") is satisfied for press but NOT for hover.

2. **`--scale-hover` = 1.08 is a large lift.** An 8% scale-up on a button is emphatic — fine for
   a marquee CTA, jarring as the general hover. Combined with a non-spring ease it reads as a
   "pop" rather than a "lift". (The dock uses 1.1 — `--scale-hover-dock` — but the dock control is
   a small icon where a bigger lift reads proportionally smaller; a full-width button at 1.08 is a
   lot of travel.)

3. **`transform` is in the `.btn-pill` transition list but the variants animate `scale` (the
   longhand).** `.btn-pill` lists `transform var(--duration-fast)…` (line 458) yet the hover/press
   use `scale:` (the individual transform longhand, per the AQ.W3 identity-base discipline). The
   `transform` entry in `.btn-pill` is DEAD for these — the `scale` transition comes from
   `.tap-squish` (press) and the inline `hover:scale-[…]` utility (hover, which has no transition
   of its own, so it falls back to whatever `scale` transition is in scope = `.tap-squish`'s
   `--spring-snappy`, OR none). This is a latent ambiguity: the hover-scale's actual easing
   depends on cascade-order resolution of the `scale` transition property, not an explicit
   declaration. Worth making explicit.

### Gestalt fix (token-resolved, GPU-friendly, no layout)

1. **Add a softer hover-scale token and put hover on a spring.** Introduce
   `--scale-hover-btn` (≈ **1.03-1.04**, a restrained lift) and route the button hover scale
   through a `--spring-smooth` (ζ=0.86, sub-perceptual overshoot — a clean settle, not a bounce)
   or `--spring-gentle` channel. This makes hover SMOOTH (springs to rest) and SUBTLE (small
   travel). Authoring shape: a single transition declaration on the button base that transitions
   `scale` on `--spring-smooth` so BOTH hover and the `.tap-squish` press are explicit and
   coherent (press keeps `--spring-snappy` via `.tap-squish` specificity, or unify both to
   `--spring-smooth` for one register).

2. **Keep the surface legs (bg/border/color/shadow) on `--duration-fast --ease-standard`.**
   These are the right register for a color cross-fade — a bezier, not a spring (a spring on a
   color reads as a wobble). Only the TRANSFORM legs (scale) want the spring. This is the
   doctrine in (c) below: surface-props → bezier, transform → spring.

3. **GPU-friendly already — keep it that way.** `scale`/`opacity` are compositor properties (no
   layout). The hover does NOT animate width/height/margin (good). The only caution:
   `box-shadow` IS in the transition list and is a paint-bound property — for a smooth hover the
   shadow leg is acceptable at this scale, but if a future audit wants max smoothness the shadow
   crossfade could move to an opacity-faded `::after` shadow layer (out of scope here; note only).

4. **Reconsider the universal hover scale on non-CTA buttons.** Most variants have NO hover scale
   today (only the audacious pair + the opt-in `btn-interactive`). That is arguably correct — a
   resting `default`/`secondary` button lifting on hover can feel busy. Recommend: keep the
   subtle hover scale OPT-IN (the audacious CTAs + `btn-interactive`), but make the lift that
   does fire smooth+small per (1). Do NOT add hover scale to every variant.

---

## (c) Animation timing — the coherence pass

### State of the world (good news first)

The token system is sound. `tokens.css §1` durations: instant 0.1s / fast 0.2s / normal 0.3s /
slow 0.45s / panel 0.55s + the named motion-duration cluster. `§2` easings: the regen'd
`--spring-{smooth,snappy,bouncy,gentle,dock}` `linear()` curves (analytic damped-oscillator,
single source of truth via `scripts/regen-spring-tokens.mjs`) + the cubic-bezier core
(`--ease-{standard,out,in,out-expo}`). NEAR-ZERO hardcoded `ms`/`cubic-bezier()` in the sheets
(the grep hits are comments or vaul-vue's owned `.5s cubic-bezier(.32,.72,0,1)`). The W05 wave
already excised the legacy apple-spring bezier and converged the `--spring-*` vocab.

### The actual gap — NO doctrine for WHICH easing

There is no recorded rule for when to use a spring vs a bezier, or which duration pairs with
which state. Evidence of incoherence:

- `.btn-pill` transitions `transform` on `--ease-standard` (bezier) but `.tap-squish` springs the
  same `scale` — two answers for the same property on the same element (see (b)).
- `.glass-btn` (`glass.css:408-413`) springs its scale on `--spring-snappy` but `.btn-pill`
  beziers its transform — two glass-button recipes, two scale easings.
- `transitions.css` is internally coherent (enter = spring, exit = bezier — the right idiom) but
  that idiom is NOWHERE written down as the house rule, so new recipes don't follow it.
- `--ease-apple` (cubic-bezier(0.25,0.1,0.25,1)) still exists (`tokens.css:180`) and is consumed
  by the ambient-pulse easing — a SECOND smooth-ease authority beside `--spring-smooth`. Minor,
  but it is the kind of dual-authority W05 set out to kill.

### Recommended doctrine (token-resolved, no new primitives)

Adopt and RECORD (in `tokens.css §2` header + CLAUDE.md) one rule:

| Transition kind | Easing | Duration |
|---|---|---|
| Surface props (bg, border, color, box-shadow, opacity) | `--ease-standard` (bezier) | `--duration-fast` |
| Transform — hover/press/active (scale, translate, rotate) | `--spring-smooth` (settle) or `--spring-snappy` (crisp press) | `--duration-fast`/`--duration-normal` |
| Enter (mount, popover open, dialog in) | `--spring-bouncy`/`--spring-snappy` | `--duration-normal`/`--duration-slow` |
| Exit (unmount, close) | `--ease-out`/`--ease-standard` (bezier, NO overshoot) | `--duration-fast` |
| Position-tracked (specular pointer follow) | `--ease-standard` | `--duration-fast` |

Rationale: springs read alive on TRANSFORM and ENTER (where overshoot = physicality); a spring on
a COLOR or on an EXIT reads as a wobble/hesitation (you never want an exit to overshoot past gone).
This is exactly the `transitions.css` idiom — formalize it.

Concrete cleanups this doctrine drives (all token-only, no mechanism):

1. **Unify the button scale easing** — pick `--spring-smooth` for hover, `--spring-snappy` for
   press (or one register for both); make it explicit on the button base, retire the dead
   `transform` entry in `.btn-pill`'s list (the longhand `scale` is what animates).
2. **Reconcile `.glass-btn` ↔ `.btn-pill` scale easing** onto one register.
3. **Fold `--ease-apple` onto `--spring-smooth`** (or document it as the ambient-only register) —
   close the last dual-smooth-ease authority.
4. **Add two state-paired duration aliases if useful** — e.g. keep using `--duration-fast` for
   hover-in and a slightly shorter exit, but only if a real site needs it (don't invent tokens
   without a consumer — the overfitting precept).

This is a COHERENCE pass, not a re-timing — the values barely move; the WIN is that every recipe
now reaches for the same easing for the same job, recorded as a rule so it stops drifting.

---

## Cross-references to the sibling lanes

- **D11 (the fixed-anchor radials)** is the SAME bloom family at a different site — the chassis
  `--glass-curvature-overlay` (`tokens.css:789`, pure-white `hsl(0 0% 100% / 0.06)`, dark arm
  BYTE-IDENTICAL) + the two `ellipse at 30% 30%` corner radials (`dock-controls.css:303,329` +
  `utilities.css:782` btn-audacious). This lane owns the MOVING specular + the timing; the
  radial-overhaul lane owns those three fixed radials. They share the doctrine: warm-cream
  low-alpha, tight falloff, softened dark arm, one token magnitude.
- **D4 (blob skeuomorphism)** is the WebGL analogue (`metaball.frag.ts` specStrength × energyNorm
  blowout) — different code path (shader, not CSS box-shadow), same PRINCIPLE (one contained
  catch-light, not a stacked bloom). No code overlap.
- The `--glass-edge-light` rim (`tokens.css:757`, full-perimeter 0.18α inset ring) is SOTA-correct
  per W09 — do NOT touch it in this lane (it is not the bloom; it is the silhouette catch-light).

---

## EXACT live checks for the orchestrator (chrome-devtools-mcp @ localhost:5173)

Run these to confirm the diagnosis and validate the fix. The agent has no browser; these are the
visual-truth gates.

### Specular HOVER

1. Navigate to `/substrates/glass-material`. Screenshot the "unified material" section AT REST.
   EXPECT (current/broken): a soft central white-ish disc on each `glass-*` plate even at rest if
   `specular` is wired; (fixed): clean plates at rest (rest intensity 0).
2. `hover` over the `glass-card` plate, screenshot. EXPECT (broken): a large diffuse warm/white
   bloom covering the central third; (fixed): a small compact catch-light that tracks the pointer,
   surface stays readable.
3. `evaluate_script`: read computed style of `.glass-material::before` — confirm `background`
   gradient core alpha, the transparent stop %, `mix-blend-mode`, and `opacity` (the resolved
   `--specular-intensity`). Verify the core α dropped, the falloff tightened, the blend changed.
4. If a speedtest/results card is reachable in the demo, hover it and confirm it is NOT
   `specular="full"` (inspect for the local `--glass-specular-intensity-*` overrides 0.08/0.45/0.6
   in the inline style — if present, that is the blowout path).
5. **Safari parity (hard constraint):** the orchestrator must verify the chosen blend
   (`plus-lighter`/`soft-light`/`screen`) paints correctly in Safari/WebKit — NOT just Chromium.
   `plus-lighter` especially needs a WebKit check. Confirm the `-webkit-` companion / `@supports`
   fallback paints a plain low-alpha overlay (no blowout) where the blend is unsupported.
6. Toggle `.dark` and repeat 1-3 — confirm the dark arm reads softer (the `screen`/blend lifts
   harder on the deep canvas).

### Button HOVER

7. Navigate to the button story. Hover a `primary-audacious` button SLOWLY; watch the scale.
   EXPECT (current): a fast 1.08 pop on a bezier (mechanical); (fixed): a small ~1.03-1.04 lift
   that springs to rest (smooth). `evaluate_script` the computed `scale` transition to confirm the
   `--spring-smooth` register and the `--scale-hover-btn` value.
8. Press-and-hold the same button; confirm the press scale (0.97) still springs via `.tap-squish`
   and the press/hover now read as ONE motion language.
9. Hover a plain `default` button; confirm it does NOT gain a hover scale (only color shift) —
   the lift stays opt-in.
10. `performance_start_trace` over a hover/press cycle on a CTA; confirm NO layout/reflow on the
    scale (compositor-only — `scale`/`opacity`, no width/height). The trace should show only
    Composite/Paint, no Layout, for the transform.

### Timing coherence

11. `evaluate_script` over `.btn-pill`, `.glass-btn`, `.tap-squish`, `btn-interactive` computed
    `transition` — confirm the scale leg resolves to ONE spring register across all four (no
    `--ease-standard` on a transform, no two answers for the same property).
12. Confirm `--ease-apple` is either gone or documented as ambient-only (grep the resolved
    transitions for `cubic-bezier(0.25, 0.1, 0.25, 1)` outside the Pulse aura).

---

## One-paragraph summary for the parent

The specular hover blooms because a 0.22-alpha warm-cream radial with a SLOW falloff (transparent
only at 55% → a third-of-the-card disc) is `screen`-blended (a non-linear lightener that over-lifts
mid-tones). Fix = tighter+dimmer core + change/guard the blend (Safari-checked) + retire the
over-bright `specular="full"` rung; the intensity cohort stays the fine-tune knob. The button hover
is rough because the hover SCALE (1.08, large) snaps on a bezier while the press scale springs —
fix = a smaller `--scale-hover-btn` (~1.03-1.04) on `--spring-smooth`, surface legs staying on the
bezier. The timing TOKENS are already clean (near-zero hardcoded ms/bezier); the gap is a recorded
DOCTRINE (surface→bezier, transform/enter→spring, exit→bezier-no-overshoot) that unifies the
button/glass-btn scale-easing fork and retires the last `--ease-apple` dual-authority. All
token-resolved, Safari-safe, no new mechanism.
