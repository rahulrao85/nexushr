import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import Card, { CardTitle } from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import Avatar from '../components/ui/Avatar';
import { Select } from '../components/ui/Input';
import './Payroll.css';

export default function Payroll() {
  const { employeesData, getEmployeePayslip } = useApp();
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [showPayslip, setShowPayslip] = useState(false);

  const regionStats = useMemo(() => {
    const regions = ['India', 'US', 'UK'];
    const currencies = { 'India': 'INR', 'US': 'USD', 'UK': 'GBP' };
    
    return regions.map(region => {
      const regionEmps = employeesData.filter(e => e.region === region);
      const totalSalary = regionEmps.reduce((sum, e) => sum + e.salary, 0);
      const avgSalary = regionEmps.length > 0 ? totalSalary / regionEmps.length : 0;
      const monthlyGross = totalSalary / 12;
      
      const payslip = regionEmps.length > 0 ? getEmployeePayslip(regionEmps[0].id) : null;
      const totalDeductions = payslip ? (monthlyGross * payslip.totalDeductions / payslip.gross) : 0;
      
      return {
        region,
        flag: region === 'India' ? '🇮🇳' : region === 'US' ? '🇺🇸' : '🇬🇧',
        employeeCount: regionEmps.length,
        totalSalary,
        avgSalary,
        monthlyGross,
        totalDeductions,
        currency: currencies[region]
      };
    });
  }, [employeesData, getEmployeePayslip]);

  const handleViewPayslip = (emp) => {
    setSelectedEmp(emp);
    setShowPayslip(true);
  };

  const sampleEmployees = {
    'India': employeesData.filter(e => e.region === 'India').slice(0, 3),
    'US': employeesData.filter(e => e.region === 'US').slice(0, 3),
    'UK': employeesData.filter(e => e.region === 'UK').slice(0, 3)
  };

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  };

  return (
    <div className="payroll-page">
      <div className="payroll-header fade-in">
        <h2>Payroll Dashboard</h2>
        <p>Manage payroll runs and view employee payslips</p>
      </div>

      <div className="payroll-stats fade-in stagger-1">
        {regionStats.map(stat => (
          <Card key={stat.region} className="region-card">
            <div className="region-header">
              <span className="region-flag">{stat.flag}</span>
              <span className="region-name">{stat.region}</span>
            </div>
            <div className="region-metrics">
              <div className="metric">
                <span className="metric-value">{stat.employeeCount}</span>
                <span className="metric-label">Employees</span>
              </div>
              <div className="metric">
                <span className="metric-value">{formatCurrency(stat.monthlyGross, stat.currency)}</span>
                <span className="metric-label">Monthly Gross</span>
              </div>
            </div>
            <div className="region-actions">
              <Button size="sm" variant="secondary" onClick={() => setSelectedRegion(stat.region)}>
                Run Payroll
              </Button>
              <Button size="sm" variant="ghost" onClick={() => setSelectedRegion(stat.region)}>
                View Reports
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <div className="payroll-sections fade-in stagger-2">
        <Card>
          <CardTitle>Recent Payslips</CardTitle>
          <div className="payslips-by-region">
            {['India', 'US', 'UK'].map(region => (
              <div key={region} className="region-payslips">
                <h4>{region === 'India' ? '🇮🇳' : region === 'US' ? '🇺🇸' : '🇬🇧'} {region}</h4>
                <div className="payslip-list">
                  {sampleEmployees[region].map(emp => (
                    <div key={emp.id} className="payslip-item" onClick={() => handleViewPayslip(emp)}>
                      <Avatar src={emp.avatar} name={emp.name} size="sm" />
                      <div className="payslip-info">
                        <span className="payslip-name">{emp.name}</span>
                        <span className="payslip-id">{emp.id}</span>
                      </div>
                      <div className="payslip-amount">
                        <span className="payslip-gross">{formatCurrency(emp.salary / 12, emp.currency)}</span>
                        <span className="payslip-label">gross/mo</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Modal
        isOpen={showPayslip}
        onClose={() => setShowPayslip(false)}
        title="Payslip"
        size="md"
        footer={
          <Button variant="secondary" onClick={() => setShowPayslip(false)}>Close</Button>
        }
      >
        {selectedEmp && <PayslipViewer employee={selectedEmp} />}
      </Modal>
    </div>
  );
}

function PayslipViewer({ employee }) {
  const { getEmployeePayslip } = useApp();
  const payslip = getEmployeePayslip(employee.id);

  if (!payslip) return null;

  const formatCurrency = (amount, currency) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);
  };

  return (
    <div className="payslip-viewer">
      <div className="payslip-header">
        <div className="payslip-company">
          <h3>NexusHR</h3>
          <p>Enterprise HR Management</p>
        </div>
        <div className="payslip-period">
          <span>Pay Period</span>
          <strong>May 2026</strong>
        </div>
      </div>

      <div className="payslip-employee">
        <div className="emp-details">
          <Avatar src={employee.avatar} name={employee.name} size="lg" />
          <div>
            <strong>{employee.name}</strong>
            <p>{employee.title}</p>
            <p>{employee.department}</p>
          </div>
        </div>
        <div className="emp-meta">
          <div><span>Employee ID</span><strong>{employee.id}</strong></div>
          <div><span>Region</span><strong>{employee.country} {employee.region}</strong></div>
          <div><span>Pay Date</span><strong>May 31, 2026</strong></div>
        </div>
      </div>

      <div className="payslip-breakdown">
        <div className="breakdown-section">
          <h4>Earnings</h4>
          <div className="breakdown-row">
            <span>Basic Salary</span>
            <span>{formatCurrency(payslip.gross, payslip.currency)}</span>
          </div>
          <div className="breakdown-row total">
            <span>Gross Pay</span>
            <span>{formatCurrency(payslip.gross, payslip.currency)}</span>
          </div>
        </div>

        <div className="breakdown-section deductions">
          <h4>Deductions</h4>
          {payslip.deductions.map((ded, i) => (
            <div key={i} className="breakdown-row">
              <span>{ded.name}</span>
              <span>-{formatCurrency(ded.amount, payslip.currency)}</span>
            </div>
          ))}
          <div className="breakdown-row total">
            <span>Total Deductions</span>
            <span>-{formatCurrency(payslip.totalDeductions, payslip.currency)}</span>
          </div>
        </div>

        <div className="breakdown-section net">
          <div className="breakdown-row">
            <span>Net Pay</span>
            <strong>{formatCurrency(payslip.net, payslip.currency)}</strong>
          </div>
        </div>
      </div>

      <div className="payslip-footer">
        <p>This is a computer-generated document. No signature required.</p>
      </div>
    </div>
  );
}
