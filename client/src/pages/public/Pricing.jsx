import React from 'react';
import { Palette, Shield, Percent, Wallet, ArrowDown, HelpCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

const Pricing = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">Simple pricing.<br/>More opportunities.</h1>
          <p className="text-xl text-[var(--text-muted)]">No subscriptions. No hidden fees. Just a fair marketplace.</p>
        </div>

        {/* Visual Flow */}
        <div className="relative py-12 mb-20 max-w-lg mx-auto">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-transparent -translate-x-1/2 z-0"></div>
          
          <div className="relative z-10 space-y-12">
            <div className="flex flex-col items-center bg-[var(--bg-primary)] py-4">
              <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] border border-purple-500/30 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(124,58,237,0.2)]">
                <Palette className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="font-bold text-lg text-center">Artist makes a sale</h3>
            </div>
            
            <div className="flex flex-col items-center bg-[var(--bg-primary)] py-4">
              <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] border border-cyan-500/30 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-cyan-400" />
              </div>
              <h3 className="font-bold text-lg text-center">Artvrkz secures transaction</h3>
            </div>

            <div className="flex flex-col items-center bg-[var(--bg-primary)] py-4">
              <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] border border-pink-500/30 flex items-center justify-center mb-4">
                <Percent className="w-8 h-8 text-pink-400" />
              </div>
              <h3 className="font-bold text-lg text-center">10–15% Commission Applied</h3>
            </div>

            <div className="flex flex-col items-center bg-[var(--bg-primary)] py-4">
              <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] border border-green-500/30 flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <Wallet className="w-8 h-8 text-green-400" />
              </div>
              <h3 className="font-bold text-lg text-center">Artist receives earnings</h3>
            </div>
          </div>
        </div>

        {/* Example Card */}
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-lg mx-auto mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-purple-500/20 text-purple-300 text-xs font-bold px-4 py-1 rounded-bl-xl uppercase tracking-wider">Example</div>
          <h3 className="text-2xl font-bold mb-8">Sales Breakdown</h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center text-[var(--text-muted)]">
              <span>Artwork sold for</span>
              <span className="text-white font-medium">₹10,000</span>
            </div>
            <div className="flex justify-between items-center text-[var(--text-muted)]">
              <span>Artvrkz commission (10-15%)</span>
              <span className="text-red-400 font-medium">- ₹1,000 to ₹1,500</span>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 flex justify-between items-center">
            <span className="text-lg font-bold">Artist Receives</span>
            <span className="text-3xl font-bold text-green-400">₹8,500 - ₹9,000</span>
          </div>
          <p className="text-xs text-[#6b6b80] mt-6 text-center">Exact commission depends on applicable Artvrkz plan and transaction terms.</p>
        </div>

        {/* FAQ */}
        <div className="mb-20">
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: 'Are there listing fees?', a: 'No, listing your artwork is completely free. We only make money when you make a sale.' },
              { q: 'How is the commission determined?', a: 'Commission ranges from 10% to 15% depending on your artist tier and cumulative sales volume. New artists start at 15%.' },
              { q: 'Who pays for shipping?', a: 'Shipping costs are typically added on top of the artwork price and paid by the buyer, though artists can choose to offer free shipping.' },
              { q: 'How and when do I get paid?', a: 'Payments are processed securely via our payment gateway and transferred to your registered bank account 7 days after the buyer receives the artwork.' }
            ].map((faq, i) => (
              <div key={i} className="bg-[var(--bg-secondary)] border border-white/5 rounded-2xl p-6">
                <h4 className="font-bold mb-2 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-purple-400" /> {faq.q}</h4>
                <p className="text-[var(--text-muted)] pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button size="lg" className="w-full sm:w-auto px-12">Start selling on Artvrkz</Button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
