export const initialCase = {
  id: "LL-10452",
  status: "CRITICAL",
  patientName: "Unknown / Ravi Kumar",
  identifiedName: "Ravi Kumar",
  patientAge: 58,
  patientGender: "Male",
  condition: "Unresponsive — breathing abnormal",
  location: "ABC Village, Government School",
  landmark: "Main Gate No. 2, Near Panchayat Office",
  callerName: "Suresh Kumar (Son)",
  callerPhone: "+91 98452 11045",
  time: "10:42 AM",
  priority: "Critical",
  requiredAmbulanceType: "Advanced Life Support (ALS)",
  specialRequirements: "Portable Oxygen Concentrator, Defibrillator Ready, Cardiac Monitor",
  patientCoords: [12.9352, 77.6245],
  assignedAmbulanceId: "A01",
  assignedHospitalId: "HOSP-B",
};

export const emergencyCasesList = [
  {
    id: "LL-10452",
    patientName: "Ravi Kumar",
    condition: "Unresponsive — breathing abnormal",
    location: "ABC Village, Government School",
    time: "10:42 AM",
    priority: "Critical",
    status: "DISPATCHED",
    ambulance: "A01",
    eta: "9 min",
  },
  {
    id: "LL-10453",
    patientName: "Deepak Sharma",
    condition: "Motorcycle Skid / Suspected Femur Fracture",
    location: "Ring Road Junction 4",
    time: "10:46 AM",
    priority: "High",
    status: "EN ROUTE",
    ambulance: "A03",
    eta: "6 min",
  },
  {
    id: "LL-10451",
    patientName: "Sunita Devi",
    condition: "Acute Chest Heaviness / Diaphoresis",
    location: "North Block, Sector 7",
    time: "10:35 AM",
    priority: "High",
    status: "ARRIVED HOSPITAL",
    ambulance: "A06",
    eta: "Arrived",
  },
  {
    id: "LL-10450",
    patientName: "Baby Aarav (4yo)",
    condition: "Febrile Convulsion / High Temperature",
    location: "Kaveri Nagar",
    time: "10:28 AM",
    priority: "Critical",
    status: "HANDOVER COMPLETE",
    ambulance: "A02",
    eta: "Completed",
  },
  {
    id: "LL-10449",
    patientName: "Meenakshi Sundaram",
    condition: "Diabetic Hypoglycemia / Confusion",
    location: "Bazaar Cross Street",
    time: "10:15 AM",
    priority: "Moderate",
    status: "RESOLVED",
    ambulance: "A05",
    eta: "On-Site",
  }
];

export const timelineStages = [
  { step: 1, title: "Call Received", time: "10:42 AM", desc: "Emergency call registered via 108/112 gateway integration", status: "completed" },
  { step: 2, title: "AI Information Extraction", time: "10:43 AM", desc: "Audio transcript structured: Unresponsive, abnormal breathing", status: "completed" },
  { step: 3, title: "Human Verification", time: "10:44 AM", desc: "Dispatcher verified Level 1 Critical, requested ALS ambulance", status: "completed" },
  { step: 4, title: "Ambulance Assigned", time: "10:45 AM", desc: "ALS Ambulance A01 dispatched with Nurse & Pilot", status: "active" },
  { step: 5, title: "En Route & Arrived", time: "10:51 AM", desc: "Ambulance A01 on-site at ABC Village Government School", status: "pending" },
  { step: 6, title: "Patient Picked Up", time: "10:55 AM", desc: "Patient on board, vitals synchronized, oxygen therapy initiated", status: "pending" },
  { step: 7, title: "Hospital Pre-Alert", time: "11:04 AM", desc: "Pre-arrival telemetry sent to Apex Trauma & Heart Institute (Hospital B)", status: "pending" },
  { step: 8, title: "Hospital Handover", time: "11:18 AM", desc: "Digital patient handover docket signed and synchronized with ED EMR", status: "pending" }
];

export const callTranscript = [
  { speaker: "Dispatcher / AI", text: "Emergency coordination center. Please describe the emergency.", isAi: true },
  { speaker: "Caller", text: "My father suddenly collapsed near the government school.", isAi: false },
  { speaker: "AI Intake Assistant", text: "Is the person conscious?", isAi: true },
  { speaker: "Caller", text: "No.", isAi: false },
  { speaker: "AI Intake Assistant", text: "Is the person breathing normally?", isAi: true },
  { speaker: "Caller", text: "No, breathing is abnormal.", isAi: false },
  { speaker: "AI Intake Assistant", text: "Are there any visible injuries or active bleeding?", isAi: true },
  { speaker: "Caller", text: "No bleeding seen. He is sweating heavily.", isAi: false }
];

