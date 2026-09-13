import React, { useState } from 'react';
import { Search, Eye } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import Tabs from '../../components/ui/Tabs';
import { sampleOrders } from '../../data/sampleData';
import { formatPrice, formatDate } from '../../utils/helpers';

const ManageOrders = () => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white">Manage Orders</h1>
      </div>

      <Card className="bg-white/5 border-white/10">
        <div className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <Tabs tabs={['All', 'Pending', 'In Progress', 'Completed', 'Cancelled']} activeTab={activeTab} onChange={setActiveTab} />
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input placeholder="Search orders..." className="pl-10" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-gray-400">
                <th className="p-4 font-medium">Order ID</th>
                <th className="p-4 font-medium">Artwork</th>
                <th className="p-4 font-medium">Buyer</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {sampleOrders.map(order => (
                <tr key={order.id} className="hover:bg-white/5 transition-colors">
                  <td className="p-4 text-gray-400 font-mono text-sm">{order.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={order.artwork.images[0]} alt={order.artwork.title} className="w-10 h-10 rounded-lg object-cover" />
                      <p className="text-white font-medium text-sm">{order.artwork.title}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-300">{order.buyer.name}</td>
                  <td className="p-4 text-white font-medium">{formatPrice(order.totalAmount)}</td>
                  <td className="p-4">
                    <Badge variant={order.status === 'Delivered' ? 'success' : order.status === 'Processing' ? 'primary' : 'warning'}>{order.status}</Badge>
                  </td>
                  <td className="p-4">
                    <button className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg flex items-center gap-2 text-sm"><Eye className="w-4 h-4" /> View</button>
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

export default ManageOrders;
