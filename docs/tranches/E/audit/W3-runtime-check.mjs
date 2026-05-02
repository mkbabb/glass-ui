import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawn } from "node:child_process";

const chromePath = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const baseUrl = "http://127.0.0.1:5173";
const debugPort = 9337;
const screenshotDir = "docs/tranches/E/audit/screenshots";

const routes = [
    { label: "current-dock-layers", path: "/navigation/dock-layers" },
    { label: "dock", path: "/navigation/dock" },
    { label: "rail", path: "/navigation/rail" },
    { label: "search", path: "/data/search" },
    { label: "sidebar", path: "/navigation/sidebar" },
    { label: "carousel", path: "/navigation/carousel" },
    { label: "aurora", path: "/aurora" },
    { label: "primitive-buttons", path: "/primitives/buttons" },
];

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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
            const { resolve, reject } = pending.get(message.id);
            pending.delete(message.id);
            if (message.error) reject(new Error(message.error.message));
            else resolve(message.result ?? {});
            return;
        }
        for (const listener of listeners) listener(message);
    });

    return new Promise((resolve, reject) => {
        ws.addEventListener(
            "open",
            () =>
                resolve({
                    send(method, params = {}) {
                        const id = nextId++;
                        ws.send(JSON.stringify({ id, method, params }));
                        return new Promise((sendResolve, sendReject) => {
                            pending.set(id, {
                                resolve: sendResolve,
                                reject: sendReject,
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
    while (Date.now() - started < 10_000) {
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
                    && getComputedStyle(main).visibility !== "hidden";
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
            deviceScaleFactor: window.devicePixelRatio || 1,
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

async function checkRoute(route) {
    const url = `${baseUrl}${route.path}`;
    const target = await createTarget("about:blank");
    const client = await connect(target.webSocketDebuggerUrl);
    const failures = [];
    let status = null;

    client.onMessage((message) => {
        if (
            message.method === "Runtime.consoleAPICalled" &&
            message.params?.type === "error"
        ) {
            failures.push(
                message.params.args
                    ?.map((arg) => arg.value ?? arg.description ?? "")
                    .join(" "),
            );
        }
        if (message.method === "Runtime.exceptionThrown") {
            failures.push(message.params.exceptionDetails?.text ?? "Runtime exception");
        }
        if (
            message.method === "Log.entryAdded" &&
            message.params?.entry?.level === "error"
        ) {
            failures.push(message.params.entry.text);
        }
        if (
            message.method === "Network.responseReceived" &&
            message.params?.response?.url === url
        ) {
            status = message.params.response.status;
        }
    });

    try {
        await client.send("Page.enable");
        await client.send("Runtime.enable");
        await client.send("Log.enable");
        await client.send("Network.enable");
        await client.send("Page.navigate", { url });
        await waitForReady(client);
        await sleep(500);

        const fallbackCount = await evaluate(
            client,
            `document.body.innerText.toLowerCase().split("missingstory").length - 1`,
        );
        const title = await evaluate(client, "document.title");
        await captureScreenshot(client, `${screenshotDir}/${route.label}.png`);

        return {
            route: route.path,
            status,
            title,
            fallbackCount,
            consoleErrors: failures.filter(Boolean),
            screenshot: `${screenshotDir}/${route.label}.png`,
        };
    } finally {
        client.close();
        await closeTarget(target.id);
    }
}

mkdirSync(screenshotDir, { recursive: true });
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
    const results = [];
    for (const route of routes) {
        results.push(await checkRoute(route));
    }

    const failed = results.filter(
        (result) =>
            result.status !== 200 ||
            result.fallbackCount !== 0 ||
            result.consoleErrors.length > 0,
    );

    console.log(JSON.stringify(results, null, 2));
    if (failed.length > 0) {
        console.error(JSON.stringify({ failed }, null, 2));
        process.exitCode = 1;
    }
} finally {
    chrome.kill("SIGTERM");
    rmSync(profileDir, { recursive: true, force: true });
}
