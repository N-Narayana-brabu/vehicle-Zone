// src/components/Dashboard.js
import React from 'react';
import Header from '../organism/Header';
import Sidebar from '../organism/sidebar'; // Adjust the path as necessary
import { API_URLS } from '../../configurations/api/apiurls'; // Import the API URLs

const Dashboard = () => {
  return (
    <div>
      <Sidebar endpoint={API_URLS.DATATYPE} />
      <div>
        <Header />
      </div>
    </div>
  );
}

export default Dashboard;
