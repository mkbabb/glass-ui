// AZ R4+R5 corrective band — dispatched AFTER Batch 3 lands. Grounded in
// docs/tranches/AZ/audit/USER-AUDIT-2026-06-11-R4.md + USER-AUDIT-2026-06-11-R5-SLIDES-CONSUMER.md
// (BOTH BINDING). Two stages: A = R5-TAP ‖ R4-SHELL ‖ R5-SCOPED (disjoint files);
// B = R4-RAIL ‖ R5-TOKENS (the rail/jank verification runs on the FIXED tap
// architecture; tokens disjoint).
export const meta = {
  name: 'az-r4r5-corrective',
  description: 'The R4+R5 corrective: stage A (R5-TAP the pass-through/morph-race architecture ‖ R4-SHELL the gear=PresetEditor ‖ R5-SCOPED the :global() trap audit+precept) → stage B (R4-RAIL the rail re-open + jank ‖ R5-TOKENS the dock-scale knob + coarse default + panel padding). Opus. No git.',
  phases: [
    { title: 'StageA', detail: 'R5-TAP ‖ R4-SHELL ‖ R5-SCOPED' },
    { title: 'StageB', detail: 'R4-RAIL ‖ R5-TOKENS' },
  ],
}

const GU = '/Users/mkbabb/Programming/glass-ui'
const SCHEMA = {
  type: 'object', additionalProperties: false,
  required: ['lane', 'status', 'gatesGreen', 'typecheckGreen', 'capturedPngs', 'sharedFileDeltas', 'summary', 'blocker'],
  properties: {
    lane: { type: 'string' },
    status: { type: 'string', enum: ['DONE', 'DONE_WITH_MISSES', 'PARTIAL', 'BLOCKED'] },
    gatesGreen: { type: 'boolean' },
    typecheckGreen: { type: 'boolean' },
    capturedPngs: { type: 'array', items: { type: 'string' } },
    sharedFileDeltas: {
      type: 'object', additionalProperties: false,
      required: ['packageJsonScripts', 'gatesMjsRows', 'progressRow', 'visualAllowlistAdd', 'migrationRows'],
      properties: {
        packageJsonScripts: { type: 'array', items: { type: 'string' } },
        gatesMjsRows: { type: 'array', items: { type: 'string' } },
        progressRow: { type: 'string' },
        visualAllowlistAdd: { type: 'array', items: { type: 'string' } },
        migrationRows: { type: 'array', items: { type: 'string' } },
      },
    },
    summary: { type: 'string' },
    blocker: { type: ['string', 'null'] },
  },
}

const PRE = `You are a glass-ui BUILD agent at ${GU}, branch tranche/AY @ HEAD (AZ Batches 0-3 landed). THE BINDING USER AUDITS: ${GU}/docs/tranches/AZ/audit/USER-AUDIT-2026-06-11-R4.md + USER-AUDIT-2026-06-11-R5-SLIDES-CONSUMER.md — read BOTH first. PROTECTED BINARY-CONSUMER CONTRACTS (slides, live in production): the /constellation exports seedField/readPalette/BASE_WIDTH/warpTo/warpStep, and GlassDock's exposed expanded ref — do NOT rename/remove these surfaces. Demo at http://localhost:5199 (restart if down: npm run dev -- --port 5199 --strictPort; NEVER :5173; the user audits :5210 — leave it). The user's truth surface is the DEMO SHELL — verify THERE, not only story mounts. IMPLEMENT idiomatically at the ROOT; CAPTURE own-surface DELTAs incl. the shell (real dims, literal filenames, surface-paths + surface-hash headers); VERIFY (gates + typecheck + adjacent fleets). NO git. Do NOT edit package.json/gates.mjs/PROGRESS/VISUAL-ALLOWLIST/MIGRATION.md — report in sharedFileDeltas. Clean /tmp.`

function L(id, phase, body) {
  return () => agent(`${PRE}\n\n=== LANE: ${id} ===\n${body}\nReturn (lane="${id}").`,
    { label: id, phase, schema: SCHEMA, model: 'opus' })
}

