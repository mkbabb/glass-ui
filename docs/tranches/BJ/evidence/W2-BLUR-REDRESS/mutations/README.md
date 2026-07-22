# W2 BLUR REDRESS — mutation bites

The W2 paint-proof is fail-CLOSED. Two independent bites prove the every-DPR
assertion has teeth (the §5 KILL of the 2dppx→17px overlay writer).

## Bite 1 — in-spec, runtime (banked in every run)

Both the Chromium arm (`proveOverlayAt2Dppx`) and the WebKit-2dppx arm inject the
restored writer at runtime into a live 2dppx context and re-read:

    @media (min-resolution: 2dppx){ :root{ --glass-blur-overlay-radius: 17px } }

- shipped overlay @ 2dppx = **11px**
- mutation-restored @ 2dppx = **17px**  → `bites: true`

See `computed-chromium.json.proofs.overlay-every-dpr.dpr2.mutationRestored17` and
`computed-webkit-2dppx.json.mutationBite`.

## Bite 2 — source-level (this receipt)

The killed writer was restored in the real source
(`src/styles/tokens/glass.css`) and the Chromium every-DPR test re-run against the
live demo. It RED-ed for the causal reason named in the adjudication §11 DPR row:

    Error: overlay blur == 11px at 2dppx (the killed 17px arm is gone)
    Expected: 11
    Received: 17

Full output: `2dppx-17-restore.chromium.txt`. The source was reverted immediately
after (`git diff src/styles/tokens/glass.css` is empty); no product byte changed.
