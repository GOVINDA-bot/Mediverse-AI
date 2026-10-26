import React, { useState } from 'react';
import { Activity, AlertOctagon, CheckCircle2, RotateCcw, Stethoscope, Clock, DollarSign, Award, ChevronRight, BookOpen } from 'lucide-react';
import { AnimatedEcgMonitor } from '../simulation/AnimatedEcgMonitor';

interface SimulationCase {
  id: string;
  title: string;
  patientInfo: string;
  history: string;
  pastMedical: string;
  vitals: {
    hr: number;
    bp: string;
    spo2: number;
    rr: number;
    temp: string;
  };
  rhythm: 'STEMI' | 'SINUS' | 'VT' | 'BRADY';
  differentials: string[];
  investigations: {
    code: string;
    name: string;
    cost: number;
    time: number;
    finding: string;
  }[];
  correctTreatment: {
    title: string;
    description: string;
    explanation: string;
  };
  wrongTreatment: {
    title: string;
    description: string;
    explanation: string;
  };
}

const CASES: SimulationCase[] = [
  {
    id: 'case_101',
    title: 'Case 101: 54yo Male · Acute Retrosternal Chest Pain (STEMI)',
    patientInfo: '54-year-old accountant · Emergency Department Arrival',
    history: 'Presents with sudden-onset heavy retrosternal pressure described as "an elephant sitting on my chest" that began 35 minutes ago while climbing stairs. The pain radiates to his left shoulder and medial arm. He appears pale and diaphoretic.',
    pastMedical: '10-year history of cigarette smoking (1 pack/day), dyslipidemia, and borderline hypertension on irregular medication. No known drug allergies.',
    vitals: { hr: 98, bp: '142/88', spo2: 97, rr: 20, temp: '37.1' },
    rhythm: 'STEMI',
    differentials: [
      'Acute Myocardial Infarction (STEMI / NSTEMI)',
      'Aortic Dissection',
      'Pulmonary Embolism',
      'Gastroesophageal Reflux Disease (GERD)',
      'Acute Pericarditis',
      'Tension Pneumothorax'
    ],
    investigations: [
      { code: 'ECG', name: '12-Lead Electrocardiogram', cost: 40, time: 5, finding: 'ST-segment elevation of 3.5mm in leads V2-V5 with reciprocal ST depression in II, III, aVF. Consistent with Acute Anterior STEMI.' },
      { code: 'TROPONIN', name: 'Serum Troponin I (High-Sensitivity)', cost: 65, time: 20, finding: 'Troponin I: 3.42 ng/mL (Reference normal: < 0.04 ng/mL). Markedly elevated.' },
      { code: 'CXR', name: 'Portable Chest Radiograph (AP)', cost: 75, time: 15, finding: 'Normal mediastinal width (no widening). No pneumothorax. Clear lung parenchyma.' },
      { code: 'D_DIMER', name: 'Quantitative D-Dimer', cost: 55, time: 25, finding: 'D-Dimer: 320 ng/mL (Normal < 500 ng/mL). Low probability of pulmonary embolism.' }
    ],
    correctTreatment: {
      title: 'Dual Antiplatelet Therapy + Urgent Cath Lab Activation (Primary PCI)',
      description: 'Chewed Aspirin 300mg + Ticagrelor 180mg, IV Heparin bolus, and immediate Code STEMI catheterization activation.',
      explanation: 'Excellent clinical judgment. Early dual antiplatelet therapy combined with immediate catheterization laboratory activation adheres strictly to international and ICMR STEMI guidelines for acute LAD coronary occlusion.'
    },
    wrongTreatment: {
      title: 'High-Dose IV Nitroglycerin Monotherapy without Revascularization',
      description: 'Administer high-dose IV Nitroglycerin infusion without antiplatelet loading or cath lab team notification.',
      explanation: 'Critical Error: In acute transmural infarction, high-dose IV vasodilators without revascularization precipitate severe reflex tachycardia, decreased coronary perfusion pressure, and profound cardiogenic shock (as demonstrated by the BP drop to 72/44 mmHg).'
    }
  },
  {
    id: 'case_102',
    title: 'Case 102: 19yo Female · Severe Acute Asthma Exacerbation',
    patientInfo: '19-year-old university student · Urgent Care Center',
    history: 'Brought in by roommate with progressive shortness of breath, audible expiratory wheezing, and inability to speak in full sentences (2-3 words per breath). Inhaled albuterol canister was emptied at home with no relief.',
    pastMedical: 'Known moderate persistent asthma since age 7. Allergic to dust mites. No prior intubations.',
    vitals: { hr: 122, bp: '130/84', spo2: 91, rr: 32, temp: '36.9' },
    rhythm: 'SINUS',
    differentials: [
      'Severe Acute Asthma Exacerbation',
      'Anaphylaxis',
      'Foreign Body Aspiration',
      'Acute Spontaneous Pneumothorax',
      'Hyperventilation Syndrome'
    ],
    investigations: [
      { code: 'PEAK_FLOW', name: 'Peak Expiratory Flow (PEF)', cost: 20, time: 3, finding: 'PEF: 160 L/min (Predicted: 450 L/min, ~35% of predicted - severe obstruction).' },
      { code: 'ABG', name: 'Arterial Blood Gas (ABG)', cost: 80, time: 10, finding: 'pH: 7.38, PaCO2: 42 mmHg (pseudonormal PaCO2 in a tachypneic patient indicates impending respiratory fatigue!). PaO2: 64 mmHg.' },
      { code: 'CXR', name: 'Chest Radiograph (PA View)', cost: 75, time: 15, finding: 'Bilateral hyperinflation with flattened diaphragms. No pneumothorax or consolidation.' }
    ],
    correctTreatment: {
      title: 'Continuous Nebulized Salbutamol + Ipratropium + IV Hydrocortisone',
      description: 'High-dose back-to-back beta-2 agonist with anticholinergic nebulization, systemic corticosteroids, and titrated oxygen.',
      explanation: 'Optimal management. The "normal" PaCO2 of 42 mmHg was a red flag for respiratory muscle exhaustion. Aggressive bronchodilation combined with systemic steroids rapidly reduced airway resistance and prevented mechanical intubation.'
    },
    wrongTreatment: {
      title: 'Oral Sedation (Benzodiazepine) to Relieve Agitation',
      description: 'Administer Lorazepam 2mg IV to calm patient anxiety and reduce respiratory drive.',
      explanation: 'Catastrophic Error: Sedatives are strictly contraindicated in severe acute asthma. Suppressing respiratory drive in an exhausted patient precipitates immediate respiratory arrest and hypoxemic coma.'
    }
  }
];

