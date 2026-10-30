import type { Metadata } from 'next';

const description =
  'Contact Community Resilience Builders Initiative: 156 Bishop Street, Jimeta-Yola, Adamawa State, Nigeria. info@crbinitiative.org.';

export const metadata: Metadata = {
  title: 'Contact',
  description,
  alternates: { canonical: '/contact' },
  openGraph: { title: 'Contact', description, url: '/contact' },
};

export default function Contact() {
  return (
    <section>
      <div className="w two">
        <div>
          <h1 className="pt">Contact us</h1>
          <p>We would like to hear from communities, partners, donors and volunteers.</p>
          <p>
            <b>Address</b>
            <br />
            156 Bishop Street, Jimeta-Yola,
            <br />
            Adamawa State, Nigeria
          </p>
          <p>
            <b>Email</b>
            <br />
            <a href="mailto:info@crbinitiative.org">info@crbinitiative.org</a>
          </p>
          <p>
            <b>Registration</b>
            <br />
            Incorporated Trustee, Charity ID (CAC number): 9559274
          </p>
          <p style={{ marginTop: 22 }}>
            <a className="btn" href="mailto:info@crbinitiative.org">Send us an email</a>
          </p>
        </div>
        <div className="note" style={{ margin: 0, alignSelf: 'start' }}>
          <b>Concerns and complaints</b>
          <br />
          If you want to raise a concern about our work or conduct, write to the same address. Reports are handled
          confidentially.
        </div>
      </div>
    </section>
  );
}
