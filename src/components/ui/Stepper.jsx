import './Stepper.css';

export default function Stepper({ steps, currentStep }) {
  return (
    <div className="stepper">
      {steps.map((step, index) => (
        <div 
          key={step.id}
          className={`stepper-step ${
            index < currentStep ? 'completed' : 
            index === currentStep ? 'active' : 'pending'
          }`}
        >
          <div className="stepper-indicator">
            {index < currentStep ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            ) : (
              <span>{index + 1}</span>
            )}
          </div>
          <span className="stepper-label">{step.name}</span>
          {index < steps.length - 1 && <div className="stepper-line" />}
        </div>
      ))}
    </div>
  );
}
