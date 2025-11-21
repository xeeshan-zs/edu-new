import React from 'react';
import PageHeader from '../ui/PageHeader';
import { Download, Calendar, Filter } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, PieChart, Pie, Cell } from 'recharts';
import './Reports.css';

// Mock Data for Charts
const ENROLLMENT_DATA = [
  { month: 'Jan', students: 4000 },
  { month: 'Feb', students: 4200 },
  { month: 'Mar', students: 4100 },
  { month: 'Apr', students: 4400 },
  { month: 'May', students: 4600 },
  { month: 'Jun', students: 4800 },
];

const PERFORMANCE_DATA = [
  { subject: 'Math', avg: 85 },
  { subject: 'Science', avg: 78 },
  { subject: 'English', avg: 82 },
  { subject: 'History', avg: 75 },
  { subject: 'Art', avg: 90 },
];

const DEMOGRAPHICS_DATA = [
  { name: 'Boys', value: 2400 },
  { name: 'Girls', value: 2200 },
];

const COLORS = ['#2A6EF2', '#3AC47D', '#F59E0B', '#EF4444'];

const Reports = () => {
  const handleExport = (format) => {
    alert(`Exporting report as ${format}...`);
  };

  return (
    <div className="reports-page">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Deep dive into school performance, enrollment trends, and financials."
      />

      <div className="reports-toolbar">
        <div className="date-filter">
          <Calendar size={16} />
          <span>Last 6 Months</span>
        </div>
        <div className="export-actions">
          <button className="export-btn" onClick={() => handleExport('PDF')}>
            <Download size={16} /> Export PDF
          </button>
          <button className="export-btn outline" onClick={() => handleExport('Excel')}>
            <Download size={16} /> Export Excel
          </button>
        </div>
      </div>

      <div className="charts-grid">
        {/* Enrollment Trends */}
        <div className="chart-card full-width">
          <div className="chart-header">
            <h3>Total Enrollment Trends</h3>
            <button className="filter-btn"><Filter size={14} /></button>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={ENROLLMENT_DATA}>
                <defs>
                  <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2A6EF2" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2A6EF2" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="students" stroke="#2A6EF2" strokeWidth={3} fillOpacity={1} fill="url(#colorStudents)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Performance */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Avg. Subject Performance</h3>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={PERFORMANCE_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="subject" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="avg" fill="#3AC47D" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Demographics */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Student Demographics</h3>
          </div>
          <div className="chart-container flex-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={DEMOGRAPHICS_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DEMOGRAPHICS_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="reports-grid">
        <div className="report-item">
          <h4>Monthly Financial Report</h4>
          <p>Generated on March 1, 2024</p>
          <button className="download-link">Download PDF</button>
        </div>
        <div className="report-item">
          <h4>Teacher Attendance Log</h4>
          <p>Generated on March 5, 2024</p>
          <button className="download-link">Download Excel</button>
        </div>
        <div className="report-item">
          <h4>Quarterly School Ranking</h4>
          <p>Generated on Feb 28, 2024</p>
          <button className="download-link">Download PDF</button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
