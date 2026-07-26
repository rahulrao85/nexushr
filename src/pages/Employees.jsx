import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Avatar from '../components/ui/Avatar';
import Input, { Select } from '../components/ui/Input';
import './Employees.css';

const statusMap = {
  'Active': 'success',
  'On Leave': 'warning',
  'Terminated': 'danger',
  'Probation': 'info'
};

const statusBadge = (status) => {
  return <span className={`badge ${statusMap[status] || 'neutral'}`}>{status}</span>;
};

export default function Employees() {
  const { employeesData, setActivePage } = useApp();
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const departments = [...new Set(employeesData.map(e => e.department))].sort();

  const filteredEmployees = useMemo(() => {
    return employeesData.filter(emp => {
      const matchesSearch = !search || 
        emp.name.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.id.toLowerCase().includes(search.toLowerCase());
      const matchesDept = !deptFilter || emp.department === deptFilter;
      const matchesRegion = !regionFilter || emp.region === regionFilter;
      const matchesStatus = !statusFilter || emp.status === statusFilter;
      return matchesSearch && matchesDept && matchesRegion && matchesStatus;
    });
  }, [employeesData, search, deptFilter, regionFilter, statusFilter]);

  const handleEmployeeClick = (emp) => {
    setActivePage('employee');
    window.selectedEmployee = emp;
  };

  return (
    <div className="employees-page">
      <div className="employees-header fade-in">
        <h2>Employee Directory</h2>
        <p>{filteredEmployees.length} of {employeesData.length} employees</p>
      </div>

      <Card className="filters-card fade-in stagger-1">
        <div className="filters">
          <Input
            placeholder="Search by name, email, or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>}
          />
          <Select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            options={departments.map(d => ({ value: d, label: d }))}
            placeholder="All Departments"
          />
          <Select
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
            options={[
              { value: 'India', label: '🇮🇳 India' },
              { value: 'US', label: '🇺🇸 United States' },
              { value: 'UK', label: '🇬🇧 United Kingdom' }
            ]}
            placeholder="All Regions"
          />
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: 'Active', label: 'Active' },
              { value: 'On Leave', label: 'On Leave' },
              { value: 'Probation', label: 'Probation' },
              { value: 'Terminated', label: 'Terminated' }
            ]}
            placeholder="All Status"
          />
        </div>
      </Card>

      <div className="employees-grid fade-in stagger-2">
        {filteredEmployees.map(emp => (
          <Card 
            key={emp.id} 
            hover 
            className="employee-card"
            onClick={() => handleEmployeeClick(emp)}
          >
            <div className="employee-card-header">
              <Avatar src={emp.avatar} name={emp.name} size="lg" status={emp.status === 'Active' ? 'active' : emp.status === 'On Leave' ? 'leave' : 'terminated'} />
              <div className="employee-main">
                <h3 className="employee-name">{emp.name}</h3>
                <p className="employee-title">{emp.title}</p>
              </div>
              {statusBadge(emp.status)}
            </div>
            <div className="employee-card-body">
              <div className="employee-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>{emp.department}</span>
              </div>
              <div className="employee-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
                </svg>
                <span>{emp.country} {emp.location}</span>
              </div>
              <div className="employee-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
                <span>{emp.email}</span>
              </div>
              <div className="employee-detail">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 1v22M17 5H9.5a3.5 3.5 0 100 7h5a3.5 3.5 0 110 7H6"/>
                </svg>
                <span>{emp.currency} {emp.salary.toLocaleString()}/yr</span>
              </div>
            </div>
            <div className="employee-card-footer">
              <span className="employee-id">{emp.id}</span>
              <span className="employee-hire-date">Since {emp.hireDate}</span>
            </div>
          </Card>
        ))}
      </div>

      {filteredEmployees.length === 0 && (
        <Card className="no-results">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="M21 21l-4.35-4.35"/>
          </svg>
          <p>No employees found matching your criteria.</p>
          <button onClick={() => { setSearch(''); setDeptFilter(''); setRegionFilter(''); setStatusFilter(''); }}>
            Clear Filters
          </button>
        </Card>
      )}
    </div>
  );
}
