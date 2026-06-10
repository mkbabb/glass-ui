# FDR2-glassui-panes—every demo pane, post-rebuild (FD-R2)

Lane: FDR2-glassui-panes · FD-R2 fleet · 2026-06-10
Surface: glass-ui demo `:5199`, the settled post-rebuild tree (HEAD dde248e7; no `src/`/`demo/` file newer than the captures).
Method: resumed from the pre-wall checkpoint—the per-route sweep (95 routes, viewport + full-page at 1440×900 dsf 1.5, light) + 12 category contact sheets (`captures/<cat>--<id>[--full].png`, `captures/_sheet-<cat>.png`) were banked by this lane's own harness (`captures/_capture.cjs`, commit dde248e7). This session added the interaction/state set on the real-GPU chrome channel (`--use-gl=angle --use-angle=metal`): `captures/X-*.png`—vangogh medium live, blob pointer-lean + click impulse, dock hover, dialog/drawer open, shell ⌘K, the 404 egg, auth-shell + configurator dark (both emulated AND re-confirmed via the in-app DarkModeToggle), glass-material folds, fourier dark. Judgments below each carry a capture path or a measured/grepped number.
Brief (verbatim, the user): "better suffuse our design language of glass, grid, math, large and audacious typography, with colorful audacious pops, like those found in our icons (how might we increase this, too? within a sense of proportion)".

**Headline: the rebuild band held up under the per-pane walk.** The five rebuilt surfaces (blob page, vangogh medium, the studios, fourier field, dock band) all earn fresh PASS verdicts—two of them (vangogh, fourier) are now among the strongest pages in the book. The defect tail is short and concentrated: two real dark-mode breaks (auth-shell ink, configurator stage), one dead egg (the 404 lattice never paints), and the same suffusion gap the synthesis named—the color machinery exists but is not threaded into the icons page, the buttons variants row, paper-glass, or the always-visible shell rail.

---

## §1—Shell chrome (the frame every pane sits in)

- **Rail + bottom dock + ⌘K**: the left rail is a vertical GlassDock with the red ƒ brand glyph up top and 12 mono-ink category icons; the bottom story-switcher dock carries the one red active label (`X-shell-cmdk.png`, any `captures/<cat>--*.png`). The chrome IS the product and it reads as one system. The ⌘K palette (`X-shell-cmdk.png`) is a clean glass-floating list with category tags—works, zero color. **Suffusion move (proportionate):** the ACTIVE rail icon takes its category's section-color (the 13-stop ramp maps 1:1 onto the 12 categories + brand); rest stay ink. One colored icon at a time—the deck's one-red rule generalized. Same move on the ⌘K active row glyph. File: `demo/layout/` rail component + the manifest's per-category `icon`.
- **Rail tooltip register**: hover paints a small white pill label ("Forms"—`X-dock-rail-hover.png`). Quiet, correct.
- **404 egg is DEAD on arrival**: `X-notfound-egg.png`—the card promises "Click the field to warp a node" but the constellation lattice paints NOTHING (a 700×600 sample region of the 2160×1350 capture is flat cream—`notfound-crop`; the constellation story page painted visible nodes in the same browser run, so the substrate itself is alive). The `glass-floating` card also sits right-of-center over the empty field. The red `text-viz-fourier` 404 numerals are the right pop. File: `demo/eggs/NotFound.vue:14` (`<Constellation … class="absolute inset-0 -z-10">`)—likely a park/mount ordering issue on the catch-all route; needs an interactive confirm, but two independent real-GPU renders at 3s settle show no lattice.

## §2—Per-category walk

