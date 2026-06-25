# Pass-E deep audit — display/separator

- **Import:** `@mkbabb/glass-ui/separator`
- **SFC:** `demo/stories/display/separator.vue` (80 lines)
- **Component source:** `src/components/ui/separator/Separator.vue`
- **Live:** http://localhost:5173/display/separator (spot-checked, full-page screenshot)
- **Manifest row:** `manifest.ts:771` — `s("display", "separator", "Separator")` → inherits `CATEGORY_DEFAULT_BG.display = "paper"` (`manifest.ts:185`)

## Verdict summary

A correct, minimal spec-sheet that does NOT meet the BD north-star bar. The separator
itself is a well-built primitive (split-rule labelled arm, warm `--separator-ink`, a11y
`role="separator"`), but the DEMO is thin: flat cream-on-cream, no live aurora field, no
glass morphism reads, no dock APIs, no procedural anims, no series-of-components
composition, zero animation affordance. It is the canonical "documentary primitive" page —
acceptable as a floor, far below the BD storytelling target.

---

## (1) DEMO CONGRUENCE — shows component at its BEST + FULL API?

PARTIAL. The four sections do cover the real API surface:

- `separator.vue:17` — plain horizontal (`my-4`)
- `separator.vue:30` — labelled (`label="or"`) — exercises the BC.W-SEPARATOR-FIX split-rule arm, the page's strongest moment (a genuine witness of the fixed centering)
- `separator.vue:41-45` — `orientation="vertical"` in a flex row
- `separator.vue:56-74` — section-label copy pattern (an applied usage, good)

API GAPS / not-at-its-best:
- The Separator's identity is the **warm `--separator-ink` hairline (NOT grey `--border`)** — the whole BA.W-NO-GRAY point. Over the cream `bg-card` plate this warm-vs-grey distinction is INVISIBLE; there is no side-by-side that proves the warm ink, and no dark-mode witness where the warm rule is most legible.
- The labelled chip carries a sanctioned `bg-background` backplate meant to "read clearly over a busy glass/aurora host" (Separator.vue comment) — but the demo never puts it over a busy host, so the backplate's whole reason-for-being is undemonstrated.
- **Zero animation affordance.** The BD mandate is "HIGH animation affordance for EVERY component." A separator can reveal-draw (a `stroke-dashoffset`/scaleX wipe on entrance, the W-SCROLL-MOTION `.scroll-cascade` already in the chassis but not consumed at the rule level), or animate orientation/label swaps. None present. The rules just sit there.
- No contextual switching: a `<SegmentedTabs>`/`<ToggleGroup>` toggling orientation (h↔v) or label on/off would exercise the live re-render AND compose a second component.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

THIN. The page composes exactly TWO library primitives: `Separator` + `Card`/`CardContent`
(`separator.vue:4-5`). Paragraphs are raw `<p class="text-small">`. Compare the reference
`display/buttons.vue`, which composes `<Aurora>` + `<Button>` (8 variants × 4 sizes) +
`<ShowcaseFrame tier="field">` + a focal hero + viz-color chips over a LIVE field.

No docks, no tabs, no buttons, no procedural-anims, no metric/chip/icon-chip pops. The page
is a flat 4-card stack. It does not "deftly use a series of glass-ui components."

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

FAIL (the headline defect). The route inherits `display → paper` (`manifest.ts:185`), a
static cream wash. Live spot-check: the entire page is cream-on-cream — the StoryHero glass
card, the four inner `<Card>`s, and the page substrate are all within ~3% luminance. The
glass morphism does NOT read at all (blur has nothing colorful to bend; the iOS-26 six-layer
optical composite is invisible by construction). This is precisely the BD §3 "buttons
invisible" class the buttons pane already fixed by staging glass over `PRESETS.OPENAI_SKY`.

