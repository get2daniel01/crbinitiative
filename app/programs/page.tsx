import type { Metadata } from 'next';

const description =
  'Twelve areas of work: education, health and nutrition, food security, livelihoods, protection, climate change, WASH, shelter, peacebuilding and more.';

export const metadata: Metadata = {
  title: 'Programs',
  description,
  alternates: { canonical: '/programs' },
  openGraph: { title: 'Programs', description, url: '/programs' },
};

const PROGRAMS = [
  ['Education', 'Quality learning and digital literacy for children and youth.'],
  ['Health and Nutrition', 'Health services and nutrition support for vulnerable families.'],
  ['Food Security', 'Support that helps households feed themselves through crises.'],
  ['Livelihood', 'Skills, inputs and income opportunities that build self-reliance.'],
  ['Protection (CP and GBV)', 'Child protection, and prevention of and response to gender-based violence.'],
  ['Climate Change', 'Climate adaptation and environmental protection in every intervention.'],
  ['Systems Strengthening', 'Stronger local governance, institutions and public services.'],
  ['Shelter', 'Safe, dignified shelter for displaced and affected families.'],
  ['Advocacy', 'Speaking up for the rights and needs of the communities we serve.'],
  ['Democracy and Civic Engagement', 'Helping citizens take part in decisions that affect their lives.'],
  ['WASH', 'Safe water, sanitation and hygiene for homes, schools and clinics.'],
  ['Peace and Conflict', 'Peacebuilding and conflict resolution within and between communities.'],
];

export default function Programs() {
  return (
    <section>
      <div className="w">
        <h1 className="pt">What we do</h1>
        <p className="lead">Twelve areas where we work with communities.</p>
        <div className="cards">
          {PROGRAMS.map(([title, text]) => (
            <div className="card" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