### Foundations (`_sheet-foundations.png`)
| page | verdict |
|---|---|
| intro | **Exceptional.** Full-bleed rose aurora + "Glass, paper, and the golden ratio." ink display—the book's front door makes the thesis (`foundations--intro.png`). |
| colors | Strong. The 13-stop RAINBOW ramp + the viz-basis letter cards (red ƒ, blue T, purple P, amber A, green G—serif letterforms on tinted-border cards) are the most distinctive color artifacts in the book (`foundations--colors.png`). The core-token grid above is plain white cards—fine as spec. |
| typography | **Exceptional.** The √φ ladder—Golden / Audacious / Ornament—with mono rail labels; hierarchy is the content (`foundations--typography.png`). Mono-ink restraint is CORRECT here; at most the "Ornament" row could carry the red ƒ register. |
| radii / shadows | Clean spec pages; the cartoon offset stamps read clearly on cream. No move needed. |
| motion | The constellation background barely registers behind the white cards—the page about motion is the stillest-looking page in foundations. Low-stakes; the curve work lives at motion/curve-gallery anyway. |
| paper-glass | **The worst suffusion miss in foundations—confirmed gray-on-gray** (`foundations--paper-glass.png`). The five tier cards sit over a flat gray well and are near-indistinguishable; the "ladder, against something" section's gradient band EXISTS in source (`demo/stories/foundations/paper-glass.vue:157`—viz-fourier 24% + viz-chebyshev 25% color-mix) but paints too faint to do its job. **Move:** raise the band mixes to ~40–50% AND give the top tier grid the same staging the Card page already proved (`display--card.png`'s sky field)—the page that DEFINES glass must give glass something to read through. |
| icons | **The page the brief names, and it has zero color**—21 mono tiles + sizing/stroke rows; `grep -c "section-color\|color-mix\|var(--viz" icons.vue` = 0 (`foundations--icons.png`). **Move:** add a "POPS" section demonstrating the shipped chip recipe (the empty-states register: `color-mix(in srgb, var(--section-color-N) 25%, transparent)` circle + full-chroma glyph) across the 13-stop ramp, with the proportion guidance written down (one chip cluster per surface; never tint body ink). This is the single highest-leverage pops edit in the repo. |
| surface-tints / overlays-scrims / chart-chassis-palette / css-utilities | Correct spec austerity. chart-chassis has the lone color column; fine. |
| paper-backdrop-texture-system + paper-backdrop | Two near-duplicate paper pages in one category (both stage the clean/aged frequencies + opacity knob). Consolidation candidate—one page, two sections. |

