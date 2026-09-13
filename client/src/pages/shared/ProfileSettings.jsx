import React, { useState, useContext } from 'react';
import { User, Settings, Bell, Shield, Camera, Save, AlertTriangle } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import Button from '../../components/ui/Button';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastContext } from '../../contexts/ToastContext';

const TABS = ['Profile', 'Account', 'Notifications', 'Preferences'];

export default function ProfileSettings() {
  const { user } = useContext(AuthContext) || {};
  const { showToast } = useContext(ToastContext) || { showToast: () => {} };
  const [activeTab, setActiveTab] = useState('Profile');

  // Form states
  const [profile, setProfile] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    phone: user?.phone || '',
    artStyle: user?.artStyle || ''
  });

  const [account, setAccount] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    messages: true,
    orders: true,
    requests: true,
    marketing: false,
    digest: true
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    currency: 'INR',
    theme: 'Dark'
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    showToast('Profile updated successfully', 'success');
  };

  const handleSaveAccount = (e) => {
    e.preventDefault();
    if (account.newPassword !== account.confirmPassword) {
      showToast('New passwords do not match', 'error');
      return;
    }
    showToast('Password updated successfully', 'success');
    setAccount({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold text-[#f0f0f5] flex items-center gap-3">
            <Settings className="w-8 h-8 text-purple-400" />
            Settings
          </h1>
        </div>

        {/* Tabs Navigation */}
        <div className="flex gap-4 border-b border-white/10 mb-8 overflow-x-auto scrollbar-hide">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 px-2 whitespace-nowrap text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-purple-500 text-purple-400' 
                  : 'border-transparent text-[#a0a0b8] hover:text-[#f0f0f5]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
          
          {activeTab === 'Profile' && (
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="relative group cursor-pointer">
                  <div className="w-24 h-24 rounded-full bg-gray-800 overflow-hidden border-2 border-white/10 group-hover:border-purple-500 transition-colors">
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-full h-full p-6 text-gray-500" />
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white mb-1">Profile Picture</h3>
                  <p className="text-sm text-[#a0a0b8]">JPG, GIF or PNG. Max size of 800K</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-2">Full Name</label>
                  <input type="text" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-[#13131a] border border-white/10 rounded-xl py-3 px-4 text-[#f0f0f5] focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-sm text-[#a0a0b8] mb-2">Phone</label>
                  <input type="text" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="w-full bg-[#13131a] border border-white/10 rounded-xl py-3 px-4 text-[#f0f0f5] focus:outline-none focus:border-purple-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-[#a0a0b8] mb-2">Bio</label>
                  <textarea rows={4} value={profile.bio} onChange={e => setProfile({...profile, bio: e.target.value})} className="w-full bg-[#13131a] border border-white/10 rounded-xl py-3 px-4 text-[#f0f0f5] focus:outline-none focus:border-purple-500 resize-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-[#a0a0b8] mb-2">Location</label>
                  <input type="text" value={profile.location} onChange={e => setProfile({...profile, location: e.target.value})} className="w-full bg-[#13131a] border border-white/10 rounded-xl py-3 px-4 text-[#f0f0f5] focus:outline-none focus:border-purple-500" />
                </div>
                {user?.role === 'artist' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm text-[#a0a0b8] mb-2">Art Style Specialty</label>
                    <input type="text" value={profile.artStyle} onChange={e => setProfile({...profile, artStyle: e.target.value})} className="w-full bg-[#13131a] border border-white/10 rounded-xl py-3 px-4 text-[#f0f0f5] focus:outline-none focus:border-purple-500" />
                  </div>
                )}
              </div>
              <div className="flex justify-end pt-4 border-t border-white/10">
                <Button type="submit" variant="primary" className="flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Changes
                </Button>
              </div>
            </form>
          )}

          {activeTab === 'Account' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Email Address</h3>
                <div className="flex items-center gap-4">
                  <input type="email" value={user?.email || 'user@example.com'} readOnly className="w-full max-w-md bg-[#13131a] border border-white/10 rounded-xl py-3 px-4 text-[#6b6b80] cursor-not-allowed" />
                  <Button variant="outline">Change</Button>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-lg font-medium text-white mb-4">Change Password</h3>
                <form onSubmit={handleSaveAccount} className="space-y-4 max-w-md">
                  <input type="password" placeholder="Current Password" value={account.currentPassword} onChange={e => setAccount({...account, currentPassword: e.target.value})} required className="w-full bg-[#13131a] border border-white/10 rounded-xl py-3 px-4 text-[#f0f0f5] focus:outline-none focus:border-purple-500" />
                  <input type="password" placeholder="New Password" value={account.newPassword} onChange={e => setAccount({...account, newPassword: e.target.value})} required className="w-full bg-[#13131a] border border-white/10 rounded-xl py-3 px-4 text-[#f0f0f5] focus:outline-none focus:border-purple-500" />
                  <input type="password" placeholder="Confirm New Password" value={account.confirmPassword} onChange={e => setAccount({...account, confirmPassword: e.target.value})} required className="w-full bg-[#13131a] border border-white/10 rounded-xl py-3 px-4 text-[#f0f0f5] focus:outline-none focus:border-purple-500" />
                  <Button type="submit" variant="primary">Update Password</Button>
                </form>
              </div>

              <div className="pt-6 border-t border-white/10">
                <h3 className="text-lg font-medium text-red-400 mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" /> Danger Zone
                </h3>
                <p className="text-sm text-[#a0a0b8] mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 rounded-lg transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          )}

          {activeTab === 'Notifications' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-white mb-6">Email Notifications</h3>
              {[
                { id: 'messages', label: 'New Messages', desc: 'When someone sends you a direct message' },
                { id: 'orders', label: 'Order Updates', desc: 'Status changes on your purchases or sales' },
                { id: 'requests', label: 'Custom Requests', desc: 'Updates on commissions and requests' },
                { id: 'marketing', label: 'Marketing Emails', desc: 'Promotions, new features, and news' },
                { id: 'digest', label: 'Weekly Digest', desc: 'A summary of activity and trending art' }
              ].map(item => (
                <div key={item.id} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                  <div>
                    <h4 className="font-medium text-[#f0f0f5]">{item.label}</h4>
                    <p className="text-sm text-[#a0a0b8]">{item.desc}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={notifications[item.id]}
                      onChange={() => setNotifications({...notifications, [item.id]: !notifications[item.id]})}
                    />
                    <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                  </label>
                </div>
              ))}
              <div className="flex justify-end pt-4">
                <Button onClick={() => showToast('Preferences saved', 'success')} variant="primary">Save Preferences</Button>
              </div>
            </div>
          )}

          {activeTab === 'Preferences' && (
            <div className="space-y-6 max-w-md">
              <div>
                <label className="block text-sm text-[#a0a0b8] mb-2">Language</label>
                <select 
                  value={preferences.language}
                  onChange={e => setPreferences({...preferences, language: e.target.value})}
                  className="w-full bg-[#13131a] border border-white/10 rounded-xl py-3 px-4 text-[#f0f0f5] focus:outline-none focus:border-purple-500"
                >
                  <option>English</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#a0a0b8] mb-2">Currency Display</label>
                <select 
                  value={preferences.currency}
                  onChange={e => setPreferences({...preferences, currency: e.target.value})}
                  className="w-full bg-[#13131a] border border-white/10 rounded-xl py-3 px-4 text-[#f0f0f5] focus:outline-none focus:border-purple-500"
                >
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-[#a0a0b8] mb-2">Theme</label>
                <select 
                  value={preferences.theme}
                  onChange={e => setPreferences({...preferences, theme: e.target.value})}
                  className="w-full bg-[#13131a] border border-white/10 rounded-xl py-3 px-4 text-[#f0f0f5] focus:outline-none focus:border-purple-500"
                >
                  <option>Dark</option>
                </select>
              </div>
              <div className="pt-4">
                <Button onClick={() => showToast('Settings saved', 'success')} variant="primary">Save Settings</Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
