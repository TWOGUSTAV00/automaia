const PBKDF2_ITERATIONS = 310_000
const SALT_LENGTH = 32
const IV_LENGTH = 12

export const CryptoEngine = {
  async deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
    const enc = new TextEncoder()
    const baseKey = await crypto.subtle.importKey(
      'raw', enc.encode(password), { name: 'PBKDF2' }, false, ['deriveKey']
    )
    return crypto.subtle.deriveKey(
      { name: 'PBKDF2', salt: toArrayBuffer(salt), iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      false, ['encrypt', 'decrypt']
    )
  },

  async encrypt(plaintext: string, password: string): Promise<string> {
    const salt = crypto.getRandomValues(new Uint8Array(SALT_LENGTH))
    const iv = crypto.getRandomValues(new Uint8Array(IV_LENGTH))
    const key  = await this.deriveKey(password, salt)
    const cipher = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: toArrayBuffer(iv) },
      key,
      toArrayBuffer(new TextEncoder().encode(plaintext))
    )
    return bytesToHex(salt) + bytesToHex(iv) + btoa(String.fromCharCode(...new Uint8Array(cipher)))
  },

  async decrypt(ciphertext: string, password: string): Promise<string> {
    const salt = hexToBytes(ciphertext.slice(0, SALT_LENGTH * 2))
    const iv = hexToBytes(ciphertext.slice(SALT_LENGTH * 2, SALT_LENGTH * 2 + IV_LENGTH * 2))
    const data = Uint8Array.from(atob(ciphertext.slice(SALT_LENGTH * 2 + IV_LENGTH * 2)), c => c.charCodeAt(0))
    const key  = await this.deriveKey(password, salt)
    const plain = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: toArrayBuffer(iv) },
      key,
      toArrayBuffer(data)
    )
    return new TextDecoder().decode(plain)
  },

  randomHex(bytes = 32): string {
    return bytesToHex(crypto.getRandomValues(new Uint8Array(bytes)))
  }
}

function bytesToHex(buf: Uint8Array): string {
  return Array.from(buf).map(b => b.toString(16).padStart(2, '0')).join('')
}
function hexToBytes(hex: string): Uint8Array {
  return new Uint8Array(hex.match(/.{2}/g)!.map(b => parseInt(b, 16)))
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
}
