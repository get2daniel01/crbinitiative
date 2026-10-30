/** @type {import('next').NextConfig} */
const pages = ['about', 'programs', 'impact', 'get-involved', 'transparency', 'contact', 'privacy'];

// Story pictures are served from your Supabase project's public storage.
let supabaseHost = '**.supabase.co';
try {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL) supabaseHost = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname;
} catch {}

const nextConfig = {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: supabaseHost, pathname: '/storage/v1/object/public/**' }],
  },
  // Old static URLs (about.html, index.html, ...) keep working and point to the new clean URLs.
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      ...pages.map((p) => ({ source: `/${p}.html`, destination: `/${p}`, permanent: true })),
    ];
  },
};

export default nextConfig;
