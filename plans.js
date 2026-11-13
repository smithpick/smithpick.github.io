// One block per week. "week" is that week's Monday (YYYY-MM-DD).
// The board opens to the newest week that has started. Old weeks stay here as a record
// and can be picked from the week menu. Anything ever used shows under "All pages".
//
// Item types:
//   "guide" = a step guide from guides.js (opens full screen)
//   "steps" = a page in this repo (opens full screen)
//   "link"  = opens in a new tab
// Optional icon: "icons/name.png" shows a real app icon in place of the number.
//
// Public repo: no student names, class lists, or class codes in this file.

const PLANS = [
  {
    week: "2026-11-16",
    items: [
      { label: "Alphatrain Story",     type: "link", url: "https://watch.vooks.com/videos/alphatrain" },
      { label: "Name Typing",          type: "guide", guide: "2026-11-16-name-typing" },
      { label: "Typing on Tap Lights", type: "guide", guide: "2026-11-11-taplights", icon: "icons/taplights.png" }
    ]
  },
  {
    week: "2026-11-09",
    items: [
      { label: "Dance Slides",        type: "link",  url: "https://docs.google.com/presentation/d/1KMfl8qeZMs3BYgkST3lehQhcGIaVe5quUXnDFO5Ff0w/edit?slide=id.g27b930ed771_0_60#slide=id.g27b930ed771_0_60", icon: "icons/dance.png" },
      { label: "Teach Your Monster", type: "guide", guide: "2026-11-11-teach-your-monster", icon: "icons/tym.png" },
      { label: "Login Practice",      type: "steps", url: "login-practice.html", icon: "icons/practice.png" },
      { label: "Classroom",           type: "link",  url: "https://classroom.google.com", icon: "icons/classroom.png" },
      { label: "TapLights",           type: "link",  url: "https://sites.google.com/plsd.us/taplights-pkc/home", icon: "icons/taplights.png" }
    ]
  }
];
