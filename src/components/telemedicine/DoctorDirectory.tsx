import React, { useState } from 'react';
import { Search, Calendar, Video, Clock, CheckCircle, ShieldCheck, Stethoscope, Star } from 'lucide-react';
import { ConsultationRoom } from './ConsultationRoom';

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
  languages: string[];
}

const DOCTORS: Doctor[] = [
  {
    id: 'doc_priya',
    name: 'Dr. Priya Nair, MD',
    specialty: 'Internal Medicine & Cardiology',
    qualification: 'MD (Internal Medicine), MBBS (AIIMS)',
    regNumber: 'MCI-2012-88492',
    fee: 45,
    availableSlot: 'Today at 4:30 PM',
    rating: 4.9,
    reviewsCount: 142,
    languages: ['English', 'Hindi', 'Malayalam']
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
    reviewsCount: 98,
    languages: ['English', 'Tamil', 'Hindi']
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
    reviewsCount: 176,
    languages: ['English', 'Bengali', 'Hindi']
  },
  {
    id: 'doc_siddharth',
    name: 'Dr. Siddharth Verma, MD, DM',
    specialty: 'Neurology',
    qualification: 'DM (Neurology), MD (Medicine)',
    regNumber: 'DMC-2011-54210',
    fee: 65,
    availableSlot: 'Wednesday at 11:30 AM',
    rating: 4.9,
    reviewsCount: 84,
    languages: ['English', 'Hindi']
  }
];

