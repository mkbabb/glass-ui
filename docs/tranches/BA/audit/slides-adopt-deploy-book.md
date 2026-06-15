# BA → slides adopt + deploy book (the hand-off to the slides session)

The hand-off note for the slides session (`~/Programming/slides`, the til-briefing deck on
slides.friday.institute). This book HANDS OFF — it edits NOTHING in the slides tree
(`docs/tranches/M/` + the slides repo are foreign, inv-10). The slides session executes the
adopt + deploy in ITS own tranche, on the user's greenlight.

**The slides consumer ground-truth (2026-06-15):** the slides session walked HEAD `c943a49` @
glass-ui 3.13.0 (the 12-subpath import surface) and corrected this book — the 4.0.0 break for
slides is EXACTLY TWO items; everything else is a clean bump.

## 1. The exact-pin

Slides re-pins `@mkbabb/glass-ui` to the **EXACT 4.0.0 cut version** (not `^`) — the d6-lineage
trap (a `^x` resolve silently traversing a registry bifurcation) is the reason the pin is exact.
`npm install` after the pin.

## 2. The TWO break items (the ONLY 4.0.0 breaks for slides)

1. **`DeckGate.vue:70` `<Button variant="primary-audacious">`** — the SOLE `btn-audacious`
   consumer in the slides tree (NO `gold-audacious` anywhere). W-GLASS-CAL retires the
   `btn-audacious` recipe family (the disco retirement, H2a — gold survives CALM but the
   `primary-audacious` variant rides the retired recipe). **The re-pin choice:** drop the
   `variant="primary-audacious"` binding (fall to the default glass button) OR accept the calm
   register. There is no alias — a clean break.

2. **`deck.css:1017` `--glass-tint-strength: 0%` (the interim arm AUTO-RETIRES at adopt with ZERO
   slides edit).** This local override (annotated "RETIRES when W-DARK-MATERIAL scope 7
   conditionalizes the self-engage") was the slides workaround for the AZ unconditional light
   self-engage graying the presenter card over a calm light page. W-DARK-MATERIAL scope 7
   conditionalizes the self-engage, so the presenter card un-grays at the adopt — the slides
   session can DELETE the `deck.css:1017` override (the gray-slab self-engage is gone library-side;
   the override is now a no-op). This is a slides-side cleanup, not a break.

**EVERYTHING ELSE is a clean bump** — no other slides re-point.

## 3. The NO-OPS (leave OFF the break list)

- **The W-HANDMARK `/underline` row is a PHANTOM break — STRUCK.** Slides imports ZERO
  `@mkbabb/glass-ui/underline` / `HandMark` / `GlassUnderline` (grep-clean repo-wide). The red
  pen-underlines on `SlideIntro`/`SlideCloser` are deck-LOCAL CSS/SVG `::after` glyphs, NEVER the
  library component. No slides re-point on `/underline`.
- **`/dialog` (W-SURFACE-AXIS scope 3) is a NO-OP for slides.** `DeckGate` sets no `variant` prop
  on its Dialog → the `variant`→`surface` move doesn't touch it.
- **`/dropdown-menu` (W-MENU-GLASS) is a NO-OP for slides.** `DeckSettings` wraps slides' own
  `.deck-settings__tile` markup as-child → the menu-row default-flip won't restyle it.

## 4. The slides-side adopt notes (slides-side work, NOT ours — recorded so this book does not double-count)

- **R5-7 veil + R5-10 menu-row** landed library-side (W-SURFACE-AXIS veil tier + W-MENU-GLASS).
  At adopt, slides DROPS its deck-local veil-plate / menu-row recipes onto the shipped surfaces.
  This is slides-side work, noted so the book does not double-count it as a glass-ui deliverable.

## 5. THE DEPLOY-STATE HEADS-UP (binding for the deploy step — a hand-off NOTE, NOT an orchestrator deploy)

slides.friday.institute was taken DOWN 2026-06-12 ("we cannot have that publicly facing") — it
currently serves a `noindex` holding page (wrangler direct-upload over the Pages production
branch; NO git change). Round 15 (the true-mobile band) is committed local at `c943a49` but NOT
pushed/deployed; the push is HELD for the user's re-publication greenlight.

**The W-CLOSE deploy/hand-off MUST NOT assume a live deck is up.** The slides session will
redeploy round-15 + the BA adopt TOGETHER on the user's greenlight — NOT onto a currently-live
site. The deploy step is therefore a hand-off NOTE (the exact-pin + the two break items + the
gray-arm auto-retirement), not an orchestrator-run deploy.

## 6. The adopt sequence (for the slides session, on greenlight)

1. Re-pin `@mkbabb/glass-ui` to EXACT `4.0.0`; `npm install`.
2. `DeckGate.vue:70` — drop `variant="primary-audacious"` or accept the calm register.
3. `deck.css:1017` — delete the `--glass-tint-strength: 0%` override (now a no-op; the card un-grays).
4. Drop the deck-local veil-plate + menu-row recipes onto the shipped surfaces (R5-7/R5-10).
5. `vue-tsc` + build + e2e green; commit on main.
6. On the user's re-publication greenlight: push round-15 + the BA adopt TOGETHER; deploy via the
   slides deploy path (`wrangler whoami` first — CF creds at the hinge). Live-capture verify.
