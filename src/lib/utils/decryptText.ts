import CryptoJS from 'crypto-js';

export const decryptText = (encryptedText: string) =>
  CryptoJS.AES.decrypt(
    decodeURIComponent(encryptedText)
      .replace(/xMl3Jk/g, '+')
      .replace(/Por21Ld/g, '/')
      .replace(/Ml32/g, '='),
    process.env.SECRET_PASSPHRASE,
  ).toString(CryptoJS.enc.Utf8);
