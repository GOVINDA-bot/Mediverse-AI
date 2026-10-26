/**
 * MediVerse — AI-Powered Integrated Digital Healthcare Platform
 * Comprehensive Product Requirements Document (PRD) Data Store
 */

export interface Requirement {
  id: string;
  module: 'AUTH' | 'TELE' | 'AI' | 'MR' | 'SIM' | 'SEC' | 'ADM';
  title: string;
  description: string;
  role: 'Patient' | 'Doctor' | 'Student' | 'Educator' | 'Admin' | 'System';
  priority: 'P0' | 'P1' | 'P2';
  preconditions: string;
  expectedBehavior: string;
  acceptanceCriteria: {
    given: string;
    when: string;
    then: string;
  };
  dependencies: string[];
  securityConsiderations: string;
}

export interface RiskItem {
  id: string;
  category: 'Clinical Safety' | 'AI/ML' | 'Security & Privacy' | 'Operational' | 'Regulatory';
  risk: string;
  likelihood: 'Low' | 'Medium' | 'High';
  impact: 'Medium' | 'High' | 'Critical';
  mitigation: string;
  owner: string;
}

export interface UserPersona {
  role: string;
  name: string;
  tagline: string;
  demographics: string;
  goals: string[];
  painPoints: string[];
  technicalProficiency: string;
  keyPermissions: string[];
}

export interface PrdSection {
  id: string;
  number: number;
  title: string;
  summary: string;
  content: string; // Markdown or detailed structured content
  subsections?: { id: string; title: string; content: string }[];
}

export const USER_PERSONAS: UserPersona[] = [
  {
    role: 'Patient',
    name: 'Aarav Sharma (38, Tech Professional & Father)',
    tagline: 'Wants convenient, trustworthy healthcare for family without losing control of medical data.',
    demographics: 'Tier-1/2 urban commuter, managing hypertension and elderly parents’ care.',
    goals: [
      'Book verified specialists quickly without long clinic queues.',
      'Understand lab test results in accessible non-jargon language before consultations.',
      'Control which doctor sees past medical histories and revoke access when finished.',
      'Receive structured follow-up instructions and verifiable e-prescriptions.'
    ],
    painPoints: [
      'Fragmented physical prescriptions and paper lab reports lost across different clinics.',
      'Anxiety caused by unvetted medical web searches offering catastrophic self-diagnoses.',
      'Lack of clear post-consultation care plans and medication reminders.'
    ],
    technicalProficiency: 'High on mobile devices, expects seamless WhatsApp/SMS/Email notifications.',
    keyPermissions: [
      'Manage own health profile & emergency contacts',
      'Search doctors, book, reschedule, or cancel consultations',
      'Upload & tag personal medical documents (PDF/JPEG)',
      'Issue and revoke time-bound consent grants to doctors',
      'Engage with AI Health Assistant with exportable chat histories'
    ]
  },
  {
    role: 'Doctor / Healthcare Professional',
    name: 'Dr. Priya Nair, MD (Internal Medicine, 12 yrs exp)',
    tagline: 'Dedicated clinician demanding efficient tele-consult tools without administrative bloat.',
    demographics: 'Consultant physician dividing time between hospital rounds and private tele-practice.',
    goals: [
      'Review patient-authorized medical history and pre-consultation symptom summaries before calls.',
      'Conduct low-latency, encrypted video/audio consultations with intuitive digital charting.',
      'Generate legally compliant e-prescriptions and follow-up referrals in under 2 minutes.',
      'Maintain clear demarcation between active consultation hours and off-duty time.'
    ],
    painPoints: [
      'No-shows, uncoordinated scheduling conflicts, and scattered patient WhatsApp messages.',
      'Blind consultations where patients cannot remember prior drug names or allergy reactions.',
      'Clunky EHR software that requires excessive typing during consultations.'
    ],
    technicalProficiency: 'Moderate; prefers streamlined clinical desktop/tablet interfaces with quick templates.',
    keyPermissions: [
      'Configure practice profile, verified registration credentials, fees, and slot availability',
      'Access patient medical records ONLY when active consent grant exists',
      'Document SOAP clinical encounter notes and issue e-prescriptions',
      'Order diagnostic tests and generate follow-up care plans'
    ]
  },
  {
    role: 'Medical Student',
    name: 'Rohan Verma (22, 3rd Year MBBS Student)',
    tagline: 'Needs safe, realistic clinical reasoning practice to build diagnostic confidence.',
    demographics: 'Undergraduate medical student preparing for clinical rotations and board exams.',
    goals: [
      'Work through diverse clinical case simulations with realistic vitals and lab findings.',
      'Practice clinical hypotheses, diagnostic ordering, and therapeutic decision trees.',
      'Receive immediate, educational feedback explaining clinical reasoning behind outcomes.',
      'Track individual competency growth across cardiovascular, respiratory, and endocrine modules.'
    ],
    painPoints: [
      'Limited bedside exposure to rare acute cases during early hospital rotations.',
      'Fear of making errors on real patients; lack of a zero-consequence clinical playground.',
      'Static textbook cases lack dynamic temporal changes (e.g., patient condition worsening).'
    ],
    technicalProficiency: 'Very high; digital native comfortable with interactive browser simulations.',
    keyPermissions: [
      'Browse and launch published virtual simulation cases by specialty and difficulty',
      'Order simulated investigations and select therapeutic interventions',
      'View granular attempt scoring rubrics, diagnostic accuracy metrics, and debrief notes',
      'Reset and retry clinical cases to examine alternative branching pathways'
    ]
  },
  {
    role: 'Medical Educator',
    name: 'Prof. Sunita Deshmukh, MD, FAIMS (Head of Clinical Education)',
    tagline: 'Educator seeking measurable clinical competency metrics and curriculum-aligned cases.',
    demographics: 'Senior medical professor responsible for 150 clinical students and residency training.',
    goals: [
      'Author or review simulated patient scenarios with customized branching logic and vitals.',
      'Monitor cohort diagnostic acumen, differential accuracy, and cost-effective test selection.',
      'Identify curriculum gaps where students consistently order unnecessary or harmful interventions.'
    ],
    painPoints: [
      'Paper-based clinical viva examinations are labor-intensive and subjective to grade.',
      'No centralized digital tool to verify if students understand the "why" behind treatments.'
    ],
    technicalProficiency: 'Moderate; values intuitive scenario-builder forms and visual cohort analytics.',
    keyPermissions: [
      'Create, edit, version, and publish clinical simulation scenarios',
      'Define educational objectives, correct differential weights, and penalty scoring logic',
      'Access aggregate and student-level simulation performance analytics and audit logs'
    ]
  },
  {
    role: 'Platform Administrator',
    name: 'Sarah Chen (Platform Operations & Security Officer)',
    tagline: 'Ensures system reliability, strict data isolation, regulatory compliance, and auditability.',
    demographics: 'Senior systems engineer with healthcare data governance and infosec background.',
    goals: [
      'Enforce strict role-based access control and tenant isolation between patient PHI and educational data.',
      'Monitor platform health, API rate limits, audit access logs, and anomaly alerts.',
      'Verify medical doctor licenses against national registries before approving practice profiles.',
      'Manage incident response workflows and handle data subject access / deletion requests.'
    ],
    painPoints: [
      'Balancing rapid development with strict healthcare compliance standards (DPDP Act, HIPAA concepts).',
      'Detecting abnormal spike in medical record queries or potential credential compromise.'
    ],
    technicalProficiency: 'Expert; operates via secure admin consoles, audit trails, and policy monitors.',
    keyPermissions: [
      'Manage user accounts, credential status, and role assignments',
      'Verify doctor medical council registration certificates',
      'Inspect tamper-evident immutable security and access audit logs',
      'Configure AI safety guardrail thresholds and review flagged refusal incidents'
    ]
  }
];

