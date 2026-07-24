/**
 * Credit Wizard In — Contact / Enquiry form handler (Google Apps Script)
 * ---------------------------------------------------------------------
 * Saves every enquiry submitted on the website into a Google Sheet.
 *
 * SETUP
 *  1. Open the Google Sheet named "Credit Wizard In".
 *  2. Extensions → Apps Script. Delete any sample code, paste this file.
 *  3. Save. Then Deploy → New deployment → type "Web app".
 *       - Description: Credit Wizard In enquiries
 *       - Execute as:  Me
 *       - Who has access: Anyone
 *     Click Deploy, authorise when prompted, and copy the Web app URL
 *     (it ends in /exec).
 *  4. Put that URL in your website env as NEXT_PUBLIC_ENQUIRY_ENDPOINT
 *     (see the frontend snippet at the bottom of this file).
 *
 *  Re-deploy (Deploy → Manage deployments → edit → new version) whenever
 *  you change this script.
 */

// The tab (sheet) inside the spreadsheet where rows are written.
// Created automatically on first submission if it doesn't exist.
var SHEET_NAME = 'Enquiries';

// Optional: set an email address to be notified on every new entry.
// Leave '' to disable email notifications.
var NOTIFY_EMAIL = '';

var HEADERS = [
  'Timestamp',
  'Full Name',
  'Phone',
  'Email',
  'City',
  'Loan Type',
  'Loan Amount',
  'Monthly Income',
  'Message',
  'Source'
];

/**
 * Receives the form POST, appends a row, returns JSON.
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(30000); // avoid two submissions clobbering the same row

  try {
    var data = parseBody_(e);

    // Basic guard: ignore empty/junk hits.
    if (!data.name && !data.phone && !data.email) {
      return json_({ ok: false, error: 'Empty submission' });
    }

    var sheet = getSheet_();

    // Write the header row once.
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.phone || '',
      data.email || '',
      data.city || '',
      data.loanType || '',
      data.amount || '',
      data.income || '',
      data.message || '',
      data.source || 'Website'
    ]);

    if (NOTIFY_EMAIL) {
      notify_(data);
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/**
 * Lets you open the /exec URL in a browser to confirm it is live.
 */
function doGet() {
  return json_({ ok: true, message: 'Credit Wizard In enquiry endpoint is live.' });
}

/**
 * Returns the target tab, creating it if needed. Uses the spreadsheet
 * this script is bound to (the "Credit Wizard In" sheet).
 */
function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  return sheet;
}

/**
 * Accepts either a JSON body (sent as text/plain, the recommended way —
 * it avoids a CORS pre-flight from the browser) or a normal
 * form-url-encoded POST.
 */
function parseBody_(e) {
  if (!e) return {};
  if (e.postData && e.postData.contents) {
    try {
      return JSON.parse(e.postData.contents);
    } catch (ignore) {
      // fall through to form parameters
    }
  }
  return e.parameter || {};
}

/**
 * Optional email notification on each new enquiry.
 */
function notify_(d) {
  var body = [
    'A new enquiry was submitted on the website.',
    '',
    'Name:            ' + (d.name || ''),
    'Phone:           ' + (d.phone || ''),
    'Email:           ' + (d.email || ''),
    'City:            ' + (d.city || ''),
    'Loan Type:       ' + (d.loanType || ''),
    'Loan Amount:     ' + (d.amount || ''),
    'Monthly Income:  ' + (d.income || ''),
    'Message:         ' + (d.message || '')
  ].join('\n');

  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: 'New enquiry — ' + (d.name || 'Website'),
    replyTo: d.email || '',
    body: body
  });
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

/* ---------------------------------------------------------------------
 * FRONTEND HOOK-UP (for reference — goes in the Next.js site, not here)
 * ---------------------------------------------------------------------
 * The enquiry form currently simulates the request. Replace that
 * simulated `await` in components/home/EnquiryForm.tsx with:
 *
 *   await fetch(process.env.NEXT_PUBLIC_ENQUIRY_ENDPOINT, {
 *     method: "POST",
 *     // text/plain keeps it a "simple request" so the browser skips
 *     // the CORS pre-flight that Apps Script cannot answer.
 *     headers: { "Content-Type": "text/plain;charset=utf-8" },
 *     body: JSON.stringify({ ...form, source: "Website enquiry form" }),
 *   });
 *
 * Add NEXT_PUBLIC_ENQUIRY_ENDPOINT=<your /exec URL> to .env.local.
 * ------------------------------------------------------------------- */
