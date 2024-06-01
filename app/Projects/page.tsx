'use client';


import {ReactNode, useEffect, useState} from 'react';
import gameProjects from '@/src/data/GameProjectsData';
import gameToolsProjectsData from '@/src/data/GameToolsProjectsData';
import otherProjectsData from '@/src/data/OtherProjectsData';
import {ProjectCards} from './components/ProjectCards';
import {ProjectData} from '@/src/data/ProjectDataTypes';
import { ProjectDataArrayEncrypted } from "@/src/data/ProjectDataArrayEncrypted";
import { Button } from 'flowbite-react';
import { projectTypeEnum } from './projectTypeEnum';


interface projectType {
  activated: boolean;
}
let output: Array<ProjectData> = [];

export default function ProjectBrowser(): ReactNode {
  const cipherstring: Uint8Array = Uint8Array.from([140, 27, 0, 173, 96, 5, 158, 202, 36, 231, 212, 24, 62, 84, 117, 167]);
  const [projectData, setProjectData] = useState<Array<ProjectData>>([]);

  useEffect(() => {
    if (output.length == 0) {
      crypto.subtle.importKey(
        "raw",
        cipherstring.buffer,
        "AES-CTR",
        false,
        ["decrypt"],
      ).then(e =>
        new ProjectDataArrayEncrypted(gameProjects, e).Getter((projectData: Array<ProjectData>) => {
          if (output.length != 0) { return; }
          output = output.concat(projectData);
          output = output.concat(gameToolsProjectsData);
          output = output.concat(otherProjectsData);
          setProjectData(output.toSorted(e=>e.year).toSorted(e=>e.type));
        }
        ),);
    }
  },[projectData]);


  const projectTypeFilter: {
    [id: string]: projectType;
  } = {
    game: {activated: true},
    gametools: {activated: true},
    otherProjects: {activated: true},
  };


  function ProjectChecker(gameType: projectTypeEnum) {
    console.log("hi!")
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
        e => {
          return (e.type === projectTypeEnum.Tool && projectTypeFilter['otherProjects'].activated) ||
          (e.type === projectTypeEnum.Game && projectTypeFilter['game'].activated) ||
          (e.type === projectTypeEnum.GameTool && projectTypeFilter['gametools'].activated)
          }
      ).toSorted(e=>e.year)
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
