# GRAMO Siteweb - Vercel React Starter

This zip is a deploy-ready React + JSX project for the GRAMO restaurant web app. It keeps the requested stack and structure:

- React + JSX frontend with Vite
- Supabase database through server-side Vercel API routes
- Resend email notifications for orders and reservations
- Vercel-compatible `/api` routes
- Private admin dashboard at `/admin` and `/admin/dashboard`
- Public home, menu, configurator, cart, checkout and reservation flow
- Admin image URL management with preview and remove/replace actions
- Admin color settings applied to public website through CSS variables
- Realistic food image URL strategy instead of emoji-style public visuals
- Gram-based configurator with live price and calories only

## Important security rule

Never expose `SUPABASE_SERVICE_ROLE_KEY` in frontend code. Do not prefix it with `VITE_`.

The browser only uses:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

The Vercel serverless API routes use:

```env
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
ADMIN_JWT_SECRET=
ADMIN_PASSWORD_HASH=
```

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

```txt
http://localhost:5173
```

## Supabase setup

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Run:

```txt
supabase/migrations/001_initial_schema.sql
```

The migration creates:

- `site_settings`
- `categories`
- `offers`
- `ingredients`
- `sizes`
- `orders`
- `reservations`
- optional public storage bucket `gramo-images`

## Admin password hash

Generate a secure hash:

```bash
npm run hash-admin-password -- your_strong_password
```

Copy the output into Vercel as:

```env
ADMIN_PASSWORD_HASH=the_hash_output
```

Also set:

```env
ADMIN_JWT_SECRET=a_long_random_secret
```

## Vercel environment variables

Add these in Vercel Project Settings > Environment Variables:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
RESEND_API_KEY=your_resend_key
ADMIN_JWT_SECRET=your_long_random_secret
ADMIN_PASSWORD_HASH=your_sha256_hash
FROM_EMAIL=GRAMO <orders@yourdomain.com>
ADMIN_EMAIL=admin@yourdomain.com
APP_BASE_URL=https://your-vercel-project.vercel.app
```

## Deploy to Vercel

```bash
npm install
npm run build
npm install -g vercel
vercel login
vercel link
vercel --prod
```

Vercel settings:

```txt
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

## Admin usage

Open:

```txt
/admin
```

After login, use:

- Site settings: logo, hero text, hero image, colors, visibility, business info, ordering, reservation slots
- Offers: create/edit/delete offers with image URLs
- Categories: create/edit/delete category cards with image URLs
- Ingredients: manage gram prices, calories and ingredient images
- Sizes: manage category-specific sizes and base prices
- Orders: view and update order status
- Reservations: view and update reservation status

## Image handling

This zip supports image management using image URLs in admin forms. Each image field has:

- URL input
- preview box
- remove image button
- automatic use on public website after save

For production uploads, upload images to Supabase Storage bucket `gramo-images`, copy the public URL, and paste it in the admin image URL field.

## Color system

The public website reads `site_settings.settings.theme` and applies values as CSS variables:

```css
--color-primary
--color-secondary
--color-accent
--color-button
--color-selected
--color-announcement
--color-bg
--color-card
--color-text
--color-muted
```

Changing colors in admin saves to Supabase and immediately applies the new theme in the public UI.

## Logo handling

Default logo file:

```txt
public/logo.svg
```

Admin can override it with `logoUrl`. If no logo URL is present, the UI falls back to a clean GRAMO wordmark/brand mark.

## API routes

Public:

```txt
GET  /api/health
GET  /api/public/site-settings
GET  /api/public/offers
GET  /api/public/categories
GET  /api/public/ingredients
GET  /api/public/sizes
POST /api/orders
POST /api/reservations
```

Admin:

```txt
POST /api/admin/login
GET  /api/admin/verify
GET/PUT /api/admin/site-settings
GET/POST/PUT/DELETE /api/admin/offers
GET/POST/PUT/DELETE /api/admin/categories
GET/POST/PUT/DELETE /api/admin/ingredients
GET/POST/PUT/DELETE /api/admin/sizes
GET/PUT /api/admin/orders
GET/PUT /api/admin/reservations
```

## Notes

This is a full Vercel-ready starter implementation. If you already have an existing GRAMO repository, merge these files carefully instead of replacing working business logic blindly.
