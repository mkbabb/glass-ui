# W8 Luna per-Document state-machine design C3

Date: 2026-07-22  
Existing owner: MATERIAL W8 `BJ.W-REFRACT-LATCH` / `R-SHIPPED-MATERIAL`  
Disposition: **normative Luna implementation packet; source, package, browser and consumer acceptance remain RED**

## Frozen boundary

Bank only commit `b5e7015524b750c63f683dcbc59a9c516c1e9da3`'s removal of the rejected
`SegmentedTabs.onMounted(armGlassRefract)` component side effect and its local `/tabs` closure. The current
working-tree installer and test remain uncommitted discovery:

| moving input | state | SHA-256 |
| --- | --- | --- |
| `src/composables/glass/supportsBackdropRefract.ts` | modified | `8295afbcd5c6bcc2e17b43f1cf42e8785cf2cdbb0ed44c6fbdedfb8749bf4fe0` |
| `tests/composables/glass/supportsBackdropRefract.test.ts` | untracked | `a0cb6d2691f0a98711f6bbbdb9f62d445e58685a421fbab74f2e9518d4936759` |

Binding reconciliation is `W8-5A8-OPUS-NEEDS-LUNA-RECONCILIATION-C2.md`
(`6ca5a20fc4ccbaf42ce20d7864d583b18c525e6543243e0e40088b365682eb40`). The draft is RED because it
uses one module-global `armed`, ambient `document`/`CSS`, random probe IDs, a body-readiness listener,
terminal false caching that cannot distinguish transient failure, and no disposer or root-replacement law.

## Selected KISS API

```ts
export function supportsBackdropRefract(target?: Document): boolean;
export function armGlassRefract(target?: Document): () => void;
```

With no argument, each function uses the ambient document when it exists. With an argument, **all** DOM,
CSS and window reads come from that exact Document: `target.documentElement`, `target.body`,
`target.defaultView?.CSS`, and nodes created by `target`. No ambient fallback may leak into an explicit
target. SSR/no Document returns `false` or a stable no-op disposer without mutation.

The optional argument preserves ordinary zero-argument app bootstrap while permitting exact multi-Document
tests. The disposer is the public reversible lifetime boundary. This is an 8.0 candidate contract and must
be ledgered as such; the existing `void` declaration is not silently retained in packed types.

## Per-Document state

Use one module-local `WeakMap<Document, State>`. No global boolean, module-global root, global counter,
DOMContentLoaded listener, MutationObserver or timer is allowed.

The state is discriminated, not two independent booleans:

```text
probing | supported | unsupported | retryable | disposed
```

It retains only the exact Document, one stable disposer, the connected owned SVG while probing and the
last reconciled root. The root attribute is Glass-owned; cleanup never depends on a separate writer bit.

`supportsBackdropRefract(target)` is an always-fresh, root-pure probe. It creates or caches no installer
`State`, never changes the root latch and shares no sequence with the installer. `armGlassRefract(target)`
uses the same internal probe result but owns the only WeakMap lifecycle.

### Verdicts

The internal detector returns a discriminated verdict:

- `supported`: honest parse claims plus the exact validated red raster signature;
- `unsupported`: honest parse rejection, always-true shim, the exact validated blue raster signature, or a
  browsing-context window with no callable `CSS.supports`;
- `retryable`: absent `defaultView`, null canvas context, transparent/mixed/unexpected pixels, a thrown
  platform read, transient DOM/probe mount/readback failure, or another state that cannot honestly become a
  permanent negative; and
- `ssr`: no target Document, with no state installed.

The public `supportsBackdropRefract()` maps only `supported` to `true`; every other verdict is `false` and
never throws. `armGlassRefract()` caches terminal supported/unsupported per Document. `retryable` is not a
cached terminal: the next arm reruns and may transition to either terminal verdict. Reentrant calls during
`probing` return the same disposer and do not start a second probe.

## No readiness listener

