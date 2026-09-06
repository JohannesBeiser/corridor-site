# corridor-site

The public pages for Corridor: the privacy policy and the support page the App Store listing points at.
Source of truth is `docs/site/` in the app repo; this repo is what GitHub Pages serves.

## The three films

`index.html` puts three takes of the same demo path in one phone frame and switches between them
with the tabs above it — the app's own colours, its dark mode, and mosquito mode. They are shot
from the app repo, from `docs/demo/gdt-tour.json`, and they must be shot from the same path or the
timeline beside the phone stops describing what the phone is doing.

| file | how it is shot |
|---|---|
| `demo/gdt-tour.mp4` | `Tools/record-demo.sh` in the app repo |
| `demo/gdt-tour-dark.mp4` | `Tools/record-demo.sh --mode dark --no-build` — the same take with `-energySave 1` |
| `demo/gdt-tour-mosquito.mp4` | `Tools/record-demo.sh --mode mosquito --no-build` — the same, with `-mosquitoMode 1` |

Then `python3 Tools/publish-demo.py` once, which copies all three films and the poster and
rewrites both `#demo-timeline` and `#demo-variants` in `index.html`. So the whole job is:

```sh
Tools/record-demo.sh                              # in ~/Development/Corridor
Tools/record-demo.sh --mode dark --no-build
Tools/record-demo.sh --mode mosquito --no-build
python3 Tools/publish-demo.py
```

**Re-record all three together**: they are stacked in one box and played off one clock, so a
variant shot against a different cut of the app is a switch that jumps. `--no-build` on the
second and third is what guarantees all three came off one binary, and `--mode` is what keeps
them from overwriting each other — the two variants were a hand-edit of `record-demo.sh` and a
hand-copy into `demo/` until 2026-09-10, which is how they had drifted a build apart.

**Seeking needs a server that answers `Range`.** `python3 -m http.server` does not: it replies
`200` with the whole 9 MB file, so pressing a tick or a mode tab restarts the film from the
beginning and the page looks broken locally while being fine in production. GitHub Pages answers
ranges. Check with `curl -s -D- -o /dev/null -r 0-1 <url>/demo/gdt-tour.mp4` and look for `206`.
