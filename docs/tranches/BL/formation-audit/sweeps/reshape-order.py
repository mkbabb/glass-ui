"""Class sweep: a wave deletes or reshapes an artefact another wave builds on, and PLAN §5 does not order them
(FF-02, FG-01; the same class as FE-01/FF-01's shared kits, which the kit list in PLAN §5 now holds).

The kinds of reshaper X, read mechanically from every spec's §4:
  DELETE    a path, npm script or export X's §4 deletes, in every form the specs write (fix-9, FH-01): a `Deleted:`
            list; `<path>` (deleted…) or (split into…); `<path>` deleted / removed; delete(s) `<path>`; and inside a
            brace list `name (deleted)`. Every brace list `dir/{a,b}.ts` is expanded to its paths;
  MOVE      a file X's §4 moves: a `Moved…:` list (brace lists expanded), `<path>` (moved…), or an `old→new` rename
            inside or outside a brace list (W-D.1's and W-D.2's moves are the move ledger, PLAN §1, and are not
            read here, nor is a path marked "moved per W-D.1");
  LATCH     W-A.2 moves each latch's assertion into an owed file (W-A.2 §3 item 7's table, read mechanically): the
            latch file is P, and every later wave naming it is a row. The owner wave's row is read only if its §4
            names the table's owed file and `vitest.config.ts` (the hand-off carried, fix-9);
  WFEDIT    X's §4 edits a workflow file another wave's §4 also edits (two writers of one small file);
  WORKFLOW  X's §4 creates a `.github/workflows/*.yml`, which moves steps between workflow files.
A second table, UNLISTED, reads every spec's §3 for a whole-file deletion (a path with an extension or a trailing
slash and no line cite) that its own §4 does not delete: a deletion the reshaper rows above cannot see.
For each X and artefact P, every other wave Y whose §3, §4 or §5 names P is listed:
  OPEN      Y and X are unordered in PLAN §5's closure (either order breaks one of them);
  AFTER     Y lands after X and names P (a wave reading a deleted file, or writing into a moved workflow step);
  BEFORE    Y lands before X and Y's §5 names P (X's deletion would turn Y's gate red at the release commit,
            where W-L.8 step 1 re-runs every band's gates).
AFTER and BEFORE rows need a reading; ADJUDICATED below records each one with its reason. A row that is
listed and not adjudicated is OPEN. Exit 1 while any OPEN row stands, 0 when none does.
"""
import os
import re
import sys

from plan_dag import before, ordered, section, spec_ids, text

BACKTICK = re.compile(r"`([^`]+)`")
GENERIC = {"index.ts", "README.md", "styles.css", "types.ts", "constants.ts", "package.json", "lib.mjs",
           # W-C.1's "752 executable files under `docs/`": the paths it moves are its move list (W-C.1 §3 step 4,
           # PLAN §5's W-C.1 note), and `docs/` itself names this plan folder in every spec.
           "docs/"}


BRACE = re.compile(r"^(.*?)\{([^{}]*)\}(.*)$")


def expand(p):
    """A brace list in a backticked path, one level, as written in the specs:
    `dir/{a,b (deleted),c→d}.ts` -> [(`dir/a.ts`, None), (`dir/b.ts`, 'deleted'), (`dir/c.ts`, 'renamed')].
    A path with no brace is itself. Pass 8 (FH-01): the fix-8 parser read a brace list as one literal string,
    so `shaders/{metaball.frag,…}.ts` never matched the `metaball.frag.ts` another wave plants into."""
    m = BRACE.match(p)
    if not m:
        return [(p, None)]
    head, body, tail = m.groups()
    out = []
    for item in body.split(","):
        item = item.strip()
        mark = None
        if re.search(r"\(deleted\)", item):
            mark = "deleted"
        elif re.search(r"\((new|moved out)\)", item):
            mark = "new" if "new" in item else "moved"
        item = re.sub(r"\s*\([^)]*\)", "", item).strip()
        if "→" in item:
            item, mark = item.split("→", 1)[0].strip(), "renamed"
        out.append((head + item + tail, mark))
    return out


