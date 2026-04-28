# C.W0.C — Token-Resolution Audit (deferred to C.W1.C pre-fix)

## Status

**Deferred** to C.W1.C as the pre-fix Playwright capture. The token-resolution audit's substance — confirming `font-mono-code` and `text-2xs` resolve to body fallbacks today, then verifying they resolve correctly post-fix — is identical to the Sub-gate that C.W1.C already ships:

> **Sub-gate (C.W1.C)**: Playwright `getComputedStyle(document.querySelector('.font-mono-code')).fontFamily` includes "Fira Code"; `.text-2xs` resolves to `font-size: 10px`. **Pre-fix run captured for diff.**

Running W0.C as a separate Playwright session before W1.C ships would duplicate the eval. Folding W0.C into W1.C's pre-fix capture closes both gates with one Playwright run.

## What W0 closes on, in lieu

The expected undefined utilities are **already enumerated** in `W0-live-findings.md` §2 (`font-mono-code` — 55 sites) and §3 (`text-2xs` — 1 site at `LabeledSelect.vue:25`). The static enumeration is the audit's deliverable; the runtime confirmation is the C.W1.C gate.

## Action

C.W1.C's dispatch briefing will include: "before applying the fix, run the Playwright eval and write the pre-fix font-family/font-size values to a `pre-fix.txt` artefact; after applying, run again and write `post-fix.txt`. Both artefacts cited in the W1 close commit."

This honors the bbnf-lang SPEC §"Pre-regen vs post-regen evidence" — pre-state and post-state are both captured as artefacts, not just claimed.

## Verdict

W0 hard gate is closable without a standalone W0.C deliverable. The audit's substance lands at C.W1.C's pre-fix capture; this stub documents the merge.
