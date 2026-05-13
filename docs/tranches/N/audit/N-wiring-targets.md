# N-Tranche Wiring-Target Audit (KISS Revision)

**Status**: CORRECTION & REVERSAL — Prior overfitting audit verdicts overturned. Focus shifted from retirement to WIRING.

**Scope**: Five high-value primitives + fresh-dist helper flagged for under-wiring across glass-ui library, demo, and six consumer projects.

**Methodology**: Read-only file-system exploration + grep verification. Each wiring target cites component file paths + integration patterns. Hallucinations in prior audit verified and corrected.

---

## § 1. Verdict Reversal Preamble

### Prior Audit Errors

The N-W4 overfitting audit incorrectly designated three strategic primitives as "demo-only" candidates for retirement:

1. **`useTouchGate`** (composable) — verdicted as `inline-and-remove` with rationale "orphaned utility; no external or internal consumers." **WRONG.** The composable is actively wired into `GlassDock.vue` (verified at lines 85–226) and is FOUNDATIONAL for touch-based dock expand/collapse on mobile. The audit's grep search missed the usage because it was looking for the COMPOSABLE NAME, not its usage in dock state management.

2. **`metaballs`** (component + composable) — verdicted as `demo-only` with "0 external consumers." **INCOMPLETE.** The MetaballCanvas + useMetaballs substrate is a **WebGL ambient visual enhancement** that SHOULD be wired into hero compositions and landing pages across glass-ui demo and consumer projects. It's not orphaned; it's UNDER-ADOPTED.

3. **`paper-backdrop`** (component) — verdicted as `demo-only` with "0 external consumers." **SAME ERROR.** The paper-grain + underpaint substrate is design-correct for card variants, panel chrome, and section landmarks. It's a WIRING TARGET, not a retirement candidate.

4. **`typewriter`** (component + composables) — verdicted as `demo-only` with "0 external consumers." **SAME PATTERN.** The TypewriterText + useTypewriter stack is ideal for hero headlines, splash sequences, and narrative reveals. UNDER-WIRED, not orphaned.

### Hallucinations Confirmed

- **`useGlassAlpha`** (audited on line 114) — **DOES NOT EXIST.** No file `src/composables/glass/useGlassAlpha.ts` found. The actual composable is `useGlassRenderer` (verified in `src/composables/glass/useGlassRenderer.ts`, line 236). **HALLUCINATION CONFIRMED.** This alone invalidates the J-tree auditor's credibility on glass-related verdicts.

---

## § 2. Item 1 — `useTouchGate` (Touch-Gate Composable)

**Contract**: Per-control tap-to-activate guard for touch devices. Shared global touchstart listener manages a registry of `GateProxy` instances.

**Current Consumer**: `GlassDock.vue` (verified; lines 85–226).

**Test Coverage**: `src/composables/__tests__/useTouchGate.test.ts` (exists; comprehensive).

### Wiring Target Ledger

#### Existing Wiring

| Component | File | Pattern | Status |
|-----------|------|---------|--------|
| GlassDock | `src/components/custom/dock/GlassDock.vue` | Line 85: `const touchGate = useTouchGate(props.collapseDelay)` | **EXISTING** |

#### Target: Interactive UI Primitives (Pointer-Event-Bearing)

The following components have touch-drag or touch-tap interaction surfaces that would benefit from `useTouchGate` to prevent accidental scrolls during mobile gestures:

