import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import PhonePage from './pages/PhonePage.tsx';
import NextPage from './pages/otp.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/phone" element={<PhonePage />} />
        <Route path="/next" element={<NextPage />} />
      </Routes>
    </Router>
  );
}

export default App;
