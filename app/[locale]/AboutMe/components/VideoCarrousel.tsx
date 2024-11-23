import {hobbyTimes} from '@/src/data/aboutme';
import {YouTubeEmbed} from '@next/third-parties/google';
import {Carousel} from 'flowbite-react';

const style = "absolute top-24 flex items-center justify-center px-4 focus:outline-none"

export function VideoCarrousel(props: {name: string; array: hobbyTimes}) {
  return (
    <div key={props.name} className="md:max-w-xl max-h-xl">
      <Carousel theme={{
        root: {
          leftControl: style + ' left-0',
          rightControl:  style + ' right-0'
        }
      }} slide={false}>
        {props.array[0].list.map((e, counter) => (
          <YouTubeEmbed  key={e.title + counter} videoid={e.src} />
        ))}
      </Carousel>
    </div>
  );
}
