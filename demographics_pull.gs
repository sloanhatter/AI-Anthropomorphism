const SHEET_NAME = 'Demographics';
// Origin is scheme + host only (no path)
const ALLOWED_ORIGIN = 'https://<sloanhatter>.github.io';

function _cors(out) {
  return out
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN)
    .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function doOptions(e) { return _cors(ContentService.createTextOutput('')); }

function doPost(e) {
  const out = ContentService.createTextOutput();
  try {
    const body = e.postData && e.postData.contents ? JSON.parse(e.postData.contents) : {};
    const ss = SpreadsheetApp.getActive();
    const sh = ss.getSheetByName(SHEET_NAME) || ss.getActiveSheet();

    const lock = LockService.getScriptLock();
    lock.tryLock(10000);

    sh.appendRow([
      new Date(),
      body.participant_id || '',
      body.age || '',
      body.gender || '',
      body.schooling_level || '',
      body.ai_use || '',
      body.user_agent || '',
      body.referrer || ''
    ]);

    lock.releaseLock();
    out.setContent(JSON.stringify({ ok: true }));
  } catch (err) {
    out.setContent(JSON.stringify({ ok: false, error: String(err) }));
  }
  return _cors(out);
}
