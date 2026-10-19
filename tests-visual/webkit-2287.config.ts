// The `webkit` project on Playwright WebKit build 2287. The repo's Playwright resolves
// WebKit 2311, which crashes every page that mounts a GlassDock on the dock's nested
// translucent `color-mix()` (atlas U-batch N-1, BL INBOUND O-99); 2287 renders it. A
// dock-bearing spec runs its WebKit cells here, under `guarded --exclusive webkit`:
//   npx playwright test -c tests-visual/webkit-2287.config.ts <spec> --project=webkit
import base from "./playwright.config";

const WEBKIT_2287 = `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`;

export default {
    ...base,
    projects: base.projects!.map((p) =>
        p.name === "webkit"
            ? { ...p, use: { ...p.use, launchOptions: { executablePath: WEBKIT_2287 } } }
            : p,
    ),
};
