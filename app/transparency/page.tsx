import type { Metadata } from 'next';

const description =
  'Registration details, governance, financial accountability and safeguarding commitments of Community Resilience Builders Initiative, Charity ID (CAC number): 9559274.';

export const metadata: Metadata = {
  title: 'Transparency',
  description,
  alternates: { canonical: '/transparency' },
  openGraph: { title: 'Transparency', description, url: '/transparency' },
};

const FACTS = [
  ['Legal name', 'Community Resilience Builders Initiative'],
  ['Organisation type', 'Incorporated Trustee (not-for-profit, non-political)'],
  ['Registered with', 'Corporate Affairs Commission (CAC), Nigeria'],
  ['Charity ID (CAC number)', '9559274'],
  ['Date of registration', '19 May 2026'],
  ['Status', 'Active'],
  ['Registered address', '156 Bishop Street, Jimeta-Yola, Adamawa State, Nigeria'],
  ['Official email and website', 'info@crbinitiative.org · crbinitiative.org'],
];

const GOVERNANCE = [
  [
    'Board of Trustees',
    'Our governing body is the Board of Trustees, including a Chairman, Secretary and Treasurer. It sets policy, approves budgets and ensures our aims are achieved.',
  ],
  [
    'Meetings',
    'We hold an annual general meeting, quarterly general meetings and monthly executive meetings. Minutes are recorded and signed.',
  ],
  [
    'Financial control',
    'The Treasurer keeps proper books of account, overseen by the Board. Our bank account is in the organisation’s name and any two of three signatories must sign.',
  ],
  [
    'Annual audit',
    'Independent, qualified auditors are appointed to audit our accounts every year. The audited report is presented at the annual general meeting and filed with the CAC.',
  ],
  [
    'Use of funds',
    'Income and property are applied solely to our objectives. Nothing may be paid to members as dividend, bonus or profit, and on dissolution assets pass to a similar charitable body.',
  ],
];

export default function Transparency() {
  return (
    <section>
      <div className="w">
        <h1 className="pt">Transparency and accountability</h1>
        <p className="lead">Our registration details, how we are governed and how we protect people.</p>

        <h2 style={{ fontSize: 28, margin: '30px 0 12px' }}>Registration details</h2>
        <dl className="facts">
          {FACTS.map(([dt, dd]) => (
            <div key={dt}>
              <dt>{dt}</dt>
              <dd>{dd}</dd>
            </div>
          ))}
        </dl>

        <h2 style={{ fontSize: 28, margin: '40px 0 12px' }}>Governance and finances</h2>
        <div className="rows">
          {GOVERNANCE.map(([title, text]) => (
            <div className="row" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 28, margin: '40px 0 12px' }}>
          Safeguarding and protection from sexual exploitation and abuse (PSEA)
        </h2>
        <p style={{ color: 'var(--mute)', maxWidth: 760 }}>
          We do not tolerate sexual exploitation, abuse, harassment or any harm to children, women, men or
          vulnerable people by anyone working for or with us. Trustees, staff, volunteers and partners are expected
          to follow our code of conduct and our safeguarding and PSEA policies.
        </p>
        <p style={{ color: 'var(--mute)', maxWidth: 760 }}>
          Anyone can report a concern, confidentially, to{' '}
          <a href="mailto:info@crbinitiative.org">info@crbinitiative.org</a>. We take every report seriously and
          protect the person who raises it. Our safeguarding and PSEA policies are available on request at the same
          address.
        </p>
      </div>
    </section>
  );
}
