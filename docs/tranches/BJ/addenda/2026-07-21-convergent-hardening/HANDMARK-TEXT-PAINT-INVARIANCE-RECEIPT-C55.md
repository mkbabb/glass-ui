# HandMark text-paint invariance receipt — C55

Date: 2026-07-22 EDT  
Phase: **Browser formation evidence only**  
Verdict: **TWO ASSAYS REPRODUCE SEMANTIC-TEXT / PAINT DIVERGENCE DURING REPLAY**

## Contract under test

The canonical story promises that HandMark wraps real selectable text while its
SVG mark remains purely decorative. Replaying a draw-on underline must therefore
change only the `aria-hidden` mark plane; the slotted text must remain fully
painted, laid out, selectable, and semantically present at every frame.

Relevant clean committed source at Glass HEAD
`0371836dfeeb3b7982250d612f93b5347a1d29d4`:

| file | SHA-256 |
| --- | --- |
| `demo/stories/motion/handmark.vue` | `17ab388ef9c878abb0741442cafdebfa708412946a00917ac3a417278d0c3ab8` |
| `src/components/handmark/HandMark.vue` | `f2752bf695fc9dc7b997dadb4d4c6718fddddb36e289a8bec293a793354c7bc9` |
| `src/components/handmark/composables/useHandMark.ts` | `a70f9de318600ebe4b8141722cd8a8a25217f934f25439a79dc6f1fa41fc0c80` |
| `src/components/handmark/index.ts` | `b44d66eb4a0eb43a7c566cb668515d488a271c77b6ce53d012c6ef985354c4ea` |

The dev server exposes no immutable served-artifact identity, so this is a
born-RED discovery detector rather than acceptance.

## Assay A

At `390×844`, DPR 3, coarse pointer true, fine pointer/hover false, a trusted
`Replay draw` activation retained these JPEG frames:

- onset: `evidence/browser-assay-a/handmark-replay-onset-coarse-mobile-a.jpg`,
  SHA-256 `6f21b38a3389605808ee6ed4c987cc6da3a7be21b668d4abe51d419e27efd52a`;
- +120 ms: `evidence/browser-assay-a/handmark-replay-mid-coarse-mobile-a.jpg`,
  SHA-256 `cabc904644652a7c50f89ba0f4ec2022c3b52a416114538daf037be5096bbbce`;
- settle: `evidence/browser-assay-a/handmark-replay-settle-coarse-mobile-a.jpg`,
  SHA-256 `1c6b9f231b6d490a1c58143898f4e9b6faa8c52d4627209349817eba6a2fe7e1`.

The mid frame reduces `A drawn line` to a small clipped `wI`-like fragment while
the underline paints. The surrounding card and copy remain stable.

## Assay B

A fresh independent coarse-mobile Browser tab reproduced the divergence:

- onset: `evidence/browser-assay-b/handmark-replay-onset-coarse-mobile-b2.jpg`,
  SHA-256 `2285b8fd37c79739fef838c95b8a00f47f64fd63c3a4a7262123693dcfe3ca1c`;
- +120 ms: `evidence/browser-assay-b/handmark-replay-mid-coarse-mobile-b2.jpg`,
  SHA-256 `963c391448ee4d2e1e0261f87fb6495cc5df5fb97f9d7e45449f833f38cc8979`;
- +900 ms: `evidence/browser-assay-b/handmark-replay-settle-coarse-mobile-b2.jpg`,
  SHA-256 `6b5935227f261433f635d532067fef267e6d99c05d759a97c1e663d2324973bc`;
- late recovery: `evidence/browser-assay-b/handmark-replay-late-coarse-mobile-b2.jpg`,
  SHA-256 `47d89b32bfe6ecaa8b347fe0d0e45e2c70e74339a051fd458e1378c9ec22b282`.

The onset again clips the text to a fragment; the +900 ms frame paints only the
underline. At that same time the Browser semantic snapshot still contains the
three text nodes `A`, `drawn`, and `line`. The full visual text returns only in
the later frame. This is a paint/compositing failure, not semantic node removal.

## Existing-owner disposition

Bind this to existing GF-HANDMARK W2/W3/W5 and the narrow public mark-plane
contract. Do not create a second renderer or a generic scrub primitive. Closure
must prove that replay mutates only the decorative SVG path across onset,
midpoint, settle, interruption, resize/font-settle, PRM, and real consumer use;
the slotted text's geometry, paint, selection, and accessible representation
must remain invariant. A mutation that lets the mark plane obscure or clip its
slotted text must turn the detector RED.

No product, source, test, gate, package, lock, repin, or acceptance change is
authorized by this receipt.
