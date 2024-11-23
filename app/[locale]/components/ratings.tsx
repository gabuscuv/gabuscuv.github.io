'use client';

import {References, ReferenceClass} from '@/src/data/ReferencesData';
import {Avatar, Blockquote, Carousel} from 'flowbite-react';
import {ReactNode} from 'react';

export function ReferencesCarouselComponent(): ReactNode {
  return (
    <>
      <Carousel className="rounded-md h-96 md:xl:h-80 bg-gray-400">
        {References.map(e => (
          <Component key={e.name} reference={e}></Component>
        ))}
      </Carousel>
    </>
  );
}

export function Component(props: {reference: ReferenceClass}): ReactNode {
  return (
    <figure className="h-full max-h-screen-md p-5 max-w-screen-md text-center">
      <Blockquote>
        <p className="text-m md:text-2xl font-xs xl:font-medium italic text-gray-900 dark:text-white">
          {props.reference.description}
        </p>
      </Blockquote>
      <figcaption className="grid mt-6 items-center justify-center space-x-3">
        <Avatar
          rounded
          size="xs"
          img={props.reference.iconUrl}
          alt="profile picture"
        />
        <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
          <cite className="pr-3 font-medium text-gray-900 dark:text-white">
            {props.reference.name}
          </cite>
          <cite className="pl-3 text-sm text-gray-500 dark:text-gray-400">
            {props.reference.job} at {props.reference.company}
          </cite>
        </div>
      </figcaption>
    </figure>
  );
}
