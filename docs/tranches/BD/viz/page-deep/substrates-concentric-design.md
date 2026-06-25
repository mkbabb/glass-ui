# substrates/concentric — FRONTEND-DESIGN deep critique (Pass-E)

Page: `demo/stories/substrates/concentric.vue` → `<StoryPage>` → `<StorySection>` → `<Configurator scroll-mode="auto">` with `#stage` (`<Concentric>`) + `#controls` (3 `<ConfiguratorLayer dividers>`).
Live: `http://localhost:5173/substrates/concentric`. Captured 1440×900 desktop + 500-wide narrow, live WebGPU field running (`navigator.gpu` present).
Lens: the frontend-design skill (distinctive, production-grade, AVOID generic-AI aesthetics) applied to glass-ui's OWN language — DESIGN.md (iOS-26/27 six-layer Liquid Glass + 7 tiers + glass-cannot-sample-glass + spring physics), motion-canon.md (P1–P6), design-idioms.md, PROCEDURAL-SUITE.md (the Concentric spec), the dock system APIs.

---

## Verdict in one breath

The Concentric field is **genuinely stunning** when it has color behind it — the teal-on-navy preset is a bespoke, premium cymatics-edge-on surface that nails the not-generic-AI bar (sweeping ellipsoid ring-lines beating into broad moiré envelopes, exactly the IQ gradient-normalized isoline render the spec promises). But the page wrapping it is **broken in its default state and competent-admin-template in its dressed state**. FOUR structural defects, two of them P0: (1) **the DEFAULT viz is invisible** — warm-cream lines over a transparent canvas over a warm-cream page paint a blank gray slab (pixel-probe `avgRGBsum: 0`); the demo's resting state is a dead card; (2) **the hero `<h1>` text BLEEDS THROUGH the stage** — a z-index/scroll-layering bug paints the 244px "Concentric" title and the whole blurb wall *behind/through* the canvas (catastrophic on narrow widths — an unreadable jumble of overlapping rings + text); (3) **the name is DOUBLE-stamped** (244px hero `<h1>` + 20.35px `<h2>` "Concentric"); (4) the studio frame begins at scrollY≈922, **fully below an 806px fold** — the gorgeous field is never the hero. And the page leverages **zero dock APIs**, zero tabs, zero glass sub-cards for its own content (3 flat `ConfiguratorLayer` collapsibles over dead page) — the very components it exists to showcase.

This is the same disease the aurora page carries, but worse, because Concentric's default-over-transparent identity means the page ships **blank** until you toggle a preset.

---

## 0. THE TWO P0 DEFECTS (fix before any design polish)

**P0-a — the default viz is invisible (the dead-card-by-design trap).** The SFC default is `CONCENTRIC_PRESET_WARM` — "the warm-cream library identity over transparent (the page reads through the troughs)." On a viz with a rich live backdrop that is correct. But this page renders the stage over the studio frame's OWN `glass-floating` plate (`oklab(0.798… / 0.84)`, the same warm-gray) over the warm-cream page. Warm-cream thin lines, over a warm-cream-gray plate, over a warm-cream page = **nothing**. The pixel probe at the default returned `nonZeroPx: 0, avgRGBsum: 0`; the first studio screenshot is a flat gray rectangle. Toggling the teal preset reveals the field is alive and beautiful — so the substrate WORKS; the *default presentation* is dead. This is the "glass needs a rich backdrop to POP" precept (W54) failing at the SOURCE: the demo's resting frame has no color, AND its default ring identity is invisible against warm-cream. **The field needs a colorful backdrop behind it by default** (an aurora/grid wash under the whole studio) OR the default preset for THIS demo must paint visible ink. The current state ships a blank demo.

**P0-b — the hero text bleeds through the stage (z-index / stacking-context bug).** In every studio screenshot the 244px "Concentric" `<h1>`, the eyebrow chip, and the full blurb paragraph are visible *inside/behind* the canvas rectangle. On the narrow capture this is catastrophic — the hero title, the blurb wall, and the ring field are stacked into an unreadable overlapping smear. The stage `<div class="relative h-full w-full overflow-hidden rounded-card">` + `<Concentric class="absolute inset-0">` is not establishing an opaque/isolated stacking layer over the scrolled-up StoryPage chrome, so the page chrome composites through. This is a real rendering defect, not a design opinion — it reads as broken. The stage tile needs its own paint floor (an opaque or near-opaque backdrop, or a proper `isolation: isolate` + z-layer) so nothing behind it bleeds.

