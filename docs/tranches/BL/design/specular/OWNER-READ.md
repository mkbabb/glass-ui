# The specular dot: owner read

2026-11-15. One page. The detail is in `STUDY.md` and `SPEC.md` beside this file.

## What you are seeing

In your frame there are four round things: the gold ring, a darker disc inside it, the crescent, and a small grey smudge of light up and to the right of the crescent.

- **The smudge is ours.** It is a soft disc of light that glass draws on every dock seat, glass button and slider thumb, centred on the pointer. It sits up and right of the moon because that is where your pointer was. It was meant to read as light catching the edge. It cannot: it is 12 px across on a seat that has 10 px of room around its icon, so it always lands on the icon or gets cut off by the edge.
- **The darker disc is the seat's hover fill.** Glass draws it as a flat circle with no rim, so its edge shows. Its colour is daraksha's: our own dark fill lightens, yours darkens and warms.
- **The gold ring is daraksha's**, on the dock's edge.

Daraksha's ring and plate do not cause the problem. They make three tidy concentric circles, and our smudge is the one thing off centre, soft and grey among them, so it shows more.

The "strange circular item" on the keyframes pane on 13 November is the same rule. Every glass pane lights a still oval in its middle when the pointer enters, whether or not anyone asked it to.

## Should it exist at all

No. Your own rule already says so: "No specular highlight, radial glow, sheen, cursor light", and of the specular, "Remove, do not tune." Making it smaller was the tuning, and the frame is the result. Apple's pages ask for glass effects "sparingly" and describe a control answering by changing itself, not by a light moving on it. I found nothing from Apple describing a dot that follows the pointer on a small control. I could not read the WWDC videos, so I do not claim to know how their native highlight is drawn.

## What you will be shown

Each on a real dock seat, an icon button and a slider thumb, dark and light, at rest, on hover and on press.

- **V-A. No highlight.** The dot is gone from every control. Hover is the fill growing in and the icon firming, as now. Where a control sits on a glass plate, the plate's thin top rim is the only light, and it does not move.
- **V-B. The rim arrives with the fill.** As V-A, and a dock seat's hover fill also gains that same one-pixel rim along its upper edge, fading in with the fill. An arc on the edge, never a shape on the face.

There is no third. A smaller dot, an arc that chases the pointer round the rim, and a flash on press were each drawn and dropped.

## Recommendation

**V-A**, in a patch release. It is nearly all deletion: about 160 lines of CSS and two tokens out, nothing added, no public name removed. It also fixes the pane, and four smaller faults that came with the dot (it faded on a slower clock than the fill, slid across the icon on entry, stayed lit on a selected seat, and stuck after a tap on a phone).

V-B is small and draws its light from the rim the plate already has, but it is one more thing changing on every hover, and in light mode the rim may be too faint to see.

## Questions

1. **Remove the moving highlight from every control (seats, buttons, tabs, triggers, slider thumbs)?** Default: yes.
2. **Stop panes and cards lighting on hover unless a site asks by name?** Default: yes. This is the 13 November cure.
3. **May a site still switch the moving highlight on for a large pane?** Default: yes until the next major version, where it is deleted outright with its directive and tokens, as your rule reads. Say "keep it" if you want it to survive for large surfaces of 240 px or more.
4. **Do you want the hover rim of V-B?** Default: no.
5. **Is daraksha's darker hover disc what you want there?** Default: leave it; it is the site's choice and reads cleanly once the dot is gone.