PAPER morphism: the `paper` wash is present but flat — no `paper-grain-overlay`,
`border-l-[3px]` section rail, or fira-code idiom (the `math-paper.vue` gold standard). The
section-label copy pattern (`separator.vue:52-77`) is the one place paper-editorial idiom
would shine and it is rendered as a plain card.

## (4) STRUCTURE — own glassy card per sub-section? main card BIG enough?

- **Per-section card: YES, technically** — each `<StorySection>` already wraps its body in
  its OWN `<Card><CardContent>` (`separator.vue:12, 27, 38, 53`). The user's "each sub-section
  in its own glassy card" bar is structurally met — BUT it produces a NESTED card-in-card
  (the StoryHero outer glass card → 4 inner Cards), and the inner cards read as opaque cream
  plates, not glass. They are "cards" but not "glassy." Recommend dropping the inner Cards to
  a glass tier (`<Card tier="wash">`/`quiet`) over a live field so the morphism reads, OR
  hosting via `<ShowcaseFrame tier="field">` like buttons.vue.
- **Main card area BIG enough: NO.** The outer article is bounded to `--story-page-max-inline`
  and the content sits left-of-center with a large empty right gutter (visible in the
  screenshot — the cards span ~75% width, huge whitespace right). The user explicitly asked
  the main card area be BIGGER / more screen space. The separator (a full-width rule) wants
  the width most of all.

## (5) PATH-LABEL standardization

PASS. The subpath chip renders `@mkbabb/glass-ui/separator` (live-confirmed) and the manifest
row `manifest.ts:248` declares `"display/separator": "@mkbabb/glass-ui/separator"`. Correct
and standardized.

## (6) LANGUAGE — superfluous prose to tighten?

The DEMO copy is already terse (`Paragraph above the rule.` / `Draft` / `Published`) — fine.
The superfluity is in the SECTION LABELS and inline comments, not user-facing:
- `separator.vue:25` comment "the fixed split-rule centering witness" is fine internally.
- Section labels are minimal — no tightening needed there.
- The component-source comment block (`Separator.vue:1-25`) is verbose but that is source
  doc, out of this page's scope.

Net: user-facing copy is tight; no action needed for the demo text itself. (The broader
"tighten superfluous language" mandate bites the component-source banner, not this SFC.)

## (7) BUGS

- No dead demo / no broken animation found (there is no animation to break). All four rules
  render; the labelled split-rule centers correctly (BC.W-SEPARATOR-FIX confirmed live — the
  "OR" chip sits centered between two rule segments).
- Latent: the labelled chip's `bg-background` backplate is justified ONLY over a busy host;
  on the current flat paper host it reads as a faint redundant box around "OR" (harmless but
  pointless without the field it was designed for).

---

## Concrete remediation (BD-grade)

1. **Stage over a live colorful field** — set the manifest row background to an aurora
   (`s("display","separator","Separator", …, { background: "aurora" })`) OR host the cards in
   `<ShowcaseFrame tier="field">` over a single `<Aurora :config="PRESETS.*">` (one GL context,
   within budget) so the warm hairline + the labelled chip backplate read against color — the
   demo's own stated thesis.
2. **Inner cards → glass tiers** (`tier="wash"`/`quiet`) so each sub-section is a genuinely
   GLASSY card, not an opaque cream plate.
3. **Add a contextual-switch composition** — a `<SegmentedTabs>` or `<ToggleGroup>` flipping
   orientation (h↔v) / label on-off, exercising live re-render AND composing a second
   component (toward the "series of components" bar). Bonus: a dock-API contextual switcher.
4. **Animation affordance** — a reveal-draw on the rule (scaleX/`stroke-dashoffset` wipe on the
   `.scroll-cascade` entrance) so the separator carries the BD liquid-weight motion.
5. **Add a dark-mode witness** — the warm `--separator-ink` vs grey `--border` distinction (the
   primitive's identity) only reads in dark; a side-by-side proves it.
6. **Widen the main card area** — the full-width rule wants the screen; reduce the right gutter.
