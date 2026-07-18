// external-census.mjs — the consumer_census.external_sibling_consumers JOIN
// (PROCESS.md §3c.5 + §3a.10). Values = count of DISTINCT external sibling REPOS
// transcribed verbatim from ../round-2/adversarial-verification-of-round-1-...md
// (its prose BREAK TABLE + the affirmed keep-list). Folded/removed subpaths are
// attributed to their 7.0.0 successor family.
//
// Rule (the header-ribbon lesson): a family ABSENT from the doc's probe rows is
// `null` (unknown) — NEVER 0. Only `liquid-grid` carries 0, because the doc has an
// explicit "grep = 0 across all repos" probe row for it.
export const EXTERNAL_CENSUS = {
    // absorbs metric-badge (fourier,speedtest,muster,sci-report) + metric-cell/stack
    metric: 4,
    popover: 4, // absorbs /hover-card: speedtest, words, slides, fourier
    "dark-mode-toggle": 8, // absorbs /controls: EIGHT repos (keyframes.js pre-migrated)
    dialog: 4, // absorbs /sheet + /confirm-dialog: speedtest, muster, words, value.js
    chip: 4, // absorbs /toggle-chip: speedtest, muster, bbnf, value.js
    "completion-seal": 2, // sci-report, atlas
    "header-ribbon": 1, // keyframes.js (undeclared consumer)
    "instrument-chassis": 2, // speedtest, muster
    handmark: 1, // atlas
    "watercolor-dot": 1, // value.js-demo
    timeline: 1, // speedtest (PhaseTimeline)
    "scroll-progress-rim": 1, // atlas (DockCrest)
    "fading-scroll": 4, // atlas, speedtest, value.js, keyframes.js
    deck: 1, // atlas (useStageDeck + useDeckDetent — same repo)
    "liquid-grid": 0, // EXPLICIT zero-across-all-repos probe (the one justified 0)
};
