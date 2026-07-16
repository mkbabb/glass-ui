# BI.W-P082 — DarkModeToggle clean rename

**Status:** DONE

`DarkModeToggle` now lives at the sole-concept `/dark-mode-toggle` entry. The vague
`/controls` entry is removed without an alias, and every local import and package projection
uses the new name.

The component is one native `<button>` bound to `useGlobalDark`, with native pressed/name
state and the shared interruptible liquid-press response. The eclipse long-press gesture,
timer, and story are deleted. Theme morphs use the shared snappy register and become instant
under reduced motion.

Verification owner: the component contract, public-surface test, both typechecks, and the
native browser specimen when the in-app browser runtime is available.
