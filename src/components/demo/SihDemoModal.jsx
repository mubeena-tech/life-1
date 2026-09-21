import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { Sparkles, ArrowRight, ArrowLeft, X, Play, CheckCircle2, ShieldCheck, Compass } from 'lucide-react';

export default function SihDemoModal() {
  const { 
    sihDemoActive, 
    sihStep, 
    sihStepList, 
    nextSihStep, 
    prevSihStep, 
    closeSihDemo, 
    setCurrentView 
  } = useEmergency();

  if (!sihDemoActive) return null;

  const currentInfo = sihStepList[sihStep];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-4 md:p-5 shadow-2xl border border-slate-700/80 ring-1 ring-white/10">
        
        {/* Header bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-rose-500 animate-ping" />
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold border border-rose-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SIH DEMO MODE</span>
            </div>
            <span className="text-xs text-slate-400">
              Step {sihStep + 1} of {sihStepList.length}
            </span>
          </div>

          <button
            onClick={closeSihDemo}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content body */}
        <div className="py-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white flex items-center gap-2">
              {currentInfo.title}
            </h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed max-w-lg">
              {currentInfo.desc}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
            <button
              onClick={prevSihStep}
              disabled={sihStep === 0}
              className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition text-xs flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            <button
              onClick={nextSihStep}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-xs flex items-center gap-1.5 shadow-lg shadow-rose-600/30 transition transform active:scale-95"
            >
              <span>{sihStep === sihStepList.length - 1 ? 'Finish Demo' : 'Next Stage'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Stepper indicators */}
        <div className="pt-2 flex items-center justify-between gap-1.5 overflow-x-auto">
          {sihStepList.map((st, idx) => (
            <button
              key={st.step}
              onClick={() => {
                nextSihStep(idx);
                setCurrentView(st.view);
              }}
              title={st.title}
              className={`h-1.5 flex-1 rounded-full transition-all ${
                idx === sihStep
                  ? 'bg-rose-500 ring-2 ring-rose-400/50'
                  : idx < sihStep
                  ? 'bg-emerald-500'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Footer positioning note */}
        <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
          <span>Patient: Ravi Kumar (Case: LL-10452) • Location: ABC Village</span>
          <span className="text-slate-400">Works alongside 108/112</span>
        </div>

      </div>
    </div>
  );
}
