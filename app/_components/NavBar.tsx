'use client';
import {Link, usePathname, useRouter} from './navigation';
import {Dropdown, Navbar} from 'flowbite-react';
import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';
export const locales = ['en', 'es'] as const;
export const localePrefix = 'always'; // Default

export function NavBar(props: {localeSwitcher: ReactNode}) {
  const t = useTranslations('NavBar');
  const router = useRouter();
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Gabriel Bustillo del Cuvillo
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="flex w-full items-center justify-between">
        <Navbar.Link as={Link} href="/" active={usePathname() === '/'}>
          Home
        </Navbar.Link>
        {
          <Navbar.Link as={Link} href="/AboutMe">
            {t('AboutMe')}
          </Navbar.Link>
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
        <Navbar.Link as={Link} href="/Contact">
          {t('Contact')}
        </Navbar.Link>
        <Dropdown
          theme={{inlineWrapper: 'px-3 py-1 md:p-0 flex items-center'}}
          arrowIcon={true}
          inline
          label={
            <p className="hover:text-cyan-700 text-gray-700">{t('Others')}</p>
          }
        >
          <Dropdown.Item
            onClick={() => {
              router.push('/Others/Blog');
            }}
          >
            {t('Blog')}
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => {
              router.push('/Others/Notes');
            }}
          >
            {t('Notes')}
          </Dropdown.Item>
          <Navbar.Link as={Link} href="/GuestBook">
            {t('GuestBook')}
          </Navbar.Link>
        </Dropdown>
        <Navbar.Toggle />
      </Navbar.Collapse>
      {props.localeSwitcher}
    </Navbar>
  );
}
