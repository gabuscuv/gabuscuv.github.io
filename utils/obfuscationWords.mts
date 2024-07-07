import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

// I mean, If you really want the encryptation key, Here you go.
const cipherstring : Uint8Array = new Uint8Array([140, 27, 0, 173, 96, 5, 158, 202, 36, 231, 212, 24, 62, 84, 117, 167]);
const iv : Uint8Array = new Uint8Array([48,52,131,94,42,12,228,142,17,230,205,63,232,156,119,194]);

var enc = new TextEncoder(); // always utf-8

 
crypto.subtle.importKey(
  "raw",
  cipherstring.buffer,
  "AES-CTR",
  false,
  ["encrypt"],
).then(key_encoded => {
  ;


  const rl = readline.createInterface({ input, output });
  rl.question('What do you think of Node.js? ').then(answer => {

    console.log("This is the encryption:");
    crypto.subtle.encrypt(
      {
        name: "AES-CTR",
        counter: iv,
        length: 128,
      },
      key_encoded,
      enc.encode(answer)
    ).then(message => {
      console.log(btoa(String.fromCharCode(...new Uint8Array(message))))
      rl.close();
    })

  });

    
});