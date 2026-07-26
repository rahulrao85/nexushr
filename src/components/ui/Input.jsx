import './Input.css';

export default function Input({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = false,
  disabled = false,
  error,
  icon,
  className = ''
}) {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className={`input-container ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`}>
        {icon && <span className="input-icon">{icon}</span>}
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className="input-field"
        />
      </div>
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
}

export function Select({
  label,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  error,
  className = ''
}) {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && (
        <label className="input-label">
          {label}
          {required && <span className="input-required">*</span>}
        </label>
      )}
      <div className={`input-container ${error ? 'input-error' : ''} ${disabled ? 'input-disabled' : ''}`}>
        <select
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
          className="input-field input-select"
        >
          <option value="">Select...</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="input-error-text">{error}</span>}
    </div>
  );
}
