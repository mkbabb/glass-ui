# apps9.py: MEASURE-9 part H, item H13 (RU-109, RU-113): the apps' deletable dock code by ORCH line 2's rule (a line is
# code unless it is blank or its first characters open or continue a comment: s8/codelines.mjs's rule), read with
# `git show <ref>:<path>` at each consumer's current ref (its origin/master as this machine has it; nothing fetched,
# nothing checked out). Each block is what 11.2.0 as ruled lets the app delete, with whose word says so; a line that
# stays and only loses an attribute (a DropdownMenu's `@update:open`) is listed as changed, not counted.
# Output: logs/m9-apps.txt (the table) and logs/m9-apps.json.
import json, os, re, subprocess, sys
P = "/Users/mkbabb/Programming"
L = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "logs")

def show(repo, ref, path):
    return subprocess.run(["git", "-C", f"{P}/{repo}", "show", f"{ref}:{path}"], capture_output=True, text=True, check=True).stdout.split("\n")

def codeset(lines):
    out, inc = set(), False
    for i, l in enumerate(lines, 1):
        s = l.strip()
        if inc == "html":
            if "-->" in s: inc = False
            continue
        if inc:
            if "*/" in s: inc = False
            continue
        if s.startswith("<!--") and "-->" not in s: inc = "html"; continue
        if s.startswith("/*") and "*/" not in s: inc = True; continue
        if not s or s.startswith("//") or s.startswith("/*") or s.startswith("*") or s.startswith("<!--"): continue
        out.add(i)
    return out

def count(repo, ref, path, ranges):
    lines = show(repo, ref, path)
    code = codeset(lines)
    if ranges == "all": want = set(range(1, len(lines) + 1))
    else:
        want = set()
        for r in ranges.split(","):
            a, b = (r.split("-") + [r])[:2]
            want |= set(range(int(a), int(b) + 1))
    return len(want & code), len(lines) if ranges == "all" else len(want)