def _clean(found):
    keep = set()
    for p in found:
        p = re.sub(r":\d+(-\d+)?(,\d+)*$", "", p.strip())
        if p.startswith("{") or " " in p or p in GENERIC or not re.search(r"[/.:]", p):
            continue
        keep.add(p)
    return keep


def deletions(w):
    """Every path a spec's §4 deletes, in each form the specs write it: `Deleted:` lists; `<path>` (deleted…) or
    (split into…); `<path>` deleted/removed; delete(s) `<path>`; and, inside any brace list, `name (deleted)`.
    Each brace list is expanded (fix-9, FH-01)."""
    return _clean(_deleted_in(section(w, 4)))


DEL_FORMS = (r"`([^`]+)`\s*\((?:split into|deleted)", r"`([^`]+)`\s+deleted\b", r"\bdelete[sd]?\s+`([^`]+)`",
             r"`([^`]+)`\s+(?:is |are )?(?:removed|deleted)\b", r"`([^`]+)`\s+and\s+`[^`]+`\s+are\s+(?:removed|deleted)\b")


def _deleted_in(s):
    out = set()
    for m in re.finditer(r"Deleted:([^\n]*)", s):
        clause = re.split(r"\b(?:New|Edited|Moved)\b[^:]*:", m.group(1))[0]
        out.update(x for p in BACKTICK.findall(clause) for x, mark in expand(p) if mark != "new")
    for rx in DEL_FORMS:
        for m in re.finditer(rx, s):
            out.update(x for x, mark in expand(m.group(1)) if mark != "new")
    for p in BACKTICK.findall(s):
        out.update(x for x, mark in expand(p) if mark == "deleted")
    return out


# W-D.1's moves are its move ledger and W-D.2's join it (PLAN §1, "Gate paths and the base re-run"): the
# ledger re-points every gate path in the landing commit, so only the other waves' moves are read here.
LEDGER_MOVERS = {"W-D.1", "W-D.2"}


def moves(w):
    if w in LEDGER_MOVERS:
        return set()
    out = set()
    s4 = section(w, 4)
    for m in re.finditer(r"Moved[^:\n]*:([^\n]*)", s4):
        out.update(x for p in BACKTICK.findall(m.group(1)) for x, _ in expand(p)
                   if "." in x.split("/")[-1] and " " not in x and "<" not in x and not x.endswith(".md"))
    # `<path>` (moved…) and every `old→new` rename, inside a brace list or bare (fix-9, FH-01's class)
    for m in re.finditer(r"`([^`]+)`\s*\(moved(?! per W-D\.1)", s4):
        out.update(x for x, _ in expand(m.group(1)))
    for p in BACKTICK.findall(s4):
        if "{" in p:
            out.update(x for x, mark in expand(p) if mark == "renamed")
        elif "→" in p:
            out.add(p.split("→", 1)[0].strip())
    return {p for p in out if " " not in p}


def latches():
    """W-A.2 §3 item 7's table: (latch file, owed file, owner waves). Before fix-9 the table had no owed-file
    column; such a row reads owed None, so no owner can be shown to carry the hand-off."""
    out = []
    for line in section("W-A.2", 3).splitlines():
        m = re.match(r"^\s*\| `([\w.-]+\.test\.ts):\d+`[^|]*\|(.*)\|\s*$", line)
        if not m:
            continue
        cells = [c.strip() for c in m.group(2).split("|")]
        owed = next((c.strip("`") for c in cells if c.startswith("`tests/owed/")), None)
        out.append((m.group(1), owed, set(re.findall(r"W-[0-9A-L]\.\d+", cells[-1]))))
    return out


def unlisted(w):
    """Whole-file deletions a spec's §3 states and its own §4 does not delete."""
    d4 = deletions(w)
    out = set()
    for p in _deleted_in(section(w, 3)):
        p = p.strip()
        if re.search(r":\d", p) or not re.search(r"\.[a-z]{1,5}$|/$", p) or p.startswith((".", "-", "@")) or " " in p:
            continue
        base = p.rstrip("/").split("/")[-1]
        if not any(base in x for x in d4):
            out.add(p)
    return out


