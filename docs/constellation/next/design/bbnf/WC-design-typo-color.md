# WC — BBNF Playground: Typography & Color/Theme Refinement Spec

LENS: Typography & color/theme cohesion. SCOPE: refinement of an existing, stable glass-ui consumer. SPEC ONLY — no app edits, no builds, no git.

---

## AESTHETIC DIRECTION

**"Editorial grammar workbench."** Instrument Serif is a genuinely characterful display face (high-contrast, condensed, literary) and Fira Code a strong mono — the bones are right and NOT generic. The problem is *under-commitment*: the serif is used as a flat `instrument-serif` class at raw Tailwind sizes rather than driven through glass-ui's golden-ratio φ-ladder, so the hierarchy reads generic despite the distinctive font. The pastel palette is a flat, slightly-timid 7-swatch set applied uniformly; glass-ui ships a 13-rung `--section-color-*` ladder + a `--primary` ink that the landing surface never touches.

Direction: lean HARD into the editorial register. One commanding serif display tier per view (φ³ display), a refined small-caps/italic body register, and a **dominant ink (`--foreground`/`--primary`) + sharp section-accent** model — not pastel-everywhere. Pastels become *syntax/grammar accents*, ink carries the hierarchy. Dark mode is already first-class (hand-tuned per-mode pastels in `preset-bbnf.css:53-63`); preserve and extend that to the section ladder.

---

## TOP 5 REFINEMENTS (surface → glass-ui lever)

**1. Drive the type hierarchy through the φ-ladder, not raw `instrument-serif` + Tailwind sizes.**
`FeatureCards.vue:66` (`instrument-serif text-base sm:text-lg`), `NavBar.vue:124/153` (`instrument-serif text-sm/base`), and `main.css:106-136` prose `h1/h2/h3` (`text-4xl/2xl/xl`) all bypass glass-ui's `--type-*` scale. Replace with `text-heading`/`text-subheading`/`text-title` (`typography.css:270-293`) so every heading sits on the √φ grid and inherits `text-wrap: balance` + tracking. Net: the same serif suddenly reads as a *system* not a one-off. HeroSection (`HeroSection.vue:59`, `text-display-2 sm:text-display-3`) already does this correctly — propagate that discipline everywhere.

**2. Split the display/body font duty — stop one face doing both.**
`preset-bbnf.css:7-8` maps BOTH `--font-display` and `--font-serif` to Instrument Serif, so headings and body are the same face at different sizes — the hierarchy leans entirely on size, losing texture. Keep Instrument Serif as `--font-display` (the editorial headline), but set `--font-serif` (body/prose register) to a refined text-serif with real reading weights at 16px (e.g. a Fraunces/Source-Serif-class face) so `text-body`/`text-prose` (`typography.css:310-326`) gain a distinct, characterful body voice. This is the single biggest "distinctive vs generic" lever.

**3. Promote `--primary`/ink as the dominant tone; demote pastels to accents.**
The landing palette is pastel-on-card everywhere (`FeatureCards` border + icon pastels, `HeroSection.vue:108-120` CTA pastels) with no dominant tone — the "timid" failure mode the methodology warns against. Bind CTAs and active-nav to `--primary` (`tokens.css:369`) as the commanding ink, and let pastels punctuate (syntax tokens `main.css:254-262`, feature-icon accents). Result: dominant-ink-with-sharp-accents instead of an even pastel wash.

**4. Adopt glass-ui's 13-rung `--section-color-*` ladder for per-section identity.**
`sectionTheme.ts:20-51` hand-maps 5 sections onto 5 of the 7 flat pastels — three section colors (`pink`, `cyan` unused arms) and the richer glass-ui ladder (`tokens.css:439-451`: rose→purple→indigo→teal→forest→amber→tomato…) go unused. Re-key `SectionTheme.color` to `section-N` tokens so each docs/nav section reads a distinct, designed hue with built-in `light-dark()` dark-mode resolution — replacing the per-mode manual pastel duplication and giving a wider, more intentional spectrum.

**5. Replace the local 3-tier card recipe with the glass ladder; add an atmospheric backdrop.**
`main.css:50-60` re-implements `card-base/subtle/elevated` as bespoke `bg-card/35..65 backdrop-blur` — exactly glass-ui's `.glass-wash/quiet/resting/floating` 5-rung ladder (`glass.css`). Swap to the canon rungs for consistent depth + dark-mode behavior. The landing (`LandingPage.vue`) is currently flat fills over `bg-background`; add a low-opacity `PaperBackdrop` (`/paper-backdrop`) or single aurora wash behind the hero for the atmospheric depth the methodology calls for — composes under the existing glass cards without touching content.

**Micro:** retire the leftover `text-[0.625rem]` instances flagged in `DESIGN.md:25` for `text-admin-label` (`typography.css:351`, mono + caps + tracked) so code-lang labels read as a designed micro-register.

---

## FILE WRITTEN

/Users/mkbabb/Programming/glass-ui/docs/constellation/next/design/bbnf/WC-design-typo-color.md
