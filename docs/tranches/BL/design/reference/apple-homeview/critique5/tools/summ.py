import json, sys
d = json.load(open(sys.argv[1]))
print("head pass", d["head"]["gate_pass"], [(r["file"].split("/")[-1], r["pass"]) for r in d["head"]["rows"]])
for k, v in d["plants"].items():
    det = v["detail"]
    why = [x["what"] for s in det["sinks"] for x in s["violations"] + s["unresolved"]] + ["hand %d" % h["line"] for h in det["hand_rolled"]]
    print("%-28s %-11s gate=%-5s G4=%-5s sinks=%d %s" % (k, v["expect"][:11], v["gate_pass"], v["F1_G4_pass"], len(det["sinks"]), why[:2]))
