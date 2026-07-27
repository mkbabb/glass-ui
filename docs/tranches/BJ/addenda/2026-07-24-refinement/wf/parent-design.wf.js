export const meta = {
  name: 'bk-parent-design',
  description: 'Parent orchestrator: spawns the exemplar-motion and component-DAG sub-workflows, then folds them',
  phases: [
    { title: 'Sub-workflows', detail: 'exemplar frame canon + component DAG reduction, run as nested workflows' },
    { title: 'Fold', detail: 'Fable cross-fold of motion canon against the reduced component set' },
  ],
}

const SP = '/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/wf'

phase('Sub-workflows')

log('spawning nested workflows: exemplar-frames + component-dag')

const [exemplar, dag] = await parallel([
  () => workflow({ scriptPath: `${SP}/exemplar-frames.wf.js` }),
  () => workflow({ scriptPath: `${SP}/component-dag.wf.js` }),
])

phase('Fold')

const fold = await agent(`You are the Fable cross-fold seat for the glass-ui library at
/Users/mkbabb/Programming/glass-ui.

Two independent nested workflows just completed.

=== A. THE MOTION CANON (from frame-by-frame analysis of Apple Music, ChatGPT, Gemini, Siri, the Photos
context-menu popover, and the iOS 27 archive) ===
${exemplar ? JSON.stringify(exemplar.canon || exemplar, null, 2).slice(0, 120000) : 'FAILED — report this as a gap'}

=== B. THE COMPONENT REDUCTION (deterministic DAG + Fable isomorphism inference + two adversarial critics
+ judge) ===
${dag ? String(dag.judge || JSON.stringify(dag)).slice(0, 120000) : 'FAILED — report this as a gap'}

Your job is the CROSS-FOLD — the thing neither workflow could see alone:

1. COLLISION CHECK. The motion canon demands primitives (dock fission, gradient-blur focus, the engagement
   ladder, the dissolve, shared-element expansion). The reduction deletes and folds components. Find every
   place where the reduction removes something the canon needs, or where the canon specifies motion for a
   component the reduction retires. Rule each collision explicitly.

2. THE SURVIVING SET, MOTION-COMPLETE. Emit the post-reduction component roster, and for each survivor state
   which rung of the engagement ladder it must implement and which motion spec governs it. A survivor with
   no engagement rung violates the BREATH OF LIFE edict and must be either given one or deleted — say which.

3. THE PRIMITIVE LAYER. The folds create shared primitives; the canon demands motion primitives. Unify them
   into ONE list. For each: name, 3-line API, consumers, the token(s) it owns, and its WebKit verdict.
   This list is the real deliverable — it is what the next tranche builds first.

4. THE DOCK. The owner has ruled: "The dock API likely is fully contrived and should be replaced." The
   canon has the Music dock's double-dock → collapse → fission choreography; the reduction has an 8046-LOC,
   45-file, 19-prop component. Specify the REPLACEMENT dock: its primitive decomposition, its public API in
   full, and what it deletes. Be concrete — this is a greenfield with a working reference on video.

5. SEQUENCING. What must be built first for everything else to be cheap. Give the dependency order.

Return thorough markdown with your exact modelId. Be decisive; the owner's standing order is no deferrals.`,
  { model: 'fable', label: 'FOLD:cross', phase: 'Fold' })

return { exemplar, dag, fold }
