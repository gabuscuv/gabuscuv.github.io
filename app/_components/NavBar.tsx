'use client';
import {Link, usePathname, useRouter} from '@/i18n/navigation';
import {
  Dropdown,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from 'flowbite-react';
import {useTranslations} from 'next-intl';
import {ReactNode} from 'react';

export function NavBar(props: {localeSwitcher: ReactNode}) {
  const t = useTranslations('NavBar');
  const router = useRouter();
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Gabriel Bustillo del Cuvillo
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <div className="flex w-full md:w-fit items-center justify-between">
        <NavbarCollapse>
          <NavbarLink as={Link} href="/" active={usePathname() === '/'}>
            Home
          </NavbarLink>
          {
            <NavbarLink as={Link} href="/AboutMe">
              {t('AboutMe')}
            </NavbarLink>
          }
          <NavbarLink
            as={Link}
            href="/Projects"
            active={usePathname() === '/Projects'}
          >
            {t('Projects')}
          </NavbarLink>
          <NavbarLink
            as={Link}
            href="/Resume"
            active={usePathname() === '/Resume'}
          >
            {t('Resume')}
          </NavbarLink>
          <NavbarLink as={Link} href="/Contact">
            {t('Contact')}
          </NavbarLink>
          <Dropdown
            theme={{inlineWrapper: 'px-3 py-2 md:p-0 flex items-center'}}
            arrowIcon={true}
            inline
            label={
              <p className="hover:text-cyan-700 text-gray-700">{t('Others')}</p>
            }
          >
            <DropdownItem
              onClick={() => {
                router.push('/Others/Blog');
              }}
            >
              {t('Blog')}
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                router.push('/Others/Notes');
              }}
            >
              {t('Notes')}
            </DropdownItem>
            <DropdownItem as={Link} href="/GuestBook">
              {t('GuestBook')}
            </DropdownItem>
          </Dropdown>
        </NavbarCollapse>
      </div>
      <div>{props.localeSwitcher}</div>
    </Navbar>
  );
}
