import React, { useState } from 'react';
import { Header, AppView } from './components/Header';
import { DoctorDirectory } from './components/telemedicine/DoctorDirectory';
import { AiHealthAssistant } from './components/prototype/AiHealthAssistant';
import { MedicalRecordsVault } from './components/prototype/MedicalRecordsVault';
import { ClinicalSimulationLab } from './components/prototype/ClinicalSimulationLab';
import { RoleDashboard } from './components/prototype/RoleDashboard';
import { PrdReader } from './components/PrdReader';
import { RequirementsMatrix } from './components/RequirementsMatrix';
import { ArchitectureViewer } from './components/ArchitectureViewer';
import { BacklogChecklist } from './components/BacklogChecklist';
import { PRD_SECTIONS } from './data/fullPrdSections';
import { REQUIREMENTS_CATALOGUE, DATABASE_ENTITIES } from './data/prdContent';
import { PhoneCall, AlertTriangle, Download, FileText, CheckSquare, Layers, CalendarCheck } from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('dashboard');
  const [prdSubTab, setPrdSubTab] = useState<'reader' | 'requirements' | 'architecture' | 'backlog'>('reader');
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

  // Full Markdown PRD Exporter
  const handleExportFullMarkdown = () => {
    let fullDoc = `# MediVerse: AI-Powered Integrated Digital Healthcare Platform\n`;
    fullDoc += `## Comprehensive Product Requirements Document (PRD) & Technical Specification\n\n`;
    fullDoc += `*Generated for Product Engineering, Clinical Evaluation, and Architecture Teams*\n`;
    fullDoc += `*Compliance Standards: DPDP Act 2023 (India), NMC Telemedicine Guidelines, ISO/TS 13131*\n\n`;
    fullDoc += `---\n\n`;

    PRD_SECTIONS.forEach((sec) => {
      fullDoc += `## Chapter ${sec.number}: ${sec.title}\n`;
      fullDoc += `**${sec.subtitle}** · *${sec.badge}* · *${sec.readTime}*\n\n`;
      fullDoc += `${sec.content}\n\n`;
      fullDoc += `---\n\n`;
    });

    fullDoc += `## Appendix A: Complete Functional Requirements Catalogue\n\n`;
    fullDoc += `| ID | Priority | Module | Role | Title | Description |\n`;
    fullDoc += `| :--- | :--- | :--- | :--- | :--- | :--- |\n`;
    REQUIREMENTS_CATALOGUE.forEach((r) => {
      fullDoc += `| ${r.id} | ${r.priority} | ${r.module} | ${r.role} | ${r.title} | ${r.description} |\n`;
    });
    fullDoc += `\n---\n\n`;

    fullDoc += `## Appendix B: Relational Database Schema Inventory\n\n`;
    DATABASE_ENTITIES.forEach((e) => {
      fullDoc += `### Table: \`${e.name}\` (Sensitivity: ${e.sensitivity})\n`;
      fullDoc += `${e.description}\n\n`;
      fullDoc += `| Column | Type | Description |\n`;
      fullDoc += `| :--- | :--- | :--- |\n`;
      e.columns.forEach((c) => {
        fullDoc += `| \`${c.name}\` | \`${c.type}\` | ${c.desc} |\n`;
      });
      fullDoc += `\n`;
    });

    const blob = new Blob([fullDoc], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'MediVerse_Comprehensive_PRD.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased">
      {/* Top Bar Header strictly adhering to Top Bar Contract */}
      <Header
        activeView={activeView}
        setActiveView={setActiveView}
        onEmergencyCall={() => setEmergencyModalOpen(true)}
      />

      {/* Main View Area */}
      <main className="flex-1 pb-16">
        {/* VIEW: ROLE WORKSPACES & DASHBOARDS */}
        {activeView === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
            <RoleDashboard
              onNavigateToModule={(mod) => {
                if (mod === 'telemedicine') setActiveView('telemedicine');
                else if (mod === 'ai') setActiveView('ai');
                else if (mod === 'records') setActiveView('records');
                else if (mod === 'simulations') setActiveView('simulations');
              }}
            />
          </div>
        )}

        {/* VIEW: TELEMEDICINE & DOCTOR DIRECTORY */}
        {activeView === 'telemedicine' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <DoctorDirectory />
          </div>
        )}

        {/* VIEW: AI HEALTH ASSISTANT */}
        {activeView === 'ai' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <AiHealthAssistant />
          </div>
        )}

        {/* VIEW: SECURE HEALTH RECORDS VAULT */}
        {activeView === 'records' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <MedicalRecordsVault />
          </div>
        )}

        {/* VIEW: VIRTUAL CLINICAL SIMULATION LAB */}
        {activeView === 'simulations' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <ClinicalSimulationLab />
          </div>
        )}

        {/* VIEW: PRD SPECIFICATION & ARCHITECTURE PORTAL */}
        {activeView === 'prd' && (
          <div className="space-y-6">
            {/* PRD Toolbar */}
            <div className="bg-white border-b border-slate-200">
              <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">PRD Documentation Portal</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500">24 Chapters & Engineering Blueprints</span>
                </div>

                <div className="flex items-center gap-3">
                  {/* PRD Sub-tabs */}
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg text-xs font-medium">
                    <button
                      onClick={() => setPrdSubTab('reader')}
                      className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                        prdSubTab === 'reader' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
                      }`}
                    >
                      <FileText className="w-3.5 h-3.5" />
                      Chapters (1-24)
                    </button>
                    <button
                      onClick={() => setPrdSubTab('requirements')}
                      className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                        prdSubTab === 'requirements' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
                      }`}
                    >
                      <CheckSquare className="w-3.5 h-3.5" />
                      Requirements Matrix
                    </button>
                    <button
                      onClick={() => setPrdSubTab('architecture')}
                      className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                        prdSubTab === 'architecture' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
                      }`}
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Architecture & DB
                    </button>
                    <button
                      onClick={() => setPrdSubTab('backlog')}
                      className={`px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 ${
                        prdSubTab === 'backlog' ? 'bg-white text-slate-900 shadow-xs font-semibold' : 'text-slate-600'
                      }`}
                    >
                      <CalendarCheck className="w-3.5 h-3.5" />
                      Backlog & PO
                    </button>
                  </div>

                  <button
                    onClick={handleExportFullMarkdown}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
                    title="Export complete 24-chapter PRD document as Markdown"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export PRD (.md)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Render PRD Sub-View */}
            {prdSubTab === 'reader' && <PrdReader />}
            {prdSubTab === 'requirements' && <RequirementsMatrix />}
            {prdSubTab === 'architecture' && <ArchitectureViewer />}
            {prdSubTab === 'backlog' && <BacklogChecklist />}
          </div>
        )}
      </main>

      {/* Emergency Action Modal */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-rose-200 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-rose-100 rounded-xl text-rose-600 shrink-0">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  National Medical Emergency Protocol
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  If you or someone around you is experiencing crushing chest pain, difficulty breathing, slurred speech, sudden paralysis, or severe trauma, call emergency services immediately.
                </p>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <a
                href="tel:112"
                className="w-full py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Emergency 112 / 911 Now</span>
              </a>

              <a
                href="https://maps.google.com/?q=nearest+hospital+emergency+room"
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <span>Find Nearest Hospital Emergency Room</span>
              </a>
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="px-4 py-1.5 text-xs text-slate-500 hover:text-slate-800 font-medium"
              >
                Close Emergency Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer strictly adhering to anti-slop rules */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">MediVerse</span>
            <span aria-hidden="true">·</span>
            <span>AI-Powered Integrated Digital Healthcare System</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>DPDP Act 2023 Aligned</span>
            <span aria-hidden="true">·</span>
            <span>NMC Telemedicine Practice Guidelines</span>
            <span aria-hidden="true">·</span>
            <span>WCAG 2.2 AA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
