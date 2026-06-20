import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const auditDir = resolve(root, "docs/tranches/F/audit");
const artifactPath = resolve(
    root,
    process.env.GLASS_UI_RUNTIME_ARTIFACT ??
        "docs/tranches/F/audit/W1-runtime-smoke.json",
);
const screenshotDir = resolve(
    root,
    process.env.GLASS_UI_RUNTIME_SCREENSHOT_DIR ??
        "docs/tranches/F/audit/screenshots/W1/runtime",
);
// :5199 is the gate-demo convention (AZ.W-GATES — :5173 is NEVER a default: it is
// a foreign server on this machine, and a 200 from it sails past waitForHttp then
// times out waiting for the glass-ui app shell).
const baseUrl = process.env.GLASS_UI_RUNTIME_BASE_URL ?? "http://127.0.0.1:5199";
const debugPort = Number(process.env.GLASS_UI_CHROME_DEBUG_PORT ?? 9337);
const chromePath =
    process.env.CHROME_PATH ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const keyScreenshotRoutes = new Set([
    "/foundations/intro",
    "/containers/card",
    "/navigation/dock",
    "/navigation/rail",
    "/navigation/dock-layers",
    "/data/search",
    "/aurora",
]);
const extraScreenshotRoutes = new Set(
    (process.env.GLASS_UI_RUNTIME_SCREENSHOT_ROUTES ?? "")
        .split(",")
        .map((route) => route.trim())
        .filter(Boolean),
);

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

function manifestRoutes() {
    const manifest = readFileSync(resolve(root, "demo/stories/manifest.ts"), "utf8");
    const routes = [];
    for (const match of manifest.matchAll(/s\("([^"]+)",\s*"([^"]+)"/g)) {
        routes.push({
            label: `${match[1]}-${match[2]}`,
            path: `/${match[1]}/${match[2]}`,
        });
    }
    const flatBlock = manifest.slice(manifest.indexOf("export const FLAT_STORIES"));
    for (const match of flatBlock.matchAll(/id:\s*"([^"]+)"[\s\S]*?component:\s*\(\)\s*=>\s*import\("\.\/([^"]+)\.vue"\)/g)) {
        routes.push({
            label: match[1],
            path: `/${match[1]}`,
        });
    }
    return routes;
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
    return result.result?.value;
}

async function waitForReady(client) {
    const started = Date.now();
    while (Date.now() - started < 15_000) {
        const ready = await evaluate(
            client,
            `(() => {
                const app = document.querySelector("#app");
                const main = document.querySelector("main");
                return document.readyState === "complete"
                    && !!app
                    && app.children.length > 0
                    && !!main
                    && getComputedStyle(main).display !== "none"
                    && getComputedStyle(main).visibility !== "hidden"
                    && main.innerText.trim().length > 0;
            })()`,
        );
        if (ready) return;
        await sleep(100);
    }
    throw new Error("Timed out waiting for app and main content");
}

async function captureScreenshot(client, filePath) {
    const metrics = await evaluate(
        client,
        `(() => ({
            width: Math.max(document.documentElement.scrollWidth, document.body.scrollWidth, 1280),
            height: Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, 720),
        }))()`,
    );
    await client.send("Emulation.setDeviceMetricsOverride", {
        width: Math.min(metrics.width, 1600),
        height: Math.min(metrics.height, 2400),
        deviceScaleFactor: 1,
        mobile: false,
    });
    const screenshot = await client.send("Page.captureScreenshot", {
        format: "png",
        captureBeyondViewport: true,
    });
    writeFileSync(filePath, Buffer.from(screenshot.data, "base64"));
}

