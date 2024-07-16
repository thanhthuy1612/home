import dynamic from 'next/dynamic';
import React from 'react';

const PasswordForm = dynamic(() => import('./PasswordForm'), {
  loading: () => <></>,
  ssr: false,
});
const Password: React.FC = () => {
  return <PasswordForm />;
};

export default Password;
