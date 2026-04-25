export default function AdminLayout({ tabs, activeTab, setActiveTab, onLogout, children }) {
  return (
    <main className="admin-shell">
      <aside className="admin-sidebar">
        <img src="/logo.svg" alt="GRAMO" />
        <nav>
          {tabs.map((tab) => (
            <button key={tab.id} className={activeTab === tab.id ? 'active' : ''} onClick={() => setActiveTab(tab.id)}>{tab.label}</button>
          ))}
        </nav>
        <button className="btn btn-ghost" onClick={onLogout}>Logout</button>
      </aside>
      <section className="admin-content">
        {children}
      </section>
    </main>
  );
}
