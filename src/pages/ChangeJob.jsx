import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input, { Select } from '../components/ui/Input';
import Stepper from '../components/ui/Stepper';
import './BusinessProcess.css';

const steps = [
  { id: 'select', name: 'Select Employee' },
  { id: 'changes', name: 'Job Changes' },
  { id: 'compensation', name: 'Compensation Review' },
  { id: 'review', name: 'Review & Submit' }
];

export default function ChangeJob() {
  const { employeesData, updateEmployee, setActivePage } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    employeeId: '', newTitle: '', newDepartment: '', newManager: '', effectiveDate: '',
    salaryChange: 'increase', salaryPercent: '', newSalary: '', submitted: false
  });
  const [selectedEmp, setSelectedEmp] = useState(null);

  const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations', 'Legal', 'Customer Success'];
  const titles = {
    'Engineering': ['Software Engineer', 'Senior Software Engineer', 'Staff Engineer', 'Engineering Manager', 'Principal Engineer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer'],
    'Product': ['Product Manager', 'Senior Product Manager', 'Director of Product', 'Product Analyst'],
    'Design': ['UX Designer', 'UI Designer', 'Senior UX Designer', 'Design Lead'],
    'Marketing': ['Marketing Manager', 'Content Strategist', 'Growth Manager', 'Brand Manager'],
    'Sales': ['Sales Representative', 'Account Executive', 'Sales Manager', 'Sales Director'],
    'Finance': ['Financial Analyst', 'Senior Accountant', 'Finance Manager', 'Controller'],
    'HR': ['HR Manager', 'Recruiter', 'HR Business Partner', 'Talent Acquisition Lead'],
    'Operations': ['Operations Manager', 'Operations Analyst', 'Project Manager', 'Office Manager'],
    'Legal': ['Legal Counsel', 'Paralegal', 'Compliance Manager'],
    'Customer Success': ['Customer Success Manager', 'Support Specialist', 'Account Manager']
  };

  const activeEmployees = employeesData.filter(e => e.status === 'Active');

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleEmployeeSelect = (emp) => {
    setSelectedEmp(emp);
    setFormData(prev => ({ ...prev, employeeId: emp.id, newDepartment: emp.department, newTitle: emp.title }));
  };

  const calculateNewSalary = () => {
    if (!selectedEmp || !formData.salaryPercent) return 0;
    const percent = parseInt(formData.salaryPercent) / 100;
    return formData.salaryChange === 'increase' 
      ? selectedEmp.salary * (1 + percent)
      : selectedEmp.salary * (1 - percent);
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const changes = {};
    if (formData.newTitle) changes.title = formData.newTitle;
    if (formData.newSalary) changes.salary = Math.round(parseInt(formData.newSalary));
    if (formData.effectiveDate) changes.jobEffectiveDate = formData.effectiveDate;
    updateEmployee(formData.employeeId, changes);
    setFormData(prev => ({ ...prev, submitted: true }));
  };

  if (formData.submitted) {
    return (
      <div className="bp-success fade-in">
        <Card className="success-card">
          <div className="success-icon success">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <path d="M22 4L12 14.01l-3-3"/>
            </svg>
          </div>
          <h2>Job Change Completed!</h2>
          <p>{selectedEmp?.name}'s record has been updated.</p>
          <div className="success-actions">
            <Button onClick={() => { setFormData({ employeeId: '', newTitle: '', newDepartment: '', newManager: '', effectiveDate: '', salaryChange: 'increase', salaryPercent: '', newSalary: '', submitted: false }); setCurrentStep(0); setSelectedEmp(null); }}>Process Another</Button>
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
              <h3>Select Employee</h3>
              <p className="step-desc">Choose the employee whose job record needs to change</p>
              <div className="employee-list">
                {activeEmployees.slice(0, 20).map(emp => (
                  <div 
                    key={emp.id}
                    className={`employee-option ${selectedEmp?.id === emp.id ? 'selected' : ''}`}
                    onClick={() => handleEmployeeSelect(emp)}
                  >
                    <div className="emp-option-info">
                      <strong>{emp.name}</strong>
                      <span>{emp.title} - {emp.department}</span>
                    </div>
                    <span className="emp-option-id">{emp.id}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="bp-step fade-in">
              <h3>Job Changes</h3>
              <p className="step-desc">Update title, department, or manager</p>
              <div className="form-grid">
                <Select label="New Department" value={formData.newDepartment} onChange={e => updateField('newDepartment', e.target.value)} options={departments.map(d => ({ value: d, label: d }))} />
                <Select label="New Title" value={formData.newTitle} onChange={e => updateField('newTitle', e.target.value)} options={(titles[formData.newDepartment] || []).map(t => ({ value: t, label: t }))} />
                <Input label="Effective Date" type="date" value={formData.effectiveDate} onChange={e => updateField('effectiveDate', e.target.value)} />
              </div>
              {selectedEmp && (
                <div className="current-info">
                  <span>Current: {selectedEmp.title} in {selectedEmp.department}</span>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="bp-step fade-in">
              <h3>Compensation Review</h3>
              <p className="step-desc">Adjust salary if applicable</p>
              <div className="form-grid">
                <Select label="Salary Change" value={formData.salaryChange} onChange={e => updateField('salaryChange', e.target.value)} options={[{ value: 'increase', label: 'Increase' }, { value: 'decrease', label: 'Decrease' }, { value: 'nochange', label: 'No Change' }]} />
                {formData.salaryChange !== 'nochange' && (
                  <>
                    <Input label="Percentage" type="number" value={formData.salaryPercent} onChange={e => updateField('salaryPercent', e.target.value)} placeholder="e.g. 10" />
                    <Input label="New Annual Salary (calculated)" value={Math.round(calculateNewSalary()).toLocaleString()} disabled />
                  </>
                )}
              </div>
              {selectedEmp && formData.salaryChange !== 'nochange' && formData.salaryPercent && (
                <div className="salary-comparison">
                  <div className="salary-old">
                    <span>Current Salary</span>
                    <strong>{selectedEmp.currency} {selectedEmp.salary.toLocaleString()}</strong>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                  <div className="salary-new">
                    <span>New Salary</span>
                    <strong>{selectedEmp.currency} {Math.round(calculateNewSalary()).toLocaleString()}</strong>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="bp-step fade-in">
              <h3>Review & Submit</h3>
              <p className="step-desc">Confirm all changes</p>
              <div className="review-sections">
                <div className="review-section">
                  <h4>Employee</h4>
                  <div className="review-grid">
                    <div><span>Name:</span> {selectedEmp?.name}</div>
                    <div><span>ID:</span> {selectedEmp?.id}</div>
                  </div>
                </div>
                <div className="review-section">
                  <h4>Job Changes</h4>
                  <div className="review-grid">
                    <div><span>Department:</span> {formData.newDepartment || selectedEmp?.department}</div>
                    <div><span>Title:</span> {formData.newTitle || selectedEmp?.title}</div>
                    <div><span>Effective:</span> {formData.effectiveDate || 'Immediate'}</div>
                  </div>
                </div>
                <div className="review-section">
                  <h4>Compensation</h4>
                  <div className="review-grid">
                    <div><span>Salary Change:</span> {formData.salaryChange === 'nochange' ? 'No Change' : `${formData.salaryPercent}% ${formData.salaryChange}`}</div>
                    {formData.salaryChange !== 'nochange' && formData.salaryPercent && (
                      <div><span>New Salary:</span> {selectedEmp?.currency} {Math.round(calculateNewSalary()).toLocaleString()}</div>
                    )}
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
              <Button onClick={handleNext} disabled={currentStep === 0 && !selectedEmp}>Continue</Button>
            ) : (
              <Button onClick={handleSubmit}>Submit Changes</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
