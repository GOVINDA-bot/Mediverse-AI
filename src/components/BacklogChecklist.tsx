import React, { useState } from 'react';
import { CheckSquare, Calendar, HelpCircle, CheckCircle2, ChevronRight, FileCheck, Layers } from 'lucide-react';

interface BacklogTask {
  id: string;
  sprint: string;
  title: string;
  module: string;
  points: number;
  description: string;
  status: 'Ready' | 'In Progress' | 'Done';
}

const INITIAL_TASKS: BacklogTask[] = [
  // Sprint 1
  {
    id: 'TSK-101',
    sprint: 'Sprint 1 (Weeks 1-2)',
    title: 'PostgreSQL Schemas & KMS Encryption Setup',
    module: 'CORE',
    points: 8,
    description: 'Configure segregated schemas (identity, clinical, simulation) with AES-256 envelope encryption.',
    status: 'Done'
  },
  {
    id: 'TSK-102',
    sprint: 'Sprint 1 (Weeks 1-2)',
    title: 'Multi-Role Authentication & OTP Engine',
    module: 'AUTH',
    points: 5,
    description: 'Build SMS/email OTP flow with JWT SameSite=Strict cookies and 5-attempt rate limits.',
    status: 'Done'
  },
  {
    id: 'TSK-103',
    sprint: 'Sprint 1 (Weeks 1-2)',
    title: 'Medical Document S3 Upload & ClamAV Scanner',
    module: 'MR',
    points: 8,
    description: 'Implement client-side multipart upload with async malware scan before metadata commit.',
    status: 'Done'
  },
  {
    id: 'TSK-104',
    sprint: 'Sprint 1 (Weeks 1-2)',
    title: 'Time-Bound Doctor Consent & Revocation Middleware',
    module: 'MR',
    points: 8,
    description: 'Construct consent_grants engine and pre-signed URL validation with instant cutoff.',
    status: 'Done'
  },

  // Sprint 2
  {
    id: 'TSK-201',
    sprint: 'Sprint 2 (Weeks 3-4)',
    title: 'Doctor Directory & Specialty Search API',
    module: 'TELE',
    points: 5,
    description: 'Build indexed search for verified doctors with fee filters and availability schedules.',
    status: 'In Progress'
  },
  {
    id: 'TSK-202',
    sprint: 'Sprint 2 (Weeks 3-4)',
    title: 'Atomic Consultation Slot Hold & Booking',
    module: 'TELE',
    points: 8,
    description: 'Implement Redis/PostgreSQL pessimistic locking to prevent consultation double bookings.',
    status: 'In Progress'
  },
  {
    id: 'TSK-203',
    sprint: 'Sprint 2 (Weeks 3-4)',
    title: 'WebRTC P2P Encounter Room & SOAP Charting',
    module: 'TELE',
    points: 13,
    description: 'Deliver peer-to-peer audio/video room with simultaneous doctor SOAP note-taking.',
    status: 'Ready'
  },
  {
    id: 'TSK-204',
    sprint: 'Sprint 2 (Weeks 3-4)',
    title: 'Verifiable PDF E-Prescription Generator',
    module: 'TELE',
    points: 5,
    description: 'Generate SHA-256 stamped e-prescriptions formatted according to NMC guidelines.',
    status: 'Ready'
  },

  // Sprint 3
  {
    id: 'TSK-301',
    sprint: 'Sprint 3 (Weeks 5-6)',
    title: 'Vector Database Indexing for WHO & ICMR Guidelines',
    module: 'AI',
    points: 8,
    description: 'Curate, chunk, and embed verified clinical treatment manuals into vector store.',
    status: 'Ready'
  },
  {
    id: 'TSK-302',
    sprint: 'Sprint 3 (Weeks 5-6)',
    title: 'Emergency Semantic Red-Flag Classifier (<150ms)',
    module: 'AI',
    points: 8,
    description: 'Pre-generation classifier to halt chat and trigger red 112/911 emergency banner.',
    status: 'Ready'
  },
  {
    id: 'TSK-303',
    sprint: 'Sprint 3 (Weeks 5-6)',
    title: 'Prescription & Dosage Refusal Guardrails',
    module: 'AI',
    points: 5,
    description: 'Defensive prompt guardrails rejecting drug dosage requests with doctor booking link.',
    status: 'Ready'
  },

  // Sprint 4
  {
    id: 'TSK-401',
    sprint: 'Sprint 4 (Weeks 7-8)',
    title: 'Clinical Simulation Vitals Evaluator Engine',
    module: 'SIM',
    points: 13,
    description: 'Develop dynamic vitals monitor with physiological response modeling to interventions.',
    status: 'Ready'
  },
  {
    id: 'TSK-402',
    sprint: 'Sprint 4 (Weeks 7-8)',
    title: '100-Point Objective Competency Rubric & Debrief',
    module: 'SIM',
    points: 5,
    description: 'Automated scoring of accuracy, resource efficiency, and safety with faculty notes.',
    status: 'Ready'
  }
];

