// 11.0.1: the WebKit 2287 config with the 11.0.1, 10.1.5, 10.1.4 and 10.1.3 release specs
// matched. Run under `guarded --exclusive webkit`:
//   npx playwright test -c tests-visual/release-11-0-1.config.ts <spec> --project=webkit
import wk from "./webkit-2287.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) =>
        p.name === "webkit"
            ? { ...p, testMatch: ["release-11-0-1.spec.ts", "release-11-0-1-daraksha.spec.ts", "release-10-1-5.spec.ts", "release-10-1-4.spec.ts", "release-10-1-3.spec.ts"] }
            : p,
    ),
};
