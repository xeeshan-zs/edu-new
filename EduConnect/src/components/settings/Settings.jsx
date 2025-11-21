import { useState } from 'react';
import { Save, Shield, Bell, Key, Database, Mail, Globe } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card.jsx';
import { Button } from '../ui/button.jsx';
import { Input } from '../ui/input.jsx';
import { Label } from '../ui/label.jsx';
import { Switch } from '../ui/switch.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs.jsx';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select.jsx';

export default function Settings() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [autoApproval, setAutoApproval] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const handleSaveSettings = () => {
    console.log('Saving settings...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Settings & Access Control</h1>
        <p className="text-gray-600 mt-1">Configure system settings and admin roles</p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="admins">Admin Roles</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe size={20} />
                Platform Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platformName">Platform Name</Label>
                  <Input id="platformName" defaultValue="EduConnect" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="platformUrl">Platform URL</Label>
                  <Input id="platformUrl" defaultValue="https://educonnect.com" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input id="supportEmail" type="email" defaultValue="support@educonnect.com" className="mt-2" />
                </div>
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="est">
                    <SelectTrigger id="timezone" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="est">Eastern Time (EST)</SelectItem>
                      <SelectItem value="cst">Central Time (CST)</SelectItem>
                      <SelectItem value="mst">Mountain Time (MST)</SelectItem>
                      <SelectItem value="pst">Pacific Time (PST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="mb-4">Approval Workflow</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p>Auto-approve schools</p>
                      <p className="text-sm text-gray-500">Automatically approve school registrations that meet criteria</p>
                    </div>
                    <Switch checked={autoApproval} onCheckedChange={setAutoApproval} />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-[#2563EB] hover:bg-blue-700" onClick={handleSaveSettings}>
                  <Save size={20} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database size={20} />
                Data Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="dataRetention">Data Retention Period</Label>
                <Select defaultValue="2years">
                  <SelectTrigger id="dataRetention" className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1year">1 Year</SelectItem>
                    <SelectItem value="2years">2 Years</SelectItem>
                    <SelectItem value="3years">3 Years</SelectItem>
                    <SelectItem value="5years">5 Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <h3 className="mb-3">Backup & Export</h3>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <Database size={16} className="mr-2" />
                    Backup Database
                  </Button>
                  <Button variant="outline">
                    <Database size={16} className="mr-2" />
                    Export All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield size={20} />
                Security Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p>Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500">Require 2FA for all admin accounts</p>
                  </div>
                  <Switch checked={twoFactorAuth} onCheckedChange={setTwoFactorAuth} />
                </div>

                <div>
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Input id="sessionTimeout" type="number" defaultValue="60" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="passwordPolicy">Password Policy</Label>
                  <Select defaultValue="strong">
                    <SelectTrigger id="passwordPolicy" className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic (8 characters)</SelectItem>
                      <SelectItem value="strong">Strong (12 characters, mixed)</SelectItem>
                      <SelectItem value="very-strong">Very Strong (16 characters, all types)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="mb-4">API Keys</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Input type="password" value="sk_live_xxxxxxxxxxxxx" readOnly />
                    <Button variant="outline">
                      <Key size={16} className="mr-2" />
                      Regenerate
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-[#2563EB] hover:bg-blue-700" onClick={handleSaveSettings}>
                  <Save size={20} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { action: 'User login', user: 'admin@educonnect.com', time: '2025-10-30 09:30 AM' },
                  { action: 'Settings updated', user: 'admin@educonnect.com', time: '2025-10-30 09:15 AM' },
                  { action: 'School approved', user: 'sarah.j@educonnect.com', time: '2025-10-30 08:45 AM' },
                  { action: 'New user created', user: 'admin@educonnect.com', time: '2025-10-29 04:30 PM' },
                ].map((log, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm">{log.action}</p>
                      <p className="text-xs text-gray-500">by {log.user}</p>
                    </div>
                    <p className="text-xs text-gray-500">{log.time}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell size={20} />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p>Email Notifications</p>
                    <p className="text-sm text-gray-500">Receive updates via email</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>

                <div className="flex items-center justify-between pb-4 border-b">
                  <div>
                    <p>Push Notifications</p>
                    <p className="text-sm text-gray-500">Receive browser push notifications</p>
                  </div>
                  <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="mb-4">Email Notification Types</h3>
                <div className="space-y-3">
                  {[
                    { label: 'New school registrations', checked: true },
                    { label: 'New vendor applications', checked: true },
                    { label: 'Support ticket updates', checked: true },
                    { label: 'System alerts', checked: true },
                    { label: 'Weekly analytics reports', checked: false },
                    { label: 'Monthly summaries', checked: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <p className="text-sm">{item.label}</p>
                      <Switch defaultChecked={item.checked} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-[#2563EB] hover:bg-blue-700" onClick={handleSaveSettings}>
                  <Save size={20} className="mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail size={20} />
                Email Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  'School Approval Email',
                  'School Rejection Email',
                  'Vendor Welcome Email',
                  'Password Reset Email',
                  'Weekly Report Email',
                ].map((template, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <p className="text-sm">{template}</p>
                    <Button variant="ghost" size="sm">Edit Template</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admin Roles */}
        <TabsContent value="admins" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Admin Users</CardTitle>
                <Button className="bg-[#2563EB] hover:bg-blue-700">
                  Add New Admin
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Name</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Role</th>
                      <th className="text-left py-3 px-4">Last Login</th>
                      <th className="text-left py-3 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'John Doe', email: 'john.doe@educonnect.com', role: 'Super Admin', lastLogin: '2025-10-30 09:30 AM' },
                      { name: 'Sarah Johnson', email: 'sarah.j@educonnect.com', role: 'School Admin', lastLogin: '2025-10-30 08:15 AM' },
                      { name: 'Michael Chen', email: 'michael.c@educonnect.com', role: 'Vendor Manager', lastLogin: '2025-10-29 04:45 PM' },
                    ].map((admin, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 px-4">{admin.name}</td>
                        <td className="py-4 px-4">{admin.email}</td>
                        <td className="py-4 px-4">{admin.role}</td>
                        <td className="py-4 px-4 text-sm">{admin.lastLogin}</td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Edit</Button>
                            <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-600">Remove</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Role Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4">Permission</th>
                      <th className="text-center py-3 px-4">Super Admin</th>
                      <th className="text-center py-3 px-4">School Admin</th>
                      <th className="text-center py-3 px-4">Vendor Manager</th>
                      <th className="text-center py-3 px-4">Support Staff</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { permission: 'Manage Schools', super: true, school: true, vendor: false, support: false },
                      { permission: 'Manage Vendors', super: true, school: false, vendor: true, support: false },
                      { permission: 'Manage Users', super: true, school: true, vendor: false, support: false },
                      { permission: 'View Analytics', super: true, school: true, vendor: true, support: false },
                      { permission: 'Handle Tickets', super: true, school: false, vendor: false, support: true },
                      { permission: 'System Settings', super: true, school: false, vendor: false, support: false },
                    ].map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-4 px-4">{item.permission}</td>
                        <td className="py-4 px-4 text-center">
                          {item.super && <span className="text-[#16A34A]">✓</span>}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {item.school && <span className="text-[#16A34A]">✓</span>}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {item.vendor && <span className="text-[#16A34A]">✓</span>}
                        </td>
                        <td className="py-4 px-4 text-center">
                          {item.support && <span className="text-[#16A34A]">✓</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
