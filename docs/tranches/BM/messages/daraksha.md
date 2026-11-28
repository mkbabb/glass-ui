# To daraksha

Hi,

Here's what glass's next releases bring to daraksha, held to your budget: the reader route sits at 125.3 of its 126 KB of eager script, and the whole site has about 6 KB free. I read `origin/master` and `b13` before writing, and the lines below are the same on both. The site pins glass at 11.0.2 (`package.json:32`), so each part reaches you when you move that pin to the release that carries it.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut.

## The occasion mode's crash

I saw your fix on `b13` (`3eb1f60`): the occasion's dress set the dock's plate-border tokens to a `color-mix()`, glass mixed those again inside its own, and WebKit's page process died resolving the nested mix. Thank you for bisecting it down to that. It's the same fault keyframes and color hit on glass's own nested tokens, and the first fix in 11.1.2 flattens every glass colour token so it mixes one level deep. Your one-colour ring is the right shape on your side, and nothing below mixes a token of yours inside one of glass's. The dock rule you traced, the `:has(:empty)` selector that restyled the whole page on every insertion, becomes two attributes on the dock's root in 11.1.2 as well, and nothing in this note brings it back.

## Three of your recent asks

- Your selected seat's 1.5 px ring is clipped at top and bottom for a few frames while the dock expands. 11.1.2 gives the dock's morph clip room for a ring drawn outside the seat, so it stays whole on every frame, and the fold that comes later keeps that room.
- The reader tray (`src/scripture/PhraseTray.vue:133`) is a small glass Card, and its corner is the card's 16 px. Glass has no corner yet for a card that floats over the page; the first minor after 11.1.2 adds one, designed there (dialogs and sheets use 24 px today).
- For the portraits' dots, glass's PagerDots already draws its own pill round them, the `ring` prop, on by default, and `PortraitsPage.vue:563` turns it off with `:ring="false"`. Dropping that line gives you the container now, with no new release.

## The minor that brings the dock redesign

The dock's seats move to a flat hover plate in the seat's own tone, at 6.5 % in light and 5 % in dark, with the current seat at 10 %, and the glyph keeps its colour. Those values come with the minor that brings the dock redesign. In 12.0.0 the dock's controls move onto glass's shared plate, which carries its tone at one opacity rather than mixing it, so a tone you set stays one level deep.

Glass's own dark-mode toggle now follows your ThemeControl's grammar with fewer parts and a glyph of its own: a sun draws its rays in under its disc while a night slides across to carve the crescent. I took the idea and none of its assets, and your ThemeControl stays yours.

Two changes in this minor reach ThemeControl. It flips through glass's `useGlobalDark().toggleDark()` (`src/shell/ThemeControl.vue:17`, `:27`), and from this minor a flip glass makes is one 200 ms crossfade of the whole page, the ground, the words and the glass together, so the khatam's flip crosses too. Its glyph moves on its own transitions keyed off `.dark` (`:62-63`, `:95-117`), and the crossfade would cross it with its old picture unless it's marked to draw live. Glass adds one attribute for that, which you'd set on the khatam's `svg`: while the crossfade runs, glass gives it a name of its own, and its turn draws live above the crossfade. Your slices still flip first, as the note at `:24-28` has it, and then the page crosses instead of flipping on one frame (my seventh question).

ThemeControl is also a `DockControl` with `:aria-pressed` (`:37`), so in dark mode the dock paints it with its whole active block, the fill, scale, border and shadow (on your pin, `icon-button.css:192-197` in 11.0.2). Glass adds a second attribute for a control whose glyph already shows its state: it keeps the plate to hover and focus and lifts that block, the resting light and the press tone from the control. Glass's own toggle carries it from this minor. Would you like ThemeControl to take it, or keep its filled rest (my eighth question)?

Your dock's and your ground's view-transition rules (`src/App.vue:95-119`, `src/styles.css:238-249`) aren't scoped to a transition type, so on a flip the dock's labels would leave in 89 ms and come back on your page clock, and `dk-ground-field` and `dk-ground-tint` would cross on your page clocks, while the rest of the page crosses in 200 ms. Scoping them to your own page transitions' types puts the dock and the ground on the flip's clock (my ninth question).

This minor also gives the theme seat a small round dock of its own, which a page places in a corner on the main dock's baseline. Glass doesn't couple the two docks in this minor, so the main dock stays where it is, and nothing parts or joins: glass draws no split on a dock that blurs what's behind it. `src/shell/SiteDock.vue` marks three things "REMOVE AT GLASS 11.2.0", the number this minor would have had before glass started numbering minors in the order they ship:

- The linger timer (`:146-148`, `LINGER_MS` at 6 s) can go, since this minor ships the linger as a token, `--dock-linger`, at 6 s, growing with the visit up to 12 s.
- The dock hold (`:151-157`) through `dockHold.ts` can go, since every overlay opened from a dock holds it by default in this minor.
- The split (the script at `:70-135`, the seat and its neck at `:280-291`, the `.fission` rules at `:468-579`) stays yours until glass's goo, since the corner dock doesn't part from the main one; I've put that as a question below.

