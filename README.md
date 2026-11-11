# Techboard

Teacher-only display board. Open `index.html` (or the GitHub Pages URL) and project it.

## Add or change a lesson
Edit `plans.js` only. Each item:
- `label`: short text on the button
- `type`: `"steps"` opens a page full screen on the board, `"guide"` opens a guide from `guides.js`, `"link"` opens a new tab
- `url`: leave `""` if the link isn't ready (button shows "Link needed")

## Step guides
New guides go in `guides.js`, pictures in `guides/<guide id>/`. Old guides stay in the list and show under "Past guides" on the board.
In a guide: Next/Back, "Show all" for the wall of cards, "Big" for one picture at a time.

## Keys
- D: draw on/off
- Esc: stop drawing, or close steps
- Left / Right: back / next on a steps page
- Ctrl+Z: undo last mark

## Rules
Public repo. No student names, class lists, or class codes.
