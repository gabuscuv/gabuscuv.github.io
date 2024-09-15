'use client';
import {useRouter} from '@/app/_components/navigation';
import {ListGroup} from 'flowbite-react';
export function Sections() {
  const router = useRouter();
  return (
    <div className="flex justify-center">
      <ListGroup className="w-48">
        <ListGroup.Item
          onClick={() => {
            router.replace('/Others/Blog');
          }}
        >
          Blog
        </ListGroup.Item>
        <ListGroup.Item
          onClick={() => {
            router.replace('/Others/Notes');
          }}
        >
          Notes
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
