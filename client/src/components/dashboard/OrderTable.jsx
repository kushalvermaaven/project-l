import React from 'react';
import { Eye, MoreVertical } from 'lucide-react';
import Badge from '../ui/Badge';

const OrderTable = ({ orders = [], role = 'buyer', onStatusUpdate, onViewDetail }) => {
  if (!orders.length) {
    return <div className="p-6 text-center text-[var(--text-muted)]">No orders found.</div>;
  }

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-white/5 text-[var(--text-muted)] text-sm font-medium">
            <th className="p-4 rounded-tl-xl whitespace-nowrap">Order ID</th>
            <th className="p-4">Artwork</th>
            <th className="p-4">{role === 'buyer' ? 'Artist' : 'Buyer'}</th>
            <th className="p-4">Amount</th>
            <th className="p-4">Date</th>
            <th className="p-4">Status</th>
            <th className="p-4 rounded-tr-xl text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={order.id} className={`border-b border-white/5 hover:bg-white/5 transition-colors ${i % 2 === 0 ? '' : 'bg-black/20'}`}>
              <td className="p-4 text-sm text-[var(--text-primary)] whitespace-nowrap">#{order.id.slice(0, 8)}</td>
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img src={order.artwork?.image || order.artwork?.images?.[0]} alt={order.artwork?.title} className="w-10 h-10 rounded-lg object-cover bg-white/10" />
                  <p className="text-sm font-medium text-[var(--text-primary)] line-clamp-1">{order.artwork?.title}</p>
                </div>
              </td>
              <td className="p-4 text-sm text-[var(--text-muted)]">
                {role === 'buyer' ? order.artist_name : order.buyer_name}
              </td>
              <td className="p-4 text-sm font-medium text-[var(--text-primary)]">
                ₹{order.amount?.toLocaleString()}
              </td>
              <td className="p-4 text-sm text-[var(--text-muted)] whitespace-nowrap">
                {new Date(order.createdAt || order.date).toLocaleDateString()}
              </td>
              <td className="p-4">
                <Badge variant={order.status?.toLowerCase() || 'default'} size="sm">
                  {order.status}
                </Badge>
              </td>
              <td className="p-4 text-right">
                <div className="flex items-center justify-end gap-2">
                  <button onClick={() => onViewDetail && onViewDetail(order.id)} className="p-2 text-[var(--text-muted)] hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  {role !== 'buyer' && (
                    <button className="p-2 text-[var(--text-muted)] hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
