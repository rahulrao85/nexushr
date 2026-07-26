const firstNames = ['James', 'Mary', 'John', 'Patricia', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth', 'David', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica', 'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa', 'Matthew', 'Betty', 'Anthony', 'Margaret', 'Mark', 'Sandra', 'Donald', 'Ashley', 'Steven', 'Kimberly', 'Paul', 'Emily', 'Andrew', 'Donna', 'Joshua', 'Michelle', 'Kenneth', 'Carol', 'Kevin', 'Amanda', 'Brian', 'Dorothy', 'George', 'Melissa', 'Timothy', 'Deborah', 'Rajesh', 'Priya', 'Amit', 'Anita', 'Vikram', 'Sunita', 'Arun', 'Kavita', 'Sanjay', 'Meera', 'Rakesh', 'Lakshmi', 'Harish', 'Rani', 'Suresh', 'Geeta', 'Anil', 'Nisha', 'Deepak', 'Pooja', 'Vijay', 'Ritu', 'Raj', 'Aisha', 'Kiran', 'Farida', 'Omar', 'Fatima', 'Ali', 'Zara', 'Hassan', 'Ayesha', 'Yusuf', 'Mariam', 'Tariq', 'Nadia', 'Faisal', 'Sara', 'Oliver', 'Emma', 'Harry', 'Charlotte', 'Jack', 'Amelia', 'Charlie', 'Sophia', 'Thomas', 'Isla', 'George', 'Ava', 'William', 'Mia', 'Archie', 'Florence'];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson', 'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill', 'Flores', 'Sharma', 'Patel', 'Singh', 'Kumar', 'Gupta', 'Jain', 'Shah', 'Mehta', 'Reddy', 'Nair', 'Menon', 'Iyer', 'Krishnan', 'Rao', 'Naidu', 'Reddy', 'Khan', 'Ahmed', 'Ali', 'Malik', 'Hussain', 'Begum', 'Mirza', 'Sheikh', 'Qureshi', 'Rahman', 'Chowdhury', 'Islam', 'Thompson', 'Williams', 'Jones', 'Brown', 'Davis', 'Miller', 'Wilson', 'Taylor', 'Anderson', 'Thomas', 'Jackson', 'White', 'Harris', 'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright'];

const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'Finance', 'HR', 'Operations', 'Legal', 'Customer Success'];
const jobTitles = {
  'Engineering': ['Software Engineer', 'Senior Software Engineer', 'Staff Engineer', 'Engineering Manager', 'Principal Engineer', 'Frontend Developer', 'Backend Developer', 'DevOps Engineer', 'QA Engineer'],
  'Product': ['Product Manager', 'Senior Product Manager', 'Director of Product', 'Product Analyst', 'Associate Product Manager'],
  'Design': ['UX Designer', 'UI Designer', 'Senior UX Designer', 'Design Lead', 'UX Researcher', 'Brand Designer'],
  'Marketing': ['Marketing Manager', 'Content Strategist', 'SEO Specialist', 'Growth Manager', 'Marketing Analyst', 'Brand Manager'],
  'Sales': ['Sales Representative', 'Account Executive', 'Sales Manager', 'Business Development Rep', 'Sales Director'],
  'Finance': ['Financial Analyst', 'Senior Accountant', 'Finance Manager', 'Controller', 'Accounts Payable Specialist'],
  'HR': ['HR Manager', 'Recruiter', 'HR Business Partner', 'Talent Acquisition Lead', 'HR Coordinator'],
  'Operations': ['Operations Manager', 'Operations Analyst', 'Supply Chain Manager', 'Project Manager', 'Office Manager'],
  'Legal': ['Legal Counsel', 'Paralegal', 'Compliance Manager', 'Contract Specialist'],
  'Customer Success': ['Customer Success Manager', 'Support Specialist', 'Account Manager', 'Implementation Specialist']
};

const regions = ['India', 'US', 'UK'];
const regionCurrency = { 'India': 'INR', 'US': 'USD', 'UK': 'GBP' };
const baseSalaries = {
  'India': { min: 400000, max: 5000000 },
  'US': { min: 50000, max: 300000 },
  'UK': { min: 25000, max: 150000 }
};

const countries = { 'India': '🇮🇳', 'US': '🇺🇸', 'UK': '🇬🇧' };
const statuses = ['Active', 'Active', 'Active', 'On Leave', 'Probation'];

