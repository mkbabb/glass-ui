# AX.W58 — Storybook language strip: kill internal meta-language across every demo story (P10/P11)

**Band** B · DEMO/IA · **Severity** major (P10 — "most extant text is duplicative or code that must be removed"; P11 — strip the developer-facing notes on EVERY page: WCAG citations in prose, impl-note code-comments, tranche-letter refs)
· **dependsOn** AX.W00 (the device-free gate fleet shape)
· **Charter** convergence-2 USER-DEFECTS pass-2 P10 (story-text de-superfluity) + P11 (storybook internal meta-language strip)
· **Audit** `docs/tranches/AX/audit/convergence2/A-demo-grid-text.md` (the P10 source inventory — 46 pages of tranche-code prose, the un-guarded `demo/stories/` scan gap, the no-gate finding §(c))

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact. This wave is DEMO-side ONLY
> (`demo/stories/**` + the new gate + its registration). Per the hardened agent
> git clause (K W0): agents NEVER stage/commit/stash — the orchestrator owns the index.

> *Gloss.* The storybook is the consumer's first-look surface. Its prose should answer
> WHAT a component does and WHEN to reach for it — never the library's internal
> development history. The pass-2 audit found 46 story pages leaking tranche/wave/defect
> codes, `proof:*` gate names, "muster J" engagement codes, WCAG spec citations, and
> implementation-note code-comments ("Collapse delay is ref-counted…", "renders via the
> named #collapsed slot", "Use DockIconButton for flush-fit buttons inside") directly in
> the text a demo VISITOR reads. The gestalt: every story SFC carries consumer-facing
> copy, and a new device-free gate keeps it that way.

---

## State (born-RED — the gate fails at HEAD)

The wave is born-RED at HEAD `7e23877` on the new gate's full hit set (proved by running
`scripts/proof-story-language.mjs` against the HEAD source): **103** tranche/wave/defect
codes across 49 SFCs, **9** WCAG citations, **2** `proof:*` gate names, **4** "muster J"
codes, **1** bare `tranche` word, plus the named impl-note signatures (`ref-counted`,
`provide-inject`/`provide/inject`, `inheritAttrs`, `binary-consumer`, `overfitting`). The
gate reports a single combined hit count (130+) — every hit a falsifiable witness that the
sweep drives GREEN.

The canonical P11 witnesses the user named, all live at HEAD:

- `navigation/dock.vue:364` — `<li>Collapse delay is ref-counted — any popover or nested
  keep-open source pins it.</li>` (+ the `#collapsed slot` and "DockIconButton for flush-fit"
  list items).
- `navigation/dock.vue:338` — `<h2>Background pause/play toggle (WCAG 2.2.2)</h2>`.
- `primitives/buttons.vue:46` — "The **K.W6** HEADLINE variant…"; `:82` — "both clear WCAG-AA".
- `compositions/dock-with-slider.vue:125` — "This is the **AW.W3** proof story — `proof:dock-layering-polish`…".
- `compositions/form-validation.vue:116,120` — "the binary-consumer bar (**muster J**…", "see **AQ.W1.2 §W4.7**".

**Status** — DEV-COMPLETE (this session implemented it). The wave is demo-side + the gate;
the gate's SOURCE arm is GREEN; there is no π live arm (a prose-strip has no painted truth
to live-verify — see §liveArmNotes).

---

## Goal

Every `demo/stories/**` SFC carries ONLY consumer-facing copy: what a component does, when
to reach for it, how to wire it. Zero internal meta-language survives — in prose OR in
code-comments (the `<!-- … -->` / `// …` comments ship in the SFC the demo loads). A new
device-free gate `proof:story-language` is born-RED at HEAD and locks the strike closed.

This is editorial-plus-one-gate. It mints no primitive and changes no component API. It is
distinct from W18 (the IA category tree) and W40 (the demo shell): this wave re-authors the
per-story BODY prose + comments, which W18's narrow blob-fold/dock-category content scope
does not cover (A-demo-grid-text.md §DEDUP).

## Scope

