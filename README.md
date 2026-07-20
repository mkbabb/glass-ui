# glass-ui

Glassmorphic design system for Vue 3.5. Shared components, design tokens, and composables built on reka-ui and Tailwind CSS v4, with a golden-ratio typography scale.

## Install

```bash
npm install @mkbabb/glass-ui
```

## Usage

```ts
// vueuse-FREE root barrel — core primitives + core composables
import { Button, Card, Dialog } from "@mkbabb/glass-ui";

// vueuse-bearing surfaces ship as flat subpaths (the SCC-trap closure)
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { useKeyboardShortcuts, registerShortcut } from "@mkbabb/glass-ui/keyboard";
import { useCarousel } from "@mkbabb/glass-ui/carousel";
import { Input, Textarea, Combobox } from "@mkbabb/glass-ui/forms";

// per-package subpaths — one component family per dist chunk
import { GlassDock, DockLayerGroup, DockLayer } from "@mkbabb/glass-ui/dock";
import { DarkModeToggle } from "@mkbabb/glass-ui/dark-mode-toggle";
import { Configurator, useConfiguratorState } from "@mkbabb/glass-ui/configurator";
import { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui/popover";

// public types + constants live on their OWNING subpath (the 5.0.0 export reshape
// dropped the `/api` discovery layer — every symbol re-homes to its family subpath)
import type { AuroraConfig } from "@mkbabb/glass-ui/aurora";
import type { ButtonEmphasis, ButtonProps } from "@mkbabb/glass-ui/button";
import type { CardTier } from "@mkbabb/glass-ui/card";
import { DEFAULT_AURORA_CONFIG, MAX_NUCLEI } from "@mkbabb/glass-ui/aurora";
```

```vue
<Popover trigger="hover" :open-delay="120">
    <PopoverTrigger as-child>
        <Button emphasis="primary" size="lg">Run audit</Button>
    </PopoverTrigger>
    <PopoverContent>Quicker reveal for chassis actions</PopoverContent>
</Popover>
```

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@import "@mkbabb/glass-ui/styles/fonts";
@source "../node_modules/@mkbabb/glass-ui/dist"; /* template-utility content-scan */
@variant dark (&:where(.dark, .dark *));

