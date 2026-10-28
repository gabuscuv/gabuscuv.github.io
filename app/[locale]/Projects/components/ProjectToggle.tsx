import {Button, ButtonGroup} from 'flowbite-react';
import {projectTypeEnum} from '@/src/projectTypeEnum';
import {CatProjects, projectType} from '../projectType';

function ProjectChecker(
  projectCatTypes: Array<CatProjects>,
  projectTypeFilter: {[id: string]: projectType},
  showHiddenProjects: boolean,
  callback: (
    output: {[id: string]: projectType},
    showHiddenProjects: boolean,
  ) => void,
  gameType: projectTypeEnum,
) {
  function setAllToggles(
    projectTypeFilter: {[id: string]: projectType},
    status: boolean,
  ) {
    projectCatTypes.forEach(e => {
      projectTypeFilter[e.idName].activated = status;
    });
  }

  function isAllToogleEnable(projectTypeFilter: {
    [id: string]: projectType;
  }): Boolean {
    return projectCatTypes.every(e => projectTypeFilter[e.idName].activated);
  }

  if (isAllToogleEnable(projectTypeFilter)) {
    setAllToggles(projectTypeFilter, false);
  }

  projectCatTypes.forEach((e, index) => {
    projectTypeFilter[e.idName].activated =
      gameType === index ? !projectTypeFilter[e.idName].activated : false;
  });

  if (projectCatTypes.every(e => !projectTypeFilter[e.idName].activated)) {
    setAllToggles(projectTypeFilter, true);
  }
  callback(projectTypeFilter, showHiddenProjects);
}

export function _ButtonGroup(props: {
  config: {primaryColor: string; showAllLabel: string};
  projectCatTypes: Array<CatProjects>;
  projectTypeFilter: {[id: string]: projectType};
  showHiddenProjects: boolean;
  callback: (
    output: {[id: string]: projectType},
    showHiddenProjects: boolean,
  ) => void;
}) {
  function getStatusValue(
    projectTypeFilter: {[id: string]: projectType},
    gameType: projectTypeEnum,
  ): boolean {
    const find = props.projectCatTypes.find(e => e.enum === gameType);
    if (find === undefined) {
      return false;
    }
    return projectTypeFilter[find.idName].activated;
  }

  function setShowHiddenProject(): void {
    props.callback(props.projectTypeFilter, !props.showHiddenProjects);
  }


return (
  <div className="flex w-full justify-center px-4 py-4">
    <div className="flex max-w-full items-center justify-center gap-3">
      <div className="min-w-0 overflow-x-auto">
        <ButtonGroup outline className="w-max whitespace-nowrap">
          {props.projectCatTypes.map(e => (
            <Button
              key={`${e.idName}-button`}
              color={
                getStatusValue(props.projectTypeFilter, e.enum)
                  ? props.config.primaryColor
                  : 'gray'
              }
              onClick={() =>
                ProjectChecker(
                  props.projectCatTypes,
                  props.projectTypeFilter,
                  props.showHiddenProjects,
                  props.callback,
                  e.enum,
                )
              }
            >
              {e.DisplayName}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <Button
        className="shrink-0"
        color={props.showHiddenProjects ? 'pink' : 'gray'}
        outline={!props.showHiddenProjects}
        onClick={setShowHiddenProject}
      >
        {props.config.showAllLabel}
      </Button>
    </div>
  </div>
);
}