def workflow_creator(w):
    s4 = section(w, 4)
    news = " ".join(re.split(r"\bEdited\b", m.group(1))[0] for m in re.finditer(r"New:([^\n]*)", s4))
    return bool(re.search(r"\.github/workflows/[\w-]+\.yml`?\s*\(new\)", s4) or re.search(r"\.github/workflows/[\w-]+\.yml", news))


WF = re.compile(r"\b(ci|release|visual|verify)\.yml\b|\.github/workflows")


def names(y, p, secs=(3, 4, 5)):
    body = "\n".join(section(y, n) for n in secs)
    if p == "WORKFLOWS":
        return bool(WF.search(body))
    if p in body:
        return True
    if p.startswith("tests/owed/"):  # an owed file shares its latch file's basename; only its full path names it
        return False
    base = p.rstrip("/").split("/")[-1]
    # a bare file name is matched as a file name (it carries an extension), never as a word
    return re.fullmatch(r"[^.].*\.[A-Za-z0-9]+", base) and base not in GENERIC and re.search(rf"(?<![\w-]){re.escape(base)}(?![\w-])", body)


# Each AFTER/BEFORE row read by fix-8 (formation-audit/fix-8.md, FG-01), keyed X|P|Y.
ADJUDICATED = {
    'W-A.2|scripts/gate-register.mjs|W-C.1':
        'W-C.1 §2 is a HEAD reading and §3 step 5 states W-A.2 deletes it before W-C.1 (PLAN §5, fix-8); no gate of W-C.1 runs it',
    'W-A.2|tests/gates/gate-register.test.ts|W-B.7':
        "CONVERGES: B7-G1 reads `src` only; W-B.7 §3 item 2 leaves the file's residue to W-A.2, which deletes the file in either order",
    'W-A.3|WORKFLOWS|W-0.7':
        "band 0: W-0.n gates are the 10.2.0 cut's, read at v10.2.0 by W-0.7 step 1 and not re-run at 11.0.0 (W-L.8 §3.5 step 1, fix-8)",
    'W-A.3|WORKFLOWS|W-A.4':
        'W-A.4 §4 states the pixel-floor job is gone by W-A.3; A4-G8 (no swiftshader) and A4-G9 (the receipt step in release.yml) read lines W-A.3 leaves',
    'W-A.3|WORKFLOWS|W-A.5':
        "W-A.5 writes into ci.yml's verify job and release.yml before publish, jobs W-A.3 keeps; A5-G5 reads the workflow directory (fix-8)",
    'W-A.3|WORKFLOWS|W-A.6':
        "W-A.6 adds a receipt step to release.yml's publish job, which W-A.3 keeps (it adds `needs`); A6-G7 greps release.yml",
    'W-A.3|WORKFLOWS|W-B.13':
        "W-B.13 deletes release.yml's token env pair and TRUSTED PUBLISHING paragraph; W-A.3 rewrites only the :3-11 comment and adds the visual job",
    'W-A.3|WORKFLOWS|W-C.1':
        'W-C.1 drops `fetch-depth: 0` from ci.yml and release.yml; C1-G5 globs every workflow, so a visual.yml line would be read too',
    'W-A.3|WORKFLOWS|W-C.2':
        "W-C.2 item 8 rewritten for the order by fix-8: the ci.yml:58,60 brackets leave with W-A.3's pixel-floor job",
    'W-A.3|WORKFLOWS|W-C.3':
        "W-C.3's generator writes the CI-step block from the workflows at its landing; its --check runs in the suite, and W-C.3 item 2 is the one record that every later workflow or scripts edit regenerates it in the same commit (fix-9)",
    'W-A.3|WORKFLOWS|W-D.2':
        "W-D.2 §3 item 6 rewrites W-A.3's visual.yml to take the verify artifact; the order is PLAN §5's",
    'W-A.3|WORKFLOWS|W-E.1':
        "W-E.1 §4 adds a fixture-app step to W-A.3's visual.yml (fix-8)",
    'W-A.3|WORKFLOWS|W-K.1':
        "W-K.1 §4 adds a fixture-app step to W-A.3's visual.yml (fix-8)",
    'W-A.3|WORKFLOWS|W-L.2':
        "W-L.2 writes into W-D.2's verify.yml (item 12, fix-8), after both reshapers",
    'W-A.3|WORKFLOWS|W-L.3':
        'W-L.3 adds a ci.yml job with needs: [verify] and edits verify.yml (item 8, fix-8), after both reshapers',
    'W-A.3|WORKFLOWS|W-L.7':
        "W-L.7's closure check runs through npm test; no workflow line of its own (fix-8)",
    'W-A.3|WORKFLOWS|W-L.8':
        'W-L.8 step 5 names the jobs as W-D.2, W-A.5, W-L.2 and W-L.3 leave them (fix-8)',
    'W-A.5|.bundle-ratchet|W-0.7':
        "band 0: W-0.n gates are the 10.2.0 cut's, read at v10.2.0 by W-0.7 step 1 and not re-run at 11.0.0 (W-L.8 §3.5 step 1, fix-8)",
    'W-A.5|.bundle-ratchet|W-L.4':
        "CONVERGES: W-L.4 names scaena's fork's own `.bundle-ratchet` (fork bookkeeping, RETIRED), a file of the sibling fork, not this repository's",
    'W-A.5|.bundle-ratchet|W-L.8':
        'W-L.8 step 4 states W-A.5 deletes it; no W-L.8 gate reads it',
    'W-A.5|scripts/profile-bundle.mjs|W-C.1':
        'W-C.1 step 5 states W-A.5 deletes it before W-C.1 (fix-8); no W-C.1 gate runs it',
    'W-C.5|glass/canvas2d/resolveCanvasColor.ts|W-G.1':
        'W-G.1 §3 item 1 states W-C.5 has already deleted it',
    'W-D.1|scripts/import-dag.mjs|W-C.1':
        "C1-G6's import-dag leg is struck (fix-8); W-C.1's remaining mentions are its HEAD reading and the strike note, and its :523 edit lands before W-D.1 deletes the file (W-D.1 -> W-C.1)",
    'W-D.2|demo/vite.demo-dist.config.ts|W-A.2':
        'CONVERGES: a W-D.2 rename/move (marked so in its §4), which joins the move ledger (PLAN §1): the landing commit re-points every not-yet-landed gate path and the move engine re-points in-tree readers (W-D.2 §3 item 2); the spec cites the HEAD path',
    'W-D.2|demo/vite.demo-dist.config.ts|W-H.2':
        'CONVERGES: a W-D.2 rename/move (marked so in its §4), which joins the move ledger (PLAN §1): the landing commit re-points every not-yet-landed gate path and the move engine re-points in-tree readers (W-D.2 §3 item 2); the spec cites the HEAD path',
    'W-D.2|index.html|W-E.11':
        'CONVERGES: a W-D.2 rename/move (marked so in its §4), which joins the move ledger (PLAN §1): the landing commit re-points every not-yet-landed gate path and the move engine re-points in-tree readers (W-D.2 §3 item 2); the spec cites the HEAD path (W-E.11 §4 re-pointed to the HEAD path `index.html` by fix-8)',
    'W-D.2|index.html|W-H.4':
        'CONVERGES: a W-D.2 rename/move (marked so in its §4), which joins the move ledger (PLAN §1): the landing commit re-points every not-yet-landed gate path and the move engine re-points in-tree readers (W-D.2 §3 item 2); the spec cites the HEAD path',
    'W-D.2|WORKFLOWS|W-0.7':
        "band 0: W-0.n gates are the 10.2.0 cut's, read at v10.2.0 by W-0.7 step 1 and not re-run at 11.0.0 (W-L.8 §3.5 step 1, fix-8)",
    'W-D.2|WORKFLOWS|W-A.3':
        "A3-G5 re-written by fix-8 to read `visual` anywhere in a needs list, so it holds on W-D.2's `needs: [verify, visual]`; A3-G1, A3-G2 read visual.yml and the pixel-floor job's absence, which W-D.2 keeps",
    'W-D.2|WORKFLOWS|W-A.4':
        'W-D.2 §3 item 6 keeps the GPU receipt step in publish; A4-G8, A4-G9 hold on its shape',
    'W-D.2|WORKFLOWS|W-A.5':
        'A5-G5 reads the workflow directory (fix-8); W-D.2 moves the payload step into verify.yml',
    'W-D.2|WORKFLOWS|W-A.6':
        'CONVERGES: W-A.6 waits on OW-3; its receipt step sits in publish, which W-D.2 §3 item 6 keeps whichever side it lands on (PLAN §5, the workflow note)',
    'W-D.2|WORKFLOWS|W-B.13':
        'B13-G2 and B13-G4 read the token env and the paragraph; W-D.2 writes neither',
    'W-D.2|WORKFLOWS|W-C.1':
        "C1-G5 globs every workflow file; W-D.2's verify.yml checks out at depth 1 (§3 item 6, fix-8)",
    'W-D.2|WORKFLOWS|W-E.1':
        "CONVERGES: band E must not wait on loop D1 (PLAN §2); W-E.1's fixture build step in visual.yml stays where it stands under W-D.2 §3 item 6",
    'W-D.2|WORKFLOWS|W-K.1':
        "CONVERGES: band K must not wait on loop D1 (PLAN §2); W-K.1's fixture build step in visual.yml stays where it stands under W-D.2 §3 item 6",
    'W-D.2|WORKFLOWS|W-L.2':
        'W-L.2 item 12 writes check:consumer into verify.yml after W-D.2 (fix-8)',
    'W-D.2|WORKFLOWS|W-L.3':
        'W-L.3 item 8 and G-L3-8 written for verify.yml and a needs: [verify] job (fix-8)',
    'W-D.2|WORKFLOWS|W-L.7':
        "W-L.7's closure check runs through npm test inside verify.yml (fix-8)",
    'W-D.2|WORKFLOWS|W-L.8':
        "W-L.8 step 5 names W-D.2's jobs (fix-8)",
    'W-G.1|createCanvasLifecycle.ts|W-G.3':
        'W-G.3 §4 names the moved path `webgpu/createCanvasLifecycle.ts`, with W-G.1 before it',
    'W-L.3|scripts/verify-export-types.mjs|W-0.1':
        "band 0: W-0.n gates are the 10.2.0 cut's, read at v10.2.0 by W-0.7 step 1 and not re-run at 11.0.0 (W-L.8 §3.5 step 1, fix-8)",
    'W-L.3|scripts/verify-export-types.mjs|W-L.8':
        'W-L.8 step 4 states W-L.3 deletes it; no W-L.8 gate reads it',
    'W-A.6|release.yml|W-B.13':
        "CONVERGES: disjoint lines of the workflow, no gate of one reads the other's lines (PLAN §5, the workflow note, fix-8)",
    'W-A.6|release.yml|W-C.1':
        "CONVERGES: disjoint lines of the workflow, no gate of one reads the other's lines (PLAN §5, the workflow note, fix-8)",
    'W-A.6|release.yml|W-C.2':
        "CONVERGES: disjoint lines of the workflow, no gate of one reads the other's lines (PLAN §5, the workflow note, fix-8)",
    'W-A.6|release.yml|W-L.3':
        "CONVERGES: disjoint lines of the workflow, no gate of one reads the other's lines (PLAN §5, the workflow note, fix-8)",
    'W-B.13|release.yml|W-C.1':
        "CONVERGES: disjoint lines of the workflow, no gate of one reads the other's lines (PLAN §5, the workflow note, fix-8)",
    'W-B.13|release.yml|W-C.2':
        "CONVERGES: disjoint lines of the workflow, no gate of one reads the other's lines (PLAN §5, the workflow note, fix-8); W-C.2 strikes the :13 bracket only and W-B.13 deletes the paragraph (W-C.2 item 8)",
    'W-C.2|visual.yml|W-E.1':
        "CONVERGES: disjoint lines of the workflow, no gate of one reads the other's lines (PLAN §5, the workflow note, fix-8); W-C.2's E-10 detector reads every workflow as a test",
    'W-C.2|visual.yml|W-K.1':
        "CONVERGES: disjoint lines of the workflow, no gate of one reads the other's lines (PLAN §5, the workflow note, fix-8); W-C.2's E-10 detector reads every workflow as a test",
    # fix-9 (formation-audit/fix-9.md, FH-01): the rows the widened parser lists
    'W-G.1|src/components/blob/shaders/metaball.frag.ts|W-A.2':
        "A2-G8's webgl2 leg lives as long as the gl-excise fence it bites; W-G.1 deletes both (W-G.1 item 7), and W-L.8 §3.5 step 1 records the leg as not re-run at the release commit; G1-G1 holds the class (fix-9)",
    'W-G.1|composables/auroraFallbackGround.ts|W-G.6':
        "G6-G6 greps `src` for `.toDataURL(`; `auroraFallbackGround.ts:360` is its HEAD reading, not an input, so the rename does not move the gate",
    'W-G.7|./styles.css|W-D.1':
        "CONVERGES: W-D.1 changes no byte of either CSS entry and cites W-G.7 as the one record of whether `./styles.css` exists (W-D.1 item 5, fix-9); D1-G9 reads the entries its base carries",
    'W-G.7|./styles.css|W-L.3':
        "W-L.3's css leg compiles the README recipe through `./styles`, the one CSS entry W-G.7 leaves (fix-9); PLAN §3's W-L.3 row says the same",
    'W-A.2|radius-role-canon.test.ts|W-B.7':
        "CONVERGES: W-B.7 edits comments at `:246,262`; W-A.2's edit of the file is the `:458` latch and its fence, disjoint lines",
    'W-A.2|radius-role-canon.test.ts|W-J.1':
        "W-J.1 adds role rows beside W-E.8's; its §2 names `:458` as W-E.8's latch (a HEAD reading); G14 is RED by its absent rows, not by the latch",
    'W-A.2|engage-ladder.test.ts|W-I.3':
        "W-I.3 deletes the G7 row at `:249-253`; the latch is `:134`, which W-A.2 moves and W-J.2 brings home; disjoint",
    'W-A.2|g-dock-lattice.test.ts|W-I.2':
        "W-I.2 edits the G-DOCK-REACH/STATE fixture at `:432-444`; the latch is `:925`, W-I.1's; disjoint",
    'W-A.2|layout-canon.test.ts|W-D.2':
        "W-D.2's move engine re-points the path reader at `:81`; the latches are `:371`, `:390`, `:403`; disjoint",
    'W-A.2|layout-canon.test.ts|W-E.9':
        "owner of `:371` and `:403`: §3 item 6 and §4 name `tests/owed/layout-canon.test.ts` (its two rows out); the file and its `vitest.config.ts` exclusion are W-E.14's, which lands after it (fix-9)",
    'W-A.5|verify-export-types.mjs|UNLISTED':
        "§3 item 5 deletes `ratchetEvidence` and its callers inside the file, not the file (§4: Edited); W-L.3 deletes the file",
    'W-B.9|canvas2d/|UNLISTED':
        "W-B.9 §3 states that W-G.1 deletes it; W-G.1 §4 lists it",
    'W-C.1|scripts/loops/<loop>/|UNLISTED':
        "a template: each loop's last wave deletes its own dir (W-C.1 step 4); G-L8-14 reads the close",
    'W-D.1|Surface.vue|UNLISTED':
        "the alias inside `Surface.vue` is deleted, not the file",
    'W-E.11|vite.style-fold.ts|UNLISTED':
        "the base64 inlining step inside the file is deleted, not the file",
    'W-E.14|demo/stories/containers/configurator.vue|UNLISTED':
        "the `matchMedia` call inside the story is deleted, not the file",
    'W-G.1|resolveCanvasColor.ts|UNLISTED':
        "W-G.1 §3 states W-C.5 has already deleted it; W-C.5 §4 lists it",
    'W-G.4|aurora.wgsl.ts|UNLISTED':
        "the closed-form orbit inside the shader module is removed, not the file",
    'W-G.7|dist/component-styles.css|UNLISTED':
        "a build output, not a tracked file; §4 names its emission removed and `./styles.css` removed",
    'W-I.2|useDeckSnap.ts|UNLISTED':
        "`members()` inside the file is deleted, not the file",
    'W-K.4|accessibility.css|UNLISTED':
        "the `border-width: 2px !important` rules inside the file are deleted, not the file",
    'W-L.4|scripts/verify-export-types.mjs|UNLISTED':
        "W-L.4 §3 states W-L.3 deletes it; W-L.3 §4 lists it",
    'W-L.8|scripts/verify-export-types.mjs|UNLISTED':
        "W-L.8 step 4 states W-A.5 and W-L.3 delete these; their §4s list them",
}
# SWEEP_RAW=1 drops every reading, so the run is the bare enumeration (the record of the class before a cure).
if os.environ.get("SWEEP_RAW"):
    ADJUDICATED = {}


