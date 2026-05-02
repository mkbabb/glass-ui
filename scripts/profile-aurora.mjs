import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const artifactPath = resolve(
    root,
    process.env.GLASS_UI_AURORA_PROFILE_ARTIFACT ??
        "docs/tranches/F/audit/W5-aurora-profile.json",
);
const baseUrl = process.env.GLASS_UI_AURORA_BASE_URL ?? "http://127.0.0.1:5173";
const debugPort = Number(
    process.env.GLASS_UI_AURORA_CHROME_DEBUG_PORT ??
        process.env.GLASS_UI_CHROME_DEBUG_PORT ??
        9347,
);
const chromePath =
    process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const fallbackChromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const liveViewport = parseSize(process.env.GLASS_UI_AURORA_VIEWPORT ?? "960x540");
const thumbnailViewport = parseSize(process.env.GLASS_UI_AURORA_THUMBNAIL_SIZE ?? "320x200");
const dprs = parseNumberList(process.env.GLASS_UI_AURORA_DPRS ?? "1,2");
const liveFrameCount = Number(process.env.GLASS_UI_AURORA_FRAME_COUNT ?? 90);
const drawSamples = Number(process.env.GLASS_UI_AURORA_DRAW_SAMPLES ?? 30);
const startedAt = Date.now();

const liveCases = [
    { id: "smooth-openai-sky", preset: "OPENAI_SKY", medium: "smooth" },
    { id: "pastel-deliberative", preset: "DELIBERATIVE", medium: "pastel" },
    { id: "watercolor-openai-meadow", preset: "OPENAI_MEADOW", medium: "watercolor" },
    { id: "oil-oil-gestural", preset: "OIL_GESTURAL", medium: "oil" },
];

function parseSize(value) {
    const match = /^(\d+)x(\d+)$/i.exec(value.trim());
    if (!match) throw new Error(`Expected size as WIDTHxHEIGHT, got ${value}`);
    return {
        width: Number(match[1]),
        height: Number(match[2]),
    };
}

function parseNumberList(value) {
    const values = value
        .split(",")
        .map((part) => Number(part.trim()))
        .filter((part) => Number.isFinite(part) && part > 0);
    if (values.length === 0) throw new Error(`Expected numeric DPR list, got ${value}`);
    return values;
}

function sleep(ms) {
    return new Promise((resolveSleep) => setTimeout(resolveSleep, ms));
}

async function waitForHttp(url, timeoutMs = 20_000) {
    const started = Date.now();
    while (Date.now() - started < timeoutMs) {
        try {
            const response = await fetch(url);
            if (response.ok) return true;
        } catch {
            // Server is still starting.
        }
        await sleep(150);
    }
    return false;
}

async function waitForJson(url, timeoutMs = 10_000) {
    const started = Date.now();
    while (Date.now() - started < timeoutMs) {
        try {
            const response = await fetch(url);
            if (response.ok) return response.json();
        } catch {
            // Chrome is still starting.
        }
        await sleep(100);
    }
    throw new Error(`Timed out waiting for ${url}`);
}

function connect(wsUrl) {
    const ws = new WebSocket(wsUrl);
    const pending = new Map();
    const listeners = [];
    let nextId = 1;

    ws.addEventListener("message", (event) => {
        const message = JSON.parse(event.data);
        if (message.id && pending.has(message.id)) {
            const { resolve: resolvePending, reject } = pending.get(message.id);
            pending.delete(message.id);
            if (message.error) reject(new Error(message.error.message));
            else resolvePending(message.result ?? {});
            return;
        }
        for (const listener of listeners) listener(message);
    });

    return new Promise((resolveConnect, reject) => {
        ws.addEventListener(
            "open",
            () =>
                resolveConnect({
                    send(method, params = {}) {
                        const id = nextId++;
                        ws.send(JSON.stringify({ id, method, params }));
                        return new Promise((resolveSend, rejectSend) => {
                            pending.set(id, {
                                resolve: resolveSend,
                                reject: rejectSend,
                            });
                        });
                    },
                    onMessage(listener) {
                        listeners.push(listener);
                    },
                    close() {
                        ws.close();
                    },
                }),
            { once: true },
        );
        ws.addEventListener("error", reject, { once: true });
    });
}

async function createTarget(url) {
    let response = await fetch(
        `http://127.0.0.1:${debugPort}/json/new?${encodeURIComponent(url)}`,
        { method: "PUT" },
    );
    if (!response.ok) {
        response = await fetch(
            `http://127.0.0.1:${debugPort}/json/new?${encodeURIComponent(url)}`,
        );
    }
    if (!response.ok) {
        throw new Error(`Could not create Chrome target for ${url}: ${response.status}`);
    }
    return response.json();
}

