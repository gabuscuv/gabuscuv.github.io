'use client';

import {ReactNode, useEffect, useState} from 'react';
import {ProjectCards} from './ProjectCards';
import {HiFilter} from 'react-icons/hi';
import {ProjectData} from '@/src/data/ProjectDataTypes';
import {GetProjects} from '@/src/middleware/ProjectDataArrayEncrypted';
import ProjectModal from './ProjectModal';
import {Types} from './ProjectFilter';
import {projectType} from '../projectType';
import {_ButtonGroup} from './ProjectToggle';
import {Button, Drawer, DrawerHeader, DrawerItems} from 'flowbite-react';
import {TrademarkNotice} from './TrademarkNotice';
import {projects} from '@/src/middleware/Getter';

let visibleHiddenProject: boolean = false;
const filterStack: Set<string> = new Set<string>();
let output: Array<ProjectData> = [];

let projectTypeFilter: {
  [id: string]: projectType;
} = {
  Game: {
    activated: true,
    id: 0,
  },
  GameTool: {
    activated: true,
    id: 1,
  },
  Tool: {
    activated: true,
    id: 2,
  },
};

let locale = '';

export default function ProjectBrowser(props: {
  locale: string;
  projects: projects;
}): ReactNode {
  const [projectsData, setProjectsData] = useState<Array<ProjectData>>([]);
  const [projectData, setProjectData] = useState<ProjectData | undefined>(
    undefined,
  );

  const [openModalStatus, setOpenModal] = useState(false);
  const [openFilterSidebar, setOpenFilterSidebar] = useState(false);
  useEffect(() => {
    if (output.length === 0 || locale !== props.locale) {
      void GetProjects(props.projects).then(projects => {
        output = projects;
        locale = props.locale;
        setProjectsData(
          output.filter(
            e =>
              !e.hiddenbydefault || (e.hiddenbydefault && visibleHiddenProject),
          ),
        );
      });
    } else {
      if (projectsData.length === 0) {
        setProjectsData(output);
      }
    }
  }, [projectsData.length, props.locale, props.projects]);

  function ProjectCardBuilder(projectTypeFilter: {
    [id: string]: projectType;
  }): void {
    setProjectsData(
      output
        .filter(
          e =>
            !e.hiddenbydefault || (e.hiddenbydefault && visibleHiddenProject),
        )
        .filter(e => {
          return (
            (e.projecttype === 'Tool' && projectTypeFilter['Tool'].activated) ||
            (e.projecttype === 'Game' && projectTypeFilter['Game'].activated) ||
            (e.projecttype === 'GameTool' &&
              projectTypeFilter['GameTool'].activated)
          );
        })
        .filter(project =>
          [...filterStack].every(fs => project.stack.includes(fs)),
        )
        .toSorted((a, b) => b.year - a.year)
        .toSorted(
          (a, b) =>
            projectTypeFilter[a.projecttype].id -
            projectTypeFilter[b.projecttype].id,
        ),
    );
  }

  function OpenProjectModal(id: string) {
    setProjectData(output.find(e => e.id === id));
    setOpenModal(true);
  }

  function ChangedFilter(e: string) {
    filterStack.has(e) ? filterStack.delete(e) : filterStack.add(e);
    ProjectCardBuilder(projectTypeFilter);
  }

  function ToggleChanged(
    output: {[id: string]: projectType},
    setValue: boolean,
  ) {
    projectTypeFilter = output;
    visibleHiddenProject = setValue;
    ProjectCardBuilder(projectTypeFilter);
  }

  return (
    <>
      <div className="flex flex-col">
        <_ButtonGroup
          projectTypeFilter={projectTypeFilter}
          showHiddenProjects={visibleHiddenProject}
          callback={ToggleChanged}
        />
        <div className="flex flex-row">
          <Drawer
            className="lg:invisible"
            open={openFilterSidebar}
            onClose={() => setOpenFilterSidebar(false)}
          >
            <DrawerHeader title="Filter Drawer" />
            <DrawerItems>
              <Types
                projectsData={projectsData}
                _filterStack={filterStack}
                callback={ChangedFilter}
              />
            </DrawerItems>
          </Drawer>
          <Types
            className="hidden lg:block"
            projectsData={projectsData}
            _filterStack={filterStack}
            callback={ChangedFilter}
          />
          <ProjectCards
            callback={OpenProjectModal}
            projectdata={projectsData}
          />
        </div>
        <ProjectModal
          projectData={projectData}
          openModalStatus={openModalStatus}
          closeCallback={() => setOpenModal(false)}
        />
        <div className="visible lg:invisible fixed bottom-10 right-10">
          <Button
            onClick={() => {
              setOpenFilterSidebar(true);
            }}
          >
            <HiFilter className="h-6 w-6" />
          </Button>
        </div>
      </div>
      <TrademarkNotice />
    </>
  );
}
