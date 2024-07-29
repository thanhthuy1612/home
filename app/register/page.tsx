import dynamic from 'next/dynamic';
import React from 'react';

const FormRegister = dynamic(() => import('./components/FormRegister'), {
  loading: () => <></>,
  ssr: false,
});

const RegisterPage: React.FC = () => {
  return <FormRegister />;
};

export default RegisterPage;