async function dockAssertions(client, route) {
    const assertions = [];
    const dockState = await evaluate(
        client,
        `(() => {
            const docks = [...document.querySelectorAll(".glass-dock")].map((el) => {
                const style = getComputedStyle(el);
                return {
                    className: el.className,
                    backdropFilter: style.backdropFilter || style.webkitBackdropFilter || "",
                    hasBlur: !["", "none"].includes(style.backdropFilter || style.webkitBackdropFilter || ""),
                };
            });
            const railLayerGroup = document.querySelector('[data-testid="dock-rail-layer-group"]');
            return {
                docks,
                railLayerGroupClass: railLayerGroup?.className ?? null,
            };
        })()`,
    );

    if (route.path === "/navigation/dock") {
        assertions.push({
            name: "dock route has blurred dock surfaces",
            pass: dockState.docks.length > 0 && dockState.docks.every((dock) => dock.hasBlur),
            details: dockState.docks,
        });

        await evaluate(
            client,
            `document.querySelector('[data-testid="dock-dropdown-trigger"]')?.click()`,
        );
        await sleep(150);
        const portalState = await evaluate(
            client,
            `(() => {
                const portal = document.querySelector('[data-glass-dock-portal][data-glass-dock-owner]');
                return {
                    hasPortal: !!portal,
                    owner: portal?.getAttribute('data-glass-dock-owner') ?? null,
                };
            })()`,
        );
        assertions.push({
            name: "dock dropdown portal is explicitly owned",
            pass: portalState.hasPortal && !!portalState.owner,
            details: portalState,
        });
    }

    if (route.path === "/navigation/rail") {
        assertions.push({
            name: "rail route renders a blurred vertical GlassDock",
            // AZ.W-DOCK-TAXONOMY — the `variant-rail` class is retired; a vertical nav
            // dock is `orientation="vertical"` (emits `.vertical`), no `variant` class.
            pass: dockState.docks.some(
                (dock) =>
                    dock.className.includes("vertical") && dock.hasBlur,
            ),
            details: dockState.docks,
        });
    }

    if (route.path === "/navigation/dock-layers") {
        assertions.push({
            name: "rail-hosted DockLayerGroup inherits vertical orientation",
            pass: dockState.railLayerGroupClass?.includes("vertical") ?? false,
            details: {
                railLayerGroupClass: dockState.railLayerGroupClass,
            },
        });
    }

    return assertions;
}

async function auroraAssertions(client) {
    const state = await evaluate(
        client,
        `(async () => {
            await new Promise((resolve) => requestAnimationFrame(resolve));
            await new Promise((resolve) => requestAnimationFrame(resolve));
            function readPixelStats(gl, width, height) {
                if (!gl || width <= 0 || height <= 0) {
                    return { status: "fail", width, height, sampledPixels: 0, nonblank: false };
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
                    minLum = Math.min(minLum, lum);
                    maxLum = Math.max(maxLum, lum);
                    if (a > 2 && r + g + b > 5) active += 1;
                    buckets.add(((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4));
                }
                const meanLum = sumLum / sampled;
                const luminanceVariance = Math.max(0, sumLumSq / sampled - meanLum * meanLum);
                const activePixelRatio = active / sampled;
                return {
                    status: "pass",
                    width,
                    height,
                    sampledPixels: sampled,
                    meanLuminance: meanLum,
                    luminanceVariance,
                    luminanceRange: maxLum - minLum,
                    activePixelRatio,
                    uniqueColorBuckets: buckets.size,
                    nonblank: activePixelRatio > 0.01 && luminanceVariance > 1 && buckets.size > 3,
                };
            }
            const canvas = document.querySelector('canvas[aria-hidden="true"]');
            const gl = canvas?.getContext("webgl2");
            const pixelStats = gl
                ? readPixelStats(gl, gl.drawingBufferWidth, gl.drawingBufferHeight)
                : { status: "fail", width: 0, height: 0, sampledPixels: 0, nonblank: false };
            return {
                hasCanvas: !!canvas,
                width: canvas?.width ?? 0,
                height: canvas?.height ?? 0,
                clientWidth: canvas?.clientWidth ?? 0,
                clientHeight: canvas?.clientHeight ?? 0,
                contextAttributes: gl?.getContextAttributes?.() ?? null,
                contextLost: gl?.isContextLost?.() ?? null,
                pixelStats,
            };
        })()`,
    );

    return [
        {
            name: "aurora route has a live WebGL2 canvas",
            pass:
                state.hasCanvas &&
                state.width > 0 &&
                state.height > 0 &&
                state.clientWidth > 0 &&
                state.clientHeight > 0 &&
                state.contextAttributes?.preserveDrawingBuffer === false &&
                state.contextLost === false &&
                state.pixelStats?.nonblank === true,
            details: state,
        },
    ];
}

