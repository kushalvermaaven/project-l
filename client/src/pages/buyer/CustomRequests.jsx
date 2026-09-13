import React, { useState } from 'react';
import { Paintbrush, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import EmptyState from '../../components/ui/EmptyState';
import Modal from '../../components/ui/Modal';
import Button from '../../components/ui/Button';
import { sampleCustomRequests } from '../../data/sampleData';
import { formatDate } from '../../utils/helpers';

const TABS = ['All', 'Pending', 'Accepted', 'In Progress', 'Completed'];

export default function CustomRequests() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedReq, setSelectedReq] = useState(null);

  const requests = sampleCustomRequests || [];
  const filteredRequests = requests.filter(
    req => activeTab === 'All' || req.status.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <DashboardLayout>
      <div className="p-4 md:p-8 space-y-8 h-full flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Paintbrush className="w-8 h-8 text-pink-400" />
            <h1 className="text-3xl font-heading font-bold text-[#f0f0f5]">Custom Requests</h1>
          </div>
          <Link to="/custom-art">
            <Button variant="primary" className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> New Request
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-white/10 flex-shrink-0">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-pink-500 text-pink-400' 
                  : 'border-transparent text-[#a0a0b8] hover:text-[#f0f0f5]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto pr-2 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map(req => (
              <div key={req.id} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex flex-col h-full">
                <div className="flex justify-between items-start mb-4 gap-4">
                  <h3 className="text-lg font-bold text-[#f0f0f5] line-clamp-1">{req.title || 'Untitled Request'}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                    req.status === 'Completed' ? 'bg-green-500/20 text-green-300' :
                    req.status === 'In Progress' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-pink-500/20 text-pink-300'
                  }`}>
                    {req.status}
                  </span>
                </div>
                
                <p className="text-[#a0a0b8] text-sm line-clamp-2 mb-4 flex-1">{req.description}</p>
                
                <div className="grid grid-cols-2 gap-4 text-sm mb-6 bg-[#13131a] p-4 rounded-xl border border-white/5">
                  <div>
                    <span className="text-[#6b6b80] block text-xs mb-1">Style</span>
                    <span className="text-[#f0f0f5]">{req.style || 'Any'}</span>
                  </div>
                  <div>
                    <span className="text-[#6b6b80] block text-xs mb-1">Budget</span>
                    <span className="text-[#f0f0f5]">{req.budget || 'TBD'}</span>
                  </div>
                  <div>
                    <span className="text-[#6b6b80] block text-xs mb-1">Deadline</span>
                    <span className="text-[#f0f0f5]">{req.deadline ? formatDate(req.deadline) : 'Flexible'}</span>
                  </div>
                  <div>
                    <span className="text-[#6b6b80] block text-xs mb-1">Artist</span>
                    <span className="text-purple-400">{req.artist?.name || 'Unassigned'}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <span className="text-xs text-[#6b6b80]">Submitted {formatDate(req.createdAt)}</span>
                  <button 
                    onClick={() => setSelectedReq(req)}
                    className="text-sm font-medium text-pink-400 hover:text-pink-300"
                  >
                    View Details &rarr;
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 h-64 flex items-center justify-center">
              <EmptyState 
                icon={<Paintbrush />} 
                title="No requests found" 
                description={`You have no ${activeTab.toLowerCase()} custom requests.`} 
                action={
                  <Link to="/custom-art">
                    <Button variant="outline" className="mt-4">Create New Request</Button>
                  </Link>
                }
              />
            </div>
          )}
        </div>

        {/* Modal */}
        <Modal isOpen={!!selectedReq} onClose={() => setSelectedReq(null)} title="Request Details">
          {selectedReq && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">{selectedReq.title}</h3>
                <span className="px-3 py-1 bg-white/10 rounded-full text-sm text-white">{selectedReq.status}</span>
              </div>
              
              <div className="bg-[#13131a] rounded-xl p-4 border border-white/10">
                <h4 className="text-sm font-medium text-[#a0a0b8] mb-2">Description</h4>
                <p className="text-white text-sm whitespace-pre-wrap">{selectedReq.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#13131a] rounded-xl p-4 border border-white/10">
                  <span className="text-[#6b6b80] block text-xs mb-1">Budget Range</span>
                  <span className="text-white font-medium">{selectedReq.budget}</span>
                </div>
                <div className="bg-[#13131a] rounded-xl p-4 border border-white/10">
                  <span className="text-[#6b6b80] block text-xs mb-1">Target Deadline</span>
                  <span className="text-white font-medium">{selectedReq.deadline ? formatDate(selectedReq.deadline) : 'Flexible'}</span>
                </div>
              </div>

              {selectedReq.artist && (
                <div className="pt-4 border-t border-white/10">
                  <h4 className="font-medium text-white mb-3">Assigned Artist</h4>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700"></div>
                    <div>
                      <p className="text-white font-medium">{selectedReq.artist.name}</p>
                      <button className="text-xs text-purple-400">Message Artist</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal>
      </div>
    </DashboardLayout>
  );
}
