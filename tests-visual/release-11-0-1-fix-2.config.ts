// 11.0.1 fix 2: the WebKit 2287 config with the fix seat's spec and critic 1's paint spec
// matched. Run under `guarded --exclusive webkit`:
//   npx playwright test -c tests-visual/release-11-0-1-fix-2.config.ts <spec> --project=webkit
import wk from "./release-11-0-1-critic-1.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) =>
        p.name === "webkit" ? { ...p, testMatch: [...(p.testMatch as string[]), "release-11-0-1-fix-2.spec.ts"] } : p,
    ),
};
