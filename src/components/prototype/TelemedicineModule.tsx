import React, { useState } from 'react';
import { Search, Calendar, Video, Clock, CheckCircle, AlertCircle, FileText, Download } from 'lucide-react';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  qualification: string;
  regNumber: string;
  fee: number;
  availableSlot: string;
  rating: number;
  reviewsCount: number;
}

const DOCTORS: Doctor[] = [
  {
    id: 'doc_priya',
    name: 'Dr. Priya Nair, MD',
    specialty: 'Internal Medicine & Cardiology',
    qualification: 'MD (Internal Medicine), MBBS',
    regNumber: 'MCI-2012-88492',
    fee: 45,
    availableSlot: 'Today at 4:30 PM',
    rating: 4.9,
    reviewsCount: 142
  },
  {
    id: 'doc_rajesh',
    name: 'Dr. Rajesh Iyer, MD',
    specialty: 'Pulmonology & Respiratory Care',
    qualification: 'MD (Pulmonary Medicine), FCCP',
    regNumber: 'KMC-2009-33104',
    fee: 50,
    availableSlot: 'Tomorrow at 10:00 AM',
    rating: 4.8,
    reviewsCount: 98
  },
  {
    id: 'doc_anita',
    name: 'Dr. Anita Roy, MBBS, DNB',
    specialty: 'Family Medicine & Pediatrics',
    qualification: 'DNB (Family Medicine), MBBS',
    regNumber: 'WBMC-2015-11209',
    fee: 35,
    availableSlot: 'Today at 6:00 PM',
    rating: 4.9,
    reviewsCount: 176
  }
];

