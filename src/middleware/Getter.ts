import GameProjectsData from '../data/GameProjectsData';
import {GameToolProjectsList} from '../data/GameToolsProjectsData';
import ToolsProjectsList from '../data/OtherProjectsData';
import {ProjectData} from '../data/ProjectDataTypes';

export interface projects {
  [id: number]: Array<ProjectData>;
}

export async function GetterProjects(): Promise<projects> {
  const project: projects = {
    0: JSON.parse(JSON.stringify(await GameProjectsData())),
    1: JSON.parse(JSON.stringify(await GameToolProjectsList())),
    2: JSON.parse(JSON.stringify(await ToolsProjectsList())),
  };
  return project;
}
