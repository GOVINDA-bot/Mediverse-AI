import React from 'react';
import { Video, Bot, FolderLock, GraduationCap, FileText, PhoneCall, LayoutDashboard } from 'lucide-react';

export type AppView = 'telemedicine' | 'ai' | 'records' | 'simulations' | 'dashboard' | 'prd';

interface HeaderProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  onEmergencyCall: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeView,
  setActiveView,
  onEmergencyCall,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-3.5">
        {/* Zone 1: Brand Wordmark (Single Element) */}
        <button
          onClick={() => setActiveView('dashboard')}
          className="flex items-center gap-2.5 shrink-0 text-left cursor-pointer"
        >
          <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
            MV
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap">
            MediVerse
          </span>
        </button>

        {/* Zone 2: 4-5 Clean Single-Line Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              activeView === 'dashboard'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            Workspace
          </button>

          <button
            onClick={() => setActiveView('telemedicine')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              activeView === 'telemedicine'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Video className="w-4 h-4" />
            Telemedicine
          </button>

          <button
            onClick={() => setActiveView('ai')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              activeView === 'ai'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            <Bot className="w-4 h-4" />
            AI Health Guide
          </button>

          <button
            onClick={() => setActiveView('records')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              activeView === 'records'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            <FolderLock className="w-4 h-4" />
            Health Vault
          </button>

          <button
            onClick={() => setActiveView('simulations')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              activeView === 'simulations'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            Simulation Lab
          </button>

          <button
            onClick={() => setActiveView('prd')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1 ${
              activeView === 'prd'
                ? 'text-teal-700 font-semibold border-b-2 border-teal-600'
                : 'hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            PRD Specs
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onEmergencyCall}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors whitespace-nowrap shadow-xs"
            title="Immediate emergency override protocol"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Emergency 112</span>
          </button>
        </div>
      </div>

      {/* Mobile Nav Strip */}
      <div className="lg:hidden flex items-center gap-2 overflow-x-auto px-4 py-2 border-t border-slate-100 bg-slate-50 text-xs">
        <button
          onClick={() => setActiveView('dashboard')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeView === 'dashboard' ? 'bg-white font-semibold shadow-xs text-teal-700' : 'text-slate-600'
          }`}
        >
          Workspace
        </button>
        <button
          onClick={() => setActiveView('telemedicine')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeView === 'telemedicine' ? 'bg-white font-semibold shadow-xs text-teal-700' : 'text-slate-600'
          }`}
        >
          Telemedicine
        </button>
        <button
          onClick={() => setActiveView('ai')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeView === 'ai' ? 'bg-white font-semibold shadow-xs text-teal-700' : 'text-slate-600'
          }`}
        >
          AI Health
        </button>
        <button
          onClick={() => setActiveView('records')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeView === 'records' ? 'bg-white font-semibold shadow-xs text-teal-700' : 'text-slate-600'
          }`}
        >
          Health Vault
        </button>
        <button
          onClick={() => setActiveView('simulations')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeView === 'simulations' ? 'bg-white font-semibold shadow-xs text-teal-700' : 'text-slate-600'
          }`}
        >
          Simulation Lab
        </button>
        <button
          onClick={() => setActiveView('prd')}
          className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
            activeView === 'prd' ? 'bg-white font-semibold shadow-xs text-teal-700' : 'text-slate-600'
          }`}
        >
          PRD Specs
        </button>
      </div>
    </header>
  );
};
