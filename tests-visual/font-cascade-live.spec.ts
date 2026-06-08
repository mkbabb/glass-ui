// AX.W22 — proof:font-cascade-live, the π-lane DOM-cascade font-register readback.
//
// The cardinal AX instrument for W22 (the AW headless-green/visually-broken gap's
// closure): proof:font-canon string-asserts every NAMED face is LEGAL (a shipped
// @font-face or a generic keyword), and the retired proof:font-axes parsed a woff2
// fvar — but NEITHER opened a browser, so a library DEFAULT that resolves body to a
// system serif (the Fraunces→Georgia fallthrough) shipped GREEN. This spec LOADS the
// live demo, awaits `document.fonts.ready`, and reads back the RESOLVED computed
// cascade — the precept-valid runtime form (a getComputedStyle assertion that catches
// "a shipped face the live cascade overrides away").
//
// READBACK MECHANISM (constellation result[30].findings[7]): this is NOT a GPU
// readPixels gate. The font register is a DOM-cascade contract, so this spec reads
//   - getComputedStyle(el).fontFamily — the browser's resolved family stack,
//   - document.fonts.check('… "Plus Jakarta Sans"') — the face actually LOADED,
//   - a canvas glyph-width fingerprint — distinguishes the REAL face from a
//     metric-matched fallback (a document.fonts.check true over a non-painting face
//     is the silent-pass trap the adversarial lane names).
//
// DEVICE: a real browser (the orchestrator's lane) or headless Chromium — cascade +
// font-load resolution is device-independent (no GPU needed), so this arm is robust on
// EVERY runner that carries the workspace + a live demo dev server.
//
// THE ASSERTIONS (born-RED at the pre-wave default — body resolved Fraunces→Georgia):
//   (a) DEFAULT == RENDERED — body / .text-display-* / .text-body resolve a
//       Plus-Jakarta-FIRST family stack (NOT a serif / Georgia first token); the
//       admin-label + .fira-code resolve Fira-Code-first.
//   (b) THE FACE ACTUALLY LOADED — document.fonts.check is true for both
//       "Plus Jakarta Sans" and "Fira Code" (a legal-but-unloaded name would pass (a)
//       and still paint a system fallback).
//   (c) THE REAL FACE, NOT A METRIC-MATCHED FALLBACK — a canvas glyph-width
//       fingerprint of a Plus-Jakarta sample string differs from the same string in a
//       pure-serif control by a clear margin (the silent-pass trap guard).
//   (d) THE NEGATIVE CONTROL (the gate BITES) — inject `:root { --font-text: Georgia,
//       serif }`, re-read body's resolved family, and assert it NOW computes Georgia.
//       This proves the gate reds on exactly the class HEAD ships green-but-broken (a
//       serif body default); without it the gate could vacuously pass.

import { test, expect } from "@playwright/test";
import { resolveScene } from "./pi-manifest.ts";

/** The brand text register's first face — what every text surface must resolve. */
const TEXT_FACE = "Plus Jakarta Sans";
/** The mono register's first face. */
const MONO_FACE = "Fira Code";

