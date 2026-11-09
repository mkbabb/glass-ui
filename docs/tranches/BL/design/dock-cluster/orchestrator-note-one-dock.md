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
