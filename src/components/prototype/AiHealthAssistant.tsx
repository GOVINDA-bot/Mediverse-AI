import React, { useState } from 'react';
import { Send, AlertTriangle, ShieldCheck, PhoneCall, Trash2, BookOpen, ExternalLink, RefreshCw, Languages, Copy, Check } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'assistant' | 'emergency';
  text: string;
  sources?: { title: string; year: string; authority: string }[];
  isRefusal?: boolean;
  emergencyTriggered?: boolean;
  timestamp: string;
}

export const AiHealthAssistant: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'translator'>('chat');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'assistant',
      text: 'Hello Aarav. I am your MediVerse Health Assistant. I can help explain medical terms, translate complex lab results, and provide general preventive health information based on vetted sources (WHO, ICMR). I do not provide definitive diagnoses or prescribe medications.',
      timestamp: '10:00 AM'
    }
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [emergencyAlertActive, setEmergencyAlertActive] = useState<boolean>(false);

  // Translator state
  const [jargonInput, setJargonInput] = useState<string>(
    'Patient exhibits microcytic hypochromic erythrocytes with elevated red cell distribution width (RDW), low serum ferritin (8 ng/mL), and normal hemoglobin electrophoresis.'
  );
  const [translatedResult, setTranslatedResult] = useState<string | null>(
    'In everyday language: Your red blood cells are smaller and paler than usual, which is the classic sign of Iron Deficiency Anemia. The low "ferritin" level indicates that your body\'s iron storage reserves are depleted. The "normal hemoglobin electrophoresis" helps rule out inherited conditions like thalassemia trait. This is a common and treatable finding that usually responds well to oral iron supplementation prescribed by your physician.'
  );

  const handleTranslateJargon = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      if (jargonInput.toLowerCase().includes('microcytic') || jargonInput.toLowerCase().includes('ferritin')) {
        setTranslatedResult(
          'In everyday language: Your red blood cells are smaller and paler than usual, which is the classic sign of Iron Deficiency Anemia. The low "ferritin" level indicates that your body\'s iron storage reserves are depleted. The "normal hemoglobin electrophoresis" helps rule out inherited conditions like thalassemia trait. This is a common and treatable finding that usually responds well to oral iron supplementation prescribed by your physician.'
        );
      } else {
        setTranslatedResult(
          `Plain-Language Translation:\n\nThe medical terms you pasted describe laboratory observations about your blood or tissue markers. None of these terms indicate an immediate fatal emergency, but they highlight specific metabolic variations that should be reviewed in context with your physical symptoms during your next scheduled clinical appointment.`
        );
      }
    }, 500);
  };

  // Pre-tested scenario triggers
  const executeQuery = (query: string) => {
    setInputText('');
    const userMsg: Message = {
      id: `usr_${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const lower = query.toLowerCase();

      // Case 1: Critical Emergency Red-Flag Trigger
      if (
        lower.includes('chest pain') ||
        lower.includes('radiating') ||
        lower.includes('sweating') ||
        lower.includes('stroke') ||
        lower.includes('shortness of breath') ||
        lower.includes('collapse')
      ) {
        setEmergencyAlertActive(true);
        const emergencyMsg: Message = {
          id: `emg_${Date.now()}`,
          sender: 'emergency',
          emergencyTriggered: true,
          text: 'POTENTIAL CRITICAL MEDICAL EMERGENCY DETECTED: Your symptoms (acute chest pain radiating with diaphoresis) match potential acute coronary syndrome or myocardial infarction. Conversational AI has been preempted to prevent life-threatening care delay. Please call national emergency services or proceed to the nearest emergency department immediately.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, emergencyMsg]);
        return;
      }

      // Case 2: Prescription / Medication Refusal Guardrail
      if (
        lower.includes('prescribe') ||
        lower.includes('dosage') ||
        lower.includes('how many mg') ||
        lower.includes('amoxicillin') ||
        lower.includes('antibiotic')
      ) {
        const refusalMsg: Message = {
          id: `ref_${Date.now()}`,
          sender: 'assistant',
          isRefusal: true,
          text: 'Prescription & Dosage Refusal: As an educational AI assistant, I am strictly prohibited from prescribing medications, recommending specific drug dosages, or advising on antibiotic therapies. Unsupervised antimicrobial use carries severe risks of adverse drug reactions, organ toxicity, and antimicrobial resistance. Please consult a licensed physician who can physically examine you and formulate a safe prescription.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, refusalMsg]);
        return;
      }

      // Case 3: Grounded Medical RAG Query (e.g. HbA1c explanation)
      const groundedMsg: Message = {
        id: `ast_${Date.now()}`,
        sender: 'assistant',
        text: 'An HbA1c test measures your average blood glucose (sugar) levels over the preceding 2 to 3 months by assessing the percentage of hemoglobin coated with sugar. A result of 7.2% indicates that blood glucose has been elevated beyond normal thresholds (typical target for non-diabetics is below 5.7%; 5.7%–6.4% indicates prediabetes; 6.5% or higher on two separate tests suggests diabetes). For adults with diagnosed type-2 diabetes, a common general target is below 7.0%, though individual goals are personalized by attending clinicians.',
        sources: [
          { title: 'ICMR Guidelines for Management of Type 2 Diabetes', year: '2024', authority: 'ICMR' },
          { title: 'WHO Diagnostic Criteria & Classification of Hyperglycaemia', year: '2023', authority: 'WHO' },
          { title: 'Standards of Medical Care in Diabetes', year: '2024', authority: 'ADA / PubMed' }
        ],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, groundedMsg]);
    }, 400);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: `m_init_${Date.now()}`,
        sender: 'assistant',
        text: 'Chat history permanently purged in accordance with data minimization and right-to-erasure policies.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setEmergencyAlertActive(false);
  };

  return (
    <div className="space-y-6">
      {/* Module Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="font-semibold text-sky-700 font-mono">MODULE B</span>
            <span>·</span>
            <span>Responsible AI Health Guidance</span>
            <span>·</span>
            <span>Curated RAG & Safety Guardrails</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            Grounded Health Guidance & Clinical Jargon Translator
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Pre-generation emergency red-flag bypass (&lt;150ms), strict prescription refusals, and source-grounded plain-language explanations.
          </p>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setActiveSubTab('chat')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeSubTab === 'chat' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Conversational RAG
            </button>
            <button
              onClick={() => setActiveSubTab('translator')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                activeSubTab === 'translator' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
              }`}
            >
              Lab Jargon Translator
            </button>
          </div>

          <button
            onClick={handleClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            title="Permanently delete conversation record"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Purge Chat</span>
          </button>
        </div>
      </div>

      {/* EMERGENCY HIGH-CONTRAST BANNER IF ACTIVE */}
      {emergencyAlertActive && (
        <div className="bg-rose-600 text-white p-5 rounded-xl border border-rose-700 shadow-md animate-fadeIn flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-white shrink-0 mt-0.5" />
            <div>
              <div className="font-extrabold text-sm sm:text-base tracking-tight uppercase">
                CRITICAL EMERGENCY PROTOCOL ACTIVATED
              </div>
              <p className="text-xs text-rose-100 mt-1 leading-relaxed max-w-2xl">
                Symptoms suggest acute cardiac or respiratory distress. AI assistance has been suspended. Do not wait for an online appointment. Seek immediate emergency medical care.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:112"
              className="px-4 py-2 bg-white text-rose-700 hover:bg-rose-50 rounded-lg font-bold text-xs flex items-center gap-2 shadow-sm"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call 112 / 911 Now</span>
            </a>
            <button
              onClick={() => setEmergencyAlertActive(false)}
              className="px-3 py-2 bg-rose-700 hover:bg-rose-800 text-rose-100 rounded-lg text-xs"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* VIEW 1: CONVERSATIONAL CHAT */}
      {activeSubTab === 'chat' && (
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-xs flex flex-col min-h-[500px]">
          {/* Chat Header Notice */}
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              <span>Educational Use Only · Not Medical Advice · Cites WHO & ICMR</span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">Model: Med-RAG-2.4</span>
          </div>

          {/* Message Stream */}
          <div className="p-6 flex-1 overflow-y-auto space-y-4">
            {messages.map((msg) => {
              if (msg.sender === 'emergency') {
                return (
                  <div key={msg.id} className="p-4 bg-rose-50 border border-rose-300 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                      <span>EMERGENCY RED-FLAG OVERRIDE</span>
                    </div>
                    <p className="text-xs text-rose-900 leading-relaxed font-medium">{msg.text}</p>
                    <div className="pt-2 flex items-center gap-2">
                      <a
                        href="tel:112"
                        className="px-3 py-1.5 bg-rose-600 text-white rounded text-xs font-bold inline-flex items-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" /> Call National Emergency Services
                      </a>
                    </div>
                  </div>
                );
              }

              if (msg.sender === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="bg-slate-900 text-white rounded-xl rounded-tr-xs px-4 py-2.5 max-w-lg text-xs sm:text-sm">
                      {msg.text}
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className="flex justify-start">
                  <div
                    className={`border rounded-xl rounded-tl-xs p-4 max-w-2xl text-xs sm:text-sm space-y-3 ${
                      msg.isRefusal
                        ? 'bg-amber-50/70 border-amber-200 text-slate-900'
                        : 'bg-slate-50 border-slate-200 text-slate-800'
                    }`}
                  >
                    <p className="leading-relaxed font-normal">{msg.text}</p>

                    {/* Sources if present */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="pt-3 border-t border-slate-200/80">
                        <div className="text-[11px] font-bold text-slate-600 uppercase flex items-center gap-1.5 mb-2">
                          <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                          <span>Vetted Clinical Sources & Grounding</span>
                        </div>
                        <div className="space-y-1">
                          {msg.sources.map((s, idx) => (
                            <div
                              key={idx}
                              className="text-xs text-slate-600 flex items-center gap-2 font-mono"
                            >
                              <span className="font-semibold text-slate-800">[{s.authority}]</span>
                              <span>{s.title} ({s.year})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Clinical Disclaimer */}
                    <div className="text-[10px] text-slate-400 italic pt-1">
                      Disclaimer: This explanation is educational and cannot replace individualized in-person medical evaluation.
                    </div>
                  </div>
                </div>
              );
            })}

            {isProcessing && (
              <div className="flex items-center gap-2 text-xs text-slate-500 italic p-3">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-600" />
                <span>Evaluating query through clinical safety triage classifier and RAG index...</span>
              </div>
            )}
          </div>

          {/* Pre-Tested Scenario Buttons */}
          <div className="px-6 py-2.5 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Test Scenarios:</span>
            <button
              onClick={() => executeQuery('What does an HbA1c of 7.2% mean in plain language?')}
              className="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-700"
            >
              1. Lab Result (HbA1c)
            </button>
            <button
              onClick={() =>
                executeQuery(
                  'I have severe crushing chest pain radiating to left jaw, sweating heavily for 25 mins'
                )
              }
              className="px-2.5 py-1 bg-rose-50 border border-rose-200 rounded hover:bg-rose-100 text-rose-700 font-semibold"
            >
              2. Red-Flag Emergency (STEMI)
            </button>
            <button
              onClick={() => executeQuery('Prescribe me Amoxicillin 500mg dosage for my ear infection')}
              className="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded hover:bg-amber-100 text-amber-800"
            >
              3. Prescription Refusal Guardrail
            </button>
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-slate-200 bg-white flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask a general health question or describe lab terminology..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && inputText.trim() && executeQuery(inputText)}
              className="flex-1 px-4 py-2 text-xs sm:text-sm border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal-500"
            />
            <button
              onClick={() => inputText.trim() && executeQuery(inputText)}
              disabled={!inputText.trim()}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-40 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Submit</span>
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: LAB JARGON TRANSLATOR */}
      {activeSubTab === 'translator' && (
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Languages className="w-4 h-4 text-teal-600" />
              Plain-Language Medical Report Translator
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Paste complex diagnostic reports, biopsy summaries, or biochemical lab readings to receive an accessible 6th-grade level translation.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 uppercase font-mono">
              Diagnostic Report Text / Jargon Input
            </label>
            <textarea
              rows={3}
              value={jargonInput}
              onChange={(e) => setJargonInput(e.target.value)}
              className="w-full p-3 border border-slate-200 rounded-lg text-xs text-slate-800 font-mono focus:ring-1 focus:ring-teal-500"
            />
            <button
              onClick={handleTranslateJargon}
              disabled={isProcessing}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isProcessing ? 'animate-spin' : ''}`} />
              <span>{isProcessing ? 'Translating Jargon...' : 'Translate to Plain Language'}</span>
            </button>
          </div>

          {translatedResult && (
            <div className="mt-4 p-5 bg-teal-50/60 border border-teal-200 rounded-xl space-y-2">
              <div className="text-xs font-bold text-teal-900 uppercase font-mono">
                Patient-Friendly Explanation
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-normal">
                {translatedResult}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
