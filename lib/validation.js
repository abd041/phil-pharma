export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isEmail(value) {
  return EMAIL_PATTERN.test(String(value || "").trim());
}

export function required(value, label = "This field") {
  if (!String(value || "").trim()) return `${label} is required.`;
  return "";
}

export function validateEmail(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "Email is required.";
  if (!isEmail(trimmed)) return "Enter a valid email address.";
  return "";
}

export function validatePassword(value, { min = 8 } = {}) {
  const text = String(value || "");
  if (!text) return "Password is required.";
  if (text.length < min) return `Password must be at least ${min} characters.`;
  return "";
}

export function validateConfirmPassword(password, confirm) {
  if (!String(confirm || "")) return "Confirm your password.";
  if (password !== confirm) return "Passwords do not match.";
  return "";
}

export function validatePostcode(value) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "Postcode is required.";
  if (trimmed.length < 4) return "Enter a valid postcode.";
  return "";
}

export function validateMessage(value, { min = 12 } = {}) {
  const trimmed = String(value || "").trim();
  if (!trimmed) return "Message is required.";
  if (trimmed.length < min) return `Please add a little more detail (at least ${min} characters).`;
  return "";
}

export function firstError(errors) {
  return Object.values(errors).find(Boolean) || "";
}