def main():
    ids = spec_ids()
    rows = []
    for x in ids:
        arts = [(p, "DELETE") for p in sorted(deletions(x))] + [(p, "MOVE") for p in sorted(moves(x))]
        if workflow_creator(x):
            arts.append(("WORKFLOWS", "WORKFLOW"))
        for p, kind in arts:
            for y in ids:
                if y == x or not names(y, p):
                    continue
                if not ordered(x, y):
                    rel = "OPEN"
                elif before(x, y):
                    rel = "AFTER"
                elif names(y, p, (5,)):
                    rel = "BEFORE"
                else:
                    continue
                key = f"{x}|{p}|{y}"
                verdict = ADJUDICATED.get(key)
                if verdict is None or (rel == "OPEN" and not verdict.startswith("CONVERGES")):
                    status = "OPEN"
                else:
                    status = "read"
                rows.append((status, rel, kind, x, p, y, verdict or ""))
    def wf_of(w):
        s4 = section(w, 4)
        found = set(re.findall(r"\b(ci|release|visual|verify)\.yml\b", s4))
        if re.search(r"\.github/workflows/\*\.yml", s4):  # a sweep over every workflow file
            found |= {"ci", "release", "visual"}
        return found

    wf_files = {w: wf_of(w) for w in ids}
    for i, x in enumerate(ids):
        for y in ids[i + 1:]:
            shared = wf_files[x] & wf_files[y]
            if shared and not ordered(x, y):
                for f in sorted(shared):
                    key = f"{x}|{f}.yml|{y}"
                    verdict = ADJUDICATED.get(key)
                    status = "read" if verdict and verdict.startswith("CONVERGES") else "OPEN"
                    rows.append((status, "OPEN", "WFEDIT", x, f + ".yml", y, verdict or ""))
    # LATCH: W-A.2 moves each latch's assertion into an owed file; every later wave naming the latch file is a row.
    for latch, owed, owners in latches():
        for y in ids:
            if y == "W-A.2" or not names(y, latch):
                continue
            rel = "OPEN" if not ordered("W-A.2", y) else ("AFTER" if before("W-A.2", y) else "BEFORE")
            if rel == "BEFORE" and not names(y, latch, (5,)):
                continue
            verdict = ADJUDICATED.get(f"W-A.2|{latch}|{y}")
            if y in owners and not os.environ.get("SWEEP_RAW"):
                s4 = section(y, 4)
                if owed and owed in s4 and "vitest.config.ts" in s4:
                    verdict = f"owner: §4 names {owed} and vitest.config.ts (the hand-off, W-A.2 §3 item 7)"
            ok = verdict and (rel != "OPEN" or verdict.startswith("CONVERGES"))
            rows.append(("read" if ok else "OPEN", rel, "LATCH", "W-A.2", latch, y, verdict or ""))
    # UNLISTED: a whole-file deletion §3 states and §4 does not delete.
    for w in ids:
        for p in sorted(unlisted(w)):
            verdict = ADJUDICATED.get(f"{w}|{p}|UNLISTED")
            rows.append(("read" if verdict else "OPEN", "-", "UNLISTED", w, p, "UNLISTED", verdict or ""))
    open_n = 0
    for status, rel, kind, x, p, y, why in rows:
        open_n += status == "OPEN"
        print(f"{status:4} {rel:6} {kind:8} {x} -> {p} :: {y}" + (f"  [{why}]" if why else ""))
    stale = set(ADJUDICATED) - {f"{x}|{p}|{y}" for _, _, _, x, p, y, _ in rows}
    for k in sorted(stale):
        print(f"STALE adjudication with no row: {k}")
    print(f"rows {len(rows)}, open {open_n}, stale {len(stale)}")
    sys.exit(1 if open_n or stale else 0)


if __name__ == "__main__":
    main()
