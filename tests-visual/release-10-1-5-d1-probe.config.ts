// fix 9 scratch: the 2287 WebKit config with the D-1 probe matched.
import wk from "./webkit-2287.config";

export default {
    ...wk,
    projects: wk.projects!.map((p) => (p.name === "webkit" ? { ...p, testMatch: ["release-10-1-5-d1-probe.spec.ts"] } : p)),
};
