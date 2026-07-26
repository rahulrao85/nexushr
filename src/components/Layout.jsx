import { useApp } from '../context/AppContext';
import Avatar from '../components/ui/Avatar';
import './Layout.css';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { id: 'employees', label: 'Employees', icon: 'users' },
  { id: 'payroll', label: 'Payroll', icon: 'dollar' },
  { id: 'hire', label: 'Hire', icon: 'user-plus' },
  { id: 'changejob', label: 'Change Job', icon: 'edit' },
  { id: 'terminate', label: 'Terminate', icon: 'user-minus' }
];

const icons = {
  grid: <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>,
  users: <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>,
  dollar: <><path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/></>,
  'user-plus': <><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M20 8v6M23 11h-6"/></>,
  edit: <><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></>,
  'user-minus': <><path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="8.5" cy="7" r="4"/><path d="M23 11H13M9 23v-6"/></>
};

export default function Layout({ children }) {
  const { currentUser, activePage, setActivePage, logout } = useApp();

  const handleNavClick = (id) => {
    if (['hire', 'changejob', 'terminate'].includes(id)) {
      setActivePage(id);
    } else {
      setActivePage(id);
    }
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="url(#logo-grad)"/>
              <path d="M14 24h20M24 14v20M18 18l12 12M30 18l-12 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <defs>
                <linearGradient id="logo-grad" x1="0" y1="0" x2="48" y2="48">
                  <stop stopColor="#6366f1"/>
                  <stop offset="1" stopColor="#8b5cf6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="sidebar-brand">NexusHR</span>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activePage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {icons[item.icon]}
              </svg>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="logout-btn" onClick={logout}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/>
            </svg>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="main-content">
        <header className="header">
          <div className="header-title">
            <h1>{menuItems.find(m => m.id === activePage)?.label || 'Dashboard'}</h1>
          </div>
          <div className="header-user">
            <Avatar name={currentUser?.name} size="sm" />
            <div className="user-info">
              <span className="user-name">{currentUser?.name}</span>
              <span className="user-role">{currentUser?.role}</span>
            </div>
          </div>
        </header>

        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
}
