import * as crypto from 'crypto'
export const encryptUserId = (id: string): string => {
  return crypto.createHash('sha256').update(id).digest('hex').substring(0, 16)
}
