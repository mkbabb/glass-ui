# AX.W35 — Primitive-prune consumer-migration DAG (keyframes.js HeaderRibbon + GlassPanel + dock-spring)

**Band** N · CROSS-REPO · **Severity** blocker · **dependsOn** AX.W00, AX.W19, AX.W20 *(separate-repo /
tracked; native-first / migrate-before-prune; glass-ui writes NO sibling source — it authors the migration
annexes; the keyframes.js session executes under its own tranche)* · **Charter** AX.md §3 (the `### AX.W35`
block, lines 1705-1743) + the §1 summary row (line 145) + the §1 sequencing note (lines 157-160 — "W35 is a
hard predecessor of the W19/W20 prune PUBLISH") + the §2 band-N membership (lines 195-201) + the §2b band-N
precept row (line 226) + §4 note 8 (the cross-repo native-first DAG class, lines 2032-2036) + §4 note 12
(publish-currency — the kf consumers MEASURED stale 3.4.0–3.6.0; the dock-spring/specular "still broken" is a
publish gap, lines 2057-2067) + §4 note 23 (the keyframes dock-spring is the SHIPPED-CORRECT ORACLE, NOT a
defect to re-fix, lines 2183-2196) + the W19 block (lines 1058-1069 — the falsified "ZERO binary consumers"
premise) + the W20 block (lines 1097-1100 — the GlassPanel/EasingCurveCanvas migration) · **Audit**
`constellation-analysis-corpus.json` slice `idiom:keyframes.js` (`result[2]` = the W19/W20 consumer-migration
gap: EditorShell off HeaderRibbon + EasingCurveCanvas off GlassPanel; `result[3]` = the stale `^3.4.0`
dock-spring pin BLK-5; the H.W2/H.W4 specular-clean leg) + the constellation slice's NEW-WAVE proposal
(`result[~]` — "AX.Wnn — Cross-repo consumer-migration DAG for the W19/W20 primitive excisions") +
`deep-audit-corpus.json` slice `primitive-prune-A` (HeaderRibbon root-cause + excision surface) + slice
`primitive-fix/redesign` (the GlassPanel JS-renderer retire onto `.glass-material`) · **dedup** §4 note 22
(the "primitive-prune consumer-migration DAG → W35" dedup-ledger line — this is the kf cross-repo leg of the
SAME native-first class as W28→W29 speedtest).

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED at HEAD on **two falsifiable cross-repo witnesses** that do NOT hold today, plus a
**third dock-spring consume witness** that the post-publish bump greens. The charter audit baseline is
`eaba94f`; the witnesses were re-measured LIVE (per the §0 cardinal "re-verify before acting" and the AX.W00
wave-open ritual) against the live keyframes.js tree (pin `@mkbabb/glass-ui: ^3.4.0`, package.json:115).

- **RED witness 1 — `proof:off-headerribbon` does NOT exist on keyframes.js, and `EditorShell.vue` STILL
  imports `@mkbabb/glass-ui/header-ribbon`.** The migration half of the W19 prune-DAG has NEVER run in the
  consumer (slice `idiom:keyframes.js` `result[2]`). Live-confirmed: NO `scripts/proof-off-headerribbon.mjs`
  exists under `keyframes.js/scripts/`; `demo/@/components/custom/editor-shell/EditorShell.vue:99`
  (`import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon"`) survives, mounting `<HeaderRibbon
  position="right">` at :10-44 as the top chrome bar (the `#items` share/shortcuts/dark-mode row + the
  `#anchor` slot exposing pinned/toggled; `headerRibbonRef` at :137); glass-ui 3.4.0-installed still exports
  `/header-ribbon` (verified via the node_modules exports map). *The falsifiable RED: author the keyframes-side
  born-RED `proof:off-headerribbon` gate (zero `@mkbabb/glass-ui/header-ribbon` import survives in
  keyframes.js `demo/`) — it FAILS the instant it is authored (the EditorShell import survives). It GREENs only
  after the keyframes session migrates EditorShell onto a local chrome bar. glass-ui writes NO sibling source —
  it AUTHORS the migration annex specifying the gate; the keyframes session executes it.*

- **RED witness 2 — `proof:off-glasspanel` does NOT exist on keyframes.js, and `EasingCurveCanvas.vue` STILL
  imports `@mkbabb/glass-ui/glass-panel`.** The migration half of the W20 GlassPanel-retire DAG has NEVER run
  (slice `idiom:keyframes.js` `result[2]`; W20 block line 1097-1100). Live-confirmed: NO
  `scripts/proof-off-glasspanel.mjs` exists; `demo/@/components/custom/EasingCurveCanvas.vue:107`
  (`import { GlassPanel } from "@mkbabb/glass-ui/glass-panel"`) survives, mounting `<GlassPanel
  variant="wash">` at :2-102 as the curve-editor surface — exactly the W20 "point any surviving surface at
  `<Card>`/`.glass-material`" case (a pure glass-tier wrapper). *The falsifiable RED: author the keyframes-side
  born-RED `proof:off-glasspanel` gate (zero `@mkbabb/glass-ui/glass-panel` import survives) — it FAILS at
  authoring (the EasingCurveCanvas import survives). It GREENs only after the keyframes session migrates
  EasingCurveCanvas onto `<Card surface="glass">` / a `.glass-material` div.*

- **RED witness 3 (dock-spring consume) — keyframes.js's `proof:dock-morph-settled` token-peak gate is RED at
  its `^3.4.0` pin (sampled ramp peak +16.3% — the pre-AW.W2 bouncy `(0.5,0.5)` register).** The two live
  keyframes docks (`AnimationMenuBar.vue:17` `<GlassDock :always-expanded :fit-content>` and
  `dock/ChromeDock.vue` GlassDock+DockSelectTrigger) run the STALE published spring (slice
  `idiom:keyframes.js` `result[3]`; the kf H tranche BLK-5). This is the §4 note 12 publish-currency symptom —
  NOT a glass-ui-HEAD defect (§4 note 23: the keyframes single-clock dock high-water `e82633e`/`e8380d7` + the
  published `(0.32,0.7)` `--spring-dock` curve are the SHIPPED-CORRECT ORACLE the W01 morph composes with).
  *The falsifiable RED: `proof:dock-morph-settled` reads +16.3% at the `^3.4.0` pin; it GREENs only on the
  pin bump to the AX-published cut (which ships the `(0.32,0.7)` register, peak ~+4.6%). This witness greens
  AFTER the AX publish hinge — it is the consume leg, not the migrate leg.*

The HardGate drives all three witnesses RED→GREEN on the KEYFRAMES side. This wave's glass-ui-owned product is
the AUTHORED MIGRATION ANNEXES + the `coordination/CONSTELLATION.md` band-N section — NOT a `src/` edit (the
glass-ui prune surface is struck by W19/W20, which dependsOn this wave's two migrate gates greening BEFORE the
prune PUBLISHES). The DAG is `migrate (W35: off-headerribbon + off-glasspanel green) → prune-publish (W19/W20
ship to npm) → consume-bump (W35: pin → AX cut, dock-morph-settled green)`.

---

## Goal

keyframes.js EditorShell renders on a local chrome bar (off HeaderRibbon), EasingCurveCanvas renders on
`<Card surface="glass">` / a `.glass-material` div (off GlassPanel), each guarded by a keyframes-side born-RED
`proof:off-headerribbon` / `proof:off-glasspanel` gate flipped GREEN BEFORE the glass-ui W19/W20 prune
publishes — so the prune never breaks the optional consumer's build; and AFTER the AX publish, keyframes.js
bumps its `^3.4.0` pin to the AX cut and re-verifies both live docks read as one continuous iOS spring (the
`proof:dock-morph-settled` token-peak gate greens at the `(0.32,0.7)` register).

---

## Scope (the gestalt fix — no workaround, no legacy, inv-16' native-first / migrate-before-prune)

The root cause is the SAME architectural sequencing class as W28→W29 (speedtest), applied to keyframes.js: the
W19/W20 "ZERO binary consumers" premise was glass-ui-INTERNAL only and is FALSIFIED cross-repo — keyframes.js
is a LIVE, load-bearing consumer of BOTH primitives AX excises (slice `idiom:keyframes.js` `result[2]`; W19
block line 1058-1065). The wire-before-retire / substrate-with-consumer precept forbids glass-ui from PUBLISHING
the prune while a live consumer imports the surface. The gestalt fix is to DRIVE the cross-repo migration DAG to
completion as ordered migrate-before-prune legs — NOT a glass-ui-side rip that dangles the consumer.
**glass-ui writes NO sibling source** (inv-16: it authors the migration annexes; the keyframes session executes
under its own tranche). W35's glass-ui-owned deliverables are the ANNEX specs + the `coordination/CONSTELLATION.md`
band-N section + the routing. The migration IMPL is keyframes-executed.

**(1) Author the HeaderRibbon migration annex (slice `idiom:keyframes.js` `result[2]`; W19 block line 1062;
deep-audit `primitive-prune-A` HeaderRibbon root-cause).** HeaderRibbon is a self-contained hover-collapse
ribbon (a fixed-corner anchor + an auto-collapsing item row) duplicable in ~40 lines of consumer code — its
glass-ui excision is correct (substrate-without-consumer, glass-ui-INTERNAL). The annex specifies EditorShell
migrates `<HeaderRibbon position="right">` (the `#items` share/shortcuts/dark-mode row + the `#anchor`
pinned/toggled slot + `headerRibbonRef`) onto a LOCAL chrome bar in the keyframes repo (a plain header `<div>`
hosting the same controls; NOT a glass-ui re-add — there is no surviving glass-ui "header idiom" to fold onto,
so the consumer owns its chrome). The migration is a CLEAN BREAK (no legacy alias, no compat shim) — the
EditorShell `:99` import is DELETED, the `<HeaderRibbon>` usage at :10-44 is replaced with the local bar, and
the keyframes-side `proof:off-headerribbon` gate asserts zero `@mkbabb/glass-ui/header-ribbon` import survives.

**(2) Author the GlassPanel migration annex (slice `idiom:keyframes.js` `result[2]`; W20 block line 1097-1100;
deep-audit `primitive-fix/redesign` GlassPanel retire-onto-`.glass-material`).** GlassPanel + the JS
`createGlassFilter`/`useGlassRenderer` SVG-displacement renderer is retired glass-ui-side by W20 onto the
CSS-native `.glass-material` grammar (the broken async-feImage path that hard-overwrites inline styles with
non-dark-adaptive white). The annex specifies EasingCurveCanvas migrates `<GlassPanel variant="wash">` (:2-102,
:107) onto `<Card surface="glass">` / a `.glass-material` div — W20's OWN documented retire-target (a pure
glass-tier wrapper is exactly the `.glass-material` case). The `variant="wash"` rung maps to the `.glass-wash`
tier on the `<Card surface="glass">` ladder (or the `.glass-material .glass-wash` div). The migration is a
CLEAN BREAK — the EasingCurveCanvas `:107` import is DELETED and the keyframes-side `proof:off-glasspanel` gate
asserts zero `@mkbabb/glass-ui/glass-panel` import survives. **The visual close (VISUAL-TRUTH) confirms the
curve-editor surface reads the SAME glass-wash backplate on the migrated surface** — the `.glass-material`
grammar is dark-adaptive where the GlassPanel JS renderer was not, so the migrated surface is a strict
improvement, not a regression.

