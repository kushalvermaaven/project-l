import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Paintbrush, MessageCircle, Sparkles, ChevronRight, User } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import ArtworkCard from '../../components/artwork/ArtworkCard';
import EmptyState from '../../components/ui/EmptyState';
import { AuthContext } from '../../contexts/AuthContext';
import { sampleArtworks, sampleOrders, sampleCustomRequests, sampleArtists } from '../../data/sampleData';
import { formatPrice, formatDate } from '../../utils/helpers';

export default function BuyerDashboard() {
  const { user } = useContext(AuthContext) || {};
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  const stats = [
    { icon: <Heart className="w-6 h-6 text-purple-400" />, label: 'Favorites', value: '24' },
    { icon: <ShoppingBag className="w-6 h-6 text-cyan-400" />, label: 'Orders', value: sampleOrders?.length || 0 },
    { icon: <Paintbrush className="w-6 h-6 text-pink-400" />, label: 'Custom Requests', value: sampleCustomRequests?.length || 0 },
    { icon: <MessageCircle className="w-6 h-6 text-green-400" />, label: 'Messages', value: '5' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-10 p-4 md:p-8">
        
        {/* Welcome Section */}
        <section>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-[#f0f0f5] mb-2">
            Welcome back, {user?.name || 'Art Lover'}!
          </h1>
          <p className="text-[#a0a0b8]">{today} • Here's what's happening with your art journey.</p>
        </section>

        {/* Stats Row */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-4">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                {stat.icon}
              </div>
              <div>
                <div className="text-3xl font-bold text-[#f0f0f5]">{stat.value}</div>
                <div className="text-sm text-[#a0a0b8]">{stat.label}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Recommended Artwork */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-heading font-bold text-[#f0f0f5] flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-purple-400" /> Recommended for you
            </h2>
            <Link to="/explore" className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1">
              See More <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {(sampleArtworks || []).slice(0, 4).map(artwork => (
              <ArtworkCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Orders */}
          <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-[#f0f0f5]">Recent Orders</h2>
              <Link to="/dashboard/orders" className="text-sm text-purple-400 hover:text-purple-300">View All</Link>
            </div>
            
            {sampleOrders && sampleOrders.length > 0 ? (
              <div className="space-y-4">
                {sampleOrders.slice(0, 3).map(order => (
                  <div key={order.id} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="w-16 h-16 rounded-lg bg-gray-800 overflow-hidden flex-shrink-0">
                      {order.artwork?.image ? (
                        <img src={order.artwork.image} alt={order.artwork.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500"><ShoppingBag className="w-6 h-6" /></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-[#f0f0f5] truncate">{order.artwork?.title || 'Artwork'}</h4>
                      <p className="text-sm text-[#a0a0b8] truncate">{order.artist?.name || 'Artist'}</p>
                      <p className="text-xs text-[#6b6b80] mt-1">{formatDate(order.date)}</p>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#f0f0f5]">{formatPrice(order.totalAmount)}</div>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon={<ShoppingBag />} title="No orders yet" description="Start exploring artwork to make your first purchase." />
            )}
          </section>

          {/* Custom Requests */}
          <section className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-heading font-bold text-[#f0f0f5]">Your Custom Requests</h2>
              <Link to="/dashboard/requests" className="text-sm text-purple-400 hover:text-purple-300">View All</Link>
            </div>

            {sampleCustomRequests && sampleCustomRequests.length > 0 ? (
              <div className="space-y-4">
                {sampleCustomRequests.slice(0, 3).map(req => (
                  <div key={req.id} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-[#f0f0f5] truncate max-w-[70%]">{req.title || 'Custom Project'}</h4>
                      <span className="px-2 py-0.5 rounded-full text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {req.status}
                      </span>
                    </div>
                    <p className="text-sm text-[#a0a0b8] line-clamp-2 mb-3">{req.description}</p>
                    <div className="flex justify-between items-center text-xs text-[#6b6b80]">
                      <span>{req.artist?.name ? `Artist: ${req.artist.name}` : 'Finding artist...'}</span>
                      <span>Budget: {req.budget}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState icon={<Paintbrush />} title="No custom requests" description="Commission an artist for a unique piece." />
            )}
          </section>
        </div>

        {/* Followed Artists */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-heading font-bold text-[#f0f0f5]">Artists you follow</h2>
            <Link to="/artists" className="text-sm text-purple-400 hover:text-purple-300">See All</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {(sampleArtists || []).map(artist => (
              <Link key={artist.id} to={`/artist/${artist.id}`} className="flex flex-col items-center gap-3 min-w-[100px] p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-800">
                  {artist.avatar ? (
                    <img src={artist.avatar} alt={artist.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-full h-full p-4 text-gray-500" />
                  )}
                </div>
                <span className="text-sm font-medium text-[#f0f0f5] text-center line-clamp-1">{artist.name}</span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </DashboardLayout>
  );
}
