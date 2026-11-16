# Input to the dock loop: fourier's floating stage dock, built only from glass dock pieces (value.js, 2026-11-16)

Fourier's web `StageDock.vue` (merged to its master; read-only reference) is now a floating stage dock made only of glass pieces: a folded glyph with a dot when a layer is off its default, press to open (not hover), a downward column on phones, and one seat that stays outside the fold. Four things it had to do itself:

1. **A named floating stage-dock composition.** The usage audit already lists this composition (canvas tools); fourier's file is the reference for a preset in 11.2.0. Not a new component: a documented composition of the existing pieces, or a preset prop set.
2. **keep-dock-open on DropdownMenu**, matching Popover. Rule with the overlays-hold-the-dock row (six apps work around it): every overlay opened from a dock seat holds the dock by default, with no per-overlay prop.
3. **Fold on release.** When a menu opened from a dock closes because of a press outside the dock, the dock folds too. Today glass ignores that press because the dock is still held. One rule for the fold setting: the press that dismisses a dock's overlay from outside the dock also counts as the dock's own outside press.
4. **A priority-overflow seat.** At 390 the app dock with page tools ran past its plate and clipped a seat; the site folds the page tools into one menu seat by hand. This is the many-seats rule's missing half (`INPUT-many-seats-2026-11-15.md`, hassio LF-12, Gregg's persistent-end): a full dock folds its lowest-priority seats into one "more" seat on its own.
