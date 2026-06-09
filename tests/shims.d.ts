// AX.W62 — ambient shim for the `tests/` type-fold (tsconfig.test.json).
//
// The "detect" tests import the gate scripts (`scripts/proof-*.mjs`) to exercise
// their pure detector exports against fixtures. Those `.mjs` files are plain JS
// with no declaration files, so a strict fold reds TS7016 ("could not find a
// declaration file"). They are intentionally untyped — the gate scripts are the
// runtime source of truth, not a typed API. This shim types any `*.mjs` import
// as `any`, which clears the TS7016 noise WITHOUT weakening the fold's real
// purpose: a dead import from a `.ts`/`.vue` module (the BouncyToggle class)
// still reds TS2305, because that bite is on real TypeScript modules, not these
// `.mjs` gate scripts.
declare module "*.mjs";
