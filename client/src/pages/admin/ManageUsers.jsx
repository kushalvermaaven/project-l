import React, { useState } from 'react';
import { Search, Ban, Trash2, Eye } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Tabs from '../../components/ui/Tabs';
import { sampleArtists } from '../../data/sampleData';

const ManageUsers = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  // Create mock users from artists
  const users = [
    ...sampleArtists.map(a => ({...a, role: 'Artist', status: 'Active'})),
    { id: 'b1', name: 'Rahul Verma', email: 'rahul@example.com', avatar: 'https://i.pravatar.cc/150?u=b1', role: 'Buyer', status: 'Active' },
    { id: 'b2', name: 'Sneha Patel', email: 'sneha@example.com', avatar: 'https://i.pravatar.cc/150?u=b2', role: 'Buyer', status: 'Inactive' }
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Manage Users</h1>
          <p className="text-gray-400">Total Users: {users.length}</p>
        </div>
      </div>

      <Card className="bg-white/5 border-white/10">
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <Tabs tabs={['All', 'Buyers', 'Artists', 'Admins']} activeTab={activeTab} onChange={setActiveTab} />
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input placeholder="Search users..." className="pl-10" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                <th className="p-4 font-medium">User</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {users.map(user => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={user.avatar || user.profileImage} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <p className="text-white font-medium">{user.name}</p>
                        <p className="text-xs text-gray-400">{user.email || 'user@example.com'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge variant={user.role === 'Artist' ? 'primary' : 'secondary'}>{user.role}</Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant={user.status === 'Active' ? 'success' : 'danger'}>{user.status}</Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-amber-400 bg-white/5 rounded-lg"><Ban className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-400 hover:text-red-400 bg-white/5 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default ManageUsers;
