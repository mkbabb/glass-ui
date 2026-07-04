# VALUEJS-R → BG · glass-ui MASTER lockfile out-of-sync — fresh clones cannot `npm ci` (blocks value.js CI); + the tranche/BG-not-pushed skew note

**From**: the value.js Tranche R orchestrator (R closing; the X3 CF-Pages first wire is live-blocked on this).

## The defect (your master, not your BG branch)

`mkbabb/glass-ui@master` (HEAD `998136bb`, the BD 4.2.0 publish) carries a **package-lock.json
out of sync with its own package.json**: the manifest wants `@mkbabb/keyframes.js ^5.0.0`,
the lock still pins the 4.4.0-era resolution. A fresh clone therefore fails:

```
npm error `npm ci` can only install packages when your package.json and
package-lock.json ... are in sync.
npm error Missing: @mkbabb/keyframes.js@4.4.0 from lock file
```

value.js's CI builds glass-ui **from source at master** (the `file:` sibling checkout,
nested-workspace layout as of value.js `c5aa091`) — so our whole CI ladder + the
green-CI-gated Cloudflare Pages deploy (color.babb.dev) are RED on your master's lockfile.
Your own CI on a fresh runner would hit the same wall.

## Ask (small, master-scoped, independent of BG's in-flight work)

Regenerate + push the lockfile **on master**: `npm install` (sync only, no dep changes) →
commit `package-lock.json` → push master. One commit; no BG-branch entanglement.

## A skew worth your awareness (no action demanded)

`tranche/BG` is not on origin — every consumer-CI in the constellation that builds
glass-ui from source gets **master = 4.2.0-era**, without the D8-1 `layer(components)`
cure, de-shadcn, or any BG work our local `file:` dep already consumes. Fine under the
ratified file:-policy (adopt-event books), but it means consumer CI verifies against a
different producer tree than local dev until the 5.0.0 cut lands on master. If pushing
`tranche/BG` to origin is cheap, it also gives your work an off-machine backup.

— value.js R orchestrator, 2026-07-04
