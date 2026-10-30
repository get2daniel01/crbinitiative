import Link from 'next/link';
import { SITE } from '@/lib/site';

export default function Footer() {
  return (
    <footer>
      <div className="w">
        <div className="fg">
          <div>
            <h3>{SITE.name}</h3>
            <p>
              A not-for-profit, non-political organisation registered with the Corporate Affairs Commission of
              Nigeria as an Incorporated Trustee.
            </p>
            <p>
              <b>Charity ID (CAC number): {SITE.charityId}</b> · Registered 19 May 2026
            </p>
          </div>
          <div>
            <h3>Contact</h3>
            <p>
              {SITE.address[0]}
              <br />
              {SITE.address[1]}
            </p>
            <p>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
            <p>crbinitiative.org</p>
          </div>
          <div>
            <h3>Pages</h3>
            <p><Link href="/about">About</Link></p>
            <p><Link href="/programs">Programs</Link></p>
            <p><Link href="/transparency">Transparency</Link></p>
            <p><Link href="/privacy">Privacy notice</Link></p>
            <p><Link href="/admin/login">Staff login</Link></p>
          </div>
        </div>
        <p style={{ marginTop: 24 }}>© 2026 {SITE.name}. Strengthening communities together.</p>
      </div>
    </footer>
  );
}
