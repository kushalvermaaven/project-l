import React from 'react';
import { DollarSign, Percent, Wallet, Clock } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { sampleOrders } from '../../data/sampleData';
import { formatPrice, formatDate } from '../../utils/helpers';

const mockEarningsData = [
  { month: 'Jan', gross: 40000, net: 35200 },
  { month: 'Feb', gross: 30000, net: 26400 },
  { month: 'Mar', gross: 20000, net: 17600 },
  { month: 'Apr', gross: 27800, net: 24464 },
  { month: 'May', gross: 18900, net: 16632 },
  { month: 'Jun', gross: 23900, net: 21032 },
  { month: 'Jul', gross: 34900, net: 30712 },
  { month: 'Aug', gross: 45000, net: 39600 },
  { month: 'Sep', gross: 50000, net: 44000 },
  { month: 'Oct', gross: 60000, net: 52800 },
  { month: 'Nov', gross: 55000, net: 48400 },
  { month: 'Dec', gross: 70000, net: 61600 },
];

const mockCategoryData = [
  { name: 'Digital Art', value: 35, color: '#8b5cf6' },
  { name: 'Paintings', value: 25, color: '#06b6d4' },
  { name: 'Abstract', value: 20, color: '#ec4899' },
  { name: 'Portraits', value: 15, color: '#f97316' },
  { name: 'Other', value: 5, color: '#10b981' },
];

const Earnings = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-white">Earnings</h1>
        <select className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500">
          <option>This Year</option>
          <option>Last Year</option>
          <option>All Time</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-white/5 border-white/10">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-purple-500/20"><DollarSign className="w-6 h-6 text-purple-400" /></div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Gross Sales</h3>
          <p className="text-2xl font-bold text-white">₹1,50,000</p>
        </Card>
        <Card className="p-6 bg-white/5 border-white/10">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-pink-500/20"><Percent className="w-6 h-6 text-pink-400" /></div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Commission (12%)</h3>
          <p className="text-2xl font-bold text-red-400">-₹18,000</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-purple-600/20 to-cyan-500/20 border-purple-500/30">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-green-500/20"><Wallet className="w-6 h-6 text-green-400" /></div>
          </div>
          <h3 className="text-gray-300 text-sm mb-1">Net Earnings</h3>
          <p className="text-2xl font-bold text-green-400">₹1,32,000</p>
        </Card>
        <Card className="p-6 bg-white/5 border-white/10">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 rounded-xl bg-amber-500/20"><Clock className="w-6 h-6 text-amber-400" /></div>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Pending Payouts</h3>
          <p className="text-2xl font-bold text-amber-400">₹25,000</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="p-6 bg-white/5 border-white/10 lg:col-span-2">
          <h2 className="text-xl font-heading font-bold text-white mb-6">Earnings Overview</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockEarningsData}>
                <defs>
                  <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorNet" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="month" stroke="#6b6b80" />
                <YAxis stroke="#6b6b80" />
                <Tooltip contentStyle={{ backgroundColor: '#13131a', borderColor: '#ffffff10' }} />
                <Legend />
                <Area type="monotone" dataKey="gross" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorGross)" name="Gross Sales" />
                <Area type="monotone" dataKey="net" stroke="#06b6d4" fillOpacity={1} fill="url(#colorNet)" name="Net Earnings" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10">
          <h2 className="text-xl font-heading font-bold text-white mb-6">Sales by Category</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={mockCategoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {mockCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#13131a', borderColor: '#ffffff10' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="p-6 bg-white/5 border-white/10 overflow-hidden">
        <h2 className="text-xl font-heading font-bold text-white mb-6">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-sm text-gray-400">
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Artwork</th>
                <th className="p-4 font-medium">Buyer</th>
                <th className="p-4 font-medium">Gross</th>
                <th className="p-4 font-medium">Net</th>
                <th className="p-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {sampleOrders.slice(0, 5).map((order, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-gray-300">{formatDate(order.createdAt)}</td>
                  <td className="p-4 text-white font-medium">{order.artwork.title}</td>
                  <td className="p-4 text-gray-400">{order.buyer.name}</td>
                  <td className="p-4 text-gray-300">{formatPrice(order.totalAmount)}</td>
                  <td className="p-4 text-green-400">{formatPrice(order.totalAmount * 0.88)}</td>
                  <td className="p-4">
                    <Badge variant={order.status === 'Delivered' ? 'success' : 'warning'}>{order.status}</Badge>
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

export default Earnings;
