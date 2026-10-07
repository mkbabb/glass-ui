"""Class sweep: §3 changes a published value at rest and §7 does not name it (pass 14 FN-06).

Row 8 of the formation checklist: every break has a MIGRATION row. Pass 14 FN-06: W-E.4 §3 item 11 moved
`--z-toggle` off `999` and gave every popper one side offset, which changes the `sideOffset` defaults of five
components, and W-E.4 §7 named neither. The plan's own rule is W-E.4 §7's practice (a value change at rest gets a
row: `--overlay-max-block`, the Popover width) and W-0.12 §7's ("no published name or value changes at rest").

Candidates, read from every wave's §3, one sentence at a time:

  TOKEN  a backticked custom property that `src/styles` declares (a published token), in a sentence that changes
         something (becomes, takes, is deleted, removed, goes, → , in place of, re-points, …)
  PROP   a backticked prop name that a `src` component declares with a default (`withDefaults`), in a sentence that
         changes something or names a default

A candidate is closed when the wave's §7 names it (a row or a sentence), or when the sentence hands the change to
another wave by id and that wave's §7 names it (OWNED). The rest are read by hand and listed in READS with the
reason the sentence changes no published value; READS entries that match no candidate are STALE.

Usage: migration-values.py <root>, where <root> is a checkout of HEAD (`src` is read from it). Exit 1 while any
candidate is open. BL_ROOT reads another copy of the plan.
"""
import os
import re
import subprocess
import sys

from plan_dag import WID, section, spec_ids

VERB = re.compile(r"\b(becomes?|takes?|deleted|removed|goes|re-?points?|re-?seats?|re-?declared?|moves? to|in place of|"
                  r"replaced|renamed|changes?|defaults?|one side offset)\b|→|not `", re.I)

READS = {
    ("W-E.8", "--radius-ctx"): "Metric's corners read the token; its value is unchanged (a reader, π in §6)",
    ("W-E.8", "--radius-sm"): "Metric stops reading the token; its value is unchanged",
    ("W-L.1", "--glass-veil-wash"): "the header reads the rung W-H.2 publishes; the token is unchanged",
    ("W-L.7", "--viz-amber"): "a consumer's own override (fourier), retired in that consumer's addendum, not a glass token change",
    ("W-0.5", "emphasis"): "the wave writes the 7.0.0 MIGRATION rows themselves in §3 (its §7 says so); no new break",
    ("W-0.5", "tone"): "the same 7.0.0 rows",
    ("W-B.12", "status"): "a field of the roster schema, not a component prop",
    ("W-E.6", "tone"): "the chip's `tone` is read to write its fill tint; the prop is unchanged",
    ("W-L.1", "tone"): "`DropdownMenuItem` gains Button's `tone` axis: additive, which §7 states",
    ("W-L.1", "--type-caption"): "the menu row's description line reads the caption rung; the token is unchanged",
    ("W-B.1", "--radius"): "a placement table citing the `--radius` ladder as F-64's class; W-C.4 §7 rows the token's removal",
    ("W-B.1", "--shadow-sm"): "the same table citing the shadcn shadow ladder; W-C.4 §7 rows `--shadow-sm` to `--shadow-2xl`",
}


def published(root):
    ls = subprocess.run(["git", "ls-files", "src/styles"], cwd=root, capture_output=True, text=True).stdout.split()
    toks = set()
    for f in ls:
        if f.endswith(".css"):
            toks |= set(re.findall(r"^\s*(--[a-z][\w-]*)\s*:", open(os.path.join(root, f), encoding="utf-8").read(), re.M))
    props = set()
    for f in subprocess.run(["git", "ls-files", "src"], cwd=root, capture_output=True, text=True).stdout.split():
        if f.endswith(".vue"):
            t = open(os.path.join(root, f), encoding="utf-8").read()
            for m in re.finditer(r"withDefaults\(\s*defineProps<[^>]*>\(\)\s*,\s*\{(.*?)\n\}\s*,?\s*\)", t, re.S):
                props |= set(re.findall(r"^\s{4}([a-zA-Z]+)\s*:", m.group(1), re.M))
    return toks, props


def main():
    if len(sys.argv) != 2 or not os.path.isdir(sys.argv[1]):
        print("usage: migration-values.py <root: a checkout of HEAD>")
        return 2
    toks, props = published(sys.argv[1])
    out, seen, n = [], set(), 0
    for w in spec_ids():
        s3, s7 = section(w, 3), section(w, 7)
        cands = {}
        for sent in re.split(r"(?<=[.;])\s+|\n(?=\s*(?:\d+\.|-|\|))", s3):
            if not VERB.search(sent):
                continue
            for x in re.findall(r"`(--[a-z][\w-]*)", sent):
                if x in toks:
                    cands.setdefault(("TOKEN", x), sent)
            for x in re.findall(r"`([a-z][a-zA-Z]+)`", sent):
                if x in props:
                    cands.setdefault(("PROP", x), sent)
        for (kind, x), sent in sorted(cands.items()):
            n += 1
            if re.search(r"(?<![\w-])" + re.escape(x) + r"(?![\w-])", s7):
                continue
            if any(o != w and re.search(r"(?<![\w-])" + re.escape(x) + r"(?![\w-])", section(o, 7)) for o in WID.findall(sent)):
                continue
            if (w, x) in READS:
                seen.add((w, x))
                continue
            out.append(f"OPEN {kind:5} waves/{w}.md §3: `{x}` changes in \"{sent.strip()[:110]}…\", and §7 does not name it")
    for k in READS:
        if k not in seen:
            out.append(f"OPEN STALE  READS entry {k} matches no open candidate")
    for r in out:
        print(r)
    print(f"published tokens {len(toks)}, props with defaults {len(props)}, candidates {n}, open {len(out)}")
    return 1 if out else 0


if __name__ == "__main__":
    sys.exit(main())
