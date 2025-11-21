import { useState } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Shield, UserCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Badge } from '../ui/badge.jsx';
import { Input } from '../ui/input.jsx';
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
import { Label } from '../ui/label.jsx';

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@educonnect.com',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2025-10-30 09:30 AM',
      createdDate: '2024-01-15',
      permissions: ['all'],
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@educonnect.com',
      role: 'School Admin',
      status: 'active',
      lastLogin: '2025-10-30 08:15 AM',
      createdDate: '2024-03-20',
      permissions: ['schools', 'users', 'analytics'],
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.c@educonnect.com',
      role: 'Vendor Manager',
      status: 'active',
      lastLogin: '2025-10-29 04:45 PM',
      createdDate: '2024-05-10',
      permissions: ['vendors', 'analytics'],
    },
    {
      id: 4,
      name: 'Emily Brown',
      email: 'emily.b@educonnect.com',
      role: 'Support Staff',
      status: 'active',
      lastLogin: '2025-10-30 10:00 AM',
      createdDate: '2024-07-05',
      permissions: ['communication', 'tickets'],
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.w@educonnect.com',
      role: 'Analyst',
      status: 'inactive',
      lastLogin: '2025-10-15 02:30 PM',
      createdDate: '2024-02-28',
      permissions: ['analytics', 'reports'],
    },
    {
      id: 6,
      name: 'Maria Garcia',
      email: 'maria.g@educonnect.com',
      role: 'School Admin',
      status: 'active',
      lastLogin: '2025-10-30 07:45 AM',
      createdDate: '2024-06-12',
      permissions: ['schools', 'users'],
    },
  ];

  const roles = ['Super Admin', 'School Admin', 'Vendor Manager', 'Support Staff', 'Analyst'];

  const getStatusBadge = (status) => {
    return status === 'active' ? (
      <Badge variant="default" className="bg-[#16A34A]">Active</Badge>
    ) : (
      <Badge variant="outline">Inactive</Badge>
    );
  };

  const getRoleBadge = (role) => {
    const colors = {
      'Super Admin': 'bg-purple-100 text-purple-700',
      'School Admin': 'bg-blue-100 text-blue-700',
      'Vendor Manager': 'bg-green-100 text-green-700',
      'Support Staff': 'bg-orange-100 text-orange-700',
      'Analyst': 'bg-yellow-100 text-yellow-700',
    };
    return <Badge variant="secondary" className={colors[role]}>{role}</Badge>;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsDialog(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditDialog(true);
  };

  const handleDeleteUser = (userId) => {
    console.log('Deleting user:', userId);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>User Management</h1>
          <p className="text-gray-600 mt-1">Manage system users and their roles</p>
        </div>
        <Button className="bg-[#2563EB] hover:bg-blue-700">
          <Plus size={20} className="mr-2" />
          Add User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Total Users</p>
            <h2 className="mt-2">28,492</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Active Users</p>
            <h2 className="mt-2 text-[#16A34A]">26,134</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Admins</p>
            <h2 className="mt-2 text-purple-600">245</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Inactive</p>
            <h2 className="mt-2 text-gray-600">2,358</h2>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search users by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Roles" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role} value={role}>{role}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">User</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Last Login</th>
                  <th className="text-left py-3 px-4">Created Date</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center text-white">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <p>{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">{getRoleBadge(user.role)}</td>
                    <td className="py-4 px-4">{getStatusBadge(user.status)}</td>
                    <td className="py-4 px-4 text-sm">{user.lastLogin}</td>
                    <td className="py-4 px-4 text-sm">
                      {new Date(user.createdDate).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(user)}
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600 hover:text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* User Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>Complete information about the user</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6 mt-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#2563EB] flex items-center justify-center text-white text-xl">
                  {selectedUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3>{selectedUser.name}</h3>
                  <p className="text-gray-600">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <div className="mt-1">{getRoleBadge(selectedUser.role)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Login</p>
                  <p className="mt-1">{selectedUser.lastLogin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Created Date</p>
                  <p className="mt-1">{new Date(selectedUser.createdDate).toLocaleDateString()}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500 mb-2">Permissions</p>
                <div className="flex flex-wrap gap-2">
                  {selectedUser.permissions.map((permission) => (
                    <Badge key={permission} variant="outline">
                      <Shield size={12} className="mr-1" />
                      {permission}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information and role</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4 mt-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue={selectedUser.name} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={selectedUser.email} className="mt-1" />
              </div>
              <div>
                <Label htmlFor="role">Role</Label>
                <Select defaultValue={selectedUser.role}>
                  <SelectTrigger id="role" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={selectedUser.status}>
                  <SelectTrigger id="status" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button className="flex-1 bg-[#2563EB] hover:bg-blue-700">
                  Save Changes
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowEditDialog(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
