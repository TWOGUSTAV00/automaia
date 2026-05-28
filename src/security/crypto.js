const PBKDF2_ITERATIONS = 310000;
const SALT_LENGTH = 32;
const IV_LENGTH = 12;
const KEY_LENGTH = 256;

export const CryptoEngine = {
  async deriveKey(password, salt) {
    const baseKey = await importPassword(password);
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: typeof salt === 'string' ? hexToBytes(salt) : salt,
        iterations: PBKDF2_ITERATIONS,
        hash: 'SHA-256'
      },
      baseKey,
      { name: 'AES-GCM', length: KEY_LENGTH },
      false,
      ['encrypt', 'decrypt']
    );
  },

  async encrypt(plaintext, password) {
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH));
    const key = await this.deriveKey(password, salt);
    const cipherBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      new TextEncoder().encode(plaintext)
    );
    return bytesToHex(salt) + bytesToHex(iv) + arrayBufferToBase64(cipherBuffer);
  },

  async decrypt(ciphertext, password) {
    const saltHex = ciphertext.slice(0, SALT_LENGTH * 2);
    const ivHex = ciphertext.slice(SALT_LENGTH * 2, SALT_LENGTH * 2 + IV_LENGTH * 2);
    const data = ciphertext.slice(SALT_LENGTH * 2 + IV_LENGTH * 2);
    const key = await this.deriveKey(password, hexToBytes(saltHex));
    const plainBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: hexToBytes(ivHex) },
      key,
      base64ToArrayBuffer(data)
    );
    return new TextDecoder().decode(plainBuffer);
  },

  async hashPassword(password) {
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH));
    const hash = await deriveBits(password, salt);
    return bytesToHex(salt) + bytesToHex(new Uint8Array(hash));
  },

  async verifyPassword(password, storedHash) {
    const salt = hexToBytes(storedHash.slice(0, SALT_LENGTH * 2));
    const expected = storedHash.slice(SALT_LENGTH * 2);
    const actual = bytesToHex(new Uint8Array(await deriveBits(password, salt)));
    return constantTimeEqual(actual, expected);
  },

  async digest(value) {
    const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
    return bytesToHex(new Uint8Array(buffer));
  },

  randomHex(bytes = 32) {
    return bytesToHex(crypto.getRandomValues(new Uint8Array(bytes)));
  }
};

async function importPassword(password) {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );
}

async function deriveBits(password, salt) {
  const baseKey = await importPassword(password);
  return crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256'
    },
    baseKey,
    KEY_LENGTH
  );
}

export function bytesToHex(buf) {
  return Array.from(buf).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export function hexToBytes(hex) {
  const arr = new Uint8Array(hex.length / 2);
  for (let i = 0; i < arr.length; i += 1) arr[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  return arr;
}

function arrayBufferToBase64(buf) {
  let binary = '';
  const bytes = new Uint8Array(buf);
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToArrayBuffer(b64) {
  return Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)).buffer;
}

function constantTimeEqual(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}
