#!/bin/sh
# I8-G8 source arm (fold). Portable POSIX ERE (BSD and glibc), whole src/, untracked files included.
# usage: g8-source.sh [<rev>]   (no rev: the working tree incl. untracked; rev: that commit)
A='filter["'"'"'`]?[[:space:]]*[:=,][[:space:]]*["'"'"'`]?[[:space:]]*url\([[:space:]]*["'"'"']?#'
B='<filter[[:space:]>]|createElementNS\([^)]*["'"'"']filter["'"'"']'
C='^[[:space:]]*[^/*[:space:]][^/]*(useDockFission|GooFilter)'
if [ -n "$1" ]; then git grep -nIE -e "$A" -e "$B" -e "$C" "$1" -- src
else git grep -nIE --untracked -e "$A" -e "$B" -e "$C" -- src; fi
