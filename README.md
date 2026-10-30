# CRBI website (Next.js)

Community Resilience Builders Initiative website, rebuilt with Next.js (App Router, TypeScript).
Same design and content as the original static site.

## Run locally
```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
```

## Deploy on Vercel
1. Push this folder to a GitHub repository (the folder's contents must be at the repo root).
2. On vercel.com choose Add New, then Project, import the repo and click Deploy. Vercel detects Next.js automatically.

## Where things are
- `app/page.tsx` and `app/<page>/page.tsx` : the pages (Home, About, Programs, Impact, Get involved, Transparency, Contact, Privacy)
- `app/layout.tsx` : shared layout, SEO metadata and structured data
- `app/globals.css` : the original stylesheet
- `components/` : Header, Footer and the shared Vision section
- `lib/site.ts` : organisation name, email, charity ID and navigation links
- `app/sitemap.ts`, `app/robots.ts` : generated sitemap.xml and robots.txt
- `next.config.mjs` : redirects from old URLs such as /about.html to /about

## Impact stories (Supabase) and admin

Admins sign in at `/admin/login`, post stories (title, date, picture, full story) and choose which 6 stories show on `/impact`. Each story has its own page at `/impact/<slug>` (the "Read more" link).

### One-time setup
1. Create a project at supabase.com.
2. SQL Editor: paste the contents of `supabase/schema.sql` and run it. This creates the `stories` table, the `story-images` picture bucket and the security rules.
3. Authentication > Users > Add user: create your admin email and password. Then Authentication > Sign In / Providers > Email: turn **off** "Allow new users to sign up".
4. Make that user an admin (SQL Editor):
   `insert into public.admins (user_id) select id from auth.users where email = 'you@example.org';`
5. Copy `.env.example` to `.env.local` and fill in the two values from Project Settings > API. On Vercel, add the same two variables under Settings > Environment Variables, then redeploy.
6. `npm install` then `npm run dev`, and open `/admin/login`.

### Files
- `supabase/schema.sql` : table, security rules, picture bucket, 6-story limit
- `app/admin/` : login, story list, new and edit pages, and `actions.ts` (save, feature, delete)
- `app/impact/page.tsx` : Impact page with the selected stories
- `app/impact/[slug]/page.tsx` : full story page
- `components/StoryForm.tsx`, `StoryCard.tsx` : admin form and story card
- `lib/supabase/`, `lib/stories.ts`, `lib/admin.ts`, `proxy.ts` : Supabase clients, helpers and session refresh
