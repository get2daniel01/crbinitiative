import type { Metadata } from 'next';
import LoginForm from './LoginForm';

export const metadata: Metadata = { title: 'Admin sign in', robots: { index: false, follow: false } };

const messages: Record<string, string> = {
  'not-admin': 'This account is not an admin. Ask the site owner to add you.',
  config: 'The site is not connected to Supabase yet. Add the Supabase keys to the environment variables.',
};

export default async function AdminLogin({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  return (
    <section>
      <div className="w">
        <h1 className="pt">Admin sign in</h1>
        <p style={{ color: 'var(--mute)', marginBottom: 24 }}>Sign in to post and manage impact stories.</p>
        {error && messages[error] && <p className="adm-error" role="alert">{messages[error]}</p>}
        <LoginForm />
      </div>
    </section>
  );
}
