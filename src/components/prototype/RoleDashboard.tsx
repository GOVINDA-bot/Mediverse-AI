import React, { useState } from 'react';
import { USER_PERSONAS, UserPersona } from '../../data/prdContent';
import { User, Stethoscope, GraduationCap, Award, Shield, CheckCircle, Clock, AlertTriangle, ArrowUpRight } from 'lucide-react';

interface RoleDashboardProps {
  onNavigateToModule: (module: 'telemedicine' | 'ai' | 'records' | 'simulations') => void;
}

export const RoleDashboard: React.FC<RoleDashboardProps> = ({ onNavigateToModule }) => {
  const [activeRoleName, setActiveRoleName] = useState<string>('Patient');

  const currentPersona = USER_PERSONAS.find((p) => p.role.includes(activeRoleName)) || USER_PERSONAS[0];

  return (
    <div className="space-y-6">
      {/* Role Switcher Toolbar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Role-Tailored Healthcare Experience Switcher
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              MediVerse eliminates generic one-size-fits-all dashboards. Switch roles to inspect custom views and permissions.
            </p>
          </div>

          {/* Interactive Role Buttons */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg overflow-x-auto">
            {['Patient', 'Doctor', 'Student', 'Educator', 'Admin'].map((r) => (
              <button
                key={r}
                onClick={() => setActiveRoleName(r)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                  activeRoleName === r
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        </div>

        {/* Active Persona Profile Card */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>{currentPersona.name}</span>
              <span className="text-teal-700 font-normal font-mono text-xs">
                [{currentPersona.role}]
              </span>
            </div>
            <p className="text-slate-600 font-normal">{currentPersona.tagline}</p>
          </div>

          <div className="text-slate-500 text-[11px] max-w-sm">
            <strong className="text-slate-700 block">Context & Environment:</strong>
            {currentPersona.demographics}
          </div>
        </div>
      </div>

      {/* ROLE 1: PATIENT DASHBOARD */}
      {activeRoleName === 'Patient' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase text-slate-500">Upcoming Visit</span>
              <span className="text-[11px] font-mono text-teal-700 font-semibold">Today · 4:30 PM</span>
            </div>
            <div>
              <div className="font-bold text-slate-900 text-sm">Dr. Priya Nair, MD</div>
              <div className="text-xs text-slate-600 mt-0.5">Cardiology & Internal Medicine</div>
              <div className="mt-2 text-xs text-slate-500">Intake Form: Completed (Dry cough, Amlodipine)</div>
            </div>
            <button
              onClick={() => onNavigateToModule('telemedicine')}
              className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <span>Join Encrypted Video Visit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase text-slate-500">Records & Consent</span>
              <span className="text-[11px] font-mono text-emerald-700 font-semibold">1 Active Grant</span>
            </div>
            <div className="space-y-1 text-xs">
              <div className="font-semibold text-slate-800">Dr. Priya Nair (44h remaining)</div>
              <p className="text-slate-500">Access scope: All Lab Reports & Diagnostic Imaging</p>
              <div className="text-slate-400 text-[11px]">Last audit view: Oct 26, 09:35 AM</div>
            </div>
            <button
              onClick={() => onNavigateToModule('records')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <span>Manage Consent & Health Vault</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase text-slate-500">AI Health Guidance</span>
              <span className="text-[11px] font-mono text-sky-700 font-semibold">Cites WHO / ICMR</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Have questions about your lipid panel or blood pressure readings? Get plain-language explanations with emergency triage safety.
            </p>
            <button
              onClick={() => onNavigateToModule('ai')}
              className="w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5"
            >
              <span>Ask AI Health Assistant</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ROLE 2: DOCTOR DASHBOARD */}
      {activeRoleName === 'Doctor' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">Today's Consults</div>
              <div className="text-xl font-bold text-slate-900 font-mono mt-1">6 Scheduled</div>
              <div className="text-[11px] text-teal-700 mt-0.5">2 completed · 4 upcoming</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">Medical Council Status</div>
              <div className="text-xl font-bold text-emerald-700 font-mono mt-1">Verified Active</div>
              <div className="text-[11px] text-slate-500 mt-0.5">MCI-2012-88492</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">Average Charting Time</div>
              <div className="text-xl font-bold text-sky-700 font-mono mt-1">1m 45s</div>
              <div className="text-[11px] text-slate-500 mt-0.5">SOAP Templates</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">Next Appointment</div>
              <div className="text-xl font-bold text-slate-900 font-mono mt-1">4:30 PM</div>
              <div className="text-[11px] text-teal-700 mt-0.5">Aarav Sharma (Intake Ready)</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="font-bold text-slate-900 text-sm">Today's Patient Schedule Queue</h4>
              <button
                onClick={() => onNavigateToModule('telemedicine')}
                className="text-xs text-teal-700 hover:text-teal-900 font-semibold"
              >
                Launch Doctor Workspace →
              </button>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">Aarav Sharma (38 M)</span>
                  <span className="text-slate-500 ml-2">Palpitations & cough · Penicillin allergy</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-700 font-medium">Consented (44h left)</span>
                  <button
                    onClick={() => onNavigateToModule('telemedicine')}
                    className="px-3 py-1 bg-teal-600 text-white rounded font-medium"
                  >
                    Open Encounter
                  </button>
                </div>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">Sunita Patel (52 F)</span>
                  <span className="text-slate-500 ml-2">Type 2 Diabetes follow-up · HbA1c review</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">5:15 PM</span>
                  <span className="text-slate-500">Scheduled</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROLE 3: STUDENT DASHBOARD */}
      {activeRoleName === 'Student' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">Cases Completed</div>
              <div className="text-xl font-bold text-slate-900 font-mono mt-1">8 of 12</div>
              <div className="text-[11px] text-teal-700 mt-0.5">Cardiology & Pulmonology</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">Diagnostic Accuracy Avg</div>
              <div className="text-xl font-bold text-emerald-700 font-mono mt-1">91.4%</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Above cohort median (82%)</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">Resource Efficiency</div>
              <div className="text-xl font-bold text-sky-700 font-mono mt-1">86.0%</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Low unnecessary test ordering</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h4 className="font-bold text-slate-900 text-sm">Recommended Clinical Simulation Cases</h4>
              <button
                onClick={() => onNavigateToModule('simulations')}
                className="text-xs text-teal-700 hover:text-teal-900 font-semibold"
              >
                Enter Simulation Lab →
              </button>
            </div>
            <div className="divide-y divide-slate-100 text-xs">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">Case 101: 54yo Acute Retrosternal Chest Pain</span>
                  <span className="text-slate-500 ml-2">STEMI presentation · Intermediate difficulty</span>
                </div>
                <button
                  onClick={() => onNavigateToModule('simulations')}
                  className="px-3 py-1 bg-slate-900 text-white rounded font-medium"
                >
                  Start Case
                </button>
              </div>
              <div className="py-3 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900">Case 102: 19yo Severe Acute Asthma Exacerbation</span>
                  <span className="text-slate-500 ml-2">Pulsus paradoxus · Peak flow evaluation</span>
                </div>
                <button
                  onClick={() => onNavigateToModule('simulations')}
                  className="px-3 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded font-medium"
                >
                  Review Case
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ROLE 4: EDUCATOR DASHBOARD */}
      {activeRoleName === 'Educator' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">Enrolled Students</div>
              <div className="text-xl font-bold text-slate-900 font-mono mt-1">150 Students</div>
              <div className="text-[11px] text-slate-500 mt-0.5">3rd Year Clinical Batch A & B</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">Published Cases</div>
              <div className="text-xl font-bold text-teal-700 font-mono mt-1">14 Scenarios</div>
              <div className="text-[11px] text-slate-500 mt-0.5">2 pending peer review</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">Common Misstep Rate</div>
              <div className="text-xl font-bold text-rose-700 font-mono mt-1">32%</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Nitroglycerin in hypotensive STEMI</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 text-xs space-y-3">
            <h4 className="font-bold text-slate-900 text-sm">Cohort Clinical Competency Heatmap</h4>
            <p className="text-slate-500">
              Students demonstrate high accuracy in ordering ECGs (96%), but 38% under-utilize serial troponin timing protocols.
            </p>
            <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-teal-900">
              Prof. Sunita Deshmukh: "Targeted bedside seminar on STEMI revascularization timing scheduled for Thursday."
            </div>
          </div>
        </div>
      )}

      {/* ROLE 5: ADMIN DASHBOARD */}
      {activeRoleName === 'Admin' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">System Status</div>
              <div className="text-xl font-bold text-emerald-700 font-mono mt-1">99.98% Healthy</div>
              <div className="text-[11px] text-slate-500 mt-0.5">All services operational</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">Doctor Verifications</div>
              <div className="text-xl font-bold text-amber-700 font-mono mt-1">2 Pending</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Medical council check</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">Cross-Tenant Isolation</div>
              <div className="text-xl font-bold text-teal-700 font-mono mt-1">100% Zero Leak</div>
              <div className="text-[11px] text-slate-500 mt-0.5">PHI schemas segregated</div>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl">
              <div className="text-[10px] font-bold uppercase text-slate-400">Audit Events Today</div>
              <div className="text-xl font-bold text-slate-900 font-mono mt-1">1,482 Logs</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Immutable append-only</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 text-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h4 className="font-bold text-slate-900 text-sm">Emergency Account Lockout & Anomaly Monitor</h4>
              <span className="text-emerald-700 font-mono text-[11px] font-semibold">Zero Active Compromises</span>
            </div>
            <p className="text-slate-600">
              Administrator Sarah Chen has instantaneous authority to blacklist JWT session tokens across Redis and lock out suspect credentials in under 500ms.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
