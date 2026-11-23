# Critique: the choices page, through the truth lens

Seat: one Opus critic (claude-opus-5-5), 2026-11-23. Read only; nothing in any repo was changed.

Scope: `glass-choices.html` (2,365 lines, read whole, markup, styles and script), against `CHOICES.md`, `PRIOR-STUDIES.md`, `BM/study/DESIGN.md`, the glass-ui source on master (`57b9c5fe3`), `release/11.1.1`, tag `v11.1.0`, and the dock branch `bl/dock/wi8` (`d48c19ec8`, read-only). Every BEFORE was checked against the source it claims to draw; every AFTER against the section or ruling it claims. Judged twice: a first pass over all 51 choices, then a second pass that re-read the source behind each objection and dropped two that did not hold (listed at the end).

## Verdict

Most of the page is faithful. The six spring curves are copied byte for byte from `scheme-spring.css`, the dock's firmer plate (level 0.7, 11.2 px) and its five steps match the branch, the fold's 82 ms window, the split letters A, A2 and C, the goo filter, the chrome plate's alphas, the firm plate (0.35 of the overlay rung, 7.7 px), the 11.1.1 exit clocks and curve, and the dock table's amended defaults all hold. But five BEFORE cells draw something glass-ui does not do today, one AFTER draws a curve the study retired, and two cells wear the default ring where the records give a different default or none. Three of the five wrong BEFOREs are on choices where the page tells Mike that this page, on his phone, is the reading.

## Objections

### T1 (major). Choice 10's BEFORE is the study's C, not today's grow

- **Claim.** The cell "Before · Today, and C · The grow, from the button · Ships until you pick" draws the menu born over the button as the button's own 44 px circle (`clip-path: inset(0px 206px 144px 0px round 22px)`), growing right and down, with the button hidden in one frame (`.gstage .seat.lent { opacity: 0; transition: none; }`).
- **Evidence.** glass-ui's grow on master and on 11.1.1 is not that. The menu sits beside its trigger, and "a clip uncovers the laid-out plate from the edge facing the trigger, from a strip the trigger's height to the whole plate … only the plate's far edge travels" (`src/styles/glass/reveal.css:267-290`; keyframes `src/styles/animations.css:191-204`, a full-width inset with `-2rem` bleed on three sides and `calc(100% - anchor-height)` on the far side; `release/11.1.1:src/styles/glass/reveal.css` the same strip as transitions). The trigger is never covered or hidden. CHOICES itself separates the two: "C. Today's grow, started from the button" (`CHOICES.md:232`), and DESIGN §6.4 item 3 names C "today's grow started from the button". The page merges today and C into one cell and puts "Ships until you pick" on C.
- **Why it matters.** Mike may pick C believing it is what ships. What ships is a one-axis unroll from a full-width strip under the button.
- **Remedy.** Draw today's grow as its own BEFORE (menu below the button, full width at once, far edge travelling on bloom, button untouched) and move C to an AFTER. The "Ships until you pick" tag stays on the BEFORE only.

### T2 (major). Choice 4's B lane for panel plays the retired curve

- **Claim.** The B column eases the panel puck on `cubic-bezier(0.198, 0, 0.106, 1.343)` (the `SPRINGS.panel.bz` entry, commented "pass-2 delivery, tokenReplacement"), and the text says "the bounciest within 3.67 %, keeping its bounce".
- **Evidence.** That bezier is pass 2's free fit, peak 1.0561 (`pass-2/delivery/ledger.mjs` output, `tokenReplacement.panel.bezier_peak`), which DESIGN pass 3 retired: "panel's free fit peaked at 5.61 %, a ζ 0.676 spring, under the owner's floor … Panel is refitted with its peak held at its own row's: `cubic-bezier(0.215, 0, 0.059, 1.288)`, peak 4.20 % (ζ 0.71), 3.67 % from today's token" (`DESIGN.md:333`; `pass-3/fold/panel-fit.json`). The page shows the 5.61 % curve under the 3.67 % caption; filmed, B's panel puck passes its rest by 5.60 % where today's passes by 4.21 % (see the probe). The question's "at most 2.65 %" is the retired fit's figure too; after the refit every other row is within 2.44 % and panel within 3.67 % (`DESIGN.md:333`).
- **Remedy.** Use `cubic-bezier(0.215, 0, 0.059, 1.288)` for panel's B and restate the bound as "at most 2.44 %, panel 3.67 %". The same stale panel curve sits in CHOICES (`:121`, `:126`) and should be corrected there.

