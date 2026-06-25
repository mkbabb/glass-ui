# BD.W-PAGE-OFFTOKEN-SWEEP

## 1 · Band + goal

**Band 4 — Demo PAGES first-half modernization (zero src paint).** Re-point the residual off-token raw-Tailwind colors on viz/brand-hue fills to the warm-cream identity.

**Goal:** Replace the residual `text-white`/`text-zinc-900` labels rendered OVER `bg-viz-*`/`bg-[var(--motion-accent)]`/`--section-color-N` brand-hue plates with `text-foreground` (the warm-ink identity token) across the Band-4 first-half pages (foundations/display) — the stray-raw-Tailwind sweep the idiom-adherence pass missed. Identity-RESTORING (the viz fill stays the single color event; the label legibility token becomes the warm foreground), zero src paint.

---

## 2 · Starting state — the exact on-disk reality (verified by reading)

All citations read at HEAD on branch `master`. The Band-4-scoped off-token sites (foundations/display/forms/containers/navigation first-half):

### `demo/stories/foundations/motion.vue:133` — `text-white` over `--motion-accent`
```html
<div :class="cn(
    'flex h-16 w-40 items-center justify-center rounded-panel',
    'bg-[var(--motion-accent)] text-small font-medium text-white',
    'shadow-cartoon-sm',
)">
    hello
</div>
```
The "hello" demo card label is raw `text-white` over the `--motion-accent` violet fill (a Transition sample card).

### `demo/stories/display/buttons.vue:156` — `text-zinc-900` over a viz fill
```html
<Button
    v-for="v in vizButtons"
    :class="cn(v.bg, 'text-zinc-900 shadow-cartoon hover:shadow-cartoon-hover hover:-translate-x-px hover:-translate-y-px')"
>
    {{ v.label }}
</Button>
```
The viz-basis buttons (`v.bg` = `bg-viz-fourier`/`-chebyshev`/`-legendre`, the three basis hues) carry raw `text-zinc-900` ink (`:150` blurb: "Fourier / Chebyshev / Legendre — the three basis hues the library exposes as bg-viz-* utilities").

### `demo/stories/display/badge.vue:38-40` + `:74` — `text-white` ×4 over brand plates
```js
const vizBadges = [
    { cls: "bg-viz-fourier text-white", label: "fourier" },     // :38
    { cls: "bg-viz-chebyshev text-white", label: "chebyshev" }, // :39
    { cls: "bg-viz-legendre text-white", label: "legendre" },   // :40
];
```
```html
<Badge v-for="t in sectionToneBadges" class="border-transparent text-white"  <!-- :74 -->
       :style="{ backgroundColor: `var(--section-color-${t.stop})` }">
```
Three `bg-viz-* text-white` badge classes (`:38-40`) + the section-tone badges' `text-white` (`:74`) over the `--section-color-N` ramp fill.

### The CORRECTED pattern (the in-repo model — verified)
`demo/stories/foundations/css-utilities.vue:23-36`: the icon-tint demo re-points onto the LIBRARY ramp via `:style="{ color: 'var(--section-color-N)' }"` with the explicit comment (`:23`) "palette (`--section-color-N`), not raw Tailwind off-brand". This is the corrected idiom the sweep restores.

### The fence — the off-token sites in the DATA + MOTION bands are NOT this wave's
`grep -rn "text-white\|text-zinc-900"` across the whole storybook also hits `data/avatar.vue:55,97,125`, `data/timeline.vue:125`, `motion/springs.vue:204` — all `text-white` over `--section-color-N`/brand plates too. Those are **DATA band (Band 5 — BD.W-DATA-SUFFUSE/DATA-BAND-GLASS scope)** and **MOTION band** respectively, OUT of Band 4's first-half scope (foundations/forms/display/containers/navigation). They are NOT silently dropped — the gate's enrolled set (below) is the Band-4 slice; the data/motion sites are the sibling bands' slice (no-silent-drop: each band drains its own off-token residual, the ratchet shrinks band-by-band).

---

## 3 · The build — precisely what changes (idiomatic, gestalt, zero src paint)

