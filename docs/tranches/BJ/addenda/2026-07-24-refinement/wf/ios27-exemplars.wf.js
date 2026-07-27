export const meta = {
  name: 'ios27-exemplars-codex',
  description: 'Frame-by-frame marking of the nine iOS27 exemplar videos + stills → the tri-fold exemplar codex in our own design language',
  phases: [
    { title: 'Mark', detail: 'Opus seats read every frame; owner mark-list verbatim', model: 'opus' },
    { title: 'Codex', detail: 'Fable ∥ Opus distill → Fable apotheosis', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const IOS = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/ios27'
const CANON = `glass-ui tranche BJ→BK, 2026-07-27. State your modelId. You author no repo byte — text is
the deliverable. Em dashes without spaces. The design-language law is absolute: we NEVER want a trite or
lifeless recreation — every translation is into OUR language: warm cream, deft rounding, our palettes,
our glass, our springs. iOS is the exemplar, never the target.`

const MARKS = `THE OWNER'S MARK-LIST (verbatim charter — mark every phenomenon that appears in YOUR
frames; skip silently nothing that appears, state plainly what does not appear):
NEW RECORDING (v1): the growing/morphing of the bottom AND top docks/search bars · the black
siri/control-centre orb expansion · the ios27 glass tabs · the draggable magnifying selection with glass
distortion (the loupe).
MUSIC APP: breath of life infused into the dock, the search bar, the dock's fission and fusion ·
the dock's tabs and the eyeglass effect · the album expanding FROM the dock in one continuous motion and
timeline · pages expanding FROM the album cover, contextually switching to the next page in a windowing
transition · THE DOUBLE-DOCK: now-playing dock stacked upon the main dock at quiescence; on scroll the
two collapse into one; then the dock performs a FISSION — controls gird the left, search girds the right
(both as icons), now-playing in the centre — the entire process choreographed and animated.
CHATGPT APP: usage of space and proportion · slider engagement and interaction · the gradient blurring
around that slider element and how it focuses attention subtly · the chat bubbles and their animation ·
dock fission/fusion · dock tabs + eyeglass · double-dock · scrolling/collapsing behavior · orientation
and width/height flexibility · the choreographed animations and transitions · breath of life throughout.
GEMINI: the siri-contextual menu and its breath-of-life animation · the pull-down effect · the partial
black-dock of the siri menu · the recent-apps and search-results drawer — how it morphs, expands, has
the MOVEMENT OF MOMENTUM · the dot-matrix color and its transitions.
NOTIFICATIONS: the notification × in the top-LEFT corner, partially OUTSIDE the element, sitting on the
corner border · the ios27/macos27 notification vaporize/dissolve effect.
SIRI: the siri invocation · the waveform visualizer · the siri results expanding like a dock DOWNWARDS,
animated.
POPOVER: the popover animation — MOVEMENT OF MOMENTUM + BREATH OF LIFE — how it fades in, snappy and
tightly, with a spring and effervescent effect — SMOOTH, not sharp.
For every mark: timestamp window (frame numbers × 2fps) · phase-by-phase choreography (what moves first,
what follows, the stagger) · measured properties where the eye can price them (relative radii, blur read,
scale arcs, overshoot present/absent, opacity ramps vs transform ramps and WHICH LEADS — "the fading
happens FASTER than the stretching" is the class of observation wanted) · what makes it read ALIVE.`

const VIDEO_SEATS = [
  { key: 'v1a', dir: 'v1', range: [1, 30] }, { key: 'v1b', dir: 'v1', range: [31, 60] },
  { key: 'v2a', dir: 'v2', range: [1, 38] }, { key: 'v2b', dir: 'v2', range: [39, 76] },
  { key: 'v3', dir: 'v3', range: [1, 24] },
  { key: 'v4', dir: 'v4', range: [1, 19] },
  { key: 'v5', dir: 'v5', range: [1, 24] },
  { key: 'v6a', dir: 'v6', range: [1, 23] }, { key: 'v6b', dir: 'v6', range: [24, 46] },
  { key: 'v7', dir: 'v7', range: [1, 25] },
  { key: 'v8', dir: 'v8', range: [1, 26] },
  { key: 'v9', dir: 'v9', range: [1, 29] },
]

phase('Mark')
const marked = await parallel(VIDEO_SEATS.map(s => () =>
  agent(`${CANON}

MARK SEAT ${s.key} — frames ${IOS}/${s.dir}/f${String(s.range[0]).padStart(3, '0')}.png … f${String(s.range[1]).padStart(3, '0')}.png
(2fps; SOURCE.txt in the dir names the video). READ EVERY FRAME IN YOUR RANGE — they are the deliverable.
Where a morph crosses fewer than 3 of your frames, burst-extract 12fps around it yourself:
ffmpeg -v error -ss <t0> -to <t1> -i "$(cat ${IOS}/${s.dir}/SOURCE.txt)" -vf fps=12 ${IOS}/${s.dir}/burst-<name>-%02d.png
and read the burst. First state WHAT APP/CONTEXT your frames show, then mark.

${MARKS}`, { label: `mark:${s.key}`, phase: 'Mark', model: 'opus', effort: 'high' })
    .then(out => (out ? { key: s.key, out } : null))))

const stills = await agent(`${CANON}

STILLS SEAT — read every image in '/Users/mkbabb/Downloads/New Folder With Items 4' (PNG/JPEG only; skip
videos and HEIC). Mark against the same charter — especially the notification corner-× geometry (where
exactly it sits relative to the corner border, its size ratio) and any glass/tab/dock still that prices a
blur, tint, or radius the videos move too fast to read. The two texture files (liquid-metal, images-2)
are reference material the owner filed — describe what design note each carries.

${MARKS}`, { label: 'mark:stills', phase: 'Mark', model: 'opus', effort: 'high' })

const good = marked.filter(Boolean)
log(`${good.length}/12 video seats + ${stills ? 'stills' : 'NO stills'} returned`)

phase('Codex')
const body = good.map(m => `\n===== ${m.key} =====\n${m.out}`).join('') + (stills ? `\n===== stills =====\n${stills}` : '')
const CODEX = `${CANON}

THE EXEMPLAR CODEX — distill the marks into the artifact of record. Repo context to consume FIRST:
/Users/mkbabb/Programming/glass-ui/${REF}/EXEC-STATE.md (rulings incl. RATIFICATION) ·
docs/tranches/BJ/addenda/IOS27-ARCHIVE.md if present (the extant measured archive — EXTEND it, never
re-measure what it already prices; cite its row ids) · ${REF}/MOTION-CANON.md · ${REF}/GESTALT.md §1
(the suffusion matrix + the three laws scored). Author the body of EXEMPLARS-CODEX.md:
§1 THE PHENOMENON TABLE — every owner mark: measured behavior (from the seats, frame-cited) · what makes
it ALIVE (the breath/momentum mechanism, which channel leads) · OUR-LANGUAGE TRANSLATION (warm cream,
deft rounding, our palettes, our glass, named springs from the table — never a recreation) · TARGET
(component + wave id from ${REF}/TERMINAL-ROSTER.md, or NEW-ROW if unowned).
§2 THE CHOREOGRAPHY LAWS — the cross-phenomenon principles the marks prove (stagger orders, which-leads
rules, the double-dock composition law, the continuous-timeline expansion law) as candidate canon rows
for W-DESIGN-CANON.
§3 ROUTED DELTAS — per roster wave: what this codex adds/amends (GF-DOCK the double-dock + fission
choreography; W-TABS the eyeglass; the vaporize row; the popover spring; the waveform row; …), each one
line + citation. §4 WHAT THE ARCHIVE ALREADY HAD — the marks that merely re-confirm banked rows (cite,
retire). No mark silently dropped.

${'${BODY}'}`

const codexPrompt = CODEX.replace('${BODY}', () => body)
const [xO, xF] = await parallel([
  () => agent(codexPrompt, { label: 'codex:opus', phase: 'Codex', model: 'opus', effort: 'xhigh' }),
  () => agent(codexPrompt, { label: 'codex:fable', phase: 'Codex', model: 'fable', effort: 'xhigh' }),
])
const arms = [xF, xO].filter(Boolean)
if (!arms.length) throw new Error('both codex arms died — marks are in the journal')
const codex = arms.length === 1 ? arms[0] : await agent(`${CANON}

TRI-FOLD ADJUDICATOR — two independent codices from the same marks. Agglomerate with sagacity and
INCREDULITY: where they disagree on a measured behavior, re-read the cited frames yourself and RULE;
never average; losers to §REJECTED with falsifiers. Emit the final EXEMPLARS-CODEX.md body.

===== FABLE =====
${xF}

===== OPUS =====
${xO}`, { label: 'codex:apotheosis', phase: 'Codex', model: 'fable', effort: 'xhigh' })

return { codex }
