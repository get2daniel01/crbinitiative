import type { Metadata } from 'next';
import Link from 'next/link';
import { requireAdmin } from '@/lib/admin';
import { logout } from '../actions';

export const metadata: Metadata = { title: 'Admin', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireAdmin();
  return (
    <>
      <div className="adm-bar">
        <div className="w">
          <nav aria-label="Admin">
            <Link href="/admin">Stories</Link>
            <Link href="/admin/new">New story</Link>
            <Link href="/impact">View Impact page</Link>
          </nav>
          <form action={logout}>
            <span>{user.email}</span>
            <button type="submit" className="adm-link">
              Sign out
            </button>
          </form>
        </div>
      </div>
      {children}
    </>
  );
}
