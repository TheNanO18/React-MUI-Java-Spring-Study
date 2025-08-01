import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import backgroundImage from './assets/background.jpg';
import { AuthProvider }  from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
     <div
      style={{
        backgroundImage: `url(${backgroundImage})`,  // import한 이미지 사용
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        width: '100vw',
      }}
    >
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" 
              element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
      </Routes>
    </AuthProvider>
    </div>
  );
}

export default App;
