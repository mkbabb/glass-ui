# Motion Tempo mobile lifecycle receipt — C53

Date: 2026-07-22 EDT  
Phase: **Browser formation evidence only**  
Verdict: **TWO ASSAYS REPRODUCE OWN-PIXEL BLUR / DOUBLE-GHOST ONSET · MOTION CONTRACT RED**

This receipt adds interaction depth to the 396/396 rest-state corpus. It does
not award package, Browser-acceptance, actual-Safari/VoiceOver, reduced-motion,
or tranche-execution credit.

## Source cursor

The relevant committed source is seated at Glass HEAD
`0371836dfeeb3b7982250d612f93b5347a1d29d4`, tree
`97b386172a899ef43b686ffbe43263395b3a7744`:

| file | SHA-256 |
| --- | --- |
| `demo/stories/motion/tempo.vue` | `7ea695505ee3342888771fe9f2716f36923476d85397b242bd200d3a9cb61be9` |
| `src/components/dialog/DialogContent.vue` | `4143222d5e9d769326657bd779c431545e812f79472476dda68b24f2c0099dac` |
| `src/components/dialog/ModalOverlay.vue` | `709bacb1242be760cd214511b14d48a440150d30cfc92b0755070875ec922eae` |
| `src/styles/glass/reveal.css` | `debe9612fdbb0686aa67fdc4355628139320f6e39078c797a99be36b16e85c9f` |
| `src/styles/animations.css` | `aa9529493123a11db9983cce8dcdafc86c64b8e9dce808b32c04301c831273e7` |

Those files were clean during the receipt. The live dev server does not expose
an immutable served-artifact manifest, so the frames remain discovery evidence
rather than source-to-served acceptance.

## Assay A — identity tempo

Independent Browser tab A was set to `390×844`, DPR 3, coarse pointer true,
fine pointer false, hover false. A trusted Dialog activation produced:

| frame | truthful JPEG artifact | SHA-256 |
| --- | --- | --- |
| onset | `evidence/browser-assay-a/motion-tempo-dialog-onset-true-mobile-a.jpg` | `eb2bfeceb8c64c2042aa6e8327c1a8e4829a8bf0eabab46e7c86d2d096f7c284` |
| +140 ms | `evidence/browser-assay-a/motion-tempo-dialog-mid-true-mobile-a.jpg` | `ea5415ae897750312a6d4f51cf4b2b15e10e673c3964a130b4c4dcc2adb88bc1` |
| settle | `evidence/browser-assay-a/motion-tempo-dialog-settle-true-mobile-a.jpg` | `0654b345fcf47ccce2eeef1a65a0036fe6a2b12c38d981d2a3a581b4514cba1b` |
| close→80 ms→trusted reopen | `evidence/browser-assay-a/motion-tempo-dialog-reversal-true-mobile-a.jpg` | `83b681037a1a8ffc53ae26bab3b0c528b4a335776e2127d9f9a15a9c72b16783` |

The trusted reverse activation succeeded; its locator action returned in
276 ms. This proves the narrow interaction remained reachable. It does not
prove continuity of every painted frame during the reversal.

## Assay B — longer tempo

A fresh independent Browser tab B was set to `390×844`, coarse pointer true,
fine pointer false, hover false, DPR 1. The operator selected `1.30 · longer`
before trusted Dialog activation:

| frame | truthful JPEG artifact | SHA-256 |
| --- | --- | --- |
| onset | `evidence/browser-assay-b/motion-tempo-dialog-long-onset-coarse-mobile-b2.jpg` | `7dd71b2964508720e65a64b4a3c71891bd731a495bd45dfa6427f64137ec23fe` |
| +190 ms | `evidence/browser-assay-b/motion-tempo-dialog-long-mid-coarse-mobile-b2.jpg` | `f403aa01504d9ecd83fa389712b4acffd6b094f714db25a71e7ad49ffad09b05` |
| settle | `evidence/browser-assay-b/motion-tempo-dialog-long-settle-coarse-mobile-b2.jpg` | `41ab8c6f64d0c1a6027b5e6a619304ffec12bdc194d4863158f70847362dd90b` |

Both independent onset frames show the panel's own pixels—heading, body copy,
close glyph, and edges—heavily blurred and double-ghosted. The defect clears by
the mid/settled frame, but the owner's Breath of Life / Movement of Momentum
law rejects a transition whose legibility and raster integrity collapse on the
way to an otherwise stable endpoint. Lengthening the shared tempo makes the
bad intermediate state more available; it does not merely expose a capture
artifact.

## Proof-tool correction

The Browser returns JPEG bytes (`FF D8 FF`) even when the screenshot request
names PNG. Same-byte `.png` aliases created during discovery are therefore
mislabeled historical artifacts and receive zero credit. Only the `.jpg`
identities above are authoritative. An earlier tab-B DPR-3 trio rendered a
black unused right field and also receives zero credit.

## Existing-owner disposition

This deepens the existing top-layer/Dialog motion and iOS27 Breath-of-Life
owners; it does not mint a new component, engine, row, or generic animation
primitive. Closure requires one failure-assuming motion adjudication to decide
whether own-pixel blur belongs at all, then prove natural origin, legibility,
edge/raster continuity, interruption/reversal, touch/focus/keyboard parity,
reduced-motion terminal parity, and actual Chromium/Safari behavior without a
second clock.

No product, source, test, gate, package, lock, repin, or acceptance change is
authorized by this receipt.
