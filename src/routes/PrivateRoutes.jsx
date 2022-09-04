import { Routes, Route, Navigate } from 'react-router-dom';
import Profile from '../components/profile/Profile';

function PrivateRoutes() {
  return (
    <Routes>
      <Route path='/*' element={<Navigate to='/profile-page' />} />
      <Route path='profile-page' element={<Profile />} />
    </Routes>
  );
}

export default PrivateRoutes;
