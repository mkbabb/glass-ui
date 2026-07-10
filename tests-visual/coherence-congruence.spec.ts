// BG.W-PAGE-COMPONENT-AUDIT (17.6) — coherence-congruence.spec.ts, the 480-capture
// CROSS-PAGE harmonized-whole read (the abolished-W-REFLECT3 funnel replaced by a REAL
// wave). This is the LOCAL late-sweep INSTRUMENT — the two-tier model (COHERENCE FOLD G7
// L8): the ~106 non-roster-pinned pages ride THIS sweep, NOT a 480-to-ci promotion (that
// would re-create the §2.A1 terminal-reflect chokepoint). It is EXCLUDED from the always-on
// `--run pi` set (pi-runner-manifest.mjs PI_EXCLUDE) and invoked explicitly at the close.
//
// THE CARDINAL-LESSON SPLIT. The DEVICE-FREE half (`proof:warm-identity`'s cross-page arm)
// asserts the convergence STRUCTURE — the 7 Pass-E categories + the 4 C2-SENTINEL routes
// enrolled, every route resolves, the anti-evasion armed. THIS spec is the PAINT half: it
// navigates the enrolled route set in BOTH modes on BOTH projects (chromium-headless-new +
// coarse-touch), captures the whole page over the warm field, samples the composited FIELD
// region hue, and writes the per-route + aggregate result the NON-AUTHORING judge reads to
// flip each roster row FAIL → CONVERGED (the building agent never flips its own row).
//
// The 480 = the enrolled route set × {light,dark} × {chromium,webkit} — the full sweep the
// judge produces over the reduced designed set; this instrument iterates the roster's
// per-category CONVERGENCE seeds (the 7 representative routes + the 4 sentinels) as the
// binding structural anchor, and records the dominant-hue read for each.

