import React from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { CheckCircle2, Clock, Circle, ArrowRight } from 'lucide-react';

export default function CaseTimeline() {
  const { timeline, setCurrentView } = useEmergency();

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 mb-4 border-b border-slate-100">
        <div>
          <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <span>Emergency Response Lifecycle Timeline</span>
            <span className="bg-rose-50 text-rose-700 text-xs px-2 py-0.5 rounded-full font-semibold border border-rose-200">
              Case LL-10452
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time status tracking from initial call intake through hospital digital handover
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-emerald-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Completed
          </span>
          <span className="flex items-center gap-1 text-rose-600 font-medium">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" /> Active Stage
          </span>
          <span className="flex items-center gap-1 text-slate-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-slate-300" /> Pending
          </span>
        </div>
      </div>

      {/* Horizontal timeline bar for desktop */}
      <div className="hidden lg:grid grid-cols-8 gap-2 relative">
        {timeline.map((stage, idx) => {
          const isCompleted = stage.status === 'completed';
          const isActive = stage.status === 'active';
          const isPending = stage.status === 'pending';

          return (
            <div key={stage.step} className="flex flex-col items-center text-center relative group">
              {/* Connecting line */}
              {idx < timeline.length - 1 && (
                <div 
                  className={`absolute top-4 left-1/2 w-full h-0.5 -z-0 ${
                    isCompleted ? 'bg-emerald-400' : 'bg-slate-200'
                  }`} 
                />
              )}

              {/* Step indicator node */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all shadow-xs ${
                  isCompleted
                    ? 'bg-emerald-500 text-white ring-4 ring-emerald-100'
                    : isActive
                    ? 'bg-rose-600 text-white ring-4 ring-rose-100 animate-pulse'
                    : 'bg-slate-100 text-slate-400 border border-slate-200'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : isActive ? (
                  <Clock className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-bold">{stage.step}</span>
                )}
              </div>

              {/* Text info */}
              <div className="mt-2.5">
                <span className="text-[10px] font-mono font-bold text-slate-600 block">
                  {stage.time}
                </span>
                <p className="text-xs font-bold text-slate-900 leading-tight mt-0.5">
                  {stage.title}
                </p>
                <span 
                  className={`inline-block mt-1 text-[9px] px-1.5 py-0.2 rounded font-semibold uppercase ${
                    isCompleted
                      ? 'text-emerald-700 bg-emerald-50'
                      : isActive
                      ? 'text-rose-700 bg-rose-50 font-bold border border-rose-200'
                      : 'text-slate-400 bg-slate-100'
                  }`}
                >
                  {stage.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Vertical timeline for smaller screens */}
      <div className="lg:hidden space-y-4">
        {timeline.map((stage) => {
          const isCompleted = stage.status === 'completed';
          const isActive = stage.status === 'active';

          return (
            <div key={stage.step} className="flex items-start gap-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                  isCompleted
                    ? 'bg-emerald-500 text-white'
                    : isActive
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-slate-100 text-slate-400'
                }`}
              >
                {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span className="text-xs font-bold">{stage.step}</span>}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{stage.title}</span>
                  <span className="text-[11px] font-mono text-slate-600 font-semibold">{stage.time}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{stage.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
