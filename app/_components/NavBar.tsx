'use client';

import Link from 'next/link';
import {Navbar} from 'flowbite-react';

export function NavBar() {
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
      </Navbar.Collapse>
    </Navbar>
  );
}
