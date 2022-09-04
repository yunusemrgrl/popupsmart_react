import { useEffect, useState } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

// CONTEXT

// import { useFirebase } from './context/FirebaseContext';

// COMPONENTS
import PublicRoutes from '../src/routes/PublicRoutes';
import PrivateRoutes from '../src/routes/PrivateRoutes';
import { useAuth } from './context/AuthContext';

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    setUser(localStorage.getItem('users'));
  }, []);
  return (
    <Router>
      <Routes>
        {!user && (
          <>
            <Route path='/*' element={<Navigate to={'auth'} />} />
            <Route path='auth/*' element={<PublicRoutes />} />
          </>
        )}
        {user && <Route path='/*' element={<PrivateRoutes />} />}
      </Routes>
    </Router>
  );
}

export default App;
