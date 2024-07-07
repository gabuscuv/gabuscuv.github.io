import {ProjectData} from '../data/ProjectDataTypes';
import {botChecker as isABot} from '../utils/antibot';
import {decrypt, ImportKey} from '../utils/decryptUtils';
import {projectTypeEnum} from '../projectTypeEnum';
import {projects} from './Getter';

export function GetProjects(_projects: projects): Promise<Array<ProjectData>> {
  return new Promise<Array<ProjectData>>(processed => {
    ProjectDataArrayDescrypted(_projects[projectTypeEnum.Game]).then(
      decryptedList => {
        let output: Array<ProjectData> = [];

        output = decryptedList.toSorted((a, b) => b.year - a.year);
        output = output.concat(_projects[projectTypeEnum.GameTool]);
        output = output.concat(_projects[projectTypeEnum.Tool]);
        processed(output.filter(e => e !== undefined));
      }
    );
  });
}
function ProjectDataArrayDescrypted(
  projectdata: Array<ProjectData>
): Promise<Array<ProjectData>> {
  return new Promise<Array<ProjectData>>(processed => {
    if (isABot()) {
      processed(projectdata);
      return;
    }

    ImportKey().then(key_encoded => {
      const Cachedprojects: Array<ProjectData> = [];

      projectdata.forEach(project => {
        if (project.name.startsWith('t!')) {
          decrypt(<CryptoKey>key_encoded, project.name).then(name => {
            project.name = name;
            Cachedprojects.push(project);
            if (projectdata.length === Cachedprojects.length) {
              processed(Cachedprojects);
            }
          });
        } else {
          Cachedprojects.push(project);
        }
        if (projectdata.length === Cachedprojects.length) {
          processed(Cachedprojects);
        }
      });
    });
  });
}
