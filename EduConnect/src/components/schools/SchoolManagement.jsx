import { useState } from 'react';
import { Search, Filter, Plus, Check, X, Eye, MapPin, Phone, Mail } from 'lucide-react';
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

export default function SchoolManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const schools = [
    {
      id: 1,
      name: 'Springfield High School',
      location: 'Springfield, IL',
      principal: 'Dr. Sarah Johnson',
      email: 'admin@springfield.edu',
      phone: '+1 555-0123',
      students: 1250,
      status: 'pending',
      registeredDate: '2025-10-25',
      type: 'Public',
      established: 1998,
    },
    {
      id: 2,
      name: 'Riverside Academy',
      location: 'Riverside, CA',
      principal: 'Mr. James Wilson',
      email: 'contact@riverside.edu',
      phone: '+1 555-0456',
      students: 850,
      status: 'approved',
      registeredDate: '2025-09-15',
      type: 'Private',
      established: 2005,
    },
    {
      id: 3,
      name: 'Oakwood International',
      location: 'Chicago, IL',
      principal: 'Ms. Emily Chen',
      email: 'info@oakwood.edu',
      phone: '+1 555-0789',
      students: 2100,
      status: 'approved',
      registeredDate: '2025-08-20',
      type: 'International',
      established: 2010,
    },
    {
      id: 4,
      name: 'Greenville Elementary',
      location: 'Greenville, TX',
      principal: 'Mrs. Patricia Brown',
      email: 'office@greenville.edu',
      phone: '+1 555-0321',
      students: 450,
      status: 'rejected',
      registeredDate: '2025-10-20',
      type: 'Public',
      established: 1985,
    },
    {
      id: 5,
      name: 'Tech Valley High',
      location: 'San Jose, CA',
      principal: 'Dr. Michael Torres',
      email: 'admin@techvalley.edu',
      phone: '+1 555-0654',
      students: 1800,
      status: 'pending',
      registeredDate: '2025-10-28',
      type: 'Charter',
      established: 2015,
    },
  ];

  const getStatusBadge = (status) => {
    const variants = {
      pending: { variant: 'secondary', text: 'Pending' },
      approved: { variant: 'default', text: 'Approved', className: 'bg-[#16A34A]' },
      rejected: { variant: 'destructive', text: 'Rejected' },
    };
    const config = variants[status];
    return <Badge variant={config.variant} className={config.className}>{config.text}</Badge>;
  };

  const filteredSchools = schools.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         school.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || school.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApprove = (schoolId) => {
    console.log('Approving school:', schoolId);
    // Add approval logic here
  };

  const handleReject = (schoolId) => {
    console.log('Rejecting school:', schoolId);
    // Add rejection logic here
  };

  const handleViewDetails = (school) => {
    setSelectedSchool(school);
    setShowDetailsDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1>School Management</h1>
          <p className="text-gray-600 mt-1">Manage school registrations and approvals</p>
        </div>
        <Button className="bg-[#2563EB] hover:bg-blue-700">
          <Plus size={20} className="mr-2" />
          Add School
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Total Schools</p>
            <h2 className="mt-2">1,284</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Approved</p>
            <h2 className="mt-2 text-[#16A34A]">1,156</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Pending</p>
            <h2 className="mt-2 text-yellow-600">98</h2>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-600">Rejected</p>
            <h2 className="mt-2 text-red-600">30</h2>
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
                placeholder="Search schools by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Schools Table */}
      <Card>
        <CardHeader>
          <CardTitle>Schools ({filteredSchools.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">School Name</th>
                  <th className="text-left py-3 px-4">Location</th>
                  <th className="text-left py-3 px-4">Principal</th>
                  <th className="text-left py-3 px-4">Students</th>
                  <th className="text-left py-3 px-4">Type</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.map((school) => (
                  <tr key={school.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <p>{school.name}</p>
                      <p className="text-sm text-gray-500">{school.email}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} className="text-gray-400" />
                        <span className="text-sm">{school.location}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">{school.principal}</td>
                    <td className="py-4 px-4">{school.students.toLocaleString()}</td>
                    <td className="py-4 px-4">
                      <Badge variant="outline">{school.type}</Badge>
                    </td>
                    <td className="py-4 px-4">{getStatusBadge(school.status)}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(school)}
                        >
                          <Eye size={16} />
                        </Button>
                        {school.status === 'pending' && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-[#16A34A] hover:text-[#16A34A] hover:bg-green-50"
                              onClick={() => handleApprove(school.id)}
                            >
                              <Check size={16} />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-600 hover:bg-red-50"
                              onClick={() => handleReject(school.id)}
                            >
                              <X size={16} />
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
        </CardContent>
      </Card>

      {/* School Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>School Details</DialogTitle>
            <DialogDescription>Complete information about the school</DialogDescription>
          </DialogHeader>
          {selectedSchool && (
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">School Name</p>
                  <p className="mt-1">{selectedSchool.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <div className="mt-1">{getStatusBadge(selectedSchool.status)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Principal</p>
                  <p className="mt-1">{selectedSchool.principal}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">School Type</p>
                  <p className="mt-1">{selectedSchool.type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin size={16} className="text-gray-400" />
                    <span>{selectedSchool.location}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Established</p>
                  <p className="mt-1">{selectedSchool.established}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail size={16} className="text-gray-400" />
                    <span className="text-sm">{selectedSchool.email}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone size={16} className="text-gray-400" />
                    <span className="text-sm">{selectedSchool.phone}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="mt-1">{selectedSchool.students.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Registration Date</p>
                  <p className="mt-1">{new Date(selectedSchool.registeredDate).toLocaleDateString()}</p>
                </div>
              </div>

              {selectedSchool.status === 'pending' && (
                <div className="flex gap-3 pt-4 border-t">
                  <Button
                    className="flex-1 bg-[#16A34A] hover:bg-green-700"
                    onClick={() => {
                      handleApprove(selectedSchool.id);
                      setShowDetailsDialog(false);
                    }}
                  >
                    <Check size={20} className="mr-2" />
                    Approve School
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => {
                      handleReject(selectedSchool.id);
                      setShowDetailsDialog(false);
                    }}
                  >
                    <X size={20} className="mr-2" />
                    Reject School
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
