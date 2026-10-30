import type { Metadata, Viewport } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SITE, DEFAULT_DESCRIPTION } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.name, template: `%s | ${SITE.name}` },
  description: DEFAULT_DESCRIPTION,
  alternates: { canonical: '/' },
  icons: { icon: '/logo.png' },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: SITE.name,
    description: DEFAULT_DESCRIPTION,
    images: ['/logo.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'NGO',
  name: SITE.name,
  url: SITE.url,
  logo: `${SITE.url}/logo.png`,
  email: SITE.email,
  slogan: SITE.slogan,
  foundingDate: '2026-05-19',
  identifier: `Charity ID (CAC number): ${SITE.charityId}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '156 Bishop Street',
    addressLocality: 'Jimeta-Yola',
    addressRegion: 'Adamawa State',
    addressCountry: 'NG',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;700;800&family=Public+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <div className="topbar">
          <div className="w">
            Registered nonprofit: Incorporated Trustee, Corporate Affairs Commission Nigeria,{' '}
            <b>Charity ID (CAC number): {SITE.charityId}</b>
          </div>
        </div>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