REF = {"fourier-analysis": "266bd67", "daraksha": "24a6dbd", "hassio-config-worktrees/apx-ui-r11": "ce9eddf6"}
# (repo, path, ranges, block, whose word, ruled by 11.2.0 as built?)
B = [
    ("fourier-analysis", "web/src/components/shared/StageDock.vue", "all", "the stage dock: two GlassDocks and their hold, given way to one ControlsDock (the file's header says so)", "RULINGS-8 step-10 draft (StageDock bullet); the file's own header", "yes: ControlsDock with corner, within, expand-on, #collapsed, #persistent-end"),
    ("fourier-analysis", "web/src/components/auth/UserSlugBar.vue", "7,27-31", "the account menu's dock hold (and the removed useOptionalDockContext import)", "G-8's menu hold (RU-114): a menu in a dock holds it", "yes if G-8's menu hold covers a DropdownMenu in GlassDock's run (read on w-ctlm, H1)"),
    ("fourier-analysis", "web/src/components/layout/AppDock.vue", "328-331", "the Sections menu's dock hold", "as above", "as above"),
    ("fourier-analysis", "web/src/components/visualization/AnimationControls.vue", "116-119", "the animation menus' dock hold", "as above", "as above"),
    ("fourier-analysis", "web/src/components/layout/AppDock.vue", "564", "--dock-trigger-min-height: the default now", "RULINGS-8 C8-10", "yes (RU-99)"),
    ("fourier-analysis", "web/src/components/shared/StageDock.vue", "130", "(inside StageDock, already counted)", "RULINGS-8 C8-10", "yes"),
    ("fourier-analysis", "web/src/components/visualization/AnimationControls.vue", "437", "--dock-trigger-min-height: the default now", "RULINGS-8 C8-10", "yes (RU-99)"),
    ("daraksha", "src/shell/dockHold.ts", "all", "the app's one dock hold (glass's interim recipe)", "RULINGS-8 step-10 draft; the file's header", "yes: the outlet carries teleported seats and their holds"),
    ("daraksha", "src/App.vue", "9,28", "the hold's provide", "follows dockHold.ts", "yes"),
    ("daraksha", "src/name/NameDock.vue", "31,49,53", "the slider's held press (REMOVE AT GLASS 11.2.0)", "the app's mark", "yes: G-1 (f), a held finger folds nothing"),
    ("daraksha", "src/portraits/PortraitsDock.vue", "18,24,26", "the slider's held press (REMOVE AT GLASS 11.2.0)", "the app's mark", "yes: as above"),
    ("daraksha", "src/shell/ControlsSeat.vue", "all", "the controls seat, whose body becomes <ControlsDock> (its header); the site's place and palette lines in it are not split out", "the file's header; RULINGS-8 step-10 draft", "yes, less the site's place, palette and seat-name lines it keeps"),
    ("daraksha", "src/shell/SiteDock.vue", "69-135", "the khatam's fission seat, script (REMOVE AT GLASS 11.2.0)", "the app's mark", "not ruled: the tip has no fission seat (src/components/dock/index.ts:72-78, definition-absent); the app's mark expects one"),
    ("daraksha", "src/shell/SiteDock.vue", "41,137-223", "the 6 s linger, its hold and the outside press (REMOVE AT GLASS 11.2.0)", "the app's mark", "yes: the linger is glass's (--dock-linger), the outside press is glass's"),
    ("daraksha", "src/shell/SiteDock.vue", "279-290", "the fission seat and its neck, template (REMOVE AT GLASS 11.2.0)", "the app's mark", "not ruled: as the fission script"),
    ("daraksha", "src/shell/SiteDock.vue", "467-583", "the .fission styles (REMOVE AT GLASS 11.2.0)", "the app's mark", "not ruled: as the fission script"),
    ("daraksha", "src/pages/ScripturePage.vue", "245-258", "the reader dock's View Transition (REMOVE AT GLASS 11.2.0: O-222)", "the app's mark", "yes: the carrier carries the layer's re-fit (G-4)"),
    ("daraksha", "src/shell/heldDialog.ts", "all", "a page-owned dialog holding the dock (ControlsSeat's interim `held`)", "ControlsSeat.vue's header: 'until ControlsDock holds what its seats open with no wiring'", "not ruled: no cell reads a page-owned dialog held by ControlsDock; listed apart"),
    ("hassio-config-worktrees/apx-ui-r11", "frontend/src/styles/scale.css", "156-158", "LF-11: the floor trigger a full seat", "RULINGS-8 C8-10; the rule's own comment", "yes (RU-99)"),
]
rows, tot = [], {}
for repo, path, rng, what, word, built in B:
    try:
        c, n = count(repo, REF[repo], path, rng)
    except subprocess.CalledProcessError as e:
        c, n = None, None
    if "already counted" in what: c = 0
    rows.append({"repo": repo, "ref": REF[repo], "path": path, "lines": rng, "span": n, "code": c, "block": what, "word": word, "built": built})
    key = repo.split("/")[0]
    if c and not built.startswith("not ruled"): tot[key] = tot.get(key, 0) + c
apart = sum(r["code"] or 0 for r in rows if r["built"].startswith("not ruled"))
changed = [
    "fourier AppDock.vue:409, AnimationControls.vue:236, :249, :305, :390 and UserSlugBar.vue:186: the DropdownMenus' @update:open (or its call) to the hold, dropped from a line that stays",
    "daraksha ScripturePage.vue:227 and :838: dockChange(go) becomes go(); SiteDock.vue:233-234, :291: the .fission wrapper and its handlers",
    "daraksha ColourPage.vue:27, :66: useHeldDialog (with heldDialog.ts, listed apart)",
]
with open(os.path.join(L, "m9-apps.txt"), "w") as f:
    f.write("repo @ ref | file | lines | span | code | block | 11.2.0 as ruled\n")
    for r in rows: f.write(f"{r['repo']} @ {r['ref']} | {r['path']} | {r['lines']} | {r['span']} | {r['code']} | {r['block']} | {r['built']}\n")
    f.write(f"\ntotal deletable code lines by app: {json.dumps(tot)}; all apps {sum(tot.values())}; listed apart (not ruled): {apart}\n")
    f.write("changed, not counted:\n" + "\n".join("  " + c for c in changed) + "\n")
json.dump({"rows": rows, "total": tot, "apart": apart, "changed": changed}, open(os.path.join(L, "m9-apps.json"), "w"), indent=1)
print(open(os.path.join(L, "m9-apps.txt")).read())
