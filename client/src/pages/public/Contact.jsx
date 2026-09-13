import React from 'react';
import { Mail, MapPin, Clock, Twitter, Instagram, Facebook } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-[#f0f0f5] py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Get in touch</h1>
          <p className="text-[#a0a0b8] text-lg">We're here to help and answer any question you might have.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 mb-24">
          {/* Form */}
          <div className="lg:w-2/3">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input type="email" placeholder="your@email.com" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <select className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500">
                    <option>General Inquiry</option>
                    <option>Artist Support</option>
                    <option>Buyer Support</option>
                    <option>Payment Issue</option>
                    <option>Technical Issue</option>
                    <option>Partnership</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Subject</label>
                  <Input placeholder="How can we help?" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea 
                    className="w-full bg-[#0a0a0f] border border-white/10 rounded-xl p-4 text-white focus:outline-none focus:border-purple-500 min-h-[150px]"
                    placeholder="Provide as many details as possible..."
                    rows={6}
                  ></textarea>
                </div>

                <Button size="lg" className="w-full">Send Message</Button>
              </form>
            </div>
          </div>

          {/* Info */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-[#13131a] rounded-3xl p-8 border border-white/5">
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-[#a0a0b8] mb-1">Email</div>
                    <a href="mailto:hello@artvrkz.com" className="hover:text-purple-400 transition-colors">hello@artvrkz.com</a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-[#a0a0b8] mb-1">Location</div>
                    <div>Mumbai, India<br/>Global Remote Team</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <div className="text-sm text-[#a0a0b8] mb-1">Business Hours</div>
                    <div>Mon - Fri, 9am - 6pm IST</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 mt-8 pt-8">
                <h3 className="text-sm font-bold mb-4 uppercase tracking-wider text-[#a0a0b8]">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-pink-500 hover:text-white transition-all"><Instagram className="w-4 h-4" /></a>
                  <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-all"><Facebook className="w-4 h-4" /></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-3xl font-heading font-bold mb-8 text-center">Common Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: "How long does shipping take?", a: "Shipping times vary by artist location. Typically, domestic shipping takes 3-7 days, while international takes 10-21 days." },
              { q: "What is your return policy?", a: "We offer a 14-day return policy for original artworks. Custom commissioned pieces are non-refundable unless damaged upon arrival." },
              { q: "Are custom art requests binding?", a: "Submitting a request is just an inquiry. It only becomes binding once you and the artist agree on terms and a deposit is paid." },
              { q: "How do I become an artist on the platform?", a: "Click on 'Sell Your Art' in the top navigation, create an account, and complete your artist profile for review." },
              { q: "Is payment secure?", a: "Yes, all transactions go through secure payment gateways (Stripe/Razorpay) and funds are held in escrow until delivery is confirmed." },
              { q: "Do you ship internationally?", a: "Many of our artists ship worldwide. You can see shipping options on individual artwork pages." }
            ].map((faq, i) => (
              <div key={i} className="bg-[#13131a] p-6 rounded-2xl border border-white/5">
                <h4 className="font-bold mb-2 text-lg">{faq.q}</h4>
                <p className="text-[#a0a0b8] text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
