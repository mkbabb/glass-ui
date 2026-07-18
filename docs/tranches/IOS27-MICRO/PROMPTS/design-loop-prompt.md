# Design and iteration: the convergent multiagent design loop

Resolve the stated design problem completely: a specification and wave set at 100% convergence
that survives adversarial audit. We seek TRULY novel, elegant, greenfield approaches, developed
in a highly multi-dimensional, multiagent, iterative manner. Track partial progress throughout;
it counts toward the resolution only when it implies exactly the resolution.

## Round zero: the portfolio

Before the first pass, a Fable agent mints the approach portfolio; and for design, leverages the
frontend design plugin exactly: genuinely orthogonal formulations of the problem. Different
architectural centers, different substrates, different decompositions. Reject rewordings of one
idea posing as several. Fable generates these orthogonal approaches and owns ALL orchestration
logic; implementation is delegated to Opus for workflow fanout, and every spawn declares its
model explicitly. Maintain an explicit registry of approach families, grouped by the design idea
in use; two routes that share a mechanism share a family.

## The pass

Deploy each pass as its own workflow; dissect and synthesize upon each pass. A pass consists of
the following, done sequentially in an iterative loop:

1. RESEARCH. Deploy up to 8 agents in parallel (batched 5-6 concurrent against the rate wall)
   across the web, the extant codebase, the tranches hitherto, and the sibling constellation.
   Early-round researchers receive the task statement and their family charter alone; the
   currently favored approach stays withheld.
2. SYNTHESIZE. One agent distills the results into a cogent specification and plan: one spec per
   family while routes remain incompatible.
3. PROTOTYPE. A fleet greenfield-brainstorms and test-implements against the begotten
   specification, sometimes with concrete implementation, sometimes with prototype-augmented
   specification. A prototype either runs or is marked spec-only.
4. CRITIQUE. An adversarial fleet hardens, challenges, and refines each begotten item against
   the failure-mode checklist: vacuous convergence, spec-cites-itself circularity, gates that
   cannot fail, the elegant-reduction trap (a spec whose load-bearing step reads "and then the
   hard part" remains unconverged), legacy aliases, masked fallbacks, unverified gestalt,
   consumer-less substrate. Each hardened item returns a percentage of convergence alongside a
   critical analysis enumerating the exact open gaps.
5. AGGLOMERATE. A final synthesizing agent folds the pass into the registry, advancing, banking,
   blocking, or retiring each route, and begins the loop again with the newfound contextual
   information.

## Model routing and concurrency

The core model (Fable) owns orchestration, synthesis, adjudication, and every cognitively
complex call; ALL design routes through Fable and the frontend design plugin (DesignSync). Opus
to take the workflow fanout and the mechanical sweeps, and every fanout spawn declares its model
explicitly rather than inheriting the session's. Dispatch in batches of 5-6 concurrent agents to
stay under the rate wall. Use Fable judiciously for all problems of complexity, novelty, and
creativity. Opus for implementation only.

## Portfolio management

- Keep several incompatible routes alive through multiple passes. Cross-pollinate only after
  independent agents have developed each far enough to expose its real strengths and gaps.
- Elegance of the specification earns a route nothing on its own. A route that stalls at a
  missing primitive equal in difficulty to the original problem is BLOCKED: mark it, and assign
  further agents only when someone proposes a materially new mechanism, invariant, or
  construction.
- When many agents converge to one family, redirect some toward underexplored formulations.
- Require concrete artifacts: running prototypes, probes, measured numbers, named
  counterexamples to proposed designs. Reject status reports and vague optimism.
- The root agent repeatedly synthesizes, challenges, redirects, and launches new passes. A
  stalled pass demands a fresh formulation, and blocked families reopen only upon a genuinely
  new mechanism.

## Convergence

Convergence is earned. 100% means zero enumerated open gaps, survival of a fresh adversarial
audit by agents who did not author the winning spec, and two consecutive clean passes. Whereupon
100% convergence: stop, and develop out that exact tranche plan and wave set(s) to implement,
refine, and align, with born-RED gates, π obligations, and a disposition for every banked route.

## Floors and fences

- Run at least three full passes before contemplating convergence.
- Web research supplies background, prior art, and the state of the art; the design verdict
  comes from the codebase, the prototypes, and the critiques.
- Every design decision and every cognitively complex judgment routes through Fable and the
  frontend design plugin; every mechanical sweep routes to Opus
- Return the converged plan surviving audit. Failing that, return the strongest rigorously
  converged core and its exact remaining gap. A best-effort summary, or an explanation of why
  the problem is difficult, is an unacceptable return.
