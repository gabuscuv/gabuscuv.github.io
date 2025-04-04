'use client';
/* eslint-disable n/no-extraneous-import */
import {ReactNode, useEffect, useState} from 'react';
import {GetSocials, social} from '@/src/data/arrayRRSS';
import {useTranslations} from 'next-intl';

export function ContactMe(): ReactNode {
  const t = useTranslations('Contact');
  const [decryptedSNS, setDecryptedSocial] = useState<
    Array<social> | undefined
  >(undefined);
  useEffect(() => {
    void GetSocials().then(socials => setDecryptedSocial(socials));
  }, []);
  if (decryptedSNS === undefined) {
    return <></>;
  }
  return (
    <div className="flex flex-col items-center align-middle">
      <p>{t('Heading')}</p>
      <ul className="pt-5 grid space-y-2 items-center">
        {decryptedSNS.map(e => (
          <li key={e.name + 'Contact'}>
            <a className="flex align-middle" href={e.url}>
              {e.logo} <p className="pl-5">{e.name}</p>{' '}
              {e.innerText !== undefined ? ': ' + e.innerText : ''}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
