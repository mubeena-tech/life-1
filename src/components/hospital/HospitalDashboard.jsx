import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { 
  Building2, 
  Bed, 
  Activity, 
  Wind, 
  Users, 
  Ambulance, 
  Clock, 
  CheckCircle2, 
  AlertOctagon, 
  HeartHandshake, 
  ShieldAlert,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function HospitalDashboard() {
  const { 
    teamPrepared, 
    prepareEmergencyTeam, 
    activeCase, 
    selectedAmbulance, 
    selectedHospital, 
    setCurrentView,
    vitals 
  } = useEmergency();

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-sky-50 text-sky-600">
              <Building2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Emergency Department Receiving Console
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Facility: Apex Trauma & Heart Institute (Hospital B)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time emergency department readiness, incoming trauma telemetry, and rapid resuscitation team activation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('handover')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>Open Handover Signoff</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Critical Incoming Trauma Patient Alert Banner */}
      <div className="bg-gradient-to-r from-rose-900 via-slate-900 to-rose-950 text-white p-6 rounded-2xl border-2 border-rose-500/40 shadow-lg relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-rose-400 text-xs font-bold uppercase tracking-wider">
                High Priority Trauma Inbound
              </span>
              <span className="bg-rose-500/20 text-rose-300 text-[10px] px-2 py-0.5 rounded font-bold border border-rose-500/30">
                Priority: Critical Level 1
              </span>
            </div>

            <h3 className="text-2xl font-black text-white">
              Incoming Patient — {activeCase.id} ({activeCase.identifiedName || 'Ravi Kumar'}, 58/M)
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-rose-400" />
                <span>Estimated Arrival: <strong className="text-white text-sm">12–15 minutes</strong></span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Ambulance className="w-4 h-4 text-amber-400" />
                <span>Unit: <strong>Ambulance A01 (ALS)</strong></span>
              </div>
              <span>•</span>
              <div>
                <span>Telemetry: <strong>SpO2 {vitals.oxygenSaturation}% | BP {vitals.bloodPressure} | HR {vitals.heartRate}</strong></span>
              </div>
            </div>
          </div>

          {/* Prepare Emergency Team Trigger */}
          <div className="shrink-0">
            <button
              onClick={prepareEmergencyTeam}
              className={`px-6 py-3.5 rounded-xl font-extrabold text-xs flex items-center gap-2 shadow-lg transition transform active:scale-95 ${
                teamPrepared
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                  : 'bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white shadow-rose-600/30 ring-2 ring-white/20'
              }`}
            >
              {teamPrepared ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Resuscitation Team Activated (Bay 1 Ready)</span>
                </>
              ) : (
                <>
                  <AlertOctagon className="w-5 h-5" />
                  <span>Prepare Emergency Team</span>
                </>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Hospital Capacity & Operational Status Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Available Emergency Beds */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Emergency Beds</span>
            <Bed className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            7 <span className="text-xs font-normal text-slate-500">Free</span>
          </div>
          <div className="mt-2 text-[10px] text-emerald-700 font-bold">
            Bay 1 Reserved for LL-10452
          </div>
        </div>

        {/* ICU Availability */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">ICU Beds</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            4 <span className="text-xs font-normal text-slate-500">Available</span>
          </div>
          <div className="mt-2 text-[10px] text-blue-700 font-bold">
            Level III Critical Care Ready
          </div>
        </div>

        {/* Oxygen Availability */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Oxygen Grid</span>
            <Wind className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            98.5% <span className="text-xs font-normal text-slate-500">Bulk O2</span>
          </div>
          <div className="mt-2 text-[10px] text-sky-700 font-bold">
            Central Liquid Grid Active
          </div>
        </div>

        {/* Doctors & Specialists on Duty */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Trauma Staff</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            6 <span className="text-xs font-normal text-slate-500">On-Site</span>
          </div>
          <div className="mt-2 text-[10px] text-indigo-700 font-bold">
            Cath Lab Team Activated
          </div>
        </div>

        {/* Incoming Ambulances Queue */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Inbound Queue</span>
            <Ambulance className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            2 <span className="text-xs font-normal text-slate-500">Units</span>
          </div>
          <div className="mt-2 text-[10px] text-amber-700 font-bold">
            A01 (9 min), A03 (16 min)
          </div>
        </div>

      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <h3 className="font-bold text-slate-900 text-sm">Active Inbound Emergency Transfers</h3>
          <span className="text-xs text-slate-500">Auto-refreshed via LIFELINK State Hub</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold">
              <tr>
                <th className="p-3 rounded-l-lg">Case ID</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Condition / Triage</th>
                <th className="p-3">Responding Unit</th>
                <th className="p-3">ETA</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-lg text-right">ED Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr className="bg-rose-50/40">
                <td className="p-3 font-mono font-bold text-rose-700">LL-10452</td>
                <td className="p-3 font-bold text-slate-900">Ravi Kumar (58/M)</td>
                <td className="p-3 text-slate-700">Unresponsive / Syncope (Breathing abnormal)</td>
                <td className="p-3 font-semibold text-slate-800">Ambulance A01 (ALS)</td>
                <td className="p-3 font-bold text-rose-600">12 min</td>
                <td className="p-3">
                  <span className="bg-rose-100 text-rose-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    PRE-ARRIVAL SENT
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={prepareEmergencyTeam}
                    className="px-3 py-1 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-500"
                  >
                    {teamPrepared ? 'Team Ready' : 'Prepare Bay'}
                  </button>
                </td>
              </tr>

              <tr>
                <td className="p-3 font-mono font-bold text-slate-700">LL-10453</td>
                <td className="p-3 font-semibold text-slate-800">Deepak Sharma (32/M)</td>
                <td className="p-3 text-slate-600">Suspected Femur Fracture / Road Incident</td>
                <td className="p-3 font-semibold text-slate-700">Ambulance A03 (ALS)</td>
                <td className="p-3 font-semibold text-slate-700">18 min</td>
                <td className="p-3">
                  <span className="bg-amber-50 text-amber-700 text-[10px] px-2 py-0.5 rounded-full font-bold">
                    EN ROUTE
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-semibold hover:bg-slate-200">
                    Acknowledge
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
