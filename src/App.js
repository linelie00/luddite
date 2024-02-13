// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignUpPage />}/>
          {/* 다른 라우트들 추가 */}
        </Routes>
      </Router>
    </div>
  );
};

export default App;
