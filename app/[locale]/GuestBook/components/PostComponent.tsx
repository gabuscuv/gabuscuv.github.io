'use client';
import {GetEntries, GuestBookEntries, PostEntry} from '@/src/GuestBook';
import {Label, TextInput, Button} from 'flowbite-react';
import {useTranslations} from 'next-intl';

import {useEffect, useReducer, useState} from 'react';

function Entry(props: {guestEntry: GuestBookEntries}) {
  return (
    <>
      <div className="flex items-start gap-2.5">
        {/* <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="Jese image"> */}
        <div className="flex flex-col w-full max-w-[320px] leading-1.5">
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="text-sm font-semibold text-gray-900 dark:text-white">
              {props.guestEntry.Name}
            </span>
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              {props.guestEntry.TimeStamp}
            </span>
          </div>
          <p className="text-sm font-normal py-2 text-gray-900 dark:text-white">
            {' '}
            {props.guestEntry.Message}
          </p>
        </div>
      </div>
    </>
  );
}

export function GuestFunctionMain() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const t = useTranslations('Guestbook');

  function Post(formData: FormData): Promise<void> {
    return PostEntry(formData).then(() => {
      forceUpdate();
    });
  }

  function ReaderComponent() {
    const [guestBookEntries, setGuestBookEntries] = useState<
      Array<GuestBookEntries> | undefined
    >(undefined);
    useEffect(() => {
      void GetEntries().then(entries => setGuestBookEntries(entries));
    }, []);
    if (guestBookEntries === undefined) {
      return (
        <div>
          <p>{t('Loading')}</p>
        </div>
      );
    }
    return (
      <div className="w-full flex">
        <div className="h-10 w-full">
          {guestBookEntries
            .filter(e => e.TimeStamp !== '')
            .slice(1)
            .map((entry, index) => (
              <div key={'msg' + index}>
                <Entry guestEntry={entry} />
              </div>
            ))}
        </div>
        <Button
          className="ml-5 h-10"
          onClick={() => {
            forceUpdate();
          }}
        >
          {t('update')}
        </Button>
      </div>
    );
  }

  function PostComponent() {
    return (
      <>
        <form className="flex max-w-md flex-col gap-4" action={Post}>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="name" value={t('Name')} />
            </div>
            <TextInput id="name" name="name" type="text" sizing="sm" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="linkedin" value={t('LinkedinLink')} />
            </div>
            <TextInput id="linkedin" name="linkedin" type="text" sizing="md" />
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="message" value={t('Description')} />
            </div>
            <TextInput id="message" name="message" type="text" sizing="lg" />
          </div>
          <Button type="submit">{t('Submit')}</Button>
        </form>
      </>
    );
  }

  return (
    <>
      <main className="m-10 flex flex-col-reverse md:grid md:grid-cols-2">
        <ReaderComponent />
        <div className="m-10">
          <PostComponent />
        </div>
      </main>
    </>
  );
}