### Substrates (`_sheet-substrates.png`)—the rebuilt band, fresh verdicts
- **Aurora (the studio + the vangogh medium)—PASS, and the medium is the star.** The studio shape works: preset strip (the most colorful strip in the repo—Sky/Dawn/Meadow/Oil Impasto…), full-bleed canvas, right-rail Aurora-studio panel with the DERIVE-FROM-COLOR block (`substrates--aurora.png`). Clicking **Van Gogh** paints a genuinely arresting full-page swirl-row field—cobalt/teal crescent dabs with ochre-gold rows, unmistakably the Starry-Night register at page scale (`X-aurora-vangogh.png`). Two incongruences: (1) the page is the ONLY story with no header—`grep -c "StoryPage\|<h1" aurora.vue` = 0—so it drops the book's title/blurb grammar without announcing itself as a full-bleed tool; (2) the default **Sky** preset is the palest thing in the strip, so first paint undersells the engine the page exists to show (the strip's own Dawn/Meadow would front-load better). File: `demo/stories/aurora/presets.ts` (order), `demo/stories/substrates/aurora.vue`. |
- **GooBlob (the rebuilt page)—PASS with one prose-vs-paint contradiction.** The contained-creature decision landed: the studio stage holds one lit peach metaball that visibly LEANS toward the pointer trail and wobbles on click (clicks counter increments—`X-blob-pointer.png` / `X-blob-click.png`), with the Calm/Excited/Shy presets, mood select, and the oklch seed field. Charming and proportionate. Defects: the "LIT CONTAINED DROPLET" section's prose says "CSS/SVG **pastel** swatch" while the four WatercolorDots paint ink-black + saturated red/blue/green (`dotColors` = `var(--primary)`, `oklch(0.62 0.19 25)`, `oklch(0.7 0.15 250)`, `oklch(0.78 0.16 150)`—C 0.15–0.19 is not pastel; `demo/stories/substrates/blob.vue:43-48`, `substrates--blob.png`). Either soften the swatches to the watercolor register or fix the word. Second: the studio stage well and its config panel are the SAME flat gray—no glass separation between panel and stage (`X-blob-pointer.png`); a `glass-resting` panel over the stage would restore the tier read. |
- **Constellation—PASS, quiet by design but under-sold.** The lattice + pointer-reactive toggle work; the demo well is so sparse/pale it reads near-blank at a glance, and the `--primary` focal-node story (the page's one pop) is told in prose, shown only as two faint red rings (`substrates--constellation.png`). A denser default or a one-knob density slider would let the math read. |
- **Fourier Field—PASS, exceptional, both modes.** "TWO PRESETS—ONE ENGINE": nested pale-blue epicycles + red comet curve + gold pen dot vs the denser final preset (`substrates--fourier-field.png`). The dark render is a bonus beauty—warm orange comet on ink-black (`X-fourier-freeze-tail.png`, captured in dark). The math axis at full strength; the ALL-CAPS section labels carry the hierarchy. No moves. |
- **Glass Material—PASS; the model for staging glass.** The rung chips read over the live aurora in light (`substrates--glass-material.png`) and over the dark band in dark (`X-glass-material-folds.png`, in-page dark). The one watch item: in dark mode the h1/blurb ink sits over the still-bright aurora top region and thins out—the exact W55 `--glass-backdrop: light` case; my capture had an emulation half-state so I bound this loosely (the G-set's `G-substrates-glass-material-desktop-dark.png` is the cleaner reference). |

### Forms (`_sheet-forms.png`)
Eleven pages, all in the quiet register—**and that restraint is correct**: inputs/checks/select/combobox/multi-select/number-field/label are chrome, and the red invalid ring (visible on inputs) is the only pop the band needs. Two standouts: **slider** is the W-SLD1-R3 final form and it reads beautifully—the thumb-invisible ink-fill track (Volume 42% / Balance 65 / $22–$78 range) + the slim spectrum gradient bar with the lone white pill thumb (`forms--slider.png`); **toggle** shows the red pressed states as its bounded accent. No moves in this band; do NOT add pops here.

### Display (`_sheet-display.png`)
- **buttons**: the variants row paints default/outline/ghost/glass/glass-wash as five near-identical white pills over a flat white card (`display--buttons.png`)—the W54 glass default literally cannot demonstrate itself with nothing behind it. **Move:** stage the variants row over a color band well (the dock-overview teal band is the shipped recipe), file `demo/stories/display/buttons.vue:34-39`. The audacious + gold CTA sections are good; the ALL-CAPS mono paragraph under the gold CTA runs spec-dump long.
- **card**: **the model page**—the five-tier ladder over a live sky/teal field, per-tier alpha numbers in the blurbs, shadow/grain toggles (`display--card.png`). This is the staging grammar paper-glass and buttons should borrow.
- badge / status-dot / stacked-icons: the band's native pops (saturated badge pills, the dot ramp, colored mini-stacks)—already proportionate. metric-badge/metric-pill: mono + red, fine. pulse: the lavender bloom is a nice quiet delight. separator/section/dark-mode-toggle: spec-clean.

### Containers (`_sheet-containers.png`)
Thirteen pages of chrome primitives, all correctly neutral—the content pops, not the chrome. Dialog's open state (`X-dialog-open.png`): the glass plate + scrim read well; note **Save renders as a muted gray pill while Cancel is the brighter white pill**—at first open the secondary action visually outweighs the primary (plausibly a disabled-until-dirty state; needs a live confirm before calling it a defect). Command embeds inline with a note pointing at CommandDialog—fine. Drawer/sheet/popover/menus/tooltip/accordion/collapsible/hover-popover/expandable: no incongruences found at the static read.

### Navigation (`_sheet-navigation.png`)
- **tabs**: clean four-specimen page (default white-pill, ink "Daily" pill, underline, vertical)—the unified SegmentedTabs engine demonstrates well (`X-dock-overview-expanded.png` caught this page at full scale via a mis-aimed click; happy accident).
- **carousel**: staged over aurora with the "Warm Cream" base-surface card + dark/light-safe dots—good; the story pager wrapping real stories is a nice self-referential touch (`navigation--carousel.png`).

### Dock (`_sheet-dock.png`)—fresh verdict on the band
- **overview—PASS**: the collapsed pill floats over a LIVE teal aurora band (the headline glass finally has something to read through—`dock--overview.png`); transport/select/popover/slider sections below. Incongruence: only the FIRST well got the color band; "Always expanded—media transport" and "Select and dropdown triggers" float in empty cream.
- **layers—the band's miss**: every specimen well is plain `bg-card/40` (`demo/stories/dock/layers.vue:66,119,147`; `dock--layers.png`)—the drill-in/switcher-rail/FLIP story plays in an empty room. **Move:** reuse the overview band well.
- **rail—PASS**: the vertical rail over a still sky field reads as the nav-pattern model (`dock--rail.png`); home-left, separators, glass active tier all legible. The hover-expand morph did not visibly fire under headless hover in my one attempt (`X-dock-overview-expanded.png` retake)—prior waves live-verified the morph, so I log it as not-reproduced-here rather than a defect.

### Data (`_sheet-data.png`)
- **metric-cell / metric-stack**: the strongest data pages—mono labels + big numerals on the grid background; the stack's audacious register peeks a display-hero red numeral (`data--metric-stack.png`, `data--metric-cell.png`). The grid bg + math type is the suffusion thesis working in a "boring" band.
- timeline / timeline-segmented / timeline-continuous: the phase-gradient bars are the band's bounded pops—good.
- search (red match highlights), tags-input, avatar, sortable-list, infinite-scroll, table, data-table, scrolling-text: spec-clean, correctly quiet.

### Feedback (`_sheet-feedback.png`)
alert (red destructive arm) / confirm-dialog (red Delete) / toast / toaster / notification / progress / skeleton—all correct; the red is doing its one job. The progress page paints ink bars on cream; the gradient variant exists below the fold (`feedback--progress--full.png`). No moves.

### Motion (`_sheet-motion.png`)
- **curve-gallery**: **exceptional reference page**—live spring cards with `springTimingFunction(ζ, …)` params, register prose, drawn curves, the §6 doctrine legend (`motion--curve-gallery.png`).
- springs: the red-orange spring tile over constellation + mono channel readouts—the band's one pop, well placed (`motion--springs.png`).
- typewriter: "Built on warm cream|" with the red accent—on-brand.
- **underline**: the static capture shows NO drawn stroke under either headline at 1.5s settle (`motion--underline.png`)—if the load clock is meant to fire on mount, the draw didn't land in headless; needs a live confirm (logged, not charged).
- countup / reveal / animated-digit: quiet and fine; animated-digit's giant "248.6 14" numerals are the right scale.

### Compositions (`_sheet-compositions.png`)—the staged pages, fresh verdicts
- **hero—exceptional**: "A design system ƒor mathematic|" giant ink display over the constellation with red focal nodes; ink CTA + ghost pair (`compositions--hero.png`). The poster.
- **math-paper—exceptional**: §-marked red section label, serif display, mono `[-π, π]`, red Sₙ, the du Bois-Reymond pull-quote, red/gold coefficient accents on the display equation (`compositions--math-paper.png`). The math axis owns this page.
- **auth-shell—light: the best-staged composition; dark: BROKEN ink.** Light (`compositions--auth-shell.png`): coral/lavender gradient panel + red ƒ logo + ink display + tinted trust chips, white form right. Dark, **confirmed via the in-app DarkModeToggle** (`X-auth-shell-dark-intoggle.png`, also `X-auth-shell-dark.png`): the gradient panel stays light-locked-bright while its body copy rides `text-muted-foreground` (`demo/stories/compositions/auth-shell.vue:71,75`), which flips to the dark-mode light-gray and **sinks into the bright pink—the paragraph is near-illegible**; the heading flips white and thins over the coral. The light-locked panel needs light-locked ink (pin the panel's `--muted-foreground`/heading ink locally, or put the panel on the W55 `--glass-backdrop: light` bucket). This is the lane's #1 defect.
- **empty-states**: the pop-recipe proof page—three tinted icon chips (pink/teal/lavender) + the pointer-leaning blob mascot (`compositions--empty-states.png`). The canonical register the brief asks to spread.
- **configurator (the studio)—light PASS, dark murky**: light stage paints the lavender/blue aurora bloom with the Quiet/Default/Lush rail (`compositions--configurator.png`); in dark the stage field goes gray-mud—the bloom loses its chroma entirely (`X-configurator-dark.png`). Same family as the slides' dark-mud finding; the dark stage needs either a chroma floor or a dark-tuned preset.
- drawer-live-behind: opens correctly over the live verdict surface; the open sheet's interior below "Reorder picks" is a large white void (`X-drawer-live-half.png`)—content-staging, not mechanics.
- settings / form-validation / gate-pattern / labeled-field / icon-tooltip / instrument-chassis: spec-clean; gate-pattern's black access-modal preview reads well in the sheet.

### Composables (`_sheet-composables.png`)
Reference band (22 pages, 5 sampled + sheet)—correct austerity: mono headers, code, live mini-demos (use-animated-number's giant 0.00 / 0.0% is the band's one display moment). No moves; pops do not belong here.

## §3—The increase-the-pops answer, with proportion

**The recipe is already shipped**—the empty-states chip (25% color-mix circle + full-chroma glyph), the viz-basis letter cards, the 13-stop ramp. What's missing is threading, not machinery. Where to add (ranked by leverage):

1. **foundations/icons**—the named page; add the POPS section + write the proportion rule down (see §2).
2. **The shell rail + ⌘K active row**—the active category icon takes its section color; everything else stays ink. The always-visible layer finally carries the identity, one pop at a time.
3. **paper-glass + display/buttons + dock/layers**—not chips but FIELDS: give glass something to read through (the card-page/dock-overview band recipe). Field-behind-glass IS the suffusion move for these pages.
4. **aurora default preset**—front-load a committed default (Dawn/Meadow energy) so first paint shows the engine.

Where restraint WINS (do not add): the forms band (the red invalid ring is the budget), the containers band (chrome stays neutral), the composables reference band, the typography ladder (mono ink is the point), metric ledgers (phase tint is the bounded pop), feedback (red has one job).

**The proportion rule, stated once:** a surface gets ONE color event—either a field (aurora/grid/constellation behind glass) or a chip cluster (the 25%-mix icon register), never both at full volume; chips never exceed icon scale; body ink is never tinted. This generalizes the deck's one-red-per-surface discipline to the 13-stop ramp.

## §4—Defect ledger (ranked, each with evidence)

| # | defect | evidence | file |
|---|---|---|---|
| 1 | auth-shell dark: `text-muted-foreground` body copy sinks into the light-locked gradient panel (near-illegible); heading thins over coral | `X-auth-shell-dark-intoggle.png` (in-app toggle) + `X-auth-shell-dark.png` | `demo/stories/compositions/auth-shell.vue:71,75` |
| 2 | 404 egg: constellation lattice never paints—flat cream field under the card; card off-center | `X-notfound-egg.png` + `notfound-crop` (700×600 region, zero nodes) | `demo/eggs/NotFound.vue:14` |
| 3 | configurator dark stage goes chroma-less mud | `X-configurator-dark.png` vs `compositions--configurator.png` | `demo/stories/compositions/configurator.vue` (stage config) |
| 4 | blob prose says "pastel" over ink-black + C 0.15–0.19 saturated swatches | `substrates--blob.png` | `demo/stories/substrates/blob.vue:43-48` |
| 5 | paper-glass gray-on-gray; the line-157 band paints too faint at 24/25% mix | `foundations--paper-glass.png` | `demo/stories/foundations/paper-glass.vue:157` |
| 6 | icons page: zero color on the brief's named page (0 color-mix/section-color hits) | `foundations--icons.png` + grep = 0 | `demo/stories/foundations/icons.vue` |
| 7 | buttons variants row: five near-identical white pills over flat card | `display--buttons.png` | `demo/stories/display/buttons.vue:34-39` |
| 8 | aurora story headerless (0 StoryPage/h1)—breaks the book's title grammar; default Sky preset palest-first | `substrates--aurora.png` + grep = 0 | `demo/stories/substrates/aurora.vue`, `demo/stories/aurora/presets.ts` |
| 9 | dock/layers specimens in empty `bg-card/40` wells (overview got the band, layers didn't) | `dock--layers.png` | `demo/stories/dock/layers.vue:66,119,147` |
| 10 | blob studio: config panel + stage same flat gray, no tier separation | `X-blob-pointer.png` | `demo/stories/substrates/blob.vue` (studio frame) |
| 11 | two near-duplicate paper-backdrop pages in foundations | `_sheet-foundations.png` | manifest rows `paper-backdrop-texture-system` + `paper-backdrop` |
| 12 | needs-live-confirm trio: dialog Save reads weaker than Cancel at open (`X-dialog-open.png`); underline load-clock stroke absent at 1.5s (`motion--underline.png`); dock hover-expand not reproduced headless (`X-dock-overview-expanded.png` retake) | — | — |

## §5—The exceptional list (name the good, calibrated)

foundations/intro · foundations/typography · foundations/colors (viz-basis cards) · substrates/fourier-field (both modes) · the vangogh medium (`X-aurora-vangogh.png`—the single most arresting capture in the lane) · display/card (the staging model) · forms/slider (the final form reads) · data/metric-stack + metric-cell · motion/curve-gallery · compositions/hero · compositions/math-paper · compositions/auth-shell (light) · compositions/empty-states (the pop recipe, shipped and proportionate) · dock/overview's first well · the GooBlob creature itself (the lean + click wobble is real, contained delight).

## §6—Tree-health note (incidental, pre-existing)

`npm run typecheck` is RED at HEAD dde248e7 (exit 2, one error, in the test arm): `tests/components/custom/underline/GlassUnderline.test.ts(157,46): error TS2339: Property 'exists' does not exist on type 'Omit<DOMWrapper<Element>, "exists">'`. This lane made zero source edits (`git status -- src tests demo` = clean), so the error is pre-existing—the main-project arm passes; the `tsconfig.test.json` arm fails. One-line fix territory for whoever owns the underline tests.

—end of lane.