**(3) Author the dock-spring consume-leg annex (NOT a re-fix — §4 note 23; slice `idiom:keyframes.js`
`result[3]`).** This is the PUBLISH-CURRENCY consume leg, sequenced AFTER the AX publish (it depends on the AX
cut existing on npm). The annex specifies: after the dock band (W01-W06) lands and glass-ui publishes,
keyframes.js bumps its `^3.4.0` pin (which ships the pre-AW.W2 bouncy `(0.5,0.5)` register, peak +16.3%) to the
AX release, and re-verifies both live docks (`ChromeDock`, `AnimationMenuBar`) + EditorShell's
`data-glass-dock-portal` teleport contract. The `(0.32,0.7)` `--spring-dock` curve the AX cut ships is the
SHIPPED-CORRECT ORACLE (§4 note 23 — keyframes' OWN single-clock dock high-water `e82633e`/`e8380d7` IS the
reference the W01 single-scalar morph composes with, NOT a defect; the keyframes LIGHT-barrel `flip()` trigger
is the proven host-hold shape `useDockHold` (W03) preserves). Pair the consume leg with keyframes' EXISTING
`proof:dock-morph-settled` token-peak gate (born-RED at +16.3%, greens on the bump). The H.W2/H.W4 keyframes
consumption fixes (every `<Card>` defaults `surface="glass"` → the harsh radial specular) are
SATISFIED-FOR-FREE by the W09 softened default after the pin bump — the annex confirms no kf-side specular
override remains post-bump (the leg routes through W34's per-consumer ledger; §4 note 12 — this was a
publish-currency gap, not a code gap).

