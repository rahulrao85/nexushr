import { createContext, useContext, useState, useCallback } from 'react';
import { employees, businessProcesses, calculatePayroll } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [employeesData, setEmployeesData] = useState(employees);
  const [pendingActions, setPendingActions] = useState([
    { id: 1, type: 'hire', title: 'Complete hire for Sarah Mitchell', status: 'pending', dueDate: '2026-05-12' },
    { id: 2, type: 'changeJob', title: 'Review salary adjustment for James Wilson', status: 'pending', dueDate: '2026-05-11' },
    { id: 3, type: 'terminate', title: 'Process termination for Mark Thompson', status: 'pending', dueDate: '2026-05-15' }
  ]);
  const [activePage, setActivePage] = useState('dashboard');

  const login = useCallback((email, password) => {
    if (email === 'demo@nexushr.com' && password === 'demo123') {
      setIsAuthenticated(true);
      setCurrentUser({ name: 'Demo User', email, role: 'HR Admin' });
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setActivePage('dashboard');
  }, []);

  const getHeadcount = useCallback(() => {
    return {
      total: employeesData.length,
      india: employeesData.filter(e => e.region === 'India').length,
      us: employeesData.filter(e => e.region === 'US').length,
      uk: employeesData.filter(e => e.region === 'UK').length
    };
  }, [employeesData]);

  const getDepartments = useCallback(() => {
    const depts = {};
    employeesData.forEach(emp => {
      if (!depts[emp.department]) depts[emp.department] = 0;
      depts[emp.department]++;
    });
    return depts;
  }, [employeesData]);

  const addEmployee = useCallback((newEmployee) => {
    const id = `EMP${String(employeesData.length + 1).padStart(5, '0')}`;
    const employee = { ...newEmployee, id };
    setEmployeesData(prev => [...prev, employee]);
    return employee;
  }, [employeesData]);

  const updateEmployee = useCallback((id, updates) => {
    setEmployeesData(prev => prev.map(emp => emp.id === id ? { ...emp, ...updates } : emp));
  }, []);

  const terminateEmployee = useCallback((id, reason) => {
    updateEmployee(id, { status: 'Terminated', terminationReason: reason });
  }, [updateEmployee]);

  const completeAction = useCallback((actionId) => {
    setPendingActions(prev => prev.filter(a => a.id !== actionId));
  }, []);

  const getEmployeePayslip = useCallback((employeeId) => {
    const emp = employeesData.find(e => e.id === employeeId);
    if (!emp) return null;
    return calculatePayroll(emp);
  }, [employeesData]);

  const value = {
    isAuthenticated,
    currentUser,
    employeesData,
    pendingActions,
    activePage,
    login,
    logout,
    setActivePage,
    getHeadcount,
    getDepartments,
    addEmployee,
    updateEmployee,
    terminateEmployee,
    completeAction,
    getEmployeePayslip,
    businessProcesses
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
