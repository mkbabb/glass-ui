# plants6.py <name> apply|revert|list: MEASURE-6's counter-tests. plants5.py's, with RULINGS-5:
#   RU-42: G-4's inline-size plant retired (RU-28 left nothing for it to bite; G-4's "no seat's width
#   changes in one row" is proved by g4-openseat). G-1 (f)'s WebKit cell retired with it (the unit
#   witness in GlassDock.posture.test.ts carries the clause under g1-lift).
import importlib.util, os, sys
HERE = os.path.dirname(os.path.abspath(__file__))
spec = importlib.util.spec_from_file_location("plants5", os.path.join(HERE, "..", "m5", "plants5.py"))
p5 = importlib.util.module_from_spec(spec); spec.loader.exec_module(p5)
p4 = p5.p4
p4.ORIG = os.path.join(HERE, ".plant-orig")
D = p5.D
P = dict(p5.P)
P.pop("g4-inline")
if __name__ == "__main__":
    p4.P = P
    name, act = (sys.argv[1], sys.argv[2]) if len(sys.argv) > 2 else (None, "list")
    if act == "list":
        import json; print(json.dumps({k: v[0] for k, v in P.items()}, indent=1))
    elif act == "apply": p4.apply(name)
    elif act == "revert": p4.revert(name)
