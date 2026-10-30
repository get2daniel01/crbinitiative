import type { Metadata } from 'next';
import Link from 'next/link';

const description = 'Partner with, donate to or volunteer with Community Resilience Builders Initiative.';

export const metadata: Metadata = {
  title: 'Get involved',
  description,
  alternates: { canonical: '/get-involved' },
  openGraph: { title: 'Get involved', description, url: '/get-involved' },
};

const WAYS = [
  {
    title: 'Give',
    text: 'Support emergency response, livelihoods and protection. Write to us for our donation details and how funds are used.',
    cta: 'Ask about giving',
    subject: 'Donation%20enquiry',
  },
  {
    title: 'Partner',
    text: 'Donors, NGOs, government agencies and companies: let us plan and deliver a program together.',
    cta: 'Discuss a partnership',
    subject: 'Partnership%20enquiry',
  },
  {
    title: 'Volunteer',
    text: 'Share professional or community skills with our teams in Adamawa State.',
    cta: 'Offer your skills',
    subject: 'Volunteer%20enquiry',
  },
];

export default function GetInvolved() {
  return (
    <section>
      <div className="w">
        <h1 className="pt">Get involved</h1>
        <p className="lead">There are three ways to work with us.</p>
        <div className="grid3">
          {WAYS.map((w) => (
            <div key={w.title}>
              <h3>{w.title}</h3>
              <p>{w.text}</p>
              <p style={{ marginTop: 14 }}>
                <a className="btn" href={`mailto:info@crbinitiative.org?subject=${w.subject}`}>{w.cta}</a>
              </p>
            </div>
          ))}
        </div>
        <div className="note">
          Your money and property are used only to promote our objectives. No part of our income may be paid to
          members except as reasonable pay for services. See <Link href="/transparency">how we are governed</Link>.
        </div>
      </div>
    </section>
  );
}
