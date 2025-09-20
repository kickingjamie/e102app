import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Login from './Login';
import Splash from './Splash';
import ProtectedRoute from './ProtectedRoute';
import RegisterUser from './RegisterUser';

function App() {
  return (
    <div className="bg-secondary-subtle min-vh-100">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/splash" element={<ProtectedRoute> <Splash /> </ProtectedRoute>} />
          <Route path="RegisterUser" element={<RegisterUser></RegisterUser>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
