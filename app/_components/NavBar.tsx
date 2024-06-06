'use client';
import {Link, redirect, usePathname, useRouter} from './navigation';
import {Navbar} from 'flowbite-react';
import { ReactNode } from 'react';

export const locales = ['en', 'es'] as const;
export const localePrefix = 'always'; // Default

  export function NavBar(props: {localeSwitcher: ReactNode}) {
  return (
    <Navbar fluid rounded>
      <Navbar.Brand as={Link} href="/">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Gabriel Bustillo del Cuvillo
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link as={Link} href="/">
          Home
        </Navbar.Link>
        <Navbar.Link as={Link} href="/">
          About Me
        </Navbar.Link>
        <Navbar.Link as={Link} href="/Projects">
          (Game(Tools)) Projects
        </Navbar.Link>
        <Navbar.Link as={Link} href="/Resume">
          Resume
        </Navbar.Link>
        <Navbar.Link as={Link} href="/References">
          References
        </Navbar.Link>
        {props.localeSwitcher}
      </Navbar.Collapse>
    </Navbar>
  );
}
