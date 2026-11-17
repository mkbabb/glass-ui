# g14list.py <logs-dir> <build-tag>: MEASURE-7, m6/g14cmp.py's three lists named test by test: failing on both, passing
# only on the build, and on the build but not on master (a renamed or added test), per project.
import sys, importlib.util, io, contextlib, os
spec = importlib.util.spec_from_file_location("g14cmp", os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "m6/g14cmp.py"))
mod = importlib.util.module_from_spec(spec)
with contextlib.redirect_stdout(io.StringIO()):
    spec.loader.exec_module(mod)
b, m = mod.b, mod.m
for eng in ("chromium-headless-new", "coarse-touch", "webkit"):
    keys = [k for k in b if k[0] == eng]
    for name, sel in (("failing on both", lambda k: b[k] == "fail" and m.get(k) == "fail"),
                      ("passing only on the build", lambda k: b[k] == "pass" and m.get(k) == "fail"),
                      ("not on master", lambda k: k not in m),
                      ("flaky on the build", lambda k: b[k] == "flaky")):
        ks = [k for k in keys if sel(k)]
        if ks: print(f"{eng} · {name} ({len(ks)})"); [print(f"    {k[1]} › {k[2][:150]} [{b[k]}]") for k in ks]
