import type { Metadata } from 'next';

const description = 'Privacy notice of Community Resilience Builders Initiative.';

export const metadata: Metadata = {
  title: 'Privacy notice',
  description,
  alternates: { canonical: '/privacy' },
  openGraph: { title: 'Privacy notice', description, url: '/privacy' },
};

export default function Privacy() {
  return (
    <section>
      <div className="w prose">
        <h1 className="pt">Privacy notice</h1>
        <p>
          Community Resilience Builders Initiative with Charity ID (CAC number) 9559274 respects your privacy and
          handles personal data in line with the Nigeria Data Protection Act 2023.
        </p>
        <h2>What we collect</h2>
        <p>
          This website has no accounts or forms and does not track you with advertising cookies. We only receive
          personal data that you send us, such as your name and email address when you write to
          info@crbinitiative.org.
        </p>
        <h2>How we use it</h2>
        <p>
          We use it only to reply to you and to run our programs and partnerships. We do not sell or share it,
          except where the law requires.
        </p>
        <h2>Your rights</h2>
        <p>
          You may ask to see, correct or delete the data we hold about you by emailing info@crbinitiative.org.
        </p>
      </div>
    </section>
  );
}