export const REQUIREMENTS_CATALOGUE: Requirement[] = [
  // AUTH
  {
    id: 'AUTH-001',
    module: 'AUTH',
    title: 'Multi-Role User Registration & Authentication',
    description: 'Allow patients, doctors, students, educators, and admins to authenticate with verified email/phone OTP and role-specific credential attributes.',
    role: 'System',
    priority: 'P0',
    preconditions: 'User has valid email address and mobile phone number.',
    expectedBehavior: 'System sends time-bound 6-digit OTP, validates within 5 minutes, creates bcrypt-hashed session with secure HTTP-only SameSite JWT cookie.',
    acceptanceCriteria: {
      given: 'An unregistered user inputs valid contact details and selects a role',
      when: 'They submit the correct verification OTP',
      then: 'An active account is created with default least-privilege role permissions and redirected to role dashboard'
    },
    dependencies: ['Identity Provider / Auth Service', 'SMS/Email Gateway'],
    securityConsiderations: 'Max 5 attempts before 15-minute lockout; passwords hashed via Argon2id/bcrypt; no plain credentials logged.'
  },
  {
    id: 'AUTH-002',
    module: 'AUTH',
    title: 'Doctor Medical Council Credential Verification',
    description: 'Require doctor profiles to submit medical registration number and state medical council before consultation booking is activated.',
    role: 'Doctor',
    priority: 'P0',
    preconditions: 'Doctor account registered in PENDING_VERIFICATION state.',
    expectedBehavior: 'Doctor uploads medical registration certificate. Profile remains unlisted until verified by Administrator.',
    acceptanceCriteria: {
      given: 'A doctor uploads their medical council certificate and registration ID',
      when: 'An Admin audits and approves the credential in the Admin Console',
      then: 'Doctor status changes to ACTIVE and their public booking profile becomes discoverable'
    },
    dependencies: ['AUTH-001', 'Document Storage'],
    securityConsiderations: 'Doctor credentials stored in private encrypted bucket; watermarked on review.'
  },

  // TELEMEDICINE
  {
    id: 'TELE-001',
    module: 'TELE',
    title: 'Doctor Discovery & Filterable Directory',
    description: 'Patients can search and filter verified doctors by medical specialty, language, consultation fee, and next available slot.',
    role: 'Patient',
    priority: 'P0',
    preconditions: 'Active patient session; doctors have published availability slots.',
    expectedBehavior: 'Real-time query returns matching doctors with rating, qualifications, fee, and earliest open slot within 300ms.',
    acceptanceCriteria: {
      given: 'A patient filters by "Cardiology" and fee range <= $50',
      when: 'The search filter is applied',
      then: 'Only verified cardiologists with matching fees and active slots are displayed'
    },
    dependencies: ['Database Search Index'],
    securityConsiderations: 'Rate limiting on doctor directory queries to prevent mass scraping of provider information.'
  },
  {
    id: 'TELE-002',
    module: 'TELE',
    title: 'Consultation Booking & Conflict Prevention',
    description: 'Prevent double-booking with atomic transactional locking on doctor schedule slots.',
    role: 'Patient',
    priority: 'P0',
    preconditions: 'Selected slot is marked OPEN.',
    expectedBehavior: 'Slot is placed in 10-minute provisional hold during intake checkout; confirmed upon booking submission.',
    acceptanceCriteria: {
      given: 'Two patients simultaneously attempt to reserve the same 10:30 AM slot',
      when: 'Both requests hit the booking endpoint',
      then: 'First request acquires pessimistic lock and succeeds; second receives 409 Conflict with alternative slots'
    },
    dependencies: ['PostgreSQL Transaction Isolation / Redis Lock'],
    securityConsiderations: 'Booking payload includes CSRF token and patient authorization check.'
  },
  {
    id: 'TELE-003',
    module: 'TELE',
    title: 'Pre-Consultation Intake & Symptom Summary',
    description: 'Collect chief complaint, duration, current medications, and known allergies before consultation commences.',
    role: 'Patient',
    priority: 'P0',
    preconditions: 'Confirmed appointment booking.',
    expectedBehavior: 'Patient completes 4-step structured intake; summary is formatted into clinician SOAP pre-read card.',
    acceptanceCriteria: {
      given: 'A patient with an upcoming consultation',
      when: 'They complete the intake questionnaire',
      then: 'The doctor can view the consolidated symptom summary in their clinical workspace prior to call'
    },
    dependencies: ['TELE-002'],
    securityConsiderations: 'Intake data encrypted with AES-256 at rest; accessible only to patient and booked clinician.'
  },
  {
    id: 'TELE-004',
    module: 'TELE',
    title: 'Secure Real-Time Consultation Workspace (Video/Audio)',
    description: 'WebRTC-based peer-to-peer audio/video consultation with screen share and synchronized clinical note-taking.',
    role: 'Doctor',
    priority: 'P0',
    preconditions: 'Both doctor and patient joined meeting within scheduled appointment window.',
    expectedBehavior: 'Direct encrypted media stream established with doctor split-screen showing video call and clinical charting panel.',
    acceptanceCriteria: {
      given: 'An active appointment time window',
      when: 'Doctor and patient click "Join Consultation"',
      then: 'End-to-end encrypted WebRTC room is launched; doctor can record SOAP notes concurrently'
    },
    dependencies: ['WebRTC / Video API'],
    securityConsiderations: 'Zero cloud recording of consultation video by default; strict room token expiration after 60 minutes.'
  },
  {
    id: 'TELE-005',
    module: 'TELE',
    title: 'E-Prescription & Follow-up Plan Generation',
    description: 'Enable doctors to generate structured digital prescriptions with drug name, dosage, frequency, duration, and doctor digital signature.',
    role: 'Doctor',
    priority: 'P0',
    preconditions: 'Active or recently concluded consultation encounter.',
    expectedBehavior: 'Doctor selects medications, adds diagnosis ICD-10 or plain term, and signs prescription. PDF generated and dispatched to patient record vault.',
    acceptanceCriteria: {
      given: 'A doctor completing an encounter',
      when: 'They sign and finalize the prescription',
      then: 'An immutable, cryptographically verifiable prescription is saved to the patient health record and SMS/email sent'
    },
    dependencies: ['MR-001', 'PDF Generation Service'],
    securityConsiderations: 'Tamper-proof SHA-256 hash stamp on PDF; doctor license number permanently burned onto document.'
  },

  // AI HEALTH INFORMATION ASSISTANT
  {
    id: 'AI-001',
    module: 'AI',
    title: 'Natural-Language Health Explanation with Source Grounding (RAG)',
    description: 'Provide plain-language educational explanations for symptoms, lab terminology, and wellness queries citing curated medical sources (WHO, ICMR, PubMed).',
    role: 'Patient',
    priority: 'P0',
    preconditions: 'User accepted AI Health Information Terms of Use & Disclaimers.',
    expectedBehavior: 'AI answers queries in 6th-grade reading level, cites source title and publication year, and includes mandatory educational disclaimer.',
    acceptanceCriteria: {
      given: 'A patient asks "What does an elevated C-reactive protein (CRP) level indicate?"',
      when: 'The query is processed through the grounded medical RAG pipeline',
      then: 'System explains inflammation markers in accessible language, cites vetted sources, and clarifies it is not a diagnostic confirmation'
    },
    dependencies: ['Curated Knowledge Base Vector Store', 'LLM Service'],
    securityConsiderations: 'No PHI injected into prompt; queries anonymized before vector retrieval; zero personal record leakage.'
  },
  {
    id: 'AI-002',
    module: 'AI',
    title: 'Emergency Symptom Detection & Triage Escalation Protocol',
    description: 'Detect acute high-risk symptoms (crushing chest pain, stroke FAST signs, anaphylaxis, suicidal ideation) and trigger immediate emergency UI override.',
    role: 'Patient',
    priority: 'P0',
    preconditions: 'User sends prompt containing red-flag medical emergency keywords or clinical semantic embeddings.',
    expectedBehavior: 'System halts normal explanatory chat, displays high-contrast emergency alert banner, provides national emergency numbers (112 / 911), and advises immediate hospital ER visit.',
    acceptanceCriteria: {
      given: 'A user types "Severe chest pain radiating to left arm and jaw for 20 mins, sweating heavily"',
      when: 'The safety triage classifier evaluates the input',
      then: 'An emergency banner is displayed immediately (<200ms) with direct tap-to-call emergency services; no chat delay'
    },
    dependencies: ['Safety Triage Classifier', 'Emergency Directory'],
    securityConsiderations: 'Emergency classifier executes ahead of general LLM generation to prevent hazardous latency.'
  },
  {
    id: 'AI-003',
    module: 'AI',
    title: 'Prescription & Self-Medication Refusal Guardrails',
    description: 'Refuse requests for definitive self-diagnosis, prescription drug dosages, or unverified home cures for serious pathologies.',
    role: 'Patient',
    priority: 'P0',
    preconditions: 'User asks the AI to prescribe antibiotics, adjust insulin dosages, or confirm if they have cancer.',
    expectedBehavior: 'System generates compassionate refusal, explains the necessity of hands-on clinical evaluation, and offers a direct link to book a doctor consultation.',
    acceptanceCriteria: {
      given: 'A user asks "How many mg of Amoxicillin should I give my 4-year-old for ear pain?"',
      when: 'The prompt is evaluated by clinical safety guardrails',
      then: 'System refuses to recommend dosage, highlights pediatric safety risks, and directs to consultation booking'
    },
    dependencies: ['AI Guardrail Evaluator'],
    securityConsiderations: 'Multi-layer defense: system prompt constraints + pre-generation filter + regex/semantic post-generation safety scanner.'
  },
  {
    id: 'AI-004',
    module: 'AI',
    title: 'User-Controlled AI Conversation Retention & Deletion',
    description: 'Allow users to view previous AI queries, export chat summaries, or trigger permanent cryptographic deletion.',
    role: 'Patient',
    priority: 'P1',
    preconditions: 'Patient has saved AI conversation history.',
    expectedBehavior: 'Patient clicks "Delete Conversation"; system soft-deletes instantly and purges from database within 24 hours.',
    acceptanceCriteria: {
      given: 'A user requests conversation deletion',
      when: 'They confirm the deletion modal',
      then: 'Chat history is unlinked from account and marked for permanent purge in accordance with data minimization principles'
    },
    dependencies: ['AI Conversation Storage'],
    securityConsiderations: 'Purge ensures no latent health query data lingers in backup shards beyond retention SLA.'
  },

  // DIGITAL MEDICAL RECORDS
  {
    id: 'MR-001',
    module: 'MR',
    title: 'Patient-Centric Health Records Vault & Document Uploader',
    description: 'Upload, categorize (Lab, Imaging, Prescription, Discharge), and view medical reports with secure client-side encryption and preview.',
    role: 'Patient',
    priority: 'P0',
    preconditions: 'Patient authenticated; file format is PDF, PNG, or JPEG <= 15MB.',
    expectedBehavior: 'File scanned for malware, encrypted with envelope encryption, stored in private object bucket, and cataloged with metadata.',
    acceptanceCriteria: {
      given: 'A patient uploads a 3MB Lipid Profile PDF report',
      when: 'Upload completes and malware check passes',
      then: 'Report appears in records list with date, category, and secure temporary view URL'
    },
    dependencies: ['Object Storage', 'Antivirus Scanner Service'],
    securityConsiderations: 'Direct pre-signed URLs with 5-minute expiration; virus scanning before persisting.'
  },
  {
    id: 'MR-002',
    module: 'MR',
    title: 'Granular Time-Bound Doctor Consent Management',
    description: 'Enable patients to grant temporary view permissions to specific doctors with explicit expiration (24h, 7d, 30d) and instant revocation.',
    role: 'Patient',
    priority: 'P0',
    preconditions: 'Doctor account exists; patient has records in vault.',
    expectedBehavior: 'Patient selects doctor and validity period; access token generated; doctor sees records; patient can click "Revoke Access" anytime.',
    acceptanceCriteria: {
      given: 'A patient grants 48-hour access to Dr. Priya Nair',
      when: 'The patient clicks "Revoke Now" after 2 hours',
      then: 'Dr. Priya immediately loses access; subsequent fetch returns 403 Forbidden'
    },
    dependencies: ['Consent Authorization Middleware'],
    securityConsiderations: 'Consent grants recorded in immutable append-only ledger; doctor view queries checked in middleware.'
  },
  {
    id: 'MR-003',
    module: 'MR',
    title: 'Immutable Medical Record Access Audit Trail',
    description: 'Record tamper-evident audit logs every time a medical record is viewed, downloaded, or shared.',
    role: 'Admin',
    priority: 'P0',
    preconditions: 'Any record access event occurs.',
    expectedBehavior: 'Audit record created with timestamp, actor_id, record_id, action (VIEW/DOWNLOAD), IP hash, and consent_id.',
    acceptanceCriteria: {
      given: 'A doctor accesses a patient laboratory report',
      when: 'The file is rendered in the viewer',
      then: 'An immutable audit event is appended to the audit table and visible to the patient in their Access Log'
    },
    dependencies: ['Audit Logging Engine'],
    securityConsiderations: 'Audit logs cannot be updated or deleted by regular users or doctors (append-only table).'
  },

  // VIRTUAL MEDICAL TRAINING & SIMULATION
  {
    id: 'SIM-001',
    module: 'SIM',
    title: 'Interactive Clinical Case Simulation Engine',
    description: 'Present realistic clinical scenarios with patient history, fluctuating vitals, physical exam findings, and branching decision points.',
    role: 'Student',
    priority: 'P0',
    preconditions: 'Student enrolled in Virtual Clinical Simulation module.',
    expectedBehavior: 'Student reviews presenting case, observes vitals monitor, reviews chief complaint, and progresses through sequential clinical stages.',
    acceptanceCriteria: {
      given: 'A student starts "Case 101: 54yo Acute Retrosternal Chest Pain"',
      when: 'The case launches in the simulation viewer',
      then: 'Patient history, real-time vitals, and initial clinical assessment options are rendered'
    },
    dependencies: ['Simulation Scenario Engine'],
    securityConsiderations: 'Strict data boundary: simulation records are isolated in distinct database tables; 100% synthetic fictitious patients.'
  },
  {
    id: 'SIM-002',
    module: 'SIM',
    title: 'Differential Diagnosis & Diagnostic Investigation Ordering',
    description: 'Allow students to formulate prioritized differential diagnoses and order virtual tests (12-Lead ECG, Cardiac Enzymes, Chest X-ray, ABG).',
    role: 'Student',
    priority: 'P0',
    preconditions: 'Case stage requires diagnostic formulation.',
    expectedBehavior: 'Student selects top 3 differentials and orders specific tests; system reveals simulated results (ECG traces, lab values) and consumes virtual budget/time.',
    acceptanceCriteria: {
      given: 'Student suspects ST-Elevation Myocardial Infarction (STEMI)',
      when: 'They order "12-Lead ECG" and "Troponin I"',
      then: 'System displays ST-elevation waveform in leads V1-V4 and elevated troponin result (2.4 ng/mL)'
    },
    dependencies: ['SIM-001'],
    securityConsiderations: 'Test results are pre-validated by Medical Educator to ensure physiological realism.'
  },
  {
    id: 'SIM-003',
    module: 'SIM',
    title: 'Branching Therapeutic Interventions & Physiological Response',
    description: 'Simulate treatment choices (e.g., Aspirin + Heparin + Cath Lab vs incorrect Beta-blocker in acute hypotension) and dynamically alter patient status.',
    role: 'Student',
    priority: 'P0',
    preconditions: 'Diagnostic results reviewed by student.',
    expectedBehavior: 'Correct emergency interventions stabilize vitals; contraindicated drugs induce simulated hypotension/arrest, testing crisis management.',
    acceptanceCriteria: {
      given: 'Patient exhibits cardiogenic shock signs (BP 80/50)',
      when: 'Student selects IV Nitroglycerin (contraindicated)',
      then: 'Vitals drop to BP 65/40, alarm triggers, and educational debrief identifies the physiological mechanism of failure'
    },
    dependencies: ['SIM-002'],
    securityConsiderations: 'Educational disclaimer displayed on all simulation screens: "For educational training only. Not real patient data."'
  },
  {
    id: 'SIM-004',
    module: 'SIM',
    title: 'Clinical Reasoning Debrief, Rubric Scoring & Repeat Attempts',
    description: 'Generate objective competency score based on diagnostic speed, investigation efficiency, and therapeutic appropriateness with educator explanations.',
    role: 'Student',
    priority: 'P0',
    preconditions: 'Simulation completed or time expired.',
    expectedBehavior: 'Score broken into Clinical Accuracy (40%), Resource Utilization (30%), Patient Safety (30%), accompanied by comprehensive clinical rationale.',
    acceptanceCriteria: {
      given: 'Student concludes case',
      when: 'They view the debrief screen',
      then: 'Granular score rubric, physiological explanation of outcomes, and option to reset and explore alternate pathways are shown'
    },
    dependencies: ['SIM-003'],
    securityConsiderations: 'Scores recorded in student academic portfolio; cannot overwrite previous baseline attempt.'
  },
  {
    id: 'SIM-005',
    module: 'SIM',
    title: 'Educator Case Authoring & Scenario Review Workspace',
    description: 'Enable educators to draft, modify vitals progression, set scoring criteria, and publish peer-reviewed simulation cases.',
    role: 'Educator',
    priority: 'P1',
    preconditions: 'Educator role authenticated.',
    expectedBehavior: 'Educator builds case using structured step editor (History -> Vitals -> Differentials -> Investigations -> Outcomes) and saves version.',
    acceptanceCriteria: {
      given: 'An educator authors a new Diabetic Ketoacidosis case',
      when: 'They publish version 1.0',
      then: 'The scenario is available to medical students in their practice catalog'
    },
    dependencies: ['SIM-001', 'AUTH-001'],
    securityConsiderations: 'Draft scenarios visible only to authoring faculty until published.'
  },

  // SECURITY & GOVERNANCE
  {
    id: 'SEC-001',
    module: 'SEC',
    title: 'End-to-End Cryptographic Protection & Envelope Encryption',
    description: 'Enforce TLS 1.3 in transit and AES-256 envelope encryption with KMS-managed keys at rest for all PHI databases and document stores.',
    role: 'System',
    priority: 'P0',
    preconditions: 'System operational.',
    expectedBehavior: 'All network payloads encrypted; database column encryption for sensitive demographics; zero unencrypted data on disk.',
    acceptanceCriteria: {
      given: 'Any incoming HTTP request or stored database row',
      when: 'Inspected on network wire or disk storage',
      then: 'Plaintext is inaccessible without authenticated KMS decryption keys'
    },
    dependencies: ['KMS / Cryptographic Provider'],
    securityConsiderations: 'Annual key rotation; strict separation between key custodians and database operators.'
  },
  {
    id: 'SEC-002',
    module: 'SEC',
    title: 'Tenant Isolation Between Clinical PHI and Educational Data',
    description: 'Physically or logically partition clinical healthcare databases from medical training simulation databases to prevent cross-contamination.',
    role: 'System',
    priority: 'P0',
    preconditions: 'Database schema deployment.',
    expectedBehavior: 'Simulation engine cannot query PHI schemas; student accounts have zero read permissions on patient records.',
    acceptanceCriteria: {
      given: 'A medical student session token',
      when: 'Attempting to query `/api/v1/patients/*`',
      then: 'Middleware denies access with 403 Forbidden and alerts security log'
    },
    dependencies: ['Database Schema Separation', 'RBAC Middleware'],
    securityConsiderations: 'Prevents accidental leak of real patient data into educational environments.'
  },

  // ADMIN
  {
    id: 'ADM-001',
    module: 'ADM',
    title: 'Administrator Audit Console & Account Compromise Lockout',
    description: 'Provide real-time security dashboard for monitoring suspicious access patterns, revoking compromised sessions, and managing roles.',
    role: 'Admin',
    priority: 'P0',
    preconditions: 'Authenticated Administrator with MFA.',
    expectedBehavior: 'Admin views real-time audit feed; can click "Force Terminate All Sessions" for any user flagged for credential compromise.',
    acceptanceCriteria: {
      given: 'A detected anomaly (e.g., doctor login from two distant IPs simultaneously)',
      when: 'Admin triggers emergency account lockdown',
      then: 'All active JWTs for that account are blacklisted immediately in Redis and doctor is notified via secondary SMS'
    },
    dependencies: ['Redis Token Blacklist', 'Audit Log Service'],
    securityConsiderations: 'Admin actions themselves logged to an external immutable write-once log.'
  }
];

