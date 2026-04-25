export const defaultSettings = {
  restaurantName: 'GRAMO',
  logoText: 'GRAMO',
  logoUrl: '/logo.svg',
  slogan: 'Personalize every gram',
  announcementText: 'Fresh bowls, clean ingredients, custom grams.',
  heroTitle: 'Healthy meals made exactly by your grams.',
  heroSubtitle: 'Build a salad, sandwich, dessert, juice or smoothie with live price and calorie calculation.',
  orderCtaText: 'Order Now',
  reservationCtaText: 'Reserve a Table',
  footerText: 'GRAMO - premium healthy food ordering and reservations.',
  heroImageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80',
  showHero: true,
  showOffers: true,
  showCategories: true,
  showInfoStrip: true,
  showReservationSection: true,
  showFooter: true,
  orderingEnabled: true,
  deliveryEnabled: true,
  pickupEnabled: true,
  deliveryFee: 15,
  minOrder: 40,
  prepTimeText: '20-30 min',
  serviceAreaText: 'Casablanca selected areas',
  reservationsEnabled: true,
  minGuests: 1,
  maxGuests: 12,
  reservationSlots: ['12:00', '13:00', '14:00', '19:00', '20:00', '21:00'],
  address: 'Casablanca, Morocco',
  phone: '+212 600 000 000',
  email: 'hello@gramo.ma',
  whatsapp: '+212600000000',
  openingHours: 'Mon-Sun 11:00-22:30',
  socialInstagram: '',
  theme: {
    primaryColor: '#2F7D77',
    secondaryColor: '#006D77',
    accentColor: '#2DD4BF',
    buttonColor: '#2F7D77',
    selectedColor: '#0D9488',
    announcementColor: '#ECFEFF',
    backgroundColor: '#F6F5F2',
    cardColor: '#FFFFFF',
    textColor: '#0F172A',
    mutedTextColor: '#475569'
  }
};

export const fallbackCategories = [
  {
    id: 'salad',
    slug: 'salad',
    name: 'Salad',
    description: 'Crisp bowls with fresh toppings and sauces.',
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    is_enabled: true,
    display_order: 1
  },
  {
    id: 'sandwich',
    slug: 'sandwich',
    name: 'Sandwich',
    description: 'Balanced sandwiches customized by gram.',
    image_url: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=900&q=80',
    is_enabled: true,
    display_order: 2
  },
  {
    id: 'dessert',
    slug: 'dessert',
    name: 'Dessert',
    description: 'Light desserts, controlled calories, real flavor.',
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80',
    is_enabled: true,
    display_order: 3
  },
  {
    id: 'juice',
    slug: 'juice',
    name: 'Juice / Smoothie',
    description: 'Fresh drinks with natural ingredients.',
    image_url: 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80',
    is_enabled: true,
    display_order: 4
  }
];

export const fallbackOffers = [
  {
    id: 'offer-1',
    title: 'Fresh Start Bowl',
    description: 'Save on your first custom salad bowl this week.',
    promo_code: 'FRESH15',
    discount_type: 'percent',
    discount_value: 15,
    image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=900&q=80',
    is_enabled: true,
    display_order: 1
  },
  {
    id: 'offer-2',
    title: 'Smoothie Pair',
    description: 'Order two smoothies and get a clean combo price.',
    promo_code: 'PAIR20',
    discount_type: 'fixed',
    discount_value: 20,
    image_url: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625?auto=format&fit=crop&w=900&q=80',
    is_enabled: true,
    display_order: 2
  }
];

export const fallbackSizes = [
  { id: 'salad-small', name: 'Light', category_slug: 'salad', grams: 350, base_price: 30, is_enabled: true, display_order: 1 },
  { id: 'salad-regular', name: 'Regular', category_slug: 'salad', grams: 500, base_price: 42, is_enabled: true, display_order: 2 },
  { id: 'salad-large', name: 'Generous', category_slug: 'salad', grams: 700, base_price: 56, is_enabled: true, display_order: 3 },
  { id: 'sandwich-regular', name: 'Regular', category_slug: 'sandwich', grams: 320, base_price: 35, is_enabled: true, display_order: 1 },
  { id: 'dessert-regular', name: 'Regular', category_slug: 'dessert', grams: 220, base_price: 28, is_enabled: true, display_order: 1 },
  { id: 'juice-regular', name: 'Regular', category_slug: 'juice', grams: 330, base_price: 25, is_enabled: true, display_order: 1 }
];

