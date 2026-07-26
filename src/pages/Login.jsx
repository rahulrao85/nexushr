import { useState } from 'react';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import './Login.css';

export default function Login() {
  const { login } = useApp();
  const [loading, setLoading] = useState(false);

  const handleDemoLogin = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    login('demo@nexushr.com', 'demo123');
    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-bg-gradient"></div>
        <div className="login-bg-grid"></div>
      </div>
      
      <div className="login-container">
        <div className="login-header">
          <div className="login-logo">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
              <rect width="48" height="48" rx="12" fill="url(#logo-gradient)"/>
              <path d="M14 24h20M24 14v20M18 18l12 12M30 18l-12 12" stroke="white" strokeWidth="3" strokeLinecap="round"/>
              <defs>
                <linearGradient id="logo-gradient" x1="0" y1="0" x2="48" y2="48">
                  <stop stopColor="#6366f1"/>
                  <stop offset="1" stopColor="#8b5cf6"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <h1 className="login-title">NexusHR</h1>
          <p className="login-subtitle">Enterprise HR Management System</p>
        </div>

        <div className="login-demo-btn">
          <Button type="button" fullWidth size="lg" loading={loading} onClick={handleDemoLogin}>
            Enter Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