---

## 1. VISUAL HIERARCHY — the eye lands nowhere; the name is stamped twice

**The double-name.** Live DOM carries TWO "Concentric" lockups: the StoryPage hero `<h1>` at `font-size: 244.8px` and the StorySection `<h2>` at `20.352px`. The eye reads "Concentric… Concentric" top-to-bottom — the D1-4 double-`<h1>` suppression class re-opening. Per W-HIERARCHY2 the descriptor shows ONCE in reading order (eyebrow → title → blurb). Decision: the hero `<h1>` is the page title; the `<h2>` "Concentric" is redundant and must be suppressed (the StorySection should carry the descriptor sub-label `radial Fourier rings · ellipsoid lines forming distinct waves` WITHOUT re-stamping the name, or the hero collapses to a chrome line and the in-frame title carries it). Right now the audacious ladder is spent twice on the same word — typography-LOUD, not typography-forward.

**The hero eats the first viewport whole.** At 1440×900 the 244px "Concentric" + the 90-word blurb fill the first screen; the studio frame begins at scrollY≈922, below the 806px fold. A *studio* page must let the live field be the hero. The user's explicit ask — "the main card area BIGGER (more screen space)" — is the fix: shrink the standalone hero (or fold the title lockup INTO the stage as an overlay so the colorful field IS the masthead, the iOS-27 content-forward move), and let the studio frame own the first viewport.

**Where hierarchy is RIGHT:** the section labels resolve the canonical `--type-subheading` 20.35px/600 rung (Ring families · Lines · Motion & theme), the mono `centers.length` / `beatDetune` field sub-labels are the correct tertiary register, and the 673:360-ish stage:controls split is near-golden (~1.87:1). The ladder skeleton is here; the *count* of competing name events + the below-fold placement break it.

## 2. AFFORDANCE — well-cued in prose, but the colorful-glass premise is undelivered by default

- **Stage interactivity is cued only in PROSE** ("Drag the cursor (interactive on) and a transient ripple-source follows it"). Unlike aurora's numbered nucleus handles, Concentric has NO visible direct-manipulation affordance ON the field — the pointer-warp is a hidden gesture. For a studio surface, a faint "drag to ripple" hint-glyph or a cursor-follow halo would make the interactivity self-evident (the affordance-map "every interactive surface advertises its gesture" bar).
- **The controls are clear** (labeled sliders + a select + switches, the configurator grammar). Affordance grammar at the row level is fine.
- **BUT the whole colorful-glass premise is half-delivered.** The controls aside is `background: transparent`; the gray comes from the studio frame's `glass-floating`. The stage half — when a preset paints — has the field behind the glass. The controls half sits over dead page, so the same glass has nothing to refract and collapses to generic warm-gray inspector chrome. And at the DEFAULT, even the stage half is dead (P0-a). The premise — "glass demos over COLORFUL aurora backgrounds" — is delivered in exactly zero of the page's resting pixels.

## 3. ANIMATION AFFORDANCE — the field is alive; the chrome is inert

At the iOS-27 bar EVERY element is alive — entrance, hover, press, state. Audit:
- **ALIVE:** the Concentric field (continuous GL ring travel + the pointer ripple when interactive), the `ConfiguratorLayer` chevron collapse (spring).
- **STATIC / missing:** the studio frame has **no entrance** — it simply exists below the fold; per W-SCROLL-MOTION the stage + each section should build in on a `view()` timeline (`.scroll-cascade`) with spring-clocked coupled transform+opacity. The page ships the register; it doesn't consume it. The **section headers don't morph** — collapse is a height toggle, not a liquid contextual morph. The blurb + sub-label have no **W-HIERARCHY2 GRAVITY entrance** (the 3-stage eyebrow→title→blurb fade-rise). There is **no Reset/preset press-spring** — the only state control is the teal switch. Net: the *substrate* is iOS-27-alive; the *interface around it* is a quiet, motionless form. Per motion-canon P1 the section-switch SHOULD be a SPATIAL spring morph; per P2 the entrances should be enter-bouncy.

