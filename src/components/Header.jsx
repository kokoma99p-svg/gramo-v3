import BrandLogo from './BrandLogo.jsx';

export default function Header({ settings, route, navigate, cartCount }) {
  const links = [
    ['/', 'Home'],
    ['/menu', 'Menu'],
    ['/configurator', 'Customize'],
    ['/reservation', 'Reserve']
  ];

  return (
    <header className="site-header">
      <button className="logo-button" onClick={() => navigate('/')} aria-label="Go to home">
        <BrandLogo settings={settings} />
      </button>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {links.map(([path, label]) => (
          <button key={path} className={route === path ? 'active' : ''} onClick={() => navigate(path)}>{label}</button>
        ))}
      </nav>
      <div className="header-actions">
        <button className="btn btn-ghost" onClick={() => navigate('/admin')}>Admin</button>
        <button className="cart-pill" onClick={() => navigate('/cart')} aria-label="Open cart">
          Cart <span>{cartCount}</span>
        </button>
      </div>
    </header>
  );
}
