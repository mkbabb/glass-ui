# Intent-first motion: the study's brief (INBOUND O-278)

## The owner's words, 2026-11-12, verbatim

First message, with the frame `owner/google-chat-icon-bar-2026-11-12.png` (Google Chat's icon bar: four outline icons on two grey plates; the hovered pin sits on a peach plate shaped as a soft-cornered pentagon):

> I really like the google icon animations, which have svgs that grow, morph, and animate in and out smoothly on hover. Perform a design study on the google websites, apple websites, heretofore mentioned design websites from many sessions and notes ago (design class websites), and this https://chat.google.com/u/0/app/chat/1GLrwaAAAAE page--record, analyze, and suffuse small design elements like this into glass-ui. Communicate with our other sessions, too, and note items like this in our design style guides.
>
> For all items, we should aim to communicate intent first with hover states, design affordance with color, icons, and foremostly animation--items that grow smoothly from BEGINNING TO END with START AND STOP animations in and out--this is critical. Growing instantly in height or other states is not acceptable ever--all items should be tweened. Hovers, colours--and the MOVEMENT OF MOMENTUM and BREATH OF LIFE edicts should be communicated to our sessions and exhorted thrice in our styles--items should have weight, momentum, and breath. Large elements and focused items should have interactivity states, idle states, and communicate progress, loading, and intent with transitions.

Second message, minutes later:

> We should look to best and study all of the above, particularly the glass-morphism in the most modern and deft sense from ios 27, macos 27, and the apple sites--look to safari-compatible practicies, too. And with a performance unioned mindset. NO overuse of shading, transition, or markup--this is an AI smell. Have touch like apple.

## What the two messages ask for, read together

1. **Record and analyse** the small motions that carry intent on: Google's sites (Chat's icon bar first; Material 3 Expressive shape and icon motion), Apple's sites and the current Apple material (iOS 27, macOS 27: the newest, deftest glass), and the design references earlier glass work cites (emilkowal.ski, family.co, rauno.me, m3.material.io motion, Apple HIG materials and motion; see `docs/tranches/BG/keystones/research/MOTION-sota.md`, `KS-MOTION-DISNEY.md`, `KS-AWWWARDS-DEMO.md`, `docs/tranches/BB/waves/BB.W-MOTION-CANON.md`, `docs/tranches/AX/research/`). "Design class websites" is read as those references; say so, and name any other candidate found in the records.
2. **Suffuse** them into glass-ui as small pieces: icons that grow, morph or draw on hover and state change, in and out; a hover plate that grows from the control and changes shape with intent; idle, interactive, progress and done states for large and focused elements.
3. **The law** (already in the precepts, d5fb05c: `motion-canon.md` P0, `affordance-map.md` "Intent first", `restraint.md`): nothing changes instantly; every change is tweened from beginning to end, in and out, with weight, momentum and breath.
4. **The counterweight, equally binding:** "NO overuse of shading, transition, or markup--this is an AI smell. Have touch like apple." The study's output is FEW pieces, each deft: one motion per intent, one layer per surface, no added wrappers, no decorative transitions, no shadow or gradient stacks. Apple's touch is the bar: a change you feel more than notice. Every proposal states what it removes as well as what it adds.
5. **Safari-compatible and fast.** Every technique must work in shipping Safari (and say from which version), with no masking fallback; animate compositor properties (transform, opacity, clip-path where the engines composite it), no layout per frame, no backdrop-filter re-filter per frame, no per-element observers at rest. Each proposed piece carries its cost: bytes, DOM nodes added (target 0), properties animated, and a frame-time reading.

## Cases already in hand (cure these; they are the "never" list)

- `../dock/inbound/daraksha-dock-jumps-2026-11-11.md`: every daraksha dock state change that jumps in width or height.
- `../dock/inbound/atlas-rail-state-changes-2026-11-11.md`: atlas's rail.
- From value.js, 2026-11-12: color at 390, the Palettes to Mix card swap shows two cards' text side by side for 60 to 250 ms and a double hop jumps about 590 px (`demo flipRegions.ts:84`); an untouched dock's idle fold cost 37 layouts in a scroll test (in 11.0.2); keyframes' labelled triggers have a flat-sided hover plate (in 11.0.2); on daraksha: dots that teleport, a highlight that vanished on leave, page changes arriving fast from the bottom right, dock nav changing height and width instantly.
- INBOUND rows O-248 (every dock change eased), O-250 and O-261 (pager dots), O-264 (Sheet overshoot), O-275 (the dock lingers by dwell), O-276 (figure dock states), O-254 (the Slider's refine view: "more rounded, well-defined, and re-designed"), O-253 (haptics).

## To keep (he has praised these)

- The colourful icons on keyframes.babb.dev ("like the colourful keyframes icons, but with her palettes") and keyframes' control buttons. The audit server at http://127.0.0.1:4411/ serves keyframes when value.js has it up; else read `~/Programming/keyframes.js` (read-only).
- One layered dock that grows from the centre, fissions and fuses; the bare theme icon fissioning out beside it.
- `docs/precepts/restraint.md`, "What he wants instead".

## Consumer asks received after the brief (2026-11-12)

- atlas will adopt the animated icons, the morphing hover plate and the no-snap check from glass and build none of its own. It asks that the no-snap check be runnable by a consumer against its own pages. The spec should ship the check as an exported test helper, not a glass-only script. Its census will be at `sci-report/atlas/docs/tranches/U/design/stories-2026-11-12/SNAP-CENSUS.md`.
- speedtest has reversed its "idle is still" gate: the idle pane breathes, without ornament. Its frames will carry strips of each phase change and of the Start hover at 1440 and 390.
- The owner, via value.js, 2026-11-12: "INTUITIVE UI without overuse of markup, with clear nav, homebuttons, and each icon should have animated hover states, like our communicate from glass-ui." The icon piece must drop onto any icon in any consumer with one import and no wrapper. The theme toggle's hover animation (O-279) is its first named user.
- atlas's census is in `inbound/ATLAS-SNAP-CENSUS.md` (296 rows read from source; 13 are glass's, the most visible being that closing an enlarged plate is a cut). Two findings for the design: almost nothing in atlas wraps elements that come and go, so one glass presence piece with a proper start and stop, height included, would cure about a third of its list; and atlas wants the reduced-motion fade from glass as a token or helper. The analyst, proposers and spec seat read this file; the spec takes the 13 glass rows into its census section.