### T3 (major). Choice 12's BEFORE uses neither glass-ui's blurs nor its dialog plate, on a choice the page says to read on this page

- **Claim.** "Today, and A · Both" draws the veil as a uniform `blur(16px)` over the whole stage and the dialog as `--tint` (card at 55 %) under `blur(22px)` (`.veil.blur`, `.dialog.frost`). The foot says "This page blurs live on the phone."
- **Evidence.** The dialog is `.glass-floating` (`src/components/dialog/DialogContent.vue:183`, `surfaceClass("floating")`): the warm ink at 0.18 (0.22 in dark) over a 20 px blur (`src/styles/tokens/glass.css:20-21`, `:72`). The veil is the focus veil at the floating radius, 20 px, under a mask centred on the dialog (`glass.css:112`; `DESIGN.md` §10.6). So today's plate is a thin dark tint, not a cream panel at 55 %, and both blurs are 20 px, not 16 and 22. B's "tint only" inherits the same 55 % card. The values come from the reading page (`pages/P8-present.html:137`, `:142`), which has the same drift. The dialog's entrance is also not today's: the page uses 200 ms on present from 0.96; glass-ui's overlay register is panel (0.45 s, 4.2 % overshoot) from 0.94, with a 6 px blur of its own pixels clearing and a 0.5rem slide (`src/styles/tokens/motion-registers.css:69-74`).
- **Remedy.** Draw A with the floating plate (`oklch(0.28 0.035 70 / 0.18)`, dark `oklch(0.17 0.03 70 / 0.22)`) under 20 px, the veil at 20 px, and B's plate as that same tint without its blur. Correct P8-present the same way, or drop "this page blurs live" from the foot.

### T4 (major). Choice 3's dark BEFORE is one rung firmer than 11.1.x's dock, on a choice the page says to read on this page

- **Claim.** "Today, 11.1.x" paints the dark dock with `--dk-veil: oklch(0.17 0.03 70 / 0.18)` at full level. The foot says "These docks blur live here, so this page on your phone is the reading."
- **Evidence.** 11.1.x's open dock rides `--glass-veil-dock`, base minus one step (`src/styles/tokens/glass.css:135`; `v11.1.0:src/components/dock/styles/shell.css:147-148`), and the dark arm moves the base to 0.18 (`src/styles/tokens/dark-arm.css:285`), so today's dark dock is ink at 0.14, not 0.18. The light BEFORE is right (0.10). The AFTERs are right: the branch moves the dock to the base rung (`bl/dock/wi8:src/styles/tokens/glass.css:135`) and its level to 0.7 in dark (`:274`), which the page draws as 0.18 at 70 % with 11.2 px. So the page narrows the step from today to A, the very difference Mike is asked to judge.
- **Remedy.** Draw today's dark dock at `oklch(0.17 0.03 70 / 0.14)`, full level, 16 px.

### T5 (major). Choice 27's "Today, and A" is not how glass arrives today, and contradicts choice 10