1. **Sweep EVERY `demo/stories/**` SFC** for internal meta-language and strip/rewrite:
   - **tranche/wave/defect codes** (`\b[A-Z]{1,2}\.W\d`, incl. §-suffixed `AQ.W1.2 §W4.7`)
     — removed from prose, blurbs, labels, headings, `<!-- comments -->`, `// comments`,
     and CSS `/* comments */`;
   - **`proof:*` gate names** + the bare word **`tranche`** + the **"muster <Letter>"**
     engagement code — removed;
   - **WCAG citations in prose** (`WCAG 2.2.2`, `WCAG-AA`, `WCAG 1.4.11`, `WCAG 2.5.5`) —
     the affordance is described in plain language; the spec clause is dropped (e.g.
     "the Level-A pause control" → "lets the user pause a running background");
   - the **named impl-note signatures** (`ref-counted`, `provide-inject`/`provide/inject`,
     `inheritAttrs`, `binary-consumer`, `overfitting`, `#collapsed slot`) — rewritten to
     what the consumer needs (e.g. the dock Notes list rewrites "Collapse delay is
     ref-counted — any popover or nested keep-open source pins it" → "The dock stays open
     while a popover or held control inside it is active").
2. **Rewrite to terse user-facing copy** — what it DOES + when to use it, NO superfluity, or
   delete the line if it adds nothing. Live FORWARD references to real public names (a token
   `--spring-dock`, a component `<DockIconButton>`, a subpath `@mkbabb/glass-ui/dock`, a prop
   `v-model:paused`) are NOT meta-language and are preserved.
3. **Author `proof:story-language`** (`scripts/proof-story-language.mjs`) — device-free
   (pure FS): none of the meta-language patterns survive in `demo/stories/**`. Register in
   `package.json` (`proof:story-language`) + `gates.mjs` (GATES row, `local`).
4. **NO new primitive, NO component edit, NO IA-tree change** — this wave is body-prose +
   the gate. The `StorySection`/`ShowcaseFrame` chassis already host the section frames;
   pages that hand-roll the raw section triplet are the separate W18 migration scope.

## FileBounds

- `demo/stories/**/*.vue` (the 49 SFCs carrying meta-language; the other ~99 stay untouched)
- `scripts/proof-story-language.mjs` (NEW)
- `package.json` (one `scripts` line)
- `scripts/gates.mjs` (one GATES row)
- `docs/tranches/AX/waves/AX.W58-storybook-language-strip.md` (this file)
- `docs/tranches/AX/audit/W58-storybook-language-strip.json` (the close artefact)

Out of bounds: any `src/` file (no API/token change); `demo/manifest.ts` (already clean — 0
hits per the audit); the demo shell/layout; deletion of any P1–P5 prune page (those are
W19's clean break — this wave only strips their language).

## HardGate — `proof:story-language` (device-free)

- **id** `proof:story-language` · **registration** `package.json` + `gates.mjs` (`local`)
- **bornRed** YES — at HEAD the detector reports 130+ hits across 49 SFCs.
- **bite** re-inject one `AX.W17` ref, one `WCAG 2.2.2` citation, or one `proof:foo` name
  into any `demo/stories` SFC → RED (verified: injecting `// AX.W99 bite test` into
  `motion.vue` reddened the gate; restoring greened it).
- **green** after the sweep: 148 SFCs scanned, 0 hits, exit 0.
- **patterns** tranche-code `\b[A-Z]{1,2}\.W\d`, `tranche` word, `proof:[a-z…]`,
  `muster <Letter>`, `WCAG[\s-]?[\d.]`, and the impl-note alternation. Live public names
  (tokens/components/subpaths/props) match none of these — they stay green.

## liveArmNotes

There is NO π live-truth arm for this wave. A prose/comment strip changes no painted pixel —
the truth is the source text, which the device-free gate fully captures. The orchestrator's
live pass can spot-confirm a handful of re-authored story bodies render legibly (the dock
Notes list, the goo-blob pause-seam blurb, the surface-tints tier-alias blurb), but there is
no readPixels/getComputedStyle assertion to drive — the gate is the binding close.

## PreceptAlignment

- **greenfield-no-meta** — the headline precept this wave enforces: no "ported from", no
  version history, no tranche/wave language in any artifact a visitor reads. The gate makes
  it falsifiable for `demo/stories/**`.
- **writing-style** — no editorializing, no over-punctuation; the rewrites drop the SHOUTY
  caps ("DEFAULT", "MUST", "NOT") and the em-dash chains where they were dev-asides.
- **clean break** — no alias for the stripped language; the codes are gone, not commented-out.
- **overfitting bar** — the gate has ≥2 falsifiers (the born-RED hit set + the bite); it is a
  device-free meta-gate sibling to `proof:no-legacy-commentary` (which guards the two
  production barrels; this guards the demo bodies — a complementary, non-overlapping scope).
