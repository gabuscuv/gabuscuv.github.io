'use client';
import {Link, usePathname} from './navigation';
import {Navbar} from 'flowbite-react';
import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';

export const locales = ['en', 'es'] as const;
export const localePrefix = 'always'; // Default

export function NavBar(props: {localeSwitcher: ReactNode}) {
  const t = useTranslations('NavBar');
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Gabriel Bustillo del Cuvillo
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} href="/" active={usePathname() === '/'}>
          Home
        </Navbar.Link>
        {
          // I Will Do it later
          /* <Navbar.Link as={Link} href="/">
          {t('AboutMe')}
        </Navbar.Link> */
        }
        <Navbar.Link
          as={Link}
          href="/Projects"
          active={usePathname() === '/Projects'}
        >
          {t('Projects')}
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          href="/Resume"
          active={usePathname() === '/Resume'}
        >
          {t('Resume')}
        </Navbar.Link>
        <Navbar.Link as={Link} href="/GuestBook">
          {t('GuestBook')}
        </Navbar.Link>
        {props.localeSwitcher}
      </Navbar.Collapse>
    </Navbar>
  );
}
