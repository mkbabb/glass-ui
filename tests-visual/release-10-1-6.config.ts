// 10.1.6: the WebKit 2287 config with the forced-colors Slider spec matched, so the
// witness runs in Playwright WebKit as well as Chromium. Run under
// `guarded --exclusive webkit`:
//   npx playwright test -c tests-visual/release-10-1-6.config.ts slider-forced-colors.spec.ts --project=webkit
import wk from "./webkit-2287.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) =>
        p.name === "webkit" ? { ...p, testMatch: ["slider-forced-colors.spec.ts"] } : p,
    ),
};
