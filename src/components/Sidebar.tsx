import React from 'react';
import { 
  Plus, 
  History, 
  BrainCircuit, 
  FileText, 
  ShieldQuestion, 
  Settings, 
  HelpCircle,
  LayoutDashboard
} from 'lucide-react';
import { StudyMode } from '../types';
import { cn } from '../lib/utils';
import { motion } from 'motion/react';

interface SidebarProps {
  currentMode: StudyMode;
  onModeChange: (mode: StudyMode) => void;
  onNewSession: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentMode, onModeChange, onNewSession }) => {
  const menuItems = [
    { id: 'landing', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'explain', label: 'Explain Mode', icon: BrainCircuit },
    { id: 'quiz', label: 'Quiz Mode', icon: ShieldQuestion },
    { id: 'summary', label: 'Summary Mode', icon: FileText },
  ] as const;

  return (
    <nav className="w-64 border-r border-white/5 bg-black/20 backdrop-blur-2xl flex flex-col p-4 h-full z-20">
      <div className="mb-8 px-2 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
           <BrainCircuit size={20} className="text-white" />
        </div>
        <div>
          <h1 className="font-display text-lg font-bold text-white tracking-tight">Lumina AI</h1>
          <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Study Partner</p>
        </div>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={onNewSession}
        className="w-full bg-action text-white py-3 px-4 rounded-xl font-semibold hover:opacity-90 transition-all mb-6 flex items-center justify-center gap-2 shadow-lg shadow-action/20"
      >
        <Plus size={18} />
        New Session
      </motion.button>

      <div className="flex-1 space-y-1">
        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-3">Study Modes</div>
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onModeChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-sm font-medium",
              currentMode === item.id 
                ? "bg-white/10 border border-white/10 text-white shadow-xl" 
                : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
            )}
          >
            <item.icon size={18} className={currentMode === item.id ? "text-indigo-400" : ""} />
            {item.label}
          </button>
        ))}
        
        <div className="pt-6">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-3">Library</p>
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all text-sm font-medium">
            <History size={18} />
            History
          </button>
        </div>
      </div>

      <div className="mt-auto border-t border-white/5 pt-4 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-all text-sm font-medium">
          <Settings size={18} />
          Settings
        </button>
        
        <div className="flex items-center gap-3 mt-4 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-inner">
          <img 
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop" 
            alt="User" 
            className="w-10 h-10 rounded-full object-cover border border-white/20"
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold text-white truncate">Alex M.</span>
            <span className="text-[10px] text-indigo-300/70 font-bold uppercase tracking-wider">Pro Student</span>
          </div>
        </div>
      </div>
    </nav>
  );
};