**Re-point each Band-4 off-token label to the warm-ink identity token.** The viz/brand-hue plates in the library are warm-cream-adjacent jewel tones; the warm `--foreground` ink reads legibly over them at the demo scale (these are LABELS over saturated chips, not body copy needing a contrast-color flip).

- **`motion.vue:133`:** `text-white` → `text-foreground`.
- **`buttons.vue:156`:** `text-zinc-900` → `text-foreground`.
- **`badge.vue:38-40`:** each `bg-viz-* text-white` → `bg-viz-* text-foreground`.
- **`badge.vue:74`:** `border-transparent text-white` → `border-transparent text-foreground`.

**The one subtlety — contrast over a saturated plate.** `text-foreground` is the warm dark ink (`hsl(24 10% 10%)` light) — it reads over the mid-saturated viz/section plates (these are the SAME plates the corrected `css-utilities.vue` model uses with the ramp). IF a specific plate is dark enough that the warm-ink drops below the legibility floor (e.g. `--section-color-7` legendre-violet at full chroma), the correct re-point is the on-tone foreground twin (`--primary-foreground` / `contrast-color(var(--plate))` where a `@supports` flip is warranted) — NOT a re-introduced raw white. The π readback (§5) is the binding arbiter: it measures the resolved contrast over each painted plate and confirms the warm token clears the floor; where it does not, the on-tone-foreground re-point (still a TOKEN, never raw white) is the fix. The default re-point is `text-foreground`; the π gates the exceptions.

**The ONE-COLOR-EVENT fence (load-bearing).** Re-pointing `text-white`→`text-foreground` is identity-RESTORING, NOT a new color event: the viz-basis FILL stays the single event per surface (the chip/badge/button background carries the hue), the label is INK (warm-foreground, untinted). `proof:suffuse` d1-d3 stays GREEN — the body/label ink is now an honest warm-foreground token, not a raw-white over-ride that competed with the fill event.

**Fences respected:** foreign-tree (demo-private); GL-shader byte-fence (N/A); profile:budget (N/A — demo SFC); warm-cream identity (this wave RESTORES it — raw white/zinc are the off-identity tokens being purged); one-GL-per-route (N/A); presets-in-consumers (the viz/section ramp is the library identity; no demo hue added); substitution-vs-inheritance (`text-foreground` is the inheriting warm-ink register — the canonical substitution). **Zero `src/` paint** — all four files are `demo/stories/`.

---

## 4 · The gate — born-RED → GREEN proof design

