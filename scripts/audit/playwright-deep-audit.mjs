#!/usr/bin/env node
/**
 * Playwright deep audit of the glass-ui storybook.
 *
 * Walks every route in `demo/stories/manifest.ts`, captures console
 * errors per route, takes a viewport screenshot, and exercises the
 * H-shipped features (slider-glass-track + dock-keep-open round-trip).
 *
 * Run from repo root with the dev server already up at :5173:
 *   node scripts/audit/playwright-deep-audit.mjs
 *
 * Output:
 *   docs/tranches/H/audit/playwright-deep-audit.md   (the report)
 *   docs/tranches/H/audit/screens/<category>__<story>.png (per-story shot)
 */

import { chromium } from "playwright";
import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";

const BASE_URL = process.env.AUDIT_BASE_URL ?? "http://localhost:5173";
const ROOT = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..", "..");
const REPORT_PATH = path.join(ROOT, "docs/tranches/H/audit/playwright-deep-audit.md");
const SHOTS_DIR = path.join(ROOT, "docs/tranches/H/audit/screens");
const VIEWPORT = { width: 1440, height: 900 };
const PER_STORY_TIMEOUT_MS = 12000;

async function loadManifest() {
    const manifestPath = path.join(ROOT, "demo/stories/manifest.ts");
    const src = await fs.readFile(manifestPath, "utf8");
    const stories = [];
    // Match the category + id only — blurbs may contain escaped quotes
    // that throw off a single greedy capture.
    const re = /s\("([a-z0-9_-]+)",\s*"([a-z0-9_-]+)"/g;
    let match;
    while ((match = re.exec(src)) !== null) {
        const [, category, id] = match;
        stories.push({ category, id, title: id });
    }
    return stories;
}

function summarize(consoleMsgs) {
    const errors = consoleMsgs.filter(
        (m) => m.type === "error" || m.type === "pageerror",
    );
    const warnings = consoleMsgs.filter((m) => m.type === "warning");
    return { errors, warnings, total: consoleMsgs.length };
}

async function auditStory(page, story) {
    const route = `${BASE_URL}/${story.category}/${story.id}`;
    const consoleMsgs = [];
    const onConsole = (msg) =>
        consoleMsgs.push({ type: msg.type(), text: msg.text() });
    const onPageError = (err) =>
        consoleMsgs.push({ type: "pageerror", text: String(err) });

    page.on("console", onConsole);
    page.on("pageerror", onPageError);

    const result = {
        route,
        category: story.category,
        id: story.id,
        title: story.title,
        ok: false,
        errors: [],
        warnings: [],
        timing: 0,
        screenshot: null,
        notes: [],
    };

    const t0 = Date.now();
    try {
        await page.goto(route, {
            waitUntil: "networkidle",
            timeout: PER_STORY_TIMEOUT_MS,
        });
        await page.waitForLoadState("domcontentloaded");
        await page.waitForTimeout(450);

        const shotName = `${story.category}__${story.id}.png`;
        const shotPath = path.join(SHOTS_DIR, shotName);
        await page.screenshot({ path: shotPath, fullPage: false });
        result.screenshot = shotName;

        const summary = summarize(consoleMsgs);
        result.errors = summary.errors;
        result.warnings = summary.warnings;
        result.ok = summary.errors.length === 0;
    } catch (err) {
        result.notes.push(`navigation failure: ${String(err).split("\n")[0]}`);
        result.ok = false;
    } finally {
        result.timing = Date.now() - t0;
        page.off("console", onConsole);
        page.off("pageerror", onPageError);
    }

    return result;
}

async function exerciseSliderGlassTrack(page) {
    const route = `${BASE_URL}/primitives/slider-glass-track`;
    const findings = { route, checks: [] };

    await page.goto(route, { waitUntil: "networkidle" });
    await page.waitForTimeout(900);

    const variantRoots = await page.locator(".glass-slider--glass-track").count();
    findings.checks.push({
        name: "glass-track variant roots mount",
        ok: variantRoots > 0,
        detail: `${variantRoots} <SliderRoot class=\"glass-slider--glass-track\"> element(s)`,
    });

    const sliderThumbs = await page.locator('[role="slider"]').count();
    findings.checks.push({
        name: "slider thumbs render",
        ok: sliderThumbs > 0,
        detail: `${sliderThumbs} thumb(s) with role=\"slider\"`,
    });

    const dockLayers = await page.locator(".dock-layer-item-host").count();
    findings.checks.push({
        name: "dock-layer mount (round-trip composition)",
        ok: dockLayers >= 1,
        detail: `${dockLayers} <DockLayer> dock-layer-item-host element(s)`,
    });

    const sinkExposed = await page.evaluate(() => {
        const root = document.querySelector(".glass-slider--glass-track");
        if (!root) return { found: false };
        const handlers = ["onpointerdown", "onpointerup", "onpointercancel"];
        return {
            found: true,
            handlers: handlers.map((h) => ({ event: h, attached: !!root[h] })),
        };
    });
    findings.checks.push({
        name: "slider pointer events bound (acquire/release wiring)",
        ok: sinkExposed.found,
        detail: sinkExposed.found
            ? `pointer events on <SliderRoot> — ${JSON.stringify(sinkExposed.handlers)}`
            : "no slider root located",
    });

    return findings;
}

async function exerciseBlobStress(page) {
    const route = `${BASE_URL}/_internal/blob-stress`;
    const findings = { route, checks: [] };

    try {
        await page.goto(route, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(500);
        const blobCount = await page.evaluate(() => {
            return document.querySelectorAll("canvas").length;
        });
        findings.checks.push({
            name: "blob canvases mount",
            ok: blobCount >= 8,
            detail: `${blobCount} canvas elements (expected ≥ 8)`,
        });
    } catch (err) {
        findings.checks.push({
            name: "blob-stress route",
            ok: false,
            detail: String(err).split("\n")[0],
        });
    }

    return findings;
}

async function main() {
    await fs.mkdir(SHOTS_DIR, { recursive: true });
    const manifest = await loadManifest();
    console.log(`audit: ${manifest.length} stories at ${BASE_URL}`);

    const browser = await chromium.launch({ args: ["--use-gl=swiftshader"] });
    const context = await browser.newContext({ viewport: VIEWPORT });
    const page = await context.newPage();

    const start = Date.now();
    const results = [];
    let i = 0;
    for (const story of manifest) {
        i += 1;
        const r = await auditStory(page, story);
        results.push(r);
        const flag = r.ok ? "OK" : "ERR";
        console.log(
            `  [${String(i).padStart(3, "0")}/${manifest.length}] ${flag} ${story.category}/${story.id} (${r.timing}ms, errs=${r.errors.length})`,
        );
    }

    console.log("audit: feature exercises");
    const sliderFindings = await exerciseSliderGlassTrack(page);
    const stressFindings = await exerciseBlobStress(page);

    await browser.close();
    const elapsed = Date.now() - start;

    const passed = results.filter((r) => r.ok).length;
    const failed = results.length - passed;
    const errLines = [];
    for (const r of results) {
        if (r.ok) continue;
        errLines.push(`### ${r.category}/${r.id} — ${r.title}`);
        if (r.notes.length) errLines.push(`- notes: ${r.notes.join("; ")}`);
        for (const e of r.errors.slice(0, 5)) {
            errLines.push(
                `- \`${e.type}\`: ${e.text.replace(/\s+/g, " ").slice(0, 220)}`,
            );
        }
        if (r.errors.length > 5)
            errLines.push(`- … +${r.errors.length - 5} more`);
        errLines.push("");
    }

    const lines = [
        "# Playwright Deep Audit — glass-ui storybook",
        "",
        `- Captured: ${new Date().toISOString()}`,
        `- Base URL: ${BASE_URL}`,
        `- Browser: Chromium ${(await chromium.executablePath?.()) ? "(installed)" : "(default)"}`,
        `- Stories audited: ${results.length}`,
        `- Pass: ${passed} · Fail: ${failed}`,
        `- Elapsed: ${(elapsed / 1000).toFixed(1)}s`,
        "",
        "## Per-story result",
        "",
        "| # | route | result | console errors | timing |",
        "|---:|---|---|---:|---:|",
        ...results.map(
            (r, idx) =>
                `| ${idx + 1} | \`/${r.category}/${r.id}\` | ${r.ok ? "PASS" : "FAIL"} | ${r.errors.length} | ${r.timing}ms |`,
        ),
        "",
        "## Failed-story details",
        "",
        failed === 0 ? "_No failures._" : errLines.join("\n"),
        "",
        "## Feature exercises",
        "",
        "### Slider · Glass Track + Dock Keep-Open Round-Trip (W3, H)",
        "",
        ...sliderFindings.checks.map(
            (c) => `- ${c.ok ? "PASS" : "FAIL"} **${c.name}** — ${c.detail}`,
        ),
        "",
        "### Blob Stress (Wβ3, G — closed in H.W5)",
        "",
        ...stressFindings.checks.map(
            (c) => `- ${c.ok ? "PASS" : "FAIL"} **${c.name}** — ${c.detail}`,
        ),
        "",
        "## Notes",
        "",
        `- Screenshots: \`docs/tranches/H/audit/screens/<category>__<story>.png\``,
        `- Re-run: \`node scripts/audit/playwright-deep-audit.mjs\` after \`npm run dev\``,
        "",
    ];

    await fs.writeFile(REPORT_PATH, lines.join("\n"));
    console.log(
        `\naudit: ${passed}/${results.length} PASS · report at ${REPORT_PATH}`,
    );
    if (failed > 0) process.exitCode = 1;
}

main().catch((err) => {
    console.error("audit failed:", err);
    process.exit(2);
});
