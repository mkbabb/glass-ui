export const meta = {
  name: 'bk-parent-components',
  description: 'Parent: spawns a per-component apotheosis workflow for each component in the tier, then folds the specs',
  phases: [
    { title: 'Components', detail: 'one nested workflow per component (3 challengers + 3 jurors + foreman)' },
    { title: 'Band fold', detail: 'cross-component reconciliation into a band spec' },
  ],
}

const SP = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/wf'

// Owner-marked defects per component, so each fleet inherits the exact exhortation it must answer.
const TIER = args && args.tier ? args.tier : []

phase('Components')

log(`spawning ${TIER.length} nested per-component workflows`)

const specs = await pipeline(
  TIER,
  (c) => workflow({ scriptPath: `${SP}/component-apotheosis.wf.js` }, c)
    .then(r => ({ component: c.component, spec: r && r.spec, ok: !!(r && r.spec) }))
    .catch(e => ({ component: c.component, spec: null, ok: false, error: String(e).slice(0, 200) })),
)

phase('Band fold')

const ok = specs.filter(s => s && s.ok)
const failed = specs.filter(s => !s || !s.ok)
if (failed.length) log(`WARNING: ${failed.length} component workflows returned no spec: ${failed.map(f => f && f.component).join(', ')}`)

const fold = await agent(`You are the band-fold seat for the glass-ui refinement at
/Users/mkbabb/Programming/glass-ui.

${ok.length} per-component triumvirates have each emitted a terminal wave spec. Here they are:

${ok.map(s => `\n===== ${s.component} =====\n${s.spec}`).join('\n')}

${failed.length ? `\nNOTE: these component workflows produced no spec and must be reported as a coverage gap, not silently dropped: ${failed.map(f => f && f.component).join(', ')}` : ''}

Produce the BAND RECONCILIATION. Independent per-component juries cannot see each other, so your job is
the cross-cutting truth they each missed:

1. **COLLISIONS.** Where two specs claim the same file, the same token, the same selector, or the same
   shared primitive — and would conflict if executed independently. Name each collision and rule it: which
   spec owns the file, and what the other must consume instead. One owning wave per file per cut.

2. **DUPLICATED REMEDIES.** Where N specs independently invent the same fix (a shared track primitive, a
   shared overlay entry, a shared engagement rung). Promote it once into a named SHARED PRIMITIVE with a
   3-line API and a consumer list, and strike the N copies.

3. **CONTRADICTIONS.** Where two juries reached incompatible dispositions (A folds into B while B folds
   into A; A is deleted while B depends on it). Rule each explicitly.

4. **THE DEPENDENCY ORDER.** What must land first for everything after it to be cheap. Give a strict order
   with the reason for each edge — not a wish-list, a topological order.

5. **THE GATE BUDGET.** Sum every born-RED gate every spec proposes. The owner's mandate is 40-60 invariant
   gates for the WHOLE library. If the sum exceeds the share this band can spend, cut to the invariants that
   guard real product behaviour and say which you cut and why. A gate that restates a token value is not an
   invariant.

6. **THE LOC LEDGER.** Sum the expected LOC deltas. State the band's net effect on the 58,549-line component
   tree. If the band grows the tree, justify it or re-cut it.

7. **WHAT NO JURY OWNED.** Anything visible in the evidence that no component spec claimed. These are the
   silent drops, and they are forbidden — assign each an owner.

Return thorough markdown. Include your exact modelId. Be decisive; the standing order is no deferrals.`,
  { model: 'opus', label: 'BAND:fold', phase: 'Band fold' })

return { specs, fold, coverage: { requested: TIER.length, returned: ok.length, failed: failed.map(f => f && f.component) } }
