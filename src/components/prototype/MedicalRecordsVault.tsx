import React, { useState } from 'react';
import { Shield, Upload, FileText, Lock, Clock, Eye, Ban, CheckCircle, AlertCircle, UserCheck } from 'lucide-react';

interface DocumentRecord {
  id: string;
  title: string;
  category: 'Lab Report' | 'Imaging' | 'Prescription' | 'Discharge';
  date: string;
  size: string;
  scannedClean: boolean;
  encryption: string;
}

interface ConsentGrant {
  id: string;
  doctorName: string;
  specialty: string;
  purpose: string;
  grantedAt: string;
  expiresIn: string;
  status: 'ACTIVE' | 'REVOKED' | 'EXPIRED';
  scope: string;
}

interface AuditEvent {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  resource: string;
  ipHash: string;
}

export const MedicalRecordsVault: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentRecord[]>([
    {
      id: 'doc_101',
      title: 'Comprehensive Lipid Profile & Liver Panel',
      category: 'Lab Report',
      date: 'Oct 24, 2026',
      size: '2.4 MB',
      scannedClean: true,
      encryption: 'AES-256 Envelope'
    },
    {
      id: 'doc_102',
      title: '12-Lead Baseline Resting Electrocardiogram',
      category: 'Imaging',
      date: 'Sep 12, 2026',
      size: '4.1 MB',
      scannedClean: true,
      encryption: 'AES-256 Envelope'
    },
    {
      id: 'doc_103',
      title: 'Discharge Summary - Acute Bronchitis',
      category: 'Discharge',
      date: 'May 04, 2026',
      size: '1.8 MB',
      scannedClean: true,
      encryption: 'AES-256 Envelope'
    }
  ]);

  const [consentGrants, setConsentGrants] = useState<ConsentGrant[]>([
    {
      id: 'csnt_88192a',
      doctorName: 'Dr. Priya Nair, MD',
      specialty: 'Internal Medicine',
      purpose: 'Teleconsultation Review & Follow-up',
      grantedAt: 'Oct 26, 2026 · 09:30 AM',
      expiresIn: '44 hours remaining',
      status: 'ACTIVE',
      scope: 'All Lab Reports & Imaging'
    }
  ]);

  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>([
    {
      id: 'aud_991',
      timestamp: 'Oct 26, 2026 09:35:12 AM',
      actor: 'Dr. Priya Nair, MD',
      action: 'VIEW_DOCUMENT',
      resource: 'Comprehensive Lipid Profile',
      ipHash: '8f4c2...b91a'
    },
    {
      id: 'aud_990',
      timestamp: 'Oct 26, 2026 09:30:00 AM',
      actor: 'Patient Aarav Sharma (Owner)',
      action: 'CREATE_CONSENT_GRANT',
      resource: 'Grant ID: csnt_88192a (48h)',
      ipHash: '1a2b3...4c5d'
    }
  ]);

  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [showConsentModal, setShowConsentModal] = useState<boolean>(false);
  const [newDoctorName, setNewDoctorName] = useState<string>('Dr. Rajesh Iyer, MD');
  const [newDuration, setNewDuration] = useState<string>('48 Hours');

  const handleRevokeConsent = (grantId: string) => {
    setConsentGrants((prev) =>
      prev.map((g) => (g.id === grantId ? { ...g, status: 'REVOKED', expiresIn: 'Revoked by Patient' } : g))
    );

    const newLog: AuditEvent = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      actor: 'Patient Aarav Sharma (Owner)',
      action: 'REVOKE_CONSENT',
      resource: `Grant ID: ${grantId}`,
      ipHash: '1a2b3...4c5d'
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handleCreateGrant = () => {
    const newGrant: ConsentGrant = {
      id: `csnt_${Date.now()}`,
      doctorName: newDoctorName,
      specialty: 'Pulmonology',
      purpose: 'Second Opinion & Review',
      grantedAt: 'Just now',
      expiresIn: newDuration,
      status: 'ACTIVE',
      scope: 'All Records'
    };
    setConsentGrants([newGrant, ...consentGrants]);
    setShowConsentModal(false);

    const newLog: AuditEvent = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toLocaleString(),
      actor: 'Patient Aarav Sharma (Owner)',
      action: 'CREATE_CONSENT_GRANT',
      resource: `Grant for ${newDoctorName} (${newDuration})`,
      ipHash: '1a2b3...4c5d'
    };
    setAuditLogs([newLog, ...auditLogs]);
  };

  const handleUploadSim = () => {
    setIsUploading(true);
    setTimeout(() => {
      const newDoc: DocumentRecord = {
        id: `doc_${Date.now()}`,
        title: 'Serum HbA1c & Fasting Plasma Glucose',
        category: 'Lab Report',
        date: 'Today',
        size: '1.2 MB',
        scannedClean: true,
        encryption: 'AES-256 Envelope'
      };
      setDocuments([newDoc, ...documents]);
      setIsUploading(false);

      const newLog: AuditEvent = {
        id: `aud_${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        actor: 'Patient Aarav Sharma (Owner)',
        action: 'UPLOAD_DOCUMENT',
        resource: 'HbA1c Report (Clean scan)',
        ipHash: '1a2b3...4c5d'
      };
      setAuditLogs([newLog, ...auditLogs]);
    }, 800);
  };

  return (
    <div className="space-y-6">
      {/* Module Overview Banner */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="font-semibold text-teal-700 font-mono">MODULE C</span>
            <span>·</span>
            <span>Sovereign Health Records Vault</span>
            <span>·</span>
            <span>Zero-Trust Consent</span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            Patient-Controlled Health Records & Consent Manager
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Test true data sovereignty: Grant time-bound doctor access tokens, revoke them instantly with one click, and inspect tamper-evident audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleUploadSim}
            disabled={isUploading}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>{isUploading ? 'Scanning & Encrypting...' : 'Upload New Report (Sim)'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: DOCTOR CONSENT GRANTS */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-600" />
              Active Doctor Access Grants (Time-Bound)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Only doctors with an active, unexpired grant can read your records. Access expires automatically.
            </p>
          </div>

          <button
            onClick={() => setShowConsentModal(true)}
            className="px-3.5 py-1.5 text-xs font-semibold bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
          >
            + Issue New Doctor Consent
          </button>
        </div>

        <div className="space-y-3">
          {consentGrants.map((grant) => (
            <div
              key={grant.id}
              className={`p-4 rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                grant.status === 'ACTIVE'
                  ? 'bg-teal-50/40 border-teal-200'
                  : 'bg-slate-50 border-slate-200 opacity-75'
              }`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{grant.doctorName}</span>
                  <span className="text-xs text-slate-500">({grant.specialty})</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      grant.status === 'ACTIVE'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {grant.status}
                  </span>
                </div>

                <div className="text-xs text-slate-600 mt-1 flex flex-wrap items-center gap-2">
                  <span>Purpose: {grant.purpose}</span>
                  <span aria-hidden="true">·</span>
                  <span>Scope: {grant.scope}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-teal-800 font-medium">
                    {grant.status === 'ACTIVE' ? grant.expiresIn : 'Access Cut Off'}
                  </span>
                </div>
              </div>

              {grant.status === 'ACTIVE' && (
                <button
                  onClick={() => handleRevokeConsent(grant.id)}
                  className="px-3 py-1.5 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>Revoke Access Now</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 2: HEALTH DOCUMENTS LIST */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="pb-4 border-b border-slate-100 mb-4">
          <h3 className="text-base font-bold text-slate-900">
            Encrypted Personal Health Documents
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            All records scanned with ClamAV malware prober and stored with AES-256 envelope encryption.
          </p>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Document Title</th>
                <th className="py-2.5 px-3 font-semibold">Category</th>
                <th className="py-2.5 px-3 font-semibold">Upload Date</th>
                <th className="py-2.5 px-3 font-semibold">Size</th>
                <th className="py-2.5 px-3 font-semibold">Integrity / Encryption</th>
                <th className="py-2.5 px-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/70">
                  <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-slate-400" />
                    <span>{doc.title}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-600">{doc.category}</td>
                  <td className="py-3 px-3 text-slate-500">{doc.date}</td>
                  <td className="py-3 px-3 font-mono text-slate-600">{doc.size}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 font-mono text-[11px] text-teal-700">
                      <CheckCircle className="w-3.5 h-3.5 text-teal-600" />
                      Clean · {doc.encryption}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <button className="text-teal-700 hover:text-teal-900 font-semibold text-xs flex items-center gap-1">
                      <Eye className="w-3.5 h-3.5" /> Preview (Signed URL)
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 3: IMMUTABLE AUDIT TRAIL */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs">
        <div className="pb-4 border-b border-slate-100 mb-4">
          <h3 className="text-base font-bold text-slate-900">
            Immutable Access & Consent Audit Log
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Append-only tamper-evident security ledger tracking all document previews, downloads, and revocations.
          </p>
        </div>

        <div className="space-y-2">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono"
            >
              <div className="flex items-center gap-3">
                <span className="text-slate-400 text-[11px]">{log.timestamp}</span>
                <span className="font-bold text-slate-800">{log.actor}</span>
                <span className="px-1.5 py-0.5 bg-slate-200 text-slate-700 rounded text-[10px]">
                  {log.action}
                </span>
                <span className="text-slate-600 font-sans">{log.resource}</span>
              </div>
              <span className="text-slate-400 text-[10px]">IP Hash: {log.ipHash}</span>
            </div>
          ))}
        </div>
      </div>

      {/* NEW CONSENT MODAL */}
      {showConsentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-slate-200 max-w-md w-full p-6 shadow-xl space-y-4">
            <h4 className="text-base font-bold text-slate-900">
              Grant Time-Bound Doctor Access
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Authorize a verified doctor to view selected health documents. You retain full ownership and can revoke access immediately at any moment.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Select Physician</label>
                <select
                  value={newDoctorName}
                  onChange={(e) => setNewDoctorName(e.target.value)}
                  className="w-full border border-slate-200 rounded p-2 text-slate-800"
                >
                  <option value="Dr. Priya Nair, MD">Dr. Priya Nair, MD (Cardiology)</option>
                  <option value="Dr. Rajesh Iyer, MD">Dr. Rajesh Iyer, MD (Pulmonology)</option>
                  <option value="Dr. Anita Roy, MBBS, DNB">Dr. Anita Roy, MBBS (Family Medicine)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Access Duration (Auto-Expires)
                </label>
                <select
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  className="w-full border border-slate-200 rounded p-2 text-slate-800"
                >
                  <option value="24 Hours">24 Hours</option>
                  <option value="48 Hours">48 Hours (Recommended for Consults)</option>
                  <option value="7 Days">7 Days</option>
                  <option value="30 Days">30 Days</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  onClick={() => setShowConsentModal(false)}
                  className="px-3.5 py-1.5 text-slate-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateGrant}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded font-semibold"
                >
                  Sign & Authorize Grant
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
