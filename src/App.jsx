import { useApp } from './context/AppContext';
import { AppProvider } from './context/AppContext';
import Login from './pages/Login';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import EmployeeProfile from './pages/EmployeeProfile';
import Payroll from './pages/Payroll';
import Hire from './pages/Hire';
import ChangeJob from './pages/ChangeJob';
import Terminate from './pages/Terminate';

function AppContent() {
  const { isAuthenticated, activePage } = useApp();

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'employees':
        return <Employees />;
      case 'employee':
        return <EmployeeProfile />;
      case 'payroll':
        return <Payroll />;
      case 'hire':
        return <Hire />;
      case 'changejob':
        return <ChangeJob />;
      case 'terminate':
        return <Terminate />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