**Extend `proof:storybook-meta`** with a new **M11 — no off-token ink over a brand-hue plate** clause (the M7 stray-blue arm's cousin — M7 catches raw chromatic UTILITIES; M11 catches raw white/zinc INK over a brand FILL). Born-RED on HEAD.

**Clauses (born-RED at HEAD's off-token state):**
- **M11-1 — zero `text-white`/`text-zinc-*` co-located with a brand-hue plate in the Band-4 enrolled set.** The detector scans each enrolled SFC for the co-occurrence pattern: a class-list OR `cls` constant carrying `text-white`/`text-zinc-N` AND a `bg-viz-*` / `bg-[var(--motion-accent)]` / `backgroundColor: var(--section-color-` in the same class-list/style. RED on HEAD (5 hits: motion×1, buttons×1, badge×4). GREEN at the re-point (all `text-foreground` / on-tone-foreground token). The enrolled set is the Band-4 first-half census (`OFFTOKEN_ENROLLED` = `{foundations/motion, display/buttons, display/badge}`), recorded the M9A_BASELINE way.
- **M11-2 — the re-point is a TOKEN, not raw white re-introduced.** Assert the replacement is `text-foreground` OR a `*-foreground` / `contrast-color(` token (never a re-added `text-white`/`text-zinc`). RED if a raw white survives; GREEN at the token re-point.

**Self-test bite (planted defect that MUST red):**
- a synthetic enrolled SFC re-introducing `bg-viz-fourier text-white` MUST red M11-1 (the regression);
- a synthetic re-point to `text-zinc-100` (a raw light ink, dodging "white") MUST red M11-2 (the anti-evasion — the detector matches the raw-Tailwind ink family, not the literal "white");
- the good `bg-viz-fourier text-foreground` MUST pass both (the positive bite).

**Born-RED proof:** at HEAD, M11-1 reds (5 off-token hits). At the build, both pass. The self-test reds the gate if a bite stops biting (anti-de-fang, the `selfTest()` precedent).

---

## 5 · Paint verification — the π readback (BC anti-disease law)

This wave PAINTS (label legibility over a colored plate is a visible surface), so it takes a **`proof:ba-gestalt` verdict on the `page-band` aggregate surface** (the storybook-meta chassis row in the BD-grown roster — BD.W-GESTALT-ROSTER-GROW; the off-token-swept demo panes aggregate under `page-band`, the `/foundations/motion`/`/display/buttons`/`/display/badge` SFCs enrolled in its BD freshness record's `surface-paths`) on a fresh capture — no source-green close.

**The binding π** (the `tests-visual` arm OR the `proof:ba-gestalt` `page-band` aggregate row in the BD roster, both modes × desktop+mobile, on `:5199`):
- **(a) label legibility over the fill** — capture `/foundations/motion`, `/display/buttons`, `/display/badge` and assert the re-pointed labels read legibly over their viz/section plates in BOTH modes. The binding measure is a `getComputedStyle` contrast readback: the resolved `color` (warm `--foreground`) over the resolved plate `background` clears the demo-label legibility floor (≥3:1 for the large-text/UI-label category; ≥4.5:1 where the label is body-sized). Where a specific plate fails the floor, the π flags it for the on-tone-foreground re-point (the exception path in §3).
- **(b) the identity-restore is sub-perceptual on the FILL** — the plate hue is byte-unchanged (only the ink token moved); the chip/badge/button still POPs its viz/section hue as the single color event. The gestalt is "the same colored chip, now with warm-ink-instead-of-white labels".
- **(c) `proof:suffuse` d1-d3 stays GREEN** — the one-color-event proportion holds (fill = event, ink = untinted warm-foreground).

**The BC anti-disease law observed:** the device-free M11 clauses prove the SOURCE token swap; the π proves the RENDERED contrast over the real painted plate (a re-point that silently drops below the floor passes the source gate but the contrast readback catches it). No "is GREEN at this wave close; W-REFLECT re-confirms on the union tree"; the readback runs at this wave's close.

---

## 6 · Fences + risks — what must NOT break

- **ONE-COLOR-EVENT (load-bearing).** The re-point is identity-restoring, NOT a new event. The viz/section FILL stays the single color event; the label is warm-ink. `proof:suffuse` d1-d3 must stay GREEN — a re-point that accidentally tinted the label a SECOND hue would red it.
- **Legibility floor over saturated plates.** `text-foreground` is the default; where a specific dark/saturated plate drops the warm ink below the contrast floor, the fix is the on-tone-foreground TOKEN (`*-foreground`/`contrast-color()`), NEVER a re-added raw white. The π is the binding arbiter (it measures the resolved contrast); do not "fix a contrast fail by re-adding white".
- **Band scope (no-silent-drop, not a drop).** This wave is the Band-4 first-half slice (foundations/display). The data-band (`avatar.vue`, `timeline.vue`) and motion-band (`springs.vue`) off-token sites are the sibling bands' slice — they are caught by their band's enrolled set, never silently carried. The `OFFTOKEN_ENROLLED` set is the Band-4 census, recorded-not-frozen.
- **Warm-cream identity.** This wave RESTORES the identity (raw white/zinc are the off-identity tokens being purged). No demo hue enters a token; the viz/section ramp is the library identity.
- **Clean — no dual path.** Each off-token class is REPLACED, not aliased; no `text-white text-foreground` double-class survives.
- **Risk — low.** Five mechanical token swaps + one gate clause, with a single subtlety (the contrast-over-saturated-plate exception, π-arbitrated). The viz fills are unchanged; only the ink token moves.
