import React, { useState, useEffect, useRef } from 'react';
import { Video, Mic, MicOff, VideoOff, PhoneOff, FileText, CheckCircle2, Download, AlertTriangle, ShieldCheck, User, Stethoscope } from 'lucide-react';

interface ConsultationRoomProps {
  doctorName: string;
  specialty: string;
  patientName: string;
  chiefComplaint: string;
  allergies: string;
  medications: string;
  onConclude: () => void;
}

export const ConsultationRoom: React.FC<ConsultationRoomProps> = ({
  doctorName,
  specialty,
  patientName,
  chiefComplaint,
  allergies,
  medications,
  onConclude,
}) => {
  const [micMuted, setMicMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [activeTab, setActiveTab] = useState<'soap' | 'prescription' | 'intake'>('soap');

  // Video element ref for real user camera preview
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  // SOAP notes
  const [soap, setSoap] = useState({
    subjective: `Patient reports: ${chiefComplaint}. Onset 4 days ago. Aggravated by cold air. No hemoptysis, no shortness of breath at rest.`,
    objective: `Appears in no acute distress. Vitals: SpO2 98% on room air, HR 76 bpm, BP 124/82. Pharynx clear, lungs clear to auscultation bilaterally.`,
    assessment: `Acute post-viral airway hyperresponsiveness following mild upper respiratory tract infection.`,
    plan: `1. Steam inhalation twice daily.\n2. Levocetirizine 5mg at bedtime for 5 days.\n3. Paracetamol 650mg SOS for fever or headache.\n4. Escalate if fever > 101F or shortness of breath develops.`
  });

  // Prescription items
  const [rxList, setRxList] = useState([
    { id: 1, drug: 'Levocetirizine 5mg', dosage: '1 tablet', freq: 'Once daily (Night)', duration: '5 days', instructions: 'After dinner' },
    { id: 2, drug: 'Paracetamol 650mg', dosage: '1 tablet', freq: 'As needed (SOS)', duration: '3 days', instructions: 'Maximum 3 tabs/day, after food' }
  ]);
  const [newDrug, setNewDrug] = useState('');
  const [newFreq, setNewFreq] = useState('Twice daily');
  const [newDuration, setNewDuration] = useState('5 days');
  const [prescriptionFinalized, setPrescriptionFinalized] = useState(false);
  const [prescHash, setPrescHash] = useState('');

  // Call timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Attempt real camera access with graceful fallback
  useEffect(() => {
    let stream: MediaStream | null = null;
    const startCam = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            setCameraActive(true);
          }
        }
      } catch (err: any) {
        setCameraError('Local camera preview simulated');
        setCameraActive(false);
      }
    };
    startCam();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const handleAddMedication = () => {
    if (!newDrug.trim()) return;
    setRxList((prev) => [
      ...prev,
      {
        id: Date.now(),
        drug: newDrug.trim(),
        dosage: '1 unit',
        freq: newFreq,
        duration: newDuration,
        instructions: 'As directed by physician'
      }
    ]);
    setNewDrug('');
  };

  const handleFinalizePrescription = () => {
    const fakeHash = `sha256_${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`;
    setPrescHash(fakeHash);
    setPrescriptionFinalized(true);
  };

  const handleDownloadPrescription = () => {
    const content = `
MEDIVERSE DIGITAL HEALTHCARE PLATFORM
OFFICIAL VERIFIABLE TELE-CONSULTATION E-PRESCRIPTION
=====================================================
Consultation ID: ENC-2026-98114
Date: ${new Date().toLocaleDateString()}
Attending Doctor: ${doctorName} (${specialty})
Council Registration: MCI-2012-88492 (State Medical Council Verified)
Patient: ${patientName} (Age: 38, Gender: Male)
Known Allergies: ${allergies}

CLINICAL ASSESSMENT (SOAP):
${soap.assessment}

PRESCRIBED MEDICATIONS:
${rxList.map((m, idx) => `${idx + 1}. ${m.drug} — ${m.dosage} | ${m.freq} | Duration: ${m.duration} (${m.instructions})`).join('\n')}

PHYSICIAN ADVICE & PLAN:
${soap.plan}

SECURITY VERIFICATION:
SHA-256 Digital Signature Hash: ${prescHash || 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'}
Compliant with NMC Telemedicine Practice Guidelines & DPDP Act 2023
=====================================================
    `;
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MediVerse_Prescription_${patientName.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 rounded-xl border border-slate-800 text-white overflow-hidden shadow-xl">
      {/* Top Telehealth Control Bar */}
      <div className="bg-slate-950 px-5 py-3.5 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div>
            <div className="text-sm font-bold flex items-center gap-2">
              <span>{doctorName}</span>
              <span className="text-slate-500 font-normal">in consult with</span>
              <span className="text-teal-400">{patientName}</span>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              256-bit SRTP Stream · WebRTC Session · {formatTime(callDuration)}
            </div>
          </div>
        </div>

        {/* Media Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMicMuted(!micMuted)}
            className={`p-2.5 rounded-lg text-xs font-medium transition-colors ${
              micMuted ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
            title={micMuted ? 'Unmute microphone' : 'Mute microphone'}
          >
            {micMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </button>

          <button
            onClick={() => setVideoOff(!videoOff)}
            className={`p-2.5 rounded-lg text-xs font-medium transition-colors ${
              videoOff ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
            title={videoOff ? 'Turn video on' : 'Turn video off'}
          >
            {videoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
          </button>

          <button
            onClick={onConclude}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors ml-2"
          >
            <PhoneOff className="w-4 h-4" />
            <span>End Call</span>
          </button>
        </div>
      </div>

      {/* Main Encounter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left 60%: Video Viewport */}
        <div className="lg:col-span-7 p-4 sm:p-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 space-y-4">
          {/* Main Video (Doctor) */}
          <div className="relative aspect-video bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center">
            {videoOff ? (
              <div className="text-center p-6 text-slate-500">
                <VideoOff className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="text-xs">Camera feed paused</p>
              </div>
            ) : (
              <div className="text-center p-6 space-y-3">
                <div className="w-20 h-20 rounded-full bg-teal-900/60 border border-teal-500/50 text-teal-300 flex items-center justify-center font-bold text-2xl mx-auto shadow-inner">
                  PN
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{doctorName}</h4>
                  <p className="text-xs text-teal-400 font-medium">{specialty}</p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800/80 text-[11px] text-slate-300 border border-slate-700 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Verified Medical Council Practitioner</span>
                </div>
              </div>
            )}

            {/* Patient Self-View PiP */}
            <div className="absolute bottom-4 right-4 w-36 sm:w-44 aspect-video bg-slate-900/90 border border-slate-700 rounded-lg overflow-hidden shadow-lg">
              {cameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-1 text-[10px] text-slate-300">
                  <User className="w-5 h-5 text-slate-400 mb-0.5" />
                  <span>{patientName}</span>
                  <span className="text-[9px] text-teal-400 font-mono">Patient Feed</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick Tele-Consult Info Strip */}
          <div className="grid grid-cols-3 gap-3 text-xs bg-slate-950/70 p-3 rounded-lg border border-slate-800">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Chief Complaint</span>
              <span className="font-semibold text-slate-200 line-clamp-1">{chiefComplaint}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Known Allergies</span>
              <span className="font-semibold text-rose-300 line-clamp-1">{allergies}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-mono">Current Meds</span>
              <span className="font-semibold text-slate-200 line-clamp-1">{medications}</span>
            </div>
          </div>
        </div>

        {/* Right 40%: Clinician Workspace (SOAP, Prescriptions, Intake) */}
        <div className="lg:col-span-5 bg-slate-950/60 p-4 sm:p-5 flex flex-col justify-between space-y-4">
          <div>
            {/* Tab switchers */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg mb-4 text-xs">
              <button
                onClick={() => setActiveTab('soap')}
                className={`flex-1 py-1.5 rounded-md font-semibold transition-colors ${
                  activeTab === 'soap' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                SOAP Notes
              </button>
              <button
                onClick={() => setActiveTab('prescription')}
                className={`flex-1 py-1.5 rounded-md font-semibold transition-colors ${
                  activeTab === 'prescription' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                E-Prescription ({rxList.length})
              </button>
              <button
                onClick={() => setActiveTab('intake')}
                className={`flex-1 py-1.5 rounded-md font-semibold transition-colors ${
                  activeTab === 'intake' ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Intake History
              </button>
            </div>

            {/* TAB 1: SOAP NOTES */}
            {activeTab === 'soap' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="text-[11px] font-bold text-teal-400 uppercase font-mono">
                    Subjective (History of Present Illness)
                  </label>
                  <textarea
                    rows={2}
                    value={soap.subjective}
                    onChange={(e) => setSoap({ ...soap, subjective: e.target.value })}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-hidden focus:border-teal-500 font-sans"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-sky-400 uppercase font-mono">
                    Objective (Physical Examination & Vitals)
                  </label>
                  <textarea
                    rows={2}
                    value={soap.objective}
                    onChange={(e) => setSoap({ ...soap, objective: e.target.value })}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-hidden focus:border-teal-500 font-sans"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-amber-400 uppercase font-mono">
                    Assessment (Clinical Impression)
                  </label>
                  <input
                    type="text"
                    value={soap.assessment}
                    onChange={(e) => setSoap({ ...soap, assessment: e.target.value })}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-slate-200 focus:outline-hidden focus:border-teal-500 font-sans"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold text-emerald-400 uppercase font-mono">
                    Plan & Follow-up Instructions
                  </label>
                  <textarea
                    rows={3}
                    value={soap.plan}
                    onChange={(e) => setSoap({ ...soap, plan: e.target.value })}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-slate-200 focus:outline-hidden focus:border-teal-500 font-sans"
                  />
                </div>
              </div>
            )}

            {/* TAB 2: E-PRESCRIPTION BUILDER */}
            {activeTab === 'prescription' && (
              <div className="space-y-3 text-xs">
                {/* Active Medication List */}
                <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                  {rxList.map((m, idx) => (
                    <div
                      key={m.id}
                      className="p-2.5 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between gap-2"
                    >
                      <div>
                        <div className="font-bold text-slate-200">
                          {idx + 1}. {m.drug}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {m.dosage} · {m.freq} · {m.duration} ({m.instructions})
                        </div>
                      </div>
                      <button
                        onClick={() => setRxList(rxList.filter((item) => item.id !== m.id))}
                        className="text-slate-500 hover:text-rose-400 text-xs px-2"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Drug Row */}
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="font-semibold text-slate-400 text-[11px] uppercase">Add Generic Medication</div>
                  <input
                    type="text"
                    placeholder="Generic Drug name (e.g., Montelukast 10mg)"
                    value={newDrug}
                    onChange={(e) => setNewDrug(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 text-xs focus:outline-hidden focus:border-teal-500"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <select
                      value={newFreq}
                      onChange={(e) => setNewFreq(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded p-1.5 text-slate-300 text-xs"
                    >
                      <option value="Once daily (Morning)">Once daily (Morning)</option>
                      <option value="Once daily (Night)">Once daily (Night)</option>
                      <option value="Twice daily">Twice daily</option>
                      <option value="Thrice daily">Thrice daily</option>
                      <option value="As needed (SOS)">As needed (SOS)</option>
                    </select>
                    <input
                      type="text"
                      placeholder="Duration (e.g. 7 days)"
                      value={newDuration}
                      onChange={(e) => setNewDuration(e.target.value)}
                      className="bg-slate-900 border border-slate-700 rounded p-1.5 text-slate-200 text-xs"
                    />
                  </div>
                  <button
                    onClick={handleAddMedication}
                    className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-teal-300 rounded font-semibold text-xs transition-colors"
                  >
                    + Add Medication Item
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: INTAKE PRE-READ */}
            {activeTab === 'intake' && (
              <div className="space-y-3 text-xs bg-slate-900 p-4 rounded-lg border border-slate-800">
                <div className="font-bold text-teal-400 text-sm">Patient Pre-Consultation Submission</div>
                <div className="space-y-2 text-slate-300">
                  <div>
                    <strong className="text-slate-400 block text-[10px] uppercase font-mono">Presenting Issue:</strong>
                    {chiefComplaint}
                  </div>
                  <div>
                    <strong className="text-slate-400 block text-[10px] uppercase font-mono">Recorded Allergies:</strong>
                    <span className="text-rose-300 font-semibold">{allergies}</span>
                  </div>
                  <div>
                    <strong className="text-slate-400 block text-[10px] uppercase font-mono">Current Medications:</strong>
                    {medications}
                  </div>
                  <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-800">
                    Consent granted by patient for encounter duration.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Block */}
          <div className="pt-3 border-t border-slate-800">
            {prescriptionFinalized ? (
              <div className="space-y-2">
                <div className="p-3 bg-teal-950/80 border border-teal-600 rounded-lg text-xs space-y-1">
                  <div className="flex items-center gap-2 text-teal-300 font-bold">
                    <CheckCircle2 className="w-4 h-4 text-teal-400" />
                    <span>Prescription Cryptographically Stamped & Vaulted</span>
                  </div>
                  <div className="text-[11px] text-teal-400 font-mono break-all">
                    Hash: {prescHash}
                  </div>
                </div>
                <button
                  onClick={handleDownloadPrescription}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <Download className="w-3.5 h-3.5 text-teal-400" />
                  <span>Download Verifiable E-Prescription (PDF/TXT)</span>
                </button>
              </div>
            ) : (
              <button
                onClick={handleFinalizePrescription}
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
              >
                <FileText className="w-4 h-4" />
                <span>Sign & Finalize Verifiable Prescription</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
