import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { 
  HeartPulse, 
  Activity, 
  Mic, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  Volume2, 
  Wind, 
  Thermometer, 
  Radio, 
  User,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export default function AmbulanceMonitoring() {
  const { 
    vitals, 
    voiceUpdate, 
    simulateVoiceUpdate, 
    sendVitalsToHospital, 
    setCurrentView,
    activeCase,
    selectedHospital
  } = useEmergency();

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <HeartPulse className="w-5 h-5 animate-pulse" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              Ambulance Telemetry & Paramedic Console
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
              Unit: Ambulance A01 (ALS)
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time transit physiological telemetry, hands-free paramedic voice updates, and automated EMR sync.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('handover')}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>Proceed to Digital Handover</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Patient In-Transit Identification Card */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center font-bold">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Patient In Transit</div>
            <div className="text-base font-black text-white">
              {activeCase.identifiedName || 'Ravi Kumar'} <span className="text-xs text-slate-300 font-normal">(58 yrs, Male, B+ve)</span>
            </div>
            <div className="text-[11px] text-rose-300">Incident: LL-10452 • ABC Village School</div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Assigned Paramedic:</span>
            <span className="font-bold text-white">Ananya Rao (ALS Certified)</span>
          </div>
          <div className="h-6 w-px bg-slate-700" />
          <div>
            <span className="text-slate-400 block text-[10px]">Receiving Facility:</span>
            <span className="font-bold text-emerald-400">{selectedHospital?.fullName || 'Hospital B (Apex Trauma)'}</span>
          </div>
        </div>
      </div>

      {/* Live Vitals Telemetry Gauges Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Heart Rate */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Heart Rate</span>
            <HeartPulse className="w-4 h-4 text-rose-500 animate-pulse" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {vitals.heartRate} <span className="text-xs font-normal text-slate-500">BPM</span>
          </div>
          <div className="mt-2 text-[10px] text-emerald-600 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>ECG Sinus Rhythm</span>
          </div>
        </div>

        {/* Oxygen Saturation SpO2 */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">SpO2 Oxygen</span>
            <Wind className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {vitals.oxygenSaturation}% <span className="text-xs font-normal text-slate-500">O2</span>
          </div>
          <div className="mt-2 text-[10px] text-sky-700 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
            <span>High-Flow Mask</span>
          </div>
        </div>

        {/* Blood Pressure */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Blood Pressure</span>
            <Activity className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {vitals.bloodPressure}
          </div>
          <div className="mt-2 text-[10px] text-amber-700 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <span>NIBP Auto-Cuff</span>
          </div>
        </div>

        {/* Respiration */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Respiration</span>
            <Activity className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl font-black text-slate-900 mt-1">
            {vitals.breathing}
          </div>
          <div className="mt-2 text-[10px] text-slate-500 font-medium">
            <span>Airway Secured</span>
          </div>
        </div>

        {/* Consciousness Level */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider">Consciousness</span>
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
          </div>
          <div className={`text-lg font-black mt-1 ${
            vitals.consciousness.toLowerCase().includes('unresponsive') ? 'text-rose-600' : 'text-emerald-600'
          }`}>
            {vitals.consciousness}
          </div>
          <div className="mt-2 text-[10px] text-slate-600 font-semibold">
            <span>GCS: {vitals.gcs}</span>
          </div>
        </div>

      </div>

      {/* Observations & Voice Update Module */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Observations & Clinical Actions */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100 flex items-center justify-between">
            <span>Clinical Observations & First Aid Provided</span>
            <span className="text-[10px] font-mono text-slate-400">SYNC INTERVAL: 3s</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">Reported Symptoms:</span>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 font-semibold text-slate-800 mt-1">
                {vitals.symptoms}
              </div>
            </div>

            <div>
              <span className="text-slate-400 block text-[10px] font-bold uppercase">First Aid Given:</span>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-900 font-semibold mt-1 leading-relaxed">
                {vitals.firstAidGiven}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">IV Access:</span>
                <span className="font-bold text-slate-800">{vitals.ivLine}</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block">Temperature:</span>
                <span className="font-bold text-slate-800">98.4 °F (Normothermic)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Voice Update Module */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                  <Mic className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Paramedic Voice Update (AI Parser)</h3>
              </div>
              <span className="text-[10px] font-bold bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full border border-purple-200 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                <span>Speech-to-EMR</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-2">
              Allows transit paramedics to dictate continuous patient updates hands-free without looking at screens while performing CPR or cannulation.
            </p>

            {/* Voice Update Trigger Button */}
            <div className="mt-4">
              <button
                type="button"
                onClick={simulateVoiceUpdate}
                disabled={voiceUpdate.isListening}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-rose-600/20 transition transform active:scale-95 disabled:opacity-75"
              >
                <Mic className={`w-4 h-4 ${voiceUpdate.isListening ? 'animate-ping' : ''}`} />
                <span>{voiceUpdate.isListening ? 'Listening to Paramedic...' : 'Simulate Paramedic Voice Update'}</span>
              </button>
            </div>

            {/* Audio Transcript Preview */}
            {voiceUpdate.audioText && (
              <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                <span className="text-[10px] font-bold text-slate-400 block mb-1 flex items-center gap-1">
                  <Volume2 className="w-3 h-3 text-rose-600" />
                  <span>Speech Input Audio Transcript:</span>
                </span>
                <p className="font-medium text-slate-800 italic">
                  {voiceUpdate.audioText}
                </p>
              </div>
            )}

            {/* AI Structured Telemetry Conversion */}
            {voiceUpdate.structured && (
              <div className="mt-3 p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-2 animate-in fade-in duration-300">
                <div className="flex items-center justify-between text-emerald-800 font-bold text-xs">
                  <span className="flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    <span>AI Structured Update</span>
                  </span>
                  <span className="text-[10px] text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                    Parsed Successfully
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="p-2 bg-white rounded-lg border border-emerald-100">
                    <span className="text-slate-400 block text-[10px]">Consciousness:</span>
                    <span className="font-bold text-emerald-900">{voiceUpdate.structured.consciousness}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-100">
                    <span className="text-slate-400 block text-[10px]">Oxygen Support:</span>
                    <span className="font-bold text-emerald-900">{voiceUpdate.structured.oxygenSupport}</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-emerald-100 col-span-2">
                    <span className="text-slate-400 block text-[10px]">Patient Status:</span>
                    <span className="font-bold text-emerald-900">{voiceUpdate.structured.patientStatus}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action button: Send Update to Hospital */}
          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={sendVitalsToHospital}
              className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                voiceUpdate.hasSyncedToHospital
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm'
              }`}
            >
              {voiceUpdate.hasSyncedToHospital ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Update Synchronized with Hospital B ED</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Update to Hospital</span>
                </>
              )}
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
