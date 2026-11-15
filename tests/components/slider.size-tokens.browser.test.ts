// O-23 L-3—the slider's size rungs read six tokens from the unlayered token :root.
//
// The rungs were literals on `.glass-slider[data-size=…]` in a deliberately unlayered
// file, so no consumer rule, ancestor token or layered utility reached them. They now
// read `--slider-track-height-{sm,md,lg}` and `--slider-thumb-size-{sm,md,lg}`. The band
// has one height, the track height: the track, the fill and every thumb are that tall,
// and the thumb size sets only the spectrum's taller band. The token root is unlayered and beats a layered consumer `:root`, so
// the consumer seam is an element below :root in any layer—here a wrapper inside
// `@layer glass-overrides`, the idiom fourier documents.
//
// A REAL ENGINE, because the witness is a cascade-layer fact: happy-dom drops every
// `@layer` block, so a layered wrapper would never apply there. The page is the
// bundled Chromium Playwright installs; the CSS is the source bytes of the two files.

import { readFileSync } from "node:fs";
import { chromium, type Browser, type Page } from "playwright";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

const SIZING = readFileSync("src/styles/tokens/sizing.css", "utf8");
const SLIDER = readFileSync("src/components/slider/styles.css", "utf8");

const OVERRIDES = `
@layer glass-overrides {
    .tall { --slider-track-height-md: 2rem; }
    .thin { --slider-track-height-md: 0.75rem; }
    .fat-thumb { --slider-thumb-size-md: 2rem; }
}`;

// reka positions the thumb absolutely beside the track; the markup mirrors that.
const slider = (id: string, variant = "") =>
    `<div class="glass-slider" id="${id}" data-size="md"${variant ? ` data-variant="${variant}"` : ""}>` +
    `<span class="slider-track"></span><span class="slider-thumb" style="position:absolute"></span></div>`;

const BODY = `
${slider("base")}
${slider("base-spectrum", "spectrum")}
<div class="tall">${slider("tall")}</div>
<div class="thin">${slider("thin-spectrum", "spectrum")}</div>
<div class="fat-thumb">${slider("fat-thumb-spectrum", "spectrum")}</div>`;

let browser: Browser;
let page: Page;

beforeAll(async () => {
    browser = await chromium.launch();
    page = await browser.newPage();
    await page.setContent(
        `<style>${SIZING}</style><style>${SLIDER}</style><style>${OVERRIDES}</style>${BODY}`,
    );
}, 60_000);

afterAll(async () => {
    await browser?.close();
});

/** Used px of the track height and the thumb's width + height under slider `id`. */
async function measure(id: string) {
    return page.evaluate((sliderId) => {
        const root = document.getElementById(sliderId)!;
        const px = (el: Element, prop: "height" | "width") =>
            parseFloat(getComputedStyle(el)[prop]);
        const track = root.querySelector(".slider-track")!;
        const thumb = root.querySelector(".slider-thumb")!;
        return {
            track: px(track, "height"),
            thumbWidth: px(thumb, "width"),
        };
    }, id);
}

describe("Slider size rungs read the token root", () => {
    it("keeps the default md rung at a 20px band with a 20px disc (spectrum 24px band, 24px ring)", async () => {
        expect(await measure("base")).toEqual({ track: 20, thumbWidth: 20 });
        // spectrum: track = thumb size × 1.5, and the ring is the band's height
        expect(await measure("base-spectrum")).toEqual({ track: 24, thumbWidth: 24 });
    });

    it("follows a wrapper override set inside @layer glass-overrides, the disc with it", async () => {
        expect(await measure("tall")).toEqual({ track: 32, thumbWidth: 32 });
    });

    it("sizes every thumb by the band's one height (the track height), never by the thumb size", async () => {
        // the track rung moves the scrubber's band and disc, not the spectrum's taller band
        expect(await measure("thin-spectrum")).toEqual({ track: 24, thumbWidth: 24 });
        // the thumb size sets only the spectrum's band: 32px → 48px band, 48px ring
        expect(await measure("fat-thumb-spectrum")).toEqual({ track: 48, thumbWidth: 48 });
    });
});
