'use client';
import {ListGroup} from 'flowbite-react';
import {useState} from 'react';
import {VideoCarrousel} from './VideoCarrousel';
import {favThings, hobbyTimes} from '@/src/data/aboutme';
import {ImgGallery} from './ImgGallery';
import {useTranslations} from 'next-intl';

enum sectionEnum {
  Youtubem,
  music,
  videogames,
  anime,
}

const elementsMenu: Array<{enum: sectionEnum; title: string}> = [
  {
    enum: sectionEnum.Youtubem,
    title: 'Videos',
  },
  {
    enum: sectionEnum.music,
    title: 'Music',
  },
  {
    enum: sectionEnum.videogames,
    title: 'VideoGames',
  },
  {
    enum: sectionEnum.anime,
    title: 'Anime',
  },
];

function getVideoArrayFunction(section: sectionEnum): hobbyTimes {
  switch (section) {
    case sectionEnum.Youtubem:
      return favThings.Youtube;
    case sectionEnum.music:
      return favThings.Music;
    case sectionEnum.videogames:
      return favThings.VideoGames;
    case sectionEnum.anime:
      return favThings.Anime;
    default:
      return [];
  }
}

export function HobbySections() {
  const t = useTranslations('AboutMe.Shorts');
  const [section, setSection] = useState<sectionEnum>(sectionEnum.Youtubem);
  return (
    <div className="justify-center">
      <b>{t('FavouriteMedia')}:</b>
      <div className="md:flex">
        <div className="flex ">
          <ListGroup className="w-full md:w-48 pr-2">
            {elementsMenu.map(e => (
              <ListGroup.Item
                key={e.title}
                onClick={() => setSection(e.enum)}
                active={section === e.enum}
              >
                {e.title}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        <div className="md:w-2/3">
          {section <= sectionEnum.music ? (
            <VideoCarrousel
            array={getVideoArrayFunction(section)}
            name={sectionEnum[section]}
            />
          ) : (
              <ImgGallery
              key={sectionEnum[section]}
              name={sectionEnum[section]}
              elements={getVideoArrayFunction(section)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
