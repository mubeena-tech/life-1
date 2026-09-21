import React from 'react';
import { FileSpreadsheet, ShieldCheck, Download, Filter } from 'lucide-react';

export default function AuditLogs() {
  const logs = [
    { time: '10:55:12', user: 'Paramedic Ananya Rao (A01)', event: 'Vital telemetry synchronized (BP 135/88, SpO2 97%)', hash: 'sha256-a94f...12e' },
    { time: '10:48:30', user: 'Hospital B ED Dispatch', event: 'Pre-arrival emergency trauma alert acknowledged', hash: 'sha256-b81c...99d' },
    { time: '10:45:04', user: 'Dispatcher S. Roy (Hub)', event: 'Ambulance A01 allocated to incident LL-10452', hash: 'sha256-c73e...44a' },
    { time: '10:44:18', user: 'Dispatcher S. Roy (Hub)', event: 'Human verification completed; Priority set to CRITICAL', hash: 'sha256-d62a...88b' },
    { time: '10:43:05', user: 'AI Intake Service', event: 'Audio transcript parsed & entity extraction generated', hash: 'sha256-e51b...33c' },
    { time: '10:42:12', user: '108 Gateway Interconnect', event: 'Inbound call logged from +91 98452 11045', hash: 'sha256-f40a...22d' },
  ];

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-slate-100 text-slate-700">
              <FileSpreadsheet className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-extrabold text-slate-900">System Audit & Compliance Logs</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Immutable tamper-evident event log for emergency healthcare dispatch and clinical handovers
          </p>
        </div>

        <button 
          onClick={() => window.print()}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Audit Trail</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold">
            <tr>
              <th className="p-3 rounded-l-lg">Timestamp</th>
              <th className="p-3">Operator / Agent</th>
              <th className="p-3">Event Description</th>
              <th className="p-3 rounded-r-lg">Audit Signature</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map((log, i) => (
              <tr key={i} className="hover:bg-slate-50 transition">
                <td className="p-3 font-mono font-bold text-slate-600">{log.time}</td>
                <td className="p-3 font-semibold text-slate-800">{log.user}</td>
                <td className="p-3 text-slate-700">{log.event}</td>
                <td className="p-3 font-mono text-[11px] text-slate-400">{log.hash}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
