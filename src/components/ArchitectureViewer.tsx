import React, { useState } from 'react';
import { DATABASE_ENTITIES, API_ENDPOINTS, RISK_REGISTER } from '../data/prdContent';
import { Database, Network, ShieldCheck, Play, Check, AlertTriangle, Layers, Server } from 'lucide-react';

export const ArchitectureViewer: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'diagrams' | 'database' | 'apis' | 'risks'>('diagrams');
  const [selectedTable, setSelectedTable] = useState<string>(DATABASE_ENTITIES[0].name);
  const [selectedApiIndex, setSelectedApiIndex] = useState<number>(0);
  const [apiSimulatedResult, setApiSimulatedResult] = useState<string | null>(null);
  const [simulating, setSimulating] = useState<boolean>(false);

  const activeEntity = DATABASE_ENTITIES.find((e) => e.name === selectedTable) || DATABASE_ENTITIES[0];
  const activeApi = API_ENDPOINTS[selectedApiIndex] || API_ENDPOINTS[0];

  const handleSimulateApi = () => {
    setSimulating(true);
    setApiSimulatedResult(null);
    setTimeout(() => {
      setSimulating(false);
      setApiSimulatedResult(activeApi.responseSample);
    }, 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Subtab Selector */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Technical Architecture & Specifications
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Interactive system architecture diagrams, relational database schemas, REST APIs, and clinical risk matrices.
            </p>
          </div>

          {/* Interactive Mode Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg shrink-0">
            <button
              onClick={() => setActiveSubTab('diagrams')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeSubTab === 'diagrams'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Network className="w-3.5 h-3.5" />
              Architecture Diagrams
            </button>
            <button
              onClick={() => setActiveSubTab('database')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeSubTab === 'database'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Database className="w-3.5 h-3.5" />
              Database Schemas
            </button>
            <button
              onClick={() => setActiveSubTab('apis')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeSubTab === 'apis'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Server className="w-3.5 h-3.5" />
              REST API Explorer
            </button>
            <button
              onClick={() => setActiveSubTab('risks')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5 ${
                activeSubTab === 'risks'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Risk Register
            </button>
          </div>
        </div>
      </div>

      {/* VIEW 1: DIAGRAMS */}
      {activeSubTab === 'diagrams' && (
        <div className="space-y-6">
          {/* High-Level Architecture Diagram Card */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div>
                <h2 className="text-base font-bold text-slate-900">
                  1. High-Level Modular Monolith / Microservices Architecture
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clear service boundaries with physical/logical isolation between clinical PHI and educational simulation systems.
                </p>
              </div>
              <span className="text-xs font-mono text-teal-700 bg-teal-50 border border-teal-200 px-2.5 py-1 rounded">
                TLS 1.3 · KMS Envelope
              </span>
            </div>

            {/* Visual SVG Topology Diagram */}
            <div className="bg-slate-900 text-slate-100 rounded-xl p-6 font-mono text-xs overflow-x-auto">
              <div className="min-w-[700px] space-y-5">
                {/* Layer 1: Client */}
                <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg text-center font-bold text-teal-400">
                  Client Tier: React 19 SPA (Vite / TypeScript / Tailwind CSS / WebRTC P2P)
                </div>

                <div className="text-center text-slate-500">↓ HTTPS / RESTful JSON / WSS ↓</div>

                {/* Layer 2: Gateway */}
                <div className="p-3 bg-slate-800 border border-cyan-800 rounded-lg flex items-center justify-around text-center">
                  <div className="text-cyan-300 font-bold">API Gateway & Reverse Proxy</div>
                  <div className="text-slate-400 text-[11px]">JWT SameSite Auth · Rate Limiting (Redis) · CSRF Guard</div>
                </div>

                <div className="text-center text-slate-500">↓ Authenticated Role-Based Dispatch ↓</div>

                {/* Layer 3: Services Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {/* Service 1: Core Clinical */}
                  <div className="p-4 bg-slate-800/90 border border-teal-700/60 rounded-lg space-y-2">
                    <div className="font-bold text-teal-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      Core Healthcare Services
                    </div>
                    <ul className="text-[11px] text-slate-300 space-y-1">
                      <li>• Auth & Doctor Verification</li>
                      <li>• Telemedicine & Scheduling</li>
                      <li>• Sovereign Consent Engine</li>
                      <li>• E-Prescription Generator</li>
                      <li>• Immutable Audit Ledger</li>
                    </ul>
                  </div>

                  {/* Service 2: Safe AI RAG */}
                  <div className="p-4 bg-slate-800/90 border border-sky-700/60 rounded-lg space-y-2">
                    <div className="font-bold text-sky-300 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Responsible AI Guidance
                    </div>
                    <ul className="text-[11px] text-slate-300 space-y-1">
                      <li>• Red-Flag Triage Classifier (&lt;200ms)</li>
                      <li>• Vector RAG (WHO / ICMR Corpus)</li>
                      <li>• Prescription Refusal Guardrails</li>
                      <li>• Plain-Language Translator</li>
                      <li>• User Data Purge SLA</li>
                    </ul>
                  </div>

                  {/* Service 3: Virtual Sim Engine */}
                  <div className="p-4 bg-slate-800/90 border border-amber-700/60 rounded-lg space-y-2">
                    <div className="font-bold text-amber-300 flex items-center gap-1.5">
                      <Database className="w-3.5 h-3.5" />
                      Virtual Simulation Lab
                    </div>
                    <ul className="text-[11px] text-slate-300 space-y-1">
                      <li>• Physiologic Vitals Evaluator</li>
                      <li>• Investigation Marketplace</li>
                      <li>• Branching Trajectory Engine</li>
                      <li>• 100-Point Rubric Scorer</li>
                      <li className="text-rose-400 font-semibold">⚠️ 100% Isolated from PHI</li>
                    </ul>
                  </div>
                </div>

                <div className="text-center text-slate-500">↓ Persistent Data & Cryptographic Tier ↓</div>

                {/* Layer 4: Data Layer */}
                <div className="grid grid-cols-4 gap-3 text-center text-[11px]">
                  <div className="p-2.5 bg-slate-800 border border-slate-700 rounded text-slate-200">
                    <strong className="text-teal-400 block">PostgreSQL (Relational)</strong>
                    Users, Appointments, Encounters
                  </div>
                  <div className="p-2.5 bg-slate-800 border border-slate-700 rounded text-slate-200">
                    <strong className="text-sky-400 block">Private S3 Storage</strong>
                    AES-256 KMS Envelope Documents
                  </div>
                  <div className="p-2.5 bg-slate-800 border border-slate-700 rounded text-slate-200">
                    <strong className="text-purple-400 block">Vector Knowledge DB</strong>
                    Curated Medical Guidelines Index
                  </div>
                  <div className="p-2.5 bg-slate-800 border border-slate-700 rounded text-slate-200">
                    <strong className="text-amber-400 block">Redis In-Memory</strong>
                    Distributed Slot Locks & Blacklist
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sequence Flow 1 & 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Flow 1 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                Sequence Flow: Consent-Governed Record Access
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                How time-bound patient authorization guarantees zero unauthorized doctor access.
              </p>

              <ol className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-teal-700">01</span>
                  <span>Doctor clicks to view patient lab report in consultation workspace.</span>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-teal-700">02</span>
                  <span>API Middleware queries <code className="text-teal-800">consent_grants</code> table for active non-expired grant ID.</span>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-teal-700">03</span>
                  <span>If valid, system generates a 5-minute pre-signed S3 URL and logs access to immutable <code className="text-teal-800">audit_logs</code>.</span>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-rose-700">04</span>
                  <span>If expired or revoked by patient, immediately returns <strong>HTTP 403 Forbidden</strong>.</span>
                </li>
              </ol>
            </div>

            {/* Flow 2 */}
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
              <h3 className="font-bold text-slate-900 text-sm mb-1">
                Sequence Flow: Grounded AI & Red-Flag Triage
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Pre-generation emergency bypass prevents life-threatening conversational delay.
              </p>

              <ol className="space-y-3 text-xs text-slate-700">
                <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-sky-700">01</span>
                  <span>User submits symptom description into AI Health Assistant.</span>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-sky-700">02</span>
                  <span>Semantic classifier checks query against acute emergency vector space (&lt; 150ms).</span>
                </li>
                <li className="flex items-start gap-2.5 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                  <span className="font-mono font-bold text-rose-700">03</span>
                  <span>If red-flag detected (STEMI/Stroke), LLM generation is aborted and red 112/911 banner triggers.</span>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="font-mono font-bold text-teal-700">04</span>
                  <span>If benign, query is grounded against WHO/ICMR vector index and rendered with citations.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: DATABASE SCHEMAS */}
      {activeSubTab === 'database' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Table Selector Sidebar */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
              PostgreSQL Relational Tables
            </div>
            <div className="space-y-1">
              {DATABASE_ENTITIES.map((ent) => (
                <button
                  key={ent.name}
                  onClick={() => setSelectedTable(ent.name)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-mono transition-colors flex items-center justify-between ${
                    selectedTable === ent.name
                      ? 'bg-teal-50 text-teal-900 font-bold border border-teal-200'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <span className="truncate">{ent.name}</span>
                  <span className="text-[10px] text-slate-400">{ent.columns.length} cols</span>
                </button>
              ))}
            </div>
          </div>

          {/* Table Details */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-mono">
                  TABLE: {activeEntity.name}
                </h3>
                <p className="text-xs text-slate-600 mt-1">{activeEntity.description}</p>
              </div>
              <span className="text-xs font-mono text-slate-700 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded">
                Sensitivity: {activeEntity.sensitivity}
              </span>
            </div>

            {/* Column Schema Table */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold font-mono">Column Name</th>
                    <th className="py-2.5 px-3 font-semibold font-mono">Data Type</th>
                    <th className="py-2.5 px-3 font-semibold">Description & Constraints</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {activeEntity.columns.map((col, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-3 font-bold text-slate-900">{col.name}</td>
                      <td className="py-2.5 px-3 text-teal-700">{col.type}</td>
                      <td className="py-2.5 px-3 font-sans text-slate-600">{col.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: REST APIS */}
      {activeSubTab === 'apis' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* API Selector Sidebar */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 px-1">
              Core Endpoints
            </div>
            <div className="space-y-1.5">
              {API_ENDPOINTS.map((api, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedApiIndex(idx);
                    setApiSimulatedResult(null);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedApiIndex === idx
                      ? 'bg-teal-50 border border-teal-200 font-semibold text-teal-900'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="truncate pr-2">
                    <span className="font-mono text-[10px] font-bold text-slate-500 mr-2">
                      {api.method}
                    </span>
                    <span className="font-mono text-xs">{api.path}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* API Inspector & Test Runner */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-900 text-white">
                    {activeApi.method}
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-900">
                    {activeApi.path}
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-1">{activeApi.purpose}</p>
              </div>

              <button
                onClick={handleSimulateApi}
                disabled={simulating}
                className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 rounded-lg transition-colors shadow-xs"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{simulating ? 'Executing...' : 'Simulate API Call'}</span>
              </button>
            </div>

            {/* Metadata strip */}
            <div className="grid grid-cols-3 gap-3 text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Authentication</span>
                <span className="font-medium text-slate-800">{activeApi.auth}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Authorized Roles</span>
                <span className="font-medium text-slate-800">{activeApi.roles.join(', ')}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase">Rate Limit</span>
                <span className="font-mono text-teal-700 font-semibold">{activeApi.rateLimit}</span>
              </div>
            </div>

            {/* Request Payload */}
            <div>
              <div className="text-xs font-bold text-slate-700 mb-1.5 font-mono">
                Request Payload (JSON)
              </div>
              <pre className="p-3.5 bg-slate-900 text-teal-300 rounded-lg text-xs font-mono overflow-x-auto">
                {activeApi.requestBody}
              </pre>
            </div>

            {/* Response Area */}
            <div>
              <div className="text-xs font-bold text-slate-700 mb-1.5 font-mono flex items-center justify-between">
                <span>Response Payload (200 OK)</span>
                {apiSimulatedResult && (
                  <span className="text-[11px] text-teal-600 flex items-center gap-1 font-sans">
                    <Check className="w-3.5 h-3.5" /> Simulated Response
                  </span>
                )}
              </div>
              <pre className="p-3.5 bg-slate-950 text-slate-200 rounded-lg text-xs font-mono overflow-x-auto min-h-[140px]">
                {apiSimulatedResult || activeApi.responseSample}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 4: RISK REGISTER */}
      {activeSubTab === 'risks' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
          <div className="pb-4 border-b border-slate-100 mb-4">
            <h2 className="text-lg font-bold text-slate-900">
              Clinical, AI, and Architectural Risk Register
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive risk scoring with pre-emptive mitigation protocols and designated engineering/clinical owners.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">ID</th>
                  <th className="py-2.5 px-3 font-semibold">Category</th>
                  <th className="py-2.5 px-3 font-semibold">Identified Risk</th>
                  <th className="py-2.5 px-3 font-semibold">Severity</th>
                  <th className="py-2.5 px-3 font-semibold">Pre-emptive Mitigation Strategy</th>
                  <th className="py-2.5 px-3 font-semibold">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {RISK_REGISTER.map((risk) => (
                  <tr key={risk.id} className="hover:bg-slate-50/70">
                    <td className="py-3 px-3 font-mono font-bold text-slate-900">{risk.id}</td>
                    <td className="py-3 px-3 font-medium text-slate-600">{risk.category}</td>
                    <td className="py-3 px-3 text-slate-800 font-semibold max-w-[200px]">
                      {risk.risk}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          risk.impact === 'Critical'
                            ? 'bg-rose-50 text-rose-700 border border-rose-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {risk.likelihood} / {risk.impact}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-600 leading-relaxed max-w-[320px]">
                      {risk.mitigation}
                    </td>
                    <td className="py-3 px-3 text-slate-700 font-medium whitespace-nowrap">
                      {risk.owner}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
