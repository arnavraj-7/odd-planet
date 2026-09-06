# Sending contact briefs to a Google Sheet

A Google Sheet has no webhook of its own. To receive briefs you deploy a small
**Apps Script Web App** bound to the sheet — that is what produces the
`https://script.google.com/macros/s/…/exec` URL the site posts to.

Roughly five minutes, once.

---

## 1. Create the sheet

Make a new Google Sheet (any name). The script creates and fills a tab called
**Briefs** on the first submission, so you do not need to add headers yourself.

## 2. Add the script

In the sheet: **Extensions → Apps Script**. Delete whatever is in `Code.gs` and
paste this:

```javascript
// Must match SHEETS_WEBHOOK_TOKEN in the site's environment variables.
// Change it to your own long random string.
const SECRET = 'REPLACE_WITH_A_LONG_RANDOM_STRING';

const HEADERS = ['Received', 'Name', 'Email', 'Brief', 'Source'];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);

    if (!SECRET || body.token !== SECRET) {
      return json({ ok: false, error: 'unauthorized' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName('Briefs') || ss.insertSheet('Briefs');

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      body.receivedAt ? new Date(body.receivedAt) : new Date(),
      body.name || '',
      body.email || '',
      body.message || '',
      body.source || '',
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

// Read the briefs back out, for the /admin page.
function doGet(e) {
  try {
    if (!SECRET || (e.parameter && e.parameter.token) !== SECRET) {
      return json({ ok: false, error: 'unauthorized' });
    }

    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Briefs');
    if (!sheet || sheet.getLastRow() < 2) return json({ ok: true, rows: [] });

    const values = sheet
      .getRange(2, 1, sheet.getLastRow() - 1, HEADERS.length)
      .getValues();

    const rows = values.map(function (r) {
      return {
        receivedAt: r[0] instanceof Date ? r[0].toISOString() : String(r[0]),
        name: String(r[1] || ''),
        email: String(r[2] || ''),
        message: String(r[3] || ''),
        source: String(r[4] || ''),
      };
    });

    return json({ ok: true, rows: rows });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
```

Replace `REPLACE_WITH_A_LONG_RANDOM_STRING` with a long random string and keep a
copy — it goes into the site's environment as `SHEETS_WEBHOOK_TOKEN`. Without it
anyone who finds the URL could write rows into the sheet.

## 3. Deploy it

**Deploy → New deployment → ⚙ → Web app**, then:

| Field | Value |
|---|---|
| Description | anything |
| Execute as | **Me** |
| Who has access | **Anyone** |

Press **Deploy** and authorise when Google asks (it will warn that the script is
unverified — it is your own script; continue).

"Anyone" means anyone who knows the URL may call it, which is why the token
check above matters. The script only ever appends a row; it never reads the
sheet back out.

Copy the **Web app URL** — it ends in `/exec`.

## 4. Put the URL into the site

Locally, in `.env.local`:

```
SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/…/exec
SHEETS_WEBHOOK_TOKEN=the-same-long-random-string
```

On Vercel, add both to the project (Production, Preview and Development):

```bash
vercel env add SHEETS_WEBHOOK_URL production
vercel env add SHEETS_WEBHOOK_TOKEN production
```

Then redeploy, since environment variables are read at request time by the
function but only picked up by a new deployment's runtime configuration.

## 5. Reading them back at /admin

The `doGet` above is what the site's `/admin` page calls to list the briefs. It
is behind the same token, and returns only the Briefs tab — never anything else
in the spreadsheet.

Set one more environment variable to unlock that page:

```
ADMIN_PASSWORD=a-long-random-password
```

Leave it unset and `/admin` stays locked for everyone, including you.

## 6. Check it

Submit the form on the site. A row should appear in the **Briefs** tab within a
second or two.

If nothing arrives, the site returns an error to the visitor rather than a false
success — check the function log with `vercel logs <deployment-url>`. The usual
causes are a mismatched token, a deployment set to "Only myself" instead of
"Anyone", or an edit to the script that was never re-deployed (Apps Script keeps
serving the last deployed version — use **Deploy → Manage deployments → ✏️** and
pick "New version" after any change).

---

## Notes

- Re-deploying the script as a **new version** keeps the same `/exec` URL. Only
  a brand-new deployment produces a new URL.
- The route sends `name`, `email`, `message`, `receivedAt`, `source` and
  `token`. Add columns by extending `HEADERS` and the `appendRow` call.
- If the sheet ever needs to be swapped, only `SHEETS_WEBHOOK_URL` changes.
- **The sheet is the database.** The site stores nothing itself — the form
  writes a row, `/admin` reads those rows back. Delete a row in the sheet and it
  disappears from the panel.