async function checkRoute(route) {
    const url = `${baseUrl}${route.path}`;
    const target = await createTarget("about:blank");
    const client = await connect(target.webSocketDebuggerUrl);
    const errors = [];

    client.onMessage((message) => {
        if (
            message.method === "Runtime.consoleAPICalled" &&
            ["error", "assert"].includes(message.params?.type)
        ) {
            errors.push(
                message.params.args
                    ?.map((arg) => arg.value ?? arg.description ?? "")
                    .join(" "),
            );
        }
        if (message.method === "Runtime.exceptionThrown") {
            errors.push(message.params.exceptionDetails?.text ?? "Runtime exception");
        }
        if (
            message.method === "Log.entryAdded" &&
            ["error", "warning"].includes(message.params?.entry?.level)
        ) {
            errors.push(message.params.entry.text);
        }
    });

    try {
        await client.send("Page.enable");
        await client.send("Runtime.enable");
        await client.send("Log.enable");
        await client.send("Page.navigate", { url });
        await waitForReady(client);
        await sleep(250);

        const metrics = await evaluate(
            client,
            `(() => {
                const main = document.querySelector("main");
                return {
                    title: document.title,
                    path: window.location.pathname,
                    fallbackCount: document.body.innerText.toLowerCase().split("missingstory").length - 1,
                    mainTextLength: main?.innerText.trim().length ?? 0,
                };
            })()`,
        );

        let screenshot = null;
        if (
            keyScreenshotRoutes.has(route.path) ||
            extraScreenshotRoutes.has(route.path) ||
            errors.length > 0 ||
            metrics.fallbackCount > 0
        ) {
            screenshot = join(screenshotDir, `${route.label}.png`);
            await captureScreenshot(client, screenshot);
        }

        const routeAssertions = [
            ...(route.path.startsWith("/navigation/dock") || route.path === "/navigation/rail"
                ? await dockAssertions(client, route)
                : []),
            ...(route.path === "/aurora" ? await auroraAssertions(client) : []),
        ];

        return {
            route: route.path,
            title: metrics.title,
            resolvedPath: metrics.path,
            fallbackCount: metrics.fallbackCount,
            mainTextLength: metrics.mainTextLength,
            consoleErrors: errors.filter(Boolean),
            assertions: routeAssertions,
            screenshot,
        };
    } finally {
        client.close();
        await closeTarget(target.id);
    }
}

function startServerIfNeeded() {
    // The port derives from baseUrl — a hardcoded port here silently spawns a
    // server the waitForHttp below never probes (the wrong-port hang).
    const port = new URL(baseUrl).port || "5199";
    return spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1", "--port", port], {
        cwd: root,
        stdio: "ignore",
        env: { ...process.env, BROWSER: "none" },
    });
}

mkdirSync(auditDir, { recursive: true });
mkdirSync(screenshotDir, { recursive: true });

