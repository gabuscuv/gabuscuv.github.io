import {Button} from 'flowbite-react';
import {projectTypeEnum} from '../projectTypeEnum';
import {projectType} from '../projectType';

const projectTypeFilter: {
  [id: string]: projectType;
} = {
  game: {activated: true},
  gametools: {activated: true},
  otherProjects: {activated: true},
};

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

function setAllToggles(status: boolean) {
  projectTypeFilter['game'].activated = status;
  projectTypeFilter['gametools'].activated = status;
  projectTypeFilter['otherProjects'].activated = status;
}

function isAllToogleEnable(): Boolean {
  return (
    projectTypeFilter['game'].activated &&
    projectTypeFilter['gametools'].activated &&
    projectTypeFilter['otherProjects'].activated
  );
}

function ProjectChecker(
  callback: (output: {[id: string]: projectType}) => void,
  gameType: projectTypeEnum
) {
  if (isAllToogleEnable()) {
    setAllToggles(false);
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
    setAllToggles(true);
  }
  callback(projectTypeFilter);
}

export function ButtonGroup(props: {
  callback: (output: {[id: string]: projectType}) => void;
}) {
  return (
    <>
      <div className="inline relative top-20 place-self-center">
        <Button.Group outline>
          <Button
            color={
              getStatusValue(projectTypeFilter, projectTypeEnum.Game)
                ? 'pink'
                : 'gray'
            }
            onClick={() => ProjectChecker(props.callback, projectTypeEnum.Game)}
          >
            Games
          </Button>
          <Button
            color={
              getStatusValue(projectTypeFilter, projectTypeEnum.GameTool)
                ? 'pink'
                : 'gray'
            }
            onClick={() =>
              ProjectChecker(props.callback, projectTypeEnum.GameTool)
            }
          >
            Game Tools
          </Button>
          <Button
            color={
              getStatusValue(projectTypeFilter, projectTypeEnum.Tool)
                ? 'pink'
                : 'gray'
            }
            onClick={() => ProjectChecker(props.callback, projectTypeEnum.Tool)}
          >
            Tools
          </Button>
        </Button.Group>
      </div>
    </>
  );
}
