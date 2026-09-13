import React, { useState } from 'react';
import { PlusCircle, Search, Pencil, Trash, Eye, EyeOff, Heart } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Tabs from '../../components/ui/Tabs';
import EmptyState from '../../components/ui/EmptyState';
import { sampleArtworks } from '../../data/sampleData';
import { formatPrice } from '../../utils/helpers';
import { CATEGORIES } from '../../utils/constants';
import { Link } from 'react-router-dom';

const MyArtworks = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const artistArtworks = sampleArtworks.slice(0, 6); // Mock data for current artist

  const filteredArtworks = artistArtworks.filter(art => {
    const matchesSearch = art.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? art.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-white mb-2">My Artworks</h1>
          <div className="flex space-x-4 text-sm text-gray-400">
            <span>Total: 24</span>
            <span>Published: 18</span>
            <span>Drafts: 4</span>
            <span>Sold Out: 2</span>
          </div>
        </div>
        <Link to="/artist-dashboard/add-artwork">
          <Button variant="primary" className="flex items-center">
            <PlusCircle className="w-5 h-5 mr-2" />
            Add New Artwork
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <Tabs 
          tabs={['All', 'Published', 'Draft', 'Sold Out']} 
          activeTab={activeTab} 
          onChange={setActiveTab} 
        />
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
            <Input 
              type="text" 
              placeholder="Search artworks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select 
            className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {filteredArtworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArtworks.map(artwork => (
            <Card key={artwork.id} className="bg-white/5 border border-white/10 overflow-hidden group">
              <div className="relative h-60 overflow-hidden">
                <img src={artwork.images[0]} alt={artwork.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <Link to={`/artist-dashboard/edit-artwork/${artwork.id}`}>
                    <Button variant="secondary" className="p-2 rounded-full"><Pencil className="w-5 h-5" /></Button>
                  </Link>
                  <Button variant="secondary" className="p-2 rounded-full"><Eye className="w-5 h-5" /></Button>
                  <Button variant="danger" className="p-2 rounded-full"><Trash className="w-5 h-5" /></Button>
                </div>
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <Badge variant={artwork.availability === 'Available' ? 'success' : 'warning'}>{artwork.availability}</Badge>
                </div>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-lg font-bold text-white mb-1 truncate">{artwork.title}</h3>
                    <p className="text-sm text-gray-400">{artwork.category}</p>
                  </div>
                  <p className="text-lg font-bold text-purple-400">{formatPrice(artwork.price)}</p>
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10 text-sm text-gray-400">
                  <div className="flex items-center gap-1"><Eye className="w-4 h-4" /> 1.2k</div>
                  <div className="flex items-center gap-1"><Heart className="w-4 h-4 text-pink-500" /> {artwork.likesCount}</div>
                  <div className="flex items-center gap-1"><Search className="w-4 h-4" /> 5 orders</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={<Image className="w-12 h-12 text-gray-500" />}
          title="No artworks found"
          message="Try adjusting your filters or add a new artwork."
          action={<Button variant="primary">Clear Filters</Button>}
        />
      )}
    </DashboardLayout>
  );
};

export default MyArtworks;
