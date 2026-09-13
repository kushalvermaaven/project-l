import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { CATEGORIES, MEDIUMS, ART_STYLES } from '../../utils/constants';
import { useNavigate } from 'react-router-dom';

const AddArtwork = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    medium: '',
    style: '',
    price: '',
    width: '',
    height: '',
    unit: 'cm',
    orientation: 'Portrait',
    tags: '',
    availability: 'Available',
    allowCustomization: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate save
    navigate('/artist-dashboard/artworks');
  };

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-heading font-bold text-white">Add New Artwork</h1>
        <p className="text-gray-400 mt-2">Showcase your latest creation to the world</p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 bg-white/5 border-white/10">
            <h3 className="text-lg font-bold text-white mb-4">Artwork Images</h3>
            <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-500 transition-colors bg-white/5">
              <Upload className="w-10 h-10 text-purple-400 mb-4" />
              <p className="text-white font-medium mb-1">Click or drag images here</p>
              <p className="text-xs text-gray-500">JPG, PNG, WEBP up to 10MB</p>
            </div>
            {images.length > 0 && (
              <div className="mt-4 flex gap-2 overflow-x-auto">
                {/* Thumbnails would go here */}
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-8">
          <Card className="p-6 bg-white/5 border-white/10">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Artwork Title *</label>
                <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Cosmic Dreams" required />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                <textarea 
                  name="description" 
                  value={formData.description} 
                  onChange={handleChange}
                  rows="6" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 resize-none"
                  placeholder="Describe your artwork, the inspiration behind it..."
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Category *</label>
                  <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500" required>
                    <option value="">Select Category</option>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Medium</label>
                  <select name="medium" value={formData.medium} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500">
                    <option value="">Select Medium</option>
                    {MEDIUMS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Art Style</label>
                  <select name="style" value={formData.style} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500">
                    <option value="">Select Style</option>
                    {ART_STYLES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Price (₹) *</label>
                  <Input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="0.00" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Availability</label>
                  <select name="availability" value={formData.availability} onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500">
                    <option value="Available">Available</option>
                    <option value="Sold">Sold Out</option>
                    <option value="Reserved">Reserved</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between py-4 border-t border-white/10 mt-6">
                <div>
                  <h4 className="text-white font-medium">Allow Customization</h4>
                  <p className="text-sm text-gray-400">Buyers can request modifications for this artwork</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" name="allowCustomization" checked={formData.allowCustomization} onChange={handleChange} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>

              <div className="flex justify-end space-x-4 pt-6 border-t border-white/10">
                <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
                <Button type="button" variant="secondary">Save as Draft</Button>
                <Button type="submit" variant="primary">Publish Artwork</Button>
              </div>
            </div>
          </Card>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default AddArtwork;
