# Orchestrator note — browser-free Actions (owner, 2026-11-13). BINDING for the close seat.

The owner: "We should not have an absurd number of expensive tests, or any playwright tests, in the action."

master carries the change as merge 4db0b22dd (branch `ci/no-playwright`: d7d9b24f4, aa0c1da88, 15ee21803, 0faf408e1, 46ac802c3, 58aa9d64e). A tag push runs the workflow files AT THE TAG, so before this branch is tagged it must carry them: merge master (or cherry-pick those six) and resolve. After it: `npm test` needs no browser; the two browser-launching unit tests are `*.browser.test.ts` under `npm run test:browser`; the pixel floor and `test:browser` run in `scripts/release.sh`; `tests/gates/ci-browser-free.test.ts` goes red if a workflow names a browser. The close runs the full suite with CI=true once to prove it, and `npm run test:browser` once locally.

## Added 2026-11-13 02:00 — the sparse checkout too

master now also carries merge ee1dc2935 (`ci/sparse-checkout`: 4cc32c066, 520091932, and a ratchet rebind): all three workflows check out everything but `docs/` plus the eight docs files a gate reads, and `tests/gates/ci-sparse-checkout.test.ts` holds the lists together. Take it with the browser-free change (merge master is simplest). If this branch adds a gate that reads another docs file, add it to both `paths` lists and both sparse blocks or that test goes red. The `test:browser` script line adds 72 B to the packed package: rebind the ratchet on the tree that is tagged.
