# BG CONSTRAINTS — the binding manifest every BG wave honors

BG.W-CONSTRAINT-MANIFEST. This is the single home for the constraints every other
BG wave must hold to, the Safari cross-engine reality, and the Mac-only-release
decision. It is not prose-only: `proof:constraint-manifest` reads this file, asserts
each constraint + record below is present, and cross-checks the most falsifiable
claims against the LIVE source on disk (the "over live tokens" teeth — a manifest
that lies about the tree REDs). Source of the six: the A-a11y-perf-crossengine audit
§"THE CONSTRAINTS EVERY OTHER BG WAVE MUST HONOR"; the ship/Safari records: the
WS7 close SPEC §§L.0/L.6.

---

## The six binding constraints

### 1. PRM — the spatial leg drops, a terminal fade keeps

Every motion (route transition, page build, cartoon cast, field drift, dock morph,
aurora) snaps its spatial leg and KEEPS a terminal fade under `prefers-reduced-motion:
reduce`. Fade-keeps, transform-drops (motion-canon P6). The library-wide carve is
`src/styles/utilities/a11y-overrides.css` (`[data-allow-motion]` overrides only under
full motion; PRM is absolute). No wave adds a spatial `transition`/`animation` off the
`proof:no-layout-animation` allowlist.

### 2. GL BUDGET — one live GL context per route

The shell owns the ONE persistent aurora; a route that mounts its own live GL (the
`/substrates` studios) suppresses the shell context while active (never two live
contexts on screen). Every live GL surface composes the offscreen-park + PRM-freeze +
`dispose()` substrate (`proof:offscreen-pause`). No CSS "aurora fake" that animates a
forever compositor layer (`will-change: transform` on a `position: fixed` plane is
forbidden). See the GL↔flash coupling below — one persistent context is also the
anti-flash discipline.

### 3. Safari — no VT API, WebKit bug 245510

`backdrop-filter: url()` is Safari-IMPOSSIBLE (WebKit bug 245510, OPEN) — use regular
`filter: url()` like `GooFilter`; every `filter: url()`/`backdrop-filter: url()` goo
path stays `@supports`-gated with a non-goo fallback floor. `view-transition-name` and
`startViewTransition` are NOT the route-transition mechanism (they no-op on Safari →
inconsistent cross-engine UX) — the route transition is ONE engine-agnostic CSS path.
Every 0-alpha gradient stop is an explicit `oklch(L C H / 0)` warm color, never bare
`transparent` (the WebKit premultiply hole). `light-dark()` never carries an
inset-shadow fragment (the trap); plain per-mode `.dark` arms only. `contrast-color()`
stays `@supports`-gated progressive enhancement over a load-bearing declarative floor.

### 4. CLS ≈ 0

No layout-property animation in `@keyframes`/`transition` (`proof:no-layout-animation`);
the static `min-block-size` desktop-reserve discipline holds. The route transition must
NOT leave two page trees coexisting (a double-paint is a CLS+perf fault).

### 5. FOCUS + KEYBOARD

Any modal/dialog traps focus via the shipped `FocusScope` + background `inert` and
handles Esc on a focusable host — OR is replaced by a non-modal in-place control. The
dock root stays presentational (no `aria-expanded`); roving-tabindex stays on the
strips; the WCAG-2.5.5 coarse touch floor (`a11y-overrides.css`) holds.

### 6. CONTRAST + WARM IDENTITY

The warm-chroma floor / warm-ink registers hold; no neutral gray leaks; the cartoon ink
stays warm (not red); `--muted-foreground` legibility over glass holds (the on-glass-fg
register); forced-colors restores the focus outline + silhouette border
(`a11y-overrides.css`).

---

## Safari — the cross-engine reality (records)

### Safari version matrix

