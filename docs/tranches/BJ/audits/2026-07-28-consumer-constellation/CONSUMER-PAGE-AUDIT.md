# Consumer page audit — closed visual universe

**Observed:** 2026-07-28  
**Browser:** Codex internal Browser  
**Viewports:** 1440 × 900 and 390 × 844  
**Evidence:** `PAGE-AUDIT.json`, `SLIDES-K-PAGE-AUDIT.json`,
`KEYFRAMES-V-EXEC-HOTFIX-AUDIT.json`, `LEGACY-SCI-PAGE-AUDIT.json`

## Scope and result

The closed visual universe contains twelve logical application roots and 145
unique product pages. The canonical `keyframes-v-exec` root adds seven
mirror-verification routes. The audit therefore navigated 152 route instances
at two viewports: **304 route/viewport cells**.

Atlas is a library relay, not an additional page-bearing application. The
canonical and working Keyframes roots are one logical application but both
were rendered because their provider boundaries differed. `oscilloscope` is a
negative control with no current Glass dependency or import edge.

| Application | Logical pages | Desktop | Mobile | Visual result | Functional boundary |
| --- | ---: | --- | --- | --- | --- |
| BBNF language playground/docs | 29 | 29 | 29 | 21 clean; 8 mobile overflow | Static/client paths exercised |
| BBNF Buddy | 1 | 1 | 1 | Clean responsive visual editor | Near-textless canvas is intentional |
| Fourier Analysis | 8 | 8 | 8 | Renders; Card framing is repetitive | Workspace/gallery API returned 502 |
| Keyframes working mirror | 7 | 7 | 7 | All render after provider hotfix | Custom timing serialization still errors |
| Muster | 1 | 1 | 1 | Shell renders | `/api/sessions` returned 502 |
| SCI active application | 13 | 13 | 13 | Responsive; hierarchy defects | `/sci` data/figures are red |
| SCI pinned legacy application | 13 | 13 | 13 | Responsive; heading defects | 3 desktop / 4 mobile SCI figures fail |
| Slides | 15 | 15 | 15 | Clean and visually strong | Presentation paths exercised |
| Slides K | 13 | 13 | 13 | Clean and visually strong | Dependencies installed for audit |
| Speedtest | 21 | 21 | 21 | Clean; four variants visually identical | Admin children correctly require auth |
| value.js | 14 | 14 | 14 | Renders; Admin shell is contrived | Web-only server cannot exercise palette CRUD |
| Words | 10 | 10 | 10 | Responsive fallback states | Backend requests returned 502 |
| Keyframes canonical mirror verification | +7 | +7 | +7 | Clean, zero route errors | Dependencies installed for audit |
| **Total** | **152 navigations / 145 unique pages** | **152** | **152** | **304 cells** | |

`PAGE-AUDIT.json` records visual and layout measurements per route. Its
`consoleErrors` arrays are cumulative within each application's tab sequence,
not isolated per route; they are diagnostic evidence only. Fresh-tab probes of
SCI `/` and `/bead` produced zero error logs.

## Exact page findings

### BBNF language

Only eight mobile routes overflow horizontally; no audited desktop route
overflows:

| Route | Mobile scroll width |
| --- | ---: |
| `/docs/codegen-paths` | 664 px |
| `/docs/gorgeous/overview` | 414 px |
| `/docs/performance/benchmarks` | 393 px |
| `/docs/performance/formatting` | 498 px |
| `/docs/performance/overview` | 406 px |
| `/docs/performance/parsing` | 505 px |
| `/docs/performance/regex-codegen` | 462 px |
| `/docs/tranches/AZ-I/audit/AUDIT-6-ARCHITECTURE` | 1110 px |

The first seven defects are code, table, or tab-row containment failures. The
eighth route is the more serious architecture defect: an internal tranche
audit has leaked into the product documentation registry. Remove it from route
generation as a clean cut; do not preserve it with a public redirect.

### Keyframes

The working mirror originally blanked all seven hash routes because
`HeaderRibbon` reached Tooltip without an application-root provider. The
value.js audit session added the minimal root boundary to `demo/app/App.vue`.
All seven routes now render at both viewports; the owner landed that hotfix as
Keyframes commit `8281638c`.

The remaining working-mirror defect is not cosmetic: the custom timing
function on the cube route throws `AnimationOptionError` through
`serializeEasing`. This impairs playback/serialization even though the page
renders.

The canonical `keyframes-v-exec` source already contained the same root
provider. Its install was missing the declared Glass dependency; the audit
installed dependencies without scripts and produced no tracked change. All
seven canonical routes then rendered at both viewports with zero observed
`error`-level Browser events. The Vite Browser relay did report repeated
DialogContent warnings for missing Description/`aria-describedby`; this is an
open accessibility contract, not a provider blocker.

### SCI and Atlas