**(4) Declare ALL cross-repo state in `coordination/CONSTELLATION.md` (the band-N section).** The
sibling-baseline capture (keyframes.js HEAD + `git status --porcelain` + `branch --show-current` + `stash list`
at coordination time), the writer-vs-reader boundaries (glass-ui = annex-author/reader; keyframes = own-`demo/`
writer), the shared surfaces (none — disjoint by repo), and the `migrate → prune-publish → consume-bump` DAG
with the per-leg gate. **The PUBLISH-gating ordering is the load-bearing invariant:** the two migrate gates
(`off-headerribbon` + `off-glasspanel`) MUST be GREEN BEFORE W19/W20 publish the prune to npm (charter lines
145, 157, 1720; W19 dependsOn this wave's keyframes-side green). W19/W20 MAY LAND in-repo (their audit json
born-RED→GREEN) independently, but the PUBLISH is gated on this wave. The consume-bump leg (witness 3) is the
INVERSE ordering — it depends on the AX cut being published (the W41 publish hinge), so it greens AFTER the
publish. The annex names both orderings explicitly so neither leg silently inverts.

**(5) Pin keyframes.js to the pre-excision glass-ui until the migration lands (the no-dangle guard).** The
annex specifies keyframes holds its `^3.4.0` pin (which still exports both prune targets) until BOTH migrate
gates green; only THEN does the AX cut publish the prune, and only THEN does keyframes bump to the AX release.
This is the structural antidote to a dangling consumer at the prune publish — the same no-dangle ordering W28
uses for speedtest/muster.

