import React, { useState, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import Sidebar from './Sidebar';
import { AuthContext } from '../../contexts/AuthContext';

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useContext(AuthContext) || { user: { role: 'buyer' } };
  const role = user?.role || 'buyer';

  return (
    <div className="flex h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform lg:transform-none lg:relative transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <Sidebar role={role} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden relative">
        <div className="lg:hidden p-4 flex items-center justify-between border-b border-white/10 bg-[#13131a]/80 backdrop-blur sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">A</span>
            </div>
            <span className="font-heading font-bold text-[#f0f0f5]">ARTVRKZ</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 text-[#a0a0b8] hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto pb-20">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
