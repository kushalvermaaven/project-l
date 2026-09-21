import React from 'react';
import { Users, Palette, Image as ImageIcon, DollarSign, TrendingUp, ShoppingBag } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';

const mockSalesData = [
  { name: 'Jan', sales: 4000 }, { name: 'Feb', sales: 3000 }, { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 }, { name: 'May', sales: 6000 }, { name: 'Jun', sales: 7000 },
];

const mockUserData = [
  { name: 'Jan', buyers: 120, artists: 30 }, { name: 'Feb', buyers: 150, artists: 40 },
  { name: 'Mar', buyers: 180, artists: 45 }, { name: 'Apr', buyers: 220, artists: 55 },
  { name: 'May', buyers: 260, artists: 65 }, { name: 'Jun', buyers: 310, artists: 80 },
];

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Users', value: '1,247', icon: <Users className="w-6 h-6 text-purple-400" />, trend: '+15%' },
    { label: 'Total Artists', value: '342', icon: <Palette className="w-6 h-6 text-cyan-400" />, trend: '+8%' },
    { label: 'Total Artworks', value: '2,891', icon: <ImageIcon className="w-6 h-6 text-pink-400" />, trend: '+22%' },
    { label: 'Total GMV', value: '₹45.6L', icon: <DollarSign className="w-6 h-6 text-green-400" />, trend: '+18%' },
    { label: 'Platform Revenue', value: '₹5.4L', icon: <TrendingUp className="w-6 h-6 text-orange-400" />, trend: '+18%' },
    { label: 'Active Orders', value: '89', icon: <ShoppingBag className="w-6 h-6 text-amber-400" />, trend: '-2%' },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Admin Dashboard</h1>
          <Badge variant="danger" className="bg-red-500/20 text-red-400 border-red-500/30">Super Admin</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-5 bg-white/5 border-white/10">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 rounded-lg bg-white/5">{stat.icon}</div>
            </div>
            <h3 className="text-gray-400 text-xs mb-1">{stat.label}</h3>
            <p className="text-xl font-bold text-white mb-1">{stat.value}</p>
            <p className={`text-xs ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{stat.trend}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6 bg-white/5 border-white/10">
          <h2 className="text-xl font-heading font-bold text-white mb-6">Sales Trend (6 Months)</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#6b6b80" />
                <YAxis stroke="#6b6b80" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: '#ffffff10' }} />
                <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={3} dot={{ fill: '#8b5cf6', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10">
          <h2 className="text-xl font-heading font-bold text-white mb-6">User Growth</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockUserData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#6b6b80" />
                <YAxis stroke="#6b6b80" />
                <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: '#ffffff10' }} cursor={{ fill: '#ffffff05' }} />
                <Bar dataKey="buyers" fill="var(--accent-cyan)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="artists" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
