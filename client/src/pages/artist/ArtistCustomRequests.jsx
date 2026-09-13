import React, { useState } from 'react';
import { Search, CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import { sampleCustomRequests } from '../../data/sampleData';
import { formatPrice, formatDate } from '../../utils/helpers';

const ArtistCustomRequests = () => {
  const [activeTab, setActiveTab] = useState('All');

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white">Custom Art Requests</h1>
        <p className="text-gray-400 mt-2">Manage personalized commissions from buyers</p>
      </div>

      <div className="mb-6">
        <Tabs 
          tabs={['All', 'Pending', 'Accepted', 'In Progress', 'Completed']} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {sampleCustomRequests.map(req => (
          <Card key={req.id} className="bg-white/5 border-white/10 flex flex-col h-full">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-3">
                  <img src={req.buyer.avatar} alt={req.buyer.name} className="w-12 h-12 rounded-full" />
                  <div>
                    <h3 className="text-white font-medium">{req.buyer.name}</h3>
                    <p className="text-sm text-gray-400">{formatDate(req.createdAt)}</p>
                  </div>
                </div>
                <Badge variant={req.status === 'Pending' ? 'warning' : 'primary'}>{req.status}</Badge>
              </div>

              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-2">Request Description</h4>
                <p className="text-gray-200 text-sm leading-relaxed">{req.description}</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Style</p>
                  <p className="text-white text-sm">{req.style}</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Size</p>
                  <p className="text-white text-sm">{req.size}</p>
                </div>
                <div className="bg-black/20 rounded-lg p-3 border border-white/5">
                  <p className="text-xs text-gray-500 mb-1">Budget</p>
                  <p className="text-cyan-400 text-sm font-medium">{formatPrice(req.budget.min)} - {formatPrice(req.budget.max)}</p>
                </div>
              </div>

              {req.referenceImages && req.referenceImages.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Reference Images</h4>
                  <div className="flex gap-2">
                    {req.referenceImages.map((img, idx) => (
                      <img key={idx} src={img} alt="Ref" className="w-16 h-16 rounded-lg object-cover border border-white/10" />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/10 bg-black/20 flex justify-between items-center">
              <Button variant="outline" className="flex items-center text-sm px-3 py-1.5"><MessageCircle className="w-4 h-4 mr-2" /> Message</Button>
              {req.status === 'Pending' && (
                <div className="flex gap-2">
                  <Button variant="danger" className="text-sm px-4 py-1.5"><XCircle className="w-4 h-4 mr-2 inline" /> Decline</Button>
                  <Button variant="primary" className="text-sm px-4 py-1.5"><CheckCircle className="w-4 h-4 mr-2 inline" /> Send Quote</Button>
                </div>
              )}
              {req.status === 'Accepted' && (
                <Button variant="primary" className="text-sm px-4 py-1.5">Start Progress</Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ArtistCustomRequests;