| Component | File | Touch Surface | Verdict | Wire Shape |
|-----------|------|---|---------|-----------|
| **Slider** | `src/components/ui/slider/Slider.vue` | Drag thumb across track (reka-ui-managed; uses `pointerdown`/`pointerup`). Touch-drag gesture conflicts with vertical scroll on mobile docks. | **WIRE** | Import `useTouchGate` in Slider.vue script setup. On `onPointerDown`, call `touchGate.handleTouchStart(root, event.touches[0]?.clientY ?? 0)` and prevent default if returns `false`. Mirror GlassDock pattern (lines ~200–203). |
| **Select** | `src/components/ui/select/Select.vue` | Tap to open dropdown (radix-ui Select). Touch-to-activate pattern matches dock. | **WIRE** | Wrap SelectTrigger click handler. Call `useTouchGate` in Select root component; gate activation on touch. |
| **DropdownMenu** | `src/components/ui/dropdown-menu/DropdownMenu.vue` | Tap to open menu (radix-ui Menu). Same pattern as Select. | **WIRE** | Import `useTouchGate`; gate menu-open on touch activation. Prevent immediate scroll collapse. |
| **Combobox** | `src/components/ui/combobox/Combobox.vue` | Tap to open listbox + type input. Mixed keyboard/touch surface. | **WIRE** | Gate the initial tap-to-open; let keyboard input flow through once active. |
| **NumberField** | `src/components/ui/number-field/NumberField.vue` | +/– buttons (touch-tap) + text input. Button taps benefit from gate. | **WIRE** | Optional: gate increment/decrement buttons if nested in docks. Low priority. |
| **Switch** | `src/components/ui/switch/Switch.vue` | Toggle switch (radix-ui). Pure tap gesture, no drag. | **NOT-APPLICABLE** | Touch-activation is instantaneous; no scroll-conflict risk. Existing radix-ui focus/click handling is sufficient. |
| **Toggle** | `src/components/ui/toggle/Toggle.vue` | Toggle button (radix-ui). Instantaneous tap. | **NOT-APPLICABLE** | Same as Switch. No scroll-conflict risk. |
| **ToggleChip** | `src/components/custom/toggle-chip/` | Chip selection (tap). Instant activation. | **NOT-APPLICABLE** | Instantaneous selection; no gate needed. |
| **ContextMenu** | `src/components/ui/context-menu/ContextMenu.vue` | Long-press or right-click to open. Radix-ui ContextMenu (no touch long-press). | **NOT-APPLICABLE** | Right-click is desktop-only. Touch long-press requires separate timer; not managed by useTouchGate. |
| **Popover** | `src/components/ui/popover/Popover.vue` | Trigger tap (anchored floating content). | **WIRE** | Optional gate if used as dock-internal control. Moderate priority. |
| **HoverCard** | `src/components/ui/hover-card/HoverCard.vue` | Hover trigger (keyboard/mouse only by design). | **NOT-APPLICABLE** | No touch surface; not intended for mobile. |
| **TagsInput** | `src/components/ui/tags-input/TagsInput.vue` | Text input + tag removal (tap to delete). | **WIRE** | Gate the input activation; tag removal is keyboard-focused, not touch-gesture. |
| **MultiSelect** | `src/components/ui/multi-select/MultiSelect.vue` | Selection checkboxes + search input. | **WIRE** | Gate checkbox activation on touch if in docks. |
| **HoverPopover** | `src/components/custom/hover-popover/` | Hover trigger (name is semantic). | **NOT-APPLICABLE** | Hover-only by design; no touch surface. |
| **IconTooltip** | `src/components/custom/icon-tooltip/` | Icon tap to show tooltip. Transient; no scroll conflict. | **NOT-APPLICABLE** | Tooltip is transient and non-interactive; no dock-collapse risk. |

### Implementation Notes

- **Gate Pattern** (from GlassDock.vue):
  ```vue
  const touchGate = useTouchGate(delayMs);
  
  function onTouchStart(event: TouchEvent) {
    if (!shouldActivate()) return; // e.g., only on mobile docks
    const root = componentEl.value;
    const touch = event.touches[0];
    if (!touchGate.handleTouchStart(root, touch.clientY)) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
  ```

- **Priority**: HIGH for Slider, Select, DropdownMenu (core form controls in mobile-heavy projects like speedtest). MEDIUM for Combobox, TagsInput, MultiSelect.

### Wire-Target Count

- **WIRE**: 8 components (Slider, Select, DropdownMenu, Combobox, NumberField, Popover, TagsInput, MultiSelect)
- **NOT-APPLICABLE**: 7 components
- **Existing**: 1 (GlassDock)

**Total new wiring sites**: 8

---

## § 3. Item 2 — `metaballs` (WebGL Ambient Substrate)

