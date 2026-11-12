import wk from "./webkit-2287.config";
export default { ...wk, projects: wk.projects!.map((p) => (p.name === "webkit" ? { ...p, testMatch: ["_o266-probe.spec.ts"] } : p)) };
