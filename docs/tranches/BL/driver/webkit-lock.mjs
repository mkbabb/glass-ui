// One Playwright WebKit run machine-wide across every BL harness (2026-10-15).
// WindowServer aborted in captureWindowList after five seats ran WebKit screenshot loops at once:
// WebKit's page.screenshot() is a window snapshot through WindowServer, so concurrent runs stack IOSurfaces.
// A process takes the lock at its first WebKit launch and holds it until it exits; relaunches inside the
// process (the 60-load retire) reuse it. A lock whose owner pid is dead is taken over.
import fs from "node:fs";
import path from "node:path";

const DIR = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/locks/webkit";
const OWNER = path.join(DIR, "owner");
const MAX_WAIT_S = Number(process.env.BL_WEBKIT_LOCK_WAIT_S ?? 2400);
let held = false;

const alive = (pid) => { try { process.kill(pid, 0); return true; } catch (e) { return e.code === "EPERM"; } };
const release = () => {
    if (!held) return;
    try { if (fs.readFileSync(OWNER, "utf8").startsWith(`${process.pid} `)) fs.rmSync(DIR, { recursive: true, force: true }); } catch {}
    held = false;
};

export async function holdWebkit(label = path.basename(process.argv[1] ?? "harness")) {
    if (held) return;
    fs.mkdirSync(path.dirname(DIR), { recursive: true });
    const t0 = Date.now();
    let said = false;
    for (;;) {
        try { fs.mkdirSync(DIR); fs.writeFileSync(OWNER, `${process.pid} ${label}`); held = true; break; }
        catch {
            let owner = ""; try { owner = fs.readFileSync(OWNER, "utf8"); } catch {}
            const pid = Number(owner.split(" ")[0]);
            if (!pid || !alive(pid)) { fs.rmSync(DIR, { recursive: true, force: true }); continue; }
            if ((Date.now() - t0) / 1000 > MAX_WAIT_S) throw new Error(`WebKit lock held by "${owner}" for ${MAX_WAIT_S} s; one BL WebKit run at a time`);
            if (!said) { console.error(`(waiting for the BL WebKit lock, held by ${owner})`); said = true; }
            await new Promise((r) => setTimeout(r, 3000));
        }
    }
    if (said) console.error(`(BL WebKit lock taken after ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
    process.on("exit", release);
    for (const sig of ["SIGINT", "SIGTERM", "SIGHUP"]) process.once(sig, () => { release(); process.exit(128 + (sig === "SIGINT" ? 2 : sig === "SIGTERM" ? 15 : 1)); });
}