const managers = {};

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateEmployees(count = 100) {
  const employees = [];
  
  const indiaCount = Math.floor(count * 0.45);
  const usCount = Math.floor(count * 0.35);
  const ukCount = count - indiaCount - usCount;
  
  const regionCounts = { 'India': indiaCount, 'US': usCount, 'UK': ukCount };
  
  for (const region of regions) {
    for (let i = 0; i < regionCounts[region]; i++) {
      const firstName = pick(firstNames);
      const lastName = pick(lastNames);
      const dept = pick(departments);
      const titles = jobTitles[dept];
      const title = pick(titles);
      const status = pick(statuses);
      
      const salary = region === 'India' 
        ? random(baseSalaries[region].min, baseSalaries[region].max)
        : random(baseSalaries[region].min, baseSalaries[region].max);
      
      const emp = {
        id: `EMP${String(employees.length + 1).padStart(5, '0')}`,
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${random(1, 999)}@nexushr.com`,
        phone: region === 'India' ? `+91 ${random(6000000000, 9999999999)}` : 
               region === 'US' ? `+1 ${random(2000000000, 9999999999)}` : 
               `+44 ${random(700000000, 999999999)}`,
        department: dept,
        title,
        region,
        country: countries[region],
        currency: regionCurrency[region],
        salary,
        status,
        manager: null,
        hireDate: new Date(random(2015, 2025), random(0, 11), random(1, 28)).toISOString().split('T')[0],
        dob: new Date(random(1965, 2000), random(0, 11), random(1, 28)).toISOString().split('T')[0],
        location: region === 'India' ? pick(['Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Pune', 'Chennai']) :
                  region === 'US' ? pick(['New York', 'San Francisco', 'Austin', 'Seattle', 'Chicago', 'Boston']) :
                  pick(['London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow']),
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}${random(1, 100)}`
      };
      
      employees.push(emp);
    }
  }
  
  const managersByDept = {};
  employees.forEach(emp => {
    if (!managersByDept[emp.department]) managersByDept[emp.department] = [];
    if (emp.title.includes('Manager') || emp.title.includes('Director') || emp.title.includes('Lead') || emp.title.includes('Staff') || emp.title.includes('Senior')) {
      managersByDept[emp.department].push(emp);
    }
  });
  
  employees.forEach(emp => {
    if (!emp.title.includes('Manager') && !emp.title.includes('Director') && !emp.title.includes('Lead') && !emp.title.includes('Staff')) {
      const possibleManagers = managersByDept[emp.department].filter(m => m.id !== emp.id);
      if (possibleManagers.length > 0) {
        emp.manager = pick(possibleManagers);
      }
    }
  });
  
  return employees;
}

export const employees = generateEmployees(100);

export const businessProcesses = {
  hire: {
    id: 'hire',
    name: 'Hire New Employee',
    steps: [
      { id: 'personal', name: 'Personal Details', fields: ['firstName', 'lastName', 'email', 'phone', 'dob', 'address'] },
      { id: 'job', name: 'Job Assignment', fields: ['department', 'title', 'region', 'location', 'manager'] },
      { id: 'compensation', name: 'Compensation', fields: ['salary', 'currency', 'payFrequency', 'benefits'] },
      { id: 'review', name: 'Review & Submit', fields: [] }
    ]
  },
  changeJob: {
    id: 'changeJob',
    name: 'Change Job',
    steps: [
      { id: 'select', name: 'Select Employee', fields: ['employee'] },
      { id: 'changes', name: 'Job Changes', fields: ['newTitle', 'newDepartment', 'newManager', 'effectiveDate'] },
      { id: 'compensation', name: 'Compensation Review', fields: ['salaryChange', 'newSalary', 'bonus'] },
      { id: 'review', name: 'Review & Submit', fields: [] }
    ]
  },
  terminate: {
    id: 'terminate',
    name: 'Terminate Employee',
    steps: [
      { id: 'select', name: 'Select Employee', fields: ['employee'] },
      { id: 'reason', name: 'Offboarding Details', fields: ['terminationType', 'reason', 'lastDay', 'exitInterview'] },
      { id: 'finalPay', name: 'Final Pay & Benefits', fields: ['unusedLeave', 'severance', 'benefitsEndDate'] },
      { id: 'handover', name: 'Handover Tasks', fields: ['documents', 'equipment', 'accessRevoke'] }
    ]
  }
};

export const taxDeductions = {
  India: {
    name: 'Tax Deductions (India)',
    items: [
      { name: 'TDS (Tax Deducted at Source)', rate: 0.20, type: 'tax' },
      { name: 'EPF (Employee Provident Fund)', rate: 0.12, type: 'pension' },
      { name: 'ESI (Employee State Insurance)', rate: 0.0075, type: 'insurance' },
      { name: 'Professional Tax', rate: 0.002, type: 'tax', fixed: 200 }
    ]
  },
  US: {
    name: 'Tax Deductions (US)',
    items: [
      { name: 'Federal Income Tax', rate: 0.22, type: 'tax' },
      { name: 'Social Security', rate: 0.062, type: 'pension', cap: 160200 },
      { name: 'Medicare', rate: 0.0145, type: 'insurance' },
      { name: 'State Tax', rate: 0.05, type: 'tax' }
    ]
  },
  UK: {
    name: 'Tax Deductions (UK)',
    items: [
      { name: 'PAYE (Income Tax)', rate: 0.20, type: 'tax' },
      { name: 'National Insurance', rate: 0.08, type: 'pension' },
      { name: 'Workplace Pension', rate: 0.05, type: 'pension' }
    ]
  }
};

export function calculatePayroll(employee, period = 'monthly') {
  const gross = employee.salary / 12;
  const regionDeductions = taxDeductions[employee.region];
  
  let totalDeductions = 0;
  const deductionBreakdown = regionDeductions.items.map(item => {
    let amount;
    if (item.fixed) {
      amount = item.fixed;
    } else if (item.cap && gross * item.rate > item.cap * item.rate / 12) {
      amount = Math.min(gross * item.rate, item.cap * item.rate / 12);
    } else {
      amount = gross * item.rate;
    }
    totalDeductions += amount;
    return { name: item.name, amount: Math.round(amount), type: item.type };
  });
  
  const net = gross - totalDeductions;
  
  return {
    employee,
    period,
    gross: Math.round(gross),
    deductions: deductionBreakdown,
    totalDeductions: Math.round(totalDeductions),
    net: Math.round(net),
    currency: employee.currency
  };
}