export const fallbackIngredients = [
  { id: 'quinoa', name: 'Quinoa', type: 'base', category_slug: 'salad', price_per_gram: 0.06, calories_per_gram: 1.2, default_grams: 100, min_grams: 0, max_grams: 200, is_available: true, display_order: 1, image_url: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=500&q=80' },
  { id: 'greens', name: 'Mixed Greens', type: 'base', category_slug: 'salad', price_per_gram: 0.03, calories_per_gram: 0.25, default_grams: 80, min_grams: 0, max_grams: 180, is_available: true, display_order: 2, image_url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=500&q=80' },
  { id: 'chicken', name: 'Grilled Chicken', type: 'protein', category_slug: 'salad', price_per_gram: 0.15, calories_per_gram: 1.65, default_grams: 90, min_grams: 0, max_grams: 180, is_available: true, display_order: 3, image_url: 'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=500&q=80' },
  { id: 'avocado', name: 'Avocado', type: 'topping', category_slug: 'salad', price_per_gram: 0.12, calories_per_gram: 1.6, default_grams: 50, min_grams: 0, max_grams: 120, is_available: true, display_order: 4, image_url: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=500&q=80' },
  { id: 'tahini', name: 'Tahini Lemon Sauce', type: 'sauce', category_slug: 'salad', price_per_gram: 0.08, calories_per_gram: 1.8, default_grams: 25, min_grams: 0, max_grams: 60, is_available: true, display_order: 5, image_url: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=500&q=80' },
  { id: 'bread', name: 'Whole Grain Bread', type: 'base', category_slug: 'sandwich', price_per_gram: 0.04, calories_per_gram: 2.4, default_grams: 120, min_grams: 80, max_grams: 170, is_available: true, display_order: 1, image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80' },
  { id: 'turkey', name: 'Turkey Breast', type: 'protein', category_slug: 'sandwich', price_per_gram: 0.14, calories_per_gram: 1.4, default_grams: 90, min_grams: 0, max_grams: 180, is_available: true, display_order: 2, image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=500&q=80' },
  { id: 'yogurt', name: 'Greek Yogurt', type: 'base', category_slug: 'dessert', price_per_gram: 0.07, calories_per_gram: 0.95, default_grams: 130, min_grams: 80, max_grams: 220, is_available: true, display_order: 1, image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=500&q=80' },
  { id: 'berries', name: 'Berries', type: 'topping', category_slug: 'dessert', price_per_gram: 0.11, calories_per_gram: 0.57, default_grams: 60, min_grams: 0, max_grams: 140, is_available: true, display_order: 2, image_url: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=500&q=80' },
  { id: 'banana', name: 'Banana', type: 'base', category_slug: 'juice', price_per_gram: 0.04, calories_per_gram: 0.89, default_grams: 110, min_grams: 0, max_grams: 180, is_available: true, display_order: 1, image_url: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=500&q=80' },
  { id: 'spinach', name: 'Spinach', type: 'topping', category_slug: 'juice', price_per_gram: 0.03, calories_per_gram: 0.23, default_grams: 40, min_grams: 0, max_grams: 100, is_available: true, display_order: 2, image_url: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80' }
];

export const featuredDishes = [
  {
    id: 'featured-1',
    title: 'Lean Green Bowl',
    subtitle: 'Quinoa, greens, grilled chicken and lemon tahini.',
    price: 58,
    calories: 520,
    image_url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'featured-2',
    title: 'Avocado Turkey Sandwich',
    subtitle: 'Whole grain bread with balanced toppings.',
    price: 49,
    calories: 610,
    image_url: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?auto=format&fit=crop&w=900&q=80'
  },
  {
    id: 'featured-3',
    title: 'Berry Yogurt Cup',
    subtitle: 'Fresh berries, yogurt and precise grams.',
    price: 34,
    calories: 290,
    image_url: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=900&q=80'
  }
];