The close machine's engine is Safari **26.4** / macOS **26.4.1** — a POINT sample, not
a range. A `var()`-in-`-webkit-backdrop-filter` GREEN on 26.4 does NOT certify Safari
≤18 (MDN compat #25914); a single-version certification greening a fix that fails on ≤18
is its own green-lie. The Safari version matrix is scoped to "the recorded version."

### The var()-resolution answer — GREEN, version-26.4-scoped

`var(--glass-blur-*)` inside `-webkit-backdrop-filter` resolves to a literal `blur(Npx)`
on WebKit 26.4 (an engine-level CSS-resolution fact a `getComputedStyle`/`CSS.supports`
read CAN certify — parsing ≠ rasterization, so the Playwright-WebKit proxy is VALID for
THIS computed-value question only). Version-26.4-scoped: it does not cover ≤18.

### The ≤18 trigger — WS3 literal-bake

If the computed read REDs on real Safari (var() un-resolved on some tier, or a ≤18 close
machine), that is a WS3 **literal-bake** fix: resolve `var(--glass-blur-*)` to a literal
in the shipped `-webkit-` arm (an honest trade — Safari ≤18 loses per-instance
`--glass-level` retune but KEEPS the blur floor). Recorded as a FOLD-LEDGER row, never
waved through. The `@container style(--glass-backdrop: light)` landmine triggers only
Safari <18 — the same WS3 literal-bake trigger.

### The goo path — regular filter:url()

goo/fission/pager-worm paint via REGULAR `filter: url(#…)` (feGaussianBlur +
feColorMatrix + feComposite — all WebKit-supported), NOT `backdrop-filter: url()`. The
refraction lens is `@supports (backdrop-filter: url(#…))`-gated progressive enhancement
(`src/styles/glass-refract.css`); a non-supporting engine paints the un-gated blur+tint
base alone.

### Safari-PAINT DROP-WITH-TRIGGER

`CSS.supports` ≠ rasterization. The "lens APPLIES" / "appears FIXED" claims are
QUARANTINED — WebKit bug 245510 is OPEN, the lens degrades gracefully, and the live
paint answer is Mac-only by physics (below). No PAINT claim rides on a computed-value
proxy; the real-Safari paint verdict is a captured artifact from a Metal Safari.app run
or it does not exist (drop-with-trigger, never a silent green).

---

## GL↔flash coupling

The one-GL-context-per-route budget (constraint 2) is also the anti-flash discipline: a
per-route GL re-mount churns the WebGL context on every navigation, and a context churn
paints a first-frame FLASH (an unpainted canvas before the shader's first draw). The
resolution couples the two: ONE persistent live aurora owned by the SHELL, threaded per
route by a palette/uniform hue swap (not a new mount), so navigation never churns the
context and never flashes. A route that owns its own GL suppresses the shell context
(the count stays exactly one), and the offscreen-park substrate makes the pause cheap.
Churn the context per route and you pay both the budget violation AND the flash — they
are the same coupling.

---

## iOS-26 a11y ceilings

The accessibility ceilings the BD/BG surfaces hold (the iOS-26 register):

- **PRM** — spatial drops, fade keeps (constraint 1); the `[data-allow-motion]` carve is
  overridden by PRM (accessibility is absolute).
- **WCAG-2.5.5 coarse touch floor** — `@media (pointer: coarse)` floors the interactive
  target to `var(--touch-target, 2.75rem)` (44px), `a11y-overrides.css`.
- **FocusScope + inert** — modal focus-trap via the shipped `FocusScope`; the dock root
  stays presentational; roving-tabindex on the strips (constraint 5).
- **forced-colors** — restores the focus outline + silhouette border.
- **prefers-reduced-transparency** — a calm opaque legibility floor when the aurora is
  paused/unsupported (`paper.css`).
- **contrast-color()** — `@supports`-gated progressive enhancement over a load-bearing
  declarative floor (never the sole legibility path).

---

## §L.0 — the Mac-only-release decision

The live-paint tag-block is Mac-only BY PHYSICS. CI (`release.yml`, ubuntu-latest) runs
on SwiftShader — a software rasterizer that cannot certify the real Metal paint. So the
paint attestation is written ONLY by `release.sh --run ship` (Arm A, `runShip()`) on a
real Mac/Metal GPU: it captures live Metal paint over the BG roster, re-applies the band
predicates, and writes the per-region pixel DIGEST + the `webkit.{glass,goo}` verdict +
the DERIVED `surfaceHash` into `docs/tranches/BG/SHIP-ATTESTATION.json`.

The freshness closer is device-free: `proof:ship-attestation` (`["ci","release"]`)
re-applies the band grammar to the embedded digest AND recomputes the `surfaceHash` at
HEAD, so `release.yml`'s `--run full` REDs on an absent/stale attestation on every
tag-push publish (the bypass-closer — the maintainer's `git tag && git push` path
bypasses the Mac-only ship-block, so Arm B is the enforcer on that path).

**The Mac-only-release friction is EXPLICIT + intentional, not a surprise:** every
release whose captured surfaces' SOURCE changed needs a fresh `release.sh --run ship`
ceremony before the tag, because Arm B REDs a stale digest. `clause-3` of
`proof:close-battery-parity` is FULL-ONLY by design (`release.yml` cannot run `--run
ship` — no Metal in CI); do NOT "fix" it to demand ship (it would fail-close every CI
publish). RATIFIED.

---

## The live-source cross-checks (what `proof:constraint-manifest` verifies on disk)

The manifest is not a paper doc. `proof:constraint-manifest` cross-checks these
falsifiable claims against the live tree (the anti-lie teeth):

1. **The lens is `@supports`-gated** — `src/styles/glass-refract.css` contains the
   `@supports (backdrop-filter: url(#…))` gate (constraint 3; bug 245510).
2. **The PRM carve is live** — `a11y-overrides.css` carries both `prefers-reduced-motion:
   reduce` and the `[data-allow-motion]` carve (constraint 1).
3. **The WCAG-2.5.5 touch floor is live** — `a11y-overrides.css` carries `@media
   (pointer: coarse)` with `min-block-size: var(--touch-target, …)` (constraint 5,
   iOS-26 ceiling).

A manifest that names a constraint the live source contradicts REDs — the doc and the
tree stay in lockstep.
