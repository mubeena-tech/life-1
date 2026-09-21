import React, { useState } from 'react';
import { Settings, Bell, Shield, Database, Radio, Check } from 'lucide-react';

export default function SettingsView() {
  const [autoSync, setAutoSync] = useState(true);
  const [audioAlerts, setAudioAlerts] = useState(true);
  const [aiThreshold, setAiThreshold] = useState(90);

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
      <div className="pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
            <Settings className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-extrabold text-slate-900">System Configuration & Safety Protocols</h2>
        </div>
        <p className="text-xs text-slate-500 mt-1">
          Adjust emergency routing thresholds, offline synchronization frequency, and 108/112 gateway parameters.
        </p>
      </div>

      <div className="space-y-4 max-w-2xl text-xs">
        {/* Toggle 1 */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="font-bold text-slate-800 block text-sm">Automated Offline Data Synchronization</span>
            <p className="text-slate-500 mt-0.5">Background worker reconciles offline paramedic telemetry when network is re-established.</p>
          </div>
          <button
            onClick={() => setAutoSync(!autoSync)}
            className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
              autoSync ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white block shadow-xs" />
          </button>
        </div>

        {/* Toggle 2 */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
          <div>
            <span className="font-bold text-slate-800 block text-sm">Priority Audio Chimes for Critical Level 1</span>
            <p className="text-slate-500 mt-0.5">Auditory alerts in dispatch center for unverified cardiac/stroke intakes.</p>
          </div>
          <button
            onClick={() => setAudioAlerts(!audioAlerts)}
            className={`w-12 h-6 rounded-full transition p-1 flex items-center ${
              audioAlerts ? 'bg-emerald-600 justify-end' : 'bg-slate-300 justify-start'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white block shadow-xs" />
          </button>
        </div>

        {/* AI Confidence Threshold */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-800 text-sm">AI Entity Confidence Cutoff</span>
            <span className="font-mono font-bold text-rose-600">{aiThreshold}% Confidence</span>
          </div>
          <p className="text-slate-500">Transcripts scoring below this cutoff mandate secondary audio replay before confirmation.</p>
          <input
            type="range"
            min="70"
            max="99"
            value={aiThreshold}
            onChange={(e) => setAiThreshold(e.target.value)}
            className="w-full accent-rose-600"
          />
        </div>

        <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 text-rose-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-rose-600 shrink-0" />
          <span>All operational settings conform to MoHFW National Emergency Medical Protocol Standards (India).</span>
        </div>
      </div>
    </div>
  );
}