import { test, expect } from "@playwright/test";
import { PNG } from "pngjs";
import { fileURLToPath } from "node:url";
import { mkdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const ROSTER = fileURLToPath(
    new URL("../docs/tranches/BG/audit/reflect/bg-page-audit-roster.md", import.meta.url),
);
const OUT_DIR = fileURLToPath(
    new URL("../docs/tranches/BG/audit/visual/BG.W-PAGE-COMPONENT-AUDIT-paint/", import.meta.url),
);

interface AuditRow {
    category: string;
    route: string;
    field: { x: number; y: number; w: number; h: number };
    captureLight: string;
    captureDark: string;
}

/** Parse the cross-page audit roster into route rows (the same rows the gate reads). */
function parseRoster(): AuditRow[] {
    const src = readFileSync(ROSTER, "utf8").replace(/<!--[\s\S]*?-->/g, "");
    const rows: AuditRow[] = [];
    for (const raw of src.split("\n")) {
        const line = raw.trim();
        if (!line.startsWith("|")) continue;
        const cells = line
            .replace(/^\|/, "")
            .replace(/\|$/, "")
            .split("|")
            .map((c) => c.trim());
        if (cells.length < 8) continue;
        if (cells[0] === "category") continue; // header
        if (cells.every((c) => /^:?-+:?$/.test(c))) continue; // separator
        const probe: Record<string, number> = {};
        for (const part of (cells[4] ?? "").split(",")) {
            const kv = part.trim().match(/^([xywh])\s*=\s*([0-9.]+)$/);
            if (kv) probe[kv[1]!] = parseFloat(kv[2]!);
        }
        rows.push({
            category: cells[0]!,
            route: cells[1]!,
            captureLight: cells[2]!,
            captureDark: cells[3]!,
            field: { x: probe.x ?? 0.2, y: probe.y ?? 0.35, w: probe.w ?? 0.55, h: probe.h ?? 0.3 },
        });
    }
    return rows;
}

/** Mean OKLab-ish warmth read of a fractional FIELD region (b-channel positive == warm). */
function fieldWarmth(
    buf: Buffer,
    field: { x: number; y: number; w: number; h: number },
): { meanL: number; warmFraction: number; samples: number } {
    const png = PNG.sync.read(buf);
    const { width: W, height: H, data } = png;
    const x0 = Math.floor(field.x * W);
    const y0 = Math.floor(field.y * H);
    const x1 = Math.min(W, Math.floor((field.x + field.w) * W));
    const y1 = Math.min(H, Math.floor((field.y + field.h) * H));
    let sumL = 0;
    let warm = 0;
    let n = 0;
    for (let y = y0; y < y1; y += 3) {
        for (let x = x0; x < x1; x += 3) {
            const i = (y * W + x) * 4;
            const r = data[i]! / 255;
            const g = data[i + 1]! / 255;
            const b = data[i + 2]! / 255;
            // sRGB → a coarse luminance + a warm-axis proxy (red/yellow above blue).
            const L = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            sumL += L;
            const chroma = Math.max(r, g, b) - Math.min(r, g, b);
            // warm == the max channel is red/green (warm) not blue (cold), with real chroma.
            if (chroma > 0.02 && b <= Math.max(r, g)) warm++;
            n++;
        }
    }
    return { meanL: n ? sumL / n : 0, warmFraction: n ? warm / n : 0, samples: n };
}

const ROWS = parseRoster();

for (const mode of ["light", "dark"] as const) {
    test.describe(`cross-page harmonized-whole read — ${mode}`, () => {
        test.use({ colorScheme: mode });
        for (const row of ROWS) {
            test(`${row.category} · ${row.route}`, async ({ page }, testInfo) => {
                mkdirSync(OUT_DIR, { recursive: true });
                const engine = testInfo.project.name.includes("coarse") ? "coarse" : "chromium";
                await page.goto(`${row.route}?capture=1`, { waitUntil: "load" });
                // Served-app sentinel (fail-closed) + the route mounts.
                await page.waitForSelector("#app, [data-app-root], main", { timeout: 20_000 });
                await page
                    .waitForFunction(() => document.querySelector("[data-capture-ready]") != null, {
                        timeout: 8_000,
                    })
                    .catch(() => undefined); // ready flag is best-effort; the load wait is the floor
                await page.waitForTimeout(1_200);
                const slug = row.route.replace(/^\//, "").replace(/\//g, "-");
                const outPath = resolve(OUT_DIR, `${slug}-${engine}-${mode}-desktop-full.png`);
                const buf = await page.screenshot({ path: outPath, fullPage: false });
                const warmth = fieldWarmth(buf, row.field);
                // The instrument RECORDS the read for the non-authoring judge; it does not
                // author the CONVERGED verdict (the non-authoring fence). It hard-asserts
                // only that the route navigated + painted a real (non-degenerate) field.
                expect(warmth.samples, `${row.route} field region has samples`).toBeGreaterThan(0);
                expect(warmth.meanL, `${row.route} painted a non-black field`).toBeGreaterThan(0.02);
                testInfo.annotations.push({
                    type: "cross-page-read",
                    description: `${row.category} ${row.route} ${engine}/${mode} meanL=${warmth.meanL.toFixed(3)} warmFraction=${warmth.warmFraction.toFixed(3)} → ${outPath}`,
                });
            });
        }
    });
}

// The aggregate the judge reads (best-effort append; the per-test annotations carry the
// binding per-route reads). Written from a final orchestration test so it runs once.
test("cross-page audit — aggregate manifest", async () => {
    const manifest = {
        wave: "BG.W-PAGE-COMPONENT-AUDIT",
        capturedAt: new Date().toISOString(),
        enrolledRows: ROWS.length,
        note:
            "The 480-capture harmonized-whole read (enrolled routes × light/dark × chromium/webkit). " +
            "Per-route dominant-hue reads ride each test's annotations; the NON-AUTHORING judge flips " +
            "each roster row FAIL → CONVERGED on the fresh warm dual-engine capture (the non-authoring fence).",
        routes: ROWS.map((r) => ({ category: r.category, route: r.route })),
    };
    mkdirSync(OUT_DIR, { recursive: true });
    writeFileSync(resolve(OUT_DIR, "aggregate-manifest.json"), JSON.stringify(manifest, null, 2));
    expect(existsSync(resolve(OUT_DIR, "aggregate-manifest.json"))).toBe(true);
});
