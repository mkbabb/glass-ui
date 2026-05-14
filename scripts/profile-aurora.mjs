import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

import { HARNESS_SOURCE } from "./aurora-profile/harness-browser.mjs";

// The 433-line browser-side instrumentation harness was extracted to
// `scripts/aurora-profile/harness-browser.mjs` at O.W3 Lane B
// (docs/tranches/O/waves/W3.md §Lane B; Rβ §3.2 god-module split).
// `harnessSource()` is preserved as a thin getter to keep the call site
// at `await evaluate(client, harnessSource())` identical.
function harnessSource() {
    return HARNESS_SOURCE;
}

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

function waitForProcessExit(child, timeoutMs = 3_000) {
    return new Promise((resolveExit) => {
        if (!child || child.exitCode !== null || child.signalCode !== null) {
            resolveExit(true);
            return;
        }
        const timer = setTimeout(() => {
            child.off("exit", onExit);
            resolveExit(false);
        }, timeoutMs);
        function onExit() {
            clearTimeout(timer);
            resolveExit(true);
        }
        child.once("exit", onExit);
    });
}

async function stopProcess(child) {
    if (!child) return;
    if (child.exitCode !== null || child.signalCode !== null) return;
    child.kill("SIGTERM");
    const exited = await waitForProcessExit(child);
    if (!exited && child.exitCode === null && child.signalCode === null) {
        child.kill("SIGKILL");
        await waitForProcessExit(child, 1_500);
    }
}

async function removeDirWithRetry(dir) {
    for (let attempt = 0; attempt < 6; attempt += 1) {
        try {
            rmSync(dir, { recursive: true, force: true });
            return;
        } catch (err) {
            if (attempt === 5) throw err;
            await sleep(150 * (attempt + 1));
        }
    }
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
            await stopProcess(chrome);
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
        await stopProcess(chrome);
        if (profileDir) await removeDirWithRetry(profileDir);
        await stopProcess(server);
    }

    if (artifact.status === "pass") {
        console.log(`Aurora profile passed: ${artifactPath}`);
    } else {
        console.error(`Aurora profile failed: ${artifactPath}`);
        process.exitCode = 1;
    }
}

await main();
