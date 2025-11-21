import React from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import './DashboardHeader.css';

const DashboardHeader = ({ toggleSidebar, isMobile }) => {
    return (
        <header className="dashboard-header">
            <div className="header-left">
                {isMobile && (
                    <button className="menu-toggle-btn" onClick={toggleSidebar}>
                        <Menu size={24} />
                    </button>
                )}
                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Search..." />
                </div>
            </div>

            <div className="header-right">
                <button className="icon-btn notification-btn">
                    <Bell size={20} />
                    <span className="notification-badge">3</span>
                </button>
                <div className="profile-dropdown">
                    <div className="profile-info">
                        <span className="profile-name">Admin User</span>
                        <span className="profile-role">Super Admin</span>
                    </div>
                    <div className="profile-avatar">
                        <User size={20} />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
