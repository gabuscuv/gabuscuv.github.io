import {createTranslator} from 'use-intl/core';
import GameProjectsData from '../data/projects/GameProjectsData';
import {GameToolProjectsList} from '../data/projects/GameToolsProjectsData';
import ToolsProjectsList from '../data/projects/OtherProjectsData';
import type {ProjectData} from '../data/projects/types';

export interface projects {
  [id: number]: Array<ProjectData>;
}

export async function GetterProjects(
  locale: string,
  messages: Parameters<typeof createTranslator>[0]['messages'],
): Promise<projects> {
  const gameT = createTranslator({
    locale,
    messages,
    namespace: 'Projects.gameProjects',
  });

  const gameToolsT = createTranslator({
    locale,
    messages,
    namespace: 'Projects.gameTools',
  });

  const toolsT = createTranslator({
    locale,
    messages,
    namespace: 'Projects.tools',
  });

  const project: projects = {
    0: JSON.parse(JSON.stringify(await GameProjectsData(gameT))),
    1: JSON.parse(JSON.stringify(await GameToolProjectsList(gameToolsT))),
    2: JSON.parse(JSON.stringify(await ToolsProjectsList(toolsT))),
  };
  return project;
}