// 11.0.1 critic round 1: the WebKit 2287 config with the critic's paint spec matched too.
// Run under `guarded --exclusive webkit`:
//   npx playwright test -c tests-visual/release-11-0-1-critic-1.config.ts <spec> --project=webkit
import wk from "./release-11-0-1.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) =>
        p.name === "webkit" ? { ...p, testMatch: [...(p.testMatch as string[]), "release-11-0-1-critic-1.spec.ts", "release-11-0-1-critic-1b.spec.ts"] } : p,
    ),
};
