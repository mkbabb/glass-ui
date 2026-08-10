# π ENQUEUE — Lane β unit β0 · the `?light` / `?dark` forced first-paint pair

**ENQUEUED, NOT CAPTURED.** This seat owns no browser. The π captures below are queued for
the **singleton browser seat**; this seat opened nothing, drove nothing, and claims no
paint. Model: `claude-opus-5[1m]`. Date: **2026-08-10**.

---

## 0 · Why this pair needs a harness, stated before the spec

`darkModeSyncScript()` has **zero injection sites in this repo** — detector, verbatim:

```
grep -rn 'darkModeSyncScript' src demo scripts   # → 10 hits, enumerated in full:
  src/composables/dark/darkModeSyncScript.ts:3,68,73    definition + its own doc comment
  src/composables/dark/index.ts:9,20,21                 the barrel (export + type export)
  src/composables/dark/useGlobalDark.ts:15,69           two comments
  src/styles/glass/control-bit.css:172                  one comment
  scripts/verify-export-types.mjs:765                   one comment — the 8.0.0
                                                        committed-tree-datum lesson, which
                                                        cites the parked d.ts 990 → 1,907
```

Zero of the ten is a call site: `demo/` has no hit at all, and the single `scripts/` hit is
prose inside the ratchet gate's own commentary, not an invocation.

The demo's own capture path does **not** use it: `demo/main.ts:86-103` reads `?mode=dark`
and stamps the class itself. So there is no glass-ui URL that exercises `queryOverride`,
and a π run against the demo would measure `demo/main.ts`, not this module.

The pair therefore runs against a **harness page the seat materialises to a temp path** —
no repo artifact, nothing to prune later. The harness is the module's own emitted string,
injected the way the doc comment says to inject it: as the first blocking `<head>` script.

## 1 · The harness — materialise verbatim, do not edit

Write to `/tmp/bk-beta0-firstpaint.html`. The `<script>` body is `darkModeSyncScript({
queryOverride: true })`'s output, **derived** at this seat (not typed):

```html
<!doctype html>
<meta charset="utf-8">
<title>β0 first-paint π</title>
<script>(function(){try{var m=localStorage.getItem("vueuse-color-scheme");var d=m==="dark"||((m===null||m==="auto")&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);var q=new URLSearchParams(location.search);if(q.has("dark")){d=true;}else if(q.has("light")){d=false;}var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(_){}})();</script>
<style>
  :root { color-scheme: light dark; }
  html { background: light-dark(#ffffff, #000000); }
  html.dark { background: #000000; }
  body { margin: 0; height: 100vh; }
</style>
<body></body>
```

The pasted `<script>` body is **402 bytes** and was byte-compared against the function's
own output at this seat (`MATCH: True`), not transcribed. Regenerate rather than trust the
paste if anything in `src/composables/dark/` moved:

```
node -e 'import("./dist/dark.js").then(m=>console.log(m.darkModeSyncScript({queryOverride:true})))'
```

## 2 · The pair

Run **both cells under the OPPOSITE platform preference**, which is the whole point: the
query must beat the platform at first paint, not merely agree with it.

| cell | URL | emulated `prefers-color-scheme` | storage seed | EXPECTED at first paint |
|---|---|---|---|---|
| π-β0-LIGHT | `file:///tmp/bk-beta0-firstpaint.html?light` | **dark** | `vueuse-color-scheme = "dark"` | `<html>` has NO `dark` class · `style.colorScheme === "light"` · painted ground **white** |
| π-β0-DARK | `file:///tmp/bk-beta0-firstpaint.html?dark` | **light** | `vueuse-color-scheme = "light"` | `<html>` HAS `dark` class · `style.colorScheme === "dark"` · painted ground **black** |

Each cell is **mode-asserted (P0)**: the assertion is the *stamped* mode, not the
screenshot's vibe. Report the three detectors verbatim per cell:

```
document.documentElement.classList.contains("dark")
document.documentElement.style.colorScheme
getComputedStyle(document.documentElement).backgroundColor
```

plus one screenshot per cell (the DELTA artefact — a claim without a captured pair is not
live-verified).

## 3 · What makes the pair PASS, and what makes it FAIL

- **PASS** — both cells stamp the mode the URL asked for, against a platform and a stored
  value that both say the opposite. That is precedence `query > storage > default`
  observed in paint rather than asserted in a unit.
- **FAIL, loud** — either cell stamps the platform's or storage's mode. There is no
  partial credit and no fallback to accept: a forced mode that does not force is the flash
  this seat exists to forbid.

## 4 · Fences on the seat draining this queue

- **Serialize.** The browser seat is a singleton; do not run this concurrently with another
  lane's captures (the selected-page state is global and two agents hijack each other).
- **Do not `getContext()` on any live canvas** — there is none here, but the standing
  context-steal trap applies to every π run.
- **No repo writes.** The harness lives in `/tmp`. Only the captured verdict returns, into
  this unit's `RECORD.md` §π.

## 5 · Status

**OPEN — awaiting the singleton browser seat.** The unit's unit-level arms
(`tests/composables/dark/darkModeSyncScript.test.ts`, the eight `G-NO-FLASH` arms) cover
the same precedence in the emitted-script's own semantics and are **GREEN**; this pair is
the paint half and is **not** claimed until captured.
