# Completion Seal mobile story reach receipt — C58

Date: 2026-07-22 EDT  
Phase: **Browser formation evidence only**  
Verdict: **TWO MOBILE ASSAYS RED ON CANONICAL STORY COMPOSITION · SEAL PRIMITIVE NOT REPLACED**

## Exact source

Clean committed source at Glass HEAD
`0371836dfeeb3b7982250d612f93b5347a1d29d4`:

| file | SHA-256 |
| --- | --- |
| `demo/stories/feedback/completion-seal.vue` | `b5600a076e17957c4edab0b2261aedf4a3ce6e9fbcd287f5fd15ea54d078802f` |
| `src/components/completion-seal/CompletionSeal.vue` | `e1843e0599c4dab5fa2fd0df1071e04ee7a0094b810c341ef777e180917879a1` |
| `src/components/completion-seal/styles.css` | `897b226e2867fc736da82779e84af68f270399e42c25debadf62949927da70d4` |

The route hard-codes `grid-cols-4 gap-8` around four `h-24 w-24` seals and
places the replay Button plus explanatory copy in a non-wrapping horizontal
`flex items-center` row. Those story choices, not a private CompletionSeal
selector, create the measured mobile failure.

## Assay A

At `390×844`, coarse mobile, trusted replay retained:

- onset SHA-256 `a6c37763a6e4130e2616a3b4dbae138c70af284690eb93261382d6c598a34beb`;
- +160 ms SHA-256 `c69eb283e4aac7924eff156e27ed4baa133ef98e36183fabf15d8b8fb8f412e8`;
- settle SHA-256 `a18ccf3cb9abc67058bc97c376ff1694a3f4f783f2bf797ace7169072e7e798c`.

Artifacts are
`evidence/browser-assay-a/completion-seal-replay-{onset,mid,settle}-coarse-mobile-a.jpg`.

## Assay B

A fresh independent coarse-mobile Browser tab reproduced the settled geometry:

- onset SHA-256 `e4fb488bba7f529672ca2f86bc27f803c86e8bcbd87488cee8fd2cdd80706748`;
- +160 ms SHA-256 `29b4477857f87b39efaede04c3d67907bce9c8990b7d40cfde8187098a9f5aa7`;
- settle SHA-256 `f353957dc40867efdc73007c25c644f837c54d40f9ff33f9f6abc843c113823c`.

Artifacts are
`evidence/browser-assay-b/completion-seal-replay-{onset,mid,settle}-coarse-mobile-b3.jpg`.

Both runs show the rightmost wordmark seal and label clipped at the viewport
edge. The replay Button is compressed into a tall three-line capsule beside the
paragraph. The two-column personal-best comparison below fits, proving this is
not an unavoidable seal-size floor.

## Existing-owner disposition

CompletionSeal remains the positive finite semantic-motion reference already
retained by C46. The canonical story must itself demonstrate the mobile contract
with a responsive, reach-preserving specimen layout and a replay control whose
label does not become an ornamental tower. It must preserve all four shapes,
their relative scale, full labels, focus order, coarse target floor, and
onset/mid/settle comparison without horizontal clipping.

Do not add responsive layout behavior to the seal primitive or create a second
completion renderer to cure a route-local grid. Bind the change to story/demo
composition and the existing CompletionSeal lifecycle/test owner.

No product, source, test, gate, package, lock, repin, or acceptance change is
authorized by this receipt.
