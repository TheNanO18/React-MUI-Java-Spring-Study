import React             from 'react';
import {Routes, Route}   from 'react-router-dom';
import Login             from './pages/Login/Login';
import Dashboard         from './pages/Dashboard/Dashboard';
import backgroundImage   from './assets/background.jpg';
import { AuthProvider }  from './context/AuthContext';
import ProtectedRoute    from './ProtectedRoute';
import DashboardHome     from './pages/Dashboard/DashboardHome';
import UserManagement    from './pages/Dashboard/UserManagement';
import Setting           from './pages/Dashboard/Setting';
import DynamicParshing   from './pages/Dashboard/DynamicParshing';
import Encryption        from './pages/Dashboard/Encryption';
import Decryption        from './pages/Dashboard/Decryption';

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
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* 아래가 중첩 라우트 설정입니다. */}
          <Route index element={<DashboardHome />} />           {/* /dashboard 경로 */}
          <Route path="users"           element={<UserManagement />} />         {/* /dashboard/users 경로 */}
          <Route path="setting"         element={<Setting />} />                {/* /dashboard/setting 경로 */}
          <Route path="dynamicparshing" element={<DynamicParshing />} />        {/* /dashboard/dynamicparshing 경로 */}
          <Route path="encryption"      element={<Encryption />} />             {/* /dashboard/encryption 경로 */}
          <Route path="decryption"      element={<Decryption />} />             {/* /dashboard/decryption 경로 */}
        </Route>
      </Routes>
    </AuthProvider>
    </div>
  );
}

export default App;