- **Claim.** The BEFORE cell "Today, and A · Full strength" plays a fade and a 0.96 scale on present over 200 ms, and says "By opacity and scale, your rule of 9 November … The toast's exit drives its blur over 317 ms, the one shipped part that breaks it."
- **Evidence.** On the frost alone, today is A: no shipped entrance animates `backdrop-filter`. But the motion drawn is the study's proposal, not today's. Dialogs, popovers and toasts enter on panel (0.45 s, 4.2 % overshoot), from 0.94, with `filter: blur(6px)` clearing on their own pixels and a 0.5rem slide (`src/styles/tokens/motion-registers.css:69-74`; `src/styles/glass/reveal.css:144-184`). That blur leg, and the menu's `clip-path` grow, are shipped parts that break "Transform and opacity only" (`docs/precepts/restraint.md:143`), and the page says so itself on choice 10 ("In Safari the clip runs on the page's thread, against your later 'transform and opacity only'"). "The one shipped part that breaks it" is therefore false on the page's own terms. The sentence comes from CHOICES (`:537`).
- **Remedy.** Label the cell "A" alone, or draw today's entrance beside it. Replace "the one shipped part that breaks it" with what is true: the toast's exit is the one part that animates the frost; the overlay entrances also clear a 6 px blur of their own and the menu grows by a clip.

### T6 (major). Choice 7 rings B as the default where the standing default is A

- **Claim.** B wears the default ring (`cell is-default`, tag "Proposed"), and the table of contents shows "B proposed". The intro says the page shows each choice "with the default marked".
- **Evidence.** CHOICES: "B is the study's proposal; A is what ships" (`:182`). The dock page's question 6 defaults to keeping all three and deciding the rim for every surface at once (`BL/design/dock/wi8/OWNER-READ.md:80`; `PRIOR-STUDIES.md:111`, item 6). If Mike says nothing, A holds. The ring tells him B does.
- **Remedy.** Move the ring to the BEFORE ("Today, and A"), keep "Proposed" as a tag on B without the ring.

### T7 (minor). Choice 6 rings A where the study names no default

- **Claim.** A wears the default ring with the tag "Drafted".
- **Evidence.** "A is what the material floor already drafted solves for. The study names no default" (`CHOICES.md:164`). The page's own note repeats that, so text and ring disagree.
- **Remedy.** Drop the ring; keep the "Drafted" tag, as choice 10 keeps "Ships until you pick" without a ring.

### T8 (minor). Choice 31 says the giant rectangle "is being cured"; it shipped cured in 11.0.2

- **Claim.** "In flight its neck has painted a bar far past the dots (300 px for one hop on a 152 px ring), the giant rectangle you saw, which is being cured."
- **Evidence.** The cure is `065ae4240` ("the worm measures its dot off a body's box, so a one-dot step bridges no more than the gap and a dot"), contained in tags `v11.0.2` and `v11.1.0`; `src/components/pager-dots/worm.ts:131-136` now reads the dot from `offsetWidth`. The page's own studies table says "11.0.2 fixed the worm's bar", and `PRIOR-STUDIES.md:198` agrees. The sentence comes from CHOICES (`:594`). The BEFORE's worm also runs 360 ms ease-in-out where the measured worm runs 254 to 280 ms per hop (`BL/design/reference/apple-homeview/GAP.md:157`, P-18). Separately, (a) wears the default ring as "Recommended", where the Home View study's three questions have no default (`PRIOR-STUDIES.md:150-152`); and the resting capsule (question 2) is drawn only inside (b), so (b) looks as if it brings the capsule and (a) cannot have one.
- **Remedy.** "In 11.0.2 the bar was cured; the active dot still differs by colour alone." Drop the ring from (a), keep "Recommended". Say under the strip that the capsule is its own question and fits either letter.

### T9 (minor). Choice 47's rule fades in; the design draws it

- **Claim.** Replay "draws each once, as when you scroll to it"; the rule's Replay animates `text-decoration-color` from transparent to the ink.
- **Evidence.** "The only thing left of the hand is the draw: the ink is laid once along the line, in 200 ms on the shared spring, when you scroll to it" (`BL/design/marks/OWNER-READ.md:25`). A colour fade is a different motion from a stroke laid along the line.
- **Remedy.** Draw the rule along its length (a clip or a `background-size` sweep on a copy of the decoration) on present's curve, or say in the note that the draw is not shown.

