# Domains: glass.babb.dev on Cloudflare Pages

**Status**: binding precept. One origin: the glass-ui demo, a static SPA at
`glass.babb.dev`, served by the Cloudflare Pages project `glass`.

---

## The record

| Surface | Host | Serves |
|---|---|---|
| Demo | `glass.babb.dev` | the Pages project `glass`: `dist-demo/` from `npm run demo:dist:build`, deep SPA routes |
| Fallback host | the project's `*.pages.dev` subdomain | the same Production deployment |

`glass.babb.dev` is a proxied (orange-cloud) CNAME on the babb.dev zone to the
project's pages.dev subdomain, covered by Cloudflare's free Universal SSL. The
babb.dev zone lives in the owner's personal Cloudflare account, the same one
the sibling sites (value.js, keyframes.js, fourier, daraksha) deploy to.

The domain is attached once, in the dashboard: Pages → glass → Custom domains →
add `glass.babb.dev`, which writes the CNAME. If the deploy token also carries
Zone DNS edit, `deploy-demo.yml` attaches it itself and reports so in its log.

No other host is in the serving path. The demo calls no API, loads no
third-party font, script or beacon, and `scripts/check-live.mjs` fails a deploy
that makes a request to any other host.

## TLS

Edge TLS only, terminated by Universal SSL on the proxied CNAME. There is no
origin certificate and nothing to renew.

## Headers

`demo/_headers` is the template; the build writes it to `dist-demo/_headers`
with the sha256 of the one inline script (the dark-mode stamp) filled into
`script-src`. Every response carries `Cache-Control: no-transform`, so the edge
cannot inject a beacon; `/assets/*` (the hashed chunks) is immutable; `/` and
`/index.html` are `no-cache`. The CSP is `'self'` plus `data:` images (the
paper textures and the avatar fallback) and inline styles: reka-ui's Select
injects a `<style>` when it opens, so `style-src` carries `'unsafe-inline'`. It
was measured, not guessed: a load of every route reachable from `/`, plus
opening a Select under the enforced policy. See
`docs/release-infra/deploy-demo.md` in glass-ui.

There is no `_redirects`: the build ships no `404.html`, so Pages serves
`index.html` for unknown paths and the router renders its own 404 page.
