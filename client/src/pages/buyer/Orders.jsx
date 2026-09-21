import React, { useState } from 'react';
import { ShoppingBag, ChevronRight, X } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { sampleOrders } from '../../data/sampleData';
import { formatPrice, formatDate } from '../../utils/helpers';

const TABS = ['All', 'Pending', 'In Progress', 'Completed', 'Cancelled'];

export default function Orders() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = sampleOrders || [];
  
  const filteredOrders = orders.filter(
    order => activeTab === 'All' || order.status.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-8 h-full flex flex-col">
        <div className="flex items-center gap-3">
          <ShoppingBag className="w-8 h-8 text-cyan-400" />
          <h1 className="text-3xl font-heading font-bold text-[var(--text-primary)]">My Orders</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-white/10 flex-shrink-0">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-cyan-500 text-cyan-400' 
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Order List */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => (
              <div key={order.id} className="p-4 md:p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-full md:w-24 h-48 md:h-24 rounded-xl bg-gray-800 overflow-hidden flex-shrink-0">
                  {order.artwork?.image && (
                    <img src={order.artwork.image} alt="Artwork" className="w-full h-full object-cover" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold text-[var(--text-primary)] truncate">{order.artwork?.title || 'Artwork Title'}</h3>
                    <span className="text-xs text-[#6b6b80]">#{order.id}</span>
                  </div>
                  <p className="text-[var(--text-muted)] mb-2">by {order.artist?.name || 'Artist'}</p>
                  <p className="text-sm text-[#6b6b80]">{formatDate(order.date)}</p>
                </div>

                <div className="flex flex-row md:flex-col items-center md:items-end justify-between gap-4 border-t border-white/10 md:border-t-0 pt-4 md:pt-0">
                  <div className="text-xl font-bold text-[var(--text-primary)]">{formatPrice(order.totalAmount)}</div>
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 border border-white/20">
                      {order.status}
                    </span>
                    <button 
                      onClick={() => setSelectedOrder(order)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg transition-colors"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="h-64 flex items-center justify-center">
              <EmptyState 
                icon={<ShoppingBag />} 
                title="No orders found" 
                description={`You have no ${activeTab.toLowerCase()} orders.`} 
              />
            </div>
          )}
        </div>

        {/* Order Details Modal */}
        <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} title="Order Details">
          {selectedOrder && (
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-800">
                  <img src={selectedOrder.artwork?.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedOrder.artwork?.title}</h3>
                  <p className="text-[var(--text-muted)]">Artist: {selectedOrder.artist?.name}</p>
                  <p className="text-sm text-[#6b6b80] mt-1">Order #{selectedOrder.id}</p>
                </div>
              </div>

              <div className="bg-[var(--bg-secondary)] rounded-xl p-4 border border-white/10 space-y-3">
                <h4 className="font-medium text-white mb-2">Price Breakdown</h4>
                <div className="flex justify-between text-sm text-[var(--text-muted)]">
                  <span>Artwork Price</span>
                  <span>{formatPrice(selectedOrder.totalAmount * 0.9)}</span>
                </div>
                <div className="flex justify-between text-sm text-[var(--text-muted)]">
                  <span>Platform Fee (10%)</span>
                  <span>{formatPrice(selectedOrder.totalAmount * 0.1)}</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between font-bold text-white">
                  <span>Total</span>
                  <span>{formatPrice(selectedOrder.totalAmount)}</span>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-white">Status Tracking</h4>
                <div className="space-y-4 pl-2 border-l-2 border-white/10">
                  {['Pending', 'Confirmed', 'In Progress', 'Completed'].map((step, idx) => (
                    <div key={step} className="relative pl-6">
                      <div className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 ${
                        selectedOrder.status === step ? 'bg-cyan-500 border-cyan-500' : 
                        idx < 3 ? 'bg-white/50 border-white/50' : 'bg-[var(--bg-secondary)] border-white/30'
                      }`}></div>
                      <p className={`text-sm ${selectedOrder.status === step ? 'text-white font-medium' : 'text-[var(--text-muted)]'}`}>
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/10">
                <Button className="flex-1" variant="outline">Contact Artist</Button>
                <Button className="flex-1" variant="primary">Download Invoice</Button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}
