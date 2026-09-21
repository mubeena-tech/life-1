import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { patientHistoryData } from '../../data/mockData';
import { 
  User, 
  Clock, 
  Calendar, 
  Building2, 
  Scissors, 
  Pill, 
  AlertTriangle, 
  FileCheck, 
  Activity, 
  MapPin, 
  Phone,
  ShieldCheck
} from 'lucide-react';

export default function PatientRecords() {
  const { personalInfo, medicalHistory } = patientHistoryData;
  const { setCurrentView } = useEmergency();

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-600 to-rose-500 text-white flex items-center justify-center font-black text-xl shadow-md shadow-rose-500/20">
            RK
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {personalInfo.name}
              </h2>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
                Blood: {personalInfo.bloodGroup}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-100 text-slate-700">
                {personalInfo.id}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Age: {personalInfo.age} Yrs • Gender: {personalInfo.gender} • DOB: {personalInfo.dob} • Weight: {personalInfo.weight}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('handover')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Digital Handover Docket</span>
          </button>
        </div>
      </div>

      {/* Grid: Personal Info, Allergies & Medications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Personal Details */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <User className="w-3.5 h-3.5 text-rose-600" />
            <span>Personal Information</span>
          </h3>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">Permanent Address:</span>
              <span className="font-semibold text-slate-800">{personalInfo.address}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">Emergency Primary Contact:</span>
              <span className="font-semibold text-slate-800">{personalInfo.emergencyContact}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px]">National Health ID (ABHA):</span>
              <span className="font-mono font-bold text-slate-800">91-4920-8812-4019</span>
            </div>
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Known Allergies</span>
          </h3>

          <div className="space-y-2 text-xs">
            {medicalHistory.allergies.map((item, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-900">
                <div className="flex items-center justify-between font-bold">
                  <span>{item.allergen}</span>
                  <span className="text-[10px] bg-rose-200 text-rose-800 px-1.5 py-0.2 rounded">
                    {item.severity}
                  </span>
                </div>
                <p className="text-[11px] text-rose-800/80 mt-1">{item.reaction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Medications */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <Pill className="w-3.5 h-3.5 text-indigo-600" />
            <span>Active Medications</span>
          </h3>

          <div className="space-y-2 text-xs">
            {medicalHistory.medications.map((med, idx) => (
              <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">{med.name} {med.dosage}</span>
                  <span className="text-[10px] text-slate-500">{med.frequency}</span>
                </div>
                <span className="text-[10px] font-semibold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded">
                  {med.purpose}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Previous Treatments Timeline (Detailed History) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4 text-rose-600" />
              <span>Medical History & Treatment Timeline</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Chronological record of clinic evaluations and procedures</p>
          </div>
          <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full font-bold">
            All Records Verified
          </span>
        </div>

        <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-200">
          {medicalHistory.previousTreatments.map((treat, idx) => (
            <div key={idx} className="relative flex items-start gap-4 pl-1">
              <div className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 z-10 shadow-xs text-xs font-bold ring-4 ring-white">
                {idx + 1}
              </div>
              <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <h4 className="font-bold text-slate-900 text-xs sm:text-sm">{treat.title}</h4>
                  <span className="font-mono text-xs font-bold text-rose-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {treat.date}
                  </span>
                </div>
                <div className="text-xs text-slate-600 mt-1 font-medium flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-slate-400" />
                  <span>{treat.hospital}</span>
                  <span className="text-slate-300">•</span>
                  <span className="text-slate-500">Attending: {treat.doctor}</span>
                </div>
                <p className="text-xs text-slate-700 mt-2 leading-relaxed bg-white p-2.5 rounded-lg border border-slate-100">
                  {treat.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Previous Operations & Hospital Visits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Previous Operations */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <Scissors className="w-3.5 h-3.5 text-slate-600" />
            <span>Previous Surgical Operations</span>
          </h3>

          <div className="space-y-3">
            {medicalHistory.previousOperations.map((op, idx) => (
              <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{op.surgery}</span>
                  <span className="font-mono text-[11px] text-slate-500">{op.date}</span>
                </div>
                <div className="text-[11px] text-slate-600">
                  <span>Hospital: {op.hospital} • Surgeon: {op.surgeon}</span>
                </div>
                <p className="text-[11px] text-slate-700 pt-1">{op.details} ({op.outcome})</p>
              </div>
            ))}
          </div>
        </div>

        {/* Digital Handover History */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5 pb-2 border-b border-slate-100">
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Past LIFELINK Handover Records</span>
          </h3>

          <div className="space-y-3">
            {medicalHistory.handoverHistory.map((ho) => (
              <div key={ho.id} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900">{ho.id}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">
                    {ho.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-600">
                  <span>{ho.date} • {ho.ambulance} → {ho.destination}</span>
                </div>
                <div className="text-[10px] text-slate-500 font-mono">Signoff: {ho.handoverStaff}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