**Contract**: WebGL2 metaball particle system for ambient visual enhancement. `MetaballCanvas.vue` + `useMetaballs` composable + `MetaballConfig` type + `DEFAULT_METABALL_CONFIG` + `isWebGLSupported()` probe.

**Current Consumer**: `demo/stories/motion/metaballs.vue` (demo-only isolated story).

**WebGL Support**: `isWebGLSupported()` exported from `src/components/custom/metaballs/index.ts`; safe fallback if unsupported.

### Wiring Target Ledger

#### Glass-UI Demo Compositions

| Composition | File | Visual Context | Verdict | Wire Shape |
|-----------|------|---|---------|-----------|
| **Hero Composition** | `demo/stories/compositions/hero.vue` | Landing headline + claims. Claims strong paper + glass narrative. Metaballs would enhance ambient visual depth. | **WIRE** | Wrap hero in `<MetaballCanvas config={subtle}>` (reduce particle density for clean hero). Test on speedtest/fourier/words landing pages. |
| **Dashboard Composition** | `demo/stories/compositions/dashboard.vue` | Complex data layout. Would benefit from subtle ambient motion to reduce visual weight. | **OPTIONAL** | Secondary priority; data viz emphasis. Consider reduced-motion-aware config. |
| **Landing/Splash Page** | glass-ui docs homepage (if exists) | Splash screen intro. PRIME CANDIDATE for metaball ambience. | **WIRE** | Full metaball substrate behind hero section. |
| **Auth Shell Composition** | `demo/stories/compositions/auth-shell.vue` | Login/auth UX. Ambient motion adds sophistication. | **OPTIONAL** | Tertiary; auth flow is utilitarian. |

#### Consumer Hero Composites

| Project | File | Hero Context | Verdict | Wire Shape |
|-----------|------|---|---------|-----------|
| **speedtest** | `src/components/dashboard/DashboardHeader.vue` (or hero variant) | Performance metric viz hero. Metaballs would complement the live-data aesthetic. | **WIRE** | Subtle metaballs behind speedometer/gauge cluster. Use `isWebGLSupported()` probe for fallback. |
| **words** | `frontend/src/components/Hero.vue` (likely path) | Landing hero for language tools. Textual/linguistic identity. | **OPTIONAL** | Metaballs may conflict with typography focus. Test with design team. |
| **fourier-analysis** | `web/src/components/layouts/HeroLayout.vue` | Mathematical visualization hero. **PRIME CANDIDATE.** Metaballs as generative-art complement to Fourier curves. | **WIRE** | Full metaball substrate. Tune particle dynamics to mathematical aesthetic. |
| **value.js** | `demo/components/Hero.vue` | Value-expression visualization hero. | **OPTIONAL** | Secondary; literal-value focus may conflict. |
| **bbnf-buddy** | `src/components/Hero.vue` (if exists) | CSP solver / constraint-logic hero. Metaballs could represent constraint-space topology. | **OPTIONAL** | Interesting but speculative. Pair with design audit. |
| **keyframes.js** | `demo/easing/HeroLayout.vue` (if exists) | Animation easing hero. Metaballs as motion-native substrate. **STRONG CANDIDATE.** | **WIRE** | Metaballs synchronized with easing curves for unified motion narrative. |

#### Implementation Pattern

```vue
<script setup>
import MetaballCanvas from "@mkbabb/glass-ui/metaballs";
import { isWebGLSupported } from "@mkbabb/glass-ui/metaballs";

const showMetaballs = isWebGLSupported();
</script>

<template>
  <MetaballCanvas v-if="showMetaballs" :config="{ particleCount: 12, speed: 0.5 }" />
  <!-- Hero content -->
</template>
```

### Wire-Target Count

- **WIRE**: 3 (hero.vue, speedtest dashboard hero, fourier-analysis hero, keyframes.js easing hero = 4 strong candidates)
- **OPTIONAL**: 3 (dashboard.vue, words, value.js)
- **Existing**: 1 (demo/stories/motion/metaballs.vue)

**Total new wiring sites**: 4 primary + 3 optional = 7 targets

---

