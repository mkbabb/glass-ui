# rida.dev: the input and render half

Read by claude-opus-5-5 on 2026-11-22 for BM part 1 (`docs/tranches/BM/CHARTER.md`). The sources are the post `study/source/rida/blog.html` (rendered at https://rida.dev/blog/bypassing-ios-safari-60-fps-limit) and the 74 chunks in `study/source/rida/assets/`, fetched 2026-11-22 15:19. I read the post in full. I formatted the chunks with the repo's js-beautify into a scratch copy for reading, but every citation points at the original minified file.

**Citation key**

- `blog:N` is line N of `study/source/rida/blog.html`.
- `blog:43@C` is column C of line 43, the inline `<style>`.
- `file@N` is byte offset N in `study/source/rida/assets/file`. Every chunk is a single line, so the offset locates the code.

**What this read is not.** I ran no browser, and nothing here is an iPhone reading. Each rate below is one of two things: the author's own iPhone report, cited to the post, or a value derived from the code's constants. The real readings are owed to the owner's iPhone (section 12).

---

## 1. What the post claims, and what stands behind each claim

| Claim | Where | Standing |
|---|---|---|
| On iOS, WebKit holds `requestAnimationFrame` to 60 Hz on a 120 Hz screen unless the user turns off "Prefer Page Rendering Updates near 60fps". Touch and pointer events on a normal page are held to the same rate. | blog:83 | Partly corroborated by WebKit bug 294338: the internal preference `PreferPageRenderingUpdatesNear60FPSEnabled` exists (comment 17), a Home Screen web app gets 60 fps with default settings (comment 6, Simon Fraser), and 120 fps with the setting off (comment 7). The event-rate half is the author's. |
| Scroll events arrive 5–26 times per second during momentum, and close to 60 on slow scrolls ("iPhone Duo"). | blog:99 | Author only. |
| A self-calling MessageChannel gave 50,000 reads/s but only 80 distinct values, and pinned a core. | blog:101 | Author only. |
| Atomics at the refresh rate also gave 80 distinct values, but needs SharedArrayBuffer and therefore COOP/COEP. | blog:102 | Author only. None of the 74 chunks uses `Atomics` or `SharedArrayBuffer` (grep). |
| The shipped loop: MessageChannel plus a `setTimeout` to the next tick at the refresh rate, phase-locked to rAF timestamps. iOS rounds `performance.now()` to 1 ms, so the minimum interval is derived from the refresh interval. Result: 80 reads/s. | blog:103–104 | Matches the code (section 3.1). I found no independent source for the 1 ms rounding. |
| Safari's UI process sends one scroll position at a time and waits for an acknowledgement. It flushes without waiting on any tick with a rendering update queued, so an empty rAF loop gave about 12.5 % more reads, 90 unique per second. | blog:105–106 | This is the author's reading of WebKit source. I did not verify it. |
| ProMotion stays at 90 Hz. A GPU CSS animation allows 120 Hz only while something scrolls, so a tiny invisible smooth scroller holds 120 Hz. | blog:107–108 | Author only. Matches the code (section 3.3). |
| The tricks are kept for moments when animation is expected. | blog:109 | Matches the code (section 3.8). |
| Without momentum, rubber-banding or snap, a passive `touchmove` on the controller "fires at the full 120 Hz". | blog:110 | Author only. The shipped code never reads input from `touchmove`; it uses it only to wake loops (registry@16478, mount-post-contents@27726). |
| `scrollTop` and `scrollLeft` round to integers. Fix: scale the scrollable surface by the DPR. The viewport alternative is `initial-scale`, units scaled by the DPR, text autosizing off, safe areas scaled, and small selection handles. | blog:113–114 | This page ships the viewport alternative on iOS (section 3.4). |
| When the page itself is the controller, scroll reports drop to 10 Hz during the URL-bar resize. A scroll-driven animation of a non-GPU property avoids this; the page animates between two transparent colours. | blog:117 | Author only. Matches the code (section 3.5). |
| After `transferControlToOffscreen`, the canvas element becomes a placeholder, and WebKit, "following the HTML specification's recommendation", skips waiting for the next rendering pass when the OffscreenCanvas pushes a frame. Result: 120 fps canvases. | blog:133–135 | The HTML spec says implementations "are encouraged to short-circuit the graphics update steps of the window event loop" (https://html.spec.whatwg.org/multipage/canvas.html#the-offscreen-2d-rendering-context). The normative path updates the placeholder during the window's update-the-rendering steps, so waiting would also conform, as the author concedes (blog:172). |
| Earlier attempts (flip-books, live video, broken workers) were laggy, jagged, or crashed WebKit through memory use. | blog:131 | Author only. |
| Glass: snapshot the page at load into a WebGL texture, composite it, and sample the region under each component. rAF demos update the texture from the main thread; OffscreenCanvas demos post frames from their workers straight to the texture's worker. | blog:141–145 | Matches the code (sections 5.5 and 6). |
| Tab bar: one controller per button, each sending timestamped events. A short history decides drag versus tap and gives speed, and a state machine turns events into a frame every frame. | blog:151–159 | Matches the code (sections 3.7 and 4). |
| An iPhone 18 Pro, filmed at 240 fps and slowed to an eighth, averaged 118 fps with the controller against a steady 60 with pointer events, over 3 s of dragging. | blog:166–168 | Author only. The chart plays the recording at 30 fps (frame-comparison-config@465, @233). |
| Apple could make the placeholder wait for the main-thread rendering pass at any time, without violating the spec. | blog:172 | The spec reading above agrees. |

---

## 2. The pipeline in one picture

```
finger
  └─ invisible scroll container, the "controller"     the compositor runs momentum, bounce and snap
       │  scrollLeft / scrollTop: integer CSS px, scaled by the DPR for sub-point precision
       ▼
  main-thread sampler: MessageChannel → setTimeout    240 slots/s, phase-locked to rAF timestamps, 1 ms lead
     + an empty rAF loop (flushes the UI→web scroll IPC; also supplies the vsync phase)
     + a display boost: a 1-px transform animation plus an 8-px smooth scroller every 250 ms
       │  {left, top, at}, sent only when the position changed
       ▼
  sample history (ring of 32) → velocity over the last 80 ms → drag or tap → state-machine step
       │  postMessage({type:'frame', state, sequence}); at most 2 frames in flight
       ▼
  glass.worker: WebGL2 on a transferred OffscreenCanvas
       │  draws at least 6.25 ms apart; fenceSync polled every 1 ms
       │  ← page snapshot: the DOM serialised to a display list and repainted in the worker
       │  ← live sources: other workers' canvases and videos, as ImageBitmaps over MessagePorts
       ▼
  the placeholder <canvas> presents without waiting for the page's rendering update (WebKit behaviour, blog:133)
       │  postMessage({type:'presented', sequence}) → back-pressure on the main thread
```

Two facts about where work runs bound every judgement below:

1. **The native scroller moves on the compositor. Everything derived from it runs on the main thread.** Sampling, the state machine, layout reads and frame assembly all happen there. The worker only rasterises. A blocked main thread freezes the lens while the scroller under it keeps moving.
2. **A lens or shape that only needs scroll position does not need any of this.** The post's own first demo shows a plain scroller already moving at compositor rate (blog:87–89). The sampler earns its cost only for values computed in JavaScript per frame: lens stretch toward the finger, a spring settle seeded with the release velocity, shader uniforms.

---

## 3. The controller, traced

### 3.1 The sampler (scroll-bus)

The whole sampler is `scroll-bus@108`–`@1000`, about 600 bytes minified.

- **Slot.** `n = 1000 / displayHz / samplesPerFrame` = 1000/120/2 ≈ 4.17 ms (scroll-bus@108; `displayHz: 120` at sample-history@58; `samplesPerFrame: 2` at @72).
- **Phase.** `r(e, r) = e + ceil((r − e + leadMs) / n)·n − leadMs` (scroll-bus@153). It returns the first slot boundary at or after time `r`, counted from the last rAF timestamp `e` and taken `leadMs` = 1 ms early (sample-history@90).
- **Empty rAF loop.** `m = t => { l = t; u = requestAnimationFrame(m) }` (scroll-bus@308) stores the timestamp and nothing else. It is the post's "empty requestAnimationFrame loop" (blog:105), and it also supplies the vsync phase.
- **Tick.** Each message on port1 computes `d = r(l, max(now, d + n/2))` and then calls `setTimeout(g, max(0, d − now))` (scroll-bus@654, @662). The `d + n/2` floor keeps reads at least 2.08 ms apart even when the clock is coarse.
- **Read.** `g` calls `read()`. If `left` or `top` changed, it calls `onFreshReading({left, top, at})` and ticks "controller position" (scroll-bus@484). If nothing has changed for `settleMs`, it idles: it cancels the rAF loop and calls `onIdle` (scroll-bus@522). Otherwise it posts to port2, which schedules the next slot.
- **Wake.** `wake()` (scroll-bus@711) resets the change clock, starts the rAF loop and reads once.
- **Why the MessageChannel hop (my reading; the post gives no reason).** Each `setTimeout` is queued from a message task, not from a timer callback, so its nesting level stays at 1. The HTML timer clamp to 4 ms applies only past nesting level 5 (https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers; I recalled the spec text and did not re-fetch it for this read).
- **The grid is extrapolated.** rAF fires at 60 Hz on iOS (blog:83), so the 4.17 ms grid is extended forward from 16.7 ms vsync timestamps. `displayHz` is the constant 120. On a 60 Hz screen (no ProMotion, or Low Power Mode) the loop still wakes 240 times a second.
- **Two buses publish positions:** scroll positions `o` (scroll-bus@1023) and translate offsets `c` (scroll-bus@1080). The page snapshot reads both to pan its layers (section 6.2).

Arm and disarm:

- **Demo controllers** wake on `pointerdown touchstart wheel scroll` (registry@6604). They idle after `idleMs` = 1000 (sample-history@99; snapshot demo mount-page-snapshot@17381).
- **Tab pans** wake on `pan.wakeEvents` = `pointerdown touchstart wheel` (glass-nav-config@4210) and on press. They idle after `pan.settleMs` = 200 (glass-nav-config@4148).

### 3.2 The draw loop (scroll-pan `o`)

A second copy of the same scheduler steps the tab-bar demos and the Contents menu (scroll-pan@~290–1900).

- **Gate.** It runs only on iOS: `'GestureEvent' in window` (scroll-pan@238) selects the MessageChannel+`setTimeout` path. Elsewhere it uses a plain rAF through the island's presence object (scroll-pan@1335). MDN describes `GestureEvent` as "a proprietary interface specific to WebKit" (https://developer.mozilla.org/en-US/docs/Web/API/GestureEvent).
- **Vsync phase.** It takes the phase from its own boost rAF loop, tagged "loop boost frame" (scroll-pan@671).
- **Step and park.** `step(now)` returns `{drew, animating}`. If nothing animates and nothing has drawn for `parkAfterMs` = 400 (glass-nav-config@4317), it calls `park()` and stops. The boost is released `holdMs` = 1000 later (glass-nav-config@4306, read at scroll-pan@1068).
- **Pinning.** `pinBoost(true)` keeps the boost on (scroll-pan@1859). The Contents menu pins it while open (mount-post-contents@38692; `boost.whileOpen` at post-contents-config@20771).
- **Off-screen pause.** It pauses when its island leaves the viewport or the tab is hidden (demo-presence: an IntersectionObserver plus `visibilitychange`, toggling `data-dormant`).
- **Minimum draw gap.** `1000/120 − (1000/120)/2/2` = 6.25 ms (scroll-pan@223; the same function appears at glass.worker@23988). This is the post's "minimum time between draws derived from the refresh interval" (blog:103).

### 3.3 The display boost

All three parts are iOS-only (gated on `GestureEvent`).

1. **Rate mark.** A `<span class="demo-rate-mark">`, one `--px` square, with `background: color-mix(in srgb, currentColor 1%, transparent)` and `animation: 1s linear infinite demo-display-rate` (blog:43@12773). The keyframe is `to {transform: translateX(var(--px))}` (blog:43@13008): a compositor transform animation that moves one pixel per second.
2. **Pacer.** A `<div class="demo-display-pacer" aria-hidden="true">`, 8 `--px` square, with `overflow: scroll`, `pointer-events: none` and a hidden scrollbar. Its child is 400 px tall and `visibility: hidden` (blog:43@22512, @22753; document-page-speed@89, @125). `pace(t)` calls `scrollTo({top: forward ? 200 : 0, behavior: 'smooth'})` no more than once every 250 ms, alternating direction (document-page-speed@335; `periodMs: 250` and `travelPixels: 200` at post-contents-config@17266, @17279). While the boost is on, something is always smooth-scrolling.
3. **Arming.**
   - **Page-wide.** islands.js installs one boost when it loads (`_()` at islands.js@9861; iOS gate at @2921). A `touchstart` on `window` (capture, passive; @3579) attaches the rate mark and starts a rAF loop that calls `pacer.pace(t)` every frame ("display boost frame", @3290). When `touchend` or `touchcancel` leaves zero touches, the boost releases after `releaseAfterMs` = 1000 (post-contents-config@17297; islands@2495). On iOS, every touch on the page holds the boost for its duration plus one second.
   - **Per loop.** scroll-pan's `y()` attaches the rate mark to its host and runs its own pacer while the loop runs, releasing it 1000 ms after park unless pinned (scroll-pan@502).
   - **Controller demos** render the rate mark while `interacting` (registry@8077).

The post's stated reason (blog:107–108): a GPU CSS animation allows 120 Hz only while something scrolls, and the pacer supplies the scroll.

### 3.4 Sub-point precision

**Scaled scroller (demos).** The rule is:

```css
.demo-scaled-scroller {
  width: calc(100% * var(--pixel-ratio));
  height: calc(100% * var(--pixel-ratio));
  transform: scale(calc(1 / var(--pixel-ratio)));
  transform-origin: 0 0;
}
```

(blog:43@10645). `--pixel-ratio` is `device / layout` (registry@3734, @3660), so `scrollTop` counts device pixels. Readings are divided back by the same ratio. The precise variant sets `scaledToDevicePixels: true` and shows positions to 2 decimals (sample-history@208, @232).

**Device-pixel viewport (the whole page, on iOS).** The inline head script (blog:1–43) runs before first paint.

- **Condition:** `'GestureEvent' in window`, `(pointer: coarse)` matches, and the DPR is above 1 (blog:4; viewport-config@287, @320).
- **Meta rewrite:** it writes `width=device-width, initial-scale=1/DPR, minimum-scale=1/DPR, maximum-scale=1/DPR, user-scalable=no` (blog:11).
- **State:** it sets `--screen-unit` to the DPR and `data-viewport` to `device-pixels` (blog:14–15).
- **Fallback:** if `clientWidth` did not grow by the DPR, it reverts to points (blog:25).
- **Guard:** a MutationObserver on `<head>` re-claims the meta tag if anything changes it (blog:33–42).

The CSS then multiplies every length by the unit:

- `--unit: var(--screen-unit)` under `@media screen` (blog:43@5876)
- `--px: calc(1px * var(--unit))` (blog:43@4424)
- safe areas as `env(safe-area-inset-*) * var(--unit)` (blog:43@4453)
- `html { font-size: calc(100% * var(--unit)); text-size-adjust: 100% }` (blog:43@3534)

Both `layout` and `device` resolve to the DPR (color-scheme@330). The result is that the document's own `scrollTop` counts device pixels, which makes the page itself a sub-point controller for the Contents glass.

**Canvas sizing.** device-pixel-canvas rounds the canvas box to whole device pixels and translates by the leftover fraction (device-pixel-canvas@20, @182). It re-measures on a ResizeObserver over both the canvas and the root (@530). DPR changes are caught by a `(resolution: Ndppx)` media query that re-arms itself (watch-pixel-ratio@28).

### 3.5 The URL-bar throttle

`.post-contents` is the fixed Contents button. It carries `animation: linear both post-contents-keep-scroll-fresh; animation-timeline: scroll(root)` (blog:43@21573, @21757), with:

```css
@keyframes post-contents-keep-scroll-fresh {
  0% { outline-color: #0000 }
  to { outline-color: #0000 }
}
```

(blog:43@22032). It is an invisible, non-composited property animated on the root scroll timeline. The post says that with such an animation in place, WebKit skips the 10 Hz throttle on reported scroll positions during the URL-bar resize (blog:117).

Scroll-driven animations shipped in Safari 26.0 (https://webkit.org/blog/17333/webkit-features-in-safari-26-0/). Older Safari ignores the rule, and the throttle comes back.

### 3.6 Waking on page scroll

**Tripwire** (scroll-tripwire@39054).

- It requires the document to be the page scroller and throws otherwise (@39185).
- It appends a hidden probe div to `<body>`: absolutely positioned, 1 px wide, `opacity: 0`, `contain: strict`, `pointer-events: none` (@39467).
- `arm()` places the probe at the current `scrollTop − e` with height `2e`, where `e` = `reachDevicePixels / DPR` = 4/DPR CSS px (@39726; `reachDevicePixels: 4` and `thresholds: [.05, .95]` at post-contents-config@21432, @21452).
- An IntersectionObserver with those thresholds (@39504) calls `tripped()` once the page has moved about four device pixels.
- It is armed whenever the Contents loop parks (mount-post-contents@37133). It stands in for a `scroll` listener as the scroll-start detector.

**Window events.**

- `touchstart touchmove touchend touchcancel wheel keydown pointerdown` wake the Contents loop (mount-post-contents@27726). The exception is a touch that starts inside an inner scroller that contains it.
- `hashchange popstate pageshow focusin` also wake it, as does an IntersectionObserver over the article's children with thresholds 0, .25, .5, .75 and 1 (post-contents-config@21038).

### 3.7 Endless pans, halts and detents (the tab bar's input side)

- **Endless pan** (scroll-pan `r`, @~4500–7000).
  - The content is a 400,000 px square (`pan.extent: 4e5`, glass-nav-config@4148).
  - It starts centred on a 120 px period.
  - After 150 ms without a touch (`pan.idle`), it subtracts whole periods from `scrollLeft`/`scrollTop` and carries an offset, so readings stay continuous (`onRecentre`, scroll-pan@5154).
  - A press records an origin. Held samples are read on every loop step (`heldSamples`, @5749).
- **Momentum halt.** It sets `overflow: hidden`, restores the position, and re-enables scrolling after N rAFs (scroll-pan@4402; `haltFrames: 1`). This runs when a press ends, giving the post's 1:1 trackpad (blog:92), and when a tab settles (`freezeFrames: 1`, glass-nav-config@4020).
- **Tab detents** (dock-input@1259–1888).
  - Each tab has a horizontal controller with `scroll-snap-type: x mandatory`, `scroll-snap-stop: always` and 97 snap cells, each one tab wide: `travelTabs: 48` gives 2·48+1 (@1481; glass-nav-config@4043).
  - There is 200 pt of slack on each side (@4057).
  - The finger's x is recovered from `scrollLeft` as `thumb = index·extent + (base − scrollLeft) / pitch · extent`.
  - The same controller's vertical axis is an endless pan, used for pulling the bar.
  - A drag starts once the thumb leaves rest by 0.5 device px (`followSlop`, @4082).
  - The controllers are `div`s with an `aria-label` and no role (dock-input@409). `contextmenu` is prevented (@5898).
- **Desktop.** A mouse drag on any nested scroller becomes a scroll (scroll-pan@2760–3300; constants `mouseDrag` at glass-nav-config@4408).
  - The threshold is 6 px.
  - On release it flings smoothly, projected 160 ms ahead from the last 80 ms of motion.
  - Snap is switched off during the drag and restored for the fling.
  - The trailing click is swallowed, and `dragstart` and `selectstart` are prevented.

### 3.8 When each trick is on

| Trick | Armed by | Disarmed by | Gate |
|---|---|---|---|
| Sampler (scroll-bus) | `wake` on pointerdown, touchstart, wheel or scroll; or a press | no position change for 200 ms (pans) or 1000 ms (demos) | none (runs on every platform) |
| Empty rAF loop | starts with the sampler | stops with the sampler | none |
| Draw loop (scroll-pan) | `wake` (touch or scroll on its stage; for Contents, any window touch, wheel or keydown, the tripwire, or a page wake event) | 400 ms without a draw or animation, then park | MessageChannel path on iOS only |
| Loop boost (rate mark plus pacer) | the loop starting | 1000 ms after park, unless pinned | iOS (`GestureEvent`) |
| Page-wide boost | any `touchstart` on `window` | 1000 ms after the last touch ends | iOS (`GestureEvent`) |
| Pinned boost | the Contents panel opening | the panel closing | iOS |
| URL-bar animation | always on (CSS) | never | engines with scroll-driven animations |
| Tripwire | loop park | firing (wakes the loop) | none |
| Device-pixel viewport | page load | never | iOS (`GestureEvent`, coarse pointer, DPR above 1) |
| Refresh probe | 1 s after load, on touch, on tab return | after 4 attempts or a verdict | iOS Safari (pacer probe); Android (frame-gap probe) |

---

## 4. Sample history and velocity

- **Buffer.** A ring buffer of 32 samples (`history.capacity` at glass-nav-config@4097; `metrics.historyCapacity` at sample-history@408). It throws if given room for fewer than two samples (@1367).
- **Velocity.** `velocity(now, windowMs, msPerSecond)` keeps the samples from the last 80 ms and returns `(last − first) / (Δt / 1000)` in pt/s, or zero with fewer than two samples (sample-history@1562). It is an endpoint difference with no fitting.
- **Tab gesture** (dock-input `_`). Events are `barPressed`, `thumbSampled`, `barPulled`, `barReleased`, `settled`, `returned` and `searchPressed`/`searchDragged`/`searchReleased`. Each is recorded with `at = performance.now()` and the finger point. A new press clears the history.
- **Readout.** reads/s and unique/s are counted over a 500 ms window (`rateWindowMs`). Speed comes from velocity over 80 ms. The readout settles after 100 ms (sample-history@332–369).
- **Page speed** (document-page-speed `t`). It computes points per second of page `scrollTop` over the last 100 ms, and calls the page "resting" at or below 1000 pt/s (@882, @909). This speed is used to defer heavy work:
  - Islands mount only after 250 ms (idle) or 60 ms (urgent) of scrolling at 30 pt/s or less. The check runs every 30 ms, and urgent work waits at most 250 ms (islands@3921–3971).
  - The snapshot rebuilds only after 150 ms at 30 pt/s or less (post-contents-config@21230).

---

## 5. The render path

### 5.1 Workers

| Worker | Started by | Canvas | Draws when |
|---|---|---|---|
| `glass.worker` (112 KB) | boot-post-contents@7731 (Contents glass); the tab-bar shader step through the same function | transferred; WebGL2 | it receives a `frame` message |
| `offscreen-canvas.worker` (10 KB) | mount-grid-renderer@1298 | transferred (canvas-worker@24); 2D | it receives each `draw` message |
| `playhead.worker` (13 KB) | frame-comparison demo | transferred; 2D | it receives each message |
| `snapshot-preview.worker` (54 KB) | mount-page-snapshot@5004 | transferred (@5120) | explainer for the composite (a 3D exploded stack) |
| `frame-gap.worker` (0.3 KB) | mount-post-contents@5087 | 1×1, transferred; rAF inside the worker | Android refresh probe only |

### 5.2 `transferControlToOffscreen`

canvas-worker@24 calls `t.transferControlToOffscreen()` and then `postMessage(init(offscreen), [offscreen])`. The glass does the same at boot-post-contents@7954, posting `{type:'warm', canvas, desynchronized, programs:'layered', underlay}` (@7993).

`desynchronized` is set to true only on iOS (@8014), detected by an `iPhone|iPad|iPod` user agent or `MacIntel` with more than one touch point (@7633). Whether WebKit honours `desynchronized` on a WebGL context is not established by this read.

### 5.3 How the glass worker presents

- **Context.** `getContext('webgl2', {antialias:false, alpha:true, premultipliedAlpha:true, preserveDrawingBuffer:false, powerPreference:'high-performance', desynchronized})` (glass.worker@67639–67986). The worker throws if WebGL2 is missing (@69239).
- **Scheduling** (glass.worker@105647–106663). A `frame` message stores the state. If fewer than 6.25 ms (`drawGap`) have passed since the last draw, it sets a `setTimeout` for the remaining gap; otherwise it draws at once. A draw is deferred while the fences in flight reach `framesInFlight` = 2 (@105729).
- **Fences.** After each draw the worker calls `fenceSync(SYNC_GPU_COMMANDS_COMPLETE)` and `flush()`, then polls `getSyncParameter(SYNC_STATUS)` every 1 ms with `setTimeout` until the fence signals (glass.worker@88292–88570; `presentFences.pollMs: 1` at glass-nav-config@4383). When it signals, the worker posts `{type:'presented', sequence, at}` (@105927) and runs any deferred draw.
- **No rAF in the worker.** The frame reaches the placeholder when the worker's task ends. According to the post, WebKit then shows it without waiting for the page's rendering update (blog:133).
- **Main-thread side.**
  - A sequence counter gates posting: `isCaughtUp = posted − presented < 2` (label-tint@1042, @2844).
  - The Contents step draws only when the worker is caught up and at least 6.25 ms have passed since its last draw (mount-post-contents@36267).
  - Each step's dt is capped at 3/120 s = 25 ms (`stepCapFrames: 3`; mount-post-contents@11751; glass-nav-config@4366).

### 5.4 The OffscreenCanvas demo

The worker draws synchronously inside its `message` handler with a 2D context and no rAF (offscreen-canvas.worker@9783, @179). The main thread posts `{type:'draw', point}` for every controller reading (mount-grid-renderer@1638). Next to it, a main-thread canvas runs the identical draw (mount-grid-renderer, `canvas` mode), so the two can be compared directly.

### 5.5 Refraction port, sources and feed (live content under the glass)

- **Registry** (input-telemetry `l`, @~3000–3700). Elements register as sources with `{element, modes, connect, disconnect, capture?}`. A ResizeObserver reports their geometry changes (@3536). A glass `attach`es as a refractor. `watch(source, demand)` opens a MessageChannel (@3625), hands one port to the source through `connect`, and keeps the other.
- **refraction-port** (@58). A canvas owned by a worker registers on the main thread and forwards `connect` and `disconnect`, with the transferred port, to its worker. From then on that worker serves frames straight to the glass worker, without the main thread (blog:144).
- **Feed** (refraction-feed).
  - On a `demand` (a crop rectangle plus a target size), the source captures with `createImageBitmap(surface, x, y, w, h, {resizeWidth, resizeHeight, resizeQuality:'medium'})` (@3242, @152).
  - It posts `{kind:'frame', frame:{tiles, demand, changedAt}}`, transferring the bitmaps (@5005).
  - Flow control is by credit: one capture is outstanding at a time, and the glass sends `ready` when it can take another (@5090, @376).
  - Modes: `lazy`; `eager`, which re-captures after 1000/120 ms at rest (@266); and `pulled`, which captures on retarget.
- **Video.** `new VideoFrame(video)` is drawn into an OffscreenCanvas, then `transferToImageBitmap()` (refraction-sources@1238, @1479). It is driven by `requestVideoFrameCallback` where present (@2468), otherwise by `timeupdate`.
- **Glass as a source.** The glass worker can itself serve as a source (`type:'source'`, glass.worker@111196), so one glass can refract another.

---

## 6. The page snapshot and composite texture

### 6.1 The serialiser

A DOM walk on the main thread (scroll-tripwire `be` @8491, `xe` @14881) turns the page into a display list. It calls `getComputedStyle` on every element (@6052) and skips `SCRIPT`, `STYLE`, `NOSCRIPT`, `TEMPLATE` and `IFRAME`, as well as `display:none` and zero opacity (@580). `<svg>` is handled separately (@13452).

**Items captured:**

- `fill`: background colour. The corner radius is read from `border-top-left-radius` only (@8844).
- Each border side, as a rectangle.
- `pattern`: background `url()`, same-origin or `data:` only (@9909, @7930).
- `stripes`: only a `linear-gradient` of the exact form "colour N px, transparent N px" (@10183).
- List bullets and decimal markers.
- `image`: an `<img>` `currentSrc` or a `<video>` poster, same-origin only (@11362).
- Inline `<svg>`: rasterised with Path2D at 2× the DPR into a cached PNG data URL (@6874, @7066, @7195).
- Text runs from `Range.getClientRects()` (@1338) with font tuples. Normal flow is captured per line. Justified text, or text with `word-spacing`, is placed per word or per character (@1119, @1261).
- `::before` and `::after` string content.
- Link underlines.

**Geometry:**

- Only pure translations (`matrix(1,0,0,1,x,y)`) become pans; so do scroll containers. `position: sticky` is handled.
- `scale` and `zoom` fold into a single zoom factor.

**Not captured:** box-shadow, filters, `backdrop-filter`, general gradients, any corner radius other than top-left, rotation, skew and 3D, clip-path, masks, blend modes, cross-origin images, fonts from cross-origin stylesheets, iframes, form-control rendering, and `canvas`/`video` (which come in as live sources instead). On an arbitrary page, the glass refracts an approximation of what is underneath.

**Fonts.** `@font-face` rules are read from `document.styleSheets`; cross-origin sheets throw and are skipped. Each face is fetched again with `cache:'force-cache'` and transferred to the worker as an ArrayBuffer (boot-post-contents@7360), then loaded into the worker's FontFaceSet (glass.worker@91, @426).

**Text in the worker.** It is drawn from a GPU glyph atlas: 2048×512 A8, padding 2, 4 subpixel steps. The atlas is persisted in IndexedDB (database `glyph-atlas`, store `atlases`), saved after a 3 s delay and restored within a 60 ms budget (post-contents-config@21843–21979; glass.worker@14289, @14813, @1862).

### 6.2 Keeping it live

- **Islands** (interactive demos) are separate layers.
  - A MutationObserver over the whole body (`subtree, childList, attributes, attributeOldValue, characterData`; scroll-tripwire@21840–22047) marks an island dirty.
  - A dirty island is re-extracted at most every 100 ms (`patchGapMs`, post-contents-config@21636), and only within 120 px of the glass.
  - `tabindex` changes are ignored (@21597), and style changes that only move a translate are filtered out.
- **Pans.** The scroll and translate offsets of panning containers come from the scroll buses (section 3.1). They are batched per microtask and sent as `pans` (scroll-tripwire@22817).
- **Selection.** On `selectionchange`, the selection is redrawn into its own layer (@25961). It uses the `::selection` colours (@25061), or on iOS a `-apple-system-blue` tint at 0.2 alpha (post-contents-config@21720). Without this layer, a text selection under the glass would vanish from the lens.
- **Rebuild.** A rebuild follows a ResizeObserver change or `document.fonts` `loadingdone` (mount-page-snapshot@17825, @18123). It waits until the page is still: 150 ms at 30 pt/s or less.
- **Alignment check.** Every 400 ms the code compares three anchors (`article > *, [data-demo]`) against their recorded positions, and rebuilds beyond 240 px of drift (post-contents-config@21230–21404).
- **Texture window.** The texture holds a band of the page around the glass. The band is sized from an 8,000,000-pixel budget with a 160 px guard and 120 px hysteresis, and is at most 8192 px tall (scroll-tripwire `Ce`/`we` @15461–15833; post-contents-config@21211, @21482). At budget, that band alone is about 32 MB of RGBA8 texture (my arithmetic).
- **Composite.** The worker composites four layers (snapshot, islands, live, selection) and then runs the blur passes: frost σ 10 on 4 px cells, with `liveReach = σ · 2.5 + bezel` (post-contents-config@21138; glass-nav-config@615, @4473–4612).
- **Explainer.** The "WebGL Composite Texture + Glass" demo (mount-page-snapshot) shows the same layers as an exploded 3D stack, rendered in snapshot-preview.worker.

### 6.3 What the glass keeps in the DOM

The Contents menu keeps real DOM buttons and rows:

- `aria-expanded` and `aria-current="location"` (mount-post-contents@38269, @32997)
- `inert` on the closed panel, which also hides it (blog:43@26117)
- focus moves, and Escape closes the menu

The glass canvas itself is `aria-hidden` (post-contents-config@17028). Row text is transparent (`.post-contents-row { color: #0000 }`, blog:43@26510), and the canvas paints the visible text instead. Focus rings are DOM outlines (blog:43@23129). The menu sets `user-select: none` and `-webkit-touch-callout: none` (blog:43@22122).

The only accessibility media query in the whole site is `prefers-contrast: more`, used for the alert glyph (post-contents-config@19188). There is no `prefers-reduced-transparency` and no `forced-colors` handling (grep over all 74 chunks and blog.html).

`prefers-reduced-motion` is consulted in three places: video autoplay (mount-frame-comparison@440), one shader demo's ambient motion (shaders-step@39164), and the Contents open/close, which snaps (mount-post-contents@28624). The boost, the pacer and the samplers never consult it.

---

## 7. Telemetry

- **Tick counters** (boot-post-contents `f`). These record named counts and times. They are enabled only in `development` and `preview` (offscreen-canvas.worker@8894). The lab stroke-probe endpoints are also dev-only (@9212).
- **Input telemetry** (input-telemetry `f`). It keeps per-source `should/actual/dropped/maxLatencyMs` counts (@3802). Each frame records the inputs it consumed, and the worker reports them when the frame presents. The same chunk holds the live-source registry (section 5.5).
- **Field performance** (production). While the user interacts, the site counts glass presents per second into a histogram capped at 160 fps.
  - It reports the median, the 10th percentile, the share of seconds at or above 110 fps, long glass gaps (over 2.5 cadences), long main-thread frames (over 50 ms), platform, browser, the probe's verdict and the demos used.
  - It sends by beacon on `visibilitychange` to hidden or on `pagehide`, to Google Analytics and visitors.now (boot-post-contents@6258–6357; analytics@979–1252).
  - The author therefore has field data on glass frame rates that we cannot see.
- **Refresh-cap probe** (drives the "Limited to 60 Hz" banner: "Turn off Low Power Mode, or use an iPhone with ProMotion…", post-contents-config@18276, @18305).
  - **iOS Safari path:** starting 1 s after load, it makes up to 4 attempts of 700 ms each. Each attempt smooth-scrolls a hidden pacer and polls its `scrollTop` every 1 ms through MessageChannel+`setTimeout` (mount-post-contents@3005, @3306).
  - **Verdict:** if the intervals between prompt position steps have a median of 15 ms or more, with at least 16 intervals and 60 % agreeing, the screen counts as capped. A second test calls it capped below 62 steps/s.
  - **Banner:** a decaying score decides it (half-life 20 s; show at 1.5; hide at −2.5; latched once shown). The probe re-samples on touch and when the tab returns.
  - **Android path:** it compares main-thread rAF intervals against rAF in a worker that owns a 1×1 OffscreenCanvas (frame-gap.worker@221).
  - **No send:** the `/refresh-cap-telemetry` call is compiled to a no-op (mount-post-contents@7514).
  - Constants are at post-contents-config@17427–17948.

---

## 8. Named constants (input and render)

| Constant | Value | Where |
|---|---|---|
| `displayHz` | 120 | sample-history@58; glass-nav-config@4259 |
| `samplesPerFrame` | 2, giving a 4.17 ms sampling slot | sample-history@72; scroll-bus@108 |
| `leadMs` | 1 | sample-history@90 |
| minimum gap between reads | slot/2 = 2.08 ms | scroll-bus@654 |
| minimum gap between draws | 1000/120 − 1000/120/4 = 6.25 ms | scroll-pan@223; glass.worker@23988 |
| controller idle (`idleMs`) | 1000 ms | sample-history@99 |
| `metrics` | rateWindowMs 500, velocityWindowMs 80, settleMs 100, historyCapacity 32 | sample-history@332–408 |
| `standard` / `precise` | scaledToDevicePixels false / true; positionDecimals 0 / 2 | sample-history@~180–240 |
| controller plane | rangeScale 101; first demo `--plane-scale` 3 | sample-history@126; boot-post-contents@3462 |
| `loop` | holdMs 1000, parkAfterMs 400, framesInFlight 2, stepCapFrames 3 | glass-nav-config@4306–4366 |
| snapshot demo loop | parkAfterMs 500, framesInFlight 1 | registry@16628, @16341 |
| `presentFences.pollMs` | 1 | glass-nav-config@4383 |
| `pan` | extent 400,000; period 120; idle 150; haltFrames 1; settleMs 200; wake on pointerdown, touchstart, wheel | glass-nav-config@4148–4210 |
| `mouseDrag` | threshold 6, flingMs 160, velocityWindowMs 80, button 0 | glass-nav-config@4408 |
| `tabSnap` | stop always, travelTabs 48, slack 200, freezeFrames 1, followSlop 0.5 | glass-nav-config@4020–4082 |
| `history` | capacity 32, velocityWindowMs 80 | glass-nav-config@4097 |
| boost pacer | periodMs 250, travelPixels 200; element 8 `--px`; child visibility hidden | post-contents-config@17266, @17279; blog:43@22512 |
| boost release | releaseAfterMs 1000 | post-contents-config@17297 |
| rate mark | 1 `--px`; 1 s linear infinite `translateX(var(--px))`; 1 % currentColor | blog:43@12773, @13008 |
| tripwire | reachDevicePixels 4, thresholds [0.05, 0.95] | post-contents-config@21432, @21452 |
| page wake | hashchange, popstate, pageshow, focusin; IO thresholds 0 to 1 in steps of .25 | post-contents-config@21038 |
| page | activeLine 120, coastMs 120, carriedMomentum.lullMs 150 | post-contents-config@20962–21020 |
| page speed | resting at ≤ 1000 pt/s; window 100 ms | document-page-speed@882, @909 |
| island scheduler | gapMs 100, checkMs 30, still idle 250 / urgent 60 ms, max wait urgent 250 ms, still at ≤ 30 pt/s, reach 6 viewports | islands@3921–4003, @5020 |
| backdrop | maxBandPixels 8192; rebuild 150 ms at ≤ 30 pt/s; alignment: 3 anchors, tolerance 0.75, rebuild beyond 240, min correction 0.1, every 400 ms | post-contents-config@21211–21404 |
| backdrop window | pixelBudget 8,000,000; guard 160; hysteresis 120 | post-contents-config@21482 |
| backdrop layers | reach 120, patchGapMs 100, inertAttributes [tabindex] | post-contents-config@21597–21636 |
| selection overlay | tint `-apple-system-blue`, alpha 0.2 | post-contents-config@21720 |
| glyph atlas | 2048×512, padding 2, gap 1, subpixelSteps 4, metricSize 1000; IndexedDB glyph-atlas/atlases rev 1, save 3 s, restore budget 60 ms, 8 probes; textureUnit 10; cullTexels 2 | post-contents-config@21843–21979 |
| SVG raster | oversample 2, image/png | scroll-tripwire@5197 |
| frost | σ 10, cell 4, samplesPerPoint 1, reachSigmas 2.5 | glass-nav-config@615, @4473–4612 |
| refraction feed | restRedrawMs 1000/120; resizeQuality, videoSmoothing and stackSmoothing all `medium`; videoReadyState 2 | refraction-feed@152–266 |
| refresh probe | startAfterMs 1000, sampleMs 700, attempts 4, restMs 300, pollMs 1, promptMs 3, longestIntervalMs 40; verdict cappedFromMs 15, minIntervals 16, agreeShare 0.6; retract fullBelowMs 11, minIntervals 24; stepRate cappedBelowPerSecond 62, stallGapMs 8, maxStalledShare 0.1, minSpanMs 500; watch half-life 20 s, show 1.5, hide −2.5, minShownMs 10 s, relatch 60 s, unlatch 6 samples over 30 s; settle 600 ms after touch, 500 ms after return | post-contents-config@17427–17948 |
| frame-gap probe (Android) | sampleMs 800, minFrames 24, fastBelowMs 11, cappedFromMs 15, known rates 60/90/120/144/165 | post-contents-config@17449 |
| field performance | full rate ≥ 110 fps, histogram cap 160, long main frame > 50 ms, long glass gap > 2.5 cadences, cadence smoothing 0.125, transport beacon | analytics@979–1252 |
| glass context | WebGL2; no antialias; premultiplied alpha; no preserved buffer; high-performance; desynchronized on iOS | glass.worker@67639–67986; boot-post-contents@8014 |

---

## 9. Judgement against the brief

The bar, from the brief and the charter: a technique is taken only if it needs no workaround and runs well in production iOS Safari. The owner's laws also bind: no masking fallback, restraint, nothing changes instantly, and a part must work for every consumer.

### 9.1 Each facility

| # | Facility | Verdict | What breaks it | Main thread and bytes | One library part for every consumer? | Production iOS Safari, and the source |
|---|---|---|---|---|---|---|
| 1 | **Native scroller as the gesture engine** (momentum, bounce, snap on the compositor) | **Idiomatic** | Nothing on the platform side. The accessibility cost comes from the overlay pattern (row 2), not from the scroller. | None while scrolling | Yes. glass-ui already does it: the dock run is a native snap scroller ("THE DETENT ENGINE IS THE PLATFORM", `src/components/dock/styles/run.css:30–36`; `useDockRun.ts:7–13`), animated on a named scroll timeline (`run.css:650–664`, `:800–812`). | React Aria's sheet is built only from this: scroll snap, view timelines and `overscroll-behavior`. Its gestures run "off the main thread at the native display refresh rate" (https://react-aria.adobe.com/blog/sheet). glass-ui's run.css records all five snap properties as supported in Safari 26.4. |
| 2 | **Invisible controller laid over a control** | **Workaround** | Hit-testing: the overlay takes the touch, blocking links, text selection, the long-press callout and the context menu (prevented at dock-input@5898). VoiceOver meets a generic `div` with an `aria-label` and no role or actions (dock-input@409). In Chromium 130/132 and later, a scroller with no focusable children is a tab stop (https://developer.chrome.com/blog/keyboard-focusable-scrollers). Keyboard users need a separate path. | One extra scroller per control, each DPR² larger in area when scaled | Only as a part whose consumer leaves room for it. It doubles the DOM per control. | Not measured |
| 3 | **High-rate scroll sampler** (MessageChannel + `setTimeout` on a 240-slot grid, phase-locked to rAF) | **Workaround.** It polls a property because scroll events are throttled. | Any change to WebKit's scroll IPC or timer coalescing. Low Power Mode (60 Hz; the loop still wakes 240 times a second because `displayHz` is a constant). A busy main thread, which stops all samples. | Up to 240 timer wakes and 60 rAF callbacks per second while armed. Each read touches `scrollLeft`/`scrollTop`, which forces layout if anything is dirty. About 0.6 KB. | It is generic and small; a library could own one per page. It is still a workaround by the brief. | Author: 80 reads/s from this alone (blog:104). Not measured by us. |
| 4 | **Empty rAF loop** to flush the scroll IPC | **Workaround** (relies on WebKit internals, per blog:105) | A WebKit IPC change | 60 callbacks/s. It also keeps a rendering update scheduled every frame, so the page never goes idle. | Comes with row 3 | Author: +12.5 %, to 90/s (blog:106) |
| 5 | **Display boost** (1-px transform animation plus an 8 px smooth scroller every 250 ms; armed by any touch, held 1 s after) | **Workaround.** It drives ProMotion through a side effect. | A ProMotion policy change. Low Power Mode caps the display at 60 Hz ("limited up to 60 Hz on iPhone and iPad models with ProMotion display", https://support.apple.com/101604). | Holds 120 Hz for every touch plus 1 s, which costs battery (unmeasured). A rAF loop and a `scrollTo` every 250 ms. About 1 KB. | Page-global by nature; it could only be one library singleton | Author: 90 to 120 Hz (blog:107–111). The site itself warns when Low Power Mode defeats it (post-contents-config@18305). |
| 6 | **DPR-scaled scroller** for sub-point reads | **Workaround** for integer `scrollTop` (blog:113) | Low risk: if WebKit stops rounding, the trick becomes redundant | One CSS rule; layout area grows by DPR² | Easy, and local to each part | Author's demo (blog:115). Not measured. |
| 7 | **Device-pixel viewport** (`initial-scale=1/DPR`; every length in `--px`; a MutationObserver guarding the meta) | **Workaround, page-invasive** | Every author length must be written in `--px`. Third-party CSS and embeds lay out at one-third size. Text autosizing is off. Selection handles shrink (blog:114). iOS Safari has ignored `user-scalable=no` and min/max scale since iOS 10, so pinch-zoom still works (https://webkit.org/blog/7367/new-interaction-behaviors-in-ios-10/). | A head script plus a CSS unit system | **No.** It is a page-level decision that changes every consumer's units. | Live on this site. No independent reading. |
| 8 | **URL-bar throttle bypass** (a `scroll(root)` timeline animating a transparent `outline-color`) | **Workaround** | An undocumented WebKit heuristic (blog:117). Needs Safari 26 or later for scroll-driven animations. | Nothing on the main thread; one rule | Trivially, but it is a workaround | Author: removes the 10 Hz throttle (blog:117). Not measured. |
| 9 | **IntersectionObserver tripwire** as the scroll-start detector | **Workaround in intent**, built from standard APIs | Low risk | One element and one observer | Yes | Not measured |
| 10 | **Endless pan with recentring**, and an `overflow` toggle to halt momentum | **Workaround** | Recentring is a jump, guarded only by the 150 ms idle. Toggling `overflow` cancels momentum as a side effect. | Small | Yes, with care | Not measured |
| 11 | **Scroll-snap detents** (tab controllers) | Snap itself is **idiomatic**. The invisible re-based strip of 97 cells is a **workaround** around it. | As rows 2 and 10 | Small | The snap is already in glass-ui (row 1) | glass-ui's run.css: supported in Safari 26.4 |
| 12 | **Sample history and velocity** (ring of 32; endpoint difference over 80 ms) | **Idiomatic** | Nothing | Under 1 KB | Yes | Not platform-specific |
| 13 | **Main-thread step → worker frames with back-pressure** (2 in flight, `presented` acks, 25 ms dt cap) | **Idiomatic** engineering | Nothing | Small | Yes, for any part that owns a GPU surface in a worker | Not platform-specific |
| 14 | **OffscreenCanvas in a worker presenting at 120 Hz** | The API is standard. The 120 Hz result is a **workaround**: it rests on WebKit taking an optional short-circuit, and the author expects Apple may close it (blog:172). | A WebKit change, which the spec permits. Low Power Mode (60 Hz). WKWebView: bug 294338 says WKWebView "is hardcoded to 60fps" (comment 2); whether the placeholder path escapes that cap is unknown. | A worker and a transferred canvas. The main thread still computes every frame. | Only for parts that draw to a canvas. It also needs WebGL2 in a worker. | WebGL in OffscreenCanvas requires iOS 17 (a WebKit reply in bug 254071, seen through a search snippet). 120 Hz: author only, 118 fps averaged on an iPhone 18 Pro (blog:166–168). |
| 15 | **`desynchronized` WebGL** on iOS | Standard attribute | Unknown | None | n/a | Whether WebKit honours it is unknown here |
| 16 | **GPU fence pacing**, polled every 1 ms | Idiomatic WebGL2. The 1 ms poll is a cost. | Nothing | A 1 ms `setTimeout` loop in the worker while frames are in flight | Yes, with any worker GPU surface | Not measured |
| 17 | **Page snapshot serialiser + worker repaint + glyph atlas** | **Workaround.** It re-implements a subset of CSS painting because the web has no API for sampling the backdrop. | Any CSS outside the subset (section 6.1); cross-origin assets; fonts from cross-origin sheets; layout drift (hence the 400 ms alignment check); DOM churn (the observer covers the whole body). | A full DOM walk with `getComputedStyle` and `Range` rect reads on every build. 40 KB serialiser + 112 KB worker; about 32 MB of texture at budget; an IndexedDB atlas. | **No.** The supported subset dictates what a consumer page may contain. | Live on this site. Frame rate: author only. |
| 18 | **Live-source refraction feed** (`createImageBitmap`, MessagePort transfer, `VideoFrame`, rVFC) | Standard APIs in service of row 17 | As row 17 | One capture per change per source | Only if row 17 is taken | Not measured |
| 19 | **Refresh-cap probe** | Diagnostic **workaround** | Nothing | Spins a 1 ms poll for up to 4 × 700 ms at load, and again on touch and tab return | Not a library concern | The 60 Hz cap in Low Power Mode is Apple's own (support.apple.com/101604) |
| 20 | **Field frame-rate telemetry** | Idiomatic | Nothing | Small | Not a library concern; a privacy decision | n/a |
| 21 | **Presence/dormancy and still-scroll scheduling** | **Idiomatic** | Nothing | Small | Yes | Not platform-specific |

### 9.2 Reading

- **Idiomatic, and usable across glass-ui:**
  - the native scroller as the gesture engine (already in glass-ui)
  - scroll-snap detents (already in glass-ui)
  - named scroll-driven timelines (already in glass-ui)
  - sample history and endpoint velocity
  - presence and still-scroll scheduling
  - the worker frame protocol with back-pressure, for parts that own a GPU surface
  - device-pixel canvas sizing
- **Workarounds the brief excludes:**
  - the high-rate `scrollTop` sampler
  - the empty rAF flush
  - the display boost
  - the URL-bar animation
  - the device-pixel viewport
  - depending on the OffscreenCanvas 120 Hz path
  - the page snapshot and composite texture
  - the live refraction feed
  - the refresh probe
- **Glass shading under the brief's bar.** rida's refraction samples a re-painted snapshot of the page inside a worker. It needs the serialiser (row 17), and it reaches 120 Hz only through the OffscreenCanvas behaviour the author expects Apple may close (row 14). It fails "no workaround" on both counts. The charter's provisional reading, that a page-snapshot texture is a workaround, holds. Everything on this site that is idiomatic is also achievable without refraction.
- **Where the rate comes from.** The post's 120 Hz is a rate for input-to-render on a ProMotion iPhone with Low Power Mode off. Any visual that is a pure function of scroll position already runs at compositor rate through scroll-driven animations on the native scroller (row 1), with no sampling. The sampler only matters for values JavaScript computes from the finger. Low Power Mode, older iPhones and WKWebView all hold to 60 Hz whatever the page does.

---

## 10. For the union (inputs only; no design here)

1. Keep the platform as the gesture engine, as glass-ui's dock law already states (`run.css:30–36`).
2. Where a lens must track scroll, drive it from a named scroll timeline on the native scroller. That runs at compositor rate with no `scrollTop` reads. Leave JavaScript the choice of settle target, as `useDockRun.ts` already does.
3. If finger-derived values are ever needed (stretch toward the finger, or a spring settle seeded with release velocity), the needed pieces are a 32-sample ring with an 80 ms endpoint velocity and a 25 ms dt cap. Those pieces are idiomatic. The way rida feeds them (the 240 Hz sampler and the boost) is not.
4. The worker frame protocol fits glass-ui's GPU parts (aurora) if they ever move to workers: at most 2 frames in flight, `presented` acks, fence pacing.
5. Still-scroll scheduling fits wherever heavy rebuilds would jank a scroll: defer until the page moves at 30 pt/s or less for 250 ms, polling every 30 ms.
6. Do not take the device-pixel viewport, the boost, the URL-bar animation, the snapshot, or the live feed.

---

## 11. External sources read for this note

- **WebKit bug 294338**, https://bugs.webkit.org/show_bug.cgi?id=294338, "Feature Request: Allow WKWebView to Support 120Hz Refresh Rate on ProMotion Devices".
  - Status NEW, unassigned, rdar://153131340. Reported 2025-06-11; last modified 2026-09-17.
  - Points used here: WKWebView is fixed at 60 fps (comment 2). A Home Screen web app gets 60 fps with default settings (comment 6, Simon Fraser) and 120 fps with the setting off (comment 7). The internal preference is `PreferPageRenderingUpdatesNear60FPSEnabled` (comment 17). Capacitor and Tauri plugins use private APIs to reach 120 Hz (comment 15). Ink & Switch reports Pencil drawing degraded at 60 Hz (comment 10).
  - No Apple comment states any intent to change the behaviour. Nothing in the thread mentions Low Power Mode or OffscreenCanvas.
- **React Aria, "Scrolling is All You Need: Building a Swipeable Sheet"**, https://react-aria.adobe.com/blog/sheet.
  - Built from a scroller twice the viewport's height, scroll snap, `scroll-behavior: smooth`, view timelines (`view-timeline-inset`), `timeline-scope`, `animation-composition: accumulate`, `scroll-margin-top` snap markers and `overscroll-behavior`.
  - The only JavaScript it describes is an IntersectionObserver that unmounts the sheet once it has left the screen. It reads no `scrollTop`.
  - It claims the gestures run "off the main thread at the native display refresh rate".
  - It has no accessibility or browser-version section.
- **HTML Standard, OffscreenCanvas**, https://html.spec.whatwg.org/multipage/canvas.html#the-offscreen-2d-rendering-context: implementations "are encouraged to short-circuit the graphics update steps of the window event loop".
- **Apple Support 101604**, https://support.apple.com/101604: Low Power Mode limits the refresh rate to 60 Hz on ProMotion models.
- **WebKit, "New Interaction Behaviors in iOS 10"**, https://webkit.org/blog/7367/new-interaction-behaviors-in-ios-10/: Safari ignores `user-scalable`, `minimum-scale` and `maximum-scale` for zoom.
- **WebKit, "Features in Safari 26.0"**, https://webkit.org/blog/17333/webkit-features-in-safari-26-0/: scroll-driven animations shipped.
- **WebKit bug 254071**, https://bugs.webkit.org/show_bug.cgi?id=254071: WebGL in OffscreenCanvas requires iOS 17. I saw this through a search snippet and did not open the page.
- **Chrome, keyboard-focusable scrollers**, https://developer.chrome.com/blog/keyboard-focusable-scrollers.
- **MDN, GestureEvent**, https://developer.mozilla.org/en-US/docs/Web/API/GestureEvent: non-standard and WebKit-proprietary.

---

## 12. Open questions, and readings owed to the owner's iPhone

1. **Sampler rates.** Distinct positions per second from a plain scroller in five configurations: `scroll` events only; the sampler alone; with the empty rAF loop; with the boost; with the passive-`touchmove` alternative. This needs production iOS 27 Safari on a ProMotion iPhone, with Low Power Mode both off and on.
2. **OffscreenCanvas presents.** The worker canvas's present rate against a main-thread canvas, in Safari, in a Home Screen web app and in WKWebView (the Home Assistant app is a WKWebView, per INBOUND.md).
3. **URL-bar throttle.** Does the 10 Hz throttle appear with and without the `scroll(root)` outline animation?
4. **`desynchronized`.** Does WebKit honour it for WebGL2 in a worker?
5. **Timer resolution.** `performance.now()` resolution in iOS Safari. The author says 1 ms (blog:103); I found no other source.
6. **Battery.** What does holding 120 Hz through every touch plus 1 s cost?
7. **VoiceOver.** What does it announce for an invisible controller scroller, and can it operate one?
8. **Stability.** Does the queued-rendering-update IPC flush (blog:105) still hold in iOS 27?