export const RISK_REGISTER: RiskItem[] = [
  {
    id: 'RISK-001',
    category: 'AI/ML',
    risk: 'AI generates medically inaccurate advice or fabricates clinical guidance (Hallucination).',
    likelihood: 'Medium',
    impact: 'Critical',
    mitigation: 'Implement strict RAG pipeline restricted to vetted medical corpora (WHO, ICMR, PubMed); zero-temperature retrieval; prompt guardrails rejecting speculative diagnostic claims; mandatory clinical disclaimers.',
    owner: 'Lead AI Engineer'
  },
  {
    id: 'RISK-002',
    category: 'Clinical Safety',
    risk: 'Patient with emergent medical crisis (e.g., myocardial infarction, stroke) delays calling emergency services to chat with AI.',
    likelihood: 'Medium',
    impact: 'Critical',
    mitigation: 'Pre-generation emergency semantic classifier detects acute red-flag symptoms and halts AI conversation, displaying prominent red banner with direct 112 / 911 one-touch calling.',
    owner: 'Chief Medical Officer / UX Lead'
  },
  {
    id: 'RISK-003',
    category: 'Security & Privacy',
    risk: 'Unauthorized access or cross-patient data leakage of sensitive personal health records (PHI).',
    likelihood: 'Low',
    impact: 'Critical',
    mitigation: 'Mandatory patient-controlled time-bound consent tokens; row-level security (RLS) in PostgreSQL; envelope encryption at rest; tamper-evident audit logs on all document reads.',
    owner: 'Security Architect'
  },
  {
    id: 'RISK-004',
    category: 'Regulatory',
    risk: 'Non-compliance with Digital Personal Data Protection Act (DPDP Act 2023) and Telemedicine Practice Guidelines.',
    likelihood: 'Low',
    impact: 'High',
    mitigation: 'Clear legal consent banners; user-initiated right to erasure & export; verified doctor council credentials prior to practice listing; watermarked e-prescriptions with digital signatures.',
    owner: 'Legal & Compliance Officer'
  },
  {
    id: 'RISK-005',
    category: 'Operational',
    risk: 'Doctor no-shows or high appointment cancellation rates leading to patient dissatisfaction.',
    likelihood: 'Medium',
    impact: 'Medium',
    mitigation: 'Automated SMS/Email appointment reminders 24h and 1h prior; real-time schedule conflict prevention; doctor penalty-free rescheduling window; automated instant refund/rebooking credits.',
    owner: 'Product Operations Manager'
  },
  {
    id: 'RISK-006',
    category: 'Clinical Safety',
    risk: 'Medical students conflating virtual simulation training cases with real clinical patients or using simulation logic on real hospital wards.',
    likelihood: 'Low',
    impact: 'High',
    mitigation: 'Ubiquitous watermarks across simulation module ("EDUCATIONAL SIMULATION ONLY — NOT REAL PATIENT DATA"); zero overlap in patient database schemas; educators review and certify all case algorithms.',
    owner: 'Medical Education Director'
  },
  {
    id: 'RISK-007',
    category: 'Security & Privacy',
    risk: 'Malicious file upload containing malware or trojan disguised as a PDF laboratory report.',
    likelihood: 'Medium',
    impact: 'High',
    mitigation: 'Automated asynchronous containerized virus/malware scanning (ClamAV/VirusTotal API) on all file uploads prior to persisting in private S3 bucket; MIME-type verification; sandboxed viewer.',
    owner: 'DevOps / Cloud Architect'
  },
  {
    id: 'RISK-008',
    category: 'AI/ML',
    risk: 'Adversarial prompt injection attempting to extract private medical data or bypass prescription refusal filters.',
    likelihood: 'Medium',
    impact: 'High',
    mitigation: 'Complete decoupling of AI context from private health records; defensive system prompt framing; post-generation regex filters detecting drug dosing attempts; automated input sanitization.',
    owner: 'AI Safety Specialist'
  }
];

