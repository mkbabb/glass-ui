# BL — prompt-recap seed: the owner's standing edicts

The owner's standing edicts, as the driver carries them into BL on 2026-09-23. Audit seats cannot read the
driver's memory, so the list is written here. Every row is an ASK to trace: addressed at file:line, or an
unaddressed registry row with an owning wave. The tranche prompt corpora live beside this list:
`docs/tranches/BI/ledgers/PROMPT-RECAP.md`, `docs/tranches/BJ/FEEDBACK-LEDGER.md`, `docs/tranches/BC/PROMPT-LEDGER.md`,
`docs/tranches/BJ/PROMPTS/`, `docs/tranches/BH/prompts/`, `docs/tranches/IOS27-MICRO/CHARTER.md`, `docs/tranches/BD/union/PROMPT-RECAP.md`,
`docs/tranches/AY/audit/PROMPT-CORPUS.md`, and `docs/tranches/BL/CHARTER.md` (this tranche's brief).

## Engineering law
- E-1 No backwards compatibility: clean breaks, no legacy aliases, no migration shims, no dual paths.
- E-2 No masking fallbacks: the primary works in paint or fails loud; modern CSS on target engines, no legacy ladders; glass and dock sharpest.
- E-3 Gestalt redesigns over incremental patches; no workarounds; no legacy code.
- E-4 Tailwind-first: references from standalone CSS re-expressed via `@theme` + `@utility`, never pasted raw.
- E-5 Presets live in consumers; the library's own default tokens evolve in `src/styles/`.
- E-6 Consumer dependence never preserves an obsolete API; the consumer updates via a marked addendum in ITS tranche.
- E-7 Overfitting law: every `src/` artefact has at least two sites, or is exported, or is a private demo helper.
- E-8 Gates abrogation: most proof gates were ruled contrived or overfit; collapse to about 40-60 invariant gates (user-mandated). Test rows are not gates.
- E-9 CLAUDE.md is deprecated in glass-ui and is never recreated.
- E-10 Greenfield artefacts carry no past: no "ported from", no version history, no migration language.
- E-11 Binding verification: stale reka-ui prop/emit bindings silently no-op; vue-tsc and unit tests miss them, only e2e catches; sweep on version bumps.
- E-12 Vue scoped `:global(.dark) .x` silently drops from emitted CSS; plain-ancestor `.dark .x` only.
- E-13 `light-dark()` with inset shadow fragments computes the whole box-shadow to none; plain per-mode arms only.

## Design law
- D-1 Liquid-weight universal: ALL motion, transitions and scrolling carry inertia, weight, bounce, liquid-glass quality; pager/deck dots goo-morph between states.
- D-2 Breath-of-life: every component always displays engagement; novel affordances that best iOS 27, derived in aristotelian proportion.
- D-3 The eight laws, cartoon-technicolor, aristotelian proportion, iOS-27 canon (BD greenfield edicts).
- D-4 Chrome AND Safari: bank both cells; Playwright WebKit is not Safari.

## Process law
- P-1 Execution discipline (sworn 2026-07-20): KISS-forward parsimony; code and visual over gates and process; no ad-hoc addenda; every implemented wave twice-challenged by gestalt passes (tranche-fit, wave, feature).
- P-2 Live-verify needs a captured DELTA artefact (screenshot + paired π), never a commit-message claim.
- P-3 Convergence gates cannot converge over duplicated derived data; cite the one source of record; gate on a finite invariant checklist; critics never mint.
- P-4 Tranche format: `docs/tranches/{LETTER}/`, hard gates, FINAL.md.
- P-5 Analyze in full: read the whole corpus before planning.
- P-6 Overfitting audit runs at tranche close (`docs/audits/overfitting-audit.md`).
- P-7 Never park or move sibling repos; the foreign-tree fence is literal.
- P-8 Browser seats are singletons: never run two browser-owning seats at once against the same MCP.

## New in BL (2026-09-23)
- N-1 THE COLOCATION GRAND EDICT, for ALL file directories: components are COLOCATED with their sub-components, composables, skeletons, constants, styles, recursively for nested components. Only truly module-level or global composables (and dirs of that nature) live in a `composables/` dir; everything else colocates, styles included. Long-running dirs are always broken into common modules and encapsulated. The same treatment applies to backend files, adapted to their languages.
- N-2 Delineate every chronically deferred and deferred item and fold it as a DECIDED row: build, fold, or retire with rationale. Re-booking is forbidden. A chronic that has ridden two or more closes undecided is a disease row, and deciding it is a wave of its own.
- N-3 Recap ALL prompts hitherto; an unaddressed ask becomes a registry row with an owning wave; silent drops are forbidden.
- N-4 NPM_TOKEN rotation waived by the owner ("No rotation necessary").
- N-5 Look over the children: value.js megatranche X, the chicago consumer (chicago.babb.dev, reported via the lot-assay session), and our tranches hitherto.
- N-6 (owner, 2026-09-23, relayed by value.js in O-56): "all glass-ui changes should be done at the root and communicated with the running and developing glass-ui instance."
- N-7 (owner, 2026-09-23, relayed in O-55): every dock "like in the words app hereof (floridify), ala ios 27, shrink and morph on scroll to go into a smaller state--and change on and expand on focus and hover. And the progress bar for the page scroll should be integrated into the bottom of the dock, too, and properly clip and account for rounding".
- N-8 (owner, 2026-09-23, relayed in O-56): the dock transitions "in tools and others is janky, not glass-ui idiomatic and ios27 like--the dock does not smoothly morph like it should"; login and @user pills paint "a strange different color and is squared"; "the blob is awful, not animated, and not glass-ui idiomatic"; "All of the pane/card transitions are janky, double animated, and broken"; the background is black and "the aurora is buggy".
- Inbound sibling asks O-53..O-56 are registered at `docs/tranches/BL/audit/INBOUND.md`.
- N-9 (owner, 2026-09-23, relayed in O-58, on the keyframes.js Spring scene): "this entire UI is god awful, not glass-ui idiomatic, cluttered, and too rounded in some pills ... The smooth and bouncy pills, for example are too rounded and should be more card like--mark this and route all glass-ui changes, too to the glass-ui session and agent thereof, to be fixed at the root."
