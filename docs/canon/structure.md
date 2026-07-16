# Source structure

Glass UI uses semantic ownership rather than historical component tiers.

```text
src/
├── index.ts          curated, lightweight root surface
├── forms.ts          input-family entry
├── components/       flat component families plus private `_shared` leaves
├── composables/      reusable behavior grouped by domain
├── styles/           global tokens, material substrate, and utilities
├── fonts/            packaged font assets
└── html-attributes.d.ts
```

Component-owned code and CSS live with their family. Cross-family material, token,
typography, accessibility, and utility rules remain in `src/styles`. Public build and
declaration entries come from the semantic entry map in
`scripts/lib/subpath-policy.mjs`; no source-subpath mirror tree exists.
