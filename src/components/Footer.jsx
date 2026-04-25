import BrandLogo from './BrandLogo.jsx';

export default function Footer({ settings, navigate }) {
  return (
    <footer className="site-footer">
      <div>
        <BrandLogo settings={settings} dark />
        <p>{settings.footerText}</p>
      </div>
      <div className="footer-links">
        <button onClick={() => navigate('/menu')}>Menu</button>
        <button onClick={() => navigate('/configurator')}>Customize</button>
        <button onClick={() => navigate('/reservation')}>Reservation</button>
        <a href={`tel:${settings.phone}`}>{settings.phone}</a>
      </div>
    </footer>
  );
}
