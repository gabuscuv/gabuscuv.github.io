import {Button} from 'flowbite-react';
import {projectTypeEnum} from '@/src/projectTypeEnum';
import {projectType} from '../projectType';

function getStatusValue(
  projectTypeFilter: {[id: string]: projectType},
  gameType: projectTypeEnum
): boolean {
  switch (gameType) {
    case projectTypeEnum.Game:
      return projectTypeFilter['game'].activated;
    case projectTypeEnum.GameTool:
      return projectTypeFilter['gametools'].activated;
    case projectTypeEnum.Tool:
      return projectTypeFilter['otherProjects'].activated;
  }
}

function setAllToggles(
  projectTypeFilter: {[id: string]: projectType},
  status: boolean
) {
  projectTypeFilter['game'].activated = status;
  projectTypeFilter['gametools'].activated = status;
  projectTypeFilter['otherProjects'].activated = status;
}

function isAllToogleEnable(projectTypeFilter: {
  [id: string]: projectType;
}): Boolean {
  return (
    projectTypeFilter['game'].activated &&
    projectTypeFilter['gametools'].activated &&
    projectTypeFilter['otherProjects'].activated
  );
}

function ProjectChecker(
  projectTypeFilter: {[id: string]: projectType},
  callback: (output: {[id: string]: projectType}) => void,
  gameType: projectTypeEnum
) {
  if (isAllToogleEnable(projectTypeFilter)) {
    setAllToggles(projectTypeFilter, false);
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
    setAllToggles(projectTypeFilter, true);
  }
  callback(projectTypeFilter);
}

export function ButtonGroup(props: {
  projectTypeFilter: {[id: string]: projectType};
  callback: (output: {[id: string]: projectType}) => void;
}) {
  return (
    <>
      <div className="inline relative top-20 place-self-center">
        <Button.Group outline>
          <Button
            color={
              getStatusValue(props.projectTypeFilter, projectTypeEnum.Game)
                ? 'pink'
                : 'gray'
            }
            onClick={() =>
              ProjectChecker(
                props.projectTypeFilter,
                props.callback,
                projectTypeEnum.Game
              )
            }
          >
            Games
          </Button>
          <Button
            color={
              getStatusValue(props.projectTypeFilter, projectTypeEnum.GameTool)
                ? 'pink'
                : 'gray'
            }
            onClick={() =>
              ProjectChecker(
                props.projectTypeFilter,
                props.callback,
                projectTypeEnum.GameTool
              )
            }
          >
            Game Tools
          </Button>
          <Button
            color={
              getStatusValue(props.projectTypeFilter, projectTypeEnum.Tool)
                ? 'pink'
                : 'gray'
            }
            onClick={() =>
              ProjectChecker(
                props.projectTypeFilter,
                props.callback,
                projectTypeEnum.Tool
              )
            }
          >
            Tools
          </Button>
        </Button.Group>
      </div>
    </>
  );
}
