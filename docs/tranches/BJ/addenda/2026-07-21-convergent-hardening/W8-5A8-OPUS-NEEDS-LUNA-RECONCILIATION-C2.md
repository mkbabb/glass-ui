# W8 `5a8da780` Opus boundary / NEEDS-LUNA reconciliation C2

Date: 2026-07-22  
Existing owner: MATERIAL W8 `BJ.W-REFRACT-LATCH`, asks I-2/I-3/I-5  
Disposition: **bank truthful doc correction; reject product draft as incomplete and wrong-model; W8 remains RED**

## Exact boundary

Committed doc correction:

- `4b5bc369163b8e7001e67d8121802288a94beeca`
- parent `afdf9f77097fbfa69d881c09669b375e27b470ae`
- tree `752b33352f785f6da76d36311a851473c45b66bf`
- one path: `docs/tranches/BJ/waves/BAND-MATERIAL.md`

Receipt-only follow-up:

- `5a8da7800e2a776b9017b72129241ef4384ffa26`
- parent `4b5bc369163b8e7001e67d8121802288a94beeca`
- tree `f27fcff14fcc7d79ab552d6bac8a56b501c14412`
- one path: `docs/tranches/BJ/coordination/CLAUDE-SOL-IMPL-RECEIPTS.md`

The product/test draft remains deliberately uncommitted:

| path | state at boundary | SHA-256 |
| --- | --- | --- |
| `src/composables/glass/supportsBackdropRefract.ts` | modified | `8295afbcd5c6bcc2e17b43f1cf42e8785cf2cdbb0ed44c6fbdedfb8749bf4fe0` |
| `tests/composables/glass/supportsBackdropRefract.test.ts` | untracked | `a0cb6d2691f0a98711f6bbbdb9f62d445e58685a421fbab74f2e9518d4936759` |
| committed `BAND-MATERIAL.md` | tracked | `ee8c287ee83af8dad83fb0e5484de0a7d21e65e71a50729816e36b9829651a38` |
| committed receipt after `5a8` | tracked | `f7cc71f91310af7236a420b371de8663ebd714ecb6fae6682efe38a8d6bb3c86` |

Frozen workflow-seat JSONL identities:

| seat | SHA-256 |
| --- | --- |
| Opus build | `201fe03f936d8c5148388dd79426554f6d555b890fba45fa1e00072a2c66ec38` |
| Opus critic 1 | `13ede00ffbd2a79f68aa7df24be775fb89d614301d07de0380dea96af8693d21` |
| Opus critic 2 | `3f1009411f2a5e3fb671fe873a6a6da26b597b2edeca10c102e0290886f75135` |
| Opus closer | `483602bb0d4f2c4d274fbf455a9c6ec9494457d5200e4db23edda345342cf915` |

## Banked result

The closer correctly honored the current model stop after reading it. It did not stage, commit, revert,
or otherwise take ownership of the product/test draft. It struck the false phrase “Luna x-high seat”
from the earlier `b5e70155` record, preserved the actual Opus attribution, replaced false “CURED” prose
with SOURCE-UNCOMMITTED / NEEDS-LUNA, and kept package, application-root adoption, visual arms,
Safari/VoiceOver and consumer acceptance RED.

The draft itself contains useful mechanical direction: a clean negative removes an initially stale root
attribute; a thrown `CSS.supports` does not escape the installer; the outer latch is set after a clean
verdict; the literal fixed fragment id was removed. These bytes are an input to Luna, not a candidate.

## Independent exact moving-byte falsifiers

An independent Sol x-high critic executed a read-only Node reproducer against the exact moving source.
It obtained:

```json
{"case":"cross-document suppression","docOneAttr":null,"docTwoAttr":"on","docTwoProbes":0}
{"case":"transient probe exception latched false","attrAfterHealthyRetry":null,"healthyProbeCalls":0}
{"case":"post-negative stale on survives repeat","attrAfterRepeatedInstall":"on"}
{"case":"duplicate ready listeners","listeners":2,"listenerRemovals":0,"returns":[null,null]}
{"case":"predictable generated-id collision","predicted":"gl-refract-probe-0-","actualFilter":"url(\"#gl-refract-probe-0-\")","verdict":false}
```

