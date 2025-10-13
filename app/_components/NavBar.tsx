'use client';
import {Link, usePathname, useRouter} from '@/i18n/navigation';
import {navbarsites, navbarsubSectionSites} from '@/src/sitemap';
import {
  Dropdown,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from 'flowbite-react';
import {ReactNode} from 'react';

export function NavBar(props: {
  localeSwitcher: ReactNode;
  siteMap: Array<navbarsites | navbarsubSectionSites>;
}) {
  const router = useRouter();
  const pathname = usePathname();

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
          {props.siteMap.map(e =>
            e.type === 'site' ? (
              <NavbarLink
                key={e.title}
                as={Link}
                href={e.url}
                active={pathname === e.url}
              >
                {e.title}
              </NavbarLink>
            ) : (
              <Dropdown
                key={e.title}
                theme={{inlineWrapper: 'px-3 py-2 md:p-0 flex items-center'}}
                arrowIcon={true}
                inline
                label={
                  <p className="hover:text-cyan-700 text-gray-700">{e.title}</p>
                }
              >
                {e.subsection.map(z => (
                  <DropdownItem
                    key={e.title + z.title}
                    onClick={() => {
                      router.push(z.url);
                    }}
                  >
                    {z.title}
                  </DropdownItem>
                ))}
              </Dropdown>
            ),
          )}
        </NavbarCollapse>
      </div>
      <div>{props.localeSwitcher}</div>
    </Navbar>
  );
}
