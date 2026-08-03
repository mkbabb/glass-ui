# HandMark public mark-plane formation receipt C1

Status: **formation-only; existing-owner binding; producer surface RED; choreography conflict RED; no product, test, gate, package, consumer, browser, repin, or acceptance credit**  
Cut: 2026-07-22 America/New_York

## Disposition

The SCI/Atlas ask is **partly accepted and does not mint a row**.

- The proven producer shortfall is one documented public hook for the **existing HandMark SVG mark
  plane**. Bind its emitter and DOM contract to **row 61, `GF-HANDMARK W2 THE-SURFACE`**.
- Whether that plane may be driven bidirectionally by scroll is already owned by **row 62,
  `GF-HANDMARK W3 THE-CHOREOGRAPHY`**. It is not settled by this receipt: the current authoritative
  charter says a mark is fire-and-forget, replay is not a scrub, and exit is not reverse-undraw.
- Immutable package adoption and removal of the exact private selectors belong to **row 64,
  `GF-HANDMARK W5 CONSUMER+FINAL`**.

Therefore: **public mark plane ACCEPT; generalized progress/scroll-clock primitive REJECT for now;
second renderer REJECT; new row REJECT.** W3 must explicitly reconcile the Atlas bidirectional-scroll
policy before W5 may claim it as an idiomatic public use.

## Frozen evidence

| Evidence | Identity |
| --- | --- |
| inbound C8 redress | `5a251fd387567380d3b56f1b75539f341afde0f9a0dcb9a24091d3f36c4db61a` |
| Glass source HEAD | `0371836dfeeb3b7982250d612f93b5347a1d29d4` (dirty overall; HandMark files below clean) |
| `src/components/handmark/HandMark.vue` | `f2752bf695fc9dc7b997dadb4d4c6718fddddb36e289a8bec293a793354c7bc9` |
| `src/components/handmark/index.ts` | `b44d66eb4a0eb43a7c566cb668515d488a271c77b6ce53d012c6ef985354c4ea` |
| `src/components/handmark/types.ts` | `4c00fa099e8ea204a9dafe0961363ff6cf814bbdd32f8b0738575a2bbcec6213` |
| `src/components/handmark/composables/useHandMark.ts` | `a70f9de318600ebe4b8141722cd8a8a25217f934f25439a79dc6f1fa41fc0c80` |
| Glass 93-row inventory | `73c7ec3bf0ce6d975d68ee1777e41ddae53ebd80ecbdecbfe81f2207bca2aa14` |
| current GF-HANDMARK charter | `c8379cad59617edc41ee8e9b9f72e93a61ed47f89cf94caee774b6decc1d0cc4` |
| Atlas HEAD | `6dd96b919a8716af02fc15c591348ec92e88eee8` |
| Atlas `charts/glyph/HandMark.vue` | `41bcb41f38c72395d1934650d9c18d9604aa78ed403b6fbcba3881bd31e85709` |
| Atlas `charts/scene/PaperCallout.vue` | `6bd149dc5e818b5a7436b256611e19ffd9c553491d21d4222c3587bb95db52cb` |
| Atlas `editorial/AnimatedRule.vue` | `e534bad399d7744e18330d5df15fef2a56aa384e50f730c9548e1331ccc7771f` |
| Atlas lockfile | `965612e0a15b40eb4bf1468eea6cbc6b7196e00ca11e093c51d21bb154103997` |
| Atlas-installed Glass `package.json` | `93f294e1ab76cec069b5177abdef13a76a5c5e82556fae691ac1912c75aaa1bb` |
| Atlas-installed `dist/handmark.js` | `ecfcb6bb05f02989eede2a199ce7fdd18d38788649ddd6d68ae86a5be9886e1a` |
| Atlas-installed `dist/components/handmark/HandMark.vue.d.ts` | `c2fd353790d29491315ebfd0d0e6d9351afef5b8c9d705c1e4c27985b0406deb` |

The Atlas lock resolves registry `@mkbabb/glass-ui@7.0.0` with integrity
`sha512-iK2DaPNbnEOkcI6deSyYZ1mCbDyHCY+IGFeKtsKb800WzApX0uL/Pq6FA9EomqCcBWWDrPSa7iydk7kg9sH2ww==`.
This is an exact installed artifact witness, not acceptance of mutable Glass source or a future cut.

## Source, export and package truth

1. `HandMark.vue:122-141` exposes only `play()`.
2. `HandMark.vue:266-304` emits one decorative, non-focusable SVG with private class `.hm__svg` and
   private paths `.hm__path`; it emits no documented public mark-plane identifier.
3. `index.ts:59-66` exports the headless `useHandMark` core and its `BoilClock`, but consuming that core
   to rebuild the SFC would create the second renderer this coordination explicitly forbids.
