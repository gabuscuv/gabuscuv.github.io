'use client';

import {ReactNode, useState} from 'react';
import gameProjects from '@/src/data/GameProjectsData';
import gameToolsProjectsData from '@/src/data/GameToolsProjectsData';
import otherProjectsData from '@/src/data/OtherProjectsData';
import {ProjectCards} from '../_components/ProjectCards';
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

  const [refresh, setRefresh] = useState<{
    [id: string]: projectType;
  }>(projectTypeFilter);

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

    switch (gameType) {
      case projectTypeEnum.Game:
        projectTypeFilter['game'].activated =
          !projectTypeFilter['game'].activated;
        projectTypeFilter['gametools'].activated = false;
        projectTypeFilter['otherProjects'].activated = false;
        break;
      case projectTypeEnum.GameTool:
        projectTypeFilter['game'].activated = false;
        projectTypeFilter['gametools'].activated =
          !projectTypeFilter['gametools'].activated;
        projectTypeFilter['otherProjects'].activated = false;

        break;
      case projectTypeEnum.Tool:
        projectTypeFilter['game'].activated = false;
        projectTypeFilter['gametools'].activated = false;
        projectTypeFilter['otherProjects'].activated =
          !projectTypeFilter['otherProjects'].activated;

        break;
    }

    if (
      !projectTypeFilter['game'].activated &&
      !projectTypeFilter['gametools'].activated &&
      !projectTypeFilter['otherProjects'].activated
    ) {
      projectTypeFilter['game'].activated = true;
      projectTypeFilter['gametools'].activated = true;
      projectTypeFilter['otherProjects'].activated = true;
    }

    setRefresh(projectTypeFilter);
  }

  function ProjectCardBuilder(): ProjectData[] {
    return output.filter(
      e =>
        (e.type === 'tool' && refresh['otherProjects'].activated) ||
        (e.type === 'game' && refresh['game'].activated) ||
        (e.type === 'gametool' && refresh['gametools'].activated)
    );
  }

  function getStatusValue(gameType: projectTypeEnum): boolean {
    switch (gameType) {
      case projectTypeEnum.Game:
        return refresh['game'].activated;
      case projectTypeEnum.GameTool:
        return refresh['gametools'].activated;
      case projectTypeEnum.Tool:
        return refresh['otherProjects'].activated;
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
        ;
      </>
    );
  }

  return (
    <>
      <ButtonGroup />
      <ProjectCards projectdata={ProjectCardBuilder()} />
    </>
  );
}