## 4. POLISH + DISTINCTIVENESS — bespoke field, broken-then-template chrome

The field is unmistakably bespoke and premium (the teal moiré is the distinctive, not-generic-AI surface the skill demands). The chrome is the opposite: at default it's a **blank gray slab with text bleeding through** (reads BROKEN), and dressed it's a **Tailwind admin panel** — a gray right-rail of three stacked collapsibles with a blank stage. Nothing in the frame says "glass-ui" except the field. The user's instinct is exact: **"each sub-section in its OWN glassy card."** The three `ConfiguratorLayer` sections (Ring families / Lines / Motion & theme) should each be a discrete `glass-quiet`/`glass-resting` tile floating over a color wash — the iOS-27 Control Center idiom — not flat collapsibles inside one `glass-floating` slab. That single move converts the admin-inspector into a stack of liquid-glass instrument tiles.

## 5. iOS-27 / PAPER / GLASS NORTH-STAR FIDELITY

- **Six-layer composite:** the studio frame carries backdrop blur+saturate (13px/1.18) + surface tint + edge rim — but over dead page the inner catch-light + drop shadow don't read, and the grain is absent on the controls half. ~3 of 6 layers visible where it matters. The stage half can't show the composite at all at default (P0-a).
- **Glass-cannot-sample-glass** is respected (one frame, no nested glass-over-glass) — good.
- **Tier discipline:** one tier flat (`glass-floating` for the whole frame). The sub-sections should step DOWN to `glass-quiet` tiles so a real elevation ladder reads (frame floats, tiles rest) — the DESIGN.md 7-tier move.
- **PAPER morphism is absent.** The brief wants GLASS + PAPER both. The PRM hint `<p>` below the frame ("Under prefers-reduced-motion… the rings freeze as a still contour map") is a bare `text-sm text-muted-foreground` orphan — the paper register begging to be used: a `paper-grain-overlay` notes tile with a `border-l-[3px]` section-accent rail (the math-paper gold standard, W-CARD-PAD sqrt-φ padding).

## 6. SPACING / RHYTHM — clean inside the frame, one orphan + one void

- The frame radius is 12px (`--radius`), the configurator density ladder governs row rhythm — coherent.
- **Orphan:** the trailing PRM `<p>` is bare muted body with no card, no φ-padding, no rail — reads as an afterthought. Promote to a captioned paper notes tile so the page closes with rhythm.
- **Void:** the hero→frame gap is a full viewport of empty warm page between the 244px title and the studio. Tightening the hero closes it.

## 7. COLOR — suffusion proportion is correct; the demo defaults to NO color

- **One-color-event discipline holds in the chrome** — no rogue second hue; the body ink stays warm-neutral. Correct per W-SUFFUSE3; do NOT add chrome hue.
- **But the demo's DEFAULT carries zero color** (warm-cream-over-transparent = invisible, P0-a). The teal field is a *non-default* toggle. A viz demo whose colorful state is hidden behind a switch fails "glass demos over COLORFUL aurora backgrounds" at first paint. The fix is backdrop REACH + a visible default: the field (or a tinted wash) must reach UNDER the whole studio AND the default preset must paint legible ink, so the page opens colorful, not blank.

## 8. IMPORT-PATH LABEL + LANGUAGE (the user's housekeeping asks)

- **Import chip — GOOD, already standardized.** The page carries the Fira-Code `@mkbabb/glass-ui/concentric` chip on the hero — the canonical exported-subpath convention. No change needed to the chip itself. (This is the standard the aurora/other pages should match.)
- **BUT the blurb echoes it as prose** — the StoryPage blurb ends "…Shipped /concentric." That trailing "Shipped /concentric." is a SECOND, inconsistent restatement of the chip fact. Drop the prose echo; the chip is the single source.
- **Superfluous language:** the StoryPage blurb is a ~90-word wall AND the StorySection blurb is a SECOND ~80-word wall — the same field is described TWICE in two stacked paragraphs (the "is a sum of radial harmonics about one-or-more centers… Tessendorf 2001… IQ gradient-normalized distance-estimation… deep-water dispersion the dot-flow-field uses…"). Half of each is implementation narration (the gradient closed-form, the WebGPU-first/WebGL2-fallback, the SFC-comment-grade default/non-default note) that belongs in a code comment, not reader-facing copy. Collapse to ONE editorial line: *"Elliptical ring-lines from up to four sources beat into broad moiré waves — cymatics seen edge-on."* The interaction + PRM notes already live below the frame; don't repeat them in the blurb.

