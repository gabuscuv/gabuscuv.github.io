'use client';
import {useRouter} from '@/i18n/navigation';
import {ListGroup, ListGroupItem} from 'flowbite-react';

export function EntryEnumeratorComponent(props: {
  prefix: string;
  element: Array<{title: string; src: string}>;
}) {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <ListGroup className="w-48">
        {props.element.map(e => (
          <ListGroupItem
            key={e.title + 'element'}
            onClick={() => {
              router.replace(props.prefix + e.src);
            }}
          >
            {e.title}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