These are mechanism failures, not acceptance-policy niceties.

### 1. The draft remains module-global

`let armed = false` owns every document. A clean verdict in document A suppresses every future call in
document B, so B receives no probe and its stale root state is not reconciled. A listener registered on
an old document also reads the later global `document` when it fires. The contract requires one owned
state machine per target `Document`, not one module-wide boolean.

### 2. Probe exceptions become terminal false verdicts

`probeCanvasFilterRaster()` catches every DOM/canvas/readback exception and returns `false`; the outer
installer treats that as a clean negative and latches `armed = true`. A transient exception therefore
prevents every healthy retry. The new test explicitly asserts only “probe exception → false”; it never
proves retry. Exceptional unavailability needs a discriminated verdict or must reach the installer catch.

### 3. Pre-ready calls still leak duplicate ownership

Two calls without `document.body` register two `{ once: true }` listeners. The unit suite calls this one
effective probe “idempotent” while expressly tolerating “two once-listeners”; it never counts listener
registration/removal and exposes no disposer. Probe count is not listener ownership.

### 4. Randomness is not collision proof

`counter + Math.random()` is merely probabilistic and performs no lookup in the target document's id
namespace. With frozen randomness, a predicted next id can be preseeded and steer the verdict. The test
seeds only the obsolete fixed id and returns a fixed pixel independent of `ctx.filter`, so it cannot
falsify generated-id steering.

### 5. Terminal negative does not preserve root truth

After one clean negative sets `armed = true`, any later stale `on` attribute survives because every call
returns before reconciliation. This falsifies the prose “every terminal state strips a stale on” across
repeated ownership, root replacement and HMR/test-document lifecycle.

### 6. The alleged package arm is local-source/build coupled

The runtime export test imports `@glass/index`, a source alias. The declaration test reads ignored local
`dist` directly even though the ordinary test command has no prebuild. It fails with ENOENT on a clean
checkout and its unchanged type signature cannot witness the runtime cure. Neither is a
source→pack→install→served package arm, and neither mutation-proves `/tabs` closure purity.

## Model and commit discipline

The product/test seat was Opus after the prospective Luna-only stop; its bytes receive zero model-law
credit. The closer's refusal is correct.

Commit `4b5bc369` is body-bearing and stages the intended one-file slice, but its body explicitly says it
was a “doc-only record correction by an Opus closer.” Repository commit discipline forbids AI/tool
authorship in commit messages, so process acceptance remains RED. Commit `5a8da780` changes a 14-line
coordination/status receipt and has no body; it independently fails the body-bearing status-change rule.
Preserve history and record both defects forward.

## Binding Luna continuation

Use the draft as research only. The Luna x-high redress must:

1. accept or capture an explicit target `Document` and use that document's window/CSS/probe DOM;
2. own pending/listener/verdict state per document, coalesce one ready listener and provide proven cleanup;
3. keep honest negative distinct from transient exception and prove a throw-once healthy retry;
4. reconcile repeated stale/root-replacement state or define and prove a reversible owner/disposer;
5. mint deterministic document-unique ids with live namespace collision checking;
6. replace module-reset/void-API-entrenching tests with two-document, old-event/new-document,
   listener-count/removal, transient-retry, post-negative-reseed and actual-generated-id steering arms;
7. separate hermetic unit tests from fresh build/pack/install/served runtime and `/tabs` closure gates;
8. retain no component auto-arm and migrate every first-party app to one public package-root installer;
9. prove OFF, real-ON, false-positive and first-sharp paths in Chromium and actual Safari, then Q's
   Gallery/VFT receivers under one immutable 8.0 artifact;
10. submit two fresh unchanged-byte Sol x-high critics.

No identical relanding of the current draft, module-global contract freeze, probabilistic “collision
proof,” source-alias package credit, consumer shim, mutable 7.0 repin, Opus-as-Luna label or W8 close
follows.
