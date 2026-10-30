'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV } from '@/lib/site';

export default function Header() {
  const pathname = usePathname();
  return (
    <header>
      <div className="w">
        <Link className="brand" href="/">
          <Image src="/logo.png" width={349} height={360} alt="Community Resilience Builders Initiative logo" priority />
          Community Resilience<br />Builders Initiative
        </Link>
        <nav aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname === n.href ? 'page' : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
