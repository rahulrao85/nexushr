import { useApp } from '../context/AppContext';
import { useEffect, useState } from 'react';
import Card, { CardTitle, CardContent } from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Button from '../components/ui/Button';
import './EmployeeProfile.css';

export default function EmployeeProfile() {
  const { setActivePage, employeesData, getEmployeePayslip } = useApp();
  const [emp, setEmp] = useState(null);
  const [payslip, setPayslip] = useState(null);

  useEffect(() => {
    if (window.selectedEmployee) {
      setEmp(window.selectedEmployee);
      const payslipData = getEmployeePayslip(window.selectedEmployee.id);
      setPayslip(payslipData);
    }
  }, [getEmployeePayslip]);

  if (!emp) {
    return (
      <div className="profile-loading">
        <div className="skeleton" style={{ width: 120, height: 120, borderRadius: '50%' }} />
      </div>
    );
  }

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  };

  return (
    <div className="profile-page fade-in">
      <Button variant="ghost" onClick={() => setActivePage('employees')}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Directory
      </Button>

      <div className="profile-header">
        <Card className="profile-hero">
          <div className="profile-hero-main">
            <Avatar src={emp.avatar} name={emp.name} size="2xl" />
            <div className="profile-hero-info">
              <h1>{emp.name}</h1>
              <p className="profile-title">{emp.title}</p>
              <p className="profile-dept">{emp.department}</p>
              <div className="profile-meta">
                <span className={`badge ${emp.status === 'Active' ? 'success' : emp.status === 'On Leave' ? 'warning' : 'danger'}`}>
                  {emp.status}
                </span>
                <span>{emp.country} {emp.location}</span>
              </div>
            </div>
          </div>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-value">{emp.currency} {emp.salary.toLocaleString()}</span>
              <span className="stat-label">Annual Salary</span>
            </div>
            <div className="profile-stat">
              <span className="stat-value">{emp.hireDate}</span>
              <span className="stat-label">Hire Date</span>
            </div>
            <div className="profile-stat">
              <span className="stat-value">{emp.id}</span>
              <span className="stat-label">Employee ID</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="profile-grid">
        <Card className="profile-card">
          <CardTitle>Personal Information</CardTitle>
          <CardContent>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Full Name</span>
                <span className="info-value">{emp.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{emp.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone</span>
                <span className="info-value">{emp.phone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date of Birth</span>
                <span className="info-value">{emp.dob}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Region</span>
                <span className="info-value">{emp.region}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">{emp.location}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="profile-card">
          <CardTitle>Job Information</CardTitle>
          <CardContent>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Department</span>
                <span className="info-value">{emp.department}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Job Title</span>
                <span className="info-value">{emp.title}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Manager</span>
                <span className="info-value">{emp.manager?.name || 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Region</span>
                <span className="info-value">{emp.country} {emp.region}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Employee ID</span>
                <span className="info-value">{emp.id}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Hire Date</span>
                <span className="info-value">{emp.hireDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {payslip && (
          <Card className="profile-card payslip-preview">
            <CardTitle>Latest Payslip</CardTitle>
            <CardContent>
              <div className="payslip-summary">
                <div className="payslip-row gross">
                  <span>Gross Pay</span>
                  <span>{formatCurrency(payslip.gross, payslip.currency)}</span>
                </div>
                <div className="payslip-deductions">
                  {payslip.deductions.map((d, i) => (
                    <div key={i} className="payslip-row deduction">
                      <span>{d.name}</span>
                      <span>-{formatCurrency(d.amount, payslip.currency)}</span>
                    </div>
                  ))}
                </div>
                <div className="payslip-row net">
                  <span>Net Pay</span>
                  <span>{formatCurrency(payslip.net, payslip.currency)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
