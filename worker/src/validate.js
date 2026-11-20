// Shared rules for the booking form. Mirrors the checks in index.html.
// Monthly revenue bands (current form) plus the old order-count bands, still accepted so older pages keep working.
export const REVENUE = ["Under $50k", "$50k to $200k", "$200k to $1M", "Over $1M"];
export const ORDERS = [...REVENUE, "Under 500", "500 to 2,000", "2,000 to 10,000", "Over 10,000"];
export const NEEDS = ["New automations", "AI support agent", "Fix or monitor existing setup", "Not sure yet"];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeUrl(v) {
  const s = String(v || "").trim();
  if (!s) return "";
  return /^https?:\/\//i.test(s) ? s : `https://${s}`;
}

function isStoreUrl(v) {
  try {
    const u = new URL(v);
    return (u.protocol === "https:" || u.protocol === "http:") && /\.[a-z]{2,}$/i.test(u.hostname);
  } catch {
    return false;
  }
}

export function validate(input) {
  const errors = {};
  const s = (k) => String(input?.[k] ?? "").trim();

  const name = s("name");
  if (name.length < 2) errors.name = "Please enter your name.";
  else if (name.length > 100) errors.name = "Name is too long.";

  const email = s("email");
  if (!email) errors.email = "Please enter your work email.";
  else if (!EMAIL.test(email) || email.length > 200) errors.email = "Please enter a valid email, like name@yourcompany.com.";

  const store = normalizeUrl(s("store"));
  if (!store) errors.store = "Please enter your company website.";
  else if (!isStoreUrl(store) || store.length > 300) errors.store = "Please enter a valid website, like yourcompany.com.";

  const orders = s("orders");
  if (!ORDERS.includes(orders)) errors.orders = "Please choose your monthly revenue.";

  const need = (Array.isArray(input?.need) ? input.need : []).filter((n) => NEEDS.includes(n));
  if (!need.length) errors.need = "Please choose at least one option.";

  const message = s("message");
  if (message.length < 10) errors.message = "Please tell us a little more (at least 10 characters).";
  else if (message.length > 3000) errors.message = "Please keep this under 3,000 characters.";

  return { errors, clean: { name, email, store, orders, need, message } };
}
