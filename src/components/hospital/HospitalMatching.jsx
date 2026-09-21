import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { 
  Building2, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  MapPin, 
  Clock, 
  Send, 
  Bed, 
  Activity, 
  Heart, 
  Wind,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function HospitalMatching() {
  const { 
    hospitalData, 
    selectedHospital, 
    setSelectedHospital, 
    sendPreArrivalAlert, 
    preArrivalAlertSent,
    setCurrentView,
    activeCase 
  } = useEmergency();

  const handleSendAlert = (hospitalId) => {
    sendPreArrivalAlert(hospitalId);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Building2 className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Hospital Matching & Capability Matrix
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Target Patient: Ravi Kumar (58/M)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Dynamic facility matching comparing real-time emergency bed capacity, ICU availability, oxygen grids, and specialist coverage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('hospitalDashboard')}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>View Receiving ED Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recommended Hospital Spotlight Banner */}
      <div className="bg-gradient-to-r from-emerald-900 to-slate-900 text-white p-6 rounded-2xl border border-emerald-500/30 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Recommended Hospital</span>
            </div>
            <h3 className="text-xl font-extrabold text-white">
              Hospital B — Apex Trauma & Heart Institute
            </h3>
            <div className="p-3 bg-white/10 rounded-xl text-xs text-slate-200 max-w-2xl border border-white/10">
              <span className="font-bold text-white block mb-0.5">Matching Reason:</span>
              “Suitable emergency facilities and specialist availability.” Active 24/7 Cath Lab ready, unblocked ICU beds, and specialized trauma resuscitation team on standby.
            </div>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => handleSendAlert('HOSP-B')}
              className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition transform active:scale-95 ${
                preArrivalAlertSent
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-emerald-500/30'
              }`}
            >
              {preArrivalAlertSent ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Pre-Arrival Alert Sent</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Pre-Arrival Alert</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mandatory Regulatory & Operational Disclaimer */}
      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5">
          <span className="font-bold block text-amber-800">Operational Matching Protocol</span>
          <p className="text-amber-800/90 leading-relaxed font-medium">
            “The system should not make medical diagnoses. It only compares operational information such as facility availability, capacity, distance and specialist availability.”
          </p>
        </div>
      </div>

      {/* Hospital Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {hospitalData.map((hosp) => {
          const isSelected = selectedHospital?.id === hosp.id;
          const isRecommended = hosp.recommended;

          return (
            <div
              key={hosp.id}
              className={`rounded-2xl bg-white border p-6 shadow-xs flex flex-col justify-between transition-all ${
                isRecommended
                  ? 'border-emerald-500 ring-2 ring-emerald-100 shadow-md'
                  : isSelected
                  ? 'border-rose-500 ring-2 ring-rose-100'
                  : 'border-slate-200/80 hover:border-slate-300'
              }`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-extrabold text-slate-900">{hosp.name}</h3>
                      {isRecommended && (
                        <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                          Recommended
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-medium block mt-0.5">{hosp.fullName}</span>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-100 text-slate-700">
                    <Building2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Distance & ETA */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                      Distance
                    </span>
                    <span className="text-lg font-black text-slate-900 mt-0.5 block">{hosp.distance}</span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">
                      ETA
                    </span>
                    <span className="text-lg font-black text-rose-600 mt-0.5 block">{hosp.eta}</span>
                  </div>
                </div>

                {/* Operational Availability Checklist */}
                <div className="space-y-2.5 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Bed className="w-3.5 h-3.5 text-slate-400" />
                      <span>Emergency Bed:</span>
                    </span>
                    <span className="font-bold text-slate-800">{hosp.emergencyBeds}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Activity className="w-3.5 h-3.5 text-slate-400" />
                      <span>ICU Bed:</span>
                    </span>
                    <span className={`font-bold ${
                      hosp.icuBeds.includes('0') ? 'text-rose-600' : 'text-slate-800'
                    }`}>
                      {hosp.icuBeds}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Wind className="w-3.5 h-3.5 text-slate-400" />
                      <span>Oxygen Capacity:</span>
                    </span>
                    <span className="font-bold text-slate-800">{hosp.oxygen}</span>
                  </div>

                  <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50">
                    <span className="flex items-center gap-1.5 text-slate-600">
                      <Heart className="w-3.5 h-3.5 text-slate-400" />
                      <span>Cardiology:</span>
                    </span>
                    <span className={`font-bold ${
                      hosp.cardiology.includes('24/7') ? 'text-emerald-700' : 'text-slate-800'
                    }`}>
                      {hosp.cardiology}
                    </span>
                  </div>
                </div>

                {/* Recommendation Reason note */}
                {hosp.recommendationReason && (
                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600">
                    <span className="font-bold text-slate-700">Analysis: </span>
                    {hosp.recommendationReason}
                  </div>
                )}
              </div>

              {/* Action */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => handleSendAlert(hosp.id)}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition ${
                    isRecommended
                      ? preArrivalAlertSent && selectedHospital?.id === hosp.id
                        ? 'bg-emerald-600 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>
                    {preArrivalAlertSent && selectedHospital?.id === hosp.id
                      ? 'Pre-Arrival Alert Active'
                      : `Send Pre-Arrival Alert`}
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
