import DOMPurify from 'isomorphic-dompurify'

export const Sanitizer = {
  // Strip ALL HTML — for storage
  stripHTML(input: string): string {
    return DOMPurify.sanitize(input, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] })
  },

  // Allow safe HTML subset — for rendering
  sanitizePost(html: string): string {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a', 'br'],
      ALLOWED_ATTR: ['href', 'target', 'rel'],
      FORCE_BODY: true,
    })
  },

  // Validate URL — block javascript:, data:
  validateURL(url: string): string {
    try {
      const parsed = new URL(url)
      if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error()
      return parsed.href
    } catch {
      throw new Error('URL inválida ou protocolo não permitido')
    }
  },

  // Validate image magic bytes (not just extension)
  async validateImageFile(file: File): Promise<string> {
    const arr = new Uint8Array(await file.slice(0, 4).arrayBuffer())
    const header = Array.from(arr).map(b => b.toString(16).padStart(2,'0')).join('')
    const sigs: Record<string, string> = {
      'ffd8ff': 'image/jpeg',
      '89504e47': 'image/png',
      '52494646': 'image/webp',
    }
    for (const [sig, mime] of Object.entries(sigs)) {
      if (header.startsWith(sig)) return mime
    }
    throw new Error('Tipo de arquivo não permitido')
  },

  // Post content limits
  validatePostContent(content: string): string {
    const clean = this.stripHTML(content).trim()
    if (clean.length === 0) throw new Error('Post não pode estar vazio')
    if (clean.length > 500)  throw new Error('Post excede 500 caracteres')
    return clean
  }
}