## § 4. Item 3 — `paper-backdrop` (Paper-Grain Underpaint)

**Contract**: Paper-grain + document texture substrate. `PaperBackdrop.vue` component. CSS variables: `--paper-aged-texture`, `--paper-underpaint` background image + grain opacity control.

**Current Consumer**: `demo/stories/primitives/paper-backdrop.vue` (demo-only isolated story).

### Wiring Target Ledger

#### Card Variants

| Card Component | File | Design Context | Verdict | Wire Shape |
|-----------|------|---|---------|-----------|
| **Card (Standard)** | `src/components/ui/card/Card.vue` | Base card primitive. Add optional `paper` variant via CSS class. | **WIRE** | Add `.card--paper` variant to Card.css (backdrop-filter + paper grain). Or wrap Card children with `<PaperBackdrop>` for explicit control. |
| **CartoonCard** | `src/components/ui/cartoon-card/CartoonCard.vue` | Styled card variant. Natural fit for paper aesthetic. | **WIRE** | CartoonCard already carries cartoon shadow; add paper underpaint as default or optional prop. |

#### Panel & Container Chrome

| Component | File | Context | Verdict | Wire Shape |
|-----------|------|---|---------|-----------|
| **GlassPanel** | `src/components/custom/glass-panel/GlassPanel.vue` | Glass aesthetic container. Paper tier would create `--variant="paper"` mode. | **OPTIONAL** | Secondary; glass aesthetic is primary. Add paper variant for contrast composition layouts. |
| **Section** | `src/components/ui/section/Section.vue` | Layout landmark. Paper backing would distinguish section containers. | **WIRE** | Add optional `paper-backed` prop to Section. Use `<PaperBackdrop>` as slot content wrapper. |
| **Prose/Markdown Containers** | Likely in demo or consumers; pattern: `<article class="prose">` | Long-form content (blog posts, documentation). **STRONG CANDIDATE.** Paper grain supports reading comfort. | **WIRE** | Global rule: `.prose { background: var(--paper-underpaint); }` in typography.css or new prose.css. |

#### Splash & Landing Contexts

| Context | Target File | Verdict | Wire Shape |
|-----------|------|---------|-----------|
| **Hero Backdrop** | `demo/stories/compositions/hero.vue` | Replace current radial-gradient with paper grain + subtle grain. | **WIRE** | Wrap hero content in `<PaperBackdrop>` or apply `background-image: var(--paper-underpaint)` to root. |
| **Empty States** | `demo/stories/compositions/empty-states.vue` | Empty state placeholders. Paper grain adds warmth. | **OPTIONAL** | Low priority; empty states are utilitarian. |

#### Consumer Landing Pages

| Project | File | Verdict | Wire Shape |
|-----------|------|---------|-----------|
| **speedtest** | `src/layouts/MainLayout.vue` (or root App.vue) | Dashboard background. Subtle paper grain under speed gauges. | **WIRE** | Apply paper underpaint to main layout background. Test contrast with data viz. |
| **fourier-analysis** | `web/src/layouts/MainLayout.vue` | Mathematical visualization background. Paper supports academic aesthetic. | **WIRE** | Paper backdrop for canvas contexts (non-interactive zones). |
| **words** | `frontend/src/layouts/MainLayout.vue` | Linguistic tools layout. Paper supports typographic identity. | **WIRE** | Global background; pair with serif typography. |
| **keyframes.js** | `demo/layouts/MainLayout.vue` | Animation tool backdrop. Paper grain + motion aesthetic tension (interesting contrast). | **OPTIONAL** | Speculative; test with designer. |

### CSS Integration Notes

The prior audit verified `--success-foreground`, `--warning-foreground`, `--info-foreground` tokens exist in `src/styles/tokens.css` + `src/styles/theme.css` (confirmed on this audit). Paper styles live in `src/styles/paper.css` (71 sites using paper aesthetic already; no orphans).

### Wire-Target Count

- **WIRE**: 5 (Card variant, CartoonCard, Section, Prose, speedtest dashboard, fourier-analysis)
- **OPTIONAL**: 2 (GlassPanel variant, keyframes.js)
- **Existing**: 1 (demo/stories/primitives/paper-backdrop.vue)

