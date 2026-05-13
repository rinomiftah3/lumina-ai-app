import React from 'react';
import { 
  Sparkles, 
  BrainCircuit, 
  FileText, 
  ShieldQuestion, 
  ArrowRight,
  GraduationCap,
  BookOpen,
  Zap
} from 'lucide-react';
import { StudyMode } from '../types';
import { motion } from 'motion/react';

interface LandingPageProps {
  onStart: (mode: Exclude<StudyMode, 'landing'>) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto px-8 py-20">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-300 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest mb-8 border border-indigo-500/20 shadow-xl shadow-indigo-500/5">
            <Sparkles size={14} />
            The Ultimate Academic Companion
          </div>
          <h1 className="text-7xl font-display font-bold text-white mb-8 tracking-tighter leading-none">
            Master Any Subject <br />With <span className="text-indigo-400">Precision</span>.
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium">
            Lumina AI simplifies the complex, tests your limits, and summarizes the chaos. Academic excellence, refined.
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24"
        >
          <motion.div 
            variants={item}
            onClick={() => onStart('explain')}
            className="group p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden backdrop-blur-xl shadow-2xl"
          >
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <BrainCircuit size={100} />
            </div>
            <div className="bg-indigo-500/20 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 transition-transform border border-indigo-500/20 shadow-inner">
              <BrainCircuit size={32} />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-4">Explain Mode</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Complex theories turned into intuitive analogies. Learn by understanding, not memorizing.
            </p>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
              Initialize Session <ArrowRight size={16} />
            </div>
          </motion.div>

          <motion.div 
            variants={item}
            onClick={() => onStart('quiz')}
            className="group p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden backdrop-blur-xl shadow-2xl"
          >
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldQuestion size={100} />
            </div>
            <div className="bg-indigo-500/20 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 transition-transform border border-indigo-500/20 shadow-inner">
              <ShieldQuestion size={32} />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-4">Quiz Mode</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Identify gaps in real-time. Smart, adaptive assessments that push your boundaries.
            </p>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
              Test Knowledge <ArrowRight size={16} />
            </div>
          </motion.div>

          <motion.div 
            variants={item}
            onClick={() => onStart('summary')}
            className="group p-8 rounded-[2rem] bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden backdrop-blur-xl shadow-2xl"
          >
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <FileText size={100} />
            </div>
            <div className="bg-indigo-500/20 w-16 h-16 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 group-hover:scale-110 transition-transform border border-indigo-500/20 shadow-inner">
              <FileText size={32} />
            </div>
            <h3 className="text-2xl font-display font-bold text-white mb-4">Summary Mode</h3>
            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
              Condense hundreds of pages into high-impact insights. Master the main points instantly.
            </p>
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
              Synthesize Data <ArrowRight size={16} />
            </div>
          </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-indigo-600/10 rounded-[3rem] p-16 text-white relative overflow-hidden border border-white/5 backdrop-blur-3xl shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5">
             <GraduationCap size={400} />
          </div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-5xl font-display font-bold mb-8 tracking-tight">Level Up Your Studies.</h2>
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="shrink-0 bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                  <Zap size={24} className="text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Instant Insights</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Real-time pedagogical support developed for high-performance students.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="shrink-0 bg-white/5 w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl">
                  <BookOpen size={24} className="text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Deep Learning</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">Focus on conceptual mastery rather than rote memorization.</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => onStart('explain')}
              className="mt-12 bg-indigo-500 text-white px-10 py-5 rounded-[1.25rem] font-bold hover:bg-white hover:text-primary transition-all flex items-center gap-3 shadow-2xl shadow-indigo-500/20"
            >
              Start Your First Session <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>

        <footer className="mt-40 pt-10 border-t border-white/5 flex justify-between items-center text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em]">
          <div>© 2026 Lumina AI Labs • All Rights Reserved</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-indigo-400 transition-colors">Safety</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Integrity</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">V6.4.2</a>
          </div>
        </footer>
      </div>
    </div>
  );

};
