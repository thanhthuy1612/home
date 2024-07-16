import dynamic from 'next/dynamic';
import React from 'react';

const CreateForm = dynamic(() => import('./CreateForm'), {
  loading: () => <></>,
  ssr: false,
});

const CreateHome: React.FC = () => {
  return <CreateForm />;
};

export default CreateHome;
