# BC Route Census — every demo route vs BC.W-PAGE-CHASSIS

**Scope:** the full `demo/stories/**` route set, audited against the BC.W-PAGE-CHASSIS standard (USER-DEFECTS §C/§G + ORCHESTRATION Band 5): audacious LARGE hero title + subtitle + explicit subpath + scroll-to-shrink + ONE glass card + procedural bg + delimited sections (hr/cards) + code-blocks/Fira + no superfluity. All findings file:line-grounded; structural numbers live-probed on `:5199` (server up, 200) + grepped.

---

## 0 — The chassis as it exists today (the standard's current implementation)

The page chassis is a 3-file stack: `demo/stories/StoryPage.vue` → `StoryHero.vue` → `StoryHeader.vue`, plus `StorySection.vue` for body sections. The manifest (`demo/stories/manifest.ts`) declares each route's `background` + `hero` flag; `demo/router.ts` derives routes from it (`/:category/:story`); `firstStoryPath()` → `/foundations/intro` IS the homepage.

**What the chassis DOES provide today:**
- `StoryPage.vue:62` wraps the body in `<article class="scroll-build mx-auto w-full max-w-6xl">`.
- On a **CONTENT page** (`variant==='page'`, i.e. NO `hero:true` in the manifest): a chrome `<header>` renders eyebrow (`text-admin-label`) → `<h1 class="text-title">` (32.9px / 700, `StoryPage.vue:85`) → blurb. Then `StoryHero` wraps the slot in a glass `<Card tier="resting">` (16px radius, confirmed live).
- On a **HERO page** (`hero:true`): the chrome header is suppressed (`StoryPage.vue:72 v-if="variant==='page'"`); `StoryHero` renders the ordered `StoryHeader` cluster (eyebrow → `<h1 class="story-hero-title text-display-3">` (67.78px, confirmed live) → blurb), either full-bleed over a live field or in a `quiet`/`floating` glass card.
- The hero `<h1>` entrance is a one-shot fade-RISE on mount (`story-hero.css:192 @keyframes story-hero-title-rise`, `--ease-out`, 0.62s).
- `StorySection.vue` offers a `heading=` prop → semantic `<h2 class="text-subheading">` (20.4px), a `label=` mono eyebrow, and a `blurb=`.

**What the chassis does NOT provide (the BC gaps):**
1. **NO scroll-to-shrink ANYWHERE.** Grep + read of `StoryHero.vue`, `story-hero.css`, `AppShell.vue`, `StoryPage.vue` finds NO scroll-timeline / `IntersectionObserver` / scroll-handler that shrinks the hero title as you scroll. The `--card-scroll` scroll-shrink primitive exists in `src/` (`ScrollCard`/`ScrollCardHeader`, `<CardHeader shrink>`) but is NOT wired into the page chassis. The user's headline bar ("EVERY PAGE must have an audacious, LARGE, hero-like header that SHRINKS as you scroll" — USER-DEFECTS §C, §E aurora item) is **0% implemented at the page level**.
2. **The audacious display register reaches only 12 routes.** `grep -c "hero: true" manifest.ts` → **12**. Every other route's title is the 32.9px `text-title` chrome `<h1>` — NOT audacious. The √φ ladder peaks at `--type-display-audacious` (352px, `scale.css:142`) but content pages never go above `text-title`.
3. **The subpath is NOT explicitly defined per page.** The eyebrow is `"{Category} · {Story}"` (`StoryPage.vue:26-30`) — e.g. "Forms · Inputs", NOT the import subpath (`@mkbabb/glass-ui/...`). The user's bar ("its subpath explicitly defined" — USER-DEFECTS §E aurora) is unmet.

---

## 1 — THREE competing header idioms (the structural root of "every page needs standardization")

The census found **THREE mutually-incompatible header treatments** across the route set:

