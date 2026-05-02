# E.W0 Challenge

Challenge question: does E still contain speculative work, fallback paths, hidden deferrals, or implementation before contract evidence?

## Challenges Sustained

1. **Old Tailwind plugin hard gate was speculative.**
   - Old E assumed consumer CSS could drop to a fixed floor without current baselines.
   - Resolution: E records CSS deltas only and keeps one public CSS entry, `@mkbabb/glass-ui/styles`.

2. **Old deprecation shim conflicted with no-legacy precepts.**
   - A root non-core warning barrel would preserve two public paths.
   - Resolution: no permanent shim. The only allowed break window is W1 to W2, restored by consumer migration.

3. **Old F ledger hid scope.**
   - D-II and D final narrowed E to package publication, consumer migration, and proof.
   - Resolution: no F escape ledger in E. Prop unification, broad a11y, plugin extraction, and consumer expansion are outside E unless a later tranche opens them with fresh evidence.

4. **D close docs are stale against current `HEAD`.**
   - `useInterval` and `@utils` are back after `d-close`.
   - Resolution: W0 reconciles current `HEAD`, not the D close narrative.

5. **Export verification is too shallow for publication cutover.**
   - File-existence checks do not prove package imports or type resolution.
   - Resolution: W1 adds full export-form verification and a packed-package import/type probe as hard gates.

6. **`vite.iter.config.ts` likely drifted from the real build.**
   - The real Vite build has `@utils` and multi-entry output; iter build currently does not prove parity.
   - Resolution: W0 writes `W0-build-parity.md`; W1 may consolidate or align config only after that ledger names the intended shape.

7. **Public dock and component composables may be over-exported.**
   - Dock internals and component-private composables are publicly reachable without evidence that they belong in the external contract.
   - Resolution: W0 classifies these as `core`, `subpath`, `internalize`, `delete`, or `consumer-migrate-first`; no assumption carries into W1.

## Challenges Rejected

1. **“Do package cutover without consumer migration.”**
   - Rejected because consumer migration is proof, not follow-up work.

2. **“Keep broad `./styles/*` for convenience.”**
   - Rejected unless W0 names a current consumer that cannot migrate inside E.

3. **“Make bundle reduction a hard close gate now.”**
   - Rejected because W0 must first establish stable baselines and realistic floors.

4. **“Implement W1 immediately because the desired direction is clear.”**
   - Rejected because current `HEAD` has post-D drift and W1 file bounds must be amended from W0 ledgers.

## Result

E is accepted as a tranche plan, not as implementation authorization beyond W0 audit artifacts. W1 remains blocked until W0 ledgers exist, the challenge is updated from those ledgers, and `docs/tranches/E/waves/W1.md` has exact source/config/test bounds.