---

## TOP DESIGN MOVES (ranked, concrete, idiomatic)

1. **Fix the two P0 rendering defects FIRST.** (a) Give the stage tile an opaque/isolated paint floor so the hero `<h1>` + blurb stop bleeding through (`isolation: isolate` + a z-layer, or a near-opaque stage backdrop). (b) Make the demo open COLORFUL — either default to a visible ring identity or paint a colorful aurora/grid wash UNDER the studio so the default field reads. No blank demo. (W54 backdrop-reach + the stacking fix.)
2. **Kill the double-name; let the field be the hero.** Suppress the `<h2>` "Concentric", shrink/overlay the standalone hero, and make the studio frame the first-viewport focal — the user's "main card BIGGER" ask. (W-HIERARCHY2 / D1-4 suppression.)
3. **Each sub-section in its OWN glass card.** Re-skin the three `ConfiguratorLayer` sections (Ring families / Lines / Motion & theme) as `glass-quiet` tiles floating over the color wash — a Control-Center stack, not a flat slab. Step the tier ladder: `glass-floating` frame, `glass-quiet` tiles. (DESIGN.md 7-tier + the user's headline ask.)
4. **Leverage the dock APIs for section navigation.** Replace the 3-collapsible scroll with a `<DockLayerGroup>` contextual switcher (or `<SegmentedTabs variant="pill">` glass tabs) so switching Ring families → Lines → Motion is a liquid spring morph, not a height toggle — the user's "leverage the dock APIs (contextual switching/animating)" + "deftly uses docks/tabs" ask. Shortens the column AND animates state. (motion-canon P1 SPATIAL spring.)
5. **Animate the chrome entrance.** Consume `.scroll-cascade`/`.scroll-build` so the stage + each tile builds in on a `view()` timeline; give the masthead the W-HIERARCHY2 GRAVITY fade-rise; route any preset/reset control through `useSpringPress`/`useLiquidPress`. Every element alive. (motion-canon P1–P6.)
6. **Advertise the stage gesture.** Add a faint pointer-follow halo or a "drag to ripple" hint-glyph ON the field so the interactive ripple-source is self-evident, not prose-only. (affordance-map.)
7. **Add the PAPER register for the notes.** Promote the trailing PRM `<p>` into a `paper-grain-overlay` captioned tile with a section-accent rail (W-CARD-PAD sqrt-φ padding) — closes the page with GLASS + PAPER both, on rhythm.
8. **Tighten the copy.** ONE editorial blurb line (not two stacked walls); drop "Shipped /concentric."; keep the single Fira-Code chip (already correct).

---

### 5-line verdict
The Concentric field is bespoke and premium — the teal moiré ring-interference surface is exactly the not-generic-AI bar the skill demands — but the page is BROKEN at default (the warm-cream-over-transparent identity paints invisible, pixel-probe `avgRGBsum: 0`, so the demo opens as a blank gray slab) and the hero `<h1>` + blurb BLEED THROUGH the stage canvas (a z-index/stacking bug, catastrophic on narrow widths). On top of the two P0 rendering defects: the name is stamped twice (244px hero + 20px `<h2>`), the studio frame sits fully below the fold, the controls are three flat collapsibles over dead page (zero glass sub-cards, zero dock/tab APIs, zero entrance animation), and the colorful-glass premise is delivered in zero resting pixels. Top moves: fix the stage paint floor + make the default open colorful, kill the double-name and let the field be the first-viewport hero, re-skin each section as its own `glass-quiet` tile over a color wash, swap the 3 collapsibles for a `<DockLayerGroup>`/`<SegmentedTabs>` contextual switcher, and animate every chrome element to the iOS-27 alive bar. The import chip is already standardized (`@mkbabb/glass-ui/concentric`) — just drop the prose echo and collapse the two blurb walls to one line. Fix the P0s and this goes from "ships broken" to a flagship liquid-glass studio.
