import React from 'react';
import { UploadCloud, CheckCircle2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const CustomArt = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Imagine it. <br/>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Describe it. Make it yours.
            </span>
          </h1>
          <p className="text-xl text-[var(--text-muted)]">
            Work directly with our artists to commission a piece that perfectly fits your vision, space, and budget.
          </p>
        </div>

        {/* How it works mini */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="flex gap-4 bg-[var(--bg-secondary)] p-6 rounded-2xl border border-white/5">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <h3 className="font-bold mb-2">Submit Request</h3>
              <p className="text-sm text-[var(--text-muted)]">Fill out the details of what you're looking for.</p>
            </div>
          </div>
          <div className="flex gap-4 bg-[var(--bg-secondary)] p-6 rounded-2xl border border-white/5">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <h3 className="font-bold mb-2">Connect</h3>
              <p className="text-sm text-[var(--text-muted)]">Discuss specifics with interested artists.</p>
            </div>
          </div>
          <div className="flex gap-4 bg-[var(--bg-secondary)] p-6 rounded-2xl border border-white/5">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <h3 className="font-bold mb-2">Create & Receive</h3>
              <p className="text-sm text-[var(--text-muted)]">The artist creates your piece and ships it to you.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Form */}
          <div className="lg:w-2/3">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl font-heading font-bold mb-8 border-b border-white/10 pb-4">Request Custom Art</h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">What do you want created? *</label>
                  <textarea 
                    className="w-full bg-[var(--bg-primary)] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 transition-colors min-h-[120px]"
                    placeholder="Describe your vision in detail..."
                  ></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Art Style</label>
                    <select className="w-full bg-[var(--bg-primary)] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500">
                      <option>Select Style...</option>
                      <option>Abstract</option>
                      <option>Realism</option>
                      <option>Minimalist</option>
                      <option>Portrait</option>
                      <option>Landscape</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferred Colors</label>
                    <Input placeholder="e.g. Warm tones, Blues and Golds" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Size/Dimensions</label>
                    <select className="w-full bg-[var(--bg-primary)] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500">
                      <option>Small (up to 12")</option>
                      <option>Medium (12" - 24")</option>
                      <option>Large (24" - 40")</option>
                      <option>Oversized (40"+)</option>
                      <option>Custom/Not sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Purpose</label>
                    <select className="w-full bg-[var(--bg-primary)] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500">
                      <option>Home Décor</option>
                      <option>Gift</option>
                      <option>Office</option>
                      <option>Personal Collection</option>
                      <option>Event</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Budget Range (₹)</label>
                    <div className="flex items-center gap-2">
                      <Input type="number" placeholder="Min" />
                      <span className="text-[var(--text-muted)]">-</span>
                      <Input type="number" placeholder="Max" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Deadline (Optional)</label>
                    <Input type="date" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Reference Images (Optional)</label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center bg-[var(--bg-primary)] hover:border-purple-500/50 transition-colors cursor-pointer">
                    <UploadCloud className="w-8 h-8 text-[var(--text-muted)] mx-auto mb-3" />
                    <p className="text-sm text-[#e2e2e8]">Drag & drop images here, or click to select files</p>
                    <p className="text-xs text-[var(--text-muted)] mt-2">Max 5 files. JPG, PNG (Max 5MB each)</p>
                  </div>
                </div>

                <Button size="lg" className="w-full">Submit Custom Art Request</Button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-6">
            <div className="bg-[var(--bg-secondary)] rounded-2xl p-6 border border-white/5">
              <h3 className="font-heading font-bold text-xl mb-4">Why Request Custom Art?</h3>
              <ul className="space-y-4 text-sm text-[var(--text-muted)]">
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> Exactly what you want for your space</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> Support independent artists directly</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> Perfect, meaningful personalized gifts</li>
                <li className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" /> Secure payments and platform protection</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomArt;
