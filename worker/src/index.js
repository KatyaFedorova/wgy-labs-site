// Receives the "Book a call" form from wgylabs.com and emails it to Kat.
import { EmailMessage } from "cloudflare:email";
import { validate } from "./validate.js";

const json = (status, body) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });

const b64 = (s) => btoa(String.fromCharCode(...new TextEncoder().encode(s)));
const encodeHeader = (s) => `=?UTF-8?B?${b64(s)}?=`;
const oneLine = (s) => String(s).replace(/[\r\n]+/g, " ");

function buildMime({ from, to, replyTo, subject, text }) {
  const body = b64(text).replace(/.{76}/g, "$&\r\n");
  return [
    `From: "WGY Labs website" <${from}>`,
    `To: <${to}>`,
    `Reply-To: <${oneLine(replyTo)}>`,
    `Subject: ${encodeHeader(oneLine(subject))}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@wgylabs.com>`,
    "MIME-Version: 1.0",
    'Content-Type: text/plain; charset="UTF-8"',
    "Content-Transfer-Encoding: base64",
    "",
    body,
  ].join("\r\n");
}

export default {
  async fetch(request, env) {
    if (request.method !== "POST") return json(405, { ok: false, error: "Method not allowed" });

    let data;
    try {
      data = await request.json();
    } catch {
      return json(400, { ok: false, error: "Invalid request" });
    }

    // Honeypot: real visitors never fill this hidden field.
    if (data.company) return json(200, { ok: true });

    const { errors, clean } = validate(data);
    if (Object.keys(errors).length) return json(422, { ok: false, errors });

    const text = [
      "New intro call request from wgylabs.com",
      "",
      `Name: ${clean.name}`,
      `Email: ${clean.email}`,
      `Store: ${clean.store}`,
      `Orders per month: ${clean.orders}`,
      `Needs: ${clean.need.join(", ")}`,
      "",
      "Done by hand today:",
      clean.message,
      "",
      `Sent: ${new Date().toISOString()}`,
    ].join("\n");

    const raw = buildMime({
      from: env.FROM,
      to: env.TO,
      replyTo: clean.email,
      subject: `Intro call request: ${clean.name}`,
      text,
    });

    try {
      await env.MAILER.send(new EmailMessage(env.FROM, env.TO, raw));
    } catch (e) {
      console.error("send failed", e && e.message);
      return json(502, { ok: false, error: "send_failed" });
    }
    return json(200, { ok: true });
  },
};
