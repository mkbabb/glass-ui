# Lane D — CUT-6..8, the `darkModeSyncScript` cure

**Seat** implement · **model** `claude-opus-5` (asserted from this seat's own transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_4cc3afc1-169/agent-a4edb6e6bc94b02d2.jsonl`,
the `"model"` field; the file was found by grepping the workflows tree for a phrase unique
to this lane's prompt, `darkModeSyncScript: normalize fail-open fix`, so the datum is this
seat's own and not the parent session's) · **date** 2026-09-17 · **base** `master` @
`46ab4124` · **spec of record**
`docs/tranches/BK/execution/2026-09-17-o20-disposition/LEDGER.md` §CUT-6..8, plus the seat
JSONs `investigate__cuts-dark.json` + `verify__cuts-dark.json` and the promised contract at
`docs/tranches/BJ/addenda/2026-07-24-refinement/DECK-RELOCATION.md:31,:147`.

The assertion gates the chain: the id is re-read from the transcript and matched against
`claude-opus-5*` with `&&` at the head of the step-0 baseline command and of every command
that wrote a repo byte (the born-RED restore/re-restore pair, the dev-server capture).
Read-only measurements (`vitest`, `vue-tsc`, `gate-register`, `tsc --emitDeclarationOnly`
into the scratchpad) ran ungated after the id was established — stated, not implied.

## Step-0 baseline

`git status --porcelain` at first byte, before anything this lane wrote:

```
(empty)
```

`git diff --stat`:

```
(empty)
```

`git rev-parse HEAD` = `46ab412403efaadfac9350a0e0f6bf35b82f23f6`. The tree was CLEAN at
step 0 — no other lane had landed a byte yet. (By the time this lane finished, 17 foreign
paths were dirty at the time of writing — 18 at close, incl.
`tests/components/ui/slider/attrs-pointerdown-channel.test.ts` — and they belong to Lanes C2
and E2; C1 and E1 landed in batch 1 at `46ab4124` with zero dirty paths. None is this lane's
and none was touched.)

Register receipt read at baseline, before the change:

```
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
```

Lane test file at baseline: `18 passed (18)`.

## Census

| file | + | - | note |
| --- | --- | --- | --- |
| `src/composables/dark/darkModeSyncScript.ts` | 47 | 11 | the normalize re-order, the `defaultDark` widening, one dated strike on a false prose line |
| `tests/composables/dark/darkModeSyncScript.test.ts` | 138 | 1 | `throwOnWrite` on the host + THREE new arms under the seated `G-NO-FLASH` name |
| `vite.config.ts` | 25 | 1 | ONE new plugin, `glass-ui:dark-mode-stamp`, + its registration |
| `docs/tranches/BK/execution/2026-09-17-o20-cure/D/RECORD.md` | new | — | this record |

`index.html` was NOT touched — the plugin needs no anchor (`injectTo: "head-prepend"`), and
the fence preferred none. Nothing published moves: `package.json` `files: ["dist"]`, and
neither `vite.config.ts` nor `tests/` ships. No PUBLISHED export name is added, removed or
renamed (`src/composables/dark/index.ts` untouched; the interface widens, the surface does
not); `vite.config.ts` (unpublished, dev-only) gains the named export `darkModeStamp`, the
hook Residue 1 needs.

## Act ledger

### (1) normalize fails open — the write moves AFTER the stamp

The defect, measured on the PUBLISHED 9.0.0 bytes (`dist/dark.js` (the barrel) →
`dist/dark-CLlmo7dD.js` (the emitter)) against a `Storage` whose `setItem` throws:

```
default    dark=true  colorScheme="dark" writes=[]
normalize  dark=false colorScheme=""     writes=[]
```

`{normalize:true}` stamped NOTHING. The emitted order was `getItem` → resolve → `setItem` →
`classList.toggle` → `colorScheme`, all inside one `try{}catch(_){}`, so a quota/privacy/
sandbox throw on the write skipped the stamp and the page painted unthemed — the exact FOUC
the module exists to remove, in the arm that asked for MORE determinism, and flatly against
the prose at `darkModeSyncScript.ts:103-105`. New at 9.0.0 (v8.0.0's emission has no write
inside the try).

