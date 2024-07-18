'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const LoginPage = dynamic(() => import('./LoginPage'), {
  loading: () => <></>,
  ssr: false,
});
const Login: React.FC = () => {
  return <LoginPage />;
};

export default Login;