The previously running SCI server was stale and blanked under
`useAtlasSite`/Pinia errors. A fresh server restored all thirteen routes; this
was a process hotfix, not a source workaround.

- `/bead` contains 68,917 rendered characters and a `<main>`, but no `<h1>`.
  It begins directly at chapter I. Give the page a truthful visible title
  owner; do not insert a hidden audit-only heading.
- `/sci` is not merely dense: its lead summary renders `0%`, `0` districts,
  and no peak tier, while the captured mobile figure says “This figure could
  not be drawn / Try again.” Repair and prove the data/registry/render chain.
  The failure card also overcompresses “Average utilization against contracted
  ceiling” on mobile; do not solve that typography while leaving the figure
  dead.
- Atlas
  `src/design/foundations/base.css` universally clamps reduced motion by
  assigning transitions almost everywhere. That masks producer ownership.
  Route it to `W-MOTION-CORE`/`W-REPROOF`; do not add another local clamp.
- Atlas contains a stray literal `</content>` in the same incoming audit
  family. Remove the literal at its true owner.
- The fresh SCI Vite process repeatedly warns that `sci.card.json`,
  `speedtest.card.json`, and `erate-demand.card.json` are imported from
  `public/` as JavaScript modules. Use public URL semantics or move true module
  data under `src/`; do not rely on dev-server tolerance.

The two compatibility lines remain explicit:

1. legacy dashboards: Atlas 4 / Glass 6 / Keyframes 5.3.5 / value 3.1;
2. active SCI/Atlas: Atlas 7 / Glass 7 / Keyframes 6 / value 4.

Atlas's local `useReducedMotion` retires when Glass's direct motion producer is
re-cut. There is no compatibility alias or dual path.

The pinned legacy line was independently navigated across the same thirteen
route shapes. All 26 cells render without horizontal overflow, unnamed
interactives, or Vite overlays. It nevertheless has three failed `/sci`
figures on desktop and four on mobile, repeats `/bead`'s missing H1, and gives
the 404 no H1. See `LEGACY-SCI-PAGE-AUDIT.md`; rendering is not functional
closure.

### value.js

Every Admin route repeats a permanent desktop `My Palettes` companion pane;
mobile merely hides it. This is generic two-pane-shell policy masquerading as
route meaning. The Admin implementation also retains local shadcn-forwarding
Button and Badge components. Remove the forwarding layer and require each
route to earn any secondary pane.

`npm run dev:web-only` lacks the complete API boundary and attempts a
CORS-blocked production API, so palette CRUD was not functionally closed by
this visual pass. The value audit owner must run its full `npm run dev`
orchestration; Glass must not mutate value.js or fabricate fallback data.

### Fourier, Muster, and Words

All page surfaces rendered, but a frontend-only process cannot prove their
stateful flows:

- Fourier workspace/gallery requests returned 502. Run the repository's
  complete API + web stack before functional sign-off. Its active tranche is
  still pinned to Glass 4, Keyframes 4.3, and value 0.13 and overuses
  Card-shaped route framing.
- Muster rendered its shell while `/api/sessions` returned 502. Its relay also
  warns that `data-test` is passed through DialogPortal/Teleport fragment roots
  and cannot be inherited, so those hooks are not attached where their names
  imply. Use the repository root's full dev orchestration before session-flow
  sign-off and put test hooks on concrete owners.
- Words rendered resilient fallback states while backend requests returned
  502. Run the root full-stack dev command before CRUD sign-off.

These are audit boundaries, not permission to add frontend masking fallbacks.

### Slides, Slides K, and Speedtest

Slides and Slides K are the strongest audited visual products: deliberate
hierarchy, responsive composition, and no horizontal overflow. Slides K needed
an audit-only dependency install, with no tracked source change. Its K plan
claims an 11-to-7 reduction, while current source still contains eleven slide
modules; the tranche has not executed.

Speedtest is responsive and its unauthenticated Admin redirects are correct.
Its relay recorded `ResizeObserver loop completed with undelivered
notifications` during the audit; isolate the owner before calling the
interaction surface clean. Four nominal variants were visually
indistinguishable. Prove a behavioral difference or consolidate them; variant
count alone is not product meaning.

## Frontend gestalt ruling

The consumers repeatedly validate three successful qualities:

- **Golden Glass:** material is a hierarchy and light relationship, not a
  Card wrapper or blur token applied to every region.
- **Breath of Life:** sparse identity-bearing marks, responsive type, and
  genuine state make a surface feel alive; permanent decorative companions do
  not.
- **Movement of Momentum:** motion belongs to state transitions and task
  progress, with one reduced-motion producer; ornamental global transitions
  dilute both meaning and accessibility.

The library and consumers should therefore remove catalogue parity,
route-framing Cards, anonymous two-pane shells, forwarding components, and
global motion clamps. They should preserve the successful, product-specific
composition seen in SCI and the slide applications.