Cure: the `normalizeArm` is emitted LAST, after `classList.toggle` and `style.colorScheme`.
Nothing is emitted after it, so the swallow costs the write-back and nothing else. The
`?dark`-persists ratification is unharmed — the write still follows the query arm, just
further down the same body — and its arm (`:256`) stays green.

The normalize emission is the same 361 B it was; only the position of the `setItem`
statement inside the body moved.

### (2) the throwing-storage arm

`grep -n 'throw|Quota|Security|private' tests/composables/dark/darkModeSyncScript.test.ts`
returned EMPTY at HEAD — the "a storage failure never breaks first paint" contract was
prose-only and entirely ungated, which is how the regression shipped green. `makeHost` gains
a `throwOnWrite` host (reads still answer, which is the real shape of every one of those
failures) and one arm drives the default, the normalize arm, and all three seams at once.

### (3) `defaultDark` widens to carry the absent/`"auto"` split

Measured first, on the PUBLISHED bytes, that no scalar can say it (target: stored `"auto"`
+ OS-dark → DARK, stored `null` + OS-dark → LIGHT):

```
defaultDark=(default) auto->DARK  null->DARK  no
defaultDark=false     auto->LIGHT null->LIGHT no
defaultDark=true      auto->DARK  null->DARK  no
defaultDark="os"      auto->DARK  null->DARK  no
```

…and that the object form was not merely unsupported but silently corrupting — `String({…})`
substituted into the emission:

```
…var d=m==="dark"||((m===null||m==="auto")&&[object Object]);…
```

which is a `SyntaxError` at parse time inside the `<head>`, i.e. no stamp at all.

Cure: `defaultDark?: boolean | "os" | { absent: boolean | "os"; auto: boolean | "os" }`. A
scalar still welds the two cases into ONE arm — that is the pre-widening emission, kept to
the byte — and the object form emits them as two tests:

```
scalar : var d=m==="dark"||((m===null||m==="auto")&&<arm>);
object : var d=m==="dark"||((m===null&&<absent>)||(m==="auto"&&<auto>));
```

Additive forever: widening an INPUT union costs no major at any adoption level. (The
investigator's "costs a major the moment anyone adopts" was falsified by the verifier and is
not carried here either.)

Emission census after the cure, every figure DERIVED from the function, none typed:

| call | bytes | note |
| --- | --- | --- |
| `darkModeSyncScript()` | **300** | `sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=` — unmoved |
| `{defaultDark:false}` | **229** | published figure, unmoved |
| `{defaultDark:true}` | **228** | published figure, unmoved |
| `{queryOverride:true}` | **402** | published figure, unmoved |
| `{normalize:true}` | **361** | published figure, unmoved (byte COUNT unmoved; the bytes reorder, so the hash moves — see (c)) |
| `{defaultDark:{absent:false,auto:"os"}}` | 309 | new |

The byte-identity arm at `:311` at HEAD `46ab4124`, `:319` in the cured file, is the guard on
all of this and it is quoted verbatim in the verify section below; it went green untouched.

### (4) delivery — glass-ui's own demo stamps at parse time

`index.html` carried no parse-time stamp at all (no `classList`, no `color-scheme`, no
`localStorage`); `demo/main.ts` resolved the theme after the module graph loaded. The
library's own shell shipped the flash its published primitive exists to remove, which is
also why the function has zero callers anywhere: a `<head>` script cannot be imported, so
sci-report transcribed the emitted bytes instead of calling the function.

`vite.config.ts` gains ONE plugin, `glass-ui:dark-mode-stamp` — a `transformIndexHtml`
returning the emitted string as a `head-prepend` script tag. 8 lines of plugin plus its
import, its registration and a doc comment; no anchor in `index.html`.

Measured live, `npx vite --port 5417` then `curl`, the served `<head>`:

```
<html lang="en">
    <head>
      <script>(function(){try{var m=localStorage.getItem("vueuse-color-scheme");var d=m==="dark"||((m===null||m==="auto")&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);var e=document.documentElement;e.classList.toggle("dark",d);e.style.colorScheme=d?"dark":"light";}catch(_){}})();</script>

      <script type="module" src="/@vite/client"></script>

        <meta charset="UTF-8" />
```

First in `<head>`, ahead of the vite client and the charset meta. The charset declaration
still serializes at byte **754**, inside the 1024-byte window the HTML standard requires,
and the injected script is pure ASCII — checked rather than assumed, because `head-prepend`
puts bytes ahead of `<meta charset>`. The server was stopped; no browser was opened (Lane C2
holds that seat).

