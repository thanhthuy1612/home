import dynamic from 'next/dynamic';
import React from 'react';

const ProfileForm = dynamic(() => import('./ProfileForm'), {
  loading: () => <></>,
  ssr: false,
});

const Profile: React.FC = () => {
  return <ProfileForm />;
};

export default Profile;
