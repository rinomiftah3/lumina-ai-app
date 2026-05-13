import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Sparkles, User, Info, Lightbulb } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Message, StudyMode } from '../types';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { sendMessageStream } from '../services/geminiService';

interface ChatInterfaceProps {
  mode: Exclude<StudyMode, 'landing'>;
  messages: Message[];
  onSendMessage: (content: string) => void;
  isTyping: boolean;
}

const MODE_META = {
  explain: {
    title: 'Explain Mode',
    description: 'Breaking down complex topics simply.',
    icon: Sparkles,
  },
  quiz: {
    title: 'Quiz Mode',
    description: 'Testing your knowledge step by step.',
    icon: Sparkles,
  },
  summary: {
    title: 'Summary Mode',
    description: 'Extracting key insights from your material.',
    icon: Sparkles,
  }
};

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  mode, 
  messages, 
  onSendMessage,
  isTyping
}) => {
  const [input, setInput] = useState('');
  const [subject, setSubject] = useState('General Study');
  const [isChangingSubject, setIsChangingSubject] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const meta = MODE_META[mode];

  const handleSend = () => {
    if (!input.trim() || isTyping) return;
    const finalContent = subject !== 'General Study' 
      ? `[Subject: ${subject}] ${input}`
      : input;
    onSendMessage(finalContent);
    setInput('');
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col h-full bg-transparent relative">
      {/* Header */}
      <header className="bg-black/10 backdrop-blur-md border-b border-white/5 px-8 py-5 flex justify-between items-center z-10 sticky top-0">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-500/20 p-2.5 rounded-xl text-indigo-300 border border-indigo-500/30">
            <meta.icon size={22} />
          </div>
          <div>
            <h2 className="text-lg font-display font-bold text-white tracking-tight">{meta.title}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{meta.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isChangingSubject ? (
            <div className="flex items-center gap-2">
              <input 
                autoFocus
                className="text-sm px-3 py-1.5 bg-white/5 border border-indigo-500/50 rounded-lg text-white focus:ring-1 focus:ring-action outline-none"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                onBlur={() => setIsChangingSubject(false)}
                onKeyDown={(e) => e.key === 'Enter' && setIsChangingSubject(false)}
              />
            </div>
          ) : (
            <button 
              onClick={() => setIsChangingSubject(true)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-wider text-indigo-300 shadow-xl active:scale-95"
            >
              <span>{subject}</span>
              <Info size={14} />
            </button>
          )}
        </div>
      </header>

      {/* Main Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-8 flex flex-col gap-8 max-w-4xl mx-auto w-full pb-40"
      >
        <div className="flex justify-center mb-4">
          <span className="bg-white/5 backdrop-blur-sm text-slate-400 text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border border-white/10 shadow-lg">
            Session: {subject} • {new Date().toLocaleDateString()}
          </span>
        </div>

        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex w-full gap-4",
                msg.role === 'user' ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === 'assistant' && (
                <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 mt-1 shadow-lg border border-white/20 shadow-indigo-500/20">
                  <Sparkles size={20} className="text-white" />
                </div>
              )}
              <div className={cn(
                "max-w-[85%] rounded-2xl p-6 shadow-2xl backdrop-blur-xl border transition-all",
                msg.role === 'user' 
                  ? "bg-indigo-600/20 border-indigo-400/30 rounded-tr-sm text-indigo-100" 
                  : "bg-white/5 border-white/10 rounded-tl-sm text-slate-200"
              )}>
                <div className="markdown-body">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
              {msg.role === 'user' && (
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-1 shadow-lg border border-white/10 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-tr from-slate-700 to-slate-500" />
                </div>
              )}
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 mt-1 animate-pulse border border-white/20">
                <Sparkles size={20} className="text-white" />
              </div>
              <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl rounded-tl-sm p-5 flex gap-1.5">
                <div className="w-2 h-2 bg-indigo-400/60 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-indigo-400/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-indigo-400/60 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="bg-gradient-to-t from-black/40 to-transparent p-8 z-20 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white/5 backdrop-blur-3xl rounded-2xl border border-white/10 focus-within:border-indigo-500/50 focus-within:ring-4 focus-within:ring-indigo-500/10 shadow-2xl transition-all flex items-end p-2 pr-2">
            <button className="p-3 text-slate-400 hover:text-white transition-colors rounded-xl hover:bg-white/5">
              <Paperclip size={20} />
            </button>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder={`Ask a question about ${subject}...`} 
              className="w-full bg-transparent border-none focus:ring-0 text-sm text-white placeholder:text-slate-500 resize-none py-3 px-2 min-h-[50px] max-h-[200px]"
              rows={1}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="bg-indigo-500 text-white p-3 rounded-xl hover:bg-indigo-400 disabled:opacity-50 transition-all flex items-center justify-center shrink-0 shadow-lg shadow-indigo-500/30"
            >
              <Send size={20} />
            </button>
          </div>
          <div className="flex justify-between items-center mt-4 px-2">
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Press Enter to send, Shift+Enter for new line</p>
            <div className="flex gap-2">
               <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded text-indigo-300 font-bold border border-white/10 tracking-widest uppercase">Lumina Pro</span>
            </div>
          </div>
        </div>
      </div>

      {messages.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-8">
           <div className="max-w-md w-full text-center space-y-8">
              <div className="w-24 h-24 bg-indigo-500/10 rounded-[2rem] flex items-center justify-center mx-auto text-indigo-400 animate-pulse border border-indigo-500/20 shadow-2xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
                <Lightbulb size={48} className="relative z-10" />
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold text-white mb-3">How can I assist your studies?</h3>
                <p className="text-slate-400 text-sm font-medium">Select a mode or type a topic above to begin.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 opacity-40">
                 <div className="p-5 rounded-[1.5rem] bg-white/5 border border-white/5 text-[10px] text-left uppercase tracking-widest font-bold">
                   <p className="text-indigo-400 mb-2">Prompt Idea:</p>
                   "Explain cell mitosis with a factory analogy"
                 </div>
                 <div className="p-5 rounded-[1.5rem] bg-white/5 border border-white/5 text-[10px] text-left uppercase tracking-widest font-bold">
                   <p className="text-indigo-400 mb-2">Prompt Idea:</p>
                   "Summarize the key themes of Hamlet"
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
