#!/bin/bash
# resume.sh: the chain after the 18:38 stop. W·l's battery and fmlow ran whole in the stopped slot (battery/); its A/B and
# readings run here as their own slot(s); then W·d's att slot(s) whole; then cost.
cd "$(dirname "$0")"
ENGS=webkit THEMES=light STEPS=att SUB="cr chk fmt si frz ab fmab r2 heir" bash chain.sh
ENGS=webkit THEMES=dark STEPS="att cost" bash chain.sh