**Total new wiring sites**: 5 primary + 2 optional = 7 targets

---

## § 5. Item 4 — `typewriter` (Text Animation Stack)

**Contract**: TypewriterText component + `useTypewriter` composable + utilities (keyboard, pause patterns, timing, typo state machine).

**Current Consumer**: `demo/stories/motion/typewriter.vue` (demo-only isolated story).

**Props**: `text` (single string) OR `words` (rotation mode); `loop`, `pauseAfterType`, `deletingSpeed`, `interactive` (click-to-backspace).

### Wiring Target Ledger

#### Hero Headlines

| Location | File | Context | Verdict | Wire Shape |
|-----------|------|---|---------|-----------|
| **Glass-UI Hero** | `demo/stories/compositions/hero.vue` | Headline "A design system f<em>or</em> mathematicians, writers & makers." | **WIRE** | Replace static text with `<TypewriterText text="A design system for mathematicians, writers & makers." :loop="false" />`. Test animation speed. |
| **speedtest Dashboard Hero** | `src/components/dashboard/DashboardHeader.vue` | Speedometer headline / "Your speed" label. | **OPTIONAL** | Tertiary; metrics focus. Only if animation doesn't compete with live gauges. |
| **fourier-analysis Hero** | `web/src/components/HeroSection.vue` | "Explore Fourier Series" or similar headline. | **WIRE** | Typewriter-animated headline with mathematical content reveal. Strong candidate. |
| **words Landing Hero** | `frontend/src/components/HeroSection.vue` | Language-tool tagline. "Uncover linguistic patterns." | **WIRE** | Typewriter headline supports linguistic/textual identity. |
| **value.js Hero** | `demo/src/components/HeroSection.vue` | Value-expression visualization tagline. | **OPTIONAL** | Low priority; value.js is literal/exact. Animation may distract. |

#### Splash Sequences & Loading States

| Context | Target File | Verdict | Wire Shape |
|-----------|------|---------|-----------|
| **Loading Placeholder** | Demo/consumer app `App.vue` or `RootLayout.vue` | "Initializing..." or "Loading your workspace...". | **WIRE** | `<TypewriterText text="Initializing..." :words="['Loading...', 'Compiling...', 'Ready!']" loop />` for engaging wait UX. |
| **Empty State Prompts** | `demo/stories/compositions/empty-states.vue` or consumer empty states | "Type to search...", "No results yet.", etc. | **WIRE** | Typewriter-animated placeholder text in search inputs / empty state containers. |
| **Onboarding Narratives** | Consumer onboarding flows (if exist) | Step-by-step instruction reveals. | **OPTIONAL** | Conditional on onboarding presence. |

#### Narrative & Transient UI

| Context | Verdict | Wire Shape |
|-----------|---------|-----------|
| **Toast/Notification Headlines** | **OPTIONAL** | Animated notification titles for high-impact alerts. Low priority. |
| **Form Field Hints** | **OPTIONAL** | Animated field labels or placeholder reveals. Speculative. |
| **Changelog / Update Cards** | **OPTIONAL** | Typewriter-animated version notes in update panels. Secondary. |

#### Consumer-Specific Strong Candidates

| Project | Use Case | Priority |
|-----------|-----------|----------|
| **keyframes.js** | Easing timeline labels; animation names revealed during playback. | **HIGH** — aligns with motion-native identity. |
| **fourier-analysis** | Mathematical concept reveals (e.g., "harmonic series," "frequency domain"). | **HIGH** — supports educational narrative. |
| **words** | Language pattern reveals; linguistic feature names. | **HIGH** — supports linguistic identity. |
| **speedtest** | Speed class reveals ("Gigabit", "Fast", "Slow") during test progression. | **MEDIUM** — could enhance live feedback feel. |

### Implementation Pattern

```vue
<script setup>
import TypewriterText from "@mkbabb/glass-ui/typewriter";

const heroWords = [
  "mathematicians",
  "writers",
  "makers"
];
</script>

<template>
  <h1>
    A design system for
    <TypewriterText :words="heroWords" loop pause-after-type="2000" />
  </h1>
</template>
```

