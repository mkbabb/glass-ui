#!/usr/bin/env bash
D=DESIGN.md; fail=0
grep -q "Weak tier — we don't ship these" $D && { echo "RED: §L4 weak-tier disclaimer still present"; fail=1; }
grep -q "do not have first-class glass-ui substrate" $D && { echo "RED: §L4 'we dont ship' prose present"; fail=1; }
grep -q "ease-cartoon-punch" $D || { echo "RED: --ease-cartoon-punch absent"; fail=1; }
grep -q "spring-cartoon" src/composables/motion/springPresets.ts && { echo "RED: cartoon snuck into SPRING_PRESETS"; fail=1; }
awk '/Cartoon shadows \(offset, layered\)/{f=1} f&&/rgba\(0,0,0/{print "RED: cartoon prose still raw rgba(0,0,0)"; exit 3}' $D; [ $? -eq 3 ] && fail=1
grep -q "Aristotelian Proportion" $D || { echo "RED: §L6 absent"; fail=1; }
grep -q "Cross-Engine Floor" $D || { echo "RED: §L7 absent"; fail=1; }
grep -q "Seven precepts compose the language" $D || { echo "RED: precept count not Seven"; fail=1; }
grep -q "Five principles govern the library" $D || { echo "RED: Philosophy count not Five"; fail=1; }
[ $fail -eq 0 ] && echo "GREEN: all five edicts encoded" || { echo "GATE RED (expected, born-RED on current DESIGN.md)"; exit 1; }
