# Tech Board: notes for Claude

## Who and what
- Mr. Smith, kindergarten technology teacher. Moving from a travel cart to his own room with a Newline board.
- Teacher-only display board, projected in class. Replaces Classroomscreen.
- Live at https://smithpick.github.io (repo smithpick/smithpick.github.io, GitHub Pages from main, root).
- The smithpick org is his personal org, not the district's. No school name in the org name on purpose (may change positions).

## Rules
- Public repo and site. No student names, class lists, class codes, or student faces in screenshots. Teacher's own name and avatar: keep out where easy.
- Kid-facing visuals use real screenshots, not drawings. Kindergartners need to see the exact thing they tap. Exception he approved: the generic Seesaw "Tech Activity" card (guides/2026-11-11-seesaw/3.jpg).
- Low maintenance. Has to survive a low-prep week.
- No em dashes. Short labels. Big text for a projector.
- Work step by step. Don't rework finished parts unless asked. Commit and push after each change.
- Original login-steps.html and login-practice.html stay untouched.

## Files
- index.html: the board. Clock, timer (1/2/3/5/10 min, +/-1, chime), weekly plan panel, steps viewer, guide viewer (Wall / Big), All pages list, backgrounds (Black + green is default), Draw layer (pen/arrow/circle), big Home button on full-screen pages.
- plans.js: one block per week, keyed by that week's Monday (YYYY-MM-DD). Board opens to the newest week that has started. Future weeks can be added ahead. Old weeks stay.
- guides.js: step guides. id format YYYY-MM-DD-name. Images in guides/<guide id>/1.jpg, 2.jpg... Old guides stay and show in All pages.
- sub.html, sub-note.pdf, sub-qr.svg: printable half-sheet sub note with QR code to the board.
- Google Slides links auto-open in present mode.

## Building a guide
- He uploads screenshots and says what kids tap.
- All app guides start from Classlink (kids get there on their own). Google Classroom based guides start "Tap Google Classroom", "Tap Technology", then Quick Links.
- Crop to what kids need. If an icon sits in a different place for kids, crop tight to the icon only.
- Box tap targets in orange (#ff7a00 style rounded box). A big orange arrow is fine for "Scroll down".
- Cover teacher-only UI (remove buttons, tooltips, gradebook stats) with plain background.
- Kid-friendly words: "Tap the apple", "Find the purple S", "Find the green robot", "Pick one".
- Test in Playwright (Wall and Big, desktop and phone), then push.

## Current guides
- Log in to Teach Your Monster (9 steps: original login page images, then Monster to Read tile, then your monster, NOT Practice)
- How to open INFOhio (Infohio tile, Grades K-5, Scroll down, Tap the apple, Pick one)
- How to open TypeTastic (Classroom, Technology, Quick Links TypeTastic, red fox, Pick a game)
- How to open Tap Lights (Classroom, Technology, Quick Links Tap Lights, Pick one)
- How to open Seesaw (purple S, green robot, Tap Start on generic card)

## Weekly plan
- Week of Nov 9, 2026: Dance Slides, Teach Your Monster Login, Login Practice, Classroom, TapLights.
- Next week not decided yet. He will say what goes on it.

## Open items
- Sub access: he can't share his Newline password. Check whether the board's built-in browser works without login; if so bookmark the site. Phone + QR is the fallback.
- After the move: confirm Pages serves at smithpick.github.io, regenerate sub-qr.svg and sub-note.pdf with that URL, update README links.
