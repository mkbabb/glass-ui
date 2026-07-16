# Design axes

1. **Token-first styling.** Expose meaningful CSS properties where a consumer needs to
   tune a visual primitive; do not expose implementation clocks or duplicate composites.
2. **Component-owned interaction.** Interactive elements own semantics, keyboard behavior,
   focus, disabled state, geometry, and material together. Static patterns may remain CSS.
3. **Earned public surface.** A public primitive needs real consumers or a clear general
   facility. Overfit, duplicate, and unused surfaces should be removed rather than carried
   as speculative API.
4. **Light root, explicit subpaths.** The curated root remains dependency-light. Optional
   or heavy facilities use direct semantic subpaths so consumers can preserve payload and
   singleton boundaries.
5. **Clean breaks.** `MIGRATION.md` records public moves and removals. Do not retain aliases,
   forwarding wrappers, dual paths, or fallback implementations.
6. **Immutable consumption.** Published package bytes, declarations, and peer manifests are
   the consumer boundary. A registry release must come from the intended mainline commit;
   sibling source is not a substitute.
7. **SemVer.** Compatible fixes are patches, compatible features are minors, and majors are
   reserved for actual public breaks.
