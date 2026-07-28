export const meta = {
  name: 'deck-relocation-sweep',
  description: 'Owner rulings 10-12: deck three-way inventory (slides/atlas/glass-ui) + the relocation census',
  phases: [
    { title: 'Inventory', detail: 'Opus evidence seats over slides, atlas, glass-ui, consumer ledger', model: 'opus' },
    { title: 'Adjudicate', detail: 'Fable: deck split table + relocation roster', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const LAW = `Repo /Users/mkbabb/Programming/glass-ui, 2026-07-28. State your modelId first. LAWS: sibling
repos under /Users/mkbabb/Programming/* are READ-ONLY (read/grep only, never write, never git-operate
there) · you author NO repo bytes — your returned text is the deliverable · cite every claim file:line ·
em dashes without spaces · no silent drops. Standing census rule (owner, this sitting): muster is a
PROTOTYPE repo — its consumer counts never bind a disposition.`

const D_TASKS = [
  { key: 'D1-slides', brief: `SLIDES DECK-MECHANICS INVENTORY. The owner's ruling: slides-specific STYLING
migrates to atlas; the ABSTRACT, GENERALIZED slide facilities migrate INTO glass-ui. Read the slides repo
at /Users/mkbabb/Programming/slides (resolve the actual layout with ls; the deck system may live under
src/, packages/, or a deck/ dir). Inventory EVERY slide/deck facility: navigation + windowing (slide
in/out, direction, wrap), transitions/animation clocks, stage/frame geometry, progress/pager affordances,
keyboard/gesture drivers, deck state machines, xray/overview modes, print/export. For each: file:line ·
what it does · verdict material: ABSTRACT-GENERAL (glass-ui candidate — no slides content assumptions) /
SLIDES-STYLING (atlas candidate — visual identity, theme, chrome) / SLIDES-CONTENT (stays — deck content,
authoring, HMAC/deploy). Note which facilities duplicate what glass-ui already ships (grep
/Users/mkbabb/Programming/glass-ui/src for the same job before classifying).` },
  { key: 'D2-atlas', brief: `ATLAS DECK PRIOR ART. Resolve the atlas repo root (ls /Users/mkbabb/Programming
— look for atlas; it may also live at sci-report/atlas). Find useStageDeck + useDeckDetent + every deck
import ('@mkbabb/glass-ui/deck' ×2 per the codex ledger) and any slide-styling machinery already landed
in atlas. For each: file:line, what it does, how it consumes or extends glass-ui's deck. Deliver: the
prior-art table + where atlas would RECEIVE slides styling (which dirs/systems).` },
  { key: 'D3-glassui', brief: `GLASS-UI DECK + CAROUSEL CURRENT STATE. In /Users/mkbabb/Programming/glass-ui:
read src/components/deck/ and src/components/carousel/ in full (structure, props, motion, what engine each
uses — embla? bespoke?). Then read ${REF}/EXEMPLARS-CODEX.md §the windowing + continuous-timeline laws
(pages-from-album, album-from-dock) and ${REF}/TERMINAL-ROSTER.md row #40 (deck re-hearing). Deliver: the
current-state table (deck vs carousel: engine, clocks, windowing model, overlap, divergence) + which
EXEMPLARS laws bind a shared windowed-sequence substrate + what a ONE-substrate cut would delete/unify
(file:line candidates). The owner's ruling: carousel STAYS and shares the deck's animations/facilities.` },
]

const E_TASKS = [
  { key: 'E1-concentration', brief: `RELOCATION CENSUS — CONCENTRATION PASS. Evidence base:
docs/tranches/BJ/audits/2026-07-28-consumer-constellation/CONSUMER-LEDGER.md (+.json for file detail).
For EVERY glass-ui subpath component, compute consumer concentration: which repos import it and at what
weight, EXCLUDING muster (prototype rule). Flag every component where ≥~80% of consumption sits in ONE
repo (the watercolor-dot pattern: value ×11, sole consumer, RELOCATE ruled). Known candidates to verify
substance on disk (read the consuming files — are the semantics consumer-specific or general vocabulary?):
handmark (atlas ×3) · scroll-progress-rim (atlas ×1) · fourier-field (slides ×2) · search (value ×4) ·
constellation (atlas ×2 + slides ×1) · completion-seal (atlas/sci family) · status-dot (spread?) ·
icon-tooltip (speedtest ×2) · scrolling-text (speedtest ×2) · timeline (speedtest ×1) · context-menu
(speedtest ×2) · pulse (speedtest ×3) · keyboard (keyframes ×3) · easing (value ×5 + keyframes ×2).
Deliver: component × consumers × concentration × consumer-specific-or-general verdict material.` },
  { key: 'E2-zero-residue', brief: `RELOCATION CENSUS — ZERO/RESIDUE PASS. In /Users/mkbabb/Programming/glass-ui
list every component dir under src/components/. Cross the full list against the codex ledger's specifier
tables (docs/tranches/BJ/audits/2026-07-28-consumer-constellation/CONSUMER-LEDGER.md) + a root-barrel
named-import sweep of the consumer repos (grep "from '@mkbabb/glass-ui'" import statements and extract
named symbols). Deliver: (a) components with ZERO consumption anywhere (excluding muster) that are NOT
already on a disposition row of ${REF}/TERMINAL-ROSTER.md rows #18/#40 or GESTALT Ruling 6 — the
unexamined residue class; (b) components whose only consumption is via the demo/storybook; (c) corrections
to any (a)/(b) claim the ledger's own interpretation law would challenge (manifest/transitive edges).` },
]

const [deck, reloc] = await parallel([
  async () => {
    const inv = await parallel(D_TASKS.map(t => () =>
      agent(`${LAW}\n\nYou are a DECK-INVENTORY seat (${t.key}).\n\n${t.brief}`,
        { label: t.key, phase: 'Inventory', model: 'opus' })))
    return agent(`${LAW}\n\nDECK ADJUDICATOR (Fable). Three seats inventoried slides, atlas, and glass-ui.
The owner's rulings (EXEC-STATE §THE OWNER SITTING items 11-12): abstract slide facilities migrate INTO
glass-ui · slides styling migrates to atlas · carousel STAYS sharing the deck's substrate. Deliver, with
sagacity and incredulity (re-read contested files yourself): THE THREE-WAY SPLIT TABLE (every slides
facility → glass-ui / atlas / stays, grounds) · THE SHARED-SUBSTRATE RULING MATERIAL (deck+carousel one
windowed-sequence engine: what unifies, what deletes, which EXEMPLARS laws bind, file:line) · the widened
#40 wave-amendment draft (what the deck apotheosis wave must now specify — an amendment BODY the
perfection fold can seat verbatim). Flag any facility two seats classified differently.\n\n${inv.filter(Boolean).map((x,i) => `===== ${D_TASKS[i].key} =====\n${x}`).join('\n\n')}`,
      { label: 'adjudicate:deck-split', phase: 'Adjudicate', model: 'fable', effort: 'xhigh' })
  },
  async () => {
    const inv = await parallel(E_TASKS.map(t => () =>
      agent(`${LAW}\n\nYou are a RELOCATION-CENSUS seat (${t.key}).\n\n${t.brief}`,
        { label: t.key, phase: 'Inventory', model: 'opus' })))
    return agent(`${LAW}\n\nRELOCATION ADJUDICATOR (Fable). Two seats ran the concentration + zero/residue
passes. The owner's ruling (EXEC-STATE §THE OWNER SITTING item 10): watercolor-dot → value.js CONFIRMED;
'elements like it' relocate to their dominant consumer. Deliver THE RELOCATION ROSTER: per component —
RELOCATE (→ which repo, grounds: concentration + consumer-specific semantics) / STAY (general vocabulary,
grounds) / DELETE-CANDIDATE (zero consumption + no library merit — route to the perfection fold, never
mint the deletion yourself) / ALREADY-RULED (cite the row). Incredulity: a single-consumer count alone
never proves consumer-specific semantics — the substance read decides; re-read any file where the seats
disagree. End with the owner-glance list: rows needing an owner word vs rows the fold can seat.\n\n${inv.filter(Boolean).map((x,i) => `===== ${E_TASKS[i].key} =====\n${x}`).join('\n\n')}`,
      { label: 'adjudicate:relocation', phase: 'Adjudicate', model: 'fable', effort: 'xhigh' })
  },
])

return { deck, reloc }