| idiom | count | what it is | where |
|---|---|---|---|
| **A — audacious chassis hero** | 12 | StoryHero renders `text-display-3` (67.78px) hero `<h1>` over a live/contained field | manifest `hero:true` rows |
| **B — hand-rolled SUFFUSE2 IconChip header** | 41 | a `border-l-[3px]` accent rail + `<IconChip>` + small `text-admin-label` eyebrow + `text-small` blurb, INSIDE the StoryPage body slot | forms/* (11), containers/* (15), data (table/data-table/timeline×3/timeline-continuous), feedback (alert/toast/notification/confirm-dialog/progress/skeleton), display/badge, navigation/* (3) |
| **C — plain chrome title only** | ~60 | StoryPage's 32.9px `text-title` chrome `<h1>`, no audacious moment, no accent | foundations/*, motion/*, data/*, compositions/*, dock/*, display/* |

Idiom B (`grep -c border-l-[3px]` → **41 SFCs**) is the worst offender: it is a SECOND header rendered INSIDE the body, redundant with StoryPage's own chrome `<header>` above it (so these pages carry eyebrow→title→blurb in the chrome header AND a competing IconChip eyebrow+blurb below it). Example `forms/inputs.vue:23-41` — the chrome header says "Forms · Inputs" + the page blurb, then a `border-l-[3px]` IconChip header repeats "Forms · Text entry" + a near-identical blurb. This is a literal double-descriptor.

**BC.W-PAGE-CHASSIS must collapse all three onto ONE chassis hero** (audacious display title + subtitle + subpath + per-category icon + scroll-shrink). The IconChip/SUFFUSE2 accent identity should be FOLDED INTO the one chassis hero (the icon becomes the per-category hero icon, USER-DEFECTS §G/D6 "hero items… should have ICONS"), not a competing second header.

---

## 2 — Section delimiting (the "delimit sections with hr OR cards" bar — essentially unmet)

- `StorySection.vue` provides the canonical semantic section heading via `heading=` → `<h2 class="text-subheading">`. **70 SFCs import StorySection, but only 13 pass `heading=`.** The other 57 use it only as a `label`/`blurb` wrapper, leaving sections as bare `flex flex-col gap-3` stacks with no visible heading hierarchy.
- **38 SFCs hand-roll `<h2 class="text-subheading">` directly** (bypassing StorySection's heading rung) — e.g. `display/card.vue` (9), `dock/overview.vue` (11), `forms/inputs.vue` (6), the containers band (2-3 each).
- **Section DELIMITERS are absent:** only **3 routes** use `<Separator>` and **1** uses `<hr>` between sections across 113 routes. Sections flow as undelimited gap stacks (`gap-10` between StorySection blocks per `StoryPage.vue:120`). Live-probed `forms/inputs` (resolved as Tabs route): **7 sections, 0 separators**. The user's bar ("Each section must be properly delimited with hr lines OR in different cards… EVERY PAGE — USER-DEFECTS §C") is met by ~0% of routes.

**BC.W-PAGE-HIERARCHY must:** (a) make every named section reach the canonical heading rung; (b) add a delimiter register (an `<hr>`/Separator or a per-section sub-card) the chassis applies automatically; (c) collapse the 38 hand-rolled `text-subheading` headings onto StorySection.

---

## 3 — Code-block / Fira Code (the "component names + technical values → code blocks + Fira Code" bar — 3-way split)

- `@utility fira-code` is defined at `src/styles/typography/utilities.css:81`. The canonical code style is `class="fira-code"`.
- **The code style is fractured 3 ways:** 57 SFCs use `fira-code`, 24 use `class="font-mono"` on `<code>`, and 70 use bare `<code>` with no font class. `display/card.vue` is the worst — **45 `font-mono` occurrences, 0 fira-code**. `compositions/form-validation` (9 font-mono), `containers/popover`/`collapsible` (6 each), `feedback/progress` (6 font-mono).
- Many component names / technical values are inline prose, not code blocks at all (e.g. tier names in `display/card.vue:101-108` mix `<code class="font-mono text-xs">` with prose; `compositions/settings.vue` has 0 code styling for its token names).

**BC.W-CODE-BLOCKS must:** mint ONE code-block treatment (a `<code class="fira-code">` inline rung + a multi-line block rung), collapse the `font-mono`/bare-`<code>` dialects onto it, and ensure every component name + technical value (px values, token names, subpaths) is a code block.

---

## 4 — The user-flagged specific offenders (root-caused)

### `/foundations/intro` (the homepage; `intro.vue`) — THREE heroes (USER-DEFECTS §G "THREE heros")
`intro.vue` is `hero:true` + `:hero-title="false"`. It stacks THREE display moments in the bleed-content:
1. The wordmark cluster `<span class="fourier-f text-display-3">ℱ</span>` + `<span class="cm-serif text-display-2"> glass-ui</span>` (`intro.vue:56-59`).
2. `<h1 class="text-display-4">Glass, paper, and the golden ratio.</h1>` (`intro.vue:61`).
3. (The chassis hero `<h1>` is suppressed via `:hero-title="false"`, but the live aurora background still reads as a hero band.)
Plus the category index grid (`intro.vue:76-114`). **Three display-register type masses + a grid in one viewport.** Cover: **BC.W-COMPOSITIONS-HERO** + **BC.W-PAGE-CHASSIS** — collapse to ONE audacious hero (the wordmark IS the hero title), demote the tagline to subtitle.

### `/compositions/hero` (`hero.vue`) — duplicates the homepage + carries "View the source" (USER-DEFECTS §G, §C)
`hero.vue` is `hero:true` + `:hero-title="false"`, structurally near-identical to `intro.vue`: a `text-display-4` typewriter headline (`hero.vue:99`), a `text-prose` blurb, a `claims` grid of 3 `§01/§02/§03` cards (`hero.vue:53-69, 183-208`). The user: "EXACT same content as the homepage." It also carries **`<Button variant="ghost">View the source</Button>`** (`hero.vue:175`) — the "View source BS" the user demands removed. Cover: **BC.W-COMPOSITIONS-HERO** (make it distinct — a real composition showcase, not a second front-door) + **BC.W-PAGE-PRUNE** (kill "View the source").

### `/substrates/aurora` (`aurora.vue`) — bypasses the chassis; non-semantic title; configurator placement (USER-DEFECTS §E)
`aurora.vue` does NOT import StoryPage (one of only 4 SFCs that don't, the other 3 being chassis primitives). It hand-rolls `<header class="flex flex-col gap-1">` with `<span class="section-label">Substrates · Aurora</span>` + `<span class="text-display-3" style="color:var(--motion-accent)">Aurora</span>` (`aurora.vue:116-124`). **Live-probed: the title is a `<span>`, NOT an `<h1>`** (a11y defect — no heading element on the page) at 67.78px, no StoryHero card, no chrome h1. The configurator is the `<Configurator>` shell's `#controls` slot (`AuroraConfigDock`, `aurora.vue:158-166`) — the user wants controls on the RIGHT on desktop (USER-DEFECTS §E + Band 6 BC.W-CONFIG-RIGHT). The header "is good but should be larger + shrink on scroll" — confirmed it does NOT shrink. Cover: **BC.W-PAGE-CHASSIS** (route this through the chassis, semantic `<h1>`, scroll-shrink, subpath `/aurora`) + **BC.W-CONFIG-RIGHT**.

### `/display/card` (`card.vue`) — "literally every card is wrong" (USER-DEFECTS §C, §D)
`card.vue` (569 lines) uses StoryPage but hand-rolls its own per-section `<header>` + `<h2 class="text-subheading">` (`card.vue:100-110`), uses **45 `font-mono`** code styles (worst code-style offender, 0 fira-code), and embeds inline `<Aurora>` backdrops inside the card grid (`card.vue:128`). The "every card padding wrong" is the Card primitive's W-CARD-PAD register (a separate Band; the page is the witness surface). Cover: **BC.W-PADDING-CANON** (the witness) + **BC.W-CODE-BLOCKS** + **BC.W-PAGE-HIERARCHY** (collapse the hand-rolled headings).

### `/display/separator` (`separator.vue`) — "TOTALLY broken" + text centering (USER-DEFECTS §C, §C "text not centered")
`separator.vue` (74 lines) hand-rolls raw `rounded-card border border-border bg-card p-6` divs (`separator.vue:11,24,33,48`) instead of `<Card>`. The "TOTALLY broken" + "text not centered" likely refer to the `Separator` component's label centering (`Separator class="my-6" label="or"` at line 26) AND/OR the raw-card chrome. Cover: **BC.W-SEPARATOR-FIX** (rebuild the page + fix label centering) + the Separator component itself (Band 5 W-SEPARATOR-FIX).

### `/containers/dialog` (`dialog.vue`) — dialog padding + "glass dialog NOT glassy" (USER-DEFECTS §C, §D)
`dialog.vue` uses StoryPage + the SUFFUSE2 IconChip header (`dialog.vue:39-57`), 3 hand-rolled `text-subheading` sections, 2 `font-mono` codes. The "dialog padding wrong" + "glass dialog not glassy at all" are the Dialog primitive defects (Band 1 BC.W-DIALOG-GLASS) — this page is the witness. Cover: **BC.W-DIALOG-GLASS** (primitive) + **BC.W-PADDING-CANON** (dialog padding) + **BC.W-PAGE-CHASSIS** (the SUFFUSE2 header fold).

### `/dock/overview` (`overview.vue`) — "TOTALLY broken, blurry, a mess" (USER-DEFECTS §A)
`overview.vue` (651 lines) uses StoryPage + 11 hand-rolled `text-subheading` sections, NO StorySection headings, 0 separators. The dock-broken defects are Band 2 (BC.W-DOCK-ENGINE etc.); the PAGE-level defect is the 11 undelimited hand-rolled sections + no chassis hero. Cover: **BC.W-PAGE-HIERARCHY** + the dock band.

---

## 5 — Orphaned routes (superfluity — the "prune" bar, USER-DEFECTS §C)

`demo/stories/composables/*.vue` — **21 SFCs** still on disk (`use-clipboard`, `use-token-color`, `use-raf-loop`, …) but the manifest comment (`manifest.ts:13-15`) says the Composables shelf "was removed at AZ.W-SHELL-CONFIG — the demo IA no longer carries the 22-story reference category; clean break". They have NO manifest row → NO route → unreachable dead SFCs. Cover: **BC.W-PAGE-PRUNE** — delete the orphaned `composables/` tree (or formally re-decide). (NOTE: `use-spring-orchestrator.vue` and a few may be referenced elsewhere — verify before delete.)

---

## 6 — The full route table (113 routes)

Legend: **Hero** = manifest `hero:true` (gets audacious chassis hero). **BG** = manifest background. **Hdr idiom**: A=audacious-chassis / B=SUFFUSE2-hand-rolled / C=plain-chrome-title / X=bypasses-chassis. **§Hdg** = uses StorySection `heading=` (canonical). **Code** = dominant code style (fira/font-mono/none). **Defects** cross-ref USER-DEFECTS.

### Foundations (13)
| route | Hero | BG | Hdr | §Hdg | Code | defects / notes | wave |
|---|---|---|---|---|---|---|---|
| /foundations/intro | y(:hero-title=false) | aurora | A(custom) | no | none | **THREE heroes** (wordmark + display-4 tagline + grid); homepage | BC.W-COMPOSITIONS-HERO, BC.W-PAGE-CHASSIS |
| /foundations/colors | n | paper | C | yes(2) | fira(2) | no audacious hero; promote rainbow to focal (D §C) | BC.W-PAGE-CHASSIS, BC.W-HERO-AUDACIOUS |
| /foundations/typography | n | paper | C | yes(3) | none | type page rendered at small chrome title (irony) | BC.W-PAGE-CHASSIS |
| /foundations/radii | n | paper | C | yes(2) | none | "items not rounded" witness | BC.W-PAGE-CHASSIS, BC.W-GHOST-DASHED |
| /foundations/shadows | n | paper | C | yes(2) | none | — | BC.W-PAGE-CHASSIS |
| /foundations/motion | n | constellation | C | no | fira(1) | — | BC.W-PAGE-CHASSIS |
| /foundations/paper-glass | y | paper | A | no | none(subH×4 hand-rolled) | glass-tier demo; hand-rolled subheadings | BC.W-PAGE-HIERARCHY |
| /foundations/icons | n | paper | C | yes(3) | font-mono(2) | promote IconChip pops to focal (§C) | BC.W-PAGE-CHASSIS, BC.W-HERO-AUDACIOUS |
| /foundations/surface-tints | n | paper | C | no | fira(2) | — | BC.W-PAGE-CHASSIS |
| /foundations/overlays-scrims | n | paper | C | no | fira(1) | — | BC.W-PAGE-CHASSIS |
| /foundations/chart-chassis-palette | n | paper | C | no | none | — | BC.W-PAGE-CHASSIS |
| /foundations/paper-backdrop-texture-system | n | paper | C | no | fira(13) | verbose name; prune copy | BC.W-PAGE-PRUNE, BC.W-PAGE-CHASSIS |
| /foundations/css-utilities | n | paper | C | no | fira(8) | — | BC.W-PAGE-CHASSIS |

### Substrates (10)
| route | Hero | BG | Hdr | §Hdg | Code | defects / notes | wave |
|---|---|---|---|---|---|---|---|
| /substrates/aurora | y(manifest) | aurora | **X(bypasses chassis)** | no | none | title is `<span>` not `<h1>`; no chassis; configurator placement; no scroll-shrink; "renders slow/TOTALLY broken" (Band 4) | BC.W-PAGE-CHASSIS, BC.W-CONFIG-RIGHT |
| /substrates/blob | y | paper | A | no | fira(1) | "TWO headers IN the card"; blob broken (Band 4) | BC.W-PAGE-CHASSIS, Band4 |
| /substrates/constellation | y | constellation | A | no | font-mono(11) | "not in a card"; low-res (Band 4); 11 font-mono | BC.W-PAGE-CHASSIS, BC.W-CODE-BLOCKS |
| /substrates/fourier-field | y | fourier | A | no | none | fourier DUPLICATIVE (collapse to one) | BC.W-FOURIER-ONE |
| /substrates/fourier-studio | y | paper | A | no | none | fourier duplicate | BC.W-FOURIER-ONE |
| /substrates/glass-material | y | aurora | A | no | none(subH via StorySec×19) | glass-duplicate prune (§D) | BC.W-GLASS-PRUNE |
| /substrates/glass-panel | n | grid | C | no | fira(2) | "why so many glass duplicates" (§D) | BC.W-GLASS-PRUNE, BC.W-PAGE-CHASSIS |
| /substrates/dot-flow-field | y | grid | A | yes(1) | font-mono(2) | "awful, noise not waves"; teal-on-navy preset (§E) | BC.W-DOTFLOW-WAVES, BC.W-TEAL-NAVY-PURGE |
| /substrates/concentric | y | grid | A | yes(1) | font-mono(2) | "awful → ellipsoid lines/waves" (§E) | BC.W-CONCENTRIC-LINES |

### Forms (11) — ALL idiom B (SUFFUSE2 hand-rolled header)
| route | Hero | BG | Hdr | §Hdg | Code | notes | wave |
|---|---|---|---|---|---|---|---|
| /forms/inputs | n | grid | **B** | no(subH×6) | fira(9) | double-descriptor (chrome + SUFFUSE2); inline invalid-ring respell (line 78) | BC.W-PAGE-CHASSIS, BC.W-PAGE-HIERARCHY |
| /forms/textarea | n | grid | B | no(subH×4) | fira(4) | double-descriptor | BC.W-PAGE-CHASSIS |
| /forms/checks | n | grid | B(×2) | no(subH×3) | none | "radios don't work" witness (§F) | BC.W-RADIO-FIX, BC.W-PAGE-CHASSIS |
| /forms/slider | n | grid | B | no | none | — | BC.W-PAGE-CHASSIS |
| /forms/number-field | n | grid | B | no | fira(3) | — | BC.W-PAGE-CHASSIS |
| /forms/select | n | grid | B | no | fira(1) | "dropdown shifts/dot occluded" (§F) | BC.W-DROPDOWN-FIX, BC.W-PAGE-CHASSIS |
| /forms/combobox | n | grid | B | yes(2) | none | — | BC.W-PAGE-CHASSIS |
| /forms/multi-select | n | grid | B | no | none | — | BC.W-PAGE-CHASSIS |
| /forms/toggle | n | grid | B | no | none | "square borders" witness (§F) | BC.W-CONTROL-SMOOTH, BC.W-PAGE-CHASSIS |
| /forms/toggle-chip | n | grid | B | no(StorySec×5) | fira(1) | — | BC.W-PAGE-CHASSIS |
| /forms/label | n | grid | B | no | none | — | BC.W-PAGE-CHASSIS |

### Display (11)
| route | Hero | BG | Hdr | §Hdg | Code | notes | wave |
|---|---|---|---|---|---|---|---|
| /display/buttons | n | paper | C | yes(7) | fira(2) | "buttons don't work" witness (§C); button glass (Band 1) | BC.W-BUTTON-GLASS-IOS, BC.W-PAGE-CHASSIS |
| /display/card | n | paper | C | no(subH×9) | **font-mono(45)** | "literally every card wrong"; worst code-style offender | BC.W-PADDING-CANON, BC.W-CODE-BLOCKS, BC.W-PAGE-HIERARCHY |
| /display/badge | n | paper | B | no(StorySec×17) | none | — | BC.W-PAGE-CHASSIS |
| /display/separator | n | paper | C | no(StorySec×9) | none | **"TOTALLY broken"** + text centering; raw bg-card divs | BC.W-SEPARATOR-FIX |
| /display/section | n | paper | C | no(StorySec×11, subH×1) | fira(2) | — | BC.W-PAGE-CHASSIS |
| /display/metric-badge | n | paper | C | no | none | no header at all (StorySec=0) | BC.W-PAGE-CHASSIS |
| /display/metric-pill | n | paper | C | no | none | no header | BC.W-PAGE-CHASSIS |
| /display/status-dot | n | paper | C | no(StorySec×7) | fira(3) | — | BC.W-PAGE-CHASSIS |
| /display/pulse | n | paper | C | no(StorySec×11) | none | — | BC.W-PAGE-CHASSIS |
| /display/stacked-icons | n | paper | C | no(StorySec×7) | fira(1) | — | BC.W-PAGE-CHASSIS |
| /display/dark-mode-toggle | n | paper | C | no(StorySec×9) | fira(2) | — | BC.W-PAGE-CHASSIS |

### Containers (14) — ALL idiom B
| route | Hero | BG | Hdr | §Hdg | Code | notes | wave |
|---|---|---|---|---|---|---|---|
| /containers/dialog | n | grid | B | no(subH×3) | font-mono(2) | dialog padding + "not glassy" (§C/§D) | BC.W-DIALOG-GLASS, BC.W-PADDING-CANON |
| /containers/sheet | n | grid | B | no(subH×2) | font-mono(3) | — | BC.W-PAGE-CHASSIS |
| /containers/drawer | n | grid | B | no(subH×2) | font-mono(2) | — | BC.W-PAGE-CHASSIS |
| /containers/popover | n | grid | B | no(subH×2) | font-mono(6) | — | BC.W-CODE-BLOCKS, BC.W-PAGE-CHASSIS |
| /containers/dropdown-menu | n | grid | B | no(subH×1) | none | dropdown shift/dot (§F) | BC.W-DROPDOWN-FIX |
| /containers/context-menu | n | grid | B | no(subH×2) | font-mono(1) | — | BC.W-PAGE-CHASSIS |
| /containers/hover-card | n | grid | B | no(subH×2) | font-mono(2) | — | BC.W-PAGE-CHASSIS |
| /containers/tooltip | n | grid | B | no(subH×3) | font-mono(1) | — | BC.W-PAGE-CHASSIS |
| /containers/accordion | n | grid | B | no(subH×2) | font-mono(3) | — | BC.W-PAGE-CHASSIS |
| /containers/collapsible | n | grid | B | no(subH×2) | font-mono(6) | — | BC.W-CODE-BLOCKS, BC.W-PAGE-CHASSIS |
| /containers/hover-popover | n | grid | B | no | none | — | BC.W-PAGE-CHASSIS |
| /containers/expandable-container | n | grid | B | no(StorySec×4) | fira(2) | "WTF is this — clipped?" candidate (§C) | BC.W-PAGE-CHASSIS |
| /containers/command | n | grid | B | yes(3, subH×2) | none | — | BC.W-PAGE-CHASSIS |
| /containers/spa-view | n | grid | B | yes(1) | fira(1) | — | BC.W-PAGE-CHASSIS |

### Navigation (3) — idiom B
| route | Hero | BG | Hdr | §Hdg | Code | notes | wave |
|---|---|---|---|---|---|---|---|
| /navigation/tabs | n | aurora | B | yes(7, StorySec×14) | none | "NOT liquid glass, not pills" (§B); the headline tabs defect | BC.W-TABS-IOS, BC.W-PAGE-CHASSIS |
| /navigation/carousel | n | aurora | B | no(subH×3) | none | — | BC.W-PAGE-CHASSIS |
| /navigation/header-ribbon | n | aurora | B | no(StorySec×3) | none | — | BC.W-PAGE-CHASSIS |

### Dock (7) — plain chrome, undelimited
| route | Hero | BG | Hdr | §Hdg | Code | notes | wave |
|---|---|---|---|---|---|---|---|
| /dock/overview | n | grid | C | no(subH×11) | none | "TOTALLY broken, blurry, mess" (§A); 11 undelimited sections | Band2, BC.W-PAGE-HIERARCHY |
| /dock/layers | n | grid | C | no(subH×6) | none | dock layers (§A) | Band2, BC.W-PAGE-HIERARCHY |
| /dock/rail | n | grid | C | no(subH×4) | none | vertical dock "not clickable" (§A) | BC.W-DOCK-VERTICAL-FIX |
| /dock/morph-showcase | n | grid | C | no(subH×1) | none | "morph turns white" (§A) | BC.W-LIQUID-MORPH |
| /dock/sections | n | grid | C | no(subH×1) | none | — | Band2 |
| /dock/cta-receive | n | grid | C | no(subH×1) | none | — | Band2 |

### Data (15)
| route | Hero | BG | Hdr | §Hdg | Code | notes | wave |
|---|---|---|---|---|---|---|---|
| /data/table | n | grid | B | no | fira(3) | — | BC.W-PAGE-CHASSIS |
| /data/data-table | n | grid | B | no(subH×2) | fira(2) | — | BC.W-PAGE-CHASSIS |
| /data/tags-input | n | grid | C | no | fira(1) | no header (StorySec=0) | BC.W-PAGE-CHASSIS |
| /data/avatar | n | grid | C | no(subH×1) | fira(1) | — | BC.W-PAGE-CHASSIS |
| /data/sortable-list | n | grid | C | no | fira(1) | — | BC.W-PAGE-CHASSIS |
| /data/infinite-scroll | n | grid | C | no(subH×1) | fira(2) | — | BC.W-PAGE-CHASSIS |
| /data/timeline | n | grid | B | no | fira(1) | — | BC.W-PAGE-CHASSIS |
| /data/timeline-segmented | n | grid | B | no | fira(1) | — | BC.W-PAGE-CHASSIS |
| /data/timeline-continuous | n | grid | B | no | fira(1) | — | BC.W-PAGE-CHASSIS |
| /data/search | n | grid | C | no(subH×2) | fira(16) | — | BC.W-PAGE-CHASSIS |
| /data/scrolling-text | n | grid | C | no(StorySec×7) | fira(1) | — | BC.W-PAGE-CHASSIS |
| /data/metric-cell | n | grid | C | no(StorySec×7) | none | — | BC.W-PAGE-CHASSIS |
| /data/metric-stack | n | grid | C | no(StorySec×7) | none | — | BC.W-PAGE-CHASSIS |

### Feedback (7) — idiom B
| route | Hero | BG | Hdr | §Hdg | Code | notes | wave |
|---|---|---|---|---|---|---|---|
| /feedback/alert | n | paper | B | no(subH×6) | none | — | BC.W-PAGE-CHASSIS |
| /feedback/toast | n | paper | B | no | font-mono(1) | — | BC.W-PAGE-CHASSIS |
| /feedback/toaster | n | paper | C | no(StorySec×5) | fira(1) | — | BC.W-PAGE-CHASSIS |
| /feedback/notification | n | paper | B | no | font-mono(1) | — | BC.W-PAGE-CHASSIS |
| /feedback/progress | n | paper | B | no(StorySec×15) | font-mono(6) | — | BC.W-CODE-BLOCKS, BC.W-PAGE-CHASSIS |
| /feedback/skeleton | n | paper | B | no(StorySec×7) | font-mono(2) | — | BC.W-PAGE-CHASSIS |
| /feedback/confirm-dialog | n | paper | B | no | none | — | BC.W-PAGE-CHASSIS |

### Motion (9)
| route | Hero | BG | Hdr | §Hdg | Code | notes | wave |
|---|---|---|---|---|---|---|---|
| /motion/springs | n | constellation | C | no(StorySec×5) | fira(2) | — | BC.W-PAGE-CHASSIS |
| /motion/curve-gallery | n | grid | C | no(subH×2) | none | — | BC.W-PAGE-CHASSIS |
| /motion/scroll-vt | n | constellation(default) | C | no(StorySec×9) | none | — | BC.W-PAGE-CHASSIS |
| /motion/scroll-choreography | n | constellation | C | yes(3) | fira(6) | — | BC.W-PAGE-CHASSIS |
| /motion/countup | n | constellation | C | no | fira(7) | no header | BC.W-PAGE-CHASSIS |
| /motion/reveal | n | constellation | C | yes(2, subH×1) | fira(7) | — | BC.W-PAGE-CHASSIS |
| /motion/typewriter | n | constellation | C | no | fira(3) | no header | BC.W-PAGE-CHASSIS |
| /motion/handmark | n | paper | C | yes(1, StorySec×15) | none | — | BC.W-PAGE-CHASSIS |
| /motion/animated-digit | n | constellation | C | no(StorySec×5) | none | — | BC.W-PAGE-CHASSIS |

### Compositions (13)
| route | Hero | BG | Hdr | §Hdg | Code | notes | wave |
|---|---|---|---|---|---|---|---|
| /compositions/hero | y(:hero-title=false) | constellation | A(custom) | no | none | **==homepage**; "View the source" copy (line 175) | BC.W-COMPOSITIONS-HERO, BC.W-PAGE-PRUNE |
| /compositions/math-paper | n | grid | B(×3) | no | fira(5) | — | BC.W-PAGE-CHASSIS |
| /compositions/auth-shell | y | fourier | A | no(subH×1) | none | — | BC.W-PAGE-CHASSIS |
| /compositions/settings | n | grid | C | no | none | "totally illegible/superfluous" candidate (§C) | BC.W-PAGE-PRUNE, BC.W-PAGE-CHASSIS |
| /compositions/empty-states | n | paper | C | no | none | ghost items → dashed (§C) | BC.W-GHOST-DASHED |
| /compositions/drawer-live-behind | n | (fourier?) | C | no(StorySec×5) | none | — | BC.W-PAGE-CHASSIS |
| /compositions/configurator | n | grid(default) | C | no(StorySec×5) | fira(1) | controls-on-right (§F) | BC.W-CONFIG-RIGHT |
| /compositions/instrument-chassis | n | grid | C | no | none | no header | BC.W-PAGE-CHASSIS |
| /compositions/form-validation | n | grid | C | no(subH×3) | font-mono(9) | — | BC.W-CODE-BLOCKS, BC.W-PAGE-CHASSIS |
| /compositions/gate-pattern | n | grid | C | no(StorySec×3) | none | — | BC.W-PAGE-CHASSIS |
| /compositions/labeled-field | n | grid | C | no(StorySec×7) | none | — | BC.W-PAGE-CHASSIS |
| /compositions/icon-tooltip | n | grid | C | no(StorySec×4) | none | — | BC.W-PAGE-CHASSIS |

### Orphaned (no route — superfluity)
21 `demo/stories/composables/*.vue` SFCs on disk with NO manifest row → unreachable. Cover: **BC.W-PAGE-PRUNE** (delete or re-decide).

---

## 7 — Summary of the BC.W-PAGE-CHASSIS deltas (what every wave must deliver)

1. **ONE chassis hero, audacious by default** — every route renders an audacious LARGE display-register `<h1>` (text-display-3+ on content, text-display-4/5 on heroes), a subtitle, the explicit import subpath (`@mkbabb/glass-ui/...`), and a per-category icon. Collapse idioms A/B/C onto this one. (BC.W-PAGE-CHASSIS + BC.W-HERO-AUDACIOUS + BC.W-COMPOSITIONS-HERO)
2. **Scroll-to-shrink** — wire the `--card-scroll`/scroll-timeline shrink primitive (already in `src/` as ScrollCardHeader) into the chassis hero so it shrinks on scroll. Currently 0% implemented. (BC.W-PAGE-CHASSIS)
3. **Delimited sections** — every named section reaches StorySection's `heading=` rung; add an automatic `<hr>`/Separator or sub-card delimiter; collapse the 38 hand-rolled `text-subheading` headings. (BC.W-PAGE-HIERARCHY)
4. **ONE code-block treatment** — collapse the 3-way fira/font-mono/bare-code split (esp. display/card's 45 font-mono) onto `fira-code`; every component name + technical value + px/token is a code block. (BC.W-CODE-BLOCKS)
5. **Prune** — kill "View the source" (hero.vue:175), the 21 orphan composables/ SFCs, illegible/superfluous copy (settings, paper-backdrop-texture-system), and resolve the three-heroes (intro) / homepage-duplicate (hero). (BC.W-PAGE-PRUNE)
6. **Route the 4 chassis-bypassers through the chassis** — substrates/aurora (and verify aurora's title becomes a semantic `<h1>`). (BC.W-PAGE-CHASSIS)