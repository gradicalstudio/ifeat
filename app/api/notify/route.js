// Receives the NotifyForm slice submission and appends it to a Google Sheet
// via a Google Apps Script web app (URL and secret come from env vars).

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Personal inbox providers: only work/company emails are accepted.
const FREE_EMAIL_DOMAINS = new Set([
  "gmail.com", "googlemail.com", "yahoo.com", "yahoo.co.uk", "yahoo.co.in", "yahoo.fr",
  "ymail.com", "rocketmail.com", "hotmail.com", "hotmail.co.uk", "outlook.com", "live.com",
  "msn.com", "icloud.com", "me.com", "mac.com", "aol.com", "proton.me", "protonmail.com",
  "gmx.com", "gmx.net", "mail.com", "zoho.com", "yandex.com", "yandex.ru", "mail.ru",
  "inbox.com", "fastmail.com", "hey.com", "tutanota.com", "qq.com", "163.com", "126.com",
]);
const MIN_FILL_MS = 2000; // anything faster is almost certainly a bot

const clean = (value, max) =>
  String(value ?? "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, max);

export async function POST(request) {
  const scriptUrl = process.env.NOTIFY_SHEET_URL;
  const secret = process.env.NOTIFY_SHEET_SECRET;

  if (!scriptUrl || !secret) {
    console.error("[notify] NOTIFY_SHEET_URL or NOTIFY_SHEET_SECRET is not set");
    return Response.json(
      { error: "The form isn't available right now. Please try again later." },
      { status: 500 },
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bot checks: pretend success so bots don't learn anything.
  if (body.website || Number(body.elapsed) < MIN_FILL_MS) {
    return Response.json({ ok: true });
  }

  const name = clean(body.name, 120);
  const company = clean(body.company, 160);
  const email = clean(body.email, 200).toLowerCase();

  if (!name || !company || !email) {
    return Response.json({ error: "Please fill in all the fields." }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  if (FREE_EMAIL_DOMAINS.has(email.split("@").pop())) {
    return Response.json(
      { error: "Please use your work email address, not a personal one (e.g. Gmail or Yahoo)." },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      // Apps Script reads the raw body; text/plain avoids a CORS-style preflight quirk.
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ secret, name, company, email }),
      redirect: "follow",
      cache: "no-store",
    });
    const data = await res.json().catch(() => null);

    if (!res.ok || !data?.ok) {
      console.error("[notify] Sheet rejected submission", res.status, data);
      throw new Error("sheet error");
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[notify] Failed to save submission", err);
    return Response.json(
      { error: "We couldn't save your details. Please try again in a moment." },
      { status: 502 },
    );
  }
}
