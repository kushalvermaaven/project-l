import React, { useState } from 'react';
import { Search, Send, Paperclip, MessageCircle, MoreVertical } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import EmptyState from '../../components/ui/EmptyState';
import { sampleConversations } from '../../data/sampleData';

export default function Messages() {
  const [conversations, setConversations] = useState(sampleConversations || []);
  const [activeId, setActiveId] = useState(null);
  const [message, setMessage] = useState('');
  const [search, setSearch] = useState('');

  const activeChat = conversations.find(c => c.id === activeId);

  // Mock messages for active chat
  const chatMessages = [
    { id: 1, text: "Hi! I love your recent cyberpunk piece.", sender: 'me', time: '10:30 AM' },
    { id: 2, text: "Thank you so much! Are you interested in a custom piece?", sender: 'them', time: '10:35 AM' },
    { id: 3, text: "Yes, I was thinking about something similar but in a rainy neon setting.", sender: 'me', time: '10:38 AM' },
  ];

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    // Handle send message logic here
    setMessage('');
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-5rem)] flex bg-[var(--bg-primary)] border-t border-white/10">
        
        {/* Left Panel: Conversation List */}
        <div className={`w-full md:w-80 lg:w-96 flex flex-col border-r border-white/10 ${activeId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-heading font-bold text-[var(--text-primary)] mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b6b80]" />
              <input 
                type="text" 
                placeholder="Search messages..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-white/10 rounded-lg py-2 pl-9 pr-4 text-sm text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map(conv => (
              <div 
                key={conv.id}
                onClick={() => setActiveId(conv.id)}
                className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors flex gap-3 ${activeId === conv.id ? 'bg-white/10' : ''}`}
              >
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-gray-700 overflow-hidden">
                    <img src={conv.user?.avatar || `https://ui-avatars.com/api/?name=${conv.user?.name}&background=random`} alt="" className="w-full h-full object-cover" />
                  </div>
                  {conv.unread && <div className="absolute top-0 right-0 w-3 h-3 bg-cyan-500 rounded-full border-2 border-[var(--bg-primary)]"></div>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-medium text-[var(--text-primary)] truncate">{conv.user?.name}</h4>
                    <span className="text-xs text-[#6b6b80]">{conv.lastMessageTime}</span>
                  </div>
                  <p className={`text-sm truncate ${conv.unread ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-muted)]'}`}>
                    {conv.lastMessage}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Chat Area */}
        <div className={`flex-1 flex flex-col ${!activeId ? 'hidden md:flex' : 'flex'}`}>
          {activeChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5 backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <button className="md:hidden text-[var(--text-muted)] p-2" onClick={() => setActiveId(null)}>
                    &larr; Back
                  </button>
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-700">
                    <img src={activeChat.user?.avatar || `https://ui-avatars.com/api/?name=${activeChat.user?.name}`} alt="" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text-primary)]">{activeChat.user?.name}</h3>
                    <p className="text-xs text-green-400">Online</p>
                  </div>
                </div>
                <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)] p-2">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Messages List */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                <div className="text-center">
                  <span className="text-xs text-[#6b6b80] bg-[var(--bg-secondary)] px-3 py-1 rounded-full">Today</span>
                </div>
                {chatMessages.map(msg => (
                  <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                    <div className={`max-w-[75%] md:max-w-[60%] p-3 md:p-4 text-sm ${
                      msg.sender === 'me' 
                        ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-2xl rounded-br-sm'
                        : 'bg-white/10 text-[var(--text-primary)] rounded-2xl rounded-bl-sm'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-xs text-[#6b6b80] mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-white/10 bg-[var(--bg-secondary)]">
                <form onSubmit={handleSend} className="flex gap-2 items-center">
                  <button type="button" className="p-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors rounded-full hover:bg-white/10">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[var(--text-primary)] focus:outline-none focus:border-purple-500"
                  />
                  <button 
                    type="submit"
                    disabled={!message.trim()}
                    className="p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <EmptyState 
                icon={<MessageCircle className="w-16 h-16 text-[#6b6b80]" />}
                title="Your Messages"
                description="Select a conversation from the left to start chatting."
              />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
