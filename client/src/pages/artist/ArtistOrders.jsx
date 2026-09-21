import React, { useState } from 'react';
import { Search, MapPin, Package, MessageCircle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import Input from '../../components/ui/Input';
import { sampleOrders } from '../../data/sampleData';
import { formatPrice, formatDate } from '../../utils/helpers';

const ArtistOrders = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrder, setExpandedOrder] = useState(null);

  const toggleExpand = (id) => {
    setExpandedOrder(expandedOrder === id ? null : id);
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white flex items-center gap-3">
          Orders <Badge variant="primary" className="text-sm">{sampleOrders.length}</Badge>
        </h1>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Tabs 
          tabs={['All', 'Pending', 'In Progress', 'Shipped', 'Completed']} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
          <Input 
            type="text" 
            placeholder="Search orders..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="space-y-4">
        {sampleOrders.map(order => (
          <Card key={order.id} className="bg-white/5 border-white/10 overflow-hidden">
            <div 
              className="p-5 flex flex-col md:flex-row justify-between items-center gap-4 cursor-pointer hover:bg-white/5 transition-colors"
              onClick={() => toggleExpand(order.id)}
            >
              <div className="flex items-center gap-4 w-full md:w-auto">
                <img src={order.artwork.images[0]} alt="Artwork" className="w-16 h-16 rounded-lg object-cover" />
                <div>
                  <h3 className="text-white font-medium text-lg">{order.artwork.title}</h3>
                  <p className="text-sm text-gray-400">Order #{order.id} • {formatDate(order.createdAt)}</p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full md:w-auto gap-8">
                <div className="flex items-center gap-2">
                  <img src={order.buyer.avatar} alt="Buyer" className="w-8 h-8 rounded-full" />
                  <span className="text-gray-300">{order.buyer.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{formatPrice(order.totalAmount)}</p>
                </div>
                <Badge variant={order.status === 'Delivered' ? 'success' : order.status === 'Processing' ? 'primary' : 'warning'}>
                  {order.status}
                </Badge>
              </div>
            </div>

            {expandedOrder === order.id && (
              <div className="p-6 border-t border-white/10 bg-black/20 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">Shipping Details</h4>
                  <div className="bg-white/5 rounded-xl p-4 flex gap-3">
                    <MapPin className="text-purple-400 w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="text-white">{order.shippingAddress.fullName}</p>
                      <p className="text-gray-400 text-sm mt-1">{order.shippingAddress.addressLine1}</p>
                      <p className="text-gray-400 text-sm">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                      <p className="text-gray-400 text-sm">{order.shippingAddress.country}</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex gap-3">
                    <Button variant="outline" className="flex items-center"><MessageCircle className="w-4 h-4 mr-2" /> Message Buyer</Button>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">Update Status</h4>
                  <div className="bg-white/5 rounded-xl p-4 flex flex-col gap-4">
                    <select className="bg-[var(--bg-secondary)] border border-white/10 text-white rounded-lg px-4 py-3 focus:outline-none focus:border-purple-500 w-full">
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                    </select>
                    <Input placeholder="Tracking Number (Optional)" />
                    <Button variant="primary" className="w-full">Update Order</Button>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ArtistOrders;
