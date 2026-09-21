import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { 
  Ambulance, 
  MapPin, 
  Clock, 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Gauge,
  Phone
} from 'lucide-react';

export default function AmbulanceSelection() {
  const { fleet, assignAmbulance, selectedAmbulance, setCurrentView, activeCase } = useEmergency();

  const handleAssign = (ambId) => {
    assignAmbulance(ambId);
    setCurrentView('livemap');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Ambulance className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Emergency Ambulance Dispatch
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              Incident: {activeCase.id}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Assign the optimal emergency unit based on proximity, crew capability, and onboard resuscitation gear.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('livemap')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>View Live Map & Fleet</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Target incident summary pill */}
      <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-600 flex items-center justify-center font-bold">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Patient Destination Target</div>
            <div className="text-xs font-bold text-white">
              {activeCase.patientName} — {activeCase.location} ({activeCase.landmark})
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Triage Priority:</span>
            <span className="font-bold text-rose-400">{activeCase.priority} Level 1</span>
          </div>
          <div className="h-6 w-px bg-slate-700" />
          <div>
            <span className="text-slate-400 block text-[10px]">Required Vehicle:</span>
            <span className="font-bold text-white">{activeCase.requiredAmbulanceType}</span>
          </div>
        </div>
      </div>

      {/* Ambulance Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fleet.map((amb) => {
          const isAvailable = amb.status === 'Available';
          const isSelected = selectedAmbulance?.id === amb.id;

          return (
            <div
              key={amb.id}
              className={`rounded-2xl bg-white border p-6 shadow-xs flex flex-col justify-between transition-all ${
                isSelected
                  ? 'border-rose-600 ring-2 ring-rose-100 shadow-md'
                  : 'border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl ${
                      amb.id === 'A01' ? 'bg-rose-50 text-rose-600' : 'bg-slate-100 text-slate-700'
                    }`}>
                      <Ambulance className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-extrabold text-slate-900">{amb.name}</h3>
                        {amb.id === 'A01' && (
                          <span className="bg-rose-100 text-rose-700 text-[10px] font-bold px-1.5 py-0.2 rounded">
                            Recommended
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 font-medium">{amb.type}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isAvailable
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {amb.status}
                  </span>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                      <MapPin className="w-3 h-3 text-rose-600" />
                      <span>Distance</span>
                    </div>
                    <div className="text-lg font-black text-slate-900 mt-0.5">{amb.distance}</div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider flex items-center justify-center gap-1">
                      <Clock className="w-3 h-3 text-amber-600" />
                      <span>ETA</span>
                    </div>
                    <div className="text-lg font-black text-slate-900 mt-0.5">{amb.eta}</div>
                  </div>
                </div>

                {/* Crew & Details */}
                <div className="space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 block text-[10px]">Medical Staff:</span>
                      <span className="font-semibold text-slate-800">{amb.staff}</span>
                    </div>
                  </div>

                  {amb.equipment && (
                    <div className="pt-2">
                      <span className="text-slate-400 block text-[10px] mb-1">Onboard Equipment:</span>
                      <div className="flex flex-wrap gap-1">
                        {amb.equipment.map((eq, i) => (
                          <span
                            key={i}
                            className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium border border-slate-200"
                          >
                            {eq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {amb.busyReason && (
                    <div className="p-2 rounded-lg bg-rose-50 border border-rose-100 text-[11px] text-rose-700">
                      Currently: {amb.busyReason}
                    </div>
                  )}
                </div>
              </div>

              {/* Assignment CTA */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  disabled={!isAvailable}
                  onClick={() => handleAssign(amb.id)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                    !isAvailable
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : isSelected
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20 active:scale-95'
                  }`}
                >
                  <Ambulance className="w-4 h-4" />
                  <span>
                    {!isAvailable
                      ? 'Unavailable (Busy)'
                      : isSelected
                      ? 'Assigned & En Route'
                      : `Assign ${amb.name}`}
                  </span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