export const aiExtractedEntities = [
  { label: "Consciousness", value: "Unresponsive", alert: true },
  { label: "Breathing", value: "Abnormal (Shallow / Gasping)", alert: true },
  { label: "Bleeding", value: "No visible bleeding", alert: false },
  { label: "Location", value: "ABC Village", alert: false },
  { label: "Landmark", value: "Government School, Gate No. 2", alert: false },
  { label: "Caller Contact", value: "+91 98452 11045", alert: false },
  { label: "Triage Recommendation", value: "ALS Ambulance (Immediate Resuscitation)", alert: true },
  { label: "Extraction Confidence", value: "98.4%", alert: false }
];

export const ambulances = [
  {
    id: "A01",
    name: "Ambulance A01",
    type: "Advanced Life Support (ALS)",
    distance: "4.2 km",
    distanceKm: 4.2,
    eta: "9 min",
    etaMinutes: 9,
    status: "Available",
    staff: "Nurse (Ananya Rao) + Driver (Vikram Singh)",
    equipment: ["Oxygen", "ECG Monitor", "Defibrillator", "Ventilator"],
    coords: [12.9240, 77.6080],
    speed: "48 km/h",
    phone: "+91 98001 00001",
    fuel: "88%"
  },
  {
    id: "A02",
    name: "Ambulance A02",
    type: "Basic Life Support (BLS)",
    distance: "7.5 km",
    distanceKm: 7.5,
    eta: "15 min",
    etaMinutes: 15,
    status: "Available",
    staff: "EMT (Kiran Verma) + Driver (Rajesh G.)",
    equipment: ["Oxygen", "First Aid Kit", "Spine Board", "Stretcher"],
    coords: [12.9580, 77.5850],
    speed: "0 km/h",
    phone: "+91 98001 00002",
    fuel: "92%"
  },
  {
    id: "A03",
    name: "Ambulance A03",
    type: "Advanced Life Support (ALS)",
    distance: "3.8 km",
    distanceKm: 3.8,
    eta: "7 min",
    etaMinutes: 7,
    status: "Busy",
    busyReason: "Handling Case LL-10449",
    staff: "Paramedic (Arjun Das) + Driver (Manoj K.)",
    equipment: ["Oxygen", "ECG", "Suction Unit"],
    coords: [12.9420, 77.6480],
    speed: "35 km/h",
    phone: "+91 98001 00003",
    fuel: "65%"
  },
  {
    id: "A04",
    name: "Ambulance A04",
    type: "Neonatal & Pediatric Critical Care",
    distance: "11.2 km",
    distanceKm: 11.2,
    eta: "22 min",
    etaMinutes: 22,
    status: "Available",
    staff: "Pediatric Nurse + Driver",
    equipment: ["Incubator", "O2", "Syringe Pumps"],
    coords: [12.8980, 77.6250],
    speed: "0 km/h",
    phone: "+91 98001 00004",
    fuel: "95%"
  }
];

export const hospitals = [
  {
    id: "HOSP-A",
    name: "Hospital A",
    fullName: "City Care Multi-Specialty Hospital",
    distance: "5.2 km",
    eta: "12 min",
    emergencyBeds: "4 Available",
    icuBeds: "2 Available",
    oxygen: "High-Flow Available",
    cardiology: "On-Call Cardiologist",
    specialistStatus: "On-Call",
    recommended: false,
    coords: [12.9620, 77.6180],
    phone: "+91 80 2200 4401",
    traumaLevel: "Level II",
    occupancyRate: "78%"
  },
  {
    id: "HOSP-B",
    name: "Hospital B",
    fullName: "Apex Trauma & Heart Institute",
    distance: "7.1 km",
    eta: "15 min",
    emergencyBeds: "7 Available",
    icuBeds: "4 Available",
    oxygen: "Central Grid Ready",
    cardiology: "24/7 Active Cath Lab Team On-Site",
    specialistStatus: "On-Site Ready",
    recommended: true,
    recommendationReason: "Suitable emergency facilities and specialist availability. Cath lab activated with zero wait time.",
    coords: [12.9450, 77.6520],
    phone: "+91 80 3344 8800",
    traumaLevel: "Level I Tertiary Trauma & Cardiac Center",
    occupancyRate: "64%"
  },
  {
    id: "HOSP-C",
    name: "Hospital C",
    fullName: "District Government General Hospital",
    distance: "3.1 km",
    eta: "8 min",
    emergencyBeds: "1 Available",
    icuBeds: "0 Available (Full)",
    oxygen: "Available",
    cardiology: "Unavailable",
    specialistStatus: "General Duty Only",
    recommended: false,
    recommendationReason: "ICU beds occupied; lacking tertiary cardiac interventions for abnormal breathing syncope.",
    coords: [12.9150, 77.6200],
    phone: "+91 80 2555 1100",
    traumaLevel: "Level III Community Emergency",
    occupancyRate: "96%"
  }
];

