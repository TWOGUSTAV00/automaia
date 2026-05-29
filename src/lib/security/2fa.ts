// TOTP-based 2FA (compatible with Google Authenticator, Authy)
import { createHmac } from 'crypto'

function base32Encode(buffer: Uint8Array): string {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  let bits = 0
  let value = 0
  let output = ''

  for (let i = 0; i < buffer.length; i++) {
    value = (value << 8) | buffer[i]
    bits += 8
    while (bits >= 5) {
      output += alphabet[(value >>> (bits - 5)) & 31]
      bits -= 5
    }
  }
  if (bits > 0) {
    output += alphabet[(value << (5 - bits)) & 31]
  }
  return output
}

function base32Decode(input: string): Buffer {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  let bits = 0
  let value = 0
  let index = 0
  const output = Buffer.alloc(Math.ceil(input.length * 5 / 8))

  for (let i = 0; i < input.length; i++) {
    const val = alphabet.indexOf(input[i].toUpperCase())
    if (val === -1) continue
    value = (value << 5) | val
    bits += 5
    if (bits >= 8) {
      output[index++] = (value >>> (bits - 8)) & 255
      bits -= 8
    }
  }
  return output.subarray(0, index)
}

export const TwoFactor = {
  // Generate a TOTP secret (store encrypted in DB)
  generateSecret(): string {
    const bytes = crypto.getRandomValues(new Uint8Array(20))
    return base32Encode(bytes)
  },

  // Generate QR code URL for authenticator apps
  getQRCodeURL(username: string, secret: string): string {
    const label = encodeURIComponent(`NemoWeb:${username}`)
    return `otpauth://totp/${label}?secret=${secret}&issuer=NemoWeb&algorithm=SHA1&digits=6&period=30`
  },

  // Verify a 6-digit TOTP code (±1 window for clock drift)
  verifyToken(secret: string, token: string): boolean {
    const time = Math.floor(Date.now() / 30_000)
    for (const delta of [-1, 0, 1]) {
      if (this.generateTOTP(secret, time + delta) === token) return true
    }
    return false
  },

  generateTOTP(secret: string, time: number): string {
    const key   = base32Decode(secret)
    const msg   = Buffer.alloc(8)
    msg.writeBigUInt64BE(BigInt(time), 0)
    const hmac  = createHmac('sha1', key).update(msg).digest()
    const offset = hmac[hmac.length - 1] & 0xf
    const code  = ((hmac[offset] & 0x7f) << 24) |
                  (hmac[offset+1] << 16) |
                  (hmac[offset+2] << 8)  |
                   hmac[offset+3]
    return String(code % 1_000_000).padStart(6, '0')
  }
}
