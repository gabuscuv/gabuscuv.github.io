const cipherstring: Uint8Array = Buffer.from(
  Uint8Array.from([
    140, 27, 0, 173, 96, 5, 158, 202, 36, 231, 212, 24, 62, 84, 117, 167,
  ])
);

const ivConst: Uint8Array = Buffer.from(
  Uint8Array.from([
    48, 52, 131, 94, 42, 12, 228, 142, 17, 230, 205, 63, 232, 156, 119, 194,
  ])
);

const enc = new TextDecoder('utf-8');

export const alghParam: AesCtrParams = {
  name: 'AES-CTR',
  counter: ivConst,
  length: 128,
};

export function ImportKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey('raw', cipherstring, 'AES-CTR', false, [
    'decrypt',
  ]);
}

export function decrypt(key_encoded: CryptoKey, name: string): Promise<string> {
  return new Promise<string>(resolve => {
    crypto.subtle
      .decrypt(
        alghParam,
        <CryptoKey>key_encoded,
        Uint8Array.from(
          [...atob(name.replace('t!', ''))].map(char => char.charCodeAt(0))
        )
      )
      .then(string => {
        resolve(enc.decode(string));
      });
  });
}
