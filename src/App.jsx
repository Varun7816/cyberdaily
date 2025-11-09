


const navLinks = [
  { label: 'Home', href: '#' },
  { label: 'Cyber Crime News', href: '#' },
  { label: 'Vulnerabilities', href: '#' },
  { label: 'Zero Days', href: '#' },
  { label: 'Jobs', href: '#' },
  { label: 'Events', href: '#' },
  { label: 'Learning', href: '#' },
];





function App() {
  return (
    <>
      {/* Header with CyberDaily left and Subscribe button right */}
      <header className="header" style={{ padding: '12px 0' }}>
        <div className="container inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span className="brand">CD</span>
              <span style={{ fontWeight: 800, fontSize: 32 }}>CyberDaily</span>
            </div>
          </div>
          <button className="btn" style={{ background: 'var(--color-secondary, #14b8a6)', color: '#fff', fontWeight: 700, textTransform: 'none', boxShadow: 'none', padding: '8px 20px', border: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
            Subscribe / Get Latest News
          </button>
        </div>
      </header>
      {/* Navigation Bar below header */}
      <nav className="header-nav" style={{ background: 'var(--color-bg)', padding: '4px 0' }}>
        <div className="container" style={{ display: 'flex', columnGap: 48, padding: '4px 0', justifyContent: 'flex-start' }}>
          {navLinks.map(link => (
            <a key={link.label} href={link.href} style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 600, fontSize: 16, padding: '8px 0' }}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
      {/* Main content with sidebar */}
      <main>
        <div className="container" style={{ display: 'flex', gap: 32, marginTop: 32, minHeight: '60vh' }}>
          {/* Main content placeholder */}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: 16 }}>Welcome to CyberDaily</h1>
            <p style={{ color: 'var(--color-muted)', fontSize: '1.1rem' }}>
              Your trusted source for cybersecurity news and updates.
            </p>
          </div>
          {/* Sidebar */}
          <aside className="sidebar" style={{ width: 320, flexShrink: 0 }}>
            <div className="widget">
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-primary)', marginBottom: 8 }}>About CyberDaily</div>
              <div style={{ color: 'var(--color-muted)', fontSize: 15 }}>
                #1 Trusted Cybersecurity News Platform. Get the latest updates on cyber crime, vulnerabilities, zero days, jobs, and more.
              </div>
            </div>
            <div className="widget">
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-primary)', marginBottom: 8 }}>Connect</div>
              <div style={{ display: 'flex', gap: 16 }}>
                <a href="#" style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>Twitter</a>
                <a href="#" style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>LinkedIn</a>
                <a href="#" style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>Facebook</a>
              </div>
            </div>
          </aside>
        </div>
      </main>
      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-muted)', textAlign: 'center', fontSize: 14, padding: '24px 0', marginTop: 32 }}>
        © {new Date().getFullYear()} CyberDaily. All rights reserved.
      </footer>
    </>
  );
}

export default App;
