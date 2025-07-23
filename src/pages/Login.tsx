import React from 'react';
import LoginForm from '@/components/LoginForm';
import { Fiscal } from '@/data/mockData';

interface LoginProps {
  onLogin: (fiscal: Fiscal) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return <LoginForm onLogin={onLogin} />;
};

export default Login;