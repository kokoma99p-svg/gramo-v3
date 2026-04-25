export default function HeroSection({ settings, navigate }) {
  return (
    <section className="hero-wrap">
      <div className="announcement-bar">{settings.announcementText}</div>
      <div className="hero-card">
        <div className="hero-content">
          <p className="eyebrow">{settings.slogan}</p>
          <h1>{settings.heroTitle}</h1>
          <p>{settings.heroSubtitle}</p>
          <div className="hero-actions">
            <button className="btn btn-primary" disabled={settings.orderingEnabled === false} onClick={() => navigate('/configurator')}>
              {settings.orderCtaText || 'Order Now'}
            </button>
            <button className="btn btn-light" disabled={settings.reservationsEnabled === false} onClick={() => navigate('/reservation')}>
              {settings.reservationCtaText || 'Reserve a Table'}
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <img src={settings.heroImageUrl} alt="Fresh GRAMO healthy food" loading="eager" />
          <div className="hero-floating-card">
            <strong>Live grams</strong>
            <span>Price + calories update instantly</span>
          </div>
        </div>
      </div>
    </section>
  );
}
