import React, { useState } from 'react';
import { TelemedicineModule } from './prototype/TelemedicineModule';
import { AiHealthAssistant } from './prototype/AiHealthAssistant';
import { MedicalRecordsVault } from './prototype/MedicalRecordsVault';
import { ClinicalSimulationLab } from './prototype/ClinicalSimulationLab';
import { RoleDashboard } from './prototype/RoleDashboard';
import { Video, Bot, FolderLock, GraduationCap, LayoutDashboard } from 'lucide-react';

export const LivePrototypeSuite: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'dashboard' | 'telemedicine' | 'ai' | 'records' | 'simulations'>('dashboard');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Bar for Prototype Modules */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="font-semibold text-teal-700 font-mono">LIVE SANDBOX</span>
              <span>·</span>
              <span>Interactive Verification Prototype</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              MediVerse Functional Prototype Workspace
            </h1>
            <p className="text-xs text-slate-600 mt-0.5">
              Test-drive the 4 core product modules and multi-role dashboards specified in the PRD.
            </p>
          </div>

          {/* Module Switcher Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
            <button
              onClick={() => setActiveModule('dashboard')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeModule === 'dashboard'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Role Dashboards
            </button>

            <button
              onClick={() => setActiveModule('telemedicine')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeModule === 'telemedicine'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              Module A: Tele-Consult
            </button>

            <button
              onClick={() => setActiveModule('ai')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeModule === 'ai'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              Module B: AI Assistant
            </button>

            <button
              onClick={() => setActiveModule('records')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeModule === 'records'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FolderLock className="w-3.5 h-3.5" />
              Module C: Records Vault
            </button>

            <button
              onClick={() => setActiveModule('simulations')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                activeModule === 'simulations'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Module D: Simulation Lab
            </button>
          </div>
        </div>
      </div>

      {/* RENDER ACTIVE MODULE */}
      {activeModule === 'dashboard' && (
        <RoleDashboard onNavigateToModule={(mod) => setActiveModule(mod)} />
      )}
      {activeModule === 'telemedicine' && <TelemedicineModule />}
      {activeModule === 'ai' && <AiHealthAssistant />}
      {activeModule === 'records' && <MedicalRecordsVault />}
      {activeModule === 'simulations' && <ClinicalSimulationLab />}
    </div>
  );
};
