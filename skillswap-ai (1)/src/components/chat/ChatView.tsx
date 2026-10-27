import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ChatMessage } from '../../types';
import { Send, Paperclip, Code, Sparkles, Hash, MessageSquare, Image, Smile } from 'lucide-react';

export const ChatView: React.FC = () => {
  const { chatChannels, activeChannelId, setActiveChannelId, chatMessages, sendMessage, currentUser } = useApp();

  const [inputMessage, setInputMessage] = useState('');

  const activeChannel = chatChannels.find(c => c.id === activeChannelId) || chatChannels[0];
  const activeMessages = chatMessages[activeChannelId] || [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    sendMessage(activeChannelId, inputMessage.trim());
    setInputMessage('');
  };

  return (
    <div className="h-[calc(100vh-140px)] rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col md:flex-row">
      
      {/* Channels Sidebar */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800 p-4 space-y-4 shrink-0 bg-slate-50/50 dark:bg-slate-900/50">
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 px-2">
            Collegiate Channels
          </h3>
          <div className="space-y-1">
            {chatChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannelId(channel.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeChannelId === channel.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Hash className="w-4 h-4 shrink-0" />
                  <span className="truncate">{channel.name}</span>
                </div>
                {channel.unreadCount ? (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-500 text-white shrink-0">
                    {channel.unreadCount}
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col justify-between h-full bg-white dark:bg-slate-900">
        
        {/* Chat Channel Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hash className="w-5 h-5 text-indigo-600" />
            <div>
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">{activeChannel?.name}</h3>
              <p className="text-[10px] text-slate-400">Collaboration & peer skill discussion room</p>
            </div>
          </div>

          <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
            ● 8 Active Peer Students
          </span>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeMessages.map((msg) => {
            const isSelf = msg.senderId === currentUser.id;

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-3 ${isSelf ? 'flex-row-reverse' : ''}`}
              >
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  className="w-8 h-8 rounded-full object-cover shrink-0"
                />
                <div className={`max-w-md space-y-1 ${isSelf ? 'items-end text-right' : ''}`}>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="font-bold text-slate-700 dark:text-slate-300">{msg.senderName}</span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      isSelf
                        ? 'bg-indigo-600 text-white rounded-tr-none'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            placeholder={`Message #${activeChannel?.name}...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/30"
          />

          <button
            type="submit"
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