NO glass-ui `src/` edit, NO export-surface strike (that is W19/W20, gated behind this wave's migrate gates), NO
keyframes-side source edit by glass-ui (the keyframes session executes the annex under its own tranche). NO
legacy alias, NO compat shim — when W19/W20 strike, keyframes is already off both primitives, so the prune
never dangles (the migrate-before-prune ordering is the whole point).

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

W35 is glass-ui-owned ANNEX AUTHORSHIP + a coordination-doc section. It writes NO glass-ui `src/` and NO
keyframes.js source.

| File | Edit |
|------|------|
| `docs/tranches/AX/audit/W35-keyframes-prune-migration-dag.json` | **NEW** — the born-RED ledger (the three RED witnesses with their live measurements), the HeaderRibbon migration annex (EditorShell target: a local chrome bar; the `#items`/`#anchor`/pinned/toggled surface census; the `proof:off-headerribbon` gate spec), the GlassPanel migration annex (EasingCurveCanvas target: `<Card surface="glass">` / `.glass-material` div; the `variant="wash"` → `.glass-wash` rung map; the `proof:off-glasspanel` gate spec), the dock-spring consume-leg annex (the `^3.4.0` → AX-cut bump; the `proof:dock-morph-settled` token-peak gate; the `data-glass-dock-portal` teleport re-verify; the H.W2/H.W4 specular-clean confirm), the PUBLISH-gating ordering record, and the W19/W20/W34/W41 routing. |
| `coordination/CONSTELLATION.md` | **EDIT** (band-N section) — the keyframes-baseline capture, the `migrate → prune-publish → consume-bump` DAG, the writer-vs-reader boundaries, the conflict-resolution protocol, the PUBLISH-gating invariant (the two migrate gates green BEFORE W19/W20 publish). **W28 OPENS this doc (band-K + gate-0); W34 authors the §16-receiver body; W35 appends the band-N keyframes-migration section.** Coordinate so the three waves write DISJOINT sections of the one doc. |
| `docs/tranches/AX/waves/AX.W35-keyframes-prune-migration-dag.md` | This spec (the wave doc). |

**keyframes-executed (NOT glass-ui-written — the annex SPECIFIES, the keyframes session WRITES under its own
tranche):** `keyframes.js/demo/@/components/custom/editor-shell/EditorShell.vue` (the HeaderRibbon → local
chrome bar migration), `keyframes.js/demo/@/components/custom/EasingCurveCanvas.vue` (the GlassPanel →
`<Card surface="glass">`/`.glass-material` migration), `keyframes.js/scripts/proof-off-headerribbon.mjs`,
`keyframes.js/scripts/proof-off-glasspanel.mjs`, the keyframes `package.json` pin bump (`^3.4.0` → the AX cut,
consume leg), and the keyframes-side `proof:dock-morph-settled` re-verify run.

**OUT of bounds (W19 — the glass-ui-side HeaderRibbon + glyph-face + disco-glyph prune):** the strike of
`src/components/custom/header-ribbon/` + `src/subpaths/header-ribbon.ts` + `package.json` exports + typesVersions
+ `src/api/index.ts` `HeaderRibbon*` block + demo story + manifest row + IA slug. **OUT of bounds (W20 — the
glass-ui-side GlassPanel retire):** the strike of `src/components/custom/glass-panel/` + the JS
`createGlassFilter`/`useGlassRenderer` SVG-displacement renderer + the `GlassPanelVariant`/`GlassPanelProps`
`/api` types. **OUT of bounds (W41 — the publish hinge):** the AX-cut npm publish the consume-bump resolves
through. **OUT of bounds (W34):** the broader keyframes per-consumer idiom census (the ResponsiveSelect orphan,
the menubar `menuItemVariants` adoption, the EditorShell `.grid-background` → `/constellation` backdrop leverage)
— W35 owns ONLY the prune-migration DAG (the two prune-target migrations + the dock-spring consume bump).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W19 (primitive prune A — HeaderRibbon excision) — the PUBLISH-gated parent.** W19 is the IN-REPO
  HeaderRibbon prune; W35 is the keyframes CONSUMER migration (charter W19 block line 1064-1065; W19 spec lines
  216-222). **Disjoint by repo:** W19 writes glass-ui `src/`/`package.json`/`api`/demo; W35 writes the keyframes
  migration annex (and the keyframes session writes keyframes `demo/`). They share ZERO file. **The ordering
  guarantee:** W19 may LAND in-repo independent of W35, but W19's PUBLISH is gated on W35's `proof:off-headerribbon`
  GREEN (charter line 145, 157, 1720). W19 carries the keyframes consumer-migration NOTE and routes it here; W35
  owns the migration + the born-RED gate.

- **vs W20 (primitive fix — GlassPanel retire) — the second PUBLISH-gated parent.** W20 is the IN-REPO GlassPanel
  retire onto `.glass-material`; W35 is the keyframes EasingCurveCanvas migration (charter W20 block line 1097-1100;
  W20 gate line 1109-1110). **Disjoint by repo:** W20 writes glass-ui `src/`/`useGlassRenderer`; W35 writes the
  keyframes migration annex. **The ordering guarantee:** W20's PUBLISH is gated on W35's `proof:off-glasspanel`
  GREEN. W35 does NOT touch the glass-ui GlassPanel surface — it migrates the consumer OFF it.

- **vs W28 (speedtest native-first receive) + W34 (§16 receiver) — the coordination-doc co-authors.** W28 OPENS
  `coordination/CONSTELLATION.md` (band-K + gate-0); W34 authors the §16-receiver body (the per-consumer idiom
  census incl. the broader keyframes legs); W35 appends the band-N keyframes-MIGRATION section. **Disjoint by
  section:** W28 = band-K metric-receive DAG; W34 = the §16 idiom census + the consumer R1 bumps; W35 = the
  HeaderRibbon/GlassPanel migration + dock-spring consume DAG. Coordinate so the three waves write DISJOINT
  sections of the one doc (W28 first — it opens the file; W35 appends, does not rewrite W28's or W34's sections).
  **The dock-spring consume bump is W35-OWNED but routes its broader keyframes idiom-adoption census to W34** (the
  ResponsiveSelect/menubar/constellation-backdrop legs are W34's idiom-maximization scope, NOT W35's prune-DAG).

- **vs W41 (publisher-side cross-repo build + supplier-edge).** The keyframes consume-bump (`^3.4.0` → the AX
  cut) resolves through the AX publish hinge W41 hardens (the `build:watch` dts-freshness keystone + the
  cross-repo-dev-resolution contract-v2; the keyframes-4 `file:`-link republish handoff). **Disjoint by stage:**
  W35 lands the MIGRATE legs (off-headerribbon + off-glasspanel) on the CURRENT `^3.4.0` pin (the consumer does
  NOT bump in the migrate legs — the migration is import-rewrite-only, version-independent). The consume-bump is
  the INVERSE-ordering leg the W41 publish gates; W35 routes the bump there. MUST NOT bump the pin in the migrate
  legs (that would make the migration depend on the publish, inverting the no-dangle ordering).

---

## Triumvirate (implement / adversarially-verify / gate-author split)

This is a CROSS-REPO authoring wave — the glass-ui side writes NO source, so the "implement" arm is
ANNEX-AUTHORSHIP, and the actual migration IMPL runs in the keyframes session (out of glass-ui's dispatch). The
actual glass-ui-side count is **2** (1 annex-author + 1 adversarial-verify), under the AX
≤6-implementation / ≤7-read-only ceiling. The keyframes-side migration IMPL is the keyframes session's own
≤6-agent wave.

- **Annex-author + coordination-doc author (≤1 glass-ui agent — the deliverable is the annex, not source).**
  Captures the keyframes baseline (orchestrator-run read-only `git -C keyframes.js status/branch/stash/log`);
  appends the `coordination/CONSTELLATION.md` band-N section; authors the HeaderRibbon migration annex (the
  EditorShell `#items`/`#anchor`/pinned/toggled surface census → local-chrome-bar target; the
  `proof:off-headerribbon` gate spec), the GlassPanel migration annex (the EasingCurveCanvas `variant="wash"` →
  `<Card surface="glass">`/`.glass-material` `.glass-wash` rung map; the `proof:off-glasspanel` gate spec), and
  the dock-spring consume-leg annex (the bump + the `proof:dock-morph-settled` re-verify + the
  `data-glass-dock-portal` teleport + the H.W2/H.W4 specular-clean confirm). Records the W19/W20/W34/W41 routing.
  Touches NO glass-ui `src/` and NO keyframes source — annex + doc only.

- **Adversarially-verify (≤1 glass-ui read-only lane).** Re-runs the three RED witnesses against the live
  keyframes tree: (a) confirms no `proof:off-headerribbon` exists and the `EditorShell.vue:99` import survives
  (witness 1 RED at HEAD); (b) confirms no `proof:off-glasspanel` exists and the `EasingCurveCanvas.vue:107`
  import survives (witness 2 RED); (c) confirms the `^3.4.0` pin ships the +16.3% register so
  `proof:dock-morph-settled` is RED (witness 3). ADVERSARIAL twists: **(i)** confirms the W19/W20 "ZERO binary
  consumers" premise is FALSIFIED cross-repo (the two live import sites are real, not test mocks — distinct from
  the speedtest DEAD GlyphFace `vi.mock`); **(ii)** confirms the migrate legs are version-INDEPENDENT (the
  import-rewrite works on the current `^3.4.0` pin — the migration does NOT require the publish, so the no-dangle
  ordering holds: migrate FIRST on the old pin, THEN publish the prune, THEN bump); **(iii)** confirms there is
  NO surviving glass-ui "header idiom" to fold EditorShell's HeaderRibbon onto (the local chrome bar is the
  correct target — glass-ui ships no Menubar/HeaderBar primitive, so a glass-ui re-add would be net-new
  substrate-without-consumer, which the prune precept forbids); **(iv)** confirms the H.W2/H.W4 specular-clean
  state is SATISFIED-FOR-FREE by W09's softened default post-bump (§4 note 12 publish-currency — no kf-side
  override survives), so the consume leg does NOT re-fix what is already at glass-ui HEAD.

