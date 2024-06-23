'use client';

import {ProjectData} from '@/src/data/ProjectDataTypes';
import {Card} from 'flowbite-react';
import {ReactNode} from 'react';
import metaImages from '@/src/metaimages.json';
import Image from 'next/image';

const prefix = '/img/stacks/';

interface imageData {
  stackIcons: {[id: string]: string};
}

const s = metaImages as imageData;

const commonSize = 'h-96';

export function ProjectCards(props: {
  projectdata: ProjectData[];
  callback: (id: string) => void;
}): ReactNode {
  return (
    <>
      <div
        id="projectcardsid"
        className="relative justify-center gap-2 mt-36 flex-wrap flex flex-row lg:m-100"
      >
        {props.projectdata.map(project => (
          <Card
            key={project.id}
            className={commonSize + ' w-60 cursor-pointer'}
            onClick={() => props.callback(project.id)}
            // imgAlt={'Screenshot of' + project.name}
            renderImage={() => (
              <div className={commonSize + ' overflow-hidden'}>
                <div className="absolute max-w-12 max-h-10 flex mt-40 ml-1 ">
                  {project.stack.map(stack => {
                    if (!Object.hasOwn(metaImages.stackIcons, stack)) {
                      return <div key={`${project.id}${stack}`}></div>;
                    }
                    return (
                      <Image
                        key={`${project.id}${stack}`}
                        src={prefix + s.stackIcons[stack]}
                        height={40}
                        width={40}
                        className="block mt-auto mb-auto mr-3"
                        alt={'icon of ' + stack}
                      />
                    );
                  })}
                </div>
                <Image
                  key={project.name + 'img'}
                  className="w-full h-full object-cover"
                  src={project.iconUrl}
                  width={238}
                  height={188}
                  alt={'Image Of' + project.name}
                ></Image>
              </div>
            )}
          >
            <div className="pb-20">
              <h5 className="text-base font-bold tracking-tight text-gray-900 dark:text-white">
                {project.name}
              </h5>
              <p className="text-xs font-normal "> ({project.year})</p>
              <p className="text-xs text-gray-700 dark:text-gray-400">
                {project.summary}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