`demo/main.ts`'s capture boot still forces `?mode=` over this stamp, deliberately: a capture
asks for a mode, the stamp answers when nobody has. No conflict, and `demo/main.ts` is
outside this fence and untouched.

### REFUSED WITH GROUNDS — the born-RED on the BUILT demo `index.html`

The ledger asks for born-RED on "the built demo `index.html` contains the emitted IIFE
(RED today, grep 0)". **The fence cannot reach it**, and the ledger's own parenthetical
("dist-demo? — check vite.config.ts outDir") is where it comes apart. Measured, both configs
through vite's own loader:

```
vite.config.ts                     lib:true  outDir:(default dist) stamp:true
demo/vite.demo-dist.config.ts      lib:false outDir:…/dist-demo    stamp:false
```

The root `vite.config.ts` is the LIBRARY build (`build.lib`) — in lib mode Vite never reads
`index.html`, so no root build can emit a demo HTML file, and the published 9.0.0 `dist/`
indeed contains no `index.html`. The built demo comes from
`demo/vite.demo-dist.config.ts`, which its own header calls "a STANDALONE config … it fully
REPLACES the root `vite.config.ts`" — it lists its plugins itself and therefore does not
carry this plugin. `dist-demo/index.html` on disk (built 18:37, before this lane) greps
**0** for `vueuse-color-scheme`, which IS the ledger's RED; it stays RED after this lane,
because the one line that would cure it lives outside the fence.