- **Gate-author (the keyframes-side migrate gates — SPECIFIED here, AUTHORED keyframes-side).** The glass-ui
  annex SPECIFIES the two migrate gates' assertions (`proof:off-headerribbon` = zero
  `@mkbabb/glass-ui/header-ribbon` import survives in keyframes `demo/`; `proof:off-glasspanel` = zero
  `@mkbabb/glass-ui/glass-panel` import survives); the KEYFRAMES session authors the actual
  `scripts/proof-off-{headerribbon,glasspanel}.mjs` under its own tranche (glass-ui writes no sibling source).
  Both are born-RED at authoring (the imports survive) → GREEN after the migrations. The dock-spring consume
  gate is keyframes' EXISTING `proof:dock-morph-settled` (born-RED at the +16.3% pin → GREEN on the bump to the
  AX `(0.32,0.7)` cut). The keyframes baseline capture is an orchestrator-run read-only check recorded in the
  coordination doc.

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):** the wave-agnostic authorization grant is AX.md §6.1 (work AROUND a roadblock with an idiomatic gestalt fix rather than stall; the §6.2 decision tree bounds halt-vs-work-around) — by reference, not restated. This wave's §3a auto-triggers (HALT the failing unit + dispatch the research→plan-augment→redress triumvirate, never stall): the FileBounds whose expansion would invalidate the wave — any need to write glass-ui `src/`, keyframes.js source, or the keyframes `package.json` pin in the MIGRATE legs (W35 is the migration ANNEX + the `coordination/CONSTELLATION.md` band-N section ONLY; the in-repo HeaderRibbon/glass-panel prunes are W19/W20, the publish hinge is W41, the broader keyframes idiom census is W34 — pre-empting any of them is a scope-reveal → halt + triumvirate, NEVER absorb in-line); bumping the keyframes pin in the migrate legs (the migration is import-rewrite-only, version-INDEPENDENT — a pin bump in a migrate leg inverts the no-dangle ordering and is a scope-reveal, the bump is the W41-publish-gated INVERSE leg). The hard-gate failures that are not local-edit-recoverable: if the migration reveals NO clean glass-ui target for EditorShell's header idiom (a glass-ui Menubar/HeaderBar re-add would be net-new substrate-without-consumer the prune precept forbids) → escalate to re-adjudicate the local-chrome-bar target, do NOT hand-roll a library primitive; if `proof:off-headerribbon`/`proof:off-glasspanel` cannot be specified as a clean deletion-of-import gate (a surviving transitive import path) → triumvirate the gate design rather than a grep-only string check; a dirty/unexpected-branch keyframes tree at baseline-capture is a §6.3 cross-session-clobber coordinate (record the leg as a born-RED handoff gate, do NOT halt). The diagnostic loop whose third iteration halts: if the `variant="wash"` → `.glass-wash` rung map does not reproduce the EasingCurveCanvas surface after three passes, dispatch research+plan+redress rather than re-deriving the rung a fourth time. A §5.3 ratify reaching un-ratified — any migration disposition or the PUBLISH-gating ordering the charter marks USER-ADJUDICATED — → §6.2 Class-3 HALT-AND-RATIFY (do NOT unilaterally re-order the W19/W20-publish-gated DAG; coordinate the cross-repo annex).

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH cross-repo live audit clause)

**Cross-repo gates — born-RED→GREEN (keyframes-side, glass-ui-specified).** Per
`precepts/instructions/tranche/SPEC.md:96-104` the accepted artefact forms are
build/test/runtime/deletion/explicit-document-reconciliation; these gates are deletion-of-import +
token-peak-parse artefacts — precept-valid, NOT grep-only-for-runtime-behaviour (an import-presence deletion
assertion IS the purely-structural target SPEC.md:108 carves out; the token-peak parse is a runtime-measurement
of the published ramp; and the VISUAL-TRUTH clause below carries the appearance/interaction axis).

1. **`proof:off-headerribbon` (keyframes-side) — born-RED → GREEN (a deletion-of-import artefact).** Asserts
   ZERO `@mkbabb/glass-ui/header-ribbon` import survives in keyframes.js `demo/`. **Born-RED** at HEAD (the
   `EditorShell.vue:99` import survives). GREEN only after the keyframes session migrates EditorShell onto the
   local chrome bar. **PUBLISH-GATING: this gate MUST be GREEN before W19 publishes the HeaderRibbon prune to
   npm** (charter line 145, 157, 1720). Keyframes-authored from the glass-ui annex spec.
2. **`proof:off-glasspanel` (keyframes-side) — born-RED → GREEN (same form).** Asserts ZERO
   `@mkbabb/glass-ui/glass-panel` import survives in keyframes.js `demo/`. **Born-RED** (the
   `EasingCurveCanvas.vue:107` import survives). GREEN after the EasingCurveCanvas → `<Card surface="glass">` /
   `.glass-material` migration. **PUBLISH-GATING: GREEN before W20 publishes the GlassPanel retire.**
   Keyframes-authored from the annex spec.
3. **`proof:dock-morph-settled` (keyframes-side, EXISTING gate) — born-RED → GREEN on the consume bump (a
   runtime token-peak-parse artefact).** Reads the published `--spring-dock` linear() ramp peak: **born-RED at
   +16.3%** (the `^3.4.0` pre-AW.W2 `(0.5,0.5)` register); GREEN at the AX-cut `(0.32,0.7)` register (peak
   ~+4.6%). This is the INVERSE-ordering consume leg — it greens AFTER the AX publish (W41 hinge), NOT before.
   Pairs the bump with the existing keyframes gate so the consume leg has a falsifiable witness.

**VISUAL-TRUTH clause (the NON-NEGOTIABLE AX.W00 close discipline — cross-repo live audit, NOT a headless proof
alone).** This wave HAS a visual surface on the consumer (the EditorShell top chrome bar, the EasingCurveCanvas
glass-wash curve-editor surface, and the two live docks are rendered chrome), so the AX.W00 mandate binds at
full strength: **the wave does NOT close on the migrate gates GREEN alone.** The binding close evidence is a
**paired BEFORE/AFTER cross-repo live Playwright + frontend-design audit** (the W00 paired-π BEFORE/AFTER +
DELTA protocol), run on the keyframes.js demo (the cross-repo π discipline is binding on the consumer, not only
glass-ui):

- **EditorShell chrome bar** — capture the top chrome BEFORE (the `<HeaderRibbon position="right">` render with
  share/shortcuts/dark-mode + the `#anchor` pinned/toggled) and AFTER (the local chrome bar), and a DELTA
  confirming the migrated bar reads as the same chrome family — affordance (the hover-collapse + the pinned
  anchor still work), hierarchy, spacing, padding, NO visual occlusion, NO regression.
- **EasingCurveCanvas surface** — capture the curve editor BEFORE (`<GlassPanel variant="wash">`) and AFTER
  (`<Card surface="glass">` / `.glass-material .glass-wash`), confirming the glass-wash backplate reads the
  SAME (and now dark-adaptive, where the GlassPanel JS renderer was not — a strict improvement under `.dark`).
