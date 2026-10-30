import type { Metadata } from 'next';
import Vision from '@/components/Vision';

const description =
  'Our vision, mission and core values. Community Resilience Builders Initiative is a not-for-profit, non-political Incorporated Trustee registered in Nigeria.';

export const metadata: Metadata = {
  title: 'About',
  description,
  alternates: { canonical: '/about' },
  openGraph: { title: 'About', description, url: '/about' },
};

export default function About() {
  return (
    <>
      <section>
        <div className="w" style={{ maxWidth: 760 }}>
          <h1 className="pt">Who we are</h1>
          <p style={{ fontSize: 18, color: 'var(--mute)' }}>
            Community Resilience Builders Initiative is a not-for-profit, non-political organisation registered with
            the Corporate Affairs Commission as an Incorporated Trustee in May 2026, based in Nigeria.
          </p>
          <p style={{ fontSize: 18, color: 'var(--mute)' }}>
            We work on lifesaving assistance and long-term resilience together, so that families recover from crisis
            and are less dependent on aid afterwards. Inclusion, accountability and sustainability guide every
            program.
          </p>
        </div>
      </section>
      <Vision />
    </>
  );
}