export const ClinicalSimulationLab: React.FC = () => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>('case_101');
  const currentCase = CASES.find((c) => c.id === selectedCaseId) || CASES[0];

  const [stage, setStage] = useState<'history' | 'differentials' | 'investigations' | 'treatment' | 'debrief'>('history');
  const [vitals, setVitals] = useState(currentCase.vitals);
  const [currentRhythm, setCurrentRhythm] = useState<'STEMI' | 'SINUS' | 'VT' | 'BRADY'>(currentCase.rhythm);
  const [alarmActive, setAlarmActive] = useState(false);
  const [differentialsChosen, setDifferentialsChosen] = useState<string[]>([]);
  const [orderedTests, setOrderedTests] = useState<string[]>([]);
  const [treatmentChosen, setTreatmentChosen] = useState<'correct' | 'wrong' | null>(null);
  const [virtualCost, setVirtualCost] = useState(0);
  const [virtualTime, setVirtualTime] = useState(0);
  const [score, setScore] = useState<{ accuracy: number; efficiency: number; safety: number; total: number } | null>(null);

  const handleCaseChange = (caseId: string) => {
    const nextCase = CASES.find((c) => c.id === caseId) || CASES[0];
    setSelectedCaseId(caseId);
    setStage('history');
    setVitals(nextCase.vitals);
    setCurrentRhythm(nextCase.rhythm);
    setAlarmActive(false);
    setDifferentialsChosen([]);
    setOrderedTests([]);
    setTreatmentChosen(null);
    setVirtualCost(0);
    setVirtualTime(0);
    setScore(null);
  };

  const toggleDifferential = (diff: string) => {
    if (differentialsChosen.includes(diff)) {
      setDifferentialsChosen(differentialsChosen.filter((d) => d !== diff));
    } else {
      if (differentialsChosen.length < 3) {
        setDifferentialsChosen([...differentialsChosen, diff]);
      }
    }
  };

  const handleOrderTest = (test: { code: string; cost: number; time: number }) => {
    if (!orderedTests.includes(test.code)) {
      setOrderedTests([...orderedTests, test.code]);
      setVirtualCost((prev) => prev + test.cost);
      setVirtualTime((prev) => prev + test.time);
    }
  };

  const handleSelectTreatment = (type: 'correct' | 'wrong') => {
    let newV = { ...vitals };
    let alarm = false;
    let rhythm: 'STEMI' | 'SINUS' | 'VT' | 'BRADY' = currentRhythm;

    let accuracy = 40;
    let efficiency = Math.max(15, 30 - Math.floor(virtualCost / 15));
    let safety = 30;

    if (type === 'correct') {
      newV = { hr: 78, bp: '124/80', spo2: 98, rr: 16, temp: '37.0' };
      rhythm = 'SINUS';
      accuracy = 40;
      safety = 30;
    } else {
      newV = { hr: 132, bp: '72/44', spo2: 89, rr: 28, temp: '36.8' };
      alarm = true;
      rhythm = 'VT';
      accuracy = 18;
      safety = 8;
    }

    const total = accuracy + efficiency + safety;

    setVitals(newV);
    setAlarmActive(alarm);
    setCurrentRhythm(rhythm);
    setTreatmentChosen(type);
    setStage('debrief');
    setScore({ accuracy, efficiency, safety, total });
  };

  const handleReset = () => {
    handleCaseChange(selectedCaseId);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Case Switcher */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="font-semibold text-teal-700 font-mono">MODULE D</span>
            <span>·</span>
            <span>Virtual Clinical Training & Reasoning Simulator</span>
            <span>·</span>
            <span>Physiologic Engine</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            {currentCase.title}
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            {currentCase.patientInfo} · Formulate differentials, order targeted diagnostics, and execute emergency interventions.
          </p>
        </div>

        {/* Case selector dropdown & Reset */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCaseId}
            onChange={(e) => handleCaseChange(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium focus:ring-1 focus:ring-teal-500"
          >
            <option value="case_101">Case 101: 54yo Acute STEMI</option>
            <option value="case_102">Case 102: 19yo Severe Asthma</option>
          </select>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Dynamic Animated Cardiac Monitor & Vitals Readout */}
      <div
        className={`rounded-xl border p-5 transition-colors shadow-sm space-y-4 ${
          alarmActive
            ? 'bg-rose-950 border-rose-600 text-rose-100 animate-pulse'
            : 'bg-slate-900 border-slate-800 text-white'
        }`}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-800 text-xs">
          <div className="flex items-center gap-2 font-mono">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="font-bold text-slate-200">
              REAL-TIME PHYSIOLOGICAL MONITOR
            </span>
            {alarmActive && (
              <span className="px-2 py-0.5 bg-rose-600 text-white rounded text-[10px] font-bold animate-ping">
                CRITICAL HYPOTENSION & VT ALARM
              </span>
            )}
          </div>

          <div className="flex items-center gap-6 font-mono text-xs text-slate-300">
            <span>Virtual Time: <strong className="text-teal-400">{virtualTime} mins</strong></span>
            <span>Accrued Cost: <strong className="text-teal-400">${virtualCost}</strong></span>
          </div>
        </div>

        {/* Animated ECG Waveform Canvas */}
        <AnimatedEcgMonitor
          rhythm={currentRhythm}
          heartRate={vitals.hr}
          alarmActive={alarmActive}
        />

        {/* Numeric Telemetry Readouts */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center font-mono text-xs">
          <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg">
            <div className="text-[10px] text-slate-400 uppercase">Heart Rate</div>
            <div className="text-xl font-bold text-emerald-400 mt-0.5">{vitals.hr}</div>
            <div className="text-[10px] text-slate-500">bpm</div>
          </div>

          <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg">
            <div className="text-[10px] text-slate-400 uppercase">Blood Pressure</div>
            <div className="text-xl font-bold text-sky-400 mt-0.5">{vitals.bp}</div>
            <div className="text-[10px] text-slate-500">mmHg</div>
          </div>

          <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg">
            <div className="text-[10px] text-slate-400 uppercase">Oxygen (SpO2)</div>
            <div className="text-xl font-bold text-teal-400 mt-0.5">{vitals.spo2}%</div>
            <div className="text-[10px] text-slate-500">Saturation</div>
          </div>

          <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg">
            <div className="text-[10px] text-slate-400 uppercase">Resp Rate</div>
            <div className="text-xl font-bold text-amber-400 mt-0.5">{vitals.rr}</div>
            <div className="text-[10px] text-slate-500">/min</div>
          </div>

          <div className="p-2.5 bg-slate-950/80 border border-slate-800 rounded-lg col-span-2 sm:col-span-1">
            <div className="text-[10px] text-slate-400 uppercase">Temperature</div>
            <div className="text-xl font-bold text-purple-400 mt-0.5">{vitals.temp}°C</div>
            <div className="text-[10px] text-slate-500">Core</div>
          </div>
        </div>
      </div>

      {/* Main Simulation Stage Workflow */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-6">
        {/* Stage Navigation Header */}
        <div className="flex items-center gap-1.5 border-b border-slate-100 pb-3 text-xs font-semibold overflow-x-auto">
          {[
            { id: 'history', label: '1. History & Exam' },
            { id: 'differentials', label: '2. Differential Diagnoses' },
            { id: 'investigations', label: '3. Order Diagnostics' },
            { id: 'treatment', label: '4. Interventions' },
            { id: 'debrief', label: '5. Rubric Debrief' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setStage(st.id as any)}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                stage === st.id
                  ? 'bg-teal-600 text-white font-bold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {st.label}
            </button>
          ))}
        </div>

        {/* STAGE 1: HISTORY & EXAM */}
        {stage === 'history' && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
              <h4 className="font-bold text-slate-900 text-base">History of Present Illness</h4>
              <p className="text-slate-700 leading-relaxed font-normal">
                {currentCase.history}
              </p>
              <div className="pt-2 border-t border-slate-200 text-slate-600">
                <strong className="text-slate-800">Past Medical & Social History:</strong> {currentCase.pastMedical}
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setStage('differentials')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Proceed to Differential Diagnoses</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: DIFFERENTIALS */}
        {stage === 'differentials' && (
          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <h4 className="font-bold text-slate-900 text-base">Formulate Clinical Differentials</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Select your top differential hypotheses (select up to 3):
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentCase.differentials.map((diff) => {
                const isSelected = differentialsChosen.includes(diff);
                return (
                  <button
                    key={diff}
                    onClick={() => toggleDifferential(diff)}
                    className={`p-3.5 rounded-lg border text-left text-xs transition-colors flex items-center justify-between ${
                      isSelected
                        ? 'bg-teal-50 border-teal-300 text-teal-900 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{diff}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500">
                Selected: {differentialsChosen.length} of 3
              </span>
              <button
                disabled={differentialsChosen.length === 0}
                onClick={() => setStage('investigations')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Proceed to Order Diagnostics</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: ORDER INVESTIGATIONS */}
        {stage === 'investigations' && (
          <div className="space-y-5 text-xs sm:text-sm">
            <div>
              <h4 className="font-bold text-slate-900 text-base">Diagnostic Investigation Marketplace</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Order necessary tests. Diagnostic accuracy must be balanced against unnecessary costs and time delay.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {currentCase.investigations.map((test) => {
                const isOrdered = orderedTests.includes(test.code);
                return (
                  <div
                    key={test.code}
                    className={`p-4 rounded-xl border transition-colors ${
                      isOrdered ? 'bg-slate-50 border-teal-300' : 'border-slate-200'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">{test.name}</div>
                      <span className="font-mono text-xs text-slate-500">
                        ${test.cost} · {test.time}m
                      </span>
                    </div>

                    {isOrdered ? (
                      <div className="mt-2 p-3 bg-teal-50 border border-teal-200 rounded text-xs text-teal-950 font-mono">
                        <strong className="block text-teal-900 text-[11px] uppercase font-sans mb-0.5">
                          Revealed Findings:
                        </strong>
                        {test.finding}
                      </div>
                    ) : (
                      <button
                        onClick={() => handleOrderTest(test)}
                        className="mt-3 w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-medium transition-colors"
                      >
                        Order Test
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-100">
              <button
                disabled={orderedTests.length === 0}
                onClick={() => setStage('treatment')}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5"
              >
                <span>Select Therapeutic Interventions</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4: TREATMENT */}
        {stage === 'treatment' && (
          <div className="space-y-5 text-xs sm:text-sm">
            <div>
              <h4 className="font-bold text-slate-900 text-base">Emergency Therapeutic Decision</h4>
              <p className="text-xs text-slate-500 mt-0.5">
                Select your clinical treatment protocol based on your findings:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleSelectTreatment('correct')}
                className="p-5 rounded-xl border border-teal-300 hover:bg-teal-50/50 text-left space-y-2 transition-all shadow-xs"
              >
                <div className="font-bold text-teal-900 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600" />
                  <span>Protocol A: {currentCase.correctTreatment.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {currentCase.correctTreatment.description}
                </p>
              </button>

              <button
                onClick={() => handleSelectTreatment('wrong')}
                className="p-5 rounded-xl border border-rose-200 hover:bg-rose-50/50 text-left space-y-2 transition-all shadow-xs"
              >
                <div className="font-bold text-rose-900 text-sm flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-rose-600" />
                  <span>Protocol B: {currentCase.wrongTreatment.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {currentCase.wrongTreatment.description}
                </p>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 5: DEBRIEF & RUBRIC */}
        {stage === 'debrief' && score && (
          <div className="space-y-6 text-xs sm:text-sm">
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 text-teal-700 font-bold">
                    <Award className="w-5 h-5 text-teal-600" />
                    <span className="text-base sm:text-lg">Objective Competency Debrief</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Faculty Reviewer: Prof. Sunita Deshmukh, MD (Head of Clinical Education)
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block">Final Rubric Score</span>
                  <span className="text-2xl font-black font-mono text-slate-900 tabular-nums">
                    {score.total} / 100
                  </span>
                </div>
              </div>

              {/* Rubric Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Diagnostic Accuracy</div>
                  <div className="text-lg font-bold font-mono text-teal-700 mt-1">
                    {score.accuracy} / 40
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Differential formulation accuracy</div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Resource Efficiency</div>
                  <div className="text-lg font-bold font-mono text-sky-700 mt-1">
                    {score.efficiency} / 30
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">${virtualCost} test expenditure</div>
                </div>

                <div className="p-3.5 bg-white border border-slate-200 rounded-lg">
                  <div className="text-[10px] uppercase font-bold text-slate-400">Patient Safety & Timing</div>
                  <div
                    className={`text-lg font-bold font-mono mt-1 ${
                      score.safety >= 25 ? 'text-emerald-700' : 'text-rose-700'
                    }`}
                  >
                    {score.safety} / 30
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">Hemodynamic stability preservation</div>
                </div>
              </div>

              {/* Clinical Commentary */}
              <div className="p-4 bg-white border border-slate-200 rounded-lg space-y-2">
                <h5 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-teal-600" />
                  <span>Faculty Debrief & Pathophysiology Feedback</span>
                </h5>
                <p className="text-slate-700 leading-relaxed text-xs">
                  {treatmentChosen === 'correct'
                    ? currentCase.correctTreatment.explanation
                    : currentCase.wrongTreatment.explanation}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Repeat Case / Explore Alternate Decision</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
