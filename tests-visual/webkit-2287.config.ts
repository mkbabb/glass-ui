// The `webkit` project on Playwright WebKit build 2287. The repo's Playwright resolves
// WebKit 2311, which crashes every page that mounts a GlassDock on the dock's nested
// translucent `color-mix()` (atlas U-batch N-1, BL INBOUND O-99); 2287 renders it. A
// dock-bearing spec runs its WebKit cells here, under `guarded --exclusive webkit`:
//   npx playwright test -c tests-visual/webkit-2287.config.ts <spec> --project=webkit
import base from "./playwright.config";

const WEBKIT_2287 = `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`;

// W-I.8 RU-104: `webkit-touch` is the coarse-touch project's touch settings on WebKit 2287
// (a phone's viewport, touch, a mobile viewport), so a fault under `(hover: none)`, which
// 2287 matches only with touch, is read in WebKit as Safari on an iPhone would show it. It
// runs the `webkit` project's specs; a derived config's spec list applies to both.
export default {
    ...base,
    projects: base.projects!.flatMap((p) =>
        p.name === "webkit"
            ? [
                  { ...p, use: { ...p.use, launchOptions: { executablePath: WEBKIT_2287 } } },
                  {
                      ...p,
                      name: "webkit-touch",
                      use: { ...p.use, hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 }, launchOptions: { executablePath: WEBKIT_2287 } },
                  },
              ]
            : [p],
    ),
};
