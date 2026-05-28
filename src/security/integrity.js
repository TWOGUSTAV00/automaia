export async function sha256ForText(text) {
  const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  const bytes = Array.from(new Uint8Array(hash));
  return bytes.map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function verifyTextIntegrity(text, expectedHex) {
  const actual = await sha256ForText(text);
  return actual === expectedHex;
}
