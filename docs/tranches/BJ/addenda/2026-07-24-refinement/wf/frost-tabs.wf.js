export const meta = {
  name: 'frost-tabs-slider-reaudit',
  description: 'Re-audit the tabs toggle (f1 good · f4 trite/shiny/bright · f5 poor) + slider frost; the no-chrome-special edict census — tri-fold',
  phases: [
    { title: 'Sweep', detail: 'one live Chrome seat + one static seat', model: 'opus' },
    { title: 'Verdict', detail: 'Fable ∥ Opus → Fable apotheosis', model: 'fable' },
  ],
}

const REF = 'docs/tranches/BJ/addenda/2026-07-24-refinement'
const CANON = `Repo /Users/mkbabb/Programming/glass-ui, tranche BJ→BK, 2026-07-27. State your modelId.
Author no repo byte. Consume FIRST: \`${REF}/EXEC-STATE.md\` (rulings; dev port 5400, build-freshness
law) + \`${REF}/GESTALT.md\` §1 (the frost indictment: 188/305 surfaces compute backdrop-filter none;
authored none on Slider.vue:503-504 and the material.css cell blanket). THE OWNER'S WORDS, the charter:
"the f5 tabs toggle's glass effect is poor, though the f1's glass is good; the f4 tabs are better, but
still far too trite, shiny, and bright—not like blurred and frosted glass. The slider is the same way
therein." · "That ios 27 micro demo's glass is quite good." · "No chrome special behavior for any glass
items." Em dashes without spaces.`

phase('Sweep')
const [live, staticSweep] = await parallel([
  () => agent(`${CANON}

LIVE SEAT — you own the browser (chrome-devtools MCP via ToolSearch; serialize, one page). Dev server:
verify http://localhost:5400 serves THIS repo at current HEAD (build-freshness law) — start it if absent
(npm run demo:serve or the vite equivalent; note the port truth: package.json:506 still says 5199, the
banked correction says 5400 — use whatever port actually serves and RECORD it). Find the tabs variants
the owner names f1/f4/f5 (demo tabs story/configurator variant set — enumerate ALL variants you find and
map which is which) and the slider story, plus the IOS27-MICRO demo surface if it exists in this repo
(the owner: its glass is "quite good" — it is the reference). For each, both color modes at 1440×900:
screenshot at rest + computed styles of every glass layer (backdrop-filter with exact blur/saturate/
brightness values, background layers/gradients, box-shadows incl. specular/inset, border colors+alpha,
text/ink contrast). The question the numbers must answer: WHAT AUTHORED BYTES make f4/f5 read shiny/
trite/bright while f1 and the micro demo read frosted — isolate the exact property deltas between the
good and bad specimens. Facts + captures; no redesign.`,
    { label: 'sweep:live', phase: 'Sweep', model: 'opus', effort: 'high' }),
  () => agent(`${CANON}

STATIC SEAT. (a) Read the tabs + slider style sources end-to-end (components/tabs/**, slider/**, the
glass ladder: styles/glass/*.css, tokens/glass-fx.css) and derive the authored glass recipe per variant —
where do specular/gradient/brightness layers enter, which tokens, which rungs. (b) Read the W-TABS and
slider terminal specs (${REF}/COMPONENT-WAVES-TERMINAL*.md) + the frost quadruple rows (${REF}/
PROPORTION.md §5, GESTALT §1) — do the extant specs already cure the shiny/trite read, or do they
preserve it? Cite spec§. (c) THE NO-CHROME-SPECIAL CENSUS: grep src/ for every UA-conditional or
engine-conditional path that affects glass paint (navigator.userAgent, 'chrome', CSS.supports branches
that fork appearance, -webkit- only paint, @supports arms that give engines DIFFERENT glass rather than
failing loud) — per hit: file:line | what forks | verdict vs the edict (an @supports that fails loud is
legal; one that gives Chrome richer glass is not). Facts only.`,
    { label: 'sweep:static', phase: 'Sweep', model: 'opus', effort: 'high' }),
])

phase('Verdict')
const V = `${CANON}

VERDICT — author the re-audit verdict: §1 THE DIAGNOSIS — the exact authored deltas that make f4/f5
read trite/shiny/bright vs f1/micro-demo frosted (property table, from the live numbers); §2 THE CURE —
amendments routed to the owning waves (W-TABS · the slider wave · W-FROST/#22 · the frost quadruple),
each a token/property delta + born-RED assertion, in OUR language (frosted, warm cream — never shiny);
§3 THE NO-CHROME-SPECIAL EDICT — the census verdicts + the edict stated as a gate-able rule routed to
the roster; §4 what the extant specs already cured vs preserved (cite, so the roster amends not
re-authors). No silent drops of either sweep's rows.

===== LIVE =====
${'${LIVE}'}

===== STATIC =====
${'${STATIC}'}`

const vPrompt = V.replace('${LIVE}', () => live || '(live seat died — verdict from static only, say so)')
  .replace('${STATIC}', () => staticSweep || '(static seat died)')
const [vO, vF] = await parallel([
  () => agent(vPrompt, { label: 'verdict:opus', phase: 'Verdict', model: 'opus', effort: 'xhigh' }),
  () => agent(vPrompt, { label: 'verdict:fable', phase: 'Verdict', model: 'fable', effort: 'xhigh' }),
])
const arms = [vF, vO].filter(Boolean)
if (!arms.length) throw new Error('both verdict arms died — sweeps in journal')
const final = arms.length === 1 ? arms[0] : await agent(`${CANON}

TRI-FOLD ADJUDICATOR — two verdicts, same sweeps. Reproduce contested property claims against the live
seat's numbers (and disk where static); RULE, never average; losers to §REJECTED with falsifiers. Emit
the final FROST-TABS-REAUDIT.md body.

===== FABLE =====
${vF}

===== OPUS =====
${vO}`, { label: 'verdict:apotheosis', phase: 'Verdict', model: 'fable', effort: 'xhigh' })

return { final }
