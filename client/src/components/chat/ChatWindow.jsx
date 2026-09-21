import React, { useState, useRef, useEffect } from 'react';
import { Send, Image as ImageIcon } from 'lucide-react';
import Button from '../ui/Button';

const ChatWindow = ({ conversation, messages = [], onSendMessage, currentUserId }) => {
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (text.trim() && onSendMessage) {
      onSendMessage(text);
      setText('');
    }
  };

  if (!conversation) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--bg-primary)] rounded-2xl border border-white/5">
        <p className="text-[#6b6b80]">Select a conversation to start chatting</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[var(--bg-secondary)] rounded-2xl border border-white/10 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-white/5 backdrop-blur flex items-center gap-4 border-b border-white/10">
        <div className="relative">
          <img 
            src={conversation.avatar || `https://ui-avatars.com/api/?name=${conversation.name}`} 
            alt={conversation.name} 
            className="w-10 h-10 rounded-full object-cover"
          />
          {conversation.isOnline && (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[var(--bg-secondary)] rounded-full"></div>
          )}
        </div>
        <div>
          <h3 className="font-heading font-semibold text-[var(--text-primary)]">{conversation.name}</h3>
          <p className="text-xs text-[var(--text-muted)]">{conversation.role || 'User'}</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-[#6b6b80] text-sm">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.senderId === currentUserId;
            return (
              <div key={msg.id || idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${isMe ? 'bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-br-sm' : 'bg-white/10 text-[var(--text-primary)] rounded-bl-sm'}`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                </div>
                <span className="text-xs text-[#6b6b80] mt-1">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white/5 backdrop-blur border-t border-white/10">
        <form onSubmit={handleSend} className="flex items-end gap-2">
          <button type="button" className="p-3 text-[var(--text-muted)] hover:text-white transition-colors rounded-xl hover:bg-white/10">
            <ImageIcon className="w-5 h-5" />
          </button>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[#6b6b80] focus:outline-none focus:border-purple-500 resize-none"
            rows={Math.min(3, text.split('\n').length || 1)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          <Button type="submit" variant="primary" icon={Send} className="p-3 aspect-square h-[46px]" disabled={!text.trim()} />
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;
