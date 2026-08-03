# SegmentedTabs mobile Select producer receipt — C49

Date: 2026-07-22 EDT  
Status: **FORMATION BINDING · EXISTING R-TABS/G5 OWNER · NO NEW ROW**

## Corrected ownership

SCI Home at 390×844 consumes the shipped Glass mobile SegmentedTabs renderer
directly. `GalleryView.vue` imports `@mkbabb/glass-ui/tabs`, uses
`semantics="toggle"`, labels the group `Dashboard subjects`, and selects the
responsive branch below 700px. Its deep rule reaches only the desktop
`.segmented-tab`; it does not skin the mobile trigger.

The live mobile node is one Glass button with `role=combobox`, accessible name
`Dashboard subjects`, `.segmented-tabs__mobile` ancestry, public Glass control
classes, rect `x20 y464.70 w80 h40`, `8px 12px` padding, pill radius, and a 1px
low-alpha edge. Therefore the suspicion that this receiver is a hand-rolled or
non-Glass dropdown is **rejected**.

The owner's visual objection remains valid as an exact producer-design question:
the default mobile Select reads too pill-like, heavy, and hierarchy-disruptive
for this use. Shape, radius, padding, material tier, selected-label width, focus,
and responsive layout behavior bind to the existing R-TABS/G5 mobile renderer
policy. No SCI private selector, local size/radius override, copied control, or
new primitive is authorized.

## Exact receiver identity

- SCI HEAD `0ff0395b`;
- Atlas `6dd96b9`;
- `GalleryView.vue` SHA-256
  `5714cfdea66d832719f2c5f4e8d80f8041be6b4eefd303ee3b1362d385e04e0b`;
- installed Glass `7.0.0` package manifest SHA prefix `93f294e1`;
- installed `dist/tabs.js` SHA prefix `e3c8eca3`; and
- current live formation evidence only; no immutable-package acceptance.

## Born-RED post-cut proof

After an authorized immutable Glass repin, exercise the actual SCI Home branch at
390px with every selected option and the longest label. Prove:

1. surrounding layout and scroll position do not move unexpectedly;
2. the combobox name, selected state, option semantics, focus return, and
   keyboard/VoiceOver order remain correct;
3. the actual coarse action owner is at least 44×44 at centre, corners, and edge
   midpoints without overlapping neighbours;
4. the chosen radius/padding/material hierarchy is congruent with the public
   Glass field/Select law rather than a special Home skin; and
5. light/dark, PRM, Chromium, and actual Safari/VoiceOver retain the contract.

A mutation restoring intrinsic label-following width must RED if it displaces the
surrounding layout. A mutation restoring an unjustified pill/heavy-edge posture
must RED against the adjudicated Select/field radius and material relation.

This receipt changes no product, package, lockfile, consumer, or acceptance
state.