export const TelemedicineModule: React.FC = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('ALL');
  const [activeBookingDoctor, setActiveBookingDoctor] = useState<Doctor | null>(null);
  const [inCall, setInCall] = useState<boolean>(false);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState<boolean>(false);

  // Intake Form State
  const [chiefComplaint, setChiefComplaint] = useState<string>('Persistent dry cough and mild fever for 4 days');
  const [allergies, setAllergies] = useState<string>('Penicillin (mild hives)');
  const [medications, setMedications] = useState<string>('Amlodipine 5mg OD');

  // Doctor Charting State
  const [soapNotes, setSoapNotes] = useState({
    subjective: '38yo male presenting with 4-day non-productive cough, mild pleuritic chest discomfort. No hemoptysis.',
    objective: 'Appears comfortable. Reported SpO2 98%, HR 78 bpm. Throat mildly erythematous.',
    assessment: 'Acute viral upper respiratory tract infection with post-viral airway hyperresponsiveness.',
    plan: '1. Supportive hydration and steam inhalation. 2. Paracetamol 650mg PRN. 3. Review in 5 days if fever persists.'
  });
  const [prescriptionSigned, setPrescriptionSigned] = useState<boolean>(false);

  const filteredDoctors = DOCTORS.filter(
    (d) => selectedSpecialty === 'ALL' || d.specialty.includes(selectedSpecialty)
  );

  const handleConfirmBooking = () => {
    setAppointmentConfirmed(true);
    setTimeout(() => {
      setActiveBookingDoctor(null);
    }, 1200);
  };

  return (
    <div className="space-y-6">
      {/* Module Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="font-semibold text-teal-700 font-mono">MODULE A</span>
            <span>·</span>
            <span>Telemedicine & Consultation Workspace</span>
            <span>·</span>
            <span>WebRTC P2P</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            Doctor Discovery, Pre-Intake & Encrypted Consultation Room
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Test the complete workflow: Search verified doctors, complete clinical intake, start encrypted consultation, and generate tamper-proof e-prescriptions.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setInCall(!inCall)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors shadow-xs ${
              inCall
                ? 'bg-rose-600 hover:bg-rose-700 text-white'
                : 'bg-teal-600 hover:bg-teal-700 text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>{inCall ? 'End Active Call' : 'Launch Active Encounter Room'}</span>
          </button>
        </div>
      </div>

      {/* ACTIVE CALL WORKSPACE IF IN CALL */}
      {inCall ? (
        <div className="bg-slate-900 rounded-xl border border-slate-800 p-6 text-white shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <div className="text-sm font-bold flex items-center gap-2">
                  <span>Encounter Room: Dr. Priya Nair, MD</span>
                  <span className="text-slate-400 font-normal">with</span>
                  <span className="text-teal-400">Patient Aarav Sharma</span>
                </div>
                <div className="text-xs text-slate-400 font-mono">
                  Room Token: wrtc_enc_98f12a · 256-bit SRTP Stream Active · 14:22 elapsed
                </div>
              </div>
            </div>

            <button
              onClick={() => setInCall(false)}
              className="px-3 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 rounded-md transition-colors"
            >
              Conclude Consultation
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 60%: Simulated Video Feeds */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-video bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
                <div className="text-center p-6">
                  <div className="w-16 h-16 rounded-full bg-slate-800 text-teal-400 flex items-center justify-center font-bold text-xl mx-auto mb-3">
                    PN
                  </div>
                  <div className="text-sm font-semibold">Dr. Priya Nair, MD</div>
                  <div className="text-xs text-slate-400 font-mono">Audio / HD Video Stream Connected</div>
                </div>

                {/* Patient PiP */}
                <div className="absolute bottom-4 right-4 w-36 aspect-video bg-slate-800 border border-slate-700 rounded-md flex items-center justify-center text-[11px] text-slate-300">
                  <span>Aarav (You)</span>
                </div>
              </div>

              {/* Patient Intake Quick View */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-lg p-3.5 text-xs space-y-1.5">
                <div className="font-semibold text-teal-300 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" />
                  Pre-Consultation Intake Summary
                </div>
                <div><strong className="text-slate-300">Chief Complaint:</strong> {chiefComplaint}</div>
                <div><strong className="text-slate-300">Known Allergies:</strong> <span className="text-rose-300 font-medium">{allergies}</span></div>
                <div><strong className="text-slate-300">Current Medications:</strong> {medications}</div>
              </div>
            </div>

            {/* Right 40%: Doctor SOAP Charting & E-Prescription */}
            <div className="lg:col-span-5 bg-slate-800/60 border border-slate-700 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                <span className="text-xs font-bold uppercase text-slate-300">Clinician Charting (SOAP)</span>
                <span className="text-[10px] text-slate-400 font-mono">NMC Guideline Compliant</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="text-[11px] text-slate-400 font-mono">Subjective</label>
                  <textarea
                    rows={2}
                    value={soapNotes.subjective}
                    onChange={(e) => setSoapNotes({ ...soapNotes, subjective: e.target.value })}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-hidden focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-mono">Assessment</label>
                  <input
                    type="text"
                    value={soapNotes.assessment}
                    onChange={(e) => setSoapNotes({ ...soapNotes, assessment: e.target.value })}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-hidden focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-slate-400 font-mono">Plan & Rx Schedule</label>
                  <textarea
                    rows={2}
                    value={soapNotes.plan}
                    onChange={(e) => setSoapNotes({ ...soapNotes, plan: e.target.value })}
                    className="w-full mt-1 bg-slate-900 border border-slate-700 rounded p-2 text-slate-200 focus:outline-hidden focus:border-teal-500"
                  />
                </div>
              </div>

              {/* Finalize Prescription Button */}
              <div className="pt-2 border-t border-slate-700">
                {prescriptionSigned ? (
                  <div className="bg-teal-900/60 border border-teal-600 p-2.5 rounded text-xs text-teal-200 space-y-1">
                    <div className="font-bold flex items-center gap-1.5">
                      <CheckCircle className="w-4 h-4 text-teal-400" />
                      E-Prescription Signed & Dispatched
                    </div>
                    <div className="text-[11px] text-teal-300 font-mono">
                      SHA-256 Hash: e3b0c44298fc1c149afbf4c8996fb92427...
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setPrescriptionSigned(true)}
                    className="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white rounded text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Sign & Finalize Verifiable E-Prescription
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* DOCTOR DIRECTORY & DISCOVERY VIEW */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Verified Healthcare Providers Directory
            </h3>
            <p className="text-xs text-slate-500">
              All listed physicians hold verified state medical council credentials and display upfront consultation fees.
            </p>
          </div>

          {/* Specialty Filter Buttons */}
          <div className="flex items-center gap-1 overflow-x-auto">
            {['ALL', 'Cardiology', 'Pulmonology', 'Pediatrics'].map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
                  selectedSpecialty === spec
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredDoctors.map((doc) => (
            <div
              key={doc.id}
              className="border border-slate-200 rounded-xl p-5 hover:border-teal-300 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{doc.name}</h4>
                    <p className="text-xs text-teal-700 font-medium">{doc.specialty}</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                    ${doc.fee}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Qualifications:</span>
                    <span className="font-medium text-slate-700">{doc.qualification}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Council Reg:</span>
                    <span className="font-mono text-slate-700">{doc.regNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Next Opening:</span>
                    <span className="text-teal-700 font-semibold">{doc.availableSlot}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setActiveBookingDoctor(doc)}
                className="mt-5 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Book Consultation</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* BOOKING MODAL WITH INTAKE QUESTIONNAIRE */}
      {activeBookingDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Book with {activeBookingDoctor.name}
                </h4>
                <p className="text-xs text-slate-500">
                  Slot: {activeBookingDoctor.availableSlot} · Fee: ${activeBookingDoctor.fee}
                </p>
              </div>
              <button
                onClick={() => setActiveBookingDoctor(null)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            {appointmentConfirmed ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle className="w-12 h-12 text-teal-600 mx-auto" />
                <h5 className="font-bold text-slate-900 text-sm">Consultation Reserved!</h5>
                <p className="text-xs text-slate-600">
                  Slot locked with atomic transaction. SMS confirmation sent to your registered phone.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    1. What is your chief symptom or health concern?
                  </label>
                  <textarea
                    rows={2}
                    value={chiefComplaint}
                    onChange={(e) => setChiefComplaint(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    2. Known Drug Allergies (CRITICAL)
                  </label>
                  <input
                    type="text"
                    value={allergies}
                    onChange={(e) => setAllergies(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    3. Current Medications & Dosages
                  </label>
                  <input
                    type="text"
                    value={medications}
                    onChange={(e) => setMedications(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setActiveBookingDoctor(null)}
                    className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold"
                  >
                    Confirm & Hold Slot (Atomic)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