export const patientHistoryData = {
  personalInfo: {
    id: "PT-89412",
    name: "Ravi Kumar",
    age: 58,
    gender: "Male",
    dob: "14-Aug-1968",
    bloodGroup: "B+ve",
    weight: "72 kg",
    emergencyContact: "Suresh Kumar (Son) — +91 98452 11045",
    address: "House 42, ABC Village, Taluk Central, Karnataka"
  },
  emergencySummary: {
    emergencyType: "Loss of Consciousness / Respiratory Distress",
    initialCondition: "Unresponsive with Cheyne-Stokes irregular breathing",
    timeOfEmergency: "10:42 AM",
    location: "ABC Village, Government School Main Gate",
    intakePriority: "Critical Level 1"
  },
  transitVitals: {
    consciousness: "Regained partial awareness (GCS 11/15)",
    breathing: "18 bpm (assisted on 10L NRB mask)",
    bloodPressure: "135/88 mmHg",
    heartRate: "92 bpm (Sinus tachycardia settling)",
    oxygenSaturation: "97% on Oxygen support",
    firstAidGiven: "10L/min High-Flow O2 via NRB mask, 18G IV cannula with 500ml Ringer's Lactate, continuous 12-lead ECG telemetry monitoring"
  },
  medicalHistory: {
    previousTreatments: [
      {
        title: "Kidney Treatment — Evaluation & Management",
        hospital: "XYZ Hospital, Nephrology Ward",
        date: "February 4, 2026",
        details: "Stage II CKD routine review. Serum creatinine 1.7 mg/dL. Recommended sodium restriction and ACE-inhibitor continuation.",
        doctor: "Dr. K. Srinivas, Senior Nephrologist"
      },
      {
        title: "Hypertensive Urgency Management",
        hospital: "Apex Trauma & Heart Institute",
        date: "November 14, 2025",
        details: "Admitted with BP 185/105 mmHg, headache. Successfully titrated with oral amlodipine and labetalol. Discharged after 24h observation.",
        doctor: "Dr. P. Sharma, Cardiologist"
      },
      {
        title: "Acute Bronchitis & Respiratory Wheezing",
        hospital: "Primary Health Center, ABC Village",
        date: "August 19, 2025",
        details: "Bronchospasm treated with salbutamol nebulization and 5-day course of cefixime.",
        doctor: "Dr. A. Joseph, Medical Officer"
      }
    ],
    previousOperations: [
      {
        title: "Laparoscopic Appendectomy",
        hospital: "District General Hospital",
        date: "March 15, 2018",
        details: "Uncomplicated excision of inflamed appendix under general anesthesia. Clean wound healing, no post-op hernia.",
        surgeon: "Dr. R. Nambiar"
      }
    ],
    allergies: [
      { allergen: "Penicillin", reaction: "Severe urticaria & angioedema (reported 2012)", severity: "High" },
      { allergen: "NSAIDs / Aspirin", reaction: "Gastric ulceration & epigastric pain", severity: "Moderate" }
    ],
    medications: [
      { name: "Amlodipine", dosage: "5 mg", frequency: "Once daily (Morning)", purpose: "Hypertension" },
      { name: "Torus Nephro-Care", dosage: "1 tab", frequency: "Twice daily", purpose: "Renal Protection" },
      { name: "Atorvastatin", dosage: "10 mg", frequency: "Once daily (Bedtime)", purpose: "Dyslipidemia" }
    ],
    hospitalVisits: [
      { date: "04-Feb-2026", reason: "Nephrology OPD Follow-up", hospital: "XYZ Hospital", status: "Completed" },
      { date: "14-Nov-2025", reason: "Emergency Inpatient Admission", hospital: "Apex Heart Institute", status: "Discharged" },
      { date: "19-Aug-2025", reason: "Outpatient Nebulization", hospital: "PHC ABC Village", status: "Resolved" },
      { date: "12-Mar-2024", reason: "Annual Health Checkup", hospital: "City Care Hospital", status: "Normal" }
    ],
    handoverHistory: [
      { id: "HO-08912", date: "14-Nov-2025", ambulance: "A04", destination: "Apex Heart Institute ED", handoverStaff: "EMT Ramesh -> Dr. Verma (ED)", status: "Archived in EMR" },
      { id: "HO-05541", date: "19-Aug-2025", ambulance: "A01", destination: "PHC ABC Village", handoverStaff: "EMT S. Rao -> Dr. Joseph", status: "Archived in EMR" }
    ]
  }
};

export const sampleNotifications = [
  { id: 1, text: "Ambulance A01 assigned to Case LL-10452", time: "10:45 AM", type: "ambulance", icon: "Ambulance" },
  { id: 2, text: "Hospital B accepted incoming patient pre-arrival alert", time: "10:48 AM", type: "hospital", icon: "Building2" },
  { id: 3, text: "Patient location updated at ABC Village, Government School", time: "10:43 AM", type: "map", icon: "MapPin" },
  { id: 4, text: "Digital handover docket draft ready for signoff", time: "10:56 AM", type: "handover", icon: "FileCheck" },
  { id: 5, text: "Offline sync daemon: 3 cached logs synchronized successfully", time: "10:30 AM", type: "sync", icon: "RefreshCw" }
];
