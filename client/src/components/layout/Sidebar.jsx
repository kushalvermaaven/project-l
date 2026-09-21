import React, { useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Compass, Heart, ShoppingBag, Paintbrush, 
  MessageCircle, User, Image as ImageIcon, PlusCircle, 
  DollarSign, Users, BarChart3, LogOut 
} from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';

const Sidebar = ({ role = 'buyer', onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext) || { user: { name: 'Guest', avatar: '' }, logout: () => {} };

  const navItems = {
    buyer: [
      {icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard'}, 
      {icon: Compass, label: 'Explore', path: '/explore'}, 
      {icon: Heart, label: 'Favorites', path: '/dashboard/favorites'}, 
      {icon: ShoppingBag, label: 'Orders', path: '/dashboard/orders'}, 
      {icon: Paintbrush, label: 'Custom Requests', path: '/dashboard/custom-requests'}, 
      {icon: MessageCircle, label: 'Messages', path: '/dashboard/messages'}, 
      {icon: User, label: 'Profile', path: '/dashboard/profile'}
    ],
    artist: [
      {icon: LayoutDashboard, label: 'Dashboard', path: '/artist-dashboard'}, 
      {icon: ImageIcon, label: 'My Artworks', path: '/artist-dashboard/artworks'}, 
      {icon: PlusCircle, label: 'Add Artwork', path: '/artist-dashboard/add-artwork'}, 
      {icon: ShoppingBag, label: 'Orders', path: '/artist-dashboard/orders'}, 
      {icon: Paintbrush, label: 'Custom Requests', path: '/artist-dashboard/custom-requests'}, 
      {icon: MessageCircle, label: 'Messages', path: '/artist-dashboard/messages'}, 
      {icon: DollarSign, label: 'Earnings', path: '/artist-dashboard/earnings'}, 
      {icon: User, label: 'Profile', path: '/artist-dashboard/profile'}
    ],
    admin: [
      {icon: LayoutDashboard, label: 'Dashboard', path: '/admin'}, 
      {icon: Users, label: 'Users', path: '/admin/users'}, 
      {icon: ImageIcon, label: 'Artworks', path: '/admin/artworks'}, 
      {icon: ShoppingBag, label: 'Orders', path: '/admin/orders'}, 
      {icon: BarChart3, label: 'Reports', path: '/admin/reports'}
    ]
  };

  const items = navItems[role] || navItems.buyer;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-[var(--bg-secondary)] border-r border-white/10 w-64 overflow-y-auto">
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.jpg" alt="Artvrkz Logo" className="h-10 w-auto object-contain rounded-md" />
        </Link>
      </div>

      <div className="px-6 py-4 border-b border-white/10 flex items-center gap-3">
        <img 
          src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'U'}`} 
          alt={user?.name} 
          className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-[var(--text-primary)] truncate">{user?.name || 'User'}</p>
          <span className="text-[10px] uppercase tracking-wider text-purple-400 font-medium px-2 py-0.5 rounded-full bg-purple-500/10 inline-block mt-0.5">
            {role}
          </span>
        </div>
      </div>

      <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
        {items.map((item) => {
          const isActive = location.pathname === item.path || (location.pathname.startsWith(item.path) && item.path !== '/dashboard' && item.path !== '/artist-dashboard' && item.path !== '/admin' && item.path !== '/explore');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-white border-r-2 border-purple-500' 
                  : 'text-[var(--text-muted)] hover:text-white hover:bg-white/5 border-r-2 border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-purple-400' : ''}`} />
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[var(--text-muted)] hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
