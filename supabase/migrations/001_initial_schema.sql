-- GRAMO Supabase schema for the Vercel React starter.
-- Run this in Supabase SQL Editor before deploying production APIs.

create extension if not exists pgcrypto;

create table if not exists public.site_settings (
  id text primary key default 'global',
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text default '',
  image_url text,
  is_enabled boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.offers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  promo_code text,
  discount_type text not null default 'percent' check (discount_type in ('percent', 'fixed')),
  discount_value numeric not null default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  image_url text,
  is_enabled boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ingredients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null default 'topping' check (type in ('base', 'protein', 'topping', 'sauce', 'supplement')),
  category_slug text not null references public.categories(slug) on update cascade on delete cascade,
  price_per_gram numeric not null default 0,
  calories_per_gram numeric not null default 0,
  default_grams numeric not null default 0,
  min_grams numeric not null default 0,
  max_grams numeric not null default 250,
  image_url text,
  is_available boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sizes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category_slug text not null references public.categories(slug) on update cascade on delete cascade,
  grams numeric not null default 0,
  base_price numeric not null default 0,
  is_enabled boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  customer_email text,
  order_type text not null default 'pickup',
  address text,
  items jsonb not null default '[]'::jsonb,
  subtotal numeric not null default 0,
  delivery_fee numeric not null default 0,
  total_price numeric not null default 0,
  total_calories numeric not null default 0,
  notes text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.reservations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  reservation_date date not null,
  reservation_time text not null,
  guests integer not null,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Optional storage bucket for uploaded/public images. The admin UI in this zip supports URL editing.
-- You can upload to this bucket manually or extend the admin with Supabase Storage upload.
insert into storage.buckets (id, name, public)
values ('gramo-images', 'gramo-images', true)
on conflict (id) do nothing;

alter table public.site_settings enable row level security;
alter table public.categories enable row level security;
alter table public.offers enable row level security;
alter table public.ingredients enable row level security;
alter table public.sizes enable row level security;
alter table public.orders enable row level security;
alter table public.reservations enable row level security;

-- No public table policies are required because the frontend uses Vercel API routes.
-- The server uses SUPABASE_SERVICE_ROLE_KEY, which must stay server-only.

insert into public.site_settings (id, settings)
values (
  'global',
  '{
    "restaurantName": "GRAMO",
    "logoText": "GRAMO",
    "logoUrl": "/logo.svg",
    "slogan": "Personalize every gram",
    "announcementText": "Fresh bowls, clean ingredients, custom grams.",
    "heroTitle": "Healthy meals made exactly by your grams.",
    "heroSubtitle": "Build a salad, sandwich, dessert, juice or smoothie with live price and calorie calculation.",
    "orderCtaText": "Order Now",
    "reservationCtaText": "Reserve a Table",
    "footerText": "GRAMO - premium healthy food ordering and reservations.",
    "heroImageUrl": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
    "showHero": true,
    "showOffers": true,
    "showCategories": true,
    "showInfoStrip": true,
    "showReservationSection": true,
    "showFooter": true,
    "orderingEnabled": true,
    "deliveryEnabled": true,
    "pickupEnabled": true,
    "deliveryFee": 15,
    "minOrder": 40,
    "prepTimeText": "20-30 min",
    "serviceAreaText": "Casablanca selected areas",
    "reservationsEnabled": true,
    "minGuests": 1,
    "maxGuests": 12,
    "reservationSlots": ["12:00", "13:00", "14:00", "19:00", "20:00", "21:00"],
    "address": "Casablanca, Morocco",
    "phone": "+212 600 000 000",
    "email": "hello@gramo.ma",
    "whatsapp": "+212600000000",
    "openingHours": "Mon-Sun 11:00-22:30",
    "theme": {
      "primaryColor": "#2F7D77",
      "secondaryColor": "#006D77",
      "accentColor": "#2DD4BF",
      "buttonColor": "#2F7D77",
      "selectedColor": "#0D9488",
      "announcementColor": "#ECFEFF",
      "backgroundColor": "#F6F5F2",
      "cardColor": "#FFFFFF",
      "textColor": "#0F172A",
      "mutedTextColor": "#475569"
    }
  }'::jsonb
)
on conflict (id) do update set settings = excluded.settings, updated_at = now();

insert into public.categories (name, slug, description, image_url, display_order) values
('Salad', 'salad', 'Crisp bowls with fresh toppings and sauces.', 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80', 1),
('Sandwich', 'sandwich', 'Balanced sandwiches customized by gram.', 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=900&q=80', 2),
('Dessert', 'dessert', 'Light desserts, controlled calories, real flavor.', 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80', 3),
('Juice / Smoothie', 'juice', 'Fresh drinks with natural ingredients.', 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80', 4)
on conflict (slug) do nothing;

insert into public.offers (title, description, promo_code, discount_type, discount_value, image_url, display_order) values
('Fresh Start Bowl', 'Save on your first custom salad bowl this week.', 'FRESH15', 'percent', 15, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80', 1),
('Smoothie Pair', 'Order two smoothies and get a clean combo price.', 'PAIR20', 'fixed', 20, 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=900&q=80', 2)
on conflict do nothing;

insert into public.sizes (name, category_slug, grams, base_price, display_order) values
('Light', 'salad', 350, 30, 1),
('Regular', 'salad', 500, 42, 2),
('Generous', 'salad', 700, 56, 3),
('Regular', 'sandwich', 320, 35, 1),
('Regular', 'dessert', 220, 28, 1),
('Regular', 'juice', 330, 25, 1)
on conflict do nothing;

insert into public.ingredients (name, type, category_slug, price_per_gram, calories_per_gram, default_grams, min_grams, max_grams, image_url, display_order) values
('Quinoa', 'base', 'salad', 0.06, 1.2, 100, 0, 200, 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=500&q=80', 1),
('Mixed Greens', 'base', 'salad', 0.03, 0.25, 80, 0, 180, 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80', 2),
('Grilled Chicken', 'protein', 'salad', 0.15, 1.65, 90, 0, 180, 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=500&q=80', 3),
('Avocado', 'topping', 'salad', 0.12, 1.6, 50, 0, 120, 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80', 4),
('Tahini Lemon Sauce', 'sauce', 'salad', 0.08, 1.8, 25, 0, 60, 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=500&q=80', 5),
('Whole Grain Bread', 'base', 'sandwich', 0.04, 2.4, 120, 80, 170, 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80', 1),
('Turkey Breast', 'protein', 'sandwich', 0.14, 1.4, 90, 0, 180, 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80', 2),
('Greek Yogurt', 'base', 'dessert', 0.07, 0.95, 130, 80, 220, 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80', 1),
('Berries', 'topping', 'dessert', 0.11, 0.57, 60, 0, 140, 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=500&q=80', 2),
('Banana', 'base', 'juice', 0.04, 0.89, 110, 0, 180, 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=500&q=80', 1),
('Spinach', 'topping', 'juice', 0.03, 0.23, 40, 0, 100, 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80', 2)
on conflict do nothing;
