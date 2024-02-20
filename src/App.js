// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import UserPage from './UserPage';
import DeleteUserPage from './DeleteUserPage';
import { AuthProvider } from './AuthProvider';

const App = () => {
  return (
    <div>
      <Router>
        <AuthProvider> {/* AuthProvider를 최상위 컴포넌트로 사용 */}
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/signup" element={<SignUpPage />}/>
            <Route path="/user" element={<UserPage />}/>
            <Route path="/deleteUser" element={<DeleteUserPage />}/>
            {/* 다른 라우트들 추가 */}
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
};

export default App;
