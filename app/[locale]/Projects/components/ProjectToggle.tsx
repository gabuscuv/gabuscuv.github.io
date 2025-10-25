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
    <>
      <div className="inline relative top-4 place-self-center">
        <ButtonGroup outline>
          {props.projectCatTypes.map(e => (
            <Button
              key={e.DisplayName + 'Button'}
              color={
                getStatusValue(props.projectTypeFilter, e.enum)
                  ? 'pink'
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
          ;
        </ButtonGroup>
        <ButtonGroup className="pl-5">
          <Button
            color={props.showHiddenProjects ? 'pink' : 'gray'}
            outline={!props.showHiddenProjects}
            className="margin-5"
            onClick={setShowHiddenProject}
          >
            Show all
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}
