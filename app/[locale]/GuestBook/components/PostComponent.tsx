'use client';
import {Label, TextInput, Button} from 'flowbite-react';
import {useTranslations} from 'next-intl';

import {useEffect, useReducer, useState} from 'react';

interface GuestBookEntries {
  TimeStamp: string;
  Name: string;
  Linkedin: string;
  Message: string;
}

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

  function Post(formData: FormData) {
    // event.preventDefault();
    fetch(
      `https://docs.google.com/forms/d/e/1FAIpQLSeZRfqcA39lPVfk363wukI2iwd2Ud5qJUJUqM37TcAKeE2tMQ/formResponse?usp=pp_url&entry.1964352140=${formData.get(
        'name'
      )}&entry.708731546=${formData.get(
        'linkedin'
      )}&entry.1290048304=${formData.get('message')}`,
      {
        method: 'POST',
        credentials: 'omit',
        mode: 'no-cors',
        headers: {'Access-Control-Allow-Origin': 'https://docs.google.com/'},
      }
    ).then(() => {
      forceUpdate();
    });
  }

  function ReaderComponent() {
    const [guestBookEntries, setGuestBookEntries] = useState<
      Array<GuestBookEntries>
    >([]);
    useEffect(() => {
      fetch(
        'https://docs.google.com/spreadsheets/d/e/2PACX-1vS21jGYeFhM3EwbwY13OXo98UhrhOY9B6ZkyoBAuFM9foRjEJxKIyESL4nBYqA7kfRbvAUzHq-ij4_v/pub?output=csv'
      ).then(e => {
        e.text().then(s => {
          setGuestBookEntries(
            s.split('\n').map<GuestBookEntries>(itemLine => {
              const itemLineSplited = itemLine.split(',');
              return {
                TimeStamp: itemLineSplited[0],
                Name: itemLineSplited[1],
                Linkedin: itemLineSplited[2],
                Message: itemLineSplited[3],
              };
            })
          );
        });
      });
    }, []);
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
      <main className="m-10 md:grid md:grid-cols-2">
        <ReaderComponent />
        <div className="m-10">
          <PostComponent />
        </div>
      </main>
    </>
  );
}
