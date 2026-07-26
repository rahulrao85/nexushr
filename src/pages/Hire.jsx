import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input, { Select } from '../components/ui/Input';
import Stepper from '../components/ui/Stepper';
import './BusinessProcess.css';

const steps = [
  { id: 'personal', name: 'Personal Details' },
  { id: 'job', name: 'Job Assignment' },
  { id: 'compensation', name: 'Compensation' },
  { id: 'review', name: 'Review & Submit' }
];

export default function Hire() {
  const { addEmployee, setActivePage, employeesData } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', dob: '', address: '',
    department: '', title: '', region: 'India', location: '', manager: '',
    salary: '', currency: 'INR', payFrequency: 'monthly',
    submitted: false
  });

  const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations', 'Legal', 'Customer Success'];
  const titles = {
    'Engineering': ['Software Engineer', 'Senior Software Engineer', 'Staff Engineer', 'Engineering Manager', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'QA Engineer'],
    'Product': ['Product Manager', 'Senior Product Manager', 'Product Analyst', 'Associate Product Manager'],
    'Design': ['UX Designer', 'UI Designer', 'Senior UX Designer', 'Design Lead', 'UX Researcher'],
    'Marketing': ['Marketing Manager', 'Content Strategist', 'SEO Specialist', 'Growth Manager', 'Brand Manager'],
    'Sales': ['Sales Representative', 'Account Executive', 'Sales Manager', 'Business Development Rep'],
    'Finance': ['Financial Analyst', 'Senior Accountant', 'Finance Manager', 'Accounts Payable Specialist'],
    'HR': ['HR Manager', 'Recruiter', 'HR Business Partner', 'HR Coordinator'],
    'Operations': ['Operations Manager', 'Operations Analyst', 'Project Manager', 'Office Manager'],
    'Legal': ['Legal Counsel', 'Paralegal', 'Compliance Manager'],
    'Customer Success': ['Customer Success Manager', 'Support Specialist', 'Account Manager']
  };
  const locations = {
    'India': ['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Pune', 'Chennai'],
    'US': ['New York', 'San Francisco', 'Austin', 'Seattle', 'Chicago', 'Boston'],
    'UK': ['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow']
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value, ...(field === 'department' ? { title: '' } : {}), ...(field === 'region' ? { location: '', currency: field === 'India' ? 'INR' : field === 'US' ? 'USD' : 'GBP' } : {}) }));
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const emp = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      dob: formData.dob,
      department: formData.department,
      title: formData.title,
      region: formData.region,
      location: formData.location,
      currency: formData.currency,
      salary: parseInt(formData.salary),
      status: 'Probation',
      hireDate: new Date().toISOString().split('T')[0],
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.firstName}${formData.lastName}`
    };
    addEmployee(emp);
    setFormData(prev => ({ ...prev, submitted: true }));
  };

  if (formData.submitted) {
    return (
      <div className="bp-success fade-in">
        <Card className="success-card">
          <div className="success-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <path d="M22 4L12 14.01l-3-3"/>
            </svg>
          </div>
          <h2>Employee Hired Successfully!</h2>
          <p>{formData.firstName} {formData.lastName} has been added to the system as {formData.title} in {formData.department}.</p>
          <div className="success-actions">
            <Button onClick={() => { setFormData({ firstName: '', lastName: '', email: '', phone: '', dob: '', address: '', department: '', title: '', region: 'India', location: '', manager: '', salary: '', currency: 'INR', payFrequency: 'monthly', submitted: false }); setCurrentStep(0); }}>Hire Another</Button>
            <Button variant="secondary" onClick={() => setActivePage('employees')}>View Employees</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="bp-page fade-in">
      <Card className="bp-card">
        <Stepper steps={steps} currentStep={currentStep} />

        <div className="bp-content">
          {currentStep === 0 && (
            <div className="bp-step fade-in">
              <h3>Personal Details</h3>
              <p className="step-desc">Enter the new employee's personal information</p>
              <div className="form-grid">
                <Input label="First Name" value={formData.firstName} onChange={e => updateField('firstName', e.target.value)} required />
                <Input label="Last Name" value={formData.lastName} onChange={e => updateField('lastName', e.target.value)} required />
                <Input label="Email" type="email" value={formData.email} onChange={e => updateField('email', e.target.value)} required />
                <Input label="Phone" value={formData.phone} onChange={e => updateField('phone', e.target.value)} required />
                <Input label="Date of Birth" type="date" value={formData.dob} onChange={e => updateField('dob', e.target.value)} required />
                <Input label="Address" value={formData.address} onChange={e => updateField('address', e.target.value)} />
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="bp-step fade-in">
              <h3>Job Assignment</h3>
              <p className="step-desc">Assign department, title, and location</p>
              <div className="form-grid">
                <Select label="Department" value={formData.department} onChange={e => updateField('department', e.target.value)} options={departments.map(d => ({ value: d, label: d }))} required />
                <Select label="Job Title" value={formData.title} onChange={e => updateField('title', e.target.value)} options={(titles[formData.department] || []).map(t => ({ value: t, label: t }))} required />
                <Select label="Region" value={formData.region} onChange={e => updateField('region', e.target.value)} options={[{ value: 'India', label: '🇮🇳 India' }, { value: 'US', label: '🇺🇸 United States' }, { value: 'UK', label: '🇬🇧 United Kingdom' }]} required />
                <Select label="Location" value={formData.location} onChange={e => updateField('location', e.target.value)} options={(locations[formData.region] || []).map(l => ({ value: l, label: l }))} required />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bp-step fade-in">
              <h3>Compensation</h3>
              <p className="step-desc">Set salary and benefits</p>
              <div className="form-grid">
                <Input label="Annual Salary" type="number" value={formData.salary} onChange={e => updateField('salary', e.target.value)} required />
                <Select label="Currency" value={formData.currency} onChange={e => updateField('currency', e.target.value)} options={[{ value: 'INR', label: 'INR - Indian Rupee' }, { value: 'USD', label: 'USD - US Dollar' }, { value: 'GBP', label: 'GBP - British Pound' }]} required />
                <Select label="Pay Frequency" value={formData.payFrequency} onChange={e => updateField('payFrequency', e.target.value)} options={[{ value: 'monthly', label: 'Monthly' }, { value: 'biweekly', label: 'Bi-weekly' }, { value: 'weekly', label: 'Weekly' }]} />
              </div>
              <div className="salary-preview">
                <span>Monthly Pay:</span>
                <strong>{formData.currency} {formData.salary ? (parseInt(formData.salary) / 12).toLocaleString() : '0'}</strong>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bp-step fade-in">
              <h3>Review & Submit</h3>
              <p className="step-desc">Review all details before hiring</p>
              <div className="review-sections">
                <div className="review-section">
                  <h4>Personal Information</h4>
                  <div className="review-grid">
                    <div><span>Name:</span> {formData.firstName} {formData.lastName}</div>
                    <div><span>Email:</span> {formData.email}</div>
                    <div><span>Phone:</span> {formData.phone}</div>
                    <div><span>DOB:</span> {formData.dob}</div>
                  </div>
                </div>
                <div className="review-section">
                  <h4>Job Assignment</h4>
                  <div className="review-grid">
                    <div><span>Department:</span> {formData.department}</div>
                    <div><span>Title:</span> {formData.title}</div>
                    <div><span>Region:</span> {formData.region}</div>
                    <div><span>Location:</span> {formData.location}</div>
                  </div>
                </div>
                <div className="review-section">
                  <h4>Compensation</h4>
                  <div className="review-grid">
                    <div><span>Annual Salary:</span> {formData.currency} {parseInt(formData.salary || 0).toLocaleString()}</div>
                    <div><span>Monthly:</span> {formData.currency} {formData.salary ? (parseInt(formData.salary) / 12).toLocaleString() : '0'}</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bp-footer">
          <Button variant="ghost" onClick={handleBack} disabled={currentStep === 0}>Back</Button>
          <div className="bp-footer-right">
            {currentStep < 3 ? (
              <Button onClick={handleNext}>Continue</Button>
            ) : (
              <Button onClick={handleSubmit}>Submit Hire</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
