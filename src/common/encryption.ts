// @ts-expect-error the are no type definitions for aes256
import aes256 from 'aes256'
import crypto, { createHmac, timingSafeEqual } from 'crypto'

export class Encryption {
  public static HMAC_SHA256_ALGORITHM = 'sha256'

  private static passphrase = process.env.ENCRYPTION_PASSPHRASE
  private static secretKey = process.env.ENCRYPTION_SECRET_KEY
  private static initVector = process.env.ENCRYPTION_INIT_VECTOR

  /*
   * Generate deterministic cipher text i.e. same plain text will always produce
   * the same cipher text, provided the same secret key and nonce (initial vector).
   *
   * Examples:
   *
   * Encrypting a message:
   *
   *  => Encryption.deterministicEncrypt('Hello world!')
   * 'PJkMHXZyv5r+Rj65u/Bw5b6S/bzEX2giOZ+6GWVMa0O9WnBSG+naQg=='
   *
   * Encrypting that same message again produces the same cipher text:
   *
   *  => Encryption.deterministicEncrypt('Hello world!')
   * 'PJkMHXZyv5r+Rj65u/Bw5b6S/bzEX2giOZ+6GWVMa0O9WnBSG+naQg=='
   *
   */
  static deterministicEncrypt = (
    plainText: string | undefined | null,
    secret?: string,
  ): string | null => {
    if (!plainText) return null

    const secretKey = (secret || this.secretKey) as string
    const initVector = Buffer.from(`${this.initVector}`, 'base64')
    const cipher = crypto.createCipheriv('aes-256-gcm', secretKey, initVector)
    const cipherText = cipher.update(plainText, 'utf8')
    const cipherText2 = cipher.final()
    const cipherBinary = [cipherText, cipherText2, initVector, cipher.getAuthTag()]

    return Buffer.concat(cipherBinary).toString('base64')
  }

  /*
   * Generate deterministic plain text i.e. same cipher text will always produce
   * the same plain text, provided the same secret key and nonce (initial vector).
   * Examples:
   *
   * Encrypting a message:
   *
   *  => hash = Encryption.deterministicEncrypt('Hello world!')
   * 'PJkMHXZyv5r+Rj65u/Bw5b6S/bzEX2giOZ+6GWVMa0O9WnBSG+naQg=='
   *
   * Decrypting the cipher text:
   *
   * => Encryption.deterministicDecrypt(hash)
   * 'Hello world!'
   *
   */
  static deterministicDecrypt = (cipherText: string, secret?: string): string => {
    const secretKey = (secret || this.secretKey) as string
    const binary = Buffer.from(cipherText, 'base64')
    const initVector = binary.slice(binary.length - 28, binary.length - 16)
    const tag = binary.slice(binary.length - 16)
    const cipherBinary = binary.slice(0, binary.length - 28)
    const decipher = crypto.createDecipheriv('aes-256-gcm', secretKey, initVector)

    decipher.setAuthTag(tag)

    const plainText = decipher.update(cipherBinary, undefined, 'utf8') + decipher.final('utf8')
    return plainText
  }

  /**
   * Generate non-deterministic cipher text i.e. same plain text will produce different cipher text
   */
  static encrypt = <T extends string | undefined | null>(plaintText: T): T => {
    if (!Encryption.passphrase || !plaintText) {
      return null as T
    }

    return aes256.encrypt(Encryption.passphrase, plaintText)
  }

  static decrypt = <T extends string | undefined | null>(encryptedText: T): T => {
    if (!Encryption.passphrase || !encryptedText) {
      return undefined as T
    }

    return aes256.decrypt(Encryption.passphrase, encryptedText)
  }

  static createHmac(
    key: string,
    plainText: string,
    algorithm: string = Encryption.HMAC_SHA256_ALGORITHM,
  ): string {
    return createHmac(algorithm, key).update(plainText, 'utf8').digest('hex')
  }

  static isValidHmacSignature(
    key: string,
    plainText: string,
    givenSignature: string,
    algorithm: string = Encryption.HMAC_SHA256_ALGORITHM,
  ): boolean {
    const expectedSignature = Encryption.createHmac(key, plainText, algorithm)
    const expectedBuffer = Buffer.from(expectedSignature, 'hex')
    const signatureBuffer = Buffer.from(givenSignature, 'hex')

    return (
      expectedBuffer.length === signatureBuffer.length &&
      timingSafeEqual(expectedBuffer, signatureBuffer)
    )
  }
}
