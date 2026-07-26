import { useApp } from '../context/AppContext';
import Card, { CardTitle } from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import './Dashboard.css';

export default function Dashboard() {
  const { currentUser, getHeadcount, getDepartments, pendingActions, setActivePage, completeAction, employeesData } = useApp();
  const headcount = getHeadcount();
  const departments = getDepartments();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);
  };

  const totalSalary = employeesData => {
    return employeesData.reduce((sum, e) => sum + e.salary, 0);
  };

  const statusColors = {
    pending: 'warning',
    completed: 'success',
    overdue: 'danger'
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header fade-in">
        <div>
          <h2>Welcome back, {currentUser?.name?.split(' ')[0]}</h2>
          <p>Here's what's happening with your workforce today.</p>
        </div>
      </div>

      <div className="stats-grid fade-in stagger-1">
        <Card className="stat-card">
          <div className="stat-icon stat-icon-primary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{headcount.total}</span>
            <span className="stat-label">Total Employees</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon stat-icon-success">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
            </svg>
          </div>
          <div className="stat-content">
            <div className="stat-regions">
              <span><span className="region-label">🇮🇳</span> {headcount.india}</span>
              <span><span className="region-label">🇺🇸</span> {headcount.us}</span>
              <span><span className="region-label">🇬🇧</span> {headcount.uk}</span>
            </div>
            <span className="stat-label">By Region</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon stat-icon-info">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{Object.keys(departments).length}</span>
            <span className="stat-label">Departments</span>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-icon stat-icon-warning">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          </div>
          <div className="stat-content">
            <span className="stat-value">{pendingActions.length}</span>
            <span className="stat-label">Pending Actions</span>
          </div>
        </Card>
      </div>

      <div className="dashboard-grid">
        <Card className="pending-card fade-in stagger-2">
          <CardTitle>Pending Actions</CardTitle>
          <div className="pending-list">
            {pendingActions.length === 0 ? (
              <div className="empty-state">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <p>All caught up! No pending actions.</p>
              </div>
            ) : (
              pendingActions.map(action => (
                <div key={action.id} className="pending-item">
                  <div className="pending-info">
                    <span className={`badge ${statusColors[action.status]}`}>
                      {action.type.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className="pending-title">{action.title}</span>
                    <span className="pending-date">Due: {action.dueDate}</span>
                  </div>
                  <Button size="sm" variant="ghost" onClick={() => completeAction(action.id)}>
                    Complete
                  </Button>
                </div>
              ))
            )}
          </div>
        </Card>

        <Card className="dept-card fade-in stagger-3">
          <CardTitle>Department Distribution</CardTitle>
          <div className="dept-list">
            {Object.entries(departments).sort((a, b) => b[1] - a[1]).map(([dept, count]) => (
              <div key={dept} className="dept-item">
                <div className="dept-info">
                  <span className="dept-name">{dept}</span>
                  <span className="dept-count">{count} employees</span>
                </div>
                <div className="dept-bar">
                  <div 
                    className="dept-fill" 
                    style={{ width: `${(count / headcount.total) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="quick-actions fade-in stagger-4">
          <CardTitle>Quick Actions</CardTitle>
          <div className="actions-list">
            <button className="action-btn" onClick={() => setActivePage('hire')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/>
                <path d="M20 8v6M23 11h-6"/>
              </svg>
              Hire New Employee
            </button>
            <button className="action-btn" onClick={() => setActivePage('changejob')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Change Job
            </button>
            <button className="action-btn" onClick={() => setActivePage('payroll')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/>
              </svg>
              Run Payroll
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
