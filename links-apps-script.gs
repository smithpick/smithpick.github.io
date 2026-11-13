// Tech Board quick links: Google Sheet + Apps Script.
// The board reads and adds links through this script. A PIN keeps the list private.
//
// One-time setup (about 10 minutes):
// 1. Make a new Google Sheet (any name, e.g. "Tech Board Links").
// 2. Extensions > Apps Script. Delete what's there and paste this whole file. Save.
// 3. Change the PIN below to your own, pick setup from the function menu, click Run, allow access.
//    That creates the Links tab and saves the PIN. You can change the PIN here later and run setup again.
// 4. Deploy > New deployment > type: Web app.
//      Execute as: Me
//      Who has access: Anyone
//    Click Deploy and copy the Web app URL (ends in /exec).
// 5. Send that URL to Claude to put in links-config.js.
// If the district account won't allow "Anyone", do steps 1-4 with a personal Google account.
//
// Editing links by hand: open the sheet. Column A = name, B = link, C = group (optional).
//
// TODAY (board's plan card): reads ONLY Weeks, Plan, MD Plan and Config from the gradebook.
// It never reads the roster or behavior data, never writes to the gradebook, and only sends
// activity names, links, class times, teacher names and teams.
// To turn it on: paste the gradebook spreadsheet ID into GRADEBOOK_ID below (the long part of
// the gradebook's URL between /d/ and /edit), save, then Deploy > Manage deployments > pencil >
// Version: New version > Deploy. The web app URL stays the same.
// A Plan row can open a board guide: put  guide: <guide id>  in its Notes, e.g. guide: 2026-11-16-name-typing

const GRADEBOOK_ID = '';   // <- paste the gradebook spreadsheet ID here

function setup() {
  const PIN = '1234';   // <- change this, then Run setup
  PropertiesService.getScriptProperties().setProperty('PIN', String(PIN));
  sheet_();
}

function sheet_() {
  const ss = SpreadsheetApp.getActive();
  let sh = ss.getSheetByName('Links');
  if (!sh) { sh = ss.insertSheet('Links'); sh.appendRow(['Name', 'Link', 'Group']); sh.setFrozenRows(1); }
  return sh;
}

function out_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const p = (e && e.parameter) || {};
  const pin = PropertiesService.getScriptProperties().getProperty('PIN');
  if (!pin || String(p.pin) !== pin) return out_({ error: 'pin' });
  if (p.action === 'today') return out_(today_(p.date));
  const sh = sheet_();
  if (p.action === 'add') {
    const name = String(p.name || '').trim().slice(0, 120), url = String(p.url || '').trim().slice(0, 2000);
    if (!name || !/^https?:\/\//i.test(url)) return out_({ error: 'bad' });
    sh.appendRow([name, url, String(p.group || '').trim().slice(0, 60)]);
  }
  if (p.action === 'remove') {
    const rows = sh.getDataRange().getValues();
    for (let i = rows.length - 1; i >= 1; i--) {
      if (String(rows[i][0]) === String(p.name) && String(rows[i][1]) === String(p.url)) { sh.deleteRow(i + 1); break; }
    }
  }
  const links = sh.getDataRange().getValues().slice(1)
    .filter(r => r[0] && r[1])
    .map(r => ({ name: String(r[0]), url: String(r[1]), group: String(r[2] || '') }));
  return out_({ links: links });
}

// ---------------- TODAY: read-only plan for the board ----------------

const TB_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const TB_SCOPES = ['All', 'Day', 'Team', 'Class'];

function tbLink_(rtv) {
  if (!rtv) return '';
  const whole = rtv.getLinkUrl();
  if (whole) return whole;
  let runs = [];
  try { runs = rtv.getRuns() || []; } catch (e) { return ''; }
  for (let i = 0; i < runs.length; i++) { const u = runs[i].getLinkUrl(); if (u) return u; }
  return '';
}

// Only the guide id leaves the Notes column. The rest of Notes stays private.
function tbGuide_(notes) {
  const m = String(notes || '').match(/guide:\s*([\w-]+)/i);
  return m ? m[1] : '';
}