### T10 (minor). Small value drift in four BEFOREs

- Choice 7: the dark top line is drawn at 10 % white; glass-ui's dark arm draws 8 % (`dark-arm.css:386-387`). The shade line is drawn on both sides; glass-ui draws it on the left and bottom only (`glass-fx.css:64-66`, `:100-105`).
- Choice 6: the dock pill in "Today" is drawn at the resting rung (0.14 / 0.18); the dock's rung is 0.10 / 0.14 (as T4).
- Choice 23: the held fill moves on the proposed bezier over 120 ms and returns on `cubic-bezier(0.34, 1.56, 0.64, 1)` over 260 ms; glass-ui holds on `--spring-press` and returns on `--ease-cartoon-punch` over 300 ms (`src/components/slider/styles.css:295-321`), and its loupe also frosts the page behind it, which is not drawn.
- Choice 9: today's press curve starts `linear(0, 0.0284 2.04%, …`, where `--spring-press` starts `0.00284` (`scheme-spring.css:59`); invisible at 2 % of 120 ms, but it is a copy error.

### T11 (minor). What the earlier-studies rows and the 49 to 51 block leave out or mark differently

- The specular dot row is marked "Settled, yours to reverse". `PRIOR-STUDIES.md:28` marks it "decided but not built": nothing is in a release, and it is booked for 11.1.2, which is not cut. Both can be true, but the mark is not one of PRIOR's five, and the row should carry PRIOR's.
- The Slider row is dated 11 Nov and quotes the 12 Nov 12:05 note (`PRIOR-STUDIES.md:167`).
- CHOICES 51's content is absent: the demo site's seven defaults and the dock's first questions' defaults (names above icons, a figure's controls dock opening whole, icons only with names above, nine tenths, out-then-in between layers, a dock that follows its room at once), each "yours to reverse" (`CHOICES.md:746`). The page says "on its seven defaults" without naming one, so none can be reversed from the page.
- Glass Corner Ghosts, the reading that decides whether C's clip keeps a round frost in 11.x (`CHOICES.md:770`), is not named on choice 10.

## Checked and true

- Choice 1: 4,741 / 5,180 / about 5,147 / 4,755 lines on one scale (5,200), the meter marks at 91.17 %, 99.62 %, 98.98 %, 91.44 %; 104,297 and 104,596 bytes; matches `OWNER-READ.md:210`.
- Choice 2: 63 used + 17 unused = 80; A 78; B 79; C 95 until 12.0.0. Default A.
- Choice 3 AFTERs: the five steps 1, 0.85, 0.7, 0.55, 0.4 (`RULINGS-6.md:92`); A is 0.7 with 16 × 0.7 = 11.2 px, B 0.55 with 8.8 px; light at the base rung, 0.14, 16 px.
- Choice 4 BEFORE: all six `linear()` curves and settle clocks are byte-identical to `scheme-spring.css:59-64`, `:102-107`. The five non-panel beziers match `tokenReplacement`.
- Choice 5: the first plate's 0.12 s fade and 0.2 s growth from 0.876 (`W-B.17.md:192-193`); a is 12 % × 0.4167 = 5 %; Google's frame grows from 0.8 and turns over 0.5 s and cuts on leave (`intent-motion/OWNER-READ.md:11`). No default.
- Choice 6 AFTERs: 0.897 / 0.872, 0.545 / 0.739, 0.437 / 0.616 (`DESIGN.md:473-475`, `:953`).
- Choice 8: the fallback zeroes every transition (`a11y-overrides.css:46-53`); A's 100 ms dips and 150 ms length; B keeps the colour legs.
- Choice 9: dock seat and Switch at 0.96 (`scale-paper.css:10`, `:25`; the Switch composes `.tap-squish`, `Switch.vue:46`); A 0.97.
- Choice 11: 11.1.1's menu exit about 222 ms with the clip running back, popover 250 ms with a slide, dialog 180, tooltip 120, all on `cubic-bezier(0.3, 0.2, 0.7, 0.8)` (`release/11.1.1:motion-registers.css:147`, `:152`).
- Choice 13: today's rows, dock rung to rung and bloom to open and close (`DESIGN.md` §10.5).
- Choices 15 to 18: lifts 1.06 and 1.16, the twelfth, the stretch bounds, the 0.21 s glide and the 100 + 100 ms fade; defaults A, A, A, C.
- Choice 22: the jump, the follow with a seeded settle, the step travel on the press row; default B.
- Choices 24 and 25: A's fill over the seat's overlap and glyph over the last 70 %; A2's last 8 px and 90 ms folding leg (`DESIGN.md:1250`); the goo filter σ 4 and `0 0 0 20 −9.5` in sRGB, glyph outside the layer (`:1252`); the fold's window `w(x) = clamp(1 − x/0.55)` on the plate's progress, gone at about 82 ms (`RULINGS-2.md:27`, `DESIGN.md:1292`); B on the dock row, C on the press row with 2.79 px past rest (`DESIGN.md:1307`).
- Choice 26 BEFORE: shrink 0.12 and quiet 0.28 (`scroll-chrome.css:46`, `:52`), 116 px, 8 px turn, 140 ms stop.
- Choice 28: the floating veil at 0.18 under 20 px; the firm plate at 0.35 of the overlay rung's ink with 22 × 0.35 = 7.7 px (`release/11.1.1:surface-axis.css:91-110`).
- Choice 30: today's knob paints `--card` (`switch/styles.css:36`).
- Choices 36 to 45: the page follows the amended defaults of `RULINGS-6.md:335-339` and `RULINGS-8.md` (39: one side only where a site asks; 41: nine tenths for an icon-only seat, 21 px beside a word; 42: 6.5 % in light, 5 % in dark, which is also the branch's `--dock-hover-step`). `PRIOR-STUDIES.md:120` and `:122` still carry the unamended defaults for 15 and 17; the page is right and PRIOR is stale there.
- Choice 48: 4.0 px per 100 on a desktop, 1.4 on a phone (`depth/OWNER-READ.md:47`).
- Every choice 1 to 48 and the three 12.0.0 questions are on the page; the TOC's default column matches CHOICES apart from T6 and T7.
- Earlier-studies rows: every date, quote and mark matches `PRIOR-STUDIES.md` apart from T11; the release claims hold against git (`065ae4240` and `0e3cbfb3d` in `v11.0.2`, `72f2d5ec5` in `v11.1.0`).

## Dropped on the second pass

- Choice 25's A ties the seats' fade to the plate's progress, which first read as a model of a clock. RULINGS-2 defines the window on the spring's progress (out is `w(e)`), and 82 ms is where the dock row's curve reaches 0.55, so the page is right.
- Choice 24's A2 "60 ms ghost" against a 90 ms leg in the script: DESIGN gives both (a 90 ms leg, gone 60 ms after contact). True.

## The probe

One headless Chromium run under `guarded` (browser pool, 2026-11-23 12:07, rc 0, no leftovers), 1440 px, light, one context, closed in `finally`. The page threw no script error. Headless Chromium is not Safari; these readings are of the page's own script, not of any phone.

- **Choice 4, one Replay, every puck sampled each frame.** Today's lanes: press, present, dock, bloom and world stop at the end of their 384 px track; panel passes it by 16.15 px, 4.21 %, the token's own overshoot. B's lanes: the same five stop at the end; panel passes it by 21.5 px, 5.60 %. That is the free fit DESIGN retired (T2), not the refit's 4.20 %.
- **Choice 10, C's clip through one Replay.** After the 120 ms leave, the lane snaps to `inset(0px 206px 144px 0px round 22px)` (the button's own 44 px circle at the button's corner), then grows to `inset(-32px round 48px)` on bloom. glass-ui's grow starts from a full-width strip the trigger's height and never covers the trigger (T1).
