import {hobbyTimes} from '@/src/data/aboutme';
import {ListGroup, ListGroupItem} from 'flowbite-react';
import Image from 'next/image';
import {useState} from 'react';
export function ImgGallery(props: {name: string; elements: hobbyTimes}) {
  const [section, setSection] = useState<number>(0);
  return (
    <div className="md:flex md:h-80 md:w-5/6 ">
      <ListGroup className="static md:w-60">
        {props.elements.map((e, index) => (
          <ListGroupItem
            key={e.title + index}
            onClick={() => setSection(index)}
            active={section === index}
          >
            {e.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <div
        key={props.name}
        className=" flex flex-wrap space-y-1 overflow-y-scroll"
      >
        {props.elements[section].list.map(e => (
          <Image
            key={e.title}
            src={e.src}
            width={264 / 1.5}
            height={352 / 1.5}
            alt={'Image of' + e.title}
          />
        ))}
      </div>
    </div>
  );
}
