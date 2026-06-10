# FDR2-slides-panes — the 13-slide deck post-fixes, per slide light+dark, the chrome, and the forwardable pptx

Lane: FDR2-slides-panes · FD-R2 fleet · 2026-06-10
Surface: slides til-briefing (`http://127.0.0.1:5273/til-briefing`, dev server at HEAD `da173e7` + working tree).
Method: the full capture set in `FDR2-slides-panes/` (13×2 slide pairs + home/gate/settings/locked + 9 zooms, taken this morning on the settled tree) cross-verified by a live chrome-devtools walk with canvas-composited WCAG readbacks (every contrast number below is computed over the real composited plate, not the raw token), plus a fresh `npm run export:pptx` (light arm, the forwardable default) with all 13 embedded frames extracted and judged (`pptx-f01..f13.png`).
Brief lens: "glass, grid, math, large and audacious typography, with colorful audacious pops … within a sense of proportion."

**Verdict: the light arm is poster-grade 13/13 and the pptx is a faithful forwardable artifact (13/13 frames, retina, zero fidelity defects). The dark arm has ONE disease with three measured symptoms — the `glass-resting` rung composites to a mid-gray khaki plate (L≈0.65) over the near-black field, and every card on it fails or grazes AA. The deck chrome has one HIGH library-side defect (the pptx Light/Dark submenu opens per ARIA but paints clipped-invisible — a glass-ui `DropdownMenuSubContent` portal miss) and one reproduced theme-desync.**

---

## §1 Per-slide, light + dark

Captures: `s{NN}-{light,dark}.png`. The poster register = one headline, one focal red, one art object, generous negative space.

