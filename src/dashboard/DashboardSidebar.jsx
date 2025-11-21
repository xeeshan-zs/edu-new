import { 
  LayoutDashboard, 
  School, 
  Store, 
  Users, 
  GraduationCap, 
  Briefcase, 
  BarChart3, 
  MessageSquare, 
  Settings, 
  LogOut,
  UserCheck
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import './DashboardSidebar.css';
import educonnectLogo from '../assets/educonnectLogo/educonnect_logo.png';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard', color: '#2A6EF2' },
  { id: 'schools', label: 'Schools', icon: School, to: '/dashboard/schools', color: '#3AC47D' },
  { id: 'vendors', label: 'Vendors', icon: Store, to: '/dashboard/vendors', color: '#8B5CF6' },
  { id: 'parents-students', label: 'Parents & Students', icon: Users, to: '/dashboard/users', color: '#F59E0B' },
  { id: 'teachers', label: 'Teachers', icon: UserCheck, to: '/dashboard/teachers', color: '#EF4444' },
  { id: 'admissions', label: 'Admissions', icon: GraduationCap, to: '/dashboard/admissions', color: '#06B6D4' },
  { id: 'job-posts', label: 'Job Posts', icon: Briefcase, to: '/dashboard/jobs', color: '#EC4899' },
  { id: 'reports', label: 'Reports & Analytics', icon: BarChart3, to: '/dashboard/analytics', color: '#10B981' },
  { id: 'support', label: 'Support & Tickets', icon: MessageSquare, to: '/dashboard/communication', color: '#F97316' },
  { id: 'settings', label: 'System Settings', icon: Settings, to: '/dashboard/settings', color: '#6B7280' },
];

const DashboardSidebar = ({ className = '' }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className={`dashboard-sidebar ${className}`}>
      {/* Logo Section */}
      <div className="sidebar-header">
        <div className="sidebar-logo-container">
          <img src={educonnectLogo} alt="EduConnect" className="sidebar-logo" />
          <div className="sidebar-brand">
            <p className="sidebar-brand-label">EduConnect</p>
            <h2 className="sidebar-brand-title">Super Admin</h2>
          </div>
        </div>
      </div>

      {/* User Info */}
      {user && (
        <div className="sidebar-user-info">
          <div className="sidebar-user-avatar">
            {user.email.charAt(0).toUpperCase()}
          </div>
          <div className="sidebar-user-details">
            <p className="sidebar-user-name">Admin</p>
            <p className="sidebar-user-email">{user.email}</p>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map(({ id, label, icon: Icon, to, color }) => (
          <NavLink
            key={id}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              `sidebar-nav-link ${isActive ? 'active' : ''}`
            }
            style={({ isActive }) => ({
              '--nav-color': color,
              '--is-active': isActive ? '1' : '0'
            })}
          >
            <div className="sidebar-nav-icon-wrapper">
              <Icon className="sidebar-nav-icon" />
            </div>
            <span className="sidebar-nav-label">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="sidebar-footer">
        <button onClick={handleLogout} className="sidebar-logout-btn">
          <LogOut className="sidebar-logout-icon" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