4. `package.json:384-387` exports `./handmark` through `dist/handmark.{js,d.ts}`.
5. The installed component declaration exposes `play()` only. It has no typed progress/clock surface;
   the installed runtime contains `.hm__svg` but no public part marker.

Thus the installed package can render the one correct SVG, and it can replay a one-shot gesture, but
it cannot let an external composition address the mark plane without depending on a private class.

## Exact receiver mechanism

The high-confidence active Atlas floor is seven private HandMark reaches in three files:

- `charts/glyph/HandMark.vue:321,332,357,373` reaches `.hm__svg` for recession opacity, measured
  strip seating, a `view()` timeline, and a normalized clip writer;
- `charts/scene/PaperCallout.vue:185-194` reaches `.hm` and `.hm__svg` to fit the one shipped mark into
  the solver-allocated leader-line box; and
- `editorial/AnimatedRule.vue:185-191` reaches `.hm__svg` to attach the bidirectional view timeline.

These receivers do **not** author a second SVG or morphology engine. The Atlas glyph wrapper imports
`HandMark` from `@mkbabb/glass-ui/handmark`, and PaperCallout delegates its path to that wrapper. The
defect is contract reach-through, not renderer duplication. A separate
`charts/marks/mark-scroll-scrub.css` private reach exists in source but is not promoted to the active
floor by C8 and receives no live-consumer credit here.

## Smallest lawful producer contract

W2 must expose exactly one documented **mark-plane part** on the existing decorative SVG. The literal
attribute spelling is frozen by W0/W2 implementation, but its semantic identity is
`handmark.mark-plane` and it must satisfy all of these constraints:

- exactly one marked element per HandMark instance, and that element is the existing `<svg>`;
- stable across pen/band/ring, static/draw, theme, PRM, and responsive states;
- remains `aria-hidden`, non-focusable and `pointer-events:none`;
- permits only box seating, mark-only opacity, and an owner-authorized reveal attachment;
- does not expose path/filter/defs internals or authorize consumer brush, grain, morphology, easing,
  or layer re-authoring; and
- introduces no renderer, composable, general parts framework, or new top-level primitive.

The existing root `class` fallthrough is sufficient for host-box sizing; no second root part is
currently justified. A public part also preserves the formed five-prop surface and `play()` API.

W3 must separately adjudicate the behavioral conflict. The current charter says `play()` is
fire-and-forget and “never a scrub,” with an opacity-led exit rather than reverse-undraw. Atlas's
`view()` timelines are bidirectional wipes. This receipt does not silently overturn that law and does
not authorize a generic `progress`, `clock`, or scroll-director prop. If W3 later admits a scroll arm,
one producer-owned direction/terminal/PRM contract must replace the receiver-defined clock behavior;
it may not coexist as a second animation authority.

## Born-RED package-consumer proof

The current immutable installed 7.0.0 artifact is the negative fixture.

| arm | detector and required result | current 7.0.0 result |
| --- | --- | --- |
| P1 package surface | pack/install an isolated fixture, import only `@mkbabb/glass-ui/handmark`, mount HandMark, query the documented `handmark.mark-plane` hook | **RED:** no public marker exists |
| P2 cardinality/topology | assert exactly one public mark plane, it is the emitted SVG, and the component still emits one renderer | **RED:** zero public planes |
| P3 consumer clean edge | migrate the three named Atlas receivers to the public hook; grep the installed-consumer source for `.hm`, `.hm__svg`, `.hm__path` and HandMark filter/defs reaches | **RED:** seven active private reaches remain |
| P4 mutation | remove, rename, duplicate, or move the public marker from SVG to path/filter; the isolated package fixture and actual receiver test both fail | **owed** |
| P5 no-fork | assert receiver source contains no authored HandMark SVG/path generator and runtime contains one Glass-owned SVG per instance | current renderer count is structurally compatible; immutable post-cut proof owed |
| P6 choreography | after W3 ruling, prove allowed one-shot or scroll behavior, interruption, terminal state and PRM on the actual receiver without a second writer | **RED/held:** policy conflict unresolved |
| P7 identity | exact source → build → pack → install → served hashes match before any receiver/browser credit | **owed** |

P1-P5 are the born-RED surface/consumer unit. P6 cannot turn green merely because a public selector
exists. Later browser proof must cover the real PaperCallout, AnimatedRule and narrative HandMark at
desktop/mobile, light/dark, normal/PRM, interruption and actual Safari/VoiceOver; this formation receipt
claims none of it.

## Boundary

No Glass, Atlas or SCI product/test/gate/package/lock file changes follow from this receipt. Metric and
StatusDot selector cleanup, YearScrubber's unsupported Button variant, and conditional GlassDock
layer reaches remain outside this HandMark producer edge exactly as C8 directs.
