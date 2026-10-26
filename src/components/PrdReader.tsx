import React, { useState, useMemo } from 'react';
import { PRD_SECTIONS, DocumentSection } from '../data/fullPrdSections';
import { Search, ChevronRight, Copy, Check, BookOpen, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

export const PrdReader: React.FC = () => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(PRD_SECTIONS[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return PRD_SECTIONS;
    const query = searchQuery.toLowerCase();
    return PRD_SECTIONS.filter(
      (sec) =>
        sec.title.toLowerCase().includes(query) ||
        sec.subtitle.toLowerCase().includes(query) ||
        sec.content.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const currentSection = useMemo(() => {
    return PRD_SECTIONS.find((s) => s.id === selectedSectionId) || PRD_SECTIONS[0];
  }, [selectedSectionId]);

  const currentIndex = PRD_SECTIONS.findIndex((s) => s.id === currentSection.id);
  const prevSection = currentIndex > 0 ? PRD_SECTIONS[currentIndex - 1] : null;
  const nextSection = currentIndex < PRD_SECTIONS.length - 1 ? PRD_SECTIONS[currentIndex + 1] : null;

  const handleCopySection = () => {
    navigator.clipboard.writeText(
      `# ${currentSection.number}. ${currentSection.title}\n\n${currentSection.subtitle}\n\n${currentSection.content}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Basic formatting helper for markdown sections
  const renderFormattedMarkdown = (text: string) => {
    // Process markdown lines into readable HTML
    const lines = text.trim().split('\n');
    let inTable = false;
    let tableRows: string[][] = [];

    const elements: React.ReactNode[] = [];

    const flushTable = (keyIndex: number) => {
      if (tableRows.length > 0) {
        const header = tableRows[0];
        const bodyRows = tableRows.slice(2); // Skip separator row
        elements.push(
          <div key={`table-${keyIndex}`} className="overflow-x-auto my-5 border border-slate-200 rounded-lg">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-slate-100/75 border-b border-slate-200 text-slate-800">
                <tr>
                  {header.map((col, idx) => (
                    <th key={idx} className="py-2.5 px-3.5 font-semibold">
                      {col.trim()}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-2.5 px-3.5 text-slate-700 font-normal leading-relaxed">
                        {cell.trim()}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    lines.forEach((line, index) => {
      // Table row check
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        inTable = true;
        const cells = line
          .trim()
          .slice(1, -1)
          .split('|')
          .map((c) => c.trim());
        tableRows.push(cells);
        return;
      } else if (inTable) {
        flushTable(index);
      }

      // Headers
      if (line.startsWith('### ')) {
        elements.push(
          <h3
            key={index}
            className="text-lg md:text-xl font-bold text-slate-900 mt-7 mb-3 tracking-tight border-b border-slate-100 pb-1.5"
          >
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('#### ')) {
        elements.push(
          <h4 key={index} className="text-base font-semibold text-slate-800 mt-5 mb-2">
            {line.replace('#### ', '')}
          </h4>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl md:text-2xl font-bold text-slate-900 mt-8 mb-4 tracking-tight">
            {line.replace('## ', '')}
          </h2>
        );
      } else if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-2xl md:text-3xl font-extrabold text-slate-900 mt-4 mb-4 tracking-tight">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('- [x] ') || line.startsWith('- [ ] ')) {
        // Checklist
        const isChecked = line.startsWith('- [x] ');
        const itemText = line.replace(/- \[[ x]\] /, '');
        elements.push(
          <div key={index} className="flex items-start gap-2.5 my-1.5 text-sm text-slate-700">
            <input
              type="checkbox"
              readOnly
              checked={isChecked}
              className="mt-0.5 rounded border-slate-300 text-teal-600 focus:ring-teal-500 h-4 w-4"
            />
            <span className={isChecked ? 'text-slate-800 font-medium' : 'text-slate-600'}>{itemText}</span>
          </div>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        elements.push(
          <li key={index} className="text-sm md:text-base text-slate-700 leading-relaxed ml-5 list-disc my-1">
            {line.replace(/^[-*]\s+/, '')}
          </li>
        );
      } else if (/^\d+\.\s/.test(line)) {
        elements.push(
          <div key={index} className="text-sm md:text-base text-slate-700 leading-relaxed ml-4 my-1.5 flex gap-2">
            <span className="font-semibold text-slate-900 shrink-0">{line.match(/^\d+\./)?.[0]}</span>
            <span>{line.replace(/^\d+\.\s+/, '')}</span>
          </div>
        );
      } else if (line.startsWith('```mermaid') || line.startsWith('```')) {
        // Code fence or diagram indicator
        elements.push(
          <div
            key={index}
            className="my-3 p-3 bg-slate-900 text-slate-100 rounded-lg text-xs font-mono overflow-x-auto"
          >
            <div className="text-slate-400 pb-1 mb-1 border-b border-slate-800 text-[11px]">
              {line.replace('```', '') || 'Spec Block'}
            </div>
            <span>{line}</span>
          </div>
        );
      } else if (line.trim().length > 0) {
        elements.push(
          <p key={index} className="text-sm md:text-base text-slate-700 leading-relaxed my-2.5">
            {line}
          </p>
        );
      }
    });

    if (inTable) {
      flushTable(lines.length);
    }

    return elements;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Table of Contents & Search */}
        <aside className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-4 sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <BookOpen className="w-4 h-4 text-teal-600" />
              <span>Document Chapters</span>
            </div>
            <span className="text-xs text-slate-500 font-medium tabular-nums">
              {PRD_SECTIONS.length} Sections
            </span>
          </div>

          {/* Search Bar */}
          <div className="relative mb-3">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search specifications, APIs, schemas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal-500 focus:bg-white transition-colors"
            />
          </div>

          {/* Navigation Section List */}
          <nav className="space-y-1">
            {filteredSections.map((sec) => {
              const isSelected = sec.id === selectedSectionId;
              return (
                <button
                  key={sec.id}
                  onClick={() => setSelectedSectionId(sec.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors flex items-center justify-between group ${
                    isSelected
                      ? 'bg-teal-50 text-teal-900 font-semibold border border-teal-200'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate pr-2">
                    <span
                      className={`font-mono text-[11px] tabular-nums shrink-0 ${
                        isSelected ? 'text-teal-700 font-bold' : 'text-slate-400'
                      }`}
                    >
                      {String(sec.number).padStart(2, '0')}.
                    </span>
                    <span className="truncate">{sec.title}</span>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 transition-transform ${
                      isSelected ? 'text-teal-700 translate-x-0.5' : 'text-slate-300 opacity-0 group-hover:opacity-100'
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {filteredSections.length === 0 && (
            <div className="text-center py-8 text-xs text-slate-500">
              No matching PRD sections found for "{searchQuery}".
            </div>
          )}
        </aside>

        {/* Main Content Viewport */}
        <main className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 min-h-[800px] shadow-xs">
          {/* Section Header */}
          <header className="pb-6 border-b border-slate-200 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              {/* Unboxed metadata with typographic separators (anti-slop rule) */}
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-teal-700 font-mono">
                  CHAPTER {String(currentSection.number).padStart(2, '0')}
                </span>
                <span aria-hidden="true">·</span>
                <span>{currentSection.badge}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {currentSection.readTime}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopySection}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  title="Copy markdown text for this chapter"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-teal-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Chapter</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {currentSection.number}. {currentSection.title}
            </h1>
            <p className="text-sm text-slate-600 mt-2 font-normal leading-relaxed">
              {currentSection.subtitle}
            </p>
          </header>

          {/* Formatted Markdown Body */}
          <article className="prose prose-slate max-w-none">
            {renderFormattedMarkdown(currentSection.content)}
          </article>

          {/* Next / Prev Navigation Footer */}
          <footer className="mt-12 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
            {prevSection ? (
              <button
                onClick={() => setSelectedSectionId(prevSection.id)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-colors border border-slate-200"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-400 uppercase">Previous</div>
                  <div className="font-semibold truncate max-w-[150px] sm:max-w-[200px]">
                    {prevSection.number}. {prevSection.title}
                  </div>
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextSection && (
              <button
                onClick={() => setSelectedSectionId(nextSection.id)}
                className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors"
              >
                <div className="text-right">
                  <div className="text-[10px] text-slate-300 uppercase">Next Chapter</div>
                  <div className="font-semibold truncate max-w-[150px] sm:max-w-[200px]">
                    {nextSection.number}. {nextSection.title}
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </footer>
        </main>
      </div>
    </div>
  );
};