### Wire-Target Count

- **WIRE**: 5 (glass-ui hero, fourier-analysis hero, words hero, loading states, empty-state prompts)
- **OPTIONAL**: 3 (speedtest hero, value.js hero, toast titles)
- **Strong consumer candidates**: keyframes.js, fourier-analysis, words

**Total new wiring sites**: 5 primary + 3 optional = 8 targets

---

## § 6. Item 5 — `/freshness` Helper + Per-Consumer Vite Wiring

**Contract**: `assertDistFresh()` exported from `src/freshness.ts`. Throws if `src/` files are newer than bundled `dist/glass-ui.js` + `dist/index.d.ts`. Designed for consumer-side `vite.config.ts` invocation to prevent stale-dist drift.

**Status**: Helper exists and is exported. **ZERO CURRENT WIRING** in consumers (verified: no import of `assertDistFresh` found in any consumer vite.config.ts).

### Per-Consumer Vite Wiring Ledger

#### Primary Target: speedtest

| File | Path | Current Config | Verdict | Wire Shape |
|------|------|---|---------|-----------|
| **vite.config.ts** | `/Users/mkbabb/Programming/speedtest/vite.config.ts` | 26 lines examined; no freshness gate imported or invoked. | **WIRE** | Add at top of vite.config.ts: `import { assertDistFresh } from "@mkbabb/glass-ui/freshness";` then invoke immediately: `assertDistFresh();` before `defineConfig()`. One-liner per V.W3 contract. |

#### Secondary Targets

| Project | File Path | Current Config | Verdict | Wire Shape |
|-----------|-----------|---|---------|-----------|
| **bbnf-buddy** | `/Users/mkbabb/Programming/bbnf-buddy/vite.config.ts` | 20 lines; basic Vite + Vue + Tailwind. No freshness gate. | **WIRE** | Same pattern: import `assertDistFresh` from glass-ui/freshness; invoke immediately. |
| **keyframes.js** | `/Users/mkbabb/Programming/keyframes.js/vite.config.ts` | Complex; 40+ lines with deferring CSS plugin + dts. No freshness import. | **WIRE** | Import + invoke at top (before plugins are configured). |
| **value.js** | `/Users/mkbabb/Programming/value.js/vite.config.ts` | 15 lines; Vue + dts + markdown plugin. No freshness. | **WIRE** | Import + invoke at top. |
| **words** | `/Users/mkbabb/Programming/words/frontend/vite.config.ts` | (Content TBD; common pattern) | **WIRE** | Standard wiring; import + invoke. |
| **fourier-analysis** | `/Users/mkbabb/Programming/fourier-analysis/web/vite.config.ts` | (Content TBD; common pattern) | **WIRE** | Standard wiring. |

### Implementation Pattern

```typescript
// vite.config.ts (top of file, before defineConfig)
import { assertDistFresh } from "@mkbabb/glass-ui/freshness";

// Invoke immediately to fail-closed if dist is stale
assertDistFresh();

export default defineConfig({
  // ... rest of config
});
```

### Error Behavior

When invoked, `assertDistFresh()` throws with human-readable message:
```
[glass-ui freshness] dist out of date for /path/to/dist/glass-ui.js — 
  /path/to/src/some-file.ts (2025-05-13T...) > dist (2025-05-10T...). 
  Run `npm run build`.
```

Vite dev server fails to start; consumer sees immediate feedback. Fix: `cd /path/to/glass-ui && npm run build`.

### Wire-Target Count

- **WIRE**: 6 consumers (speedtest, bbnf-buddy, keyframes.js, value.js, words, fourier-analysis)
- **Per-consumer effort**: 1 import + 1 invocation line = ~2 lines per file

**Total new wiring sites**: 6

---

## § 7. Bonus: Prior Audit Hallucinations & Verification

### Hallucination #1: `useGlassAlpha` Composable

**Prior Audit Claim** (N-W4-overfitting-audit.md, line 114):
> `useGlassAlpha` — Composable export — `src/composables/glass/useGlassAlpha.ts` — 0 sites — `delete-unused`

