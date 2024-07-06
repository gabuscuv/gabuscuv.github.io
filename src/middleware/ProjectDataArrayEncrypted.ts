import {ProjectData} from '../data/ProjectDataTypes';
import {botChecker as isABot} from '../utils/antibot';
import {decrypt} from '../utils/decryptUtils';

export class ProjectDataArrayEncrypted {
  projectdata: Array<ProjectData> = [];
  Cachedprojects: Array<ProjectData> = [];

  key_encoded: CryptoKey | null;
  constructor(key: CryptoKey, locale: Array<ProjectData>) {
    this.projectdata = locale;
    this.key_encoded = key;
  }

  Getter(callback: (para: Array<ProjectData>) => void) {
    if (this.Cachedprojects.length !== 0) {
      callback(this.Cachedprojects);
    }

    if (isABot()) {
      callback(this.projectdata);
      return;
    }

    this.projectdata.forEach(project => {
      if (project.name.startsWith('t!')) {
        decrypt(<CryptoKey>this.key_encoded, project.name).then(name => {
          project.name = name;
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
