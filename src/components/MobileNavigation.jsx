export default function MobileNavigation({ route, navigate, cartCount }) {
  const items = [
    ['/', 'Home'],
    ['/menu', 'Menu'],
    ['/configurator', 'Build'],
    ['/cart', `Cart ${cartCount}`]
  ];

  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      {items.map(([path, label]) => (
        <button key={path} className={route === path ? 'active' : ''} onClick={() => navigate(path)}>
          <span className="nav-dot" />
          {label}
        </button>
      ))}
    </nav>
  );
}
