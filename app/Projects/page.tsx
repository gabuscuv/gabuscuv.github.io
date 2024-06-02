'use client';


import { ReactNode, useEffect, useState } from 'react';
import gameProjects from '@/src/data/GameProjectsData';
import gameToolsProjectsData from '@/src/data/GameToolsProjectsData';
import otherProjectsData from '@/src/data/OtherProjectsData';
import { ProjectCards } from './components/ProjectCards';
import { ProjectData } from '@/src/data/ProjectDataTypes';
import { ProjectDataArrayEncrypted } from "@/src/data/ProjectDataArrayEncrypted";
import { Button, Checkbox, Label } from 'flowbite-react';
import { projectTypeEnum } from './projectTypeEnum';
import ProjectModal from './components/ProjectModal';

const type: { [id: string]: { FullName: string, type: string } } =
{
  "c": { FullName: "C", type: "language" },
  "cpp": { FullName: "C++", type: "language" },
  "csharp": { FullName: "C#", type: "language" },
  "react": { FullName: "React", type: "webFramework" },
  "golang": { FullName: "Golang", type: "language" },
  "unreal": { FullName: "Unreal Engine", type: "gameEngine" },
  "monogame": { FullName: "Monogame", type: "gameLib" },
  "love2d": { FullName: "Love2D", type: "gameLib" },
  "raylib": { FullName: "Raylib", type: "gameLib" },
  "unity": { FullName: "Unity", type: "gameEngine" },
  "js": { FullName: "JavaScript", type: "language" },
  "fmod": { "FullName": "FMOD", type: "middleware" },
  "python": { "FullName": "Python", type: "language" },
  "wwise": { "FullName": "Wwise", type: "middleware" },
  "bash": { "FullName": "Bash", type: "language" },
  "powershell": { "FullName": "PowerShell", type: "language" }
}

const categories: Array<{ FullName: string, type: string }> =
  [
    { FullName: "Language", type: "language" },
    { FullName: "Game Engine", type: "gameEngine" },
    { FullName: "Game Lib", type: "gameLib" },
    { FullName: "Middleware", type: "middleware" },
    { FullName: "Web Framework", type: "webFramework" },
  ]

interface projectType {
  activated: boolean;
}
let output: Array<ProjectData> = [];
let filterStack: Set<string> = new Set<string>();


export default function ProjectBrowser(): ReactNode {
  const cipherstring: Uint8Array = Uint8Array.from([140, 27, 0, 173, 96, 5, 158, 202, 36, 231, 212, 24, 62, 84, 117, 167]);
  const [projectsData, setProjectsData] = useState<Array<ProjectData>>([]);
  const [projectData, setProjectData] = useState<ProjectData | undefined>(undefined);
  const [_filterStack, setFilterStack] = useState<Set<string>>(new Set<string>());
  const [openModal, setOpenModal] = useState(false);

  const projectTypeFilter: {
    [id: string]: projectType;
  } = {
    game: { activated: true },
    gametools: { activated: true },
    otherProjects: { activated: true },
  };

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
          output = output.concat(projectData.toSorted((a, b) => b.year - a.year));
          output = output.concat(gameToolsProjectsData);
          output = output.concat(otherProjectsData);
          setProjectsData(output);
        }
        ),);
    }
  }, [projectsData]);

  function OpenModal(id : string)
  {
    setProjectData(output.find(e => e.id == id));
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
        output.filter(
          e => {
            return (e.type === projectTypeEnum.Tool && projectTypeFilter['otherProjects'].activated) ||
              (e.type === projectTypeEnum.Game && projectTypeFilter['game'].activated) ||
              (e.type === projectTypeEnum.GameTool && projectTypeFilter['gametools'].activated)
          }
        ))
        .toSorted((a, b) => b.year - a.year)
        .toSorted((a, b) => a.type - b.type)
    );
  }

  function filterOrReturn(projectData: Array<ProjectData>) {
    if (filterStack.size == 0 || projectData.length == 0) { return projectData; }

    return projectData.filter(project => [...filterStack].every(fs => project.stack.includes(fs)))
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

  function Types(): ReactNode {
    if (projectsData.length == 0) { return <></>; }
    let tmp;
    const _categories = [...new Set(projectsData.map(item => item.stack.map(e => e)).reduce((a, b) => a.concat(b)))];
    return (<>
      <div className='flex flex-col pl-20 pt-10 mt-40'>
        <h3 className='pb-5'>Filter</h3>
        {
          categories.map(
            (category) => {
              tmp = _categories.filter(_category => type[_category]?.type == category.type);
              if (tmp.length == 0) { return <></> }
              return <>
                <h4 className='h3'>{category.FullName}</h4>
                {
                  tmp.map(e =>
                    <div className="pt-1 pb-1 flex items-center gap-2">
                      <Checkbox id={e}
                        defaultChecked={_filterStack.has(e)}
                        onClick={() => { _filterStack.has(e) ? filterStack.delete(e) : filterStack.add(e); setFilterStack(filterStack); ProjectCardBuilder(); }} />
                      <Label htmlFor={e}>{type[e]?.FullName}</Label>
                    </div>)
                }
              </>
            })
        }

      </div></>)
  }


  function ButtonGroup() {
    return (
      <>
        <div className='inline relative top-20 place-self-center'>
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

  return (
    <>
      
      <div className='flex flex-col'>
      <ButtonGroup />
      <div className='flex flex-row'>
        <Types />
        <ProjectCards callback={(string)=>OpenModal(string)} projectdata={projectsData} />
        <ProjectModal projectData={projectData} openModal={openModal} closeCallback={()=> setOpenModal(false)}  />
        </div>
      </div>
    </>
  );
}