The functional probe already mounts into `target.body ?? target.documentElement`. A normal head-time HTML
bootstrap therefore has a mount before `body`; delaying to `DOMContentLoaded` creates duplicate-listener,
cross-Document and disposal races without adding a required capability. Remove the body gate and all
readiness listeners.

If a synthetic Document has neither mount, return `retryable`, strip a stale Glass latch if a root exists,
and let the explicit next call retry. The product/browser matrix must include a real head-time script before
`body` in Chromium and Safari; unit mocks alone do not establish this law.

## Collision-proof functional probe

The probe is synchronous and Document-scoped:

1. start a probe-local integer candidate at zero;
2. derive `gl-refract-probe-<candidate>` without randomness;
3. require `target.getElementById(id) === null`; on collision, increment and continue over the finite live
   descendant set—historical uniqueness is unnecessary;
4. create SVG/filter/canvas nodes from `target` only;
5. mount the SVG into `target.body ?? target.documentElement`;
6. require `target.getElementById(id) === the exact owned filter` after mount;
7. set `ctx.filter` to that exact fragment and read the bounded pixel;
8. remove the owned SVG in `finally`; and
9. return `retryable` on an exception or other ambiguous failure, never a guessed terminal value.

The DOM Standard defines `Document.getElementById()` as returning the first matching descendant in tree
order, so selecting an unused ID and verifying exact object identity after connection is the required
foreign-node fence. Random suffixes are neither necessary nor proof of collision safety.

Primary references:

- <https://dom.spec.whatwg.org/#dom-nonelementparentnode-getelementbyid>
- <https://html.spec.whatwg.org/multipage/canvas.html#the-canvas-element>

## Root reconciliation and disposal

`data-glass-refract` is a Glass-owned root latch. Every call reconciles terminal state against the **current**
`target.documentElement`:

- first, if the remembered root differs from the current root, unconditionally remove `on` from the
  remembered root and remember the current root;
- supported: set `on` on the current root;
- unsupported: unconditionally remove stale `on` from the current root;
- retryable/throw: unconditionally remove stale `on` from the current root, keep the state retryable and
  retain no probe reference;
- disposed: create a new state only on a later explicit arm call.

Repeated calls for the same Document return the exact same disposer while the state is live. The disposer
is idempotent: unconditionally remove the Glass latch from the remembered and current roots, remove the
connected owned SVG and any retained probe reference, delete the WeakMap entry and mark that state
disposed. It installs no listener to detach.

A reentrant arm may receive and invoke the stable disposer from a patched platform method before the outer
synchronous probe returns. Before the outer call caches a verdict or touches a root, it must prove both
`state.phase !== 'disposed'` and `states.get(target) === state`. The probe `finally` cleanup still runs. A
disposed inner call can never be resurrected by the outer call.

Root replacement is reconciled on a repeated `armGlassRefract(target)` call and on disposal; no observer is
added. There is one canonical installer owner per Document, not one lease per framework root. The explicit
repeated-call/disposer law makes replacement testable and reversible. App roots retain the disposer for
HMR:

```ts
const disposeGlassRefract = armGlassRefract(document);
import.meta.hot?.dispose(disposeGlassRefract);
```

Dispose-old-module → import-new-module → reinstall must perform one fresh probe and leave one current latch.

## Born-RED state-machine matrix

Each mutation is isolated against exact source/build bytes and must fail with its named diagnostic.

