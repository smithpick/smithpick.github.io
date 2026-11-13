# Tech Board: notes for Claude

## Who and what
- Mr. Smith, kindergarten technology teacher. Moving from a travel cart to his own room with a Newline board.
- Teacher-only display board, projected in class. Replaces Classroomscreen.
- Live at https://smithpick.github.io (repo smithpick/smithpick.github.io, GitHub Pages from main, root).
- The smithpick org is his personal org, not the district's. No school name in the org name on purpose (may change positions).

## Rules
- Public repo and site. No student names, class lists, class codes, or student faces in screenshots. Teacher's own name and avatar: keep out where easy. Exception he asked for: avatar.png (MS tiger logo) next to the clock.
- Kid-facing visuals use real screenshots, not drawings. Kindergartners need to see the exact thing they tap. Exception he approved: the generic Seesaw "Tech Activity" card (guides/2026-11-11-seesaw/3.jpg).
- Low maintenance. Has to survive a low-prep week.
- No em dashes. Short labels. Big text for a projector.
- Work step by step. Don't rework finished parts unless asked. Commit and push after each change.
- Original login-steps.html and login-practice.html stay untouched.

## Files
- index.html: the board. Clock (compact, with his MS tiger avatar, avatar.png; tap the tiger for a 4 second celebration: big tiger, confetti, fanfare), timer (1/2/3/5/10 min, +/-1, chime), weekly plan panel, steps viewer, guide viewer (Wall / Big; Edit button lets him tap steps to hide or show them, saved on that device only, remaining steps renumber), All pages list, backgrounds (Black + purple is default: avatar purple cards #2a0f58 / #391273 with white accents; Black + green still an option), Draw layer (pen/arrow/circle; its white bar uses fixed dark text so it reads in every theme), big Home button on full-screen pages.
- plans.js: one block per week, keyed by that week's Monday (YYYY-MM-DD). Optional icon: "icons/name.png" (real app icon cropped from screenshots, rounded square) replaces the number. Board opens to the newest week that has started. Future weeks can be added ahead. Old weeks stay.
- guides.js: step guides. id format YYYY-MM-DD-name. Optional practice: "page.html" adds a yellow Practice button on the guide and a Steps button on that page (Teach Your Monster uses login-practice.html). Images in guides/<guide id>/1.jpg, 2.jpg... Old guides stay and show in All pages.
- keyboard.html: projected Chromebook keyboard (lowercase keys, search key, Chromebook top row). Tap a key to light it orange (tap again to unlight, Clear resets). Typing on a real keyboard flashes that key. Opens as an overlay from anywhere: Keyboard button in the home top bar and next to Draw on guide/practice pages; Close keyboard returns to the same spot. Also works alone at smithpick.github.io/keyboard.html. Drawn, not a screenshot: he asked for it.
- Quick links (teacher only): Links button in the home top bar opens his list. Links live in HIS Google Sheet, read and written through an Apps Script web app (links-apps-script.gs, he deploys it). links-config.js holds only the web app URL. PIN checked server-side, remembered per device. + Add and Remove on the board write to the sheet, so every device sees the same list. Never put the links or the PIN in this public repo.
- sub.html, sub-note.pdf, sub-qr.svg: printable half-sheet sub note with QR code to the board.
- Google Slides links auto-open in present mode.

## Building a guide
- He uploads screenshots and says what kids tap.
- All app guides start from Classlink (kids get there on their own). Google Classroom based guides start "Tap Google Classroom", "Tap Technology", then Quick Links.
- Shared first step: guides/classlink.jpg, "Open Classlink". His full Classlink page (teacher view, staff apps left in because he wants the full screen), Frontline tooltip removed and the Google Classroom / Seesaw labels rebuilt. It is step 1 of all five guides; new guides start with it too.
- Crop to what kids need. If an icon sits in a different place for kids, crop tight to the icon only.
- Box tap targets in orange (#ff7a00 style rounded box). A big orange arrow is fine for "Scroll down".
- Cover teacher-only UI (remove buttons, tooltips, gradebook stats) with plain background.
- Kid-friendly words: "Tap the apple", "Find the purple S", "Find the green robot", "Pick one".
- Test in Playwright (Wall and Big, desktop and phone), then push.

## Current guides
- Log in to Teach Your Monster (10 steps: Open Classlink full page, original login page images, then Monster to Read tile, then your monster, NOT Practice)
- How to open INFOhio (Open Classlink, Infohio tile, Grades K-5, Scroll down, Tap the apple, Pick one)
- How to open TypeTastic (Open Classlink, Classroom, Technology, Quick Links TypeTastic, red fox, Pick a game)
- How to open Tap Lights (Open Classlink, Classroom, Technology, Quick Links Tap Lights, Pick one)
- How to open Seesaw (Open Classlink, purple S, green robot, Tap Start on generic card)

## Weekly plan
- Week of Nov 9, 2026: Dance Slides, Teach Your Monster, Login Practice, Classroom, TapLights.
- Next week not decided yet. He will say what goes on it.

## Open items
- Quick links: waiting on him to deploy links-apps-script.gs and send the /exec URL for links-config.js.
- Sub access: he can't share his Newline password. Check whether the board's built-in browser works without login; if so bookmark the site. Phone + QR is the fallback.
- After the move: confirm Pages serves at smithpick.github.io, regenerate sub-qr.svg and sub-note.pdf with that URL, update README links.
