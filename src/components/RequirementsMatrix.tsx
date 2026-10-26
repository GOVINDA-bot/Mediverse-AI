import React, { useState, useMemo } from 'react';
import { REQUIREMENTS_CATALOGUE, Requirement } from '../data/prdContent';
import { Search, Filter, ShieldAlert, CheckCircle2, ChevronDown, ChevronUp, Lock } from 'lucide-react';

export const RequirementsMatrix: React.FC = () => {
  const [selectedModule, setSelectedModule] = useState<string>('ALL');
  const [selectedPriority, setSelectedPriority] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>(REQUIREMENTS_CATALOGUE[0].id);

  const modules = ['ALL', 'AUTH', 'TELE', 'AI', 'MR', 'SIM', 'SEC', 'ADM'];
  const priorities = ['ALL', 'P0', 'P1', 'P2'];

  const filteredRequirements = useMemo(() => {
    return REQUIREMENTS_CATALOGUE.filter((req) => {
      const matchModule = selectedModule === 'ALL' || req.module === selectedModule;
      const matchPriority = selectedPriority === 'ALL' || req.priority === selectedPriority;
      const matchSearch =
        searchQuery.trim() === '' ||
        req.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        req.role.toLowerCase().includes(searchQuery.toLowerCase());
      return matchModule && matchPriority && matchSearch;
    });
  }, [selectedModule, selectedPriority, searchQuery]);

  const p0Count = REQUIREMENTS_CATALOGUE.filter((r) => r.priority === 'P0').length;
  const p1Count = REQUIREMENTS_CATALOGUE.filter((r) => r.priority === 'P1').length;
  const p2Count = REQUIREMENTS_CATALOGUE.filter((r) => r.priority === 'P2').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Top Header & Metrics Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 mb-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Functional Requirements & Acceptance Criteria
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Structured catalogue with unique IDs, user roles, Given/When/Then acceptance criteria, and security specifications.
            </p>
          </div>

          {/* Metric Summary */}
          <div className="flex items-center gap-6 text-xs text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Specs</span>
              <span className="font-bold text-slate-900 text-sm font-mono tabular-nums">
                {REQUIREMENTS_CATALOGUE.length}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">P0 MVP Must</span>
              <span className="font-bold text-teal-700 text-sm font-mono tabular-nums">
                {p0Count}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">P1 Should</span>
              <span className="font-bold text-sky-700 text-sm font-mono tabular-nums">
                {p1Count}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-semibold">P2 Future</span>
              <span className="font-bold text-slate-600 text-sm font-mono tabular-nums">
                {p2Count}
              </span>
            </div>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
          {/* Priority Segmented Control (Interactive Filter Buttons) */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            {priorities.map((p) => (
              <button
                key={p}
                onClick={() => setSelectedPriority(p)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  selectedPriority === p
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p === 'ALL' ? 'All Priorities' : p}
              </button>
            ))}
          </div>

          {/* Module Selector Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto py-1">
            <Filter className="w-3.5 h-3.5 text-slate-400 mr-1 shrink-0" />
            {modules.map((m) => (
              <button
                key={m}
                onClick={() => setSelectedModule(m)}
                className={`px-2.5 py-1 text-xs rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  selectedModule === m
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filter by ID, keyword, role..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal-500 focus:bg-white"
            />
          </div>
        </div>
      </div>

      {/* Requirements List */}
      <div className="space-y-3">
        {filteredRequirements.map((req) => {
          const isExpanded = expandedId === req.id;
          return (
            <div
              key={req.id}
              className={`bg-white border rounded-xl transition-shadow ${
                isExpanded ? 'border-teal-300 shadow-xs' : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {/* Row Summary Header */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : req.id)}
                className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 flex-1">
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-mono text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded">
                      {req.id}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${
                        req.priority === 'P0'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-sky-50 text-sky-700 border border-sky-200'
                      }`}
                    >
                      {req.priority}
                    </span>
                  </div>

                  <div className="font-semibold text-slate-900 text-sm sm:text-base">
                    {req.title}
                  </div>

                  {/* Clean unboxed metadata (anti-slop) */}
                  <div className="hidden md:flex items-center gap-2 text-xs text-slate-400 ml-auto mr-4">
                    <span>Role: {req.role}</span>
                    <span aria-hidden="true">·</span>
                    <span>Module: {req.module}</span>
                  </div>
                </div>

                <div className="shrink-0 text-slate-400">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </button>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-100 text-xs sm:text-sm space-y-4">
                  <p className="text-slate-700 leading-relaxed font-normal">
                    {req.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                      <div className="text-[11px] uppercase font-bold text-slate-500 mb-1">
                        Preconditions
                      </div>
                      <div className="text-slate-700">{req.preconditions}</div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3.5">
                      <div className="text-[11px] uppercase font-bold text-slate-500 mb-1">
                        Expected System Behavior
                      </div>
                      <div className="text-slate-700">{req.expectedBehavior}</div>
                    </div>
                  </div>

                  {/* Acceptance Criteria Box */}
                  <div className="bg-teal-50/50 border border-teal-200 rounded-lg p-4">
                    <div className="flex items-center gap-1.5 font-bold text-teal-900 text-xs uppercase mb-2">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                      <span>Acceptance Criteria (Given / When / Then)</span>
                    </div>

                    <div className="space-y-1.5 font-mono text-xs text-slate-800">
                      <div>
                        <strong className="text-teal-800">GIVEN:</strong> {req.acceptanceCriteria.given}
                      </div>
                      <div>
                        <strong className="text-teal-800">WHEN:</strong> {req.acceptanceCriteria.when}
                      </div>
                      <div>
                        <strong className="text-teal-800">THEN:</strong> {req.acceptanceCriteria.then}
                      </div>
                    </div>
                  </div>

                  {/* Security & Dependencies */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-2 text-xs">
                    <div className="flex-1 flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <Lock className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-800">Security & Privacy Governance</div>
                        <div className="text-slate-600 mt-0.5">{req.securityConsiderations}</div>
                      </div>
                    </div>

                    <div className="sm:w-1/3 flex items-start gap-2 bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <ShieldAlert className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-semibold text-slate-800">Dependencies</div>
                        <div className="text-slate-600 mt-0.5">
                          {req.dependencies.join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredRequirements.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 text-slate-500 text-sm">
          No requirements found matching your active filter criteria.
        </div>
      )}
    </div>
  );
};
