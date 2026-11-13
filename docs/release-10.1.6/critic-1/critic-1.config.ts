// 10.1.6 critic 1: the suite's config with this directory as testDir, every project
// matched to the critic spec, and the webkit project on Playwright WebKit 2287.
//   npx playwright test -c docs/release-10.1.6/critic-1/critic-1.config.ts --project=<p> --workers=1
import base from "../../../tests-visual/playwright.config";

const WEBKIT_2287 = `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh`;

export default {
    ...base,
    testDir: new URL(".", import.meta.url).pathname,
    projects: base.projects!.map((p) =>
        p.name === "webkit"
            ? { ...p, testMatch: ["critic-1.spec.ts"], use: { ...p.use, launchOptions: { executablePath: WEBKIT_2287 } } }
            : p,
    ),
};
