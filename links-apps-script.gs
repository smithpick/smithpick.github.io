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
