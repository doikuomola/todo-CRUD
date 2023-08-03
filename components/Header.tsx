'use client';

import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'FAQ',
    href: '/faq',
  },
  {
    label: 'Posts',
    href: '/posts',
  },
  {
    label: 'Crud',
    href: '/crud',
  },
];
export default function Header() {
  const pathname = usePathname();
  return (
    <header className="flex items-center h-20  md:h-40 px-4 md:px-40">
      <ul className="flex items-center gap-10">
        {navItems.map((link, i) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`${
                pathname === link.href ? 'text-blue-500 font-bold' : ''
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}
