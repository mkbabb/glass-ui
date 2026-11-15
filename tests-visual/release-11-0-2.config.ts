// 11.0.2: the WebKit 2287 config with the 11.0.2 spec, the forced-colors Slider spec and
// the 10.1.2 and 10.1.5 release specs matched, plus `webkit-2311`, the WebKit build the
// repo's Playwright resolves, unshimmed, for the 11.0.2 spec alone. Run under
// `guarded --exclusive webkit`:
//   npx playwright test -c tests-visual/release-11-0-2.config.ts <spec> --project=webkit
//   npx playwright test -c tests-visual/release-11-0-2.config.ts release-11-0-2.spec.ts --project=webkit-2311
import base from "./playwright.config";
import wk from "./webkit-2287.config";

const resolved = base.projects!.find((p) => p.name === "webkit")!;

export default {
    ...wk,
    projects: [
        ...wk.projects!.map((p) =>
            p.name === "webkit"
                ? { ...p, testMatch: ["release-11-0-2.spec.ts", "release-10-1-2.spec.ts", "release-10-1-5.spec.ts", "slider-forced-colors.spec.ts"] }
                : p,
        ),
        { ...resolved, name: "webkit-2311", testMatch: ["release-11-0-2.spec.ts"] },
    ],
};
