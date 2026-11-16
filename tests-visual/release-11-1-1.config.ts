// 11.1.1: the exits witnesses in four cells, each engine at the phone form (390 × 844,
// touch) and the desktop form (1440 × 900, mouse). WebKit is Playwright's build 2287
// (`webkit-2287.config.ts`); run its projects under `guarded --exclusive webkit`:
//   npx playwright test -c tests-visual/release-11-1-1.config.ts --project=chromium-phone
//   npx playwright test -c tests-visual/release-11-1-1.config.ts --project=webkit-phone
import { devices } from "@playwright/test";
import base from "./playwright.config";
import wk from "./webkit-2287.config";

const chromium = base.projects!.find((p) => p.name === "chromium-headless-new")!;
const webkit = wk.projects!.find((p) => p.name === "webkit")!;
const phone = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, hasTouch: true, isMobile: true };
const desktop = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, hasTouch: false, isMobile: false };
const testMatch = ["release-11-1-1.spec.ts", "release-11-1-1-controls.spec.ts", "release-11-1-1-reduce.spec.ts"];

export default {
    ...base,
    projects: [
        { name: "chromium-phone", testMatch, use: { ...chromium.use, ...phone } },
        { name: "chromium-desktop", testMatch, use: { ...chromium.use, ...desktop } },
        { name: "webkit-phone", testMatch, use: { ...devices["Desktop Safari"], ...webkit.use, ...phone } },
        { name: "webkit-desktop", testMatch, use: { ...devices["Desktop Safari"], ...webkit.use, ...desktop } },
    ],
};
