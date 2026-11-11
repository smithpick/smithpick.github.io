// Step guides. Claude adds a new guide here each week. Old guides stay in this list
// and show up under "Past guides" on the board, newest first.
//
// To show a guide on the plan, add this to plans.js:
//   { label: "Short label", type: "guide", guide: "<guide id>" }
//
// Pictures go in guides/<guide id>/1.jpg, 2.jpg, ...
// Public repo: no student names, class lists, or class codes in screenshots or text.

const GUIDES = [
  {
    id: "2026-11-11-taplights",
    title: "How to open Tap Lights",
    date: "2026-11-11",
    steps: [
      { img: "guides/2026-11-11-taplights/1.jpg", say: "Tap Google Classroom" },
      { img: "guides/2026-11-11-taplights/2.jpg", say: "Tap Technology" },
      { img: "guides/2026-11-11-taplights/3.jpg", say: "Tap Tap Lights" },
      { img: "guides/2026-11-11-taplights/4.jpg", say: "Pick one" }
    ]
  },
  {
    id: "2026-11-11-typetastic",
    title: "How to open TypeTastic",
    date: "2026-11-11",
    steps: [
      { img: "guides/2026-11-11-typetastic/1.jpg", say: "Tap Google Classroom" },
      { img: "guides/2026-11-11-typetastic/2.jpg", say: "Tap Technology" },
      { img: "guides/2026-11-11-typetastic/3.jpg", say: "Tap TypeTastic" },
      { img: "guides/2026-11-11-typetastic/4.jpg", say: "Tap the red fox" },
      { img: "guides/2026-11-11-typetastic/5.jpg", say: "Pick a game" }
    ]
  },
  {
    id: "2026-11-11-infohio",
    title: "How to open INFOhio",
    date: "2026-11-11",
    steps: [
      { img: "guides/2026-11-11-infohio/1.jpg", say: "Tap Infohio" },
      { img: "guides/2026-11-11-infohio/2.jpg", say: "Tap Grades K-5" },
      { img: "guides/2026-11-11-infohio/3.jpg", say: "Scroll down" },
      { img: "guides/2026-11-11-infohio/4.jpg", say: "Tap the apple" },
      { img: "guides/2026-11-11-infohio/5.jpg", say: "Pick one" }
    ]
  },
  // {
  //   id: "2026-11-16-taplights",
  //   title: "How to open TapLights",
  //   date: "2026-11-16",
  //   steps: [
  //     { img: "guides/2026-11-16-taplights/1.jpg", say: "Tap Google Classroom" },
  //     { img: "guides/2026-11-16-taplights/2.jpg", say: "Tap TapLights" }
  //   ]
  // }
];
