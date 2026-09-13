import React from 'react';

const ConversationList = ({ conversations = [], activeId, onSelect }) => {
  return (
    <div className="flex flex-col gap-2">
      {conversations.map((conv) => (
        <div
          key={conv.id}
          onClick={() => onSelect(conv)}
          className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
            activeId === conv.id 
              ? 'bg-white/10 border-l-2 border-purple-500' 
              : 'hover:bg-white/5 border-l-2 border-transparent'
          }`}
        >
          <div className="relative flex-shrink-0">
            <img 
              src={conv.avatar || `https://ui-avatars.com/api/?name=${conv.name}`} 
              alt={conv.name} 
              className="w-10 h-10 rounded-full object-cover"
            />
            {conv.isOnline && (
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#13131a] rounded-full"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-baseline mb-0.5">
              <h4 className="font-medium text-[#f0f0f5] truncate text-sm">{conv.name}</h4>
              <span className="text-[10px] text-[#6b6b80] whitespace-nowrap ml-2">
                {conv.lastMessageTime}
              </span>
            </div>
            <p className="text-xs text-[#6b6b80] truncate">
              {conv.lastMessage}
            </p>
          </div>

          {conv.unreadCount > 0 && (
            <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
              <span className="text-[10px] font-bold text-white">{conv.unreadCount}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ConversationList;
