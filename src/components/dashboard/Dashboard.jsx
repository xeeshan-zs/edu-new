import { 
  School, 
  Store, 
  Users, 
  GraduationCap, 
  Briefcase, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  ArrowUp,
  ArrowDown,
  Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Badge } from '../ui/badge.jsx';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import './Dashboard.css';

export default function Dashboard() {
  // KPI Metrics
  const metrics = [
    {
      title: 'Total Schools',
      verified: 1247,
      pending: 37,
      icon: School,
      color: '#2A6EF2',
      bgGradient: 'linear-gradient(135deg, #2A6EF2 0%, #1e40af 100%)',
    },
    {
      title: 'Open Admissions',
      value: 856,
      change: '+8%',
      trend: 'up',
      icon: GraduationCap,
      color: '#3AC47D',
      bgGradient: 'linear-gradient(135deg, #3AC47D 0%, #10b981 100%)',
    },
    {
      title: 'Active Job Posts',
      value: 2341,
      change: '+23%',
      trend: 'up',
      icon: Briefcase,
      color: '#8B5CF6',
      bgGradient: 'linear-gradient(135deg, #8B5CF6 0%, #7c3aed 100%)',
    },
    {
      title: 'Verified Vendors',
      value: 432,
      change: '+15%',
      trend: 'up',
      icon: Store,
      color: '#F59E0B',
      bgGradient: 'linear-gradient(135deg, #F59E0B 0%, #d97706 100%)',
    },
    {
      title: 'Daily Active Users',
      value: 12456,
      change: '+12%',
      trend: 'up',
      icon: Activity,
      color: '#EF4444',
      bgGradient: 'linear-gradient(135deg, #EF4444 0%, #dc2626 100%)',
    },
    {
      title: 'Pending Approvals',
      value: 89,
      change: '-5%',
      trend: 'down',
      icon: Clock,
      color: '#06B6D4',
      bgGradient: 'linear-gradient(135deg, #06B6D4 0%, #0891b2 100%)',
    },
  ];

  // Pending Approvals Breakdown
  const pendingBreakdown = [
    { type: 'Schools', count: 37, icon: School, color: '#2A6EF2' },
    { type: 'Vendors', count: 28, icon: Store, color: '#F59E0B' },
    { type: 'Teacher CVs', count: 24, icon: Users, color: '#3AC47D' },
  ];

  // Admissions Trend Data
  const admissionsData = [
    { month: 'Jan', admissions: 65 },
    { month: 'Feb', admissions: 78 },
    { month: 'Mar', admissions: 92 },
    { month: 'Apr', admissions: 88 },
    { month: 'May', admissions: 105 },
    { month: 'Jun', admissions: 125 },
    { month: 'Jul', admissions: 142 },
    { month: 'Aug', admissions: 158 },
    { month: 'Sep', admissions: 175 },
    { month: 'Oct', admissions: 189 },
  ];

  // Job Applications Trend
  const jobApplicationsData = [
    { month: 'Jan', applications: 450 },
    { month: 'Feb', applications: 520 },
    { month: 'Mar', applications: 610 },
    { month: 'Apr', applications: 580 },
    { month: 'May', applications: 720 },
    { month: 'Jun', applications: 890 },
  ];

  // User Growth Trend
  const userGrowthData = [
    { month: 'Jan', users: 8500 },
    { month: 'Feb', users: 9200 },
    { month: 'Mar', users: 10100 },
    { month: 'Apr', users: 11200 },
    { month: 'May', users: 11800 },
    { month: 'Jun', users: 12456 },
  ];

  // Alerts & Reports
  const alerts = [
    { id: 1, type: 'warning', message: '3 schools pending verification for over 7 days', icon: AlertCircle },
    { id: 2, type: 'info', message: 'New vendor registration spike detected (+25%)', icon: TrendingUp },
    { id: 3, type: 'success', message: 'System backup completed successfully', icon: CheckCircle },
  ];

  const COLORS = ['#2A6EF2', '#3AC47D', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];

  return (
    <div className="dashboard-overview">
      {/* Header */}
      <div className="dashboard-header-section">
        <div>
          <h1 className="dashboard-main-title">Dashboard Overview</h1>
          <p className="dashboard-subtitle">Welcome back! Here's what's happening with EduConnect today.</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="metrics-grid">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="metric-card">
              <CardContent className="metric-card-content">
                <div className="metric-header">
                  <div className="metric-icon-wrapper" style={{ background: metric.bgGradient }}>
                    <Icon className="metric-icon" size={24} />
                  </div>
                  <div className="metric-info">
                    <p className="metric-label">{metric.title}</p>
                    {metric.verified !== undefined ? (
                      <div className="metric-values">
                        <span className="metric-value verified">{metric.verified}</span>
                        <span className="metric-divider">/</span>
                        <span className="metric-value pending">{metric.pending}</span>
                      </div>
                    ) : (
                      <h3 className="metric-value-single">{metric.value.toLocaleString()}</h3>
                    )}
                    {metric.change && (
                      <div className="metric-change">
                        {metric.trend === 'up' ? (
                          <ArrowUp size={14} className="metric-change-icon up" />
                        ) : (
                          <ArrowDown size={14} className="metric-change-icon down" />
                        )}
                        <span className={`metric-change-text ${metric.trend}`}>{metric.change}</span>
                        <span className="metric-change-label">vs last month</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Pending Approvals & Alerts Row */}
      <div className="dashboard-row">
        {/* Pending Approvals */}
        <Card className="pending-card">
          <CardHeader>
            <CardTitle className="card-title">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="pending-list">
              {pendingBreakdown.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="pending-item">
                    <div className="pending-icon-wrapper" style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                      <Icon size={20} />
                    </div>
                    <div className="pending-info">
                      <p className="pending-type">{item.type}</p>
                      <p className="pending-count">{item.count} pending</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <button className="view-all-btn">View All Approvals →</button>
          </CardContent>
        </Card>

        {/* Alerts & Reports */}
        <Card className="alerts-card">
          <CardHeader>
            <CardTitle className="card-title">System Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="alerts-list">
              {alerts.map((alert) => {
                const Icon = alert.icon;
                return (
                  <div key={alert.id} className={`alert-item ${alert.type}`}>
                    <div className="alert-icon-wrapper">
                      <Icon size={18} />
                    </div>
                    <p className="alert-message">{alert.message}</p>
                  </div>
                );
              })}
            </div>
            <button className="view-all-btn">View All Reports →</button>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="analytics-section">
        <h2 className="section-title">Analytics & Trends</h2>
        
        <div className="charts-grid">
          {/* Admissions Trend */}
          <Card className="chart-card">
            <CardHeader>
              <CardTitle className="chart-title">Admissions Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={admissionsData}>
                  <defs>
                    <linearGradient id="colorAdmissions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2A6EF2" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#2A6EF2" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="admissions" 
                    stroke="#2A6EF2" 
                    fillOpacity={1} 
                    fill="url(#colorAdmissions)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Job Applications Trend */}
          <Card className="chart-card">
            <CardHeader>
              <CardTitle className="chart-title">Job Applications Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={jobApplicationsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" />
                  <YAxis stroke="#6b7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px'
                    }} 
                  />
                  <Bar dataKey="applications" fill="#3AC47D" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* User Growth Trend */}
        <Card className="chart-card full-width">
          <CardHeader>
            <CardTitle className="chart-title">User Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px'
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="users" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
