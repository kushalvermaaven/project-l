import React, { useState } from 'react';
import { Send, Image as ImageIcon, MoreVertical, Search } from 'lucide-react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { sampleConversations } from '../../data/sampleData';
import { formatTime } from '../../utils/helpers';

const ArtistMessages = () => {
  const [activeChat, setActiveChat] = useState(sampleConversations[0]);
  const [message, setMessage] = useState('');

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-140px)] flex bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        {/* Sidebar */}
        <div className="w-full md:w-80 border-r border-white/10 flex flex-col">
          <div className="p-4 border-b border-white/10">
            <h2 className="text-xl font-heading font-bold text-white mb-4">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {sampleConversations.map(chat => (
              <div 
                key={chat.id} 
                onClick={() => setActiveChat(chat)}
                className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors flex items-center gap-3 ${activeChat.id === chat.id ? 'bg-purple-600/10 border-l-2 border-l-purple-500' : ''}`}
              >
                <div className="relative">
                  <img src={chat.participant.avatar} alt={chat.participant.name} className="w-10 h-10 rounded-full" />
                  {chat.unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-purple-600 rounded-full text-[10px] flex items-center justify-center text-white font-bold">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-white font-medium text-sm truncate">{chat.participant.name}</h4>
                    <span className="text-xs text-gray-500">{formatTime(chat.lastMessage.timestamp)}</span>
                  </div>
                  <p className={`text-xs truncate ${chat.unreadCount > 0 ? 'text-white font-medium' : 'text-gray-400'}`}>
                    {chat.lastMessage.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="hidden md:flex flex-1 flex-col bg-[#13131a]">
          {/* Chat Header */}
          <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
            <div className="flex items-center gap-3">
              <img src={activeChat.participant.avatar} alt="" className="w-10 h-10 rounded-full" />
              <div>
                <h3 className="text-white font-medium">{activeChat.participant.name}</h3>
                <p className="text-xs text-gray-400">Buyer</p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-white"><MoreVertical className="w-5 h-5" /></button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeChat.messages.map((msg, idx) => {
              const isMe = msg.senderId === 'current_user_id';
              return (
                <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${isMe ? 'bg-purple-600 text-white rounded-tr-none' : 'bg-white/10 text-gray-200 rounded-tl-none'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-purple-200' : 'text-gray-500'}`}>{formatTime(msg.timestamp)}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10 bg-white/5 flex gap-2">
            <button className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"><ImageIcon className="w-5 h-5" /></button>
            <input 
              type="text" 
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..." 
              className="flex-1 bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
            />
            <button className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"><Send className="w-5 h-5" /></button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ArtistMessages;
