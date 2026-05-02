import { mkdirSync, rmSync, writeFileSync } from "node:fs";
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
const baseUrl = process.env.GLASS_UI_RUNTIME_BASE_URL ?? "http://127.0.0.1:5173";
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
            pass: dockState.docks.some(
                (dock) =>
                    dock.className.includes("variant-rail") &&
                    dock.className.includes("vertical") &&
                    dock.hasBlur,
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

        const routeAssertions = route.path.startsWith("/navigation/dock") ||
            route.path === "/navigation/rail"
            ? await dockAssertions(client, route)
            : [];

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
    return spawn("npm", ["run", "dev", "--", "--host", "127.0.0.1", "--port", "5173"], {
        cwd: root,
        stdio: "ignore",
        env: { ...process.env, BROWSER: "none" },
    });
}

mkdirSync(auditDir, { recursive: true });
mkdirSync(screenshotDir, { recursive: true });

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
    "--disable-gpu",
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
        results.push(await checkRoute(route));
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
    chrome.kill("SIGTERM");
    rmSync(profileDir, { recursive: true, force: true });
    if (server) server.kill("SIGTERM");
}
