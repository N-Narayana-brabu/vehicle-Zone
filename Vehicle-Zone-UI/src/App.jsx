import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/pages/Dashboard';
import BuyVehicle from './components/pages/Buyvehicle';
import SellVehicle from './components/pages/sellvehicle';
import AboutUs from './components/pages/about-us';
import TermsConditions from './components/pages/Terms&conditions';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/buy-vehicle" element={<BuyVehicle />} />
        <Route path="/sell-vehicle" element={<SellVehicle />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
      </Routes>
    </Router>
  );
}

export default App;
