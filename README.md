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
| `demo/gdt-tour.mp4` | `Tools/record-demo.sh` in the app repo, then `python3 Tools/publish-demo.py` — which also rewrites the `#demo-timeline` block in `index.html` |
| `demo/gdt-tour-dark.mp4` | the same take with `-energySave 1` added to the app's launch arguments |
| `demo/gdt-tour-mosquito.mp4` | the same take with `-mosquitoMode 1` |

`publish-demo.py` copies the default take and nothing else, so the two variants are copied into
`demo/` by hand. **Re-record all three together**: they are stacked in one box and played off one
clock, so a variant shot against a different cut of the app is a switch that jumps.
