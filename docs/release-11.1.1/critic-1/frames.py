# Critic 1: print an attachment's whole frame table for the titles that match.
#   frames.py <report> <attachment name> [title substring]
import json, base64, sys
r = json.load(open(sys.argv[1])); name = sys.argv[2]; sub = sys.argv[3] if len(sys.argv) > 3 else ""
def walk(s):
    for sp in s.get("specs", []):
        if sub not in sp["title"]: continue
        for t in sp["tests"]:
            for res in t["results"]:
                for a in res.get("attachments", []):
                    if a["name"] == name and "body" in a:
                        d = json.loads(base64.b64decode(a["body"]))
                        fr = d.pop("frames", None) if isinstance(d, dict) else d
                        print(res["status"], "|", sp["title"][:70], "|", json.dumps(d) if isinstance(d, dict) else "")
                        if fr: print("   ", " ".join(str(f).replace(" ", "") for f in fr[:60]))
    for c in s.get("suites", []): walk(c)
for s in r["suites"]: walk(s)
