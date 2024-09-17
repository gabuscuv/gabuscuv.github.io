import {hobbyTimes} from '@/src/data/aboutme';
import {YouTubeEmbed} from '@next/third-parties/google';
import {Carousel} from 'flowbite-react';

export function VideoCarrousel(props: {name: string; array: hobbyTimes}) {
  return (
    <div className="md:max-w-xl max-h-full">
      <Carousel slide={false}>
        {props.array[0].list.map((e, counter) => (
          <YouTubeEmbed key={e.title + counter} videoid={e.src} />
        ))}
      </Carousel>
    </div>
  );
}
