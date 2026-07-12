# BI.W-DEMETA — the meta-language purge (dist strip + blurb rewrite + data-narration) + the never-again lexicon gate

Band B6 (storybook meta-system). Born-RED at HEAD.

## Mandate

- **UF-F4** "There's just far too much meta text on essentially every page like: /navigation/toc-tracking" + "far too much text and meta language on this page" (tabs) (ss-18, ss-20).
- **UF-F5** "We should NEVER ever reference meta processes, tranches, kf, etc on any demo page. Mark and audit for this, too." (ss-18 "kf Draggable substrate", ss-23 "post-W54 design axes").
- **FAM-7** (`AUDIT-REGISTRY`): the meta-leak reaches the PUBLISHED dist — `SPRING_PRESETS` `comment:` fields carry wave names + engine jargon (rendered on /motion/springs AND shipped in dist); `curves.ts:143` same; ~10-15 engineering-voice blurbs (ElementMorph/springTimingFunction/sibling-lib names/unglossed PRM); ~179 tranche-ref source comments.
- **BI-STAB-A-2** [P3]: /data/timeline narrates glass-ui's OWN build history as sample data ("Kickoff · TOKENS AUDIT BEGINS", "Cartoon shadow · DEFAULT CARD SHADOW", "Dock FLIP · LAYER-GROUP") — a meta-leak in SAMPLE DATA, not a blurb.
- **G6** (`story/PASS-1.md` §6): the lexicon extension precision — red planted blurb violations while greening planted legit refs (token names, subpaths, code samples).
- Ledger: **E-3** (subsumes the named sub-waves W-SPRING-DEMETA + W-DEMO-COPY-DEMETA + W-DEMO-COMMENT-SCRUB) + **src:button-press-row** (strike the stale BOOKED cross-ref verb).

## Design

Three surfaces, one gate. (1) **The dist published-source strip** — `springPresets.ts:34,77-107` `comment:` fields (each carrying "BD.W-ANIM-IOS27-TUNE" + register jargon) are re-authored to user-facing register descriptions with ZERO wave-names/engine-jargon; `curves.ts:92` (`note: preset.comment`) and `springs.vue:191` (`{{ presetRow.comment }}`) propagate it — the strip is at the SOURCE. (2) **The rendered blurb rewrite** — the ~10-15 engineering-voice blurbs (ss-18 "kf Draggable substrate", ss-23 "post-W54 design axes") rewritten to describe the COMPONENT, never the process. (3) **The data-narration** — /data/timeline sample events re-authored to a generic non-self-referential domain (BI-STAB-A-2).

The lexicon GATE (`proof:story-language` extended, `PASS-1` §4.5) is the never-again floor: scanned surfaces = rendered story prose + the manifest STRING fields (heading/blurb/label/code.src) + demo DATA arrays + the dist published source (`springPresets`/`curves`). Pattern set += bare `kf`/`gate`/`design-axis`/tranche-code/sibling-repo-as-codename. Scoped so a `--spring-dock` token, an `@mkbabb/glass-ui/dock` subpath, or a component name inside a CODE field stays GREEN (legit forward-refs); render-closure/SFC script source is OUT of scope (component identifiers are not user-facing copy). Pass-3 hardened the detector (a real manifest leak the shipped gate missed at `manifest.ts:1203` + a lexicon false-positive class eliminated).

## Work

- `src/composables/motion/springPresets.ts:77-107` — re-author the 6 `comment:` fields to user-facing register text, ZERO wave-names/jargon (the dist-published strip; MEMORY greenfield-no-meta).
- `demo/stories/data/timeline.vue` — re-author the RELEASE TIMELINE sample events to a generic domain (BI-STAB-A-2).
- Rewrite the ~10-15 engineering-voice blurbs (toc-tracking, tabs "kf Draggable substrate", gear-sheet "post-W54 design axes", the ElementMorph/springTimingFunction/PRM prose) in `demo/stories/**`.
- `scripts/proof-story-language.mjs` — extend: scan scope += manifest string fields + demo DATA arrays + the dist source (`springPresets`/`curves`); pattern set += tranche-code/kf/gate/design-axis/sibling-repo-as-codename; keep token/subpath/code-field green.
- Strike the stale BOOKED verb at `Button.vue:97` (the `press` SPRING_PRESETS row SHIPS — springPresets.ts:23; the marker is a dead cross-ref, per CHRONIC `src:button-press-row`).

## Acceptance

Gate: **`proof:story-language`** EXTENDED in place — GREEN at close (BORN-RED at HEAD: meta leak live in dist AND rendered on /motion/springs — `springs.vue` innerText contains "BD.W-ANIM-IOS27-TUNE").

Clauses:
- L1 (rendered-text arm) no meta lexicon (tranche codes, `kf`/`gate`/`design-axis` codenames, sibling-repo names, ElementMorph/springTimingFunction, unglossed PRM) in rendered story prose OR manifest string fields (heading/blurb/label/code.src) OR demo DATA arrays.
- L2 (published-source arm) `springPresets.ts` `comment:` + `curves.ts` `note` carry ZERO wave-names/engine-jargon (the dist strip — the leak into the published package killed).
- L3 the /data/timeline sample data is a generic non-self-referential domain (no "tokens audit"/"cartoon shadow"/"dock FLIP"/"layer-group").
- Self-test bites (G6 RED/GREEN split): a planted tranche-code blurb reds L1; a planted "BD.W-…" `comment:` reds L2; a planted self-referential timeline event reds L3; a legit `--spring-dock` token / `@mkbabb/glass-ui/dock` subpath / component name in a code field GREENS (the false-positive class stays clear).

## π/DELTA

- **Rendered /motion/springs** — the register table no longer shows wave-names (the "BD.W-ANIM-IOS27-TUNE" tail gone); the rows read as user-facing register descriptions, both modes (a rendered innerText readback — the device-free source arm is L2, the paint arm confirms the strip reached the rendered surface).

## Obligations

- None cross-repo (the dist strip is glass-ui-local; the published `comment:` change is a no-consumer-break — the field is descriptive metadata).

## Dispositions

- Terminalizes **UF-F4** / **UF-F5** / **FAM-7** / **BI-STAB-A-2** / **E-3** (subsuming W-SPRING-DEMETA + W-DEMO-COPY-DEMETA + W-DEMO-COMMENT-SCRUB — one wave, one gate). **src:button-press-row** discharged (the stale BOOKED verb struck; the `press` row ships). The readout-strip REMOVAL is W-AFFORDANCE's (CBA-2/CBA-3 UI redesign); this wave's lexicon gate scans them for meta-language, it does not own the removal.
