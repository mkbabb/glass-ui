// Browser-side instrumentation harness for `scripts/profile-aurora.mjs`.
//
// Extracted from the inline `harnessSource()` function at O.W3 Lane B
// (docs/tranches/O/waves/W3.md §Lane B; Rβ god-module split candidate).
// Loaded by the main entry as a `String.raw` template constant and
// injected into the target page via CDP `Runtime.evaluate`.
//
// Authored as `String.raw` so the harness body's own JS template literals
// (e.g. `"width:" + widthCss + "px"`-style concatenations and any embedded
// `${...}` if added later) survive transport verbatim — no host-side
// interpolation is performed here.
//
// Surface: the harness installs `globalThis.__glassAuroraProfile` with
// `ensureReady()`, `runLiveCase(options)`, `runThumbnailBatch(options)`,
// and returns `ensureReady()` so the main entry can `await` initial mount.

export const HARNESS_SOURCE = String.raw`
(() => {
    function summarize(values) {
        const clean = values.filter((value) => Number.isFinite(value));
        const sorted = [...clean].sort((a, b) => a - b);
        const count = sorted.length;
        if (count === 0) {
            return { count: 0, min: null, max: null, mean: null, median: null, p95: null };
        }
        const sum = sorted.reduce((acc, value) => acc + value, 0);
        const pick = (fraction) => sorted[Math.min(count - 1, Math.floor((count - 1) * fraction))];
        return {
            count,
            min: sorted[0],
            max: sorted[count - 1],
            mean: sum / count,
            median: pick(0.5),
            p95: pick(0.95),
        };
    }

    function nextFrame() {
        return new Promise((resolve) => requestAnimationFrame(resolve));
    }

    function timeout(ms = 0) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function cloneConfig(src) {
        return JSON.parse(JSON.stringify(src));
    }

    function freezeConfig(src) {
        const cfg = cloneConfig(src);
        cfg.nucleiDrift = 0;
        cfg.paletteDrift = 0;
        cfg.warpDrift = 0;
        cfg.breathDepth = 0;
        return cfg;
    }

    function resetDom() {
        let root = document.querySelector("#aurora-profile-root");
        if (!root) {
            root = document.createElement("main");
            root.id = "aurora-profile-root";
            document.body.replaceChildren(root);
        }
        root.replaceChildren();
        document.documentElement.style.cssText = "margin:0;padding:0;background:#000;";
        document.body.style.cssText = [
            "margin:0",
            "padding:0",
            "min-width:100vw",
            "min-height:100vh",
            "overflow:hidden",
            "background:#000",
            "font:12px system-ui,sans-serif",
        ].join(";");
        return root;
    }

    function makeCanvas(root, widthCss, heightCss) {
        const wrap = document.createElement("section");
        wrap.style.cssText = [
            "position:fixed",
            "left:0",
            "top:0",
            "display:block",
            "contain:strict",
            "overflow:hidden",
            "background:#000",
            "width:" + widthCss + "px",
            "height:" + heightCss + "px",
        ].join(";");
        const canvas = document.createElement("canvas");
        canvas.style.cssText = [
            "display:block",
            "width:100%",
            "height:100%",
        ].join(";");
        wrap.appendChild(canvas);
        root.appendChild(wrap);
        return { canvas, wrap };
    }

    async function waitForCanvasSize(canvas, widthCss, heightCss) {
        const expectedDpr = Math.min(window.devicePixelRatio || 1, 2);
        const expectedWidth = Math.max(1, Math.floor(widthCss * expectedDpr));
        const expectedHeight = Math.max(1, Math.floor(heightCss * expectedDpr));
        for (let i = 0; i < 30; i++) {
            if (canvas.width >= expectedWidth && canvas.height >= expectedHeight) return;
            await nextFrame();
        }
    }

    function rendererInfo(gl) {
        const debug = gl.getExtension("WEBGL_debug_renderer_info");
        return {
            vendor: debug ? gl.getParameter(debug.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR),
            renderer: debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
            version: gl.getParameter(gl.VERSION),
            shadingLanguageVersion: gl.getParameter(gl.SHADING_LANGUAGE_VERSION),
        };
    }

    function readPixelStats(gl, width, height) {
        if (!gl || width <= 0 || height <= 0) {
            return {
                status: "fail",
                error: "Missing WebGL context or zero-sized canvas",
                width,
                height,
                sampledPixels: 0,
                nonblank: false,
            };
        }
        const pixels = new Uint8Array(width * height * 4);
        try {
            gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
        } catch (err) {
            return {
                status: "fail",
                error: String(err?.message ?? err),
                width,
                height,
                sampledPixels: 0,
                nonblank: false,
            };
        }

        const totalPixels = width * height;
        const step = Math.max(1, Math.floor(totalPixels / 12000));
        let sampled = 0;
        let active = 0;
        let sumLum = 0;
        let sumLumSq = 0;
        let sumAlpha = 0;
        let minLum = Infinity;
        let maxLum = -Infinity;
        const buckets = new Set();

        for (let pixel = 0; pixel < totalPixels; pixel += step) {
            const offset = pixel * 4;
            const r = pixels[offset + 0];
            const g = pixels[offset + 1];
            const b = pixels[offset + 2];
            const a = pixels[offset + 3];
            const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            sampled += 1;
            sumLum += lum;
            sumLumSq += lum * lum;
            sumAlpha += a;
            minLum = Math.min(minLum, lum);
            maxLum = Math.max(maxLum, lum);
            if (a > 2 && r + g + b > 5) active += 1;
            buckets.add(((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4));
        }

        const meanLum = sumLum / sampled;
        const luminanceVariance = Math.max(0, sumLumSq / sampled - meanLum * meanLum);
        const activePixelRatio = active / sampled;
        const alphaMean = sumAlpha / sampled;

        return {
            status: "pass",
            width,
            height,
            sampledPixels: sampled,
            meanLuminance: meanLum,
            luminanceVariance,
            luminanceRange: maxLum - minLum,
            alphaMean,
            activePixelRatio,
            uniqueColorBuckets: buckets.size,
            nonblank: activePixelRatio > 0.01 && luminanceVariance > 1,
        };
    }

    async function sampleFrameTiming(frameCount) {
        const stamps = [];
        await nextFrame();
        for (let i = 0; i <= frameCount; i++) {
            stamps.push(await nextFrame());
        }
        const intervals = [];
        for (let i = 1; i < stamps.length; i++) {
            intervals.push(stamps[i] - stamps[i - 1]);
        }
        const overBudgetFrames = intervals.filter((value) => value > 20).length;
        return {
            samplesMs: summarize(intervals),
            overBudgetFrames,
            overBudgetRatio: intervals.length ? overBudgetFrames / intervals.length : null,
        };
    }

    async function runDrawSamples(aurora, gl, sampleCount) {
        const samples = [];
        for (let i = 0; i < sampleCount; i++) {
            const t0 = performance.now();
            aurora.renderAt(1 + i / 60);
            gl.finish();
            samples.push(performance.now() - t0);
            if (i % 10 === 9) await timeout(0);
        }
        return summarize(samples);
    }

    async function captureCanvas(canvas, type, quality) {
        const started = performance.now();
        try {
            const dataUrl = canvas.toDataURL(type, quality);
            return {
                status: "pass",
                durationMs: performance.now() - started,
                mimeType: type,
                bytesApprox: dataUrl.length,
            };
        } catch (err) {
            return {
                status: "fail",
                durationMs: performance.now() - started,
                mimeType: type,
                bytesApprox: 0,
                error: String(err?.message ?? err),
            };
        }
    }

    let harnessReady = null;
    let createAurora = null;
    let presets = null;
    let presetKeys = null;
    const nativeGetContext = HTMLCanvasElement.prototype.getContext;

    if (!HTMLCanvasElement.prototype.__auroraProfileGetContextPatched) {
        Object.defineProperty(HTMLCanvasElement.prototype, "__auroraProfileGetContextPatched", {
            value: true,
            configurable: true,
        });
        HTMLCanvasElement.prototype.getContext = function patchedGetContext(type, attributes) {
            const gl = nativeGetContext.call(this, type, attributes);
            if ((type === "webgl2" || type === "webgl") && gl) {
                this.__auroraProfileGl = gl;
                this.__auroraProfileContextAttributes =
                    typeof gl.getContextAttributes === "function"
                        ? gl.getContextAttributes()
                        : null;
            }
            return gl;
        };
    }

    async function ensureReady() {
        if (!harnessReady) {
            harnessReady = Promise.all([
                import("/src/components/aurora/composables/runtime.ts"),
                import("/demo/stories/substrates/aurora/presets.ts"),
            ]).then(([runtimeModule, presetModule]) => {
                createAurora = runtimeModule.createAurora;
                presets = presetModule.PRESETS;
                presetKeys = presetModule.PRESET_KEYS;
                resetDom();
                return {
                    presetKeys,
                    userAgent: navigator.userAgent,
                    devicePixelRatio: window.devicePixelRatio,
                };
            });
        }
        return harnessReady;
    }

    async function runLiveCase(options) {
        await ensureReady();
        resetDom();
        const { canvas, wrap } = makeCanvas(
            document.querySelector("#aurora-profile-root"),
            options.widthCss,
            options.heightCss,
        );
        let aurora = null;

        const result = {
            kind: "live",
            id: options.id,
            preset: options.preset,
            medium: options.medium,
            requestedPreserveDrawingBuffer: options.preserveDrawingBuffer,
            dpr: window.devicePixelRatio,
            widthCss: options.widthCss,
            heightCss: options.heightCss,
            status: "fail",
        };

        try {
            const cfg = cloneConfig(presets[options.preset]);
            const setupStarted = performance.now();
            aurora = createAurora(canvas, cfg, {
                preserveDrawingBuffer: options.preserveDrawingBuffer,
                // The profiler needs the GL context created synchronously so the
                // getContext patch on HTMLCanvasElement captures it into
                // canvas.__auroraProfileGl before the render/timing steps below.
                // The default "deferred" strategy skips arm() inside createAurora
                // and delays context creation to an idle tick — too late for this
                // harness. Force eager init (same behaviour as pre-AU runtimes).
                initStrategy: "eager",
            });
            result.setupMs = performance.now() - setupStarted;
            await waitForCanvasSize(canvas, options.widthCss, options.heightCss);
            await nextFrame();
            await nextFrame();

            const gl = canvas.__auroraProfileGl;
            result.context = {
                attributes: canvas.__auroraProfileContextAttributes,
                renderer: gl ? rendererInfo(gl) : null,
            };
            result.canvas = {
                width: canvas.width,
                height: canvas.height,
                clientWidth: canvas.clientWidth,
                clientHeight: canvas.clientHeight,
            };
            result.frameTiming = await sampleFrameTiming(options.frameCount);

            aurora.pause();
            result.renderAtMs = await runDrawSamples(aurora, gl, options.drawSamples);
            result.pixelStats = readPixelStats(gl, canvas.width, canvas.height);
            result.capture = await captureCanvas(canvas, "image/png");
            result.status =
                result.pixelStats.nonblank && result.capture.status === "pass" ? "pass" : "fail";
        } catch (err) {
            result.error = String(err?.stack ?? err?.message ?? err);
        } finally {
            try {
                aurora?.dispose();
            } catch (err) {
                result.disposeError = String(err?.message ?? err);
            }
            wrap.remove();
        }

        return result;
    }

    async function runThumbnailBatch(options) {
        await ensureReady();
        resetDom();
        const { canvas, wrap } = makeCanvas(
            document.querySelector("#aurora-profile-root"),
            options.widthCss,
            options.heightCss,
        );
        let aurora = null;

        const batch = {
            kind: "thumbnail-batch",
            id: "thumbnail-bake-all-presets",
            dpr: window.devicePixelRatio,
            widthCss: options.widthCss,
            heightCss: options.heightCss,
            requestedPreserveDrawingBuffer: true,
            sharedContext: true,
            presetCount: presetKeys.length,
            presetKeys,
            status: "fail",
            results: [],
        };

        try {
            const setupStarted = performance.now();
            aurora = createAurora(canvas, freezeConfig(presets[presetKeys[0]]), {
                mode: "capture",
            });
            batch.setupMs = performance.now() - setupStarted;
            await waitForCanvasSize(canvas, options.widthCss, options.heightCss);
            const gl = canvas.__auroraProfileGl;
            batch.context = {
                attributes: canvas.__auroraProfileContextAttributes,
                renderer: gl ? rendererInfo(gl) : null,
            };
            batch.canvas = {
                width: canvas.width,
                height: canvas.height,
                clientWidth: canvas.clientWidth,
                clientHeight: canvas.clientHeight,
            };

            for (const preset of presetKeys) {
                const row = {
                    kind: "thumbnail",
                    preset,
                    dpr: window.devicePixelRatio,
                    status: "fail",
                };
                const renderStarted = performance.now();
                aurora.update(freezeConfig(presets[preset]));
                aurora.renderAt(1.0);
                gl.finish();
                row.renderAtMs = performance.now() - renderStarted;
                row.pixelStats = readPixelStats(gl, canvas.width, canvas.height);
                row.capture = await captureCanvas(canvas, "image/webp", 0.85);
                row.status =
                    row.pixelStats.nonblank && row.capture.status === "pass" ? "pass" : "fail";
                batch.results.push(row);
                await timeout(0);
            }

            batch.status = batch.results.every((row) => row.status === "pass")
                ? "pass"
                : "fail";
        } catch (err) {
            batch.error = String(err?.stack ?? err?.message ?? err);
        } finally {
            try {
                aurora?.dispose();
            } catch (err) {
                batch.disposeError = String(err?.message ?? err);
            }
            wrap.remove();
        }

        return batch;
    }

    globalThis.__glassAuroraProfile = {
        ensureReady,
        runLiveCase,
        runThumbnailBatch,
    };

    return globalThis.__glassAuroraProfile.ensureReady();
})()
`;
