import {Button} from 'flowbite-react';
import {projectTypeEnum} from '@/src/projectTypeEnum';
import {projectType} from '../projectType';

function getStatusValue(
  projectTypeFilter: {[id: string]: projectType},
  gameType: projectTypeEnum
): boolean {
  switch (gameType) {
    case projectTypeEnum.Game:
      return projectTypeFilter['Game'].activated;
    case projectTypeEnum.GameTool:
      return projectTypeFilter['GameTool'].activated;
    case projectTypeEnum.Tool:
      return projectTypeFilter['Tool'].activated;
  }
}

function setAllToggles(
  projectTypeFilter: {[id: string]: projectType},
  status: boolean
) {
  projectTypeFilter['Game'].activated = status;
  projectTypeFilter['GameTool'].activated = status;
  projectTypeFilter['Tool'].activated = status;
}

function isAllToogleEnable(projectTypeFilter: {
  [id: string]: projectType;
}): Boolean {
  return (
    projectTypeFilter['Game'].activated &&
    projectTypeFilter['GameTool'].activated &&
    projectTypeFilter['Tool'].activated
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

  projectTypeFilter['Game'].activated =
    gameType === projectTypeEnum.Game
      ? !projectTypeFilter['Game'].activated
      : false;

  projectTypeFilter['GameTool'].activated =
    gameType === projectTypeEnum.GameTool
      ? !projectTypeFilter['GameTool'].activated
      : false;

  projectTypeFilter['Tool'].activated =
    gameType === projectTypeEnum.Tool
      ? !projectTypeFilter['Tool'].activated
      : false;

  if (
    !projectTypeFilter['Game'].activated &&
    !projectTypeFilter['GameTool'].activated &&
    !projectTypeFilter['Tool'].activated
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
      <div className="inline relative top-4 place-self-center">
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
