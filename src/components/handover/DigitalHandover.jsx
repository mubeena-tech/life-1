import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { patientHistoryData } from '../../data/mockData';
import { 
  FileCheck, 
  Send, 
  Download, 
  CheckCircle2, 
  QrCode, 
  Clock, 
  User, 
  Ambulance, 
  AlertCircle, 
  Activity, 
  HeartHandshake, 
  Building2, 
  X,
  Printer
} from 'lucide-react';

export default function DigitalHandover() {
  const { 
    vitals, 
    activeCase, 
    selectedAmbulance, 
    selectedHospital, 
    handoverComplete, 
    handoverTimestamp, 
    completeHandover,
    setCurrentView 
  } = useEmergency();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSentToHospital, setHasSentToHospital] = useState(false);

  const { personalInfo, emergencySummary, medicalHistory } = patientHistoryData;

  const handleSendToHospital = () => {
    setHasSentToHospital(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <FileCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Digital Patient Handover
            </h2>
            <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
              handoverComplete 
                ? 'bg-emerald-100 text-emerald-800' 
                : 'bg-amber-50 text-amber-700 border border-amber-200'
            }`}>
              {handoverComplete ? `Completed at ${handoverTimestamp}` : 'Pending Hospital ED Signoff'}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Standardized clinical handover dossier eliminating transfer data loss between EMS crew and hospital triage
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleSendToHospital}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              hasSentToHospital
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-300'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>{hasSentToHospital ? 'Transmitted to ED' : 'Send to Hospital'}</span>
          </button>

          <button
            onClick={completeHandover}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs ${
              handoverComplete
                ? 'bg-emerald-600 text-white'
                : 'bg-rose-600 hover:bg-rose-500 text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{handoverComplete ? 'Handover Confirmed' : 'Confirm Handover'}</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Handover Summary</span>
          </button>
        </div>
      </div>

      {/* Main Handover Form Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column (8 cols): Clinical Dossier */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* 1. Patient Information */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-rose-600" />
                <span>1. Patient Information</span>
              </h3>
              <span className="text-xs font-mono font-bold text-slate-700">ID: {personalInfo.id}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Full Name:</span>
                <span className="font-bold text-slate-800">{personalInfo.name}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Age / Gender:</span>
                <span className="font-bold text-slate-800">{personalInfo.age} Yrs / {personalInfo.gender}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Blood Group:</span>
                <span className="font-bold text-rose-600">{personalInfo.bloodGroup}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Emergency Contact:</span>
                <span className="font-bold text-slate-800 truncate block">{personalInfo.emergencyContact}</span>
              </div>
            </div>
          </div>

          {/* 2. Emergency Information */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>2. Emergency Incident Details</span>
              </h3>
              <span className="text-xs font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                Priority: Critical
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Emergency Type:</span>
                <span className="font-bold text-slate-800">{emergencySummary.emergencyType}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Time of Emergency Call:</span>
                <span className="font-bold text-slate-800">{emergencySummary.timeOfEmergency} (10:42 AM)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Initial Scene Condition:</span>
                <span className="font-semibold text-slate-700">{emergencySummary.initialCondition}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Incident Location:</span>
                <span className="font-semibold text-slate-700">{emergencySummary.location}</span>
              </div>
            </div>
          </div>

          {/* 3. Ambulance Information */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Ambulance className="w-3.5 h-3.5 text-sky-600" />
                <span>3. Transport & Responding Crew</span>
              </h3>
              <span className="text-xs font-bold text-slate-700">Vehicle: Ambulance A01 (ALS)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[10px]">Departure Time:</span>
                <span className="font-bold text-slate-800">10:45 AM (Base)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Hospital Arrival Time:</span>
                <span className="font-bold text-slate-800">11:16 AM (ED Bay 1)</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">EMS Staff:</span>
                <span className="font-semibold text-slate-700">Nurse Ananya Rao + Pilot Vikram</span>
              </div>
            </div>
          </div>

          {/* 4. Patient Monitoring (Transit Vitals & First Aid) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>4. Transit Physiological Observations & Care Given</span>
              </h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                Telemetry Logged
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Consciousness</span>
                <span className="text-xs font-bold text-emerald-700 mt-0.5 block">{vitals.consciousness}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Blood Pressure</span>
                <span className="text-xs font-bold text-slate-800 mt-0.5 block">{vitals.bloodPressure}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Heart Rate</span>
                <span className="text-xs font-bold text-slate-800 mt-0.5 block">{vitals.heartRate} BPM</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Oxygen Saturation</span>
                <span className="text-xs font-bold text-sky-700 mt-0.5 block">{vitals.oxygenSaturation}% O2</span>
              </div>
            </div>

            <div className="text-xs pt-1">
              <span className="text-slate-400 block text-[10px] font-bold uppercase">First Aid Administered En Route:</span>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-slate-800 mt-1">
                {vitals.firstAidGiven}
              </div>
            </div>
          </div>

          {/* 5. Medical History (Highlighted Kidney Treatment) */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-indigo-600" />
                <span>5. Medical History & Chronic Conditions</span>
              </h3>
              <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                Historical EMR Linked
              </span>
            </div>

            {/* Crucial treatment highlight as specifically requested */}
            <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-xs">
              <div className="flex items-center justify-between text-amber-900 font-bold mb-1">
                <span className="text-sm">Previous Treatment: Kidney treatment — XYZ Hospital</span>
                <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-amber-200">
                  Date: February 4, 2026
                </span>
              </div>
              <p className="text-amber-800/90 leading-relaxed mt-1">
                {medicalHistory.previousTreatments[0].details} Attending: {medicalHistory.previousTreatments[0].doctor}.
              </p>
            </div>

            {/* Allergies & Current Medications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
              <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100">
                <span className="text-rose-800 font-bold block mb-1">Documented Allergies:</span>
                <ul className="list-disc list-inside space-y-0.5 text-rose-900">
                  {medicalHistory.allergies.map((alg, i) => (
                    <li key={i}>{alg.allergen} — {alg.reaction}</li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-slate-800 font-bold block mb-1">Active Prescribed Medications:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-700">
                  {medicalHistory.medications.map((med, i) => (
                    <li key={i}>{med.name} {med.dosage} ({med.frequency})</li>
                  ))}
                </ul>
              </div>
            </div>

          </div>

        </div>

        {/* Right Column (4 cols): Signoff & Verification Card */}
        <div className="lg:col-span-4 space-y-6">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 text-sm">Handover Signoff</h3>
              <span className="text-[10px] font-mono text-slate-400">ISO 13485 COMPLIANT</span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <div className="p-2 bg-white rounded-xl shadow-xs border border-slate-200">
                <QrCode className="w-28 h-28 text-slate-900" />
              </div>
              <span className="text-[10px] font-mono text-slate-400 mt-2">DOCKET HASH: #LL-HO-10452-APEX</span>
              <p className="text-xs text-slate-600 mt-1 font-medium">
                Hospital ED Nurse Scans to ingest records into triage EHR instantly
              </p>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-400">Handing Over:</span>
                <span className="font-bold text-slate-800">Nurse Ananya Rao (EMS A01)</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-400">Receiving Doctor:</span>
                <span className="font-bold text-slate-800">Dr. Rajesh Verma (ED In-Charge)</span>
              </div>
              <div className="flex justify-between p-2 rounded-lg bg-slate-50">
                <span className="text-slate-400">Facility:</span>
                <span className="font-bold text-emerald-700">Apex Trauma & Heart Institute</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={completeHandover}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{handoverComplete ? 'Handover Completed & Signed' : 'Authorize & Sign Handover'}</span>
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs flex items-start gap-3">
            <HeartHandshake className="w-5 h-5 text-slate-600 shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              Upon confirmation, all vital charts, incident audio transcripts, and emergency medications automatically lock into the state public health database.
            </p>
          </div>

        </div>

      </div>

      {/* Interactive Download / Summary Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200 space-y-5">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-emerald-600" />
                <h3 className="font-black text-slate-900 text-base">Digital Handover Summary Docket</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-700 max-h-[60vh] overflow-y-auto p-1">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-900 block text-sm">LIFELINK EMERGENCY RESPONSE PROTOCOL</span>
                <span className="text-[11px] text-slate-500">Case LL-10452 • Certified Triage Transfer</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div><strong>Patient:</strong> Ravi Kumar (58/M, B+ve)</div>
                <div><strong>Location:</strong> ABC Village, Government School</div>
                <div><strong>Initial Condition:</strong> Unresponsive, abnormal breathing</div>
                <div><strong>Transit Status:</strong> Regained consciousness, SpO2 97%</div>
              </div>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900">
                <strong>Critical History Note:</strong> Kidney treatment at XYZ Hospital on February 4, 2026. Penicillin & NSAIDs allergy.
              </div>

              <div>
                <strong>First Aid Delivered:</strong> High-flow O2 (10L/min NRB), IV Normal Saline, ECG continuous monitoring.
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-400">Ready for hospital archives</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    window.print();
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Docket</span>
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