- **The two live docks (post-bump)** — a frontend-design pass confirms `ChromeDock` + `AnimationMenuBar` read as
  ONE continuous iOS spring on the AX dock (the `(0.32,0.7)` register), the `data-glass-dock-portal` teleport
  contract holds, and no harsh radial specular survives on the kf `<Card>` surfaces (the W09 softened default,
  satisfied-for-free post-bump per §4 note 12).

The π-lane runs on the keyframes.js repo (the cross-repo π discipline). The captures land under
`docs/tranches/AX/audit/` (the glass-ui-side ledger references the keyframes-side π artefacts). MUST NOT close
W35 on the migrate gates green without the paired-π chrome-bar + curve-editor byte-fidelity proof, NOR mark the
consume leg done without the live two-dock iOS-spring audit.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open) + keyframes-baseline capture.** Orchestrator-run read-only
   `git -C keyframes.js status --porcelain / branch --show-current / stash list / log --oneline HEAD~10..HEAD`;
   confirm all three RED witnesses LIVE (the two surviving prune-target imports at `EditorShell.vue:99` +
   `EasingCurveCanvas.vue:107`; the `^3.4.0` +16.3% dock-spring pin). Re-prove the falsified "ZERO binary
   consumers" premise (the two import sites are LIVE, not test mocks). Capture the baseline in
   `coordination/CONSTELLATION.md`. Do NOT trust the audit's word.
2. **Append `coordination/CONSTELLATION.md` band-N (keyframes migration).** Author the `migrate → prune-publish →
   consume-bump` DAG, the writer-vs-reader boundaries (glass-ui = annex-author/reader; keyframes = own-`demo/`
   writer), the conflict-resolution protocol, and the PUBLISH-gating invariant (the two migrate gates green
   BEFORE W19/W20 publish). Append, do not rewrite W28's band-K or W34's §16 sections.
3. **Author the HeaderRibbon migration annex.** The EditorShell `#items`/`#anchor`/pinned/toggled surface census,
   the local-chrome-bar target (no glass-ui re-add — adversarial-confirmed there is no surviving header idiom),
   the clean-break import-delete, the `proof:off-headerribbon` gate spec (PUBLISH-gating W19).
4. **Author the GlassPanel migration annex.** The EasingCurveCanvas `<GlassPanel variant="wash">` → `<Card
   surface="glass">` / `.glass-material .glass-wash` rung map, the clean-break import-delete, the
   `proof:off-glasspanel` gate spec (PUBLISH-gating W20), the dark-adaptive-improvement note.
5. **Author the dock-spring consume-leg annex (post-publish).** The `^3.4.0` → AX-cut bump, the
   `proof:dock-morph-settled` token-peak re-verify (+16.3% → +4.6%), the `data-glass-dock-portal` teleport
   re-verify, the H.W2/H.W4 specular-clean confirm (W09 satisfied-for-free), the W41-publish-hinge dependency,
   the W34-idiom-census routing.
6. **VISUAL-TRUTH paired BEFORE/AFTER cross-repo live audit + close.** Run the paired-π BEFORE/AFTER + DELTA on
   the keyframes demo (EditorShell chrome bar + EasingCurveCanvas surface; and post-bump the two docks' iOS
   spring + the specular-clean `<Card>`). Confirm the migrate gates GREEN (PUBLISH-gating W19/W20 met) + the
   consume-bump gate GREEN. Record the migration-confirmed state in `coordination/CONSTELLATION.md` (the W19/W20
   publish precondition is now met). Write `audit/W35-…json` to its born-RED→GREEN-on-the-keyframes-side state.
   Route the broader keyframes idiom census to W34 + the publish hinge to W41.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W35-keyframes-prune-migration-dag.json` — the born-RED ledger (the three RED witnesses
  with their live measurements — the two surviving prune-target import sites + the +16.3% dock-spring pin), the
  keyframes-baseline capture (HEAD + status + branch + stash), the HeaderRibbon migration annex (EditorShell
  surface census + local-chrome-bar target + the `proof:off-headerribbon` spec), the GlassPanel migration annex
  (EasingCurveCanvas `variant="wash"` → `.glass-wash` rung map + the `proof:off-glasspanel` spec), the dock-spring
  consume-leg annex (the bump + the `proof:dock-morph-settled` re-verify + the teleport + the specular-clean
  confirm), the PUBLISH-gating ordering record (migrate-gates-green-before-W19/W20-publish), and the
  W19/W20/W34/W41 routing.
- `coordination/CONSTELLATION.md` (band-N section) — the keyframes-baseline capture, the `migrate → prune-publish
  → consume-bump` DAG, the writer-vs-reader boundaries, the conflict-resolution protocol, the PUBLISH-gating
  invariant, the migration-confirmed close state.
- The keyframes-side gate outputs (REFERENCED, not glass-ui-owned):
  `keyframes.js/scripts/proof-off-headerribbon.mjs` + `proof-off-glasspanel.mjs` born-RED→GREEN logs; the
  `proof:dock-morph-settled` +16.3%→+4.6% re-verify log on the bump.
- The paired BEFORE/AFTER cross-repo π-lane captures (the VISUAL-TRUTH evidence) — the EditorShell chrome bar
  (HeaderRibbon → local bar) + the EasingCurveCanvas surface (GlassPanel → `.glass-material .glass-wash`) +
  (post-bump) the two docks' iOS spring + the specular-clean `<Card>`, BEFORE vs AFTER with the DELTA confirming
  chrome/surface fidelity + the iOS-spring continuity — captured under `docs/tranches/AX/audit/` (referencing
  the keyframes-side π artefacts).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `docs(AX.W35): born-RED baseline — keyframes EditorShell:99 off-HeaderRibbon + EasingCurveCanvas:107 off-GlassPanel imports survive, ^3.4.0 dock-spring at +16.3% — the falsified "ZERO binary consumers" premise (slice idiom:keyframes.js result[2])`
2. `docs(coordination): append CONSTELLATION.md band-N — the migrate → prune-publish → consume-bump DAG + keyframes-baseline capture + the PUBLISH-gating invariant (AX.W35)`
3. `docs(AX.W35): HeaderRibbon migration annex — EditorShell #items/#anchor/pinned-toggled → local chrome bar + proof:off-headerribbon spec (PUBLISH-gating W19)`
4. `docs(AX.W35): GlassPanel migration annex — EasingCurveCanvas variant="wash" → <Card surface="glass">/.glass-material .glass-wash + proof:off-glasspanel spec (PUBLISH-gating W20)`
5. `docs(AX.W35): dock-spring consume-leg annex — ^3.4.0 → AX-cut bump + proof:dock-morph-settled +16.3%→+4.6% + data-glass-dock-portal teleport re-verify + W09 specular-clean satisfied-for-free (§4 note 23/12)`
6. `docs(AX.W35): audit ledger — paired BEFORE/AFTER cross-repo π VISUAL-TRUTH confirms chrome-bar + curve-editor fidelity + two-dock iOS spring; W19/W20 publish precondition met; idiom census → W34, publish hinge → W41`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash/
checkout per the hardened agent git clause, in glass-ui AND in any peer repo. Cross-repo push is ALWAYS
orchestrator-authored per ORCHESTRATION.md §Cross-repo commit policy. These are the messages the orchestrator
authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (the visual-runtime π lane + the "live re-diagnosis BEFORE the fix" wave-open ritual) — the binding
  dependsOn.** The charter `### AX.W35` block (line 1706) lists `dependsOn AX.W00`. W35's cross-repo
  VISUAL-TRUTH close runs the W00 paired-π BEFORE/AFTER + DELTA protocol on the KEYFRAMES repo — the chrome bar +
  curve-editor surface + the two docks are live visual surfaces, so a fidelity-preserving migration must be
  live-proven, not assumed from a green migrate gate. W35 also inherits W00's wave-open re-diagnosis ritual
  (re-confirm the two surviving prune-target imports + the +16.3% dock-spring pin LIVE before dispatching the
  migration — the falsified "ZERO binary consumers" premise is the archetype of a misdiagnosed precondition).
