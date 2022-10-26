let alphabet: string = 'abcdefghijklmnopqrstuvwxyz'
let lc: string[] = alphabet.replace(/\s/g, '').toLowerCase().split('')
let uc: string[] = alphabet.replace(/\s/g, '').toUpperCase().split('')

export function caesarEncrypt(token: string, rotate: number): string {
  return Array.from(token)
    .map((v: string): string => {
      if (lc.indexOf(v.toLowerCase()) === -1 || uc.indexOf(v.toUpperCase()) === -1) return v

      const lcEncryptIndex: number = (lc.indexOf(v.toLowerCase()) + rotate) % alphabet.length
      const lcEncryptedChar: string = lc[lcEncryptIndex]

      const ucEncryptIndex: number = (uc.indexOf(v.toUpperCase()) + rotate) % alphabet.length
      const ucEncryptedChar: string = uc[ucEncryptIndex]

      return lc.indexOf(v) !== -1 ? lcEncryptedChar : ucEncryptedChar
    })
    .join('')
}

export function caesarDecrypt(token: string, rotate: number): string {
  return Array.from(token)
    .map((v: string): string => {
      if (lc.indexOf(v.toLowerCase()) === -1 || uc.indexOf(v.toUpperCase()) === -1) return v

      let lcEncryptIndex: number = (lc.indexOf(v.toLowerCase()) - rotate) % alphabet.length
      lcEncryptIndex = lcEncryptIndex < 0 ? lcEncryptIndex + alphabet.length : lcEncryptIndex
      const lcEncryptedChar: string = lc[lcEncryptIndex]

      let ucEncryptIndex: number = (uc.indexOf(v.toUpperCase()) - rotate) % alphabet.length
      ucEncryptIndex = ucEncryptIndex < 0 ? ucEncryptIndex + alphabet.length : ucEncryptIndex
      const ucEncryptedChar: string = uc[ucEncryptIndex]

      return lc.indexOf(v) !== -1 ? lcEncryptedChar : ucEncryptedChar
    })
    .join('')
}
