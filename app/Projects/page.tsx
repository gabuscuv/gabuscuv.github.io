'use client';

import {ReactNode, useEffect, useState} from 'react';
import gameProjects from '@/src/data/GameProjectsData';
import gameToolsProjectsData from '@/src/data/GameToolsProjectsData';
import otherProjectsData from '@/src/data/OtherProjectsData';
import {ProjectCards} from './components/ProjectCards';
import {ProjectData} from '@/src/data/ProjectDataTypes';
import {ProjectDataArrayEncrypted} from '@/src/data/ProjectDataArrayEncrypted';
import {Button} from 'flowbite-react';
import {projectTypeEnum} from './projectTypeEnum';
import ProjectModal from './components/ProjectModal';
import {Types} from './components/ProjectFilter';

interface projectType {
  activated: boolean;
}

const filterStack: Set<string> = new Set<string>();
let output: Array<ProjectData> = [];

export default function ProjectBrowser(): ReactNode {
  const cipherstring: Uint8Array = Uint8Array.from([
    140, 27, 0, 173, 96, 5, 158, 202, 36, 231, 212, 24, 62, 84, 117, 167,
  ]);
  const [projectsData, setProjectsData] = useState<Array<ProjectData>>([]);
  const [projectData, setProjectData] = useState<ProjectData | undefined>(
    undefined
  );
  const [_filterStack, setFilterStack] = useState<Set<string>>(
    new Set<string>()
  );
  const [openModal, setOpenModal] = useState(false);

  const projectTypeFilter: {
    [id: string]: projectType;
  } = {
    game: {activated: true},
    gametools: {activated: true},
    otherProjects: {activated: true},
  };

  useEffect(() => {
    if (output.length === 0) {
      crypto.subtle
        .importKey('raw', cipherstring.buffer, 'AES-CTR', false, ['decrypt'])
        .then(e =>
          new ProjectDataArrayEncrypted(gameProjects, e).Getter(
            (projectData: Array<ProjectData>) => {
              if (output.length !== 0) {
                return;
              }
              output = output.concat(
                projectData.toSorted((a, b) => b.year - a.year)
              );
              output = output.concat(gameToolsProjectsData);
              output = output.concat(otherProjectsData);
              setProjectsData(output);
            }
          )
        );
    }
  }, [projectsData]);

  function OpenModal(id: string) {
    setProjectData(output.find(e => e.id === id));
    setOpenModal(true);
  }

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
    setProjectsData(
      filterOrReturn(
        output.filter(e => {
          return (
            (e.type === projectTypeEnum.Tool &&
              projectTypeFilter['otherProjects'].activated) ||
            (e.type === projectTypeEnum.Game &&
              projectTypeFilter['game'].activated) ||
            (e.type === projectTypeEnum.GameTool &&
              projectTypeFilter['gametools'].activated)
          );
        })
      )
        .toSorted((a, b) => b.year - a.year)
        .toSorted((a, b) => a.type - b.type)
    );
  }

  function filterOrReturn(projectData: Array<ProjectData>) {
    if (filterStack.size === 0 || projectData.length === 0) {
      return projectData;
    }

    return projectData.filter(project =>
      [...filterStack].every(fs => project.stack.includes(fs))
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
        <div className="inline relative top-20 place-self-center">
          <Button.Group outline>
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
        </div>
      </>
    );
  }

  function ChangedFilter(e: string) {
    filterStack.has(e) ? filterStack.delete(e) : filterStack.add(e);

    setFilterStack(filterStack);
    ProjectCardBuilder();
  }

  return (
    <>
      <div className="flex flex-col">
        <ButtonGroup />
        <div className="flex flex-row">
          <Types
            projectsData={projectsData}
            _filterStack={_filterStack}
            callback={ChangedFilter}
          />
          <ProjectCards
            callback={string => OpenModal(string)}
            projectdata={projectsData}
          />
          <ProjectModal
            projectData={projectData}
            openModal={openModal}
            closeCallback={() => setOpenModal(false)}
          />
        </div>
      </div>
    </>
  );
}