- **AX.W19 (HeaderRibbon prune) + AX.W20 (GlassPanel retire) — the PUBLISH-gated parents.** The charter
  `### AX.W35` block (line 1706) lists `dependsOn AX.W19, AX.W20`, and the INVERSE coupling holds: W19/W20
  explicitly dependsOn W35's keyframes-side migrate gates greening BEFORE they PUBLISH (charter line 145, 157,
  1720; W19 spec line 218-221). The dependency is bidirectional-by-stage: W19/W20 LAND the in-repo prune (the
  audit json born-RED→GREEN); W35 lands the consumer migration; the PUBLISH of the prune is gated on W35. W35
  reads the W19/W20 retire-targets (the HeaderRibbon excision rationale; the GlassPanel → `.glass-material`
  retire-target) so its migration annexes point EasingCurveCanvas at W20's OWN documented target.
- **Why a dependsOn on the dock band (W01-W06) is INDIRECT (via the publish):** the dock-spring consume leg
  re-verifies the rebuilt dock, but it depends on the AX cut being PUBLISHED (the W41 hinge), not on the dock
  waves landing in-repo. W35's migrate legs are version-INDEPENDENT (import-rewrite on the current `^3.4.0`
  pin), so they do NOT wait on the dock band; only the consume bump does, via the publish.
- **Routes (not blocks): W34** (the broader keyframes per-consumer idiom census — ResponsiveSelect orphan,
  menubar `menuItemVariants`, the EditorShell `.grid-background` → `/constellation` backdrop leverage) and
  **W41** (the publish hinge the consume bump resolves through). W35 names + routes these; it does not execute
  them. W35 owns ONLY the prune-migration DAG (the two prune-target migrations + the dock-spring consume bump).

---

## Archaeology (the git commits / prior-tranche lineage the audit cited as evidence)

- **keyframes.js `demo/@/components/custom/editor-shell/EditorShell.vue:99`** (`import { HeaderRibbon } from
  "@mkbabb/glass-ui/header-ribbon"`; used :10-44 as `<HeaderRibbon position="right">` with `#items`/`#anchor`/
  pinned/toggled; `headerRibbonRef` :137) — the LIVE consumer that falsifies W19's "ZERO binary consumers"
  premise (slice `idiom:keyframes.js` `result[2]`; constellation corpus line 879-882, 1625-1628). The glass-ui
  HeaderRibbon promotion lineage is O.W6 Lane A (`src/api/index.ts:196` comment) — shipped on the strength of a
  glass-ui-INTERNAL zero-consumer census that never enumerated cross-repo consumers.
- **keyframes.js `demo/@/components/custom/EasingCurveCanvas.vue:107`** (`import { GlassPanel } from
  "@mkbabb/glass-ui/glass-panel"`; used :2-102 as `<GlassPanel variant="wash">`) — the LIVE consumer that the
  W20 GlassPanel retire breaks (slice `idiom:keyframes.js` `result[2]`; W20 block line 1097-1100). The glass-ui
  GlassPanel JS renderer is the broken async-feImage `createGlassFilter`/`useGlassRenderer` path
  (`useGlassRenderer.ts:147-230`, hard-overwriting non-dark-adaptive inline white) the `.glass-material` grammar
  supersedes (deep-audit `primitive-fix/redesign`).
