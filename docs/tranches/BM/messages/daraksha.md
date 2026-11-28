# To daraksha

Hi,

Here's what glass's next releases bring to daraksha, held to your budget: the reader route sits at 125.3 of its 126 KB of eager script, and the whole site has about 6 KB free. I read `origin/master` and `b13` before writing, and the lines below are the same on both. The site pins glass at 11.0.2 (`package.json:32`), so each part reaches you when you move that pin to the release that carries it.

Glass now numbers its minors in the order they ship, so I'll name each release by what it carries and send you its number when it's cut.

## The occasion mode's crash

I saw your fix on `b13` (`3eb1f60`): the occasion's dress set the dock's plate-border tokens to a `color-mix()`, glass mixed those again inside its own, and WebKit's page process died resolving the nested mix. Thank you for bisecting it down to that. It's the same fault keyframes and color hit on glass's own nested tokens, and the first fix in 11.1.2 flattens every glass colour token so it mixes one level deep. Your one-colour ring is the right shape on your side, and nothing below mixes a token of yours inside one of glass's. The dock rule you traced, the `:has(:empty)` selector that restyled the whole page on every insertion, becomes two attributes on the dock's root in 11.1.2 as well, and nothing in this note brings it back.

## Three of your recent asks

- **The selected seat's ring.** Your seat's 1.5 px ring is clipped at top and bottom for a few frames while the dock expands. 11.1.2 gives the dock's morph clip room for a ring drawn outside the seat, so it stays whole on every frame, and the fold that comes later keeps that room.
- **The reader tray's corner.** The tray (`src/scripture/PhraseTray.vue:133`) is a small glass Card, and its corner is the card's 16 px. Glass has no corner yet for a card that floats over the page; the first minor after 11.1.2 adds one, designed there (dialogs and sheets use 24 px today).
- **A container for the portraits' dots.** Glass's PagerDots already draws its own pill round the dots, the `ring` prop, on by default; `PortraitsPage.vue:563` turns it off with `:ring="false"`. Dropping that line gives you the container now, with no new release.

## The minor that brings the dock redesign

Every dock seat's hover becomes a flat plate in the seat's own tone, at 6.5 % in light and 5 % in dark, with the current seat at 10 %, and the glyph keeps its colour. The plate carries its tone at one opacity rather than mixing it, so a tone you set stays one level deep.

Glass's own dark-mode toggle now follows your ThemeControl's grammar with fewer parts and a glyph of its own: a sun draws its rays in under its disc while a night slides across to carve the crescent. I took the idea and none of its assets, and your ThemeControl stays yours.

This minor also gives the theme seat a small round dock of its own, which a page places in a corner on the main dock's baseline. Glass doesn't couple the two docks in this minor, so the main dock stays where it is, and nothing parts or joins: glass draws no split on a dock that blurs what's behind it. `src/shell/SiteDock.vue` marks three things "REMOVE AT GLASS 11.2.0", the number this minor would have had before glass started numbering minors in the order they ship:

- the linger timer (`:146-148`, `LINGER_MS` at 6 s): this minor ships the linger as a token, `--dock-linger`, at 6 s, growing with the visit up to 12 s, so the timer can go;
- the dock hold (`:151-157`): every overlay opened from a dock holds it by default in this minor, so the hold through `dockHold.ts` can go;
- the split (the script at `:70-135`, the seat and its neck at `:280-291`, the `.fission` rules at `:468-579`): the corner dock doesn't part from the main one, so the split stays yours until glass's goo, which I've put as a question below.

## The minor with the new springs and sliders

- Every spring becomes a single curve. WebKit's source and release notes say Safari runs curves of that kind off the page's thread, though nobody has timed it on an iPhone yet.
- By my estimate this minor leaves every route about 1.2 KB lighter in stylesheet, most of it from the curves. The small player that carries a release's speed loads on the first touch of a part that uses it, and with the minor's other script changes the reader route's eager script falls by about 0.8 KB. Each is a figure for one part alone, so your `scripts/check-budget.mjs` is what closes them on the release candidate.
- Your two scrubbers (`src/name/NameDock.vue:116` and `src/portraits/PortraitsDock.vue:79`) grow while they're held, in their own gold. The groove you set at `src/gilt/gilt.css:60` is the colour that grows, by up to 8 px a side, and back over the same 200 ms. While they're used the root's box doesn't move, and the grown track takes no taps. With Reduce Motion on, the grown gold fades in where it stands instead of growing, and the value fades in.
- On a touch screen each slider's own box becomes 44 px tall, the finger-size target. Both scrubbers sit inside docks, so on a phone that can make the two docks taller (my fifth question).
- Sliders go thumbless by default in this minor. Your scrubbers show a knob today because `gilt.css:58` and `:65` give it a colour, and from this minor they'd end in the gold fill's rounded cap instead, unless you ask for the knob.

## 12.0.0

If it ships, glass takes over the seat's pull-apart: the theme seat parts from the dock and joins it in goo, drawn by an SVG filter while they part or join and through the folded rest. It ships only on the dock that samples no backdrop, and only if the neck between the two shows for long enough to be seen and its cost per frame holds; I'll have it timed before it ships. While the filter is on, the fold is painted on the page's thread. It adds about 0.5 KB, loaded only with a dock that has a seat beside it. When you adopt it, `SiteDock.vue` can drop the neck, the mirror script and the `.fission` rules at the lines above, which come to up to 2 KB, and keep whatever of `keepOpen("grasp")` (`:129`) you still need.

## What I need from you

Each default below is fixed at the release candidate named beside it.

1. Your `e2e/veil-webkit.spec.ts` enters and leaves the mode at 390, 430 and 1440 with the page alive, and it reads the occasion's word from your private sources, so I can't run it myself. Would you run it on each release candidate I send, the dock-redesign minor's and the springs-and-sliders minor's, and tell me whether the page stays alive? Until it passes on a candidate, I won't call that release's slider or dock safe in the occasion mode. Your spec's note says the page crashed in production too: was that Safari on a phone, or Playwright's WebKit against the live site, and which Safari or WebKit version was it? It tells me whether glass's own fix needs checking on a phone as well.
2. Does the gold reading as it grows on the gilt look right to you, or should the grown margin be quieter than the groove? The groove's own gold grows unless you'd like it quieter (the springs-and-sliders minor's candidate).
3. Would you like the scrubbers to keep their knob? They go thumbless unless you say so (the same candidate).
4. Your seat becomes a pill with its "i" beside the khatam on a page that has one (`SiteDock.vue:286`). Should the pill come out of the disc at the disc's width and widen as it leaves, or would you rather the "i" fade in after the seat lands? It leaves at the disc's width and widens unless you'd prefer the fade (12.0.0's candidate).
5. Do the name and portraits docks have room for a 44 px scrubber on a phone, or would a taller dock crowd the page? They take the 44 px unless you tell me they can't (the springs-and-sliders minor's candidate).
6. Since I asked for the goo, I'd rather you kept your own split until 12.0.0 and moved ThemeControl into glass's seat then. Would that suit you, or would you rather move ThemeControl into the corner dock with the dock redesign and go without the neck until then? Your split stays until 12.0.0 unless you tell me otherwise, and if the goo doesn't ship then, it stays yours until the goo does or until you choose the corner dock (the dock-redesign minor's candidate).

Thanks,
Mike
