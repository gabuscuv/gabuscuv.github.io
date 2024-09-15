'use client';
import {useRouter} from '@/app/_components/navigation';
import {ListGroup} from 'flowbite-react';

export function EntryEnumeratorComponent(props: {
  prefix: string;
  element: Array<{title: string; src: string}>;
}) {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <ListGroup className="w-48">
        {props.element.map(e => (
          <ListGroup.Item
            key={e.title + 'element'}
            onClick={() => {
              router.replace(props.prefix + e.src);
            }}
          >
            {e.title}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}