No build lock was taken and no build was run: the two facts that decide this (lib mode; the
demo-dist config's plugin list) are readable without one, and spending a shared lock for a
foregone conclusion is not parsimony. The owed edit is one line, named in Residue.

Substituted born-RED, which measures the same claim on the surface the fence owns: the arm
loads the REAL `vite.config.ts` through `loadConfigFromFile` and drives the plugin's
`transformIndexHtml` hook — so it measures what `npm run dev` serves, not a string this lane
also wrote. The live dev-server capture above corroborates the end-to-end placement.

### Dated strike — one false line in this file's own prose

`darkModeSyncScript.ts:20` read "on `"auto"` / missing / unknown, falls back to
`prefers-color-scheme`". The third term was never true. Measured on the published emission:

```
stored=null       OS-dark -> DARK
stored="auto"     OS-dark -> DARK
stored="dark"     OS-dark -> DARK
stored="light"    OS-dark -> LIGHT
stored="garbage"  OS-dark -> LIGHT
stored="system"   OS-dark -> LIGHT
stored=""         OS-dark -> LIGHT
```

An unrecognised stored value resolves LIGHT, not the platform. Struck in place with a dated
bracket and NOT cured: the resolution is unchanged by this pass, and the ledger's CUT-6..8
cure list does not carry it. Named again in Residue so the ruling is someone's to make.

## Born-RED proof

The three arms were written first, then the two source files were restored to their `HEAD`
bytes (`git show HEAD:<path> > <path>` — a read, piped into files inside this fence; no
`git add`/`commit`/`stash`/`checkout`/`reset` ran at any point) and the file was run.

### RED — arms 1 and 2, against the pre-change source

```
 ❯ tests/composables/dark/darkModeSyncScript.test.ts (21 tests | 3 failed) 36ms
     × G-NO-FLASH · a storage that THROWS ON WRITE never costs the stamp — default AND normalize 5ms
     × G-NO-FLASH · the absent and `auto` arms SPLIT — one object says what no scalar can 1ms
     × G-NO-FLASH · glass-ui's OWN demo stamps at parse time — vite.config.ts injects it first in <head> 1ms

 FAIL … > G-NO-FLASH · a storage that THROWS ON WRITE never costs the stamp — default AND normalize
AssertionError: expected false to be true // Object.is equality

- Expected
+ Received

- true
+ false

 ❯ tests/composables/dark/darkModeSyncScript.test.ts:382:50
    381|         const normalized = runScript({ ...host, options: { normalize: …
    382|         expect(normalized.classList.has("dark")).toBe(true);
       |                                                  ^

 FAIL … > G-NO-FLASH · the absent and `auto` arms SPLIT — one object says what no scalar can
SyntaxError: Unexpected identifier 'Object'
 ❯ runScript tests/composables/dark/darkModeSyncScript.test.ts:73:5

 Test Files  1 failed (1)
      Tests  3 failed | 18 passed (21)
```

Arm 1 REDs on the missing stamp. Arm 2 REDs on `[object Object]` reaching the emitted body —
the `SyntaxError` IS the defect, not a harness artefact.

### The third RED was not honest, and was re-measured

In that run the plugin arm failed with `TypeError: The URL must be of scheme file` —
`import.meta.url` is non-file under happy-dom, so the arm died in its own setup and would
have RED'd with or without the cure. **A born-RED that fails for the wrong reason is not a
born-RED.** The arm was moved onto `process.cwd()`, the house idiom
(`tests/gates/token-hygiene.test.ts:41`, `orphan-css-partial.test.ts:56-58`,
`boot-graph.test.ts:47` all say so in as many words), and re-measured against the
pre-change `vite.config.ts` alone:

```
 ❯ tests/composables/dark/darkModeSyncScript.test.ts (21 tests | 1 failed | 20 skipped) 276ms
     × G-NO-FLASH · glass-ui's OWN demo stamps at parse time — vite.config.ts injects it first in <head> 275ms

AssertionError: vite.config.ts carries the dark-mode stamp plugin: expected undefined to be truthy

- Expected:
true

+ Received:
undefined

 ❯ tests/composables/dark/darkModeSyncScript.test.ts:466:80

 Test Files  1 failed (1)
      Tests  1 failed | 20 skipped (21)
```

That is the real RED: the config carries no such plugin.

### GREEN — after the cure

```
 Test Files  1 passed (1)
      Tests  21 passed (21)
```

18 → 21: three arms added, none of the eighteen touched. Among the eighteen, the guard the
ledger names:

```js
it("G-NO-FLASH · the DEFAULT emission is byte-identical — a CSP hash does not silently re-pin", () => {
    const out = darkModeSyncScript();
    expect(Buffer.byteLength(out)).toBe(300);
    expect(createHash("sha256").update(out).digest("base64")).toBe(
        "VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=",
    );
});
```

Green before the cure and green after it, both figures derived from the function rather than
typed. Both halves of "the default emission must not move" — 300 B and the CSP hash — hold
across all four acts.

## Verify — verbatim, real exit codes

```
$ npx vue-tsc --noEmit -p tsconfig.json
tsconfig.json exit=0
```

```
$ npx vue-tsc --noEmit -p tsconfig.test.json
tsconfig.test.json exit=0
```

The test project exited **2** on the first pass —
`tests/composables/dark/darkModeSyncScript.test.ts(464,29): error TS2589: Type instantiation
is excessively deep and possibly infinite` — this lane's own error, from `.flat(Infinity)`
over vite's recursive `PluginOption` type. Fixed at the source (flatten as `unknown[]`), not
suppressed, and re-measured to 0.

Lane tests:

```
$ npx vitest run tests/composables/dark/darkModeSyncScript.test.ts
 Test Files  1 passed (1)
      Tests  21 passed (21)
```

Full battery:

```
$ npx vitest run
 Test Files  228 passed (228)
      Tests  2198 passed | 10 expected fail (2208)
BATTERY_EXIT=0
```

Whole-green with four other lanes' uncommitted work in the tree; **zero REDs to attribute**,
this lane's or anyone's. The `10 expected fail` is the standing xfail count, unmoved.

Gate receipt:

```
$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
REGISTER_EXIT=0
```

`seats:60`, `violations:0`, byte-identical to the baseline receipt. Nothing minted: no G-id,
no seat, no `SEAT-BINDING.json` row. The three new arms file as close-battery rows under
`G-NO-FLASH`, an already-seated MOTION name, exactly as the eight arms already in this file
do.

## FOR LANE R — MIGRATION §8.1.0 recipe

MIGRATION.md is Lane R's alone and was NOT edited by this lane. Four amendments are owed to
§8.1.0 (`MIGRATION.md:45-110`); the last is the recipe paragraph the ledger asks for.

**(a) The `defaultDark` row** (`:70`) now reads a narrower type than ships. Replace the type
cell and extend the description:

> | `defaultDark?: boolean \| "os" \| { absent: boolean \| "os"; auto: boolean \| "os" }` | `"os"` | What an ABSENT or `"auto"` stored mode resolves to. A scalar answers both cases at once: `"os"` follows `prefers-color-scheme` — right for an app; a boolean resolves deterministically — right for a document that must not flip with the projector's OS theme. Under a boolean the emitted script asks the platform nothing (no `matchMedia` call at all). The OBJECT form answers the two cases SEPARATELY, which is the only way to say "a first visit is a deliberate light document, but a reader who chose `auto` gets their platform" — `{ absent: false, auto: "os" }`. No scalar reproduces that pair. |

Additive: every existing call keeps its bytes and its meaning.

**(b) The `normalize` row** (`:71`) gains the ordering fact: _the write is emitted AFTER the
stamp, so a storage that throws on write (quota, privacy mode, a sandboxed origin) costs the
write-back and nothing else — the page is already themed when it fails._ Worth a sentence of
its own because 9.0.0 shipped the other order, in which a failed write cost the whole stamp;
a consumer on 9.0.0 who set `normalize` and saw an unthemed first paint in private browsing
now knows what it was.

**(c) The byte block** (`:83`) is unchanged and stays true: `darkModeSyncScript() → 300
bytes, sha256-VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8=`. The four opt-in byte COUNTS are
unmoved (229 / 228 / 402 / 361) and three hashes are unmoved, but `{normalize:true}` REORDERS
its bytes so its CSP hash moves:
`sha256-Xtel8uEYWeIEsJMO4TZWEump78fncLVrH4/fe166vIw=` (9.0.0) →
`sha256-BxbpMykpiKP/WPfTsYpbpPpSCTecT50SMXFVFNrMGrw=` (cured); a consumer pinning the
normalize emission under `script-src 'sha256-…'` re-pins at bump or is blocked at first
paint. Lane R carries that sentence into MIGRATION §8.1.0 (b)/(c).

**(d) The recipe paragraph — how to WIRE it, not transcribe it.** New prose under §8.1.0:

> _Wire it with a build plugin; do not transcribe the bytes_
>
> `darkModeSyncScript()` returns a STRING, and a `<head>` script cannot import a module — so
> the delivery step is a build-time injection, not a copy-paste. Four repos hand-rolled the
> whole block for want of this paragraph, one of them a byte-for-byte transcription of the
> emitted default that goes stale the moment the emission changes.
>
> In Vite, that is a ~10-line `transformIndexHtml` plugin in `vite.config.ts`:
>
> ```ts
> import { darkModeSyncScript } from "@mkbabb/glass-ui/dark";
> import type { Plugin } from "vite";
>
> function darkModeStamp(): Plugin {
>     return {
>         name: "app:dark-mode-stamp",
>         transformIndexHtml: () => [
>             {
>                 tag: "script",
>                 children: darkModeSyncScript(/* { defaultDark: { absent: false, auto: "os" } } */),
>                 injectTo: "head-prepend",
>             },
>         ],
>     };
> }
> ```
>
> `head-prepend` is the point: the stamp lands ahead of every stylesheet and every module, so
> the first paint is already correct. The options object is where a policy goes — a briefing
> that must not follow the projector passes `defaultDark: false`; a capture pipeline adds
> `queryOverride: true`. glass-ui's own demo is wired exactly this way
> (`vite.config.ts`, plugin `glass-ui:dark-mode-stamp`), so the recipe is the one we run.
>
> Under a `script-src 'sha256-…'` CSP, hash the emitted string once at build time rather than
> pinning a literal you maintain by hand — it is the same string on both sides.

Lane R may lift that block verbatim.

## Fence

Files this lane created or modified, and no others:

- `src/composables/dark/darkModeSyncScript.ts`
- `tests/composables/dark/darkModeSyncScript.test.ts`
- `vite.config.ts`
- `docs/tranches/BK/execution/2026-09-17-o20-cure/D/RECORD.md`

`index.html` was not needed and not touched. `MIGRATION.md` was read and not edited — its
recipe rides the section above, per the lane table. No sibling repo was written; the only
sibling-adjacent reads were the ledger's own quoted findings. No git verb but `status`,
`diff`, `rev-parse`, `show` (read) ran. No build ran; the `dist/` lock was never taken and
never held. No browser was opened. The dev server started for the live capture was stopped
(`pgrep` → none). Scratch work lives in
`…/scratchpad/laneD/`, outside the repo. The foreign dirty paths in the closing porcelain —
17 at the time of writing, 18 at close, incl.
`tests/components/ui/slider/attrs-pointerdown-channel.test.ts` — belong to Lanes C2 and E2
(C1 and E1 landed in batch 1 at `46ab4124` with zero dirty paths) and were neither opened nor
mentioned beyond this line.

## Residue

1. **The built demo is still unstamped.** `demo/vite.demo-dist.config.ts:58` needs the
   plugin in its `plugins` array (it is exported as `darkModeStamp` from `vite.config.ts`
   for exactly this — `import { darkModeStamp } from "../vite.config"`, or a two-line local
   copy if importing the root config from a standalone one is unwanted). One line, outside
   this fence. Until it lands, `dist-demo/index.html` greps 0 for the stamp and the
   paint-judge's built bytes still carry the FOUC. Owed to whichever lane owns `demo/`.
2. **The bundle ratchet will need its batch-close rebind, and this lane's contribution is
   measured**: `darkModeSyncScript.d.ts` **1,907 → 2,803 B (+896)**. Derived, not estimated —
   `tsc --ignoreConfig --declaration --emitDeclarationOnly` on the `HEAD` source reproduces
   the published 1,907 B exactly, and on the cured source emits 2,803. The `dark` chunk also
   grows by the emission-builder bytes, which cannot be measured without a build, so this
   figure is a FLOOR on the lane's ratchet cost, not the whole of it. `.bundle-ratchet` still
   reads `2549378` and was not touched.
3. **`unknown` stored values resolve LIGHT, not the platform** — struck in place above but
   not cured, because the ledger's cure list does not carry it and a lane does not mint its
   own rows. It is a real divergence between the module and vueuse's `useColorMode`, which
   treats an unknown mode as `auto`. Someone's ruling to make.
4. **`classList.toggle("dark", d)` can be called with `undefined`** on an engine without
   `matchMedia` (`d` is then `undefined`, and the DOM treats an absent second argument as
   "toggle"). Pre-existing at every published version, unchanged by this lane. The two
   spellings do NOT behave alike, measured with a DOM-accurate toggle (`undefined` ⇒ FLIP)
   on a `matchMedia`-less engine: the scalar `"os"` passes `undefined` for both absent and
   `"auto"` and flips the class; the object form passes `false` on ABSENT — the `||` between
   the two arms coerces the left arm — and `undefined` on `"auto"`. Two spellings of one
   `"os"` policy therefore paint differently on that engine. Pre-existing hazard on the
   scalar, partly inherited by the object form, not cured (no `!!` minted); the repo harness
   models `toggle` as `on ? add : delete` and cannot see this class.
5. **`storageKey` stays**, per the ledger — same object, same zero-caller count, no change.
6. **The READ side is fail-CLOSED and stays that way.** `getItem` is the first statement
   inside the one `try`, so a throwing accessor (privacy mode, a sandboxed origin) skips the
   whole body and the page is unstamped — measured on the published 9.0.0 and on the cured
   emission alike: `dark=false, colorScheme=""`, for the default arm and the normalize arm
   both. Pre-existing at every published version; UNCURABLE under the byte-identity
   constraint, because an inner `try` around the read moves the 300 B default and re-pins its
   CSP hash, which the ledger forbids. Struck in place at
   `darkModeSyncScript.ts` (the emission comment) and owed a ruling: is a one-time re-pin of
   the DEFAULT emission's CSP hash ever acceptable, or does the read stay fail-closed
   forever? This lane cured only the WRITE side.

## CURE ROUND 1 — 2026-09-17

**Seat** cure · **model** `claude-opus-5` (asserted from this seat's OWN transcript,
`~/.claude/projects/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/subagents/workflows/wf_4cc3afc1-169/agent-a0de0fd4d188d8de1.jsonl`,
the `"model"` field; found by grepping the workflows tree for `scratchpad/adjD`, a phrase
unique to this cure prompt — the parent session file is the wrong datum) · **adjudicator**
`claude-fable-5-1`, read-only · **base** `master` @ `46ab4124`, tree state unchanged from the
implement seat's close.

The assertion gates the chain: re-read from the transcript and matched against
`claude-opus-5*` with `&&` at the head of the step-0 baseline re-take and of the verify
chain. Step-0 baseline for this round, before any byte: the porcelain listed 18 foreign
modified/untracked paths plus this lane's three fenced files and this `D/` directory;
`git diff --stat` showed `486 insertions(+), 69 deletions(-)` across 18 files; `HEAD`
`46ab4124`. Nothing of another lane's was opened.

### What changed — eight cures, prose and one comment, no code moved

1. **`RECORD.md` act (c) for Lane R** — "No consumer re-hashes anything for this cure." was
   FALSE and Lane R would have lifted it into MIGRATION. Replaced with the measured truth:
   the four opt-in byte COUNTS are unmoved (229/228/402/361) and three hashes are unmoved,
   but `{normalize:true}` REORDERS its bytes, so its CSP hash moves
   `sha256-Xtel8uEYWeIEsJMO4TZWEump78fncLVrH4/fe166vIw=` (9.0.0) →
   `sha256-BxbpMykpiKP/WPfTsYpbpPpSCTecT50SMXFVFNrMGrw=` (cured). A consumer pinning the
   normalize emission under `script-src 'sha256-…'` re-pins at the bump or is blocked at
   first paint.
2. **The `{normalize:true}` census row** — "(the statement moved, the bytes did not)" →
   "(byte COUNT unmoved; the bytes reorder, so the hash moves — see (c))".
3. **`darkModeSyncScript.ts`, the emission comment** — dated strike in place on "the page
   degrades to prefers-color-scheme". It is false: `getItem` is the FIRST statement inside
   the one `try`, so a throwing accessor skips the whole body and nothing is stamped. Only
   the WRITE side is fail-open after this pass. A comment, so no emitted byte moves.
4. **Residue 6 added** — the read-side fail-closed defect, stated as pre-existing, uncurable
   under byte-identity, and owed a ruling.
5. **Residue 4 rewritten** — the "SAME shape as the scalar one" parity claim was false; the
   measured asymmetry replaces it.
6. **Foreign-dirt attribution** (two places) — "Lanes C1, C2, E1, E2" → "Lanes C2 and E2"
   (C1 and E1 landed in batch 1 at `46ab4124` with zero dirty paths); "17 foreign paths" →
   17 at the time of writing, 18 at close, incl.
   `tests/components/ui/slider/attrs-pointerdown-channel.test.ts`.
7. **The export sentence** — "No export name is added, removed or renamed" → "No PUBLISHED
   export name …; `vite.config.ts` (unpublished, dev-only) gains the named export
   `darkModeStamp`, the hook Residue 1 needs". The same sentence in the seat's return to the
   driver is corrected the same way.
8. **Two citations** — `publish-900/dist/dark.js` → `dist/dark.js` (the barrel) →
   `dist/dark-CLlmo7dD.js` (the emitter); `:311` → `:311` at HEAD `46ab4124`, `:319` in the
   cured file.

### Re-measured at this seat, not taken on the adjudicator's word

Both source files loaded through Node's own type stripping (`HEAD` via `git show`, cured from
the tree), every figure derived:

```
default                HEAD  300 VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8= | CURED  300 VTba/T+6rX/y5+Gk2oyLaaYBdLf4xSZtXnc7kMYziI8= | IDENTICAL
{defaultDark:false}    HEAD  229 qhpAfju9UAwqj2RfWpOZO9EulLGgZ5V71iPcTGTY3zw= | CURED  229 qhpAfju9UAwqj2RfWpOZO9EulLGgZ5V71iPcTGTY3zw= | IDENTICAL
{defaultDark:true}     HEAD  228 manehYcswRzcI9LxUb8B/PXRoWvHIJReiR2pNGvOG54= | CURED  228 manehYcswRzcI9LxUb8B/PXRoWvHIJReiR2pNGvOG54= | IDENTICAL
{queryOverride:true}   HEAD  402 T/HYS7zqh/wi4E0o0R4IStRZF6TYhOjMFduJeli2HpI= | CURED  402 T/HYS7zqh/wi4E0o0R4IStRZF6TYhOjMFduJeli2HpI= | IDENTICAL
{normalize:true}       HEAD  361 Xtel8uEYWeIEsJMO4TZWEump78fncLVrH4/fe166vIw= | CURED  361 BxbpMykpiKP/WPfTsYpbpPpSCTecT50SMXFVFNrMGrw= | BYTES DIFFER
```

