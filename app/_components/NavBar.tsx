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
      <Navbar.Collapse>
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
        <Dropdown arrowIcon={true} inline label={<Navbar.Link>{t('Others')}</Navbar.Link>}>
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
