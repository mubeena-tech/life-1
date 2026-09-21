import React, { useState } from 'react';
import { useEmergency } from '../../context/EmergencyContext';
import { callTranscript, aiExtractedEntities } from '../../data/mockData';
import { 
  Bot, 
  User, 
  Sparkles, 
  ShieldAlert, 
  ArrowRight, 
  PhoneCall, 
  Volume2, 
  CheckCircle2, 
  AlertTriangle, 
  FileText,
  Clock,
  MapPin
} from 'lucide-react';

export default function AiIntakeView() {
  const { setCurrentView, activeCase, updateTimelineStep, addNotification } = useEmergency();
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleAudioPreview = () => {
    setIsPlayingAudio(true);
    setTimeout(() => {
      setIsPlayingAudio(false);
    }, 2500);
  };

  const handleVerifyContinue = () => {
    updateTimelineStep(2, 'completed');
    updateTimelineStep(3, 'active');
    addNotification("AI intake data locked; forwarded to Human Dispatcher review", 'info');
    setCurrentView('dispatcher');
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Bot className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              AI-Assisted Emergency Intake
            </h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
              Active Call Channel #108-IN-492
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time speech-to-intent analysis for inbound emergency call triage
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleAudioPreview}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
          >
            <Volume2 className={`w-4 h-4 ${isPlayingAudio ? 'text-rose-600 animate-pulse' : ''}`} />
            <span>{isPlayingAudio ? 'Playing Stream...' : 'Play Audio Stream'}</span>
          </button>

          <button
            onClick={handleVerifyContinue}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/20 transition transform active:scale-95"
          >
            <span>Verify & Continue</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid: Call Transcript & AI Extracted Structured Data */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Call Transcript */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs flex flex-col">
          
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-600"></span>
              </span>
              <h3 className="font-bold text-slate-900 text-sm">Call Conversation Transcript</h3>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>Call Start: 10:42:15 AM</span>
            </div>
          </div>

          {/* Transcript bubbles */}
          <div className="flex-1 space-y-3.5 overflow-y-auto pr-1">
            {callTranscript.map((line, idx) => (
              <div 
                key={idx}
                className={`flex items-start gap-3 ${line.isAi ? '' : 'flex-row-reverse'}`}
              >
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${
                    line.isAi ? 'bg-slate-900 text-white' : 'bg-rose-100 text-rose-700'
                  }`}
                >
                  {line.isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                </div>

                <div 
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs ${
                    line.isAi 
                      ? 'bg-slate-50 text-slate-800 border border-slate-200' 
                      : 'bg-rose-600 text-white font-medium shadow-sm'
                  }`}
                >
                  <div className={`text-[10px] font-bold mb-1 ${line.isAi ? 'text-slate-500' : 'text-rose-100'}`}>
                    {line.speaker}
                  </div>
                  <p className="leading-relaxed">{line.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Caller telemetry footer */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>Caller: Suresh Kumar (+91 98452 11045)</span>
            </div>
            <span className="text-[11px] bg-emerald-50 text-emerald-700 font-semibold px-2 py-0.5 rounded">
              Caller Line Active
            </span>
          </div>

        </div>

        {/* Right: AI Extracted Entities & Clinical Safety Warning */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Extracted Entities Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-rose-600" />
                <h3 className="font-bold text-slate-900 text-sm">AI Structured Extraction</h3>
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                Confidence: 98.4%
              </span>
            </div>

            <div className="space-y-3">
              {aiExtractedEntities.map((ent, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition"
                >
                  <span className="text-xs font-semibold text-slate-600">
                    {ent.label}
                  </span>
                  <span 
                    className={`text-xs font-bold px-2 py-0.5 rounded-lg ${
                      ent.alert 
                        ? 'bg-rose-100 text-rose-700 border border-rose-200 animate-pulse' 
                        : 'bg-white text-slate-800 border border-slate-200'
                    }`}
                  >
                    {ent.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Next Action trigger */}
            <button
              onClick={handleVerifyContinue}
              className="mt-5 w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-rose-600/20 transition"
            >
              <span>Verify & Continue to Dispatcher</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mandatory AI Safety Disclaimer */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs space-y-1">
              <span className="font-bold block text-amber-800">Operational Disclaimer</span>
              <p className="text-amber-800/90 leading-relaxed font-medium">
                “AI organizes and structures information. It does not diagnose or provide treatment.”
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
