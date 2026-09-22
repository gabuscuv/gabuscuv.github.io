'use client';

import {References, ReferenceClass} from '@/src/data/ReferencesData';
import {Avatar, Blockquote, Carousel} from 'flowbite-react';
import {ReactNode} from 'react';

export function ReferencesCarouselComponent(): ReactNode {
  return (
    <Carousel
      className="rounded-md bg-gray-400 dark:bg-gray-700"
      slideInterval={5000}>
      {References.map((reference) => (
        <ReferenceComponent key={reference.name} reference={reference} />
      ))}
    </Carousel>
  );
}

export function ReferenceComponent(props: {reference: ReferenceClass}): ReactNode {
  return (
    <figure className="flex h-full flex-col justify-center px-6 py-8 text-center md:px-12">
      <Blockquote className="mx-auto max-w-4xl">
        <p className="text-base font-normal italic text-gray-900 md:text-2xl md:font-medium dark:text-white">
          {props.reference.description}
        </p>
      </Blockquote>

      <figcaption className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Avatar
          rounded
          size="sm"
          img={props.reference.iconUrl}
          alt={`${props.reference.name} profile picture`}
        />

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
          <cite className="font-medium not-italic text-gray-900 dark:text-white">
            {props.reference.name}
          </cite>
          <span className="hidden h-5 w-px bg-gray-500 sm:block dark:bg-gray-700" />
          <cite className="text-sm not-italic text-gray-500 dark:text-gray-400">
            {props.reference.job} at {props.reference.company}
          </cite>
        </div>
      </figcaption>
    </figure>
  );
}