phase('StageA')
const a = (await parallel([
  L('R5-TAP', 'StageA', `R5-3 (consumer-verified on the slides deck, real-input reproduced — the ARCHITECTURAL dock-interaction fix):
(a) THE COLLAPSED-TAP PASS-THROUGH must scope to the TAPPED ELEMENT'S IDENTITY — capture the element at pointerdown and re-dispatch/activate against THAT element (or its post-swap equivalent by identity), NEVER post-swap coordinates (the layer swap puts a different control under the finger; on the deck a Home-link landed under the gear tap → navigate-away).
(b) THE MORPH-SETTLE WINDOW: GlassDock gains an INTERNAL window during the hover-expand FLIP — a click mid-morph resolves against the PRE-morph target or defers until settle (--dock-morph-t settled). On the deck: approach-then-click advanced the slide instead of opening the gear popover. The consumer must NEVER need a guard (slides ships a 320ms capture-phase guard keyed off the exposed expanded ref — annotated to RETIRE on your fix; the expanded ref itself STAYS exposed).
(c) The slides replay recipe is the acceptance bar (/Users/mkbabb/Programming/slides/docs/tranches/M/audit/visual/W-R10-DELTA.md — read it): approach-click during morph must not change route/state; the settled click opens the gear menu; a submenu opens beside its trigger. Reproduce the recipe's equivalents on the demo shell with real input (Playwright real cursor + touch emulation) and capture.
(d) Gate: extend proof:dock-no-scale-pop or mint proof:dock-tap-integrity (the identity-scoped pass-through witness + the settle-window witness + the live replay) — born-RED on the pre-fix tree via git-show reconstruction.`),
  L('R4-SHELL', 'StageA', `R4-3 + R4-4 (refines R3-4 atop W-SHELL-CONFIG's Batch-3 output — re-grep its landed state FIRST):
(1) THE GEAR VIEW IS THE PRESET EDITOR: the gear never routes to /composables/use-token-color or any story; it opens the PresetEditor as its content (ONE surface — if Batch 3 built a generic settings panel, reconcile onto the PresetEditor). The floating FAB stays dead.
(2) THE DARK-MODE TOGGLE AT THE TOP of the gear view (supersedes bottom-of-rail INSIDE this view only).
(3) GLASSY CONTROLS (R4-4): every editor row composes the house registers — SegmentedTabs (segmented/pill) for enums, the glass Select for long lists, glass switches/sliders — NO bare buttons/native selects/unstyled radios. Sweep EVERY row; before/after captures.
(4) R5-4 (the consumer-verified padding rung): the floating-panel/menu-content default padding reads TIGHT — lift the panel padding rung AT THE ROOT (the .floating-panel/DropdownMenuContent recipe), token-first (a --panel-padding rung consumers can retune; slides' .deck-settings interim arm retires on it). Verify the gear popover + the demo dropdowns read comfortable both modes.
(5) End-to-end on the shell: open → edit → live-apply; a11y (aria-expanded on the trigger, focus into the panel).`),
  L('R5-SCOPED', 'StageA', `R5-5 (the recurring trap — THIRD production recurrence, consumer-verified): Vue scoped ':global(.dark) .x' is silently DROPPED from emitted CSS.
(1) AUDIT: sweep glass-ui src/ + demo/ for ':global(' inside <style scoped> blocks; verify each survivor actually EMITS (the CSSOM check — build + grep dist CSS or mount-and-readback); fix every dropped arm onto the plain-ancestor idiom (.dark .x → compiles to .dark .x[data-v-…]).
(2) READ-ONLY consumer sweep: grep ../slides/src ../speedtest/src ../words/frontend/src for the same pattern; report hits in your summary (their fixes are theirs — do not edit siblings).
(3) CODIFY: add the plain-ancestor idiom to ${GU}/docs/precepts/design-idioms.md (the scoped-dark-arm section: the trap, the CSSOM evidence, the working form) — IF docs/precepts is writable (it is a submodule; if the write fails, put the section in CLAUDE.md's conventions instead and say so).
(4) GATE: mint proof:no-scoped-global (a static sweep: zero ':global(' inside scoped style blocks across src/ + demo/; the allowlist empty at birth) — born-RED if any survivor exists at HEAD, else born-RED via a synthetic fixture.`),
])).filter(Boolean)
log('stage A: ' + a.length + '/3')