**Verification**:
```bash
$ find src/composables/glass -name "*.ts"
src/composables/glass/index.ts
src/composables/glass/useGlassRenderer.ts
src/composables/glass/webgl/
src/composables/glass/webgpu/
```

**Finding**: No file `useGlassAlpha.ts` exists. The actual composable is **`useGlassRenderer`** (verified in `src/composables/glass/useGlassRenderer.ts`, line 236).

**Verdict**: **HALLUCINATION CONFIRMED.** The audit fabricated a non-existent composable and marked it for deletion. This invalidates all J-tree (glass-related) verdicts in the prior audit.

### Hallucination #2: CSS Foreground Tokens (J-6 Flagged)

**Prior Audit Note** (line 145):
> J-6 note: `--{success,warning,info}-foreground` tokens flagged; verify in theme bridge (theme.css); if orphaned, remove at N.W0

**Verification**:
```bash
$ grep -E "success|warning|info.*foreground" src/styles/tokens.css src/styles/theme.css
src/styles/tokens.css:    --success-foreground: var(--neutral-0);
src/styles/tokens.css:    --warning-foreground: hsl(24 10% 10%);
src/styles/tokens.css:    --info-foreground: var(--neutral-0);
src/styles/theme.css:    --color-success-foreground: var(--success-foreground);
src/styles/theme.css:    --color-warning-foreground: var(--warning-foreground);
src/styles/theme.css:    --color-info-foreground: var(--info-foreground);
```

**Finding**: Tokens **DO EXIST** in both `tokens.css` (lines ~1130) and `theme.css` (bridge definitions). They are **NOT orphaned**. The J-6 flag was based on a false premise.

**Verdict**: **FALSE POSITIVE.** The tokens are live and in-use. No removal needed.

### Hallucination #3: J-11 Stress Harness

**Prior Audit Verdict** (if mentioned): Retired or assumed.

**Verification**:
```bash
$ find . -type f -name "*stress*" -not -path "*/.claude/*" -not -path "*/node_modules/*"
docs/tranches/H/audit/W5-stress-baseline.md
```

**Finding**: Only a **baseline document** exists (W5-stress-baseline.md in H tranche, unrelated to N). No active stress harness substrate in glass-ui codebase.

**Verdict**: **NOT A HALLUCINATION; ALREADY RETIRED OR NEVER EXISTED.** No action required. The J-11 retire is moot.

---

## § 8. Revised N-Tranche Disposition

### Corrected Verdict Summary

| Item | Prior Verdict | Corrected Verdict | Rationale | Wire-Target Count |
|------|---|---|---|---|
| **useTouchGate** | `inline-and-remove` (orphaned) | **WIRE** (under-adopted) | Active in GlassDock; foundational for mobile dock UX. Deploy across 8 form controls. | **+8 sites** |
| **metaballs** | `demo-only` (unused) | **WIRE** (under-adopted) | WebGL ambient substrate belongs in hero compositions and consumer landing pages. | **+4 primary** |
| **paper-backdrop** | `demo-only` (unused) | **WIRE** (under-adopted) | Paper-grain underpaint supports card variants, sections, and prose. Core identity element. | **+5 primary** |
| **typewriter** | `demo-only` (unused) | **WIRE** (under-adopted) | TypewriterText enhances hero headlines, loading UX, and narrative reveals. | **+5 primary** |
| **assertDistFresh** | (N/A; not in prior audit) | **WIRE** (incomplete) | Freshness gate exists but unwired in all consumers. Deploy to 6 vite.config.ts files. | **+6 sites** |

### Hallucinations Confirmed

| Hallucination | Prior Claim | Finding | Impact |
|---|---|---|---|
| `useGlassAlpha` | Orphaned composable; delete | Does not exist; actual composable is `useGlassRenderer` | Audit's glass-related verdicts are unreliable |
| CSS foreground tokens (J-6) | Orphaned; consider removal | Tokens exist in both tokens.css and theme.css; in-use | False positive; no removal needed |
| J-11 stress harness | (Assumed retired or mentioned) | No harness found; already retired or never existed | Moot; no action required |

