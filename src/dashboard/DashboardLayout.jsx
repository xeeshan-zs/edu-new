import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardSidebar from './DashboardSidebar.jsx';
import Header from '../components/layout/Header.jsx';
import '../Styles/globals.css';
import './DashboardLayout.css';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="educonnect-dashboard dashboard-container">
      <div className="dashboard-layout">
        <DashboardSidebar className={sidebarOpen ? 'open' : ''} />
        <div className="dashboard-main">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          <main className="dashboard-content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