async function closeTarget(id) {
    await fetch(`http://127.0.0.1:${debugPort}/json/close/${id}`).catch(() => {});
}

async function evaluate(client, expression) {
    const result = await client.send("Runtime.evaluate", {
        expression,
        awaitPromise: true,
        returnByValue: true,
    });
    if (result.exceptionDetails) {
        const details = result.exceptionDetails;
        const description =
            details.exception?.description ?? details.text ?? "Runtime evaluation failed";
        throw new Error(description);
    }
    return result.result?.value;
}

async function waitForDocument(client) {
    const started = Date.now();
    while (Date.now() - started < 15_000) {
        const ready = await evaluate(
            client,
            `document.readyState === "complete" || document.readyState === "interactive"`,
        );
        if (ready) return;
        await sleep(100);
    }
    throw new Error("Timed out waiting for profile document");
}

function startServerIfNeeded() {
    const url = new URL(baseUrl);
    const host = url.hostname || "127.0.0.1";
    const port = url.port || "5173";
    return spawn("npm", ["run", "dev", "--", "--host", host, "--port", port], {
        cwd: root,
        stdio: "ignore",
        env: { ...process.env, BROWSER: "none" },
    });
}

async function setViewport(client, viewport, dpr) {
    await client.send("Emulation.setDeviceMetricsOverride", {
        width: viewport.width,
        height: viewport.height,
        deviceScaleFactor: dpr,
        mobile: false,
    });
}