export const BacklogChecklist: React.FC = () => {
  const [activeSubView, setActiveSubView] = useState<'checklist' | 'backlog' | 'decisions'>('checklist');

  const [checklist, setChecklist] = useState<{ [key: string]: boolean }>({
    'c1': true,
    'c2': true,
    'c3': true,
    'c4': true,
    'c5': true,
    'c6': true,
    'c7': true,
    'c8': true,
    'c9': true,
    'c10': true
  });

  const [confirmedDecisions, setConfirmedDecisions] = useState<{ [key: number]: boolean }>({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true
  });

  const toggleCheck = (id: string) => {
    setChecklist({ ...checklist, [id]: !checklist[id] });
  };

  const toggleDecision = (num: number) => {
    setConfirmedDecisions({ ...confirmedDecisions, [num]: !confirmedDecisions[num] });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Sub-Header & View Switcher */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Execution Backlog & Product Owner Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Sprint-by-sprint development roadmap, interactive MVP feature checklist, and critical Product Owner decisions.
          </p>
        </div>

        {/* View Toggle Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
          <button
            onClick={() => setActiveSubView('checklist')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              activeSubView === 'checklist'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-3.5 h-3.5" />
            MVP Checklist
          </button>
          <button
            onClick={() => setActiveSubView('backlog')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              activeSubView === 'backlog'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            Sprint Backlog
          </button>
          <button
            onClick={() => setActiveSubView('decisions')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
              activeSubView === 'decisions'
                ? 'bg-white text-slate-900 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Top 5 Decisions
          </button>
        </div>
      </div>

      {/* VIEW 1: MVP FEATURE CHECKLIST */}
      {activeSubView === 'checklist' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Interactive MVP Verification Checklist
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click checkboxes to verify functionality for stakeholder demonstration and release gating.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Group 1 */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200">
                1. Identity & Telemedicine Workflow
              </div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist['c1']}
                  onChange={() => toggleCheck('c1')}
                  className="mt-0.5 rounded text-teal-600"
                />
                <span className="text-slate-700">
                  Multi-role authentication with OTP validation & doctor council verification gate
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist['c2']}
                  onChange={() => toggleCheck('c2')}
                  className="mt-0.5 rounded text-teal-600"
                />
                <span className="text-slate-700">
                  Doctor search directory with specialty filters & upfront consultation fees
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist['c3']}
                  onChange={() => toggleCheck('c3')}
                  className="mt-0.5 rounded text-teal-600"
                />
                <span className="text-slate-700">
                  Atomic slot booking preventing double-booking with 10-minute hold window
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist['c4']}
                  onChange={() => toggleCheck('c4')}
                  className="mt-0.5 rounded text-teal-600"
                />
                <span className="text-slate-700">
                  WebRTC P2P encrypted video call with simultaneous SOAP clinical charting
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist['c5']}
                  onChange={() => toggleCheck('c5')}
                  className="mt-0.5 rounded text-teal-600"
                />
                <span className="text-slate-700">
                  Standardized e-prescription generator with SHA-256 tamper-proof checksum
                </span>
              </label>
            </div>

            {/* Group 2 */}
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] pb-1 border-b border-slate-200">
                2. AI Safety, Vault & Clinical Simulations
              </div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist['c6']}
                  onChange={() => toggleCheck('c6')}
                  className="mt-0.5 rounded text-teal-600"
                />
                <span className="text-slate-700">
                  Zero-latency emergency red-flag classifier (&lt;150ms) with 112/911 call banner
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist['c7']}
                  onChange={() => toggleCheck('c7')}
                  className="mt-0.5 rounded text-teal-600"
                />
                <span className="text-slate-700">
                  Strict prescription & self-diagnosis refusal guardrails with doctor booking link
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist['c8']}
                  onChange={() => toggleCheck('c8')}
                  className="mt-0.5 rounded text-teal-600"
                />
                <span className="text-slate-700">
                  Time-bound patient consent grants (48h) with instant one-click revocation
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist['c9']}
                  onChange={() => toggleCheck('c9')}
                  className="mt-0.5 rounded text-teal-600"
                />
                <span className="text-slate-700">
                  Immutable access audit trail recording actor ID, IP hash, and document views
                </span>
              </label>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={checklist['c10']}
                  onChange={() => toggleCheck('c10')}
                  className="mt-0.5 rounded text-teal-600"
                />
                <span className="text-slate-700">
                  Interactive simulation player with dynamic vitals, test orders & 100-pt rubric
                </span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: SPRINT BACKLOG */}
      {activeSubView === 'backlog' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Prioritised Initial Development Backlog (4 Sprints)
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                8-week development cadence leading to production-ready MVP release.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded">
              Total: 96 Story Points
            </span>
          </div>

          <div className="space-y-3">
            {INITIAL_TASKS.map((task) => (
              <div
                key={task.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                      {task.id}
                    </span>
                    <span className="font-mono text-slate-400">·</span>
                    <span className="font-semibold text-slate-600">{task.sprint}</span>
                    <span className="font-mono text-slate-400">·</span>
                    <span className="font-bold text-slate-800">{task.module}</span>
                  </div>
                  <div className="font-bold text-slate-900 text-sm">{task.title}</div>
                  <p className="text-slate-600 font-normal">{task.description}</p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                    {task.points} pts
                  </span>
                  <span
                    className={`px-2.5 py-1 rounded font-bold text-[10px] ${
                      task.status === 'Done'
                        ? 'bg-emerald-100 text-emerald-800'
                        : task.status === 'In Progress'
                        ? 'bg-sky-100 text-sky-800'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3: TOP 5 DECISIONS */}
      {activeSubView === 'decisions' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
          <div className="pb-3 border-b border-slate-100">
            <h2 className="text-base font-bold text-slate-900">
              Top Five Product Owner Decisions Before Sprint Kickoff
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Confirm these critical regulatory, security, and pedagogical policies before engineering begins.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Decision 1 */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-teal-700 font-bold text-[11px] block">
                    DECISION 01 · REGULATORY VERIFICATION
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                    Doctor Credential Verification SLA & Medical Council Registry Integration
                  </h4>
                </div>
                <button
                  onClick={() => toggleDecision(1)}
                  className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    confirmedDecisions[1]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{confirmedDecisions[1] ? 'Confirmed by PO' : 'Pending PO Approval'}</span>
                </button>
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Policy Recommendation:</strong> Begin with a manual Administrator verification queue enforcing a strict 24-hour turnaround SLA for Phase 1 MVP to eliminate reliance on external government API uptime.
              </p>
            </div>

            {/* Decision 2 */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-teal-700 font-bold text-[11px] block">
                    DECISION 02 · PRIVACY & CONSENT
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                    Default Patient Consent Grant Duration for Attending Doctors
                  </h4>
                </div>
                <button
                  onClick={() => toggleDecision(2)}
                  className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    confirmedDecisions[2]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{confirmedDecisions[2] ? 'Confirmed by PO' : 'Pending PO Approval'}</span>
                </button>
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Policy Recommendation:</strong> Standardize default expiration at <strong>48 Hours</strong> from appointment initiation. Patients can optionally extend to 7 days or execute immediate one-click manual revocation at any time.
              </p>
            </div>

            {/* Decision 3 */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-teal-700 font-bold text-[11px] block">
                    DECISION 03 · CLINICAL SAFETY
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                    AI Emergency Semantic Triage Classifier Sensitivity Threshold
                  </h4>
                </div>
                <button
                  onClick={() => toggleDecision(3)}
                  className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    confirmedDecisions[3]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{confirmedDecisions[3] ? 'Confirmed by PO' : 'Pending PO Approval'}</span>
                </button>
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Policy Recommendation:</strong> Prioritize 100% recall over specificity (Zero tolerance for missed emergencies). Ambiguous queries describing chest tightness or acute weakness must trigger the red emergency protocol without conversational delay.
              </p>
            </div>

            {/* Decision 4 */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-teal-700 font-bold text-[11px] block">
                    DECISION 04 · MEDICAL EDUCATION
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                    Simulation Repeat Policy & Official Academic Grading
                  </h4>
                </div>
                <button
                  onClick={() => toggleDecision(4)}
                  className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    confirmedDecisions[4]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{confirmedDecisions[4] ? 'Confirmed by PO' : 'Pending PO Approval'}</span>
                </button>
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Policy Recommendation:</strong> Allow unlimited repeat attempts for learning exploration, but record both the <em>First Attempt Score</em> (evaluating spontaneous diagnostic acumen) and the <em>Highest Mastery Score</em> in the student portfolio.
              </p>
            </div>

            {/* Decision 5 */}
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="font-mono text-teal-700 font-bold text-[11px] block">
                    DECISION 05 · MEDIA PRIVACY
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm mt-0.5">
                    Telemedicine Consultation Video Recording & Storage Policy
                  </h4>
                </div>
                <button
                  onClick={() => toggleDecision(5)}
                  className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    confirmedDecisions[5]
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{confirmedDecisions[5] ? 'Confirmed by PO' : 'Pending PO Approval'}</span>
                </button>
              </div>
              <p className="text-slate-700 leading-relaxed">
                <strong>Policy Recommendation:</strong> Maintain <strong>Zero Cloud Video Recording</strong> by default. Retain only signed doctor SOAP notes, vitals telemetry, and e-prescriptions. Eliminates severe patient privacy liability and massive encrypted storage overhead.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
