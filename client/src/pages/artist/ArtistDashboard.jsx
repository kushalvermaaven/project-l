import React, { useContext } from 'react';
import { DollarSign, Image, ShoppingBag, MessageCircle, Clock, Heart, CheckCircle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { AuthContext } from '../../contexts/AuthContext';
import { sampleOrders, sampleCustomRequests } from '../../data/sampleData';
import { formatPrice, timeAgo } from '../../utils/helpers';
import { Link } from 'react-router-dom';

const mockChartData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 2000 },
  { name: 'Apr', revenue: 2780 },
  { name: 'May', revenue: 1890 },
  { name: 'Jun', revenue: 2390 },
  { name: 'Jul', revenue: 3490 },
  { name: 'Aug', revenue: 4500 },
  { name: 'Sep', revenue: 5000 },
  { name: 'Oct', revenue: 6000 },
  { name: 'Nov', revenue: 5500 },
  { name: 'Dec', revenue: 7000 },
];

const ArtistDashboard = () => {
  const { user } = useContext(AuthContext);

  const stats = [
    { label: 'Total Sales', value: '₹1,24,500', icon: <DollarSign className="w-6 h-6 text-purple-400" />, trend: '+12% this month' },
    { label: 'Active Artworks', value: '12', icon: <Image className="w-6 h-6 text-cyan-400" />, trend: '2 added this week' },
    { label: 'Pending Orders', value: '3', icon: <ShoppingBag className="w-6 h-6 text-pink-400" />, trend: 'Needs action' },
    { label: 'Messages', value: '5', icon: <MessageCircle className="w-6 h-6 text-green-400" />, trend: '2 unread' },
  ];

  const recentActivity = [
    { id: 1, text: 'New order received for "Cosmic Dreams"', time: '2 hours ago', icon: <ShoppingBag className="w-4 h-4 text-purple-400" /> },
    { id: 2, text: 'Artwork "Urban Chaos" was liked', time: '5 hours ago', icon: <Heart className="w-4 h-4 text-pink-400" /> },
    { id: 3, text: 'New message from Rahul', time: '1 day ago', icon: <MessageCircle className="w-4 h-4 text-cyan-400" /> },
    { id: 4, text: 'Custom request accepted', time: '2 days ago', icon: <CheckCircle className="w-4 h-4 text-green-400" /> },
  ];

  return (
    <DashboardLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">Welcome back, {user?.name || 'Artist'}!</h1>
          <Badge variant="primary" className="bg-purple-600/20 text-purple-400 border-purple-500/30">Artist</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx} className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-purple-500/50 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-xl bg-white/5">{stat.icon}</div>
            </div>
            <h3 className="text-gray-400 text-sm mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold text-white mb-2">{stat.value}</p>
            <p className="text-xs text-purple-400">{stat.trend}</p>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-heading font-bold text-white">Revenue Overview</h2>
          <div className="flex space-x-2">
            {['Weekly', 'Monthly', 'Yearly'].map((tab) => (
              <button key={tab} className={`px-4 py-1 text-sm rounded-lg ${tab === 'Monthly' ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}>{tab}</button>
            ))}
          </div>
        </div>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
              <XAxis dataKey="name" stroke="#6b6b80" />
              <YAxis stroke="#6b6b80" tickFormatter={(value) => `₹${value}`} />
              <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: '#ffffff10', borderRadius: '8px' }} itemStyle={{ color: '#8b5cf6' }} />
              <Area type="monotone" dataKey="revenue" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-6 bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-heading font-bold text-white">Recent Orders</h2>
            <Link to="/artist-dashboard/orders" className="text-sm text-purple-400 hover:text-purple-300">View All</Link>
          </div>
          <div className="space-y-4">
            {sampleOrders.slice(0, 5).map(order => (
              <div key={order.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center space-x-4">
                  <img src={order.artwork.images[0]} alt={order.artwork.title} className="w-12 h-12 rounded-lg object-cover" />
                  <div>
                    <p className="text-white font-medium">{order.artwork.title}</p>
                    <p className="text-sm text-gray-400">{order.buyer.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white">{formatPrice(order.totalAmount)}</p>
                  <Badge className="mt-1" variant={order.status === 'Delivered' ? 'success' : 'warning'}>{order.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white/5 backdrop-blur-xl border border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-heading font-bold text-white">Custom Requests</h2>
            <Link to="/artist-dashboard/requests" className="text-sm text-purple-400 hover:text-purple-300">View All</Link>
          </div>
          <div className="space-y-4">
            {sampleCustomRequests.slice(0, 3).map(req => (
              <div key={req.id} className="p-4 rounded-lg bg-white/5 border border-white/5">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-white font-medium">{req.buyer.name}</p>
                  <Badge variant={req.status === 'Pending' ? 'warning' : 'primary'}>{req.status}</Badge>
                </div>
                <p className="text-sm text-gray-400 line-clamp-2 mb-3">{req.description}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-cyan-400">{formatPrice(req.budget.min)} - {formatPrice(req.budget.max)}</span>
                  <span className="text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white/5 backdrop-blur-xl border border-white/10">
        <h2 className="text-xl font-heading font-bold text-white mb-6">Recent Activity</h2>
        <div className="space-y-6">
          {recentActivity.map((activity, idx) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="mt-1 p-2 rounded-full bg-white/5">{activity.icon}</div>
              <div>
                <p className="text-gray-300">{activity.text}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </DashboardLayout>
  );
};

export default ArtistDashboard;
