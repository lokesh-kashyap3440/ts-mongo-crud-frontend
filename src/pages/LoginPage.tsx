import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AuthForm } from '../components/AuthForm';
import { authApi } from '../services/api';
import { setCredentials } from '../store/authSlice';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onNavigateToRegister: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onNavigateToRegister }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLogin = async (data: { username: string; password?: string }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authApi.login(data);
      dispatch(setCredentials({ user: data.username, token: response.accessToken }));
      onLoginSuccess();
    } catch (err: any) {
      setError(err.response?.data || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthForm
      title="Login"
      onSubmit={handleLogin}
      isLoading={isLoading}
      error={error}
      buttonText="Sign In"
    >
      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Don't have an account?{' '}
          <button 
            onClick={onNavigateToRegister}
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Register
          </button>
        </p>
      </div>
    </AuthForm>
  );
};
