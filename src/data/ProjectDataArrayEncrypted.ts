import {ProjectData} from './ProjectDataTypes';

export class ProjectDataArrayEncrypted {
  botUserAgentsArray = [
    'googlebot',
    'AdsBot-Google',
    'bingbot',
    'linkedinbot',
    'mediapartners-google',
    'lighthouse',
    'insights',
  ];

  projectdata: Array<ProjectData> = [];
  Cachedprojects: Array<ProjectData> = [];
  iv: Uint8Array = Uint8Array.from([
    48, 52, 131, 94, 42, 12, 228, 142, 17, 230, 205, 63, 232, 156, 119, 194,
  ]);

  key_encoded: CryptoKey | null;
  enc: TextDecoder;
  constructor(key: CryptoKey, locale: Array<ProjectData>) {
    this.projectdata = locale;
    this.key_encoded = null;
    this.enc = new TextDecoder('utf-8');
    this.key_encoded = key;
  }

  Getter(callback: (para: Array<ProjectData>) => void) {
    if (this.Cachedprojects.length !== 0) {
      callback(this.Cachedprojects);
    }

    const agent = navigator.userAgent;

    let isBotUserAgent = 0;
    for (let j = 0; j < this.botUserAgentsArray.length; j++) {
      if (
        agent
          .toLowerCase()
          .indexOf(this.botUserAgentsArray[j].toLowerCase()) !== -1
      ) {
        console.log(this.botUserAgentsArray[j]);

        isBotUserAgent = 1;
        break;
      }
    }

    if (isBotUserAgent === 1) {
      callback(this.projectdata);
      return;
    }

    this.projectdata.forEach(project => {
      if (project.name.startsWith('t!')) {
        crypto.subtle
          .decrypt(
            {name: 'AES-CTR', counter: this.iv, length: 128},
            <CryptoKey>this.key_encoded,
            Uint8Array.from(
              [...atob(project.name.replace('t!', ''))].map(char =>
                char.charCodeAt(0)
              )
            )
          )
          .then(name => {
            project.name = this.enc.decode(name);
            this.Cachedprojects.push(project);
            if (this.projectdata.length === this.Cachedprojects.length) {
              callback(this.Cachedprojects);
            }
          });
      } else {
        this.Cachedprojects.push(project);
      }
      if (this.projectdata.length === this.Cachedprojects.length) {
        callback(this.Cachedprojects);
      }
    });
  }
}
