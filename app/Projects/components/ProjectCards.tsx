'use client';

import { ProjectData } from '@/src/data/ProjectDataTypes';
import { Card } from 'flowbite-react';
import { ReactNode } from 'react';
export function ProjectCards
  (props:
    {
      projectdata: ProjectData[],
      callback: (id: string) => (void)
    }): ReactNode {
  return (
    <>
      <div id="projectcardsid" className="relative mt-36 flex-wrap flex flex-row m-100">
        {props.projectdata.map(project => (
          <Card
            key={project.id}
            className="w-60 m-2 "
            onClick={() => props.callback(project.id)}
            imgAlt={'Screenshot of' + project.name}
            imgSrc={project.iconUrl}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {project.name}
            </h5>
            <p className="font-small text-gray-700 dark:text-gray-400">
              {project.summary}
            </p>
          </Card>
        ))}
      </div>
    </>
  );
}
