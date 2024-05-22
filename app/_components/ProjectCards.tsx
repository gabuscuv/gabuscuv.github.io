import {ProjectData} from '@/src/data/ProjectDataTypes';
import {Card} from 'flowbite-react';
import {ReactNode} from 'react';

export function ProjectCards(props: {projectdata: ProjectData[]}): ReactNode {
  return (
    <>
      <div className="flex">
        {props.projectdata.map(project => (
          <Card
            id={project.id}
            className="max-w-sm"
            imgAlt={'Screenshot of' + project.name}
            imgSrc={project.iconUrl}
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {project.name}
            </h5>
            <p className="font-small text-gray-700 dark:text-gray-400">
              Small Description
            </p>
          </Card>
        ))}
      </div>
    </>
  );
}
