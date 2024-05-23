'use client';

import {ReactNode, useState} from 'react';
import gameProjects from '@/src/data/GameProjectsData';
import gameToolsProjectsData from '@/src/data/GameToolsProjectsData';
import otherProjectsData from '@/src/data/OtherProjectsData';
import {ProjectCards} from './components/ProjectCards';
import {ProjectData} from '@/src/data/ProjectDataTypes';
import {Button} from 'flowbite-react';

enum projectTypeEnum {
  Game,
  GameTool,
  Tool,
}

interface projectType {
  activated: boolean;
}

export default function ProjectBrowser(): ReactNode {
  let output: Array<ProjectData> = [];
  output = output.concat(gameProjects);
  output = output.concat(gameToolsProjectsData);
  output = output.concat(otherProjectsData);

  const projectTypeFilter: {
    [id: string]: projectType;
  } = {
    game: {activated: true},
    gametools: {activated: true},
    otherProjects: {activated: true},
  };

  const [projectData, setProjectData] = useState<Array<ProjectData>>(output);

  function ProjectChecker(gameType: projectTypeEnum) {
    if (
      projectTypeFilter['game'].activated &&
      projectTypeFilter['gametools'].activated &&
      projectTypeFilter['otherProjects'].activated
    ) {
      projectTypeFilter['game'].activated = false;
      projectTypeFilter['gametools'].activated = false;
      projectTypeFilter['otherProjects'].activated = false;
    }

    projectTypeFilter['game'].activated =
      gameType === projectTypeEnum.Game
        ? !projectTypeFilter['game'].activated
        : false;
    projectTypeFilter['gametools'].activated =
      gameType === projectTypeEnum.GameTool
        ? !projectTypeFilter['gametools'].activated
        : false;
    projectTypeFilter['otherProjects'].activated =
      gameType === projectTypeEnum.Tool
        ? !projectTypeFilter['otherProjects'].activated
        : false;

    if (
      !projectTypeFilter['game'].activated &&
      !projectTypeFilter['gametools'].activated &&
      !projectTypeFilter['otherProjects'].activated
    ) {
      projectTypeFilter['game'].activated = true;
      projectTypeFilter['gametools'].activated = true;
      projectTypeFilter['otherProjects'].activated = true;
    }

    ProjectCardBuilder();
  }

  function ProjectCardBuilder(): void {
    setProjectData(
      output.filter(
        e =>
          (e.type === 'tool' && projectTypeFilter['otherProjects'].activated) ||
          (e.type === 'game' && projectTypeFilter['game'].activated) ||
          (e.type === 'gametool' && projectTypeFilter['gametools'].activated)
      )
    );
  }

  function getStatusValue(gameType: projectTypeEnum): boolean {
    switch (gameType) {
      case projectTypeEnum.Game:
        return projectTypeFilter['game'].activated;
      case projectTypeEnum.GameTool:
        return projectTypeFilter['gametools'].activated;
      case projectTypeEnum.Tool:
        return projectTypeFilter['otherProjects'].activated;
    }
  }

  function ButtonGroup() {
    return (
      <>
        <Button.Group>
          <Button
            color={getStatusValue(projectTypeEnum.Game) ? 'pink' : 'gray'}
            onClick={() => ProjectChecker(projectTypeEnum.Game)}
          >
            Games
          </Button>
          <Button
            color={getStatusValue(projectTypeEnum.GameTool) ? 'pink' : 'gray'}
            onClick={() => ProjectChecker(projectTypeEnum.GameTool)}
          >
            Game Tools
          </Button>
          <Button
            color={getStatusValue(projectTypeEnum.Tool) ? 'pink' : 'gray'}
            onClick={() => ProjectChecker(projectTypeEnum.Tool)}
          >
            Tools
          </Button>
        </Button.Group>
      </>
    );
  }

  return (
    <>
      <ButtonGroup />
      <ProjectCards projectdata={projectData} />
    </>
  );
}
