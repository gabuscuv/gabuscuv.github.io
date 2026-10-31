'use client';

import {ProjectData} from '@/src/data/ProjectDataTypes';
// eslint-disable-next-line n/no-extraneous-import
import {motion} from 'framer-motion';
import {ReactNode} from 'react';
import metaImages from '@/src/metaimages.json';
import Image from 'next/image';

const prefix = '/img/stacks/';

interface ImageData {
  stackIcons: {[id: string]: string};
}

const list = {
  visible: {
    opacity: 1,
    transition: {
      delay: 0.3,
      when: 'beforeChildren',
      staggerChildren: 0.2, // Stagger children by .3 seconds
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

const item = {
  visible: {opacity: 1},
  hidden: {opacity: 0},
};

const s = metaImages as ImageData;

const imageHeight = 'h-48';

export function ProjectCards(props: {
  projectdata: ProjectData[];
  callback: (id: string) => void;
}): ReactNode {
  return (
    <motion.div
      id="projectcardsid"
      initial="hidden"
      animate="visible"
      variants={list}
      className="relative mt-10 flex flex-row flex-wrap items-stretch justify-center gap-4"
    >
      {props.projectdata.map(project => (
        <motion.div
          key={project.id}
          initial="hidden"
          variants={item}
          className="flex w-60"
        >
          <button
            type="button"
            onClick={() => props.callback(project.id)}
            className="flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-md transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800"
          >
            <div className={`${imageHeight} relative w-full shrink-0 overflow-hidden`}>
              <Image
                className="h-full w-full object-cover"
                src={
                  project.iconUrl.length
                    ? project.iconUrl
                    : '/img/No_Image_Available.jpg'
                }
                width={238}
                height={192}
                alt={`Image of ${project.name}`}
              />
            </div>

            <div className="relative z-10 -mt-5 mb-2 flex min-h-10 flex-wrap items-center gap-1 px-2">
              {project.techStack.map(stack => {
                if (!Object.hasOwn(s.stackIcons, stack)) {
                  return null;
                }

                return (
                  <Image
                    key={`${project.id}${stack}`}
                    src={prefix + s.stackIcons[stack]}
                    height={40}
                    width={40}
                    className="block"
                    alt={`${stack} icon`}
                  />
                );
              })}
            </div>

            <div className="flex min-w-0 flex-1 flex-col items-start gap-2 p-4">
              <h5 className="break-words text-base font-bold tracking-tight text-gray-900 dark:text-white">
                {project.name}
              </h5>

              <p className="text-xs font-normal text-gray-500 dark:text-gray-400">
                ({project.year})
              </p>

              <p className="whitespace-normal break-words text-xs font-normal text-gray-700 dark:text-gray-400 [overflow-wrap:anywhere]">
                {project.summary}
              </p>
            </div>
          </button>
        </motion.div>
      ))}
    </motion.div>
  );
}