| id | mutation | required failure |
| --- | --- | --- |
| S1 | restore module-global `armed` | two-Document isolation |
| S2 | use ambient `document` for an explicit target | foreign-Document mutation |
| S3 | use ambient `CSS` instead of `target.defaultView.CSS` | realm isolation |
| S4 | restore fixed probe ID | preseed collision |
| S5 | restore random ID without pre/post identity verification | deterministic collision law |
| S6 | accept the first colliding ID | foreign-filter steering |
| S7 | omit exact `getElementById(id) === ownedFilter` post-mount check | duplicate/foreign identity |
| S8 | leak the connected owned SVG or retain probe references on success/throw | probe cleanup |
| S9 | cache a thrown/transient failure as unsupported | retry-after-throw |
| S10 | mark terminal before the probe completes | reentrant/half-arm |
| S11 | leave stale `on` after honest rejection or validated blue signature | fail-closed root reconciliation |
| S12 | leave stale `on` after throw/retryable | retryable fail-closed reconciliation |
| S13 | restore `document.body` readiness gate | real head-time pre-body arm |
| S14 | restore one DOMContentLoaded listener | zero-listener contract |
| S15 | register two pre-ready listeners | duplicate listener contract |
| S16 | suppress a second Document after the first arms | per-Document state |
| S17 | return a fresh disposer per repeated call | disposer identity |
| S18 | disposer leaves root attr or probe behind | reversible cleanup |
| S19 | replace `documentElement` and keep latch only on the old root | root replacement |
| S20 | delete explicit root installer adoption while component remains side-effect-free | consumer bootstrap arm |
| S21 | reintroduce `SegmentedTabs.onMounted(armGlassRefract)` | chunk purity/root ownership |
| S22 | cache an ambiguous/transparent/mixed pixel as unsupported | retryable pixel-verdict law |
| S23 | leave the old root armed during retryable replacement | unconditional root reconciliation |
| S24 | omit WeakMap deletion, then arm after disposal | fresh post-dispose probe |
| S25 | let `supportsBackdropRefract()` create state, cache or change the root | root-pure detector |
| S26 | reenter from `getContext`, dispose, then let the outer probe arm | no post-dispose resurrection |
| S27 | reseed stale `on` after a negative and suppress repeated reconciliation | repeated fail-closed arm |
| S28 | omit HMR disposal/reimport/reinstall | one fresh post-HMR probe |
| S29 | omit or stale the package root export | package-root contract |
| S30 | let `/tabs` recursively depend on an installer/probe chunk | recursive chunk-purity contract |
| S31 | diverge source, tarball, installed or served bytes | immutable package identity |
| S32 | omit any frozen first-party root adoption | consumer bootstrap completeness |

Also retain the detector honesty arms: absent APIs, honest rejection, always-true shim, functional red,
functional blue, canvas/context/readback failure, stale-on repetition, no-pointer/SSR, and packed declaration
shape. The old test's ambient `dist` declaration read is invalid unless a fresh explicit build fixture owns
that path.

## Browser and package acceptance

After the Luna source/state-machine gate is GREEN:

1. prove zero readiness listeners and one synchronous owned probe from a script executing in `<head>` before
   `body` in Chromium and actual Safari;
2. prove two same-origin Documents/iframes arm independently, dispose independently and survive root
   replacement without cross-mutation;
3. run OFF, real-functional-ON and forced-false-positive paint arms on the shipped Glass lens;
4. prove the first rendered frame is never sharper than the blur-only floor;
5. retain CSS-only consumption as explicitly blur-only;
6. build/pack/install one unique immutable 8.0 artifact and verify source→pack→install→served equality;
7. confirm the package root exports the installer while the recursive `/tabs` chunk closure contains no
   detector/installer/probe dependency;
8. adopt and exact-lock one canonical Document-root call, in order, in the Glass demo, value.js, keyframes,
   Atlas and SCI—including the SCI pill receiver—with HMR disposal where applicable;
9. then run Gallery/VFT OFF/real-ON/false-positive/first-sharp receiver proof; and
10. obtain two fresh unchanged-byte Sol x-high critics, including actual Safari/VoiceOver.

Playwright WebKit is useful mutation coverage but is not actual Safari acceptance.

## Boundary

No component auto-arm, consumer shim, timer, global latch, body-readiness listener, random collision claim,
mutable 7.0 package, source substitution, root repin or acceptance credit follows from this design. Luna
x-high owns the bounded producer state-machine cut; Q/Atlas root adoption remains strictly post-cut.
