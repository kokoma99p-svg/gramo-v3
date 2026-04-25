import { useEffect, useMemo, useState } from 'react';
import { apiGet } from './lib/api.js';
import { applyTheme } from './lib/theme.js';
import {
  defaultSettings,
  fallbackCategories,
  fallbackOffers,
  fallbackIngredients,
  fallbackSizes
} from './lib/fallbackData.js';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import MobileNavigation from './components/MobileNavigation.jsx';
import HeroSection from './components/HeroSection.jsx';
import InfoStrip from './components/InfoStrip.jsx';
import OffersSection from './components/OffersSection.jsx';
import CategoryGrid from './components/CategoryGrid.jsx';
import FeaturedDishCarousel from './components/FeaturedDishCarousel.jsx';
import ConfiguratorPage from './components/ConfiguratorPage.jsx';
import CartPage from './components/CartPage.jsx';
import CheckoutPage from './components/CheckoutPage.jsx';
import ReservationPage from './components/ReservationPage.jsx';
import ConfirmationPage from './components/ConfirmationPage.jsx';
import AdminLogin from './components/AdminLogin.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';

const CART_KEY = 'gramo_cart';

function getInitialRoute() {
  return window.location.pathname || '/';
}

function HomePage({ settings, categories, offers, navigate }) {
  return (
    <main>
      {settings.showHero !== false && <HeroSection settings={settings} navigate={navigate} />}
      {settings.showInfoStrip !== false && <InfoStrip settings={settings} />}
      {settings.showOffers !== false && <OffersSection offers={offers} navigate={navigate} />}
      {settings.showCategories !== false && <CategoryGrid categories={categories} navigate={navigate} />}
      <FeaturedDishCarousel navigate={navigate} />
      {settings.showReservationSection !== false && (
        <section className="section section-cta">
          <div className="soft-panel split-panel">
            <div>
              <p className="eyebrow">Reservations</p>
              <h2>Plan a clean, premium GRAMO table experience.</h2>
              <p>Reserve your table, choose your guest count and keep the experience smooth before you arrive.</p>
            </div>
            <button className="btn btn-primary" onClick={() => navigate('/reservation')}>Reserve now</button>
          </div>
        </section>
      )}
    </main>
  );
}

export default function App() {
  const [route, setRoute] = useState(getInitialRoute());
  const [settings, setSettings] = useState(defaultSettings);
  const [categories, setCategories] = useState(fallbackCategories);
  const [offers, setOffers] = useState(fallbackOffers);
  const [ingredients, setIngredients] = useState(fallbackIngredients);
  const [sizes, setSizes] = useState(fallbackSizes);
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch {
      return [];
    }
  });

  useEffect(() => {
    async function loadPublicData() {
      const [settingsRes, categoriesRes, offersRes, ingredientsRes, sizesRes] = await Promise.all([
        apiGet('/api/public/site-settings', { settings: defaultSettings }),
        apiGet('/api/public/categories', { categories: fallbackCategories }),
        apiGet('/api/public/offers', { offers: fallbackOffers }),
        apiGet('/api/public/ingredients', { ingredients: fallbackIngredients }),
        apiGet('/api/public/sizes', { sizes: fallbackSizes })
      ]);

      const mergedSettings = {
        ...defaultSettings,
        ...(settingsRes.settings || {}),
        theme: {
          ...defaultSettings.theme,
          ...(settingsRes.settings?.theme || {})
        }
      };

      setSettings(mergedSettings);
      setCategories((categoriesRes.categories || fallbackCategories).filter(Boolean));
      setOffers((offersRes.offers || fallbackOffers).filter(Boolean));
      setIngredients((ingredientsRes.ingredients || fallbackIngredients).filter(Boolean));
      setSizes((sizesRes.sizes || fallbackSizes).filter(Boolean));
      applyTheme(mergedSettings);
    }

    loadPublicData();
  }, []);

  useEffect(() => {
    applyTheme(settings);
  }, [settings]);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const onPop = () => setRoute(getInitialRoute());
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  function navigate(path) {
    if (path === route) return;
    window.history.pushState({}, '', path);
    setRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function addToCart(item) {
    setCart((current) => [...current, { ...item, cartId: crypto.randomUUID() }]);
    navigate('/cart');
  }

  function removeFromCart(cartId) {
    setCart((current) => current.filter((item) => item.cartId !== cartId));
  }

  function clearCart() {
    setCart([]);
  }

  const cartCount = useMemo(() => cart.length, [cart]);

  const page = (() => {
    if (route === '/') return <HomePage settings={settings} categories={categories} offers={offers} navigate={navigate} />;
    if (route === '/menu') return <CategoryGrid categories={categories} navigate={navigate} standalone />;
    if (route === '/configurator') {
      return (
        <ConfiguratorPage
          categories={categories}
          ingredients={ingredients}
          sizes={sizes}
          addToCart={addToCart}
          navigate={navigate}
        />
      );
    }
    if (route === '/cart') return <CartPage cart={cart} removeFromCart={removeFromCart} navigate={navigate} />;
    if (route === '/checkout') {
      return <CheckoutPage cart={cart} settings={settings} clearCart={clearCart} navigate={navigate} />;
    }
    if (route === '/reservation') return <ReservationPage settings={settings} navigate={navigate} />;
    if (route === '/confirmation') return <ConfirmationPage navigate={navigate} />;
    if (route === '/admin') return <AdminLogin navigate={navigate} />;
    if (route === '/admin/dashboard') {
      return <AdminDashboard settings={settings} onSettingsSaved={setSettings} navigate={navigate} />;
    }
    return <HomePage settings={settings} categories={categories} offers={offers} navigate={navigate} />;
  })();

  const publicRoute = !route.startsWith('/admin');

  return (
    <div className="app-shell">
      {publicRoute && <Header settings={settings} route={route} navigate={navigate} cartCount={cartCount} />}
      {page}
      {publicRoute && settings.showFooter !== false && <Footer settings={settings} navigate={navigate} />}
      {publicRoute && <MobileNavigation route={route} navigate={navigate} cartCount={cartCount} />}
    </div>
  );
}
