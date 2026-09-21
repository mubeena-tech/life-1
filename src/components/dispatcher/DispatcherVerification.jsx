import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { 
  ShieldCheck, 
  AlertOctagon, 
  MapPin, 
  Phone, 
  Ambulance, 
  CheckCircle2, 
  Edit3, 
  ArrowRight, 
  UserCheck, 
  Activity, 
  AlertTriangle 
} from 'lucide-react';

export default function DispatcherVerification() {
  const { 
    activeCase, 
    casePriority, 
    updatePriority, 
    setCurrentView, 
    updateTimelineStep,
    addNotification 
  } = useEmergency();

  const [isEditing, setIsEditing] = useState(false);
  const [editedCondition, setEditedCondition] = useState(activeCase.condition);
  const [editedLocation, setEditedLocation] = useState(activeCase.location);
  const [editedRequirements, setEditedRequirements] = useState(activeCase.specialRequirements);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const priorities = [
    { label: 'Critical', color: 'bg-rose-600 text-white hover:bg-rose-500', border: 'border-rose-600' },
    { label: 'High', color: 'bg-amber-500 text-white hover:bg-amber-400', border: 'border-amber-500' },
    { label: 'Moderate', color: 'bg-blue-600 text-white hover:bg-blue-500', border: 'border-blue-600' },
    { label: 'Low', color: 'bg-emerald-600 text-white hover:bg-emerald-500', border: 'border-emerald-600' }
  ];

  const handleConfirmCase = () => {
    setIsConfirmed(true);
    updateTimelineStep(3, 'completed');
    addNotification("Case LL-10452 confirmed by Dispatcher. Ready for vehicle assignment.", 'info');
  };

  const handleAssignAmbulance = () => {
    updateTimelineStep(3, 'completed');
    updateTimelineStep(4, 'active');
    setCurrentView('ambulances');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Title */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <UserCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Human Dispatcher Verification
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              Case ID: {activeCase.id}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Certified dispatcher review of incoming incident triage prior to ambulance allocation
          </p>
        </div>

        {/* Action triggers */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>{isEditing ? 'Save Changes' : 'Edit Information'}</span>
          </button>

          <button
            onClick={handleConfirmCase}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition ${
              isConfirmed 
                ? 'bg-emerald-600 text-white' 
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{isConfirmed ? 'Case Confirmed' : 'Confirm Case'}</span>
          </button>

          <button
            onClick={handleAssignAmbulance}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition transform active:scale-95"
          >
            <span>Assign Ambulance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Dispatcher Notice */}
      <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sky-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-sky-700 shrink-0 mt-0.5" />
        <div className="text-xs">
          <span className="font-bold block text-sky-900">Dispatcher Safety Gate</span>
          <p className="text-sky-800 font-medium">
            “Human dispatcher verifies AI-extracted information before emergency coordination.”
          </p>
        </div>
      </div>

      {/* Main Review Form Card */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
        
        {/* Priority Selector */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-2 uppercase tracking-wider">
            Emergency Priority Level
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {priorities.map((item) => {
              const isSelected = casePriority.toLowerCase() === item.label.toLowerCase();
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => updatePriority(item.label)}
                  className={`py-3 px-4 rounded-xl text-xs font-bold border-2 transition flex items-center justify-center gap-2 ${
                    isSelected
                      ? `${item.color} ${item.border} shadow-sm ring-2 ring-rose-200`
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <AlertOctagon className="w-4 h-4" />
                  <span>{item.label} Priority</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
          
          {/* Patient Condition */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-rose-600" />
              <span>Patient Condition</span>
            </span>
            {isEditing ? (
              <textarea
                value={editedCondition}
                onChange={(e) => setEditedCondition(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
                rows={2}
              />
            ) : (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800">
                {editedCondition}
              </div>
            )}
          </div>

          {/* Location */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>Incident Location & Landmark</span>
            </span>
            {isEditing ? (
              <input
                type="text"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
              />
            ) : (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800">
                {editedLocation} <span className="text-slate-400 font-normal">({activeCase.landmark})</span>
              </div>
            )}
          </div>

          {/* Required Ambulance Type */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <Ambulance className="w-3.5 h-3.5 text-rose-600" />
              <span>Required Ambulance Type</span>
            </span>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-bold text-rose-700 flex items-center justify-between">
              <span>{activeCase.requiredAmbulanceType}</span>
              <span className="bg-rose-100 text-rose-800 text-[10px] px-2 py-0.5 rounded font-bold">
                ALS MANDATORY
              </span>
            </div>
          </div>

          {/* Caller Information */}
          <div className="space-y-1.5">
            <span className="text-xs font-bold text-slate-600 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-rose-600" />
              <span>Caller Information</span>
            </span>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 flex items-center justify-between">
              <span>{activeCase.callerName}</span>
              <span className="font-mono text-slate-600 font-bold">{activeCase.callerPhone}</span>
            </div>
          </div>

          {/* Special Requirements */}
          <div className="md:col-span-2 space-y-1.5">
            <span className="text-xs font-bold text-slate-600">
              Special Equipment / Medical Requirements
            </span>
            {isEditing ? (
              <input
                type="text"
                value={editedRequirements}
                onChange={(e) => setEditedRequirements(e.target.value)}
                className="w-full text-xs p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500"
              />
            ) : (
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-medium text-slate-800">
                {editedRequirements}
              </div>
            )}
          </div>

        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>AI extraction verified against triage clinical protocols</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleConfirmCase}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition"
            >
              Confirm Case
            </button>
            <button
              onClick={handleAssignAmbulance}
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition flex items-center gap-1.5"
            >
              <span>Assign Ambulance</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
