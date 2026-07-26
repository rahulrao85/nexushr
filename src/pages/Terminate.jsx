import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input, { Select } from '../components/ui/Input';
import Stepper from '../components/ui/Stepper';
import './BusinessProcess.css';

const steps = [
  { id: 'select', name: 'Select Employee' },
  { id: 'reason', name: 'Offboarding Details' },
  { id: 'finalPay', name: 'Final Pay & Benefits' },
  { id: 'handover', name: 'Handover Tasks' }
];

export default function Terminate() {
  const { employeesData, terminateEmployee, setActivePage, getEmployeePayslip } = useApp();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    employeeId: '', terminationType: 'resignation', reason: '', lastDay: '', exitInterview: true,
    unusedLeave: '', severance: '', benefitsEndDate: '',
    handoverDocuments: true, handoverEquipment: true, revokeAccess: true,
    submitted: false
  });
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [payslip, setPayslip] = useState(null);

  const activeEmployees = employeesData.filter(e => e.status === 'Active');

  const updateField = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleEmployeeSelect = (emp) => {
    setSelectedEmp(emp);
    setFormData(prev => ({ ...prev, employeeId: emp.id }));
    const slip = getEmployeePayslip(emp.id);
    setPayslip(slip);
  };

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    terminateEmployee(formData.employeeId, formData.reason);
    setFormData(prev => ({ ...prev, submitted: true }));
  };

  if (formData.submitted) {
    return (
      <div className="bp-success fade-in">
        <Card className="success-card">
          <div className="success-icon danger">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
              <path d="M22 4L12 14.01l-3-3"/>
            </svg>
          </div>
          <h2>Employee Terminated</h2>
          <p>{selectedEmp?.name} has been marked as terminated. All access has been flagged for review.</p>
          <div className="success-actions">
            <Button onClick={() => { setFormData({ employeeId: '', terminationType: 'resignation', reason: '', lastDay: '', exitInterview: true, unusedLeave: '', severance: '', benefitsEndDate: '', handoverDocuments: true, handoverEquipment: true, revokeAccess: true, submitted: false }); setCurrentStep(0); setSelectedEmp(null); }}>Process Another</Button>
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
              <p className="step-desc">Choose the employee to terminate</p>
              <div className="employee-list">
                {activeEmployees.map(emp => (
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
              <h3>Offboarding Details</h3>
              <p className="step-desc">Enter termination reason and final working day</p>
              <div className="form-grid">
                <Select label="Termination Type" value={formData.terminationType} onChange={e => updateField('terminationType', e.target.value)} options={[
                  { value: 'resignation', label: 'Voluntary Resignation' },
                  { value: 'retirement', label: 'Retirement' },
                  { value: 'termination', label: 'Involuntary Termination' },
                  { value: 'contractEnd', label: 'Contract End' }
                ]} />
                <Input label="Reason" value={formData.reason} onChange={e => updateField('reason', e.target.value)} placeholder="Brief reason for termination" />
                <Input label="Last Working Day" type="date" value={formData.lastDay} onChange={e => updateField('lastDay', e.target.value)} required />
              </div>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" checked={formData.exitInterview} onChange={e => updateField('exitInterview', e.target.checked)} />
                  <span>Conduct exit interview</span>
                </label>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="bp-step fade-in">
              <h3>Final Pay & Benefits</h3>
              <p className="step-desc">Calculate final pay and remaining benefits</p>
              {payslip && (
                <div className="payslip-calc">
                  <div className="payslip-row">
                    <span>Monthly Salary</span>
                    <span>{payslip.currency} {payslip.gross.toLocaleString()}</span>
                  </div>
                  <div className="payslip-row deduction">
                    <span>Tax Deductions (Estimated)</span>
                    <span>-{payslip.currency} {payslip.totalDeductions.toLocaleString()}</span>
                  </div>
                  <div className="payslip-row">
                    <span>Unused Leave Payout</span>
                    <span>+{payslip.currency} {formData.unusedLeave || 0}</span>
                  </div>
                  <div className="payslip-row">
                    <span>Severance</span>
                    <span>+{payslip.currency} {formData.severance || 0}</span>
                  </div>
                </div>
              )}
              <div className="form-grid">
                <Input label="Unused Leave Payout" type="number" value={formData.unusedLeave} onChange={e => updateField('unusedLeave', e.target.value)} />
                <Input label="Severance Pay" type="number" value={formData.severance} onChange={e => updateField('severance', e.target.value)} />
                <Input label="Benefits End Date" type="date" value={formData.benefitsEndDate} onChange={e => updateField('benefitsEndDate', e.target.value)} />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="bp-step fade-in">
              <h3>Handover Tasks</h3>
              <p className="step-desc">Ensure proper handover of responsibilities</p>
              <div className="handover-checklist">
                <label className={`checkbox-card ${formData.handoverDocuments ? 'checked' : ''}`}>
                  <input type="checkbox" checked={formData.handoverDocuments} onChange={e => updateField('handoverDocuments', e.target.checked)} />
                  <div className="checkbox-card-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8"/>
                    </svg>
                    <div>
                      <strong>Documents & Files</strong>
                      <span>All work documents must be uploaded and accessible</span>
                    </div>
                  </div>
                </label>
                <label className={`checkbox-card ${formData.handoverEquipment ? 'checked' : ''}`}>
                  <input type="checkbox" checked={formData.handoverEquipment} onChange={e => updateField('handoverEquipment', e.target.checked)} />
                  <div className="checkbox-card-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="3" width="20" height="14" rx="2"/>
                      <path d="M8 21h8M12 17v4"/>
                    </svg>
                    <div>
                      <strong>Equipment Return</strong>
                      <span>Laptop, phone, access cards to be returned</span>
                    </div>
                  </div>
                </label>
                <label className={`checkbox-card ${formData.revokeAccess ? 'checked' : ''}`}>
                  <input type="checkbox" checked={formData.revokeAccess} onChange={e => updateField('revokeAccess', e.target.checked)} />
                  <div className="checkbox-card-content">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2"/>
                      <path d="M7 11V7a5 5 0 0110 0v4"/>
                    </svg>
                    <div>
                      <strong>Revoke System Access</strong>
                      <span>Disable email, SSO, and all system accounts</span>
                    </div>
                  </div>
                </label>
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
              <Button variant="danger" onClick={handleSubmit}>Confirm Termination</Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
