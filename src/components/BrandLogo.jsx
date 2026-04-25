export default function BrandLogo({ settings, dark = false }) {
  const logoUrl = settings.logoUrl;

  return (
    <div className={`brand-logo ${dark ? 'brand-logo-dark' : ''}`}>
      {logoUrl ? <img src={logoUrl} alt={`${settings.restaurantName || 'GRAMO'} logo`} /> : <span className="brand-mark">G</span>}
      <div className="brand-copy">
        <strong>{settings.logoText || settings.restaurantName || 'GRAMO'}</strong>
        <small>{settings.slogan || 'Personalize every gram'}</small>
      </div>
    </div>
  );
}
