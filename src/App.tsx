import { useState } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import type { RootState } from './store';
import { EmployeeList } from './components/EmployeeList';
import { EmployeeForm } from './components/EmployeeForm';
import { Header } from './components/Header';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import type { Employee } from './types/employee';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';

function AppContent() {
  const [showForm, setShowForm] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [currentPage, setCurrentPage] = useState<'login' | 'register'>('login');

  const handleAdd = () => {
    setEditingEmployee(null);
    setShowForm(true);
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingEmployee(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="bg-[#f8faff] min-h-screen">
        <Toaster position="top-right" />
        {currentPage === 'login' ? (
          <LoginPage 
            onLoginSuccess={() => {}} 
            onNavigateToRegister={() => setCurrentPage('register')} 
          />
        ) : (
          <RegisterPage 
            onRegisterSuccess={() => setCurrentPage('login')} 
            onNavigateToLogin={() => setCurrentPage('login')} 
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faff] pb-20">
      <Toaster position="top-right" />
      <Header />
      <main>
        <EmployeeList onEdit={handleEdit} onAdd={handleAdd} />
        <AnimatePresence>
          {showForm && (
            <EmployeeForm
              employee={editingEmployee}
              onClose={handleCloseForm}
            />
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