- **keyframes.js `package.json:115` `@mkbabb/glass-ui: ^3.4.0`** + **`docs/tranches/H/PROGRESS.md:213-218`**
  (the BLK-5 consume-leg bump — "the dock runs the pre-AW.W2 bouncy spring … the fix is a kf consume-leg BUMP
  ^3.4.0 → the AX cut, NOT a wait") — the stale-pin dock-spring witness (slice `idiom:keyframes.js` `result[3]`).
  The two live docks: `AnimationMenuBar.vue:17` (`<GlassDock :always-expanded :fit-content>`) +
  `dock/ChromeDock.vue` (GlassDock+DockSelectTrigger).
- **The keyframes single-clock dock high-water `e82633e`/`e8380d7`** + **the published `(0.32,0.7)`
  `--spring-dock` curve (sampled ramp peak ~+4.6%)** — the SHIPPED-CORRECT ORACLE the W01 single-scalar morph
  COMPOSES with (§4 note 23, charter line 2183-2196). keyframes' dock is the reference, NOT a defect to re-fix;
  the `^3.4.0` `(0.5,0.5)` +16.3% register is the STALE-PIN symptom the consume bump fixes (publish-currency
  gap, §4 note 12 — NOT a glass-ui-HEAD defect).
- **The keyframes LIGHT-barrel `flip()` trigger** (charter line 1729) — the proven host-hold shape `useDockHold`
  (W03) preserves the provide/inject keepOpen DI + the `data-glass-dock-portal` teleport contract through the
  dock rebuild.
- **The W28→W29 speedtest native-first DAG** (`docs/tranches/AX/waves/AX.W28-…md`; §4 note 8, charter line
  2032-2036) — the architectural precedent W35 mirrors for keyframes (the same migrate-before-prune / no-dangle
  ordering, applied to a different consumer + a different prune surface). The H.W2/H.W4 keyframes consumption
  fixes (the harsh radial specular on `surface="glass"` Cards) are the satisfied-for-free legs the W09 softened
  default discharges post-bump (charter line 1736-1738).

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-N binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **substrate-with-consumer / wire-before-retire — the inv-16' migrate-before-prune ordering**
  (`precepts/instructions/README.md:28-49` "Substrate with consumer" + "Wire before retire"; the J inv 10 / L
  inv 8 substrate-without-consumer-binary; CLAUDE.md §Design Axes 3). The whole wave IS this precept in
  cross-repo PRUNE form: glass-ui MUST NOT PUBLISH the W19/W20 prune while a live consumer imports the surface —
  keyframes MIGRATES OFF both primitives FIRST (W35 migrate gates), THEN glass-ui publishes the prune (W19/W20),
  THEN keyframes bumps + consumes the rebuilt dock (W35 consume leg). The wire-before-retire ordering of
  preference is satisfied: HeaderRibbon/GlassPanel are TRULY contrived for keyframes (a ~40-line ribbon; a
  pure glass-wash wrapper), so the keyframes-side path is RETIRE-the-import-with-rationale (the local chrome bar
  / the `.glass-material` div), recorded in the migration annex. MUST NOT invert the order (a glass-ui-side
  prune PUBLISH before the migrate gates = a dangling consumer build break at the next bump).
- **cross-repo coordination doc + sibling-baseline-capture ritual**
  (`precepts/instructions/tranche/SPEC.md:19,38` "`coordination/<peer-letter>.md` … required when the tranche
  has a confirmed cross-repo race surface OR a deferred cross-repo handoff … names the other repo's HEAD at
  coordination time, the surfaces both tranches may write, the writer-vs-reader boundaries, and the
  conflict-resolution protocol"; `coordination/CONSTELLATION.md` if cross-repo origin; the bbnf
  sibling-baseline-capture ritual per the charter §0). W35 APPENDS the band-N keyframes-migration section to
  `coordination/CONSTELLATION.md` (W28 opens it) and captures keyframes' HEAD + status + branch + stash BEFORE
  any cross-repo edit. MUST NOT dispatch the migration ASK against an uncaptured keyframes tree, NOR rewrite
  W28's band-K or W34's §16 sections (disjoint-section authorship).
- **the hardened agent git clause + the cross-repo commit policy**
  (`precepts/instructions/ORCHESTRATION.md:107-138` + `tranche/AGENT_DISPATCH_TEMPLATE.md`). glass-ui writes NO
  keyframes source — it authors ADDITIVE migration annexes; the keyframes session executes under its own
  tranche; cross-repo PUSH is ALWAYS orchestrator-authored, NEVER agent-authored; before any cross-repo action
  the orchestrator runs read-only inspection (`git -C keyframes.js status --porcelain / branch / log`). MUST NOT
  have a glass-ui agent stage/commit/checkout in the keyframes repo.
- **no-silent-deferrals + the §16.4 zero-loss forcing-function + the chronic-closure meta-invariant**
  (`precepts/instructions/README.md:25-27` "No silent deferrals"; `tranche/SPEC.md:191` P invariant 28 — "every
  item LANDS, RETIRES with rationale, or ARCHIVES … 'deferred to next tranche' is not an acceptable
  close-state"). Each prune-target migration LANDS with a born-RED PAIRED handoff gate (`proof:off-headerribbon`
  / `proof:off-glasspanel`) — a bare "handed off to keyframes" tag is NOT a terminal (the chronic-closure
  meta-invariant, §2b band-N). The dock-spring consume leg is NAMED + ROUTED (the bump → W41 publish hinge; the
  broader idiom census → W34) — NOT silently treated as done. MUST NOT close W35 with a phantom-owner re-defer of
  the migration to a future tranche.
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation**
  (`precepts/instructions/README.md:82-93`; `tranche/SPEC.md:112-116`; CLAUDE.md §0 mandate). The clean-break is
  fail-LOUD by construction: after W19/W20 strike the primitives, an unconverted keyframes import fails the
  build (no silent alias, no compat re-export) — but W35's migrate-before-prune ordering ensures there IS no
  unconverted import at PUBLISH time. The migrate gates are the fail-explicit enforcement (a surviving
  prune-target import reds the gate). MUST NOT ship a back-compat alias or a graceful re-export of HeaderRibbon /
  GlassPanel that would silently absorb a missed import-rewrite.
- **the π visual-runtime lane — binding on the consumer repo**
  (`precepts/instructions/tranche/SPEC.md:118-133,191`; AX.W00; §2b band-N "cross-repo π is binding on the
  consumer too"). The cross-repo VISUAL-TRUTH close runs the paired-π BEFORE/AFTER + DELTA on the keyframes repo
  — the EditorShell chrome bar + the EasingCurveCanvas glass-wash surface + the two docks are live visual
  surfaces, so the wave closes on a live cross-repo audit, NOT a headless migrate-gate GREEN alone (the cardinal
  AW lesson). MUST NOT close W35 on the migrate gates green without the paired-π chrome-bar + curve-editor
  fidelity proof + the two-dock iOS-spring + specular-clean audit.
- **cross-repo-dev-resolution contract-v2 — the consume-bump resolves through it**
  (`precepts/cross-repo-dev-resolution.md` invariant 30 / contract-v2; §2b band-N). The dock-spring consume leg
  is the inverse-ordering leg the publish gates: keyframes dev-resolves the BUILT `dist/` of the AX cut, so the
  bump only delivers the rebuilt dock IF the publish hinge (W41 — the `build:watch` dts-freshness keystone) kept
  `dist/` fresh. W35 ROUTES the bump through W41 (it does not own the publish). MUST NOT treat the consume bump
  as resolvable before the AX cut publishes — that is the §4 note 12 publish-currency gap the bump closes.