export const DoctorDirectory: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('ALL');
  const [maxFee, setMaxFee] = useState<number>(70);
  const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);

  // Active call state
  const [activeEncounter, setActiveEncounter] = useState<{
    doctor: Doctor;
    patientName: string;
    chiefComplaint: string;
    allergies: string;
    medications: string;
  } | null>(null);

  // Intake Form
  const [intakeComplaint, setIntakeComplaint] = useState('Persistent non-productive cough and mild chest tightness for 4 days');
  const [intakeAllergies, setIntakeAllergies] = useState('Penicillin (mild cutaneous hives)');
  const [intakeMeds, setIntakeMeds] = useState('Amlodipine 5mg once daily');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const filteredDoctors = DOCTORS.filter((d) => {
    const matchesSpec = selectedSpecialty === 'ALL' || d.specialty.toLowerCase().includes(selectedSpecialty.toLowerCase());
    const matchesFee = d.fee <= maxFee;
    const matchesSearch =
      searchQuery.trim() === '' ||
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.languages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSpec && matchesFee && matchesSearch;
  });

  const handleConfirmBooking = () => {
    if (!bookingDoctor) return;
    setBookingSuccess(true);
    setTimeout(() => {
      // Launch active consultation directly
      setActiveEncounter({
        doctor: bookingDoctor,
        patientName: 'Aarav Sharma',
        chiefComplaint: intakeComplaint,
        allergies: intakeAllergies,
        medications: intakeMeds
      });
      setBookingDoctor(null);
      setBookingSuccess(false);
    }, 1000);
  };

  // If in active consultation encounter room
  if (activeEncounter) {
    return (
      <ConsultationRoom
        doctorName={activeEncounter.doctor.name}
        specialty={activeEncounter.doctor.specialty}
        patientName={activeEncounter.patientName}
        chiefComplaint={activeEncounter.chiefComplaint}
        allergies={activeEncounter.allergies}
        medications={activeEncounter.medications}
        onConclude={() => setActiveEncounter(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="font-semibold text-teal-700 font-mono">TELEMEDICINE</span>
            <span>·</span>
            <span>Verified Physician Directory</span>
            <span>·</span>
            <span>Encrypted WebRTC</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            Book Verified Specialists & Start Consultation
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Transparent consultation fees, council-verified credentials, and structured pre-consultation symptom intake.
          </p>
        </div>

        {/* Quick launch demo room button */}
        <button
          onClick={() =>
            setActiveEncounter({
              doctor: DOCTORS[0],
              patientName: 'Aarav Sharma',
              chiefComplaint: 'Post-viral dry cough and palpitations',
              allergies: 'Penicillin',
              medications: 'Amlodipine 5mg'
            })
          }
          className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-semibold transition-colors shadow-xs shrink-0"
        >
          <Video className="w-4 h-4" />
          <span>Launch Active Encounter Room</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by doctor name, specialty, language..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-teal-500"
            />
          </div>

          {/* Specialty Segmented Buttons */}
          <div className="md:col-span-4 flex items-center gap-1 overflow-x-auto py-1">
            {['ALL', 'Cardiology', 'Pulmonology', 'Pediatrics', 'Neurology'].map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`px-2.5 py-1 text-xs rounded-md whitespace-nowrap transition-colors shrink-0 ${
                  selectedSpecialty === spec
                    ? 'bg-slate-900 text-white font-medium'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>

          {/* Max Fee Slider */}
          <div className="md:col-span-3 flex items-center gap-2 text-xs text-slate-600">
            <span className="whitespace-nowrap font-medium text-slate-700">Max Fee: ${maxFee}</span>
            <input
              type="range"
              min={30}
              max={100}
              step={5}
              value={maxFee}
              onChange={(e) => setMaxFee(Number(e.target.value))}
              className="w-full accent-teal-600"
            />
          </div>
        </div>
      </div>

      {/* Doctor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-slate-200 rounded-xl p-5 hover:border-teal-300 transition-colors flex flex-col justify-between shadow-xs"
          >
            <div>
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-11 h-11 rounded-lg bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center font-bold text-sm shrink-0">
                    {doc.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{doc.name}</h3>
                    <p className="text-xs text-teal-700 font-medium">{doc.specialty}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                      <span>{doc.qualification}</span>
                      <span aria-hidden="true">·</span>
                      <span className="flex items-center gap-0.5 text-amber-600 font-medium">
                        <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                        {doc.rating} ({doc.reviewsCount})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-sm font-bold font-mono text-slate-900 block">${doc.fee}</span>
                  <span className="text-[10px] text-slate-400">per consult</span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Medical Council Reg:</span>
                  <span className="font-mono text-slate-800 font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-teal-600" />
                    {doc.regNumber}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Languages:</span>
                  <span className="text-slate-700">{doc.languages.join(', ')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Next Available Slot:</span>
                  <span className="text-teal-700 font-semibold">{doc.availableSlot}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setBookingDoctor(doc)}
              className="mt-5 w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment & Clinical Intake</span>
            </button>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {bookingDoctor && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  Book with {bookingDoctor.name}
                </h4>
                <p className="text-xs text-slate-500">
                  {bookingDoctor.specialty} · Slot: {bookingDoctor.availableSlot} · Fee: ${bookingDoctor.fee}
                </p>
              </div>
              <button
                onClick={() => setBookingDoctor(null)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle className="w-12 h-12 text-teal-600 mx-auto" />
                <h5 className="font-bold text-slate-900 text-sm">Consultation Reserved!</h5>
                <p className="text-xs text-slate-600">
                  Launching encrypted WebRTC encounter workspace...
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    1. Chief Complaint & Symptoms
                  </label>
                  <textarea
                    rows={2}
                    value={intakeComplaint}
                    onChange={(e) => setIntakeComplaint(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-slate-800 focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    2. Known Drug Allergies (CRITICAL)
                  </label>
                  <input
                    type="text"
                    value={intakeAllergies}
                    onChange={(e) => setIntakeAllergies(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-800 block mb-1">
                    3. Current Medications & Dosages
                  </label>
                  <input
                    type="text"
                    value={intakeMeds}
                    onChange={(e) => setIntakeMeds(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2 text-slate-800 focus:ring-1 focus:ring-teal-500"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setBookingDoctor(null)}
                    className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-semibold"
                  >
                    Confirm & Enter Room (Atomic Hold)
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