function tbItem_(activity, rich, notes) {
  return { activity: String(activity).trim(), link: tbLink_(rich), guide: tbGuide_(notes) };
}

function today_(dateParam) {
  if (!GRADEBOOK_ID) return { error: 'notset' };
  const ss = SpreadsheetApp.openById(GRADEBOOK_ID);
  const tz = 'America/New_York';
  const iso = /^\d{4}-\d{2}-\d{2}$/.test(String(dateParam || '')) ? String(dateParam)
            : Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
  const d = new Date(iso + 'T12:00:00');
  const day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()];
  const res = { date: iso, day: day, week: null, classes: [] };
  if (TB_DAYS.indexOf(day) < 0) return res;

  // Week number from the Weeks sheet (A week, B start, C end as yyyy-MM-dd)
  const wk = ss.getSheetByName('Weeks');
  if (wk && wk.getLastRow() >= 2) {
    wk.getRange(2, 1, wk.getLastRow() - 1, 3).getDisplayValues().forEach(r => {
      if (String(r[0]).trim() && iso >= String(r[1]).trim() && iso <= String(r[2]).trim()) res.week = Number(r[0]);
    });
  }
  if (res.week === null) return res;

  // Today's blocks from Config (A day, B block, C time, D teacher, E room, F team)
  const cfg = ss.getSheetByName('Config');
  const blocks = [];
  if (cfg && cfg.getLastRow() >= 2) {
    cfg.getRange(2, 1, cfg.getLastRow() - 1, 6).getDisplayValues().forEach(r => {
      if (String(r[0]).trim() === day && String(r[3]).trim()) {
        blocks.push({ block: Number(r[1]), time: String(r[2]).trim(), teacher: String(r[3]).trim(), team: String(r[5]).trim() });
      }
    });
  }
  blocks.sort((a, b) => a.block - b.block);

  // Plan rows for this week (A week, B scope, C target, D activity, E notes)
  const plan = [];
  const ps = ss.getSheetByName('Plan');
  if (ps && ps.getLastRow() >= 2) {
    const rng = ps.getRange(2, 1, ps.getLastRow() - 1, 5);
    const disp = rng.getDisplayValues(), rich = rng.getRichTextValues();
    disp.forEach((r, i) => {
      if (Number(r[0]) !== res.week || !String(r[3]).trim()) return;
      plan.push({ scope: String(r[1]).trim(), target: String(r[2]).trim(), item: tbItem_(r[3], rich[i][3], r[4]) });
    });
  }

  // MD Plan rows (A week or Every, B class or Both, C activity, D notes)
  const md = [];
  const ms = ss.getSheetByName('MD Plan');
  if (ms && ms.getLastRow() >= 2) {
    const rng = ms.getRange(2, 1, ms.getLastRow() - 1, 4);
    const disp = rng.getDisplayValues(), rich = rng.getRichTextValues();
    disp.forEach((r, i) => {
      if (!String(r[2]).trim()) return;
      const wkRaw = String(r[0]).trim();
      const standing = wkRaw.toLowerCase() === 'every';
      if (!standing && Number(wkRaw) !== res.week) return;
      md.push({ standing: standing, cls: (String(r[1]).trim() || 'Both').toLowerCase(), item: tbItem_(r[2], rich[i][2], r[3]) });
    });
  }

  res.classes = blocks.map(b => {
    let acts = [];
    if (b.team.toUpperCase() === 'MD') {
      const mine = md.filter(r => r.cls === 'both' || r.cls === b.teacher.toLowerCase());
      acts = mine.filter(r => r.standing).concat(mine.filter(r => !r.standing)).map(r => r.item);
    } else {
      TB_SCOPES.forEach(sc => plan.forEach(r => {
        if (r.scope.toLowerCase() !== sc.toLowerCase()) return;
        const t = r.target.toLowerCase();
        const hit = sc === 'All' || (sc === 'Day' && t === day.toLowerCase())
                 || (sc === 'Team' && t === b.team.toLowerCase()) || (sc === 'Class' && t === b.teacher.toLowerCase());
        if (hit) acts.push(r.item);
      }));
    }
    return { block: b.block, time: b.time, teacher: b.teacher, team: b.team, activities: acts };
  });
  return res;
}
