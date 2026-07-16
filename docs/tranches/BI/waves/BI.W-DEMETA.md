# BI.W-DEMETA — meta-language purge (dist strip + blurb rewrite + data narration)

Band B6 (storybook meta-system). Born-RED at HEAD.

## Mandate

- **UF-F4** "There's just far too much meta text on essentially every page like: /navigation/toc-tracking" + "far too much text and meta language on this page" (tabs) (ss-18, ss-20).
- **UF-F5** "We should NEVER ever reference meta processes, tranches, kf, etc on any demo page. Mark and audit for this, too." (ss-18 "kf Draggable substrate", ss-23 "post-W54 design axes").
- **FAM-7** (`AUDIT-REGISTRY`): the meta-leak reaches the PUBLISHED dist — `SPRING_PRESETS` `comment:` fields carry wave names + engine jargon (rendered on /motion/springs AND shipped in dist); `curves.ts:143` same; ~10-15 engineering-voice blurbs (ElementMorph/springTimingFunction/sibling-lib names/unglossed PRM); ~179 tranche-ref source comments.
- **BI-STAB-A-2** [P3]: /data/timeline narrates glass-ui's OWN build history as sample data ("Kickoff · TOKENS AUDIT BEGINS", "Cartoon shadow · DEFAULT CARD SHADOW", "Dock FLIP · LAYER-GROUP") — a meta-leak in SAMPLE DATA, not a blurb.
- **G6** (`story/PASS-1.md` §6): the lexicon extension precision — red planted blurb violations while greening planted legit refs (token names, subpaths, code samples).
- Ledger: **E-3** (subsumes the named sub-waves W-SPRING-DEMETA + W-DEMO-COPY-DEMETA + W-DEMO-COMMENT-SCRUB) + **src:button-press-row** (strike the stale BOOKED cross-ref verb).

## Design

Three source surfaces close together. (1) **The dist published-source strip** —
`springPresets.ts:34,77-107` `comment:` fields are re-authored as user-facing register
descriptions; `curves.ts:92` (`note: preset.comment`) and `springs.vue:191`
(`{{ presetRow.comment }}`) propagate the source text. (2) **The rendered blurb rewrite** —
engineering-voice blurbs describe the component rather than its implementation process.
(3) **The data narration** — /data/timeline sample events use a generic,
non-self-referential domain.

Close with a one-time bounded source review and before/after differential over rendered
story prose, manifest string fields, demo data arrays, and the published descriptive source.
This is review evidence for the change, not a standing script, package command, CI check, or gate.
Technical tokens, package subpaths, and component names in code examples remain legitimate.

## Work

- `src/composables/motion/spring/springPresets.ts:77-107` — re-author the 6 `comment:` fields to user-facing register text, ZERO wave-names/jargon (the dist-published strip; MEMORY greenfield-no-meta).
- `demo/stories/data/timeline.vue` — re-author the RELEASE TIMELINE sample events to a generic domain (BI-STAB-A-2).
- Rewrite the ~10-15 engineering-voice blurbs (toc-tracking, tabs "kf Draggable substrate", gear-sheet "post-W54 design axes", the ElementMorph/springTimingFunction/PRM prose) in `demo/stories/**`.
- Perform one bounded review/differential over manifest strings, demo data, and the
  published descriptive source; add no script or standing enforcement.
- Strike the stale BOOKED verb at `Button.vue:97` (the `press` SPRING_PRESETS row SHIPS — springPresets.ts:23; the marker is a dead cross-ref, per CHRONIC `src:button-press-row`).

## Acceptance

Acceptance uses ordinary source review, focused tests, typecheck, and the demo/library builds.
No `proof:story-language` script or equivalent standing gate is created or extended.

Clauses:
- L1 (rendered-text arm) no meta lexicon (tranche codes, `kf`/`gate`/`design-axis` codenames, sibling-repo names, ElementMorph/springTimingFunction, unglossed PRM) in rendered story prose OR manifest string fields (heading/blurb/label/code.src) OR demo DATA arrays.
- L2 (published-source arm) `springPresets.ts` `comment:` + `curves.ts` `note` carry ZERO wave-names/engine-jargon (the dist strip — the leak into the published package killed).
- L3 the /data/timeline sample data is a generic non-self-referential domain (no "tokens audit"/"cartoon shadow"/"dock FLIP"/"layer-group").
- The one-time differential distinguishes prose leaks from legitimate `--spring-dock`
  tokens, `@mkbabb/glass-ui/dock` subpaths, and component names in code fields.

## π/DELTA

- **Rendered /motion/springs** — the register table no longer shows wave-names (the "BD.W-ANIM-IOS27-TUNE" tail gone); the rows read as user-facing register descriptions, both modes (a rendered innerText readback — the device-free source arm is L2, the paint arm confirms the strip reached the rendered surface).

## Obligations

- None cross-repo (the dist strip is glass-ui-local; the published `comment:` change is a no-consumer-break — the field is descriptive metadata).

## Dispositions

- Terminalizes **UF-F4** / **UF-F5** / **FAM-7** / **BI-STAB-A-2** / **E-3**
  (subsuming W-SPRING-DEMETA + W-DEMO-COPY-DEMETA + W-DEMO-COMMENT-SCRUB).
  **src:button-press-row** is discharged. The readout-strip removal remains
  W-AFFORDANCE's UI work; this wave owns only prose/source cleanup.