## The minor with the new springs and sliders

- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, though nobody has timed it on an iPhone yet.
- Your reader tray rises on glass's `--spring-panel` (`src/scripture/PhraseTray.vue:264-270`), and `correspond.ts:97` reads the same curve. That curve keeps its small overshoot, since glass leaves it for a site's own spatial morph, while glass's own entrances move to `--spring-bloom`, which lands without passing its rest. A tray that rises with the reader is an entrance, so you may want `--spring-bloom` there; it keeps `--spring-panel` unless you change it.
- With Reduce Motion on, glass's fades and colour changes keep a short clock of 150 ms or less instead of cutting, and nothing travels.
- By my estimate this minor leaves every route about 1.2 KB lighter in stylesheet, most of it from the curves. The small player that carries a release's speed loads on the first touch of a part that uses it, and with the minor's other script changes the reader route's eager script falls by about 0.8 KB. Each is a figure for one part alone, so your `scripts/check-budget.mjs` is what closes them on the release candidate.
- Your two scrubbers (`src/name/NameDock.vue:116` and `src/portraits/PortraitsDock.vue:79`) grow while they're held, in their own gold. The groove you set at `src/gilt/gilt.css:60` is the colour that grows, by up to 8 px a side, and back over the same 200 ms. While they're used the root's box doesn't move, and the grown track takes no taps. With Reduce Motion on, the grown gold fades in where it stands instead of growing, and the value fades in.
- On a touch screen each slider's own box becomes 44 px tall, the finger-size target. Both scrubbers sit inside docks, so on a phone that can make the two docks taller (my fifth question).
- Sliders that have a fill go thumbless by default in this minor. Your scrubbers show a knob today because `gilt.css:58` and `:65` give it a colour, and from this minor they'd end in the gold fill's rounded cap instead, unless you ask for the knob.

## 12.0.0

If it ships, glass takes over the seat's pull-apart: the theme seat parts from the dock and joins it in goo, drawn by an SVG filter while they part or join and through the folded rest. It ships only on a dock that doesn't blur what's behind it, and only if the neck between the two shows for long enough to be seen and its cost per frame holds; I'll have it timed before it ships. While the filter is on, the fold is painted on the page's thread. It adds about 0.5 KB, loaded only with a dock that has a seat beside it. When you adopt it, `SiteDock.vue` can drop the neck, the mirror script and the `.fission` rules at the lines above, which come to up to 2 KB, and keep whatever of `keepOpen("grasp")` (`:129`) you still need.

## What I need from you

Each default below is fixed at the release candidate named beside it.

1. Your `e2e/veil-webkit.spec.ts` enters and leaves the mode at 390, 430 and 1440 with the page alive, and it reads the occasion's word from your private sources, so I can't run it myself. Would you run it on each release candidate I send, the dock-redesign minor's and the springs-and-sliders minor's, and tell me whether the page stays alive? Until it passes on a candidate, I won't call that release's slider or dock safe in the occasion mode. Your spec's note says the page crashed in production too: was that Safari on a phone, or Playwright's WebKit against the live site, and which Safari or WebKit version was it? It tells me whether glass's own fix needs checking on a phone as well.
2. Does the gold reading as it grows on the gilt look right to you, or should the grown margin be quieter than the groove? The groove's own gold grows unless you'd like it quieter (the springs-and-sliders minor's candidate).
3. Would you like the scrubbers to keep their knob? They go thumbless unless you say so (the same candidate).
4. Your seat becomes a pill with its "i" beside the khatam on a page that has one (`SiteDock.vue:286`). Should the pill come out of the disc at the disc's width and widen as it leaves, or would you rather the "i" fade in after the seat lands? It leaves at the disc's width and widens unless you'd prefer the fade (12.0.0's candidate).
5. Do the name and portraits docks have room for a 44 px scrubber on a phone, or would a taller dock crowd the page? They take the 44 px unless you tell me they can't (the springs-and-sliders minor's candidate).
6. Since I asked for the goo, I'd rather you kept your own split until 12.0.0 and moved ThemeControl into glass's seat then. Would that suit you, or would you rather move ThemeControl into the corner dock with the dock redesign and go without the neck until then? Your split stays until 12.0.0 unless you tell me otherwise, and if the goo doesn't ship then, it stays yours until the goo does or until you choose the corner dock (the dock-redesign minor's candidate).
7. Should the framed slices keep flipping first, with the page crossing after them? They do unless you'd like the slices to cross with the page (the dock-redesign minor's candidate). And would you set the live-glyph attribute on the khatam? Until you do, its turn is crossed with its old picture for the 200 ms of each flip.
8. Should ThemeControl take the attribute that keeps its plate to hover and focus, or keep its filled rest in dark mode? It keeps the filled rest until you set it (the same candidate).
9. Would you scope the dock's and the ground's rules (`src/App.vue:95-119`, `src/styles.css:238-249`) to your page transitions' types? Until you do, both cross on your page clocks during a flip (the same candidate).

Thanks,
Mike