// Device-bound gate — the LOCAL-π half of the cardinal split: the runtime smoke
// needs a real Chrome (it boots the demo + reads each route's console). When Chrome
// is absent at the resolved path — a browser-less CI/release runner: release.yml does
// not install Chrome, the macOS default does not exist on the ubuntu runner, and
// CHROME_PATH is unset there — SKIP gracefully, the same skip-by-policy the sibling +
// Playwright gates use on the clean runner (so `gates.mjs --run full` reaches the tag).
// The smoke RUNS where Chrome is present (local dev / a CHROME_PATH-set runner), which
// is the binding paint-verification half. Set CHROME_PATH to run it on a CI runner.
if (!existsSync(chromePath)) {
    console.log(
        `[proof:runtime] SKIP — no Chrome at "${chromePath}" (device-bound gate; the local-π half of the cardinal split). The browser-less CI/release runner skips it by policy; set CHROME_PATH to run it on a browser-bearing runner.`,
    );
    process.exit(0);
}

let server = null;
const serverAlreadyRunning = await waitForHttp(baseUrl, 1_000);
if (!serverAlreadyRunning) {
    server = startServerIfNeeded();
    const started = await waitForHttp(baseUrl, 30_000);
    if (!started) {
        throw new Error(`Could not start dev server at ${baseUrl}`);
    }
}

const profileDir = join(tmpdir(), `glass-ui-chrome-${Date.now()}`);
const chrome = spawn(chromePath, [
    "--headless=new",
    `--remote-debugging-port=${debugPort}`,
    `--user-data-dir=${profileDir}`,
    "--ignore-gpu-blocklist",
    "--no-first-run",
    "--no-default-browser-check",
    "about:blank",
], {
    stdio: "ignore",
});

try {
    await waitForJson(`http://127.0.0.1:${debugPort}/json/version`);
    const routes = manifestRoutes();
    const results = [];
    for (const route of routes) {
        // Per-route retry on a TRANSIENT DEV-server artifact that a re-navigate (warm
        // cache) clears — NEVER a real app defect (none can occur against the
        // production build): (a) a CDP `waitForReady` THROW under battery load
        // (`gates.mjs --run full` runs this after a build + 11 gates, so the dev server
        // can be momentarily slow), and (b) the Vite optimizeDeps RELOAD RACE — "Failed
        // to fetch dynamically imported module" — where the module itself serves 200 but
        // Vite's cold-cache re-optimize killed the in-flight dynamic import. A result
        // whose console errors are ANYTHING ELSE is a REAL defect, KEPT verbatim (never
        // masked); a genuinely broken module persists past the retries and stays failed.
        const TRANSIENT_RE =
            /Failed to fetch dynamically imported module|Importing a module script failed/i;
        let result = null;
        let lastErr = null;
        for (let attempt = 0; attempt < 4; attempt++) {
            try {
                result = await checkRoute(route);
            } catch (err) {
                lastErr = err;
                result = null;
                await sleep(750);
                continue;
            }
            const onlyTransient =
                result.consoleErrors.length > 0 &&
                result.consoleErrors.every((e) => TRANSIENT_RE.test(e));
            if (onlyTransient && attempt < 3) {
                await sleep(750);
                continue;
            }
            break;
        }
        if (result == null) throw lastErr;
        results.push(result);
    }

    const failed = results.filter(
        (result) =>
            result.fallbackCount !== 0 ||
            result.mainTextLength <= 0 ||
            result.consoleErrors.length > 0 ||
            result.resolvedPath !== result.route ||
            result.assertions.some((assertion) => !assertion.pass),
    );

    writeFileSync(
        artifactPath,
        `${JSON.stringify(
            {
                generatedAt: new Date().toISOString(),
                baseUrl,
                routesChecked: results.length,
                status: failed.length === 0 ? "pass" : "fail",
                failed,
                results,
            },
            null,
            2,
        )}\n`,
    );

    if (failed.length > 0) {
        console.error(`Runtime smoke failed: ${artifactPath}`);
        process.exitCode = 1;
    } else {
        console.log(`Runtime smoke passed: ${artifactPath}`);
    }
} finally {
    await stopProcess(chrome);
    await removeDirWithRetry(profileDir);
    await stopProcess(server);
}
