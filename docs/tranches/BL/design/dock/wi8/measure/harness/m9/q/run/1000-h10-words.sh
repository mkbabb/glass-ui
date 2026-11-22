set -u
m9/g.sh chromium 10 'node m9/frames9.mjs 5441 words --engine chromium --cell w-words --scheme light --action click:w-words-longer --stem w-words-grow'
m9/g.sh chromium 10 'node m9/frames9.mjs 5441 words --engine chromium --cell w-words --scheme light --action click:w-words-longer --pre w-words-longer --stem w-words-shrink'
m9/g.sh chromium 10 'node m9/frames9.mjs 5441 words --engine chromium --cell w-words --scheme dark --action click:w-words-longer --stem w-words-grow'