phase('StageB')
const b = (await parallel([
  L('R4-RAIL', 'StageB', `R4-1 (re-opens AZ.W-RAIL-EXTEND — the user contradiction rules) + the jank, ON the stage-A-fixed tap architecture (re-grep R5-TAP's landed edits first):
(1) THE SHELL RAIL IS THE TRUTH SURFACE: no hairline visibly extends beyond the dock on the shell; a BLACK BLOB artifact clips at the dock's bottom edge (the end-icon painting unstyled/mispositioned or the slot clipping). Reproduce on :5199's shell, root-cause (the SidebarDock #rail mount? the extent token resolving 0? ancestor clipping the absolute slot?), fix at the root: the hairline VISIBLY overruns the dock edge on the shell (light+dark), the end-icon a proper dock-control glass register.
(2) THE JANK: frame-sample the shell dock + rail animations (hover/expand/layer-swap) — instrument BEFORE tuning; root-cause sub-60fps or visible pops; fix per the §6 easing doctrine.
(3) THE DEMO-IA NOISE (R4-2): walk /dock/* + the shell facet groups as a FIRST-TIME AUDITOR; prune/rename anything that reads as noise (orphan comparison sections, jargon labels, unclear facets). KISS.
(4) Re-stamp the re-opened W-RAIL-EXTEND row + DELTA with SHELL captures; extend proof:rail-extend with a shell-mount witness.`),
  L('R5-VEIL', 'StageB', `R5-7 (consumer-ratified, three slides sites = the >=2-consumer bar met on arrival): the VEIL plate as a first-class Card surface.
(1) THE VARIANT: a Card surface (alongside the cartoon surface precedent) — 'veil': the wash/quiet glass fill + blur with the border AND rim/highlight STRIPPED (border:none, box-shadow:none — the boxed look reads as a dividing line on a text plate), an optional radial feather axis (--veil-feather, default none), token-first (--veil-* rungs a consumer retunes). Conceptually the W55 adaptive tint applied as a LOCAL legibility plate.
(2) THE HOME: the Card surface axis (src/components/ui/card + the glass.css family — follow the cartoon-surface @utility precedent: a composable surface class a Card prop selects); the glass-cohesion gate must see it as a sanctioned glass register, not an opaque escape.
(3) CONSUMERS: >=2 demo sites at birth (a hero text plate over a busy substrate + one more befitting site) — the slides trio re-points on the release bump.
(4) Gate: extend proof:glass-cohesion or the card fleet with the veil witness (borderless+rimless+fill present; the feather axis optional) — born-RED via synthetic.
(5) MIGRATION/api: the CardTier/variant type gains 'veil'; api/index.ts re-syncs; report rows in sharedFileDeltas.`),
  L('R5-TOKENS', 'StageB', `R5-1 + R5-2 (consumer-verified, implementation-ready — the dock coarse-register tokens):
(1) R5-1 THE DEAD KNOB: --dock-scale resolves at :root with --dock-local-scale=1 (the substitution-vs-inheritance trap, again) — RE-DECLARE --dock-scale: calc(var(--ui-scale) * var(--dock-local-scale, 1)) INSIDE the coarse .glass-dock[data-density] block (src/styles/dock/overflow.css, beside the --dock-local-scale lift) so the consumer knob reaches the geometry cascade. Verify with a π readback: setting --dock-mobile-scale on an ancestor changes the painted collapsed-pill size under coarse-pointer emulation.
(2) R5-2 THE COARSE DEFAULT: the coarse dock paints ~22% too big (74px collapsed pill). Land the consumer-validated compact register: the dock-layer coarse default ≈0.78 (NOT the global --ui-scale) → collapsed ≈60px, the touch floor held by the max(…, --dock-control-floor) clamp. Token-first; document the knob in CLAUDE.md's dock section.
(3) Sweep the OTHER substitution-vs-inheritance candidates in the dock token chain (any calc(var()) declared at :root but overridden below — the third recurrence of this trap class; enumerate in your summary).
(4) Gate: extend proof:ui-scale or the dock fleet with the knob-reaches-geometry witness (born-RED on the pre-fix tree).`),
])).filter(Boolean)
log('stage B: ' + b.length + '/2')
return { a, b }