function harnessSource() {
    return String.raw`
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
                import("/src/components/custom/aurora/composables/runtime.ts"),
                import("/demo/stories/aurora/presets.ts"),
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
}

function chromeArgs(profileDir) {
    const args = [
        "--headless=new",
        `--remote-debugging-port=${debugPort}`,
        `--user-data-dir=${profileDir}`,
        "--no-first-run",
        "--no-default-browser-check",
        "--ignore-gpu-blocklist",
        "about:blank",
    ];
    if (process.env.GLASS_UI_AURORA_DISABLE_GPU === "1") {
        args.splice(1, 0, "--disable-gpu");
    }
    return args;
}

function liveCaseExpression(options) {
    return `globalThis.__glassAuroraProfile.runLiveCase(${JSON.stringify(options)})`;
}

function thumbnailBatchExpression(options) {
    return `globalThis.__glassAuroraProfile.runThumbnailBatch(${JSON.stringify(options)})`;
}

function writeArtifact(artifact) {
    mkdirSync(dirname(artifactPath), { recursive: true });
    writeFileSync(artifactPath, `${JSON.stringify(artifact, null, 2)}\n`);
}

async function main() {
    let server = null;
    let chrome = null;
    let profileDir = null;
    let target = null;
    let client = null;

    const artifact = {
        generatedAt: new Date().toISOString(),
        baseUrl,
        status: "fail",
        script: "scripts/profile-aurora.mjs",
        assumptions: [
            "The profiler imports Aurora runtime and authored demo presets through the Vite dev server.",
            "Live preserveDrawingBuffer true/false comparisons call createAurora with explicit runtime options.",
            "Thumbnail batches call createAurora with capture mode, which opts into preserveDrawingBuffer and skips the live RAF loop.",
            "Frame timing is sampled from requestAnimationFrame intervals while the runtime RAF loop is active; renderAt timing is measured separately with gl.finish().",
        ],
        dimensions: {
            liveViewport,
            thumbnailViewport,
            dprs,
            liveFrameCount,
            drawSamples,
        },
        liveCases,
        liveResults: [],
        thumbnailBatches: [],
        pageErrors: [],
    };

    try {
        const serverAlreadyRunning = await waitForHttp(baseUrl, 1_000);
        artifact.server = { baseUrl, launched: !serverAlreadyRunning };
        if (!serverAlreadyRunning) {
            server = startServerIfNeeded();
            const started = await waitForHttp(baseUrl, 30_000);
            if (!started) throw new Error(`Could not start dev server at ${baseUrl}`);
        }

        profileDir = join(tmpdir(), `glass-ui-aurora-chrome-${Date.now()}`);
        chrome = spawn(resolve(chromePath), chromeArgs(profileDir), {
            stdio: "ignore",
        });
        chrome.on("error", (err) => {
            artifact.chromeSpawnError = String(err?.message ?? err);
        });

        try {
            artifact.browser = await waitForJson(`http://127.0.0.1:${debugPort}/json/version`);
        } catch (err) {
            if (chromePath === fallbackChromePath) throw err;
            chrome?.kill("SIGTERM");
            chrome = spawn(fallbackChromePath, chromeArgs(profileDir), {
                stdio: "ignore",
            });
            artifact.browser = await waitForJson(`http://127.0.0.1:${debugPort}/json/version`);
        }

        target = await createTarget("about:blank");
        client = await connect(target.webSocketDebuggerUrl);
        client.onMessage((message) => {
            if (
                message.method === "Runtime.consoleAPICalled" &&
                ["error", "assert"].includes(message.params?.type)
            ) {
                artifact.pageErrors.push(
                    message.params.args
                        ?.map((arg) => arg.value ?? arg.description ?? "")
                        .join(" "),
                );
            }
            if (message.method === "Runtime.exceptionThrown") {
                artifact.pageErrors.push(
                    message.params.exceptionDetails?.text ?? "Runtime exception",
                );
            }
            if (
                message.method === "Log.entryAdded" &&
                ["error"].includes(message.params?.entry?.level)
            ) {
                artifact.pageErrors.push(message.params.entry.text);
            }
        });

        await client.send("Page.enable");
        await client.send("Runtime.enable");
        await client.send("Log.enable");
        await setViewport(client, liveViewport, dprs[0]);
        await client.send("Page.navigate", { url: `${baseUrl}/__aurora-profile__` });
        await waitForDocument(client);
        artifact.harness = await evaluate(client, harnessSource());

        for (const dpr of dprs) {
            await setViewport(client, liveViewport, dpr);
            await evaluate(client, `window.dispatchEvent(new Event("resize"))`);
            for (const liveCase of liveCases) {
                for (const preserveDrawingBuffer of [false, true]) {
                    const result = await evaluate(
                        client,
                        liveCaseExpression({
                            ...liveCase,
                            preserveDrawingBuffer,
                            widthCss: liveViewport.width,
                            heightCss: liveViewport.height,
                            frameCount: liveFrameCount,
                            drawSamples,
                        }),
                    );
                    artifact.liveResults.push(result);
                    console.log(
                        [
                            "live",
                            liveCase.preset,
                            `dpr=${dpr}`,
                            `pdb=${preserveDrawingBuffer}`,
                            result.status,
                        ].join(" "),
                    );
                }
            }

            await setViewport(client, thumbnailViewport, dpr);
            await evaluate(client, `window.dispatchEvent(new Event("resize"))`);
            const batch = await evaluate(
                client,
                thumbnailBatchExpression({
                    widthCss: thumbnailViewport.width,
                    heightCss: thumbnailViewport.height,
                }),
            );
            artifact.thumbnailBatches.push(batch);
            console.log(`thumbnail-batch dpr=${dpr} ${batch.status}`);
        }

        const failedLive = artifact.liveResults.filter((result) => result.status !== "pass");
        const failedThumbnails = artifact.thumbnailBatches.flatMap((batch) =>
            batch.results.filter((result) => result.status !== "pass").map((result) => ({
                dpr: batch.dpr,
                preset: result.preset,
                status: result.status,
            })),
        );
        artifact.summary = {
            liveCases: artifact.liveResults.length,
            liveFailures: failedLive.length,
            thumbnailBatches: artifact.thumbnailBatches.length,
            thumbnailCases: artifact.thumbnailBatches.reduce(
                (sum, batch) => sum + batch.results.length,
                0,
            ),
            thumbnailFailures: failedThumbnails.length,
            pageErrors: artifact.pageErrors.filter(Boolean).length,
        };
        artifact.status =
            failedLive.length === 0 &&
            failedThumbnails.length === 0 &&
            artifact.summary.pageErrors === 0
                ? "pass"
                : "fail";
    } catch (err) {
        artifact.fatalError = String(err?.stack ?? err?.message ?? err);
        artifact.status = "fail";
    } finally {
        artifact.durationMs = Date.now() - startedAt;
        writeArtifact(artifact);
        client?.close();
        if (target) await closeTarget(target.id);
        chrome?.kill("SIGTERM");
        if (profileDir) rmSync(profileDir, { recursive: true, force: true });
        server?.kill("SIGTERM");
    }

    if (artifact.status === "pass") {
        console.log(`Aurora profile passed: ${artifactPath}`);
    } else {
        console.error(`Aurora profile failed: ${artifactPath}`);
        process.exitCode = 1;
    }
}

await main();
