# Orchestrator note for the fold seat: the owner's new shape (O-200, owner 2026-11-09 17:15 via value-js-63)

The owner's frame is `~/.dev-logs/owner-1109/shots2/2.png`. It shows daraksha's two docks side by side: pages (Name, Colour, Motion, Qur'an), and the reader's controls with the theme moon. His words:

- "why is darkmode not split out in fission to the side, and why are these docks not rounded, and why are they not animated and have collapse states"
- "We should likely have ONE dock, not two, with layers of controls."

Daraksha is moving to ONE GlassDock. The page switcher and each page's own controls become DockLayer faces in a DockLayerGroup, with icon seats and a collapse state everywhere. **The member that fissions to the side is the dark-mode toggle.**

This changes W-I.8's consumer half, and it conflicts with **R-8 (members do not collapse)**. The canonical cluster is now two members: the one dock, which collapses and expands and swaps layers, and the theme plate. The fold must:

1. **Rule on R-8 against this shape.** Either a member may carry GlassDock's own collapse, so that the cluster composes the dock's collapse morph with its own join spring on the one dock spring, or the spec measures why it can't and gives the owner's shape another way to collapse. The fold may not simply keep R-8 and drop the collapse; the owner asked for both.
2. **Re-state the consumer half** for one dock plus the theme plate. Fuse it at rest or collapsed, and fission the theme out to the side when the reader reaches for the dock. Or rule another trigger, with its reason.
3. **Keep every measured cure:** the shared silhouette, split lenses, whole-pixel members, one tint and O-198.

**Rounding is open.** The owner reads the 11.0.0 dock as "not rounded": `--radius-dock` is `--radius-pill` = 1rem, which is 16 px corners on a 52–56 px dock. A ruling on the dock's resting corner is pending with the owner. R-4 (the corner is the dock's) stands as written, so the cluster follows whatever `--radius-dock` resolves to. Do not hard-code 16 px anywhere.

## Amendments (owner, 2026-11-09 17:19 and his ruling that evening)

**Rounding is ruled: "Rounded. Inform atlas always."** In 11.1.0 the dock rests as a full capsule, with its corner at half the cross extent in px (O-199). R-4 now resolves to that, and the cluster's silhouette is a capsule run, so never write a 16 px literal.

**The layer swap is a first-class case (O-202).** On color.babb.dev, the owner watched value's dock go from "Tools →" into a tool view, and from the tool view back. Frame: `~/.dev-logs/owner-1109/shots3/3-dock-tools.png`. His words: "the dock animations from tools to the tool view is not well defined, glassy, eased, and smooth. glass-ui needs to modify this--it should appear as ONE dock with many layers that are smoothly eased and grow, fission, fuse, and animate." This sits beside daraksha's "ONE dock, not two, with layers of controls."

So W-I.8 has a second canonical case besides the theme fission: **the DockLayerGroup face swap**, where a page layer becomes a tool layer and back. The fold must:
1. Specify the swap as one dock whose silhouette grows or shrinks on the dock spring, and whose content cross-fades inside it. Any part of the incoming layer that sits in its own plate (the tool's own control run, say) fissions out of, or fuses into, the dock on the same join spring. The A/B harness must measure it: the silhouette continuous, no % radius, the backdrop live mid-swap, and O-198 under PRM.
2. Use value's dock on color.babb.dev (the value.js demo, read-only, or a fixture of its Tools → tool-view geometry) as the real-world witness.
3. State the release. The swap's silhouette continuity may already partly exist in DockCrossfade (11.0.0). Say what 11.0.0 does today, measured, and what the cluster adds.

## daraksha's live composition on 11.0.0 (value-js-63, 2026-11-09 evening): the fold's reference shape

`daraksha` branch o1109-dock, `src/shell/SiteDock.vue` (read-only):
- One GlassDock (`fit-content`, `collapse="closed"`, aria-label "Site").
- Inside it, a DockLayerGroup of two faces: "pages", with four page icon seats, and "page", the page's own controls through a `#dock-page` teleport. The switcher shows only on pages that have controls, and arriving on one turns to its controls.
- The khatam (theme toggle) in `#persistent-end`.
- `#collapsed` holding the open page's icon, so the collapsed face is [page icon][khatam].
- No CSS on glass internals and no `filter: url()`.

The fold must say exactly how this becomes the cluster. The expected answer is that the khatam moves out of `#persistent-end` into its own theme member beside the one dock, fused at rest and while collapsed, and fissioned out to the side when the reader reaches for the dock. The one dock keeps its collapse and its layer group (R-8 ruled against this shape). Give the migration as a before-and-after template, so daraksha can adopt it without guessing.
