// 11.0.2: the WebKit 2287 config with the 11.0.2 spec and the 10.1.2 and 10.1.5 release
// specs matched. Run under `guarded --exclusive webkit`:
//   npx playwright test -c tests-visual/release-11-0-2.config.ts <spec> --project=webkit
import wk from "./webkit-2287.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) =>
        p.name === "webkit"
            ? { ...p, testMatch: ["release-11-0-2.spec.ts", "release-10-1-2.spec.ts", "release-10-1-5.spec.ts"] }
            : p,
    ),
};