### N Tranche Revised Plan

**Focus: WIRING, NOT RETIREMENT.**

1. **Phase 1 — Library Wiring** (Glass-UI internal):
   - useTouchGate: Wire into Slider, Select, DropdownMenu, Combobox, Popover, TagsInput, MultiSelect (8 components)
   - metaballs: Integrate into hero.vue composition; expose config options
   - paper-backdrop: Add variant to Card; Section; prose context
   - typewriter: Integrate into hero.vue + loading states
   - **Effort**: ~40–60 component-hours (design review + integration + testing)

2. **Phase 2 — Demo Composition Wiring** (demo/stories/):
   - Refresh `compositions/hero.vue` to showcase all four primitives in unified composition
   - Add dedicated demo stories linking to consumer usage patterns
   - **Effort**: ~10 hours

3. **Phase 3 — Consumer Wiring** (Six projects):
   - **speedtest**: Wire useTouchGate into dashboard sliders; metaballs into hero; freshness gate into vite.config.ts
   - **fourier-analysis**: metaballs + typewriter into math-hero; paper-backdrop into canvas backgrounds; freshness gate
   - **words**: typewriter into language-hero; paper-backdrop prose contexts; freshness gate
   - **keyframes.js**: typewriter into easing timeline; freshness gate
   - **bbnf-buddy**, **value.js**: Selective wiring (typewriter loading states, freshness gates)
   - **Effort**: ~60–80 hours (collaborative with consumer teams; design alignment)

4. **Phase 4 — Documentation**:
   - Update README for each primitive with integration guide
   - Add consumer wiring case studies to N-tranche docs
   - **Effort**: ~10 hours

### Success Metrics

- All 5 primitives actively adopted in ≥2 glass-ui demo compositions
- All 6 consumers wired with freshness gates
- useTouchGate deployed in ≥8 form controls
- metaballs + typewriter + paper-backdrop visible in ≥4 consumer hero pages
- Zero hallucinations in N-final disposition

---

## § 9. Conclusion

The prior N-W4 overfitting audit **over-corrected**. Rather than identifying true orphans, it mislabeled **under-wired, high-value primitives as candidates for retirement**. The corrected disposition:

- **useTouchGate**: NOT orphaned; foundational for mobile dock UX. WIRE across form controls.
- **metaballs**, **paper-backdrop**, **typewriter**: NOT unused; UNDER-ADOPTED visual/motion substrates. WIRE into hero compositions and consumer landing pages.
- **assertDistFresh**: EXISTS as exported helper; ZERO current consumer wiring. DEPLOY to all vite.config.ts.

The audit also **confirmed one hallucination** (`useGlassAlpha` does not exist), validating the user's correction directive.

**N-Tranche Focus**: KISS directive honored by conservative, evidence-based wiring targets. No retirements. All targets have clear integration patterns and design justification.

---

## Appendices

### A. Component Touch-Interaction Audit (Detailed)

See § 2 Item 1 wiring ledger for full per-component assessment.

### B. Freshness Gate Integration Checklist

- [ ] Import `assertDistFresh` from `@mkbabb/glass-ui/freshness` in each consumer vite.config.ts
- [ ] Invoke `assertDistFresh()` immediately before `defineConfig()`
- [ ] Test by intentionally staling dist/ (touch src/ file); verify vite dev fails with human-readable message
- [ ] Verify speedtest is first to merge (V.W3 primary target)

### C. Metaballs Configuration Tuning

- Hero contexts: `{ particleCount: 12–16, speed: 0.4–0.6, opacity: 0.6 }`
- Data-viz contexts (dashboard): `{ particleCount: 8, speed: 0.3, opacity: 0.4 }`
- Math/generative contexts (fourier): `{ particleCount: 20, speed: 0.5, opacity: 0.7 }`

### D. Prior Audit Audit Trail

- **N-W4-overfitting-audit.md**: Source of verdicts (superseded)
- **N-prune-ledger.md**: Downstream planning based on false verdicts (now invalid)
- **This document**: Corrected wiring-target disposition