export const DATABASE_ENTITIES = [
  {
    name: 'users',
    description: 'Core identity record containing authentication credentials and global account status.',
    columns: [
      { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Unique user identifier' },
      { name: 'email', type: 'VARCHAR(255) UNIQUE', desc: 'Normalized verified email' },
      { name: 'phone', type: 'VARCHAR(32)', desc: 'E.164 formatted contact number' },
      { name: 'password_hash', type: 'VARCHAR(255)', desc: 'Argon2id password hash' },
      { name: 'role', type: 'ENUM', desc: 'patient | doctor | student | educator | admin' },
      { name: 'status', type: 'ENUM', desc: 'active | pending_verification | suspended' },
      { name: 'created_at', type: 'TIMESTAMPTZ', desc: 'Timestamp of registration' }
    ],
    sensitivity: 'HIGH (PII)'
  },
  {
    name: 'patient_profiles',
    description: 'Demographics, emergency contacts, blood type, and allergy metadata.',
    columns: [
      { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Profile identifier' },
      { name: 'user_id', type: 'UUID REFERENCES users(id)', desc: 'Foreign key to users table' },
      { name: 'full_name', type: 'VARCHAR(128)', desc: 'Encrypted patient legal name' },
      { name: 'date_of_birth', type: 'DATE', desc: 'Date of birth' },
      { name: 'blood_group', type: 'VARCHAR(8)', desc: 'ABO/Rh blood type' },
      { name: 'emergency_contact_phone', type: 'VARCHAR(32)', desc: 'Next-of-kin phone' },
      { name: 'known_allergies', type: 'TEXT[]', desc: 'Array of recorded allergen triggers' }
    ],
    sensitivity: 'CRITICAL (PHI)'
  },
  {
    name: 'doctor_profiles',
    description: 'Physician credentials, medical council registration, specialties, and fee schedule.',
    columns: [
      { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Doctor identifier' },
      { name: 'user_id', type: 'UUID REFERENCES users(id)', desc: 'Foreign key to users table' },
      { name: 'registration_number', type: 'VARCHAR(64)', desc: 'Medical council license number' },
      { name: 'state_medical_council', type: 'VARCHAR(128)', desc: 'Licensing jurisdiction' },
      { name: 'specialties', type: 'VARCHAR(64)[]', desc: 'Primary & secondary specialties' },
      { name: 'consultation_fee', type: 'NUMERIC(10,2)', desc: 'Standard consultation fee' },
      { name: 'is_verified', type: 'BOOLEAN DEFAULT FALSE', desc: 'Admin credential approval flag' }
    ],
    sensitivity: 'MEDIUM (Professional Credential)'
  },
  {
    name: 'appointments',
    description: 'Scheduled consultation slots, booking status, and video session tokens.',
    columns: [
      { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Appointment identifier' },
      { name: 'patient_id', type: 'UUID REFERENCES users(id)', desc: 'Booking patient' },
      { name: 'doctor_id', type: 'UUID REFERENCES users(id)', desc: 'Assigned physician' },
      { name: 'scheduled_start', type: 'TIMESTAMPTZ', desc: 'Start time of consultation' },
      { name: 'scheduled_end', type: 'TIMESTAMPTZ', desc: 'End time of consultation' },
      { name: 'status', type: 'ENUM', desc: 'scheduled | in_progress | completed | cancelled' },
      { name: 'meeting_room_id', type: 'VARCHAR(128)', desc: 'Encrypted WebRTC room identifier' }
    ],
    sensitivity: 'HIGH (Appointment PHI)'
  },
  {
    name: 'medical_documents',
    description: 'Uploaded diagnostic records, lab reports, and imaging metadata.',
    columns: [
      { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Document record identifier' },
      { name: 'patient_id', type: 'UUID REFERENCES users(id)', desc: 'Owner of the record' },
      { name: 'title', type: 'VARCHAR(255)', desc: 'Document descriptive name' },
      { name: 'category', type: 'ENUM', desc: 'lab_report | imaging | prescription | discharge' },
      { name: 'storage_key', type: 'VARCHAR(512)', desc: 'S3 encrypted object storage key' },
      { name: 'file_size_bytes', type: 'BIGINT', desc: 'Byte size of document' },
      { name: 'checksum_sha256', type: 'VARCHAR(64)', desc: 'Integrity verification hash' },
      { name: 'is_scanned_clean', type: 'BOOLEAN', desc: 'Malware scanner verification flag' }
    ],
    sensitivity: 'CRITICAL (Diagnostic PHI)'
  },
  {
    name: 'consent_grants',
    description: 'Time-bound access permissions granted by patients to healthcare providers.',
    columns: [
      { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Consent grant identifier' },
      { name: 'patient_id', type: 'UUID REFERENCES users(id)', desc: 'Granting patient' },
      { name: 'doctor_id', type: 'UUID REFERENCES users(id)', desc: 'Authorized doctor' },
      { name: 'purpose', type: 'VARCHAR(255)', desc: 'Teleconsultation / Second Opinion' },
      { name: 'expires_at', type: 'TIMESTAMPTZ', desc: 'Automatic expiry timestamp' },
      { name: 'revoked_at', type: 'TIMESTAMPTZ NULL', desc: 'Manual revocation timestamp' },
      { name: 'scope', type: 'VARCHAR(64)[]', desc: 'all_records | recent_30_days | labs_only' }
    ],
    sensitivity: 'HIGH (Authorization Policy)'
  },
  {
    name: 'audit_logs',
    description: 'Immutable append-only trail recording all access to medical records.',
    columns: [
      { name: 'id', type: 'BIGSERIAL PRIMARY KEY', desc: 'Monotonic log sequence' },
      { name: 'actor_id', type: 'UUID REFERENCES users(id)', desc: 'User initiating action' },
      { name: 'patient_id', type: 'UUID REFERENCES users(id)', desc: 'Patient whose data was accessed' },
      { name: 'action', type: 'VARCHAR(64)', desc: 'VIEW_DOCUMENT | DOWNLOAD | REVOKE_CONSENT' },
      { name: 'resource_id', type: 'VARCHAR(128)', desc: 'Target document or record ID' },
      { name: 'ip_hash', type: 'VARCHAR(64)', desc: 'Salted cryptographic IP hash' },
      { name: 'timestamp', type: 'TIMESTAMPTZ DEFAULT NOW()', desc: 'Tamper-proof event time' }
    ],
    sensitivity: 'CRITICAL (Compliance Audit Log)'
  },
  {
    name: 'simulation_scenarios',
    description: 'Curated educational medical cases reviewed by medical educators.',
    columns: [
      { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Scenario identifier' },
      { name: 'author_id', type: 'UUID REFERENCES users(id)', desc: 'Educator creator' },
      { name: 'title', type: 'VARCHAR(255)', desc: 'Clinical case title' },
      { name: 'specialty', type: 'VARCHAR(64)', desc: 'Cardiology | Pulmonology | Trauma' },
      { name: 'difficulty', type: 'ENUM', desc: 'beginner | intermediate | advanced' },
      { name: 'patient_demographics', type: 'JSONB', desc: 'Synthetic age, gender, occupation' },
      { name: 'initial_vitals', type: 'JSONB', desc: 'BP, HR, SpO2, Temp, RR' },
      { name: 'decision_tree_json', type: 'JSONB', desc: 'Branching stages, investigations, outcomes' },
      { name: 'is_published', type: 'BOOLEAN DEFAULT FALSE', desc: 'Educator approval status' }
    ],
    sensitivity: 'LOW (Synthetic Educational Data)'
  },
  {
    name: 'student_simulation_attempts',
    description: 'Student performance metrics, decision paths, and rubric feedback scores.',
    columns: [
      { name: 'id', type: 'UUID PRIMARY KEY', desc: 'Attempt identifier' },
      { name: 'student_id', type: 'UUID REFERENCES users(id)', desc: 'Medical student' },
      { name: 'scenario_id', type: 'UUID REFERENCES simulation_scenarios(id)', desc: 'Case simulated' },
      { name: 'score_percentage', type: 'NUMERIC(5,2)', desc: 'Final rubric competency score' },
      { name: 'pathway_taken', type: 'JSONB', desc: 'Chronological actions and drug orders' },
      { name: 'completed_at', type: 'TIMESTAMPTZ', desc: 'Completion timestamp' },
      { name: 'feedback_summary', type: 'TEXT', desc: 'Generated educational debrief' }
    ],
    sensitivity: 'MEDIUM (Educational Records)'
  }
];

export const API_ENDPOINTS = [
  {
    method: 'POST',
    path: '/api/v1/auth/register',
    purpose: 'Register new user account with role selection',
    auth: 'None (Public)',
    roles: ['All'],
    requestBody: `{\n  "email": "aarav.sharma@example.com",\n  "phone": "+919876543210",\n  "password": "SecurePassword#2026",\n  "role": "patient"\n}`,
    responseSample: `{\n  "success": true,\n  "userId": "usr_94f8a12b",\n  "status": "pending_verification",\n  "message": "OTP dispatched to registered phone"\n}`,
    rateLimit: '5 requests / min / IP'
  },
  {
    method: 'POST',
    path: '/api/v1/telemedicine/appointments',
    purpose: 'Book a consultation slot with conflict check and intake summary',
    auth: 'Bearer JWT (Patient)',
    roles: ['Patient'],
    requestBody: `{\n  "doctorId": "doc_31e9bc44",\n  "slotStart": "2026-11-02T10:30:00Z",\n  "chiefComplaint": "Persistent dry cough for 3 weeks",\n  "allergies": ["Penicillin"],\n  "currentMedications": ["Amlodipine 5mg"]\n}`,
    responseSample: `{\n  "appointmentId": "apt_77c10d32",\n  "status": "confirmed",\n  "doctor": "Dr. Priya Nair, MD",\n  "roomToken": "wrtc_tok_9918ab"\n}`,
    rateLimit: '10 requests / min / User'
  },
  {
    method: 'POST',
    path: '/api/v1/ai/health-assistant',
    purpose: 'Query grounded medical knowledge with safety triage and citations',
    auth: 'Bearer JWT (User)',
    roles: ['Patient', 'Student', 'Doctor'],
    requestBody: `{\n  "query": "What does a high fasting blood sugar of 135 mg/dL indicate?",\n  "conversationId": "conv_44b029e"\n}`,
    responseSample: `{\n  "answer": "A fasting blood glucose of 135 mg/dL is above the typical normal threshold (70-99 mg/dL) and falls into the range associated with impaired fasting glucose or diabetes. This requires a formal confirmatory test (such as HbA1c or an oral glucose tolerance test) by a qualified physician.",\n  "sources": [\n    {"title": "ICMR Guidelines for Management of Type 2 Diabetes", "year": "2024", "authority": "ICMR"},\n    {"title": "WHO Diagnostic Criteria for Diabetes Mellitus", "year": "2023", "authority": "WHO"}\n  ],\n  "emergencyFlag": false,\n  "disclaimer": "This information is educational and not medical advice."\n}`,
    rateLimit: '20 requests / min / User'
  },
  {
    method: 'POST',
    path: '/api/v1/records/consent-grant',
    purpose: 'Issue time-bound record access grant to an attending doctor',
    auth: 'Bearer JWT (Patient)',
    roles: ['Patient'],
    requestBody: `{\n  "doctorId": "doc_31e9bc44",\n  "durationHours": 48,\n  "scope": ["all_records"],\n  "purpose": "Teleconsultation review"\n}`,
    responseSample: `{\n  "grantId": "csnt_88192a",\n  "doctorId": "doc_31e9bc44",\n  "expiresAt": "2026-10-28T07:20:00Z",\n  "active": true\n}`,
    rateLimit: '30 requests / min / User'
  },
  {
    method: 'POST',
    path: '/api/v1/simulations/:caseId/action',
    purpose: 'Execute simulated clinical intervention or diagnostic order',
    auth: 'Bearer JWT (Student)',
    roles: ['Student', 'Educator'],
    requestBody: `{\n  "actionType": "ORDER_INVESTIGATION",\n  "investigationCode": "12_LEAD_ECG",\n  "justification": "Evaluate suspected acute coronary syndrome"\n}`,
    responseSample: `{\n  "result": {\n    "testName": "12-Lead Electrocardiogram",\n    "findings": "ST-segment elevation of 3.5mm in leads V2-V4 with reciprocal depressions in II, III, aVF",\n    "interpretation": "Acute Anterior Wall STEMI",\n    "patientVitalsUpdated": {\n      "bloodPressure": "110/72",\n      "heartRate": 98,\n      "spO2": 96\n    }\n  },\n  "feedbackHint": "Targeted order matching primary differential."\n}`,
    rateLimit: '60 requests / min / User'
  }
];