/** Lowercase the first font-family token of a resolved `fontFamily` stack. */
function firstFamily(stack: string): string {
    const first = stack.split(",")[0]?.trim() ?? "";
    return first.replace(/^["']|["']$/g, "").toLowerCase();
}

/** Serif faces a broken body-default would fall through to (the RED class). */
const SERIF_FALLTHROUGH = new Set([
    "fraunces",
    "georgia",
    "times new roman",
    "times",
    "serif",
    "ui-serif",
]);

test.describe("font-cascade-live (π lane — DOM-cascade font readback, fail-CLOSED)", () => {
    test("the library default register IS the rendered register (Plus Jakarta text + Fira Code mono)", async ({
        page,
    }) => {
        const scene = resolveScene("foundations", "typography");
        await page.goto(scene.path);

        // Await the SPA mount + the font-load settle. document.fonts.ready resolves
        // once every face the page references finished loading (or timed out under
        // font-display: optional) — the point at which the resolved cascade is final.
        await page.locator("body").waitFor({ state: "visible", timeout: 30_000 });
        await page.evaluate(() => document.fonts.ready);
        // The typography ladder is the scene's payload — wait for a display sample.
        await page
            .locator(".text-display-2, .text-body, .text-admin-label")
            .first()
            .waitFor({ state: "attached", timeout: 30_000 });

        // ── (a) DEFAULT == RENDERED: the text register resolves Plus-Jakarta-first.
        const bodyFamily = await page.evaluate(
            () => getComputedStyle(document.body).fontFamily,
        );
        const bodyFirst = firstFamily(bodyFamily);
        expect(
            bodyFirst,
            `body resolved family "${bodyFamily}" — the first face is "${bodyFirst}", a serif fallthrough. The library default body register must be the brand text face (the Fraunces→Georgia serif-body default is the RED class this gate closes).`,
        ).not.toBe("");
        expect(
            SERIF_FALLTHROUGH.has(bodyFirst),
            `body resolved a serif-first family "${bodyFirst}" — default ≠ rendered (the body-defaults-to-display-serif anti-pattern).`,
        ).toBe(false);
        expect(
            bodyFirst,
            `body resolved "${bodyFirst}", not the brand text register "${TEXT_FACE}".`,
        ).toBe(TEXT_FACE.toLowerCase());

        // The display + body utilities resolve the SAME text register (one brand voice).
        for (const sel of [".text-display-2", ".text-body", ".text-display"]) {
            const loc = page.locator(sel).first();
            if ((await loc.count()) === 0) continue;
            const fam = await loc.evaluate((el) => getComputedStyle(el).fontFamily);
            const first = firstFamily(fam);
            expect(
                SERIF_FALLTHROUGH.has(first),
                `${sel} resolved a serif-first family "${first}" — the display register must be Plus Jakarta, not a serif.`,
            ).toBe(false);
            expect(first, `${sel} resolved "${first}", not "${TEXT_FACE}".`).toBe(
                TEXT_FACE.toLowerCase(),
            );
        }

        // The mono register (admin-label + .fira-code) resolves Fira-Code-first.
        for (const sel of [".text-admin-label", ".fira-code"]) {
            const loc = page.locator(sel).first();
            if ((await loc.count()) === 0) continue;
            const fam = await loc.evaluate((el) => getComputedStyle(el).fontFamily);
            const first = firstFamily(fam);
            expect(first, `${sel} resolved "${first}", not "${MONO_FACE}".`).toBe(
                MONO_FACE.toLowerCase(),
            );
        }

        // ── (b) THE FACE ACTUALLY LOADED: document.fonts.check (a legal-but-unloaded
        // name passes (a) yet still paints a system fallback).
        const loaded = await page.evaluate(
            ({ text, mono }) => ({
                text: document.fonts.check(`16px "${text}"`),
                mono: document.fonts.check(`16px "${mono}"`),
            }),
            { text: TEXT_FACE, mono: MONO_FACE },
        );
        expect(
            loaded.text,
            `document.fonts.check failed for "${TEXT_FACE}" — the brand text face is named in the cascade but the woff2 did not load (the silent-pass trap: it would paint a system fallback).`,
        ).toBe(true);
        expect(
            loaded.mono,
            `document.fonts.check failed for "${MONO_FACE}" — the mono face did not load.`,
        ).toBe(true);

        // ── (c) THE REAL FACE, NOT A METRIC-MATCHED FALLBACK: a canvas glyph-width
        // fingerprint. The same sample string measured in the brand face vs a pure
        // serif control must differ by a clear margin — a metric-matched system
        // fallback (the document.fonts.check loophole) would measure near-identical.
        const widths = await page.evaluate((face) => {
            const sample = "Plus Jakarta Sans — the brand register 0123456789";
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")!;
            const measure = (font: string) => {
                ctx.font = font;
                return ctx.measureText(sample).width;
            };
            return {
                brand: measure(`48px "${face}"`),
                serif: measure(`48px Georgia, "Times New Roman", serif`),
            };
        }, TEXT_FACE);
        expect(
            widths.brand,
            `brand-face canvas measure is degenerate (${widths.brand}px)`,
        ).toBeGreaterThan(0);
        const widthDelta = Math.abs(widths.brand - widths.serif);
        expect(
            widthDelta,
            `the brand face (${widths.brand.toFixed(1)}px) and the serif control (${widths.serif.toFixed(1)}px) measure within ${widthDelta.toFixed(1)}px — the canvas cannot distinguish the real Plus Jakarta face from a metric-matched fallback (the document.fonts.check silent-pass trap).`,
        ).toBeGreaterThan(2);

        // ── (d) THE NEGATIVE CONTROL — the gate BITES on a serif body default. Inject
        // a Georgia override on --font-text (the exact pre-wave broken class) and assert
        // body NOW resolves Georgia. Without this arm the gate could vacuously pass.
        await page.evaluate(() => {
            const style = document.createElement("style");
            style.setAttribute("data-pi-font-broken", "");
            style.textContent = `:root { --font-text: Georgia, "Times New Roman", serif; }`;
            document.head.appendChild(style);
        });
        await page.waitForTimeout(100);
        const brokenFirst = await page.evaluate(() =>
            getComputedStyle(document.body).fontFamily.split(",")[0]
                ?.trim()
                .replace(/^["']|["']$/g, "")
                .toLowerCase(),
        );
        expect(
            brokenFirst,
            `the negative control did not bite: with --font-text overridden to Georgia, body resolved "${brokenFirst}" instead of a serif — the gate would not catch a serif body default (the AW headless-green/visually-broken class).`,
        ).toBe("georgia");
        // Restore (defensive — the page tears down anyway).
        await page.evaluate(() => {
            document.querySelector("style[data-pi-font-broken]")?.remove();
        });
    });
});
