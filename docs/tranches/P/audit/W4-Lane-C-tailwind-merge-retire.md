# P.W4 Lane C — tailwind-merge cruft retire (orchestrator-direct)

**Status**: COMPLETED.
**Date**: 2026-05-16.
**Lane shape**: orchestrator-direct (1-line removal + rationale comment).

## §1 — Scope

Per `docs/tranches/P/waves/W4.md` Lane C + Pε-4 D6.

`scripts/proof-package.mjs:113` declared `tailwind-merge` in the synthetic-consumer's dependency manifest. This was correct prior to v0.9.2 when `cn()` composed `clsx + tailwind-merge`. At v0.9.2, `tailwind-merge` was retired (the `cn()` helper ships its own deduplicator per `src/utils/cn.ts`); `package.json.peerDependencies` no longer lists it (verified at HEAD). The synthetic-consumer manifest still declared it — purely cruft.

The proof-package gate now verifies that consumers DON'T need `tailwind-merge` in their dependency manifest to consume glass-ui.

## §2 — Edit

`scripts/proof-package.mjs` synthetic-consumer dependency map:

```diff
                     clsx: dependencyVersion("clsx"),
                     "embla-carousel-vue": dependencyVersion("embla-carousel-vue"),
                     "lucide-vue-next": dependencyVersion("lucide-vue-next"),
                     "reka-ui": dependencyVersion("reka-ui"),
-                    "tailwind-merge": dependencyVersion("tailwind-merge"),
+                    // P.W4 Lane C (Pε-4): `tailwind-merge` retired at v0.9.2;
+                    // `cn()` ships its own deduplicator. The synthetic
+                    // consumer manifest no longer declares it — the proof
+                    // verifies consumers DON'T need `tailwind-merge` in their
+                    // deps to consume glass-ui.
                     tailwindcss: dependencyVersion("tailwindcss"),
```

## §3 — Verification

`npm run proof:package` PASS post-edit (the synthetic-consumer build succeeds without `tailwind-merge` in its dependency map — the canonical post-v0.9.2 shape).

## §4 — P invariant compliance

- **P invariant 5 (NO LEGACY CODE)**: cruft removed; no shim or back-compat preserved.
- **P invariant 28 (zero deferral)**: Pε-4 closes at this wave.

## §5 — Status: COMPLETED.
