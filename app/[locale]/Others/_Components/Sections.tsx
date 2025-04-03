'use client';
import {useRouter} from '@/i18n/navigation';
import {ListGroup, ListGroupItem} from 'flowbite-react';
export function Sections() {
  const router = useRouter();
  return (
    <div>
      <ListGroup className="hidden md:block md:w-48">
        <ListGroupItem
          onClick={() => {
            router.replace('/Others/Blog');
          }}
        >
          Blog
        </ListGroupItem>
        <ListGroupItem
          onClick={() => {
            router.replace('/Others/Notes');
          }}
        >
          Notes
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
