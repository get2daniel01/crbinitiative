import Link from 'next/link';
import Vision from '@/components/Vision';

export default function Home() {
  return (
    <>
      <div className="hero">
        <div className="w">
          <div>
            <h1>Strengthening communities together.</h1>
            <div className="b">
              <Link className="btn" href="/get-involved">Partner or donate</Link>
              <Link className="btn o" href="/programs">See our programs</Link>
            </div>
          </div>
          <div id="about">
            <h2>Who we are</h2>
            <p>
              Community Resilience Builders Initiative is a not-for-profit, non-political organisation registered
              with the Corporate Affairs Commission as an Incorporated Trustee in May 2026, based in Nigeria.
            </p>
            <p>
              We work on lifesaving assistance and long-term resilience together, so that families recover from
              crisis and are less dependent on aid afterwards. Inclusion, accountability and sustainability guide
              every program.
            </p>
          </div>
        </div>
        <svg className="ribbon" viewBox="0 0 1200 90" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M0 70 C200 10 330 90 560 45 S900 5 1200 40"
            fill="none"
            stroke="var(--coral)"
            strokeWidth={10}
            strokeLinecap="round"
          />
        </svg>
      </div>

      <Vision />

      <section>
        <div className="w">
          <h2>Registered and accountable</h2>
          <p className="lead">We are a legally registered nonprofit and publish how we are governed.</p>
          <div className="grid3">
            <div>
              <h3>Registered</h3>
              <p>Incorporated Trustee, Charity ID (CAC number): 9559274, registered 19 May 2026.</p>
            </div>
            <div>
              <h3>Governed</h3>
              <p>A Board of Trustees sets policy, approves budgets and oversees our accounts.</p>
            </div>
            <div>
              <h3>Audited</h3>
              <p>Our constitution requires independent annual audits, presented at our general meeting.</p>
            </div>
          </div>
          <p style={{ marginTop: 28 }}>
            <Link className="btn o" href="/transparency">See our registration and governance details</Link>
          </p>
        </div>
      </section>

      <section className="cta alt">
        <div className="w">
          <h2>Work with us</h2>
          <p className="lead">Fund a program, partner with us, or offer your skills.</p>
          <Link className="btn" href="/get-involved">Get involved</Link>{' '}
          <Link className="btn o" href="/programs">See our programs</Link>
        </div>
      </section>
    </>
  );
}
