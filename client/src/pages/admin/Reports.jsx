import React from 'react';
import { Download } from 'lucide-react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const mockRevenue = [
  { name: 'Jan', total: 40000, platform: 4800 },
  { name: 'Feb', total: 30000, platform: 3600 },
  { name: 'Mar', total: 50000, platform: 6000 },
  { name: 'Apr', total: 45000, platform: 5400 },
  { name: 'May', total: 60000, platform: 7200 },
  { name: 'Jun', total: 70000, platform: 8400 },
];

const Reports = () => {
  return (
    <DashboardLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold text-white">Reports & Analytics</h1>
        <Button variant="primary" className="flex items-center gap-2"><Download className="w-4 h-4" /> Download Report</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Card className="p-6 bg-white/5 border-white/10 lg:col-span-2">
          <h2 className="text-xl font-heading font-bold text-white mb-6">Revenue Overview</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockRevenue}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorPlatform" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                <XAxis dataKey="name" stroke="#6b6b80" />
                <YAxis stroke="#6b6b80" />
                <Tooltip contentStyle={{ backgroundColor: '#13131a', borderColor: '#ffffff10' }} />
                <Area type="monotone" dataKey="total" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorTotal)" name="Total GMV" />
                <Area type="monotone" dataKey="platform" stroke="#06b6d4" fillOpacity={1} fill="url(#colorPlatform)" name="Platform Revenue" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6 bg-white/5 border-white/10">
          <h2 className="text-xl font-heading font-bold text-white mb-6">Platform Overview</h2>
          <div className="space-y-4">
            <div className="flex justify-between pb-4 border-b border-white/10">
              <span className="text-gray-400">Average Commission</span>
              <span className="text-white font-medium">12%</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-white/10">
              <span className="text-gray-400">Total Transactions</span>
              <span className="text-white font-medium">1,247</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-white/10">
              <span className="text-gray-400">Avg Order Value</span>
              <span className="text-white font-medium">₹3,660</span>
            </div>
            <div className="flex justify-between pb-4 border-b border-white/10">
              <span className="text-gray-400">Artist Retention</span>
              <span className="text-green-400 font-medium">94%</span>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