/* override tokens locally for your project */
:root {
    --glass-opacity-resting: 0.82;
    /* the consumer-tunable radius primitive — the composed --glass-blur-resting
       threads --glass-level + saturate, never override it directly */
    --glass-blur-resting-radius: 8px;
}
```

The optional `styles/fonts` entry carries the packaged Plus Jakarta Sans and
Fira Code faces as self-contained WOFF2 data URLs. Consumers that need raw font
files can address the same built assets through `@mkbabb/glass-ui/fonts/*`.

## Documentation

The authoritative canon lives under [`docs/canon/`](./docs/canon/), with the
consumer-facing migration path in [`MIGRATION.md`](./MIGRATION.md):

- [`docs/canon/structure.md`](./docs/canon/structure.md) — the `src/` tree map
- [`docs/canon/glass-system.md`](./docs/canon/glass-system.md) — the glass tier ladder + adaptive-legibility axes
- [`docs/canon/exports-and-subpaths.md`](./docs/canon/exports-and-subpaths.md) — the public-surface layering + the `manualChunks` recipe
- [`docs/canon/dependencies.md`](./docs/canon/dependencies.md) — the peer set + the keyframes/value.js spine
- [`docs/canon/conventions.md`](./docs/canon/conventions.md) — TypeScript / token / ring conventions
- [`docs/canon/motion-system.md`](./docs/canon/motion-system.md) — the spring/bezier motion canon
- [`DESIGN.md`](./DESIGN.md) — the storybook category index

## Build

```bash
npm run dev             # storybook demo (multi-page, dock + carousel navigation)
npm run build           # library → dist/glass-ui.js + glass-ui.css + index.d.ts + per-subpath chunks
npm run typecheck       # vue-tsc --noEmit
npm run profile:bundle  # inspect bundle sizes and exact value.js capability imports
```

## Storybook

`npm run dev` launches a Vue 3 storybook under `demo/` covering every primitive, container, navigation element, data component, feedback pattern, motion demo, composable, and composition. A vertical `GlassDock` rail drives category navigation; a horizontal `Carousel` pager drives stories within a category. Keyboard: `[`/`]` prev/next story, `{`/`}` prev/next category, `,` configurator, `?` keyboard help. A dismissible right-side `Sheet` lets you live-edit font/scale/hue/grain/radius/density/cartoon-shadow/dark tokens against `:root`. See `DESIGN.md#storybook-demo` for the full category index.

## Structure

The source tree follows the concise ownership map in [`docs/canon/structure.md`](./docs/canon/structure.md):

```
src/
├── index.ts          # curated root barrel
├── forms.ts          # input-family entry
├── components/       # flat, owner-colocated component families + _shared
├── composables/      # shared composable families
├── styles/           # global tokens, glass substrate, and utilities
├── fonts/            # packaged font assets
└── html-attributes.d.ts
```

## Subpath imports

Beyond the vueuse-free root barrel, the library ships flat, independently
tree-shakable JS subpaths plus CSS and font entries. The semantic entry graph in
`scripts/lib/subpath-policy.mjs` feeds the build and generated `package.json`
exports; `scripts/verify-export-types.mjs` checks the emitted declaration paths.

```ts
// vueuse-bearing subpaths (the SCC-trap closure — the root barrel does not
// re-export these symbols)
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { useKeyboardShortcuts, registerShortcut } from "@mkbabb/glass-ui/keyboard";
import { useCarousel } from "@mkbabb/glass-ui/carousel";
import { Input, Textarea, Combobox } from "@mkbabb/glass-ui/forms";

// per-package subpaths — substrate isolation
import { GlassDock, DockLayerGroup, DockLayer } from "@mkbabb/glass-ui/dock";
import { DarkModeToggle } from "@mkbabb/glass-ui/dark-mode-toggle";
import { Aurora, useAurora } from "@mkbabb/glass-ui/aurora";
import { Configurator, useConfiguratorState } from "@mkbabb/glass-ui/configurator";
import { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui/popover";
import { InstrumentChassis } from "@mkbabb/glass-ui/instrument-chassis";
import { useSidebarState } from "@mkbabb/glass-ui/sidebar";
```

The v0.9.x nested subpaths `@mkbabb/glass-ui/composables/dark` and
`.../composables/keyboard` were flattened to `/dark` and `/keyboard` at v1.0.
The demo-only `/pagination` and `/virtual` subpaths are retired. The 5.0.0 export
reshape also dropped the pure-types `/api` discovery layer; see `MIGRATION.md`
for the owning-family re-home table.

## Glass Token System

Five tiers with 1:1 alignment across opacity, blur, background, border, and shadow. Each tier defines `--glass-{opacity,blur,bg,border,shadow}-{tier}`; consumers override the primitives at `:root` to tune intensity. `--glass-level` (a typed inheriting `@property`) is the ONE opacity+blur knob — `level=1` is the hand-tuned ladder, `level=0` is the opaque escape.

| Tier     | Class             | Use                                           |
| -------- | ----------------- | --------------------------------------------- |
| Wash     | `.glass-wash`     | Dock backgrounds, input fills, hover overlays |
| Quiet    | `.glass-quiet`    | Inline workspace chrome                       |
| Resting  | `.glass-resting`  | Cards, content containers                     |
| Floating | `.glass-floating` | Popovers, tooltips, dropdowns                 |
| Overlay  | `.glass-overlay`  | Dialogs, command palette, modals              |

Convenience classes bundle a tier with a shape: `.glass-card` (resting + `--radius-card` + offset card shadow) and `.glass-pill` (resting + pill radius + press feedback). Commands use `<Button>` so geometry, semantics, focus, and press behavior retain one owner. See [`docs/canon/glass-system.md`](./docs/canon/glass-system.md) for the adaptive-legibility axes (`--glass-tint-*`, `--glass-accent`, the dark transmissive-material arm).

## Design Tokens

`src/styles/tokens/` defines the shared `:root` properties consumed by all style modules and components — duration, easing (`--spring-{smooth,snappy,bouncy,gentle}` + `--spring-<name>-duration` clocks), z-index, radius (primitive + semantic), shadows (composed via `color-mix(in srgb, var(--shadow-color) N%, transparent)`), the 5-tier glass ladder, paper/grain textures, the `--surface-tint-*` family, and the warm-chroma color palette. Consumers override any token locally per project.

## Typography

Type scale based on √φ ≈ 1.272 (modulated golden ratio); each step is φ^(n/2) of the base. Semantic classes run `.text-micro` → `.text-body` → `.text-heading` → `.text-title` → the audacious `.text-display-*` ladder. The `@theme` block in `theme.css` maps these to Tailwind's `--font-size-*` tokens, so `text-sm` / `text-lg` adopt the golden-ratio scale.

## Conventions

- TypeScript `strict:true`, `verbatimModuleSyntax:true`; `moduleResolution:bundler`, `target:ES2022`, `lib:ES2023`
- `import type` for all type-only imports; named exports only, no defaults
- reka-ui primitives for polymorphic/accessibility behavior; typed semantic props and owner-colocated CSS for component appearance
- Color tokens are **complete `hsl()` colors** — `--primary: hsl(24 10% 10%)`, consumed directly as `var(--primary)`. NEVER `hsl(var(--token))` (double-wrapping is invalid and never paints); for an alpha derivative use `color-mix(in srgb, var(--token) N%, transparent)`
- `cn()` normalizes Vue-compatible class values and applies a small conflict-bucket deduplicator

See [`docs/canon/conventions.md`](./docs/canon/conventions.md) for the full set.

## Dependencies

All runtime deps are peer — glass-ui declares them in `peerDependencies` and ships none in its own `dependencies` bundle, so the consumer's single Vue / Tailwind / reka-ui spine is reused rather than re-vendored.

| Package                         | Role                                                              |
| ------------------------------- | ----------------------------------------------------------------- |
| `vue` ^3.5                      | Framework                                                         |
| `reka-ui` ^2.0                  | Headless UI primitives                                            |
| `@vueuse/core` ^14.0            | useDark, createGlobalState, useEventListener (optional peer)      |
| `tailwindcss` ^4.0              | Utility CSS                                                       |
| `embla-carousel-vue` ^8.0       | Carousel substrate (optional peer)                                |
| `@lucide/vue` ^1.16.0           | Icon set (the renamed v1 package; was `lucide-vue-next` pre-v1.0) |
| `@mkbabb/keyframes.js` ^6.0.0   | Spring/keyframe runtime (optional peer)                           |
| `@mkbabb/value.js` ^4.0.0       | Color and easing capabilities (optional peer)                     |
| `@mkbabb/pencil-boil` ^0.9.2    | Hand-mark freehand core (optional peer)                           |
| `tw-animate-css` ^1.2.5         | `animate-in`/`animate-out` data-state utilities (optional peer)   |

`tw-animate-css` is required only for the animated overlay surfaces (Dialog / Sheet / Popover / DropdownMenu emit `animate-in`/`animate-out` data-state utilities); a Button-only consumer never needs it. See [`docs/canon/dependencies.md`](./docs/canon/dependencies.md).

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). The README shape follows the perimeter-level
[canonical README shape](./docs/precepts/canonical-readme-shape.md).

## License

[MIT](./LICENSE) © 2026 Mike Babb.
