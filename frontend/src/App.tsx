import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.tsx';
import PhonePage from './pages/PhonePage.tsx';
import NextPage from './pages/otp.tsx';
import PAsym from './pages/p_Asym.tsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PAsym />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/phone" element={<PhonePage />} />
        <Route path="/next" element={<NextPage />} />
      </Routes>
    </Router>
  );
}

export default App;