| # | slide | light | dark | suffusion read |
|---|---|---|---|---|
| 1 | Intro ("Finding errors, waste, and fraud") | **Exceptional.** The three-ink headline is the deck's thesis in typography — "Finding errors," in ink, "waste, and" in faded gray, "fraud" in red with the hand-drawn double underline. Constellation backdrop with the red ANOMALY node; presenter glass card; prose in a quiet wash panel. | **Holds.** Prose on the field measures 11.57:1 (the "dim" read at thumbnail scale is false). Constellation + red node carry atmosphere. | Type 5/5, math (constellation graph) 4/5, glass 4/5. The model slide. |
| 2 | $350M figure (the de-voided S2) | **Strong.** The giant red Fraunces figure (tabular lining numerals, wght 340) + "a direct result of this team's work." The new right-rail ledger ($500M+/$7B/yr/100%, hairline-ruled mono) fills the former void as a sub-focal counterweight; the faint statewide-outline watermark grounds the right half. De-void landed. | **Strong.** Red-on-black $350M is the deck's loudest pop and it's proportionate. | The one-big-figure poster register at its best; audacious type 5/5. |
| 3 | Already delivered (real viz PNGs) | **Good.** Three cards, each a red mini-eyebrow + claim + REAL tableau screenshot in a mac-chrome browser frame — authentic artifacts, not decoration. | **Good**, with the caveat that the three card plates read khaki (see §2's disease); the light screenshots inside pop hard against dark, which partially rescues it. | The real-artifact move is the credibility pop; color arrives via the data, correct. |
| 4 | Invoice receipt | **Strong.** The tossed, perforated receipt with REDACTED amounts (`NO. ▮▮▮▮`, `$▮.▮▮`) — deliberate per source ("never a literal figure"), and the block-glyph redaction rhymes with the locked-tile blur idiom: redaction is becoming a house register. Receipt could still grow ~1.3-1.4× (the middle band is generous dead space — synthesis item 16 corroborated). | **Good.** The paper-light receipt over black reads as an evidence exhibit under a spotlight. | Math/mono register 4/5. The $▮.▮▮ wit is exactly "delight, proportionate". |
| 5 | Fan-in (Σ join) | **Good.** Source chips fan into the Σ node → red FLAGGED RECORD. The math glyph carries the math axis literally. | **Good.** Red flag pops; chips go quiet dark. | The Σ is the deck's best math pop after the bell curve. |
| 6 | Claims dot-plot | **Strong.** Two dot strips (CLAIMS / EVERYTHING ELSE), one red dot lifted above the line with a dashed drop — the cheapest, clearest anomaly picture in the deck. | **Strong.** Red dot on black is even better. | Minimal-statistical poster; negative space is the composition. |
| 7 | Two records, one person | **Good.** Paired dot columns, the middle pair joined by the red SHOULD AGREE rule. Mono column heads. | **Good.** White/ink dots + red center hold. | Grid axis present (the paired-roll lattice). |
| 8 | Refund ("pay it back") | **Good.** Record slabs → MATCHED·OWED BACK chip → the $ coin. Headline red phrase "pay it back." The art sits small in a wide middle band — same growth headroom as S4. | **Good.** | The $ coin is quiet; this is the one example slide whose art undersells its claim. |
| 9 | Who audits the auditor? | **Exceptional.** The dotted bell curve with the scattered sample + the red OUTSIDE pin past the tail, EXPECTED on the baseline — the single best math-register frame on either repo surface. The centered mono segue ("Three tools, one shape … who runs all of it, continuously.") hands off to S10 cleanly. | **Strong.** | Math 5/5. |
| 10 | Sovereignty | **Good.** Server stack ⊣ cloud with the red blocked-doc glyph; mono YOUR HARDWARE / THE DATA STAYS PUT / YOUR CLOUD strip; the italic Newsreader oath line. | **Defective at the strip.** The WHO RUNS IT band is the khaki mud measured in §2 (`_zoom-s10-whoruns-dark.png`) — an edge-to-edge putty slab that reads as an unstyled aside, not glass. | The cloud's blue is the deck's ONE non-red accent — fine as an outline diagram tint. |
| 11 | X-ray nutrition label (the real label) | **Exceptional.** The FDA-register AI FACTS label (Education-Tuned 70B, 87.8, the red B grade plaque, the weighted dimension table) beside the REAL portal in a browser frame. The label's mono/rule typography is the most characterful artifact in the deck. | **Strong** — and the portal screenshot swaps to its dark arm (☾ DARK), a lovely detail; the label stays paper-light like the receipt: artifacts keep their material. | The portal's blue highlight is off-palette but it's a real product screenshot — authenticity wins. |
| 12 | Pipeline (the WOPR terminal) | **Strong.** The de-chromed WOPR photo in a bezel with `WOPR · TERMINAL 01` + ONLINE telemetry — the delight moment, discoverable and proportionate. Three numbered step cards (the third red-washed); THE HUMAN STAYS IN THE LOOP; the UNBIASED/PERIODIC/ON DEMAND footer. The densest slide, but it's the "how it runs" slide — earned density. | **Strong.** The photo's CRT amber glow blends into the dark field even better than light. | The WOPR is the deck answering "delight" without breaking the GovOps register. |
| 13 | Closer ("A proven team") | **Strong.** The red underline returns on "proven team" (S1 bookend), constellation returns with the ANOMALY→RESOLVED check node — the deck closes its own loop. Start small. card + presenter card mirror S1. | **Defective at the cards.** Both cards are the same khaki plate (measured §2) — "Start small." body text 3.16:1. The capture's apparent two-material read is a size illusion; they measure identical, which is the correct diagnosis: ONE wrong material, not two. | The bookend structure (anomaly → resolved) is the deck's quiet best idea. |

**Light arm: 13/13 hold the poster register.** Red discipline holds (one red per surface; the cloud-blue and portal-blue are diagram/artifact tints, not register breaks).

## §2 The dark-arm disease, measured

One mechanism, three symptoms. The dark `glass-resting` rung composites to a MID-luminance plate over the deck's near-black field (`rgb(21,17,15)`):

| surface | raw bg (computed) | composited plate | text | ratio | AA 4.5:1 |
|---|---|---|---|---|---|
| S13 "Start small." card (dark) | `oklab(0.65 0.002 0.014 / 0.74)` | `rgb(114,109,102)` | body `rgb(207,203,191)` | **3.16:1** | FAIL |
| S13 same card, title | 〃 | 〃 | title `rgb(232,231,227)` | 4.14:1 | pass (large-text 3:1) |
| home deck tile (dark) | card-cartoon plate | `rgb(120,115,108)` | summary `rgb(174,169,152)` | **2.00:1** | SEVERE FAIL |
| S13 same card, LIGHT arm | `oklab(0.977 / 0.74)` | `rgb(247,249,250)` | body | 6.88:1 | pass |
| S1 prose on the dark FIELD (no plate) | — | `rgb(21,17,15)` | `rgb(207,203,191)` | 11.57:1 | pass |

The diagnosis is precise: **the dark field itself is contrast-clean; only the khaki plates fail.** `backdrop-filter: blur(12px) saturate(1.05)` is real on the cards, but at α 0.74 over a void there is nothing to vouch for the glass — the plate reads as flat putty (L≈0.65, neither paper nor ink). Affected: S13 both cards, S10's WHO RUNS IT strip, S3's three cards, S12's step cards (partially rescued by their content), and BOTH home tiles. Fix direction (synthesis item 5, corroborated with numbers): deepen the dark card arm toward the ink plate and let the specular edge carry the glass read, or give the dark field a warm glow bleed under card zones so the blur has something to eat. Either move must lift body text past 4.5:1 — today it is 3.16/2.00.

## §3 Deck chrome

**Home tiles (light)** — clean index: Fraunces "Slides", red TIL eyebrow, two cartoon-shadow tiles, red `Open →`. Composition is spare but appropriate. (`home-light.png`)

**Home tiles (dark)** — the khaki tiles + the 2.00:1 summary are the worst single contrast number on either surface (`home-dark.png`, re-verified at HEAD `home-dark-live-HEAD.png`). The warm-red gradient bleed top-right is good atmosphere; the lower 60% is featureless void.

**The locked-blur tile** — the redaction conceit is excellent: blurred title/summary/CTA with the crisp red ACCESS KEY chip, and the blur LIFTS on hover (the tease — `home-locked-hover-dark.png`). Two nits: (a) the centered lock badge collides with the blurred headline glyphs (`_zoom-locked-tile-light.png` — it sits ON "Government"); (b) in the dark rest capture the chip blurs too (`_zoom-locked-tile-dark.png`), losing the one crisp affordance light keeps. NOTE: at HEAD this surface is dormant — til-briefing went public (`meta.ts softGated:false`, H.W6), so no live tile exercises it; the captures document the general facility.

**Gate modal (light)** — strong: the red lock disc (the icon-pop register, correctly used), Fraunces "This deck is locked", pill input, ink Unlock pill; the shake+error state is properly designed (`gate-modal-error-light.png`, `_zoom-gate-error.png`).

**Gate modal (dark) — half-theming defect.** `gate-modal-dark.png` shows the title VANISHED and the Unlock button as a pale slab: the card/letterbox surface stays light-gray while `--foreground`/button tokens flip dark — white-on-light ≈ invisible. Source-grounded: `DeckGate.vue` styles the title `color: var(--foreground)` with a comment asserting ">14:1 composited" — written for the light composite only. Dormant at HEAD (no gated deck) but it is the general facility's dark arm and it ships broken.

**Settings popover** — the THEME row + DarkModeToggle and the warm-Sun/cool-Moon submenu tints are the right idea. Two findings:

1. **HIGH (library-side): the Download PowerPoint Light/Dark submenu never paints.** Reproduced in light (prior capture `_zoom-pptx-submenu-open.png`) and dark (live, `settings-submenu-dark-live2.png` + `_zoom-settings-submenu-dark-live2.png`): ARIA reports `expanded`, the items exist (`Light theme`/`Dark theme`, on-screen rects x1057-1265), computed `opacity:1 visibility:visible z-130` — yet `elementFromPoint` at the submenu center returns `section.slide`. Root cause measured: glass-ui's `DropdownMenuSubContent.vue` does NOT portal (no `DropdownMenuPortal` wrapper), so the sub-content mounts INSIDE `DropdownMenuContent`, whose base class carries `max-h-[60vh] overflow-y-auto` — `overflow-y:auto` forces horizontal clipping, and a child offset 233px right of a 238px-wide menu is clipped to nothing. Every glass-ui `DropdownMenuSub` consumer is affected; the deck's pptx download is pointer-unreachable (keyboard arrow-right can still activate the clipped items blind). Owner: glass-ui `dropdown-menu` (portal the sub-content), not the deck.
2. The popover composes fine otherwise; "cramped" (synthesis) is mild — 13rem min-width with two rows is tight but coherent.

**Theme desync (reproduced once).** With `vueuse-color-scheme='light'` in storage, the live document still carried `class="dark"` until a second hard reload (`{scheme:'light', cls:'dark'}` → reload → `{scheme:'light', cls:''}`). Corroborates the known persistence/gear re-fire bug (L.W-CHR-R2's charge).

**Dock** — the pager (home · chevrons · 13 dots · gear) is quiet and right; the red current-dot is the one pop it needs. One ergonomic note: a first click on the gear was swallowed as slide-nav (hash #3→#2) before a second click opened the menu — consistent with the edge-zone layer competing with the dock; worth a check in the chrome wave.

## §4 The forwardable pptx

`npm run export:pptx` → `dist/exports/til-briefing.pptx` (10.9 MB, 13 slides, 16:9). All 13 embedded frames extracted and judged (`pptx-f01..f13.png`): **2560×1440 retina, full-bleed, chrome-free, 13/13 present and faithful** — constellation, Fraunces variable weights, the receipt redaction, the WOPR photo, the tableau screenshots, and the X-ray label all survive. The image-per-slide strategy earns its keep.

Two false alarms run down and retracted during this audit (recorded so the next auditor doesn't re-flag them):
- **S1's gray second line is NOT an export fade** — the three-ink headline (ink/faded/red) is the live design, confirmed at zoom in both the export frame and the live deck (`_zoom-pptx-s01-headline.png`).
- **S4's ▮ blocks are NOT tofu/frozen animation** — the receipt is deliberately redacted in source ("the one-digit block-glyph idiom — never a literal figure", `SlideExampleInvoice.vue:44-46`); live and export agree (`_zoom-pptx-s04-receipt.png`). The prior capture pass misread the thumbnail as real digits.

Residual: the pptx is light-only by default; the dark arm (`export:pptx dark`) would currently bake the §2 khaki cards into a forwarded artifact — fix §2 before shipping a dark pptx. And the in-app path to this artifact is the §3.1 clipped submenu, so today nobody can download it by mouse.

## §5 Calibration — the exceptional, named

- **S1/S13 as a bookended pair** — ANOMALY node opens, RESOLVED check closes; the red underline migrates from "fraud" to "proven team". Structure as design.
- **S9's bell curve** — the best math poster on either surface.
- **S11's nutrition label** — the most characterful artifact; real product, real register.
- **The three-ink S1 headline** — errors=ink, waste=faded, fraud=red. The deck's argument compressed into typography.
- **The redaction register** — receipt blocks + locked-tile blur + gate lock-disc are converging into a coherent house idiom (confidentiality as a visual move).
- **The pptx pipeline** — a 13/13-faithful forwardable artifact is rare; this one is genuinely send-ready (light).

## §6 Ranked defect list (this lane's surface only)

| # | sev | finding | owner |
|---|---|---|---|
| 1 | HIGH | Dark khaki plates: card body 3.16:1, home tile summary 2.00:1 (S13/S10/S3/home) — one rung-level fix | L.W-GLASS-SUFFUSE (slides dark card arm) |
| 2 | HIGH | glass-ui `DropdownMenuSubContent` un-portaled + content `overflow-y-auto` → every submenu paints clipped-invisible (pptx download pointer-unreachable) | glass-ui dropdown-menu (NEW row for W-COHERE/SB2 bucket) |
| 3 | MED | Gate modal dark arm: title/button half-themed to invisible (dormant facility, still broken) | L.W-CHR-R2 |
| 4 | MED | Theme desync needing a second reload (reproduced: scheme light / class dark) | L.W-CHR-R2 |
| 5 | LOW | Locked-tile: lock badge collides with headline; dark rest-state blurs the chip (light keeps it crisp) | L.W-CHR-R2 (dormant) |
| 6 | LOW | Gear first-click swallowed by slide-nav edge zone | L.W-CHR-R2 |
| 7 | LOW | S4 receipt + S8 coin art undersized in generous dead space (~1.3-1.4× headroom) | L.W-POSTER-R2 residual |

Suffusion bottom line for the deck: the brief's axes are all present in the LIGHT arm at high register (type 5, math 5, glass 4, pops deliberately disciplined to the one-red rule — correct for the audience). The dark arm doesn't need more pops; it needs its one material fixed.

Capture index: `FDR2-slides-panes/s{01..13}-{light,dark}.png` · `home-{light,dark}.png`, `home-locked-{light,dark}.png`, `home-locked-hover-dark.png`, `home-dark-live-HEAD.png` · `gate-modal-{light,dark}.png`, `gate-modal-error-light.png`, `gate-modal-dark-live.png` · `chrome-settings-open-{light,dark}.png`, `settings-submenu-dark-live{,2}.png` · `pptx-f{01..13}.png` · `_zoom-*.png` (9 prior + 4 this pass).
