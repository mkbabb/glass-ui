# Input to the dock loop: how the apps use the dock (O-369 point 11, 2026-11-15)

Owner, direct: "Dock seems like a mess with all of this complexity. Full audit from all of our app implementations, too." The audit is `docs/tranches/BL/audit/dock-usage/` (USAGE.md, SURFACE.md, COMPOSITIONS.md): 21 dock components and 37 docks on screen across eleven apps.

What it binds the design to:
- 49 of 92 named public items are used by no app (about 203 of 305 with custom properties and classes). The redesign adds no public name without a named app composition that needs it, and lists every unused one for deletion at 12.0.0 (deprecated in 11.2.0).
- Two defaults are wrong for most docks: `collapse` is set to `false` on 11 docks and `fitContent` to `true` on 15 of 21. Rule the defaults again from the compositions, not from the navigation dock alone.
- The commonest workaround, in five apps: a menu or list opened from a dock does not hold the dock open (already ruled and built on the prototype). The next: sites decide folding outside the dock (from the room available, from scroll). The redesign's `collapse` should say what folds it (never, idle, press, room, scroll), as COMPOSITIONS.md proposes.
- Seven apps reach into the dock's internals with deep selectors, six reset its ink and selection colours, seven rewrite its size. Each is a missing knob or a wrong default: the fold names which.
- Eight compositions exist. The demo's dock section becomes one live dock per composition, and a preset per composition is the way most sites should mount a dock.

## Corrected counts (the audit re-read five apps at their current lines, 2026-11-15)

29 dock components across the apps (not 21); 47 of 93 named public items unused by every app; `collapse` pinned to `false` on 15 of 29 docks and 20 of 29 never collapse in at least one layout; `fitContent` true on 20 of 29; eleven compositions (added: a page's controls seat in a corner; a figure's dial bar; the dock used as a bare plate). Workarounds ranked by apps: collapse turned off or decided by the app (10); size rewritten by custom properties (9); deep selectors and internal variables (8); overlays do not hold the dock (6 apps, 11 docks); the pill is not a stadium, `--radius-dock` set (6); ink and plate paint reset (6); content that must follow the collapse morph reads the internal `--dock-expand-t` (4). `shape` is passed by no app with anything but the default. Two apps mount a dock only as a glass plate behind a button: that is a plate, not a dock, and the design should say what they should mount instead.
