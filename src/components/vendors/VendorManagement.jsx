import { useState } from 'react';
import { Search, Filter, Plus, Check, X, Eye, Package, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Badge } from '../ui/badge.jsx';
import { Input } from '../ui/input.jsx';
import './VendorManagement.css';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select.jsx';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog.jsx';

export default function VendorManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const vendors = [
    {
      id: 1,
      name: 'TechBooks Inc',
      category: 'Books & Stationery',
      contact: 'John Smith',
      email: 'contact@techbooks.com',
      phone: '+1 555-1234',
      rating: 4.5,
      totalOrders: 234,
      status: 'active',
      joinedDate: '2024-05-15',
      products: 156,
      verified: true,
    },
    {
      id: 2,
      name: 'Smart Uniforms Ltd',
      category: 'Uniforms',
      contact: 'Sarah Johnson',
      email: 'info@smartuniforms.com',
      phone: '+1 555-5678',
      rating: 4.8,
      totalOrders: 189,
      status: 'pending',
      joinedDate: '2025-10-20',
      products: 45,
      verified: false,
    },
    {
      id: 3,
      name: 'Digital Learning Solutions',
      category: 'Technology',
      contact: 'Mike Chen',
      email: 'support@digitallearn.com',
      phone: '+1 555-9012',
      rating: 4.7,
      totalOrders: 312,
      status: 'active',
      joinedDate: '2024-03-10',
      products: 89,
      verified: true,
    },
    {
      id: 4,
      name: 'Fresh Meals Catering',
      category: 'Food Services',
      contact: 'Maria Garcia',
      email: 'orders@freshmeals.com',
      phone: '+1 555-3456',
      rating: 4.3,
      totalOrders: 445,
      status: 'active',
      joinedDate: '2024-01-25',
      products: 23,
      verified: true,
    },
    {
      id: 5,
      name: 'Safe Transport Co',
      category: 'Transportation',
      contact: 'David Wilson',
      email: 'contact@safetransport.com',
      phone: '+1 555-7890',
      rating: 4.6,
      totalOrders: 178,
      status: 'inactive',
      joinedDate: '2023-11-05',
      products: 12,
      verified: true,
    },
  ];

  const categories = [
    'Books & Stationery',
    'Technology',
    'Food Services',
    'Transportation',
    'Uniforms',
  ];

  const getStatusBadge = (status) => {
    const variants = {
      active: { variant: 'default', text: 'Active', className: 'bg-[#16A34A]' },
      pending: { variant: 'secondary', text: 'Pending' },
      inactive: { variant: 'outline', text: 'Inactive' },
    };
    const config = variants[status];
    return <Badge variant={config.variant} className={config.className}>{config.text}</Badge>;
  };

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || vendor.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || vendor.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleViewDetails = (vendor) => {
    setSelectedVendor(vendor);
    setShowDetailsDialog(true);
  };

  const handleApprove = (vendorId) => {
    console.log('Approving vendor:', vendorId);
  };

  const handleReject = (vendorId) => {
    console.log('Rejecting vendor:', vendorId);
  };

  return (
    <div className="vendor-management-page">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-content">
          <h1 className="page-title">Vendor Management</h1>
          <p className="page-subtitle">Manage vendors and service providers efficiently</p>
        </div>
        <Button className="btn-primary-landing">
          <Plus size={20} className="mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Stats Cards - Landing Page Style */}
      <div className="stats-grid">
        <div className="stat-card" style={{ '--card-color': '#f0f9ff' }}>
          <div className="stat-card-header">
            <p className="stat-label">Total Vendors</p>
            <div className="stat-icon-wrapper" style={{ backgroundColor: '#f0f9ff' }}>
              <Package className="stat-icon" size={24} />
            </div>
          </div>
          <h2 className="stat-value">456</h2>
          <p className="stat-change positive">+12% from last month</p>
        </div>
        <div className="stat-card" style={{ '--card-color': '#fef7cd' }}>
          <div className="stat-card-header">
            <p className="stat-label">Active</p>
            <div className="stat-icon-wrapper" style={{ backgroundColor: '#fef7cd' }}>
              <Check className="stat-icon" size={24} />
            </div>
          </div>
          <h2 className="stat-value" style={{ color: '#16A34A' }}>398</h2>
          <p className="stat-change positive">87% of total</p>
        </div>
        <div className="stat-card" style={{ '--card-color': '#f3e8ff' }}>
          <div className="stat-card-header">
            <p className="stat-label">Pending</p>
            <div className="stat-icon-wrapper" style={{ backgroundColor: '#f3e8ff' }}>
              <Filter className="stat-icon" size={24} />
            </div>
          </div>
          <h2 className="stat-value" style={{ color: '#a855f7' }}>42</h2>
          <p className="stat-change" style={{ color: '#a855f7' }}>9% awaiting review</p>
        </div>
        <div className="stat-card" style={{ '--card-color': '#dcfce7' }}>
          <div className="stat-card-header">
            <p className="stat-label">Inactive</p>
            <div className="stat-icon-wrapper" style={{ backgroundColor: '#dcfce7' }}>
              <X className="stat-icon" size={24} />
            </div>
          </div>
          <h2 className="stat-value" style={{ color: '#64748b' }}>16</h2>
          <p className="stat-change" style={{ color: '#64748b' }}>4% of total</p>
        </div>
      </div>

      {/* Filters and Search - Landing Page Style */}
      <div className="filters-card">
        <div className="filters-content">
          <div className="filters-row">
            <div className="search-wrapper">
              <Search className="search-icon" size={20} />
              <Input
                type="text"
                placeholder="Search vendors by name or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="filter-select">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="filter-select">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Vendors Table - Landing Page Style */}
      <div className="table-card">
        <div className="table-header">
          <h3 className="table-title">Vendors ({filteredVendors.length})</h3>
        </div>
        <div className="table-content">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Vendor Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Contact</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Rating</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Orders</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredVendors.map((vendor) => (
                  <tr key={vendor.id} className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-white transition-all duration-200">
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center shadow-sm">
                          <Package size={22} className="text-[#2563EB]" />
                        </div>
                        <div>
                          <p className="flex items-center gap-2 font-semibold text-gray-900">
                            {vendor.name}
                            {vendor.verified && (
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-green-100">
                                <Check size={12} className="text-[#16A34A]" />
                              </span>
                            )}
                          </p>
                          <p className="text-sm text-gray-500 mt-0.5">{vendor.products} products</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <Badge variant="outline" className="border-gray-200 text-gray-700 font-medium px-3 py-1 rounded-lg">{vendor.category}</Badge>
                    </td>
                    <td className="py-5 px-6">
                      <p className="font-medium text-gray-900">{vendor.contact}</p>
                      <p className="text-sm text-gray-500 mt-0.5">{vendor.email}</p>
                    </td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-1.5">
                        <Star size={18} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold text-gray-900">{vendor.rating}</span>
                      </div>
                    </td>
                    <td className="py-5 px-6">
                      <span className="font-semibold text-gray-900">{vendor.totalOrders}</span>
                    </td>
                    <td className="py-5 px-6">{getStatusBadge(vendor.status)}</td>
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(vendor)}
                          className="hover:bg-blue-50 hover:text-[#2563EB] rounded-lg transition-colors"
                        >
                          <Eye size={18} />
                        </Button>
                        {vendor.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#16A34A] hover:text-[#16A34A] hover:bg-green-50 rounded-lg transition-colors"
                              onClick={() => handleApprove(vendor.id)}
                            >
                              <Check size={18} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              onClick={() => handleReject(vendor.id)}
                            >
                              <X size={18} />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Vendor Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4 border-b border-gray-200">
            <DialogTitle className="text-2xl font-bold text-gray-900">Vendor Details</DialogTitle>
            <DialogDescription className="text-gray-500 mt-1">Complete information about the vendor</DialogDescription>
          </DialogHeader>
          {selectedVendor && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Vendor Name</p>
                  <p className="mt-1 flex items-center gap-2">
                    {selectedVendor.name}
                    {selectedVendor.verified && (
                      <Badge variant="default" className="bg-[#16A34A]">Verified</Badge>
                    )}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedVendor.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="mt-1">{selectedVendor.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Contact Person</p>
                  <p className="mt-1">{selectedVendor.contact}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="mt-1 text-sm">{selectedVendor.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="mt-1">{selectedVendor.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Rating</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span>{selectedVendor.rating} / 5.0</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Orders</p>
                  <p className="mt-1">{selectedVendor.totalOrders}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Products Listed</p>
                  <p className="mt-1">{selectedVendor.products}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Joined Date</p>
                  <p className="mt-1">{new Date(selectedVendor.joinedDate).toLocaleDateString()}</p>
                </div>
              </div>

              {selectedVendor.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    className="flex-1 bg-[#16A34A] hover:bg-green-700"
                    onClick={() => {
                      handleApprove(selectedVendor.id);
                      setShowDetailsDialog(false);
                    }}
                  >
                    <Check size={20} className="mr-2" />
                    Approve Vendor
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      handleReject(selectedVendor.id);
                      setShowDetailsDialog(false);
                    }}
                  >
                    <X size={20} className="mr-2" />
                    Reject Vendor
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