The published 9.0.0 emitter (`publish-900/dist/dark-CLlmo7dD.js`, the barrel's `n` export)
agrees with `HEAD` on both figures it emits: default `300 / VTba/T+6rX/…`, normalize
`361 / Xtel8uEYWeIEsJMO4TZWEump78fncLVrH4/fe166vIw=`. So the hash that moves is the SHIPPED
one, not an intermediate.

The read-side claim behind cure 3, on a `Storage` whose `getItem` throws:

```
throwing getItem PUBLISHED default   {"dark":false,"colorScheme":""}
throwing getItem PUBLISHED normalize {"dark":false,"colorScheme":""}
throwing getItem CURED     default   {"dark":false,"colorScheme":""}
throwing getItem CURED     normalize {"dark":false,"colorScheme":""}
```

Nothing stamped, before or after. The strike is honest and the cure list does not carry a fix.

The asymmetry behind cure 5, with a DOM-accurate `toggle` (`undefined` ⇒ FLIP) on an engine
with no `matchMedia`:

```
scalar "os"                      | NO matchMedia: absent -> DARK   auto -> DARK
object {absent:'os',auto:'os'}   | NO matchMedia: absent -> light  auto -> DARK
object {absent:false,auto:'os'}  | NO matchMedia: absent -> light  auto -> DARK
```

Two spellings of one `"os"` policy, two paints — and on the scalar the flipped class even
disagrees with `colorScheme="light"`, which the same run shows. Recorded, not cured.

### Verify — verbatim, real exit codes (not a piped tail's)

```
$ npx vue-tsc --noEmit -p tsconfig.json
tsconfig.json exit=0
```

```
$ npx vue-tsc --noEmit -p tsconfig.test.json
tsconfig.test.json exit=0
```

```
$ npx vitest run tests/composables/dark/darkModeSyncScript.test.ts
 Test Files  1 passed (1)
      Tests  21 passed (21)
LANE_EXIT=0
```

The byte-identity arm (now `:319`) is among those 21 and is green — which is the guard on
cure 3 having moved no emitted byte.

```
$ npx vitest run
 Test Files  228 passed (228)
      Tests  2199 passed | 10 expected fail (2209)
BATTERY_EXIT=0
```

Zero REDs to attribute. The total moved +1 against the adjudicator's `2198 | 10 (2208)`: a
foreign lane added one arm to a test file it already had dirty between the two runs (this
lane's file is 21 both times, and no path entered or left the porcelain). The `10 expected
fail` is the standing xfail count, unmoved.

```
$ node scripts/gate-register.mjs
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
REGISTER_EXIT=0
```

`seats:60`, `violations:0`, byte-identical to the baseline receipt. Nothing minted in this
round — no G-id, no seat, no arm; the round wrote prose and one comment.

### Fence, this round

- `src/composables/dark/darkModeSyncScript.ts` — cure 3 only (comment).
- `docs/tranches/BK/execution/2026-09-17-o20-cure/D/RECORD.md` — cures 1, 2, 4, 5, 6, 7, 8.

`tests/composables/dark/darkModeSyncScript.test.ts` and `vite.config.ts` were re-run and NOT
edited. `index.html` and `MIGRATION.md` untouched. `.bundle-ratchet` untouched. No git verb
but `status`, `diff`, `rev-parse`, `show` (read). No build, no lock taken, no browser opened.
Scratch at `…/scratchpad/laneD-cure/`, outside the repo.

Fence numstat at close, up from the implement seat's `47/11 · 138/1 · 25/1`:

```
55	13	src/composables/dark/darkModeSyncScript.ts
138	1	tests/composables/dark/darkModeSyncScript.test.ts
25	1	vite.config.ts
```

The source moves by cure 3's ten comment lines and nothing else.

### Residue carried out of this round

Unchanged: Residue 1 (the built demo is still unstamped — `demo/vite.demo-dist.config.ts`
needs `darkModeStamp`, one line outside this fence; CUT-8 is HALF-DELIVERED, dev server
stamped and built demo not), 2 (ratchet rebind, `+896 B` floor on the `.d.ts`), 3 (unknown
stored values resolve LIGHT), 4 (as rewritten above), 5 (`storageKey` stays), and the new 6
(the read side is fail-closed and stays so under byte-identity). Lane R additionally owes
the `{normalize:true}` hash sentence in MIGRATION §8.1.0 (b)/(c) — it is written in (c)
above, ready to lift.
