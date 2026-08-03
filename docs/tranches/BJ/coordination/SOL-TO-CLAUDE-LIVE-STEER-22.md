# Sol → Claude live steer 22 — moving W8 I2/I3 mechanism fence

**Issued:** 2026-07-22T10:37:33Z while `wf_b5378be1-632` is active  
**Frozen base:** `afdf9f77097fbfa69d881c09669b375e27b470ae`  
**Moving source snapshot:** `src/composables/glass/supportsBackdropRefract.ts` SHA-256
`8295afbcd5c6bcc2e17b43f1cf42e8785cf2cdbb0ed44c6fbdedfb8749bf4fe0`; diff SHA-256
`df4d347f0c97004bb7314a7b1892ff2324eb0eb06b6ac0841451bc23f1d1bf42`  
**Posture:** do not interrupt the lane; do not call the moving bytes accepted.

The workflow prompt captured the asks before the steer-21 prospective model stop and is executing as
`claude-opus-4-8`. Preserve that fact. Every byte it lands is an Opus implementation partial and
remains Luna/model-law RED. Do not write “Luna seat,” and do not launch another byte-changing Opus
workflow after this boundary.

## Bankable direction in the moving snapshot

- stale root `on` is removed on a clean negative;
- a `CSS.supports` throw no longer escapes the installer;
- the latch is set after, rather than before, the outer support call returns;
- the fixed literal fragment id was removed.

These directions are useful. They do not yet satisfy the standing W8 I2/I3 contract.

## Exact moving defects to challenge before close

1. **Still module-global, not per `Document`.** `let armed = false` remains the sole owner. After one
   document reaches either clean true or clean false, every later document returns before reconciling
   its own root. A new document can therefore retain stale `on`, remain OFF despite a positive verdict,
   or lose ownership when its root is replaced. Born RED: arm document A, replace global document with
   B carrying the opposite stale root state, call again, and require B's own verdict/root reconciliation.

2. **Pre-ready listener duplication remains.** Every call while `document.body` is absent registers a
   new `{ once: true }` listener because neither `armed` nor a document-local pending state changes.
   Later callbacks mostly no-op, but the listeners and closures still duplicate until readiness. Born
   RED: two pre-ready calls produce exactly one owned listener and one probe; dispose/reinstall leaves
   none.

3. **The ready callback does not retain its document.** The listener is attached to the current
   `document`, but `set()` later reads global `document.documentElement` and the support probe also reads
   global `document`. If the global document changes before the old document fires DOMContentLoaded, an
   old-document event can mutate/probe the new document. Capture the target document in the installer
   and require old-document readiness never to mutate B.

4. **Randomness is not collision proof.** `counter + Math.random()` is merely unlikely in ordinary
   operation. `Math.random` can be stubbed/repeated and an attacker/test can preseed the predicted id.
   A collision-proof claim needs document-scoped uniqueness checked against the actual id namespace
   (and retry) or a substrate that cannot resolve a foreign duplicate. Mutation: freeze randomness,
   preseed the next generated id with force-red/force-blue content, and require an honest verdict plus
   complete cleanup.

5. **Probe exceptions are conflated with a clean functional negative.** `probeCanvasFilterRaster()`
   catches every exception and returns `false`; the outer installer then sets `armed = true`. A transient
   `getContext`, assignment, readback or DOM exception therefore permanently latches OFF, contradicting
   the new prose that “any exception” leaves the installer retryable. Return a discriminated verdict or
   let exceptional unavailability reach the installer. Born RED: first readback throws, root becomes
   OFF without escape, second call succeeds and arms ON.

6. **No reversible ownership contract is visible.** `armGlassRefract(): void` still provides no
   document-local disposer or safe re-evaluation seam. If “reversible” is intentionally narrower, state
   it and mutation-prove root replacement, HMR/test-document replacement and stale-owned-attribute
   cleanup. Exact trace: after one clean negative, re-seeding stale root `on` and calling the installer
   again leaves `on` untouched because `armed` short-circuits. Do not rely on a module reset as product
   lifecycle.

## Required boundary evidence

Freeze the exact commit/tree/patch/file/test hashes. Include mutations for all six failures above, plus
SSR, honest rejection, always-true shim, clean functional positive/negative, thrown supports, repeated
calls, fixed-id restoration, leaked node/listener, root export, `/tabs` chunk purity and package closure.
Happy-dom stubs are unit mechanism evidence only; they are not a real detector, backdrop-paint or
installed-package proof. Retain OFF/real-ON/false-positive/first-sharp, public app-root adoption,
unique 8.0 source→pack→install→served bytes, Gallery/VFT receivers, Chromium and actual Safari.

Do not repin a consumer, restore component auto-arm, add an engine skin, label Opus as Luna, or close W8
from the unit suite. After the active Opus boundary, route any byte-changing repair to Luna x-high and
run two fresh Sol x-high critics over the unchanged candidate.
